"use client";

import { useEffect, useState } from "react";
import { categoryLabel } from "@/lib/blog-categories";
import { localeHref } from "@/lib/locale-path";
import { useI18n } from "@/components/i18n-provider";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { Thumb, fmtDate } from "@/components/blog-list";
import { ViewCount } from "@/components/view-count";

/**
 * 인사이트 상단 키비주얼 — 최신/선정 글을 캐러셀로 노출한다(토스 메인 스타일).
 * 편집자가 Decap에서 `featured: true`로 고른 글을 최신순으로 보여주고,
 * 아무 것도 고르지 않았으면 최신 글로 자동 폴백한다(page.tsx에서 선별해 전달).
 */
export function FeaturedHero({ posts }: { posts: PostMeta[] }) {
    const { locale } = useI18n();
    const en = locale === "en";
    const [idx, setIdx] = useState(0);
    const total = posts.length;

    // 자동 넘김(7초). 조작하면 idx가 바뀌며 타이머가 리셋된다.
    useEffect(() => {
        if (total <= 1) return;
        const t = setInterval(() => setIdx((i) => (i + 1) % total), 7000);
        return () => clearInterval(t);
    }, [total, idx]);

    if (total === 0) return null;
    const cur = Math.min(idx, total - 1);
    const post = posts[cur];
    const go = (n: number) => setIdx((n + total) % total);

    const arrowCls =
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]";

    return (
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* 좌: 텍스트 */}
            <div className="order-2 md:order-1">
                <Link href={localeHref(locale, `/blog/${post.slug}`)} className="group block">
                    <div className="flex items-center gap-2 text-[13.5px] text-[var(--color-ink-subtle)]">
                        <span className="rounded-full bg-[#2f7bff]/10 px-2.5 py-0.5 font-semibold text-[#2461d8]">
                            {categoryLabel(post.category, locale)}
                        </span>
                        <time dateTime={post.date}>{fmtDate(post.date)}</time>
                        <ViewCount slug={post.slug} readOnly compact />
                    </div>
                    <h2 className="mt-4 text-[28px] font-bold leading-[1.14] tracking-tight text-[var(--color-ink)] transition group-hover:text-[#38bdf8] md:text-[42px]">
                        {(en && post.titleEn) || post.title}
                    </h2>
                    <p className="mt-4 line-clamp-2 max-w-lg text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                        {(en && post.descriptionEn) || post.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8]">
                        {en ? "Read the post" : "읽어보기"}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                </Link>

                {/* 캐러셀 컨트롤 */}
                {total > 1 && (
                    <div className="mt-8 flex items-center gap-3">
                        <button
                            type="button"
                            aria-label={en ? "Previous post" : "이전 글"}
                            onClick={() => go(cur - 1)}
                            className={arrowCls}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label={en ? "Next post" : "다음 글"}
                            onClick={() => go(cur + 1)}
                            className={arrowCls}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="ml-1 flex items-center gap-1.5">
                            {posts.map((p, i) => (
                                <button
                                    key={p.slug}
                                    type="button"
                                    aria-label={
                                        en ? `Post ${i + 1}` : `${i + 1}번째 글`
                                    }
                                    onClick={() => go(i)}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all",
                                        i === cur
                                            ? "w-6 bg-[var(--color-ink)]"
                                            : "w-1.5 bg-[var(--color-line-strong)] hover:bg-[var(--color-ink-subtle)]",
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 우: 커버 */}
            <Link
                href={localeHref(locale, `/blog/${post.slug}`)}
                className="group order-1 block md:order-2"
            >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <Thumb
                        post={post}
                        className="transition duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            </Link>
        </div>
    );
}
