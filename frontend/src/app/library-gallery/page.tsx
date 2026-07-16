import { pageMetadata } from "@/lib/metadata";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { LivePreview } from "@/components/live-preview";
import { ToolGrid } from "@/components/tool-grid";
import { UseCases } from "@/components/usecases";
import { RuntimeContent } from "@/components/technology-sections";

export const metadata = pageMetadata({
    title: "Library Gallery",
    description:
        "XGEN 플랫폼을 떠받치는 오픈소스 AI 라이브러리 모음 — 문서 인제스션, 지식 그래프, 에이전트 도구. pip로 설치하거나 브라우저에서 바로 체험하세요.",
    path: "/library-gallery",
});

export default function LibraryGalleryPage() {
    return (
        <>
            <SiteNav overlay />
            {/* 히어로 — LivePreview가 좌(키 메시지+캡션+컨트롤)/우(일러스트) 전체를 렌더 */}
            <section className="relative overflow-hidden border-b border-white/10 text-white">
                <SceneBackground concept="tools" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">
                    <LivePreview />
                </div>
            </section>
            {/* 메인 페이지(키비주얼 제외)와 동일한 콘텐츠 구성 */}
            <main>
                <ToolGrid />
                <section id="recipes" className="scroll-mt-24">
                    <UseCases />
                </section>
                {/* Runtime — Technology에서 이관. onepage Section과 동일한 컨테이너로 래핑 */}
                <section
                    id="runtime"
                    className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            / Runtime
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                            Runtime
                        </h2>
                        <div className="mt-8">
                            <RuntimeContent />
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
