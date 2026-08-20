import { NewsletterIndexPageContent } from "@/components/pages/newsletter-index-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "뉴스레터",
    description:
        "Plateer AI Labs 뉴스레터 — Enterprise AI·Agentic AI 연구와 실무 인사이트, 제품 소식과 검증된 적용 사례를 정기적으로 받아보세요.",
    path: "/newsletter",
});

export default function NewsletterPage() {
    return <NewsletterIndexPageContent locale="ko" />;
}
