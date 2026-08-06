import { PolarPageContent } from "@/components/pages/polar-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Polar — 커머스 특화 Private sLLM",
    description:
        "Polar는 플래티어가 개발한 이커머스 특화 Private sLLM입니다. 온프레미스로 기업 데이터를 안전하게 보호하면서 도메인 최적화 모델·RAG·Fine-tuning으로 커머스 AI 애플리케이션을 구축·운영합니다.",
    path: "/polar",
});

export default function PolarPage() {
    return <PolarPageContent locale="ko" />;
}
