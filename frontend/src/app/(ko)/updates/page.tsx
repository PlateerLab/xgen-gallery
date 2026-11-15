import { UpdatesPageContent } from "@/components/pages/updates-page";
import { getUpdatesSummary } from "@/lib/updates";
import { pageMetadata } from "@/lib/metadata";

// 이벤트 상태(접수 중·종료 등)를 방문 시점 기준으로 다시 계산한다.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
    title: "소식·행사",
    description: "Plateer AI Labs와 XGEN의 뉴스, 뉴스레터, 이벤트 소식을 한곳에서 확인하세요.",
    path: "/updates",
});

export default function UpdatesPage() {
    return <UpdatesPageContent locale="ko" {...getUpdatesSummary("ko")} />;
}
