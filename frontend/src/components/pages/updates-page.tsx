import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Newspaper } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/blog";
import type { Issue } from "@/lib/newsletter";
import type { EventStatus, LabEvent } from "@/lib/events";

/**
 * 소식·행사 허브 — GNB 「소식·행사」 열 제목이 여는 요약 페이지.
 * 뉴스·뉴스레터·이벤트 세 카테고리의 최신 항목을 한 화면에 모으고,
 * 각 섹션의 「전체 보기」로 원래 목록 페이지에 보낸다(데이터는 기존 소스 재사용).
 */

export interface UpdatesEventItem {
    event: LabEvent;
    status: EventStatus;
    dateLabel: string;
}

const STATUS_LABEL: Record<Locale, Record<EventStatus, string>> = {
    ko: { preparing: "준비 중", registration: "접수 중", upcoming: "접수 마감", ongoing: "진행 중", ended: "종료" },
    en: { preparing: "Coming soon", registration: "Open", upcoming: "Closed", ongoing: "Live", ended: "Ended" },
};

const COPY = {
    ko: {
        crumb: "소식·행사",
        label: "News · Insight",
        title: "소식·행사",
        lead: "Plateer AI Labs와 XGEN의 뉴스, 뉴스레터, 행사 소식을 한곳에서 확인하세요.",
        jump: [
            { id: "news", label: "뉴스" },
            { id: "newsletter", label: "뉴스레터" },
            { id: "events", label: "이벤트" },
        ],
        news: { title: "뉴스", desc: "보도자료와 수상·협약 등 회사와 제품의 주요 소식입니다.", all: "뉴스 전체 보기", empty: "아직 등록된 뉴스가 없습니다." },
        newsletter: { title: "뉴스레터", desc: "격주로 발행하는 XGEN 기술 뉴스레터의 최근 호입니다.", all: "뉴스레터 전체 보기", subscribe: "뉴스레터 구독하기", empty: "아직 발행된 호가 없습니다." },
        events: { title: "이벤트", desc: "해커톤, 컨퍼런스 참가 등 Plateer AI Labs의 행사와 그 기록입니다.", all: "이벤트 전체 보기", empty: "등록된 이벤트가 없습니다." },
    },
    en: {
        crumb: "Updates & Events",
        label: "News · Insight",
        title: "Updates & Events",
        lead: "News, newsletter issues, and events from Plateer AI Labs and XGEN, in one place.",
        jump: [
            { id: "news", label: "News" },
            { id: "newsletter", label: "Newsletter" },
            { id: "events", label: "Events" },
        ],
        news: { title: "News", desc: "Press releases, awards, and partnerships for the company and its products.", all: "All news", empty: "No news in English yet. Korean news is available on the Korean site." },
        newsletter: { title: "Newsletter", desc: "Recent issues of the fortnightly XGEN engineering newsletter.", all: "All issues", subscribe: "Subscribe", empty: "No issues available in English yet." },
        events: { title: "Events", desc: "Hackathons, conferences, and the records Plateer AI Labs keeps of them.", all: "All events (Korean)", empty: "No events registered." },
    },
} as const;

function formatDate(iso: string) {
    return iso.replaceAll("-", ".");
}

function SectionHead({ id, icon, title, desc, href, cta }: { id: string; icon: React.ReactNode; title: string; desc: string; href: string; cta: string }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div className="min-w-0">
                <h2 id={`${id}-title`} className="flex items-center gap-2 text-[22px] font-bold tracking-tight text-[var(--color-ink)] md:text-[26px]">
                    <span className="text-[#185aea]">{icon}</span>
                    {title}
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{desc}</p>
            </div>
            <Link href={href} className="group inline-flex shrink-0 items-center gap-1 text-[14px] font-semibold text-[#185aea] hover:underline">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
        </div>
    );
}

export function UpdatesPageContent({
    locale,
    news,
    issues,
    events,
}: {
    locale: Locale;
    news: PostMeta[];
    issues: Issue[];
    events: UpdatesEventItem[];
}) {
    const t = COPY[locale];
    const lp = (p: string) => localePath(locale, p);
    const postTitle = (p: PostMeta) => (locale === "en" ? p.titleEn ?? p.title : p.title);
    const issueTitle = (i: Issue) => (locale === "en" ? i.titleEn ?? i.title : i.title);

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: lp("/") },
                        { name: "News · Insight", path: lp("/blog") },
                        { name: t.crumb, path: lp("/updates") },
                    ]),
                ]}
            />

            {/* 키 비주얼 — 다른 서브 페이지와 같은 kv-hero 높이·톤 */}
            <section data-nav-theme="dark" className="kv-hero relative flex min-h-[440px] items-center overflow-hidden py-28 text-white">
                <SceneBackground concept="insights" />
                <div className="relative mx-auto w-full max-w-[1280px] px-6 pt-16 md:px-8">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5FD0FF]">{t.label}</p>
                    <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">{t.title}</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{t.lead}</p>
                    <nav aria-label={t.title} className="mt-8 flex gap-2 overflow-x-auto pb-1">
                        {t.jump.map((j) => (
                            <a
                                key={j.id}
                                href={`#${j.id}`}
                                className="shrink-0 rounded-full border border-white/25 px-4 py-2 text-[14px] font-medium text-white/90 transition-colors hover:bg-white/10"
                            >
                                {j.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </section>

            <main className="bg-white">
                {/* 뉴스 */}
                <section id="news" aria-labelledby="news-title" className="mx-auto max-w-[1280px] scroll-mt-32 px-6 py-16 md:px-8 md:py-20">
                    <SectionHead id="news" icon={<Newspaper className="h-6 w-6" />} title={t.news.title} desc={t.news.desc} href={lp("/blog?cat=news")} cta={t.news.all} />
                    {news.length === 0 ? (
                        <p className="mt-8 text-[14.5px] text-[var(--color-ink-muted)]">{t.news.empty}</p>
                    ) : (
                        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {news.map((p) => {
                                const img = p.thumb ?? p.cover;
                                return (
                                    <li key={p.slug}>
                                        <Link href={lp(`/blog/${p.slug}`)} className="group block">
                                            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[var(--color-bg-50,#f7f8fa)]">
                                                {img ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                                                ) : (
                                                    <div className="h-full w-full bg-gradient-to-br from-[#0b1224] via-[#185aea] to-[#00acee]" />
                                                )}
                                            </div>
                                            <p className="mt-4 text-[13px] text-[var(--color-ink-muted)]">{formatDate(p.date)}</p>
                                            <h3 className="mt-1 line-clamp-2 text-[16px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] group-hover:underline">
                                                {postTitle(p)}
                                            </h3>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>

                {/* 뉴스레터 */}
                <section id="newsletter" aria-labelledby="newsletter-title" className="scroll-mt-32 bg-[#f7f8fa]">
                    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-8 md:py-20">
                        <SectionHead id="newsletter" icon={<Mail className="h-6 w-6" />} title={t.newsletter.title} desc={t.newsletter.desc} href={lp("/newsletter")} cta={t.newsletter.all} />
                        {issues.length === 0 ? (
                            <p className="mt-8 text-[14.5px] text-[var(--color-ink-muted)]">{t.newsletter.empty}</p>
                        ) : (
                            <ul className="mt-8 border-t border-[var(--color-line)]">
                                {issues.map((i) => (
                                    <li key={i.slug} className="border-b border-[var(--color-line)]">
                                        <Link href={lp(`/newsletter/${i.slug}`)} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                                            <span className="shrink-0 text-[13px] font-semibold text-[#185aea] sm:w-20">Vol.{i.vol}</span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-[16px] font-semibold tracking-tight text-[var(--color-ink)] group-hover:underline">{issueTitle(i)}</span>
                                                {locale === "ko" && i.summary && (
                                                    <span className="mt-1 line-clamp-1 block text-[14px] text-[var(--color-ink-muted)]">{i.summary}</span>
                                                )}
                                            </span>
                                            <span className="shrink-0 text-[13px] text-[var(--color-ink-muted)]">{formatDate(i.date)}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link href={`${lp("/newsletter")}#subscribe`} className="mt-8 inline-flex items-center gap-1.5 rounded-[4px] bg-[#185aea] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1249c4]">
                            {t.newsletter.subscribe}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* 이벤트 */}
                <section id="events" aria-labelledby="events-title" className="mx-auto max-w-[1280px] scroll-mt-32 px-6 py-16 md:px-8 md:py-20">
                    <SectionHead id="events" icon={<CalendarDays className="h-6 w-6" />} title={t.events.title} desc={t.events.desc} href="/events" cta={t.events.all} />
                    {events.length === 0 ? (
                        <p className="mt-8 text-[14.5px] text-[var(--color-ink-muted)]">{t.events.empty}</p>
                    ) : (
                        <ul className="mt-8 grid gap-6 md:grid-cols-2">
                            {events.map(({ event, status, dateLabel }) => (
                                <li key={event.id}>
                                    {event.disabled ? (<div className="flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                        <div className="flex flex-wrap items-center gap-2 text-[13px]">
                                            <span className={status === "ended" ? "rounded-full bg-[#f0f0f4] px-2.5 py-0.5 font-semibold text-[var(--color-ink-muted)]" : "rounded-full bg-[#185aea]/10 px-2.5 py-0.5 font-semibold text-[#185aea]"}>
                                                {STATUS_LABEL[locale][status]}
                                            </span>
                                            <span className="text-[var(--color-ink-muted)]">{event.category}</span>
                                        </div>
                                        <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">{event.name}</h3>
                                        {locale === "ko" && <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{event.headline}</p>}
                                        <p className="mt-auto pt-5 text-[13px] text-[var(--color-ink-muted)]">
                                            {dateLabel}
                                            {locale === "ko" && event.venue ? ` · ${event.venue}` : ""}
                                        </p>
                                    </div>) : (<Link href={event.href} className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[#185aea]/40">
                                        <div className="flex flex-wrap items-center gap-2 text-[13px]">
                                            <span className={status === "ended" ? "rounded-full bg-[#f0f0f4] px-2.5 py-0.5 font-semibold text-[var(--color-ink-muted)]" : "rounded-full bg-[#185aea]/10 px-2.5 py-0.5 font-semibold text-[#185aea]"}>
                                                {STATUS_LABEL[locale][status]}
                                            </span>
                                            <span className="text-[var(--color-ink-muted)]">{event.category}</span>
                                        </div>
                                        <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)] group-hover:underline">{event.name}</h3>
                                        {locale === "ko" && <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{event.headline}</p>}
                                        <p className="mt-auto pt-5 text-[13px] text-[var(--color-ink-muted)]">
                                            {dateLabel}
                                            {locale === "ko" && event.venue ? ` · ${event.venue}` : ""}
                                        </p>
                                    </Link>)}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
