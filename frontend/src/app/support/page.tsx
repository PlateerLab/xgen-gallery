import Link from "next/link";
import {
    Wrench,
    ShieldAlert,
    Activity,
    LifeBuoy,
    Search,
    RotateCcw,
    ClipboardCheck,
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

/** 장애 대응 프로세스. */
const PROCESS: { icon: LucideIcon; step: string; title: string; desc: string }[] = [
    {
        icon: ClipboardCheck,
        step: "01",
        title: "접수·분류",
        desc: "장애를 접수하고 영향도·우선순위를 분류합니다.",
    },
    {
        icon: Search,
        step: "02",
        title: "진단",
        desc: "로그·모니터링으로 원인을 신속히 진단합니다.",
    },
    {
        icon: Wrench,
        step: "03",
        title: "조치·복구",
        desc: "임시 조치로 서비스를 복구하고 근본 원인을 해소합니다.",
    },
    {
        icon: RotateCcw,
        step: "04",
        title: "회고·재발방지",
        desc: "원인과 조치를 기록하고 재발 방지책을 반영합니다.",
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
                            접수에서 복구, 재발 방지까지 표준화된 절차로 신속하게 대응합니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {PROCESS.map((p) => (
                                <div
                                    key={p.step}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <p.icon className="h-5 w-5" />
                                        </span>
                                        <span className="font-mono text-[13px] font-bold text-[var(--color-ink-subtle)]">
                                            {p.step}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 운영 모델 + CTA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
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
