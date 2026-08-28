/**
 * 「왜 필요한가요?」 두 카드에 붙는 작은 일러스트.
 *
 * 왼쪽은 사람이 창 사이를 왕복하는 그림, 오른쪽은 Agent 가 한 번에 결과물까지
 * 가는 그림이다. 대비가 목적이라 두 장의 색을 다르게 쓴다 — 왼쪽은 회색으로
 * 눌러 두고 오른쪽만 파랗게 살린다. 같은 색으로 그리면 무엇이 나아졌는지가
 * 그림에서 안 읽힌다.
 *
 * 두 장의 viewBox 와 요소 높이를 맞춰 카드 두 개가 나란히 놓여도 어긋나지 않는다.
 */
const VB = "0 0 360 116";

/** 창 하나 — 제목줄 + 본문 두 줄 */
function Win({ x, dim }: { x: number; dim: boolean }) {
    const line = dim ? "#d7dce4" : "#c6d2e4";
    const body = dim ? "#f4f6f9" : "#f3f7ff";
    const edge = dim ? "#e2e6ec" : "#cfe0ff";
    return (
        <g>
            <rect x={x} y="22" width="86" height="62" rx="9" fill={body} stroke={edge} />
            <rect x={x} y="22" width="86" height="16" rx="9" fill={edge} opacity="0.55" />
            <rect x={x} y="32" width="86" height="6" fill={edge} opacity="0.55" />
            <path
                d={`M${x + 14} 54h58M${x + 14} 66h38`}
                stroke={line}
                strokeWidth="5"
                strokeLinecap="round"
            />
        </g>
    );
}

/** 기존 방식 — 사람이 창 사이를 오간다 */
export function DexWhyBeforeArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Win x={16} dim />
            <Win x={137} dim />
            <Win x={258} dim />

            {/* 왕복 — 오갈 때마다 사람이 손으로 옮긴다 */}
            <g stroke="#b8bfc9" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M108 44 C 122 30 138 30 152 44" />
                <path d="M152 62 C 138 76 122 76 108 62" />
                <path d="M229 44 C 243 30 259 30 273 44" />
                <path d="M273 62 C 259 76 243 76 229 62" />
                <path d="M148 42 l6 3 -1 -7M112 64 l-6 -3 1 7" />
                <path d="M269 42 l6 3 -1 -7M233 64 l-6 -3 1 7" />
            </g>

            {/* 사람 — 이 모든 걸 직접 한다 */}
            <g transform="translate(124 86)">
                <circle cx="6" cy="6" r="6" fill="#9aa3af" />
                <path d="M-6 24c0-6.6 5.4-12 12-12s12 5.4 12 12z" fill="#9aa3af" />
            </g>
            <g transform="translate(226 86)">
                <circle cx="6" cy="6" r="6" fill="#9aa3af" />
                <path d="M-6 24c0-6.6 5.4-12 12-12s12 5.4 12 12z" fill="#9aa3af" />
            </g>
        </svg>
    );
}

/** DeX — Agent 가 한 번에 결과물까지 간다 */
export function DexWhyAfterArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <defs>
                <linearGradient id="wy-brand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
            </defs>

            {/* 한 줄로 지나간다 — 왕복이 없다 */}
            <path d="M78 53 H 248" stroke="#bcd0f5" strokeWidth="2" fill="none" />
            <path d="M244 48 l7 5 -7 5" stroke="#8fb4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Agent */}
            <circle cx="46" cy="53" r="30" fill="url(#wy-brand)" />
            <g
                transform="translate(34 41)"
                stroke="#ffffff"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            >
                <rect x="3" y="7" width="18" height="13.5" rx="3.5" />
                <path d="M12 2v5M8.5 13v.01M15.5 13v.01M9.5 17h5" />
            </g>

            {/* 지나며 다루는 것들 — 작게 얹는다 */}
            <g>
                <rect x="118" y="24" width="46" height="24" rx="8" fill="#f3f7ff" stroke="#cfe0ff" />
                <rect x="174" y="24" width="46" height="24" rx="8" fill="#f3f7ff" stroke="#cfe0ff" />
                <rect x="146" y="60" width="46" height="24" rx="8" fill="#f3f7ff" stroke="#cfe0ff" />
                <circle cx="132" cy="36" r="4" fill="#2f7bff" />
                <circle cx="188" cy="36" r="4" fill="#2f7bff" />
                <circle cx="160" cy="72" r="4" fill="#2f7bff" />
                <path d="M142 36h14M198 36h12M170 72h14" stroke="#c6d2e4" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* 결과물 */}
            <g>
                <path
                    d="M256 26 h34 l16 16 v46 a6 6 0 0 1 -6 6 h-44 a6 6 0 0 1 -6 -6 v-56 a6 6 0 0 1 6 -6z"
                    fill="url(#wy-brand)"
                />
                <path d="M290 26 v16 h16z" fill="#ffffff" fillOpacity="0.45" />
                <path
                    d="M266 62 l8 8 14 -16"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>
        </svg>
    );
}
