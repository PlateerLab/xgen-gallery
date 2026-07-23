/**
 * 소개서(브로셔) 카탈로그 — 종류 구분자(asset)로 PDF 경로·표시명을 관리한다.
 *
 * 다운로드 폼·API·리드 웹훅(Apps Script) 모두 이 asset 값으로 종류를 구분한다.
 * 새 종류 추가 방법:
 *   1) 여기 한 줄 추가 (asset · 표시명 · PDF 경로)
 *   2) 해당 PDF를 /public/downloads 에 업로드
 *   3) 그 종류의 다운로드 폼이 <BrochureForm asset="..." /> 로 asset을 넘기게 함
 *   4) (선택) docs/lead-webhook.gs 의 BROCHURE_TYPES 에도 같은 종류 추가
 */
export interface Brochure {
    /** 종류 구분자 — 폼·API·시트/메일 공통 키 */
    asset: string;
    /** 사람이 읽는 표시명 (메일 제목·시트 종류 열 등) */
    name: string;
    /** /public 기준 공개 다운로드 경로 */
    file: string;
}

export const BROCHURES = {
    "xgen-brochure": {
        asset: "xgen-brochure",
        name: "XGEN",
        file: "/downloads/xgen-brochure.pdf",
    },
    "code-assistant-brochure": {
        asset: "code-assistant-brochure",
        name: "AI Code Assistant",
        file: "/downloads/code-assistant-brochure.pdf",
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
