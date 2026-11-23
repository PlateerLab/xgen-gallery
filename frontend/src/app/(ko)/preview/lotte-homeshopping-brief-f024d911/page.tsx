import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { LotteHomeshoppingBriefBody } from "@/components/case-lotte-homeshopping-brief";

/**
 * 롯데홈쇼핑 고객사례 요약판 — 고객 검토용 히든 페이지(제주은행 사례 형식).
 * 상세본 /preview/lotte-homeshopping-30f6477b 은 그대로 유지한다.
 * 추측하기 어려운 토큰 URL + noindex, 사이트맵·GNB·사례 목록에 넣지 않는다.
 */
export const metadata: Metadata = {
    title: "롯데홈쇼핑 고객사례 (검토본 · 요약판)",
    robots: { index: false, follow: false },
};

export default function LotteCaseBriefPreviewPage() {
    return (
        <>
            <SiteNav />
            <LotteHomeshoppingBriefBody locale="ko" preview />
            <SiteFooter />
        </>
    );
}
