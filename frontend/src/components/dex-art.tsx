import type { Locale } from "@/lib/i18n";

/**
 * DexOn 카드 일러스트 — 서버의 Agent가 사용자의 PC·태블릿·핸드폰으로 내려와,
 * 각 기기의 업무환경을 활용하는 흐름을 한 장에 담는다.
 *
 * 이지모드·패스파인더 카드와 같은 480x240 규격, 같은 색·선 굵기를 쓴다 —
 * 세 장이 나란히 놓이므로 어느 하나만 튀면 카드 줄이 흐트러진다.
 */
const T: Record<Locale, { server: string; desktop: string; tablet: string; phone: string; files: string; app: string; result: string; agent: string; aria: string }> = {
    ko: {
        server: "XGEN 서버",
        desktop: "사용자 PC",
        tablet: "태블릿",
        phone: "핸드폰",
        files: "파일",
        app: "애플리케이션",
        result: "결과물",
        agent: "Agent",
        aria: "XGEN 서버의 Agent가 사용자의 PC·태블릿·핸드폰으로 연결되고, PC에서는 파일과 애플리케이션을 활용해 결과물을 만드는 흐름",
    },
    en: {
        server: "XGEN Server",
        desktop: "User PC",
        tablet: "Tablet",
        phone: "Phone",
        files: "Files",
        app: "Applications",
        result: "Deliverable",
        agent: "Agent",
        aria: "An agent on the XGEN Server connecting to the user's PC, tablet, and phone, using files and applications on the PC to produce a deliverable",
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
                <path d="M240 72 H390 V98" stroke="#bcd0f5" strokeWidth="1.7" markerEnd="url(#dx-arrow)" fill="none" />
                <path d="M240 80 H449 V120" stroke="#bcd0f5" strokeWidth="1.7" markerEnd="url(#dx-arrow)" fill="none" />

                {/* ── 아래: 사용자 PC ── */}
                <g filter="url(#dx-sh)">
                    <rect x="18" y="94" width="320" height="126" rx="12" fill="#ffffff" stroke="#e6ecf5" />
                </g>
                <rect x="18" y="94" width="320" height="26" rx="12" fill="#f2f6fd" />
                <rect x="18" y="110" width="320" height="10" fill="#f2f6fd" />
                <circle cx="36" cy="107" r="3.5" fill="#ff5f57" />
                <circle cx="48" cy="107" r="3.5" fill="#febc2e" />
                <circle cx="60" cy="107" r="3.5" fill="#28c840" />
                <text x="76" y="111" fontSize="9.5" fontWeight="700" fill="#8b95a6">{L.desktop}</text>

                {/* 파일 */}
                <rect x="34" y="136" width="76" height="66" rx="9" fill="#f7faff" stroke="#dbe4f6" />
                <path d="M48 154h48M48 166h34M48 178h41" stroke="#c6d2e4" strokeWidth="4" strokeLinecap="round" />
                <text x="72" y="196" fontSize="9.5" fontWeight="700" fill="#6b7280" textAnchor="middle">{L.files}</text>

                <path d="M116 169 h14" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#dx-arrow)" fill="none" />

                {/* 애플리케이션 */}
                <rect x="138" y="136" width="82" height="66" rx="9" fill="#f7faff" stroke="#dbe4f6" />
                <rect x="150" y="150" width="25" height="24" rx="5" fill="#dfe9fb" />
                <rect x="183" y="150" width="25" height="24" rx="5" fill="#dfe9fb" />
                <text x="179" y="196" fontSize="9" fontWeight="700" fill="#6b7280" textAnchor="middle">{L.app}</text>

                <path d="M226 169 h14" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#dx-arrow)" fill="none" />

                {/* 결과물 — 이 카드의 결론이라 파랗게 채운다 */}
                <rect x="248" y="136" width="74" height="66" rx="9" fill="url(#dx-blue)" />
                <path d="M262 156h46M262 168h36" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                <path d="M262 182 l7 7 13 -14" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="285" y="196" fontSize="9.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{L.result}</text>

                {/* 태블릿 */}
                <g filter="url(#dx-sh)">
                    <rect x="354" y="106" width="72" height="114" rx="12" fill="#203b73" />
                    <rect x="360" y="114" width="60" height="96" rx="8" fill="#ffffff" />
                </g>
                <circle cx="390" cy="110" r="1.6" fill="#8fb4ff" />
                <text x="390" y="129" fontSize="8.5" fontWeight="800" fill="#2461d8" textAnchor="middle">{L.tablet}</text>
                <circle cx="390" cy="151" r="13" fill="url(#dx-blue)" />
                <text x="390" y="155" fontSize="8" fontWeight="800" fill="#ffffff" textAnchor="middle">AI</text>
                <rect x="370" y="174" width="40" height="7" rx="3.5" fill="#dfe9fb" />
                <rect x="370" y="187" width="32" height="7" rx="3.5" fill="#eef4fd" />
                <rect x="378" y="214" width="24" height="2.5" rx="1.25" fill="#8fb4ff" />

                {/* 핸드폰 */}
                <g filter="url(#dx-sh)">
                    <rect x="432" y="128" width="36" height="92" rx="9" fill="#203b73" />
                    <rect x="436" y="136" width="28" height="74" rx="6" fill="#ffffff" />
                </g>
                <rect x="444" y="132" width="12" height="2" rx="1" fill="#8fb4ff" />
                <text x="450" y="148" fontSize="6.5" fontWeight="800" fill="#2461d8" textAnchor="middle">{L.phone}</text>
                <circle cx="450" cy="166" r="9" fill="url(#dx-blue)" />
                <text x="450" y="169" fontSize="6" fontWeight="800" fill="#ffffff" textAnchor="middle">AI</text>
                <rect x="441" y="184" width="18" height="5" rx="2.5" fill="#dfe9fb" />
                <rect x="441" y="194" width="14" height="5" rx="2.5" fill="#eef4fd" />
                <rect x="445" y="214" width="10" height="2" rx="1" fill="#8fb4ff" />
            </svg>
        </div>
    );
}
