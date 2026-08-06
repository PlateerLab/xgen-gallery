import { EnablementPageContent } from "@/components/pages/enablement-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Enablement — training and adoption",
    description:
        "An Enterprise AI enablement service: after delivery we come to your site and train administrators, practitioners, and operators until the organization runs and extends XGEN-based AI on its own — on-site training, hands-on workshops, and operations handover.",
    path: "/enablement",
    locale: "en",
});

export default function EnablementPageEn() {
    return <EnablementPageContent locale="en" />;
}
