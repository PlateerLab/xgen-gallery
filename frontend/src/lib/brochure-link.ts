/**
 * 소개서 PDF 서명 링크 — 소개서를 서명·만료가 붙은 URL로만 내려준다.
 *
 * 왜: 소개서를 "담당자 확인 후 발송"으로 바꿔도 PDF가 /public/downloads 에 그대로
 * 있으면 경로를 아는 사람은 폼을 거치지 않고 받아갈 수 있었다. 그래서
 *   - middleware 가 /downloads/* 직접 접근을 무조건 막고,
 *   - 실제 파일은 이 서명을 검증하는 /api/brochure/download 라우트만 내려준다.
 *
 * ⚠️ 검증을 middleware(Edge)에서 하지 않는 이유: 운영 배포는 .env 를 컨테이너
 * **런타임**에만 주입한다(docker-compose env_file). Edge 런타임의 process.env 는
 * 빌드 시점에 인라인되므로 미들웨어에서는 시크릿이 undefined 가 되어, 정상 링크까지
 * 전부 403 이 된다. 그래서 검증은 런타임 env 를 제대로 읽는 Node 라우트에서 한다.
 *
 * 키: BROCHURE_TOKEN_SECRET > SMTP_PASS 순. 운영 .env 에 SMTP_PASS 가 이미 주입돼
 * 있어 새 시크릿 없이도 동작한다(SMTP_PASS 를 교체하면 그 전에 보낸 링크는 만료 전이라도
 * 무효 — 재발송하면 된다). 운영에서 둘 다 없으면 서명을 만들지도 통과시키지도 않는다.
 */
const DEV_FALLBACK_KEY = "dev-only-brochure-key";

/** 기본 유효기간 30일 — 담당자가 확인 후 전달하고, 요청자가 나중에 열어볼 여유. */
export const DOWNLOAD_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** 서명 링크가 가리키는 다운로드 라우트. */
export const DOWNLOAD_ROUTE = "/api/brochure/download";

function keyMaterial(): string | null {
    const secret = process.env.BROCHURE_TOKEN_SECRET || process.env.SMTP_PASS;
    if (secret) return secret;
    // 운영에서 시크릿이 없으면 링크를 만들지도, 통과시키지도 않는다.
    return process.env.NODE_ENV === "production" ? null : DEV_FALLBACK_KEY;
}

function b64url(bytes: ArrayBuffer): string {
    let s = "";
    for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string | null> {
    const secret = keyMaterial();
    if (!secret) return null;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
}

/** 길이·내용이 달라도 동일 시간에 비교 — 서명 대조에서 타이밍 정보를 흘리지 않는다. */
function safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

/**
 * 소개서 종류(asset)에 대한 서명 다운로드 경로. 시크릿이 없으면(운영 설정 누락)
 * null — 호출부는 링크 대신 담당자가 PDF를 직접 첨부하도록 안내해야 한다.
 *
 * 경로가 아니라 asset 을 서명한다 — 라우트가 카탈로그에서 파일을 되찾으므로
 * 파일 경로가 요청으로 들어올 일이 없고, 경로 조작(traversal) 여지도 없다.
 */
export async function signDownloadPath(
    asset: string,
    ttlMs: number = DOWNLOAD_TTL_MS,
): Promise<string | null> {
    const exp = Date.now() + ttlMs;
    const sig = await sign(`${asset}|${exp}`);
    if (!sig) return null;
    return `${DOWNLOAD_ROUTE}?a=${encodeURIComponent(asset)}&e=${exp}&s=${sig}`;
}

/** 다운로드 라우트의 검증 — asset·만료·서명이 모두 맞아야 통과. */
export async function verifyDownload(
    asset: string | null,
    exp: string | null,
    sig: string | null,
): Promise<boolean> {
    if (!asset || !exp || !sig) return false;
    const expMs = Number(exp);
    if (!Number.isFinite(expMs) || expMs < Date.now()) return false;
    const expected = await sign(`${asset}|${expMs}`);
    return expected !== null && safeEqual(expected, sig);
}
