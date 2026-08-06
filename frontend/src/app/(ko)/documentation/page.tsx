import { DocumentationPageContent } from "@/components/pages/documentation-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Documentation",
    description:
        "XGEN 플랫폼과 오픈소스 라이브러리 사용을 위한 가이드와 레퍼런스 — 플랫폼 매뉴얼, 아키텍처, 라이브러리 설치·사용 가이드.",
    path: "/documentation",
});

export default function DocumentationPage() {
    return <DocumentationPageContent locale="ko" />;
}
