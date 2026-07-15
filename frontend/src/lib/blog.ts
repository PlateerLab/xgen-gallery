import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * 파일베이스 블로그 — `content/blog/*.md`의 마크다운 + YAML 프론트매터를 빌드 시점에
 * 읽어 정적 페이지로 굽는다. DB·런타임 의존성 없음. (Decap CMS가 동일 폴더에 커밋)
 * SEO·GEO: 정적 HTML이라 AI 크롤러가 JS 없이 본문을 그대로 읽는다.
 */
/** 블로그 카테고리 — '전체'는 필터용 가상 값(글에는 부여하지 않음). */
export const BLOG_CATEGORIES = ["Case Study", "Tech Note", "제품 소식"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string; // ISO (YYYY-MM-DD)
    updated?: string;
    author: string;
    authorGithub?: string; // GitHub 로그인 — 있으면 바이라인을 /members/<login>으로 연결(Person JSON-LD)
    editor?: string;
    kicker?: string;
    category: string;
    tags: string[];
    cover?: string;
    draft?: boolean;
    featured?: boolean; // 키비주얼(히어로) 캐러셀 노출 — Decap에서 편집자가 선정
}

export interface Post extends PostMeta {
    html: string;
    readingMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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

function readSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx?$/, ""));
}

function parse(slug: string): Post | null {
    const md = path.join(BLOG_DIR, `${slug}.md`);
    const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
    const file = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null;
    if (!file) return null;

    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const meta: PostMeta = {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: toISODate(data.date),
        updated: data.updated ? toISODate(data.updated) : undefined,
        author: String(data.author ?? "Plateer Labs"),
        authorGithub: data.authorGithub
            ? String(data.authorGithub).replace(/^@/, "")
            : undefined,
        editor: data.editor ? String(data.editor) : undefined,
        kicker: data.kicker ? String(data.kicker) : undefined,
        category: String(data.category ?? "Tech Note"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: data.cover ? String(data.cover) : undefined,
        draft: Boolean(data.draft),
        featured: Boolean(data.featured),
    };
    const words = content.trim().split(/\s+/).length;
    return {
        ...meta,
        html: marked.parse(content, { async: false }) as string,
        readingMinutes: Math.max(1, Math.round(words / 350)),
    };
}

/** 발행된 글 목록(초안 제외, 최신순). 운영 빌드에서만 draft를 숨긴다. */
export function getAllPosts(): PostMeta[] {
    return readSlugs()
        .map(parse)
        .filter((p): p is Post => p !== null)
        .filter((p) => !(isProd() && p.draft))
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map(({ html: _html, readingMinutes: _r, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
    const post = parse(slug);
    if (!post) return null;
    if (isProd() && post.draft) return null;
    return post;
}

export function getAllSlugs(): string[] {
    return getAllPosts().map((p) => p.slug);
}

/** 모든 태그(중복 제거). */
export function getAllTags(): string[] {
    const set = new Set<string>();
    getAllPosts().forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [...set].sort();
}
