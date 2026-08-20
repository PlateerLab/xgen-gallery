import Link from "next/link";
import {
    Banknote,
    ShoppingCart,
    Cpu,
    Landmark,
    HeartPulse,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * PoC 검증 영역 카탈로그 — 실제 진행한 산업·업무 범위를 익명·집계로 정리한다.
 * 고객사명·예산·수주 정보 등 내부 영업 데이터는 노출하지 않고, "어떤 산업의 어떤
 * 업무를 XGEN으로 검증했는가"라는 사실만 담아 신뢰 폭(breadth)을 보여준다.
 * 서버 컴포넌트 — 콘텐츠가 초기 HTML로 나가 SEO·GEO 크롤링에 유리하다.
 */
const AREAS: {
    icon: LucideIcon;
    industry: string;
    en: string;
    cases: string[];
    /** 영문 화면에서 쓰는 업무 목록. */
    casesEn: string[];
}[] = [
    {
        icon: Banknote,
        industry: "금융",
        en: "Finance",
        cases: [
            "사내 생성형 AI 플랫폼",
            "문서·계약 검토",
            "검색 고도화(RAG)",
            "심사·여신 지원",
        ],
        casesEn: [
            "Internal generative-AI platform",
            "Document and contract review",
            "Search modernization (RAG)",
            "Credit and underwriting support",
        ],
    },
    {
        icon: ShoppingCart,
        industry: "커머스 · 유통",
        en: "Commerce & Retail",
        cases: [
            "상품 검색·추천",
            "CS 응대 자동화",
            "상품 심의·QA 자동화",
            "고객 리텐션(win-back)",
        ],
        casesEn: [
            "Product search and recommendation",
            "Automated customer support",
            "Product review and QA automation",
            "Customer win-back",
        ],
    },
    {
        icon: Cpu,
        industry: "IT · 제조",
        en: "IT & Manufacturing",
        cases: [
            "AI Code Assistant",
            "사내 코드 추천(RAG)",
            "기술 문서 검색",
            "폐쇄망 온프레미스 구축",
        ],
        casesEn: [
            "AI Code Assistant",
            "In-house code recommendation (RAG)",
            "Technical document search",
            "Air-gapped on-premise deployment",
        ],
    },
    {
        icon: Landmark,
        industry: "공공",
        en: "Public Sector",
        cases: [
            "조달·구매 검색 고도화",
            "민원 상담 지원",
            "정책·규정 검색",
            "업무 생산성 개선",
        ],
        casesEn: [
            "Procurement search modernization",
            "Citizen-inquiry support",
            "Policy and regulation search",
            "Workplace productivity",
        ],
    },
    {
        icon: HeartPulse,
        industry: "헬스 · 제약",
        en: "Health & Pharma",
        cases: [
            "의료·청구 문서 인식",
            "제품 개발(NPD) 의사결정 지원",
            "규정·문헌 검색",
        ],
        casesEn: [
            "Medical and claims document recognition",
            "New-product development decision support",
            "Regulation and literature search",
        ],
    },
];

const STEPS = [
    { step: "발굴", desc: "고객 업무의 페인포인트 정의" },
    { step: "PoC", desc: "짧게는 1일(1-Day PoC)부터 검증" },
    { step: "구축", desc: "온프레미스·폐쇄망 포함 도입" },
    { step: "운영", desc: "상주·비상주 운영으로 안착" },
];

const STEPS_EN = [
    { step: "Discover", desc: "Define the pain point in the customer's work" },
    { step: "PoC", desc: "Validate in as little as a day (1-Day PoC)" },
    { step: "Build", desc: "Deploy, including on-premise and air-gapped" },
    { step: "Operate", desc: "Settle in with on-site or remote operations" },
];

const COPY: Record<
    Locale,
    {
        title: string;
        lead: string;
        processTitle: string;
        modelNote: string;
        casesLead: string;
        casesCta: string;
    }
> = {
    ko: {
        title: "검증된 산업·업무 영역",
        lead: "Plateer AI Labs는 금융·커머스·IT·제조·공공·헬스 등 여러 산업 현장에서 XGEN을 실제 업무에 적용해 검증해 왔습니다. 아래는 산업별로 검증한 대표 업무 영역입니다",
        processTitle: "발굴부터 운영까지, 검증된 진행 방식",
        modelNote:
            "모델 중립(Model-Agnostic) 구조로 원하는 LLM을 선택하고, 클라우드는 물론 온프레미스·망분리 환경에서도 도입할 수 있습니다",
        casesLead: "검증을 넘어 실제로 납품·운영 중인 고객사례도 확인해 보세요",
        casesCta: "고객사례 보기",
    },
    en: {
        title: "Industries and workloads we have validated",
        lead: "Plateer AI Labs has applied XGEN to real work across finance, commerce, IT, manufacturing, the public sector, and healthcare. Below are the workloads validated in each industry",
        processTitle: "From discovery to operations, a way of working that has been proven",
        modelNote:
            "A model-agnostic architecture lets you choose the LLM you want, and deployment works on cloud as well as on-premise and network-separated environments",
        casesLead:
            "Beyond validation, see the customers where this is delivered and running today",
        casesCta: "View customer cases",
    },
};

export function PocCatalog({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    const en = locale === "en";
    const steps = en ? STEPS_EN : STEPS;
    return (
        <section
            id="verified-areas"
            className="scroll-mt-28 border-t border-[var(--color-line)] pt-16"
        >
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                {t.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                {t.lead}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {AREAS.map((a) => (
                    <div
                        key={a.industry}
                        className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                    >
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <a.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {en ? a.en : a.industry}
                                </h3>
                                {!en && (
                                    <p className="text-[13px] font-semibold text-[#2461d8]">
                                        {a.en}
                                    </p>
                                )}
                            </div>
                        </div>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                            {(en ? a.casesEn : a.cases).map((c) => (
                                <li
                                    key={c}
                                    className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-2.5 py-0.5 text-[13px] font-medium text-[var(--color-ink-muted)]"
                                >
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* 검증 프로세스 */}
            <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-7">
                <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                    {t.processTitle}
                </h3>
                <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((s, i) => (
                        <li key={s.step} className="relative">
                            <span className="font-mono text-[13px] font-bold text-[#2f7bff]">
                                0{i + 1}
                            </span>
                            <p className="mt-1 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                {s.step}
                            </p>
                            <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                {s.desc}
                            </p>
                        </li>
                    ))}
                </ol>
                <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-[14.5px] leading-relaxed text-[var(--color-ink-subtle)]">
                    {t.modelNote}
                </p>
            </div>

            {/* 고객사례로 연결 */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.casesLead}
                </p>
                <Link
                    href={localeHref(locale, "/customers")}
                    className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                >
                    {t.casesCta}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </section>
    );
}
