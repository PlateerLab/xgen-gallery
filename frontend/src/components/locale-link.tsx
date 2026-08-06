"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/components/i18n-provider";
import { localeHref } from "@/lib/locale-path";

/**
 * 현재 로케일에 맞춰 내부 링크를 다시 쓰는 `next/link` 래퍼.
 *
 * GNB·푸터처럼 링크가 수십 개인 클라이언트 컴포넌트에서 링크마다 변환 함수를
 * 부르는 대신 이 컴포넌트를 `Link`로 별칭 임포트해 한 번에 적용한다. 영문판이
 * 없는 경로는 한국어 URL 그대로 남으므로, 부분 번역 상태에서도 링크가 깨지지 않는다.
 * (서버 컴포넌트에서는 컨텍스트를 못 읽으니 `localeHref()`를 직접 쓴다.)
 */
export function LocaleLink({
    href,
    ...rest
}: ComponentProps<typeof NextLink>) {
    const { locale } = useI18n();
    return (
        <NextLink
            href={typeof href === "string" ? localeHref(locale, href) : href}
            {...rest}
        />
    );
}
