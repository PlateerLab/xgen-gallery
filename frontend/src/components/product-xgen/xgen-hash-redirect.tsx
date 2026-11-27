"use client";

import { useEffect } from "react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 예전 원페이지 앵커(/product/xgen#certification 등)로 들어오면 그 섹션이 옮겨 간
 * 2depth 페이지로 보낸다. 사이트 밖(광고·문서·메일)에 이미 퍼진 링크를 살리기 위한 것.
 */
const MOVED: Record<string, string> = {
    value: "/product/xgen/features",
    features: "/product/xgen/features",
    roles: "/product/xgen/features",
    build: "/product/xgen/features",
    "on-premise": "/product/xgen/security",
    governance: "/product/xgen/security",
    certification: "/product/xgen/security",
    "core-tech": "/product/xgen/technology",
    geny: "/product/xgen/technology",
    "isolated-execution": "/product/xgen/technology",
    deployment: "/product/xgen/adoption",
};

export function XgenHashRedirect({ locale }: { locale: Locale }) {
    useEffect(() => {
        const id = window.location.hash.slice(1);
        const to = MOVED[id];
        if (!to) return;
        // 섹션 전체를 가리키던 앵커(#features 등)는 페이지 맨 위로, 하위 블록 앵커는 그 자리로.
        const keepHash = !["features", "core-tech"].includes(id);
        // 쿼리(utm 등)는 앵커 앞에 붙여 보존한다.
        window.location.replace(localeHref(locale, to) + window.location.search + (keepHash ? `#${id}` : ""));
    }, [locale]);
    return null;
}
