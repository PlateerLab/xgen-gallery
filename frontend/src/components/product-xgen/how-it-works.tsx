import { Plug, Workflow, Rocket, ShieldCheck, RefreshCw } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { SectionHead, SECTION_PAD, SECTION_BODY_GAP } from "@/components/product-xgen/section-head";

/**
 * How It Works — 연결 → 설계 → 배포 → 통제 → 개선 5단계.
 * 비아이매트릭스 TRINITY 랜딩의 「DB 연결 → 질문 → 분석 → 인사이트 → 의사결정」 흐름 섹션 구조를 참고했다.
 * 단계 설명은 제품 정의(featureList)·기능 페이지에 이미 있는 기능만 적는다(새 주장 금지).
 * 1024px 이상 5열, 그 아래는 한 열로 세로 쌓기.
 */
const STEPS = {
    ko: [
        { t: "연결", d: "문서·DB·사내 API를 지식(RAG)과 도구(MCP)로 등록합니다." },
        { t: "설계", d: "에이전트플로우 Canvas에서 모델·지식·도구 노드를 엮어 Agent를 만듭니다." },
        { t: "배포", d: "웹 임베드·API·스케줄 실행으로 업무 화면과 시스템에 연결합니다." },
        { t: "통제", d: "권한·PII 마스킹·승인·감사 로그로 사용 범위를 관리합니다." },
        { t: "개선", d: "실행 이력과 평가 결과를 보고 프롬프트·도구·모델을 조정합니다." },
    ],
    en: [
        { t: "Connect", d: "Register documents, databases and internal APIs as knowledge (RAG) and tools (MCP)." },
        { t: "Design", d: "Build agents on the Agentflow Canvas by linking model, knowledge and tool nodes." },
        { t: "Deploy", d: "Connect agents to work screens and systems through web embeds, APIs and scheduled runs." },
        { t: "Govern", d: "Manage usage with permissions, PII masking, approvals and audit logs." },
        { t: "Improve", d: "Review run history and evaluation results to tune prompts, tools and models." },
    ],
};
const ICONS = [Plug, Workflow, Rocket, ShieldCheck, RefreshCw];

export function XgenHowItWorks({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const steps = STEPS[en ? "en" : "ko"];
    return (
        <section
            id="how"
            className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
        >
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead
                    eyebrow="How It Works"
                    title={en ? "From connection to improvement, in one flow" : "연결부터 개선까지, 하나의 흐름으로"}
                    lead={
                        en
                            ? "Connect in-house data and systems, design and deploy agents, then run them under permission and audit controls and improve them from execution records."
                            : "사내 데이터와 시스템을 연결하고 Agent를 설계해 배포한 뒤, 권한·감사 체계 안에서 운영하며 실행 기록을 바탕으로 개선합니다."
                    }
                />
                {/*
                  배치 — TRINITY 「Process」: 번호 → 원형 노드를 가로선으로 잇고 아래에 단계명·설명,
                  그 아래 실제 제품 화면(브라우저 프레임). 1024px 미만은 세로선으로 잇는 목록.
                */}
                <ol className={`${SECTION_BODY_GAP} relative grid gap-0 lg:grid-cols-5 lg:gap-6`}>
                    {/* 가로 연결선 — 첫 노드 중심 ~ 마지막 노드 중심 */}
                    <span
                        aria-hidden
                        className="pointer-events-none absolute left-[10%] right-[10%] top-[58px] hidden h-px bg-[linear-gradient(90deg,#9cbcf5,#2f7bff)] lg:block"
                    />
                    {steps.map((s, i) => {
                        const Icon = ICONS[i];
                        const last = i === steps.length - 1;
                        return (
                            <li key={s.t} className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
                                {/* 세로 연결선 — 한 열일 때만 */}
                                {!last && (
                                    <span aria-hidden className="absolute left-[27px] top-[56px] bottom-0 w-px bg-[#c9d9f7] lg:hidden" />
                                )}
                                <span className="hidden font-mono text-[12.5px] font-bold text-[#2f7bff] lg:block">0{i + 1}</span>
                                <span
                                    className={`relative z-10 inline-flex h-14 w-14 flex-none items-center justify-center rounded-full border bg-white lg:mt-3 ${
                                        last
                                            ? "border-[#2f7bff] text-[#2461d8] shadow-[0_0_0_6px_rgba(47,123,255,0.12)]"
                                            : "border-[#bcd0f5] text-[#2f7bff]"
                                    }`}
                                >
                                    <Icon className="h-[22px] w-[22px]" aria-hidden />
                                </span>
                                <div className="min-w-0 pt-1 lg:mt-4 lg:pt-0">
                                    <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        <span className="mr-1.5 font-mono text-[13px] text-[#2f7bff] lg:hidden">0{i + 1}</span>
                                        {s.t}
                                    </h3>
                                    <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all] lg:mt-2">
                                        {s.d}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>

                {/* 실제 제품 화면 — 흐름의 「설계」 단계가 일어나는 Agentflow Canvas */}
                <figure className="mt-14 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-32px_rgba(20,40,80,0.35)] lg:mt-16">
                    <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] px-4 py-2.5">
                        <span aria-hidden className="flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#d5dbe5]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#d5dbe5]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#d5dbe5]" />
                        </span>
                        <span className="min-w-0 flex-1 truncate rounded-md border border-[var(--color-line)] bg-white px-3 py-1 text-[12px] text-[var(--color-ink-subtle)]">
                            XGEN · Agentflow Canvas
                        </span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/product/agent-builder-canvas.png"
                        alt={en ? "XGEN Agentflow Canvas screen" : "XGEN 에이전트플로우 캔버스 화면"}
                        width={1600}
                        height={900}
                        loading="lazy"
                        className="block h-auto w-full"
                    />
                    <figcaption className="border-t border-[var(--color-line)] px-5 py-3 text-[12.5px] text-[var(--color-ink-subtle)]">
                        {en
                            ? "Agentflow Canvas — model, knowledge and tool nodes linked into one agent. Screens vary by version and configuration."
                            : "에이전트플로우 Canvas — 모델·지식·도구 노드를 엮어 하나의 Agent로 만듭니다. 화면은 버전과 구성에 따라 다를 수 있습니다."}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
