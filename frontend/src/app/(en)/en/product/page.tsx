import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "An on-premise platform for designing, deploying, and governing Agentic AI on the LLMs you choose — no-code agentflow canvas, RAG, MCP tools, governance.",
    path: "/product",
    locale: "en",
});

export default function ProductPageEn() {
    return <ProductPageContent locale="en" />;
}
