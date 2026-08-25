import Link from "next/link";
import { MilestoneRoadmap } from "@/components/milestone-roadmap";
import { AboutHeroVisual } from "@/components/about-hero-visual";
import { PATENTS } from "@/lib/patents";
import { CERTIFICATIONS } from "@/lib/certifications";
import { CustomerStrip, CUSTOMER_COUNT } from "@/components/customer-strip";
import { INDUSTRIES, PRODUCTS } from "@/lib/customers";
import { IndustryIcon } from "@/components/industry-icon";
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
    /**
     * 원칙 — 무엇을 푸는가가 아니라 어떤 기준으로 설계하는가를 말하는 자리다.
     * 연구소의 방향성을 먼저 보여주고, 뒤이어 오는 파이프라인·제품이 그 근거가 된다.
     */
    mission: {
        eyebrow: string;
        title: string;
        lead: string;
        items: { icon: LucideIcon; title: string; desc: string }[];
    };
    pipeline: {
        title: string;
        desc: string;
        /** 마지막 단계에서 첫 단계로 되돌아오는 화살표에 붙는 라벨 */
        loop: string;
        items: {
            icon: LucideIcon;
            title: string;
            /** 한국어판에서 제목 옆에 병기하는 영문 라벨(영어판은 생략). */
            sub?: string;
            desc: string;
            href: string;
        }[];
    };
    /**
     * 왜 믿을 수 있는가 — 앞 섹션들이 "누구인가·무엇을 만드는가"를 말했다면
     * 여기는 그 근거를 댄다. 세 카드는 같은 층위로 맞춘다: 검증된 것 / 공개된 것 /
     * 축적된 것. 카드마다 근거 태그를 달아 주장이 아니라 사실로 읽히게 한다.
     */
    proof: {
        title: string;
        more: string;
        items: {
            icon: LucideIcon;
            title: string;
            desc: string;
            tags: string[];
            href: string;
        }[];
    };
    /** 한눈에 — 스크롤 없이 규모를 먼저 보여주는 숫자 밴드 */
    glance: {
        title: string;
        lead: string;
        stats: { value: string; label: string; note: string }[];
    };
    /** 무엇을 만드는가 — 제품 라인업 */
    stack: { title: string; lead: string; more: string; core: string };
    /** 어디에 적용하는가 — 산업별 */
    deliver: { title: string; lead: string };
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
            /* 영문 슬로건이 한글 제목 위에 얹힌다 — 세 단어가 곧 아래 순환 구조다 */
            eyebrow: "Research. Build. Deliver.",
            title: "연구를 넘어, Enterprise AI를 완성합니다",
            desc: "Plateer AI Labs는 핵심 기술을 연구하는 데 그치지 않습니다. 오픈소스와 XGEN으로 제품화하고, 고객 환경에 적용하며, 운영 경험을 다시 연구에 반영합니다. 우리는 Enterprise AI의 전 과정을 직접 만들어 갑니다.",
        },
        mission: {
            eyebrow: "Principles",
            title: "Enterprise AI를 위한 세 가지 핵심 원칙",
            lead: "기업이 AI를 도입할 때 가장 중요한 것은 모델이 아니라 운영 환경입니다. Plateer AI Labs는 기업 환경에서 반드시 해결해야 하는 세 가지 과제를 중심으로 Enterprise AI를 연구합니다.",
            items: [
                {
                    icon: Server,
                    title: "데이터 주권과 보안",
                    desc: "기업 데이터는 기업 안에서 안전하게 관리되어야 합니다. 온프레미스와 망분리 환경에서도 운영 가능한 AI 아키텍처를 연구합니다.",
                },
                {
                    icon: ShieldCheck,
                    title: "신뢰할 수 있는 AI",
                    desc: "기업 데이터에 근거한 답변과 출처를 제공하고, 충분한 근거가 없을 때는 추측 대신 판단을 보류하는 AI를 지향합니다.",
                },
                {
                    icon: Blocks,
                    title: "확장 가능한 AI Platform",
                    desc: "Agent와 Workflow, Knowledge, Tool을 유연하게 조합해 다양한 업무와 시스템에 적용할 수 있는 개방형 AI 플랫폼을 연구합니다.",
                },
            ],
        },
        pipeline: {
            title: "연구에서 시작해, 다시 연구로 돌아옵니다",
            desc: "기초 연구를 오픈소스로 공개해 검증하고, 제품으로 잇고, 고객 현장에 적용합니다. 거기서 나온 피드백과 운영 데이터가 다음 연구의 출발점이 됩니다.",
            loop: "다시 연구로",
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
            title: "Plateer AI Labs를 신뢰하는 이유",
            more: "자세히 보기",
            items: [
                {
                    icon: Award,
                    title: "검증된 품질",
                    desc: "GS 인증 1등급과 AI 신뢰성 인증을 통해 Enterprise AI 플랫폼의 품질을 객관적으로 검증받고 있습니다.",
                    tags: [
                        `GS 인증 1등급 ${CERTIFICATIONS.length}건`,
                        "AI-MASTER 진행 중",
                    ],
                    href: "/product#certification",
                },
                {
                    icon: Boxes,
                    title: "공개된 기술",
                    desc: "XGEN의 핵심 기술을 오픈소스로 공개하여 누구나 설치하고 체험할 수 있도록 제공합니다.",
                    tags: [
                        `오픈소스 ${TOOLS.length}개`,
                        "GitHub",
                        "브라우저 데모",
                    ],
                    href: "/library-gallery",
                },
                {
                    icon: BookOpen,
                    title: "축적된 전문성",
                    desc: "논문과 저서, 학회 발표, 등록 특허로 Enterprise AI 연구 성과를 지속적으로 공유하고 있습니다.",
                    tags: [
                        `논문·저서 ${PUBLICATIONS.length}건`,
                        `등록 특허 ${PATENTS.length}건`,
                    ],
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
                {
                    value: `${PATENTS.length + CERTIFICATIONS.length}`,
                    label: "등록 특허 및 인증",
                    note: `특허 ${PATENTS.length}건 · GS 인증 1등급 ${CERTIFICATIONS.length}건`,
                },
                { value: `${TOOLS.length}`, label: "오픈소스 라이브러리", note: "설치·브라우저 체험 제공" },
                { value: `${PUBLICATIONS.length}`, label: "논문·저서", note: "학회·저널 게재와 감수 도서" },
                { value: `${CUSTOMER_COUNT}`, label: "고객 검증", note: "XGEN·X2BEE 구축·운영 — 금융·공공·커머스·유통" },
            ],
        },
        stack: {
            title: "무엇을 만드는가",
            lead: "연구 성과는 세 갈래 제품으로 이어집니다. 각각 다른 문제를 풀지만 같은 연구 기반 위에 서 있습니다.",
            more: "자세히 보기",
            core: "공통 연구 기반",
        },
        deliver: {
            title: "어디에 적용하는가",
            lead: "금융과 공공, 커머스, IT·제조 현장에 적용했습니다. 산업마다 데이터와 규제가 달라 적용 방식도 달라집니다.",
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
            title: "Research. Build. Deliver.",
            desc: "Plateer AI Labs does not stop at researching core technology. We turn it into product through open source and XGEN, apply it in customer environments, and feed what we learn in operation back into research. We build the whole arc of enterprise AI ourselves.",
        },
        mission: {
            eyebrow: "Mission",
            title: "Three principles for enterprise AI",
            lead: "What matters most when a company adopts AI is not the model but the environment it runs in. Plateer AI Labs researches enterprise AI around the three problems every enterprise environment has to solve.",
            items: [
                {
                    icon: Server,
                    title: "Data sovereignty and security",
                    desc: "Enterprise data should stay under enterprise control. We research AI architecture that runs on-premise, including the network-separated environments many organizations operate in.",
                },
                {
                    icon: ShieldCheck,
                    title: "AI you can trust",
                    desc: "Answers grounded in your own data, with sources attached — and a held judgment rather than a guess when the grounding is not there.",
                },
                {
                    icon: Blocks,
                    title: "An extensible AI platform",
                    desc: "Agents, workflows, knowledge, and tools combined freely, so the platform stays open to different kinds of work and different systems.",
                },
            ],
        },
        pipeline: {
            title: "What the lab builds, the product proves",
            desc: "One direction of travel: start with foundational research, validate it in the open, ship it as product, and prove it in customer environments and certification.",
            loop: "Back to research",
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
            title: "Why customers trust Plateer AI Labs",
            more: "Read more",
            items: [
                {
                    icon: Award,
                    title: "Verified quality",
                    desc: "Grade 1 GS certification and AI reliability certification put the platform's quality through independent, accredited testing.",
                    tags: [
                        `${CERTIFICATIONS.length} Grade 1 GS certifications`,
                        "AI-MASTER in testing",
                    ],
                    href: "/product#certification",
                },
                {
                    icon: Boxes,
                    title: "Technology in the open",
                    desc: "The core technology behind XGEN is published as open source, so anyone can install it and try it.",
                    tags: [
                        `${TOOLS.length} open-source libraries`,
                        "GitHub",
                        "Browser demos",
                    ],
                    href: "/library-gallery",
                },
                {
                    icon: BookOpen,
                    title: "Accumulated expertise",
                    desc: "Papers, books, conference talks, and registered patents keep the research in public view.",
                    tags: [
                        `${PUBLICATIONS.length} papers and books`,
                        `${PATENTS.length} registered patents`,
                    ],
                    href: "/research#publications",
                },
            ],
        },
        glance: {
            title: "At a glance",
            lead: "What the lab has built, in numbers.",
            stats: [
                {
                    value: `${PATENTS.length + CERTIFICATIONS.length}`,
                    label: "Patents and certifications",
                    note: `${PATENTS.length} patents · ${CERTIFICATIONS.length} Grade 1 GS certifications`,
                },
                { value: `${TOOLS.length}`, label: "Open-source libraries", note: "Installable, with in-browser demos" },
                { value: `${PUBLICATIONS.length}`, label: "Papers and books", note: "Journals, conferences, and edited volumes" },
                { value: `${CUSTOMER_COUNT}`, label: "Validated with customers", note: "XGEN and X2BEE deployments across finance, public, commerce, and retail" },
            ],
        },
        stack: {
            title: "What we build",
            lead: "Research turns into three products. They solve different problems but stand on the same research base.",
            more: "Learn more",
            core: "Shared research foundation",
        },
        deliver: {
            title: "Where we deliver",
            lead: "Applied in finance, the public sector, commerce, and IT and manufacturing. Data and regulation differ by industry, so the approach does too.",
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
                            {/*
                              국문 화면에서는 이 줄이 영문 슬로건이라 제목만큼 크게
                              둔다. 영문 화면에서는 같은 문구가 h1 로 내려가므로 이
                              줄은 원래대로 작은 라벨이다.
                            */}
                            <p
                                className={
                                    en
                                        ? "text-[16px] font-semibold tracking-tight text-[#7dd3fc]"
                                        : "text-[22px] font-bold tracking-tight text-[#7dd3fc] md:text-[28px]"
                                }
                            >
                                {t.hero.eyebrow}
                            </p>
                            <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                                {t.hero.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">
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
                  Trusted by — 히어로 바로 다음에 고객사 로고를 둔다. 처음 온 사람이
                  "누가 쓰는가"를 미션보다 먼저 확인한다. 메인에서 쓰는 컴포넌트를
                  그대로 재사용해 명단이 갈라지지 않게 한다.
                */}
                <CustomerStrip locale={locale} />

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
                        <p className="mt-4 mx-auto max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.mission.lead}
                        </p>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
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
                        {/*
                          다섯 단계를 한 줄로 세우고 아래로 되돌아오는 화살표를 그린다.
                          5개를 4열 그리드에 넣으면 마지막 하나만 다음 줄로 떨어져
                          흐름이 끊긴다. 고리라는 사실도 보이지 않는다.
                        */}
                        <div className="relative mt-12">
                            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
                                {t.pipeline.items.map((p, i) => (
                                    <li key={p.title} className="relative">
                                        <Link
                                            href={href(p.href)}
                                            className="group flex h-full flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white px-4 py-6 text-center transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                        >
                                            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <p.icon className="h-6 w-6" />
                                                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2f7bff] font-mono text-[10px] font-bold text-white">
                                                    {i + 1}
                                                </span>
                                            </span>
                                            <h3 className="mt-4 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {p.title}
                                            </h3>
                                            {p.sub && (
                                                <span className="mt-0.5 font-mono text-[11px] font-semibold text-[#2461d8]">
                                                    {p.sub}
                                                </span>
                                            )}
                                            <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {p.desc}
                                            </p>
                                        </Link>
                                        {i < t.pipeline.items.length - 1 && (
                                            <span
                                                aria-hidden
                                                className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 text-[#2f7bff] lg:inline-flex"
                                            >
                                                <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ol>

                            {/* 되돌아오는 길 — 마지막 단계에서 첫 단계로 */}
                            <div
                                aria-hidden
                                className="pointer-events-none relative mt-3 hidden h-14 lg:block"
                            >
                                <svg
                                    className="h-full w-full"
                                    viewBox="0 0 1000 56"
                                    preserveAspectRatio="none"
                                    fill="none"
                                >
                                    <path
                                        d="M910 0 V28 Q910 44 894 44 H106 Q90 44 90 28 V6"
                                        stroke="#2f7bff"
                                        strokeWidth="2.5"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <path
                                        d="M84 14 L90 4 L96 14"
                                        stroke="#2f7bff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                                <span className="absolute left-1/2 top-[19px] -translate-x-1/2 bg-[var(--color-surface)] px-3 text-[12.5px] font-semibold text-[#2461d8]">
                                    {t.pipeline.loop}
                                </span>
                            </div>
                        </div>
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
                {/*
                  무엇을 만드는가 — 연구만 하는 곳이 아니라는 점을 제품으로 보여준다.
                  제품 메타는 customers.ts 의 PRODUCTS 를 그대로 쓴다 — 고객 사례
                  화면과 같은 출처라 제품명·태그라인이 갈라지지 않는다.
                */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.stack.title}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.stack.lead}
                        </p>
                        {/*
                          트라이앵글 구도 — XGEN 을 위 꼭짓점에 두고 Polar·Code
                          Assistant 를 아래 두 꼭짓점에 놓는다. 가운데에는 셋을 잇는
                          연구 기반을 그린다. 나란한 3열로 두면 세 제품이 대등해
                          보이는데, 실제로는 XGEN 이 플랫폼이고 나머지가 그 위에 선다.
                        */}
                        <div className="relative mx-auto mt-12 max-w-4xl">
                            {/* 세 꼭짓점을 잇는 삼각형 — 큰 화면에서만 그린다 */}
                            <svg
                                aria-hidden
                                className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
                                viewBox="0 0 800 520"
                                preserveAspectRatio="none"
                                fill="none"
                            >
                                <path
                                    d="M400 120 L150 400 M400 120 L650 400 M150 400 L650 400"
                                    stroke="#bcd0f5"
                                    strokeWidth="1.5"
                                    strokeDasharray="5 6"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>

                            {/* 위 꼭짓점 — 플랫폼 */}
                            <div className="relative flex justify-center">
                                <Link
                                    href={href(PRODUCTS.xgen.href)}
                                    className="group flex w-full max-w-[300px] flex-col items-center rounded-2xl border-2 border-[#2f7bff] bg-white p-7 text-center shadow-[0_18px_44px_-24px_rgba(20,40,80,0.3)] transition hover:-translate-y-0.5"
                                >
                                    <span className="inline-flex h-2 w-12 rounded-full bg-[#2f7bff]" />
                                    <h3 className="mt-5 text-[24px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {PRODUCTS.xgen.name}
                                    </h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {PRODUCTS.xgen.tagline}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                        {t.stack.more}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </Link>
                            </div>

                            {/* 가운데 — 셋을 떠받치는 연구 기반 */}
                            <div className="relative my-7 flex justify-center">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5">
                                    <FlaskConical className="h-4 w-4 text-[#2f7bff]" />
                                    <span className="text-[13.5px] font-bold text-[var(--color-ink)]">
                                        {t.stack.core}
                                    </span>
                                </span>
                            </div>

                            {/* 아래 두 꼭짓점 */}
                            <div className="relative grid gap-4 sm:grid-cols-2">
                                {[PRODUCTS.polar, PRODUCTS["code-assistant"]].map((p) => (
                                    <Link
                                        key={p.key}
                                        href={href(p.href)}
                                        className="group flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-7 text-center transition hover:-translate-y-0.5 hover:border-[#bcd0f5]"
                                    >
                                        <span
                                            className="inline-flex h-2 w-12 rounded-full"
                                            style={{ backgroundColor: p.accent }}
                                        />
                                        <h3 className="mt-5 text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {p.name}
                                        </h3>
                                        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {p.tagline}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2">
                                            {t.stack.more}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/*
                  어디에 적용하는가 — 산업 목록은 customers.ts 의 INDUSTRIES 를 쓴다.
                  각 항목은 해당 산업의 고객 사례 목록으로 보낸다.
                */}
                <section className="border-t border-[var(--color-line)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.deliver.title}
                        </h2>
                        <p className="mt-4 mx-auto max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.deliver.lead}
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {/* 링크를 걸지 않는다 — 어느 산업에 적용했는지 보여주는 자리이지 고객 사례로 보내는 자리가 아니다 */}
                            {Object.values(INDUSTRIES).map((ind) => (
                                <div
                                    key={ind.key}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <IndustryIcon kind={ind.key} className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {en ? ind.en : ind.ko}
                                    </h3>
                                    <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {en ? ind.blurbEn : ind.blurb}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

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
                                    {/* 근거 태그 — 주장이 아니라 셀 수 있는 사실로 받친다 */}
                                    <ul className="mt-4 flex flex-wrap gap-1.5">
                                        {p.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className="rounded-full border border-[#bcd0f5] bg-[#2f7bff]/[0.06] px-2.5 py-1 text-[12px] font-semibold text-[#1f4fa8]"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
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
