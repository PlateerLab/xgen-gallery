import { ResourcesPageContent } from "@/components/pages/resources-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Resources",
    description:
        "The Plateer Labs resource library, including the XGEN brochure — request it to receive the core capabilities, architecture, and adoption path of the XGEN Enterprise Agentic AI platform.",
    path: "/resources",
    locale: "en",
});

export default function ResourcesPageEn() {
    return <ResourcesPageContent locale="en" />;
}
