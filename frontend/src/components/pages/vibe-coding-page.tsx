import Link from "next/link";
import { ArrowRight, AppWindow, Bot, CheckCircle2, Code2, MessageSquareText, PlayCircle, TerminalSquare } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { VibeCodingVideo } from "@/components/vibe-coding-video";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { absoluteUrl, SITE } from "@/lib/site";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const COPY = {
    ko: {
        badge: "XGEN · DexOn Component",
        title: "바이브코딩으로 Agent와 App을 만듭니다",
        lead: "DexOn에서 원하는 업무를 자연어로 설명하면 Agent가 프로젝트 문맥을 읽고 코드를 작성합니다. Agent 제작부터 업무용 App 구현, 실행·테스트·오류 수정까지 한 흐름으로 이어집니다.",
        ctaVideo: "실제 화면으로 보기",
        ctaProduct: "XGEN 핵심 기능 보기",
        overviewEyebrow: "FROM IDEA TO WORKING SOFTWARE",
        overviewTitle: "설명에서 멈추지 않고, 실행되는 결과물까지 만듭니다",
        overviewLead: "바이브코딩은 단순한 코드 자동완성이 아닙니다. 목표와 조건을 전달하면 Agent가 작업을 나누고 코드를 수정하며, 실행 결과를 확인한 뒤 다음 변경을 이어갑니다.",
        steps: [
            ["01", "업무를 설명합니다", "만들 Agent나 App의 목적, 필요한 화면, 데이터와 제약 조건을 자연어로 전달합니다."],
            ["02", "프로젝트 안에서 구현합니다", "Agent가 기존 코드와 프로젝트 구조를 읽고 필요한 파일을 생성하거나 수정합니다."],
            ["03", "실행하며 함께 다듬습니다", "실행·테스트 결과를 확인하고 오류를 수정합니다. 사용자는 결과를 보며 다음 요구를 이어갑니다."],
        ],
        modesTitle: "DexOn 안에서 두 가지 방식으로 코딩합니다",
        modesLead: "상황에 따라 자연어 중심의 바이브코딩과 개발자가 직접 다루는 풀코딩을 자연스럽게 오갈 수 있습니다.",
        modes: [
            ["Vibe Coding", "자연어로 목표와 변경 사항을 설명하면 Agent가 코드를 작성·수정하고 실행 결과를 함께 확인합니다."],
            ["Hands-on Coding", "필요한 구간은 개발자가 직접 코드를 편집하고, Agent에게 분석·테스트·반복 작업을 맡깁니다."],
        ],
        videoEyebrow: "PROOF IN ACTION",
        videoTitle: "DexOn에서 바이브코딩이 동작하는 모습을 확인하세요",
        videoLead: "로컬 개발 환경과 Agent를 연결하고, 자연어 지시로 코드를 작성·수정하는 실제 과정을 보여드립니다.",
        outcomesTitle: "Agent와 App, 두 결과물을 만듭니다",
        outcomes: [
            ["Agent", "지식·도구·업무 규칙을 연결하고, 실제 업무를 계획하고 실행하는 Agent를 구현합니다."],
            ["App", "업무 화면, 내부 도구, 프로토타입과 운영 기능을 코드로 만들고 기존 프로젝트에 반영합니다."],
        ],
        closingTitle: "아이디어를 실행 가능한 Agent와 App으로 전환하세요",
        closingLead: "XGEN과 DexOn으로 자연어 요청부터 코드, 테스트, 실행까지 하나의 작업 흐름으로 연결합니다.",
        closingCta: "XGEN 무료 체험",
    },
    en: {
        badge: "XGEN · DexOn Component",
        title: "Build agents and apps with vibe coding",
        lead: "Describe the work you want inside DexOn and the agent reads the project context and writes the code. Agent creation, business-app implementation, execution, testing, and error correction stay in one continuous flow.",
        ctaVideo: "Watch it in action",
        ctaProduct: "Explore XGEN capabilities",
        overviewEyebrow: "FROM IDEA TO WORKING SOFTWARE",
        overviewTitle: "Move beyond a description to working software",
        overviewLead: "Vibe coding is more than code completion. Give the agent a goal and constraints, and it breaks down the work, changes the code, checks the result, and continues with the next revision.",
        steps: [
            ["01", "Describe the work", "Explain the purpose, screens, data, and constraints of the agent or app in natural language."],
            ["02", "Build inside the project", "The agent reads the existing code and project structure, then creates or revises the files it needs."],
            ["03", "Run and refine together", "Review execution and test results, correct errors, and continue with the next request from the working result."],
        ],
        modesTitle: "Use two coding modes inside DexOn",
        modesLead: "Move naturally between natural-language vibe coding and hands-on coding, depending on what the work calls for.",
        modes: [
            ["Vibe Coding", "Describe the goal and changes in natural language, then let the agent write, revise, and run the code with you."],
            ["Hands-on Coding", "Edit critical sections directly while the agent handles analysis, testing, and repetitive implementation work."],
        ],
        videoEyebrow: "PROOF IN ACTION",
        videoTitle: "See vibe coding running inside DexOn",
        videoLead: "Watch a local development environment connect to an agent and turn natural-language instructions into working code changes.",
        outcomesTitle: "Build two kinds of outcomes: agents and apps",
        outcomes: [
            ["Agent", "Connect knowledge, tools, and business rules to build an agent that plans and performs real work."],
            ["App", "Create business screens, internal tools, prototypes, and production features directly in an existing project."],
        ],
        closingTitle: "Turn an idea into a working agent or app",
        closingLead: "Connect natural-language requests, code, tests, and execution in one workflow with XGEN and DexOn.",
        closingCta: "Try XGEN free",
    },
} satisfies Record<Locale, Record<string, any>>;

const STEP_ICONS = [MessageSquareText, Code2, CheckCircle2];
const OUTCOME_ICONS = [Bot, AppWindow];

export function VibeCodingPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const path = locale === "en" ? "/en/vibe-coding" : "/vibe-coding";
    return (
        <>
            <SiteNav />
            <JsonLd data={[
                {
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    name: "Vibe Coding in DexOn",
                    applicationCategory: "DeveloperApplication",
                    operatingSystem: "Windows, macOS, Linux",
                    description: t.lead,
                    url: absoluteUrl(path),
                    isPartOf: { "@type": "SoftwareApplication", name: "XGEN" },
                    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                },
                breadcrumbLd([
                    { name: "Home", path: locale === "en" ? "/en" : "/" },
                    { name: "XGEN", path: localeHref(locale, "/product") },
                    { name: "Vibe Coding in DexOn", path },
                ]),
            ]} />

            <main className="bg-white pt-[var(--nav-h,84px)] text-[var(--color-ink)]">
                <section className="bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[#2461d8]">{t.badge}</p>
                        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight md:text-6xl">{t.title}</h1>
                        <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[var(--color-ink-muted)] md:text-[19px]">{t.lead}</p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <a href="#demo" className="inline-flex items-center gap-2 bg-[#2461d8] px-5 py-3 text-[14px] font-semibold text-white">
                                <PlayCircle className="h-4 w-4" />{t.ctaVideo}
                            </a>
                            <Link href={localeHref(locale, "/product#build")} className="inline-flex items-center gap-2 border border-[var(--color-line)] bg-white px-5 py-3 text-[14px] font-semibold">
                                {t.ctaProduct}<ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <p className="font-mono text-[12px] tracking-widest text-[var(--color-ink-subtle)]">{t.overviewEyebrow}</p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">{t.overviewTitle}</h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[var(--color-ink-muted)]">{t.overviewLead}</p>
                        <div className="mt-10 grid gap-0 border-y border-[var(--color-line)] md:grid-cols-3">
                            {t.steps.map(([no, title, desc]: string[], index: number) => {
                                const Icon = STEP_ICONS[index];
                                return <article key={no} className="border-b border-[var(--color-line)] py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
                                    <div className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#2461d8]" /><span className="font-mono text-[12px] text-[var(--color-ink-subtle)]">{no}</span></div>
                                    <h3 className="mt-5 text-[19px] font-bold">{title}</h3>
                                    <p className="mt-3 text-[14px] leading-6 text-[var(--color-ink-muted)]">{desc}</p>
                                </article>;
                            })}
                        </div>
                    </div>
                </section>

                <section className="bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.modesTitle}</h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[var(--color-ink-muted)]">{t.modesLead}</p>
                        <div className="mt-9 grid gap-5 md:grid-cols-2">
                            {t.modes.map(([title, desc]: string[], index: number) => {
                                const Icon = index === 0 ? MessageSquareText : TerminalSquare;
                                return <article key={title} className="border border-[var(--color-line)] bg-white p-7">
                                    <Icon className="h-6 w-6 text-[#2461d8]" />
                                    <h3 className="mt-5 text-xl font-bold">{title}</h3>
                                    <p className="mt-3 text-[14px] leading-6 text-[var(--color-ink-muted)]">{desc}</p>
                                </article>;
                            })}
                        </div>
                    </div>
                </section>

                <section id="demo" className="scroll-mt-[var(--nav-h,84px)] border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <p className="font-mono text-[12px] tracking-widest text-[#2461d8]">{t.videoEyebrow}</p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">{t.videoTitle}</h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[var(--color-ink-muted)]">{t.videoLead}</p>
                        <div className="mt-9 max-w-5xl"><VibeCodingVideo locale={locale} /></div>
                    </div>
                </section>

                <section className="bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.outcomesTitle}</h2>
                        <div className="mt-9 grid gap-5 md:grid-cols-2">
                            {t.outcomes.map(([title, desc]: string[], index: number) => {
                                const Icon = OUTCOME_ICONS[index];
                                return <article key={title} className="flex gap-5 border-t border-[var(--color-line)] py-7">
                                    <Icon className="mt-1 h-6 w-6 flex-none text-[#2461d8]" />
                                    <div><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-[14px] leading-6 text-[var(--color-ink-muted)]">{desc}</p></div>
                                </article>;
                            })}
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">{t.closingTitle}</h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[var(--color-ink-muted)]">{t.closingLead}</p>
                        <Link href={localeHref(locale, "/xgen-trial")} className="mt-8 inline-flex items-center gap-2 bg-[#2461d8] px-5 py-3 text-[14px] font-semibold text-white">{t.closingCta}<ArrowRight className="h-4 w-4" /></Link>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
