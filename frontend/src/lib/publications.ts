/**
 * Plateer Labs 구성원들의 대외 게재·발표물(Publications).
 * Research & Technology › Publications 섹션(/research#publications)과 JSON-LD의 단일 소스.
 *
 * 분류(category):
 *  - "core"    : Enterprise/Agentic AI 코어와 직접 연관(NLP·딥러닝·그래프·추천·분산학습 등)
 *  - "applied" : 머신러닝 응용·데이터사이언스(금융·HR·헬스 등) — "기타"로 노출
 *
 * 서지정보는 사실 메타데이터(제목·저자·게재처·연도)만 담는다.
 */
export type PubType = "국제 논문지" | "국내 논문지" | "국제 학술대회" | "국내 학술대회";
export type PubGrade = "SCIE" | "SCOPUS" | "KCI";

export interface Publication {
    title: string;
    authors: string;
    /** 저자 중 Plateer Labs 구성원(멤버 프로필 로그인). */
    memberLogins: string[];
    venue: string;
    year: number;
    type: PubType;
    grade?: PubGrade;
    award?: string;
    url?: string;
    category: "core" | "applied";
}

/** 멤버 로그인 → 표시 이름(프로필 링크: /members/<login>). */
export const PUB_MEMBERS: Record<string, string> = {
    CocoRoF: "장하렴",
    Master0419: "유지수",
    haesookimDev: "김해수",
    Jinsoo96: "김진수",
};

export const PUBLICATIONS: Publication[] = [
    // ── 음성·감정 인식 (Speech Emotion / Voice Conversion) ───────────────────
    {
        title: "Using Speaker-Specific Emotion Representations in Wav2vec 2.0-Based Modules for Speech Emotion Recognition",
        authors: "Somin Park, Mpabulungi Mark, Bogyung Park, Hyunki Hong",
        memberLogins: [],
        venue: "Comput. Mater. Contin., vol. 77, no. 1, pp. 1009–1030",
        year: 2023,
        type: "국제 논문지",
        grade: "SCIE",
        category: "core",
    },
    {
        title: "RawNet3 화자 표현을 활용한 임의의 화자 간 음성 변환을 위한 StarGAN의 확장",
        authors: "박보경, 박소민, 홍현기",
        memberLogins: [],
        venue: "정보처리학회 논문지 12(7), 303–314",
        year: 2023,
        type: "국내 논문지",
        grade: "KCI",
        category: "core",
    },
    // ── 장하렴 · 유지수 (AI · 데이터 인텔리전스) ─────────────────────────────
    {
        title: "FedKDA: The Decentralized Federated Learning Methods Using Knowledge Distillation and Aggregation in Graph",
        authors: "장하렴, 유지수 외",
        memberLogins: ["CocoRoF", "Master0419"],
        venue: "IEEE, 2024",
        year: 2024,
        type: "국제 학술대회",
        url: "https://ieeexplore.ieee.org/document/10720071",
        category: "core",
    },
    {
        title: "건강추천시스템(HRS) 연구 동향: 인용네트워크 분석과 GraphSAGE를 활용하여",
        authors: "장하렴, 유지수, 양성병",
        memberLogins: ["CocoRoF", "Master0419"],
        venue: "지능정보연구 29(2), 57–84",
        year: 2023,
        type: "국내 논문지",
        grade: "KCI",
        url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11447160",
        category: "core",
    },
    {
        title: "재생에너지 발전량 예측 시스템 기반 집합전력자원 구성 모델 개발",
        authors: "강은경, 장하렴, 양선욱, 양성병",
        memberLogins: ["CocoRoF"],
        venue: "지능정보연구 29(4), 229–256",
        year: 2023,
        type: "국내 논문지",
        grade: "KCI",
        url: "https://koreascience.kr/article/JAKO202302557628860.page",
        category: "core",
    },

    // ── 김해수 (NLP · 딥러닝 · 보안) ──────────────────────────────────────
    {
        title: "A Dynamic Analysis Data Preprocessing Technique for Malicious Code Detection with TF-IDF and Sliding Windows",
        authors: "Mihui Kim, Haesoo Kim",
        memberLogins: ["haesookimDev"],
        venue: "MDPI Electronics 13(5), 963",
        year: 2024,
        type: "국제 논문지",
        grade: "SCIE",
        category: "core",
    },
    {
        title: "Malware Detection and Classification System Based on CNN-BiLSTM",
        authors: "Haesoo Kim, Mihui Kim",
        memberLogins: ["haesookimDev"],
        venue: "MDPI Electronics 13(13), 2539",
        year: 2024,
        type: "국제 논문지",
        grade: "SCIE",
        category: "core",
    },
    {
        title: "Malware Detection System Based on Static-Dynamic Preprocessing Techniques Combined in an Ensemble Model",
        authors: "Haesoo Kim, Mihui Kim",
        memberLogins: ["haesookimDev"],
        venue: "LNEE Vol. 1190",
        year: 2024,
        type: "국제 논문지",
        grade: "SCOPUS",
        url: "https://link.springer.com/chapter/10.1007/978-981-97-2447-5_10",
        category: "core",
    },
    {
        title: "Malware Detection System Based on Static-Dynamic Preprocessing Techniques Combined in an Ensemble Model",
        authors: "Haesoo Kim, Mihui Kim",
        memberLogins: ["haesookimDev"],
        venue: "CSA 2023, Nha Trang, Vietnam",
        year: 2023,
        type: "국제 학술대회",
        category: "core",
    },
    {
        title: "GRU 기반 단축 URL 판별 기법을 적용한 하이브리드 피싱 사이트 탐지 시스템",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "전기전자학회논문지 27(3), 213–219",
        year: 2023,
        type: "국내 논문지",
        grade: "KCI",
        category: "core",
    },
    {
        title: "온라인 커뮤니티에서 사용되는 댓글의 형태를 고려한 악플 탐지를 위한 전처리 기법",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "정보처리학회논문지 KTCCS 12(3), 103–110",
        year: 2023,
        type: "국내 논문지",
        grade: "KCI",
        url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002942057",
        category: "core",
    },
    {
        title: "높은 정확도를 위한 이미지 전처리와 앙상블 기법을 결합한 이미지 기반 악성코드 분류 시스템에 관한 연구",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "정보처리학회논문지 KTCCS 11(7), 225–232",
        year: 2022,
        type: "국내 논문지",
        grade: "KCI",
        category: "core",
    },
    {
        title: "악성코드 탐지를 위한 동적 분석 데이터 전처리 기법",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "ASK 2023 학술발표대회",
        year: 2023,
        type: "국내 학술대회",
        award: "우수 논문상",
        category: "core",
    },
    {
        title: "동적-정적 분석 데이터와 딥러닝을 이용한 난독화된 악성코드 탐지 기법",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "ASK 2023 학술발표대회",
        year: 2023,
        type: "국내 학술대회",
        category: "core",
    },
    {
        title: "악성 댓글에 사용된 문자의 형태를 고려한 한국어 자연어처리를 위한 전처리 기법",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "ASK 2022 학술발표대회, 543–545",
        year: 2022,
        type: "국내 학술대회",
        category: "core",
    },
    {
        title: "이미지 전처리와 앙상블 기법을 이용한 이미지 기반 악성코드 분류 시스템",
        authors: "김해수, 김미희",
        memberLogins: ["haesookimDev"],
        venue: "ACK 2021 학술발표대회, 715–718",
        year: 2021,
        type: "국내 학술대회",
        category: "core",
    },

    // ── 기타 · 머신러닝 응용 · 데이터사이언스 (김진수) ────────────────────────
    {
        title: "웨어러블 기반 라이프로그 데이터를 활용한 수면의 질 예측 및 영향 요인 분석",
        authors: "김영혜, 최준철, 김진수, 양성병",
        memberLogins: ["Jinsoo96"],
        venue: "한국전자거래학회지 30(3), 1–19",
        year: 2025,
        type: "국내 논문지",
        grade: "KCI",
        category: "applied",
    },
    {
        title: "자사주 취득에 대한 기업의 전략적 행동 이해: 클러스터링 방법 적용",
        authors: "배환석, 김진수, 양성병, 김태경",
        memberLogins: ["Jinsoo96"],
        venue: "지능정보연구 30(1), 37–58",
        year: 2024,
        type: "국내 논문지",
        grade: "KCI",
        url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003066121",
        category: "applied",
    },
    {
        title: "머신러닝을 활용한 청년 구직자의 강소기업 선호 예측모형 개발 및 요인별 상대적 중요도 분석",
        authors: "조윤주, 김진수, 배환석, 양성병, 윤상혁",
        memberLogins: ["Jinsoo96"],
        venue: "정보시스템연구 32(4), 229–245",
        year: 2023,
        type: "국내 논문지",
        grade: "KCI",
        category: "applied",
    },
];
