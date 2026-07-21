import Link from "next/link";
import Image from "next/image";
import {
    Workflow,
    Database,
    Cable,
    Rocket,
    LayoutDashboard,
    Lock,
    Server,
    ShieldCheck,
    BadgeCheck,
    Building2,
    ChevronRight,
    ArrowRight,
    Download,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CertificationQuality } from "@/components/certification-quality";
import { ArchIndex } from "@/components/arch-index";
import { AgentflowCanvas } from "@/components/agentflow-canvas";
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

/** 히어로 직후 트러스트 바 — 인증·운영·도입 실적(대외 공개 사실만). */
const TRUST: { icon: LucideIcon; label: string; sub: string }[] = [
    { icon: BadgeCheck, label: "GS인증 1등급", sub: "국가 공인 품질인증 · TTA" },
    { icon: ShieldCheck, label: "AI-MASTER", sub: "AI 신뢰성 인증 진행 중" },
    { icon: Server, label: "온프레미스 · 망분리", sub: "Air-gap 배포 지원" },
    { icon: Building2, label: "제주은행 등 도입", sub: "금융 · 공공 · 커머스" },
];

/** 제품 페이지 섹션 목차 — 히어로 하단 스티키 인덱스 탭(ArchIndex 공용). */
const PRODUCT_SECTIONS = [
    { id: "platform", label: "제품 개요" },
    { id: "features", label: "핵심 기능" },
    { id: "core-tech", label: "핵심 기술" },
    { id: "roles", label: "역할별 경험" },
    { id: "on-premise", label: "온프레미스" },
    { id: "governance", label: "거버넌스" },
    { id: "certification", label: "인증·품질" },
    { id: "faq", label: "FAQ" },
];

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
    {
        img: "/product/dashboard.png",
        alt: "XGEN 운영 대시보드 — 자주 찾는 Agent·인기 템플릿·에이전트플로우 현황·최근 장애/오류·평가 지표를 한 화면에서 점검하는 System Operations & Deployment Dashboard",
        caption: "운영 대시보드",
        w: 1616,
        h: 998,
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
        icon: Server,
        title: "망분리 · 폐쇄망 지원",
        desc: "인터넷과 분리된 망분리·에어갭(Air-gap) 환경에서도 배포·운영되며, 금융·공공의 폐쇄망 요건을 충족합니다.",
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
        a: "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·운영·통제하는 Enterprise AI 플랫폼입니다. Plateer Labs가 개발했으며, 온프레미스로 구축됩니다.",
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
        a: "네. Agentflow의 드래그 기반 Visual Canvas로 코딩 없이 워크플로우를 설계하고, 실시간 채팅으로 검증한 뒤 API·워크플로우로 배포할 수 있습니다.",
    },
];

/** Enterprise Trust — AI 거버넌스 통제 요건(3-레이어 권한·이중 승인·PII·감사). */
const GOV: { title: string; desc: string }[] = [
    {
        title: "3-레이어 권한",
        desc: "등급(Standard/SuperUser) · 역할(Role) · 권한(ABAC 키)의 독립 레이어로 화면·버튼 단위까지 접근을 게이팅합니다.",
    },
    {
        title: "이중 승인 배포",
        desc: "서비스화에는 시스템 관리자의 배포 승인과 거버넌스 담당자의 승인, 두 단계 통과가 필수입니다.",
    },
    {
        title: "PII 마스킹 · 위험 등급",
        desc: "개인식별정보를 자동 마스킹하고, 요청·응답의 위험도를 등급으로 분류·통제합니다.",
    },
    {
        title: "감사 로그 · 정기 점검",
        desc: "사용자 활동과 시스템 이벤트를 보존하고, 배포된 Agent를 주기적으로 점검합니다.",
    },
];

/** 역할별 경험 — 같은 URL이라도 역할·권한에 따라 다른 화면. */
const ROLES: { en: string; ko: string; desc: string }[] = [
    {
        en: "Standard User",
        ko: "일반 사용자",
        desc: "Agent 채팅으로 업무를 처리하고, 공지·FAQ·1:1 문의로 지원받습니다.",
    },
    {
        en: "Agent Developer",
        ko: "Agent 개발자",
        desc: "캔버스에서 Agent를 설계하고, 도구·지식을 연동해 배포를 요청합니다.",
    },
    {
        en: "System Admin",
        ko: "시스템 관리자",
        desc: "사용자·권한·LLM·시스템을 운영하고 배포를 1차 승인합니다.",
    },
    {
        en: "Governance Officer",
        ko: "거버넌스 담당자",
        desc: "통제 정책과 위험을 관리하고, 서비스화의 최종 승인·감사를 담당합니다.",
    },
];

/** 핵심 기술 4계층 — 검증된 오픈 기술 위, 벤더 종속 없이(모델→검색→오케스트레이션→런타임). */
const TECH_LAYERS: {
    no: string;
    en: string;
    title: string;
    desc: string;
    chips: string[];
}[] = [
    {
        no: "LAYER 01",
        en: "Model",
        title: "모델 오케스트레이션",
        desc: "상용 클라우드 LLM과 사내 GPU 셀프호스팅 모델을 하나의 인터페이스로 다룹니다. 프로바이더를 교체해도 에이전트 설계는 그대로 유지됩니다.",
        chips: ["OpenAI", "Anthropic", "Google Gemini", "AWS Bedrock", "vLLM", "SGLang"],
    },
    {
        no: "LAYER 02",
        en: "Retrieval",
        title: "고도화된 RAG",
        desc: "밀집·희소 벡터와 전문검색을 결합한 하이브리드 검색에 리랭킹과 온톨로지 그래프를 더해, 출처가 분명한 응답을 만듭니다.",
        chips: ["Qdrant", "Dense + Sparse", "Full-text", "Reranker", "Ontology Graph", "OCR"],
    },
    {
        no: "LAYER 03",
        en: "Orchestration",
        title: "Agent 오케스트레이션",
        desc: "노드 기반 멀티 에이전트 흐름, MCP 표준 도구 연동, 스트리밍 실행으로 복잡한 업무 절차를 조립하고 실시간으로 처리합니다.",
        chips: ["Multi-Agent", "MCP", "Tool / Function", "SSE Streaming", "Prompt Engine"],
    },
    {
        no: "LAYER 04",
        en: "Runtime & Infra",
        title: "엔터프라이즈 런타임",
        desc: "게이트웨이 기반 인증 격리와 ABAC 접근 제어, 온프레미스·GPU 서빙, 가드레일로 통제된 실행 환경을 보장합니다.",
        chips: ["API Gateway", "ABAC", "On-prem", "GPU Serving", "Guardrail"],
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

            {/* Hero — 다크 배경 + 움직이는 에이전트플로우 캔버스 */}
            <section className="relative overflow-hidden border-b border-white/10 bg-[#070b1c] text-white">
                <div className="relative mx-auto grid min-h-[540px] w-full max-w-6xl items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="max-w-xl">
                        <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                            Product · XGEN
                        </p>
                        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                            기업의 AI를{" "}
                            <span className="text-[#7dd3fc]">
                                설계하고,
                                <br />
                                운영하며, 신뢰를 완성
                            </span>
                            하는 플랫폼
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                            XGEN은 맞춤형 AI 서비스의 설계부터 구축·운영·관리까지 통합
                            지원하는 기업용 생성형 AI 플랫폼입니다. 복잡한 개발 지식
                            없이도 Agent 기반 업무 자동화를 안전하게 구현합니다.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                데모 요청하기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href="#platform"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                플랫폼 살펴보기
                            </a>
                        </div>
                    </div>

                    {/* 키비주얼 — 움직이는 에이전트플로우 캔버스(살짝 우측으로) */}
                    <div className="w-full lg:translate-x-4">
                        <AgentflowCanvas />
                    </div>
                </div>
            </section>

            {/* 트러스트 바 — 인증·운영·도입 실적으로 즉시 신뢰 형성 */}
            <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6 sm:justify-between">
                    {TRUST.map((t) => (
                        <div key={t.label} className="flex items-center gap-2.5">
                            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                <t.icon className="h-[18px] w-[18px]" />
                            </span>
                            <div className="leading-tight">
                                <p className="text-[14.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.label}
                                </p>
                                <p className="text-[12.5px] text-[var(--color-ink-subtle)]">
                                    {t.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <ArchIndex sections={PRODUCT_SECTIONS} />

            <main>
                {/* 제품 개요 — 파일럿을 넘어 실제 배포되는 기업용 AI (4축) */}
                <section
                    id="platform"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
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
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
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
                            <p className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                실제 제품 화면
                            </p>
                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
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

                {/* 핵심 기술 — 검증된 오픈 기술 위, 벤더 종속 없이 (4계층) */}
                <section
                    id="core-tech"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Core Technology
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            검증된 오픈 기술 위에, 벤더 종속 없이
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 특정 모델이나 클라우드에 묶이지 않습니다. 표준
                            프로토콜과 검증된 엔진을 4개 계층으로 쌓아, 사내 GPU 모델부터
                            상용 API까지 같은 방식으로 다룹니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            {TECH_LAYERS.map((l) => (
                                <div
                                    key={l.no}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:p-7"
                                >
                                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                                        <span className="font-bold text-[#2461d8]">
                                            {l.no}
                                        </span>
                                        <span className="text-[var(--color-ink-subtle)]">
                                            · {l.en}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {l.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {l.desc}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {l.chips.map((c) => (
                                            <span
                                                key={c}
                                                className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-2.5 py-1 font-mono text-[12.5px] text-[var(--color-ink-muted)]"
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4계층 기술 스택의 참조 아키텍처로 연결 */}
                        <Link
                            href="/architecture#platform"
                            className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            XGEN 플랫폼 아키텍처 자세히 보기
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* Roles — 역할별 경험 (제품 사용 관점: 신뢰 블록 앞에 배치) */}
                <section
                    id="roles"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Roles
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            하나의 플랫폼, 역할에 맞는 경험
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            하나의 플랫폼에서도 역할과 권한에 따라 최적화된 업무 환경이
                            구성됩니다. 각 사용자는 자신의 업무에 필요한 기능과 정보만
                            제공받아 더욱 효율적으로 AI를 활용할 수 있습니다.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {ROLES.map((r) => (
                                <div
                                    key={r.en}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#2461d8]">
                                        {r.en}
                                    </p>
                                    <h3 className="mt-3 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {r.ko}
                                    </h3>
                                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {r.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* On-Premise */}
                <section
                    id="on-premise"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
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

                {/* Governance — Enterprise Trust (통제·승인·감사) */}
                <section
                    id="governance"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                            <div>
                                <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                    Enterprise Trust
                                </p>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-[34px] md:leading-[1.15]">
                                    신뢰할 수 없는 AI는 기업에서 운영될 수 없습니다
                                </h2>
                                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    XGEN은 누가, 무엇을, 언제 수행했는지 모든 활동을
                                    추적하고, 위험한 변경은 배포 전에 검증하며, 승인된
                                    에이전트만 운영 환경에 배포되도록 설계되었습니다. 규제
                                    산업과 온프레미스 환경에서도 신뢰할 수 있는 거버넌스를
                                    제공합니다.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {GOV.map((g) => (
                                    <div
                                        key={g.title}
                                        className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="h-2 w-2 rotate-45 rounded-[2px] bg-[#2f7bff]" />
                                            <h3 className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {g.title}
                                            </h3>
                                        </div>
                                        <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {g.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications & Quality — 국가 공인 품질/신뢰성 인증(구 /solutions#certification 이전) */}
                <section
                    id="certification"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
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
                <section
                    id="faq"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
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
                            Get Started
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-[40px]">
                            업무에 바로 투입되는 기업용 AI를 확인해 보세요
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            조직의 보안·권한·감사 요건을 만족하는 Agentic AI 플랫폼.
                            데모에서 설계·배포·통제의 전체 흐름을 직접 보여드립니다.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                데모 요청하기
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
