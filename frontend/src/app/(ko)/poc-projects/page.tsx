import { PocProjectsPageContent } from "@/components/pages/poc-projects-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "PoC Projects",
    description:
        "Plateer AI Labs의 PoC 실증 프로젝트 — 고객 현장의 페인포인트에서 출발해 XGEN 기술로 검증한 Enterprise AI 사례.",
    path: "/poc-projects",
});

export default function PocProjectsPage() {
    return <PocProjectsPageContent locale="ko" />;
}
