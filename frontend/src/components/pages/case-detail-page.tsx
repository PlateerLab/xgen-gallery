import { notFound } from "next/navigation";
import { localeHref } from "@/lib/locale-path";
import { CASE_STATUS_EN } from "@/lib/customers";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { JejuBankCaseBody } from "@/components/case-jeju-bank";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";
import {
    CASE_STUDIES,
    getCaseBySlug,
    getCasesByIndustry,
    PRODUCTS,
    INDUSTRIES,
    type CaseStudy,
} from "@/lib/customers";

/**
 * 개별 고객사례(/customers/case/[slug]) — SEO·GEO에서 실제로 랭킹·인용되는 단위.
 * answer-first 요약 + 과제/적용/성과 + 지표 수치 + Article JSON-LD로 구성한다.
 */

/**
 * 전용 레이아웃을 쓰는 사례. 공개 레퍼런스라 서사를 길게 실을 수 있는 사례만
 * 여기에 등록하고, 나머지는 아래 기본 템플릿으로 렌더한다. 메타데이터·JSON-LD·
 * 사이트맵은 어느 쪽이든 lib/customers.ts 하나에서 나온다.
 */
const CUSTOM_BODIES: Record<
    string,
    (props: { locale: Locale }) => React.ReactElement
> = {
    "jeju-bank-genai-platform": JejuBankCaseBody,
};

/** Article JSON-LD — 사례를 인용 가능한 콘텐츠 단위로 노출. */
function caseArticleLd(c: CaseStudy) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": absoluteUrl(`/customers/case/${c.slug}#article`),
        headline: c.title,
        description: c.summary,
        url: absoluteUrl(`/customers/case/${c.slug}`),
        datePublished: c.published,
        inLanguage: "ko",
        about: c.products.map((p) => PRODUCTS[p].name),
        articleSection: INDUSTRIES[c.industry].ko,
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        mainEntityOfPage: absoluteUrl(`/customers/case/${c.slug}`),
    };
}


/** 사례 상세 화면 문구 — 사례 본문은 lib/customers.ts 의 *En 필드에서 온다. */
const COPY: Record<
    Locale,
    {
        breadcrumbAria: string;
        breadcrumbCases: string;
        anon: string;
        scope: string;
        challenge: string;
        solution: string;
        related: (industry: string) => string;
        allCases: string;
        contact: string;
    }
> = {
    ko: {
        breadcrumbAria: "브레드크럼",
        breadcrumbCases: "고객사례",
        anon: " (익명)",
        scope: "제공 범위",
        challenge: "과제",
        solution: "적용",
        related: (industry) => `${industry} 관련 사례`,
        allCases: "전체 고객사례",
        contact: "도입 문의",
    },
    en: {
        breadcrumbAria: "Breadcrumb",
        breadcrumbCases: "Customer cases",
        anon: " (anonymized)",
        scope: "Scope delivered",
        challenge: "The problem",
        solution: "What we did",
        related: (industry) => `More in ${industry}`,
        allCases: "All customer cases",
        contact: "Get in touch",
    },
};

export async function CaseDetailPageContent({
    params,
    locale,
}: {
    params: Promise<{ slug: string }>;
    locale: Locale;
}) {
    const t = COPY[locale];
    const en = locale === "en";
    const home = en ? "/en" : "/";
    const { slug } = await params;
    const c = getCaseBySlug(slug);
    if (!c) notFound();

    const industry = INDUSTRIES[c.industry];
    const related = getCasesByIndustry(c.industry)
        .filter((r) => r.slug !== c.slug)
        .slice(0, 2);

    const ld = [
        caseArticleLd(c),
        breadcrumbLd([
            { name: "Home", path: home },
            { name: t.breadcrumbCases, path: localeHref(locale, "/customers") },
            {
                name: `${en ? industry.en : industry.ko} ${t.breadcrumbCases}`,
                path: localeHref(locale, `/customers/${c.industry}`),
            },
            { name: c.title, path: `/customers/case/${c.slug}` },
        ]),
    ];

    // 전용 레이아웃(제주은행 심층 서사)은 한/영 모두 갖췄으므로 로케일과 무관하게 쓴다.
    const CustomBody = CUSTOM_BODIES[c.slug];
    if (CustomBody) {
        return (
            <>
                <SiteNav />
                <JsonLd data={ld} />
                <CustomBody locale={locale} />
                <SiteFooter />
            </>
        );
    }

    return (
        <>
            <SiteNav />
            <JsonLd data={ld} />

            <main className="mx-auto w-full max-w-3xl px-6 pt-28 pb-20">
                {/* 브레드크럼 */}
                <nav
                    aria-label={t.breadcrumbAria}
                    className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--color-ink-subtle)]"
                >
                    <Link href={localeHref(locale, "/customers")} className="hover:text-[#2461d8]">
                        {t.breadcrumbCases}
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/customers/${c.industry}`}
                        className="hover:text-[#2461d8]"
                    >
                        {en ? industry.en : industry.ko}
                    </Link>
                </nav>

                {/* 배지 */}
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    {c.products.map((p) => (
                        <span
                            key={p}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12.5px] font-bold"
                            style={{
                                borderColor: `${PRODUCTS[p].accent}33`,
                                backgroundColor: `${PRODUCTS[p].accent}12`,
                                color: PRODUCTS[p].accent,
                            }}
                        >
                            {PRODUCTS[p].name}
                        </span>
                    ))}
                    <span className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-2.5 py-0.5 text-[12.5px] font-semibold text-[var(--color-ink-muted)]">
                        {en ? industry.en : industry.ko}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf8f1] px-2.5 py-0.5 text-[12.5px] font-bold text-[#1f9d57]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1f9d57]" />
                        {en ? CASE_STATUS_EN[c.status] : c.status}
                    </span>
                </div>

                {/* 제목 + answer-first 요약 */}
                <h1 className="mt-4 text-[30px] font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[38px]">
                    {(en && c.titleEn) || c.title}
                </h1>
                <p className="mt-4 text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
                    {(en && c.summaryEn) || c.summary}
                </p>
                <p className="mt-3 text-[14px] text-[var(--color-ink-subtle)]">
                    {(en && c.customerEn) || c.customer}
                    {c.customerAnonymous && t.anon} ·{" "}
                    <time dateTime={c.published}>
                        {c.published.replaceAll("-", ".")}
                    </time>
                </p>

                {/* 제공 범위(사실) — 실측 지표가 있으면 수치도 함께 */}
                <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
                    <p className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                        {t.scope}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {((en && c.highlightsEn) || c.highlights).map((h) => (
                            <li
                                key={h}
                                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[14px] font-semibold text-[var(--color-ink-muted)]"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff]" />
                                {h}
                            </li>
                        ))}
                    </ul>
                    {c.results && c.results.length > 0 && (
                        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-[var(--color-line)] pt-5 sm:grid-cols-3">
                            {c.results.map((r) => (
                                <div key={r.label}>
                                    <dd className="font-mono text-[26px] font-bold tracking-tight text-[#2461d8]">
                                        {r.value}
                                    </dd>
                                    <dt className="mt-0.5 text-[13px] text-[var(--color-ink-muted)]">
                                        {r.label}
                                    </dt>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>

                {/* 과제 / 적용 */}
                <section className="mt-10 space-y-8">
                    <div>
                        <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.challenge}
                        </h2>
                        <p className="mt-3 text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {(en && c.challengeEn) || c.challenge}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.solution}
                        </h2>
                        <p className="mt-3 text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {(en && c.solutionEn) || c.solution}
                        </p>
                    </div>
                </section>

                {/* 고객 인용 */}
                {c.quote && (
                    <blockquote className="mt-10 rounded-2xl border-l-4 border-[#2f7bff] bg-[var(--color-surface-alt)] p-6">
                        <Quote className="h-6 w-6 text-[#bcd0f5]" />
                        <p className="mt-3 text-[17px] font-medium leading-relaxed text-[var(--color-ink)]">
                            {c.quote.text}
                        </p>
                        {(c.quote.author || c.quote.role) && (
                            <footer className="mt-3 text-[14px] text-[var(--color-ink-subtle)]">
                                {c.quote.author}
                                {c.quote.role && ` · ${c.quote.role}`}
                            </footer>
                        )}
                    </blockquote>
                )}

                {/* 관련 사례 */}
                {related.length > 0 && (
                    <section className="mt-14 border-t border-[var(--color-line)] pt-8">
                        <h2 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.related(en ? industry.en : industry.ko)}
                        </h2>
                        <ul className="mt-4 space-y-2">
                            {related.map((r) => (
                                <li key={r.slug}>
                                    <Link
                                        href={localeHref(locale, `/customers/case/${r.slug}`)}
                                        className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[#bcd0f5]"
                                    >
                                        <span className="min-w-0 text-[15.5px] font-semibold text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                            {(en && r.titleEn) || r.title}
                                        </span>
                                        <ArrowRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#2461d8]" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* 하단 내비 */}
                <div className="mt-14 flex items-center justify-between border-t border-[var(--color-line)] pt-6">
                    <Link
                        href={localeHref(locale, "/customers")}
                        className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-ink-muted)] transition hover:text-[#2461d8]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t.allCases}
                    </Link>
                    <Link
                        href={localeHref(locale, "/contact")}
                        className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        {t.contact}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </main>

            <SiteFooter />
        </>
    );
}
