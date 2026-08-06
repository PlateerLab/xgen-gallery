import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "XGEN is an on-premise Enterprise AI platform for designing, deploying, and governing Agentic AI services on the LLMs and infrastructure you choose. Build agents without code on an agentflow canvas with knowledge (RAG), tools (MCP), and governance, and run them safely.",
    path: "/product",
    locale: "en",
});

export default function ProductPageEn() {
    return <ProductPageContent locale="en" />;
}
