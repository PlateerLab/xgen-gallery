import { TechnicalConsultingPageContent } from "@/components/pages/technical-consulting-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Technical Consulting",
    description:
        "Enterprise AI consulting grounded in research and proven in PoC — AI strategy, architecture, PoC validation, and governance, designed with you.",
    path: "/technical-consulting",
    locale: "en",
});

export default function TechnicalConsultingPageEn() {
    return <TechnicalConsultingPageContent locale="en" />;
}
