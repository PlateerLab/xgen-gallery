import { LibraryGalleryPageContent } from "@/components/pages/library-gallery-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Library Gallery",
    description:
        "The open-source AI libraries behind the XGEN platform — document ingestion, knowledge graphs, and agent tooling. Install with pip or try them in the browser.",
    path: "/library-gallery",
    locale: "en",
});

export default function LibraryGalleryPageEn() {
    return <LibraryGalleryPageContent locale="en" />;
}
