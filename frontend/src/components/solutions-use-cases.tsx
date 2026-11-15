import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 산업별 솔루션(/solutions) — 적용 사례.
 * 구 xgen.im Use Case 5개 페이지(Public · Manufacturing · Knowledge · Automation · Multi)의
 * 내용을 산업별 2개 + 업무별 3개 영역으로 옮겼다. 사진은 xgen.im 자산(자사 소유).
 * 각 영역 id는 GNB 「산업별 솔루션」 메뉴의 앵커 대상이다.
 */
type Case = {
    title: string;
    customer: string;
    stage: string;
    image: string;
    challenge: string;
    solution: string;
    result: string;
    href?: string;
};
type Area = {
    id: string;
    kind: string;
    title: string;
    sub: string;
    lead: string;
    cases: Case[];
};

const LABELS: Record<Locale, { challenge: string; solution: string; result: string; detail: string; byIndustry: string; byWork: string; lead: string; note: string }> = {
    ko: {
        challenge: "과제",
        solution: "구축 내용",
        result: "결과",
        detail: "고객사례 자세히 보기",
        byIndustry: "산업별",
        byWork: "업무별",
        lead: "공공·제조 현장과 지식 검색·업무 자동화·멀티 에이전트 업무에 XGEN을 적용한 사례입니다. 고객사는 익명으로 표기했습니다.",
        note: "수치는 각 고객사 환경에서 측정한 결과이며, 데이터와 구성에 따라 달라질 수 있습니다. PoC 단계 사례는 별도로 표시했습니다.",
    },
    en: {
        challenge: "Challenge",
        solution: "What we built",
        result: "Outcome",
        detail: "Read the customer case",
        byIndustry: "By industry",
        byWork: "By workload",
        lead: "Where XGEN has been applied: public-sector and manufacturing sites, plus knowledge search, workflow automation, and multi-agent work. Customers are kept anonymous.",
        note: "Figures were measured in each customer's environment and vary with data and configuration. Cases still at PoC stage are marked as such.",
    },
};

const AREAS: Record<Locale, Area[]> = {
    ko: [
        {
            id: "public",
            kind: "industry",
            title: "공공",
            sub: "AI Agent for Public Sector",
            lead: "대규모 공공 데이터에서 정확한 검색과 안정적인 운영이 함께 필요한 영역입니다.",
            cases: [
                {
                    title: "대규모 조달 검색 시스템을 AI로 고도화",
                    customer: "국내 공제회",
                    stage: "운영 중",
                    image: "/solutions/public.webp",
                    challenge: "대규모 조달(구매) 데이터에서 정확한 검색 결과를 제공해야 했지만, 기존 검색 방식으로는 데이터 규모가 커질수록 품질을 유지하기 어려웠습니다.",
                    solution: "AI 검색 기술로 조달 검색 영역을 다시 구축하고, 상주 운영 체계를 붙여 서비스를 안정화했습니다.",
                    result: "검색 고도화와 상주 운영으로 대규모 조달 데이터 환경에서 서비스가 안정적으로 운영되는 체계를 갖췄습니다.",
                    href: "/customers/case/public-procurement-search",
                },
            ],
        },
        {
            id: "manufacturing",
            kind: "industry",
            title: "제조",
            sub: "Intelligent Automation for Manufacturing",
            lead: "보안 제약으로 외부 AI 도구를 쓰기 어려운 제조 현장에서, 사내 환경 안에 AI를 구축하는 영역입니다.",
            cases: [
                {
                    title: "사내 개발 환경에 맞춘 AI 코딩 어시스턴트를 전사로 확산",
                    customer: "국내 반도체 제조 대기업",
                    stage: "확산 중",
                    image: "/solutions/manufacturing.webp",
                    challenge: "보안상 외부 코드 어시스턴트를 사용하기 어려웠고, 사내 환경에서 한글 기술 질의에 대한 답변 품질을 높여야 했습니다.",
                    solution: "사내 Local LLM에 연동한 AI 코딩 어시스턴트를 구축하고 한글 답변 품질을 개선했습니다. 사내 교육을 함께 진행해 실제 활용을 지원했습니다.",
                    result: "교육과 병행한 도입으로 활용 범위를 전사로 넓히는 단계까지 이어졌습니다.",
                    href: "/customers/case/semiconductor-code-assistant",
                },
            ],
        },
        {
            id: "knowledge",
            kind: "work",
            title: "지식 검색",
            sub: "Enterprise Knowledge Intelligence",
            lead: "사내 문서와 규정을 근거로 답하는 RAG 챗봇으로, 반복 문의와 지식 병목을 줄이는 영역입니다.",
            cases: [
                {
                    title: "사내 HR 규정을 응대하는 RAG 챗봇",
                    customer: "국내 기업 HR팀",
                    stage: "구축 완료",
                    image: "/solutions/knowledge-hr.webp",
                    challenge: "반복적인 HR 문의가 HR팀에 계속 들어왔고, 규정 변경이 전사에 제때 전달되지 않아 임직원 간 정보 격차가 생겼습니다.",
                    solution: "사내 HR 문서를 근거로 답하는 RAG 챗봇을 XGEN으로 구축해, Teams 안에서 근태·휴가·휴직 규정 문의에 24시간 응대하도록 했습니다. 규정 문서가 바뀌면 답변에 반영되고, 답변에는 근거 문서를 함께 제시합니다.",
                    result: "반복 FAQ 문의가 줄어 HR팀은 제도 설계 등 본연 업무에 집중할 수 있게 됐고, 임직원은 필요할 때 바로 답을 확인할 수 있게 됐습니다.",
                },
                {
                    title: "문서·이미지·표를 함께 다루는 멀티모달 RAG Editor",
                    customer: "국내 IT 프로젝트 조직",
                    stage: "구축 완료",
                    image: "/solutions/knowledge-rag.webp",
                    challenge: "구성원 간 솔루션 이해도 차이로 반복 질문 대응에 인력이 많이 쓰였고, 핵심 지식이 소수에게 집중돼 병목이 됐습니다.",
                    solution: "XGEN 기반 전용 챗봇과 RAG Editor를 구축해 문서뿐 아니라 이미지·데이터베이스·표를 함께 처리하도록 했습니다. 지식은 편집 가능한 형태로 관리해 계속 갱신합니다.",
                    result: "반복적인 대면·전화 문의의 약 90%를 챗봇으로 처리하게 되어 커뮤니케이션 비용이 줄었고, 신규 구성원의 프로젝트 적응 시간도 짧아졌습니다.",
                },
            ],
        },
        {
            id: "automation",
            kind: "work",
            title: "업무 자동화",
            sub: "Autonomous Workflows",
            lead: "답변에서 그치지 않고 사내 시스템과 연동해 요청 처리와 리포트 작성까지 이어가는 영역입니다.",
            cases: [
                {
                    title: "SRM과 연동해 요청을 처리하는 Actionable AI 챗봇",
                    customer: "국내 기업 구매 조직",
                    stage: "PoC 완료",
                    image: "/solutions/automation-srm.webp",
                    challenge: "같은 질문에 상담 인력이 반복 대응하며 운영비가 늘었고, 담당자마다 답변이 달라 공급사에 혼란을 줬습니다.",
                    solution: "LLM·RAG로 구매·입찰 요청을 이해하고 SRM 시스템과 연동해, 대화 안에서 계약 접수·검수 진행 현황 조회·견적서 재제출을 처리하는 챗봇을 구축했습니다.",
                    result: "PoC에서 공급사 응대 만족도 향상과 반복 대응 감소 효과를 확인했고, 이를 바탕으로 본 서비스 개발을 준비하고 있습니다.",
                },
                {
                    title: "시장·판매 데이터를 모아 리포트를 만드는 Insight Reporter",
                    customer: "L홈쇼핑",
                    stage: "구축 완료",
                    image: "/solutions/automation-report.webp",
                    challenge: "시장 리포트를 여러 채널 데이터에서 사람이 직접 모아 작성하고 있어, 반복 작성에 시간이 많이 들었습니다.",
                    solution: "홈쇼핑 3사·자사몰·네이버쇼핑 등 외부 데이터와 내부 판매·재고 데이터를 함께 분석하고, 경쟁사 비교를 포함한 보고서를 기업 양식으로 생성하는 Insight Reporter를 구축했습니다.",
                    result: "수작업 리포트 작성이 줄었고, 트렌드·경쟁사 데이터를 근거로 상품 소싱·기획 판단을 더 빨리 내릴 수 있게 됐습니다.",
                },
            ],
        },
        {
            id: "multi-agent",
            kind: "work",
            title: "통합형 멀티 에이전트",
            sub: "Unified Multi-Agent System",
            lead: "검색·상담·개발처럼 팀별로 나뉜 AI 기능을 같은 데이터를 공유하는 하나의 체계로 묶는 영역입니다.",
            cases: [
                {
                    title: "검색·상담·코드를 하나의 AI 운영 체계로 통합",
                    customer: "국내 이커머스·미디어 기업",
                    stage: "운영 중",
                    image: "/solutions/multi-agent.webp",
                    challenge: "부정확한 상품 검색으로 구매 전환이 일어나지 않았고, 고객 문의 대응 인력과 사이트 개선 개발 인력도 부족했습니다. 검색·CS·개발팀이 각자 풀던 문제였습니다.",
                    solution: "자연어 의도를 이해하는 AI 검색, 고객 데이터 기반 상담 분석, 사이트 구조를 바탕으로 코드 작성을 돕는 AI 코딩 어시스턴트를 같은 데이터를 공유하는 하나의 체계로 설계했습니다.",
                    result: "런칭 후 매출·거래금액과 접속 트래픽이 각각 전월 대비 약 20% 늘었습니다. 세 팀이 같은 고객 데이터를 공유하면서 개선 주기도 짧아졌습니다.",
                },
            ],
        },
    ],
    en: [
        {
            id: "public",
            kind: "industry",
            title: "Public sector",
            sub: "AI Agent for Public Sector",
            lead: "Large public datasets that need accurate search and dependable day-to-day operation.",
            cases: [
                {
                    title: "Large-scale procurement search, rebuilt on AI",
                    customer: "A public mutual-aid association",
                    stage: "In operation",
                    image: "/solutions/public.webp",
                    challenge: "Search had to return accurate results across a very large body of procurement data, and quality became harder to hold as the data grew.",
                    solution: "The procurement search layer was rebuilt on AI search, and an on-site operations team was added to stabilize the service.",
                    result: "Search modernization plus on-site operations gave the association a setup that runs reliably at that data scale.",
                    href: "/customers/case/public-procurement-search",
                },
            ],
        },
        {
            id: "manufacturing",
            kind: "industry",
            title: "Manufacturing",
            sub: "Intelligent Automation for Manufacturing",
            lead: "Manufacturing sites where security rules keep external AI tools out, so AI has to be built inside the company environment.",
            cases: [
                {
                    title: "An in-house AI coding assistant, rolled out company-wide",
                    customer: "A large semiconductor manufacturer",
                    stage: "Expanding",
                    image: "/solutions/manufacturing.webp",
                    challenge: "Security rules ruled out external coding assistants, and answer quality for Korean technical questions had to improve inside the company environment.",
                    solution: "An AI coding assistant connected to the in-house local LLM was built and its Korean answers were improved, with internal training run alongside to support real use.",
                    result: "Rolling it out together with training carried adoption through to a company-wide expansion stage.",
                    href: "/customers/case/semiconductor-code-assistant",
                },
            ],
        },
        {
            id: "knowledge",
            kind: "work",
            title: "Knowledge search",
            sub: "Enterprise Knowledge Intelligence",
            lead: "RAG chatbots that answer from internal documents and policies, cutting repeat questions and knowledge bottlenecks.",
            cases: [
                {
                    title: "A RAG chatbot for internal HR policy questions",
                    customer: "An enterprise HR team",
                    stage: "Delivered",
                    image: "/solutions/knowledge-hr.webp",
                    challenge: "Repetitive HR questions kept reaching the HR team, and policy changes did not reach every employee in time.",
                    solution: "A RAG chatbot grounded in internal HR documents was built on XGEN and runs inside Teams around the clock for attendance, leave, and absence questions. Policy updates flow into answers, and each answer cites its source document.",
                    result: "Fewer repeat FAQs let the HR team focus on policy design, and employees can check answers when they need them.",
                },
                {
                    title: "A multimodal RAG Editor for documents, images, and tables",
                    customer: "An IT project organization",
                    stage: "Delivered",
                    image: "/solutions/knowledge-rag.webp",
                    challenge: "Uneven understanding of the solution meant people spent a lot of time answering the same questions, and key knowledge sat with a few people.",
                    solution: "A dedicated chatbot and RAG Editor built on XGEN handle documents together with images, databases, and tables. Knowledge is kept in an editable form so it stays current.",
                    result: "About 90% of repetitive in-person and phone questions moved to the chatbot, reducing communication cost and shortening onboarding for new team members.",
                },
            ],
        },
        {
            id: "automation",
            kind: "work",
            title: "Workflow automation",
            sub: "Autonomous Workflows",
            lead: "Going past answers: connecting to internal systems to process requests and produce reports.",
            cases: [
                {
                    title: "An actionable AI chatbot connected to SRM",
                    customer: "An enterprise procurement team",
                    stage: "PoC completed",
                    image: "/solutions/automation-srm.webp",
                    challenge: "Staff answered the same supplier questions repeatedly, and answers differed by person, confusing suppliers.",
                    solution: "Using LLM and RAG to understand purchasing and bidding requests, and connecting to the SRM system, the chatbot handles contract intake, inspection status checks, and quote resubmission inside the conversation.",
                    result: "The PoC showed higher supplier satisfaction and fewer repeat responses; full service development is being prepared on that basis.",
                },
                {
                    title: "Insight Reporter: market and sales data into reports",
                    customer: "Home-shopping retailer L",
                    stage: "Delivered",
                    image: "/solutions/automation-report.webp",
                    challenge: "Market reports were compiled by hand from several channels, so repeat writing took a lot of time.",
                    solution: "Insight Reporter analyzes external data (three home-shopping peers, the company's own mall, Naver Shopping) with internal sales and inventory data, and generates reports with competitor comparison in the company's template.",
                    result: "Manual report writing dropped, and sourcing and merchandising decisions can be made faster on trend and competitor data.",
                },
            ],
        },
        {
            id: "multi-agent",
            kind: "work",
            title: "Unified multi-agent",
            sub: "Unified Multi-Agent System",
            lead: "Bringing team-by-team AI functions such as search, support, and development into one system that shares the same data.",
            cases: [
                {
                    title: "Search, support, and code in one AI operating model",
                    customer: "An e-commerce and media company",
                    stage: "In operation",
                    image: "/solutions/multi-agent.webp",
                    challenge: "Inaccurate product search hurt conversion, and both customer-support and site-development capacity were short. Search, CS, and development each owned a piece of the problem.",
                    solution: "AI search that understands natural-language intent, customer-data-based support analysis, and an AI coding assistant that helps write code from the site structure were designed as one system sharing the same data.",
                    result: "After launch, sales/transaction value and site traffic each rose about 20% month over month, and with all three teams sharing the same customer data, improvement cycles got shorter.",
                },
            ],
        },
    ],
};

export const USE_CASE_ANCHORS = ["public", "manufacturing", "knowledge", "automation", "multi-agent"] as const;

export function SolutionsUseCases({ locale }: { locale: Locale }) {
    const L = LABELS[locale];
    const areas = AREAS[locale];
    const groups = [
        { key: "industry", label: L.byIndustry },
        { key: "work", label: L.byWork },
    ];
    return (
        <div className="space-y-10 text-left">
            <p className="max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">{L.lead}</p>

            {/* 영역 바로가기 — 모바일에서는 줄바꿈 대신 가로 스크롤 */}
            <div className="-mx-6 overflow-x-auto px-6">
                <div className="flex w-max gap-2">
                    {groups.map((g) => (
                        <div key={g.key} className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">{g.label}</span>
                            {areas.filter((a) => a.kind === g.key).map((a) => (
                                <a
                                    key={a.id}
                                    href={`#${a.id}`}
                                    className="whitespace-nowrap rounded-full border border-[var(--color-line)] bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-[var(--color-ink-muted)] transition hover:border-[#2461d8] hover:text-[#2461d8]"
                                >
                                    {a.title}
                                </a>
                            ))}
                            <span className="mx-2 h-4 w-px bg-[var(--color-line)] last:hidden" />
                        </div>
                    ))}
                </div>
            </div>

            {areas.map((a) => (
                <div
                    key={a.id}
                    id={a.id}
                    className="scroll-mt-[calc(var(--nav-h,84px)+72px)] border-t border-[var(--color-line)] pt-10"
                >
                    <p className="text-[13px] font-semibold text-[#2461d8]">
                        {a.kind === "industry" ? L.byIndustry : L.byWork} · {a.sub}
                    </p>
                    <h3 className="mt-1.5 text-[24px] font-bold tracking-tight text-[var(--color-ink)]">{a.title}</h3>
                    <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{a.lead}</p>

                    <div className="mt-6 space-y-8">
                        {a.cases.map((c) => (
                            <article key={c.title} className="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
                                <div className="w-full max-w-[320px] self-start overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] sm:max-w-none">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={c.image} alt="" loading="lazy" className="block aspect-[16/10] h-auto w-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[13.5px] text-[var(--color-ink-subtle)]">
                                        {c.customer} · <span className="font-semibold text-[var(--color-ink-muted)]">{c.stage}</span>
                                    </p>
                                    <h4 className="mt-1 text-[19px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">{c.title}</h4>
                                    <dl className="mt-4 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                                        {[
                                            [L.challenge, c.challenge],
                                            [L.solution, c.solution],
                                            [L.result, c.result],
                                        ].map(([k, v]) => (
                                            <div key={k} className="grid gap-1 py-3 sm:grid-cols-[88px_1fr] sm:gap-4">
                                                <dt className="text-[13.5px] font-semibold text-[var(--color-ink)]">{k}</dt>
                                                <dd className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{v}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    {c.href && (
                                        <Link
                                            href={localeHref(locale, c.href)}
                                            className="group mt-4 inline-flex items-center gap-1 text-[14.5px] font-semibold text-[#2461d8] hover:underline"
                                        >
                                            {L.detail}
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                        </Link>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            ))}

            <p className="border-t border-[var(--color-line)] pt-6 text-[13px] leading-relaxed text-[var(--color-ink-subtle)]">{L.note}</p>
        </div>
    );
}
