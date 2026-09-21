import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "labs_governance_session";
export const STATE_COOKIE = "labs_governance_state";
export function appOrigin(req: NextRequest) {
    // 운영 콜백 주소는 기존 Decap OAuth 앱과 동일하다.
    return process.env.NODE_ENV === "production"
        ? (process.env.OAUTH_REDIRECT_ORIGIN || "https://labs.plateer.com")
        : new URL(req.url).origin;
}
export const cookieOptions = {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const, path: "/",
};

export async function governanceCallback(req: NextRequest) {
    const state = req.nextUrl.searchParams.get("state") || "";
    const expected = req.cookies.get(STATE_COOKIE)?.value || "";
    const destination = new URL("/admin/governance", appOrigin(req));
    const fail = () => {
        destination.searchParams.set("login", "failed");
        const res = NextResponse.redirect(destination);
        res.cookies.delete(STATE_COOKIE);
        return res;
    };
    const actualBytes = Buffer.from(state), expectedBytes = Buffer.from(expected);
    if (!expected || actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) return fail();
    const code = req.nextUrl.searchParams.get("code");
    if (!code || !process.env.GITHUB_OAUTH_CLIENT_SECRET) return fail();
    try {
        const result = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST", cache: "no-store", signal: AbortSignal.timeout(15000),
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
                client_id: process.env.GITHUB_OAUTH_CLIENT_ID || "Ov23liv3gveHfTPsLH2Z",
                client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET, code,
                redirect_uri: `${appOrigin(req)}/api/callback`,
            }),
        });
        const data = await result.json();
        if (!result.ok || typeof data.access_token !== "string") return fail();
        const res = NextResponse.redirect(destination);
        res.cookies.set(SESSION_COOKIE, data.access_token, { ...cookieOptions, maxAge: 8 * 3600 });
        res.cookies.delete(STATE_COOKIE);
        res.headers.set("Cache-Control", "no-store");
        return res;
    } catch { return fail(); }
}
