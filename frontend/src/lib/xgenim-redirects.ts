/**
 * xgen.im → labs.plateer.com 이전 매핑 (사양서: xgen-im-to-labs-url-mapping.xlsx, 47건).
 *
 * 규칙 7 — 마케팅 파라미터 보존: 원래 주소에 붙은 쿼리(utm_*, gclid, fbclid,
 * n_* 네이버 광고 값 등)는 지우지 않고 labs 주소 뒤에 그대로 붙인다. 이 값이 빠지면
 * 전환 전 xgen.im 으로 걸린 광고·링크에서 들어온 리드의 검색키워드·캠페인이 비게 된다.
 * 아임웹 내부 값(블로그 글을 가리키는 bmode·idx)만 매핑에 쓰고 떼어 낸다.
 * 쿼리는 앵커(#…) 앞에 붙인다(앵커 뒤에 붙으면 서버·분석 도구가 읽지 못한다).
 */
export const XGENIM_HOSTS = ["xgen.im", "www.xgen.im"];

/** 경로(소문자, 끝 슬래시 제거) → labs 경로(+앵커) */
const PATH_MAP: Record<string, string> = {
    "/": "/product/xgen",
    "/main": "/product/xgen",
    "/whyxgen": "/product/xgen#why",
    "/features": "/product/xgen/features",
    "/technologies": "/product/xgen/technology",
    "/polar": "/product/polar",
    "/solution": "/solutions",
    "/public": "/solutions#public",
    "/manufacturing": "/solutions#manufacturing",
    "/knowledge": "/solutions#knowledge",
    "/knowledge_01": "/solutions#knowledge",
    "/knowledge_02": "/solutions#knowledge",
    "/automation": "/solutions#automation",
    "/automation_01": "/solutions#automation",
    "/automation_02": "/solutions#automation",
    "/multi": "/solutions#multi-agent",
    "/blog": "/blog",
    "/17": "/blog",
    "/contact": "/contact",
    "/request": "/contact?type=brochure",
    "/trial": "/xgen-trial",
    "/trial-form": "/xgen-trial",
    "/form_newsletter": "/newsletter#subscribe",
    // 크롤러·AI용 파일 — labs 쪽 같은 파일로 보낸다(제품 페이지로 보내지 않게).
    "/sitemap.xml": "/sitemap.xml",
    "/robots.txt": "/robots.txt",
    "/llms.txt": "/llms.txt",
};

/** 아임웹 블로그 글 idx → labs 글 slug */
const BLOG_IDX: Record<string, string> = {
    "169526367": "xgenim-xinsight-169526367",
    "169575643": "xgenim-tech-169575643",
    "169574284": "xgenim-xinsight-169574284",
    "169574777": "xgenim-xinsight-169574777",
    "169576159": "xgenim-xinsight-169576159",
    "171275908": "xgenim-news-171275908",
    "171621370": "xgenim-news-171621370",
    "171837092": "xgenim-news-171837092",
    "171866120": "xgenim-report-171866120",
    "172334797": "xgenim-news-172334797",
    "172334819": "xgenim-news-172334819",
    "172397613": "xgenim-tech-172397613",
    "172709620": "xgenim-tech-172709620",
    "172709992": "xgenim-tech-172709992",
    "172732629": "xgenim-tech-172732629",
    "172915085": "xgenim-news-172915085",
    "173093697": "xgenim-xinsight-173093697",
    "174290481": "xgenim-xinsight-174290481",
    "174860278": "xgenim-news-174860278",
    "175101493": "xgenim-xinsight-175101493",
    "175319280": "xgenim-xinsight-175319280",
    "175338767": "xgenim-news-175338767",
    "175338781": "xgenim-news-175338781",
    "175589996": "xgenim-xinsight-175589996",
};

/** 아임웹 전용 값 — labs 로 넘기지 않는다. 나머지 쿼리는 모두 보존. */
const IMWEB_KEYS = ["bmode", "idx", "category", "page"];

/**
 * xgen.im 요청 경로·쿼리 → labs 경로(쿼리·앵커 포함). 매핑에 없는 경로는
 * 광고 유입값을 잃지 않도록 XGEN 제품 페이지로 보낸다.
 */
export function xgenimTarget(pathname: string, search: string): string {
    const q = new URLSearchParams(search);
    const p = (pathname.replace(/\/+$/, "") || "/").toLowerCase();

    let dest = PATH_MAP[p] ?? "/product/xgen";
    if (p === "/blog") {
        const idx = q.get("idx");
        if (idx && BLOG_IDX[idx]) dest = `/blog/${BLOG_IDX[idx]}`;
    }

    for (const k of IMWEB_KEYS) q.delete(k);
    const [pathQ, hash] = dest.split("#");
    const [path, destQs] = pathQ.split("?");
    // 매핑에 들어 있는 값(예: /request → type=brochure)을 먼저 두고, 원래 쿼리를 모두 덧붙인다.
    const merged = new URLSearchParams(destQs || "");
    q.forEach((v, k) => {
        if (!(k === "type" && merged.has("type"))) merged.append(k, v);
    });
    const qs = merged.toString();
    return `${path}${qs ? `?${qs}` : ""}${hash ? `#${hash}` : ""}`;
}
