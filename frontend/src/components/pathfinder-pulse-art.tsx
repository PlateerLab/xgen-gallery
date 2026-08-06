/**
 * PathFinder 개념 애니메이션 — 레거시 시스템에서 출발해 로그인 → API → 도구 → 테스트
 * 경로를 "탐색(pathfinding)"하며 AI Agent로 연결되는 흐름을 인라인 SVG로 표현한다.
 * JS 없이 CSS 애니메이션으로만 동작(SSR·성능·GEO 안전) + prefers-reduced-motion 존중.
 */
import type { Locale } from "@/lib/i18n";

/** 흐름 노드 라벨 — SVG 안쪽 글자도 페이지 언어를 따라간다. */
const T: Record<Locale, { steps: string[]; legacy: string; aria: string }> = {
    ko: {
        steps: ["로그인", "API 연결", "도구 등록", "테스트"],
        legacy: "레거시 시스템",
        aria: "레거시 시스템에서 로그인·API 연결·도구 등록·테스트 경로를 거쳐 AI 에이전트로 연결되는 패스파인더 흐름",
    },
    en: {
        steps: ["Sign in", "Connect API", "Register tool", "Test"],
        legacy: "Legacy system",
        aria: "The PathFinder flow — from a legacy system through sign-in, API connection, tool registration, and testing to an AI agent",
    },
};

const ROUTE =
    "M132 116 C 172 116 178 74 210 74 C 244 74 252 150 286 150 C 320 150 330 74 362 74 C 396 74 404 132 434 132 C 456 132 462 116 470 116";

const STEPS: { x: number; y: number; key: number }[] = [
    { x: 210, y: 74, key: 0 },
    { x: 286, y: 150, key: 1 },
    { x: 362, y: 74, key: 2 },
    { x: 434, y: 132, key: 3 },
];

export function PathfinderPulseArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <svg
            viewBox="0 0 560 220"
            className="pf-art h-auto w-full"
            role="img"
            aria-label={L.aria}
        >
            <defs>
                <linearGradient id="pf-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#2f7bff" />
                    <stop offset="1" stopColor="#7c5cff" />
                </linearGradient>
                <radialGradient id="pf-agent" cx="0.35" cy="0.3" r="0.9">
                    <stop offset="0" stopColor="#8fb4ff" />
                    <stop offset="0.55" stopColor="#3f7bff" />
                    <stop offset="1" stopColor="#5b46e0" />
                </radialGradient>
            </defs>

            <style>{`
                .pf-art { --pf-dur: 3.4s; }
                .pf-route { stroke: #d6def0; stroke-width: 2.5; fill: none; }
                .pf-comet {
                    stroke: url(#pf-line); stroke-width: 3.5; fill: none; stroke-linecap: round;
                    stroke-dasharray: 16 520; stroke-dashoffset: 536;
                    animation: pf-travel var(--pf-dur) linear infinite;
                }
                .pf-step-glow { animation: pf-pulse 2.6s ease-in-out infinite; }
                .pf-step-glow:nth-of-type(1) { animation-delay: 0s; }
                .pf-step-glow:nth-of-type(2) { animation-delay: .35s; }
                .pf-step-glow:nth-of-type(3) { animation-delay: .7s; }
                .pf-step-glow:nth-of-type(4) { animation-delay: 1.05s; }
                .pf-ping { transform-box: fill-box; transform-origin: center; animation: pf-ping 2.8s ease-out infinite; }
                .pf-scan { transform-box: fill-box; transform-origin: center; animation: pf-ping 2.8s ease-out infinite .6s; }
                @keyframes pf-travel { to { stroke-dashoffset: 0; } }
                @keyframes pf-pulse { 0%,100% { opacity: .25; } 50% { opacity: 1; } }
                @keyframes pf-ping {
                    0% { transform: scale(.5); opacity: .55; }
                    80%,100% { transform: scale(1.9); opacity: 0; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .pf-comet { animation: none; stroke-dasharray: none; stroke-dashoffset: 0; opacity: .9; }
                    .pf-step-glow, .pf-ping, .pf-scan { animation: none; opacity: .9; }
                }
            `}</style>

            {/* 레거시 시스템 — 브라우저 창 */}
            <g>
                <rect x="26" y="72" width="106" height="82" rx="12" fill="#ffffff" stroke="#d4ddf2" strokeWidth="1.5" />
                <rect x="26" y="72" width="106" height="22" rx="12" fill="#eef2fa" />
                <rect x="26" y="83" width="106" height="11" fill="#eef2fa" />
                <circle cx="40" cy="83" r="3" fill="#c9d3e6" />
                <circle cx="51" cy="83" r="3" fill="#c9d3e6" />
                <circle cx="62" cy="83" r="3" fill="#c9d3e6" />
                <rect x="40" y="106" width="78" height="7" rx="3.5" fill="#dfe6f4" />
                <rect x="40" y="120" width="58" height="7" rx="3.5" fill="#e8edf7" />
                <rect x="40" y="134" width="66" height="7" rx="3.5" fill="#e8edf7" />
                {/* API 감지 스캔 링 */}
                <circle className="pf-scan" cx="79" cy="113" r="20" fill="none" stroke="#2f7bff" strokeWidth="2" />
            </g>
            <text x="79" y="176" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#5a6478">{L.legacy}</text>

            {/* 경로 */}
            <path className="pf-route" d={ROUTE} />
            <path className="pf-comet" d={ROUTE} />

            {/* 경유 노드 */}
            {STEPS.map((s, i) => (
                <g key={s.key}>
                    <circle className="pf-step-glow" cx={s.x} cy={s.y} r="14" fill="url(#pf-line)" opacity="0.28" />
                    <circle cx={s.x} cy={s.y} r="9" fill="#ffffff" stroke="url(#pf-line)" strokeWidth="2.5" />
                    <text x={s.x} y={s.y + 3.5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#2461d8">{i + 1}</text>
                    <text
                        x={s.x}
                        y={s.y < 110 ? s.y - 22 : s.y + 30}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#5a6478"
                    >
                        {L.steps[s.key]}
                    </text>
                </g>
            ))}

            {/* AI Agent */}
            <g>
                <circle className="pf-ping" cx="502" cy="116" r="30" fill="none" stroke="#3f7bff" strokeWidth="2" />
                <circle cx="502" cy="116" r="30" fill="url(#pf-agent)" />
                {/* 나침반(패스파인더) 마크 */}
                <circle cx="502" cy="116" r="18" fill="none" stroke="#ffffff" strokeWidth="1.6" opacity="0.85" />
                <path d="M502 104 L507 116 L502 128 L497 116 Z" fill="#ffffff" />
            </g>
            <text x="502" y="176" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#5a6478">AI Agent</text>
        </svg>
    );
}
