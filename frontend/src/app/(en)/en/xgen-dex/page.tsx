import { XgenDexPageContent } from "@/components/pages/xgen-dex-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "DexOn — XGEN's device-connection component",
    description:
        "DexOn is XGEN's Device Interface component for connecting AI agents to the user's PC, phone, and tablet working environments.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/xgen-dex)과 hreflang을 함께 만든다.
    path: "/xgen-dex",
    locale: "en",
});

export default function XgenDexPageEn() {
    return <XgenDexPageContent locale="en" />;
}
