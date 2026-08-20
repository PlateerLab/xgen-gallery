import type { Locale } from "@/lib/i18n";

/**
 * 블로그 카테고리 값과 표시 라벨.
 *
 * lib/blog.ts 는 `node:fs` 로 마크다운을 읽는 서버 전용 모듈이라 클라이언트
 * 컴포넌트에서 import 할 수 없다. 목록·카드에서 쓰는 라벨 변환만 여기로 떼어
 * 양쪽에서 함께 쓴다.
 */

/**
 * 프론트매터에 쓸 수 있는 카테고리 값 전체.
 *
 * "Industry Note"는 제품 발표도, 구현 기록도, 고객 사례도 아닌 글을 담는다 —
 * 시장이 어떻게 움직이는지, 고객 미팅·도입 현장에서 실제로 나온 질문이 무엇인지,
 * 그 안에서 저희가 무엇을 기준으로 판단하는지 쓰는 글. Tech Note 가 "어떻게
 * 만들었나"라면 이쪽은 "왜 그렇게 보는가"다. 화면에는 "Field Note"로 표기한다
 * (저장 값은 기존 글과 맞춰 그대로 둔다 — CATEGORY_LABEL 참고).
 *
 * 목록 탭에 보이는 것과는 다르다 — 노출 여부는 VISIBLE_BLOG_CATEGORIES 가 정한다.
 */
export const BLOG_CATEGORIES = [
    "Case Study",
    "Tech Note",
    "제품 소식",
    "Industry Note",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * 목록 탭·GNB 드롭다운에 노출하는 카테고리(순서 그대로 쓰인다).
 *
 * Case Study 는 값으로는 살아 있지만 탭에서는 감춘다 — 기존 글은 그대로 남아
 * "전체" 피드와 개별 URL로 접근되고 배지도 정상 표기된다. 다시 노출하려면
 * 이 배열에 "Case Study" 를 넣기만 하면 된다.
 */
export const VISIBLE_BLOG_CATEGORIES = [
    "제품 소식",
    "Tech Note",
    "Industry Note",
] as const;

/**
 * 영문 글의 category 표기를 한국어 정규값으로 되돌린다.
 * 필터·테마·탭 로직이 전부 한국어 키를 쓰고 있어, 저장 값을 하나로 모아두면
 * 화면 로직을 건드리지 않고 두 언어를 같이 다룰 수 있다.
 */
export const CATEGORY_CANONICAL: Record<string, string> = {
    "Product news": "제품 소식",
};

/**
 * 카테고리의 화면 표기 — 정규값(한국어)을 로케일에 맞는 라벨로 바꾼다.
 *
 * 저장 값과 표기가 다를 수 있다: "제품 소식"은 프론트매터·필터·URL(`?cat=product`)이
 * 함께 쓰는 키라 그대로 두고, 화면에는 "XGEN Preview"(국문 "XGEN 프리뷰")로 보여준다.
 * 표기를 또 바꿀 일이 있으면 이 표만 고치면 된다 — 글 데이터는 손대지 않는다.
 *
 * 국문은 한글 표기를 쓴다 — GNB 메뉴(lib/nav.ts 의 labelKo)와 같은 문구로 맞춰
 * 둔다. 한쪽만 고치면 메뉴에서 "테크 노트"를 눌러 들어간 목록 탭이 "Tech Note"로
 * 보이는 어긋남이 생긴다.
 */
export const CATEGORY_LABEL: Record<Locale, Record<string, string>> = {
    ko: {
        "제품 소식": "XGEN 프리뷰",
        "Tech Note": "테크 노트",
        "Case Study": "케이스 스터디",
        "Industry Note": "필드 노트",
    },
    en: {
        "제품 소식": "XGEN Preview",
        "Tech Note": "Tech Note",
        "Case Study": "Case Study",
        "Industry Note": "Field Note",
    },
};

export function categoryLabel(category: string, locale: Locale): string {
    return CATEGORY_LABEL[locale][category] ?? category;
}

/**
 * 목록에서 감추는 카테고리(저장 값 기준).
 *
 * 글을 지우지 않고 노출만 내린다 — 개별 URL 과 검색 색인은 그대로 살아 있고,
 * 기존 링크도 깨지지 않는다. 목록의 "전체" 피드, 카테고리 탭, 상단 키비주얼
 * 캐러셀에서만 빠진다. 되살리려면 이 배열에서 값을 지우면 된다.
 */
export const HIDDEN_BLOG_CATEGORIES: readonly string[] = ["Case Study"];

/** 목록에 노출할 글만 남긴다(감춘 카테고리 제외). */
export function visibleInList<T extends { category: string }>(posts: T[]): T[] {
    return posts.filter((p) => !HIDDEN_BLOG_CATEGORIES.includes(p.category));
}
