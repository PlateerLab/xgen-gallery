import { XgenDexPageContent } from "@/components/pages/xgen-dex-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "DexOn — XGEN의 디바이스 연결 워크스페이스",
    description:
        "DexOn은 XGEN 안에서 AI Agent와 사용자의 PC·핸드폰·태블릿 업무환경을 연결하는 Device Interface 워크스페이스입니다.",
    path: "/xgen-dex",
});

export default function XgenDexPage() {
    return <XgenDexPageContent locale="ko" />;
}
