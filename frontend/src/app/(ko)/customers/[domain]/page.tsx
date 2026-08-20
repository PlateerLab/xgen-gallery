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
            title: "고객사례",
            description: "산업별 XGEN·Polar 고객사례",
            path: "/customers",
        });
    }
    const d = INDUSTRIES[domain];
    const cases = getCasesByIndustry(domain);
    const hasCases = cases.length > 0;
    return pageMetadata({
        title: `${d.ko} 고객사례`,
        description: hasCases
            ? `${d.blurb} ${cases.length}건을 소개합니다. XGEN·AI Code Assistant를 ${d.ko} 현장 업무에 적용해 검증한 도입 배경·구축 범위·성과를 확인하세요.`
            : `${d.blurb}를 준비 중입니다. Plateer AI Labs는 ${d.ko} 업무 특성과 규제를 반영한 Enterprise AI를 연구하고 PoC로 실증합니다.`,
        path: `/customers/${domain}`,
        ...(hasCases ? {} : { robots: { index: false, follow: true } }),
    });
}

export default async function IndustryPage({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    return <IndustryPageContent params={params} locale="ko" />;
}
