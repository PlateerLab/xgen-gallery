import { AiQualityPolicyPageContent } from "@/components/pages/ai-quality-policy-page";
import { pageMetadata } from "@/lib/metadata";

/**
 * AI Quality Policy (English overview) — 승인 대기 히든 프리뷰.
 *
 * 전문은 한국어 정본만 두므로(인증 증빙용 법적 문서) 「전문 보기」는 한국어 프리뷰로
 * 넘어간다. 페이지 안에서 fullLangNote 로 그 사실을 영문 방문자에게 알린다.
 * 정식 공개 절차는 한국어 개요 프리뷰 주석 참고.
 */
const KO_BASE = "/preview/ai-quality-policy-4d7e21c8";

export const metadata = pageMetadata({
    title: "AI Quality Policy",
    description:
        "The AI quality principles of Plateer AI Lab and how they are built into XGEN — our commitment on safety, accountability, controllability, and operational quality.",
    path: `${KO_BASE}`,
    locale: "en",
    robots: { index: false, follow: false },
});

export default function AiQualityPolicyPreviewPageEn() {
    return (
        <AiQualityPolicyPageContent locale="en" fullHref={`${KO_BASE}/full`} />
    );
}
