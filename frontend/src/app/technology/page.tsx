import Link from "next/link";
import {
    Settings2,
    ShieldCheck,
    Network,
    Layers,
    ArrowRight,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { GroupPage } from "@/components/onepage";
import {
    EnginesContent,
    FrameworksContent,
} from "@/components/technology-sections";
import { getGroup } from "@/lib/nav";

export const metadata = pageMetadata({
    title: "Technology",
    description:
        "Ontology · Harness 엔진부터 AgenticOps · GraphRAG 프레임워크, 독립 MCP 런타임까지 — 운영·독립·연결·확장을 떠받치는 XGEN 기술.",
    path: "/technology",
});

/** 키비주얼 — XGEN 기술 스택 레이어(핵심 기술 → 프레임워크 → 엔진 → 런타임). */
const TECH_STACK: { layer: string; en: string; items: string[] }[] = [
    {
        layer: "핵심 기술",
        en: "Core",
        items: ["Agentic AI", "Knowledge Graph", "MCP"],
    },
    {
        layer: "프레임워크",
        en: "Frameworks",
        items: ["AgenticOps", "GraphRAG", "Hybrid RAG", "Context Engineering"],
    },
    { layer: "엔진", en: "Engines", items: ["Ontology", "Harness"] },
    {
        layer: "런타임",
        en: "Runtime",
        items: ["MCP Apps", "Runtime SDK", "Runtime API"],
    },
];

function TechnologyHero() {
    return (
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
                <p className="text-[16px] font-semibold tracking-tight text-[#67e8f9]">
                    Technology
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                    Enterprise AI, Engineered for Reality
                </h1>
                <p className="mt-5 text-lg font-medium leading-relaxed text-white/85">
                    Enterprise AI를 운영하는 기술을 만듭니다
                </p>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-white/65">
                    Agentic AI, Knowledge Graph, MCP, Runtime, AgenticOps까지, 기업
                    환경에서 실제 운영 가능한 핵심 엔진과 프레임워크를 연구하고
                    설계합니다.
                </p>
            </div>

            {/* 기술 스택 레이어 키비주얼 */}
            <div className="w-full space-y-3">
                {TECH_STACK.map((s) => (
                    <div
                        key={s.en}
                        className="rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:border-[#67e8f9]/40"
                    >
                        <div className="flex items-baseline justify-between">
                            <span className="text-[14.5px] font-bold text-white">
                                {s.layer}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-widest text-[#67e8f9]">
                                {s.en}
                            </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {s.items.map((it) => (
                                <span
                                    key={it}
                                    className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[12.5px] text-white/80"
                                >
                                    {it}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** 기술 전체를 아우르는 마케팅 밴드 — 운영·독립·연결·확장 4가치 + CTA. */
const TECH_VALUES: {
    icon: typeof Settings2;
    title: string;
    en: string;
    desc: string;
}[] = [
    {
        icon: Settings2,
        title: "운영 가능성",
        en: "Operable",
        desc: "PoC를 넘어 실제 기업 환경에서 안정적으로 운영되는 AgenticOps 기반 기술",
    },
    {
        icon: ShieldCheck,
        title: "벤더 독립",
        en: "Independent",
        desc: "특정 모델·클라우드에 종속되지 않는 온프레미스·Model-Agnostic 설계",
    },
    {
        icon: Network,
        title: "지식 연결",
        en: "Connected",
        desc: "Ontology·Knowledge Graph·GraphRAG로 사내 지식을 정밀하게 연결",
    },
    {
        icon: Layers,
        title: "유연한 확장",
        en: "Extensible",
        desc: "MCP 런타임과 Runtime SDK·API로 도구·에이전트를 자유롭게 확장",
    },
];

function TechnologyMarketing() {
    return (
        <section className="relative overflow-hidden border-t border-white/10 bg-[#070b1c] text-white">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(103,232,249,0.12),transparent_65%)]"
            />
            <div className="relative mx-auto max-w-6xl px-6 py-24">
                <p className="font-mono text-[12px] uppercase tracking-widest text-[#67e8f9]">
                    Enterprise AI Technology
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-[1.25] tracking-tight md:text-[40px]">
                    연구에서 검증하고,{" "}
                    <span className="bg-gradient-to-r from-[#67e8f9] to-[#7dd3fc] bg-clip-text text-transparent">
                        운영으로 완성하는
                    </span>{" "}
                    Enterprise AI 기술
                </h2>
                <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/70">
                    화려한 데모가 아닌, 기업의 보안·규제·운영 환경에서 실제로 작동하는
                    기술을 연구합니다. 핵심 엔진부터 프레임워크와 런타임까지 하나의 기술
                    스택으로 연결하여, 연구 성과가 제품을 거쳐 고객 현장의 성과로 이어지도록
                    만듭니다.
                </p>

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {TECH_VALUES.map((v) => (
                        <div
                            key={v.en}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-[#67e8f9]/40"
                        >
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#67e8f9]">
                                <v.icon className="h-[20px] w-[20px]" />
                            </span>
                            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-white/45">
                                {v.en}
                            </p>
                            <h3 className="mt-1 text-[18px] font-bold tracking-tight text-white">
                                {v.title}
                            </h3>
                            <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/65">
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-wrap gap-3">
                    <Link
                        href="/architecture"
                        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                    >
                        플랫폼 아키텍처 보기
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/product"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                    >
                        제품으로 확인하기
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function TechnologyPage() {
    // Research는 별도 페이지(/research)로 유지하되, 기술 원페이지에서는 링크아웃
    // 섹션을 빼고 기술 전체를 아우르는 마케팅 밴드로 마무리한다.
    return (
        <GroupPage
            group={getGroup("technology")!}
            hero={<TechnologyHero />}
            content={{
                engines: <EnginesContent />,
                frameworks: <FrameworksContent />,
            }}
            hideSections={["research"]}
            leading={<TechnologyMarketing />}
        />
    );
}
