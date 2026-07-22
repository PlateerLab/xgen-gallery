import Link from "next/link";
import {
    Wrench,
    ShieldAlert,
    Activity,
    LifeBuoy,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = {
    title: "운영지원·기술지원",
    description:
        "구축을 넘어 운영까지 — XGEN 온프레미스 환경의 유지보수, 장애 대응, 모니터링, 운영지원(상주·원격)을 제공합니다.",
    alternates: { canonical: "/support" },
    openGraph: {
        title: "운영지원·기술지원 · Plateer Labs",
        description:
            "유지보수·장애처리·모니터링·SLA — 구축 이후 안정적인 운영을 책임집니다.",
        type: "website",
        url: absoluteUrl("/support"),
    },
};

/** 지원 범위. */
const SCOPE: { icon: LucideIcon; ko: string; en: string; desc: string }[] = [
    {
        icon: Wrench,
        ko: "유지보수",
        en: "Maintenance",
        desc: "정기 점검과 패치·업데이트 적용으로 플랫폼을 최신·안정 상태로 유지합니다.",
    },
    {
        icon: ShieldAlert,
        ko: "장애 대응",
        en: "Incident Response",
        desc: "장애 접수부터 진단·조치·복구까지 신속하게 대응하고, 재발 방지책을 마련합니다.",
    },
    {
        icon: Activity,
        ko: "모니터링",
        en: "Monitoring",
        desc: "시스템·모델·리소스 상태를 상시 모니터링해 이상 징후를 사전에 감지합니다.",
    },
    {
        icon: LifeBuoy,
        ko: "운영지원",
        en: "Operations Support",
        desc: "상주 또는 원격 운영 체계로 문의 대응과 운영 안정화를 지속 지원합니다.",
    },
];

/** 유지보수 방법 — 장애 심각도 단계별 SLA(고객 제공 정책). */
const SEVERITY: {
    level: string;
    urgency: string;
    state: string;
    stop: string;
    action: string;
    first: string;
    target: string;
}[] = [
    {
        level: "Lv. 1",
        urgency: "매우 높음",
        state: "운영 시스템의 작동이 중단되었거나, 재현적으로 되지 않는 상황으로 전체 업무에 중대한 영향을 미치는 상태 (운영 서비스 중지, 주요 기능 마비, 데이터 손실 등)",
        stop: "O",
        action: "즉각적인 대응",
        first: "2시간 이내",
        target: "8시간 이내",
    },
    {
        level: "Lv. 2",
        urgency: "높음",
        state: "운영 시스템이 정상되지는 않지만, 일시 해결이 가능하고 주요 기능은 복구가 가능한 상태 (DR 가능 또는 고객 재서비스로의 제한적인 기능 사용 등)",
        stop: "O",
        action: "긴급 대체 지원 및 조치",
        first: "8시간 이내",
        target: "16시간 이내",
    },
];

export default function SupportPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "운영지원·기술지원",
                        serviceType: "Enterprise AI Operations & Support",
                        provider: {
                            "@type": "Organization",
                            name: SITE.name,
                            url: SITE.url,
                        },
                        areaServed: "KR",
                        description:
                            "XGEN 온프레미스 환경의 유지보수·장애 대응·모니터링·운영지원.",
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Applied AI", path: "/solutions" },
                        { name: "운영지원·기술지원", path: "/support" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Applied AI · 운영지원·기술지원
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        구축을 넘어, 운영까지 책임집니다
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        온프레미스 환경에서 XGEN이 안정적으로 돌아가도록 유지보수, 장애
                        대응, 모니터링, 운영지원을 제공합니다. 구축 이후에도 현장과 함께
                        운영을 지속 지원합니다.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/contact?type=poc"
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            기술지원 문의
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href="#scope"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            지원 범위 보기
                        </a>
                    </div>
                </div>
            </section>

            <main>
                {/* 지원 범위 */}
                <section
                    id="scope"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Scope
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            지원 범위
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {SCOPE.map((s) => (
                                <div
                                    key={s.en}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#2f7bff]/40 hover:shadow-[0_12px_30px_-16px_rgba(20,40,80,0.35)]"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <s.icon className="h-5 w-5" />
                                    </span>
                                    <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                        {s.en}
                                    </p>
                                    <h3 className="mt-1 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {s.ko}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {s.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 장애 대응 프로세스 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Incident Response
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            장애 대응 프로세스
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            장애 발생부터 접수·상태 파악·무상처리·종료까지, 담당 조직 간
                            협업으로 신속하게 처리합니다.
                        </p>
                        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white p-5">
                            <svg
                                viewBox="0 0 800 350"
                                className="w-full min-w-[720px]"
                                role="img"
                                aria-label="장애 처리 프로세스 흐름도 — 운영 담당자, 고객 기술지원, XGEN 플랫폼 운영팀"
                                fontFamily="Pretendard, system-ui, sans-serif"
                            >
                                <defs>
                                    <marker id="ifa" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                                        <path d="M0 0 L9 4.5 L0 9 z" fill="#94a3b8" />
                                    </marker>
                                </defs>
                                {/* 레인 헤더 */}
                                <g>
                                    <rect x="0" y="0" width="176" height="28" rx="4" fill="#eef2f8" />
                                    <rect x="186" y="0" width="286" height="28" rx="4" fill="#e5edf9" />
                                    <rect x="482" y="0" width="318" height="28" rx="4" fill="#eef2f8" />
                                    <g textAnchor="middle" fontSize="13" fontWeight="700" fill="#33436e">
                                        <text x="88" y="19">운영 담당자</text>
                                        <text x="329" y="19">고객 기술지원</text>
                                        <text x="641" y="19">XGEN 플랫폼 운영팀</text>
                                    </g>
                                </g>
                                {/* 레인 구분선 */}
                                <g stroke="#e6e8f4" strokeWidth="1.5" strokeDasharray="3 5">
                                    <line x1="181" y1="34" x2="181" y2="344" />
                                    <line x1="477" y1="34" x2="477" y2="344" />
                                </g>
                                {/* 화살표 */}
                                <g stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#ifa)">
                                    <path d="M132 78 L198 74" />
                                    <path d="M255 100 L255 160" />
                                    <path d="M311 200 L494 202" />
                                    <path d="M628 203 L652 203" />
                                    <path d="M199 200 L164 205" />
                                    <path d="M88 234 L88 291" />
                                    <path d="M716 230 L716 320 L134 320" />
                                </g>
                                {/* 노드 — 운영 담당자 */}
                                <g>
                                    <ellipse cx="88" cy="78" rx="44" ry="27" fill="#eef4ff" stroke="#9db6f0" strokeWidth="1.5" />
                                    <text x="88" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">장애</text>
                                    <text x="88" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">발생</text>

                                    <rect x="16" y="184" width="144" height="50" rx="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                    <text x="88" y="214" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">장애 조치 진행중</text>

                                    <ellipse cx="88" cy="318" rx="44" ry="27" fill="#eef4ff" stroke="#9db6f0" strokeWidth="1.5" />
                                    <text x="88" y="314" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">장애</text>
                                    <text x="88" y="330" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">종료</text>
                                </g>
                                {/* 노드 — 고객 기술지원 */}
                                <g>
                                    <rect x="200" y="52" width="110" height="46" rx="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                    <text x="255" y="79" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">장애접수</text>

                                    <path d="M255 164 L311 200 L255 236 L199 200 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                    <text x="255" y="205" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">상태식별</text>
                                </g>
                                {/* 노드 — XGEN 플랫폼 운영팀 */}
                                <g>
                                    <rect x="496" y="178" width="132" height="50" rx="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                    <text x="562" y="207" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">상태 파악</text>
                                    <text x="496" y="250" fontSize="11" fill="#64748b">* 고객사 연락 – 부문별 담당자 조치</text>

                                    <rect x="654" y="178" width="120" height="50" rx="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                    <text x="714" y="207" textAnchor="middle" fontSize="13" fontWeight="600" fill="#33436e">무상처리</text>
                                    <text x="654" y="250" fontSize="11" fill="#64748b">* 장애조치 리포트</text>
                                </g>
                                {/* DR 각주 */}
                                <text x="800" y="344" textAnchor="end" fontSize="11" fill="#94a3b8">* DR (Disaster Recovery) : 재해복구</text>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* 유지보수 방법 — 기간 + 장애 심각도 단계 SLA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Maintenance
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            유지보수 방법
                        </h2>

                        {/* 유지보수 기간 */}
                        <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-6 py-4">
                            <span className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                                유지보수 기간
                            </span>
                            <span className="text-[20px] font-bold tracking-tight text-[#2461d8]">
                                검수일로부터 1년
                            </span>
                        </div>

                        {/* 장애 심각도 단계 표 */}
                        <p className="mt-10 text-[15px] font-bold text-[var(--color-ink)]">
                            장애 심각도 단계
                        </p>
                        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
                            <table className="w-full min-w-[860px] border-collapse text-left">
                                <thead>
                                    <tr className="bg-[var(--color-ink)] text-white">
                                        {[
                                            "구분",
                                            "긴급도",
                                            "장애 상태",
                                            "시스템 운영 중단 여부",
                                            "대응 형태",
                                            "최초응답시간",
                                            "목표처리시간",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="px-4 py-3 text-[13.5px] font-semibold"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {SEVERITY.map((r) => (
                                        <tr
                                            key={r.level}
                                            className="border-t border-[var(--color-line)] align-top"
                                        >
                                            <td className="px-4 py-4 text-[15px] font-bold text-[#2461d8]">
                                                {r.level}
                                            </td>
                                            <td className="px-4 py-4 text-[14px] font-semibold text-[var(--color-ink)]">
                                                {r.urgency}
                                            </td>
                                            <td className="px-4 py-4 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {r.state}
                                            </td>
                                            <td className="px-4 py-4 text-center text-[15px] font-bold text-[var(--color-ink)]">
                                                {r.stop}
                                            </td>
                                            <td className="px-4 py-4 text-[14px] font-semibold text-[#1f9d57]">
                                                {r.action}
                                            </td>
                                            <td className="px-4 py-4 text-[14px] font-semibold text-[var(--color-ink)]">
                                                {r.first}
                                            </td>
                                            <td className="px-4 py-4 text-[14px] font-semibold text-[var(--color-ink)]">
                                                {r.target}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 안내 주석 */}
                        <ul className="mt-6 space-y-2 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[var(--color-ink-subtle)]" />
                                고객에게 구두 사항, 해결 방법 제시 및 대응 시간에 맞추기 위해
                                당사는 최대의 노력을 기울입니다. 단, 위에 명시된 시간을 준수하지
                                못하는 경우가 계약 위반을 의미하지는 않습니다.
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[var(--color-ink-subtle)]" />
                                <span>
                                    <span className="font-semibold text-[var(--color-ink)]">
                                        최초응답시간
                                    </span>
                                    : 장애 접수 시점으로부터 담당 엔지니어가 고객에게 연락하여
                                    장애 상황에 대한 정보를 확인하기까지의 소요 시간
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[var(--color-ink-subtle)]" />
                                <span>
                                    <span className="font-semibold text-[var(--color-ink)]">
                                        목표처리시간
                                    </span>
                                    : 장애 상황 파악 시점으로부터 담당 엔지니어가 복구하는
                                    시점까지의 목표 처리 시간
                                </span>
                            </li>
                        </ul>
                        <p className="mt-3 text-[13px] text-[var(--color-ink-subtle)]">
                            * DR (Disaster Recovery): 재해복구
                        </p>
                    </div>
                </section>

                {/* 운영 모델 + CTA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <div className="flex flex-col items-start gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                                    운영 모델은 환경에 맞춰 제안합니다
                                </h2>
                                <p className="mt-2.5 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    상주·원격 운영, 지원 범위와 SLA는 고객 환경과 요건에 맞춰
                                    함께 설계합니다. 필요한 지원 내용을 알려주세요.
                                </p>
                            </div>
                            <Link
                                href="/contact?type=poc"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                기술지원 문의
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
