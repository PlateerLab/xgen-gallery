import Link from "next/link";
import {
    LayoutDashboard,
    ArrowRight,
    ArrowUpRight,
    MessageSquare,
    Gauge,
    BarChart3,
    Table2,
    FileText,
    ListChecks,
    ShieldCheck,
    Check,
    X,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { FloUIConceptArt } from "@/components/floui-concept-art";
import { FloUIWhyBeforeArt, FloUIWhyAfterArt } from "@/components/floui-why-art";
import { FLOUI_DIFF_ART } from "@/components/floui-diff-art";
import { FeatureArt, type FeatureArtKey } from "@/components/feature-art";
import { breadcrumbLd, faqPageLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import { SITE, absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * FloUI 제품 상세 — /product 의 특장점 카드에서 「자세히 보기」로 들어온다.
 *
 * 패스파인더·DeX 상세와 같은 순서를 쓴다: 무엇이 다른가 → 어떻게 동작하는가 →
 * 무엇이 만들어지는가 → 어디에 쓰나. 도입을 검토하는 쪽이 3분 안에 판단하는
 * 자리이고, 화면 하나하나의 사용법은 매뉴얼이 맡는다.
 *
 * 이 페이지가 계속 되돌아가는 한 문장은 「미리 그려 둔 화면이 아니다」이다.
 * 대시보드 제품과 구분되는 지점이 거기뿐이라, 섹션마다 그 대비를 남겨 둔다.
 */
const BLOCK_ICONS: LucideIcon[] = [Gauge, BarChart3, FileText, Table2];
const CASE_ICONS: LucideIcon[] = [BarChart3, ListChecks, MessageSquare, ShieldCheck];

interface FlouiCopy {
    ldDescription: string;
    heroBadge: string;
    heroTitle: string;
    heroLead: string;
    ctaTrial: string;
    ctaArticle: string;
    /** 히어로의 아티클 CTA — 「더 알아보기」 목록과 별개로 둔다 */
    articleHref: string;
    summaryTitle: string;
    summaryBody: string;
    diffTitle: string;
    diffLead: string;
    diffs: [string, string][];
    howTitle: string;
    howLead: string;
    blocksTitle: string;
    blocksLead: string;
    blocks: [string, string][];
    whyTitle: string;
    whyLead: string;
    beforeLabel: string;
    before: string[];
    afterLabel: string;
    after: string[];
    casesTitle: string;
    casesLead: string;
    cases: [string, string][];
    govTitle: string;
    govLead: string;
    govs: string[];
    faqTitle: string;
    faqAria: string;
    faq: { q: string; a: string }[];
    readTitle: string;
    reads: { label: string; desc: string; href: string; art: FeatureArtKey }[];
    /** 관련 블로그 — 기능 페이지와 성격이 달라 목록을 나눠 둔다 */
    postsTitle: string;
    posts: { label: string; desc: string; href: string }[];
    closingTitle: string;
    closingLead: string;
    closingTrial: string;
    closingContact: string;
}

const COPY: Record<Locale, FlouiCopy> = {
    ko: {
        ldDescription:
            "FloUI는 사용자의 질문을 해석해 KPI·차트·표·RAG 요약을 실시간으로 배치하는 XGEN의 응답형 UI 기술입니다. 미리 만들어 둔 대시보드를 여는 방식이 아니라, 질문마다 필요한 화면을 그 자리에서 구성합니다.",
        heroBadge: "XGEN · FloUI",
        heroTitle: "질문하는 순간, 그 질문을 위한 화면이 만들어집니다",
        heroLead:
            "FloUI는 사용자의 질문을 해석해 KPI와 차트, 표, RAG 요약을 실시간으로 배치하는 응답형 UI 기술입니다. 화면 하나를 더 보려고 개발을 요청하고 기다리던 주기가 사라집니다.",
        ctaTrial: "무료 체험 신청",
        ctaArticle: "FloUI 아티클 읽기",
        articleHref: "/blog/product-floui",

        summaryTitle: "한줄 요약",
        summaryBody:
            "화면을 미리 그려두지 않습니다. FloUI는 사용자의 요청에 맞춰 필요한 화면을 그 자리에서 생성합니다.",

        diffTitle: "대시보드와 무엇이 다른가요?",
        diffLead:
            "BI 대시보드는 미리 정의된 지표와 화면을 기반으로 정보를 제공합니다. FloUI는 새로운 질문이 생겨도 필요한 화면을 실시간으로 생성해, 사용자가 탐색을 이어갈 수 있도록 지원합니다.",
        diffs: [
            [
                "질문이 화면의 명세가 됩니다",
                "어떤 지표를 어떤 형태로 볼지 사람이 미리 정의하지 않습니다. 질문 문장 자체가 화면의 명세가 되고, 필요한 구성 요소는 FloUI가 고릅니다.",
            ],
            [
                "정형 데이터와 문서를 한 화면에서 봅니다",
                "숫자는 데이터베이스에, 맥락은 문서에 흩어져 있습니다. FloUI는 정형 데이터 조회와 RAG 참조를 함께 묶어, 수치와 그 수치를 설명하는 근거를 한 화면에 놓습니다.",
            ],
            [
                "탐색의 속도가 회의 속도를 따라갑니다",
                "관점을 하나 바꿀 때마다 새 화면이 필요합니다. 요청과 개발을 거치면 그 관점은 이미 지나간 뒤입니다. FloUI에서는 다시 묻는 것으로 끝나, 회의 안에서 가설을 검증합니다.",
            ],
        ],

        howTitle: "어떻게 동작하나요?",
        howLead:
            "질문에서 화면으로 곧장 건너뛰지 않습니다. 의도를 읽고, 필요한 데이터를 모으고, 그에 맞는 컴포넌트를 고르는 세 단계를 거칩니다. 이 단계가 있어야 왜 이런 화면이 나왔는지 설명할 수 있습니다.",

        blocksTitle: "어떤 화면이 만들어지나요?",
        blocksLead:
            "사용자의 질문에 따라 필요한 화면 구성이 달라집니다. 같은 데이터를 조회하더라도 \"추세를 보고 싶다\"와 \"원인을 알고 싶다\"는 서로 다른 화면으로 생성됩니다.",
        blocks: [
            ["KPI 카드", "핵심 수치와 기준 대비 증감을 먼저 보여 줍니다."],
            ["차트", "추세·구성·비교 등 질문이 요구하는 형태로 그립니다."],
            ["RAG 요약", "수치의 배경이 되는 문서를 찾아 근거와 함께 요약합니다."],
            ["상세 표", "집계 뒤의 원본 행을 열어 검증할 수 있게 둡니다."],
        ],

        whyTitle: "왜 필요한가요?",
        whyLead:
            "데이터는 이미 충분히 쌓여 있습니다. 문제는 새로운 질문이 생길 때마다, 그에 맞는 화면을 새로 구성해야 한다는 점입니다.",
        beforeLabel: "지금까지",
        before: [
            "보고 싶은 관점이 생기면 화면 개발을 요청합니다",
            "요청 → 개발 → 검수에 며칠에서 몇 주가 걸립니다",
            "화면이 나왔을 때는 이미 다음 질문으로 넘어가 있습니다",
            "결국 익숙한 몇 개의 대시보드만 반복해서 봅니다",
        ],
        afterLabel: "FloUI",
        after: [
            "보고 싶은 관점을 그대로 질문합니다",
            "화면이 그 자리에서 구성됩니다",
            "관점을 바꾸려면 다시 물으면 됩니다",
            "탐색의 횟수가 늘고, 검증이 회의 안에서 끝납니다",
        ],

        casesTitle: "어떤 업무에 효과적일까요?",
        casesLead:
            "정해진 지표를 반복적으로 확인하는 업무보다, 새로운 질문을 던지고 데이터를 다양한 관점에서 탐색해야 하는 업무에서 효과적입니다.",
        cases: [
            ["실적 분석", "매출·주문·반품을 기간과 기준을 바꿔 가며 즉시 살펴봅니다."],
            ["운영 점검", "이상 징후를 발견한 자리에서 원인 후보까지 이어서 확인합니다."],
            ["기획·회의", "회의 중에 나온 가설을 그 회의 안에서 검증합니다."],
            ["현업 셀프서비스", "분석 요청 없이 현업이 스스로 필요한 화면을 만듭니다."],
        ],

        govTitle: "권한은 그대로, 화면만 달라집니다",
        govLead:
            "화면이 실시간으로 생성되더라도 사용자가 접근할 수 있는 데이터 범위는 변하지 않습니다. FloUI는 XGEN의 권한 체계를 그대로 따르며, 허용된 데이터만 조회하고 화면을 생성합니다.",
        govs: [
            "사용자 권한 밖의 데이터는 화면 구성 단계에서 제외됩니다",
            "RAG 참조는 접근 가능한 문서 범위 안에서만 이루어집니다",
            "어떤 질문으로 어떤 데이터를 조회했는지 기록이 남습니다",
            "온프레미스 환경에서 데이터가 외부로 나가지 않습니다",
        ],

        faqTitle: "자주 묻는 질문",
        faqAria: "FloUI 자주 묻는 질문",
        faq: [
            {
                q: "기존 BI 대시보드를 대체하나요?",
                a: "대체보다는 보완에 가깝습니다. 매일 같은 지표를 확인하는 정기 보고는 고정된 대시보드가 여전히 효율적입니다. FloUI는 정의되지 않은 질문, 즉 대시보드가 없어서 요청서를 쓰던 구간을 맡습니다.",
            },
            {
                q: "화면이 매번 다르면 결과를 신뢰할 수 있나요?",
                a: "화면 구성은 매번 달라지지만 데이터 조회는 정해진 스키마와 권한을 따릅니다. 상세 표로 집계 뒤의 원본 행을 열 수 있고, RAG 요약에는 참조한 문서가 함께 표시됩니다.",
            },
            {
                q: "우리 데이터에 맞추려면 무엇이 필요한가요?",
                a: "조회 대상 데이터의 스키마와 용어 정의, 참조할 문서 저장소를 연결하는 작업이 필요합니다. XGEN의 지식·도구 설정을 그대로 사용하므로 별도 시스템을 두지 않습니다.",
            },
            {
                q: "만들어진 화면을 다시 볼 수 있나요?",
                a: "네. 자주 쓰는 질문과 그 결과 화면은 저장해 두고 다시 열 수 있습니다. 반복되는 질문이 사실상 새 대시보드가 되는 셈입니다.",
            },
        ],

        readTitle: "XGEN 핵심 기능 더 알아보기",
        reads: [
            {
                label: "이지모드",
                desc: "코딩 없이, 약 90초면 에이전트가 완성됩니다.",
                href: "/product#build",
                art: "easy-mode",
            },
            {
                label: "패스파인더",
                desc: "기존 웹 시스템과 API를 Agent가 쓰는 도구로 연결합니다.",
                href: "/pathfinder",
                art: "pathfinder",
            },
            {
                label: "XGEN DeX",
                desc: "만든 Agent를 직원의 데스크톱 업무환경에서 실행합니다.",
                href: "/xgen-dex",
                art: "xgen-dex",
            },
        ],
        postsTitle: "관련 FloUI 프리뷰",
        posts: [
            {
                label: "FloUI — 질문이 곧 화면이 되는 UI",
                desc: "설계 배경과 동작 방식을 자세히 다룬 아티클입니다.",
                href: "/blog/product-floui",
            },
        ],

        closingTitle: "질문을 바꿔 가며 확인해 보세요",
        closingLead:
            "화면이 질문을 따라오는 경험은 설명보다 직접 써 보는 편이 빠릅니다. 15일 무료 체험에서 확인하실 수 있습니다.",
        closingTrial: "무료 체험 신청",
        closingContact: "도입 문의",
    },

    en: {
        ldDescription:
            "FloUI is XGEN's adaptive UI technology: it reads a user's question and lays out KPIs, charts, tables, and RAG summaries in real time, instead of opening a dashboard someone drew in advance.",
        heroBadge: "XGEN · FloUI",
        heroTitle: "Ask, and the screen for that question builds itself",
        heroLead:
            "FloUI reads the question and lays out KPIs, charts, tables, and a RAG summary in real time. The cycle of filing a request and waiting for one more screen disappears.",
        ctaTrial: "Start the free trial",
        ctaArticle: "Read the FloUI article",
        articleHref: "/blog/product-floui",

        summaryTitle: "In short",
        summaryBody:
            "We don't draw screens in advance. FloUI generates the screen the request calls for, on the spot.",

        diffTitle: "How is this different from a dashboard?",
        diffLead:
            "A BI dashboard serves information through metrics and screens defined in advance. When a new question comes up, FloUI generates the screen it calls for in real time, so exploration can keep going.",
        diffs: [
            [
                "The question becomes the spec",
                "Nobody decides in advance which metric appears in which shape. The sentence itself is the specification, and FloUI picks the components it needs.",
            ],
            [
                "Structured data and documents on one screen",
                "The numbers live in a database and the context lives in documents. FloUI joins structured queries with RAG references so a figure and the evidence behind it sit on the same screen.",
            ],
            [
                "Exploration keeps pace with the meeting",
                "Every new angle needs a new screen, and by the time a request has been built the angle has passed. With FloUI you just ask again — so the hypothesis gets tested inside the meeting.",
            ],
        ],

        howTitle: "How does it work?",
        howLead:
            "It does not jump straight from question to screen. It reads the intent, gathers the data it needs, and selects the matching components. Those steps are what make the resulting screen explainable.",

        blocksTitle: "What kind of screen comes back?",
        blocksLead:
            "The composition changes with the question. Querying the same data, \"show me the trend\" and \"tell me why\" are generated as different screens.",
        blocks: [
            ["KPI cards", "The headline figures and their movement against a baseline, first."],
            ["Charts", "Trend, composition, comparison — drawn in the shape the question asks for."],
            ["RAG summary", "Finds the documents behind the numbers and summarizes them with sources."],
            ["Detail table", "Opens the underlying rows so the aggregate can be verified."],
        ],

        whyTitle: "Why does this matter?",
        whyLead:
            "There is more than enough data already. The problem is that every new question needs a new screen composed to match it.",
        beforeLabel: "Until now",
        before: [
            "A new angle means filing a request for a new screen",
            "Request → build → review takes days or weeks",
            "By the time it ships, the question has moved on",
            "So people keep returning to the same few dashboards",
        ],
        afterLabel: "With FloUI",
        after: [
            "The angle you want is simply the question you ask",
            "The screen is composed on the spot",
            "Changing the angle means asking again",
            "Exploration happens more often, and verification ends in the meeting",
        ],

        casesTitle: "Where does it pay off?",
        casesLead:
            "It pays off less in checking fixed metrics repeatedly, and more in work that raises new questions and explores the data from several angles.",
        cases: [
            ["Performance analysis", "Revenue, orders, and returns examined immediately across changing periods and cuts."],
            ["Operational checks", "Spot an anomaly and follow it through to candidate causes in the same place."],
            ["Planning and meetings", "A hypothesis raised in a meeting gets tested inside that meeting."],
            ["Business self-service", "Teams build the screen they need without filing an analysis request."],
        ],

        govTitle: "Same permissions, different screen",
        govLead:
            "A screen generated in real time does not change the data a user can reach. FloUI follows XGEN's permission model as it is, querying and composing only from data the user is allowed to see.",
        govs: [
            "Data outside the user's permissions is excluded during composition",
            "RAG references stay within the document scope the user can access",
            "Which question queried which data is recorded",
            "On-premise, the data never leaves your environment",
        ],

        faqTitle: "Frequently asked questions",
        faqAria: "FloUI frequently asked questions",
        faq: [
            {
                q: "Does it replace our BI dashboards?",
                a: "It complements them more than it replaces them. For recurring reports on the same metrics, a fixed dashboard is still efficient. FloUI takes over the undefined questions — the ones that used to require a request.",
            },
            {
                q: "If the screen differs every time, can we trust the result?",
                a: "The composition varies, but the queries follow a fixed schema and the user's permissions. A detail table opens the rows behind any aggregate, and RAG summaries show the documents they drew on.",
            },
            {
                q: "What does it take to fit our data?",
                a: "You connect the schema and term definitions for the data to be queried, plus the document stores to reference. It uses XGEN's existing knowledge and tool configuration, so there is no separate system to run.",
            },
            {
                q: "Can we come back to a screen it built?",
                a: "Yes. Frequently used questions and their resulting screens can be saved and reopened — a repeated question effectively becomes a new dashboard.",
            },
        ],

        readTitle: "More on XGEN key features",
        reads: [
            {
                label: "Easy Mode",
                desc: "No coding — an agent in about 90 seconds.",
                href: "/product#build",
                art: "easy-mode",
            },
            {
                label: "PathFinder",
                desc: "Connects existing web systems and APIs as tools an agent can use.",
                href: "/pathfinder",
                art: "pathfinder",
            },
            {
                label: "XGEN DeX",
                desc: "Runs the agents you built on your team's desktops.",
                href: "/xgen-dex",
                art: "xgen-dex",
            },
        ],
        postsTitle: "Related FloUI previews",
        posts: [
            {
                label: "FloUI — when the question becomes the screen",
                desc: "The article covering the design thinking and how it works in detail.",
                href: "/blog/product-floui",
            },
        ],

        closingTitle: "Try changing the question",
        closingLead:
            "A screen that follows the question is faster to try than to explain. The 15-day free trial is the quickest way to see it.",
        closingTrial: "Start the free trial",
        closingContact: "Talk to us",
    },
};

export function FloUIPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const en = locale === "en";
    const href = (path: string) => localeHref(locale, path);
    const home = en ? "/en" : "/";

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Product", path: en ? "/en/product" : "/product" },
                        { name: "FloUI", path: en ? "/en/floui" : "/floui" },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        name: "FloUI",
                        alternateName: "XGEN FloUI",
                        applicationCategory: "BusinessApplication",
                        operatingSystem: "Web",
                        description: t.ldDescription,
                        url: absoluteUrl("/floui"),
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                    faqPageLd(t.faq.map(({ q, a }) => ({ question: q, answer: a }))),
                ]}
            />

            {/* HERO */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-4xl px-6 pt-16 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] text-white/75 backdrop-blur-sm">
                        <LayoutDashboard className="h-3.5 w-3.5 text-[#7dd3fc]" />
                        {t.heroBadge}
                    </p>
                    <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.heroTitle}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
                        {t.heroLead}
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href={href("/xgen-trial")}
                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                        >
                            {t.ctaTrial}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href={href(t.articleHref)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                        >
                            {t.ctaArticle}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <main>
                {/* 한 줄 요약 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-4xl px-6 py-16 text-center">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.summaryTitle}
                        </p>
                        <p className="mt-4 text-[19px] font-semibold leading-relaxed tracking-tight text-[var(--color-ink)] md:text-[22px]">
                            {t.summaryBody}
                        </p>
                    </div>
                </section>

                {/* 대시보드와 무엇이 다른가 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.diffTitle}
                        </h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.diffLead}
                        </p>
                        <ul className="mt-10 grid gap-4 md:grid-cols-3">
                            {t.diffs.map(([title, desc], i) => {
                                const Art = FLOUI_DIFF_ART[i];
                                return (
                                    <li
                                        key={title}
                                        className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-7"
                                    >
                                        {/* 제목 → 그림 → 설명. 그림이 제목을 받아 설명으로 넘긴다 */}
                                        <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {title}
                                        </h3>
                                        <div className="my-5 rounded-xl bg-[var(--color-surface-alt)] px-6 py-5">
                                            <Art />
                                        </div>
                                        <p className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* 어떻게 동작하나 — 개념도 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.howTitle}
                        </h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.howLead}
                        </p>
                        <div className="mx-auto mt-12 max-w-4xl">
                            <FloUIConceptArt locale={locale} />
                        </div>
                    </div>
                </section>

                {/* 어떤 화면이 만들어지나 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.blocksTitle}
                        </h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.blocksLead}
                        </p>
                        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {t.blocks.map(([title, desc], i) => {
                                const Icon = BLOCK_ICONS[i];
                                return (
                                    <li
                                        key={title}
                                        className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                    >
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <Icon className="h-[18px] w-[18px]" />
                                        </span>
                                        <h3 className="mt-4 text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* 왜 필요한가 — 한계 vs 해결 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.whyTitle}
                        </h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.whyLead}
                        </p>

                        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-2">
                            <div className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7">
                                <p className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink-muted)]">
                                    {t.beforeLabel}
                                </p>
                                <div className="mt-5">
                                    <FloUIWhyBeforeArt />
                                </div>
                                <ul className="mt-6 flex flex-col gap-3">
                                    {t.before.map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                        >
                                            <X className="mt-0.5 h-4 w-4 flex-none text-[#b8bfc9]" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="min-w-0 rounded-2xl border border-[#bcd0f5] bg-white p-7">
                                <p className="text-[15.5px] font-bold tracking-tight text-[#2461d8]">
                                    {t.afterLabel}
                                </p>
                                <div className="mt-5">
                                    <FloUIWhyAfterArt />
                                </div>
                                <ul className="mt-6 flex flex-col gap-3">
                                    {t.after.map((a) => (
                                        <li
                                            key={a}
                                            className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink)]"
                                        >
                                            <Check className="mt-0.5 h-4 w-4 flex-none text-[#2f7bff]" />
                                            {a}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 어떤 업무에 효과적인가 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.casesTitle}
                        </h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.casesLead}
                        </p>
                        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {t.cases.map(([title, desc], i) => {
                                const Icon = CASE_ICONS[i];
                                return (
                                    <li
                                        key={title}
                                        className="min-w-0 rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                    >
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <Icon className="h-[18px] w-[18px]" />
                                        </span>
                                        <h3 className="mt-4 text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {desc}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* 권한과 거버넌스 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                                    {t.govTitle}
                                </h2>
                                <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.govLead}
                                </p>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {t.govs.map((g) => (
                                    <li
                                        key={g}
                                        className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-4 text-[14.5px] leading-relaxed text-[var(--color-ink)]"
                                    >
                                        <ShieldCheck className="mt-0.5 h-[18px] w-[18px] flex-none text-[#2f7bff]" />
                                        {g}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.faqTitle}
                        </h2>
                        <dl aria-label={t.faqAria} className="mt-8 flex flex-col gap-3">
                            {t.faq.map(({ q, a }) => (
                                <div
                                    key={q}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <dt className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {q}
                                    </dt>
                                    <dd className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {a}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* 핵심 기능 세 장 + 관련 블로그 — 성격이 달라 목록을 나눠 둔다 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.readTitle}
                        </h2>
                        <ul className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.reads.map((r) => (
                                <li key={r.href}>
                                    <Link
                                        href={href(r.href)}
                                        className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                    >
                                        {/* /product 특장점 카드와 같은 그림 — 두 화면이 어긋나지 않는다 */}
                                        <span className="mb-5 block">
                                            <FeatureArt art={r.art} locale={locale} />
                                        </span>
                                        <span className="block text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {r.label}
                                        </span>
                                        <span className="mt-2 block flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {r.desc}
                                        </span>
                                        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                            {en ? "Learn more" : "자세히 보기"}
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h2 className="mt-16 text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.postsTitle}
                        </h2>
                        <ul className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.posts.map((r) => (
                                <li key={r.href}>
                                    <Link
                                        href={href(r.href)}
                                        className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                    >
                                        <span className="min-w-0">
                                            <span className="block text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {r.label}
                                            </span>
                                            <span className="mt-2 block text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {r.desc}
                                            </span>
                                        </span>
                                        <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-[#2461d8] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 마무리 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {t.closingTitle}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.closingLead}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href={href("/xgen-trial")}
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                {t.closingTrial}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href={href("/contact") + "?from=floui"}
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-[15px] font-semibold text-[var(--color-ink)] transition hover:border-[#bcd0f5]"
                            >
                                {t.closingContact}
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
