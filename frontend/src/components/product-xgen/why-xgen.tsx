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
    BookOpen,
    Workflow,
    Scale,
    Network,
    Activity,
    ShieldCheck,
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
        heroEyebrow: "XGEN · Enterprise Agentic AI Platform",
        heroTitleA: "Beyond Adoption,",
        heroTitleB: "Build for Operation",
        heroSub: "도입에서 멈추지 않고, 운영으로 이어지는 기업 AI",
        heroLead:
            "XGEN은 기업 AI를 단계적으로 진화시키는 AX Evolution Platform입니다. 한 번 만든 Agent와 지식, 도구를 운영 자산으로 쌓아 다음 업무로 확장합니다.",
        heroCta1: "데모 요청하기",
        heroCta2: "15일 무료 체험",
        heroStages: ["이해", "실행", "협업", "진화"],
        heroAlt: "XGEN 캔버스 화면이 떠 있는 모니터 두 대",
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
            { no: "02", ko: "실행", en: "Augmented", desc: "시스템과 연결해 업무를 대신 수행합니다.", tags: ["Agentflow", "PathFinder"] },
            { no: "03", ko: "협업", en: "Autonomous", desc: "여러 Agent가 역할을 나눠 함께 처리합니다.", tags: ["Multi-Agent", "A2A"] },
            { no: "04", ko: "진화", en: "Self-Evolving", desc: "실행 기록과 평가를 바탕으로 작업 방식을 개선합니다.", tags: ["Geny", "LLMOps"] },
        ],
        capEyebrow: "6 Capabilities",
        capTitle: "진화의 각 단계를 떠받치는 XGEN의 핵심 역량",
        capNote: "보라색 표시는 Plateer AI Labs가 자체 개발한 기술입니다.",
        caps: [
            { en: "Knowledge", ko: "쌓일수록 깊어지는 기업 지식", desc: "문서를 의미와 관계로 다시 읽습니다. Vector와 Graph를 함께 쓰는 하이브리드 구조로 답의 근거와 관계를 같이 찾습니다.", chips: [["Ontology RAG", 1], ["Graph DB", 0], ["Dynamic Top-K", 0]] },
            { en: "Workflow", ko: "현업이 직접 만드는 업무 Agent", desc: "캔버스로 워크플로우를 설계하고, 기존 API는 PathFinder로 도구화합니다. 대화로 Agent와 App을 만드는 Vibe Coding in DexOn도 지원합니다.", chips: [["PathFinder", 1], ["Vibe Coding", 1], ["Agent Builder", 0]] },
            { en: "Model", ko: "검증을 거쳐 판단하는 추론 체계", desc: "목적에 맞는 모델을 고르고, 다단계 검증과 Judge 평가로 판단의 일관성을 높입니다.", chips: [["Harness Engineering", 1], ["Multi-LLM", 0]] },
            { en: "Orchestration", ko: "한 번 만들면 여러 곳에서 실행", desc: "여러 Agent가 역할을 나눠 협업하고, MCP Compiler가 실행 로직을 관리해 독립 실행을 지원합니다.", chips: [["MCP Compiler", 1], ["SDK", 0], ["A2A", 0], ["Multi-Agent", 0]] },
            { en: "Operations", ko: "쓸수록 개선되는 운영", desc: "실시간 모니터링과 평가·피드백 루프로 성능을 관리하고 실행 이력을 추적합니다. Geny는 대화마다 작업 방식을 돌아보고 다음 실행에 반영합니다.", chips: [["Geny", 1], ["LLMOps", 0], ["Evidence", 0]] },
            { en: "Governance", ko: "폐쇄망에서도 지키는 데이터 주권", desc: "RBAC/ABAC 접근 제어, 다계층 가드레일, 결재선과 AI 위험도 심사를 온프레미스 환경에 적용합니다.", chips: [["결재선·위험도 심사", 1], ["RBAC/ABAC", 0], ["감사 로그", 0]] },
        ],
        rolesEyebrow: "For Every Role",
        rolesTitle: "각자의 역할에만 집중할 수 있는 환경",
        rolesLead: "기획자도, 개발자도, 관리자도. XGEN은 각자의 자리에서 AI를 쓰고, 만들고, 통제할 수 있게 합니다.",
        roles: [
            { tag: "임직원·대고객", ko: "일반 사용자", desc: "대화형 Agent에게 물으면 검색·요약·문서 활용부터 실제 업무 실행까지 이어집니다. 코드를 몰라도 DexOn에서 말로 요청하는 바이브코딩으로 필요한 Agent와 App을 직접 만들 수 있습니다. 결과는 근거와 함께 검토합니다.", img: "/product/screen-teams.png", alt: "대화형 Agent 사용 화면" },
            { tag: "기획자·현업", ko: "Agent 개발자", desc: "캔버스로 워크플로우를 설계하고 API는 도구로 등록합니다. 바이브코딩으로 시작한 결과물도 코드를 직접 작성·수정하는 풀코딩으로 이어갈 수 있습니다. 테스트부터 배포까지 하나의 흐름으로 진행합니다.", img: "/product/agent-builder-canvas.png", alt: "Agent 빌더 캔버스 화면" },
            { tag: "IT·보안", ko: "플랫폼 관리자", desc: "권한(RBAC/ABAC), 보안 정책, 감사 로그, 모니터링, 배포 승인을 한곳에서 운영합니다. 폐쇄망에서도 같은 방식으로 관리합니다.", img: "/product/operations-dashboard.png", alt: "운영 대시보드 화면" },
        ],
        note: "제공 범위와 동작은 배포 환경과 구성에 따라 달라질 수 있습니다.",
    },
    en: {
        heroEyebrow: "XGEN · Enterprise Agentic AI Platform",
        heroTitleA: "Beyond Adoption,",
        heroTitleB: "Build for Operation",
        heroSub: "Enterprise AI that keeps going after adoption — into operation",
        heroLead:
            "XGEN is an AX Evolution Platform that grows enterprise AI step by step. Agents, knowledge and tools you build become operational assets you extend to the next workload.",
        heroCta1: "Request a demo",
        heroCta2: "15-day free trial",
        heroStages: ["Understand", "Execute", "Collaborate", "Evolve"],
        heroAlt: "Two monitors showing the XGEN canvas",
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
            { no: "02", ko: "Execute", en: "Augmented", desc: "Connects to systems and carries out tasks.", tags: ["Agentflow", "PathFinder"] },
            { no: "03", ko: "Collaborate", en: "Autonomous", desc: "Multiple agents split roles and work together.", tags: ["Multi-Agent", "A2A"] },
            { no: "04", ko: "Evolve", en: "Self-Evolving", desc: "Refines how work is done from execution records and evaluations.", tags: ["Geny", "LLMOps"] },
        ],
        capEyebrow: "6 Capabilities",
        capTitle: "The core capabilities behind each stage",
        capNote: "Purple marks technology developed in-house by Plateer AI Labs.",
        caps: [
            { en: "Knowledge", ko: "Enterprise knowledge that deepens as it grows", desc: "Re-reads documents by meaning and relationship. A hybrid Vector + Graph structure finds the evidence and the relations behind an answer.", chips: [["Ontology RAG", 1], ["Graph DB", 0], ["Dynamic Top-K", 0]] },
            { en: "Workflow", ko: "Business agents built by the business", desc: "Design workflows on the canvas and turn existing APIs into tools with PathFinder. Vibe Coding in DexOn builds agents and apps through conversation.", chips: [["PathFinder", 1], ["Vibe Coding", 1], ["Agent Builder", 0]] },
            { en: "Model", ko: "Reasoning that passes verification", desc: "Picks the model that fits the task and raises consistency with multi-step verification and judge evaluation.", chips: [["Harness Engineering", 1], ["Multi-LLM", 0]] },
            { en: "Orchestration", ko: "Build once, run in many places", desc: "Agents collaborate by role, and the MCP Compiler manages execution logic to support standalone runs.", chips: [["MCP Compiler", 1], ["SDK", 0], ["A2A", 0], ["Multi-Agent", 0]] },
            { en: "Operations", ko: "Operations that improve with use", desc: "Real-time monitoring and evaluation-feedback loops manage performance and trace execution history. Geny reviews its approach after each conversation and applies it next time.", chips: [["Geny", 1], ["LLMOps", 0], ["Evidence", 0]] },
            { en: "Governance", ko: "Data sovereignty, even air-gapped", desc: "Applies RBAC/ABAC access control, multi-layer guardrails, approval routes and AI risk review in on-premise environments.", chips: [["Approval & risk review", 1], ["RBAC/ABAC", 0], ["Audit log", 0]] },
        ],
        rolesEyebrow: "For Every Role",
        rolesTitle: "Everyone focuses on their own role",
        rolesLead: "Planners, developers and administrators each use, build and govern AI from where they sit.",
        roles: [
            { tag: "Employees · customers", ko: "End users", desc: "Ask a conversational agent and go from search, summaries and documents to actual task execution. Without writing code, users can build the agents and apps they need through vibe coding in DexOn, simply by describing them. Results are reviewed with their evidence.", img: "/product/screen-teams.png", alt: "Conversational agent screen" },
            { tag: "Planners · business", ko: "Agent builders", desc: "Design workflows on the canvas and register APIs as tools. Work started with vibe coding can continue as full coding, writing and editing the code directly. Testing through deployment runs in a single flow.", img: "/product/agent-builder-canvas.png", alt: "Agent builder canvas" },
            { tag: "IT · security", ko: "Platform admins", desc: "Run permissions (RBAC/ABAC), security policy, audit logs, monitoring and deployment approval in one place — the same way in air-gapped networks.", img: "/product/operations-dashboard.png", alt: "Operations dashboard" },
        ],
        note: "Scope and behavior depend on the deployment environment and configuration.",
    },
} as const;

const CAP_ICONS = [BookOpen, Workflow, Scale, Network, Activity, ShieldCheck];
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
            <div aria-hidden className="why-hero-bg pointer-events-none absolute inset-x-0 bottom-[60px] h-[260px] sm:h-[320px] lg:bottom-[70px] lg:h-[42%]" />

            <div className="kv-fill relative mx-auto flex min-h-[880px] w-full max-w-7xl flex-col items-center px-6 pb-16 lg:pb-24 pt-[calc(var(--nav-h,84px)+64px)] text-center lg:pt-[calc(var(--nav-h,84px)+88px)]">
                <p className="why-in why-d1 font-mono text-[13px] uppercase tracking-[0.18em] text-white/75 md:text-[14px]">
                    {t.heroEyebrow}
                </p>
                <h1 className="why-in why-d2 mt-5 text-[40px] font-bold leading-[1.1] tracking-tight md:text-[64px]">
                    {t.heroTitleA}
                    <br />
                    <span className="bg-gradient-to-r from-[#5fd0ff] via-[#7aa8ff] to-[#b49cff] bg-clip-text text-transparent">
                        {t.heroTitleB}
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
                <div className="why-in why-d5 mt-auto grid w-full max-w-4xl grid-cols-4 gap-2 pt-[300px] sm:pt-[360px] lg:pt-0">
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

/* ---------------- Decisive difference ---------------- */

export function WhyXgenDifference({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const [ref, v] = useInView<HTMLHeadingElement>(0.3);
    const words = t.diffStatement.split(" ");
    return (
        <section id="why" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6 py-24">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[#7c5cff]">{t.diffEyebrow}</p>
                <h2 className="mt-3 text-[15px] font-bold tracking-tight text-[var(--color-ink-muted)]">{t.diffTitle}</h2>
                <p ref={ref} className="mt-6 max-w-5xl text-[28px] font-bold leading-[1.35] tracking-tight text-[var(--color-ink)] md:text-[42px]">
                    {words.map((w, i) => (
                        <span key={i}>
                            <span
                                className={`why-word${v ? " why-word-in" : ""}`}
                                style={{ transitionDelay: v ? `${i * 55}ms` : "0ms" }}
                            >
                                {w}
                            </span>
                            {i < words.length - 1 ? " " : ""}
                        </span>
                    ))}
                </p>
                <div className="mt-14 grid gap-px overflow-hidden border-y border-[var(--color-line)] md:grid-cols-3">
                    {t.diffPoints.map(([h, d], i) => (
                        <Reveal key={h} delay={i * 120} className="py-7 md:pr-8">
                            <span className="block font-mono text-[13px] font-bold text-[#2f7bff]">0{i + 1}</span>
                            <h3 className="mt-2 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">{h}</h3>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{d}</p>
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

export function WhyXgenCapabilities({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <section id="capabilities" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-24">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">{t.capEyebrow}</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">{t.capTitle}</h2>
                <p className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-[var(--color-ink-muted)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7c5cff]" />
                    {t.capNote}
                </p>
                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {t.caps.map((c, i) => {
                        const Icon = CAP_ICONS[i];
                        return (
                            <Reveal key={c.en} delay={(i % 3) * 110}>
                                <div className="why-cap group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#bcd0f5] hover:shadow-[0_22px_48px_-24px_rgba(20,40,80,0.3)]">
                                    <span aria-hidden className="why-cap-bar absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#00acee,#185aea,#7c5cff)] transition duration-500 group-hover:scale-x-100" />
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff] transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-[linear-gradient(45deg,#00acee,#185aea)] group-hover:text-white">
                                            <Icon className="h-[22px] w-[22px]" />
                                        </span>
                                        <span className="bg-gradient-to-br from-[#00acee] to-[#185aea] bg-clip-text font-mono text-[34px] font-extrabold leading-none text-transparent opacity-30 transition group-hover:opacity-100">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <p className="mt-6 font-mono text-[11.5px] font-bold uppercase tracking-widest text-[#4a6aa8]">{c.en}</p>
                                    <h3 className="mt-1.5 text-[20px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">{c.ko}</h3>
                                    <p className="mt-3 mb-5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{c.desc}</p>
                                    <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[var(--color-line)] pt-4">
                                        {c.chips.map(([label, own]) => (
                                            <span
                                                key={label}
                                                className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                                                    own ? "bg-[#7c5cff]/10 text-[#6a46f0] ring-1 ring-[#7c5cff]/25" : "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)]"
                                                }`}
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
                <p className="mt-6 text-[12.5px] text-[var(--color-ink-subtle)]">{t.note}</p>
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
