import {
    Monitor,
    Building2,
    Database,
    Network,
    BookOpen,
    GitBranch,
    Wrench,
    Activity,
    SlidersHorizontal,
    Cpu,
    Server,
    Cloud,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

type Pair = [string, string?];

/* ── data ───────────────────────────────────────────────── */
/**
 * 셀은 [표시명, 부연]. 한국어판은 영문 용어 + 한글 뜻풀이를 함께 보여주고,
 * 영문판은 부연을 비워 용어만 남긴다 — 영문 독자에게 같은 말을 두 번 쓰는 셈이라
 * 오히려 읽기 어렵다.
 */
const PUBLIC_LLM = ["ChatGPT", "Claude", "Gemini"];
const PRIVATE_LLM = ["XGEN LLM", "Qwen", "deepseek", "Polar", "Gemma"];
const CLOUD = ["AWS", "Microsoft Azure", "Google Cloud"];
const ONPREM: Pair[] = [["GPU"], ["Container"], ["Database"], ["Storage"]];

interface DiagramData {
    industries: Pair[];
    console: Pair[];
    dataSources: Pair[];
    runtimeCols: { icon: LucideIcon; label: string; sub?: string; cells: Pair[] }[];
    workflow: Pair[];
    shared: Pair[];
    platform: Pair[];
    bandAccess: string;
    bandAccessSub: string;
    bandIndustries: string;
    bandConsole: string;
    bandConsoleSub: string;
    bandDataSources: string;
    bandRuntime: string;
    bandRuntimeSub: string;
    workflowTitle: string;
    workflowSub: string;
    sharedTitle: string;
    sharedSub: string;
    bandPlatform: string;
    bandPlatformSub: string;
    bandModel: string;
    bandModelSub: string;
    bandInfra: string;
    bandInfraSub: string;
    onpremNote: string;
}

const D: Record<Locale, DiagramData> = {
    ko: {
        industries: [
            ["E-Commerce", "대고객 Chatbot"],
            ["Public Sector", "고객 상담"],
            ["Finance", "사고 예방"],
            ["IT Services", "법령/규정 검색"],
        ],
        console: [
            ["사용자 모드", "User Mode"],
            ["개발자 모드", "Developer Mode"],
            ["관리자 모드", "Admin Mode"],
        ],
        dataSources: [
            ["Structured Data", "구조화 데이터"],
            ["Unstructured Data", "비정형 데이터"],
            ["Enterprise Systems", "ERP · CRM · HRM"],
            ["External Sources", "Web · API · 3rd Party"],
        ],
        runtimeCols: [
            {
                icon: BookOpen,
                label: "지식",
                sub: "Knowledge",
                cells: [
                    ["Knowledge Base", "지식 저장소"],
                    ["Vector DB", "벡터 DB"],
                    ["Ontology", "온톨로지"],
                    ["Document Store", "문서 저장소"],
                ],
            },
            {
                icon: GitBranch,
                label: "추론",
                sub: "Reasoning",
                cells: [
                    ["Model Orchestration", "모델 오케스트레이션"],
                    ["RAG Engine", "RAG 엔진"],
                    ["Guardrails", "가드레일"],
                ],
            },
            {
                icon: Wrench,
                label: "실행",
                sub: "Action",
                cells: [
                    ["Tool & API", "도구 / API 연동"],
                    ["Workflow Engine", "워크플로우 엔진"],
                    ["Task Automation", "작업 자동화"],
                ],
            },
            {
                icon: Activity,
                label: "운영",
                sub: "Operations",
                cells: [
                    ["Monitoring", "모니터링"],
                    ["Logging", "로깅"],
                    ["Audit Trail", "감사 추적"],
                ],
            },
        ],
        workflow: [
            ["AI Deployment", "배포 / 배치"],
            ["Model Routing", "모델 라우팅"],
            ["Policy Enforcement", "정책 적용"],
            ["Response", "응답 반환"],
        ],
        shared: [
            ["Model Registry", "모델 레지스트리"],
            ["Prompt Hub", "프롬프트 허브"],
            ["Dataset Management", "데이터셋 관리"],
            ["Evaluation & Benchmarking", "평가 & 벤치마킹"],
        ],
        platform: [
            ["LLM / ML Settings", "설정 관리"],
            ["On-demand GPU", "온디맨드 GPU"],
            ["Vector DB Connection", "벡터 DB 연동"],
            ["Data Pipeline", "데이터 파이프라인"],
            ["Observability", "관측성"],
            ["Security & Compliance", "보안 & 규제 준수"],
            ["Governance", "거버넌스"],
        ],
        bandAccess: "접근 채널",
        bandAccessSub: "Unified Access",
        bandIndustries: "산업별 활용사례",
        bandConsole: "사용자 모드",
        bandConsoleSub: "Console",
        bandDataSources: "데이터 소스",
        bandRuntime: "Enterprise AI Runtime",
        bandRuntimeSub: "지식 · 추론 · 실행 · 운영 통합 계층",
        workflowTitle: "워크플로우 오케스트레이션",
        workflowSub: "Workflow Orchestration",
        sharedTitle: "공유 오케스트레이션",
        sharedSub: "Shared Orchestration",
        bandPlatform: "플랫폼 서비스",
        bandPlatformSub: "Platform Services",
        bandModel: "모델 레이어",
        bandModelSub: "Model Layer",
        bandInfra: "인프라",
        bandInfraSub: "Infrastructure",
        onpremNote: "폐쇄망 / 온프레미스 친화",
    },
    en: {
        industries: [
            ["E-Commerce", "Customer chatbot"],
            ["Public Sector", "Citizen support"],
            ["Finance", "Incident prevention"],
            ["IT Services", "Regulation search"],
        ],
        console: [["User Mode"], ["Developer Mode"], ["Admin Mode"]],
        dataSources: [
            ["Structured Data"],
            ["Unstructured Data"],
            ["Enterprise Systems", "ERP · CRM · HRM"],
            ["External Sources", "Web · API · 3rd Party"],
        ],
        runtimeCols: [
            {
                icon: BookOpen,
                label: "Knowledge",
                cells: [
                    ["Knowledge Base"],
                    ["Vector DB"],
                    ["Ontology"],
                    ["Document Store"],
                ],
            },
            {
                icon: GitBranch,
                label: "Reasoning",
                cells: [["Model Orchestration"], ["RAG Engine"], ["Guardrails"]],
            },
            {
                icon: Wrench,
                label: "Action",
                cells: [["Tool & API"], ["Workflow Engine"], ["Task Automation"]],
            },
            {
                icon: Activity,
                label: "Operations",
                cells: [["Monitoring"], ["Logging"], ["Audit Trail"]],
            },
        ],
        workflow: [
            ["AI Deployment"],
            ["Model Routing"],
            ["Policy Enforcement"],
            ["Response"],
        ],
        shared: [
            ["Model Registry"],
            ["Prompt Hub"],
            ["Dataset Management"],
            ["Evaluation & Benchmarking"],
        ],
        platform: [
            ["LLM / ML Settings"],
            ["On-demand GPU"],
            ["Vector DB Connection"],
            ["Data Pipeline"],
            ["Observability"],
            ["Security & Compliance"],
            ["Governance"],
        ],
        bandAccess: "Access channels",
        bandAccessSub: "Unified Access",
        bandIndustries: "Use cases by industry",
        bandConsole: "Console",
        bandConsoleSub: "",
        bandDataSources: "Data sources",
        bandRuntime: "Enterprise AI Runtime",
        bandRuntimeSub: "Knowledge · reasoning · action · operations, in one layer",
        workflowTitle: "Workflow Orchestration",
        workflowSub: "",
        sharedTitle: "Shared Orchestration",
        sharedSub: "",
        bandPlatform: "Platform Services",
        bandPlatformSub: "",
        bandModel: "Model Layer",
        bandModelSub: "",
        bandInfra: "Infrastructure",
        bandInfraSub: "",
        onpremNote: "Air-gap and on-premise friendly",
    },
};

/* ── atoms ──────────────────────────────────────────────── */
function Cell({
    title,
    sub,
    className,
}: {
    title: string;
    sub?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-md border border-[#dbe2f4] bg-white px-2 py-2 text-center",
                className,
            )}
        >
            <div className="hyphens-none break-keep text-[12px] font-semibold leading-tight text-[var(--color-ink)]">
                {title}
            </div>
            {sub && (
                <div className="mt-0.5 text-[11px] leading-tight text-[var(--color-ink-subtle)]">
                    {sub}
                </div>
            )}
        </div>
    );
}

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-md border border-[#dbe2f4] bg-white px-3.5 py-2 text-[15px] font-semibold text-[var(--color-ink)]">
            {children}
        </span>
    );
}

function BandLabel({ icon: Icon, en, ko }: { icon: LucideIcon; en: string; ko?: string }) {
    return (
        <div className="mb-3 flex items-center gap-2">
            <Icon className="h-4 w-4 text-[#2f3aa0]" />
            <span className="text-[15px] font-bold text-[#2f3aa0]">{en}</span>
            {ko && (
                <span className="text-[13px] text-[var(--color-ink-subtle)]">
                    {ko}
                </span>
            )}
        </div>
    );
}

function Band({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-xl border border-[#d4ddf2] bg-[#f5f8ff] p-4",
                className,
            )}
        >
            {children}
        </div>
    );
}

/* ── diagram ────────────────────────────────────────────── */
export function ArchitectureDiagram({
    locale = "ko",
}: {
    locale?: Locale;
}) {
    const d = D[locale];
    const {
        industries: INDUSTRIES,
        console: CONSOLE,
        dataSources: DATA_SOURCES,
        runtimeCols: RUNTIME_COLS,
        workflow: WORKFLOW,
        shared: SHARED,
        platform: PLATFORM,
    } = d;
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[920px] space-y-3">
                {/* Access channels + Console */}
                <div className="grid grid-cols-[180px_1fr_300px] gap-3">
                    <Band className="flex flex-col items-center justify-center text-center">
                        <BandLabel icon={Monitor} en={d.bandAccess} />
                        <span className="text-[12.5px] text-[var(--color-ink-subtle)]">
                            {d.bandAccessSub}
                        </span>
                    </Band>
                    <Band className="flex flex-col justify-center">
                        <BandLabel icon={Building2} en={d.bandIndustries} />
                        <div className="grid w-full grid-cols-4 gap-2.5">
                            {INDUSTRIES.map(([t, s]) => (
                                <Cell
                                    key={t}
                                    title={t}
                                    sub={s}
                                    className="flex min-h-[68px] flex-col justify-center"
                                />
                            ))}
                        </div>
                    </Band>
                    <Band>
                        <BandLabel icon={SlidersHorizontal} en={d.bandConsole} ko={d.bandConsoleSub || undefined} />
                        <div className="grid grid-cols-3 gap-2">
                            {CONSOLE.map(([t, s]) => (
                                <Cell
                                    key={t}
                                    title={t}
                                    sub={s}
                                    className="flex min-h-[52px] flex-col justify-center"
                                />
                            ))}
                        </div>
                    </Band>
                </div>

                {/* Data sources + Enterprise AI Runtime */}
                <div className="grid grid-cols-[180px_1fr] gap-3">
                    <Band>
                        <BandLabel icon={Database} en={d.bandDataSources} />
                        <div className="space-y-2">
                            {DATA_SOURCES.map(([t, s]) => (
                                <Cell key={t} title={t} sub={s} />
                            ))}
                        </div>
                    </Band>

                    <Band className="border-[#c2cdee] bg-[#eaf0fc]">
                        <BandLabel
                            icon={Network}
                            en={d.bandRuntime}
                            ko={d.bandRuntimeSub}
                        />
                        <div className="grid grid-cols-4 gap-3">
                            {RUNTIME_COLS.map((col) => (
                                <div
                                    key={col.label}
                                    className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3"
                                >
                                    <div className="mb-2 flex items-center justify-center gap-1.5">
                                        <col.icon className="h-4 w-4 text-[#2f7bff]" />
                                        <span className="text-[14px] font-bold text-[var(--color-ink)]">
                                            {col.label}
                                        </span>
                                        {col.sub && (
                                            <span className="text-[12px] text-[var(--color-ink-subtle)]">
                                                {col.sub}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        {col.cells.map(([t, s]) => (
                                            <Cell key={t} title={t} sub={s} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3">
                                <p className="mb-2 text-center text-[14px] font-bold text-[var(--color-ink)]">
                                    {d.workflowTitle}
                                    {d.workflowSub && (
                                        <span className="text-[12px] font-medium text-[var(--color-ink-subtle)]">
                                            {" "}
                                            {d.workflowSub}
                                        </span>
                                    )}
                                </p>
                                <div className="grid grid-cols-4 gap-2">
                                    {WORKFLOW.map(([t, s]) => (
                                        <Cell key={t} title={t} sub={s} />
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3">
                                <p className="mb-2 text-center text-[14px] font-bold text-[var(--color-ink)]">
                                    {d.sharedTitle}
                                    {d.sharedSub && (
                                        <span className="text-[12px] font-medium text-[var(--color-ink-subtle)]">
                                            {" "}
                                            {d.sharedSub}
                                        </span>
                                    )}
                                </p>
                                <div className="grid grid-cols-4 gap-2">
                                    {SHARED.map(([t, s]) => (
                                        <Cell key={t} title={t} sub={s} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Band>
                </div>

                {/* Platform services */}
                <Band>
                    <BandLabel
                        icon={SlidersHorizontal}
                        en={d.bandPlatform}
                        ko={d.bandPlatformSub || undefined}
                    />
                    <div className="grid grid-cols-7 gap-2.5">
                        {PLATFORM.map(([t, s]) => (
                            <Cell key={t} title={t} sub={s} />
                        ))}
                    </div>
                </Band>

                {/* Model layer */}
                <Band>
                    <BandLabel icon={Cpu} en={d.bandModel} ko={d.bandModelSub || undefined} />
                    <div className="grid grid-cols-[1fr_1.4fr] gap-3">
                        <div className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3">
                            <p className="mb-2.5 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                Public / General LLM
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {PUBLIC_LLM.map((m) => (
                                    <Chip key={m}>{m}</Chip>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3">
                            <p className="mb-2.5 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                Private / Enterprise LLM
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {PRIVATE_LLM.map((m) => (
                                    <Chip key={m}>{m}</Chip>
                                ))}
                            </div>
                        </div>
                    </div>
                </Band>

                {/* Infrastructure */}
                <Band>
                    <BandLabel icon={Server} en={d.bandInfra} ko={d.bandInfraSub || undefined} />
                    <div className="grid grid-cols-[1fr_1.4fr] gap-3">
                        <div className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3">
                            <p className="mb-2.5 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                <Cloud className="h-3.5 w-3.5" /> Cloud
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {CLOUD.map((c) => (
                                    <Chip key={c}>{c}</Chip>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-lg border border-[#d3dcf3] bg-white/70 p-3">
                            <p className="mb-2.5 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                On-premise / Private Cloud{" "}
                                <span className="font-normal text-[var(--color-ink-subtle)]">
                                    {d.onpremNote}
                                </span>
                            </p>
                            <div className="grid grid-cols-4 gap-2">
                                {ONPREM.map(([t]) => (
                                    <Cell key={t} title={t} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Band>
            </div>
        </div>
    );
}
