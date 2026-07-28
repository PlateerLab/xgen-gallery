"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X, Users } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { SiteSearch } from "@/components/site-search";
import { useI18n } from "@/components/i18n-provider";
import { NAV_GROUPS, DEMO_CTA, sectionHref, type NavLeaf } from "@/lib/nav";
import { cn } from "@/lib/cn";

/**
 * Split dropdown items into columns for a `wide` layout. If any item sets
 * `colBreak`, columns break explicitly at those items; otherwise items are
 * distributed evenly across `cols` columns.
 */
function buildColumns(items: NavLeaf[], cols: number): NavLeaf[][] {
    if (items.some((it) => it.colBreak)) {
        const out: NavLeaf[][] = [];
        items.forEach((it, idx) => {
            if (idx === 0 || it.colBreak) out.push([it]);
            else out[out.length - 1].push(it);
        });
        return out;
    }
    const per = Math.ceil(items.length / cols);
    return Array.from({ length: cols }, (_, c) =>
        items.slice(c * per, (c + 1) * per),
    );
}

/** One entry (and its nested children) inside a GNB dropdown. */
/** Resolve a nav item's display label — Korean override when locale is `ko`. */
function navLabel(item: NavLeaf, locale: string): string {
    return locale === "ko" && item.labelKo ? item.labelKo : item.label;
}

function DropdownItem({
    item,
    groupKey,
    onClose,
}: {
    item: NavLeaf;
    groupKey: string;
    onClose: () => void;
}) {
    const { locale } = useI18n();
    const parentCls =
        "block rounded-lg px-3 py-2 text-[16px] font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-hover)]";
    const childCls =
        "block rounded-lg px-3 py-1.5 text-[15px] font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]";
    // hidden 자식은 드롭다운에서 제외(데이터는 유지, 나중에 hidden 해제 시 노출).
    const children = item.children?.filter((c) => !c.hidden) ?? [];
    return (
        <div>
            {item.external ? (
                <a
                    href={item.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={cn(parentCls, "flex items-center gap-1")}
                >
                    {navLabel(item, locale)}
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-ink-subtle)]" />
                </a>
            ) : (
                <Link
                    href={item.route ?? sectionHref(groupKey, item.id)}
                    onClick={onClose}
                    className={parentCls}
                >
                    {navLabel(item, locale)}
                </Link>
            )}
            {item.note &&
                (item.route ? (
                    <Link
                        href={item.route}
                        onClick={onClose}
                        className="block px-3 py-1.5 text-[15px] font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
                    >
                        {item.note}
                    </Link>
                ) : (
                    <p className="px-3 py-1.5 text-[15px] font-medium text-[var(--color-ink-muted)]">
                        {item.note}
                    </p>
                ))}
            {children.length > 0 && (
                <div className="mb-1 ml-3 border-l border-[var(--color-line)] pl-2">
                    {children.map((c) =>
                        c.external ? (
                            <a
                                key={c.id}
                                href={c.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className={cn(childCls, "flex items-center gap-1")}
                            >
                                {navLabel(c, locale)}
                                <ArrowUpRight className="h-3 w-3 text-[var(--color-ink-subtle)]" />
                            </a>
                        ) : (
                            <Link
                                key={c.id}
                                href={c.route ?? sectionHref(groupKey, c.id)}
                                onClick={onClose}
                                className={childCls}
                            >
                                {navLabel(c, locale)}
                            </Link>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Global nav. Top-level groups (Research, Technology, …) each open a dropdown of
 * their sections, which deep-link to the group's one-page (/{group}#{section}).
 *
 * With `overlay`, the bar floats transparent over a dark hero, then turns solid
 * white on scroll. Without it, it's the regular sticky white bar.
 */
export function SiteNav({ overlay = false }: { overlay?: boolean }) {
    const { locale, t } = useI18n();
    const [scrolled, setScrolled] = useState(false);
    const [openKey, setOpenKey] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileGroup, setMobileGroup] = useState<string | null>(null);

    // 드롭다운 닫힘을 살짝 지연한다. 트리거 → 하위 항목으로 마우스를 옮기는 도중
    // 경로가 잠깐 헤더를 벗어나도 즉시 닫히지 않아, 첫 클릭이 빈 공간에 떨어지는
    // 문제(두 번 클릭해야 하는 현상)를 막는다. 다시 들어오면 예약된 닫힘을 취소한다.
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const openMenu = (key: string) => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setOpenKey(key);
    };
    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpenKey(null), 160);
    };
    const closeNow = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setOpenKey(null);
    };
    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
        };
    }, []);

    useEffect(() => {
        if (!overlay) return;
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [overlay]);

    // 상단 프로모션 배너(15일 무료 체험) — dismiss 시 sessionStorage에 기억.
    // 세션 한정: 같은 탭 새로고침엔 유지되지만, 탭/브라우저를 완전히 닫았다 다시 열면 재노출.
    // SSR/hydration 불일치를 피하려 초기엔 노출하고, 마운트 후 해제 상태면 숨긴다.
    const [bannerOpen, setBannerOpen] = useState(true);
    useEffect(() => {
        try {
            if (sessionStorage.getItem("xgen-trial-banner") === "dismissed")
                setBannerOpen(false);
        } catch {}
    }, []);
    const dismissBanner = () => {
        setBannerOpen(false);
        try {
            sessionStorage.setItem("xgen-trial-banner", "dismissed");
        } catch {}
    };

    // light = transparent nav over the dark hero (top of an overlay page).
    // The bar turns solid white only on scroll — not when a dropdown opens.
    const light = overlay && !scrolled;

    const headerCls = overlay
        ? cn(
              "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
              scrolled
                  ? "border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md"
                  : "border-b border-transparent bg-transparent",
          )
        : "sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md";

    const groupCls = cn(
        "inline-flex items-center gap-1 transition",
        light
            ? "text-white/80 hover:text-white"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
    );

    const demoLabel = locale === "en" ? DEMO_CTA.en : DEMO_CTA.ko;

    return (
        <header className={headerCls} onMouseLeave={scheduleClose}>
            {/* 상단 프로모션 배너 — XGEN 15일 무료 체험 (업스테이지 상단 배너 컨셉) */}
            {bannerOpen && (
                <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-[linear-gradient(90deg,#00acee_0%,#185aea_100%)] px-12 py-3 text-center text-[14px] leading-snug text-white">
                    <span className="font-semibold">
                        XGEN 15일 무료 체험 — 설치 없이 브라우저에서 바로 시작하세요
                    </span>
                    <Link
                        href="/xgen-trial"
                        className="inline-flex flex-none items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
                    >
                        체험 신청
                        <span aria-hidden>→</span>
                    </Link>
                    <button
                        type="button"
                        onClick={dismissBanner}
                        aria-label="배너 닫기"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}
            <div className="flex h-[84px] w-full items-center px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 leading-none min-[1600px]:ml-[calc((100vw-80rem)/2)]"
                >
                    <BrandMark
                        className={cn(
                            "h-[21px] w-auto transition",
                            light && "brightness-0 invert",
                        )}
                    />
                    <span
                        className="text-[26px] font-extrabold leading-none tracking-tight text-[#00adee] transition-colors"
                    >
                        LABS
                    </span>
                </Link>

                {/* desktop groups */}
                <nav className="hidden items-center gap-6 2xl:gap-9 whitespace-nowrap text-[16px] font-medium xl:ml-24 xl:flex 2xl:ml-28">
                    {NAV_GROUPS.filter((g) => !g.hidden).map((g) => {
                        const menuItems = g.items.filter((it) => !it.hidden);
                        const hasMenu = !g.flat && menuItems.length > 0;
                        return (
                        <div
                            key={g.key}
                            className="relative"
                            onMouseEnter={() => openMenu(g.key)}
                        >
                            {g.external ? (
                                <a
                                    href={g.external}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#5ec8f5] transition hover:text-[#8ddbf8]"
                                >
                                    {g.label}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            ) : (
                                <Link
                                    href={g.route ?? `/${g.key}`}
                                    className={groupCls}
                                    onClick={closeNow}
                                >
                                    {g.label}
                                    {hasMenu && (
                                        <ChevronDown
                                            className={cn(
                                                "h-3.5 w-3.5 transition",
                                                openKey === g.key &&
                                                    "rotate-180",
                                            )}
                                        />
                                    )}
                                </Link>
                            )}

                            {hasMenu && openKey === g.key && (
                                <div
                                    className={cn(
                                        // 업스테이지 벤치마크 — 와이드 메뉴 포함 모든 드롭다운을
                                        // 트리거 좌측 끝에 앵커해 바로 아래로 펼친다.
                                        "absolute left-0 top-full pt-3",
                                    )}
                                >
                                    {g.wide ? (
                                        <div className="flex gap-8 rounded-xl border border-[var(--color-line)] bg-white p-4 shadow-xl">
                                            {buildColumns(
                                                menuItems,
                                                g.cols ?? 3,
                                            ).map((slice, col) =>
                                                slice.length === 0 ? null : (
                                                    <div
                                                        key={col}
                                                        className="min-w-[180px]"
                                                    >
                                                        {slice.map((it) => (
                                                            <DropdownItem
                                                                key={it.id}
                                                                item={it}
                                                                groupKey={g.key}
                                                                onClose={closeNow}
                                                            />
                                                        ))}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <div className="min-w-[230px] rounded-xl border border-[var(--color-line)] bg-white p-2 shadow-xl">
                                            {menuItems.map((it) => (
                                                <DropdownItem
                                                    key={it.id}
                                                    item={it}
                                                    groupKey={g.key}
                                                    onClose={closeNow}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        );
                    })}
                </nav>

                <div className="ml-auto flex items-center justify-end gap-3">
                    <div className="hidden w-[150px] sm:block sm:w-[180px] lg:w-[210px]">
                        <SiteSearch light={light} />
                    </div>
                    {/* members 아이콘 + 언어 전환 유지(github 아이콘 제거 — 요청). desktop only */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="/members"
                            aria-label="Members"
                            className={cn(
                                "inline-flex transition",
                                light
                                    ? "text-white/80 hover:text-white"
                                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
                            )}
                        >
                            <Users className="h-5 w-5" />
                        </Link>
                        <LanguageToggle light={light} />
                    </div>

                    {/* primary CTA — 임시 숨김 (요청: 검색바 확장). false && 로 비활성화. */}
                    {false && (
                        <>
                            <span
                                className={cn(
                                    "hidden h-5 w-px lg:block",
                                    light ? "bg-white/20" : "bg-[var(--color-line)]",
                                )}
                                aria-hidden
                            />
                            <Link
                                href={DEMO_CTA.href}
                                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-5 py-2.5 text-[16px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(47,123,255,0.6)] transition hover:brightness-110"
                            >
                                {demoLabel}
                            </Link>
                        </>
                    )}

                    {/* mobile hamburger */}
                    <button
                        type="button"
                        aria-label="Menu"
                        onClick={() => setMobileOpen((v) => !v)}
                        className={cn(
                            "inline-flex xl:hidden",
                            light
                                ? "text-white"
                                : "text-[var(--color-ink)]",
                        )}
                    >
                        {mobileOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* mobile drawer — full-width accordion rows */}
            {mobileOpen && (
                <div className="border-t border-[var(--color-line)] bg-white xl:hidden">
                    <div className="mx-auto max-h-[80vh] max-w-7xl divide-y divide-[var(--color-line)] overflow-y-auto px-6">
                        {NAV_GROUPS.filter((g) => !g.hidden).map((g) => {
                            const items = g.items.filter((it) => !it.hidden);
                            const hasMenu = !g.flat && items.length > 0;
                            const open = mobileGroup === g.key;
                            const close = () => {
                                setMobileOpen(false);
                                setMobileGroup(null);
                            };
                            return (
                                <div key={g.key}>
                                    {g.external ? (
                                        <a
                                            href={g.external}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={close}
                                            className="flex w-full items-center justify-between py-5 text-lg font-bold text-[var(--color-ink)]"
                                        >
                                            {g.label}
                                            <ArrowUpRight className="h-5 w-5 text-[var(--color-ink-subtle)]" />
                                        </a>
                                    ) : hasMenu ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMobileGroup(
                                                    open ? null : g.key,
                                                )
                                            }
                                            aria-expanded={open}
                                            className="flex w-full items-center justify-between py-5 text-left text-lg font-bold text-[var(--color-ink)]"
                                        >
                                            {g.label}
                                            <ChevronDown
                                                className={cn(
                                                    "h-5 w-5 text-[var(--color-ink-subtle)] transition",
                                                    open && "rotate-180",
                                                )}
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={g.route ?? `/${g.key}`}
                                            onClick={close}
                                            className="flex w-full items-center justify-between py-5 text-lg font-bold text-[var(--color-ink)]"
                                        >
                                            {g.label}
                                        </Link>
                                    )}

                                    {hasMenu && (open || g.external) && (
                                        <div className="pb-3">
                                            {items.map((it) => (
                                                <div key={it.id}>
                                                    {it.external ? (
                                                        <a
                                                            href={it.external}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={close}
                                                            className="flex items-center gap-1 py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                                        >
                                                            {navLabel(it, locale)}
                                                            <ArrowUpRight className="h-4 w-4 text-[var(--color-ink-subtle)]" />
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            href={
                                                                it.route ??
                                                                sectionHref(
                                                                    g.key,
                                                                    it.id,
                                                                )
                                                            }
                                                            onClick={close}
                                                            className="block py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                                        >
                                                            {navLabel(it, locale)}
                                                        </Link>
                                                    )}
                                                    {it.note &&
                                                        (it.route ? (
                                                            <Link
                                                                href={it.route}
                                                                onClick={close}
                                                                className="block py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                                            >
                                                                {it.note}
                                                            </Link>
                                                        ) : (
                                                            <p className="py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)]">
                                                                {it.note}
                                                            </p>
                                                        ))}
                                                    {it.children?.some((c) => !c.hidden) && (
                                                        <div className="ml-3 border-l border-[var(--color-line)] pl-3">
                                                            {it.children.filter((c) => !c.hidden).map(
                                                                (c) =>
                                                                    c.external ? (
                                                                        <a
                                                                            key={c.id}
                                                                            href={c.external}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            onClick={close}
                                                                            className="flex items-center gap-1 py-1.5 text-[15px] text-[var(--color-ink-subtle)] transition hover:text-[var(--color-ink)]"
                                                                        >
                                                                            {navLabel(c, locale)}
                                                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                                                        </a>
                                                                    ) : (
                                                                        <Link
                                                                            key={c.id}
                                                                            href={
                                                                                c.route ??
                                                                                sectionHref(
                                                                                    g.key,
                                                                                    c.id,
                                                                                )
                                                                            }
                                                                            onClick={
                                                                                close
                                                                            }
                                                                            className="block py-1.5 text-[15px] text-[var(--color-ink-subtle)] transition hover:text-[var(--color-ink)]"
                                                                        >
                                                                            {navLabel(c, locale)}
                                                                        </Link>
                                                                    ),
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
}
