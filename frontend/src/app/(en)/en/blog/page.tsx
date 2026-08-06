import { BlogIndexPageContent } from "@/components/pages/blog-index-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Insight",
    description:
        "Plateer Labs Insight — case studies, tech notes, and product news from our Enterprise AI research and delivery work.",
    path: "/blog",
    locale: "en",
});

export default function BlogPageEn() {
    return <BlogIndexPageContent locale="en" />;
}
