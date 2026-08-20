import type { Metadata } from "next";
import "../globals.css";
import { SITE } from "@/lib/site";
import { SiteShell, SHELL_METADATA_BASE } from "@/components/site-shell";

/**
 * 한국어 루트 레이아웃 — 사이트 본판. 라우트 그룹 `(ko)`는 URL에 나타나지 않으므로
 * 주소는 기존 그대로(`/`, `/about`, …) 유지된다. 영어판은 `app/(en)`이 별도 루트
 * 레이아웃으로 `<html lang="en">`을 내보낸다.
 */

// OG/트위터 링크 미리보기용 짧은 설명(≤80자). 메타 description(SITE.description)과 분리.
const OG_DESCRIPTION =
    "기업이 신뢰하고 운영하는 Agentic AI 플랫폼 XGEN. 원하는 LLM·인프라에 보안·거버넌스를 갖춰 실제 업무에 적용합니다.";

export const metadata: Metadata = {
    ...SHELL_METADATA_BASE,
    title: {
        default: `${SITE.name} — 기업용 Agentic AI 플랫폼 XGEN`,
        template: `%s · ${SITE.name}`,
    },
    description: SITE.description,
    keywords: [
        "Plateer AI Labs",
        "XGEN",
        "open-source AI",
        "RAG",
        "AI agent",
        "knowledge graph",
        "document ingestion",
        "Contextifier",
        "Synaptic Memory",
        "Googer",
    ],
    alternates: {
        canonical: "/",
        languages: { ko: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
        type: "website",
        siteName: SITE.name,
        title: `${SITE.name} — 기업용 Agentic AI 플랫폼 XGEN`,
        description: OG_DESCRIPTION,
        url: SITE.url,
        locale: "ko_KR",
        alternateLocale: ["en_US"],
        images: [{ url: SITE.ogImage, ...SITE.ogImageDims }],
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE.name} — 기업용 Agentic AI 플랫폼 XGEN`,
        description: OG_DESCRIPTION,
        images: [SITE.ogImage],
    },
};

export default function KoRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SiteShell locale="ko">{children}</SiteShell>;
}
