/* /product/xgen 1depth 「XGEN은 다릅니다」 — 비아이매트릭스 TRINITY PRISM 키비주얼을 벤치마킹(2026-11).
   검정 무대 + 빛을 받는 유리 프리즘(SVG) + 바닥 반사 + 들어오는 빛·퍼지는 스펙트럼,
   그 위에 짧은 도입 2줄 → 대형 2줄 헤드라인(둘째 줄 그라데이션) → 굵은 한 줄 → 본문 → 숫자 4개.
   색은 사이트 강조색(파랑·하늘)에 인디고만 더했다. 애니메이션 없이 정지 그림(움직임 줄이기 설정과 무관). */
import type { Locale } from "@/lib/i18n";

type Stat = { n: string; label: string; sub: string };

const COPY = {
    ko: {
        kicker: "XGEN · 기업형 Agentic AI Platform",
        introA: "AI Agent를 시험해 보는 단계를 넘어",
        introB: "실제 업무에서 운영하는 단계로",
        introC: ".",
        h1: "From Pilot to Production.",
        h2: "XGEN은 다릅니다.",
        bold: "온프레미스와 망분리 환경에서 AI Agent를 설계하고, 실행하고, 통제하는 플랫폼입니다.",
        bodyA: "사내 데이터는 기업 안에서 다루고, Agent의 실행은 승인과 기록 아래 둡니다.",
        bodyB: "아래 숫자는 배포·인증·공개 현황을 기준으로 합니다.",
    },
    en: {
        kicker: "XGEN · Enterprise Agentic AI Platform",
        introA: "Beyond trying AI agents out,",
        introB: "toward running them in real work",
        introC: ".",
        h1: "From Pilot to Production.",
        h2: "XGEN is different.",
        bold: "A platform to design, run and govern AI agents on-premises and in network-separated environments.",
        bodyA: "Company data stays inside the company, and agent actions run under approval and audit logging.",
        bodyB: "The figures below reflect deployment, certification and public release status.",
    },
} as const;

/** 유리 프리즘 + 빛줄기. 1600×800 비율 캔버스를 가운데 두고 화면 폭에 따라 축소한다. */
function Prism() {
    return (
        <svg
            aria-hidden
            viewBox="0 0 1600 800"
            className="h-full w-full"
            fill="none"
        >
            <defs>
                {/* 프리즘 테두리: 위는 밝고 아래로 갈수록 파랑·인디고 */}
                <linearGradient id="dp-edge" x1="800" y1="40" x2="800" y2="640" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="0.55" stopColor="#8fc4ff" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#6d6cff" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="dp-glass" x1="800" y1="40" x2="800" y2="640" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.07" />
                    <stop offset="1" stopColor="#5b8cff" stopOpacity="0.02" />
                </linearGradient>
                {/* 들어오는 흰 빛 */}
                <linearGradient id="dp-in" x1="0" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.75" />
                </linearGradient>
                {/* 나가는 스펙트럼 */}
                <linearGradient id="dp-out" x1="1040" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#e6f4ff" stopOpacity="0.85" />
                    <stop offset="0.3" stopColor="#38bdf8" stopOpacity="0.7" />
                    <stop offset="0.65" stopColor="#2f7bff" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#7c6cff" stopOpacity="0" />
                </linearGradient>
                {/* 바닥 반사 */}
                <linearGradient id="dp-refl" x1="0" y1="640" x2="0" y2="780" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#9cc8ff" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#9cc8ff" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="dp-floor" cx="800" cy="640" r="520" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 0.08 0 588.8)">
                    <stop offset="0" stopColor="#7fb2ff" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#7fb2ff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="dp-core" cx="800" cy="420" r="380" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#2f7bff" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#2f7bff" stopOpacity="0" />
                </radialGradient>
                <filter id="dp-blur-s" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="dp-blur-l" x="-20%" y="-200%" width="140%" height="500%">
                    <feGaussianBlur stdDeviation="16" />
                </filter>
            </defs>

            {/* 프리즘 안쪽에 고이는 빛 */}
            <circle cx="800" cy="420" r="380" fill="url(#dp-core)" />

            {/* 들어오는 빛: 왼쪽 아래에서 프리즘 왼쪽 면으로 */}
            <path d="M0 560 L560 428" stroke="url(#dp-in)" strokeWidth="2" />
            <path d="M0 560 L560 428" stroke="url(#dp-in)" strokeWidth="10" opacity="0.35" filter="url(#dp-blur-s)" />
            {/* 프리즘 안을 지나는 빛 */}
            <path d="M560 428 L1040 430" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />

            {/* 나가는 스펙트럼: 오른쪽 면에서 넓게 퍼진다 */}
            <path d="M1040 424 L1600 372 L1600 486 L1040 438 Z" fill="url(#dp-out)" opacity="0.55" filter="url(#dp-blur-l)" />
            <path d="M1040 431 L1600 428" stroke="url(#dp-out)" strokeWidth="2.5" />

            {/* 유리 몸체 */}
            <path d="M800 40 L1170 640 L430 640 Z" fill="url(#dp-glass)" />
            {/* 테두리 번짐 + 선 */}
            <path d="M800 40 L1170 640 L430 640 Z" stroke="url(#dp-edge)" strokeWidth="8" opacity="0.35" filter="url(#dp-blur-s)" strokeLinejoin="round" />
            <path d="M800 40 L1170 640 L430 640 Z" stroke="url(#dp-edge)" strokeWidth="2.5" strokeLinejoin="round" />
            {/* 안쪽 면(두께감) */}
            <path d="M800 96 L1124 620 L476 620 Z" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M800 40 L800 96 M1170 640 L1124 620 M430 640 L476 620" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />

            {/* 바닥 광선과 반사 */}
            <rect x="200" y="620" width="1200" height="40" fill="url(#dp-floor)" />
            <path d="M330 640 L1270 640" stroke="#cfe3ff" strokeOpacity="0.45" strokeWidth="1.5" />
            <path d="M430 640 L800 780 L1170 640" stroke="url(#dp-refl)" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M476 646 L800 768 L1124 646" stroke="url(#dp-refl)" strokeWidth="1.5" opacity="0.6" />
        </svg>
    );
}

export function XgenDifferentPrism({ locale, stats }: { locale: Locale; stats: Stat[] }) {
    const t = locale === "en" ? COPY.en : COPY.ko;
    return (
        <section
            data-nav-theme="dark"
            className="relative overflow-hidden bg-[#03040a] text-white"
        >
            {/* 프리즘 무대: 1600×800 캔버스를 가운데 고정, 좁은 화면에서는 비율대로 축소 */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[56px] h-[900px] w-[1800px] -translate-x-1/2 max-[1100px]:top-[48px] max-[1100px]:h-[700px] max-[1100px]:w-[1400px] max-[620px]:top-[60px] max-[620px]:h-[460px] max-[620px]:w-[920px]"
            >
                <Prism />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* 카피: 프리즘 안쪽에 겹쳐 앉는다 */}
                <div className="flex min-h-[880px] flex-col items-center justify-center pt-[40px] text-center max-[1100px]:min-h-[700px] max-[1100px]:pt-[40px] max-[620px]:min-h-0 max-[620px]:pb-6 max-[620px]:pt-[96px]">
                    <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/50">
                        {t.kicker}
                    </p>
                    <p className="mt-5 text-[16px] leading-[1.9] text-white/75 max-[620px]:text-[14px]">
                        {t.introA}
                        <br />
                        <strong className="font-semibold text-white">{t.introB}</strong>
                        {t.introC}
                    </p>
                    <h2 className="mt-8 font-bold leading-[1.06] tracking-[-0.035em]">
                        <span className="block text-[84px] text-white max-[1100px]:text-[60px] max-[620px]:text-[30px]">
                            {t.h1}
                        </span>
                        <span className="block bg-gradient-to-r from-[#eaf4ff] via-[#6fb4ff] to-[#7c6cff] bg-clip-text pb-2 text-[84px] text-transparent max-[1100px]:text-[60px] max-[620px]:text-[40px]">
                            {t.h2}
                        </span>
                    </h2>
                    <p className="mt-8 max-w-3xl text-[18px] font-semibold leading-relaxed text-white max-[620px]:mt-6 max-[620px]:text-[15px]">
                        {t.bold}
                    </p>
                    <p className="mt-4 max-w-3xl text-[16px] leading-[1.85] text-white/70 max-[620px]:text-[14px]">
                        {t.bodyA}
                        <br className="max-[620px]:hidden" /> {t.bodyB}
                    </p>
                </div>

                {/* 숫자 4개: 얇은 가로선 위에 조용히 */}
                <div className="border-t border-white/10 pb-20 pt-12 max-[1100px]:mt-6 max-[620px]:pb-14 max-[620px]:pt-10">
                    <div className="grid grid-cols-4 gap-x-6 max-[901px]:grid-cols-2 max-[901px]:gap-y-10">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="bg-gradient-to-b from-white to-[#9cc8ff] bg-clip-text text-[44px] font-semibold leading-none tracking-[-0.03em] text-transparent max-[620px]:text-[34px]">
                                    {s.n}
                                </p>
                                <p className="mt-4 text-[15px] font-semibold tracking-tight text-white max-[620px]:text-[14px]">
                                    {s.label}
                                </p>
                                <p className="mt-1 text-[13px] text-white/45">{s.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
