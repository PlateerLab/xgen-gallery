import Link from "next/link";
import { MilestoneRoadmap } from "@/components/milestone-roadmap";
import { AboutHeroVisual } from "@/components/about-hero-visual";
import { PATENTS } from "@/lib/patents";
import { CERTIFICATIONS } from "@/lib/certifications";
import { TOOLS } from "@/lib/tools";
import { PUBLICATIONS } from "@/lib/publications";
import {
    ShieldCheck,
    Server,
    Blocks,
    FlaskConical,
    Boxes,
    Layers,
    BadgeCheck,
    MessagesSquare,
    Award,
    BookOpen,
    Users,
    ArrowRight,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { organizationLd, breadcrumbLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * About — 연구소 정체성의 앵커(E-E-A-T). 미션 → 우리가 하는 일(연구·오픈소스·제품·실증)
 * → 신뢰의 근거(인증·오픈소스·논문) → 연혁 → 팀. "연구소가 만든 것을 제품으로 증명한다"
 * 서사를 서술한다.
 *
 * 한국어(`/about`)와 영어(`/en/about`) 두 라우트가 이 컴포넌트를 공유한다. 카피는
 * 아래 COPY 사전에 언어별로 나란히 두어 한쪽만 고치고 넘어가는 실수를 막는다.
 */
interface AboutCopy {
    hero: { eyebrow: string; title: string; desc: string };
    mission: {
        eyebrow: string;
        title: string;
        items: { icon: LucideIcon; title: string; desc: string }[];
    };
    pipeline: {
        title: string;
        desc: string;
        items: {
            icon: LucideIcon;
            title: string;
            /** 한국어판에서 제목 옆에 병기하는 영문 라벨(영어판은 생략). */
            sub?: string;
            desc: string;
            href: string;
        }[];
    };
    proof: {
        title: string;
        more: string;
        items: { icon: LucideIcon; title: string; desc: string; href: string }[];
    };
    /** 한눈에 — 스크롤 없이 규모를 먼저 보여주는 숫자 밴드 */
    glance: {
        title: string;
        lead: string;
        stats: { value: string; label: string; note: string }[];
    };
    /** 4.1 자체 기술 · 특허 보유현황 */
    patents: {
        title: string;
        lead: string;
        cols: { no: string; title: string; app: string; reg: string; country: string };
        note: string;
        certAlt: string;
        /** 특허증 이미지가 없는 건을 묶는 목록 카드 제목 */
        restTitle: string;
    };
    /** 4.2 국내 품질인증 획득 내용 */
    certs: {
        title: string;
        lead: string;
        cols: { agency: string; date: string };
        certAlt: string;
    };
    milestones: { title: string; items: { when: string; what: string }[] };
    team: {
        members: { title: string; desc: string; cta: string };
        company: { title: string; desc: string };
    };
    cta: { title: string; desc: string; trial: string; contact: string };
}

const COPY: Record<Locale, AboutCopy> = {
    ko: {
        hero: {
            eyebrow: "About · Plateer AI Labs",
            title: "신뢰할 수 있는 Enterprise AI를 연구합니다",
            desc: "Plateer AI Labs는 단순한 AI 기능 개발을 넘어, 기업이 신뢰하고 운영할 수 있는 Enterprise AI의 표준을 연구합니다. 연구소가 만든 것을 제품으로 증명합니다.",
        },
        mission: {
            eyebrow: "Mission",
            title: "우리가 푸는 세 가지 문제",
            items: [
                {
                    icon: ShieldCheck,
                    title: "신뢰할 수 있는 AI",
                    desc: "기업이 보유한 지식과 데이터에 근거해 답하고, 근거가 없으면 판단 불가를 선언합니다. 환각을 최소화하고 설명 가능한 AI를 만듭니다.",
                },
                {
                    icon: Server,
                    title: "기업 데이터 주권",
                    desc: "클라우드 종속 없이 고객 인프라에서 운영되는 온프레미스 중심 아키텍처를 연구합니다. 금융·공공·제조의 망분리 환경까지 대응합니다.",
                },
                {
                    icon: Blocks,
                    title: "조합하고 확장하는 AI",
                    desc: "Agent·Workflow·Knowledge·Tool을 모듈화해 업무 목적에 맞게 재조합하는 Composable AI를 연구합니다. 특정 벤더·모델에 종속되지 않습니다.",
                },
            ],
        },
        pipeline: {
            title: "연구에서 시작해, 다시 연구로 돌아옵니다",
            desc: "기초 연구를 오픈소스로 공개해 검증하고, 제품으로 잇고, 고객 현장에 적용합니다. 거기서 나온 피드백과 운영 데이터가 다음 연구의 출발점이 됩니다.",
            items: [
                {
                    icon: FlaskConical,
                    title: "연구",
                    sub: "Research",
                    desc: "Enterprise AI를 현실로 만드는 기초 연구",
                    href: "/research",
                },
                {
                    icon: Boxes,
                    title: "오픈소스",
                    sub: "Open Source",
                    desc: "MIT 라이선스로 공개해 누구나 검증할 수 있게",
                    href: "/library-gallery",
                },
                {
                    icon: Layers,
                    title: "XGEN 플랫폼",
                    sub: "AI Platform",
                    desc: "연구 성과를 Enterprise AI 플랫폼으로 제품화",
                    href: "/product",
                },
                {
                    icon: BadgeCheck,
                    title: "고객사 적용",
                    sub: "Customers",
                    desc: "현장에 적용해 비즈니스 가치로 연결",
                    href: "/customers",
                },
                {
                    icon: MessagesSquare,
                    title: "피드백",
                    sub: "Feedback",
                    desc: "사용자 피드백과 운영 데이터가 다음 연구로",
                    href: "/research",
                },
            ],
        },
        proof: {
            title: "신뢰의 근거",
            more: "자세히 보기",
            items: [
                {
                    icon: Award,
                    title: "인증·품질",
                    desc: "XGEN GS인증 1등급(최고 등급) 획득, AI 신뢰성 인증 AI-MASTER 진행 중",
                    href: "/product#certification",
                },
                {
                    icon: Boxes,
                    title: "오픈소스",
                    desc: "XGEN을 떠받치는 라이브러리를 오픈소스로 공개 — 설치·브라우저 체험 제공",
                    href: "/library-gallery",
                },
                {
                    icon: BookOpen,
                    title: "연구 성과",
                    desc: "구성원들이 학회·저널에 발표한 논문과 저서·감수 도서",
                    href: "/research#publications",
                },
            ],
        },
        glance: {
            title: "한눈에",
            lead: "연구소가 쌓아온 것을 숫자로 먼저 봅니다.",
            /*
             * 숫자는 데이터에서 직접 센다 — 손으로 적으면 항목이 늘어도 화면이
             * 그대로라 조용히 틀린 값이 남는다. GS 등급만 집계 대상이 아니다.
             */
            stats: [
                { value: `${PATENTS.length}`, label: "등록 특허", note: "추천·검색 중심으로 축적" },
                { value: `${TOOLS.length}`, label: "오픈소스 라이브러리", note: "설치·브라우저 체험 제공" },
                { value: `${PUBLICATIONS.length}`, label: "논문·저서", note: "학회·저널 게재와 감수 도서" },
                { value: "1등급", label: "GS 인증", note: "XGEN · X2BEE, 소프트웨어 품질 최고 등급" },
            ],
        },
        patents: {
            title: "특허로 축적한 기술",
            lead: "2014년 영상 처리에서 시작해 추천과 검색으로 이어졌고, 2024년 AI 대화형 추천까지 닿았습니다. 등록 특허 8건이 그 궤적을 그대로 보여줍니다.",
            cols: {
                no: "번호",
                title: "발명의 명칭",
                app: "출원일",
                reg: "등록일",
                country: "출원국",
            },
            note: "권리자 ㈜플래티어 · 출원국 대한민국. 등록일 최신순으로 정리했습니다.",
            certAlt: "특허청이 발급한 특허증",
            restTitle: "그 밖의 등록 특허",
        },
        certs: {
            title: "국내 품질인증 획득 내용",
            lead: "체계적인 품질 관리와 지속적인 고도화를 바탕으로 소프트웨어품질인증(GS) 1등급을 세 차례 획득했습니다. 공인 시험기관이 국제표준에 따라 시험한 결과입니다.",
            cols: { agency: "인증기관", date: "인증일" },
            certAlt: "공인 시험기관이 발급한 소프트웨어품질인증서",
        },
        /**
         * 이정표 — 커머스 플랫폼에서 Enterprise AI 플랫폼으로 넘어온 변곡점만 남긴다.
         * 버전 단위 릴리스 이력(V3.0·V3.5·V3.6…)과 프로젝트 산출물은 넣지 않는다.
         * 계보를 보여주는 자리이지 릴리스 노트가 아니다.
         */
        milestones: {
            title: "걸어온 길",
            items: [
                { when: "2026.07", what: "XGEN, GS(Good Software) 인증 1등급 획득" },
                { when: "2026.06", what: "AI 신뢰성 인증 AI-MASTER 인증 시험 착수" },
                {
                    when: "2025",
                    what: "XGEN AI 플랫폼 v1.0 — AI Agent를 만들고 운영하는 플랫폼으로",
                },
                {
                    when: "2024",
                    what: "X2BEE AI — LLM·생성형 AI를 커머스에 적용, AI Search와 AI Code Assistant 출시",
                },
                {
                    when: "2021",
                    what: "X2BEE로 전환 — Headless·MSA 아키텍처를 갖춘 커머스 플랫폼",
                },
                { when: "2010", what: "X2Commerce V1.0 — 커머스 플랫폼 사업 시작" },
                { when: "2005", what: "플래티어 설립" },
            ],
        },
        team: {
            members: {
                title: "Plateer AI Labs를 만드는 사람들",
                desc: "연구·엔지니어링으로 Enterprise AI를 현실로 만드는 멤버들을 소개합니다.",
                cta: "멤버 보러가기",
            },
            company: {
                title: "Plateer",
                desc: "Plateer AI Labs는 플래티어(Plateer)의 연구 조직입니다. 회사 소개를 확인하세요.",
            },
        },
        cta: {
            title: "함께 시작해 볼까요",
            desc: "XGEN을 무료로 체험하거나, PoC·기술 상담을 신청하세요.",
            trial: "XGEN 체험하기",
            contact: "도입·PoC 상담",
        },
    },
    en: {
        hero: {
            eyebrow: "About · Plateer AI Labs",
            title: "We research Enterprise AI that companies can trust and run",
            desc: "Plateer AI Labs works a step behind the feature race. We research the standards that make enterprise AI dependable enough to put into production — and we prove what the lab builds by shipping it as product.",
        },
        mission: {
            eyebrow: "Mission",
            title: "Three problems we work on",
            items: [
                {
                    icon: ShieldCheck,
                    title: "AI you can trust",
                    desc: "Answers grounded in your own knowledge and data — and an explicit “insufficient evidence” when that grounding isn't there. We minimize hallucination and keep the reasoning inspectable.",
                },
                {
                    icon: Server,
                    title: "Data sovereignty",
                    desc: "On-premise-first architecture that runs inside your own infrastructure, with no cloud lock-in. That includes the network-separated environments finance, public sector, and manufacturing actually operate in.",
                },
                {
                    icon: Blocks,
                    title: "Composable, extensible AI",
                    desc: "Agents, workflows, knowledge, and tools as modules you recombine for the job in front of you. No lock-in to a single vendor or model.",
                },
            ],
        },
        pipeline: {
            title: "What the lab builds, the product proves",
            desc: "One direction of travel: start with foundational research, validate it in the open, ship it as product, and prove it in customer environments and certification.",
            items: [
                {
                    icon: FlaskConical,
                    title: "Research",
                    desc: "Foundational work that makes Enterprise AI practical",
                    href: "/research",
                },
                {
                    icon: Boxes,
                    title: "Open Source",
                    desc: "The libraries underneath the research, published in the open",
                    href: "/library-gallery",
                },
                {
                    icon: Layers,
                    title: "Product",
                    desc: "Deployed in the field as XGEN, Polar, and AI Code Assistant",
                    href: "/product",
                },
                {
                    icon: BadgeCheck,
                    title: "Proof",
                    desc: "Results shown through customer projects and national certification",
                    href: "/customers",
                },
            ],
        },
        proof: {
            title: "Grounds for trust",
            more: "Read more",
            items: [
                {
                    icon: Award,
                    title: "Certification and quality",
                    desc: "XGEN holds Grade 1 GS (Good Software) certification, the highest grade in Korea's national software quality scheme. AI-MASTER reliability certification is in testing",
                    href: "/product#certification",
                },
                {
                    icon: Boxes,
                    title: "Open source",
                    desc: "The libraries that power XGEN are public — install them with pip or run them in the browser gallery",
                    href: "/library-gallery",
                },
                {
                    icon: BookOpen,
                    title: "Published research",
                    desc: "Papers our members have presented at conferences and journals, plus books authored and reviewed",
                    href: "/research#publications",
                },
            ],
        },
        glance: {
            title: "At a glance",
            lead: "What the lab has built, in numbers.",
            stats: [
                { value: `${PATENTS.length}`, label: "Registered patents", note: "Concentrated in recommendation and search" },
                { value: `${TOOLS.length}`, label: "Open-source libraries", note: "Installable, with in-browser demos" },
                { value: `${PUBLICATIONS.length}`, label: "Papers and books", note: "Journals, conferences, and edited volumes" },
                { value: "Grade 1", label: "GS certification", note: "XGEN and X2BEE, the top software quality grade" },
            ],
        },
        patents: {
            title: "Technology built up through patents",
            lead: "It began with image processing in 2014, moved through recommendation and search, and reached conversational AI recommendation in 2024. Eight registered patents trace that path.",
            cols: {
                no: "No.",
                title: "Title of invention",
                app: "Filed",
                reg: "Registered",
                country: "Country",
            },
            note: "Rights held by Plateer Co., Ltd. · Republic of Korea. Ordered by most recent registration.",
            certAlt: "Certificate of patent issued by the Korean Intellectual Property Office",
            restTitle: "Other registered patents",
        },
        certs: {
            title: "Software quality certifications",
            lead: "Systematic quality management and continuous improvement have earned Grade 1 GS software quality certification three times — tested by accredited labs against international standards.",
            cols: { agency: "Certified by", date: "Certified on" },
            certAlt: "Certificate of software quality issued by an accredited testing laboratory",
        },
        milestones: {
            title: "Our journey",
            items: [
                {
                    when: "2026.07",
                    what: "XGEN awarded Grade 1 GS (Good Software) certification",
                },
                {
                    when: "2026.06",
                    what: "Entered testing for AI-MASTER AI reliability certification",
                },
                {
                    when: "2025",
                    what: "XGEN AI Platform v1.0 — a platform for building and running AI agents",
                },
                {
                    when: "2024",
                    what: "X2BEE AI — LLMs and generative AI applied to commerce, with AI Search and AI Code Assistant",
                },
                {
                    when: "2021",
                    what: "Moved to X2BEE — a commerce platform on headless, MSA architecture",
                },
                {
                    when: "2010",
                    what: "X2Commerce V1.0 — the commerce platform business begins",
                },
                { when: "2005", what: "Plateer founded" },
            ],
        },
        team: {
            members: {
                title: "The people behind Plateer AI Labs",
                desc: "The researchers and engineers turning Enterprise AI into something you can actually deploy.",
                cta: "View members",
            },
            company: {
                title: "Plateer",
                desc: "Plateer AI Labs is the research arm of Plateer. Visit the company site to learn more.",
            },
        },
        cta: {
            title: "Let's get started",
            desc: "Try XGEN free, or request a PoC and technical consultation.",
            trial: "Try XGEN",
            contact: "Talk about a PoC",
        },
    },
};

export function AboutPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const en = locale === "en";
    const href = (path: string) => localeHref(locale, path);

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    organizationLd(locale),
                    breadcrumbLd([
                        { name: "Home", path: locale === "en" ? "/en" : "/" },
                        {
                            name: "About",
                            path: locale === "en" ? "/en/about" : "/about",
                        },
                    ]),
                ]}
            />

            {/*
              히어로와 본문을 하나의 사진 위에 올린다 — 둘을 다른 배경으로 나누면
              스크롤할 때 페이지가 두 장으로 끊겨 읽힌다. 사진은 뷰포트에 고정되어
              본문이 그 위를 지나간다.
            */}
            <div
                className="photo-bg photo-bg-page"
                style={
                    {
                        "--photo": "url(/bg/bg-research-brain.webp)",
                    } as React.CSSProperties
                }
            >
            {/* Hero */}
            {/* 배경·베일은 바깥 래퍼가 전담한다 — 여기서 따로 덮으면 경계가 생긴다 */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden py-28 text-white">
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-16">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]">
                        <div>
                            <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                                {t.hero.eyebrow}
                            </p>
                            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                                {t.hero.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                                {t.hero.desc}
                            </p>
                        </div>
                        {/*
                          좁은 화면에서는 감춘다 — 성좌가 줄어들면 라벨이 뭉개져
                          장식만 남고, 본문 파이프라인 섹션이 같은 내용을 글로 전한다.
                        */}
                        <AboutHeroVisual className="hidden h-[520px] w-full lg:block" />
                    </div>
                </div>
            </section>

            {/*
              각 섹션이 저마다 불투명한 배경색을 가지면 사진이 가려지므로, 색은
              걷어내고 구분은 border-t 에 맡긴다.
            */}
            <main>
                {/*
                  한눈에 — Executive Summary 의 첫 화면. 3분 안에 이해시켜야 하므로
                  서사보다 규모를 먼저 보여준다. 카드로 감싸지 않고 사진 위에 숫자만
                  올려 아래 카드 섹션들과 강약을 만든다.
                */}
                <section>
                    <div className="mx-auto max-w-7xl px-6 pb-4 pt-16">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.glance.title}
                        </p>
                        <p className="mt-3 text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.glance.lead}
                        </p>
                        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                            {t.glance.stats.map((s) => (
                                <div key={s.label} className="text-center">
                                    <dt className="text-[40px] font-bold leading-none tracking-tight text-[var(--color-ink)] md:text-[52px]">
                                        {s.value}
                                    </dt>
                                    <dd className="mt-3">
                                        <span className="block text-[15px] font-bold text-[var(--color-ink)]">
                                            {s.label}
                                        </span>
                                        <span className="mt-1 block text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {s.note}
                                        </span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Mission */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.mission.eyebrow}
                        </p>
                        <h2 className="mt-3 mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.mission.title}
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.mission.items.map((m) => (
                                <div
                                    key={m.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white">
                                        <m.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {m.title}
                                    </h3>
                                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {m.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 우리가 하는 일 — 파이프라인 */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.pipeline.title}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.pipeline.desc}
                        </p>
                        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {t.pipeline.items.map((p, i) => (
                                <li key={p.title} className="relative">
                                    <Link
                                        href={href(p.href)}
                                        className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <p.icon className="h-5 w-5" />
                                            </span>
                                            <span className="font-mono text-[13px] font-bold text-[var(--color-ink-subtle)]">
                                                0{i + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {p.title}
                                            {p.sub && (
                                                <>
                                                    {" "}
                                                    <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                                        {p.sub}
                                                    </span>
                                                </>
                                            )}
                                        </h3>
                                        <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {p.desc}
                                        </p>
                                    </Link>
                                    {i < t.pipeline.items.length - 1 && (
                                        <span
                                            aria-hidden
                                            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--color-line-strong)] lg:inline-flex"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/*
                  후반부는 두 번째 사진으로 넘어간다 — 미션·연구 이야기(두뇌·데이터)에서
                  증거와 기록(문서·체크리스트)으로 내용이 바뀌는 지점이라 배경도 함께
                  바꾼다. 위 배경 위에 겹쳐 깔리므로 경계에서 자연스럽게 교체된다.
                */}
                <div
                    className="photo-bg photo-bg-page photo-bg-body"
                    style={
                        {
                            "--photo": "url(/bg/bg-research-docs.webp)",
                        } as React.CSSProperties
                    }
                >
                {/* 신뢰의 근거 + 연혁 */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.proof.title}
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.proof.items.map((p) => (
                                <Link
                                    key={p.title}
                                    href={href(p.href)}
                                    className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <p.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                        {t.proof.more}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/*
                          4.1 자체 기술 · 특허 보유현황 — 특허증 실물을 함께 보여준다.
                          번호와 날짜만 나열하면 목록이지만, 증서가 붙으면 근거가 된다.
                        */}
                        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-white/75 p-7 backdrop-blur-sm">
                            <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.patents.title}
                            </h3>
                            <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.patents.lead}
                            </p>

                            {/*
                              특허증 이미지가 있는 건만 카드로 편다. 이미지가 없는 건을
                              같은 형태로 두면 빈 자리가 생겨 "빠뜨렸나" 싶게 읽힌다.
                              그래서 나머지는 아래 목록 카드 하나로 묶는다.
                            */}
                            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {PATENTS.filter((p) => p.cert).map((p) => (
                                    <li
                                        key={p.regNo}
                                        className="flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-5"
                                    >
                                        <span className="font-mono text-[12px] font-bold text-[#1f4fa8]">
                                            {p.regNo.replace(/-00-00$/, "")}
                                        </span>
                                        <h4 className="mt-1.5 text-[15px] font-bold leading-snug text-[var(--color-ink)]">
                                            {en ? p.titleEn : p.title}
                                        </h4>
                                        <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {en ? p.descEn : p.desc}
                                        </p>

                                        <img
                                            src={p.cert}
                                            alt={t.patents.certAlt}
                                            loading="lazy"
                                            className="mt-4 w-full rounded-lg border border-[var(--color-line)] bg-white"
                                        />

                                        <dl className="mt-4 space-y-1 border-t border-[var(--color-line)] pt-3 text-[12px] text-[var(--color-ink-muted)]">
                                            <div className="flex gap-2">
                                                <dt className="w-12 flex-none font-semibold">
                                                    {t.patents.cols.app}
                                                </dt>
                                                <dd className="font-mono">{p.appDate}</dd>
                                            </div>
                                            <div className="flex gap-2">
                                                <dt className="w-12 flex-none font-semibold">
                                                    {t.patents.cols.reg}
                                                </dt>
                                                <dd className="font-mono">{p.regDate}</dd>
                                            </div>
                                        </dl>
                                    </li>
                                ))}
                            </ul>

                            {PATENTS.some((p) => !p.cert) && (
                                <div className="mt-4 rounded-xl border border-[var(--color-line)] bg-white p-5">
                                    <h4 className="text-[14px] font-bold text-[var(--color-ink)]">
                                        {t.patents.restTitle}
                                    </h4>
                                    <ul className="mt-3 divide-y divide-[var(--color-line)]">
                                        {PATENTS.filter((p) => !p.cert).map((p) => (
                                            <li
                                                key={p.regNo}
                                                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4"
                                            >
                                                <span className="w-28 flex-none font-mono text-[12px] font-bold text-[#1f4fa8]">
                                                    {p.regNo.replace(/-00-00$/, "")}
                                                </span>
                                                <span className="flex-1 text-[14px] font-semibold leading-snug text-[var(--color-ink)]">
                                                    {en ? p.titleEn : p.title}
                                                </span>
                                                <span className="flex-none font-mono text-[12px] text-[var(--color-ink-muted)]">
                                                    {p.regDate}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p className="mt-4 text-[12.5px] text-[var(--color-ink-subtle)]">
                                {t.patents.note}
                            </p>
                        </div>

                        {/* 4.2 국내 품질인증 획득 내용 */}
                        <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white/75 p-7 backdrop-blur-sm">
                            <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.certs.title}
                            </h3>
                            <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.certs.lead}
                            </p>

                            <ul className="mt-7 grid gap-4 md:grid-cols-3">
                                {CERTIFICATIONS.map((c) => (
                                    <li
                                        key={c.no}
                                        className="flex flex-col rounded-xl border border-[var(--color-line)] bg-white p-5"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-[#2f7bff] px-2.5 py-0.5 text-[11px] font-bold text-white">
                                                {en ? c.gradeEn : c.grade}
                                            </span>
                                            <span className="font-mono text-[12px] font-bold text-[#1f4fa8]">
                                                {c.no}
                                            </span>
                                        </div>
                                        <h4 className="mt-3 text-[15px] font-bold leading-snug text-[var(--color-ink)]">
                                            {en ? c.nameEn : c.name}
                                        </h4>
                                        <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {en ? c.descEn : c.desc}
                                        </p>

                                        <img
                                            src={c.cert}
                                            alt={t.certs.certAlt}
                                            loading="lazy"
                                            className="mt-4 w-full rounded-lg border border-[var(--color-line)] bg-white"
                                        />

                                        <dl className="mt-4 space-y-1 border-t border-[var(--color-line)] pt-3 text-[12px] text-[var(--color-ink-muted)]">
                                            <div className="flex gap-2">
                                                <dt className="w-12 flex-none font-semibold">
                                                    {t.certs.cols.agency}
                                                </dt>
                                                <dd>{en ? c.agencyEn : c.agency}</dd>
                                            </div>
                                            <div className="flex gap-2">
                                                <dt className="w-12 flex-none font-semibold">
                                                    {t.certs.cols.date}
                                                </dt>
                                                <dd className="font-mono">{c.date}</dd>
                                            </div>
                                        </dl>
                                        {(en ? c.noteEn : c.note) && (
                                            <p className="mt-2 text-[11.5px] leading-relaxed text-[var(--color-ink-subtle)]">
                                                {en ? c.noteEn : c.note}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 연혁 */}
                        {/* 배경 사진은 main 전체에 깔린다 — 여기서는 흰 카드로 로드맵을 띄운다 */}
                        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-white/75 p-7 backdrop-blur-sm">
                            <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.milestones.title}
                            </h3>
                            {/*
                              데이터는 최신순으로 두되(다른 화면과 정렬 기준을 맞춘다),
                              로드맵은 왼쪽이 과거이므로 뒤집어 넘긴다.
                            */}
                            <MilestoneRoadmap
                                items={[...t.milestones.items].reverse()}
                            />
                        </div>
                    </div>
                </section>

                {/* 팀 + Company + CTA */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Link
                                href={href("/members")}
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5]"
                            >
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <Users className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.team.members.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.team.members.desc}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                    {t.team.members.cta}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </Link>

                            <a
                                href="https://www.plateer.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5]"
                            >
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <Blocks className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.team.company.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.team.company.desc}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                    plateer.com
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>
                            </a>
                        </div>

                        {/* CTA */}
                        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.cta.title}
                                </h3>
                                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.cta.desc}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={href("/xgen-trial")}
                                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                                >
                                    {t.cta.trial}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={href("/contact") + "?from=about"}
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
                                >
                                    {t.cta.contact}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </main>
            </div>

            <SiteFooter />
        </>
    );
}
