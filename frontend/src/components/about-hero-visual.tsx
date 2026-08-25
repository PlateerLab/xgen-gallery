/**
 * About 히어로 오른쪽 비주얼 — 연구소가 도는 다섯 단계를 하나의 고리로 그린다.
 *
 *   연구 → 오픈소스 → XGEN 플랫폼 → 고객사 → 피드백 → 다시 연구
 *
 * 끝이 있는 파이프라인이 아니라 닫힌 고리라는 점이 핵심이다. 고객 현장에서 나온
 * 피드백이 다시 연구로 들어와 다음 바퀴를 돌린다.
 *
 * 아이콘은 외부 아이콘 폰트를 쓰지 않고 path 로 직접 그린다 — 배경 사진 위에 얹히는
 * 흰 선 그래픽이라 두께와 색을 이 파일 안에서 통제해야 한다.
 *
 * 애니메이션은 CSS 로만 돌린다. 자바스크립트가 없어 서버 컴포넌트로 두고,
 * prefers-reduced-motion 은 globals.css 의 미디어 쿼리가 받는다.
 */
const C = { x: 320, y: 320 };
const R_RING = 132;
const R_CARD = 236;
const CARD = { w: 150, h: 92 };

/** 12시부터 시계 방향으로 72도씩. 고리를 도는 순서 그대로다. */
const STAGES = [
    {
        ko: "연구",
        en: "Research",
        desc: ["Enterprise AI의", "근간이 되는 핵심 기술"],
        icon: "research",
    },
    {
        ko: "오픈소스",
        en: "Open Source",
        desc: ["MIT License 기반", "오픈소스 공개"],
        icon: "code",
    },
    {
        ko: "XGEN 플랫폼",
        en: "AI Platform",
        desc: ["Enterprise AI", "Platform 개발"],
        icon: "platform",
    },
    {
        ko: "고객사",
        en: "Customers",
        desc: ["고객사 적용 및", "비즈니스 가치 창출"],
        icon: "building",
    },
    {
        ko: "피드백",
        en: "Feedback",
        desc: ["사용자 피드백과", "운영 데이터"],
        icon: "chat",
    },
] as const;

const FONT =
    "Pretendard,'Pretendard Variable','Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

function at(i: number, radius: number) {
    const deg = -90 + i * (360 / STAGES.length);
    const rad = (deg * Math.PI) / 180;
    return {
        x: C.x + radius * Math.cos(rad),
        y: C.y + radius * Math.sin(rad),
        deg,
    };
}

/** 단계별 아이콘. 모두 24x24 기준으로 그리고 배치할 때 옮긴다. */
function Icon({ kind }: { kind: (typeof STAGES)[number]["icon"] }) {
    const s = {
        stroke: "#ffffff",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        fill: "none",
    };
    switch (kind) {
        case "research": // 플라스크
            return (
                <g {...s}>
                    <path d="M9 3h6M10 3v6.5L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3" />
                    <path d="M7.5 15h9" />
                </g>
            );
        case "code": // 꺾쇠
            return (
                <g {...s}>
                    <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4" />
                </g>
            );
        case "platform": // 화면
            return (
                <g {...s}>
                    <rect x="3" y="5" width="18" height="12" rx="2" />
                    <path d="M9 21h6M12 17v4" />
                    <path d="M9.5 9l5 4M14.5 9l-5 4" />
                </g>
            );
        case "building": // 건물
            return (
                <g {...s}>
                    <path d="M4 21V7l6-3v17M14 21V10l6-3v14M2 21h20" />
                    <path d="M7 9v.01M7 13v.01M17 12v.01M17 16v.01" />
                </g>
            );
        case "chat": // 말풍선
            return (
                <g {...s}>
                    <path d="M3 15V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7l-4 2z" />
                    <path d="M18 8h1a2 2 0 0 1 2 2v9l-3-2h-6a2 2 0 0 1-2-2" />
                </g>
            );
    }
}

export function AboutHeroVisual({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 640 640"
            role="img"
            aria-label="연구에서 오픈소스, XGEN 플랫폼, 고객사, 피드백을 거쳐 다시 연구로 돌아오는 순환 구조. 가운데는 Plateer AI Labs."
            fill="none"
        >
            <defs>
                <radialGradient id="ahvCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="ahvRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#2f7bff" />
                </linearGradient>
            </defs>

            {/* 고리 — 바탕선 위로 빛이 한 바퀴 돈다 */}
            <circle
                cx={C.x}
                cy={C.y}
                r={R_RING}
                stroke="#ffffff"
                strokeOpacity="0.2"
                strokeWidth="2"
            />
            <circle
                className="ahv-loop"
                cx={C.x}
                cy={C.y}
                r={R_RING}
                pathLength={1}
                stroke="url(#ahvRing)"
                strokeWidth="3.5"
                strokeLinecap="round"
            />

            {/* 진행 방향 화살표 — 두 단계 사이 중간 지점 */}
            {STAGES.map((_, i) => {
                const m = at(i + 0.5, R_RING);
                return (
                    <g
                        key={`ar-${i}`}
                        transform={`translate(${m.x} ${m.y}) rotate(${m.deg + 90})`}
                    >
                        <path d="M -6 -5 L 6 0 L -6 5 Z" fill="#ffffff" fillOpacity="0.5" />
                    </g>
                );
            })}

            {/* 가운데 */}
            <circle
                className="ahv-breathe"
                cx={C.x}
                cy={C.y}
                r="96"
                fill="url(#ahvCore)"
                style={{ transformOrigin: `${C.x}px ${C.y}px` }}
            />
            <text
                x={C.x}
                y={C.y - 6}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize="21"
                fontWeight="800"
                letterSpacing="2.5"
                fill="#ffffff"
            >
                PLATEER
            </text>
            <text
                x={C.x}
                y={C.y + 20}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize="21"
                fontWeight="800"
                letterSpacing="2.5"
                fill="#7dd3fc"
            >
                LABS
            </text>

            {/* 다섯 단계 카드 — 아이콘 · 제목 · 설명 */}
            {STAGES.map((s, i) => {
                const p = at(i, R_CARD);
                const left = p.x - CARD.w / 2;
                const top = p.y - CARD.h / 2;
                return (
                    <g
                        key={s.ko}
                        className="ahv-node"
                        style={{
                            animationDelay: `${i * 0.5}s`,
                            transformOrigin: `${p.x}px ${p.y}px`,
                        }}
                    >
                        <rect
                            x={left}
                            y={top}
                            width={CARD.w}
                            height={CARD.h}
                            rx="16"
                            fill="#0b1020"
                            fillOpacity="0.66"
                            stroke="#ffffff"
                            strokeOpacity="0.26"
                        />
                        {/* 아이콘 배지 */}
                        <circle
                            cx={left + 26}
                            cy={top + 24}
                            r="15"
                            fill="#2f7bff"
                            fillOpacity="0.28"
                            stroke="#7dd3fc"
                            strokeOpacity="0.5"
                        />
                        <g transform={`translate(${left + 14} ${top + 12}) scale(0.98)`}>
                            <Icon kind={s.icon} />
                        </g>

                        <text
                            x={left + 48}
                            y={top + 22}
                            fontFamily={FONT}
                            fontSize="14"
                            fontWeight="700"
                            fill="#ffffff"
                        >
                            {s.ko}
                        </text>
                        <text
                            x={left + 48}
                            y={top + 35}
                            fontFamily={FONT}
                            fontSize="9"
                            letterSpacing="0.4"
                            fill="#7dd3fc"
                        >
                            {s.en}
                        </text>

                        {s.desc.map((line, k) => (
                            <text
                                key={line}
                                x={left + 14}
                                y={top + 58 + k * 15}
                                fontFamily={FONT}
                                fontSize="11.5"
                                fill="#ffffff"
                                fillOpacity="0.72"
                            >
                                {line}
                            </text>
                        ))}
                    </g>
                );
            })}
        </svg>
    );
}
