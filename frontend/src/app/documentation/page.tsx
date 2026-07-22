import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
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

export const metadata = pageMetadata({
    title: "Documentation",
    description:
        "XGEN 플랫폼과 오픈소스 라이브러리 사용을 위한 가이드와 레퍼런스 — 플랫폼 매뉴얼, 아키텍처, 라이브러리 설치·사용 가이드.",
    path: "/documentation",
});

/** 플랫폼 가이드 — 플랫폼 사용에 필요한 핵심 문서로 연결. */
const PLATFORM_GUIDES: {
    icon: typeof BookOpen;
    title: string;
    desc: string;
    href: string;
    external?: boolean;
}[] = [
    {
        icon: BookOpen,
        title: "사용자 매뉴얼",
        desc: "설치·설정부터 워크스페이스·에이전트 운영까지 플랫폼 표준 사용 가이드",
        href: MANUAL_URL,
        external: true,
    },
    {
        icon: Boxes,
        title: "플랫폼 아키텍처",
        desc: "엔진·프레임워크·런타임 구성과 온프레미스 배포 구조",
        href: "/architecture#platform",
    },
    {
        icon: FileClock,
        title: "릴리스 노트",
        desc: "버전별 신규 기능과 변경 사항",
        href: "/releases",
    },
];

const CATEGORY_LABEL: Record<ToolCategory, string> = {
    ingestion: "데이터 수집·변환",
    knowledge: "지식·검색",
    agent: "에이전트·자동화",
    utility: "유틸리티",
};

const CATEGORY_ORDER: ToolCategory[] = [
    "ingestion",
    "knowledge",
    "agent",
    "utility",
];

/** 라이브러리 활용 방법 3단계. */
const USAGE_STEPS: { n: string; title: string; desc: string }[] = [
    {
        n: "01",
        title: "설치",
        desc: "pip install 한 줄로 사내 개발 환경에 라이브러리를 바로 설치합니다.",
    },
    {
        n: "02",
        title: "조합·활용",
        desc: "수집·지식·에이전트 목적에 맞는 라이브러리를 조합해 RAG·에이전트 파이프라인을 구성합니다.",
    },
    {
        n: "03",
        title: "확장·운영",
        desc: "MCP 런타임과 XGEN 플랫폼에 연동해 온프레미스 환경에서 안정적으로 운영합니다.",
    },
];

export default function DocumentationPage() {
    const byCategory = CATEGORY_ORDER.map((cat) => ({
        cat,
        items: TOOLS.filter((t) => t.category === cat),
    })).filter((g) => g.items.length > 0);

    return (
        <>
            <SiteNav />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: "/" },
                    { name: "Documentation", path: "/documentation" },
                ])}
            />

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/10 text-white">
                <SceneBackground concept="resources" />
                <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-32 md:pb-20">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Resources · Documentation
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
                        XGEN 플랫폼과 라이브러리 가이드
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                        플랫폼 사용자 매뉴얼부터 오픈소스 라이브러리 설치·사용 가이드까지 —
                        XGEN을 도입하고 개발하는 데 필요한 문서를 한곳에 모았습니다
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href={MANUAL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            사용자 매뉴얼 열기
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <Link
                            href="/library-gallery"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            라이브러리 갤러리
                        </Link>
                    </div>
                </div>
            </section>

            <main>
                {/* 플랫폼 가이드 */}
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Platform
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            플랫폼 가이드
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN 플랫폼을 설치·설정하고 운영하는 데 필요한 표준 문서입니다.
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
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Libraries
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            라이브러리 가이드
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN을 떠받치는 기술을 프로덕션급 파이썬 라이브러리로 공개합니다.
                            문서 수집·변환부터 지식 그래프, 에이전트 도구까지{" "}
                            <span className="font-semibold text-[var(--color-ink)]">
                                {TOOLS.length}종
                            </span>
                            을 모두 MIT 라이선스로 제공하며,{" "}
                            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[13px] text-[var(--color-ink)]">
                                pip
                            </code>{" "}
                            한 줄로 설치해 사내 환경에서 바로 활용할 수 있습니다.
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
                                카테고리
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
                                href="/library-gallery"
                                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[15px] font-semibold text-white transition hover:opacity-90"
                            >
                                라이브러리 갤러리에서 자세히 보기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <a
                                href={SITE.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-[15px] font-semibold text-[var(--color-ink)] transition hover:bg-white"
                            >
                                GitHub에서 보기
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 사용자 매뉴얼 임베드 — 상세 레퍼런스 */}
                <section className="bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Manual
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            사용자 매뉴얼
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            플랫폼 표준 사용 가이드를 바로 확인하세요.
                        </p>
                        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm">
                            <iframe
                                src={MANUAL_URL}
                                title="XGEN 사용자 매뉴얼"
                                className="h-[78vh] w-full"
                                loading="lazy"
                            />
                        </div>
                        <p className="mt-4 text-center text-[14px] text-[var(--color-ink-subtle)]">
                            매뉴얼이 보이지 않으면{" "}
                            <a
                                href={MANUAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[#2461d8] underline-offset-2 hover:underline"
                            >
                                새 탭에서 열기
                            </a>
                            를 눌러주세요
                        </p>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
