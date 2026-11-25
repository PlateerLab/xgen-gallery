import type { ReactNode } from "react";

/**
 * /product/xgen 개요 섹션 머리 — 영문 머리글 → 제목 → 리드 한 벌.
 * 섹션마다 머리글 색·제목 크기·리드 간격이 달라 리듬이 끊기던 것을 한곳에서 맞춘다
 * (참고: 비아이매트릭스 TRINITY 랜딩 — 머리글 12.5px·제목·리드·본문 간격을 전 섹션 동일하게 유지).
 *
 * 간격 기준
 * - 섹션 상하: SECTION_PAD (모바일 80px, 1024px 이상 120px)
 * - 머리글→제목 12px, 제목→리드 16px, 머리 블록→본문 SECTION_BODY_GAP (48px / 64px)
 */
export const SECTION_PAD = "py-20 lg:py-[120px]";
export const SECTION_BODY_GAP = "mt-12 lg:mt-16";

export function SectionHead({
    eyebrow,
    title,
    lead,
    align = "center",
    dark = false,
}: {
    eyebrow: string;
    title: ReactNode;
    lead?: ReactNode;
    align?: "center" | "left";
    dark?: boolean;
}) {
    const center = align === "center";
    return (
        <div className={center ? "text-center" : ""}>
            <p
                className={`font-mono text-[12px] font-semibold uppercase tracking-widest ${
                    dark ? "text-[#7dd3fc]" : "text-[#2461d8]"
                }`}
            >
                {eyebrow}
            </p>
            <h2
                className={`mt-3 text-[28px] font-bold leading-[1.3] tracking-tight [word-break:keep-all] md:text-[40px] ${
                    center ? "mx-auto max-w-3xl" : "max-w-3xl"
                } ${dark ? "text-white" : "text-[var(--color-ink)]"}`}
            >
                {title}
            </h2>
            {lead && (
                <p
                    className={`mt-4 max-w-2xl text-[15px] leading-relaxed [word-break:keep-all] md:text-[17px] ${
                        center ? "mx-auto" : ""
                    } ${dark ? "text-white/65" : "text-[var(--color-ink-muted)]"}`}
                >
                    {lead}
                </p>
            )}
        </div>
    );
}
