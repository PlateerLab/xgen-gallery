/**
 * 제품 마이크로사이트(/products/<id>) 데이터 — 레이아웃(ProductMicrosite)은 하나이고,
 * 제품마다 이 프로필만 채운다. 새 제품(예: Ontlas)은 프로필을 하나 추가하면 된다.
 *
 * 카피 원칙: 기능·적용 범위 중심, 조건·한계는 note 로 명시, 미검증 수치 금지.
 * 문구 출처는 기존 /xgen 페이지·보안 거버넌스 페이지·고객사례 데이터다.
 */

export type ProductId = "xgen";

/** 국문·영문 한 쌍 */
export interface L10n {
    ko: string;
    en: string;
}

export interface BentoItem {
    id: string;
    /** 카드 크기 — lg 는 2칸×2행, wide 는 2칸, sm 은 1칸 */
    size: "lg" | "wide" | "sm";
    eyebrow: string;
    title: L10n;
    desc: L10n;
    /** 실제 제품 화면(선택) */
    img?: string;
    imgAlt?: L10n;
    href?: string;
}

export interface FlowStep {
    no: string;
    title: L10n;
    desc: L10n;
    img: string;
    imgAlt: L10n;
}

export interface DeployRow {
    label: L10n;
    onprem: L10n;
    airgap: L10n;
}

export interface ProductProfile {
    id: ProductId;
    name: string;
    category: L10n;
    status: "live" | "soon";
    hero: {
        eyebrow: string;
        titleA: L10n;
        titleB: L10n;
        lead: L10n;
        /** 브라우저 프레임 안 메인 화면 + 겹치는 보조 화면 */
        main: { img: string; alt: L10n };
        sub: { img: string; alt: L10n };
    };
    proof: { value: string; label: L10n; sub: L10n }[];
    bentoTitle: L10n;
    bentoLead: L10n;
    bento: BentoItem[];
    flowTitle: L10n;
    flow: FlowStep[];
    trust: {
        title: L10n;
        lead: L10n;
        points: L10n[];
        back: { img: string; alt: L10n };
        front: { img: string; alt: L10n };
        href: string;
    };
    deploy: {
        title: L10n;
        lead: L10n;
        rows: DeployRow[];
        note: L10n;
    };
    /** 고객사례 필터 키(lib/customers ProductKey) */
    caseProduct: "xgen";
    cta: { title: L10n; lead: L10n };
}

export const PRODUCT_PROFILES: Record<ProductId, ProductProfile> = {
    xgen: {
        id: "xgen",
        name: "XGEN",
        category: { ko: "Enterprise Agentic AI Platform", en: "Enterprise Agentic AI Platform" },
        status: "live",
        hero: {
            eyebrow: "XGEN · Enterprise Agentic AI Platform",
            titleA: { ko: "기업의 환경은 그대로,", en: "Keep your environment as it is," },
            titleB: { ko: "AI Agent의 구축부터 운영 통제까지", en: "from building AI agents to running and governing them" },
            lead: {
                ko: "바이브코딩으로 Agent와 App을 만들고, 기존 시스템을 도구로 연결하고, 결재선과 감사 로그 아래에서 운영합니다. 온프레미스와 망분리 환경을 지원합니다.",
                en: "Build agents and apps with vibe coding, connect existing systems as tools, and operate them under approval routes and audit logs. Supports on-premise and air-gapped deployment.",
            },
            main: {
                img: "/product/dexon-vibe-coding-video.jpg",
                alt: {
                    ko: "DexOn에서 자연어로 요청하면 Agent가 파일을 생성하는 바이브코딩 화면",
                    en: "Vibe coding in DexOn — the agent generates files from a natural-language request",
                },
            },
            sub: {
                img: "/product/agent-builder-canvas.png",
                alt: {
                    ko: "XGEN 에이전트플로우 캔버스 화면",
                    en: "XGEN agentflow canvas",
                },
            },
        },
        proof: [
            {
                value: "GS 1등급",
                label: { ko: "국가 공인 품질인증", en: "GS certification, Grade 1" },
                sub: { ko: "인증번호 26-0296", en: "Certificate No. 26-0296" },
            },
            {
                value: "On-prem",
                label: { ko: "온프레미스 · 망분리", en: "On-premise · Air-gap" },
                sub: { ko: "고객 인프라에 설치", en: "Installed on your infrastructure" },
            },
            {
                value: "111+",
                label: { ko: "내장 도구·플러그인", en: "Built-in tools & plugins" },
                sub: { ko: "MCP·API로 확장", en: "Extend via MCP and APIs" },
            },
            {
                value: "Multi-LLM",
                label: { ko: "모델 선택", en: "Model choice" },
                sub: { ko: "GPT · Claude · Qwen · Private LLM", en: "GPT · Claude · Qwen · Private LLM" },
            },
        ],
        bentoTitle: { ko: "업무에 필요한 기능을 하나의 플랫폼에서", en: "Everything an enterprise agent needs, in one platform" },
        bentoLead: {
            ko: "만드는 방법, 실행하는 기기, 연결하는 시스템을 업무에 맞게 고릅니다.",
            en: "Choose how you build, where it runs, and what it connects to.",
        },
        bento: [
            {
                id: "vibe",
                size: "lg",
                eyebrow: "Vibe Coding in DexOn",
                title: { ko: "말로 설명하면 Agent와 App이 됩니다", en: "Describe it, and it becomes an agent or app" },
                desc: {
                    ko: "자연어 중심의 바이브코딩과 코드를 직접 다루는 풀코딩을 DexOn 안에서 오갑니다. 구현·실행·테스트·오류 수정을 한 흐름으로 진행합니다.",
                    en: "Move between natural-language vibe coding and hands-on full coding inside DexOn — implement, run, test, and fix in one flow.",
                },
                img: "/product/dexon-full-coding-video.jpg",
                imgAlt: { ko: "DexOn에서 생성된 React 코드를 직접 편집하는 풀코딩 화면", en: "Full coding — editing generated React code in DexOn" },
                href: "/vibe-coding",
            },
            {
                id: "dexon",
                size: "sm",
                eyebrow: "DexOn",
                title: { ko: "PC·태블릿·핸드폰에서 이어서", en: "Continue on PC, tablet, and phone" },
                desc: {
                    ko: "허용된 범위 안에서 기기의 파일과 앱을 활용하는 Device Interface 워크스페이스입니다.",
                    en: "A device-interface workspace that uses files and apps on each device within permitted scope.",
                },
                href: "/xgen-dex",
            },
            {
                id: "geny",
                size: "wide",
                eyebrow: "Agent Runtime · Geny",
                title: { ko: "답변을 넘어, 업무를 이어가는 실행 환경", en: "A runtime that carries work forward" },
                desc: {
                    ko: "Memory·Workspace·Tool·Schedule로 이전 맥락을 이어받고 결과물을 다음 업무에 활용합니다.",
                    en: "Memory, workspace, tools, and schedules carry context and results into the next task.",
                },
                href: "/product/xgen/technology#geny",
            },
            {
                id: "easymode",
                size: "sm",
                eyebrow: "EasyMode",
                title: { ko: "단계별로 조립하는 노코드 빌더", en: "A guided no-code builder" },
                desc: {
                    ko: "지식·프롬프트·도구를 드래그&드롭으로 조합하고 바로 채팅으로 검증합니다.",
                    en: "Combine knowledge, prompts, and tools by drag and drop, then test right away in chat.",
                },
                href: "/easy-mode",
            },
            {
                id: "knowledge",
                size: "wide",
                eyebrow: "Knowledge · RAG · Ontology",
                title: { ko: "출처를 함께 제시하는 지식 검색", en: "Knowledge search with citations" },
                desc: {
                    ko: "문서·파일 저장소·DB를 컬렉션으로 연결하고 벡터 검색·리랭커·온톨로지로 검색 품질을 보완합니다.",
                    en: "Connect documents, file storage, and databases; vector search, rerankers, and ontology improve retrieval.",
                },
                img: "/product/screen-ontology.png",
                imgAlt: { ko: "XGEN 온톨로지 지식 그래프 화면", en: "XGEN ontology knowledge graph" },
            },
            {
                id: "mcp",
                size: "sm",
                eyebrow: "Tools · MCP",
                title: { ko: "API와 MCP로 확장", en: "Extend with APIs and MCP" },
                desc: {
                    ko: "외부 API를 도구로 등록하고, 키·토큰은 인증 프로필로 따로 관리합니다.",
                    en: "Register external APIs as tools; keys and tokens live in separate auth profiles.",
                },
            },
        ],
        flowTitle: { ko: "만들고, 연결하고, 배포하고, 통제합니다", en: "Build, connect, deploy, govern" },
        flow: [
            {
                no: "01",
                title: { ko: "만들기", en: "Build" },
                desc: { ko: "캔버스·EasyMode·바이브코딩 중 맞는 방식으로", en: "Canvas, EasyMode, or vibe coding" },
                img: "/product/screen-canvas.png",
                imgAlt: { ko: "워크플로우 노드 편집 화면", en: "Workflow node editor" },
            },
            {
                no: "02",
                title: { ko: "연결하기", en: "Connect" },
                desc: { ko: "지식 컬렉션·API 도구·MCP를 연결", en: "Knowledge, API tools, and MCP" },
                img: "/product/screen-api-tool.png",
                imgAlt: { ko: "API 도구 등록 화면", en: "API tool registration" },
            },
            {
                no: "03",
                title: { ko: "배포하기", en: "Deploy" },
                desc: { ko: "동료 공유·임베드·스케줄, 앱은 관리자 요청 기반 공개 배포", en: "Share, embed, schedule; apps publish via admin request" },
                img: "/product/app-deploy-server.png",
                imgAlt: { ko: "앱 배포 서버 등록 화면", en: "App deployment server registration" },
            },
            {
                no: "04",
                title: { ko: "운영·통제", en: "Operate" },
                desc: { ko: "대시보드·실행 이력·시스템 모니터링", en: "Dashboards, run history, monitoring" },
                img: "/product/operations-dashboard.png",
                imgAlt: { ko: "운영 대시보드 화면", en: "Operations dashboard" },
            },
        ],
        trust: {
            title: { ko: "공격자의 시선으로 검증하고, 선언한 대로 통제합니다", en: "Tested through an attacker's eyes, governed as declared" },
            lead: {
                ko: "AI 서비스마다 위험도를 심사하고, 등급에 맞는 결재선을 지정해 승인합니다. 실행 과정은 감사 로그로 남습니다.",
                en: "Each AI service is risk-reviewed and approved through an approval route that matches its grade. Execution is recorded in audit logs.",
            },
            points: [
                { ko: "협업부서 · 거버넌스 담당자 · 정보보호관리자 결재선", en: "Approval routes across partner teams, governance, and security officers" },
                { ko: "가드 모델 · 개인정보 마스킹 · 금칙어 필터", en: "Guard models, PII masking, and keyword filters" },
                { ko: "판단(Harness)과 실행(Sandbox) 분리 · 에이전트별 격리", en: "Reasoning (Harness) separated from execution (Sandbox), isolated per agent" },
                { ko: "격리 환경 침투 테스트로 권한 통제 재검증", en: "Access controls re-tested with pentesting in an isolated environment" },
            ],
            back: {
                img: "/product/governance-approval-line.png",
                alt: { ko: "결재선 지정 화면", en: "Approval route setup" },
            },
            front: {
                img: "/product/governance-risk-grades.png",
                alt: { ko: "AI 위험도 등급 구간 화면", en: "AI risk grade bands" },
            },
            href: "/security-and-governance",
        },
        deploy: {
            title: { ko: "고객사 인프라에 맞춰 구성합니다", en: "Configured for your infrastructure" },
            lead: {
                ko: "설치 위치와 모델, 외부 연동 범위를 보안 정책에 맞춰 정합니다.",
                en: "Installation, models, and external connections are set to match your security policy.",
            },
            rows: [
                {
                    label: { ko: "설치 위치", en: "Location" },
                    onprem: { ko: "고객사 데이터센터·사내 GPU", en: "Your data center and GPUs" },
                    airgap: { ko: "인터넷과 분리된 내부망", en: "Internal network isolated from the internet" },
                },
                {
                    label: { ko: "모델", en: "Models" },
                    onprem: { ko: "내부 모델, 정책에 따라 외부 API 연동", en: "Internal models; external APIs by policy" },
                    airgap: { ko: "내부 모델·Private LLM", en: "Internal models and private LLMs" },
                },
                {
                    label: { ko: "설치·업데이트", en: "Install & update" },
                    onprem: { ko: "GitOps 파이프라인 배포", en: "GitOps pipeline" },
                    airgap: { ko: "폐쇄망 반입 절차 후 설치", en: "Installed after an air-gap transfer process" },
                },
                {
                    label: { ko: "외부 연동", en: "External access" },
                    onprem: { ko: "별도 전송 정책 아래 허용", en: "Allowed under a separate transfer policy" },
                    airgap: { ko: "내부 시스템 중심", en: "Internal systems" },
                },
            ],
            note: {
                ko: "세부 구성은 고객사 인프라와 보안 정책에 따라 협의합니다. 도입은 반입 → 실증(PoC) → 구축 → 운영 순서로 진행합니다.",
                en: "Detailed configuration is agreed based on your infrastructure and security policy. Delivery runs transfer → PoC → build → operate.",
            },
        },
        caseProduct: "xgen",
        cta: {
            title: { ko: "우리 업무에 맞는지, 실제 데이터로 확인해 보세요", en: "See how it fits, with your own data" },
            lead: {
                ko: "체험 신청을 남겨 주시면 업무 범위와 인프라 조건을 확인한 뒤 진행 방식을 안내드립니다.",
                en: "Leave a trial request and we will confirm scope and infrastructure before proposing next steps.",
            },
        },
    },
};

/** /product 허브 카드 — 마이크로사이트가 아직 없는 제품도 함께 보여 준다. */
export const PRODUCT_INDEX: {
    id: string;
    name: string;
    category: L10n;
    desc: L10n;
    href: string;
    status: "live" | "soon";
    statusLabel: L10n;
}[] = [
    {
        id: "xgen",
        name: "XGEN",
        category: { ko: "Enterprise Agentic AI Platform", en: "Enterprise Agentic AI Platform" },
        desc: {
            ko: "기업 데이터와 인프라 위에서 에이전트와 앱을 만들고, 배포하고, 통제하는 플랫폼입니다.",
            en: "A platform to build, deploy, and govern agents and apps on your data and infrastructure.",
        },
        href: "/product/xgen",
        status: "live",
        statusLabel: { ko: "제품 소개", en: "Product" },
    },
    {
        id: "polar",
        name: "Polar",
        category: { ko: "Commerce Private sLLM", en: "Commerce Private sLLM" },
        desc: {
            ko: "플래티어가 개발한 이커머스 특화 Private sLLM입니다. 온프레미스에서 도메인 최적화 모델·RAG·Fine-tuning으로 커머스 AI를 구축·운영합니다.",
            en: "Plateer's private sLLM specialized for e-commerce, deployable on-premises with domain-tuned models, RAG, and fine-tuning.",
        },
        href: "/product/polar",
        status: "live",
        statusLabel: { ko: "제품 소개", en: "Product" },
    },
    {
        id: "ontlas",
        name: "Ontlas",
        category: { ko: "Domain Ontology", en: "Domain Ontology" },
        desc: {
            ko: "파일·DB·문서를 하나의 도메인 온톨로지로 묶습니다. 제품 페이지는 준비 중이며, 지금은 오픈소스 라이브러리 페이지에서 볼 수 있습니다.",
            en: "Unifies files, databases, and documents into one domain ontology. Product page in preparation — see the open-source library page for now.",
        },
        href: "/product/ontlas",
        status: "soon",
        statusLabel: { ko: "제품 페이지 준비 중", en: "Product page coming" },
    },
];
