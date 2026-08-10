"use client";

// 내부 링크는 현재 로케일(/en 여부)에 맞춰 자동으로 다시 쓰인다 — locale-link 참고.
import { LocaleLink as Link } from "@/components/locale-link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
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

/** 드롭다운 설명줄(note)도 라벨과 같은 규칙으로 로케일 오버라이드를 적용한다. */
function navNote(item: NavLeaf, locale: string): string | undefined {
    return locale === "ko" && item.noteKo ? item.noteKo : item.note;
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
            {navNote(item, locale) &&
                (item.route ? (
                    <Link
                        href={item.route}
                        onClick={onClose}
                        className="block px-3 py-1.5 text-[15px] font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
                    >
                        {navNote(item, locale)}
                    </Link>
                ) : (
                    <p className="px-3 py-1.5 text-[15px] font-medium text-[var(--color-ink-muted)]">
                        {navNote(item, locale)}
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
export function SiteNav({
    overlay = false,
    offsetTop = 0,
}: {
    overlay?: boolean;
    /**
     * 헤더를 상단에서 이만큼(px) 내려 붙인다. 헤더 위에 또 다른 고정 띠를 두는
     * 페이지용 — 지금은 승인 대기 검토본의 대외비 밴드(PREVIEW_BAND_H)가 유일하다.
     * 0이면 기존과 완전히 동일하게 top-0 에 붙는다.
     */
    offsetTop?: number;
}) {
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

    /**
     * 헤더 실제 높이를 `--nav-h`로 노출한다. 프로모 배너 노출/해제와 좁은 화면에서의
     * 배너 줄바꿈 때문에 헤더 높이가 84px로 고정되지 않는다 — 스티키 섹션 인덱스와
     * 앵커 점프 오프셋(scroll-mt)이 이 값을 기준으로 GNB 바로 아래에 붙는다.
     */
    const headerRef = useRef<HTMLElement>(null);
    const navRowRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const header = headerRef.current;
        const row = navRowRef.current;
        if (!header || !row) return;
        // 헤더 전체 높이가 아니라 "배너 + 메뉴줄"의 아래 끝을 쓴다 — 모바일 드로어가
        // 열리면 헤더가 최대 80vh까지 커지는데, 거기에 인덱스를 붙이면 안 된다.
        const sync = () =>
            document.documentElement.style.setProperty(
                "--nav-h",
                `${Math.round(row.getBoundingClientRect().bottom)}px`,
            );
        sync();
        // 배너 해제·좁은 화면에서의 배너 줄바꿈으로 높이가 바뀌면 다시 계산.
        const ro = new ResizeObserver(sync);
        ro.observe(header);
        return () => ro.disconnect();
    }, []);

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
        <header
            ref={headerRef}
            className={headerCls}
            style={offsetTop ? { top: offsetTop } : undefined}
            onMouseLeave={scheduleClose}
        >
            {/* 상단 프로모션 배너 — XGEN 15일 무료 체험 (업스테이지 상단 배너 컨셉) */}
            {bannerOpen && (
                <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-[linear-gradient(90deg,#00acee_0%,#185aea_100%)] px-12 py-3 text-center text-[14px] leading-snug text-white">
                    <span className="font-semibold">{t.nav.promo}</span>
                    <Link
                        href="/xgen-trial"
                        className="inline-flex flex-none items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
                    >
                        {t.nav.promoCta}
                        <span aria-hidden>→</span>
                    </Link>
                    <button
                        type="button"
                        onClick={dismissBanner}
                        aria-label={t.nav.promoClose}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}
            <div
                ref={navRowRef}
                className="flex h-[84px] w-full items-center px-6"
            >
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
                    {/* XGEN 제품 사이트 아웃링크 — 검색바 왼쪽. 우리 소유 도메인이라
                        referrer를 남겨(rel에 noreferrer 미포함) 유입이 GA4에서
                        Direct가 아니라 labs 레퍼럴로 잡히게 한다. */}
                    <a
                        href="https://www.xgen.im/"
                        target="_blank"
                        rel="noopener"
                        className={cn(
                            "hidden items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition lg:inline-flex",
                            light
                                ? "border-white/25 text-white/90 hover:border-white/60 hover:text-white"
                                : "border-[var(--color-line-strong)] text-[var(--color-ink-muted)] hover:border-[#2f7bff] hover:text-[#2461d8]",
                        )}
                    >
                        {t.nav.productSite}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <div className="hidden w-[150px] sm:block sm:w-[180px] lg:w-[210px]">
                        <SiteSearch light={light} />
                    </div>
                    {/* members 아이콘은 검색바 뒤에서 제거 — 푸터 About으로 이동(요청).
                        언어 전환(KO/EN)은 경로 기반이다(`/product` ⇆ `/en/product`) —
                        lib/locale-path.ts 참고. desktop only. */}
                    <LanguageToggle light={light} className="hidden lg:inline-flex" />

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
                                                    {navNote(it, locale) &&
                                                        (it.route ? (
                                                            <Link
                                                                href={it.route}
                                                                onClick={close}
                                                                className="block py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                                            >
                                                                {navNote(it, locale)}
                                                            </Link>
                                                        ) : (
                                                            <p className="py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)]">
                                                                {navNote(it, locale)}
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
