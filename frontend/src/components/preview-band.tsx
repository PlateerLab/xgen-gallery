import type { Locale } from "@/lib/i18n";

/**
 * 승인 대기 밴드 — 대외 공개 전 검토본임을 페이지 최상단에 상시 표시한다.
 *
 * 히든 프리뷰(추측 불가 토큰 URL + noindex + 사이트맵·GNB 미노출)와 짝을 이루는
 * 시각 표식이다. 리뷰어가 링크만 받고 들어와도 이 화면이 확정본이 아님을
 * 알 수 있어야 하므로, 화면을 스크롤해도 따라오도록 fixed 로 둔다.
 *
 * 헤더(프로모 배너 + GNB)도 상단 고정이라 그대로 두면 밴드가 헤더를 덮는다.
 * 그래서 밴드를 쓰는 페이지는 `<SiteNav offsetTop={PREVIEW_BAND_H} />`로 헤더를
 * 밴드 높이만큼 내린다 — 두 값이 어긋나지 않도록 높이를 여기서 내보낸다.
 */
export const PREVIEW_BAND_H = 28;

const TEXT: Record<Locale, string> = {
    ko: "승인 대기 · 대외비 — 링크를 아는 사람만 볼 수 있는 검토본",
    en: "Pending approval · Confidential — unlisted review copy",
};

export function PreviewBand({ locale = "ko" }: { locale?: Locale }) {
    return (
        <div
            style={{ height: PREVIEW_BAND_H }}
            className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center bg-[#a11212] text-[12px] font-semibold tracking-tight text-white/90"
        >
            {TEXT[locale]}
        </div>
    );
}
