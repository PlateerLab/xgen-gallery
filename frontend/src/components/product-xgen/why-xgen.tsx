"use client";

/**
 * /product/xgen 마케팅 섹션 — xgen.im/WhyXGEN 페이지의 서사(AX Evolution·6 Capabilities·역할)를
 * 랩스 톤으로 옮긴 것. 과장·단정 표현은 기능·적용 범위 중심으로 바꿨다.
 * 모션: 히어로 순차 등장·파티클 흐름, 결정적 차이 문장 단어 단위 등장,
 * 진화 4단계 진행선·순환 하이라이트, 역량 카드 순차 등장, 역할 탭 자동 순환.
 * prefers-reduced-motion 이면 모두 정지 상태로 보인다.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    ChevronDown,
    BookOpen,
    Workflow,
    Scale,
    Network,
    Activity,
    ShieldCheck,
    Layers,
    SlidersHorizontal,
    User,
    Wrench,
    Settings2,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-path";

function useReduced() {
    const [r, setR] = useState(false);
    useEffect(() => {
        setR(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    }, []);
    return r;
}

function useInView<T extends HTMLElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setV(true);
            return;
        }
        const io = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && (setV(true), io.disconnect())),
            { threshold, rootMargin: "0px 0px -8% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return [ref, v] as const;
}

/* 화면에 들어올 때마다 다시 재생 — 완전히 벗어나면 초기화한다(동작 줄이기 땐 항상 보인 상태). */
function useInViewRepeat<T extends HTMLElement>(threshold = 0.35) {
    const ref = useRef<T>(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setV(true);
            return;
        }
        const io = new IntersectionObserver(
            (es) =>
                es.forEach((e) => {
                    if (e.intersectionRatio >= threshold) setV(true);
                    else if (!e.isIntersecting) setV(false);
                }),
            { threshold: [0, threshold] },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return [ref, v] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const [ref, v] = useInView<HTMLDivElement>();
    return (
        <div
            ref={ref}
            style={{ transitionDelay: v ? `${delay}ms` : "0ms" }}
            className={`reveal${v ? " reveal-in" : ""}${className ? " " + className : ""}`}
        >
            {children}
        </div>
    );
}

/* ---------------- copy ---------------- */

const COPY = {
    ko: {
        heroEyebrow: "XGEN · 기업형 에이전틱 AI 플랫폼",
        heroTitleA: "‘자율적으로 일하는 AI’를 넘어,",
        heroTitleB: "기업의 통제 아래, 사용자 업무 환경까지 확장해",
        heroTitleC: "스스로 일하고 개선되는 AI Agent",
        heroSub: "도입에서 멈추지 않고, 운영으로 이어지는 기업 AI",
        heroLead:
            "XGEN은 기업 AI를 단계적으로 진화시키는 AX Evolution Platform입니다. 한 번 만든 Agent와 지식, 도구를 운영 자산으로 쌓아 다음 업무로 확장합니다.",
        heroCta1: "데모 요청하기",
        heroCta2: "15일 무료 체험",
        heroStages: ["이해", "실행", "협업", "진화"],
        heroAlt: "XGEN 캔버스 화면이 떠 있는 모니터 두 대",
        edgeEyebrow: "Core Value",
        edgeTitle: "AI의 가능성은 넓히고,\n기업의 주도권은 지킵니다.",
        edgeLead: "데이터와 모델의 선택부터 AI Agent의 실행과 확장까지,\n기업이 주도하는 AI 환경을 구현합니다.",
        edgePoints: [
            {
                label: "Data Sovereignty",
                title: "데이터 주권",
                head: "기업의 데이터는 기업의 자산입니다.",
                desc: "온프레미스와 망분리 환경을 지원해 민감한 데이터를 외부로 반출하지 않고도 AI를 활용할 수 있습니다.",
            },
            {
                label: "Model Freedom",
                title: "기술 선택권",
                head: "특정 모델에 종속되지 않습니다.",
                desc: "상용 LLM과 사내 AI 모델을 업무 특성에 맞게 선택하고, 기술 변화에 따라 유연하게 전환할 수 있습니다.",
            },
            {
                label: "Enterprise Governance",
                title: "운영 통제권",
                head: "AI의 자율성은 높이고, 통제권은 기업에.",
                desc: "독립된 실행 환경, 접근 권한, 가드레일, 승인 및 감사 체계를 통해 기업의 기준에 맞게 AI Agent를 운영합니다.",
            },
            {
                label: "Open Ecosystem",
                title: "업무 확장성",
                head: "기존 AI 자산을 넘어 더 넓은 업무로.",
                desc: "사내 시스템과 타 플랫폼 Agent까지 연결해 기존 투자를 활용합니다. DexOn에서는 현업이 대화만으로 Agent와 App을 만듭니다.",
            },
        ],
        diffEyebrow: "The Decisive Difference",
        diffTitle: "XGEN이 만드는 결정적 차이",
        diffStatement:
            "XGEN은 업무와 환경의 변화를 흡수해 진화로 바꾸고, 한 번 구축한 AI를 기업의 운영 자산으로 쌓습니다.",
        diffPoints: [
            ["구축이 아닌 운영", "PoC에서 끝나지 않고, 배포·모니터링·개선까지 같은 플랫폼에서 이어집니다."],
            ["흩어진 프로젝트가 아닌 자산", "Agent·지식·도구를 공유해 다음 업무에서 다시 씁니다."],
            ["고정된 결과가 아닌 개선", "실행 기록과 평가를 바탕으로 작업 방식을 고쳐 나갑니다."],
        ],
        evoEyebrow: "AX Evolution Model",
        evoTitle: "한 번 구축하면, 계속되는 진화",
        evoLeadA: "기업 AI는 ",
        evoLeadPath: "이해 → 실행 → 협업 → 진화",
        evoLeadB: "로 단계적으로 성장합니다. XGEN은 각 단계에 필요한 역량을 제공합니다.",
        stages: [
            { no: "01", ko: "이해", en: "Assisted", desc: "질문에 답하고 사내 문서를 이해합니다.", tags: ["Knowledge · RAG", "Ontology"] },
            { no: "02", ko: "실행", en: "Augmented", desc: "시스템과 연결해 업무를 대신 수행합니다.", tags: ["Agentflow", "MCP·API"] },
            { no: "03", ko: "협업", en: "Autonomous", desc: "여러 Agent가 역할을 나눠 함께 처리합니다.", tags: ["Multi-Agent", "A2A"] },
            { no: "04", ko: "진화", en: "Self-Evolving", desc: "실행 기록과 평가를 바탕으로 작업 방식을 개선합니다.", tags: ["Geny", "LLMOps"] },
        ],
        capEyebrow: "6 Capabilities",
        capTitle: "진화의 각 단계를 떠받치는 XGEN의 핵심 역량",
        caps: [
            { en: "Knowledge", ko: "쌓일수록 깊어지는 기업 지식", desc: "온톨로지로 업무 개념과 관계를 정의해 문서를 의미 단위로 다시 읽습니다. Vector와 Graph를 함께 쓰는 하이브리드 구조로 답의 근거와 관계를 같이 찾습니다.", chips: [["Ontology RAG", 1], ["Graph DB", 0], ["Dynamic Top-K", 0]] },
            { en: "Workflow", ko: "현업이 직접 만드는 업무 Agent", desc: "DexOn에서 사용자의 PC 환경에서도 AI Agent를 활용하고, Geny에게 자연어 대화만으로 Agent와 업무용 App을 개발할 수 있습니다. 캔버스 기반의 워크플로우 설계와 MCP·API 연동을 지원해 기존 시스템과 업무 자산도 유연하게 활용할 수 있습니다.", chips: [["DexOn", 1], ["Vibe Coding", 1], ["Agent Builder", 0]] },
            { en: "Operations", ko: "쓸수록 똑똑해지는 운영 엔진", desc: "실시간 모니터링과 평가·피드백 루프로 성능을 관리하고 실행 이력을 추적합니다. Geny는 대화마다 작업 방식을 돌아보고 다음 실행에 반영합니다.", chips: [["Geny", 1], ["LLMOps", 0], ["Evidence", 0]] },
            { en: "Model", ko: "검증을 거쳐 판단하는 추론 체계", desc: "목적에 맞는 모델을 고르고, 다단계 검증과 Judge 평가로 판단의 일관성을 높입니다.", chips: [["Harness Engineering", 1], ["Multi-LLM", 0]] },
            { en: "Governance", ko: "폐쇄망에서도 지키는 데이터 주권", desc: "RBAC/ABAC 접근 제어, 다계층 가드레일, 결재선과 AI 위험도 심사를 온프레미스 환경에 적용합니다.", chips: [["결재선·위험도 심사", 1], ["RBAC/ABAC", 0], ["감사 로그", 0]] },
            { en: "Orchestration", ko: "플랫폼의 경계를 넘어, 더 큰 업무 역량으로", desc: "여러 AI Agent가 각자의 전문성을 바탕으로 협업하고, 다른 플랫폼에서 개발한 Agent까지 연결해 활용합니다. 특정 플랫폼에 종속되지 않는 유연한 실행 환경으로 기업의 AI 활용 범위를 확장합니다.", chips: [["MCP Compiler", 1], ["SDK", 0], ["A2A", 0], ["Multi-Agent", 0]] },
        ],
        rolesEyebrow: "For Every Role",
        rolesTitle: "각자의 역할에만 집중할 수 있는 환경",
        rolesLead: "기획자도, 개발자도, 관리자도. XGEN은 각자의 자리에서 AI를 쓰고, 만들고, 통제할 수 있게 합니다.",
        roles: [
            { tag: "임직원·대고객", ko: "일반 사용자", desc: "대화형 Agent에게 물으면 검색·요약·문서 활용부터 실제 업무 실행까지 이어집니다. 코드를 몰라도 DexOn에서 Geny에게 말로 요청하는 바이브코딩으로 필요한 Agent와 App을 직접 만들 수 있습니다. 결과는 근거와 함께 검토합니다.", img: "/product/screen-teams.png", alt: "대화형 Agent 사용 화면" },
            { tag: "기획자·현업", ko: "Agent 개발자", desc: "캔버스로 워크플로우를 설계하고 API는 도구로 등록합니다. 바이브코딩으로 시작한 결과물도 코드를 직접 작성·수정하는 풀코딩으로 이어갈 수 있습니다. 테스트부터 배포까지 하나의 흐름으로 진행합니다.", img: "/product/agent-builder-canvas.png", alt: "Agent 빌더 캔버스 화면" },
            { tag: "IT·보안", ko: "플랫폼 관리자", desc: "권한(RBAC/ABAC), 보안 정책, 감사 로그, 모니터링, 배포 승인을 한곳에서 운영합니다. 폐쇄망에서도 같은 방식으로 관리합니다.", img: "/product/operations-dashboard.png", alt: "운영 대시보드 화면" },
        ],
    },
    en: {
        heroEyebrow: "XGEN · Enterprise Agentic AI Platform",
        heroTitleA: "Beyond ‘AI that works on its own’,",
        heroTitleB: "under enterprise control, extending into users’ workspaces —",
        heroTitleC: "AI agents that work and improve on their own",
        heroSub: "Enterprise AI that keeps going after adoption — into operation",
        heroLead:
            "XGEN is an AX Evolution Platform that grows enterprise AI step by step. Agents, knowledge and tools you build become operational assets you extend to the next workload.",
        heroCta1: "Request a demo",
        heroCta2: "15-day free trial",
        heroStages: ["Understand", "Execute", "Collaborate", "Evolve"],
        heroAlt: "Two monitors showing the XGEN canvas",
        edgeEyebrow: "Core Value",
        edgeTitle: "Expand what AI can do,\nkeep your enterprise in charge.",
        edgeLead: "From choosing data and models to running and scaling AI agents,\nXGEN builds an AI environment your enterprise leads.",
        edgePoints: [
            {
                label: "Data Sovereignty",
                title: "Own your data",
                head: "Your data is your asset.",
                desc: "With support for on-premise and air-gapped environments, you can use AI without sending sensitive data outside.",
            },
            {
                label: "Model Freedom",
                title: "Freedom to choose",
                head: "No lock-in to a single model.",
                desc: "Choose commercial LLMs and in-house AI models to fit each task, and switch as the technology changes.",
            },
            {
                label: "Enterprise Governance",
                title: "Control over operations",
                head: "More autonomy for AI, control stays with you.",
                desc: "Isolated execution environments, access permissions, guardrails, approval and audit keep AI agents running to your standards.",
            },
            {
                label: "Open Ecosystem",
                title: "Room to expand",
                head: "Beyond existing AI assets, into more work.",
                desc: "Connect in-house systems and agents from other platforms to reuse existing investments. In DexOn, business teams build agents and apps through conversation alone.",
            },
        ],
        diffEyebrow: "The Decisive Difference",
        diffTitle: "The difference XGEN makes",
        diffStatement:
            "XGEN absorbs change in your work and environment and turns it into evolution, building the AI you deploy into an operational asset.",
        diffPoints: [
            ["Operation, not just a build", "Deployment, monitoring and improvement continue on the same platform after the PoC."],
            ["Assets, not scattered projects", "Agents, knowledge and tools are shared and reused in the next workload."],
            ["Improvement, not fixed output", "Execution records and evaluations are used to refine how work gets done."],
        ],
        evoEyebrow: "AX Evolution Model",
        evoTitle: "Build once, keep evolving",
        evoLeadA: "Enterprise AI grows in stages: ",
        evoLeadPath: "understand → execute → collaborate → evolve",
        evoLeadB: ". XGEN provides the capabilities each stage needs.",
        stages: [
            { no: "01", ko: "Understand", en: "Assisted", desc: "Answers questions and understands internal documents.", tags: ["Knowledge · RAG", "Ontology"] },
            { no: "02", ko: "Execute", en: "Augmented", desc: "Connects to systems and carries out tasks.", tags: ["Agentflow", "MCP·API"] },
            { no: "03", ko: "Collaborate", en: "Autonomous", desc: "Multiple agents split roles and work together.", tags: ["Multi-Agent", "A2A"] },
            { no: "04", ko: "Evolve", en: "Self-Evolving", desc: "Refines how work is done from execution records and evaluations.", tags: ["Geny", "LLMOps"] },
        ],
        capEyebrow: "6 Capabilities",
        capTitle: "The core capabilities behind each stage",
        caps: [
            { en: "Knowledge", ko: "Enterprise knowledge that deepens as it grows", desc: "An ontology defines business concepts and relations, so documents are re-read by meaning. A hybrid Vector + Graph structure finds the evidence and the relations behind an answer.", chips: [["Ontology RAG", 1], ["Graph DB", 0], ["Dynamic Top-K", 0]] },
            { en: "Workflow", ko: "Business agents built by the business", desc: "In DexOn, use AI agents on your PC and build agents and business apps by describing them to Geny in natural language. Canvas workflows and MCP/API integration put existing systems and assets to work.", chips: [["DexOn", 1], ["Vibe Coding", 1], ["Agent Builder", 0]] },
            { en: "Operations", ko: "A self-improving operations engine", desc: "Real-time monitoring and evaluation-feedback loops manage performance and trace execution history. Geny reviews its approach after each conversation and applies it next time.", chips: [["Geny", 1], ["LLMOps", 0], ["Evidence", 0]] },
            { en: "Model", ko: "Reasoning that passes verification", desc: "Picks the model that fits the task and raises consistency with multi-step verification and judge evaluation.", chips: [["Harness Engineering", 1], ["Multi-LLM", 0]] },
            { en: "Governance", ko: "Data sovereignty, even air-gapped", desc: "Applies RBAC/ABAC access control, multi-layer guardrails, approval routes and AI risk review in on-premise environments.", chips: [["Approval & risk review", 1], ["RBAC/ABAC", 0], ["Audit log", 0]] },
            { en: "Orchestration", ko: "Beyond platform boundaries, toward greater capability", desc: "AI agents collaborate on their own expertise and connect with agents built on other platforms. A flexible runtime free of platform lock-in extends enterprise AI use.", chips: [["MCP Compiler", 1], ["SDK", 0], ["A2A", 0], ["Multi-Agent", 0]] },
        ],
        rolesEyebrow: "For Every Role",
        rolesTitle: "Everyone focuses on their own role",
        rolesLead: "Planners, developers and administrators each use, build and govern AI from where they sit.",
        roles: [
            { tag: "Employees · customers", ko: "End users", desc: "Ask a conversational agent and go from search, summaries and documents to actual task execution. Without writing code, users can build the agents and apps they need through vibe coding in DexOn, simply by describing them to Geny. Results are reviewed with their evidence.", img: "/product/screen-teams.png", alt: "Conversational agent screen" },
            { tag: "Planners · business", ko: "Agent builders", desc: "Design workflows on the canvas and register APIs as tools. Work started with vibe coding can continue as full coding, writing and editing the code directly. Testing through deployment runs in a single flow.", img: "/product/agent-builder-canvas.png", alt: "Agent builder canvas" },
            { tag: "IT · security", ko: "Platform admins", desc: "Run permissions (RBAC/ABAC), security policy, audit logs, monitoring and deployment approval in one place — the same way in air-gapped networks.", img: "/product/operations-dashboard.png", alt: "Operations dashboard" },
        ],
    },
} as const;

const CAP_ICONS = [BookOpen, Workflow, Activity, Scale, ShieldCheck, Network];
const ROLE_ICONS = [User, Wrench, Settings2];

/* ---------------- Hero ---------------- */

export function WhyXgenHero({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const [stage, setStage] = useState(0);
    const reduced = useReduced();
    useEffect(() => {
        if (reduced) return;
        const id = setInterval(() => setStage((s) => (s + 1) % 4), 2200);
        return () => clearInterval(id);
    }, [reduced]);
    return (
        <section
            data-nav-theme="dark"
            className="kv-hero why-hero-tall relative overflow-hidden bg-black text-white"
        >
            {/* 배경 — 검정 바탕 위 파티클 흐름 (xgen.im 키비주얼) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(62%_52%_at_50%_40%,rgba(0,0,0,0.58),rgba(0,0,0,0.22)_62%,rgba(0,0,0,0)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0.35)_16%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_82%,#000_100%)]" />
            </div>

            <div className="kv-fill relative mx-auto flex min-h-[880px] w-full max-w-7xl flex-col items-center px-6 pb-16 lg:pb-24 pt-[calc(var(--nav-h,84px)+64px)] text-center lg:pt-[calc(var(--nav-h,84px)+88px)]">
                <p className="why-in why-d1 font-mono text-[13px] uppercase tracking-[0.18em] text-white/75 md:text-[14px]">
                    {t.heroEyebrow}
                </p>
                <h1 className="why-in why-d2 mt-5 text-[30px] font-bold leading-[1.2] tracking-tight [word-break:keep-all] md:text-[46px]">
                    {t.heroTitleA}
                    <br />
                    <span className="text-white/85">{t.heroTitleB}</span>
                    <br />
                    <span className="bg-gradient-to-r from-[#5fd0ff] via-[#7aa8ff] to-[#b49cff] bg-clip-text text-transparent">
                        {t.heroTitleC}
                    </span>
                </h1>
                <p className="why-in why-d3 mt-6 text-[18px] font-semibold text-white/90 [word-break:keep-all] md:text-[21px]">{t.heroSub}</p>
                <p className="why-in why-d4 mt-3 max-w-2xl text-[15.5px] leading-relaxed text-white/65 [word-break:keep-all]">{t.heroLead}</p>
                <div className="why-in why-d5 mt-9 flex flex-wrap justify-center gap-3">
                    <Link
                        href={localeHref(locale, "/contact") + "?type=demo&from=product-hero"}
                        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.55)] transition hover:brightness-110"
                    >
                        {t.heroCta1}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href={localeHref(locale, "/xgen-trial")}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
                    >
                        {t.heroCta2}
                    </Link>
                </div>

                {/* AX 진화 4단계 — 파티클 띠의 색 흐름(회색→노랑→보라→시안)과 같은 순서로 순환 */}
                {/* 물결 띠 — 데모 요청하기 버튼과 4단계 바 사이 정중앙에 XGEN */}
                <div className="why-in why-d5 relative mt-10 flex min-h-[220px] w-full max-w-5xl flex-1 items-center justify-center sm:min-h-[300px] lg:min-h-[340px]">
                    <div aria-hidden className="why-band pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-screen -translate-x-1/2 -translate-y-1/2 sm:h-[360px] lg:h-[440px]">
                        <video className="h-full w-full object-cover" src="/product/why/hero-td310-aurora.mp4" poster="/product/why/hero-td310-aurora-poster.jpg" autoPlay muted loop playsInline preload="auto" />
                    </div>
                    <p className="why-band-word why-band-in relative select-none text-[64px] font-black leading-none tracking-[-0.03em] sm:text-[88px] lg:text-[112px]">XGEN</p>
                </div>

                <div className="why-in why-d5 mt-8 grid w-full max-w-4xl grid-cols-4 gap-2">
                    {t.heroStages.map((s, i) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                            <span
                                className={`h-[3px] w-full rounded-full transition duration-700 ${
                                    i === stage ? "bg-[linear-gradient(90deg,#00acee,#185aea)]" : i < stage ? "bg-white/35" : "bg-white/12"
                                }`}
                            />
                            <span
                                className={`text-[13px] font-semibold transition duration-500 sm:text-[14.5px] ${
                                    i === stage ? "text-white" : i < stage ? "text-white/70" : "text-white/40"
                                }`}
                            >
                                {String(i + 1).padStart(2, "0")} {s}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------- Edge (상단 4 Core Values) ---------------- */

/* 히어로 바로 아래 — 기업이 AI 주도권을 지키는 4가지 가치(데이터 주권·기술 선택권·운영 통제권·업무 확장성).
   --color-bg-50 바탕·가로선만, 둥근 카드 없음. 620px 이하 한 열, 621px 이상 두 열. */
const EDGE_ICONS = [ShieldCheck, Layers, SlidersHorizontal, Network];

export function WhyXgenEdge({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <section
            id="edge"
            aria-labelledby="xgen-edge-title"
            className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-b border-[var(--color-line)] bg-[var(--color-bg-50,#f7f8fa)] text-[var(--color-ink)]"
        >
            <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-[#2f7bff]">{t.edgeEyebrow}</p>
                    <h2 id="xgen-edge-title" className="mt-3 whitespace-pre-line text-[24px] font-bold leading-[1.35] tracking-tight [word-break:keep-all] md:text-[34px]">
                        {t.edgeTitle}
                    </h2>
                    <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all] md:text-[16px]">{t.edgeLead}</p>
                </div>
                <div className="mt-10 grid border-t border-[var(--color-line)] pt-3 min-[621px]:grid-cols-2 min-[621px]:gap-x-12 lg:mt-12">
                    {t.edgePoints.map((p, i) => {
                        const Icon = EDGE_ICONS[i];
                        return (
                            <Reveal key={p.label} delay={(i % 2) * 100} className="py-7">
                                <Icon aria-hidden className="h-7 w-7 text-[#2f7bff]" strokeWidth={1.75} />
                                <p className="mt-3 text-[12.5px] uppercase tracking-wider text-[var(--color-ink-subtle)]">
                                    {String(i + 1).padStart(2, "0")} · {p.label}
                                </p>
                                <h3 className="mt-2 text-[20px] font-bold tracking-tight [word-break:keep-all]">{p.title}</h3>
                                <p className="mt-3 text-[15px] font-bold tracking-tight [word-break:keep-all]">{p.head}</p>
                                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">{p.desc}</p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ---------------- Decisive difference ---------------- */

/* 히어로와 같은 오로라 물결 영상 — 화면에 보일 때만 재생하고, 첫 로드 오류(같은 파일 동시 요청 등)는 한 번 다시 불러온다. 동작 줄이기 설정이면 포스터 정지 화면. */
function AuroraBandVideo() {
    const ref = useRef<HTMLVideoElement>(null);
    const reduced = useReduced();
    useEffect(() => {
        const v = ref.current;
        if (!v || reduced) return;
        let retried = false;
        const onError = () => {
            if (retried) return;
            retried = true;
            v.load();
        };
        v.addEventListener("error", onError);
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) v.play().catch(() => {});
                else v.pause();
            },
            { threshold: 0.1 },
        );
        io.observe(v);
        return () => {
            io.disconnect();
            v.removeEventListener("error", onError);
        };
    }, [reduced]);
    return (
        <video
            ref={ref}
            className="h-full w-full object-cover"
            src="/product/why/hero-td310-aurora.mp4"
            poster="/product/why/hero-td310-aurora-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
        />
    );
}

/* 결정적 차이 배경 — Adobe Stock 235705006(은회색 실크가 광택 있게 물결치는 실사, 무료 라이선스, 4800px→2400px).
   그레이 톤 유지: 흑백 후 명도 170~248 범위(중앙값 ≈ #e4e6ea, 약간 차가운 톤)로 이미지 파일에 미리 입혀 CSS 필터·블렌드 없이 쓴다.
   결이 아주 천천히 비스듬히 흘러가듯 움직인다(동작 줄이기 땐 정지). 가운데는 밝은 회색 막으로 글 읽힘을 확보. */
function DecisiveSatinBg() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#e9ebef]">
            <img
                src="/product/why/decisive-silk.jpg"
                alt=""
                className="decisive-satin absolute inset-[-6%] h-[112%] w-[112%] max-w-none object-cover object-center"
                loading="lazy"
                decoding="async"
            />
            <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(236,238,241,0.6)_0%,rgba(233,235,239,0.25)_60%,rgba(233,235,239,0)_100%)]" />
        </div>
    );
}

export function WhyXgenDifference({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const [ref, v] = useInViewRepeat<HTMLParagraphElement>(0.35);
    const words = t.diffStatement.split(" ");
    return (
        <section
            id="difference"
            className="relative scroll-mt-[calc(var(--nav-h,84px)+58px)] overflow-hidden bg-[var(--color-bg-50,#f7f8fa)] text-[var(--color-ink)]"
        >
            {/* 배치 — 15일 체험 띠배너 바로 아래. 바로 위 「XGEN은 다릅니다」(다크 이미지)·히어로(오로라 영상)와 겹치지 않게
                그레이 톤 실사 실크(Adobe Stock, 흑백 처리) 배경. 전체 가운데 정렬, 1024px 미만은 포인트 한 열. */}
            <DecisiveSatinBg />
            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:py-[120px]">
                <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-[#7c5cff]">{t.diffEyebrow}</p>
                <h2 className="mt-3 text-[22px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[30px]">
                    {/* 제목 그라데이션 — 위 eyebrow(보라 #7c5cff)·번호(블루 #00acee→#185aea)와 같은 블루→보라 계열. 밝은 회색 바탕에서 읽히도록 진한 쪽 색만 쓴다 */}
                    <span className="bg-gradient-to-r from-[#0a84d6] via-[#185aea] to-[#7c5cff] bg-clip-text pb-[0.08em] text-transparent">{t.diffTitle}</span>
                </h2>
                <div className="relative mt-8 flex w-full items-center justify-center py-10 sm:py-14 lg:py-16">
                    <p ref={ref} className="relative max-w-5xl text-[26px] font-bold leading-[1.38] tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[40px]">
                        {words.map((w, i) => (
                            <span key={i}>
                                <span
                                    className={`why-word${v ? " why-word-in" : ""}`}
                                    style={{ transitionDelay: v ? `${120 + i * 95}ms` : "0ms" }}
                                >
                                    {w}
                                </span>
                                {/* 쉼표로 끝나는 단어 뒤에서 줄을 나눈다(KO/EN 공통) */}
                                {i < words.length - 1 ? (w.endsWith(",") ? <br /> : " ") : ""}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="mt-8 grid w-full border-t border-[var(--color-line)] bg-white/70 backdrop-blur-sm lg:mt-12 lg:grid-cols-3">
                    {t.diffPoints.map(([h, d], i) => (
                        <Reveal key={h} delay={i * 120} className="border-b border-[var(--color-line)] px-4 py-7 last:border-b-0 lg:border-b-0 lg:px-8">
                            <span className="block font-mono text-[13px] font-bold text-[#2f7bff]">0{i + 1}</span>
                            <h3 className="mt-2 text-[18px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{h}</h3>
                            <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">{d}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------- AX Evolution ---------------- */

export function WhyXgenEvolution({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const [ref, v] = useInView<HTMLDivElement>(0.2);
    const reduced = useReduced();
    const [cur, setCur] = useState(-1);
    useEffect(() => {
        if (!v) return;
        if (reduced) {
            setCur(3);
            return;
        }
        // 0→1→2→3 순서로 켜고, 마지막 단계에서 두 박자 머문 뒤 처음부터
        const seq = [0, 1, 2, 3, 3, 3];
        let k = 0;
        setCur(seq[0]);
        const id = setInterval(() => {
            k = (k + 1) % seq.length;
            setCur(seq[k]);
        }, 1600);
        return () => clearInterval(id);
    }, [v, reduced]);
    return (
        <section
            id="evolution"
            data-nav-theme="dark"
            className="relative scroll-mt-[calc(var(--nav-h,84px)+58px)] overflow-hidden bg-[#0b1224] text-white"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(124,92,255,0.18),transparent_65%)]" />
            <div className="relative mx-auto max-w-7xl px-6 py-24">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[#9db6ff]">{t.evoEyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-[42px]">{t.evoTitle}</h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65">
                    {t.evoLeadA}
                    <span className="font-semibold text-white">{t.evoLeadPath}</span>
                    {t.evoLeadB}
                </p>

                <div ref={ref} className="relative mt-12">
                    {/* 진행선 */}
                    <div aria-hidden className="absolute left-0 right-0 top-[18px] hidden h-[2px] bg-white/10 lg:block">
                        <div
                            className="h-full bg-[linear-gradient(90deg,#00acee,#7c5cff)] transition-[width] duration-700 ease-out"
                            style={{ width: cur < 0 ? "0%" : `${((cur + 1) / 4) * 100}%` }}
                        />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {t.stages.map((s, i) => {
                            const on = i <= cur;
                            const now = i === cur;
                            return (
                                <div key={s.no} className={`reveal${v ? " reveal-in" : ""}`} style={{ transitionDelay: v ? `${i * 140}ms` : "0ms" }}>
                                    <div className="relative hidden h-[38px] lg:block" aria-hidden>
                                        <span
                                            className={`absolute left-0 top-[11px] h-4 w-4 rounded-full border-2 transition duration-500 ${
                                                on ? "border-[#5fd0ff] bg-[#5fd0ff] shadow-[0_0_0_6px_rgba(95,208,255,0.18)]" : "border-white/25 bg-[#0b1224]"
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`group overflow-hidden rounded-2xl border bg-[#0f1832] transition duration-500 ${
                                            now ? "border-[#5fd0ff]/60 shadow-[0_24px_50px_-24px_rgba(95,208,255,0.55)] lg:-translate-y-1.5" : "border-white/10"
                                        }`}
                                    >
                                        <div className="relative overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`/product/why/stage-${i + 1}.webp`}
                                                alt=""
                                                className={`aspect-[4/3] h-auto w-full object-cover transition duration-700 group-hover:scale-105 ${on ? "opacity-100" : "opacity-55"}`}
                                            />
                                            <span className="absolute left-4 top-4 font-mono text-[12px] font-bold text-white/80">{s.no}</span>
                                        </div>
                                        <div className="p-5">
                                            <p className="flex items-baseline gap-2">
                                                <span className="text-[20px] font-bold tracking-tight">{s.ko}</span>
                                                <span className="font-mono text-[11.5px] uppercase tracking-wider text-[#9db6ff]">{s.en}</span>
                                            </p>
                                            <p className="mt-2 min-h-[44px] text-[14px] leading-relaxed text-white/65">{s.desc}</p>
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {s.tags.map((g) => (
                                                    <span key={g} className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[11.5px] font-semibold text-white/75">
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- 6 Capabilities ---------------- */
/* imweb Orbis 템플릿 Services 구성: 왼쪽 이미지(사진) + 오른쪽 번호 아코디언.
 * 넓은 화면(≥1024px, 높이 ≥760px)에서는 섹션을 고정하고 스크롤 진행에 따라 항목을 차례로 펼친다.
 * 좁은 화면·reduced-motion 에서는 고정 없이 눌러서 펼치는 아코디언(이미지는 펼친 항목 안). */

const CAP_IMGS: { src: string; pos: string; ko: string; en: string }[] = [
    { src: "/intro/cap-knowledge.webp", pos: "50% 30%", ko: "폴더와 문서를 손끝으로 여는 모습", en: "A fingertip opening a folder of documents" },
    { src: "/intro/cap-agent.webp", pos: "50% 50%", ko: "업무 데이터 위에서 대화하는 AI Agent", en: "An AI agent conversing over business data" },
    { src: "/intro/cap-operations.webp", pos: "50% 45%", ko: "회로로 연결된 빛나는 AI 코어", en: "Glowing AI core connected by circuits" },
    { src: "/intro/cap-reasoning.webp", pos: "45% 50%", ko: "신경망 형태의 뇌를 가리키는 손끝", en: "A fingertip pointing at a neural-network brain" },
    { src: "/intro/cap-sovereignty.webp", pos: "50% 30%", ko: "노트북과 스마트폰 위에 떠 있는 보안 방패", en: "A security shield above a phone and laptop" },
    { src: "/intro/cap-execution.webp", pos: "55% 50%", ko: "노트북 위로 펼쳐진 여러 AI 앱 화면", en: "Multiple AI app screens above a laptop" },
];

export function WhyXgenCapabilities({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const n = t.caps.length;
    const [act, setAct] = useState(0);
    const [pin, setPin] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px) and (min-height: 800px)");
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
        const upd = () => setPin(mq.matches && !rm.matches);
        upd();
        mq.addEventListener?.("change", upd);
        rm.addEventListener?.("change", upd);
        return () => {
            mq.removeEventListener?.("change", upd);
            rm.removeEventListener?.("change", upd);
        };
    }, []);

    useEffect(() => {
        if (!pin) return;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const track = trackRef.current;
                const sticky = stickyRef.current;
                if (!track || !sticky) return;
                const total = track.offsetHeight - sticky.offsetHeight;
                if (total <= 0) return;
                const moved = sticky.getBoundingClientRect().top - track.getBoundingClientRect().top;
                const p = Math.min(Math.max(moved / total, 0), 0.9999);
                setAct(Math.floor(p * n));
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [pin, n]);

    const pick = (i: number) => {
        const track = trackRef.current;
        const sticky = stickyRef.current;
        if (pin && track && sticky) {
            const total = track.offsetHeight - sticky.offsetHeight;
            const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
            const trackTop = track.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: trackTop - stickyTop + (total * (i + 0.5)) / n, behavior: "smooth" });
            return;
        }
        setAct((a) => (a === i ? -1 : i));
    };

    const shown = act < 0 ? 0 : act;

    return (
        <section id="capabilities" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div ref={trackRef} className="relative" style={pin ? { height: `calc(100vh + ${n * 42}vh)` } : undefined}>
                <div
                    ref={stickyRef}
                    className={pin ? "sticky top-[calc(var(--nav-h,84px)+58px)] h-[calc(100vh-var(--nav-h,84px)-58px)]" : ""}
                >
                    <div className={`mx-auto flex max-w-7xl flex-col px-6 ${pin ? "h-full justify-center py-8" : "py-24"}`}>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#185aea]">{t.capEyebrow}</p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[40px] md:leading-[1.25]">{t.capTitle}</h2>
                        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch lg:gap-10">
                            {/* 왼쪽 — 펼친 역량의 사진 (넓은 화면 전용, 교차 페이드) + 진행 표시 */}
                            <div className="relative hidden overflow-hidden rounded-xl bg-[#0b1f4d] lg:block lg:h-full lg:min-h-[300px]">
                                {CAP_IMGS.map((im, i) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={im.src}
                                        src={im.src}
                                        alt={i === shown ? (locale === "ko" ? im.ko : im.en) : ""}
                                        aria-hidden={i !== shown}
                                        loading="lazy"
                                        style={{ objectPosition: im.pos }}
                                        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                                            i === shown ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                                        }`}
                                    />
                                ))}
                                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#06163a]/85 via-[#06163a]/35 to-transparent" />
                                <div aria-hidden className="absolute inset-x-0 bottom-0 p-6">
                                    <p className="flex items-baseline gap-2 text-white">
                                        <span className="text-[40px] font-bold leading-none tabular-nums tracking-tight">{String(shown + 1).padStart(2, "0")}</span>
                                        <span className="text-[14px] font-medium tabular-nums text-white/60">/ {String(n).padStart(2, "0")}</span>
                                    </p>
                                    <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/80">{t.caps[shown].en}</p>
                                    <div className="mt-4 flex gap-1.5">
                                        {t.caps.map((c, i) => (
                                            <span
                                                key={c.en}
                                                className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= shown ? "bg-white" : "bg-white/25"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽 — 번호 아코디언 (펼친 항목은 브랜드 블루 카드) */}
                            <ul className="flex flex-col justify-center gap-1.5">
                                {t.caps.map((c, i) => {
                                    const Icon = CAP_ICONS[i];
                                    const on = i === act;
                                    const num = String(i + 1).padStart(2, "0");
                                    const panelId = `cap-panel-${i}`;
                                    return (
                                        <li
                                            key={c.en}
                                            className={`rounded-xl border transition-[background-color,border-color,box-shadow] duration-500 ${
                                                on
                                                    ? "border-[#185aea] bg-[#185aea] bg-[linear-gradient(135deg,#1f63f0_0%,#1450d6_55%,#0e3fb3_100%)] shadow-[0_20px_44px_-22px_rgba(24,90,234,0.7)]"
                                                    : "border-[var(--color-line)] bg-white hover:border-[#b9cdf7]"
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                aria-expanded={on}
                                                aria-controls={panelId}
                                                onClick={() => pick(i)}
                                                className="flex w-full items-center gap-4 px-5 py-3 text-left md:px-6"
                                            >
                                                <span
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13.5px] font-bold tabular-nums transition-colors duration-500 ${
                                                        on ? "bg-white text-[#185aea]" : "bg-[#eef3fe] text-[#185aea]"
                                                    }`}
                                                >
                                                    {num}
                                                </span>
                                                <span
                                                    className={`flex-1 tracking-tight [word-break:keep-all] transition-colors duration-500 ${
                                                        on ? "text-[19px] font-bold text-white md:text-[21px]" : "text-[17px] font-semibold text-[var(--color-ink)] md:text-[18px]"
                                                    }`}
                                                >
                                                    {c.ko}
                                                </span>
                                                <ChevronDown
                                                    aria-hidden
                                                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${on ? "rotate-180 text-white/80" : "text-[var(--color-ink-subtle)]"}`}
                                                />
                                            </button>
                                            <div
                                                id={panelId}
                                                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                                                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="px-5 pb-6 md:px-6 md:pl-[4.5rem] lg:min-h-[144px]">
                                                        <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
                                                            <Icon aria-hidden className="h-3.5 w-3.5" />
                                                            {c.en}
                                                        </p>
                                                        <p className="mt-2 text-[15px] leading-[1.7] text-white/90 [word-break:keep-all]">{c.desc}</p>
                                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                                            {c.chips.map(([label]) => (
                                                                <span
                                                                    key={label}
                                                                    className="rounded-md bg-white/15 px-2.5 py-1 text-[12.5px] font-medium text-white ring-1 ring-inset ring-white/25"
                                                                >
                                                                    {label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        {/* 좁은 화면 — 사진을 펼친 항목 안에 */}
                                                        <div className="mt-5 overflow-hidden rounded-lg lg:hidden">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                src={CAP_IMGS[i].src}
                                                                alt={locale === "ko" ? CAP_IMGS[i].ko : CAP_IMGS[i].en}
                                                                loading="lazy"
                                                                style={{ objectPosition: CAP_IMGS[i].pos }}
                                                                className="aspect-[16/9] w-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- Roles ---------------- */

export function WhyXgenRoles({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const [act, setAct] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduced = useReduced();
    useEffect(() => {
        if (reduced || paused) return;
        const id = setTimeout(() => setAct((a) => (a + 1) % t.roles.length), 5000);
        return () => clearTimeout(id);
    }, [act, paused, reduced, t.roles.length]);
    return (
        <section id="roles" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6 py-24">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">{t.rolesEyebrow}</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">{t.rolesTitle}</h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{t.rolesLead}</p>
                <div
                    className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div role="tablist" aria-label={t.rolesTitle} className="flex flex-col gap-3">
                        {t.roles.map((r, i) => {
                            const Icon = ROLE_ICONS[i];
                            const on = i === act;
                            return (
                                <button
                                    key={r.ko}
                                    role="tab"
                                    aria-selected={on}
                                    onClick={() => setAct(i)}
                                    className={`relative overflow-hidden rounded-2xl border p-5 text-left transition duration-300 ${
                                        on ? "border-[#bcd0f5] bg-[#f4f8ff] shadow-[0_14px_36px_-22px_rgba(20,40,80,0.35)]" : "border-[var(--color-line)] bg-white hover:border-[#d5e0f5]"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl transition ${on ? "bg-[linear-gradient(45deg,#00acee,#185aea)] text-white" : "bg-[#2f7bff]/10 text-[#2f7bff]"}`}>
                                            <Icon className="h-[18px] w-[18px]" />
                                        </span>
                                        <div>
                                            <p className="text-[12px] font-semibold text-[var(--color-ink-subtle)]">{r.tag}</p>
                                            <p className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">{r.ko}</p>
                                        </div>
                                    </div>
                                    <div className={`grid transition-all duration-500 ${on ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <p className="overflow-hidden text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{r.desc}</p>
                                    </div>
                                    {on && !reduced && !paused && (
                                        <span aria-hidden key={`bar-${act}`} className="why-progress absolute bottom-0 left-0 h-[3px] bg-[linear-gradient(90deg,#00acee,#185aea)]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-[#f4f8ff] shadow-[0_30px_60px_-40px_rgba(20,40,80,0.45)]">
                        {t.roles.map((r, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={r.img}
                                src={r.img}
                                alt={i === act ? r.alt : ""}
                                aria-hidden={i !== act}
                                className={`absolute inset-0 h-full w-full object-cover object-left-top transition duration-700 ${i === act ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
