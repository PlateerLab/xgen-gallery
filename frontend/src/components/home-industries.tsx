import Link from "next/link";
import { ShoppingBag, Landmark, Banknote, Server, ArrowRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 — Applied AI by Industry 미리보기. /solutions의 4개 산업 카드를 요약 노출한다.
 */
const GRAD =
    "bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent";

/** 산업명·태그라인은 두 언어 공통(영문 고유 표기). 업무 목록만 번역한다. */
const INDUSTRIES: {
    icon: typeof ShoppingBag;
    name: string;
    tagline: string;
    tasks: Record<Locale, string[]>;
}[] = [
    {
        icon: ShoppingBag,
        name: "E-Commerce",
        tagline: "AI Commerce Automation",
        tasks: {
            ko: ["상품 심사 자동화", "VOC 분석·응대", "가격 모니터링", "프로모션 최적화"],
            en: [
                "Automated product review",
                "VOC analysis and response",
                "Price monitoring",
                "Promotion optimization",
            ],
        },
    },
    {
        icon: Landmark,
        name: "Public Sector",
        tagline: "AI for Digital Government",
        tasks: {
            ko: ["민원 상담 자동화", "행정 업무 지원", "정책·규정 검색", "공공 데이터 활용"],
            en: [
                "Automated citizen support",
                "Administrative assistance",
                "Policy and regulation search",
                "Public data utilization",
            ],
        },
    },
    {
        icon: Banknote,
        name: "Finance",
        tagline: "Trusted Financial AI",
        tasks: {
            ko: ["여신 심사 지원", "계약서 검토", "이상 거래 탐지", "규제 준수 자동화"],
            en: [
                "Credit review support",
                "Contract review",
                "Anomalous transaction detection",
                "Automated regulatory compliance",
            ],
        },
    },
    {
        icon: Server,
        name: "IT Services",
        tagline: "Enterprise AI Operations",
        tasks: {
            ko: ["기술 문서 검색", "장애 분석", "운영 자동화", "코드 지원 Agent"],
            en: [
                "Technical document search",
                "Incident analysis",
                "Operations automation",
                "Coding assistant agents",
            ],
        },
    },
];

const COPY: Record<Locale, { title: React.ReactNode; lead: string; more: string }> = {
    ko: {
        title: (
            <>
                <span className={GRAD}>산업별</span>로 검증하는 Enterprise AI
            </>
        ),
        lead: "금융·공공·커머스·IT 서비스 — 산업별 업무와 규제를 이해하는 Enterprise AI를 연구하고 실증합니다",
        more: "고객사례 보기",
    },
    en: {
        title: (
            <>
                Enterprise AI, proven{" "}
                <span className={GRAD}>industry by industry</span>
            </>
        ),
        lead: "Finance, public sector, commerce, IT services — we research and validate Enterprise AI that understands each industry's workflows and regulations",
        more: "See customer cases",
    },
};

export function HomeIndustries({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <section className="border-t border-[var(--color-line)] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    / Applied AI
                </p>
                <h2 className="mt-3 max-w-3xl mx-auto text-center text-4xl font-semibold tracking-tight md:text-5xl">
                    {t.title}
                </h2>
                <p className="mt-5 mx-auto max-w-2xl text-[17px] text-center leading-relaxed text-[var(--color-ink-muted)]">
                    {t.lead}
                </p>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {INDUSTRIES.map((ind) => (
                        <div
                            key={ind.name}
                            className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6"
                        >
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <ind.icon className="h-5 w-5" />
                            </span>
                            <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {ind.name}
                            </h3>
                            <p className="mt-1 font-mono text-[12.5px] text-[var(--color-ink-subtle)]">
                                {ind.tagline}
                            </p>
                            <ul className="mt-4 space-y-1.5">
                                {ind.tasks[locale].map((task) => (
                                    <li
                                        key={task}
                                        className="text-[14px] leading-snug text-[var(--color-ink-muted)]"
                                    >
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-end">
                    <Link
                        href={localeHref(locale, "/customers")}
                        className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        {t.more}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
