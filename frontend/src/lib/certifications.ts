/**
 * 국내 소프트웨어 품질인증(GS) 획득 현황. About의 4.2 섹션이 이 파일을 참조한다.
 *
 * 인증번호·등급·인증기관·인증연월일은 인증서 원본의 사실 정보라 표기를 그대로 옮긴다.
 * GS 인증은 공공 조달 자격·입찰 가점과 직결되므로 임의로 요약하지 않는다.
 */
export interface Certification {
    /** 인증서에 적힌 소프트웨어 명칭 */
    name: string;
    nameEn: string;
    /** 인증번호 */
    no: string;
    /** 등급 — 현재 전부 1등급이지만 값으로 둔다(등급이 다른 인증이 생길 수 있다) */
    grade: string;
    gradeEn: string;
    /** 인증기관 */
    agency: string;
    agencyEn: string;
    /** 인증연월일 */
    date: string;
    /** 무엇을 인증받았는지 대외 설명용 요약 */
    desc: string;
    descEn: string;
    /** 인증서 이미지 */
    cert: string;
    /** 인증서에 적힌 비고 */
    note?: string;
    noteEn?: string;
}

/** 인증일 최신순. */
export const CERTIFICATIONS: Certification[] = [
    {
        name: "XGEN v1.0",
        nameEn: "XGEN v1.0",
        no: "26-0296",
        grade: "1등급",
        gradeEn: "Grade 1",
        agency: "한국정보통신기술협회(TTA)",
        agencyEn: "Telecommunications Technology Association (TTA)",
        date: "2026.07.06",
        desc: "Agent·Workflow·Knowledge·Tool을 하나의 플랫폼에서 다루는 Enterprise AI 플랫폼. 기능 적합성과 성능 효율성, 신뢰성, 보안성을 국제표준(ISO/IEC 25000)에 따라 시험받았습니다.",
        descEn:
            "An enterprise AI platform that brings agents, workflows, knowledge, and tools together. Tested for functional suitability, performance efficiency, reliability, and security against ISO/IEC 25000.",
        cert: "/cert/gs-26-0296.webp",
    },
    {
        name: "X2BEE V1.1",
        nameEn: "X2BEE V1.1",
        no: "23-0001",
        grade: "1등급",
        gradeEn: "Grade 1",
        agency: "한국산업기술시험원(KTL)",
        agencyEn: "Korea Testing Laboratory (KTL)",
        date: "2023.01.20",
        desc: "상품 등록과 주문, 결제, 정산, 고객서비스까지 온라인 쇼핑몰 운영 업무를 하나의 플랫폼에서 처리하는 전자상거래 운영관리 지원 소프트웨어입니다.",
        descEn:
            "Commerce operations software that handles product registration, orders, payment, settlement, and customer service on a single platform.",
        cert: "/cert/gs-23-0001.webp",
        note: "인증품목명: 전자상거래 운영관리 지원소프트웨어",
        noteEn: "Certified category: commerce operations support software",
    },
    {
        name: "전자상거래 고객 행동 실시간 분석을 통한 BI 알람 v1.0",
        nameEn: "Real-time BI Alarm for EC customer behavior data analysis v1.0",
        no: "16-0487",
        grade: "1등급",
        gradeEn: "Grade 1",
        agency: "한국정보통신기술협회(TTA)",
        agencyEn: "Telecommunications Technology Association (TTA)",
        date: "2016.12.26",
        desc: "온라인 쇼핑몰 이용 고객의 행동 데이터를 실시간 분석해 구매 가능성과 이탈 징후, 탐색 패턴 등 고객 유형을 자동 분류하고 알림을 제공하는 BI 기반 고객 행동 분석 솔루션입니다.",
        descEn:
            "A BI-based behavior analytics solution that classifies shoppers in real time by purchase likelihood, churn signals, and browsing patterns, then raises alerts.",
        cert: "/cert/gs-16-0487.webp",
        note: "회사명 변경으로 인한 재발행 (변경 전: 이십일스토어아이앤씨)",
        noteEn: "Reissued following a company name change (previously 21Store I&C)",
    },
];
