import { AiQualityPolicyFullPageContent } from "@/components/pages/ai-quality-policy-full-page";
import { pageMetadata } from "@/lib/metadata";

/**
 * AI 품질 방침 전문 — 대외 공개 정식 라우트.
 *
 * **AI-MASTER NEW1 증빙의 본체다.** 심사는 "방침이 문서로 관리·최신화되고 외부에서
 * 확인 가능한가"를 보므로 noindex 를 걸거나 문서번호·버전·개정일·개정 이력을 지우면 안 된다.
 */
const BASE = "/ai-quality-policy";

export const metadata = pageMetadata({
    title: "AI 품질 방침 전문",
    description:
        "플래티어 AI연구소 AI 품질 방침 전문 — 적용 범위, 7대 원칙, 사내 AI 이용 기준, 품질 목표, 거버넌스와 리스크 관리, 관련 법규, 책임 분계와 고객사 이행 가이드.",
    path: `${BASE}/full`,
});

export default function AiQualityPolicyFullPage() {
    return <AiQualityPolicyFullPageContent overviewHref={BASE} />;
}
