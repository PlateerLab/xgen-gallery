import { Suspense } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BlogList } from "@/components/blog-list";
import { FeaturedHero } from "@/components/featured-hero";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { breadcrumbLd, itemListLd } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

/**
 * 상단 키비주얼(캐러셀)에 올릴 글 선정 규칙 — docs/BLOG-WRITING-GUIDE.md 참조.
 * 1) 편집자가 `featured: true`로 고정한 글이 있으면 그 글들을 최신순으로 사용(수동 override).
 * 2) 없으면 자동 큐레이션: 카테고리마다 최신 1편씩, 단 Tech Note는 작성자가 서로 다른 최신 2편.
 *    → 제품 소식 1 + Case Study 1 + Tech Note 2(다른 작성자) = 최대 4편, 캐러셀은 최신순.
 */
function pickHeroPosts(posts: PostMeta[]): PostMeta[] {
    const byNew = [...posts].sort((a, b) => b.date.localeCompare(a.date));

    const pinned = byNew.filter((p) => p.featured);
    if (pinned.length) return pinned.slice(0, 5);

    const picked: PostMeta[] = [];
    // 제품 소식 · Case Study — 카테고리별 최신 1편.
    for (const cat of ["제품 소식", "Case Study"]) {
        const p = byNew.find((x) => x.category === cat);
        if (p) picked.push(p);
    }
    // Tech Note — 작성자가 서로 다른 최신 2편(같은 작성자 중복 방지).
    const authors = new Set<string>();
    for (const p of byNew) {
        if (p.category !== "Tech Note" || authors.has(p.author)) continue;
        picked.push(p);
        authors.add(p.author);
        if (authors.size === 2) break;
    }
    return picked.sort((a, b) => b.date.localeCompare(a.date));
}

export const metadata = pageMetadata({
    title: "Insight",
    description:
        "Plateer Labs Insight — Case Study, Tech Note, 제품 소식 등 Enterprise AI 연구·실무 인사이트를 공유합니다.",
    path: "/blog",
});

export default function BlogPage() {
    const posts = getAllPosts();
    // 키비주얼 캐러셀 — 카테고리별 최신 1편 + Tech Note는 작성자 다른 2편(규칙: pickHeroPosts).
    const heroPosts = pickHeroPosts(posts);

    return (
        <>
            <SiteNav />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "@id": absoluteUrl("/blog#blog"),
                        name: "Plateer Labs Blog",
                        url: absoluteUrl("/blog"),
                        inLanguage: "ko",
                    },
                    itemListLd(
                        "Plateer Labs Blog",
                        posts.map((p) => ({
                            name: p.title,
                            url: `/blog/${p.slug}`,
                            description: p.description,
                        })),
                    ),
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Blog", path: "/blog" },
                    ]),
                ]}
            />

            <section className="border-b border-[var(--color-line)] bg-white">
                <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10 md:pb-16 md:pt-14">
                    {/* 목록 페이지의 h1 — 기존에 h1이 없어 문서 구조 최상위 제목이 비어 있었다.
                        보이는 모습은 그대로 두고 의미만 h1으로 올린다. */}
                    <h1 className="mb-8 flex items-baseline gap-2.5">
                        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#2461d8]">
                            Insight
                        </span>
                        <span className="text-[14px] text-[var(--color-ink-subtle)]">
                            연구와 현장에서 얻은 인사이트
                        </span>
                    </h1>
                    <FeaturedHero posts={heroPosts} />
                </div>
            </section>

            <main id="articles" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-14">
                <Suspense fallback={null}>
                    <BlogList posts={posts} />
                </Suspense>
            </main>
            <SiteFooter />
        </>
    );
}
