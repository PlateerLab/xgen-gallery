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
import { PostDeploymentSupport } from "@/components/post-deployment-support";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";

/** 왜 Polar인가 — 3대 강점. (구 xgen.im Polar) */
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const PILLAR_ICONS: LucideIcon[] = [ShoppingCart, ShieldCheck, SlidersHorizontal];
const TECH_ICONS: LucideIcon[] = [Layers, Search, Boxes, Languages];
const TECH_IMGS = [
    { img: "/polar/polar-tech-domain.svg", w: 1200, h: 630 },
    { img: "/polar/polar-tech-rag.svg", w: 1200, h: 630 },
    { img: "/polar/polar-tech-finetune.svg", w: 1200, h: 630 },
    { img: "/polar/polar-tech-korean.svg", w: 1200, h: 630 },
];
const USECASE_ICONS: LucideIcon[] = [Search, Bot, Headset];
const USECASE_EN = ["AI Search Agent", "AI Shop Agent", "CS Agent"];
const USECASE_IMGS = [
    "/polar/polar-uc-search.svg",
    "/polar/polar-uc-shop.svg",
    "/polar/polar-uc-cs.svg",
];

interface PolarCopy {
    ldDescription: string;
    ldFeatures: string[];
    pillars: [string, string][];
    /**
     * 커머스 AI가 개별 기능에서 플랫폼으로, 다시 통합 Ops로 넘어온 흐름.
     * 단계마다 무엇이 달라졌는지를 보여주는 자리다 — 연도별 릴리스 이력이 아니다.
     */
    journey: {
        title: string;
        lead: string;
        stages: {
            phase: string;
            when: string;
            /**
             * 그 단계가 무엇이었는지 한 줄로 말하는 핵심 메시지. 카드의 제목 자리다.
             * 세 카드의 이 줄만 훑어도 기능 → 플랫폼 → 운영 최적화 흐름이 읽혀야 한다.
             */
            headline: string;
            /** 그 단계를 부르는 이름(제품명·사업명). 핵심 메시지를 받치는 라벨이다. */
            name: string;
            desc: string;
            items: string[];
        }[];
        note: string;
        footnote: string;
    };
    tech: { title: string; desc: string; imgAlt: string }[];
    usecases: { ko: string; desc: string; items: string[]; imgAlt: string }[];
    faq: { q: string; a: string }[];
    heroTitle: string;
    heroLead: string;
    heroChip: string;
    pillarsTitle: string;
    pillarsLead: string;
    howTitle: string;
    howLead: string;
    howAlt: string;
    techTitle: string;
    usecasesTitle: string;
    usecasesLead: string;
    faqTitle: string;
    afterTitle: string;
    afterLead: string;
    closingTitle: string;
    closingLead: string;
    ctaContact: string;
    ctaPlatform: string;
}

const COPY: Record<Locale, PolarCopy> = {
    ko: {
        ldDescription:
            "플래티어가 개발한 이커머스 특화 Private sLLM. 도메인 최적화 모델·RAG·Fine-tuning으로 커머스 AI 애플리케이션을 온프레미스에서 구축·운영한다.",
        ldFeatures: [
            "커머스 특화 sLLM",
            "온프레미스 · 프라이빗 클라우드 보안",
            "RAG (Vector Embedding + ReRANKER)",
            "Fine-tuning (FFT·PEFT·SFT·DPO)",
            "ModernBert 기반 한국어 임베딩",
        ],
        pillars: [
            ["커머스 특화 sLLM", "커머스에 특화된 고품질 데이터를 학습해 커머스에 최적화된 AI 기능을 제공합니다."],
            ["온프레미스 보안", "기업 핵심 데이터를 내부에서 관리해 민감 데이터의 외부 유출을 방지합니다."],
            ["고객사 최적화", "고객사별로 유연하게 파운데이션 모델을 적용하고, 고유 데이터를 학습(RAG)해 맞춤화합니다."],
        ],
        journey: {
            title: "AI는 기능에서 플랫폼으로 진화하고 있습니다",
            lead: "개별 AI 기능을 도입하던 단계에서, 하나의 Enterprise AI Platform으로 통합되는 단계로 옮겨가고 있습니다.",
            stages: [
                {
                    phase: "As-Was",
                    when: "이전",
                    headline: "업무별 AI 기능을 개별 도입",
                    name: "이커머스를 위한 AI",
                    desc: "업무별 AI 기능을 개별적으로 도입하여 운영 효율을 높이는 단계였습니다. 요약과 분석, 콘텐츠 생성, 수요 예측이 각각의 도구로 존재했습니다.",
                    items: [
                        "비즈니스 데이터 요약·분석",
                        "제품·마케팅 콘텐츠 생성",
                        "재고·매출 예측 및 제안",
                    ],
                },
                {
                    phase: "As-Is",
                    when: "현재",
                    headline: "커머스 전용 AI 플랫폼 구축",
                    name: "POLAR — 커머스 특화 Enterprise AI Platform",
                    desc: "커머스 데이터를 이해하는 Private LLM을 기반으로 검색, 추천, 콘텐츠 생성 등 다양한 AI 서비스를 하나의 플랫폼에서 제공합니다.",
                    items: [
                        "챗봇",
                        "시맨틱·이미지 검색",
                        "Commerce+",
                        "Code Assistant",
                    ],
                },
                {
                    phase: "To-Be",
                    when: "2025~",
                    headline: "AI가 운영을 지속적으로 최적화",
                    name: "AI-Driven Commerce Operations",
                    desc: "고객 데이터와 운영 데이터를 하나의 AI 플랫폼에서 연결하여 개인화, 운영 자동화, 의사결정 지원을 제공합니다.",
                    items: [
                        "개인화",
                        "업무 자동화",
                        "운영 최적화",
                        "AI 의사결정",
                    ],
                },
            ],
            note: "성공적인 커머스 AI는 AI 모델만으로 완성되지 않습니다. 고객 데이터와 업무 프로세스, 운영 환경을 함께 이해하는 플랫폼과 도메인 전문성이 갖춰질 때 비로소 실제 비즈니스 성과로 이어집니다.",
            footnote:
                "POLAR — Plateer's Optimized LLM and Applications with Reliability",
        },
        tech: [
            {
                title: "도메인 최적화 모델",
                desc: "이커머스 데이터 기반 학습과 맞춤형 Fine-tuning으로 이커머스에 최적화된 전용 AI 모델을 구축합니다.",
                imgAlt: "이커머스 특화 데이터 학습(상품·카테고리·상품설명 데이터) → 맞춤형 Fine-Tuning 적용(감정 분류·텍스트 분류·개체명 인식·의도 분류·형태소 분석·요약 생성)",
            },
            {
                title: "RAG 성능",
                desc: "Vector Embedding으로 빠르고 정교한 검색을 수행하고, ReRANKER 모델을 적용해 미세한 문맥 차이까지 식별합니다.",
                imgAlt: "RAG 파이프라인 — Docs → Embedding → Vector DB → Filtered Docs → ReRANKER → Reranked Docs → Response",
            },
            {
                title: "Fine-tuning 기술",
                desc: "FFT·PEFT·SFT·DPO 등 다양한 기법을 활용해 모델 성능을 고도화합니다.",
                imgAlt: "Base LLM → Fine-Tuning 기술(FFT·SFT·PEFT·DPO) → Fine-Tuned sLLM",
            },
            {
                title: "한국어 모델",
                desc: "ModernBert 기반으로 한국어 성능을 강화해, 한국어 텍스트의 잠재적 의미를 파악하는 고성능 임베딩 모델을 운영합니다.",
                imgAlt: "한국어 텍스트 → ModernBERT 기반 Embedding Model → Text as Vector(0.027, -0.011, …)",
            },
        ],
        usecases: [
            {
                ko: "AI 검색 에이전트",
                desc: "AI 검색 엔진으로 정교한 검색 경험을 제공합니다.",
                items: ["시맨틱 검색", "이미지 검색"],
                imgAlt: "AI 검색 — '입기 편하고 날씬해보이는 바지가 필요해' 질의를 의미 기반 태그 그래프로 해석해 정교하게 검색",
            },
            {
                ko: "AI 쇼핑 에이전트",
                desc: "초개인화 쇼핑 어시스턴트로 차별화된 고객 경험을 제공합니다.",
                items: ["상품 비교", "개인화 추천"],
                imgAlt: "AI 쇼핑 — 고객 클릭 데이터·구매 이력·최근 트렌드·선호도·날씨를 종합해 딱 맞는 상품을 추천",
            },
            {
                ko: "CS 에이전트",
                desc: "커머스 AI로 고객 경험과 운영 효율성을 극대화합니다.",
                items: ["맞춤형 메시지", "상품평 요약"],
                imgAlt: "CS 응대 — 1:1 문의·상품 Q&A·작성 상품평을 분석해 고객 성향을 파악하고 응대 가이드를 제공",
            },
        ],
        faq: [
            { q: "Polar는 무엇인가요?", a: "Polar는 플래티어가 개발한 이커머스 특화 Private sLLM(small LLM)입니다. 커머스 도메인 데이터로 학습해 검색·추천·상담 등 커머스 AI 기능을 제공하며, 온프레미스로 기업 데이터를 안전하게 보호합니다." },
            { q: "sLLM은 대형 LLM과 무엇이 다른가요?", a: "sLLM은 특정 도메인에 최적화된 소형 언어모델입니다. Polar는 이커머스에 특화된 고품질 데이터를 학습하고 Fine-tuning·RAG로 최적화해, 범용 대형 모델보다 커머스 업무에서 높은 정확성과 운영 효율을 제공합니다." },
            { q: "데이터 보안은 어떻게 보장되나요?", a: "구축형 온프레미스 및 프라이빗 클라우드로 운영할 수 있어 기업 핵심 데이터가 외부로 유출되지 않습니다. 내부 데이터를 학습해 정확성을 높이면서도 데이터는 기업 내부에 안전하게 보관됩니다." },
            { q: "Polar는 XGEN과 어떻게 함께 쓰나요?", a: "Polar는 커머스에 특화된 모델 레이어로, XGEN Agentic AI 플랫폼 위에서 검색·쇼핑·CS 에이전트를 구성하는 데 활용됩니다. XGEN의 Agent Builder·ModelOps와 결합해 커머스 AI 서비스를 설계·운영할 수 있습니다." },
        ],
        heroTitle: "커머스를 위한 Private sLLM, Polar",
        heroLead:
            "Polar는 플래티어가 개발한 이커머스 특화 sLLM입니다. 기업 데이터를 안전하게 보호하면서 다양한 AI 애플리케이션과 서비스를 개발·운영할 수 있도록 커머스 도메인에 최적화된 모델을 제공합니다.",
        heroChip: "이커머스 특화 · 온프레미스 sLLM",
        pillarsTitle: "자체 개발 sLLM으로 데이터 유출 걱정을 해결합니다",
        pillarsLead:
            "구축형 온프레미스·프라이빗 클라우드로 운영하고, 내부 데이터 학습으로 정확성을 확보하며, 고객 맞춤 Fine-tuning과 RAG로 비즈니스를 최적화합니다.",
        howTitle: "Polar의 작동 방식",
        howLead:
            "질의 분석부터 생성·검증·답변 생성까지, Polar는 도메인 최적화 모델과 RAG를 결합해 정확한 커머스 답변을 만들어냅니다.",
        howAlt: "Polar 작동 원리 — 사용자 질문 → Polar sLLM(질의 분석·생성 요청·답변 검증) → RAG 검색(지식베이스·ReRANKER 재정렬) → 정확한 답변",
        techTitle: "커머스에 최적화된 핵심 기술",
        usecasesTitle: "커머스 특화 에이전트",
        usecasesLead:
            "Polar는 검색·쇼핑·상담 전 영역에서 커머스에 최적화된 에이전트로 고객 경험과 운영 효율을 끌어올립니다.",
        faqTitle: "자주 묻는 질문",
        afterTitle: "도입 이후에도 함께합니다",
        afterLead:
            "구축으로 끝나지 않습니다. 조직 내재화를 위한 교육과 안정적 운영을 위한 기술지원까지 이어집니다.",
        closingTitle: "커머스 AI, Polar로 시작하세요",
        closingLead:
            "이커머스에 특화된 Private sLLM으로 검색·쇼핑·상담 경험을 혁신하세요. 도입 범위와 방식은 조직 상황에 맞춰 함께 설계합니다.",
        ctaContact: "Polar 도입 문의",
        ctaPlatform: "XGEN 플랫폼 보기",
    },
    en: {
        ldDescription:
            "A private, e-commerce-specialized sLLM developed by Plateer. Domain-optimized models, RAG, and fine-tuning let you build and run commerce AI applications on-premise.",
        ldFeatures: [
            "Commerce-specialized sLLM",
            "On-premise and private cloud security",
            "RAG (Vector Embedding + ReRANKER)",
            "Fine-tuning (FFT · PEFT · SFT · DPO)",
            "Korean embedding built on ModernBERT",
        ],
        pillars: [
            ["Commerce-specialized sLLM", "Trained on high-quality commerce data, so the AI capabilities are tuned to commerce work."],
            ["On-premise security", "Core enterprise data stays under internal control, so sensitive data never leaves."],
            ["Tuned per customer", "Apply the foundation model flexibly per customer and adapt it to their own data through RAG."],
        ],
        journey: {
            title: "AI is moving from features to a platform",
            lead: "Commerce is shifting from adopting individual AI features to consolidating them into a single enterprise AI platform.",
            stages: [
                {
                    phase: "As-Was",
                    when: "Before",
                    headline: "AI adopted feature by feature",
                    name: "AI for e-commerce",
                    desc: "Teams adopted AI one function at a time to raise operational efficiency. Summarization, content generation, and demand forecasting each existed as a separate tool.",
                    items: [
                        "Business data summaries and analysis",
                        "Product and marketing content generation",
                        "Inventory and revenue forecasting",
                    ],
                },
                {
                    phase: "As-Is",
                    when: "Today",
                    headline: "A commerce-specific AI platform",
                    name: "POLAR — an enterprise AI platform built for commerce",
                    desc: "Built on a private LLM that understands commerce data, it delivers search, recommendation, content generation, and other AI services from a single platform.",
                    items: [
                        "Chatbot",
                        "Semantic and image search",
                        "Commerce+",
                        "Code Assistant",
                    ],
                },
                {
                    phase: "To-Be",
                    when: "2025 onward",
                    headline: "AI that keeps optimizing operations",
                    name: "AI-Driven Commerce Operations",
                    desc: "Customer data and operational data connect on one AI platform to deliver personalization, operational automation, and decision support.",
                    items: [
                        "Personalization",
                        "Automation",
                        "Operational optimization",
                        "Decision intelligence",
                    ],
                },
            ],
            note: "Successful commerce AI is not finished by the model alone. It turns into business results when a platform that understands customer data, work processes, and the operating environment comes together with domain expertise.",
            footnote:
                "POLAR — Plateer's Optimized LLM and Applications with Reliability",
        },
        tech: [
            {
                title: "Domain-optimized model",
                desc: "Training on e-commerce data plus custom fine-tuning produces a dedicated AI model tuned to commerce.",
                imgAlt: "Training on commerce-specific data (products, categories, descriptions) → custom fine-tuning (sentiment classification, text classification, named-entity recognition, intent classification, morphological analysis, summarization)",
            },
            {
                title: "RAG performance",
                desc: "Vector embedding delivers fast, precise retrieval, and a ReRANKER model picks up even fine contextual differences.",
                imgAlt: "RAG pipeline — Docs → Embedding → Vector DB → Filtered Docs → ReRANKER → Reranked Docs → Response",
            },
            {
                title: "Fine-tuning techniques",
                desc: "FFT, PEFT, SFT, and DPO among others are used to push model performance further.",
                imgAlt: "Base LLM → fine-tuning techniques (FFT, SFT, PEFT, DPO) → fine-tuned sLLM",
            },
            {
                title: "Korean language model",
                desc: "Korean performance is strengthened on a ModernBERT base, running a high-performance embedding model that captures the latent meaning of Korean text.",
                imgAlt: "Korean text → ModernBERT-based embedding model → text as vector (0.027, -0.011, …)",
            },
        ],
        usecases: [
            {
                ko: "AI search agent",
                desc: "An AI search engine that makes finding things precise.",
                items: ["Semantic search", "Image search"],
                imgAlt: "AI search — interpreting a query like \"I need trousers that are comfortable and slimming\" through a meaning-based tag graph for precise retrieval",
            },
            {
                ko: "AI shopping agent",
                desc: "A hyper-personalized shopping assistant that differentiates the customer experience.",
                items: ["Product comparison", "Personalized recommendation"],
                imgAlt: "AI shopping — combining click data, purchase history, current trends, preferences, and weather to recommend exactly the right product",
            },
            {
                ko: "Customer service agent",
                desc: "Commerce AI that lifts both customer experience and operational efficiency.",
                items: ["Tailored messaging", "Review summarization"],
                imgAlt: "Customer service — analyzing one-to-one inquiries, product Q&A, and written reviews to read customer disposition and provide a response guide",
            },
        ],
        faq: [
            { q: "What is Polar?", a: "Polar is a private, e-commerce-specialized sLLM (small LLM) developed by Plateer. Trained on commerce-domain data, it powers search, recommendation, and support capabilities while keeping enterprise data safe on-premise." },
            { q: "How does an sLLM differ from a large LLM?", a: "An sLLM is a smaller language model optimized for a specific domain. Polar trains on high-quality e-commerce data and is tuned with fine-tuning and RAG, which gives it higher accuracy and better operating efficiency on commerce work than a general-purpose large model." },
            { q: "How is data security guaranteed?", a: "It can run as an on-premise deployment or in a private cloud, so core enterprise data never leaves. Internal data improves accuracy while the data itself stays inside the organization." },
            { q: "How does Polar work with XGEN?", a: "Polar is the commerce-specialized model layer used to build search, shopping, and customer-service agents on top of the XGEN Agentic AI platform. Combined with XGEN's Agent Builder and ModelOps, you design and run commerce AI services end to end." },
        ],
        heroTitle: "Polar — a private sLLM built for commerce",
        heroLead:
            "Polar is an e-commerce-specialized sLLM developed by Plateer. It keeps enterprise data protected while providing a model tuned to the commerce domain, so you can build and run a range of AI applications and services on it.",
        heroChip: "E-commerce specialized · on-premise sLLM",
        pillarsTitle: "An in-house sLLM removes the data-leakage problem",
        pillarsLead:
            "Run it on-premise or in a private cloud, gain accuracy from training on internal data, and optimize the business with customer-specific fine-tuning and RAG.",
        howTitle: "How Polar works",
        howLead:
            "From query analysis through generation, verification, and the final answer, Polar combines a domain-optimized model with RAG to produce accurate commerce answers.",
        howAlt: "How Polar works — user question → Polar sLLM (query analysis, generation request, answer verification) → RAG retrieval (knowledge base, ReRANKER reordering) → accurate answer",
        techTitle: "The core technology, tuned for commerce",
        usecasesTitle: "Commerce-specialized agents",
        usecasesLead:
            "Across search, shopping, and support, Polar raises customer experience and operating efficiency with agents tuned to commerce.",
        faqTitle: "Frequently asked questions",
        afterTitle: "We stay with you after the rollout",
        afterLead:
            "It doesn't end at the build. Training that lands the capability inside your team, and technical support that keeps it running steadily.",
        closingTitle: "Start your commerce AI with Polar",
        closingLead:
            "Transform search, shopping, and support with a private sLLM built for e-commerce. We design the scope and approach together, around your situation.",
        ctaContact: "Ask about Polar",
        ctaPlatform: "See the XGEN platform",
    },
};

export function PolarPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const PILLARS = t.pillars.map(([title, desc], i) => ({
        icon: PILLAR_ICONS[i],
        title,
        desc,
    }));
    const TECH = t.tech.map((x, i) => ({ icon: TECH_ICONS[i], ...x, ...TECH_IMGS[i] }));
    const USECASES = t.usecases.map((x, i) => ({
        icon: USECASE_ICONS[i],
        en: USECASE_EN[i],
        ...x,
        img: USECASE_IMGS[i],
    }));
    const FAQ = t.faq;
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
                            t.ldDescription,
                        url: absoluteUrl("/polar"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        featureList: t.ldFeatures,
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
                        { name: "Home", path: home },
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
                <div className="relative mx-auto flex min-h-[755px] w-full max-w-7xl items-center px-6 pt-20">
                    <div className="max-w-xl">
                        <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                            Product · Polar
                        </p>
                        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-[42px]">
                            {t.heroTitle}
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                            {t.heroLead}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            {t.heroChip}
                        </span>
                    </div>
                </div>
            </section>

            <main>
                {/* 왜 Polar인가 (소개 / Overview) */}
                <section id="overview" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Why Polar
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.pillarsTitle}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
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

                {/* 커머스 AI의 이동 (As-Was → As-Is → To-Be) */}
                <section id="journey" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Evolution
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.journey.title}
                        </h2>
                        <p className="mt-4 mx-auto max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.journey.lead}
                        </p>

                        <ol className="mt-10 grid gap-4 md:grid-cols-3">
                            {t.journey.stages.map((s, i) => {
                                const now = i === 1;
                                const next = i === 2;
                                return (
                                    <li
                                        key={s.phase}
                                        className={[
                                            "relative flex flex-col rounded-2xl border p-7",
                                            next
                                                ? "border-[#2f7bff] bg-white shadow-[0_18px_44px_-24px_rgba(20,40,80,0.3)]"
                                                : now
                                                  ? "border-[#bcd0f5] bg-white"
                                                  : "border-[var(--color-line)] bg-[var(--color-surface-alt)]",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={[
                                                    "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider",
                                                    next
                                                        ? "bg-[#2f7bff] text-white"
                                                        : now
                                                          ? "bg-[#2f7bff]/10 text-[#2f7bff]"
                                                          : "bg-[var(--color-line)] text-[var(--color-ink-subtle)]",
                                                ].join(" ")}
                                            >
                                                {s.phase}
                                            </span>
                                            <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                                {s.when}
                                            </span>
                                        </div>

                                        {/* 핵심 메시지가 제목이다 — 세 카드의 이 줄만 훑어도 흐름이 읽힌다 */}
                                        <h3
                                            className={[
                                                "mt-4 text-[20px] font-bold leading-snug tracking-tight",
                                                next || now
                                                    ? "text-[var(--color-ink)]"
                                                    : "text-[var(--color-ink-muted)]",
                                            ].join(" ")}
                                        >
                                            {s.headline}
                                        </h3>
                                        <p
                                            className={[
                                                "mt-2 text-[14px] font-semibold leading-snug",
                                                next || now
                                                    ? "text-[#2f7bff]"
                                                    : "text-[var(--color-ink-subtle)]",
                                            ].join(" ")}
                                        >
                                            {s.name}
                                        </p>
                                        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {s.desc}
                                        </p>

                                        <ul className="mt-5 flex flex-wrap gap-2">
                                            {s.items.map((it) => (
                                                <li
                                                    key={it}
                                                    className={[
                                                        "rounded-full border px-3 py-1.5 text-[13px] font-medium",
                                                        next || now
                                                            ? "border-[#bcd0f5] bg-[#2f7bff]/[0.06] text-[#1f4fa8]"
                                                            : "border-[var(--color-line)] bg-white text-[var(--color-ink-muted)]",
                                                    ].join(" ")}
                                                >
                                                    {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ol>

                        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 text-center text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.journey.note}
                        </p>
                        <p className="mt-4 text-center font-mono text-[12px] text-[var(--color-ink-subtle)]">
                            {t.journey.footnote}
                        </p>
                    </div>
                </section>

                {/* 작동 원리 (How It Works) */}
                <section id="how-it-works" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            How it works
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.howTitle}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.howLead}
                        </p>
                        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white p-6 md:p-10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/polar/polar-architecture.svg"
                                alt={t.howAlt}
                                className="mx-auto h-auto w-full min-w-[720px] max-w-[1080px]"
                            />
                        </div>
                    </div>
                </section>

                {/* 핵심 기술 (Technology) */}
                <section id="technology" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Core Technology
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.techTitle}
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
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Use Cases
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.usecasesTitle}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.usecasesLead}
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
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            FAQ
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.faqTitle}
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

                {/* 도입 이후 지원 — 교육·운영/기술지원 연계 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            After Deployment
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.afterTitle}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.afterLead}
                        </p>
                        <div className="mt-8">
                            <PostDeploymentSupport locale={locale} />
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-white/45">
                            Commerce-specialized AI
                        </p>
                        <h2 className="mx-auto mt-4 text-center text-3xl font-bold tracking-tight md:text-[40px]">
                            {t.closingTitle}
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            {t.closingLead}
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href={localeHref(locale, "/contact") + "?from=polar"}
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                {t.ctaContact}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href={localeHref(locale, "/product")}
                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                {t.ctaPlatform}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
