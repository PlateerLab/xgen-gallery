import Link from "next/link";
import {
    Brain,
    Users,
    Cable,
    Database,
    UserCheck,
    Server,
    ShoppingCart,
    Landmark,
    Banknote,
    Check,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { GroupPage } from "@/components/onepage";
import { getGroup } from "@/lib/nav";
import { IndustryStreamsArt } from "@/components/hero-streams-art";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * Applied AI by Industry — 산업별 적용 영역 + Agentic AI 기반 기술.
 * 한국어(`/solutions`)와 영어(`/en/solutions`)가 이 컴포넌트를 공유한다.
 */
const COPY: Record<
    Locale,
    {
        heroLead: string;
        heroDesc: string;
        artIndustries: string[];
        artProducts: string[];
        artAria: string;
        industriesLead: string;
        industriesTitle: React.ReactNode;
        caseNote: string;
        caseCta: string;
        agenticLead: React.ReactNode;
        industryItems: Record<string, string[]>;
        agentic: { icon: LucideIcon; title: string; sub: string; desc: string }[];
    }
> = {
    ko: {
        heroLead: "산업별 업무를 이해하는 Enterprise AI를 연구하고 실증합니다",
        heroDesc:
            "금융, 공공, 커머스, IT 서비스 등 다양한 산업의 업무 특성과 규제를 반영한 AI 기술을 연구하며, 실제 PoC와 프로젝트를 통해 검증된 Enterprise AI 적용 사례를 제공합니다",
        artIndustries: [
            "금융",
            "공공",
            "커머스",
            "제조",
            "미디어",
            "물류·유통",
            "통신",
            "IT 서비스",
        ],
        artProducts: ["XGEN", "코드 어시스턴트", "Polar"],
        artAria:
            "금융·공공·커머스·제조·미디어·물류·통신·IT 등 다양한 산업이 Applied AI로 수렴해 XGEN·코드 어시스턴트·Polar 제품으로 이어지는 애니메이션",
        industriesLead:
            "산업마다 업무 특성과 규제가 다릅니다. 각 산업의 맥락을 반영해 검증된 Enterprise AI 적용 영역을 정리했습니다.",
        industriesTitle: (
            <>
                산업별 적용{" "}
                <span className="text-[var(--color-ink-subtle)]">Industries</span>
            </>
        ),
        caseNote:
            "이 적용 영역이 실제 현장에서 어떻게 구축·운영되는지 고객사례로 확인하세요",
        caseCta: "실제 고객사례 보러가기",
        agenticLead: (
            <>
                Plateer AI Labs는 에이전트가 스스로 계획하고, 협업하고, 도구를 다루며,
                <br />
                신뢰성 있게 운영되도록 만드는{" "}
                <strong className="font-semibold text-[var(--color-ink)]">
                    기반 기술과 연구
                </strong>
                를 다룹니다.
            </>
        ),
        industryItems: {
            "E-Commerce": [
                "상품 심사 자동화",
                "VOC 분석 및 응대",
                "가격 모니터링",
                "프로모션 최적화",
            ],
            "Public Sector": [
                "민원 상담 자동화",
                "행정 업무 지원",
                "정책·규정 검색",
                "공공 데이터 활용",
            ],
            Finance: [
                "여신 심사 지원",
                "계약서 검토",
                "이상 거래 탐지",
                "규제 준수 자동화",
            ],
            "IT Services": [
                "기술 문서 검색",
                "장애 분석",
                "운영 자동화",
                "코드 지원 Agent",
            ],
        },
        agentic: [
            {
                icon: Brain,
                title: "Planning & Reasoning",
                sub: "계획 · 추론",
                desc: "복잡한 목표를 실행 가능한 단계로 분해하고, 다단계로 추론해 스스로 작업을 설계합니다",
            },
            {
                icon: Users,
                title: "Multi-Agent Orchestration",
                sub: "다중 에이전트 협업",
                desc: "여러 에이전트가 역할을 나눠 협업하도록 조율하는 오케스트레이션을 연구합니다",
            },
            {
                icon: Cable,
                title: "Tool Use & MCP",
                sub: "도구 연동",
                desc: "외부 시스템·API·도구를 표준 프로토콜(MCP)로 안전하게 연결해 실제 업무를 수행합니다",
            },
            {
                icon: Database,
                title: "Memory & Knowledge",
                sub: "기억 · 지식 접지",
                desc: "장기 기억과 기업 지식에 접지(grounding)해 일관되고 근거 있는 행동을 보장합니다",
            },
            {
                icon: UserCheck,
                title: "Human-in-the-Loop & Governance",
                sub: "통제 · 거버넌스",
                desc: "승인 체계와 정책·안전 제어를 통해 통제 가능하고 신뢰할 수 있는 에이전트를 만듭니다",
            },
            {
                icon: Server,
                title: "Runtime & Reliability",
                sub: "런타임 · 신뢰성",
                desc: "운영 환경에서 끊김 없이 안정적으로 동작하는 에이전트 실행 런타임을 연구합니다",
            },
        ],
    },
    en: {
        heroLead:
            "We research and validate Enterprise AI that understands the work each industry actually does",
        heroDesc:
            "Finance, public sector, commerce, IT services — we study how AI has to change to fit each industry's workflows and regulations, then prove it through real PoCs and delivery projects",
        artIndustries: [
            "Finance",
            "Public",
            "Commerce",
            "Manufacturing",
            "Media",
            "Logistics",
            "Telecom",
            "IT Services",
        ],
        artProducts: ["XGEN", "Code Assistant", "Polar"],
        artAria:
            "Animation showing finance, public sector, commerce, manufacturing, media, logistics, telecom, and IT converging into Applied AI and flowing into the XGEN, Code Assistant, and Polar products",
        industriesLead:
            "Every industry works differently and is regulated differently. These are the Enterprise AI applications we have validated, organized by the context each one sits in.",
        industriesTitle: (
            <>
                By industry{" "}
                <span className="text-[var(--color-ink-subtle)]">Industries</span>
            </>
        ),
        caseNote:
            "See how these applications were actually built and operated in the field",
        caseCta: "Read the customer cases",
        agenticLead: (
            <>
                Plateer AI Labs works on the{" "}
                <strong className="font-semibold text-[var(--color-ink)]">
                    underlying technology and research
                </strong>{" "}
                that lets agents plan for themselves, collaborate,
                <br />
                handle tools, and run reliably in production.
            </>
        ),
        industryItems: {
            "E-Commerce": [
                "Automated product review",
                "VOC analysis and response",
                "Price monitoring",
                "Promotion optimization",
            ],
            "Public Sector": [
                "Automated citizen support",
                "Administrative assistance",
                "Policy and regulation search",
                "Public data utilization",
            ],
            Finance: [
                "Credit review support",
                "Contract review",
                "Anomalous transaction detection",
                "Automated regulatory compliance",
            ],
            "IT Services": [
                "Technical document search",
                "Incident analysis",
                "Operations automation",
                "Coding assistant agents",
            ],
        },
        agentic: [
            {
                icon: Brain,
                title: "Planning & Reasoning",
                sub: "Plan and reason",
                desc: "Breaking a complicated goal into steps that can actually run, and reasoning across those steps to design the work",
            },
            {
                icon: Users,
                title: "Multi-Agent Orchestration",
                sub: "Agents working together",
                desc: "Orchestration research on how several agents split roles and coordinate without stepping on each other",
            },
            {
                icon: Cable,
                title: "Tool Use & MCP",
                sub: "Tool integration",
                desc: "Connecting external systems, APIs, and tools through a standard protocol (MCP) so agents can do real work safely",
            },
            {
                icon: Database,
                title: "Memory & Knowledge",
                sub: "Memory and grounding",
                desc: "Grounding behavior in long-term memory and enterprise knowledge so decisions stay consistent and evidenced",
            },
            {
                icon: UserCheck,
                title: "Human-in-the-Loop & Governance",
                sub: "Control and governance",
                desc: "Approval flows plus policy and safety controls, so the agent stays governable and trustworthy",
            },
            {
                icon: Server,
                title: "Runtime & Reliability",
                sub: "Runtime and reliability",
                desc: "Research on an execution runtime that keeps agents running without interruption in production",
            },
        ],
    },
};

/** 산업별 적용 영역 — 아이콘·영문 제목은 두 언어 공통. */
const INDUSTRIES: { icon: LucideIcon; title: string; sub: string }[] = [
    { icon: ShoppingCart, title: "E-Commerce", sub: "AI Commerce Automation" },
    { icon: Landmark, title: "Public Sector", sub: "AI for Digital Government" },
    { icon: Banknote, title: "Finance", sub: "Trusted Financial AI" },
    { icon: Server, title: "IT Services", sub: "Enterprise AI Operations" },
];

function SolutionsHero({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
                <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                    Applied AI
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                    Applied AI by Industry
                </h1>
                <p className="mt-5 text-lg font-medium leading-relaxed text-white/85">
                    {t.heroLead}
                </p>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-white/65">
                    {t.heroDesc}
                </p>
            </div>
            <div className="hidden lg:block">
                <IndustryStreamsArt
                    accent="#5eead4"
                    accent2="#2f7bff"
                    industries={t.artIndustries}
                    products={t.artProducts}
                    ariaLabel={t.artAria}
                />
            </div>
        </div>
    );
}

function Industries({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div className="space-y-6">
            <p className="mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                {t.industriesLead}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
                {INDUSTRIES.map((ind) => (
                    <div
                        key={ind.title}
                        className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                    >
                        <div className="flex items-center justify-center gap-3">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <ind.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {ind.title}
                                </h3>
                                <p className="text-[13.5px] font-semibold text-[#2461d8]">
                                    {ind.sub}
                                </p>
                            </div>
                        </div>
                        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                            {t.industryItems[ind.title].map((it) => (
                                <li
                                    key={it}
                                    className="flex items-center gap-1.5 text-[14.5px] leading-snug text-[var(--color-ink-muted)]"
                                >
                                    <Check className="h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                    {it}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* 산업별 적용 영역 → 실제 구축·운영 고객사례 허브(/customers)로 연결 */}
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.caseNote}
                </p>
                <Link
                    href={localeHref(locale, "/customers")}
                    className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#2f7bff] px-5 py-2.5 text-[15px] font-semibold text-white transition hover:bg-[#2461d8]"
                >
                    {t.caseCta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}

/**
 * Agentic AI — 연구소는 '완성된 에이전트 제품'이 아니라, 에이전트를 신뢰성 있게
 * 만드는 기술·연구를 다룬다.
 */
function AgenticAI({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <p className="mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                {t.agenticLead}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
                {t.agentic.map((a) => (
                    <div
                        key={a.title}
                        className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-5 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                    >
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                            <a.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                            {a.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                            {a.sub}
                        </p>
                        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {a.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* 산업별 적용 — Agentic AI가 실제 투입되는 산업 (앵커 id: industries) */}
            <div
                id="industries"
                className="scroll-mt-24 border-t border-[var(--color-line)] pt-10"
            >
                <h3 className="text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                    {t.industriesTitle}
                </h3>
                <div className="mt-5">
                    <Industries locale={locale} />
                </div>
            </div>
        </div>
    );
}

export function SolutionsPageContent({ locale }: { locale: Locale }) {
    // 고객사례 섹션은 nav의 route(/customers)로 인해 원페이지에서 바로가기 인트로로
    // 렌더된다(GroupPage). 별도 콘텐츠를 주입하지 않는다.
    return (
        <GroupPage
            group={getGroup("solutions")!}
            locale={locale}
            hero={<SolutionsHero locale={locale} />}
            content={{
                "ai-agents": <AgenticAI locale={locale} />,
            }}
        />
    );
}
