"use client";

/**
 * 최근 고객 사례 슬라이드 배너 — FeaturedCaseCard를 가로 슬라이드로 순환.
 * 자동 전환 + 상단 도트로 수동 이동(도트 클릭 시 타이머 리셋).
 */

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { CaseStudy } from "@/lib/customers";
import { FeaturedCaseCard } from "@/components/featured-case-card";

export function FeaturedCaseSlider({
    items,
    label,
    locale = "ko",
}: {
    items: CaseStudy[];
    label?: string;
    locale?: Locale;
}) {
    const [active, setActive] = useState(0);
    const count = items.length;

    useEffect(() => {
        if (count <= 1) return;
        const id = setTimeout(
            () => setActive((a) => (a + 1) % count),
            5500,
        );
        return () => clearTimeout(id);
    }, [active, count]);

    if (count === 0) return null;

    return (
        <div className="w-full">
            <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-semibold uppercase tracking-wider text-white/50">
                    {label}
                </p>
                {count > 1 && (
                    <div className="flex gap-1.5">
                        {items.map((c, i) => (
                            <button
                                key={c.slug}
                                type="button"
                                aria-label={
                                    locale === "en"
                                        ? `Go to case ${i + 1}`
                                        : `${i + 1}번째 사례로 이동`
                                }
                                onClick={() => setActive(i)}
                                className={`h-2 rounded-full transition-all ${
                                    active === i
                                        ? "w-6 bg-white"
                                        : "w-2 bg-white/35 hover:bg-white/60"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${active * 100}%)` }}
                >
                    {items.map((c) => (
                        <div key={c.slug} className="w-full shrink-0">
                            <FeaturedCaseCard locale={locale} item={c} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
