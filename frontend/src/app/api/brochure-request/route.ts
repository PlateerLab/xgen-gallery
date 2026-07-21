import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * XGEN 소개서(브로슈어) 다운로드 리드 폼 수신 핸들러.
 *
 * 흐름: /resources 의 리드 폼 제출 → 필수 필드·동의 검증 → BROCHURE_WEBHOOK_URL
 * (없으면 DEMO_WEBHOOK_URL)로 포워딩(Slack/email/CRM), 없으면 서버 로그 →
 * 성공 시 downloadUrl 반환 → 클라이언트가 소개서 PDF 다운로드를 노출/트리거.
 *
 * 게이팅은 "소프트 게이트"다(폼 제출 후 다운로드 노출). PDF 자체는 /public 에
 * 있으므로 직접 URL 접근은 막지 않는다 — 더 강한 게이트가 필요하면 서명 쿠키 기반
 * /api/brochure/download 라우트로 승격할 수 있다.
 */
interface BrochureRequest {
    email?: string;
    name?: string;
    company?: string;
    department?: string;
    jobTitle?: string;
    phone?: string;
    referralPath?: string;
    agreePrivacyPolicy?: boolean;
    agreePrivacyCollect?: boolean;
    agreeMarketing?: boolean;
    asset?: string;
}

/** 다운로드 대상 자산 — 프론트의 다운로드 노출과 동일 경로. */
const DOWNLOAD_URL = "/downloads/xgen-brochure.pdf";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
    let body: BrochureRequest;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const required: (keyof BrochureRequest)[] = [
        "email",
        "name",
        "company",
        "department",
        "jobTitle",
        "phone",
    ];
    const missing = required.filter((k) => !String(body[k] ?? "").trim());
    if (missing.length > 0) {
        return NextResponse.json(
            { error: "Missing required fields", fields: missing },
            { status: 422 },
        );
    }
    if (!EMAIL_RE.test(String(body.email))) {
        return NextResponse.json(
            { error: "Invalid email", fields: ["email"] },
            { status: 422 },
        );
    }
    const requiredConsents: (keyof BrochureRequest)[] = [
        "agreePrivacyPolicy",
        "agreePrivacyCollect",
    ];
    const missingConsent = requiredConsents.filter((k) => !body[k]);
    if (missingConsent.length > 0) {
        return NextResponse.json(
            { error: "Required consent missing", fields: missingConsent },
            { status: 422 },
        );
    }

    const record = {
        ...body,
        asset: body.asset || "xgen-brochure",
        receivedAt: new Date().toISOString(),
        source: "labs-site/resources",
    };

    const webhook =
        process.env.BROCHURE_WEBHOOK_URL || process.env.DEMO_WEBHOOK_URL;
    if (webhook) {
        try {
            await fetch(webhook, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(record),
            });
        } catch (e) {
            console.error("[brochure-request] webhook forward failed:", e);
            return NextResponse.json(
                { error: "Delivery failed" },
                { status: 502 },
            );
        }
    } else {
        // 전달 대상 미설정 — 리드가 유실되지 않게 서버 로그에 남긴다.
        console.log("[brochure-request] received:", JSON.stringify(record));
    }

    return NextResponse.json({ ok: true, downloadUrl: DOWNLOAD_URL });
}
