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
    X,
    Info,
    type LucideIcon,
} from "lucide-react";
import {
    PolarReveal,
    PolarPipeline,
    type PipelineCopy,
} from "@/components/polar/polar-motion";
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
    { img: "/polar/mk/tech-domain.webp", w: 1230, h: 800, diagram: "/polar/polar-tech-domain.svg" },
    { img: "/polar/mk/tech-rag.webp", w: 1230, h: 800, diagram: "/polar/polar-tech-rag.svg" },
    { img: "/polar/mk/tech-finetune.webp", w: 1230, h: 800, diagram: "/polar/polar-tech-finetune.svg" },
    { img: "/polar/mk/tech-korean.webp", w: 1230, h: 800, diagram: "/polar/polar-tech-korean.svg" },
];
const USECASE_ICONS: LucideIcon[] = [Search, Bot, Headset];
const USECASE_EN = ["AI Search Agent", "AI Shop Agent", "CS Agent"];
const USECASE_IMGS = [
    "/polar/mk/uc-search.webp",
    "/polar/mk/uc-shop.webp",
    "/polar/mk/uc-cs.webp",
];
/** 이전 Polar 페이지의 기술 구성도 — 실사 이미지 아래에 함께 보여준다. */
const USECASE_DIAGRAMS = [
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
    usecases: { ko: string; desc: string; items: string[]; imgAlt: string; diagramAlt: string }[];
    faq: { q: string; a: string }[];
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    heroChip: string;
    heroChips: string[];
    /** 히어로 사진 장면의 연관 엔터티 그래프 — 가운데 허브와 주변 엔터티 */
    heroGraph: { hub: string; nodes: string[] };
    heroPhotoAlt: string;
    /** 퍼블릭 LLM과 Polar 비교 — 장점만이 아니라 도입 시 고려 사항까지 함께 보여준다. */
    compare: {
        title: string;
        lead: string;
        beforeName: string;
        beforeSub: string;
        beforeItems: string[];
        afterName: string;
        afterSub: string;
        afterItems: string[];
        considerLabel: string;
        considerItems: string[];
    };
    pipeline: PipelineCopy;
    pillarsTitle: string;
    pillarsLead: string;
    howTitle: string;
    howLead: string;
    howAlt: string;
    archLabel: string;
    diagramLabel: string;
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
                items: ["의도를 파악하는 시맨틱 검색", "검색어 없이 찾는 이미지 검색"],
                imgAlt: "노트북 키보드 위에 놓인 돋보기",
                diagramAlt: "AI 검색 — '입기 편하고 날씬해보이는 바지가 필요해' 질의를 의미 기반 태그 그래프로 해석해 검색",
            },
            {
                ko: "AI 쇼핑 에이전트",
                desc: "초개인화 쇼핑 어시스턴트로 차별화된 고객 경험을 제공합니다.",
                items: ["AI 상품 비교 요약", "개인화 상품 추천"],
                imgAlt: "추천 상품 목록이 표시된 스마트폰을 든 손",
                diagramAlt: "AI 쇼핑 — 고객 클릭 데이터·구매 이력·최근 트렌드·선호도·날씨를 종합해 상품을 추천",
            },
            {
                ko: "CS 에이전트",
                desc: "커머스 AI로 고객 응대 경험과 운영 효율을 높입니다.",
                items: ["상품 특성에 맞춘 메시지 생성", "상품평 핵심 요약"],
                imgAlt: "데이터 대시보드가 띄워진 노트북으로 작업하는 손",
                diagramAlt: "CS 응대 — 1:1 문의·상품 Q&A·작성 상품평을 분석해 고객 성향을 파악하고 응대 가이드를 제공",
            },
        ],
        faq: [
            { q: "Polar는 무엇인가요?", a: "Polar는 플래티어가 개발한 이커머스 특화 Private sLLM(small LLM)입니다. 커머스 도메인 데이터로 학습해 검색·추천·상담 등 커머스 AI 기능을 제공하며, 온프레미스로 기업 데이터를 안전하게 보호합니다." },
            { q: "sLLM은 대형 LLM과 무엇이 다른가요?", a: "sLLM은 특정 도메인에 최적화된 소형 언어모델입니다. Polar는 이커머스에 특화된 고품질 데이터를 학습하고 Fine-tuning·RAG로 최적화해, 커머스 업무에 맞춘 정확성과 운영 효율을 목표로 합니다. 실제 성능은 학습 데이터와 구성에 따라 달라집니다." },
            { q: "데이터 보안은 어떻게 관리하나요?", a: "온프레미스 및 프라이빗 클라우드에서 기업 데이터의 처리·접근 범위를 관리할 수 있습니다. 외부 연동 시에는 전송 범위와 접근 정책을 별도로 설정해야 합니다. 내부 데이터를 학습해 정확성을 높이면서도 데이터는 기업 내부에 안전하게 보관됩니다." },
            { q: "Polar는 XGEN과 어떻게 함께 쓰나요?", a: "Polar는 커머스에 특화된 모델 레이어로, XGEN Agentic AI 플랫폼 위에서 검색·쇼핑·CS 에이전트를 구성하는 데 활용됩니다. XGEN의 Agent Builder·ModelOps와 결합해 커머스 AI 서비스를 설계·운영할 수 있습니다." },
        ],
        heroEyebrow: "Private sLLM for Commerce",
        heroTitle: "커머스를 위한 Private sLLM, Polar",
        heroLead:
            "Polar는 플래티어가 개발한 이커머스 특화 sLLM입니다. 기업 데이터를 안전하게 보호하면서 다양한 AI 애플리케이션과 서비스를 개발·운영할 수 있도록 커머스 도메인에 최적화된 모델을 제공합니다.",
        heroChip: "이커머스 특화 · 온프레미스 sLLM",
        heroChips: ["시맨틱 검색", "상품평 요약", "온프레미스 운영"],
        heroGraph: {
            hub: "Polar sLLM",
            nodes: ["시맨틱 검색", "상품평 요약", "추천 TOP-N", "고객 문의 응대", "온프레미스 운영", "주문·재고 데이터", "상품 카탈로그", "한국어 임베딩"],
        },
        heroPhotoAlt: "커머스 데이터 화면이 떠 있는 스마트폰을 든 손",
        compare: {
            title: "퍼블릭 LLM과 Polar, 무엇이 다른가요",
            lead: "어떤 방식으로 도입하느냐에 따라 비용 구조와 데이터 관리 방식이 달라집니다. 두 방식의 특성과 고려 사항을 함께 비교해 보세요.",
            beforeName: "퍼블릭 LLM",
            beforeSub: "퍼블릭 LLM API 연동 및 활용",
            beforeItems: [
                "API 연동으로 빠르게 적용할 수 있습니다",
                "방대한 데이터로 학습되고 업데이트가 빠릅니다",
                "별도 장비 없이 토큰 사용량만큼 비용이 발생합니다",
                "영업 비밀·고객 데이터 같은 민감 정보가 외부로 전송될 수 있어 관리 정책이 필요합니다",
                "환각 현상 가능성이 있어 결과 검증이 필요합니다",
            ],
            afterName: "Polar",
            afterSub: "구축형 온프레미스 · 프라이빗 클라우드 운영",
            afterItems: [
                "구축형 온프레미스와 프라이빗 클라우드에서 운영할 수 있습니다",
                "내부 데이터를 학습해 커머스 업무의 정확성을 높입니다",
                "고객 맞춤 Fine-tuning과 RAG로 업무에 맞게 최적화합니다",
            ],
            considerLabel: "도입 시 고려 사항",
            considerItems: [
                "초기 인프라 비용이 발생합니다 (GPU·운영 서버 등)",
                "고객사 맞춤 구현을 위한 엔지니어링이 필요합니다",
            ],
        },
        pipeline: {
            question: "Question",
            questionSample: "입기 편하고 날씬해 보이는 바지 추천해 줘",
            p1Label: "PIPELINE 01",
            p1Title: "LLM Processing (언어 모델 처리)",
            steps: ["질의 분석", "생성 요청", "답변 검증", "답변 생성"],
            backedBy: "Backed by",
            datasetLabel: "인공지능 모델 학습 데이터셋",
            stats: [
                { value: 440, unit: "M", label: "Pre-Trained Data" },
                { value: 39, unit: "M", label: "For Fine-Tune Data" },
            ],
            p2Label: "PIPELINE 02",
            p2Title: "RAG Pipeline (실시간 검색 및 지식 기반)",
            searchTitle: "Search (검색 필터 가중치)",
            searchTags: ["색인", "신조어", "동의어", "제외어", "가중치"],
            kbTitle: "Knowledge Base",
            kbDesc: "기업 정형·비정형 데이터베이스 연동",
            extractTitle: "가장 유사한 데이터 추출",
            extractDesc: "검색된 문서를 프롬프트에 자동 삽입",
            answer: "Answer · 검색 근거를 반영한 답변",
            srSummary: "Polar 작동 방식 — 사용자 질문을 받으면 LLM Processing(질의 분석·생성 요청·답변 검증·답변 생성)과 RAG Pipeline(검색 필터 가중치·Knowledge Base 연동·가장 유사한 데이터 추출)을 거쳐 검색 근거를 반영한 답변을 만듭니다.",
        },
        pillarsTitle: "자체 개발 sLLM으로 데이터 유출 걱정을 해결합니다",
        pillarsLead:
            "구축형 온프레미스·프라이빗 클라우드로 운영하고, 내부 데이터 학습으로 정확성을 확보하며, 고객 맞춤 Fine-tuning과 RAG로 비즈니스를 최적화합니다.",
        howTitle: "Polar의 작동 방식",
        howLead:
            "질문 수신부터 검색·검증을 거친 최종 응답까지, Polar는 도메인 최적화 모델과 RAG를 결합해 근거를 갖춘 커머스 답변을 만듭니다.",
        howAlt: "Polar 작동 원리 — 사용자 질문 → Polar sLLM(질의 분석·생성 요청·답변 검증) → RAG 검색(지식베이스·ReRANKER 재정렬) → 정확한 답변",
        archLabel: "상세 아키텍처",
        diagramLabel: "기술 구성도",
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
            ["On-premise security", "On-premise deployment supports internal data processing and access control; external integrations require separate data-transfer policies."],
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
                items: ["Intent-aware semantic search", "Image search without keywords"],
                imgAlt: "A magnifying glass resting on a laptop keyboard",
                diagramAlt: "AI search — interpreting a query like \"I need trousers that are comfortable and slimming\" through a meaning-based tag graph",
            },
            {
                ko: "AI shopping agent",
                desc: "A hyper-personalized shopping assistant that differentiates the customer experience.",
                items: ["AI product comparison summaries", "Personalized recommendations"],
                imgAlt: "A hand holding a smartphone with recommended products",
                diagramAlt: "AI shopping — combining click data, purchase history, current trends, preferences, and weather to recommend products",
            },
            {
                ko: "Customer service agent",
                desc: "Commerce AI that improves the support experience and operating efficiency.",
                items: ["Messages tailored to each product", "Key points of reviews"],
                imgAlt: "Hands working on a laptop showing a data dashboard",
                diagramAlt: "Customer service — analyzing one-to-one inquiries, product Q&A, and reviews to read customer disposition and provide a response guide",
            },
        ],
        faq: [
            { q: "What is Polar?", a: "Polar is a private, e-commerce-specialized sLLM (small LLM) developed by Plateer. Trained on commerce-domain data, it powers search, recommendation, and support capabilities while keeping enterprise data safe on-premise." },
            { q: "How does an sLLM differ from a large LLM?", a: "An sLLM is a smaller language model optimized for a specific domain. Polar trains on high-quality e-commerce data and is tuned with fine-tuning and RAG, aiming for accuracy and operating efficiency suited to commerce work. Actual performance depends on the training data and configuration." },
            { q: "How is data security managed?", a: "It can run on-premise or in a private cloud to manage data processing and access. External integrations require separate review of data-transfer scope and policies. Internal data improves accuracy while the data itself stays inside the organization." },
            { q: "How does Polar work with XGEN?", a: "Polar is the commerce-specialized model layer used to build search, shopping, and customer-service agents on top of the XGEN Agentic AI platform. Combined with XGEN's Agent Builder and ModelOps, you design and run commerce AI services end to end." },
        ],
        heroEyebrow: "Private sLLM for Commerce",
        heroTitle: "Polar — a private sLLM built for commerce",
        heroLead:
            "Polar is an e-commerce-specialized sLLM developed by Plateer. It keeps enterprise data protected while providing a model tuned to the commerce domain, so you can build and run a range of AI applications and services on it.",
        heroChip: "E-commerce specialized · on-premise sLLM",
        heroChips: ["Semantic search", "Review summaries", "On-premise"],
        heroGraph: {
            hub: "Polar sLLM",
            nodes: ["Semantic search", "Review summaries", "Top-N recommendations", "CS responses", "On-premise", "Orders & inventory", "Product catalog", "Korean embeddings"],
        },
        heroPhotoAlt: "A hand holding a smartphone showing commerce data",
        compare: {
            title: "Public LLM or Polar: what changes",
            lead: "How you adopt AI changes both the cost structure and how data is managed. Compare the traits and the trade-offs of each approach.",
            beforeName: "Public LLM",
            beforeSub: "Using a public LLM through its API",
            beforeItems: [
                "Quick to apply through API integration",
                "Trained on vast data and updated often",
                "No hardware to build; cost follows token usage",
                "Sensitive information such as trade secrets or customer data may be sent outside, so policies are needed",
                "Hallucinations are possible, so results need verification",
            ],
            afterName: "Polar",
            afterSub: "Built on-premise or in a private cloud",
            afterItems: [
                "Runs on-premise or in a private cloud",
                "Training on internal data improves accuracy on commerce work",
                "Custom fine-tuning and RAG fit it to your business",
            ],
            considerLabel: "What to plan for",
            considerItems: [
                "Upfront infrastructure cost (GPUs, servers)",
                "Engineering work to tailor it to your environment",
            ],
        },
        pipeline: {
            question: "Question",
            questionSample: "Recommend trousers that are comfortable and slimming",
            p1Label: "PIPELINE 01",
            p1Title: "LLM Processing",
            steps: ["Query analysis", "Generation request", "Answer verification", "Answer generation"],
            backedBy: "Backed by",
            datasetLabel: "Model training dataset",
            stats: [
                { value: 440, unit: "M", label: "Pre-Trained Data" },
                { value: 39, unit: "M", label: "For Fine-Tune Data" },
            ],
            p2Label: "PIPELINE 02",
            p2Title: "RAG Pipeline (real-time retrieval)",
            searchTitle: "Search (filter weighting)",
            searchTags: ["Indexing", "New words", "Synonyms", "Exclusions", "Weights"],
            kbTitle: "Knowledge Base",
            kbDesc: "Connects structured and unstructured enterprise data",
            extractTitle: "Most similar data extraction",
            extractDesc: "Retrieved documents are inserted into the prompt",
            answer: "Answer grounded in retrieved sources",
            srSummary: "How Polar works — a user question passes through LLM Processing (query analysis, generation request, answer verification, answer generation) and the RAG Pipeline (search filter weighting, knowledge base, most similar data extraction) to produce an answer grounded in retrieved sources.",
        },
        pillarsTitle: "An in-house sLLM removes the data-leakage problem",
        pillarsLead:
            "Run it on-premise or in a private cloud, gain accuracy from training on internal data, and optimize the business with customer-specific fine-tuning and RAG.",
        howTitle: "How Polar works",
        howLead:
            "From receiving a question through retrieval and verification to the final answer, Polar combines a domain-optimized model with RAG to produce grounded commerce answers.",
        howAlt: "How Polar works — user question → Polar sLLM (query analysis, generation request, answer verification) → RAG retrieval (knowledge base, ReRANKER reordering) → accurate answer",
        archLabel: "Detailed architecture",
        diagramLabel: "Technical diagram",
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


/** 히어로 엔터티 그래프 좌표(%) — 허브와 노드 8개, 그리고 연결선(-1 = 허브) */
const POLAR_GRAPH_HUB: [number, number] = [50, 50];
const POLAR_GRAPH_POS: [number, number][] = [
    [22, 14], [80, 16], [93, 47], [80, 82], [50, 95], [18, 82], [7, 47], [50, 3],
];
const POLAR_GRAPH_EDGES: [number, number][] = [
    [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [-1, 5], [-1, 6], [-1, 7],
    [6, 0], [7, 0], [1, 3], [5, 2], [6, 5], [7, 1],
];

export function PolarPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const PILLARS = t.pillars.map(([title, desc], i) => ({
        icon: PILLAR_ICONS[i],
        title,
        desc,
    }));
    const diagramLabel = t.diagramLabel;
    const TECH = t.tech.map((x, i) => ({ icon: TECH_ICONS[i], ...x, ...TECH_IMGS[i] }));
    const USECASES = t.usecases.map((x, i) => ({
        icon: USECASE_ICONS[i],
        en: USECASE_EN[i],
        ...x,
        img: USECASE_IMGS[i],
        diagram: USECASE_DIAGRAMS[i],
    }));
    const FAQ = t.faq;
    return (
        <>
            <SiteNav overlay showPromotion={false} />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "@id": absoluteUrl("/product/polar#software"),
                        name: "Polar",
                        alternateName: "Polar sLLM",
                        applicationCategory: "BusinessApplication",
                        applicationSubCategory: "Commerce-specialized Private sLLM",
                        operatingSystem: "On-premise",
                        description:
                            t.ldDescription,
                        url: absoluteUrl("/product/polar"),
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
                        { name: "Products", path: "/product/xgen" },
                        { name: "Polar", path: "/product/polar" },
                    ]),
                ]}
            />

            {/* Hero — 사진 배경과 노드 일러스트가 교차로 나오는 키 비주얼 */}
            <section className="kv-hero why-hero-tall relative overflow-hidden border-b border-white/10 bg-[#070b1c] text-white">
                {/* 키 비주얼: 사진 장면과 Polar 일러스트 장면이 번갈아 나온다(겹치지 않게 교차). */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* 히어로 사진을 카드 대신 섹션 전체 배경으로 깐다. 글자 쪽(왼쪽)은 딥네이비로 덮어 읽히게 한다. */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/polar/mk/hero-photo.webp"
                            alt=""
                            className="polar-hero-photo h-full w-full object-cover object-[65%_center]"
                        />
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#070b1c]/80 lg:hidden" />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,#070b1c_0%,rgba(7,11,28,0.94)_30%,rgba(7,11,28,0.6)_55%,rgba(7,11,28,0.2)_100%)]"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,28,0.55)_0%,transparent_22%,transparent_78%,#070b1c_100%)]"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(90deg,black_0%,transparent_55%)]"
                    />
                    {/* 연관 엔터티 그래프 — 가운데 Polar sLLM 허브와 데이터·기능 엔터티가 선으로 이어진다 */}
                    <div aria-hidden className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[560px] w-[min(640px,46vw)] -translate-y-1/2 xl:block">
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {POLAR_GRAPH_EDGES.map(([a, b], k) => {
                                const pa = a < 0 ? POLAR_GRAPH_HUB : POLAR_GRAPH_POS[a];
                                const pb = POLAR_GRAPH_POS[b];
                                return (
                                    <line
                                        key={k}
                                        x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]}
                                        className={a < 0 ? "polar-edge polar-edge-hub" : "polar-edge"}
                                        style={{ animationDelay: `${-k * 0.4}s` }}
                                        vectorEffect="non-scaling-stroke"
                                    />
                                );
                            })}
                        </svg>
                        <span
                            className="polar-hub absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#5fd0ff]/60 bg-[linear-gradient(135deg,#185aea,#00acee)] px-6 py-3 text-[19px] font-bold text-white shadow-[0_0_40px_rgba(56,189,248,0.55)]"
                            style={{ left: `${POLAR_GRAPH_HUB[0]}%`, top: `${POLAR_GRAPH_HUB[1]}%` }}
                        >
                            {t.heroGraph.hub}
                        </span>
                        {t.heroGraph.nodes.map((c, i) => (
                            <span
                                key={c}
                                className="absolute -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${POLAR_GRAPH_POS[i][0]}%`, top: `${POLAR_GRAPH_POS[i][1]}%` }}
                            >
                                <span
                                    className={`polar-chip inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-[#0d1530]/85 px-4 py-2 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md`}
                                    style={{ animationDelay: `${-i * 0.7}s`, animationName: i % 2 ? "polarFloatB" : "polarFloatA" }}
                                >
                                    <span className="h-2 w-2 rounded-full bg-[#5fd0ff]" />
                                    {c}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="relative mx-auto kv-fill grid min-h-[755px] w-full max-w-7xl items-center px-6 pb-16 pt-32 lg:pb-10 lg:pt-24">
                    <div className="max-w-xl">
                        <p className="polar-hero-in text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                            Product · Polar
                        </p>
                        <p className="polar-hero-in mt-2 font-mono text-[13px] uppercase tracking-[0.18em] text-white/55" style={{ animationDelay: "80ms" }}>
                            {t.heroEyebrow}
                        </p>
                        <h1 className="polar-hero-in mt-3 text-3xl font-bold leading-tight tracking-tight md:text-[44px]" style={{ animationDelay: "160ms" }}>
                            {t.heroTitle}
                        </h1>
                        <p className="polar-hero-in mt-5 max-w-xl text-lg leading-relaxed text-white/75" style={{ animationDelay: "240ms" }}>
                            {t.heroLead}
                        </p>
                        <span className="polar-hero-in mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm" style={{ animationDelay: "320ms" }}>
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                            {t.heroChip}
                        </span>
                        <div className="polar-hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "400ms" }}>
                            <Link
                                href={localeHref(locale, "/contact") + "?from=polar"}
                                className="group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                {t.ctaContact}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
                            >
                                {t.howTitle}
                            </Link>
                        </div>
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
                            {PILLARS.map((p, i) => (
                                <PolarReveal key={p.title} delay={i * 120}>
                                <div
                                    className="flex h-full flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
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
                                </PolarReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 퍼블릭 LLM vs Polar — 도입 시 고려 사항까지 함께 */}
                <section id="compare" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Public LLM vs Polar
                        </p>
                        <h2 className="mt-3 mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.compare.title}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.compare.lead}
                        </p>
                        <div className="mt-10 grid gap-5 lg:grid-cols-2">
                            <PolarReveal>
                                <div className="h-full rounded-[24px] bg-[#0b1224] p-7 text-white md:p-9">
                                    <span className="inline-flex rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white/70">Before</span>
                                    <h3 className="mt-4 text-[28px] font-bold tracking-tight">{t.compare.beforeName}</h3>
                                    <p className="mt-1 text-[14px] text-white/55">{t.compare.beforeSub}</p>
                                    <ul className="mt-7 space-y-3.5">
                                        {t.compare.beforeItems.map((it, i) => (
                                            <PolarReveal as="li" key={it} delay={150 + i * 90} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                                                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/45" />
                                                {it}
                                            </PolarReveal>
                                        ))}
                                    </ul>
                                </div>
                            </PolarReveal>
                            <PolarReveal delay={160}>
                                <div className="relative h-full overflow-hidden rounded-[24px] border-2 border-[#2f7bff] bg-white p-7 shadow-[0_30px_60px_-34px_rgba(24,90,234,0.55)] md:p-9">
                                    <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(0,172,238,0.18),transparent)]" />
                                    <span className="inline-flex rounded-full bg-[linear-gradient(45deg,#00acee,#185aea)] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white">After</span>
                                    <h3 className="mt-4 text-[28px] font-bold tracking-tight text-[var(--color-ink)]">{t.compare.afterName}</h3>
                                    <p className="mt-1 text-[14px] text-[var(--color-ink-subtle)]">{t.compare.afterSub}</p>
                                    <ol className="mt-7 space-y-3">
                                        {t.compare.afterItems.map((it, i) => (
                                            <PolarReveal as="li" key={it} delay={300 + i * 110} className="flex items-start gap-3 text-[15.5px] font-semibold leading-relaxed text-[var(--color-ink)]">
                                                <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-md bg-[#2f7bff] font-mono text-[12px] font-bold text-white">{i + 1}</span>
                                                {it}
                                            </PolarReveal>
                                        ))}
                                    </ol>
                                    <div className="mt-7 border-t border-[var(--color-line)] pt-5">
                                        <p className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-ink-muted)]">
                                            <Info className="h-4 w-4 text-[var(--color-ink-subtle)]" />
                                            {t.compare.considerLabel}
                                        </p>
                                        <ul className="mt-3 space-y-2">
                                            {t.compare.considerItems.map((it) => (
                                                <li key={it} className="flex gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                    <X className="mt-1 h-3.5 w-3.5 flex-none text-[var(--color-ink-subtle)]" aria-hidden />
                                                    {it}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </PolarReveal>
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
                                    <PolarReveal
                                        as="li"
                                        key={s.phase}
                                        delay={i * 160}
                                        className={[
                                            "relative flex flex-col items-center rounded-2xl border p-7 text-center",
                                            next
                                                ? "border-[#2f7bff] bg-white shadow-[0_18px_44px_-24px_rgba(20,40,80,0.3)]"
                                                : now
                                                  ? "border-[#bcd0f5] bg-white"
                                                  : "border-[var(--color-line)] bg-[var(--color-surface-alt)]",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-center justify-center gap-2">
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

                                        <ul className="mt-5 flex flex-wrap justify-center gap-2">
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
                                    </PolarReveal>
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
                        <div className="mx-auto mt-10 max-w-[1080px]">
                            <PolarPipeline t={t.pipeline} />
                        </div>
                        <PolarReveal>
                            <div className="mx-auto mt-10 max-w-[1080px]">
                                <p className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                    {t.archLabel}
                                </p>
                                <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white p-6 md:p-10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/polar/polar-architecture.svg"
                                        alt={t.howAlt}
                                        loading="lazy"
                                        className="mx-auto h-auto w-full min-w-[720px] max-w-[1080px]"
                                    />
                                </div>
                            </div>
                        </PolarReveal>
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
                            {TECH.map((t, i) => (
                                <PolarReveal key={t.title} delay={(i % 2) * 140}>
                                <div
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:border-[#bcd0f5] hover:shadow-[0_18px_40px_-22px_rgba(20,40,80,0.3)]"
                                >
                                    <div className="aspect-[1230/800] overflow-hidden border-b border-[var(--color-line)] bg-[#1b1550]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={t.img}
                                            alt=""
                                            loading="lazy"
                                            className="polar-zoom h-full w-full object-cover"
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
                                        <p className="mt-5 text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                            {diagramLabel}
                                        </p>
                                        <div className="mt-2 flex h-56 items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={t.diagram}
                                                alt={t.imgAlt}
                                                loading="lazy"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                                </PolarReveal>
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
                            {USECASES.map((u, i) => (
                                <PolarReveal key={u.en} delay={i * 140}>
                                <div
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="aspect-[4/3] overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={u.img}
                                            alt={u.imgAlt}
                                            loading="lazy"
                                            className="polar-zoom h-full w-full object-cover"
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
                                        <p className="mt-5 text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                            {diagramLabel}
                                        </p>
                                        <div className="mt-2 aspect-[4/3] rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={u.diagram}
                                                alt={u.diagramAlt}
                                                loading="lazy"
                                                className="h-full w-full object-contain p-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                </PolarReveal>
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
                                href={localeHref(locale, "/product/xgen")}
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
