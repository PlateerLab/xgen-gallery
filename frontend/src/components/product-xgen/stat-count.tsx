"use client";

/* 「XGEN은 다릅니다」 숫자 밴드용 순차 카운트업.
   섹션이 화면에 들어오면 칸마다 delay 만큼 기다렸다가 0→value 로 올라간다(1회).
   글자 폭이 흔들리지 않도록 최종 값을 투명하게 깔고 그 위에 움직이는 값을 겹친다.
   prefers-reduced-motion 이면 바로 최종 값을 보여 준다. */
import { useEffect, useRef, useState } from "react";

export function StatCount({
    value,
    prefix = "",
    delay = 0,
    duration = 1100,
    className,
}: {
    value: number;
    prefix?: string;
    delay?: number;
    duration?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [val, setVal] = useState(0);
    const [on, setOn] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setVal(value);
            setOn(true);
            return;
        }
        let raf = 0;
        let timer = 0;
        const io = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                io.disconnect();
                timer = window.setTimeout(() => {
                    setOn(true);
                    const t0 = performance.now();
                    const tick = (t: number) => {
                        const p = Math.min((t - t0) / duration, 1);
                        setVal(Math.round((1 - Math.pow(1 - p, 3)) * value));
                        if (p < 1) raf = requestAnimationFrame(tick);
                    };
                    raf = requestAnimationFrame(tick);
                }, delay);
            },
            { threshold: 0.35 },
        );
        io.observe(el);
        return () => {
            io.disconnect();
            window.clearTimeout(timer);
            cancelAnimationFrame(raf);
        };
    }, [value, delay, duration]);

    const final = `${prefix}${value.toLocaleString("en-US")}`;
    return (
        <span ref={ref} className="relative inline-grid">
            <span aria-hidden className="invisible col-start-1 row-start-1">
                {final}
            </span>
            <span
                aria-hidden
                className={`col-start-1 row-start-1 text-left transition-opacity duration-500 ${className ?? ""} ${on ? "opacity-100" : "opacity-0"}`}
            >
                {prefix}
                {val.toLocaleString("en-US")}
            </span>
            <span className="sr-only">{final}</span>
        </span>
    );
}
