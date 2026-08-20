"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Flame,
    Layers,
    PenLine,
    X,
} from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import {
    categoryLabel,
    VISIBLE_BLOG_CATEGORIES,
    WIDE_THUMB_CATEGORIES,
} from "@/lib/blog-categories";
import { localeHref } from "@/lib/locale-path";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { groupSeries, seriesCopy, seriesOf } from "@/lib/series";
import { ViewCount } from "@/components/view-count";

/** 목록 화면 문구. 카테고리 값은 lib/blog.ts 가 한국어로 정규화해 두므로 여기선 라벨만 바꾼다. */
const COPY: Record<
    Locale,
    {
        all: string;
        popular: string;
        authorPosts: (n: number) => string;
        seeAll: string;
        contributors: string;
        clear: string;
        empty: string;
        seriesTitle: string;
        seriesCount: (n: number) => string;
        allArticles: string;
        nothing: string;
        prev: string;
        next: string;
    }
> = {
    ko: {
        all: "전체",
        popular: "인기 있는 글",
        authorPosts: (n) => `님의 글 ${n}건`,
        seeAll: "전체 글 보기",
        contributors: "기고자",
        clear: "전체",
        empty: "해당 카테고리의 글을 준비 중입니다",
        seriesTitle: "아티클 시리즈",
        seriesCount: (n) => `아티클 ${n}개`,
        allArticles: "전체 아티클",
        nothing: "표시할 글이 없습니다",
        prev: "이전",
        next: "다음",
    },
    en: {
        all: "All",
        popular: "Most read",
        authorPosts: (n) => ` — ${n} ${n === 1 ? "post" : "posts"}`,
        seeAll: "See all posts",
        contributors: "Contributors",
        clear: "All",
        empty: "Posts in this category are on the way",
        seriesTitle: "Article series",
        seriesCount: (n) => `${n} ${n === 1 ? "article" : "articles"}`,
        allArticles: "All articles",
        nothing: "Nothing to show",
        prev: "Previous",
        next: "Next",
    },
};

const ALL = "전체";
// 노출 카테고리는 lib/blog-categories.ts 가 단일 출처다(감춘 것도 거기서 정한다).
const TABS = [ALL, ...VISIBLE_BLOG_CATEGORIES] as const;
type Tab = (typeof TABS)[number] | "Case Study";
const PAGE_SIZE = 5;

/** GNB 서브메뉴 딥링크용: /blog?cat=<key> → 카테고리 라벨. */
const CATEGORY_BY_KEY: Record<string, Tab> = {
    product: "제품 소식",
    labs: "Tech Note",
    industry: "Industry Note",
    // 탭에서는 감췄지만 기존 링크·북마크가 죽지 않도록 키는 남겨 둔다.
    case: "Case Study",
};
const KEY_BY_CATEGORY: Partial<Record<Tab, string>> = {
    "제품 소식": "product",
    "Tech Note": "labs",
    "Industry Note": "industry",
    "Case Study": "case",
};

/** 카테고리별 브랜드 테마 — 커버 없는 글의 썸네일에 쓰인다. */
const CAT_THEME: Record<string, { grad: string; ink: string; word: string }> = {
    "제품 소식": {
        grad: "linear-gradient(135deg,#eaf1ff 0%,#d3e4ff 100%)",
        ink: "#2461d8",
        word: "PRODUCT",
    },
    "Tech Note": {
        grad: "linear-gradient(135deg,#edefff 0%,#dee1ff 100%)",
        ink: "#5348d6",
        word: "TECH NOTE",
    },
    "Case Study": {
        grad: "linear-gradient(135deg,#eafaf1 0%,#d6f2e2 100%)",
        ink: "#1f9d57",
        word: "CASE STUDY",
    },
    // 저장 값은 Industry Note 지만 화면 표기는 Field Note 다(blog-categories.ts).
    "Industry Note": {
        grad: "linear-gradient(135deg,#fff1e8 0%,#ffe0cc 100%)",
        ink: "#c2570d",
        word: "FIELD NOTE",
    },
};

export function fmtDate(d: string) {
    return d.replaceAll("-", ".");
}

/** 커버 이미지가 있으면 그대로, 없으면 카테고리 브랜드 썸네일을 렌더. */
export function Thumb({ post, className }: { post: PostMeta; className?: string }) {
    if (post.cover) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={post.cover}
                alt=""
                loading="lazy"
                className={cn("h-full w-full object-cover", className)}
            />
        );
    }
    const th = CAT_THEME[post.category] ?? CAT_THEME["Tech Note"];
    return (
        <div
            className={cn("relative h-full w-full overflow-hidden", className)}
            style={{ background: th.grad }}
        >
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(20,40,80,0.10) 1px, transparent 1px)",
                    backgroundSize: "15px 15px",
                }}
            />
            <div
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30"
                style={{ background: th.ink }}
            />
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                <span
                    className="font-mono text-[12px] font-bold uppercase tracking-[0.26em]"
                    style={{ color: th.ink }}
                >
                    {th.word}
                </span>
            </div>
        </div>
    );
}

/** 작성자 아바타 + 이름 + 조회수 한 줄. */
function AuthorRow({ post }: { post: PostMeta }) {
    return (
        <span className="flex min-w-0 items-center gap-2 text-[13px] text-[var(--color-ink-muted)]">
            {post.authorGithub ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={`https://github.com/${post.authorGithub}.png`}
                    alt=""
                    loading="lazy"
                    className="h-5 w-5 flex-none rounded-full ring-1 ring-[var(--color-line)]"
                />
            ) : (
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-[10px] font-bold text-[var(--color-ink-subtle)]">
                    {post.author.slice(0, 1)}
                </span>
            )}
            <span className="truncate font-medium">{post.author}</span>
            <ViewCount slug={post.slug} readOnly compact />
        </span>
    );
}

/** 인기 있는 글 — 조회수로 랭킹(백엔드), 실패 시 최신순 폴백. */
const POPULAR_COUNT = 9;

function PopularList({ posts }: { posts: PostMeta[] }) {
    const { locale } = useI18n();
    const t = COPY[locale];
    const base = useMemo(() => posts.slice(0, POPULAR_COUNT), [posts]);
    const [ranked, setRanked] = useState<PostMeta[]>(base);

    useEffect(() => {
        let alive = true;
        Promise.all(
            posts.map((p) =>
                fetch(`/api/views/${encodeURIComponent(p.slug)}`)
                    .then((r) => (r.ok ? r.json() : null))
                    .then((d) => ({
                        p,
                        c: d && typeof d.count === "number" ? d.count : -1,
                    }))
                    .catch(() => ({ p, c: -1 })),
            ),
        ).then((arr) => {
            if (!alive) return;
            if (arr.every((x) => x.c < 0)) return; // 데이터 없음 → 최신순 유지
            setRanked(
                arr
                    .sort((a, b) => b.c - a.c)
                    .map((x) => x.p)
                    .slice(0, POPULAR_COUNT),
            );
        });
        return () => {
            alive = false;
        };
    }, [posts]);

    if (ranked.length === 0) return null;
    return (
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
            <div className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wider text-[var(--color-ink-subtle)]">
                <Flame className="h-3.5 w-3.5 text-[#ff7a3d]" />
                {t.popular}
            </div>
            <ol className="mt-4 space-y-4">
                {ranked.map((p, i) => (
                    <li key={p.slug}>
                        <Link href={localeHref(locale, `/blog/${p.slug}`)} className="group flex gap-3">
                            <span className="w-5 flex-none text-[19px] font-black leading-none text-[#c7d3ee] group-hover:text-[#2f7bff]">
                                {i + 1}
                            </span>
                            <div className="min-w-0">
                                <h4 className="line-clamp-2 text-[14.5px] font-bold leading-snug text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                    {seriesOf(p.slug) && (
                                        <span className="mr-1 align-[1px] text-[11.5px] font-extrabold text-[#0f766e]">
                                            [{seriesCopy(seriesOf(p.slug)!, locale === "en").label}]
                                        </span>
                                    )}
                                    {p.title}
                                </h4>
                                <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[var(--color-ink-subtle)]">
                                    <time dateTime={p.date}>{fmtDate(p.date)}</time>
                                    <ViewCount slug={p.slug} readOnly compact />
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}

/**
 * 필터·페이지는 URL 쿼리가 단일 출처이고, 값은 서버(page.tsx → BlogIndexPageContent)에서
 * props 로 내려온다. 예전에는 이 컴포넌트가 useSearchParams() 로 직접 읽었는데, 그러면
 * 정적 렌더 라우트에서 CSR 바로 이탈이 일어나 감싸고 있던 <Suspense fallback={null}> 이
 * 그대로 HTML 로 나가면서 글 목록 링크가 서버 HTML 에 하나도 남지 않았다
 * (검색엔진이 글 39편을 링크로 발견하지 못하던 원인). props 로 받으면 목록이 SSR 된다.
 */
export function BlogList({
    posts,
    cat,
    tag,
    author,
    page,
}: {
    posts: PostMeta[];
    cat?: string;
    tag?: string;
    author?: string;
    page?: number;
}) {
    const { locale } = useI18n();
    const t = COPY[locale];
    const en = locale === "en";
    const router = useRouter();

    const active: Tab = (cat && CATEGORY_BY_KEY[cat]) || ALL;
    const activeTag = tag ?? null;
    const activeAuthor = author ?? null;

    const scoped = useMemo(
        () => (activeAuthor ? posts.filter((p) => p.author === activeAuthor) : posts),
        [posts, activeAuthor],
    );

    /**
     * 목록 상태를 그대로 담은 URL — 탭·태그·작성자·페이지가 전부 쿼리에 들어간다.
     * 페이지네이션이 이 주소를 <Link> 로 걸기 때문에 크롤러도 2페이지 이후의 글까지
     * 링크로 따라올 수 있다. 로케일 접두사(/en)는 localeHref 가 붙인다.
     */
    const hrefFor = (
        catKey: string | undefined,
        tagValue: string | null,
        authorValue: string | null,
        pageValue = 1,
    ) => {
        const sp = new URLSearchParams();
        if (catKey) sp.set("cat", catKey);
        if (tagValue) sp.set("tag", tagValue);
        if (authorValue) sp.set("author", authorValue);
        if (pageValue > 1) sp.set("page", String(pageValue));
        const qs = sp.toString();
        return localeHref(locale, qs ? `/blog?${qs}` : "/blog");
    };

    // 필터를 바꾸면 항상 1페이지부터 다시 본다.
    const pushParams = (
        catKey: string | undefined,
        tagValue: string | null,
        authorValue: string | null = activeAuthor,
    ) =>
        router.replace(hrefFor(catKey, tagValue, authorValue), {
            scroll: false,
        });

    const selectTab = (t: Tab) => pushParams(KEY_BY_CATEGORY[t], null);

    const catPosts = useMemo(
        () => (active === ALL ? scoped : scoped.filter((p) => p.category === active)),
        [scoped, active],
    );
    const filtered = activeTag
        ? catPosts.filter((p) => p.tags.includes(activeTag))
        : catPosts;

    // "아티클 시리즈" 섹션 — 전체 글에서 시리즈 그룹(필터 무관). 전체 탭에서만 노출.
    const seriesList = useMemo(() => groupSeries(posts), [posts]);
    const showSeries =
        active === ALL && !activeTag && !activeAuthor && seriesList.length > 0;

    // 전체 아티클 목록 = 현재 필터 결과(시리즈 글도 피드에 함께 노출).
    const listPosts = filtered;

    const totalPages = Math.max(1, Math.ceil(listPosts.length / PAGE_SIZE));
    const safePage = Math.min(Math.max(page ?? 1, 1), totalPages);
    const pageHref = (n: number) =>
        hrefFor(KEY_BY_CATEGORY[active], activeTag, activeAuthor, n);
    const pagePosts = listPosts.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE,
    );

    // Tech Note 탭 전용 — 기고자 인덱스.
    const techNoteAuthors = useMemo<
        { name: string; count: number; github?: string }[]
    >(() => {
        if (active !== "Tech Note") return [];
        const map = new Map<
            string,
            { name: string; count: number; github?: string }
        >();
        posts
            .filter((p) => p.category === "Tech Note")
            .forEach((p) => {
                const cur = map.get(p.author);
                if (cur) cur.count += 1;
                else
                    map.set(p.author, {
                        name: p.author,
                        count: 1,
                        github: p.authorGithub,
                    });
            });
        return [...map.values()].sort(
            (a, b) => b.count - a.count || a.name.localeCompare(b.name),
        );
    }, [posts, active]);

    const selectAuthor = (name: string) =>
        pushParams(
            KEY_BY_CATEGORY[active],
            activeTag,
            name === activeAuthor ? null : name,
        );

    return (
        <div>
            {/* 작성자 필터 배너 */}
            {activeAuthor && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe0ff] bg-[#f1f6ff] px-5 py-4">
                    <p className="text-[15px] text-[var(--color-ink-muted)]">
                        <span className="font-bold text-[var(--color-ink)]">
                            {activeAuthor}
                        </span>{" "}
                        {t.authorPosts(scoped.length)}
                    </p>
                    <button
                        type="button"
                        onClick={() => pushParams(KEY_BY_CATEGORY[active], activeTag, null)}
                        className="text-[14px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        {t.seeAll}
                    </button>
                </div>
            )}

            {/* 카테고리 탭 */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {TABS.map((tab) => {
                    const count =
                        tab === ALL
                            ? scoped.length
                            : scoped.filter((p) => p.category === tab).length;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => selectTab(tab)}
                            className={cn(
                                "flex-none rounded-full px-4 py-2 text-[15px] font-semibold transition",
                                active === tab
                                    ? "bg-[var(--color-ink)] text-white shadow-sm"
                                    : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)] hover:bg-[#e8edf6] hover:text-[var(--color-ink)]",
                            )}
                        >
                            {tab === ALL ? t.all : categoryLabel(tab, locale)}
                            <span
                                className={cn(
                                    "ml-1.5 text-[13px] tabular-nums",
                                    active === tab
                                        ? "text-white/60"
                                        : "text-[var(--color-ink-subtle)]",
                                )}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 기고자 인덱스 — Tech Note 전용 */}
            {active === "Tech Note" && techNoteAuthors.length > 0 && (
                <div className="mt-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]/60 p-4">
                    <div className="mb-3 flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wider text-[var(--color-ink-subtle)]">
                        <PenLine className="h-3.5 w-3.5" />
                        {t.contributors}
                        {activeAuthor && (
                            <button
                                type="button"
                                onClick={() => selectAuthor(activeAuthor)}
                                className="ml-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11.5px] font-semibold normal-case tracking-normal text-[var(--color-ink-subtle)] transition hover:text-[var(--color-ink)]"
                            >
                                <X className="h-3 w-3" />
                                {t.clear}
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {techNoteAuthors.map((a) => {
                            const on = activeAuthor === a.name;
                            return (
                                <button
                                    key={a.name}
                                    type="button"
                                    onClick={() => selectAuthor(a.name)}
                                    className={cn(
                                        "group inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[14px] font-semibold transition",
                                        on
                                            ? "bg-[var(--color-ink)] text-white shadow-sm"
                                            : "bg-white text-[var(--color-ink-muted)] ring-1 ring-[var(--color-line)] hover:text-[#2461d8] hover:ring-[#bcd0f5]",
                                    )}
                                >
                                    {a.github ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={`https://github.com/${a.github}.png`}
                                            alt=""
                                            loading="lazy"
                                            className="h-6 w-6 rounded-full ring-1 ring-black/5"
                                        />
                                    ) : (
                                        <span
                                            className={cn(
                                                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold",
                                                on
                                                    ? "bg-white/20 text-white"
                                                    : "bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]",
                                            )}
                                        >
                                            {a.name.slice(0, 1)}
                                        </span>
                                    )}
                                    {a.name}
                                    <span
                                        className={cn(
                                            "rounded-full px-1.5 text-[11.5px] font-bold tabular-nums",
                                            on
                                                ? "bg-white/20 text-white"
                                                : "bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)] group-hover:bg-[#eaf1ff] group-hover:text-[#2461d8]",
                                        )}
                                    >
                                        {a.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 활성 주제(딥링크)일 때만 해제 칩 */}
            {activeTag && (
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => pushParams(KEY_BY_CATEGORY[active], null)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#2f7bff] px-3 py-1 text-[13px] font-semibold text-white transition hover:brightness-110"
                    >
                        #{activeTag}
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-line-strong)] bg-[var(--color-surface-alt)] p-12 text-center">
                    <p className="text-[16px] text-[var(--color-ink-muted)]">
                        {t.empty}
                    </p>
                </div>
            ) : (
                <>
                    {/* 아티클 시리즈 섹션 (전체 탭에서만, 풀폭) */}
                    {showSeries && (
                        <section className="mb-14">
                            <h2 className="mb-5 flex items-center gap-2 text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                                <Layers className="h-5 w-5 text-[#4f46e5]" />
                                {t.seriesTitle}
                            </h2>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {seriesList.map((g) => (
                                    <Link
                                        key={g.def.key}
                                        href={localeHref(locale, `/blog/series/${g.def.key}`)}
                                        className="group flex flex-col rounded-2xl bg-[var(--color-surface-alt)] p-3 transition hover:bg-[#eef2f9] hover:shadow-[0_18px_44px_-24px_rgba(20,40,80,0.3)]"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={g.def.cover}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                                            />
                                        </div>
                                        <h3 className="mt-4 line-clamp-2 px-1 text-[17px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                            {seriesCopy(g.def, en).title}
                                        </h3>
                                        <p className="mt-1.5 line-clamp-2 px-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {seriesCopy(g.def, en).subtitle}
                                        </p>
                                        <span className="mt-4 mb-1 ml-1 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-[var(--color-ink-muted)] ring-1 ring-[var(--color-line)]">
                                            {t.seriesCount(g.posts.length)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 좌: 전체 아티클 / 우: 인기 글 */}
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
                        <div>
                            <h2 className="mb-5 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.allArticles}
                            </h2>

                            {/* 단독 글 목록(페이징) */}
                            {pagePosts.length > 0 ? (
                                <div className="space-y-4">
                                    {pagePosts.map((p) => (
                                        <Link
                                            key={p.slug}
                                            href={localeHref(locale, `/blog/${p.slug}`)}
                                            className="group flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-3 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-20px_rgba(20,40,80,0.28)]"
                                        >
                                            {/* 필드 노트는 일러스트가 내용의 일부라 데스크톱에서 폭을
                                                넓게 준다(1/5 → 2/5). 모바일은 이미 그 비율이라 그대로. */}
                                            <div
                                                className={cn(
                                                    "relative aspect-[4/3] w-[128px] flex-none overflow-hidden rounded-xl",
                                                    WIDE_THUMB_CATEGORIES.includes(p.category)
                                                        ? "sm:w-[300px]"
                                                        : "sm:w-[176px]",
                                                )}
                                            >
                                                <Thumb
                                                    post={p}
                                                    className="transition duration-500 group-hover:scale-[1.04]"
                                                />
                                            </div>
                                            <div className="flex min-w-0 flex-1 flex-col py-1">
                                                <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                                                    <span className="rounded-full bg-[#2f7bff]/10 px-2 py-0.5 font-semibold text-[#2461d8]">
                                                        {categoryLabel(p.category, locale)}
                                                    </span>
                                                    {seriesOf(p.slug) && (
                                                        <span className="rounded-full bg-[#0d9488]/10 px-2 py-0.5 font-semibold text-[#0f766e]">
                                                            {seriesCopy(seriesOf(p.slug)!, en).title}
                                                        </span>
                                                    )}
                                                    <time dateTime={p.date}>
                                                        {fmtDate(p.date)}
                                                    </time>
                                                </div>
                                                <h3 className="mt-1.5 line-clamp-2 text-[17px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                                    {p.title}
                                                </h3>
                                                <p className="mt-1 hidden line-clamp-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)] sm:block">
                                                    {p.description}
                                                </p>
                                                <div className="mt-auto pt-2">
                                                    <AuthorRow post={p} />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[15px] text-[var(--color-ink-muted)]">
                                    {t.nothing}
                                </p>
                            )}

                            {/* 페이지네이션 — 버튼이 아니라 링크다. 2페이지 이후의 글도
                                크롤러가 <a href> 로 따라올 수 있어야 색인에 들어간다. */}
                            {totalPages > 1 && (
                                <nav
                                    aria-label={t.allArticles}
                                    className="mt-8 flex items-center justify-center gap-1.5"
                                >
                                    {safePage === 1 ? (
                                        <span
                                            aria-hidden
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink-muted)] opacity-40"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </span>
                                    ) : (
                                        <Link
                                            href={pageHref(safePage - 1)}
                                            scroll={false}
                                            aria-label={t.prev}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Link>
                                    )}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (n) => (
                                            <Link
                                                key={n}
                                                href={pageHref(n)}
                                                scroll={false}
                                                aria-current={n === safePage ? "page" : undefined}
                                                className={cn(
                                                    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-[14px] font-bold transition",
                                                    n === safePage
                                                        ? "bg-[var(--color-ink)] text-white"
                                                        : "border border-[var(--color-line)] text-[var(--color-ink-muted)] hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]",
                                                )}
                                            >
                                                {n}
                                            </Link>
                                        ),
                                    )}
                                    {safePage === totalPages ? (
                                        <span
                                            aria-hidden
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink-muted)] opacity-40"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </span>
                                    ) : (
                                        <Link
                                            href={pageHref(safePage + 1)}
                                            scroll={false}
                                            aria-label={t.next}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    )}
                                </nav>
                            )}
                        </div>

                        {/* 우: 인기 있는 글 */}
                        <aside className="lg:sticky lg:top-24 lg:self-start">
                            <PopularList posts={posts} />
                        </aside>
                    </div>
                </>
            )}
        </div>
    );
}
