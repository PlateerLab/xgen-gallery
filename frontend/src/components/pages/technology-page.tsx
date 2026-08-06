import Link from "next/link";
import { Settings2, ShieldCheck, Network, Layers, ArrowRight } from "lucide-react";
import { GroupPage } from "@/components/onepage";
import {
    EnginesContent,
    FrameworksContent,
} from "@/components/technology-sections";
import { getGroup } from "@/lib/nav";
import { LayerFlowArt } from "@/components/hero-layer-art";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * Technology 원페이지 — Engines · Frameworks · Architecture.
 * 한국어(`/technology`)와 영어(`/en/technology`)가 이 컴포넌트를 공유한다.
 * 섹션 본문은 technology-sections.tsx가 자체 사전으로 이중언어를 처리한다.
 */
const COPY: Record<
    Locale,
    {
        heroLead: string;
        heroDesc: string;
        ctaArch: string;
        ctaProduct: string;
        stack: { layer: string; en: string }[];
        stackAria: string;
        marketingTitle: React.ReactNode;
        marketingDesc: string;
        values: { icon: typeof Settings2; title: string; en: string; desc: string }[];
        archLead: string;
        archCta: string;
        archLayers: { label: string; en: string; desc: string; href: string }[];
    }
> = {
    ko: {
        heroLead: "Enterprise AI를 운영하는 기술을 만듭니다",
        heroDesc:
            "Agentic AI, Knowledge Graph, MCP, Runtime, AgenticOps까지, 기업 환경에서 실제 운영 가능한 핵심 엔진과 프레임워크를 연구하고 설계합니다.",
        ctaArch: "플랫폼 아키텍처 보기",
        ctaProduct: "제품으로 확인하기",
        stack: [
            { layer: "핵심 기술", en: "Core" },
            { layer: "프레임워크", en: "Frameworks" },
            { layer: "엔진", en: "Engines" },
            { layer: "런타임", en: "Runtime" },
        ],
        stackAria:
            "핵심 기술·프레임워크·엔진·런타임 계층을 관통하는 XGEN 기술 스택 애니메이션",
        marketingTitle: (
            <>
                연구에서 검증하고,
                <br />
                <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                    운영으로 완성하는
                </span>{" "}
                Enterprise AI 기술
            </>
        ),
        marketingDesc:
            "화려한 데모가 아닌, 기업의 보안·규제·운영 환경에서 실제로 작동하는 기술을 연구합니다. 핵심 엔진부터 프레임워크와 런타임까지 하나의 기술 스택으로 연결하여, 연구 성과가 제품을 거쳐 고객 현장의 성과로 이어지도록 만듭니다.",
        values: [
            {
                icon: Settings2,
                title: "운영 가능성",
                en: "Operable",
                desc: "PoC를 넘어 실제 기업 환경에서 안정적으로 운영되는 AgenticOps 기반 기술",
            },
            {
                icon: ShieldCheck,
                title: "벤더 독립",
                en: "Independent",
                desc: "특정 모델·클라우드에 종속되지 않는 온프레미스·Model-Agnostic 설계",
            },
            {
                icon: Network,
                title: "지식 연결",
                en: "Connected",
                desc: "Ontology·Knowledge Graph·GraphRAG로 사내 지식을 정밀하게 연결",
            },
            {
                icon: Layers,
                title: "유연한 확장",
                en: "Extensible",
                desc: "MCP 런타임과 Runtime SDK·API로 도구·에이전트를 자유롭게 확장",
            },
        ],
        archLead:
            "신뢰할 수 있는 Enterprise AI는 모델이 아니라 아키텍처에서 나옵니다. XGEN은 기반 인프라부터 설계 원칙, 참조 아키텍처, 플랫폼 구조까지 하나의 청사진으로 정의해 실제 기업 환경에 안전하게 이식됩니다",
        archCta: "아키텍처 자세히 보기",
        archLayers: [
            {
                label: "기반 아키텍처",
                en: "Foundation",
                desc: "온프레미스·망분리까지 지원하는 인프라·데이터 계층",
                href: "/architecture#foundation",
            },
            {
                label: "설계 원칙",
                en: "Design Principles",
                desc: "보안·거버넌스·확장성을 관통하는 설계 기준",
                href: "/architecture#principles",
            },
            {
                label: "참조 아키텍처",
                en: "Reference",
                desc: "기업 도입에 바로 적용하는 Enterprise AI 청사진",
                href: "/architecture#reference",
            },
            {
                label: "XGEN 플랫폼",
                en: "Platform",
                desc: "엔진·프레임워크·런타임을 잇는 플랫폼 구조",
                href: "/architecture#platform",
            },
        ],
    },
    en: {
        heroLead: "We build the technology that keeps Enterprise AI running",
        heroDesc:
            "Agentic AI, knowledge graphs, MCP, runtime, AgenticOps — we research and design the core engines and frameworks that hold up in a real enterprise environment.",
        ctaArch: "See the platform architecture",
        ctaProduct: "See it in the product",
        stack: [
            { layer: "Core", en: "Core" },
            { layer: "Frameworks", en: "Frameworks" },
            { layer: "Engines", en: "Engines" },
            { layer: "Runtime", en: "Runtime" },
        ],
        stackAria:
            "Animation of the XGEN technology stack running through the core, framework, engine, and runtime layers",
        marketingTitle: (
            <>
                Proven in research,
                <br />
                <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                    finished in operation
                </span>
            </>
        ),
        marketingDesc:
            "Not demo-ware — technology that works inside the security, regulatory, and operational constraints enterprises actually have. Core engines, frameworks, and runtime connect into one stack, so a research result travels through the product and lands as a result in the field.",
        values: [
            {
                icon: Settings2,
                title: "Operable",
                en: "Operable",
                desc: "AgenticOps-based technology that runs steadily in a real enterprise environment, past the PoC stage",
            },
            {
                icon: ShieldCheck,
                title: "Vendor-independent",
                en: "Independent",
                desc: "On-premise, model-agnostic design with no lock-in to a particular model or cloud",
            },
            {
                icon: Network,
                title: "Connected knowledge",
                en: "Connected",
                desc: "Ontology, knowledge graph, and GraphRAG connecting internal knowledge precisely",
            },
            {
                icon: Layers,
                title: "Extensible",
                en: "Extensible",
                desc: "The MCP runtime plus Runtime SDK and API let you extend tools and agents freely",
            },
        ],
        archLead:
            "Trustworthy Enterprise AI comes from the architecture, not the model. XGEN defines one blueprint — from base infrastructure through design principles, reference architecture, and platform structure — so it transplants safely into a real enterprise environment",
        archCta: "Explore the architecture",
        archLayers: [
            {
                label: "Foundation",
                en: "Foundation",
                desc: "The infrastructure and data layer, including on-premise and network-separated deployments",
                href: "/architecture#foundation",
            },
            {
                label: "Design principles",
                en: "Design Principles",
                desc: "The design standards running through security, governance, and scalability",
                href: "/architecture#principles",
            },
            {
                label: "Reference architecture",
                en: "Reference",
                desc: "An Enterprise AI blueprint you can apply directly to a rollout",
                href: "/architecture#reference",
            },
            {
                label: "XGEN platform",
                en: "Platform",
                desc: "The platform structure connecting engines, frameworks, and runtime",
                href: "/architecture#platform",
            },
        ],
    },
};

function TechnologyHero({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
                <p className="text-[16px] font-semibold tracking-tight text-[#67e8f9]">
                    Technology
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                    Enterprise AI, Engineered for Reality
                </h1>
                <p className="mt-5 text-lg font-medium leading-relaxed text-white/85">
                    {t.heroLead}
                </p>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-white/65">
                    {t.heroDesc}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href={localeHref(locale, "/architecture")}
                        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                    >
                        {t.ctaArch}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href={localeHref(locale, "/product")}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                    >
                        {t.ctaProduct}
                    </Link>
                </div>
            </div>

            {/* 기술 스택 레이어 키비주얼 — 데이터가 계층을 관통하는 애니메이션 */}
            <div className="hidden lg:block">
                <LayerFlowArt
                    accent="#67e8f9"
                    accent2="#2f7bff"
                    layers={t.stack.map((s) => ({ t: s.layer, s: s.en }))}
                    ariaLabel={t.stackAria}
                />
            </div>
        </div>
    );
}

/** 기술 전체를 아우르는 마케팅 밴드 — 운영·독립·연결·확장 4가치. */
function TechnologyMarketing({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-24">
                <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-[1.25] tracking-tight text-[var(--color-ink)] md:text-[40px]">
                    {t.marketingTitle}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.marketingDesc}
                </p>

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {t.values.map((v) => (
                        <div
                            key={v.en}
                            className="rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#2f7bff]/40"
                        >
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <v.icon className="h-[20px] w-[20px]" />
                            </span>
                            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                {v.en}
                            </p>
                            <h3 className="mt-1 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {v.title}
                            </h3>
                            <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** Architecture 섹션 — 링크아웃 대신 맥락 있는 요약 + 아키텍처 페이지 딥링크. */
function ArchitectureContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
                <p className="max-w-md text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.archLead}
                </p>
                <Link
                    href={localeHref(locale, "/architecture")}
                    className="group mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--color-ink)] px-4 py-2.5 text-[16px] font-semibold text-white transition hover:opacity-90"
                >
                    {t.archCta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {t.archLayers.map((a) => (
                    <Link
                        key={a.en}
                        href={localeHref(locale, a.href)}
                        className="group rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[#2f7bff]/40 hover:shadow-[0_12px_30px_-16px_rgba(20,40,80,0.35)]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                {a.en}
                            </span>
                            <ArrowRight className="h-4 w-4 text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#2f7bff]" />
                        </div>
                        <h3 className="mt-2 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                            {a.label}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {a.desc}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function TechnologyPageContent({ locale }: { locale: Locale }) {
    // Research는 별도 페이지(/research)로 유지하되, 기술 원페이지에서는 링크아웃
    // 섹션을 빼고 기술 전체를 아우르는 마케팅 밴드로 마무리한다.
    return (
        <GroupPage
            group={getGroup("technology")!}
            locale={locale}
            hero={<TechnologyHero locale={locale} />}
            content={{
                engines: <EnginesContent locale={locale} />,
                frameworks: <FrameworksContent locale={locale} />,
                architecture: <ArchitectureContent locale={locale} />,
            }}
            hideSections={["research"]}
            leading={<TechnologyMarketing locale={locale} />}
        />
    );
}
