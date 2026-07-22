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
import { ArrowRight } from "lucide-react";
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
                                href="/contact?type=demo"
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
                            href="/contact?type=demo"
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
                            XGEN · Agentic AI Platform
                        </div>
                        <h2 className="mt-7 text-3xl font-bold leading-[1.22] tracking-tight md:text-[40px]">
                            외부 데이터 유출 걱정 없이
                            <br />
                            <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">
                                기업 내부 데이터
                            </span>
                            를 안심하고 활용하세요
                        </h2>
                        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">
                            온프레미스로 구축돼 데이터가 외부로 유출되지 않고, 역할 기반
                            접근 제어(RBAC)로 내부 접근 권한을 세분화하며, 고객사 데이터가
                            외부 모델의 학습 데이터로 쓰이지 않도록 기술적으로 차단합니다
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/contact?type=demo"
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

                    {/* 외부망/내부망 네트워크 보안 비주얼(움직임) */}
                    <div className="w-full lg:translate-x-2">
                        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(120%_120%_at_72%_18%,#173a86_0%,#0a1636_62%)] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)]">
                            <OnPremNetwork />
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

/**
 * 외부망/내부망 네트워크 보안 — 데이터 유출 없는 사내 활용을 도식으로.
 *  · 좌: 외부망(Internet) 노드 → 방화벽에서 침입 차단(×)
 *  · 우: 내부망(On-Premise) 객체들이 유기적으로 연결, 링크에 데이터가 흐름
 * SVG + CSS(.flowline 흐르는 점선, Tailwind animate-pulse) — 외부 에셋 없음.
 */
function OnPremNetwork() {
    // 내부망 노드 좌표(viewBox 400x300 기준)
    const core = { x: 292, y: 150 };
    const inner = [
        { x: 236, y: 92 },
        { x: 356, y: 108 },
        { x: 234, y: 214 },
        { x: 360, y: 206 },
    ];
    return (
        <svg
            viewBox="0 0 400 300"
            role="img"
            aria-label="외부망과 내부망 — 방화벽으로 보호되는 온프레미스 네트워크"
            className="block h-auto w-full"
        >
            {/* 내부망 존 */}
            <rect
                x="182"
                y="46"
                width="200"
                height="208"
                rx="20"
                fill="#7dd3fc"
                fillOpacity="0.05"
                stroke="#7dd3fc"
                strokeOpacity="0.28"
            />
            <text x="282" y="279" textAnchor="middle" fontSize="12.5" fontWeight="600" letterSpacing="0.04em" fill="#cfe8ff">
                내부망 · On-Premise
            </text>

            {/* 내부망 링크 — 유기적 연결 + 데이터 흐름 */}
            <g stroke="#7dd3fc" strokeOpacity="0.55" strokeWidth="1.6" fill="none" strokeLinecap="round">
                {inner.map((n, i) => (
                    <line
                        key={i}
                        className="flowline"
                        x1={core.x}
                        y1={core.y}
                        x2={n.x}
                        y2={n.y}
                        style={{ animationDelay: `${i * 0.25}s` }}
                    />
                ))}
                <line className="flowline" x1={inner[0].x} y1={inner[0].y} x2={inner[1].x} y2={inner[1].y} style={{ animationDelay: "0.5s" }} />
                <line className="flowline" x1={inner[2].x} y1={inner[2].y} x2={inner[3].x} y2={inner[3].y} style={{ animationDelay: "0.7s" }} />
            </g>

            {/* 내부망 노드 */}
            {inner.map((n, i) => (
                <circle
                    key={i}
                    className="animate-pulse"
                    cx={n.x}
                    cy={n.y}
                    r="6.5"
                    fill="#dff1ff"
                    style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2.4s" }}
                />
            ))}
            {/* 내부망 코어(XGEN) */}
            <circle cx={core.x} cy={core.y} r="20" fill="#2f7bff" fillOpacity="0.25" />
            <circle cx={core.x} cy={core.y} r="12" fill="#eaf6ff" />
            <circle cx={core.x} cy={core.y} r="4.5" fill="#1e46b0" />

            {/* 방화벽(경계) + 잠금 배지 */}
            <line x1="150" y1="60" x2="150" y2="240" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 6" />
            <g transform="translate(150 150)">
                <rect x="-16" y="-16" width="32" height="32" rx="9" fill="#0a1636" stroke="#7dd3fc" strokeOpacity="0.7" strokeWidth="1.5" />
                <rect x="-6.5" y="-2" width="13" height="10" rx="2" fill="#7dd3fc" />
                <path d="M-4 -2 v-4 a4 4 0 0 1 8 0 v4" fill="none" stroke="#7dd3fc" strokeWidth="2" />
            </g>

            {/* 외부망 노드 + 차단된 침입 시도 */}
            <text x="66" y="279" textAnchor="middle" fontSize="12.5" fontWeight="600" letterSpacing="0.04em" fill="#a7b8d6">
                외부망 · Internet
            </text>
            <line x1="46" y1="112" x2="62" y2="188" stroke="#8ea3c6" strokeOpacity="0.5" strokeWidth="1.6" />
            <circle cx="46" cy="112" r="6" fill="#8ea3c6" fillOpacity="0.85" />
            <circle cx="62" cy="188" r="6" fill="#8ea3c6" fillOpacity="0.85" />
            {/* 침입 시도 → 방화벽에서 차단 */}
            <line x1="66" y1="150" x2="128" y2="150" stroke="#f0a3a3" strokeOpacity="0.7" strokeWidth="1.6" strokeDasharray="4 4" />
            <g transform="translate(133 150)">
                <circle r="8" fill="#3a1420" stroke="#f08a8a" strokeWidth="1.5" />
                <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="#f6b0b0" strokeWidth="1.8" strokeLinecap="round" />
            </g>
        </svg>
    );
}
