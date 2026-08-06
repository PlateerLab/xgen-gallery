import { DocumentationPageContent } from "@/components/pages/documentation-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Documentation",
    description:
        "Guides and reference for the XGEN platform and its open-source libraries — the platform manual, architecture, and library installation and usage guides.",
    path: "/documentation",
    locale: "en",
});

export default function DocumentationPageEn() {
    return <DocumentationPageContent locale="en" />;
}
