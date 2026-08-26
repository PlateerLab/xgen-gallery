import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import { LAB_MEMBERS, LAB_GROUPS, type LabGroup } from "@/lib/lab-members";
import { LabMembersVisual } from "@/components/lab-members-visual";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

/**
 * 랩 멤버스 — 구성원과 그 사람이 쓴 글을 함께 보여준다.
 *
 * 사진과 이름, 역할까지만 싣는다. GitHub 계정·이메일·활동 이력은 넣지 않는다 —
 * 그 조합이 모이면 채용 타깃 명단이 된다. 대신 글을 붙여, 이 페이지에 무언가를
 * 더 남기는 방법이 기여라는 것이 드러나게 한다.
 */

interface Copy {
    eyebrow: string;
    title: string;
    lead: string;
    wrote: (n: number) => string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    allPosts: string;
}

const COPY: Record<Locale, Copy> = {
    ko: {
        eyebrow: "AI Lab Members",
        title: "AI를 연구하고, 현실에 구현하는 사람들",
        lead: "Plateer AI Labs를 만드는 연구원과 엔지니어를 소개합니다. 연구부터 제품 개발, 고객 적용까지 Enterprise AI를 현실로 만드는 사람들의 경험과 인사이트를 함께 전합니다.",
        wrote: (n) => `테크노트 ${n}편`,
        ctaTitle: "블로그에 글을 쓰고 싶다면",
        ctaDesc:
            "연구 과정에서 알게 된 것, 현장에서 부딪힌 문제, 오픈소스를 만들며 배운 것 — 무엇이든 좋습니다. 기고 방법을 안내해 드립니다.",
        ctaBtn: "기고 문의",
        allPosts: "글 전체 보기",
    },
    en: {
        eyebrow: "AI Lab Members",
        title: "The people who research AI and build it for real",
        lead: "The researchers and engineers who make Plateer AI Labs. From research through product development to customer deployment, they turn enterprise AI into something real — and share what they learn along the way.",
        wrote: (n) => `${n} tech ${n === 1 ? "note" : "notes"}`,
        ctaTitle: "Want to write for the blog?",
        ctaDesc:
            "Something you learned while researching, a problem you hit in the field, what building open source taught you — any of it works.",
        ctaBtn: "Ask about contributing",
        allPosts: "See all posts",
    },
};

export function LabMembersPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const en = locale === "en";
    const href = (path: string) => localeHref(locale, path);

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
                                        const posts = m.blogAuthor
                                            ? (byAuthor.get(m.blogAuthor) ?? [])
                                            : [];
                                        /*
                                          글이 있으면 카드 전체가 그 사람의 최신 글로
                                          가는 링크가 된다. 제목을 카드에 늘어놓으면
                                          카드 높이가 사람마다 달라지고, 정작 사람은
                                          글 목록의 머리말처럼 읽힌다.
                                        */
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
                                                        {m.name}
                                                    </h3>
                                                    <p className="mt-0.5 text-[12.5px] leading-snug text-[var(--color-ink-muted)]">
                                                        {en ? m.roleEn : m.role}
                                                    </p>
                                                    {/* 한글 라벨이라 font-mono·uppercase 를 쓰지 않는다 — 자간이 벌어지고 글자가 깨져 보인다 */}
                                                    {latest && (
                                                        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[12.5px] font-semibold text-[#2461d8] transition group-hover:gap-1.5">
                                                            {t.wrote(posts.length)}
                                                            <ArrowRight className="h-3 w-3" />
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        );
                                        return (
                                            <li key={m.slug}>
                                                {latest ? (
                                                    <Link
                                                        href={href(`/blog/${latest.slug}`)}
                                                        className={`group ${cardCls} transition hover:-translate-y-0.5 hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]`}
                                                    >
                                                        {inner}
                                                    </Link>
                                                ) : (
                                                    <div className={cardCls}>{inner}</div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </section>
                    );
                })}

                {/* 기고 유도 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="flex flex-col gap-5 rounded-2xl border border-[var(--color-line)] bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
                            <div className="max-w-2xl">
                                <h2 className="flex items-center gap-2 text-[21px] font-bold tracking-tight text-[var(--color-ink)]">
                                    <PenLine className="h-5 w-5 text-[#2f7bff]" />
                                    {t.ctaTitle}
                                </h2>
                                <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.ctaDesc}
                                </p>
                            </div>
                            <div className="flex flex-none flex-col gap-2 sm:items-end">
                                <Link
                                    href={href("/contact")}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#2461d8]"
                                >
                                    {t.ctaBtn}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={href("/blog")}
                                    className="inline-flex items-center gap-1.5 px-2 text-[14px] font-semibold text-[#2461d8] transition hover:gap-2.5"
                                >
                                    {t.allPosts}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
