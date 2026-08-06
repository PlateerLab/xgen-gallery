import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SynapticDemoClient } from "@/components/synaptic-demo-client";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { softwareApplicationLd, breadcrumbLd } from "@/lib/structured-data";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * Synaptic Memory 는 데모가 무거워 `/tool/[id]` 대신 전용 라우트를 쓴다.
 * 데모 UI 자체는 영문이라 화면은 그대로 두고 메타데이터·브레드크럼만 로케일을 따른다.
 */
export const SYNAPTIC_TOOL = TOOLS.find((t) => t.id === "synaptic-memory")!;

export function SynapticMemoryPageContent({ locale }: { locale: Locale }) {
    return (
        <>
            <JsonLd
                data={[
                    softwareApplicationLd(SYNAPTIC_TOOL),
                    breadcrumbLd([
                        { name: "Home", path: localePath(locale, "/") },
                        { name: "Tools", path: `${localePath(locale, "/")}#tools` },
                        {
                            name: SYNAPTIC_TOOL.name,
                            path: localePath(locale, "/tool/synaptic-memory"),
                        },
                    ]),
                ]}
            />
            <SiteNav />
            <SynapticDemoClient tool={SYNAPTIC_TOOL} />
            <SiteFooter />
        </>
    );
}
