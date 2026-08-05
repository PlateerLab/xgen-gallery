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
    "scale(1.3) translate(calc(-10% + 5px), 12%)",
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
type HeroCase = { slug: string; text: string };

export function Hero({
    featuredPost,
    productNews,
    techPosts = [],
    latestIssue,
    latestCase,
}: {
    /** 스트립 맨 윗줄 좌측에 세우는 대표 글(최신 제품 소식). */
    featuredPost?: HeroPost | null;
    productNews?: HeroPost | null;
    /** 최근 Tech Note 후보(최신순, 최대 5개) — 이 중 하나를 무작위 노출한다. */
    techPosts?: HeroPost[];
    latestIssue?: HeroIssue | null;
    /** 가장 최근 고객사례 — 상세(/customers/case/*)로 바로 랜딩. */
    latestCase?: HeroCase | null;
}) {
    const [active, setActive] = useState(0);

    // 헤드라인 뉴스의 Tech Note 슬롯: 방문할 때마다 최근 글 중 하나를 무작위로.
    // 서버/최초 렌더는 최신 글로 고정해 하이드레이션 불일치를 피하고, 마운트 후
    // 무작위로 교체한다(정적 빌드라 서버에서 뽑으면 값이 고정되어 버린다).
    const [techIdx, setTechIdx] = useState(0);
    useEffect(() => {
        if (techPosts.length > 1) {
            setTechIdx(Math.floor(Math.random() * techPosts.length));
        }
    }, [techPosts.length]);
    const latestPost = techPosts[techIdx] ?? techPosts[0] ?? null;

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
        <section className="relative flex min-h-screen items-start overflow-hidden bg-[#050813] text-white">
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
                {/* 1·3번째 슬라이드: 중앙 텍스트 뒤 배경을 부드럽게 블러(가독성) */}
                {(active === 0 || active === 2) && (
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 backdrop-blur-[5px]"
                        style={{
                            WebkitMaskImage:
                                "radial-gradient(46% 42% at 50% 44%, #000 45%, transparent 78%)",
                            maskImage:
                                "radial-gradient(46% 42% at 50% 44%, #000 45%, transparent 78%)",
                        }}
                    />
                )}
            </div>

            {/* pt는 창 높이에 따라 줄인다 — 고정 pt-72(288px)면 노트북처럼 낮은 창에서
                안쪽 콘텐츠가 100vh를 넘어 섹션이 늘어나고, 하단에 absolute로 붙인
                헤드라인 스트립이 화면 밖으로 밀려 아예 안 보였다.
                pb는 그 스트립(2줄 기준 약 110px) 자리를 미리 비워 둔다. */}
            <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-[clamp(96px,18vh,288px)]">
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

            {/* 헤드라인 뉴스 — 키비주얼 위에 얹은 반투명 오버레이(영상이 비쳐 보임) */}
            {(featuredPost || productNews || latestPost || latestIssue || latestCase) && (
                <div aria-label="최근 소식" className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6">
                    <div className="mx-auto max-w-6xl rounded-2xl border border-white/12 bg-white/[0.07] px-6 py-1 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md">
                        {/* 윗줄 — 가장 알리고 싶은 두 가지(대표 글 · 최근 고객 사례).
                            아래 3단(제품 소식·뉴스레터·Tech Note)과 구분선으로 분리한다.
                            대표 글은 최신 제품 소식이고, 아래 3단의 제품 소식 칸은 그
                            다음 글을 집는다 — 같은 글이 한 화면에 두 번 걸리지 않게. */}
                        {(featuredPost || latestCase) && (
                            <div className="grid gap-x-8 gap-y-1 border-b border-white/10 sm:grid-cols-2">
                                {featuredPost && (
                                    // min-w-0 필수 — 그리드 항목은 기본 min-width:auto라
                                    // 안쪽 flex의 min-content 폭만큼 벌어져 카드를 뚫는다.
                                    // justify-start — 윗줄은 2단, 아랫줄은 3단이라 열 너비가
                                    // 달라서 가운데 정렬하면 두 '제품 소식' 배지의 x가
                                    // 어긋난다. 첫 열끼리는 왼쪽 기준으로 붙여 맞춘다.
                                    <Link
                                        href={`/blog/${featuredPost.slug}`}
                                        className="group flex min-w-0 items-center justify-start gap-3 py-3"
                                    >
                                        <span className="flex-none rounded-full bg-[#2f7bff] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white">
                                            {featuredPost.category}
                                        </span>
                                        <p className="min-w-0 max-w-[400px] truncate text-[14px] font-semibold text-white group-hover:underline">
                                            {featuredPost.title}
                                        </p>
                                        <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                                    </Link>
                                )}
                                {latestCase && (
                                    <Link
                                        href={`/customers/case/${latestCase.slug}`}
                                        className="group flex min-w-0 items-center justify-center gap-3 py-3"
                                    >
                                        <span className="flex-none rounded-full bg-emerald-400/15 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-emerald-300">
                                            최근 고객 사례
                                        </span>
                                        {/* 폭을 400px로 묶어 길게 보여주되 뒤는 말줄임 처리 */}
                                        <p className="min-w-0 max-w-[400px] truncate text-[14px] font-semibold text-white group-hover:underline">
                                            {latestCase.text}
                                        </p>
                                        <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                                    </Link>
                                )}
                            </div>
                        )}
                    <div className="grid gap-x-8 gap-y-1 sm:grid-cols-3">
                        {productNews && (
                            // 모바일은 세로로 쌓여 히어로 CTA를 가리므로, 윗줄에 대표 글이
                            // 선 만큼 그 다음 제품 소식은 sm 미만에서 감춘다.
                            // justify-start — 윗줄 첫 열의 '제품 소식'과 x를 맞춘다.
                            <Link
                                href={`/blog/${productNews.slug}`}
                                className="group hidden min-w-0 items-center justify-start gap-3 py-3 sm:flex"
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
                                className="group flex min-w-0 items-center justify-center gap-3 py-3"
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
                            // 모바일은 세로로 쌓여 히어로 CTA를 가리므로, 고객사례 줄이
                            // 추가된 만큼 무작위 노출인 Tech Note를 sm 미만에서 감춘다.
                            <Link
                                href={`/blog/${latestPost.slug}`}
                                className="group hidden min-w-0 items-center justify-center gap-3 py-3 sm:flex"
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
                    </div>
                </div>
            )}
        </section>
        </>
    );
}
