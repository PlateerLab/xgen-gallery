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
    title: "운영·기술지원",
    description:
        "구축을 넘어 운영까지 — XGEN 온프레미스 환경의 유지보수, 장애 대응, 모니터링, 운영지원(상주·원격)을 제공합니다.",
    alternates: { canonical: "/support" },
    openGraph: {
        title: "운영·기술지원 · Plateer Labs",
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
                        name: "운영·기술지원",
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
                        { name: "운영·기술지원", path: "/support" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Applied AI · 운영·기술지원
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
                        <div className="mt-8 max-w-[60%] overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white p-5">
                            <svg
                                viewBox="0 0 840 400"
                                className="w-full min-w-[440px]"
                                role="img"
                                aria-label="장애 처리 프로세스 흐름도 — 고객사와 자사(Plateer Labs) 협업"
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
                                    <text x="98" y="39" fontSize="12.5" fill="#ffffff">고객사 담당자</text>
                                    <rect x="220" y="22" width="592" height="26" rx="13" fill="#2563eb" />
                                    <text x="516" y="39" fontSize="12.5" fill="#ffffff">Plateer Labs · 자사</text>
                                </g>
                                {/* 자사 하위 레인 라벨 + 구분선 */}
                                <g>
                                    <line x1="496" y1="58" x2="496" y2="384" stroke="#dbe7fb" strokeWidth="1.5" strokeDasharray="3 6" />
                                    <text x="348" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b78c4">기술지원</text>
                                    <text x="664" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b78c4">플랫폼 운영팀</text>
                                </g>

                                {/* 커넥터 */}
                                <g stroke="#8ea6c8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#ifa)">
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
                                    <text x="98" y="103">장애 발생</text>
                                    <text x="98" y="357">장애 종료</text>
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
                                    <text x="102" y="244" fill="#334155">장애 조치 진행중</text>
                                    <text x="350" y="107" fill="#1f2b45">장애접수</text>
                                    <text x="348" y="241" fill="#1f2b45" fontWeight="700">상태식별</text>
                                    <text x="596" y="242" fill="#1f2b45">상태 파악</text>
                                    <text x="754" y="242" fill="#1f2b45">무상처리</text>
                                </g>
                                {/* 주석 */}
                                <g fontSize="11" fill="#64748b">
                                    <text x="524" y="286">* 고객사 연락 – 부문별 담당자 조치</text>
                                    <text x="688" y="286">* 장애조치 리포트</text>
                                </g>
                                <text x="824" y="388" textAnchor="end" fontSize="11" fill="#94a3b8">* DR (Disaster Recovery) : 재해복구</text>
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
                                당사는 최대의 노력을 기울입니다.
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

                        {/* 유상 유지보수 */}
                        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 md:p-8">
                            <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                유상 유지보수
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                <li className="flex gap-2.5">
                                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                    무상 유지보수 종료 후 별도 계약에 의해 지원합니다.
                                </li>
                                <li className="flex gap-2.5">
                                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                    유지보수 대상을 넘어서는 범위 또는 구조적 변경은 유지보수
                                    대상에서 제외됩니다.
                                </li>
                                <li className="flex gap-2.5">
                                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                    유지보수 비용은 응용소프트웨어의 경우 지식경제부 고시
                                    「소프트웨어 사업대가」 기준의 용역 유지보수 대가 산정에
                                    의거하여 상호 협의로 결정합니다.
                                </li>
                            </ul>
                        </div>
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
