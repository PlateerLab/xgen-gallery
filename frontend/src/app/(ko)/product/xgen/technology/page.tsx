import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN 기술·아키텍처 — 5계층 코어 엔진",
    description:
        "XGEN의 5계층 코어 엔진(에이전트 오케스트레이션·RAG 하이브리드 검색·Model Router·데이터·인프라)과 Geny, 격리 실행 환경을 설명합니다.",
    path: "/product/xgen/technology",
});

export default function XgenPageTechnology() {
    return <ProductPageContent locale="ko" view="technology" />;
}
