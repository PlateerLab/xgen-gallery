import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { CustomersLibrary } from "@/components/customers-library";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, itemListLd } from "@/lib/structured-data";
import { getAllCases, PRODUCTS, INDUSTRIES, type ProductKey } from "@/lib/customers";

/**
 * 고객사례 라이브러리(/customers) — XGEN·Polar 등 제품을 실제 업무에 적용한
 * 사례를 하나의 풀로 모아 제품·산업 필터로 탐색한다. 개별 사례는 독립 URL을 갖는다.
 */
export const metadata = pageMetadata({
    title: "고객사례",
    description:
        "XGEN·AI Code Assistant 등 Plateer Labs의 Enterprise AI를 금융·커머스·공공·IT/제조 업무에 실제로 구축·운영한 고객사례를 제품·산업별로 정리했습니다.",
    path: "/customers",
});

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>;
}) {
    const cases = getAllCases();
    const featured = cases[0]; // 가장 최근 사례 — 키비주얼에 이미지 카드로 노출
    const { product } = await searchParams;
    const initialProduct: ProductKey | "all" =
        product && product in PRODUCTS ? (product as ProductKey) : "all";

    const ld = [
        breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "고객사례", path: "/customers" },
        ]),
        itemListLd(
            "Plateer Labs 고객사례",
            cases.map((c) => ({
                name: c.title,
                url: `/customers/case/${c.slug}`,
                description: c.summary,
            })),
        ),
    ];

    return (
        <>
            <SiteNav overlay />
            <JsonLd data={ld} />

            <section className="relative flex min-h-[56vh] items-center overflow-hidden border-b border-white/10 py-24 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div>
                        <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                            Applied AI · 고객 사례
                        </p>
                        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                            Enterprise AI는 실제 업무에서 검증됩니다
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                            XGEN과 AI Code Assistant를 금융, 커머스, 공공, IT·제조 등
                            다양한 산업 현장에 구축하고 운영한 사례를 소개합니다. 제품과
                            산업별로 원하는 사례를 찾아보세요.
                        </p>
                    </div>

                    {/* 키비주얼 — 가장 최근 대표 사례 1건을 이미지 카드로 비주얼라이징 */}
                    {featured && (
                        <div className="w-full">
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-white/50">
                                최근 사례
                            </p>
                            <Link
                                href={`/customers/case/${featured.slug}`}
                                className="group block overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm transition hover:border-white/30"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    {featured.cover ? (
                                        <Image
                                            src={featured.cover}
                                            alt={featured.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 520px"
                                            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a3f] to-[#123a6b]" />
                                    )}
                                    {/* 하단 가독성 그라디언트 */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050813] via-[#050813]/55 to-[#050813]/10" />

                                    {/* 상단 메타 배지 */}
                                    <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 text-[12.5px]">
                                        <span className="rounded-full bg-[#5eead4]/20 px-2.5 py-0.5 font-semibold text-[#5eead4] backdrop-blur-sm">
                                            {PRODUCTS[featured.products[0]].name}
                                        </span>
                                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-white/85 backdrop-blur-sm">
                                            {INDUSTRIES[featured.industry].ko}
                                        </span>
                                        <time
                                            dateTime={featured.published}
                                            className="rounded-full bg-black/25 px-2.5 py-0.5 text-white/70 backdrop-blur-sm"
                                        >
                                            {featured.published.slice(0, 7).replace("-", ".")}
                                        </time>
                                    </div>

                                    {/* 하단 타이틀·고객 */}
                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <h3 className="text-[18px] font-bold leading-snug text-white">
                                            {featured.title}
                                        </h3>
                                        <div className="mt-2.5 flex items-center gap-2 text-[13.5px]">
                                            <span className="font-semibold text-white/85">
                                                {featured.customer}
                                            </span>
                                            <span className="ml-auto inline-flex items-center gap-1 font-semibold text-[#5eead4]">
                                                사례 보기
                                                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <main className="mx-auto w-full max-w-6xl px-6 py-16">
                <CustomersLibrary cases={cases} initialProduct={initialProduct} />

                <p className="mt-8 text-[13.5px] leading-relaxed text-[var(--color-ink-subtle)]">
                    ※ 일부 사례는 업종·규모로 익명 표기하며, 공개 레퍼런스만 실명으로
                    소개합니다.
                </p>

                {/* 티어 연결 — 허브(한눈에) → 심층 사례 스토리(블로그) */}
                <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                            사례를 더 깊이 — 사례 스토리
                        </h2>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            과제·접근·성과를 자세히 풀어낸 심층 사례 스토리를 인사이트 블로그에서 읽어보세요.
                        </p>
                    </div>
                    <Link
                        href="/blog?cat=case"
                        className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        사례 스토리 보기
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                            우리 업무에도 적용할 수 있을까요
                        </h2>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            업무 특성에 맞는 Enterprise AI 적용 방안을 함께 검토해 드립니다.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2461d8]"
                    >
                        도입 문의
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </main>

            <SiteFooter />
        </>
    );
}
