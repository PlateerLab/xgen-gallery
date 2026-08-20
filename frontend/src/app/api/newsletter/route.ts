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
    let body: {
        email?: string;
        subscribe?: boolean;
        kind?: string;
        // 구독 게이트(현장 리포트)는 리드 정보까지 함께 받는다. 없으면 그냥 빠진다 —
        // 기존 구독 위젯은 이메일만 보내므로 선택 필드다.
        name?: string;
        company?: string;
        jobTitle?: string;
    };
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

    // 시트에서 성격을 구분한다.
    //   newsletter    — 뉴스레터 구독
    //   blog          — 새 글 알림 구독(테크 노트 등)
    //   field-report  — 현장 리포트 게이트. 약식 리드 정보를 함께 받는 구독이다
    const KINDS = ["newsletter", "blog", "field-report"] as const;
    const kind = (KINDS as readonly string[]).includes(String(body.kind))
        ? String(body.kind)
        : "newsletter";
    // 구독=Y / 해지=N. 시트에서 이메일 행을 찾아 이 값으로 갱신하도록 웹훅에 전달.
    // 구독=Y / 해지=N. field-report 도 구독으로 잡되(리드 수집 + 구독), 유입 경로는
    // kind 로 구분되어 시트에서 뉴스레터·새 글 알림과 따로 볼 수 있다.
    const subscribe = body.subscribe !== false;
    const trim = (v: unknown) => String(v ?? "").trim();
    const record = {
        email,
        subscribed: subscribe ? "Y" : "N",
        kind,
        // 리드 필드는 값이 있을 때만 실어 보낸다(빈 열이 시트에 쌓이지 않게).
        ...(trim(body.name) ? { name: trim(body.name) } : {}),
        ...(trim(body.company) ? { company: trim(body.company) } : {}),
        ...(trim(body.jobTitle) ? { jobTitle: trim(body.jobTitle) } : {}),
        receivedAt: new Date().toISOString(),
        source: `Plateer AI Labs/${kind}`,
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
