import Link from "next/link";
import {
    ArrowRight,
    Sparkles,
    FlaskConical,
    Building2,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import { LAB_MEMBERS, LAB_GROUPS, type LabGroup } from "@/lib/lab-members";
import { LabMembersVisual } from "@/components/lab-members-visual";
import {
    LAB_PROJECTS,
    toolsFor,
    repoUrl,
    assertProjectTools,
} from "@/lib/lab-projects";
import { SITE } from "@/lib/site";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

/**
 * 랩 멤버스 — 구성원과 그 사람이 쓴 글을 함께 보여준다.
 *
 * 기고자 이름은 공개된 글의 GitHub 계정으로, 테크노트 링크는 글로 연결한다.
 * 이메일이나 활동 이력은 추가로 노출하지 않는다.
 */

interface Copy {
    eyebrow: string;
    title: string;
    lead: string;
    wrote: (n: number) => string;
    /**
     * 이 사람들이 무엇을 내놓는지 — 블로그 카테고리 세 갈래로 보낸다.
     * key 는 /blog?cat=<key> 딜립크 값이다(blog-list.tsx 의 CATEGORY_BY_KEY).
     */
    output: {
        title: string;
        lead: string;
        items: {
            key: string;
            icon: LucideIcon;
            title: string;
            desc: string;
            cta: string;
        }[];
    };
    allPosts: string;
    /**
     * 프로젝트 → GitHub. 공개 프로젝트 저장소를 함께 소개한다.
     * 트랙과 저장소 이름은 lab-projects.ts 가 가지고 있고, 여기엔 문구만 있다.
     */
    repos: {
        title: string;
        lead: string;
        org: string;
        gallery: string;
    };
}

/** 멤버스에서는 XGEN 플랫폼 하위 구성요소를 독립 제품처럼 보이지 않게 표기한다. */
const MEMBER_TOOL_NAMES: Partial<Record<string, string>> = {
    "xgen-agent-runtime": "Agent Runtime",
    "xgen-agent-memory": "Agent Memory",
    "xgen-harness": "Harness",
    "xgen-sdk": "SDK",
};

const COPY: Record<Locale, Copy> = {
    ko: {
        eyebrow: "AI Lab Members",
        title: "AI를 연구하고, 현실에 구현하는 사람들",
        lead: "Plateer AI Labs를 만드는 연구원과 엔지니어를 소개합니다. 연구부터 제품 개발, 고객 적용까지 Enterprise AI를 현실로 만드는 사람들의 경험과 인사이트를 함께 전합니다.",
        wrote: (n) => `테크노트 ${n}편`,
        output: {
            title: "AI Labs 인사이트",
            lead: "새로운 기능을 개발하며 얻은 기술적 인사이트와, 고객 현장에서 검증한 경험을 기록하고 공유합니다.",
            items: [
                {
                    key: "product",
                    icon: Sparkles,
                    title: "XGEN 프리뷰",
                    desc: "새로 준비하는 기능을 먼저 소개합니다. 무엇을 왜 만들고 있는지, 어떻게 쓰는지까지 담습니다.",
                    cta: "프리뷰 보기",
                },
                {
                    key: "labs",
                    icon: FlaskConical,
                    title: "테크 노트",
                    desc: "온톨로지와 RAG, 에이전트 런타임을 만들며 부딪힌 문제와 풀어낸 방법을 기록합니다.",
                    cta: "테크 노트 보기",
                },
                {
                    key: "industry",
                    icon: Building2,
                    title: "현장 리포트",
                    desc: "고객사 도입 검토 자리에서 실제로 나온 질문과 그에 대한 답을 정리합니다.",
                    cta: "현장 리포트 보기",
                },
            ],
        },
        allPosts: "글 전체 보기",
        repos: {
            title: "AI Labs가 만드는 것",
            lead: "연구 결과는 문서에 머물지 않습니다. 오픈소스 라이브러리와 프로젝트로 공개되어 Plateer AI Labs GitHub Organization에서 누구나 확인할 수 있습니다.",
            org: "GitHub Organization 열기",
            gallery: "라이브러리 전체 보기",
        },
    },
    en: {
        eyebrow: "AI Lab Members",
        title: "The people who research AI and build it for real",
        lead: "The researchers and engineers who make Plateer AI Labs. From research through product development to customer deployment, they turn enterprise AI into something real — and share what they learn along the way.",
        wrote: (n) => `${n} tech ${n === 1 ? "note" : "notes"}`,
        output: {
            title: "What they publish",
            lead: "New capabilities as they take shape, what building them taught us, and what we learned in customer environments.",
            items: [
                {
                    key: "product",
                    icon: Sparkles,
                    title: "XGEN Preview",
                    desc: "A first look at what we are building — what it does, why we are building it, and how it is used.",
                    cta: "See previews",
                },
                {
                    key: "labs",
                    icon: FlaskConical,
                    title: "Tech Notes",
                    desc: "Problems we hit building ontology, RAG, and agent runtimes — and how we worked through them.",
                    cta: "Read tech notes",
                },
                {
                    key: "industry",
                    icon: Building2,
                    title: "Field Reports",
                    desc: "The questions that actually come up when enterprises evaluate AI platforms, and our answers to them.",
                    cta: "Read field reports",
                },
            ],
        },
        allPosts: "See all posts",
        repos: {
            title: "What they build",
            lead: "Our research does not stay in papers. It ships as open-source libraries and projects, public to anyone on the Plateer AI Labs GitHub organization.",
            org: "Open the GitHub organization",
            gallery: "Browse all libraries",
        },
    },
};

export function LabMembersPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const en = locale === "en";
    const href = (path: string) => localeHref(locale, path);

    /* 트랙에 빠진 도구나 오타 난 id 를 개발 중에 알린다 */
    assertProjectTools();

    /* 저자 이름으로 글을 묶어둔다 — 카드마다 목록을 다시 훑지 않게 한다. */
    const byAuthor = new Map<string, PostMeta[]>();
    for (const p of getAllPosts(locale)) {
        const a = p.author?.trim();
        if (!a) continue;
        byAuthor.set(a, [...(byAuthor.get(a) ?? []), p]);
    }

    const groups: LabGroup[] = ["leadership", "architecture", "research"];

    return (
        <>
            <SiteNav />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: en ? "/en" : "/" },
                    { name: "AI Lab Members", path: en ? "/en/members" : "/members" },
                ])}
            />

            <main>
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_auto]">
                        <div>
                            <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                {t.eyebrow}
                            </p>
                            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[42px]">
                                {t.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.lead}
                            </p>
                        </div>

                        {/*
                          헤더 일러스트 — 얼굴을 늘어놓는 대신 이들이 하는 일을 그린다.
                          아래 카드가 이미 사람을 보여주므로, 헤더까지 얼굴로 채우면
                          같은 내용이 두 번 나오고 명단 성격이 강해진다.
                        */}
                        <LabMembersVisual className="hidden h-[420px] w-[440px] lg:block" />
                    </div>
                </section>

                {groups.map((g, gi) => {
                    const members = LAB_MEMBERS.filter((m) => m.group === g);
                    if (!members.length) return null;
                    return (
                        <section
                            key={g}
                            className={
                                gi > 0 ? "border-t border-[var(--color-line)]" : ""
                            }
                        >
                            <div className="mx-auto max-w-7xl px-6 py-16">
                                <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {en ? LAB_GROUPS[g].en : LAB_GROUPS[g].ko}
                                </h2>

                                {/* 큰 화면에서 6명이 한 줄 — 리더십 여섯 명이 정확히 한 행이다 */}
                                <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                                    {members.map((m) => {
                                        const posts = byAuthor.get(m.blogAuthor ?? m.name) ?? [];
                                        const github = posts.find((p) => p.authorGithub)?.authorGithub;
                                        /* 이름과 글 링크를 분리해 중첩 링크를 피한다. */
                                        const latest = posts[0];
                                        const cardCls =
                                            "flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white";
                                        /*
                                          사진은 600x600 정사각으로 통일해 두었다 —
                                          머리 크기와 머리 위 여백을 맞춘 뒤 같은 창으로
                                          잘라, 카드마다 인물이 차지하는 크기가 같다.
                                          3:4 로 두면 원본에 담긴 신체 범위가 달라
                                          짧은 인물(얼굴 위주)이 프레임을 못 채운다.
                                        */
                                        const inner = (
                                            <>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={`/members/${m.slug}.webp`}
                                                    alt={m.name}
                                                    loading="lazy"
                                                    className="aspect-square w-full bg-[var(--color-surface-alt)] object-cover"
                                                />
                                                <div className="flex flex-1 flex-col p-4">
                                                    <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                                        {github ? (
                                                            <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline" aria-label={`${m.name} GitHub (${en ? "new tab" : "새 탭"})`}>
                                                                {m.name}<ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                                                            </a>
                                                        ) : m.name}
                                                    </h3>
                                                    <p className="mt-0.5 text-[12.5px] leading-snug text-[var(--color-ink-muted)]">
                                                        {en ? m.roleEn : m.role}
                                                    </p>
                                                    {/* 한글 라벨이라 font-mono·uppercase 를 쓰지 않는다 — 자간이 벌어지고 글자가 깨져 보인다 */}
                                                    {latest && (
                                                        <Link href={href(`/blog/${latest.slug}`)} className="mt-auto inline-flex items-center gap-1 pt-3 text-[12.5px] font-semibold text-[#2461d8] underline-offset-4 hover:underline">
                                                            {t.wrote(posts.length)}
                                                            <ArrowRight className="h-3 w-3" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </>
                                        );
                                        return (
                                            <li key={m.slug} className="min-w-0">
                                                <div className={cardCls}>{inner}</div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </section>
                    );
                })}

                {/*
                  프로젝트 → GitHub. 조직이 공개한 결과물을 소개한다.
                */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.repos.title}
                                </h2>
                                <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.repos.lead}
                                </p>
                            </div>
                            <a
                                href={SITE.github}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-[14px] font-semibold text-[var(--color-ink)] transition hover:border-[#bcd0f5] hover:text-[#2461d8]"
                            >
                                {t.repos.org}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>

                        <ul className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {LAB_PROJECTS.map((proj) => (
                                <li
                                    key={proj.id}
                                    className="flex h-full min-w-0 flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7"
                                >
                                    <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {en ? proj.titleEn : proj.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {en ? proj.descEn : proj.desc}
                                    </p>

                                    {/*
                                      저장소 칩 — 이름과 한 줄 설명까지만 둔다.
                                      스타·커밋 같은 활동 수치는 붙이지 않는다.
                                    */}
                                    <ul className="mt-5 flex flex-1 flex-col gap-2">
                                        {toolsFor(proj).map((tool) => (
                                            <li key={tool.id}>
                                                <a
                                                    href={repoUrl(tool)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group flex min-w-0 flex-col gap-0.5 rounded-lg px-3 py-2 transition hover:bg-[var(--color-surface-alt)] sm:flex-row sm:items-baseline sm:gap-2.5"
                                                >
                                                    <span className="flex items-center gap-1.5 font-mono text-[13.5px] font-semibold text-[#2461d8]">
                                                        {MEMBER_TOOL_NAMES[tool.id] ?? tool.name}
                                                        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                                                    </span>
                                                    <span className="min-w-0 text-[13px] leading-snug text-[var(--color-ink-subtle)] sm:truncate">
                                                        {tool.tagline}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={href("/library-gallery")}
                            className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:gap-2.5"
                        >
                            {t.repos.gallery}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/*
                  이 사람들이 무엇을 내놓는지 — XGEN 프리뷰·테크 노트·현장 리포트.
                  블로그 카테고리 세 갈래로 그대로 보낸다(키는 blog-list.tsx 참고).
                */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.output.title}
                        </h2>
                        <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.output.lead}
                        </p>

                        <ul className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.output.items.map((o) => (
                                <li key={o.key}>
                                    <Link
                                        href={href(`/blog?cat=${o.key}`)}
                                        className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                    >
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <o.icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {o.title}
                                        </h3>
                                        <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {o.desc}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                            {o.cta}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={href("/blog")}
                            className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:gap-2.5"
                        >
                            {t.allPosts}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
