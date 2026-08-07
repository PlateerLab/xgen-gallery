import { NewsletterIssuePageContent } from "@/components/pages/newsletter-issue-page";
import { getIssueFor, getIssuesFor } from "@/lib/newsletter";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

/** 영문판이 준비된 호만 생성한다 — 없는 호에 hreflang을 걸지 않기 위해. */
export function generateStaticParams() {
    return getIssuesFor("en").map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const issue = getIssueFor(slug, "en");
    if (!issue) return {};
    return pageMetadata({
        title: issue.title,
        description: issue.summary,
        path: `/newsletter/${issue.slug}`,
        locale: "en",
    });
}

export default async function NewsletterIssuePageEn({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return <NewsletterIssuePageContent params={params} locale="en" />;
}
