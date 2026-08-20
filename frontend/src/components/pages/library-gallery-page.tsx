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
import { CATEGORIES, type ToolCategory } from "@/lib/tools";

/** GNB 하위 메뉴 딥링크(?cat=…) → 그리드 초기 필터. 모르는 값은 전체로 떨어뜨린다. */
function categoryFrom(cat: string | undefined): ToolCategory | "all" {
    const hit = CATEGORIES.find((c) => c.id === cat);
    return hit ? hit.id : "all";
}

export function LibraryGalleryPageContent({
    locale,
    cat,
}: {
    locale: Locale;
    /** /library-gallery?cat=… — 페이지(서버)가 읽어 넘긴다. */
    cat?: string;
}) {
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
                {/* key — 갤러리에 머문 채 GNB 에서 다른 카테고리를 누르면 URL 만 바뀌고
                    그리드의 useState 는 초기값을 다시 읽지 않는다. cat 이 바뀔 때 다시
                    마운트시켜 딥링크가 항상 필터에 반영되게 한다. */}
                <ToolGrid key={cat ?? "all"} initial={categoryFrom(cat)} />
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
