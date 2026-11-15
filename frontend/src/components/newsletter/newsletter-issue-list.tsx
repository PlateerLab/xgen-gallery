"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/** 뉴스레터 지난 호 목록 — 한 페이지에 PAGE_SIZE개씩 나눠 보여 준다. */
export const PAGE_SIZE = 5;

export type IssueItem = {
    slug: string;
    vol: number | string;
    date: string;
    title: string;
    summary: string;
    href: string;
};

export function NewsletterIssueList({
    items,
    locale,
}: {
    items: IssueItem[];
    locale: "ko" | "en";
}) {
    const [page, setPage] = useState(1);
    const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const current = Math.min(page, pageCount);
    const visible = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
    const label =
        locale === "ko"
            ? { prev: "이전 페이지", next: "다음 페이지", page: (n: number) => `${n}페이지`, nav: "지난 호 페이지" }
            : { prev: "Previous page", next: "Next page", page: (n: number) => `Page ${n}`, nav: "Past issue pages" };

    return (
        <>
            <div className="mt-5 space-y-3">
                {visible.map((it) => (
                    <Link
                        key={it.slug}
                        href={it.href}
                        className="group flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[var(--color-line-strong)]"
                    >
                        <span className="flex-none rounded-lg bg-[#2f7bff]/10 px-2.5 py-1 font-mono text-[13px] font-bold text-[#2461d8]">
                            vol.{it.vol}
                        </span>
                        <div className="min-w-0">
                            <time dateTime={it.date} className="text-[13px] text-[var(--color-ink-subtle)]">
                                {it.date.replaceAll("-", ".")}
                            </time>
                            <h3 className="mt-0.5 text-[16px] font-bold tracking-tight text-[var(--color-ink)] group-hover:underline">
                                {it.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                {it.summary}
                            </p>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5" />
                    </Link>
                ))}
            </div>

            {pageCount > 1 && (
                <nav aria-label={label.nav} className="mt-6 flex items-center justify-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => setPage(current - 1)}
                        disabled={current === 1}
                        aria-label={label.prev}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => setPage(n)}
                            aria-label={label.page(n)}
                            aria-current={n === current ? "page" : undefined}
                            className={
                                "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-[14px] font-semibold transition " +
                                (n === current
                                    ? "bg-[#2461d8] text-white"
                                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-alt)]")
                            }
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => setPage(current + 1)}
                        disabled={current === pageCount}
                        aria-label={label.next}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </nav>
            )}
        </>
    );
}
