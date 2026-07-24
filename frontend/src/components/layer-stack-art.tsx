/**
 * XGEN 코어 엔진 — 아이소메트릭 분해 스택 도해(네이티브 SVG, 외부 이미지/라이브러리 없음).
 * 두께감 있는 슬래브가 살짝 겹쳐 쌓이고(플랫 3면 명암·상판 그리드·내부 프레임), 맨 아래는 바닥
 * 그라데이션 위에 놓인다. 층 사이마다 상승 화살표가 아래→위로 흐르고, 가운데엔 각 계층 이름,
 * 오른쪽엔 각 층의 기능·역할(XGEN 주요 기능 및 역할)을 라벨로 렌더한다.
 */
const LAYERS = [
    {
        top: "#3a4863",
        left: "#2f3a53",
        right: "#26314a",
        dark: true,
        title: "에이전트 오케스트레이션",
        role: ["여러 에이전트가 협업해", "복잡한 업무를 자동 수행"],
        feat: ["Agent Workflow", "멀티에이전트 협업과 복잡한 업무 자동화"],
        desc: ["멀티에이전트 워크플로우 · 태스크 라우팅", "프롬프트 관리"],
    },
    {
        top: "#17a794",
        left: "#128a7b",
        right: "#0d7264",
        dark: true,
        title: "에이전트 빌더",
        role: ["코드 없이 캔버스에서", "에이전트·워크플로우 설계"],
        feat: ["Workflow Canvas · 이지모드 · Pathfinder", "노코드·이지모드로 손쉽게 AI 에이전트 설계"],
        desc: ["노코드 캔버스 · 워크플로우", "프롬프트 / 도구 구성"],
    },
    {
        top: "#eff2f6",
        left: "#dde3ec",
        right: "#c9d2df",
        dark: false,
        title: "RAG 하이브리드 검색",
        role: ["사내 지식에서 근거를 찾아", "환각 없는 답변 생성"],
        feat: ["Hybrid RAG Search", "온톨로지·근거 기반의 정확한 기업 지식 검색"],
        desc: ["Dense + Sparse(SPLADE) + Reranker", "Late Chunking + Vision · 온톨로지"],
    },
    {
        top: "#4a8bef",
        left: "#3e75d6",
        right: "#315fba",
        dark: true,
        title: "Model Router · 멀티 LLM",
        role: ["업무·비용·보안에 맞는", "최적 LLM 자동 선택"],
        feat: ["Model Router", "최적의 LLM 자동 선택 및 전환"],
        desc: ["GPT · Claude · Gemini", "Private LLM"],
    },
    {
        top: "#eff2f6",
        left: "#dde3ec",
        right: "#c9d2df",
        dark: false,
        title: "데이터 레이어",
        role: ["벡터·객체·관계형·캐시", "데이터를 통합 관리"],
        feat: ["AI Data Foundation", "AI 데이터를 통합 저장·관리"],
        desc: ["Qdrant(Vector DB) · MinIO(Object Storage)", "CNPG · Valkey(Cache)"],
    },
    {
        top: "#2b3a58",
        left: "#22304b",
        right: "#1b2740",
        dark: true,
        title: "인프라 레이어",
        role: ["고가용성·무중단 배포의", "온프레미스 실행 기반"],
        feat: ["AI Runtime Platform", "고가용성 AI 실행 환경 제공"],
        desc: ["k3s HA(고가용성) + ArgoCD GitOps", "무중단 배포"],
    },
];

export function LayerStackArt() {
    const cx = 235; // 스택 중심(살짝 오른쪽)
    const w = 112; // 스택 폭 축소
    const hh = 50; // 아이소 반높이(납작하게 — 수평 텍스트와 각 맞춤)
    const t = 22;
    const topY = 74;
    const gap = 60; // 층 간격(겹침 ↑ — 덜 퍼지게)
    const iw = 92;
    const ihh = 42;
    const labelX = 460; // 가운데 '레이어 이름' 컬럼
    const fnX = 810; // 오른쪽 'XGEN 기능' 컬럼
    const n = LAYERS.length;
    const cyOf = (i: number) => topY + i * gap;
    const floorY = cyOf(n - 1) + hh + t;
    const drawOrder = Array.from({ length: n }, (_, k) => n - 1 - k); // 아래(뒤)부터
    const gaps = Array.from({ length: n - 1 }, (_, k) => n - 1 - k); // 층 사이(아래부터)

    return (
        <svg
            viewBox={`0 0 1178 ${floorY + 46}`}
            className="w-full"
            role="img"
            aria-label="인프라부터 에이전트까지 여섯 계층이 쌓인 XGEN 코어 엔진 아이소메트릭 도해"
        >
            <defs>
                <radialGradient id="ls-floor" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#b8c2d6" stopOpacity="0.32" />
                    <stop offset="0.5" stopColor="#cdd5e3" stopOpacity="0.17" />
                    <stop offset="1" stopColor="#d5dce8" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* 블루프린트 코너 가이드(옅게) */}
            <g stroke="#b7c1d2" strokeWidth="1" fill="none" opacity="0.45">
                {LAYERS.map((_, i) => {
                    const cy = cyOf(i);
                    return (
                        <g key={`gd-${i}`}>
                            <line x1={cx - w} y1={cy} x2={cx - w - 28} y2={cy - 14} />
                            <line x1={cx + w} y1={cy} x2={cx + w + 28} y2={cy - 14} />
                        </g>
                    );
                })}
            </g>

            {/* 계층 슬래브 — 아래(뒤)부터 그려 위가 앞에 오도록 */}
            {drawOrder.map((i) => {
                const l = LAYERS[i];
                const cy = cyOf(i);
                const rhombus = `${cx},${cy - hh} ${cx + w},${cy} ${cx},${cy + hh} ${cx - w},${cy}`;
                const leftFace = `${cx - w},${cy} ${cx},${cy + hh} ${cx},${cy + hh + t} ${cx - w},${cy + t}`;
                const rightFace = `${cx + w},${cy} ${cx},${cy + hh} ${cx},${cy + hh + t} ${cx + w},${cy + t}`;
                const inner = `${cx},${cy - ihh} ${cx + iw},${cy} ${cx},${cy + ihh} ${cx - iw},${cy}`;
                const edge = l.dark ? "#1c2740" : "#c2ccdb";
                const grid = l.dark ? "rgba(255,255,255,0.13)" : "#d6dde7";
                const frame = l.dark ? "rgba(255,255,255,0.2)" : "#d1d9e4";
                const hi = l.dark ? "rgba(255,255,255,0.4)" : "#ffffff";
                return (
                    <g key={l.title}>
                        <polygon points={leftFace} fill={l.left} />
                        <polygon points={rightFace} fill={l.right} />
                        <polygon points={rhombus} fill={l.top} stroke={edge} strokeWidth="1" />
                        <line x1={cx - w} y1={cy} x2={cx + w} y2={cy} stroke={grid} strokeWidth="1" />
                        <line x1={cx} y1={cy - hh} x2={cx} y2={cy + hh} stroke={grid} strokeWidth="1" />
                        <polygon points={inner} fill="none" stroke={frame} strokeWidth="1" />
                        <polyline points={`${cx - w},${cy} ${cx},${cy - hh} ${cx + w},${cy}`} fill="none" stroke={hi} strokeWidth="1.1" />
                    </g>
                );
            })}

            {/* 바닥 플로어 — 1층 앞에 겹쳐(2:1 아이소 타원) */}
            <ellipse cx={cx} cy={floorY - 38} rx={188} ry={62} fill="url(#ls-floor)" />
            <ellipse cx={cx} cy={floorY - 38} rx={160} ry={52} fill="#b3bfd2" opacity="0.13" />

            {/* 좌·우 꼭지점을 관통하는 실선(연하게) */}
            <g stroke="#c7d0de" strokeWidth="1" opacity="0.32">
                <line x1={cx - w} y1={cyOf(0) - 8} x2={cx - w} y2={cyOf(n - 1) + 8} />
                <line x1={cx + w} y1={cyOf(0) - 8} x2={cx + w} y2={cyOf(n - 1) + 8} />
            </g>

            {/* 층 사이마다 6개의 상승 화살표(정적, 단일 톤) */}
            {gaps.map((lowIdx, g) => {
                const lowerCy = cyOf(lowIdx);
                const upperCy = cyOf(lowIdx - 1);
                const color = "#93a7c4";
                return [-72, -43, -14, 14, 43, 72].map((d, k) => {
                    const x = cx + d;
                    const fo = hh * (1 - Math.abs(d) / w); // 다이아몬드 앞 사선 정렬
                    // 두 플레이트 사이(중간)에만 짧게 — 플레이트에 닿지 않게
                    const cenY = (lowerCy + upperCy) / 2 + fo;
                    return (
                        <g key={`ar-${lowIdx}-${k}`}>
                            <line x1={x} y1={cenY + 7} x2={x} y2={cenY - 2} stroke={color} strokeWidth="2" strokeLinecap="round" />
                            <path d={`M${x - 4},${cenY - 2} L${x},${cenY - 9} L${x + 4},${cenY - 2}`} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    );
                });
            })}

            {/* 오른쪽 컬럼 헤딩 — XGEN 주요 역할 및 기능 */}
            <text x={fnX} y={cyOf(0) - 44} fontSize="16" fontWeight="800" fill="#2f6fe0" letterSpacing="0.01em">
                XGEN 주요 기능 및 역할
            </text>

            {/* 가운데 — 레이어 이름만, 플레이트와 점선 정렬 */}
            {LAYERS.map((l, i) => {
                const cy = cyOf(i);
                return (
                    <g key={`lb-${l.title}`}>
                        <line x1={labelX - 76} y1={cy + 4} x2={labelX - 42} y2={cy + 4} stroke="#9fb0c8" strokeWidth="1" strokeDasharray="3 4" />
                        <circle cx={labelX - 76} cy={cy + 4} r="2.5" fill="#8095b0" />
                        <circle cx={labelX - 42} cy={cy + 4} r="2.5" fill="#8095b0" />
                        <text x={labelX} y={cy - 10} fontSize="19" fontWeight="700" fill="#16213c">
                            {l.title}
                        </text>
                        <text x={labelX} y={cy + 9} fontSize="12.5" fill="#7c889b">
                            {l.desc[0]}
                        </text>
                        <text x={labelX} y={cy + 25} fontSize="12.5" fill="#7c889b">
                            {l.desc[1]}
                        </text>
                    </g>
                );
            })}

            {/* 오른쪽 — XGEN 기능(구성) + 역할 설명 */}
            {LAYERS.map((l, i) => {
                const cy = cyOf(i);
                return (
                    <g key={`fn-${i}`}>
                        <line x1={fnX - 72} y1={cy + 4} x2={fnX - 38} y2={cy + 4} stroke="#9fb0c8" strokeWidth="1" strokeDasharray="3 4" />
                        <circle cx={fnX - 72} cy={cy + 4} r="2.5" fill="#8095b0" />
                        <circle cx={fnX - 38} cy={cy + 4} r="2.5" fill="#8095b0" />
                        <text x={fnX} y={cy - 4} fontSize="19" fontWeight="700" fill="#16213c">
                            {l.feat[0]}
                        </text>
                        <text x={fnX} y={cy + 17} fontSize="13" fill="#5b6578">
                            {l.feat[1]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
