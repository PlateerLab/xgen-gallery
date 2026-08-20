import { SeriesPageContent } from "@/components/pages/blog-series-page";
import { SERIES } from "@/lib/series";
import { absoluteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/locale-path";

export const dynamicParams = false;

export function generateStaticParams() {
    return SERIES.map((s) => ({ key: s.key }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ key: string }>;
}) {
    const { key } = await params;
    const def = SERIES.find((s) => s.key === key);
    if (!def) return {};
    return {
        title: `${def.title} · 시리즈`,
        description: def.description,
        alternates: {
            canonical: `/blog/series/${def.key}`,
            languages: languageAlternates(`/blog/series/${def.key}`),
        },
        openGraph: {
            title: `${def.title} · Plateer AI Labs`,
            description: def.description,
            type: "website",
            locale: "ko_KR",
            alternateLocale: ["en_US"],
            url: absoluteUrl(`/blog/series/${def.key}`),
            images: [absoluteUrl(def.cover)],
        },
    };
}

export default async function SeriesPage({
    params,
}: {
    params: Promise<{ key: string }>;
}) {
    return <SeriesPageContent params={params} locale="ko" />;
}
