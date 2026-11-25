"use client";

/**
 * /product/xgen 개요 고객사례 — 비아이매트릭스 TRINITY 「Scenarios」 배치를 참고했다.
 * 가운데 탭(고객사) → 패널 하나: 업종·상태 → 제목 → 과제 → XGEN 적용(강조 상자) → 제공 범위 → 사례 링크.
 * 문구는 사례 데이터(lib/customers.ts)의 과제·솔루션·제공 범위를 그대로 쓴다(새 주장 없음).
 * 탭이 길면 가로 스크롤(줄바꿈·찌그러짐 없음).
 */

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export type CaseScenario = {
    slug: string;
    href: string;
    tab: string;
    meta: string;
    title: string;
    challenge: string;
    solution: string;
    highlights: string[];
};

export function CaseScenarios({
    items,
    labels,
}: {
    items: CaseScenario[];
    labels: { challenge: string; solution: string; scope: string; more: string; tablist: string };
}) {
    const [cur, setCur] = useState(0);
    if (!items.length) return null;
    const c = items[Math.min(cur, items.length - 1)];
    return (
        <div>
            <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div
                    role="tablist"
                    aria-label={labels.tablist}
                    className="mx-auto flex w-max gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-1"
                >
                    {items.map((it, i) => {
                        const on = i === cur;
                        return (
                            <button
                                key={it.slug}
                                type="button"
                                role="tab"
                                id={`case-tab-${it.slug}`}
                                aria-selected={on}
                                aria-controls="case-panel"
                                onClick={() => setCur(i)}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-[13.5px] font-semibold transition ${
                                    on
                                        ? "bg-[#2461d8] text-white shadow-[0_6px_16px_-8px_rgba(36,97,216,0.7)]"
                                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                                }`}
                            >
                                {it.tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                id="case-panel"
                role="tabpanel"
                aria-labelledby={`case-tab-${c.slug}`}
                className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_18px_44px_-28px_rgba(20,40,80,0.3)]"
            >
                <div className="p-6 lg:p-10">
                    <p className="text-[12.5px] font-semibold text-[#2461d8]">{c.meta}</p>
                    <h3 className="mt-2 text-[21px] font-bold leading-snug tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[24px]">
                        {c.title}
                    </h3>

                    <div className="mt-7">
                        <p className="border-l-2 border-[var(--color-line)] pl-2.5 text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                            {labels.challenge}
                        </p>
                        <p className="mt-2.5 max-w-[860px] text-[15px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                            {c.challenge}
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#cfdcf6] bg-[#f4f8ff] p-5 lg:p-6">
                        <p className="border-l-2 border-[#2f7bff] pl-2.5 text-[12.5px] font-bold text-[#2461d8]">
                            {labels.solution}
                        </p>
                        <p className="mt-2.5 max-w-[860px] text-[15px] leading-relaxed text-[var(--color-ink)] [word-break:keep-all]">
                            {c.solution}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)] px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <div className="min-w-0">
                        <p className="border-l-2 border-[var(--color-line)] pl-2.5 text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                            {labels.scope}
                        </p>
                        <ul className="mt-2.5 flex flex-wrap gap-1.5">
                            {c.highlights.map((h) => (
                                <li
                                    key={h}
                                    className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[13px] text-[var(--color-ink-muted)]"
                                >
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        href={c.href}
                        className="group inline-flex flex-none items-center gap-1.5 self-start whitespace-nowrap text-[14px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0] lg:self-center"
                    >
                        {labels.more}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
