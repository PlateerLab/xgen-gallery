import { TechnicalConsultingPageContent } from "@/components/pages/technical-consulting-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Technical Consulting",
    description:
        "연구로 검증하고 PoC로 입증하는 Enterprise AI 기술 컨설팅 — AI 전략 수립, 아키텍처 설계, PoC 검증, AI 거버넌스까지 도입 전 과정을 설계합니다.",
    path: "/technical-consulting",
});

export default function TechnicalConsultingPage() {
    return <TechnicalConsultingPageContent locale="ko" />;
}
