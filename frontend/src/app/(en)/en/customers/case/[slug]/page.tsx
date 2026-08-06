import { CaseDetailPageContent } from "@/components/pages/case-detail-page";
import { pageMetadata } from "@/lib/metadata";
import { CASE_STUDIES, getCaseBySlug } from "@/lib/customers";

export function generateStaticParams() {
    return CASE_STUDIES.filter((c) => !c.draft).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const c = getCaseBySlug(slug);
    if (!c) {
        return pageMetadata({
            title: "Customer cases",
            description: "XGEN and Polar customer cases",
            path: "/customers",
            locale: "en",
        });
    }
    return pageMetadata({
        title: c.titleEn ?? c.title,
        description: c.summaryEn ?? c.summary,
        path: `/customers/case/${c.slug}`,
        locale: "en",
    });
}

export default async function CaseDetailPageEn({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return <CaseDetailPageContent params={params} locale="en" />;
}
