import Link from "next/link";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import {
    Sparkles,
    Rocket,
    FileText,
    Mail,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { getIssuesFor } from "@/lib/newsletter";

/** 아이콘만 여기 둔다 — 문구는 로케일별 COPY.benefits 에서 인덱스로 맞춘다. */
const BENEFIT_ICONS: LucideIcon[] = [Sparkles, Rocket, FileText];


/** 뉴스레터 허브 문구. */
const COPY: Record<
    Locale,
    {
        breadcrumb: string;
        title: string;
        lead: string;
        benefits: { title: string; desc: string }[];
        archive: string;
        archiveDesc: string;
        subscribe: string;
        unsubNote: string;
    }
> = {
    ko: {
        breadcrumb: "뉴스레터",
        title: "Plateer AI Labs 뉴스레터",
        lead: "Enterprise AI·Agentic AI 연구와 실무 인사이트, 제품 소식과 검증된 적용 사례를 정기적으로 받아보세요",
        benefits: [
            {
                title: "연구·기술 인사이트",
                desc: "Agentic AI·RAG·거버넌스 등 현장에서 검증한 기술 인사이트를 정리해 전달합니다",
            },
            {
                title: "제품 소식·릴리스",
                desc: "XGEN을 비롯한 Plateer AI Labs 제품의 새 기능과 릴리스 소식을 가장 먼저 알려드립니다",
            },
            {
                title: "검증된 적용 사례",
                desc: "금융·공공·커머스 등 산업별 Enterprise AI 도입·실증 사례를 공유합니다",
            },
        ],
        archive: "지난 호",
        archiveDesc: "격주로 발행하는 XGEN 기술 뉴스레터를 웹에서도 보실 수 있습니다",
        subscribe: "지금 구독하기",
        unsubNote: "원치 않으시면 언제든 한 번의 클릭으로 구독을 해지할 수 있습니다",
    },
    en: {
        breadcrumb: "Newsletter",
        title: "The Plateer AI Labs newsletter",
        lead: "Research and practical insight on Enterprise and Agentic AI, product news, and cases proven in the field — delivered regularly",
        benefits: [
            {
                title: "Research and engineering insight",
                desc: "Technical insight proven on the floor — Agentic AI, RAG, governance — gathered and sent your way",
            },
            {
                title: "Product news and releases",
                desc: "New capabilities and releases across XGEN and other Plateer AI Labs products, first",
            },
            {
                title: "Cases proven in the field",
                desc: "Enterprise AI adoption and validation across finance, the public sector, commerce, and more",
            },
        ],
        archive: "Past issues",
        archiveDesc:
            "The XGEN engineering newsletter, published fortnightly, is readable on the web too",
        subscribe: "Subscribe now",
        unsubNote: "You can unsubscribe at any time with a single click",
    },
};

export function NewsletterIndexPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const issues = getIssuesFor(locale);
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: localePath(locale, "/") },
                        { name: "Insight", path: localePath(locale, "/blog") },
                        {
                            name: t.breadcrumb,
                            path: localePath(locale, "/newsletter"),
                        },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[440px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="insights" />
                <div className="relative mx-auto w-full max-w-3xl px-6 pt-16 text-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                        <Mail className="h-6 w-6" />
                    </span>
                    <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.title}
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-white/75">
                        {t.lead}
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-3xl px-6 py-20">
                {/* 혜택 */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {t.benefits.map((b, i) => {
                        const Icon = BENEFIT_ICONS[i];
                        return (
                        <div
                            key={b.title}
                            className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                        >
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <Icon className="h-5 w-5" />
                            </span>
                            <h2 className="mt-4 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                {b.title}
                            </h2>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {b.desc}
                            </p>
                        </div>
                        );
                    })}
                </div>

                {/* 지난 호 아카이브 */}
                {issues.length > 0 && (
                    <div className="mt-14">
                        <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink)]">
                            {t.archive}
                        </h2>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.archiveDesc}
                        </p>
                        <div className="mt-5 space-y-3">
                            {issues.map((it) => (
                                <Link
                                    key={it.slug}
                                    href={localePath(locale, `/newsletter/${it.slug}`)}
                                    className="group flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[var(--color-line-strong)]"
                                >
                                    <span className="flex-none rounded-lg bg-[#2f7bff]/10 px-2.5 py-1 font-mono text-[13px] font-bold text-[#2461d8]">
                                        vol.{it.vol}
                                    </span>
                                    <div className="min-w-0">
                                        <time
                                            dateTime={it.date}
                                            className="text-[13px] text-[var(--color-ink-subtle)]"
                                        >
                                            {it.date.replaceAll("-", ".")}
                                        </time>
                                        <h3 className="mt-0.5 text-[16px] font-bold tracking-tight text-[var(--color-ink)] group-hover:underline">
                                            {it.title}
                                        </h3>
                                        <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {it.summary}
                                        </p>
                                    </div>
                                    <ArrowRight className="ml-auto h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 구독 폼 */}
                <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7">
                    <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink)]">
                        {t.subscribe}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                        {t.unsubNote}
                    </p>
                    <div className="mt-5">
                        <NewsletterSignup />
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
