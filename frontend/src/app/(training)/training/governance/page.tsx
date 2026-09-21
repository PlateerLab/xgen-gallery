"use client";
import { useEffect, useRef, useState } from "react";
import { api, dateLabel, type Quiz } from "@/lib/governance/types";

export default function QuizPage() {
    const [token, setToken] = useState("");
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [video, setVideo] = useState("");
    const videoUrl = useRef("");
    const submitDialog = useRef<HTMLDialogElement>(null);
    const submitted = !!quiz?.assignment.submitted_at;
    const started = !!quiz?.assignment.started_at;
    const answered = quiz?.questions.filter(q => answers[q.id] !== undefined).length || 0;
    useEffect(() => {
        const value = location.hash.slice(1);
        if (!/^[A-Za-z0-9_-]{43}$/.test(value)) { setError("개인 응시 링크가 필요합니다. 관리자가 전달한 전체 URL로 접속해 주세요."); return; }
        setToken(value);
        api<Quiz>("quiz", { headers: { Authorization: `Bearer ${value}` } }).then(data => { setQuiz(data); setAnswers(data.answers); }).catch(e => setError(e.message));
        return () => { if (videoUrl.current) URL.revokeObjectURL(videoUrl.current); };
    }, []);
    useEffect(() => {
        const beforeLeave = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
        window.addEventListener("beforeunload", beforeLeave);
        return () => window.removeEventListener("beforeunload", beforeLeave);
    }, [dirty]);
    async function action(path: string, method = "POST", body?: unknown) {
        setBusy(true); setError(""); setMessage("");
        try {
            const data = await api<Quiz>(`quiz/${path}`, { method, headers: { Authorization: `Bearer ${token}` }, ...(body ? { body: JSON.stringify(body) } : {}) });
            setQuiz(data); setAnswers(data.answers); setDirty(false);
            if (path === "answers") setMessage("임시 저장했습니다. 같은 개인 링크로 다시 이어서 풀 수 있습니다.");
            if (path === "submit") { submitDialog.current?.close(); window.scrollTo({ top: 0, behavior: "smooth" }); }
        } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
    }
    async function material(kind: "video" | "slides") {
        setBusy(true); setError("");
        try {
            const result = await fetch(`/api/governance/quiz/materials/${kind}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
            if (!result.ok) throw new Error("교육 자료를 불러오지 못했습니다. 링크 유효기간을 확인하고 다시 시도해 주세요.");
            const url = URL.createObjectURL(await result.blob());
            if (kind === "video") { if (videoUrl.current) URL.revokeObjectURL(videoUrl.current); videoUrl.current = url; setVideo(url); }
            else { const a = document.createElement("a"); a.href = url; a.download = "plateer-ai-lab-governance-training.pptx"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
        } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
    }
    function prepareSubmit() {
        if (!quiz) return;
        const missing = quiz.questions.find(q => answers[q.id] === undefined);
        if (missing) { setError("모든 문항에 답해 주세요."); document.getElementById(`question-${missing.id}`)?.focus(); return; }
        submitDialog.current?.showModal();
    }
    return <div className="gov">
        <header className="quiz-top"><div><strong>Plateer AI Labs</strong><p className="muted">AI 거버넌스 실무교육 · 개인별 퀴즈</p></div></header>
        <main className="quiz-main">
            <h1>{submitted ? "퀴즈 제출 결과" : "AI 거버넌스 퀴즈"}</h1>
            {error && <div className="notice" role="alert">{error}</div>}
            {message && <div className="notice" role="status">{message}</div>}
            {!quiz && !error && <p role="status">응시 정보를 확인하고 있습니다.</p>}
            {quiz && <>
                <p>{quiz.assignment.name}님, {submitted ? "퀴즈 제출을 완료했습니다." : "안녕하세요."}</p>
                <p className="muted">{quiz.assignment.name}님의 개인 응시입니다. {quiz.questions.length}문항 · 동일 배점 · 링크 만료 {dateLabel(quiz.assignment.expires_at)} (한국 시각)</p>
                {submitted ? <div className="notice"><h2>{quiz.assignment.score}점 · {quiz.assignment.correct}/{quiz.assignment.total}문항 정답</h2><p>제출 시각: {dateLabel(quiz.assignment.submitted_at)} (한국 시각)</p><p className="muted">아래에서 문항별 정답과 해설을 확인하세요. 최초 제출 결과가 저장되며 재제출로 바뀌지 않습니다.</p></div> : <>
                    <p>교육 동영상과 슬라이드를 확인하고, 각 상황에서 가장 적절한 행동을 하나씩 선택해 주세요. 개인 링크는 다른 사람에게 공유하지 마세요.</p>
                    <section><h2>교육 자료</h2><div className="actions"><button disabled={busy} onClick={() => material("video")}>{video ? "동영상 다시 불러오기" : "동영상 보기"}</button><button disabled={busy} onClick={() => material("slides")}>슬라이드 다운로드</button></div><p className="muted">동영상 14분 21초 · 음성 없이 화면으로 진행 · 슬라이드 23장</p>{video && <video controls preload="metadata" src={video} aria-label="AI 거버넌스 교육 동영상" />}</section>
                    {!started ? <div className="notice"><p>제출 전에는 임시 저장 후 이어서 풀 수 있습니다. 제출 후에는 답안을 수정할 수 없습니다.</p><button className="primary" disabled={busy} onClick={() => action("start")}>퀴즈 시작</button></div> : <><p role="status">{answered}/{quiz.questions.length}문항 응답 · {dirty ? "저장하지 않은 변경 있음" : "저장된 답안"}</p><progress max={quiz.questions.length} value={answered} aria-label="응답 진행률" /></>}
                </>}
                {(started || submitted) && <form onSubmit={e => { e.preventDefault(); prepareSubmit(); }}>
                    {quiz.questions.map((q, index) => <fieldset key={q.id} id={`question-${q.id}`} tabIndex={-1} className="question" disabled={busy || submitted}>
                        <legend>{index + 1}. {q.prompt}</legend><p className="muted">{q.topic}</p>
                        {q.options.map((option, i) => <label className="option" key={option.id}><input type="radio" name={q.id} value={option.id} checked={answers[q.id] === option.id} onChange={() => { setAnswers(old => ({ ...old, [q.id]: option.id })); setDirty(true); setMessage(""); }} /><span>{i + 1}. {option.text}</span></label>)}
                        {submitted && <div className="answer-note"><strong>{answers[q.id] === q.correct ? "정답입니다." : "다시 확인해 주세요."}</strong><p>정답: {q.options.find(o => o.id === q.correct)?.text}</p><p>{q.explanation}</p><p className="muted">근거: {q.source}</p></div>}
                    </fieldset>)}
                    {!submitted && <div className="actions"><button className="primary" type="submit" disabled={busy}>최종 제출 ({answered}/{quiz.questions.length})</button><button type="button" disabled={busy} onClick={() => action("answers", "PUT", { answers })}>임시 저장</button></div>}
                </form>}
                <p className="footer-note muted">이름·조직·답안·점수·응시 시각은 교육 진행 확인과 이해도 통계에 사용되며 권한 있는 관리자가 열람합니다. 링크 만료와 응답 기록 삭제는 별개이며, 기록 관련 문의는 교육 담당자에게 전달해 주세요.</p>
            </>}
            <dialog ref={submitDialog}><h2>답안을 최종 제출할까요?</h2><p>{quiz?.assignment.name}님의 {answered}개 답안을 채점합니다. 제출 후에는 수정할 수 없습니다.</p><div className="actions"><button className="primary" disabled={busy} onClick={() => action("submit", "POST", { answers })}>{busy ? "제출 중…" : "최종 제출"}</button><button disabled={busy} onClick={() => submitDialog.current?.close()}>계속 검토</button></div>{error && <p role="alert">{error}</p>}</dialog>
        </main>
    </div>;
}
