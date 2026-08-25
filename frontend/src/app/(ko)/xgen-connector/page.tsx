import { XgenConnectorPageContent } from "@/components/pages/xgen-connector-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN Connector 설치·활용 가이드",
    description:
        "XGEN에서 만든 AI Agent를 내 PC 업무환경에 연결하는 과정을 화면과 함께 안내합니다. 설치부터 첫 업무 지시까지 여섯 단계.",
    path: "/xgen-connector",
});

export default function XgenConnectorPage() {
    return <XgenConnectorPageContent locale="ko" />;
}
