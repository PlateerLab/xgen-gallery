"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

/**
 * 블로그 글 조회수. 동일 출처 Next API(/api/views/{slug})를 호출한다(CORS 없음).
 * - 상세페이지(비 readOnly)는 세션당 1회 POST로 조회수를 +1 집계한다.
 * - readOnly(목록·키비주얼·인기글)는 표시용으로 GET만 한다.
 *
 * 표시 스위치: SHOW_VIEWS 가 false면 숫자를 화면에 노출하지 않는다(집계는 계속 동작).
 * 노출하려면 이 값을 true 로 바꾸면 전 위치에서 조회수가 다시 보인다.
 */
const SHOW_VIEWS = false;

export function ViewCount({
    slug,
    readOnly = false,
    compact = false,
}: {
    slug: string;
    /** 목록 등에서 카운트 증가 없이 읽기만. */
    readOnly?: boolean;
    /** 눈 아이콘 + 숫자만 간결하게. */
    compact?: boolean;
}) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // 표시가 꺼져 있고 읽기 전용이면(집계에 기여 안 함) 아무 요청도 하지 않는다.
        if (readOnly && !SHOW_VIEWS) return;

        const key = `viewed:${slug}`;
        const seen = sessionStorage.getItem(key) === "1";
        const method = readOnly || seen ? "GET" : "POST";
        const url = `/api/views/${encodeURIComponent(slug)}`;
        fetch(url, { method })
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d && typeof d.count === "number") setCount(d.count);
                if (!readOnly && !seen) sessionStorage.setItem(key, "1");
            })
            .catch(() => {});
    }, [slug, readOnly]);

    // 표시 off — 집계(상세페이지 POST)는 위 effect에서 이미 수행됨.
    if (!SHOW_VIEWS) return null;
    if (count === null) return null;

    if (compact) {
        // 선행 구분자를 포함 — 숨김(SHOW_VIEWS=false) 시 구분자도 함께 사라진다.
        return (
            <>
                <span aria-hidden className="text-[var(--color-ink-subtle)]">
                    ·
                </span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                    <Eye className="h-3.5 w-3.5" aria-hidden />
                    {count.toLocaleString()}
                </span>
            </>
        );
    }

    return (
        <>
            <span aria-hidden>·</span>
            <span>Views | {count.toLocaleString()}</span>
        </>
    );
}
