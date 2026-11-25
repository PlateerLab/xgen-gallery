import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN 보안·거버넌스 — 온프레미스·통제·인증",
    description:
        "XGEN의 온프레미스·망분리 구성, 권한·이중 승인·감사 로그 등 AI 거버넌스 통제, GS인증 1등급과 AI 품질 방침을 확인하세요.",
    path: "/product/xgen/security",
});

export default function XgenPageSecurity() {
    return <ProductPageContent locale="ko" view="security" />;
}
