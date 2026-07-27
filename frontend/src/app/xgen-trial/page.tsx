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
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * XGEN 무료 체험(Trial) 페이지 — xgen.im/trial 콘텐츠를 연구소 사이트 룩앤필로 재구성.
 * 홈 Live Demo 카드와 Applied AI 드롭다운의 "XGEN Agentic Platform 체험하기"가 이 내부
 * 페이지로 라우팅된다. 체험 신청은 내부 모달 폼(TrialSignupForm)으로 접수한다.
 */
export const metadata = pageMetadata({
    title: "XGEN 무료 체험 — 아이디어를 나만의 AI Agent로",
    description:
        "XGEN 15일 무료 체험으로 데이터 연동부터 노코드 AI Agent 구현, 실제 운영까지 데모 환경에서 직접 경험하세요. 기업 데이터 기반 맞춤형 Agentic AI 플랫폼을 무료로 실증할 수 있습니다.",
    path: "/xgen-trial",
});

/** XGEN 3단계 — 연동 · 설계 · 운영. */
const PILLARS: { icon: LucideIcon; title: string; en: string; desc: string }[] = [
    {
        icon: Cable,
        title: "연동",
        en: "Connect",
        desc: "기업 데이터와 내부 시스템을 XGEN에 연결해 AI가 실제 업무 맥락을 이해하게 합니다.",
    },
    {
        icon: Boxes,
        title: "설계",
        en: "Build",
        desc: "코드 없이 드래그 앤 드롭으로 업무에 맞는 맞춤형 AI Agent를 직접 만듭니다.",
    },
    {
        icon: Activity,
        title: "운영",
        en: "Operate",
        desc: "만든 에이전트를 한 곳에서 통합 관리하고, 거버넌스·보안 아래 안정적으로 운영합니다.",
    },
];

/** 이런 기업에 추천 — 대상 4(아이콘 + 제목 + 설명). */
const AUDIENCE: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: Boxes,
        title: "플랫폼 역량을 확인하려는 팀",
        desc: "플랫폼 기반으로 에이전트를 어디까지 만들 수 있는지 직접 만들어 보며 확인합니다",
    },
    {
        icon: MousePointerClick,
        title: "직접 써보고 판단하려는 팀",
        desc: "벤더의 설명이 아니라 실제 환경에서 사용해 보고 활용성을 스스로 평가합니다",
    },
    {
        icon: Activity,
        title: "도입 ROI를 가늠하려는 팀",
        desc: "전사 도입 전 소규모 실험으로 효과와 투자 대비 성과를 미리 예측합니다",
    },
    {
        icon: FileText,
        title: "내부 실증 자료가 필요한 팀",
        desc: "내부 보고와 의사결정을 뒷받침할 실증 근거를 체험 결과로 확보합니다",
    },
];

/** 체험에서 써보는 핵심 기능 8가지. */
const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
    { icon: Cpu, title: "모델 훈련 및 최적화", desc: "업무 데이터로 모델을 Fine-tuning해 도메인에 최적화" },
    { icon: MousePointerClick, title: "드래그 앤 드롭 에이전트 빌드", desc: "코드 없이 노코드로 에이전트를 구성" },
    { icon: RefreshCw, title: "피드백 루프 기반 고도화", desc: "사용 피드백을 반영해 모델을 지속 개선" },
    { icon: Puzzle, title: "브라우저 확장 에이전트 빌드", desc: "브라우저 확장으로 현업 화면에서 바로 에이전트 활용" },
    { icon: FileText, title: "문서 처리 · 의미 구조화", desc: "문서를 이해하고 의미 기반으로 구조화" },
    { icon: Wrench, title: "Tool 확장 (MCP 변환)", desc: "내부 도구·API를 MCP로 변환해 에이전트에 연결" },
    { icon: Database, title: "지식 베이스 관리 (RAG)", desc: "기업 지식을 접지해 근거 있는 답변 생성" },
    { icon: ShieldCheck, title: "AI 거버넌스 & 보안", desc: "정책·감사·보안 통제로 안전하게 운영" },
];

/** 신청 프로세스 STEP 1~4. */
const STEPS: { step: string; title: string }[] = [
    { step: "01", title: "신청 양식 제출" },
    { step: "02", title: "안내 메일 및 사용 가이드 수신" },
    { step: "03", title: "할당된 계정으로 솔루션 접속" },
    { step: "04", title: "15일간 XGEN 무료 Trial 시작" },
];

const FAQ: { q: string; a: string }[] = [
    { q: "체험 비용이 있나요?", a: "아니요. 15일간 무료로 XGEN 데모 환경을 사용할 수 있습니다." },
    {
        q: "어떤 환경에서 사용하나요?",
        a: "XGEN 체험 데모 환경은 PC에서만 사용할 수 있습니다.",
    },
    {
        q: "어떻게 시작하나요?",
        a: "신청 양식을 제출하면 안내 메일과 사용 가이드, 접속 계정을 보내드립니다. 할당된 계정으로 데모 환경에 접속해 15일 무료 Trial을 시작합니다.",
    },
    {
        q: "체험에서 어떤 기능을 써볼 수 있나요?",
        a: "데이터 연동, 노코드 에이전트 빌드, RAG 지식베이스, MCP 도구 확장, Fine-tuning, AI 거버넌스·보안 등 XGEN의 핵심 기능을 직접 사용해볼 수 있습니다.",
    },
];

export default function XgenTrialPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Product", path: "/product" },
                        { name: "XGEN 무료 체험", path: "/xgen-trial" },
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
                        name: "XGEN 15일 무료 체험",
                        description:
                            "XGEN Agentic AI 플랫폼의 15일 무료 데모 체험. 데이터 연동·노코드 에이전트 빌드·RAG·MCP·거버넌스를 직접 경험한다.",
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
                                XGEN · 무료 체험
                            </p>
                            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                                아이디어를 나만의 AI Agent로 만들어보세요
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                                데이터 연결부터 맞춤형 AI Agent 구현, 실제 운영까지 — 15일
                                무료 데모 환경에서 직접 경험할 수 있습니다.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/contact?type=trial&from=xgen-trial"
                                    className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110"
                                >
                                    15일 무료 체험 신청하기
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                                <Link
                                    href="/contact?type=poc&from=xgen-trial"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                                >
                                    도입·PoC 상담
                                </Link>
                            </div>
                            {/* 가치 제안 */}
                            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-white/80">
                                {["15일 완전 무료", "설치 없이 웹에서", "노코드로 바로 시작"].map((v) => (
                                    <li key={v} className="inline-flex items-center gap-1.5">
                                        <Check className="h-4 w-4 text-[#5eead4]" />
                                        {v}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 제품 목업 */}
                        <div className="hidden lg:block">
                            <AgentBuilderMockup className="w-full drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            <main>
                {/* What is XGEN — 연동·설계·운영 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            What is XGEN
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            기업 데이터로 맞춤형 AI Agent를 만들고 한 곳에서 운영합니다
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 기업 데이터 기반 맞춤형 AI Agent를 개발하고 통합
                            관리할 수 있는 Agentic AI 플랫폼입니다. 연동 · 설계 · 운영의
                            세 단계로 이어집니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {PILLARS.map((p) => (
                                <div
                                    key={p.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
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
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Who it&apos;s for
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            이런 기업에 추천합니다
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            도입을 검토 중이라면, 설명을 듣기 전에 직접 만들어 보고
                            판단하세요. 다음과 같은 팀에 특히 잘 맞습니다.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {AUDIENCE.map((a, i) => (
                                <div
                                    key={a.title}
                                    className="group relative flex gap-4 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
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
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            체험에서 직접 써보는 핵심 기능
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            데이터 연동부터 에이전트 빌드, 지식베이스, 거버넌스까지 XGEN의
                            핵심 기능을 데모 환경에서 그대로 사용해봅니다.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {FEATURES.map((f) => (
                                <div
                                    key={f.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
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
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            신청부터 시작까지, 4단계
                        </h2>
                        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {STEPS.map((s) => (
                                <li
                                    key={s.step}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
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
                        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#f4d9a6] bg-[#fef6e7] px-3.5 py-1.5 text-[13.5px] font-semibold text-[#b45309]">
                            <Monitor className="h-3.5 w-3.5" />
                            XGEN 체험 데모 환경은 PC에서만 사용할 수 있습니다
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-3xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            자주 묻는 질문
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
                                지금 15일 무료로 시작하세요
                            </h2>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                신청 양식만 제출하면 계정과 가이드를 보내드립니다. 설치 없이 데모 환경에서 바로 시작하세요.
                            </p>
                        </div>
                        <Link
                            href="/contact?type=trial&from=xgen-trial"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110"
                        >
                            무료 체험 시작
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
