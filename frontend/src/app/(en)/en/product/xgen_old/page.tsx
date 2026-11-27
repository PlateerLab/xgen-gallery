import { XgenOldPageContent } from "@/components/xgen-old/product-page-old";
import { pageMetadata } from "@/lib/metadata";

// 2026-11-27 이전 /product/xgen 운영본 보관용. 검색 노출 제외.
export const metadata = pageMetadata({
    title: "XGEN (previous version)",
    description: "Archived XGEN product page (before 2026-11-27).",
    path: "/product/xgen_old",
    locale: "en",
    robots: { index: false, follow: false },
});

export default function XgenOldPage() {
    return <XgenOldPageContent locale="en" />;
}
