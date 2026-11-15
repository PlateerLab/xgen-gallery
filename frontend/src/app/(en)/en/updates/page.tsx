import { UpdatesPageContent } from "@/components/pages/updates-page";
import { getUpdatesSummary } from "@/lib/updates";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
    title: "Updates & Events",
    description: "News, newsletter issues, and events from Plateer AI Labs and XGEN, in one place.",
    path: "/updates",
    locale: "en",
});

export default function UpdatesPageEn() {
    return <UpdatesPageContent locale="en" {...getUpdatesSummary("en")} />;
}
