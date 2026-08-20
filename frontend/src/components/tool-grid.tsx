"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/i18n-provider";

/**
 * 라이브러리 카드 그리드 + 카테고리 필터.
 *
 * 칩 목록과 라벨은 lib/tools.ts 의 CATEGORIES 가 단일 출처다(GNB 하위 메뉴도 같은
 * 배열을 쓴다). 카테고리를 늘려도 이 파일은 손대지 않는다.
 *
 * initial 은 GNB 딥링크(/library-gallery?cat=…)에서 온 초기 필터다. 서버(페이지)에서
 * 읽어 넘긴다 — 여기서 useSearchParams() 로 읽으면 정적 렌더가 CSR 로 이탈해 카드가
 * 서버 HTML 에서 통째로 빠진다(블로그 목록과 같은 이유).
 */
export function ToolGrid({ initial = "all" }: { initial?: ToolCategory | "all" }) {
    const { t, locale } = useI18n();
    const [active, setActive] = useState<ToolCategory | "all">(initial);

    const filtered = useMemo(
        () => (active === "all" ? TOOLS : TOOLS.filter((t) => t.category === active)),
        [active],
    );

    const counts = useMemo(() => {
        const map = {} as Record<ToolCategory | "all", number>;
        for (const c of CATEGORIES) {
            map[c.id] =
                c.id === "all"
                    ? TOOLS.length
                    : TOOLS.filter((t) => t.category === c.id).length;
        }
        return map;
    }, []);

    return (
        {/* scroll-mt — GNB 하위 메뉴가 #tools 로 내려보내므로 고정 헤더에 제목이
            가리지 않도록 여유를 준다. */}
        <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28">
            <div className="flex flex-col items-center gap-8 text-center">
                <div>
                    <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                        {t.toolsSection.eyebrow}
                    </p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                        {t.toolsSection.titleA(TOOLS.length)}
                        <br />
                        <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                            {t.toolsSection.titleB}
                        </span>
                    </h2>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActive(c.id)}
                            className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-medium transition",
                                active === c.id
                                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                                    : "border-[var(--color-line)] bg-white text-[var(--color-ink-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]",
                            )}
                        >
                            {locale === "ko" ? c.labelKo : c.label}
                            <span
                                className={cn(
                                    "font-mono text-[12px]",
                                    active === c.id
                                        ? "text-white/70"
                                        : "text-[var(--color-ink-subtle)]",
                                )}
                            >
                                {counts[c.id]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
        </section>
    );
}
