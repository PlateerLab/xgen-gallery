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
export type CaseStatus = "운영 중" | "구축 완료" | "확산 중" | "구축·운영 중";

export interface ProductMeta {
    key: ProductKey;
    /** 표기 일관성(엔티티) — 사이트 전역 동일 철자. */
    name: string;
    /** 짧은 한 줄 성격. */
    tagline: string;
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
    /** 고객명(공개 레퍼런스면 실명, 아니면 업종+규모 익명 표현). */
    customer: string;
    /** true면 익명 표기(대외 공개 동의 없는 고객). */
    customerAnonymous?: boolean;
    industry: IndustryKey;
    /** 적용 제품(복수 가능). 첫 항목이 대표 제품. */
    products: ProductKey[];
    /** 자족적 한 문장 요약(카드·검색·JSON-LD 공용). */
    summary: string;
    /** 과제. */
    challenge: string;
    /** 적용/솔루션. */
    solution: string;
    /** 제공 범위·산출물(사실 기반 — 수치 아님). */
    highlights: string[];
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
        href: "/product",
        accent: "#2f7bff",
    },
    polar: {
        key: "polar",
        name: "Polar",
        tagline: "커머스 특화 Private sLLM",
        href: "/polar",
        accent: "#0f9d8f",
    },
    "code-assistant": {
        key: "code-assistant",
        name: "Code Assistant",
        tagline: "AI 코드 어시스턴트",
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
    },
    finance: {
        key: "finance",
        ko: "금융",
        en: "Finance",
        blurb: "생성형 AI 플랫폼·문서 검토·검색 고도화 등 금융 업무에 적용한 고객 사례",
    },
    public: {
        key: "public",
        ko: "공공",
        en: "Public Sector",
        blurb: "조달·검색·민원 등 공공 업무에 적용한 고객 사례",
    },
    "it-services": {
        key: "it-services",
        ko: "IT·제조",
        en: "IT & Manufacturing",
        blurb: "AI Code Assistant·기술 문서 등 개발·엔지니어링 업무에 적용한 고객 사례",
    },
};

/**
 * 실제 납품/운영 프로젝트 — 신뢰 원칙에 따라 정리.
 * 제주은행만 공개 레퍼런스로 실명, 그 외는 업종+규모 익명. 미검증 수치는 넣지 않는다.
 */
export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "jeju-bank-genai-platform",
        title: "제주은행과 사내 생성형 AI 플랫폼을 구축하고 운영으로 안착시키다",
        customer: "제주은행",
        customerAnonymous: false,
        industry: "finance",
        products: ["xgen"],
        summary:
            "제주은행과 XGEN 기반 사내 생성형 AI(GenAI) 플랫폼을 구축하고, 상주 운영으로 안정화해 활용을 넓혀가는 금융권 사례",
        challenge:
            "금융권 보안·망분리 요건을 지키면서 사내 업무에 생성형 AI를 도입하고, 일회성 구축이 아니라 실제 운영까지 안착시켜야 했다.",
        solution:
            "XGEN 기반 GenAI 플랫폼을 은행 인프라에 구축하고, 상주 운영 체계로 서비스를 안정화했다. 1차 구축 성과를 바탕으로 활용 범위를 넓히는 후속 사업을 이어가고 있다.",
        highlights: [
            "사내 생성형 AI 플랫폼 구축",
            "망분리·온프레미스 운영",
            "상주 운영 · 후속 사업 확대",
        ],
        status: "운영 중",
        published: "2026-03-11",
        featured: true,
    },
    {
        slug: "retail-genai-retention",
        title: "생성형 AI로 고객 리텐션과 심의 업무를 지원하다",
        customer: "국내 대형 홈쇼핑사",
        customerAnonymous: true,
        industry: "commerce",
        products: ["xgen"],
        summary:
            "대형 홈쇼핑사와 생성형 AI 기반 리텐션(win-back)·심의 지원 애플리케이션을 구축하고, 2차년도 사업으로 확대한 커머스 사례",
        challenge:
            "이탈 고객 재유입과 방송 심의 등 반복 업무에 생성형 AI를 적용하되, 기존 사내 시스템과 자연스럽게 연동돼야 했다.",
        solution:
            "XGEN으로 리텐션·심의 지원 애플리케이션을 구축했다. 1차 사업의 성과를 바탕으로 적용 범위를 넓히는 2차년도 사업으로 이어졌다.",
        highlights: [
            "리텐션(win-back) 지원",
            "내부·심의 업무 지원",
            "2차년도 확대 계약",
        ],
        status: "구축 완료",
        published: "2026-01-15",
        featured: true,
    },
    {
        slug: "semiconductor-code-assistant",
        title: "사내 개발 환경에 맞춘 AI Code Assistant를 전사로 확산하다",
        customer: "국내 반도체 제조 대기업",
        customerAnonymous: true,
        industry: "it-services",
        products: ["code-assistant"],
        summary:
            "반도체 제조 대기업의 사내 개발 환경에 AI Code Assistant를 도입해 Local LLM 연동과 한글 답변 품질을 개선하고 전사로 확산한 사례",
        challenge:
            "외부 코드 어시스턴트는 보안상 사용이 어려웠고, 사내 환경에서 한글 기술 질의에 대한 답변 품질을 끌어올려야 했다.",
        solution:
            "사내 Local LLM에 연동한 AI Code Assistant를 구축하고, 한글 답변 품질을 개선했다. 사내 교육을 병행해 실제 활용을 전사로 확산했다.",
        highlights: [
            "사내 Local LLM 연동",
            "한글 답변 품질 개선",
            "전사 확산 · 교육 지원",
        ],
        status: "확산 중",
        published: "2026-03-03",
        featured: true,
    },
    {
        slug: "defense-code-assistant",
        title: "폐쇄망 개발 환경에 XGEN 기반 AI Code Assistant를 구축하다",
        customer: "국내 방산·시스템 기업",
        customerAnonymous: true,
        industry: "it-services",
        products: ["code-assistant"],
        summary:
            "강한 보안 요건의 폐쇄망 개발 환경에 XGEN 기반 AI Code Assistant를 온프레미스로 구축한 사례",
        challenge:
            "외부 연결이 차단된 폐쇄망에서 개발 생산성을 높일 코드 어시스턴트가 필요했다.",
        solution:
            "XGEN 기반 AI Code Assistant를 온프레미스로 구축해, 폐쇄망 안에서 코드 지원을 제공했다.",
        highlights: ["온프레미스 · 폐쇄망 구축", "XGEN 기반 Code Assistant"],
        status: "구축 완료",
        published: "2026-01-31",
    },
    {
        slug: "public-procurement-search",
        title: "대규모 조달 검색 시스템을 AI로 고도화하다",
        customer: "국내 공제회",
        customerAnonymous: true,
        industry: "public",
        products: ["xgen"],
        summary:
            "공제회의 대규모 조달(구매) 검색 시스템을 AI 검색으로 재구축해 고도화하고 상주 운영으로 안정화한 공공 사례",
        challenge:
            "방대한 조달 데이터에서 정확한 검색 결과를 제공하도록 검색 영역을 고도화해야 했다.",
        solution:
            "AI 검색 기술로 조달 검색 영역을 재구축하고, 상주 운영으로 서비스를 안정화했다.",
        highlights: ["조달 검색 영역 재구축", "대규모 데이터 대응", "상주 운영"],
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
