import Link from "next/link";
import {
    Compass,
    MessageSquare,
    Cable,
    MousePointerClick,
    Sparkles,
    LogIn,
    Plug,
    ClipboardCheck,
    FlaskConical,
    ArrowRight,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, faqPageLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
    title: "PathFinder — 웹 시스템을 AI Agent Tool로 연결",
    description:
        "패스파인더(PathFinder)는 시스템과 API를 코드 없이 AI 에이전트가 쓰는 Agent Tool로 연결하는 XGEN 기술입니다. 로그인·연결·테스트·등록을 브라우저에서 자동화합니다.",
    path: "/pathfinder",
});

/** 매뉴얼(솔루션 가이드) 원문 — 설치·사용 상세 단계. */
const MANUAL_URL =
    "https://sooanc.github.io/xgen-manual/docs/xgen-standard/user/12b-pathfinder.html";

/** 패스파인더로 할 수 있는 일 — 매뉴얼 4대 기능. */
const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: MessageSquare,
        title: "대화로 워크플로우 생성",
        desc: "만들고 싶은 작업을 대화로 요청하면 XGEN Canvas 위에 노드를 추가·연결·삭제하고 노드별 파라미터까지 구성합니다",
    },
    {
        icon: Cable,
        title: "도구·API 연결",
        desc: "외부 서비스를 XGEN 도구로 연결하고, 웹사이트와 상호작용하는 과정에서 필요한 API를 자동으로 감지해 Agent Tool로 등록합니다",
    },
    {
        icon: MousePointerClick,
        title: "화면 조작 안내",
        desc: "메뉴 이동을 안내하고 버튼 클릭·입력 필드 처리까지 도와, 어디를 눌러야 할지 몰라도 작업을 이어갈 수 있습니다",
    },
    {
        icon: Sparkles,
        title: "실시간 지원",
        desc: "현재 화면의 맥락을 기반으로 추천을 제시하고, XGEN 사용법과 워크플로우 설계를 실시간으로 안내합니다",
    },
];

/** 작동 방식 — 코드 없는 4단계 연결 흐름(로그인 → 연결 → 등록 → 테스트). */
const FLOW: { icon: LucideIcon; step: string; title: string; desc: string }[] = [
    {
        icon: LogIn,
        step: "01",
        title: "로그인",
        desc: "대상 웹 시스템에 평소처럼 로그인하면 패스파인더가 인증 흐름을 함께 따라갑니다",
    },
    {
        icon: Plug,
        step: "02",
        title: "API 연결",
        desc: "화면과 상호작용하는 동안 오가는 요청을 감지해 연결에 필요한 API를 찾아냅니다",
    },
    {
        icon: ClipboardCheck,
        step: "03",
        title: "도구 등록",
        desc: "감지한 기능을 AI 에이전트가 호출할 수 있는 Agent Tool로 등록합니다",
    },
    {
        icon: FlaskConical,
        step: "04",
        title: "테스트",
        desc: "등록한 도구를 바로 실행해 정상 동작을 확인한 뒤 워크플로우에 붙입니다",
    },
];

/** 시작하기 — 크롬 확장 설치·연동 3단계(요약). 상세는 매뉴얼 링크. */
const START: { step: string; title: string; desc: string }[] = [
    {
        step: "1",
        title: "확장 프로그램 준비",
        desc: "패스파인더 압축 파일(.zip)을 내려받아 폴더로 압축을 풉니다 (manifest.json 포함)",
    },
    {
        step: "2",
        title: "크롬에 추가",
        desc: "chrome://extensions 에서 개발자 모드를 켜고 ‘압축 해제된 확장 프로그램을 로드’로 폴더를 선택합니다",
    },
    {
        step: "3",
        title: "실행·XGEN 연동",
        desc: "크롬 우측 상단 확장 아이콘에서 XGEN PathFinder를 선택하면 XGEN이 로드될 때 자동으로 연결됩니다",
    },
];

const USE_CASES: { title: string; desc: string }[] = [
    {
        title: "레거시 사내 시스템을 AI 업무로 확장",
        desc: "그룹웨어·ERP 등 기존 웹 시스템을 코드 수정 없이 Agent Tool로 연결해 AI 업무 환경으로 넓힙니다",
    },
    {
        title: "현업이 직접 만드는 자동화",
        desc: "개발 리소스를 기다리지 않고, 실제 업무를 아는 현업이 브라우저에서 직접 도구를 등록하고 워크플로우를 만듭니다",
    },
    {
        title: "API 문서 없이 빠른 연동",
        desc: "정리된 API 명세가 없어도 화면 조작만으로 필요한 연동 지점을 감지해 PoC를 빠르게 시작합니다",
    },
];

const FAQ: { q: string; a: string }[] = [
    {
        q: "패스파인더(PathFinder)란 무엇인가요?",
        a: "패스파인더는 시스템과 API를 코드 없이 AI 에이전트가 사용할 수 있는 Agent Tool로 연결하는 XGEN 기술이자, 대화로 XGEN Canvas의 에이전트 워크플로우 제작을 돕는 크롬 확장형 AI 어시스턴트입니다. 로그인·연결·테스트·등록의 전 과정을 브라우저에서 자동화합니다.",
    },
    {
        q: "패스파인더는 어떻게 작동하나요?",
        a: "대상 시스템에 로그인한 뒤 화면과 상호작용하면, 패스파인더가 오가는 요청에서 필요한 API를 감지하고 이를 Agent Tool로 등록한 다음 바로 테스트합니다. 코드를 작성하지 않고 로그인 → API 연결 → 도구 등록 → 테스트의 4단계로 기존 시스템을 AI가 쓰는 도구로 만듭니다.",
    },
    {
        q: "개발 지식이 없어도 쓸 수 있나요?",
        a: "네. 패스파인더는 코드 없이 브라우저 조작과 대화만으로 도구 등록과 워크플로우 구성을 자동화하도록 설계되어, 개발 지식이 없는 현업도 직접 사용할 수 있습니다.",
    },
    {
        q: "패스파인더는 어떻게 설치하나요?",
        a: "패스파인더 압축 파일(.zip)을 폴더로 압축 해제한 뒤, 크롬 chrome://extensions 에서 개발자 모드를 켜고 ‘압축 해제된 확장 프로그램을 로드’로 해당 폴더를 선택합니다. 이후 확장 아이콘에서 XGEN PathFinder를 실행하면 XGEN 로드 시 자동 연동됩니다.",
    },
    {
        q: "패스파인더로 만든 에이전트는 그대로 사용하나요?",
        a: "패스파인더는 제작을 돕는 보조 도구입니다. 생성 후에는 표준 에이전트 제작 가이드로 구성을 검토하는 것을 권장하며, 확장 프로그램은 설치한 브라우저에서만 동작합니다.",
    },
];

export default function PathFinderPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        name: "XGEN PathFinder",
                        alternateName: "패스파인더",
                        applicationCategory: "BrowserApplication",
                        operatingSystem: "Chrome",
                        description:
                            "시스템과 API를 코드 없이 AI 에이전트가 사용하는 Agent Tool로 연결하고, 대화로 XGEN Canvas 워크플로우 제작을 돕는 크롬 확장형 AI 어시스턴트.",
                        url: absoluteUrl("/pathfinder"),
                        isPartOf: {
                            "@type": "SoftwareApplication",
                            name: "XGEN",
                            applicationCategory: "BusinessApplication",
                        },
                        offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "XGEN", path: "/product" },
                        { name: "PathFinder", path: "/pathfinder" },
                    ]),
                    faqPageLd(FAQ.map((f) => ({ question: f.q, answer: f.a }))),
                ]}
            />

            {/* HERO */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-4xl px-6 pt-16 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                        <Compass className="h-3.5 w-3.5 text-[#7dd3fc]" />
                        XGEN · PathFinder
                    </p>
                    <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        레거시 시스템을 AI가 쓰는 Tool로 연결합니다
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                        패스파인더는 시스템과 API를 코드 없이 AI 에이전트가 사용할 수 있는
                        Agent Tool로 연결하는 기술입니다. 로그인부터 연결, 테스트, 등록까지
                        전 과정을 브라우저에서 자동화해, 기존 시스템을 빠르게 AI 업무 환경으로
                        확장합니다.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/xgen-trial"
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            XGEN 무료 체험
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <a
                            href={MANUAL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            설치·사용 가이드
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            <main>
                {/* TL;DR */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-4xl px-6 py-14">
                        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 text-center md:p-8">
                            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#2461d8]">
                                핵심 요약
                            </p>
                            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink)]">
                                패스파인더는 기존 웹 시스템·API를 코드 없이 AI 에이전트의
                                Agent Tool로 연결하고, 대화로 XGEN Canvas 워크플로우 제작을 돕는
                                크롬 확장형 AI 어시스턴트입니다. 로그인 → API 연결 → 도구 등록 →
                                테스트를 브라우저에서 자동화해 현업이 직접 자동화를 만듭니다
                            </p>
                        </div>
                    </div>
                </section>

                {/* 할 수 있는 일 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            What it does
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            패스파인더로 할 수 있는 일
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            제작·연결·조작·지원까지, 브라우저 안에서 AI가 함께 일합니다
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {CAPABILITIES.map((c) => (
                                <div
                                    key={c.title}
                                    className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {c.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 작동 방식 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-5xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            How it works
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            코드 없이 4단계로 연결합니다
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            로그인부터 테스트까지, 브라우저 조작만으로 기존 시스템을 도구로 만듭니다
                        </p>
                        <ol className="mt-12 grid gap-y-10 sm:grid-cols-4 sm:gap-x-4">
                            {FLOW.map((f, i) => (
                                <li key={f.step} className="flex flex-col items-center text-center">
                                    <div className="relative flex w-full items-center justify-center">
                                        {i > 0 && (
                                            <span className="absolute right-1/2 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-[var(--color-line-strong)] sm:block" />
                                        )}
                                        {i < FLOW.length - 1 && (
                                            <span className="absolute left-1/2 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-[var(--color-line-strong)] sm:block" />
                                        )}
                                        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2f7bff,#7c5cff)] text-white ring-4 ring-[var(--color-surface)]">
                                            <f.icon className="h-6 w-6" />
                                        </span>
                                    </div>
                                    <span className="mt-4 font-mono text-[12px] font-bold text-[#2461d8]">
                                        STEP {f.step}
                                    </span>
                                    <h3 className="mt-1 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {f.title}
                                    </h3>
                                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.desc}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 활용 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Use cases
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            이럴 때 씁니다
                        </h2>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {USE_CASES.map((u) => (
                                <div
                                    key={u.title}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center"
                                >
                                    <h3 className="text-[17px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                        {u.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {u.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 시작하기 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-4xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Getting started
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            이렇게 시작합니다
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            크롬 확장 프로그램으로 설치해 XGEN과 연동합니다
                        </p>
                        <ol className="mx-auto mt-10 max-w-2xl space-y-4">
                            {START.map((s) => (
                                <li
                                    key={s.step}
                                    className="flex gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-5"
                                >
                                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#2461d8] font-mono text-[15px] font-bold text-white">
                                        {s.step}
                                    </span>
                                    <div>
                                        <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {s.title}
                                        </h3>
                                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {s.desc}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-8 text-center">
                            <a
                                href={MANUAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                            >
                                설치·사용 상세 가이드 보기
                                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section
                    aria-label="자주 묻는 질문"
                    className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-3xl px-6 py-24">
                        <h2 className="mx-auto text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            자주 묻는 질문
                        </h2>
                        <dl className="mt-10 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                            {FAQ.map((f) => (
                                <div key={f.q} className="py-6">
                                    <dt className="text-[17px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                        {f.q}
                                    </dt>
                                    <dd className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
                        <h2 className="text-2xl font-bold tracking-tight md:text-[32px]">
                            기존 시스템을 AI 업무로 확장해 보세요
                        </h2>
                        <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-white/75">
                            패스파인더로 코드 없이 도구를 연결하고, XGEN에서 에이전트를 만들어
                            실제 업무에 적용합니다
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/xgen-trial"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                XGEN 무료 체험
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/product"
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                XGEN 제품 보기
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
