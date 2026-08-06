import { SecurityPageContent } from "@/components/pages/security-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Security & Governance",
    description:
        "XGEN Agentic AI Platform의 가드레일·통제 정책 — 외부 가드 모델, PII 마스킹, 금칙어 필터, 통합 감사 로그, AI 위험도 등급으로 엔터프라이즈 AI를 안전하게 통제합니다.",
    path: "/security-and-governance",
});

export default function SecurityPage() {
    return <SecurityPageContent locale="ko" />;
}
