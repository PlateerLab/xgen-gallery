import { ArrowDown } from "lucide-react";

/**
 * "기존 방식 대비, 무엇이 달라지는가" — 카페24 유튜브 쇼핑 「이렇게 활용해보세요!」
 * (mCardIntro) 패턴: 어두운 섹션 + 가운데 제목 + 큰 컬러 카드가 스크롤하면
 * 앞 카드 위로 겹쳐 쌓인다(sticky stack). 카드 = 왼쪽 번호·제목·성과, 오른쪽 기존→XGEN.
 * 1024px 미만에서는 겹침 없이 세로로 나열한다.
 */
export type CompareItem = { title: string; before: string; after: string; effect: string };

const THEMES = [
    { card: "bg-[#185aea] text-white", num: "bg-white text-[#185aea]", panel: "bg-white/12 ring-white/20", sub: "text-white/75", tag: "bg-white text-[#185aea]" },
    { card: "bg-[#0b1f4d] text-white ring-1 ring-white/10", num: "bg-white text-[#0b1f4d]", panel: "bg-white/10 ring-white/15", sub: "text-white/70", tag: "bg-[#00acee] text-white" },
    { card: "bg-[#0089c4] text-white", num: "bg-white text-[#0089c4]", panel: "bg-white/14 ring-white/25", sub: "text-white/80", tag: "bg-white text-[#0089c4]" },
    { card: "bg-[#e6efff] text-[var(--color-ink)]", num: "bg-[#0b1224] text-white", panel: "bg-white ring-[#c9d8f5]", sub: "text-[var(--color-ink-muted)]", tag: "bg-[#185aea] text-white" },
];

export function CompareStack({
    items,
    title,
    lead,
    labelBefore,
    labelEffect,
}: {
    items: CompareItem[];
    title: string;
    lead: string;
    labelBefore: string;
    labelEffect: string;
}) {
    return (
        <section
            id="compare"
            data-nav-theme="dark"
            className="relative scroll-mt-[calc(var(--nav-h,84px)+58px)] bg-[linear-gradient(180deg,#070b1c_0%,#070b1c_48%,#0d2a6b_100%)] text-white"
        >
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pb-32">
                <div className="text-center">
                    <h2 className="text-[28px] font-bold leading-tight tracking-tight md:text-[40px] md:leading-[1.3]">
                        {title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-white/70 md:text-[18px]">
                        {lead}
                    </p>
                </div>

                <div className="mt-12 flex flex-col gap-5 lg:mt-20 lg:gap-0">
                    {items.map((o, i) => {
                        const t = THEMES[i % THEMES.length];
                        return (
                            <article
                                key={o.title}
                                style={{ ["--stack-i" as string]: i }}
                                className={`cmp-stack-card relative overflow-hidden rounded-[20px] p-7 md:p-10 lg:sticky lg:mb-[28vh] lg:flex lg:min-h-[470px] lg:items-center lg:gap-14 lg:p-[56px_64px] last:lg:mb-0 ${t.card}`}
                            >
                                {/* 왼쪽 — 번호 · 제목 · 성과 */}
                                <div className="lg:w-[46%] lg:flex-none">
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-full text-[16px] font-bold md:h-[50px] md:w-[50px] md:text-[20px] ${t.num}`}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-4 text-[24px] font-bold leading-snug tracking-tight [word-break:keep-all] md:text-[34px] lg:text-[40px] lg:leading-[1.35]">
                                        {o.title}
                                    </h3>
                                    <p className={`mt-4 flex flex-wrap items-center gap-2 text-[15px] leading-relaxed md:text-[18px] ${t.sub}`}>
                                        <span className={`inline-flex flex-none items-center rounded-full px-2.5 py-0.5 text-[12px] font-bold ${t.tag}`}>
                                            {labelEffect}
                                        </span>
                                        <span className="[word-break:keep-all]">{o.effect}</span>
                                    </p>
                                </div>

                                {/* 오른쪽 — 기존 → XGEN */}
                                <div className="mt-7 flex flex-1 flex-col items-stretch gap-3 lg:mt-0">
                                    <div className={`rounded-2xl px-5 py-4 ring-1 ${t.panel} opacity-80`}>
                                        <span className={`text-[12px] font-bold uppercase tracking-wide ${t.sub}`}>{labelBefore}</span>
                                        <p className={`mt-1 text-[14.5px] leading-relaxed md:text-[15.5px] ${t.sub}`}>{o.before}</p>
                                    </div>
                                    <ArrowDown className={`mx-auto h-5 w-5 flex-none ${t.sub}`} aria-hidden />
                                    <div className={`rounded-2xl px-5 py-5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] ring-1 ${t.panel}`}>
                                        <span className="text-[12px] font-bold uppercase tracking-wide">XGEN</span>
                                        <p className="mt-1 text-[16px] font-semibold leading-relaxed [word-break:keep-all] md:text-[18px]">
                                            {o.after}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
