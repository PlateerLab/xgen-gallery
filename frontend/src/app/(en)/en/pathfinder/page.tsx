import { PathFinderPageContent } from "@/components/pages/pathfinder-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "PathFinder — turn web systems into AI Agent Tools",
    description:
        "PathFinder is XGEN technology that connects systems and APIs into Agent Tools an AI agent can use, without code. Sign-in, connection, testing, and registration are automated in the browser.",
    path: "/pathfinder",
    locale: "en",
});

export default function PathFinderPageEn() {
    return <PathFinderPageContent locale="en" />;
}
