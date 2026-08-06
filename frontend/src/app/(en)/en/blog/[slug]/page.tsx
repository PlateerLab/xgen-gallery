import { BlogPostPageContent } from "@/components/pages/blog-post-page";
import { getAllSlugs, getPost } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/locale-path";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllSlugs("en").map((slug) => ({ slug }));
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
        title: post.title,
        description: post.description,
        alternates: {
            canonical: `/en/blog/${post.slug}`,
            languages: languageAlternates(`/blog/${post.slug}`),
        },
        keywords: post.tags,
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
