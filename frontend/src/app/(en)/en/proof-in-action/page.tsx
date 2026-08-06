import { ProofInActionPageContent } from "@/components/pages/proof-in-action-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Proof in Action — demo videos",
    description:
        "Less telling, more running — demo videos showing the core capabilities of the XGEN Agentic AI platform working on the real product.",
    path: "/proof-in-action",
    locale: "en",
    // 대표 영상(XGEN 실증 데모) 썸네일을 링크 미리보기 이미지로 사용.
    image: "https://i.ytimg.com/vi/4RiH3ThyIg0/maxresdefault.jpg",
    imageDims: { width: 1280, height: 720 },
});

export default function ProofInActionPageEn() {
    return <ProofInActionPageContent locale="en" />;
}
