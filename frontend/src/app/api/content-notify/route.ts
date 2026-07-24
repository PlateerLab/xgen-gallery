import { NextResponse } from "next/server";
import { sendMail, contentNotifyMail, type NotifyPost } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 블로그/뉴스레터 발행 알림 — 구독자에게 요약 메일을 xgen@plateer.com(앱 O365 SMTP)에서 발송.
 *
 * 흐름(중복 방지·xgen 발신):
 *   GitHub Action(blog-notify.mjs/newsletter-notify.mjs) → 이 라우트(토큰 인증)
 *   → Apps Script(DEMO_WEBHOOK_URL)의 `subscribers` 액션으로 구독중(Y) 명단만 조회
 *   → 앱이 mailer(xgen)로 수신자별 발송(해지 링크 포함).
 * (기존엔 Apps Script가 MailApp=chat2plex로 직접 발송했으나, 앱 발송으로 일원화.)
 *
 * 인증: 공개 라우트 남용 방지 — 요청 token 이 BLOG_NOTIFY_TOKEN(env)과 일치해야 실행.
 */
const SITE = "https://labs.plateer.com";
const KINDS = {
    blog: { word: "새 글", heading: "Plateer Labs 블로그에 새 글이 올라왔습니다." },
    newsletter: {
        word: "새 뉴스레터",
        heading: "Plateer Labs 뉴스레터 새 호가 나왔습니다.",
    },
} as const;

interface Body {
    kind?: "blog" | "newsletter";
    token?: string;
    posts?: NotifyPost[];
}

export async function POST(req: Request) {
    let body: Body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const token = process.env.BLOG_NOTIFY_TOKEN || "";
    if (!token || String(body.token || "") !== token) {
        return NextResponse.json(
            { ok: false, error: "unauthorized" },
            { status: 401 },
        );
    }

    const kind = body.kind === "newsletter" ? "newsletter" : "blog";
    const posts = (body.posts || []).filter((p) => p && (p.title || p.url));
    if (!posts.length) {
        return NextResponse.json(
            { ok: false, error: "no posts" },
            { status: 422 },
        );
    }

    // 구독자 명단은 구글시트(Apps Script 바인딩)에만 있으므로 Apps Script로 조회한다.
    const webhook =
        process.env.DEMO_WEBHOOK_URL || process.env.NEWSLETTER_WEBHOOK_URL;
    if (!webhook) {
        return NextResponse.json(
            { ok: false, error: "webhook not configured" },
            { status: 500 },
        );
    }
    let emails: string[] = [];
    try {
        const r = await fetch(webhook, {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ kind: "subscribers", token, subKind: kind }),
        });
        const j = (await r.json()) as { emails?: unknown };
        emails = Array.isArray(j?.emails)
            ? (j.emails as unknown[]).map(String).filter(Boolean)
            : [];
    } catch (e) {
        console.error("[content-notify] 구독자 조회 실패:", e);
        return NextResponse.json(
            { ok: false, error: "subscribers fetch failed" },
            { status: 502 },
        );
    }

    const { word, heading } = KINDS[kind];
    const results = await Promise.allSettled(
        emails.map((email) => {
            const unsub = `${SITE}/unsubscribe?kind=${kind}&email=${encodeURIComponent(email)}`;
            return sendMail(contentNotifyMail(posts, email, unsub, heading, word));
        }),
    );
    const sent = results.filter(
        (r) => r.status === "fulfilled" && r.value,
    ).length;
    return NextResponse.json({ ok: true, sent, subscribers: emails.length });
}
