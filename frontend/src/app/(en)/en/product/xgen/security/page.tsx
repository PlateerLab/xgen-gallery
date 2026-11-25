import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN Security & Governance — On-premise, controls, certification",
    description:
        "On-premise and air-gapped deployment, permission, dual-approval and audit controls, GS certification grade 1 and the AI quality policy.",
    path: "/product/xgen/security",
    locale: "en",
});

export default function XgenPageSecurityEn() {
    return <ProductPageContent locale="en" view="security" />;
}
