import { NextResponse, type NextRequest } from "next/server";

/**
 * 엣지 봇 차단 — robots.txt를 무시하는 경쟁사·스크래퍼 봇을 User-Agent로 식별해 403을 반환한다.
 * robots.ts의 BLOCKED_BOTS와 동기화한다. (docs/GEO-OPTIMIZATION-GUIDE.md §2.3-S)
 *
 * 주의: 검색엔진(Googlebot·Bingbot·Naver Yeti)과 GEO 답변엔진(GPTBot·ClaudeBot·PerplexityBot 등)은
 * 절대 차단하지 않는다 — SEO·GEO 노출에 필수다. 더 강한 방어(레이트리밋, UA 위조)는 WAF에서 처리한다.
 */
const BLOCKED_BOTS = [
    "ahrefsbot",
    "ahrefssiteaudit",
    "semrushbot",
    "mj12bot",
    "dotbot",
    "rogerbot",
    "dataforseobot",
    "blexbot",
    "barkrowler",
    "serpstatbot",
    "zoominfobot",
    "magpie-crawler",
    "velenpublicwebcrawler",
    "screaming frog seo spider",
    "seznambot",
    "sogou web spider",
    "linkdexbot",
    "spbot",
    "siteauditbot",
];

/**
 * 레거시 호스트 — 같은 앱이 예전 도메인으로도 서빙되고 있어서, 301 없이 두면
 * 구글이 동일 콘텐츠를 두 도메인에서 보고 **이미 색인된 예전 도메인을 계속 노출**한다
 * (canonical만으로는 이전이 확정되지 않는다). Google SEO 가이드의 "사이트 이전 시
 * 301 리디렉션" 권고에 맞춰 경로·쿼리를 보존한 채 정식 도메인으로 영구 이동시킨다.
 * 리디렉션이 살아 있어야 Search Console '주소 변경' 도구도 사용할 수 있다.
 */
const LEGACY_HOSTS = ["gallery-xgen.x2bee.com"];
const CANONICAL_ORIGIN = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://labs.plateer.com"
).replace(/\/$/, "");

export function middleware(req: NextRequest) {
    const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";
    if (ua && BLOCKED_BOTS.some((bot) => ua.includes(bot))) {
        return new NextResponse("Access denied", {
            status: 403,
            headers: { "x-robots-tag": "noindex, nofollow" },
        });
    }

    // 프록시 뒤에서는 req.nextUrl.host가 내부 호스트일 수 있어 원본 Host 헤더를 본다.
    const host = (
        req.headers.get("x-forwarded-host") ||
        req.headers.get("host") ||
        ""
    )
        .split(",")[0]
        .trim()
        .toLowerCase()
        .replace(/:\d+$/, "");
    if (LEGACY_HOSTS.includes(host)) {
        const target = new URL(
            req.nextUrl.pathname + req.nextUrl.search,
            CANONICAL_ORIGIN,
        );
        return NextResponse.redirect(target, 301);
    }

    return NextResponse.next();
}

export const config = {
    // 정적 에셋·이미지 최적화·favicon은 제외하고 페이지 요청에만 적용.
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
