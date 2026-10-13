import { XgenDexPageContent } from "@/components/pages/xgen-dex-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "DexOn — run agents where your people work",
    description:
        "DexOn is a device interface installed on PCs, phones, and tablets. It connects agents running on the XGEN Server to the user's actual working environment and produces real deliverables from each device's files and applications within an allowed scope.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/xgen-dex)과 hreflang을 함께 만든다.
    path: "/xgen-dex",
    locale: "en",
});

export default function XgenDexPageEn() {
    return <XgenDexPageContent locale="en" />;
}
