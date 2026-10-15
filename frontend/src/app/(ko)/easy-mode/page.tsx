import { EasyModePageContent } from "@/components/pages/easy-mode-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "EasyMode — 코딩 없이 만드는 업무용 Agent",
    description: "XGEN EasyMode에서 지식·프롬프트·도구를 조합하고, 단계별 가이드와 드래그&드롭으로 Agent를 구성해 채팅으로 검증합니다.",
    path: "/easy-mode",
});

export default function EasyModePage() {
    return <EasyModePageContent locale="ko" />;
}
