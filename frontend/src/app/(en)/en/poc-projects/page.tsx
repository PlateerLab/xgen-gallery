import { PocProjectsPageContent } from "@/components/pages/poc-projects-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "PoC Projects",
    description:
        "Plateer AI Labs proof-of-concept projects — Enterprise AI validated with XGEN, starting from real pain points on the customer's floor.",
    path: "/poc-projects",
    locale: "en",
});

export default function PocProjectsPageEn() {
    return <PocProjectsPageContent locale="en" />;
}
