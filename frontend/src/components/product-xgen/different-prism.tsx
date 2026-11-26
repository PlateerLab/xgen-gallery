/* /product/xgen 1depth 「XGEN은 다릅니다」 — 낮은 숫자 밴드(2026-11 개편).
   왼쪽: 머리글 → 헤드라인 → 한 줄 정의. 오른쪽: 메인 인트로(home-intro proof)와 같은 근거 숫자 4개를 크게.
   배경: Adobe Stock 1382680851(어두운 바탕의 파란 빛 물결, 무료 라이선스, 2400px로 축소).
   빛은 오른쪽 위에 두고, 왼쪽 글자 뒤는 검정으로 눌러 읽기 쉽게 한다.
   숫자는 스크롤 위치에 맞춰 칸 순서대로 하나씩 떠오르며 카운트업(ScrollStatGrid, reduced-motion 이면 정지). */
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { TOOLS } from "@/lib/tools";
import { XGEN_GS_CERTIFICATION } from "@/lib/certifications";
import { ScrollStatGrid, type ScrollStat } from "./stat-count";

type Stat = ScrollStat;

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
            value: 110,
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
              bold: "온프레미스와 망분리 환경에서 AI Agent를 설계하고, 실행하고, 통제합니다.",
              body: "사내 데이터는 기업 안에서 다루고, Agent의 실행은 승인과 기록 아래 둡니다.",
              stats,
          }
        : {
              kicker: "XGEN · Enterprise Agentic AI Platform",
              h2: "XGEN is different.",
              bold: "Design, run and govern AI agents on-premises and in network-separated environments.",
              body: "Company data stays inside the company, and agent actions run under approval and audit logging.",
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

            <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-x-12 px-6 py-24 max-[1023px]:grid-cols-1 max-[1023px]:gap-y-12 max-[1023px]:py-20 max-[620px]:gap-y-10 max-[620px]:py-16">
                {/* 왼쪽: 메시지 */}
                <div className="col-span-5 max-[1023px]:col-span-1">
                    <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#8fc1ff]">{t.kicker}</p>
                    <h2 className="mt-5 bg-gradient-to-r from-[#f2f8ff] via-[#8cc4ff] to-[#7c6cff] bg-clip-text pb-1 text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-transparent max-[1023px]:text-[48px] max-[620px]:text-[36px]">
                        {t.h2}
                    </h2>
                    <p className="mt-6 text-[18px] font-semibold leading-[1.6] text-white max-[620px]:mt-5 max-[620px]:text-[15px]">
                        {t.bold}
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.75] text-white/65 max-[620px]:text-[14px]">{t.body}</p>
                </div>

                {/* 오른쪽: 근거 숫자 4개 — 가는 선으로만 나누고, 스크롤에 맞춰 칸마다 떠오른다 */}
                <ScrollStatGrid stats={t.stats} />
            </div>
        </section>
    );
}
