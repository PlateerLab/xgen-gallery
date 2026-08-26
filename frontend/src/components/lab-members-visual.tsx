/**
 * 랩 멤버스 헤더 일러스트 — "AI를 연구하고, 현실에 구현하는 사람들".
 *
 * 사람 얼굴을 늘어놓는 대신 그들이 하는 일을 그린다. 연구(플라스크)에서 시작해
 * 코드와 플랫폼을 거쳐 고객 현장에 닿고, 거기서 얻은 것이 다시 연구로 돌아오는
 * 고리다. 가운데 세 사람이 그 고리를 함께 돌린다.
 *
 * 사진을 쓰지 않는 이유는 두 가지다. 헤더에 얼굴 18개를 늘어놓으면 아래 카드와
 * 같은 내용이 두 번 나오고, 명단을 한 화면에 모아 보여주는 성격이 강해진다.
 *
 * 아이콘은 path 로 직접 그린다 — 넷을 나란히 놓았을 때 선 굵기와 여백이 같아야
 * 한 세트로 읽힌다.
 */
const FONT =
    "Pretendard,'Pretendard Variable','Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

/** 고리 위 네 지점 — 연구 → 코드 → 플랫폼 → 현장 */
const STOPS = [
    { ko: "연구", en: "Research", x: 300, y: 84 },
    { ko: "코드", en: "Open Source", x: 496, y: 226 },
    { ko: "제품", en: "Platform", x: 421, y: 456 },
    { ko: "현장", en: "Customers", x: 179, y: 456 },
    { ko: "배움", en: "Insight", x: 104, y: 226 },
] as const;

function StopIcon({ i }: { i: number }) {
    const s = {
        stroke: "#ffffff",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        fill: "none",
    };
    switch (i) {
        case 0: // 플라스크 — 연구
            return (
                <g {...s}>
                    <path d="M9 3h6M10 3v6.5L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3" />
                    <path d="M7.5 15h9" />
                </g>
            );
        case 1: // 꺾쇠 — 오픈소스
            return (
                <g {...s}>
                    <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4" />
                </g>
            );
        case 2: // 겹친 판 — 플랫폼
            return (
                <g {...s}>
                    <path d="M12 3 3 7.5 12 12l9-4.5z" />
                    <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
                </g>
            );
        case 3: // 건물 — 고객 현장
            return (
                <g {...s}>
                    <path d="M4 21V7l6-3v17M14 21V10l6-3v14M2 21h20" />
                    <path d="M7 9v.01M7 13v.01M17 12v.01M17 16v.01" />
                </g>
            );
        default: // 전구 — 배움
            return (
                <g {...s}>
                    <path d="M9 18h6M10 21h4" />
                    <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" />
                </g>
            );
    }
}

export function LabMembersVisual({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 600 560"
            role="img"
            aria-label="연구에서 오픈소스, 제품, 고객 현장을 거쳐 다시 연구로 돌아오는 고리. 가운데에서 세 사람이 함께 일하고 있다."
            fill="none"
        >
            <defs>
                <linearGradient id="lmRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#2f7bff" />
                </linearGradient>
                <radialGradient id="lmGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#2f7bff" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#2f7bff" stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="300" cy="280" r="250" fill="url(#lmGlow)" />

            {/* 고리 — 다섯 지점을 잇는다 */}
            <circle
                cx="300"
                cy="280"
                r="196"
                stroke="#bcd0f5"
                strokeWidth="2"
                strokeDasharray="4 8"
            />

            {/* 가운데: 함께 일하는 세 사람 */}
            <g>
                {/* 뒤쪽 두 사람 */}
                <g opacity="0.55">
                    <circle cx="238" cy="252" r="26" fill="#bcd0f5" />
                    <path
                        d="M200 320c0-21 17-38 38-38s38 17 38 38"
                        fill="#bcd0f5"
                    />
                    <circle cx="362" cy="252" r="26" fill="#bcd0f5" />
                    <path
                        d="M324 320c0-21 17-38 38-38s38 17 38 38"
                        fill="#bcd0f5"
                    />
                </g>
                {/* 앞쪽 한 사람 */}
                <circle cx="300" cy="238" r="32" fill="url(#lmRing)" />
                <path
                    d="M254 330c0-25 21-46 46-46s46 21 46 46"
                    fill="url(#lmRing)"
                />
                {/* 손에 든 화면 — 연구를 제품으로 옮기는 장면 */}
                <rect
                    x="256"
                    y="344"
                    width="88"
                    height="58"
                    rx="9"
                    fill="#ffffff"
                    stroke="#2f7bff"
                    strokeWidth="2"
                />
                <path
                    d="M270 372h18M270 384h34M298 360h32"
                    stroke="#7dd3fc"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <circle cx="278" cy="360" r="5" fill="#2f7bff" />
            </g>

            {/* 다섯 지점 */}
            {STOPS.map((s, i) => (
                <g key={s.ko}>
                    <circle
                        cx={s.x}
                        cy={s.y}
                        r="34"
                        fill="#ffffff"
                        stroke="#bcd0f5"
                        strokeWidth="2"
                    />
                    <circle cx={s.x} cy={s.y} r="34" fill="url(#lmRing)" opacity="0.92" />
                    <g transform={`translate(${s.x - 12} ${s.y - 20}) scale(1)`}>
                        <StopIcon i={i} />
                    </g>
                    <text
                        x={s.x}
                        y={s.y + 17}
                        textAnchor="middle"
                        fontFamily={FONT}
                        fontSize="11"
                        fontWeight="700"
                        fill="#ffffff"
                    >
                        {s.ko}
                    </text>
                </g>
            ))}
        </svg>
    );
}
