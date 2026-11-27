"use client";

// 내부 링크는 현재 로케일(/en 여부)에 맞춰 자동으로 다시 쓰인다 — locale-link 참고.
import { LocaleLink as Link } from "@/components/locale-link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/components/i18n-provider";
import { NAV_GROUPS, DEMO_CTA, sectionHref, type NavFeature, type NavGroup, type NavLeaf } from "@/lib/nav";

/** 최상위 메뉴 라벨 — 국문 화면에서는 labelKo를 쓴다. */
function groupLabel(g: NavGroup, locale: string): string {
    return locale === "ko" && g.labelKo ? g.labelKo : g.label;
}
import { cn } from "@/lib/cn";

/**
 * 현재 보고 있는 제품 — Microsoft 사이트의 「Microsoft | Teams」처럼, 제품 페이지에 있을 때
 * GNB의 「제품」 메뉴 앞에 그 제품명을 띄운다. 경로는 /en 접두를 떼고 비교한다.
 */
const PRODUCT_CONTEXTS: { name: string; href: string; paths: string[] }[] = [
    {
        name: "XGEN",
        href: "/product/xgen",
        paths: ["/product/xgen", "/products/xgen", "/vibe-coding", "/xgen-dex", "/easy-mode", "/floui", "/security-and-governance"],
    },
    { name: "Polar", href: "/product/polar", paths: ["/product/polar"] },
    { name: "Ontlas", href: "/product/ontlas", paths: ["/product/ontlas", "/tool/ontlas"] },
];
function productContext(pathname: string | null) {
    if (!pathname) return null;
    const p = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    return PRODUCT_CONTEXTS.find((c) => c.paths.some((x) => p === x || p.startsWith(x + "/"))) ?? null;
}

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

/** 열 제목의 괄호 설명은 아래 줄에 작게 — 「XGEN (기업형 …)」이 열 폭을 넓히지 않게. */
function ParentLabel({ text, dark = false }: { text: string; dark?: boolean }) {
    const m = text.match(/^(.*?)\s*\((.+)\)\s*$/);
    if (!m) return <>{text}</>;
    return (
        <span className="block">
            <span className="block">{m[1]}</span>
            <span className={cn("block text-[12px] font-normal leading-4", dark ? "text-white/45" : "text-[#a4a4b8]")}>{m[2]}</span>
        </span>
    );
}

function DropdownItem({
    item,
    groupKey,
    onClose,
    dark = false,
}: {
    item: NavLeaf;
    groupKey: string;
    onClose: () => void;
    /** 헤더 뒤 배경이 어두울 때 — 패널을 딥네이비 톤으로 그린다. */
    dark?: boolean;
}) {
    const { locale } = useI18n();
    // 마키나락스 GNB 패턴 — 열 제목은 회색 그룹명, 하위는 둥근 hover 배경의 링크.
    const parentCls = dark
        ? "mb-1 block whitespace-nowrap px-4 py-1 text-[14px] font-medium text-white/50 transition-colors hover:text-white focus-visible:text-white"
        : "mb-1 block whitespace-nowrap px-4 py-1 text-[14px] font-medium text-[#8d8da5] transition-colors hover:text-[var(--color-ink)] focus-visible:text-[var(--color-ink)]";
    const childCls = dark
        ? "block rounded-[12px] px-4 py-1 text-[15px] font-normal leading-5 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10"
        : "block rounded-[12px] px-4 py-1 text-[15px] font-normal leading-5 text-[var(--color-ink)] transition-colors hover:bg-[#f0f0f4] focus-visible:bg-[#f0f0f4]";
    const noteCls = dark ? "text-white/50" : "text-[#8d8da5]";
    const noteHover = dark ? "hover:bg-white/10" : "hover:bg-[#f0f0f4]";
    const arrowCls = dark ? "text-white/50" : "text-[var(--color-ink-subtle)]";
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
                    <ParentLabel text={navLabel(item, locale)} dark={dark} />
                    <ArrowUpRight className={cn("h-3.5 w-3.5 shrink-0 self-start mt-1", arrowCls)} />
                </a>
            ) : item.disabled ? (
                <div className={cn(parentCls, "cursor-default pointer-events-none")} aria-disabled="true">
                    <ParentLabel text={navLabel(item, locale)} dark={dark} />
                </div>
            ) : (
                <Link
                    href={item.route ?? sectionHref(groupKey, item.id)}
                    onClick={onClose}
                    className={parentCls}
                >
                    <ParentLabel text={navLabel(item, locale)} dark={dark} />
                </Link>
            )}
            {navNote(item, locale) &&
                (item.route && !item.disabled ? (
                    <Link
                        href={item.route}
                        onClick={onClose}
                        className={cn("block rounded-[12px] px-4 pb-2 text-[13px] font-normal transition-colors", noteCls, noteHover)}
                    >
                        {navNote(item, locale)}
                    </Link>
                ) : (
                    <p className={cn("px-4 pb-2 text-[13px] font-normal", noteCls)}>
                        {navNote(item, locale)}
                    </p>
                ))}
            {children.length > 0 && (
                <div className="flex gap-6">
                    {buildColumns(children, 1).map((column, index) => (
                    <div key={index} className="mb-1">
                    {column.map((c) => {
                        // 손자 — 「핵심 기능 · 핵심 기술」 아래의 이지모드·패스파인더처럼
                        // 한 단 더 들어가는 항목. 한 단만 더 지원한다.
                        const grand = c.children?.filter((g) => !g.hidden) ?? [];
                        return (
                            <div key={c.id}>
                                {c.external ? (
                                    <a
                                        href={c.external}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={onClose}
                                        className={cn(childCls, "flex items-center gap-1")}
                                    >
                                        {navLabel(c, locale)}
                                        <ArrowUpRight className={cn("h-3 w-3", arrowCls)} />
                                    </a>
                                ) : (
                                    <Link
                                        href={c.route ?? sectionHref(groupKey, c.id)}
                                        onClick={onClose}
                                        className={childCls}
                                    >
                                        {navLabel(c, locale)}
                                    </Link>
                                )}
                                {grand.length > 0 && (
                                    /* 기능 순서를 위에서 아래로 명확하게 보여 준다. */
                                    <div className="mb-1 grid grid-cols-1 pl-3">
                                        {grand.map((g) => {
                                            /*
                                              「DexOn (Device Extension On)」 처럼 이름 뒤에 풀이가
                                              붙는 라벨은 한 칸에 다 못 들어가 옆 열을 침범했다.
                                              괄호를 떼어 아랫줄에 작게 두면 칸 안에서 끝난다.
                                            */
                                            const text = navLabel(g, locale);
                                            const paren = /^(.*?)\s*\((.+)\)$/.exec(text);
                                            return (
                                                <Link
                                                    key={g.id}
                                                    href={g.route ?? sectionHref(groupKey, g.id)}
                                                    onClick={onClose}
                                                    className={cn(
                                                        "block min-w-0 rounded-[12px] px-4 py-1 text-[14px] font-normal leading-snug transition-colors",
                                                        dark
                                                            ? "text-white/65 hover:bg-white/10 hover:text-white"
                                                            : "text-[#5a5a72] hover:bg-[#f0f0f4] hover:text-[var(--color-ink)]",
                                                    )}
                                                >
                                                    {paren ? (
                                                        <>
                                                            {paren[1]}
                                                            <span className={cn("block text-[10px] font-normal leading-tight", dark ? "text-white/45" : "text-[var(--color-ink-subtle)]/70")}>
                                                                ({paren[2]})
                                                            </span>
                                                        </>
                                                    ) : (
                                                        text
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * 드롭다운 왼쪽 대표 카드 — 제목 → / 회색 설명 / 둥근 이미지. hover 때 화살표가
 * 오른쪽으로 밀리고 이미지가 살짝 확대된다(마키나락스 GNB 패턴).
 */
function FeatureCard({ feature, onClose, dark = false }: { feature: NavFeature; onClose: () => void; dark?: boolean }) {
    const { locale } = useI18n();
    const ko = locale === "ko";
    return (
        <Link href={feature.href} onClick={onClose} className="group/feat block w-[208px] shrink-0 whitespace-normal break-keep pt-1">
            <p className={cn("flex items-center text-[16px] font-semibold", dark ? "text-white" : "text-[var(--color-ink)]")}>
                {ko && feature.titleKo ? feature.titleKo : feature.title}
                <span aria-hidden="true" className="ml-2 font-light transition-[margin] duration-300 group-hover/feat:ml-5 group-focus-visible/feat:ml-5">
                    →
                </span>
            </p>
            <p className={cn("mt-2 text-[14px] font-light leading-5", dark ? "text-white/60" : "text-[#8d8da5]")}>
                {ko && feature.textKo ? feature.textKo : feature.text}
            </p>
            <div className={cn("mt-4 aspect-[16/10] w-full overflow-hidden rounded-[12px]", dark ? "bg-white/5 ring-1 ring-white/10" : "bg-[#f0f0f4]")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={feature.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/feat:scale-110"
                />
            </div>
        </Link>
    );
}

/** "rgb(…)/rgba(…)" 하나를 [r,g,b,a]로. 못 읽으면 null. */
function parseRgb(s: string): [number, number, number, number] | null {
    // Tailwind v4는 투명도가 붙은 색을 oklab()/oklch()로 계산한다 — L(0~1)을 회색으로 환산.
    const ok = s.match(/okl(?:ab|ch)\(([^)]+)\)/);
    if (ok) {
        const p = ok[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
        if (p.length < 3 || Number.isNaN(p[0])) return null;
        const L = p[0] > 1 ? p[0] / 100 : p[0];
        const v = Math.round(Math.min(1, Math.max(0, L ** 3)) ** (1 / 2.2) * 255);
        return [v, v, v, p.length > 3 && !Number.isNaN(p[3]) ? p[3] : 1];
    }
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    if (p.length < 3 || p.slice(0, 3).some(Number.isNaN)) return null;
    return [p[0], p[1], p[2], p.length > 3 && !Number.isNaN(p[3]) ? p[3] : 1];
}

/** 상대 휘도(0~1). */
function luminance(r: number, g: number, b: number): number {
    const c = [r, g, b].map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/**
 * (x, y) 지점에서 헤더 뒤에 보이는 배경이 어두운지 밝은지 판정한다.
 * 위에서부터 차례로 보며 처음 결정되는 값을 쓴다:
 * `data-nav-theme` 지정 → 영상·이미지·캔버스(어두운 히어로로 간주) →
 * 불투명한 배경색 → 그라디언트 색 평균. 아무것도 없으면 밝은 배경.
 */
function themeAt(x: number, y: number, header: HTMLElement): "dark" | "light" {
    const hit = document.elementsFromPoint(x, y);
    // elementsFromPoint 는 pointer-events:none 레이어를 건너뛴다. 키 비주얼의 배경색·그라디언트를
    // 장식 레이어(absolute + pointer-events-none)에 깔아 둔 히어로가 많아, 맨 위 섹션 안의
    // 그런 레이어(2단계 깊이까지)를 먼저 본다. 뒤에 오는 형제가 위에 그려지므로 역순으로 본다.
    const top = hit.find((e) => !header.contains(e));
    const sec = top?.closest("section, [data-nav-theme]") ?? null;
    const layers: Element[] = [];
    if (sec) {
        sec.querySelectorAll(":scope > *, :scope > * > *").forEach((e) => {
            if (getComputedStyle(e).pointerEvents !== "none") return;
            const r = e.getBoundingClientRect();
            if (r.left <= x && r.right >= x && r.top <= y && r.bottom >= y) layers.push(e);
        });
        layers.reverse();
    }
    const els = [...layers, ...hit];
    for (const el of els) {
        if (header.contains(el)) continue;
        const forced = (el as HTMLElement).dataset?.navTheme;
        if (forced === "dark" || forced === "light") return forced;
        // 사진 배경 페이지(.photo-bg-page)는 ::after 베일로 위 450px을 어둡게 깐다(globals.css).
        // 가상 요소는 DOM 으로 읽히지 않아 클래스와 위치로 판정한다.
        if (el.classList?.contains("photo-bg-page")) {
            return y - el.getBoundingClientRect().top < 450 ? "dark" : "light";
        }
        const tag = el.tagName;
        if (tag === "VIDEO" || tag === "CANVAS") return "dark";
        if (tag === "IMG") {
            const img = el as HTMLImageElement;
            if (img.naturalWidth > 0 && img.getBoundingClientRect().width > 200) return "dark";
            continue;
        }
        const cs = getComputedStyle(el);
        if (Number(cs.opacity) < 0.3) continue;
        const bg = parseRgb(cs.backgroundColor);
        if (bg && bg[3] >= 0.5) return luminance(bg[0], bg[1], bg[2]) < 0.35 ? "dark" : "light";
        const bi = cs.backgroundImage;
        if (bi && bi !== "none") {
            const colors = bi.match(/(?:rgba?|okl(?:ab|ch))\([^)]+\)/g)?.map(parseRgb).filter(
                (c): c is [number, number, number, number] => !!c && c[3] >= 0.5,
            );
            if (colors && colors.length) {
                const avg =
                    colors.reduce((s, c) => s + luminance(c[0], c[1], c[2]), 0) / colors.length;
                return avg < 0.35 ? "dark" : "light";
            }
            if (bi.includes("url(")) return "dark";
        }
    }
    return "light";
}

/** 체험 배너 노출 여부 — 2026-11 GNB 아래 띠로 재노출. 끄려면 false. */
const PROMO_BANNER_ENABLED = true;

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
    showPromotion = true,
}: {
    overlay?: boolean;
    /** Allow dedicated landing pages to keep their own primary call to action. */
    showPromotion?: boolean;
    /**
     * 헤더를 상단에서 이만큼(px) 내려 붙인다. 헤더 위에 또 다른 고정 띠를 두는
     * 페이지용 — 지금은 승인 대기 검토본의 대외비 밴드(PREVIEW_BAND_H)가 유일하다.
     * 0이면 기존과 완전히 동일하게 top-0 에 붙는다.
     */
    offsetTop?: number;
}) {
    const { locale, t } = useI18n();
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/en/';
    const [openKey, setOpenKey] = useState<string | null>(null);
    // 드롭다운이 화면 밖으로 넘치면 좌우 여백 16px 안으로 밀어 넣는다(넓은 패널 대비).
    useEffect(() => {
        if (!openKey) return;
        const el = document.querySelector<HTMLElement>("[data-gnb-pop]");
        if (!el) return;
        el.style.transform = "";
        const r = el.getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        let dx = 0;
        if (r.right > vw - 16) dx = vw - 16 - r.right;
        if (r.left + dx < 16) dx = 16 - r.left;
        el.style.transform = `translateX(${Math.round(dx)}px)`;
    }, [openKey]);
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
    /* GNB 첫 항목(제품 페이지면 제품명, 아니면 「제품」)의 왼쪽 끝을 본문 콘텐츠 축
       (max-w-7xl = 1280px, px-6 = 24px)에 맞춘다. 로고와 겹치는 좁은 화면에서는 로고 끝 + 32px. */
    const logoRef = useRef<HTMLDivElement>(null);
    const deskNavRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const align = () => {
            const logo = logoRef.current;
            const nav = deskNavRef.current;
            if (!logo || !nav) return;
            const vw = document.documentElement.clientWidth;
            const contentLeft = Math.max(0, (vw - 1280) / 2) + 24;
            const logoRight = logo.getBoundingClientRect().right;
            nav.style.marginLeft = `${Math.max(32, Math.round(contentLeft - logoRight))}px`;
        };
        align();
        window.addEventListener("resize", align);
        const ro = new ResizeObserver(align);
        if (logoRef.current) ro.observe(logoRef.current);
        if (document.fonts?.ready) document.fonts.ready.then(align).catch(() => {});
        return () => {
            window.removeEventListener("resize", align);
            ro.disconnect();
        };
    }, []);
    const headerRef = useRef<HTMLElement>(null);
    const navRowRef = useRef<HTMLDivElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const header = headerRef.current;
        const row = navRowRef.current;
        if (!header || !row) return;
        // 헤더 전체 높이가 아니라 "배너 + 메뉴줄"의 아래 끝을 쓴다 — 모바일 드로어가
        // 열리면 헤더가 최대 80vh까지 커지는데, 거기에 인덱스를 붙이면 안 된다.
        const sync = () =>
            document.documentElement.style.setProperty(
                "--nav-h",
                // 배너가 메뉴줄 아래에 있으면 배너 아래 끝까지를 헤더 높이로 본다.
                `${Math.round(Math.max(row.getBoundingClientRect().bottom, bannerRef.current?.getBoundingClientRect().bottom ?? 0))}px`,
            );
        sync();
        // 배너 해제·좁은 화면에서의 배너 줄바꿈으로 높이가 바뀌면 다시 계산.
        const ro = new ResizeObserver(sync);
        ro.observe(header);
        return () => ro.disconnect();
    }, []);

    /**
     * 헤더 뒤 배경의 밝기를 실제로 읽어 로고·메뉴 색을 정한다(2026-11).
     * 배경이 어두우면 흰색 계열, 밝으면 다크 계열. 섹션에 `data-nav-theme="dark|light"`를
     * 달면 그 값이 자동 판정보다 우선한다. 초기값은 기존 규칙(overlay 상단 = 어두운 히어로).
     */
    const [bgDark, setBgDark] = useState(overlay);
    // 헤더 아래(키 비주얼) 배경이 어두운지 — 체험 배너를 반대 톤으로 그린다.
    const [belowDark, setBelowDark] = useState(overlay);
    useEffect(() => {
        let raf = 0;
        const detect = () => {
            raf = 0;
            const header = headerRef.current;
            const row = navRowRef.current;
            if (!header || !row) return;
            const r = row.getBoundingClientRect();
            const y = Math.max(1, Math.round(r.top + r.height / 2));
            const w = window.innerWidth;
            let dark = 0;
            let light = 0;
            for (const fx of [0.15, 0.5, 0.85]) {
                const v = themeAt(Math.round(w * fx), y, header);
                if (v === "dark") dark++;
                else light++;
            }
            setBgDark(dark > light);
            // 체험 배너 톤: 헤더 바로 아래(키 비주얼)가 어두우면 배너를 밝게, 밝으면 어둡게.
            const by = Math.min(window.innerHeight - 1, Math.round(header.getBoundingClientRect().bottom + 12));
            let bd = 0;
            let bl = 0;
            for (const fx of [0.15, 0.5, 0.85]) {
                const v = themeAt(Math.round(w * fx), by, header);
                if (v === "dark") bd++;
                else bl++;
            }
            setBelowDark(bd > bl);
        };
        const schedule = () => {
            if (!raf) raf = requestAnimationFrame(detect);
        };
        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        // 히어로 슬라이드·배경 교체처럼 스크롤 없이 바뀌는 경우를 위해 주기적으로 다시 읽는다.
        const iv = window.setInterval(schedule, 1200);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.clearInterval(iv);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    // light = 흰색 계열 로고·메뉴. 헤더 뒤 배경이 어두울 때.
    const light = bgDark;
    // 투명 헤더(overlay 상단)가 아니면 헤더 바 자체 배경도 뒤 배경 톤을 따른다.
    const solidCls = bgDark
        ? "border-b border-white/10 bg-[#0b1224]/85 backdrop-blur-md"
        : "border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md";

    const headerCls = overlay
        ? cn(
              "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
              scrolled ? solidCls : "border-b border-transparent bg-transparent",
          )
        : cn("sticky top-0 z-50 transition-colors duration-300", solidCls);

    // 호버 언더라인 — 글자 아래 2px 막대가 왼쪽부터 펼쳐진다. 드롭다운이 열린 메뉴는 계속 표시.
    const underlineCls =
        "relative after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none";
    const groupCls = cn(
        "inline-flex items-center gap-1 transition",
        underlineCls,
        light
            ? "text-white/80 hover:text-white"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
    );

    // 드롭다운 패널 — 헤더 뒤 배경이 어두우면 헤더 바와 같은 딥네이비 톤으로 이어지게(2026-11).
    const panelCls = light
        ? "border-x border-b border-white/10 bg-[#0b1224]/95 backdrop-blur-md shadow-[0_16px_32px_0_rgba(0,0,0,0.35)]"
        : "bg-white shadow-[0_10px_20px_0_rgba(0,0,0,0.08)]";

    const demoLabel = locale === "en" ? DEMO_CTA.en : DEMO_CTA.ko;
    const currentProduct = productContext(pathname);

    return (
        <header
            ref={headerRef}
            className={headerCls}
            style={offsetTop ? { top: offsetTop } : undefined}
            onMouseLeave={scheduleClose}
        >
            <div
                ref={navRowRef}
                className="relative z-10 flex h-[80px] w-full items-center px-5 lg:px-8"
            >
                {/* 로고 — PLATEER 마크 클릭 → 플래티어 홈페이지(새 탭), 「AI Labs」 클릭 → /about.
                    (2026-11, GNB의 Company 메뉴를 없애고 그 역할을 PLATEER 마크로 옮김) */}
                <div ref={logoRef} className="flex shrink-0 items-center gap-2 whitespace-nowrap leading-none">
                <a
                    href="https://www.plateer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={locale === "en" ? "Plateer website (opens in new tab)" : "플래티어 홈페이지 (새 탭)"}
                    className="flex shrink-0 items-center"
                >
                    <BrandMark
                        className={cn(
                            /* AI Labs(24px Pretendard, 대문자 높이 약 17px)와 비슷한 높이로 맞춤 */
                            "h-[17px] w-auto transition",
                            light && "brightness-0 invert",
                        )}
                    />
                </a>
                <Link
                    href="/about"
                    aria-label="About Plateer AI Labs"
                    className="flex shrink-0 items-center"
                >
                    {/* 「AI Labs」 — 사이트 본문 글꼴(Pretendard)로 표기. Microsoft | Teams처럼 오른쪽 글자는
                        PLATEER 마크보다 조금 가볍게(semibold) 두고, 색은 배경 명암에 따라 전환 */}
                    <span
                        className={cn(
                            "text-[24px] font-semibold leading-none tracking-[-0.02em] transition-colors",
                            light ? "text-white" : "text-[#58595B]",
                        )}
                    >
                        AI Labs
                    </span>
                </Link>
                </div>
                {/* 모바일·태블릿(xl 미만) — 제품 페이지에서 로고 오른쪽에 「| XGEN」 표시.
                    데스크톱은 메뉴줄의 「제품」 앞에 같은 이름을 보여 준다. */}
                {currentProduct && (
                    <Link
                        href={currentProduct.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current="page"
                        className={cn(
                            "ml-3 mr-3 flex min-w-0 items-center gap-3 whitespace-nowrap text-[16px] font-bold leading-none tracking-[-0.01em] transition-colors sm:text-[17px] xl:hidden",
                            light ? "text-white" : "text-[var(--color-ink)]",
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={cn("h-[18px] w-px shrink-0", light ? "bg-white/40" : "bg-[var(--color-line)]")}
                        />
                        <span className="truncate">{currentProduct.name}</span>
                    </Link>
                )}
                {/* desktop groups */}
                {/* 전체 폭 헤더 — 메뉴 시작점은 본문 콘텐츠 왼쪽 축에 맞추고(위 align 참고), 유틸리티·CTA는 오른쪽 끝 */}
                <nav ref={deskNavRef} className="hidden shrink-0 items-center gap-6 whitespace-nowrap text-[15px] font-medium xl:flex 2xl:gap-[30px] 2xl:text-[16px]">
                    {NAV_GROUPS.filter((g) => !g.hidden).map((g) => {
                        const menuItems = g.items.filter((it) => !it.hidden);
                        const hasMenu = !g.flat && menuItems.length > 0;
                        const showProduct = g.key === "menu-products" && currentProduct;
                        return (
                        <div key={g.key} className="flex items-center gap-6 2xl:gap-[30px]">
                        {showProduct && (
                            /* 제품 페이지에서만 — 「XGEN | 제품 …」 (Microsoft 「Microsoft | Teams」 컨셉) */
                            <Link
                                href={currentProduct.href}
                                onClick={closeNow}
                                aria-current="page"
                                className={cn(
                                    "inline-flex items-center gap-6 text-[17px] font-bold tracking-[-0.01em] transition-colors 2xl:gap-[30px] 2xl:text-[18px]",
                                    light ? "text-white" : "text-[var(--color-ink)]",
                                )}
                            >
                                {currentProduct.name}
                                <span
                                    aria-hidden="true"
                                    className={cn("h-[18px] w-px", light ? "bg-white/40" : "bg-[var(--color-line)]")}
                                />
                            </Link>
                        )}
                        <div
                            className="relative"
                            onMouseEnter={() => openMenu(g.key)}
                        >
                            {g.external ? (
                                <a
                                    href={g.external}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn("inline-flex items-center gap-1 text-[#5ec8f5] transition hover:text-[#8ddbf8]", underlineCls)}
                                >
                                    {groupLabel(g, locale)}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            ) : (
                                <Link
                                    href={g.route ?? `/${g.key}`}
                                    className={cn(groupCls, openKey === g.key && "after:scale-x-100")}
                                    onClick={closeNow}
                                >
                                    {groupLabel(g, locale)}
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
                                    data-gnb-pop
                                    className={cn(
                                        // 업스테이지 벤치마크 — 와이드 메뉴 포함 모든 드롭다운을
                                        // 트리거 좌측 끝에 앵커해 바로 아래로 펼친다.
                                        "absolute top-full pt-[29px]",
                                        g.align === "center"
                                            ? "left-1/2 -translate-x-1/2"
                                            : g.align === "right"
                                              ? "right-0"
                                              : "left-0",
                                    )}
                                >
                                    {g.wide ? (
                                        <div className={cn("gnb-panel flex gap-8 rounded-b-[24px] px-7 py-5", panelCls)}>
                                            {g.feature && (
                                                <FeatureCard feature={g.feature} onClose={closeNow} dark={light} />
                                            )}
                                            <div className="flex gap-6">
                                            {buildColumns(
                                                menuItems,
                                                g.cols ?? 3,
                                            ).map((slice, col) =>
                                                slice.length === 0 ? null : (
                                                    <div
                                                        key={col}
                                                        className="w-max min-w-[120px] space-y-6"
                                                    >
                                                        {slice.map((it) => (
                                                            <DropdownItem
                                                                key={it.id}
                                                                item={it}
                                                                groupKey={g.key}
                                                                onClose={closeNow}
                                                                dark={light}
                                                            />
                                                        ))}
                                                    </div>
                                                ),
                                            )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={cn("gnb-panel min-w-[240px] rounded-b-[24px] px-4 py-4", panelCls)}>
                                            {menuItems.map((it) => (
                                                <DropdownItem
                                                    key={it.id}
                                                    item={it}
                                                    groupKey={g.key}
                                                    onClose={closeNow}
                                                    dark={light}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        </div>
                        );
                    })}
                </nav>

                <div className="ml-auto flex shrink-0 items-center justify-end gap-3">
                    {/* XGEN 체험하기 — 검색바 자리를 대체한 Primary CTA. 모서리 4px(Teams 「무료로 체험하기」 버튼 컨셉). */}
                    <Link
                        href="/xgen-trial"
                        className="hidden h-10 shrink-0 items-center whitespace-nowrap rounded-[4px] bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-4 text-[14px] font-bold text-white shadow-[0_6px_20px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110 sm:inline-flex"
                    >
                        {locale === "en" ? "Try XGEN" : "XGEN 체험하기"}
                    </Link>
                    {/* members 아이콘은 검색바 뒤에서 제거 — 푸터 About으로 이동(요청).
                        언어 전환(KO/EN)은 경로 기반이다(`/product/xgen` ⇆ `/en/product/xgen`) —
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

            {/* 체험 배너 — GNB 바로 아래 띠(2026-11). 구성은 Microsoft 공지 띠(Ignite)를 참고했다:
                가운데가 가장 어둡고 양 끝으로 밝아지는 가로 그라디언트, 왼쪽 끝 동심 원호(굵은 선+얇은 선),
                오른쪽 세로 발광선 두 줄과 굵은 동심 원호 띠. 색은 플래티어 시안·블루 팔레트.
                키 비주얼이 어두운 페이지에서는 같은 패턴을 밝은 바탕에 옅게 깐다. */}
            {PROMO_BANNER_ENABLED && showPromotion && bannerOpen && (
                <div
                    ref={bannerRef}
                    data-nav-theme={belowDark ? "light" : "dark"}
                    className={cn(
                        "relative overflow-hidden px-12 py-[10px] text-[14px] leading-5 transition-colors duration-300",
                        belowDark
                            ? "bg-[linear-gradient(90deg,#d9e8ff_0%,#eef5ff_28%,#f7faff_55%,#eef5ff_78%,#d3e4ff_100%)] text-[var(--color-ink)]"
                            : "bg-[linear-gradient(90deg,#0f2566_0%,#0b1224_28%,#060a17_55%,#0b1224_78%,#122c86_100%)] text-white",
                    )}
                >
                    {/* 왼쪽 끝 동심 원호 */}
                    <svg aria-hidden className={cn("pointer-events-none absolute left-0 top-0 hidden h-10 w-[120px] lg:block", belowDark ? "opacity-70" : "opacity-100")} viewBox="0 0 120 40">
                        <defs>
                            <linearGradient id="pb-arc-l" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0" stopColor="#185aea" />
                                <stop offset="1" stopColor="#00acee" />
                            </linearGradient>
                            <filter id="pb-glow-l" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1.6" result="b" />
                                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>
                        <g filter={belowDark ? undefined : "url(#pb-glow-l)"} fill="none">
                            <circle cx="10" cy="-30" r="80" stroke="url(#pb-arc-l)" strokeWidth="5" />
                            <circle cx="10" cy="-30" r="90" stroke="#00acee" strokeWidth="1.25" opacity="0.8" />
                        </g>
                    </svg>
                    {/* 오른쪽 세로 발광선 + 동심 원호 띠 */}
                    <svg aria-hidden className={cn("pointer-events-none absolute right-0 top-0 hidden h-10 w-[260px] lg:block", belowDark ? "opacity-70" : "opacity-100")} viewBox="0 0 260 40">
                        <defs>
                            <linearGradient id="pb-arc-r" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0" stopColor="#185aea" />
                                <stop offset="0.6" stopColor="#00acee" />
                                <stop offset="1" stopColor="#7cdcff" />
                            </linearGradient>
                            <filter id="pb-glow-r" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1.6" result="b" />
                                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>
                        <g filter={belowDark ? undefined : "url(#pb-glow-r)"} fill="none">
                            <line x1="150" y1="0" x2="150" y2="40" stroke="#00acee" strokeWidth="1.5" opacity="0.55" />
                            <line x1="158" y1="0" x2="158" y2="40" stroke="#5fd0ff" strokeWidth="2" opacity="0.9" />
                            <circle cx="300" cy="130" r="114" stroke="url(#pb-arc-r)" strokeWidth="6" />
                            <circle cx="300" cy="130" r="127" stroke="url(#pb-arc-r)" strokeWidth="6" opacity="0.85" />
                            <circle cx="300" cy="130" r="140" stroke="#00acee" strokeWidth="1.25" opacity="0.8" />
                        </g>
                    </svg>
                    <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
                        <span>
                            <span className="font-semibold">{t.nav.promoBadge}</span>
                            <span aria-hidden className={cn("mx-2", belowDark ? "text-[var(--color-ink)]/40" : "text-white/40")}>·</span>
                            {t.nav.promo}
                        </span>
                        <Link
                            href="/xgen-trial"
                            className={cn(
                                "group inline-flex flex-none items-center gap-0.5 font-semibold underline-offset-4 hover:underline",
                                belowDark ? "text-[#185aea]" : "text-[#5fd0ff]",
                            )}
                        >
                            {t.nav.promoCta}
                            <ChevronRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    <button
                        type="button"
                        onClick={dismissBanner}
                        aria-label={t.nav.promoClose}
                        className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2 rounded-[4px] p-1 transition",
                            belowDark
                                ? "text-[var(--color-ink)]/60 hover:bg-black/5 hover:text-[var(--color-ink)]"
                                : "text-white/70 hover:bg-white/10 hover:text-white",
                        )}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

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
                                            {groupLabel(g, locale)}
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
                                            {groupLabel(g, locale)}
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
                                            {groupLabel(g, locale)}
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
                                                    ) : it.disabled ? (
                                                        <p className="block py-2.5 text-[17px] font-medium text-[var(--color-ink-muted)]">
                                                            {navLabel(it, locale)}
                                                        </p>
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
                                                        (it.route && !it.disabled ? (
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
                                                                        <div key={c.id}>
                                                                            <Link
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
                                                                            {/* 손자 — 데스크톱 드롭다운과 같은 한 단 */}
                                                                            {c.children?.some((gc) => !gc.hidden) && (
                                                                                <div className="ml-3 border-l border-[var(--color-line)] pl-3">
                                                                                    {c.children
                                                                                        .filter((gc) => !gc.hidden)
                                                                                        .map((gc) => (
                                                                                            <Link
                                                                                                key={gc.id}
                                                                                                href={
                                                                                                    gc.route ??
                                                                                                    sectionHref(g.key, gc.id)
                                                                                                }
                                                                                                onClick={close}
                                                                                                className="block py-1.5 text-[14.5px] text-[var(--color-ink-subtle)] transition hover:text-[var(--color-ink)]"
                                                                                            >
                                                                                                {gc.id === "xgen-dex" ? (
                                                                                                    <>DexOn<span className="block text-[10px] font-normal leading-tight text-[var(--color-ink-subtle)]/70">(Device Extension On)</span></>
                                                                                                ) : navLabel(gc, locale)}
                                                                                            </Link>
                                                                                        ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
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
