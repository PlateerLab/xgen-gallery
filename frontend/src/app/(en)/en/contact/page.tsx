import { ContactPageContent } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Demo, trial, and technical consultation",
    description:
        "Request an XGEN product demo, a 15-day free trial, or a PoC and technical consultation from one form. Pick an inquiry type and we will reply within one to two business days.",
    path: "/contact",
    locale: "en",
});

export default function ContactPageEn() {
    return <ContactPageContent locale="en" />;
}
