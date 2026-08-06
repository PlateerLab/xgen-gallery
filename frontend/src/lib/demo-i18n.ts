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
