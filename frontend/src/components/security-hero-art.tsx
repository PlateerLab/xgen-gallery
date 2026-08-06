/**
 * Security & Governance 히어로 애니메이션 — 다크 히어로 위에 얹는 순수 SVG(SMIL).
 * 중앙 방패(스캔 라인·펄스 링·체크) + 전 계층 통제 4칩(가드 모델·PII 마스킹·감사 로그·
 * 위험도 등급)이 방패를 감싸고, 각 칩에서 요청 토큰이 방패로 흘러든다. 외부 이미지 없음.
 */
const SHIELD =
    "M220 122 l46 18 v34 c0 34 -22 58 -46 70 c-24 -12 -46 -36 -46 -70 v-34 z";

import type { Locale } from "@/lib/i18n";

/** 칩 라벨·대체 텍스트 — SVG 안쪽 글자도 페이지 언어를 따라가야 한다. */
const T: Record<Locale, { chips: string[]; aria: string }> = {
    ko: {
        chips: ["가드 모델", "PII 마스킹", "감사 로그", "위험도 등급"],
        aria: "AI 가드레일 — 가드 모델·PII 마스킹·감사 로그·위험도 등급 통제가 방패로 요청을 검증하는 보안·거버넌스 개념 애니메이션",
    },
    en: {
        chips: ["Guard model", "PII masking", "Audit log", "Risk grading"],
        aria: "AI guardrails — a conceptual animation of guard models, PII masking, audit logs, and risk grading verifying a request behind a shield",
    },
};

const CHIPS: { x: number; y: number; delay: string }[] = [
    { x: 26, y: 52, delay: "0s" },
    { x: 300, y: 44, delay: "0.9s" },
    { x: 26, y: 268, delay: "1.8s" },
    { x: 300, y: 286, delay: "1.35s" },
];

export function SecurityHeroArt({ locale = "ko" }: { locale?: Locale }) {
    const labels = T[locale].chips;
    return (
        <div className="relative mx-auto w-full max-w-[440px]">
            <svg
                viewBox="0 0 440 360"
                className="block h-auto w-full"
                role="img"
                aria-label={T[locale].aria}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="sg-shield" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#22d3ee" />
                        <stop offset="1" stopColor="#2f7bff" />
                    </linearGradient>
                    <radialGradient id="sg-glow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
                    </radialGradient>
                    <clipPath id="sg-clip">
                        <path d={SHIELD} />
                    </clipPath>
                </defs>

                {/* 중앙 글로우 */}
                <circle cx="220" cy="182" r="128" fill="url(#sg-glow)" />

                {/* 펄스 링 3겹 */}
                {[0, 1, 2].map((i) => (
                    <circle
                        key={i}
                        cx="220"
                        cy="178"
                        r="62"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1.4"
                        opacity="0"
                    >
                        <animate
                            attributeName="r"
                            values="60;118"
                            dur="3s"
                            begin={`${i}s`}
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.5;0"
                            dur="3s"
                            begin={`${i}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}

                {/* 회전 점선 링(거버넌스 경계) */}
                <circle
                    cx="220"
                    cy="178"
                    r="66"
                    fill="none"
                    stroke="rgba(125,211,252,0.4)"
                    strokeWidth="1"
                    strokeDasharray="2 9"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 220 178"
                        to="360 220 178"
                        dur="26s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* 칩 → 방패 커넥터 + 흐르는 요청 토큰 */}
                {CHIPS.map((c, ci) => {
                    const from = `${c.x + 48} ${c.y + 13}`;
                    const to = "220 178";
                    return (
                        <g key={`link-${ci}`}>
                            <line
                                x1={c.x + 48}
                                y1={c.y + 13}
                                x2="220"
                                y2="178"
                                stroke="rgba(125,211,252,0.22)"
                                strokeWidth="1.2"
                                strokeDasharray="3 4"
                            />
                            <circle r="3" fill="#7dd3fc">
                                <animateMotion
                                    dur="2.4s"
                                    begin={c.delay}
                                    repeatCount="indefinite"
                                    path={`M${from} L${to}`}
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0;1;1;0"
                                    keyTimes="0;0.15;0.8;1"
                                    dur="2.4s"
                                    begin={c.delay}
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                    );
                })}

                {/* 방패 */}
                <path
                    d={SHIELD}
                    fill="rgba(9,15,32,0.72)"
                    stroke="url(#sg-shield)"
                    strokeWidth="2.4"
                />
                {/* 스캔 라인(방패 내부로 클립) */}
                <g clipPath="url(#sg-clip)">
                    <rect x="170" y="122" width="100" height="3" fill="#7dd3fc" opacity="0.85">
                        <animate
                            attributeName="y"
                            values="126;236;126"
                            dur="2.8s"
                            repeatCount="indefinite"
                        />
                    </rect>
                    <rect x="170" y="122" width="100" height="26" fill="url(#sg-glow)" opacity="0.5">
                        <animate
                            attributeName="y"
                            values="112;222;112"
                            dur="2.8s"
                            repeatCount="indefinite"
                        />
                    </rect>
                </g>
                {/* 체크 */}
                <path
                    d="M203 180 l11 11 l23 -27"
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <animate
                        attributeName="opacity"
                        values="0.55;1;0.55"
                        dur="2.8s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* 통제 칩 4종 */}
                {CHIPS.map((c, ci) => (
                    <g key={`chip-${ci}`}>
                        <rect
                            x={c.x}
                            y={c.y}
                            width="96"
                            height="26"
                            rx="8"
                            fill="rgba(255,255,255,0.06)"
                            stroke="rgba(125,211,252,0.32)"
                        />
                        <circle cx={c.x + 13} cy={c.y + 13} r="3.2" fill="#5eead4">
                            <animate
                                attributeName="opacity"
                                values="0.4;1;0.4"
                                dur="2.4s"
                                begin={c.delay}
                                repeatCount="indefinite"
                            />
                        </circle>
                        <text
                            x={c.x + 24}
                            y={c.y + 17}
                            fontSize="11.5"
                            fontWeight="700"
                            fill="#e6f6ff"
                        >
                            {labels[ci]}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
