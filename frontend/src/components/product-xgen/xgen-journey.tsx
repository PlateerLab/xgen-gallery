import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * XGEN 제품 페이지 고객여정 — 1depth(개요) → 2depth(주제별 하위 페이지) → 3depth(상세 페이지·문서).
 *
 * - 1depth `/product/xgen`: 처음 방문한 의사결정자가 「무엇이고 왜 필요한가」를 확인한다.
 * - 2depth `/product/xgen/<view>`: 역할·검토 단계별로 필요한 내용만 모은 주제 페이지.
 * - 3depth: 이미 있는 기능별 상세 페이지(/vibe-coding 등)와 문서·자료.
 *
 * 섹션 자체는 product-page.tsx 에 그대로 있고, view 에 따라 어느 섹션을 렌더할지만 나눈다.
 */
export type XgenView = "overview" | "features" | "security" | "technology" | "adoption";

type Txt = { ko: string; en: string };

export const XGEN_VIEWS: {
    view: XgenView;
    path: string;
    label: Txt;
    /** 2depth 페이지 머리말·여정 카드에 쓰는 정보 */
    step?: string;
    audience?: Txt;
    question?: Txt;
    desc?: Txt;
    /** 여정 카드 썸네일 (실사, Unsplash License 무료 사진 — 출처는 THUMB_CREDITS) */
    thumb?: string;
    /** 이 주제에서 이어지는 3depth 상세 페이지 */
    deep?: { label: Txt; href: string }[];
}[] = [
    { view: "overview", path: "/product/xgen", label: { ko: "개요", en: "Overview" } },
    {
        view: "features",
        path: "/product/xgen/features",
        thumb: "/product/journey/features.jpg",
        label: { ko: "기능·활용", en: "Features & use" },
        step: "02",
        audience: { ko: "현업·실무 담당자", en: "Business and operations teams" },
        question: { ko: "무엇을 만들고, 어떻게 쓰나요?", en: "What can we build, and how is it used?" },
        desc: {
            ko: "AX 진화 단계와 6가지 역량, 4대 핵심 가치, DexOn·EasyMode, 핵심 기능과 실제 화면, 역할별 사용 방식, 도입 효과를 정리했습니다.",
            en: "The AX evolution stages, six capabilities, four core values, DexOn and EasyMode, core features with real screens, how each role uses XGEN, and business value.",
        },
        deep: [
            { label: { ko: "Vibe Coding", en: "Vibe Coding" }, href: "/vibe-coding" },
            { label: { ko: "DexOn", en: "DexOn" }, href: "/xgen-dex" },
            { label: { ko: "EasyMode", en: "EasyMode" }, href: "/easy-mode" },
        ],
    },
    {
        view: "security",
        path: "/product/xgen/security",
        thumb: "/product/journey/security.jpg",
        label: { ko: "보안·거버넌스", en: "Security & governance" },
        step: "03",
        audience: { ko: "보안·IT 담당자", en: "Security and IT teams" },
        question: { ko: "데이터와 AI를 어떻게 통제하나요?", en: "How are data and AI kept under control?" },
        desc: {
            ko: "온프레미스·망분리 구성, 권한·승인·감사 통제, 국가 공인 인증과 AI 품질 방침을 다룹니다.",
            en: "On-premise and air-gapped deployment, permission, approval and audit controls, national certification and our AI quality policy.",
        },
        deep: [
            { label: { ko: "보안·거버넌스 상세", en: "Security & Governance" }, href: "/security-and-governance" },
            { label: { ko: "AI 품질 방침", en: "AI quality policy" }, href: "/ai-quality-policy" },
        ],
    },
    {
        view: "technology",
        path: "/product/xgen/technology",
        thumb: "/product/journey/technology.jpg",
        label: { ko: "기술·아키텍처", en: "Technology" },
        step: "04",
        audience: { ko: "아키텍트·개발 리드", en: "Architects and engineering leads" },
        question: { ko: "어떤 구조로 동작하나요?", en: "How is it built?" },
        desc: {
            ko: "5계층 코어 엔진과 Geny, 격리 실행 환경 등 XGEN의 기술 구성을 설명합니다.",
            en: "The five-layer core engine, Geny and the isolated execution environment that make up XGEN.",
        },
        deep: [
            { label: { ko: "Architecture", en: "Architecture" }, href: "/architecture" },
            { label: { ko: "Technology", en: "Technology" }, href: "/technology" },
            { label: { ko: "Documentation", en: "Documentation" }, href: "/documentation" },
        ],
    },
    {
        view: "adoption",
        path: "/product/xgen/adoption",
        thumb: "/product/journey/adoption.jpg",
        label: { ko: "도입·지원", en: "Adoption & support" },
        step: "05",
        audience: { ko: "구매·도입 담당자", en: "Procurement and adoption owners" },
        question: { ko: "어떤 절차로 도입하나요?", en: "What does adoption look like?" },
        desc: {
            ko: "반입부터 운영까지의 구축 단계, 도입 이후 지원, 자주 묻는 질문과 문서·자료를 모았습니다.",
            en: "Delivery steps from installation to operation, post-deployment support, FAQ, and documents.",
        },
        deep: [
            { label: { ko: "15일 무료 체험", en: "15-day free trial" }, href: "/xgen-trial" },
            { label: { ko: "XGEN 소개서", en: "XGEN brochure" }, href: "/xgen-brief-k7m4" },
            { label: { ko: "Release Notes", en: "Release Notes" }, href: "/releases" },
        ],
    },
];

/**
 * 썸네일 출처 — features/adoption=Unsplash License, security/technology=Adobe Stock 무료 컬렉션(표준 라이선스, x2bee_ds 계정으로 라이선스). 960x540 크롭으로 public/product/journey 에 둠.
 * features   https://unsplash.com/photos/yd_RKGH_RH4 (Unsplash License)
 * security   https://stock.adobe.com/images/id/588640139
 * technology https://stock.adobe.com/images/id/831527108
 * adoption   https://unsplash.com/photos/jEpZNyFSQwQ (Unsplash License)
 */
const t = (locale: Locale, x: Txt) => (locale === "en" ? x.en : x.ko);

export function xgenViewInfo(view: XgenView) {
    return XGEN_VIEWS.find((v) => v.view === view)!;
}

/** 2depth 탐색 탭 — GNB 바로 아래 고정. 페이지 이동만 하고 액션은 두지 않는다. */
export function XgenSubTabs({ locale, current }: { locale: Locale; current: XgenView }) {
    return (
        <nav
            aria-label={locale === "en" ? "XGEN pages" : "XGEN 페이지"}
            style={{ top: "var(--nav-h, 84px)" }}
            className="sticky z-30 border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md"
        >
            {/* 좁은 화면에서는 줄바꿈 없이 가로 스크롤, 넓은 화면에서는 가운데 정렬 */}
            <div className="mx-auto max-w-7xl overflow-x-auto px-6">
                <div className="mx-auto flex w-max gap-1 py-3">
                    {XGEN_VIEWS.map((v) => {
                        const active = v.view === current;
                        return (
                            <Link
                                key={v.view}
                                href={localeHref(locale, v.path)}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] transition",
                                    active
                                        ? "bg-[#2f7bff]/12 font-semibold text-[#2461d8]"
                                        : "font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-ink)]",
                                )}
                            >
                                {t(locale, v.label)}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

/** 2depth 페이지 머리말 — 제목·대상·설명 + 우측 액션(상담 1개 + 체험). */
export function XgenSubHeader({ locale, view }: { locale: Locale; view: XgenView }) {
    const info = xgenViewInfo(view);
    const en = locale === "en";
    return (
        <header className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:pb-12 md:pt-14">
                <nav aria-label={en ? "Breadcrumb" : "경로"} className="flex items-center gap-1 text-[13px] text-[var(--color-ink-subtle)]">
                    <Link href={localeHref(locale, "/product/xgen")} className="hover:text-[var(--color-ink)]">
                        XGEN
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    <span className="text-[var(--color-ink-muted)]">{t(locale, info.label)}</span>
                </nav>
                <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[#2f7bff]">
                            {info.step} · {info.audience ? t(locale, info.audience) : ""}
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-[40px] md:leading-[1.15]">
                            {info.question ? t(locale, info.question) : t(locale, info.label)}
                        </h1>
                        {info.desc && (
                            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)] md:text-[16px]">
                                {t(locale, info.desc)}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-none flex-wrap gap-2">
                        <Link
                            href={localeHref(locale, "/contact")}
                            className="inline-flex items-center gap-2 rounded-full bg-[#2f7bff] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2461d8]"
                        >
                            {en ? "Talk to us" : "도입 상담"}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href={localeHref(locale, "/xgen-trial")}
                            className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink-subtle)]"
                        >
                            {en ? "15-day free trial" : "15일 무료 체험"}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

/** 여정 안내 — 개요에서는 2depth 4개를, 2depth 에서는 나머지 주제와 이 주제의 3depth 자료를 보여 준다. */
export function XgenJourney({ locale, current }: { locale: Locale; current: XgenView }) {
    const en = locale === "en";
    const overview = current === "overview";
    const here = xgenViewInfo(current);
    const cards = XGEN_VIEWS.filter((v) => v.view !== "overview" && v.view !== current);
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-[120px]">
                {!overview && here.deep && (
                    <div className="mb-14 border-b border-[var(--color-line)] pb-12">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {en ? "Go deeper" : "상세 자료"}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                            {en ? `More on ${here.label.en.toLowerCase()}` : `${here.label.ko} 더 보기`}
                        </h2>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {here.deep.map((d) => (
                                <Link
                                    key={d.href}
                                    href={localeHref(locale, d.href)}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-[14px] font-semibold text-[var(--color-ink)] transition hover:border-[#2f7bff] hover:text-[#2461d8]"
                                >
                                    {t(locale, d.label)}
                                    <ChevronRight className="h-4 w-4" aria-hidden />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-[#2461d8]">
                    {overview ? (en ? "Adoption Guide" : "도입 가이드") : en ? "Keep exploring" : "이어서 보기"}
                </p>
                <h2 className="mt-3 max-w-3xl text-[28px] font-bold leading-[1.3] tracking-tight text-[var(--color-ink)] md:text-[40px]">
                    {overview
                        ? en
                            ? "What you need to evaluate XGEN, in one place"
                            : "XGEN 도입에 필요한 정보를 한곳에서"
                        : en
                          ? "Other topics on XGEN"
                          : "XGEN의 다른 주제"}
                </h2>
                {overview && (
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink-muted)] md:text-[17px]">
                        {en
                            ? "From key features to technical architecture, security and operating environments. Review the information your AI adoption assessment needs, organized by topic."
                            : "제품의 주요 기능부터 기술 구성, 보안, 운영 환경까지. 기업의 AI 도입 검토에 필요한 정보를 주제별로 확인할 수 있습니다."}
                    </p>
                )}
                {/* 세로형 목록 — 한 줄에 하나씩 쌓는다. 넓은 화면은 썸네일 왼쪽·글 오른쪽, 620px 이하는 썸네일 위·글 아래. */}
                <ol className="mt-12 flex flex-col gap-4 lg:mt-16">
                    {cards.map((v) => (
                        <li
                            key={v.view}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:border-[#2f7bff] min-[621px]:flex-row"
                        >
                            {v.thumb && (
                                <div className="relative aspect-[16/9] w-full flex-none overflow-hidden bg-[var(--color-surface-alt)] min-[621px]:aspect-auto min-[621px]:w-[240px] lg:w-[300px]">
                                    <Image
                                        src={v.thumb}
                                        alt=""
                                        fill
                                        sizes="(max-width: 620px) 100vw, 300px"
                                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                                    />
                                </div>
                            )}
                            <div className="flex min-w-0 flex-1 flex-col p-6 lg:p-7">
                                <p className="font-mono text-[12px] font-bold text-[#2f7bff]">
                                    {v.step} · {t(locale, v.label)}
                                </p>
                                <h3 className="mt-2 text-[19px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                    {/* 카드 전체가 2depth 로 가는 링크(가상 요소로 덮음). 3depth 칩은 그 위로 올려 따로 누른다. */}
                                    <Link href={localeHref(locale, v.path)} className="after:absolute after:inset-0 after:content-['']">
                                        {v.question && t(locale, v.question)}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-[13px] text-[var(--color-ink-subtle)]">
                                    {v.audience && t(locale, v.audience)}
                                </p>
                                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {v.desc && t(locale, v.desc)}
                                </p>
                                {overview && v.deep && (
                                    <div className="relative z-10 mt-4 flex flex-wrap items-center gap-1.5">
                                        <span className="mr-1 text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                            {en ? "Detail pages" : "상세 페이지"}
                                        </span>
                                        {v.deep.map((d) => (
                                            <Link
                                                key={d.href}
                                                href={localeHref(locale, d.href)}
                                                className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[12.5px] font-semibold text-[var(--color-ink-muted)] transition hover:border-[#2f7bff] hover:text-[#2461d8]"
                                            >
                                                {t(locale, d.label)}
                                                <ChevronRight className="h-3 w-3" aria-hidden />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                <span aria-hidden className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-[#2461d8]">
                                    {en ? "View" : "자세히 보기"}
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
