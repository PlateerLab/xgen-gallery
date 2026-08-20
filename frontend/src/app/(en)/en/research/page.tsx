import { ResearchPageContent } from "@/components/pages/research-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Research",
    description:
        "Research at Plateer AI Labs — the areas and the architecture that make Enterprise AI real.",
    path: "/research",
    locale: "en",
});

export default function ResearchPageEn() {
    return <ResearchPageContent locale="en" />;
}
