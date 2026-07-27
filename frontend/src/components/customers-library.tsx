"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ShoppingCart,
    Banknote,
    Landmark,
    Server,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import {
    PRODUCTS,
    INDUSTRIES,
    CASE_LINKS_ENABLED,
    type CaseStudy,
    type ProductKey,
    type IndustryKey,
} from "@/lib/customers";

/**
 * 고객사례 라이브러리 — LG CNS 고객 스토리형 레이아웃(대표 사례 스포트라이트 + 필터 +
 * 가로형 리스트)을 연구소 룩앤필(브랜드 블루 그라디언트 썸네일)로 재구성.
 * 리스트의 모든 행은 항상 DOM에 렌더하고 필터는 CSS(hidden)로만 토글한다 →
 * 크롤러/AI가 전체 사례를 초기 HTML에서 읽을 수 있어 SEO·GEO에 안전하다.
 */
const INDUSTRY_ICON: Record<IndustryKey, LucideIcon> = {
    commerce: ShoppingCart,
    finance: Banknote,
    public: Landmark,
    "it-services": Server,
};

/** 사진 대체 — 브랜드 딥블루 그라디언트 썸네일(산업 아이콘 워터마크 + 고객 뱃지). */
function Thumb({
    c,
    className,
    iconSize,
    children,
}: {
    c: CaseStudy;
    className?: string;
    iconSize: string;
    children?: React.ReactNode;
}) {
    const Icon = INDUSTRY_ICON[c.industry];
    return (
        <div
            className={`relative flex flex-col justify-end overflow-hidden rounded-2xl text-white ${className ?? ""}`}
        >
            <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,#255ad0_0%,#173a86_45%,#0b1224_100%)]"
            />
            <Icon
                aria-hidden
                className={`absolute -right-5 -top-5 text-white/[0.08] ${iconSize}`}
            />
            {/* 고객 뱃지 */}
            <span className="absolute right-4 top-4 inline-flex items-center rounded-md bg-white/15 px-2.5 py-1 text-[12px] font-semibold backdrop-blur-sm">
                {c.customer}
                {c.customerAnonymous && (
                    <span className="ml-1 text-white/55">익명</span>
                )}
            </span>
            {children && <div className="relative">{children}</div>}
        </div>
    );
}

/** 해시태그(산업 + 대표 제품) — LG CNS 태그 스타일. */
function HashTags({ c }: { c: CaseStudy }) {
    const tags = [INDUSTRIES[c.industry].ko, PRODUCTS[c.products[0]].name];
    return (
        <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
                <span
                    key={t}
                    className="rounded-md bg-[var(--color-surface-alt)] px-2.5 py-1 text-[12.5px] font-medium text-[var(--color-ink-subtle)]"
                >
                    # {t}
                </span>
            ))}
        </div>
    );
}

function StatusBadge({ c }: { c: CaseStudy }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#ecf8f1] px-2.5 py-0.5 text-[12px] font-bold text-[#1f9d57]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f9d57]" />
            {c.status}
        </span>
    );
}

/** 리스트 행 — 좌측 그라디언트 썸네일 + 우측 제목·설명·태그. */
function CaseRow({ c }: { c: CaseStudy }) {
    const inner = (
        <>
            <Thumb c={c} iconSize="h-28 w-28" className="min-h-[172px] p-5" />
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                    {c.products.map((p) => (
                        <span
                            key={p}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-bold"
                            style={{
                                borderColor: `${PRODUCTS[p].accent}33`,
                                backgroundColor: `${PRODUCTS[p].accent}12`,
                                color: PRODUCTS[p].accent,
                            }}
                        >
                            {PRODUCTS[p].name}
                        </span>
                    ))}
                    <StatusBadge c={c} />
                </div>
                <h3
                    className={`mt-2.5 text-[20px] font-bold leading-snug tracking-tight text-[var(--color-ink)] transition ${
                        CASE_LINKS_ENABLED ? "group-hover:text-[#2461d8]" : ""
                    }`}
                >
                    {c.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    {c.summary}
                </p>
                <div className="mt-3.5 flex items-center justify-between gap-3">
                    <HashTags c={c} />
                    {/* 상세 링크 비활성 시 '자세히 보기' 어포던스는 숨긴다(오해 방지) */}
                    {CASE_LINKS_ENABLED && (
                        <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                            자세히 보기
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    )}
                </div>
            </div>
        </>
    );

    const cls =
        "group grid grid-cols-1 items-center gap-6 py-8 sm:grid-cols-[288px_1fr]";

    // 검증 전에는 상세로 이동하지 않도록 링크를 비활성화(클릭 무반응).
    if (!CASE_LINKS_ENABLED) {
        return <div className={`${cls} cursor-default`}>{inner}</div>;
    }
    return (
        <Link href={`/customers/case/${c.slug}`} className={cls}>
            {inner}
        </Link>
    );
}

function FilterChip({
    active,
    onClick,
    label,
    count,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    count?: number;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition ${
                active
                    ? "border-[#2f7bff] bg-[#2f7bff] text-white"
                    : "border-[var(--color-line)] bg-white text-[var(--color-ink-muted)] hover:border-[#bcd0f5]"
            }`}
        >
            {label}
            {typeof count === "number" && (
                <span
                    className={`font-mono text-[12px] ${active ? "text-white/80" : "text-[var(--color-ink-subtle)]"}`}
                >
                    {count}
                </span>
            )}
        </button>
    );
}

export function CustomersLibrary({
    cases,
    initialProduct = "all",
}: {
    cases: CaseStudy[];
    /** URL 쿼리로 넘어온 초기 제품 필터(예: /customers?product=code-assistant). */
    initialProduct?: ProductKey | "all";
}) {
    const [product, setProduct] = useState<ProductKey | "all">(initialProduct);
    const [industry, setIndustry] = useState<IndustryKey | "all">("all");
    // 산업 필터는 사례 데이터가 충분히 쌓일 때까지 숨긴다(true로 바꾸면 다시 노출).
    // industry는 "all"로 고정되어 모든 사례가 그대로 보인다.
    const SHOW_INDUSTRY_FILTER = false;


    const productKeys = useMemo(
        () =>
            (Object.keys(PRODUCTS) as ProductKey[]).filter((k) =>
                cases.some((c) => c.products.includes(k)),
            ),
        [cases],
    );
    const industryKeys = useMemo(
        () =>
            (Object.keys(INDUSTRIES) as IndustryKey[]).filter((k) =>
                cases.some((c) => c.industry === k),
            ),
        [cases],
    );

    const matches = (c: CaseStudy) =>
        (product === "all" || c.products.includes(product)) &&
        (industry === "all" || c.industry === industry);

    const visibleCount = cases.filter(matches).length;

    return (
        <div>
            {/* 리드 문구 */}
            <div className="text-center">
                <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[32px] md:leading-snug">
                    XGEN·AI Code Assistant로 업무를 혁신한
                    <br className="hidden sm:block" /> 고객의 이야기를 살펴보세요
                </h2>
            </div>

            {/* 필터 */}
            <div className="mt-10 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[13px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                        제품
                    </span>
                    <FilterChip
                        active={product === "all"}
                        onClick={() => setProduct("all")}
                        label="전체"
                        count={cases.length}
                    />
                    {productKeys.map((k) => (
                        <FilterChip
                            key={k}
                            active={product === k}
                            onClick={() => setProduct(k)}
                            label={PRODUCTS[k].name}
                            count={cases.filter((c) => c.products.includes(k)).length}
                        />
                    ))}
                </div>
                {SHOW_INDUSTRY_FILTER && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-[13px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                            산업
                        </span>
                        <FilterChip
                            active={industry === "all"}
                            onClick={() => setIndustry("all")}
                            label="전체"
                            count={cases.length}
                        />
                        {industryKeys.map((k) => (
                            <FilterChip
                                key={k}
                                active={industry === k}
                                onClick={() => setIndustry(k)}
                                label={INDUSTRIES[k].ko}
                                count={cases.filter((c) => c.industry === k).length}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 건수 */}
            <p
                className="mt-8 border-b border-[var(--color-line)] pb-4 text-[15px] font-semibold text-[var(--color-ink)]"
                aria-live="polite"
            >
                총 <span className="text-[#2461d8]">{visibleCount}</span>건
            </p>

            {/* 리스트 — 모든 행 렌더, 비매칭은 hidden(SEO) */}
            <div className="divide-y divide-[var(--color-line)]">
                {cases.map((c) => (
                    <div key={c.slug} hidden={!matches(c)}>
                        <CaseRow c={c} />
                    </div>
                ))}
            </div>

            {visibleCount === 0 && (
                <p className="rounded-xl border border-dashed border-[var(--color-line)] bg-[var(--color-surface-alt)] px-6 py-8 text-center text-[15px] text-[var(--color-ink-muted)]">
                    선택한 조건에 맞는 사례가 아직 없습니다. 다른 필터를 선택해 보세요
                </p>
            )}
        </div>
    );
}
