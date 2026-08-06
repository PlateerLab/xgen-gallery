import Link from "next/link";
import { Cpu, Layers, Server, ArrowRight } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 메인 — Technology 미리보기. /technology의 3대 축(Engines·Frameworks·Runtime)을
 * 한 줄 핵심 메시지와 하위 키워드로 요약해 노출한다.
 */
const GRAD =
    "bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent";

/** 기술 키워드는 고유명사라 두 언어 공통. */
const GROUP_ITEMS: Record<string, string[]> = {
    Engines: ["Ontology", "Harness"],
    Frameworks: ["AgenticOps", "GraphRAG", "Hybrid RAG", "Context Engineering"],
    Runtime: ["MCP Apps", "Runtime SDK", "Runtime API"],
};

const COPY: Record<
    Locale,
    {
        title: React.ReactNode;
        lead: string;
        more: string;
        groups: { icon: typeof Cpu; kicker: string; title: string; body: string }[];
    }
> = {
    ko: {
        title: (
            <>
                실제 운영을 위한 <span className={GRAD}>핵심 엔진</span>과 프레임워크
            </>
        ),
        lead: "실험을 넘어 실제 운영까지 — Enterprise AI를 위한 핵심 엔진과 프레임워크를 연구하고 설계합니다",
        more: "기술 자세히 보기",
        groups: [
            {
                icon: Cpu,
                kicker: "Engines",
                title: "사실을 따라가는 지식 엔진",
                body: "벡터 유사도를 넘어 데이터 사이의 관계를 따라가고, AI가 일하는 환경 전체를 설계합니다",
            },
            {
                icon: Layers,
                kicker: "Frameworks",
                title: "운영 지능과 검색",
                body: "정확한 지식 맥락과 검증된 실행을 묶어 신뢰할 수 있는 결과를 보장합니다",
            },
            {
                icon: Server,
                kicker: "Runtime",
                title: "감싸지 않고, 코드로 담아냅니다",
                body: "워크플로우와 정책을 표준 코드로 내재화해 어디서나 실행되는 독립 패키지로 내보냅니다",
            },
        ],
    },
    en: {
        title: (
            <>
                The <span className={GRAD}>engines</span> and frameworks behind
                real operations
            </>
        ),
        lead: "Past the experiment and into production — we research and design the core engines and frameworks Enterprise AI runs on",
        more: "Explore the technology",
        groups: [
            {
                icon: Cpu,
                kicker: "Engines",
                title: "A knowledge engine that follows the facts",
                body: "It traces the relationships between your data rather than stopping at vector similarity, and it shapes the whole environment the AI works in",
            },
            {
                icon: Layers,
                kicker: "Frameworks",
                title: "Operational intelligence and retrieval",
                body: "Precise knowledge context bound to verified execution, so the result holds up",
            },
            {
                icon: Server,
                kicker: "Runtime",
                title: "Not a wrapper — it compiles to code",
                body: "Workflows and policies become standard code, exported as a self-contained package that runs anywhere",
            },
        ],
    },
};

export function HomeTechnology({ locale = "ko" }: { locale?: Locale }) {
    const t = COPY[locale];
    return (
        <section className="border-t border-[var(--color-line)] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    / Technology
                </p>
                <h2 className="mt-3 max-w-3xl mx-auto text-center text-4xl font-semibold tracking-tight md:text-5xl">
                    {t.title}
                </h2>
                <p className="mt-5 mx-auto max-w-2xl text-[17px] text-center leading-relaxed text-[var(--color-ink-muted)]">
                    {t.lead}
                </p>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {t.groups.map((g) => (
                        <div
                            key={g.kicker}
                            className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                    <g.icon className="h-5 w-5" />
                                </span>
                                <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                                    {g.kicker}
                                </span>
                            </div>
                            <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {g.title}
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {g.body}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {GROUP_ITEMS[g.kicker].map((it) => (
                                    <span
                                        key={it}
                                        className="rounded-md border border-[var(--color-line)] bg-white px-2 py-1 font-mono text-[12px] text-[var(--color-ink-muted)]"
                                    >
                                        {it}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-end">
                    <Link
                        href={localeHref(locale, "/technology")}
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
