import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 3번 슬라이드 비주얼 — XGEN(기업형 에이전틱 AI 플랫폼).
 * 다른 슬라이드와 겹치지 않는 패턴: 밝은 바탕의 "4단 플랫폼 레이어 스택" + 실제 제품 화면 교차.
 *   만들기 → 연결하기 → 통제하기 → 운영하기 레이어가 3초씩 차례로 켜지고,
 *   오른쪽 위 제품 화면이 켜진 레이어의 실제 화면으로 바뀐다(12초 주기). 동작 줄이기 설정이면 정지.
 */
export function XgenVisual({ locale }: { locale: Locale }) {
    const ko = locale === "ko";
    const layers = ko
        ? [
              { no: "01", name: "만들기", chips: ["노드 캔버스", "Vibe Coding", "EasyMode"], img: "/product/screen-canvas.png" },
              { no: "02", name: "연결하기", chips: ["RAG·온톨로지", "MCP·API"], img: "/product/screen-api-tool.png" },
              { no: "03", name: "통제하기", chips: ["결재선", "위험도 심사", "감사 로그"], img: "/product/governance-approval-line.png" },
              { no: "04", name: "운영하기", chips: ["배포", "모니터링", "Geny"], img: "/product/operations-dashboard.png" },
          ]
        : [
              { no: "01", name: "Build", chips: ["Node canvas", "Vibe Coding", "EasyMode"], img: "/product/screen-canvas.png" },
              { no: "02", name: "Connect", chips: ["RAG·ontology", "MCP·API"], img: "/product/screen-api-tool.png" },
              { no: "03", name: "Govern", chips: ["Approval routes", "Risk review", "Audit log"], img: "/product/governance-approval-line.png" },
              { no: "04", name: "Operate", chips: ["Deploy", "Monitoring", "Geny"], img: "/product/operations-dashboard.png" },
          ];

    return (
        <div className="relative">
            <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#f4f8ff_0%,#eaf1ff_55%,#f7f8fa_100%)] p-5 ring-1 ring-[#d9e4fb] sm:p-7">
                {/* 옅은 격자 */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(24,90,234,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(24,90,234,0.06)_1px,transparent_1px)] [background-size:24px_24px]"
                />
                <div className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="xv-pulse h-2 w-2 rounded-full bg-[#185aea]" />
                        <span className="text-[12px] font-bold tracking-wide text-[#0b1224]">XGEN PLATFORM</span>
                        <span className="hidden text-[11px] text-[#4b5563] sm:inline">· {ko ? "Agent·App 생명주기" : "agent & app lifecycle"}</span>
                    </div>
                    <span className="rounded-full border border-[#c9d6f2] bg-white/70 px-2 py-0.5 text-[10.5px] text-[#4b5563]">{ko ? "실제 제품 화면" : "Product screens"}</span>
                </div>

                {/* 제품 화면 — 켜진 레이어와 같은 시점에 교차 */}
                <div className="relative mt-4 aspect-[16/8] overflow-hidden rounded-[14px] border border-[#d9e4fb] bg-white shadow-[0_18px_40px_-24px_rgba(11,18,36,0.45)]">
                    <div className="flex h-6 items-center gap-1.5 border-b border-[#e5ebf7] bg-[#f7f9fd] px-3">
                        <span className="h-2 w-2 rounded-full bg-[#e5e7eb]" />
                        <span className="h-2 w-2 rounded-full bg-[#e5e7eb]" />
                        <span className="h-2 w-2 rounded-full bg-[#e5e7eb]" />
                    </div>
                    <div className="relative h-[calc(100%-24px)]">
                        {layers.map((l, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={l.no}
                                src={l.img}
                                alt=""
                                aria-hidden
                                loading="lazy"
                                className="xv-shot absolute inset-0 h-full w-full object-cover object-left-top"
                                style={{ animationDelay: `${i * 3}s` }}
                            />
                        ))}
                    </div>
                </div>

                {/* 4단 레이어 스택 */}
                <ol className="relative mt-4 space-y-2" aria-label={ko ? "XGEN 플랫폼 레이어" : "XGEN platform layers"}>
                    {layers.map((l, i) => (
                        <li
                            key={l.no}
                            className="xv-layer flex items-center gap-3 rounded-[12px] border border-[#d9e4fb] bg-white/80 px-3 py-2 sm:px-4"
                            style={{ animationDelay: `${i * 3}s` }}
                        >
                            <span className="xv-no flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#eef3ff] text-[11px] font-bold text-[#185aea]">{l.no}</span>
                            <span className="w-[68px] flex-none text-[14px] font-bold text-[#0b1224]">{l.name}</span>
                            <span className="flex min-w-0 flex-wrap gap-1.5">
                                {l.chips.map((c) => (
                                    <span key={c} className="rounded-full bg-[#f3f6fc] px-2 py-0.5 text-[11.5px] text-[#374151]">
                                        {c}
                                    </span>
                                ))}
                            </span>
                        </li>
                    ))}
                </ol>
                <p className="relative mt-3 text-[11.5px] text-[#4b5563]">
                    {ko ? "원하는 LLM · 고객 인프라 · 온프레미스와 망분리 환경" : "Your choice of LLM · your infrastructure · on-prem and air-gapped"}
                </p>
            </div>
        </div>
    );
}
