export type Option = { id: string; text: string };
export type Question = { id: string; topic: string; prompt: string; options: Option[]; correct?: string; explanation?: string; source?: string; responses?: number; correct_count?: number; rate?: number; choices?: Record<string, number> };
export type Assignment = { id: string; name: string; team: string; member_id: string; campaign: string; created_at: string; expires_at: string; started_at: string | null; submitted_at: string | null; correct: number | null; score: number | null; total: number; status: string };
export type Quiz = { assignment: Assignment; title: string; questions: Question[]; answers: Record<string, string> };
export type IssuedLink = { id: string; name: string; team: string; url: string; expires_at: string };
export type Report = { campaign: string; title: string; actor: string; assignments: Assignment[]; questions: Question[]; assigned: number; completed: number; completion_rate: number | null; average: number | null; counts: Record<string, number>; distribution: { label: string; count: number }[] };
export const statusLabel: Record<string, string> = { not_started: "미시작", in_progress: "진행 중", submitted: "제출 완료", expired: "기간 만료", revoked: "링크 회수" };
export function dateLabel(value: string | null) { return value ? new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) : "—"; }
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`/api/governance/${path}`, { ...options, cache: "no-store", headers: { "Content-Type": "application/json", ...options.headers } });
    const data = await res.json();
    if (!res.ok) throw Object.assign(new Error(typeof data.detail === "string" ? data.detail : "입력 내용을 확인해 주세요."), { status: res.status });
    return data;
}
export function csvDownload(filename: string, rows: (string | number | null)[][]) {
    const csv = rows.map(row => row.map(value => {
        let text = String(value ?? "");
        if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
        return '"' + text.replaceAll('"', '""') + '"';
    }).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
