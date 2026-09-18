import { ArrowRight, Home, SearchX } from "lucide-react";
import { LocaleLink as Link } from "@/components/locale-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import type { Locale } from "@/lib/i18n";

const COPY = {
    ko: {
        eyebrow: "PAGE NOT FOUND",
        title: "요청하신 페이지를 찾지 못했습니다.",
        description:
            "주소가 바뀌었거나 더 이상 제공하지 않는 페이지일 수 있습니다. 아래에서 필요한 내용을 다시 찾아보세요.",
        primary: "홈으로 돌아가기",
        linksTitle: "이 페이지를 찾으셨나요?",
        links: [
            { href: "/blog", label: "AI Labs 인사이트", note: "연구·제품·현장의 최신 글" },
            { href: "/product", label: "XGEN 제품 소개", note: "기능과 도입 방식 살펴보기" },
            { href: "/contact", label: "문의하기", note: "찾는 자료를 직접 요청하기" },
        ],
    },
    en: {
        eyebrow: "PAGE NOT FOUND",
        title: "We couldn't find that page.",
        description:
            "The address may have changed, or the page may no longer be available. Try one of the destinations below.",
        primary: "Back to home",
        linksTitle: "Were you looking for one of these?",
        links: [
            { href: "/blog", label: "AI Labs insights", note: "Latest research, product, and field notes" },
            { href: "/product", label: "Explore XGEN", note: "Capabilities and adoption paths" },
            { href: "/contact", label: "Contact us", note: "Ask us to help locate a resource" },
        ],
    },
} as const;

export function NotFoundPage({ locale }: { locale: Locale }) {
    const t = COPY[locale];

    return (
        <>
            <SiteNav />
            <main className="bg-white px-5 pb-24 pt-16 sm:px-8 sm:pt-20 lg:pb-32 lg:pt-28">
                <div className="mx-auto max-w-[960px]">
                    <div className="grid items-start gap-10 lg:grid-cols-[260px_1fr] lg:gap-20">
                        <div aria-hidden="true" className="select-none">
                            <p className="font-mono text-[112px] font-bold leading-[0.85] tracking-[-0.08em] text-[var(--color-line)] sm:text-[148px] lg:text-[176px]">
                                404
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold tracking-[0.16em] text-[var(--color-ink-subtle)]">
                                <SearchX className="h-4 w-4" aria-hidden="true" />
                                {t.eyebrow}
                            </div>
                            <h1 className="mt-5 break-keep text-[30px] font-bold leading-tight tracking-[-0.025em] text-[var(--color-ink)] sm:text-[38px]">
                                {t.title}
                            </h1>
                            <p className="mt-5 max-w-[620px] break-keep text-[15px] leading-7 text-[var(--color-ink-muted)] sm:text-[16px]">
                                {t.description}
                            </p>
                            <Link
                                href="/"
                                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 bg-[var(--color-ink)] px-5 text-[14px] font-semibold text-white transition hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                            >
                                <Home className="h-4 w-4" aria-hidden="true" />
                                {t.primary}
                            </Link>
                        </div>
                    </div>

                    <section className="mt-16 border-t border-[var(--color-line)] pt-8 lg:ml-[340px] lg:mt-20">
                        <h2 className="text-[15px] font-semibold text-[var(--color-ink)]">
                            {t.linksTitle}
                        </h2>
                        <div className="mt-4 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                            {t.links.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex min-h-[72px] items-center gap-4 py-4 text-left transition hover:bg-[var(--color-surface-hover)] sm:px-3"
                                >
                                    <span className="min-w-0 flex-1">
                                        <strong className="block text-[14px] font-semibold text-[var(--color-ink)]">
                                            {item.label}
                                        </strong>
                                        <span className="mt-1 block text-[12.5px] leading-5 text-[var(--color-ink-subtle)]">
                                            {item.note}
                                        </span>
                                    </span>
                                    <ArrowRight
                                        className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-1 group-hover:text-[var(--color-ink)]"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
