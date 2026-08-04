import { cn } from "@/lib/cn";

/**
 * 사례 전용(고객사별) 키비주얼. 산업 공통 비주얼(IndustryVisual)로는 표현되지 않는
 * 대표 사례에만 붙인다 — 지금은 제주은행 한 건.
 *
 * IndustryVisual과 같은 규칙을 따른다: 외부 이미지 없이 인라인 SVG(CSP-safe),
 * viewBox 400×250, preserveAspectRatio="slice"로 어떤 카드 비율에도 채워 넣는다.
 * 고객사 로고·사진은 쓰지 않는다(사용 허락 범위 밖) — 지역·업무 모티프로만 표현.
 */

/** 제주은행 — 한라산과 바다 위로 떠 있는 Agent 네트워크. */
function JejuScene() {
    return (
        <>
            {/* 별 — 야간 하늘의 밀도만 살짝 준다 */}
            <g fill="#ffffff">
                {[
                    [46, 34, 1.6],
                    [128, 22, 1.2],
                    [212, 40, 1.1],
                    [258, 22, 1.5],
                    [372, 40, 1.3],
                    [92, 96, 1.1],
                    [352, 118, 1.2],
                ].map(([x, y, r]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity="0.75" />
                ))}
            </g>

            {/* AI Agent 네트워크 — 직원이 만든 Agent들이 연결돼 있다는 은유 */}
            <g stroke="#cfe6ff" strokeWidth="1.6" fill="none" opacity="0.7">
                <path d="M292 46 L338 70 L302 104 Z" />
                <path d="M292 46 L302 104" />
                <path d="M62 74 L104 52 L142 68" />
            </g>
            <g fill="#eef5ff">
                <circle cx="292" cy="46" r="5" />
                <circle cx="338" cy="70" r="3.6" />
                <circle cx="302" cy="104" r="3.6" />
                <circle cx="62" cy="74" r="3" />
                <circle cx="104" cy="52" r="4.4" />
                <circle cx="142" cy="68" r="3" />
            </g>
            {/* 대표 노드의 스파크 */}
            <path
                d="M104 40 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z"
                fill="#7dd3fc"
            />

            {/* 한라산 — 완만한 순상화산. 정상의 백록담은 얕은 굴곡으로 표현 */}
            <path
                d="M-20 184 L44 170 L112 142 L168 112 L188 102 L200 108 L214 100 L262 126 L326 156 L420 184 Z"
                fill="#eef5ff"
                opacity="0.94"
            />
            {/* 능선 음영 */}
            <path
                d="M214 100 L262 126 L326 156 L420 184 L214 184 Z"
                fill="#9fc2f2"
                opacity="0.35"
            />
            {/* 오름(기생화산) — 앞쪽에 낮게 두 개 */}
            <path d="M-10 184 L34 160 L80 184 Z" fill="#dbe9ff" opacity="0.55" />
            <path d="M300 184 L344 156 L392 184 Z" fill="#dbe9ff" opacity="0.5" />

            {/* 해안 도심 실루엣 — 금융 현장 */}
            <g fill="#0f2a63" opacity="0.65">
                <rect x="96" y="150" width="26" height="34" rx="2.5" />
                <rect x="128" y="138" width="30" height="46" rx="2.5" />
                <rect x="164" y="156" width="24" height="28" rx="2.5" />
                <rect x="196" y="146" width="28" height="38" rx="2.5" />
            </g>
            <g fill="#7dd3fc" opacity="0.75">
                {[
                    [103, 158],
                    [113, 158],
                    [103, 170],
                    [135, 146],
                    [145, 146],
                    [135, 160],
                    [145, 160],
                    [171, 164],
                    [203, 154],
                    [213, 154],
                    [203, 168],
                ].map(([x, y]) => (
                    <rect key={`${x}-${y}`} x={x} y={y} width="6" height="7" rx="1.2" />
                ))}
            </g>

            {/* 바다 */}
            <rect x="0" y="184" width="400" height="66" fill="#0a2350" opacity="0.55" />
            <g stroke="#bfe3ff" strokeWidth="2" fill="none" opacity="0.28">
                <path d="M-10 200 q 24 -7 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0" />
                <path d="M-10 220 q 28 -8 56 0 t 56 0 t 56 0 t 56 0 t 56 0 t 56 0" />
                <path d="M-10 238 q 24 -7 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0" />
            </g>
        </>
    );
}

const SCENES: Record<string, () => React.ReactElement> = {
    "jeju-bank-genai-platform": JejuScene,
};

/** 이 사례에 전용 비주얼이 있는지 — 없으면 호출부가 기존 기본 썸네일을 그린다. */
export function hasCaseVisual(slug: string): boolean {
    return slug in SCENES;
}

export function CaseVisual({
    slug,
    className,
}: {
    slug: string;
    className?: string;
}) {
    const Scene = SCENES[slug];
    if (!Scene) return null;
    return (
        <svg
            viewBox="0 0 400 250"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
            className={cn("h-full w-full", className)}
        >
            <defs>
                <linearGradient id="cv-sky" x1="0" y1="0" x2="0.25" y2="1">
                    <stop offset="0" stopColor="#071638" />
                    <stop offset="0.55" stopColor="#173c92" />
                    <stop offset="1" stopColor="#2f7bff" />
                </linearGradient>
                <radialGradient id="cv-glow" cx="0.72" cy="0.16" r="0.7">
                    <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="400" height="250" fill="url(#cv-sky)" />
            <rect width="400" height="250" fill="url(#cv-glow)" />
            <Scene />
        </svg>
    );
}
