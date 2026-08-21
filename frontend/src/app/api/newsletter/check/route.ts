import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 구독 여부 확인 — 이미 구독 중인 독자가 다른 기기에서 현장 리포트를 열었을 때
 * 이메일만으로 게이트를 풀어주기 위한 경로.
 *
 * 조회는 통합 리드 웹훅(docs/lead-webhook.gs)이 이미 갖고 있는 경로를 그대로 쓴다 —
 * `{kind:"subscribers", token, subKind}` 를 POST 하면 구독중(Y) 이메일 목록을
 * 돌려준다. 발행 알림(/api/content-notify)이 쓰던 것과 같은 장치라, Apps Script 를
 * 고치거나 새 환경변수를 만들 필요가 없다(BLOG_NOTIFY_TOKEN 재사용).
 *
 * ⚠ 이 확인은 "그 주소가 명단에 있는가"만 본다. 이메일 소유 확인이 아니므로
 * 콘텐츠 차단이 아니라 리드 수집 장치로만 쓴다. 응답도 참/거짓만 돌려준다.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * 게이트를 여는 근거가 되는 명단.
 *   newsletter   — 뉴스레터 구독자
 *   xgen-preview — XGEN 프리뷰 구독자
 *   field-report — 현장 리포트에서 이미 리드 정보를 남긴 사람(재입력 없이 통과)
 * 전 카테고리 새 글 알림(blog)은 성격이 달라 근거로 삼지 않는다.
 */
const KINDS = ["newsletter", "xgen-preview", "field-report"] as const;

/** 명단은 자주 바뀌지 않는다 — 확인마다 시트를 긁지 않도록 잠깐 들고 있는다. */
let cache: { at: number; emails: Set<string> } | null = null;
const TTL_MS = 5 * 60 * 1000;

async function subscriberEmails(): Promise<Set<string> | null> {
    if (cache && Date.now() - cache.at < TTL_MS) return cache.emails;

    const webhook =
        process.env.DEMO_WEBHOOK_URL || process.env.NEWSLETTER_WEBHOOK_URL;
    const token = process.env.BLOG_NOTIFY_TOKEN;
    if (!webhook || !token) return null;

    const emails = new Set<string>();
    for (const subKind of KINDS) {
        const res = await fetch(webhook, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ kind: "subscribers", token, subKind }),
            redirect: "follow", // Apps Script 는 googleusercontent 로 넘긴다
            signal: AbortSignal.timeout(8000),
        });
        const data = (await res.json()) as { ok?: boolean; emails?: string[] };
        if (!data.ok || !Array.isArray(data.emails)) return null;
        data.emails.forEach((e) => emails.add(String(e).trim().toLowerCase()));
    }
    cache = { at: Date.now(), emails };
    return emails;
}

export async function POST(req: Request) {
    let email = "";
    try {
        const body = (await req.json()) as { email?: string };
        email = String(body.email ?? "")
            .trim()
            .toLowerCase();
    } catch {
        return NextResponse.json({ subscribed: false }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ subscribed: false }, { status: 422 });
    }

    try {
        const emails = await subscriberEmails();
        // 조회 자체가 불가능한 환경(토큰·웹훅 미설정)에서는 조용히 false —
        // 게이트 화면은 이 경우 정보 입력 폼으로 돌아간다.
        if (!emails) return NextResponse.json({ subscribed: false, configured: false });
        return NextResponse.json({ subscribed: emails.has(email) });
    } catch {
        return NextResponse.json({ subscribed: false, configured: false });
    }
}
