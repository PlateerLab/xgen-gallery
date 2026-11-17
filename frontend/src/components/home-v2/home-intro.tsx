import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { HeroSlider } from "@/components/home-v2/hero-slider";
import { RedTeamVisual } from "@/components/home-v2/redteam-visual";
import { CommerceVisual } from "@/components/home-v2/commerce-visual";
import { PolarVisual } from "@/components/home-v2/polar-visual";
import { OntlasVisual } from "@/components/home-v2/ontlas-visual";
import { EnterpriseVisual } from "@/components/home-v2/enterprise-visual";
import { IntroStickyNav } from "@/components/home-v2/intro-sticky-nav";
import { PlateerCustomerBand } from "@/components/home-v2/plateer-customer-band";
import { ProvenPerformance } from "@/components/home-v2/proven-performance";
import { XgenPlatformShowcase } from "@/components/home-v2/xgen-platform-showcase";
import { InlinePromoBand } from "@/components/product-xgen/inline-promo-band";
import { NewsTabs, type NewsItem } from "@/components/home-v2/news-tabs";
import { Rise, Num, ChallengeExplorer, IndustryPanels, StepTrack } from "@/components/home-v2/journey-motion";
import { PRODUCT_PROFILES } from "@/lib/product-profiles";
import { XGEN_GS_CERTIFICATION } from "@/lib/certifications";
import { INDUSTRIES, CASE_STATUS_EN, type CaseStudy, type IndustryKey } from "@/lib/customers";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인(인트로) — B2B 구매 여정 순서로 각 서브 페이지의 내용을 모아 보여 주는 허브.
 *
 *  인지     회사 전체 메시지 + 근거 지표 + 1,086개사 로고 띠
 *  01 과제   과제별 진입 카드 4장 → 솔루션·제품
 *  02 제품   포트폴리오(XGEN·X2BEE·XGEN TMS·Polar·Ontlas) 같은 크기 카드 + XGEN 핵심 기능 칩
 *  03 적용   산업별 카드 4장 + 업무별 바로가기 3개 → /solutions, /customers/<산업>
 *  04 검증   고객 사례 3건 + 인증·보안 재검증·실증 데모·기술
 *  05 도입   체험·온프레미스·폐쇄망 + PoC·컨설팅·교육·운영 지원
 *  06 소식   카테고리 탭(제품 소식·뉴스·고객 사례·현장 리포트·인사이트·테크 노트)
 *  행동     마지막 CTA(도입 상담·체험), 각주
 *
 * 이전(Teams식) 구성은 /home/kang/.xgen/bak-journey/home-intro.before-journey.tsx 에 백업.
 * 문구는 기존 제품·보안·고객사례·릴리스 데이터에 있는 사실만 쓰고, 조건·한계는 각주로 밝힌다.
 */

const P = PRODUCT_PROFILES.xgen;
const PAD = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";
const BTN_PRIMARY =
    "inline-flex h-11 items-center justify-center rounded-[4px] bg-[#185aea] px-6 text-[15px] font-semibold text-white transition hover:bg-[#1249c2]";
const BTN_SECONDARY =
    "inline-flex h-11 items-center justify-center rounded-[4px] border border-[var(--color-ink)] bg-white px-6 text-[15px] font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-hover)]";
const BTN_SECONDARY_DARK =
    "inline-flex h-11 items-center justify-center rounded-[4px] border border-white/40 bg-transparent px-6 text-[15px] font-semibold text-white transition hover:bg-white/10";
const LINK = "group inline-flex items-center gap-1 text-[15px] font-semibold text-[#185aea] hover:underline";
const SCROLL = "scroll-mt-[calc(var(--nav-h,80px)+80px)]";

type L = Record<Locale, string>;
const l = (ko: string, en: string): L => ({ ko, en });

const FOOTNOTES: L[] = [
    l(
        "Geny는 정식 활성화되어 운영 환경에서 제공됩니다. 제공 범위는 환경과 구성에 따라 달라질 수 있습니다.",
        "Geny is generally available in production. Scope depends on environment and configuration.",
    ),
    l(
        "격리 수준과 권한 범위는 배포 환경과 구성에 따라 달라질 수 있습니다.",
        "Isolation level and permission scope depend on the deployment environment and configuration.",
    ),
    l(
        "2026년 11월 초 격리 환경 재점검 결과입니다. 점검 시점의 개발 버전과 점검 범위에 한정되며, 실제 운영 환경의 보안 수준은 구성과 운영 정책에 따라 달라질 수 있습니다.",
        "Results of the early-November 2026 re-test in an isolated environment. They apply to the development build and scope at that time; production security depends on configuration and operating policy.",
    ),
    l(
        "세부 구성은 고객사 인프라와 보안 정책에 따라 협의합니다. 기기별 실행 기능과 권한은 다를 수 있습니다.",
        "Detailed configuration is agreed based on your infrastructure and security policy. Capabilities and permissions vary by device.",
    ),
];

/** 사례 카드 상단 사진 — xgen.im 사례 사진을 산업별로 쓴다(사례마다 전용 사진이 있으면 slug 로 덮어쓴다). */
const CASE_PHOTO_BY_SLUG: Record<string, string> = {
    "public-procurement-search": "/intro/public.webp",
    // 같은 금융 산업 사례(제주은행)와 사진이 겹치지 않게 I사는 별도 사진을 쓴다.
    "financial-ai-platform-in-progress": "/intro/case-capital-adobe.webp",
    // 메인 「검증」 사례 카드 — 어두운 스톡 그래픽 대신 밝은 실사(CC0, Wikimedia Commons)
    "jeju-bank-genai-platform": "/intro/case-bank-building.webp",
    "semiconductor-code-assistant": "/intro/case-semiconductor-fab.webp",
};
const CASE_PHOTO_BY_INDUSTRY: Record<IndustryKey, string> = {
    commerce: "/intro/commerce.webp",
    finance: "/intro/capital-finance.webp",
    public: "/intro/public.webp",
    "it-services": "/intro/semiconductor.webp",
};

/**
 * 소식 탭 「고객 사례」 카드 사진 — 메인 「검증」 섹션 사례 카드와 같은 사례가 나오므로,
 * 한 페이지에서 사진이 겹치지 않게 별도 사진을 쓴다(CC0 실사 포함).
 */
const NEWS_CASE_PHOTO_BY_SLUG: Record<string, string> = {
    "financial-ai-platform-in-progress": "/intro/news-case-capital-adobe.webp",
    "jeju-bank-genai-platform": "/intro/company-bright.webp",
};
const NEWS_CASE_PHOTO_BY_INDUSTRY: Record<IndustryKey, string> = {
    commerce: "/intro/news-case-commerce.webp",
    finance: "/intro/news-case-finance.webp",
    public: "/solutions/public.webp",
    "it-services": "/intro/news-case-it.webp",
};
export function newsCasePhoto(c: { slug: string; industry: IndustryKey }): string {
    return NEWS_CASE_PHOTO_BY_SLUG[c.slug] ?? NEWS_CASE_PHOTO_BY_INDUSTRY[c.industry];
}

/** 사례 카드 사진 — 메인 「검증」 섹션 사례 카드. */
export function casePhoto(c: { slug: string; industry: IndustryKey }): string {
    return CASE_PHOTO_BY_SLUG[c.slug] ?? CASE_PHOTO_BY_INDUSTRY[c.industry];
}

function Fn({ n }: { n: number }) {
    return (
        <sup className="ml-0.5">
            <a href={`#fn-${n}`} className="text-[#185aea] hover:underline">
                {n}
            </a>
        </sup>
    );
}

/** 링크 카드 안에서 쓰는 각주 번호 — 중첩 <a> 를 피하려고 링크 없이 숫자만 표시한다. */
function FnMark({ n }: { n: number }) {
    return <sup className="ml-0.5 text-[#5fd0ff]">{n}</sup>;
}

function Arrow() {
    return <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />;
}

function SectionHead({ title, lead }: { title: string; lead?: string }) {
    return (
        <div className="max-w-3xl">
            <h2 className="text-[30px] font-semibold leading-tight tracking-tight text-[var(--color-ink)] md:text-[40px]">{title}</h2>
            {lead && <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">{lead}</p>}
        </div>
    );
}

function SmartLink({ href, external, className, children }: { href: string; external?: boolean; className: string; children: React.ReactNode }) {
    return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
        </a>
    ) : (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}

/** href가 비어 있으면 링크 없이 그린다(준비 중 제품 카드) */
function MaybeLink({ href, external, className, children }: { href: string; external?: boolean; className: string; children: React.ReactNode }) {
    if (!href) return <div className={className}>{children}</div>;
    return (
        <SmartLink href={href} external={external} className={className}>
            {children}
        </SmartLink>
    );
}

/** 히어로 슬라이드의 강점 칩 3개 — 다크 스킨 글래스 칩 */
function KeyPoints({ items }: { items: string[] }) {
    return (
        <ul className="kp-row -mx-1 mt-6 hidden gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((t) => (
                <li key={t} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1.5 text-[12.5px] font-medium text-white/85 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#5fd0ff]" />
                    {t}
                </li>
            ))}
        </ul>
    );
}

function Eyebrow({ step, label }: { step: string; label: string }) {
    return (
        <p className="mb-4 flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#185aea]">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#185aea]/10 px-2 text-[12px]">{step}</span>
            {label}
        </p>
    );
}

type Card = { title: string; desc: string; href: string; cta: string; external?: boolean };

export function HomeIntro({ locale, cases, hero, feed = [] }: { locale: Locale; cases: CaseStudy[]; hero?: React.ReactNode; feed?: NewsItem[] }) {
    const ko = locale === "ko";
    const h = (p: string) => localeHref(locale, p);
    const more = ko ? "자세히 알아보기" : "Learn more";
    const trial = ko ? "XGEN 무료로 체험하기" : "Try XGEN free";
    const contact = ko ? "도입 상담" : "Talk to us";
    const libCount = TOOLS.length;

    // 섹션 순서 = B2B 구매 여정(문제 정의 → 탐색 → 적용 범위 → 검증 → 도입 → 관계 유지)
    const sections = [
        { id: "challenges", label: ko ? "과제별 찾기" : "By challenge" },
        { id: "products", label: ko ? "제품" : "Products" },
        { id: "solutions", label: ko ? "산업별 솔루션" : "Solutions" },
        { id: "proof", label: ko ? "검증" : "Proof" },
        { id: "adopt", label: ko ? "도입" : "Adoption" },
        { id: "news", label: ko ? "소식" : "News" },
    ];

    const proof = [
        { value: ko ? "1,086개사" : "1,086", label: ko ? "플래티어와 함께하는 고객사" : "Companies working with Plateer", sub: ko ? "플래티어 전체 고객 기준" : "Across Plateer" },
        { value: ko ? "GS 1등급" : "GS Grade 1", label: ko ? "국가 공인 품질인증 (XGEN)" : "Certified quality (XGEN)", sub: `${ko ? "인증번호" : "No."} ${XGEN_GS_CERTIFICATION.no}` },
        { value: "On-prem", label: ko ? "온프레미스·망분리 구성" : "On-prem & air-gapped", sub: ko ? "고객사 인프라 안에서 운영" : "Runs in your infrastructure" },
        { value: `${libCount}`, label: ko ? "공개 라이브러리" : "Public libraries", sub: ko ? "라이선스는 라이브러리별 상이" : "Licenses vary by library" },
    ];

    // 01 · 문제 정의 — 방문자의 과제에서 출발해 제품·솔루션으로 보낸다
    const challenges: (Card & { tags: string[]; img: string })[] = [
        {
            img: "/intro/automation.webp",
            title: ko ? "반복 업무를 에이전트로 자동화" : "Automate recurring work with agents",
            desc: ko ? "사내 시스템을 도구로 연결해, 조회·정리·보고 같은 반복 업무를 에이전트가 처리하게 합니다." : "Connect internal systems as tools so agents handle recurring lookups, summaries, and reports.",
            tags: ["XGEN", "EasyMode"],
            href: h("/solutions#automation"),
            cta: ko ? "업무 자동화 사례" : "Automation use cases",
        },
        {
            img: "/intro/commerce-online.webp",
            title: ko ? "커머스 검색·추천·상담 고도화" : "Better commerce search, recommendation, and support",
            desc: ko ? "상품 검색, 상품평 요약, 고객 문의 응대에 커머스 도메인 모델과 에이전트를 적용합니다." : "Apply commerce-tuned models and agents to product search, review summaries, and customer inquiries.",
            tags: ["X2BEE", "Polar"],
            href: h("/customers/commerce"),
            cta: ko ? "커머스 사례" : "Commerce cases",
        },
        {
            img: "/intro/knowledge-adobe.webp",
            title: ko ? "사내 문서·DB를 근거로 답변" : "Answers grounded in company documents and data",
            desc: ko ? "문서와 DB를 검색·RAG·온톨로지로 연결해, 사내 근거를 함께 제시하는 답변을 만듭니다." : "Connect documents and databases through search, RAG, and ontology so answers cite company sources.",
            tags: ["XGEN", "Ontlas"],
            href: h("/solutions#knowledge"),
            cta: ko ? "지식 검색 사례" : "Knowledge search cases",
        },
        {
            img: "/intro/security-adobe.webp",
            title: ko ? "보안·규제 환경에서의 AI 통제" : "AI governance under security and regulation",
            desc: ko ? "결재선 지정, AI 위험도 심사, 감사 로그, 온프레미스 구성으로 실행 범위를 관리합니다." : "Manage execution with approval routes, AI risk review, audit logs, and on-prem deployment.",
            tags: [ko ? "보안·거버넌스" : "Security & governance", "On-prem"],
            href: h("/security-and-governance"),
            cta: ko ? "보안·거버넌스 보기" : "Security & governance",
        },
    ];

    // 02 · 탐색 — 제품 포트폴리오(같은 크기 카드)
    const products: (Card & { img: string; category: string; points: string[]; badge?: string })[] = [
        {
            img: "/intro/xgen-adobe.webp",
            title: "XGEN",
            category: ko ? "기업형 에이전틱 AI 플랫폼" : "Enterprise agentic AI platform",
            desc: ko ? "AI Agent의 제작·연결·운영을 하나의 플랫폼에서. 사내 시스템과 연결해 결재와 감사 아래에서 운영합니다." : "Build, connect and run AI agents on one platform, linked to internal systems and run under approval and audit.",
            points: ko ? ["바이브코딩·EasyMode·캔버스 제작", "사내 시스템·API 연결", "결재선·위험도 심사·감사 로그"] : ["Vibe coding, EasyMode, canvas", "Internal systems and APIs", "Approval routes, risk review, audit logs"],
            href: h("/product/xgen"),
            cta: ko ? "XGEN 살펴보기" : "Explore XGEN",
        },
        {
            img: "/intro/x2bee-adobe.webp",
            title: "X2BEE",
            category: ko ? "에이전틱 커머스 플랫폼" : "Agentic commerce platform",
            desc: ko ? "플래티어의 커머스 플랫폼입니다. 상세 내용은 X2BEE 사이트에서 확인합니다." : "Plateer's commerce platform. Details are on the X2BEE site.",
            points: ko ? ["커머스 운영 플랫폼", "커머스 AI 기능 체험 사이트 제공", "X2BEE 전용 사이트에서 안내"] : ["Commerce operations platform", "AI experience site available", "Details on the X2BEE site"],
            href: "https://www.x2bee.com/",
            cta: ko ? "X2BEE 사이트" : "X2BEE site",
            external: true,
        },
        {
            img: "/intro/xgen-tms-adobe.webp",
            title: "XGEN TMS",
            category: ko ? "AI 기반 통합 테스트 관리 플랫폼" : "AI-based integrated test management platform",
            desc: ko ? "요구사항부터 테스트·결함까지 QA 과정을 한곳에서 관리합니다." : "Manages QA from requirements to tests and defects in one place.",
            points: [],
            href: "https://idt.plateer.com/devops/xgen_tms",
            cta: ko ? "XGEN TMS 사이트" : "XGEN TMS site",
            external: true,
        },
        {
            img: "/intro/polar.webp",
            title: "Polar",
            category: ko ? "커머스 특화 Private sLLM" : "Private sLLM for commerce",
            desc: ko ? "커머스 도메인 데이터로 학습한 sLLM을 고객사 환경에 배치해 검색·요약·응대에 씁니다." : "A commerce-tuned sLLM deployed in your environment for search, summarization, and support.",
            points: ko ? ["시맨틱 검색·상품평 요약", "RAG·Fine-Tuning 구성", "온프레미스 운영"] : ["Semantic search, review summaries", "RAG and fine-tuning", "On-prem operation"],
            href: h("/product/polar"),
            cta: ko ? "Polar 살펴보기" : "Explore Polar",
        },
        {
            img: "/intro/ontology-graph.webp",
            title: "Ontlas",
            category: ko ? "의미 계층 온톨로지 솔루션" : "Semantic-layer ontology solution",
            desc: ko
                ? "제조, 커머스 등 다양한 도메인별 업무 개념과 관계를 정의하는 온톨로지 솔루션입니다."
                : "An ontology solution that defines business concepts and relationships for domains such as manufacturing and commerce.",
            points: [],
            href: "",
            cta: "",
            badge: ko ? "제품 페이지 준비 중" : "Product page coming",
        },
    ];

    const xgenFeatures = [
        { label: "Vibe Coding in DexOn", href: h("/vibe-coding") },
        { label: "DexOn", href: h("/xgen-dex") },
        { label: "EasyMode", href: h("/easy-mode") },
        { label: "Geny", href: h("/product/xgen#geny") },
    ];

    // 03 · 산업·업무별 적용
    const industries = (["finance", "commerce", "public", "it-services"] as IndustryKey[]).map((k) => ({
        key: k,
        name: INDUSTRIES[k][ko ? "ko" : "en"],
        desc: ko ? INDUSTRIES[k].blurb : INDUSTRIES[k].blurbEn,
        img: CASE_PHOTO_BY_INDUSTRY[k],
        href: h(`/customers/${k}`),
    }));
    const useCases: Card[] = [
        { title: ko ? "지식 검색" : "Knowledge search", desc: ko ? "사내 규정·문서 RAG 챗봇" : "RAG chatbots over internal documents", href: h("/solutions#knowledge"), cta: more },
        { title: ko ? "업무 자동화" : "Workflow automation", desc: ko ? "업무 시스템 연동 Actionable AI" : "Actionable AI on business systems", href: h("/solutions#automation"), cta: more },
        { title: ko ? "통합형 멀티 에이전트" : "Multi-agent", desc: ko ? "검색·상담·코드 통합" : "Search, support, and code together", href: h("/solutions#multi-agent"), cta: more },
    ];

    // 04 · 검증 — 신뢰 근거
    const trust: (Card & { fn?: number; value: string })[] = [
        { value: ko ? "GS 1등급" : "GS Grade 1", title: ko ? "제3자 품질 인증" : "Third-party certification", desc: ko ? `XGEN · 인증번호 ${XGEN_GS_CERTIFICATION.no}` : `XGEN · No. ${XGEN_GS_CERTIFICATION.no}`, href: h("/product/xgen#certification"), cta: ko ? "인증 내용" : "Details" },
        { value: ko ? "보안 재검증" : "Re-test", title: ko ? "공격자 시선의 침투 테스트" : "Attacker-view pentesting", desc: ko ? "격리 환경에서 권한 통제를 다시 확인" : "Access controls re-checked in isolation", href: h("/security-and-governance#attacker-view"), cta: ko ? "검증 결과" : "Results", fn: 3 },
        { value: ko ? "실증 데모" : "Demos", title: ko ? "실제 화면으로 보는 업무 흐름" : "Workflows on real screens", desc: ko ? "제품 시연과 업무 시나리오 영상" : "Product walkthroughs and scenario videos", href: h("/proof-in-action"), cta: ko ? "영상 보기" : "Watch" },
        { value: `${libCount}`, title: ko ? "연구·공개 라이브러리" : "Research & libraries", desc: ko ? "아키텍처·연구 과제와 공개 라이브러리" : "Architecture, research, and public libraries", href: h("/technology"), cta: ko ? "테크놀로지" : "Technology" },
    ];

    // 05 · 도입 — 방식과 지원
    const deploy = [
        { title: ko ? "15일 클라우드 체험" : "15-day cloud trial", desc: ko ? "설치 없이 브라우저에서 XGEN을 써 봅니다." : "Use XGEN in your browser, nothing to install.", rows: ko ? ["신청 후 계정을 받아 시작", "기능 검토와 PoC 사전 확인용"] : ["Start once your account is issued", "For feature review before a PoC"], href: h("/xgen-trial"), cta: ko ? "체험 신청" : "Start the trial" },
        { title: ko ? "온프레미스" : "On-premise", desc: P.deploy.rows[0].onprem[locale], rows: P.deploy.rows.slice(1, 3).map((r) => `${r.label[locale]} · ${r.onprem[locale]}`), href: h("/contact"), cta: contact },
        { title: ko ? "폐쇄망" : "Air-gapped", desc: P.deploy.rows[0].airgap[locale], rows: P.deploy.rows.slice(1, 3).map((r) => `${r.label[locale]} · ${r.airgap[locale]}`), href: h("/contact"), cta: contact },
    ];
    const support: Card[] = [
        { title: ko ? "PoC 프로젝트" : "PoC projects", desc: ko ? "범위와 평가 기준을 정해 검증합니다." : "Validate with agreed scope and criteria.", href: h("/poc-projects"), cta: more },
        { title: ko ? "기술 컨설팅" : "Technical consulting", desc: ko ? "과제 선정과 아키텍처 설계를 돕습니다." : "Use-case selection and architecture.", href: h("/technical-consulting"), cta: more },
        { title: ko ? "교육 지원" : "Enablement", desc: ko ? "현업·개발자 대상 사용 교육을 진행합니다." : "Training for business users and developers.", href: h("/enablement"), cta: more },
        { title: ko ? "운영·기술지원" : "Operations support", desc: ko ? "도입 후 운영과 업데이트를 지원합니다." : "Support for operations and updates.", href: h("/support"), cta: more },
    ];

    const news = [
        {
            img: "/product/screen-approval.png",
            fit: "cover",
            eyebrow: ko ? "릴리스 노트 · 2026.10.31" : "Release notes · 2026.10.31",
            title: ko ? "XGEN v2.7.0 — [결재] 통합과 Agent 고정 배포" : "XGEN v2.7.0 — unified approvals and pinned agent deployment",
            desc: ko
                ? "9월 30일 운영 반영분과 10월 stage 승격분을 정리했습니다. 항목마다 반영 단계를 함께 적었습니다."
                : "Covers what reached production on Sep 30 and stage in October, with the stage noted for each item.",
            href: "/releases",
            cta: ko ? "릴리스 노트 보기" : "Read the release notes",
            fn: 0,
            date: "2026-10-31",
        },
        {
            img: "/xgen-gs-box2.png",
            fit: "contain",
            eyebrow: ko ? `품질 인증 · ${XGEN_GS_CERTIFICATION.date}` : `Certification · ${XGEN_GS_CERTIFICATION.date}`,
            title: ko ? "GS 인증 1등급 획득" : "GS certification, Grade 1",
            desc: ko
                ? `공인 시험기관의 제3자 시험을 거쳤습니다. 인증번호 ${XGEN_GS_CERTIFICATION.no}.`
                : `Tested by an accredited third-party lab. Certificate No. ${XGEN_GS_CERTIFICATION.no}.`,
            href: "/product/xgen#certification",
            cta: ko ? "인증 내용 보기" : "See the certification",
            fn: 0,
            date: XGEN_GS_CERTIFICATION.date.replace(/\./g, "-"),
        },
        {
            img: "/hero-security-shield.jpg",
            fit: "cover",
            eyebrow: ko ? "보안 재검증 · 2026.11" : "Security re-test · 2026.11",
            title: ko ? "공격자의 시선으로 권한 통제를 다시 확인했습니다" : "Access controls re-checked through an attacker's eyes",
            desc: ko
                ? "격리 환경의 자율 침투 테스트에서 기존 고위험 항목은 재발하지 않았습니다."
                : "In autonomous pentesting in an isolated environment, previous high-risk items did not recur.",
            href: "/security-and-governance#attacker-view",
            cta: ko ? "검증 내용 보기" : "See the results",
            fn: 3,
            date: "2026-11-01",
        },
    ].sort((a, b) => b.date.localeCompare(a.date)); // 최신순: 새 소식은 날짜만 넣으면 자동 정렬

    // 「XGEN 업데이트」(릴리스·인증·보안) + 예전 메인 뉴스 띠의 카테고리(블로그·고객사례·뉴스레터)
    const newsItems: NewsItem[] = [
        ...news.map((n) => ({ ...n, cat: "product" as const, product: "XGEN", fit: n.fit as "cover" | "contain", href: h(n.href) })),
        ...feed,
    ];

    return (
        <>
            {/* 인지 — 회사 전체 메시지 */}
            {hero}
            <section data-nav-theme="dark" className={`relative isolate overflow-hidden bg-black text-white lg:flex lg:min-h-[clamp(760px,100svh,980px)] lg:flex-col ${hero ? "" : "pt-[calc(var(--nav-h,80px)+40px)]"}`}>
                {/* /product/xgen 히어로와 같은 다크 톤 — 검정 바탕 + 아래쪽 파티클 띠 + 은은한 빛 */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(48%_54%_at_8%_32%,rgba(24,90,234,0.34),transparent_72%),radial-gradient(36%_42%_at_92%_45%,rgba(0,172,238,0.12),transparent_70%)]" />
                <div aria-hidden className="intro-arc-bg pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[320px] lg:h-[46%] [mask-image:linear-gradient(to_bottom,transparent,black_40%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[300px] bg-gradient-to-b from-transparent via-black/40 to-black lg:h-[38%]" />
                {!hero && (
                    <HeroSlider
                        ariaLabel={ko ? "메인 키 비주얼" : "Main key visual"}
                        labels={ko ? ["XGEN 에이전틱 AI 플랫폼", "XGEN 금융권 AI 보안", "XGEN for Commerce", "Ontlas 온톨로지 솔루션", "Polar 커머스 sLLM"] : ["XGEN agentic AI platform", "XGEN AI security for finance", "XGEN for Commerce", "Ontlas ontology solution", "Polar commerce sLLM"]}
                        durations={[5000, 5000, 5000, 6000, 5000]}
                        slides={[
                    <div key="enterprise" className={`${PAD} grid items-center gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14`}>
                        <div>
                            <p className="text-[15px] font-semibold text-white">
                                XGEN <span className="font-normal text-white/65">· {ko ? "기업형 Agentic AI 플랫폼" : "Enterprise agentic AI platform"}</span>
                            </p>
                            <h1 className="mt-5 text-[34px] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[52px]">
                                {ko ? "강력한 거버넌스 위에서," : "On strong governance,"}
                                <br className="hidden sm:block" /> {ko ? "스스로 진화하는" : "a self-evolving"}
                                <br className="hidden sm:block" /> {ko ? "Agentic AI Platform" : "Agentic AI Platform"}
                            </h1>
                            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/65">
                                {ko
                                    ? "XGEN은 기업의 보안과 통제 체계를 유지하면서, 다양한 LLM 기반의 AI Agent가 사내 시스템과 사용자 업무 환경을 연결해 자율적으로 업무를 수행하고, 실행 결과를 바탕으로 지속적으로 개선되도록 지원하는 플랫폼입니다."
                                    : "XGEN keeps your security and control framework in place while AI agents built on a range of LLMs connect internal systems and user work environments, carry out work autonomously, and keep improving based on their results."}
                            </p>
                            <KeyPoints
                                items={
                                    ko
                                        ? ["Claude·GPT·사내 sLLM 선택", "권한·결재·감사 로그 통제", "사내 시스템·MCP 도구 연결"]
                                        : ["Claude, GPT, or in-house sLLM", "Access, approval & audit controls", "Systems & MCP tools connected"]
                                }
                            />
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a href="#products" className={BTN_PRIMARY}>
                                    {ko ? "제품 살펴보기" : "Explore products"}
                                </a>
                                <Link href={h("/contact")} className={BTN_SECONDARY_DARK}>
                                    {contact}
                                </Link>
                            </div>
                            
                        </div>
                        <EnterpriseVisual locale={locale} overlayImg={P.hero.main.img} overlayAlt={P.hero.main.alt[locale]} />
                    </div>,
                    <div key="redteam" className={`${PAD} grid items-center gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14`}>
                        <div>
                            <p className="text-[15px] font-semibold text-white">
                                XGEN <span className="mx-1 font-normal text-white/65">|</span> AI Red Teaming <span className="font-normal text-white/65">· {ko ? "금융권 AI 보안 점검 대응" : "AI security testing for finance"}</span>
                            </p>
                            <h2 className="mt-5 text-[34px] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[52px]">
                                {ko ? "금융권 AI 보안" : "AI security for finance"}
                                <br className="hidden sm:block" /> {ko ? "공격 검증부터" : "from attack testing"}
<br className="hidden sm:block" /> {ko ? "실행 통제까지, XGEN" : "to execution control: XGEN"}
                            </h2>
                            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/65">
                                {ko
                                    ? "프롬프트 인젝션, 탈옥, 개인정보 유출 유도, 권한 우회 등 주요 공격 시나리오를 점검합니다. 가드 모델과 개인정보 마스킹, 금칙어 필터, 접근 권한 통제를 적용하고, 탐지·차단 이력을 감사 로그로 관리해 보안 점검과 감사 대응을 지원합니다."
                                    : "Test key attack scenarios such as prompt injection, jailbreaks, PII extraction, and privilege bypass. XGEN applies a guard model, PII masking, keyword filters, and access control, and keeps detection and blocking history in the audit log to support security reviews and audits."}
                            </p>
                            <KeyPoints items={ko ? ["가드 모델·개인정보 마스킹", "접근 권한·결재선 통제", "탐지·차단 이력 감사 로그"] : ["Guard model & PII masking", "Access control & approvals", "Audit log of detections"]} />
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link href={h("/security-and-governance")} className={BTN_PRIMARY}>
                                    {ko ? "보안·거버넌스 보기" : "Security & governance"}
                                </Link>
                                <Link href={h("/contact")} className={BTN_SECONDARY_DARK}>
                                    {contact}
                                </Link>
                            </div>
                            <p className="mt-4 text-[13.5px] text-white/65">
                                {ko
                                    ? "특정 기관의 인증·승인을 뜻하지 않으며, 대응 범위는 고객 환경과 구성에 따라 달라집니다."
                                    : "This does not imply certification or approval by any authority; coverage depends on your environment and configuration."}
                            </p>
                        </div>
                        <RedTeamVisual locale={locale} />
                    </div>,
                    <div key="xgen-commerce" className={`${PAD} grid items-center gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14`}>
                        <div>
                            <p className="text-[15px] font-semibold text-white">
                                XGEN <span className="font-normal text-white/65">for Commerce · Agentic Commerce</span>
                            </p>
                            <h2 className="mt-5 text-[34px] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[52px]">
                                {ko ? "AI가 쇼핑하고," : "AI that shops,"}
                                <br className="hidden sm:block" /> {ko ? "AI가 운영하는" : "AI that runs"}
<br className="hidden sm:block" /> {ko ? "커머스" : "your commerce"}
                            </h2>
                            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/65">
                                {ko
                                    ? "플래티어의 커머스 구축 경험을 바탕으로 상품 검색·추천·상담·상품 등록 업무에 맞춘 에이전트를 기존 커머스 시스템에 API로 연결합니다. 에이전트가 초안을 만들고 담당자가 확정합니다."
                                    : "Drawing on Plateer's commerce delivery experience, XGEN connects agents for product search, recommendations, customer service, and product listing to your existing commerce systems through APIs. Agents draft; staff confirm."}
                            </p>
                            <KeyPoints items={ko ? ["검색·추천·상담 에이전트", "기존 화면 유지, API 연결", "에이전트 초안 → 담당자 확정"] : ["Search, recommend & service agents", "Keep your screens, connect via API", "Agents draft, staff confirm"]} />
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a href="https://ai-exp.x2bee.com" target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                                    {ko ? "X2BEE 체험하기 ↗" : "Try X2BEE ↗"}
                                </a>
                                <Link href={h("/customers/commerce")} className={BTN_SECONDARY_DARK}>
                                    {ko ? "커머스 적용 사례" : "Commerce case studies"}
                                </Link>
                            </div>
                            <p className="mt-4 text-[13.5px] text-white/65">
                                {ko ? "적용 범위는 연동하는 커머스 시스템과 구성에 따라 달라집니다." : "Scope depends on the commerce systems you connect and your configuration."}
                            </p>
                        </div>
                        <CommerceVisual locale={locale} />
                    </div>,
                    <div key="ontlas" className={`${PAD} grid items-center gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14`}>
                        <div>
                            <p className="text-[15px] font-semibold text-white">
                                Ontlas <span className="font-normal text-white/65">· {ko ? "의미 기반 온톨로지 솔루션" : "Semantic ontology solution"}</span>
                            </p>
                            <h2 className="mt-5 text-[34px] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[52px]">
                                {ko ? "기업의 데이터를," : "Turning enterprise data"}
                                <br className="hidden sm:block" /> {ko ? "검증된 AI 지식으로" : "into verified AI knowledge:"}
<br className="hidden sm:block" /> Ontlas
                            </h2>
                            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/65">
                                {ko
                                    ? "Ontlas는 기업 문서와 DB에서 업무 개념과 관계를 추출하고, 일관된 기준으로 지식을 구조화하는 도메인 온톨로지 솔루션입니다. 지식의 출처를 추적하고 품질을 검증하여, AI Agent가 근거 있는 판단과 업무 수행에 활용할 수 있도록 지원합니다."
                                    : "Ontlas is a domain ontology solution that extracts business concepts and relationships from enterprise documents and databases and structures knowledge on consistent criteria. It traces where knowledge comes from and verifies its quality, so AI agents can use it as grounded evidence for decisions and work."}
                            </p>
                            <KeyPoints items={ko ? ["산업별 도메인 온톨로지", "파일·DB·문서 의미 연결", "Agent 근거·맥락 활용"] : ["Industry domain ontologies", "Files, DBs & docs linked by meaning", "Context and evidence for agents"]} />
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link href={h("/contact")} className={BTN_PRIMARY}>
                                    {ko ? "Ontlas 도입 문의" : "Ask about Ontlas"}
                                </Link>
                                {/* 숨김: 온톨로지 기술 보기 버튼
                                <Link href={h("/technology")} className={BTN_SECONDARY_DARK}>
                                    {ko ? "온톨로지 기술 보기" : "Ontology technology"}
                                </Link>
                                */}
                            </div>
                            <p className="mt-4 text-[13.5px] text-white/65">
                                {ko
                                    ? "적용 범위는 원천 데이터와 구성에 따라 달라집니다."
                                    : "Scope depends on your source data and configuration."}
                            </p>
                        </div>
                        <OntlasVisual locale={locale} />
                    </div>,
                    <div key="polar" className={`${PAD} grid items-center gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14`}>
                        <div>
                            <p className="text-[15px] font-semibold text-white">
                                Polar <span className="font-normal text-white/65">· Private sLLM for Commerce</span>
                            </p>
                            <h2 className="mt-5 text-[34px] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[52px]">
                                {ko ? "커머스 업무에 특화된" : "An enterprise sLLM"}
                                <br className="hidden sm:block" /> {ko ? "기업용 sLLM," : "built for commerce:"}
<br className="hidden sm:block" /> {ko ? "Polar" : "Polar"}
                            </h2>
                            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/65">
                                {ko
                                    ? "Polar는 이커머스 데이터로 학습한 플래티어의 sLLM입니다. 시맨틱 검색, 상품평 요약, 맞춤 추천, 고객 문의 응대에 쓰고, 고객 인프라 안에 배치해 기업 데이터를 외부로 보내지 않는 구성을 지원합니다."
                                    : "Polar is Plateer's sLLM trained on e-commerce data. It serves semantic search, review summaries, recommendations, and customer service, and can be deployed inside your infrastructure so enterprise data stays in-house."}
                            </p>
                            <KeyPoints items={ko ? ["커머스 도메인 학습", "RAG·Fine-Tuning 적용", "고객 인프라 안 배치"] : ["Commerce domain training", "RAG & fine-tuning", "Deployed in your infra"]} />
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link href={h("/product/polar")} className={BTN_PRIMARY}>
                                    {ko ? "Polar 살펴보기" : "Explore Polar"}
                                </Link>
                                <Link href={h("/contact")} className={BTN_SECONDARY_DARK}>
                                    {ko ? "Polar 도입 문의" : "Ask about Polar"}
                                </Link>
                            </div>
                            <p className="mt-4 text-[13.5px] text-white/65">
                                {ko ? "학습 데이터와 성능은 고객 데이터·인프라 구성에 따라 달라집니다." : "Training data and performance depend on your data and infrastructure."}
                            </p>
                        </div>
                        <PolarVisual locale={locale} />
                    </div>,
                        ]}
                    />
                )}
                <div className={`${PAD} pb-12 lg:pb-14 ${hero ? "pt-12" : "pt-8"}`}>
                    <dl className="grid grid-cols-2 gap-y-6 border-t border-white/10 pt-7 md:grid-cols-4">
                        {proof.map((x, i) => (
                            <Rise key={x.label} delay={i * 90} className="border-l border-white/20 pl-5">
                                <dt className="text-[13px] text-white/65">{x.label}</dt>
                                <dd className="mt-1 text-[24px] font-semibold tracking-tight text-white">
                                    {i === 0 ? (
                                        <>
                                            <Num value={1086} />
                                            {ko ? "개사" : ""}
                                        </>
                                    ) : i === 3 ? (
                                        <Num value={libCount} />
                                    ) : (
                                        x.value
                                    )}
                                </dd>
                                <dd className="text-[12.5px] text-white/45">{x.sub}</dd>
                            </Rise>
                        ))}
                    </dl>
                </div>
            </section>

            {/* 인지 단계 신뢰 신호 — 고객 로고를 첫 화면 바로 아래에 */}
            {/* 15일 체험 띠배너 — 솔루션 쇼케이스 시작 지점 */}
            <XgenPlatformShowcase locale={locale} />
            <ProvenPerformance locale={locale} />
            <PlateerCustomerBand locale={locale} />
            <InlinePromoBand locale={locale} />

            <IntroStickyNav items={sections} cta={{ label: contact, href: "/contact" }} />

            {/* 01 · 문제 정의 — 과제 탐색기(목록 ↔ 큰 이미지 전환) */}
            <section id="challenges" className={`${SCROLL} bg-white py-20 md:py-28`}>
                <div className={PAD}>
                    <Rise>
                        <Eyebrow step="01" label={ko ? "과제 정의" : "Define the challenge"} />
                        <SectionHead
                            title={ko ? "우리 회사 AI 도입, 어디서부터 시작할까요?" : "Where should your AI adoption start?"}
                            lead={ko ? "업무 과제를 고르면 맞는 제품과 사례를 보여 드립니다." : "Pick a task to see the matching products and cases."}
                        />
                    </Rise>
                    <Rise delay={120} className="mt-12">
                        <ChallengeExplorer items={challenges} />
                    </Rise>
                </div>
            </section>

            {/* 02 · 제품 탐색 — 벤토 그리드(XGEN 대표 + 나머지 크기 차등) */}
            <section id="products" className={`${SCROLL} bg-[var(--color-surface-alt)] py-20 md:py-28`}>
                <div className={PAD}>
                    <Rise>
                        <Eyebrow step="02" label={ko ? "제품 탐색" : "Explore products"} />
                        <SectionHead
                            title={ko ? "제품 포트폴리오" : "Product portfolio"}
                            lead={ko ? "AI 플랫폼부터 커머스, 도메인 특화 모델, 데이터 활용 환경까지. 기업의 업무와 목적에 맞는 솔루션을 살펴보세요." : "From AI platforms to commerce, domain-specific models, and data environments, explore solutions that fit your business and goals."}
                        />
                    </Rise>
                    <div className="mt-12 grid gap-5 lg:grid-cols-4 lg:grid-rows-[repeat(2,auto)]">
                        {products.map((p, i) => {
                            const lead = i === 0;
                            const wide = false;
                            return (
                                <Rise
                                    key={p.title}
                                    from={lead ? "left" : "up"}
                                    delay={lead ? 0 : 120 + i * 90}
                                    className={lead ? "lg:col-span-2 lg:row-span-2" : wide ? "lg:col-span-2" : ""}
                                >
                                    {lead ? (
                                        <SmartLink href={p.href} external={p.external} className="group relative isolate flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#0b1224] text-white [transform:translateZ(0)]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p.img} alt="" loading="lazy" className="jr-kenburns absolute inset-0 h-full w-full object-cover opacity-80" />
                                            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b1224] via-[#0b1224]/55 to-transparent" />
                                            <div className="relative p-7 md:p-8">
                                                <p className="text-[13px] font-semibold text-[#5fd0ff]">{p.category}</p>
                                                <h3 className="mt-1.5 text-[34px] font-bold tracking-tight md:text-[40px]">{p.title}</h3>
                                                <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-white/80">{p.desc}</p>
                                                <ul className="mt-6 flex flex-wrap gap-2">
                                                    {p.points.map((pt) => (
                                                        <li key={pt} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[13px] font-medium backdrop-blur-sm">
                                                            {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <span className="mt-7 inline-flex items-center gap-1 text-[15px] font-semibold text-white group-hover:underline">
                                                    {p.cta}
                                                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </SmartLink>
                                    ) : (
                                        <MaybeLink
                                            href={p.href}
                                            external={p.external}
                                            className={`group flex h-full overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white transition duration-300 ${p.href ? "hover:-translate-y-1 hover:border-[#185aea] hover:shadow-[0_24px_48px_-28px_rgba(24,90,234,0.55)]" : ""} ${wide ? "flex-col sm:flex-row" : "flex-col"}`}
                                        >
                                            <div className={`relative overflow-hidden ${wide ? "aspect-[16/10] sm:aspect-auto sm:w-[46%]" : "aspect-[2/1] lg:aspect-[16/7]"}`}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                                                {p.badge && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[var(--color-ink)]">{p.badge}</span>}
                                            </div>
                                            <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                                                <p className="truncate text-[12px] font-semibold text-[#185aea]">{p.category}</p>
                                                <h3 className="mt-0.5 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">{p.title}</h3>
                                                <p className="mt-1.5 line-clamp-2 flex-1 text-[13.5px] leading-[1.55] text-[var(--color-ink-muted)]">{p.desc}</p>
                                                {p.href ? (
                                                    <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#185aea] group-hover:underline">
                                                        {p.cta}
                                                        {p.external ? <ArrowUpRight className="h-4 w-4" /> : <Arrow />}
                                                    </span>
                                                ) : p.points.length === 0 ? null : (
                                                    <ul className="mt-3 space-y-1 border-t border-[var(--color-line)] pt-3">
                                                        {p.points.map((pt) => (
                                                            <li key={pt} className="flex gap-2 text-[13.5px] leading-snug text-[var(--color-ink)]">
                                                                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#185aea]" />
                                                                {pt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </MaybeLink>
                                    )}
                                </Rise>
                            );
                        })}
                    </div>
                    <Rise delay={200} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <p className="flex-none text-[13.5px] font-semibold text-[var(--color-ink)]">{ko ? "XGEN 핵심 기능" : "XGEN features"}</p>
                        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                            {xgenFeatures.map((f) => (
                                <li key={f.label} className="flex-none">
                                    <Link href={f.href} className="inline-flex h-8 items-center whitespace-nowrap rounded-full border border-[var(--color-line)] bg-white px-3.5 text-[13px] font-medium text-[var(--color-ink)] transition hover:border-[#185aea] hover:text-[#185aea]">
                                        {f.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Rise>
                </div>
            </section>

            {/* 03 · 적용 범위 — 가로 펼침 산업 패널 + 업무별 바로가기 */}
            <section id="solutions" className={`${SCROLL} bg-white py-20 md:py-28`}>
                <div className={PAD}>
                    <Rise>
                        <Eyebrow step="03" label={ko ? "적용 범위 확인" : "Check the fit"} />
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <SectionHead
                                title={ko ? "금융, 커머스, 공공, IT·제조까지 업무 현장의 AI 과제를 고객과 함께 풀어 왔습니다." : "From finance and commerce to public and IT/manufacturing, we\u2019ve worked through field AI challenges with our customers."}
                                lead={ko ? "같은 산업, 같은 업무의 적용 사례에서 우리 회사에 맞는 범위를 가늠해 보세요." : "Gauge the right scope from deployments in your industry and workflow."}
                            />
                            <Link href={h("/solutions")} className={`${LINK} flex-none`}>
                                {ko ? "산업별 솔루션 개요" : "Solutions overview"}
                                <Arrow />
                            </Link>
                        </div>
                    </Rise>
                    <Rise delay={120} className="mt-12">
                        <IndustryPanels items={industries} cta={ko ? "사례 보기" : "See cases"} />
                    </Rise>
                    <ul className="mt-8 grid border-t border-[var(--color-line)] sm:grid-cols-3">
                        {useCases.map((u, i) => (
                            <li key={u.title} className="border-b border-[var(--color-line)]">
                                <Rise delay={i * 100}>
                                    <Link href={u.href} className="group flex items-center justify-between gap-4 py-5 sm:pr-6">
                                        <span>
                                            <span className="block text-[16px] font-semibold text-[var(--color-ink)] group-hover:text-[#185aea]">{u.title}</span>
                                            <span className="mt-0.5 block text-[13.5px] text-[var(--color-ink-muted)]">{u.desc}</span>
                                        </span>
                                        <ChevronRight className="h-5 w-5 flex-none text-[#185aea] transition group-hover:translate-x-1" />
                                    </Link>
                                </Rise>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 04 · 근거 검증 — 딥네이비 밴드: 고객 사례 + 신뢰 근거 지표 */}
            <section id="proof" data-nav-theme="dark" className={`${SCROLL} relative overflow-hidden bg-[#0b1224] py-20 text-white md:py-28`}>
                <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[#185aea]/25 blur-[120px]" />
                <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#00acee]/15 blur-[120px]" />
                <div className={`${PAD} relative`}>
                    <Rise>
                        <p className="mb-4 flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#5fd0ff]">
                            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white/10 px-2 text-[12px]">04</span>
                            {ko ? "근거 검증" : "Verify"}
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="max-w-3xl">
                                <h2 className="text-[30px] font-semibold leading-tight tracking-tight md:text-[40px]">{ko ? "고객 현장과 제3자 검증으로 확인합니다" : "Verified in customer environments and by third parties"}</h2>
                                <p className="mt-4 text-[17px] leading-relaxed text-white/70">{ko ? "도입 검토에 필요한 사례, 인증, 보안 검증, 시연 자료를 한곳에 모았습니다." : "Cases, certification, security testing, and demos for your review, in one place."}</p>
                            </div>
                            <Link href={h("/customers")} className="group inline-flex flex-none items-center gap-1 text-[15px] font-semibold text-[#5fd0ff] hover:underline">
                                {ko ? "고객 사례 모두 보기" : "See all customer stories"}
                                <Arrow />
                            </Link>
                        </div>
                    </Rise>
                    <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                        {trust.map((t, i) => (
                            <Rise key={t.title} delay={i * 110} className="h-full">
                                <Link href={t.href} className="group relative flex h-full flex-col bg-[#0e1730] p-7 transition hover:bg-[#13204a]">
                                    <span aria-hidden className="jr-sheen absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition duration-500 group-hover:scale-x-100" />
                                    <p className="text-[30px] font-bold tracking-tight text-white">
                                        {i === 3 ? <Num value={libCount} /> : t.value}
                                        {t.fn ? <FnMark n={t.fn} /> : null}
                                    </p>
                                    <h3 className="mt-2 text-[16px] font-semibold text-white">{t.title}</h3>
                                    <p className="mt-1 flex-1 text-[13.5px] leading-relaxed text-white/65">{t.desc}</p>
                                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-[#5fd0ff] group-hover:underline">
                                        {t.cta}
                                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </Rise>
                        ))}
                    </div>
                    {cases.length > 0 && (
                        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible">
                            {cases.map((c, i) => (
                                <Rise key={c.slug} from="scale" delay={150 + i * 120} className="w-[82%] flex-none snap-start sm:w-[60%] md:w-auto">
                                    <Link href={h(`/customers/case/${c.slug}`)} className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white text-[var(--color-ink)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={casePhoto(c)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                                            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/50 to-transparent p-4">
                                                <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-[var(--color-ink)]">{INDUSTRIES[c.industry][ko ? "ko" : "en"]}</span>
                                                <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-[var(--color-ink)]">{ko ? c.status : CASE_STATUS_EN[c.status]}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col p-6">
                                            <p className="text-[13px] font-semibold text-[var(--color-ink-muted)]">{ko ? c.customer : c.customerEn ?? c.customer}</p>
                                            <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight">{ko ? c.title : c.titleEn}</h3>
                                            <p className="mt-3 line-clamp-3 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{ko ? c.summary.replace(/^플래티어는\s+/, "") : c.summaryEn}</p>
                                            <span className={`${LINK} mt-5`}>
                                                {more}
                                                <Arrow />
                                            </span>
                                        </div>
                                    </Link>
                                </Rise>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 05 · 도입 준비 — 구성 방식 카드 + 지원 단계 트랙 */}
            <section id="adopt" className={`${SCROLL} bg-white py-20 md:py-28`}>
                <div className={PAD}>
                    <Rise>
                        <Eyebrow step="05" label={ko ? "도입 준비" : "Plan the rollout"} />
                        <SectionHead
                            title={ko ? "체험부터 구축·운영까지 단계별로 지원합니다" : "Supported from trial to deployment and operation"}
                            lead={ko ? "환경에 맞는 구성 방식을 고르고, PoC와 교육·운영 지원으로 이어갑니다." : "Choose a deployment model, then continue with PoC, enablement, and operations support."}
                        />
                    </Rise>
                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        {deploy.map((d, i) => (
                            <Rise key={d.title} delay={i * 120} className="h-full">
                                <div className={`flex h-full flex-col rounded-[20px] border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(11,18,36,0.45)] ${i === 0 ? "border-[#185aea] bg-[#185aea]/[0.03]" : "border-[var(--color-line)] bg-white"}`}>
                                    <h3 className="text-[20px] font-semibold tracking-tight text-[var(--color-ink)]">{d.title}</h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{d.desc}</p>
                                    <ul className="mt-5 flex-1 space-y-2 border-t border-[var(--color-line)] pt-5">
                                        {d.rows.map((r) => (
                                            <li key={r} className="flex gap-2 text-[13.5px] leading-snug text-[var(--color-ink)]">
                                                <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-[#185aea]" />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={d.href} className={`mt-6 ${i === 0 ? BTN_PRIMARY : BTN_SECONDARY}`}>
                                        {d.cta}
                                    </Link>
                                </div>
                            </Rise>
                        ))}
                    </div>
                    <p className="mt-4 text-[13px] text-[var(--color-ink-muted)]">
                        {P.deploy.note[locale]}
                        <Fn n={4} />
                    </p>
                    <div className="mt-16">
                        <p className="mb-8 text-[13.5px] font-semibold text-[var(--color-ink)]">{ko ? "도입 이후까지 이어지는 지원" : "Support that continues after rollout"}</p>
                        <StepTrack steps={support.map((s) => ({ title: s.title, desc: s.desc, href: s.href }))} />
                    </div>
                </div>
            </section>

            {/* 06 · 관계 유지 — 새로운 소식 */}
            <section id="news" className={`${SCROLL} bg-[var(--color-surface-alt)] py-20 md:py-24`}>
                <div className={PAD}>
                    <Eyebrow step="06" label={ko ? "소식 받기" : "Stay updated"} />
                    <h2 className="text-[28px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[36px]">{ko ? "플래티어 AI의 새로운 소식 살펴보기" : "See what's new at Plateer AI"}</h2>
                    <NewsTabs
                        items={newsItems}
                        allLabel={ko ? "전체" : "All"}
                        labels={{
                            product: ko ? "제품 소식" : "Product news",
                            news: ko ? "뉴스" : "News",
                            case: ko ? "고객 사례" : "Customer stories",
                            field: ko ? "현장 리포트" : "Field reports",
                            insight: ko ? "인사이트" : "Insight",
                            newsletter: ko ? "뉴스레터" : "Newsletter",
                            tech: ko ? "테크 노트" : "Tech notes",
                        }}
                    />
                </div>
            </section>

            {/* 행동 — 마지막 CTA */}
            <section data-nav-theme="dark" className="relative overflow-hidden bg-[#0b1224] py-20 text-white md:py-24">
                <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#185aea]/30 blur-[120px]" />
                <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-[#00acee]/20 blur-[120px]" />
                <div className={`${PAD} relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between`}>
                    <div className="max-w-2xl">
                        <h2 className="text-[30px] font-semibold leading-tight tracking-tight md:text-[40px]">{ko ? "1,086개 고객사가 플래티어와 함께하는 데는 이유가 있습니다." : "There\u2019s a reason 1,086 customers work with Plateer."}</h2>
                        <p className="mt-4 text-[17px] leading-relaxed text-white/75">
                            {ko ? "우리 환경에 맞는 구성과 PoC 범위부터 함께 정해 보세요. (고객사 수는 플래티어 전체 기준)" : "Let\u2019s start by scoping the setup and PoC that fit your environment. (Customer count across Plateer.)"}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href={h("/contact")} className="inline-flex h-12 items-center justify-center rounded-[4px] bg-white px-7 text-[15px] font-semibold text-[#0b1224] transition hover:bg-white/90">
                            {ko ? "도입 상담 신청" : "Contact us"}
                        </Link>
                        <Link href={h("/xgen-trial")} className="inline-flex h-12 items-center justify-center rounded-[4px] border border-white/40 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10">
                            {trial}
                        </Link>
                    </div>
                </div>
            </section>

            {/* 각주 */}
            <section className="bg-white py-12">
                <div className={PAD}>
                    <p className="text-[13px] font-semibold text-[var(--color-ink-muted)]">{ko ? "참고" : "Notes"}</p>
                    <ol className="mt-3 space-y-2">
                        {FOOTNOTES.map((f, i) => (
                            <li key={i} id={`fn-${i + 1}`} className="flex gap-2 text-[12.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                <span className="flex-none">[{i + 1}]</span>
                                {f[locale]}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    );
}
