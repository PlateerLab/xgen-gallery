"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCT_TAGS } from "@/lib/product-tags";

/**
 * 「XGEN의 새로운 소식 살펴보기」 카테고리 탭.
 * 예전 메인 슬라이드 아래 뉴스 띠(XGEN 프리뷰·최근 고객 사례·현장 리포트·뉴스레터·테크 노트)를
 * 카테고리로 옮겨 왔다. 항목은 서버(home-page.tsx)에서 블로그·고객사례·뉴스레터 데이터로 만들어 넘긴다.
 *  - 「전체」: 카테고리마다 최신 1건씩, 최신순
 *  - 각 카테고리: 최신 3건
 */

export type NewsCategory = "product" | "news" | "case" | "field" | "insight" | "newsletter" | "tech";

export type NewsItem = {
    cat: NewsCategory;
    img: string;
    fit: "cover" | "contain";
    eyebrow: string;
    title: string;
    desc: string;
    href: string; // 로케일 접두사가 이미 붙은 경로
    cta: string;
    fn?: number;
    date: string; // YYYY-MM-DD, 정렬용
    product?: string; // 제품 구분 태그 (제품 소식만)
};

const ORDER: NewsCategory[] = ["product", "news", "case", "field", "insight", "tech"];
const PER_TAB: Partial<Record<NewsCategory, number>> = { product: 6 };

export function NewsTabs({
    items,
    labels,
    allLabel,
}: {
    items: NewsItem[];
    labels: Record<NewsCategory, string>;
    allLabel: string;
}) {
    const [tab, setTab] = useState<"all" | NewsCategory>("all");
    const [prod, setProd] = useState<string>("all");
    const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
    const present = ORDER.filter((c) => sorted.some((i) => i.cat === c));
    const products = PRODUCT_TAGS.filter((t) => sorted.some((i) => i.cat === "product" && i.product === t));
    const shown =
        tab === "all"
            ? present.map((c) => sorted.find((i) => i.cat === c)!).sort((a, b) => b.date.localeCompare(a.date))
            : sorted
                  .filter((i) => i.cat === tab && (tab !== "product" || prod === "all" || i.product === prod))
                  .slice(0, PER_TAB[tab] ?? 3);
    const tabs: { key: "all" | NewsCategory; label: string }[] = [
        { key: "all", label: allLabel },
        ...present.map((c) => ({ key: c, label: labels[c] })),
    ];

    return (
        <>
            <div role="tablist" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
                {tabs.map((t) => {
                    const on = tab === t.key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={on}
                            onClick={() => {
                                setTab(t.key);
                                setProd("all");
                            }}
                            className={`h-10 flex-none whitespace-nowrap rounded-full border px-5 text-[14px] font-semibold transition ${
                                on
                                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                                    : "border-[var(--color-line-strong)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                            }`}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>
            {tab === "product" && products.length > 1 ? (
                <div className="mt-5 flex flex-wrap gap-2" aria-label="제품 구분">
                    {["all", ...products].map((p) => (
                        <button
                            key={p}
                            type="button"
                            aria-pressed={prod === p}
                            onClick={() => setProd(p)}
                            className={`h-8 rounded-full px-3.5 text-[13px] font-medium transition ${
                                prod === p
                                    ? "bg-[#185aea] text-white"
                                    : "bg-[#eef3fd] text-[#185aea] hover:bg-[#dfe8fb]"
                            }`}
                        >
                            {p === "all" ? allLabel : `#${p}`}
                        </button>
                    ))}
                </div>
            ) : null}
            <ul
                role="tabpanel"
                className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-y-10"
            >
                {shown.map((n) => (
                    <li key={`${n.cat}-${n.href}`}>
                        <Link
                            href={n.href}
                            className="group flex gap-4 sm:flex-col sm:gap-0"
                        >
                            <div className="aspect-[16/9] w-[132px] flex-none overflow-hidden rounded-lg bg-[#f2f4f8] sm:w-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={n.img}
                                    alt=""
                                    loading="lazy"
                                    className={`h-full w-full transition duration-300 group-hover:scale-[1.03] ${
                                        n.fit === "contain" ? "object-contain p-4" : "object-cover object-top"
                                    }`}
                                />
                            </div>
                            <div className="min-w-0 sm:mt-4">
                                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-[var(--color-ink-muted)]">
                                    {n.product ? (
                                        <span className="rounded bg-[#eef3fd] px-1.5 py-0.5 text-[11.5px] font-semibold text-[#185aea]">
                                            #{n.product}
                                        </span>
                                    ) : null}
                                    <span>{n.eyebrow}</span>
                                </p>
                                <h3 className="mt-1.5 line-clamp-2 text-[16px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] group-hover:underline sm:text-[17px]">
                                    {n.title}
                                    {n.fn ? <sup className="ml-0.5 text-[11px] font-normal text-[#185aea]">{n.fn}</sup> : null}
                                </h3>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
