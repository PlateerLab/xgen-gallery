import { XgenDexPageContent } from "@/components/pages/xgen-dex-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Dex — AI Agent를 데스크톱 업무환경으로 연결",
    description:
        "Dex는 PC·핸드폰·태블릿에 설치되어 서버에서 운영되는 AI Agent를 사용자의 실제 업무환경과 연결하는 Device Interface입니다. 허용된 범위 안에서 각 기기의 파일과 애플리케이션을 활용해 실제 결과물을 만듭니다.",
    path: "/xgen-dex",
});

export default function XgenDexPage() {
    return <XgenDexPageContent locale="ko" />;
}
