import { ResearchPageContent } from "@/components/pages/research-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Research",
    description:
        "Plateer AI Labs의 연구 — Enterprise AI를 현실로 만드는 연구 영역과 아키텍처.",
    path: "/research",
});

export default function ResearchPage() {
    return <ResearchPageContent locale="ko" />;
}
