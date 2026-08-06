import { LibraryGalleryPageContent } from "@/components/pages/library-gallery-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Library Gallery",
    description:
        "XGEN 플랫폼을 떠받치는 오픈소스 AI 라이브러리 모음 — 문서 인제스션, 지식 그래프, 에이전트 도구. pip로 설치하거나 브라우저에서 바로 체험하세요.",
    path: "/library-gallery",
});

export default function LibraryGalleryPage() {
    return <LibraryGalleryPageContent locale="ko" />;
}
