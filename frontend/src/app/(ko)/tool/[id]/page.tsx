import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ToolDemoClient } from "@/components/tool-demo-client";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/site";
import { softwareApplicationLd, breadcrumbLd } from "@/lib/structured-data";

export function generateStaticParams() {
    return TOOLS.filter((t) => t.id !== "synaptic-memory").map((t) => ({ id: t.id }));
}

/**
 * 검색결과에서 잘리지 않도록 단어 경계에서 자른다. 루트 layout의 title template이
 * ` · Plateer Labs`를 덧붙이므로, title은 그 접미사까지 포함해 60자 안에 들어와야
 * SERP에서 온전히 보인다(설명은 155자 기준).
 */
function clamp(text: string, max: number): string {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const at = cut.lastIndexOf(" ");
    return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s·—,.]+$/, "");
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const tool = TOOLS.find((t) => t.id === id);
    if (!tool) return { title: "Tool not found" };

    // 60자 - " · Plateer Labs"(접미사) = 태그라인까지 쓸 수 있는 여유분.
    const room = 60 - ` · ${SITE.name}`.length - `${tool.name} — `.length;
    const tagline = clamp(tool.tagline, Math.max(room, 0));
    const title = tagline ? `${tool.name} — ${tagline}` : tool.name;
    const description = clamp(
        `${tool.description} 설치: ${tool.install} · 언어: ${tool.language} · 오픈소스(MIT).`,
        155,
    );
    const path = `/tool/${tool.id}`;

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: "article",
            siteName: SITE.name,
            title,
            description,
            url: `${SITE.url}${path}`,
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

export default async function ToolDemoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const tool = TOOLS.find((t) => t.id === id);
    if (!tool) notFound();

    return (
        <>
            <JsonLd
                data={[
                    softwareApplicationLd(tool),
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Tools", path: "/#tools" },
                        { name: tool.name, path: `/tool/${tool.id}` },
                    ]),
                ]}
            />
            <SiteNav />
            <ToolDemoClient tool={tool} />
            <SiteFooter />
        </>
    );
}
