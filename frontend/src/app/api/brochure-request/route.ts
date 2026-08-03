import { NextResponse, after } from "next/server";
import { resolveBrochure, DEFAULT_BROCHURE } from "@/lib/brochures";
// brochureMail(요청자 자동 발송)은 담당자 수동 발송으로 전환하며 호출을 뺐다.
// 되돌릴 때 다시 import 하면 된다 — lib/mailer.ts에 그대로 남아 있다.
import { sendMail, brochureInternalMail } from "@/lib/mailer";
import { signDownloadPath } from "@/lib/brochure-link";

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

    // 종류 구분자(asset)로 브로셔를 해석 — 다운로드 PDF·표시명이 종류별로 갈린다.
    const brochure = resolveBrochure(body.asset);
    const record = {
        ...body,
        asset: brochure.asset || DEFAULT_BROCHURE,
        brochureName: brochure.name,
        receivedAt: new Date().toISOString(),
        source: "labs-site/resources",
    };

    // 접수 응답 먼저 — 시트 적재(웹훅) + 담당자 알림(앱 O365 SMTP·발신 xgen)은 백그라운드.
    const webhook =
        process.env.BROCHURE_WEBHOOK_URL || process.env.DEMO_WEBHOOK_URL;
    const info = {
        name: brochure.name,
        file: brochure.file,
        // 서명 링크는 담당자 알림 메일에만 들어간다. 이 응답에는 넣지 않는다 —
        // 폼 제출자에게 바로 주면 "담당자 확인 후 발송"이 무의미해진다.
        signedPath: await signDownloadPath(brochure.asset || DEFAULT_BROCHURE),
    };
    after(async () => {
        const jobs: Promise<unknown>[] = [];
        if (webhook) {
            jobs.push(
                fetch(webhook, {
                    method: "POST",
                    headers: { "content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify(record),
                }).catch((e) =>
                    console.error("[brochure-request] webhook forward failed:", e),
                ),
            );
        } else {
            console.log("[brochure-request] received:", JSON.stringify(record));
        }
        // 요청자 자동 발송(brochureMail)은 중단 — 담당자가 내부 알림을 확인한 뒤
        // 직접 보낸다(요청). 내부 알림에 프리필 mailto 버튼이 들어 있다.
        jobs.push(sendMail(brochureInternalMail(record, info))); // 내부 접수 알림
        await Promise.allSettled(jobs);
    });

    // downloadUrl은 더 이상 주지 않는다 — 소개서는 담당자가 확인 후 메일로 보낸다.
    return NextResponse.json({ ok: true });
}
