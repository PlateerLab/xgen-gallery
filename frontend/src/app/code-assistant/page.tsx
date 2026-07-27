import Link from "next/link";
import {
    Code2,
    GitBranch,
    Database,
    SplitSquareVertical,
    ShieldCheck,
    Boxes,
    Workflow,
    Search,
    FileCheck2,
    Layers,
    Check,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { CodeAssistantHeroArt } from "@/components/code-assistant-hero-art";
import { PostDeploymentSupport } from "@/components/post-deployment-support";
import { ArchIndex } from "@/components/arch-index";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * AI Code Assistant 제품 페이지 — 사내 코드베이스(코드·API·DB 스키마·산출물)를
 * 학습해 프로젝트 맥락에서 코드 수준으로 답하는 엔터프라이즈 코드 어시스턴트.
 * 내부 위키(C.A) 기반이되 고객사명·크리덴셜·서버 스펙 등 내부 정보는 제외한다.
 * Product GNB > Code Assistant 진입점(/code-assistant).
 */
export const metadata = pageMetadata({
    title: "AI Code Assistant — 사내 코드베이스를 이해하는 코드 어시스턴트",
    description:
        "AI Code Assistant는 사내 코드·API·DB 스키마·산출물을 학습해 프로젝트 맥락에서 코드 수준으로 답하는 엔터프라이즈 코드 어시스턴트입니다. GitLab과 연동되고 온프레미스·폐쇄망에 설치돼 소스가 외부로 나가지 않습니다.",
    path: "/code-assistant",
});

/** 섹션 목차 — 히어로 하단 스티키 인덱스(ArchIndex 공용). */
const CA_SECTIONS = [
    { id: "overview", label: "제품 개요" },
    { id: "value", label: "도입 효과" },
    { id: "capabilities", label: "핵심 기능" },
    { id: "how-it-works", label: "작동 원리" },
    { id: "integrations", label: "연동·배포" },
    { id: "specs", label: "기술 사양" },
    { id: "use-cases", label: "활용 사례" },
];

/** 기술 사양 — 개발 환경·스택 자가검증용(제품 일반 사양). */
const SPECS: { icon: LucideIcon; label: string; detail: string }[] = [
    {
        icon: Code2,
        label: "개발환경 (IDE)",
        detail: "VS Code 확장 — 인라인 자동완성·컨텍스트 메뉴·Diagnostics를 에디터에 통합",
    },
    {
        icon: GitBranch,
        label: "저장소 연동",
        detail: "GitLab 코드 저장소 연계 · 실시간 증분 인덱싱으로 최신 코드를 동기화",
    },
    {
        icon: SplitSquareVertical,
        label: "코드 이해",
        detail: "AST 기반 구조화 — 파일 단위가 아닌 호출·의존 관계로 코드베이스를 학습",
    },
    {
        icon: Search,
        label: "하이브리드 검색",
        detail: "키워드(BM25) + 의미 벡터 검색을 결합하고 AI 재정렬(Re-rank)로 정확도 향상",
    },
    {
        icon: FileCheck2,
        label: "문서 파싱",
        detail: "xlsx·docx·ppt·PDF·HTML 등 다양한 산출물을 통합 파싱해 컨텍스트로 활용",
    },
    {
        icon: Workflow,
        label: "도구·데이터 연동",
        detail: "MCP(Model Context Protocol) 표준으로 이기종 시스템·DB를 안전하게 연계",
    },
    {
        icon: Layers,
        label: "모델",
        detail: "온프레미스 self-host · 임베딩·리랭커 · 원하는 LLM을 선택·교체(모델 중립)",
    },
    {
        icon: ShieldCheck,
        label: "보안",
        detail: "망분리·폐쇄망 · RBAC 접근통제 · 감사로그 · 시큐어코딩 기반 운영",
    },
];

/** 도입 효과 — 의사결정자 관점 기존 → 도입 후 + 핵심 가치. */
const OUTCOMES: {
    icon: LucideIcon;
    title: string;
    before: string;
    after: string;
    value: string;
}[] = [
    {
        icon: Boxes,
        title: "신규 개발자의 온보딩이 빨라집니다",
        before: "신규 인력이 레거시 코드를 이해하는 데 수주~수개월",
        after: "프로젝트 코드에 직접 질문하여 클래스·API·DB·호출 흐름을 즉시 이해",
        value: "개발자 적응 시간 단축 및 생산성 향상",
    },
    {
        icon: ShieldCheck,
        title: "소스코드가 외부로 유출되지 않습니다",
        before: "외부 AI 서비스 사용 시 소스코드 반출 및 보안 우려",
        after: "온프레미스·폐쇄망 환경에서 코드와 데이터가 내부에 안전하게 유지",
        value: "금융·공공·대기업 보안 정책 충족",
    },
    {
        icon: FileCheck2,
        title: "우리 프로젝트에 맞는 답을 제공합니다",
        before: "범용 AI의 일반적인 코드 설명",
        after: "프로젝트 코드를 기반으로 실제 컴포넌트·API·DB·근거 파일까지 함께 제시",
        value: "정확한 답변과 신뢰 가능한 코드 근거 제공",
    },
    {
        icon: Workflow,
        title: "유지보수 생산성이 크게 향상됩니다",
        before: "담당자 경험에 의존한 코드 탐색과 분석",
        after: "질문 한 번으로 관련 코드·호출 관계·영향 범위를 즉시 확인",
        value: "장애 대응 및 변경 영향 분석 시간 단축",
    },
];

/** 보안 태세 트러스트 바. */
const TRUST: { icon: LucideIcon; label: string; sub: string }[] = [
    { icon: ShieldCheck, label: "온프레미스 설치", sub: "소스·데이터 사내 보관" },
    { icon: Boxes, label: "폐쇄망 대응", sub: "Air-gap 환경 배포" },
    { icon: GitBranch, label: "GitLab 접근통제", sub: "계정·권한 기반" },
    { icon: Layers, label: "모델 중립", sub: "원하는 LLM 선택·교체" },
];

/** 3대 강점. */
const PILLARS: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: Boxes,
        title: "프로젝트 전체를 이해",
        desc: "코드뿐 아니라 API·DB 스키마·정책 문서까지 학습해, 무엇을 어디에 만들지 코드 수준으로 안내합니다.",
    },
    {
        icon: ShieldCheck,
        title: "온프레미스 보안",
        desc: "사내 인프라에 설치돼 소스와 데이터가 외부로 나가지 않습니다. GitLab 계정으로 접근을 통제합니다.",
    },
    {
        icon: Layers,
        title: "모델 중립",
        desc: "관리형 AI 게이트웨이로 원하는 LLM을 선택·교체하며, AI 생태계 변화에 지속적으로 대응합니다.",
    },
];

/** 핵심 기능. */
const CAPABILITIES: { icon: LucideIcon; title: string; en: string; desc: string }[] = [
    {
        icon: GitBranch,
        title: "저장소 기반 응답",
        en: "Repository-Grounded",
        desc: "GitLab 저장소를 선택하면 해당 코드베이스에 근거해 답합니다. 실제 컴포넌트·파일 구조를 참조해 재사용 방법과 구현 절차를 제시합니다.",
    },
    {
        icon: Database,
        title: "스키마 인지",
        en: "Schema-Aware",
        desc: "DB 스키마와 테이블 간 관계(관계·카디널리티·설명)를 학습해, 특정 업무에 필요한 테이블·API를 정확히 짚어 줍니다.",
    },
    {
        icon: SplitSquareVertical,
        title: "질문 분해",
        en: "Question Decomposition",
        desc: "질문을 API·CODE·TABLE 단위로 분해한 뒤 종합해, 단편적 답변 대신 더 풍부하고 정밀한 답변을 생성합니다.",
    },
    {
        icon: FileCheck2,
        title: "코드 리뷰·개선 제안",
        en: "Code Review",
        desc: "기존 코드의 문제점을 짚고, 인증·오류 처리·성능 등 코드 수준의 구체적인 개선안을 예시 코드와 함께 제안합니다.",
    },
    {
        icon: Code2,
        title: "신규 기능 설계 지원",
        en: "Feature Design",
        desc: "재사용할 컴포넌트·패턴을 찾아 구현 절차와 예시 코드를 제시해, 기획 아이디어를 실제 구현으로 잇습니다.",
    },
    {
        icon: Search,
        title: "엔드포인트 탐색",
        en: "API Discovery",
        desc: "방대한 코드베이스에서 필요한 API 엔드포인트와 관련 컨트롤러를 찾아, 정확한 경로와 사용법을 안내합니다.",
    },
];

/** 작동 원리 — 인덱싱 → 검색(RAG) → MCP → 응답. */
const STEPS: { step: string; title: string; desc: string }[] = [
    {
        step: "01",
        title: "저장소 인덱싱",
        desc: "GitLab 저장소를 전체·증분 동기화로 인덱싱하고, 코드·API·DB 스키마·산출물을 벡터로 학습합니다.",
    },
    {
        step: "02",
        title: "컨텍스트 검색 (RAG)",
        desc: "질문을 분해해 관련 코드·스키마·문서를 검색하고, 근거로 삼아 접지(grounding)합니다.",
    },
    {
        step: "03",
        title: "MCP 파이프라인",
        desc: "Model Context Protocol로 도구와 컨텍스트를 표준 방식으로 연결해, 필요한 정보를 안전하게 가져옵니다.",
    },
    {
        step: "04",
        title: "코드 수준 응답",
        desc: "검색한 근거에 접지해, 프로젝트 맥락에 맞는 코드 수준의 답변을 생성합니다.",
    },
];

/** 연동·배포. */
const INTEGRATIONS: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: GitBranch,
        title: "GitLab 연동",
        desc: "GitLab 계정으로 로그인하고 저장소를 연동합니다. GitLab Duo 하이브리드 구성으로 언어 커버리지를 넓힙니다.",
    },
    {
        icon: ShieldCheck,
        title: "온프레미스 배포",
        desc: "사내 GPU 서버에 설치하고, 관리형 AI 게이트웨이로 폐쇄망 환경까지 대응합니다.",
    },
    {
        icon: Workflow,
        title: "산출물 RAG 연계",
        desc: "정책서·설계 문서 등 도메인 산출물을 RAG로 추가해, 코드 밖의 맥락까지 답변에 반영합니다.",
    },
];

/** 범용 도구 대비 차별점. */
const COMPARISON: { aspect: string; generic: string; ca: string }[] = [
    {
        aspect: "프로젝트 이해",
        generic: "일반적인 답변 — 프로젝트 맥락 이해가 제한적",
        ca: "사내 코드·API·스키마·산출물을 학습해 프로젝트 맥락을 이해",
    },
    {
        aspect: "답변 수준",
        generic: "원론적 설명 위주",
        ca: "실제 컴포넌트·엔드포인트·테이블을 짚는 코드 수준 답변",
    },
    {
        aspect: "보안",
        generic: "외부 클라우드 전송이 전제되는 경우가 많음",
        ca: "온프레미스·폐쇄망 설치로 소스가 사내에 머무름",
    },
    {
        aspect: "모델 선택",
        generic: "벤더 모델에 종속",
        ca: "관리형 게이트웨이로 원하는 LLM 선택·교체",
    },
];

/** 활용 사례. */
const USE_CASES: { icon: LucideIcon; title: string; points: string[] }[] = [
    {
        icon: Workflow,
        title: "신규 기능 구현 가이드",
        points: [
            "재사용 가능한 컴포넌트·패턴을 찾아 제시",
            "구현 절차와 예시 코드까지 함께 안내",
            "관련 API·테이블을 짚어 설계로 연결",
        ],
    },
    {
        icon: Search,
        title: "API · 스키마 탐색",
        points: [
            "필요한 엔드포인트와 컨트롤러 위치 파악",
            "DB 테이블·관계·카디널리티 확인",
            "업무에 맞는 API·테이블을 정확히 지목",
        ],
    },
    {
        icon: Boxes,
        title: "레거시 이해 · 온보딩",
        points: [
            "대규모 코드베이스 구조를 코드 수준으로 설명",
            "문서화되지 않은 로직도 근거와 함께 파악",
            "신규 인력의 온보딩 기간 단축",
        ],
    },
    {
        icon: FileCheck2,
        title: "코드 리뷰 · 개선",
        points: [
            "인증·오류 처리·성능 등 문제점 진단",
            "예시 코드가 포함된 구체적 개선안",
            "규칙·보안 위반 사전 점검",
        ],
    },
];

const FAQ: { q: string; a: string }[] = [
    {
        q: "기존 코드베이스를 학습하나요?",
        a: "네. GitLab 저장소를 인덱싱해 코드, API, DB 스키마, 산출물 등을 지식화하고, 해당 저장소를 근거로 답변을 생성합니다. 저장소를 선택하지 않으면 일반 AI 채팅 모드로도 자유롭게 이용할 수 있습니다.",
    },
    {
        q: "소스 코드가 외부로 전송되나요?",
        a: "아니요. AI Code Assistant는 온프레미스·폐쇄망에 설치되어 소스와 데이터가 사내에 머뭅니다.",
    },
    {
        q: "특정 LLM에 종속되나요?",
        a: "아니요. 관리형 AI 게이트웨이를 통해 원하는 모델을 선택하고 교체할 수 있어, AI 생태계 변화에 지속적으로 대응합니다.",
    },
    {
        q: "GitHub Copilot 같은 범용 코드 어시스턴트와 무엇이 다른가요?",
        a: "범용 도구는 프로젝트를 깊이 이해하지 못해 원론적 답변에 그치는 경우가 많습니다. AI Code Assistant는 사내 프로젝트 전체를 학습해, 실제 컴포넌트·엔드포인트·테이블을 짚는 코드 수준의 구체적 답변을 제공합니다.",
    },
    {
        q: "GitLab 외 언어·환경도 지원하나요?",
        a: "GitLab Duo 하이브리드 구성으로 다양한 프로그래밍 언어와 환경까지 커버리지를 확장합니다.",
    },
];

export default function CodeAssistantPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "@id": absoluteUrl("/code-assistant#software"),
                        name: "AI Code Assistant",
                        applicationCategory: "DeveloperApplication",
                        applicationSubCategory: "Enterprise AI Code Assistant",
                        operatingSystem: "On-premise",
                        description:
                            "사내 코드·API·DB 스키마·산출물을 학습해 프로젝트 맥락에서 코드 수준으로 답하는 엔터프라이즈 코드 어시스턴트. GitLab 연동, 온프레미스 배포, 모델 중립 게이트웨이를 지원한다.",
                        url: absoluteUrl("/code-assistant"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        featureList: [
                            "저장소 기반 응답(Repository-Grounded)",
                            "DB 스키마 인지(Schema-Aware)",
                            "질문 분해(API·CODE·TABLE)",
                            "MCP(Model Context Protocol) 파이프라인",
                            "GitLab 연동 · GitLab Duo 하이브리드",
                            "온프레미스 · 모델 중립 게이트웨이",
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
                        { name: "AI Code Assistant", path: "/code-assistant" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[755px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                    <div>
                        <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                            Product · Code Assistant
                        </p>
                        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-[42px]">
                            우리 코드베이스를 이해하는 AI Code Assistant
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                            범용 자동완성을 넘어, 사내 코드·API·DB 스키마·산출물을 학습해 실제
                            프로젝트 맥락에서 코드 수준으로 답합니다. GitLab과 연동되고
                            온프레미스·폐쇄망에 설치돼 소스가 외부로 나가지 않습니다.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/contact?from=code-assistant"
                                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-white/90"
                            >
                                도입 문의
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/customers?product=code-assistant"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                고객사례 보기
                            </Link>
                        </div>
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            엔터프라이즈 · 온프레미스 코드 어시스턴트
                        </span>
                    </div>

                    {/* 키비주얼 — IDE 코드 에디터 목업(AI 제안) */}
                    <CodeAssistantHeroArt />
                </div>
            </section>

            {/* 보안 태세 트러스트 바 */}
            <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-6 py-7 md:grid-cols-4">
                    {TRUST.map((t) => (
                        <div key={t.label} className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <t.icon className="h-5 w-5" />
                            </span>
                            <div className="min-w-0">
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

            <ArchIndex sections={CA_SECTIONS} />

            <main>
                {/* Overview — 3대 강점 */}
                <section id="overview" className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Why Code Assistant
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            AI는 코드를 생성하는 것이 아니라, 우리 개발 환경을
                            이해해야 합니다
                        </h2>
                        <p className="mt-4 mx-auto max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            사내 Git 저장소와 개발 표준을 기반으로 프로젝트 맥락을
                            이해하고 정확한 답변을 제공합니다. 온프레미스 환경에서
                            소스코드를 안전하게 보호하며, 특정 AI 모델에 종속되지 않는
                            개방형 구조로 기업 환경에 맞는 LLM을 자유롭게 선택할 수
                            있습니다.
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
                                        {p.title}
                                    </h3>
                                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 도입 효과 — 의사결정자 관점 before → after */}
                <section
                    id="value"
                    className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Business Value
                        </p>
                        <h2 className="mt-3 max-w-4xl mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            AI Code Assistant 도입으로 개발 생산성과 운영 안정성을 동시에
                            확보합니다
                        </h2>
                        <p className="mt-4 mx-auto max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            프로젝트에 특화된 코드 이해와 안전한 온프레미스 운영으로 개발
                            속도는 높이고, 유지보수 비용은 줄입니다.
                        </p>
                        <div className="mt-14 divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                            {OUTCOMES.map((o, i) => (
                                <div
                                    key={o.title}
                                    className="grid gap-5 py-10 md:grid-cols-[128px_1fr] md:gap-10 lg:grid-cols-[168px_1fr]"
                                >
                                    {/* 큰 번호 */}
                                    <span className="bg-gradient-to-br from-[#00acee] to-[#185aea] bg-clip-text font-mono text-[48px] font-extrabold leading-none text-transparent md:text-[64px]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    {/* 콘텐츠 */}
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <o.icon className="h-5 w-5" />
                                            </span>
                                            <h3 className="text-[21px] font-bold tracking-tight text-[var(--color-ink)] md:text-[25px]">
                                                {o.title}
                                            </h3>
                                        </div>
                                        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                                            <div className="rounded-xl bg-[var(--color-surface-alt)] px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-[11.5px] font-bold text-[var(--color-ink-subtle)] ring-1 ring-[var(--color-line)]">
                                                    기존
                                                </span>
                                                <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                                    {o.before}
                                                </p>
                                            </div>
                                            <ArrowRight className="mx-auto hidden h-5 w-5 flex-none text-[#2f7bff] sm:block" />
                                            <div className="rounded-xl border border-[#bcd0f5] bg-[#eef4ff] px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-[#2f7bff] px-2.5 py-0.5 text-[11.5px] font-bold text-white">
                                                    도입 후
                                                </span>
                                                <p className="mt-1 text-[14px] font-medium leading-relaxed text-[var(--color-ink)]">
                                                    {o.after}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2.5 rounded-r-xl border-l-[3px] border-[#1f9d6b] bg-[#e7f7f0]/60 px-4 py-2.5">
                                            <span className="inline-flex flex-none items-center rounded-full bg-[#1f9d6b] px-2 py-0.5 text-[11px] font-bold text-white">
                                                핵심 가치
                                            </span>
                                            <span className="text-[14.5px] font-semibold leading-relaxed text-[var(--color-ink)]">
                                                {o.value}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capabilities — 핵심 기능 */}
                <section id="capabilities" className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Core Capabilities
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            핵심 기능
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            사내 코드·API·스키마를 학습해 프로젝트 맥락에서 정확하게
                            답하는 기능들입니다.
                        </p>
                        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {CAPABILITIES.map((c, i) => (
                                <div
                                    key={c.title}
                                    className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5] hover:shadow-[0_18px_44px_-22px_rgba(20,40,80,0.28)]"
                                >
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute -right-1 top-1 font-mono text-[64px] font-extrabold leading-none text-[#2f7bff]/[0.07]"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {c.title}
                                    </h3>
                                    <p className="mt-0.5 font-mono text-[11.5px] font-semibold uppercase tracking-wider text-[#4a6aa8]">
                                        {c.en}
                                    </p>
                                    <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works — 작동 원리 */}
                <section id="how-it-works" className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            How It Works
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            작동 원리
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            저장소를 인덱싱해 근거를 만들고, 질문에 맞는 컨텍스트를
                            검색해 코드 수준의 답을 생성합니다.
                        </p>
                        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {STEPS.map((s) => (
                                <li
                                    key={s.step}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="font-mono text-[14px] font-bold text-[#2f7bff]">
                                        {s.step}
                                    </span>
                                    <h3 className="mt-2 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {s.desc}
                                    </p>
                                </li>
                            ))}
                        </ol>
                        {/* 아키텍처 연계 */}
                        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                게이트웨이 기반 인증 격리와 인덱싱·RAG·MCP로 구성된 전체
                                구조는 아키텍처 문서에서 자세히 확인할 수 있습니다.
                            </p>
                            <Link
                                href="/architecture#code-assistant"
                                className="group inline-flex flex-none items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                            >
                                코드 어시스턴트 아키텍처 자세히 보기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Comparison — 범용 도구 대비 */}
                <section className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            범용 코드 어시스턴트와 무엇이 다른가
                        </h2>
                        <div className="mt-8 overflow-x-auto">
                            <table className="w-full min-w-[640px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-[var(--color-line-strong)]">
                                        <th className="py-3 pr-4 text-[14px] font-bold text-[var(--color-ink-subtle)]"> </th>
                                        <th className="py-3 pr-4 text-[15px] font-bold text-[var(--color-ink-muted)]">
                                            범용 코드 어시스턴트
                                        </th>
                                        <th className="py-3 pr-4 text-[15px] font-bold text-[#2461d8]">
                                            AI Code Assistant
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON.map((row) => (
                                        <tr key={row.aspect} className="border-b border-[var(--color-line)]">
                                            <td className="py-4 pr-4 text-[15px] font-bold text-[var(--color-ink)]">
                                                {row.aspect}
                                            </td>
                                            <td className="py-4 pr-4 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {row.generic}
                                            </td>
                                            <td className="py-4 pr-4 text-[14.5px] leading-relaxed text-[var(--color-ink)]">
                                                <span className="inline-flex items-start gap-1.5">
                                                    <Check className="mt-0.5 h-4 w-4 flex-none text-[#2f7bff]" />
                                                    {row.ca}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Integrations — 연동·배포 */}
                <section id="integrations" className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            연동과 배포
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {INTEGRATIONS.map((it) => (
                                <div
                                    key={it.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <it.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {it.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {it.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Specs — 기술 사양 */}
                <section id="specs" className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Technical Specs
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            기술 사양 · 연동
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            기존 개발 환경과의 연동 방식부터 핵심 기술 사양까지 한눈에
                            확인할 수 있습니다.
                        </p>
                        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
                            {SPECS.map((s) => (
                                <div key={s.label} className="flex gap-4 bg-white p-6">
                                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <s.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {s.label}
                                        </p>
                                        <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {s.detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Use Cases — 활용 사례 */}
                <section id="use-cases" className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Use Cases
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            활용 사례
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            사내 코드·API·스키마를 이해하는 AI Code Assistant가 실제 개발
                            현장에서 어떻게 활용되는지 소개합니다.
                        </p>
                        <div className="mt-10 grid gap-4 md:grid-cols-2">
                            {USE_CASES.map((u) => (
                                <div
                                    key={u.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <u.icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {u.title}
                                        </h3>
                                    </div>
                                    <ul className="mt-4 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4">
                                        {u.points.map((pt) => (
                                            <li
                                                key={pt}
                                                className="flex items-start gap-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                            >
                                                <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/customers?product=code-assistant"
                            className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            AI Code Assistant 고객사례 보기
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* FAQ */}
                <section className="scroll-mt-[140px] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-3xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
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

                {/* 도입 이후 지원 — 교육·운영/기술지원 연계 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            After Deployment
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            도입 이후에도 함께합니다
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            구축으로 끝나지 않습니다. 조직 내재화를 위한 교육과 안정적 운영을
                            위한 기술지원까지 이어집니다.
                        </p>
                        <div className="mt-8">
                            <PostDeploymentSupport />
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                                우리 코드베이스에 맞춰 검토해 보세요
                            </h2>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                사내 저장소와 개발 환경에 맞는 도입 방안을 함께 설계해 드립니다.
                            </p>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-3">
                            <Link
                                href="/contact?from=code-assistant"
                                className="inline-flex items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2461d8]"
                            >
                                도입 문의
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact?type=poc&from=code-assistant"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-white"
                            >
                                보안·도입 요건 상담
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
