import Link from "next/link";
import Image from "next/image";
import {
    FileText,
    Workflow,
    Gauge,
    Cable,
    Network,
    RefreshCw,
    Blocks,
    Cog,
    LayoutDashboard,
    Lock,
    UserCheck,
    ShieldCheck,
    Check,
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
        "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 학습·생성·배포·모니터링하는 온프레미스 Enterprise AI 플랫폼입니다. Agent Builder·ModelOps·통합 관리 센터로 코딩 없이 에이전트를 만들고 안전하게 운영합니다.",
    path: "/product",
});

/** 통합 플랫폼 3축 — 학습 → 생성 → 평가. (구 xgen.im All-in-one) */
const PLATFORM: { icon: LucideIcon; en: string; ko: string; desc: string }[] = [
    {
        icon: FileText,
        en: "Intelligent Learning",
        ko: "똑똑한 학습",
        desc: "PDF, Word, 이미지 등 여러 문서 형식을 자동으로 구분하고 OCR·Table Parsing·사용자 정의 함수를 적용해 빠르게 처리하고 학습합니다.",
    },
    {
        icon: Workflow,
        en: "Understanding-Based Action",
        ko: "이해기반 액션",
        desc: "어떤 질문이든 AI가 의미를 이해해 회사 안의 데이터·문서·시스템을 자동으로 연결하고 실행합니다.",
    },
    {
        icon: Gauge,
        en: "Continuous Evaluation",
        ko: "지속적인 평가",
        desc: "지속적인 자동 평가로 정확도를 높이고, 새로운 모델과 최신 방법론을 반영해 언제나 최적의 성능을 유지합니다.",
    },
];

/** 능동형 에이전트 — 자율 도구 호출·지식 통합·자가 복구. (구 xgen.im Autonomous) */
const AUTONOMOUS: { icon: LucideIcon; en: string; ko: string; desc: string }[] = [
    {
        icon: Cable,
        en: "Autonomous Tool Call",
        ko: "자율 도구 호출",
        desc: "필요에 따라 ERP·CRM 등 기업 소프트웨어에 직접 연결해 능동적으로 문제를 해결하고 개선을 제안·조치합니다.",
    },
    {
        icon: Network,
        en: "Contextual Knowledge Integration",
        ko: "맥락 지식 통합",
        desc: "단순 검색(RAG)을 넘어 온톨로지 기반으로 산재된 기업 데이터를 조직의 자산으로 전환합니다.",
    },
    {
        icon: RefreshCw,
        en: "Self-Healing Workflows",
        ko: "자가 복구 워크플로우",
        desc: "예외 상황을 논리적 추론으로 분석·해결해 끊김 없는 운영 환경을 유지합니다.",
    },
];

/** 핵심 기능 3종 — 각 앵커(id)는 GNB 드롭다운 하위 메뉴 타깃. Phase 2에서 전용 페이지로 확장 예정. */
const FEATURES: {
    id: string;
    icon: LucideIcon;
    en: string;
    ko: string;
    headline: string;
    items: string[];
    img: string;
    imgAlt: string;
    imgW: number;
    imgH: number;
}[] = [
    {
        id: "agent-builder",
        icon: Blocks,
        en: "Agent Builder",
        ko: "에이전트 빌더",
        headline: "AX에 필요한 모든 것을 한 플랫폼에서",
        items: [
            "RAG·지식 관리 — 임베딩 유사도 검색과 그래프 기반 의미 검색을 결합해 문서 맥락을 유지한 응답을 제공",
            "Visual Workflow Canvas — 드래그앤드롭·Tool Call·실시간 실행/디버깅으로 빠른 반복 작업",
            "Real-time AI Chat — 대화로 워크플로우를 검증하고 템플릿으로 즉시 시작",
        ],
        img: "/product/agent-builder-canvas.png",
        imgAlt: "XGEN Agent Builder의 Visual Workflow Canvas — '이커머스 법률챗'(GPT-5.2) 워크플로우: 사용자 질문 입력 → Agent(OpenAI GPT-5.2) → AI 답변 출력, 이커머스 지식 컬렉션 기반 정보 검색 노드 연결",
        imgW: 1600,
        imgH: 900,
    },
    {
        id: "modelops",
        icon: Cog,
        en: "ModelOps",
        ko: "모델 운영",
        headline: "지속 가능한 운영을 실현하는 ModelOps",
        items: [
            "표준화 프레임워크 — 커스텀 ML 모델까지 설계 → 학습 → 관리를 표준 절차로 제공",
            "검증·배포 — 반영 전 단계별 승인·검증 절차, API 배포와 워크플로우 연계 배포 모두 지원",
            "파이프라인 자동화와 품질 보증으로 안전한 AI 운영을 보장",
        ],
        img: "/product/modelops-catalog.png",
        imgAlt: "XGEN ModelOps의 LLM 모델 카탈로그 — OpenAI·Anthropic·Google 등 멀티 프로바이더 모델을 활성화하고 워크플로우 사용 현황을 관리하는 화면",
        imgW: 1600,
        imgH: 900,
    },
    {
        id: "manage",
        icon: LayoutDashboard,
        en: "Smart Management Center",
        ko: "통합 관리 센터",
        headline: "개발과 운영을 아우르는 통합 관리",
        items: [
            "권한 관리 — 조직 단위 접근 권한을 역할·속성 기반(RBAC·ABAC)으로 제어",
            "모델 환경 설정 — LLM·데이터베이스·벡터 DB 등 시스템 구성 요소를 상세 설정",
            "시스템 모니터링 — CPU·GPU·메모리·네트워크 사용률 추이를 대시보드로 한눈에",
            "데이터 관리·보안 — DB 상태 점검·최적화, PII 탐지·암호화·키 관리",
        ],
        img: "/product/manage-intro.png",
        imgAlt: "XGEN 통합 관리 센터(Admin Control Center) — 사용자 권한·Agent 운영·AI 거버넌스·시스템 환경·데이터를 통합 관리하는 관리 설정 화면",
        imgW: 1600,
        imgH: 900,
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

/** 카드 3열 그리드 — 플랫폼/능동형 섹션 공용. */
function TripletGrid({
    rows,
}: {
    rows: { icon: LucideIcon; en: string; ko: string; desc: string }[];
}) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {rows.map((r) => (
                <div
                    key={r.en}
                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                        <r.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                        {r.ko}
                    </h3>
                    <p className="text-[13px] font-semibold text-[#2461d8]">
                        {r.en}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                        {r.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}

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
                            "기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 학습·생성·배포·모니터링하는 온프레미스 Enterprise AI 플랫폼. Agent Builder·ModelOps·통합 관리 센터로 구성된다.",
                        url: absoluteUrl("/product"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        featureList: [
                            "Agent Builder — 드래그 기반 Visual Workflow Canvas",
                            "ModelOps — 파이프라인 자동화·검증·배포",
                            "Smart Management Center — RBAC·ABAC 거버넌스·모니터링",
                            "On-premise · Zero-training 데이터 보안",
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
                {/* All-in-one Platform */}
                <section
                    id="platform"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            All-in-one Platform
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            학습·생성·배포·모니터링을 한 플랫폼에서
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 문서 학습부터 에이전트 생성, 배포, 지속 평가까지
                            Agentic AI 서비스의 전 주기를 하나의 통합 플랫폼에서 처리합니다.
                        </p>
                        <div className="mt-8">
                            <TripletGrid rows={PLATFORM} />
                        </div>
                    </div>
                </section>

                {/* Autonomous */}
                <section
                    id="autonomous"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Autonomous
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            능동적으로 문제를 해결하는 에이전트
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN 에이전트는 단순 응답을 넘어, 기업 시스템에 직접 연결해
                            스스로 문제를 진단하고 조치합니다.
                        </p>
                        <div className="mt-8">
                            <TripletGrid rows={AUTONOMOUS} />
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
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            핵심 기능
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 에이전트를 만드는 <strong className="font-semibold text-[var(--color-ink)]">Agent Builder</strong>,
                            모델을 운영하는 <strong className="font-semibold text-[var(--color-ink)]">ModelOps</strong>,
                            전체를 안전하게 관리하는 <strong className="font-semibold text-[var(--color-ink)]">통합 관리 센터</strong> 세 축으로 구성됩니다.
                        </p>

                        <div className="mt-8 space-y-4">
                            {FEATURES.map((f, i) => (
                                <div
                                    key={f.id}
                                    id={f.id}
                                    className="grid scroll-mt-24 gap-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-6 md:p-8 lg:grid-cols-2 lg:items-center lg:gap-10"
                                >
                                    {/* 텍스트 — 짝수 카드는 오른쪽(lg)으로 교차 배치 */}
                                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <f.icon className="h-6 w-6" />
                                            </span>
                                            <div>
                                                <h3 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                                    {f.en}
                                                </h3>
                                                <p className="text-[13.5px] font-semibold text-[#2461d8]">
                                                    {f.ko}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-[16px] font-semibold leading-relaxed text-[var(--color-ink)]">
                                            {f.headline}
                                        </p>
                                        <ul className="mt-4 grid gap-2.5">
                                            {f.items.map((it) => (
                                                <li
                                                    key={it}
                                                    className="flex items-start gap-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                                >
                                                    <Check className="mt-1 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                                    {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 실제 제품 스크린샷 (구 xgen.im 제품 화면) */}
                                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                        <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] shadow-[0_20px_48px_-24px_rgba(20,40,80,0.35)]">
                                            <Image
                                                src={f.img}
                                                alt={f.imgAlt}
                                                width={f.imgW}
                                                height={f.imgH}
                                                sizes="(max-width: 1024px) 100vw, 560px"
                                                className="h-auto w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
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
