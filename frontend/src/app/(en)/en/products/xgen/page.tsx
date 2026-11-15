import { ProductMicrosite } from "@/components/products/product-microsite";
import { PRODUCT_PROFILES } from "@/lib/product-profiles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "XGEN lets enterprises build, deploy, and govern agents and apps on their own data and infrastructure, with on-premise and air-gapped deployment.",
    path: "/products/xgen",
    locale: "en",
});

export default function XgenProductPageEn() {
    return <ProductMicrosite profile={PRODUCT_PROFILES.xgen} locale="en" />;
}
