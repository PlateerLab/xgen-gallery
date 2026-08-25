/**
 * 플래티어 보유 특허(등록 완료분). About의 특허 섹션과 JSON-LD의 단일 소스다.
 *
 * 출원번호·등록번호·일자는 특허청 원부의 사실 정보라 표기를 그대로 옮긴다.
 * 임의로 줄이거나 형식을 바꾸지 않는다 — 대외 공시 자료와 대조될 수 있다.
 *
 * theme 는 화면에서 묶어 보여주기 위한 분류이며 원부에 있는 값이 아니다.
 * 8건 중 6건이 추천·검색에 몰려 있어, 나열하면 보이지 않던 축적이 드러난다.
 */
export type PatentTheme = "recommend" | "search" | "marketing" | "media";

export const PATENT_THEME_LABEL: Record<PatentTheme, { ko: string; en: string }> = {
    recommend: { ko: "추천", en: "Recommendation" },
    search: { ko: "검색", en: "Search" },
    marketing: { ko: "마케팅", en: "Marketing" },
    media: { ko: "미디어", en: "Media" },
};

export interface Patent {
    /** 원부 표기 그대로의 발명 명칭 */
    title: string;
    titleEn: string;
    theme: PatentTheme;
    /** 출원번호 / 출원일자 */
    appNo: string;
    appDate: string;
    /** 등록번호 / 등록일자 */
    regNo: string;
    regDate: string;
    /** 특허 내용 요약. 원부의 청구항이 아니라 대외 설명용으로 풀어 쓴 문장이다. */
    desc: string;
    descEn: string;
    /**
     * 특허증 이미지(선택). 원본이 330~450px 대라 카드 썸네일로만 쓴다 —
     * 확대해 읽히는 용도가 아니라 "실물이 있다"를 보여주는 자리다.
     */
    cert?: string;
    /** 권리자 */
    holder: string;
    /** 출원국 */
    country: string;
    countryEn: string;
}

/** 등록일 최신순. 화면에서 뒤집어 쓰지 않는다 — 최근 성과가 먼저 읽혀야 한다. */
export const PATENTS: Patent[] = [
    {
        title: "AI 대화형 상품 추천 장치, 방법 및 기록매체",
        titleEn:
            "Conversational AI product recommendation device, method, and recording medium",
        theme: "recommend",
        appNo: "10-2024-0005015",
        appDate: "2024.01.11",
        regNo: "10-2730311-00-00",
        desc: "대화형 입력 데이터를 기반으로 인풋·아웃풋 교차 학습 모델을 적용하여, 사용자 의도에 부합하는 연관 상품과 추천 근거를 함께 제공하는 대화형 상품 추천 기술",
        descEn: "Applies a cross-trained input/output model to conversational input, returning related products that match user intent together with the reasoning behind each recommendation.",
        cert: "/cert/patent-2730311.webp",
        regDate: "2024.11.11",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "검색어 추천 장치, 방법 및 기록매체",
        titleEn: "Search term recommendation device, method, and recording medium",
        theme: "search",
        appNo: "10-2023-0096500",
        appDate: "2023.07.25",
        regNo: "10-2666635-00-00",
        desc: "검색어 확장 분석으로 사용자 검색 의도에 맞는 연관 상품을 추천하는 기술",
        descEn: "Expands search terms analytically to recommend related products matching the user's search intent.",
        regDate: "2024.05.13",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "검색어 추천 장치, 방법 및 기록매체",
        titleEn: "Search term recommendation device, method, and recording medium",
        theme: "search",
        appNo: "10-2020-0170070",
        appDate: "2020.12.08",
        regNo: "10-2561662-00-00",
        desc: "고객사별 제품명 데이터를 기반으로 기계학습 기반 검색어 확장 분석을 수행하여, 사용자 검색 의도에 최적화된 연관 상품 추천 서비스를 제공하는 기술",
        descEn: "Runs machine-learning-based search-term expansion on each customer's product-name data to recommend related products optimized for search intent.",
        cert: "/cert/patent-2561662.webp",
        regDate: "2023.07.26",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "상품 추천 로직 중에서 최적의 상품 추천 로직을 선택하여 상품을 추천",
        titleEn:
            "Recommending products by selecting the optimal recommendation logic among several",
        theme: "recommend",
        appNo: "10-2022-0111508",
        appDate: "2022.09.02",
        regNo: "10-2529703-00-00",
        desc: "여러 추천 로직 가운데 최적의 로직을 선택해 상품을 추천하는 기술",
        descEn: "Selects the optimal recommendation logic among several to recommend products.",
        regDate: "2023.05.02",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "복수의 상품 추천 로직 중에서 특정 상품 추천로직을 선택하여 상품을 추천",
        titleEn:
            "Recommending products by selecting a specific recommendation logic among multiple logics",
        theme: "recommend",
        appNo: "10-2022-0111494",
        appDate: "2022.09.02",
        regNo: "10-2529698-00-00",
        desc: "복수의 추천 로직 가운데 특정 로직을 선택해 상품을 추천하는 기술",
        descEn: "Selects a specific recommendation logic among multiple logics to recommend products.",
        regDate: "2023.05.02",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "추천 자동 최적화",
        titleEn: "Automatic optimization of recommendations",
        theme: "recommend",
        appNo: "10-2021-0007148",
        appDate: "2021.01.19",
        regNo: "10-2442097-00-00",
        desc: "복수의 상품 추천 로직 중 실시간 성과가 우수한 추천 로직을 자동 선별·적용하여, 사용자 탐색 부담은 최소화하고 추천 효율 및 수익성을 극대화하는 상품 추천 기술",
        descEn: "Automatically selects and applies the best-performing recommendation logic in real time, minimizing browsing effort while maximizing recommendation efficiency and revenue.",
        cert: "/cert/patent-2442097.webp",
        regDate: "2022.09.05",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "실시간 사용자 데이터에 기초한 접객마케팅제공시스템및방법",
        titleEn:
            "System and method for delivering customer-engagement marketing from real-time user data",
        theme: "marketing",
        appNo: "10-2016-0021321",
        appDate: "2016.02.23",
        regNo: "10-1779926-00-00",
        desc: "운영자가 설정한 룰 기반 조건과 인터넷 사용자의 실시간 행동 데이터를 연계·분석하여, 개인화된 맞춤 메시지를 실시간 제공함으로써 마케팅 효과를 극대화하는 실시간 접객 마케팅 기술",
        descEn: "Links operator-defined rules with real-time user behavior to deliver personalized messages on the spot, maximizing marketing impact.",
        cert: "/cert/patent-1779926.webp",
        regDate: "2017.09.13",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
    {
        title: "영상 해상도 변환장치 및 그 방법",
        titleEn: "Image resolution conversion device and method",
        theme: "media",
        appNo: "10-2014-0080895",
        appDate: "2014.06.30",
        regNo: "10-1616892-00-00",
        desc: "저해상도 영상을 고해상도 영상으로 변환하는 과정에서 메모리 사용량을 최소화하여, 처리 효율성과 영상 품질을 동시에 향상시키는 영상 해상도 변환 기술",
        descEn: "Converts low-resolution video to high resolution while minimizing memory use, improving both throughput and image quality.",
        cert: "/cert/patent-1616892.webp",
        regDate: "2016.04.25",
        holder: "플래티어",
        country: "대한민국",
        countryEn: "Republic of Korea",
    },
];

/** 주제별 건수 — 요약 문구에서 "추천 4건" 처럼 쓴다. */
export function patentCountByTheme(): Record<PatentTheme, number> {
    return PATENTS.reduce(
        (acc, p) => {
            acc[p.theme] += 1;
            return acc;
        },
        { recommend: 0, search: 0, marketing: 0, media: 0 } as Record<
            PatentTheme,
            number
        >,
    );
}
