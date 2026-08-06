import type { Locale } from "@/lib/i18n";

/**
 * PublicationsIllustration — /research#publications 인트로용 일러스트.
 * 구성원들이 발표한 "논문(페이퍼)"을 형상화한다. 여러 장의 페이퍼가 겹쳐
 * 부채꼴로 펼쳐진 위에, 학회 발표를 상징하는 졸업모(graduation cap)와
 * 연구 그래프(막대·꺾은선)를 배치했다. 브랜드 그라디언트(#2f7bff→#7c5cff)를 사용.
 * 순수 SVG(외부 의존 없음), 다크/라이트 모두 어색하지 않은 채도로 구성.
 */
export function PublicationsIllustration({
    className,
    locale = "ko",
}: {
    className?: string;
    locale?: Locale;
}) {
    return (
        <svg
            className={className}
            viewBox="0 0 320 240"
            fill="none"
            role="img"
            aria-label={
                locale === "en"
                    ? "An illustration of papers our members have presented at conferences and in journals"
                    : "구성원들이 학회·저널에 발표한 논문을 형상화한 일러스트"
            }
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="pub-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2f7bff" />
                    <stop offset="100%" stopColor="#7c5cff" />
                </linearGradient>
                <linearGradient id="pub-grad-soft" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#eef3ff" />
                    <stop offset="100%" stopColor="#f3f0ff" />
                </linearGradient>
            </defs>

            {/* 배경 원형 후광 */}
            <circle cx="160" cy="120" r="96" fill="url(#pub-grad-soft)" />

            {/* 뒤로 부채꼴로 펼쳐진 페이퍼 2장 */}
            <g transform="rotate(-13 160 138)">
                <rect x="86" y="70" width="126" height="150" rx="8" fill="#ffffff" stroke="#dbe4f5" strokeWidth="2" />
            </g>
            <g transform="rotate(-4 160 138)">
                <rect x="92" y="66" width="126" height="150" rx="8" fill="#ffffff" stroke="#dbe4f5" strokeWidth="2" />
            </g>

            {/* 앞쪽 메인 페이퍼 */}
            <g transform="rotate(5 160 138)">
                <rect x="100" y="62" width="128" height="152" rx="9" fill="#ffffff" stroke="#cdd9f7" strokeWidth="2" />

                {/* 제목 라인 (강조) */}
                <rect x="116" y="80" width="70" height="9" rx="4.5" fill="url(#pub-grad)" />
                <rect x="116" y="96" width="96" height="5" rx="2.5" fill="#c7d3ea" />

                {/* 저자·본문 라인 */}
                <rect x="116" y="112" width="54" height="4" rx="2" fill="#dbe4f5" />
                <rect x="116" y="124" width="88" height="4" rx="2" fill="#e6ecf7" />
                <rect x="116" y="133" width="80" height="4" rx="2" fill="#e6ecf7" />

                {/* 연구 그래프: 막대 + 꺾은선 */}
                <rect x="116" y="150" width="96" height="48" rx="6" fill="#f5f8ff" stroke="#e2e9f7" strokeWidth="1.5" />
                <rect x="126" y="178" width="9" height="14" rx="2" fill="#9db8f2" />
                <rect x="141" y="170" width="9" height="22" rx="2" fill="#6f8ff0" />
                <rect x="156" y="176" width="9" height="16" rx="2" fill="#9db8f2" />
                <rect x="171" y="164" width="9" height="28" rx="2" fill="#7c5cff" />
                <rect x="186" y="172" width="9" height="20" rx="2" fill="#9db8f2" />
                <path
                    d="M129 172 L145 166 L160 170 L175 158 L191 164"
                    fill="none"
                    stroke="url(#pub-grad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>

            {/* 졸업모(학회 발표 상징) — 우상단 */}
            <g transform="translate(214 44)">
                <circle cx="20" cy="20" r="30" fill="url(#pub-grad)" />
                <path d="M20 10 L38 18 L20 26 L2 18 Z" fill="#ffffff" />
                <path d="M9 21 L9 30 C9 33 31 33 31 30 L31 21" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M38 18 L38 29" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="38" cy="31" r="2.6" fill="#ffffff" />
            </g>

            {/* 인용/피어리뷰 상징 — 좌하단 뱃지 */}
            <g transform="translate(56 168)">
                <circle cx="18" cy="18" r="22" fill="#ffffff" stroke="#dbe4f5" strokeWidth="2" />
                <path
                    d="M14 24 L18 12 L22 24"
                    fill="none"
                    stroke="url(#pub-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M15.5 20 L20.5 20" stroke="url(#pub-grad)" strokeWidth="3" strokeLinecap="round" />
            </g>
        </svg>
    );
}
