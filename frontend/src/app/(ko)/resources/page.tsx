import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { ResourcesBrochures } from "@/components/resources-brochures";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Resources — 자료실",
    description:
        "XGEN 소개서를 비롯한 Plateer Labs 자료실. XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·도입 방식을 담은 소개서를 신청 후 받아보실 수 있습니다.",
    path: "/resources",
});

export default function ResourcesPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "DigitalDocument",
                        "@id": absoluteUrl("/resources#xgen-brochure"),
                        name: "XGEN 소개서",
                        description:
                            "XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·보안·도입 방식을 담은 제품 소개서.",
                        inLanguage: "ko",
                        encodingFormat: "application/pdf",
                        url: absoluteUrl("/resources"),
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        isAccessibleForFree: true,
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Resources", path: "/resources" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[440px] items-center overflow-hidden border-b border-white/10 py-24 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                        Resources · 자료실
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        Enterprise AI를 이해하는 기술 자료
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        XGEN Enterprise Agentic AI 플랫폼의 핵심 기능, 아키텍처, 구축
                        방식, 도입 사례를 담은 자료를 제공합니다. 간단한 정보를 남겨
                        주시면 담당자가 확인 후 이메일로 보내드립니다.
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
                            소개서 신청
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            원하시는 소개서를 선택하고 간단한 정보를 남기시면 담당자가
                            확인 후 입력하신 이메일로 보내드립니다.
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
