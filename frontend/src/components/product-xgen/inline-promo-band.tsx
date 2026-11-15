"use client";

/* 본문 안 체험 띠배너 — /product/xgen 에서 「XGEN은 다릅니다」 밴드 바로 아래에 둔다(2026-11).
   GNB 아래 띠배너와 같은 패턴·문구를 쓰고, 위가 다크 밴드라 밝은 톤으로 대비를 준다. */
import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-path";

export function InlinePromoBand({ locale }: { locale: Locale }) {
    const t = dict[locale].nav;
    const [open, setOpen] = useState(true);
    if (!open) return null;
    return (
        <div
            data-nav-theme="light"
            className="relative overflow-hidden bg-[linear-gradient(90deg,#d9e8ff_0%,#eef5ff_28%,#f7faff_55%,#eef5ff_78%,#d3e4ff_100%)] px-12 py-[10px] text-[14px] leading-5 text-[var(--color-ink)]"
        >
            <svg aria-hidden className="pointer-events-none absolute left-0 top-0 hidden h-10 w-[120px] opacity-70 lg:block" viewBox="0 0 120 40">
                <defs>
                    <linearGradient id="ipb-arc-l" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#185aea" />
                        <stop offset="1" stopColor="#00acee" />
                    </linearGradient>
                </defs>
                <g fill="none">
                    <circle cx="10" cy="-30" r="80" stroke="url(#ipb-arc-l)" strokeWidth="5" />
                    <circle cx="10" cy="-30" r="90" stroke="#00acee" strokeWidth="1.25" opacity="0.8" />
                </g>
            </svg>
            <svg aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-10 w-[260px] opacity-70 lg:block" viewBox="0 0 260 40">
                <defs>
                    <linearGradient id="ipb-arc-r" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#185aea" />
                        <stop offset="0.6" stopColor="#00acee" />
                        <stop offset="1" stopColor="#7cdcff" />
                    </linearGradient>
                </defs>
                <g fill="none">
                    <line x1="150" y1="0" x2="150" y2="40" stroke="#00acee" strokeWidth="1.5" opacity="0.55" />
                    <line x1="158" y1="0" x2="158" y2="40" stroke="#5fd0ff" strokeWidth="2" opacity="0.9" />
                    <circle cx="300" cy="130" r="114" stroke="url(#ipb-arc-r)" strokeWidth="6" />
                    <circle cx="300" cy="130" r="127" stroke="url(#ipb-arc-r)" strokeWidth="6" opacity="0.85" />
                    <circle cx="300" cy="130" r="140" stroke="#00acee" strokeWidth="1.25" opacity="0.8" />
                </g>
            </svg>
            <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
                <span>
                    <span className="font-semibold">{t.promoBadge}</span>
                    <span aria-hidden className="mx-2 text-[var(--color-ink)]/40">·</span>
                    {t.promo}
                </span>
                <a
                    href={localeHref(locale, "/xgen-trial")}
                    className="group inline-flex flex-none items-center gap-0.5 font-semibold text-[#185aea] underline-offset-4 hover:underline"
                >
                    {t.promoCta}
                    <ChevronRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
            </div>
            <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.promoClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[4px] p-1 text-[var(--color-ink)]/60 transition hover:bg-black/5 hover:text-[var(--color-ink)]"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
