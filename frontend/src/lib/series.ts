import type { PostMeta } from "@/lib/blog";

/**
 * 아티클 시리즈 정의 — slug 패턴으로 글을 묶는다(프론트매터 불필요, 후속편 자동 편입).
 * /blog 의 "아티클 시리즈" 섹션과 /blog/series/[key] 상세페이지가 공유한다.
 */
export interface SeriesDef {
    key: string;
    title: string;
    label: string; // 짧은 말머리(예: "하네스") — 목록/인기글 태그에 쓰임
    subtitle: string; // 카드 한 줄 설명
    description: string; // 상세페이지 소개
    cover: string;
    match: RegExp;
    order: RegExp;
}

export const SERIES: SeriesDef[] = [
    {
        key: "gs-cert",
        title: "GS인증 개발기",
        label: "GS인증",
        subtitle: "결함리포트 80건을 읽고 코드·오류·매뉴얼을 다시 만든 3주의 기록",
        description:
            "GS인증 시험에서 받은 결함 80건을 어떻게 읽고 무엇을 고쳤는지 편별로 다룹니다. 결함의 정의를 다시 배운 이야기부터, 비밀번호 해시를 argon2id로 바꾼 과정, 정직한 오류 처리, 설정의 가시화, 그리고 매뉴얼을 제품으로 다룬 위키 전환까지.",
        cover: "/blog/series-gs-cert.svg",
        match: /^gs-cert-journey-/,
        order: /^gs-cert-journey-(\d+)-/,
    },
    {
        key: "harness",
        title: "하네스 개발기",
        label: "하네스",
        subtitle: "AI 에이전트가 일하는 실행 환경을 밑바닥부터 설계한 기록",
        description:
            "생성 모델 바깥에서 검증·재시도·종료를 소유하는 실행 계층 ‘하네스’를 어떻게 설계했는지 편별로 다룹니다. 검증 루프를 상태로 나눈 이야기부터, 엔진 코어와 제품 통합 계층을 분리한 과정까지.",
        cover: "/blog/series-harness.svg",
        match: /^harness-journey-/,
        order: /^harness-journey-(\d+)-/,
    },
    {
        key: "ontology",
        title: "온톨로지 개발기",
        label: "온톨로지",
        subtitle: "질문에서 출발해 지식그래프를 만들고 품질과 검색까지 다듬은 기록",
        description:
            "역량 질문(CQ)에서 시작해 지식그래프를 만들고, 품질을 측정하고, 검색과 근거 UX까지 다듬은 과정을 편별로 다룹니다. 트리플 수로는 알 수 없던 품질 문제부터, CSV 정제와 모델 한도에 맞춘 적응형 추출까지.",
        cover: "/blog/series-ontology.svg",
        match: /^ontology-journey-/,
        order: /^ontology-journey-(\d+)-/,
    },
];

export function seriesOf(slug: string): SeriesDef | null {
    return SERIES.find((s) => s.match.test(slug)) ?? null;
}

export function seriesOrder(def: SeriesDef, slug: string): number {
    const m = slug.match(def.order);
    return m ? Number(m[1]) : 999;
}

/** 시리즈에 속한 글을 편 순서대로 반환. */
export function seriesPosts(def: SeriesDef, posts: PostMeta[]): PostMeta[] {
    return posts
        .filter((p) => def.match.test(p.slug))
        .sort((a, b) => seriesOrder(def, a.slug) - seriesOrder(def, b.slug));
}

/** 글이 1개 이상 있는 시리즈만 그룹으로. */
export function groupSeries(
    posts: PostMeta[],
): { def: SeriesDef; posts: PostMeta[] }[] {
    return SERIES.map((def) => ({ def, posts: seriesPosts(def, posts) })).filter(
        (g) => g.posts.length > 0,
    );
}
