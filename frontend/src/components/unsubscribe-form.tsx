"use client";

import { useState } from "react";
import { Check, Loader2, MailX } from "lucide-react";

/**
 * 구독 해지 폼 — 이메일의 '수신 해지' 링크(/unsubscribe?kind=&email=)로 진입한다.
 * kind(newsletter/blog)와 이메일을 받아 /api/newsletter 로 subscribe:false 를 보낸다.
 * (뉴스레터는 /newsletter 토글로도 해지 가능하지만, 블로그는 이 경로가 유일한 해지 UI)
 */
const LABEL: Record<string, string> = {
    newsletter: "뉴스레터",
    blog: "블로그 새 글 알림",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function UnsubscribeForm({
    email: initialEmail,
    kind,
}: {
    email: string;
    kind: "newsletter" | "blog";
}) {
    const [email, setEmail] = useState(initialEmail);
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
        "idle",
    );
    const label = LABEL[kind] ?? "뉴스레터";

    const onUnsub = async () => {
        if (!EMAIL_RE.test(email.trim())) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    kind,
                    subscribe: false,
                }),
            });
            if (!res.ok) throw new Error(String(res.status));
            setStatus("done");
        } catch {
            setStatus("error");
        }
    };

    if (status === "done") {
        return (
            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-10 text-center shadow-xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white">
                    <Check className="h-7 w-7" strokeWidth={3} />
                </div>
                <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                    구독이 해지되었습니다
                </h1>
                <p className="mx-auto mt-2.5 max-w-sm text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                    <b className="text-[var(--color-ink)]">{email}</b> 의 {label}{" "}
                    수신을 해지했습니다. 그동안 함께해 주셔서 감사합니다.
                </p>
                <p className="mt-5 text-[14px] text-[var(--color-ink-subtle)]">
                    마음이 바뀌시면 언제든 다시 구독하실 수 있습니다.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-10 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]">
                <MailX className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                {label} 구독 해지
            </h1>
            <p className="mx-auto mt-2.5 max-w-sm text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                아래 이메일의 {label} 수신을 해지합니다.
            </p>
            <input
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                }}
                placeholder="name@company.com"
                className="mt-6 w-full rounded-lg border border-[var(--color-line)] bg-white px-4 py-3 text-center text-[16px] text-[var(--color-ink)] outline-none transition focus:border-[var(--color-ink)] focus:ring-2 focus:ring-[var(--color-surface-hover)]"
            />
            {status === "error" && (
                <p className="mt-2 text-[14px] text-red-600">
                    이메일을 확인해 주세요. 잠시 후 다시 시도해 주세요.
                </p>
            )}
            <button
                type="button"
                onClick={onUnsub}
                disabled={status === "loading"}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-ink)] px-5 py-3 text-[16px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        처리 중…
                    </>
                ) : (
                    "구독 해지"
                )}
            </button>
        </div>
    );
}
