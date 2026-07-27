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
    description:
        "기업용 Agentic AI 플랫폼 XGEN을 제공합니다. 원하는 LLM과 온프레미스·망분리 인프라 위에서 보안·거버넌스를 갖춰 AI를 구축하고, 실제 업무에 적용해 검증된 성과로 이어지도록 지원합니다.",
    descriptionEn:
        "Plateer Labs provides XGEN, an Agentic AI platform for enterprises. Build AI on your choice of LLM and on-premise or air-gapped infrastructure with built-in security and governance, then apply it to real business workflows for proven results.",
    github: "https://github.com/PlateerLab",
    githubOrg: "PlateerLab",
    youtube: "https://www.youtube.com/@PlateerLabs",
    locale: "ko_KR",
    /** OG/Twitter share image (served from app/icon.png). */
    ogImage: "/icon.png",
} as const;

/** Absolute URL helper — always returns a canonical, origin-prefixed URL. */
export function absoluteUrl(path = "/"): string {
    if (/^https?:\/\//.test(path)) return path;
    return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
