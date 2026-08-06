import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SynapticDemoClient } from "@/components/synaptic-demo-client";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/site";
import { softwareApplicationLd, breadcrumbLd } from "@/lib/structured-data";

const TOOL = TOOLS.find((t) => t.id === "synaptic-memory")!;

/**
 * SERP에서 잘리지 않도록 단어 경계에서 자른다 — /tool/[id] 라우트와 같은 규칙.
 * <title>에는 루트 layout template이 ` · Plateer Labs`를 붙이므로 그 길이까지 포함해
 * 60자, 설명은 155자 안에 들어와야 결론이 잘리지 않는다.
 */
function clamp(text: string, max: number): string {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const at = cut.lastIndexOf(" ");
    return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s·—,.]+$/, "");
}

const TITLE_ROOM = 60 - ` · ${SITE.name}`.length - `${TOOL.name} — `.length;
const PAGE_TITLE = `${TOOL.name} — ${clamp(TOOL.tagline, Math.max(TITLE_ROOM, 0))}`;
// 브랜드명은 title template이 이미 붙이므로 설명에서는 반복하지 않는다.
const PAGE_DESC = clamp(
    `${TOOL.description} 설치: ${TOOL.install} · 언어: ${TOOL.language} · 오픈소스(MIT).`,
    155,
);

export const metadata: Metadata = {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    alternates: { canonical: "/tool/synaptic-memory" },
    openGraph: {
        type: "article",
        siteName: SITE.name,
        title: PAGE_TITLE,
        description: TOOL.description,
        url: `${SITE.url}/tool/synaptic-memory`,
        images: [{ url: SITE.ogImage }],
    },
};

export default function SynapticMemoryPage() {
    return (
        <>
            <JsonLd
                data={[
                    softwareApplicationLd(TOOL),
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Tools", path: "/#tools" },
                        { name: TOOL.name, path: "/tool/synaptic-memory" },
                    ]),
                ]}
            />
            <SiteNav />
            <SynapticDemoClient tool={TOOL} />
            <SiteFooter />
        </>
    );
}
