import { CustomersPageContent } from "@/components/pages/customers-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Customer cases",
    description:
        "Customer cases where Plateer Labs Enterprise AI — XGEN, AI Code Assistant, and more — was built and operated in finance, commerce, public sector, and IT and manufacturing, organized by product and industry.",
    path: "/customers",
    locale: "en",
});

export default async function CustomersPageEn({
    searchParams,
}: {
    searchParams: Promise<{ product?: string }>;
}) {
    return <CustomersPageContent searchParams={searchParams} locale="en" />;
}
