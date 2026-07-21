"use client";

import { useEffect, useState } from "react";
import { X, Check, ArrowRight, Monitor, CircleCheck } from "lucide-react";

/**
 * XGEN 무료 체험 신청 — 내부 모달 폼. CTA 버튼을 누르면 팝업 양식이 뜨고, 제출하면
 * /api/trial-request 로 접수한다(외부 페이지로 이동하지 않음). xgen.im/trial-form의
 * 필드를 그대로 재현한다: 회사 이메일·성함·회사·부서·직급·휴대전화 + 동의.
 */
interface Fields {
    email: string;
    name: string;
    company: string;
    department: string;
    jobTitle: string;
    phone: string;
    agreePrivacyCollect: boolean;
    agreeMarketing: boolean;
}

const EMPTY: Fields = {
    email: "",
    name: "",
    company: "",
    department: "",
    jobTitle: "",
    phone: "",
    agreePrivacyCollect: false,
    agreeMarketing: false,
};

const TEXT_FIELDS: {
    key: keyof Fields;
    label: string;
    type: string;
    placeholder: string;
}[] = [
    { key: "email", label: "회사 이메일 주소", type: "email", placeholder: "name@company.com" },
    { key: "name", label: "성함", type: "text", placeholder: "홍길동" },
    { key: "company", label: "회사", type: "text", placeholder: "회사명" },
    { key: "department", label: "부서", type: "text", placeholder: "소속 부서" },
    { key: "jobTitle", label: "직급", type: "text", placeholder: "직급" },
    { key: "phone", label: "휴대전화번호", type: "tel", placeholder: "010-0000-0000" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TrialSignupForm({
    triggerLabel,
    triggerClassName,
}: {
    triggerLabel: string;
    triggerClassName: string;
}) {
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState<Fields>(EMPTY);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);

    // 모달 열림 동안 배경 스크롤 잠금 + ESC 닫기.
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    function reset() {
        setFields(EMPTY);
        setErrors({});
        setStatus("idle");
        setSubmitError(null);
    }

    function close() {
        setOpen(false);
        // 완료 후 닫으면 다음 오픈을 위해 초기화.
        if (status === "done") reset();
    }

    function validate(): boolean {
        const next: Record<string, string> = {};
        for (const f of TEXT_FIELDS) {
            if (!fields[f.key].toString().trim()) next[f.key] = "필수 입력입니다";
        }
        if (fields.email && !EMAIL_RE.test(fields.email))
            next.email = "올바른 이메일 형식이 아닙니다";
        if (!fields.agreePrivacyCollect)
            next.agreePrivacyCollect = "필수 동의 항목입니다";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setStatus("loading");
        setSubmitError(null);
        try {
            const res = await fetch("/api/trial-request", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(fields),
            });
            if (!res.ok) throw new Error(String(res.status));
            setStatus("done");
        } catch {
            setStatus("idle");
            setSubmitError("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
    }

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
                {triggerLabel}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm sm:items-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label="XGEN 무료 체험 신청"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    <div className="relative my-8 w-full max-w-lg rounded-2xl border border-[var(--color-line)] bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={close}
                            aria-label="닫기"
                            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink-subtle)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {status === "done" ? (
                            <div className="px-7 py-12 text-center">
                                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#eafaf1] text-[#1f9d57]">
                                    <CircleCheck className="h-7 w-7" />
                                </span>
                                <h2 className="mt-5 text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                                    신청이 접수되었습니다
                                </h2>
                                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    입력하신 이메일로 안내 메일과 사용 가이드, 접속 계정을
                                    보내드립니다. 잠시만 기다려 주세요.
                                </p>
                                <button
                                    type="button"
                                    onClick={close}
                                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                                >
                                    확인
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="px-7 py-8">
                                <p className="text-[13px] font-semibold tracking-tight text-[#2461d8]">
                                    XGEN · 15일 무료 체험
                                </p>
                                <h2 className="mt-1.5 text-[24px] font-bold tracking-tight text-[var(--color-ink)]">
                                    무료 체험 신청
                                </h2>
                                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    Agentic AI 플랫폼 XGEN을 15일 동안 무료로 사용해보세요.
                                </p>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {TEXT_FIELDS.map((f) => (
                                        <div
                                            key={f.key}
                                            className={f.key === "email" ? "sm:col-span-2" : ""}
                                        >
                                            <label
                                                htmlFor={`trial-${f.key}`}
                                                className="block text-[13.5px] font-semibold text-[var(--color-ink)]"
                                            >
                                                {f.label}{" "}
                                                <span className="text-[#e11d48]">*</span>
                                            </label>
                                            <input
                                                id={`trial-${f.key}`}
                                                type={f.type}
                                                value={fields[f.key] as string}
                                                placeholder={f.placeholder}
                                                onChange={(e) =>
                                                    setFields((s) => ({ ...s, [f.key]: e.target.value }))
                                                }
                                                className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-subtle)] focus:border-[#2f7bff] focus:ring-2 focus:ring-[#2f7bff]/15 ${
                                                    errors[f.key]
                                                        ? "border-[#f3c2c8]"
                                                        : "border-[var(--color-line-strong)]"
                                                }`}
                                            />
                                            {errors[f.key] && (
                                                <p className="mt-1 text-[12.5px] text-[#e11d48]">
                                                    {errors[f.key]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* 동의 */}
                                <div className="mt-5 space-y-2.5">
                                    <label className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        <input
                                            type="checkbox"
                                            checked={fields.agreePrivacyCollect}
                                            onChange={(e) =>
                                                setFields((s) => ({
                                                    ...s,
                                                    agreePrivacyCollect: e.target.checked,
                                                }))
                                            }
                                            className="mt-0.5 h-4 w-4 accent-[#2f7bff]"
                                        />
                                        <span>
                                            <span className="font-semibold text-[#2461d8]">(필수)</span>{" "}
                                            개인정보 수집 및 이용에 동의합니다
                                        </span>
                                    </label>
                                    {errors.agreePrivacyCollect && (
                                        <p className="text-[12.5px] text-[#e11d48]">
                                            {errors.agreePrivacyCollect}
                                        </p>
                                    )}
                                    <label className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        <input
                                            type="checkbox"
                                            checked={fields.agreeMarketing}
                                            onChange={(e) =>
                                                setFields((s) => ({
                                                    ...s,
                                                    agreeMarketing: e.target.checked,
                                                }))
                                            }
                                            className="mt-0.5 h-4 w-4 accent-[#2f7bff]"
                                        />
                                        <span>(선택) 광고성 정보 수신에 동의합니다</span>
                                    </label>
                                </div>

                                {/* 안내 */}
                                <ul className="mt-5 space-y-1.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-4 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                                    <li className="flex items-start gap-2">
                                        <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                        원활한 안내를 위해 회사 이메일 주소를 입력해 주세요
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Monitor className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                        XGEN 체험 데모 환경은 PC에서만 사용할 수 있습니다
                                    </li>
                                </ul>

                                {submitError && (
                                    <p className="mt-4 rounded-lg bg-[#fdf0f1] px-3.5 py-2.5 text-[13.5px] text-[#d61f47]">
                                        {submitError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110 disabled:opacity-60"
                                >
                                    {status === "loading" ? "접수 중…" : "무료 체험 신청하기"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
