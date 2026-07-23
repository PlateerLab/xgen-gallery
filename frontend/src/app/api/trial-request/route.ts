import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TrialRequest {
    email?: string;
    name?: string;
    company?: string;
    department?: string;
    jobTitle?: string;
    phone?: string;
    agreePrivacyCollect?: boolean;
    agreeMarketing?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * XGEN 무료 체험 신청(내부 모달 폼) 접수. 필수 항목·이메일·필수 동의를 검증한 뒤
 * TRIAL_WEBHOOK_URL(Slack/이메일/CRM)이 설정돼 있으면 전달하고, 아니면 서버 로그로
 * 남긴다. 실제 전달은 env만 설정하면 되며 코드 변경이 필요 없다.
 */
export async function POST(req: Request) {
    let body: TrialRequest;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const required: (keyof TrialRequest)[] = [
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
    if (!body.agreePrivacyCollect) {
        return NextResponse.json(
            { error: "Required consent missing", fields: ["agreePrivacyCollect"] },
            { status: 422 },
        );
    }

    const record = {
        ...body,
        receivedAt: new Date().toISOString(),
        source: "gallery-site/xgen-trial",
    };

    const webhook = process.env.TRIAL_WEBHOOK_URL || process.env.DEMO_WEBHOOK_URL;
    if (webhook) {
        try {
            await fetch(webhook, {
                method: "POST",
                headers: { "content-type": "application/json; charset=utf-8" },
                body: JSON.stringify(record),
            });
        } catch (e) {
            console.error("[trial-request] webhook forward failed:", e);
            return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
        }
    } else {
        // No delivery target configured yet — log so it's not lost.
        console.log("[trial-request] received:", JSON.stringify(record));
    }

    return NextResponse.json({ ok: true });
}
