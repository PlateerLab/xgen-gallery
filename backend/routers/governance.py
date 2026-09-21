"""거버넌스 교육: 관리자 GitHub 권한 검증, 개인 링크, SQLite 트랜잭션 채점."""
import hashlib
import json
import os
import random
import secrets
import sqlite3
import io
import zipfile
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Annotated

import httpx
from fastapi import APIRouter, Depends, Header, HTTPException, Response, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict, Field, field_validator

router = APIRouter()
DB_PATH = os.getenv("GOVERNANCE_DB", "/tmp/governance.db")
def content_dir():
    return Path(os.getenv("GOVERNANCE_CONTENT_DIR", str(Path(DB_PATH).parent / "governance-content")))


def bank():
    try:
        return json.loads((content_dir() / "questions.json").read_text())
    except (OSError, ValueError) as exc:
        raise HTTPException(503, "교육 자료가 아직 등록되지 않았습니다. 관리자에게 문의해 주세요.") from exc


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@contextmanager
def database():
    Path(DB_PATH).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=15)
    os.chmod(DB_PATH, 0o600)
    conn.row_factory = sqlite3.Row
    try:
        # 기본 rollback journal + BEGIN IMMEDIATE로 프로세스 간 쓰기를 직렬화한다.
        # 연결마다 WAL로 전환하면 첫 동시 요청에서 journal 전환 잠금이 충돌한다.
        conn.execute("""CREATE TABLE IF NOT EXISTS assignments (
          id TEXT PRIMARY KEY, campaign TEXT NOT NULL, member_id TEXT NOT NULL,
          name TEXT NOT NULL, team TEXT NOT NULL, token_hash TEXT UNIQUE NOT NULL,
          questions TEXT NOT NULL, answers TEXT NOT NULL DEFAULT '{}',
          created_at TEXT NOT NULL, created_by TEXT NOT NULL, expires_at TEXT NOT NULL,
          started_at TEXT, submitted_at TEXT, revoked_at TEXT, correct INTEGER,
          UNIQUE(campaign, member_id))""")
        conn.execute("""CREATE TABLE IF NOT EXISTS audit (
          id INTEGER PRIMARY KEY, assignment_id TEXT NOT NULL,
          action TEXT NOT NULL, actor TEXT NOT NULL, at TEXT NOT NULL)""")
        conn.commit()
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def bearer(value):
    if not value or not value.startswith("Bearer ") or len(value) > 1024:
        raise HTTPException(401, "로그인 또는 개인 응시 링크가 필요합니다.")
    return value[7:]


async def admin(authorization: Annotated[str | None, Header()] = None):
    token = bearer(authorization)
    repo = os.getenv("GOVERNANCE_ADMIN_REPO", "PlateerLab/xgen-gallery")
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            headers = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json"}
            result = await client.get(f"https://api.github.com/repos/{repo}", headers=headers)
            if result.status_code == 401:
                raise HTTPException(401, "GitHub 로그인이 만료되었습니다. 다시 로그인해 주세요.")
            if result.status_code in (403, 429) and result.headers.get("x-ratelimit-remaining") == "0":
                raise HTTPException(503, "GitHub 권한 확인 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.")
            if result.status_code != 200 or not result.json().get("permissions", {}).get("push"):
                raise HTTPException(403, "Labs 저장소 쓰기 권한이 있는 관리자만 사용할 수 있습니다.")
            user = await client.get("https://api.github.com/user", headers=headers)
            if user.status_code != 200:
                raise HTTPException(503, "관리자 계정을 확인하지 못했습니다.")
            return user.json()["login"]
    except httpx.HTTPError as exc:
        raise HTTPException(503, "GitHub 권한 확인에 실패했습니다. 잠시 후 다시 시도해 주세요.") from exc


Admin = Annotated[str, Depends(admin)]


def no_store(response: Response):
    response.headers["Cache-Control"] = "no-store"
    response.headers["Referrer-Policy"] = "no-referrer"


router.dependencies.append(Depends(no_store))


class BankOption(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str = Field(pattern=r"^[a-zA-Z0-9_-]{1,40}$")
    text: str = Field(min_length=1, max_length=2000)


class BankQuestion(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str = Field(pattern=r"^[a-zA-Z0-9_-]{1,40}$")
    topic: str = Field(min_length=1, max_length=100)
    prompt: str = Field(min_length=1, max_length=2000)
    options: list[BankOption] = Field(min_length=2, max_length=6)
    correct: str = Field(max_length=40)
    explanation: str = Field(min_length=1, max_length=3000)
    source: str = Field(min_length=1, max_length=200)


class QuestionBank(BaseModel):
    model_config = ConfigDict(extra="forbid")
    version: str = Field(pattern=r"^[a-zA-Z0-9_-]{1,80}$")
    title: str = Field(min_length=1, max_length=200)
    questions: list[BankQuestion] = Field(min_length=12, max_length=12)


def write_content(filename, data):
    directory = content_dir()
    directory.mkdir(parents=True, exist_ok=True, mode=0o700)
    temporary = directory / (filename + "." + secrets.token_hex(8) + ".tmp")
    try:
        with temporary.open("xb") as file:
            os.chmod(temporary, 0o600)
            file.write(data)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temporary, directory / filename)
    finally:
        temporary.unlink(missing_ok=True)


@router.put("/admin/content/questions")
def upload_bank(body: QuestionBank, actor: Admin):
    data = body.model_dump()
    ids = [q.id for q in body.questions]
    if len(set(ids)) != len(ids):
        raise HTTPException(422, "문항 ID가 중복되었습니다.")
    for q in body.questions:
        options = [o.id for o in q.options]
        if len(set(options)) != len(options) or q.correct not in options:
            raise HTTPException(422, "보기 ID와 정답을 확인해 주세요.")
    with database() as conn:
        conn.execute("BEGIN IMMEDIATE")
        # 이미 배정한 버전은 정답·문항·해설을 뒤에서 바꾸지 않는다.
        if conn.execute("SELECT 1 FROM assignments WHERE campaign=? LIMIT 1", (body.version,)).fetchone():
            if bank() != data:
                raise HTTPException(409, "이미 배정된 교육입니다. 내용을 바꾸려면 새 버전을 사용해 주세요.")
        write_content("questions.json", json.dumps(data, ensure_ascii=False).encode())
        audit(conn, body.version, "upload_questions", actor)
    return {"ok": True, "version": body.version, "questions": len(ids)}


@router.put("/admin/content/{kind}")
async def upload_material(kind: str, request: Request, actor: Admin):
    if kind not in ("video", "slides"):
        raise HTTPException(404, "교육 자료 종류를 확인해 주세요.")
    chunks, size = [], 0
    async for chunk in request.stream():
        size += len(chunk)
        if size > 12 * 1024 * 1024:
            raise HTTPException(413, "자료는 12MB 이하로 등록해 주세요.")
        chunks.append(chunk)
    data = b"".join(chunks)
    if kind == "video":
        if data[4:8] != b"ftyp":
            raise HTTPException(422, "MP4 파일을 확인해 주세요.")
        filename = "governance-training.mp4"
    else:
        try:
            with zipfile.ZipFile(io.BytesIO(data)) as archive:
                if "ppt/presentation.xml" not in archive.namelist():
                    raise ValueError()
        except (zipfile.BadZipFile, ValueError) as exc:
            raise HTTPException(422, "PPTX 파일을 확인해 주세요.") from exc
        filename = "governance-training.pptx"
    write_content(filename, data)
    with database() as conn:
        audit(conn, "materials", "upload_" + kind, actor)
    return {"ok": True, "bytes": size}


class Member(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str = Field(pattern=r"^[a-zA-Z0-9_-]{1,80}$")
    name: str = Field(min_length=1, max_length=80)
    team: str = Field(default="", max_length=80)

    @field_validator("name", "team")
    @classmethod
    def trim(cls, value):
        if not value.strip() and value:
            raise ValueError("공백만 입력할 수 없습니다.")
        return value.strip()


class AssignmentRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    members: list[Member] = Field(min_length=1, max_length=200)
    valid_days: int = Field(default=30, ge=1, le=90)


class Answers(BaseModel):
    model_config = ConfigDict(extra="forbid")
    answers: dict[str, str] = Field(max_length=50)


def audit(conn, aid, action, actor):
    conn.execute("INSERT INTO audit(assignment_id,action,actor,at) VALUES(?,?,?,?)", (aid, action, actor, now()))


def hashed(token):
    return hashlib.sha256(token.encode()).hexdigest()


def link(token):
    # Fragment는 서버 접근 로그나 Referer에 전송되지 않는다.
    return "/training/governance#" + token


def snapshot(source):
    questions = json.loads(json.dumps(source["questions"]))
    rng = random.SystemRandom()
    rng.shuffle(questions)
    for question in questions:
        rng.shuffle(question["options"])
    return questions


def state(row):
    if row["revoked_at"]:
        return "revoked"
    if row["submitted_at"]:
        return "submitted"
    if row["expires_at"] <= now():
        return "expired"
    return "in_progress" if row["started_at"] else "not_started"


def summary(row):
    total = len(json.loads(row["questions"]))
    return {key: row[key] for key in ("id", "name", "team", "member_id", "campaign", "created_at", "expires_at", "started_at", "submitted_at", "correct")} | {
        "status": state(row), "total": total,
        "score": round(row["correct"] / total * 100, 1) if row["submitted_at"] else None,
    }


def participant(conn, authorization):
    row = conn.execute("SELECT * FROM assignments WHERE token_hash=?", (hashed(bearer(authorization)),)).fetchone()
    if not row or row["revoked_at"]:
        raise HTTPException(404, "사용할 수 없는 응시 링크입니다. 관리자에게 문의해 주세요.")
    if row["expires_at"] <= now():
        raise HTTPException(410, "응시 링크가 만료되었습니다. 관리자에게 문의해 주세요.")
    return row


def quiz_payload(row):
    questions = json.loads(row["questions"])
    if not row["submitted_at"]:
        questions = [{k: v for k, v in q.items() if k not in ("correct", "explanation", "source")} for q in questions]
    return {"assignment": summary(row), "title": "AI 거버넌스 실무교육", "questions": questions, "answers": json.loads(row["answers"])}


@router.post("/admin/assign")
def assign(body: AssignmentRequest, actor: Admin):
    if len({m.id for m in body.members}) != len(body.members):
        raise HTTPException(422, "중복된 구성원이 있습니다.")
    created, existing = [], []
    expires = (datetime.now(timezone.utc) + timedelta(days=body.valid_days)).isoformat(timespec="seconds")
    with database() as conn:
        conn.execute("BEGIN IMMEDIATE")
        source = bank()
        for member in body.members:
            old = conn.execute("SELECT * FROM assignments WHERE campaign=? AND member_id=?", (source["version"], member.id)).fetchone()
            if old:
                existing.append(summary(old))
                continue
            aid, token = secrets.token_urlsafe(16), secrets.token_urlsafe(32)
            conn.execute("""INSERT INTO assignments(id,campaign,member_id,name,team,token_hash,questions,created_at,created_by,expires_at)
              VALUES(?,?,?,?,?,?,?,?,?,?)""", (aid, source["version"], member.id, member.name, member.team, hashed(token), json.dumps(snapshot(source), ensure_ascii=False), now(), actor, expires))
            audit(conn, aid, "assign", actor)
            created.append({"id": aid, "name": member.name, "team": member.team, "url": link(token), "expires_at": expires})
    return {"created": created, "existing": existing}


@router.post("/admin/assignments/{aid}/link")
def rotate_link(aid: str, actor: Admin):
    with database() as conn:
        conn.execute("BEGIN IMMEDIATE")
        row = conn.execute("SELECT * FROM assignments WHERE id=? AND campaign=?", (aid, bank()["version"])).fetchone()
        if not row:
            raise HTTPException(404, "배정 내역을 찾을 수 없습니다.")
        token = secrets.token_urlsafe(32)
        expires = (datetime.now(timezone.utc) + timedelta(days=30)).isoformat(timespec="seconds")
        conn.execute("UPDATE assignments SET token_hash=?,expires_at=?,revoked_at=NULL WHERE id=?", (hashed(token), expires, aid))
        audit(conn, aid, "rotate_link", actor)
        return {"id": aid, "name": row["name"], "team": row["team"], "url": link(token), "expires_at": expires}


@router.post("/admin/assignments/{aid}/revoke")
def revoke(aid: str, actor: Admin):
    with database() as conn:
        if not conn.execute("UPDATE assignments SET revoked_at=? WHERE id=? AND campaign=?", (now(), aid, bank()["version"])).rowcount:
            raise HTTPException(404, "배정 내역을 찾을 수 없습니다.")
        audit(conn, aid, "revoke", actor)
    return {"ok": True}


@router.get("/admin/assignments/{aid}")
def assignment_detail(aid: str, actor: Admin):
    with database() as conn:
        row = conn.execute("SELECT * FROM assignments WHERE id=? AND campaign=?", (aid, bank()["version"])).fetchone()
        if not row:
            raise HTTPException(404, "배정 내역을 찾을 수 없습니다.")
        return quiz_payload(row)


@router.get("/admin/report")
def report(actor: Admin):
    source = bank()
    with database() as conn:
        rows = conn.execute("SELECT * FROM assignments WHERE campaign=? ORDER BY created_at,name", (source["version"],)).fetchall()
    assignments = [summary(r) for r in rows]
    # 회수해도 이미 제출한 결과는 보존하며 집계에 포함한다.
    submitted = [r for r in rows if r["submitted_at"]]
    counts = {key: sum(a["status"] == key for a in assignments) for key in ("not_started", "in_progress", "submitted", "expired", "revoked")}
    questions = []
    for q in source["questions"]:
        answers = []
        correct_count = 0
        for r in submitted:
            old_q = next((item for item in json.loads(r["questions"]) if item["id"] == q["id"]), None)
            if old_q:
                answer = json.loads(r["answers"])[q["id"]]
                answers.append(answer)
                correct_count += answer == old_q["correct"]
        questions.append({**q, "responses": len(answers), "correct_count": correct_count,
                          "rate": round(correct_count / len(answers) * 100, 1) if answers else None,
                          "choices": {option["id"]: answers.count(option["id"]) for option in q["options"]}})
    scores = [a["score"] for a in assignments if a["submitted_at"]]
    return {"campaign": source["version"], "title": "AI 거버넌스 실무교육", "actor": actor, "assignments": assignments,
            "questions": questions, "counts": counts, "assigned": len(rows), "completed": len(submitted),
            "completion_rate": round(len(submitted)/len(rows)*100, 1) if rows else None,
            "average": round(sum(scores)/len(scores), 1) if scores else None,
            "distribution": [{"label": label, "count": sum(low <= s <= high for s in scores)}
                             for label, low, high in [("0–59점", 0, 59.99), ("60–79점", 60, 79.99), ("80–99점", 80, 99.99), ("100점", 100, 100)]]}


@router.get("/quiz")
def get_quiz(authorization: Annotated[str | None, Header()] = None):
    with database() as conn:
        return quiz_payload(participant(conn, authorization))


@router.get("/quiz/materials/{kind}")
def material(kind: str, authorization: Annotated[str | None, Header()] = None):
    with database() as conn:
        participant(conn, authorization)
    files = {"video": ("governance-training.mp4", "video/mp4"),
             "slides": ("governance-training.pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation")}
    if kind not in files:
        raise HTTPException(404, "교육 자료를 찾을 수 없습니다.")
    filename, media_type = files[kind]
    return FileResponse(content_dir() / filename, media_type=media_type,
                        filename=filename, headers={"Cache-Control": "no-store", "Referrer-Policy": "no-referrer"})


@router.post("/quiz/start")
def start(authorization: Annotated[str | None, Header()] = None):
    with database() as conn:
        conn.execute("BEGIN IMMEDIATE")
        row = participant(conn, authorization)
        if not row["started_at"]:
            conn.execute("UPDATE assignments SET started_at=? WHERE id=?", (now(), row["id"]))
        return quiz_payload(conn.execute("SELECT * FROM assignments WHERE id=?", (row["id"],)).fetchone())


def save(body, authorization, final):
    with database() as conn:
        conn.execute("BEGIN IMMEDIATE")
        row = participant(conn, authorization)
        if row["submitted_at"]:
            # 네트워크 재시도·동시 제출도 최초 제출 결과를 그대로 반환한다.
            return quiz_payload(row)
        if not row["started_at"]:
            raise HTTPException(409, "먼저 퀴즈를 시작해 주세요.")
        questions = json.loads(row["questions"])
        valid = {q["id"]: {o["id"] for o in q["options"]} for q in questions}
        if any(qid not in valid or value not in valid[qid] for qid, value in body.answers.items()):
            raise HTTPException(422, "배정된 문항과 보기를 확인해 주세요.")
        if final and set(body.answers) != set(valid):
            raise HTTPException(422, "모든 문항에 답한 후 제출해 주세요.")
        conn.execute("UPDATE assignments SET answers=? WHERE id=?", (json.dumps(body.answers), row["id"]))
        if final:
            correct = sum(body.answers[q["id"]] == q["correct"] for q in questions)
            conn.execute("UPDATE assignments SET correct=?,submitted_at=? WHERE id=?", (correct, now(), row["id"]))
            audit(conn, row["id"], "submit", row["member_id"])
        return quiz_payload(conn.execute("SELECT * FROM assignments WHERE id=?", (row["id"],)).fetchone())


@router.put("/quiz/answers")
def save_answers(body: Answers, authorization: Annotated[str | None, Header()] = None):
    return save(body, authorization, False)


@router.post("/quiz/submit")
def submit(body: Answers, authorization: Annotated[str | None, Header()] = None):
    return save(body, authorization, True)
