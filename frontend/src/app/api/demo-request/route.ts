import { NextResponse, after } from "next/server";
import { pickLeadAttribution } from "@/lib/lead-attribution";
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
    /** 문의 유형 URL 태그(?type= 값): demo·trial·poc·brochure·newsletter·fieldReport·other */
    inquiryTypeKey?: string;
    referralPath?: string;
    referrer?: string;
    inquiry?: string;
    agreePrivacyPolicy?: boolean;
    agreePrivacyCollect?: boolean;
    agreeMarketing?: boolean;
    /** 운영 점검용 제출. 실제 신청자·담당자 대신 지정된 QA 수신자에게만 알린다. */
    testMode?: boolean;
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
        // 유입 경로(UTM) 9개 — 문자열·500자로 정리해 시트·메일에 전달
        ...pickLeadAttribution(body),
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
            // 현장 리포트 신청은 상담 리드 상세를 leads 탭에 남기는 동시에
            // subscribers 탭에도 종류를 구분해 기록한다. 그래야 다른 기기에서도
            // 이메일 확인만으로 이미 신청한 독자의 본문 게이트를 열 수 있다.
            if (body.inquiryType === "현장 리포트 구독하기" ||
                body.inquiryType === "Field report subscription") {
                jobs.push(
                    fetch(webhook, {
                        method: "POST",
                        headers: { "content-type": "application/json; charset=utf-8" },
                        body: JSON.stringify({
                            kind: "field-report",
                            email: body.email,
                            company: body.company,
                            name: body.name,
                            jobTitle: body.jobTitle,
                            subscribed: "Y",
                            receivedAt: record.receivedAt,
                        }),
                    }).catch((e) =>
                        console.error("[demo-request] field report subscription failed:", e),
                    ),
                );
            }
        } else {
            console.log("[demo-request] received:", JSON.stringify(record));
        }
        if (body.testMode === true) {
            // 운영 점검이 실제 신청자나 상담 담당자에게 도달하지 않게 한 통으로 격리한다.
            const testMail = contactInternalMail(record);
            jobs.push(
                sendMail({
                    ...testMail,
                    to: "swan@plateer.com",
                    subject: `[TEST] ${testMail.subject}`,
                }),
            );
        } else {
            jobs.push(sendMail(contactConfirmMail(record))); // 신청자 접수확인
            jobs.push(sendMail(contactInternalMail(record))); // 내부 팀 알림
        }
        await Promise.allSettled(jobs);
    });

    return NextResponse.json({ ok: true });
}
