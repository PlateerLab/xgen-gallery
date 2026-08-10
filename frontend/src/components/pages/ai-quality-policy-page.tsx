import Link from "next/link";
import {
    ArrowRight,
    ShieldCheck,
    Eye,
    Lock,
    Activity,
    Landmark,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { AiQualityArt } from "@/components/ai-quality-art";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { localeHref, localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * AI 품질 방침 — 개요(에디토리얼) 페이지.
 *
 * 전문(17개 장)은 별도 페이지가 담당하고, 이 페이지는 그 입구다.
 * AI-MASTER NEW1 증빙은 **전문 페이지**가 담당하므로 하단 「전문 보기」 링크와
 * 문서 정보 스트립(문서번호·버전·개정일)을 제거하면 안 된다.
 *
 * 원문: 사내 ai-quality-policy.html — 내용은 그대로 두고 사이트 룩앤필로 재구성했다.
 */

/** 문서 정보 — 개정 시 전문 페이지와 같은 값으로 함께 갱신한다. */
export const POLICY_DOC = {
    no: "PLT-AI-POL-001",
    version: "v1.0",
    revised: "2026-08-07",
    nextReview: "2027-08-06",
} as const;

const QUALITY_ICONS: LucideIcon[] = [ShieldCheck, Eye, Lock, Activity, Landmark];

type Copy = {
    eyebrow: string;
    h1: string[];
    heroLead: string[];
    breadcrumb: string;
    qualityTitle: string;
    qualityLead: string;
    qualityItems: string[];
    qualityNote: string;
    principlesTitle: string;
    principlesLead: string;
    principles: [string, string][];
    productTitle: string;
    productLead: string;
    features: [string, string][];
    productNote: string;
    commitTitle: string;
    commitQuote: string;
    commitBody: string[];
    oursTitle: string;
    ours: string[];
    theirsTitle: string;
    theirs: string[];
    commitNote: string;
    commitNoteLink: string;
    improveTitle: string;
    improveLead: string;
    improveBody: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaFull: string;
    ctaContact: string;
    /**
     * 전문이 한국어 정본임을 알리는 안내. 전문은 국내 인증 증빙용 법적 문서라
     * 한국어만 두므로(전문 페이지 주석 참고), 영문판에서만 채운다.
     */
    fullLangNote?: string;
    docNo: string;
    docVersion: string;
    docRevised: string;
    docNext: string;
    docApprover: string;
    docApproverValue: string;
    footerOrg: string;
    footerContact: string;
};

const COPY: Record<Locale, Copy> = {
    ko: {
        eyebrow: "AI Quality Policy · Plateer AI Lab",
        h1: ["Enterprise AI의 신뢰는,", "체계적인 통제와 운영에서 완성됩니다"],
        heroLead: [
            "플래티어 AI연구소는 AI를 개발하고 기업 현장에 적용합니다.",
            "성능을 넘어 안전성·책임성·통제 가능성을 확보하여, 고객이 안심하고 Enterprise AI를 운영할 수 있도록 하는 것이 우리의 AI 품질 원칙입니다.",
        ],
        breadcrumb: "AI 품질 방침",
        qualityTitle: "우리가 생각하는 AI 품질",
        qualityLead:
            "AI 품질은 단순히 모델의 정확도가 아닙니다. 기업 환경에서는 다음 요소가 함께 충족되어야 합니다.",
        qualityItems: [
            "사람이 최종 의사결정을 통제할 수 있는가",
            "AI의 판단 근거를 추적할 수 있는가",
            "데이터와 권한을 안전하게 보호하는가",
            "운영 중 발생하는 위험을 지속적으로 관리하는가",
            "기업의 거버넌스 정책을 제품에 반영할 수 있는가",
        ],
        qualityNote: "XGEN은 이러한 요소를 플랫폼 차원에서 제공하도록 설계되었습니다.",
        principlesTitle: "우리의 원칙",
        principlesLead:
            "연구소는 다음 일곱 가지 원칙을 모든 AI 제품 개발과 운영의 기준으로 삼습니다.",
        principles: [
            ["Human-in-the-Loop", "자동화된 처리는 언제든 사람이 거부·변경·중단시킬 수 있어야 합니다."],
            ["Quality Before Release", "정의된 품질 기준과 릴리즈 시험을 통과한 산출물만 배포합니다."],
            ["Data Quality First", "데이터의 품질이 곧 AI의 품질입니다. 출처와 계보를 관리합니다."],
            ["Explainable AI", "결과의 근거와 처리 경로를 추적할 수 있게 합니다."],
            ["Fairness by Design", "편향을 사전에 식별하고, 점검할 수 있는 수단을 제공합니다."],
            ["Accountability", "공급자와 운영자의 역할과 책임을 명확히 구분하고, 공급자로서의 책임을 투명하게 이행합니다."],
            ["Continuous Improvement", "이해관계자의 의견과 규제 변화를 지속적으로 반영합니다."],
        ],
        productTitle: "제품에 반영되는 품질 체계",
        productLead:
            "AI 품질은 선언이 아니라 제품 기능으로 구현되어야 합니다. XGEN은 다음과 같은 기능을 제공합니다.",
        features: [
            ["AI 거버넌스", "정책 수립과 준수 현황의 관리"],
            ["Guardrail 정책", "AI 행동 범위의 정의와 제한"],
            ["권한 및 접근 통제", "역할 기반 사용자·조직 관리"],
            ["감사 로그", "사후 추적이 가능한 운영 기록"],
            ["모델 관리", "모델 공급자와 버전의 통제"],
            ["Prompt 및 Knowledge 관리", "지식 자산과 프롬프트의 관리"],
            ["Agent 실행 이력", "에이전트 동작의 전 과정 기록"],
            ["품질 평가 및 모니터링", "성능·품질의 지속적 측정"],
        ],
        productNote: "이를 통해 고객은 AI를 안전하고 지속적으로 운영할 수 있습니다.",
        commitTitle: "고객과의 약속",
        commitQuote: "책임 있는 AI 운영을 함께 지원합니다",
        commitBody: [
            "고객이 책임 있는 AI를 운영할 수 있도록 필요한 플랫폼 기능, 운영 기준, 문서와 교육을 함께 제공합니다.",
            "우리는 공급자로서 제공해야 할 책임과 고객이 운영자로서 수행해야 할 책임을 명확히 구분하며, Enterprise AI 운영에 필요한 통제 수단을 지속적으로 고도화합니다.",
        ],
        oursTitle: "플래티어 AI연구소가 책임집니다",
        ours: [
            "플랫폼의 기능·성능·신뢰성·보안성",
            "가드레일·권한·감사 로그 등 통제 수단의 제공과 정상 동작",
            "취약점 대응, 결함 시정, 버전 관리 및 기술 지원",
            "안전한 구성·운영을 위한 문서·교육·기준 제공",
        ],
        theirsTitle: "고객사가 운영 주체로서 수행합니다",
        theirs: [
            "구성한 에이전트·워크플로우의 목적 적합성과 결과",
            "투입 데이터의 적법성과 품질, 개인정보 처리",
            "연계하는 외부 모델·도구의 선택과 사용",
            "운영 중 결과 검토 및 최종 의사결정",
        ],
        commitNote: "책임 분계의 전체 내용은",
        commitNoteLink: "AI 품질 방침 전문 12장",
        improveTitle: "지속적인 개선",
        improveLead: "AI 기술과 규제는 빠르게 변화하고 있습니다.",
        improveBody:
            "플래티어 AI연구소는 AI 품질 방침을 정기적으로 검토하고, 국내외 규제와 산업 표준을 제품에 반영하여 고객이 신뢰할 수 있는 Enterprise AI 플랫폼을 지속적으로 제공하겠습니다.",
        ctaTitle: "AI 품질 방침 전문",
        ctaDesc:
            "적용 범위, 품질 기준, 사내 AI 이용 기준, 품질 목표, 거버넌스 체계, 책임 분계와 고객사 이행 가이드를 모두 공개합니다.",
        ctaFull: "전문 보기",
        ctaContact: "문의하기",
        docNo: "문서번호",
        docVersion: "버전",
        docRevised: "최종 개정일",
        docNext: "차기 정기 검토",
        docApprover: "승인",
        docApproverValue: "플래티어 AI연구소 소장",
        footerOrg: "플래티어 AI연구소 (Plateer AI Lab)",
        footerContact: "AI 품질·윤리 문의 및 AI 사고 신고",
    },
    en: {
        eyebrow: "AI Quality Policy · Plateer AI Lab",
        h1: ["Trust in enterprise AI", "is completed by disciplined control and operations"],
        heroLead: [
            "Plateer AI Lab develops AI and puts it to work on real enterprise ground.",
            "Securing safety, accountability, and controllability beyond raw performance — so that customers can run Enterprise AI with confidence — is our AI quality principle.",
        ],
        breadcrumb: "AI quality policy",
        qualityTitle: "What we mean by AI quality",
        qualityLead:
            "AI quality is not simply model accuracy. In an enterprise environment, these have to hold together.",
        qualityItems: [
            "Can a person keep control of the final decision?",
            "Can the basis for the AI's judgement be traced?",
            "Are data and permissions protected?",
            "Are the risks that arise in operation managed continuously?",
            "Can the enterprise's governance policy be reflected in the product?",
        ],
        qualityNote: "XGEN is designed to provide these at the platform level.",
        principlesTitle: "Our principles",
        principlesLead:
            "The lab holds these seven principles as the standard for developing and operating every AI product.",
        principles: [
            ["Human-in-the-Loop", "Automated processing must always be something a person can refuse, change, or stop."],
            ["Quality Before Release", "Only work that clears the defined quality criteria and release testing ships."],
            ["Data Quality First", "Data quality is AI quality. We manage provenance and lineage."],
            ["Explainable AI", "The basis for a result and the path it took can be traced."],
            ["Fairness by Design", "Bias is identified in advance, with the means to inspect it."],
            ["Accountability", "The boundary between supplier and operator is published, not avoided."],
            ["Continuous Improvement", "Stakeholder input and regulatory change are reflected continuously."],
        ],
        productTitle: "Quality built into the product",
        productLead:
            "AI quality has to be implemented as product capability, not declared. XGEN provides the following.",
        features: [
            ["AI governance", "Policy setting and compliance status"],
            ["Guardrail policy", "Defining and limiting what the AI may do"],
            ["Permissions and access control", "Role-based user and organization management"],
            ["Audit logs", "Operational records that can be traced afterwards"],
            ["Model management", "Control over model providers and versions"],
            ["Prompt and knowledge management", "Managing knowledge assets and prompts"],
            ["Agent execution history", "A record of the whole path an agent took"],
            ["Quality evaluation and monitoring", "Continuous measurement of performance and quality"],
        ],
        productNote: "Together they let customers operate AI safely, over time.",
        commitTitle: "Our commitment to customers",
        commitQuote: "We support responsible AI operation together",
        commitBody: [
            "We supply the platform capabilities, operating standards, documentation, and training a customer needs in order to run AI responsibly.",
            "We draw a clear line between what we owe as the supplier and what the customer performs as the operator, and we keep advancing the controls that operating Enterprise AI requires.",
        ],
        oursTitle: "Plateer AI Lab is responsible for",
        ours: [
            "The platform's functionality, performance, reliability, and security",
            "Providing controls — guardrails, permissions, audit logs — and their correct operation",
            "Vulnerability response, defect correction, version management, and technical support",
            "Documentation, training, and standards for safe configuration and operation",
        ],
        theirsTitle: "The customer performs, as the operator",
        theirs: [
            "Fitness for purpose and outcomes of the agents and workflows they configure",
            "Lawfulness and quality of the data they supply, and personal-data handling",
            "Selection and use of the external models and tools they connect",
            "Reviewing results in operation and making the final decision",
        ],
        commitNote: "The full division of responsibility is in",
        commitNoteLink: "chapter 12 of the full policy (Korean)",
        improveTitle: "Continuous improvement",
        improveLead: "AI technology and its regulation are changing quickly.",
        improveBody:
            "Plateer AI Lab reviews this policy regularly and reflects domestic and international regulation and industry standards in the product, so that customers keep receiving an Enterprise AI platform they can trust.",
        ctaTitle: "The full AI quality policy",
        ctaDesc:
            "Scope, quality criteria, internal AI usage standards, quality objectives, the governance structure, the division of responsibility, and the customer implementation guide — all published.",
        ctaFull: "Read the full policy (Korean)",
        ctaContact: "Get in touch",
        fullLangNote:
            "Korean original — the full policy is issued in Korean as the authoritative text. This English page is a summary for reference",
        docNo: "Document no.",
        docVersion: "Version",
        docRevised: "Last revised",
        docNext: "Next scheduled review",
        docApprover: "Approved by",
        docApproverValue: "Director, Plateer AI Lab",
        footerOrg: "Plateer AI Lab",
        footerContact: "AI quality and ethics enquiries, and AI incident reports",
    },
};

const CONTACT_EMAIL = "xgen@plateer.com";

function SectionHead({
    label,
    title,
    lead,
}: {
    label: string;
    title: string;
    lead?: string;
}) {
    return (
        <div className="mb-8">
            <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                / {label}
            </p>
            <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[30px]">
                {title}
            </h2>
            {lead && (
                <p className="mt-3.5 max-w-3xl text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {lead}
                </p>
            )}
        </div>
    );
}

export function AiQualityPolicyPageContent({
    locale,
    fullHref,
}: {
    locale: Locale;
    /** 전문 페이지 주소 — 검토 단계에서는 히든 경로를 넘긴다. */
    fullHref: string;
}) {
    const t = COPY[locale];

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: localePath(locale, "/") },
                    { name: "Product", path: localePath(locale, "/product") },
                    {
                        name: t.breadcrumb,
                        path: localePath(locale, "/ai-quality-policy"),
                    },
                ])}
            />

            {/* Hero */}
            <section className="relative flex min-h-[500px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                {/* 좌: 카피 / 우: 키비주얼. lg 미만에서는 키비주얼이 아래로 쌓인다. */}
                <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 pt-16 lg:grid-cols-2 lg:gap-12">
                    <div>
                        <p className="text-[15px] font-semibold tracking-tight text-[#5eead4]">
                            {t.eyebrow}
                        </p>
                        {/* 2단 히어로라 폭이 좁다 — 고정 <br> 대신 text-balance로 줄을 고르게
                            나눠 "AI는" 같은 외톨이 줄이 생기지 않게 한다. */}
                        <h1 className="mt-4 text-pretty text-3xl font-bold leading-[1.25] tracking-tight md:text-[40px] lg:text-balance">
                            {t.h1[0]} {t.h1[1]}
                        </h1>
                        <div className="mt-7 space-y-3">
                            {t.heroLead.map((p) => (
                                <p key={p} className="text-[17px] leading-relaxed text-white/75">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                    <AiQualityArt locale={locale} />
                </div>
            </section>

            <main className="mx-auto max-w-4xl px-6 py-24">
                {/* 우리가 생각하는 AI 품질 */}
                <section>
                    <SectionHead
                        label="Definition"
                        title={t.qualityTitle}
                        lead={t.qualityLead}
                    />
                    <ul className="space-y-2.5">
                        {t.qualityItems.map((q, i) => {
                            const Icon = QUALITY_ICONS[i];
                            return (
                                <li
                                    key={q}
                                    className="flex items-center gap-3.5 rounded-xl border border-[var(--color-line)] bg-white px-5 py-4"
                                >
                                    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2461d8]">
                                        <Icon className="h-4.5 w-4.5" />
                                    </span>
                                    <span className="text-[16px] font-medium text-[var(--color-ink)]">
                                        {q}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink-subtle)]">
                        {t.qualityNote}
                    </p>
                </section>

                {/* 우리의 원칙 */}
                <section className="mt-24">
                    <SectionHead
                        label="Principles"
                        title={t.principlesTitle}
                        lead={t.principlesLead}
                    />
                    <ol className="grid gap-4 sm:grid-cols-2">
                        {t.principles.map(([name, desc], i) => (
                            <li
                                key={name}
                                className="rounded-2xl border border-[var(--color-line)] border-t-[3px] border-t-[#2f7bff] bg-white p-6"
                            >
                                <span className="font-mono text-[12px] font-bold tracking-[0.1em] text-[#2461d8]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <p className="mt-2 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {name}
                                </p>
                                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {desc}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* 제품에 반영되는 품질 체계 */}
                <section className="mt-24">
                    <SectionHead
                        label="In the product"
                        title={t.productTitle}
                        lead={t.productLead}
                    />
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {t.features.map(([name, desc]) => (
                            <li
                                key={name}
                                className="rounded-xl bg-[var(--color-surface-alt)] px-5 py-4"
                            >
                                <p className="text-[15.5px] font-bold text-[var(--color-ink)]">
                                    {name}
                                </p>
                                <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink-subtle)]">
                        {t.productNote}
                    </p>
                </section>

                {/* 고객과의 약속 */}
                <section className="mt-24">
                    <SectionHead label="Commitment" title={t.commitTitle} />
                    <p className="rounded-2xl bg-[#eaf1fe] px-7 py-6 text-[18px] font-bold leading-relaxed text-[var(--color-ink)] md:text-[19px]">
                        {t.commitQuote}
                    </p>
                    <div className="mt-6 space-y-4">
                        {t.commitBody.map((p) => (
                            <p
                                key={p}
                                className="text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]"
                            >
                                {p}
                            </p>
                        ))}
                    </div>
                    <div className="mt-7 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-[var(--color-line)] border-l-4 border-l-[#2f7bff] bg-white p-6">
                            <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.oursTitle}
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.ours.map((x) => (
                                    <li key={x}>· {x}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-[var(--color-line)] border-l-4 border-l-[var(--color-ink-subtle)] bg-white p-6">
                            <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.theirsTitle}
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.theirs.map((x) => (
                                    <li key={x}>· {x}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink-subtle)]">
                        {t.commitNote}{" "}
                        <Link
                            href={`${fullHref}#responsibility`}
                            className="font-semibold text-[#2461d8] underline underline-offset-4 hover:text-[#1b4fb0]"
                        >
                            {t.commitNoteLink}
                        </Link>
                    </p>
                </section>

                {/* 지속적인 개선 */}
                <section className="mt-24">
                    <SectionHead
                        label="Improvement"
                        title={t.improveTitle}
                        lead={t.improveLead}
                    />
                    <p className="text-[16.5px] leading-relaxed text-[var(--color-ink-muted)]">
                        {t.improveBody}
                    </p>
                </section>

                {/* CTA — 전문 연결 (AI-MASTER 증빙: 이 링크를 제거하지 말 것) */}
                <section className="mt-24">
                    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-9 text-center">
                        <h2 className="text-[21px] font-bold tracking-tight text-[var(--color-ink)] md:text-[24px]">
                            {t.ctaTitle}
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.ctaDesc}
                        </p>
                        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href={fullHref}
                                className="group inline-flex items-center gap-2 rounded-full bg-[#2461d8] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#1b4fb0]"
                            >
                                {t.ctaFull}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href={localeHref(locale, "/contact")}
                                className="inline-flex items-center rounded-full border border-[#2461d8] px-6 py-3 text-[15px] font-semibold text-[#2461d8] transition hover:bg-[#2461d8]/5"
                            >
                                {t.ctaContact}
                            </Link>
                        </div>
                        {/* 전문은 한국어 정본만 둔다 — 영문 방문자가 링크를 누르기 전에 알도록 */}
                        {t.fullLangNote && (
                            <p className="mx-auto mt-5 max-w-xl text-[13.5px] leading-relaxed text-[var(--color-ink-subtle)]">
                                {t.fullLangNote}
                            </p>
                        )}
                    </div>

                    {/* 문서 정보 — 어느 쪽으로 진입해도 최신성이 확인되도록 둔다 */}
                    <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--color-line)] pt-6 text-[13px] text-[var(--color-ink-subtle)]">
                        {[
                            [t.docNo, POLICY_DOC.no],
                            [t.docVersion, POLICY_DOC.version],
                            [t.docRevised, POLICY_DOC.revised],
                            [t.docNext, POLICY_DOC.nextReview],
                            [t.docApprover, t.docApproverValue],
                        ].map(([k, v]) => (
                            <div key={k} className="flex items-center gap-1.5">
                                <dt className="font-bold text-[var(--color-ink)]">{k}</dt>
                                <dd>{v}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <footer className="mt-14 text-[14px] leading-relaxed text-[var(--color-ink-subtle)]">
                    <p className="text-[15px] font-bold text-[var(--color-ink)]">
                        {t.footerOrg}
                    </p>
                    <p className="mt-1.5">
                        {t.footerContact} ·{" "}
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="font-semibold text-[#2461d8] underline underline-offset-4"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                </footer>
            </main>
            <SiteFooter />
        </>
    );
}
