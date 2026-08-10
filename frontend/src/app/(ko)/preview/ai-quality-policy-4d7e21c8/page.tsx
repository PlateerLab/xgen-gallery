import { AiQualityPolicyPageContent } from "@/components/pages/ai-quality-policy-page";
import { pageMetadata } from "@/lib/metadata";

/**
 * AI 품질 방침 개요 — 승인 대기 히든 프리뷰.
 *
 * 이 라우트는 sitemap·robots·GNB·푸터 어디에도 노출되지 않는다(추측 불가 토큰 URL +
 * noindex). 법무(12장 책임 분계)와 거버넌스(8.1 정량 목표) 승인 전까지의 검토본이다.
 *
 * 승인 후 정식 공개 절차 — 아래 셋을 한 번에 처리한다.
 *  1. 이 파일과 full/page.tsx 를 app/(ko)/ai-quality-policy/{,full}/page.tsx 로 옮기고
 *     robots 줄을 지운다(영문판 app/(en)/en/ai-quality-policy 도 함께). 페이지 본문의
 *     대외비 밴드(PreviewBand)는 공유 요청으로 이미 제거했다 — components/preview-band.tsx
 *     는 남겨 두었으니 되살릴 일이 생기면 SiteNav offsetTop 과 함께 다시 넣는다.
 *  2. lib/locale-path.ts 의 EN_ROUTES 에 "/ai-quality-policy" 를 되살린다(hreflang).
 *  3. app/sitemap.ts staticRoutes 에 /ai-quality-policy 와 /ai-quality-policy/full 을 넣고,
 *     site-footer.tsx(About)·product-page.tsx(인증·품질 섹션) 진입 링크를 되살린다.
 *  전문 공개 자체가 AI-MASTER NEW1 증빙 요건이므로 1~3을 나눠서 하지 않는다.
 */
const BASE = "/preview/ai-quality-policy-4d7e21c8";

export const metadata = pageMetadata({
    title: "AI 품질 방침",
    description:
        "플래티어 AI연구소의 AI 품질 원칙과 XGEN에 구현된 품질 체계 — 안전성·책임성·통제 가능성·운영 품질에 대한 우리의 약속입니다.",
    path: BASE,
    robots: { index: false, follow: false },
});

export default function AiQualityPolicyPreviewPage() {
    return <AiQualityPolicyPageContent locale="ko" fullHref={`${BASE}/full`} />;
}
