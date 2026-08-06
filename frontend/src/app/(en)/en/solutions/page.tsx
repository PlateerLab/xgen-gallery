import { SolutionsPageContent } from "@/components/pages/solutions-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Applied AI by Industry",
    description:
        "Enterprise AI fitted to the workflows and regulations of finance, public sector, commerce, and IT services — validated through real PoCs.",
    path: "/solutions",
    locale: "en",
});

export default function SolutionsPageEn() {
    return <SolutionsPageContent locale="en" />;
}
