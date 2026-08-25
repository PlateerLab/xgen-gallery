"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 이정표 수평 로드맵 — 왼쪽(과거)에서 오른쪽(현재)으로 흐르는 타임라인.
 *
 * 뷰포트에 들어오면 진행선이 좌→우로 그려지고 노드가 순서대로 떠오른다. 연혁은
 * "언제 무엇이 있었나"보다 "어디에서 어디로 왔나"가 핵심이라, 목록보다 이동을
 * 보여주는 편이 맞다.
 *
 * 좁은 화면에서는 가로 스크롤로 넘긴다 — 세로로 접으면 로드맵의 방향성이 사라진다.
 * prefers-reduced-motion 이면 애니메이션 없이 완성 상태로 바로 보여준다.
 */
export function MilestoneRoadmap({
    items,
}: {
    /** 과거 → 현재 순으로 넘긴다(로드맵은 왼쪽이 과거다). */
    items: { when: string; what: string }[];
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setShown(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setShown(true);
                        io.disconnect();
                    }
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const last = items.length - 1;

    return (
        <div ref={ref} className="mt-6">
            {/* 가로 스크롤 영역 — 넘치는 만큼만 스크롤된다 */}
            <div className="-mx-1 overflow-x-auto px-1 pb-2">
                <ol
                    className="roadmap grid min-w-[900px] gap-0"
                    style={{
                        gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                    }}
                >
                    {items.map((m, i) => (
                        <li key={m.when} className="relative pt-11">
                            {/* 진행선 — 마지막 노드 뒤로는 긋지 않는다 */}
                            {i < last && (
                                <span
                                    aria-hidden
                                    className={`roadmap-line${shown ? " roadmap-line-in" : ""}`}
                                    style={{ transitionDelay: `${i * 130}ms` }}
                                />
                            )}

                            <span
                                aria-hidden
                                className={`roadmap-dot${shown ? " roadmap-dot-in" : ""}${
                                    i === last ? " roadmap-dot-now" : ""
                                }`}
                                style={{ transitionDelay: `${i * 130 + 90}ms` }}
                            />

                            <div
                                className={`roadmap-card${shown ? " roadmap-card-in" : ""} px-3 text-center`}
                                style={{ transitionDelay: `${i * 130 + 140}ms` }}
                            >
                                <span
                                    className={`font-mono text-[13px] font-bold ${
                                        i === last
                                            ? "text-[#1f4fa8]"
                                            : "text-[#2461d8]"
                                    }`}
                                >
                                    {m.when}
                                </span>
                                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {m.what}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
