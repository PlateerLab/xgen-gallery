/**
 * 히어로용 재사용 오빗 애니메이션(순수 SVG/SMIL) — 중앙 허브를 여러 라벨 노드가
 * 좌우로 감싸고, 각 노드에서 허브로 토큰이 흘러든다. 다크 히어로 위에 얹는다.
 * nodes 개수에 따라 좌우 컬럼으로 자동 배치. center/nodes/accent만 바꿔 재사용.
 * 외부 이미지 없음.
 */
const CHIP_W = 112;
const CHIP_H = 24;
const LX = 8;
const RX = 440 - 8 - CHIP_W; // 320
const HX = 220;
const HY = 180;
const HR = 44;
const Y_TOP = 32;
const Y_BOTTOM = 304;

function colYs(k: number): number[] {
    if (k <= 0) return [];
    if (k === 1) return [(Y_TOP + Y_BOTTOM) / 2];
    const step = (Y_BOTTOM - Y_TOP) / (k - 1);
    return Array.from({ length: k }, (_, j) => Y_TOP + j * step);
}

export function OrbitArt({
    accent = "#22d3ee",
    accent2 = "#2f7bff",
    center = "XGEN",
    nodes = [],
    ariaLabel,
}: {
    accent?: string;
    accent2?: string;
    center?: string;
    nodes?: string[];
    ariaLabel?: string;
}) {
    const id = "oa-" + (center.replace(/[^a-zA-Z가-힣]/g, "") || "hub");
    const leftN = Math.ceil(nodes.length / 2);
    const left = nodes.slice(0, leftN);
    const right = nodes.slice(leftN);
    const leftYs = colYs(left.length);
    const rightYs = colYs(right.length);

    const chips = [
        ...left.map((label, j) => ({
            label,
            x: LX,
            y: leftYs[j],
            edgeX: LX + CHIP_W,
            side: "L" as const,
            delay: `${(j * 0.4).toFixed(2)}s`,
        })),
        ...right.map((label, j) => ({
            label,
            x: RX,
            y: rightYs[j],
            edgeX: RX,
            side: "R" as const,
            delay: `${(0.2 + j * 0.4).toFixed(2)}s`,
        })),
    ];

    return (
        <div className="relative mx-auto w-full max-w-[440px]">
            <svg
                viewBox="0 0 440 360"
                className="block h-auto w-full"
                role="img"
                aria-label={ariaLabel ?? `${center} 개념 애니메이션`}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={accent} />
                        <stop offset="1" stopColor={accent2} />
                    </linearGradient>
                    <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor={accent} stopOpacity="0.32" />
                        <stop offset="1" stopColor={accent} stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx={HX} cy={HY + 2} r="120" fill={`url(#${id}-glow)`} />

                {/* 펄스 링 */}
                {[0, 1, 2].map((i) => (
                    <circle key={i} cx={HX} cy={HY} r="60" fill="none" stroke={accent} strokeWidth="1.4" opacity="0">
                        <animate attributeName="r" values="52;108" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
                    </circle>
                ))}

                {/* 회전 점선 링 */}
                <circle cx={HX} cy={HY} r="60" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 9">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${HX} ${HY}`} to={`360 ${HX} ${HY}`} dur="26s" repeatCount="indefinite" />
                </circle>

                {/* 커넥터 + 흐르는 토큰 */}
                {chips.map((c, i) => {
                    const cy = c.y + CHIP_H / 2;
                    const path = `M${c.edgeX} ${cy} L${HX} ${HY}`;
                    return (
                        <g key={`link-${i}`}>
                            <line x1={c.edgeX} y1={cy} x2={HX} y2={HY} stroke={accent} strokeOpacity="0.18" strokeWidth="1.1" strokeDasharray="3 4" />
                            <circle r="2.8" fill={accent}>
                                <animateMotion dur="2.6s" begin={c.delay} repeatCount="indefinite" path={path} />
                                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.6s" begin={c.delay} repeatCount="indefinite" />
                            </circle>
                        </g>
                    );
                })}

                {/* 중앙 허브 */}
                <circle cx={HX} cy={HY} r={HR} fill="rgba(9,15,32,0.74)" stroke={`url(#${id}-g)`} strokeWidth="2.4" />
                <circle cx={HX} cy={HY} r="26" fill="none" stroke={accent} strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" values="22;31;22" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x={HX} y={HY + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#eaf6ff">
                    {center}
                </text>

                {/* 노드 칩 */}
                {chips.map((c, i) => (
                    <g key={`chip-${i}`}>
                        <rect x={c.x} y={c.y} width={CHIP_W} height={CHIP_H} rx="7" fill="rgba(255,255,255,0.06)" stroke={accent} strokeOpacity="0.32" />
                        <circle cx={c.x + 12} cy={c.y + CHIP_H / 2} r="3" fill={accent}>
                            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.6s" begin={c.delay} repeatCount="indefinite" />
                        </circle>
                        <text x={c.x + 22} y={c.y + CHIP_H / 2 + 4} fontSize="10.5" fontWeight="700" fill="#e6f6ff">
                            {c.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
