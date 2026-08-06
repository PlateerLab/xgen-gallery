import Link from "next/link";
import {
    Compass,
    Network,
    FlaskConical,
    ShieldCheck,
    Banknote,
    Landmark,
    ShoppingCart,
    Factory,
    Server,
    Check,
    ChevronRight,
    ArrowRight,
    UsersRound,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";

import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 기술 컨설팅 — 한국어(`/technical-consulting`)와 영어(`/en/...`)가 공유한다.
 * 서비스 영문명(en)·프로세스 단계는 고유 표기라 두 언어 공통.
 */
const SERVICE_ICONS: LucideIcon[] = [Compass, Network, FlaskConical, ShieldCheck];
const INDUSTRY_ICONS: LucideIcon[] = [Banknote, Landmark, ShoppingCart, Factory, Server];
const INDUSTRY_NAMES = ["Finance", "Public Sector", "Commerce", "Manufacturing", "IT Services"];
const SERVICE_EN = [
    "AI Strategy & Assessment",
    "AI Architecture Consulting",
    "PoC & Validation",
    "AI Governance",
];
const PROCESS = [
    "Business Discovery",
    "AI Readiness Assessment",
    "Technology Consulting",
    "Architecture Design",
    "PoC Validation",
    "Deployment Strategy",
];

interface TcCopy {
    ldDescription: string;
    services: { ko: string; desc: string; items: string[] }[];
    industries: string[];
    heroTitle: string;
    heroLead: string;
    heroTag: string;
    ctaHero: string;
    ctaServices: string;
    servicesTitle: string;
    fdeTitle: string;
    fdeLeadA: string;
    fdeLeadB: string;
    industriesTitle: string;
    closingTitle: string;
    closingLead: string;
    closingCta: string;
}

const COPY: Record<Locale, TcCopy> = {
    ko: {
        ldDescription:
            "AI 전략 수립, 아키텍처 설계, PoC 검증, AI 거버넌스 등 연구 기반 Enterprise AI 기술 컨설팅.",
        services: [
            {
                ko: "Enterprise AI 전략 수립",
                desc: "AI 도입 목표와 비즈니스 과제를 분석하고, 조직에 적합한 AI 활용 전략과 우선순위를 제안합니다.",
                items: ["AI 도입 전략 수립", "업무 과제 발굴", "ROI 분석", "기술 적합성 평가"],
            },
            {
                ko: "Enterprise AI 아키텍처 설계",
                desc: "기업 환경에 적합한 AI 플랫폼과 운영 구조를 설계합니다.",
                items: [
                    "Enterprise AI Architecture",
                    "LLM & RAG Architecture",
                    "On-Premise AI",
                    "Multi-LLM 설계",
                    "MCP Integration",
                    "Data Architecture",
                ],
            },
            {
                ko: "PoC 설계 및 기술 검증",
                desc: "도입 이전 단계에서 기술의 적합성과 성능을 검증하여 사업 리스크를 최소화합니다.",
                items: ["PoC 설계", "Benchmark", "성능 평가", "정확도 검증", "비용 분석", "운영성 검토"],
            },
            {
                ko: "AI 운영 및 거버넌스",
                desc: "Enterprise AI 운영에 필요한 보안과 관리 체계를 설계합니다.",
                items: [
                    "AI Governance",
                    "Prompt Governance",
                    "Security Compliance",
                    "Audit Trail",
                    "AI Risk Management",
                ],
            },
        ],
        industries: [
            "여신심사 · 규제준수 · 계약서 분석 · 금융 RAG",
            "민원 상담 · 행정 AI · 정책 검색 · 문서 지식화",
            "상품 심사 · VOC 분석 · 가격 모니터링 · 추천",
            "품질 검사 · 설비 분석 · 예지보전 · 생산 지식 검색",
            "개발 생산성 · 운영 자동화 · 기술 문서 검색",
        ],
        heroTitle: "Enterprise AI의 성공은 올바른 기술 전략에서 시작됩니다",
        heroLead:
            "기업의 업무 환경과 기술 요구사항을 분석하여, AI 도입 전략부터 PoC, 아키텍처 설계, 운영 체계까지 Enterprise AI 구축 전 과정을 함께 설계합니다",
        heroTag: "연구로 검증하고, PoC로 입증합니다",
        ctaHero: "기술 상담 신청하기",
        ctaServices: "핵심 서비스 보기",
        servicesTitle: "핵심 서비스",
        fdeTitle: "현장 FDE가 함께합니다",
        fdeLeadA: "사업 수행 과정에 현장 밀착형 AI 전문 기술 인력인 ",
        fdeLeadB:
            "를 배치합니다. FDE는 현업 요구사항 발굴, AI 에이전트 설계와 구현, 고객사 내재화 과정을 지원해 아래 핵심 서비스가 현장에서 실제로 작동하도록 만듭니다.",
        industriesTitle: "산업별 컨설팅",
        closingTitle: "연구로 검증하고, PoC로 입증합니다",
        closingLead:
            "제품을 판매하기 위한 컨설팅이 아니라, 기술을 검증하고 고객에게 가장 적합한 Enterprise AI 아키텍처를 설계하는 연구 기반 컨설팅입니다. 도입 전략부터 기술 검증, 아키텍처 설계, 운영 체계 수립까지 Plateer Labs의 기술 전문성으로 함께합니다.",
        closingCta: "PoC · 기술 컨설팅 문의",
    },
    en: {
        ldDescription:
            "Research-based Enterprise AI technical consulting — AI strategy, architecture design, PoC validation, and AI governance.",
        services: [
            {
                ko: "Enterprise AI strategy",
                desc: "We analyze your adoption goals and business problems, then propose an AI strategy and a priority order that fit the organization.",
                items: ["Adoption strategy", "Identifying the work to target", "ROI analysis", "Technical fit assessment"],
            },
            {
                ko: "Enterprise AI architecture design",
                desc: "We design the AI platform and operating structure that fit your enterprise environment.",
                items: [
                    "Enterprise AI Architecture",
                    "LLM & RAG Architecture",
                    "On-Premise AI",
                    "Multi-LLM design",
                    "MCP Integration",
                    "Data Architecture",
                ],
            },
            {
                ko: "PoC design and technical validation",
                desc: "Before you commit, we validate technical fit and performance to take risk out of the project.",
                items: ["PoC design", "Benchmarking", "Performance evaluation", "Accuracy validation", "Cost analysis", "Operability review"],
            },
            {
                ko: "AI operations and governance",
                desc: "We design the security and management structure that running Enterprise AI requires.",
                items: [
                    "AI Governance",
                    "Prompt Governance",
                    "Security Compliance",
                    "Audit Trail",
                    "AI Risk Management",
                ],
            },
        ],
        industries: [
            "Credit review · compliance · contract analysis · financial RAG",
            "Citizen support · administrative AI · policy search · document knowledge",
            "Product review · VOC analysis · price monitoring · recommendation",
            "Quality inspection · equipment analysis · predictive maintenance · production knowledge",
            "Developer productivity · operations automation · technical document search",
        ],
        heroTitle: "Enterprise AI succeeds or fails on the technical strategy behind it",
        heroLead:
            "We analyze your working environment and technical requirements, then design the whole path with you — adoption strategy, PoC, architecture, and the operating model",
        heroTag: "Validated in research, proven in PoC",
        ctaHero: "Request a consultation",
        ctaServices: "See the services",
        servicesTitle: "Core services",
        fdeTitle: "Forward Deployed Engineers work alongside you",
        fdeLeadA: "We place ",
        fdeLeadB:
            " — AI specialists embedded on site — into the engagement. They support requirement discovery, agent design and implementation, and the handover into your team, so the services below actually work in the field.",
        industriesTitle: "Consulting by industry",
        closingTitle: "Validated in research, proven in PoC",
        closingLead:
            "This is not consulting that exists to sell a product. It is research-based work that validates the technology and designs the Enterprise AI architecture best suited to you — from adoption strategy through technical validation, architecture design, and the operating model, backed by the engineering depth of Plateer Labs.",
        closingCta: "Ask about a PoC or consulting",
    },
};

export function TechnicalConsultingPageContent({
    locale,
}: {
    locale: Locale;
}) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const SERVICES = t.services.map((sv, i) => ({
        icon: SERVICE_ICONS[i],
        en: SERVICE_EN[i],
        ko: sv.ko,
        desc: sv.desc,
        items: sv.items,
    }));
    const INDUSTRIES: [LucideIcon, string, string][] = INDUSTRY_ICONS.map(
        (icon, i) => [icon, INDUSTRY_NAMES[i], t.industries[i]],
    );
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Technical Consulting",
                        serviceType: "Enterprise AI Technical Consulting",
                        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        areaServed: "KR",
                        description:
                            t.ldDescription,
                    },
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Applied AI", path: "/solutions" },
                        { name: "Technical Consulting", path: "/technical-consulting" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Applied AI · Technical Consulting
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.heroTitle}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        {t.heroLead}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {t.heroTag}
                    </span>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={localeHref(locale, "/contact") + "?type=poc&from=technical-consulting"}
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            {t.ctaHero}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href="#core-services"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            {t.ctaServices}
                        </a>
                    </div>
                </div>
            </section>

            <main>
                {/* 핵심 서비스 */}
                <section
                    id="core-services"
                    className="scroll-mt-[100px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Core Services
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.servicesTitle}
                        </h2>

                        {/* FDE — 현장 밀착형 전달 모델 */}
                        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-[#bcd0f5] bg-[#f1f6ff] p-6 text-center md:p-7">
                            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#2f7bff] text-white">
                                <UsersRound className="h-6 w-6" />
                            </span>
                            <div>
                                <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.fdeTitle}
                                </h3>
                                <p className="mx-auto mt-2 max-w-3xl text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.fdeLeadA}
                                    <span className="font-semibold text-[var(--color-ink)]">
                                        FDE(Forward Deployed Engineer)
                                    </span>
                                    {t.fdeLeadB}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {SERVICES.map((s) => (
                                <div
                                    key={s.en}
                                    className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <s.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {s.en}
                                            </h3>
                                            <p className="text-[13.5px] font-semibold text-[#2461d8]">
                                                {s.ko}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {s.desc}
                                    </p>
                                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                                        {s.items.map((it) => (
                                            <li
                                                key={it}
                                                className="flex items-center gap-1.5 text-[14px] leading-snug text-[var(--color-ink-muted)]"
                                            >
                                                <Check className="h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Consulting Framework */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Consulting Framework
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            Enterprise AI Consulting Process
                        </h2>
                        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-[repeat(6,1fr)] sm:items-stretch">
                            {PROCESS.map((step, i) => (
                                <div
                                    key={step}
                                    className="flex items-center gap-2 sm:flex-col sm:items-stretch sm:gap-0"
                                >
                                    <div className="flex flex-1 flex-col items-center rounded-xl border border-[var(--color-line)] bg-white p-4 text-center">
                                        <span className="font-mono text-[13px] font-bold text-[#2461d8]">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="mt-1.5 text-[14px] font-semibold leading-snug text-[var(--color-ink)]">
                                            {step}
                                        </span>
                                    </div>
                                    {i < PROCESS.length - 1 && (
                                        <ChevronRight className="h-4 w-4 shrink-0 rotate-90 self-center text-[var(--color-ink-subtle)] sm:hidden" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 산업별 컨설팅 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            By Industry
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.industriesTitle}
                        </h2>
                        <div className="mx-auto mt-8 max-w-3xl divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
                            {INDUSTRIES.map(([Icon, name, desc]) => (
                                <div
                                    key={name}
                                    className="flex flex-col gap-2 bg-white px-6 py-5 sm:flex-row sm:items-center sm:gap-6"
                                >
                                    <div className="flex w-44 shrink-0 items-center gap-3">
                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <span className="text-[16px] font-bold text-[var(--color-ink)]">
                                            {name}
                                        </span>
                                    </div>
                                    <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 차별화 + CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-white/45">
                            Research-driven Consulting
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-[40px]">
                            {t.closingTitle}
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            {t.closingLead}
                        </p>
                        <Link
                            href={localeHref(locale, "/contact") + "?from=technical-consulting"}
                            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            {t.closingCta}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
