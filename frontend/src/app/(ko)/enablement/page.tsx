import Link from "next/link";
import {
    GraduationCap,
    Cog,
    Blocks,
    Wrench,
    Rocket,
    MapPin,
    Presentation,
    ClipboardCheck,
    LifeBuoy,
    Check,
    ChevronRight,
    ArrowRight,
    Search,
    PencilRuler,
    MousePointerClick,
    BadgeCheck,
    Headset,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Enablement",
    description:
        "솔루션 납품 후 고객사를 직접 방문해 관리자·실무자·운영자가 XGEN 기반 AI를 스스로 운영·확장하도록 교육하고 내재화하는 Enterprise AI Enablement 서비스 — 온사이트 교육, 핸즈온 실습, 운영 인수인계까지.",
    path: "/enablement",
});

/** 역할별 교육 프로그램. */
const PROGRAMS: {
    icon: LucideIcon;
    en: string;
    ko: string;
    desc: string;
    items: string[];
}[] = [
    {
        icon: Cog,
        en: "Administrator Enablement",
        ko: "관리자 교육",
        desc: "플랫폼을 안정적으로 운영할 관리자가 권한·모니터링·운영 정책을 스스로 다루도록 교육합니다.",
        items: ["컬렉션·권한 관리", "사용량·품질 모니터링", "운영 정책 설정", "장애 대응 기초"],
    },
    {
        icon: Blocks,
        en: "Practitioner Training",
        ko: "실무자 교육",
        desc: "현업 담당자가 코딩 없이 지식그래프를 만들고 에이전트·챗봇을 직접 조립하도록 실습 중심으로 진행합니다.",
        items: ["지식그래프 구축", "시맨틱 검색 활용", "노코드 에이전트 조립", "프롬프트 작성"],
    },
    {
        icon: Wrench,
        en: "Developer & Operator",
        ko: "개발자·운영자 교육",
        desc: "레거시 시스템과 연동하고 파이프라인을 운영·확장할 수 있도록 기술 인력을 교육합니다.",
        items: ["MCP·API 연동", "파이프라인 구성", "배포·업데이트", "로그·감사 추적"],
    },
    {
        icon: Rocket,
        en: "Adoption & Governance",
        ko: "정착·거버넌스",
        desc: "교육이 일회성으로 끝나지 않도록 사내 확산과 품질·거버넌스 체계를 함께 설계합니다.",
        items: ["사내 확산 전략", "사용 가이드 정착", "LLM Judge 품질 평가 운영", "거버넌스 체계"],
    },
];

/** 진행 단계 — 사전 진단부터 사후 지원까지. */
const PROCESS: { icon: LucideIcon; step: string; desc: string }[] = [
    { icon: Search, step: "사전 진단", desc: "업무·데이터·조직 역량 파악" },
    { icon: PencilRuler, step: "커리큘럼 설계", desc: "역할별 맞춤 교육 설계" },
    { icon: Presentation, step: "온사이트 교육", desc: "고객사 현장 방문 교육" },
    { icon: MousePointerClick, step: "핸즈온 실습", desc: "직접 만들어 보는 실습" },
    { icon: BadgeCheck, step: "내재화 점검", desc: "정착 수준 확인·보완" },
    { icon: Headset, step: "사후 지원", desc: "운영 이슈·질문 지원" },
];

/** 단계별 노드 그라데이션 — 시안→퍼플로 흐르는 팔레트(흐름선과 톤 일치). */
const STEP_GRADIENTS = [
    "linear-gradient(135deg,#22d3ee,#0891b2)",
    "linear-gradient(135deg,#38bdf8,#0284c7)",
    "linear-gradient(135deg,#60a5fa,#2563eb)",
    "linear-gradient(135deg,#818cf8,#4f46e5)",
    "linear-gradient(135deg,#a78bfa,#7c3aed)",
    "linear-gradient(135deg,#c084fc,#9333ea)",
];

/** 교육 형태. */
const FORMATS: [LucideIcon, string, string][] = [
    [MapPin, "고객사 방문 (온사이트)", "담당 엔지니어가 고객사 현장을 직접 방문해 실제 업무 환경에서 교육합니다"],
    [Presentation, "핸즈온 워크숍", "듣는 교육이 아니라, 참석자가 직접 에이전트를 만들어 보는 실습형 워크숍입니다"],
    [ClipboardCheck, "운영 인수인계", "운영에 필요한 설정·정책·체크리스트를 문서로 정리해 인수인계합니다"],
    [LifeBuoy, "사후 Q&A 지원", "교육 이후에도 정착 단계의 질문과 운영 이슈를 이어서 지원합니다"],
];

/** FAQ — GEO용 FAQPage JSON-LD와 화면 공용. */
const FAQ: { q: string; a: string }[] = [
    {
        q: "교육은 어디서 진행되나요?",
        a: "기본적으로 고객사를 직접 방문해 온사이트로 진행합니다. 실제 운영 환경과 데이터를 기준으로 교육하며, 필요 시 온라인·하이브리드 방식도 지원합니다.",
    },
    {
        q: "교육 대상은 누구인가요?",
        a: "플랫폼 관리자, 현업 실무자, 개발자·운영자 등 역할에 따라 커리큘럼을 나눠 구성합니다. 조직 상황에 맞춰 대상과 범위를 조정합니다.",
    },
    {
        q: "코딩을 몰라도 참여할 수 있나요?",
        a: "실무자 교육은 노코드 중심으로 진행합니다. 코딩 없이 지식그래프를 만들고 약 90초 만에 에이전트를 조립하는 실습까지 다룹니다.",
    },
    {
        q: "교육이 끝난 뒤에는 어떤 지원이 있나요?",
        a: "내재화 점검과 운영 인수인계 문서, 사후 Q&A로 정착을 지원합니다. 조직이 스스로 AI를 운영·확장하는 상태를 목표로 합니다.",
    },
];

/** 교육 커리큘럼 — 역할·프로젝트 단계별 맞춤 과정(범용). */
const CURRICULUM: {
    course: string;
    hours?: string;
    content: string[];
    when: string;
    target: string;
}[] = [
    {
        course: "프로젝트 일반",
        hours: "4시간 4회",
        content: ["XGEN 플랫폼 개요", "XGEN 플랫폼 사용법"],
        when: "착수·안정화 단계",
        target: "프로젝트 담당자(RM)",
    },
    {
        course: "기본 기능 이해",
        hours: "2시간 2회",
        content: [
            "서비스 확장 (API 연계·문서 적재·MCP 등)",
            "업무 분석 설계 산출물 표준화 작성·교육",
            "시스템 모니터링",
        ],
        when: "구축 단계",
        target: "현업·IT 담당자",
    },
    {
        course: "기본 기능 이해",
        hours: "2시간 2회",
        content: ["시스템 설치·운영 관리 방법", "패치 및 업그레이드"],
        when: "인수 단계",
        target: "현업·IT 담당자",
    },
    {
        course: "확장(커스텀) 기능",
        content: [
            "주요 기능 설명",
            "솔루션 전반의 메뉴 체계",
            "메뉴별 기능 및 활용 방법",
            "평가/모니터링·후속관리 프로세스 및 기능",
        ],
        when: "안정화 단계",
        target: "현업·IT 담당자, RM, 기타 사용자",
    },
];

export default function EnablementPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Enablement",
                        serviceType: "Enterprise AI Enablement & Training",
                        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        areaServed: "KR",
                        description:
                            "솔루션 납품 후 고객사 현장을 방문해 관리자·실무자·운영자를 교육하고, XGEN 기반 AI를 조직에 내재화하는 온사이트 교육 서비스.",
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: FAQ.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                        })),
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Applied AI", path: "/solutions" },
                        { name: "Enablement", path: "/enablement" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Applied AI · Enablement
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        구축에서 끝나지 않고, 고객사에 정착시킵니다
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        Plateer Labs의 Enablement는 구축 이후 고객사 현장을 직접 찾아
                        XGEN 기반 AI가 실제 업무에 정착할 수 있도록 교육, 운영 노하우,
                        활용 방법을 함께 제공합니다.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        구축 → 인수인계 → 내재화까지
                    </span>
                </div>
            </section>

            <main>
                {/* 교육 프로그램 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Programs
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            역할별 교육 프로그램
                        </h2>

                        {/* FDE — 현장 밀착형 전달 모델 */}
                        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#bcd0f5] bg-[#f1f6ff] p-6 sm:flex-row sm:items-start sm:gap-5 md:p-7">
                            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#2f7bff] text-white">
                                <GraduationCap className="h-6 w-6" />
                            </span>
                            <div>
                                <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                    현장 FDE가 직접 교육합니다
                                </h3>
                                <p className="mt-2 max-w-3xl text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    설계·구현을 함께한{" "}
                                    <span className="font-semibold text-[var(--color-ink)]">
                                        FDE(Forward Deployed Engineer)
                                    </span>
                                    가 고객사를 방문해 교육을 진행합니다. 시스템을 설계·구현한
                                    사람이 직접 가르치므로, 실제 업무 맥락과 데이터를 기준으로
                                    조직에 맞는 내재화가 이뤄집니다.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {PROGRAMS.map((p) => (
                                <div
                                    key={p.en}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <p.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {p.en}
                                            </h3>
                                            <p className="text-[13.5px] font-semibold text-[#2461d8]">
                                                {p.ko}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                                        {p.items.map((it) => (
                                            <li
                                                key={it}
                                                className="flex items-center gap-1.5 text-[14px] leading-snug text-[var(--color-ink-muted)]"
                                            >
                                                <Check className="h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 진행 방식 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Process
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            진행 방식
                        </h2>
                        <div className="relative mt-12">
                            {/* 단계를 잇는 그라데이션 흐름선 (lg 이상) */}
                            <div className="pointer-events-none absolute inset-x-10 top-9 hidden h-0.5 bg-gradient-to-r from-[#22d3ee] via-[#6366f1] to-[#9333ea] opacity-40 lg:block" />
                            <ol className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
                                {PROCESS.map((p, i) => (
                                    <li
                                        key={p.step}
                                        className="relative flex flex-col items-center px-1 text-center"
                                    >
                                        <span
                                            className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full text-white shadow-[0_12px_28px_-10px_rgba(50,50,110,0.55)]"
                                            style={{ backgroundImage: STEP_GRADIENTS[i] }}
                                        >
                                            <p.icon className="h-7 w-7" />
                                            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[var(--color-surface-alt)] bg-[#070b1c] text-[15px] font-bold text-white shadow-sm">
                                                {i + 1}
                                            </span>
                                        </span>
                                        <span className="mt-4 text-[15px] font-bold text-[var(--color-ink)]">
                                            {p.step}
                                        </span>
                                        <span className="mt-1 text-[13px] leading-snug text-[var(--color-ink-muted)]">
                                            {p.desc}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                {/* 교육 커리큘럼 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Curriculum
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            교육 커리큘럼
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            안정적인 운영과 업무 경쟁력·전문성 제고를 위해 사용자·프로젝트
                            단계별로 교육 과정을 세분화하여 맞춤형으로 운영합니다.
                        </p>
                        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
                            <table className="w-full min-w-[760px] border-collapse text-left">
                                <thead>
                                    <tr className="bg-[var(--color-ink)] text-white">
                                        {["교육과정", "교육내용", "교육 시기", "대상"].map(
                                            (h) => (
                                                <th
                                                    key={h}
                                                    className="px-5 py-3 text-[13.5px] font-semibold"
                                                >
                                                    {h}
                                                </th>
                                            ),
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {CURRICULUM.map((c, i) => (
                                        <tr
                                            key={`${c.course}-${i}`}
                                            className="border-t border-[var(--color-line)] align-top"
                                        >
                                            <td className="px-5 py-4">
                                                <span className="text-[15px] font-bold text-[var(--color-ink)]">
                                                    {c.course}
                                                </span>
                                                {c.hours && (
                                                    <span className="mt-1 block text-[13px] text-[var(--color-ink-subtle)]">
                                                        {c.hours}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <ul className="space-y-1.5">
                                                    {c.content.map((it) => (
                                                        <li
                                                            key={it}
                                                            className="flex gap-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                                        >
                                                            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#2f7bff]" />
                                                            {it}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-5 py-4 text-[14.5px] font-semibold text-[var(--color-ink)]">
                                                {c.when}
                                            </td>
                                            <td className="px-5 py-4 text-[14.5px] text-[var(--color-ink-muted)]">
                                                {c.target}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 교육 형태 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Formats
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            교육 형태
                        </h2>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {FORMATS.map(([Icon, name, desc]) => (
                                <div
                                    key={name}
                                    className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-[16.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {name}
                                        </h3>
                                        <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            FAQ
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            자주 묻는 질문
                        </h2>
                        <div className="mt-8 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
                            {FAQ.map((f) => (
                                <details key={f.q} className="group px-6 py-5">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-semibold text-[var(--color-ink)]">
                                        {f.q}
                                        <ChevronRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-open:rotate-90" />
                                    </summary>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-white/45">
                            From delivery to adoption
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-[40px]">
                            구축을 넘어, 정착까지 함께합니다
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            솔루션을 납품하는 것으로 끝내지 않습니다. 고객사 현장에서 직접
                            교육하고, 조직이 스스로 AI를 운영·확장할 수 있도록 내재화까지
                            함께합니다. 교육 프로그램과 일정은 조직 상황에 맞춰 설계합니다.
                        </p>
                        <Link
                            href="/contact?from=enablement"
                            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            활용 지원·교육 문의
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
