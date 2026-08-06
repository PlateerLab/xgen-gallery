import { notFound } from "next/navigation";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import {
    ShoppingCart,
    Banknote,
    Landmark,
    Server,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd, itemListLd } from "@/lib/structured-data";
import {
    INDUSTRIES,
    PRODUCTS,
    getCasesByIndustry,
    type IndustryKey,
} from "@/lib/customers";

/**
 * 산업별 고객사례 페이지(/customers/[domain]) — 커머스/금융/공공/IT서비스.
 * 사례 데이터는 customers.ts(단일 소스)에서 산업으로 필터해 노출한다.
 * 사례가 있으면 index, 아직 없으면 "준비 중" + noindex로 유지한다.
 */
const DOMAIN_ICON: Record<IndustryKey, LucideIcon> = {
    commerce: ShoppingCart,
    finance: Banknote,
    public: Landmark,
    "it-services": Server,
};

export function generateStaticParams() {
    return (Object.keys(INDUSTRIES) as IndustryKey[]).map((domain) => ({ domain }));
}

function isIndustry(v: string): v is IndustryKey {
    return v in INDUSTRIES;
}


/** 산업별 사례 페이지 문구. */
const COPY: Record<Locale, {
    comingSoon: string; eyebrow: string; suffix: string;
    allCases: string; contact: string; more: string;
}> = {
    ko: {
        comingSoon: "Coming soon · 준비 중",
        eyebrow: "Applied AI · 고객사례",
        suffix: "고객사례",
        allCases: "전체 고객사례",
        contact: "도입 문의",
        more: "자세히 보기",
    },
    en: {
        comingSoon: "Coming soon",
        eyebrow: "Applied AI · Customer cases",
        suffix: "customer cases",
        allCases: "All customer cases",
        contact: "Get in touch",
        more: "Read more",
    },
};

export async function IndustryPageContent({
    params,
    locale,
}: {
    params: Promise<{ domain: string }>;
    locale: Locale;
}) {
    const t = COPY[locale];
    const en = locale === "en";
    const home = en ? "/en" : "/";
    const { domain } = await params;
    if (!isIndustry(domain)) notFound();

    const d = INDUSTRIES[domain];
    const Icon = DOMAIN_ICON[domain];
    const cases = getCasesByIndustry(domain);

    const ld = [
        breadcrumbLd([
            { name: "Home", path: home },
            { name: t.suffix, path: localeHref(locale, "/customers") },
            {
                name: `${en ? d.en : d.ko} ${t.suffix}`,
                path: localeHref(locale, `/customers/${domain}`),
            },
        ]),
        ...(cases.length > 0
            ? [
                  itemListLd(
                      `${en ? d.en : d.ko} ${t.suffix}`,
                      cases.map((c) => ({
                          name: c.title,
                          url: `/customers/case/${c.slug}`,
                          description: c.summary,
                      })),
                  ),
              ]
            : []),
    ];

    return (
        <>
            <SiteNav overlay />
            <JsonLd data={ld} />

            <section className="relative flex min-h-[56vh] items-center overflow-hidden border-b border-white/10 py-24 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    {cases.length === 0 && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            {t.comingSoon}
                        </span>
                    )}
                    <div className="mt-6 flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                            <Icon className="h-6 w-6" />
                        </span>
                        <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                            {t.eyebrow}
                        </p>
                    </div>
                    <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {en ? (
                            <>{d.en} customer cases</>
                        ) : (
                            <>
                                {d.ko} 고객사례{" "}
                                <span className="text-white/50">{d.en}</span>
                            </>
                        )}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        {(en && d.blurbEn) || d.blurb}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={localeHref(locale, "/customers")}
                            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-white/90"
                        >
                            {t.allCases}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href={localeHref(locale, "/contact")}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            {t.contact}
                        </Link>
                    </div>
                </div>
            </section>

            {cases.length > 0 && (
                <main className="mx-auto w-full max-w-7xl px-6 py-16">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cases.map((c) => (
                            <Link
                                key={c.slug}
                                href={localeHref(locale, `/customers/case/${c.slug}`)}
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                            >
                                <div className="flex flex-wrap items-center gap-1.5">
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
                                </div>
                                <h2 className="mt-3 text-[18px] font-bold leading-snug tracking-tight text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                    {(en && c.titleEn) || c.title}
                                </h2>
                                <p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {(en && c.summaryEn) || c.summary}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#2461d8] transition group-hover:text-[#1b4fb0]">
                                    {t.more}
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </main>
            )}

            <SiteFooter />
        </>
    );
}
