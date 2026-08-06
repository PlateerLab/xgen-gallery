"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/cn";
import {
    hasEnglish,
    localeFromPath,
    localePath,
    stripLocale,
} from "@/lib/locale-path";

/**
 * KO ⇆ EN 전환 — 보고 있던 페이지의 반대 언어 URL로 이동한다(`/product` ⇆
 * `/en/product`). 쿠키로 언어 상태만 바꾸던 예전 방식과 달리 언어별 URL이
 * 실제로 달라져야 검색엔진이 두 언어를 각각 색인한다.
 *
 * 영문판이 없는 페이지에서는 링크 대신 비활성 표시를 렌더한다 — 존재하지 않는
 * `/en/...`으로 보내 404를 만들거나, 영문 홈으로 튕겨 맥락을 잃는 것보다 낫다.
 */
export function LanguageToggle({
    className,
    light = false,
}: {
    className?: string;
    light?: boolean;
}) {
    const pathname = usePathname() || "/";
    const locale = localeFromPath(pathname);
    const next = locale === "ko" ? "en" : "ko";
    const neutral = stripLocale(pathname);
    // 한국어로 돌아가는 방향은 항상 가능하다(모든 페이지의 본판이 한국어).
    const available = next === "ko" || hasEnglish(neutral);

    const base = cn(
        "inline-flex items-center gap-1 transition",
        light
            ? "text-white/80 hover:text-white"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
        className,
    );
    const label = (
        <>
            <Globe className="h-5 w-5" />
            <span className="text-[13px] font-semibold uppercase tracking-wide">
                {locale}
            </span>
        </>
    );

    if (!available) {
        return (
            <span
                className={cn(base, "cursor-default opacity-40")}
                title="This page is not available in English yet"
                aria-disabled
            >
                {label}
            </span>
        );
    }

    return (
        <Link
            href={localePath(next, neutral)}
            hrefLang={next}
            aria-label={
                next === "en" ? "View this page in English" : "이 페이지를 한국어로 보기"
            }
            title={next === "en" ? "English" : "한국어"}
            className={base}
        >
            {label}
        </Link>
    );
}
