import { NewsletterIndexPageContent } from "@/components/pages/newsletter-index-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Newsletter",
    description:
        "The Plateer AI Labs newsletter — research and practical insight on Enterprise and Agentic AI, product news, and cases proven in the field.",
    path: "/newsletter",
    locale: "en",
});

export default function NewsletterPageEn() {
    return <NewsletterIndexPageContent locale="en" />;
}
