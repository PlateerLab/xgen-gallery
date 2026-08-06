import { ResourcesPageContent } from "@/components/pages/resources-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Resources",
    description:
        "The Plateer Labs resource library — request the XGEN brochure for the platform's core capabilities, architecture, and adoption path.",
    path: "/resources",
    locale: "en",
});

export default function ResourcesPageEn() {
    return <ResourcesPageContent locale="en" />;
}
