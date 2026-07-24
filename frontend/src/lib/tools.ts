export type ToolCategory = "ingestion" | "knowledge" | "agent" | "utility";

export interface Tool {
    id: string;
    repo: string;
    name: string;
    tagline: string;
    description: string;
    category: ToolCategory;
    install: string;
    hasDemo: boolean;
    language: string;
    /**
     * 추가일(YYYY-MM-DD, 선택). 신규 라이브러리를 키비주얼에 '먼저' 띄우는 기준.
     * 넣으면 이 날짜로 최신순 판별, 생략하면 이 배열의 '뒤에 있을수록 최신'으로 폴백.
     * → 새 라이브러리를 배열 끝에 추가(또는 addedAt 지정)하면 자동으로 키비주얼 첫 슬라이드가 된다.
     */
    addedAt?: string;
}

export const TOOLS: Tool[] = [
    {
        id: "contextifier",
        repo: "Contextifier",
        name: "Contextifier",
        tagline: "Turn any document into AI-ready text",
        description:
            "Extract and chunk 80+ document formats. Tables, code blocks, and structure preserved for retrieval.",
        category: "ingestion",
        install: "pip install contextifier",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "doc2chunk",
        repo: "xgen-doc2chunk",
        name: "Doc2Chunk",
        tagline: "Smart chunking for RAG pipelines",
        description:
            "Split documents into context-aware chunks with configurable size and overlap.",
        category: "ingestion",
        install: "pip install xgen-doc2chunk",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "f2a",
        repo: "f2a",
        name: "f2a",
        tagline: "One-line data analytics with HTML reports",
        description:
            "Point at any file, get full statistics and an interactive HTML report. 24+ formats.",
        category: "ingestion",
        install: "pip install f2a",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "synaptic-memory",
        repo: "synaptic-memory",
        name: "Synaptic Memory",
        tagline: "Brain-inspired knowledge graph",
        description:
            "Auto-ontology, Hebbian learning, four-stage memory consolidation for long-running agents.",
        category: "knowledge",
        install: "pip install synaptic-memory",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "googer",
        repo: "googer",
        name: "Googer",
        tagline: "Type-safe Google search, for agents",
        description:
            "Web, images, news, and videos. Typed responses, no scraping gymnastics.",
        category: "agent",
        install: "pip install googer",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "document-adapter",
        repo: "document-adapter",
        name: "Document Adapter",
        tagline: "Let LLMs edit DOCX, PPTX & HWPX directly",
        description:
            "A unified editing adapter (with MCP server) that lets an LLM open, modify, and write Office and HWPX documents in place.",
        category: "ingestion",
        install: "pip install document-adapter",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "knowtology",
        repo: "Knowtology",
        name: "Knowtology",
        tagline: "Tree-structured knowledge maps for agents",
        description:
            "Build navigable knowledge maps for LLM agents — four-tool exploration, snippet retrieval, and structured recall.",
        category: "knowledge",
        install: "pip install knowtology",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "omnifuse",
        repo: "xgen-omnifuse",
        name: "OmniFuse",
        tagline: "One-shot GraphRAG — fuse vector + graph",
        description:
            "Backend-agnostic GraphRAG that fuses vector and graph retrieval in a single pass. Zero core deps, pluggable stores.",
        category: "knowledge",
        install: "pip install xgen-omnifuse",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "toolint",
        repo: "Toolint",
        name: "Toolint",
        tagline: "Structural linter for MCP agent tools",
        description:
            "Lint MCP-compatible, zero-dependency Python agent tools — as a library, a CLI, or an MCP server.",
        category: "agent",
        install: "pip install toolint",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "xgen-harness",
        repo: "xgen-harness-executor",
        name: "XGEN Harness",
        tagline: "10-stage execution harness for agents",
        description:
            "The XGEN harness engine — a config-driven, 10-stage pipeline that owns validation, retry, and termination around any model.",
        category: "agent",
        install: "pip install xgen-harness",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "playleft",
        repo: "playwLeft",
        name: "playwLeft",
        tagline: "High-performance browser automation",
        description:
            "A browser automation library built for agents — fast, scriptable control of real browser sessions.",
        category: "agent",
        install: "pip install playleft",
        hasDemo: true,
        language: "Python",
    },
];

export const CATEGORIES: { id: ToolCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "ingestion", label: "Ingestion" },
    { id: "knowledge", label: "Knowledge" },
    { id: "agent", label: "Agent" },
];

export function getToolsByCategory(category: ToolCategory | "all") {
    if (category === "all") return TOOLS;
    return TOOLS.filter((t) => t.category === category);
}
