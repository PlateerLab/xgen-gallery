import { ProductPageContent } from "@/components/pages/product-page";
import { pageMetadata } from "@/lib/metadata";

// XGEN 2depth — 1depth 개요(/product/xgen)에서 이어지는 주제 페이지.
export const metadata = pageMetadata({
    title: "XGEN 도입·지원 — 구축 단계와 FAQ",
    description:
        "XGEN 도입 절차(반입·실증·구축·운영), 도입 이후 교육·기술지원, 자주 묻는 질문과 문서·소개서 등 도입 검토 자료를 모았습니다.",
    path: "/product/xgen/adoption",
});

export default function XgenPageAdoption() {
    return <ProductPageContent locale="ko" view="adoption" />;
}
