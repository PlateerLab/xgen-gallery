import { VibeCodingPageContent } from "@/components/pages/vibe-coding-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Vibe Coding in DexOn — Agent와 App 만들기",
    description: "DexOn에서 자연어 기반 바이브코딩과 직접 코딩을 오가며 Agent와 업무용 App을 만들고 실행·테스트·수정하는 XGEN 핵심 기능입니다.",
    path: "/vibe-coding",
});

export default function VibeCodingPage() {
    return <VibeCodingPageContent locale="ko" />;
}
