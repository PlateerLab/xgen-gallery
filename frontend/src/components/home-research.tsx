import Link from "next/link";
import { ShieldCheck, Database, Boxes, ArrowRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 — Research 미리보기. GNB의 /research 핵심 메시지(연구 과제 3축 + 핵심 연구 분야)를
 * 홈에 요약해 노출하고 전체 페이지로 연결한다. 카피는 /research 페이지와 동일 톤.
 */
const GRAD =
    "bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent";

/** 연구 분야 라벨은 고유명사라 두 언어 공통. */
const AREAS = [
    "Agentic AI Runtime",
    "Knowledge & RAG",
    "Ontology & Graph Intelligence",
    "Enterprise Model Architecture",
    "AI Connectivity & MCP",
    "AI Governance & Security",
];

const COPY: Record<
    Locale,
    {
        title: React.ReactNode;
        lead: string;
        more: string;
        pillars: { icon: typeof ShieldCheck; title: string; body: string }[];
    }
> = {
    ko: {
        title: (
            <>
                <span className={GRAD}>Enterprise AI</span>를 현실로 만드는 연구
            </>
        ),
        lead: "기업 환경의 AI 도입은 더 이상 모델 성능만으로 결정되지 않습니다",
        more: "연구 영역 둘러보기",
        pillars: [
            {
                icon: ShieldCheck,
                title: "신뢰할 수 있는 AI",
                body: "AI가 지어낸 답이 아닌, 기업이 보유한 지식과 데이터에 근거한 답을 제공합니다",
            },
            {
                icon: Database,
                title: "기업 데이터 주권",
                body: "AI는 기업 내부 데이터 위에서 동작해야 합니다 — 온프레미스 중심 아키텍처를 연구합니다",
            },
            {
                icon: Boxes,
                title: "조합하고 확장하는 AI",
                body: "Agent·Workflow·Knowledge·Tool을 모듈화해 재조합하는 Composable AI Architecture",
            },
        ],
    },
    en: {
        title: (
            <>
                Research that makes <span className={GRAD}>Enterprise AI</span>{" "}
                practical
            </>
        ),
        lead: "In the enterprise, AI adoption stopped being a question of model benchmarks a while ago",
        more: "Explore our research areas",
        pillars: [
            {
                icon: ShieldCheck,
                title: "AI you can trust",
                body: "Answers grounded in the knowledge and data your company already holds — not in what the model invented",
            },
            {
                icon: Database,
                title: "Data sovereignty",
                body: "AI belongs on top of your internal data. We research on-premise-first architecture to keep it there",
            },
            {
                icon: Boxes,
                title: "Composable, extensible AI",
                body: "A Composable AI architecture that modularizes agents, workflows, knowledge, and tools so they can be recombined",
            },
        ],
    },
};

export function HomeResearch({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    / Research
                </p>
                <h2 className="mt-3 max-w-3xl mx-auto text-center text-4xl font-semibold tracking-tight md:text-5xl">
                    {t.title}
                </h2>
                <p className="mt-5 mx-auto max-w-2xl text-[17px] text-center leading-relaxed text-[var(--color-ink-muted)]">
                    {t.lead}
                </p>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {t.pillars.map((p) => (
                        <div
                            key={p.title}
                            className="rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center"
                        >
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <p.icon className="h-5 w-5" />
                            </span>
                            <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {p.title}
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {p.body}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {AREAS.map((a) => (
                        <span
                            key={a}
                            className="rounded-full border border-[var(--color-line)] bg-white px-3.5 py-1.5 font-mono text-[12.5px] text-[var(--color-ink-muted)]"
                        >
                            {a}
                        </span>
                    ))}
                </div>

                <div className="mt-10 flex justify-end">
                    <Link
                        href={localeHref(locale, "/research")}
                        className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        {t.more}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
