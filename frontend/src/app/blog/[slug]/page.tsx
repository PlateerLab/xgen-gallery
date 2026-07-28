import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { ViewCount } from "@/components/view-count";
import { getAllPosts, getAllSlugs, getPost } from "@/lib/blog";
import { seriesOf, seriesPosts } from "@/lib/series";
import { blogPostingLd, breadcrumbLd, faqPageLd } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};
    const url = absoluteUrl(`/blog/${post.slug}`);
    return {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url,
            publishedTime: post.date,
            modifiedTime: post.updated || post.date,
            authors: [post.author],
            ...(post.cover ? { images: [absoluteUrl(post.cover)] } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

function fmtDate(d: string) {
    return d.replaceAll("-", ".");
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    // 시리즈 소속·이전/다음 편(내부 링크 강화 + 연속 열람 유도)
    const sdef = seriesOf(post.slug);
    const sposts = sdef ? seriesPosts(sdef, getAllPosts()) : [];
    const sIdx = sposts.findIndex((p) => p.slug === post.slug);
    const sPrev = sIdx > 0 ? sposts[sIdx - 1] : null;
    const sNext =
        sIdx >= 0 && sIdx < sposts.length - 1 ? sposts[sIdx + 1] : null;

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    blogPostingLd(post),
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Blog", path: "/blog" },
                        { name: post.title, path: `/blog/${post.slug}` },
                    ]),
                    ...(post.faq?.length
                        ? [
                              faqPageLd(
                                  post.faq.map((f) => ({
                                      question: f.q,
                                      answer: f.a,
                                  })),
                              ),
                          ]
                        : []),
                ]}
            />

            <section className="relative flex min-h-[380px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="insights" />
                <div className="relative mx-auto w-full max-w-3xl px-6 pt-16">
                    <div className="flex flex-wrap items-center gap-2 text-[14px] text-white/60">
                        <time dateTime={post.date}>{fmtDate(post.date)}</time>
                        <span>·</span>
                        <span>Reading Time | {post.readingMinutes} min</span>
                        <ViewCount slug={post.slug} />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-white/60">
                        <span className="inline-flex items-center gap-1.5">
                            작성 <span className="text-white/40">|</span>{" "}
                            {post.authorGithub ? (
                                <Link
                                    href={`/members/${post.authorGithub}`}
                                    className="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://github.com/${post.authorGithub}.png`}
                                        alt=""
                                        loading="lazy"
                                        className="h-5 w-5 rounded-full ring-1 ring-white/20"
                                    />
                                    <span className="underline-offset-2 hover:underline">
                                        {post.author}
                                    </span>
                                </Link>
                            ) : (
                                <span className="text-white/80">{post.author}</span>
                            )}
                        </span>
                        {post.editor && (
                            <span>
                                편집 <span className="text-white/40">|</span>{" "}
                                <span className="text-white/80">{post.editor}</span>
                            </span>
                        )}
                    </div>
                    {post.kicker && (
                        <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-semibold uppercase tracking-wide text-white/85">
                            {post.kicker}
                        </div>
                    )}
                    <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {post.title}
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-white/75">
                        {post.description}
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-3xl px-6 py-20">
                {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.cover}
                        alt=""
                        className="mb-12 aspect-[16/9] w-full rounded-2xl border border-[var(--color-line)] object-cover"
                    />
                )}
                {sdef && sIdx >= 0 && (
                    <Link
                        href={`/blog/series/${sdef.key}`}
                        className="group mb-8 flex items-center gap-3 rounded-2xl border border-[#dbe0ff] bg-[#f2f4ff] px-5 py-4 transition hover:border-[#b9c2ff]"
                    >
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#4f46e5]/10 text-[#4f46e5]">
                            <Layers className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#4f46e5]">
                                Series · {sdef.title}
                            </span>
                            <span className="mt-0.5 block text-[14.5px] font-semibold text-[var(--color-ink)]">
                                시리즈 {sIdx + 1}번째 글 · 전체 {sposts.length}편 보기
                            </span>
                        </span>
                        <ArrowRight className="h-4 w-4 flex-none text-[#4f46e5] transition group-hover:translate-x-0.5" />
                    </Link>
                )}

                {post.summary && (
                    <aside className="mb-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
                        <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#2461d8]">
                            핵심 요약
                        </p>
                        <p className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--color-ink)]">
                            {post.summary}
                        </p>
                    </aside>
                )}

                <article
                    className="blog-prose"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />

                {post.tags.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-6">
                        {post.tags.map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-[13.5px] font-semibold text-[var(--color-ink-muted)]"
                            >
                                #{t}
                            </span>
                        ))}
                    </div>
                )}

                {post.faq && post.faq.length > 0 && (
                    <section
                        aria-label="자주 묻는 질문"
                        className="mt-14 border-t border-[var(--color-line)] pt-10"
                    >
                        <h2 className="text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                            자주 묻는 질문
                        </h2>
                        <dl className="mt-6 divide-y divide-[var(--color-line)]">
                            {post.faq.map((f) => (
                                <div key={f.q} className="py-5">
                                    <dt className="text-[17px] font-bold leading-snug text-[var(--color-ink)]">
                                        {f.q}
                                    </dt>
                                    <dd className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {sdef && (sPrev || sNext) && (
                    <nav
                        aria-label="시리즈 이동"
                        className="mt-14 grid gap-4 border-t border-[var(--color-line)] pt-10 sm:grid-cols-2"
                    >
                        {sPrev ? (
                            <Link
                                href={`/blog/${sPrev.slug}`}
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-20px_rgba(20,40,80,0.28)]"
                            >
                                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    이전 편
                                </span>
                                <span className="mt-2 line-clamp-2 text-[15.5px] font-bold leading-snug text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                    {sPrev.title}
                                </span>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {sNext && (
                            <Link
                                href={`/blog/${sNext.slug}`}
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 text-right transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-20px_rgba(20,40,80,0.28)] sm:items-end"
                            >
                                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink-subtle)]">
                                    다음 편
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                                <span className="mt-2 line-clamp-2 text-[15.5px] font-bold leading-snug text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                    {sNext.title}
                                </span>
                            </Link>
                        )}
                    </nav>
                )}

                <Link
                    href="/blog"
                    className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    블로그 목록으로
                </Link>
            </main>
            <SiteFooter />
        </>
    );
}
