/**
 * 연구소 구성원 명단 — /members 화면의 단일 소스.
 *
 * GitHub Org 를 조회하지 않고 이 파일에 직접 적는다. Org 목록은 계정·활동 이력이
 * 함께 딸려 나와 사람보다 정보가 앞선다. 여기서는 이름과 역할, 그리고 그 사람이
 * 쓴 글까지만 보여준다.
 *
 * blogAuthor 는 블로그 프론트매터의 author 값과 정확히 같아야 글이 연결된다.
 * 없으면 글이 없는 사람이며, 카드에는 이름과 역할만 나온다.
 *
 * 사진은 public/members/<slug>.webp 로, 600x800(3:4) 로 통일해 두었다.
 */
export type LabGroup = "leadership" | "architecture" | "research";

export interface LabMember {
    name: string;
    /** 직함 — 원문 표기를 그대로 쓴다 */
    role: string;
    roleEn: string;
    group: LabGroup;
    /** public/members/<slug>.webp */
    slug: string;
    /** 블로그 author 값. 일치하면 그 사람이 쓴 글이 카드에 붙는다. */
    blogAuthor?: string;
}

export const LAB_GROUPS: Record<LabGroup, { ko: string; en: string }> = {
    leadership: { ko: "리더십", en: "Leadership" },
    architecture: { ko: "아키텍처 엔지니어링", en: "Architecture Engineering" },
    research: { ko: "AI R&D", en: "AI R&D" },
};

/** 조직 순서대로. 화면도 이 순서를 따른다. */
export const LAB_MEMBERS: LabMember[] = [
    // 리더십
    {
        name: "남덕현",
        role: "CTO · 연구소장",
        roleEn: "CTO · Head of Labs",
        group: "leadership",
        slug: "namdeokhyeon",
    },
    {
        name: "정우문",
        role: "AI R&D 리더 · 기술이사",
        roleEn: "AI R&D Lead · CTO Office",
        group: "leadership",
        slug: "jeongwoomun",
    },
    {
        name: "최수안",
        role: "제품전략 리더",
        roleEn: "Product Strategy Lead",
        group: "leadership",
        slug: "choisuan",
        // 블로그에는 필명 sooanc 로 쓴다 — 프론트매터의 author 값과 맞춘다.
        blogAuthor: "sooanc",
    },
    {
        name: "손성준",
        role: "제품기술 · 컨설팅 리더",
        roleEn: "Product Technology & Consulting Lead",
        group: "leadership",
        slug: "sonseongjun",
    },
    {
        name: "장하렴",
        role: "제품 개발 리더",
        roleEn: "Product Engineering Lead",
        group: "leadership",
        slug: "janghalyeom",
    },
    {
        name: "최종민",
        role: "아키텍처 엔지니어링 리더",
        roleEn: "Architecture Engineering Lead",
        group: "leadership",
        slug: "choijongmin",
    },

    // 아키텍처 엔지니어링
    {
        name: "박예원",
        role: "아키텍처 엔지니어링",
        roleEn: "Architecture Engineering",
        group: "architecture",
        slug: "parkyewon",
    },
    {
        name: "채희철",
        role: "아키텍처 엔지니어링",
        roleEn: "Architecture Engineering",
        group: "architecture",
        slug: "chaehuicheol",
    },
    {
        name: "전인수",
        role: "아키텍처 엔지니어링",
        roleEn: "Architecture Engineering",
        group: "architecture",
        slug: "jeoninsu",
        blogAuthor: "전인수",
    },

    // AI R&D
    {
        name: "이다운",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "leedaun",
    },
    {
        name: "김해수",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "kimhaesu",
    },
    {
        name: "김동욱",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "kimdongwook",
        blogAuthor: "김동욱",
    },
    {
        name: "김대희",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "kimdaehui",
    },
    {
        name: "김진수",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "kimjinsoo",
        blogAuthor: "김진수",
    },
    {
        name: "유지수",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "yujisu",
        blogAuthor: "유지수",
    },
    {
        name: "박소민",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "parksomin",
    },
    {
        name: "권오영",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "kwonohyoung",
    },
    {
        name: "박태준",
        role: "AI R&D",
        roleEn: "AI R&D",
        group: "research",
        slug: "parktaejun",
    },
];
