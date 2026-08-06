import Link from "next/link";
import {
    ShieldCheck,
    Share2,
    CheckCircle2,
    Lock,
    Blocks,
    Scale,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { XgenPlatformArchitecture } from "@/components/xgen-platform-arch";
import { SecurityArchitecture } from "@/components/security-architecture";
import { LayerFlowArt } from "@/components/hero-layer-art";
import { XgenCicd } from "@/components/xgen-cicd";
import { CodeAssistantArchitecture } from "@/components/code-assistant-arch";
import { SectionIndex } from "@/components/section-index";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * Architecture — Enterprise AI 참조 아키텍처. 기반 → 설계 원칙 → 참조 아키텍처 →
 * 온프레미스·보안 → XGEN 플랫폼 → 코드 어시스턴트 → CI/CD.
 * 다이어그램 컴포넌트들은 각자 사전으로 이중언어를 처리하므로 locale만 넘긴다.
 */
interface ArchCopy {
    sections: { id: string; label: string }[];
    heroLead: string;
    heroDesc: string;
    heroLayers: { t: string; s: string }[];
    heroAria: string;
    foundationTitle: string;
    concepts: { icon: LucideIcon; lead: string; strong: string }[];
    principlesTitle: string;
    principlesLead: string;
    principles: { icon: LucideIcon; title: string; desc: string }[];
    referenceTitle: string;
    referenceLead: string;
    securityTitle: string;
    securityLead: string;
    securityCta: string;
    platformTitle: string;
    platformLead: string;
    platformNote: string;
    platformCta: string;
    caTitle: string;
    caLead: string;
    caCta: string;
    cicdTitle: string;
    cicdLead: string;
}

const COPY: Record<Locale, ArchCopy> = {
    ko: {
        sections: [
            { id: "foundation", label: "기반 아키텍처" },
            { id: "principles", label: "설계 원칙" },
            { id: "reference", label: "Enterprise AI 아키텍처" },
            { id: "security", label: "온프레미스·보안" },
            { id: "platform", label: "XGEN 플랫폼" },
            { id: "code-assistant", label: "코드 어시스턴트" },
            { id: "cicd", label: "CI/CD 배포" },
        ],
        heroLead: "신뢰할 수 있는 AI를 위한 엔터프라이즈 아키텍처",
        heroDesc:
            "데이터 주권 · 보안 · 거버넌스를 지키는 폐쇄망 · 온프레미스 설계, 지식 · 추론 · 실행 · 운영을 하나로 잇는 Enterprise AI",
        heroLayers: [
            { t: "접근 · 콘솔", s: "Access" },
            { t: "AI 런타임", s: "Runtime" },
            { t: "파운데이션 모델", s: "Model" },
            { t: "인프라", s: "Infra" },
        ],
        heroAria:
            "접근·런타임·모델·인프라 계층을 관통하는 Enterprise AI 아키텍처 애니메이션",
        foundationTitle: "데이터 주권과 AI Runtime을 위한 핵심 기반 아키텍처",
        concepts: [
            {
                icon: ShieldCheck,
                lead: "데이터 주권, 보안, 감사 추적, 조직 거버넌스를 보장하는",
                strong: "폐쇄망 · 온프레미스 친화 아키텍처",
            },
            {
                icon: Share2,
                lead: "지식 · 추론 · 실행 · 운영을 하나의 체계로 연결하는",
                strong: "Enterprise AI Runtime의 참조 아키텍처",
            },
        ],
        principlesTitle: "아키텍처 설계 원칙",
        principlesLead:
            "엔터프라이즈 환경에서 AI를 신뢰하고 운영하기 위해 모든 계층이 공유하는 네 가지 설계 기준입니다",
        principles: [
            {
                icon: CheckCircle2,
                title: "근거 기반 응답",
                desc: "기업이 보유한 문서·규정·지식 모델에 근거해 답변하고, 근거가 없으면 판단 불가를 선언해 환각을 최소화합니다",
            },
            {
                icon: Lock,
                title: "데이터 주권",
                desc: "클라우드 종속 없이 고객 인프라에서 운영하며, 금융·공공·제조의 망분리 환경까지 지원합니다",
            },
            {
                icon: Blocks,
                title: "조합 가능성",
                desc: "Agent · Workflow · Knowledge · Tool을 모듈화해 업무 목적에 따라 자유롭게 재조합합니다",
            },
            {
                icon: Scale,
                title: "모델 중립 · 거버넌스",
                desc: "목적·비용·정확도에 따라 LLM을 선택하고, 정책·승인·감사 추적으로 운영을 통제합니다",
            },
        ],
        referenceTitle: "Enterprise AI 아키텍처",
        referenceLead:
            "접근 채널부터 모델·인프라까지, 신뢰할 수 있는 Enterprise AI를 구성하는 전체 계층 구조",
        securityTitle: "온프레미스·보안 아키텍처",
        securityLead:
            "외부 요청은 인증 게이트웨이와 신뢰 경계를 통과한 뒤에만 내부 서비스와 AI 모델, 데이터에 접근할 수 있습니다. 모든 AI 모델과 데이터는 내부망에서 운영되며, 보안·권한·감사·거버넌스 정책이 전 계층에 일관되게 적용됩니다.",
        securityCta: "보안·거버넌스 통제 정책 자세히 보기",
        platformTitle: "XGEN 2.0 플랫폼 아키텍처",
        platformLead:
            "접근·콘솔부터 도메인·채널, 에이전트·응용, AI Platform 코어, RAG·지식, 파운데이션 모델, 인프라까지 — 전 계층을 관통하는 거버넌스·보안 위에서 동작하는 Enterprise AI 플랫폼",
        platformNote:
            "사용자·관리자·API 접근을 단일 콘솔로 통합하고, 워크플로우 캔버스·유닛 에이전트·MCP 도구·멀티에이전트 오케스트레이션이 AI 코어(LLMOps·MLOps·Model Router)와 하이브리드 RAG, 파운데이션 모델 위에서 협력합니다. Guardrail·RBAC/ABAC·감사로그·PII 비식별화 등 거버넌스가 전 계층을 크로스커팅하며, k3s·ArgoCD 기반으로 온프레미스·Air-gap 배포를 지원합니다.",
        platformCta: "XGEN 제품 보기",
        caTitle: "코드 어시스턴트 아키텍처",
        caLead:
            "자연어 질문 · 코드 검색 요청을 인덱싱과 하이브리드 검색, AI 재정렬로 처리해 근거 있는 코드 답변을 제공합니다",
        caCta: "AI Code Assistant 제품 보기",
        cicdTitle: "GitOps 배포 파이프라인",
        cicdLead:
            "소스 변경부터 운영 반영까지 — 컨테이너 이미지 빌드와 선언형 GitOps 동기화로 통제된 배포를 수행합니다",
    },
    en: {
        sections: [
            { id: "foundation", label: "Foundation" },
            { id: "principles", label: "Design principles" },
            { id: "reference", label: "Enterprise AI architecture" },
            { id: "security", label: "On-premise security" },
            { id: "platform", label: "XGEN platform" },
            { id: "code-assistant", label: "Code Assistant" },
            { id: "cicd", label: "CI/CD" },
        ],
        heroLead: "Enterprise architecture for AI you can trust",
        heroDesc:
            "An air-gap and on-premise design that holds data sovereignty, security, and governance — and an Enterprise AI that joins knowledge, reasoning, action, and operations into one system",
        heroLayers: [
            { t: "Access", s: "Access" },
            { t: "AI runtime", s: "Runtime" },
            { t: "Foundation model", s: "Model" },
            { t: "Infrastructure", s: "Infra" },
        ],
        heroAria:
            "Animation of the Enterprise AI architecture running through the access, runtime, model, and infrastructure layers",
        foundationTitle:
            "The foundation architecture behind data sovereignty and the AI runtime",
        concepts: [
            {
                icon: ShieldCheck,
                lead: "Holding data sovereignty, security, audit traceability, and organizational governance:",
                strong: "an air-gap and on-premise friendly architecture",
            },
            {
                icon: Share2,
                lead: "Connecting knowledge, reasoning, action, and operations into one system:",
                strong: "a reference architecture for the Enterprise AI runtime",
            },
        ],
        principlesTitle: "Architectural design principles",
        principlesLead:
            "Four design standards every layer shares, so AI can be trusted and operated in an enterprise environment",
        principles: [
            {
                icon: CheckCircle2,
                title: "Grounded answers",
                desc: "Answers rest on the documents, policies, and knowledge models the company holds. When the grounding isn't there, the system says so rather than guessing — which is what keeps hallucination down",
            },
            {
                icon: Lock,
                title: "Data sovereignty",
                desc: "Runs inside your own infrastructure with no cloud lock-in, including the network-separated environments in finance, public sector, and manufacturing",
            },
            {
                icon: Blocks,
                title: "Composability",
                desc: "Agents, workflows, knowledge, and tools are modules you recombine freely as the work demands",
            },
            {
                icon: Scale,
                title: "Model neutrality and governance",
                desc: "Choose an LLM by purpose, cost, and accuracy, and keep operations under control through policy, approval, and audit trails",
            },
        ],
        referenceTitle: "Enterprise AI architecture",
        referenceLead:
            "The full layer structure of a trustworthy Enterprise AI, from access channels down to models and infrastructure",
        securityTitle: "On-premise and security architecture",
        securityLead:
            "An external request reaches internal services, AI models, and data only after passing the authentication gateway and the trust boundary. Every AI model and every piece of data stays on the internal network, with security, permission, audit, and governance policies applied consistently across all layers.",
        securityCta: "More on security and governance controls",
        platformTitle: "XGEN 2.0 platform architecture",
        platformLead:
            "From access and console through domain and channel, agents and applications, the AI platform core, RAG and knowledge, foundation models, and infrastructure — an Enterprise AI platform running on governance and security that cut across every layer",
        platformNote:
            "User, admin, and API access converge into a single console. The workflow canvas, unit agents, MCP tools, and multi-agent orchestration work together on top of the AI core (LLMOps, MLOps, Model Router), hybrid RAG, and foundation models. Governance — guardrails, RBAC/ABAC, audit logs, PII de-identification — cuts across every layer, and k3s with ArgoCD supports on-premise and air-gapped deployment.",
        platformCta: "See the XGEN product",
        caTitle: "Code Assistant architecture",
        caLead:
            "Natural-language questions and code searches run through indexing, hybrid retrieval, and AI reranking to produce a code answer with evidence behind it",
        caCta: "See the AI Code Assistant product",
        cicdTitle: "GitOps deployment pipeline",
        cicdLead:
            "From source change to production — container image builds and declarative GitOps sync make each deployment a controlled one",
    },
};

/** 한국어 섹션 라벨 — GNB 서브메뉴가 참조한다(기존 export 유지). */
export const ARCH_SECTIONS = COPY.ko.sections;

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-center font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
            {children}
        </p>
    );
}

export function ArchitecturePageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const self = locale === "en" ? "/en/architecture" : "/architecture";

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: home },
                    { name: "Architecture", path: self },
                ])}
            />
            <section className="relative flex min-h-[560px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="architecture" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="max-w-3xl">
                            <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                                Architecture
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                                Enterprise AI Architecture
                            </h1>
                            <p className="mt-5 text-xl font-semibold leading-relaxed text-white">
                                {t.heroLead}
                            </p>
                            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">
                                {t.heroDesc}
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <LayerFlowArt
                                accent="#7dd3fc"
                                accent2="#2f7bff"
                                layers={t.heroLayers}
                                ariaLabel={t.heroAria}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <SectionIndex sections={t.sections} />

            <main>
                {/* 신뢰 컨셉 — 2-card (콘텐츠 시작) */}
                <section
                    id="foundation"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-b border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="mx-auto max-w-3xl text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.foundationTitle}
                        </h2>
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {t.concepts.map((c) => (
                                <div
                                    key={c.strong}
                                    className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <p className="text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.lead}
                                        <br />
                                        <span className="font-bold text-[var(--color-ink)]">
                                            {c.strong}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 설계 원칙 */}
                <section
                    id="principles"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>/ Design Principles</Eyebrow>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.principlesTitle}
                        </h2>
                        <p className="mt-3 mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.principlesLead}
                        </p>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {t.principles.map((p) => (
                                <div
                                    key={p.title}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <p.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 참조 아키텍처 다이어그램 */}
                <section
                    id="reference"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>/ Reference Architecture</Eyebrow>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.referenceTitle}
                        </h2>
                        <p className="mt-3 mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.referenceLead}
                        </p>
                        <div className="mx-auto mt-8 max-w-5xl">
                            <ArchitectureDiagram locale={locale} />
                        </div>
                    </div>
                </section>

                {/* 온프레미스·보안 아키텍처 — 신뢰 경계 기반 제로트러스트 */}
                <section
                    id="security"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>/ On-Premise Security</Eyebrow>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.securityTitle}
                        </h2>
                        <p className="mt-3 mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.securityLead}
                        </p>
                        <div className="mx-auto mt-8 max-w-5xl">
                            <SecurityArchitecture locale={locale} />
                        </div>
                        <Link
                            href={localeHref(locale, "/security-and-governance")}
                            className="group ml-auto mt-8 flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            {t.securityCta}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* XGEN 2.0 플랫폼 아키텍처 (공개-안전 구성) */}
                <section
                    id="platform"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>/ XGEN Platform</Eyebrow>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.platformTitle}
                        </h2>
                        <p className="mt-3 mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.platformLead}
                        </p>
                        <div className="mx-auto mt-8 max-w-5xl">
                            <XgenPlatformArchitecture locale={locale} />
                        </div>
                        <p className="mx-auto mt-6 max-w-5xl text-[14px] leading-relaxed text-[var(--color-ink-subtle)]">
                            {t.platformNote}
                        </p>
                        <Link
                            href={localeHref(locale, "/product")}
                            className="group ml-auto mt-8 flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            {t.platformCta}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* 코드 어시스턴트 아키텍처 (공개-안전 구성) */}
                <section
                    id="code-assistant"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>/ Code Assistant</Eyebrow>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.caTitle}
                        </h2>
                        <p className="mt-3 mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.caLead}
                        </p>
                        <div className="mx-auto mt-8 max-w-5xl">
                            <CodeAssistantArchitecture locale={locale} />
                        </div>
                        <Link
                            href={localeHref(locale, "/code-assistant")}
                            className="group ml-auto mt-8 flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            {t.caCta}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* CI/CD — GitOps 배포 파이프라인 (공개-안전 구성) */}
                <section
                    id="cicd"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>/ CI/CD</Eyebrow>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.cicdTitle}
                        </h2>
                        <p className="mt-3 mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.cicdLead}
                        </p>
                        <div className="mx-auto mt-8 max-w-5xl">
                            <XgenCicd locale={locale} />
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
