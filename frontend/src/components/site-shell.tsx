import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import { I18nProvider } from "@/components/i18n-provider";
import { StickyCta } from "@/components/sticky-cta";
import { SubscribeCta } from "@/components/subscribe-cta";
import { ContentGuard } from "@/components/content-guard";
import { GoogleAnalytics } from "@/components/google-analytics";
import { LocaleSuggestion } from "@/components/locale-suggestion";
import type { Locale } from "@/lib/i18n";

/**
 * `<html>`·`<body>` 셸 — 한국어(`app/(ko)`)와 영어(`app/(en)`) 두 루트 레이아웃이
 * 공유한다. 루트 레이아웃을 둘로 나눈 이유는 `<html lang>`을 언어별로 정확히
 * 내보내기 위해서다(스크린리더 발음·검색엔진 언어 판별 신호).
 *
 * 라우트 그룹은 URL에 나타나지 않으므로 한국어 주소(`/about`)는 그대로 유지된다.
 */
export function SiteShell({
    locale,
    children,
}: {
    locale: Locale;
    children: React.ReactNode;
}) {
    return (
        <html
            lang={locale}
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
            <head>
                {/* Google Analytics — 모든 페이지 공통(한 곳에서 관리) */}
                <GoogleAnalytics />
                {/* Pretendard (same font as konantech) — self-hosted variable
                    woff2, preloaded so it renders as early as possible. */}
                <link
                    rel="preload"
                    href="/fonts/PretendardVariable.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head>
            <body
                data-guard={
                    process.env.NODE_ENV === "production" ? "on" : undefined
                }
                className="min-h-dvh bg-[var(--color-surface)] font-sans text-[var(--color-ink)] antialiased"
            >
                <JsonLd data={[organizationLd(locale), websiteLd(locale)]} />
                <I18nProvider initialLocale={locale}>
                    <LocaleSuggestion locale={locale} />
                    {children}
                    <StickyCta />
                    <SubscribeCta />
                </I18nProvider>
                <ContentGuard />
            </body>
        </html>
    );
}

/** 두 루트 레이아웃이 공유하는 메타데이터 기본값(언어별 title/description은 각자 지정). */
export const SHELL_METADATA_BASE: Metadata = {
    metadataBase: new URL(SITE.url),
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
};
