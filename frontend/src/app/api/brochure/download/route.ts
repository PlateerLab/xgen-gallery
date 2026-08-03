import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BROCHURES, type Brochure } from "@/lib/brochures";
import { verifyDownload } from "@/lib/brochure-link";

/**
 * 소개서 PDF 다운로드 — 서명·만료가 유효한 링크에만 파일을 내려준다.
 *
 * /downloads/* 직접 접근은 middleware 가 막고, 실제 전달은 이 라우트만 한다.
 * 링크는 담당자 알림 메일에만 들어가므로(담당자 확인 후 발송), 폼을 거치지 않은
 * 사람이 경로만 알아서 받아가던 구멍이 닫힌다.
 *
 * 검증을 미들웨어가 아니라 여기서 하는 이유는 lib/brochure-link.ts 주석 참고
 * (운영은 .env 를 런타임에만 주입 → Edge 런타임에서는 시크릿을 못 읽는다).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function deny(message: string, status: number) {
    return new NextResponse(message, {
        status,
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-robots-tag": "noindex, nofollow",
            "cache-control": "no-store",
        },
    });
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const asset = url.searchParams.get("a");
    const ok = await verifyDownload(
        asset,
        url.searchParams.get("e"),
        url.searchParams.get("s"),
    );
    if (!ok) {
        return deny(
            "이 링크는 만료되었거나 유효하지 않습니다. 소개서는 labs.plateer.com/resources 에서 다시 신청해 주세요.",
            403,
        );
    }

    // 서명이 유효해도 파일은 카탈로그에서만 찾는다 — 요청 값이 경로에 닿지 않는다.
    const brochure = (BROCHURES as Record<string, Brochure>)[asset as string];
    if (!brochure) return deny("소개서를 찾을 수 없습니다.", 404);

    // brochure.file 은 "/downloads/<name>.pdf" — 파일명만 떼어 public 아래에서 읽는다.
    const filename = path.basename(brochure.file);
    const filePath = path.join(process.cwd(), "public", "downloads", filename);
    let body: Buffer;
    try {
        body = await readFile(filePath);
    } catch (e) {
        console.error("[brochure/download] read failed:", filePath, e);
        return deny("소개서 파일을 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.", 500);
    }

    return new NextResponse(new Uint8Array(body), {
        headers: {
            "content-type": "application/pdf",
            "content-length": String(body.byteLength),
            "content-disposition": `attachment; filename="${filename}"`,
            "x-robots-tag": "noindex, nofollow",
            "cache-control": "private, no-store",
        },
    });
}
