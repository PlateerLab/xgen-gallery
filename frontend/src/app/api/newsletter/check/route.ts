import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 구독 여부 확인 — 이미 구독한 독자가 다른 기기에서 현장 리포트를 열었을 때
 * 이메일만으로 구독 게이트를 풀어주기 위한 경로.
 *
 * 실제 조회는 구독자 시트(Apps Script)가 한다. 조회 토큰은 서버에만 두고
 * 브라우저로 내려보내지 않는다(docs/newsletter-webhook.gs 의 CHECK_TOKEN 과 같은 값).
 *
 * ⚠ 이 확인은 "그 주소가 구독자 명단에 있는가"만 본다. 이메일 소유 확인이 아니다.
 * 남의 주소를 넣어도 통과할 수 있으므로, 콘텐츠 차단이 아니라 리드 수집 장치로만
 * 쓴다. 또한 응답은 참/거짓만 돌려주고 그 밖의 정보는 담지 않는다.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
    let email = "";
    try {
        const body = (await req.json()) as { email?: string };
        email = String(body.email ?? "").trim();
    } catch {
        return NextResponse.json({ subscribed: false }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ subscribed: false }, { status: 422 });
    }

    const base =
        process.env.NEWSLETTER_CHECK_URL || process.env.NEWSLETTER_WEBHOOK_URL;
    const token = process.env.NEWSLETTER_CHECK_TOKEN;
    // 조회 경로가 아직 설정되지 않은 환경에서는 조용히 "확인 불가"로 답한다 —
    // 게이트 화면은 이 경우 기존 입력 폼으로 돌아간다.
    if (!base || !token) {
        return NextResponse.json({ subscribed: false, configured: false });
    }

    try {
        const url = new URL(base);
        url.searchParams.set("action", "check");
        url.searchParams.set("token", token);
        url.searchParams.set("email", email);
        const res = await fetch(url, {
            method: "GET",
            redirect: "follow", // Apps Script 는 script.googleusercontent.com 으로 넘긴다
            signal: AbortSignal.timeout(8000),
        });
        const data = (await res.json()) as { subscribed?: boolean };
        return NextResponse.json({ subscribed: data.subscribed === true });
    } catch {
        return NextResponse.json({ subscribed: false, configured: false });
    }
}
