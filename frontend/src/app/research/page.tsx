import { pageMetadata } from "@/lib/metadata";
import { GroupPage } from "@/components/onepage";
import { ResearchContent } from "@/components/research-content";
import { PublicationsContent } from "@/components/publications-content";
import { getGroup } from "@/lib/nav";
import { OrbitArt } from "@/components/hero-orbit-art";

export const metadata = pageMetadata({
    title: "Research",
    description:
        "Plateer Labs의 연구 — Enterprise AI를 현실로 만드는 연구 영역과 아키텍처.",
    path: "/research",
});

function ResearchHero() {
    return (
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
                <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                    Research
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                    Research that makes
                    <br />
                    Enterprise AI real
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                    기업 환경에서 AI의 성공은 모델이 아니라 운영 구조에서 결정됩니다.
                    플래티어랩은 Agentic AI, Knowledge Graph, MCP, AgenticOps를
                    연구하고, 제품과 고객 현장까지 연결합니다.
                </p>
            </div>
            <div className="hidden lg:block">
                <OrbitArt
                    accent="#7dd3fc"
                    accent2="#2f7bff"
                    center="Research"
                    nodes={[
                        "Agentic AI",
                        "Knowledge Graph",
                        "GraphRAG",
                        "Ontology",
                        "MCP",
                        "Multi-Agent",
                        "AgenticOps",
                        "Guardrails",
                    ]}
                    ariaLabel="Agentic AI·Knowledge Graph·GraphRAG·Ontology·MCP·Multi-Agent·AgenticOps·Guardrails 등 AI 연구 분야가 연결되는 애니메이션"
                />
            </div>
        </div>
    );
}

export default function ResearchPage() {
    return (
        <GroupPage
            group={getGroup("research")!}
            hero={<ResearchHero />}
            content={{
                "research-areas": <ResearchContent />,
                publications: <PublicationsContent />,
            }}
        />
    );
}
