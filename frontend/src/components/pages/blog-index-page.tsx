import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { BlogList } from "@/components/blog-list";
import { FeaturedHero } from "@/components/featured-hero";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { visibleInList } from "@/lib/blog-categories";
import { breadcrumbLd, itemListLd } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/site";

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
    // 카테고리별 최신 1편. 감춘 카테고리는 애초에 posts 에서 빠져 있다.
    for (const cat of ["제품 소식", "Industry Note"]) {
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

const COPY: Record<Locale, { eyebrowNote: string }> = {
    ko: { eyebrowNote: "연구와 현장에서 얻은 인사이트" },
    en: { eyebrowNote: "Insight from our research and the field" },
};

/** URL 쿼리로 들어오는 목록 상태 — 라우트가 읽어서 그대로 넘긴다. */
export type BlogListParams = {
    cat?: string;
    tag?: string;
    author?: string;
    page?: string;
};

export function BlogIndexPageContent({
    locale,
    params,
}: {
    locale: Locale;
    params?: BlogListParams;
}) {
    // 감춘 카테고리는 목록·캐러셀에서 뺀다(글은 지우지 않고 개별 URL 은 그대로 산다).
    const posts = visibleInList(getAllPosts(locale));
    const t = COPY[locale];
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
                        "@id": absoluteUrl(
                            `${localePath(locale, "/blog")}#blog`,
                        ),
                        name: "Plateer Labs Blog",
                        url: absoluteUrl(localePath(locale, "/blog")),
                        inLanguage: locale,
                    },
                    itemListLd(
                        "Plateer Labs Blog",
                        posts.map((p) => ({
                            name: p.title,
                            url: localePath(locale, `/blog/${p.slug}`),
                            description: p.description,
                        })),
                    ),
                    breadcrumbLd([
                        { name: "Home", path: localePath(locale, "/") },
                        { name: "Blog", path: localePath(locale, "/blog") },
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
                            {t.eyebrowNote}
                        </span>
                    </h1>
                    <FeaturedHero posts={heroPosts} />
                </div>
            </section>

            {/* 목록은 서버에서 렌더한다 — 필터·페이지를 props 로 내리므로 BlogList 가
                useSearchParams() 를 쓰지 않고, 따라서 CSR 바로 이탈도 없다.
                예전에는 <Suspense fallback={null}> 이 이 자리를 감싸고 있어서 글 링크가
                서버 HTML 에 하나도 나가지 않았다(blog-list.tsx 주석 참고). */}
            <main id="articles" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-14">
                <BlogList
                    posts={posts}
                    cat={params?.cat}
                    tag={params?.tag}
                    author={params?.author}
                    page={Number(params?.page) || 1}
                />
            </main>
            <SiteFooter />
        </>
    );
}
