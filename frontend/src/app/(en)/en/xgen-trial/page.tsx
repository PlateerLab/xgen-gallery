import { XgenTrialPageContent } from "@/components/pages/xgen-trial-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN free trial — turn your idea into an AI agent",
    description:
        "A 15-day free XGEN trial: connect your data, build an AI agent without code, and run it — all in a demo environment. Prove out a custom Agentic AI platform on your own enterprise data, free.",
    path: "/xgen-trial",
    locale: "en",
});

export default function XgenTrialPageEn() {
    return <XgenTrialPageContent locale="en" />;
}
