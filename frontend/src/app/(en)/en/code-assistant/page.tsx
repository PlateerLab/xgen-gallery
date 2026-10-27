import { CodeAssistantPageContent } from "@/components/pages/code-assistant-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Code Assistant — knows your codebase",
    description:
        "Code Assistant learns your code, APIs, and schemas, then answers at code level in project context. On-premise or air-gapped, to support internal source-code processing; external integrations require separate policy review.",
    path: "/code-assistant",
    locale: "en",
});

export default function CodeAssistantPageEn() {
    notFound();
    return <CodeAssistantPageContent locale="en" />;
}
import { notFound } from "next/navigation";
