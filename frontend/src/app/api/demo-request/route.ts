import { NextResponse, after } from "next/server";
import {
    sendMail,
    contactConfirmMail,
    contactInternalMail,
} from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface DemoRequest {
    email?: string;
    name?: string;
    company?: string;
    department?: string;
    jobTitle?: string;
    phone?: string;
    inquiryType?: string;
    referralPath?: string;
    referrer?: string;
    inquiry?: string;
    agreePrivacyPolicy?: boolean;
    agreePrivacyCollect?: boolean;
    agreeMarketing?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Receives an XGEN demo-trial request from the site modal. Validates required
 * fields, then forwards to DEMO_WEBHOOK_URL if configured (Slack/email/CRM),
 * otherwise logs server-side. Wire real delivery by setting the env var — no
 * code change needed.
 */
export async function POST(req: Request) {
    let body: DemoRequest;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const required: (keyof DemoRequest)[] = [
        "email",
        "name",
        "company",
        "department",
        "jobTitle",
        "phone",
        "referralPath",
        "inquiry",
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
    const requiredConsents: (keyof DemoRequest)[] = [
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
        receivedAt: new Date().toISOString(),
        source: "gallery-site/demo-page",
    };

    // 응답을 먼저 보내고, 시트 적재(Apps Script 웹훅) + 이메일 발송(앱 O365 SMTP·발신 xgen)은
    // 백그라운드로 처리한다(체감 지연 제거).
    const webhook = process.env.DEMO_WEBHOOK_URL;
    after(async () => {
        const jobs: Promise<unknown>[] = [];
        if (webhook) {
            jobs.push(
                fetch(webhook, {
                    method: "POST",
                    headers: { "content-type": "application/json; charset=utf-8" },
                    body: JSON.stringify(record),
                }).catch((e) =>
                    console.error("[demo-request] webhook forward failed:", e),
                ),
            );
        } else {
            console.log("[demo-request] received:", JSON.stringify(record));
        }
        jobs.push(sendMail(contactConfirmMail(record))); // 신청자 접수확인
        jobs.push(sendMail(contactInternalMail(record))); // 내부 팀 알림
        await Promise.allSettled(jobs);
    });

    return NextResponse.json({ ok: true });
}
