import type { Locale } from "./i18n";

/**
 * AI 품질 방침 진입 링크 — 푸터(About 목록)와 제품 페이지 인증·품질 섹션이 함께 쓴다.
 *
 * 정식 공개 라우트다. 국문·영문 모두 같은 경로를 쓰고 로케일 접두사만 다르므로
 * 값 자체는 하나이고, 영문은 EN_ROUTES 에 "/ai-quality-policy" 가 있어 localeHref 가
 * /en 을 붙여 준다. 로케일 분기를 여기 남겨 둔 것은 호출부 두 곳의 시그니처를
 * 그대로 두기 위해서다.
 *
 * 대외 공개 자체가 AI-MASTER NEW1 증빙 요건이므로 이 링크를 끊지 않는다.
 */
export const AI_POLICY_HREF: Record<Locale, string> = {
    ko: "/ai-quality-policy",
    en: "/en/ai-quality-policy",
};
