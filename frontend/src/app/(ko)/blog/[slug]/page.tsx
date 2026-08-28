import { BlogPostPageContent } from "@/components/pages/blog-post-page";
import { getRoutableSlugs, getPost } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/locale-path";

export const dynamicParams = false;

export function generateStaticParams() {
    return getRoutableSlugs().map((slug) => ({ slug }));
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
        // <title>은 짧은 SEO 제목이 있으면 그쪽을 쓰고, 화면 h1과 OG 제목은 원 헤드라인을 유지한다.
        title: post.titleSeo ?? post.title,
        description: post.description,
        alternates: {
            canonical: `/blog/${post.slug}`,
            languages: languageAlternates(`/blog/${post.slug}`),
        },
        keywords: post.tags,
        ...(post.unlisted
            ? { robots: { index: false, follow: false } }
            : {}),
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url,
            locale: "ko_KR",
            alternateLocale: ["en_US"],
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

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return <BlogPostPageContent params={params} locale="ko" />;
}
