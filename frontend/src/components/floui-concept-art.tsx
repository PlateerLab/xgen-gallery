import type { Locale } from "@/lib/i18n";

/**
 * FloUI 개념도 — 질문 하나가 화면이 되어 돌아오는 구조.
 *
 * 두 가지를 정확히 그린다.
 *
 * 하나, 사이에 **구성 단계**가 있다. 질문에서 화면으로 화살표만 그으면 마술로
 * 보인다. 의도를 읽고, 데이터를 모으고, 컴포넌트를 고르는 세 칸을 보여야
 * 검토하는 쪽이 "무엇을 근거로 이 화면이 나왔나" 를 물을 수 있다.
 *
 * 둘, 화면은 **하나로 정해져 있지 않다**. 뒤에 흐릿한 레이아웃 두 장을 겹쳐,
 * 질문이 달라지면 이 자리에 다른 화면이 온다는 것을 말한다. 한 장만 그리면
 * 미리 만들어 둔 대시보드와 구분되지 않는다.
 *
 * 움직이는 요소는 두지 않는다 — 개념도는 가만히 있어야 읽힌다.
 */
const FONT =
    "Pretendard,'Pretendard Variable','Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

const T: Record<Locale, {
    askLabel: string;
    question: string;
    engine: string;
    engineNote: string;
    stages: [string, string][];
    screen: string;
    kpi: string[];
    trend: string;
    summary: string;
    table: string;
    footer: string;
    aria: string;
}> = {
    ko: {
        askLabel: "사용자 질문",
        question: "이번 분기 매출 추세를 지역별로 보여줘",
        engine: "FloUI 구성 엔진",
        engineNote: "질문을 읽고 화면을 그 자리에서 짭니다",
        stages: [
            ["의도 파악", "무엇을 보고 싶은지"],
            ["데이터 결합", "정형 데이터 + RAG"],
            ["컴포넌트 선택", "차트 · KPI · 표 · 요약"],
        ],
        screen: "이 질문을 위해 만들어진 화면",
        kpi: ["분기 매출", "전분기 대비"],
        trend: "지역별 추세",
        summary: "RAG 요약",
        table: "상세 표",
        footer: "질문이 달라지면 이 자리에 다른 화면이 옵니다",
        aria: "사용자 질문이 FloUI 구성 엔진의 의도 파악·데이터 결합·컴포넌트 선택을 거쳐 KPI와 차트, 요약, 표로 이루어진 화면으로 실시간 구성되는 구조",
    },
    en: {
        askLabel: "User question",
        question: "Show this quarter's revenue trend by region",
        engine: "FloUI composition engine",
        engineNote: "It reads the question and builds the screen on the spot",
        stages: [
            ["Read intent", "What they want to see"],
            ["Join the data", "Structured data + RAG"],
            ["Pick components", "Chart · KPI · table · summary"],
        ],
        screen: "A screen built for this question",
        kpi: ["Quarter revenue", "vs last quarter"],
        trend: "Trend by region",
        summary: "RAG summary",
        table: "Detail table",
        footer: "Ask something else and a different screen takes this place",
        aria: "A user question passing through FloUI's intent reading, data joining, and component selection to compose a screen of KPIs, a chart, a summary, and a table in real time",
    },
};

/** 구성 단계 아이콘 — 20 단위로 그려 세 개의 선 굵기를 맞춘다 */
function StageIcon({ i }: { i: number }) {
    const s = {
        stroke: "#2461d8",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        fill: "none",
    };
    if (i === 0)
        return (
            <g {...s}>
                <circle cx="10" cy="10" r="6.5" />
                <path d="M10 6.4v3.6l2.6 2" />
            </g>
        );
    if (i === 1)
        return (
            <g {...s}>
                <ellipse cx="10" cy="5.8" rx="6" ry="2.6" />
                <path d="M4 5.8v8.4c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6V5.8" />
                <path d="M4 10c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6" />
            </g>
        );
    return (
        <g {...s}>
            <rect x="3" y="3.4" width="6.4" height="6.4" rx="1.8" />
            <rect x="11.4" y="3.4" width="5.6" height="4" rx="1.6" />
            <rect x="3" y="12" width="5" height="4.6" rx="1.6" />
            <rect x="10.4" y="9.6" width="6.6" height="7" rx="1.8" />
        </g>
    );
}

const STAGE_W = 196;
const STAGE_X = [124, 352, 580];

export function FloUIConceptArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <svg
            viewBox="0 0 900 618"
            className="fl-art block h-auto w-full"
            role="img"
            aria-label={L.aria}
            fontFamily={FONT}
        >
            <defs>
                <linearGradient id="fc-brand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
                <linearGradient id="fc-screen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#f7faff" />
                </linearGradient>
                <filter id="fc-shadow" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="7" stdDeviation="10" floodColor="#1e3a68" floodOpacity="0.13" />
                </filter>
            </defs>

            {/* ── 질문 — 아직 화면은 없다 ── */}
            <g filter="url(#fc-shadow)">
                <rect x="200" y="12" width="500" height="76" rx="20" fill="#ffffff" />
            </g>
            <rect x="200" y="12" width="500" height="76" rx="20" fill="none" stroke="#dbe4f6" />
            {/* 말풍선 꼬리는 두지 않는다 — 아래 화살표와 겹쳐 얼룩처럼 보였다 */}
            <circle cx="234" cy="50" r="15" fill="url(#fc-brand)" />
            <path
                d="M228 50l4.4 4.4 8-8"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <text x="260" y="42" fontSize="11" fontWeight="800" fill="#8b95a6" letterSpacing="1.4">
                {L.askLabel}
            </text>
            <text x="260" y="63" fontSize="15.5" fontWeight="700" fill="#111827">
                {L.question}
            </text>

            <path d="M450 106 V 138" stroke="#dbe4f6" strokeWidth="2.5" fill="none" />
            <path d="M444 130 l6 8 6 -8" stroke="#8fb4ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* ── 구성 엔진 — 화면이 나오는 근거를 여기서 보여 준다 ── */}
            <g filter="url(#fc-shadow)">
                <rect x="100" y="146" width="700" height="146" rx="18" fill="#ffffff" />
            </g>
            <rect x="100" y="146" width="700" height="146" rx="18" fill="none" stroke="#dbe4f6" />
            <rect x="124" y="166" width="18" height="18" rx="5" fill="url(#fc-brand)" />
            <text x="152" y="181" fontSize="15" fontWeight="800" fill="#1f4fa8">{L.engine}</text>
            <text x="152" y="200" fontSize="12" fill="#6b7280">{L.engineNote}</text>

            {L.stages.map(([title, note], i) => (
                <g key={title}>
                    <rect
                        x={STAGE_X[i]}
                        y="216"
                        width={STAGE_W}
                        height="56"
                        rx="14"
                        fill="#f3f7ff"
                        stroke="#cfe0ff"
                    />
                    <g transform={`translate(${STAGE_X[i] + 16} ${234})`}>
                        <StageIcon i={i} />
                    </g>
                    <text x={STAGE_X[i] + 46} y={239} fontSize="12.5" fontWeight="800" fill="#2461d8">
                        {title}
                    </text>
                    <text x={STAGE_X[i] + 46} y={257} fontSize="11" fill="#6b7280">
                        {note}
                    </text>
                    {/* 세 칸은 순서다 — 사이에 진행 표시를 둔다 */}
                    {i < 2 && (
                        <path
                            d={`M${STAGE_X[i] + STAGE_W + 10} 238 l7 6 -7 6`}
                            stroke="#8fb4ff"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            transform="translate(0 -6)"
                        />
                    )}
                </g>
            ))}

            <path d="M450 292 V 326" stroke="#dbe4f6" strokeWidth="2.5" fill="none" />
            <path d="M444 318 l6 8 6 -8" stroke="#8fb4ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/*
              뒤에 겹친 두 장 — 이 자리의 화면이 고정이 아니라는 표시다.
              색을 거의 빼야 "다음에 올 수도 있는 것" 으로 읽힌다.
            */}
            <rect x="136" y="342" width="628" height="238" rx="16" fill="#ffffff" stroke="#e6edfa" opacity="0.55" />
            <rect x="122" y="350" width="656" height="230" rx="16" fill="#ffffff" stroke="#dde6f7" opacity="0.8" />

            {/* ── 만들어진 화면 ── */}
            <g filter="url(#fc-shadow)">
                <rect x="108" y="358" width="684" height="222" rx="16" fill="url(#fc-screen)" />
            </g>
            <rect x="108" y="358" width="684" height="222" rx="16" fill="none" stroke="#cfe0ff" />
            <path d="M108 374a16 16 0 0 1 16-16h652a16 16 0 0 1 16 16v14H108z" fill="#eef4fd" />
            <g fill="#cfe0ff">
                <circle cx="130" cy="372" r="4" />
                <circle cx="144" cy="372" r="4" />
                <circle cx="158" cy="372" r="4" />
            </g>
            <text x="772" y="377" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#8fb4ff">
                {L.screen}
            </text>

            {/* KPI 두 장 */}
            {L.kpi.map((k, i) => (
                <g key={k}>
                    <rect x={132 + i * 176} y="406" width="160" height="60" rx="12" fill="#ffffff" stroke="#e3e9f2" />
                    <text x={148 + i * 176} y="428" fontSize="10.5" fontWeight="700" fill="#8b95a6">
                        {k}
                    </text>
                    <rect
                        x={148 + i * 176}
                        y="438"
                        width={i === 0 ? 78 : 52}
                        height="12"
                        rx="6"
                        fill={i === 0 ? "url(#fc-brand)" : "#bcd0f5"}
                    />
                </g>
            ))}

            {/* 추세 차트 — 막대 위에 선을 얹어 여러 관점을 한 칸에 담는다 */}
            <rect x="132" y="480" width="336" height="80" rx="12" fill="#ffffff" stroke="#e3e9f2" />
            <text x="148" y="500" fontSize="10.5" fontWeight="700" fill="#8b95a6">
                {L.trend}
            </text>
            <g fill="#cfe0ff">
                {[26, 38, 32, 48, 42, 54].map((h, i) => (
                    <rect key={h + "-" + i} x={154 + i * 50} y={546 - h} width="24" height={h} rx="4" />
                ))}
            </g>
            <path
                d="M166 516 L216 506 L266 511 L316 496 L366 501 L416 488"
                stroke="url(#fc-brand)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* RAG 요약 */}
            <rect x="484" y="406" width="140" height="154" rx="12" fill="#eef4fd" stroke="#cfe0ff" />
            <text x="500" y="428" fontSize="10.5" fontWeight="700" fill="#2461d8">
                {L.summary}
            </text>
            <g stroke="#bcd0f5" strokeWidth="5" strokeLinecap="round">
                <path d="M500 446h108M500 462h74M500 478h108M500 494h92M500 510h60" />
            </g>

            {/* 상세 표 */}
            <rect x="640" y="406" width="128" height="154" rx="12" fill="#ffffff" stroke="#e3e9f2" />
            <text x="656" y="428" fontSize="10.5" fontWeight="700" fill="#8b95a6">
                {L.table}
            </text>
            <rect x="656" y="440" width="96" height="12" rx="4" fill="#e3e9f2" />
            <g stroke="#eef2f7" strokeWidth="10" strokeLinecap="round">
                <path d="M661 466h86M661 486h86M661 506h86M661 526h86" />
            </g>

            <text x="450" y="606" textAnchor="middle" fontSize="12.5" fill="#8b95a6">
                {L.footer}
            </text>
        </svg>
    );
}
