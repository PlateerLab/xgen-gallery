import { GroupPage } from "@/components/onepage";
import { ResearchContent } from "@/components/research-content";
import { PublicationsContent } from "@/components/publications-content";
import { getGroup } from "@/lib/nav";
import { OrbitArt } from "@/components/hero-orbit-art";
import type { Locale } from "@/lib/i18n";

const COPY: Record<Locale, { lead: string; orbitAria: string }> = {
    ko: {
        lead: "기업 환경에서 AI의 성공은 모델이 아니라 운영 구조에서 결정됩니다. 플래티어랩은 Agentic AI, Knowledge Graph, MCP, AgenticOps를 연구하고, 제품과 고객 현장까지 연결합니다.",
        orbitAria:
            "Agentic AI·Knowledge Graph·GraphRAG·Ontology·MCP·Multi-Agent·AgenticOps·Guardrails 등 AI 연구 분야가 연결되는 애니메이션",
    },
    en: {
        lead: "In an enterprise, whether AI succeeds is decided by the operating structure, not the model. Plateer Labs researches Agentic AI, knowledge graphs, MCP, and AgenticOps — and carries them through to the product and the customer's floor.",
        orbitAria:
            "An animation connecting AI research areas — Agentic AI, Knowledge Graph, GraphRAG, Ontology, MCP, Multi-Agent, AgenticOps, and Guardrails",
    },
};

function ResearchHero({ locale }: { locale: Locale }) {
    const t = COPY[locale];
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
                    {t.lead}
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
                    ariaLabel={t.orbitAria}
                />
            </div>
        </div>
    );
}

export function ResearchPageContent({ locale }: { locale: Locale }) {
    return (
        <GroupPage
            group={getGroup("research")!}
            hero={<ResearchHero locale={locale} />}
            locale={locale}
            content={{
                "research-areas": <ResearchContent locale={locale} />,
                publications: <PublicationsContent locale={locale} />,
            }}
        />
    );
}
