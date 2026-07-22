"use client";

/**
 * 제품(XGEN) 히어로 — 3슬라이드 키비주얼.
 *  1) 태그라인 + XGEN 소개영상 패널(우측)
 *  2) Model-Agnostic 메시지 + 지원 LLM 로고 마퀴
 *  3) On-Premise — 외부 유출 걱정 없는 사내 데이터 활용(보안 3원칙 + 실드)
 * 다크 히어로를 공유하도록 슬라이드를 absolute로 겹쳐 크로스페이드하고,
 * min-h로 높이를 고정한다. 자동 전환 + 하단 도트로 수동 이동.
 * 로고는 self-host한 공식 브랜드 SVG(/public/models/*).
 */

import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MODELS: { name: string; src: string }[] = [
    { name: "OpenAI", src: "/models/openai.svg" },
    { name: "Claude", src: "/models/anthropic.svg" },
    { name: "Gemini", src: "/models/googlegemini.svg" },
    { name: "Llama", src: "/models/meta.svg" },
    { name: "Mistral", src: "/models/mistralai.svg" },
    { name: "Qwen", src: "/models/qwen.svg" },
    { name: "DeepSeek", src: "/models/deepseek.svg" },
];

/** 슬라이드3 — 온프레미스 보안 3원칙(참조: On-premise Platform) */
const SECURITY_POINTS: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: Lock,
        title: "외부 유출 원천 차단",
        desc: "온프레미스 구축으로 데이터가 외부로 유출되지 않고 안전하게 활용됩니다",
    },
    {
        icon: Users,
        title: "내부 접근 세분화",
        desc: "부서·팀·개인 단위의 역할 기반 제어(RBAC)로 조직 내부 데이터 보안을 강화합니다",
    },
    {
        icon: ShieldCheck,
        title: "제로 트레이닝 보장",
        desc: "고객사 데이터가 외부 모델의 학습 데이터로 쓰이는 것을 기술적으로 방지합니다",
    },
];

const SLIDE_COUNT = 3;

export function ProductHero() {
    const [active, setActive] = useState(0);

    // active가 바뀔 때마다(자동·수동 모두) 다음 전환을 새로 예약 → 수동 이동이 바로 덮이지 않음
    useEffect(() => {
        const id = setTimeout(
            () => setActive((a) => (a + 1) % SLIDE_COUNT),
            7000,
        );
        return () => clearTimeout(id);
    }, [active]);

    return (
        <section className="relative min-h-[755px] overflow-hidden border-b border-white/10 bg-[#070b1c] text-white">
            {/* 배경 글로우 */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_78%_18%,rgba(47,123,255,0.16),transparent_60%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] rounded-full bg-[#00acee]/10 blur-[130px]"
            />

            {/* 슬라이드 1 — 태그라인 + 소개영상 */}
            <div
                className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
                    active === 0 ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            >
                <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            XGEN · Agentic AI Platform
                        </div>
                        <h1 className="mt-7 text-4xl font-bold leading-[1.15] tracking-tight md:text-5xl">
                            기업의 AX 혁신을 돕는
                            <br />
                            <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">
                                Agentic AI Platform
                            </span>
                            , XGEN
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                            맞춤형 AI 서비스를 설계하고, 운영하며, 신뢰를 완성하는 하나의
                            플랫폼 — 복잡한 개발 지식 없이도 Agent 기반 업무 자동화를
                            안전하게 구현합니다.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                데모 요청하기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href="#platform"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                플랫폼 살펴보기
                            </a>
                        </div>
                    </div>

                    {/* 키비주얼 — XGEN 소개영상 패널(우측) */}
                    <div className="w-full lg:translate-x-4">
                        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)]">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="aspect-video w-full object-cover"
                            >
                                <source src="/hero-xgen.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            {/* 슬라이드 2 — Model-Agnostic 로고 클라우드 */}
            <div
                className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
                    active === 1 ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            >
                <div className="mx-auto w-full max-w-5xl px-6 text-center">
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            XGEN · Agentic AI Platform
                        </div>
                    </div>
                    <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-bold leading-[1.28] tracking-tight md:text-[42px]">
                        원하는{" "}
                        <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">
                            LLM과 인프라
                        </span>
                        로 최적화된
                        <br />
                        맞춤 Agentic AI 서비스를 생성하세요
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                        특정 벤더에 종속되지 않는 Model-Agnostic 설계 — 온프레미스 GPU부터
                        사내 정책까지 환경에 맞춰 원하는 모델을 자유롭게 연결합니다.
                    </p>
                    <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
                        <div className="marquee-track flex w-max items-center gap-12 pr-12 md:gap-16 md:pr-16">
                            {[...MODELS, ...MODELS].map((m, i) => (
                                <span
                                    key={i}
                                    className="group flex shrink-0 items-center gap-2.5 opacity-80 transition duration-300 hover:opacity-100"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={m.src}
                                        alt={m.name}
                                        loading="lazy"
                                        className="h-7 w-auto brightness-0 invert transition duration-300 group-hover:brightness-100 group-hover:invert-0 md:h-8"
                                    />
                                    <span className="text-[19px] font-semibold tracking-tight text-white/70 transition group-hover:text-white md:text-[21px]">
                                        {m.name}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            데모 요청하기
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href="#platform"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            플랫폼 살펴보기
                        </a>
                    </div>
                </div>
            </div>

            {/* 슬라이드 3 — On-Premise 보안 3원칙 + 실드 */}
            <div
                className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
                    active === 2 ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            >
                <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            On-Premise Platform
                        </div>
                        <h2 className="mt-7 text-3xl font-bold leading-[1.22] tracking-tight md:text-[40px]">
                            외부 데이터 유출 걱정 없이
                            <br />
                            <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">
                                기업 내부 데이터
                            </span>
                            를 안심하고 활용하세요
                        </h2>
                        <ul className="mt-8 space-y-4">
                            {SECURITY_POINTS.map((p) => (
                                <li key={p.title} className="flex gap-3.5">
                                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#7dd3fc]">
                                        <p.icon className="h-[18px] w-[18px]" />
                                    </span>
                                    <div>
                                        <p className="text-[16px] font-bold tracking-tight text-white">
                                            {p.title}
                                        </p>
                                        <p className="mt-1 text-[14px] leading-relaxed text-white/60">
                                            {p.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                데모 요청하기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href="#on-premise"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                온프레미스 자세히
                            </a>
                        </div>
                    </div>

                    {/* 실드 비주얼 패널 */}
                    <div className="w-full lg:translate-x-2">
                        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#12295f_0%,#1e46b0_55%,#2f7bff_100%)] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)]">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl"
                            />
                            <ShieldVisual />
                        </div>
                    </div>
                </div>
            </div>

            {/* 슬라이드 도트 */}
            <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
                {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`슬라이드 ${i + 1}로 이동`}
                        onClick={() => setActive(i)}
                        className={`h-2 rounded-full transition-all ${
                            active === i
                                ? "w-7 bg-white"
                                : "w-2 bg-white/35 hover:bg-white/60"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

/** 광택 3D 느낌의 실드+열쇠구멍 — 온프레미스 데이터 보호 상징(자체 SVG) */
function ShieldVisual() {
    return (
        <svg
            viewBox="0 0 200 232"
            role="img"
            aria-label="온프레미스 데이터 보호 실드"
            className="relative h-[62%] w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
        >
            <defs>
                <linearGradient id="ph-shield" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#dbeafe" />
                    <stop offset="0.5" stopColor="#93b8fb" />
                    <stop offset="1" stopColor="#3b6fe0" />
                </linearGradient>
                <linearGradient id="ph-gloss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* 실드 본체 */}
            <path
                d="M100 8 L184 42 V116 C184 176 146 210 100 226 C54 210 16 176 16 116 V42 Z"
                fill="url(#ph-shield)"
                stroke="#eaf2ff"
                strokeWidth="2"
            />
            {/* 상단 광택 하이라이트 */}
            <path
                d="M100 20 L172 49 V104 C150 92 126 86 100 86 C74 86 50 92 28 104 V49 Z"
                fill="url(#ph-gloss)"
            />
            {/* 열쇠구멍 */}
            <circle cx="100" cy="112" r="20" fill="#1e46b0" />
            <path d="M92 128 h16 l5 34 h-26 z" fill="#1e46b0" />
        </svg>
    );
}
