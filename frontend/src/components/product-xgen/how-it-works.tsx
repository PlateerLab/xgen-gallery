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
                <ol className={`${SECTION_BODY_GAP} grid gap-3 lg:grid-cols-5 lg:gap-4`}>
                    {steps.map((s, i) => {
                        const Icon = ICONS[i];
                        return (
                            <li
                                key={s.t}
                                className="relative flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 lg:flex-col lg:gap-0 lg:p-6"
                            >
                                <div className="flex flex-none items-center gap-3 lg:justify-between">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <Icon className="h-5 w-5" aria-hidden />
                                    </span>
                                    <span className="hidden font-mono text-[13px] font-bold text-[#2f7bff] lg:inline">
                                        0{i + 1}
                                    </span>
                                </div>
                                <div className="min-w-0 lg:mt-5">
                                    <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        <span className="mr-1.5 font-mono text-[13px] text-[#2f7bff] lg:hidden">0{i + 1}</span>
                                        {s.t}
                                    </h3>
                                    <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all] lg:mt-2">
                                        {s.d}
                                    </p>
                                </div>
                                {/* 단계 사이 화살표 — 5열일 때만 */}
                                {i < steps.length - 1 && (
                                    <span
                                        aria-hidden
                                        className="absolute -right-[13px] top-1/2 z-10 hidden h-[22px] w-[22px] -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[12px] text-[#2f7bff] lg:flex"
                                    >
                                        →
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
