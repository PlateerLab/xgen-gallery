/* /product/xgen 1depth 「XGEN은 다릅니다」 — 변화 대비 비교 밴드(2026-11 개편 2).
   바로 위 The Challenge의 결론(「변화에 대응하지 못하는 플랫폼」)에 답하는 섹션.
   말풍선 세 장면(데이터·모델·연결 시스템)에 「현업 피드백」을 더해 네 가지 변화를 행으로 두고,
   「흔히 겪는 방식」과 「XGEN」을 나란히 놓는다. 문구의 사실 근거는 같은 페이지 Platform·Why XGEN·자기개선 루프 섹션.
   배경: Adobe Stock 1382680851(어두운 바탕의 파란 빛 물결, 무료 라이선스, 2400px로 축소). 애니메이션 없음. */
import Image from "next/image";
import { Check, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Row = { when: string; typical: string; xgen: string };

function copy(locale: Locale) {
    const ko = locale !== "en";
    return ko
        ? {
              kicker: "XGEN · 기업형 Agentic AI Platform",
              h2: "XGEN은 다릅니다.",
              value: ["도입한 날에 멈추는 AI가 아니라,", "업무의 변화와 함께 진화하는 AI."],
              body: "데이터와 모델, 연결된 시스템이 바뀌어도 Agent를 처음부터 다시 만들지 않습니다. 현업의 피드백은 승인을 거쳐 다음 개선으로 이어집니다.",
              colWhen: "변화가 생기면",
              colTypical: "흔히 겪는 방식",
              colXgen: "XGEN",
              rows: [
                  {
                      when: "데이터가 바뀔 때",
                      typical: "지식을 다시 적재하기 전까지 지난 기준으로 답합니다",
                      xgen: "연결된 데이터를 지식으로 다시 구조화해, 최신 기준과 출처로 답합니다",
                  },
                  {
                      when: "모델을 바꿀 때",
                      typical: "연동과 보안 검토를 처음부터 다시 합니다",
                      xgen: "Model Gateway 단일 경로로, 모델을 바꿔도 실행 절차와 통제는 그대로입니다",
                  },
                  {
                      when: "연결 시스템이 바뀔 때",
                      typical: "Agent를 다시 개발합니다",
                      xgen: "도구·데이터 소스를 구성 정보로 분리해, 구성 범위 안에서는 코드 수정 없이 바꿉니다",
                  },
                  {
                      when: "현업이 아쉬움을 말할 때",
                      typical: "개발사의 다음 업데이트를 기다립니다",
                      xgen: "피드백과 실행 기록을 바탕으로 개선안을 만들고, 승인된 변경만 반영합니다",
                  },
              ] satisfies Row[],
              note: "적용 범위와 반영 절차는 고객사 구성과 정책에 따라 정합니다.",
          }
        : {
              kicker: "XGEN · Enterprise Agentic AI Platform",
              h2: "XGEN is different.",
              value: ["Not AI that stops on launch day,", "but AI that evolves as your work changes."],
              body: "When data, models or connected systems change, you do not rebuild agents from scratch. Feedback from business users turns into the next improvement after approval.",
              colWhen: "When this changes",
              colTypical: "Typical rollout",
              colXgen: "XGEN",
              rows: [
                  {
                      when: "Your data",
                      typical: "Answers follow the old rules until knowledge is reloaded",
                      xgen: "Restructures connected data into knowledge and answers from current sources",
                  },
                  {
                      when: "The model",
                      typical: "Integration and security review start over",
                      xgen: "One Model Gateway path keeps procedures and controls the same when models change",
                  },
                  {
                      when: "A connected system",
                      typical: "The agent is rebuilt",
                      xgen: "Tools and data sources live in configuration, so changes within that scope need no code",
                  },
                  {
                      when: "Users ask for more",
                      typical: "You wait for the vendor’s next release",
                      xgen: "Feedback and run records shape improvement proposals; only approved changes go live",
                  },
              ] satisfies Row[],
              note: "Scope and rollout procedures are set by each customer’s configuration and policies.",
          };
}

export function XgenDifferentPrism({ locale }: { locale: Locale }) {
    const t = copy(locale);
    return (
        <section data-nav-theme="dark" className="relative overflow-hidden bg-[#03040a] text-white">
            {/* 키비주얼: 빛 물결은 오른쪽 위, 글자 쪽은 검정으로 누른다 */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <Image
                    src="/product/xgen-different-wave.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[60%_30%] opacity-80 max-[1023px]:object-[70%_20%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,10,0.94)_0%,rgba(3,4,10,0.78)_40%,rgba(3,4,10,0.55)_70%,rgba(3,4,10,0.45)_100%)] max-[1023px]:bg-[linear-gradient(180deg,rgba(3,4,10,0.55)_0%,rgba(3,4,10,0.88)_40%,rgba(3,4,10,0.95)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#03040a]" />
            </div>

            <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-x-12 px-6 py-24 max-[1023px]:grid-cols-1 max-[1023px]:gap-y-12 max-[1023px]:py-20 max-[620px]:gap-y-10 max-[620px]:py-16">
                {/* 왼쪽: 선언 — 헤드라인 → 지향 가치 한 쌍 → 한 줄 설명 */}
                <div className="col-span-5 max-[1023px]:col-span-1">
                    <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#8fc1ff]">{t.kicker}</p>
                    <h2 className="mt-5 bg-gradient-to-r from-[#f2f8ff] via-[#8cc4ff] to-[#7c6cff] bg-clip-text pb-1 text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-transparent max-[1023px]:text-[48px] max-[620px]:text-[36px]">
                        {t.h2}
                    </h2>
                    <p className="mt-7 text-[24px] font-bold leading-[1.45] tracking-[-0.02em] [word-break:keep-all] max-[620px]:mt-5 max-[620px]:text-[19px]">
                        <span className="text-white/45">{t.value[0]}</span>
                        <br />
                        <span className="text-white">{t.value[1]}</span>
                    </p>
                    <p className="mt-5 text-[15px] leading-[1.75] text-white/65 [word-break:keep-all] max-[620px]:text-[14px]">{t.body}</p>
                </div>

                {/* 오른쪽: 변화 네 가지 × (흔히 겪는 방식 / XGEN) — 가는 가로선만 */}
                <div className="col-span-7 max-[1023px]:col-span-1">
                    <div
                        className="grid grid-cols-[150px_1fr_1.35fr] gap-x-6 border-b border-white/20 pb-3 font-mono text-[11.5px] uppercase tracking-[0.18em] max-[760px]:hidden"
                    >
                        <span className="text-white/45">{t.colWhen}</span>
                        <span className="text-white/45">{t.colTypical}</span>
                        <span className="text-[#8fc1ff]">{t.colXgen}</span>
                    </div>
                    <ul>
                        {t.rows.map((r) => (
                            <li
                                key={r.when}
                                className="grid grid-cols-[150px_1fr_1.35fr] items-start gap-x-6 border-b border-white/12 py-5 max-[760px]:grid-cols-1 max-[760px]:gap-y-2.5 max-[760px]:py-5"
                            >
                                <p className="pt-0.5 text-[15px] font-bold tracking-tight text-white [word-break:keep-all]">{r.when}</p>
                                <p className="flex items-start gap-2 text-[13.5px] leading-[1.6] text-white/45 [word-break:keep-all]">
                                    <X className="mt-[3px] h-3.5 w-3.5 flex-none text-white/35" aria-hidden />
                                    <span>
                                        <span className="hidden font-semibold text-white/55 max-[760px]:inline">{t.colTypical} · </span>
                                        {r.typical}
                                    </span>
                                </p>
                                <p className="flex items-start gap-2 text-[14px] font-semibold leading-[1.6] text-white [word-break:keep-all]">
                                    <Check className="mt-[3px] h-4 w-4 flex-none text-[#7dd3fc]" aria-hidden />
                                    <span>
                                        <span className="hidden font-bold text-[#8fc1ff] max-[760px]:inline">{t.colXgen} · </span>
                                        {r.xgen}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-[12.5px] text-white/45">{t.note}</p>
                </div>
            </div>
        </section>
    );
}
