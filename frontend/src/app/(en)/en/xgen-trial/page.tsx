import { XgenTrialPageContent } from "@/components/pages/xgen-trial-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN free trial — build an AI agent",
    description:
        "A 15-day free XGEN trial — connect your data, build an AI agent without code, and run it in a demo environment. No cost, your own data.",
    path: "/xgen-trial",
    locale: "en",
});

export default function XgenTrialPageEn() {
    return <XgenTrialPageContent locale="en" />;
}
