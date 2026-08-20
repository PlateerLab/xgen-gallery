import Link from "next/link";
import { localeHref, localePath } from "@/lib/locale-path";
import { categoryLabel } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { Thumb } from "@/components/blog-list";
import { getAllPosts } from "@/lib/blog";
import { SERIES, seriesCopy, seriesPosts } from "@/lib/series";
import { breadcrumbLd, itemListLd } from "@/lib/structured-data";

function fmtDate(d: string) {
    return d.replaceAll("-", ".");
}

const COPY: Record<Locale, { count: (n: number) => string }> = {
    ko: { count: (n) => `아티클 ${n}개` },
    en: { count: (n) => `${n} ${n === 1 ? "article" : "articles"}` },
};

export async function SeriesPageContent({
    params,
    locale,
}: {
    params: Promise<{ key: string }>;
    locale: Locale;
}) {
    const { key } = await params;
    const def = SERIES.find((s) => s.key === key);
    if (!def) notFound();
    const en = locale === "en";
    const c = seriesCopy(def, en);
    const posts = seriesPosts(def, getAllPosts(locale));

    return (
        <>
            <SiteNav />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: localePath(locale, "/") },
                        { name: "Blog", path: localePath(locale, "/blog") },
                        {
                            name: c.title,
                            path: localePath(locale, `/blog/series/${def.key}`),
                        },
                    ]),
                    itemListLd(
                        c.title,
                        posts.map((p) => ({
                            name: p.title,
                            url: localePath(locale, `/blog/${p.slug}`),
                            description: p.description,
                        })),
                    ),
                ]}
            />

            {/* 헤더 */}
            <section className="border-b border-[var(--color-line)] bg-white">
                <div className="mx-auto w-full max-w-4xl px-6 pb-12 pt-8 md:pb-16">
                    <Link
                        href={localeHref(locale, "/blog")}
                        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Insight
                    </Link>
                    <div className="mt-6 grid gap-8 md:grid-cols-[1fr_280px] md:items-center">
                        <div>
                            <div className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.18em] text-[#4f46e5]">
                                <Layers className="h-4 w-4" />
                                Series
                            </div>
                            <h1 className="mt-3 text-[30px] font-bold leading-[1.15] tracking-tight text-[var(--color-ink)] md:text-[42px]">
                                {c.title}
                            </h1>
                            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                {c.description}
                            </p>
                            <span className="mt-5 inline-flex items-center rounded-full bg-[var(--color-surface-alt)] px-3.5 py-1.5 text-[13.5px] font-semibold text-[var(--color-ink-muted)]">
                                {COPY[locale].count(posts.length)}
                            </span>
                        </div>
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--color-line)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={def.cover}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 아티클 목록 */}
            <main className="mx-auto w-full max-w-4xl px-6 py-14">
                <ol className="space-y-5">
                    {posts.map((p, i) => (
                        <li key={p.slug}>
                            <Link
                                href={localeHref(locale, `/blog/${p.slug}`)}
                                className="group flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-4 transition hover:border-[#bcd0f5] hover:shadow-[0_18px_44px_-24px_rgba(20,40,80,0.28)] sm:gap-5"
                            >
                                <span className="flex h-9 w-9 flex-none items-center justify-center self-start rounded-full bg-[#eef2ff] text-[15px] font-bold text-[#4f46e5]">
                                    {i + 1}
                                </span>
                                <div className="relative hidden aspect-[16/9] w-[168px] flex-none overflow-hidden rounded-xl sm:block">
                                    <Thumb
                                        post={p}
                                        className="transition duration-500 group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col justify-center">
                                    <div className="flex items-center gap-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                                        <span className="rounded-full bg-[#2f7bff]/10 px-2 py-0.5 font-semibold text-[#2461d8]">
                                            {categoryLabel(p.category, locale)}
                                        </span>
                                        <time dateTime={p.date}>{fmtDate(p.date)}</time>
                                    </div>
                                    <h2 className="mt-2 line-clamp-2 text-[18px] font-bold leading-snug tracking-tight text-[var(--color-ink)] transition group-hover:text-[#2461d8] md:text-[20px]">
                                        {p.title}
                                    </h2>
                                    <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.description}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
            </main>
            <SiteFooter />
        </>
    );
}
