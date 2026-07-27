"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

/**
 * Library Recipes / Use Cases 카드.
 * - 기본: 자체 섹션(제목·배경 포함) — 홈·라이브러리 갤러리에서 사용.
 * - embedded: 카드 그리드만 렌더 — GroupPage 섹션(예: /solutions#library-recipes) 안에
 *   주입될 때 중첩 컨테이너·제목 중복을 피한다.
 */
export function UseCases({ embedded = false }: { embedded?: boolean }) {
    const { t } = useI18n();

    const grid = (
        <div className="grid gap-5 md:grid-cols-3">
            {t.usecases.items.map((uc, i) => (
                <div
                    key={uc.title}
                    className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-line-strong)] hover:shadow-[0_18px_44px_-24px_rgba(20,40,80,0.28)]"
                >
                    <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 font-mono text-[13px] font-bold text-[#2461d8]">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                            {uc.title}
                        </h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                        {uc.description}
                    </p>

                    {/* 레시피 = 라이브러리 파이프라인 */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                        {uc.stack.map((s, si) => (
                            <span
                                key={s}
                                className="inline-flex items-center gap-1.5"
                            >
                                {si > 0 && (
                                    <ArrowRight className="h-3 w-3 flex-none text-[var(--color-ink-subtle)]" />
                                )}
                                <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-2.5 py-1 font-mono text-[12.5px] text-[var(--color-ink)]">
                                    {s}
                                </span>
                            </span>
                        ))}
                    </div>

                    <Link
                        href="/library-gallery#tools"
                        className="mt-6 inline-flex items-center gap-1 text-[14px] font-semibold text-[#2461d8] transition group-hover:gap-2"
                    >
                        {t.usecases.seeRecipe}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            ))}
        </div>
    );

    // GroupPage 섹션 안에 주입될 때 — 카드 그리드만.
    if (embedded) return grid;

    return (
        <section
            id="usecases"
            className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
        >
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    {t.usecases.eyebrow}
                </p>
                <h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
                    {t.usecases.titleA}{" "}
                    <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                        {t.usecases.titleB}
                    </span>
                </h2>

                <div className="mt-12">{grid}</div>
            </div>
        </section>
    );
}
