/**
 * Single source of truth for site-wide identity used by GEO / SEO surfaces
 * (metadata, JSON-LD structured data, robots, sitemap, llms.txt).
 *
 * Keep the brand name spelling IDENTICAL everywhere — entity consistency is a
 * core GEO signal. See docs/GEO-OPTIMIZATION-GUIDE.md.
 */
export const SITE = {
    name: "Plateer Labs",
    shortName: "Plateer Labs",
    // Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL.
    // (2026-07-23~) 운영 도메인이 gallery-xgen.x2bee.com → labs.plateer.com 으로 변경됨.
    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://labs.plateer.com").replace(/\/$/, ""),
    // 네이버 서치어드바이저 권장(≤80자)에 맞춘 사이트 설명(meta description).
    description:
        "기업용 Agentic AI 플랫폼 XGEN. 원하는 LLM과 온프레미스·망분리 인프라에 보안·거버넌스를 갖춰 실제 업무에 적용합니다.",
    descriptionEn:
        "Plateer Labs provides XGEN, an Agentic AI platform for enterprises. Build AI on your choice of LLM and on-premise or air-gapped infrastructure with built-in security and governance, then apply it to real business workflows for proven results.",
    github: "https://github.com/PlateerLab",
    githubOrg: "PlateerLab",
    youtube: "https://www.youtube.com/@PlateerLabs",
    locale: "ko_KR",
    /** OG/Twitter share image — 1200×630 브랜드 카드(public/og.png). */
    ogImage: "/og-v2.png",
    ogImageDims: { width: 1200, height: 630 },
} as const;

/** Absolute URL helper — always returns a canonical, origin-prefixed URL. */
export function absoluteUrl(path = "/"): string {
    if (/^https?:\/\//.test(path)) return path;
    return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
