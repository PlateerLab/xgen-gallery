import type { Locale } from "@/lib/i18n";

/**
 * 블로그 카테고리 값과 표시 라벨.
 *
 * lib/blog.ts 는 `node:fs` 로 마크다운을 읽는 서버 전용 모듈이라 클라이언트
 * 컴포넌트에서 import 할 수 없다. 목록·카드에서 쓰는 라벨 변환만 여기로 떼어
 * 양쪽에서 함께 쓴다.
 */
export const BLOG_CATEGORIES = ["Case Study", "Tech Note", "제품 소식"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * 영문 글의 category 표기를 한국어 정규값으로 되돌린다.
 * 필터·테마·탭 로직이 전부 한국어 키를 쓰고 있어, 저장 값을 하나로 모아두면
 * 화면 로직을 건드리지 않고 두 언어를 같이 다룰 수 있다.
 */
export const CATEGORY_CANONICAL: Record<string, string> = {
    "Product news": "제품 소식",
};

/** 카테고리의 화면 표기 — 정규값(한국어)을 로케일에 맞는 라벨로 바꾼다. */
export const CATEGORY_LABEL: Record<Locale, Record<string, string>> = {
    ko: {
        "제품 소식": "제품 소식",
        "Tech Note": "Tech Note",
        "Case Study": "Case Study",
    },
    en: {
        "제품 소식": "Product news",
        "Tech Note": "Tech Note",
        "Case Study": "Case Study",
    },
};

export function categoryLabel(category: string, locale: Locale): string {
    return CATEGORY_LABEL[locale][category] ?? category;
}
