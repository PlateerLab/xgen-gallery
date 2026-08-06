"use client";

import { useState } from "react";
// 내부 링크는 현재 로케일(/en 여부)에 맞춰 자동으로 다시 쓰인다 — locale-link 참고.
import { LocaleLink as Link } from "@/components/locale-link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRight, PlayCircle } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { GeoPattern, variantForPath } from "@/components/geo-pattern";
import { useI18n } from "@/components/i18n-provider";
import { NAV_GROUPS, ABOUT_GROUP, sectionHref } from "@/lib/nav";
import { stripLocale } from "@/lib/locale-path";

export function SiteFooter() {
    const { locale, t } = useI18n();
    // 경로 분기는 언어 중립 경로로 판단한다 — `/en/contact`도 `/contact`와 같게 동작해야 한다.
    const pathname = stripLocale(usePathname() || "/");
    // CTA는 메인(/)과 문의 페이지(/demo)를 제외한 모든 페이지 하단에 노출.
    const showCta = pathname !== "/" && pathname !== "/contact";
    // CTA 배너에 '실증 데모' 영상 카드를 함께 노출. CTA가 뜨는 모든 페이지에 적용하되,
    // 데모 페이지 자신(/proof-in-action)에서는 중복이므로 제외한다.
    const showDemo = showCta && pathname !== "/proof-in-action";
    // 데모 영상은 페이지 맥락에 맞춰 노출한다. 특정 제품 페이지는 해당 제품 데모를,
    // 그 외에는 XGEN 플랫폼 실증 데모를 기본으로 보여준다.
    const DEMO_BY_PATH: Record<string, { id: string; title: Record<string, string> }> = {
        "/code-assistant": {
            id: "dGEvX07WXKM",
            title: {
                ko: "AI Code Assistant 실증 데모",
                en: "AI Code Assistant in action",
            },
        },
    };
    const demoEntry = DEMO_BY_PATH[pathname] ?? {
        id: "4RiH3ThyIg0",
        title: { ko: "XGEN 플랫폼 실증 데모", en: "XGEN platform in action" },
    };
    const demo = { id: demoEntry.id, title: demoEntry.title[locale] };
    const DEMO_ID = demo.id;
    const DEMO_THUMB = `https://i.ytimg.com/vi/${DEMO_ID}/maxresdefault.jpg`;
    // 배너 내 인라인 재생 상태(클릭 전엔 썸네일 파사드, 클릭 시 임베드 로드).
    const [demoPlaying, setDemoPlaying] = useState(false);
    // 페이지마다 다른 패턴이 나오도록 경로 기반으로 변형을 고른다(충돌 방지 맵).
    const ctaVariant = variantForPath(pathname);
    // Explore 목록 — 좌우 두 열로 나눠 렌더(아래 slice 기준).
    const exploreLinks: {
        key: string;
        label: string;
        href: string;
        /** 새 탭 + 아웃링크 화살표 */
        external?: boolean;
        /** 우리 소유 도메인이면 referrer를 남긴다(유입 분석용) */
        sameOwner?: boolean;
    }[] = [
        ...NAV_GROUPS.filter((g) => !g.hidden).map((g) => ({
            key: g.key,
            label: g.label,
            href: g.external ?? g.route ?? `/${g.key}`,
            external: !!g.external,
        })),
        // XGEN 제품 사이트 — 푸터에서만 노출(요청). GNB에도 넣으려면 NAV_GROUPS에 추가한다.
        {
            key: "xgen-site",
            label: "XGEN",
            href: "https://www.xgen.im/",
            external: true,
            sameOwner: true,
        },
    ];
    // 저작권 끝 연도는 현재 연도로 자동 갱신 (2027년이면 2023–2027).
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--color-line)] bg-white">
            {showCta && (
                <div className="relative overflow-hidden border-y border-[var(--color-line)] bg-[#eceef2]">
                    {/* 기하학적 그레이 패턴 배경 (페이지별 변형) */}
                    <GeoPattern
                        variant={ctaVariant}
                        className="pointer-events-none absolute inset-0 h-full w-full"
                    />

                    <div
                        className={`relative mx-auto max-w-7xl px-6 py-20 md:py-24 ${
                            showDemo
                                ? "grid items-center gap-10 text-center md:grid-cols-[1.2fr_0.8fr] md:text-left"
                                : "text-center"
                        }`}
                    >
                        <div>
                            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-subtle)]">
                                {t.footer.ctaEyebrow}
                            </p>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-balance break-keep text-[var(--color-ink)] md:text-[34px] md:leading-[1.2]">
                                {t.footer.ctaTitleA}
                                <span className="bg-gradient-to-r from-[#2f7bff] to-[#7c5cff] bg-clip-text text-transparent">
                                    {t.footer.ctaTitleHighlight}
                                </span>
                                {t.footer.ctaTitleB}
                            </h2>
                            <p
                                className={`mt-4 max-w-2xl break-keep text-[14.5px] leading-snug text-[var(--color-ink-muted)] ${
                                    showDemo ? "md:mx-0" : "mx-auto"
                                }`}
                            >
                                {locale === "ko" ? (
                                    <>
                                        현장에 배치되는{" "}
                                        <span className="font-bold text-[#2461d8]">
                                            {t.footer.ctaFde}
                                        </span>
                                        가 요구사항 발굴부터 설계·구현·내재화까지 함께합니다
                                    </>
                                ) : (
                                    <>
                                        <span className="font-bold text-[#2461d8]">
                                            {t.footer.ctaFde}
                                        </span>{" "}
                                        work on site with you, from discovery through design,
                                        implementation, and handover
                                    </>
                                )}
                            </p>
                            <p
                                className={`mt-4 max-w-2xl text-pretty break-keep text-[17px] leading-relaxed text-[var(--color-ink-muted)] ${
                                    showDemo ? "md:mx-0" : "mx-auto"
                                }`}
                            >
                                {t.footer.ctaLead}
                            </p>
                            <div
                                className={`mt-8 flex flex-wrap items-center gap-3 ${
                                    showDemo ? "justify-center md:justify-start" : "justify-center"
                                }`}
                            >
                                <Link
                                    href="/contact?from=footer"
                                    className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                                >
                                    {t.footer.ctaPrimary}
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                                {pathname !== "/technical-consulting" && (
                                    <Link
                                        href="/poc-projects"
                                        className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/70 px-6 py-3 text-[16px] font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
                                    >
                                        {t.footer.ctaSecondary}
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {showDemo && (
                            <div className="mx-auto w-full max-w-[440px] md:mx-0 md:justify-self-end">
                                <div className="relative overflow-hidden rounded-xl bg-black ring-1 ring-[var(--color-line)]">
                                    {demoPlaying ? (
                                        <iframe
                                            className="aspect-video w-full"
                                            src={`https://www.youtube-nocookie.com/embed/${DEMO_ID}?autoplay=1&rel=0`}
                                            title={demo.title}
                                            loading="lazy"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setDemoPlaying(true)}
                                            aria-label={`${demo.title} 재생`}
                                            className="group relative block aspect-video w-full overflow-hidden"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={DEMO_THUMB}
                                                alt={
                                                    locale === "ko"
                                                        ? `${demo.title} 썸네일`
                                                        : `${demo.title} — video thumbnail`
                                                }
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover brightness-[1.22] saturate-[1.05] transition group-hover:scale-[1.02]"
                                            />
                                            {/* 어두운 썸네일을 밝은 배너에 자연스럽게 녹이는 라이트 그라데이션 */}
                                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-white/5 to-white/15" />
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#070b1c] transition group-hover:scale-105">
                                                    <PlayCircle className="h-7 w-7" />
                                                </span>
                                            </span>
                                        </button>
                                    )}
                                </div>
                                <div className="mt-2.5 flex justify-end">
                                    <Link
                                        href="/proof-in-action"
                                        className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[#2461d8]"
                                    >
                                        {t.footer.demoMore}
                                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-[1.1fr_1.5fr_1fr]">
                    {/* brand */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-[16px] text-[var(--color-ink-muted)]">
                            <BrandMark className="h-5 w-5" />
                            <span>
                                © 2023{year > 2023 ? `–${year}` : ""} Plateer{" "}
                                <span className="text-[#00adee]">Labs</span>
                            </span>
                        </div>
                        <p className="line-clamp-4 max-w-xs text-[14px] leading-relaxed text-[var(--color-ink-subtle)]">
                            {t.footer.blurb}
                        </p>
                    </div>

                    {/* Explore — top-level groups, split 3 + 3 (좌: Research·Technology·Applied AI / 우: Resources·Insights·Product) */}
                    <nav className="text-[16px]">
                        <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.footer.explore}
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-x-6">
                            {[
                                exploreLinks.slice(0, 3),
                                exploreLinks.slice(3),
                            ].map((col, ci) => (
                                <div key={ci} className="flex flex-col gap-2.5">
                                    {col.map((l) =>
                                        l.external ? (
                                            <a
                                                key={l.key}
                                                href={l.href}
                                                target="_blank"
                                                // 우리 소유 사이트에는 referrer를 남겨 유입 분석이 되게 한다
                                                // (noreferrer를 붙이면 GA4에서 Direct로 잡힌다).
                                                rel={
                                                    l.sameOwner
                                                        ? "noopener"
                                                        : "noopener noreferrer"
                                                }
                                                className="inline-flex items-center gap-1 text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                            >
                                                {l.label}
                                                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-ink-subtle)]" />
                                            </a>
                                        ) : (
                                            <Link
                                                key={l.key}
                                                href={l.href}
                                                className="text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                            >
                                                {l.label}
                                            </Link>
                                        ),
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* About — Explore와 같은 선상의 헤딩 + Company/GitHub/PoC */}
                    <nav className="text-[16px]">
                        <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.footer.about}
                        </p>
                        <div className="mt-2.5 flex flex-col gap-2.5">
                            {ABOUT_GROUP.items.map((it) => {
                                const label =
                                    locale === "ko" && it.labelKo
                                        ? it.labelKo
                                        : it.label;
                                return it.external ? (
                                    <a
                                        key={it.id}
                                        href={it.external}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                    >
                                        {label}
                                        <ArrowUpRight className="h-3.5 w-3.5 text-[var(--color-ink-subtle)]" />
                                    </a>
                                ) : (
                                    <Link
                                        key={it.id}
                                        href={it.route ?? sectionHref(ABOUT_GROUP.key, it.id)}
                                        className="text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                            {/* Members — GNB 검색바 옆 아이콘에서 푸터로 이동(요청) */}
                            <Link
                                href="/members"
                                className="text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                            >
                                {t.footer.members}
                            </Link>
                            <Link
                                href="/newsletter"
                                className="text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                            >
                                {t.footer.newsletter}
                            </Link>
                            {/* Decap CMS 진입점 — GitHub 로그인 후 글 기고(Open Authoring) */}
                            <a
                                href="/admin"
                                className="text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
                            >
                                {t.footer.contribute}
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
