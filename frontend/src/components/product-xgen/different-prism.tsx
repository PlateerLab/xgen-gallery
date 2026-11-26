/* /product/xgen 1depth 「XGEN은 다릅니다」 — 낮은 숫자 밴드(2026-11 개편).
   왼쪽: 머리글 → 헤드라인 → 컨셉 정의(3줄+설명). 오른쪽: 메인 인트로(home-intro proof)와 같은 근거 숫자 4개를 크게.
   배경: Adobe Stock 1382680851(어두운 바탕의 파란 빛 물결, 무료 라이선스, 2400px로 축소).
   빛은 오른쪽 위에 두고, 왼쪽 글자 뒤는 검정으로 눌러 읽기 쉽게 한다.
   숫자는 화면에 들어오면 칸 순서대로 하나씩 카운트업(StatCount, reduced-motion 이면 정지). */
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { TOOLS } from "@/lib/tools";
import { XGEN_GS_CERTIFICATION } from "@/lib/certifications";
import { StatCount } from "./stat-count";

type Stat = { prefix?: string; value: number; unit: string; label: string; sub: string };

function copy(locale: Locale) {
    const ko = locale !== "en";
    const stats: Stat[] = [
        {
            value: 1086,
            unit: ko ? "개사" : "",
            label: ko ? "플래티어와 함께하는 고객사" : "Companies working with Plateer",
            sub: ko ? "플래티어 전체 고객 기준" : "Across Plateer, not XGEN only",
        },
        {
            prefix: "GS ",
            value: 1,
            unit: ko ? "등급" : "",
            label: ko ? "국가 공인 품질인증" : "Certified quality, Grade 1",
            sub: `${ko ? "인증번호" : "No."} ${XGEN_GS_CERTIFICATION.no}`,
        },
        {
            value: 111,
            unit: "+",
            label: ko ? "내장 도구·플러그인" : "Built-in tools & plugins",
            sub: ko ? "커스텀 도구로 확장 가능" : "Extensible with custom tools",
        },
        {
            value: TOOLS.length,
            unit: ko ? "개" : "",
            label: ko ? "공개 라이브러리" : "Public libraries",
            sub: ko ? "라이선스는 라이브러리별 상이" : "Licenses vary by library",
        },
    ];
    return ko
        ? {
              kicker: "XGEN · 기업형 Agentic AI Platform",
              h2: "XGEN은 다릅니다.",
              concept: ["강력한 거버넌스 위에서,", "스스로 진화하는", "Agentic AI Platform"],
              conceptBody:
                  "XGEN은 기업의 보안과 통제 체계를 유지하면서, 다양한 LLM 기반의 AI Agent가 사내 시스템과 사용자 업무 환경을 연결해 자율적으로 업무를 수행하고, 실행 결과를 바탕으로 지속적으로 개선되도록 지원하는 플랫폼입니다.",
              stats,
          }
        : {
              kicker: "XGEN · Enterprise Agentic AI Platform",
              h2: "XGEN is different.",
              concept: ["An Agentic AI Platform", "that keeps evolving", "on strong governance"],
              conceptBody:
                  "XGEN keeps your security and control framework in place while AI agents built on a range of LLMs connect internal systems with users' work environments, carry out tasks autonomously, and improve continuously based on execution results.",
              stats,
          };
}

export function XgenDifferentPrism({ locale }: { locale: Locale }) {
    const t = copy(locale);
    return (
        <section data-nav-theme="dark" className="relative overflow-hidden bg-[#03040a] text-white">
            {/* 키비주얼: 빛 물결은 오른쪽 위, 글자 쪽(왼쪽)은 검정으로 누른다 */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <Image
                    src="/product/xgen-different-wave.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[60%_30%] opacity-90 max-[1023px]:object-[70%_20%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,10,0.92)_0%,rgba(3,4,10,0.7)_38%,rgba(3,4,10,0.25)_70%,rgba(3,4,10,0.15)_100%)] max-[1023px]:bg-[linear-gradient(180deg,rgba(3,4,10,0.35)_0%,rgba(3,4,10,0.8)_45%,rgba(3,4,10,0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#03040a]" />
            </div>

            <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-x-12 px-6 py-[167px] max-[1023px]:grid-cols-1 max-[1023px]:gap-y-12 max-[1023px]:py-20 max-[620px]:gap-y-10 max-[620px]:py-16">
                {/* 왼쪽: 메시지 */}
                <div className="col-span-5 max-[1023px]:col-span-1">
                    <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#8fc1ff]">{t.kicker}</p>
                    <h2 className="mt-5 bg-gradient-to-r from-[#f2f8ff] via-[#8cc4ff] to-[#7c6cff] bg-clip-text pb-1 text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-transparent max-[1023px]:text-[48px] max-[620px]:text-[36px]">
                        {t.h2}
                    </h2>
                    {/* 컨셉 정의: 헤드라인 아래 큰 흰 글씨 3줄 + 설명 */}
                    <p className="mt-8 text-[34px] font-bold leading-[1.22] tracking-[-0.03em] text-white max-[1023px]:text-[30px] max-[620px]:mt-6 max-[620px]:text-[24px]">
                        {t.concept.map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                    </p>
                    <p className="mt-5 text-[15px] leading-[1.75] text-white/70 max-[620px]:text-[14px]">{t.conceptBody}</p>
                </div>

                {/* 오른쪽: 근거 숫자 4개 — 가는 선으로만 나눈다 */}
                <div className="col-span-7 grid grid-cols-2 border-t border-white/15 max-[1023px]:col-span-1">
                    {t.stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={[
                                "border-b border-white/15 py-8 max-[620px]:py-6",
                                i % 2 === 0 ? "pr-8 max-[620px]:pr-4" : "border-l pl-8 max-[620px]:pl-4",
                            ].join(" ")}
                        >
                            <p className="flex items-baseline gap-1 whitespace-nowrap">
                                <span className="text-[60px] font-semibold leading-none tracking-[-0.04em] max-[1023px]:text-[52px] max-[620px]:text-[34px]">
                                    <StatCount
                                        value={s.value}
                                        prefix={s.prefix}
                                        delay={i * 350}
                                        className="bg-gradient-to-b from-white to-[#a9d0ff] bg-clip-text text-transparent"
                                    />
                                </span>
                                {s.unit && (
                                    <span className="text-[22px] font-semibold text-[#a9d0ff] max-[620px]:text-[15px]">{s.unit}</span>
                                )}
                            </p>
                            <p className="mt-4 text-[15px] font-semibold tracking-tight text-white max-[620px]:mt-3 max-[620px]:text-[13.5px]">
                                {s.label}
                            </p>
                            <p className="mt-1 text-[12.5px] text-white/50 max-[620px]:text-[12px]">{s.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
