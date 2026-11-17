import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 마지막 슬라이드 비주얼 — Ontlas(의미 계층 온톨로지 솔루션).
 * 다른 슬라이드와 겹치지 않는 패턴: 딥그린 다크 바탕의 "도메인 전환 개념 그래프"(다크 스킨).
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
                @keyframes ov-tab{0%{background:transparent;color:#9fe4ff}3%,30%{background:#185aea;color:#ffffff}34%,100%{background:transparent;color:#9fe4ff}}
                .ov-edge{stroke-dasharray:5 5;animation:ov-flow 1.4s linear infinite}
                @keyframes ov-flow{to{stroke-dashoffset:-20}}
                .ov-ring{transform-origin:260px 150px;animation:ov-ring 2.4s ease-out infinite}
                @keyframes ov-ring{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.7);opacity:0}}
                .ov-layer{animation:ov-layer 3s ease-in-out infinite}
                .ov-photo{animation:ov-photo 20s ease-in-out infinite alternate}
                @keyframes ov-photo{from{transform:scale(1.04)}to{transform:scale(1.12)}}
                @keyframes ov-layer{0%,100%{opacity:.55}50%{opacity:1}}
                .ov-mesh{animation:ov-drift 24s ease-in-out infinite alternate}
                @keyframes ov-drift{from{transform:translate(-1.5%,-1%) scale(1.04)}to{transform:translate(1.5%,1%) scale(1.08)}}
                .ov-tw{animation:ov-tw 4s ease-in-out infinite}
                @keyframes ov-tw{0%,100%{fill-opacity:.35}50%{fill-opacity:1}}
                .ov-sweep{animation:ov-sweep 9s ease-in-out infinite}
                @keyframes ov-sweep{0%{transform:translateX(0)}60%,100%{transform:translateX(400%)}}
                @media (prefers-reduced-motion:reduce){
                    .ov-g,.ov-tab,.ov-edge,.ov-ring,.ov-layer,.ov-photo,.ov-mesh,.ov-tw,.ov-sweep{animation:none}
                    .ov-g:first-of-type{opacity:1}
                    .ov-tab:first-child{background:#185aea;color:#ffffff}
                }
            `}</style>
            <div className="relative overflow-hidden rounded-[24px] bg-[#0b1224] p-5 ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(24,90,234,0.4)] sm:p-7">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_18%_12%,rgba(24,90,234,0.38),transparent_70%),radial-gradient(50%_45%_at_88%_92%,rgba(95,208,255,0.20),transparent_70%),radial-gradient(70%_60%_at_50%_50%,rgba(19,37,79,0.55),transparent_80%)]" />
                    <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(159,228,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(75%_70%_at_50%_45%,#000_20%,transparent_85%)]" />
                    <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" className="ov-mesh absolute inset-0 h-full w-full">
                        <g stroke="#5fd0ff" strokeOpacity={0.16} strokeWidth={1}><line x1="198" y1="75" x2="171" y2="189"/><line x1="198" y1="75" x2="238" y2="182"/><line x1="388" y1="41" x2="328" y2="37"/><line x1="388" y1="41" x2="433" y2="134"/><line x1="321" y1="167" x2="381" y2="170"/><line x1="321" y1="167" x2="328" y2="37"/><line x1="321" y1="167" x2="238" y2="182"/><line x1="44" y1="228" x2="115" y2="260"/><line x1="44" y1="228" x2="33" y2="297"/><line x1="44" y1="228" x2="69" y2="166"/><line x1="51" y1="49" x2="82" y2="106"/><line x1="51" y1="49" x2="69" y2="166"/><line x1="256" y1="366" x2="189" y2="361"/><line x1="256" y1="366" x2="315" y2="386"/><line x1="256" y1="366" x2="285" y2="296"/><line x1="82" y1="106" x2="69" y2="166"/><line x1="374" y1="418" x2="315" y2="386"/><line x1="374" y1="418" x2="389" y2="354"/><line x1="576" y1="30" x2="508" y2="135"/><line x1="576" y1="30" x2="491" y2="79"/><line x1="508" y1="135" x2="433" y2="134"/><line x1="508" y1="135" x2="491" y2="79"/><line x1="508" y1="135" x2="565" y2="202"/><line x1="508" y1="135" x2="497" y2="216"/><line x1="189" y1="361" x2="107" y2="342"/><line x1="115" y1="260" x2="192" y2="262"/><line x1="115" y1="260" x2="107" y2="342"/><line x1="381" y1="170" x2="433" y2="134"/><line x1="192" y1="262" x2="171" y2="189"/><line x1="471" y1="311" x2="413" y2="266"/><line x1="471" y1="311" x2="563" y2="307"/><line x1="471" y1="311" x2="517" y2="353"/><line x1="315" y1="386" x2="285" y2="296"/><line x1="315" y1="386" x2="389" y2="354"/><line x1="433" y1="134" x2="491" y2="79"/><line x1="33" y1="297" x2="25" y2="386"/><line x1="33" y1="297" x2="107" y2="342"/><line x1="413" y1="266" x2="389" y2="354"/><line x1="497" y1="416" x2="517" y2="353"/><line x1="497" y1="416" x2="553" y2="435"/><line x1="171" y1="189" x2="238" y2="182"/><line x1="563" y1="307" x2="517" y2="353"/><line x1="517" y1="353" x2="553" y2="435"/><line x1="25" y1="386" x2="107" y2="342"/><line x1="565" y1="202" x2="497" y2="216"/></g>
                        <g fill="#9fe4ff" fillOpacity={0.55}><circle cx="198" cy="75" r="2.6" className="ov-tw" style={{animationDelay:"0s"}}/><circle cx="388" cy="41" r="1.6"/><circle cx="321" cy="167" r="1.6"/><circle cx="44" cy="228" r="1.6"/><circle cx="51" cy="49" r="1.6"/><circle cx="256" cy="366" r="2.6" className="ov-tw" style={{animationDelay:"5s"}}/><circle cx="82" cy="106" r="1.6"/><circle cx="374" cy="418" r="1.6"/><circle cx="576" cy="30" r="1.6"/><circle cx="508" cy="135" r="1.6"/><circle cx="189" cy="361" r="2.6" className="ov-tw" style={{animationDelay:"3s"}}/><circle cx="115" cy="260" r="1.6"/><circle cx="381" cy="170" r="1.6"/><circle cx="328" cy="37" r="1.6"/><circle cx="192" cy="262" r="1.6"/><circle cx="471" cy="311" r="2.6" className="ov-tw" style={{animationDelay:"1s"}}/><circle cx="315" cy="386" r="1.6"/><circle cx="433" cy="134" r="1.6"/><circle cx="33" cy="297" r="1.6"/><circle cx="413" cy="266" r="1.6"/><circle cx="497" cy="416" r="2.6" className="ov-tw" style={{animationDelay:"6s"}}/><circle cx="285" cy="296" r="1.6"/><circle cx="171" cy="189" r="1.6"/><circle cx="563" cy="307" r="1.6"/><circle cx="517" cy="353" r="1.6"/><circle cx="238" cy="182" r="2.6" className="ov-tw" style={{animationDelay:"4s"}}/><circle cx="69" cy="166" r="1.6"/><circle cx="25" cy="386" r="1.6"/><circle cx="491" cy="79" r="1.6"/><circle cx="107" cy="342" r="1.6"/><circle cx="565" cy="202" r="2.6" className="ov-tw" style={{animationDelay:"2s"}}/><circle cx="553" cy="435" r="1.6"/><circle cx="497" cy="216" r="1.6"/><circle cx="389" cy="354" r="1.6"/></g>
                    </svg>
                    <div className="ov-sweep absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(100deg,transparent,rgba(159,228,255,0.07),transparent)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,36,0.25)_0%,transparent_35%,transparent_70%,rgba(11,18,36,0.55)_100%)]" />
                </div>
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#5fd0ff]" />
                        <span className="text-[12px] font-bold tracking-wide text-white">ONTLAS</span>
                        <span className="hidden text-[11px] text-white/65 sm:inline">· {ko ? "도메인 온톨로지" : "domain ontology"}</span>
                    </div>
                    <div className="flex gap-1 rounded-full border border-white/15 bg-[#0b1224]/70 p-1 backdrop-blur-md" aria-hidden>
                        {domains.map((d, i) => (
                            <span key={d.tab} className="ov-tab rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold" style={{ animationDelay: `${i * 4}s` }}>
                                {d.tab}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 도메인별 개념 그래프 — 같은 자리에서 교차 */}
                <div className="relative mt-4 rounded-[16px] border border-white/12 bg-[#0b1224]/55 backdrop-blur-md shadow-[0_18px_40px_-26px_rgba(0,0,0,0.8)]">
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
                        <circle className="ov-ring" cx={260} cy={150} r={36} fill="none" stroke="#5fd0ff" strokeWidth={2} />
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
                                            <line className="ov-edge" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5fd0ff" strokeOpacity={0.55} strokeWidth={1.6} />
                                            <rect x={mx - w / 2} y={my - 10} width={w} height={20} rx={10} fill="#0f1d3a" stroke="rgba(95,208,255,0.45)" />
                                            <text x={mx} y={my + 4} textAnchor="middle" fontSize={11} fill="#9fe4ff">
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
                                            <rect x={x - 52} y={y - 18} width={104} height={36} rx={18} fill="#111c36" stroke="#5fd0ff" strokeWidth={1.5} />
                                            <text x={x} y={y + 5} textAnchor="middle" fontSize={13.5} fontWeight={600} fill="#ffffff">
                                                {d.nodes[ni]}
                                            </text>
                                        </g>
                                    ),
                                )}
                            </g>
                        ))}
                        <defs>
                            <linearGradient id="ovHub" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#5fd0ff" />
                                <stop offset="100%" stopColor="#185aea" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* 의미 계층 ↔ 원천 데이터 */}
                <div className="relative mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-stretch">
                    <div className="ov-layer flex items-center justify-between gap-3 rounded-[12px] border border-dashed border-[#5fd0ff]/60 bg-[#0b1224]/60 px-3 py-2 backdrop-blur-md">
                        <span className="text-[12.5px] font-bold text-[#9fe4ff]">{ko ? "의미 계층" : "Semantic layer"}</span>
                        <span className="flex flex-wrap justify-end gap-1.5">
                            {(ko ? ["파일", "DB", "문서"] : ["Files", "DB", "Docs"]).map((s) => (
                                <span key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-[11.5px] text-white/85">
                                    {s}
                                </span>
                            ))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-[12px] border border-white/12 bg-[#0b1224]/60 px-3 py-2 backdrop-blur-md">
                        {["SQL", "Cypher", "SPARQL", "MCP"].map((q) => (
                            <span key={q} className="rounded-full bg-[#5fd0ff]/15 px-2 py-0.5 text-[11px] font-semibold text-[#9fe4ff]">
                                {q}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="relative mt-3 text-[11.5px] text-white/55">
                    {ko ? "개념도 · 도메인과 개념 구성은 예시입니다" : "Concept diagram · domains and concepts are examples"}
                </p>
            </div>
        </div>
    );
}
