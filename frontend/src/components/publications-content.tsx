"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Award } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PublicationsIllustration } from "@/components/publications-illustration";
import { PUBLICATIONS, PUB_MEMBERS, type Publication } from "@/lib/publications";

/**
 * Publications 섹션 콘텐츠 — /research#publications 에 주입된다.
 * 섹션 제목("Publications")은 GroupPage의 Section이 렌더하므로 여기서는 본문만 반환한다.
 * 구성원 논문을 카테고리(코어 연구 / 기타·응용 ML)로 나눠 노출하고, 각 항목은
 * 멤버 프로필(/members/<login>)로 연결한다.
 */
const GRADE_STYLE: Record<string, string> = {
    SCIE: "border-[#bfe0d6] bg-[#effaf6] text-[#0b7d62]",
    SCOPUS: "border-[#cdd9f7] bg-[#eef3ff] text-[#2461d8]",
    KCI: "border-[var(--color-line)] bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]",
};

function PublicationRow({ p }: { p: Publication }) {
    return (
        <li className="py-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    {/* 메타 뱃지 */}
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-2.5 py-0.5 text-[12.5px] font-semibold text-[var(--color-ink-muted)]">
                            {p.type}
                        </span>
                        {p.grade && (
                            <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12.5px] font-bold ${GRADE_STYLE[p.grade]}`}
                            >
                                {p.grade}
                            </span>
                        )}
                        {p.award && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#f4d9a6] bg-[#fef6e7] px-2.5 py-0.5 text-[12.5px] font-bold text-[#b45309]">
                                <Award className="h-3 w-3" />
                                {p.award}
                            </span>
                        )}
                        <span className="font-mono text-[12.5px] text-[var(--color-ink-subtle)]">
                            {p.year}
                        </span>
                    </div>

                    {/* 제목 */}
                    {p.url ? (
                        <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[16.5px] font-bold leading-snug tracking-tight text-[var(--color-ink)] transition hover:text-[#2461d8]"
                        >
                            {p.title}
                        </a>
                    ) : (
                        <p className="text-[16.5px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                            {p.title}
                        </p>
                    )}

                    {/* 저자 · 게재처 */}
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                        {p.authors} · <span className="text-[var(--color-ink-subtle)]">{p.venue}</span>
                    </p>

                    {/* 구성원 프로필 링크 */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        {p.memberLogins.map((login) => (
                            <Link
                                key={login}
                                href={`/members/${login}`}
                                className="inline-flex items-center gap-1 rounded-full border border-[#cfe0ff] bg-[#f3f7ff] px-2.5 py-0.5 text-[13px] font-semibold text-[#2461d8] transition hover:border-[#2f7bff]"
                            >
                                {PUB_MEMBERS[login] ?? login}
                            </Link>
                        ))}
                    </div>
                </div>

                {p.url && (
                    <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="원문 보기"
                        className="mt-1 shrink-0 text-[var(--color-ink-subtle)] transition hover:text-[#2461d8]"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                )}
            </div>
        </li>
    );
}

function CategoryBlock({
    sub,
    items,
}: {
    sub: string;
    items: Publication[];
}) {
    if (items.length === 0) return null;
    const sorted = [...items].sort((a, b) => b.year - a.year);
    return (
        <div>
            <p className="mt-5 text-center text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                {sub}
            </p>
            <ul className="mt-4 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white px-6">
                {sorted.map((p, i) => (
                    <PublicationRow key={`${p.title}-${i}`} p={p} />
                ))}
            </ul>
        </div>
    );
}

export function PublicationsContent() {
    const core = PUBLICATIONS.filter((p) => p.category === "core");
    const applied = PUBLICATIONS.filter((p) => p.category === "applied");
    const books = PUBLICATIONS.filter((p) => p.category === "book");

    const TABS = [
        {
            key: "core" as const,
            label: "AI · 머신러닝 연구",
            sub: "Enterprise/Agentic AI와 맞닿은 NLP·딥러닝·그래프·추천·분산학습 연구",
            items: core,
        },
        {
            key: "applied" as const,
            label: "기타 · 머신러닝 응용",
            sub: "데이터사이언스 기반의 응용 머신러닝 연구(금융·HR·헬스 등)",
            items: applied,
        },
        {
            key: "book" as const,
            label: "저서 · 감수",
            sub: "구성원이 저술·감수·번역에 참여한 도서",
            items: books,
        },
    ].filter((t) => t.items.length > 0);
    const [active, setActive] = useState<"core" | "applied" | "book">("core");

    const scholarLd = PUBLICATIONS.map((p) =>
        p.category === "book"
            ? {
                  "@context": "https://schema.org",
                  "@type": "Book",
                  name: p.title,
                  author: p.memberLogins.map((l) => ({
                      "@type": "Person",
                      name: PUB_MEMBERS[l] ?? l,
                  })),
                  datePublished: String(p.year),
                  publisher: { "@type": "Organization", name: p.venue },
                  ...(p.url ? { url: p.url } : {}),
                  inLanguage: "ko",
              }
            : {
                  "@context": "https://schema.org",
                  "@type": "ScholarlyArticle",
                  headline: p.title,
                  author: p.authors
                      .split(", ")
                      .map((name) => ({ "@type": "Person", name })),
                  datePublished: String(p.year),
                  publisher: { "@type": "Organization", name: p.venue },
                  ...(p.url ? { url: p.url } : {}),
                  inLanguage: /[가-힣]/.test(p.title) ? "ko" : "en",
              },
    );

    return (
        <div className="space-y-10">
            <JsonLd data={scholarLd} />

            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
                <div className="min-w-0 flex-1 order-2 text-center md:order-1">
                    <h4 className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                        구성원들의 연구 성과
                    </h4>
                    <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                        Plateer Labs 구성원들이 학회·저널에 발표한 논문입니다. 자연어처리,
                        딥러닝, 그래프·추천, 분산학습 등 Enterprise AI와 맞닿은 연구가
                        제품의 기술적 토대가 됩니다
                    </p>
                </div>
                <PublicationsIllustration className="order-1 w-56 shrink-0 md:order-2 md:w-64" />
            </div>

            {/* 카테고리 인덱스 탭 */}
            <div
                role="tablist"
                aria-label="연구 카테고리"
                className="flex flex-wrap justify-center gap-2 border-b border-[var(--color-line)]"
            >
                {TABS.map((t) => {
                    const isActive = active === t.key;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActive(t.key)}
                            className={`-mb-px inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-[15px] font-semibold tracking-tight transition ${
                                isActive
                                    ? "border-[#2f7bff] text-[var(--color-ink)]"
                                    : "border-transparent text-[var(--color-ink-subtle)] hover:text-[var(--color-ink-muted)]"
                            }`}
                        >
                            {t.label}
                            <span
                                className={`inline-flex min-w-[1.5rem] justify-center rounded-full px-1.5 py-0.5 font-mono text-[12px] ${
                                    isActive
                                        ? "bg-[#eef3ff] text-[#2461d8]"
                                        : "bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]"
                                }`}
                            >
                                {t.items.length}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 두 카테고리는 모두 렌더(SEO)하되, 비활성 탭은 hidden */}
            {TABS.map((t) => (
                <div key={t.key} hidden={active !== t.key}>
                    <CategoryBlock sub={t.sub} items={t.items} />
                </div>
            ))}
        </div>
    );
}
