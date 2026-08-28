import type { Locale } from "@/lib/i18n";

/**
 * XGEN DeX 사용 흐름 — 설치부터 첫 업무까지 여섯 단계를 한 줄로 그린다.
 *
 * 세로로 세운다. 가로로 눕히면 여섯 칸을 넣느라 글자가 작아지고, 좁은 화면에서는
 * 옆으로 밀어 봐야 해 순서가 끊긴다. 세로로 두면 폭이 남아 설명이 한 줄에 들어가고
 * 위에서 아래로 읽는 순서와 단계의 순서가 같아진다.
 *
 * 카드 여섯 장으로 두지 않는 이유는 그대로다 — 각자 상자에 갇히면 "순서" 가
 * 안 읽힌다. 한 선 위에 번호와 아이콘을 얹어야 밟아 가는 길로 보인다.
 *
 * 아이콘은 path 로 직접 그린다 — 여섯을 나란히 놓았을 때 선 굵기와 크기가
 * 같아야 한 세트로 읽힌다. 라벨은 SVG 안에 있으므로 페이지 언어를 따라간다.
 */
const FONT =
    "Pretendard,'Pretendard Variable','Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

const T: Record<Locale, { steps: [string, string][]; platform: string; desktop: string; aria: string }> = {
    ko: {
        steps: [
            ["DeX 설치", "설치 파일을 실행해 XGEN DeX를 설치합니다"],
            ["XGEN에 연결", "계정으로 로그인해 XGEN 플랫폼에 연결합니다"],
            ["Agent 선택", "업무에 필요한 Agent를 고릅니다"],
            ["실행 환경 연결", "파일·브라우저·도구 중 필요한 것만 열어줍니다"],
            ["업무 지시", "자연어로 지시하면 Agent가 실행합니다"],
            ["결과 확인 · 이어가기", "결과물은 동기화 폴더에, 다음 업무로 이어집니다"],
        ],
        platform: "XGEN 플랫폼",
        desktop: "사용자 데스크톱 환경",
        aria: "XGEN DeX 사용 흐름 여섯 단계 — DeX 설치, XGEN에 연결, Agent 선택, 실행 환경 연결, 업무 지시, 결과 확인과 이어가기",
    },
    en: {
        steps: [
            ["Install DeX", "Run the installer to set up XGEN DeX"],
            ["Connect to XGEN", "Sign in to reach the XGEN platform"],
            ["Pick an agent", "Choose the agent the task calls for"],
            ["Connect execution", "Open only the files, browser, and tools the task needs"],
            ["Hand it work", "Ask in plain language and the agent runs it"],
            ["Check · continue", "The result lands in the synced folder and carries forward"],
        ],
        platform: "XGEN platform",
        desktop: "User desktop environment",
        aria: "The six steps of using XGEN DeX — install, connect to XGEN, pick an agent, connect the execution environment, hand it work, and check the result",
    },
};

/** 단계별 아이콘 — 24x24 좌표계에 그리고 노드 중심으로 옮겨 놓는다. */
function StepIcon({ i }: { i: number }) {
    const s = {
        stroke: "#2461d8",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        fill: "none",
    };
    switch (i) {
        case 0: // 내려받아 설치
            return (
                <g {...s}>
                    <path d="M12 3v11M7.5 9.5 12 14l4.5-4.5" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </g>
            );
        case 1: // 연결
            return (
                <g {...s}>
                    <path d="M9.5 14.5 14.5 9.5" />
                    <path d="M11 6.5 12.8 4.7a4 4 0 0 1 5.7 5.7L16.6 12.3" />
                    <path d="M13 17.5 11.2 19.3a4 4 0 0 1-5.7-5.7L7.4 11.7" />
                </g>
            );
        case 2: // Agent 고르기
            return (
                <g {...s}>
                    <rect x="4.5" y="7.5" width="15" height="12" rx="3" />
                    <path d="M12 3v4.5M9 12.5v.01M15 12.5v.01M9.5 16h5" />
                </g>
            );
        case 3: // 실행 환경 · 권한
            return (
                <g {...s}>
                    <path d="M4 7h16M4 12h16M4 17h16" />
                    <circle cx="9" cy="7" r="2.2" fill="#2461d8" />
                    <circle cx="15" cy="12" r="2.2" fill="#2461d8" />
                    <circle cx="8" cy="17" r="2.2" fill="#2461d8" />
                </g>
            );
        case 4: // 자연어 지시
            return (
                <g {...s}>
                    <path d="M20 13a2 2 0 0 1-2 2H9l-4 3.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" />
                    <path d="M9 8.5h7M9 11.5h4.5" />
                </g>
            );
        default: // 결과 확인
            return (
                <g {...s}>
                    <path d="M3.5 7.5a2 2 0 0 1 2-2h3.6l2 2.4h7.4a2 2 0 0 1 2 2v8.6a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
                    <path d="M9 13.6l2.3 2.3 4.2-4.4" />
                </g>
            );
    }
}

const N = 6;
/** 노드가 놓이는 세로 축 */
const CX = 300;
const R = 28;
const Y0 = 130;
const GAP = 96;
/** 2번(XGEN에 연결) 노드의 y — 플랫폼에서 들어오는 선이 여기에 닿는다 */
const CONNECT_Y = Y0 + GAP;
const H = 706;

export function DexFlowArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <svg
            viewBox={`0 0 820 ${H}`}
            className="block h-auto w-full"
            role="img"
            aria-label={L.aria}
            fontFamily={FONT}
        >
            <defs>
                <linearGradient id="df-node" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
            </defs>

            {/*
              1~6 은 모두 사용자 데스크톱에서 일어난다. 테두리로 묶어 두지
              않으면 2번(XGEN에 연결) 때문에 어디서 벌어지는 일인지 흐려진다.
            */}
            <rect
                x="200" y="16" width="580" height="670" rx="24"
                fill="#2f7bff" fillOpacity="0.04"
                stroke="#2f7bff" strokeWidth="1.8" strokeDasharray="8 7"
            />
            <rect x="200" y="16" width="212" height="30" rx="15" fill="url(#df-node)" />
            <text x="306" y="36" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#ffffff">
                {L.desktop}
            </text>

            {/* 플랫폼 — 2번이 여기로 연결된다. 데스크톱 바깥에 둔다 */}
            <rect x="20" y={CONNECT_Y - 32} width="170" height="64" rx="14" fill="#ffffff" stroke="#dbe4f6" />
            <rect x="40" y={CONNECT_Y - 9} width="18" height="18" rx="5" fill="url(#df-node)" />
            <text x="66" y={CONNECT_Y + 6} fontSize="14.5" fontWeight="800" fill="#1f4fa8">
                {L.platform}
            </text>
            {/*
              실선으로 2번 노드의 원 가장자리까지 곧장 잇는다. 점선에 화살표를
              얹으면 "흐름" 처럼 읽히는데, 이건 흐름이 아니라 XGEN 에 연결한다는
              그 단계 자체를 가리키는 선이다.
            */}
            <path d={`M190 ${CONNECT_Y} H ${CX - R}`} stroke="#8fb4ff" strokeWidth="2.5" fill="none" />

            {/* 여섯을 잇는 한 선 — 순서가 있다는 것을 이 선이 말한다 */}
            <path
                d={`M${CX} ${Y0} V ${Y0 + GAP * (N - 1)}`}
                stroke="#dbe4f6"
                strokeWidth="2"
                strokeDasharray="5 7"
            />

            {L.steps.map(([title, desc], i) => {
                const y = Y0 + GAP * i;
                return (
                    <g key={title}>
                        {/* 진행 방향 표시 — 마지막 아래에는 두지 않는다 */}
                        {i < N - 1 && (
                            <path
                                d={`M${CX - 6} ${y + 42} l6 7 6 -7`}
                                stroke="#8fb4ff"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        )}

                        {/*
                          노드 안은 번호다. 아이콘을 넣어 두면 여섯 개가 비슷한
                          파란 원으로 보여 몇 번째인지 세어야 한다 — 숫자가 크게
                          박혀 있어야 순서가 한눈에 잡힌다.
                        */}
                        <circle cx={CX} cy={y} r={R} fill="#ffffff" stroke="#dbe4f6" strokeWidth="1.6" />
                        <text
                            x={CX}
                            y={y + 10}
                            textAnchor="middle"
                            fontSize="27"
                            fontWeight="800"
                            fill="#2461d8"
                        >
                            {i + 1}
                        </text>

                        {/* 아이콘은 제목 앞으로 — 무슨 단계인지 제목과 함께 읽힌다 */}
                        <rect
                            x={CX + 52}
                            y={y - 21}
                            width="30"
                            height="30"
                            rx="9"
                            fill="#2f7bff"
                            fillOpacity="0.1"
                        />
                        <g transform={`translate(${CX + 55} ${y - 18})`}>
                            <StepIcon i={i} />
                        </g>

                        {/* 세로로 세우면 폭이 남는다 — 설명이 한 줄에 들어간다 */}
                        <text x={CX + 94} y={y - 1} fontSize="15.5" fontWeight="800" fill="#111827">
                            {title}
                        </text>
                        <text x={CX + 94} y={y + 20} fontSize="12.5" fill="#6b7280">
                            {desc}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
