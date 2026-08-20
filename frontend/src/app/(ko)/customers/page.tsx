import { CustomersPageContent } from "@/components/pages/customers-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "고객사례",
    description:
        "XGEN·AI Code Assistant 등 Plateer AI Labs의 Enterprise AI를 금융·커머스·공공·IT/제조 업무에 실제로 구축·운영한 고객사례를 제품·산업별로 정리했습니다.",
    path: "/customers",
});

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>;
}) {
    return <CustomersPageContent searchParams={searchParams} locale="ko" />;
}
