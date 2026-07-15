import { Suspense } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BlogList } from "@/components/blog-list";
import { FeaturedHero } from "@/components/featured-hero";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbLd, itemListLd } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
    title: "Insight",
    description:
        "Plateer Labs Insight — Case Study, Tech Note, 제품 소식 등 Enterprise AI 연구·실무 인사이트를 공유합니다.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Insight · Plateer Labs",
        description:
            "Case Study · Tech Note · 제품 소식 — Enterprise AI 인사이트.",
        type: "website",
        url: absoluteUrl("/blog"),
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    // 키비주얼 캐러셀 — 편집자가 고른 featured 글(최신순), 없으면 최신 글로 폴백.
    const chosen = posts.filter((p) => p.featured);
    const heroPosts = (chosen.length ? chosen : posts).slice(0, 5);

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
                <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 md:pb-16 md:pt-14">
                    <div className="mb-8 flex items-baseline gap-2.5">
                        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#2461d8]">
                            Insight
                        </span>
                        <span className="text-[14px] text-[var(--color-ink-subtle)]">
                            연구와 현장에서 얻은 인사이트
                        </span>
                    </div>
                    <FeaturedHero posts={heroPosts} />
                </div>
            </section>

            <main id="articles" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
                <Suspense fallback={null}>
                    <BlogList posts={posts} />
                </Suspense>
            </main>
            <SiteFooter />
        </>
    );
}
