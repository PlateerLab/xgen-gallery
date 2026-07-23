"use client";

import { useState } from "react";
import { Check, Download, FileText, Loader2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/cn";
import { resolveBrochure, DEFAULT_BROCHURE } from "@/lib/brochures";

/**
 * XGEN 소개서 다운로드 리드 폼(게이팅). 제출 → /api/brochure-request 검증·수집 →
 * 성공 시 소개서 PDF 다운로드를 노출하고 자동 트리거한다. 필드·동의·프리미티브는
 * demo-form 과 같은 시각 언어를 따르되, 자료실 전용으로 자족 구현했다.
 */
const COPY = {
    ko: {
        lead: "아래 정보를 남겨 주시면 XGEN 소개서를 바로 받아보실 수 있습니다",
        email: "회사 이메일",
        name: "성함",
        company: "회사",
        department: "부서",
        jobTitle: "직급",
        phone: "휴대전화번호",
        referral: "방문경로",
        referralPlaceholder: "선택해주세요 (선택)",
        referralOptions: [
            "검색엔진 (구글, 네이버 등)",
            "지인 / 동료 추천",
            "광고",
            "SNS / 유튜브",
            "세미나 / 컨퍼런스",
            "기타",
        ],
        agreePolicy: "[필수] 개인정보취급방침에 동의",
        agreeCollect: "[필수] 개인정보 수집 및 이용 동의",
        agreeMarketing: "[선택] 마케팅 정보 수신 동의",
        submit: "소개서 받기",
        submitting: "전송 중…",
        successTitle: "소개서가 준비되었습니다",
        successBody: "다운로드가 자동으로 시작됩니다. 시작되지 않으면 아래 버튼을 눌러주세요",
        download: "XGEN 소개서 다운로드 (PDF)",
        again: "다시 받기",
        errRequired: "필수 항목입니다.",
        errEmail: "올바른 이메일 형식이 아닙니다.",
        errConsent: "필수 동의 항목입니다.",
        errSubmit: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    },
    en: {
        lead: "Leave your details below and get the XGEN brochure right away",
        email: "Work email",
        name: "Full name",
        company: "Company",
        department: "Department",
        jobTitle: "Job title",
        phone: "Mobile phone",
        referral: "How did you hear about us?",
        referralPlaceholder: "Please select (optional)",
        referralOptions: [
            "Search engine",
            "Referral",
            "Advertisement",
            "Social media / YouTube",
            "Seminar / Conference",
            "Other",
        ],
        agreePolicy: "[Required] I agree to the Privacy Policy.",
        agreeCollect:
            "[Required] I consent to the collection and use of personal information.",
        agreeMarketing: "[Optional] I agree to receive marketing communications.",
        submit: "Get the brochure",
        submitting: "Submitting…",
        successTitle: "Your brochure is ready",
        successBody: "The download starts automatically. If it doesn't, use the button below",
        download: "Download XGEN brochure (PDF)",
        again: "Get it again",
        errRequired: "This field is required.",
        errEmail: "Please enter a valid email address.",
        errConsent: "Consent is required.",
        errSubmit: "Submission failed. Please try again in a moment.",
    },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
    email: string;
    name: string;
    company: string;
    department: string;
    jobTitle: string;
    phone: string;
    referralPath: string;
    agreePrivacyPolicy: boolean;
    agreePrivacyCollect: boolean;
    agreeMarketing: boolean;
};

const EMPTY: Fields = {
    email: "",
    name: "",
    company: "",
    department: "",
    jobTitle: "",
    phone: "",
    referralPath: "",
    agreePrivacyPolicy: false,
    agreePrivacyCollect: false,
    agreeMarketing: false,
};

const REQUIRED_TEXT = [
    "name",
    "company",
    "department",
    "jobTitle",
    "phone",
] as const;

const REQUIRED_CONSENTS = ["agreePrivacyPolicy", "agreePrivacyCollect"] as const;

/** 다운로드를 프로그램적으로 트리거 — 새 탭 대신 파일 저장. */
function triggerDownload(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export function BrochureForm({ asset = DEFAULT_BROCHURE }: { asset?: string }) {
    const { locale } = useI18n();
    const c = COPY[locale === "en" ? "en" : "ko"];
    // 종류 구분자(asset) → 이 폼이 받을 소개서(표시명·다운로드 PDF).
    const brochure = resolveBrochure(asset);
    const downloadLabel =
        locale === "en"
            ? `Download ${brochure.name} brochure (PDF)`
            : `${brochure.name} 소개서 다운로드 (PDF)`;

    const [fields, setFields] = useState<Fields>(EMPTY);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string>(brochure.file);

    const set = (k: keyof Fields, v: string | boolean) =>
        setFields((f) => ({ ...f, [k]: v }));

    const validate = (): boolean => {
        const e: Record<string, string> = {};
        REQUIRED_TEXT.forEach((k) => {
            if (!String(fields[k]).trim()) e[k] = c.errRequired;
        });
        if (!fields.email.trim()) e.email = c.errRequired;
        else if (!EMAIL_RE.test(fields.email)) e.email = c.errEmail;
        REQUIRED_CONSENTS.forEach((k) => {
            if (!fields[k]) e[k] = c.errConsent;
        });
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setSubmitError(null);
        if (!validate()) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/brochure-request", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...fields, asset }),
            });
            if (!res.ok) throw new Error(String(res.status));
            const data = (await res.json()) as { downloadUrl?: string };
            const url = data.downloadUrl || brochure.file;
            setDownloadUrl(url);
            setStatus("done");
            triggerDownload(url);
        } catch {
            setStatus("idle");
            setSubmitError(c.errSubmit);
        }
    };

    if (status === "done") {
        return (
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white px-8 py-12 text-center shadow-xl">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#2f7bff]/10 to-transparent"
                />
                <div className="relative">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] shadow-[0_12px_30px_-8px_rgba(47,123,255,0.6)]">
                        <Check className="h-8 w-8 text-white" strokeWidth={3} />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                        {c.successTitle}
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-md text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                        {c.successBody}
                    </p>
                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a
                            href={downloadUrl}
                            download
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            <Download className="h-4 w-4" />
                            {downloadLabel}
                        </a>
                        <button
                            type="button"
                            onClick={() => {
                                setFields(EMPTY);
                                setErrors({});
                                setStatus("idle");
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-[15px] font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-alt)]"
                        >
                            {c.again}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-xl sm:p-8"
        >
            <div className="mb-5 flex items-start gap-3">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                    <FileText className="h-5 w-5" />
                </span>
                <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    {c.lead}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                    className="sm:col-span-2"
                    label={c.email}
                    type="email"
                    placeholder="name@company.com"
                    value={fields.email}
                    onChange={(v) => set("email", v)}
                    error={errors.email}
                />
                <Field
                    label={c.name}
                    value={fields.name}
                    onChange={(v) => set("name", v)}
                    error={errors.name}
                />
                <Field
                    label={c.phone}
                    type="tel"
                    placeholder="010-1234-5678"
                    value={fields.phone}
                    onChange={(v) => set("phone", v)}
                    error={errors.phone}
                />
                <Field
                    label={c.company}
                    value={fields.company}
                    onChange={(v) => set("company", v)}
                    error={errors.company}
                />
                <Field
                    label={c.department}
                    value={fields.department}
                    onChange={(v) => set("department", v)}
                    error={errors.department}
                />
                <Field
                    label={c.jobTitle}
                    value={fields.jobTitle}
                    onChange={(v) => set("jobTitle", v)}
                    error={errors.jobTitle}
                />
                <Select
                    label={c.referral}
                    placeholder={c.referralPlaceholder}
                    options={c.referralOptions}
                    value={fields.referralPath}
                    onChange={(v) => set("referralPath", v)}
                    required={false}
                />
            </div>

            <div className="mt-5 space-y-2 border-t border-[var(--color-line)] pt-4">
                <Consent
                    label={c.agreePolicy}
                    checked={fields.agreePrivacyPolicy}
                    onChange={(v) => set("agreePrivacyPolicy", v)}
                    error={errors.agreePrivacyPolicy}
                />
                <Consent
                    label={c.agreeCollect}
                    checked={fields.agreePrivacyCollect}
                    onChange={(v) => set("agreePrivacyCollect", v)}
                    error={errors.agreePrivacyCollect}
                />
                <Consent
                    label={c.agreeMarketing}
                    checked={fields.agreeMarketing}
                    onChange={(v) => set("agreeMarketing", v)}
                />
            </div>

            {submitError && (
                <p className="mt-4 text-[16px] text-red-600">{submitError}</p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-5 py-3 text-[16px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {c.submitting}
                    </>
                ) : (
                    <>
                        <Download className="h-4 w-4" />
                        {c.submit}
                    </>
                )}
            </button>
        </form>
    );
}

/* ------------------------------------------------------------------ */
/* Primitives (자족형 — demo-form 과 동일 시각 언어)                    */
/* ------------------------------------------------------------------ */

const FIELD_BASE =
    "w-full rounded-lg border bg-white px-3 py-2.5 text-[16px] text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-subtle)] focus:ring-2";

function fieldCls(error?: string) {
    return cn(
        FIELD_BASE,
        error
            ? "border-red-400 focus:ring-red-100"
            : "border-[var(--color-line)] focus:border-[var(--color-ink)] focus:ring-[var(--color-surface-hover)]",
    );
}

function Label({ label, required = true }: { label: string; required?: boolean }) {
    return (
        <span className="mb-1.5 block text-[14px] font-semibold text-[var(--color-ink)]">
            {label} {required && <span className="text-red-500">*</span>}
        </span>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    error,
    className,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
    error?: string;
    className?: string;
}) {
    return (
        <label className={cn("block", className)}>
            <Label label={label} />
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={fieldCls(error)}
            />
            {error && (
                <span className="mt-1 block text-[14px] text-red-600">{error}</span>
            )}
        </label>
    );
}

function Select({
    label,
    options,
    placeholder,
    value,
    onChange,
    required = true,
    className,
}: {
    label: string;
    options: readonly string[];
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    className?: string;
}) {
    return (
        <label className={cn("block", className)}>
            <Label label={label} required={required} />
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(fieldCls(), !value && "text-[var(--color-ink-subtle)]")}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((o) => (
                    <option key={o} value={o} className="text-[var(--color-ink)]">
                        {o}
                    </option>
                ))}
            </select>
        </label>
    );
}

function Consent({
    label,
    checked,
    onChange,
    error,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    error?: string;
}) {
    return (
        <label className="flex cursor-pointer items-start gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[var(--color-line-strong)] accent-[var(--color-ink)]"
            />
            <span className="text-[13px] leading-snug text-[var(--color-ink-muted)]">
                {label}
                {error && <span className="ml-1 text-red-600">— {error}</span>}
            </span>
        </label>
    );
}
