import { XgenDexPageContent } from "@/components/pages/xgen-dex-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN DeX — AI Agent를 데스크톱 업무환경으로 연결",
    description:
        "XGEN DeX는 서버에서 운영되는 AI Agent를 사용자의 PC 업무환경과 연결하는 Desktop Interface입니다. 허용된 범위 안에서 로컬 파일과 애플리케이션을 활용해 실제 결과물을 만듭니다.",
    path: "/xgen-dex",
});

export default function XgenDexPage() {
    return <XgenDexPageContent locale="ko" />;
}
