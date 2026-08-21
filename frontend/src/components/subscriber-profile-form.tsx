"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";

/**
 * 구독 2단계 — 이메일만으로 구독은 이미 확정된 뒤, 완료 화면에서 받는 **선택** 정보.
 *
 * 뉴스레터 구독구는 페이지 하단과 플로팅 위젯에 상시 떠 있는 저마찰 유입구라,
 * 회사·담당자명·직급을 필수로 세우면 구독 자체가 크게 준다. 그래서 구독을 먼저
 * 끝내고 여기서 따로 묻는다 — 건너뛰어도 구독은 그대로다.
 *
 * 같은 이메일·같은 kind 로 한 번 더 보내면 시트는 리드 칸만 채운다
 * (docs/lead-webhook.gs의 upsertSubscriber — 값이 있을 때만 갱신).
 */
const COPY = {
    ko: {
        title: "보내드릴 내용을 더 잘 맞춰드릴까요?",
        desc: "아래는 선택 사항입니다. 남겨주시면 관심사에 가까운 내용을 우선해 보내드립니다.",
        company: "회사명",
        name: "담당자명",
        jobTitle: "직급",
        save: "저장하기",
        saving: "저장 중…",
        skip: "괜찮습니다",
        saved: "감사합니다. 반영해 두겠습니다",
    },
    en: {
        title: "Want us to tailor what we send?",
        desc: "All optional. If you share these, we will prioritise what is closer to your work.",
        company: "Company",
        name: "Your name",
        jobTitle: "Job title",
        save: "Save",
        saving: "Saving…",
        skip: "No thanks",
        saved: "Thank you — we will take it into account",
    },
} as const;

export function SubscriberProfileForm({
    email,
    kind = "newsletter",
    className,
}: {
    email: string;
    kind?: string;
    className?: string;
}) {
    const { locale } = useI18n();
    const c = COPY[locale === "en" ? "en" : "ko"];
    const [form, setForm] = useState({ company: "", name: "", jobTitle: "" });
    const [state, setState] = useState<"idle" | "saving" | "closed" | "saved">(
        "idle",
    );

    if (state === "closed") return null;
    if (state === "saved") {
        return (
            <p
                className={`text-[13.5px] text-[var(--color-ink-muted)] ${className ?? ""}`}
            >
                {c.saved}
            </p>
        );
    }

    const set =
        (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((f) => ({ ...f, [k]: e.target.value }));

    async function save(e: React.FormEvent) {
        e.preventDefault();
        const v = {
            company: form.company.trim(),
            name: form.name.trim(),
            jobTitle: form.jobTitle.trim(),
        };
        // 전부 비어 있으면 보낼 것이 없다 — 건너뛴 것과 같게 처리한다.
        if (!v.company && !v.name && !v.jobTitle) {
            setState("closed");
            return;
        }
        setState("saving");
        try {
            await fetch("/api/newsletter", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, kind, ...v }),
            });
        } catch {
            // 구독은 이미 끝났다 — 여기서 실패해도 독자에게 알릴 일은 아니다.
        }
        setState("saved");
    }

    const field =
        "w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-2.5 text-[14.5px] text-[var(--color-ink)] outline-none transition focus:border-[#2f7bff] focus:ring-2 focus:ring-[#2f7bff]/20 disabled:opacity-60";

    return (
        <form
            onSubmit={save}
            className={`w-full text-left ${className ?? ""}`}
        >
            <p className="text-[14.5px] font-semibold text-[var(--color-ink)]">
                {c.title}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                {c.desc}
            </p>
            <div className="mt-3 grid gap-2">
                <input
                    value={form.company}
                    onChange={set("company")}
                    placeholder={c.company}
                    aria-label={c.company}
                    disabled={state === "saving"}
                    className={field}
                />
                <div className="grid grid-cols-2 gap-2">
                    <input
                        value={form.name}
                        onChange={set("name")}
                        placeholder={c.name}
                        aria-label={c.name}
                        disabled={state === "saving"}
                        className={field}
                    />
                    <input
                        value={form.jobTitle}
                        onChange={set("jobTitle")}
                        placeholder={c.jobTitle}
                        aria-label={c.jobTitle}
                        disabled={state === "saving"}
                        className={field}
                    />
                </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
                <button
                    type="submit"
                    disabled={state === "saving"}
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--color-ink)] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                >
                    {state === "saving" ? c.saving : c.save}
                </button>
                <button
                    type="button"
                    onClick={() => setState("closed")}
                    className="text-[13.5px] text-[var(--color-ink-subtle)] underline underline-offset-2 transition hover:text-[var(--color-ink-muted)]"
                >
                    {c.skip}
                </button>
            </div>
        </form>
    );
}
