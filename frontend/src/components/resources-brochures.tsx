"use client";

import { useState } from "react";
import {
    FileText,
    Check,
    Layers,
    Workflow,
    Database,
    Cable,
    ShieldCheck,
    Rocket,
    Clock,
} from "lucide-react";
import { BrochureForm } from "@/components/brochure-form";
import { allBrochures } from "@/lib/brochures";
import { cn } from "@/lib/cn";

/**
 * 자료실 소개서 — 종류를 카드로 나열하고, 선택한 소개서의 미리보기 + 다운로드 폼을 보여준다.
 * 소개서 종류(asset)는 lib/brochures.ts 카탈로그에서 온다(XGEN 현재, Code Assistant 등 확장).
 */

// 담긴 내용 항목에 순서대로 매길 아이콘(그 외는 FileText).
const CONTENT_ICONS = [Layers, Workflow, Database, Cable, ShieldCheck, Rocket];

export function ResourcesBrochures() {
    const items = allBrochures(); // 카드 자리(준비 중 포함)
    const firstReady = items.find((b) => b.published);
    // 선택은 준비 중 카드도 가능(내용 미리보기용). 기본값은 공개된 첫 소개서.
    const [asset, setAsset] = useState(
        firstReady?.asset ?? items[0]?.asset ?? "xgen-brochure",
    );
    const active = items.find((b) => b.asset === asset) ?? firstReady ?? items[0];
    if (!active) return null;

    return (
        <div>
            {/* 소개서 종류 카드 — 항상 노출(선택 시 아래 미리보기·폼에 반영) */}
            <div
                className={cn(
                    "mb-10 grid gap-4",
                    items.length > 1 && "sm:grid-cols-2",
                )}
            >
                {items.map((b) => {
                    const selected = b.asset === asset;
                    const ready = b.published; // 준비 중 카드도 선택(미리보기)은 가능, 다운로드만 X
                    return (
                        <button
                            key={b.asset}
                            type="button"
                            onClick={() => setAsset(b.asset)}
                            aria-pressed={selected}
                            className={cn(
                                "relative flex items-start gap-4 rounded-2xl border p-5 text-left transition",
                                selected
                                    ? "border-[#2f7bff] bg-white ring-1 ring-[#2f7bff] shadow-[0_14px_36px_-18px_rgba(47,123,255,0.35)]"
                                    : ready
                                      ? "border-[var(--color-line)] bg-white hover:border-[#bcd0f5]"
                                      : "border-dashed border-[var(--color-line)] bg-[var(--color-surface-alt)] hover:border-[#bcd0f5]",
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl",
                                    ready
                                        ? "bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white"
                                        : "bg-[var(--color-line)] text-[var(--color-ink-subtle)]",
                                )}
                            >
                                <FileText className="h-6 w-6" />
                            </span>
                            <div className="min-w-0">
                                <p
                                    className={cn(
                                        "text-[12.5px] font-semibold",
                                        ready
                                            ? "text-[#2461d8]"
                                            : "text-[var(--color-ink-subtle)]",
                                    )}
                                >
                                    {b.tagline}
                                </p>
                                <h3 className="text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {b.name} 소개서
                                </h3>
                                <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {b.summary}
                                </p>
                            </div>
                            {!ready ? (
                                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[var(--color-line-strong)] px-2 py-0.5 text-[11px] font-bold text-white">
                                    <Clock className="h-3 w-3" /> 준비 중
                                </span>
                            ) : selected ? (
                                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#2f7bff] px-2 py-0.5 text-[11px] font-bold text-white">
                                    <Check className="h-3 w-3" /> 선택됨
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            {/* 선택된 소개서 — 담긴 내용(좌) + 리드 폼(우), 동일 높이 */}
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
                <div className="flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
                    <p className="text-[14px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                        소개서에 담긴 내용
                    </p>
                    <ul className="mt-4 space-y-4">
                        {active.contents.map((cc, i) => {
                            const Icon = CONTENT_ICONS[i] ?? FileText;
                            return (
                                <li key={cc.title} className="flex items-start gap-3">
                                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {cc.title}
                                        </p>
                                        <p className="mt-0.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {cc.desc}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-line)] pt-4 text-[13.5px] text-[var(--color-ink-subtle)]">
                        <Check className="h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                        신청 즉시 PDF 다운로드
                    </div>
                </div>

                {/* 공개된 소개서는 폼, 준비 중이면 안내 패널(동일 높이) */}
                {active.published ? (
                    // key=asset — 종류 전환 시 폼 상태 초기화
                    <BrochureForm key={active.asset} asset={active.asset} />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-line)] bg-white p-8 text-center">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]">
                            <Clock className="h-7 w-7" />
                        </span>
                        <h3 className="mt-5 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                            {active.name} 소개서는 준비 중입니다
                        </h3>
                        <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            곧 공개되면 이 자리에서 바로 신청·다운로드하실 수 있습니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
