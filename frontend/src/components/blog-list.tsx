"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Flame,
    Layers,
    PenLine,
    X,
} from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { groupSeries } from "@/lib/series";
import { ViewCount } from "@/components/view-count";

const ALL = "전체";
const TABS = [ALL, "제품 소식", "Tech Note", "Case Study"] as const;
type Tab = (typeof TABS)[number];
const PAGE_SIZE = 5;

/** GNB 서브메뉴 딥링크용: /blog?cat=<key> → 카테고리 라벨. */
const CATEGORY_BY_KEY: Record<string, Tab> = {
    product: "제품 소식",
    labs: "Tech Note",
    case: "Case Study",
};
const KEY_BY_CATEGORY: Partial<Record<Tab, string>> = {
    "제품 소식": "product",
    "Tech Note": "labs",
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
function PopularList({ posts }: { posts: PostMeta[] }) {
    const base = useMemo(() => posts.slice(0, 5), [posts]);
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
                    .slice(0, 5),
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
                인기 있는 글
            </div>
            <ol className="mt-4 space-y-4">
                {ranked.map((p, i) => (
                    <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="group flex gap-3">
                            <span className="w-5 flex-none text-[19px] font-black leading-none text-[#c7d3ee] group-hover:text-[#2f7bff]">
                                {i + 1}
                            </span>
                            <div className="min-w-0">
                                <h4 className="line-clamp-2 text-[14.5px] font-bold leading-snug text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
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

export function BlogList({ posts }: { posts: PostMeta[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const key = searchParams.get("cat");
    const active: Tab = (key && CATEGORY_BY_KEY[key]) || ALL;
    const activeTag = searchParams.get("tag");
    const activeAuthor = searchParams.get("author");

    const [page, setPage] = useState(1);
    // 필터가 바뀌면 1페이지로 리셋.
    useEffect(() => {
        setPage(1);
    }, [active, activeTag, activeAuthor]);

    const scoped = useMemo(
        () => (activeAuthor ? posts.filter((p) => p.author === activeAuthor) : posts),
        [posts, activeAuthor],
    );

    const pushParams = (
        catKey: string | undefined,
        tag: string | null,
        author: string | null = activeAuthor,
    ) => {
        const sp = new URLSearchParams();
        if (catKey) sp.set("cat", catKey);
        if (tag) sp.set("tag", tag);
        if (author) sp.set("author", author);
        const qs = sp.toString();
        router.replace(qs ? `/blog?${qs}` : "/blog", { scroll: false });
    };

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
    const safePage = Math.min(page, totalPages);
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
                        님의 글 {scoped.length}건
                    </p>
                    <button
                        type="button"
                        onClick={() => pushParams(KEY_BY_CATEGORY[active], activeTag, null)}
                        className="text-[14px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        전체 글 보기
                    </button>
                </div>
            )}

            {/* 카테고리 탭 */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {TABS.map((t) => {
                    const count =
                        t === ALL
                            ? scoped.length
                            : scoped.filter((p) => p.category === t).length;
                    return (
                        <button
                            key={t}
                            type="button"
                            onClick={() => selectTab(t)}
                            className={cn(
                                "flex-none rounded-full px-4 py-2 text-[15px] font-semibold transition",
                                active === t
                                    ? "bg-[var(--color-ink)] text-white shadow-sm"
                                    : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)] hover:bg-[#e8edf6] hover:text-[var(--color-ink)]",
                            )}
                        >
                            {t}
                            <span
                                className={cn(
                                    "ml-1.5 text-[13px] tabular-nums",
                                    active === t
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
                        기고자
                        {activeAuthor && (
                            <button
                                type="button"
                                onClick={() => selectAuthor(activeAuthor)}
                                className="ml-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11.5px] font-semibold normal-case tracking-normal text-[var(--color-ink-subtle)] transition hover:text-[var(--color-ink)]"
                            >
                                <X className="h-3 w-3" />
                                전체
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
                        해당 카테고리의 글을 준비 중입니다
                    </p>
                </div>
            ) : (
                <>
                    {/* 아티클 시리즈 섹션 (전체 탭에서만, 풀폭) */}
                    {showSeries && (
                        <section className="mb-14">
                            <h2 className="mb-5 flex items-center gap-2 text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                                <Layers className="h-5 w-5 text-[#4f46e5]" />
                                아티클 시리즈
                            </h2>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {seriesList.map((g) => (
                                    <Link
                                        key={g.def.key}
                                        href={`/blog/series/${g.def.key}`}
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
                                            {g.def.title}
                                        </h3>
                                        <p className="mt-1.5 line-clamp-2 px-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {g.def.subtitle}
                                        </p>
                                        <span className="mt-4 mb-1 ml-1 inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-[var(--color-ink-muted)] ring-1 ring-[var(--color-line)]">
                                            아티클 {g.posts.length}개
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
                                전체 아티클
                            </h2>

                            {/* 단독 글 목록(페이징) */}
                            {pagePosts.length > 0 ? (
                                <div className="space-y-4">
                                    {pagePosts.map((p) => (
                                        <Link
                                            key={p.slug}
                                            href={`/blog/${p.slug}`}
                                            className="group flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-3 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-20px_rgba(20,40,80,0.28)]"
                                        >
                                            <div className="relative aspect-[4/3] w-[128px] flex-none overflow-hidden rounded-xl sm:w-[176px]">
                                                <Thumb
                                                    post={p}
                                                    className="transition duration-500 group-hover:scale-[1.04]"
                                                />
                                            </div>
                                            <div className="flex min-w-0 flex-1 flex-col py-1">
                                                <div className="flex items-center gap-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                                                    <span className="rounded-full bg-[#2f7bff]/10 px-2 py-0.5 font-semibold text-[#2461d8]">
                                                        {p.category}
                                                    </span>
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
                                    표시할 글이 없습니다
                                </p>
                            )}

                            {/* 페이지네이션 */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex items-center justify-center gap-1.5">
                                    <button
                                        type="button"
                                        aria-label="이전"
                                        disabled={safePage === 1}
                                        onClick={() => setPage(safePage - 1)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (n) => (
                                            <button
                                                key={n}
                                                type="button"
                                                onClick={() => setPage(n)}
                                                className={cn(
                                                    "h-9 min-w-9 rounded-lg px-3 text-[14px] font-bold transition",
                                                    n === safePage
                                                        ? "bg-[var(--color-ink)] text-white"
                                                        : "border border-[var(--color-line)] text-[var(--color-ink-muted)] hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]",
                                                )}
                                            >
                                                {n}
                                            </button>
                                        ),
                                    )}
                                    <button
                                        type="button"
                                        aria-label="다음"
                                        disabled={safePage === totalPages}
                                        onClick={() => setPage(safePage + 1)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
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
