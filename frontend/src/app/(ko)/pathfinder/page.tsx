import { PathFinderPageContent } from "@/components/pages/pathfinder-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "PathFinder — 웹 시스템을 AI Agent Tool로 연결",
    description:
        "패스파인더(PathFinder)는 시스템과 API를 코드 없이 AI 에이전트가 쓰는 Agent Tool로 연결하는 XGEN 기술입니다. 로그인·연결·테스트·등록을 브라우저에서 자동화합니다.",
    path: "/pathfinder",
});

export default function PathFinderPage() {
    return <PathFinderPageContent locale="ko" />;
}
