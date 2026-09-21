import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { appOrigin, cookieOptions, STATE_COOKIE } from "@/lib/governance/auth";

export const dynamic = "force-dynamic";
export function GET(req: NextRequest) {
    const state = "governance_" + randomBytes(32).toString("hex");
    const target = new URL("https://github.com/login/oauth/authorize");
    target.searchParams.set("client_id", process.env.GITHUB_OAUTH_CLIENT_ID || "Ov23liv3gveHfTPsLH2Z");
    target.searchParams.set("redirect_uri", `${appOrigin(req)}/api/callback`);
    target.searchParams.set("scope", "public_repo,read:user");
    target.searchParams.set("state", state);
    const res = NextResponse.redirect(target);
    res.cookies.set(STATE_COOKIE, state, { ...cookieOptions, maxAge: 600 });
    res.headers.set("Cache-Control", "no-store");
    return res;
}
