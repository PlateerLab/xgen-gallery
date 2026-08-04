import { cn } from "@/lib/cn";
import type { IndustryKey } from "@/lib/customers";

/**
 * 산업(Industry)을 상징하는 브랜드 SVG 키비주얼. 고객사례 카드 배경으로 쓴다.
 * 실제 사진 대신 산업 모티프(금융·커머스·공공·IT·제조)를 자체 SVG로 표현 —
 * 외부 이미지 없이 CSP-safe, 어떤 사례든 산업만으로 일관된 비주얼을 얻는다.
 */

// 브랜드 팔레트(시안 #00acee → 블루 #185aea → 딥네이비 #0b1224) 안에서만 고른다.
// 인디고·바이올렛은 사이트 어디에도 쓰지 않는 색이라 배제하고, 산업 구분은 색상(hue)
// 점프 대신 밝은 쪽 끝(시안의 온도)과 모티프로 준다.
const GRAD: Record<IndustryKey, [string, string, string]> = {
    finance: ["#00acee", "#1f5fd0", "#0d1b45"],
    commerce: ["#58c6ef", "#2f7bff", "#131f4e"],
    public: ["#24a3e0", "#1a4bb2", "#0a1436"],
    "it-services": ["#00cfd8", "#1976d6", "#0b1a3e"],
};

/**
 * 산업별 리치 씬 — 배경 실루엣 + 주요 오브젝트(면) + 액센트를 겹쳐 입체감을 준다.
 * 좌표는 viewBox(400×250) 절대값. 하단(y>150)은 카드 그라디언트로 자연스럽게 어두워짐.
 */
function Motif({ industry }: { industry: IndustryKey }) {
    switch (industry) {
        case "finance":
            return (
                <g>
                    {/* 상승 트렌드 라인 */}
                    <polyline
                        points="44,92 112,74 176,86 240,58 336,40"
                        fill="none"
                        stroke="#bfe3ff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M336 40 l-15 1 l7 12 z" fill="#bfe3ff" />
                    {/* 배경 빌딩 */}
                    <g fill="#dbe9ff" opacity="0.2">
                        <rect x="48" y="104" width="34" height="60" rx="3" />
                        <rect x="312" y="96" width="34" height="68" rx="3" />
                    </g>
                    {/* 전경 스카이라인 */}
                    <g fill="#eef5ff">
                        <rect x="92" y="94" width="42" height="70" rx="3" />
                        <rect x="150" y="70" width="46" height="94" rx="3" />
                        <rect x="214" y="100" width="42" height="64" rx="3" />
                        <rect x="264" y="82" width="42" height="82" rx="3" />
                    </g>
                    {/* 창문 */}
                    <g fill="#3b6fe0" opacity="0.45">
                        {[100, 118].map((x) =>
                            [104, 122, 140].map((y) => (
                                <rect key={`f${x}-${y}`} x={x} y={y} width="8" height="9" rx="1.5" />
                            )),
                        )}
                        {[160, 178].map((x) =>
                            [82, 100, 118, 136].map((y) => (
                                <rect key={`g${x}-${y}`} x={x} y={y} width="9" height="9" rx="1.5" />
                            )),
                        )}
                        {[274, 292].map((x) =>
                            [94, 112, 130].map((y) => (
                                <rect key={`h${x}-${y}`} x={x} y={y} width="8" height="9" rx="1.5" />
                            )),
                        )}
                    </g>
                    {/* ₩ 코인 */}
                    <circle cx="200" cy="52" r="18" fill="#7dd3fc" />
                    <text
                        x="200"
                        y="59"
                        textAnchor="middle"
                        fontSize="20"
                        fontWeight="800"
                        fill="#0b2f66"
                    >
                        ₩
                    </text>
                </g>
            );
        case "commerce":
            return (
                <g>
                    {/* 차양 */}
                    <rect x="118" y="60" width="164" height="14" rx="3" fill="#eaf4ff" />
                    <path
                        d="M118 74 h164 l-14 20 h-136 z"
                        fill="#d8ebff"
                    />
                    <g fill="#9fd4f5">
                        {[130, 164, 198, 232, 266].map((x) => (
                            <path key={x} d={`M${x} 74 l-8 20 h16 z`} />
                        ))}
                    </g>
                    {/* 배경 박스 */}
                    <rect x="248" y="120" width="42" height="40" rx="3" fill="#cfe4f8" opacity="0.7" />
                    <rect x="110" y="122" width="40" height="38" rx="3" fill="#cfe4f8" opacity="0.7" />
                    {/* 쇼핑백 */}
                    <g fill="#f0f8ff">
                        <path d="M160 108 h52 v54 a4 4 0 0 1 -4 4 h-44 a4 4 0 0 1 -4 -4 z" />
                    </g>
                    <path
                        d="M172 108 v-7 a14 14 0 0 1 28 0 v7"
                        fill="none"
                        stroke="#9fd4f5"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    {/* 가격 태그 */}
                    <g transform="translate(224 118) rotate(12)">
                        <path d="M0 0 h26 l12 14 -20 20 -18 -18 z" fill="#2f9fe0" />
                        <circle cx="9" cy="9" r="3.4" fill="#eaf4ff" />
                    </g>
                </g>
            );
        case "public":
            return (
                <g>
                    {/* 깃발 */}
                    <line x1="300" y1="52" x2="300" y2="150" stroke="#cfe0ff" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M300 54 h40 l-9 11 l9 11 h-40 z" fill="#7dd3fc" />
                    {/* 관공서 건물 */}
                    <g fill="#eef5ff">
                        <path d="M120 82 L196 50 L272 82 Z" />
                        <rect x="120" y="82" width="152" height="12" rx="2" />
                        {[132, 160, 188, 216, 244].map((x) => (
                            <rect key={x} x={x} y="98" width="14" height="50" rx="2" />
                        ))}
                        <rect x="112" y="150" width="168" height="12" rx="2" />
                    </g>
                    {/* 계단 */}
                    <g fill="#cfe0ff" opacity="0.45">
                        <rect x="104" y="162" width="184" height="6" rx="2" />
                        <rect x="96" y="168" width="200" height="6" rx="2" />
                    </g>
                    {/* 방패 엠블럼 */}
                    <path
                        d="M196 64 l16 6 v11 c0 12 -8 19 -16 23 c-8 -4 -16 -11 -16 -23 v-11 z"
                        fill="#2563eb"
                    />
                    <path d="M191 82 l3.5 3.5 L203 78" fill="none" stroke="#eef5ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            );
        case "it-services":
            return (
                <g>
                    {/* 서버 랙 배경 */}
                    <g fill="#e6f6fb" opacity="0.16">
                        {[62, 300].map((x) => (
                            <g key={x}>
                                <rect x={x} y="66" width="58" height="98" rx="5" />
                            </g>
                        ))}
                    </g>
                    <g fill="#0a2b52" opacity="0.25">
                        {[62, 300].map((x) =>
                            [76, 96, 116, 136].map((y) => (
                                <rect key={`${x}-${y}`} x={x + 8} y={y} width="42" height="10" rx="2" />
                            )),
                        )}
                    </g>
                    {/* 회로 라인 + 노드 */}
                    <g stroke="#67e8f9" strokeWidth="2.5" fill="#67e8f9">
                        <path d="M120 88 H164" fill="none" />
                        <circle cx="120" cy="88" r="3.5" />
                        <path d="M120 148 H164" fill="none" />
                        <circle cx="120" cy="148" r="3.5" />
                        <path d="M236 88 H280" fill="none" />
                        <circle cx="280" cy="88" r="3.5" />
                        <path d="M236 148 H280" fill="none" />
                        <circle cx="280" cy="148" r="3.5" />
                    </g>
                    {/* 중앙 마이크로칩 */}
                    <rect x="164" y="80" width="72" height="72" rx="10" fill="#eef7fb" />
                    <rect x="182" y="98" width="36" height="36" rx="6" fill="none" stroke="#22d3ee" strokeWidth="4" />
                    <g stroke="#eef7fb" strokeWidth="4" strokeLinecap="round">
                        {[176, 200, 224].map((x) => (
                            <line key={`t${x}`} x1={x} y1="80" x2={x} y2="70" />
                        ))}
                        {[176, 200, 224].map((x) => (
                            <line key={`b${x}`} x1={x} y1="152" x2={x} y2="162" />
                        ))}
                    </g>
                </g>
            );
    }
}

export function IndustryVisual({
    industry,
    className,
}: {
    industry: IndustryKey;
    className?: string;
}) {
    const [from, mid, to] = GRAD[industry];
    const gid = `iv-${industry}`;
    return (
        <svg
            viewBox="0 0 400 250"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
            className={cn("h-full w-full", className)}
        >
            <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={from} />
                    <stop offset="0.55" stopColor={mid} />
                    <stop offset="1" stopColor={to} />
                </linearGradient>
                <radialGradient id={`${gid}-glow`} cx="0.28" cy="0.2" r="0.75">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={`${gid}-streak`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.14" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <pattern
                    id={`${gid}-dots`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="2" cy="2" r="1.2" fill="#ffffff" fillOpacity="0.12" />
                </pattern>
            </defs>
            <rect width="400" height="250" fill={`url(#${gid})`} />
            <rect width="400" height="250" fill={`url(#${gid}-dots)`} />
            {/* 대각 라이트 스트릭 */}
            <rect
                x="-40"
                y="-40"
                width="200"
                height="360"
                transform="rotate(18 200 125)"
                fill={`url(#${gid}-streak)`}
            />
            <rect width="400" height="250" fill={`url(#${gid}-glow)`} />
            <Motif industry={industry} />
        </svg>
    );
}
