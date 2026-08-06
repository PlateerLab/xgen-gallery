import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { LivePreview } from "@/components/live-preview";
import { ToolGrid } from "@/components/tool-grid";
import { RuntimeContent } from "@/components/technology-sections";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

export function LibraryGalleryPageContent({ locale }: { locale: Locale }) {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: localePath(locale, "/") },
                    {
                        name: "Open Source",
                        path: localePath(locale, "/library-gallery"),
                    },
                ])}
            />
            {/* 히어로 — LivePreview가 좌(키 메시지+캡션+컨트롤)/우(일러스트) 전체를 렌더 */}
            <section className="relative overflow-hidden border-b border-white/10 text-white">
                <SceneBackground concept="tools" />
                <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
                    <LivePreview />
                </div>
            </section>
            {/* 메인 페이지(키비주얼 제외)와 동일한 콘텐츠 구성 */}
            <main>
                <ToolGrid />
                {/* Runtime — Technology에서 이관. onepage Section과 동일한 컨테이너로 래핑 */}
                <section
                    id="runtime"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            / Runtime
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-semibold tracking-tight md:text-4xl">
                            Runtime
                        </h2>
                        <div className="mt-8">
                            <RuntimeContent locale={locale} />
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
