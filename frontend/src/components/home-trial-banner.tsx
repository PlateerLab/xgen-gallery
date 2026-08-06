import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
    Locale,
    { aria: string; title: string; desc: string; primary: string; secondary: string }
> = {
    ko: {
        aria: "XGEN 15일 무료 체험",
        title: "지금, 15일 무료로 XGEN을 직접 경험하세요",
        desc: "온프레미스 환경에서도 설치와 구축 부담 없이 — Agentic AI 워크플로우를 전 기능으로 15일간 무료로",
        primary: "15일 무료 체험 시작하기",
        secondary: "XGEN 알아보기",
    },
    en: {
        aria: "XGEN 15-day free trial",
        title: "Put XGEN to work — free for 15 days",
        desc: "Every Agentic AI workflow feature, free for 15 days, with none of the setup burden that usually comes with on-premise",
        primary: "Start the 15-day trial",
        secondary: "Learn about XGEN",
    },
};

/**
 * 히어로(영상 키비주얼) 바로 아래 풀폭 전환 배너 — XGEN 15일 무료 체험 CTA.
 * 몰입형 영상 직후 첫 밴드에서 행동을 촉구한다. 링크는 기존 체험 페이지(/xgen-trial).
 */
export function HomeTrialBanner({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <section
            aria-label={t.aria}
            className="relative overflow-hidden border-t border-white/10 bg-[#070b1c] text-white"
        >
            {/* 은은한 블루 글로우 — 위 다크 히어로에서 자연스럽게 이어지도록 */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_150%_at_50%_0%,rgba(47,123,255,.28),transparent_62%)]"
            />
            <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-7 px-6 py-10 text-center md:py-12">
                <div className="max-w-2xl">
                    <p className="text-2xl font-bold leading-snug md:text-[28px]">
                        {t.title}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                        {t.desc}
                    </p>
                </div>
                <div className="flex flex-none flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                    <Link
                        href={localeHref(locale, "/xgen-trial")}
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[16px] font-semibold text-[#0b3aa8] shadow-lg shadow-black/10 transition hover:bg-white/90"
                    >
                        {t.primary}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href={localeHref(locale, "/product")}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[16px] font-semibold text-white transition hover:bg-white/10"
                    >
                        {t.secondary}
                    </Link>
                </div>
            </div>
        </section>
    );
}
