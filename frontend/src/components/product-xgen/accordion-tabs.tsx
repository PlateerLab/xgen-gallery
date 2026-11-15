"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * /product/xgen — Microsoft Teams 제품 상세 페이지의 「상단 탭 + 좌측 아코디언 + 우측 화면」 패턴.
 * 탭은 탐색만 하고, 항목을 열면 오른쪽 화면이 그 항목의 화면으로 바뀐다.
 * 페이지 밖에서 걸린 앵커(#build, #geny 등)로 들어오면 해당 탭·항목을 연다.
 */

export type AccordionVisual =
    | { type: "img"; img: string; alt: string; sub?: { img: string; alt: string }; contain?: boolean }
    | { type: "node"; node: ReactNode; label: string };

export type AccordionItem = {
    key: string;
    /** 이 항목을 여는 앵커 id(선택) */
    anchor?: string;
    title: string;
    desc: string;
    href?: string;
    more?: string;
    /** 페이지 하단 각주 번호(선택) */
    fn?: number;
    visual: AccordionVisual;
};

export type AccordionGroup = {
    key: string;
    label: string;
    /** 이 탭을 여는 앵커 id(첫 항목이 열림) */
    anchors?: string[];
    items: AccordionItem[];
};

function Visual({ v, className }: { v: AccordionVisual; className?: string }) {
    if (v.type === "node") {
        return (
            <div role="img" aria-label={v.label} className={className}>
                {v.node}
            </div>
        );
    }
    return (
        <div className={cn("relative", v.sub && "pb-8 pr-8 sm:pb-12 sm:pr-12", className)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={v.img}
                alt={v.alt}
                loading="lazy"
                className={cn(
                    "w-full rounded-xl border border-[var(--color-line)] bg-white shadow-[0_18px_48px_-20px_rgba(11,18,36,0.3)]",
                    v.contain && "object-contain p-6",
                )}
            />
            {v.sub && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={v.sub.img}
                    alt={v.sub.alt}
                    loading="lazy"
                    className="absolute bottom-0 right-0 w-[48%] rounded-xl border border-[var(--color-line)] bg-white shadow-[0_18px_44px_-14px_rgba(11,18,36,0.4)]"
                />
            )}
        </div>
    );
}

export function AccordionTabs({
    locale,
    groups,
    prevLabel,
    nextLabel,
}: {
    locale: Locale;
    groups: AccordionGroup[];
    prevLabel: string;
    nextLabel: string;
}) {
    const [g, setG] = useState(0);
    const [i, setI] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const group = groups[g];
    const item = group.items[i] ?? group.items[0];

    const openByHash = useCallback(() => {
        const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
        if (!hash) return;
        for (let gi = 0; gi < groups.length; gi++) {
            const ii = groups[gi].items.findIndex((x) => x.anchor === hash);
            if (ii >= 0 || groups[gi].anchors?.includes(hash)) {
                setG(gi);
                setI(Math.max(ii, 0));
                return;
            }
        }
    }, [groups]);

    useEffect(() => {
        openByHash();
        window.addEventListener("hashchange", openByHash);
        return () => window.removeEventListener("hashchange", openByHash);
    }, [openByHash]);

    const go = (next: number) => {
        const n = (next + groups.length) % groups.length;
        setG(n);
        setI(0);
    };

    return (
        <div ref={rootRef}>
            {/* 앵커 착지점 — 고정 헤더 높이만큼 위로 */}
            {groups.flatMap((x) => [...(x.anchors ?? []), ...x.items.map((y) => y.anchor).filter(Boolean)]).map((a) => (
                <span key={a} id={a} aria-hidden className="block scroll-mt-[calc(var(--nav-h,80px)+24px)]" />
            ))}

            {/* 상단 탭 + 이전/다음 */}
            <div className="flex items-center gap-2 border-b border-[var(--color-line)]">
                <button
                    type="button"
                    onClick={() => go(g - 1)}
                    aria-label={prevLabel}
                    className="hidden h-9 w-9 flex-none items-center justify-center rounded-full text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)] sm:flex"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div role="tablist" className="-mb-px flex flex-1 flex-nowrap gap-1 overflow-x-auto sm:justify-center">
                    {groups.map((x, gi) => (
                        <button
                            key={x.key}
                            role="tab"
                            type="button"
                            aria-selected={gi === g}
                            onClick={() => {
                                setG(gi);
                                setI(0);
                            }}
                            className={cn(
                                "shrink-0 whitespace-nowrap border-b-[3px] px-5 py-3.5 text-[15.5px] font-semibold transition",
                                gi === g
                                    ? "border-[#185aea] text-[var(--color-ink)]"
                                    : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                            )}
                        >
                            {x.label}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => go(g + 1)}
                    aria-label={nextLabel}
                    className="hidden h-9 w-9 flex-none items-center justify-center rounded-full text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)] sm:flex"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div role="tabpanel" key={group.key} className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-14">
                {/* 좌측 아코디언 */}
                <ul className="min-w-0 border-t border-[var(--color-line)]">
                    {group.items.map((x, ii) => {
                        const open = ii === i;
                        return (
                            <li key={x.key} className="border-b border-[var(--color-line)]">
                                <button
                                    type="button"
                                    aria-expanded={open}
                                    onClick={() => setI(ii)}
                                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                                >
                                    <span
                                        className={cn(
                                            "text-[18px] font-semibold tracking-tight transition",
                                            open ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]",
                                        )}
                                    >
                                        {x.title}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 flex-none text-[var(--color-ink-muted)] transition",
                                            open && "rotate-180 text-[var(--color-ink)]",
                                        )}
                                    />
                                </button>
                                {open && (
                                    <div className="pb-6">
                                        <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {x.desc}
                                            {x.fn && (
                                                <sup className="ml-0.5">
                                                    <a href={`#fn-${x.fn}`} className="text-[#185aea] hover:underline">
                                                        {x.fn}
                                                    </a>
                                                </sup>
                                            )}
                                        </p>
                                        {x.href && x.more && (
                                            <Link
                                                href={localeHref(locale, x.href)}
                                                className="group mt-4 inline-flex items-center gap-1 text-[15px] font-semibold text-[#185aea] hover:underline"
                                            >
                                                {x.more}
                                                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                            </Link>
                                        )}
                                        {/* 모바일: 화면을 항목 아래에 */}
                                        <Visual v={x.visual} className="mt-6 lg:hidden" />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* 우측 화면 */}
                <div className="hidden min-w-0 lg:sticky lg:top-[calc(var(--nav-h,80px)+32px)] lg:block">
                    <Visual key={item.key} v={item.visual} />
                </div>
            </div>
        </div>
    );
}

/** 플랜 영역 — Teams의 「대상별 탭 + 플랜 카드」. 패널 내용은 서버에서 만든다. */
export function PlanTabs({ tabs }: { tabs: { key: string; label: string; panel: ReactNode }[] }) {
    const [active, setActive] = useState(tabs[0].key);
    return (
        <div>
            <div role="tablist" className="mx-auto flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full bg-[var(--color-surface-hover)] p-1">
                {tabs.map((x) => (
                    <button
                        key={x.key}
                        role="tab"
                        type="button"
                        aria-selected={x.key === active}
                        onClick={() => setActive(x.key)}
                        className={cn(
                            "shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-[15px] font-semibold transition",
                            x.key === active
                                ? "bg-white text-[var(--color-ink)] shadow-[0_1px_3px_rgba(11,18,36,0.18)]"
                                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                        )}
                    >
                        {x.label}
                    </button>
                ))}
            </div>
            {tabs.map((x) => (
                <div key={x.key} role="tabpanel" hidden={x.key !== active} className="mt-10">
                    {x.panel}
                </div>
            ))}
        </div>
    );
}
