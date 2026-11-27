import Link from "next/link";
import {
    ChevronRight,
    ChevronDown,
    BrainCircuit,
    Network,
    ShieldCheck,
    Boxes,
    Award,
} from "lucide-react";
import { FeatureTabs, type FeatureTab } from "@/components/home-v2/feature-tabs";
import { HeroStage } from "@/components/home-v2/hero-stage";
import { PlateerCustomerBand } from "@/components/home-v2/plateer-customer-band";
import { PRODUCT_PROFILES } from "@/lib/product-profiles";
import { XGEN_GS_CERTIFICATION } from "@/lib/certifications";
import { INDUSTRIES, CASE_STATUS_EN, type CaseStudy, type IndustryKey } from "@/lib/customers";
import { TOOLS } from "@/lib/tools";
import { categoryLabel } from "@/lib/blog-categories";
import { localeHref } from "@/lib/locale-path";
import { dict, type Locale } from "@/lib/i18n";

/**
 * 메인 v2 — Microsoft Teams 제품 페이지 구성을 XGEN에 맞춘 레이아웃.
 *
 *  1 밝은 2단 히어로(좌 카피·CTA 2개 / 우 제품 화면)  2 근거 지표  3 고객 로고
 *  4 기능 탭  5 확장 카드  6 고객 사례  7 품질·보안  8 도입 방식(플랜 카드)
 *  9 리소스  10 FAQ  11 마지막 CTA 띠
 *
 * 문구는 product-profiles·고객사례·인증 데이터에 이미 있는 내용만 쓴다(새 주장 금지).
 * 기존 홈 섹션 파일은 그대로 두어 언제든 되돌릴 수 있다(pages/home-page.tsx 참고).
 */

const P = PRODUCT_PROFILES.xgen;

type Post = { slug: string; title: string; category: string; date: string; thumb?: string; cover?: string };

const PAD = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";
const BTN_PRIMARY =
    "inline-flex h-11 items-center justify-center rounded-[4px] bg-[#185aea] px-6 text-[15px] font-semibold text-white transition hover:bg-[#1249c2]";
const BTN_SECONDARY =
    "inline-flex h-11 items-center justify-center rounded-[4px] border border-[var(--color-ink)] bg-white px-6 text-[15px] font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-surface-hover)]";
const LINK = "group inline-flex items-center gap-1 text-[15px] font-semibold text-[#185aea] hover:underline";

const C = {
    ko: {
        eyebrow: "XGEN · 기업형 에이전틱 AI 플랫폼",
        trial: "XGEN 무료로 체험하기",
        contact: "도입 상담",
        trialNote: "15일 체험 · 설치 없이 브라우저에서 시작합니다",
        featTitle: "XGEN으로 할 수 있는 일",
        featLead: "만들고, 연결하고, 승인받고, 운영하는 과정을 하나의 플랫폼에서 진행합니다.",
        more: "자세히 알아보기",
        extTitle: "XGEN을 받치는 핵심 기술",
        caseEyebrow: "고객 사례",
        caseMore: "사례 자세히 보기",
        caseAll: "전체 고객 사례",
        byIndustry: "산업별 사례",
        gsTitle: "국가 공인 제3자 시험으로 품질을 확인했습니다",
        gsLead: "XGEN은 GS(Good Software) 인증 1등급을 받았습니다. 공인 시험기관이 ISO/IEC 25000 계열 표준을 기준으로 제품 명세서·사용자 설명서·실행 소프트웨어를 시험했습니다.",
        certNo: "인증번호",
        gsMore: "인증·품질 자세히 보기",
        secMore: "보안·거버넌스 보기",
        planTitle: "도입 방식을 고르세요",
        planTrial: {
            name: "15일 체험",
            desc: "설치 없이 브라우저에서 XGEN을 직접 사용해 봅니다.",
            rows: ["브라우저 접속", "체험용 환경 제공", "체험 범위 안에서 주요 기능 사용"],
        },
        planOnprem: "온프레미스",
        planOnpremDesc: "고객사 데이터센터와 GPU에 설치해 운영합니다.",
        planAirgap: "폐쇄망",
        planAirgapDesc: "인터넷과 분리된 내부망에서 운영합니다.",
        resTitle: "새로 올라온 글",
        resAll: "블로그 전체 보기",
        faqTitle: "자주 묻는 질문",
        libCount: (n: number) => `공개 라이브러리 ${n}개`,
    },
    en: {
        eyebrow: "XGEN · Enterprise Agentic AI Platform",
        trial: "Try XGEN free",
        contact: "Talk to us",
        trialNote: "15-day trial · starts in your browser, nothing to install",
        featTitle: "What you can do with XGEN",
        featLead: "Build, connect, approve, and operate — on one platform.",
        more: "Learn more",
        extTitle: "The technology underneath XGEN",
        caseEyebrow: "Customer story",
        caseMore: "Read the case",
        caseAll: "All customer stories",
        byIndustry: "By industry",
        gsTitle: "Quality checked by an accredited third party",
        gsLead: "XGEN holds Grade 1 GS (Good Software) certification. An accredited lab tested the product specification, user documentation, and running software against the ISO/IEC 25000 series.",
        certNo: "Certificate No.",
        gsMore: "More on certification",
        secMore: "Security & governance",
        planTitle: "Choose how to deploy",
        planTrial: {
            name: "15-day trial",
            desc: "Use XGEN directly in your browser, with nothing to install.",
            rows: ["Browser access", "A trial environment is provided", "Core features within the trial scope"],
        },
        planOnprem: "On-premise",
        planOnpremDesc: "Installed and run on your data center and GPUs.",
        planAirgap: "Air-gapped",
        planAirgapDesc: "Runs on an internal network isolated from the internet.",
        resTitle: "Latest from the blog",
        resAll: "View the blog",
        faqTitle: "Frequently asked questions",
        libCount: (n: number) => `${n} public libraries`,
    },
};

function featureTabs(locale: Locale): FeatureTab[] {
    const ko = locale === "ko";
    const more = C[locale].more;
    const b = (id: string) => P.bento.find((x) => x.id === id)!;
    return [
        {
            key: "vibe",
            label: "Vibe Coding in DexOn",
            title: b("vibe").title[locale],
            desc: b("vibe").desc[locale],
            points: ko
                ? ["자연어 중심의 바이브코딩", "코드를 직접 다루는 풀코딩", "Agent와 업무용 App 제작"]
                : ["Natural-language vibe coding", "Hands-on full coding", "Build agents and business apps"],
            img: "/product/dexon-vibe-coding-video.jpg",
            imgAlt: P.hero.main.alt[locale],
            sub: { img: "/product/dexon-full-coding-video.jpg", alt: b("vibe").imgAlt![locale] },
            href: "/vibe-coding",
            more,
        },
        {
            key: "dexon",
            label: "DexOn",
            title: ko
                ? "PC에서 시작한 업무를 태블릿·핸드폰에서 이어갑니다"
                : "Start on a PC, continue on a tablet or phone",
            desc: b("dexon").desc[locale],
            points: ko
                ? ["Device Interface이자 사용자가 일하는 Workspace", "허용된 범위 안에서 파일과 앱 활용", "기기별 실행 기능과 권한은 다를 수 있음"]
                : ["A device interface and the workspace users work in", "Uses files and apps within permitted scope", "Capabilities and permissions vary by device"],
            img: "/hero-dex-vibe-poster.jpg",
            imgAlt: ko ? "DexOn 워크스페이스 화면" : "DexOn workspace",
            href: "/xgen-dex",
            more,
        },
        {
            key: "easymode",
            label: "EasyMode",
            title: b("easymode").title[locale],
            desc: b("easymode").desc[locale],
            points: ko
                ? ["지식·프롬프트·도구를 단계별로 조합", "드래그&드롭 구성", "채팅으로 바로 검증"]
                : ["Combine knowledge, prompts, and tools step by step", "Drag-and-drop setup", "Test right away in chat"],
            img: "/product/agent-builder-canvas.png",
            imgAlt: P.hero.sub.alt[locale],
            href: "/easy-mode",
            more,
        },
        {
            key: "governance",
            label: ko ? "결재선·위험도 심사" : "Approval & risk review",
            title: ko ? "결재선 지정과 AI 위험도 심사" : "Approval route setup and AI risk review",
            desc: P.trust.lead[locale],
            points: P.trust.points.slice(0, 3).map((x) => x[locale]),
            img: P.trust.back.img,
            imgAlt: P.trust.back.alt[locale],
            sub: { img: P.trust.front.img, alt: P.trust.front.alt[locale] },
            href: P.trust.href,
            more,
        },
        {
            key: "operate",
            label: ko ? "배포·운영" : "Deploy & operate",
            title: ko ? "배포하고, 운영 상태를 확인합니다" : "Deploy, then watch how it runs",
            desc: ko
                ? "에이전트는 동료와 공유하거나 임베드·스케줄로 배포하고, 앱은 시스템 관리자 요청을 거쳐 공개 배포합니다. 대시보드와 모니터링으로 실행 현황을 확인합니다."
                : "Share agents with colleagues or deploy them by embed or schedule; apps go public through a system-admin request. Dashboards and monitoring show how runs are going.",
            points: ko
                ? ["동료 공유 · 임베드 · 스케줄 실행", "관리자 요청 기반 앱 공개 배포", "운영 대시보드 · 시스템 모니터링"]
                : ["Share, embed, and scheduled runs", "Admin-request app publishing", "Operations dashboard and system monitoring"],
            img: "/product/operations-dashboard.png",
            imgAlt: ko ? "운영 대시보드 화면" : "Operations dashboard",
            sub: { img: "/product/operations-monitoring.png", alt: ko ? "시스템 모니터링 화면" : "System monitoring" },
            href: "/product/xgen",
            more,
        },
    ];
}

function SectionHead({ title, lead }: { title: string; lead?: string }) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[30px] font-semibold leading-tight tracking-tight text-[var(--color-ink)] md:text-[40px]">
                {title}
            </h2>
            {lead && <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">{lead}</p>}
        </div>
    );
}

export function HomeTeams({
    locale,
    featuredCase,
    posts,
}: {
    locale: Locale;
    featuredCase: CaseStudy | null;
    posts: Post[];
}) {
    const t = C[locale];
    const ko = locale === "ko";
    const h = (p: string) => localeHref(locale, p);
    const faq = dict[locale].faq.entries;

    const ext = [
        {
            icon: BrainCircuit,
            eyebrow: "Agent Runtime · Geny",
            title: P.bento.find((x) => x.id === "geny")!.title[locale],
            desc: P.bento.find((x) => x.id === "geny")!.desc[locale],
            href: "/product/xgen/technology#geny",
        },
        {
            icon: Network,
            eyebrow: "Knowledge · RAG · Ontology",
            title: P.bento.find((x) => x.id === "knowledge")!.title[locale],
            desc: P.bento.find((x) => x.id === "knowledge")!.desc[locale],
            href: "/technology",
        },
        {
            icon: ShieldCheck,
            eyebrow: "Isolated Execution",
            title: ko ? "판단과 실행을 분리하고, 인증 정보는 실행 환경 밖에" : "Reasoning apart from execution, credentials outside the runtime",
            desc: ko
                ? "Harness와 Sandbox를 별도 서비스로 나누고, 에이전트별로 격리된 컨테이너에서 코드를 실행합니다. 격리 수준은 구성에 따라 다를 수 있습니다."
                : "Harness and Sandbox run as separate services, and code runs in per-agent isolated containers. Isolation depends on configuration.",
            href: "/product/xgen/technology#isolated-execution",
        },
        {
            icon: Boxes,
            eyebrow: "Open Source",
            title: t.libCount(TOOLS.length),
            desc: ko
                ? "연구 과정에서 만든 라이브러리를 공개합니다. 사용 조건은 라이브러리별 라이선스를 따릅니다."
                : "Libraries built during our research, published openly. Terms follow each library's license.",
            href: "/library-gallery",
        },
    ];

    const caseTitle = featuredCase ? (ko ? featuredCase.title : featuredCase.titleEn) : null;
    const caseSummary = featuredCase
        ? ko
            ? featuredCase.summary.replace(/^플래티어는\s+/, "")
            : featuredCase.summaryEn
        : null;
    const caseCustomer = featuredCase ? (ko ? featuredCase.customer : featuredCase.customerEn ?? featuredCase.customer) : "";

    return (
        <>
            {/* 1 · 히어로 — 밝은 2단 */}
            <section data-nav-theme="light" className="bg-white pt-[calc(var(--nav-h,80px)+56px)]">
                <div className={`${PAD} grid items-center gap-14 pb-20 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:pb-24`}>
                    <div>
                        {/* 제품 표지 — Teams의 「로고 + 제품명」 자리 */}
                        <div className="flex items-center gap-2.5">
                            <span
                                aria-hidden
                                className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#00acee] to-[#185aea] text-[17px] font-extrabold text-white shadow-[0_6px_16px_-6px_rgba(24,90,234,0.6)]"
                            >
                                X
                            </span>
                            <span className="text-[17px] font-semibold tracking-tight text-[var(--color-ink)]">XGEN</span>
                            <span aria-hidden className="h-4 w-px bg-[var(--color-line-strong)]" />
                            <span className="text-[14px] text-[var(--color-ink-muted)]">{t.eyebrow.replace(/^XGEN · /, "")}</span>
                        </div>
                        <h1 className="mt-7 text-[36px] font-bold leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)] sm:text-[46px] lg:text-[56px]">
                            {P.hero.titleA[locale]}
                            <br className="hidden sm:block" /> {P.hero.titleB[locale]}
                        </h1>
                        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
                            {P.hero.lead[locale]}
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link href={h("/xgen-trial")} className={BTN_PRIMARY}>
                                {t.trial}
                            </Link>
                            <Link href={h("/contact")} className={BTN_SECONDARY}>
                                {t.contact}
                            </Link>
                        </div>
                        <p className="mt-4 text-[13.5px] text-[var(--color-ink-muted)]">{t.trialNote}</p>
                    </div>
                    <HeroStage
                        locale={locale}
                        main={{ img: P.hero.main.img, alt: P.hero.main.alt[locale] }}
                        sub={{ img: P.hero.sub.img, alt: P.hero.sub.alt[locale] }}
                    />
                </div>

                {/* 2 · 근거 지표 */}
                <div className={`${PAD} pb-14`}>
                    <dl className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
                        {P.proof.map((x) => (
                            <div key={x.value} className="border-l border-[var(--color-line-strong)] pl-5">
                                <dt className="text-[13px] text-[var(--color-ink-muted)]">{x.label[locale]}</dt>
                                <dd className="mt-1 text-[24px] font-semibold tracking-tight text-[var(--color-ink)]">
                                    {x.value}
                                </dd>
                                <dd className="text-[12.5px] text-[var(--color-ink-subtle)]">{x.sub[locale]}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* 3 · 고객 로고 — xgen.im 「1,086개사가 플래티어와 함께합니다」 */}
            <PlateerCustomerBand locale={locale} />

            {/* 4 · 기능 탭 */}
            <section id="features" className="bg-white py-20 md:py-24">
                <div className={PAD}>
                    <SectionHead title={t.featTitle} lead={t.featLead} />
                    <div className="mt-12">
                        <FeatureTabs locale={locale} tabs={featureTabs(locale)} />
                    </div>
                </div>
            </section>

            {/* 5 · 확장 카드 */}
            <section className="bg-[var(--color-surface-alt)] py-20 md:py-24">
                <div className={PAD}>
                    <SectionHead title={t.extTitle} />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {ext.map((c) => (
                            <Link
                                key={c.eyebrow}
                                href={h(c.href)}
                                className="group flex flex-col rounded-lg border border-[var(--color-line)] bg-white p-6 transition hover:border-[#185aea]"
                            >
                                <c.icon className="h-7 w-7 text-[#185aea]" />
                                <p className="mt-5 text-[12.5px] font-semibold text-[var(--color-ink-muted)]">{c.eyebrow}</p>
                                <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight text-[var(--color-ink)]">
                                    {c.title}
                                </h3>
                                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{c.desc}</p>
                                <span className={`${LINK} mt-5`}>
                                    {t.more}
                                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 · 고객 사례 */}
            {featuredCase && caseTitle && caseSummary && (
                <section className="bg-white py-20 md:py-24">
                    <div className={`${PAD} grid items-stretch gap-8 lg:grid-cols-[1fr_1.2fr]`}>
                        <div className="flex flex-col justify-between rounded-lg bg-gradient-to-br from-[#0b1224] via-[#12285c] to-[#185aea] p-8 text-white md:p-10">
                            <div>
                                <p className="text-[13px] font-semibold text-white/70">{t.caseEyebrow}</p>
                                <p className="mt-3 text-[26px] font-semibold tracking-tight md:text-[30px]">{caseCustomer}</p>
                            </div>
                            <div className="mt-10 flex flex-wrap gap-2">
                                <span className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">
                                    {ko ? featuredCase.status : CASE_STATUS_EN[featuredCase.status]}
                                </span>
                                <span className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">
                                    {INDUSTRIES[featuredCase.industry][ko ? "ko" : "en"]}
                                </span>
                                <span className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">XGEN</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-[26px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] md:text-[32px]">
                                {caseTitle}
                            </h2>
                            <p className="mt-5 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{caseSummary}</p>
                            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <Link href={h(`/customers/case/${featuredCase.slug}`)} className={LINK}>
                                    {t.caseMore}
                                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                                <Link href={h("/customers")} className={LINK}>
                                    {t.caseAll}
                                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                            <div className="mt-8 border-t border-[var(--color-line)] pt-6">
                                <p className="text-[13px] font-semibold text-[var(--color-ink-muted)]">{t.byIndustry}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {(Object.keys(INDUSTRIES) as IndustryKey[]).map((k) => (
                                        <Link
                                            key={k}
                                            href={h(`/customers/${k}`)}
                                            className="rounded-full border border-[var(--color-line-strong)] px-4 py-1.5 text-[14px] font-medium text-[var(--color-ink)] transition hover:border-[#185aea] hover:text-[#185aea]"
                                        >
                                            {INDUSTRIES[k][ko ? "ko" : "en"]}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 7 · 품질·보안 */}
            <section className="bg-[var(--color-surface-alt)] py-20 md:py-24">
                <div className={`${PAD} grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]`}>
                    <div>
                        <Award className="h-8 w-8 text-[#185aea]" />
                        <h2 className="mt-5 text-[28px] font-semibold leading-tight tracking-tight text-[var(--color-ink)] md:text-[36px]">
                            {t.gsTitle}
                        </h2>
                        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{t.gsLead}</p>
                        <p className="mt-4 text-[14px] font-semibold text-[var(--color-ink)]">
                            {t.certNo} {XGEN_GS_CERTIFICATION.no}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                            <Link href={h("/product/xgen/security#certification")} className={LINK}>
                                {t.gsMore}
                                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link href={h("/security-and-governance")} className={LINK}>
                                {t.secMore}
                                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/xgen-gs-box2.png"
                        alt={ko ? "XGEN — GS 인증 1등급" : "XGEN — GS certification, Grade 1"}
                        loading="lazy"
                        className="mx-auto w-full max-w-[380px]"
                    />
                </div>
            </section>

            {/* 8 · 도입 방식 — 플랜 카드 */}
            <section id="deploy" className="bg-white py-20 md:py-24">
                <div className={PAD}>
                    <SectionHead title={t.planTitle} lead={P.deploy.lead[locale]} />
                    <div className="mt-12 grid gap-5 lg:grid-cols-3">
                        <div className="flex flex-col rounded-lg border-2 border-[#185aea] bg-white p-7">
                            <h3 className="text-[22px] font-semibold tracking-tight text-[var(--color-ink)]">{t.planTrial.name}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{t.planTrial.desc}</p>
                            <Link href={h("/xgen-trial")} className={`${BTN_PRIMARY} mt-6 w-full`}>
                                {t.trial}
                            </Link>
                            <ul className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6">
                                {t.planTrial.rows.map((r) => (
                                    <li key={r} className="flex gap-2.5 text-[14.5px] text-[var(--color-ink)]">
                                        <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#185aea]" />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {(
                            [
                                { key: "onprem", name: t.planOnprem, desc: t.planOnpremDesc },
                                { key: "airgap", name: t.planAirgap, desc: t.planAirgapDesc },
                            ] as const
                        ).map((plan) => (
                            <div key={plan.key} className="flex flex-col rounded-lg border border-[var(--color-line)] bg-white p-7">
                                <h3 className="text-[22px] font-semibold tracking-tight text-[var(--color-ink)]">{plan.name}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{plan.desc}</p>
                                <Link href={h("/contact")} className={`${BTN_SECONDARY} mt-6 w-full`}>
                                    {t.contact}
                                </Link>
                                <dl className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6">
                                    {P.deploy.rows.map((r) => (
                                        <div key={r.label.ko}>
                                            <dt className="text-[12.5px] font-semibold text-[var(--color-ink-muted)]">{r.label[locale]}</dt>
                                            <dd className="mt-0.5 text-[14.5px] text-[var(--color-ink)]">{r[plan.key][locale]}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-center text-[13.5px] text-[var(--color-ink-muted)]">{P.deploy.note[locale]}</p>
                </div>
            </section>

            {/* 9 · 리소스 */}
            {posts.length > 0 && (
                <section className="bg-[var(--color-surface-alt)] py-20 md:py-24">
                    <div className={PAD}>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <h2 className="text-[28px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[36px]">{t.resTitle}</h2>
                            <Link href={h("/blog")} className={LINK}>
                                {t.resAll}
                                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {posts.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={h(`/blog/${p.slug}`)}
                                    className="group flex flex-col overflow-hidden rounded-lg border border-[var(--color-line)] bg-white transition hover:border-[#185aea]"
                                >
                                    <div className="aspect-[16/9] overflow-hidden bg-[var(--color-surface-hover)]">
                                        {(p.thumb || p.cover) && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={p.thumb || p.cover}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="text-[12.5px] font-semibold text-[#185aea]">{categoryLabel(p.category, locale)}</p>
                                        <h3 className="mt-2 line-clamp-2 text-[17px] font-semibold leading-snug tracking-tight text-[var(--color-ink)]">
                                            {p.title}
                                        </h3>
                                        <p className="mt-auto pt-4 text-[13px] text-[var(--color-ink-subtle)]">{p.date.replaceAll("-", ".")}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 10 · FAQ */}
            <section id="faq" className="bg-white py-20 md:py-24">
                <div className="mx-auto w-full max-w-[880px] px-5 sm:px-8">
                    <h2 className="text-center text-[28px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[36px]">
                        {t.faqTitle}
                    </h2>
                    <div className="mt-10 border-t border-[var(--color-line)]">
                        {faq.map((f) => (
                            <details key={f.question} className="group border-b border-[var(--color-line)]">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16.5px] font-semibold text-[var(--color-ink)]">
                                    {f.question}
                                    <ChevronDown className="h-5 w-5 flex-none text-[var(--color-ink-muted)] transition group-open:rotate-180" />
                                </summary>
                                <p className="pb-6 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">{f.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11 · 마지막 CTA 띠 */}
            <section className="bg-[#eef3fc] py-16 md:py-20">
                <div className={`${PAD} flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between`}>
                    <div className="max-w-2xl">
                        <h2 className="text-[26px] font-semibold leading-snug tracking-tight text-[var(--color-ink)] md:text-[32px]">
                            {P.cta.title[locale]}
                        </h2>
                        <p className="mt-3 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{P.cta.lead[locale]}</p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <Link href={h("/xgen-trial")} className={BTN_PRIMARY}>
                            {t.trial}
                        </Link>
                        <Link href={h("/contact")} className={BTN_SECONDARY}>
                            {t.contact}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
