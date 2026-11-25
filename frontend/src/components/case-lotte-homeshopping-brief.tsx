import Link from "next/link";
import {
    ShieldAlert,
    BookOpenText,
    Tv,
    ReceiptText,
    Building2,
    Quote,
    Sparkles,
    ArrowLeft,
} from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 롯데홈쇼핑 XGEN 고객사례 — **압축본(고객 검토용)**, 2026-11-23.
 *
 * 제주은행 사례(case-jeju-bank.tsx)와 같은 구성으로 줄였다.
 *   Hero → Why XGEN → The Challenge → The Solution(+적용 기술) → What We Built → Outcomes → Voice of Customer
 *
 * 상세본(case-lotte-homeshopping.tsx, /preview/lotte-homeshopping-30f6477b)은 그대로 둔다.
 * 고객이 그룹 관계사·자회사 쪽 반응을 우려해, 압축본에서는 아래를 뺐다.
 *   - 이전 챗봇(외산 솔루션)과 다른 플랫폼 비교·선정 과정
 *   - 인프라 구성(쿠버네티스·레지스트리·전환 시점), 모델명, 장애·해결 이력
 *   - 아쉬운 점·API 제약, 다음 과제 목록, 숫자 칸, 사옥 사진·로고
 * Why XGEN은 정리 카드 없이 고객 인용(선택 이유)으로, 맨 아래 Voice of Customer는 「운영해 보니」 인용으로 둔다.
 * 인용은 상세본에 실린 오주영 책임의 말(선택 이유 포함)을 쓰되 다른 플랫폼과의 비교는 빼고, 화자는 이름·직책과 팀으로 표기한다(사용자 요청).
 */

const HIGHLIGHTS = [
    "업무별 AI Agent 직접 제작",
    "사내 GPU·클라우드 모델 병행",
    "코딩 없는 워크플로우 배포",
    "부서별 단계적 확산",
];

const AREAS = [
    {
        icon: ShieldAlert,
        no: "01",
        title: "위해상품 판매차단",
        desc: "아이몰 검색과 위해상품 목록 대조, 결과를 엑셀로 정리하는 과정 자동화",
        status: "운영 중",
    },
    {
        icon: BookOpenText,
        no: "02",
        title: "차세대 시스템 업무 안내",
        desc: "방대한 시스템 매뉴얼에서 필요한 내용을 찾아 해당 업무 화면까지 안내",
        status: "운영 중",
    },
    {
        icon: Tv,
        no: "03",
        title: "방송 품질·심의 지원",
        desc: "실시간 방송 심의 지원과 방송 품질 점검 결과 등록",
        status: "운영 중",
    },
    {
        icon: ReceiptText,
        no: "04",
        title: "영수증 전표 처리",
        desc: "영수증 판독, 법인카드 내역 매칭, 품의 작성까지 연결하고 최종 검증은 재경팀이 수행",
        status: "연동 진행 중",
    },
];

const OUTCOMES = [
    {
        no: "1",
        title: "반복 업무의 자동화",
        points: [
            "수작업 검색·대조 업무를 Agent가 처리",
            "매뉴얼 탐색을 대화형 업무 안내로 전환",
            "담당자는 검토와 최종 판단에 집중",
        ],
    },
    {
        no: "2",
        title: "현업 중심의 Agent 제작",
        points: [
            "별도의 코딩 없이 워크플로우로 구성·배포",
            "필요한 모듈만 골라 빠르게 구성하고 온보딩",
            "업무가 바뀌면 사용자가 직접 수정",
        ],
    },
    {
        no: "3",
        title: "부서별 확산 기반 확보",
        points: [
            "MD·방송편성·CS·재경으로 적용 범위 확대",
            "사내 GPU에서 운영할 수 있는 모델의 폭 확대",
            "현장 피드백을 XGEN 개선으로 연결",
        ],
    },
];

const EN = {
    highlights: [
        "Task-specific AI agents built in-house",
        "In-house GPU and cloud models side by side",
        "Workflows deployed without coding",
        "Rolled out department by department",
    ],
    breadcrumbAria: "Breadcrumb",
    breadcrumbCases: "Customer cases",
    breadcrumbIndustry: "Commerce",
    badgeIndustry: "Commerce · Lotte Homeshopping",
    badgeStatus: "In operation · Rolling out",
    heroTitle: (
        <>
            Lotte Homeshopping,
            <br />
            AI agents that carry out work in each department
        </>
    ),
    heroLead:
        "With XGEN, the AX team now builds the AI agents each task needs and deploys them to the business itself. Starting with blocking sales of hazardous products and guiding staff through the next-generation system, the scope is widening to finance and broadcast quality and review.",
    whyTitle: "Why Lotte Homeshopping chose XGEN",
    challengeTitle: "From a chatbot that answers to AI agents that work",
    challengeLead:
        "As more departments took up generative AI, answering questions was no longer enough — they needed AI that could carry out real work. Lotte Homeshopping set three conditions for its AI platform.",
    challengeCards: [
        ["Models used together", "Cloud models and on-premise open models used side by side on one platform"],
        ["Operated by the business", "Business users able to adjust agents themselves when needs change"],
        ["A clear data boundary", "Data that must stay inside processed on in-house GPUs, with only hard reasoning sent to the cloud"],
    ],
    solutionTitle: "Data kept secure, AI models matched to the work",
    solutionLead:
        "Lotte Homeshopping chooses between in-house and cloud AI models based on how sensitive the data is and what the work requires, while the AX team builds and deploys the agents itself.",
    solutionCard1: "The right model for each step",
    solutionCard1Items: [
        "Sensitive internal data handled by open models on in-house GPUs",
        "Complex analysis and reasoning handled by cloud models such as Claude",
        "Each step within a single workflow connected to the model that suits it",
    ],
    solutionCard2: "AI agents the business builds itself",
    solutionCard2Items: [
        "Work built as workflows without separate coding and deployed right away",
        "Only the functional modules needed, assembled quickly and onboarded to the business",
        "Internal systems linked through APIs and MCP, with tools reused across tasks",
    ],
    techTitle: "Technology applied",
    builtTitle: "AI agents applied to four areas of work",
    builtLead:
        "Changes the customer has felt firsthand, task by task. Some tasks are still being integrated, widening the scope of use.",
    areas: [
        ["Blocking sales of hazardous products", "Automates searching the online mall, checking it against the hazardous-product list and organizing the results in Excel", "In operation"],
        ["Next-generation system guidance", "Finds what staff need in the extensive system manual and guides them to the right work screen", "In operation"],
        ["Broadcast quality and review support", "Supports real-time broadcast review and records broadcast quality-check results", "In operation"],
        ["Receipt expense processing", "Links receipt reading, corporate-card matching and approval drafting, with the final check done by the finance team", "Integration in progress"],
    ],
    builtNoteTitle: "People assign and verify; agents handle the process",
    builtNoteBody:
        "For receipt expenses, the agent carries the work through to the approval draft, and it is processed only after the finance team's final verification.",
    outcomesTitle: "Automation, business-built agents and room to expand",
    outcomes: [
        {
            title: "Repetitive work automated",
            points: [
                "Manual searching and checking handled by agents",
                "Manual look-ups turned into conversational work guidance",
                "Staff focus on review and the final call",
            ],
        },
        {
            title: "Agents built by the business",
            points: [
                "Workflows built and deployed without separate coding",
                "Only the modules needed, assembled and onboarded quickly",
                "Users adjust agents themselves as work changes",
            ],
        },
        {
            title: "A base for department-wide rollout",
            points: [
                "Scope widening to merchandising, broadcast scheduling, CS and finance",
                "A wider range of models that can run on in-house GPUs",
                "Field feedback carried into XGEN improvements",
            ],
        },
    ],
    vocTitle: "In the customer's words",
    vocSpeaker: "Juyoung Oh · AX Team, Lotte Homeshopping",
    vocOrg: "Lotte Homeshopping · Commerce",
    vocBadge: "Customer in operation",
    quoteGroups: [
        {
            label: "Why we chose XGEN",
            quotes: [
                "XGEN has a relatively light structure and a high degree of configuration flexibility, so users had wide room to modify it themselves to fit their work. Its functional-module structure was another strength: we could select only the capabilities we needed, configure them quickly and apply them to the business.",
                "The technology and experience Plateer has built up by developing its own AI platform were also an important factor in choosing XGEN.",
            ],
        },
        {
            label: "After putting it into operation",
            quotes: [
                "We can build the work we need as workflows, without code, and deploy them right away. The next-generation system manual, the product-encyclopedia chatbot and the Excel generator were all built this way.",
                "From the base AI models to XGEN workflows and the LLM responses, we are satisfied overall, and it is running stably on our internal systems today.",
                "The end goal is for people to assign the work and evaluate the results, while AI handles the work in between as autonomously as possible.",
            ],
        },
    ],
    allCases: "All customer cases",
    contact: "Get in touch",
    previewBand:
        "Customer review draft (short version) · excluded from search — to be published after Lotte Homeshopping's confirmation.",
};

const KO_QUOTE_GROUPS = [
    {
        label: "XGEN을 선택한 이유",
        quotes: [
            "XGEN은 비교적 가벼운 구조와 높은 구성 유연성을 갖추고 있어 사용자가 업무 요구에 맞게 직접 수정할 수 있는 범위가 넓었습니다. 기능별 모듈 구조를 기반으로 필요한 기능만 선택해 빠르게 구성하고 현업에 적용할 수 있다는 점도 장점이었습니다.",
            "플래티어가 자체 AI 플랫폼을 개발하며 축적해 온 기술력과 경험 역시 XGEN을 선택하는 데 중요한 요인이었습니다.",
        ],
    },
    {
        label: "운영해 보니",
        quotes: [
            "필요한 업무를 코드 없이 워크플로우로 구성해 바로 배포할 수 있습니다. 차세대 시스템 매뉴얼, 상품백과 챗봇, 엑셀 생성기도 모두 이 방식으로 만들었습니다.",
            "기반 AI 모델부터 XGEN 워크플로우, LLM 응답 결과까지 전반적으로 만족스러운 수준이며, 현재 사내 시스템에서도 안정적으로 운영하고 있습니다.",
            "최종 목표는 업무 지시와 결과 평가를 사람이 하고, 업무 과정은 AI가 최대한 자율적으로 처리하는 것입니다.",
        ],
    },
];

const H2 =
    "text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)] md:text-[26px] break-keep";
const KICKER =
    "text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]";
const LEAD =
    "mx-auto mt-5 max-w-3xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)] break-keep";
const B = "font-semibold text-[var(--color-ink)]";

/** 고객 인용 상자 — Why XGEN(선택 이유)과 Voice of Customer(운영해 보니)에서 같이 쓴다. */
function VocCard({
    en,
    groups,
    hideLabel = false,
}: {
    en: boolean;
    groups: { label: string; quotes: string[] }[];
    hideLabel?: boolean;
}) {
    return (
        <figure className="relative mt-10 overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8 md:p-11">
            <figcaption className="relative flex items-center gap-4">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#059669,#10b981)]">
                    <Building2 className="h-7 w-7 text-white" />
                </span>
                <div className="min-w-0 text-left">
                    <p className="text-[16px] font-bold text-[var(--color-ink)]">{en ? EN.vocSpeaker : "오주영 책임 · 롯데홈쇼핑 AX팀"}</p>
                    <p className="mt-0.5 text-[13.5px] font-semibold text-emerald-700">
                        {en ? EN.vocOrg : "롯데홈쇼핑 · 커머스"}
                    </p>
                </div>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[12.5px] font-bold text-emerald-600 sm:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {en ? EN.vocBadge : "운영 중 고객"}
                </span>
            </figcaption>

            <Quote className="relative mt-6 h-7 w-7 rotate-180 text-emerald-600/40" />
            <div className="relative mt-4 space-y-8">
                {groups.map((g, i) => (
                    <div key={g.label} className={i > 0 ? "border-t border-emerald-200 pt-8" : undefined}>
                        {!hideLabel && <p className="mb-3 text-left text-[13.5px] font-bold text-emerald-700">{g.label}</p>}
                        <blockquote className="space-y-4 break-keep text-left text-[17px] font-medium leading-relaxed text-[var(--color-ink)] md:text-[20px]">
                            {g.quotes.map((q) => (
                                <p key={q}>{q}</p>
                            ))}
                        </blockquote>
                    </div>
                ))}
            </div>
            <div className="relative mt-1 flex justify-end">
                <Quote className="h-7 w-7 text-emerald-600/40" />
            </div>
        </figure>
    );
}

export function LotteHomeshoppingBriefBody({
    locale = "ko",
    preview = false,
}: {
    locale?: Locale;
    preview?: boolean;
}) {
    const en = locale === "en";
    const highlights = en ? EN.highlights : HIGHLIGHTS;
    const areas = en
        ? AREAS.map((a, i) => ({ ...a, title: EN.areas[i][0], desc: EN.areas[i][1], status: EN.areas[i][2] }))
        : AREAS;
    const outcomes = en ? OUTCOMES.map((o, i) => ({ ...o, ...EN.outcomes[i] })) : OUTCOMES;
    const quoteGroups = en ? EN.quoteGroups : KO_QUOTE_GROUPS;

    return (
        <main>
            {preview && (
                <div className="border-b border-[#f3d9a4] bg-[#fff8e8]">
                    <p className="mx-auto max-w-6xl px-6 py-2.5 text-[13.5px] font-semibold text-[#8a5a00]">
                        {en
                            ? EN.previewBand
                            : "고객 검토본(요약판) · 검색 색인 제외 — 롯데홈쇼핑 확인을 거쳐 정식 공개합니다."}
                    </p>
                </div>
            )}

            {/* HERO — 제주은행 사례와 같은 구성 */}
            <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[#070b1c] text-white">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#2f7bff]/20 blur-[120px]"
                />
                <div className="relative mx-auto w-full max-w-4xl px-6 pt-28 pb-20">
                    <nav
                        aria-label={en ? EN.breadcrumbAria : "브레드크럼"}
                        className="flex flex-wrap items-center justify-center gap-1.5 text-[13px] text-white/45"
                    >
                        <Link href={localeHref(locale, "/customers")} className="transition hover:text-white">
                            {en ? EN.breadcrumbCases : "고객사례"}
                        </Link>
                        <span>/</span>
                        <Link href={localeHref(locale, "/customers/commerce")} className="transition hover:text-white">
                            {en ? EN.breadcrumbIndustry : "커머스"}
                        </Link>
                    </nav>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-[#2f7bff]/40 bg-[#2f7bff]/15 px-3 py-1 text-[12.5px] font-bold text-[#7fb0ff]">
                            XGEN
                        </span>
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12.5px] font-semibold text-white/70">
                            {en ? EN.badgeIndustry : "커머스 · 롯데홈쇼핑"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[12.5px] font-bold text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {en ? EN.badgeStatus : "운영·확산 중"}
                        </span>
                    </div>

                    <p className={`mt-8 ${KICKER} text-white/45`}>Customer Story</p>
                    <h1 className="mt-3 break-keep text-center text-[34px] font-bold leading-[1.15] tracking-tight md:text-[48px]">
                        {en ? (
                            EN.heroTitle
                        ) : (
                            <>
                                롯데홈쇼핑,
                                <br />
                                부서별 업무를 수행하는 AI&nbsp;Agent로
                            </>
                        )}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl break-keep text-center text-[18px] leading-relaxed text-white/70 md:text-[20px]">
                        {en
                            ? EN.heroLead
                            : "XGEN을 기반으로 AX팀이 업무에 필요한 AI Agent를 직접 만들고 현업에 배포하는 환경을 마련했습니다. 위해상품 판매차단과 차세대 시스템 업무 안내에서 시작해, 재경과 방송 품질·심의 업무로 활용 범위를 넓혀 가고 있습니다."}
                    </p>

                    <ul className="mt-9 flex flex-wrap justify-center gap-2">
                        {highlights.map((h) => (
                            <li
                                key={h}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13.5px] font-semibold text-white/80"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff]" />
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 선택의 이유 — 정리한 카드 대신 고객의 말(VoC)을 그대로 인용한다. 아래 「고객의 목소리」와 같은 인용 상자 */}
            <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                    <p className={KICKER}>Why XGEN</p>
                    <h2 className={`mt-3 ${H2}`}>{en ? EN.whyTitle : "롯데홈쇼핑이 XGEN을 선택한 이유"}</h2>
                    <VocCard en={en} groups={[quoteGroups[0]]} hideLabel />
                </div>
            </section>

            {/* 배경·과제 */}
            <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                <p className={KICKER}>The Challenge</p>
                <h2 className={`mt-3 ${H2}`}>
                    {en ? EN.challengeTitle : "답하는 챗봇에서, 일하는 AI Agent로"}
                </h2>
                <p className={LEAD}>
                    {en
                        ? EN.challengeLead
                        : "활용 부서가 늘어나면서 질문에 답하는 것을 넘어, 실제 업무를 수행하는 AI가 필요해졌습니다. 롯데홈쇼핑은 AI 플랫폼에 세 가지 조건을 요구했습니다."}
                </p>
                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                    {(en
                        ? EN.challengeCards.map(([t, d]) => ({ t, d }))
                        : [
                              { t: "모델의 병행 활용", d: "클라우드 모델과 온프레미스 오픈 모델을 한 플랫폼에서 함께 활용" },
                              { t: "현업이 직접 운영", d: "업무 요구가 바뀌면 사용자가 Agent를 직접 수정할 수 있어야 함" },
                              { t: "명확한 데이터 경계", d: "외부 반출이 제한된 데이터는 사내 GPU에서, 복잡한 추론만 클라우드로" },
                          ]
                    ).map((c) => (
                        <div
                            key={c.t}
                            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-5 text-center"
                        >
                            <p className="text-[15.5px] font-bold text-[var(--color-ink)]">{c.t}</p>
                            <p className="mt-2 break-keep text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{c.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 접근·솔루션 */}
            <section className="border-y border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                    <p className={KICKER}>The Solution</p>
                    <h2 className={`mt-3 ${H2}`}>
                        {en ? EN.solutionTitle : "데이터는 안전하게, AI 모델은 업무에 맞게"}
                    </h2>
                    <p className={LEAD}>
                        {en
                            ? EN.solutionLead
                            : "데이터의 보안 수준과 업무 특성에 따라 사내 AI 모델과 클라우드 AI 모델을 선택적으로 활용하고, AX팀이 필요한 AI Agent를 직접 만들어 배포하는 체계를 마련했습니다."}
                    </p>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        {[
                            {
                                h: en ? EN.solutionCard1 : "업무에 맞는 모델 선택",
                                items: en
                                    ? EN.solutionCard1Items
                                    : [
                                          "보안이 중요한 사내 데이터는 사내 GPU의 오픈 모델로 처리",
                                          "복잡한 분석과 추론은 Claude 등 클라우드 AI 모델로 처리",
                                          "하나의 워크플로우 안에서도 단계별로 적합한 모델을 연결",
                                      ],
                            },
                            {
                                h: en ? EN.solutionCard2 : "현업이 직접 만드는 AI Agent",
                                items: en
                                    ? EN.solutionCard2Items
                                    : [
                                          "별도의 코딩 없이 워크플로우로 구성해 바로 배포",
                                          "기능별 모듈 중 필요한 것만 골라 빠르게 구성하고 현업에 온보딩",
                                          "API·MCP로 사내 시스템과 연결하고, 구성한 도구를 다른 업무에 재사용",
                                      ],
                            },
                        ].map((card) => (
                            <div key={card.h} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <h3 className="text-[16px] font-bold text-[var(--color-ink)]">{card.h}</h3>
                                <ul className="mt-4 space-y-2.5 break-keep text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {card.items.map((li) => (
                                        <li key={li}>· {li}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 적용 기술 요약 */}
                    <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#2f7bff]" />
                            <h3 className="text-[15px] font-bold text-[var(--color-ink)]">
                                {en ? EN.techTitle : "적용 기술"}
                            </h3>
                        </div>
                        <p className="mt-3 break-keep text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {en ? (
                                <>
                                    XGEN runs <b className={B}>inside the customer&apos;s infrastructure</b>, with{" "}
                                    <b className={B}>in-house GPU models alongside cloud models</b>. Agents are built as{" "}
                                    <b className={B}>no-code workflows</b> and linked to internal systems through{" "}
                                    <b className={B}>APIs and MCP</b>. Inputs go through{" "}
                                    <b className={B}>harmful-content checks and personal-data detection and masking</b>,
                                    answers follow grounded-response rules, and new features roll out in stages.
                                </>
                            ) : (
                                <>
                                    XGEN을 <b className={B}>고객사 인프라 안에서 운영</b>하며{" "}
                                    <b className={B}>사내 GPU 모델과 클라우드 모델</b>을 병행합니다. Agent는{" "}
                                    <b className={B}>코딩 없는 워크플로우</b>로 만들고{" "}
                                    <b className={B}>API·MCP</b>로 사내 시스템과 연결합니다. 입력 단계에서는{" "}
                                    <b className={B}>유해 콘텐츠 검사와 개인정보 탐지·마스킹</b>을 거치고, 답변은 근거
                                    기반 기준을 따르며, 새 기능은 단계적으로 배포합니다.
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* 적용 업무 */}
            <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                <p className={KICKER}>What We Built</p>
                <h2 className={`mt-3 ${H2}`}>{en ? EN.builtTitle : "4개 업무에 AI Agent 적용"}</h2>
                <p className={LEAD}>
                    {en
                        ? EN.builtLead
                        : "고객이 직접 체감한 업무별 변화입니다. 일부 업무는 현재 연동을 진행하며 활용 범위를 넓혀가고 있습니다."}
                </p>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    {areas.map((a) => {
                        const Icon = a.icon;
                        return (
                            <div
                                key={a.no}
                                className="rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[#bcd0f5]"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf1fe] text-[#2461d8]">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-mono text-[13px] font-bold text-[var(--color-ink-subtle)]">
                                        {a.no}
                                    </span>
                                </div>
                                <p className="mt-4 text-[16px] font-bold text-[var(--color-ink)]">{a.title}</p>
                                <p className="mt-2 break-keep text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {a.desc}
                                </p>
                                <p className="mt-3 text-[12.5px] font-semibold text-[#1f7a46]">{a.status}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 text-center">
                    <p className="text-[15px] font-bold text-[var(--color-ink)]">
                        {en ? EN.builtNoteTitle : "지시와 검증은 사람이, 업무 과정은 AI Agent가"}
                    </p>
                    <p className="mt-2 break-keep text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                        {en
                            ? EN.builtNoteBody
                            : "영수증 전표 처리는 Agent가 품의 작성까지 이어 가고, 재경팀의 최종 검증을 거친 뒤에 처리됩니다."}
                    </p>
                </div>
            </section>

            {/* 기대효과 */}
            <section className="border-y border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
                    <p className={KICKER}>Outcomes</p>
                    <h2 className={`mt-3 ${H2}`}>
                        {en ? EN.outcomesTitle : "업무 자동화, 현업 중심 제작, 부서별 확산"}
                    </h2>
                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                        {outcomes.map((o) => (
                            <div key={o.no} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2461d8] font-mono text-[14px] font-bold text-white">
                                    {o.no}
                                </div>
                                <p className="mt-4 text-[16px] font-bold text-[var(--color-ink)]">{o.title}</p>
                                <ul className="mt-3 space-y-2 break-keep text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {o.points.map((p) => (
                                        <li key={p}>· {p}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 고객 인용 */}
            <section className="mx-auto w-full max-w-4xl px-6 pb-20 pt-16 md:pt-20">
                <p className={KICKER}>Voice of Customer</p>
                <h2 className={`mt-3 ${H2}`}>{en ? EN.vocTitle : "고객의 목소리"}</h2>

                {/* 선택 이유 인용은 맨 위 Why XGEN 섹션으로 옮겼다 */}
                <VocCard en={en} groups={quoteGroups.slice(1)} />

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-8">
                    <Link
                        href={localeHref(locale, "/customers")}
                        className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-ink-muted)] transition hover:text-[#2461d8]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {en ? EN.allCases : "전체 고객사례"}
                    </Link>
                    <Link
                        href={`${localeHref(locale, "/contact")}?from=customers-case`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#2461d8] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1b4fb0]"
                    >
                        {en ? EN.contact : "도입 문의"}
                    </Link>
                </div>
            </section>
        </main>
    );
}
