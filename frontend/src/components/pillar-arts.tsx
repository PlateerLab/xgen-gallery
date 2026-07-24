/**
 * 제품 개요 4대 핵심 가치 카드용 블루프린트 아이소메트릭 일러스트 — 네이티브 SVG.
 * 공통 프레임(치수선·크롭마크·아이소 그리드) 위에 가치별 오브젝트를 얹는다.
 * 텍스트는 카드 HTML에서 렌더(SEO·접근성), 여기선 도형만. 외부 이미지/라이브러리 없음(CSP-safe).
 */

export type PillarVariant = "orchestration" | "reliability" | "routing" | "uptime";

type Theme = {
    edge: string;
    top: string;
    left: string;
    right: string;
    acc: string;
    faint: string;
};

/** 블루 그라데이션 패널 위에 얹는 화이트 라인아트(4개 카드 공통). */
const ONBLUE: Theme = {
    edge: "#ffffff",
    top: "rgba(255,255,255,0.5)",
    left: "rgba(255,255,255,0.28)",
    right: "rgba(255,255,255,0.15)",
    acc: "rgba(255,255,255,0.72)",
    faint: "#ffffff",
};

/** 아이소 큐브 — (x,y)는 상단 마름모 중심. a=반폭, t=두께. */
function Cube({ x, y, a, t, th }: { x: number; y: number; a: number; t: number; th: Theme }) {
    const hh = a / 2;
    return (
        <g stroke={th.edge} strokeWidth="1.3" strokeLinejoin="round">
            <polygon points={`${x - a},${y} ${x},${y + hh} ${x},${y + hh + t} ${x - a},${y + t}`} fill={th.left} />
            <polygon points={`${x + a},${y} ${x},${y + hh} ${x},${y + hh + t} ${x + a},${y + t}`} fill={th.right} />
            <polygon points={`${x},${y - hh} ${x + a},${y} ${x},${y + hh} ${x - a},${y}`} fill={th.top} />
        </g>
    );
}

function gearPts(cx: number, cy: number, rOut: number, rIn: number, teeth: number) {
    const pts: string[] = [];
    const n = teeth * 2;
    for (let i = 0; i < n; i++) {
        const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
        const r = i % 2 === 0 ? rOut : rIn;
        pts.push(`${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`);
    }
    return pts.join(" ");
}

/** 공통 블루프린트 프레임(치수선·크롭마크·아이소 그리드 플로어). */
function Frame({ th, children }: { th: Theme; children: React.ReactNode }) {
    const L: [number, number] = [48, 158];
    const T: [number, number] = [120, 124];
    const B: [number, number] = [120, 192];
    const R: [number, number] = [T[0] + B[0] - L[0], T[1] + B[1] - L[1]];
    const N = 4;
    const grid: [number, number, number, number][] = [];
    for (let i = 0; i <= N; i++) {
        const u = i / N;
        const px = L[0] + (T[0] - L[0]) * u;
        const py = L[1] + (T[1] - L[1]) * u;
        grid.push([px, py, px + (B[0] - L[0]), py + (B[1] - L[1])]);
        const qx = L[0] + (B[0] - L[0]) * u;
        const qy = L[1] + (B[1] - L[1]) * u;
        grid.push([qx, qy, qx + (T[0] - L[0]), qy + (T[1] - L[1])]);
    }
    return (
        <svg viewBox="0 0 240 212" className="w-full" aria-hidden="true">
            {/* 상단 치수선 */}
            <g stroke={th.edge} strokeWidth="1.2" opacity="0.5" fill="none" strokeLinecap="round">
                <line x1="28" y1="16" x2="212" y2="16" />
                <path d="M28,16 l7,-3.5 M28,16 l7,3.5" />
                <path d="M212,16 l-7,-3.5 M212,16 l-7,3.5" />
                <line x1="28" y1="11" x2="28" y2="21" />
                <line x1="212" y1="11" x2="212" y2="21" />
            </g>
            {/* 코너 크롭마크 */}
            <g stroke={th.edge} strokeWidth="1.4" opacity="0.45" fill="none" strokeLinecap="round">
                <path d="M14,36 V24 H26" />
                <path d="M226,36 V24 H214" />
                <path d="M14,178 V190 H26" />
                <path d="M226,178 V190 H214" />
            </g>
            {/* 우측 x 마크 · 좌측 치수 틱 */}
            <g stroke={th.edge} strokeWidth="1.2" opacity="0.5" strokeLinecap="round">
                <path d="M220,110 l6,6 M226,110 l-6,6" />
                <path d="M12,96 h8 M16,96 v20 M12,116 h8" />
            </g>
            {/* 아이소 그리드 플로어 */}
            <polygon points={`${L[0]},${L[1]} ${T[0]},${T[1]} ${R[0]},${R[1]} ${B[0]},${B[1]}`} fill={th.faint} opacity="0.28" />
            <g stroke={th.edge} strokeWidth="0.8" opacity="0.22">
                {grid.map((g, i) => (
                    <line key={i} x1={g[0]} y1={g[1]} x2={g[2]} y2={g[3]} />
                ))}
            </g>
            {children}
        </svg>
    );
}

/** 1) 지능형 오케스트레이션 — 노드 네트워크. */
function Orchestration() {
    const th = ONBLUE;
    const nodes: [number, number][] = [
        [120, 66],
        [88, 90],
        [152, 90],
        [74, 120],
        [120, 110],
        [166, 120],
        [100, 140],
        [140, 140],
    ];
    const edges: [number, number][] = [
        [0, 1], [0, 2], [1, 4], [2, 4], [1, 3], [2, 5],
        [3, 6], [4, 6], [4, 7], [5, 7], [6, 7], [0, 4],
    ];
    const cp = (n: [number, number]): [number, number] => [n[0], n[1] + 6];
    return (
        <Frame th={th}>
            {/* 연결선 */}
            <g stroke={th.acc} strokeWidth="1.6" opacity="0.85" strokeLinecap="round">
                {edges.map((e, i) => {
                    const a = cp(nodes[e[0]]);
                    const b = cp(nodes[e[1]]);
                    return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
                })}
            </g>
            {/* 노드 큐브 */}
            {nodes.map((n, i) => (
                <Cube key={i} x={n[0]} y={n[1]} a={11} t={12} th={th} />
            ))}
            {/* 상승 화살표(흐름) */}
            <g stroke={th.acc} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                <path d="M176,86 l20,-20 M188,66 h8 v8" />
            </g>
            {/* 좌상단 미니 노드 클러스터 */}
            <g stroke={th.edge} strokeWidth="1.1" opacity="0.5">
                <line x1="34" y1="52" x2="48" y2="44" />
                <line x1="34" y1="52" x2="44" y2="64" />
                <line x1="48" y1="44" x2="44" y2="64" />
                <circle cx="34" cy="52" r="3" fill={th.top} />
                <circle cx="48" cy="44" r="3" fill={th.top} />
                <circle cx="44" cy="64" r="3" fill={th.top} />
            </g>
            {/* 우하단 미니 바 차트 */}
            <g fill={th.left} stroke={th.edge} strokeWidth="1">
                <rect x="182" y="158" width="6" height="10" rx="1" />
                <rect x="192" y="152" width="6" height="16" rx="1" />
                <rect x="202" y="146" width="6" height="22" rx="1" />
            </g>
        </Frame>
    );
}

/** 2) 무결점 신뢰성 — 실드 + 락(앰버). */
function Reliability() {
    const th = ONBLUE;
    const check = "#2f6fe0";
    const shield =
        "M86,76 Q86,71 91,71 H149 Q154,71 154,76 V104 Q154,134 120,152 Q86,134 86,104 Z";
    return (
        <Frame th={th}>
            {/* 받침 플랫폼(아이소) */}
            <polygon points="120,140 168,164 120,188 72,164" fill={th.faint} opacity="0.16" stroke={th.edge} strokeWidth="1" strokeOpacity="0.5" strokeLinejoin="round" />
            {/* 실드 그림자(두께) */}
            <path d={shield} transform="translate(-5,4)" fill={th.right} stroke={th.edge} strokeWidth="1.4" opacity="0.7" />
            {/* 실드 — 프로스티드 화이트 */}
            <path d={shield} fill={th.top} stroke={th.edge} strokeWidth="2" strokeLinejoin="round" />
            <path
                d="M94,80 Q94,77 97,77 H143 Q146,77 146,80 V103 Q146,128 120,143 Q94,128 94,103 Z"
                fill="none"
                stroke={th.acc}
                strokeWidth="1"
            />
            {/* 검증 체크 */}
            <path d="M106,107 l10,11 l21,-27" fill="none" stroke={check} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* 좌상단 미니 체크 */}
            <g fill="none" stroke={th.edge} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="40" cy="56" r="9" strokeOpacity="0.6" />
                <path d="M36,56 l3,3 l6,-7" />
            </g>
            {/* 우상/우하단 체크 배지 */}
            {[
                [200, 52],
                [204, 168],
            ].map((p, i) => (
                <g key={i}>
                    <polygon points={gearPts(p[0], p[1], 10, 7.5, 10)} fill={th.top} stroke={th.edge} strokeWidth="1.2" />
                    <path d={`M${p[0] - 4},${p[1]} l3,3 l5,-6`} fill="none" stroke={th.edge} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            ))}
        </Frame>
    );
}

/** 3) 완벽한 유연성 — 허브 & 스포크 라우팅. */
function Routing() {
    const th = ONBLUE;
    const hub: [number, number] = [120, 116];
    const outs: [number, number][] = [
        [120, 68],
        [72, 96],
        [168, 96],
        [82, 150],
        [158, 150],
        [120, 166],
    ];
    const hc: [number, number] = [hub[0], hub[1] + 9];
    return (
        <Frame th={th}>
            {/* 케이블 */}
            <g stroke={th.acc} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85">
                {outs.map((o, i) => {
                    const oc: [number, number] = [o[0], o[1] + 5];
                    const mx = (hc[0] + oc[0]) / 2;
                    return <path key={i} d={`M${hc[0]},${hc[1]} Q${mx},${hc[1]} ${oc[0]},${oc[1]}`} />;
                })}
            </g>
            {/* 외곽 노드 */}
            {outs.map((o, i) => (
                <Cube key={i} x={o[0]} y={o[1]} a={10} t={10} th={th} />
            ))}
            {/* 허브 */}
            <Cube x={hub[0]} y={hub[1]} a={16} t={18} th={{ ...th, top: "rgba(255,255,255,0.62)" }} />
            {/* 코너 확장 화살표 */}
            <g stroke={th.acc} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
                <path d="M46,52 l-14,-14 M32,38 h9 M32,38 v9" />
                <path d="M194,52 l14,-14 M208,38 h-9 M208,38 v9" />
                <path d="M46,172 l-14,14 M32,186 h9 M32,186 v-9" />
                <path d="M194,172 l14,14 M208,186 h-9 M208,186 v-9" />
            </g>
            {/* 좌상단 미니 흐름 */}
            <g stroke={th.edge} strokeWidth="1.1" fill={th.top} opacity="0.6">
                {[0, 1].map((r) => (
                    <g key={r} transform={`translate(0,${r * 11})`}>
                        <rect x="30" y="44" width="7" height="7" rx="1.5" />
                        <path d="M39,47.5 h6 m-2,-2 l2,2 l-2,2" fill="none" stroke={th.edge} strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="47" y="44" width="7" height="7" rx="1.5" />
                    </g>
                ))}
            </g>
        </Frame>
    );
}

/** 4) 무중단 안정성 — 게이지 + 기어. */
function Uptime() {
    const th = ONBLUE;
    const cx = 96;
    const cy = 128;
    const r = 42;
    const arc = (deg: number): [number, number] => [
        cx + r * Math.cos((deg * Math.PI) / 180),
        cy + r * Math.sin((deg * Math.PI) / 180),
    ];
    const a0 = arc(140);
    const a1 = arc(40);
    const nd = arc(-58);
    return (
        <Frame th={th}>
            {/* 기어(뒤) */}
            <g stroke={th.edge} strokeWidth="1.4" strokeLinejoin="round">
                <polygon points={gearPts(170, 108, 19, 14, 10)} fill={th.left} />
                <circle cx="170" cy="108" r="6.5" fill="#eef4fd" />
                <polygon points={gearPts(190, 146, 13, 9.5, 8)} fill={th.right} />
                <circle cx="190" cy="146" r="4.5" fill="#eef4fd" />
            </g>
            {/* 게이지 다이얼 */}
            <path
                d={`M${a0[0].toFixed(1)},${a0[1].toFixed(1)} A${r},${r} 0 1 1 ${a1[0].toFixed(1)},${a1[1].toFixed(1)}`}
                fill="none"
                stroke={th.edge}
                strokeWidth="2.4"
                strokeLinecap="round"
            />
            {/* 눈금 */}
            <g stroke={th.acc} strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
                {[140, 168, 196, 224, 322, 350, 378, 40].map((d, i) => {
                    const o = arc(d);
                    const inr = 0.82;
                    return <line key={i} x1={cx + (o[0] - cx) * inr} y1={cy + (o[1] - cy) * inr} x2={o[0]} y2={o[1]} />;
                })}
            </g>
            {/* 니들 */}
            <line x1={cx} y1={cy} x2={nd[0].toFixed(1)} y2={nd[1].toFixed(1)} stroke={th.edge} strokeWidth="2.6" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="5.5" fill={th.top} stroke={th.edge} strokeWidth="1.6" />
            {/* 회전 모션 화살표 */}
            <path d="M150,88 a26,26 0 0 1 34,6" fill="none" stroke={th.acc} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
            <path d="M182,88 l3,7 l-8,0" fill="none" stroke={th.acc} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            {/* 좌상단 미니 게이지 */}
            <g stroke={th.edge} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6">
                <path d="M32,58 a11,11 0 0 1 22,0" />
                <line x1="43" y1="58" x2="49" y2="50" />
            </g>
        </Frame>
    );
}

export function PillarArt({ variant }: { variant: PillarVariant }) {
    switch (variant) {
        case "orchestration":
            return <Orchestration />;
        case "reliability":
            return <Reliability />;
        case "routing":
            return <Routing />;
        case "uptime":
            return <Uptime />;
    }
}
