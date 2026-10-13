import { HackathonPageContent } from "@/components/pages/hackathon-page";
import { HACKATHON_EVENT, getEventStatus } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
    title: `${HACKATHON_EVENT.name} ${HACKATHON_EVENT.year} — ${HACKATHON_EVENT.headline}`,
    description: HACKATHON_EVENT.description,
    path: HACKATHON_EVENT.href,
    robots: HACKATHON_EVENT.draft ? { index: false, follow: false, googleBot: { index: false, follow: false } } : undefined,
});

export default function BuildChallengePage() {
    return <HackathonPageContent event={HACKATHON_EVENT} status={getEventStatus(HACKATHON_EVENT)} />;
}
