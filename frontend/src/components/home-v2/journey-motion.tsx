"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

/**
 * 메인(구매 여정) 섹션별 모션 — 섹션마다 레이아웃과 움직임을 다르게 해 단조로움을 줄인다.
 *  Rise            스크롤 등장(방향·지연 지정)
 *  Num             숫자 카운트업(천 단위 쉼표)
 *  ChallengeExplorer  과제 목록 ↔ 큰 이미지 전환(자동 진행 + 진행 바)
 *  IndustryPanels  가로로 펼쳐지는 산업 패널(데스크톱), 모바일은 세로 카드
 *  StepTrack       도입 지원 단계 — 진입 시 연결선이 채워지고 단계가 차례로 켜짐
 * 모든 모션은 prefers-reduced-motion 이면 멈추고 완성 상태를 보여 준다.
 */

function reducedMotion() {
    return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function useInView<T extends HTMLElement>(threshold = 0.12, once = true) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (reducedMotion()) {
            setInView(true);
            return;
        }
        const io = new IntersectionObserver(
            (es) =>
                es.forEach((e) => {
                    if (e.isIntersecting) {
                        setInView(true);
                        if (once) io.disconnect();
                    } else if (!once) setInView(false);
                }),
            { rootMargin: "0px 0px -8% 0px", threshold },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold, once]);
    return [ref, inView] as const;
}

type RiseFrom = "up" | "left" | "right" | "scale";

export function Rise({
    children,
    delay = 0,
    from = "up",
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    from?: RiseFrom;
    className?: string;
}) {
    const [ref, shown] = useInView<HTMLDivElement>();
    return (
        <div
            ref={ref}
            style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
            className={`jr-rise jr-from-${from}${shown ? " jr-in" : ""} ${className}`}
        >
            {children}
        </div>
    );
}

export function Num({ value, locale = "ko-KR" }: { value: number; locale?: string }) {
    const [ref, shown] = useInView<HTMLSpanElement>(0.4);
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!shown) return;
        if (reducedMotion()) {
            setV(value);
            return;
        }
        let raf = 0;
        const t0 = performance.now();
        const tick = (t: number) => {
            const p = Math.min((t - t0) / 1400, 1);
            setV(Math.round((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [shown, value]);
    return <span ref={ref}>{v.toLocaleString(locale)}</span>;
}

export type ChallengeItem = { title: string; desc: string; tags: string[]; href: string; cta: string; img: string };

/** 과제 탐색 — 왼쪽 목록에서 고르면 오른쪽 큰 이미지·설명이 바뀐다. 6초마다 자동 진행, 마우스를 올리면 멈춤. */
export function ChallengeExplorer({ items }: { items: ChallengeItem[] }) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [ref, inView] = useInView<HTMLDivElement>(0.25, false);
    const [cycle, setCycle] = useState(0); // 진행 바 재시작용
    const run = inView && !paused && !reducedMotion();

    useEffect(() => {
        if (!run) return;
        const t = setTimeout(() => {
            setActive((a) => (a + 1) % items.length);
            setCycle((c) => c + 1);
        }, 6000);
        return () => clearTimeout(t);
    }, [run, active, items.length]);

    const pick = (i: number) => {
        setActive(i);
        setCycle((c) => c + 1);
    };

    return (
        <div
            ref={ref}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
        >
            <ol className="flex flex-col">
                {items.map((c, i) => {
                    const on = i === active;
                    return (
                        <li key={c.title} className="relative border-b border-[var(--color-line)] first:border-t">
                            <button
                                type="button"
                                onClick={() => pick(i)}
                                onFocus={() => pick(i)}
                                aria-expanded={on}
                                className="flex w-full items-start gap-5 py-6 text-left"
                            >
                                <span className={`mt-1 text-[13px] font-semibold tabular-nums transition ${on ? "text-[#185aea]" : "text-[var(--color-ink-subtle)]"}`}>0{i + 1}</span>
                                <span className="flex-1">
                                    <span className={`block text-[20px] font-semibold leading-snug tracking-tight transition md:text-[22px] ${on ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"}`}>{c.title}</span>
                                    <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <span className="overflow-hidden">
                                            <span className="mt-3 block text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{c.desc}</span>
                                            <span className="mt-4 flex flex-wrap gap-1.5">
                                                {c.tags.map((t) => (
                                                    <span key={t} className="rounded-full bg-[#185aea]/[0.07] px-2.5 py-1 text-[12px] font-semibold text-[#185aea]">
                                                        {t}
                                                    </span>
                                                ))}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            {on && (
                                <Link href={c.href} className="group -mt-2 mb-6 ml-[42px] inline-flex items-center gap-1 text-[15px] font-semibold text-[#185aea] hover:underline">
                                    {c.cta}
                                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                            )}
                            {/* 진행 바 */}
                            <span aria-hidden className="absolute -bottom-px left-0 h-[2px] w-full overflow-hidden">
                                {on && <span key={cycle} className={`block h-full bg-[#185aea] ${run ? "jr-progress" : "w-full"}`} />}
                            </span>
                        </li>
                    );
                })}
            </ol>
            <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[24px] bg-[#0b1224] lg:block">
                {items.map((c, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={c.img + i}
                        src={c.img}
                        alt=""
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out ${i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
                    />
                ))}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b1224]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <p key={active} className="jr-caption text-[13px] font-semibold tracking-wide text-white/70">
                        0{active + 1} / 0{items.length}
                    </p>
                    <p key={`t${active}`} className="jr-caption mt-2 max-w-md text-[24px] font-semibold leading-snug tracking-tight">
                        {items[active].title}
                    </p>
                </div>
            </div>
        </div>
    );
}

export type IndustryPanel = { key: string; name: string; desc: string; img: string; href: string };

/** 산업 패널 — 데스크톱에서는 고른 패널이 넓게 펼쳐지고 나머지는 세로 띠로 접힌다. */
export function IndustryPanels({ items, cta }: { items: IndustryPanel[]; cta: string }) {
    const [active, setActive] = useState(0);
    return (
        <>
            <div className="hidden h-[460px] gap-3 lg:flex">
                {items.map((x, i) => {
                    const on = i === active;
                    return (
                        <Link
                            key={x.key}
                            href={x.href}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            style={{ flexGrow: on ? 3.2 : 1 }}
                            className="group relative basis-0 overflow-hidden rounded-[20px] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={x.img} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ${on ? "scale-100" : "scale-110"}`} />
                            <div aria-hidden className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-gradient-to-t from-[#0b1224]/90 via-[#0b1224]/30 to-transparent" : "bg-[#0b1224]/60"}`} />
                            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                                <h3 className={`whitespace-nowrap font-semibold tracking-tight transition-all duration-500 ${on ? "text-[28px]" : "text-[20px]"}`}>{x.name}</h3>
                                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100 delay-150" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/80">{x.desc}</p>
                                        <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-white">
                                            {cta}
                                            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                {items.map((x, i) => (
                    <Rise key={x.key} delay={i * 80}>
                        <Link href={x.href} className="group relative block aspect-[4/3] overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={x.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1224]/90 via-[#0b1224]/35 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                <h3 className="text-[20px] font-semibold tracking-tight">{x.name}</h3>
                                <p className="mt-1.5 text-[14px] leading-relaxed text-white/80">{x.desc}</p>
                            </div>
                        </Link>
                    </Rise>
                ))}
            </div>
        </>
    );
}

export type Step = { title: string; desc: string; href: string };

/** 도입 지원 단계 — 연결선이 왼쪽에서 채워지며 단계 원이 차례로 켜진다. */
export function StepTrack({ steps }: { steps: Step[] }) {
    const [ref, inView] = useInView<HTMLOListElement>(0.3);
    return (
        <ol ref={ref} className={`jr-steps relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 ${inView ? "jr-steps-in" : ""}`}>
            <span aria-hidden className="absolute left-[18px] right-[calc((100%-72px)/4-18px)] top-[18px] hidden h-[2px] bg-[var(--color-line)] lg:block">
                <span className="jr-steps-line block h-full origin-left bg-gradient-to-r from-[#00acee] to-[#185aea]" />
            </span>
            {steps.map((s, i) => (
                <li key={s.title} className="jr-step relative" style={{ ["--i" as string]: i }}>
                    <span className="jr-step-dot relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--color-line)] bg-white text-[13px] font-bold text-[var(--color-ink-muted)]">
                        {i + 1}
                    </span>
                    <Link href={s.href} className="group mt-5 block">
                        <span className="flex items-center gap-1 text-[17px] font-semibold text-[var(--color-ink)] group-hover:text-[#185aea]">
                            {s.title}
                            <ChevronRight className="h-4 w-4 text-[#185aea] transition group-hover:translate-x-0.5" />
                        </span>
                        <span className="mt-1.5 block text-[14px] leading-relaxed text-[var(--color-ink-muted)]">{s.desc}</span>
                    </Link>
                </li>
            ))}
        </ol>
    );
}
