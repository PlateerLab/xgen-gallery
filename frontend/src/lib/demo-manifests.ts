import type { DemoManifest } from "@plateerlab/xgen-gallery";

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

export const LOCAL_DEMO_MANIFESTS: Record<string, DemoManifest> = {
    "document-adapter": documentAdapter,
    "xgen-omnifuse": omnifuse,
    "xgen-harness-executor": xgenHarness,
    "playwLeft": playleft,
    "xgen-sdk": xgenSdk,
};
