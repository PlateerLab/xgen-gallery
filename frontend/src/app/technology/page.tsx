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

export default function TechnologyPage() {
    // Library Gallery is a standalone page (/library-gallery); the section here
    // renders a short intro + link via the item's `route`.
    return (
        <GroupPage
            group={getGroup("technology")!}
            hero={<TechnologyHero />}
            content={{
                engines: <EnginesContent />,
                frameworks: <FrameworksContent />,
            }}
        />
    );
}
