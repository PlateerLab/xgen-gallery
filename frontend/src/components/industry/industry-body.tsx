import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import { Rise } from "@/components/home-v2/journey-motion";
import { INDUSTRY_STORIES } from "@/lib/industry-stories";
import {
    CASE_STATUS_EN,
    INDUSTRIES,
    PRODUCTS,
    caseLinkEnabled,
    type CaseStudy,
    type IndustryKey,
} from "@/lib/customers";

/**
 * 산업별 페이지 본문 — 레퍼런스가 적은 단계라 카드 그리드 대신
 * 산업 맥락 → 업무 과제 → 적용 방식 → 사례 본문 → 업무 예시·고려 사항 순으로
 * 바로 읽히는 문서형 콘텐츠로 보여 준다. 상자는 테두리만, 구분은 가로선으로.
 */
export function IndustryBody({
    domain,
    locale,
    cases,
}: {
    domain: IndustryKey;
    locale: Locale;
    cases: CaseStudy[];
}) {
    const en = locale === "en";
    const t = (v: { ko: string; en: string }) => (en ? v.en : v.ko);
    const st = INDUSTRY_STORIES[domain];
    const ind = INDUSTRIES[domain];
    const shownCases = en ? cases.filter((c) => c.summaryEn) : cases;
    const href = (h: string) => (h.startsWith("http") ? h : localeHref(locale, h));

    const Label = ({ n, children }: { n: string; children: React.ReactNode }) => (
        <p className="flex items-center gap-2 text-[13px] font-semibold text-[#185aea]">
            <span className="rounded-full bg-[#eef3fe] px-2.5 py-0.5 font-mono">{n}</span>
            {children}
        </p>
    );

    return (
        <main className="ind-body">
            {/* 01 개요 */}
            <section className="bg-white py-20">
                <div className="ind-wrap grid gap-12 lg:grid-cols-[1.4fr_1fr]">
                    <Rise>
                        <Label n="01">{en ? "Overview" : "개요"}</Label>
                        <h2 className="mt-4 text-[26px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {en ? `AI for ${ind.en.toLowerCase()} work` : `${ind.ko} 업무에 AI를 적용하는 방식`}
                        </h2>
                        <p className="mt-5 text-[16px] leading-[1.8] text-[var(--color-ink-muted)]">{t(st.intro)}</p>
                    </Rise>
                    <Rise delay={120}>
                        <p className="text-[13px] font-semibold text-[var(--color-ink-muted)]">
                            {en ? "Products and capabilities used" : "주로 쓰이는 제품·기능"}
                        </p>
                        <ul className="mt-3 border-t border-[var(--color-ink)]">
                            {st.stack.map((s) => {
                                const inner = (
                                    <>
                                        <span className="text-[16px] font-bold text-[var(--color-ink)]">{s.name}</span>
                                        <span className="mt-1 block text-[14px] text-[var(--color-ink-muted)]">{t(s.role)}</span>
                                    </>
                                );
                                return (
                                    <li key={s.name} className="border-b border-[var(--color-line)]">
                                        {s.href ? (
                                            <Link
                                                href={href(s.href)}
                                                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="group flex items-center justify-between gap-4 py-4"
                                            >
                                                <span>{inner}</span>
                                                {s.href.startsWith("http") ? (
                                                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition group-hover:text-[#185aea]" />
                                                ) : (
                                                    <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition group-hover:translate-x-0.5 group-hover:text-[#185aea]" />
                                                )}
                                            </Link>
                                        ) : (
                                            <div className="py-4">{inner}</div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </Rise>
                </div>
            </section>

            {/* 02 업무 과제 */}
            <section className="bg-[var(--color-bg-50,#f7f8fa)] py-20">
                <div className="ind-wrap">
                    <Rise>
                        <Label n="02">{en ? "Challenges" : "업무 과제"}</Label>
                        <h2 className="mt-4 text-[24px] font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                            {en ? `What ${ind.en.toLowerCase()} teams run into` : `${ind.ko} 현장에서 자주 마주치는 과제`}
                        </h2>
                    </Rise>
                    <ol className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
                        {st.challenges.map((c, i) => (
                            <li key={i}>
                                <Rise delay={i * 100} className="border-t-2 border-[var(--color-ink)] pt-5">
                                    <span className="font-mono text-[13px] font-semibold text-[#185aea]">{String(i + 1).padStart(2, "0")}</span>
                                    <h3 className="mt-2 text-[18px] font-bold leading-snug text-[var(--color-ink)]">{t(c.title)}</h3>
                                    <p className="mt-3 text-[15px] leading-[1.75] text-[var(--color-ink-muted)]">{t(c.body)}</p>
                                </Rise>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 03 적용 방식 */}
            <section className="bg-white py-20">
                <div className="ind-wrap">
                    <Rise>
                        <Label n="03">{en ? "Approach" : "적용 방식"}</Label>
                        <h2 className="mt-4 text-[24px] font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                            {en ? "How it is applied, step by step" : "이런 순서로 적용합니다"}
                        </h2>
                    </Rise>
                    <ol className="ind-steps mt-12 grid gap-8 md:grid-cols-4">
                        {st.approach.map((a, i) => (
                            <li key={i} className="relative">
                                <Rise delay={i * 120}>
                                    <span className="ind-step-dot relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#185aea] bg-white font-mono text-[13px] font-bold text-[#185aea]">
                                        {i + 1}
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-bold text-[var(--color-ink)]">{t(a.title)}</h3>
                                    <p className="mt-2 text-[14.5px] leading-[1.75] text-[var(--color-ink-muted)]">{t(a.body)}</p>
                                </Rise>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 04 적용 사례 — 카드가 아닌 본문 */}
            {shownCases.length > 0 && (
                <section className="bg-[var(--color-bg-50,#f7f8fa)] py-20">
                    <div className="ind-wrap">
                        <Rise>
                            <Label n="04">{en ? "Deployments" : "적용 사례"}</Label>
                            <h2 className="mt-4 text-[24px] font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                                {en ? "What we have delivered" : "실제로 이렇게 적용했습니다"}
                            </h2>
                        </Rise>
                        <div className="mt-10">
                            {shownCases.map((c, i) => {
                                const hl = (en ? c.highlightsEn : c.highlights) ?? [];
                                return (
                                    <Rise key={c.slug} delay={i * 80}>
                                        <article className="border-t border-[var(--color-ink)] py-10">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px]">
                                                <span className="font-semibold text-[var(--color-ink)]">{(en && c.customerEn) || c.customer}</span>
                                                <span className="text-[var(--color-line-strong,#c5cad3)]">|</span>
                                                <span className="inline-flex items-center gap-1.5 text-[var(--color-ink-muted)]">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${c.status === "구축중" ? "bg-amber-500" : "bg-emerald-500"}`} />
                                                    {en ? CASE_STATUS_EN[c.status] : c.status}
                                                </span>
                                                {c.products.map((p) => (
                                                    <span
                                                        key={p}
                                                        className="rounded-full border px-2.5 py-0.5 text-[12px] font-bold"
                                                        style={{ borderColor: `${PRODUCTS[p].accent}55`, color: PRODUCTS[p].accent }}
                                                    >
                                                        {PRODUCTS[p].name}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="mt-4 max-w-4xl text-[21px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[24px]">
                                                {(en && c.titleEn) || c.title}
                                            </h3>
                                            <p className="mt-3 max-w-4xl text-[15.5px] leading-[1.75] text-[var(--color-ink-muted)]">
                                                {(en && c.summaryEn) || c.summary}
                                            </p>
                                            <div className="mt-8 grid gap-8 lg:grid-cols-3">
                                                <div>
                                                    <p className="text-[13px] font-semibold text-[#185aea]">{en ? "Challenge" : "과제"}</p>
                                                    <p className="mt-2 text-[14.5px] leading-[1.75] text-[var(--color-ink)]">
                                                        {(en && c.challengeEn) || c.challenge}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-semibold text-[#185aea]">{en ? "What we built" : "구축 내용"}</p>
                                                    <p className="mt-2 text-[14.5px] leading-[1.75] text-[var(--color-ink)]">
                                                        {(en && c.solutionEn) || c.solution}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-semibold text-[#185aea]">{en ? "Scope delivered" : "제공 범위"}</p>
                                                    <ul className="mt-2 space-y-2">
                                                        {hl.map((h) => (
                                                            <li key={h} className="flex gap-2 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
                                                                <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#185aea]" />
                                                                {h}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            {c.results && c.results.length > 0 && (
                                                <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-[var(--color-line)] pt-6">
                                                    {c.results.map((r) => (
                                                        <div key={r.label}>
                                                            <dt className="text-[13px] text-[var(--color-ink-muted)]">{r.label}</dt>
                                                            <dd className="mt-1 text-[24px] font-bold text-[var(--color-ink)]">{r.value}</dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            )}
                                            {caseLinkEnabled(c.slug) && (
                                                <Link
                                                    href={localeHref(locale, `/customers/case/${c.slug}`)}
                                                    className="group mt-8 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#185aea]"
                                                >
                                                    {en ? "Read the full case" : "사례 전체 보기"}
                                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                                </Link>
                                            )}
                                        </article>
                                    </Rise>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 05 업무 예시·고려 사항 */}
            <section className="bg-white py-20">
                <div className="ind-wrap grid gap-12 lg:grid-cols-2">
                    <Rise>
                        <Label n={shownCases.length > 0 ? "05" : "04"}>{en ? "Typical work" : "적용 업무 예시"}</Label>
                        <ul className="mt-6 border-t border-[var(--color-ink)]">
                            {st.scenarios.map((s, i) => (
                                <li key={i} className="flex gap-4 border-b border-[var(--color-line)] py-4 text-[15.5px] text-[var(--color-ink)]">
                                    <span className="font-mono text-[13px] font-semibold leading-[1.9] text-[#185aea]">{String(i + 1).padStart(2, "0")}</span>
                                    {t(s)}
                                </li>
                            ))}
                        </ul>
                        {st.related && st.related.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                                {st.related.map((r) => (
                                    <Link key={r.href} href={localeHref(locale, r.href)} className="group inline-flex items-center gap-1 text-[14px] font-semibold text-[#185aea]">
                                        {t(r.label)}
                                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Rise>
                    <Rise delay={120}>
                        <Label n={shownCases.length > 0 ? "06" : "05"}>{en ? "Before you adopt" : "도입 전 확인할 점"}</Label>
                        <ul className="mt-6 border-t border-[var(--color-ink)]">
                            {st.considerations.map((s, i) => (
                                <li key={i} className="border-b border-[var(--color-line)] py-4 text-[15px] leading-[1.7] text-[var(--color-ink-muted)]">
                                    {t(s)}
                                </li>
                            ))}
                        </ul>
                    </Rise>
                </div>
            </section>

        </main>
    );
}
