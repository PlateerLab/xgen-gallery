import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { ProofHero } from "@/components/proof-hero";
import { PocDemos } from "@/components/poc-demos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "실증 데모 — Proof in Action",
    description:
        "백마디 말보다 실행으로 — XGEN Agentic AI 플랫폼의 핵심 기능이 실제로 실행되는 모습을 영상으로 확인하는 실증 데모.",
    path: "/proof-in-action",
    // 대표 영상(XGEN 실증 데모) 썸네일을 링크 미리보기 이미지로 사용.
    image: "https://i.ytimg.com/vi/4RiH3ThyIg0/maxresdefault.jpg",
    imageDims: { width: 1280, height: 720 },
});

export default function ProofInActionPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: "/" },
                    { name: "Proof in Action", path: "/proof-in-action" },
                ])}
            />
            <section className="relative overflow-hidden border-b border-white/10 py-24 pt-36 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-7xl px-6">
                    <ProofHero />
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 py-24">
                <PocDemos />
            </main>
            <SiteFooter />
        </>
    );
}
