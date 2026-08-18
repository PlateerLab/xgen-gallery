import {
    BlogIndexPageContent,
    type BlogListParams,
} from "@/components/pages/blog-index-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Insight",
    description:
        "Plateer Labs Insight — XGEN Next, Tech Note, Industry Note 등 Enterprise AI 연구·실무 인사이트를 공유합니다.",
    path: "/blog",
});

// 목록 필터·페이지를 서버에서 읽어 넘긴다 — 클라이언트에서 useSearchParams() 로 읽으면
// 정적 렌더가 CSR 로 바로 이탈해 글 목록이 서버 HTML 에서 통째로 빠진다.
export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<BlogListParams>;
}) {
    return <BlogIndexPageContent locale="ko" params={await searchParams} />;
}
