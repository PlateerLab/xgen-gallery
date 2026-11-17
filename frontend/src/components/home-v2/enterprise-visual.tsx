import type { Locale } from "@/lib/i18n";

/**
 * 메인 히어로 1번 슬라이드 비주얼 — 「강력한 거버넌스 위에서, 스스로 진화하는 Agentic AI Platform」.
 *   배경: 오로라 링(AdobeStock_434090854, 별 제거 보정본) = 기업이 정한 거버넌스 경계
 *   링 둘레: 거버넌스 키워드 8개 (회전 광선이 지날 때 차례로 빛남)
 *   링 안쪽: Agent AI 자기 개선 루프 — 실행 → 기록 → 회고 → 개선
 * 「진화」는 모델 재학습이 아니라 작업 지침·도구 구성 개선이며, 검증 후 반영된다는 범위를 밝힌다.
 * 동작 줄이기 설정이면 모든 움직임을 멈춘다.
 */
export function EnterpriseVisual({ locale }: { locale: Locale; overlayImg?: string; overlayAlt?: string }) {
    const ko = locale === "ko";
    // 링 선 위에 시계 방향(위 → 오른쪽 → 아래 → 왼쪽)으로 놓는다. 회전 광선 8초 한 바퀴에 맞춰 1초씩 빛난다.
    const pos = [
        { x: 50, y: 6 },
        { x: 75, y: 18 },
        { x: 86, y: 49 },
        { x: 75, y: 80 },
        { x: 50, y: 92 },
        { x: 25, y: 80 },
        { x: 14, y: 49 },
        { x: 25, y: 18 },
    ];
    const labels = ko
        ? ["권한 통제", "위험도 심사", "결재선", "실행 격리", "감사 로그", "실행 추적", "민감정보 차단", "가드레일"]
        : ["Access control", "Risk review", "Approvals", "Isolated runs", "Audit log", "Run tracing", "PII blocking", "Guardrails"];
    const guards = labels.map((t, i) => ({ t, ...pos[i] }));
    const steps = ko ? ["실행", "기록", "회고", "개선"] : ["Run", "Record", "Reflect", "Refine"];

    return (
        <div className="relative">
            <style>{`
                .ga-bg { animation: ga-breathe 14s ease-in-out infinite; transform-origin: 50% 48%;
                    -webkit-mask-image: radial-gradient(ellipse 50% 51% at 50% 49%, #000 60%, transparent 100%);
                    mask-image: radial-gradient(ellipse 50% 51% at 50% 49%, #000 60%, transparent 100%); }
                @keyframes ga-breathe { 0%,100% { transform: scale(1.04); filter: brightness(1); } 50% { transform: scale(1.0); filter: brightness(1.12); } }
                .ga-beam { position: absolute; left: 50%; top: 49%; width: 76%; aspect-ratio: 1.09; translate: -50% -50%;
                    border-radius: 50%; mix-blend-mode: screen; filter: blur(7px); animation: ga-spin 8s linear infinite;
                    -webkit-mask-image: radial-gradient(closest-side, transparent 66%, #000 78%, #000 88%, transparent 100%);
                    mask-image: radial-gradient(closest-side, transparent 66%, #000 78%, #000 88%, transparent 100%); }
                .ga-beam-a { background: conic-gradient(from -95deg, transparent 0deg, rgba(24,90,234,0) 10deg, rgba(24,90,234,.35) 45deg, rgba(95,208,255,.75) 75deg, rgba(232,248,255,.95) 92deg, rgba(186,140,255,.55) 98deg, transparent 112deg, transparent 360deg); }
                .ga-beam-b { width: 70%; opacity: .55; filter: blur(12px); animation-duration: 13s; animation-direction: reverse;
                    background: conic-gradient(from 120deg, transparent 0deg, rgba(120,255,220,.0) 20deg, rgba(120,255,220,.45) 70deg, rgba(160,130,255,.5) 110deg, transparent 150deg, transparent 360deg); }
                @keyframes ga-spin { to { rotate: 360deg; } }
                .ga-step { animation: ga-step 8s infinite; opacity: .5; }
                @keyframes ga-step { 0%,22% { opacity: 1; color: #fff; text-shadow: 0 0 14px rgba(95,208,255,.95), 0 0 2px rgba(255,255,255,.9); } 27%,100% { opacity: .5; color: rgba(255,255,255,.8); text-shadow: 0 1px 8px rgba(0,0,0,.6); } }
                .ga-guard { animation: ga-guard 8s infinite; }
                @keyframes ga-guard { 0%,14% { box-shadow: 0 0 0 1px rgba(95,208,255,.55), 0 0 22px rgba(95,208,255,.45); } 22%,100% { box-shadow: 0 0 0 1px rgba(255,255,255,.08); } }
                .ga-core-title { animation: ga-glow 4s ease-in-out infinite; }
                @keyframes ga-glow { 0%,100% { text-shadow: 0 0 18px rgba(24,90,234,.6); } 50% { text-shadow: 0 0 30px rgba(95,208,255,.85); } }
                @media (prefers-reduced-motion: reduce) {
                    .ga-bg, .ga-beam, .ga-core-title, .ga-guard { animation: none; }
                    .ga-step { animation: none; opacity: 1; }
                }
            `}</style>
            <div className="relative aspect-[4/3] w-full">
                <div aria-hidden className="pointer-events-none absolute -inset-[10%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/intro/governed-aurora.webp" alt="" aria-hidden className="ga-bg absolute inset-0 h-full w-full object-cover" />
                    {/* 거버넌스 경계를 따라 도는 오로라 광선 */}
                    <div aria-hidden className="ga-beam ga-beam-a" />
                    <div aria-hidden className="ga-beam ga-beam-b" />
                </div>

                {/* 링 둘레: 거버넌스 키워드 (sm 이상) */}
                {guards.map((g, i) => (
                    <span
                        key={g.t}
                        className="ga-guard absolute hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/25 bg-[#0b1224]/70 px-3 py-1 text-[13px] font-semibold text-white backdrop-blur-md sm:inline-block"
                        style={{ left: `${g.x}%`, top: `${g.y}%`, animationDelay: `${i}s` }}
                    >
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#5fd0ff] align-middle" />
                        {g.t}
                    </span>
                ))}

                {/* 링 안쪽: 판 없이 오로라 위에 떠 있는 자기 개선 루프 */}
                <div className="absolute left-1/2 top-[48%] w-[56%] -translate-x-1/2 -translate-y-1/2 text-center text-white sm:w-[52%]">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5fd0ff] [text-shadow:0_1px_8px_rgba(0,0,0,.7)] sm:text-[14px]">{ko ? "자기 개선 루프" : "Self-improving loop"}</p>
                    <p className="ga-core-title mt-1 whitespace-nowrap text-[26px] font-bold tracking-tight sm:text-[42px]">XGEN</p>
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                        {steps.map((s, i) => (
                            <span key={s} className="ga-step px-1 py-0.5 text-[13px] font-semibold sm:text-[16px]" style={{ animationDelay: `${i * 2}s` }}>
                                <span className="mr-1 text-[#5fd0ff]/80">{`0${i + 1}`}</span>
                                {s}
                            </span>
                        ))}
                    </div>
                    <p className="mt-2 hidden text-[12.5px] leading-snug text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,.7)] sm:block sm:text-[13.5px]">{ko ? "작업 지침·도구 구성을 검증 후 반영" : "Instructions & tools refined after review"}</p>
                </div>

                {/* 모바일: 거버넌스 칩 */}
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap justify-center gap-1.5 sm:hidden">
                    {guards.map((g) => (
                        <span key={`m-${g.t}`} className="rounded-full border border-white/20 bg-[#0b1224]/80 px-2.5 py-1 text-[11.5px] font-semibold text-white backdrop-blur-md">
                            {g.t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
