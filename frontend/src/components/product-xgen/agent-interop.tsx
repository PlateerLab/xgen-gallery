import { ArrowDown, Bot, Check, FileSearch, Layers, Link2, Settings, ShieldCheck, SquareArrowOutUpRight, User } from "lucide-react";
import { SectionHead, SECTION_PAD, SECTION_BODY_GAP } from "@/components/product-xgen/section-head";
import type { Locale } from "@/lib/i18n";

/**
 * 기능·활용 — 외부 플랫폼 Agent 연동(Agent Interoperability).
 * 근거: CTO·개발자 의견 정리(2026-11) — 현재 사실상 표준은 MCP, 외부 Agent는 MCP로 감싸
 * XGEN Agent의 도구로 호출(Agent as Tool), 내보내기도 MCP. A2A·AG-UI는 채택 추이 검토 단계.
 * 외부 Agent는 원래 플랫폼에서 실행되므로 조건·한계를 함께 적는다(과장 금지).
 */
const COPY = {
    ko: {
        eyebrow: "Agent Interoperability",
        title: (
            <>
                플랫폼의 경계를 넘어,
                <br className="hidden md:block" /> Agent의 활용을 확장합니다
            </>
        ),
        lead: "외부 플랫폼에서 개발한 Agent를 XGEN으로 연결하고, XGEN에서 만든 Agent도 외부에서 활용할 수 있습니다. MCP 기반의 양방향 연동으로 기존 AI 자산의 활용 범위를 넓히고, 서로 다른 플랫폼의 Agent를 업무 흐름에 유연하게 연결합니다.",
        flowLabel: "연동 예시",
        flow: {
            user: "사용자 질문",
            group: "다른 플랫폼의 Agent도 도구로 연결",
            main: "XGEN Agent",
            mainSub: "업무 흐름 조율",
            tools: [
                { label: "외부 플랫폼 Agent", sub: "MCP로 연결 · 결과만 수신", ext: true },
                { label: "사내 문서 검색", sub: "RAG · 온톨로지", ext: false },
                { label: "사내 시스템 API", sub: "인증과 함께 등록한 도구", ext: false },
            ],
            toolTag: "도구",
            extTag: "외부",
            out: "결과를 모아 정리한 답변",
        },
        cards: [
            {
                en: "Import",
                title: "가져와서 도구로 호출",
                desc: "외부 Agent를 MCP 서버로 감싸 등록하면 XGEN Agent가 다른 도구처럼 호출합니다(Agent as Tool). 기존 투자를 살리면서 사내 데이터·시스템과 한 흐름으로 묶을 수 있습니다.",
            },
            {
                en: "Export",
                title: "XGEN Agent를 밖으로",
                desc: "XGEN에서 만든 Agent도 MCP로 열 수 있습니다. MCP를 지원하는 다른 플랫폼이나 도구가 이 Agent를 호출해 쓸 수 있어, 특정 플랫폼에 묶이지 않습니다.",
            },
            {
                en: "Govern",
                title: "연결해도 통제는 XGEN에서",
                desc: "외부 Agent 호출도 XGEN의 권한(RBAC)·이력 관리 아래에서 이뤄집니다. 주고받는 입력과 출력에는 XGEN 가드레일이 적용됩니다.",
            },
        ],
        condTitle: "적용 조건",
        conds: [
            "외부 Agent를 API로 호출할 수 있어야 합니다(엔드포인트·인증 정보).",
            "호출을 감싸는 MCP 어댑터가 필요하며, 플랫폼별 구성 방식은 사전 검토로 확인합니다.",
            "외부 Agent는 원래 플랫폼에서 실행됩니다. 데이터 전송·과금·응답 속도는 해당 플랫폼 정책을 따릅니다.",
            "외부 Agent 내부의 메모리와 중간 과정은 XGEN에서 보이지 않으며, 통제는 입출력 단위로 적용됩니다.",
            "현재 연동 표준은 MCP입니다. A2A 등 Agent 간 프로토콜은 업계 채택 추이를 보며 지원 범위를 검토합니다.",
        ],
    },
    en: {
        eyebrow: "Agent Interoperability",
        title: (
            <>
                Beyond platform boundaries,
                <br className="hidden md:block" /> extending how agents are used
            </>
        ),
        lead: "Connect agents built on external platforms to XGEN, and make agents built in XGEN available to other platforms. Two-way, MCP-based integration extends the reach of your existing AI assets and connects agents from different platforms into business workflows.",
        flowLabel: "Example flow",
        flow: {
            user: "User request",
            group: "Tools, including agents from other platforms",
            main: "XGEN Agent",
            mainSub: "Orchestrates the workflow",
            tools: [
                { label: "External platform agent", sub: "Connected via MCP · returns results", ext: true },
                { label: "Internal document search", sub: "RAG · ontology", ext: false },
                { label: "Internal system API", sub: "Registered with authentication", ext: false },
            ],
            toolTag: "Tool",
            extTag: "External",
            out: "Consolidated answer",
        },
        cards: [
            {
                en: "Import",
                title: "Bring it in as a tool",
                desc: "Wrap an external agent in an MCP server and register it, and XGEN agents call it like any other tool (agent as tool). You keep your existing investment and combine it with internal data and systems in one flow.",
            },
            {
                en: "Export",
                title: "Open XGEN agents to others",
                desc: "Agents built in XGEN can also be exposed over MCP. Other MCP-capable platforms and tools can call them, so you are not locked into a single platform.",
            },
            {
                en: "Govern",
                title: "Connected, still governed in XGEN",
                desc: "Calls to external agents run under XGEN's role-based access control (RBAC) and history tracking. XGEN guardrails apply to the inputs and outputs exchanged.",
            },
        ],
        condTitle: "Conditions",
        conds: [
            "The external agent must be callable through an API (endpoint and credentials).",
            "An MCP adapter that wraps the call is required; the setup for each platform is confirmed in a pre-assessment.",
            "External agents run on their original platform. Data transfer, billing, and latency follow that platform's policies.",
            "An external agent's internal memory and intermediate steps are not visible in XGEN; control applies at the input/output level.",
            "MCP is the current integration standard. Support for agent-to-agent protocols such as A2A is reviewed as industry adoption develops.",
        ],
    },
} as const;

const CARD_ICONS = [Link2, SquareArrowOutUpRight, ShieldCheck];
const TOOL_ICONS = [Bot, FileSearch, Layers];

export function XgenAgentInterop({ locale = "ko" }: { locale?: Locale }) {
    const t = locale === "en" ? COPY.en : COPY.ko;
    return (
        <section
            id="interop"
            className="relative scroll-mt-[calc(var(--nav-h,84px)+58px)] overflow-hidden border-t border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8ff_55%,#f3f4ff_100%)]"
        >
            {/* 배경 광원 — 장식 */}
            <div aria-hidden className="pointer-events-none absolute -left-40 bottom-[-120px] h-[420px] w-[420px] rounded-full bg-[#dfe6ff] opacity-60 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[360px] w-[360px] rounded-full bg-[#ece8ff] opacity-60 blur-3xl" />

            <div className={`relative mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

                <div className={`${SECTION_BODY_GAP} grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14`}>
                    {/* 연동 흐름 다이어그램 */}
                    <figure className="mx-auto flex w-full max-w-[520px] flex-col items-stretch">
                        <figcaption className="sr-only">{t.flowLabel}</figcaption>

                        {/* 사용자 질문 */}
                        <div className="mx-auto flex w-full max-w-[380px] items-center justify-center gap-2.5 rounded-full border border-white bg-white/95 px-5 py-3.5 shadow-[0_10px_28px_-14px_rgba(56,78,170,0.45)]">
                            <User className="h-5 w-5 text-[#2f6fe0]" fill="currentColor" aria-hidden />
                            <span className="text-[15px] font-bold text-[var(--color-ink)]">{t.flow.user}</span>
                        </div>
                        <ArrowDown className="mx-auto my-2.5 h-6 w-6 text-[#2f8bff]" strokeWidth={2.6} aria-hidden />

                        {/* XGEN Agent — 중심 엔진 */}
                        <div className="relative mx-auto w-full max-w-[400px]">
                            <div aria-hidden className="absolute -inset-x-12 inset-y-1 rounded-[50%] border border-[#cfd8ff] bg-[radial-gradient(closest-side,rgba(206,214,255,0.75),rgba(236,239,255,0.15))]" />
                            <div className="relative flex items-center justify-center gap-4 rounded-2xl bg-[linear-gradient(120deg,#3157f0_0%,#4f5ff2_50%,#7a68f4_100%)] px-6 py-5 text-white shadow-[0_22px_44px_-16px_rgba(70,80,235,0.65),inset_0_1px_0_rgba(255,255,255,0.35)]">
                                <Layers className="h-10 w-10 flex-none text-white/95" strokeWidth={1.8} aria-hidden />
                                <span className="text-left">
                                    <span className="block text-[21px] font-extrabold tracking-tight">{t.flow.main}</span>
                                    <span className="block text-[13.5px] font-medium text-white/85">{t.flow.mainSub}</span>
                                </span>
                            </div>
                        </div>
                        <ArrowDown className="mx-auto my-2.5 h-6 w-6 text-[#7a68f4]" strokeWidth={2.6} aria-hidden />

                        {/* 호출하는 도구 묶음 */}
                        <div className="rounded-2xl border border-dashed border-[#9fb5ef] bg-white/45 p-3.5 md:p-5">
                            <div className="mb-3 flex items-center justify-between gap-3 px-1">
                                <span className="text-[14.5px] font-bold text-[#2b4fd1] [word-break:keep-all]">{t.flow.group}</span>
                                <span className="flex-none rounded-full bg-[#3d5cf5] px-3 py-0.5 text-[12px] font-bold tracking-wide text-white">
                                    MCP
                                </span>
                            </div>
                            <ul className="grid gap-2.5">
                                {t.flow.tools.map((tool, i) => {
                                    const Icon = TOOL_ICONS[i];
                                    return (
                                        <li
                                            key={tool.label}
                                            className="flex items-center gap-3.5 rounded-xl border border-[#eef1fb] bg-white px-4 py-3 shadow-[0_8px_20px_-14px_rgba(56,78,170,0.5)]"
                                        >
                                            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[linear-gradient(145deg,#f2f5ff,#e2e9ff)] text-[#2f6fe0]">
                                                <Icon className="h-5 w-5" aria-hidden />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-[14.5px] font-bold text-[var(--color-ink)]">{tool.label}</span>
                                                <span className="block text-[12.5px] text-[var(--color-ink-muted)]">{tool.sub}</span>
                                            </span>
                                            {tool.ext ? (
                                                <span className="flex-none rounded-full bg-[#eef3ff] px-2 py-0.5 text-[11px] font-semibold text-[#2b4fd1]">
                                                    {t.flow.extTag}
                                                </span>
                                            ) : null}
                                            <SquareArrowOutUpRight className="h-4 w-4 flex-none text-[#2f6fe0]" aria-hidden />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <ArrowDown className="mx-auto my-2.5 h-6 w-6 text-[#2f8bff]" strokeWidth={2.6} aria-hidden />

                        {/* 결과 */}
                        <div className="mx-auto flex w-full max-w-[420px] items-center justify-center gap-3 rounded-full border border-[#e6e2ff] bg-[linear-gradient(90deg,#ffffff,#f6f3ff)] px-5 py-3.5 shadow-[0_12px_30px_-16px_rgba(110,90,240,0.55)]">
                            <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#6a5cf5,#8f6cf7)] text-white">
                                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                            </span>
                            <span className="text-[15px] font-bold text-[var(--color-ink)]">{t.flow.out}</span>
                        </div>
                    </figure>

                    {/* 가져오기 · 내보내기 · 통제 */}
                    <div className="flex flex-col gap-4">
                        {t.cards.map((c, i) => {
                            const Icon = CARD_ICONS[i];
                            return (
                                <article
                                    key={c.en}
                                    className="flex items-start gap-4 rounded-2xl border border-[#eef1fb] bg-white/95 p-5 shadow-[0_14px_34px_-22px_rgba(56,78,170,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(56,78,170,0.65)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:gap-5 md:p-6"
                                >
                                    <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[linear-gradient(145deg,#f3f6ff,#e1e8ff)] text-[#2f6fe0] shadow-[0_8px_18px_-10px_rgba(47,111,224,0.55)] md:h-16 md:w-16">
                                        <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.2} aria-hidden />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                            <span className="font-mono text-[15px] font-extrabold text-[#2461d8]">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#4a6aa8]">
                                                {c.en}
                                            </span>
                                            <span aria-hidden className="hidden h-4 w-px bg-[#c9d2e8] sm:inline-block" />
                                            <h3 className="w-full text-[19px] font-extrabold tracking-tight text-[var(--color-ink)] [word-break:keep-all] sm:w-auto md:text-[20px]">
                                                {c.title}
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                                            {c.desc}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}

                        {/* 적용 조건 — 조건·한계 명시 */}
                        <div className="mt-2 rounded-2xl border border-[#e6ebf8] bg-[#f2f5fd]/90 p-5 md:p-6">
                            <p className="flex items-center gap-2.5 text-[15px] font-bold text-[var(--color-ink)]">
                                <Settings className="h-5 w-5 text-[#3b54c8]" strokeWidth={2.4} aria-hidden />
                                {t.condTitle}
                            </p>
                            <ul className="mt-3 grid gap-2">
                                {t.conds.map((c) => (
                                    <li
                                        key={c}
                                        className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]"
                                    >
                                        <Check className="mt-[3px] h-4 w-4 flex-none text-[#2f6fe0]" strokeWidth={3} aria-hidden />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
