import { AiQualityPolicyFullPageContent } from "@/components/pages/ai-quality-policy-full-page";
import { pageMetadata } from "@/lib/metadata";

/**
 * AI 품질 방침 전문 — 승인 대기 히든 프리뷰.
 *
 * AI-MASTER NEW1 증빙을 담당하는 페이지이며, 증빙의 요건은 "외부에서 확인 가능"이다.
 * 즉 지금의 noindex 는 승인 전까지의 임시 상태다 — 정식 공개 절차는 개요 프리뷰
 * (../page.tsx) 주석에 정리해 두었다.
 */
const BASE = "/preview/ai-quality-policy-4d7e21c8";

export const metadata = pageMetadata({
    title: "AI 품질 방침 전문",
    description:
        "플래티어 AI연구소 AI 품질 방침 전문 — 적용 범위, 7대 원칙, 사내 AI 이용 기준, 품질 목표, 거버넌스, 책임 분계와 고객사 이행 가이드.",
    path: `${BASE}/full`,
    robots: { index: false, follow: false },
});

export default function AiQualityPolicyFullPreviewPage() {
    return <AiQualityPolicyFullPageContent overviewHref={BASE} />;
}
