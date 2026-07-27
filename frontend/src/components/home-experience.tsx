import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/**
 * 메인 — 체험하기(Live Demo) 존. 제품 투어 바로 아래에 배치해, 제품을 본 직후
 * 브라우저에서 바로 체험하도록 유도한다. X2BEE AI는 외부 데모(새 탭), XGEN은 사내
 * 무료 체험 안내 페이지(/xgen-trial)로 라우팅한다.
 *
 * 룩앤필: 사이트 시그니처 브랜드 그라디언트(#00acee→#185aea, 시안→블루)로 통일하고,
 * 각 카드 상단에 라이트 그라디언트 배너 + 인라인 SVG 일러스트(블루 계열)를 얹는다.
 */
type ArtKind = "x2bee" | "xgen";

const EXPERIENCES: {
    kind: ArtKind;
    name: string;
    desc: string;
    href: string;
    /** true면 외부 링크(새 탭), false면 사내 라우트(같은 탭). */
    external: boolean;
}[] = [
    {
        kind: "xgen",
        name: "XGEN Agentic AI Platform 체험하기",
        desc: "데이터 연동부터 노코드 에이전트 구현까지, 15일 무료 체험으로 직접 경험해보세요",
        href: "/xgen-trial",
        external: false,
    },
    {
        kind: "x2bee",
        name: "X2BEE AI 체험하기",
        desc: "커머스에 특화된 AI 기능을 설치 없이 브라우저에서 바로 사용해보세요",
        href: "https://ai-exp.x2bee.com",
        external: true,
    },
];

/** 카드 상단 일러스트 — 사이트 일러스트 톤(브랜드 블루, 기하학적). */
function ExperienceArt({ kind }: { kind: ArtKind }) {
    if (kind === "x2bee") {
        // 브라우저 창 안의 AI 채팅 + 상품 카드 — "브라우저에서 바로 쓰는 커머스 AI"
        return (
            <svg
                viewBox="0 0 340 176"
                fill="none"
                className="h-full w-full"
                role="img"
                aria-label="브라우저에서 동작하는 커머스 AI"
            >
                <defs>
                    <linearGradient id="exp-x2bee" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00acee" />
                        <stop offset="1" stopColor="#185aea" />
                    </linearGradient>
                </defs>
                {/* 브라우저 창 */}
                <rect x="42" y="26" width="256" height="128" rx="14" fill="#ffffff" stroke="#cfe0f7" strokeWidth="1.5" />
                <path d="M42 40 a14 14 0 0 1 14 -14 h228 a14 14 0 0 1 14 14 v8 H42 Z" fill="#eef4fc" />
                <circle cx="60" cy="36" r="3" fill="#bcd0f5" />
                <circle cx="72" cy="36" r="3" fill="#bcd0f5" />
                <circle cx="84" cy="36" r="3" fill="#bcd0f5" />
                <rect x="104" y="31" width="150" height="10" rx="5" fill="#dbe7fb" />

                {/* AI 채팅 버블 (좌) */}
                <g>
                    <rect x="60" y="64" width="118" height="30" rx="10" fill="#f2f7ff" stroke="#d8e6fb" />
                    <circle cx="78" cy="79" r="8" fill="url(#exp-x2bee)" />
                    <path d="M78 74.5 l1.3 3 3 1.3 -3 1.3 -1.3 3 -1.3 -3 -3 -1.3 3 -1.3 Z" fill="#fff" />
                    <rect x="94" y="74" width="70" height="4.5" rx="2.25" fill="#c3d6f4" />
                    <rect x="94" y="83" width="52" height="4.5" rx="2.25" fill="#dbe7fb" />
                </g>
                <rect x="60" y="104" width="86" height="26" rx="10" fill="url(#exp-x2bee)" opacity="0.12" />
                <rect x="72" y="112" width="62" height="4.5" rx="2.25" fill="#9cc0f2" />

                {/* 상품 카드 2개 (우) */}
                {[194, 244].map((x) => (
                    <g key={x}>
                        <rect x={x} y="64" width="44" height="66" rx="9" fill="#ffffff" stroke="#d8e6fb" strokeWidth="1.5" />
                        <rect x={x + 8} y="72" width="28" height="24" rx="6" fill="#e7f1fe" />
                        <path d={`M${x + 14} 90 l5 -6 4 4 4 -5 5 7 Z`} fill="#9cc0f2" />
                        <rect x={x + 8} y="102" width="28" height="4" rx="2" fill="#cfe0f7" />
                        <rect x={x + 8} y="111" width="18" height="4" rx="2" fill="#00acee" opacity="0.55" />
                    </g>
                ))}

                {/* 스파클 */}
                <path d="M300 58 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z" fill="#7dd3fc" />
            </svg>
        );
    }
    // xgen — 중앙 허브 + 에이전트/도구 노드가 연결된 오케스트레이션
    return (
        <svg
            viewBox="0 0 340 176"
            fill="none"
            className="h-full w-full"
            role="img"
            aria-label="에이전트를 오케스트레이션하는 Agentic 플랫폼"
        >
            <defs>
                <linearGradient id="exp-xgen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
            </defs>
            {/* 연결선 */}
            <g stroke="#bcd5f3" strokeWidth="1.8" strokeLinecap="round">
                <path d="M170 88 L92 50" />
                <path d="M170 88 L92 128" />
                <path d="M170 88 L252 48" />
                <path d="M170 88 L256 96" />
                <path d="M170 88 L246 134" />
            </g>
            {/* 위성 노드 (에이전트/도구) */}
            {[
                { x: 92, y: 50, r: 15, f: "#ffffff", s: "#00acee" },
                { x: 92, y: 128, r: 13, f: "#ffffff", s: "#2f7bff" },
                { x: 252, y: 48, r: 13, f: "#ffffff", s: "#2f7bff" },
                { x: 256, y: 96, r: 11, f: "#e7f1fe", s: "#7dd3fc" },
                { x: 246, y: 134, r: 12, f: "#ffffff", s: "#00acee" },
            ].map((n, i) => (
                <g key={i}>
                    <circle cx={n.x} cy={n.y} r={n.r} fill={n.f} stroke={n.s} strokeWidth="2" />
                    <circle cx={n.x} cy={n.y} r={n.r / 3.2} fill={n.s} />
                </g>
            ))}
            {/* 중앙 허브 */}
            <circle cx="170" cy="88" r="30" fill="url(#exp-xgen)" />
            <circle cx="170" cy="88" r="30" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
            {/* 허브 내부 — 큐브/노드 심볼 */}
            <path d="M170 72 l16 8 v16 l-16 8 -16 -8 v-16 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
            <path d="M170 72 v16 M170 88 l16 -8 M170 88 l-16 -8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            {/* 스파클 */}
            <path d="M300 128 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z" fill="#7dd3fc" />
        </svg>
    );
}

export function HomeExperience() {
    return (
        <section id="live-demo" className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    / Live Demo
                </p>
                <h2 className="mt-3 max-w-3xl mx-auto text-center text-4xl font-semibold tracking-tight md:text-5xl">
                    지금 바로{" "}
                    <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                        체험해보세요
                    </span>
                </h2>
                <p className="mt-5 mx-auto max-w-2xl text-[17px] text-center leading-relaxed text-[var(--color-ink-muted)]">
                    설치 없이 브라우저에서 X2BEE AI와 XGEN Agentic AI Platform을 직접
                    사용해볼 수 있습니다
                </p>

                <div className="mt-12 grid gap-5 md:grid-cols-2">
                    {EXPERIENCES.map((it) => {
                        const cardCls =
                            "group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:-translate-y-0.5 hover:border-[#8fc4f4] hover:shadow-[0_22px_48px_-26px_rgba(24,90,234,0.4)]";
                        const inner = (
                            <>
                                {/* 일러스트 배너 */}
                                <div className="relative h-44 bg-gradient-to-br from-[#eef4fc] via-[#eaf5ff] to-[#e4f3ff] px-6 py-4">
                                    <ExperienceArt kind={it.kind} />
                                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[#cfe0f7] bg-white/80 px-2.5 py-1 text-[12px] font-semibold text-[#1f6fd0] backdrop-blur-sm">
                                        {it.external ? "새 탭에서 열림" : "무료 체험"}
                                        <ArrowUpRight className="h-3 w-3" />
                                    </span>
                                </div>

                                {/* 콘텐츠 */}
                                <div className="flex flex-1 flex-col items-center border-t border-[var(--color-line)] p-7 text-center">
                                    <h3 className="text-[21px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {it.name}
                                    </h3>
                                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {it.desc}
                                    </p>
                                    <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_22px_-8px_rgba(47,123,255,0.6)] transition group-hover:gap-3 group-hover:brightness-110">
                                        체험하기
                                        {it.external ? (
                                            <ArrowUpRight className="h-4 w-4" />
                                        ) : (
                                            <ArrowRight className="h-4 w-4" />
                                        )}
                                    </span>
                                </div>
                            </>
                        );
                        return it.external ? (
                            <a
                                key={it.name}
                                href={it.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cardCls}
                            >
                                {inner}
                            </a>
                        ) : (
                            <Link key={it.name} href={it.href} className={cardCls}>
                                {inner}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
