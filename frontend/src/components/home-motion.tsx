"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 스크롤 등장 래퍼 — 뷰포트에 들어오면 1회 fade/slide-up. prefers-reduced-motion 존중.
 * 서버 컴포넌트(page.tsx)에서 섹션을 감싸 사용한다.
 */
export function Reveal({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
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
            { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal${shown ? " reveal-in" : ""}${className ? " " + className : ""}`}
        >
            {children}
        </div>
    );
}

/**
 * 숫자 카운트업 — 뷰포트 진입 시 0→end 애니메이션(1회). prefers-reduced-motion 시 즉시 표기.
 */
export function CountUp({
    end,
    suffix = "",
    duration = 1200,
}: {
    end: number;
    suffix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [val, setVal] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setVal(end);
            return;
        }
        let raf = 0;
        let started = false;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !started) {
                        started = true;
                        const t0 = performance.now();
                        const tick = (t: number) => {
                            const p = Math.min((t - t0) / duration, 1);
                            const eased = 1 - Math.pow(1 - p, 3);
                            setVal(Math.round(eased * end));
                            if (p < 1) raf = requestAnimationFrame(tick);
                        };
                        raf = requestAnimationFrame(tick);
                        io.disconnect();
                    }
                });
            },
            { threshold: 0.4 },
        );
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [end, duration]);

    return (
        <span ref={ref}>
            {val}
            {suffix}
        </span>
    );
}
