import { SupportPageContent } from "@/components/pages/support-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Operations & Support",
    description:
        "Past the build and into operations — maintenance, incident response, monitoring, and on-site or remote operations support for XGEN on-premise environments.",
    path: "/support",
    locale: "en",
});

export default function SupportPageEn() {
    return <SupportPageContent locale="en" />;
}
