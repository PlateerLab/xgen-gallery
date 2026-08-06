import { HomePageContent } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN — the Agentic AI platform you run",
    description:
        "XGEN runs Agentic AI on the LLMs and infrastructure you choose — on-premise or air-gapped, with governance built in. GS Grade 1 certified.",
    path: "/",
    locale: "en",
});

export default function HomeEn() {
    return <HomePageContent locale="en" />;
}
