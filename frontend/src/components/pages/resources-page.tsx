import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { ResourcesBrochures } from "@/components/resources-brochures";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE, absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * 자료실 — 소개서(브로셔) 신청. 카드·폼 본체는 자체 사전으로 이중언어를 처리하고,
 * 여기서는 히어로·섹션 카피와 JSON-LD만 로케일에 맞춘다.
 */
const COPY: Record<
    Locale,
    {
        eyebrow: string;
        title: string;
        lead: string;
        sectionTitle: string;
        sectionDesc: string;
        docName: string;
        docDesc: string;
    }
> = {
    ko: {
        eyebrow: "Resources · 자료실",
        title: "Enterprise AI를 이해하는 기술 자료",
        lead: "XGEN Enterprise Agentic AI 플랫폼의 핵심 기능, 아키텍처, 구축 방식, 도입 사례를 담은 자료를 제공합니다. 간단한 정보를 남겨 주시면 담당자가 확인 후 이메일로 보내드립니다.",
        sectionTitle: "소개서 신청",
        sectionDesc:
            "원하시는 소개서를 선택하고 간단한 정보를 남기시면 담당자가 확인 후 입력하신 이메일로 보내드립니다.",
        docName: "XGEN 소개서",
        docDesc:
            "XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·보안·도입 방식을 담은 제품 소개서.",
    },
    en: {
        eyebrow: "Resources",
        title: "Technical material for understanding Enterprise AI",
        lead: "Documents covering the core capabilities, architecture, deployment approach, and real applications of the XGEN Enterprise Agentic AI platform. Leave a few details and we will email them to you.",
        sectionTitle: "Request a brochure",
        sectionDesc:
            "Pick the brochure you want, leave a few details, and we will send it to the email address you provide.",
        docName: "XGEN brochure",
        docDesc:
            "A product brochure covering the core capabilities, architecture, security, and adoption path of the XGEN Enterprise Agentic AI platform.",
    },
};

export function ResourcesPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const self = locale === "en" ? "/en/resources" : "/resources";

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "DigitalDocument",
                        "@id": absoluteUrl(`${self}#xgen-brochure`),
                        name: t.docName,
                        description: t.docDesc,
                        inLanguage: locale,
                        encodingFormat: "application/pdf",
                        url: absoluteUrl(self),
                        publisher: {
                            "@type": "Organization",
                            name: SITE.name,
                            url: SITE.url,
                        },
                        isAccessibleForFree: true,
                    },
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Resources", path: self },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[440px] items-center overflow-hidden border-b border-white/10 py-24 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                        {t.eyebrow}
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        {t.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        {t.lead}
                    </p>
                </div>
            </section>

            <main>
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Brochure
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.sectionTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.sectionDesc}
                        </p>

                        <div className="mt-8">
                            <ResourcesBrochures />
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
