import Link from "next/link";
import { BookOpen, FileText, ArrowRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 — Resources 미리보기.
 * Documentation·Release Notes는 '기술 자산'이라 아이콘 카드로,
 * Research Team은 기술 자산이 아니라 '사람'이므로 일러스트 배너 카드로 차별화한다.
 */
const ASSETS: {
    icon: typeof BookOpen;
    title: string;
    body: Record<Locale, string>;
    href: string;
}[] = [
    {
        icon: BookOpen,
        title: "Documentation",
        body: {
            ko: "XGEN 사용자 매뉴얼 — 플랫폼·라이브러리 가이드와 레퍼런스",
            en: "The XGEN user manual — platform and library guides, plus reference",
        },
        href: "/documentation",
    },
    {
        icon: FileText,
        title: "Release Notes",
        body: {
            ko: "XGEN 플랫폼의 새 기능, 개선사항, 버그 수정 이력",
            en: "New features, improvements, and fixes across the XGEN platform",
        },
        href: "/releases",
    },
];

const COPY: Record<Locale, { title: React.ReactNode; lead: string; more: string }> = {
    ko: {
        title: (
            <>
                Plateer Labs가 제공하는{" "}
                <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                    기술 자산
                </span>
            </>
        ),
        lead: "Enterprise AI를 위한 기술 문서와 릴리즈 노트를 한곳에서 확인하세요",
        more: "바로가기",
    },
    en: {
        title: (
            <>
                <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                    Technical resources
                </span>{" "}
                from Plateer Labs
            </>
        ),
        lead: "Documentation and release notes for Enterprise AI, all in one place",
        more: "Open",
    },
};

export function HomeResources({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    / Resources
                </p>
                <h2 className="mt-3 max-w-3xl mx-auto text-center text-4xl font-semibold tracking-tight md:text-5xl">
                    {t.title}
                </h2>
                <p className="mt-5 mx-auto max-w-2xl text-[17px] text-center leading-relaxed text-[var(--color-ink-muted)]">
                    {t.lead}
                </p>

                <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {/* 기술 자산 — 아이콘 카드 */}
                    {ASSETS.map((it) => (
                        <Link
                            key={it.title}
                            href={localeHref(locale, it.href)}
                            className="group flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-[var(--color-ink)]"
                        >
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <it.icon className="h-5 w-5" />
                            </span>
                            <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {it.title}
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {it.body[locale]}
                            </p>
                            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-medium text-[var(--color-ink)] transition group-hover:gap-2">
                                {t.more}
                                <ArrowRight className="h-3 w-3" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
