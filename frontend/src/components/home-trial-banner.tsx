import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * 히어로(영상 키비주얼) 바로 아래 풀폭 전환 배너 — XGEN 15일 무료 체험 CTA.
 * 몰입형 영상 직후 첫 밴드에서 행동을 촉구한다. 링크는 기존 체험 페이지(/xgen-trial).
 */
export function HomeTrialBanner() {
    return (
        <section
            aria-label="XGEN 15일 무료 체험"
            className="relative overflow-hidden bg-gradient-to-r from-[#2f7bff] to-[#00acee] text-white"
        >
            {/* 은은한 하이라이트 — 밋밋한 단색 방지 */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_120%_at_15%_0%,rgba(255,255,255,.22),transparent_60%)]"
            />
            <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-7 px-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12.5px] font-semibold backdrop-blur-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        15일 무료 체험
                    </div>
                    <p className="mt-3 text-2xl font-bold leading-snug md:text-[28px]">
                        지금, 15일 무료로 XGEN을 직접 경험하세요
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                        온프레미스 환경에서도 설치와 구축 부담 없이 — Agentic AI
                        워크플로우를 전 기능으로 15일간 무료로
                    </p>
                </div>
                <div className="flex flex-none flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                    <Link
                        href="/xgen-trial"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[16px] font-semibold text-[#0b3aa8] shadow-lg shadow-black/10 transition hover:bg-white/90"
                    >
                        15일 무료 체험 시작하기
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/product"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[16px] font-semibold text-white transition hover:bg-white/10"
                    >
                        XGEN 알아보기
                    </Link>
                </div>
            </div>
        </section>
    );
}
