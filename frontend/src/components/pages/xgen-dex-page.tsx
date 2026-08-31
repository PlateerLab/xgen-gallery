import Link from "next/link";
import {
    MonitorSmartphone,
    ArrowRight,
    ArrowDown,
    ShieldCheck,
    Server,
    Boxes,
    Cable,
    Layers,
    RefreshCw,
    TrendingUp,
    Check,
    X,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { DexFlowArt } from "@/components/dex-flow-art";
import { DexConceptArt } from "@/components/dex-concept-art";
import { DexWhyBeforeArt, DexWhyAfterArt } from "@/components/dex-why-art";
import { DEX_PILLAR_ART } from "@/components/dex-pillar-art";
import { FeatureArt, type FeatureArtKey } from "@/components/feature-art";
import { DEX_KPI_ART } from "@/components/dex-kpi-art";
import { breadcrumbLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import { SITE, absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * XGEN DeX 제품 상세 — /product 의 특장점 카드에서 「자세히 보기」로 들어온다.
 *
 * 순서를 "무엇을 하는 제품인가 → 어떻게 동작하는가 → 무엇을 제공하는가" 로 둔다.
 * 도입을 검토하는 쪽이 3분 안에 판단하는 자리이고, 설치 절차와 화면은 블로그
 * 실습 편이 맡는다 — 같은 내용을 두 번 쓰지 않는다.
 */
const VALUE_ICONS: LucideIcon[] = [Layers, Server, RefreshCw, TrendingUp];
/** 무엇을 연결하나 — 멀티 모델 · 업무 커넥터 · 로컬 브리지 */
const CONNECT_ICONS: LucideIcon[] = [Boxes, Cable, MonitorSmartphone];

/**
 * 「보안과 통제」 섹션 노출 여부.
 *
 * 제품에 아직 들어가지 않은 기능이라 지금은 감춘다 — 문구와 마크업은 남겨 두고
 * 구현이 끝나면 true 로 바꾼다.
 */
const SHOW_GOVERNANCE = false;

/**
 * 「무엇을 측정하나요?」 섹션 노출 여부.
 *
 * 목표 수치와 도입 구성은 제안 단계에서 고객사별로 다시 잡는 값이라, 공개
 * 페이지에 세워 두기 전에 한 번 더 정리하기로 했다. 문구와 마크업은 남겨 두고
 * 이 값만 true 로 바꾸면 다시 나온다.
 */
const SHOW_IMPACT = false;

interface DexCopy {
    ldDescription: string;
    heroBadge: string;
    heroTitle: string;
    heroLead: string;
    ctaTrial: string;
    ctaGuide: string;
    /** 히어로의 설치 가이드 CTA — 「더 알아보기」 목록과 별개로 둔다 */
    guideHref: string;
    /** 히어로 아래 세 기둥 — 중앙 관리 · 연결 · 실행 */
    pillars: [string, string][];
    whatTitle: string;
    /** 줄바꿈 자리를 문장 안에서 정한다 — 좁은 화면에서는 br 이 숨어 그대로 흐른다 */
    whatLead: string[];
    /** 요청 하나가 결과물이 되기까지 — 개념도 아래 네 칸 */
    taskSteps: [string, string][];
    /** 무엇으로 연결하나 — 멀티 모델 · 업무 커넥터 · 로컬 브리지 */
    connectTitle: string;
    connectLead: string;
    connects: [string, string][];
    whyTitle: string;
    whyLead: string;
    /** 현재 업무 환경의 단절 — [과제, 현재의 문제, 사업 영향] */
    gapHead: [string, string, string];
    gaps: [string, string, string][];
    beforeLabel: string;
    before: string[];
    afterLabel: string;
    after: string[];
    flowTitle: string;
    flowLead: string;
    steps: [string, string][];
    fitTitle: string;
    fitLead: string;
    fits: string[];
    valueTitle: string;
    values: [string, string][];
    govTitle: string;
    govLead: string;
    govs: string[];
    govQuote: string;
    govQuoteSub: string;
    /** 8주 도입안 — [기간, 단계, 산출] */
    rolloutTitle: string;
    rolloutLead: string;
    rollout: [string, string, string][];
    /**
     * 성과 목표 — [측정 항목, 목표, 무엇을 재는가].
     *
     * 항목이 먼저다. 수치를 앞에 두면 「무엇을 측정하나요?」라고 묻고 결과만
     * 답하는 꼴이라, 제목과 카드가 서로 따로 논다.
     */
    impactTitle: string;
    impactLead: string;
    impacts: [string, string, string][];
    impactNote: string;
    packageTitle: string;
    packages: [string, string][];
    readTitle: string;
    reads: { label: string; desc: string; href: string; art: FeatureArtKey }[];
    /** 관련 블로그 — 기능 페이지와 성격이 달라 목록을 나눠 둔다 */
    postsTitle: string;
    posts: { label: string; desc: string; href: string }[];
    closingTitle: string;
    closingLead: string;
    closingTrial: string;
    closingContact: string;
}

const COPY: Record<Locale, DexCopy> = {
    ko: {
        ldDescription:
            "XGEN DeX는 서버에서 운영되는 AI Agent를 사용자의 PC 업무환경과 연결하는 Desktop Interface입니다. 허용된 범위 내에서 파일과 애플리케이션을 활용해 실제 업무를 수행하고 결과물을 생성합니다.",
        heroBadge: "XGEN · DeX",
        heroTitle: "대화로 끝나는 AI가 아니라, 실제 결과물을 완성합니다",
        heroLead:
            "XGEN DeX는 AI 모델과 사내 지식, 로컬·원격 업무 환경을 연결하는 통합 실행 플랫폼입니다. 자연어 요청을 이해하고 필요한 도구와 실행 환경을 연결해 검증 가능한 산출물로 완성합니다.",
        ctaTrial: "무료 체험 신청",
        ctaGuide: "설치 가이드 보기",
        guideHref: "/blog/xgen-dex-install-guide",
        pillars: [
            [
                "중앙에서 관리하고, 현장에서 실행합니다",
                "Agent와 지식·도구·권한을 XGEN에서 한 번 정의하면 전사가 같은 기준으로 사용합니다. 부서별로 만든 AI가 제각각 흩어지지 않고, 누가 무엇에 접근하는지가 관리 체계 안에 남습니다.",
            ],
            [
                "기존 업무환경을 바꾸지 않습니다",
                "쓰던 Excel과 브라우저, 사내 애플리케이션을 그대로 둡니다. 새 시스템으로 옮기는 것이 아니라 이미 있는 환경에 실행 능력을 더하는 방식이라, 전환과 교육에 드는 비용이 거의 없습니다.",
            ],
            [
                "답변이 아니라 결과물로 끝납니다",
                "분석하고 정리해 문서를 만들고 지정한 폴더에 저장하는 데까지가 한 번의 요청입니다. 사람이 옮겨 담던 과정이 사라져 업무 시간이 실제로 줄어듭니다.",
            ],
        ],
        whatTitle: "XGEN DeX는 무엇인가요?",
        whatLead: [
            "XGEN DeX(Desktop Experience)는 XGEN의 AI Agent와 사용자의",
            "실제 업무환경을 연결하는 설치형 Desktop Interface입니다.",
        ],
        taskSteps: [
            ["요청", "목표와 범위를 자연어로 전달합니다"],
            ["조율", "필요한 모델과 도구를 조합합니다"],
            ["실행", "승인된 범위 안에서 수행합니다"],
            ["결과", "검증 가능한 산출물로 완성합니다"],
        ],

        connectTitle: "무엇을 연결하나요?",
        connectLead:
            "DeX는 하나의 모델이나 하나의 도구에 묶이지 않습니다. 업무에 필요한 것을 그때그때 연결합니다.",
        connects: [
            ["멀티 모델", "업무의 비용·성능 요건에 맞는 AI를 골라 씁니다. 모델이 바뀌어도 업무 흐름은 그대로입니다."],
            ["업무 커넥터", "이미 쓰고 있는 SaaS와 사내 데이터를 명시적인 API 계약으로 연결합니다."],
            ["로컬 브리지", "사용자 PC의 파일과 애플리케이션을 승인된 범위 안에서 다룹니다."],
        ],

        whyTitle: "왜 필요한가요?",
        whyLead:
            "AI는 답을 생성합니다. 하지만 기업의 업무는 사용자 PC에서 파일과 애플리케이션을 다루고 결과물을 만드는 과정에서 완성됩니다. 그 사이가 세 군데에서 끊어져 있습니다.",
        gapHead: ["핵심 과제", "현재의 문제", "사업 영향"],
        gaps: [
            ["도구 단절", "AI·문서·데이터 도구를 각각 따로 사용합니다", "전환 비용과 재작업이 늘어납니다"],
            ["실행 단절", "AI 답변 이후의 실제 작업은 사람이 수동으로 처리합니다", "리드타임과 오류가 늘어납니다"],
            ["통제 단절", "누가 무엇을 실행했는지 권한과 이력을 관리하기 어렵습니다", "보안·감사 부담이 늘어납니다"],
        ],
        beforeLabel: "기존 방식의 한계",
        before: [
            "파일 업로드·다운로드 반복",
            "엑셀·PPT 등 앱을 직접 열어 수정",
            "브라우저에서 다시 검색",
            "결과 저장과 폴더 정리까지 모두 수동",
        ],
        afterLabel: "XGEN DeX로 해결",
        after: [
            "PC의 파일과 앱을 직접 활용",
            "필요한 도구와 권한을 연결해 자동 실행",
            "결과물까지 자동 생성 및 저장",
            "연속적인 업무 흐름 유지",
        ],
        flowTitle: "XGEN DeX 사용 흐름",
        flowLead: "설치부터 첫 업무까지, 여섯 단계로 시작합니다.",
        steps: [
            ["DeX 설치", "설치 파일을 실행하여 XGEN DeX를 설치합니다."],
            ["XGEN에 연결", "계정 정보로 로그인하여 XGEN 플랫폼에 연결합니다."],
            ["Agent 선택", "업무에 필요한 Agent를 선택합니다."],
            ["실행 환경 연결", "파일과 브라우저, 도구 등 필요한 실행 환경을 연결하고 권한을 부여합니다."],
            ["업무 지시", "자연어로 업무를 지시하면 Agent가 실행합니다."],
            ["결과 확인 · 이어가기", "결과물은 동기화 폴더에 저장되고, 다음 업무로 이어집니다."],
        ],
        fitTitle: "어떤 업무에 효과적일까요?",
        fitLead: "사람이 여러 프로그램과 파일을 반복적으로 오가는 업무에 특히 효과적입니다.",
        fits: [
            "데이터 분석 · 리포트 작성",
            "정기 보고 및 문서 작성",
            "회의 후속 정리 및 요약",
            "문서 검토 및 비교",
            "웹 리서치 및 자료 조사",
            "파일 반복 처리 및 변환",
            "개발 업무 자동화",
            "사내 시스템 · Agent 활용",
        ],
        valueTitle: "DeX의 핵심 가치",
        values: [
            [
                "기존 업무 도구를 대체하지 않습니다",
                "Excel, PPT, 브라우저 등 익숙한 도구를 그대로 사용합니다.",
            ],
            [
                "서버와 로컬 자원의 최적 조합",
                "중앙의 Agent 자산은 서버에서 관리하고, 실행이 필요한 업무는 로컬에서 수행합니다.",
            ],
            [
                "연속적인 업무 경험",
                "Workspace와 동기화로 결과를 다음 업무로 자연스럽게 이어갑니다.",
            ],
            [
                "업무 생산성 향상",
                "반복 작업을 자동화하고, 더 중요한 일에 집중할 수 있습니다.",
            ],
        ],
        govTitle: "기업 환경을 위한 보안과 통제",
        govLead: "편리함과 함께, 기업에 필요한 통제 체계를 제공합니다.",
        govs: [
            "누가 어떤 Agent를 사용할 수 있는지 관리",
            "어떤 데이터와 도구에 접근할 수 있는지 통제",
            "실행 환경별 권한을 명시적으로 부여",
            "모든 작업 이력과 감사 로그 기록",
            "민감 정보 접근과 위험 행동 탐지 · 차단",
        ],
        govQuote: "허용된 업무환경과 도구만 연결합니다.",
        govQuoteSub: "안전한 연결, 통제 가능한 실행.",

        rolloutTitle: "8주 단계적 도입안",
        rolloutLead:
            "전사 전환부터 시작하지 않습니다. 짧은 PoC로 가치와 위험을 먼저 확인한 뒤 대상 업무를 넓힙니다.",
        rollout: [
            ["1–2주", "진단 및 설계", "우선 업무 선정 · 정책 정의 · 지표 기준선"],
            ["3–5주", "PoC 구축", "커넥터 구성 · 대표 시나리오 · 사용자 검증"],
            ["6–7주", "안정화", "접근 통제 · 감사 점검 · 운영 교육"],
            ["8주", "전환 및 확산", "운영 이관 · KPI 리뷰 · 후속 로드맵"],
        ],

        impactTitle: "무엇을 측정하나요?",
        impactLead:
            "AI 도입 효과는 추정이 아니라 데이터로 확인합니다. 파일럿 시작 전 기준값(Baseline)을 측정하고, 8주 후 동일한 지표로 개선 효과를 비교·검증합니다.",
        impacts: [
            ["업무 리드타임", "최대 30% 단축", "요청부터 결과물 완료까지의 평균 처리 시간"],
            ["반복 작업 시간", "최대 20% 감소", "복사·정리·형식 변환 등 수작업에 쓰는 시간"],
            ["핵심 업무 완료율", "90% 이상", "지원 없이 핵심 업무 시나리오를 끝까지 수행한 비율"],
        ],
        impactNote:
            "표시된 수치는 파일럿 프로젝트의 목표 지표입니다. 실제 성과는 고객사의 업무 프로세스, 기준값(Baseline), 적용 범위에 따라 달라질 수 있으며, 도입 전 진단을 통해 목표 지표를 함께 설정합니다.",
        packageTitle: "도입 구성",
        packages: [
            ["초기 구축", "환경 구성 · 시스템 연동 · 대표 시나리오 설계"],
            ["라이선스", "사용자 수와 모델 사용량 기준"],
            ["운영 지원", "SLA와 지원 범위에 따른 운영 이관·교육"],
        ],
        readTitle: "XGEN 핵심 기능 더 알아보기",
        reads: [
            {
                label: "이지모드",
                desc: "코딩 없이, 약 90초면 에이전트가 완성됩니다.",
                href: "/product#build",
                art: "easy-mode",
            },
            {
                label: "패스파인더",
                desc: "기존 웹 시스템과 API를 Agent가 쓰는 도구로 연결합니다.",
                href: "/pathfinder",
                art: "pathfinder",
            },
            {
                label: "FloUI",
                desc: "질문에 맞는 화면을 그 자리에서 생성하는 응답형 UI입니다.",
                href: "/floui",
                art: "floui",
            },
        ],
        postsTitle: "관련 XGEN DeX 프리뷰",
        // 개념 → 연결 → 실습 순. 읽는 사람이 밟아 갈 순서대로 둔다
        posts: [
            {
                label: "XGEN DeX — Enterprise AI를 데스크톱까지 잇는 실행 계층",
                desc: "중앙 통제는 그대로 두고 업무 방식은 바꾸지 않는 연결 방식",
                href: "/blog/product-xgen-dex",
            },
            {
                label: "XGEN DeX — 기업 AI Agent를 실제 업무환경으로 연결하다",
                desc: "왜 데스크톱까지 이어야 하는가, 무엇을 연결하고 무엇은 대체하지 않는가",
                href: "/blog/xgen-dex-desktop-connect",
            },
            {
                label: "XGEN DeX 설치부터 첫 업무까지 — 여섯 단계",
                desc: "설치·Agent 제작·PC 연결·권한·업무 지시까지 실제 화면과 함께",
                href: "/blog/xgen-dex-install-guide",
            },
        ],
        closingTitle: "XGEN에서 Agent를 만들고, DeX로 실제 업무를 완성합니다",
        closingLead:
            "설치부터 첫 업무까지 여섯 단계입니다. 도입 검토나 데모가 필요하시면 언제든 문의해 주세요.",
        closingTrial: "무료 체험 신청",
        closingContact: "도입 · 데모 문의",
    },
    en: {
        ldDescription:
            "XGEN DeX is the desktop interface that connects AI agents running on the XGEN Server to the working environment on a user's PC, carrying out real work and producing deliverables from files and applications within an allowed scope.",
        heroBadge: "XGEN · DeX",
        heroTitle: "Not an AI that stops at the conversation — one that finishes the work",
        heroLead:
            "XGEN DeX is an execution platform that connects AI models, in-house knowledge, and local and remote working environments. It reads a request in plain language, wires up the tools and environment it needs, and finishes with a deliverable you can verify.",
        ctaTrial: "Start the free trial",
        ctaGuide: "Read the install guide",
        guideHref: "/blog/xgen-dex-install-guide",
        pillars: [
            [
                "Governed centrally, executed where the work is",
                "Define agents, knowledge, tools, and permissions once in XGEN and the whole organization works from the same baseline. Departmental AI stops fragmenting, and who can reach what stays inside your management framework.",
            ],
            [
                "Your working environment stays as it is",
                "Excel, the browser, in-house applications — all stay in place. This adds execution to the environment you already have rather than migrating you to a new system, so switching and training costs stay near zero.",
            ],
            [
                "It ends in a deliverable, not an answer",
                "Analyzing, writing the document, and saving it to the right folder are all one request. The hand-carrying in between disappears, and the hours actually come down.",
            ],
        ],
        whatTitle: "What is XGEN DeX?",
        whatLead: [
            "XGEN DeX (Desktop Experience) is an installable desktop interface",
            "that connects XGEN's AI agents with a user's real working environment.",
        ],
        taskSteps: [
            ["Request", "State the goal and scope in plain language"],
            ["Orchestrate", "Assemble the models and tools it needs"],
            ["Execute", "Run inside the scope you approved"],
            ["Deliver", "Finish with a deliverable you can verify"],
        ],

        connectTitle: "What does it connect?",
        connectLead:
            "DeX is not tied to one model or one tool. It connects whatever the task needs, when the task needs it.",
        connects: [
            ["Multiple models", "Pick the AI that fits the cost and performance the task calls for. Change the model and the workflow stays."],
            ["Business connectors", "Reach the SaaS and in-house data you already run, through explicit API contracts."],
            ["Local bridge", "Handle files and applications on the user's PC, inside the scope you approved."],
        ],

        whyTitle: "Why is it needed?",
        whyLead:
            "AI generates the answer. But enterprise work is finished on the user's PC — handling files and applications, and producing the deliverable. Three breaks sit in between.",
        gapHead: ["The challenge", "What happens today", "What it costs the business"],
        gaps: [
            ["Disconnected tools", "AI, documents, and data tools are each used separately", "Switching cost and rework go up"],
            ["Disconnected execution", "After the AI answers, the actual work is done by hand", "Lead time and errors go up"],
            ["Disconnected control", "Who ran what, with which permissions, is hard to track", "Security and audit burden goes up"],
        ],
        beforeLabel: "Where the usual way stops",
        before: [
            "Uploading and downloading files, over and over",
            "Opening Excel or PowerPoint to revise by hand",
            "Going back to the browser to search again",
            "Saving results and tidying folders, all manually",
        ],
        afterLabel: "What DeX changes",
        after: [
            "Uses the files and applications already on the PC",
            "Runs automatically with the tools and permissions connected",
            "Produces and saves the deliverable itself",
            "Keeps the thread of work going",
        ],
        flowTitle: "How you use it",
        flowLead: "Six steps from install to the first task.",
        steps: [
            ["Install DeX", "Run the installer to set up XGEN DeX."],
            ["Connect to XGEN", "Sign in with your account to reach the XGEN server."],
            ["Pick an agent", "Choose the agent the task calls for."],
            ["Connect the execution environment", "Connect files, browser, and tools, and grant the permissions needed."],
            ["Hand it work", "Ask in plain language and the agent carries it out."],
            ["Check and continue", "The deliverable lands in the synced folder and carries into the next task."],
        ],
        fitTitle: "Which work benefits most",
        fitLead: "Work where a person repeatedly moves between several programs and files.",
        fits: [
            "Data analysis and reporting",
            "Recurring reports and documents",
            "Post-meeting cleanup and summaries",
            "Document review and comparison",
            "Web research and sourcing",
            "Repetitive file handling and conversion",
            "Development task automation",
            "Internal systems and agents",
        ],
        valueTitle: "What DeX is built around",
        values: [
            [
                "It does not replace your existing tools",
                "Excel, PowerPoint, the browser — the tools people already know stay in use.",
            ],
            [
                "Server and local resources, each where they fit",
                "Central agent assets stay managed on the server; work that needs execution runs locally.",
            ],
            [
                "Work that continues",
                "Workspace and folder sync carry a result naturally into the next task.",
            ],
            [
                "Time back",
                "Repetitive work is automated, leaving room for what matters more.",
            ],
        ],
        govTitle: "Security and control for the enterprise",
        govLead: "Convenience comes with the control an enterprise needs.",
        govs: [
            "Who can use which agent",
            "Which data and tools an agent can reach",
            "Permissions granted explicitly, per execution environment",
            "A full record of operations and an audit log",
            "Detection and blocking of sensitive access and risky actions",
        ],
        govQuote: "Only the working environment and tools you allow get connected.",
        govQuoteSub: "A safe connection, and execution you can control.",

        rolloutTitle: "An eight-week phased rollout",
        rolloutLead:
            "It does not start with a company-wide switch. A short PoC establishes the value and the risk first; the scope widens after that.",
        rollout: [
            ["Weeks 1–2", "Assess and design", "Pick the first tasks · define policy · set the baseline"],
            ["Weeks 3–5", "Build the PoC", "Configure connectors · representative scenarios · user validation"],
            ["Weeks 6–7", "Stabilize", "Access control · audit review · operator training"],
            ["Week 8", "Hand over and expand", "Operational handover · KPI review · the roadmap after"],
        ],

        impactTitle: "What gets measured?",
        impactLead:
            "The effect of adopting AI is confirmed with data, not estimates. A baseline is measured before the pilot starts, and the same metrics are compared eight weeks later.",
        impacts: [
            ["Task lead time", "Up to 30% shorter", "Average time from request to finished deliverable"],
            ["Repetitive work", "Up to 20% less", "Time spent copying, tidying, and reformatting by hand"],
            ["Core task completion", "90% or higher", "Share of core scenarios finished without help"],
        ],
        impactNote:
            "The figures shown are the pilot's target metrics. Actual results vary with your processes, your baseline, and the scope of adoption — the targets are set together during the pre-adoption assessment.",
        packageTitle: "What adoption covers",
        packages: [
            ["Initial build", "Environment setup · system integration · scenario design"],
            ["Licensing", "By user count and model usage"],
            ["Operational support", "Handover and training, per the SLA and support scope"],
        ],
        readTitle: "More on XGEN key features",
        reads: [
            {
                label: "Easy Mode",
                desc: "No coding — an agent in about 90 seconds.",
                href: "/en/product#build",
                art: "easy-mode",
            },
            {
                label: "PathFinder",
                desc: "Connects existing web systems and APIs as tools an agent can use.",
                href: "/en/pathfinder",
                art: "pathfinder",
            },
            {
                label: "FloUI",
                desc: "Adaptive UI that builds the screen a question calls for, on the spot.",
                href: "/en/floui",
                art: "floui",
            },
        ],
        postsTitle: "Related XGEN DeX previews",
        posts: [
            {
                label: "XGEN DeX — the execution layer that reaches the desktop",
                desc: "Central control stays as it is, and the way people work does not change",
                href: "/en/blog/product-xgen-dex",
            },
            {
                label: "XGEN DeX — bringing enterprise AI agents into the actual desktop",
                desc: "Why the desktop has to be reached, what gets connected, and what is not replaced",
                href: "/en/blog/xgen-dex-desktop-connect",
            },
            {
                label: "XGEN DeX from install to first task — six steps",
                desc: "Install, build, connect, permissions, and the first request — with real screens",
                href: "/en/blog/xgen-dex-install-guide",
            },
        ],
        closingTitle: "Build the agent in XGEN, finish the work with DeX",
        closingLead:
            "Six steps from install to the first task. For an adoption conversation or a demo, get in touch any time.",
        closingTrial: "Start the free trial",
        closingContact: "Talk to us",
    },
};

export function XgenDexPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const en = locale === "en";
    const href = (path: string) => localeHref(locale, path);
    const home = en ? "/en" : "/";

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Product", path: en ? "/en/product" : "/product" },
                        { name: "XGEN DeX", path: en ? "/en/xgen-dex" : "/xgen-dex" },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        name: "XGEN DeX",
                        alternateName: "XGEN Desktop Experience",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "Windows",
                        description: t.ldDescription,
                        url: absoluteUrl("/xgen-dex"),
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                ]}
            />

            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-4xl px-6 pt-16 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                        <MonitorSmartphone className="h-3.5 w-3.5 text-[#7dd3fc]" />
                        {t.heroBadge}
                    </p>
                    <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.heroTitle}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
                        {t.heroLead}
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href={href("/xgen-trial")}
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            {t.ctaTrial}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href={href(t.guideHref)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            {t.ctaGuide}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <main>
                {/* 무엇인가 — 서버 ↔ DeX ↔ PC */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.whatTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.whatLead.map((line, i) => (
                                <span key={line}>
                                    {i > 0 && <br className="hidden sm:block" />}
                                    {line}{i < t.whatLead.length - 1 ? " " : ""}
                                </span>
                            ))}
                        </p>

                        <div className="mx-auto mt-12 max-w-4xl">
                            <DexConceptArt locale={locale} />
                        </div>

                        {/*
                          요청 하나가 결과물이 되기까지. 아래 「사용 흐름」이 설치부터
                          첫 업무까지를 다룬다면, 이쪽은 업무 하나가 도는 주기다 —
                          같은 그림을 두 번 그리지 않도록 축을 다르게 둔다.
                        */}
                        <ol className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {t.taskSteps.map(([label, desc], i) => (
                                <li
                                    key={label}
                                    className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#4a6aa8]">
                                        Step {i + 1}
                                    </p>
                                    <p className="mt-2 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {label}
                                    </p>
                                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {desc}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 세 기둥 — 관리 · 연결 · 실행 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <ul className="grid gap-4 md:grid-cols-3">
                            {t.pillars.map(([title, desc], i) => {
                                const Art = DEX_PILLAR_ART[i];
                                return (
                                    <li
                                        key={title}
                                        className="flex min-w-0 flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7"
                                    >
                                        {/*
                                          제목이 먼저다. 그림을 위에 두면 세 카드가
                                          같은 크기의 회색 판 셋으로 먼저 보이고,
                                          무슨 이야기인지는 그 아래를 읽어야 알았다.
                                        */}
                                        <h2 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {title}
                                        </h2>
                                        <p className="mt-2.5 mb-6 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                        {/* 그림은 바닥에 붙인다 — 설명 길이가 달라도 세 장이 한 줄로 맞는다 */}
                                        <div className="mt-auto rounded-xl bg-[var(--color-surface-alt)] px-6 py-5">
                                            <Art />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* 무엇을 연결하나 — 멀티 모델 · 업무 커넥터 · 로컬 브리지 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.connectTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.connectLead}
                        </p>
                        <ul className="mt-10 grid gap-4 md:grid-cols-3">
                            {t.connects.map(([title, desc], i) => {
                                const Icon = CONNECT_ICONS[i];
                                return (
                                    <li
                                        key={title}
                                        className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-7"
                                    >
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {title}
                                        </h3>
                                        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* 사용 흐름 6단계 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.flowTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.flowLead}
                        </p>
                        {/* 세로형이라 폭까지 다 쓰면 단계가 과하게 커진다 — 본문 폭에 맞춘다 */}
                        <div className="mx-auto mt-4 max-w-3xl">
                            <DexFlowArt locale={locale} />
                        </div>
                    </div>
                </section>

                {/* 왜 필요한가 — 한계 vs 해결 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.whyTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.whyLead}
                        </p>

                        {/*
                          단절 세 가지 — 아래 before/after 가 사용자의 하루라면,
                          이 표는 그것이 사업에 얼마로 돌아오는지를 말한다. 도입을
                          결재하는 쪽이 찾는 건 후자다.
                        */}
                        <div className="mt-10 overflow-x-auto">
                            <table className="w-full min-w-[640px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-[var(--color-line)]">
                                        {t.gapHead.map((h) => (
                                            <th
                                                key={h}
                                                scope="col"
                                                className="px-5 py-3 font-mono text-[11.5px] uppercase tracking-widest text-[var(--color-ink-subtle)]"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {t.gaps.map(([task, problem, impact]) => (
                                        <tr
                                            key={task}
                                            className="border-b border-[var(--color-line)] last:border-0"
                                        >
                                            <th
                                                scope="row"
                                                className="whitespace-nowrap px-5 py-5 align-top text-[15.5px] font-bold tracking-tight text-[#2461d8]"
                                            >
                                                {task}
                                            </th>
                                            <td className="px-5 py-5 align-top text-[14.5px] leading-relaxed text-[var(--color-ink)]">
                                                {problem}
                                            </td>
                                            <td className="px-5 py-5 align-top text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {impact}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
                            <div className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7">
                                <p className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink-muted)]">
                                    {t.beforeLabel}
                                </p>
                                <div className="mt-5">
                                    <DexWhyBeforeArt />
                                </div>
                                <ul className="mt-5 space-y-3.5">
                                    {t.before.map((b) => (
                                        <li key={b} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-line)] text-[var(--color-ink-subtle)]">
                                                <X className="h-3 w-3" />
                                            </span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center justify-center py-1 lg:py-0">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2f7bff]/10 text-[#2461d8]">
                                    <ArrowRight className="hidden h-5 w-5 lg:block" />
                                    <ArrowDown className="h-5 w-5 lg:hidden" />
                                </span>
                            </div>

                            <div className="min-w-0 rounded-2xl border border-[#bcd0f5] bg-white p-7">
                                <p className="text-[15.5px] font-bold tracking-tight text-[#2461d8]">
                                    {t.afterLabel}
                                </p>
                                <div className="mt-5">
                                    <DexWhyAfterArt />
                                </div>
                                <ul className="mt-5 space-y-3.5">
                                    {t.after.map((a) => (
                                        <li key={a} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--color-ink)]">
                                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2f7bff]/10 text-[#2461d8]">
                                                <Check className="h-3 w-3" />
                                            </span>
                                            {a}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 적용 업무 + 핵심 가치 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                            <div className="min-w-0">
                                <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                                    {t.fitTitle}
                                </h2>
                                <p className="mt-4 text-center text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.fitLead}
                                </p>
                                <ul className="mt-7 space-y-2.5">
                                    {t.fits.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-[14.5px] text-[var(--color-ink-muted)]">
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7bff]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                                    {t.valueTitle}
                                </h2>
                                <ul className="mt-7 space-y-4">
                                    {t.values.map(([title, desc], i) => {
                                        const Icon = VALUE_ICONS[i];
                                        return (
                                            <li key={title} className="flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                    <Icon className="h-5 w-5" />
                                                </span>
                                                <div className="min-w-0">
                                                    <h3 className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                                        {title}
                                                    </h3>
                                                    <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                                        {desc}
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8주 도입안 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.rolloutTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.rolloutLead}
                        </p>

                        <ol className="mx-auto mt-12 max-w-4xl">
                            {t.rollout.map(([when, phase, detail], i) => (
                                <li
                                    key={phase}
                                    className="grid gap-2 border-l-2 border-[#2f7bff] py-5 pl-6 sm:grid-cols-[104px_180px_1fr] sm:items-baseline sm:gap-6"
                                >
                                    <span className="font-mono text-[13px] font-semibold text-[#2461d8]">
                                        {when}
                                    </span>
                                    <span className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {phase}
                                    </span>
                                    <span className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {detail}
                                    </span>
                                    {/* 마지막 칸은 아래 선을 잇지 않는다 — 여기서 끝난다 */}
                                    {i < t.rollout.length - 1 && <span className="sr-only" />}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 무엇을 측정하나 — 목표치와 그 목표를 검증하는 방식 */}
                {SHOW_IMPACT && (
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.impactTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.impactLead}
                        </p>

                        <ul className="mt-10 grid gap-4 md:grid-cols-3">
                            {t.impacts.map(([item, target, desc], i) => {
                                const Art = DEX_KPI_ART[i];
                                return (
                                    <li
                                        key={item}
                                        className="flex min-w-0 flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7"
                                    >
                                        {/*
                                          측정 항목이 먼저, 목표가 그다음. 제목이
                                          「무엇을 측정하나요?」이므로 카드도 항목으로
                                          답해야 두 줄이 이어진다.
                                        */}
                                        <p className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {item}
                                        </p>
                                        <p className="mt-2 text-[26px] font-bold leading-tight tracking-tight text-[#2461d8]">
                                            {target}
                                        </p>
                                        <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                        {/* 기준값 대비 목표 — 수치가 무엇에 견준 값인지 그림으로 남긴다 */}
                                        <div className="mt-auto pt-6">
                                            <Art />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        {/*
                          수치를 크게 적어 두면 이미 달성한 실적처럼 읽힌다. 파일럿에서
                          검증할 목표라는 것을 바로 아래에서 분명히 해 둔다 — 검토하는
                          쪽이 나중에 알게 되면 그때까지의 신뢰가 함께 깎인다.
                        */}
                        <p className="mx-auto mt-6 max-w-3xl rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-6 py-4 text-center text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.impactNote}
                        </p>

                        <h3 className="mt-16 text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.packageTitle}
                        </h3>
                        <ul className="mx-auto mt-7 max-w-4xl">
                            {t.packages.map(([name, detail]) => (
                                <li
                                    key={name}
                                    className="grid gap-1 border-b border-[var(--color-line)] py-4 last:border-0 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-6"
                                >
                                    <span className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {name}
                                    </span>
                                    <span className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                )}

                {/*
                  보안과 통제 — 아직 구현 전이라 감춰 둔다. 문구와 마크업은 그대로
                  두고 SHOW_GOVERNANCE 만 true 로 바꾸면 다시 나온다. 지우면 나중에
                  다시 쓰는 문장을 처음부터 써야 한다.
                */}
                {SHOW_GOVERNANCE && (
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.govTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.govLead}
                        </p>
                        <ul className="mt-8 grid gap-3 md:grid-cols-2">
                            {t.govs.map((g) => (
                                <li key={g} className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 text-[14.5px] leading-relaxed text-[var(--color-ink)]">
                                    <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#2461d8]" />
                                    {g}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 rounded-2xl border border-[#cfe0ff] bg-[#f3f7ff] px-8 py-7 text-center">
                            <p className="text-[18px] font-bold tracking-tight text-[#1f4fa8]">
                                “{t.govQuote}”
                            </p>
                            <p className="mt-2 text-[14.5px] text-[var(--color-ink-muted)]">
                                {t.govQuoteSub}
                            </p>
                        </div>
                    </div>
                </section>
                )}

                {/*
                  관련 프리뷰 → 핵심 기능 순. DeX 를 읽고 온 사람에게는 DeX 이야기를
                  더 주는 쪽이 먼저고, 다른 기능으로 건너가는 문은 그 뒤에 둔다.
                */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.postsTitle}
                        </h2>
                        <ul className="mt-7 grid gap-4 md:grid-cols-3">
                            {t.posts.map((r) => (
                                <li key={r.href} className="min-w-0">
                                    <Link
                                        href={r.href}
                                        className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7 transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                    >
                                        <h3 className="text-[16.5px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                            {r.label}
                                        </h3>
                                        <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {r.desc}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                            {en ? "Read" : "읽어보기"}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h2 className="mt-16 text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                            {t.readTitle}
                        </h2>
                        {/* 세 장이라 3단 1열 — 두 열로 두면 마지막 한 장이 혼자 남는다 */}
                        <ul className="mt-7 grid gap-4 md:grid-cols-3">
                            {t.reads.map((r) => (
                                <li key={r.href} className="min-w-0">
                                    <Link
                                        href={r.href}
                                        className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                    >
                                        {/* /product 특장점 카드와 같은 그림 — 두 화면이 어긋나지 않는다 */}
                                        <div className="mb-5">
                                            <FeatureArt art={r.art} locale={locale} />
                                        </div>
                                        <h3 className="text-[16.5px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                            {r.label}
                                        </h3>
                                        <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {r.desc}
                                        </p>
                                        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                            {en ? "Learn more" : "자세히 보기"}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 마무리 */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
                        <h2 className="text-2xl font-bold tracking-tight md:text-[32px]">
                            {t.closingTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            {t.closingLead}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href={href("/xgen-trial")}
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white transition hover:brightness-110"
                            >
                                {t.closingTrial}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href={href("/contact") + "?type=demo&from=xgen-dex"}
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                {t.closingContact}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
