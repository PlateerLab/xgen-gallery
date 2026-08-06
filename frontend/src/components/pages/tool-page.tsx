import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ToolDemoClient } from "@/components/tool-demo-client";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { softwareApplicationLd, breadcrumbLd } from "@/lib/structured-data";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

export async function ToolPageContent({
    params,
    locale,
}: {
    params: Promise<{ id: string }>;
    locale: Locale;
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
                        { name: "Home", path: localePath(locale, "/") },
                        { name: "Tools", path: `${localePath(locale, "/")}#tools` },
                        {
                            name: tool.name,
                            path: localePath(locale, `/tool/${tool.id}`),
                        },
                    ]),
                ]}
            />
            <SiteNav />
            <ToolDemoClient tool={tool} locale={locale} />
            <SiteFooter />
        </>
    );
}
