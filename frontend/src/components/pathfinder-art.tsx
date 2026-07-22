/**
 * PathFinder 일러스트 — 브라우저 + XGEN 크롬 익스텐션 느낌.
 * 기존 웹 화면을 익스텐션으로 잡아 Agent Tool로 등록하는 흐름을 표현.
 * 순수 SVG(외부 이미지 없음).
 */
export function PathFinderArt() {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <svg
                viewBox="0 0 480 240"
                className="block h-auto w-full"
                role="img"
                aria-label="PathFinder — 브라우저의 기존 웹 화면을 XGEN 크롬 익스텐션으로 Agent Tool로 연결"
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="pf-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00acee" />
                        <stop offset="1" stopColor="#185aea" />
                    </linearGradient>
                    <filter id="pf-sh" x="-20%" y="-20%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1e3a68" floodOpacity="0.14" />
                    </filter>
                </defs>

                {/* 브라우저 창 */}
                <g filter="url(#pf-sh)">
                    <rect x="20" y="26" width="300" height="192" rx="12" fill="#ffffff" stroke="#e6ecf5" />
                </g>
                {/* 타이틀 바 */}
                <path d="M20 38 a12 12 0 0 1 12 -12 h276 a12 12 0 0 1 12 12 v14 h-300 z" fill="#f1f5f9" />
                <circle cx="38" cy="38" r="4" fill="#ff6058" />
                <circle cx="52" cy="38" r="4" fill="#ffbd2e" />
                <circle cx="66" cy="38" r="4" fill="#28c840" />
                <rect x="86" y="30" width="180" height="16" rx="8" fill="#ffffff" stroke="#e6ecf5" />
                <text x="98" y="42" fontSize="9.5" fill="#94a3b8">app.company.com</text>
                {/* 익스텐션 퍼즐 아이콘(툴바) */}
                <g transform="translate(292 30)">
                    <rect x="-8" y="-2" width="20" height="20" rx="5" fill="#eaf2ff" stroke="#bcd0f5" />
                    <path d="M-3 4 h3 v-2 a2 2 0 0 1 4 0 v2 h3 v4 h-2 a2 2 0 0 0 0 4 h2 v-1 h-11 z" fill="#2f7bff" />
                </g>

                {/* 페이지 콘텐츠(기존 웹 시스템) */}
                <rect x="34" y="66" width="272" height="18" rx="5" fill="#e8eef8" />
                <rect x="42" y="72" width="60" height="6" rx="3" fill="#c4d3ea" />
                <rect x="34" y="96" width="128" height="52" rx="7" fill="#f3f6fb" stroke="#e6ecf5" />
                <rect x="46" y="108" width="70" height="7" rx="3.5" fill="#cdd9ec" />
                <rect x="46" y="122" width="96" height="6" rx="3" fill="#dde6f3" />
                <rect x="46" y="134" width="80" height="6" rx="3" fill="#dde6f3" />
                <rect x="174" y="96" width="132" height="52" rx="7" fill="#f3f6fb" stroke="#e6ecf5" />
                <rect x="186" y="108" width="60" height="7" rx="3.5" fill="#cdd9ec" />
                <rect x="186" y="122" width="108" height="6" rx="3" fill="#dde6f3" />
                <rect x="186" y="134" width="90" height="6" rx="3" fill="#dde6f3" />
                <rect x="34" y="162" width="90" height="20" rx="6" fill="url(#pf-blue)" />
                <rect x="48" y="169" width="62" height="6" rx="3" fill="#ffffff" opacity="0.85" />

                {/* 연결선 — 페이지 → 익스텐션 팝업 */}
                <path
                    d="M306 120 C 336 120 336 96 356 96"
                    fill="none"
                    stroke="#2f7bff"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
                <circle cx="306" cy="120" r="3.5" fill="#2f7bff" />

                {/* XGEN 익스텐션 팝업 */}
                <g filter="url(#pf-sh)">
                    <rect x="338" y="40" width="126" height="150" rx="12" fill="#0b1020" />
                </g>
                <rect x="338" y="40" width="126" height="150" rx="12" fill="none" stroke="#2f7bff" strokeOpacity="0.4" />
                {/* 팝업 헤더 — XGEN */}
                <g transform="translate(352 58)">
                    <rect x="0" y="-9" width="18" height="18" rx="5" fill="url(#pf-blue)" />
                    <path d="M4 -4 l10 8 M14 -4 l-10 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <text x="26" y="4" fontSize="12" fontWeight="800" fill="#ffffff" letterSpacing="0.02em">XGEN</text>
                </g>
                <line x1="350" y1="74" x2="452" y2="74" stroke="#ffffff" strokeOpacity="0.1" />
                {/* 팝업 본문 — 화면을 도구로 */}
                <text x="352" y="92" fontSize="10.5" fontWeight="700" fill="#cfe3ff">이 화면을 Agent Tool로</text>
                {/* 단계 */}
                {[
                    ["연결", 108],
                    ["테스트", 126],
                    ["등록", 144],
                ].map(([label, y]) => (
                    <g key={String(label)}>
                        <circle cx="357" cy={Number(y)} r="4.5" fill="none" stroke="#7dd3fc" strokeWidth="1.6" />
                        <path
                            d={`M355 ${Number(y)} l1.6 1.8 l3 -3.4`}
                            fill="none"
                            stroke="#7dd3fc"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <text x="370" y={Number(y) + 3.5} fontSize="10" fill="#e6eefc">
                            {label}
                        </text>
                    </g>
                ))}
                {/* 등록 버튼 */}
                <rect x="352" y="160" width="98" height="20" rx="10" fill="url(#pf-blue)" />
                <text x="401" y="173.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">
                    Agent Tool 등록
                </text>
            </svg>
        </div>
    );
}
