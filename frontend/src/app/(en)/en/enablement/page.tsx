import { EnablementPageContent } from "@/components/pages/enablement-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Enablement — training and adoption",
    description:
        "After delivery we train your administrators, practitioners, and operators on site, until the organization runs and extends XGEN-based AI on its own.",
    path: "/enablement",
    locale: "en",
});

export default function EnablementPageEn() {
    return <EnablementPageContent locale="en" />;
}
