"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 v2 — Microsoft Teams 제품 페이지의 「가로 탭 + 이미지/설명」 기능 섹션 패턴.
 * 탭은 탐색만 한다(링크 이동 없음). 긴 탭은 모바일에서 가로 스크롤.
 */
export type FeatureTab = {
    key: string;
    label: string;
    title: string;
    desc: string;
    points: string[];
    img: string;
    imgAlt: string;
    /** 겹쳐 보여 줄 보조 화면(선택) */
    sub?: { img: string; alt: string };
    href?: string;
    more: string;
};

export function FeatureTabs({ locale, tabs }: { locale: Locale; tabs: FeatureTab[] }) {
    const [active, setActive] = useState(tabs[0].key);
    const t = tabs.find((x) => x.key === active) ?? tabs[0];

    return (
        <div>
            <div
                role="tablist"
                className="-mx-5 flex flex-nowrap gap-1 overflow-x-auto border-b border-[var(--color-line)] px-5 sm:mx-0 sm:justify-center sm:px-0"
            >
                {tabs.map((x) => (
                    <button
                        key={x.key}
                        role="tab"
                        type="button"
                        aria-selected={x.key === active}
                        onClick={() => setActive(x.key)}
                        className={cn(
                            "shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-[15px] font-semibold transition",
                            x.key === active
                                ? "border-[#185aea] text-[var(--color-ink)]"
                                : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                        )}
                    >
                        {x.label}
                    </button>
                ))}
            </div>

            <div
                role="tabpanel"
                key={t.key}
                className="mt-10 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14"
            >
                <div className="relative pb-6 pr-6 sm:pb-10 sm:pr-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={t.img}
                        alt={t.imgAlt}
                        loading="lazy"
                        className="w-full rounded-lg border border-[var(--color-line)] bg-white shadow-[0_12px_40px_-16px_rgba(11,18,36,0.25)]"
                    />
                    {t.sub && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={t.sub.img}
                            alt={t.sub.alt}
                            loading="lazy"
                            className="absolute bottom-0 right-0 w-[46%] rounded-lg border border-[var(--color-line)] bg-white shadow-[0_16px_40px_-14px_rgba(11,18,36,0.35)]"
                        />
                    )}
                </div>
                <div>
                    <h3 className="text-[26px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] md:text-[30px]">
                        {t.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{t.desc}</p>
                    <ul className="mt-5 space-y-2.5">
                        {t.points.map((p) => (
                            <li key={p} className="flex gap-2.5 text-[15px] leading-snug text-[var(--color-ink)]">
                                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#185aea]" />
                                {p}
                            </li>
                        ))}
                    </ul>
                    {t.href && (
                        <Link
                            href={localeHref(locale, t.href)}
                            className="group mt-7 inline-flex items-center gap-1 text-[15px] font-semibold text-[#185aea] hover:underline"
                        >
                            {t.more}
                            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
