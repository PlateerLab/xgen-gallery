import { FloUIPageContent } from "@/components/pages/floui-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "FloUI — 질문이 곧 화면이 되는 응답형 UI",
    description:
        "FloUI는 사용자의 질문을 해석해 KPI·차트·표·RAG 요약을 실시간으로 배치하는 XGEN의 응답형 UI 기술입니다. 미리 만들어 둔 대시보드가 아니라, 질문마다 필요한 화면을 그 자리에서 구성합니다.",
    path: "/floui",
});

export default function FloUIPage() {
    return <FloUIPageContent locale="ko" />;
}
