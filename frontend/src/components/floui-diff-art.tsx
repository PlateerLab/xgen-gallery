/**
 * 「대시보드와 무엇이 다른가요?」 세 카드에 붙는 일러스트.
 *
 * 아이콘 하나로는 「명세」와 「결합」과 「반복」이 구분되지 않는다. 문장을 읽기
 * 전에 그림만 봐도 서로 다른 이야기라는 게 갈리게 그린다.
 *
 * 세 장의 viewBox 와 여백을 맞춰 카드 세 개가 나란히 놓여도 눈높이가 어긋나지
 * 않는다. 회색은 「이미 있는 것」, 파랑은 「FloUI 가 만드는 것」으로 일관되게 쓴다.
 */
const VB = "0 0 344 128";

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
 * 1 — 질문이 화면의 명세가 된다.
 * 왼쪽 문장의 줄이 오른쪽 화면의 블록으로 그대로 이어지는 그림. 선이 문장에서
 * 블록으로 건너가야 「이 문장이 곧 설계도」라는 말이 그림에서 읽힌다.
 */
export function FloUIDiffSpecArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="fd1" />

            {/* 질문 — 아직 화면은 없다 */}
            <path
                d="M20 26h84a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12H46l-14 12V84h-12a12 12 0 0 1-12-12V38a12 12 0 0 1 12-12z"
                fill="#f3f7ff"
                stroke="#cfe0ff"
            />
            <g stroke="#bcd0f5" strokeWidth="6" strokeLinecap="round">
                <path d="M28 46h68M28 64h44" />
            </g>

            {/* 문장의 줄이 화면의 블록으로 건너간다 */}
            <g stroke="#cfe0ff" strokeWidth="2" fill="none">
                <path d="M116 46 C 156 46 160 32 196 32" />
                <path d="M116 55 C 156 55 160 66 196 66" />
                <path d="M116 64 C 156 64 160 98 196 98" />
            </g>

            {/* 그 자리에서 짜인 화면 */}
            <rect x="196" y="14" width="140" height="100" rx="11" fill="#ffffff" stroke="#cfe0ff" />
            <path d="M196 25a11 11 0 0 1 11-11h118a11 11 0 0 1 11 11v6H196z" fill="#eef4fd" />
            <rect x="208" y="40" width="52" height="18" rx="6" fill="url(#fd1)" />
            <rect x="268" y="40" width="56" height="18" rx="6" fill="#e3e9f2" />
            <rect x="208" y="66" width="116" height="14" rx="5" fill="#e3e9f2" />
            <rect x="208" y="88" width="76" height="14" rx="5" fill="#dbe8fb" />
        </svg>
    );
}

/**
 * 2 — 흩어진 두 곳을 한 화면에서 본다.
 * 위는 숫자가 있는 데이터베이스, 아래는 맥락이 있는 문서. 둘이 하나로 합쳐지는
 * 그림이라 선을 한 점으로 모았다가 화면으로 보낸다.
 */
export function FloUIDiffJoinArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="fd2" />

            {/* 정형 데이터 */}
            <g fill="#f8fafc" stroke="#dbe4f6" strokeWidth="1.6">
                <ellipse cx="42" cy="26" rx="26" ry="9" />
                <path d="M16 26v30c0 5 11.6 9 26 9s26-4 26-9V26" />
            </g>
            <path
                d="M16 41c0 5 11.6 9 26 9s26-4 26-9"
                fill="none"
                stroke="#dbe4f6"
                strokeWidth="1.6"
            />

            {/* 문서 */}
            <path
                d="M20 80h30l14 14v26a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V84a4 4 0 0 1 4-4z"
                fill="#f8fafc"
                stroke="#dbe4f6"
                strokeWidth="1.6"
            />
            <path d="M50 80v14h14z" fill="#e3e9f2" />
            <g stroke="#d7dce4" strokeWidth="4" strokeLinecap="round">
                <path d="M26 106h28M26 116h18" />
            </g>

            {/* 한 점으로 모였다가 화면으로 */}
            <g stroke="#cfe0ff" strokeWidth="2" fill="none">
                <path d="M70 48 C 106 48 106 64 126 64" />
                <path d="M70 104 C 106 104 106 64 126 64" />
            </g>
            <circle cx="130" cy="64" r="7" fill="url(#fd2)" />
            <path d="M141 64h22" stroke="#cfe0ff" strokeWidth="2" fill="none" />
            <path
                d="M159 59l6 5-6 5"
                fill="none"
                stroke="#8fb4ff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* 수치와 근거가 같은 화면에 */}
            <rect x="176" y="16" width="160" height="96" rx="11" fill="#ffffff" stroke="#cfe0ff" />
            <path d="M176 27a11 11 0 0 1 11-11h138a11 11 0 0 1 11 11v6H176z" fill="#eef4fd" />
            <rect x="188" y="42" width="48" height="14" rx="7" fill="url(#fd2)" />
            <g fill="#dbe8fb">
                <rect x="188" y="66" width="12" height="16" rx="3" />
                <rect x="205" y="58" width="12" height="24" rx="3" />
                <rect x="222" y="62" width="12" height="20" rx="3" />
            </g>
            <g stroke="#c6d2e4" strokeWidth="5" strokeLinecap="round">
                <path d="M254 48h68M254 62h48M254 76h68M254 90h34" />
            </g>
        </svg>
    );
}

/**
 * 3 — 다시 묻는 것으로 끝난다.
 * 요청서도 대기도 없이 질문과 화면 사이를 오간다는 그림이라, 두 개를 고리로
 * 잇는다. 화살표를 한 방향으로만 그리면 그냥 「생성」이 되고 반복이 안 읽힌다.
 */
export function FloUIDiffLoopArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="fd3" />

            {/* 묻는다 */}
            <path
                d="M20 30h74a12 12 0 0 1 12 12v28a12 12 0 0 1-12 12H44l-13 11V82H20a12 12 0 0 1-12-12V42a12 12 0 0 1 12-12z"
                fill="#f3f7ff"
                stroke="#cfe0ff"
            />
            <circle cx="30" cy="48" r="6" fill="url(#fd3)" />
            <g stroke="#bcd0f5" strokeWidth="6" strokeLinecap="round">
                <path d="M44 48h48M20 66h50" />
            </g>

            {/* 고리 — 위로 갔다가 아래로 돌아온다 */}
            <g fill="none" stroke="#cfe0ff" strokeWidth="2">
                <path d="M112 46 C 150 22 176 22 208 34" />
                <path d="M208 96 C 176 108 150 108 112 84" />
            </g>
            <path
                d="M201 29l8 5-5 8"
                fill="none"
                stroke="#8fb4ff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M119 89l-8-5 5-8"
                fill="none"
                stroke="#8fb4ff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* 그때마다 다른 화면 */}
            <rect x="222" y="20" width="112" height="88" rx="11" fill="#ffffff" stroke="#e6edfa" />
            <rect x="214" y="26" width="114" height="88" rx="11" fill="#ffffff" stroke="#cfe0ff" />
            <path d="M214 37a11 11 0 0 1 11-11h92a11 11 0 0 1 11 11v6H214z" fill="#eef4fd" />
            <rect x="226" y="52" width="42" height="13" rx="6.5" fill="url(#fd3)" />
            <g fill="#dbe8fb">
                <rect x="226" y="76" width="11" height="22" rx="3" />
                <rect x="242" y="68" width="11" height="30" rx="3" />
                <rect x="258" y="72" width="11" height="26" rx="3" />
                <rect x="274" y="62" width="11" height="36" rx="3" />
            </g>
            <rect x="278" y="52" width="34" height="13" rx="6.5" fill="#e3e9f2" />
        </svg>
    );
}

export const FLOUI_DIFF_ART = [FloUIDiffSpecArt, FloUIDiffJoinArt, FloUIDiffLoopArt];
