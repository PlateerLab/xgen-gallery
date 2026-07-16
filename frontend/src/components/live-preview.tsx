"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TOOLS, type Tool } from "@/lib/tools";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/i18n-provider";
import { TOOL_I18N } from "@/lib/i18n";

const SLIDE_DURATION = 7000;

// 키비주얼에는 카테고리별 '가장 최근에 추가된' 라이브러리 1개씩만 노출한다.
// TOOLS 배열은 추가 순서이므로 각 카테고리에서 마지막 항목이 최신이다.
const CATEGORY_ORDER: Tool["category"][] = [
    "ingestion",
    "knowledge",
    "agent",
    "utility",
];
function featuredTools(): Tool[] {
    const latest = new Map<Tool["category"], Tool>();
    for (const tool of TOOLS) latest.set(tool.category, tool); // 뒤 항목이 덮어씀 = 최신
    return CATEGORY_ORDER.map((c) => latest.get(c)).filter(
        (tool): tool is Tool => Boolean(tool),
    );
}

export function LivePreview() {
    const { locale, t } = useI18n();
    const featured = useMemo(featuredTools, []);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || featured.length <= 1) return;
        const id = setInterval(
            () => setIndex((i) => (i + 1) % featured.length),
            SLIDE_DURATION,
        );
        return () => clearInterval(id);
    }, [paused, index, featured.length]);

    if (featured.length === 0) return null;
    const cur = Math.min(index, featured.length - 1);
    const tool = featured[cur];
    const go = (n: number) => setIndex((n + featured.length) % featured.length);
    const desc = TOOL_I18N[tool.id]?.[locale]?.description ?? tool.description;

    const arrowCls =
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-line-strong)] hover:text-[var(--color-ink)]";

    return (
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-20">
            {/* 블로그 인사이트 히어로와 동일한 키비주얼 포맷 */}
            <div className="mb-8 flex items-baseline gap-2.5">
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#2461d8]">
                    Library Gallery
                </span>
                <span className="text-[14px] text-[var(--color-ink-subtle)]">
                    카테고리별 가장 최근 추가된 라이브러리
                </span>
            </div>

            <div
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* 좌: 텍스트 */}
                <motion.div
                    key={`text-${cur}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="order-2 md:order-1"
                >
                    <div className="flex items-center gap-2 text-[13.5px] text-[var(--color-ink-subtle)]">
                        <span className="rounded-full bg-[#2f7bff]/10 px-2.5 py-0.5 font-semibold uppercase tracking-wider text-[#2461d8]">
                            {tool.category}
                        </span>
                    </div>
                    <h2 className="mt-4 text-[28px] font-bold leading-[1.14] tracking-tight text-[var(--color-ink)] md:text-[42px]">
                        {tool.name}
                    </h2>
                    <p className="mt-4 line-clamp-2 max-w-lg text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                        {desc}
                    </p>
                    <Link
                        href={`/tool/${tool.id}`}
                        className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8]"
                    >
                        {t.live.try}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>

                    {/* 캐러셀 컨트롤 — 블로그 히어로와 동일(prev/next + dots) */}
                    {featured.length > 1 && (
                        <div className="mt-8 flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="이전"
                                onClick={() => go(cur - 1)}
                                className={arrowCls}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                aria-label="다음"
                                onClick={() => go(cur + 1)}
                                className={arrowCls}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                            <div className="ml-1 flex items-center gap-1.5">
                                {featured.map((tl, i) => (
                                    <button
                                        key={tl.id}
                                        type="button"
                                        aria-label={`Show ${tl.name}`}
                                        onClick={() => go(i)}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all",
                                            i === cur
                                                ? "w-6 bg-[var(--color-ink)]"
                                                : "w-1.5 bg-[var(--color-line-strong)] hover:bg-[var(--color-ink-subtle)]",
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* 우: 일러스트(블로그 커버 자리와 동일한 rounded-3xl 서피스) */}
                <div className="order-1 md:order-2">
                    <div
                        key={`viz-${cur}`}
                        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-8 md:p-10"
                    >
                        <div className="w-full max-w-md">
                            <Visual tool={tool} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============================================================================
 *  Per-tool visuals — scripted animations that convey what each library does.
 *  Animations restart automatically on slide change via `key` on parent.
 * ========================================================================= */

function Visual({ tool }: { tool: Tool }) {
    switch (tool.id) {
        case "contextifier":
            return <ContextifierViz />;
        case "doc2chunk":
            return <Doc2ChunkViz />;
        case "f2a":
            return <F2aViz />;
        case "synaptic-memory":
            return <SynapticViz />;
        case "googer":
            return <GoogerViz />;
        case "document-adapter":
            return <DocumentAdapterViz />;
        case "omnifuse":
            return <OmniFuseViz />;
        case "playleft":
            return <PlaywLeftViz />;
        default:
            return <DefaultViz tool={tool} />;
    }
}

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Contextifier: file → parsed (text + table + image) ─────────────── */
function ContextifierViz() {
    return (
        <div className="space-y-3">
            {/* Source file */}
            <motion.div
                {...fadeIn(0)}
                className="flex items-center justify-between rounded-md border border-[var(--color-line)] bg-white px-3 py-2.5 font-mono text-[13px]"
            >
                <span className="flex items-center gap-2">
                    <span>📄</span>
                    <span className="text-[var(--color-ink)]">
                        q4_report.pdf
                    </span>
                </span>
                <span className="text-[var(--color-ink-subtle)]">2.1 MB</span>
            </motion.div>

            <motion.div
                {...fadeIn(0.35)}
                className="flex items-center gap-2 text-[12px] text-[var(--color-ink-subtle)]"
            >
                <span className="h-px flex-1 bg-[var(--color-line)]" />
                <span className="font-mono">parsed</span>
                <span className="h-px flex-1 bg-[var(--color-line)]" />
            </motion.div>

            {/* Text block */}
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.35 }}
                className="rounded-md border border-[var(--color-line)] bg-white p-3"
            >
                <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[var(--color-ink)]">
                        Q4 Revenue Highlights
                    </span>
                    <span className="rounded-sm bg-[var(--color-ink)] px-1.5 py-0.5 font-mono text-[10px] text-white">
                        TEXT
                    </span>
                </div>
                <p className="text-[12px] leading-relaxed text-[var(--color-ink-muted)]">
                    Enterprise adoption drove 23% YoY growth, led by expansion
                    in the US and EU markets.
                </p>
            </motion.div>

            {/* Table with merged cells */}
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.35 }}
                className="overflow-hidden rounded-md border border-[var(--color-line)] bg-white"
            >
                <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3 py-1.5">
                    <span className="text-[12px] text-[var(--color-ink-subtle)]">
                        table · merged headers preserved
                    </span>
                    <span className="rounded-sm bg-[var(--color-ink)] px-1.5 py-0.5 font-mono text-[10px] text-white">
                        TABLE
                    </span>
                </div>
                <table className="w-full border-collapse text-[12px]">
                    <thead className="bg-[var(--color-surface-alt)] text-[var(--color-ink)]">
                        <tr>
                            <th
                                rowSpan={2}
                                className="border-b border-[var(--color-line)] px-2 py-1 text-left align-middle font-medium"
                            >
                                Region
                            </th>
                            <th
                                colSpan={2}
                                className="border-b border-l border-[var(--color-line)] px-2 py-1 text-center font-medium"
                            >
                                Revenue ($M)
                            </th>
                            <th
                                rowSpan={2}
                                className="border-b border-l border-[var(--color-line)] px-2 py-1 text-right align-middle font-medium"
                            >
                                Growth
                            </th>
                        </tr>
                        <tr>
                            <th className="border-b border-l border-[var(--color-line)] px-2 py-1 text-right font-medium text-[var(--color-ink-muted)]">
                                Q3
                            </th>
                            <th className="border-b border-l border-[var(--color-line)] px-2 py-1 text-right font-medium text-[var(--color-ink-muted)]">
                                Q4
                            </th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-[var(--color-ink-muted)]">
                        <tr>
                            <td className="px-2 py-1">US</td>
                            <td className="border-l border-[var(--color-line)] px-2 py-1 text-right">
                                1.2
                            </td>
                            <td className="border-l border-[var(--color-line)] px-2 py-1 text-right text-[var(--color-ink)]">
                                1.5
                            </td>
                            <td className="border-l border-[var(--color-line)] px-2 py-1 text-right text-emerald-600">
                                +25%
                            </td>
                        </tr>
                        <tr className="border-t border-[var(--color-line)]">
                            <td className="px-2 py-1">EU</td>
                            <td className="border-l border-[var(--color-line)] px-2 py-1 text-right">
                                0.8
                            </td>
                            <td className="border-l border-[var(--color-line)] px-2 py-1 text-right text-[var(--color-ink)]">
                                1.1
                            </td>
                            <td className="border-l border-[var(--color-line)] px-2 py-1 text-right text-emerald-600">
                                +37%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>

            {/* Image */}
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.35 }}
                className="flex items-center gap-3 rounded-md border border-[var(--color-line)] bg-white p-3"
            >
                {/* SVG placeholder with bars resembling a chart */}
                <div className="flex h-10 w-14 shrink-0 items-end gap-0.5 rounded-sm border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-1">
                    {[50, 70, 40, 85, 60].map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 rounded-t-[1px] bg-[var(--color-ink)]"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                        <span className="truncate text-[13px] font-semibold text-[var(--color-ink)]">
                            figure-01.png
                        </span>
                        <span className="shrink-0 rounded-sm bg-[var(--color-ink)] px-1.5 py-0.5 font-mono text-[10px] text-white">
                            IMAGE
                        </span>
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-[var(--color-ink-subtle)]">
                        extracted · 280 × 180
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* ── Doc2Chunk: text → numbered chunks ────────────────────────────────── */
function Doc2ChunkViz() {
    const chunks = [
        "XGEN Platform Documentation · Overview — a next-generation AI platform for enterprises.",
        "Architecture · three layers: ingestion, processing pipeline, serving layer.",
        "API Reference · all endpoints require authentication via Bearer token.",
    ];
    return (
        <div className="space-y-2">
            {chunks.map((text, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.35 }}
                    className="flex gap-3 rounded-md border border-[var(--color-line)] bg-white p-3"
                >
                    <span className="w-6 shrink-0 font-mono text-[12px] text-[var(--color-ink-subtle)]">
                        #{i}
                    </span>
                    <span className="font-mono text-[13px] leading-relaxed text-[var(--color-ink)]">
                        {text}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

/* ── f2a: bars growing + stats ────────────────────────────────────────── */
function F2aViz() {
    const heights = [40, 65, 35, 80, 55, 90, 60, 75, 50];
    return (
        <div className="space-y-4">
            <motion.div
                {...fadeIn(0)}
                className="flex items-center justify-between font-mono text-[12px] text-[var(--color-ink-subtle)]"
            >
                <span>sales_data.csv</span>
                <span>15 rows × 7 cols</span>
            </motion.div>

            <div className="flex h-32 items-end gap-1.5">
                {heights.map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                            delay: 0.3 + i * 0.05,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex-1 rounded-t-sm bg-[var(--color-ink)]"
                    />
                ))}
            </div>

            <motion.div
                {...fadeIn(0.9)}
                className="flex gap-4 font-mono text-[12px] text-[var(--color-ink-muted)]"
            >
                <span>avg 29,500</span>
                <span className="text-[var(--color-ink-subtle)]">·</span>
                <span>std 15,200</span>
                <span className="text-[var(--color-ink-subtle)]">·</span>
                <span>missing 1</span>
            </motion.div>
        </div>
    );
}

/* ── Knowtology: tree building ────────────────────────────────────────── */
/* ── Synaptic Memory: graph with edges + nodes pulsing ────────────────── */
function SynapticViz() {
    const nodes = [
        { x: 40, y: 100, label: "refund", delay: 0.2 },
        { x: 150, y: 40, label: "policy", delay: 0.4 },
        { x: 150, y: 160, label: "order", delay: 0.6 },
        { x: 260, y: 100, label: "customer", delay: 0.8 },
    ];
    const edges = [
        { x1: 40, y1: 100, x2: 150, y2: 40, delay: 0.5 },
        { x1: 40, y1: 100, x2: 150, y2: 160, delay: 0.7 },
        { x1: 150, y1: 40, x2: 260, y2: 100, delay: 0.9 },
        { x1: 150, y1: 160, x2: 260, y2: 100, delay: 1.1 },
    ];

    return (
        <svg
            viewBox="0 0 300 200"
            className="h-48 w-full text-[var(--color-ink)]"
        >
            {edges.map((e, i) => (
                <motion.line
                    key={i}
                    x1={e.x1}
                    y1={e.y1}
                    x2={e.x2}
                    y2={e.y2}
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ delay: e.delay, duration: 0.5 }}
                />
            ))}
            {nodes.map((n, i) => (
                <g key={i}>
                    <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r="6"
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: n.delay,
                            type: "spring",
                            stiffness: 300,
                        }}
                    />
                    <motion.text
                        x={n.x}
                        y={n.y - 12}
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="var(--font-mono)"
                        fill="currentColor"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: n.delay + 0.15 }}
                    >
                        {n.label}
                    </motion.text>
                </g>
            ))}
        </svg>
    );
}

/* ── Googer: search bar → results fade in ─────────────────────────────── */
function GoogerViz() {
    const results = [
        {
            title: "Machine Learning with Python — scikit-learn",
            body: "분류, 회귀, 클러스터링 예제 포함.",
        },
        {
            title: "TensorFlow 튜토리얼 — 초보자를 위한 ML",
            body: "딥러닝 기본부터 응용까지.",
        },
        {
            title: "PyTorch 공식 튜토리얼",
            body: "기초부터 고급 주제까지.",
        },
    ];
    return (
        <div className="space-y-2.5">
            <motion.div
                {...fadeIn(0)}
                className="flex items-center gap-2 rounded-md border border-[var(--color-line)] bg-white px-3 py-2 font-mono text-[13px]"
            >
                <Search className="h-3 w-3 text-[var(--color-ink-subtle)]" />
                <span className="text-[var(--color-ink-muted)]">
                    python machine learning
                </span>
            </motion.div>
            {results.map((r, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.22 }}
                    className="rounded-md border border-[var(--color-line)] bg-white p-2.5"
                >
                    <div className="text-[13.5px] font-medium text-[var(--color-ink)]">
                        {r.title}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[var(--color-ink-muted)]">
                        {r.body}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ── Document Adapter: natural-language edit → DOCX/PPTX/HWPX ──────────── */
function DocumentAdapterViz() {
    const formats = [
        { label: "DOCX", delay: 0.5 },
        { label: "PPTX", delay: 0.7 },
        { label: "HWPX", delay: 0.9 },
    ];
    return (
        <div className="space-y-3">
            <motion.div
                {...fadeIn(0)}
                className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2.5"
            >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-subtle)]">
                    instruction
                </span>
                <p className="mt-1 text-[13px] text-[var(--color-ink)]">
                    &quot;제목을 &lsquo;2026 사업계획&rsquo;으로 바꾸고 첫 문단을
                    굵게&quot;
                </p>
            </motion.div>
            <motion.div
                {...fadeIn(0.3)}
                className="flex items-center gap-2 text-[12px] text-[var(--color-ink-subtle)]"
            >
                <span className="h-px flex-1 bg-[var(--color-line)]" />
                <span className="font-mono">edit in place</span>
                <span className="h-px flex-1 bg-[var(--color-line)]" />
            </motion.div>
            <div className="grid grid-cols-3 gap-2">
                {formats.map((f) => (
                    <motion.div
                        key={f.label}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: f.delay, duration: 0.35 }}
                        className="flex flex-col items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-white p-3"
                    >
                        <span className="text-lg">📄</span>
                        <span className="font-mono text-[11px] text-[var(--color-ink)]">
                            {f.label}
                        </span>
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: f.delay + 0.25,
                                type: "spring",
                                stiffness: 300,
                            }}
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white"
                        >
                            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                                <path
                                    d="M2 6l3 3 5-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ── OmniFuse: vector + graph → fused ranking ─────────────────────────── */
function OmniFuseViz() {
    const nodes: [number, number][] = [
        [20, 30],
        [60, 12],
        [60, 48],
        [100, 30],
    ];
    const results: [string, string][] = [
        ["환불 정책 — 배송 지연 시 전액 환불", "0.88"],
        ["배송 지연 보상 규정", "0.71"],
        ["문의 유형 — 지연/환불", "0.64"],
    ];
    return (
        <div className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
                <motion.div
                    {...fadeIn(0.1)}
                    className="rounded-md border border-[var(--color-line)] bg-white p-3"
                >
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-subtle)]">
                        vector
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {[0.79, 0.82, 0.61, 0.55, 0.7, 0.4].map((v, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2 + i * 0.06,
                                    type: "spring",
                                    stiffness: 300,
                                }}
                                className="h-3 w-3 rounded-full bg-[var(--color-ink)]"
                                style={{ opacity: v }}
                            />
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    {...fadeIn(0.25)}
                    className="rounded-md border border-[var(--color-line)] bg-white p-3"
                >
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-subtle)]">
                        graph
                    </div>
                    <svg
                        viewBox="0 0 120 60"
                        className="mt-1 h-14 w-full text-[var(--color-ink)]"
                    >
                        <line x1="20" y1="30" x2="60" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                        <line x1="20" y1="30" x2="60" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                        <line x1="60" y1="12" x2="100" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                        <line x1="60" y1="48" x2="100" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                        {nodes.map(([x, y], i) => (
                            <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="5"
                                fill="currentColor"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                            />
                        ))}
                    </svg>
                </motion.div>
            </div>
            <motion.div
                {...fadeIn(0.7)}
                className="flex items-center gap-2 text-[12px] text-[var(--color-ink-subtle)]"
            >
                <span className="h-px flex-1 bg-[var(--color-line)]" />
                <span className="font-mono">fused</span>
                <span className="h-px flex-1 bg-[var(--color-line)]" />
            </motion.div>
            <div className="space-y-1.5">
                {results.map(([title, score], i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.15 }}
                        className="flex items-center justify-between rounded-md border border-[var(--color-line)] bg-white px-3 py-2"
                    >
                        <span className="truncate text-[13px] text-[var(--color-ink)]">
                            {title}
                        </span>
                        <span className="ml-2 shrink-0 font-mono text-[12px] text-[var(--color-ink-muted)]">
                            {score}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ── playwLeft: browser automation steps ──────────────────────────────── */
function PlaywLeftViz() {
    const steps = [
        { a: "goto", d: "example.com" },
        { a: "fill", d: "input[q] ← 'XGEN'" },
        { a: "press", d: "Enter" },
        { a: "extract", d: ".result h3" },
    ];
    return (
        <div className="overflow-hidden rounded-md border border-[var(--color-line)] bg-white">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line)]" />
                <span className="ml-2 truncate rounded-sm bg-white px-2 py-0.5 font-mono text-[11px] text-[var(--color-ink-subtle)]">
                    https://example.com
                </span>
            </div>
            <div className="space-y-2 p-3">
                {steps.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.3 }}
                        className="flex items-center gap-2 font-mono text-[12.5px]"
                    >
                        <span className="w-16 shrink-0 rounded-sm bg-[var(--color-ink)] px-1.5 py-0.5 text-center text-[11px] text-white">
                            {s.a}
                        </span>
                        <span className="truncate text-[var(--color-ink-muted)]">
                            {s.d}
                        </span>
                    </motion.div>
                ))}
                <motion.div
                    {...fadeIn(1.4)}
                    className="mt-1 rounded-md bg-[var(--color-surface-alt)] px-3 py-2 text-[12.5px] text-[var(--color-ink)]"
                >
                    → &quot;XGEN Agentic AI Platform&quot;
                </motion.div>
            </div>
        </div>
    );
}

/* ── Default: category-themed pulse (fallback for any featured tool) ───── */
function DefaultViz({ tool }: { tool: Tool }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="relative flex h-24 w-24 items-center justify-center">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="absolute rounded-full border border-[var(--color-line)]"
                        initial={{ width: 32, height: 32, opacity: 0 }}
                        animate={{
                            width: [32, 96],
                            height: [32, 96],
                            opacity: [0.6, 0],
                        }}
                        transition={{
                            delay: i * 0.6,
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                ))}
                <span className="relative h-3 w-3 rounded-full bg-[var(--color-ink)]" />
            </div>
            <div className="text-center">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    {tool.category}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-[var(--color-ink)]">
                    {tool.name}
                </div>
            </div>
        </div>
    );
}

