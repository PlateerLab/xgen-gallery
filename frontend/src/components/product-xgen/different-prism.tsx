/* /product/xgen 1depth 「XGEN은 다릅니다」 — 변화 네 가지 카드(2026-11 개편 3: 표 → 카드, 머리글·단서 문구 삭제).
   바로 위 The Challenge의 결론(「변화에 대응하지 못하는 플랫폼」)에 답하는 섹션.
   말풍선 세 장면(데이터·모델·연결 시스템)에 「현업 피드백」을 더해 네 가지 변화를 행으로 두고,
   「흔히 겪는 방식」과 「XGEN」을 나란히 놓는다. 문구의 사실 근거는 같은 페이지 Platform·Why XGEN·자기개선 루프 섹션.
   배경: Adobe Stock 1382680851(어두운 바탕의 파란 빛 물결, 무료 라이선스, 2400px로 축소). 애니메이션 없음. */
import Image from "next/image";
import { ArrowDown, Cpu, Database, MessagesSquare, Plug, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Row = { when: string; typical: string; xgen: string };

const ICONS: LucideIcon[] = [Database, Cpu, Plug, MessagesSquare];

function copy(locale: Locale) {
    const ko = locale !== "en";
    return ko
        ? {
              h2: "XGEN은 다릅니다.",
              value: ["도입한 날에 멈추는 AI가 아니라,", "업무의 변화와 함께 진화하는 AI."],
              body: "데이터와 모델, 연결된 시스템이 바뀌어도 Agent를 처음부터 다시 만들지 않습니다. 현업의 피드백은 승인을 거쳐 다음 개선으로 이어집니다.",
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
          }
        : {
              h2: "XGEN is different.",
              value: ["Not AI that stops on launch day,", "but AI that evolves as your work changes."],
              body: "When data, models or connected systems change, you do not rebuild agents from scratch. Feedback from business users turns into the next improvement after approval.",
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
          };
}

export function XgenDifferentPrism({ locale }: { locale: Locale }) {
    const t = copy(locale);
    return (
        <section data-nav-theme="dark" className="relative overflow-hidden bg-[#03040a] text-white">
            {/* 키비주얼: 빛 물결은 오른쪽 위, 아래 카드 쪽은 검정으로 누른다 */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <Image
                    src="/product/xgen-different-wave.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-[60%_30%] opacity-80 max-[1023px]:object-[70%_20%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,4,10,0.55)_0%,rgba(3,4,10,0.80)_45%,rgba(3,4,10,0.94)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#03040a]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-24 max-[1023px]:py-20 max-[620px]:py-16">
                {/* 위: 선언 — 왼쪽 헤드라인·지향 가치, 오른쪽 한 줄 설명 */}
                <div className="grid grid-cols-12 items-end gap-x-12 max-[1023px]:grid-cols-1 max-[1023px]:gap-y-5">
                    <div className="col-span-7 max-[1023px]:col-span-1">
                        <h2 className="bg-gradient-to-r from-[#f2f8ff] via-[#8cc4ff] to-[#7c6cff] bg-clip-text pb-1 text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-transparent max-[1023px]:text-[48px] max-[620px]:text-[36px]">
                            {t.h2}
                        </h2>
                        <p className="mt-6 text-[26px] font-bold leading-[1.45] tracking-[-0.02em] [word-break:keep-all] max-[620px]:mt-5 max-[620px]:text-[19px]">
                            <span className="text-white/45">{t.value[0]}</span>
                            <br />
                            <span className="text-white">{t.value[1]}</span>
                        </p>
                    </div>
                    <p className="col-span-5 border-l border-white/20 pl-6 text-[15px] leading-[1.75] text-white/65 [word-break:keep-all] max-[1023px]:col-span-1 max-[620px]:pl-4 max-[620px]:text-[14px]">
                        {t.body}
                    </p>
                </div>

                {/* 아래: 변화 네 가지 카드 — 변화 → 흔히 겪는 방식(지운 선) → XGEN */}
                <ul className="mt-16 grid grid-cols-4 gap-5 max-[1023px]:grid-cols-2 max-[620px]:mt-10 max-[620px]:grid-cols-1 max-[620px]:gap-4">
                    {t.rows.map((r, i) => {
                        const Icon = ICONS[i];
                        return (
                            <li
                                key={r.when}
                                className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm max-[620px]:p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#8fc1ff]/40 bg-[#8fc1ff]/10">
                                        <Icon className="h-[18px] w-[18px] text-[#8fc1ff]" aria-hidden />
                                    </span>
                                    <p className="text-[16px] font-bold tracking-tight text-white [word-break:keep-all]">{r.when}</p>
                                </div>

                                <p className="mt-6 text-[12px] font-semibold text-white/40">{t.colTypical}</p>
                                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-white/45 line-through decoration-white/30 [word-break:keep-all]">
                                    {r.typical}
                                </p>

                                <div className="my-5 flex items-center gap-3" aria-hidden>
                                    <span className="h-px flex-1 bg-gradient-to-r from-white/5 to-[#8fc1ff]/50" />
                                    <ArrowDown className="h-4 w-4 text-[#8fc1ff]" />
                                    <span className="h-px flex-1 bg-gradient-to-l from-white/5 to-[#8fc1ff]/50" />
                                </div>

                                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8fc1ff]">{t.colXgen}</p>
                                <p className="mt-1.5 text-[15px] font-semibold leading-[1.6] text-white [word-break:keep-all]">{r.xgen}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
