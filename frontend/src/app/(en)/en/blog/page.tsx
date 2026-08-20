import {
    BlogIndexPageContent,
    type BlogListParams,
} from "@/components/pages/blog-index-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Insight",
    description:
        "Plateer AI Labs Insight — case studies, tech notes, and product news from our Enterprise AI research and delivery work.",
    path: "/blog",
    locale: "en",
});

// 국문 /blog 와 같은 이유로 목록 상태를 서버에서 읽는다((ko)/blog/page.tsx 주석 참고).
export default async function BlogPageEn({
    searchParams,
}: {
    searchParams: Promise<BlogListParams>;
}) {
    return <BlogIndexPageContent locale="en" params={await searchParams} />;
}
