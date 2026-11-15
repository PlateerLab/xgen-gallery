import { ProductsIndex } from "@/components/products/products-index";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "제품 — Plateer AI Labs",
    description: "Plateer AI Labs의 제품. 기업 데이터와 인프라 위에서 쓰는 XGEN과 Ontlas를 소개합니다.",
    path: "/product",
});

export default function ProductsPage() {
    return <ProductsIndex locale="ko" />;
}
