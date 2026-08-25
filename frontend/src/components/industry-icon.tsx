import type { IndustryKey } from "@/lib/customers";

/**
 * 산업별 일러스트 — About 의 "어디에 적용하는가" 카드에 붙는다.
 *
 * 아이콘 라이브러리를 쓰지 않고 path 로 직접 그린다. 산업을 가리키는 기호는
 * 범용 아이콘 세트에 딱 맞는 것이 드물고(커머스=장바구니는 있어도 "공공"은 없다),
 * 넷을 나란히 놓았을 때 굵기와 여백이 같아야 한 세트로 읽힌다.
 *
 * 모두 24x24 좌표계에 선으로만 그려 카드 배경색과 무관하게 얹힌다.
 */
const S = {
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
};

export function IndustryIcon({
    kind,
    className,
}: {
    kind: IndustryKey;
    className?: string;
}) {
    return (
        <svg
            aria-hidden
            className={className}
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...S}
        >
            {kind === "commerce" && (
                <>
                    {/* 장바구니와 태그 — 상품 검색·추천 */}
                    <path d="M3 4h2l2.2 10.4a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.2L20 7.5H6" />
                    <circle cx="9.5" cy="19.5" r="1.3" />
                    <circle cx="17" cy="19.5" r="1.3" />
                </>
            )}
            {kind === "finance" && (
                <>
                    {/* 신전 기둥 — 금융기관 */}
                    <path d="M3 9.5 12 4l9 5.5M4.5 9.5V18M9.5 9.5V18M14.5 9.5V18M19.5 9.5V18M3 21h18" />
                </>
            )}
            {kind === "public" && (
                <>
                    {/* 방패와 체크 — 공공·신뢰 */}
                    <path d="M12 3 4.5 6v6c0 4.4 3.1 8.3 7.5 9.3 4.4-1 7.5-4.9 7.5-9.3V6z" />
                    <path d="M9 12.2l2.2 2.2L15.5 10" />
                </>
            )}
            {kind === "it-services" && (
                <>
                    {/* 꺾쇠와 톱니 — 개발·엔지니어링 */}
                    <path d="M8 8.5 4.5 12 8 15.5M16 8.5 19.5 12 16 15.5M13.6 5.5l-3.2 13" />
                </>
            )}
        </svg>
    );
}
