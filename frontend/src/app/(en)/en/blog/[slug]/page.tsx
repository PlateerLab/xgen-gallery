import { BlogPostPageContent } from "@/components/pages/blog-post-page";
import { getRoutableSlugs, getPost } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/locale-path";

export const dynamicParams = false;

export function generateStaticParams() {
    return getRoutableSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug, "en");
    if (!post) return {};
    const url = absoluteUrl(`/en/blog/${post.slug}`);
    return {
        // <title>은 짧은 SEO 제목이 있으면 그쪽을 쓰고, 화면 h1과 OG 제목은 원 헤드라인을 유지한다.
        title: post.titleSeo ?? post.title,
        description: post.description,
        alternates: {
            canonical: `/en/blog/${post.slug}`,
            languages: languageAlternates(`/blog/${post.slug}`),
        },
        keywords: post.tags,
        /*
          비공개 발행 — 검색엔진 색인만 막고, 일반 robots 지시는 두지 않는다.
          generic noindex 를 걸면 ChatGPT 같은 도구가 주소를 받아도 읽기를
          거부해, 링크를 보내 검토를 부탁할 수 없다. 목록·사이트맵에 없고
          어디서도 링크하지 않는 것으로 노출을 막는다.
        */
        ...(post.unlisted
            ? {
                  robots: { googleBot: { index: false, follow: false } },
                  other: { bingbot: "noindex, nofollow" },
              }
            : {}),
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url,
            locale: "en_US",
            alternateLocale: ["ko_KR"],
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

export default async function BlogPostPageEn({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return <BlogPostPageContent params={params} locale="en" />;
}
