import { type Locale, DEFAULT_LOCALE } from "./i18n";

/**
 * 경로 기반 로케일 라우팅 — 한국어는 접두사 없이(`/about`), 영어는 `/en` 접두사로
 * (`/en/about`) 서빙한다. 쿠키 전환과 달리 언어별 URL이 실제로 존재해야
 * 검색엔진·답변엔진이 두 언어를 각각 색인할 수 있다
 * (docs/GEO-OPTIMIZATION-GUIDE.md §0-S "다국어(i18n) hreflang").
 *
 * 한국어 URL은 기존 그대로 유지한다 — 이미 색인된 주소라 접두사를 붙이면
 * 전량 301이 필요해지고 순위가 흔들린다.
 */
export const EN_PREFIX = "/en";

/**
 * 영문판이 실제로 존재하는 경로 목록(정적 라우트).
 *
 * 이 목록이 hreflang·사이트맵·언어 토글의 단일 기준이다. 번역되지 않은 페이지를
 * 여기 넣으면 hreflang이 한국어 콘텐츠를 영문 대체본이라고 선언하게 되어
 * 구글이 잘못된 언어 페이지를 노출한다 — 반드시 영문 카피를 실제로 붙인 뒤 추가한다.
 */
export const EN_ROUTES: readonly string[] = [
    // 영문 페이지를 추가할 때마다 여기에 같이 넣는다(app/(en)/en/<route>/page.tsx).
    "/",
    "/about",
    "/contact",
    "/solutions",
    "/technology",
    "/resources",
    "/architecture",
    "/security-and-governance",
    "/code-assistant",
    "/technical-consulting",
    "/documentation",
    "/xgen-trial",
    "/support",
    "/polar",
    "/pathfinder",
    "/enablement",
    "/product",
    "/customers",
    "/proof-in-action",
    "/poc-projects",
    "/research",
    "/library-gallery",
    "/blog",
    "/newsletter",
    // "/ai-quality-policy" — 승인 대기 히든 프리뷰로만 존재한다. 공개 라우트가 없는데
    // 여기 남겨 두면 사이트맵이 404 URL을 광고하게 된다. 정식 공개 때 되살린다.
];

/** 하위 경로까지 영문판이 있는 동적 라우트(개별 글은 slug 단위로 별도 확인). */
const EN_DYNAMIC_PREFIXES: readonly string[] = [
    "/customers/case/",
    "/customers/",
    // 블로그는 38편 전편이 content/blog/en 에 있어 slug 단위로 1:1 대응한다.
    "/blog/series/",
    "/blog/",
    // 오픈소스 툴 상세 — 데모 UI가 이미 영문이라 전체 slug에 영문판이 있다.
    "/tool/",
    // 뉴스레터 — 영문본이 있는 호만 /en 라우트가 생성된다(newsletter-en.ts 기준).
    "/newsletter/",
];

/** `/en/about` → `"en"`, `/about` → `"ko"`. */
export function localeFromPath(pathname: string): Locale {
    return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
        ? "en"
        : DEFAULT_LOCALE;
}

/** `/en/about` → `/about`. 로케일 접두사를 벗겨 "언어 중립" 경로를 얻는다. */
export function stripLocale(pathname: string): string {
    if (pathname === EN_PREFIX) return "/";
    if (pathname.startsWith(`${EN_PREFIX}/`)) {
        const rest = pathname.slice(EN_PREFIX.length);
        return rest || "/";
    }
    return pathname || "/";
}

/**
 * 언어 중립 경로를 해당 로케일의 실제 URL로 바꾼다.
 * `localePath("en", "/about")` → `/en/about`, `localePath("ko", "/about")` → `/about`.
 */
export function localePath(locale: Locale, path: string): string {
    const clean = stripLocale(path);
    if (locale === DEFAULT_LOCALE) return clean;
    return clean === "/" ? EN_PREFIX : `${EN_PREFIX}${clean}`;
}

/** 이 경로에 영문판이 있는가 — 언어 토글 활성화와 hreflang 출력의 기준. */
export function hasEnglish(path: string): boolean {
    const clean = stripLocale(path);
    if (EN_ROUTES.includes(clean)) return true;
    return EN_DYNAMIC_PREFIXES.some((p) => clean.startsWith(p));
}

/**
 * 내부 링크를 현재 로케일에 맞춰 다시 쓴다 — GNB·푸터·본문 링크 공용.
 *
 * 영문 페이지에서 영문판이 있는 곳은 `/en/...`으로, 아직 번역되지 않은 곳은
 * 한국어 URL 그대로 둔다(존재하지 않는 `/en/...`으로 보내면 404가 된다).
 * 앵커(`#`)와 쿼리(`?`)는 보존하고, 외부 URL·mailto·해시 단독 링크는 손대지 않는다.
 */
export function localeHref(locale: Locale, href: string): string {
    if (
        locale === DEFAULT_LOCALE ||
        !href.startsWith("/") ||
        href.startsWith("//")
    ) {
        return href;
    }
    const match = /^([^?#]*)(.*)$/.exec(href);
    const path = match?.[1] || "/";
    const suffix = match?.[2] ?? "";
    if (!hasEnglish(path)) return href;
    return `${localePath(locale, path)}${suffix}`;
}

/**
 * hreflang 대체 URL 맵 — Next `alternates.languages`에 그대로 넘긴다.
 * 영문판이 없는 페이지는 한국어 단일 언어로 두고 hreflang을 내보내지 않는다
 * (없는 영문 URL을 선언하면 색인 오류가 된다).
 */
export function languageAlternates(
    path: string,
): Record<string, string> | undefined {
    if (!hasEnglish(path)) return undefined;
    const clean = stripLocale(path);
    return {
        ko: clean,
        en: localePath("en", clean),
        // x-default = 언어가 특정되지 않은 사용자에게 보여줄 기본판(한국어 본판).
        "x-default": clean,
    };
}
