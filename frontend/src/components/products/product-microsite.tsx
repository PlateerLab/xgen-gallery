import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { ProductBrandHeader } from "@/components/products/product-brand-header";
import { ProductImmersiveHero } from "@/components/products/product-immersive-hero";
import { ProductStickyCta } from "@/components/products/product-sticky-cta";
import { getAllCases, caseLinkEnabled, CASE_STATUS_EN } from "@/lib/customers";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import type { ProductProfile, L10n, BentoItem } from "@/lib/product-profiles";
import { cn } from "@/lib/cn";

/**
 * 제품 마이크로사이트 공용 레이아웃 — 랩스 GNB 대신 제품 전용 헤더를 세워
 * 하나의 서비스 사이트처럼 보이게 한다(푸터는 랩스 공통). 본문은 마케팅형
 * (스크롤 히어로, 벤토 그리드, 도입 방식 비교)으로 구성한다.
 * 제품별 차이는 ProductProfile 데이터로만 준다.
 */
export function ProductMicrosite({ profile: p, locale }: { profile: ProductProfile; locale: Locale }) {
    const en = locale === "en";
    const t = (v: L10n) => (en ? v.en : v.ko);
    const href = (h: string) => localeHref(locale, h);
    const trialHref = href("/xgen-trial");

    const sections = [
        { id: "overview", label: en ? "Overview" : "개요" },
        { id: "capabilities", label: en ? "Capabilities" : "기능" },
        { id: "workflow", label: en ? "How it works" : "작동 흐름" },
        { id: "trust", label: en ? "Security & Governance" : "보안·거버넌스" },
        { id: "deployment", label: en ? "Deployment" : "도입 방식" },
        { id: "customers", label: en ? "Customers" : "고객사례" },
    ];

    const cases = getAllCases()
        .filter((c) => c.products.includes(p.caseProduct))
        .slice(0, 3);

    return (
        <>
            <ProductBrandHeader
                name={p.name}
                labsHref={href("/")}
                labsLabel="by Plateer AI Labs"
                sections={sections}
                cta={{ label: en ? "Request a trial" : "체험 신청", href: trialHref }}
                secondary={{ label: en ? "Talk to us" : "도입 상담", href: href("/contact") }}
            />

            {/* 1. Hero — 스크롤 고정 구간에서 브랜드 장면 → 설명·CTA 장면으로 전환 */}
            <ProductImmersiveHero
                name={p.name}
                eyebrow={t(p.category)}
                titleA={t(p.hero.titleA)}
                titleB={t(p.hero.titleB)}
                lead={t(p.hero.lead)}
                image={p.hero.main.img}
                imageAlt={t(p.hero.main.alt)}
                cta={{ label: en ? "Request a trial" : "체험 신청", href: trialHref }}
                secondary={{ label: en ? "Watch the demo" : "실증 데모 보기", href: href("/proof-in-action") }}
                scrollHint={en ? "Scroll" : "스크롤해서 살펴보기"}
            />

            <main>
                {/* 2. Proof strip */}
                <section className="border-b border-[var(--color-line)] bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4">
                        {p.proof.map((s) => (
                            <div key={s.value} className="border-l border-[var(--color-line)] pl-5">
                                <p className="text-[26px] font-extrabold tracking-tight text-[var(--color-ink)] md:text-[30px]">
                                    {s.value}
                                </p>
                                <p className="mt-1 text-[14px] font-semibold text-[var(--color-ink)]">{t(s.label)}</p>
                                <p className="mt-0.5 text-[12.5px] text-[var(--color-ink-subtle)]">{t(s.sub)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Bento — 기능 */}
                <section id="capabilities" className="scroll-mt-[120px] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <SectionHead
                            eyebrow="Capabilities"
                            title={t(p.bentoTitle)}
                            lead={t(p.bentoLead)}
                        />
                        <div className="mt-12 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {p.bento.map((b) => (
                                <BentoCard key={b.id} item={b} t={t} href={href} en={en} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Flow */}
                <section id="workflow" className="scroll-mt-[120px] bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <SectionHead eyebrow="How it works" title={t(p.flowTitle)} />
                        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {p.flow.map((s) => (
                                <li key={s.no} className="flex flex-col">
                                    <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={s.img}
                                            alt={t(s.imgAlt)}
                                            className="block aspect-[16/10] h-auto w-full object-cover object-left-top"
                                        />
                                    </div>
                                    <p className="mt-5 font-mono text-[13px] font-bold text-[#2f7bff]">{s.no}</p>
                                    <h3 className="mt-1 text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {t(s.title)}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {t(s.desc)}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 5. Trust — 보안·거버넌스 */}
                <section id="trust" className="relative scroll-mt-[120px] overflow-hidden bg-[#060914] text-white">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_50%,rgba(47,123,255,0.22),transparent_70%)]"
                    />
                    <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1fr_1.1fr]">
                        <div>
                            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#7dd3fc]">
                                Security & Governance
                            </p>
                            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.2] tracking-tight md:text-[42px]">
                                {t(p.trust.title)}
                            </h2>
                            <p className="mt-5 text-[16px] leading-relaxed text-white/65">{t(p.trust.lead)}</p>
                            <ul className="mt-8 space-y-3">
                                {p.trust.points.map((pt) => (
                                    <li key={pt.ko} className="flex gap-3 text-[15px] text-white/85">
                                        <Check className="mt-0.5 h-5 w-5 flex-none text-[#00adee]" />
                                        {t(pt)}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={href(p.trust.href)}
                                className="mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-[#7dd3fc]"
                            >
                                {en ? "Security & governance" : "보안·거버넌스 자세히 보기"} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="relative pb-16 pr-6 md:pr-12">
                            <div className="overflow-hidden rounded-xl border border-white/15 shadow-2xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.trust.back.img} alt={t(p.trust.back.alt)} className="block h-auto w-full" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-[58%] overflow-hidden rounded-xl border border-white/25 shadow-2xl">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.trust.front.img} alt={t(p.trust.front.alt)} className="block h-auto w-full" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Deployment — 도입 방식 비교 */}
                <section id="deployment" className="scroll-mt-[120px] bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <SectionHead eyebrow="Deployment" title={t(p.deploy.title)} lead={t(p.deploy.lead)} />
                        <div className="mt-12 overflow-x-auto">
                            <table className="w-full min-w-[620px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b-2 border-[var(--color-ink)]">
                                        <th className="w-[22%] py-4 pr-4 text-[13px] font-semibold text-[var(--color-ink-subtle)]" />
                                        <th className="py-4 pr-4 text-[17px] font-bold text-[var(--color-ink)]">
                                            {en ? "On-premise" : "온프레미스"}
                                        </th>
                                        <th className="py-4 text-[17px] font-bold text-[var(--color-ink)]">
                                            {en ? "Air-gapped" : "망분리 · Air-gap"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {p.deploy.rows.map((r) => (
                                        <tr key={r.label.ko} className="border-b border-[var(--color-line)]">
                                            <th className="py-4 pr-4 text-[14px] font-semibold text-[var(--color-ink)]">
                                                {t(r.label)}
                                            </th>
                                            <td className="py-4 pr-4 text-[14.5px] text-[var(--color-ink-muted)]">{t(r.onprem)}</td>
                                            <td className="py-4 text-[14.5px] text-[var(--color-ink-muted)]">{t(r.airgap)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-5 text-[13px] leading-relaxed text-[var(--color-ink-subtle)]">{t(p.deploy.note)}</p>
                    </div>
                </section>

                {/* 7. Customers */}
                <section id="customers" className="scroll-mt-[120px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <SectionHead eyebrow="Customers" title={en ? "Where XGEN is in use" : "XGEN이 쓰이는 현장"} />
                            <Link
                                href={href("/customers")}
                                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink)] hover:text-[#2461d8]"
                            >
                                {en ? "All customer stories" : "고객사례 전체 보기"} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {cases.map((c) => {
                                const body = (
                                    <>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                                {en ? c.customerEn ?? c.customer : c.customer}
                                            </span>
                                            <span className="flex-none rounded-full border border-[var(--color-line)] px-2.5 py-0.5 text-[12px] text-[var(--color-ink-muted)]">
                                                {en ? CASE_STATUS_EN[c.status] : c.status}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 text-[18px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                            {en ? c.titleEn ?? c.title : c.title}
                                        </h3>
                                        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {en ? c.summaryEn ?? c.summary : c.summary}
                                        </p>
                                    </>
                                );
                                const cls = "flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6";
                                return caseLinkEnabled(c.slug) ? (
                                    <Link
                                        key={c.slug}
                                        href={href(`/customers/case/${c.slug}`)}
                                        className={cn(cls, "transition hover:border-[var(--color-ink)]")}
                                    >
                                        {body}
                                    </Link>
                                ) : (
                                    <div key={c.slug} className={cls}>
                                        {body}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 8. CTA */}
                <section className="bg-[#060914] text-white">
                    <div className="mx-auto max-w-7xl px-6 py-20 text-center">
                        <h2 className="mx-auto max-w-3xl text-[28px] font-extrabold leading-tight tracking-tight md:text-[40px]">
                            {t(p.cta.title)}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/60">{t(p.cta.lead)}</p>
                        <div className="mt-9 flex flex-wrap justify-center gap-3">
                            <Link
                                href={trialHref}
                                className="inline-flex items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-[15px] font-bold text-white transition hover:bg-[#2461d8]"
                            >
                                {en ? "Request a trial" : "체험 신청"} <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href={href("/contact")}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:bg-white/10"
                            >
                                {en ? "Talk to us" : "도입 상담"}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <ProductStickyCta name={p.name} label={en ? "Request a trial" : "체험 신청"} href={trialHref} />
            <SiteFooter hideCta />
        </>
    );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
    return (
        <div className="max-w-3xl">
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#2f7bff]">{eyebrow}</p>
            <h2 className="mt-3 text-[30px] font-extrabold leading-[1.2] tracking-tight text-[var(--color-ink)] md:text-[42px]">
                {title}
            </h2>
            {lead && <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{lead}</p>}
        </div>
    );
}

function BentoCard({
    item: b,
    t,
    href,
    en,
}: {
    item: BentoItem;
    t: (v: L10n) => string;
    href: (h: string) => string;
    en: boolean;
}) {
    const span =
        b.size === "lg" ? "md:col-span-2 lg:row-span-2" : b.size === "wide" ? "md:col-span-2" : "";
    const dark = b.size === "lg";
    const inner = (
        <>
            <p className={cn("font-mono text-[12px] font-semibold", dark ? "text-[#7dd3fc]" : "text-[#2f7bff]")}>
                {b.eyebrow}
            </p>
            <h3
                className={cn(
                    "mt-3 font-bold leading-snug tracking-tight",
                    dark ? "text-[26px] text-white md:text-[30px]" : "text-[19px] text-[var(--color-ink)]",
                )}
            >
                {t(b.title)}
            </h3>
            <p className={cn("mt-3 text-[14.5px] leading-relaxed", dark ? "text-white/65" : "text-[var(--color-ink-muted)]")}>
                {t(b.desc)}
            </p>
            {b.img && (
                <div
                    className={cn(
                        "mt-6 overflow-hidden rounded-xl border",
                        dark ? "border-white/15" : "border-[var(--color-line)]",
                        b.size === "wide" && "lg:hidden",
                    )}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.img} alt={b.imgAlt ? t(b.imgAlt) : ""} className="block h-auto w-full" />
                </div>
            )}
            {b.href && (
                <span
                    className={cn(
                        "mt-auto inline-flex items-center gap-1 pt-6 text-[14px] font-semibold",
                        dark ? "text-white" : "text-[var(--color-ink)]",
                    )}
                >
                    {en ? "Learn more" : "자세히 보기"} <ArrowUpRight className="h-4 w-4" />
                </span>
            )}
        </>
    );
    const cls = cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition",
        dark
            ? "border-[#1b2440] bg-[#0b1224] hover:border-[#2f7bff]/60"
            : "border-[var(--color-line)] bg-white hover:border-[var(--color-ink)]",
        span,
    );
    // wide 카드는 넓은 화면에서 오른쪽에 화면 캡처를 붙인다.
    if (b.size === "wide" && b.img) {
        const content = (
            <div className="grid h-full gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="flex flex-col">{inner}</div>
                <div className="hidden overflow-hidden rounded-xl border border-[var(--color-line)] lg:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.img} alt="" aria-hidden className="block h-full w-full object-cover object-left-top" />
                </div>
            </div>
        );
        return b.href ? (
            <Link href={href(b.href)} className={cls}>
                {content}
            </Link>
        ) : (
            <div className={cls}>{content}</div>
        );
    }
    return b.href ? (
        <Link href={href(b.href)} className={cls}>
            {inner}
        </Link>
    ) : (
        <div className={cls}>{inner}</div>
    );
}
