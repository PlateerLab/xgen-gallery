import { EventsPageContent } from "@/components/pages/events-page";
import { getEventListing } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";

// Re-evaluate the event lifecycle on each visit instead of freezing it at build time.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
    title: "이벤트",
    description: "Plateer AI Labs의 해커톤과 기술 이벤트. 다가오는 행사와 진행 중인 이벤트, 종료된 행사의 기록을 확인하세요.",
    path: "/events",
});

export default function EventsPage() {
    return <EventsPageContent items={getEventListing()} />;
}
