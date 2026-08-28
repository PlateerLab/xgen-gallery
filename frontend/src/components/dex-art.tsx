import type { Locale } from "@/lib/i18n";

/**
 * XGEN DeX 카드 일러스트 — 서버의 Agent가 사용자의 데스크톱으로 내려와,
 * 파일과 애플리케이션을 쓰며 결과물을 만드는 흐름을 한 장에 담는다.
 *
 * 이지모드·패스파인더 카드와 같은 480x240 규격, 같은 색·선 굵기를 쓴다 —
 * 세 장이 나란히 놓이므로 어느 하나만 튀면 카드 줄이 흐트러진다.
 */
const T: Record<Locale, { server: string; desktop: string; files: string; app: string; result: string; agent: string; aria: string }> = {
    ko: {
        server: "XGEN 서버",
        desktop: "사용자 데스크톱",
        files: "파일",
        app: "애플리케이션",
        result: "결과물",
        agent: "Agent",
        aria: "XGEN 서버의 Agent 가 사용자의 데스크톱으로 연결되어 파일과 애플리케이션을 활용해 결과물을 만드는 흐름",
    },
    en: {
        server: "XGEN Server",
        desktop: "User desktop",
        files: "Files",
        app: "Applications",
        result: "Deliverable",
        agent: "Agent",
        aria: "An agent on the XGEN Server connecting down to the user's desktop, using files and applications to produce a deliverable",
    },
};

export function DexArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <svg
                viewBox="0 0 480 240"
                className="block h-auto w-full"
                role="img"
                aria-label={L.aria}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="dx-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00acee" />
                        <stop offset="1" stopColor="#185aea" />
                    </linearGradient>
                    <filter id="dx-sh" x="-20%" y="-20%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1e3a68" floodOpacity="0.14" />
                    </filter>
                    <marker id="dx-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 1 L9 5 L0 9 z" fill="#2f7bff" />
                    </marker>
                </defs>

                {/* ── 위: 서버에서 Agent 가 내려온다 ── */}
                <g filter="url(#dx-sh)">
                    <rect x="150" y="18" width="180" height="42" rx="10" fill="#ffffff" stroke="#e6ecf5" />
                </g>
                <rect x="164" y="32" width="14" height="14" rx="3" fill="url(#dx-blue)" />
                <text x="188" y="44" fontSize="12" fontWeight="700" fill="#1f3d70">{L.server}</text>
                <rect x="272" y="31" width="44" height="16" rx="8" fill="#eaf1ff" />
                <text x="294" y="43" fontSize="9.5" fontWeight="700" fill="#2461d8" textAnchor="middle">{L.agent}</text>

                <path d="M240 62 V 88" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#dx-arrow)" fill="none" />

                {/* ── 아래: 사용자 데스크톱 ── */}
                <g filter="url(#dx-sh)">
                    <rect x="26" y="94" width="428" height="126" rx="12" fill="#ffffff" stroke="#e6ecf5" />
                </g>
                <rect x="26" y="94" width="428" height="26" rx="12" fill="#f2f6fd" />
                <rect x="26" y="110" width="428" height="10" fill="#f2f6fd" />
                <circle cx="44" cy="107" r="3.5" fill="#ff5f57" />
                <circle cx="56" cy="107" r="3.5" fill="#febc2e" />
                <circle cx="68" cy="107" r="3.5" fill="#28c840" />
                <text x="84" y="111" fontSize="9.5" fontWeight="700" fill="#8b95a6">{L.desktop}</text>

                {/* 파일 */}
                <rect x="46" y="136" width="104" height="66" rx="9" fill="#f7faff" stroke="#dbe4f6" />
                <path d="M64 154h56M64 166h40M64 178h48" stroke="#c6d2e4" strokeWidth="5" strokeLinecap="round" />
                <text x="98" y="196" fontSize="9.5" fontWeight="700" fill="#6b7280" textAnchor="middle">{L.files}</text>

                <path d="M156 169 h24" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#dx-arrow)" fill="none" />

                {/* 애플리케이션 */}
                <rect x="188" y="136" width="104" height="66" rx="9" fill="#f7faff" stroke="#dbe4f6" />
                <rect x="206" y="150" width="30" height="24" rx="5" fill="#dfe9fb" />
                <rect x="244" y="150" width="30" height="24" rx="5" fill="#dfe9fb" />
                <text x="240" y="196" fontSize="9.5" fontWeight="700" fill="#6b7280" textAnchor="middle">{L.app}</text>

                <path d="M298 169 h24" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#dx-arrow)" fill="none" />

                {/* 결과물 — 이 카드의 결론이라 파랗게 채운다 */}
                <rect x="330" y="136" width="104" height="66" rx="9" fill="url(#dx-blue)" />
                <path d="M350 156h56M350 168h44" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
                <path d="M350 182 l7 7 13 -14" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="382" y="196" fontSize="9.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{L.result}</text>
            </svg>
        </div>
    );
}
