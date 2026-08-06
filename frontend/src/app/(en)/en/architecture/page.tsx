import { ArchitecturePageContent } from "@/components/pages/architecture-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Architecture",
    description:
        "The Plateer Labs Enterprise AI reference architecture — a layered design holding data sovereignty, security, and governance end to end.",
    path: "/architecture",
    locale: "en",
});

export default function ArchitecturePageEn() {
    return <ArchitecturePageContent locale="en" />;
}
