import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { LotteHomeshoppingBriefBody } from "@/components/case-lotte-homeshopping-brief";

/**
 * 롯데홈쇼핑 고객사례 요약판 — 2026-11-27 공개 전환(색인 허용, 검토본 띠 제거).
 * 주소는 공유된 그대로 유지한다. 상세본 /preview/lotte-homeshopping-30f6477b 은 그대로 둔다.
 */
export const metadata: Metadata = {
    title: "롯데홈쇼핑 고객사례",
};

export default function LotteCaseBriefPreviewPage() {
    return (
        <>
            <SiteNav />
            <LotteHomeshoppingBriefBody locale="ko" />
            <SiteFooter />
        </>
    );
}
