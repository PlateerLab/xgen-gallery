import { EasyModePageContent } from "@/components/pages/easy-mode-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "EasyMode — build business agents without coding",
    description: "Combine knowledge, prompts and tools with XGEN EasyMode. Configure agents using guided steps and drag-and-drop, then validate them in chat.",
    path: "/easy-mode",
    locale: "en",
});

export default function EasyModePageEn() {
    return <EasyModePageContent locale="en" />;
}
