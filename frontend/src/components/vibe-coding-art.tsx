import type { Locale } from "@/lib/i18n";

const COPY = {
    ko: {
        prompt: "자연어로 요청",
        code: "코드 작성 · 수정",
        verify: "실행 · 검증",
        aria: "자연어 요청을 코드 작성과 수정, 실행 검증으로 이어가는 Vibe Coding 흐름",
    },
    en: {
        prompt: "Natural-language request",
        code: "Write · revise code",
        verify: "Run · verify",
        aria: "A Vibe Coding flow that turns a natural-language request into code changes and verified execution",
    },
} satisfies Record<Locale, Record<string, string>>;

export function VibeCodingArt({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <svg
                viewBox="0 0 480 240"
                className="block h-auto w-full"
                role="img"
                aria-label={t.aria}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="vc-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00acee" />
                        <stop offset="1" stopColor="#185aea" />
                    </linearGradient>
                    <filter id="vc-shadow" x="-20%" y="-20%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1e3a68" floodOpacity="0.13" />
                    </filter>
                    <marker id="vc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                        <path d="M0 1 L9 5 L0 9 z" fill="#2f7bff" />
                    </marker>
                </defs>

                <g filter="url(#vc-shadow)">
                    <rect x="22" y="34" width="436" height="172" rx="14" fill="#ffffff" stroke="#e1e8f3" />
                </g>

                <rect x="40" y="54" width="174" height="132" rx="11" fill="#f7faff" stroke="#dbe4f6" />
                <circle cx="58" cy="72" r="4" fill="#2f7bff" />
                <text x="70" y="76" fontSize="10" fontWeight="800" fill="#2461d8">{t.prompt}</text>
                <rect x="54" y="94" width="146" height="58" rx="10" fill="#ffffff" stroke="#cbd8ec" />
                <text x="66" y="116" fontSize="10" fontWeight="700" fill="#334155">
                    <tspan x="66" dy="0">{locale === "ko" ? "로그인 화면을 만들고" : "Build the sign-in screen"}</tspan>
                    <tspan x="66" dy="17">{locale === "ko" ? "테스트해 줘" : "and test it"}</tspan>
                </text>
                <rect x="133" y="162" width="67" height="14" rx="7" fill="url(#vc-blue)" />

                <path d="M224 120 H252" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#vc-arrow)" />

                <rect x="266" y="54" width="174" height="78" rx="11" fill="#172b4d" />
                <circle cx="282" cy="70" r="3" fill="#ff6b6b" />
                <circle cx="292" cy="70" r="3" fill="#ffd43b" />
                <circle cx="302" cy="70" r="3" fill="#51cf66" />
                <path d="M284 91h62M284 103h92M284 115h49" stroke="#8fb4ff" strokeWidth="5" strokeLinecap="round" />
                <path d="M356 91h60M386 103h30M343 115h73" stroke="#c8d7f2" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
                <text x="353" y="150" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2461d8">{t.code}</text>

                <path d="M353 158 V166" stroke="#2f7bff" strokeWidth="2" markerEnd="url(#vc-arrow)" />
                <rect x="281" y="172" width="144" height="22" rx="11" fill="#eaf1ff" />
                <circle cx="299" cy="183" r="6" fill="#2f7bff" />
                <path d="m296 183 2 2 4-5" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="311" y="187" fontSize="10" fontWeight="800" fill="#2461d8">{t.verify}</text>
            </svg>
        </div>
    );
}
