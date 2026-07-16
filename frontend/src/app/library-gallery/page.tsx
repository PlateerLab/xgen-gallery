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
            {/* 히어로 — 좌: 페이지 아이덴티티 / 우: 카테고리별 최신 라이브러리 쇼케이스 캐러셀 */}
            <section className="relative overflow-hidden border-b border-white/10 text-white">
                <SceneBackground concept="tools" />
                <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-36">
                    <div>
                        <p className="text-[15px] font-semibold tracking-tight text-[#fcd34d]">
                            Open Source · Library Gallery
                        </p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                            Library Gallery
                        </h1>
                        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/65">
                            XGEN을 떠받치는 오픈소스 라이브러리. pip로 설치하거나,
                            모든 도구를 지금 여기 브라우저에서 체험하세요.
                        </p>
                    </div>
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
