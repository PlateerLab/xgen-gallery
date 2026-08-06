import { TechnicalConsultingPageContent } from "@/components/pages/technical-consulting-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Technical Consulting",
    description:
        "Enterprise AI consulting validated in research and proven in PoC — we design the whole path with you, from AI strategy and architecture through PoC validation and AI governance.",
    path: "/technical-consulting",
    locale: "en",
});

export default function TechnicalConsultingPageEn() {
    return <TechnicalConsultingPageContent locale="en" />;
}
