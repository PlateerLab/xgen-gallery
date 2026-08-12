export type ToolCategory = "ingestion" | "knowledge" | "agent" | "utility";

export interface Tool {
    id: string;
    repo: string;
    name: string;
    tagline: string;
    description: string;
    category: ToolCategory;
    install: string;
    /**
     * @deprecated 더는 데모 노출을 좌우하지 않는다. 데모 페이지와 카드의 데모 버튼은
     * 항목이 이 배열에 있기만 하면 자동으로 생긴다(lib/demo-manifests.ts 의
     * demoManifestFor, lib/demo-fallback.ts). "라이브 데모" 배지 역시 매니페스트
     * 유무로 판별한다(hasCuratedDemo). 주간 자동 점검이 넣던 값을 그대로 둬도
     * 무해하도록 optional 로만 남겨 뒀다.
     */
    hasDemo?: boolean;
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
    {
        id: "xgen-sdk",
        repo: "xgen-sdk",
        name: "XGen SDK",
        tagline: "Batteries-included Python toolkit for backend infrastructure",
        description:
            "A curated Python toolkit of reusable backend building blocks — DB pooling, config, storage, ABAC auth, quota, and a LangChain-free agent harness — consolidated into one canonical package.",
        category: "utility",
        install: "pip install xgen-sdk",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "xgen-agent-memory",
        repo: "xgen-agent-memory",
        name: "XGen Agent Memory",
        tagline: "Learnable graph-traversal memory for agents",
        description:
            "A lightweight memory engine fusing semantic search, BM25 keyword search, and typed-edge graph traversal with an online-learned ranker — all in a single SQLite file.",
        category: "knowledge",
        install: "pip install xgen-agent-memory",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "xgen-agent-runtime",
        repo: "xgen-agent-runtime",
        name: "XGen Agent Runtime",
        tagline: "21-stage harness-engineered agent pipeline",
        description:
            "A manifest-driven agent pipeline with a dual-abstraction architecture (stage x strategy slots), five LLM providers, and native MCP support — every step observable and swappable.",
        category: "agent",
        install: "pip install xgen-agent-runtime",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "xgen-an-web",
        repo: "xgen-an-web",
        name: "AN-Web",
        tagline: "AI-native headless browser engine for agents",
        description:
            "Executes the web as an actionable state machine instead of rendering pixels for human eyes — every page becomes a structured semantic graph agents can reason over and act upon.",
        category: "agent",
        install: "pip install xgen-an-web",
        hasDemo: true,
        language: "Python",
    },
    {
        id: "xgen-edit2docs",
        repo: "xgen-edit2docs",
        name: "Edit2Docs",
        tagline: "Generate and chat-edit real Office documents",
        description:
            "An AI-agent-native document engine that produces natively editable DOCX, XLSX, and PPTX files from a one-line intent, and chat-edits existing ones — real paragraphs, cells, and charts.",
        category: "ingestion",
        install: "pip install xgen_edit2docs",
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
