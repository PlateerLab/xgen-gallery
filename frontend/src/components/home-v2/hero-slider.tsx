"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * 메인 히어로 슬라이드 — 같은 2단 레이아웃의 슬라이드를 한 자리에 겹쳐 두고 교차시킨다.
 * 모든 슬라이드를 같은 grid 칸에 쌓으므로 높이는 가장 긴 슬라이드에 맞춰 고정된다(전환 때 아래 섹션이 흔들리지 않음).
 * 마우스를 올리거나 포커스가 안에 있으면 멈추고, 동작 줄이기 설정이면 자동 전환하지 않는다.
 */
export function HeroSlider({
    slides,
    labels,
    durations,
    ariaLabel,
}: {
    slides: React.ReactNode[];
    labels: string[];
    durations?: number[];
    ariaLabel: string;
}) {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reduced, setReduced] = useState(false);
    const n = slides.length;
    const ms = durations?.[idx] ?? 4500;
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const on = () => setReduced(mq.matches);
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);

    useEffect(() => {
        if (paused || reduced || n < 2) return;
        timer.current = setTimeout(() => setIdx((i) => (i + 1) % n), ms);
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [idx, paused, reduced, n, ms]);

    const go = (i: number) => setIdx((i + n) % n);

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={ariaLabel}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            <div className="grid">
                {slides.map((s, i) => (
                    <div
                        key={i}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} / ${n} · ${labels[i]}`}
                        aria-hidden={i !== idx}
                        className="hero-slide [grid-area:1/1]"
                        data-active={i === idx ? "true" : "false"}
                    >
                        {s}
                    </div>
                ))}
            </div>

            {n > 1 && (
                <div className="mx-auto mt-2 flex w-full max-w-[1280px] items-center gap-3 px-5 sm:px-8">
                    <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto" role="tablist">
                        {labels.map((lb, i) => (
                            <button
                                key={lb}
                                type="button"
                                role="tab"
                                aria-selected={i === idx}
                                onClick={() => go(i)}
                                className="group min-w-[150px] max-w-[240px] flex-1 text-left"
                            >
                                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-[var(--color-line)]">
                                    <span
                                        key={`${idx}-${i}`}
                                        className={i === idx ? "hero-slide-bar block h-full bg-[#185aea]" : i < idx ? "block h-full w-full bg-[#185aea]/40" : "block h-full w-0"}
                                        style={i === idx ? { animationDuration: `${ms}ms`, animationPlayState: paused || reduced ? "paused" : "running" } : undefined}
                                    />
                                </span>
                                <span
                                    className={`mt-2 block truncate text-[13px] ${
                                        i === idx ? "font-semibold text-[var(--color-ink)]" : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)]"
                                    }`}
                                >
                                    <span className="mr-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                                    {lb}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex shrink-0 gap-1.5">
                        <button
                            type="button"
                            onClick={() => go(idx - 1)}
                            aria-label="Previous slide"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] transition hover:bg-[var(--color-surface-hover)]"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(idx + 1)}
                            aria-label="Next slide"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] transition hover:bg-[var(--color-surface-hover)]"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
