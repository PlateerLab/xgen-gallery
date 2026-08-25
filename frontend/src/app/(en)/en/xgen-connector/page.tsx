import { XgenConnectorPageContent } from "@/components/pages/xgen-connector-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Installing and using XGEN Connector",
    description:
        "A walkthrough, with screens, of connecting an agent built in XGEN to your own desktop — six steps from install to the first request.",
    path: "/xgen-connector",
    locale: "en",
});

export default function XgenConnectorPageEn() {
    return <XgenConnectorPageContent locale="en" />;
}
