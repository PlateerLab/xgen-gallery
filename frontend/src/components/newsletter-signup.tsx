"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { SubscriberProfileForm } from "@/components/subscriber-profile-form";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 뉴스레터 구독/해지 폼. 이메일을 /api/newsletter 로 전송하면, 서버가 별도 구글
 * 시트에 저장(구독=Y / 해지=N)하고 메일링을 처리한다(NEWSLETTER_WEBHOOK_URL).
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "done" | "error";

const COPY = {
    ko: {
        okSub: "구독 신청이 접수되었습니다. 확인 메일을 보내드리겠습니다",
        okUnsub: "구독이 해지되었습니다. 그동안 함께해 주셔서 감사합니다",
        placeholder: "이메일 주소를 입력하세요",
        emailLabel: "이메일 주소",
        busy: "처리 중…",
        sub: "구독하기",
        unsub: "구독 해지",
        error: "이메일 주소를 확인하거나 잠시 후 다시 시도해 주세요",
        toUnsub: "구독을 해지하시겠어요?",
        toSub: "다시 구독하기",
    },
    en: {
        okSub: "Your subscription is in. We will send a confirmation email",
        okUnsub: "You have been unsubscribed. Thank you for reading with us",
        placeholder: "Enter your email address",
        emailLabel: "Email address",
        busy: "Working…",
        sub: "Subscribe",
        unsub: "Unsubscribe",
        error: "Check the email address, or try again shortly",
        toUnsub: "Want to unsubscribe?",
        toSub: "Subscribe again",
    },
} as const;

export function NewsletterSignup() {
    const { locale } = useI18n();
    const c = COPY[locale];
    const [email, setEmail] = useState("");
    const [mode, setMode] = useState<"subscribe" | "unsubscribe">("subscribe");
    const [status, setStatus] = useState<Status>("idle");

    const subscribing = mode === "subscribe";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const value = email.trim();
        if (!EMAIL_RE.test(value)) {
            setStatus("error");
            return;
        }
        setStatus("submitting");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: value, subscribe: subscribing }),
            });
            if (!res.ok) throw new Error("request failed");
            setStatus("done");
        } catch {
            setStatus("error");
        }
    }

    if (status === "done") {
        return (
            <div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#cce6d7] bg-[#ecf8f1] px-5 py-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f9d57] text-white">
                        <Check className="h-5 w-5" />
                    </span>
                    <p className="text-[15.5px] font-medium text-[var(--color-ink)]">
                        {subscribing
                            ? c.okSub
                            : c.okUnsub}
                    </p>
                </div>
                {/* 구독은 위에서 이미 끝났다 — 아래는 선택 정보(2단계). 해지에는 묻지 않는다. */}
                {subscribing && (
                    <SubscriberProfileForm
                        email={email.trim()}
                        className="mt-4 rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4"
                    />
                )}
            </div>
        );
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                    }}
                    placeholder={c.placeholder}
                    aria-label={c.emailLabel}
                    disabled={status === "submitting"}
                    className="w-full flex-1 rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-[15.5px] text-[var(--color-ink)] outline-none transition focus:border-[#2f7bff] focus:ring-2 focus:ring-[#2f7bff]/20 disabled:opacity-60"
                />
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(
                        "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition disabled:opacity-60",
                        subscribing
                            ? "bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] hover:brightness-110"
                            : "border border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink)]",
                    )}
                >
                    {status === "submitting"
                        ? c.busy
                        : subscribing
                          ? c.sub
                          : c.unsub}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
            </form>

            {status === "error" && (
                <p className="mt-2 text-[13.5px] text-[#d33]">
                    {c.error}
                </p>
            )}

            <button
                type="button"
                onClick={() => {
                    setMode(subscribing ? "unsubscribe" : "subscribe");
                    setStatus("idle");
                }}
                className="mt-3 text-[13.5px] text-[var(--color-ink-subtle)] underline underline-offset-2 transition hover:text-[var(--color-ink-muted)]"
            >
                {subscribing ? c.toUnsub : c.toSub}
            </button>
        </div>
    );
}
