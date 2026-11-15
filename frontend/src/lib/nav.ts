/**
 * Single source of truth for the global navigation (GNB) and footer.
 *
 * Concept: every top-level group is a "one-page" (a single scrollable route)
 * whose sub-menu items are anchor links to sections inside that page. Clicking
 * a sub-menu therefore scrolls to `/{group}#{section}`. Content is filled in
 * gradually — sections that have no content yet render a placeholder.
 *
 * To add/rename a menu, edit this file only; SiteNav, the group pages, and the
 * footer are all driven from here.
 */
import type { ConceptId } from "@/lib/backgrounds";
import { CATEGORIES, toolCountFor } from "@/lib/tools";

export interface NavLeaf {
    /** display label */
    label: string;
    /** Korean label override — used when the site locale is `ko`. */
    labelKo?: string;
    /** anchor id within the group page (becomes /{group}#{id}) */
    id: string;
    /** nested children (one level), e.g. XGEN → PathFinder/FloUI/... */
    children?: NavLeaf[];
    /**
     * Absolute external URL. When set, this item is an outbound link (opens in a
     * new tab with an external-link indicator) instead of an in-page section —
     * it is skipped when rendering the group one-page's sections.
     */
    external?: string;
    /**
     * Internal route to a standalone page (e.g. "/library-gallery"). When set,
     * the menu links straight to that page, and the group one-page renders only
     * a short intro + a "바로가기" link to it instead of full inline content.
     */
    route?: string;
    /** true면 메뉴에서 링크 없이 글자만 보인다(준비 중 제품 등). */
    disabled?: boolean;
    /** Short intro copy for a `route` item on the group one-page. */
    blurb?: string;
    /** 영문 소개 카피 — `/en` 그룹 원페이지에서 쓴다(없으면 blurb 그대로). */
    blurbEn?: string;
    /**
     * Hide from the menus (GNB dropdown, mobile drawer, hero quick-jump) while
     * keeping the section rendered on the group one-page. Use to retire a menu
     * entry without deleting its content.
     */
    hidden?: boolean;
    /**
     * Keep this item in the navigation menus (GNB dropdown, mobile drawer, footer)
     * but do NOT render it as a section (or hero quick-jump chip) on the group
     * one-page. Use for a menu entry whose content lives only on its own route
     * page — the opposite of `hidden`.
     */
    menuOnly?: boolean;
    /**
     * In a `wide` dropdown, force this item to start a new column (line break).
     * Use to control column grouping instead of even auto-distribution.
     */
    colBreak?: boolean;
    /**
     * Plain (non-link) descriptor line rendered under this item's label in the
     * dropdown — e.g. a middot list of facets that aren't linked yet
     * ("커머스 · 금융 · 공공 · IT"). Shown as muted text, not clickable.
     */
    note?: string;
    /** Korean note override — used when the site locale is `ko` (see `labelKo`). */
    noteKo?: string;
}

/** GNB 드롭다운 왼쪽의 대표 카드(제목 → / 설명 / 이미지). 마키나락스 GNB 패턴. */
export interface NavFeature {
    title: string;
    titleKo?: string;
    text: string;
    textKo?: string;
    image: string;
    href: string;
}

export interface NavGroup {
    /** url segment + key, e.g. "research" → /research */
    key: string;
    /** top-level GNB label */
    label: string;
    /** 국문 화면의 최상위 메뉴 라벨(없으면 label). */
    labelKo?: string;
    /**
     * 드롭다운을 트리거 기준 어디에 맞출지. 기본 left. 오른쪽 끝 메뉴는 right로
     * 두어 화면 밖으로 넘치지 않게 한다.
     */
    align?: "left" | "center" | "right";
    /** background atmosphere for the group's one-page hero */
    concept: ConceptId;
    /** short hero subtitle — fill in over time */
    blurb: string;
    /** 영문 히어로 부제 — `/en` 그룹 원페이지에서 쓴다(없으면 blurb 그대로). */
    blurbEn?: string;
    /** sub-menu items, each an anchored section on the group page */
    items: NavLeaf[];
    /**
     * Hide this whole group from the menus (GNB dropdown, mobile drawer, footer
     * Explore list) while keeping its one-page route (/{key}) reachable.
     */
    hidden?: boolean;
    /**
     * External URL. When set, the top-level menu opens this in a new tab with an
     * outbound-link arrow instead of linking to an in-site /{key} one-page.
     */
    external?: string;
    /**
     * Internal link override for the top-level menu (e.g. "/#live-demo"). When set,
     * the top-level label links here instead of the default `/{key}` one-page — use
     * for a group that has no dedicated page (its content lives elsewhere, e.g. a
     * homepage section). Excluded from the sitemap since `/{key}` doesn't exist.
     */
    route?: string;
    /**
     * Render the GNB entry as a flat 1-depth link (no dropdown) even though the
     * group has `items`. The items still drive the group's one-page sections —
     * only the top-level menu is collapsed to a single link to /{key}.
     */
    flat?: boolean;
    /** Lay the GNB dropdown out in multiple columns (for long item lists). */
    wide?: boolean;
    /** Number of columns for a `wide` dropdown (default 3). */
    cols?: number;
    /** 드롭다운 왼쪽 대표 카드 */
    feature?: NavFeature;
    /**
     * GNB 최상위 노출 순서(작을수록 앞). "연구→오픈소스→제품→실증" 서사에 맞춰
     * 정렬한다. 미지정(hidden 등)은 뒤로 밀린다. NAV_GROUPS 정의 직후 이 값으로 정렬.
     */
    order?: number;
}

/** Build the full href for a group/section: /research#research-areas */
export function sectionHref(groupKey: string, id: string): string {
    return `/${groupKey}#${id}`;
}

/**
 * Library Gallery 하위 메뉴 — lib/tools.ts 의 CATEGORIES 에서 그대로 만든다.
 *
 * 카테고리가 늘면 이 메뉴도 같이 늘어난다(메뉴를 손으로 고칠 필요가 없다).
 * "all" 은 갤러리 첫 화면이라 상위 항목(Library Gallery)이 이미 맡고 있어 뺀다.
 * 링크는 /library-gallery?cat=…#tools — 쿼리로 필터를 정하고, 앵커로 카드
 * 그리드까지 내려준다(히어로만 보이고 끝나지 않게).
 *
 * 라벨 뒤 숫자는 그 카테고리의 라이브러리 수다. 갤러리 필터 칩과 같은 함수를
 * 쓰므로 라이브러리를 추가하면 메뉴의 숫자도 함께 바뀐다.
 */
const LIBRARY_CATEGORY_ITEMS: NavLeaf[] = CATEGORIES.filter(
    (c) => c.id !== "all",
).map((c) => ({
    label: `${c.label} ${toolCountFor(c.id)}`,
    labelKo: `${c.labelKo} ${toolCountFor(c.id)}`,
    id: `lib-${c.id}`,
    route: `/library-gallery?cat=${c.id}#tools`,
}));

const ALL_NAV_GROUPS: NavGroup[] = [
    {
        // 최상위 GNB에서는 감추고(= Research & Technology 아래로 편입), /research
        // 원페이지와 sitemap 등록은 그대로 유지한다.
        key: "research",
        label: "Research",
        concept: "research",
        blurb: "엔터프라이즈 AI를 떠받치는 연구 — 영역, 백서, 아키텍처, 로드맵.",
        blurbEn: "The research underneath enterprise AI — areas, papers, architecture, and roadmap.",
        hidden: true,
        items: [
            { label: "Research Areas", id: "research-areas" },
            { label: "Publications", id: "publications" },
        ],
    },
    {
        key: "technology",
        // 2026-11 GNB 개편: 메뉴는 아래 MENU_* 그룹이 맡고, 이 그룹은 원페이지 데이터로만 쓴다.
        hidden: true,
        order: 1,
        label: "Technology",
        concept: "technology",
        blurb: "연구 성과부터 엔진·프레임워크·런타임·아키텍처까지.",
        blurbEn: "From research results through the engines, frameworks, runtime, and architecture.",
        wide: true,
        items: [
            {
                // Research 영역 — 첫 열. /research 원페이지의 실제 하위 섹션(스크롤스파이
                // 앵커: challenges/fields/cases/methodology)을 그대로 끌어올려 다른 열과
                // 항목 수 밸런스를 맞춘다. 헤더 "Research"는 /research 개요로 링크.
                label: "Research",
                id: "research",
                route: "/research",
                children: [
                    { label: "Core Challenges", labelKo: "핵심 연구 과제", id: "challenges", route: "/research#challenges" },
                    { label: "Research Fields", labelKo: "핵심 연구 분야", id: "fields", route: "/research#fields" },
                    { label: "Applied Research", labelKo: "실증 연구 사례", id: "cases", route: "/research#cases" },
                    { label: "Methodology", labelKo: "연구 방법론", id: "methodology", route: "/research#methodology" },
                    { label: "Publications", labelKo: "논문·발표", id: "publications", route: "/research#publications" },
                ],
            },
            {
                label: "Engines",
                id: "engines",
                colBreak: true,
                children: [
                    { label: "Ontology", id: "ontology" },
                    { label: "Harness", id: "harness" },
                ],
            },
            {
                label: "Frameworks",
                id: "frameworks",
                children: [
                    { label: "AgenticOps", id: "agenticops" },
                    { label: "GraphRAG", id: "graphrag" },
                    { label: "Hybrid RAG", id: "hybrid-rag" },
                    { label: "Context Engineering", id: "context-engineering" },
                ],
            },
            {
                label: "Architecture",
                id: "architecture",
                colBreak: true,
                route: "/architecture",
                blurb: "신뢰할 수 있는 Enterprise AI를 위한 참조 아키텍처를 별도 페이지에서 확인하세요.",
                children: [
                    { label: "Foundation", labelKo: "기반 아키텍처", id: "foundation", route: "/architecture#foundation" },
                    { label: "Design Principles", labelKo: "설계 원칙", id: "principles", route: "/architecture#principles" },
                    { label: "Enterprise AI Architecture", labelKo: "Enterprise AI 아키텍처", id: "reference", route: "/architecture#reference" },
                    { label: "On-Premise Security", labelKo: "온프레미스·보안", id: "security", route: "/architecture#security" },
                    { label: "XGEN Platform", labelKo: "XGEN 플랫폼", id: "platform", route: "/architecture#platform" },
                    { label: "Code Assistant", labelKo: "코드 어시스턴트", id: "code-assistant", route: "/architecture#code-assistant" },
                    { label: "CI/CD", labelKo: "CI/CD 배포", id: "cicd", route: "/architecture#cicd" },
                ],
            },
        ],
    },
    {
        key: "products",
        label: "Products",
        concept: "products",
        blurb: "XGEN 플랫폼과 그 위의 제품들.",
        blurbEn: "The XGEN platform and the products built on it.",
        hidden: true,
        items: [
            { label: "Polar", id: "polar" },
            {
                label: "XGEN",
                id: "xgen",
                children: [
                    { label: "PathFinder", id: "pathfinder" },
                    { label: "FloUI", id: "floui" },
                    { label: "Canvas", id: "canvas" },
                    { label: "MCP App", id: "mcp-compiler" },
                ],
            },
            { label: "Code Assistant", id: "ai-code-assistant" },
        ],
    },
    {
        key: "solutions",
        // 2026-11 GNB 개편: 메뉴는 아래 MENU_* 그룹이 맡고, 이 그룹은 원페이지 데이터로만 쓴다.
        hidden: true,
        order: 4,
        label: "Solutions",
        concept: "solutions",
        blurb: "산업별 적용, PoC·실증, 고객사례, 그리고 무료 체험.",
        blurbEn: "Industry applications, PoCs and proof, customer cases, and a free trial.",
        wide: true,
        cols: 2,
        items: [
            {
                // 적용 사례 — 구 xgen.im Use Case(공공·제조·지식검색·업무자동화·멀티 에이전트) 흡수.
                label: "Use Cases",
                labelKo: "적용 사례",
                id: "use-cases",
            },
            {
                // 헤더는 하위(산업 적용·PoC·실증·컨설팅·활용지원)를 아우르는 "적용·딜리버리"로.
                label: "Applied & Delivery",
                labelKo: "적용·딜리버리",
                id: "ai-agents",
                children: [
                    // 딜리버리 라이프사이클 순: 맥락→전략→검증→입증→내재화→운영
                    { label: "Industries", labelKo: "산업별 적용", id: "industries" },
                    { label: "Technical Consulting", labelKo: "기술 컨설팅", id: "technical-consulting", route: "/technical-consulting" },
                    { label: "PoC Projects", labelKo: "PoC Projects", id: "poc-projects", route: "/poc-projects" },
                    { label: "Proof in Action", labelKo: "실증 데모 영상", id: "proof-in-action", route: "/proof-in-action" },
                    // 납품 후 고객사 활용 지원·교육 — 내재화 단계.
                    { label: "Enablement", labelKo: "교육 지원", id: "enablement", route: "/enablement" },
                    // 구축 이후 운영 — 유지보수·장애처리·모니터링·SLA.
                    { label: "Operations & Support", labelKo: "운영·기술지원", id: "support", route: "/support" },
                ],
            },
            {
                // 고객사례 — 단일 허브(/customers)로 연결. col2에 별도 열로 둔다(체험하기 앞).
                // route가 있어 GNB 헤더 클릭 시 /customers로 랜딩한다. menuOnly라 /solutions
                // 원페이지에는 바로가기 섹션을 렌더하지 않는다(허브 페이지에서만 확인). 하위 메뉴는 산업별 페이지로 딥링크.
                label: "Customer Cases",
                labelKo: "고객사례",
                id: "customer-cases",
                route: "/customers",
                menuOnly: true,
                blurb: "금융·커머스·공공·IT/제조 현장에 XGEN을 구축·운영한 고객사례를 제품·산업별로 확인하세요.",
                colBreak: true,
                // 산업 구분은 사례 데이터가 쌓일 때까지 링크 대신 중간점 텍스트로만 노출.
                note: "Commerce · Finance · Public · IT",
                noteKo: "커머스 · 금융 · 공공 · IT",
            },
            {
                // 체험하기 — Applied AI 드롭다운 3열(고객사례 옆). 헤더는 홈 Live Demo
                // 섹션(/#live-demo)으로, 하위엔 외부 데모 2개를 새 탭으로 노출한다. menuOnly라
                // /solutions 원페이지에는 별도 섹션을 만들지 않는다(전용 페이지 없음).
                label: "Try it",
                labelKo: "체험하기",
                id: "live-demo",
                route: "/#live-demo",
                menuOnly: true,
                children: [
                    { label: "XGEN trial(15Days)", id: "try-xgen", route: "/xgen-trial" },
                    { label: "X2BEE AI", id: "try-x2bee", external: "https://ai-exp.x2bee.com" },
                ],
            },
        ],
    },
    {
        // Product — 최상위 GNB. XGEN 제품을 사이트 내부(/product/xgen)로 통합(구 xgen.im 흡수).
        // 드롭다운(3열): [XGEN] | [Polar] | [Code Assistant]. colBreak로 열을 나눈다.
        key: "product",
        // 2026-11 GNB 개편: 메뉴는 아래 MENU_* 그룹이 맡고, 이 그룹은 원페이지 데이터로만 쓴다.
        hidden: true,
        order: 3,
        label: "Product",
        concept: "products",
        blurb: "XGEN — 원하는 LLM과 인프라로 만드는 맞춤 Agentic AI 플랫폼",
        blurbEn: "XGEN — an Agentic AI platform shaped to the LLMs and infrastructure you choose",
        wide: true,
        cols: 3,
        items: [
            {
                // XGEN — 기존 서브메뉴 전체를 이 제품 그룹 아래로 묶는다.
                label: "XGEN (Agentic AI Platform)",
                labelKo: "XGEN (기업형 에이전틱 AI플랫폼)",
                id: "xgen",
                // 제품 마이크로사이트(브랜드 헤더)로 진입한다. 하위 섹션 링크는 기존 /xgen 유지(시안 단계).
                route: "/product/xgen",
                // GNB 하위는 /xgen 페이지 섹션 구조와 정렬한다(B2B 온프레미스 결정요인
                // 핵심기술·온프레미스를 메뉴에 노출). 심화 보안 페이지는 /xgen#on-premise의
                // "자세히 보기"로 연결한다.
                children: [
                    { label: "Why XGEN", labelKo: "제품 개요", id: "why-xgen", route: "/product/xgen" },
                    {
                        label: "Features · Technology",
                        labelKo: "핵심 기능·기술",
                        id: "features",
                        route: "/product/xgen#features",
                    },
                    { label: "On-Premise · Security · Governance", labelKo: "온프레미스·보안·거버넌스", id: "on-premise", route: "/security-and-governance", colBreak: true },
                    { label: "Certifications & Quality", labelKo: "인증·품질", id: "certification", route: "/product/xgen#certification" },
                    { label: "Customer Cases", labelKo: "고객사례", id: "xgen-cases", route: "/product/xgen#cases" },
                    { label: "Documentation", id: "documentation", route: "/documentation" },
                    { label: "Release Notes", id: "releases", route: "/releases" },
                ],
            },
            {
                // Code Assistant — 사내 코드베이스를 이해하는 코드 어시스턴트. colBreak로
                // XGEN 오른쪽(col2)에 둔다. 라벨은 요청에 따라 영문 표기(labelKo도 영문).
                label: "Code Assistant",
                labelKo: "Code Assistant",
                id: "code-assistant",
                route: "/code-assistant",
                colBreak: true,
                blurb: "사내 코드·API·스키마를 학습하는 AI 코드 어시스턴트",
                children: [
                    { label: "Overview", labelKo: "제품 개요", id: "ca-overview", route: "/code-assistant#overview" },
                    { label: "Business Value", labelKo: "도입 효과", id: "ca-value", route: "/code-assistant#value" },
                    { label: "Capabilities", labelKo: "핵심 기능", id: "ca-capabilities", route: "/code-assistant#capabilities" },
                    { label: "How It Works", labelKo: "작동 원리", id: "ca-how", route: "/code-assistant#how-it-works" },
                    { label: "Integrations", labelKo: "연동·배포", id: "ca-integrations", route: "/code-assistant#integrations" },
                    { label: "Technical Specs", labelKo: "기술 사양", id: "ca-specs", route: "/code-assistant#specs" },
                    { label: "Use Cases", labelKo: "활용 사례", id: "ca-use-cases", route: "/code-assistant#use-cases" },
                ],
            },
            {
                // Polar — 커머스 특화 Private sLLM. colBreak로 3번째 열(col3, 맨 오른쪽)에 둔다.
                label: "Polar(sLLM)",
                labelKo: "Polar(sLLM)",
                id: "polar",
                route: "/product/polar",
                colBreak: true,
                blurb: "커머스 특화 Private sLLM",
                children: [
                    { label: "Overview", labelKo: "소개", id: "overview", route: "/product/polar#overview" },
                    { label: "How It Works", labelKo: "작동 원리", id: "how-it-works", route: "/product/polar#how-it-works" },
                    { label: "Technology", labelKo: "핵심 기술", id: "technology", route: "/product/polar#technology" },
                    { label: "Use Cases", labelKo: "활용 사례", id: "use-cases", route: "/product/polar#use-cases" },
                ],
            },
        ],
    },
    {
        // Open Source 최상위 메뉴 — key를 library-gallery로 두어 상단/푸터 링크가
        // 기존 /library-gallery 페이지를 그대로 가리킨다(별도 페이지·route 불필요).
        // 항목이 3개(+Runtime 하위)라 wide 다열 대신 단일 열 드롭다운으로 왼쪽에 모은다.
        key: "library-gallery",
        // 2026-11 GNB 개편: 메뉴는 아래 MENU_* 그룹이 맡고, 이 그룹은 원페이지 데이터로만 쓴다.
        hidden: true,
        order: 2,
        label: "Open Source",
        concept: "tools",
        blurb: "XGEN을 떠받치는 공개 라이브러리와 실전 레시피.",
        blurbEn: "The public libraries behind XGEN, plus recipes for putting them to work.",
        items: [
            {
                // 라벨 클릭은 갤러리 전체, 하위는 카테고리 딥링크(?cat=…).
                // 하위 항목은 CATEGORIES 에서 자동 생성된다 — 위 주석 참고.
                label: "Library Gallery",
                id: "library-gallery",
                route: "/library-gallery",
                children: LIBRARY_CATEGORY_ITEMS,
            },
            {
                // Runtime — 독립 MCP 런타임. 단일 열이라 Library 항목들과 함께
                // 왼쪽에 세로로 쌓인다(+하위 앵커). 콘텐츠는 /library-gallery
                // 페이지의 runtime 섹션에 렌더되며, 하위 앵커는 RuntimeContent
                // 내부 id로 연결.
                label: "Runtime",
                id: "runtime",
                route: "/library-gallery#runtime",
            },
        ],
    },
    {
        // 블로그(/blog) 최상위 — 드롭다운은 1depth로 편다: Product News →
        // Field Report → Tech Note → Lab Newsletter → Events. (Downloads 는 hidden.)
        // 목록 탭 순서(VISIBLE_BLOG_CATEGORIES)에 없는 뉴스레터가 끼므로
        // 이 배열이 GNB 순서의 단일 출처다.
        // 카테고리는 /blog?cat=… 로 딥링크되어
        // BlogList가 초기 필터를 적용한다(blog-list.tsx의 CATEGORY_BY_KEY).
        // 글 목록 전체로 가는 링크는 그룹 라벨(Insight → /blog)이 맡는다.
        // GNB 순서: Open Source 다음(최상위 메뉴 끝)에 배치 — 블로그를 마지막에 둔다.
        key: "blog",
        // 2026-11 GNB 개편: 메뉴는 아래 MENU_* 그룹이 맡고, 이 그룹은 원페이지 데이터로만 쓴다.
        hidden: true,
        order: 5,
        label: "Insight",
        concept: "insights",
        blurb: "Enterprise AI · Agentic AI · GEO·SEO 인사이트",
        blurbEn: "Insights on Enterprise AI, Agentic AI, and GEO/SEO",
        items: [
            // 표기는 "Product News"지만 딥링크 키(cat=product)와 저장 값은 그대로다.
            // 국문 GNB 는 한글 표기를 쓴다(labelKo) — 영문 표기는 label 이 그대로 맡는다.
            { label: "News", labelKo: "뉴스", id: "cat-news", route: "/blog?cat=news" },
            { label: "Product News", labelKo: "제품 소식", id: "cat-product", route: "/blog?cat=product" },
            // 표기는 "Field Report"지만 딥링크 키(cat=industry)와 저장 값은 그대로다.
            { label: "Field Report", labelKo: "현장 리포트", id: "cat-industry", route: "/blog?cat=industry" },
            { label: "Insight", labelKo: "인사이트", id: "cat-xinsight", route: "/blog?cat=xinsight" },
            // Case Study 는 목록 탭과 함께 감췄다(lib/blog-categories.ts의
            // VISIBLE_BLOG_CATEGORIES). 되살릴 때 이 줄도 같이 살린다.
            // { label: "Case Study", id: "cat-case", route: "/blog?cat=case" },
            { label: "Tech Note", labelKo: "테크 노트", id: "cat-labs", route: "/blog?cat=labs" },
            { label: "Newsletter", labelKo: "뉴스레터", id: "newsletter", route: "/newsletter" },
            { label: "Events", labelKo: "이벤트", id: "events", route: "/events", menuOnly: true },
            {
                // 메뉴에서만 감춘다 — 소개서 신청 페이지와 그 안의 다운로드는
                // 그대로 살아 있고, 직접 주소로도 각 페이지 링크로도 접근된다.
                // 다시 노출하려면 hidden 줄만 지우면 된다.
                hidden: true,
                label: "Downloads",
                labelKo: "다운로드",
                id: "resources",
                route: "/xgen-brief-k7m4",
                blurb: "XGEN 소개서 등 다운로드 자료를 제공합니다.",
            },
        ],
    },
    // ── 2026-11 GNB 개편: 제품 · 산업별 솔루션 · 테크놀로지 · 고객지원 · 소식·인사이트 ──
    // 메뉴 전용 그룹이다(route가 있어 /{key} 원페이지를 만들지 않고 사이트맵에서도 빠진다).
    // 하위 항목은 모두 route를 명시한다 — key가 실제 페이지가 아니므로 sectionHref를 쓰면 안 된다.
    {
        key: "menu-products",
        order: 1,
        label: "Products",
        labelKo: "제품",
        concept: "products",
        blurb: "XGEN · Polar · X2BEE · Ontlas",
        route: "/",
        wide: true,
        feature: { title: "XGEN", titleKo: "XGEN", text: "Keep your environment as it is — build, run and govern AI agents.", textKo: "기업의 환경은 그대로, AI Agent의 구축부터 운영 통제까지", image: "/intro/xgen-menu-1609678209.webp", href: "/product/xgen" },
        align: "left",
        items: [
            {
                label: "XGEN (Agentic AI Platform)",
                labelKo: "XGEN (기업형 에이전틱 AI플랫폼)",
                id: "m-xgen",
                route: "/product/xgen",
                children: [
                    { label: "Why XGEN", labelKo: "제품 개요", id: "m-why-xgen", route: "/product/xgen" },
                    {
                        label: "Features · Technology",
                        labelKo: "핵심 기능·기술",
                        id: "m-features",
                        route: "/product/xgen#features",
                    },
                    { label: "Security · Governance", labelKo: "보안·거버넌스", id: "m-security", route: "/security-and-governance" },
                    { label: "Certifications & Quality", labelKo: "인증·품질", id: "m-certification", route: "/product/xgen#certification" },
                ],
            },
            {
                label: "Polar(sLLM)",
                id: "m-polar",
                route: "/product/polar",
                colBreak: true,
                children: [
                    { label: "Overview", labelKo: "소개", id: "m-polar-overview", route: "/product/polar#overview" },
                    { label: "How It Works", labelKo: "작동 원리", id: "m-polar-how", route: "/product/polar#how-it-works" },
                    { label: "Technology", labelKo: "핵심 기술", id: "m-polar-tech", route: "/product/polar#technology" },
                    { label: "Use Cases", labelKo: "활용 사례", id: "m-polar-cases", route: "/product/polar#use-cases" },
                ],
            },
            {
                // 별도 제품 사이트로 나가는 아웃링크(새 탭 + ↗). 셋째 열 맨 위, 그 아래 Ontlas.
                label: "X2BEE (Agentic Commerce Platform)",
                labelKo: "X2BEE (에이전틱 커머스 플랫폼)",
                id: "m-x2bee-product",
                external: "https://www.x2bee.com/",
                colBreak: true,
            },
            {
                // 제품 페이지가 준비될 때까지 메뉴에서는 클릭되지 않게 둔다.
                label: "Ontlas",
                id: "m-ontlas",
                route: "/product/ontlas",
                disabled: true,
                note: "Product page coming soon",
                noteKo: "제품 페이지 준비 중",
            },
        ],
    },
    {
        key: "menu-solutions",
        order: 2,
        label: "Solutions",
        labelKo: "산업별 솔루션",
        concept: "solutions",
        blurb: "산업별 적용과 고객사례·실증",
        route: "/customers",
        wide: true,
        feature: { title: "Solutions Overview", titleKo: "산업별 솔루션", text: "See how AI agents are applied by industry and workload.", textKo: "산업과 업무에 맞춰 AI Agent를 적용한 사례를 살펴보세요.", image: "/solutions/public.webp", href: "/solutions" },
        align: "left",
        items: [
            {
                // 산업별 솔루션 페이지를 만들기 전까지는 산업별 고객사례 페이지로 연결한다.
                label: "By Industry",
                labelKo: "산업별 적용",
                id: "m-industries",
                route: "/customers",
                children: [
                    { label: "Solutions Overview", labelKo: "산업별 솔루션 개요", id: "m-solutions", route: "/solutions" },
                    { label: "Public Sector", labelKo: "공공", id: "m-uc-public", route: "/solutions#public" },
                    { label: "Manufacturing", labelKo: "제조", id: "m-uc-manufacturing", route: "/solutions#manufacturing" },
                    { label: "Commerce", labelKo: "커머스", id: "m-ind-commerce", route: "/customers/commerce" },
                    { label: "Finance", labelKo: "금융", id: "m-ind-finance", route: "/customers/finance" },
                    { label: "IT Services", labelKo: "IT 서비스", id: "m-ind-it", route: "/customers/it-services" },
                ],
            },
            {
                // 구 xgen.im Use Case — /solutions 적용 사례 섹션의 업무별 영역으로 연결.
                label: "By Workload",
                labelKo: "업무별 적용",
                id: "m-workloads",
                route: "/solutions#use-cases",
                colBreak: true,
                children: [
                    { label: "Knowledge Search", labelKo: "지식 검색", id: "m-uc-knowledge", route: "/solutions#knowledge" },
                    { label: "Workflow Automation", labelKo: "업무 자동화", id: "m-uc-automation", route: "/solutions#automation" },
                    { label: "Unified Multi-Agent", labelKo: "통합형 멀티 에이전트", id: "m-uc-multi", route: "/solutions#multi-agent" },
                ],
            },
            {
                label: "Cases & Proof",
                labelKo: "사례·실증",
                id: "m-proof",
                route: "/customers",
                colBreak: true,
                children: [
                    { label: "Customer Cases", labelKo: "고객사례", id: "m-customers", route: "/customers" },
                    { label: "PoC Projects", id: "m-poc", route: "/poc-projects" },
                    { label: "Proof in Action", labelKo: "실증 데모 영상", id: "m-proof-in-action", route: "/proof-in-action" },
                ],
            },
        ],
    },
    {
        key: "menu-technology",
        order: 3,
        label: "Technology",
        labelKo: "테크놀로지",
        concept: "technology",
        blurb: "연구·엔진·아키텍처·오픈소스",
        route: "/technology",
        wide: true,
        feature: { title: "Technology", titleKo: "테크놀로지", text: "Research, engines, architecture and open-source libraries behind XGEN.", textKo: "XGEN을 받치는 연구·엔진·아키텍처·오픈소스를 소개합니다.", image: "/intro/technology-arch.webp", href: "/technology" },
        align: "center",
        items: [
            {
                label: "Research",
                id: "m-research",
                route: "/research",
                children: [
                    { label: "Core Challenges", labelKo: "핵심 연구 과제", id: "m-challenges", route: "/research#challenges" },
                    { label: "Research Fields", labelKo: "핵심 연구 분야", id: "m-fields", route: "/research#fields" },
                    { label: "Applied Research", labelKo: "실증 연구 사례", id: "m-cases", route: "/research#cases" },
                    { label: "Publications", labelKo: "논문·발표", id: "m-publications", route: "/research#publications" },
                ],
            },
            {
                label: "Engines · Frameworks",
                id: "m-engines",
                route: "/technology",
                colBreak: true,
                children: [
                    { label: "Ontology", id: "m-ontology", route: "/technology#ontology" },
                    { label: "Harness", id: "m-harness", route: "/technology#harness" },
                    { label: "AgenticOps", id: "m-agenticops", route: "/technology#agenticops" },
                    { label: "GraphRAG", id: "m-graphrag", route: "/technology#graphrag" },
                    { label: "Hybrid RAG", id: "m-hybrid-rag", route: "/technology#hybrid-rag" },
                    { label: "Context Engineering", id: "m-context", route: "/technology#context-engineering" },
                ],
            },
            {
                label: "Architecture",
                labelKo: "아키텍처",
                id: "m-architecture",
                route: "/architecture",
                colBreak: true,
                children: [
                    { label: "Foundation", labelKo: "기반 아키텍처", id: "m-foundation", route: "/architecture#foundation" },
                    { label: "Enterprise AI Architecture", labelKo: "Enterprise AI 아키텍처", id: "m-reference", route: "/architecture#reference" },
                    { label: "On-Premise Security", labelKo: "온프레미스·보안", id: "m-onprem", route: "/architecture#security" },
                    { label: "XGEN Platform", labelKo: "XGEN 플랫폼", id: "m-platform", route: "/architecture#platform" },
                ],
            },
            {
                label: "Open Source",
                labelKo: "오픈소스",
                id: "m-open-source",
                route: "/library-gallery",
                colBreak: true,
                children: [
                    { label: "Library Gallery", labelKo: "라이브러리 갤러리", id: "m-library", route: "/library-gallery" },
                    {
                        label: "Runtime",
                        id: "m-runtime",
                        route: "/library-gallery#runtime",
                    },
                ],
            },
        ],
    },
    {
        key: "menu-support",
        order: 4,
        label: "Support",
        labelKo: "고객지원",
        concept: "solutions",
        blurb: "도입 지원·자료·체험",
        route: "/support",
        wide: true,
        feature: { title: "XGEN Trial", titleKo: "XGEN 체험 신청", text: "Start XGEN in your browser for 15 days, with nothing to install.", textKo: "설치 없이 브라우저에서 15일간 XGEN을 써 볼 수 있습니다.", image: "/intro/company-bright.webp", href: "/xgen-trial" },
        align: "center",
        items: [
            {
                label: "Adoption",
                labelKo: "도입 지원",
                id: "m-adoption",
                route: "/technical-consulting",
                children: [
                    { label: "Technical Consulting", labelKo: "기술 컨설팅", id: "m-consulting", route: "/technical-consulting" },
                    { label: "Enablement", labelKo: "교육 지원", id: "m-enablement", route: "/enablement" },
                    { label: "Operations & Support", labelKo: "운영·기술지원", id: "m-ops", route: "/support" },
                ],
            },
            {
                label: "Resources",
                labelKo: "자료",
                id: "m-resources",
                route: "/documentation",
                colBreak: true,
                children: [
                    { label: "Documentation", id: "m-docs", route: "/documentation" },
                    { label: "Release Notes", id: "m-releases", route: "/releases" },
                ],
            },
            {
                label: "Try · Contact",
                labelKo: "체험·문의",
                id: "m-try",
                route: "/xgen-trial",
                colBreak: true,
                children: [
                    { label: "XGEN Trial (15 days)", labelKo: "XGEN 체험 신청 (15일)", id: "m-trial", route: "/xgen-trial" },
                    { label: "X2BEE AI", id: "m-x2bee", external: "https://ai-exp.x2bee.com" },
                    { label: "PoC · Tech consulting", labelKo: "PoC · 기술 상담", id: "m-contact", route: "/contact?type=poc&from=nav" },
                ],
            },
        ],
    },
    {
        // 컴퍼니(About·Members·AI 품질 방침·Plateer·GitHub)는 푸터 Company 열로 옮겼다(2026-11).
        key: "menu-news",
        order: 5,
        label: "News · Insight",
        labelKo: "소식·인사이트",
        concept: "about",
        blurb: "블로그·뉴스레터·이벤트",
        route: "/blog",
        wide: true,
        feature: { title: "Blog", titleKo: "블로그", text: "Product news, field reports, insights and tech notes.", textKo: "제품 소식·현장 리포트·인사이트·테크 노트를 모았습니다.", image: "/intro/blog-office.webp", href: "/blog" },
        align: "right",
        items: [
            {
                label: "Blog",
                labelKo: "블로그",
                id: "m-blog",
                route: "/blog",
                children: [
                    { label: "Product News", labelKo: "제품 소식", id: "m-cat-product", route: "/blog?cat=product" },
                    { label: "Field Report", labelKo: "현장 리포트", id: "m-cat-industry", route: "/blog?cat=industry" },
                    { label: "Insight", labelKo: "인사이트", id: "m-cat-xinsight", route: "/blog?cat=xinsight" },
                    { label: "Tech Note", labelKo: "테크 노트", id: "m-cat-labs", route: "/blog?cat=labs" },
                ],
            },
            {
                label: "Updates & Events",
                labelKo: "소식·행사",
                id: "m-news",
                route: "/updates",
                colBreak: true,
                children: [
                    { label: "News", labelKo: "뉴스", id: "m-cat-news", route: "/blog?cat=news" },
                    { label: "Newsletter", labelKo: "뉴스레터", id: "m-newsletter", route: "/newsletter" },
                    { label: "Events", labelKo: "이벤트", id: "m-events", route: "/events" },
                ],
            },
        ],
    },
];

// GNB 최상위 노출 순서를 서사(연구→오픈소스→제품→실증)에 맞춰 정렬한다.
// order 미지정 그룹(hidden 등)은 뒤로 밀린다. 안정 정렬이라 동순위는 정의 순서 유지.
function visibleItems(items: NavLeaf[]): NavLeaf[] {
    return items.filter((item) => !["code-assistant", "ai-code-assistant"].includes(item.id)).map((item) => ({ ...item, children: item.children ? visibleItems(item.children) : undefined }));
}
export const NAV_GROUPS: NavGroup[] = ALL_NAV_GROUPS.map((group) => ({ ...group, items: visibleItems(group.items) }));

NAV_GROUPS.sort((a, b) => (a.order ?? 90) - (b.order ?? 90));

/** Lookup a group by its url key. */
export function getGroup(key: string): NavGroup | undefined {
    return NAV_GROUPS.find((g) => g.key === key);
}

/** Primary call-to-action — opens the XGEN demo-request one-page (/demo). */
export const DEMO_CTA = {
    ko: "PoC · 기술 상담",
    en: "PoC · Tech consulting",
    href: "/contact?type=poc&from=nav",
};

/** Footer "About" column — its own one-page at /about. */
export const ABOUT_GROUP: NavGroup = {
    key: "about",
    label: "About",
    concept: "about",
    blurb: "Plateer AI Labs를 만드는 미션과 사람들.",
        blurbEn: "The mission and the people behind Plateer AI Labs.",
    items: [
        // 열 제목이 Company 라 항목은 본사 이름으로 부른다 — 같은 이름이 겹치면
        // 제목인지 링크인지 구분이 안 된다.
        { label: "Plateer", id: "company", external: "https://www.plateer.com/" },
        {
            label: "GitHub",
            labelKo: "깃허브 바로가기",
            id: "github",
            external: "https://github.com/PlateerLab",
        },
    ],
};
