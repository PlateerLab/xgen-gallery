import { ResourcesPageContent } from "@/components/pages/resources-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN 소개서 신청",
    description:
        "XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·도입 방식을 담은 소개서를 신청 후 받아보실 수 있습니다.",
    path: "/xgen-brief-k7m4",
});

export default function XgenBriefPage() {
    return <ResourcesPageContent locale="ko" />;
}
