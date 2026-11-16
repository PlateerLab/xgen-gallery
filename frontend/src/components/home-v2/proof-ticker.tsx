"use client";

import { useEffect, useState } from "react";

/**
 * 히어로 근거 문구 — 공개된 사실만 한 줄씩 돌아가며 보여 준다.
 * 움직임 줄이기 설정이면 돌지 않고 전체 목록을 그대로 보여 준다.
 * 화면 낭독기에는 전체 목록을 한 번에 읽힌다(aria-live 미사용: 자동 순환을 매번 읽지 않도록).
 */
export function ProofTicker({ items, label, interval = 3200 }: { items: string[]; label: string; interval?: number }) {
    const [i, setI] = useState(0);
    const [still, setStill] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setStill(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        if (still || items.length < 2) return;
        const t = window.setInterval(() => setI((n) => (n + 1) % items.length), interval);
        return () => window.clearInterval(t);
    }, [still, items.length, interval]);

    if (still) {
        return (
            <ul aria-label={label} className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[13.5px] text-[var(--color-ink-muted)]">
                {items.map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#185aea]" />
                        {t}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="mt-5" aria-label={label} role="group">
            <ul className="sr-only">
                {items.map((t) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
            <div aria-hidden className="relative h-[42px] overflow-hidden text-[14px] leading-[21px] sm:h-[22px] text-[var(--color-ink)]">
                {items.map((t, n) => (
                    <p
                        key={t}
                        className={`absolute inset-x-0 top-0 flex items-start gap-2 transition-all duration-500 ${n === i ? "translate-y-0 opacity-100" : n === (i - 1 + items.length) % items.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"}`}
                    >
                        <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#185aea]" />
                        <span className="line-clamp-2 sm:truncate">{t}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}
