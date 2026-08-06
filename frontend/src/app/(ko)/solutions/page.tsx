import { SolutionsPageContent } from "@/components/pages/solutions-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Applied AI by Industry",
    description:
        "금융·공공·커머스·IT 서비스 등 산업별 업무 특성과 규제를 반영한 Enterprise AI를 연구하고 PoC로 실증합니다.",
    path: "/solutions",
});

export default function SolutionsPage() {
    return <SolutionsPageContent locale="ko" />;
}
