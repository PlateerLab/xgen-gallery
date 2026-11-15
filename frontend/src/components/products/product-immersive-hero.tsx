"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/**
 * 제품 브랜드 히어로 — 스크롤 고정(pin) 구간 안에서 두 장면을 넘긴다.
 *   장면 1: 제품 워드마크 + 핵심 문장 (제품 화면은 크게 확대된 배경)
 *   장면 2: 설명 + CTA (제품 화면이 제자리 크기로 줄어들며 드러남)
 * 동작 줄이기 설정이면 고정·전환 없이 두 장면을 차례로 쌓은 정지 화면을 보여준다.
 */
export function ProductImmersiveHero({
    name,
    eyebrow,
    titleA,
    titleB,
    lead,
    image,
    imageAlt,
    cta,
    secondary,
    scrollHint,
}: {
    name: string;
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    image: string;
    imageAlt: string;
    cta: { label: string; href: string };
    secondary: { label: string; href: string };
    scrollHint: string;
}) {
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    // 고정 구간(섹션 높이 - 화면 높이) 안에서의 진행률 0~1. 문서 전체가 아니라 이 섹션 기준으로 직접 계산한다.
    const scrollYProgress = useMotionValue(0);
    useEffect(() => {
        const update = () => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const range = r.height - window.innerHeight;
            scrollYProgress.set(range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [scrollYProgress, reduce]);

    const imgScale = useTransform(scrollYProgress, [0, 0.55], [1.45, 0.86]);
    const imgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.32, 0.95]);
    const imgY = useTransform(scrollYProgress, [0, 0.55], ["0%", "12%"]);
    const p1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
    const p1Y = useTransform(scrollYProgress, [0, 0.32], [0, -60]);
    const p2Opacity = useTransform(scrollYProgress, [0.36, 0.48, 1], [0, 1, 1]);
    const p2Y = useTransform(scrollYProgress, [0.36, 0.48], [40, 0]);
    const veil = useTransform(scrollYProgress, [0.3, 0.55], [0.55, 0.78]);

    const ctas = (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(47,123,255,0.7)] transition hover:bg-[#2461d8]"
            >
                {cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:bg-white/10"
            >
                {secondary.label}
            </Link>
        </div>
    );

    const wordmark = (
        <p className="flex items-center justify-center gap-3">
            <span
                aria-hidden
                className="h-3.5 w-3.5 rounded-full bg-[linear-gradient(45deg,#00acee,#185aea)] shadow-[0_0_24px_rgba(0,172,238,0.9)] md:h-5 md:w-5"
            />
            <span className="text-[56px] font-black leading-none tracking-tight text-white md:text-[104px]">{name}</span>
        </p>
    );

    const panel1 = (
        <>
            {wordmark}
            <p className="mt-5 font-mono text-[12.5px] uppercase tracking-[0.22em] text-[#7dd3fc] md:text-[13.5px]">
                {eyebrow}
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-[28px] font-extrabold leading-[1.2] tracking-tight md:text-[48px]">
                <span className="block text-white/75">{titleA}</span>
                <span className="block bg-gradient-to-r from-white via-[#cfe6ff] to-[#7dd3fc] bg-clip-text text-transparent">
                    {titleB}
                </span>
            </h1>
        </>
    );

    const panel2 = (
        <>
            <p className="mx-auto max-w-3xl text-[19px] font-semibold leading-[1.6] text-white md:text-[26px]">{lead}</p>
            {ctas}
        </>
    );

    if (reduce) {
        return (
            <section id="overview" ref={ref} className="relative scroll-mt-[120px] overflow-hidden bg-[#060914] text-white">
                <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-40 text-center">
                    {panel1}
                    <div className="mt-12">{panel2}</div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={imageAlt}
                        className="mx-auto mt-14 block h-auto w-full rounded-2xl border border-white/15"
                    />
                </div>
            </section>
        );
    }

    return (
        <section id="overview" ref={ref} className="relative h-[240vh] scroll-mt-0 bg-[#060914] text-white">
            <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
                {/* 배경 — 실제 제품 화면을 확대해 두고 스크롤에 맞춰 제자리로 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        style={{ scale: imgScale, opacity: imgOpacity, y: imgY }}
                        className="w-[min(1100px,92vw)] will-change-transform"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt={imageAlt}
                            className="block h-auto w-full rounded-2xl border border-white/15 shadow-[0_0_120px_rgba(47,123,255,0.35)]"
                        />
                    </motion.div>
                </div>
                <motion.div
                    aria-hidden
                    style={{ opacity: veil }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(6,9,20,0.55),#060914_90%)]"
                />

                {/* 장면 1 */}
                <motion.div
                    style={{ opacity: p1Opacity, y: p1Y }}
                    className="absolute inset-x-0 px-6 text-center"
                >
                    {panel1}
                </motion.div>

                {/* 장면 2 */}
                <motion.div
                    style={{ opacity: p2Opacity, y: p2Y }}
                    className="absolute inset-x-0 px-6 text-center"
                >
                    {panel2}
                </motion.div>

                <motion.p
                    aria-hidden
                    style={{ opacity: p1Opacity }}
                    className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 text-[12px] text-white/50"
                >
                    {scrollHint}
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                </motion.p>
            </div>
        </section>
    );
}
