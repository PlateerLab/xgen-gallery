import { CodeAssistantPageContent } from "@/components/pages/code-assistant-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "AI Code Assistant — knows your codebase",
    description:
        "AI Code Assistant learns your code, APIs, and schemas, then answers at code level in project context. On-premise or air-gapped, so source never leaves.",
    path: "/code-assistant",
    locale: "en",
});

export default function CodeAssistantPageEn() {
    return <CodeAssistantPageContent locale="en" />;
}
