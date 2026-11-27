/**
 * 산업별 페이지(/customers/[domain]) 본문 — 레퍼런스 카드만으로는 비어 보이므로
 * 산업 맥락·적용 방식·고려 사항을 본문으로 보여 준다.
 * 원칙: 사이트에 이미 공개된 기능·사례 범위 안에서만 쓴다. 과장·단정·미검증 수치 금지,
 * 조건과 한계는 함께 적는다. 국·영문을 함께 유지한다.
 */
import type { IndustryKey } from "@/lib/customers";

type L = { ko: string; en: string };

export interface IndustryStory {
    /** 히어로 아래 한 문단 — 이 산업에서 AI를 도입할 때의 출발점. */
    intro: L;
    /** 업무 과제 3가지. */
    challenges: { title: L; body: L }[];
    /** 적용 방식(순서). */
    approach: { title: L; body: L }[];
    /** 주로 쓰이는 제품·기능. */
    stack: { name: string; role: L; href?: string }[];
    /** 업무 예시(짧은 목록). */
    scenarios: L[];
    /** 도입 시 고려 사항(조건·한계). */
    considerations: L[];
    /** 관련 업무별 적용(/solutions 앵커). */
    related?: { label: L; href: string }[];
}

export const INDUSTRY_STORIES: Record<IndustryKey, IndustryStory> = {
    finance: {
        intro: {
            ko: "금융 업무는 데이터 반출과 외부 모델 사용에 제약이 크고, AI가 내린 판단과 실행에 대해 내부통제와 감사 대응이 필요합니다. XGEN은 사내 인프라 안에서 Agent와 지식 검색을 운영하고, 권한·승인·감사 로그를 함께 관리하는 방식으로 금융 업무에 적용됩니다.",
            en: "Financial work comes with strict limits on data export and external model use, and every AI decision and action must hold up to internal control and audit. XGEN is applied by running agents and knowledge search inside the customer's infrastructure, with permissions, approvals and audit logs managed together.",
        },
        challenges: [
            {
                title: { ko: "데이터와 모델을 밖으로 내보낼 수 없습니다", en: "Data and models must stay inside" },
                body: {
                    ko: "고객·거래 정보가 포함된 문서와 시스템을 외부 클라우드 AI에 연결하기 어렵습니다. 망분리 환경에서도 동작하는 구성이 먼저 정해져야 합니다.",
                    en: "Documents and systems holding customer and transaction data are hard to connect to external cloud AI. A configuration that works under network separation has to come first.",
                },
            },
            {
                title: { ko: "부서마다 따로 만든 AI는 통제가 어렵습니다", en: "Separate AI projects are hard to govern" },
                body: {
                    ko: "PoC가 부서별로 흩어지면 모델·프롬프트·권한 기준이 달라지고, 누가 어떤 데이터에 접근했는지 확인하기 어려워집니다.",
                    en: "When PoCs scatter across departments, models, prompts and permission rules diverge, and it becomes hard to tell who accessed which data.",
                },
            },
            {
                title: { ko: "위험도에 따라 승인 절차가 달라야 합니다", en: "Approval must follow risk level" },
                body: {
                    ko: "고객에게 나가는 응답, 내부 문서 요약, 시스템 실행은 위험 수준이 다릅니다. AI 서비스마다 심사와 결재 경로를 다르게 둘 수 있어야 합니다.",
                    en: "Customer-facing answers, internal summaries and system actions carry different risks. Each AI service needs its own review and approval path.",
                },
            },
        ],
        approach: [
            {
                title: { ko: "온프레미스 플랫폼 구성", en: "On-premises platform" },
                body: {
                    ko: "고객사 서버와 GPU에 XGEN을 설치하고, 사내 LLM과 허용된 외부 모델을 정책에 따라 연결합니다.",
                    en: "XGEN is installed on the customer's servers and GPUs, connecting in-house LLMs and approved external models under policy.",
                },
            },
            {
                title: { ko: "사내 문서를 근거로 한 검색", en: "Search grounded in internal documents" },
                body: {
                    ko: "규정·상품 설명서·업무 매뉴얼을 RAG로 지식화하고, 답변에 근거 문서를 함께 보여 줍니다.",
                    en: "Regulations, product manuals and work guides are indexed with RAG, and answers cite their source documents.",
                },
            },
            {
                title: { ko: "결재선과 AI 위험도 심사", en: "Approval routes and AI risk review" },
                body: {
                    ko: "AI 서비스별 위험 등급을 심사하고, 협업부서·거버넌스 담당자·정보보호관리자로 이어지는 결재선을 지정해 배포를 승인합니다.",
                    en: "Each AI service is risk-rated, and deployment is approved through a route of partner teams, governance owners and the information security officer.",
                },
            },
            {
                title: { ko: "운영과 감사", en: "Operation and audit" },
                body: {
                    ko: "RBAC, 개인정보 마스킹, 가드레일, 실행 감사 로그로 운영 중 접근과 실행을 추적합니다.",
                    en: "RBAC, PII masking, guardrails and execution audit logs track access and actions in operation.",
                },
            },
        ],
        stack: [
            { name: "XGEN", role: { ko: "Agent·RAG 개발과 운영 플랫폼", en: "Platform for building and running agents and RAG" }, href: "/product/xgen" },
            { name: "보안·거버넌스", role: { ko: "결재선, 위험도 심사, 감사 로그", en: "Approval routes, risk review, audit logs" }, href: "/security-and-governance" },
        ],
        scenarios: [
            { ko: "내부 규정·여신 업무 매뉴얼 질의응답", en: "Q&A over internal rules and lending manuals" },
            { ko: "상담 이력과 상품 문서를 근거로 한 응대 초안 작성", en: "Drafting responses from consultation history and product documents" },
            { ko: "부서별 AI 서비스를 하나의 플랫폼에서 등록·승인·운영", en: "Registering, approving and running departmental AI services on one platform" },
        ],
        considerations: [
            { ko: "모델 성능과 응답 품질은 사용하는 LLM과 GPU 구성에 따라 달라집니다.", en: "Model performance and answer quality depend on the LLM and GPU configuration." },
            { ko: "결재선과 위험 등급 기준은 고객사의 내부통제 규정에 맞춰 함께 정의합니다.", en: "Approval routes and risk criteria are defined together with the customer's internal-control rules." },
            { ko: "감독 규정 준수 여부는 고객사의 검토를 거쳐 판단해야 하며, 플랫폼 도입만으로 충족되지는 않습니다.", en: "Regulatory compliance must be assessed by the customer; adopting the platform alone does not satisfy it." },
        ],
        related: [
            { label: { ko: "지식 검색 적용 사례", en: "Knowledge-search use cases" }, href: "/solutions#knowledge" },
        ],
    },
    commerce: {
        intro: {
            ko: "커머스 업무는 상품·주문·리뷰·문의 데이터가 계속 쌓이고, 검색·추천·상담처럼 고객 접점의 응답 속도와 정확성이 매출과 바로 연결됩니다. Plateer AI Labs는 커머스 특화 sLLM Polar와 Agent 플랫폼 XGEN, 커머스 플랫폼 X2BEE를 조합해 이 업무에 적용합니다.",
            en: "Commerce work keeps generating product, order, review and inquiry data, and the speed and accuracy of search, recommendation and support tie directly to revenue. Plateer AI Labs applies the commerce-focused sLLM Polar, the agent platform XGEN and the commerce platform X2BEE together.",
        },
        challenges: [
            {
                title: { ko: "키워드 검색으로는 의도를 놓칩니다", en: "Keyword search misses intent" },
                body: {
                    ko: "「출근할 때 입을 가벼운 재킷」 같은 표현은 상품명 키워드와 맞지 않아 원하는 상품이 검색되지 않는 경우가 많습니다.",
                    en: "Phrases like \"a light jacket for the commute\" rarely match product-name keywords, so the right products often don't show up.",
                },
            },
            {
                title: { ko: "반복 문의가 상담 인력을 묶어 둡니다", en: "Repeat inquiries tie up support staff" },
                body: {
                    ko: "배송·교환·사이즈처럼 답이 정해진 문의가 상담의 큰 비중을 차지해, 복잡한 문의에 쓸 시간이 줄어듭니다.",
                    en: "Inquiries with set answers — delivery, exchange, sizing — take a large share of support time, leaving less for complex cases.",
                },
            },
            {
                title: { ko: "리포트 작성에 데이터 수집 시간이 듭니다", en: "Reporting starts with data gathering" },
                body: {
                    ko: "판매·시장 데이터를 여러 시스템에서 모아 정리하는 데 시간이 들어, 분석과 판단에 쓸 시간이 부족합니다.",
                    en: "Collecting sales and market data from several systems takes time away from analysis and decisions.",
                },
            },
        ],
        approach: [
            {
                title: { ko: "커머스 데이터로 학습한 모델", en: "A model trained on commerce data" },
                body: {
                    ko: "Polar는 상품·리뷰·문의 데이터로 학습한 sLLM으로, 사내 서버에서 운영할 수 있습니다.",
                    en: "Polar is an sLLM trained on product, review and inquiry data, and can run on in-house servers.",
                },
            },
            {
                title: { ko: "시맨틱 검색과 추천", en: "Semantic search and recommendation" },
                body: {
                    ko: "한국어 임베딩과 RAG로 질의 의도를 해석해 상품을 찾고, 주문·재고 데이터를 반영해 추천합니다.",
                    en: "Korean embeddings and RAG interpret query intent to find products, and recommendations reflect order and stock data.",
                },
            },
            {
                title: { ko: "상담과 리포트 Agent", en: "Support and reporting agents" },
                body: {
                    ko: "XGEN에서 FAQ 응대, 상품평 요약, 판매 리포트 생성 Agent를 만들고 기존 시스템과 연결합니다.",
                    en: "XGEN is used to build FAQ, review-summary and sales-report agents and connect them to existing systems.",
                },
            },
            {
                title: { ko: "커머스 플랫폼과 연계", en: "Integration with the commerce platform" },
                body: {
                    ko: "X2BEE 같은 커머스 플랫폼의 상품·주문 흐름에 AI 기능을 붙여 운영 화면에서 바로 씁니다.",
                    en: "AI features are attached to the product and order flow of commerce platforms such as X2BEE, used directly in operating screens.",
                },
            },
        ],
        stack: [
            { name: "Polar", role: { ko: "커머스 특화 Private sLLM", en: "Commerce-focused private sLLM" }, href: "/product/polar" },
            { name: "XGEN", role: { ko: "상담·리포트 Agent 개발과 운영", en: "Building and running support and report agents" }, href: "/product/xgen" },
            { name: "X2BEE", role: { ko: "에이전틱 커머스 플랫폼", en: "Agentic commerce platform" }, href: "https://www.x2bee.com/" },
        ],
        scenarios: [
            { ko: "자연어 상품 검색과 추천 TOP-N", en: "Natural-language product search and top-N recommendations" },
            { ko: "상품평 요약과 반복 문의 자동 응대", en: "Review summaries and automated answers to repeat inquiries" },
            { ko: "시장·판매 데이터를 모은 정기 리포트 생성", en: "Periodic reports built from market and sales data" },
        ],
        considerations: [
            { ko: "검색·추천 품질은 상품 데이터의 정합성과 양에 따라 달라집니다.", en: "Search and recommendation quality depends on the consistency and volume of product data." },
            { ko: "환불·클레임처럼 판단이 필요한 문의는 상담원 연결 기준을 함께 정해 둡니다.", en: "For inquiries that need judgment, such as refunds and claims, handoff rules to agents are defined together." },
            { ko: "온프레미스 운영 시 초기 인프라 비용과 맞춤 구현 작업이 필요합니다.", en: "On-premises operation requires upfront infrastructure cost and custom implementation work." },
        ],
        related: [
            { label: { ko: "업무 자동화 적용 사례", en: "Workflow-automation use cases" }, href: "/solutions#automation" },
            { label: { ko: "통합형 멀티 에이전트 사례", en: "Unified multi-agent use case" }, href: "/solutions#multi-agent" },
        ],
    },
    public: {
        intro: {
            ko: "공공 업무는 방대한 규정·공고·민원 문서를 다루고, 결과에 대한 근거와 설명이 중요합니다. 망분리와 보안 인증 요건도 함께 충족해야 합니다. XGEN은 내부망에서 문서를 근거로 검색하고 답하는 방식으로 공공 업무에 적용되며, GS 인증 1등급을 받은 제품입니다.",
            en: "Public-sector work deals with large volumes of regulations, notices and civil-service documents, and the grounds behind every answer matter. Network separation and security certification requirements apply too. XGEN is applied by searching and answering from documents inside the internal network, and holds GS certification grade 1.",
        },
        challenges: [
            {
                title: { ko: "검색어를 정확히 알아야 찾을 수 있습니다", en: "You must know the exact term to find it" },
                body: {
                    ko: "조달·공고 검색은 정해진 용어와 분류를 알아야 원하는 결과가 나와, 담당자마다 검색 결과가 달라집니다.",
                    en: "Procurement and notice search only works if you know the exact terms and categories, so results vary by person.",
                },
            },
            {
                title: { ko: "답변에는 근거가 따라야 합니다", en: "Answers need grounds" },
                body: {
                    ko: "공공 업무의 안내와 판단은 어떤 규정과 문서를 근거로 했는지 확인할 수 있어야 합니다.",
                    en: "Guidance and decisions in public work must show which regulation or document they rest on.",
                },
            },
            {
                title: { ko: "보안 요건을 먼저 충족해야 합니다", en: "Security requirements come first" },
                body: {
                    ko: "내부망 운영, 접근 통제, 개인정보 보호 기준을 충족하지 못하면 도입 검토 단계를 넘기 어렵습니다.",
                    en: "Without internal-network operation, access control and privacy protection, adoption rarely gets past review.",
                },
            },
        ],
        approach: [
            {
                title: { ko: "내부망 설치", en: "Internal-network deployment" },
                body: {
                    ko: "기관 서버에 XGEN과 LLM을 설치해 외부 연결 없이 운영할 수 있게 구성합니다.",
                    en: "XGEN and the LLM are installed on the institution's servers and configured to run without external connections.",
                },
            },
            {
                title: { ko: "의미 기반 검색", en: "Meaning-based search" },
                body: {
                    ko: "질문의 의도를 해석해 관련 공고·규정을 찾고, 결과와 함께 근거 문서를 제시합니다.",
                    en: "Query intent is interpreted to find related notices and regulations, presented with source documents.",
                },
            },
            {
                title: { ko: "접근 통제와 비식별 처리", en: "Access control and de-identification" },
                body: {
                    ko: "사용자 권한에 따라 볼 수 있는 문서를 나누고, 개인정보는 마스킹해 처리합니다.",
                    en: "Visible documents are scoped by user permission, and personal data is masked.",
                },
            },
            {
                title: { ko: "운영 기록", en: "Operating records" },
                body: {
                    ko: "질의와 답변, 실행 이력을 감사 로그로 남겨 운영 점검에 활용합니다.",
                    en: "Queries, answers and actions are kept in audit logs for operational review.",
                },
            },
        ],
        stack: [
            { name: "XGEN", role: { ko: "내부망 Agent·RAG 플랫폼", en: "Internal-network agent and RAG platform" }, href: "/product/xgen" },
            { name: "인증·품질", role: { ko: "GS 인증 1등급 (26-0296)", en: "GS certification grade 1 (26-0296)" }, href: "/product/xgen/security#certification" },
            { name: "보안·거버넌스", role: { ko: "권한, 마스킹, 감사 로그", en: "Permissions, masking, audit logs" }, href: "/security-and-governance" },
        ],
        scenarios: [
            { ko: "조달·공고 의미 검색", en: "Meaning-based procurement and notice search" },
            { ko: "규정·지침 질의응답과 근거 제시", en: "Q&A over rules and guidelines with cited grounds" },
            { ko: "민원 응대 초안 작성 보조", en: "Assisting with drafts for civil-service responses" },
        ],
        considerations: [
            { ko: "기관별 보안 지침에 따라 설치 구성과 외부 연동 범위가 달라집니다.", en: "Installation and external-integration scope vary with each institution's security guidelines." },
            { ko: "GS 인증은 인증 시점의 제품 버전과 시험 범위에 대한 결과입니다.", en: "GS certification applies to the product version and test scope at the time of certification." },
            { ko: "검색 품질은 문서의 최신성과 정리 상태에 영향을 받습니다.", en: "Search quality is affected by how current and well-organized the documents are." },
        ],
        related: [
            { label: { ko: "공공 적용 사례", en: "Public-sector use case" }, href: "/solutions#public" },
        ],
    },
    "it-services": {
        intro: {
            ko: "IT·제조 조직은 소스 코드와 설계·기술 문서를 외부로 보내기 어렵고, 개발 환경도 폐쇄망인 경우가 많습니다. Plateer AI Labs는 사내 LLM과 개발 도구를 연결한 AI 코딩 어시스턴트와 기술 문서 검색을 고객사 환경 안에 구축하는 방식으로 이 업무에 적용합니다.",
            en: "IT and manufacturing organizations can rarely send source code or design and technical documents outside, and their development environments are often air-gapped. Plateer AI Labs applies AI here by building AI coding assistants and technical-document search inside the customer's environment, connected to in-house LLMs and dev tools.",
        },
        challenges: [
            {
                title: { ko: "외부 코딩 AI를 쓸 수 없습니다", en: "External coding AI is off-limits" },
                body: {
                    ko: "소스 코드 유출 우려로 상용 클라우드 코딩 도구 사용이 제한되는 경우가 많습니다.",
                    en: "Concerns about source-code leakage often restrict commercial cloud coding tools.",
                },
            },
            {
                title: { ko: "기술 문서가 흩어져 있습니다", en: "Technical documents are scattered" },
                body: {
                    ko: "설계서·API 문서·장애 이력이 여러 저장소에 나뉘어 있어 필요한 정보를 찾는 데 시간이 듭니다.",
                    en: "Design specs, API docs and incident history sit in different repositories, so finding information takes time.",
                },
            },
            {
                title: { ko: "전사 확산에는 운영 기준이 필요합니다", en: "Company-wide rollout needs operating rules" },
                body: {
                    ko: "일부 팀의 시범 사용을 전사로 넓히려면 사용자 관리, 사용량, 모델 선택 기준이 함께 정리돼야 합니다.",
                    en: "Expanding a team pilot company-wide requires user management, usage tracking and model-selection rules.",
                },
            },
        ],
        approach: [
            {
                title: { ko: "사내 LLM 연결", en: "Connecting in-house LLMs" },
                body: {
                    ko: "고객사 GPU에서 운영하는 LLM에 코딩 어시스턴트를 연결해, 코드가 외부로 나가지 않게 구성합니다.",
                    en: "The coding assistant connects to LLMs running on the customer's GPUs so code does not leave the environment.",
                },
            },
            {
                title: { ko: "개발 도구 안에서 사용", en: "Used inside dev tools" },
                body: {
                    ko: "IDE 안에서 코드 작성·설명·리뷰를 돕고, DexOn에서는 바이브코딩과 직접 코딩을 오가며 작업할 수 있습니다.",
                    en: "It helps write, explain and review code inside the IDE, and DexOn lets developers move between vibe coding and hands-on coding.",
                },
            },
            {
                title: { ko: "기술 문서 지식화", en: "Indexing technical documents" },
                body: {
                    ko: "설계·API·운영 문서를 RAG로 묶어 질문에 근거 문서와 함께 답합니다.",
                    en: "Design, API and operations documents are combined with RAG to answer questions with sources.",
                },
            },
            {
                title: { ko: "단계적 확산", en: "Phased rollout" },
                body: {
                    ko: "시범 조직에서 사용 패턴을 확인한 뒤, 사용자 권한과 사용량 관리 기준을 정해 범위를 넓힙니다.",
                    en: "After confirming usage patterns in a pilot group, scope expands with defined permission and usage rules.",
                },
            },
        ],
        stack: [
            { name: "AI 코딩 어시스턴트", role: { ko: "사내 LLM 기반 코드 작성·리뷰 지원", en: "Code writing and review on in-house LLMs" } },
            { name: "DexOn", role: { ko: "바이브코딩·직접 코딩 워크스페이스", en: "Workspace for vibe and hands-on coding" }, href: "/vibe-coding" },
            { name: "XGEN", role: { ko: "기술 문서 RAG와 Agent 운영", en: "Technical-document RAG and agent operation" }, href: "/product/xgen" },
        ],
        scenarios: [
            { ko: "폐쇄망 개발 환경의 코드 작성·설명 보조", en: "Code writing and explanation in air-gapped environments" },
            { ko: "설계·API 문서 질의응답", en: "Q&A over design and API documents" },
            { ko: "코드 리뷰 초안과 테스트 코드 작성 보조", en: "Drafting code reviews and test code" },
        ],
        considerations: [
            { ko: "코드 제안 품질은 연결한 LLM의 성능과 컨텍스트 설정에 따라 달라집니다.", en: "Suggestion quality depends on the connected LLM and context settings." },
            { ko: "생성된 코드는 기존 리뷰·테스트 절차를 거쳐 반영해야 합니다.", en: "Generated code should go through existing review and test procedures." },
            { ko: "GPU 규모에 따라 동시 사용자 수와 응답 속도가 달라집니다.", en: "Concurrent users and response speed vary with GPU capacity." },
        ],
        related: [
            { label: { ko: "제조 적용 사례", en: "Manufacturing use case" }, href: "/solutions#manufacturing" },
            { label: { ko: "지식 검색 적용 사례", en: "Knowledge-search use cases" }, href: "/solutions#knowledge" },
        ],
    },
};
