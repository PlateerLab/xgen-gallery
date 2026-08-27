import Link from "next/link";
import {
    Cable,
    Boxes,
    Activity,
    Check,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { XgenEmbedPanel } from "@/components/xgen-embed-panel";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * XGEN 무료 체험(Trial) 페이지 — xgen.im/trial 콘텐츠를 연구소 사이트 룩앤필로 재구성.
 * 홈 Live Demo 카드와 Applied AI 드롭다운의 "XGEN Agentic Platform 체험하기"가 이 내부
 * 페이지로 라우팅된다. 체험 신청은 내부 모달 폼(TrialSignupForm)으로 접수한다.
 */
/** XGEN 3단계 — 연동 · 설계 · 운영. */
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const PILLAR_ICONS: LucideIcon[] = [Cable, Boxes, Activity];
const PILLAR_EN = ["Connect", "Build", "Operate"];

interface TrialCopy {
    ldName: string;
    ldDescription: string;
    breadcrumb: string;
    pillars: [string, string][];
    steps: string[];
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    ctaApply: string;
    ctaConsult: string;
    heroChips: string[];
    stepsTitle: string;
    pcNote: string;
    /** 오른쪽 XGEN 화면 패널 문구 — 임베드가 막혔을 때의 대체 화면 포함 */
    embed: {
        overlayTitle: string;
        overlayLead: string;
        overlayCta: string;
    };
}

const COPY: Record<Locale, TrialCopy> = {
    ko: {
        ldName: "XGEN 15일 무료 체험",
        ldDescription:
            "XGEN Agentic AI 플랫폼의 15일 무료 데모 체험. 데이터 연동·노코드 에이전트 빌드·RAG·MCP·거버넌스를 직접 경험한다.",
        breadcrumb: "XGEN 무료 체험",
        pillars: [
            ["연동", "기업 데이터와 내부 시스템을 XGEN에 연결해 AI가 실제 업무 맥락을 이해하게 합니다."],
            ["설계", "코드 없이 드래그 앤 드롭으로 업무에 맞는 맞춤형 AI Agent를 직접 만듭니다."],
            ["운영", "만든 에이전트를 한 곳에서 통합 관리하고, 거버넌스·보안 아래 안정적으로 운영합니다."],
        ],
        steps: [
            "신청 양식 제출",
            "안내 메일 및 사용 가이드 수신",
            "할당된 계정으로 솔루션 접속",
            "15일간 XGEN 무료 Trial 시작",
        ],
        heroEyebrow: "XGEN · 무료 체험",
        heroTitle: "아이디어를 나만의 AI Agent로 만들어보세요",
        heroLead:
            "데이터 연결부터 맞춤형 AI Agent 구현, 실제 운영까지 — 15일 무료 데모 환경에서 직접 경험할 수 있습니다.",
        ctaApply: "15일 무료 체험 신청하기",
        ctaConsult: "도입·PoC 상담",
        heroChips: ["15일 완전 무료", "설치 없이 웹에서", "노코드로 바로 시작"],
        stepsTitle: "신청부터 시작까지, 4단계",
        pcNote: "XGEN 체험 데모 환경은 PC에서만 사용할 수 있습니다",
        embed: {
            overlayTitle: "받으신 계정으로 바로 시작하세요",
            overlayLead:
                "신청 후 메일로 받은 계정으로 로그인하면 15일 무료 체험이 시작됩니다.",
            overlayCta: "XGEN 데모 환경 열기",
        },
    },
    en: {
        ldName: "XGEN 15-day free trial",
        ldDescription:
            "A 15-day free demo of the XGEN Agentic AI platform. Try data integration, no-code agent building, RAG, MCP, and governance for yourself.",
        breadcrumb: "XGEN free trial",
        pillars: [
            ["Connect", "Connect your enterprise data and internal systems to XGEN so the AI understands the real context of the work."],
            ["Build", "Build the custom AI agent your work needs by drag and drop, without writing code."],
            ["Operate", "Manage the agents you built in one place and run them steadily under governance and security."],
        ],
        steps: [
            "Submit the request form",
            "Receive the welcome email and usage guide",
            "Sign in with the account provided",
            "Start your 15-day XGEN trial",
        ],
        heroEyebrow: "XGEN · Free trial",
        heroTitle: "Turn your idea into an AI agent of your own",
        heroLead:
            "From connecting data to building a custom AI agent and running it — try the whole path yourself in a 15-day free demo environment.",
        ctaApply: "Start the 15-day trial",
        ctaConsult: "Talk about a PoC",
        heroChips: ["Free for 15 days", "In the browser, nothing to install", "No-code, start immediately"],
        stepsTitle: "From request to start, in four steps",
        pcNote: "The XGEN trial demo environment is available on desktop only",
        embed: {
            overlayTitle: "Start with the account we send you",
            overlayLead:
                "Sign in with the account from your welcome email and your 15-day trial begins.",
            overlayCta: "Open the XGEN demo",
        },
    },
};

export function XgenTrialPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const PILLARS = t.pillars.map(([title, desc], i) => ({
        icon: PILLAR_ICONS[i],
        title,
        en: PILLAR_EN[i],
        desc,
    }));
    const STEPS = t.steps.map((title, i) => ({
        step: String(i + 1).padStart(2, "0"),
        title,
    }));
    return (
        <>
            <SiteNav />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Product", path: "/product" },
                        { name: t.breadcrumb, path: localeHref(locale, "/xgen-trial") },
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "Offer",
                        name: t.ldName,
                        description:
                            t.ldDescription,
                        url: absoluteUrl("/xgen-trial"),
                        price: 0,
                        priceCurrency: "KRW",
                        category: "Free trial",
                        seller: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                ]}
            />

            {/*
              원페이지 — 별도 키 비주얼 밴드를 두지 않는다. 어두운 히어로를
              한 칸 세우면 그것만으로 첫 화면이 차고, 정작 무엇을 어떻게
              시작하는지는 스크롤 아래로 밀린다. 왼쪽에 읽을 것을, 오른쪽에
              실제 화면을 두어 한 화면에서 판단이 끝나게 한다.
            */}
            <main>
                <section className="bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-10 lg:py-11">
                        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                            <div className="min-w-0">
                                <p className="text-[14px] font-semibold tracking-tight text-[#2461d8]">
                                    {t.heroEyebrow}
                                </p>
                                <h1 className="mt-2.5 text-[28px] font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[38px]">
                                    {t.heroTitle}
                                </h1>
                                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.heroLead}
                                </p>

                                {/* 연동 · 설계 · 운영 — 한 줄씩만 둔다 */}
                                <ul className="mt-7 space-y-3.5">
                                    {PILLARS.map((p) => (
                                        <li key={p.title} className="flex gap-3">
                                            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <p.icon className="h-4 w-4" />
                                            </span>
                                            <p className="min-w-0 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                <strong className="font-bold text-[var(--color-ink)]">
                                                    {p.title}
                                                </strong>{" "}
{p.title !== p.en && (
                                                    <span className="text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                                        {p.en}{" "}
                                                    </span>
                                                )}
                                                — {p.desc}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                {/* 신청 4단계 + CTA */}
                                <div className="mt-7 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
                                    <h2 className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {t.stepsTitle}
                                    </h2>
                                    <ol className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2">
                                        {STEPS.map((s) => (
                                            <li
                                                key={s.step}
                                                className="inline-flex items-baseline gap-1.5 text-[14px] text-[var(--color-ink-muted)]"
                                            >
                                                <span className="font-mono text-[12px] font-bold text-[#2f7bff]">
                                                    {s.step}
                                                </span>
                                                {s.title}
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        <Link
                                            href={
                                                localeHref(locale, "/contact") +
                                                "?type=trial&from=xgen-trial"
                                            }
                                            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110"
                                        >
                                            {t.ctaApply}
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                        </Link>
                                        <Link
                                            href={
                                                localeHref(locale, "/contact") +
                                                "?type=poc&from=xgen-trial"
                                            }
                                            className="inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-[var(--color-ink-muted)] transition hover:gap-2.5 hover:text-[#2461d8]"
                                        >
                                            {t.ctaConsult}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>

                                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-[var(--color-ink-muted)]">
                                    {t.heroChips.map((v) => (
                                        <li key={v} className="inline-flex items-center gap-1.5">
                                            <Check className="h-3.5 w-3.5 text-[#2f7bff]" />
                                            {v}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 오른쪽 — XGEN 화면 */}
                            <XgenEmbedPanel
                                copy={{ ...t.embed, pcOnly: t.pcNote }}
                                className="min-w-0"
                            />
                        </div>
                    </div>
                </section>
            </main>


            <SiteFooter />
        </>
    );
}
