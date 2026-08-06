import { AboutPageContent } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "About — Enterprise AI you can trust",
    description:
        "Plateer Labs researches Enterprise AI companies can trust and run — proven in open source, shipped as XGEN, certified GS Grade 1.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/about)과 hreflang을 함께 만든다.
    path: "/about",
    locale: "en",
});

export default function AboutPageEn() {
    return <AboutPageContent locale="en" />;
}
