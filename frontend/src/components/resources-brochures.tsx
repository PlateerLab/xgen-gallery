"use client";

import { useState } from "react";
import { FileText, Check, Layers, ShieldCheck, Building2 } from "lucide-react";
import { BrochureForm } from "@/components/brochure-form";
import { allBrochures } from "@/lib/brochures";
import { cn } from "@/lib/cn";

/**
 * 자료실 소개서 — 종류를 카드로 나열하고, 선택한 소개서의 미리보기 + 다운로드 폼을 보여준다.
 * 소개서 종류(asset)는 lib/brochures.ts 카탈로그에서 온다(XGEN 현재, Code Assistant 등 확장).
 */

// 담긴 내용 항목에 순서대로 매길 아이콘(최대 4종, 그 외는 FileText).
const CONTENT_ICONS = [Layers, FileText, ShieldCheck, Building2];

export function ResourcesBrochures() {
    const items = allBrochures(); // 카드 자리(비활성/준비 중 포함)
    const ready = items.filter((b) => b.published); // 선택·다운로드 가능한 것
    const [asset, setAsset] = useState(ready[0]?.asset ?? "xgen-brochure");
    const active = ready.find((b) => b.asset === asset) ?? ready[0];
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
                    const disabled = !b.published; // 준비 중 — 자리만, 선택·다운로드 불가
                    return (
                        <button
                            key={b.asset}
                            type="button"
                            onClick={() => !disabled && setAsset(b.asset)}
                            disabled={disabled}
                            aria-pressed={selected}
                            className={cn(
                                "relative flex items-start gap-4 rounded-2xl border p-5 text-left transition",
                                disabled
                                    ? "cursor-not-allowed border-dashed border-[var(--color-line)] bg-[var(--color-surface-alt)] opacity-70"
                                    : selected
                                      ? "border-[#2f7bff] bg-white ring-1 ring-[#2f7bff] shadow-[0_14px_36px_-18px_rgba(47,123,255,0.35)]"
                                      : "border-[var(--color-line)] bg-white hover:border-[#bcd0f5]",
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl",
                                    disabled
                                        ? "bg-[var(--color-line)] text-[var(--color-ink-subtle)]"
                                        : "bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white",
                                )}
                            >
                                <FileText className="h-6 w-6" />
                            </span>
                            <div className="min-w-0">
                                <p
                                    className={cn(
                                        "text-[12.5px] font-semibold",
                                        disabled
                                            ? "text-[var(--color-ink-subtle)]"
                                            : "text-[#2461d8]",
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
                            {disabled ? (
                                <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-[var(--color-line-strong)] px-2 py-0.5 text-[11px] font-bold text-white">
                                    준비 중
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

            {/* 선택된 소개서 — 미리보기(좌) + 리드 폼(우) */}
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                        <span className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white shadow-[0_12px_30px_-10px_rgba(47,123,255,0.6)]">
                            <FileText className="h-8 w-8" />
                        </span>
                        <div>
                            <p className="text-[13px] font-semibold text-[#2461d8]">
                                PDF · 제품 소개서
                            </p>
                            <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                {active.name}
                                <span className="text-[var(--color-ink-muted)]">
                                    {" "}
                                    · {active.tagline}
                                </span>
                            </h3>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
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
                        <div className="mt-5 flex items-center gap-2 border-t border-[var(--color-line)] pt-4 text-[13.5px] text-[var(--color-ink-subtle)]">
                            <Check className="h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                            신청 즉시 PDF 다운로드
                        </div>
                    </div>
                </div>

                {/* key=asset — 종류 전환 시 폼 상태 초기화 */}
                <BrochureForm key={active.asset} asset={active.asset} />
            </div>
        </div>
    );
}
