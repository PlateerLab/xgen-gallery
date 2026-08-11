import { AiQualityPolicyPageContent } from "@/components/pages/ai-quality-policy-page";
import { pageMetadata } from "@/lib/metadata";

/**
 * AI 품질 방침 개요 — 대외 공개 정식 라우트.
 *
 * **AI-MASTER NEW1 증빙을 담당한다.** 증빙 요건이 "외부 이해관계자가 확인 가능"이므로
 * noindex 를 다시 걸거나 라우트를 숨기면 증빙이 깨진다. 전문은 full/page.tsx 가 담당한다.
 *
 * 공개 연결점(끊으면 색인·진입이 죽는다)
 *  - lib/locale-path.ts EN_ROUTES 의 "/ai-quality-policy" (hreflang)
 *  - app/sitemap.ts staticRoutes 의 /ai-quality-policy, /ai-quality-policy/full
 *  - site-footer.tsx About 목록, product-page.tsx 인증·품질 섹션 진입 링크
 */
const BASE = "/ai-quality-policy";

export const metadata = pageMetadata({
    title: "AI 품질 방침",
    description:
        "플래티어 AI연구소의 AI 품질 원칙과 XGEN에 구현된 품질 체계 — 안전성·책임성·통제 가능성·운영 품질에 대한 우리의 약속입니다.",
    path: BASE,
});

export default function AiQualityPolicyPage() {
    return <AiQualityPolicyPageContent locale="ko" fullHref={`${BASE}/full`} />;
}
