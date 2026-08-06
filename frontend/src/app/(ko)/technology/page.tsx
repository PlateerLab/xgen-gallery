import { TechnologyPageContent } from "@/components/pages/technology-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Technology",
    description:
        "Ontology · Harness 엔진부터 AgenticOps · GraphRAG 프레임워크, 독립 MCP 런타임까지 — 운영·독립·연결·확장을 떠받치는 XGEN 기술.",
    path: "/technology",
});

export default function TechnologyPage() {
    return <TechnologyPageContent locale="ko" />;
}
