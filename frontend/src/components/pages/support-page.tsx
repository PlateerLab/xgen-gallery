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
import { SITE } from "@/lib/site";

/** 지원 범위. */
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const SCOPE_ICONS: LucideIcon[] = [Wrench, ShieldAlert, Activity, LifeBuoy];
const SCOPE_EN = ["Maintenance", "Incident Response", "Monitoring", "Operations Support"];

interface SupportCopy {
    ldName: string;
    ldDescription: string;
    breadcrumb: string;
    scope: [string, string][];
    severity: {
        level: string;
        urgency: string;
        state: string;
        stop: string;
        action: string;
        first: string;
        target: string;
    }[];
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    ctaContact: string;
    ctaScope: string;
    scopeTitle: string;
    processTitle: string;
    processLead: string;
    flowAria: string;
    flow: Record<string, string>;
    maintenanceTitle: string;
    tableHeaders: string[];
    stateHeader: string;
    effortNote: string;
    firstLabel: string;
    firstDesc: string;
    targetLabel: string;
    targetDesc: string;
    drNote: string;
    paidTitle: string;
    paidDesc: string;
    closingTitle: string;
    closingLead: string;
    closingCta: string;
}

const COPY: Record<Locale, SupportCopy> = {
    ko: {
        ldName: "운영·기술지원",
        ldDescription: "XGEN 온프레미스 환경의 유지보수·장애 대응·모니터링·운영지원.",
        breadcrumb: "운영·기술지원",
        scope: [
            ["유지보수", "정기 점검과 패치·업데이트 적용으로 플랫폼을 최신·안정 상태로 유지합니다."],
            ["장애 대응", "장애 접수부터 진단·조치·복구까지 신속하게 대응하고, 재발 방지책을 마련합니다."],
            ["모니터링", "시스템·모델·리소스 상태를 상시 모니터링해 이상 징후를 사전에 감지합니다."],
            ["운영지원", "상주 또는 원격 운영 체계로 문의 대응과 운영 안정화를 지속 지원합니다."],
        ],
        severity: [
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
        ],
        heroEyebrow: "Applied AI · 운영·기술지원",
        heroTitle: "구축을 넘어, 운영까지 책임집니다",
        heroLead:
            "온프레미스 환경에서 XGEN이 안정적으로 돌아가도록 유지보수, 장애 대응, 모니터링, 운영지원을 제공합니다. 구축 이후에도 현장과 함께 운영을 지속 지원합니다.",
        ctaContact: "기술지원 문의",
        ctaScope: "지원 범위 보기",
        scopeTitle: "지원 범위",
        processTitle: "장애 대응 프로세스",
        processLead:
            "장애 발생부터 접수·상태 파악·무상처리·종료까지, 담당 조직 간 협업으로 신속하게 처리합니다.",
        flowAria: "장애 처리 프로세스 흐름도 — 고객사와 자사(Plateer Labs) 협업",
        flow: {
            customer: "고객사 담당자",
            techSupport: "기술지원",
            platformOps: "플랫폼 운영팀",
            start: "장애 발생",
            end: "장애 종료",
            inProgress: "장애 조치 진행중",
            intake: "장애접수",
            identify: "상태식별",
            assess: "상태 파악",
            free: "무상처리",
            note1: "* 고객사 연락 – 부문별 담당자 조치",
            note2: "* 장애조치 리포트",
        },
        maintenanceTitle: "유지보수",
        tableHeaders: ["구분", "긴급도", "장애 상태", "운영 중단", "대응 형태", "최초 응답", "목표 처리"],
        stateHeader: "장애 상태",
        effortNote:
            "고객에게 구두 사항, 해결 방법 제시 및 대응 시간에 맞추기 위해 당사는 최대의 노력을 기울입니다.",
        firstLabel: "최초응답시간",
        firstDesc:
            ": 장애 접수 시점으로부터 담당 엔지니어가 고객에게 연락하여 장애 상황에 대한 정보를 확인하기까지의 소요 시간",
        targetLabel: "목표처리시간",
        targetDesc:
            ": 장애 상황 파악 시점으로부터 담당 엔지니어가 복구하는 시점까지의 목표 처리 시간",
        drNote: "* DR (Disaster Recovery): 재해복구",
        paidTitle: "유상 유지보수",
        paidDesc: "무상 유지보수 종료 후 별도 계약에 의해 지원합니다.",
        closingTitle: "운영 모델은 환경에 맞춰 제안합니다",
        closingLead:
            "상주·원격 운영, 지원 범위와 SLA는 고객 환경과 요건에 맞춰 함께 설계합니다. 필요한 지원 내용을 알려주세요.",
        closingCta: "기술지원 문의",
    },
    en: {
        ldName: "Operations and technical support",
        ldDescription:
            "Maintenance, incident response, monitoring, and operations support for XGEN on-premise environments.",
        breadcrumb: "Operations and support",
        scope: [
            ["Maintenance", "Scheduled reviews plus patches and updates keep the platform current and stable."],
            ["Incident response", "From intake through diagnosis, remediation, and recovery — handled quickly, with prevention measures put in place."],
            ["Monitoring", "System, model, and resource state watched continuously so anomalies surface early."],
            ["Operations support", "On-site or remote operations that keep answering questions and stabilizing the service."],
        ],
        severity: [
            {
                level: "Lv. 1",
                urgency: "Critical",
                state: "The production system has stopped, or is failing unpredictably, with major impact across the business (service outage, key functions down, data loss)",
                stop: "Yes",
                action: "Immediate response",
                first: "Within 2 hours",
                target: "Within 8 hours",
            },
            {
                level: "Lv. 2",
                urgency: "High",
                state: "The production system is not fully healthy but can be worked around temporarily, and key functions are recoverable (DR available, or limited functionality through a fallback)",
                stop: "Yes",
                action: "Urgent workaround and remediation",
                first: "Within 8 hours",
                target: "Within 16 hours",
            },
        ],
        heroEyebrow: "Applied AI · Operations and support",
        heroTitle: "Past the build — we stay responsible for operations",
        heroLead:
            "Maintenance, incident response, monitoring, and operations support that keep XGEN running steadily on-premise. After the build, we stay with the site and keep supporting operations.",
        ctaContact: "Contact technical support",
        ctaScope: "See what's covered",
        scopeTitle: "What's covered",
        processTitle: "Incident response process",
        processLead:
            "From the incident occurring through intake, assessment, remediation under warranty, and closure — handled quickly through collaboration between the responsible teams.",
        flowAria:
            "Incident handling process flow — collaboration between the customer and Plateer Labs",
        flow: {
            customer: "Customer contact",
            techSupport: "Technical support",
            platformOps: "Platform operations",
            start: "Incident occurs",
            end: "Incident closed",
            inProgress: "Remediation in progress",
            intake: "Intake",
            identify: "Triage",
            assess: "Assessment",
            free: "Covered fix",
            note1: "* Customer contact – handled by the responsible team",
            note2: "* Incident report",
        },
        maintenanceTitle: "Maintenance",
        tableHeaders: ["Level", "Urgency", "Condition", "Service down", "Response", "First response", "Target resolution"],
        stateHeader: "Condition",
        effortNote:
            "We make every effort to keep the customer informed, propose a resolution, and meet the response times above.",
        firstLabel: "First response time",
        firstDesc:
            ": the time from incident intake until the assigned engineer contacts the customer and confirms the details of the situation",
        targetLabel: "Target resolution time",
        targetDesc:
            ": the target time from understanding the situation until the assigned engineer restores service",
        // 영문에서는 약어 풀이가 불필요하다 — 빈 값이면 각주를 렌더하지 않는다.
        drNote: "",
        paidTitle: "Paid maintenance",
        paidDesc: "Supported under a separate agreement once the warranty period ends.",
        closingTitle: "We propose an operating model that fits your environment",
        closingLead:
            "On-site or remote operations, the scope of support, and the SLA are all designed with you around your environment and requirements. Tell us what you need.",
        closingCta: "Contact technical support",
    },
};

export function SupportPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const f = t.flow;
    const SCOPE = t.scope.map(([ko, desc], i) => ({
        icon: SCOPE_ICONS[i],
        ko,
        en: SCOPE_EN[i],
        desc,
    }));
    const SEVERITY = t.severity;
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: t.ldName,
                        serviceType: "Enterprise AI Operations & Support",
                        provider: {
                            "@type": "Organization",
                            name: SITE.name,
                            url: SITE.url,
                        },
                        areaServed: "KR",
                        description:
                            t.ldDescription,
                    },
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Applied AI", path: "/solutions" },
                        { name: t.breadcrumb, path: localeHref(locale, "/support") },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        {t.heroEyebrow}
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.heroTitle}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        {t.heroLead}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={localeHref(locale, "/contact") + "?type=poc&from=support"}
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            {t.ctaContact}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href="#scope"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            {t.ctaScope}
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
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Scope
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.scopeTitle}
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
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Incident Response
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.processTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.processLead}
                        </p>
                        <div className="mt-8 max-w-[90%] overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white p-5">
                            <svg
                                viewBox="0 0 840 400"
                                className="w-full min-w-[680px]"
                                role="img"
                                aria-label={t.flowAria}
                                fontFamily="Pretendard, system-ui, sans-serif"
                            >
                                <defs>
                                    <marker id="ifa" markerWidth="10" markerHeight="10" refX="7.5" refY="5" orient="auto">
                                        <path d="M0 0 L10 5 L0 10 z" fill="#8ea6c8" />
                                    </marker>
                                    <filter id="ifs" x="-30%" y="-30%" width="160%" height="170%">
                                        <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#1e3a68" floodOpacity="0.14" />
                                    </filter>
                                    <linearGradient id="gAlert" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0" stopColor="#f87171" />
                                        <stop offset="1" stopColor="#e23b3b" />
                                    </linearGradient>
                                    <linearGradient id="gEnd" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0" stopColor="#3b82f6" />
                                        <stop offset="1" stopColor="#1e40af" />
                                    </linearGradient>
                                </defs>

                                {/* 스윔레인 존 배경 */}
                                <g>
                                    <rect x="8" y="8" width="180" height="384" rx="18" fill="#f5f8fc" stroke="#e4eaf2" />
                                    <rect x="200" y="8" width="632" height="384" rx="18" fill="#eef4ff" stroke="#dbe7fb" />
                                </g>

                                {/* 존/레인 헤더 */}
                                <g textAnchor="middle" fontWeight="700">
                                    <rect x="28" y="22" width="140" height="26" rx="13" fill="#64748b" />
                                    <text x="98" y="39" fontSize="12.5" fill="#ffffff">{f.customer}</text>
                                    <rect x="220" y="22" width="592" height="26" rx="13" fill="#2563eb" />
                                    <text x="516" y="39" fontSize="12.5" fill="#ffffff" letterSpacing="0.08em">PLATEER</text>
                                </g>
                                {/* 자사 하위 레인 라벨 + 구분선 */}
                                <g>
                                    <line x1="496" y1="58" x2="496" y2="384" stroke="#dbe7fb" strokeWidth="1.5" strokeDasharray="3 6" />
                                    <text x="348" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b78c4">{f.techSupport}</text>
                                    <text x="664" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b78c4">{f.platformOps}</text>
                                </g>

                                {/* 커넥터 */}
                                <g stroke="#8ea6c8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#ifa)">
                                    <path d="M152 98 L282 100" />
                                    <path d="M348 128 L348 196" />
                                    <path d="M406 236 L522 237" />
                                    <path d="M664 237 L686 237" />
                                    <path d="M290 236 L172 238" />
                                    <path d="M98 266 L98 328" />
                                    <path d="M752 264 L752 352 L152 352" />
                                </g>

                                {/* 터미네이터 — 장애 발생(레드) / 장애 종료(블루) */}
                                <g filter="url(#ifs)">
                                    <rect x="46" y="76" width="104" height="44" rx="22" fill="url(#gAlert)" />
                                    <rect x="46" y="330" width="104" height="44" rx="22" fill="url(#gEnd)" />
                                </g>
                                <g textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#ffffff">
                                    <text x="98" y="103">{f.start}</text>
                                    <text x="98" y="357">{f.end}</text>
                                </g>

                                {/* 프로세스 카드 */}
                                <g filter="url(#ifs)">
                                    {/* 고객사 */}
                                    <rect x="26" y="212" width="144" height="54" rx="13" fill="#ffffff" stroke="#e6ecf5" />
                                    {/* 자사 */}
                                    <rect x="284" y="76" width="128" height="52" rx="13" fill="#ffffff" stroke="#e6ecf5" />
                                    <path d="M348 198 L406 236 L348 274 L290 236 Z" fill="#eff5ff" stroke="#93b8fb" strokeWidth="1.5" />
                                    <rect x="524" y="210" width="140" height="54" rx="13" fill="#ffffff" stroke="#e6ecf5" />
                                    <rect x="688" y="210" width="128" height="54" rx="13" fill="#ffffff" stroke="#e6ecf5" />
                                </g>
                                {/* 카드 좌측 액센트 스트립 */}
                                <g>
                                    <rect x="34" y="222" width="5" height="34" rx="2.5" fill="#94a3b8" />
                                    <rect x="292" y="86" width="5" height="32" rx="2.5" fill="#2f7bff" />
                                    <rect x="532" y="220" width="5" height="34" rx="2.5" fill="#2f7bff" />
                                    <rect x="696" y="220" width="5" height="34" rx="2.5" fill="#2f7bff" />
                                </g>
                                {/* 카드 라벨 */}
                                <g textAnchor="middle" fontSize="13.5" fontWeight="600">
                                    <text x="102" y="244" fill="#334155">{f.inProgress}</text>
                                    <text x="350" y="107" fill="#1f2b45">{f.intake}</text>
                                    <text x="348" y="241" fill="#1f2b45" fontWeight="700">{f.identify}</text>
                                    <text x="596" y="242" fill="#1f2b45">{f.assess}</text>
                                    <text x="754" y="242" fill="#1f2b45">{f.free}</text>
                                </g>
                                {/* 주석 */}
                                <g fontSize="11" fill="#64748b">
                                    <text x="524" y="286">{f.note1}</text>
                                    <text x="688" y="286">{f.note2}</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* 유지보수 방법 — 기간 + 장애 심각도 단계 SLA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Maintenance
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.maintenanceTitle}
                        </h2>

                        {/* 장애 심각도 단계 표 */}
                        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
                            <table className="w-full min-w-[680px] border-collapse text-left">
                                <thead>
                                    <tr className="bg-[var(--color-ink)] text-white">
                                        {[
                                            ...t.tableHeaders,
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className={
                                                    "px-3.5 py-2.5 text-[13px] font-semibold " +
                                                    (h === t.stateHeader
                                                        ? "w-full"
                                                        : "whitespace-nowrap")
                                                }
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
                                            <td className="whitespace-nowrap px-3.5 py-3 text-[14px] font-bold text-[#2461d8]">
                                                {r.level}
                                            </td>
                                            <td className="whitespace-nowrap px-3.5 py-3 text-[13.5px] font-semibold text-[var(--color-ink)]">
                                                {r.urgency}
                                            </td>
                                            <td className="w-full px-3.5 py-3 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {r.state}
                                            </td>
                                            <td className="whitespace-nowrap px-3.5 py-3 text-center text-[14px] font-bold text-[var(--color-ink)]">
                                                {r.stop}
                                            </td>
                                            <td className="whitespace-nowrap px-3.5 py-3 text-[13.5px] font-semibold text-[#1f9d57]">
                                                {r.action}
                                            </td>
                                            <td className="whitespace-nowrap px-3.5 py-3 text-[13.5px] font-semibold text-[var(--color-ink)]">
                                                {r.first}
                                            </td>
                                            <td className="whitespace-nowrap px-3.5 py-3 text-[13.5px] font-semibold text-[var(--color-ink)]">
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
                                {t.effortNote}
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[var(--color-ink-subtle)]" />
                                <span>
                                    <span className="font-semibold text-[var(--color-ink)]">
                                        {t.firstLabel}
                                    </span>
                                    {t.firstDesc}
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[var(--color-ink-subtle)]" />
                                <span>
                                    <span className="font-semibold text-[var(--color-ink)]">
                                        {t.targetLabel}
                                    </span>
                                    {t.targetDesc}
                                </span>
                            </li>
                        </ul>
                        {t.drNote && (
                            <p className="mt-3 text-[13px] text-[var(--color-ink-subtle)]">
                                {t.drNote}
                            </p>
                        )}

                        {/* 유상 유지보수 */}
                        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 md:p-8">
                            <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.paidTitle}
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                <li className="flex gap-2.5">
                                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                    {t.paidDesc}
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 운영 모델 + CTA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="flex flex-col items-start gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                                    {t.closingTitle}
                                </h2>
                                <p className="mt-2.5 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.closingLead}
                                </p>
                            </div>
                            <Link
                                href={localeHref(locale, "/contact") + "?type=poc&from=support"}
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                {t.closingCta}
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
