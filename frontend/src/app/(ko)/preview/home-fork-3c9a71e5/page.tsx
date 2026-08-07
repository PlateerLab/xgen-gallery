import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Boxes, Building2, Terminal } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TOOLS } from "@/lib/tools";

/**
 * 홈 이탈 개선 시안 — 오픈소스 의도와 엔터프라이즈 의도를 히어로 직후에 가른다.
 *
 * 배경: 홈은 지금 XGEN 플랫폼 서사로 시작하고 오픈소스 섹션은 7번째다. `pip install`
 * 쪽을 보러 온 방문자는 거기까지 내려가지 않는다. 검색 유입은 의도를 서버에서 알 수
 * 없으므로(구글이 검색어를 넘기지 않음) 리다이렉트 대신 본인이 고르게 한다.
 *
 * 검토용 히든 페이지 — noindex, 사이트 내 링크 없음.
 */
export const metadata: Metadata = {
    title: "홈 분기 시안 (검토용)",
    robots: { index: false, follow: false },
};

const N = TOOLS.length;

function Label({ n, title, note }: { n: string; title: string; note: string }) {
    return (
        <div className="mx-auto max-w-7xl px-6 pb-4 pt-16">
            <p className="font-mono text-[12px] uppercase tracking-widest text-[#2461d8]">
                시안 {n}
            </p>
            <h2 className="mt-1.5 text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                {title}
            </h2>
            <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                {note}
            </p>
        </div>
    );
}

/** 히어로 하단을 흉내 낸 다크 배경 — 실제 배치 위치를 가늠하기 위한 것. */
function HeroTail({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#070b1c]">
            <div className="mx-auto max-w-7xl px-6 pb-10 pt-8 text-center">
                <p className="text-[13px] text-white/25">
                    ↑ 히어로 캐러셀 (기존) — 아래가 새로 들어가는 자리
                </p>
            </div>
            {children}
        </div>
    );
}

/* ── 시안 A — 분기 밴드 ─────────────────────────────────────────── */
function VariantA() {
    const cards = [
        {
            icon: Building2,
            eyebrow: "For enterprises",
            title: "XGEN Agentic AI Platform",
            desc: "원하는 LLM과 온프레미스·망분리 인프라 위에서 AI 에이전트를 설계·운영합니다",
            cta: "제품 보기",
            href: "/product",
            accent: "#2f7bff",
        },
        {
            icon: Terminal,
            eyebrow: "For developers",
            title: `오픈소스 라이브러리 ${N}종`,
            desc: "XGEN을 떠받치는 파이썬 라이브러리. MIT 라이선스, pip 설치, 브라우저에서 바로 실행",
            cta: "라이브러리 갤러리",
            href: "/library-gallery",
            accent: "#0f766e",
        },
    ];
    return (
        <HeroTail>
            <div className="mx-auto max-w-7xl px-6 pb-16">
                <div className="grid gap-4 md:grid-cols-2">
                    {cards.map((c) => (
                        <Link
                            key={c.title}
                            href={c.href}
                            className="group rounded-2xl border border-white/12 bg-white/[0.04] p-7 transition hover:border-white/30 hover:bg-white/[0.07]"
                        >
                            <span
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                                style={{ backgroundColor: `${c.accent}26`, color: "#fff" }}
                            >
                                <c.icon className="h-5 w-5" />
                            </span>
                            <p className="mt-4 font-mono text-[12px] uppercase tracking-widest text-white/45">
                                {c.eyebrow}
                            </p>
                            <h3 className="mt-1.5 text-[21px] font-bold tracking-tight text-white">
                                {c.title}
                            </h3>
                            <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">
                                {c.desc}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-white transition group-hover:gap-2.5">
                                {c.cta}
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </HeroTail>
    );
}

/* ── 시안 B — 히어로 CTA 옆 세 번째 링크 ────────────────────────── */
function VariantB() {
    return (
        <HeroTail>
            <div className="mx-auto max-w-7xl px-6 pb-20">
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[16px] font-semibold text-[#070b1c]">
                        XGEN 체험하기
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[16px] font-semibold text-white">
                        제품 보기
                    </span>
                    <Link
                        href="/library-gallery"
                        className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-semibold text-[#7dd3fc] underline-offset-4 transition hover:underline"
                    >
                        <Boxes className="h-4 w-4" />
                        오픈소스 라이브러리 {N}종
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
                <p className="mt-4 text-center text-[13px] text-white/30">
                    (앞의 두 버튼은 기존 그대로 — 세 번째 링크만 추가)
                </p>
            </div>
        </HeroTail>
    );
}

/* ── 시안 C — 얇은 세그먼트 바 ──────────────────────────────────── */
function VariantC() {
    return (
        <HeroTail>
            <div className="border-t border-white/10 bg-white/[0.03]">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3 px-6 py-5">
                    <span className="text-[15px] text-white/55">
                        무엇을 찾고 계신가요?
                    </span>
                    <Link
                        href="/product"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[14.5px] font-semibold text-white transition hover:bg-white/10"
                    >
                        엔터프라이즈 AI 플랫폼
                    </Link>
                    <Link
                        href="/library-gallery"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[14.5px] font-semibold text-white transition hover:bg-white/10"
                    >
                        오픈소스 라이브러리 {N}종
                    </Link>
                </div>
            </div>
        </HeroTail>
    );
}

export default function HomeForkPreviewPage() {
    return (
        <>
            <SiteNav />
            <main className="pb-24">
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-12">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            / 검토용 시안 · 색인 제외
                        </p>
                        <h1 className="mt-2 text-[30px] font-bold tracking-tight text-[var(--color-ink)] md:text-[38px]">
                            홈에서 두 갈래를 즉시 가르기
                        </h1>
                        <p className="mt-4 max-w-3xl text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            검색으로 홈에 도착한 방문자의 의도는 서버에서 알 수 없습니다 —
                            구글이 검색어를 넘겨주지 않기 때문입니다. 그래서 의도를 추정해
                            보내는 대신, 히어로 직후에 두 갈래를 보여주고 본인이 고르게 합니다.
                            리다이렉트가 없어 색인에 영향이 없고, 되돌리기도 쉽습니다.
                        </p>
                        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink-subtle)]">
                            아래 세 시안은 <b>배치 위치와 무게</b>만 다릅니다. 다크 배경 부분이
                            히어로 바로 아래 자리입니다.
                        </p>
                    </div>
                </section>

                <Label
                    n="A"
                    title="분기 밴드 — 2열 카드"
                    note="가장 무게가 큽니다. 오픈소스 경로를 엔터프라이즈와 동등하게 세웁니다. 히어로 캐러셀이 무엇을 보여주든 이 카드는 항상 같은 자리에 있어, 내려가지 않아도 두 갈래가 보입니다. 대신 첫 화면에서 CustomerStrip·체험 배너가 한 칸씩 밀립니다."
                />
                <VariantA />

                <Label
                    n="B"
                    title="히어로 CTA 옆 텍스트 링크"
                    note="가장 작은 변경입니다. 기존 버튼 두 개는 그대로 두고 보조 링크만 답니다. 레이아웃이 밀리지 않지만, 캐러셀이 다른 슬라이드로 넘어가면 CTA가 슬라이드별로 바뀌므로 이 링크를 모든 슬라이드에 유지할지 결정이 필요합니다."
                />
                <VariantB />

                <Label
                    n="C"
                    title="얇은 세그먼트 바"
                    note="중간 무게입니다. 한 줄만 차지해 레이아웃 영향이 작고, 질문형이라 의도 선택이라는 걸 분명히 알립니다. 다만 배너처럼 보여 무시될 수 있고, 히어로 CTA와 역할이 겹쳐 보일 수 있습니다."
                />
                <VariantC />

                <section className="mx-auto max-w-7xl px-6 pt-16">
                    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7">
                        <h2 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                            판단에 필요한 것
                        </h2>
                        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            <li>
                                · 이탈률 40.4%의 원인은 아직 확정되지 않았습니다. 제목 교체
                                말고도 새 유입 채널·봇 트래픽이 같은 그림을 만듭니다
                            </li>
                            <li>
                                · GA4에서 <b>페이지 경로 × 세션 소스/매체 × 이탈률</b>을
                                7/8~7/26과 7/27~8/6 두 구간으로 비교하면 원인이 갈립니다
                            </li>
                            <li>
                                · 세 시안 모두 원인과 무관하게 손해가 없어, 원인 확정 전에
                                먼저 적용해도 되는 종류의 변경입니다
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
