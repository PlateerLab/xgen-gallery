"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
// import { CustomerMarquee } from "@/components/customer-marquee"; // 임시 주석 처리
import { cn } from "@/lib/cn";

function XgenMark() {
    return (
        <span className="relative inline-block">
            XGEN
            <span className="absolute -bottom-1 left-0 right-0 h-[6px] bg-[#00acee]/60" />
        </span>
    );
}

const SLIDE_COUNT = 4;
const ROTATE_MS = 6000;

// Per-slide background videos (index matches the active slide).
// 연구소 정체성(Research Vision)을 첫 슬라이드로 두어 "연구소가 만든 것을 제품으로
// 증명한다"는 서사를 살린다. XGEN 소개영상(hero-xgen.mp4, xgen.im 공식)은 두 번째.
// 이미지 확장자(.jpg/.jpeg/.png/.webp)면 <img>로, 그 외(.mp4)는 배경 <video>로 렌더한다.
const SLIDE_BG = [
    "/hero-vision.jpeg",
    "/hero-xgen.mp4",
    "/hero-security.jpeg",
    "/hero-slide2.mp4",
];
const isImage = (src: string) => /\.(jpe?g|png|webp|avif|gif)$/i.test(src);
// Per-slide object-position (기본 중앙).
const SLIDE_POS = ["center", "center", "center", "center"];
// Per-slide 추가 이동/확대(이미지 슬라이드용). 3번째(보안) 이미지는 피사체를 더
// 오른쪽으로 보내기 위해 살짝 확대(가장자리 빈틈 방지) 후 우측으로 이동시킨다.
const SLIDE_TRANSFORM: (string | undefined)[] = [
    undefined,
    undefined,
    "scale(1.3) translateX(16%)",
    undefined,
];

const H1_CLS =
    "mx-auto max-w-5xl text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]";

/** CTA buttons — defaults to the XGEN toolkit pair; per-slide overridable. */
function HeroActions({
    primary,
    secondary,
}: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string; external?: boolean };
} = {}) {
    const { t } = useI18n();
    const p = primary ?? { label: t.hero.browse, href: "/#tools" };
    const s = secondary ?? {
        label: t.hero.viewGithub,
        href: "https://github.com/PlateerLab",
        external: true,
    };
    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
                href={p.href}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[16px] font-semibold text-[#070b1c] transition hover:bg-white/90"
            >
                {p.label}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
                href={s.href}
                {...(s.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-white/10"
            >
                {s.label}
            </Link>
        </div>
    );
}

/** Slide 0 — XGEN Agentic AI Platform (xgen.im 소개영상 배경). */
function XgenPlatformSlide() {
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                XGEN · Agentic AI Platform
            </div>

            <h1 className={cn(H1_CLS, "mt-7")}>
                기업의 AX 혁신을 돕는
                <br />
                Agentic AI Platform
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
                원하는 LLM과 인프라로 만드는 맞춤 Agentic AI 플랫폼 —
                <br className="hidden sm:block" />
                XGEN을 지금 직접 경험해보세요
            </p>

            <HeroActions
                primary={{ label: "XGEN 체험하기", href: "/xgen-trial" }}
                secondary={{ label: "제품 보기", href: "/product" }}
            />
        </>
    );
}

/** Slide 1 — Enterprise AI research vision. */
function VisionSlide() {
    return (
        <>
            <h1 className={H1_CLS}>
                Researching the Future
                <br />
                of Enterprise AI
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
                Plateer Labs는 단순한 AI 기능 개발을 넘어,
                <br className="hidden sm:block" />
                기업이 신뢰하고 운영할 수 있는 Enterprise AI의 표준을 연구합니다
            </p>

            <HeroActions
                primary={{ label: "연구 영역 둘러보기", href: "/research" }}
                secondary={{ label: "AI 기술 보기", href: "/technology" }}
            />
        </>
    );
}

/** Slide 2 — the XGEN toolkit pitch (original hero). */
function XgenSlide() {
    const { locale, t } = useI18n();
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.hero.badge}
            </div>

            <h1 className={cn(H1_CLS, "mt-7")}>
                {locale === "ko" ? (
                    <>
                        <XgenMark />을 움직이는
                        <br />
                        AI 툴킷
                    </>
                ) : (
                    <>
                        The AI toolkit
                        <br />
                        behind <XgenMark />
                    </>
                )}
            </h1>

            <p className="mt-7 mx-auto max-w-xl text-xl leading-relaxed text-white/70">
                {t.hero.desc}
            </p>

            <HeroActions />
        </>
    );
}

/** Slide 2 — Security & Governance (가드레일·통제, /security-and-governance 참고). */
function SecuritySlide() {
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Security &amp; Governance
            </div>

            <h1 className={cn(H1_CLS, "mt-7")}>
                선언한 대로 통제되는
                <br />
                Enterprise AI
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
                가드 모델·개인정보 마스킹·금칙어 필터에 감사 로그와 AI 위험도
                등급까지 —
                <br className="hidden sm:block" />
                규제 산업에서도 신뢰할 수 있는 다층 통제 위에서 AI를 운영합니다
            </p>

            <HeroActions
                primary={{
                    label: "보안·거버넌스 보기",
                    href: "/security-and-governance",
                }}
                secondary={{ label: "인증·품질 보기", href: "/product#certification" }}
            />
        </>
    );
}

type HeroPost = { slug: string; title: string; category: string; date: string };
type HeroIssue = { slug: string; title: string; vol: number; date: string };

export function Hero({
    productNews,
    latestPost,
    latestIssue,
}: {
    productNews?: HeroPost | null;
    latestPost?: HeroPost | null;
    latestIssue?: HeroIssue | null;
}) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setActive((a) => (a + 1) % SLIDE_COUNT),
            ROTATE_MS,
        );
        return () => clearInterval(id);
    }, []);

    // 활성 슬라이드 영상만 재생하고 나머지는 일시정지한다. 3개 영상을 동시에
    // 디코딩하면 보이는 영상이 끊기거나 멈춘 것처럼 보이므로, 디코딩 부하를 1개로
    // 낮춘다.
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            if (i === active) {
                const p = v.play();
                if (p) p.catch(() => {});
            } else {
                // 크로스페이드(1s) 동안은 계속 재생해 전환을 매끄럽게 하고, 완전히
                // 가려진 뒤에 정지해 정상 상태의 디코딩 부하를 1개로 유지한다.
                const t = setTimeout(() => v.pause(), 1100);
                timers.push(t);
            }
        });
        return () => timers.forEach((t) => clearTimeout(t));
    }, [active]);

    return (
        <>
        <section className="relative flex min-h-[calc(100vh-80px)] items-start overflow-hidden bg-[#050813] text-white">
            {/* main background videos — crossfade between slides */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {SLIDE_BG.map((src, i) =>
                    isImage(src) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={src}
                            src={src}
                            alt=""
                            style={{
                                objectPosition: SLIDE_POS[i],
                                transform: SLIDE_TRANSFORM[i],
                            }}
                            className={cn(
                                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                                i === active ? "opacity-100" : "opacity-0",
                            )}
                        />
                    ) : (
                        <video
                            key={src}
                            ref={(el) => {
                                videoRefs.current[i] = el;
                            }}
                            autoPlay={i === 0}
                            loop
                            muted
                            playsInline
                            preload="auto"
                            style={{ objectPosition: SLIDE_POS[i] }}
                            className={cn(
                                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                                i === active ? "opacity-100" : "opacity-0",
                            )}
                        >
                            <source src={src} type="video/mp4" />
                        </video>
                    ),
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050813]/80 via-[#050813]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050813]/55 to-transparent" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-64">
                {/* rolling slides — fade/slide-in on change */}
                <div key={active} className="hero-slide-enter text-center">
                    {active === 0 ? (
                        <VisionSlide />
                    ) : active === 1 ? (
                        <XgenPlatformSlide />
                    ) : active === 2 ? (
                        <SecuritySlide />
                    ) : (
                        <XgenSlide />
                    )}
                </div>

                {/* slide indicators */}
                <div className="mt-12 flex items-center justify-center gap-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`슬라이드 ${i + 1}`}
                            aria-current={i === active}
                            className={cn(
                                "h-2 rounded-full transition-all",
                                i === active
                                    ? "w-6 bg-[#00acee]"
                                    : "w-2 bg-white/40 hover:bg-white/70",
                            )}
                        />
                    ))}
                </div>
            </div>

        </section>

            {/* 헤드라인 뉴스 — 키비주얼 아래 별도 밴드(배경 박스 없이 제품소식·뉴스레터만) */}
            {(productNews || latestPost || latestIssue) && (
                <section aria-label="최근 소식" className="bg-[#070b1c] py-4">
                    <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-2 px-6 sm:grid-cols-3">
                        {productNews && (
                            <Link
                                href={`/blog/${productNews.slug}`}
                                className="group flex items-center justify-center gap-3 py-3"
                            >
                                <span className="flex-none rounded-full bg-[#2f7bff] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white">
                                    {productNews.category}
                                </span>
                                <p className="min-w-0 truncate text-[14px] font-semibold text-white group-hover:underline">
                                    {productNews.title}
                                </p>
                                <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                            </Link>
                        )}
                        {latestIssue && (
                            <Link
                                href={`/newsletter/${latestIssue.slug}`}
                                className="group flex items-center justify-center gap-3 py-3"
                            >
                                <span className="flex-none rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white/75">
                                    vol.{latestIssue.vol}
                                </span>
                                <p className="min-w-0 truncate text-[14px] font-semibold text-white group-hover:underline">
                                    {latestIssue.title}
                                </p>
                                <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                            </Link>
                        )}
                        {latestPost && (
                            <Link
                                href={`/blog/${latestPost.slug}`}
                                className="group flex items-center justify-center gap-3 py-3"
                            >
                                <span className="flex-none rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white/75">
                                    {latestPost.category}
                                </span>
                                <p className="min-w-0 truncate text-[14px] font-semibold text-white group-hover:underline">
                                    {latestPost.title}
                                </p>
                                <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                            </Link>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
