import { AboutPageContent } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "About — 신뢰할 수 있는 Enterprise AI를 연구하는 곳",
    description:
        "Plateer Labs는 기업이 신뢰하고 운영할 수 있는 Enterprise AI의 표준을 연구합니다. 기초 연구에서 시작해 오픈소스로 검증하고, XGEN·Polar·AI Code Assistant 제품으로 잇고, 고객사례와 국가 공인 인증으로 증명합니다.",
    path: "/about",
});

export default function AboutPage() {
    return <AboutPageContent locale="ko" />;
}
