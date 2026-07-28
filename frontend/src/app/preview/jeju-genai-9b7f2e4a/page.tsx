import Link from "next/link";
import {
    ShieldCheck,
    HeartHandshake,
    LineChart,
    Building2,
    Radar,
    Boxes,
    Quote,
    Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { pageMetadata } from "@/lib/metadata";

/**
 * 제주은행 GenAI 플랫폼 고객사례 — 고객 리뷰용 히든 프리뷰.
 *
 * 이 라우트는 sitemap·robots·GNB 어디에도 노출되지 않는다(추측 불가 토큰 URL +
 * noindex). 고객 검토·승인 전까지의 검토본이며, 승인 후 확정 문안을
 * lib/customers.ts + /customers/case/* 정식 라우트로 옮긴다.
 */

export const metadata = pageMetadata({
    title: "제주은행 GenAI 플랫폼 구축 사례 (검토본)",
    description:
        "제주은행과 XGEN 기반 사내 생성형 AI 플랫폼을 구축하고, 직원이 직접 AI Agent를 만들어 쓰는 실행형 AX 체계를 전행으로 확산한 금융권 사례",
    path: "/preview/jeju-genai-9b7f2e4a",
    robots: { index: false, follow: false },
});

const HIGHLIGHTS = [
    "사내 생성형 AI 플랫폼 구축",
    "망분리·온프레미스 운영",
    "현업 직접 제작",
    "전행 업무 프로세스 내재화",
];

const AREAS = [
    {
        icon: ShieldCheck,
        no: "01",
        title: "준법·감사 자동화",
        desc: "상시감시, KYC, 내부통제·감사 항목 선정과 위험도 기반 분석 지원",
    },
    {
        icon: HeartHandshake,
        no: "02",
        title: "소비자보호 업무지원",
        desc: "보이스피싱·민원 대응 문서 작성과 민원 통계 분석 지원",
    },
    {
        icon: LineChart,
        no: "03",
        title: "영업·상품 업무 효율화",
        desc: "영업점 의견서, 일일속보, 신상품 기획·리서치 등 보고·분석 자동화",
    },
    {
        icon: Radar,
        no: "04",
        title: "여신·금융 모니터링",
        desc: "조달 개찰·입찰 모니터링, 시장·상품 비교 및 요약",
    },
    {
        icon: Boxes,
        no: "05",
        title: "전행 공통 Agent",
        desc: "업무 QA, 문서 분류, 품질 점검 등 전행 공통 업무지원 체계",
    },
    {
        icon: Building2,
        no: "06",
        title: "데이터 기반 실적 공유",
        desc: "Agent 활용 데이터 보고서 정리와 실적 분석으로 업무 현황 가시화",
    },
];

const OUTCOMES = [
    {
        no: "1",
        title: "AI 기반 업무혁신 정착",
        points: [
            "생성형 AI로 업무 표준화와 반복 업무 자동화",
            "문서 작성·자료 조사·보고서 작성 시간 단축",
            "직원이 고부가가치 업무에 집중하는 환경 조성",
        ],
    },
    {
        no: "2",
        title: "전행 AI 활용문화 확산",
        points: [
            "누구나 쉽게 활용하는 AI 플랫폼 제공",
            "AI Agent 기반 업무혁신 문화 정착",
            "AI 리터러시 향상과 AI Native 조직으로 전환",
        ],
    },
    {
        no: "3",
        title: "AI 서비스 확장 기반 확보",
        points: [
            "MCP·API로 다양한 사내 시스템 연계",
            "공통 AI 플랫폼 기반 부서별 AI Agent 개발",
            "데이터·AI 자산의 지속적 축적과 재활용",
        ],
    },
];

const ROADMAP = [
    {
        step: "1단계",
        when: "2026년 3/4분기",
        title: "플랫폼 안정화 및 활용 확산",
        points: [
            "전 직원 생성형 AI 플랫폼 오픈 및 사용 활성화",
            "QA·업무지원 Agent 지속 확대",
            "지식 컬렉션 구축 및 업무 데이터 지속 축적",
        ],
    },
    {
        step: "2단계",
        when: "2026년 하반기",
        title: "AI Agent 고도화",
        points: [
            "부서별 Vertical AI Agent 확대",
            "MCP·API 연계를 통한 업무 자동화 강화",
            "협업 Agent 기반 협업 체계 구축",
        ],
    },
    {
        step: "3단계",
        when: "2027년",
        title: "AI Native Bank 구현",
        points: [
            "AI가 스스로 업무를 수행하는 Agent 중심 업무환경 구축",
            "핵심 업무 프로세스에 AI 내재화",
            "고객서비스와 내부업무를 잇는 AI 생태계 완성",
        ],
    },
];

const H2 =
    "text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)] md:text-[26px]";
const KICKER =
    "text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]";

export default function JejuGenAIPreviewPage() {
    return (
        <>
            <SiteNav />

            {/* 리뷰용 안내 리본 — 고객 검토본임을 알림(대외 공개 전) */}
            <div className="fixed inset-x-0 top-0 z-[60] bg-[#c81e1e] py-1.5 text-center text-[12px] font-semibold text-white">
                검토용 미리보기 · 대외 공개 전 확인본
            </div>

            <main className="pt-8">
                {/* HERO */}
                <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#2f7bff]/20 blur-[120px]"
                    />
                    <div className="relative mx-auto w-full max-w-4xl px-6 pt-28 pb-20">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="inline-flex items-center rounded-full border border-[#2f7bff]/40 bg-[#2f7bff]/15 px-3 py-1 text-[12.5px] font-bold text-[#7fb0ff]">
                                XGEN
                            </span>
                            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12.5px] font-semibold text-white/70">
                                금융 · 제주은행
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[12.5px] font-bold text-emerald-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                운영 중
                            </span>
                        </div>

                        <p className={`mt-8 ${KICKER} text-white/45`}>
                            Customer Story
                        </p>
                        <h1 className="mt-3 text-center text-[34px] font-bold leading-[1.15] tracking-tight md:text-[48px]">
                            제주은행,
                            <br />
                            AI와 함께 일하는 은행으로
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-center text-[18px] leading-relaxed text-white/70 md:text-[20px]">
                            XGEN 기반 사내 생성형 AI 플랫폼을 구축해, 직원 누구나
                            직접 AI Agent를 만들고 실제 업무에 활용하는 실행형 AX
                            환경을 마련했습니다. 준법·감사부터 소비자보호,
                            영업지원까지 전행 업무 프로세스에 AI Agent를 단계적으로
                            내재화하고 있습니다.
                        </p>

                        <ul className="mt-9 flex flex-wrap justify-center gap-2">
                            {HIGHLIGHTS.map((h) => (
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

                {/* 배경·과제 */}
                <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                    <p className={KICKER}>The Challenge</p>
                    <h2 className={`mt-3 ${H2}`}>보안 위에서, 현업이 직접 쓰는 AI</h2>
                    <p className="mx-auto mt-5 max-w-3xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                        금융권은 강한 보안·망분리 요건 위에서 업무를 운영합니다.
                        외부 생성형 AI 서비스를 그대로 쓰기 어려운 환경에서,
                        제주은행은 세 가지를 동시에 풀어야 했습니다.
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                t: "보안 위에서의 도입",
                                d: "망분리·온프레미스 환경을 지키면서 생성형 AI를 사내 업무에 적용",
                            },
                            {
                                t: "현업이 직접 쓰는 도구",
                                d: "IT 조직만이 아니라 현업 직원이 직접 AI를 만들고 쓸 수 있어야 함",
                            },
                            {
                                t: "일회성이 아닌 내재화",
                                d: "데모로 끝나지 않고 실제 전행 업무 프로세스에 정착",
                            },
                        ].map((c) => (
                            <div
                                key={c.t}
                                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-5 text-center"
                            >
                                <p className="text-[15.5px] font-bold text-[var(--color-ink)]">
                                    {c.t}
                                </p>
                                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {c.d}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 접근·솔루션 */}
                <section className="border-y border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                        <p className={KICKER}>The Solution</p>
                        <h2 className={`mt-3 ${H2}`}>
                            직원이 직접 만드는 실행형 AX 플랫폼
                        </h2>
                        <p className="mx-auto mt-5 max-w-3xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN 기반 생성형 AI 플랫폼을 은행 인프라에 온프레미스로
                            구축하고, 현업 직원이 직접 AI Agent를 설계·검증·활용하는
                            실행형 체계를 마련했습니다.
                        </p>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <h3 className="text-[16px] font-bold text-[var(--color-ink)]">
                                    직원이 직접 만드는 AI Agent
                                </h3>
                                <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    <li>
                                        · 캔버스에서 노드를 연결하거나, 템플릿·튜토리얼로
                                        손쉽게 시작
                                    </li>
                                    <li>
                                        · 대화(Chat)만으로 Agent 생성 — 목표를 설명하면
                                        필요한 단계·도구를 안내받아 완성
                                    </li>
                                    <li>
                                        · 사내 문서를 업로드하고 지식 컬렉션에 연결하면
                                        즉시 QnA Agent로 활용
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <h3 className="text-[16px] font-bold text-[var(--color-ink)]">
                                    업무 현장에 바로 연결
                                </h3>
                                <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    <li>
                                        · 협업 툴에서 Agent를 호출해 질문에 답하고, 여러
                                        Agent 중 가장 적합한 Agent가 응답
                                    </li>
                                    <li>
                                        · 표준 양식 기반 문서 초안 작성 등 실제 업무
                                        산출물로 연결
                                    </li>
                                    <li>
                                        · MCP·API로 사내 시스템과 연계해 활용 범위를 확장
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 적용 기술 요약 */}
                        <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#2f7bff]" />
                                <h3 className="text-[15px] font-bold text-[var(--color-ink)]">
                                    적용 기술
                                </h3>
                            </div>
                            <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                XGEN 기반 Agentic AI 플랫폼을{" "}
                                <b className="font-semibold text-[var(--color-ink)]">
                                    온프레미스·망분리 환경
                                </b>
                                에 구축했습니다. 현업 직원은 캔버스·템플릿·대화형으로
                                Agent를 저작하고, 사내 문서를{" "}
                                <b className="font-semibold text-[var(--color-ink)]">
                                    지식 컬렉션(RAG)
                                </b>
                                에 연결해 QnA로 활용합니다.{" "}
                                <b className="font-semibold text-[var(--color-ink)]">
                                    MCP·API
                                </b>
                                로 사내 시스템과 협업 툴을 연계하며,{" "}
                                <b className="font-semibold text-[var(--color-ink)]">
                                    개인정보(PII) 마스킹·금칙어 필터
                                </b>{" "}
                                등 생성 단계 통제와 활용 모니터링으로 금융권 보안
                                요건을 충족합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 추진 영역 */}
                <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                    <p className={KICKER}>What We Built</p>
                    <h2 className={`mt-3 ${H2}`}>전행 6개 영역에 AI Agent 적용</h2>
                    <p className="mx-auto mt-5 max-w-3xl text-center text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                        전행 업무를 6개 영역으로 나눠 분야별 대표 과제를 선정하고,
                        AI Agent를 적용했습니다. 분야별 대표 Agent를 중심으로 전행
                        차원의 확산을 이어가고 있습니다.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {AREAS.map((a) => {
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
                                    <p className="mt-4 text-[16px] font-bold text-[var(--color-ink)]">
                                        {a.title}
                                    </p>
                                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {a.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 text-center">
                        <p className="text-[15px] font-bold text-[var(--color-ink)]">
                            개별 업무 보조를 넘어, 전행 프로세스로
                        </p>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            문서 작성·데이터 분석·내부통제·영업지원까지, 전행 업무
                            프로세스에 Agent를 단계적으로 내재화하고 있습니다.
                        </p>
                    </div>
                </section>

                {/* 기대효과 */}
                <section className="border-y border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                        <p className={KICKER}>Outcomes</p>
                        <h2 className={`mt-3 ${H2}`}>
                            업무혁신·활용문화·서비스 확장을 전행으로
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {OUTCOMES.map((o) => (
                                <div
                                    key={o.no}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2461d8] font-mono text-[14px] font-bold text-white">
                                        {o.no}
                                    </div>
                                    <p className="mt-4 text-[16px] font-bold text-[var(--color-ink)]">
                                        {o.title}
                                    </p>
                                    <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {o.points.map((p) => (
                                            <li key={p}>· {p}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 향후 계획 */}
                <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
                    <p className={KICKER}>Roadmap</p>
                    <h2 className={`mt-3 ${H2}`}>
                        플랫폼 안정화에서 AI Native Bank까지
                    </h2>
                    {/* 세로 타임라인 — 스파인 라인 + 번호 노드로 단계 진행(여정) 표현 */}
                    <ol className="relative mx-auto mt-12 max-w-2xl space-y-9 before:absolute before:bottom-4 before:left-[23px] before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-[#2461d8] before:via-[var(--color-line-strong)] before:to-[var(--color-line)]">
                        {ROADMAP.map((r, i) => (
                            <li key={r.step} className="relative flex gap-5 text-left md:gap-7">
                                <span className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#2461d8] font-mono text-[15px] font-bold text-white ring-4 ring-[var(--color-surface)]">
                                    {i + 1}
                                </span>
                                <div className="pb-1 pt-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center rounded-full bg-[#eaf1fe] px-3 py-1 text-[13px] font-bold text-[#2461d8]">
                                            {r.step}
                                        </span>
                                        <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)]">
                                            {r.when}
                                        </span>
                                    </div>
                                    <p className="mt-2.5 text-[17px] font-bold text-[var(--color-ink)]">
                                        {r.title}
                                    </p>
                                    <ul className="mt-3 space-y-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {r.points.map((p) => (
                                            <li key={p} className="flex gap-2">
                                                <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-[#2f7bff]" />
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* 고객 인용 */}
                <section className="mx-auto w-full max-w-4xl px-6 pb-20">
                    {/* 고객의 소리(VoC) — 화자 아이덴티티 + 자평/비전 인용 */}
                    <p className={KICKER}>Voice of Customer</p>
                    <h2 className={`mt-3 ${H2}`}>고객의 목소리</h2>

                    <figure className="relative mt-10 overflow-hidden rounded-3xl bg-[#070b1c] p-8 text-white md:p-11">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#2f7bff]/25 blur-[100px]"
                        />
                        {/* 화자 아이덴티티 */}
                        <figcaption className="relative flex items-center gap-4">
                            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2461d8,#00acee)] shadow-[0_10px_26px_-10px_rgba(47,123,255,0.8)]">
                                <Building2 className="h-7 w-7 text-white" />
                            </span>
                            <div className="min-w-0 text-left">
                                <p className="text-[16px] font-bold text-white">
                                    제주은행 AI 혁신팀장
                                </p>
                                <p className="mt-0.5 text-[13.5px] font-semibold text-[#7fb0ff]">
                                    제주은행 · 금융
                                </p>
                            </div>
                            <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[12.5px] font-bold text-emerald-300 sm:inline-flex">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                운영 중 고객
                            </span>
                        </figcaption>

                        {/* 인용 */}
                        <Quote className="relative mt-8 h-7 w-7 text-[#4d7fd6]" />
                        <blockquote className="relative mt-4 text-left text-[18px] font-medium leading-relaxed md:text-[21px]">
                            “생성형 AI 플랫폼 구축은 단순히 시스템을 도입하는
                            프로젝트가 아니라, 업무 방식과 조직 문화를 함께 바꾸는
                            과정이었습니다. 쉽지 않은 여정이었지만, XGEN의 안정적인
                            플랫폼과 수행팀의 빠르고 유연한 대응 덕분에 프로젝트를
                            성공적으로 추진할 수 있었습니다. 특히 현업의 다양한
                            요구사항을 신속하게 반영하며 안정적으로 구축을 완료할 수
                            있었던 점이 인상적이었습니다. 이제 제주은행은 AI를 활용하는
                            수준을 넘어, AI와 함께 일하는 AI Native Bank로 한 단계 더
                            도약해 나갈 것입니다.”
                        </blockquote>
                    </figure>

                    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-8">
                        <p className="text-[14px] text-[var(--color-ink-subtle)]">
                            Plateer Labs · XGEN Agentic AI Platform
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#2461d8] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1b4fb0]"
                        >
                            도입 문의
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
