/**
 * 「제품 찾기」 제품 카드용 작은 일러스트(96×72).
 * 실제 화면 캡처는 이 크기에서 글자가 뭉개져 읽히지 않으므로, 기능을 상징하는 단순한 선 일러스트로 대신한다.
 * 색은 플래티어 시안(#00ADEE)·블루(#185AEA)·딥네이비(#0B1224) 계열만 쓴다.
 */

export type ThumbArt = "vibe" | "dexon" | "pathfinder" | "easymode" | "governance" | "certification";

const C = { cyan: "#00ADEE", blue: "#185AEA", navy: "#0B1224", soft: "#E8F1FF", line: "#BFD4FF" };

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <svg viewBox="0 0 96 72" className="h-full w-full" role="presentation" aria-hidden="true">
            <defs>
                <linearGradient id={`pt-bg-${id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F3F8FF" />
                    <stop offset="1" stopColor="#DCEBFF" />
                </linearGradient>
                <linearGradient id={`pt-ac-${id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={C.cyan} />
                    <stop offset="1" stopColor={C.blue} />
                </linearGradient>
            </defs>
            <rect width="96" height="72" fill={`url(#pt-bg-${id})`} />
            <circle cx="84" cy="8" r="18" fill="#fff" opacity="0.55" />
            {children}
        </svg>
    );
}

export function ProductThumbArt({ art }: { art: ThumbArt }) {
    const ac = `url(#pt-ac-${art})`;
    switch (art) {
        case "vibe":
            // 말풍선(자연어) → 코드 창
            return (
                <Frame id={art}>
                    <rect x="10" y="12" width="34" height="20" rx="6" fill="#fff" stroke={C.line} />
                    <path d="M18 32 l-2 6 l7 -6" fill="#fff" stroke={C.line} strokeLinejoin="round" />
                    <rect x="16" y="19" width="20" height="2.5" rx="1.25" fill={C.line} />
                    <rect x="16" y="24" width="13" height="2.5" rx="1.25" fill={C.line} />
                    <rect x="40" y="28" width="46" height="34" rx="5" fill={C.navy} />
                    <circle cx="45" cy="33" r="1.4" fill="#ff6b6b" />
                    <circle cx="49.5" cy="33" r="1.4" fill="#ffc94d" />
                    <circle cx="54" cy="33" r="1.4" fill="#3ddc97" />
                    <path d="M52 44 l-5 4 l5 4 M66 44 l5 4 l-5 4 M61 42 l-4 12" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M80 14 l1.6 3.4 l3.4 1.6 l-3.4 1.6 l-1.6 3.4 l-1.6 -3.4 l-3.4 -1.6 l3.4 -1.6 z" fill={ac} />
                </Frame>
            );
        case "dexon":
            // PC · 태블릿 · 핸드폰
            return (
                <Frame id={art}>
                    <rect x="10" y="14" width="46" height="31" rx="3" fill={C.navy} />
                    <rect x="13" y="17" width="40" height="25" rx="1.5" fill={ac} opacity="0.9" />
                    <rect x="17" y="21" width="16" height="2.5" rx="1.25" fill="#fff" opacity="0.85" />
                    <rect x="17" y="26" width="26" height="2" rx="1" fill="#fff" opacity="0.5" />
                    <path d="M28 45 h10 l2 7 h-14 z" fill="#9FB3D1" />
                    <rect x="22" y="52" width="22" height="3" rx="1.5" fill="#9FB3D1" />
                    <rect x="52" y="26" width="24" height="32" rx="3.5" fill="#fff" stroke={C.navy} strokeWidth="2" />
                    <rect x="56" y="31" width="16" height="2.5" rx="1.25" fill={C.blue} />
                    <rect x="56" y="36" width="12" height="2" rx="1" fill={C.line} />
                    <rect x="74" y="34" width="13" height="24" rx="3" fill="#fff" stroke={C.navy} strokeWidth="2" />
                    <rect x="77" y="39" width="7" height="2" rx="1" fill={C.cyan} />
                    <rect x="77" y="43" width="5" height="2" rx="1" fill={C.line} />
                </Frame>
            );
        case "pathfinder":
            // 에이전트 → API 경로 → 업무 시스템
            return (
                <Frame id={art}>
                    <path d="M28 36 C40 36 40 18 54 18 M28 36 H54 M28 36 C40 36 40 54 54 54" fill="none" stroke={C.blue} strokeWidth="2" strokeDasharray="3 2.5" />
                    <circle cx="20" cy="36" r="10" fill={ac} />
                    <circle cx="20" cy="33" r="3" fill="#fff" />
                    <path d="M14.5 41 a5.5 4 0 0 1 11 0" fill="#fff" />
                    {[18, 36, 54].map((y, i) => (
                        <g key={y}>
                            <rect x="54" y={y - 7} width="30" height="14" rx="3.5" fill="#fff" stroke={i === 1 ? C.blue : C.line} strokeWidth={i === 1 ? 2 : 1} />
                            <text x="69" y={y + 3} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={i === 1 ? C.blue : "#6B7A90"} fontFamily="Pretendard, sans-serif">API</text>
                        </g>
                    ))}
                </Frame>
            );
        case "easymode":
            // 단계 안내 마법사 + 포인터
            return (
                <Frame id={art}>
                    <rect x="12" y="10" width="62" height="52" rx="5" fill="#fff" stroke={C.line} />
                    {[0, 1, 2].map((i) => (
                        <g key={i}>
                            <circle cx={24 + i * 19} cy="20" r="5" fill={i < 2 ? ac : "#fff"} stroke={i < 2 ? "none" : C.line} />
                            {i < 2 && <path d={`M${21.5 + i * 19} 20 l2 2 l3.5 -4`} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
                            {i < 2 && <rect x={29.5 + i * 19} y="19.3" width="8" height="1.4" fill={C.line} />}
                        </g>
                    ))}
                    <rect x="20" y="32" width="46" height="6" rx="2" fill={C.soft} />
                    <rect x="20" y="42" width="34" height="6" rx="2" fill={C.soft} />
                    <rect x="46" y="52" width="20" height="6" rx="3" fill={C.blue} />
                    <path d="M70 46 l0 15 l4 -4 l3 6 l2.5 -1.2 l-3 -6 l5.5 -0.3 z" fill={C.navy} stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
                </Frame>
            );
        case "governance":
            // 방패 + 결재선(검토 → 승인)
            return (
                <Frame id={art}>
                    <path d="M30 12 l16 6 v14 c0 11 -7 18 -16 22 c-9 -4 -16 -11 -16 -22 v-14 z" fill={ac} />
                    <path d="M23 33 l5 5 l9 -10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M58 22 V50" stroke={C.line} strokeWidth="2" />
                    {[22, 36, 50].map((y, i) => (
                        <g key={y}>
                            <circle cx="58" cy={y} r="5" fill={i < 2 ? C.blue : "#fff"} stroke={C.blue} strokeWidth="1.6" />
                            <rect x="67" y={y - 2.5} width={i === 2 ? 14 : 18} height="5" rx="2.5" fill={i < 2 ? "#fff" : C.soft} stroke={C.line} strokeWidth="0.8" />
                        </g>
                    ))}
                </Frame>
            );
        case "certification":
            // 인증 메달
            return (
                <Frame id={art}>
                    <path d="M38 40 l-7 22 l7 -4 l4 6 l5 -18 z M58 40 l7 22 l-7 -4 l-4 6 l-5 -18 z" fill={C.blue} opacity="0.85" />
                    <circle cx="48" cy="30" r="19" fill={ac} />
                    <circle cx="48" cy="30" r="14" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="48" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="Pretendard, sans-serif">GS</text>
                    <path d="M76 16 l1.4 3 l3 1.4 l-3 1.4 l-1.4 3 l-1.4 -3 l-3 -1.4 l3 -1.4 z" fill={C.cyan} />
                    <path d="M18 48 l1 2.2 l2.2 1 l-2.2 1 l-1 2.2 l-1 -2.2 l-2.2 -1 l2.2 -1 z" fill={C.cyan} />
                </Frame>
            );
    }
}
