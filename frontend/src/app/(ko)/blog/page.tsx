import { BlogIndexPageContent } from "@/components/pages/blog-index-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Insight",
    description:
        "Plateer Labs Insight — Case Study, Tech Note, 제품 소식 등 Enterprise AI 연구·실무 인사이트를 공유합니다.",
    path: "/blog",
});

export default function BlogPage() {
    return <BlogIndexPageContent locale="ko" />;
}
