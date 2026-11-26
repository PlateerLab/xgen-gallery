"use client";

/* 「XGEN은 다릅니다」 숫자 밴드 — 스크롤 연동 모션.
   숫자 4칸 묶음이 화면 아래에서 올라오는 동안 스크롤 위치(progress 0→1)에 맞춰
   칸마다 시차를 두고 하나씩 떠오르며(opacity·translateY) 숫자가 0→value 로 올라간다.
   스크롤을 되돌리면 같은 경로로 되돌아간다(시간 기반 아님).
   React 렌더 없이 rAF 에서 DOM 에 직접 쓴다. 글자 폭이 흔들리지 않도록 최종 값을 투명하게 깔아 둔다.
   prefers-reduced-motion 이면 움직임 없이 최종 값을 보여 준다. 화면 읽기에는 처음부터 최종 값. */
import { useEffect, useRef } from "react";

export type ScrollStat = { prefix?: string; value: number; unit: string; label: string; sub: string };

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (p: number) => 1 - Math.pow(1 - p, 3);
const fmt = (prefix: string, n: number) => `${prefix}${n.toLocaleString("en-US")}`;

/* 칸 i 가 움직이는 progress 구간: 시작 i*STEP, 길이 SPAN (마지막 칸은 0.45~0.95) */
const STEP = 0.15;
const SPAN = 0.5;

export function ScrollStatGrid({ stats }: { stats: ScrollStat[] }) {
    const gridRef = useRef<HTMLDivElement>(null);
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const paint = (p: number) => {
            stats.forEach((s, i) => {
                const local = clamp((p - i * STEP) / SPAN);
                const e = ease(local);
                const cell = cellRefs.current[i];
                const num = numRefs.current[i];
                if (cell) {
                    cell.style.opacity = String(0.08 + 0.92 * e);
                    cell.style.transform = `translate3d(0, ${(1 - e) * 28}px, 0)`;
                }
                if (num) num.textContent = fmt(s.prefix ?? "", Math.round(e * s.value));
            });
        };

        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            paint(1);
            return;
        }

        let raf = 0;
        const update = () => {
            raf = 0;
            const r = grid.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            /* 묶음 윗변이 화면 92% 지점에 닿으면 시작, 묶음이 화면 안쪽으로 충분히 올라오면 끝 */
            paint(clamp((vh * 0.92 - r.top) / (r.height + vh * 0.35)));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, [stats]);

    return (
        <div ref={gridRef} className="col-span-7 grid grid-cols-2 border-t border-white/15 max-[1023px]:col-span-1">
            {stats.map((s, i) => {
                const final = fmt(s.prefix ?? "", s.value);
                return (
                    <div
                        key={s.label}
                        className={[
                            "border-b border-white/15 py-8 max-[620px]:py-6",
                            i % 2 === 0 ? "pr-8 max-[620px]:pr-4" : "border-l pl-8 max-[620px]:pl-4",
                        ].join(" ")}
                    >
                        <div
                            ref={(el) => {
                                cellRefs.current[i] = el;
                            }}
                            className="will-change-transform"
                        >
                            <p className="flex items-baseline gap-1 whitespace-nowrap">
                                <span className="text-[60px] font-semibold leading-none tracking-[-0.04em] max-[1023px]:text-[52px] max-[620px]:text-[34px]">
                                    <span className="relative inline-grid">
                                        <span aria-hidden className="invisible col-start-1 row-start-1">
                                            {final}
                                        </span>
                                        <span
                                            aria-hidden
                                            ref={(el) => {
                                                numRefs.current[i] = el;
                                            }}
                                            className="col-start-1 row-start-1 bg-gradient-to-b from-white to-[#a9d0ff] bg-clip-text text-left text-transparent"
                                        >
                                            {final}
                                        </span>
                                        <span className="sr-only">{final}</span>
                                    </span>
                                </span>
                                {s.unit && (
                                    <span className="text-[22px] font-semibold text-[#a9d0ff] max-[620px]:text-[15px]">{s.unit}</span>
                                )}
                            </p>
                            <p className="mt-4 text-[15px] font-semibold tracking-tight text-white max-[620px]:mt-3 max-[620px]:text-[13.5px]">
                                {s.label}
                            </p>
                            <p className="mt-1 text-[12.5px] text-white/50 max-[620px]:text-[12px]">{s.sub}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
