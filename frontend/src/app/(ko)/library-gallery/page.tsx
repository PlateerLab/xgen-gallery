import { LibraryGalleryPageContent } from "@/components/pages/library-gallery-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Library Gallery",
    description:
        "XGEN 플랫폼을 떠받치는 오픈소스 AI 라이브러리 모음 — 문서 인제스션, 지식 그래프, 에이전트 도구. pip로 설치하거나 브라우저에서 바로 체험하세요.",
    path: "/library-gallery",
});

// GNB 하위 메뉴의 카테고리 딥링크(?cat=…)를 서버에서 읽어 넘긴다 — 클라이언트에서
// useSearchParams() 로 읽으면 정적 렌더가 CSR 로 이탈해 카드가 서버 HTML 에서 빠진다
// (블로그 목록과 같은 이유: (ko)/blog/page.tsx 주석 참고).
export default async function LibraryGalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ cat?: string }>;
}) {
    const { cat } = await searchParams;
    return <LibraryGalleryPageContent locale="ko" cat={cat} />;
}
