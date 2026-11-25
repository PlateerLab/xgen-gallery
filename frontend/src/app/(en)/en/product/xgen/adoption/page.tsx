import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN Adoption & Support — Delivery steps and FAQ",
    description:
        "XGEN delivery steps (installation, PoC, build, operation), post-deployment training and support, FAQ and documents for your evaluation.",
    path: "/product/xgen/adoption",
    locale: "en",
});

export default function XgenPageAdoptionEn() {
    return <ProductPageContent locale="en" view="adoption" />;
}
