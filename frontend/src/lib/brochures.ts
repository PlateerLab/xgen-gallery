/**
 * 소개서(브로셔) 카탈로그 — 종류 구분자(asset)로 PDF·표시명·카드 메타를 관리한다.
 *
 * 다운로드 폼·API·리드 웹훅(Apps Script) 모두 이 asset 값으로 종류를 구분한다.
 * 자료실(/resources)은 published=true 인 소개서를 카드로 나열한다.
 *
 * 새 종류 추가:
 *   1) 여기 항목 추가(asset·표시명·PDF·카드 메타), 준비되면 published:true
 *   2) 해당 PDF를 /public/downloads 에 업로드
 *   3) (선택) docs/lead-webhook.gs 의 BROCHURE_TYPES 에도 같은 종류 추가
 */
export interface BrochureContent {
    title: string;
    desc: string;
}

export interface Brochure {
    /** 종류 구분자 — 폼·API·시트/메일 공통 키 */
    asset: string;
    /** 사람이 읽는 표시명 (메일 제목·시트 종류 열·카드 제목) */
    name: string;
    /** /public 기준 공개 다운로드 경로 */
    file: string;
    /** 카드 부제 */
    tagline: string;
    /** 카드 요약 설명 */
    summary: string;
    /** 소개서에 담긴 내용 — 신청 전 미리보기(리드 전환용) */
    contents: BrochureContent[];
    /** 자료실 노출 여부(PDF가 준비된 소개서만 true) */
    published: boolean;
}

export const BROCHURES = {
    "xgen-brochure": {
        asset: "xgen-brochure",
        name: "XGEN",
        file: "/downloads/xgen-brochure.pdf",
        tagline: "Enterprise Agentic AI Platform",
        summary:
            "XGEN이 무엇을 하고 어떻게 도입되는지 한눈에 정리한 제품 소개서입니다.",
        contents: [
            {
                title: "플랫폼 개요",
                desc: "학습·생성·배포·모니터링을 아우르는 All-in-one Agentic AI 플랫폼 구성과 도입 방식",
            },
            {
                title: "에이전트 설계 · Agentflow",
                desc: "노드 캔버스에서 코딩 없이 LLM 호출·도구 실행·분기를 조합하고 멀티 에이전트를 구성",
            },
            {
                title: "지식 · RAG",
                desc: "하이브리드 검색·리랭커·온톨로지 그래프·인용 응답으로 출처가 분명한 답변 생성",
            },
            {
                title: "도구 · MCP 연동",
                desc: "MCP 표준과 API 도구로 사내 시스템·DB·산출물을 에이전트에 안전하게 연결",
            },
            {
                title: "보안 · 거버넌스",
                desc: "온프레미스·망분리, RBAC·ABAC, PII 마스킹, 이중 승인·감사 로그, 제로 트레이닝",
            },
            {
                title: "배포 · 운영과 도입 사례",
                desc: "멀티 LLM 오케스트레이션·GitOps 배포·대시보드 모니터링과 산업별 적용 사례",
            },
        ],
        published: true,
    },
    "code-assistant-brochure": {
        asset: "code-assistant-brochure",
        name: "AI Code Assistant",
        file: "/downloads/code-assistant-brochure.pdf",
        tagline: "사내 코드베이스를 이해하는 AI 코드 어시스턴트",
        summary:
            "사내 코드·API·스키마를 학습해 프로젝트 맥락에서 코드 수준으로 답하는 어시스턴트 소개서입니다.",
        contents: [
            {
                title: "제품 개요",
                desc: "사내 코드·API·스키마·산출물을 학습해 프로젝트 맥락에서 답하는 온프레미스 코드 어시스턴트",
            },
            {
                title: "코드 이해 · 검색",
                desc: "AST 기반 코드 이해와 BM25+벡터+리랭크 하이브리드 검색으로 우리 프로젝트에 맞는 답변",
            },
            {
                title: "IDE · 저장소 연동",
                desc: "VS Code 확장과 GitLab 증분 인덱싱으로 실제 개발 환경에 밀착",
            },
            {
                title: "보안 · 온프레미스",
                desc: "폐쇄망 대응과 소스코드 외부 유출 원천 차단, 접근 통제·감사 로그",
            },
            {
                title: "도입 효과",
                desc: "신규 개발자 온보딩 가속과 유지보수 생산성 향상 시나리오",
            },
        ],
        // PDF 준비되면 true 로 변경(코드는 이미 종류 구분 지원).
        published: false,
    },
} satisfies Record<string, Brochure>;

export type BrochureAsset = keyof typeof BROCHURES;

export const DEFAULT_BROCHURE: BrochureAsset = "xgen-brochure";

/** asset 값으로 브로셔를 해석. 미매칭이면 기본(XGEN). */
export function resolveBrochure(asset?: string | null): Brochure {
    return (
        (BROCHURES as Record<string, Brochure>)[asset ?? ""] ??
        BROCHURES[DEFAULT_BROCHURE]
    );
}

/** 자료실에 노출할 소개서(PDF 준비된 것) 목록. */
export function publishedBrochures(): Brochure[] {
    return Object.values(BROCHURES).filter((b) => b.published);
}

/** 전체 소개서(비활성/준비 중 포함) — 자료실 카드 자리 표시용. */
export function allBrochures(): Brochure[] {
    return Object.values(BROCHURES);
}
