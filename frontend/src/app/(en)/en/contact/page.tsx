import { ContactPageContent } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Demo, trial, and product consultation",
    description:
        "Request an XGEN demo, a 15-day free trial, or a product consultation from one form. We reply within one to two business days.",
    path: "/contact",
    locale: "en",
});

export default function ContactPageEn() {
    return <ContactPageContent locale="en" />;
}
