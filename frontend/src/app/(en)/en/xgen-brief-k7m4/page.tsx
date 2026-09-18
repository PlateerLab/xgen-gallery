import { ResourcesPageContent } from "@/components/pages/resources-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Request the XGEN brochure",
    description:
        "Request the XGEN brochure covering the platform's core capabilities, architecture, and adoption path.",
    path: "/xgen-brief-k7m4",
    locale: "en",
});

export default function XgenBriefPageEn() {
    return <ResourcesPageContent locale="en" />;
}
