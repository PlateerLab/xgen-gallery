import {
    Monitor,
    Building2,
    Bot,
    Cpu,
    BookOpen,
    Brain,
    Server,
    Landmark,
    ShoppingCart,
    MonitorPlay,
    Boxes,
    Workflow,
    Wrench,
    Network,
    Rocket,
    Settings,
    Activity,
    Split,
    Database,
    FileSearch,
    Wand2,
    Container,
    GitBranch,
    HardDrive,
    Gauge,
    ShieldCheck,
    ShieldAlert,
    KeyRound,
    ScrollText,
    EyeOff,
    BadgeCheck,
    Laptop,
    RefreshCw,
    FolderOpen,
    Plug,
    SquareTerminal,
    CircleStop,
    type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * XGEN 3.0 플랫폼 아키텍처 맵.
 * 접근·콘솔 → 도메인·채널 → 에이전트·응용 → AI Platform 코어 → RAG·지식 →
 * 파운데이션 모델 → 인프라 계층 스택 + 전 계층 크로스커팅 거버넌스·보안 + 레퍼런스.
 * 컬러 토큰 — Primary #2563EB · Hover #EEF5FF · Section #F8FAFC · Border #E5E7EB ·
 * Text #111827 · Sub #6B7280.
 */

type Item = { icon: LucideIcon; t: string; s?: string };

/** RAG 검색 기법 칩 — 고유 표기라 두 언어 공통. */
const RAG_CHIPS = ["Dense", "Sparse (SPLADE)", "Reranker", "Late Chunking", "Vision / OCR"];

const DOMAIN_ICONS: LucideIcon[] = [Landmark, Building2, ShoppingCart, MonitorPlay, Boxes];
const AGENT_ICONS: LucideIcon[] = [RefreshCw, Bot, Network, Workflow];
const CORE_ICONS: LucideIcon[] = [Rocket, Settings, Activity, Split, Wrench];
const RAG_SIDE_ICONS: LucideIcon[] = [Database, FileSearch];
const FOUNDATION_ICONS: LucideIcon[] = [Brain, Wand2, Boxes];
const INFRA_ICONS: LucideIcon[] = [Container, GitBranch, Database, HardDrive, Server, Gauge];
const GOVERNANCE_ICONS: LucideIcon[] = [ShieldAlert, KeyRound, BadgeCheck, ScrollText, Laptop, EyeOff, CircleStop, ShieldCheck];
const LAYER_ICONS: LucideIcon[] = [Building2, Bot, RefreshCw, Cpu, BookOpen, Brain, Server];

interface PlatformData {
    access: string[];
    domain: [string, string][];
    agent: [string, string][];
    hybrid: {
        serverTitle: string;
        server: [string, string][];
        sync: string;
        localTitle: string;
        local: [string, string][];
        tags: string[];
    };
    core: [string, string][];
    ragSide: [string, string][];
    foundation: [string, string][];
    infra: [string, string][];
    governance: [string, string][];
    layers: [string, string][];
    ragFlow: string;
    govTitle: string;
    govSub: string;
    refTitle: string;
    refBody: string;
    refNote: string;
}

const D: Record<Locale, PlatformData> = {
    ko: {
        access: [
            "사용자 모드 (Chat/Assist)",
            "관리자 모드 (Admin)",
            "Portal / 대시보드",
            "Open-API · SDK",
            "SSO 연동",
            "Any Device · One Session",
        ],
        domain: [
            ["금융", "은행 · 캐피탈 · 여신"],
            ["공공", "공공기관"],
            ["이커머스", "홈쇼핑 · 리테일"],
            ["서비스", "미디어 · 콘텐츠"],
            ["기타", "Private LLM"],
        ],
        agent: [
            ["Harness Runtime", "목표 해석 · 계획 · 도구 선택 · 재계획"],
            ["업무 에이전트", "상담 · 문서 처리 · 승인 등 업무 단위 에이전트"],
            ["Multi-Agent Orchestration", "Planner → Agent 라우팅 · 단계별 기능 확장"],
            ["Workflow Canvas", "기존 Low/No-code 흐름과 3.0 호환"],
        ],
        hybrid: {
            serverTitle: "Server Agent Runtime",
            server: [["Agent Logic", "계획 · 오케스트레이션"], ["LLM Gateway", "추론 · Model Router"], ["Tool Runtime", "코드 실행 · API 호출"], ["Workspace", "영구 파일 · 상태 · 이력"]],
            sync: "승인된 상호작용",
            localTitle: "Local Interaction",
            local: [["Xgent Client", "안전한 연결 경계"], ["Local Folder", "허용된 파일 접근"], ["OS Capability", "로컬 앱 · 기능"], ["Local MCP", "사내망 · 전용 도구"]],
            tags: ["Agent는 서버에서 실행", "로컬 최소 권한", "결과·상태 동기화", "사용자 승인", "즉시 중단"],
        },
        core: [
            ["AI Service Generator", "서비스 생성 · 배포 · 버전 관리"],
            ["서비스 설정", "Ondemand GPU · LLM/ML · VectorDB 연결"],
            ["LLMOps (Generative)", "모델 훈련 · 모니터링 · 평가 · Model Switch & Repo"],
            ["Model Router", "Multi-LLM 라우팅 · 비용 · 성능 최적화"],
            ["MCP Catalog", "서버·로컬 도구 레지스트리"],
        ],
        ragSide: [
            ["Qdrant Vector DB", "Dense + Sparse 하이브리드 인덱스"],
            ["Embedding · Parsing", "문서 파싱 · OCR · 벡터화 파이프라인"],
        ],
        foundation: [
            ["오픈소스 LLM", "오픈 모델 · Private · Vertical LLM"],
            ["Fine-Tuning", "SFT / DPO · 도메인 특화 학습"],
            ["멀티모델 확장", "Model Router 연계 · Vision · 임베딩 모델"],
        ],
        infra: [
            ["k3s HA", "Kubernetes 고가용성"],
            ["ArgoCD", "GitOps · 무중단 배포"],
            ["Qdrant", "Vector Database"],
            ["MinIO", "Object Storage"],
            ["On-Premise", "GPU · 컨테이너"],
            ["Monitoring", "자원 · 성능 · Alert"],
        ],
        governance: [
            ["Guardrail", "프롬프트 인젝션 · 유해 · 기밀 차단"],
            ["RBAC / ABAC", "역할 · 속성 기반 접근제어 · MFA"],
            ["Approval Control", "민감 작업 사전 · 사후 결재"],
            ["Trace & Audit Log", "계획 · 도구 · 파일 · 반출 추적"],
            ["Local Policy", "폴더 · OS 기능 · MCP별 허용 범위"],
            ["PII 비식별화", "개인 · 금융정보 마스킹 · 가명처리"],
            ["Kill Switch", "Agent · 세션 · 로컬 연결 즉시 중단"],
            ["Compliance", "정책 템플릿 · 검증 · 증빙"],
        ],
        layers: [
            ["도메인 · 채널", "Vertical Domain"],
            ["에이전트 · 응용", "Agent & Application"],
            ["하이브리드 실행", "Server ↔ Local"],
            ["AI Platform 코어", "Platform Core"],
            ["RAG · 지식", "Retrieval-Augmented"],
            ["파운데이션 모델", "Foundation Model"],
            ["인프라", "Infrastructure"],
        ],
        ragFlow: "문서 파싱 → 임베딩 → 하이브리드 검색 → Rerank → Context 주입",
        govTitle: "거버넌스 & 보안",
        govSub: "전 계층 크로스커팅 통제",
        refTitle: "레퍼런스 구축",
        refBody: "금융 J은행 · I캐피탈 · 이커머스 L홈쇼핑 · 미디어 I사 · 공공기관 · 엔터프라이즈",
        refNote: "On-Premise · Air-gap 대응",
    },
    en: {
        access: [
            "User mode (Chat/Assist)",
            "Admin mode",
            "Portal / dashboard",
            "Open-API · SDK",
            "SSO integration",
            "Any device · one session",
        ],
        domain: [
            ["Finance", "Banking · capital · lending"],
            ["Public sector", "Government agencies"],
            ["E-commerce", "Home shopping · retail"],
            ["Services", "Media · content"],
            ["Other", "Private LLM"],
        ],
        agent: [
            ["Harness Runtime", "Goal interpretation · planning · tool selection · replanning"],
            ["Business agents", "Agents scoped to a task — support, document handling, approvals"],
            ["Multi-Agent Orchestration", "Planner → agent routing, extended stage by stage"],
            ["Workflow Canvas", "Compatible with existing low/no-code workflows"],
        ],
        hybrid: {
            serverTitle: "Server Agent Runtime",
            server: [["Agent Logic", "Planning · orchestration"], ["LLM Gateway", "Inference · model routing"], ["Tool Runtime", "Code execution · API calls"], ["Workspace", "Persistent files · state · history"]],
            sync: "Approved interaction",
            localTitle: "Local Interaction",
            local: [["Xgent Client", "Secure connection boundary"], ["Local Folder", "Approved file access"], ["OS Capability", "Local apps · capabilities"], ["Local MCP", "Private-network tools"]],
            tags: ["Server-side agent", "Least privilege", "State sync", "User approval", "Immediate stop"],
        },
        core: [
            ["AI Service Generator", "Service creation, deployment, and version management"],
            ["Service configuration", "On-demand GPU · LLM/ML · vector DB connections"],
            ["LLMOps (Generative)", "Model training, monitoring, evaluation, model switch and repo"],
            ["Model Router", "Multi-LLM routing optimized for cost and performance"],
            ["MCP Catalog", "Registry for server and local tools"],
        ],
        ragSide: [
            ["Qdrant Vector DB", "Dense + sparse hybrid index"],
            ["Embedding · Parsing", "Document parsing, OCR, and vectorization pipeline"],
        ],
        foundation: [
            ["Open-source LLMs", "Open models · private · vertical LLMs"],
            ["Fine-tuning", "SFT / DPO · domain-specific training"],
            ["Multi-model extension", "Model Router integration · vision · embedding models"],
        ],
        infra: [
            ["k3s HA", "Kubernetes high availability"],
            ["ArgoCD", "GitOps · zero-downtime deployment"],
            ["Qdrant", "Vector Database"],
            ["MinIO", "Object Storage"],
            ["On-Premise", "GPU · containers"],
            ["Monitoring", "Resources · performance · alerts"],
        ],
        governance: [
            ["Guardrail", "Blocks prompt injection, harmful content, and confidential leaks"],
            ["RBAC / ABAC", "Role- and attribute-based access control with MFA"],
            ["Approval Control", "Pre- and post-approval for sensitive actions"],
            ["Trace & Audit Log", "Tracks plans, tools, files, and exports"],
            ["Local Policy", "Scope controls by folder, OS capability, and MCP"],
            ["PII de-identification", "Masking and pseudonymization of personal and financial data"],
            ["Kill Switch", "Immediately stops agents, sessions, and local connections"],
            ["Compliance", "Policy templates · validation · evidence"],
        ],
        layers: [
            ["Vertical Domain", "Domain and channel"],
            ["Agent & Application", "Agents and applications"],
            ["Hybrid Execution", "Server ↔ local"],
            ["Platform Core", "AI platform core"],
            ["Retrieval-Augmented", "RAG and knowledge"],
            ["Foundation Model", "Foundation models"],
            ["Infrastructure", "Infrastructure"],
        ],
        ragFlow: "Document parsing → embedding → hybrid retrieval → rerank → context injection",
        govTitle: "Governance & security",
        govSub: "Cross-cutting control across every layer",
        refTitle: "Reference deployments",
        refBody: "Finance (bank J, capital I) · e-commerce (home shopping L) · media (company I) · public agencies · enterprise",
        refNote: "On-premise and air-gap ready",
    },
};


/** 좌측 계층 라벨 (Hover 배경 + Primary 아이콘). */
function LayerLabel({ icon: Icon, ko, en }: { icon: LucideIcon; ko: string; en: string }) {
    return (
        <div className="flex w-[126px] shrink-0 flex-col justify-center rounded-lg border border-[#E5E7EB] bg-[#EEF5FF] px-3 py-3">
            <Icon className="h-5 w-5 text-[#2563EB]" />
            <div className="mt-1.5 text-[14px] font-bold leading-tight text-[#111827]">
                {ko}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-tight text-[#6B7280]">
                {en}
            </div>
        </div>
    );
}

/** 컴포넌트 카드 (흰 배경 · Border · 아이콘 + 텍스트). */
function Comp({ icon: Icon, t, s }: Item) {
    return (
        <div className="flex min-h-[64px] flex-col justify-center rounded-md border border-[#E5E7EB] bg-white px-3 py-2">
            <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 shrink-0 text-[#2563EB]" />
                <div className="text-[13.5px] font-bold leading-tight text-[#111827]">
                    {t}
                </div>
            </div>
            {s && (
                <div className="mt-1 text-[12px] leading-snug text-[#6B7280]">{s}</div>
            )}
        </div>
    );
}

/** 한 계층 행: 좌측 라벨 + 우측 콘텐츠. */
function LayerRow({
    icon,
    ko,
    en,
    children,
}: {
    icon: LucideIcon;
    ko: string;
    en: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-3">
            <LayerLabel icon={icon} ko={ko} en={en} />
            <div className="min-w-0 flex-1 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                {children}
            </div>
        </div>
    );
}

export function XgenPlatformArchitecture({
    locale = "ko",
}: {
    locale?: Locale;
}) {
    const d = D[locale];
    const toItems = (rows: [string, string][], icons: LucideIcon[]): Item[] =>
        rows.map(([t, sub], i) => ({ icon: icons[i], t, s: sub }));
    const ACCESS = d.access;
    const DOMAIN = toItems(d.domain, DOMAIN_ICONS);
    const AGENT = toItems(d.agent, AGENT_ICONS);
    const CORE = toItems(d.core, CORE_ICONS);
    const RAG_SIDE = toItems(d.ragSide, RAG_SIDE_ICONS);
    const FOUNDATION = toItems(d.foundation, FOUNDATION_ICONS);
    const INFRA = toItems(d.infra, INFRA_ICONS);
    const GOVERNANCE = toItems(d.governance, GOVERNANCE_ICONS);
    const LAYERS = d.layers.map(([ko, en], i) => ({
        icon: LAYER_ICONS[i],
        ko,
        en,
    }));
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[1000px] space-y-3">
                {/* 접근 · 콘솔 */}
                <div className="rounded-xl border border-[#E5E7EB] bg-[#EEF5FF] p-3">
                    <div className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap">
                        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                            <Monitor className="h-3.5 w-3.5" />
                            Access · Console
                        </span>
                        {ACCESS.map((a) => (
                            <span
                                key={a}
                                className="shrink-0 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 text-[12.5px] font-semibold text-[#111827]"
                            >
                                {a}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 본체: 좌측 계층 스택 + 우측 거버넌스 */}
                <div className="flex gap-3">
                    <div className="min-w-0 flex-1 space-y-2.5">
                        <LayerRow {...LAYERS[0]}>
                            <div className="grid grid-cols-5 gap-2">
                                {DOMAIN.map((d) => (
                                    <Comp key={d.t} {...d} />
                                ))}
                            </div>
                        </LayerRow>

                        <LayerRow {...LAYERS[1]}>
                            <div className="grid grid-cols-4 gap-2">
                                {AGENT.map((a) => (
                                    <Comp key={a.t} {...a} />
                                ))}
                            </div>
                        </LayerRow>

                        <LayerRow {...LAYERS[2]}>
                            <div className="grid grid-cols-[1fr_92px_1fr] items-stretch gap-2">
                                <div className="rounded-md border border-[#9DBDFF] border-t-[3px] bg-white p-3">
                                    <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#111827]">
                                        <Server className="h-4 w-4 text-[#2563EB]" />
                                        {d.hybrid.serverTitle}
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
                                        {d.hybrid.server.map(([title, sub], index) => {
                                            const Icon = [Brain, Split, SquareTerminal, HardDrive][index];
                                            return <div key={title} className="border-t border-[#E5E7EB] pt-1.5"><div className="flex items-center gap-1 text-[12px] font-bold text-[#111827]"><Icon className="h-3.5 w-3.5 text-[#2563EB]" />{title}</div><div className="mt-0.5 text-[10.5px] text-[#6B7280]">{sub}</div></div>;
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center">
                                    <RefreshCw className="h-5 w-5 text-[#2563EB]" />
                                    <div className="mt-1 font-mono text-[10px] font-bold leading-tight text-[#2563EB]">SYNC<br />CONTRACT</div>
                                    <div className="mt-1 text-[9.5px] text-[#6B7280]">{d.hybrid.sync}</div>
                                </div>
                                <div className="rounded-md border border-[#8ED7D9] border-t-[3px] bg-white p-3">
                                    <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-[#111827]">
                                        <Laptop className="h-4 w-4 text-[#078C92]" />
                                        {d.hybrid.localTitle}
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
                                        {d.hybrid.local.map(([title, sub], index) => {
                                            const Icon = [Laptop, FolderOpen, Monitor, Plug][index];
                                            return <div key={title} className="border-t border-[#E5E7EB] pt-1.5"><div className="flex items-center gap-1 text-[12px] font-bold text-[#111827]"><Icon className="h-3.5 w-3.5 text-[#078C92]" />{title}</div><div className="mt-0.5 text-[10.5px] text-[#6B7280]">{sub}</div></div>;
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {d.hybrid.tags.map((tag) => <span key={tag} className="rounded-full border border-[#A9DFE1] bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#087D82]">{tag}</span>)}
                            </div>
                        </LayerRow>

                        <LayerRow {...LAYERS[3]}>
                            <div className="grid grid-cols-5 gap-2">
                                {CORE.map((c) => (
                                    <Comp key={c.t} {...c} />
                                ))}
                            </div>
                        </LayerRow>

                        <LayerRow {...LAYERS[4]}>
                            <div className="flex flex-wrap gap-1.5">
                                {RAG_CHIPS.map((c) => (
                                    <span
                                        key={c}
                                        className="rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 text-[12.5px] font-semibold text-[#2563EB]"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-2 text-[12.5px] font-medium text-[#6B7280]">
                                {d.ragFlow}
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {RAG_SIDE.map((r) => (
                                    <Comp key={r.t} {...r} />
                                ))}
                            </div>
                        </LayerRow>

                        <LayerRow {...LAYERS[5]}>
                            <div className="grid grid-cols-3 gap-2">
                                {FOUNDATION.map((f) => (
                                    <Comp key={f.t} {...f} />
                                ))}
                            </div>
                        </LayerRow>

                        <LayerRow {...LAYERS[6]}>
                            <div className="grid grid-cols-6 gap-2">
                                {INFRA.map((i) => (
                                    <Comp key={i.t} {...i} />
                                ))}
                            </div>
                        </LayerRow>
                    </div>

                    {/* 거버넌스 & 보안 (전 계층 크로스커팅) */}
                    <div className="flex w-[240px] shrink-0 flex-col rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
                            <span className="text-[15px] font-bold text-[#111827]">
                                {d.govTitle}
                            </span>
                        </div>
                        <p className="mt-0.5 text-[11.5px] text-[#6B7280]">
                            {d.govSub}
                        </p>
                        <div className="mt-3 space-y-2">
                            {GOVERNANCE.map((g) => (
                                <div
                                    key={g.t}
                                    className="flex gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2"
                                >
                                    <g.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
                                    <div className="min-w-0">
                                        <div className="text-[13px] font-bold text-[#111827]">
                                            {g.t}
                                        </div>
                                        <div className="mt-0.5 text-[11.5px] leading-snug text-[#6B7280]">
                                            {g.s}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 레퍼런스 구축 */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-[#E5E7EB] bg-[#EEF5FF] px-5 py-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#111827]">
                            <BadgeCheck className="h-4 w-4 text-[#2563EB]" />
                            {d.refTitle}
                        </span>
                        <span className="text-[13.5px] font-semibold text-[#111827]">
                            {d.refBody}
                        </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB]">
                        <Server className="h-3.5 w-3.5" />
                        {d.refNote}
                    </span>
                </div>
            </div>
        </div>
    );
}
