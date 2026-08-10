import type { Locale } from "./i18n";

/**
 * AI 품질 방침 진입 링크 — 푸터(About 목록)와 제품 페이지 인증·품질 섹션이 함께 쓴다.
 *
 * 방침은 아직 정식 공개 라우트(/ai-quality-policy)가 없고 히든 프리뷰로만 있다.
 * 국문·영문 프리뷰가 각각 따로 있어 주소가 다른데, 프리뷰 경로는 EN_ROUTES 에
 * 없으므로(사이트맵이 히든 URL을 광고하지 않게 하려고 일부러 뺐다) localeHref 는
 * 영문에서도 국문 주소를 돌려준다. 그래서 로케일 분기를 여기서 직접 한다.
 *
 * 정식 공개 때는 두 값을 "/ai-quality-policy" 로 바꾸고 호출부를 localeHref 로 되돌린다.
 */
export const AI_POLICY_HREF: Record<Locale, string> = {
    ko: "/preview/ai-quality-policy-4d7e21c8",
    en: "/en/preview/ai-quality-policy-4d7e21c8",
};
