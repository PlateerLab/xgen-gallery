/**
 * 히어로용 재사용 레이어-플로우 애니메이션(순수 SVG/SMIL) — 계층 스택을 위→아래로
 * 데이터 펄스가 관통하며 각 계층 노드가 점멸한다. 기술 스택·아키텍처 계층 표현용.
 * layers(위→아래)·accent만 바꿔 재사용. 외부 이미지 없음.
 */
export function LayerFlowArt({
    accent = "#67e8f9",
    accent2 = "#2f7bff",
    layers = [],
    ariaLabel,
}: {
    accent?: string;
    accent2?: string;
    layers?: { t: string; s?: string }[];
    ariaLabel?: string;
}) {
    const id = "la-" + accent.replace(/[^a-zA-Z0-9]/g, "");
    const top = 34;
    const h = 54;
    const gap = 18;
    const rows = layers.slice(0, 4);
    const cy = (i: number) => top + i * (h + gap) + h / 2;
    const lastY = cy(rows.length - 1);
    return (
        <div className="relative mx-auto w-full max-w-[440px]">
            <svg
                viewBox="0 0 440 360"
                className="block h-auto w-full"
                role="img"
                aria-label={ariaLabel ?? "계층 아키텍처 데이터 흐름 애니메이션"}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor={accent} />
                        <stop offset="1" stopColor={accent2} />
                    </linearGradient>
                    <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor={accent} stopOpacity="0.28" />
                        <stop offset="1" stopColor={accent} stopOpacity="0" />
                    </radialGradient>
                </defs>

                <ellipse cx="220" cy="182" rx="180" ry="150" fill={`url(#${id}-glow)`} />

                {/* 중앙 흐름선 */}
                <line x1="220" y1={top} x2="220" y2={lastY} stroke={accent} strokeOpacity="0.25" strokeWidth="1.4" strokeDasharray="3 5" />
                {/* 위→아래 데이터 펄스 */}
                <circle r="4.5" fill={accent}>
                    <animate attributeName="cx" values="220;220" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="cy" values={`${top};${lastY}`} dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* 계층 바 */}
                {rows.map((r, i) => {
                    const y = top + i * (h + gap);
                    return (
                        <g key={i}>
                            <rect x="60" y={y} width="320" height={h} rx="13" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
                            {/* 좌측 액센트 바 */}
                            <rect x="60" y={y + 12} width="4" height={h - 24} rx="2" fill={`url(#${id}-g)`} />
                            <text x="84" y={y + h / 2 - 2} fontSize="15" fontWeight="700" fill="#ffffff">
                                {r.t}
                            </text>
                            {r.s && (
                                <text x="84" y={y + h / 2 + 15} fontSize="10.5" fontWeight="700" fill={accent} letterSpacing="0.12em">
                                    {r.s.toUpperCase()}
                                </text>
                            )}
                            {/* 흐름 노드 */}
                            <circle cx="220" cy={y + h / 2} r="5.5" fill="rgba(9,15,32,0.9)" stroke={accent} strokeWidth="1.6">
                                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" begin={`${i * 0.75}s`} repeatCount="indefinite" />
                            </circle>
                            <circle cx="356" cy={y + h / 2} r="2.4" fill={accent} opacity="0.7" />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
