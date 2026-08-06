import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·통제하는 온프레미스 Enterprise AI 플랫폼입니다. 에이전트플로우 캔버스·지식(RAG)·도구(MCP)·거버넌스로 코딩 없이 에이전트를 만들고 안전하게 운영합니다.",
    path: "/product",
});

export default function ProductPage() {
    return <ProductPageContent locale="ko" />;
}
