/* /product/xgen 1depth 「XGEN은 다릅니다」 — 비아이매트릭스 TRINITY PRISM 키비주얼을 벤치마킹(2026-11).
   배경: 유리 프리즘을 지나는 빛 실사(Adobe Stock 372149246, 무료 라이선스, 2400px로 축소)
   + 가운데 읽기용 어둠 + 아래로 검정에 녹는 그라데이션. 그 위에 짧은 도입 2줄 → 대형 1줄 헤드라인
   (그라데이션) → 굵은 한 줄 → 본문 → 숫자 4개. 애니메이션 없이 정지 그림. */
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

type Stat = { n: string; label: string; sub: string };

const COPY = {
    ko: {
        kicker: "XGEN · 기업형 Agentic AI Platform",
        introA: "AI Agent를 시험해 보는 단계를 넘어",
        introB: "실제 업무에서 운영하는 단계로",
        introC: ".",
        h2: "XGEN은 다릅니다.",
        bold: "온프레미스와 망분리 환경에서 AI Agent를 설계하고, 실행하고, 통제하는 플랫폼입니다.",
        bodyA: "사내 데이터는 기업 안에서 다루고, Agent의 실행은 승인과 기록 아래 둡니다.",
        bodyB: "아래 숫자는 배포·인증·공개 현황을 기준으로 합니다.",
    },
    en: {
        kicker: "XGEN · Enterprise Agentic AI Platform",
        introA: "Beyond trying AI agents out,",
        introB: "toward running them in real work",
        introC: ".",
        h2: "XGEN is different.",
        bold: "A platform to design, run and govern AI agents on-premises and in network-separated environments.",
        bodyA: "Company data stays inside the company, and agent actions run under approval and audit logging.",
        bodyB: "The figures below reflect deployment, certification and public release status.",
    },
} as const;

export function XgenDifferentPrism({ locale, stats }: { locale: Locale; stats: Stat[] }) {
    const t = locale === "en" ? COPY.en : COPY.ko;
    return (
        <section
            data-nav-theme="dark"
            className="relative overflow-hidden bg-[#03040a] text-white"
        >
            {/* 키비주얼 사진 + 읽기용 그라데이션 */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <Image
                    src="/product/xgen-different-prism.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[50%_40%] opacity-70"
                />
                {/* 사이트 강조색 쪽으로 살짝 푸르게 */}
                <div className="absolute inset-0 bg-[#0b2a6b] mix-blend-color opacity-35" />
                {/* 가운데 글자 뒤를 낮춘다 */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(3,4,10,0.72)_0%,rgba(3,4,10,0.35)_60%,rgba(3,4,10,0.15)_100%)]" />
                {/* 위아래는 검정 바탕으로 녹인다 */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#03040a_0%,rgba(3,4,10,0)_18%,rgba(3,4,10,0)_55%,#03040a_88%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* 카피: 프리즘 안쪽에 겹쳐 앉는다 */}
                <div className="flex min-h-[880px] flex-col items-center justify-center pt-[40px] text-center max-[1100px]:min-h-[700px] max-[1100px]:pt-[40px] max-[620px]:min-h-0 max-[620px]:pb-6 max-[620px]:pt-[96px]">
                    <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/50">
                        {t.kicker}
                    </p>
                    <p className="mt-5 text-[16px] leading-[1.9] text-white/75 max-[620px]:text-[14px]">
                        {t.introA}
                        <br />
                        <strong className="font-semibold text-white">{t.introB}</strong>
                        {t.introC}
                    </p>
                    <h2 className="mt-8 font-bold leading-[1.06] tracking-[-0.035em]">
                        <span className="block bg-gradient-to-r from-[#eaf4ff] via-[#6fb4ff] to-[#7c6cff] bg-clip-text pb-2 text-[84px] text-transparent max-[1100px]:text-[60px] max-[620px]:text-[40px]">
                            {t.h2}
                        </span>
                    </h2>
                    <p className="mt-8 max-w-3xl text-[18px] font-semibold leading-relaxed text-white max-[620px]:mt-6 max-[620px]:text-[15px]">
                        {t.bold}
                    </p>
                    <p className="mt-4 max-w-3xl text-[16px] leading-[1.85] text-white/70 max-[620px]:text-[14px]">
                        {t.bodyA}
                        <br className="max-[620px]:hidden" /> {t.bodyB}
                    </p>
                </div>

                {/* 숫자 4개: 얇은 가로선 위에 조용히 */}
                <div className="border-t border-white/10 pb-20 pt-12 max-[1100px]:mt-6 max-[620px]:pb-14 max-[620px]:pt-10">
                    <div className="grid grid-cols-4 gap-x-6 max-[901px]:grid-cols-2 max-[901px]:gap-y-10">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="bg-gradient-to-b from-white to-[#9cc8ff] bg-clip-text text-[44px] font-semibold leading-none tracking-[-0.03em] text-transparent max-[620px]:text-[34px]">
                                    {s.n}
                                </p>
                                <p className="mt-4 text-[15px] font-semibold tracking-tight text-white max-[620px]:text-[14px]">
                                    {s.label}
                                </p>
                                <p className="mt-1 text-[13px] text-white/45">{s.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
