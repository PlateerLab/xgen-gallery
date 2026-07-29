import type { NextRequest } from "next/server";

/**
 * QA 콘솔 [실행] → GitHub Actions workflow_dispatch 트리거 (경로 A).
 * 브라우저에서 직접 GitHub API를 호출하면 CORS·토큰 노출 문제가 있으므로
 * 서버(이 라우트)가 대신 호출한다.
 *
 * 필요한 서버 env (go244 .env):
 *   QA_DISPATCH_TOKEN = GitHub PAT (repo/actions:write 권한) — 비밀
 *   (선택) QA_DISPATCH_REPO=PlateerLab/xgen-gallery, QA_DISPATCH_WORKFLOW=qa-smoke.yml
 */
export const dynamic = "force-dynamic";

const REPO = process.env.QA_DISPATCH_REPO || "PlateerLab/xgen-gallery";
const WORKFLOW = process.env.QA_DISPATCH_WORKFLOW || "qa-smoke.yml";
const ALLOWED = ["dev", "stg"];

export function GET() {
    return Response.json({
        configured: Boolean(process.env.QA_DISPATCH_TOKEN),
        repo: REPO,
        workflow: WORKFLOW,
        allowedEnvs: ALLOWED,
    });
}

export async function POST(req: NextRequest) {
    const token = process.env.QA_DISPATCH_TOKEN;
    if (!token) {
        return Response.json(
            { ok: false, error: "QA_DISPATCH_TOKEN 미설정 (go244 .env 등록 필요)" },
            { status: 503 },
        );
    }

    let env = "dev";
    try {
        const body = await req.json();
        if (body?.env) env = String(body.env);
    } catch {
        /* body 없음 → 기본 dev */
    }
    if (!ALLOWED.includes(env)) env = "dev";

    let res: Response;
    try {
        res = await fetch(
            `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                    "Content-Type": "application/json",
                    "User-Agent": "xgen-qa-console",
                },
                body: JSON.stringify({ ref: "main", inputs: { env } }),
            },
        );
    } catch (e) {
        return Response.json(
            { ok: false, error: "GitHub API 호출 실패: " + String(e) },
            { status: 502 },
        );
    }

    if (res.status === 204) {
        return Response.json({ ok: true, env, dispatched: true });
    }
    const text = await res.text().catch(() => "");
    return Response.json(
        { ok: false, status: res.status, error: text.slice(0, 300) || "dispatch 실패" },
        { status: 502 },
    );
}
