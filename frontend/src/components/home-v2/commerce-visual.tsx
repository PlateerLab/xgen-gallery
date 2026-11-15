import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 3번 슬라이드 비주얼 — 모바일 쇼핑 화면 사진 한 장을 배경으로 쓰고,
 * 화면의 각 부분을 짚는 콜아웃(핫스폿)으로 커머스 에이전트 기능을 보여 준다.
 * 2·4번 슬라이드의 「목록 줄」 패턴과 다르게, 사진 위 지점을 선으로 가리키는 형식이다.
 * 콜아웃은 동작 방식을 설명하는 예시다(「예시 화면」 표기).
 */
type Spot = { n: string; title: string; sub: string; side: "l" | "r"; top: number; hx: number; hy: number };

export function CommerceVisual({ locale }: { locale: Locale }) {
    const ko = locale === "ko";
    // hx·hy: 사진 안 지점(%), top: 콜아웃 세로 위치(%)
    const spots: Spot[] = ko
        ? [
              { n: "01", title: "말로 찾는 상품 검색", sub: "쇼핑 에이전트", side: "l", top: 14, hx: 41, hy: 26 },
              { n: "02", title: "고객별 맞춤 추천", sub: "쇼핑 에이전트", side: "l", top: 50, hx: 40, hy: 47 },
              { n: "03", title: "문의 답변 초안", sub: "상담 에이전트", side: "r", top: 22, hx: 66, hy: 34 },
              { n: "04", title: "장바구니·주문서 연결", sub: "쇼핑 에이전트", side: "r", top: 58, hx: 59, hy: 61 },
          ]
        : [
              { n: "01", title: "Search by describing it", sub: "Shopping agent", side: "l", top: 14, hx: 41, hy: 26 },
              { n: "02", title: "Personal recommendations", sub: "Shopping agent", side: "l", top: 50, hx: 40, hy: 47 },
              { n: "03", title: "Drafted replies", sub: "Service agent", side: "r", top: 22, hx: 66, hy: 34 },
              { n: "04", title: "Cart and checkout", sub: "Shopping agent", side: "r", top: 58, hx: 59, hy: 61 },
          ];

    return (
        <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[#0b1224] sm:aspect-[4/3]">
                <img
                    src="/polar/mk/uc-shop.webp"
                    alt={ko ? "모바일 쇼핑 앱의 맞춤 추천 화면" : "Personalized recommendations in a mobile shopping app"}
                    className="cm-photo absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                />
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_52%_50%,transparent_40%,rgba(11,18,36,0.12)_100%)]" />

                {/* 연결선과 지점 (sm 이상) */}
                <svg aria-hidden className="absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {spots.map((s) => {
                        const cy = s.top + 5;
                        const x1 = s.side === "l" ? 29 : 71;
                        return (
                            <path
                                key={s.n}
                                d={`M ${x1} ${cy} L ${s.hx} ${s.hy}`}
                                stroke="#00acee"
                                strokeWidth="1.25"
                                strokeDasharray="3 3"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                className="redteam-row"
                            />
                        );
                    })}
                </svg>
                {spots.map((s, i) => (
                    <span
                        key={`dot-${s.n}`}
                        aria-hidden
                        className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
                        style={{ left: `${s.hx}%`, top: `${s.hy}%` }}
                    >
                        <span className="block h-3 w-3 animate-pulse motion-reduce:animate-none rounded-full border-2 border-white bg-[#00acee] shadow-[0_0_0_4px_rgba(0,172,238,0.25)]" style={{ animationDelay: `${i * 0.4}s` }} />
                    </span>
                ))}

                {/* 콜아웃 (sm 이상) */}
                {spots.map((s, i) => (
                    <div
                        key={`c-${s.n}`}
                        className={`redteam-row absolute hidden w-[25%] min-w-[150px] rounded-xl border border-white bg-white/92 px-3 py-2.5 shadow-[0_14px_32px_-14px_rgba(11,18,36,0.5)] backdrop-blur-[3px] cm-float sm:block ${s.side === "l" ? "left-[4%]" : "right-[4%]"}`}
                        style={{ top: `${s.top}%`, animationDelay: `${i * 0.5}s, ${i * 0.5 + 0.6}s` }}
                    >
                        <p className="text-[11px] font-semibold text-[#00acee]">
                            {s.n} · {s.sub}
                        </p>
                        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[var(--color-ink)]">{s.title}</p>
                    </div>
                ))}

                <span className="absolute right-[4%] top-[4%] rounded-full border border-white/40 bg-[#0b1224]/45 px-2 py-0.5 text-[10.5px] text-white/85">
                    {ko ? "예시 화면" : "Illustrative"}
                </span>

                {/* 하단 설명 (sm 이상) */}
                <p className="absolute bottom-[5%] left-[4%] hidden items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[11.5px] text-[var(--color-ink)] shadow-sm backdrop-blur-[3px] sm:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5fd0ff]" />
                    {ko ? "에이전트가 초안을 만들고, 사람이 확정합니다" : "Agents draft, people confirm"}
                </p>

                {/* 모바일: 콜아웃을 아래쪽 2×2로 */}
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(11,18,36,0.85)_35%)] px-3 pb-3 pt-10 sm:hidden">
                    <ul className="grid grid-cols-2 gap-1.5">
                        {spots.map((s) => (
                            <li key={`m-${s.n}`} className="rounded-lg border border-white/15 bg-[#0b1224]/60 px-2.5 py-1.5">
                                <p className="text-[10.5px] font-semibold text-[#5fd0ff]">{s.n}</p>
                                <p className="text-[12px] font-semibold leading-snug text-white">{s.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
