import type { Locale } from "@/lib/i18n";

/**
 * FloUI 카드 일러스트 — 질문 하나가 화면이 되어 돌아오는 장면.
 *
 * 요지는 "미리 만들어 둔 대시보드를 여는 것이 아니다" 이다. 그래서 왼쪽에는
 * 아직 화면이 없는 상태의 질문만 두고, 오른쪽 화면 안의 블록들은 크기와
 * 종류가 제각각이게 그린다 — 격자에 딱 맞으면 이미 정해져 있던 레이아웃처럼
 * 보인다.
 *
 * 이지모드·패스파인더·DeX 카드와 같은 480x240 규격, 같은 색·선 굵기를 쓴다 —
 * 네 장이 나란히 놓이므로 어느 하나만 튀면 카드 줄이 흐트러진다.
 */
const T: Record<Locale, { ask: string; question: string[]; screen: string; kpi: string; trend: string; summary: string; aria: string }> = {
    ko: {
        ask: "질문",
        question: ["이번 분기 매출 추세를", "보여줘"],
        screen: "실시간으로 구성된 화면",
        kpi: "KPI",
        trend: "추세",
        summary: "RAG 요약",
        aria: "사용자의 질문 한 줄이 KPI 카드와 추세 차트, RAG 요약으로 이루어진 화면으로 실시간 구성되는 흐름",
    },
    en: {
        ask: "Question",
        question: ["Show me this quarter's", "revenue trend"],
        screen: "Screen composed in real time",
        kpi: "KPI",
        trend: "Trend",
        summary: "RAG summary",
        aria: "A single question composing itself in real time into a screen of KPI cards, a trend chart, and a RAG summary",
    },
};

export function FloUIArt({ locale = "ko" }: { locale?: Locale }) {
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
                    <linearGradient id="fl-brand" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00acee" />
                        <stop offset="1" stopColor="#185aea" />
                    </linearGradient>
                    <marker
                        id="fl-arrow"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto-start-reverse"
                    >
                        <path d="M0 1.5 L9 5 L0 8.5z" fill="#8fb4ff" />
                    </marker>
                </defs>

                {/* ── 질문 — 아직 화면은 없다 ── */}
                <text x="24" y="44" fontSize="10.5" fontWeight="800" fill="#4a6aa8" letterSpacing="1.6">
                    {L.ask.toUpperCase()}
                </text>
                <rect x="24" y="56" width="150" height="70" rx="14" fill="#ffffff" stroke="#dbe4f6" />
                <circle cx="46" cy="78" r="10" fill="url(#fl-brand)" />
                <path
                    d="M42 78l3 3 6-6"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <text x="64" y="82" fontSize="10.5" fontWeight="700" fill="#2461d8">
                    {L.ask}
                </text>
                {/* 질문은 언어마다 길이가 달라 줄을 미리 나눠 둔다 — 카드 폭이 좁다 */}
                {L.question.map((line, i) => (
                    <text key={line} x="38" y={102 + i * 14} fontSize="10.5" fill="#6b7280">
                        {line}
                    </text>
                ))}

                {/* 커서 — 방금 입력이 끝난 자리 */}
                <rect x="24" y="140" width="150" height="26" rx="13" fill="#eef4fd" stroke="#cfe0ff" />
                <rect x="38" y="148" width="86" height="4" rx="2" fill="#bcd0f5" />
                <rect x="130" y="145" width="2" height="16" fill="#2f7bff" />

                <path
                    d="M182 111 H 208"
                    stroke="#8fb4ff"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#fl-arrow)"
                />

                {/* ── 화면 — 질문에 맞춰 그 자리에서 짜인다 ── */}
                <rect x="222" y="30" width="234" height="180" rx="14" fill="#ffffff" stroke="#dbe4f6" />
                <path d="M222 44a14 14 0 0 1 14-14h206a14 14 0 0 1 14 14v10H222z" fill="#f3f7ff" />
                <g fill="#cfe0ff">
                    <circle cx="238" cy="42" r="3" />
                    <circle cx="248" cy="42" r="3" />
                    <circle cx="258" cy="42" r="3" />
                </g>
                <text x="444" y="46" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#8fb4ff">
                    {L.screen}
                </text>

                {/* KPI 두 장 */}
                <rect x="236" y="66" width="76" height="42" rx="10" fill="#f8fafc" stroke="#e3e9f2" />
                <text x="248" y="82" fontSize="8" fontWeight="800" fill="#8b95a6" letterSpacing="1">
                    {L.kpi}
                </text>
                <rect x="248" y="88" width="38" height="7" rx="3.5" fill="url(#fl-brand)" />
                <rect x="320" y="66" width="76" height="42" rx="10" fill="#f8fafc" stroke="#e3e9f2" />
                <text x="332" y="82" fontSize="8" fontWeight="800" fill="#8b95a6" letterSpacing="1">
                    {L.kpi}
                </text>
                <rect x="332" y="88" width="26" height="7" rx="3.5" fill="#bcd0f5" />

                {/* 추세 차트 — 막대 위에 선을 얹어 "여러 관점" 을 한 칸에 담는다 */}
                <rect x="236" y="118" width="160" height="80" rx="10" fill="#f8fafc" stroke="#e3e9f2" />
                <text x="248" y="134" fontSize="8" fontWeight="800" fill="#8b95a6" letterSpacing="1">
                    {L.trend.toUpperCase()}
                </text>
                <g fill="#cfe0ff">
                    <rect x="250" y="164" width="14" height="22" rx="3" />
                    <rect x="274" y="154" width="14" height="32" rx="3" />
                    <rect x="298" y="160" width="14" height="26" rx="3" />
                    <rect x="322" y="144" width="14" height="42" rx="3" />
                    <rect x="346" y="150" width="14" height="36" rx="3" />
                    <rect x="370" y="138" width="14" height="48" rx="3" />
                </g>
                <path
                    d="M257 158 L281 148 L305 153 L329 139 L353 144 L377 132"
                    stroke="url(#fl-brand)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* RAG 요약 — 차트 옆 세로 칸 */}
                <rect x="404" y="118" width="40" height="80" rx="10" fill="#eef4fd" stroke="#cfe0ff" />
                <g stroke="#bcd0f5" strokeWidth="4" strokeLinecap="round">
                    <path d="M414 138h20M414 150h14M414 162h20M414 174h10" />
                </g>
                <text x="424" y="190" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#8fb4ff">
                    {L.summary}
                </text>
            </svg>
        </div>
    );
}
