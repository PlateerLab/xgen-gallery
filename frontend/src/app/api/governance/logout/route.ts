import { NextRequest, NextResponse } from "next/server";
import { appOrigin, SESSION_COOKIE } from "@/lib/governance/auth";
export function POST(req: NextRequest) {
    if (req.headers.get("origin") !== appOrigin(req)) return new Response(null, { status: 403 });
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(SESSION_COOKIE);
    response.headers.set("Cache-Control", "no-store");
    return response;
}
