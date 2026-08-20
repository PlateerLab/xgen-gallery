import Link from "next/link";
import {
    ShieldCheck,
    Server,
    Blocks,
    FlaskConical,
    Boxes,
    Layers,
    BadgeCheck,
    Award,
    BookOpen,
    Users,
    ArrowRight,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, breadcrumbLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * About — 연구소 정체성의 앵커(E-E-A-T). 미션 → 우리가 하는 일(연구·오픈소스·제품·실증)
 * → 신뢰의 근거(인증·오픈소스·논문) → 연혁 → 팀. "연구소가 만든 것을 제품으로 증명한다"
 * 서사를 서술한다.
 *
 * 한국어(`/about`)와 영어(`/en/about`) 두 라우트가 이 컴포넌트를 공유한다. 카피는
 * 아래 COPY 사전에 언어별로 나란히 두어 한쪽만 고치고 넘어가는 실수를 막는다.
 */
interface AboutCopy {
    hero: { eyebrow: string; title: string; desc: string };
    mission: {
        eyebrow: string;
        title: string;
        items: { icon: LucideIcon; title: string; desc: string }[];
    };
    pipeline: {
        title: string;
        desc: string;
        items: {
            icon: LucideIcon;
            title: string;
            /** 한국어판에서 제목 옆에 병기하는 영문 라벨(영어판은 생략). */
            sub?: string;
            desc: string;
            href: string;
        }[];
    };
    proof: {
        title: string;
        more: string;
        items: { icon: LucideIcon; title: string; desc: string; href: string }[];
    };
    milestones: { title: string; items: { when: string; what: string }[] };
    team: {
        members: { title: string; desc: string; cta: string };
        company: { title: string; desc: string };
    };
    cta: { title: string; desc: string; trial: string; contact: string };
}

const COPY: Record<Locale, AboutCopy> = {
    ko: {
        hero: {
            eyebrow: "About · Plateer AI Labs",
            title: "신뢰할 수 있는 Enterprise AI를 연구합니다",
            desc: "Plateer AI Labs는 단순한 AI 기능 개발을 넘어, 기업이 신뢰하고 운영할 수 있는 Enterprise AI의 표준을 연구합니다. 연구소가 만든 것을 제품으로 증명합니다.",
        },
        mission: {
            eyebrow: "Mission",
            title: "우리가 푸는 세 가지 문제",
            items: [
                {
                    icon: ShieldCheck,
                    title: "신뢰할 수 있는 AI",
                    desc: "기업이 보유한 지식과 데이터에 근거해 답하고, 근거가 없으면 판단 불가를 선언합니다. 환각을 최소화하고 설명 가능한 AI를 만듭니다.",
                },
                {
                    icon: Server,
                    title: "기업 데이터 주권",
                    desc: "클라우드 종속 없이 고객 인프라에서 운영되는 온프레미스 중심 아키텍처를 연구합니다. 금융·공공·제조의 망분리 환경까지 대응합니다.",
                },
                {
                    icon: Blocks,
                    title: "조합하고 확장하는 AI",
                    desc: "Agent·Workflow·Knowledge·Tool을 모듈화해 업무 목적에 맞게 재조합하는 Composable AI를 연구합니다. 특정 벤더·모델에 종속되지 않습니다.",
                },
            ],
        },
        pipeline: {
            title: "AI 연구소가 만든 것을, 제품으로 증명합니다",
            desc: "기초 연구에서 시작해 오픈소스로 검증하고, 제품으로 잇고, 고객 현장과 인증으로 증명하는 한 방향의 흐름으로 일합니다.",
            items: [
                {
                    icon: FlaskConical,
                    title: "연구",
                    sub: "Research",
                    desc: "Enterprise AI를 현실로 만드는 기초 연구",
                    href: "/research",
                },
                {
                    icon: Boxes,
                    title: "오픈소스",
                    sub: "Open Source",
                    desc: "연구를 떠받치는 검증된 라이브러리 공개",
                    href: "/library-gallery",
                },
                {
                    icon: Layers,
                    title: "제품",
                    sub: "Product",
                    desc: "XGEN·Polar·AI Code Assistant로 현장 적용",
                    href: "/product",
                },
                {
                    icon: BadgeCheck,
                    title: "실증",
                    sub: "Proof",
                    desc: "고객사례와 국가 공인 인증으로 성과 증명",
                    href: "/customers",
                },
            ],
        },
        proof: {
            title: "신뢰의 근거",
            more: "자세히 보기",
            items: [
                {
                    icon: Award,
                    title: "인증·품질",
                    desc: "XGEN GS인증 1등급(최고 등급) 획득, AI 신뢰성 인증 AI-MASTER 진행 중",
                    href: "/product#certification",
                },
                {
                    icon: Boxes,
                    title: "오픈소스",
                    desc: "XGEN을 떠받치는 라이브러리를 오픈소스로 공개 — 설치·브라우저 체험 제공",
                    href: "/library-gallery",
                },
                {
                    icon: BookOpen,
                    title: "연구 성과",
                    desc: "구성원들이 학회·저널에 발표한 논문과 저서·감수 도서",
                    href: "/research#publications",
                },
            ],
        },
        milestones: {
            title: "최근 이정표",
            items: [
                { when: "2026.07", what: "XGEN, GS(Good Software) 인증 1등급 획득" },
                { when: "2026.06", what: "AI 신뢰성 인증 AI-MASTER 인증 시험 착수" },
            ],
        },
        team: {
            members: {
                title: "Plateer AI Labs를 만드는 사람들",
                desc: "연구·엔지니어링으로 Enterprise AI를 현실로 만드는 멤버들을 소개합니다.",
                cta: "멤버 보러가기",
            },
            company: {
                title: "Plateer",
                desc: "Plateer AI Labs는 플래티어(Plateer)의 연구 조직입니다. 회사 소개를 확인하세요.",
            },
        },
        cta: {
            title: "함께 시작해 볼까요",
            desc: "XGEN을 무료로 체험하거나, PoC·기술 상담을 신청하세요.",
            trial: "XGEN 체험하기",
            contact: "도입·PoC 상담",
        },
    },
    en: {
        hero: {
            eyebrow: "About · Plateer AI Labs",
            title: "We research Enterprise AI that companies can trust and run",
            desc: "Plateer AI Labs works a step behind the feature race. We research the standards that make enterprise AI dependable enough to put into production — and we prove what the lab builds by shipping it as product.",
        },
        mission: {
            eyebrow: "Mission",
            title: "Three problems we work on",
            items: [
                {
                    icon: ShieldCheck,
                    title: "AI you can trust",
                    desc: "Answers grounded in your own knowledge and data — and an explicit “insufficient evidence” when that grounding isn't there. We minimize hallucination and keep the reasoning inspectable.",
                },
                {
                    icon: Server,
                    title: "Data sovereignty",
                    desc: "On-premise-first architecture that runs inside your own infrastructure, with no cloud lock-in. That includes the network-separated environments finance, public sector, and manufacturing actually operate in.",
                },
                {
                    icon: Blocks,
                    title: "Composable, extensible AI",
                    desc: "Agents, workflows, knowledge, and tools as modules you recombine for the job in front of you. No lock-in to a single vendor or model.",
                },
            ],
        },
        pipeline: {
            title: "What the lab builds, the product proves",
            desc: "One direction of travel: start with foundational research, validate it in the open, ship it as product, and prove it in customer environments and certification.",
            items: [
                {
                    icon: FlaskConical,
                    title: "Research",
                    desc: "Foundational work that makes Enterprise AI practical",
                    href: "/research",
                },
                {
                    icon: Boxes,
                    title: "Open Source",
                    desc: "The libraries underneath the research, published in the open",
                    href: "/library-gallery",
                },
                {
                    icon: Layers,
                    title: "Product",
                    desc: "Deployed in the field as XGEN, Polar, and AI Code Assistant",
                    href: "/product",
                },
                {
                    icon: BadgeCheck,
                    title: "Proof",
                    desc: "Results shown through customer projects and national certification",
                    href: "/customers",
                },
            ],
        },
        proof: {
            title: "Grounds for trust",
            more: "Read more",
            items: [
                {
                    icon: Award,
                    title: "Certification and quality",
                    desc: "XGEN holds Grade 1 GS (Good Software) certification, the highest grade in Korea's national software quality scheme. AI-MASTER reliability certification is in testing",
                    href: "/product#certification",
                },
                {
                    icon: Boxes,
                    title: "Open source",
                    desc: "The libraries that power XGEN are public — install them with pip or run them in the browser gallery",
                    href: "/library-gallery",
                },
                {
                    icon: BookOpen,
                    title: "Published research",
                    desc: "Papers our members have presented at conferences and journals, plus books authored and reviewed",
                    href: "/research#publications",
                },
            ],
        },
        milestones: {
            title: "Recent milestones",
            items: [
                {
                    when: "2026.07",
                    what: "XGEN awarded Grade 1 GS (Good Software) certification",
                },
                {
                    when: "2026.06",
                    what: "Entered testing for AI-MASTER AI reliability certification",
                },
            ],
        },
        team: {
            members: {
                title: "The people behind Plateer AI Labs",
                desc: "The researchers and engineers turning Enterprise AI into something you can actually deploy.",
                cta: "View members",
            },
            company: {
                title: "Plateer",
                desc: "Plateer AI Labs is the research arm of Plateer. Visit the company site to learn more.",
            },
        },
        cta: {
            title: "Let's get started",
            desc: "Try XGEN free, or request a PoC and technical consultation.",
            trial: "Try XGEN",
            contact: "Talk about a PoC",
        },
    },
};

export function AboutPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const href = (path: string) => localeHref(locale, path);

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    organizationLd(locale),
                    breadcrumbLd([
                        { name: "Home", path: locale === "en" ? "/en" : "/" },
                        {
                            name: "About",
                            path: locale === "en" ? "/en/about" : "/about",
                        },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="about" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                        {t.hero.eyebrow}
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.hero.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        {t.hero.desc}
                    </p>
                </div>
            </section>

            <main>
                {/* Mission */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.mission.eyebrow}
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.mission.title}
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.mission.items.map((m) => (
                                <div
                                    key={m.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white">
                                        <m.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {m.title}
                                    </h3>
                                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {m.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 우리가 하는 일 — 파이프라인 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.pipeline.title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.pipeline.desc}
                        </p>
                        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {t.pipeline.items.map((p, i) => (
                                <li key={p.title} className="relative">
                                    <Link
                                        href={href(p.href)}
                                        className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <p.icon className="h-5 w-5" />
                                            </span>
                                            <span className="font-mono text-[13px] font-bold text-[var(--color-ink-subtle)]">
                                                0{i + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {p.title}
                                            {p.sub && (
                                                <>
                                                    {" "}
                                                    <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                                        {p.sub}
                                                    </span>
                                                </>
                                            )}
                                        </h3>
                                        <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {p.desc}
                                        </p>
                                    </Link>
                                    {i < t.pipeline.items.length - 1 && (
                                        <span
                                            aria-hidden
                                            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--color-line-strong)] lg:inline-flex"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 신뢰의 근거 + 연혁 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.proof.title}
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.proof.items.map((p) => (
                                <Link
                                    key={p.title}
                                    href={href(p.href)}
                                    className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <p.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                        {t.proof.more}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* 연혁 */}
                        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7">
                            <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.milestones.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {t.milestones.items.map((m) => (
                                    <li key={m.when} className="flex items-start gap-4">
                                        <span className="w-16 flex-none font-mono text-[14px] font-bold text-[#2461d8]">
                                            {m.when}
                                        </span>
                                        <span className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {m.what}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 팀 + Company + CTA */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Link
                                href={href("/members")}
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5]"
                            >
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <Users className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.team.members.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.team.members.desc}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                    {t.team.members.cta}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </Link>

                            <a
                                href="https://www.plateer.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5]"
                            >
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <Blocks className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.team.company.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.team.company.desc}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                    plateer.com
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>
                            </a>
                        </div>

                        {/* CTA */}
                        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.cta.title}
                                </h3>
                                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.cta.desc}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={href("/xgen-trial")}
                                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                                >
                                    {t.cta.trial}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={href("/contact") + "?from=about"}
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
                                >
                                    {t.cta.contact}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
