import { FloUIPageContent } from "@/components/pages/floui-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "FloUI — when the question becomes the screen",
    description:
        "FloUI is XGEN's adaptive UI technology: it reads a user's question and lays out KPIs, charts, tables, and RAG summaries in real time, instead of opening a dashboard drawn in advance.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/floui)과 hreflang을 함께 만든다.
    path: "/floui",
    locale: "en",
});

export default function FloUIPageEn() {
    return <FloUIPageContent locale="en" />;
}
