import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";
import { NAV_GROUPS } from "@/lib/nav";
import { getMembersPayload } from "@/lib/members/cache";
import { getAllPosts } from "@/lib/blog";
import { getIssues } from "@/lib/newsletter";
import { SERIES } from "@/lib/series";
import { getAllCases, INDUSTRIES, getCasesByIndustry, type IndustryKey } from "@/lib/customers";
import { EN_ROUTES, localePath } from "@/lib/locale-path";

/**
 * Dynamic sitemap covering every public URL (home, tools, members, releases).
 * Member URLs are pulled from the live roster so AI crawlers and search engines
 * discover them. See docs/GEO-OPTIMIZATION-GUIDE.md §2.3.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        // /library-gallery 는 Open Source 그룹(key=library-gallery)에서 생성됨 — 중복 제거
        { url: `${SITE.url}/poc-projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE.url}/proof-in-action`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/technical-consulting`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/enablement`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/security-and-governance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        // 공개 페이지인데 사이트맵에 빠져 있던 라우트 — 색인 대상에 포함한다.
        { url: `${SITE.url}/architecture`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE.url}/documentation`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE.url}/members`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
        { url: `${SITE.url}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE.url}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE.url}/polar`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/code-assistant`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/pathfinder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/xgen-trial`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE.url}/releases`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${SITE.url}/customers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ];

    // 고객사례 — 개별 사례 페이지 + 사례가 있는 산업 페이지만 색인(빈 산업 스텁은 제외).
    const caseRoutes: MetadataRoute.Sitemap = getAllCases().map((c) => ({
        url: `${SITE.url}/customers/case/${c.slug}`,
        lastModified: new Date(c.published),
        changeFrequency: "monthly",
        priority: 0.7,
    }));
    const industryRoutes: MetadataRoute.Sitemap = (
        Object.keys(INDUSTRIES) as IndustryKey[]
    )
        .filter((k) => getCasesByIndustry(k).length > 0)
        .map((k) => ({
            url: `${SITE.url}/customers/${k}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        }));

    // Top-level GNB one-pages (Research, Technology, Product, …). external 링크 그룹은
    // /{key} 페이지가 없으므로 사이트맵에서 제외한다(현재 external 그룹 없음).
    const groupRoutes: MetadataRoute.Sitemap = NAV_GROUPS.filter(
        // external/route 그룹, 그리고 /product로 리다이렉트되는 레거시 products 그룹 제외.
        (g) => !g.external && !g.route && g.key !== "products",
    ).map((g) => ({
        url: `${SITE.url}/${g.key}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((t) => ({
        url: `${SITE.url}/tool/${t.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
        url: `${SITE.url}/blog/${p.slug}`,
        lastModified: p.updated ? new Date(p.updated) : new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    // 시리즈 목차 페이지 — 연재글을 묶는 허브라 내부 링크·주제 응집도에 기여한다.
    const seriesRoutes: MetadataRoute.Sitemap = SERIES.map((s) => ({
        url: `${SITE.url}/blog/series/${s.key}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    const newsletterRoutes: MetadataRoute.Sitemap = getIssues().map((it) => ({
        url: `${SITE.url}/newsletter/${it.slug}`,
        lastModified: new Date(it.date),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    let memberRoutes: MetadataRoute.Sitemap = [];
    try {
        const { members } = await getMembersPayload();
        memberRoutes = members.map((m) => ({
            url: `${SITE.url}/members/${m.login}`,
            lastModified: m.updatedAt ? new Date(m.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.5,
        }));
    } catch {
        // Members are best-effort — never let a GitHub hiccup break the sitemap.
    }

    const koreanRoutes = [
        ...staticRoutes,
        ...groupRoutes,
        ...toolRoutes,
        ...blogRoutes,
        ...seriesRoutes,
        ...newsletterRoutes,
        ...memberRoutes,
        ...caseRoutes,
        ...industryRoutes,
    ];

    // 영문판(/en/*) — 실제로 번역된 경로만 색인 대상에 넣는다(EN_ROUTES가 기준).
    // 없는 URL을 사이트맵에 넣으면 Search Console에서 404 오류로 잡힌다.
    const enBlogPaths = getAllPosts("en").map((p) => `/blog/${p.slug}`);
    const enSeriesPaths = SERIES.map((d) => `/blog/series/${d.key}`);
    const englishRoutes: MetadataRoute.Sitemap = [
        ...EN_ROUTES,
        ...enBlogPaths,
        ...enSeriesPaths,
    ].map((path) => ({
        url: `${SITE.url}${localePath("en", path)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "/" ? 0.9 : 0.6,
    }));

    return [...koreanRoutes, ...englishRoutes];
}
