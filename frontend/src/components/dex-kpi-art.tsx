/**
 * 「무엇을 측정하나요?」 세 카드에 붙는 작은 일러스트.
 *
 * 세 장 모두 **재기 전과 잰 뒤**를 한 그림에 넣는다. 회색이 기준값(Baseline),
 * 파랑이 파일럿 목표다. 목표 수치만 크게 적어 두면 이미 낸 실적처럼 읽히는데,
 * 옆에 회색 막대가 함께 있으면 「무엇에 견준 값인가」가 그림에서 먼저 잡힌다.
 *
 * 라벨을 막대 위가 아니라 **왼쪽에** 둔다. 위에 얹으면 두 줄이 네 줄이 되어
 * 그림이 카드 높이의 절반을 먹었다 — 이 그림은 수치를 거드는 자리이지 주인공이
 * 아니다. 세 장의 viewBox 를 맞춰 카드 세 개가 나란히 놓여도 어긋나지 않는다.
 */
const VB = "0 0 240 64";
/** 라벨이 끝나고 그래픽이 시작하는 x */
const X = 54;

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

/** 두 줄 공통 라벨 — 기준값은 회색, 목표는 파랑 */
function Row({ y, label, target }: { y: number; label: string; target?: boolean }) {
    return (
        <text
            x="0"
            y={y}
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.6"
            fill={target ? "#8fb4ff" : "#b8bfc9"}
        >
            {label}
        </text>
    );
}

/** 업무 리드타임 — 긴 막대가 짧아진다 */
export function DexKpiLeadTimeArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="kpi-lead" />
            <Row y={22} label="BASELINE" />
            <rect x={X} y="12" width="180" height="12" rx="6" fill="#e2e6ec" />

            <Row y={50} label="TARGET" target />
            <rect x={X} y="40" width="126" height="12" rx="6" fill="url(#kpi-lead)" />
            {/* 줄어든 만큼 */}
            <path
                d={`M${X + 134} 46h40M${X + 168} 42l5 4-5 4`}
                fill="none"
                stroke="#cfe0ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/** 반복 작업 시간 — 다섯 칸이 네 칸으로 준다 */
export function DexKpiRepeatArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="kpi-repeat" />
            <Row y={22} label="BASELINE" />
            <g fill="#e2e6ec">
                {[0, 1, 2, 3, 4].map((i) => (
                    <rect key={i} x={X + i * 38} y="12" width="30" height="12" rx="4" />
                ))}
            </g>

            <Row y={50} label="TARGET" target />
            {[0, 1, 2, 3].map((i) => (
                <rect
                    key={i}
                    x={X + i * 38}
                    y="40"
                    width="30"
                    height="12"
                    rx="4"
                    fill="url(#kpi-repeat)"
                />
            ))}
            {/* 사라지는 한 칸 — 점선으로 자리만 남긴다 */}
            <rect
                x={X + 4 * 38}
                y="40"
                width="30"
                height="12"
                rx="4"
                fill="none"
                stroke="#cfe0ff"
                strokeDasharray="3 3"
            />
        </svg>
    );
}

/** 핵심 업무 완료율 — 열 칸 가운데 아홉 칸이 찬다 */
export function DexKpiCompletionArt() {
    return (
        <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
            <Defs id="kpi-done" />
            <Row y={36} label="TARGET" target />

            {/* 열 칸 — 세어 보면 아홉이다 */}
            {Array.from({ length: 10 }).map((_, i) => (
                <rect
                    key={i}
                    x={X + i * 19}
                    y="24"
                    width="15"
                    height="15"
                    rx="4"
                    fill={i < 9 ? "url(#kpi-done)" : "none"}
                    stroke={i < 9 ? "none" : "#cfe0ff"}
                    strokeDasharray={i < 9 ? undefined : "3 3"}
                />
            ))}
            {/* 첫 칸에만 체크를 얹어 「끝까지 갔다」를 표시 */}
            <path
                d={`M${X + 4} 31.5l2.8 2.8L${X + 11.5} 28.5`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export const DEX_KPI_ART = [DexKpiLeadTimeArt, DexKpiRepeatArt, DexKpiCompletionArt];
