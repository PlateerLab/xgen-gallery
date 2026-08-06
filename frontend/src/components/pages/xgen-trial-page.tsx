import Link from "next/link";
import {
    Cable,
    Boxes,
    Activity,
    Cpu,
    MousePointerClick,
    RefreshCw,
    Puzzle,
    FileText,
    Wrench,
    Database,
    ShieldCheck,
    Check,
    Monitor,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { AgentBuilderMockup } from "@/components/xgen-trial-art";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * XGEN 무료 체험(Trial) 페이지 — xgen.im/trial 콘텐츠를 연구소 사이트 룩앤필로 재구성.
 * 홈 Live Demo 카드와 Applied AI 드롭다운의 "XGEN Agentic Platform 체험하기"가 이 내부
 * 페이지로 라우팅된다. 체험 신청은 내부 모달 폼(TrialSignupForm)으로 접수한다.
 */
/** XGEN 3단계 — 연동 · 설계 · 운영. */
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const PILLAR_ICONS: LucideIcon[] = [Cable, Boxes, Activity];
const PILLAR_EN = ["Connect", "Build", "Operate"];
const AUDIENCE_ICONS: LucideIcon[] = [Boxes, MousePointerClick, Activity, FileText];
const FEATURE_ICONS: LucideIcon[] = [
    Cpu, MousePointerClick, RefreshCw, Puzzle, FileText, Wrench, Database, ShieldCheck,
];

interface TrialCopy {
    ldName: string;
    ldDescription: string;
    breadcrumb: string;
    pillars: [string, string][];
    audience: [string, string][];
    features: [string, string][];
    steps: string[];
    faq: { q: string; a: string }[];
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    ctaApply: string;
    ctaConsult: string;
    heroChips: string[];
    pillarsTitle: string;
    pillarsLead: string;
    audienceTitle: string;
    audienceLead: string;
    featuresTitle: string;
    featuresLead: string;
    stepsTitle: string;
    pcNote: string;
    faqTitle: string;
    closingTitle: string;
    closingLead: string;
    closingCta: string;
}

const COPY: Record<Locale, TrialCopy> = {
    ko: {
        ldName: "XGEN 15일 무료 체험",
        ldDescription:
            "XGEN Agentic AI 플랫폼의 15일 무료 데모 체험. 데이터 연동·노코드 에이전트 빌드·RAG·MCP·거버넌스를 직접 경험한다.",
        breadcrumb: "XGEN 무료 체험",
        pillars: [
            ["연동", "기업 데이터와 내부 시스템을 XGEN에 연결해 AI가 실제 업무 맥락을 이해하게 합니다."],
            ["설계", "코드 없이 드래그 앤 드롭으로 업무에 맞는 맞춤형 AI Agent를 직접 만듭니다."],
            ["운영", "만든 에이전트를 한 곳에서 통합 관리하고, 거버넌스·보안 아래 안정적으로 운영합니다."],
        ],
        audience: [
            ["플랫폼 역량을 확인하려는 팀", "플랫폼 기반으로 에이전트를 어디까지 만들 수 있는지 직접 만들어 보며 확인합니다"],
            ["직접 써보고 판단하려는 팀", "벤더의 설명이 아니라 실제 환경에서 사용해 보고 활용성을 스스로 평가합니다"],
            ["도입 ROI를 가늠하려는 팀", "전사 도입 전 소규모 실험으로 효과와 투자 대비 성과를 미리 예측합니다"],
            ["내부 실증 자료가 필요한 팀", "내부 보고와 의사결정을 뒷받침할 실증 근거를 체험 결과로 확보합니다"],
        ],
        features: [
            ["모델 훈련 및 최적화", "업무 데이터로 모델을 Fine-tuning해 도메인에 최적화"],
            ["드래그 앤 드롭 에이전트 빌드", "코드 없이 노코드로 에이전트를 구성"],
            ["피드백 루프 기반 고도화", "사용 피드백을 반영해 모델을 지속 개선"],
            ["브라우저 확장 에이전트 빌드", "브라우저 확장으로 현업 화면에서 바로 에이전트 활용"],
            ["문서 처리 · 의미 구조화", "문서를 이해하고 의미 기반으로 구조화"],
            ["Tool 확장 (MCP 변환)", "내부 도구·API를 MCP로 변환해 에이전트에 연결"],
            ["지식 베이스 관리 (RAG)", "기업 지식을 접지해 근거 있는 답변 생성"],
            ["AI 거버넌스 & 보안", "정책·감사·보안 통제로 안전하게 운영"],
        ],
        steps: [
            "신청 양식 제출",
            "안내 메일 및 사용 가이드 수신",
            "할당된 계정으로 솔루션 접속",
            "15일간 XGEN 무료 Trial 시작",
        ],
        faq: [
            { q: "체험 비용이 있나요?", a: "아니요. 15일간 무료로 XGEN 데모 환경을 사용할 수 있습니다." },
            { q: "어떤 환경에서 사용하나요?", a: "XGEN 체험 데모 환경은 PC에서만 사용할 수 있습니다." },
            { q: "어떻게 시작하나요?", a: "신청 양식을 제출하면 안내 메일과 사용 가이드, 접속 계정을 보내드립니다. 할당된 계정으로 데모 환경에 접속해 15일 무료 Trial을 시작합니다." },
            { q: "체험에서 어떤 기능을 써볼 수 있나요?", a: "데이터 연동, 노코드 에이전트 빌드, RAG 지식베이스, MCP 도구 확장, Fine-tuning, AI 거버넌스·보안 등 XGEN의 핵심 기능을 직접 사용해볼 수 있습니다." },
        ],
        heroEyebrow: "XGEN · 무료 체험",
        heroTitle: "아이디어를 나만의 AI Agent로 만들어보세요",
        heroLead:
            "데이터 연결부터 맞춤형 AI Agent 구현, 실제 운영까지 — 15일 무료 데모 환경에서 직접 경험할 수 있습니다.",
        ctaApply: "15일 무료 체험 신청하기",
        ctaConsult: "도입·PoC 상담",
        heroChips: ["15일 완전 무료", "설치 없이 웹에서", "노코드로 바로 시작"],
        pillarsTitle: "기업 데이터로 맞춤형 AI Agent를 만들고 한 곳에서 운영합니다",
        pillarsLead:
            "XGEN은 기업 데이터 기반 맞춤형 AI Agent를 개발하고 통합 관리할 수 있는 Agentic AI 플랫폼입니다. 연동 · 설계 · 운영의 세 단계로 이어집니다.",
        audienceTitle: "이런 기업에 추천합니다",
        audienceLead:
            "도입을 검토 중이라면, 설명을 듣기 전에 직접 만들어 보고 판단하세요. 다음과 같은 팀에 특히 잘 맞습니다.",
        featuresTitle: "체험에서 직접 써보는 핵심 기능",
        featuresLead:
            "데이터 연동부터 에이전트 빌드, 지식베이스, 거버넌스까지 XGEN의 핵심 기능을 데모 환경에서 그대로 사용해봅니다.",
        stepsTitle: "신청부터 시작까지, 4단계",
        pcNote: "XGEN 체험 데모 환경은 PC에서만 사용할 수 있습니다",
        faqTitle: "자주 묻는 질문",
        closingTitle: "지금 15일 무료로 시작하세요",
        closingLead:
            "신청 양식만 제출하면 계정과 가이드를 보내드립니다. 설치 없이 데모 환경에서 바로 시작하세요.",
        closingCta: "무료 체험 시작",
    },
    en: {
        ldName: "XGEN 15-day free trial",
        ldDescription:
            "A 15-day free demo of the XGEN Agentic AI platform. Try data integration, no-code agent building, RAG, MCP, and governance for yourself.",
        breadcrumb: "XGEN free trial",
        pillars: [
            ["Connect", "Connect your enterprise data and internal systems to XGEN so the AI understands the real context of the work."],
            ["Build", "Build the custom AI agent your work needs by drag and drop, without writing code."],
            ["Operate", "Manage the agents you built in one place and run them steadily under governance and security."],
        ],
        audience: [
            ["Teams sizing up what the platform can do", "Find out how far you can take an agent on this platform by building one yourself"],
            ["Teams who want to judge by using it", "Evaluate usefulness in a real environment rather than from a vendor's explanation"],
            ["Teams estimating ROI", "Run a small experiment before a company-wide rollout and forecast the return"],
            ["Teams that need internal evidence", "Turn trial results into the evidence your internal reporting and decisions need"],
        ],
        features: [
            ["Model training and optimization", "Fine-tune models on your own data to fit the domain"],
            ["Drag-and-drop agent building", "Compose an agent with no code"],
            ["Feedback-loop improvement", "Feed usage back in and keep improving the model"],
            ["Browser-extension agents", "Use agents directly on the screens your teams already work in"],
            ["Document processing and structuring", "Read documents and structure them by meaning"],
            ["Tool extension (MCP conversion)", "Convert internal tools and APIs to MCP and connect them to agents"],
            ["Knowledge base management (RAG)", "Ground answers in enterprise knowledge"],
            ["AI governance and security", "Operate safely under policy, audit, and security controls"],
        ],
        steps: [
            "Submit the request form",
            "Receive the welcome email and usage guide",
            "Sign in with the account provided",
            "Start your 15-day XGEN trial",
        ],
        faq: [
            { q: "Does the trial cost anything?", a: "No. The XGEN demo environment is free for 15 days." },
            { q: "What environment does it run in?", a: "The XGEN trial demo environment is available on desktop only." },
            { q: "How do I get started?", a: "Submit the request form and we will send a welcome email, a usage guide, and your account. Sign in to the demo environment with that account and your 15-day trial begins." },
            { q: "Which features can I try?", a: "Data integration, no-code agent building, the RAG knowledge base, MCP tool extension, fine-tuning, and AI governance and security — the core of XGEN, hands on." },
        ],
        heroEyebrow: "XGEN · Free trial",
        heroTitle: "Turn your idea into an AI agent of your own",
        heroLead:
            "From connecting data to building a custom AI agent and running it — try the whole path yourself in a 15-day free demo environment.",
        ctaApply: "Start the 15-day trial",
        ctaConsult: "Talk about a PoC",
        heroChips: ["Free for 15 days", "In the browser, nothing to install", "No-code, start immediately"],
        pillarsTitle: "Build custom AI agents on your enterprise data, and run them in one place",
        pillarsLead:
            "XGEN is an Agentic AI platform for developing and centrally managing custom AI agents on enterprise data. It runs in three stages: connect, build, operate.",
        audienceTitle: "Who this fits",
        audienceLead:
            "If you are evaluating adoption, build something first and judge from that rather than from a pitch. It suits these teams especially well.",
        featuresTitle: "What you get to use in the trial",
        featuresLead:
            "From data integration through agent building, the knowledge base, and governance — XGEN's core capabilities, as they are, in the demo environment.",
        stepsTitle: "From request to start, in four steps",
        pcNote: "The XGEN trial demo environment is available on desktop only",
        faqTitle: "Frequently asked questions",
        closingTitle: "Start free for 15 days",
        closingLead:
            "Submit the form and we will send your account and guide. Nothing to install — start straight from the demo environment.",
        closingCta: "Start the free trial",
    },
};

export function XgenTrialPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const PILLARS = t.pillars.map(([title, desc], i) => ({
        icon: PILLAR_ICONS[i],
        title,
        en: PILLAR_EN[i],
        desc,
    }));
    const AUDIENCE = t.audience.map(([title, desc], i) => ({
        icon: AUDIENCE_ICONS[i],
        title,
        desc,
    }));
    const FEATURES = t.features.map(([title, desc], i) => ({
        icon: FEATURE_ICONS[i],
        title,
        desc,
    }));
    const STEPS = t.steps.map((title, i) => ({
        step: String(i + 1).padStart(2, "0"),
        title,
    }));
    const FAQ = t.faq;
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Product", path: "/product" },
                        { name: t.breadcrumb, path: localeHref(locale, "/xgen-trial") },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: FAQ.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                        })),
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Offer",
                        name: t.ldName,
                        description:
                            t.ldDescription,
                        url: absoluteUrl("/xgen-trial"),
                        price: 0,
                        priceCurrency: "KRW",
                        category: "Free trial",
                        seller: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                ]}
            />

            {/* Hero — 2단: 카피/CTA + 제품 목업 */}
            <section className="relative flex min-h-[600px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                                {t.heroEyebrow}
                            </p>
                            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                                {t.heroTitle}
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                                {t.heroLead}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={localeHref(locale, "/contact") + "?type=trial&from=xgen-trial"}
                                    className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110"
                                >
                                    {t.ctaApply}
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                                <Link
                                    href={localeHref(locale, "/contact") + "?type=poc&from=xgen-trial"}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                                >
                                    {t.ctaConsult}
                                </Link>
                            </div>
                            {/* 가치 제안 */}
                            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-white/80">
                                {t.heroChips.map((v) => (
                                    <li key={v} className="inline-flex items-center gap-1.5">
                                        <Check className="h-4 w-4 text-[#5eead4]" />
                                        {v}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 제품 목업 */}
                        <div className="hidden lg:block">
                            <AgentBuilderMockup locale={locale} className="w-full drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            <main>
                {/* What is XGEN — 연동·설계·운영 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            What is XGEN
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.pillarsTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.pillarsLead}
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {PILLARS.map((p) => (
                                <div
                                    key={p.title}
                                    className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <p.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}{" "}
                                        <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                            {p.en}
                                        </span>
                                    </h3>
                                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 이런 기업에 추천 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Who it&apos;s for
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.audienceTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.audienceLead}
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {AUDIENCE.map((a, i) => (
                                <div
                                    key={a.title}
                                    className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[linear-gradient(135deg,#00acee,#185aea)] text-white shadow-[0_6px_16px_-6px_rgba(24,90,234,0.6)]">
                                        <a.icon className="h-6 w-6" />
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {a.title}
                                        </h3>
                                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {a.desc}
                                        </p>
                                    </div>
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute right-4 top-3 font-mono text-[13px] font-bold text-[#e6ebf3] transition group-hover:text-[#cdd9ef]"
                                    >
                                        0{i + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 핵심 기능 8 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.featuresTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.featuresLead}
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {FEATURES.map((f) => (
                                <div
                                    key={f.title}
                                    className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <f.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[16px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                        {f.title}
                                    </h3>
                                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 신청 방법 STEP */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.stepsTitle}
                        </h2>
                        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {STEPS.map((s) => (
                                <li
                                    key={s.step}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center"
                                >
                                    <span className="font-mono text-[14px] font-bold text-[#2f7bff]">
                                        STEP {s.step}
                                    </span>
                                    <p className="mt-2 text-[16px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                        {s.title}
                                    </p>
                                </li>
                            ))}
                        </ol>
                        <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-[#f4d9a6] bg-[#fef6e7] px-3.5 py-1.5 text-[13.5px] font-semibold text-[#b45309]">
                            <Monitor className="h-3.5 w-3.5" />
                            {t.pcNote}
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-3xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.faqTitle}
                        </h2>
                        <dl className="mt-8 divide-y divide-[var(--color-line)]">
                            {FAQ.map((f) => (
                                <div key={f.q} className="py-6">
                                    <dt className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {f.q}
                                    </dt>
                                    <dd className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* CTA 밴드 */}
                <section className="border-t border-[var(--color-line)] bg-[linear-gradient(120deg,#eaf5ff,#eef4fc)]">
                    <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                                {t.closingTitle}
                            </h2>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.closingLead}
                            </p>
                        </div>
                        <Link
                            href={localeHref(locale, "/contact") + "?type=trial&from=xgen-trial"}
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110"
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
