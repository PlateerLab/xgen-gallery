import { ArchitecturePageContent } from "@/components/pages/architecture-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Architecture",
    description:
        "Plateer Labs의 Enterprise AI 참조 아키텍처 — 데이터 주권·보안·거버넌스를 보장하는 계층형 설계.",
    path: "/architecture",
});

export default function ArchitecturePage() {
    return <ArchitecturePageContent locale="ko" />;
}
