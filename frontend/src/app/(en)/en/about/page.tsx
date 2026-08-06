import { AboutPageContent } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "About — Researching Enterprise AI you can trust",
    description:
        "Plateer Labs researches Enterprise AI that companies can trust and run: foundational research, proven in open source, shipped as XGEN, and validated by customer projects and GS Grade 1 certification.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/about)과 hreflang을 함께 만든다.
    path: "/about",
    locale: "en",
});

export default function AboutPageEn() {
    return <AboutPageContent locale="en" />;
}
