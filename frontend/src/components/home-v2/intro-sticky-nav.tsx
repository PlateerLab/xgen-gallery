"use client";

import { useEffect, useState } from "react";
import { LocaleLink } from "@/components/locale-link";
import { cn } from "@/lib/cn";

/**
 * 인트로 페이지 섹션 내비 — Microsoft Teams 제품 페이지의 sticky-nav 패턴.
 * GNB 바로 아래(--nav-h)에 붙어 따라오고, 지금 보이는 섹션을 밑줄로 표시한다.
 * 오른쪽 끝에 주요 CTA 하나를 둔다.
 */
export function IntroStickyNav({
    items,
    cta,
}: {
    items: { id: string; label: string }[];
    cta: { label: string; href: string };
}) {
    const [active, setActive] = useState(items[0]?.id);

    useEffect(() => {
        const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
        if (!els.length) return;
        const onScroll = () => {
            const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 80;
            const line = navH + 72;
            let cur = els[0].id;
            for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id;
            setActive(cur);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [items]);

    return (
        <nav
            aria-label="Page sections"
            data-nav-theme="light"
            className="sticky top-[var(--nav-h,80px)] z-40 border-b border-[var(--color-line)] bg-white/95 backdrop-blur"
        >
            <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center gap-4 px-5 sm:px-8">
                <ul className="-mb-px flex min-w-0 flex-1 gap-6 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {items.map((i) => (
                        <li key={i.id}>
                            <a
                                href={`#${i.id}`}
                                aria-current={active === i.id ? "true" : undefined}
                                className={cn(
                                    "inline-flex h-14 items-center border-b-2 text-[14px] transition",
                                    active === i.id
                                        ? "border-[var(--color-ink)] font-semibold text-[var(--color-ink)]"
                                        : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                                )}
                            >
                                {i.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <LocaleLink
                    href={cta.href}
                    className="hidden h-9 flex-none items-center rounded-[4px] bg-[#185aea] px-4 text-[13.5px] font-semibold text-white transition hover:bg-[#1249c2] sm:inline-flex"
                >
                    {cta.label}
                </LocaleLink>
            </div>
        </nav>
    );
}
