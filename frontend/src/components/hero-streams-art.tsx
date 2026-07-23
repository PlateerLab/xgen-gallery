/**
 * 히어로용 산업 스트림 애니메이션(순수 SVG/SMIL) — 좌측의 여러 산업이 중앙 허브
 * (Applied AI)로 수렴하고, 허브에서 우측 제품(XGEN·코드 어시스턴트·Polar 등)으로
 * 이어진다. industries·products 개수에 따라 자동 배치. 외부 이미지 없음.
 */
const HX = 220;
const HY = 180;
const HR = 42;
const LX = 6;
const LW = 100;
const RW = 112;
const RX = 440 - 6 - RW; // 322
const CHIP_H = 24;

function spread(count: number, top: number, bottom: number): number[] {
    if (count <= 0) return [];
    if (count === 1) return [(top + bottom) / 2];
    const step = (bottom - top) / (count - 1);
    return Array.from({ length: count }, (_, i) => top + i * step);
}

export function IndustryStreamsArt({
    accent = "#5eead4",
    accent2 = "#2f7bff",
    industries = [],
    products = [],
    ariaLabel,
}: {
    accent?: string;
    accent2?: string;
    industries?: string[];
    products?: string[];
    ariaLabel?: string;
}) {
    const id = "st-" + accent.replace(/[^a-zA-Z0-9]/g, "");
    const inYs = spread(industries.length, 28, 308);
    const prYs = spread(products.length, 96, 264);
    const Ledge = LX + LW; // 106

    return (
        <div className="relative mx-auto w-full max-w-[440px]">
            <svg
                viewBox="0 0 440 360"
                className="block h-auto w-full"
                role="img"
                aria-label={ariaLabel ?? "산업이 Applied AI로 수렴해 제품으로 이어지는 애니메이션"}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={accent} />
                        <stop offset="1" stopColor={accent2} />
                    </linearGradient>
                    <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor={accent} stopOpacity="0.3" />
                        <stop offset="1" stopColor={accent} stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx={HX} cy={HY} r="120" fill={`url(#${id}-glow)`} />

                {/* 산업 → 허브 (입력) */}
                {inYs.map((y, i) => {
                    const cy = y + CHIP_H / 2;
                    const path = `M${Ledge} ${cy} C ${Ledge + 54} ${cy} ${HX - 84} ${HY} ${HX - HR} ${HY}`;
                    const delay = `${(i * 0.32).toFixed(2)}s`;
                    return (
                        <g key={`in-${i}`}>
                            <path d={path} fill="none" stroke={accent} strokeOpacity="0.16" strokeWidth="1.1" />
                            <circle r="2.8" fill={accent}>
                                <animateMotion dur="2.8s" begin={delay} repeatCount="indefinite" path={path} />
                                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur="2.8s" begin={delay} repeatCount="indefinite" />
                            </circle>
                        </g>
                    );
                })}

                {/* 허브 → 제품 (출력) */}
                {prYs.map((y, i) => {
                    const cy = y + CHIP_H / 2;
                    const path = `M${HX + HR} ${HY} C ${HX + HR + 34} ${HY} ${RX - 40} ${cy} ${RX} ${cy}`;
                    const delay = `${(0.6 + i * 0.5).toFixed(2)}s`;
                    return (
                        <g key={`pr-${i}`}>
                            <path d={path} fill="none" stroke={accent2} strokeOpacity="0.3" strokeWidth="1.3" />
                            <circle r="3" fill={accent2}>
                                <animateMotion dur="2.4s" begin={delay} repeatCount="indefinite" path={path} />
                                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur="2.4s" begin={delay} repeatCount="indefinite" />
                            </circle>
                        </g>
                    );
                })}

                {/* 좌측 산업 노드 */}
                {inYs.map((y, i) => {
                    const delay = `${(i * 0.32).toFixed(2)}s`;
                    return (
                        <g key={`inchip-${i}`}>
                            <rect x={LX} y={y} width={LW} height={CHIP_H} rx="7" fill="rgba(255,255,255,0.06)" stroke={accent} strokeOpacity="0.32" />
                            <circle cx={LX + 11} cy={y + CHIP_H / 2} r="3" fill={accent}>
                                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" begin={delay} repeatCount="indefinite" />
                            </circle>
                            <text x={LX + 21} y={y + CHIP_H / 2 + 4} fontSize="10.5" fontWeight="700" fill="#eafff8">
                                {industries[i]}
                            </text>
                        </g>
                    );
                })}

                {/* 우측 제품 노드(그라디언트 강조) */}
                {prYs.map((y, i) => (
                    <g key={`prchip-${i}`}>
                        <rect x={RX} y={y} width={RW} height={CHIP_H} rx="7" fill="rgba(47,123,255,0.14)" stroke={`url(#${id}-g)`} strokeWidth="1.4" />
                        <rect x={RX} y={y + 5} width="3.5" height={CHIP_H - 10} rx="1.5" fill={accent2} />
                        <text x={RX + 14} y={y + CHIP_H / 2 + 4} fontSize="11" fontWeight="800" fill="#eaf3ff">
                            {products[i]}
                        </text>
                    </g>
                ))}

                {/* 중앙 허브 */}
                <circle cx={HX} cy={HY} r={HR} fill="rgba(9,15,32,0.78)" stroke={`url(#${id}-g)`} strokeWidth="2.4" />
                {[0, 1].map((i) => (
                    <circle key={i} cx={HX} cy={HY} r={HR} fill="none" stroke={accent} strokeWidth="1.2" opacity="0">
                        <animate attributeName="r" values={`${HR - 6};${HR + 20}`} dur="2.8s" begin={`${i * 1.4}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0" dur="2.8s" begin={`${i * 1.4}s`} repeatCount="indefinite" />
                    </circle>
                ))}
                <text x={HX} y={HY - 3} textAnchor="middle" fontSize="12" fontWeight="800" fill="#eafff8">
                    Applied
                </text>
                <text x={HX} y={HY + 14} textAnchor="middle" fontSize="12" fontWeight="800" fill="#eafff8">
                    AI
                </text>
            </svg>
        </div>
    );
}
