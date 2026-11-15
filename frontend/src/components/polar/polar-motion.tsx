"use client";

import { useEffect, useRef, useState } from "react";
import { Search, FolderOpen, LayoutGrid, Sparkles, MessageSquare, Check } from "lucide-react";

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        setReduced(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    }, []);
    return reduced;
}

function useInView<T extends HTMLElement>(margin = "0px 0px -10% 0px") {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setInView(true);
            return;
        }
        const io = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect())),
            { rootMargin: margin, threshold: 0.08 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [margin]);
    return [ref, inView] as const;
}

/** 스크롤 등장(1회) — delay 로 카드 순차 등장. .reveal 클래스(globals.css)를 재사용한다. */
export function PolarReveal({
    children,
    delay = 0,
    className,
    as: Tag = "div",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: "div" | "li";
}) {
    const [ref, shown] = useInView<HTMLDivElement>();
    return (
        <Tag
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={ref as any}
            style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
            className={`reveal${shown ? " reveal-in" : ""}${className ? " " + className : ""}`}
        >
            {children}
        </Tag>
    );
}

/** 히어로 키 비주얼 — xgen.im 실사 + 커머스 기능 칩이 천천히 떠다닌다. */
export function PolarHeroVisual({ chips, alt }: { chips: string[]; alt: string }) {
    return (
        <div className="relative mx-auto w-full max-w-[560px]">
            <div className="polar-hero-glow" aria-hidden />
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/polar/mk/hero-photo.webp"
                    alt={alt}
                    className="polar-hero-photo aspect-[4/3] h-auto w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070b1c]/55 via-transparent to-transparent" />
            </div>
            {chips.map((c, i) => (
                <span
                    key={c}
                    aria-hidden
                    className={`polar-chip polar-chip-${i} absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-[#0d1530]/80 px-3 py-1.5 text-[12.5px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md`}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5fd0ff]" />
                    {c}
                </span>
            ))}
        </div>
    );
}

export interface PipelineCopy {
    question: string;
    questionSample: string;
    p1Label: string;
    p1Title: string;
    steps: string[];
    backedBy: string;
    datasetLabel: string;
    stats: { value: number; unit: string; label: string }[];
    p2Label: string;
    p2Title: string;
    searchTitle: string;
    searchTags: string[];
    kbTitle: string;
    kbDesc: string;
    extractTitle: string;
    extractDesc: string;
    answer: string;
    srSummary: string;
}

/**
 * Polar 작동 방식 — 질문 → LLM Processing(4단계) ↔ RAG Pipeline(3단계) → 답변.
 * 화면에 들어오면 단계가 차례로 켜지고, 한 바퀴 돌면 다시 처음부터 반복한다.
 */
export function PolarPipeline({ t }: { t: PipelineCopy }) {
    const reduced = useReducedMotion();
    const [ref, inView] = useInView<HTMLDivElement>("0px 0px -20% 0px");
    // 0..3 = LLM 단계, 4..6 = RAG 단계, 7 = 답변
    const TOTAL = 8;
    const [tick, setTick] = useState(-1);
    useEffect(() => {
        if (!inView) return;
        if (reduced) {
            setTick(TOTAL - 1);
            return;
        }
        setTick(0);
        const id = window.setInterval(() => setTick((v) => (v + 1) % (TOTAL + 2)), 900);
        return () => window.clearInterval(id);
    }, [inView, reduced]);

    // 답변 생성(04)은 RAG 결과를 받은 뒤 켜진다.
    const llmOrder = [0, 1, 2, 6];
    const ragOrder = [3, 4, 5];
    const on = (n: number) => tick >= n;
    const done = tick >= TOTAL - 1;

    const [counts, setCounts] = useState(t.stats.map(() => 0));
    useEffect(() => {
        if (!inView) return;
        if (reduced) {
            setCounts(t.stats.map((s) => s.value));
            return;
        }
        const t0 = performance.now();
        let raf = 0;
        const step = (now: number) => {
            const p = Math.min(1, (now - t0) / 1400);
            const e = 1 - Math.pow(1 - p, 3);
            setCounts(t.stats.map((s) => Math.round(s.value * e)));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduced, t.stats]);

    const ragIcons = [Search, FolderOpen, LayoutGrid];
    const ragItems = [
        { title: t.searchTitle, desc: null as string | null, tags: t.searchTags },
        { title: t.kbTitle, desc: t.kbDesc, tags: [] as string[] },
        { title: t.extractTitle, desc: t.extractDesc, tags: [] as string[] },
    ];

    return (
        <div ref={ref} className="relative">
            <p className="sr-only">{t.srSummary}</p>
            {/* 질문 */}
            <div className="flex justify-center" aria-hidden>
                <div className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 transition duration-500 ${on(0) ? "border-[#2f7bff]/40 bg-white shadow-[0_10px_30px_-14px_rgba(47,123,255,0.6)]" : "border-[var(--color-line)] bg-white"}`}>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(45deg,#00acee,#185aea)] text-white">
                        <MessageSquare className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-subtle)]">{t.question}</span>
                    <span className="text-[14px] font-medium text-[var(--color-ink)]">{t.questionSample}</span>
                </div>
            </div>
            <div className="flex justify-center py-2" aria-hidden>
                <span className={`polar-flow-v ${on(0) ? "polar-flow-on" : ""}`} />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-[var(--color-line)] bg-white p-4 shadow-[0_30px_60px_-40px_rgba(20,40,80,0.35)] md:grid-cols-2 md:p-6" aria-hidden>
                {/* Pipeline 01 */}
                <div className="rounded-2xl bg-[var(--color-surface-alt)] p-5 md:p-6">
                    <p className="font-mono text-[11px] font-bold tracking-wider text-[#2f7bff]">{t.p1Label}</p>
                    <h3 className="mt-1 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">{t.p1Title}</h3>
                    <ol className="mt-4 space-y-2">
                        {t.steps.map((s, i) => {
                            const active = on(llmOrder[i]);
                            const current = tick === llmOrder[i];
                            return (
                                <li
                                    key={s}
                                    className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition duration-500 ${current ? "border-[#2f7bff] bg-white shadow-[0_10px_24px_-14px_rgba(47,123,255,0.7)]" : active ? "border-[#bcd0f5] bg-white" : "border-transparent bg-white/60"}`}
                                >
                                    <span className={`inline-flex h-7 w-7 flex-none items-center justify-center rounded-full font-mono text-[11px] font-bold transition duration-500 ${active ? "bg-[linear-gradient(45deg,#00acee,#185aea)] text-white" : "bg-[var(--color-line)] text-[var(--color-ink-subtle)]"}`}>
                                        {active && !current ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className={`text-[15px] font-semibold transition ${active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-subtle)]"}`}>{s}</span>
                                </li>
                            );
                        })}
                    </ol>
                    <p className="mt-5 text-center font-mono text-[10.5px] font-bold uppercase tracking-widest text-[var(--color-ink-subtle)]">{t.backedBy}</p>
                    <p className="mt-2 text-[13px] font-semibold text-[var(--color-ink-muted)]">{t.datasetLabel}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {t.stats.map((s, i) => (
                            <div key={s.label} className="rounded-xl border border-[var(--color-line)] bg-white p-3.5">
                                <p className="flex flex-wrap items-baseline gap-x-1.5">
                                    <span className="text-[26px] font-extrabold tracking-tight text-[#185aea]">
                                        {counts[i]}
                                        {s.unit}
                                    </span>
                                    <span className="text-[11.5px] text-[var(--color-ink-subtle)]">Parameters</span>
                                </p>
                                <p className="mt-0.5 text-[12.5px] text-[var(--color-ink-muted)]">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pipeline 02 */}
                <div className="rounded-2xl bg-[var(--color-surface-alt)] p-5 md:p-6">
                    <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[11px] font-bold tracking-wider text-[#2f7bff]">{t.p2Label}</p>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2f7bff]">
                            <span className={`h-1.5 w-1.5 rounded-full bg-[#2f7bff] ${done ? "" : "polar-pulse"}`} />
                            Active engine
                        </span>
                    </div>
                    <h3 className="mt-1 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">{t.p2Title}</h3>
                    <div className="mt-4 space-y-1">
                        {ragItems.map((r, i) => {
                            const Icon = ragIcons[i];
                            const active = on(ragOrder[i]);
                            const current = tick === ragOrder[i];
                            return (
                                <div key={r.title}>
                                    {i > 0 && (
                                        <div className="flex justify-center py-1">
                                            <span className={`polar-flow-v polar-flow-sm ${active ? "polar-flow-on" : ""}`} />
                                        </div>
                                    )}
                                    <div className={`flex gap-3 rounded-xl border bg-white p-3.5 transition duration-500 ${current ? "border-[#2f7bff] shadow-[0_10px_24px_-14px_rgba(47,123,255,0.7)]" : active ? "border-[#bcd0f5]" : "border-transparent opacity-70"}`}>
                                        <span className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg transition ${active ? "bg-[#2f7bff]/10 text-[#2f7bff]" : "bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]"}`}>
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[15px] font-bold text-[var(--color-ink)]">{r.title}</p>
                                            {r.desc && <p className="mt-0.5 text-[13px] text-[var(--color-ink-muted)]">{r.desc}</p>}
                                            {r.tags.length > 0 && (
                                                <div className="mt-1.5 flex flex-wrap gap-1.5">
                                                    {r.tags.map((g) => (
                                                        <span key={g} className="rounded-md bg-[var(--color-surface-alt)] px-2 py-0.5 text-[12px] text-[var(--color-ink-muted)]">{g}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex justify-center py-2" aria-hidden>
                <span className={`polar-flow-v ${done ? "polar-flow-on" : ""}`} />
            </div>
            <div className="flex justify-center" aria-hidden>
                <div className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition duration-500 ${done ? "bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] text-white shadow-[0_14px_30px_-12px_rgba(24,90,234,0.7)]" : "bg-[var(--color-line)] text-[var(--color-ink-subtle)]"}`}>
                    <Sparkles className="h-4 w-4" />
                    {t.answer}
                </div>
            </div>
        </div>
    );
}
