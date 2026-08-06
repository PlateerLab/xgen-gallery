import { CodeAssistantPageContent } from "@/components/pages/code-assistant-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "AI Code Assistant — a coding assistant that understands your codebase",
    description:
        "AI Code Assistant learns your code, APIs, database schemas, and artifacts, then answers at code level in your project's context. It integrates with GitLab and installs on-premise or air-gapped, so source never leaves.",
    path: "/code-assistant",
    locale: "en",
});

export default function CodeAssistantPageEn() {
    return <CodeAssistantPageContent locale="en" />;
}
