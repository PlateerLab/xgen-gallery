/**
 * Lightweight i18n for the whole site. Locale is persisted in a cookie and
 * read on the server (layout) so the first SSR render is already in the right
 * language (good for GEO — no flash, full HTML). A client context then lets
 * both server- and client-rendered components share the active locale.
 *
 * Default locale: Korean. Toggle: KO / EN (see LanguageToggle).
 */
export type Locale = "ko" | "en";

export const LOCALES: Locale[] = ["ko", "en"];
export const DEFAULT_LOCALE: Locale = "ko";
export const LOCALE_COOKIE = "locale";

export function isLocale(v: unknown): v is Locale {
    return v === "ko" || v === "en";
}

/** Per-tool localized copy, keyed by tool id. */
export const TOOL_I18N: Record<
    string,
    Record<Locale, { tagline: string; description: string }>
> = {
    contextifier: {
        en: {
            tagline: "Turn any document into AI-ready text",
            description:
                "Extract and chunk 80+ document formats. Tables, code blocks, and structure preserved for retrieval.",
        },
        ko: {
            tagline: "어떤 문서든 AI 친화 텍스트로",
            description:
                "80개 이상 문서 포맷을 추출·청킹합니다. 표, 코드 블록, 구조를 검색에 유리하게 보존합니다.",
        },
    },
    doc2chunk: {
        en: {
            tagline: "Smart chunking for RAG pipelines",
            description:
                "Split documents into context-aware chunks with configurable size and overlap.",
        },
        ko: {
            tagline: "RAG 파이프라인을 위한 스마트 청킹",
            description:
                "문서를 컨텍스트 인식 청크로 분할합니다. 크기와 중첩을 자유롭게 설정할 수 있습니다.",
        },
    },
    f2a: {
        en: {
            tagline: "One-line data analytics with HTML reports",
            description:
                "Point at any file, get full statistics and an interactive HTML report. 24+ formats.",
        },
        ko: {
            tagline: "한 줄로 데이터 분석 + HTML 리포트",
            description:
                "파일 하나만 지정하면 전체 통계와 인터랙티브 HTML 리포트를 생성합니다. 24개 이상 포맷 지원.",
        },
    },
    "synaptic-memory": {
        en: {
            tagline: "Brain-inspired knowledge graph",
            description:
                "Auto-ontology, Hebbian learning, four-stage memory consolidation for long-running agents.",
        },
        ko: {
            tagline: "뇌 영감 지식 그래프",
            description:
                "자동 온톨로지, 헤비안 학습, 4단계 기억 통합으로 오래 실행되는 에이전트의 장기 기억을 지원합니다.",
        },
    },
    googer: {
        en: {
            tagline: "Type-safe Google search, for agents",
            description:
                "Web, images, news, and videos. Typed responses, no scraping gymnastics.",
        },
        ko: {
            tagline: "에이전트를 위한 타입 안전 구글 검색",
            description:
                "웹·이미지·뉴스·동영상 검색. 타입이 보장된 응답으로 스크래핑 고생이 필요 없습니다.",
        },
    },
};

export interface FaqEntry {
    question: string;
    answer: string;
}

export interface UseCaseEntry {
    title: string;
    stack: string[];
    description: string;
}

export interface Dict {
    nav: {
        tools: string;
        members: string;
        useCases: string;
        releases: string;
        github: string;
        star: string;
        tagline: string;
    };
    hero: {
        badge: string;
        // title is composed in the component (highlight on XGEN)
        desc: string;
        browse: string;
        viewGithub: string;
    };
    live: { try: string };
    toolsSection: {
        eyebrow: string;
        titleA: string;
        titleB: string;
    };
    categories: { all: string; ingestion: string; knowledge: string; agent: string };
    toolCard: { liveDemo: string; openDemo: string };
    usecases: {
        eyebrow: string;
        titleA: string;
        titleB: string;
        seeRecipe: string;
        items: UseCaseEntry[];
    };
    faq: { eyebrow: string; title: string; entries: FaqEntry[] };
    footer: { tools: string; contact: string };
    releasesPage: { eyebrow: string; title: string; desc: string };
    membersPage: {
        eyebrow: string;
        title: string;
        descA: string;
        descB: string;
    };
}

const FAQ_KO: FaqEntry[] = [
    {
        question: "Plateer Labs는 어떤 곳인가요?",
        answer:
            "Plateer Labs는 엔터프라이즈 AI를 연구하고, 기술을 제품으로 구현하는 AI 연구소입니다. 연구 성과를 오픈소스로 공개하고, 이를 XGEN Agentic AI Platform에 반영한 뒤, 실제 고객 환경에서 검증하며 지속적으로 고도화합니다. 연구부터 오픈소스, 제품, 고객 검증까지 이어지는 선순환 구조를 통해 기업이 신뢰하고 사용할 수 있는 AI 기술을 만들어갑니다.",
    },
    {
        question: "XGEN은 어떤 제품인가요?",
        answer:
            "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·통제하는 온프레미스 Enterprise AI 플랫폼입니다. 노드 캔버스와 헤드리스 엔진 기반으로 코딩 없이 에이전트를 만들고, 지식(RAG)·도구(MCP)·거버넌스와 함께 안전하게 운영합니다. 특정 LLM·클라우드에 종속되지 않는 모델 중립 설계라, 오픈소스·상용 모델과 사내 GPU를 목적·비용·정확도에 맞게 조합할 수 있습니다.",
    },
    {
        question: "온프레미스·망분리 환경에서도 쓸 수 있나요? 데이터는 안전한가요?",
        answer:
            "네. XGEN은 온프레미스로 구축되어 데이터가 외부로 나가지 않으며, 인터넷과 분리된 망분리·에어갭 환경까지 지원합니다. 모든 AI 모델과 데이터는 내부망에서 운영되고, 인증 게이트웨이·신뢰 경계, 역할·속성 기반 접근제어(RBAC·ABAC), 개인정보(PII) 마스킹, 통합 감사 로그, AI 위험도 등급 등 다층 통제가 전 계층에 적용됩니다.",
    },
    {
        question: "XGEN이 받은 GS 인증 1등급은 무엇을 의미하나요?",
        answer:
            "GS(Good Software) 인증은 「소프트웨어 진흥법」에 근거해 과학기술정보통신부가 운영하는 국가 공인 소프트웨어 품질인증으로, 공인 시험기관이 ISO/IEC 25000 계열 국제표준을 기준으로 기능 적합성·성능 효율성·신뢰성·보안성 등을 시험·평가합니다. 1등급은 그중 최고 등급으로, XGEN Agentic AI Platform의 품질을 벤더의 주장이 아니라 제3자 공인시험으로 검증했다는 뜻입니다. 도입 관점에서는 조달청 우수조달물품 지정 신청 자격, 공공 소프트웨어 사업 분리발주 의무 대상, 중소벤처기업부 우선구매 대상이 되며, 다수 공공 입찰 평가표에서 최근 3년 내 유효한 소프트웨어 인증으로 인정되어 기술 가점을 받을 수 있습니다.",
    },
    {
        question: "오픈소스 라이브러리는 무엇이고 XGEN과 어떤 관계인가요?",
        answer:
            "XGEN을 떠받치는 문서 인제스션·지식그래프·에이전트 기술을 프로덕션급 파이썬 라이브러리로 공개합니다. 모두 MIT 라이선스로 무료·상업적 사용이 가능하고 pip로 설치하며, 브라우저 갤러리에서 바로 실행해볼 수 있습니다. 연구를 오픈소스로 검증하고 그 위에 제품(XGEN)을 만든다는 원칙을 따릅니다.",
    },
    {
        question: "어떤 산업에 적용되나요?",
        answer:
            "금융·공공·커머스·제조·미디어·물류·통신 등 다양한 산업의 업무 특성과 규제를 반영해 적용합니다. 실제 PoC와 프로젝트로 검증한 적용 사례는 고객사례에서 확인할 수 있습니다.",
    },
    {
        question: "도입은 어떻게 시작하나요? 무료 체험이 있나요?",
        answer:
            "제품 데모, XGEN 15일 무료 체험, PoC·기술 상담을 한 양식에서 접수합니다. 현장에 배치되는 FDE(Forward Deployed Engineer)가 요구사항 발굴부터 설계·구현·내재화까지 함께하며, 문의 유형을 선택해 남겨주시면 영업일 1~2일 이내에 연락드립니다.",
    },
];

const FAQ_EN: FaqEntry[] = [
    {
        question: "What is Plateer Labs?",
        answer:
            "Plateer Labs is an enterprise-AI research lab that turns research into products. We open-source the building blocks, build the XGEN Agentic AI Platform on top of them, and validate everything through real customer PoCs — a research → open source → product → proof pipeline.",
    },
    {
        question: "What is XGEN?",
        answer:
            "XGEN is an on-premise Enterprise AI platform for designing, deploying, and governing Agentic AI services on the LLMs and infrastructure you choose. Built on a node canvas and a headless engine, it lets teams build agents without code and run them safely with knowledge (RAG), tools (MCP), and governance. It is model-agnostic, so you can mix open-source and commercial models with in-house GPUs by purpose, cost, and accuracy.",
    },
    {
        question: "Does it run on-premise / air-gapped, and is our data safe?",
        answer:
            "Yes. XGEN runs on-premise so data never leaves your environment, and it supports network-separated and air-gapped deployments. All AI models and data stay on the internal network, protected by an authentication gateway and trust boundary, RBAC/ABAC access control, PII masking, unified audit logs, and AI risk-grade policies across every layer.",
    },
    {
        question: "What does XGEN's GS certification Grade 1 mean?",
        answer:
            "GS (Good Software) certification is Korea's national software quality certification, operated by the Ministry of Science and ICT under the Software Promotion Act. Accredited labs test functional suitability, performance efficiency, reliability, and security against the ISO/IEC 25000 series of international standards. Grade 1 is the highest level — meaning XGEN Agentic AI Platform's quality is verified by independent, accredited testing rather than vendor claims. For buyers, it qualifies XGEN for public-procurement programs (Excellent Procurement Product designation, split-order eligibility, priority purchase) and counts as a scored technical credential in many public RFP evaluations.",
    },
    {
        question: "What are the open-source libraries, and how do they relate to XGEN?",
        answer:
            "We open-source the document-ingestion, knowledge-graph, and agent technologies that power XGEN as production-grade Python packages. All are MIT-licensed, free for commercial use, installable via pip, and runnable directly in the browser gallery — research proven in the open, with the product (XGEN) built on top.",
    },
    {
        question: "Which industries is it applied to?",
        answer:
            "Finance, public sector, commerce, manufacturing, media, logistics, telecom and more — adapted to each industry's workflows and regulations. See Customer Cases for PoCs and projects validated in the field.",
    },
    {
        question: "How do we get started? Is there a free trial?",
        answer:
            "Request a product demo, a 15-day XGEN free trial, or a PoC / technical consultation from a single form. A Forward Deployed Engineer works with you from requirements through design, implementation, and enablement. Pick an inquiry type and we'll reply within 1–2 business days.",
    },
];

export const dict: Record<Locale, Dict> = {
    ko: {
        nav: {
            tools: "도구",
            members: "멤버",
            useCases: "활용 사례",
            releases: "릴리스",
            github: "GitHub",
            star: "GitHub에서 별 주기",
            tagline: "Plateer Labs for Enterprise AI·AX",
        },
        hero: {
            badge: "8개 라이브러리 · 브라우저에서 바로 체험",
            desc: "XGEN 플랫폼을 떠받치는 8개의 오픈소스 라이브러리, pip로 설치하거나 모든 도구를 지금 여기 브라우저에서 체험하세요",
            browse: "도구 둘러보기",
            viewGithub: "GitHub에서 보기",
        },
        live: { try: "이 데모 체험하기" },
        toolsSection: {
            eyebrow: "/ 도구",
            titleA: "8개의 라이브러리.",
            titleB: "설치 한 번이면 끝.",
        },
        categories: {
            all: "전체",
            ingestion: "인제스션",
            knowledge: "지식",
            agent: "에이전트",
        },
        toolCard: { liveDemo: "라이브 데모", openDemo: "데모 열기" },
        usecases: {
            eyebrow: "/ 이 블록들로 만들기",
            titleA: "조합을 넘어,",
            titleB: "완전한 AI 파이프라인으로",
            seeRecipe: "레시피 보기",
            items: [
                {
                    title: "RAG 파이프라인",
                    stack: ["Contextifier", "Doc2Chunk", "Knowtology"],
                    description:
                        "문서를 인제스션하고, 지능적으로 청킹한 뒤, 트리형 지식 맵으로 검색합니다.",
                },
                {
                    title: "에이전트 런타임",
                    stack: ["Mantis Engine", "Googer", "Toolint"],
                    description:
                        "JSON 워크플로우를 실행하고, 타입 안전 검색 도구를 호출하며, 에이전트 툴 패키지를 린트합니다.",
                },
                {
                    title: "장기 기억",
                    stack: ["Synaptic Memory", "Knowtology"],
                    description:
                        "뇌 영감 지식 그래프와 계층형 검색으로 기억하는 에이전트를 만듭니다.",
                },
            ],
        },
        faq: { eyebrow: "/ 자주 묻는 질문", title: "자주 묻는 질문", entries: FAQ_KO },
        footer: { tools: "도구", contact: "문의" },
        releasesPage: {
            eyebrow: "Release Notes",
            title: "Better with every release",
            desc: "XGEN 플랫폼의 새 기능, 개선사항, 버그 수정을 정리했습니다 — 최신 변경사항이 먼저 표시됩니다",
        },
        membersPage: {
            eyebrow: "팀",
            title: "Plateer Labs를 만드는 사람들.",
            descA: "XGEN 플랫폼과 그 라이브러리 생태계를 만드는 오픈소스 기여자들. 출처: ",
            descB: ".",
        },
    },
    en: {
        nav: {
            tools: "Tools",
            members: "Members",
            useCases: "Use cases",
            releases: "Releases",
            github: "GitHub",
            star: "Star on GitHub",
            tagline: "Plateer Labs for Enterprise AI·AX",
        },
        hero: {
            badge: "8 libraries · live in your browser",
            desc: "Eight open-source libraries powering the XGEN platform — install them with pip, or try every tool right here in your browser",
            browse: "Browse tools",
            viewGithub: "View on GitHub",
        },
        live: { try: "Try this demo" },
        toolsSection: {
            eyebrow: "/ tools",
            titleA: "Eight libraries.",
            titleB: "One install away.",
        },
        categories: {
            all: "All",
            ingestion: "Ingestion",
            knowledge: "Knowledge",
            agent: "Agent",
        },
        toolCard: { liveDemo: "live demo", openDemo: "Open demo" },
        usecases: {
            eyebrow: "/ build with these blocks",
            titleA: "Compose them into",
            titleB: "full AI pipelines.",
            seeRecipe: "See recipe",
            items: [
                {
                    title: "RAG Pipeline",
                    stack: ["Contextifier", "Doc2Chunk", "Knowtology"],
                    description:
                        "Ingest documents, chunk them intelligently, then retrieve with tree-shaped knowledge maps.",
                },
                {
                    title: "Agent Runtime",
                    stack: ["Mantis Engine", "Googer", "Toolint"],
                    description:
                        "Execute JSON workflows, call typed search tools, and lint your agent tool packages.",
                },
                {
                    title: "Long-term Memory",
                    stack: ["Synaptic Memory", "Knowtology"],
                    description:
                        "Brain-inspired knowledge graph plus hierarchical retrieval for agents that remember.",
                },
            ],
        },
        faq: { eyebrow: "/ frequently asked", title: "Frequently asked questions", entries: FAQ_EN },
        footer: { tools: "Tools", contact: "Contact" },
        releasesPage: {
            eyebrow: "Release Notes",
            title: "Better with every release",
            desc: "New features, improvements, and fixes for the XGEN platform — latest changes first",
        },
        membersPage: {
            eyebrow: "Team",
            title: "The people behind Plateer Labs.",
            descA: "Open-source contributors building the XGEN platform and its ecosystem of libraries. Synced from ",
            descB: ".",
        },
    },
};

export function getDict(locale: Locale): Dict {
    return dict[locale] ?? dict[DEFAULT_LOCALE];
}
