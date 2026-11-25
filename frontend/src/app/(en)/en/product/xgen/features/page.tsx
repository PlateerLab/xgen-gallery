import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN Features & Use — Core features and real screens",
    description:
        "The AX evolution stages, six capabilities, core features with real product screens, how each role uses XGEN, and business value.",
    path: "/product/xgen/features",
    locale: "en",
});

export default function XgenPageFeaturesEn() {
    return <ProductPageContent locale="en" view="features" />;
}
