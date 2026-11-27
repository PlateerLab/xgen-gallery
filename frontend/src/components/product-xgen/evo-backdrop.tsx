"use client";

/* AX Evolution Model 배경 모션 — 「진화」를 왼쪽 아래 → 오른쪽 위로 흐르는 입자로 표현한다.
   - 입자는 카드 계단과 같은 방향(왼쪽 아래 → 오른쪽 위)으로 천천히 오른다.
   - 왼쪽(01 이해)에서는 흩어진 점이고, 오른쪽으로 갈수록 서로 이어지는 거리가 늘어 네트워크(03 협업)가 된다.
   - 오른쪽 위(04 진화)에서는 중심에서 바깥으로 넓어지는 궤도 파문이 주기적으로 퍼진다.
   화면 밖이면 멈추고, 동작 줄이기 설정이면 한 장면만 그린 채 정지한다. */

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; ph: number; r: number };

export function EvoBackdrop() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

        let w = 0;
        let h = 0;
        let ps: P[] = [];
        let raf = 0;
        let running = false;
        let last = 0;
        let t = 0;

        const spawn = (fresh: boolean): P => {
            // 처음엔 화면 전체에, 이후엔 왼쪽·아래 가장자리에서 새로 들어온다
            let x: number;
            let y: number;
            if (fresh) {
                x = Math.random() * w;
                y = Math.random() * h;
            } else if (Math.random() < 0.55) {
                x = -10;
                y = Math.random() * h;
            } else {
                x = Math.random() * w * 0.8;
                y = h + 10;
            }
            const sp = 0.16 + Math.random() * 0.2; // px/frame(60fps 기준)
            return { x, y, vx: sp, vy: -sp * (0.38 + Math.random() * 0.22), ph: Math.random() * Math.PI * 2, r: 0.7 + Math.random() * 0.8 };
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = Math.max(1, rect.width);
            h = Math.max(1, rect.height);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.round(Math.min(200, Math.max(60, (w * h) / 7000)));
            ps = Array.from({ length: n }, () => spawn(true));
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // 04 진화 — 오른쪽 위에서 퍼지는 궤도 파문(4.5초 간격, 3겹)
            const cx = w * 0.84;
            const cy = h * 0.3;
            const maxR = Math.max(w, h) * 0.55;
            for (let k = 0; k < 3; k++) {
                const ph = ((t / 270 + k / 3) % 1 + 1) % 1;
                const rr = 24 + ph * maxR;
                const a = Math.sin(ph * Math.PI) * (1 - ph) * 0.5;
                ctx.beginPath();
                ctx.arc(cx, cy, rr, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(125,211,252,${a.toFixed(3)})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }
            // 중심 빛
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.32);
            g.addColorStop(0, "rgba(47,123,255,0.22)");
            g.addColorStop(1, "rgba(47,123,255,0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            // 03 협업 — 오른쪽으로 갈수록 더 멀리까지 이어진다
            for (let i = 0; i < ps.length; i++) {
                const a = ps[i];
                const pa = Math.min(1, Math.max(0, a.x / w));
                for (let j = i + 1; j < ps.length; j++) {
                    const b = ps[j];
                    const pm = Math.min(1, Math.max(0, (a.x + b.x) / 2 / w));
                    const lim = 22 + Math.pow(pm, 1.4) * 150;
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 > lim * lim) continue;
                    const al = (1 - Math.sqrt(d2) / lim) * (0.06 + pm * 0.42);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(150,190,240,${al.toFixed(3)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
                // 01→04 — 오른쪽으로 갈수록 점이 커지고 밝아지며 실버 → 블루로 바뀐다
                const tw = 0.75 + 0.25 * Math.sin(t / 40 + a.ph);
                const rad = a.r * (1 + pa * 1.1);
                const cr = Math.round(201 - pa * 76);
                const cg = Math.round(213 - pa * 2);
                const cb = Math.round(236 + pa * 16);
                ctx.beginPath();
                ctx.arc(a.x, a.y, rad, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${cr},${cg},${cb},${((0.35 + pa * 0.55) * tw).toFixed(3)})`;
                ctx.fill();
            }
        };

        const step = (dt: number) => {
            t += dt;
            for (let i = 0; i < ps.length; i++) {
                const p = ps[i];
                const pa = Math.min(1, Math.max(0, p.x / w));
                // 오를수록 조금씩 빨라진다(가속하는 진화)
                const boost = 1 + pa * 0.6;
                p.x += p.vx * boost * dt;
                p.y += (p.vy * boost + Math.sin(t / 90 + p.ph) * 0.05) * dt;
                if (p.x > w + 12 || p.y < -12) ps[i] = spawn(false);
            }
        };

        const loop = (now: number) => {
            const dt = last ? Math.min(3, (now - last) / 16.67) : 1;
            last = now;
            step(dt);
            draw();
            raf = requestAnimationFrame(loop);
        };

        const start = () => {
            if (running || reduced) return;
            running = true;
            last = 0;
            raf = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        resize();
        t = 120;
        draw();

        const ro = new ResizeObserver(() => {
            resize();
            draw();
        });
        ro.observe(canvas);
        const io = new IntersectionObserver((en) => (en.some((x) => x.isIntersecting) ? start() : stop()), { threshold: 0 });
        io.observe(canvas);

        return () => {
            stop();
            ro.disconnect();
            io.disconnect();
        };
    }, []);

    return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
