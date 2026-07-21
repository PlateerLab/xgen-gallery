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
const USE_CASES: string[] = [
    "신규 기능 구현 가이드 — 재사용 컴포넌트·구현 절차·예시 코드",
    "API 엔드포인트·테이블 탐색",
    "레거시 코드 이해 및 신규 인력 온보딩",
    "코드 리뷰와 코드 수준 개선 제안",
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
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                        Product · Code Assistant
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        우리 코드베이스를 이해하는 AI Code Assistant
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        범용 자동완성을 넘어, 사내 코드·API·DB 스키마·산출물을 학습해 실제
                        프로젝트 맥락에서 코드 수준으로 답합니다. GitLab과 연동되고
                        온프레미스·폐쇄망에 설치돼 소스가 외부로 나가지 않습니다.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
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
            </section>

            <main>
                {/* Overview — 3대 강점 */}
                <section id="overview" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Why Code Assistant
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            코드를 아는 것을 넘어, 우리 프로젝트를 이해합니다
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            사내 저장소를 학습해 프로젝트 맥락에서 답하고, 온프레미스로
                            소스를 보호하며, 모델 중립 구조로 원하는 LLM을 선택합니다.
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

                {/* Capabilities — 핵심 기능 */}
                <section id="capabilities" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            핵심 기능
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            사내 코드·API·스키마를 학습해 프로젝트 맥락에서 정확하게
                            답하는 기능들입니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {CAPABILITIES.map((c) => (
                                <div
                                    key={c.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {c.title}
                                    </h3>
                                    <p className="mt-0.5 text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                        {c.en}
                                    </p>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works — 작동 원리 */}
                <section id="how-it-works" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            작동 원리
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
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
                    </div>
                </section>

                {/* Comparison — 범용 도구 대비 */}
                <section className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
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
                <section id="integrations" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
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

                {/* Use Cases — 활용 사례 */}
                <section id="use-cases" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            활용 사례
                        </h2>
                        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                            {USE_CASES.map((u) => (
                                <li
                                    key={u}
                                    className="flex items-start gap-2.5 rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                >
                                    <Check className="mt-0.5 h-4 w-4 flex-none text-[#2f7bff]" />
                                    {u}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/customers?product=code-assistant"
                            className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            Code Assistant 고객사례 보기
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* FAQ */}
                <section className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
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

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                                우리 코드베이스에 맞춰 검토해 보세요
                            </h2>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                사내 저장소와 개발 환경에 맞는 도입 방안을 함께 설계해 드립니다.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2461d8]"
                        >
                            도입 문의
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
