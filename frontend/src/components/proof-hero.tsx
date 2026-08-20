"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { SITE } from "@/lib/site";
import { FEATURED_DEMO, YouTubeFacade, demoDesc } from "./poc-demos";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
    Locale,
    { title: string; lead: string; play: string; channel: string }
> = {
    ko: {
        title: "실증 데모",
        lead: "백마디 말보다 실행으로 — XGEN의 핵심 기능이 실제로 실행되는 모습을 영상으로 확인하세요",
        play: "데모 영상 재생",
        channel: "플래티어랩스 YouTube 채널",
    },
    en: {
        title: "Proof in Action",
        lead: "Less telling, more running — watch XGEN's core capabilities work on the real product",
        play: "Play the demo",
        channel: "Plateer AI Labs on YouTube",
    },
};

/**
 * 실증 데모 페이지 키 비주얼 — 대표 XGEN 실증 데모 영상을 중심으로 구성한 히어로.
 * 좌: 페이지 카피 + CTA(영상 재생 · YouTube 채널), 우: 인라인 재생되는 영상 KV +
 * 클릭 시 해당 지점부터 재생되는 챕터 타임라인. (다크 히어로 배경 위에서 렌더)
 */
export function ProofHero({ locale = "ko" }: { locale?: Locale }) {
    const demo = FEATURED_DEMO;
    const t = COPY[locale];
    const en = locale === "en";
    const [player, setPlayer] = useState({ loaded: false, start: 0 });

    if (!demo) return null;
    const play = (sec: number) => setPlayer({ loaded: true, start: sec });

    return (
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            {/* 좌: 카피 + CTA */}
            <div>
                <p className="text-[15px] font-semibold tracking-tight text-[#5eead4]">
                    Applied AI · Proof in Action
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                    {t.title}
                </h1>
                <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white/85">
                    {t.lead}
                </p>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
                    {demoDesc(demo, en)}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={() => play(0)}
                        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                    >
                        <Play className="h-4 w-4 fill-current" />
                        {t.play}
                    </button>
                    <Link
                        href={SITE.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[16px] font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-5 text-[#FF3355]"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        {t.channel}
                        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>

            {/* 우: 영상 KV + 챕터 타임라인 */}
            <div>
                <div className="relative overflow-hidden rounded-2xl bg-black ring-1 ring-white/15 shadow-[0_40px_90px_-40px_rgba(47,123,255,0.55),0_24px_50px_-30px_rgba(0,0,0,0.7)]">
                    <YouTubeFacade
                        demo={demo}
                        loaded={player.loaded}
                        start={player.start}
                        onPlay={play}
                        locale={locale}
                    />
                </div>

                {demo.chapters && demo.chapters.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {demo.chapters.map((c) => (
                            <button
                                key={c.time}
                                type="button"
                                onClick={() => play(c.sec)}
                                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[13px] text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                            >
                                <span className="font-mono text-[12px] font-semibold tabular-nums text-[#7dd3fc]">
                                    {c.time}
                                </span>
                                {(en && c.labelEn) || c.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
