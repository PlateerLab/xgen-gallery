import Link from "next/link";
import { localeHref, localePath } from "@/lib/locale-path";
import { BADGE_EN } from "@/lib/newsletter-en";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { getIssueFor, getIssues, type Badge } from "@/lib/newsletter";

export const dynamicParams = false;

const BADGE_STYLE: Record<Badge, string> = {
    신규: "bg-[#2f7bff]/12 text-[#2461d8]",
    개선: "bg-[#10b981]/15 text-[#0d9268]",
    수정: "bg-[#f59e0b]/15 text-[#b45309]",
    개발중: "bg-[#2f7bff]/12 text-[#2461d8]",
    연구중: "bg-[#7c5cff]/12 text-[#6a44e0]",
    준비중: "bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]",
};

function BadgeChip({ badge, en }: { badge: Badge; en: boolean }) {
    // 색상 매핑(BADGE_STYLE)이 한국어 정규값을 키로 쓰므로 값은 그대로 두고
    // 화면 표기만 영문으로 바꾼다.
    return (
        <span
            className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-[12px] font-bold ${BADGE_STYLE[badge]}`}
        >
            {en ? BADGE_EN[badge] : badge}
        </span>
    );
}

function SectionHead({
    label,
    title,
    desc,
}: {
    label: string;
    title: string;
    desc?: string;
}) {
    return (
        <div className="mb-6">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-subtle)]">
                {label}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                {title}
            </h2>
            {desc && (
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    {desc}
                </p>
            )}
        </div>
    );
}

function fmtDate(d: string) {
    return d.replaceAll("-", ".");
}


/** 상세 화면 문구 — 호 본문은 lib/newsletter-en.ts 가 로케일별로 공급한다. */
const COPY: Record<
    Locale,
    {
        breadcrumb: string;
        kicker: string;
        author: string;
        cadence: string;
        noticeTitle: string;
        noticeA: string;
        noticeBrand: string;
        noticeB: string;
        releasesTitle: string;
        releasesDesc: string;
        progressTitle: string;
        progressDesc: string;
        newsTitle: string;
        newsDesc: string;
        readingTitle: string;
        papersTitle: string;
        papersDesc: string;
        paperCta: string;
        upcomingTitle: string;
        upcomingDesc: string;
        feedbackTitle: string;
        feedbackDesc: string;
        feedbackCta: string;
        backHome: string;
    }
> = {
    ko: {
        breadcrumb: "뉴스레터",
        kicker: "XGEN 뉴스레터",
        author: "AI솔루션연구소",
        cadence: "격주 발행",
        noticeTitle: "뉴스레터 안내",
        noticeA: "이 글은",
        noticeBrand: "플래티어랩스",
        noticeB: "에서 격주로 발간하는 XGEN·AI 뉴스레터 콘텐츠입니다. 메일로 발행된 뉴스레터를 웹에서도 그대로 보실 수 있습니다.",
        releasesTitle: "XGEN 이번 호 릴리즈",
        releasesDesc: "이번 호에 배포된 새 기능·개선·수정입니다.",
        progressTitle: "개발 · 연구 중",
        progressDesc: "지금 팀에서 만들고 있고, 실험하고 있는 과제들입니다.",
        newsTitle: "기술 뉴스",
        newsDesc: "이번 2주간 눈여겨본 업계 소식과, 우리에게 주는 함의.",
        readingTitle: "읽을거리",
        papersTitle: "주요 논문",
        papersDesc: "팀 연구와 맞닿은, 눈여겨볼 논문을 골랐습니다.",
        paperCta: "논문 보기",
        upcomingTitle: "다가오는 소식",
        upcomingDesc: "준비하고 있는 콘텐츠와 이벤트. 오픈하면 이 코너에서 가장 먼저 알려드릴게요.",
        feedbackTitle: "이번 호, 어떠셨나요?",
        feedbackDesc: "더 다뤄졌으면 하는 주제나 아쉬운 점이 있다면 편하게 알려주세요. 여러분의 의견이 다음 호를 만듭니다.",
        feedbackCta: "피드백 보내기",
        backHome: "뉴스레터 홈으로",
    },
    en: {
        breadcrumb: "Newsletter",
        kicker: "XGEN Newsletter",
        author: "AI Solutions Lab",
        cadence: "Published fortnightly",
        noticeTitle: "About this newsletter",
        noticeA: "This is the XGEN and AI newsletter published fortnightly by",
        noticeBrand: "Plateer Labs",
        noticeB: ". The issue that goes out by email is readable here on the web, as it is.",
        releasesTitle: "Shipped in this issue",
        releasesDesc: "New capabilities, improvements, and fixes released this issue.",
        progressTitle: "In development and research",
        progressDesc: "What the team is building and experimenting with right now.",
        newsTitle: "Technology news",
        newsDesc: "Industry news we watched over the past two weeks, and what it means for us.",
        readingTitle: "Reading",
        papersTitle: "Papers",
        papersDesc: "Papers worth attention, close to what the team is researching.",
        paperCta: "Read the paper",
        upcomingTitle: "Coming up",
        upcomingDesc: "Content and events in preparation. When they open, this section says so first.",
        feedbackTitle: "How was this issue?",
        feedbackDesc: "If there is a topic you would like covered, or something that fell short, tell us. Your view shapes the next issue.",
        feedbackCta: "Send feedback",
        backHome: "Back to the newsletter",
    },
};

export async function NewsletterIssuePageContent({
    params,
    locale,
}: {
    params: Promise<{ slug: string }>;
    locale: Locale;
}) {
    const t = COPY[locale];
    const en = locale === "en";
    const { slug } = await params;
    const issue = getIssueFor(slug, locale);
    if (!issue) notFound();

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: localePath(locale, "/") },
                        { name: t.breadcrumb, path: localePath(locale, "/newsletter") },
                        {
                            name: issue.title,
                            path: `/newsletter/${issue.slug}`,
                        },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[400px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="insights" />
                <div className="relative mx-auto w-full max-w-3xl px-6 pt-16">
                    <p className="text-[15px] font-semibold tracking-tight text-[#7dd3fc]">
                        {t.kicker} · vol.{issue.vol}
                    </p>
                    <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {issue.title}
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-white/75">
                        {issue.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-2 text-[14px] text-white/55">
                        <time dateTime={issue.date}>{fmtDate(issue.date)}</time>
                        <span>·</span>
                        <span>{t.author}</span>
                        <span>·</span>
                        <span>{t.cadence}</span>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
                {/* 뉴스레터 소개 — 발행 콘텐츠를 그대로 싣되, 이 글이 무엇인지 먼저 안내 */}
                <div className="mb-12 rounded-2xl border border-[#cfe0ff] bg-[#f1f6ff] p-6">
                    <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#2461d8]">
                        <Mail className="h-4 w-4" />
                        {t.noticeTitle}
                    </p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                        {t.noticeA}{" "}
                        <strong className="font-semibold text-[var(--color-ink)]">
                            {t.noticeBrand}
                        </strong>
                        {t.noticeB}
                    </p>
                </div>

                {/* 인사말 */}
                <div className="space-y-4 border-b border-[var(--color-line)] pb-12">
                    {issue.intro.map((p, i) => (
                        <p
                            key={i}
                            className="text-[16px] leading-relaxed text-[var(--color-ink-muted)]"
                        >
                            {p}
                        </p>
                    ))}
                </div>

                {/* 이번 호 릴리즈 */}
                <section className="pt-12">
                    <SectionHead
                        label="Release"
                        title={t.releasesTitle}
                        desc={t.releasesDesc}
                    />
                    <div className="space-y-4">
                        {issue.releases.map((r) => (
                            <div
                                key={r.title}
                                className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                            >
                                <div className="flex items-center gap-2.5">
                                    <BadgeChip badge={r.badge} en={en} />
                                    <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {r.title}
                                    </h3>
                                </div>
                                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {r.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 개발 · 연구 중 */}
                <section className="pt-14">
                    <SectionHead
                        label="In progress"
                        title={t.progressTitle}
                        desc={t.progressDesc}
                    />
                    <div className="space-y-4">
                        {issue.inProgress.map((p) => (
                            <div
                                key={p.title}
                                className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                            >
                                <div className="flex items-center gap-2.5">
                                    <BadgeChip badge={p.badge} en={en} />
                                    <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <span className="ml-auto font-mono text-[13px] font-bold tabular-nums text-[var(--color-ink-subtle)]">
                                        {p.percent}%
                                    </span>
                                </div>
                                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-alt)]">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#2f7bff] to-[#7c5cff]"
                                        style={{ width: `${p.percent}%` }}
                                    />
                                </div>
                                <p className="mt-3.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {p.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 기술 뉴스 */}
                <section className="pt-14">
                    <SectionHead
                        label="News"
                        title={t.newsTitle}
                        desc={t.newsDesc}
                    />
                    <div className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
                        {issue.news.map((it) => (
                            <LinkRow key={it.n} item={it} />
                        ))}
                    </div>
                </section>

                {/* 읽을거리 */}
                <section className="pt-14">
                    <SectionHead label="Reading" title={t.readingTitle} />
                    <div className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
                        {issue.reading.map((it) => (
                            <LinkRow key={it.n} item={it} />
                        ))}
                    </div>
                </section>

                {/* 주요 논문 */}
                <section className="pt-14">
                    <SectionHead
                        label="Papers"
                        title={t.papersTitle}
                        desc={t.papersDesc}
                    />
                    <div className="space-y-4">
                        {issue.papers.map((p) => (
                            <a
                                key={p.arxiv}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[var(--color-line-strong)]"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-md bg-[var(--color-surface-alt)] px-2 py-0.5 font-mono text-[12px] font-semibold text-[var(--color-ink-subtle)]">
                                        arXiv {p.arxiv}
                                    </span>
                                    {p.authors && (
                                        <span className="text-[13px] text-[var(--color-ink-subtle)]">
                                            {p.authors}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                    {p.title}
                                </h3>
                                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {p.body}
                                </p>
                                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#2461d8]">
                                    {t.paperCta}
                                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* 다가오는 소식 */}
                {issue.upcoming.length > 0 && (
                    <section className="pt-14">
                        <SectionHead
                            label="Coming up"
                            title={t.upcomingTitle}
                            desc={t.upcomingDesc}
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                            {issue.upcoming.map((u) => (
                                <div
                                    key={u.title}
                                    className="rounded-2xl border border-dashed border-[var(--color-line-strong)] bg-[var(--color-surface-alt)] p-6"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <BadgeChip badge={u.badge} en={en} />
                                        <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {u.title}
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {u.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 피드백 */}
                <section className="mt-16 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7 text-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2f7bff]/10 text-[#2f7bff]">
                        <Mail className="h-5 w-5" />
                    </span>
                    <h2 className="mt-4 text-xl font-bold tracking-tight text-[var(--color-ink)]">
                        {t.feedbackTitle}
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                        {t.feedbackDesc}
                    </p>
                    <a
                        href="mailto:xgen@plateer.com?subject=XGEN%20%EB%89%B4%EC%8A%A4%EB%A0%88%ED%84%B0%20%ED%94%BC%EB%93%9C%EB%B0%B1"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                    >
                        {t.feedbackCta}
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </section>

                <Link
                    href={localeHref(locale, "/newsletter")}
                    className="mt-12 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t.backHome}
                </Link>
            </main>
            <SiteFooter />
        </>
    );
}

function LinkRow({
    item,
}: {
    item: {
        n: string;
        title: string;
        body: string;
        source: string;
        readTime: string;
        url: string;
    };
}) {
    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 p-6 transition hover:bg-[var(--color-surface-alt)]"
        >
            <span className="font-mono text-[13px] font-bold text-[var(--color-ink-subtle)]">
                {item.n}
            </span>
            <div className="min-w-0">
                <h3 className="flex items-start gap-1 text-[16px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                    <span className="group-hover:underline">{item.title}</span>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                    {item.body}
                </p>
                <p className="mt-2.5 text-[13px] font-medium text-[var(--color-ink-subtle)]">
                    {item.source} · {item.readTime}
                </p>
            </div>
        </a>
    );
}
