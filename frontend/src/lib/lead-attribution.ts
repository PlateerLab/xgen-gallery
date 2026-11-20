/**
 * 문의폼 유입 경로(UTM) — 솔루션마케팅팀 「XGEN 문의폼 UTM 설정 가이드」(2026-11-20) 구현.
 *
 *  1) 모든 페이지 공통 스크립트(components/lead-source-script.tsx)가 광고 링크의
 *     UTM·검색키워드·광고 클릭 ID를 localStorage(plt_lead_src)에 30일 저장한다.
 *  2) 문의폼은 제출 직전 readLeadAttribution()으로 9개 값을 읽어 함께 보낸다
 *     (React 폼이라 숨김 input의 DOM 값 대신 저장값을 직접 읽는다).
 *  3) 제출 성공 시 pushLeadConversion()이 GA4(gtag)에 generate_lead 이벤트를 남긴다.
 *
 * 필드 이름은 가이드의 숨김 항목 name과 같다. 단, 가이드의 `referrer`(외부 이전 사이트)는
 * 기존 상담 폼의 `referrer`(레퍼러 페이지 — 폼 직전에 보던 페이지)와 이름이 겹쳐
 * 전송·시트 키를 `lead_referrer`로 쓴다. 숨김 input name은 가이드대로 `referrer`다.
 */

export const LEAD_SRC_KEY = "plt_lead_src";
export const LEAD_SRC_TTL = 30 * 24 * 60 * 60 * 1000;

/** 가이드의 숨김 항목 name 9개(순서 고정). */
export const LEAD_SRC_FIELDS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "search_keyword",
    "landing_page",
    "referrer",
    "click_id",
] as const;
export type LeadSrcField = (typeof LEAD_SRC_FIELDS)[number];

/** 전송·저장용 키(가이드 name → API/시트 키). referrer만 lead_referrer로 바꾼다. */
export const LEAD_SRC_PAYLOAD_KEY: Record<LeadSrcField, string> = {
    utm_source: "utm_source",
    utm_medium: "utm_medium",
    utm_campaign: "utm_campaign",
    utm_term: "utm_term",
    utm_content: "utm_content",
    search_keyword: "search_keyword",
    landing_page: "landing_page",
    referrer: "lead_referrer",
    click_id: "click_id",
};

export type LeadAttribution = Record<string, string>;

const clip = (v: unknown) => String(v ?? "").slice(0, 500);

/** 브라우저에 저장된 유입 경로(가이드 name 기준). 없거나 만료면 빈 값. */
export function readLeadSource(): Record<LeadSrcField, string> {
    const out = Object.fromEntries(LEAD_SRC_FIELDS.map((k) => [k, ""])) as Record<
        LeadSrcField,
        string
    >;
    if (typeof window === "undefined") return out;
    try {
        const cur = JSON.parse(localStorage.getItem(LEAD_SRC_KEY) || "null");
        if (!cur || !cur.v || Date.now() - Number(cur.t) > LEAD_SRC_TTL) return out;
        for (const k of LEAD_SRC_FIELDS) out[k] = clip(cur.v[k]);
    } catch {
        /* 저장소 접근 불가(사생활 보호 모드 등) — 빈 값 */
    }
    return out;
}

/** 폼 제출 payload에 펼쳐 넣을 값(전송 키 기준). */
export function readLeadAttribution(): LeadAttribution {
    const src = readLeadSource();
    return Object.fromEntries(
        LEAD_SRC_FIELDS.map((k) => [LEAD_SRC_PAYLOAD_KEY[k], src[k]]),
    );
}

/** 서버: 요청 본문에서 유입 경로 9개만 골라 문자열·500자로 정리. */
export function pickLeadAttribution(body: unknown): LeadAttribution {
    const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
    return Object.fromEntries(
        LEAD_SRC_FIELDS.map((k) => {
            const key = LEAD_SRC_PAYLOAD_KEY[k];
            return [key, clip(b[key])];
        }),
    );
}

const LEAD_SRC_LABEL: Record<string, string> = {
    utm_source: "utm_source",
    utm_medium: "utm_medium",
    utm_campaign: "utm_campaign",
    utm_term: "utm_term",
    utm_content: "utm_content",
    search_keyword: "검색키워드",
    landing_page: "첫 방문 페이지",
    lead_referrer: "이전 사이트",
    click_id: "광고클릭ID",
};

/** 메일 본문용 [라벨, 값] 목록. 값이 하나도 없으면 「직접 유입」 한 줄. */
export function leadAttributionRows(d: object): [string, string][] {
    const rec = d as Record<string, unknown>;
    const rows: [string, string][] = [];
    for (const k of LEAD_SRC_FIELDS) {
        const key = LEAD_SRC_PAYLOAD_KEY[k];
        const v = clip(rec[key]).trim();
        if (v) rows.push([LEAD_SRC_LABEL[key], v]);
    }
    return rows.length ? rows : [["유입 경로", "직접 유입(광고·외부 유입 정보 없음)"]];
}

/** 전환 이벤트 form_name — 가이드 표 기준. */
export type LeadFormName = "xgen_contact" | "xgen_trial" | "xgen_brochure";

/** 폼 제출 성공 시 한 번 호출. 개인정보는 넣지 않는다. */
export function pushLeadConversion(formName: LeadFormName) {
    if (typeof window === "undefined") return;
    try {
        const w = window as unknown as {
            dataLayer?: unknown[];
            gtag?: (...args: unknown[]) => void;
        };
        w.dataLayer = w.dataLayer || [];
        // GA4(G-TSE0FC0VCQ) 이벤트로 보낸다. gtag.js 로드 전이면 같은 큐 형식으로 넣어 로드 후 처리되게 한다.
        const gtag =
            w.gtag ||
            function () {
                // eslint-disable-next-line prefer-rest-params
                (w.dataLayer as unknown[]).push(arguments);
            };
        gtag("event", "generate_lead", { form_name: formName });
    } catch {
        /* 전환 이벤트 실패가 접수를 막지 않게 */
    }
}
