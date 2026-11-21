import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { LotteHomeshoppingCaseBody } from "@/components/case-lotte-homeshopping";

/**
 * 롯데홈쇼핑 고객사례 — 고객 검토용 히든 페이지.
 * 추측하기 어려운 토큰 URL + noindex, 사이트맵·GNB·사례 목록에 넣지 않는다.
 * 고객 확인이 끝나면 /customers/case/<slug> 정식 경로로 옮기고 이 주소는 리다이렉트한다.
 */
export const metadata: Metadata = {
    title: "Lotte Homeshopping customer story (review draft)",
    robots: { index: false, follow: false },
};

export default function LotteCasePreviewPage() {
    return (
        <>
            <SiteNav />
            <LotteHomeshoppingCaseBody locale="en" preview />
            <SiteFooter />
        </>
    );
}
