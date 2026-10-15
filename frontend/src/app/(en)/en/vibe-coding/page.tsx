import { VibeCodingPageContent } from "@/components/pages/vibe-coding-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Vibe Coding in DexOn — build agents and apps",
    description: "Build agents and business apps inside DexOn by moving between natural-language vibe coding and hands-on coding, with execution, testing, and revision in one flow.",
    path: "/vibe-coding",
    locale: "en",
});

export default function VibeCodingPageEn() {
    return <VibeCodingPageContent locale="en" />;
}
