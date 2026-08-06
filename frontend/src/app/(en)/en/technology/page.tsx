import { TechnologyPageContent } from "@/components/pages/technology-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Technology",
    description:
        "The Ontology and Harness engines, AgenticOps and GraphRAG frameworks, and a standalone MCP runtime — the technology behind how XGEN operates.",
    path: "/technology",
    locale: "en",
});

export default function TechnologyPageEn() {
    return <TechnologyPageContent locale="en" />;
}
