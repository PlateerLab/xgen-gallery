"use client";
import { useEffect, useRef, useState } from "react";
import { api, csvDownload, dateLabel, statusLabel, type Report, type Quiz, type IssuedLink } from "@/lib/governance/types";

type Member = { id: string; name: string; team: string };
export default function GovernanceAdmin({ members }: { members: Member[] }) {
    const [report, setReport] = useState<Report | null>(null);
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState("assignments");
    const [selected, setSelected] = useState<string[]>(members.map(m => m.id));
    const [days, setDays] = useState(30);
    const [links, setLinks] = useState<IssuedLink[]>([]);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [team, setTeam] = useState("");
    const [detail, setDetail] = useState<Quiz | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ id: string; name: string; action: "link" | "revoke" } | null>(null);
    const detailDialog = useRef<HTMLDialogElement>(null);
    const confirmDialog = useRef<HTMLDialogElement>(null);
    async function refresh() {
        try {
            const result = await api<Report>("admin/report");
            setReport(result); setLogin(false); setError("");
            setLinks(result.assignments.filter(a => a.url).map(a => ({ id: a.id, name: a.name, team: a.team, url: a.url!, expires_at: a.expires_at })));
            setSelected(old => old.filter(id => !result.assignments.some(a => a.member_id === id)));
        } catch (e) {
            const err = e as Error & { status?: number };
            setError(err.message); setLogin(err.status === 401); setReport(null); setLinks([]);
        }
    }
    useEffect(() => {
        const change = () => {
            setTab(["statistics", "questions"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "assignments");
            void refresh();
        };
        const focus = () => { void refresh(); };
        change(); window.addEventListener("hashchange", change);
        window.addEventListener("focus", focus);
        if (new URLSearchParams(location.search).get("login") === "failed") setMessage("GitHub 인증을 완료하지 못했습니다. 다시 로그인해 주세요.");
        return () => { window.removeEventListener("hashchange", change); window.removeEventListener("focus", focus); };
    }, []);
    useEffect(() => { if (detail) detailDialog.current?.showModal(); }, [detail]);
    useEffect(() => { if (confirmAction) confirmDialog.current?.showModal(); }, [confirmAction]);
    async function run(action: () => Promise<void>) {
        setBusy(true); setError(""); setMessage("");
        try { await action(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
    }
    const issuedUrl = (item: IssuedLink) => `${location.origin}${item.url}`;
    function remember(newLinks: IssuedLink[]) {
        setLinks(old => [...old.filter(a => !newLinks.some(b => b.id === a.id)), ...newLinks]);
    }
    async function issue() {
        await run(async () => {
            const data = await api<{ created: IssuedLink[]; existing: unknown[] }>("admin/assign", { method: "POST", body: JSON.stringify({ members: members.filter(m => selected.includes(m.id)), valid_days: days }) });
            remember(data.created); await refresh();
            setMessage(`${data.created.length}명의 링크를 발급했습니다.${data.existing.length ? ` 기존 배정 ${data.existing.length}명은 유지했습니다.` : ""} 아래에서 링크를 복사하거나 CSV로 저장해 주세요.`);
        });
    }
    async function changeLink() {
        if (!confirmAction) return;
        const item = confirmAction;
        await run(async () => {
            const data = await api<IssuedLink>(`admin/assignments/${item.id}/${item.action}`, { method: "POST" });
            if (item.action === "link") remember([data]); else setLinks(old => old.filter(a => a.id !== item.id));
            confirmDialog.current?.close(); setConfirmAction(null); await refresh();
            setMessage(item.action === "link" ? `${item.name}님의 링크를 재발급했습니다. 이전 링크는 사용할 수 없습니다. 응답과 점수는 유지됩니다.` : `${item.name}님의 링크를 회수했습니다. 기존 결과는 보존됩니다.`);
        });
    }
    const rows = report?.assignments.filter(a => (!query || a.name.includes(query) || a.team.includes(query)) && (!status || a.status === status) && (!team || a.team === team)) || [];
    const available = members.filter(m => !report?.assignments.some(a => a.member_id === m.id));
    const actionBar = <div className="actions">
        {report && tab === "assignments" && <button className="primary" disabled={busy || !selected.length || !Number.isInteger(days) || days < 1 || days > 90} onClick={issue}>선택 {selected.length}명 링크 발급</button>}
        {report && tab === "statistics" && <button className="primary" disabled={busy} onClick={() => csvDownload("거버넌스-교육결과.csv", [["이름", "조직", "상태", "정답 수", "문항 수", "점수", "제출 시각"], ...report.assignments.map(a => [a.name, a.team, statusLabel[a.status], a.correct, a.total, a.score, dateLabel(a.submitted_at)])])}>결과 CSV 다운로드</button>}
        <button disabled={busy} onClick={() => run(refresh)}>새로고침</button>
        {report && <button onClick={() => run(async () => { await api("logout", { method: "POST" }); setReport(null); setLinks([]); setLogin(true); })}>로그아웃</button>}
    </div>;
    return <div className="gov">
        <aside><strong>Plateer AI Labs</strong><a href="/admin">블로그 관리</a><a href="/admin/governance" aria-current="page">거버넌스 교육</a></aside>
        <main className="workspace">
            <header className="page-head"><div><h1>거버넌스 교육</h1><p className="muted">{report ? `관리자 ${report.actor} · ${report.campaign}` : "관리자 전용 · 개인별 퀴즈와 학습 결과"}</p></div>{actionBar}</header>
            <nav className="tabs" aria-label="거버넌스 교육 메뉴">
                <a href="#assignments" aria-current={tab === "assignments" ? "page" : undefined}>개인별 배정</a>
                <a href="#statistics" aria-current={tab === "statistics" ? "page" : undefined}>결과 통계</a>
                <a href="#questions" aria-current={tab === "questions" ? "page" : undefined}>문항·출제 근거</a>
            </nav>
            <p className="muted">동영상·슬라이드 기반 공통 12문항입니다. 개인별 문항·보기 순서를 섞고, 최초 제출 결과를 집계합니다.</p>
            {error && <div className="notice" role="alert">{error}</div>}
            {message && <div className="notice" role="status">{message}</div>}
            {!report && <section className="empty"><h2>관리자 인증</h2><p>Labs GitHub 저장소에 쓰기 권한이 있는 계정으로 로그인해 주세요.</p><a className="button primary" href="/api/governance/auth">GitHub으로 {login ? "로그인" : "관리자 인증"}</a></section>}
            {report && tab === "assignments" && <>
                <h2>응시 대상 선택</h2><p className="muted">사이트 구성원 명단을 사용합니다. 기존 배정은 중복 생성하지 않습니다. 개인 링크 소지자가 응시할 수 있으므로 해당 구성원에게만 전달해 주세요.</p>
                <div className="filters"><label><input type="checkbox" checked={available.length > 0 && selected.length === available.length} disabled={!available.length || busy} onChange={e => setSelected(e.target.checked ? available.map(m => m.id) : [])} /> 미배정 인원 전체 선택</label><label>링크 유효기간 <input aria-label="링크 유효기간(일)" type="number" min="1" max="90" value={days} onChange={e => setDays(Number(e.target.value))} disabled={busy} /> 일</label></div>
                <div className="members">{members.map(m => { const assigned = report.assignments.some(a => a.member_id === m.id); return <label key={m.id}><input type="checkbox" disabled={assigned || busy} checked={selected.includes(m.id)} onChange={e => setSelected(old => e.target.checked ? [...old, m.id] : old.filter(id => id !== m.id))} /><span>{m.name} <span className="muted">{m.team}{assigned ? " · 배정됨" : ""}</span></span></label>; })}</div>
                {links.length > 0 && <section><div className="page-head"><h2>개인별 응시 링크</h2><button onClick={() => csvDownload("거버넌스-개인별응시링크.csv", [["이름", "조직", "응시 URL", "만료 시각"], ...links.map(l => [l.name, l.team, issuedUrl(l), dateLabel(l.expires_at)])])}>링크 CSV 다운로드</button></div><p className="muted">발급된 유효 링크는 이 화면에서 다시 복사할 수 있습니다. 만료·회수된 링크는 아래에서 재발급해 주세요.</p><div className="table-wrap"><table><thead><tr><th>이름</th><th>개인 응시 URL</th><th>복사</th></tr></thead><tbody>{links.map(l => <tr key={l.id}><td>{l.name}</td><td><input className="link-field" type="text" aria-label={`${l.name}님 응시 URL`} readOnly value={issuedUrl(l)} onFocus={e => e.target.select()} /></td><td><button onClick={() => run(async () => { await navigator.clipboard.writeText(issuedUrl(l)); setMessage(`${l.name}님의 응시 링크를 복사했습니다.`); })}>복사</button></td></tr>)}</tbody></table></div></section>}
                <h2>개인별 진행 현황</h2><div className="filters"><input type="text" aria-label="이름 또는 조직 검색" placeholder="이름 또는 조직 검색" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="조직 필터" value={team} onChange={e => setTeam(e.target.value)}><option value="">모든 조직</option>{Array.from(new Set(report.assignments.map(a => a.team))).map(t => <option key={t}>{t}</option>)}</select><select aria-label="진행 상태 필터" value={status} onChange={e => setStatus(e.target.value)}><option value="">모든 상태</option>{Object.entries(statusLabel).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><span className="muted">{rows.length}명 · 시각은 한국 기준</span></div>
                <div className="table-wrap"><table><thead><tr><th>이름 / 조직</th><th>상태</th><th>점수</th><th>제출 / 만료</th><th>관리</th></tr></thead><tbody>{rows.map(a => <tr key={a.id}><td>{a.name}<div className="muted">{a.team}</div></td><td>{statusLabel[a.status]}</td><td>{a.score === null ? "—" : `${a.score}점 (${a.correct}/${a.total})`}</td><td>{dateLabel(a.submitted_at)}<div className="muted">만료 {dateLabel(a.expires_at)}</div></td><td><div className="actions"><button disabled={busy} onClick={() => run(async () => setDetail(await api<Quiz>(`admin/assignments/${a.id}`)))}>응답 보기</button><button disabled={busy} onClick={() => setConfirmAction({ id: a.id, name: a.name, action: "link" })}>재발급</button><button disabled={busy || a.status === "revoked"} onClick={() => setConfirmAction({ id: a.id, name: a.name, action: "revoke" })}>회수</button></div></td></tr>)}</tbody></table></div>{!rows.length && <p className="empty">표시할 배정 내역이 없습니다.</p>}
            </>}
            {report && tab === "statistics" && <>
                <h2>교육 전체 현황</h2><p className="muted">배정 회차 전체 기준입니다. 미응시자는 평균에서 제외합니다. 링크를 회수해도 이미 제출한 결과는 보존·집계합니다.</p>
                <div className="metrics">{[["배정 인원", `${report.assigned}명`], ["제출 완료", `${report.completed}명`], ["완료율", report.completion_rate === null ? "집계 없음" : `${report.completion_rate}%`], ["평균 점수", report.average === null ? "집계 없음" : `${report.average}점`]].map(([label, value]) => <div className="metric" key={label}><span className="muted">{label}</span><strong>{value}</strong></div>)}</div>
                <p>미시작 {report.counts.not_started}명 · 진행 중 {report.counts.in_progress}명 · 기간 만료 {report.counts.expired}명 · 링크 회수 {report.counts.revoked}명</p>
                <h2>점수 분포</h2>{report.distribution.map(d => <div className="chart-row" key={d.label}><span>{d.label}</span><div className="bar-track" aria-hidden="true"><div className="bar" style={{ width: `${report.completed ? d.count / report.completed * 100 : 0}%` }} /></div><span>{d.count}명</span></div>)}
                <h2>문항별 이해도</h2><p className="muted">정답률 = 해당 문항의 정답 응답 수 ÷ 제출 응답 수. 문항 번호는 문제은행 기준이며 개인별 출제 순서와 다릅니다.</p><div className="table-wrap"><table><thead><tr><th>문항 / 주제</th><th>질문</th><th>정답 / 응답</th><th>정답률</th></tr></thead><tbody>{report.questions.map((q, i) => <tr key={q.id}><td>{i + 1}. {q.topic}</td><td>{q.prompt}</td><td>{q.correct_count} / {q.responses}</td><td>{q.rate === null ? "집계 없음" : `${q.rate}%`}</td></tr>)}</tbody></table></div>
                <h2>개인별 점수</h2><div className="table-wrap"><table><thead><tr><th>이름</th><th>조직</th><th>진행 상태</th><th>점수</th><th>응답 상세</th></tr></thead><tbody>{report.assignments.map(a => <tr key={a.id}><td>{a.name}</td><td>{a.team}</td><td>{statusLabel[a.status]}</td><td>{a.score === null ? "—" : `${a.score}점`}</td><td><button disabled={busy} onClick={() => run(async () => setDetail(await api<Quiz>(`admin/assignments/${a.id}`)))}>보기</button></td></tr>)}</tbody></table></div>
            </>}
            {report && tab === "questions" && <><h2>문항과 출제 근거</h2><p className="muted">첨부 슬라이드 23장과 동일 내용을 전개하는 무음 동영상(14분 21초)을 기반으로 구성했습니다. 정답·해설은 응시자에게 제출 후 공개됩니다.</p>{report.questions.map((q, i) => <article className="question" key={q.id}><p className="muted">{i + 1}. {q.topic} · {q.source}</p><h3>{q.prompt}</h3>{q.options.map((o, j) => <p key={o.id}>{j + 1}. {o.text}{o.id === q.correct ? " [정답]" : ""} <span className="muted">· 선택 {q.choices?.[o.id] || 0}명</span></p>)}<p className="answer-note">{q.explanation}</p></article>)}</>}
            <div className="footer-note muted">12문항 동일 배점 · 최초 제출 후 수정 불가 · 합격/불합격 판정 없음 · 관리자만 전체 결과 열람 가능</div>
            <dialog ref={detailDialog} onClose={() => setDetail(null)}><div className="modal-head"><h2>{detail?.assignment.name}님 응답 상세</h2><button onClick={() => detailDialog.current?.close()}>닫기</button></div>{detail && <><p>{statusLabel[detail.assignment.status]} · {detail.assignment.score === null ? "미제출" : `${detail.assignment.score}점`}</p>{detail.questions.map((q, i) => <article className="question" key={q.id}><h3>{i + 1}. {q.prompt}</h3><p>선택: {q.options.find(o => o.id === detail.answers[q.id])?.text || "미응답"}</p>{detail.assignment.submitted_at && <><p>정답: {q.options.find(o => o.id === q.correct)?.text}</p><p className="muted">{q.explanation} · {q.source}</p></>}</article>)}</>}</dialog>
            <dialog ref={confirmDialog} onClose={() => setConfirmAction(null)}><h2>{confirmAction?.name}님 링크 {confirmAction?.action === "link" ? "재발급" : "회수"}</h2><p>기존 링크는 즉시 사용할 수 없게 됩니다. 저장된 응답과 제출 결과는 유지됩니다.{confirmAction?.action === "link" && " 새 링크는 30일간 유효합니다."}</p><div className="actions"><button className="primary" disabled={busy} onClick={changeLink}>확인 후 {confirmAction?.action === "link" ? "재발급" : "회수"}</button><button disabled={busy} onClick={() => confirmDialog.current?.close()}>취소</button></div>{error && <p role="alert">{error}</p>}</dialog>
        </main>
    </div>;
}
