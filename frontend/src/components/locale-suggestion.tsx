"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Globe } from "lucide-react";
import { hasEnglish, localePath, stripLocale } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const DISMISS_COOKIE = "locale-hint";

/**
 * 해외 방문자에게 영문판을 "권유"하는 배너 — 자동 리디렉션은 하지 않는다.
 *
 * 왜 리디렉션이 아닌가: Googlebot은 대부분 미국 IP에서 Accept-Language 없이
 * 크롤링한다. "한국어 신호가 없으면 /en으로 보낸다"를 서버에서 강제하면 크롤러가
 * 한국어 페이지를 영영 못 보게 되어 이미 확보한 한국어 색인이 통째로 날아갈 수 있다.
 * 구글 다국어 가이드도 자동 전환 대신 hreflang + 안내를 권한다. 이 컴포넌트는
 * 클라이언트에서만 동작하므로 크롤러가 보는 HTML에는 영향이 없다.
 */
export function LocaleSuggestion({ locale }: { locale: Locale }) {
    const pathname = usePathname();
    const router = useRouter();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // 한국어 페이지에서, 영문판이 있는 경로에서만 권유한다.
        if (locale !== "ko" || !hasEnglish(pathname)) return;
        // 한 번 닫았거나 이미 언어를 고른 방문자에게는 다시 묻지 않는다.
        if (document.cookie.includes(`${DISMISS_COOKIE}=`)) return;
        // navigator.languages 어디에도 한국어가 없을 때만 = 한국어를 못 읽는 방문자.
        const langs = navigator.languages?.length
            ? navigator.languages
            : [navigator.language];
        if (langs.some((l) => l?.toLowerCase().startsWith("ko"))) return;
        setShow(true);
    }, [locale, pathname]);

    if (!show) return null;

    const remember = () => {
        document.cookie = `${DISMISS_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
        setShow(false);
    };

    return (
        <div
            role="region"
            aria-label="Language suggestion"
            className="border-b border-[#1f3a6d] bg-[#0b1e3f] px-4 py-2.5 text-white"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-[14px]">
                <Globe className="h-4 w-4 shrink-0 text-white/70" aria-hidden />
                <p className="text-white/90">
                    This page is also available in English
                </p>
                <button
                    type="button"
                    onClick={() => {
                        remember();
                        router.push(localePath("en", stripLocale(pathname)));
                    }}
                    className="rounded-full bg-white px-3.5 py-1 text-[13px] font-semibold text-[#0b1e3f] transition hover:bg-white/90"
                >
                    View in English
                </button>
                <button
                    type="button"
                    onClick={remember}
                    aria-label="Dismiss"
                    className="ml-1 text-white/60 transition hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
