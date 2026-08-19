import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { expireMembersDiskCache, inspectMembersCache } from "@/lib/members/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Read-only cache state for debugging. Safe to expose (no PII). */
export async function GET() {
    const info = await inspectMembersCache();
    return NextResponse.json({
        ok: true,
        tokenConfigured: Boolean(process.env.MEMBERS_REVALIDATE_TOKEN),
        ...info,
    });
}

export async function POST(req: Request) {
    const expected = process.env.MEMBERS_REVALIDATE_TOKEN;
    if (!expected) {
        return NextResponse.json(
            { error: "Revalidation disabled (no token configured)" },
            { status: 503 },
        );
    }
    const got = req.headers.get("x-revalidate-token");
    if (got !== expected) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // 태그 무효화만으로는 GitHub 를 다시 치지 않는다 — 디스크 캐시도 함께 만료시켜야
    // 다음 로드가 실제로 원본을 읽는다(cache.ts 의 expireMembersDiskCache 주석 참고).
    const diskExpired = await expireMembersDiskCache();
    revalidateTag("members");
    return NextResponse.json({
        revalidated: true,
        diskExpired,
        at: new Date().toISOString(),
    });
}
