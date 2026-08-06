import { CustomersPageContent } from "@/components/pages/customers-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Customer cases",
    description:
        "Where XGEN and AI Code Assistant were built and operated — finance, commerce, public sector, IT and manufacturing. Browse by product or industry.",
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
