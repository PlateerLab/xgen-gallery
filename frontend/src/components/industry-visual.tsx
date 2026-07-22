import { cn } from "@/lib/cn";
import type { IndustryKey } from "@/lib/customers";

/**
 * 산업(Industry)을 상징하는 브랜드 SVG 키비주얼. 고객사례 카드 배경으로 쓴다.
 * 실제 사진 대신 산업 모티프(금융·커머스·공공·IT·제조)를 자체 SVG로 표현 —
 * 외부 이미지 없이 CSP-safe, 어떤 사례든 산업만으로 일관된 비주얼을 얻는다.
 */

const GRAD: Record<IndustryKey, [string, string]> = {
    finance: ["#0b2f66", "#1667b0"],
    commerce: ["#3b1f6e", "#6d4bd6"],
    public: ["#0e355e", "#1c6fae"],
    "it-services": ["#0a2b52", "#0f6f86"],
};

function Motif({ industry }: { industry: IndustryKey }) {
    // 흰색 라인/면 모티프 — 상단 중앙에 배치(하단은 그라디언트 오버레이로 덮임)
    switch (industry) {
        case "finance":
            return (
                <g
                    transform="translate(200 96)"
                    fill="none"
                    stroke="#eaf4ff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* 은행 건물 */}
                    <path d="M-46 -30 L0 -50 L46 -30" />
                    <line x1="-46" y1="-30" x2="46" y2="-30" />
                    <line x1="-36" y1="-22" x2="-36" y2="26" />
                    <line x1="-12" y1="-22" x2="-12" y2="26" />
                    <line x1="12" y1="-22" x2="12" y2="26" />
                    <line x1="36" y1="-22" x2="36" y2="26" />
                    <line x1="-52" y1="34" x2="52" y2="34" />
                    {/* 상승 그래프 */}
                    <polyline
                        points="-30,14 -12,-2 6,8 30,-16"
                        stroke="#7dd3fc"
                        strokeWidth="4.5"
                    />
                    <circle cx="30" cy="-16" r="4" fill="#7dd3fc" stroke="none" />
                </g>
            );
        case "commerce":
            return (
                <g
                    transform="translate(200 96)"
                    fill="none"
                    stroke="#f1ecff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* 쇼핑백 */}
                    <path d="M-40 -18 L-32 -40 L32 -40 L40 -18 Z" />
                    <path d="M-40 -18 L-40 40 L40 40 L40 -18 Z" />
                    <path d="M-16 -18 v-6 a16 16 0 0 1 32 0 v6" stroke="#c9b8ff" />
                    {/* 태그 */}
                    <path
                        d="M6 2 L26 2 L34 20 L18 34 Z"
                        stroke="#c9b8ff"
                        strokeWidth="3.5"
                    />
                    <circle cx="14" cy="12" r="2.6" fill="#c9b8ff" stroke="none" />
                </g>
            );
        case "public":
            return (
                <g
                    transform="translate(200 96)"
                    fill="none"
                    stroke="#eaf4ff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* 관공서 건물 + 방패 */}
                    <path d="M-48 -22 L0 -46 L48 -22" />
                    <line x1="-54" y1="-14" x2="54" y2="-14" />
                    <line x1="-38" y1="-14" x2="-38" y2="30" />
                    <line x1="-13" y1="-14" x2="-13" y2="30" />
                    <line x1="13" y1="-14" x2="13" y2="30" />
                    <line x1="38" y1="-14" x2="38" y2="30" />
                    <line x1="-58" y1="38" x2="58" y2="38" />
                    <path
                        d="M0 -34 L14 -28 v10 c0 10 -7 16 -14 20 c-7 -4 -14 -10 -14 -20 v-10 Z"
                        stroke="#7dd3fc"
                        strokeWidth="3.5"
                    />
                </g>
            );
        case "it-services":
            return (
                <g
                    transform="translate(200 96)"
                    fill="none"
                    stroke="#e6f6fb"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* 마이크로칩 */}
                    <rect x="-34" y="-34" width="68" height="68" rx="8" />
                    <rect
                        x="-16"
                        y="-16"
                        width="32"
                        height="32"
                        rx="4"
                        stroke="#67e8f9"
                        strokeWidth="3.5"
                    />
                    {/* 핀 */}
                    {[-20, 0, 20].map((d) => (
                        <line key={`t${d}`} x1={d} y1="-34" x2={d} y2="-46" />
                    ))}
                    {[-20, 0, 20].map((d) => (
                        <line key={`b${d}`} x1={d} y1="34" x2={d} y2="46" />
                    ))}
                    {[-20, 0, 20].map((d) => (
                        <line key={`l${d}`} x1="-34" y1={d} x2="-46" y2={d} />
                    ))}
                    {[-20, 0, 20].map((d) => (
                        <line key={`r${d}`} x1="34" y1={d} x2="46" y2={d} />
                    ))}
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
    const [from, to] = GRAD[industry];
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
                    <stop offset="1" stopColor={to} />
                </linearGradient>
                <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.32" r="0.6">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <pattern
                    id={`${gid}-dots`}
                    width="22"
                    height="22"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="2" cy="2" r="1.3" fill="#ffffff" fillOpacity="0.08" />
                </pattern>
            </defs>
            <rect width="400" height="250" fill={`url(#${gid})`} />
            <rect width="400" height="250" fill={`url(#${gid}-dots)`} />
            <rect width="400" height="250" fill={`url(#${gid}-glow)`} />
            <Motif industry={industry} />
        </svg>
    );
}
