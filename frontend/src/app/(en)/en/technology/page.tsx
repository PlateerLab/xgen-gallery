import { TechnologyPageContent } from "@/components/pages/technology-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Technology",
    description:
        "From the Ontology and Harness engines to the AgenticOps and GraphRAG frameworks and a standalone MCP runtime — the XGEN technology behind operability, independence, connectivity, and extensibility.",
    path: "/technology",
    locale: "en",
});

export default function TechnologyPageEn() {
    return <TechnologyPageContent locale="en" />;
}
