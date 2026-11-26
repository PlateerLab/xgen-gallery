import Link from "next/link";
import { ChevronRight, FlaskConical, MessagesSquare, FileText, ScrollText } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { AccordionTabs, PlanTabs, type AccordionGroup } from "@/components/product-xgen/accordion-tabs";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";
import { PRODUCT_PROFILES } from "@/lib/product-profiles";
import { XGEN_GS_CERTIFICATION } from "@/lib/certifications";
import { getAllCases, caseLinkEnabled, INDUSTRIES, CASE_STATUS_EN } from "@/lib/customers";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * /product/xgen — Microsoft Teams 제품 상세 페이지(그룹 채팅 소프트웨어) 레이아웃을 XGEN에 맞춘 판.
 *
 *  1 2단 히어로   2 새로운 소식 카드 3장   3 상단 탭 + 아코디언 + 바뀌는 제품 화면
 *  4 도입 방식·도입 지원 탭(플랜 카드)   5 고객 사례   6 품질 인증   7 다음 단계 카드 4장   8 각주
 *
 * 문구 원칙: 기존 제품·보안·고객사례·릴리스 데이터에 있는 사실만 쓴다. 조건·한계는 각주로 밝힌다.
 * 이전 구성은 components/pages/product-page.tsx 에 그대로 있다(되돌리려면 페이지 import 만 바꾼다).
 */

const P = PRODUCT_PROFILES.xgen;
const PAD = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";
const BTN_PRIMARY =
    "inline-flex h-11 items-center justify-center rounded-[4px] bg-[#185aea] px-6 text-[15px] font-semibold text-white transition hover:bg-[#1249c2]";
const BTN_SECONDARY =
    "inline-flex h-11 items-center justify-center rounded-[4px] border border-[var(--color-ink)] bg-white px-6 text-[15px] font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-hover)]";
const LINK = "group inline-flex items-center gap-1 text-[15px] font-semibold text-[#185aea] hover:underline";

type L = Record<Locale, string>;
const l = (ko: string, en: string): L => ({ ko, en });

const T = {
    trial: l("XGEN 무료로 체험하기", "Try XGEN free"),
    contact: l("도입 상담", "Talk to us"),
    trialNote: l("15일 체험 · 설치 없이 브라우저에서 시작합니다", "15-day trial · starts in your browser, nothing to install"),
    more: l("자세히 알아보기", "Learn more"),
    newsTitle: l("XGEN의 새로운 소식 살펴보기", "See what's new in XGEN"),
    featTitle: l("만들고, 연결하고, 통제하며 운영합니다", "Build, connect, govern, and operate"),
    featLead: l(
        "업무에 맞는 방식으로 Agent와 App을 만들고, 사내 시스템과 지식을 연결하고, 승인과 감사 아래에서 운영합니다.",
        "Build agents and apps your way, connect internal systems and knowledge, and run them under approval and audit.",
    ),
    prev: l("이전 탭", "Previous tab"),
    next: l("다음 탭", "Next tab"),
    planTitle: l("우리 회사에 맞는 XGEN 구성 찾기", "Find the XGEN setup that fits your company"),
    planLead: l(P.deploy.lead.ko, P.deploy.lead.en),
    tabDeploy: l("도입 방식", "Deployment"),
    tabSupport: l("도입 지원", "Adoption support"),
    caseTitle: l("고객 현장에서 확인한 XGEN", "XGEN in customer environments"),
    caseAll: l("고객 사례 모두 보기", "See all customer stories"),
    gsTitle: l("국가 공인 제3자 시험으로 품질을 확인했습니다", "Quality checked by an accredited third party"),
    gsLead: l(
        "XGEN은 GS(Good Software) 인증 1등급을 받았습니다. 공인 시험기관이 ISO/IEC 25000 계열 표준을 기준으로 제품 명세서·사용자 설명서·실행 소프트웨어를 시험했습니다.",
        "XGEN holds Grade 1 GS (Good Software) certification. An accredited lab tested the product specification, user documentation, and running software against the ISO/IEC 25000 series.",
    ),
    certNo: l("인증번호", "Certificate No."),
    nextTitle: l("XGEN과 함께 다음 단계로 나아가세요", "Take the next step with XGEN"),
    fnTitle: l("참고", "Notes"),
};

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

function Fn({ n }: { n: number }) {
    return (
        <sup className="ml-0.5">
            <a href={`#fn-${n}`} className="text-[#185aea] hover:underline">
                {n}
            </a>
        </sup>
    );
}

function SectionHead({ title, lead }: { title: string; lead?: string }) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[30px] font-semibold leading-tight tracking-tight text-[var(--color-ink)] md:text-[40px]">{title}</h2>
            {lead && <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">{lead}</p>}
        </div>
    );
}

/** 판단·실행 분리 개념도 — 실제 화면이 없는 항목용 */
function IsolationDiagram({ ko }: { ko: boolean }) {
    const box = "rounded-lg border border-[var(--color-line)] bg-white px-4 py-3 text-center shadow-sm";
    return (
        <div className="rounded-xl border border-[var(--color-line)] bg-gradient-to-br from-[#f3f7ff] to-[#eaf6fd] p-8">
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1.4fr_auto_1fr]">
                <div className={box}>
                    <p className="text-[15px] font-semibold text-[var(--color-ink)]">Harness</p>
                    <p className="mt-1 text-[12.5px] text-[var(--color-ink-muted)]">{ko ? "판단 · 작업 지시" : "Reasoning · instructions"}</p>
                </div>
                <ChevronRight className="mx-auto h-5 w-5 rotate-90 text-[#185aea] sm:rotate-0" />
                <div className="rounded-lg border-2 border-dashed border-[#185aea]/50 bg-white/70 p-3">
                    <p className="text-center text-[13px] font-semibold text-[#185aea]">Sandbox</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="rounded-md bg-[#185aea]/10 px-1 py-2 text-center text-[12px] font-semibold text-[var(--color-ink)]">
                                Agent {n}
                            </div>
                        ))}
                    </div>
                    <p className="mt-2 text-center text-[11.5px] text-[var(--color-ink-muted)]">{ko ? "에이전트별 격리 컨테이너" : "Isolated container per agent"}</p>
                </div>
                <ChevronRight className="mx-auto h-5 w-5 rotate-90 text-[#185aea] sm:rotate-0" />
                <div className={box}>
                    <p className="text-[15px] font-semibold text-[var(--color-ink)]">API</p>
                    <p className="mt-1 text-[12.5px] text-[var(--color-ink-muted)]">{ko ? "위임 권한 · 신원 검증" : "Delegation · identity check"}</p>
                </div>
            </div>
            <p className="mt-6 text-center text-[13px] text-[var(--color-ink-muted)]">
                {ko ? "API 키·OAuth 토큰은 실행 환경 밖에서 관리합니다" : "API keys and OAuth tokens are kept outside the runtime"}
            </p>
        </div>
    );
}

/** Geny 개념도 */
function GenyDiagram() {
    const parts = ["Memory", "Workspace", "Tool", "Schedule"];
    return (
        <div className="rounded-xl border border-[var(--color-line)] bg-gradient-to-br from-[#0b1224] via-[#12285c] to-[#185aea] p-8 text-white">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[22px] font-bold">
                Geny
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {parts.map((p) => (
                    <div key={p} className="rounded-lg bg-white/10 px-3 py-3 text-center text-[14px] font-semibold">
                        {p}
                    </div>
                ))}
            </div>
            <p className="mt-6 text-center text-[13px] text-white/70">Agent Runtime</p>
        </div>
    );
}

export function xgenFeatureGroups(locale: Locale): AccordionGroup[] {
    const ko = locale === "ko";
    const more = T.more[locale];
    const b = (id: string) => P.bento.find((x) => x.id === id)!;
    return [
        {
            key: "build",
            label: ko ? "만들기" : "Build",
            anchors: ["build"],
            items: [
                {
                    key: "vibe",
                    title: "Vibe Coding in DexOn",
                    desc: b("vibe").desc[locale],
                    href: "/vibe-coding",
                    more,
                    visual: {
                        type: "img",
                        img: "/product/dexon-vibe-coding-video.jpg",
                        alt: P.hero.main.alt[locale],
                        sub: { img: "/product/dexon-full-coding-video.jpg", alt: b("vibe").imgAlt![locale] },
                    },
                },
                {
                    key: "dexon",
                    title: ko ? "DexOn 워크스페이스" : "DexOn workspace",
                    desc: ko
                        ? "Device Interface이자 사용자가 일하는 Workspace입니다. 허용된 범위 안에서 기기의 파일과 앱을 활용하고, PC에서 시작한 업무를 태블릿·핸드폰에서 이어갑니다."
                        : "A device interface and the workspace users work in. Uses files and apps within permitted scope, and work started on a PC continues on a tablet or phone.",
                    href: "/xgen-dex",
                    more,
                    fn: 4,
                    visual: { type: "img", img: "/hero-dex-vibe-poster.jpg", alt: ko ? "DexOn 워크스페이스 화면" : "DexOn workspace" },
                },
                {
                    key: "easymode",
                    title: "EasyMode",
                    desc: b("easymode").desc[locale],
                    href: "/easy-mode",
                    more,
                    visual: { type: "img", img: "/product/agent-builder-canvas.png", alt: P.hero.sub.alt[locale] },
                },
                {
                    key: "canvas",
                    title: ko ? "에이전트플로우 캔버스" : "Agentflow canvas",
                    desc: ko
                        ? "노드를 연결해 에이전트의 처리 흐름을 시각적으로 설계합니다. 지식 검색, 도구 호출, 분기를 한 화면에서 구성합니다."
                        : "Design an agent's flow visually by connecting nodes — knowledge retrieval, tool calls, and branching on one screen.",
                    visual: { type: "img", img: "/product/screen-canvas.png", alt: ko ? "워크플로우 노드 편집 화면" : "Workflow node editor" },
                },
            ],
        },
        {
            key: "connect",
            label: ko ? "연결하기" : "Connect",
            items: [
                {
                    key: "pathfinder",
                    title: "PathFinder",
                    desc: b("pathfinder").desc[locale],
                    href: "/pathfinder",
                    more,
                    visual: { type: "img", img: "/product/screen-api-tool.png", alt: ko ? "API 도구 등록 화면" : "API tool registration" },
                },
                {
                    key: "knowledge",
                    title: ko ? "지식 · RAG · 온톨로지" : "Knowledge · RAG · Ontology",
                    desc: b("knowledge").desc[locale],
                    href: "/technology",
                    more,
                    visual: { type: "img", img: "/product/screen-ontology.png", alt: b("knowledge").imgAlt![locale] },
                },
                {
                    key: "models",
                    title: ko ? "모델 선택" : "Model choice",
                    desc: ko
                        ? "GPT · Claude · Qwen · Private LLM 중 업무와 보안 정책에 맞는 모델을 고릅니다. 내장 도구·플러그인 111종 이상을 쓰고, API와 MCP로 확장합니다."
                        : "Choose among GPT, Claude, Qwen, and private LLMs to fit the task and security policy. Use 111+ built-in tools and plugins, and extend via APIs and MCP.",
                    visual: { type: "img", img: "/product/modelops-catalog.png", alt: ko ? "모델 카탈로그 화면" : "Model catalog" },
                },
            ],
        },
        {
            key: "govern",
            label: ko ? "통제하기" : "Govern",
            items: [
                {
                    key: "approval",
                    title: ko ? "결재선 지정과 AI 위험도 심사" : "Approval routes and AI risk review",
                    desc: P.trust.lead[locale],
                    href: P.trust.href,
                    more,
                    visual: {
                        type: "img",
                        img: P.trust.back.img,
                        alt: P.trust.back.alt[locale],
                        sub: { img: P.trust.front.img, alt: P.trust.front.alt[locale] },
                    },
                },
                {
                    key: "isolation",
                    anchor: "isolated-execution",
                    title: ko ? "판단과 실행의 분리" : "Reasoning apart from execution",
                    desc: ko
                        ? "판단을 맡는 Harness와 코드를 실행하는 Sandbox를 별도 서비스로 나누고, 에이전트별로 격리된 컨테이너에서 실행합니다. 외부 서비스용 API 키와 OAuth 토큰은 실행 환경에 보관하지 않습니다."
                        : "Harness (reasoning) and Sandbox (execution) run as separate services, with code in per-agent isolated containers. API keys and OAuth tokens for external services are not stored in the runtime.",
                    href: "/security-and-governance",
                    more,
                    fn: 2,
                    visual: { type: "node", node: <IsolationDiagram ko={ko} />, label: ko ? "판단·실행 분리 구조도" : "Reasoning and execution separation" },
                },
                {
                    key: "attacker",
                    title: ko ? "공격자의 시선으로 재검증" : "Re-tested through an attacker's eyes",
                    desc: ko
                        ? "격리 환경에서 계정 간 권한 점검과 자율 침투 테스트로 권한 통제를 다시 확인했습니다. 재점검에서 기존 고위험 항목은 재발하지 않았습니다."
                        : "Access controls were re-checked with cross-account permission tests and autonomous pentesting in an isolated environment. Previously identified high-risk items did not recur.",
                    href: "/security-and-governance#attacker-view",
                    more,
                    fn: 3,
                    visual: { type: "img", img: "/hero-security-shield.jpg", alt: ko ? "보안 검증 키 비주얼" : "Security verification visual" },
                },
            ],
        },
        {
            key: "operate",
            label: ko ? "운영하기" : "Operate",
            items: [
                {
                    key: "agent-deploy",
                    title: ko ? "에이전트 배포" : "Agent deployment",
                    desc: ko
                        ? "자신의 개발 환경에서 만든 에이전트를 동료와 공유해 함께 씁니다. 외부 시스템 호출과 웹 임베드, 스케줄 실행도 지원합니다."
                        : "Share agents built in your own environment with colleagues. External calls, web embeds, and scheduled runs are supported.",
                    visual: { type: "img", img: "/product/screen-approval.png", alt: ko ? "에이전트 배포 화면" : "Agent deployment" },
                },
                {
                    key: "app-deploy",
                    title: ko ? "앱 배포" : "App deployment",
                    desc: ko
                        ? "바이브코딩으로 만든 앱은 사용자별 개발 환경에서 제공합니다. 공개 배포가 필요하면 시스템 관리자에게 요청하고, 관리자가 등록한 배포 서버로 서비스합니다."
                        : "Apps built with vibe coding run in each user's development environment. To publish, request it from a system administrator; it then serves from the admin-registered deployment server.",
                    visual: { type: "img", img: "/product/app-deploy-server.png", alt: ko ? "앱 배포 서버 등록 화면" : "App deployment server registration" },
                },
                {
                    key: "ops",
                    title: ko ? "대시보드 · 모니터링" : "Dashboards · monitoring",
                    desc: ko
                        ? "운영 대시보드에서 실행 현황과 추이를, 시스템 모니터링에서 CPU·메모리·디스크 사용률을 확인합니다."
                        : "The operations dashboard shows run status and trends; system monitoring shows CPU, memory, and disk usage.",
                    visual: {
                        type: "img",
                        img: "/product/operations-dashboard.png",
                        alt: ko ? "운영 대시보드 화면" : "Operations dashboard",
                        sub: { img: "/product/operations-monitoring.png", alt: ko ? "시스템 모니터링 화면" : "System monitoring" },
                    },
                },
                {
                    key: "geny",
                    anchor: "geny",
                    title: "Agent Runtime · Geny",
                    desc: ko
                        ? "Memory·Workspace·Tool·Schedule로 이전 업무의 맥락을 이어받고, 결과물을 쌓아 다음 업무에 활용합니다."
                        : "Memory, workspace, tools, and schedules carry context forward and turn results into input for the next task.",
                    href: "/blog/product-xgeny",
                    more,
                    fn: 1,
                    visual: { type: "node", node: <GenyDiagram />, label: ko ? "Geny 구성도" : "Geny components" },
                },
            ],
        },
    ];
}

export function ProductXgenPageContent({ locale }: { locale: Locale }) {
    const ko = locale === "ko";
    const h = (p: string) => localeHref(locale, p);
    const t = <K extends keyof typeof T>(k: K) => T[k][locale];
    const home = ko ? "/" : "/en";

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
        },
        {
            img: "/xgen-gs-box2.png",
            fit: "contain",
            eyebrow: ko ? "품질 인증" : "Certification",
            title: ko ? "GS 인증 1등급 획득" : "GS certification, Grade 1",
            desc: ko
                ? `공인 시험기관의 제3자 시험을 거쳤습니다. 인증번호 ${XGEN_GS_CERTIFICATION.no}.`
                : `Tested by an accredited third-party lab. Certificate No. ${XGEN_GS_CERTIFICATION.no}.`,
            href: "/product/xgen/security#certification",
            cta: ko ? "인증 내용 보기" : "See the certification",
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
        },
    ];

    const deployPlans = [
        {
            key: "trial",
            name: ko ? "15일 체험" : "15-day trial",
            desc: ko ? "설치 없이 브라우저에서 XGEN을 직접 사용해 봅니다." : "Use XGEN directly in your browser, with nothing to install.",
            primary: true,
            cta: t("trial"),
            href: "/xgen-trial",
            rows: ko
                ? ["브라우저 접속", "체험용 환경 제공", "체험 범위 안에서 주요 기능 사용"]
                : ["Browser access", "A trial environment is provided", "Core features within the trial scope"],
        },
        ...(["onprem", "airgap"] as const).map((k) => ({
            key: k,
            name: k === "onprem" ? (ko ? "온프레미스" : "On-premise") : ko ? "폐쇄망" : "Air-gapped",
            desc:
                k === "onprem"
                    ? ko
                        ? "고객사 데이터센터와 GPU에 설치해 운영합니다."
                        : "Installed and run on your data center and GPUs."
                    : ko
                      ? "인터넷과 분리된 내부망에서 운영합니다."
                      : "Runs on an internal network isolated from the internet.",
            primary: false,
            cta: t("contact"),
            href: "/contact",
            rows: P.deploy.rows.map((r) => `${r.label[locale]} · ${r[k][locale]}`),
        })),
    ];

    const supportPlans = [
        {
            key: "consulting",
            name: ko ? "기술 컨설팅" : "Technical consulting",
            desc: ko ? "업무 범위와 인프라 조건을 확인해 도입 구조를 함께 설계합니다." : "We confirm scope and infrastructure and design the adoption architecture with you.",
            href: "/technical-consulting",
        },
        {
            key: "training",
            name: ko ? "교육 지원" : "Training",
            desc: ko ? "사용자와 운영 담당자가 XGEN을 직접 다룰 수 있도록 교육합니다." : "Training so users and operators can work with XGEN themselves.",
            href: "/enablement",
        },
        {
            key: "support",
            name: ko ? "운영 · 기술지원" : "Operations & support",
            desc: ko ? "도입 이후 운영과 업데이트, 기술 문의를 지원합니다." : "Support for operations, updates, and technical questions after adoption.",
            href: "/support",
        },
    ];

    const cases = getAllCases()
        .filter((c) => caseLinkEnabled(c.slug) && c.products.includes("xgen") && (ko || (c.titleEn && c.summaryEn)))
        .slice(0, 3);

    const nextSteps = [
        { icon: FlaskConical, title: ko ? "직접 써 보기" : "Try it yourself", desc: ko ? "15일 동안 브라우저에서 XGEN을 사용해 봅니다." : "Use XGEN in your browser for 15 days.", cta: t("trial"), href: "/xgen-trial" },
        { icon: MessagesSquare, title: ko ? "도입 상담" : "Talk to us", desc: ko ? "PoC 범위와 구성 조건을 함께 확인합니다." : "Review PoC scope and configuration together.", cta: ko ? "상담 신청" : "Contact us", href: "/contact" },
        { icon: FileText, title: ko ? "기술 문서" : "Documentation", desc: ko ? "구성 요소와 사용 방법을 문서로 확인합니다." : "Read about components and usage.", cta: ko ? "문서 보기" : "Read the docs", href: "/documentation" },
        { icon: ScrollText, title: ko ? "릴리스 노트" : "Release notes", desc: ko ? "버전별 변경 사항과 반영 단계를 확인합니다." : "See changes and rollout stage by version.", cta: ko ? "변경 사항 보기" : "See what changed", href: "/releases" },
    ];

    const planCard = (p: (typeof deployPlans)[number]) => (
        <div
            key={p.key}
            className={`flex flex-col rounded-xl bg-white p-7 ${p.primary ? "border-2 border-[#185aea]" : "border border-[var(--color-line)]"}`}
        >
            <h3 className="text-[22px] font-semibold tracking-tight text-[var(--color-ink)]">{p.name}</h3>
            <p className="mt-2 min-h-[48px] text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{p.desc}</p>
            <Link href={h(p.href)} className={`${p.primary ? BTN_PRIMARY : BTN_SECONDARY} mt-6 w-full`}>
                {p.cta}
            </Link>
            <ul className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6">
                {p.rows.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[14.5px] leading-snug text-[var(--color-ink)]">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#185aea]" />
                        {r}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "@id": absoluteUrl("/product/xgen#software"),
                        name: "XGEN",
                        applicationCategory: "BusinessApplication",
                        applicationSubCategory: "Enterprise Agentic AI Platform",
                        operatingSystem: "On-premise",
                        description: P.hero.lead[locale],
                        url: absoluteUrl(ko ? "/product/xgen" : "/en/product/xgen"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "XGEN", path: ko ? "/product/xgen" : "/en/product/xgen" },
                    ]),
                ]}
            />
            <main>
                {/* 1 · 히어로 */}
                <section data-nav-theme="light" className="bg-white pt-[calc(var(--nav-h,80px)+48px)]">
                    <div className={`${PAD} grid items-center gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14`}>
                        <div>
                            <p className="text-[15px] font-semibold text-[var(--color-ink)]">
                                XGEN <span className="font-normal text-[var(--color-ink-muted)]">· {ko ? "기업형 에이전틱 AI 플랫폼" : "Enterprise Agentic AI Platform"}</span>
                            </p>
                            <h1 className="mt-5 text-[34px] font-bold leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)] sm:text-[44px] lg:text-[52px]">
                                {P.hero.titleA[locale]}
                                <br className="hidden sm:block" /> {P.hero.titleB[locale]}
                            </h1>
                            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-[var(--color-ink-muted)]">{P.hero.lead[locale]}</p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link href={h("/xgen-trial")} className={BTN_PRIMARY}>
                                    {t("trial")}
                                </Link>
                                <Link href={h("/contact")} className={BTN_SECONDARY}>
                                    {t("contact")}
                                </Link>
                            </div>
                            <p className="mt-4 text-[13.5px] text-[var(--color-ink-muted)]">{t("trialNote")}</p>
                        </div>
                        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#dff3fd] via-[#e7eefe] to-[#c9d9fb] p-6 sm:p-10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/product/screen-canvas.png"
                                alt={ko ? "XGEN 워크플로우 캔버스 화면" : "XGEN workflow canvas"}
                                className="w-full rounded-xl border border-white/70 bg-white shadow-[0_24px_60px_-24px_rgba(11,18,36,0.45)]"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={P.hero.main.img}
                                alt={P.hero.main.alt[locale]}
                                className="absolute bottom-4 right-4 hidden w-[46%] rounded-xl border border-white/70 bg-white shadow-[0_24px_50px_-18px_rgba(11,18,36,0.5)] sm:block"
                            />
                        </div>
                    </div>
                    <div className={`${PAD} pb-14`}>
                        <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
                            {P.proof.map((x) => (
                                <div key={x.value} className="border-l border-[var(--color-line-strong)] pl-5">
                                    <dt className="text-[13px] text-[var(--color-ink-muted)]">{x.label[locale]}</dt>
                                    <dd className="mt-1 text-[24px] font-semibold tracking-tight text-[var(--color-ink)]">{x.value}</dd>
                                    <dd className="text-[12.5px] text-[var(--color-ink-subtle)]">{x.sub[locale]}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* 2 · 새로운 소식 */}
                <section id="news" className="bg-[var(--color-surface-alt)] py-20 md:py-24">
                    <div className={PAD}>
                        <h2 className="text-[28px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[36px]">{t("newsTitle")}</h2>
                        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible">
                            {news.map((n) => (
                                <article
                                    key={n.title}
                                    className="flex w-[82%] flex-none snap-start flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white sm:w-[60%] md:w-auto"
                                >
                                    <div className="aspect-[16/9] overflow-hidden bg-[#eef3fc]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={n.img}
                                            alt=""
                                            loading="lazy"
                                            className={`h-full w-full ${n.fit === "contain" ? "object-contain p-6" : "object-cover object-top"}`}
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <p className="text-[12.5px] font-semibold text-[#185aea]">{n.eyebrow}</p>
                                        <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight text-[var(--color-ink)]">{n.title}</h3>
                                        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {n.desc}
                                            {n.fn && <Fn n={n.fn} />}
                                        </p>
                                        <Link href={h(n.href)} className={`${LINK} mt-5`}>
                                            {n.cta}
                                            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3 · 탭 + 아코디언 */}
                <section id="features" className="scroll-mt-[calc(var(--nav-h,80px)+24px)] bg-white py-20 md:py-24">
                    <div className={PAD}>
                        <SectionHead title={t("featTitle")} lead={t("featLead")} />
                        <div className="mt-12">
                            <AccordionTabs locale={locale} groups={xgenFeatureGroups(locale)} prevLabel={t("prev")} nextLabel={t("next")} />
                        </div>
                    </div>
                </section>

                {/* 4 · 도입 방식 / 도입 지원 */}
                <section id="deploy" className="scroll-mt-[calc(var(--nav-h,80px)+24px)] bg-[var(--color-surface-alt)] py-20 md:py-24">
                    <div className={PAD}>
                        <SectionHead title={t("planTitle")} lead={t("planLead")} />
                        <div className="mt-10">
                            <PlanTabs
                                tabs={[
                                    {
                                        key: "deploy",
                                        label: t("tabDeploy"),
                                        panel: (
                                            <>
                                                <div className="grid gap-5 lg:grid-cols-3">{deployPlans.map(planCard)}</div>
                                                <p className="mt-6 text-center text-[13.5px] text-[var(--color-ink-muted)]">
                                                    {P.deploy.note[locale]}
                                                    <Fn n={4} />
                                                </p>
                                            </>
                                        ),
                                    },
                                    {
                                        key: "support",
                                        label: t("tabSupport"),
                                        panel: (
                                            <div className="grid gap-5 lg:grid-cols-3">
                                                {supportPlans.map((s) => (
                                                    <Link
                                                        key={s.key}
                                                        href={h(s.href)}
                                                        className="group flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#185aea]"
                                                    >
                                                        <h3 className="text-[22px] font-semibold tracking-tight text-[var(--color-ink)]">{s.name}</h3>
                                                        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{s.desc}</p>
                                                        <span className={`${LINK} mt-6`}>
                                                            {t("more")}
                                                            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* 5 · 고객 사례 */}
                {cases.length > 0 && (
                    <section id="cases" className="scroll-mt-[calc(var(--nav-h,80px)+24px)] bg-white py-20 md:py-24">
                        <div className={PAD}>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <h2 className="text-[28px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[36px]">{t("caseTitle")}</h2>
                                <Link href={h("/customers")} className={LINK}>
                                    {t("caseAll")}
                                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                            <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible">
                                {cases.map((c) => (
                                    <Link
                                        key={c.slug}
                                        href={h(`/customers/case/${c.slug}`)}
                                        className="group flex w-[82%] flex-none snap-start flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition hover:border-[#185aea] sm:w-[60%] md:w-auto"
                                    >
                                        <div className="flex h-[140px] flex-col justify-between bg-gradient-to-br from-[#0b1224] via-[#12285c] to-[#185aea] p-6 text-white">
                                            <p className="text-[17px] font-semibold tracking-tight">{ko ? c.customer : c.customerEn ?? c.customer}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="rounded-full bg-white/15 px-3 py-1 text-[12.5px] font-semibold">
                                                    {ko ? c.status : CASE_STATUS_EN[c.status]}
                                                </span>
                                                <span className="rounded-full bg-white/15 px-3 py-1 text-[12.5px] font-semibold">
                                                    {INDUSTRIES[c.industry][ko ? "ko" : "en"]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col p-6">
                                            <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-[var(--color-ink)]">
                                                {ko ? c.title : c.titleEn}
                                            </h3>
                                            <p className="mt-3 line-clamp-3 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {ko ? c.summary.replace(/^플래티어는\s+/, "") : c.summaryEn}
                                            </p>
                                            <span className={`${LINK} mt-5`}>
                                                {t("more")}
                                                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 6 · 품질 인증 */}
                <section id="certification" className="scroll-mt-[calc(var(--nav-h,80px)+24px)] bg-[var(--color-surface-alt)] py-16 md:py-20">
                    <div className={`${PAD} grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]`}>
                        <div>
                            <h2 className="text-[26px] font-semibold leading-tight tracking-tight text-[var(--color-ink)] md:text-[32px]">{t("gsTitle")}</h2>
                            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{t("gsLead")}</p>
                            <p className="mt-4 text-[14px] font-semibold text-[var(--color-ink)]">
                                {t("certNo")} {XGEN_GS_CERTIFICATION.no}
                            </p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/xgen-gs-box2.png" alt={ko ? "XGEN — GS 인증 1등급" : "XGEN — GS certification, Grade 1"} loading="lazy" className="mx-auto w-full max-w-[340px]" />
                    </div>
                </section>

                {/* 7 · 다음 단계 */}
                <section className="bg-white py-20 md:py-24">
                    <div className={PAD}>
                        <SectionHead title={t("nextTitle")} />
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {nextSteps.map((s) => (
                                <Link
                                    key={s.title}
                                    href={h(s.href)}
                                    className="group flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#185aea]"
                                >
                                    <s.icon className="h-7 w-7 text-[#185aea]" />
                                    <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-[var(--color-ink)]">{s.title}</h3>
                                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{s.desc}</p>
                                    <span className={`${LINK} mt-5`}>
                                        {s.cta}
                                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8 · 각주 */}
                <section className="bg-white pb-16">
                    <div className={`${PAD} border-t border-[var(--color-line)] pt-8`}>
                        <p className="text-[13px] font-semibold text-[var(--color-ink-muted)]">{t("fnTitle")}</p>
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
            </main>
            <SiteFooter />
        </>
    );
}
