"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SecurityAttackArt, SecurityHeroArt } from "@/components/security-hero-art";
import type { Locale } from "@/lib/i18n";

/**
 * Security & Governance 키비주얼 — 보안 통제·거버넌스 통제 카드를 가로로 순환한다.
 * 고객 사례 페이지의 FeaturedCaseSlider와 같은 구성(라벨 + 도트 + 이미지 카드)을 따른다.
 */
export interface SecurityHeroCard {
    tag: string;
    title: string;
    desc: string;
    cta: string;
    href: string;
}

const CARD_MS = 7000;

export function SecurityCardSlider({
    label,
    cards,
    locale,
}: {
    label: string;
    cards: SecurityHeroCard[];
    locale: Locale;
}) {
    const [active, setActive] = useState(0);
    const count = cards.length;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setTimeout(() => setActive((a) => (a + 1) % count), CARD_MS);
        return () => clearTimeout(id);
    }, [active, count]);

    return (
        <div className="w-full">
            <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-white/50">
                    {label}
                </p>
                <div className="flex gap-1.5">
                    {cards.map((c, i) => (
                        <button
                            key={c.tag}
                            type="button"
                            aria-label={c.tag}
                            aria-pressed={active === i}
                            onClick={() => setActive(i)}
                            className={`h-2 rounded-full transition-all ${
                                active === i ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${active * 100}%)` }}
                >
                    {cards.map((c, i) => (
                        <div key={c.tag} aria-hidden={active !== i} className="w-full shrink-0">
                            <a
                                href={c.href}
                                tabIndex={active === i ? undefined : -1}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#050813]/70 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)] transition hover:border-white/30"
                            >
                                <span className="absolute left-4 top-4 z-10 rounded-full bg-[#7dd3fc]/20 px-2.5 py-0.5 text-[12.5px] font-semibold text-[#7dd3fc] backdrop-blur-sm">
                                    {c.tag}
                                </span>
                                <div className="mx-auto w-[82%] pt-10 sm:w-[64%] sm:pt-4">
                                    {i === 0 ? (
                                        <SecurityAttackArt locale={locale} />
                                    ) : (
                                        <SecurityHeroArt locale={locale} />
                                    )}
                                </div>
                                <div className="mt-auto p-5 pt-2">
                                    <h3 className="text-[18px] font-bold leading-snug text-white">
                                        {c.title}
                                    </h3>
                                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
                                        {c.desc}
                                    </p>
                                    <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#7dd3fc]">
                                        {c.cta}
                                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
