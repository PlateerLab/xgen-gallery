import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryLabel, getAllPosts } from "@/lib/blog";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 — Insight 미리보기. 최신 제품 소식을 대표 카드로 자동 노출하고, 그 뒤로 최근
 * Tech Note 글을 채운다. GS 인증은 품질·보안 섹션에서 다루므로 여기선 중복 제외.
 * (server component — 빌드 시 content/blog 프론트매터를 읽어 렌더)
 */
const EXCLUDE_SLUG = "gs-certification-grade1";

const COPY: Record<
    Locale,
    { headA: string; headB: string; read: string; latest: string; seeAll: string }
> = {
    ko: {
        headA: "연구와 현장에서 얻은",
        headB: "인사이트",
        read: "읽어보기",
        latest: "/ 최신 Tech Note",
        seeAll: "블로그 전체 보기",
    },
    en: {
        headA: "Insight from our research",
        headB: "and the field",
        read: "Read the post",
        latest: "/ Latest tech notes",
        seeAll: "See the whole blog",
    },
};

function fmt(date: string) {
    return date.replaceAll("-", ".");
}

export function HomeInsights({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    const all = getAllPosts(locale).filter((p) => p.slug !== EXCLUDE_SLUG);
    // 대표 카드 = 최신 제품 소식(없으면 최신 글).
    const pinned = all.find((p) => p.category === "제품 소식") ?? all[0];
    // 대표 아래에 노출할 최신 Tech Note.
    const techNotes = all
        .filter((p) => p.category === "Tech Note" && p.slug !== pinned?.slug)
        .slice(0, 3);
    if (!pinned && techNotes.length === 0) return null;

    return (
        <section className="border-t border-[var(--color-line)] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <div className="text-center">
                    <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                        / Insight
                    </p>
                    <h2 className="mt-3 mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
                        {t.headA}{" "}
                        <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                            {t.headB}
                        </span>
                    </h2>
                </div>

                {/* 고정: 제품 소식 — GS 인증 (상단 대표 카드) */}
                {pinned && (
                    <Link
                        href={localeHref(locale, `/blog/${pinned.slug}`)}
                        className="group mt-12 block overflow-hidden rounded-2xl border border-[#bcd0f5] bg-gradient-to-br from-[#eef4ff] to-white p-7 text-center transition hover:border-[#2f7bff] hover:shadow-[0_18px_44px_-20px_rgba(40,80,180,0.3)] md:p-9"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="rounded-full bg-[#2f7bff] px-2.5 py-1 text-[12px] font-bold text-white">
                                {categoryLabel(pinned.category, locale)}
                            </span>
                            <span className="font-mono text-[12px] text-[var(--color-ink-subtle)]">
                                {fmt(pinned.date)}
                            </span>
                        </div>
                        <h3 className="mt-3.5 mx-auto max-w-3xl text-2xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[28px]">
                            {pinned.title}
                        </h3>
                        <p className="mt-2.5 mx-auto max-w-3xl text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {pinned.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition group-hover:gap-2.5">
                            {t.read}
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>
                )}

                {/* 그 아래: 최신 Tech Note */}
                {techNotes.length > 0 && (
                    <>
                        <p className="mt-10 text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.latest}
                        </p>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {techNotes.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={localeHref(locale, `/blog/${p.slug}`)}
                                    className="group flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-ink)]"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="rounded-full border border-[var(--color-line)] bg-white px-2.5 py-1 font-mono text-[11.5px] text-[#2461d8]">
                                            {categoryLabel(p.category, locale)}
                                        </span>
                                        <span className="font-mono text-[12px] text-[var(--color-ink-subtle)]">
                                            {fmt(p.date)}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-[18px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.description}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-medium text-[var(--color-ink)] transition group-hover:gap-2">
                                        {t.read}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {/* 블로그 전체 보기 — 하단 우측 */}
                <div className="mt-10 flex justify-end">
                    <Link
                        href={localeHref(locale, "/blog")}
                        className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        {t.seeAll}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
