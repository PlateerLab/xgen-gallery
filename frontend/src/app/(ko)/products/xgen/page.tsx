import { ProductMicrosite } from "@/components/products/product-microsite";
import { PRODUCT_PROFILES } from "@/lib/product-profiles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "XGEN은 기업 데이터와 인프라 위에서 에이전트와 앱을 만들고, 배포하고, 통제하는 Enterprise Agentic AI 플랫폼입니다. 온프레미스와 망분리 환경을 지원합니다.",
    // 보류 중인 시안 — 정식 주소 /product/xgen 을 대표 주소로 지정(중복 색인 방지).
    path: "/product/xgen",
});

export default function XgenProductPage() {
    return <ProductMicrosite profile={PRODUCT_PROFILES.xgen} locale="ko" />;
}
