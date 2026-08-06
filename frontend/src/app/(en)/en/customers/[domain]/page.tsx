import { IndustryPageContent } from "@/components/pages/industry-page";
import { pageMetadata } from "@/lib/metadata";
import { INDUSTRIES, getCasesByIndustry, type IndustryKey } from "@/lib/customers";

function isIndustry(v: string): v is IndustryKey {
    return v in INDUSTRIES;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    if (!isIndustry(domain)) {
        return pageMetadata({
            title: "Customer cases",
            description: "XGEN and Polar customer cases by industry",
            path: "/customers",
            locale: "en",
        });
    }
    const d = INDUSTRIES[domain];
    const cases = getCasesByIndustry(domain);
    const hasCases = cases.length > 0;
    const blurb = d.blurbEn ?? d.blurb;
    return pageMetadata({
        title: `${d.en} customer cases`,
        description: hasCases
            ? `${blurb} — ${cases.length} case${cases.length > 1 ? "s" : ""}. See the background, the scope delivered, and the outcome of applying XGEN and AI Code Assistant to ${d.en.toLowerCase()} work.`
            : `${blurb} — in preparation. Plateer Labs researches Enterprise AI shaped to the workflows and regulations of ${d.en.toLowerCase()}, and proves it through PoCs.`,
        path: `/customers/${domain}`,
        locale: "en",
        ...(hasCases ? {} : { robots: { index: false, follow: true } }),
    });
}

export default async function IndustryPageEn({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    return <IndustryPageContent params={params} locale="en" />;
}
