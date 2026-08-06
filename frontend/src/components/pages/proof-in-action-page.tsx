import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { ProofHero } from "@/components/proof-hero";
import { PocDemos } from "@/components/poc-demos";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

export function ProofInActionPageContent({ locale }: { locale: Locale }) {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: localePath(locale, "/") },
                    {
                        name: "Proof in Action",
                        path: localePath(locale, "/proof-in-action"),
                    },
                ])}
            />
            <section className="relative overflow-hidden border-b border-white/10 py-24 pt-36 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-7xl px-6">
                    <ProofHero locale={locale} />
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 py-24">
                <PocDemos locale={locale} />
            </main>
            <SiteFooter />
        </>
    );
}
