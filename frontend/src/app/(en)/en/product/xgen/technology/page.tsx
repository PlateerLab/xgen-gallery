import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN Technology — Five-layer core engine",
    description:
        "The five-layer core engine (agent orchestration, hybrid RAG search, model router, data and infrastructure), Geny and the isolated execution environment.",
    path: "/product/xgen/technology",
    locale: "en",
});

export default function XgenPageTechnologyEn() {
    return <ProductPageContent locale="en" view="technology" />;
}
