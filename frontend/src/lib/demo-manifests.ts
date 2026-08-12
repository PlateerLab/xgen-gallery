import {
    getDemoManifest,
    type DemoManifest,
} from "@plateerlab/xgen-gallery";
import type { Locale } from "@/lib/i18n";
import type { Tool } from "@/lib/tools";
import { buildFallbackManifest } from "@/lib/demo-fallback";

/**
 * 프론트 로컬 데모 매니페스트 — npm 패키지(@plateerlab/xgen-gallery)의 데모 레지스트리에
 * 아직 없는 신규 라이브러리의 데모를 여기서 보완한다(패키지 재게시 없이 리포만으로 반영).
 * 백엔드 데모 엔드포인트가 없으므로 apiEndpoint는 두지 않는다 → "Run demo"는
 * samples[0].mockOutput을 그대로 보여준다(클라이언트에서 동작, 백엔드 불필요).
 * 키 = GitHub 레포 이름(정확히). getLocalDemoManifest가 패키지보다 먼저 이 맵을 확인한다.
 */

const documentAdapter: DemoManifest = {
    projectName: "document-adapter",
    title: "Document Adapter Demo",
    description:
        "자연어 지시로 DOCX·PPTX·HWPX 문서를 직접 편집합니다. LLM이 문서를 열고 고쳐 다시 씁니다.",
    icon: "📝",
    inputs: [
        {
            key: "format",
            type: "select",
            label: "문서 형식",
            options: [
                { value: "docx", label: "Word (.docx)" },
                { value: "pptx", label: "PowerPoint (.pptx)" },
                { value: "hwpx", label: "한글 (.hwpx)" },
            ],
            default: "docx",
        },
        {
            key: "instruction",
            type: "textarea",
            label: "편집 지시(자연어)",
            placeholder: "예: 제목을 '2026 사업계획'으로 바꾸고 첫 문단을 굵게",
            required: true,
        },
    ],
    outputs: [
        { key: "edits", type: "json", label: "적용된 편집" },
        { key: "summary", type: "text", label: "결과 요약" },
    ],
    samples: [
        {
            label: "제목·서식 편집",
            description: "제목 교체 + 첫 문단 강조",
            inputs: {
                format: "docx",
                instruction: "제목을 '2026 사업계획'으로 바꾸고 첫 문단을 굵게",
            },
            mockOutput: {
                edits: [
                    { op: "replace_text", target: "heading[0]", from: "사업 계획서 초안", to: "2026 사업계획" },
                    { op: "set_style", target: "paragraph[0]", style: { bold: true } },
                ],
                summary: "2건의 편집을 적용했습니다 — 제목 1건, 서식 1건. 원본 구조(스타일·목차)는 그대로 유지됩니다.",
            },
        },
    ],
};

const omnifuse: DemoManifest = {
    projectName: "xgen-omnifuse",
    title: "OmniFuse Demo",
    description:
        "벡터 검색과 그래프 검색을 한 번에 융합하는 backend-agnostic GraphRAG. 하나의 질의로 두 신호를 합칩니다.",
    icon: "🔗",
    inputs: [
        {
            key: "query",
            type: "text",
            label: "질문",
            placeholder: "예: 환불 정책과 배송 지연은 어떻게 연결되나요?",
            required: true,
        },
        {
            key: "top_k",
            type: "number",
            label: "top_k",
            default: 5,
            min: 1,
            max: 20,
        },
    ],
    outputs: [
        { key: "results", type: "search-results", label: "융합 결과" },
        { key: "scores", type: "json", label: "스코어 상세" },
    ],
    samples: [
        {
            label: "융합 검색 예시",
            description: "벡터 + 그래프 신호를 합친 랭킹",
            inputs: { query: "환불 정책과 배송 지연은 어떻게 연결되나요?", top_k: 5 },
            mockOutput: {
                results: [
                    { title: "환불 정책 — 배송 지연 시 전액 환불", body: "배송이 7일 이상 지연되면 요청 시 전액 환불. graph: 정책→배송→환불 경로로 연결됨.", href: "kb://policy/refund#delay" },
                    { title: "배송 지연 보상 규정", body: "지연 3일마다 적립금 지급. vector 유사도 0.82.", href: "kb://policy/shipping#delay" },
                    { title: "고객 문의 유형 — 지연/환불", body: "지연 문의의 41%가 환불로 이어짐. graph 이웃 노드.", href: "kb://analytics/tickets" },
                ],
                scores: {
                    fusion: "reciprocal-rank",
                    top: [
                        { id: "policy/refund#delay", vector: 0.79, graph: 0.91, fused: 0.88 },
                        { id: "policy/shipping#delay", vector: 0.82, graph: 0.55, fused: 0.71 },
                        { id: "analytics/tickets", vector: 0.61, graph: 0.68, fused: 0.64 },
                    ],
                },
            },
        },
    ],
};

const xgenHarness: DemoManifest = {
    projectName: "xgen-harness-executor",
    title: "XGEN Harness Demo",
    description:
        "모델 바깥에서 검증·재시도·종료를 소유하는 10-stage 실행 하네스. 설정(config)으로 파이프라인을 제어합니다.",
    icon: "⚙️",
    inputs: [
        {
            key: "prompt",
            type: "textarea",
            label: "작업 프롬프트",
            placeholder: "예: 이 표에서 분기별 매출 합계를 계산해줘",
            required: true,
        },
        {
            key: "max_retries",
            type: "number",
            label: "최대 재시도",
            default: 2,
            min: 0,
            max: 5,
        },
    ],
    outputs: [
        { key: "stages", type: "json", label: "스테이지 실행 로그" },
        { key: "result", type: "text", label: "최종 결과" },
    ],
    samples: [
        {
            label: "검증·재시도 흐름",
            description: "판정 게이트를 통과할 때까지 실행",
            inputs: { prompt: "이 표에서 분기별 매출 합계를 계산해줘", max_retries: 2 },
            mockOutput: {
                stages: [
                    { stage: "tools", status: "ok", note: "calculator 도구 공개" },
                    { stage: "generate", status: "ok", attempt: 1 },
                    { stage: "judge", status: "retry", score: 0.6, note: "합계 1건 누락" },
                    { stage: "generate", status: "ok", attempt: 2 },
                    { stage: "judge", status: "pass", score: 0.95 },
                    { stage: "terminate", status: "done", reason: "judge_passed" },
                ],
                result: "Q1 12.4M · Q2 15.1M · Q3 14.8M · Q4 18.2M — 합계 60.5M (2차 시도에서 판정 통과).",
            },
        },
    ],
};

const playleft: DemoManifest = {
    projectName: "playwLeft",
    title: "playwLeft Demo",
    description:
        "에이전트를 위한 고성능 브라우저 자동화 라이브러리. 실제 브라우저 세션을 스크립트로 제어합니다.",
    icon: "🖱️",
    inputs: [
        {
            key: "url",
            type: "text",
            label: "대상 URL",
            placeholder: "https://example.com",
            required: true,
        },
        {
            key: "script",
            type: "textarea",
            label: "액션 스크립트",
            placeholder: "예: 검색창에 'XGEN' 입력 → 첫 결과 제목 추출",
            required: true,
        },
    ],
    outputs: [
        { key: "steps", type: "json", label: "실행 로그" },
        { key: "extracted", type: "text", label: "추출 결과" },
    ],
    samples: [
        {
            label: "검색 후 추출",
            description: "페이지 이동 → 입력 → 텍스트 추출",
            inputs: {
                url: "https://example.com",
                script: "검색창에 'XGEN' 입력 → 첫 결과 제목 추출",
            },
            mockOutput: {
                steps: [
                    { action: "goto", url: "https://example.com", ms: 214 },
                    { action: "fill", selector: "input[name=q]", value: "XGEN", ms: 33 },
                    { action: "press", key: "Enter", ms: 12 },
                    { action: "waitFor", selector: ".result", ms: 187 },
                    { action: "textContent", selector: ".result h3", ms: 8 },
                ],
                extracted: "XGEN Agentic AI Platform — 엔터프라이즈 AI 플랫폼",
            },
        },
    ],
};

/** 레포 이름 → 로컬 매니페스트. 패키지 레지스트리에 없는 신규 라이브러리만. */
/**
 * xgen-sdk — ABAC 권한 판정.
 * SDK 모듈 중 DB·네트워크 없이 결과가 결정적으로 나오는 부분이라 데모로 적합하다.
 * 와일드카드(`admin.*:*`, `workflow:*`)와 superuser 우회를 그대로 보여준다.
 */
const xgenSdk: DemoManifest = {
    projectName: "xgen-sdk",
    title: "XGen SDK Demo",
    description:
        "백엔드 공통 빌딩블록을 한 패키지로 모은 파이썬 툴킷. 그중 ABAC 권한 판정을 실행해 봅니다.",
    icon: "🧰",
    inputs: [
        {
            key: "granted",
            type: "textarea",
            label: "보유 권한 (줄바꿈 구분)",
            placeholder: "예: admin.role:*\nworkflow:read",
            required: true,
        },
        {
            key: "required",
            type: "text",
            label: "엔드포인트가 요구하는 권한",
            placeholder: "예: admin.role:read",
            required: true,
        },
        {
            key: "superuser",
            type: "toggle",
            label: "superuser",
            default: false,
        },
    ],
    outputs: [
        { key: "decision", type: "text", label: "판정" },
        { key: "trace", type: "json", label: "평가 근거" },
    ],
    samples: [
        {
            label: "와일드카드 허용",
            description: "admin.role:* 가 admin.role:read 를 덮는다",
            inputs: {
                granted: "admin.role:*\nworkflow:read",
                required: "admin.role:read",
                superuser: false,
            },
            mockOutput: {
                decision: "allow — admin.role:* 가 요구 권한을 덮습니다",
                trace: {
                    required: "admin.role:read",
                    superuser: false,
                    checked: [
                        { rule: "admin.role:*", match: true, reason: "action wildcard" },
                        { rule: "workflow:read", match: false, reason: "resource mismatch" },
                    ],
                    decision: "allow",
                },
            },
        },
        {
            label: "권한 없음",
            description: "리소스가 달라 어떤 규칙도 맞지 않는다",
            inputs: {
                granted: "workflow:read\nworkflow:write",
                required: "admin.role:read",
                superuser: false,
            },
            mockOutput: {
                decision: "deny — 요구 권한을 덮는 규칙이 없습니다",
                trace: {
                    required: "admin.role:read",
                    superuser: false,
                    checked: [
                        { rule: "workflow:read", match: false, reason: "resource mismatch" },
                        { rule: "workflow:write", match: false, reason: "resource mismatch" },
                    ],
                    decision: "deny",
                },
            },
        },
        {
            label: "superuser 우회",
            description: "보유 권한과 무관하게 통과한다",
            inputs: {
                granted: "workflow:read",
                required: "admin.role:read",
                superuser: true,
            },
            mockOutput: {
                decision: "allow — superuser 는 권한 검사를 우회합니다",
                trace: {
                    required: "admin.role:read",
                    superuser: true,
                    checked: [],
                    decision: "allow",
                },
            },
        },
    ],
};

const agentMemory: DemoManifest = {
    projectName: "xgen-agent-memory",
    title: "XGen Agent Memory Demo",
    description:
        "의미 검색·BM25·타입드 엣지 그래프 탐색을 한 번에 합치는 메모리 엔진. 세 신호가 각각 얼마나 기여했는지 보여줍니다.",
    icon: "🧠",
    inputs: [
        {
            key: "query",
            type: "text",
            label: "질문",
            placeholder: "예: 환불 정책이 언제 왜 바뀌었나",
            required: true,
        },
        { key: "top_k", type: "number", label: "top_k", default: 3, min: 1, max: 20 },
        {
            key: "graph_hops",
            type: "select",
            label: "그래프 탐색 깊이",
            options: [
                { value: "0", label: "사용 안 함" },
                { value: "1", label: "1홉" },
                { value: "2", label: "2홉" },
            ],
            default: "1",
        },
    ],
    outputs: [
        { key: "results", type: "search-results", label: "검색 결과" },
        { key: "signals", type: "json", label: "신호별 스코어" },
    ],
    samples: [
        {
            label: "세 신호 합산",
            description: "의미·키워드·그래프가 모두 기여하는 일반 질의",
            inputs: { query: "환불 정책이 언제 왜 바뀌었나", top_k: 3, graph_hops: "1" },
            mockOutput: {
                results: [
                    { title: "환불 정책 개정 (2026-03)", body: "배송 지연 기준을 7일에서 5일로 단축. 개정 사유는 CS 인입 급증.", href: "mem://policy/refund@2026-03" },
                    { title: "CS 티켓 급증 리포트", body: "지연 문의가 전분기 대비 2.4배. 정책 개정 논의의 출발점.", href: "mem://report/cs-spike" },
                    { title: "환불 정책 (구버전)", body: "배송 7일 초과 시 전액 환불. 개정 전 원문.", href: "mem://policy/refund@2025-11" },
                ],
                signals: {
                    ranker: "online-learned (feedback 412건 반영)",
                    weights: { semantic: 0.41, bm25: 0.24, graph: 0.35 },
                    top: [
                        { id: "policy/refund@2026-03", semantic: 0.81, bm25: 0.66, graph: 0.9, fused: 0.83 },
                        { id: "report/cs-spike", semantic: 0.52, bm25: 0.31, graph: 0.88, fused: 0.61 },
                        { id: "policy/refund@2025-11", semantic: 0.77, bm25: 0.71, graph: 0.4, fused: 0.58 },
                    ],
                },
            },
        },
        {
            label: "키워드가 이기는 질의",
            description: "고유명사·식별자는 BM25가 의미 검색을 앞선다",
            inputs: { query: "ERR_QUOTA_4021", top_k: 3, graph_hops: "0" },
            mockOutput: {
                results: [
                    { title: "ERR_QUOTA_4021 — 조직 단위 쿼터 초과", body: "quota.py 에서 조직 합산 사용량이 한도를 넘을 때 발생. 재시도 대상 아님.", href: "mem://runbook/err-quota-4021" },
                    { title: "쿼터 정책 설계 노트", body: "조직·프로젝트 2단 쿼터를 둔 이유와 한도 산정 근거.", href: "mem://design/quota" },
                ],
                signals: {
                    ranker: "online-learned (feedback 412건 반영)",
                    weights: { semantic: 0.41, bm25: 0.24, graph: 0.35 },
                    note: "graph_hops=0 이라 그래프 신호는 계산하지 않았습니다",
                    top: [
                        { id: "runbook/err-quota-4021", semantic: 0.34, bm25: 0.97, graph: null, fused: 0.79 },
                        { id: "design/quota", semantic: 0.48, bm25: 0.52, graph: null, fused: 0.5 },
                    ],
                },
            },
        },
        {
            label: "그래프 2홉으로 도달",
            description: "의미 유사도가 낮아 검색으로는 안 잡히는 문서를 엣지로 찾아낸다",
            inputs: { query: "지난 분기 CS 급증의 후속 조치", top_k: 3, graph_hops: "2" },
            mockOutput: {
                results: [
                    { title: "CS 티켓 급증 리포트", body: "지연 문의가 전분기 대비 2.4배.", href: "mem://report/cs-spike" },
                    { title: "환불 정책 개정 (2026-03)", body: "리포트 → 논의 → 개정으로 이어진 2홉 경로 끝에 있는 문서.", href: "mem://policy/refund@2026-03" },
                    { title: "배송사 SLA 재협상 기록", body: "같은 원인에서 갈라져 나온 다른 조치. 의미 유사도 0.29 로 검색만으로는 누락됨.", href: "mem://ops/sla-renegotiation" },
                ],
                signals: {
                    ranker: "online-learned (feedback 412건 반영)",
                    weights: { semantic: 0.41, bm25: 0.24, graph: 0.35 },
                    traversed: [
                        { from: "report/cs-spike", edge: "caused", to: "discussion/refund-policy", hop: 1 },
                        { from: "discussion/refund-policy", edge: "resulted_in", to: "policy/refund@2026-03", hop: 2 },
                        { from: "report/cs-spike", edge: "resulted_in", to: "ops/sla-renegotiation", hop: 1 },
                    ],
                    top: [
                        { id: "report/cs-spike", semantic: 0.74, bm25: 0.58, graph: 0.71, fused: 0.7 },
                        { id: "policy/refund@2026-03", semantic: 0.44, bm25: 0.3, graph: 0.93, fused: 0.62 },
                        { id: "ops/sla-renegotiation", semantic: 0.29, bm25: 0.22, graph: 0.86, fused: 0.51 },
                    ],
                },
            },
        },
    ],
};

const agentRuntime: DemoManifest = {
    projectName: "xgen-agent-runtime",
    title: "XGen Agent Runtime Demo",
    description:
        "21개 스테이지가 각각 전략 슬롯을 갖는 매니페스트 기반 파이프라인. 어느 스테이지에 어떤 전략이 끼워졌는지 그대로 드러납니다.",
    icon: "⚡",
    inputs: [
        {
            key: "task",
            type: "textarea",
            label: "작업 지시",
            placeholder: "예: 첨부한 계약서에서 위약금 조항을 찾아 요약해줘",
            required: true,
        },
        {
            key: "provider",
            type: "select",
            label: "LLM 제공자",
            options: [
                { value: "anthropic", label: "Anthropic" },
                { value: "openai", label: "OpenAI" },
                { value: "google", label: "Google" },
                { value: "bedrock", label: "AWS Bedrock" },
                { value: "vllm", label: "vLLM (자체 호스팅)" },
            ],
            default: "anthropic",
        },
        {
            key: "strategy",
            type: "select",
            label: "계획 전략",
            options: [
                { value: "react", label: "ReAct" },
                { value: "plan-execute", label: "Plan-and-Execute" },
                { value: "reflexion", label: "Reflexion" },
            ],
            default: "react",
        },
    ],
    outputs: [
        { key: "stages", type: "json", label: "스테이지 실행 로그" },
        { key: "result", type: "text", label: "최종 결과" },
    ],
    samples: [
        {
            label: "기본 파이프라인 (ReAct)",
            description: "21개 스테이지 중 실제로 발화한 것만 로그에 남는다",
            inputs: {
                task: "첨부한 계약서에서 위약금 조항을 찾아 요약해줘",
                provider: "anthropic",
                strategy: "react",
            },
            mockOutput: {
                stages: {
                    manifest: "contract-review@1.2",
                    provider: "anthropic",
                    executed: [
                        { no: 3, stage: "input.normalize", strategy: "passthrough", ms: 4 },
                        { no: 6, stage: "context.retrieve", strategy: "hybrid-search", ms: 212, note: "청크 8건 회수" },
                        { no: 9, stage: "plan", strategy: "react", ms: 640 },
                        { no: 12, stage: "act", strategy: "tool-call", ms: 118, note: "doc.extract_section" },
                        { no: 15, stage: "verify", strategy: "schema-check", ms: 22, note: "통과" },
                        { no: 19, stage: "output.render", strategy: "markdown", ms: 8 },
                    ],
                    skipped: 15,
                    total_ms: 1004,
                },
                result: "위약금 조항은 제12조에 있습니다. 계약 해지 시 잔여 계약금액의 30%를 위약금으로 지급하되, 상대방 귀책 사유로 인한 해지에는 적용되지 않습니다.",
            },
        },
        {
            label: "MCP 도구 호출",
            description: "외부 도구를 MCP 로 붙여 같은 파이프라인에서 실행",
            inputs: {
                task: "사내 위키에서 배포 절차 문서를 찾아 요약해줘",
                provider: "openai",
                strategy: "react",
            },
            mockOutput: {
                stages: {
                    manifest: "wiki-qa@1.0",
                    provider: "openai",
                    mcp_servers: ["confluence", "filesystem"],
                    executed: [
                        { no: 6, stage: "context.retrieve", strategy: "mcp-tool", ms: 486, note: "confluence.search(space=ECNew)" },
                        { no: 9, stage: "plan", strategy: "react", ms: 512 },
                        { no: 12, stage: "act", strategy: "mcp-tool", ms: 301, note: "confluence.get_page(id=88213)" },
                        { no: 15, stage: "verify", strategy: "citation-check", ms: 44, note: "출처 3건 확인" },
                        { no: 19, stage: "output.render", strategy: "markdown", ms: 7 },
                    ],
                    skipped: 16,
                    total_ms: 1350,
                },
                result: "배포는 스테이징 검증 → 릴리즈 노트 작성 → 승인 → 운영 반영 순서입니다. 승인자는 품질책임자이며, 롤백 기준은 오류율 1% 초과입니다.",
            },
        },
        {
            label: "전략 교체 (Reflexion)",
            description: "스테이지는 그대로 두고 전략 슬롯만 바꾼다 — 검증 실패 시 자기 교정이 붙는다",
            inputs: {
                task: "이 표에서 분기별 매출 합계를 계산해줘",
                provider: "anthropic",
                strategy: "reflexion",
            },
            mockOutput: {
                stages: {
                    manifest: "table-analysis@2.0",
                    provider: "anthropic",
                    executed: [
                        { no: 9, stage: "plan", strategy: "reflexion", ms: 588 },
                        { no: 12, stage: "act", strategy: "code-exec", ms: 96 },
                        { no: 15, stage: "verify", strategy: "numeric-check", ms: 18, note: "실패 — 합계가 열 합과 불일치" },
                        { no: 16, stage: "reflect", strategy: "self-critique", ms: 402, note: "3분기 결측치를 0으로 처리한 것이 원인" },
                        { no: 12, stage: "act", strategy: "code-exec", ms: 91, note: "재실행" },
                        { no: 15, stage: "verify", strategy: "numeric-check", ms: 17, note: "통과" },
                        { no: 19, stage: "output.render", strategy: "table", ms: 9 },
                    ],
                    retries: 1,
                    total_ms: 1221,
                },
                result: "1분기 12.4억, 2분기 14.1억, 3분기 결측(집계 제외), 4분기 16.8억 — 확인 가능한 3개 분기 합계는 43.3억입니다.",
            },
        },
    ],
};

const anWeb: DemoManifest = {
    projectName: "xgen-an-web",
    title: "AN-Web Demo",
    description:
        "웹을 픽셀로 그리지 않고 '행동 가능한 상태 기계'로 실행합니다. 페이지가 에이전트용 시맨틱 그래프로 바뀝니다.",
    icon: "🌐",
    inputs: [
        {
            key: "url",
            type: "text",
            label: "대상 URL",
            placeholder: "예: https://shop.example.com/search",
            required: true,
        },
        {
            key: "goal",
            type: "textarea",
            label: "목표",
            placeholder: "예: 재고 있는 상품 중 가장 싼 것을 장바구니에 담기",
            required: true,
        },
    ],
    outputs: [
        { key: "state", type: "json", label: "시맨틱 상태" },
        { key: "plan", type: "json", label: "행동 계획" },
    ],
    samples: [
        {
            label: "검색 → 담기",
            description: "상품 목록을 상태로 읽고 조건에 맞는 행동을 고른다",
            inputs: {
                url: "https://shop.example.com/search?q=keyboard",
                goal: "재고 있는 상품 중 가장 싼 것을 장바구니에 담기",
            },
            mockOutput: {
                state: {
                    url: "https://shop.example.com/search?q=keyboard",
                    nodes: 34,
                    actionable: [
                        { id: "a7", role: "listitem", name: "무선 키보드 K380", price: 49000, in_stock: true, actions: ["add_to_cart", "open"] },
                        { id: "a8", role: "listitem", name: "기계식 키보드 MX", price: 129000, in_stock: true, actions: ["add_to_cart", "open"] },
                        { id: "a9", role: "listitem", name: "저소음 키보드 QT", price: 39000, in_stock: false, actions: ["open", "notify_restock"] },
                    ],
                    dom_bytes_skipped: "1.8 MB (렌더링 생략)",
                },
                plan: [
                    { step: 1, reason: "in_stock=false 인 a9 는 후보에서 제외", action: "filter" },
                    { step: 2, reason: "남은 후보 중 최저가는 a7 (49,000원)", action: "select", target: "a7" },
                    { step: 3, action: "add_to_cart", target: "a7", result: "cart.count 0 → 1" },
                ],
            },
        },
        {
            label: "로그인 폼",
            description: "입력 가능한 필드와 제출 조건을 상태로 노출한다",
            inputs: {
                url: "https://app.example.com/login",
                goal: "저장된 자격증명으로 로그인하기",
            },
            mockOutput: {
                state: {
                    url: "https://app.example.com/login",
                    nodes: 11,
                    actionable: [
                        { id: "f1", role: "textbox", name: "이메일", required: true, filled: false },
                        { id: "f2", role: "textbox", name: "비밀번호", required: true, secret: true, filled: false },
                        { id: "b1", role: "button", name: "로그인", enabled: false, enabled_when: "f1 && f2" },
                    ],
                    guard: "b1 은 f1·f2 가 모두 채워지기 전에는 비활성 — 클릭 시도 자체를 하지 않는다",
                },
                plan: [
                    { step: 1, action: "fill", target: "f1", value: "***@example.com" },
                    { step: 2, action: "fill", target: "f2", value: "********" },
                    { step: 3, action: "click", target: "b1", precondition_met: true },
                    { step: 4, action: "await_state", expect: "url=/dashboard" },
                ],
            },
        },
        {
            label: "표 추출",
            description: "화면 스크린샷 대신 구조화된 표를 그대로 얻는다",
            inputs: {
                url: "https://data.example.com/reports/q2",
                goal: "분기 실적 표를 구조화해서 가져오기",
            },
            mockOutput: {
                state: {
                    url: "https://data.example.com/reports/q2",
                    nodes: 62,
                    tables: [
                        {
                            id: "t1",
                            caption: "2026 분기 실적",
                            columns: ["분기", "매출", "영업이익"],
                            rows: [
                                ["1Q", "12.4억", "1.1억"],
                                ["2Q", "14.1억", "1.6억"],
                            ],
                        },
                    ],
                    pagination: { has_next: true, next_action: "click:#page-2" },
                },
                plan: [
                    { step: 1, action: "extract_table", target: "t1" },
                    { step: 2, action: "click", target: "#page-2", reason: "has_next=true" },
                    { step: 3, action: "extract_table", target: "t1", note: "2페이지 분 병합" },
                ],
            },
        },
    ],
};

const edit2docs: DemoManifest = {
    projectName: "xgen-edit2docs",
    title: "Edit2Docs Demo",
    description:
        "한 줄 의도로 진짜 편집 가능한 DOCX·XLSX·PPTX 를 만들고, 이미 있는 문서는 대화로 고칩니다. 이미지가 아니라 실제 문단·셀·차트가 생성됩니다.",
    icon: "📑",
    inputs: [
        {
            key: "mode",
            type: "select",
            label: "동작",
            options: [
                { value: "create", label: "새로 생성" },
                { value: "edit", label: "기존 문서 편집" },
            ],
            default: "create",
        },
        {
            key: "format",
            type: "select",
            label: "문서 형식",
            options: [
                { value: "docx", label: "Word (.docx)" },
                { value: "xlsx", label: "Excel (.xlsx)" },
                { value: "pptx", label: "PowerPoint (.pptx)" },
            ],
            default: "docx",
        },
        {
            key: "intent",
            type: "textarea",
            label: "의도 (한 줄)",
            placeholder: "예: 신규 고객사 대상 PoC 제안서 초안",
            required: true,
        },
    ],
    outputs: [
        { key: "document", type: "json", label: "생성된 문서 구조" },
        { key: "summary", type: "text", label: "결과 요약" },
    ],
    samples: [
        {
            label: "제안서 생성 (DOCX)",
            description: "한 줄 의도에서 문단·표·스타일이 있는 실제 문서로",
            inputs: {
                mode: "create",
                format: "docx",
                intent: "신규 고객사 대상 PoC 제안서 초안",
            },
            mockOutput: {
                document: {
                    file: "poc-proposal.docx",
                    editable: true,
                    outline: [
                        { level: 1, text: "PoC 제안서", style: "Heading 1" },
                        { level: 2, text: "1. 배경과 목표", style: "Heading 2", paragraphs: 2 },
                        { level: 2, text: "2. 검증 범위", style: "Heading 2", table: { columns: ["항목", "범위", "산출물"], rows: 3 } },
                        { level: 2, text: "3. 일정", style: "Heading 2", table: { columns: ["주차", "활동"], rows: 4 } },
                        { level: 2, text: "4. 성공 기준", style: "Heading 2", paragraphs: 1, bullets: 3 },
                    ],
                    styles_applied: ["Heading 1", "Heading 2", "Table Grid", "List Bullet"],
                },
                summary: "문단 9개, 표 2개, 불릿 3개를 담은 DOCX 를 생성했습니다. Word 에서 열면 스타일과 목차가 그대로 살아 있어 이어서 편집할 수 있습니다.",
            },
        },
        {
            label: "집계표 + 차트 생성 (XLSX)",
            description: "수식과 차트가 들어간 시트를 만든다",
            inputs: {
                mode: "create",
                format: "xlsx",
                intent: "분기별 매출을 정리하고 추이 차트 넣기",
            },
            mockOutput: {
                document: {
                    file: "quarterly-revenue.xlsx",
                    editable: true,
                    sheets: [
                        {
                            name: "매출",
                            columns: ["분기", "매출", "전분기 대비"],
                            rows: 4,
                            formulas: [
                                { cell: "C3", formula: "=(B3-B2)/B2", format: "0.0%" },
                                { cell: "B6", formula: "=SUM(B2:B5)" },
                            ],
                            chart: { type: "line", title: "분기 매출 추이", data_range: "A1:B5" },
                        },
                    ],
                },
                summary: "4개 행과 수식 2개, 라인 차트 1개가 있는 XLSX 를 생성했습니다. 셀 값을 바꾸면 수식과 차트가 그대로 다시 계산됩니다.",
            },
        },
        {
            label: "대화로 편집 (PPTX)",
            description: "이미 있는 발표자료를 자연어 지시로 고친다",
            inputs: {
                mode: "edit",
                format: "pptx",
                intent: "3번 슬라이드 제목을 바꾸고 마지막에 Q&A 슬라이드 추가",
            },
            mockOutput: {
                document: {
                    file: "kickoff.pptx",
                    editable: true,
                    edits: [
                        { op: "replace_text", target: "slide[3].title", from: "진행 현황", to: "2분기 진행 현황" },
                        { op: "insert_slide", at: 9, layout: "Title Only", title: "Q&A" },
                    ],
                    slides_before: 8,
                    slides_after: 9,
                },
                summary: "제목 1건을 교체하고 Q&A 슬라이드를 마지막에 추가했습니다. 기존 마스터·테마는 건드리지 않아 디자인이 유지됩니다.",
            },
        },
    ],
};

export const LOCAL_DEMO_MANIFESTS: Record<string, DemoManifest> = {
    "document-adapter": documentAdapter,
    "xgen-omnifuse": omnifuse,
    "xgen-harness-executor": xgenHarness,
    "playwLeft": playleft,
    "xgen-sdk": xgenSdk,
    "xgen-agent-memory": agentMemory,
    "xgen-agent-runtime": agentRuntime,
    "xgen-an-web": anWeb,
    "xgen-edit2docs": edit2docs,
};

/**
 * 사람이 소재를 골라 쓴 매니페스트가 있는가 — 이 저장소의 로컬 맵이나 npm 패키지
 * 레지스트리에 등록된 경우만 true. 카드의 "라이브 데모" 배지 기준이다.
 *
 * 신규 라이브러리는 여기서 false 지만 demoManifestFor 가 폴백을 만들어 주므로
 * 데모 페이지와 버튼은 그대로 생긴다.
 */
export function hasCuratedDemo(repo: string): boolean {
    return repo in LOCAL_DEMO_MANIFESTS || getDemoManifest(repo) != null;
}

/**
 * 어떤 라이브러리든 데모 매니페스트를 돌려준다 — 로컬 → 패키지 → 자동 폴백 순서.
 *
 * 이 함수가 null 을 돌려주지 않기 때문에, TOOLS 에 항목만 추가되면 별도 작업 없이
 * /tool/<id> 데모 페이지와 카드의 데모 버튼이 함께 생긴다.
 */
export function demoManifestFor(tool: Tool, locale: Locale): DemoManifest {
    return (
        LOCAL_DEMO_MANIFESTS[tool.repo] ??
        getDemoManifest(tool.repo) ??
        buildFallbackManifest(tool, locale)
    );
}
