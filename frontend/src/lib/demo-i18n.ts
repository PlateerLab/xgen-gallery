import type { DemoManifest } from "@plateerlab/xgen-gallery";
import type { Locale } from "@/lib/i18n";

/**
 * 데모 매니페스트 영문화.
 *
 * 툴 데모의 라벨·설명·샘플은 대부분 npm 패키지(@plateerlab/xgen-gallery)의 레지스트리에서
 * 오기 때문에 저장소에서 직접 고칠 수 없다. 그래서 렌더 직전에 문자열을 사전으로 치환한다.
 *
 * 사전에 없는 한국어는 그대로 통과한다 — 새 문구가 들어오면 빌드 HTML 한글 스캔에서
 * 바로 드러나므로, 조용히 누락되지 않는다.
 */
const DICT: Record<string, string> = {
    // ── 툴 설명 ────────────────────────────────────────────────
    "문서를 업로드하면 AI-Ready 구조화 텍스트로 변환합니다. 80+ 포맷 지원.":
        "Upload a document and get AI-ready structured text. 80+ formats supported.",
    "문서를 AI가 이해할 수 있는 청크로 분할합니다.":
        "Split a document into chunks an AI can work with.",
    "파일 한 줄로 전체 통계 분석 + 인터랙티브 HTML 리포트 생성. 24+ 포맷 지원.":
        "One line per file: full statistics plus an interactive HTML report. 24+ formats.",
    "자연어 지시로 DOCX·PPTX·HWPX 문서를 직접 편집합니다. LLM이 문서를 열고 고쳐 다시 씁니다.":
        "Edit DOCX, PPTX, and HWPX documents directly from a natural-language instruction — the LLM opens the file, changes it, and writes it back.",
    "벡터 검색과 그래프 검색을 한 번에 융합하는 backend-agnostic GraphRAG. 하나의 질의로 두 신호를 합칩니다.":
        "Backend-agnostic GraphRAG that fuses vector and graph search — one query, both signals combined.",
    "트리 구조 지식 맵. LLM 에이전트를 위한 4-tool TreeRAG 시스템.":
        "A tree-structured knowledge map — a 4-tool TreeRAG system for LLM agents.",
    "타입 안전한 구글 검색 라이브러리. 웹/이미지/뉴스/비디오 검색 지원.":
        "A type-safe Google search library — web, image, news, and video search.",
    "Python 에이전트 도구 패키지를 위한 구조 린터. AST 기반 정적 분석.":
        "A structural linter for Python agent tool packages, using AST-based static analysis.",
    "모델 바깥에서 검증·재시도·종료를 소유하는 10-stage 실행 하네스. 설정(config)으로 파이프라인을 제어합니다.":
        "A 10-stage execution harness that owns validation, retry, and termination outside the model — the pipeline is driven by config.",
    "에이전트를 위한 고성능 브라우저 자동화 라이브러리. 실제 브라우저 세션을 스크립트로 제어합니다.":
        "High-performance browser automation for agents — script a real browser session.",

    // ── 입력·출력 라벨 ─────────────────────────────────────────
    "문서 업로드": "Upload a document",
    "데이터 파일 업로드": "Upload a data file",
    "판매 데이터 (CSV)": "Sales data (CSV)",
    "회사 정책 문서": "Company policy document",
    "마크다운 문서": "Markdown document",
    "기술 문서": "Technical document",
    "지식 텍스트 입력": "Knowledge text",
    "Python 코드": "Python code",
    "구조 위반 코드": "Code with a structural violation",
    "처리 모드": "Processing mode",
    "청크 크기": "Chunk size",
    "청크 오버랩": "Chunk overlap",
    "텍스트 추출": "Extract text",
    "추출 + 청킹": "Extract and chunk",
    "리포트 언어": "Report language",
    "컬렉션 ID": "Collection ID",
    "선택 규칙 (쉼표 구분)": "Selected rules (comma-separated)",
    "검색어": "Search query",
    "검색 유형": "Search type",
    "검색 지역": "Search region",
    "웹 검색": "Web search",
    "이미지 검색": "Image search",
    "뉴스 검색": "News search",
    "비디오 검색": "Video search",
    "최대 결과 수": "Maximum results",
    "대상 URL": "Target URL",
    "액션 스크립트": "Action script",
    "텍스트 추출 ": "Extract text ",
    "작업 프롬프트": "Task prompt",
    "최대 재시도": "Maximum retries",
    "문서 형식": "Document format",
    "편집 지시(자연어)": "Edit instruction (natural language)",
    "질문": "Question",
    "한국": "Korea",
    "미국": "United States",
    "일본": "Japan",
    "전체": "All",
    "한국어": "Korean",
    "한글 (.hwpx)": "Hangul (.hwpx)",

    // ── 샘플 라벨·플레이스홀더 ─────────────────────────────────
    "검색 후 추출": "Search, then extract",
    "융합 검색 예시": "Fused search example",
    "제목·서식 편집": "Title and formatting edit",
    "검증·재시도 흐름": "Validation and retry flow",
    "예: company_docs": "e.g. company_docs",
    "예: python machine learning tutorial": "e.g. python machine learning tutorial",
    "예: ATL101,ATL201 (빈칸이면 전체 검사)":
        "e.g. ATL101,ATL201 (leave blank to check everything)",
    "린트할 Python 코드를 입력하세요...": "Paste the Python code you want to lint…",
    "지식 맵으로 구조화할 텍스트를 입력하세요...":
        "Paste the text you want structured into a knowledge map…",
    "예: 이 표에서 분기별 매출 합계를 계산해줘":
        "e.g. total the quarterly revenue in this table",
    "예: 환불 정책과 배송 지연은 어떻게 연결되나요?":
        "e.g. how do the refund policy and delivery delays connect?",
    "예: 검색창에 'XGEN' 입력 → 첫 결과 제목 추출":
        "e.g. type 'XGEN' in the search box → extract the first result's title",
    "예: 제목을 '2026 사업계획'으로 바꾸고 첫 문단을 굵게":
        "e.g. change the title to '2026 Business Plan' and bold the first paragraph",
    "검색창에 'XGEN' 입력 → 첫 결과 제목 추출":
        "Type 'XGEN' in the search box → extract the first result's title",
    "제목을 '2026 사업계획'으로 바꾸고 첫 문단을 굵게":
        "Change the title to '2026 Business Plan' and bold the first paragraph",
    "이 표에서 분기별 매출 합계를 계산해줘":
        "Total the quarterly revenue in this table",
    "환불 정책과 배송 지연은 어떻게 연결되나요?":
        "How do the refund policy and delivery delays connect?",
    "페이지 이동 → 입력 → 텍스트 추출":
        "Navigate → type → extract text",
    "제목 교체 + 첫 문단 강조": "Replace the title, emphasize the first paragraph",
    "판정 게이트를 통과할 때까지 실행": "Runs until it clears the judgement gate",
    "calculator 도구 공개": "Exposes the calculator tool",
    "XGEN Agentic AI Platform — 엔터프라이즈 AI 플랫폼":
        "XGEN Agentic AI Platform — an enterprise AI platform",

    // ── 출력 라벨·목업 결과 ────────────────────────────────────
    "결과 요약": "Result summary",
    "실행 로그": "Execution log",
    "융합 결과": "Fused result",
    "최종 결과": "Final result",
    "추출 결과": "Extraction result",
    "적용된 편집": "Edits applied",
    "스코어 상세": "Score detail",
    "스테이지 실행 로그": "Stage execution log",
    "벡터 + 그래프 신호를 합친 랭킹": "A ranking that combines vector and graph signals",
    "환불 정책 — 배송 지연 시 전액 환불":
        "Refund policy — full refund when delivery is delayed",
    "배송 지연 보상 규정": "Delivery-delay compensation rules",
    "고객 문의 유형 — 지연/환불": "Inquiry type — delay / refund",
    "사업 계획서 초안": "Business plan draft",
    "2026 사업계획": "2026 Business Plan",
    "합계 1건 누락": "One total missing",
    "배송이 7일 이상 지연되면 요청 시 전액 환불. graph: 정책→배송→환불 경로로 연결됨.":
        "A delay of 7 days or more entitles the customer to a full refund on request. graph: linked along policy → delivery → refund.",
    "지연 3일마다 적립금 지급. vector 유사도 0.82.":
        "Credit is issued for every 3 days of delay. vector similarity 0.82.",
    "지연 문의의 41%가 환불로 이어짐. graph 이웃 노드.":
        "41% of delay inquiries end in a refund. graph neighbour node.",
    "2건의 편집을 적용했습니다 — 제목 1건, 서식 1건. 원본 구조(스타일·목차)는 그대로 유지됩니다.":
        "Two edits applied — one title, one format. The original structure (styles, table of contents) is left intact.",
    "Q1 12.4M · Q2 15.1M · Q3 14.8M · Q4 18.2M — 합계 60.5M (2차 시도에서 판정 통과).":
        "Q1 12.4M · Q2 15.1M · Q3 14.8M · Q4 18.2M — total 60.5M (cleared judgement on the second attempt).",

    // ── xgen-sdk ────────────────────────────────────
    "백엔드 공통 빌딩블록을 한 패키지로 모은 파이썬 툴킷. 그중 ABAC 권한 판정을 실행해 봅니다.":
        "A Python toolkit that gathers common backend building blocks into one package. Here you can run its ABAC permission check.",
    "보유 권한 (줄바꿈 구분)":
        "Granted permissions (one per line)",
    "엔드포인트가 요구하는 권한":
        "Permission the endpoint requires",
    "판정":
        "Decision",
    "평가 근거":
        "Evaluation trace",
    "와일드카드 허용":
        "Wildcard grants access",
    "admin.role:* 가 admin.role:read 를 덮는다":
        "admin.role:* covers admin.role:read",
    "권한 없음":
        "No matching permission",
    "리소스가 달라 어떤 규칙도 맞지 않는다":
        "The resource differs, so no rule matches",
    "superuser 우회":
        "Superuser bypass",
    "보유 권한과 무관하게 통과한다":
        "Passes regardless of granted permissions",
    "allow — admin.role:* 가 요구 권한을 덮습니다":
        "allow — admin.role:* covers the required permission",
    "deny — 요구 권한을 덮는 규칙이 없습니다":
        "deny — no rule covers the required permission",
    "allow — superuser 는 권한 검사를 우회합니다":
        "allow — a superuser bypasses the permission check",
    "예: admin.role:*\nworkflow:read":
        "e.g. admin.role:*\nworkflow:read",
    "예: admin.role:read":
        "e.g. admin.role:read",

    // ── xgen-gallery ─────────────────────────────────
    "GitHub 조직 저장소를 검색·언어 필터가 있는 React 갤러리로 렌더링합니다. 같은 데이터에서 필터와 limit이 어떻게 적용되는지 확인합니다.":
        "Render a GitHub organization's repositories as a React gallery with search and language filters. See how filters and limit affect the same data set.",
    "저장소 검색어": "Repository search",
    "예: agent": "e.g. agent",
    "언어 필터": "Language filter",
    "최대 카드 수": "Maximum cards",
    "필터 결과 요약": "Filter result summary",
    "표시할 저장소": "Repositories to display",
    "컴포넌트 속성": "Component props",
    "에이전트 저장소 검색": "Search agent repositories",
    "이름·설명 검색과 TypeScript 언어 필터를 함께 적용":
        "Apply name and description search together with the TypeScript language filter",
    "검색어와 언어 조건에 맞는 저장소 2개를 표시합니다.":
        "Displays two repositories matching the search and language conditions.",
    "최근 저장소 3개": "Three recent repositories",
    "검색·언어 필터 없이 limit만 적용": "Apply only the limit, without search or language filters",
    "조직 저장소 목록의 앞 3개를 표시합니다.":
        "Displays the first three repositories in the organization list.",

    // ── xgen-agent-memory ───────────────────────────
    "의미 검색·BM25·타입드 엣지 그래프 탐색을 한 번에 합치는 메모리 엔진. 세 신호가 각각 얼마나 기여했는지 보여줍니다.":
        "A memory engine that fuses semantic search, BM25, and typed-edge graph traversal in a single pass — and shows how much each signal contributed.",
    "예: 환불 정책이 언제 왜 바뀌었나":
        "e.g. When and why did the refund policy change",
    "그래프 탐색 깊이": "Graph traversal depth",
    "사용 안 함": "Off",
    "1홉": "1 hop",
    "2홉": "2 hops",
    "검색 결과": "Results",
    "신호별 스코어": "Score by signal",
    "세 신호 합산": "All three signals",
    "의미·키워드·그래프가 모두 기여하는 일반 질의":
        "A general query where the semantic, keyword, and graph signals all contribute",
    "환불 정책이 언제 왜 바뀌었나":
        "When and why did the refund policy change",
    "환불 정책 개정 (2026-03)": "Refund policy revision (2026-03)",
    "배송 지연 기준을 7일에서 5일로 단축. 개정 사유는 CS 인입 급증.":
        "Shortened the shipping-delay threshold from 7 days to 5, prompted by a spike in support volume.",
    "CS 티켓 급증 리포트": "Support ticket spike report",
    "지연 문의가 전분기 대비 2.4배. 정책 개정 논의의 출발점.":
        "Delay inquiries at 2.4x the previous quarter — where the policy discussion started.",
    "환불 정책 (구버전)": "Refund policy (previous version)",
    "배송 7일 초과 시 전액 환불. 개정 전 원문.":
        "Full refund when shipping exceeds 7 days — the text before the revision.",
    "online-learned (feedback 412건 반영)":
        "online-learned (412 feedback events applied)",
    "키워드가 이기는 질의": "Keyword wins",
    "고유명사·식별자는 BM25가 의미 검색을 앞선다":
        "For proper nouns and identifiers, BM25 beats semantic search",
    "ERR_QUOTA_4021 — 조직 단위 쿼터 초과":
        "ERR_QUOTA_4021 — organization quota exceeded",
    "quota.py 에서 조직 합산 사용량이 한도를 넘을 때 발생. 재시도 대상 아님.":
        "Raised in quota.py when an organization's combined usage passes its limit. Not retryable.",
    "쿼터 정책 설계 노트": "Quota policy design note",
    "조직·프로젝트 2단 쿼터를 둔 이유와 한도 산정 근거.":
        "Why quotas are two-tier (organization and project) and how the limits were derived.",
    "graph_hops=0 이라 그래프 신호는 계산하지 않았습니다":
        "graph_hops=0, so the graph signal was not computed",
    "그래프 2홉으로 도달": "Reached over two graph hops",
    "의미 유사도가 낮아 검색으로는 안 잡히는 문서를 엣지로 찾아낸다":
        "Reaches a document over typed edges that search alone misses because its semantic similarity is low",
    "지난 분기 CS 급증의 후속 조치":
        "Follow-up actions after last quarter's support spike",
    "지연 문의가 전분기 대비 2.4배.":
        "Delay inquiries at 2.4x the previous quarter.",
    "리포트 → 논의 → 개정으로 이어진 2홉 경로 끝에 있는 문서.":
        "The document at the end of a two-hop path: report → discussion → revision.",
    "배송사 SLA 재협상 기록": "Carrier SLA renegotiation record",
    "같은 원인에서 갈라져 나온 다른 조치. 의미 유사도 0.29 로 검색만으로는 누락됨.":
        "A different action branching from the same cause — missed by search alone at 0.29 semantic similarity.",

    // ── xgen-agent-runtime ──────────────────────────
    "21개 스테이지가 각각 전략 슬롯을 갖는 매니페스트 기반 파이프라인. 어느 스테이지에 어떤 전략이 끼워졌는지 그대로 드러납니다.":
        "A manifest-driven pipeline whose 21 stages each expose a strategy slot — you can see exactly which strategy filled which stage.",
    "작업 지시": "Task",
    "예: 첨부한 계약서에서 위약금 조항을 찾아 요약해줘":
        "e.g. Find the penalty clause in the attached contract and summarize it",
    "LLM 제공자": "LLM provider",
    "vLLM (자체 호스팅)": "vLLM (self-hosted)",
    "계획 전략": "Planning strategy",
    "기본 파이프라인 (ReAct)": "Default pipeline (ReAct)",
    "21개 스테이지 중 실제로 발화한 것만 로그에 남는다":
        "Of the 21 stages, only the ones that actually fired appear in the log",
    "첨부한 계약서에서 위약금 조항을 찾아 요약해줘":
        "Find the penalty clause in the attached contract and summarize it",
    "청크 8건 회수": "8 chunks retrieved",
    "통과": "Passed",
    "위약금 조항은 제12조에 있습니다. 계약 해지 시 잔여 계약금액의 30%를 위약금으로 지급하되, 상대방 귀책 사유로 인한 해지에는 적용되지 않습니다.":
        "The penalty clause is Article 12. On termination, 30% of the remaining contract value is payable as a penalty — except where the other party is at fault.",
    "MCP 도구 호출": "MCP tool call",
    "외부 도구를 MCP 로 붙여 같은 파이프라인에서 실행":
        "External tools attached over MCP and run inside the same pipeline",
    "사내 위키에서 배포 절차 문서를 찾아 요약해줘":
        "Find the deployment procedure in the internal wiki and summarize it",
    "출처 3건 확인": "3 citations verified",
    "배포는 스테이징 검증 → 릴리즈 노트 작성 → 승인 → 운영 반영 순서입니다. 승인자는 품질책임자이며, 롤백 기준은 오류율 1% 초과입니다.":
        "Deployment runs staging verification → release notes → approval → production rollout. The quality lead approves, and rollback is triggered above a 1% error rate.",
    "전략 교체 (Reflexion)": "Strategy swap (Reflexion)",
    "스테이지는 그대로 두고 전략 슬롯만 바꾼다 — 검증 실패 시 자기 교정이 붙는다":
        "The stages stay the same and only the strategy slot changes — a failed check adds self-correction",
    "실패 — 합계가 열 합과 불일치":
        "Failed — the total does not match the column sum",
    "3분기 결측치를 0으로 처리한 것이 원인":
        "Cause: the missing Q3 value was treated as zero",
    "재실행": "Re-run",
    "1분기 12.4억, 2분기 14.1억, 3분기 결측(집계 제외), 4분기 16.8억 — 확인 가능한 3개 분기 합계는 43.3억입니다.":
        "Q1 1.24B, Q2 1.41B, Q3 missing (excluded), Q4 1.68B — the three quarters that can be verified total 4.33B KRW.",

    // ── xgen-an-web ─────────────────────────────────
    "웹을 픽셀로 그리지 않고 '행동 가능한 상태 기계'로 실행합니다. 페이지가 에이전트용 시맨틱 그래프로 바뀝니다.":
        "Runs the web as an actionable state machine instead of painting pixels — a page becomes a semantic graph an agent can act on.",
    "예: https://shop.example.com/search": "e.g. https://shop.example.com/search",
    "목표": "Goal",
    "예: 재고 있는 상품 중 가장 싼 것을 장바구니에 담기":
        "e.g. Add the cheapest in-stock product to the cart",
    "시맨틱 상태": "Semantic state",
    "행동 계획": "Action plan",
    "검색 → 담기": "Search, then add to cart",
    "상품 목록을 상태로 읽고 조건에 맞는 행동을 고른다":
        "Reads the product list as state and picks the action that fits the condition",
    "재고 있는 상품 중 가장 싼 것을 장바구니에 담기":
        "Add the cheapest in-stock product to the cart",
    "무선 키보드 K380": "Wireless Keyboard K380",
    "기계식 키보드 MX": "Mechanical Keyboard MX",
    "저소음 키보드 QT": "Quiet Keyboard QT",
    "1.8 MB (렌더링 생략)": "1.8 MB (rendering skipped)",
    "in_stock=false 인 a9 는 후보에서 제외":
        "a9 is dropped from the candidates because in_stock=false",
    "남은 후보 중 최저가는 a7 (49,000원)":
        "Among the remaining candidates, a7 is cheapest (KRW 49,000)",
    "로그인 폼": "Login form",
    "입력 가능한 필드와 제출 조건을 상태로 노출한다":
        "Exposes the fillable fields and the submit condition as state",
    "저장된 자격증명으로 로그인하기": "Sign in with saved credentials",
    "이메일": "Email",
    "비밀번호": "Password",
    "로그인": "Sign in",
    "b1 은 f1·f2 가 모두 채워지기 전에는 비활성 — 클릭 시도 자체를 하지 않는다":
        "b1 stays disabled until both f1 and f2 are filled — so the click is never attempted",
    "표 추출": "Table extraction",
    "화면 스크린샷 대신 구조화된 표를 그대로 얻는다":
        "Returns the structured table itself instead of a screenshot",
    "분기 실적 표를 구조화해서 가져오기":
        "Pull the quarterly results table as structured data",
    "2026 분기 실적": "2026 quarterly results",
    "분기": "Quarter",
    "매출": "Revenue",
    "영업이익": "Operating profit",
    "12.4억": "1.24B",
    "1.1억": "0.11B",
    "14.1억": "1.41B",
    "1.6억": "0.16B",
    "2페이지 분 병합": "Merged with page 2",

    // ── xgen-edit2docs ──────────────────────────────
    "한 줄 의도로 진짜 편집 가능한 DOCX·XLSX·PPTX 를 만들고, 이미 있는 문서는 대화로 고칩니다. 이미지가 아니라 실제 문단·셀·차트가 생성됩니다.":
        "Turns a one-line intent into genuinely editable DOCX, XLSX, and PPTX files, and edits existing ones through chat — real paragraphs, cells, and charts, not images.",
    "동작": "Action",
    "새로 생성": "Create new",
    "기존 문서 편집": "Edit an existing document",
    "의도 (한 줄)": "Intent (one line)",
    "예: 신규 고객사 대상 PoC 제안서 초안":
        "e.g. Draft a PoC proposal for a new customer",
    "생성된 문서 구조": "Generated document structure",
    "제안서 생성 (DOCX)": "Generate a proposal (DOCX)",
    "한 줄 의도에서 문단·표·스타일이 있는 실제 문서로":
        "From a one-line intent to a real document with paragraphs, tables, and styles",
    "신규 고객사 대상 PoC 제안서 초안":
        "Draft a PoC proposal for a new customer",
    "PoC 제안서": "PoC proposal",
    "1. 배경과 목표": "1. Background and goals",
    "2. 검증 범위": "2. Scope of validation",
    "항목": "Item",
    "범위": "Scope",
    "산출물": "Deliverable",
    "3. 일정": "3. Schedule",
    "주차": "Week",
    "활동": "Activity",
    "4. 성공 기준": "4. Success criteria",
    "문단 9개, 표 2개, 불릿 3개를 담은 DOCX 를 생성했습니다. Word 에서 열면 스타일과 목차가 그대로 살아 있어 이어서 편집할 수 있습니다.":
        "Generated a DOCX with 9 paragraphs, 2 tables, and 3 bullets. Open it in Word and the styles and outline are intact, ready to keep editing.",
    "집계표 + 차트 생성 (XLSX)": "Generate a summary sheet with a chart (XLSX)",
    "수식과 차트가 들어간 시트를 만든다":
        "Builds a sheet containing formulas and a chart",
    "분기별 매출을 정리하고 추이 차트 넣기":
        "Lay out quarterly revenue and add a trend chart",
    "전분기 대비": "vs. previous quarter",
    "분기 매출 추이": "Quarterly revenue trend",
    "4개 행과 수식 2개, 라인 차트 1개가 있는 XLSX 를 생성했습니다. 셀 값을 바꾸면 수식과 차트가 그대로 다시 계산됩니다.":
        "Generated an XLSX with 4 rows, 2 formulas, and 1 line chart. Change a cell and the formulas and chart recalculate as they normally would.",
    "대화로 편집 (PPTX)": "Edit through chat (PPTX)",
    "이미 있는 발표자료를 자연어 지시로 고친다":
        "Revises an existing deck from a natural-language instruction",
    "3번 슬라이드 제목을 바꾸고 마지막에 Q&A 슬라이드 추가":
        "Change the title of slide 3 and add a Q&A slide at the end",
    "진행 현황": "Progress update",
    "2분기 진행 현황": "Q2 progress update",
    "제목 1건을 교체하고 Q&A 슬라이드를 마지막에 추가했습니다. 기존 마스터·테마는 건드리지 않아 디자인이 유지됩니다.":
        "Replaced one title and appended a Q&A slide. The existing master and theme are untouched, so the design stays put.",

    // ── xgen-ontology ───────────────────────────────
    "문서와 표를 정제된 지식 그래프로 만들고, 한 번의 융합 검색으로 답합니다. 코어는 의존성이 없고 결과는 표준 RDF/Turtle로 나옵니다.":
        "Turns documents and tables into a clean knowledge graph, then answers from it in a single fused search. The core has no dependencies and the output is standard RDF/Turtle.",
    "입력 소스": "Input source",
    "표(CSV) — LLM 없이 구축": "Tables (CSV) — built without an LLM",
    "문서(텍스트) — LLM로 추출": "Documents (text) — extracted with an LLM",
    "원본 데이터": "Source data",
    "CSV 여러 장을 붙여넣거나(표 모드), 규정·정책 같은 문장을 넣으세요(문서 모드).":
        "Paste several CSV tables (table mode), or prose such as a regulation or policy (document mode).",
    "그래프에 던질 질문": "Question to ask the graph",
    "예: Widget은 무슨 색인가?": "e.g. What color is Widget?",
    "그래프 통계": "Graph statistics",
    "융합 검색 결과": "Fused search result",
    "근거 노드·관계": "Evidence nodes and relations",
    "표 2장 → 그래프 (LLM 없음)": "Two tables → a graph (no LLM)",
    "외래키를 관계로, 열을 속성으로 — 모델 호출 없이 구축":
        "Foreign keys become relations and columns become properties — built with no model call",
    "Widget은 무슨 색인가?": "What color is Widget?",
    "Widget의 색은 Red입니다. products.color_id 가 colors.color_id 를 가리켜 hasColor 관계로 승격됐습니다.":
        "Widget is Red. products.color_id points at colors.color_id, so it was promoted to a hasColor relation.",
    "문서 → 그래프 + 목록형 질문": "Document → graph, then a list-shaped question",
    "벡터 인덱스가 못 주는 class enumeration — 「전부 몇 개인가」에 답하는 구간":
        "Class enumeration, which a vector index cannot give you — the part that answers “how many in total”",
    "전자금융감독규정은 Acme Bank에 2020년부터 적용된다. 신용정보법은 Acme Bank와 Beta Card에 적용된다. 다만 소액 결제 대행은 예외로 둔다.":
        "The Electronic Finance Supervision Regulation has applied to Acme Bank since 2020. The Credit Information Act applies to Acme Bank and Beta Card. Small-payment agency work is exempt.",
    "Acme Bank에 적용되는 규정을 전부 알려줘":
        "List every regulation that applies to Acme Bank",
    "Acme Bank에는 전자금융감독규정(EFinanceSupervision, 2020년부터)과 신용정보법(CreditInfoAct) 2건이 적용됩니다. 소액 결제 대행은 예외로 남아 있습니다.":
        "Two regulations apply to Acme Bank — the Electronic Finance Supervision Regulation (EFinanceSupervision, since 2020) and the Credit Information Act (CreditInfoAct). Small-payment agency work remains exempt.",
    "class enumeration + MMR 다양성 — 소수 의견(예외 조항)이 밀려나지 않음":
        "Class enumeration plus MMR diversity — the minority signal (the exemption clause) is not crowded out",
};

/** 사전에 있으면 영문으로, 없으면 원문 그대로. */
function tr(value: string): string {
    return DICT[value] ?? DICT[value.trim()] ?? value;
}

/** 매니페스트를 깊이 복사하며 문자열만 번역한다(키는 건드리지 않는다). */
function translate<T>(value: T): T {
    if (typeof value === "string") return tr(value) as unknown as T;
    if (Array.isArray(value)) return value.map(translate) as unknown as T;
    if (value && typeof value === "object") {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
            out[k] = translate(v);
        }
        return out as unknown as T;
    }
    return value;
}

export function localizeManifest(
    manifest: DemoManifest,
    locale: Locale,
): DemoManifest {
    return locale === "en" ? translate(manifest) : manifest;
}
