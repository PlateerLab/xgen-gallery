import type { PostMeta } from "@/lib/blog";

/**
 * 아티클 시리즈 정의 — slug 패턴으로 글을 묶는다(프론트매터 불필요, 후속편 자동 편입).
 * /blog 의 "아티클 시리즈" 섹션과 /blog/series/[key] 상세페이지가 공유한다.
 */
export interface SeriesDef {
    key: string;
    title: string;
    subtitle: string; // 카드 한 줄 설명
    description: string; // 상세페이지 소개
    cover: string;
    match: RegExp;
    order: RegExp;
}

export const SERIES: SeriesDef[] = [
    {
        key: "harness",
        title: "하네스 개발기",
        subtitle: "AI 에이전트가 일하는 실행 환경을 밑바닥부터 설계한 기록",
        description:
            "생성 모델 바깥에서 검증·재시도·종료를 소유하는 실행 계층 ‘하네스’를 어떻게 설계했는지 편별로 다룹니다. 검증 루프를 상태로 나눈 이야기부터, 엔진 코어와 제품 통합 계층을 분리한 과정까지.",
        cover: "/blog/series-harness.svg",
        match: /^harness-journey-/,
        order: /^harness-journey-(\d+)-/,
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
