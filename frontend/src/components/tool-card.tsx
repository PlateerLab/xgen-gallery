"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Copy, Play } from "lucide-react";
import { useState } from "react";
import type { Tool } from "@/lib/tools";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/i18n-provider";
import { TOOL_I18N } from "@/lib/i18n";

/** 카테고리별 칩 컬러 — 사이트 전반(블로그·뉴스레터)과 동일한 톤. */
const CAT_STYLE: Record<Tool["category"], string> = {
    ingestion: "bg-[#2f7bff]/10 text-[#2461d8]",
    knowledge: "bg-[#7c5cff]/12 text-[#6a44e0]",
    agent: "bg-[#10b981]/14 text-[#0d9268]",
    utility: "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)]",
};

export function ToolCard({ tool }: { tool: Tool }) {
    const { locale, t } = useI18n();
    const [copied, setCopied] = useState(false);
    const desc = TOOL_I18N[tool.id]?.[locale]?.description ?? tool.description;
    const categoryLabel =
        t.categories[tool.category as keyof typeof t.categories] ??
        tool.category;

    const copy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(tool.install);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            // ignore
        }
    };

    return (
        <div className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-line-strong)] hover:shadow-[0_18px_44px_-24px_rgba(20,40,80,0.28)]">
            {/* 상단: 카테고리 · 라이브 데모 / GitHub */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    <span
                        className={cn(
                            "rounded-full px-2.5 py-0.5 text-[12px] font-semibold",
                            CAT_STYLE[tool.category],
                        )}
                    >
                        {categoryLabel}
                    </span>
                    {tool.hasDemo && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[11.5px] font-semibold text-[#0d9268]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {t.toolCard.liveDemo}
                        </span>
                    )}
                </div>
                <Link
                    href={`https://github.com/PlateerLab/${tool.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub 저장소 열기"
                    className="flex-none rounded-md p-1 text-[var(--color-ink-subtle)] transition hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-ink)]"
                >
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>

            {/* 본문 */}
            <h3 className="mt-4 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                {tool.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                {desc}
            </p>

            {/* 하단: 설치 명령 + 액션 */}
            <div className="mt-auto space-y-2.5 pt-5">
                <div className="flex items-center gap-1.5 font-mono text-[11.5px] text-[var(--color-ink-subtle)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-strong)]" />
                    {tool.language}
                </div>
                <button
                    onClick={copy}
                    className="flex w-full items-center justify-between rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-2 font-mono text-[13px] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:bg-white hover:text-[var(--color-ink)]"
                >
                    <span className="truncate">
                        <span className="text-[var(--color-ink-subtle)]">$ </span>
                        {tool.install}
                    </span>
                    {copied ? (
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    ) : (
                        <Copy className="h-3.5 w-3.5 flex-shrink-0" />
                    )}
                </button>
                {tool.hasDemo && (
                    <Link
                        href={`/tool/${tool.id}`}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-ink)] px-3 py-2 text-[14px] font-semibold text-white transition hover:bg-[var(--color-ink)]/90"
                    >
                        <Play className="h-3 w-3 fill-current" />
                        {t.toolCard.openDemo}
                    </Link>
                )}
            </div>
        </div>
    );
}
