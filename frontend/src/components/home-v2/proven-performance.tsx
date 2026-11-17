import type { Locale } from "@/lib/i18n";
import { Rise, Num } from "@/components/home-v2/journey-motion";

/**
 * 「숫자로 증명하는 XGEN」 — 기존 제품 사이트(www.xgen.im) 메인의 PROVEN PERFORMANCE 섹션을 옮겨 온 것.
 * 수치는 xgen.im 게시 기준이며, 바뀌면 STATS 값만 고친다.
 * 바로 아래 고객사 로고 띠(#222)와 한 덩어리로 보이도록 같은 배경을 쓴다.
 */
const STATS = [
    { value: 1086, ko: { label: "함께하는 고객사", unit: "여 개사" }, en: { label: "Customers", unit: "+ companies" } },
    { value: 3585, ko: { label: "사업 수행 실적", unit: "건" }, en: { label: "Projects delivered", unit: " projects" } },
    { value: 92, ko: { label: "운영 품질 점수", unit: "점" }, en: { label: "Operational quality score", unit: " pts" } },
    { value: 1, ko: { label: "GS인증", unit: "등급" }, en: { label: "GS certification", unit: "Grade " }, prefixUnit: true },
] as const;

export function ProvenPerformance({ locale = "ko" }: { locale?: Locale }) {
    const en = locale === "en";
    return (
        <section data-nav-theme="dark" className="bg-[#222222] pt-16 pb-4 text-white md:pt-24" aria-labelledby="proven-performance-title">
            <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_2fr]">
                <Rise>
                    <p className="text-[13px] font-medium tracking-[0.04em] text-white/80">PROVEN PERFORMANCE</p>
                    <h2 id="proven-performance-title" className="mt-4 text-[28px] font-bold leading-[1.3] tracking-tight md:text-[36px]">
                        {en ? (
                            <>XGEN, proven<br />in numbers</>
                        ) : (
                            <>숫자로 증명하는<br />XGEN</>
                        )}
                    </h2>
                </Rise>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-y-14">
                    {STATS.map((s, i) => {
                        const t = en ? s.en : s.ko;
                        const prefix = en && "prefixUnit" in s && s.prefixUnit;
                        return (
                            <Rise key={t.label} delay={i * 90} className="text-right">
                                <dt className="text-[13.5px] font-semibold text-white/55 md:text-[15px]">{t.label}</dt>
                                <dd className="mt-2 flex flex-wrap items-baseline justify-end gap-x-1">
                                    {prefix && <span className="text-[14px] font-bold sm:text-[20px] md:text-[30px]">{t.unit}</span>}
                                    <span className="text-[30px] sm:text-[44px] font-extrabold leading-none tracking-tight md:text-[72px]">
                                        <Num value={s.value} />
                                    </span>
                                    {!prefix && <span className="text-[14px] font-bold sm:text-[20px] md:text-[30px]">{t.unit}</span>}
                                </dd>
                            </Rise>
                        );
                    })}
                </dl>
            </div>
            <p className="mx-auto mt-10 w-full max-w-[1280px] px-5 text-right text-[12px] text-white/40 sm:px-8">
                {en
                    ? "Figures as published on the XGEN product site; customer and project counts are Plateer-wide."
                    : "수치는 XGEN 제품 사이트 게시 기준이며, 고객사·사업 수행 실적은 플래티어 전체 기준입니다."}
            </p>
        </section>
    );
}
