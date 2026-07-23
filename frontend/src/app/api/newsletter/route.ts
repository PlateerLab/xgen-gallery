import { NextResponse, after } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter subscribe. Mirrors the demo-request flow: validate the email,
 * then forward to NEWSLETTER_WEBHOOK_URL (a Google Apps Script / Zapier
 * endpoint that appends to a *separate* Google Sheet and sends the mailing).
 * Set that env var to wire real delivery — no code change needed. Without it,
 * submissions are logged server-side so they're not lost.
 */
export async function POST(req: Request) {
    let body: { email?: string; subscribe?: boolean; kind?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const email = String(body.email ?? "").trim();
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json(
            { error: "Invalid email", fields: ["email"] },
            { status: 422 },
        );
    }

    // 구독 종류 — 뉴스레터 구독(newsletter) vs 블로그 새 글 구독(blog)을 시트에서 구분.
    const kind = body.kind === "blog" ? "blog" : "newsletter";
    // 구독=Y / 해지=N. 시트에서 이메일 행을 찾아 이 값으로 갱신하도록 웹훅에 전달.
    const subscribe = body.subscribe !== false; // default: subscribe
    const record = {
        email,
        subscribed: subscribe ? "Y" : "N",
        kind,
        receivedAt: new Date().toISOString(),
        source: `Plateer Labs/${kind}`,
    };

    // 통합 리드 웹훅(컨택·소개서·구독을 한 스프레드시트 탭으로 관리). 별도 운영 시
    // NEWSLETTER_WEBHOOK_URL 로 오버라이드 가능.
    const webhook =
        process.env.DEMO_WEBHOOK_URL || process.env.NEWSLETTER_WEBHOOK_URL;
    if (webhook) {
        // 느린 Apps Script 응답을 기다리지 않는다 — 응답을 먼저 보내고 전달은 백그라운드로.
        after(async () => {
            try {
                await fetch(webhook, {
                    method: "POST",
                    headers: { "content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify(record),
                });
            } catch (e) {
                console.error("[newsletter] webhook forward failed:", e);
            }
        });
    } else {
        // No delivery target configured yet — log so it's not lost.
        console.log("[newsletter] received:", JSON.stringify(record));
    }

    return NextResponse.json({ ok: true });
}
