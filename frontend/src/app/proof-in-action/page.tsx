import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { PocDemos } from "@/components/poc-demos";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

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
            <section className="relative flex min-h-[460px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                        Applied AI · Proof in Action
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                        실증 데모
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/85">
                        백마디 말보다 실행으로 — XGEN의 핵심 기능이 실제로 실행되는
                        모습을 영상으로 확인하세요
                    </p>
                    <p className="mt-3 text-[17px] leading-relaxed text-white/60">
                        성능을 주장하는 대신, 실행하는 결과로 증명합니다
                    </p>
                    <div className="mt-8">
                        <Link
                            href={SITE.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-[#FF0033] px-6 py-3 text-[16px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(255,0,51,0.5)] transition hover:brightness-110"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                            >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            플래티어랩스 YouTube 채널
                            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-6xl px-6 py-24">
                <PocDemos />
            </main>
            <SiteFooter />
        </>
    );
}
