import { Boxes, KeyRound, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Product 핵심 기술 — 판단과 실행의 분리, 인증 정보 경계.
 * 중앙 정렬한 키 메시지 아래에 움직이는 그림과 두 축의 설명을 둔다.
 */
const ICONS: LucideIcon[] = [Boxes, KeyRound];

const COPY: Record<
    Locale,
    {
        title: string;
        lead: string;
        groups: { title: string; items: string[] }[];
        note: string;
    }
> = {
    ko: {
        title: "에이전트의 판단과 실행을 분리하고,\n인증 정보는 실행 환경 밖에 둡니다",
        lead: "에이전트는 코드를 실행하고 외부 시스템에 접근합니다. XGEN은 판단과 실행의 위치를 나누고, 에이전트가 악성 문서나 프롬프트 인젝션으로 잘못된 명령을 실행할 수 있다는 전제에서 실행 환경을 설계합니다.",
        groups: [
            {
                title: "에이전트별 격리 실행",
                items: [
                    "판단과 작업 지시를 맡는 Harness와 코드를 실행하는 Sandbox를 별도 서비스로 분리합니다.",
                    "에이전트별로 격리된 컨테이너에서 코드를 실행합니다.",
                    "작업 환경은 세션이 끝나도 보존되어 다음 세션에서 이어서 사용합니다.",
                ],
            },
            {
                title: "침해를 전제로 한 인증 설계",
                items: [
                    "에이전트와 실행 환경에 외부 서비스용 API 키나 OAuth 토큰 같은 장기 인증정보를 보관하지 않습니다.",
                    "외부 연동이 필요하면 API에서 사용자 위임 권한과 에이전트 신원을 검증한 뒤 인증 정보를 전달합니다.",
                    "실행 기록에 남기 전에 비밀값을 가립니다.",
                ],
            },
        ],
        note: "격리 수준과 권한 범위는 배포 환경과 구성에 따라 달라질 수 있습니다.",
    },
    en: {
        title: "Separate agent reasoning from execution,\nand keep credentials outside the runtime",
        lead: "Agents run code and reach external systems. XGEN separates where decisions and execution happen, and designs the execution environment on the assumption that a malicious document or prompt injection can lead an agent to run the wrong command.",
        groups: [
            {
                title: "Isolated execution per agent",
                items: [
                    "The Harness, which reasons and directs work, and the Sandbox, which runs code, are separate services.",
                    "Code runs in an isolated container for each agent.",
                    "The working environment persists after a session ends and carries over to the next one.",
                ],
            },
            {
                title: "Credential design that assumes compromise",
                items: [
                    "Agents and execution environments do not hold long-lived credentials such as API keys or OAuth tokens for external services.",
                    "When an external connection is needed, the API verifies delegated user permission and agent identity before passing credentials.",
                    "Secret values are masked before they reach execution records.",
                ],
            },
        ],
        note: "Isolation level and permission scope can vary by deployment environment and configuration.",
    },
};

const FLOWS = [
    { path: "M92 100 H136", color: "#2f7bff", delay: "0s" },
    { path: "M264 100 H300", color: "#0f9d8f", delay: "1.4s" },
    { path: "M348 100 H392", color: "#0f9d8f", delay: "2.1s" },
];

function IsolationArt() {
    return (
        <div className="rounded-2xl border border-[var(--color-line)] bg-gradient-to-br from-[#f2f7ff] via-white to-[#eef8f5] p-5">
            <style>{`
                .iso-flow { opacity: 0; }
                @media (prefers-reduced-motion: no-preference) {
                    .iso-flow { animation: iso-flow 2.8s linear infinite; }
                    .iso-box { animation: iso-box 3s ease-in-out infinite; }
                }
                @keyframes iso-flow {
                    0% { opacity: 0; offset-distance: 0%; }
                    15%, 85% { opacity: 1; }
                    100% { opacity: 0; offset-distance: 100%; }
                }
                @keyframes iso-box {
                    0%, 100% { stroke-opacity: 0.45; }
                    50% { stroke-opacity: 1; }
                }
            `}</style>
            <svg
                viewBox="0 0 480 200"
                fill="none"
                className="w-full"
                aria-hidden="true"
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <rect x="12" y="70" width="80" height="60" rx="12" fill="#1b4fb0" />
                <text x="52" y="105" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#ffffff">
                    Harness
                </text>

                <rect x="136" y="22" width="128" height="156" rx="14" fill="#ffffff" stroke="#cfe0ff" strokeWidth="1.5" />
                <text x="200" y="44" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#1b4fb0">
                    Sandbox
                </text>
                {[56, 96, 136].map((y, i) => (
                    <g key={y}>
                        <rect
                            className="iso-box"
                            style={{ animationDelay: `${i * 0.5}s` }}
                            x="152"
                            y={y}
                            width="96"
                            height="30"
                            rx="8"
                            fill="#eff4ff"
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                        />
                        <text x="200" y={y + 19.5} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#1b4fb0">
                            Agent {i + 1}
                        </text>
                    </g>
                ))}

                <rect x="300" y="70" width="48" height="60" rx="12" fill="#0f9d8f" />
                <text x="324" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">
                    API
                </text>

                <rect x="392" y="70" width="76" height="60" rx="12" fill="#ffffff" stroke="#cfe0ff" strokeWidth="1.5" />
                <text x="430" y="97" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1b4fb0">
                    External
                </text>
                <text x="430" y="112" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1b4fb0">
                    Service
                </text>

                {FLOWS.map((f) => (
                    <g key={f.path}>
                        <path d={f.path} stroke="#bcd0f5" strokeWidth="2" />
                        <circle
                            className="iso-flow"
                            r="4"
                            fill={f.color}
                            style={{ offsetPath: `path("${f.path}")`, animationDelay: f.delay }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}

export function ProductIsolation({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <div id="isolated-execution" className="mt-16 scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] pt-16">
            <div className="text-center">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    Isolated Execution
                </p>
                <h3 className="mx-auto mt-3 max-w-3xl whitespace-pre-line text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                    {t.title}
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.lead}
                </p>
                <div className="mx-auto mt-8 max-w-2xl">
                    <IsolationArt />
                </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
                {t.groups.map((g, i) => {
                    const Icon = ICONS[i];
                    return (
                        <div key={g.title} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h4 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {g.title}
                                </h4>
                            </div>
                            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {g.items.map((it) => (
                                    <li key={it}>{it}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            <p className="mt-4 text-center text-[14px] text-[var(--color-ink-subtle)]">{t.note}</p>
        </div>
    );
}
