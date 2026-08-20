import { LibraryGalleryPageContent } from "@/components/pages/library-gallery-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Library Gallery",
    description:
        "The open-source AI libraries behind the XGEN platform — document ingestion, knowledge graphs, and agent tooling. Install with pip or try them in the browser.",
    path: "/library-gallery",
    locale: "en",
});

// 국문 /library-gallery 와 같은 이유로 카테고리 딥링크를 서버에서 읽는다.
export default async function LibraryGalleryPageEn({
    searchParams,
}: {
    searchParams: Promise<{ cat?: string }>;
}) {
    const { cat } = await searchParams;
    return <LibraryGalleryPageContent locale="en" cat={cat} />;
}
