import { XgenDexPageContent } from "@/components/pages/xgen-dex-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN DeX — run agents where your people work",
    description:
        "XGEN DeX is the desktop interface that connects agents running on the XGEN Server to the working environment on a user's PC, producing real deliverables from local files and applications within an allowed scope.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/xgen-dex)과 hreflang을 함께 만든다.
    path: "/xgen-dex",
    locale: "en",
});

export default function XgenDexPageEn() {
    return <XgenDexPageContent locale="en" />;
}
