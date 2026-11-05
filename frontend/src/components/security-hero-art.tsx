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

/** 보안 통제 슬라이드 — 왼쪽의 공격 시도가 방패에서 막히고 허용된 흐름만 자원에 닿는다. */
const ATTACK_T: Record<Locale, { attacks: string[]; assets: string[]; aria: string }> = {
    ko: {
        attacks: ["권한 우회", "비로그인 요청", "설정 조회"],
        assets: ["데이터", "AI Agent"],
        aria: "보안 통제 — 권한 우회·비로그인 요청·설정 조회 시도가 방패에서 차단되고 허용된 흐름만 데이터와 AI Agent에 닿는 개념 애니메이션",
    },
    en: {
        attacks: ["Bypass", "No login", "Config read"],
        assets: ["Data", "AI Agent"],
        aria: "Security controls — a conceptual animation of permission bypass, unauthenticated, and configuration-read attempts stopped at a shield while allowed traffic reaches data and AI agents",
    },
};

const ATTACKS: { y: number; tx: number; ty: number; delay: string }[] = [
    { y: 70, tx: 172, ty: 146, delay: "0s" },
    { y: 165, tx: 168, ty: 178, delay: "0.8s" },
    { y: 260, tx: 180, ty: 212, delay: "1.6s" },
];

const ASSETS: { y: number; delay: string }[] = [
    { y: 112, delay: "0.4s" },
    { y: 218, delay: "1.4s" },
];

export function SecurityAttackArt({ locale = "ko" }: { locale?: Locale }) {
    const t = ATTACK_T[locale];
    return (
        <div className="relative mx-auto w-full max-w-[440px]">
            <svg
                viewBox="0 0 440 360"
                className="block h-auto w-full"
                role="img"
                aria-label={t.aria}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="sa-shield" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#22d3ee" />
                        <stop offset="1" stopColor="#2f7bff" />
                    </linearGradient>
                    <radialGradient id="sa-glow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#22d3ee" stopOpacity="0.3" />
                        <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="220" cy="182" r="120" fill="url(#sa-glow)" />

                {[0, 1].map((i) => (
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
                            values="60;104"
                            dur="3s"
                            begin={`${i * 1.5}s`}
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.45;0"
                            dur="3s"
                            begin={`${i * 1.5}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}

                {ATTACKS.map((a, i) => (
                    <g key={a.y}>
                        <line
                            x1="112"
                            y1={a.y + 13}
                            x2={a.tx}
                            y2={a.ty}
                            stroke="rgba(248,113,113,0.35)"
                            strokeWidth="1.2"
                            strokeDasharray="3 4"
                        />
                        <rect
                            x="8"
                            y={a.y}
                            width="104"
                            height="26"
                            rx="13"
                            fill="rgba(127,29,29,0.35)"
                            stroke="rgba(248,113,113,0.55)"
                        />
                        <text
                            x="60"
                            y={a.y + 17.5}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="600"
                            fill="#fecaca"
                        >
                            {t.attacks[i]}
                        </text>
                        <circle r="3.5" fill="#f87171" opacity="0">
                            <animateMotion
                                dur="2.4s"
                                begin={a.delay}
                                repeatCount="indefinite"
                                path={`M112 ${a.y + 13} L${a.tx} ${a.ty}`}
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0;0"
                                keyTimes="0;0.1;0.68;0.72;1"
                                dur="2.4s"
                                begin={a.delay}
                                repeatCount="indefinite"
                            />
                        </circle>
                        <g opacity="0">
                            <circle cx={a.tx} cy={a.ty} r="9" fill="#ef4444" />
                            <path
                                d={`M${a.tx - 4} ${a.ty - 4} l8 8 M${a.tx + 4} ${a.ty - 4} l-8 8`}
                                stroke="#ffffff"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                            />
                            <animate
                                attributeName="opacity"
                                values="0;0;1;1;0"
                                keyTimes="0;0.68;0.72;0.9;1"
                                dur="2.4s"
                                begin={a.delay}
                                repeatCount="indefinite"
                            />
                        </g>
                    </g>
                ))}

                {ASSETS.map((a, i) => (
                    <g key={a.y}>
                        <line
                            x1="268"
                            y1="178"
                            x2="336"
                            y2={a.y + 13}
                            stroke="rgba(94,234,212,0.4)"
                            strokeWidth="1.2"
                        />
                        <rect
                            x="336"
                            y={a.y}
                            width="96"
                            height="26"
                            rx="13"
                            fill="rgba(13,148,136,0.18)"
                            stroke="rgba(94,234,212,0.55)"
                        />
                        <text
                            x="384"
                            y={a.y + 17.5}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="600"
                            fill="#ccfbf1"
                        >
                            {t.assets[i]}
                        </text>
                        <circle r="3" fill="#5eead4" opacity="0">
                            <animateMotion
                                dur="2s"
                                begin={a.delay}
                                repeatCount="indefinite"
                                path={`M268 178 L336 ${a.y + 13}`}
                            />
                            <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.15;0.85;1"
                                dur="2s"
                                begin={a.delay}
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                ))}

                <path
                    d={SHIELD}
                    fill="rgba(9,15,32,0.78)"
                    stroke="url(#sa-shield)"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                />
                <rect x="203" y="176" width="34" height="27" rx="5" fill="url(#sa-shield)" />
                <path
                    d="M210 176 v-9 a10 10 0 0 1 20 0 v9"
                    fill="none"
                    stroke="url(#sa-shield)"
                    strokeWidth="3.2"
                />
                <circle cx="220" cy="188" r="3.4" fill="#0a1020" />
            </svg>
        </div>
    );
}
