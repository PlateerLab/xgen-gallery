import { PathFinderPageContent } from "@/components/pages/pathfinder-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "PathFinder — web systems as Agent Tools",
    description:
        "XGEN technology that turns existing systems and APIs into Agent Tools without code — sign-in, wiring, testing, and registration run in the browser.",
    path: "/pathfinder",
    locale: "en",
});

export default function PathFinderPageEn() {
    return <PathFinderPageContent locale="en" />;
}
