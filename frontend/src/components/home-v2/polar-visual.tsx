import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 4번 슬라이드 비주얼 — Polar(커머스 특화 Private sLLM).
 * 작동 방식을 움직이는 다이어그램으로 보여 준다:
 *   커머스 질의 4종 → Polar sLLM(질의 분석·생성·검증) ⇄ RAG(커머스 데이터) → 결과 4종
 * 레인(질의→결과)이 2초씩 차례로 켜지고, 연결선 위로 점선이 흐른다. 동작 줄이기 설정이면 정지.
 * 배경 사진은 /product/polar 히어로와 같은 사진(메인의 다른 곳에서는 쓰지 않음).
 */
export function PolarVisual({ locale }: { locale: Locale }) {
    const ko = locale === "ko";
    const lanes = ko
        ? [
              { inp: "시맨틱 검색", out: "의도 기반 결과" },
              { inp: "상품평 요약", out: "장단점 요약" },
              { inp: "맞춤 추천", out: "추천 TOP-N" },
              { inp: "고객 문의", out: "답변 초안" },
          ]
        : [
              { inp: "Semantic search", out: "Intent results" },
              { inp: "Review summary", out: "Pros & cons" },
              { inp: "Recommendation", out: "Top-N items" },
              { inp: "CS inquiry", out: "Reply draft" },
          ];
    const core = ko ? ["질의 분석", "답변 생성", "답변 검증"] : ["Query analysis", "Generation", "Answer check"];
    const rag = ko ? "RAG · 커머스 데이터" : "RAG · Commerce data";
    const ragSub = ko ? "상품 · 리뷰 · 주문 · 재고" : "Catalog · reviews · orders · stock";

    // viewBox 480×330 — 입력(좌) · 코어(중) · 출력(우), 코어 아래 RAG
    const ys = [70, 120, 170, 220];
    const coreL = 180, coreR = 300, coreMid = 145;
    const inR = 138, outL = 342;

    return (
        <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[#0b1224] sm:aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/polar/mk/hero-photo.webp"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
                />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,36,0.72),rgba(11,18,36,0.55))]" />

                <div className="absolute inset-x-[5%] top-[6%] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="redteam-pulse h-2 w-2 rounded-full bg-[#5fd0ff]" />
                        <span className="text-[12px] font-semibold tracking-wide text-white">POLAR sLLM</span>
                        <span className="hidden text-[11px] text-white/70 sm:inline">· {ko ? "작동 방식 · LLM + RAG" : "how it works · LLM + RAG"}</span>
                    </div>
                    <span className="rounded-full border border-white/25 bg-[#0b1224]/40 px-2 py-0.5 text-[10.5px] text-white/75">{ko ? "개념도" : "Concept diagram"}</span>
                </div>

                <svg
                    viewBox="0 0 480 330"
                    preserveAspectRatio="xMidYMid meet"
                    className="pd-svg absolute inset-x-[3%] top-[13%] h-[80%] w-[94%]"
                    role="img"
                    aria-label={
                        ko
                            ? "커머스 질의(시맨틱 검색, 상품평 요약, 맞춤 추천, 고객 문의)가 Polar sLLM에서 분석·생성·검증되고, RAG로 커머스 데이터를 참조해 결과로 이어지는 흐름"
                            : "Commerce queries flow into Polar sLLM for analysis, generation and checking, referencing commerce data via RAG, and come out as results"
                    }
                >
                    <defs>
                        <linearGradient id="pdCore" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#7c5cff" />
                            <stop offset="1" stopColor="#185aea" />
                        </linearGradient>
                    </defs>

                    {/* 연결선: 입력 → 코어, 코어 → 출력 */}
                    {ys.map((y, i) => (
                        <g key={`e${i}`} className="pd-lane" style={{ animationDelay: `${i * 2}s` }}>
                            <path d={`M${inR} ${y} C ${inR + 24} ${y}, ${coreL - 24} ${coreMid}, ${coreL} ${coreMid}`} className="pd-edge-base" />
                            <path d={`M${inR} ${y} C ${inR + 24} ${y}, ${coreL - 24} ${coreMid}, ${coreL} ${coreMid}`} className="pd-edge" />
                            <path d={`M${coreR} ${coreMid} C ${coreR + 24} ${coreMid}, ${outL - 24} ${y}, ${outL} ${y}`} className="pd-edge-base" />
                            <path d={`M${coreR} ${coreMid} C ${coreR + 24} ${coreMid}, ${outL - 24} ${y}, ${outL} ${y}`} className="pd-edge" />
                        </g>
                    ))}

                    {/* 코어 ⇄ RAG */}
                    <path d={`M225 ${coreMid + 48} L225 262`} className="pd-edge-base" />
                    <path d={`M225 ${coreMid + 48} L225 262`} className="pd-edge pd-edge-down" />
                    <path d={`M255 262 L255 ${coreMid + 48}`} className="pd-edge-base" />
                    <path d={`M255 262 L255 ${coreMid + 48}`} className="pd-edge pd-edge-up" />

                    {/* 입력 노드 */}
                    {lanes.map((l, i) => (
                        <g key={`i${i}`} className="pd-lane" style={{ animationDelay: `${i * 2}s` }}>
                            <rect x="12" y={ys[i] - 15} width={inR - 12} height="30" rx="8" className="pd-node" />
                            <text x={(12 + inR) / 2} y={ys[i] + 4} textAnchor="middle" className="pd-label">{l.inp}</text>
                        </g>
                    ))}

                    {/* 출력 노드 */}
                    {lanes.map((l, i) => (
                        <g key={`o${i}`} className="pd-lane" style={{ animationDelay: `${i * 2}s` }}>
                            <rect x={outL} y={ys[i] - 15} width={468 - outL} height="30" rx="8" className="pd-node pd-node-out" />
                            <text x={(outL + 468) / 2} y={ys[i] + 4} textAnchor="middle" className="pd-label pd-label-out">{l.out}</text>
                        </g>
                    ))}

                    {/* 코어: Polar sLLM */}
                    <g className="pd-core">
                        <rect x={coreL} y={coreMid - 48} width={coreR - coreL} height="96" rx="14" fill="url(#pdCore)" />
                        <text x={(coreL + coreR) / 2} y={coreMid - 22} textAnchor="middle" className="pd-core-title">Polar sLLM</text>
                        {core.map((c, i) => (
                            <text key={c} x={(coreL + coreR) / 2} y={coreMid + i * 17} textAnchor="middle" className="pd-core-step">
                                {`0${i + 1} ${c}`}
                            </text>
                        ))}
                    </g>

                    {/* RAG */}
                    <rect x="160" y="262" width="160" height="50" rx="10" className="pd-node pd-rag" />
                    <text x="240" y="283" textAnchor="middle" className="pd-label">{rag}</text>
                    <text x="240" y="300" textAnchor="middle" className="pd-sub">{ragSub}</text>
                </svg>

                <p className="absolute inset-x-[5%] bottom-[4%] flex items-center gap-1.5 text-[11px] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5fd0ff]" />
                    {ko ? "기업 데이터는 고객 인프라 안에서 처리합니다" : "Enterprise data is processed within your infrastructure"}
                </p>
            </div>
        </div>
    );
}
