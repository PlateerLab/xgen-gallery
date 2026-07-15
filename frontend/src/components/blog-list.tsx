"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, PenLine, X } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { ViewCount } from "@/components/view-count";

const ALL = "전체";
const TABS = [ALL, "제품 소식", "Tech Note", "Case Study"] as const;
type Tab = (typeof TABS)[number];

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

/** 카테고리별 브랜드 테마 — 커버 없는 글의 썸네일·라벨에 쓰인다. */
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

function fmtDate(d: string) {
    return d.replaceAll("-", ".");
}

/** 커버 이미지가 있으면 그대로, 없으면 카테고리 브랜드 썸네일을 렌더. */
function Thumb({ post, className }: { post: PostMeta; className?: string }) {
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
                className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-30"
                style={{ background: th.ink }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <span
                    className="font-mono text-[13px] font-bold uppercase tracking-[0.28em]"
                    style={{ color: th.ink }}
                >
                    {th.word}
                </span>
                {post.tags[0] && (
                    <span
                        className="rounded-full bg-white/70 px-3 py-1 text-[12.5px] font-semibold"
                        style={{ color: th.ink }}
                    >
                        #{post.tags[0]}
                    </span>
                )}
            </div>
        </div>
    );
}

/** 작성자 아바타 + 이름 + 조회수 한 줄. */
function AuthorRow({ post }: { post: PostMeta }) {
    return (
        <span className="flex min-w-0 items-center gap-2 text-[13.5px] text-[var(--color-ink-muted)]">
            {post.authorGithub ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={`https://github.com/${post.authorGithub}.png`}
                    alt=""
                    loading="lazy"
                    className="h-6 w-6 flex-none rounded-full ring-1 ring-[var(--color-line)]"
                />
            ) : (
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-[11px] font-bold text-[var(--color-ink-subtle)]">
                    {post.author.slice(0, 1)}
                </span>
            )}
            <span className="truncate font-medium">{post.author}</span>
            <span aria-hidden className="text-[var(--color-ink-subtle)]">
                ·
            </span>
            <ViewCount slug={post.slug} readOnly compact />
        </span>
    );
}

export function BlogList({ posts }: { posts: PostMeta[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    // 활성 카테고리는 URL(?cat=)에서 반응형으로 읽는다. /blog에 머문 상태에서 다른
    // 카테고리 서브메뉴를 눌러 URL만 바뀌어도(리마운트 없이) 필터가 갱신된다.
    const key = searchParams.get("cat");
    const active: Tab = (key && CATEGORY_BY_KEY[key]) || ALL;
    // 주제(태그) 필터 — 카테고리와 AND로 조합. URL ?tag= 에서 읽는다.
    const activeTag = searchParams.get("tag");
    // 작성자 필터 — 멤버 카드의 "더보기"에서 진입. URL ?author= 에서 읽는다.
    const activeAuthor = searchParams.get("author");

    // author 필터는 최상위 스코프 — 카테고리/태그/카운트 모두 이 집합에서 파생된다.
    const scoped = useMemo(
        () => (activeAuthor ? posts.filter((p) => p.author === activeAuthor) : posts),
        [posts, activeAuthor],
    );

    // cat/tag/author 세 파라미터를 함께 관리하는 단일 URL 빌더(author는 기본 유지).
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

    // 탭 클릭 → 카테고리 변경 시 주제 필터는 초기화(다른 카테고리엔 없을 수 있음).
    const selectTab = (t: Tab) => pushParams(KEY_BY_CATEGORY[t], null);
    // 주제 칩 클릭 → 현재 카테고리는 유지, 같은 칩 재클릭 시 해제(토글).
    const selectTag = (tag: string) =>
        pushParams(KEY_BY_CATEGORY[active], tag === activeTag ? null : tag);

    // 현재 카테고리에 속한 글에서 주제(태그)를 빈도순으로 뽑아 칩으로 노출.
    const catPosts = useMemo(
        () => (active === ALL ? scoped : scoped.filter((p) => p.category === active)),
        [scoped, active],
    );
    const topicTags = useMemo(() => {
        const count = new Map<string, number>();
        catPosts.forEach((p) => p.tags.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
        return [...count.entries()]
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map(([t]) => t);
    }, [catPosts]);

    const filtered = activeTag
        ? catPosts.filter((p) => p.tags.includes(activeTag))
        : catPosts;

    // 필터가 없을 때만 최신 글을 대형 피처드로. 나머지는 그리드로.
    const isUnfiltered = active === ALL && !activeTag && !activeAuthor;
    const featured = isUnfiltered && filtered.length > 0 ? filtered[0] : null;
    const gridPosts = featured ? filtered.slice(1) : filtered;

    // Tech Note 탭 전용 — 기고자(작성자) 인덱스. 작성자 필터와 무관하게 전체 Tech Note에서 뽑는다.
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

    // 기고자 칩 클릭 → 카테고리(Tech Note)·주제 유지, 같은 칩 재클릭 시 해제(토글).
    const selectAuthor = (name: string) =>
        pushParams(
            KEY_BY_CATEGORY[active],
            activeTag,
            name === activeAuthor ? null : name,
        );

    return (
        <div>
            {/* 작성자 필터 배너 — 멤버 글 모아보기 진입 시 */}
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

            {/* 카테고리 탭 — 가로 스크롤 세그먼트 */}
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

            {/* 기고자 인덱스 — Tech Note 카테고리에서만 노출. 아바타 + 이름 + 글 수. */}
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

            {/* 주제(태그) 필터 — 해시태그 키워드 칩 */}
            {topicTags.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                    <span className="mr-1 text-[12.5px] font-semibold uppercase tracking-wider text-[var(--color-ink-subtle)]">
                        주제
                    </span>
                    {activeTag && (
                        <button
                            type="button"
                            onClick={() => selectTag(activeTag)}
                            className="inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[13px] font-medium text-[var(--color-ink-subtle)] transition hover:text-[var(--color-ink)]"
                        >
                            <X className="h-3.5 w-3.5" />
                            전체
                        </button>
                    )}
                    {topicTags.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => selectTag(t)}
                            className={cn(
                                "inline-flex items-center gap-0.5 rounded-md px-2.5 py-1 text-[13.5px] font-medium transition",
                                activeTag === t
                                    ? "bg-[#2f7bff] text-white shadow-[0_2px_8px_-2px_rgba(47,123,255,0.5)]"
                                    : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)] hover:bg-[#eaf1ff] hover:text-[#2461d8]",
                            )}
                        >
                            <span
                                className={cn(
                                    "font-semibold",
                                    activeTag === t
                                        ? "text-white/60"
                                        : "text-[var(--color-ink-subtle)]",
                                )}
                            >
                                #
                            </span>
                            {t}
                        </button>
                    ))}
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-line-strong)] bg-[var(--color-surface-alt)] p-12 text-center">
                    <p className="text-[16px] text-[var(--color-ink-muted)]">
                        해당 카테고리의 글을 준비 중입니다
                    </p>
                </div>
            ) : (
                <div className="mt-8">
                    {/* 대형 피처드 아티클 */}
                    {featured && (
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group mb-12 grid overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white transition hover:shadow-[0_28px_64px_-28px_rgba(20,40,80,0.32)] md:grid-cols-2"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[320px]">
                                <Thumb
                                    post={featured}
                                    className="transition duration-500 group-hover:scale-[1.03]"
                                />
                                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[var(--color-ink)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                                    Featured
                                </span>
                            </div>
                            <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
                                <div className="flex items-center gap-2 text-[13.5px] text-[var(--color-ink-subtle)]">
                                    <span className="rounded-full bg-[#2f7bff]/10 px-2.5 py-0.5 font-semibold text-[#2461d8]">
                                        {featured.category}
                                    </span>
                                    <time dateTime={featured.date}>
                                        {fmtDate(featured.date)}
                                    </time>
                                    <span aria-hidden>·</span>
                                    <ViewCount slug={featured.slug} readOnly compact />
                                </div>
                                <h2 className="text-[24px] font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[32px] md:leading-[1.15]">
                                    {featured.title}
                                </h2>
                                <p className="line-clamp-3 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {featured.description}
                                </p>
                                <div className="mt-1 flex items-center justify-between gap-3">
                                    <AuthorRow post={featured} />
                                    <span className="inline-flex flex-none items-center gap-1.5 text-[15px] font-semibold text-[#2461d8]">
                                        읽어보기
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* 커버 중심 3열 그리드 */}
                    {gridPosts.length > 0 && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {gridPosts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/blog/${p.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:-translate-y-0.5 hover:border-[#bcd0f5] hover:shadow-[0_18px_44px_-22px_rgba(20,40,80,0.28)]"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Thumb
                                            post={p}
                                            className="transition duration-500 group-hover:scale-[1.04]"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-center gap-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                                            <span className="rounded-full bg-[#2f7bff]/10 px-2 py-0.5 font-semibold text-[#2461d8]">
                                                {p.category}
                                            </span>
                                            <time dateTime={p.date}>{fmtDate(p.date)}</time>
                                            <span aria-hidden>·</span>
                                            <ViewCount slug={p.slug} readOnly compact />
                                        </div>
                                        <h3 className="mt-3 line-clamp-2 text-[18px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                            {p.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {p.description}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                                            <AuthorRow post={p} />
                                            <ArrowUpRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:text-[#2461d8]" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
