import { XgenTrialPageContent } from "@/components/pages/xgen-trial-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "XGEN 무료 체험 — 아이디어를 나만의 AI Agent로",
    description:
        "XGEN 15일 무료 체험으로 데이터 연동부터 노코드 AI Agent 구현, 실제 운영까지 데모 환경에서 직접 경험하세요. 기업 데이터 기반 맞춤형 Agentic AI 플랫폼을 무료로 실증할 수 있습니다.",
    path: "/xgen-trial",
});

export default function XgenTrialPage() {
    return <XgenTrialPageContent locale="ko" />;
}
