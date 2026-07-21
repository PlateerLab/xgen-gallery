import Link from "next/link";
import {
    ShoppingCart,
    ShieldCheck,
    SlidersHorizontal,
    Boxes,
    Search,
    Languages,
    Layers,
    Bot,
    Headset,
    Check,
    ChevronRight,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Polar — 커머스 특화 Private sLLM",
    description:
        "Polar는 플래티어가 개발한 이커머스 특화 Private sLLM입니다. 온프레미스로 기업 데이터를 안전하게 보호하면서 도메인 최적화 모델·RAG·Fine-tuning으로 커머스 AI 애플리케이션을 구축·운영합니다.",
    path: "/polar",
});

/** 왜 Polar인가 — 3대 강점. (구 xgen.im Polar) */
const PILLARS: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: ShoppingCart,
        title: "커머스 특화 sLLM",
        desc: "커머스에 특화된 고품질 데이터를 학습해 커머스에 최적화된 AI 기능을 제공합니다.",
    },
    {
        icon: ShieldCheck,
        title: "온프레미스 보안",
        desc: "기업 핵심 데이터를 내부에서 관리해 민감 데이터의 외부 유출을 방지합니다.",
    },
    {
        icon: SlidersHorizontal,
        title: "고객사 최적화",
        desc: "고객사별로 유연하게 파운데이션 모델을 적용하고, 고유 데이터를 학습(RAG)해 맞춤화합니다.",
    },
];

/** 핵심 기술 — 도메인 최적화·RAG·Fine-tuning·한국어 임베딩. (이미지: 구 xgen.im Polar) */
const TECH: {
    icon: LucideIcon;
    title: string;
    desc: string;
    img: string;
    imgAlt: string;
    w: number;
    h: number;
}[] = [
    {
        icon: Layers,
        title: "도메인 최적화 모델",
        desc: "이커머스 데이터 기반 학습과 맞춤형 Fine-tuning으로 이커머스에 최적화된 전용 AI 모델을 구축합니다.",
        img: "/polar/polar-tech-domain.svg",
        imgAlt: "이커머스 특화 데이터 학습(상품·카테고리·상품설명 데이터) → 맞춤형 Fine-Tuning 적용(감정 분류·텍스트 분류·개체명 인식·의도 분류·형태소 분석·요약 생성)",
        w: 1039,
        h: 437,
    },
    {
        icon: Search,
        title: "RAG 성능",
        desc: "Vector Embedding으로 빠르고 정교한 검색을 수행하고, ReRANKER 모델을 적용해 미세한 문맥 차이까지 식별합니다.",
        img: "/polar/polar-tech-rag.svg",
        imgAlt: "RAG 파이프라인 — Docs → Embedding → Vector DB → Filtered Docs → ReRANKER → Reranked Docs → Response",
        w: 1021,
        h: 617,
    },
    {
        icon: Boxes,
        title: "Fine-tuning 기술",
        desc: "FFT·PEFT·SFT·DPO 등 다양한 기법을 활용해 모델 성능을 고도화합니다.",
        img: "/polar/polar-tech-finetune.svg",
        imgAlt: "Base LLM → Fine-Tuning 기술(FFT·SFT·PEFT·DPO) → Fine-Tuned sLLM",
        w: 892,
        h: 263,
    },
    {
        icon: Languages,
        title: "한국어 모델",
        desc: "ModernBert 기반으로 한국어 성능을 강화해, 한국어 텍스트의 잠재적 의미를 파악하는 고성능 임베딩 모델을 운영합니다.",
        img: "/polar/polar-tech-korean.svg",
        imgAlt: "한국어 텍스트 → ModernBERT 기반 Embedding Model → Text as Vector(0.027, -0.011, …)",
        w: 1279,
        h: 456,
    },
];

/** 활용 — 커머스 특화 에이전트 3종. (이미지: 구 xgen.im Polar) */
const USECASES: {
    icon: LucideIcon;
    en: string;
    ko: string;
    desc: string;
    items: string[];
    img: string;
    imgAlt: string;
}[] = [
    {
        icon: Search,
        en: "AI Search Agent",
        ko: "AI 검색 에이전트",
        desc: "AI 검색 엔진으로 정교한 검색 경험을 제공합니다.",
        items: ["시맨틱 검색", "이미지 검색"],
        img: "/polar/polar-uc-search.svg",
        imgAlt: "AI 검색 — '입기 편하고 날씬해보이는 바지가 필요해' 질의를 의미 기반 태그 그래프로 해석해 정교하게 검색",
    },
    {
        icon: Bot,
        en: "AI Shop Agent",
        ko: "AI 쇼핑 에이전트",
        desc: "초개인화 쇼핑 어시스턴트로 차별화된 고객 경험을 제공합니다.",
        items: ["상품 비교", "개인화 추천"],
        img: "/polar/polar-uc-shop.svg",
        imgAlt: "AI 쇼핑 — 고객 클릭 데이터·구매 이력·최근 트렌드·선호도·날씨를 종합해 딱 맞는 상품을 추천",
    },
    {
        icon: Headset,
        en: "CS Agent",
        ko: "CS 에이전트",
        desc: "커머스 AI로 고객 경험과 운영 효율성을 극대화합니다.",
        items: ["맞춤형 메시지", "상품평 요약"],
        img: "/polar/polar-uc-cs.svg",
        imgAlt: "CS 응대 — 1:1 문의·상품 Q&A·작성 상품평을 분석해 고객 성향을 파악하고 응대 가이드를 제공",
    },
];

/** FAQ — GEO용 FAQPage JSON-LD와 화면 공용. */
const FAQ: { q: string; a: string }[] = [
    {
        q: "Polar는 무엇인가요?",
        a: "Polar는 플래티어가 개발한 이커머스 특화 Private sLLM(small LLM)입니다. 커머스 도메인 데이터로 학습해 검색·추천·상담 등 커머스 AI 기능을 제공하며, 온프레미스로 기업 데이터를 안전하게 보호합니다.",
    },
    {
        q: "sLLM은 대형 LLM과 무엇이 다른가요?",
        a: "sLLM은 특정 도메인에 최적화된 소형 언어모델입니다. Polar는 이커머스에 특화된 고품질 데이터를 학습하고 Fine-tuning·RAG로 최적화해, 범용 대형 모델보다 커머스 업무에서 높은 정확성과 운영 효율을 제공합니다.",
    },
    {
        q: "데이터 보안은 어떻게 보장되나요?",
        a: "구축형 온프레미스 및 프라이빗 클라우드로 운영할 수 있어 기업 핵심 데이터가 외부로 유출되지 않습니다. 내부 데이터를 학습해 정확성을 높이면서도 데이터는 기업 내부에 안전하게 보관됩니다.",
    },
    {
        q: "Polar는 XGEN과 어떻게 함께 쓰나요?",
        a: "Polar는 커머스에 특화된 모델 레이어로, XGEN Agentic AI 플랫폼 위에서 검색·쇼핑·CS 에이전트를 구성하는 데 활용됩니다. XGEN의 Agent Builder·ModelOps와 결합해 커머스 AI 서비스를 설계·운영할 수 있습니다.",
    },
];

export default function PolarPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "@id": absoluteUrl("/polar#software"),
                        name: "Polar",
                        alternateName: "Polar sLLM",
                        applicationCategory: "BusinessApplication",
                        applicationSubCategory: "Commerce-specialized Private sLLM",
                        operatingSystem: "On-premise",
                        description:
                            "플래티어가 개발한 이커머스 특화 Private sLLM. 도메인 최적화 모델·RAG·Fine-tuning으로 커머스 AI 애플리케이션을 온프레미스에서 구축·운영한다.",
                        url: absoluteUrl("/polar"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        featureList: [
                            "커머스 특화 sLLM",
                            "온프레미스 · 프라이빗 클라우드 보안",
                            "RAG (Vector Embedding + ReRANKER)",
                            "Fine-tuning (FFT·PEFT·SFT·DPO)",
                            "ModernBert 기반 한국어 임베딩",
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
                        { name: "Polar", path: "/polar" },
                    ]),
                ]}
            />

            {/* Hero — 다크 배경 + 커머스 sLLM 노드 네트워크 일러스트(풀블리드) */}
            <section className="relative overflow-hidden border-b border-white/10 bg-[#070b1c] text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/polar/polar-hero.svg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-[#070b1c] via-[#070b1c]/75 to-transparent"
                />
                <div className="relative mx-auto flex min-h-[720px] w-full max-w-6xl items-center px-6 pt-20">
                    <div className="max-w-xl">
                        <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                            Product · Polar
                        </p>
                        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                            커머스를 위한 Private sLLM, Polar
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                            Polar는 플래티어가 개발한 이커머스 특화 sLLM입니다. 기업 데이터를
                            안전하게 보호하면서 다양한 AI 애플리케이션과 서비스를 개발·운영할 수
                            있도록 커머스 도메인에 최적화된 모델을 제공합니다.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            이커머스 특화 · 온프레미스 sLLM
                        </span>
                    </div>
                </div>
            </section>

            <main>
                {/* 왜 Polar인가 (소개 / Overview) */}
                <section id="overview" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Why Polar
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            자체 개발 sLLM으로 데이터 유출 걱정을 해결합니다
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            구축형 온프레미스·프라이빗 클라우드로 운영하고, 내부 데이터
                            학습으로 정확성을 확보하며, 고객 맞춤 Fine-tuning과 RAG로
                            비즈니스를 최적화합니다.
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

                {/* 작동 원리 (How It Works) */}
                <section id="how-it-works" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            How it works
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            Polar의 작동 방식
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            질의 분석부터 생성·검증·답변 생성까지, Polar는 도메인 최적화
                            모델과 RAG를 결합해 정확한 커머스 답변을 만들어냅니다.
                        </p>
                        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white p-6 md:p-10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/polar/polar-architecture.svg"
                                alt="Polar 작동 원리 — 사용자 질문 → Polar sLLM(질의 분석·생성 요청·답변 검증) → RAG 검색(지식베이스·ReRANKER 재정렬) → 정확한 답변"
                                className="mx-auto h-auto w-full min-w-[720px] max-w-[1080px]"
                            />
                        </div>
                    </div>
                </section>

                {/* 핵심 기술 (Technology) */}
                <section id="technology" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Core Technology
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            커머스에 최적화된 핵심 기술
                        </h2>
                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            {TECH.map((t) => (
                                <div
                                    key={t.title}
                                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white"
                                >
                                    <div className="flex h-56 items-center justify-center border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] p-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={t.img}
                                            alt={t.imgAlt}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 p-6">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <t.icon className="h-5 w-5" />
                                            </span>
                                            <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {t.title}
                                            </h3>
                                        </div>
                                        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {t.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 활용 사례 (Use Cases) */}
                <section id="use-cases" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Use Cases
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            커머스 특화 에이전트
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            Polar는 검색·쇼핑·상담 전 영역에서 커머스에 최적화된 에이전트로
                            고객 경험과 운영 효율을 끌어올립니다.
                        </p>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {USECASES.map((u) => (
                                <div
                                    key={u.en}
                                    className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="aspect-[4/3] border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={u.img}
                                            alt={u.imgAlt}
                                            className="h-full w-full object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <u.icon className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                                    {u.en}
                                                </h3>
                                                <p className="text-[13px] font-semibold text-[#2461d8]">
                                                    {u.ko}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {u.desc}
                                        </p>
                                        <ul className="mt-4 flex flex-wrap gap-2">
                                            {u.items.map((it) => (
                                                <li
                                                    key={it}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-[13.5px] font-medium text-[var(--color-ink-muted)]"
                                                >
                                                    <Check className="h-3.5 w-3.5 text-[#2f7bff]" />
                                                    {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
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
                            Commerce-specialized AI
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-[40px]">
                            커머스 AI, Polar로 시작하세요
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            이커머스에 특화된 Private sLLM으로 검색·쇼핑·상담 경험을
                            혁신하세요. 도입 범위와 방식은 조직 상황에 맞춰 함께 설계합니다.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                Polar 도입 문의
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/product"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                XGEN 플랫폼 보기
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
