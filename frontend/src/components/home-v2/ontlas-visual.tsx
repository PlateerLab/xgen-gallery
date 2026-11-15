import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 마지막 슬라이드 비주얼 — Ontlas(의미 계층 온톨로지 솔루션).
 * 다른 슬라이드와 겹치지 않는 패턴: 밝은 틸 톤 바탕의 "도메인 전환 개념 그래프".
 *   커머스 → 제조 → 금융 도메인 탭이 4초씩 차례로 켜지고, 같은 자리의 개념 그래프가
 *   해당 도메인의 개념·관계로 바뀐다(12초 주기). 아래에는 원천 데이터(파일·DB·문서)와
 *   그 위의 의미 계층, 질의 방식 칩. 동작 줄이기 설정이면 첫 도메인 그래프로 정지.
 */

type Domain = { tab: string; nodes: [string, string, string, string, string]; rels: [string, string, string, string, string] };

// 노드 좌표: 0=중심, 1=왼쪽 위, 2=오른쪽 위, 3=왼쪽 아래, 4=오른쪽 아래
const POS: [number, number][] = [
    [260, 150],
    [92, 66],
    [428, 66],
    [92, 234],
    [428, 234],
];
// 간선: [from, to] — rels 순서와 같다
const EDGES: [number, number][] = [
    [1, 0],
    [0, 2],
    [0, 3],
    [0, 4],
    [2, 4],
];

export function OntlasVisual({ locale }: { locale: Locale }) {
    const ko = locale === "ko";
    const domains: Domain[] = ko
        ? [
              { tab: "커머스", nodes: ["주문", "고객", "상품", "배송", "재고"], rels: ["주문함", "포함", "배송", "차감", "보유 수량"] },
              { tab: "제조", nodes: ["로트", "설비", "품목", "검사", "부품"], rels: ["생산", "제품", "검사", "투입", "BOM"] },
              { tab: "금융", nodes: ["계약", "고객", "상품", "심사", "규정"], rels: ["체결", "대상", "심사", "준수", "적용"] },
          ]
        : [
              { tab: "Commerce", nodes: ["Order", "Customer", "Product", "Shipment", "Stock"], rels: ["places", "contains", "ships", "reduces", "on hand"] },
              { tab: "Manufacturing", nodes: ["Lot", "Machine", "Item", "Inspection", "Part"], rels: ["produces", "of item", "inspected", "consumes", "BOM"] },
              { tab: "Finance", nodes: ["Contract", "Customer", "Product", "Review", "Policy"], rels: ["signs", "covers", "reviewed", "complies", "applies"] },
          ];

    return (
        <div className="relative">
            <style>{`
                .ov-g{opacity:0;animation:ov-cycle 12s infinite}
                .ov-tab{animation:ov-tab 12s infinite}
                @keyframes ov-cycle{0%{opacity:0}3%,30%{opacity:1}34%,100%{opacity:0}}
                @keyframes ov-tab{0%{background:transparent;color:#0f766e}3%,30%{background:#0f766e;color:#fff}34%,100%{background:transparent;color:#0f766e}}
                .ov-edge{stroke-dasharray:5 5;animation:ov-flow 1.4s linear infinite}
                @keyframes ov-flow{to{stroke-dashoffset:-20}}
                .ov-ring{transform-origin:260px 150px;animation:ov-ring 2.4s ease-out infinite}
                @keyframes ov-ring{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.7);opacity:0}}
                .ov-layer{animation:ov-layer 3s ease-in-out infinite}
                .ov-photo{animation:ov-photo 20s ease-in-out infinite alternate}
                @keyframes ov-photo{from{transform:scale(1.04)}to{transform:scale(1.12)}}
                @keyframes ov-layer{0%,100%{opacity:.55}50%{opacity:1}}
                @media (prefers-reduced-motion:reduce){
                    .ov-g,.ov-tab,.ov-edge,.ov-ring,.ov-layer,.ov-photo{animation:none}
                    .ov-g:first-of-type{opacity:1}
                    .ov-tab:first-child{background:#0f766e;color:#fff}
                }
            `}</style>
            <div className="relative overflow-hidden rounded-[24px] bg-[#e6f6f3] p-5 ring-1 ring-[#cdeae4] sm:p-7">
                {/* 배경 실사(노드·연결 로프 망, CC0) + 반투명 밝은 레이어 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/intro/ontlas-bg.webp"
                    alt=""
                    aria-hidden
                    className="ov-photo pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(240,251,248,0.78)_0%,rgba(230,246,243,0.42)_50%,rgba(244,248,255,0.7)_100%)]"
                />
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#0f766e]" />
                        <span className="text-[12px] font-bold tracking-wide text-[#0b1224]">ONTLAS</span>
                        <span className="hidden text-[11px] text-[#4b5563] sm:inline">· {ko ? "도메인 온톨로지" : "domain ontology"}</span>
                    </div>
                    <div className="flex gap-1 rounded-full border border-[#bfe3dc] bg-white/80 p-1" aria-hidden>
                        {domains.map((d, i) => (
                            <span key={d.tab} className="ov-tab rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold" style={{ animationDelay: `${i * 4}s` }}>
                                {d.tab}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 도메인별 개념 그래프 — 같은 자리에서 교차 */}
                <div className="relative mt-4 rounded-[16px] border border-[#cdeae4] bg-white/65 backdrop-blur-[2px] shadow-[0_18px_40px_-26px_rgba(11,18,36,0.45)]">
                    <svg
                        viewBox="0 0 520 300"
                        className="block h-auto w-full"
                        role="img"
                        aria-label={
                            ko
                                ? "커머스·제조·금융 도메인별 업무 개념과 관계를 보여 주는 온톨로지 개념도"
                                : "Concept diagram of business concepts and relationships for commerce, manufacturing, and finance"
                        }
                    >
                        <circle className="ov-ring" cx={260} cy={150} r={36} fill="none" stroke="#14b8a6" strokeWidth={2} />
                        {domains.map((d, di) => (
                            <g key={d.tab} className="ov-g" style={{ animationDelay: `${di * 4}s` }}>
                                {EDGES.map(([a, b], ei) => {
                                    const [x1, y1] = POS[a];
                                    const [x2, y2] = POS[b];
                                    const mx = (x1 + x2) / 2;
                                    const my = (y1 + y2) / 2;
                                    const w = d.rels[ei].length * (ko ? 12 : 6.6) + 14;
                                    return (
                                        <g key={ei}>
                                            <line className="ov-edge" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5eb8ab" strokeWidth={1.6} />
                                            <rect x={mx - w / 2} y={my - 10} width={w} height={20} rx={10} fill="#ffffff" stroke="#bfe3dc" />
                                            <text x={mx} y={my + 4} textAnchor="middle" fontSize={11} fill="#0f766e">
                                                {d.rels[ei]}
                                            </text>
                                        </g>
                                    );
                                })}
                                {POS.map(([x, y], ni) =>
                                    ni === 0 ? (
                                        <g key={ni}>
                                            <circle cx={x} cy={y} r={36} fill="url(#ovHub)" />
                                            <text x={x} y={y + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="#ffffff">
                                                {d.nodes[0]}
                                            </text>
                                        </g>
                                    ) : (
                                        <g key={ni}>
                                            <rect x={x - 52} y={y - 18} width={104} height={36} rx={18} fill="#ffffff" stroke="#14b8a6" strokeWidth={1.5} />
                                            <text x={x} y={y + 5} textAnchor="middle" fontSize={13.5} fontWeight={600} fill="#0b1224">
                                                {d.nodes[ni]}
                                            </text>
                                        </g>
                                    ),
                                )}
                            </g>
                        ))}
                        <defs>
                            <linearGradient id="ovHub" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#14b8a6" />
                                <stop offset="100%" stopColor="#185aea" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* 의미 계층 ↔ 원천 데이터 */}
                <div className="relative mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-stretch">
                    <div className="ov-layer flex items-center justify-between gap-3 rounded-[12px] border border-dashed border-[#5eb8ab] bg-white/70 px-3 py-2">
                        <span className="text-[12.5px] font-bold text-[#0f766e]">{ko ? "의미 계층" : "Semantic layer"}</span>
                        <span className="flex flex-wrap justify-end gap-1.5">
                            {(ko ? ["파일", "DB", "문서"] : ["Files", "DB", "Docs"]).map((s) => (
                                <span key={s} className="rounded-md bg-[#e6f6f3] px-2 py-0.5 text-[11.5px] text-[#134e4a]">
                                    {s}
                                </span>
                            ))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-[12px] border border-[#d9e4fb] bg-white/80 px-3 py-2">
                        {["SQL", "Cypher", "SPARQL", "MCP"].map((q) => (
                            <span key={q} className="rounded-full bg-[#eef3ff] px-2 py-0.5 text-[11px] font-semibold text-[#185aea]">
                                {q}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="relative mt-3 text-[11.5px] text-[#4b5563]">
                    {ko ? "개념도 · 도메인과 개념 구성은 예시입니다" : "Concept diagram · domains and concepts are examples"}
                </p>
            </div>
        </div>
    );
}
