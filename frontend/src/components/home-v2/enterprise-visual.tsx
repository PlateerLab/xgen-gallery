import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 1번 슬라이드 비주얼 — 기업 빌딩 사진 위에 Plateer AI Labs 허브와
 * 제품 5종(XGEN · X2BEE · XGEN TMS · Polar · Ontlas)을 연결선으로 겹친다. 연결선 위로 빛점이 흐르고
 * 제품 카드가 차례로 켜진다. 허브 아래에 온프레미스·망분리 지원 칩을 둔다.
 * 2번(빨간 스캔 + 목록 줄), 3번(콜아웃), 4번(라벤더 벤토)과 구분되는 「허브 네트워크」 모션이다.
 */
export function EnterpriseVisual({ locale, overlayImg, overlayAlt }: { locale: Locale; overlayImg: string; overlayAlt: string }) {
    const ko = locale === "ko";
    // x·y: 패널 안 카드 왼쪽 위 위치(%)
    const nodes = ko
        ? [
              { k: "XGEN", s: "기업형 에이전틱 AI 플랫폼", x: 4, y: 7 },
              { k: "X2BEE", s: "에이전틱 커머스 플랫폼", x: 64, y: 5 },
              { k: "XGEN TMS", s: "AI 기반 통합 테스트 관리 플랫폼", x: 66, y: 26 },
              { k: "Polar", s: "커머스 특화 sLLM", x: 66, y: 47 },
              { k: "Ontlas", s: "의미 계층 온톨로지 솔루션", x: 62, y: 68 },
          ]
        : [
              { k: "XGEN", s: "Enterprise agentic AI platform", x: 4, y: 7 },
              { k: "X2BEE", s: "Agentic commerce platform", x: 64, y: 5 },
              { k: "XGEN TMS", s: "AI test management platform", x: 66, y: 26 },
              { k: "Polar", s: "Commerce sLLM", x: 66, y: 47 },
              { k: "Ontlas", s: "Semantic-layer ontology", x: 62, y: 68 },
          ];
    const hub = { x: 40, y: 40 };
    const lines = nodes.map((n) => {
        const cx = n.x + 13;
        const cy = n.y + 6;
        const mx = (hub.x + cx) / 2;
        return `M ${hub.x} ${hub.y} Q ${mx} ${hub.y}, ${cx} ${cy}`;
    });

    return (
        <div className="relative">
            <div className="ent-visual relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#dbe7f7]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/intro/enterprise.webp" alt={ko ? "기업 업무 환경" : "Enterprise workplace"} className="ent-photo absolute inset-0 h-full w-full object-cover" />

                {/* 허브 → 제품 연결선 + 빛점 (sm 이상) */}
                <svg aria-hidden className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {lines.map((d, i) => (
                        <g key={i}>
                            <path d={d} fill="none" stroke="#185aea" strokeOpacity="0.3" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            <path d={d} fill="none" stroke="#00acee" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="ent-flow" pathLength={100} style={{ animationDelay: `${i * 0.8}s` }} />
                        </g>
                    ))}
                </svg>

                {/* 허브 — Plateer AI Labs */}
                <div
                    className="ent-node absolute hidden -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[linear-gradient(135deg,#00acee,#185aea)] px-4 py-3 text-center text-white shadow-[0_18px_40px_-14px_rgba(24,90,234,0.7)] sm:block"
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                >
                    <p className="text-[11px] font-medium text-white/80">{ko ? "엔터프라이즈 AI 연구" : "Enterprise AI research"}</p>
                    <p className="mt-0.5 whitespace-nowrap text-[15px] font-bold">Plateer AI Labs</p>
                    <p className="mt-1.5 whitespace-nowrap rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-semibold">
                        {ko ? "온프레미스 · 망분리 지원" : "On-prem · air-gapped"}
                    </p>
                </div>

                {/* 제품 카드 */}
                {nodes.map((n, i) => (
                    <div
                        key={n.k}
                        className="ent-node absolute hidden w-[30%] min-w-[150px] rounded-xl border border-white bg-white/90 px-3 py-2.5 shadow-[0_14px_34px_-16px_rgba(24,90,234,0.55)] backdrop-blur-[3px] sm:block"
                        style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${0.4 + i * 0.5}s` }}
                    >
                        <p className="flex items-center gap-1.5 text-[15px] font-bold leading-tight text-[var(--color-ink)]">
                            <span className="ent-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[#00acee]" style={{ animationDelay: `${i * 0.8}s` }} />
                            {n.k}
                        </p>
                        <p className="mt-0.5 text-[12px] font-medium leading-snug text-[#185aea]">{n.s}</p>
                    </div>
                ))}

                {/* 모바일: 제품을 칩으로 */}
                <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5 sm:hidden">
                    {nodes.map((n) => (
                        <span key={`m-${n.k}`} className="rounded-full border border-white bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)]">
                            {n.k}
                        </span>
                    ))}
                    <span className="rounded-full bg-[#185aea] px-2.5 py-1 text-[11px] font-semibold text-white">{ko ? "온프레미스 · 망분리" : "On-prem · air-gapped"}</span>
                </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={overlayImg}
                alt={overlayAlt}
                className="absolute -bottom-6 -left-4 w-[52%] rounded-xl border border-white bg-white shadow-[0_24px_60px_-20px_rgba(11,18,36,0.5)] sm:-left-8"
            />
        </div>
    );
}
