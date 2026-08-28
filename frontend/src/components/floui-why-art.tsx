/**
 * 「왜 필요한가요?」 두 카드에 붙는 작은 일러스트.
 *
 * 대비가 목적이라 두 장의 색을 다르게 쓴다 — 왼쪽은 회색으로 눌러 두고
 * 오른쪽만 파랗게 살린다. 같은 색으로 그리면 무엇이 나아졌는지가 그림에서
 * 안 읽힌다.
 *
 * 차이는 「몇 장이 나오는가」에 있다. 왼쪽은 기다린 끝에 정해진 화면 하나,
 * 오른쪽은 질문마다 다른 화면이 그 자리에서. 그래서 왼쪽에는 시계를 하나
 * 끼워 두고, 오른쪽에는 카드를 여러 장 겹친다.
 *
 * 두 장의 viewBox 와 요소 높이를 맞춰 카드 두 개가 나란히 놓여도 어긋나지 않는다.
 */
const VB = "0 0 360 116";

/** 질문 말풍선 — 꼬리까지 한 path 로 그려야 테두리가 끊기지 않는다 */
const BUBBLE =
    "M26 24h68a12 12 0 0 1 12 12v26a12 12 0 0 1-12 12H50l-15 12V74h-9a12 12 0 0 1-12-12V36a12 12 0 0 1 12-12z";

/** 기존 방식 — 요청하고, 기다리고, 정해진 화면 하나를 받는다 */
export function FloUIWhyBeforeArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <path d={BUBBLE} fill="#f4f6f9" stroke="#e2e6ec" />
            <g stroke="#d7dce4" strokeWidth="5" strokeLinecap="round">
                <path d="M32 44h58M32 58h36" />
            </g>

            {/* 기다림 — 이 그림의 요지다 */}
            <circle cx="140" cy="50" r="17" fill="#ffffff" stroke="#e2e6ec" strokeWidth="2" />
            <path
                d="M140 40v10l7 5"
                fill="none"
                stroke="#b8bfc9"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g stroke="#d7dce4" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M108 50h11" />
                <path d="M161 50h11" />
            </g>

            {/* 받는 것은 늘 정해진 화면 한 장 */}
            <rect x="182" y="20" width="164" height="76" rx="11" fill="#f4f6f9" stroke="#e2e6ec" />
            <path d="M182 31a11 11 0 0 1 11-11h142a11 11 0 0 1 11 11v7H182z" fill="#e6eaf0" />
            <g fill="#d7dce4">
                <circle cx="194" cy="29" r="2.6" />
                <circle cx="203" cy="29" r="2.6" />
                <circle cx="212" cy="29" r="2.6" />
            </g>
            <g fill="#e2e6ec">
                <rect x="194" y="48" width="64" height="18" rx="5" />
                <rect x="268" y="48" width="64" height="18" rx="5" />
                <rect x="194" y="74" width="138" height="12" rx="5" />
            </g>
        </svg>
    );
}

/** FloUI — 질문마다 다른 화면이 그 자리에서 생성된다 */
export function FloUIWhyAfterArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <defs>
                <linearGradient id="fw-brand" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
            </defs>

            <path d={BUBBLE} fill="#f3f7ff" stroke="#cfe0ff" />
            <circle cx="38" cy="44" r="6" fill="url(#fw-brand)" />
            <g stroke="#bcd0f5" strokeWidth="5" strokeLinecap="round">
                <path d="M52 44h38M32 60h44" />
            </g>

            {/* 기다림이 없다 — 시계 자리에 짧은 선만 남는다 */}
            <path d="M110 50h40" stroke="#bcd0f5" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path
                d="M146 45l6 5-6 5"
                fill="none"
                stroke="#8fb4ff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/*
              뒤에 겹친 두 장 — 이 자리의 화면이 고정이 아니라는 표시다.
              한 장만 그리면 왼쪽 그림과 구분되지 않는다.
            */}
            <rect x="196" y="12" width="150" height="74" rx="10" fill="#ffffff" stroke="#e6edfa" />
            <rect x="188" y="19" width="152" height="74" rx="10" fill="#ffffff" stroke="#dde6f7" />

            <rect x="180" y="26" width="154" height="72" rx="10" fill="#ffffff" stroke="#cfe0ff" />
            <path d="M180 36a10 10 0 0 1 10-10h134a10 10 0 0 1 10 10v6H180z" fill="#eef4fd" />
            <g fill="#cfe0ff">
                <circle cx="191" cy="35" r="2.4" />
                <circle cx="199" cy="35" r="2.4" />
                <circle cx="207" cy="35" r="2.4" />
            </g>
            <rect x="192" y="52" width="46" height="13" rx="6.5" fill="url(#fw-brand)" />
            <rect x="192" y="72" width="46" height="9" rx="4.5" fill="#e3e9f2" />
            <g fill="#dbe8fb">
                <rect x="252" y="66" width="12" height="16" rx="3" />
                <rect x="270" y="58" width="12" height="24" rx="3" />
                <rect x="288" y="62" width="12" height="20" rx="3" />
                <rect x="306" y="52" width="12" height="30" rx="3" />
            </g>
            <path
                d="M258 62 L276 54 L294 58 L312 48"
                fill="none"
                stroke="url(#fw-brand)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* 지금 만들어졌다는 표시 */}
            <path
                d="M341 14l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z"
                fill="url(#fw-brand)"
            />
        </svg>
    );
}
