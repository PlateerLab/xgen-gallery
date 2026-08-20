import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/lib/i18n";
import { CATEGORY_CANONICAL } from "@/lib/blog-categories";

/**
 * 파일베이스 블로그 — `content/blog/*.md`의 마크다운 + YAML 프론트매터를 빌드 시점에
 * 읽어 정적 페이지로 굽는다. DB·런타임 의존성 없음. (Decap CMS가 동일 폴더에 커밋)
 * SEO·GEO: 정적 HTML이라 AI 크롤러가 JS 없이 본문을 그대로 읽는다.
 */
/** 블로그 카테고리 — '전체'는 필터용 가상 값(글에는 부여하지 않음). */
export {
    BLOG_CATEGORIES,
    CATEGORY_LABEL,
    categoryLabel,
    type BlogCategory,
} from "@/lib/blog-categories";

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    /**
     * 영문판 제목·요약(선택). 프론트매터에 `titleEn`/`descriptionEn`을 넣으면
     * `/en` 화면이 이 값을 쓴다. 없으면 그 글은 영문 화면에 노출하지 않는다 —
     * 한국어 제목이 영문 페이지에 섞이면 페이지 언어 신호가 흐려진다.
     */
    titleEn?: string;
    descriptionEn?: string;
    /**
     * 검색 결과용 짧은 제목(선택). `<title>`에만 쓰고 화면의 h1은 `title`을 그대로 쓴다.
     * `<title>`은 브랜드 접미사(` · Plateer AI Labs`, 15자)가 붙어 60자에서 잘리는데,
     * 서술적인 영문 기사 헤드라인은 그 한도를 넘기 쉽다. 헤드라인의 정보량은 지키고
     * 검색 결과에서만 결론이 잘리지 않게 하려는 필드다(45자 이하 권장).
     */
    titleSeo?: string;
    date: string; // ISO (YYYY-MM-DD)
    updated?: string;
    author: string;
    authorGithub?: string; // GitHub 로그인 — 있으면 바이라인을 /members/<login>으로 연결(Person JSON-LD)
    editor?: string;
    kicker?: string;
    category: string;
    tags: string[];
    cover?: string;
    /**
     * 목록 카드 전용 썸네일(선택). 없으면 cover 를 그대로 쓴다.
     *
     * cover 는 본문 히어로(768px)와 공유 이미지(1200px)를 함께 맡아 설명 요소가
     * 많은데, 목록 카드는 288px 라 그 요소들이 3~6px 로 뭉갠다. 그래서 목록에서만
     * 쓰는 큰 활자·큰 도형 버전을 따로 둘 수 있게 한다.
     */
    thumb?: string;
    /**
     * 구독 게이트(선택). 켜면 도입부만 열어두고 본론(첫 h2)부터 흐리게 덮은 뒤
     * 구독 카드를 띄운다. 카테고리 전체가 아니라 **글 단위로** 지정한다 —
     * 같은 현장 리포트라도 공개로 두고 싶은 글이 있다.
     *
     * 본문 HTML 은 그대로 내려가므로 검색 노출에는 영향이 없다(가림은 화면에서만).
     */
    gated?: boolean;
    draft?: boolean;
    featured?: boolean; // 키비주얼(히어로) 캐러셀 노출 — Decap에서 편집자가 선정
    /** TL;DR 요약 — 본문 상단 하이라이트 박스. AI 검색이 인용하기 쉬운 3~4문장 핵심. */
    summary?: string;
    /** FAQ — 본문 하단 Q&A + FAQPage 구조화 데이터(SEO/GEO 인용 최적화). */
    faq?: { q: string; a: string }[];
}

export interface Post extends PostMeta {
    html: string;
    readingMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
/**
 * 영문 글은 `content/blog/en/<slug>.md` 에 같은 slug 로 둔다 —
 * `/blog/x` 와 `/en/blog/x` 가 1:1로 맞아 hreflang·canonical 이 단순해진다.
 */
const BLOG_DIR_EN = path.join(BLOG_DIR, "en");

function dirFor(locale: Locale) {
    return locale === "en" ? BLOG_DIR_EN : BLOG_DIR;
}

function isProd() {
    return process.env.NODE_ENV === "production";
}

/**
 * 프론트매터 date를 항상 YYYY-MM-DD로 정규화한다.
 * YAML은 따옴표 없는 `date: 2026-07-15`를 Date 객체로 파싱하는데, 그대로
 * String()하면 "Wed Jul 15 2026 …"가 되어 목록 날짜가 깨진다(Decap 기고 시 흔함).
 * date-only YAML은 UTC 자정이므로 UTC 기준으로 잘라 날짜가 밀리지 않게 한다.
 */
function toISODate(v: unknown): string {
    if (v instanceof Date && !Number.isNaN(v.getTime())) {
        return v.toISOString().slice(0, 10);
    }
    const s = String(v ?? "").trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? s.slice(0, 10) : d.toISOString().slice(0, 10);
}

function readSlugs(locale: Locale = "ko"): string[] {
    const dir = dirFor(locale);
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx?$/, ""));
}

function parse(slug: string, locale: Locale = "ko"): Post | null {
    const dir = dirFor(locale);
    const md = path.join(dir, `${slug}.md`);
    const mdx = path.join(dir, `${slug}.mdx`);
    const file = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null;
    if (!file) return null;

    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const meta: PostMeta = {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        titleEn: data.titleEn ? String(data.titleEn) : undefined,
        titleSeo: data.titleSeo ? String(data.titleSeo) : undefined,
        descriptionEn: data.descriptionEn ? String(data.descriptionEn) : undefined,
        date: toISODate(data.date),
        updated: data.updated ? toISODate(data.updated) : undefined,
        author: String(data.author ?? "Plateer AI Labs"),
        authorGithub: data.authorGithub
            ? String(data.authorGithub).replace(/^@/, "")
            : undefined,
        editor: data.editor ? String(data.editor) : undefined,
        kicker: data.kicker ? String(data.kicker) : undefined,
        category: (() => {
            const raw = String(data.category ?? "Tech Note");
            return CATEGORY_CANONICAL[raw] ?? raw;
        })(),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: data.cover ? String(data.cover) : undefined,
        thumb: data.thumb ? String(data.thumb) : undefined,
        gated: Boolean(data.gated),
        draft: Boolean(data.draft),
        featured: Boolean(data.featured),
        summary: data.summary ? String(data.summary) : undefined,
        faq: Array.isArray(data.faq)
            ? (data.faq as unknown[])
                  .map((e) => {
                      const o = (e ?? {}) as Record<string, unknown>;
                      return { q: String(o.q ?? ""), a: String(o.a ?? "") };
                  })
                  .filter((e) => e.q && e.a)
            : undefined,
    };
    const words = content.trim().split(/\s+/).length;
    return {
        ...meta,
        html: marked.parse(content, { async: false }) as string,
        readingMinutes: Math.max(1, Math.round(words / 350)),
    };
}

/** 발행된 글 목록(초안 제외, 최신순). 운영 빌드에서만 draft를 숨긴다. */
export function getAllPosts(locale: Locale = "ko"): PostMeta[] {
    return readSlugs(locale)
        .map((slug) => parse(slug, locale))
        .filter((p): p is Post => p !== null)
        .filter((p) => !(isProd() && p.draft))
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map(({ html: _html, readingMinutes: _r, ...meta }) => meta);
}

export function getPost(slug: string, locale: Locale = "ko"): Post | null {
    const post = parse(slug, locale);
    if (!post) return null;
    if (isProd() && post.draft) return null;
    return post;
}

export function getAllSlugs(locale: Locale = "ko"): string[] {
    return getAllPosts(locale).map((p) => p.slug);
}

/** 영문판이 존재하는 slug 집합 — hreflang·언어 토글이 이 값을 기준으로 판단한다. */
export function getEnglishSlugs(): Set<string> {
    return new Set(getAllSlugs("en"));
}

/** 모든 태그(중복 제거). */
export function getAllTags(locale: Locale = "ko"): string[] {
    const set = new Set<string>();
    getAllPosts(locale).forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [...set].sort();
}
