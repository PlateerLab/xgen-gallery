import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { PocContent } from "@/components/poc-content";
import { PocCatalog } from "@/components/poc-catalog";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const COPY: Record<Locale, { lead: string; sub: string }> = {
    ko: {
        lead: "고객 현장의 페인포인트에서 출발해 XGEN 기술로 검증한 Enterprise AI 실증 프로젝트",
        sub: "고객이 마주한 문제를 Plateer Labs가 함께 파고들어, 검증된 결과로 만들어갑니다",
    },
    en: {
        lead: "Enterprise AI proof-of-concept projects that start from a pain point on the customer's floor and are validated with XGEN",
        sub: "Plateer Labs digs into the problem alongside the customer and turns it into a verified result",
    },
};

export function PocProjectsPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: localePath(locale, "/") },
                    {
                        name: "PoC Projects",
                        path: localePath(locale, "/poc-projects"),
                    },
                ])}
            />
            <section className="relative flex min-h-[560px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Applied AI
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                        PoC Projects
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/85">
                        {t.lead}
                    </p>
                    <p className="mt-3 text-[17px] leading-relaxed text-white/60">
                        {t.sub}
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 py-24">
                <PocContent locale={locale} />
                <div className="mt-8">
                    <PocCatalog locale={locale} />
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
