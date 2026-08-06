import type { Metadata } from "next";
import "../globals.css";
import { SITE } from "@/lib/site";
import { SiteShell, SHELL_METADATA_BASE } from "@/components/site-shell";

/**
 * 영어 루트 레이아웃 — `/en/*` 서브트리 전용. 별도 루트 레이아웃으로 둔 이유는
 * `<html lang="en">`을 서버 렌더 HTML에 정확히 실어 보내기 위해서다(한국어 본판과
 * 같은 레이아웃을 쓰면 lang 속성을 경로별로 바꿀 수 없다).
 *
 * 영문판이 있는 경로만 이 트리에 파일을 둔다 — 번역되지 않은 주소는 404가 정답이다
 * (한국어 콘텐츠를 영문 URL로 노출하면 hreflang이 거짓이 되고 색인이 오염된다).
 */
const OG_DESCRIPTION =
    "XGEN — the Agentic AI platform enterprises run on their own LLMs and infrastructure, with security and governance built in.";

const TITLE = `${SITE.name} — XGEN, the Enterprise Agentic AI Platform`;

export const metadata: Metadata = {
    ...SHELL_METADATA_BASE,
    title: {
        default: TITLE,
        template: `%s · ${SITE.name}`,
    },
    description: SITE.descriptionEn,
    keywords: [
        "Plateer Labs",
        "XGEN",
        "enterprise AI platform",
        "agentic AI",
        "on-premise LLM",
        "air-gapped AI",
        "RAG",
        "AI governance",
        "knowledge graph",
        "open-source AI",
    ],
    alternates: {
        canonical: "/en",
        languages: { ko: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
        type: "website",
        siteName: SITE.name,
        title: TITLE,
        description: OG_DESCRIPTION,
        url: `${SITE.url}/en`,
        locale: "en_US",
        alternateLocale: ["ko_KR"],
        images: [{ url: SITE.ogImage, ...SITE.ogImageDims }],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: OG_DESCRIPTION,
        images: [SITE.ogImage],
    },
};

export default function EnRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SiteShell locale="en">{children}</SiteShell>;
}
