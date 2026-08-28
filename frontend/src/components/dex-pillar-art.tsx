/**
 * 세 기둥 카드에 얹는 일러스트.
 *
 * 아이콘 하나로는 「중앙 관리」와 「연결」과 「결과물」이 구분되지 않는다.
 * 문장을 읽기 전에 그림만 봐도 무엇이 다른 이야기인지 갈리게 그린다.
 *
 * 세 장의 viewBox 와 여백을 맞춰 카드 세 개가 나란히 놓여도 눈높이가 어긋나지
 * 않는다. 색은 왼쪽에서 오른쪽으로 갈수록 파랑이 진해지며 관리 → 연결 → 결과의
 * 순서를 만든다.
 */
const VB = "0 0 344 128";

/** 세 장이 같은 그라디언트를 쓰되 id 는 겹치지 않게 둔다 */
function Defs({ id }: { id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#00acee" />
                <stop offset="1" stopColor="#185aea" />
            </linearGradient>
        </defs>
    );
}

/**
 * 1 — 중앙에서 관리하고, 현장에서 실행한다.
 * 한 곳에서 정한 것이 여러 자리로 똑같이 퍼지는 그림. 선이 하나에서 여럿으로
 * 갈라져야 「전사가 같은 기준」이 읽힌다.
 */
export function DexPillarGovernArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="pg-brand" />

            {/* 갈라지는 선 — 먼저 깔아 노드 뒤로 보낸다 */}
            <g stroke="#cfe0ff" strokeWidth="2" fill="none">
                <path d="M92 64 C 140 64 150 26 196 26" />
                <path d="M92 64 H 196" />
                <path d="M92 64 C 140 64 150 102 196 102" />
            </g>

            {/* 중앙 — 정의가 한 곳에 있다 */}
            <circle cx="58" cy="64" r="32" fill="url(#pg-brand)" />
            <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M58 46 l13 5v11c0 8-5.5 14.5-13 17-7.5-2.5-13-9-13-17V51z" />
                <path d="M52.5 63.5 l4 4 9-9" />
            </g>

            {/* 현장 — 같은 기준이 여러 자리에 그대로 내려앉는다 */}
            {[26, 64, 102].map((cy) => (
                <g key={cy}>
                    <rect x="196" y={cy - 17} width="132" height="34" rx="10" fill="#f3f7ff" stroke="#cfe0ff" />
                    <rect x="208" y={cy - 8} width="16" height="16" rx="5" fill="url(#pg-brand)" />
                    <path d={`M234 ${cy - 4} h58M234 ${cy + 4} h38`} stroke="#c6d2e4" strokeWidth="3.5" strokeLinecap="round" />
                </g>
            ))}
        </svg>
    );
}

/**
 * 2 — 쓰던 환경은 그대로 두고 실행 능력만 더한다.
 * 화면을 갈아엎는 그림이 아니라, 있던 창 위에 Agent 가 하나 얹히는 그림이다.
 */
export function DexPillarKeepArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="pk-brand" />

            {/* 이미 쓰고 있는 창 — 회색으로 눌러 「그대로 둔다」를 말한다 */}
            <rect x="24" y="16" width="200" height="96" rx="12" fill="#f4f6f9" stroke="#e2e6ec" />
            <path d="M24 28a12 12 0 0 1 12-12h176a12 12 0 0 1 12 12v6H24z" fill="#e6eaf0" />
            <g fill="#c9d0da">
                <circle cx="40" cy="25" r="3" />
                <circle cx="52" cy="25" r="3" />
                <circle cx="64" cy="25" r="3" />
            </g>
            <g stroke="#d7dce4" strokeWidth="6" strokeLinecap="round">
                <path d="M44 54h72M44 72h124M44 90h96" />
            </g>

            {/* 얹히는 것 — 새 시스템이 아니라 능력 하나가 붙는다 */}
            <g stroke="#bcd0f5" strokeWidth="2" fill="none">
                <path d="M224 64 H 252" />
            </g>
            <circle cx="288" cy="64" r="34" fill="url(#pk-brand)" />
            <g stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <rect x="274" y="56" width="28" height="21" rx="6" />
                <path d="M288 44v12M281 66v.01M295 66v.01M282 84h12" />
            </g>
            {/* 더해진다는 표시 */}
            <circle cx="312" cy="40" r="12" fill="#ffffff" stroke="#bcd0f5" />
            <path d="M312 34v12M306 40h12" stroke="#2461d8" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
    );
}

/**
 * 3 — 답변이 아니라 결과물로 끝난다.
 * 왼쪽의 말풍선은 회색, 오른쪽의 파일은 파랑. 「말」에서 「물건」으로 넘어가는
 * 그 한 칸이 이 카드의 요지다.
 */
export function DexPillarDeliverArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="pd-brand" />

            {/* 지시 — 여기까지는 아직 말이다 */}
            <path
                d="M16 34a12 12 0 0 1 12-12h84a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12H52l-18 15V76h-6a12 12 0 0 1-12-12z"
                fill="#f4f6f9"
                stroke="#e2e6ec"
            />
            <g stroke="#d7dce4" strokeWidth="6" strokeLinecap="round">
                <path d="M36 42h64M36 58h40" />
            </g>

            {/* 넘어가는 한 칸 */}
            <path d="M136 56 H 184" stroke="#bcd0f5" strokeWidth="2" fill="none" />
            <path d="M178 50 l7 6 -7 6" stroke="#8fb4ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* 결과물 — 지정한 자리에 파일로 남는다 */}
            <path
                d="M196 96a10 10 0 0 1 10-10h116a10 10 0 0 1 10 10v14a10 10 0 0 1-10 10H206a10 10 0 0 1-10-10z"
                fill="#e8eefb"
            />
            <path d="M196 96a10 10 0 0 1 10-10h20l8 10z" fill="#d6e2f8" />
            <g>
                <path
                    d="M226 14 h44 l22 22 v52a8 8 0 0 1-8 8h-58a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z"
                    fill="url(#pd-brand)"
                />
                <path d="M270 14v22h22z" fill="#ffffff" fillOpacity="0.45" />
                <path
                    d="M238 62 l10 10 18-20"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </g>
        </svg>
    );
}

export const DEX_PILLAR_ART = [DexPillarGovernArt, DexPillarKeepArt, DexPillarDeliverArt];
