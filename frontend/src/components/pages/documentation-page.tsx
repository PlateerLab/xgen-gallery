import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { SITE } from "@/lib/site";
import { TOOLS, type ToolCategory } from "@/lib/tools";
import {
    ArrowUpRight,
    ArrowRight,
    BookOpen,
    Boxes,
    FileClock,
} from "lucide-react";

/** XGEN 사용자 매뉴얼(외부) — 플랫폼 표준 사용 가이드. */
const MANUAL_URL =
    "https://sooanc.github.io/xgen-manual/docs/xgen-standard/index.html";

/** 플랫폼 가이드 — 플랫폼 사용에 필요한 핵심 문서로 연결. */
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const GUIDE_ICONS = [BookOpen, Boxes, FileClock];
const GUIDE_HREFS: { href: string; external?: boolean }[] = [
    { href: MANUAL_URL, external: true },
    { href: "/architecture#platform" },
    { href: "/releases" },
];

const CATEGORY_ORDER: ToolCategory[] = [
    "ingestion",
    "knowledge",
    "agent",
    "utility",
];

interface DocCopy {
    ldDescription: string;
    guides: [string, string][];
    categoryLabel: Record<ToolCategory, string>;
    usageSteps: [string, string][];
    heroTitle: string;
    heroLead: string;
    ctaManual: string;
    ctaGallery: string;
    platformTitle: string;
    platformLead: string;
    libraryTitle: string;
    libraryLeadA: string;
    libraryCount: (n: number) => string;
    libraryLeadB: string;
    libraryLeadC: string;
    categoryLabelTitle: string;
    galleryMore: string;
    githubMore: string;
    manualTitle: string;
    manualLead: string;
    manualFrameTitle: string;
    manualFallbackA: string;
    manualFallbackLink: string;
    manualFallbackB: string;
}

const COPY: Record<Locale, DocCopy> = {
    ko: {
        ldDescription:
            "XGEN 플랫폼과 오픈소스 라이브러리 사용을 위한 가이드와 레퍼런스 — 플랫폼 매뉴얼, 아키텍처, 라이브러리 설치·사용 가이드.",
        guides: [
            ["사용자 매뉴얼", "설치·설정부터 워크스페이스·에이전트 운영까지 플랫폼 표준 사용 가이드"],
            ["플랫폼 아키텍처", "엔진·프레임워크·런타임 구성과 온프레미스 배포 구조"],
            ["릴리스 노트", "버전별 신규 기능과 변경 사항"],
        ],
        categoryLabel: {
            ingestion: "데이터 수집·변환",
            knowledge: "지식·검색",
            agent: "에이전트·자동화",
            utility: "유틸리티",
        },
        usageSteps: [
            ["설치", "pip install 한 줄로 사내 개발 환경에 라이브러리를 바로 설치합니다."],
            ["조합·활용", "수집·지식·에이전트 목적에 맞는 라이브러리를 조합해 RAG·에이전트 파이프라인을 구성합니다."],
            ["확장·운영", "MCP 런타임과 XGEN 플랫폼에 연동해 온프레미스 환경에서 안정적으로 운영합니다."],
        ],
        heroTitle: "XGEN 플랫폼과 라이브러리 가이드",
        heroLead:
            "플랫폼 사용자 매뉴얼부터 오픈소스 라이브러리 설치·사용 가이드까지 — XGEN을 도입하고 개발하는 데 필요한 문서를 한곳에 모았습니다",
        ctaManual: "사용자 매뉴얼 열기",
        ctaGallery: "라이브러리 갤러리",
        platformTitle: "플랫폼 가이드",
        platformLead: "XGEN 플랫폼을 설치·설정하고 운영하는 데 필요한 표준 문서입니다.",
        libraryTitle: "라이브러리 가이드",
        libraryLeadA:
            "XGEN을 떠받치는 기술을 프로덕션급 파이썬 라이브러리로 공개합니다. 문서 수집·변환부터 지식 그래프, 에이전트 도구까지 ",
        libraryCount: (n) => `${n}종`,
        libraryLeadB: "을 모두 MIT 라이선스로 제공하며, ",
        libraryLeadC: "한 줄로 설치해 사내 환경에서 바로 활용할 수 있습니다.",
        categoryLabelTitle: "카테고리",
        galleryMore: "라이브러리 갤러리에서 자세히 보기",
        githubMore: "GitHub에서 보기",
        manualTitle: "사용자 매뉴얼",
        manualLead: "플랫폼 표준 사용 가이드를 바로 확인하세요.",
        manualFrameTitle: "XGEN 사용자 매뉴얼",
        manualFallbackA: "매뉴얼이 보이지 않으면 ",
        manualFallbackLink: "새 탭에서 열기",
        manualFallbackB: "를 눌러주세요",
    },
    en: {
        ldDescription:
            "Guides and reference for the XGEN platform and its open-source libraries — the platform manual, architecture, and library installation and usage guides.",
        guides: [
            ["User manual", "The standard platform guide, from installation and configuration through workspace and agent operations"],
            ["Platform architecture", "How the engines, frameworks, and runtime fit together, and the on-premise deployment structure"],
            ["Release notes", "New features and changes, version by version"],
        ],
        categoryLabel: {
            ingestion: "Ingestion and transformation",
            knowledge: "Knowledge and retrieval",
            agent: "Agents and automation",
            utility: "Utilities",
        },
        usageSteps: [
            ["Install", "One pip install line puts the library straight into your development environment."],
            ["Compose", "Combine the ingestion, knowledge, and agent libraries that fit the job into a RAG or agent pipeline."],
            ["Extend and operate", "Connect to the MCP runtime and the XGEN platform, and run it reliably on-premise."],
        ],
        heroTitle: "Guides for the XGEN platform and libraries",
        heroLead:
            "From the platform user manual to installation and usage guides for the open-source libraries — the documentation you need to adopt and build on XGEN, in one place",
        ctaManual: "Open the user manual",
        ctaGallery: "Library gallery",
        platformTitle: "Platform guides",
        platformLead:
            "The standard documentation for installing, configuring, and operating the XGEN platform.",
        libraryTitle: "Library guides",
        libraryLeadA:
            "The technology behind XGEN is published as production-grade Python libraries. From document ingestion and transformation through knowledge graphs to agent tooling, ",
        libraryCount: (n) => `all ${n}`,
        libraryLeadB: " are MIT-licensed, and ",
        libraryLeadC: "installs in one line for immediate use in your own environment.",
        categoryLabelTitle: "Category",
        galleryMore: "See more in the library gallery",
        githubMore: "View on GitHub",
        manualTitle: "User manual",
        manualLead: "Open the standard platform guide right here.",
        manualFrameTitle: "XGEN user manual",
        manualFallbackA: "If the manual doesn't load, use ",
        manualFallbackLink: "open in a new tab",
        manualFallbackB: "",
    },
};

export function DocumentationPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const PLATFORM_GUIDES = t.guides.map(([title, desc], i) => ({
        icon: GUIDE_ICONS[i],
        title,
        desc,
        ...GUIDE_HREFS[i],
    }));
    const CATEGORY_LABEL = t.categoryLabel;
    const USAGE_STEPS = t.usageSteps.map(([title, desc], i) => ({
        n: String(i + 1).padStart(2, "0"),
        title,
        desc,
    }));
    const byCategory = CATEGORY_ORDER.map((cat) => ({
        cat,
        items: TOOLS.filter((tool) => tool.category === cat),
    })).filter((g) => g.items.length > 0);

    return (
        <>
            <SiteNav />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: home },
                    { name: "Documentation", path: "/documentation" },
                ])}
            />

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/10 text-white">
                <SceneBackground concept="resources" />
                <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-32 md:pb-20">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Resources · Documentation
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
                        {t.heroTitle}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                        {t.heroLead}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href={MANUAL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            {t.ctaManual}
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <Link
                            href={localeHref(locale, "/library-gallery")}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            {t.ctaGallery}
                        </Link>
                    </div>
                </div>
            </section>

            <main>
                {/* 플랫폼 가이드 */}
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Platform
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.platformTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.platformLead}
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {PLATFORM_GUIDES.map((g) => {
                                const inner = (
                                    <>
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <g.icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="mt-4 flex items-center gap-1.5 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {g.title}
                                            {g.external ? (
                                                <ArrowUpRight className="h-4 w-4 text-[var(--color-ink-subtle)] transition group-hover:text-[#2f7bff]" />
                                            ) : (
                                                <ArrowRight className="h-4 w-4 text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#2f7bff]" />
                                            )}
                                        </h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {g.desc}
                                        </p>
                                    </>
                                );
                                const cls =
                                    "group rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#2f7bff]/40 hover:shadow-[0_12px_30px_-16px_rgba(20,40,80,0.35)]";
                                return g.external ? (
                                    <a
                                        key={g.title}
                                        href={g.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cls}
                                    >
                                        {inner}
                                    </a>
                                ) : (
                                    <Link key={g.title} href={g.href} className={cls}>
                                        {inner}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 라이브러리 가이드 */}
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Libraries
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.libraryTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.libraryLeadA}
                            <span className="font-semibold text-[var(--color-ink)]">
                                {t.libraryCount(TOOLS.length)}
                            </span>
                            {t.libraryLeadB}
                            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[13px] text-[var(--color-ink)]">
                                pip
                            </code>{" "}
                            {t.libraryLeadC}
                        </p>

                        {/* 활용 방법 3단계 */}
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {USAGE_STEPS.map((s) => (
                                <div
                                    key={s.n}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f7bff]/10 font-mono text-[14px] font-bold text-[#2f7bff]">
                                        {s.n}
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {s.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* 카테고리 개요 */}
                        <div className="mt-8 flex flex-wrap items-center gap-2.5">
                            <span className="text-[13px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                                {t.categoryLabelTitle}
                            </span>
                            {byCategory.map((g) => (
                                <span
                                    key={g.cat}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-[13.5px] font-medium text-[var(--color-ink-muted)]"
                                >
                                    {CATEGORY_LABEL[g.cat]}
                                    <span className="font-mono text-[12px] text-[var(--color-ink-subtle)]">
                                        {g.items.length}
                                    </span>
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <Link
                                href={localeHref(locale, "/library-gallery")}
                                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[15px] font-semibold text-white transition hover:opacity-90"
                            >
                                {t.galleryMore}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href={SITE.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-[15px] font-semibold text-[var(--color-ink)] transition hover:bg-white"
                            >
                                {t.githubMore}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 사용자 매뉴얼 임베드 — 상세 레퍼런스 */}
                <section className="bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Manual
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.manualTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.manualLead}
                        </p>
                        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm">
                            <iframe
                                src={MANUAL_URL}
                                title={t.manualFrameTitle}
                                className="h-[78vh] w-full"
                                loading="lazy"
                            />
                        </div>
                        <p className="mt-4 text-center text-[14px] text-[var(--color-ink-subtle)]">
                            {t.manualFallbackA}
                            <a
                                href={MANUAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[#2461d8] underline-offset-2 hover:underline"
                            >
                                {t.manualFallbackLink}
                            </a>
                            {t.manualFallbackB}
                        </p>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
