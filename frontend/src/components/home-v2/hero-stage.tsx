import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 키 비주얼 — Microsoft Teams 메인 히어로 구성을 XGEN에 맞춘 것.
 *
 *  · 브랜드 그라디언트 무대(둥근 패널) 위에 실제 제품 창(DexOn 바이브코딩)
 *  · 겹치는 보조 창(캔버스) + 떠 있는 카드 3장(요청 → 결재 → 실행 기록)
 *
 * 떠 있는 카드의 문구는 화면 흐름을 보여 주는 예시 UI다(수치·성과 주장 없음).
 * 동작 줄이기 설정이면 떠다니는 움직임을 멈춘다.
 */

const COPY = {
    ko: {
        window: "XGEN · DexOn",
        you: "나",
        prompt: "고객 문의를 분류하는 에이전트를 만들어 줘",
        approvalTitle: "결재 요청",
        approvalSub: "AI 위험도 심사 · 승인 대기",
        doneTitle: "에이전트 실행 완료",
        doneSub: "실행 기록이 감사 로그에 남았습니다",
    },
    en: {
        window: "XGEN · DexOn",
        you: "Me",
        prompt: "Build an agent that sorts customer inquiries",
        approvalTitle: "Approval requested",
        approvalSub: "AI risk review · pending",
        doneTitle: "Agent run complete",
        doneSub: "The run is recorded in the audit log",
    },
};

export function HeroStage({
    locale,
    main,
    sub,
}: {
    locale: Locale;
    main: { img: string; alt: string };
    sub: { img: string; alt: string };
}) {
    const c = COPY[locale];
    return (
        <div className="relative">
            <style>{`
                @keyframes xg-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
                .xg-float-a { animation: xg-float 6s ease-in-out infinite }
                .xg-float-b { animation: xg-float 7s ease-in-out -2s infinite }
                .xg-float-c { animation: xg-float 6.5s ease-in-out -4s infinite }
                @media (prefers-reduced-motion: reduce) { .xg-float-a,.xg-float-b,.xg-float-c { animation: none } }
            `}</style>

            {/* 무대 — 브랜드 그라디언트 둥근 패널 */}
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#d7e4fd] via-[#e7eeff] to-[#d3effb] px-5 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14">
                <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#00acee]/25 blur-3xl" />
                <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#185aea]/20 blur-3xl" />

                {/* 메인 제품 창 */}
                <div className="relative mx-auto max-w-[620px] overflow-hidden rounded-xl bg-white shadow-[0_30px_70px_-24px_rgba(11,18,36,0.45)]">
                    <div className="flex h-8 items-center gap-1.5 border-b border-[var(--color-line)] bg-[#f7f8fa] px-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        <span className="ml-3 text-[11.5px] font-semibold text-[var(--color-ink-muted)]">{c.window}</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={main.img} alt={main.alt} className="block w-full" />
                </div>

                {/* 보조 창 — 캔버스 */}
                <div className="absolute bottom-5 right-4 w-[38%] max-w-[240px] overflow-hidden rounded-lg bg-white shadow-[0_22px_48px_-16px_rgba(11,18,36,0.5)] sm:bottom-7 sm:right-7">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sub.img} alt={sub.alt} className="block w-full" />
                </div>
            </div>

            {/* 떠 있는 카드 1 — 요청 */}
            <div className="xg-float-a absolute -left-3 top-5 hidden max-w-[260px] items-start gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-14px_rgba(11,18,36,0.35)] sm:flex lg:-left-8">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#0b1224] text-[11px] font-semibold text-white">
                    {c.you}
                </span>
                <p className="text-[13.5px] font-medium leading-snug text-[var(--color-ink)]">{c.prompt}</p>
            </div>

            {/* 떠 있는 카드 2 — 결재 */}
            <div className="xg-float-b absolute -right-3 top-[38%] hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-14px_rgba(11,18,36,0.35)] md:flex lg:-right-6">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#eef3fc] text-[#185aea]">
                    <ShieldCheck aria-hidden className="h-5 w-5" />
                </span>
                <div>
                    <p className="text-[13.5px] font-semibold text-[var(--color-ink)]">{c.approvalTitle}</p>
                    <p className="text-[12px] text-[var(--color-ink-muted)]">{c.approvalSub}</p>
                </div>
            </div>

            {/* 떠 있는 카드 3 — 실행 기록 */}
            <div className="xg-float-c absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-14px_rgba(11,18,36,0.35)] sm:left-10">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#e6f6ec] text-[#16794a]">
                    <CheckCircle2 aria-hidden className="h-5 w-5" />
                </span>
                <div>
                    <p className="flex items-center gap-1 text-[13.5px] font-semibold text-[var(--color-ink)]">
                        {c.doneTitle}
                        <Sparkles aria-hidden className="h-3.5 w-3.5 text-[#185aea]" />
                    </p>
                    <p className="text-[12px] text-[var(--color-ink-muted)]">{c.doneSub}</p>
                </div>
            </div>
        </div>
    );
}
