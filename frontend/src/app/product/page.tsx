import Link from "next/link";
import Image from "next/image";
import {
    Workflow,
    Database,
    Cable,
    Rocket,
    LayoutDashboard,
    Lock,
    UserCheck,
    ShieldCheck,
    ChevronRight,
    ArrowRight,
    Download,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CertificationQuality } from "@/components/certification-quality";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·통제하는 온프레미스 Enterprise AI 플랫폼입니다. 에이전트플로우 캔버스·지식(RAG)·도구(MCP)·거버넌스로 코딩 없이 에이전트를 만들고 안전하게 운영합니다.",
    path: "/product",
});

/** 제품 개요 4축 — 파일럿을 넘어 실제 업무에 배포되는 기업용 AI의 근거. */
const PILLARS: { no: string; title: string; desc: string }[] = [
    {
        no: "01",
        title: "Agent 기반 서비스 구성",
        desc: "목적에 맞는 Agent를 생성·조합하고, Prompt·Workflow로 업무를 연결합니다. 다중 Agent 협업까지 지원합니다.",
    },
    {
        no: "02",
        title: "기업 환경 최적화 운영",
        desc: "역할 기반 접근 제어, 배포 승인, 감사 로그, 조직 기반 권한 체계로 안전한 운영 구조를 갖춥니다.",
    },
    {
        no: "03",
        title: "자연어 업무 자동화",
        desc: "문서 요약·데이터 질의·절차 자동화·지식 검색을 자연어로 실행합니다. 반복 업무를 위임합니다.",
    },
    {
        no: "04",
        title: "모델·시스템 유연 연동",
        desc: "다양한 LLM, API 기반 시스템, 사내 데이터, RAG, Tool·Function을 유연하게 연결합니다.",
    },
];

/** 핵심 기능 6종 — 만들기 → 배포 → 통제로 이어지는 하나의 파이프라인. */
const FEATURES: {
    icon: LucideIcon;
    tag: string;
    ko: string;
    desc: string;
    items: string[];
}[] = [
    {
        icon: Workflow,
        tag: "Agentflow · Canvas",
        ko: "에이전트플로우 설계",
        desc: "캔버스에서 노드를 드래그&드롭으로 연결해 AI 업무 흐름을 시각적으로 설계합니다. 코딩 없이 LLM 호출·도구 실행·분기를 조합합니다.",
        items: ["노드 기반 시각 편집", "다중 Agent 협업 구성", "버전 관리 · 실행 로그"],
    },
    {
        icon: Database,
        tag: "Knowledge · RAG",
        ko: "지식 관리와 검색",
        desc: "문서를 컬렉션에 올리면 청크·임베딩을 거쳐 벡터 검색이 가능해집니다. 리랭커와 온톨로지로 정확도를 높이고, 응답에 출처(인용)를 함께 제시합니다.",
        items: ["컬렉션 · 파일 저장소 · DB 연동", "벡터 DB · 리랭커 · 온톨로지", "인용 기반 응답 생성"],
    },
    {
        icon: Cable,
        tag: "Tools · MCP",
        ko: "도구 연동과 확장",
        desc: "외부 API·함수를 Agent가 호출하는 도구로 등록하고, MCP 표준으로 모델과 외부 도구를 연결합니다. 인증 프로필로 키·토큰을 안전하게 관리합니다.",
        items: ["API 도구 등록 · 호출", "MCP 표준 연동", "인증 프로필 중앙 관리"],
    },
    {
        icon: Rocket,
        tag: "Deploy · Operate",
        ko: "배포와 운영",
        desc: "설계한 에이전트플로우를 사용자·외부 시스템이 호출할 수 있도록 배포합니다. 임베드 코드로 외부 웹에 삽입하고, 스케줄로 자동 실행합니다.",
        items: ["배포 · 임베드 · 공유", "스케줄 자동 실행 (Cron)", "버전 · 배포 상태 관리"],
    },
    {
        icon: ShieldCheck,
        tag: "AI Governance",
        ko: "AI 거버넌스",
        desc: "PII 마스킹, 위험 등급, 통제 정책으로 AI 사용을 관리합니다. 배포·거버넌스 이중 승인과 정기 점검, 감사 로그로 통제 요건을 충족합니다.",
        items: ["PII 마스킹 · 위험 등급", "이중 승인 · 정기 점검", "변경 이력 · 감사 로그"],
    },
    {
        icon: LayoutDashboard,
        tag: "Dashboard",
        ko: "대시보드 · 모니터링",
        desc: "역할별로 구성된 위젯으로 현황과 통계를 한눈에 봅니다. 실행 이력, 토큰 사용량, 시스템 상태를 관리자 관점에서 모니터링합니다.",
        items: ["역할별 위젯 대시보드", "실행 이력 · 토큰 사용량", "시스템 상태 모니터링"],
    },
];

/** 실제 제품 화면 — 핵심 기능 하단 쇼케이스(구 xgen.im 제품 UI). */
const SCREENS: { img: string; alt: string; caption: string; w: number; h: number }[] = [
    {
        img: "/product/agent-builder-canvas.png",
        alt: "XGEN 에이전트플로우 캔버스 — 사용자 질문 입력 → Agent(LLM) → AI 답변 출력, 지식 컬렉션 기반 검색 노드를 연결한 시각 워크플로우",
        caption: "에이전트플로우 캔버스",
        w: 1600,
        h: 900,
    },
    {
        img: "/product/modelops-catalog.png",
        alt: "XGEN LLM 모델 카탈로그 — OpenAI·Anthropic·Google 등 멀티 프로바이더 모델을 활성화하고 사용 현황을 관리하는 화면",
        caption: "LLM 모델 카탈로그",
        w: 1600,
        h: 900,
    },
    {
        img: "/product/manage-intro.png",
        alt: "XGEN 통합 관리 센터 — 사용자 권한·Agent 운영·AI 거버넌스·시스템·데이터를 통합 관리하는 관리 설정 화면",
        caption: "통합 관리 센터",
        w: 1600,
        h: 900,
    },
];

/** 온프레미스 보안 3원칙 — 유출 차단·접근 세분화·제로 트레이닝. (구 xgen.im On-premise) */
const ONPREM: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: Lock,
        title: "외부 유출 원천 차단",
        desc: "온프레미스 구축으로 데이터가 외부로 유출되지 않고 안전하게 활용됩니다.",
    },
    {
        icon: UserCheck,
        title: "내부 접근 세분화 (RBAC)",
        desc: "부서·팀·개인 단위의 역할 기반 접근 제어(RBAC)로 접근 권한을 차등 부여해 내부 데이터 보안을 강화합니다.",
    },
    {
        icon: ShieldCheck,
        title: "제로 트레이닝 보장",
        desc: "고객사 데이터가 외부 모델의 학습 데이터로 활용되는 것을 기술적으로 방지합니다.",
    },
];

/** FAQ — GEO용 FAQPage JSON-LD와 화면 공용. */
const FAQ: { q: string; a: string }[] = [
    {
        q: "XGEN은 무엇인가요?",
        a: "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 학습·생성·배포·모니터링하는 Enterprise AI 플랫폼입니다. Plateer Labs가 개발했으며, 온프레미스로 구축됩니다.",
    },
    {
        q: "XGEN은 어떤 LLM을 사용할 수 있나요?",
        a: "특정 모델에 종속되지 않고, 기업이 원하는 LLM과 인프라를 선택해 최적화할 수 있습니다. 통합 관리 센터에서 LLM·데이터베이스·벡터 DB 등 시스템 구성을 상세하게 설정합니다.",
    },
    {
        q: "데이터 보안은 어떻게 보장되나요?",
        a: "온프레미스 구축으로 데이터가 외부로 유출되지 않으며, 역할 기반 접근 제어(RBAC)와 제로 트레이닝 보장으로 고객사 데이터가 외부 모델 학습에 쓰이지 않도록 기술적으로 차단합니다.",
    },
    {
        q: "코딩 없이 에이전트를 만들 수 있나요?",
        a: "네. Agent Builder의 드래그 기반 Visual Workflow Canvas로 코딩 없이 워크플로우를 설계하고, 실시간 채팅으로 검증한 뒤 API·워크플로우로 배포할 수 있습니다.",
    },
];

export default function ProductPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "@id": absoluteUrl("/product#software"),
                        name: "XGEN",
                        applicationCategory: "BusinessApplication",
                        applicationSubCategory: "Enterprise Agentic AI Platform",
                        operatingSystem: "On-premise",
                        description:
                            "기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·통제하는 온프레미스 Enterprise AI 플랫폼. 에이전트플로우 캔버스·지식(RAG)·도구(MCP)·배포·거버넌스·대시보드로 구성된다.",
                        url: absoluteUrl("/product"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        featureList: [
                            "Agentflow · Canvas — 노드 기반 에이전트플로우 시각 설계",
                            "Knowledge · RAG — 벡터 검색·리랭커·온톨로지·인용 응답",
                            "Tools · MCP — API 도구 등록·MCP 표준 연동",
                            "Deploy · Operate — 배포·임베드·스케줄 자동 실행",
                            "AI Governance — PII 마스킹·이중 승인·감사 로그",
                            "Dashboard — 역할별 위젯·실행 이력·시스템 모니터링",
                        ],
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: FAQ.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                        })),
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Product", path: "/product" },
                    ]),
                ]}
            />

            {/* Hero — 다크 배경 + Agentic AI 노드 네트워크 일러스트(풀블리드) */}
            <section className="relative overflow-hidden border-b border-white/10 bg-[#070b1c] text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/product/hero-bg.svg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                {/* 좌측 가독성 페이드 */}
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-[#070b1c] via-[#070b1c]/75 to-transparent"
                />
                <div className="relative mx-auto flex min-h-[540px] w-full max-w-6xl items-center px-6 pt-20">
                    <div className="max-w-xl">
                        <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                            Product · XGEN
                        </p>
                        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                            원하는 LLM과 인프라로 만드는 맞춤 Agentic AI 플랫폼
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                            XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를
                            학습·생성·배포·모니터링까지 한 플랫폼에서 다루도록 설계된
                            온프레미스 Enterprise AI 플랫폼입니다.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            온프레미스 · 학습 → 생성 → 배포 → 모니터링
                        </span>
                    </div>
                </div>
            </section>

            <main>
                {/* 제품 개요 — 파일럿을 넘어 실제 배포되는 기업용 AI (4축) */}
                <section
                    id="platform"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Why XGEN
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            파일럿에서 끝나지 않는, 실제 업무에 배포되는 기업용 AI
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            기술 검증에서 멈추는 대부분의 AI 도입과 달리, XGEN은 조직의
                            보안 정책·권한 체계·감사 요건을 처음부터 전제로 설계되었습니다.
                            만드는 것과 통제하는 것을 하나의 플랫폼에서 다룹니다.
                        </p>
                        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
                            {PILLARS.map((p) => (
                                <div key={p.no} className="bg-white p-7">
                                    <span className="font-mono text-[13px] font-bold tracking-widest text-[#2f7bff]">
                                        {p.no}
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Features
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            설계부터 운영까지, 하나의 흐름으로 연결됩니다
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            각 기능은 개별 도구가 아니라 하나의 운영 파이프라인으로
                            이어집니다. 에이전트를 만들고, 배포하고, 운영하고, 개선하는
                            전 과정이 하나의 플랫폼 안에서 연결됩니다.
                        </p>

                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {FEATURES.map((f) => (
                                <div
                                    key={f.tag}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                        <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <f.icon className="h-4 w-4" />
                                        </span>
                                        {f.tag}
                                    </div>
                                    <h3 className="mt-4 text-[18.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {f.ko}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.desc}
                                    </p>
                                    <ul className="mt-4 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4">
                                        {f.items.map((it) => (
                                            <li
                                                key={it}
                                                className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--color-ink-muted)]"
                                            >
                                                <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* 실제 제품 화면 쇼케이스 */}
                        <div className="mt-14">
                            <p className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-ink-subtle)]">
                                실제 제품 화면
                            </p>
                            <div className="mt-5 grid gap-5 md:grid-cols-3">
                                {SCREENS.map((s) => (
                                    <figure
                                        key={s.img}
                                        className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] shadow-[0_20px_48px_-24px_rgba(20,40,80,0.35)]"
                                    >
                                        <Image
                                            src={s.img}
                                            alt={s.alt}
                                            width={s.w}
                                            height={s.h}
                                            sizes="(max-width: 768px) 100vw, 360px"
                                            className="h-auto w-full"
                                        />
                                        <figcaption className="border-t border-[var(--color-line)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                            {s.caption}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* On-Premise */}
                <section
                    id="on-premise"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            On-Premise
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            데이터는 기업 안에, 안심하고 활용
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 온프레미스로 구축돼 데이터가 외부로 나가지 않으며,
                            고객사 데이터가 외부 모델 학습에 쓰이지 않도록 기술적으로 차단합니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {ONPREM.map((o) => (
                                <div
                                    key={o.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <o.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {o.title}
                                    </h3>
                                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {o.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certifications & Quality — 국가 공인 품질/신뢰성 인증(구 /solutions#certification 이전) */}
                <section
                    id="certification"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Certifications & Quality
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            국가 공인 품질·신뢰성 인증
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 GS인증 1등급을 획득했고, AI 신뢰성 인증(AI-MASTER)
                            시험을 받고 있습니다. 제3자 시험기관이 제품의 품질과 신뢰성을
                            검증합니다.
                        </p>
                        <div className="mt-10">
                            <CertificationQuality />
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            FAQ
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            자주 묻는 질문
                        </h2>
                        <div className="mt-8 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
                            {FAQ.map((f) => (
                                <details key={f.q} className="group px-6 py-5">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-semibold text-[var(--color-ink)]">
                                        {f.q}
                                        <ChevronRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-open:rotate-90" />
                                    </summary>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-white/45">
                            Turn AI potential into results
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-[40px]">
                            AI 잠재력을 성과로 바꾸는 선택
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            원하는 LLM과 인프라 위에서 조직에 맞는 Agentic AI를 설계하고,
                            온프레미스로 안전하게 운영하세요. 도입 범위와 방식은 조직 상황에
                            맞춰 함께 설계합니다.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                XGEN 도입 문의
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/resources"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                <Download className="h-4 w-4" />
                                XGEN 소개서 다운로드
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
