import { notFound } from "next/navigation";
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
import { pageMetadata } from "@/lib/metadata";
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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    if (!isIndustry(domain)) {
        return pageMetadata({
            title: "고객사례",
            description: "산업별 XGEN·Polar 고객사례",
            path: "/customers",
        });
    }
    const d = INDUSTRIES[domain];
    const cases = getCasesByIndustry(domain);
    const hasCases = cases.length > 0;
    return pageMetadata({
        // 스니펫으로 쓰일 만큼 구체적으로 — 산업 blurb만 쓰면 40자 안팎이라
        // 검색결과에서 페이지를 구분할 정보가 부족했다. 사례 수·제품군을 덧붙인다.
        title: `${d.ko} 고객사례`,
        description: hasCases
            ? `${d.blurb} ${cases.length}건을 소개합니다. XGEN·AI Code Assistant를 ${d.ko} 현장 업무에 적용해 검증한 도입 배경·구축 범위·성과를 확인하세요.`
            : `${d.blurb}를 준비 중입니다. Plateer Labs는 ${d.ko} 업무 특성과 규제를 반영한 Enterprise AI를 연구하고 PoC로 실증합니다.`,
        path: `/customers/${domain}`,
        // 사례가 아직 없으면 색인 제외(빈 페이지가 랭킹되지 않게).
        ...(hasCases ? {} : { robots: { index: false, follow: true } }),
    });
}

export default async function CustomerDomainPage({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    if (!isIndustry(domain)) notFound();

    const d = INDUSTRIES[domain];
    const Icon = DOMAIN_ICON[domain];
    const cases = getCasesByIndustry(domain);

    const ld = [
        breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "고객사례", path: "/customers" },
            { name: `${d.ko} 고객사례`, path: `/customers/${domain}` },
        ]),
        ...(cases.length > 0
            ? [
                  itemListLd(
                      `${d.ko} 고객사례`,
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
                            Coming soon · 준비 중
                        </span>
                    )}
                    <div className="mt-6 flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                            <Icon className="h-6 w-6" />
                        </span>
                        <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                            Applied AI · 고객사례
                        </p>
                    </div>
                    <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {d.ko} 고객사례 <span className="text-white/50">{d.en}</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        {d.blurb}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/customers"
                            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-white/90"
                        >
                            전체 고객사례
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/contact?from=customers-case"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            도입 문의
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
                                href={`/customers/case/${c.slug}`}
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
                                    {c.title}
                                </h2>
                                <p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {c.summary}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#2461d8] transition group-hover:text-[#1b4fb0]">
                                    자세히 보기
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
