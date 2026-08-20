import { ResourcesPageContent } from "@/components/pages/resources-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Resources — 자료실",
    description:
        "XGEN 소개서를 비롯한 Plateer AI Labs 자료실. XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·도입 방식을 담은 소개서를 신청 후 받아보실 수 있습니다.",
    path: "/resources",
});

export default function ResourcesPage() {
    return <ResourcesPageContent locale="ko" />;
}
