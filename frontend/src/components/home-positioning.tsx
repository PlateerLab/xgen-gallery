import Link from "next/link";
import {
    FlaskConical,
    Boxes,
    Layers,
    BadgeCheck,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 홈 포지셔닝 서사 — "연구소가 만든 것을 제품으로 증명한다".
 * 연구(Research) → 오픈소스(Open Source) → 제품(Product) → 실증(Proof)의 한 방향
 * 파이프라인을 명시해 Plateer Labs의 정체성(연구소)을 사이트 전체 서사로 앵커한다.
 */
interface Copy {
    title: React.ReactNode;
    desc: string;
    more: string;
    steps: { n: string; icon: LucideIcon; title: string; sub?: string; desc: string; href: string }[];
}

const GRAD =
    "bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent";

const COPY: Record<Locale, Copy> = {
    ko: {
        title: (
            <>
                AI 연구가 제품이 되고,{" "}
                <span className={GRAD}>고객 현장에서 검증됩니다</span>
            </>
        ),
        desc: "기초 연구에서 시작해 오픈소스로 검증하고, XGEN·Polar·AI Code Assistant로 제품화합니다. 고객 현장과 품질 인증을 통해 기술의 가치를 증명합니다.",
        more: "바로가기",
        steps: [
            { n: "01", icon: FlaskConical, title: "연구", sub: "Research", desc: "신뢰·주권·조합 가능한 Enterprise AI를 현실로 만드는 기초 연구", href: "/research" },
            { n: "02", icon: Boxes, title: "오픈소스", sub: "Open Source", desc: "연구를 떠받치는 검증된 라이브러리를 오픈소스로 공개", href: "/library-gallery" },
            { n: "03", icon: Layers, title: "제품", sub: "Product", desc: "XGEN·Polar·Code Assistant로 기업 현장에 적용", href: "/product" },
            { n: "04", icon: BadgeCheck, title: "실증", sub: "Proof", desc: "고객사례와 국가 공인 인증으로 성과를 증명", href: "/customers" },
        ],
    },
    en: {
        title: (
            <>
                Research becomes product, and{" "}
                <span className={GRAD}>the field proves it</span>
            </>
        ),
        desc: "We start with foundational research, validate it in open source, and ship it as XGEN, Polar, and AI Code Assistant. Customer deployments and quality certification are where the value gets settled.",
        more: "Explore",
        steps: [
            { n: "01", icon: FlaskConical, title: "Research", desc: "Foundational work on Enterprise AI that is trustworthy, sovereign, and composable", href: "/research" },
            { n: "02", icon: Boxes, title: "Open Source", desc: "The proven libraries underneath that research, published in the open", href: "/library-gallery" },
            { n: "03", icon: Layers, title: "Product", desc: "Applied in the enterprise as XGEN, Polar, and Code Assistant", href: "/product" },
            { n: "04", icon: BadgeCheck, title: "Proof", desc: "Results evidenced by customer cases and national certification", href: "/customers" },
        ],
    },
};

export function HomePositioning({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <p className="font-mono text-[13px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    Plateer Labs
                </p>
                <h2 className="mt-3 max-w-3xl mx-auto text-center text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
                    {t.title}
                </h2>
                <p className="mt-4 mx-auto max-w-2xl text-[17px] text-center leading-relaxed text-[var(--color-ink-muted)]">
                    {t.desc}
                </p>

                <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {t.steps.map((s, i) => (
                        <li key={s.n} className="relative">
                            <Link
                                href={localeHref(locale, s.href)}
                                className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#bcd0f5] hover:shadow-[0_18px_40px_-22px_rgba(20,40,80,0.28)]"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <s.icon className="h-5 w-5" />
                                    </span>
                                    <span className="font-mono text-[13px] font-bold text-[var(--color-ink-subtle)]">
                                        {s.n}
                                    </span>
                                </div>
                                <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {s.title}
                                    {s.sub && (
                                        <>
                                            {" "}
                                            <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                                {s.sub}
                                            </span>
                                        </>
                                    )}
                                </h3>
                                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {s.desc}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                    {t.more}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </Link>

                            {/* 단계 연결 화살표 (데스크톱) */}
                            {i < t.steps.length - 1 && (
                                <span
                                    aria-hidden
                                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-[var(--color-line-strong)] lg:inline-flex"
                                >
                                    <ArrowRight className="h-5 w-5" />
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
