/**
 * 고객사례(Customer Case Studies) 단일 소스.
 * Applied AI › 고객사례(/customers)와 산업별 페이지(/customers/[domain]),
 * 개별 사례 페이지(/customers/case/[slug]), 제품 페이지의 "고객사례" 스트립이
 * 모두 이 파일을 참조한다. (Publications가 publications.ts 하나를 참조하는 것과 같은 패턴)
 *
 * 운영 원칙(신뢰 우선):
 *  - 사례는 하나의 풀(CASE_STUDIES)로 관리하고, 산업(industry)·제품(products)은
 *    "필터/배지"로 노출한다. 제품을 최상위로 쪼개지 않는다 — XGEN 쏠림이 빈 버킷으로
 *    드러나지 않게 하기 위함.
 *  - 각 사례는 독립 URL(/customers/case/<slug>)을 가진다 — SEO·GEO에서 실제로
 *    랭킹·인용되는 단위.
 *  - **실명은 언론 등에 공개된 레퍼런스만** 사용한다(예: 제주은행). 그 외 고객사는
 *    업종+규모로 익명 표기한다(customerAnonymous: true). 영업 파이프라인의 내부
 *    정보(수주확도·예산·경쟁사·수행 인력·실주 이력)는 절대 노출하지 않는다.
 *  - **성과는 실측치가 있을 때만 수치로 표기**한다. 검증되지 않은 수치는 넣지 않고,
 *    제공 범위·산출물·운영 형태(highlights/status) 등 사실만 기술한다.
 *
 * 아래 사례는 실제 납품/운영 프로젝트를 위 원칙에 따라 정리한 것이다.
 */

/**
 * 개별 사례가 목록/슬라이더에서 상세(/customers/case/*)로 링크되는지 여부.
 * 고객 검토가 끝나지 않은 사례를 여기 넣으면 카드가 링크 없이 렌더된다.
 * (2026-08-04: 제주은행 사례 고객 컨펌 완료 → 잠금 해제, 현재 비어 있음)
 */
const CASE_LINK_DISABLED_SLUGS = new Set<string>([]);

export function caseLinkEnabled(slug: string): boolean {
    return !CASE_LINK_DISABLED_SLUGS.has(slug);
}

export type ProductKey = "xgen" | "polar" | "code-assistant";
export type IndustryKey = "commerce" | "finance" | "public" | "it-services";
export type CaseStatus = "구축중" | "운영 중" | "구축 완료" | "확산 중" | "구축·운영 중";

/** 상태 라벨 영문 표기 — `/en` 화면에서 쓴다. */
export const CASE_STATUS_EN: Record<CaseStatus, string> = {
    "구축중": "In progress",
    "운영 중": "In operation",
    "구축 완료": "Delivered",
    "확산 중": "Rolling out",
    "구축·운영 중": "Building and operating",
};

export interface ProductMeta {
    key: ProductKey;
    /** 표기 일관성(엔티티) — 사이트 전역 동일 철자. */
    name: string;
    /** 짧은 한 줄 성격. */
    tagline: string;
    /** 영문 화면용 한 줄 성격 — 없으면 영문 페이지에 한국어가 섞인다. */
    taglineEn: string;
    /** 제품 상세 경로. */
    href: string;
    /** 배지 강조색(HEX). */
    accent: string;
    /** 준비 중 제품(사례 아직 없음). */
    comingSoon?: boolean;
}

export interface IndustryMeta {
    key: IndustryKey;
    ko: string;
    en: string;
    blurb: string;
    /** 영문 소개 — `/en` 산업 페이지에서 쓴다. */
    blurbEn?: string;
}

export interface CaseMetric {
    /** 지표명(예: "응답 정확도", "처리 시간"). */
    label: string;
    /** 값(구체적 수치 — 예: "92%", "-63%"). 실측치만. */
    value: string;
}

export interface CaseStudy {
    slug: string;
    /** 성과가 읽히는 헤드라인(사실 기반, 과장·미검증 수치 금지). */
    title: string;
    /** 영문 헤드라인 — `/en` 화면에서 쓴다. */
    titleEn?: string;
    /** 고객명(공개 레퍼런스면 실명, 아니면 업종+규모 익명 표현). */
    customer: string;
    /**
     * 영문 고객 표기. 익명 원칙은 한국어와 동일하게 유지한다 —
     * 실명 공개에 동의한 레퍼런스만 실명, 나머지는 업종+규모로만 적는다.
     */
    customerEn?: string;
    /** true면 익명 표기(대외 공개 동의 없는 고객). */
    customerAnonymous?: boolean;
    industry: IndustryKey;
    /** 적용 제품(복수 가능). 첫 항목이 대표 제품. */
    products: ProductKey[];
    /** 자족적 한 문장 요약(카드·검색·JSON-LD 공용). */
    summary: string;
    /** 영문 요약(선택) — /en 화면에서 쓴다. 없으면 영문 화면에 노출하지 않는다. */
    summaryEn?: string;
    /** 과제. */
    challenge: string;
    /** 영문 과제. */
    challengeEn?: string;
    /** 적용/솔루션. */
    solution: string;
    /** 영문 솔루션. */
    solutionEn?: string;
    /** 제공 범위·산출물(사실 기반 — 수치 아님). */
    highlights: string[];
    /** 영문 제공 범위. */
    highlightsEn?: string[];
    /** 납품/운영 상태 — 사실 기반 신뢰 신호. */
    status: CaseStatus;
    /** 성과 지표 — **실측치가 있을 때만**. 기본은 비움(미검증 수치 금지). */
    results?: CaseMetric[];
    quote?: { text: string; author?: string; role?: string };
    /** 정리 기준일(YYYY-MM-DD). */
    published: string;
    /** 대표 사례(상단 노출). */
    featured?: boolean;
    /** true면 목록/색인에서 제외(작성 중). */
    draft?: boolean;
}

export const PRODUCTS: Record<ProductKey, ProductMeta> = {
    xgen: {
        key: "xgen",
        name: "XGEN",
        tagline: "맞춤 Agentic AI 플랫폼",
        taglineEn: "A tailored agentic AI platform",
        href: "/product",
        accent: "#2f7bff",
    },
    polar: {
        key: "polar",
        name: "Polar",
        tagline: "커머스 특화 Private sLLM",
        taglineEn: "A private sLLM built for commerce",
        href: "/polar",
        accent: "#0f9d8f",
    },
    "code-assistant": {
        key: "code-assistant",
        name: "Code Assistant",
        tagline: "AI 코드 어시스턴트",
        taglineEn: "An AI coding assistant",
        href: "/code-assistant",
        accent: "#7c5cff",
    },
};

export const INDUSTRIES: Record<IndustryKey, IndustryMeta> = {
    commerce: {
        key: "commerce",
        ko: "커머스",
        en: "Commerce",
        blurb: "상품 검색·추천·CS 자동화 등 커머스 업무에 적용한 고객 사례",
        blurbEn: "Customer cases applying AI to commerce work — product search, recommendation, and automated customer service",
    },
    finance: {
        key: "finance",
        ko: "금융",
        en: "Finance",
        blurb: "생성형 AI 플랫폼·문서 검토·검색 고도화 등 금융 업무에 적용한 고객 사례",
        blurbEn: "Customer cases applying AI to financial work — generative-AI platforms, document review, and search modernization",
    },
    public: {
        key: "public",
        ko: "공공",
        en: "Public Sector",
        blurb: "조달·검색·민원 등 공공 업무에 적용한 고객 사례",
        blurbEn: "Customer cases applying AI to public-sector work — procurement, search, and citizen services",
    },
    "it-services": {
        key: "it-services",
        ko: "IT·제조",
        en: "IT & Manufacturing",
        blurb: "Code Assistant·기술 문서 등 개발·엔지니어링 업무에 적용한 고객 사례",
        blurbEn: "Customer cases applying AI to development and engineering — Code Assistant and technical documentation",
    },
};

/**
 * 실제 납품/운영 프로젝트 — 신뢰 원칙에 따라 정리.
 * 제주은행만 공개 레퍼런스로 실명, 그 외는 업종+규모 익명. 미검증 수치는 넣지 않는다.
 */
export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "financial-ai-platform-in-progress",
        title: "여신금융 업무를 위한 Enterprise AI 플랫폼과 거버넌스 기반을 구축하고 있습니다",
        titleEn: "Building an enterprise AI platform and governance foundation for capital finance",
        customer: "I사 · 여신금융",
        customerEn: "Company I · Capital finance",
        customerAnonymous: true,
        industry: "finance",
        products: ["xgen"],
        summary:
            "플래티어는 국내 여신금융사 I사가 AI Agent와 RAG를 실제 내부 업무에 안전하게 적용할 수 있도록 XGEN 기반 온프레미스 Enterprise AI 플랫폼을 구축하고 있습니다. Agent 개발부터 검증·승인·배포·운영·감사까지 하나의 기준으로 관리할 수 있는 통합 운영 및 보안·거버넌스 체계를 함께 마련하고 있습니다.",
        summaryEn:
            "Plateer is building an XGEN-based, on-premise enterprise AI platform that enables Company I to apply AI agents and RAG safely to internal capital-finance work. The engagement also establishes one operating and governance framework across agent development, validation, approval, deployment, operations, and audit.",
        challenge:
            "I사는 금융권의 엄격한 보안·내부통제 요건을 준수하면서도 여러 AI 모델과 사내 데이터를 업무 목적에 맞게 활용할 수 있는 기반이 필요했습니다. 부서별 실증이 개별 시스템으로 흩어지지 않도록 모델, 지식, 도구와 Agent를 공통 플랫폼에서 관리해야 했으며, 개발 이후의 검증·승인·배포·운영·감사까지 추적할 수 있는 표준 절차도 필요했습니다. 특히 민감한 업무 데이터가 외부로 불필요하게 이동하지 않도록 온프레미스 환경에서 보안 정책과 접근 권한을 일관되게 적용하는 것이 핵심 과제였습니다.",
        challengeEn:
            "Company I needed a governed foundation for using multiple AI models and internal data while meeting strict financial-sector security and control requirements. It also needed to prevent departmental pilots from becoming disconnected systems and to manage models, knowledge, tools, and agents on one platform. A traceable standard was required across development, validation, approval, deployment, operations, and audit, with consistent access controls inside an on-premise environment.",
        solution:
            "플래티어는 XGEN을 기반으로 고객사의 인프라와 보안 정책 안에서 운영되는 온프레미스 Enterprise AI 플랫폼을 설계하고 구축하고 있습니다. 업무 담당자가 Agent를 설계하고 사내 문서를 RAG 지식으로 구성하며, 업무 특성에 맞는 AI 모델과 도구를 연결할 수 있도록 개발 환경을 통합하고 있습니다. 또한 개발된 Agent가 검증과 승인을 거쳐 배포되도록 운영 절차를 구성하고, 운영 상태를 지속해서 확인할 수 있는 모니터링 체계를 마련하고 있습니다. RBAC 기반 접근 제어, 감사 로그, 가드레일과 데이터 보호 정책을 플랫폼 전반에 적용하여 사용자·조직·업무별 권한과 실행 이력을 관리합니다. 현재 구축 단계에서는 대표 업무를 기준으로 공통 구조와 운영 기준을 정립하고 있으며, 향후 새로운 부서와 AI 서비스로 확장할 때 같은 기준을 재사용할 수 있는 기반을 만드는 것을 목표로 합니다.",
        solutionEn:
            "Plateer is designing and implementing an on-premise enterprise AI platform based on XGEN and aligned with the customer's infrastructure and security policies. The platform brings together agent design, RAG knowledge pipelines, AI model and tool connectivity, governed validation and deployment, and operational monitoring. RBAC, audit logs, guardrails, and data-protection policies provide consistent control over users, organizations, tasks, and execution records. The current phase establishes a reusable architecture and operating standard that can support additional departments and AI services over time.",
        highlights: [
            "XGEN 기반 온프레미스 플랫폼 설계·구축",
            "Agent 설계·RAG 지식화·멀티 모델 연계",
            "검증·승인·배포를 잇는 운영 절차",
            "RBAC·감사 로그·가드레일 기반 통제",
            "운영 모니터링과 확장 표준 수립",
        ],
        highlightsEn: [
            "XGEN-based on-premise platform design and implementation",
            "Agent design, RAG knowledge pipelines, and multi-model connectivity",
            "Governed validation, approval, and deployment workflow",
            "RBAC, audit logs, guardrails, and data controls",
            "Operational monitoring and reusable expansion standards",
        ],
        status: "구축중",
        published: "2026-10-12",
        featured: true,
    },
    {
        slug: "jeju-bank-genai-platform",
        title: "제주은행과 사내 생성형 AI 플랫폼을 구축하고 운영으로 안착시키다",
        titleEn:
            "Jeju Bank's internal generative-AI platform",
        customer: "제주은행",
        customerEn: "Jeju Bank",
        customerAnonymous: false,
        industry: "finance",
        products: ["xgen"],
        summary:
            "제주은행과 XGEN 기반 사내 생성형 AI(GenAI) 플랫폼을 구축하고, 상주 운영으로 안정화해 활용을 넓혀가는 금융권 사례",
        summaryEn:
            "Building an internal generative-AI platform on XGEN with Jeju Bank, then stabilizing it through on-site operations and widening its use across the bank",
        challenge:
            "금융권 보안·망분리 요건을 지키면서 사내 업무에 생성형 AI를 도입하고, 일회성 구축이 아니라 실제 운영까지 안착시켜야 했다.",
        challengeEn:
            "Generative AI had to reach internal work while meeting the security and network-separation requirements of the financial sector — and it had to land in real operation, not stop at a one-off build.",
        solution:
            "XGEN 기반 GenAI 플랫폼을 은행 인프라에 구축하고, 상주 운영 체계로 서비스를 안정화했다. 1차 구축 성과를 바탕으로 활용 범위를 넓히는 후속 사업을 이어가고 있다.",
        solutionEn:
            "An XGEN-based generative-AI platform was built into the bank's own infrastructure and stabilized through an on-site operating team. On the strength of the first phase, follow-on work is widening where it gets used.",
        highlights: [
            "사내 생성형 AI 플랫폼 구축",
            "망분리·온프레미스 운영",
            "상주 운영 · 후속 사업 확대",
        ],
        highlightsEn: [
            "Internal generative-AI platform built",
            "Network-separated, on-premise operation",
            "On-site operations · follow-on expansion",
        ],
        status: "운영 중",
        published: "2026-03-11",
        featured: true,
    },
    {
        slug: "retail-genai-retention",
        title: "생성형 AI로 고객 리텐션과 심의 업무를 지원하다",
        titleEn:
            "Generative AI for retention and review work",
        customer: "국내 대형 홈쇼핑사",
        customerEn: "A large home-shopping retailer",
        customerAnonymous: true,
        industry: "commerce",
        products: ["xgen"],
        summary:
            "대형 홈쇼핑사와 생성형 AI 기반 리텐션(win-back)·심의 지원 애플리케이션을 구축하고, 2차년도 사업으로 확대한 커머스 사례",
        summaryEn:
            "A commerce engagement with a large home-shopping retailer: generative AI for win-back retention and broadcast review, extended into a second year",
        challenge:
            "이탈 고객 재유입과 방송 심의 등 반복 업무에 생성형 AI를 적용하되, 기존 사내 시스템과 자연스럽게 연동돼야 했다.",
        challengeEn:
            "Generative AI had to apply to repetitive work such as winning back lapsed customers and broadcast review, while integrating naturally with the systems already in place.",
        solution:
            "XGEN으로 리텐션·심의 지원 애플리케이션을 구축했다. 1차 사업의 성과를 바탕으로 적용 범위를 넓히는 2차년도 사업으로 이어졌다.",
        solutionEn:
            "Retention and review-support applications were built on XGEN. Results from the first phase led into a second-year program widening where it applies.",
        highlights: [
            "리텐션(win-back) 지원",
            "내부·심의 업무 지원",
            "2차년도 확대 계약",
        ],
        highlightsEn: [
            "Win-back retention support",
            "Internal and review workflow support",
            "Second-year expansion",
        ],
        status: "구축 완료",
        published: "2026-01-15",
        featured: true,
    },
    {
        slug: "semiconductor-code-assistant",
        title: "사내 개발 환경에 맞춘 Code Assistant를 전사로 확산하다",
        titleEn:
            "Code Assistant, rolled out company-wide",
        customer: "국내 반도체 제조 대기업",
        customerEn: "A large semiconductor manufacturer",
        customerAnonymous: true,
        industry: "it-services",
        products: ["code-assistant"],
        summary:
            "반도체 제조 대기업의 사내 개발 환경에 Code Assistant를 도입해 Local LLM 연동과 한글 답변 품질을 개선하고 전사로 확산한 사례",
        summaryEn:
            "A Code Assistant in a semiconductor manufacturer's internal development environment, connected to a local LLM and rolled out company-wide",
        challenge:
            "외부 코드 어시스턴트는 보안상 사용이 어려웠고, 사내 환경에서 한글 기술 질의에 대한 답변 품질을 끌어올려야 했다.",
        challengeEn:
            "External coding assistants were not usable for security reasons, and answer quality for Korean-language technical questions had to be raised inside the internal environment.",
        solution:
            "사내 Local LLM에 연동한 Code Assistant를 구축하고, 한글 답변 품질을 개선했다. 사내 교육을 병행해 실제 활용을 전사로 확산했다.",
        solutionEn:
            "A Code Assistant was built against the internal local LLM, with Korean answer quality improved. Training ran alongside, spreading real usage across the company.",
        highlights: [
            "사내 Local LLM 연동",
            "한글 답변 품질 개선",
            "전사 확산 · 교육 지원",
        ],
        highlightsEn: [
            "Connected to an internal local LLM",
            "Korean answer quality improved",
            "Company-wide rollout with training",
        ],
        status: "확산 중",
        published: "2026-03-03",
        featured: true,
    },
    {
        slug: "defense-code-assistant",
        title: "폐쇄망 개발 환경에 XGEN 기반 Code Assistant를 구축하다",
        titleEn:
            "Code Assistant in an air-gapped network",
        customer: "국내 방산·시스템 기업",
        customerEn: "A defense and systems company",
        customerAnonymous: true,
        industry: "it-services",
        products: ["code-assistant"],
        summary:
            "강한 보안 요건의 폐쇄망 개발 환경에 XGEN 기반 Code Assistant를 온프레미스로 구축한 사례",
        summaryEn:
            "An XGEN-based Code Assistant deployed on-premise into an air-gapped development environment with strict security requirements",
        challenge:
            "외부 연결이 차단된 폐쇄망에서 개발 생산성을 높일 코드 어시스턴트가 필요했다.",
        challengeEn:
            "An air-gapped environment with no external connectivity still needed a coding assistant to raise development productivity.",
        solution:
            "XGEN 기반 Code Assistant를 온프레미스로 구축해, 폐쇄망 안에서 코드 지원을 제공했다.",
        solutionEn:
            "An XGEN-based Code Assistant was deployed on-premise, providing code support entirely inside the closed network.",
        highlights: ["온프레미스 · 폐쇄망 구축", "XGEN 기반 Code Assistant"],
        highlightsEn: [
            "On-premise, air-gapped deployment",
            "XGEN-based Code Assistant",
        ],
        status: "구축 완료",
        published: "2026-01-31",
    },
    {
        slug: "public-procurement-search",
        title: "대규모 조달 검색 시스템을 AI로 고도화하다",
        titleEn:
            "Large-scale procurement search, rebuilt on AI",
        customer: "국내 공제회",
        customerEn: "A public mutual-aid association",
        customerAnonymous: true,
        industry: "public",
        products: ["xgen"],
        summary:
            "공제회의 대규모 조달(구매) 검색 시스템을 AI 검색으로 재구축해 고도화하고 상주 운영으로 안정화한 공공 사례",
        summaryEn:
            "A public-sector engagement rebuilding a mutual-aid association's procurement search on AI, then stabilizing it through on-site operations",
        challenge:
            "방대한 조달 데이터에서 정확한 검색 결과를 제공하도록 검색 영역을 고도화해야 했다.",
        challengeEn:
            "Search had to be modernized so that accurate results came back from a very large body of procurement data.",
        solution:
            "AI 검색 기술로 조달 검색 영역을 재구축하고, 상주 운영으로 서비스를 안정화했다.",
        solutionEn:
            "The procurement search layer was rebuilt on AI search technology, and the service was stabilized through an on-site operating team.",
        highlights: ["조달 검색 영역 재구축", "대규모 데이터 대응", "상주 운영"],
        highlightsEn: [
            "Procurement search layer rebuilt",
            "Handles large-scale data",
            "On-site operations",
        ],
        status: "운영 중",
        published: "2025-11-03",
    },
];

// ── 조회 헬퍼 ────────────────────────────────────────────────────────────────

/** 발행된 사례(초안 제외)를 최신순으로. */
export function getAllCases(): CaseStudy[] {
    return CASE_STUDIES.filter((c) => !c.draft).sort(
        (a, b) => b.published.localeCompare(a.published),
    );
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
    return CASE_STUDIES.find((c) => c.slug === slug && !c.draft);
}

export function getCasesByIndustry(industry: IndustryKey): CaseStudy[] {
    return getAllCases().filter((c) => c.industry === industry);
}

export function getCasesByProduct(product: ProductKey): CaseStudy[] {
    return getAllCases().filter((c) => c.products.includes(product));
}

/** 특정 제품 사례 수(배지·필터 카운트). */
export function countByProduct(): Record<ProductKey, number> {
    const out = { xgen: 0, polar: 0, "code-assistant": 0 } as Record<ProductKey, number>;
    for (const c of getAllCases()) for (const p of c.products) out[p] += 1;
    return out;
}
