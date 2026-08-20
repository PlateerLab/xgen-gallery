/**
 * XGEN 제품 페이지 영문 카피.
 *
 * 한국어 원문은 product-page.tsx 안의 기존 상수(TRUST·CHALLENGES·…)를 그대로 두고,
 * 영문만 이 파일에 모았다. 200줄 넘는 한국어를 다시 옮겨 적으면서 오타를 낼 위험을
 * 없애기 위한 구조다 — 컴포넌트는 locale에 따라 둘 중 하나를 고른다.
 *
 * 배열 순서는 한국어 상수와 1:1로 맞춘다(아이콘·이미지·수치는 인덱스로 매칭된다).
 */
export const PRODUCT_EN = {
    ldDescription:
        "An on-premise Enterprise AI platform for designing, deploying, and governing Agentic AI services on the LLMs and infrastructure you choose. Made up of an agentflow canvas, knowledge (RAG), tools (MCP), deployment, governance, and a dashboard.",
    ldFeatures: [
        "Agentflow · Canvas — visual, node-based agentflow design",
        "Knowledge · RAG — vector search, reranker, ontology, cited answers",
        "Tools · MCP — API tool registration and MCP standard integration",
        "Deploy · Operate — deployment, embedding, scheduled execution",
        "AI Governance — PII masking, dual approval, audit logs",
        "Dashboard — role-based widgets, execution history, system monitoring",
    ],

    trust: [
        ["GS certification, Grade 1", "National quality certification · TTA"],
        ["AI-MASTER", "AI reliability certification in progress"],
        ["On-premise · air-gapped", "Air-gap deployment supported"],
        ["Deployed at Jeju Bank and others", "Finance · public sector · commerce"],
    ] as [string, string][],

    challenges: [
        {
            q: "Adopted AI, but it stalled at the pilot?",
            desc: "A great many AI projects finish at technical validation and never reach the actual work.",
            imgAlt: "Illustration of a flow that stops at validation and pilot and never deploys into operation",
        },
        {
            q: "Data and systems scattered?",
            desc: "Documents, knowledge, and legacy sit apart, so the AI never grasps the organization's context.",
            imgAlt: "Illustration of data silos — documents, databases, and folders sitting unconnected",
        },
        {
            q: "Security and regulation ruling out cloud AI?",
            desc: "Data sovereignty, audit, and approval requirements make external AI hard to adopt.",
            imgAlt: "Illustration of a security shield protecting data, with transmission to external cloud AI blocked",
        },
    ],

    stats: [
        ["100%", "On-premise operation", "Network separation · data sovereignty"],
        ["80+", "Built-in tools and plugins", "Extensible with your own"],
        ["Grade 1", "National GS certification", "Verified by third-party testing"],
        ["11", "Open-source libraries", "MIT · install with pip"],
    ] as [string, string, string][],

    sections: [
        { id: "platform", label: "Overview" },
        { id: "value", label: "Business value" },
        { id: "features", label: "Capabilities" },
        { id: "core-tech", label: "Core technology" },
        { id: "roles", label: "By role" },
        { id: "on-premise", label: "On-premise" },
        { id: "deployment", label: "Deployment" },
        { id: "governance", label: "Governance" },
        { id: "certification", label: "Certification" },
        { id: "cases", label: "Customer cases" },
        { id: "faq", label: "FAQ" },
    ],

    pillars: [
        ["Intelligent orchestration", "Proactive automation through multi-agent workflows and task routing"],
        ["Dependable answers", "Hybrid RAG and five-stage precision retrieval keep answers grounded and hallucination low"],
        ["Complete flexibility", "GPT, Claude, private LLMs — dynamic model selection per requirement, with no vendor lock-in"],
        ["Zero-downtime stability", "A k3s high-availability architecture with GitOps deployment, built for enterprise operation"],
    ] as [string, string][],

    effects: [
        ["Efficiency gains", "Fast, accurate RAG-based retrieval cuts the time repetitive internal work takes"],
        ["Risk minimized", "Five categories of risk — model, data, security — controlled up front for a safe AI environment"],
        ["Trust established", "Minimal hallucination and transparent evidence raise internal users' confidence"],
        ["Room to grow", "Multi-LLM operation through the Model Router secures the best cost-performance structure without lock-in"],
        ["Regulatory compliance", "Transparent governance aligned with AI-MASTER criteria and data security law"],
    ] as [string, string][],

    differentiators: [
        {
            ko: "Easy Mode",
            tagline: "No coding — an agent in about 90 seconds",
            desc: "A guided drag-and-drop builder lets non-developers combine knowledge, prompts, and tools into an agent. The moment it exists, you validate it in chat.",
            items: [
                "Drag-and-drop, no-code build",
                "Step-by-step guided setup",
                "Built and assembled in about 90 seconds",
            ],
        },
        {
            ko: "PathFinder",
            tagline: "Connect existing systems as tools the AI can use",
            desc: "PathFinder connects web systems and APIs as Agent Tools an AI agent can use. Sign-in, connection, testing, and registration are automated without code, so existing systems extend quickly into an AI working environment.",
            items: [
                "Connection through browser automation",
                "Sign-in, API, tool registration, and testing — all no-code",
                "Business users turn their own systems into tools",
            ],
        },
    ],

    features: [
        {
            ko: "Agentflow design",
            desc: "Connect nodes by drag and drop on the canvas to design an AI workflow visually. Combine LLM calls, tool execution, and branching without code.",
            items: ["Visual node-based editing", "Multi-agent collaboration", "Version control and execution logs"],
        },
        {
            ko: "Knowledge and retrieval",
            desc: "Upload documents into a collection and chunking and embedding make them vector-searchable. Rerankers and ontology raise accuracy, and responses carry their citations.",
            items: ["Collections, file storage, DB integration", "Vector DB, reranker, ontology", "Citation-backed responses"],
        },
        {
            ko: "Tool integration and extension",
            desc: "Register external APIs and functions as tools an agent can call, and connect models to external tools through the MCP standard. Credential profiles keep keys and tokens managed safely.",
            items: ["API tool registration and calling", "MCP standard integration", "Centralized credential profiles"],
        },
        {
            ko: "Deployment and operation",
            desc: "Deploy the agentflow you designed so users and external systems can call it. Embed it into an external site with a snippet, or run it on a schedule.",
            items: ["Deploy, embed, share", "Scheduled execution (cron)", "Version and deployment state"],
        },
        {
            ko: "AI governance",
            desc: "Manage AI usage through PII masking, risk grading, and control policy. Dual deployment and governance approval, scheduled reviews, and audit logs meet the control requirements.",
            items: ["PII masking and risk grading", "Dual approval and scheduled review", "Change history and audit logs"],
        },
        {
            ko: "Dashboard and monitoring",
            desc: "Role-based widgets put status and statistics on one screen. Execution history, token usage, and system health, seen from an administrator's perspective.",
            items: ["Role-based widget dashboard", "Execution history and token usage", "System health monitoring"],
        },
    ],

    screens: [
        {
            alt: "XGEN agentflow canvas — a visual workflow connecting user question input, an LLM agent, and answer output, with a knowledge-collection retrieval node",
            caption: "Agentflow canvas",
        },
        {
            alt: "XGEN workflow canvas — adding and connecting nodes by drag and drop to design an agent workflow visually",
            caption: "Workflow node editing",
        },
        {
            alt: "XGEN ontology — enterprise knowledge structured as a graph, connecting concepts and relationships",
            caption: "Ontology knowledge graph",
        },
        {
            alt: "XGEN API tool creation — registering and connecting external APIs and functions as tools an agent can call",
            caption: "API tool integration",
        },
        {
            alt: "XGEN deployment approval — service deployment controlled by dual approval from a system administrator and a governance officer",
            caption: "Deployment approval",
        },
        {
            alt: "XGEN management center — a single settings screen for user permissions, agent operations, AI governance, systems, and data",
            caption: "Management center",
        },
        {
            alt: "XGEN LLM model catalog — enabling models across OpenAI, Anthropic, Google, and other providers and tracking their usage",
            caption: "LLM model catalog",
        },
        {
            alt: "XGEN AI risk grading — classifying and controlling the risk level of requests and responses",
            caption: "AI risk assessment",
        },
        {
            alt: "XGEN team collaboration — testing and sharing agents at team level",
            caption: "Team collaboration and agent testing",
        },
    ],

    onprem: [
        ["Leakage blocked at the source", "An on-premise build means data is used safely without leaving your environment."],
        ["Network separation and air-gap", "Deploys and runs in network-separated and air-gapped environments, meeting the closed-network requirements of finance and the public sector."],
        ["Zero training guaranteed", "Technical safeguards prevent customer data from being used as training data for external models."],
    ] as [string, string][],

    deploySteps: [
        ["Intake", "Installed into your infrastructure (on-premise or air-gapped) through the closed-network intake process."],
        ["Proof of concept", "Validated quickly against real data, settling the domain requirements and review rules."],
        ["Build", "Domain tools, knowledge, and agents configured and integrated around the organization's work."],
        ["Operate", "Controlled deployment, monitoring, and improvement continue through the GitOps pipeline."],
    ] as [string, string][],

    deployChips: [
        "On-premise",
        "Air-gap",
        "GPU serving",
        "k3s HA",
        "Istio",
        "Blue-Green · Canary",
        "ArgoCD · GitOps",
    ],

    resources: [
        { desc: "Installation, configuration, API documentation, and guides" },
        { desc: "New features and change history by version" },
        { title: "XGEN brochure", desc: "Product overview and architecture material" },
    ],

    faq: [
        {
            q: "What is XGEN?",
            a: "XGEN is an on-premise Enterprise AI platform — an agent development environment for designing, deploying, operating, and governing Agentic AI services on the LLMs and infrastructure you choose. It is not a finished service delivered to you; you build and run the agents your organization's work needs on top of XGEN. It was designed and developed by the Plateer AI Labs AI research team.",
        },
        {
            q: "Which LLMs and foundation models can we use?",
            a: "You are not tied to a particular model. Choose among open-weight models such as Qwen and our own sLLM (Polar) by purpose, cost, and accuracy, and serve them on the GPUs and infrastructure you already own. The management center configures the LLM, vector DB, and the rest of the system in detail.",
        },
        {
            q: "Does it handle non-text documents like images, tables, and charts?",
            a: "Past simple text extraction (OCR), a VLM (vision-language model) reads the context of images, tables, charts, and graphs. OCR is one capability within the VLM; where needed, an open-weight VLM is served directly to turn charts and graphs into text, vectorize them, and use them in answers. This is already applied in commerce and finance settings.",
        },
        {
            q: "Can a knowledge graph (ontology) be built from our messy data?",
            a: "Yes. Even without tidy data, accumulating a few months of it and constructing an ontology links the different expressions of the same entity (for example US, USA, United States) into one. The richer the data the better the quality gets, and domain terminology mapping and review-rule design happen alongside. We have introduced knowledge graphs in commerce and financial projects.",
        },
        {
            q: "How do you secure the answer quality of RAG and the knowledge graph?",
            a: "Quality is scored on RAGAS from preprocessing through answer verification and evaluated across several dimensions. Preprocessing strategy is also selected automatically by document type — an adaptive pipeline where the LLM judges the document type and adjusts whether OCR or VLM applies, along with chunking and overlap parameters.",
        },
        {
            q: "How does it integrate with our legacy systems?",
            a: "You don't need to build new screens. LLM and RAG integration is composed as nodes and provided as snippet code, so adding a single button to an existing system to call it is entirely workable. XGEN is plugin-structured throughout — around 80 built-in tools combined with quickly-built custom tools keep integration and customization effort to a minimum.",
        },
        {
            q: "What happens when an agent produces a wrong result?",
            a: "A first filter applies at creation through risk assessment and administrator approval, and if something goes wrong in operation an admin kill switch stops the service immediately. Where accuracy is decisive we apply human-in-the-loop, designing the AI to raise throughput through pre- and post-processing rather than replacing the work entirely, with a person confirming the result before the next step.",
        },
        {
            q: "How is data security guaranteed?",
            a: "It is built on-premise so data never leaves, and it supports network-separated and air-gapped environments. Role- and attribute-based access control (RBAC/ABAC) plus a zero-training guarantee technically prevent customer data from being used to train external models.",
        },
        {
            q: "Can we build agents without coding?",
            a: "Yes. Agentflow's drag-based visual canvas lets you design a workflow without code, validate it in live chat, and deploy it as an API or workflow.",
        },
        {
            q: "Are the open-source licenses safe from a procurement and legal perspective?",
            a: "The open source that makes up XGEN is MIT, Apache 2.0, and BSD family — no GPL-family components with source-disclosure obligations, so commercial and internal distribution carries no obligation to publish source. We check and provide the obligations attached to each license type (copyright notices, NOTICE files), and can prepare a component-by-component license inventory on request.",
        },
    ],

    gov: [
        ["Three-layer permissions", "Tier (Standard/SuperUser), role, and permission (ABAC keys) as independent layers, gating access down to individual screens and buttons."],
        ["Dual-approval deployment", "Turning something into a service requires passing two stages: deployment approval from a system administrator and approval from a governance officer."],
        ["PII masking and risk grading", "Personally identifiable information is masked automatically, and the risk level of requests and responses is classified and controlled."],
        ["Audit logs and scheduled review", "User activity and system events are retained, and deployed agents are reviewed on a schedule."],
        ["Unauthorized access prevention", "MFA (OTP), IP allowlisting, and session timeouts are applied together, so only permitted users get through."],
        ["Security built in from development", "OWASP ZAP is embedded in the development and CI/CD pipeline to check vulnerabilities automatically before release — shift-left security."],
    ] as [string, string][],

    roles: [
        ["Standard user", "Gets work done with agents, supported by notices, FAQ, and one-to-one inquiries."],
        ["Agent developer", "Designs agents on the canvas, connects tools and knowledge, and requests deployment."],
        ["System administrator", "Operates users, permissions, LLMs, and the system, and approves deployments."],
        ["Governance officer", "Manages control policy and risk, and owns the final approval and audit before a service goes live."],
    ] as [string, string][],

    techLayers: [
        [
            "Agent orchestration",
            "Multi-agent workflows, task routing, and prompt management run the work proactively. A planner decomposes the task and calls the responsible agent while a reviewer verifies the result, handled in real time through MCP-standard tool integration and streaming.",
        ],
        [
            "RAG hybrid retrieval",
            "Dense and sparse (SPLADE) hybrid retrieval, plus reranker, late chunking, and vision, preserve context and produce grounded responses with a clear source.",
        ],
        [
            "Model Router · multi-LLM",
            "The optimal LLM is selected automatically by task type, cost, performance, and security. Commercial and in-house models sit behind one interface, and swapping providers leaves the agent design untouched.",
        ],
        [
            "Data layer",
            "An enterprise data stack spanning vector, object, relational, and cache stores holds search indexes, state, and artifacts reliably.",
        ],
        [
            "Infrastructure layer",
            "k3s high-availability Kubernetes with ArgoCD GitOps guarantees self-healing and zero-downtime deployment, on an on-premise, GPU-serving foundation.",
        ],
    ] as [string, string][],

    challengeTitle: "Why does Enterprise AI stall in the field?",
    statsTitleA: "XGEN is ",
    statsHighlight: "different",
    statsLead:
        "It doesn't stop at the pilot — the proof is in numbers validated in real on-premise operation.",
    pillarsTitle: "The core values enterprise AI operation rests on",
    pillarsLead:
        "Building the AI is not where it ends. Connecting it, operating it, governing it, and continuing to extend it — XGEN provides the whole path on one platform.",
    diffTitle: "Enterprise AI built by the people who do the work",
    diffLead:
        "Without development knowledge, business users design agents themselves and connect them to existing systems. Cutting out the complicated development path turns an idea directly into AI that can be used at work.",
    diffMore: "Read more",
    valueLeadTitle: "AI is no longer a build — it is a new standard for running the business",
    valueLeadA:
        "Enterprises have moved past simply adopting an AI model. They are choosing an ",
    valueHighlight: "operating platform",
    valueLeadB:
        " that connects existing systems to AI safely and applies it to real work on a foundation of security and governance. XGEN is not a platform for adopting AI — it is the Enterprise AI platform for continuously extending how you run it.",
    effectsTitle: "Five changes XGEN adoption delivers",
    effectsLead:
        "Past feature advantage — five outcomes that become organizational strength on day one: efficiency, risk, trust, flexibility, and regulatory readiness, all on one platform.",
    compareTitle: "What actually changes versus the old approach",
    compareLead:
        "The same AI, operated differently. Past build-style SI and PoC-bound approaches,",
    compare: [
        {
            title: "An operating platform, not build-style SI",
            before: "Built anew for every project, so build time and maintenance cost keep climbing",
            after: "Services composed on a finished platform by combining agents, RAG, and workflows",
            effect: "Shorter build time — months of building down to weeks to operational readiness",
        },
        {
            title: "Past PoC, into real operation",
            before: "AI that passes technical validation but never reaches the actual work",
            after: "Enterprise AI services usable immediately in an operating environment that includes permissions, security, and audit",
            effect: "Past the PoC, in use in production straight away",
        },
        {
            title: "AI built by the business",
            before: "AI service launches wait on the development organization's schedule",
            after: "With the no-code canvas and PathFinder, business users build agents and apply them to work immediately",
            effect: "Business teams improve things themselves, without waiting on development",
        },
        {
            title: "One platform from development to operation",
            before: "Development, deployment, monitoring, and quality management sit apart, raising operational complexity",
            after: "Design, knowledge management, deployment, evaluation, and operation managed on a single platform",
            effect: "Operating tools consolidated into one platform",
        },
    ],
    labelBefore: "Before",
    labelEffect: "Result",
    featuresTitle: "From design to operation, connected as one flow",
    featuresLead:
        "These are not separate tools but a single operating pipeline. Building an agent, deploying it, running it, and improving it all connect inside one platform.",
    moreScreens: "More product screens",
    techTitle: "A six-layer core architecture for Enterprise AI",
    techLeadA:
        "From infrastructure up to AI agents, the core technology enterprise AI operation needs, integrated into one platform.",
    techLeadB:
        "XGEN is not bound to a particular AI model or cloud. A standards-based six-layer architecture connects and operates on-premise GPUs, commercial AI APIs, and internal systems in a consistent way.",
    techMore: "Explore the XGEN platform architecture",
    rolesTitle: "One platform, an experience shaped to the role",
    rolesLead:
        "Even on one platform, the working environment is optimized by role and permission. Each user gets only the capabilities and information their work requires, and uses the AI more efficiently for it.",
    onpremTitle: "Data stays inside the company, and gets used with confidence",
    onpremLead:
        "XGEN is built on-premise so data never leaves, and technical safeguards prevent customer data from being used to train external models.",
    onpremMore: "Explore the security and governance architecture",
    deployTitle: "From intake to operation, a proven build process",
    deployLead:
        "From closed-network intake through proof, build, and operation, support is staged around the on-premise environment. Once intake completes, proof starts quickly, supporting pre-production validation and early results.",
    deployMore: "Explore the GitOps deployment pipeline",
    afterTitle: "We stay with you after the rollout",
    afterLead:
        "It doesn't end at the build. Training that lands the capability inside your team, and technical support that keeps it running steadily.",
    govTitleA: "AI you cannot trust",
    govTitleB: "cannot run in an enterprise",
    govLead:
        "XGEN traces who did what and when, verifies risky changes before deployment, and is designed so that only approved agents reach production. It provides governance you can rely on in regulated industries and on-premise environments.",
    govMore: "Explore the security and governance architecture",
    certTitle: "National quality and reliability certification",
    certLead:
        "XGEN has been awarded Grade 1 GS certification and is undergoing AI-MASTER, the AI reliability certification. Accredited third-party laboratories verify the product's quality and reliability.",
    certNote:
        "Reviewing security, regulatory, or procurement requirements? We will work through the architecture and controls against your requirements with you.",
    certCta: "Discuss security requirements",
    casesTitle: "Proven in customer environments",
    casesLead:
        "Customer cases where XGEN was actually built and operated in finance, commerce, public sector, and IT.",
    casesMore: "See all XGEN customer cases",
    resourcesTitle: "For developers and adoption leads",
    faqTitle: "Frequently asked questions",
    closingTitle: "See enterprise AI that goes straight into the work",
    closingLead:
        "An Agentic AI platform that satisfies your security, permission, and audit requirements. In a demo we walk you through the whole flow — design, deployment, and control.",
    closingDemo: "Request a demo",
    closingBrochure: "Request the XGEN brochure",
};
