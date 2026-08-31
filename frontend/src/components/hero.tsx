"use client";

import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { localeHref } from "@/lib/locale-path";
import { categoryLabel } from "@/lib/blog-categories";
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

const SLIDE_COUNT = 5;
const ROTATE_MS = 6000;
/**
 * 슬라이드별 노출 시간.
 *
 * 첫 장(XGEN DeX)은 새 기능을 알리는 자리라 더 오래 둔다 — 배경 영상의 장면
 * 전환이 두 번 지나갈 만큼은 머물러야 「무엇이 새로운지」가 읽힌다.
 * 나머지는 기존 6초 그대로.
 */
const SLIDE_MS = [11000, ROTATE_MS, ROTATE_MS, ROTATE_MS, ROTATE_MS];

// Per-slide background videos (index matches the active slide).
// 순서: XGEN DeX → 툴킷 → 거버넌스 → XGEN 제품소개 → 연구소 정체성.
// DeX 를 맨 앞에 둔다 — 홈에 처음 온 사람에게 「AI 가 내 데스크톱에서 일한다」가
// 가장 설명 없이 와닿는 장면이고, 배경 영상도 실제 업무 책상이라 말과 그림이 맞는다.
// 그다음 오픈소스 툴킷을 두어 검색으로 도착한 개발자가 자기 경로를 찾게 한다.
// 배경은 슬라이드와 인덱스로 묶여 있으므로 순서를 바꿀 때 함께 옮긴다.
// 이미지 확장자(.jpg/.jpeg/.png/.webp)면 <img>로, 그 외(.mp4)는 배경 <video>로 렌더한다.
const SLIDE_BG = [
    "/hero-dex.mp4",
    "/hero-slide2.mp4",
    "/hero-security.jpeg",
    "/hero-xgen.mp4",
    "/hero-vision.jpeg",
];
const isImage = (src: string) => /\.(jpe?g|png|webp|avif|gif)$/i.test(src);
// Per-slide object-position (기본 중앙).
const SLIDE_POS = ["center", "center", "center", "center", "center"];
// Per-slide 추가 이동/확대(이미지 슬라이드용). 거버넌스 이미지는 피사체를 더
// 오른쪽으로 보내기 위해 살짝 확대(가장자리 빈틈 방지) 후 우측으로 이동시키고,
// 연구소 정체성 이미지는 좌하단으로 옮긴다. 값은 각 이미지에 맞춰 잡은 것이라
// 슬라이드 순서와 함께 이동한다.
const SLIDE_TRANSFORM: (string | undefined)[] = [
    undefined,
    undefined,
    "scale(1.3) translateX(16%)",
    undefined,
    "scale(1.3) translate(calc(-10% + 5px), 12%)",
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
    const { t, locale } = useI18n();
    // 기본 CTA는 라이브러리 갤러리로 보낸다. 예전 값은 "/#tools" 였는데 홈에는
    // ToolGrid(id="tools")가 없어 앵커가 비어 있었다 — 클릭해도 홈 상단에 머물렀다.
    const p = primary ?? {
        label: t.hero.browse,
        href: localeHref(locale, "/library-gallery"),
    };
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

/**
 * 슬라이드 1 — XGEN DeX (실제 업무 책상 배경).
 *
 * 「AI 를 도입한다」가 아니라 「내 자리에서 같이 일한다」를 말한다. 홈에 처음
 * 온 사람에게 설명 없이 와닿는 장면이 그쪽이고, 배경 영상도 실제 책상이라
 * 문장과 그림이 같은 것을 가리킨다.
 */
function DexSlide() {
    const { locale } = useI18n();
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                XGEN DeX · Desktop Experience
            </div>

            <h1 className={cn(H1_CLS, "mt-7")}>
                {locale === "ko" ? (
                    <>
                        사용자의 데스크톱에서
                        <br />
                        업무를 수행하는 AI Agent
                    </>
                ) : (
                    <>
                        An AI agent that does the work
                        <br />
                        on your desktop
                    </>
                )}
            </h1>

            <p className="mt-7 mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
                {/*
                  줄바꿈은 문장 경계에 둔다. 문장 중간에 두면 br 이 숨는 모바일에서
                  「서버의AI」처럼 붙는데, JSX 가 br 앞뒤 줄바꿈을 지워 공백이
                  사라지기 때문이다. {" "} 로 공백을 명시해 둔다.
                */}
                {locale === "ko" ? (
                    <>
                        기존 파일과 애플리케이션은 그대로 사용합니다.{" "}
                        <br className="hidden sm:block" />
                        XGEN DeX는 서버의 AI Agent를 사용자의 업무환경과 연결해{" "}
                        <br className="hidden sm:block" />
                        실제 업무를 수행하고 결과물을 완성합니다.
                    </>
                ) : (
                    <>
                        Your existing files and applications stay as they are.{" "}
                        <br className="hidden sm:block" />
                        XGEN DeX connects the agent on the server to your working
                        environment{" "}
                        <br className="hidden sm:block" />
                        to carry out real work and finish the deliverable.
                    </>
                )}
            </p>

            <HeroActions
                primary={{
                    label: locale === "ko" ? "DeX 주요 기능 보기" : "See DeX features",
                    href: localeHref(locale, "/xgen-dex"),
                }}
                secondary={{
                    label: locale === "ko" ? "XGEN 무료체험 신청" : "Start the XGEN free trial",
                    href: localeHref(locale, "/xgen-trial"),
                }}
            />
        </>
    );
}

/** 슬라이드 4 — XGEN 제품소개 (xgen.im 소개영상 배경). */
function XgenPlatformSlide() {
    const { locale } = useI18n();
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                XGEN · Agentic AI Platform
            </div>

            <h1 className={cn(H1_CLS, "mt-7")}>
                {locale === "ko" ? (
                    <>
                        기업의 AX 혁신을 돕는
                        <br />
                        Agentic AI Platform
                    </>
                ) : (
                    <>
                        The Agentic AI Platform
                        <br />
                        behind enterprise AX
                    </>
                )}
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
                {locale === "ko" ? (
                    <>
                        원하는 LLM과 인프라로 만드는 맞춤 Agentic AI 플랫폼 —
                        <br className="hidden sm:block" />
                        XGEN을 지금 직접 경험해보세요
                    </>
                ) : (
                    <>
                        An Agentic AI platform shaped to the LLMs and infrastructure
                        you already run —
                        <br className="hidden sm:block" />
                        try XGEN for yourself
                    </>
                )}
            </p>

            <HeroActions
                primary={{
                    label: locale === "ko" ? "XGEN 체험하기" : "Try XGEN",
                    href: localeHref(locale, "/xgen-trial"),
                }}
                secondary={{
                    label: locale === "ko" ? "제품 보기" : "See the product",
                    href: localeHref(locale, "/product"),
                }}
            />
        </>
    );
}

/** 슬라이드 4 — 연구소 정체성(Enterprise AI research vision). */
function VisionSlide() {
    const { locale } = useI18n();
    return (
        <>
            <h1 className={H1_CLS}>
                Researching the Future
                <br />
                of Enterprise AI
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
                {locale === "ko" ? (
                    <>
                        Plateer AI Labs는 단순한 AI 기능 개발을 넘어,
                        <br className="hidden sm:block" />
                        기업이 신뢰하고 운영할 수 있는 Enterprise AI의 표준을 연구합니다
                    </>
                ) : (
                    <>
                        Plateer AI Labs works past the feature race, researching
                        <br className="hidden sm:block" />
                        the standards that make enterprise AI dependable enough to run
                    </>
                )}
            </p>

            <HeroActions
                primary={{
                    label:
                        locale === "ko" ? "연구 영역 둘러보기" : "Explore our research",
                    href: localeHref(locale, "/research"),
                }}
                secondary={{
                    label: locale === "ko" ? "AI 기술 보기" : "See the technology",
                    href: localeHref(locale, "/technology"),
                }}
            />
        </>
    );
}

/** 슬라이드 1 — 오픈소스 툴킷 (original hero). */
function XgenSlide() {
    const { locale, t } = useI18n();
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.hero.badge(TOOLS.length)}
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
                {t.hero.desc(TOOLS.length)}
            </p>

            <HeroActions />
        </>
    );
}

/** 슬라이드 2 — 거버넌스 (가드레일·통제, /security-and-governance 참고). */
function SecuritySlide() {
    const { locale } = useI18n();
    return (
        <>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[13px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Security &amp; Governance
            </div>

            <h1 className={cn(H1_CLS, "mt-7")}>
                {locale === "ko" ? (
                    <>
                        선언한 대로 통제되는
                        <br />
                        Enterprise AI
                    </>
                ) : (
                    <>
                        Enterprise AI that behaves
                        <br />
                        the way you declared
                    </>
                )}
            </h1>

            <p className="mt-7 mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
                {locale === "ko" ? (
                    <>
                        가드 모델·개인정보 마스킹·금칙어 필터에 감사 로그와 AI 위험도
                        등급까지 —
                        <br className="hidden sm:block" />
                        규제 산업에서도 신뢰할 수 있는 다층 통제 위에서 AI를 운영합니다
                    </>
                ) : (
                    <>
                        Guard models, PII masking, and blocklist filters, plus audit
                        logs and AI risk grading —
                        <br className="hidden sm:block" />
                        layered controls that hold up in regulated industries
                    </>
                )}
            </p>

            <HeroActions
                primary={{
                    label:
                        locale === "ko"
                            ? "보안·거버넌스 보기"
                            : "Security and governance",
                    href: localeHref(locale, "/security-and-governance"),
                }}
                secondary={{
                    label:
                        locale === "ko"
                            ? "인증·품질 보기"
                            : "Certification and quality",
                    href: localeHref(locale, "/product#certification"),
                }}
            />
        </>
    );
}

type HeroPost = { slug: string; title: string; category: string; date: string };

// 카테고리 배지 라벨은 lib/blog-categories.ts 의 CATEGORY_LABEL 이 단일 출처다
// (예전에는 여기 영문 표만 따로 두어 한국어는 저장 값이 그대로 나왔다).
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
    const { locale } = useI18n();
    const [active, setActive] = useState(0);

    // 헤드라인 뉴스의 Tech Note 슬롯: 항상 최신 글을 세운다.
    // (예전에는 최근 5개 중 하나를 마운트 후 무작위로 바꿔 걸었는데, 새 글을 올려도
    // 홈에서 보일지가 운에 달려 있어 최신글 고정으로 바꿨다.)
    const latestPost = techPosts[0] ?? null;

    /*
      슬라이드마다 머무는 시간이 달라 setInterval 대신 setTimeout 을 다시 건다.
      active 가 바뀔 때마다 새로 걸리므로, 인디케이터를 눌러 옮긴 직후에도
      그 장의 시간을 온전히 준다 — 예전 interval 은 클릭과 무관하게 돌아서
      옮기자마자 넘어가 버리는 일이 있었다.
    */
    useEffect(() => {
        const id = setTimeout(
            () => setActive((a) => (a + 1) % SLIDE_COUNT),
            SLIDE_MS[active] ?? ROTATE_MS,
        );
        return () => clearTimeout(id);
    }, [active]);

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

    /**
     * 헤드라인 스트립의 실측 높이를 `--hero-band-h`로 내보낸다.
     * 슬라이드를 GNB와 이 스트립 사이 중앙에 두려면 스트립이 차지한 높이를 알아야 하는데,
     * 줄 수가 화면 폭에 따라 달라져(모바일에서는 일부 칸이 숨는다) 고정값을 쓸 수 없다.
     */
    const bandRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const band = bandRef.current;
        if (!band) return;
        const sync = () =>
            document.documentElement.style.setProperty(
                "--hero-band-h",
                `${Math.round(band.getBoundingClientRect().height)}px`,
            );
        sync();
        const ro = new ResizeObserver(sync);
        ro.observe(band);
        return () => ro.disconnect();
    }, []);

    return (
        <>
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050813] text-white">
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
                {/*
                  영상 배경 슬라이드(DeX·툴킷·XGEN 제품소개): 중앙 텍스트 뒤를
                  부드럽게 블러해 가독성을 지킨다. 이미지 배경 둘은 이미 어둡게
                  깔려 있어 필요 없다. 슬라이드 순서를 바꾸면 이 인덱스도 옮긴다.
                */}
                {(active === 0 || active === 1 || active === 3) && (
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

            {/* 슬라이드는 GNB 아래와 헤드라인 스트립 위 사이의 '남은 공간' 중앙에 온다.
                섹션이 items-center 라서, 위아래 패딩으로 두 요소가 차지한 자리를 비워 두면
                그 나머지 영역을 기준으로 가운데 정렬된다.
                - pt: 헤더 실측 높이(--nav-h, 프로모 배너 포함. site-nav가 세팅)
                - pb: 아래 헤드라인 스트립 실측 높이(--hero-band-h, 아래 useEffect가 세팅)
                예전에는 items-start + pt-[clamp(96px,18vh,288px)] 이라 창 높이에 따라
                콘텐츠가 위로 치우쳐 보였다. */}
            <div className="relative mx-auto w-full max-w-7xl px-6 pb-[var(--hero-band-h,132px)] pt-[var(--nav-h,84px)]">
                {/* rolling slides — fade/slide-in on change */}
                <div key={active} className="hero-slide-enter text-center">
                    {active === 0 ? (
                        <DexSlide />
                    ) : active === 1 ? (
                        <XgenSlide />
                    ) : active === 2 ? (
                        <SecuritySlide />
                    ) : active === 3 ? (
                        <XgenPlatformSlide />
                    ) : (
                        <VisionSlide />
                    )}
                </div>

                {/* slide indicators */}
                <div className="mt-12 flex items-center justify-center gap-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`${locale === "ko" ? "슬라이드" : "Slide"} ${i + 1}`}
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
                <div ref={bandRef} aria-label={locale === "ko" ? "최근 소식" : "Latest updates"} className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6">
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
                                        href={localeHref(locale, `/blog/${featuredPost.slug}`)}
                                        className="group flex min-w-0 items-center justify-start gap-3 py-3"
                                    >
                                        <span className="flex-none rounded-full bg-[#2f7bff] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white">
                                            {categoryLabel(featuredPost.category, locale)}
                                        </span>
                                        <p className="min-w-0 max-w-[400px] truncate text-[14px] font-semibold text-white group-hover:underline">
                                            {featuredPost.title}
                                        </p>
                                        <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                                    </Link>
                                )}
                                {latestCase && (
                                    <Link
                                        href={localeHref(locale, `/customers/case/${latestCase.slug}`)}
                                        className="group flex min-w-0 items-center justify-center gap-3 py-3"
                                    >
                                        <span className="flex-none rounded-full bg-emerald-400/15 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-emerald-300">
                                            {locale === "ko"
                                                ? "최근 고객 사례"
                                                : "Latest case"}
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
                                href={localeHref(locale, `/blog/${productNews.slug}`)}
                                className="group hidden min-w-0 items-center justify-start gap-3 py-3 sm:flex"
                            >
                                <span className="flex-none rounded-full bg-[#2f7bff] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white">
                                    {categoryLabel(productNews.category, locale)}
                                </span>
                                <p className="min-w-0 truncate text-[14px] font-semibold text-white group-hover:underline">
                                    {productNews.title}
                                </p>
                                <ArrowRight className="h-4 w-4 flex-none text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white" />
                            </Link>
                        )}
                        {latestIssue && (
                            <Link
                                href={localeHref(locale, `/newsletter/${latestIssue.slug}`)}
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
                                href={localeHref(locale, `/blog/${latestPost.slug}`)}
                                className="group hidden min-w-0 items-center justify-center gap-3 py-3 sm:flex"
                            >
                                <span className="flex-none rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white/75">
                                    {categoryLabel(latestPost.category, locale)}
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
