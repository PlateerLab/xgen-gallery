import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN 기능·활용 — 핵심 기능과 실제 화면",
    description:
        "XGEN의 AX 진화 단계, 6가지 역량, 에이전트플로우·지식(RAG)·도구(MCP)·배포·대시보드 등 핵심 기능과 실제 화면, 역할별 사용 방식과 도입 효과를 정리했습니다.",
    path: "/product/xgen/features",
});

export default function XgenPageFeatures() {
    return <ProductPageContent locale="ko" view="features" />;
}
