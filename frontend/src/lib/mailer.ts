import nodemailer from "nodemailer";

/**
 * CTA 이메일 발송 — Office 365 SMTP(smtp.office365.com)로 xgen@plateer.com에서 발송한다.
 * (Apps Script는 O365 SMTP 별칭을 from으로 못 써서, 실제 xgen 발신은 앱에서 처리한다.)
 *
 * 환경변수(go244 .env / 시크릿):
 *   SMTP_HOST(기본 smtp.office365.com) · SMTP_PORT(기본 587) · SMTP_USER(=xgen@plateer.com)
 *   SMTP_PASS(앱 비밀번호 — 시크릿) · MAIL_FROM(기본 SMTP_USER)
 *   MAIL_CONTACT_TO(상담 내부알림) · MAIL_BROCHURE_TO(소개서 내부알림 — swan,xgen)
 * SMTP_USER/PASS 미설정이면 발송을 조용히 생략(빌드·개발 안전).
 */
const HOST = process.env.SMTP_HOST || "smtp.office365.com";
const PORT = Number(process.env.SMTP_PORT || 587);
const USER = process.env.SMTP_USER || "xgen@plateer.com";
const PASS = process.env.SMTP_PASS || ""; // 시크릿 — 이것만 설정하면 됨
const FROM_ADDR = process.env.MAIL_FROM || USER || "xgen@plateer.com";
const FROM_NAME = "Plateer Labs";
/** 내부 알림 수신처 — 상담/소개서 각각(둘 다 xgen 포함). env로 오버라이드 가능. */
const CONTACT_INTERNAL_TO =
    process.env.MAIL_CONTACT_TO || "chat2plex@plateer.com, xgen@plateer.com";
const BROCHURE_INTERNAL_TO =
    process.env.MAIL_BROCHURE_TO || "swan@plateer.com, xgen@plateer.com";

const SITE = "https://labs.plateer.com";

let transport: nodemailer.Transporter | null = null;
function getTransport(): nodemailer.Transporter | null {
    if (!USER || !PASS) return null;
    if (!transport) {
        transport = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            secure: PORT === 465, // 587=STARTTLS
            requireTLS: PORT !== 465, // O365는 587에서 STARTTLS 필수 — 명시적으로 강제
            auth: { user: USER, pass: PASS },
        });
    }
    return transport;
}

export interface Mail {
    to: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
}

/** 실제 발송. SMTP 미설정이면 false(생략). 예외는 삼켜 폼 응답을 막지 않는다. */
export async function sendMail(m: Mail): Promise<boolean> {
    const t = getTransport();
    if (!t) {
        console.warn("[mailer] SMTP 미설정 — 발송 생략:", m.subject);
        return false;
    }
    try {
        await t.sendMail({
            from: `${FROM_NAME} <${FROM_ADDR}>`,
            to: m.to,
            replyTo: m.replyTo || FROM_ADDR,
            subject: m.subject,
            text: m.text,
            html: m.html,
        });
        return true;
    } catch (e) {
        console.error("[mailer] 발송 실패:", m.subject, e);
        return false;
    }
}

/* ── 공통 ─────────────────────────────────────────────── */
const esc = (s: unknown) =>
    String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

const seoulTime = (iso?: string) => {
    const d = iso ? new Date(iso) : new Date();
    return d.toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }); // YYYY-MM-DD HH:mm:ss
};

const wrap = (inner: string) =>
    `<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:15px;line-height:1.7;color:#1a2233">${inner}</div>`;

/* ── 상담(컨택) ───────────────────────────────────────── */
export interface ContactLead {
    email?: string;
    name?: string;
    company?: string;
    department?: string;
    jobTitle?: string;
    phone?: string;
    inquiryType?: string;
    inquiry?: string;
    referrer?: string;
    referralPath?: string;
    receivedAt?: string;
}

/** 신청자에게 접수 확인 메일. */
export function contactConfirmMail(d: ContactLead): Mail {
    const name = d.name || "고객";
    return {
        to: String(d.email || "").trim(),
        subject: "[Plateer Labs] 상담 신청이 접수되었습니다",
        text: [
            `${name}님, 안녕하세요.`,
            "",
            "Plateer Labs에 문의해 주셔서 감사합니다. 아래 내용으로 상담 신청이 접수되었습니다.",
            "",
            `• 문의 유형: ${d.inquiryType || ""}`,
            `• 상담 내용: ${d.inquiry || ""}`,
            "",
            "담당자가 영업일 기준 1~2일 내에 이메일 또는 전화로 연락드리겠습니다.",
            "",
            "감사합니다.",
            "Plateer Labs 드림",
        ].join("\n"),
        html: wrap(
            `<p>${esc(name)}님, 안녕하세요.</p>` +
                "<p>Plateer Labs에 문의해 주셔서 감사합니다.<br>아래 내용으로 <b>상담 신청이 접수</b>되었습니다.</p>" +
                `<div style="margin:16px 0;padding:14px 16px;background:#f5f7fb;border-radius:10px">` +
                `<p style="margin:0 0 6px"><b>문의 유형</b> · ${esc(d.inquiryType || "")}</p>` +
                `<p style="margin:0;color:#5b6472">${esc(d.inquiry || "")}</p></div>` +
                "<p>담당자가 <b>영업일 기준 1~2일 내</b>에 이메일 또는 전화로 연락드리겠습니다.</p>" +
                "<p>감사합니다.<br>Plateer Labs 드림</p>",
        ),
    };
}

/** 내부 팀 알림(상담). */
export function contactInternalMail(d: ContactLead): Mail {
    const lines = [
        `• 문의 유형: ${d.inquiryType || ""}`,
        `• 성함: ${d.name || ""}`,
        `• 이메일: ${d.email || ""}`,
        `• 연락처: ${d.phone || ""}`,
        `• 회사: ${d.company || ""}`,
        `• 부서: ${d.department || ""}`,
        `• 직급: ${d.jobTitle || ""}`,
        `• 방문경로: ${d.referralPath || ""}`,
        `• 레퍼러 페이지: ${d.referrer || ""}`,
        "",
        `• 상담 내용:`,
        d.inquiry || "",
        "",
        `접수 시각(KST): ${seoulTime(d.receivedAt)}`,
    ];
    return {
        to: CONTACT_INTERNAL_TO,
        replyTo: String(d.email || "").trim() || FROM_ADDR,
        subject: `[상담 문의] ${d.inquiryType || ""} - ${d.name || ""} (${d.company || ""})`,
        text: lines.join("\n"),
    };
}

/* ── 소개서(브로셔) ───────────────────────────────────── */
export interface BrochureLead extends ContactLead {
    asset?: string;
    agreeMarketing?: boolean;
}
export interface BrochureInfo {
    name: string;
    file: string;
}

/** 요청자에게 소개서 다운로드 링크 메일. */
export function brochureMail(d: BrochureLead, b: BrochureInfo): Mail {
    const name = d.name || "고객";
    const pdf = SITE + b.file;
    return {
        to: String(d.email || "").trim(),
        subject: `[Plateer Labs] 요청하신 ${b.name} 소개서를 보내드립니다`,
        text: [
            `${name}님, 안녕하세요.`,
            "",
            `Plateer Labs ${b.name}에 관심 가져 주셔서 감사합니다.`,
            `요청하신 ${b.name} 소개서는 아래 링크에서 바로 받으실 수 있습니다.`,
            "",
            pdf,
            "",
            "도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나",
            `${SITE}/contact 로 문의해 주세요.`,
            "",
            "감사합니다.",
            "Plateer Labs 드림",
        ].join("\n"),
        html: wrap(
            `<p>${esc(name)}님, 안녕하세요.</p>` +
                `<p>Plateer Labs ${esc(b.name)}에 관심 가져 주셔서 감사합니다.<br>요청하신 <b>${esc(b.name)} 소개서</b>를 아래 버튼에서 바로 받으실 수 있습니다.</p>` +
                `<p style="margin:24px 0"><a href="${pdf}" style="display:inline-block;background:#2f7bff;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold">${esc(b.name)} 소개서 다운로드 (PDF)</a></p>` +
                `<p style="color:#5b6472;font-size:13.5px">버튼이 열리지 않으면 아래 주소를 복사해 주세요.<br>${pdf}</p>` +
                `<p>도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나 <a href="${SITE}/contact">문의 페이지</a>를 이용해 주세요.</p>` +
                "<p>감사합니다.<br>Plateer Labs 드림</p>",
        ),
    };
}

/** 내부 팀 알림(소개서). */
export function brochureInternalMail(d: BrochureLead, b: BrochureInfo): Mail {
    return {
        to: BROCHURE_INTERNAL_TO,
        replyTo: String(d.email || "").trim() || FROM_ADDR,
        subject: `[소개서 신청/${b.name}] ${d.name || ""} (${d.company || ""})`,
        text: [
            `• 소개서: ${b.name}`,
            `• 성함: ${d.name || ""}`,
            `• 이메일: ${d.email || ""}`,
            `• 연락처: ${d.phone || ""}`,
            `• 회사: ${d.company || ""}`,
            `• 부서: ${d.department || ""}`,
            `• 직급: ${d.jobTitle || ""}`,
            `• 방문경로: ${d.referralPath || ""}`,
            `• 마케팅 수신 동의: ${d.agreeMarketing ? "Y" : "N"}`,
            "",
            `접수 시각(KST): ${seoulTime(d.receivedAt)}`,
        ].join("\n"),
    };
}
