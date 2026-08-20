import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { localePath, languageAlternates } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import type { Tool } from "@/lib/tools";

/**
 * 툴 상세 페이지 메타데이터 — `/tool/[id]` 와 전용 라우트(`/tool/synaptic-memory`),
 * 그리고 영문판이 같은 규칙을 쓰도록 한곳에 모았다.
 *
 * 전용 라우트가 이 규칙을 벗어나 있던 탓에 title 63자·description 161자가 나갔던 적이
 * 있어, 길이 계산을 함수 하나로 묶는다.
 */

/** 검색결과에서 잘리지 않도록 단어 경계에서 자른다. */
function clamp(text: string, max: number): string {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const at = cut.lastIndexOf(" ");
    return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s·—,.]+$/, "");
}

const SUFFIX: Record<Locale, (t: Tool) => string> = {
    ko: (t) => `설치: ${t.install} · 언어: ${t.language} · 오픈소스(MIT).`,
    en: (t) => `Install: ${t.install} · Language: ${t.language} · Open source (MIT).`,
};

export function toolMetadata(tool: Tool, locale: Locale): Metadata {
    // 60자 - " · Plateer AI Labs"(title template 접미사) = 태그라인에 쓸 수 있는 여유분.
    const room = 60 - ` · ${SITE.name}`.length - `${tool.name} — `.length;
    const tagline = clamp(tool.tagline, Math.max(room, 0));
    const title = tagline ? `${tool.name} — ${tagline}` : tool.name;
    const description = clamp(`${tool.description} ${SUFFIX[locale](tool)}`, 155);
    const path = `/tool/${tool.id}`;
    const canonical = localePath(locale, path);

    return {
        title,
        description,
        alternates: { canonical, languages: languageAlternates(path) },
        openGraph: {
            type: "article",
            siteName: SITE.name,
            title,
            description,
            url: `${SITE.url}${canonical}`,
            locale: locale === "en" ? "en_US" : "ko_KR",
            alternateLocale: locale === "en" ? ["ko_KR"] : ["en_US"],
            images: [{ url: SITE.ogImage }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [SITE.ogImage],
        },
    };
}
