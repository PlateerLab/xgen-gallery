import Link from "next/link";
import {
    ArrowRight,
    Brain,
    CalendarClock,
    FolderOpen,
    Hammer,
    RefreshCw,
    Search,
    type LucideIcon,
} from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * Product 핵심 기술 — Geny(Agent 실행 환경) 소개 블록.
 * 중앙 정렬한 키 메시지 아래에 움직이는 그림과 항목 카드를 둔다.
 */
const ICONS: LucideIcon[] = [Brain, FolderOpen, Search, Hammer, CalendarClock, RefreshCw];

const COPY: Record<
    Locale,
    {
        title: string;
        lead: string;
        items: [string, string][];
        controlTitle: string;
        controls: [string, string][];
        relation: string;
        status: string;
        cta: string;
    }
> = {
    ko: {
        title: "답변을 넘어, 업무를 이어가는 Agent 실행 환경",
        lead: "Geny는 XGEN 안에서 Agent가 일하는 방식을 담당하는 실행 환경입니다. Memory, Workspace, Tool, Schedule을 기본으로 제공해, Agent가 이전 업무의 맥락을 이어받고 결과물을 쌓아 다음 업무에 활용하도록 돕습니다. 기존 XGEN Canvas의 Agent 제작 방식은 그대로 유지됩니다.",
        items: [
            ["Memory", "대화와 작업에서 얻은 정보를 축적하고, 이후 업무에 필요한 내용을 찾아 활용합니다."],
            ["Workspace", "Agent별 독립 작업 공간에 문서·자료·Tool을 보관합니다. 공유한 Agent와 Tool은 조직의 자산으로 쌓입니다."],
            ["Tool Search", "연결된 Tool을 한꺼번에 읽지 않고, 현재 업무에 필요한 Tool을 찾아 사용합니다."],
            ["Tool Creation", "필요한 Tool이 없으면 Agent가 코드를 작성하고 테스트해 Workspace에 저장합니다."],
            ["Schedule", "정기 보고, 데이터 점검처럼 반복되는 업무를 정해진 시점에 실행합니다."],
            ["Geny RSI", "대화가 끝날 때마다 작업 방식을 돌아보고 작업 지침과 도구 구성을 수정해, 다음 대화에 반영합니다."],
        ],
        controlTitle: "기업 운영을 위한 통제",
        controls: [
            ["실행 통제", "XGEN의 권한·보안·거버넌스 체계 안에서, 기업이 허용한 범위로 실행합니다."],
            ["버전 고정", "검증한 시점의 Agent를 고정본으로 보존해 서비스에 배포합니다. 원본 개선과 서비스 운영을 분리합니다."],
        ],
        relation: "Geny는 Agent가 어떻게 일할지를, DexOn은 Agent가 어디까지 일할지를 담당합니다. 함께 쓰면 허용된 범위에서 사용자 기기의 업무 환경까지 활용할 수 있습니다.",
        status: "Geny의 주요 기능은 운영 환경에 배포되어 있으며, 정식 활성화 전 안정성과 품질을 검증하고 있습니다. 제공 범위는 환경과 구성에 따라 달라질 수 있습니다.",
        cta: "Geny 자세히 보기",
    },
    en: {
        title: "An agent runtime that carries work forward, beyond answers",
        lead: "Geny is the runtime inside XGEN that defines how agents work. With Memory, Workspace, Tools, and Schedule built in, it helps an agent pick up earlier context and build on past results in the next task. The existing way of building agents in XGEN Canvas stays the same.",
        items: [
            ["Memory", "Collects information from conversations and tasks, and finds what later work needs."],
            ["Workspace", "Keeps documents, materials, and tools in a separate workspace per agent. Shared agents and tools build up as organizational assets."],
            ["Tool Search", "Finds the tools the current task needs instead of loading every connected tool at once."],
            ["Tool Creation", "When a needed tool does not exist, the agent writes and tests the code and saves it to the Workspace."],
            ["Schedule", "Runs recurring work, such as regular reports and data checks, at set times."],
            ["Geny RSI", "After each conversation, reviews how the work went and adjusts its instructions and tool setup for the next one."],
        ],
        controlTitle: "Controls for enterprise operation",
        controls: [
            ["Execution control", "Runs within XGEN's permission, security, and governance framework, in the scope your organization allows."],
            ["Version pinning", "Preserves an agent as verified and deploys that pinned copy, keeping improvement separate from service operation."],
        ],
        relation: "Geny defines how an agent works; DexOn defines how far it can reach. Together, an agent can use the work environment on user devices within the allowed scope.",
        status: "Geny's main features are deployed to production and are being verified for stability and quality before general activation. Availability can vary by environment and configuration.",
        cta: "Learn more about Geny",
    },
};

const NODES = [
    { x: 56, y: 44, label: "Memory", delay: "0s" },
    { x: 264, y: 44, label: "Workspace", delay: "1s" },
    { x: 56, y: 156, label: "Tool", delay: "2s" },
    { x: 264, y: 156, label: "Schedule", delay: "3s" },
];

function GenyArt() {
    return (
        <div className="rounded-2xl border border-[var(--color-line)] bg-gradient-to-br from-[#f2f7ff] via-white to-[#eef8f5] p-5">
            <style>{`
                .gy-flow { opacity: 0; }
                .gy-ring { opacity: 0.5; }
                @media (prefers-reduced-motion: no-preference) {
                    .gy-flow { animation: gy-flow 4s linear infinite; }
                    .gy-ring { animation: gy-ring 4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
                    .gy-spin { animation: gy-spin 16s linear infinite; transform-box: view-box; transform-origin: 160px 100px; }
                }
                @keyframes gy-flow {
                    0% { opacity: 0; offset-distance: 0%; }
                    12% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { opacity: 0; offset-distance: 100%; }
                }
                @keyframes gy-ring {
                    0% { opacity: 0.5; transform: scale(0.82); }
                    70%, 100% { opacity: 0; transform: scale(1.22); }
                }
                @keyframes gy-spin { to { transform: rotate(360deg); } }
            `}</style>
            <svg
                viewBox="0 0 320 200"
                fill="none"
                className="w-full"
                aria-hidden="true"
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="gy-core" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#3b82f6" />
                        <stop offset="1" stopColor="#1b4fb0" />
                    </linearGradient>
                </defs>
                <circle cx="160" cy="100" r="72" fill="#dbeafe" opacity="0.5" />
                <circle className="gy-ring" cx="160" cy="100" r="52" stroke="#3b82f6" strokeWidth="2" />
                <circle
                    className="gy-spin"
                    cx="160"
                    cy="100"
                    r="64"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="2 7"
                />
                {NODES.map((n) => {
                    const path = `M${n.x} ${n.y} L160 100`;
                    return (
                        <g key={n.label}>
                            <path d={path} stroke="#bcd0f5" strokeWidth="2" />
                            <circle
                                className="gy-flow"
                                r="4"
                                fill="#0f9d8f"
                                style={{ offsetPath: `path("${path}")`, animationDelay: n.delay }}
                            />
                            <rect
                                x={n.x - 40}
                                y={n.y - 14}
                                width="80"
                                height="28"
                                rx="9"
                                fill="#ffffff"
                                stroke="#cfe0ff"
                                strokeWidth="1.5"
                            />
                            <text
                                x={n.x}
                                y={n.y + 4.5}
                                textAnchor="middle"
                                fontSize="12.5"
                                fontWeight="700"
                                fill="#1b4fb0"
                            >
                                {n.label}
                            </text>
                        </g>
                    );
                })}
                <circle cx="160" cy="100" r="34" fill="url(#gy-core)" />
                <text x="160" y="105.5" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff">
                    Geny
                </text>
            </svg>
        </div>
    );
}

export function ProductGeny({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div id="geny" className="mt-16 scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] pt-16">
            <div className="text-center">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    Agent Runtime · Geny
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                    {t.title}
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.lead}
                </p>
                <div className="mx-auto mt-8 max-w-xl">
                    <GenyArt />
                </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.items.map(([name, desc], i) => {
                    const Icon = ICONS[i];
                    return (
                        <div key={name} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h4 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {name}
                                </h4>
                            </div>
                            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {desc}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <div>
                    <h4 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                        {t.controlTitle}
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                        {t.controls.map(([name, desc]) => (
                            <li key={name} className="flex items-start gap-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                <ArrowRight className="mt-1 h-4 w-4 flex-none text-[#2f7bff]" />
                                <span>
                                    <strong className="font-semibold text-[var(--color-ink)]">{name}</strong>
                                    {" · "}
                                    {desc}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{t.relation}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink-subtle)]">{t.status}</p>
                    <Link
                        href={localeHref(locale, "/blog/product-xgeny")}
                        className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8]"
                    >
                        {t.cta}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
