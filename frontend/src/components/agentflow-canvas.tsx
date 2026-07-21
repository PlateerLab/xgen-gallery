"use client";

import { useEffect, useRef } from "react";

/**
 * XGEN 히어로 키비주얼 — 에이전트 오케스트레이션 그래프(움직이는 노드).
 * 아티팩트 원본을 이식: 간선 위를 흐르는 펄스 + 노드 브리딩 애니메이션.
 * prefers-reduced-motion이면 정적 1프레임만 그린다.
 */
export function AgentflowCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const W = canvas.width;
        const H = canvas.height;
        // 계층형 배치: 입력 → 추론 → 도구 → 출력
        const nodes = [
            { x: 0.15, y: 0.3, r: 13, label: "input" },
            { x: 0.15, y: 0.72, r: 13, label: "prompt" },
            { x: 0.43, y: 0.23, r: 16, label: "agent" },
            { x: 0.43, y: 0.55, r: 16, label: "llm" },
            { x: 0.43, y: 0.85, r: 13, label: "rag" },
            { x: 0.72, y: 0.4, r: 14, label: "tool" },
            { x: 0.72, y: 0.73, r: 13, label: "guard" },
            { x: 0.9, y: 0.56, r: 16, label: "deploy" },
        ];
        const edges: [number, number][] = [
            [0, 2],
            [1, 3],
            [0, 3],
            [2, 5],
            [3, 5],
            [3, 4],
            [4, 6],
            [5, 7],
            [6, 7],
            [2, 3],
        ];
        const accent = "#7dd3fc";
        const faint = "#5d757b";
        const px = (n: (typeof nodes)[number]) => n.x * W;
        const py = (n: (typeof nodes)[number]) => n.y * H;

        let t = 0;
        let raf = 0;

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);

            edges.forEach((e, i) => {
                const a = nodes[e[0]];
                const b = nodes[e[1]];
                ctx.beginPath();
                ctx.moveTo(px(a), py(a));
                ctx.lineTo(px(b), py(b));
                ctx.strokeStyle = faint;
                ctx.globalAlpha = 0.32;
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.globalAlpha = 1;

                if (!reduce) {
                    const phase = (t * 0.006 + i * 0.37) % 1;
                    const xp = px(a) + (px(b) - px(a)) * phase;
                    const yp = py(a) + (py(b) - py(a)) * phase;
                    ctx.beginPath();
                    ctx.arc(xp, yp, 2.6, 0, Math.PI * 2);
                    ctx.fillStyle = accent;
                    ctx.globalAlpha = 0.9 * (1 - Math.abs(phase - 0.5) * 1.2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });

            nodes.forEach((n, i) => {
                const breathe = reduce ? 0 : Math.sin(t * 0.03 + i) * 1.3;
                const r = n.r + breathe;
                // glow ring
                ctx.beginPath();
                ctx.arc(px(n), py(n), r + 5, 0, Math.PI * 2);
                ctx.strokeStyle = accent;
                ctx.globalAlpha = 0.18;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.globalAlpha = 1;
                // body
                ctx.beginPath();
                ctx.arc(px(n), py(n), r, 0, Math.PI * 2);
                ctx.fillStyle = "#0c1a28";
                ctx.fill();
                ctx.strokeStyle = accent;
                ctx.lineWidth = 1.7;
                ctx.stroke();
                // core dot
                ctx.beginPath();
                ctx.arc(px(n), py(n), 2.7, 0, Math.PI * 2);
                ctx.fillStyle = accent;
                ctx.fill();
                // label
                ctx.fillStyle = faint;
                ctx.font = "12px ui-monospace, Menlo, Consolas, monospace";
                ctx.textAlign = "center";
                ctx.fillText(n.label, px(n), py(n) + r + 16);
            });

            t += 1;
            if (!reduce) raf = requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(125,211,252,0.06),transparent_55%)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 font-mono text-[11.5px] text-white/45">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-auto tracking-[0.08em]">agentflow · canvas</span>
            </div>
            <canvas
                ref={ref}
                width={640}
                height={520}
                className="block h-auto w-full"
                role="img"
                aria-label="XGEN 에이전트플로우 캔버스 — 입력·프롬프트에서 Agent·LLM·RAG, Tool·Guard를 거쳐 배포로 이어지며 노드가 실행되는 그래픽"
            />
        </div>
    );
}
