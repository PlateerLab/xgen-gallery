import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getDraftPost } from "@/lib/blog";

/**
 * XGEN DeX 제품소개 글 — 발행 전 내부 검토용 히든 페이지.
 *
 * 글 자체는 `draft: true` 라 목록·사이트맵·RSS 어디에도 나오지 않는다.
 * 이 페이지만 getDraftPost 로 원문을 읽어 렌더한다. noindex 이고 사이트 내
 * 어디에서도 링크하지 않는다 — 검토가 끝나 draft 를 내리면 이 라우트는 지운다.
 */
export const metadata: Metadata = {
    title: "XGEN DeX 제품소개 (검토용 초안)",
    robots: { index: false, follow: false },
};

const SLUG = "product-xgen-dex";

function Draft({ locale }: { locale: "ko" | "en" }) {
    const post = getDraftPost(SLUG, locale);
    if (!post) return null;
    return (
        <article className="mx-auto max-w-3xl px-6 py-14">
            <p className="font-mono text-[12px] uppercase tracking-widest text-[#2461d8]">
                {locale === "ko" ? "/ 한국어 초안" : "/ English draft"}
            </p>
            <h2 className="mt-2 text-[26px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[32px]">
                {post.title}
            </h2>
            <p className="mt-3 text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                {post.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 border-y border-[var(--color-line)] py-3 font-mono text-[12.5px] text-[var(--color-ink-subtle)]">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.readingMinutes} min</span>
                <span>·</span>
                <span>{post.tags.join(" / ")}</span>
            </div>
            {post.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={post.cover}
                    alt={`${post.title} — 커버 일러스트`}
                    className="mt-8 aspect-[16/9] w-full rounded-2xl border border-[var(--color-line)] object-cover"
                />
            )}
            <div
                className="blog-prose mt-10"
                dangerouslySetInnerHTML={{ __html: post.html }}
            />
        </article>
    );
}

export default function XgenDexPreviewPage() {
    const ko = getDraftPost(SLUG, "ko");
    if (!ko) notFound();

    return (
        <>
            <SiteNav />
            <main className="pb-24">
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-3xl px-6 py-12">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            / 발행 전 초안 · 색인 제외 · 미노출
                        </p>
                        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[var(--color-ink)] md:text-[34px]">
                            XGEN DeX 제품소개 검토
                        </h1>
                        <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            글은 <code>draft: true</code> 상태라 블로그 목록·사이트맵·구독
                            메일 어디에도 나오지 않습니다. 이 페이지에서만 보입니다.
                            검토가 끝나면 <code>draft</code> 를 내리고 이 페이지는 지웁니다.
                        </p>
                        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-subtle)]">
                            아래에 한국어·영문 초안을 함께 실었습니다. 미공개 제품이라
                            일정·사양처럼 확정되지 않은 정보는 넣지 않았고, 원문에 없던
                            수치나 기능도 만들지 않았습니다.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-5 inline-flex text-[14.5px] font-semibold text-[#2461d8] hover:text-[#1b4fb0]"
                        >
                            본문에서 연결되는 도입 문의 페이지 확인 →
                        </Link>
                    </div>
                </section>

                <Draft locale="ko" />
                <div className="mx-auto max-w-3xl px-6">
                    <hr className="border-[var(--color-line)]" />
                </div>
                <Draft locale="en" />
            </main>
            <SiteFooter />
        </>
    );
}
