"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TOOLS, type Tool } from "@/lib/tools";
import { cn } from "@/lib/cn";
import { useI18n } from "@/components/i18n-provider";

const SLIDE_DURATION = 7000;

/**
 * 히어로·데모 일러스트 안의 문구. 도구 자체의 이름·카테고리는 lib/tools.ts 가
 * 영문으로 들고 있고, 여기서는 화면 카피와 예시 데이터만 로케일에 맞춘다.
 */
const COPY = {
    ko: {
        lead: "XGEN을 떠받치는 오픈소스 라이브러리. pip로 설치하거나, 모든 도구를 지금 여기 브라우저에서 체험하세요.",
        prev: "이전",
        next: "다음",
        googer: [
            ["Machine Learning with Python — scikit-learn", "분류, 회귀, 클러스터링 예제 포함."],
            ["TensorFlow 튜토리얼 — 초보자를 위한 ML", "딥러닝 기본부터 응용까지."],
            ["PyTorch 공식 튜토리얼", "기초부터 고급 주제까지."],
        ],
        docInstruction: "제목을 \u20182026 사업계획\u2019으로 바꾸고 첫 문단을 굵게",
        omnifuse: [
            ["환불 정책 — 배송 지연 시 전액 환불", "0.88"],
            ["배송 지연 보상 규정", "0.71"],
            ["문의 유형 — 지연/환불", "0.64"],
        ],
    },
    en: {
        lead: "The open-source libraries behind XGEN. Install them with pip, or try every tool right here in your browser.",
        prev: "Previous",
        next: "Next",
        googer: [
            [
                "Machine Learning with Python — scikit-learn",
                "Classification, regression, and clustering examples included.",
            ],
            [
                "TensorFlow tutorials — ML for beginners",
                "From deep-learning basics through to applications.",
            ],
            ["PyTorch official tutorials", "From the basics to advanced topics."],
        ],
        docInstruction:
            "Change the title to \u20182026 Business Plan\u2019 and set the first paragraph in bold",
        omnifuse: [
            ["Refund policy — full refund when delivery is delayed", "0.88"],
            ["Delivery-delay compensation rules", "0.71"],
            ["Inquiry type — delay / refund", "0.64"],
        ],
    },
} as const;

// 키비주얼 = '가장 최신 라이브러리'를 첫 슬라이드로, 이어서 카테고리별 최신 1개씩(다양성).
// 최신 판별: addedAt(있으면 날짜) 우선, 없으면 TOOLS 배열 순서(뒤일수록 최신)로 폴백.
// → 새 라이브러리를 배열 끝에 추가하거나 addedAt을 지정하면 자동으로 맨 앞에 노출된다.
const CATEGORY_ORDER: Tool["category"][] = [
    "ingestion",
    "knowledge",
    "agent",
    "utility",
];
function featuredTools(): Tool[] {
    const items = TOOLS.map((tool, idx) => ({ tool, idx }));
    const recency = (x: { tool: Tool; idx: number }) =>
        x.tool.addedAt ? Date.parse(x.tool.addedAt) : x.idx;

    // 카테고리별 최신 1개
    const latest = new Map<Tool["category"], { tool: Tool; idx: number }>();
    for (const x of items) {
        const cur = latest.get(x.tool.category);
        if (!cur || recency(x) >= recency(cur)) latest.set(x.tool.category, x);
    }
    // 전체 최신 = 키비주얼 첫 슬라이드
    const newest = [...items].sort((a, b) => recency(b) - recency(a))[0];
    if (!newest) return [];

    // 나머지 = 다른 카테고리들의 최신 1개(최신순), 중복 제외
    const rest = CATEGORY_ORDER.map((c) => latest.get(c))
        .filter((x): x is { tool: Tool; idx: number } => Boolean(x))
        .filter((x) => x.tool.id !== newest.tool.id)
        .sort((a, b) => recency(b) - recency(a));

    return [newest, ...rest].map((x) => x.tool);
}

// 'NEW' 배지 노출 기준 — addedAt이 최근 60일 이내인 라이브러리에만 표시(그 이후 자동 소멸).
const NEW_WINDOW_MS = 60 * 24 * 60 * 60 * 1000;
function isRecent(tool: Tool, now: number): boolean {
    if (!tool.addedAt) return false;
    const t = Date.parse(tool.addedAt);
    return !Number.isNaN(t) && now >= t && now - t < NEW_WINDOW_MS;
}

/**
 * 라이브러리 키비주얼 — 상단(다크) 히어로 전체를 렌더한다.
 * 좌: 페이지 키 메시지(Library Gallery) + 그 아래 현재 슬라이드 캡션·컨트롤,
 * 우: 카테고리별 '가장 최근 추가된' 라이브러리의 밝은 일러스트 카드.
 */
export function LivePreview() {
    const { t, locale } = useI18n();
    const c = COPY[locale];
    const featured = useMemo(featuredTools, []);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    // NEW 배지는 마운트 후에만 계산(현재시각 의존) — SSR/CSR 하이드레이션 불일치 방지.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

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
    const showNew = mounted && isRecent(tool, Date.now());
    const go = (n: number) => setIndex((n + featured.length) % featured.length);

    const arrowCls =
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white";

    return (
        <div
            className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* 좌: 키 메시지 → 그 아래 캡션 + 컨트롤 */}
            <div className="order-2 md:order-1">
                <p className="text-[15px] font-semibold tracking-tight text-[#fcd34d]">
                    Open Source · Library Gallery
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
                    Library Gallery
                </h1>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/65">
                    {c.lead}
                </p>

                {/* 키 메시지 아래: 현재 슬라이드 캡션 */}
                <motion.div
                    key={`cap-${cur}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-6"
                >
                    {showNew && (
                        <span className="rounded-full bg-[#fcd34d] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0b1220]">
                            New
                        </span>
                    )}
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-wider text-[#7dd3fc]">
                        {tool.category}
                    </span>
                    <span className="text-[19px] font-bold tracking-tight text-white">
                        {tool.name}
                    </span>
                    <Link
                        href={`/tool/${tool.id}`}
                        className="group ml-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7dd3fc]"
                    >
                        {t.live.try}
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>

                {/* 컨트롤(prev/next + dots) */}
                {featured.length > 1 && (
                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            aria-label={c.prev}
                            onClick={() => go(cur - 1)}
                            className={arrowCls}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label={c.next}
                            onClick={() => go(cur + 1)}
                            className={arrowCls}
                        >
                            <ChevronRight className="h-4 w-4" />
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
                                            ? "w-6 bg-white"
                                            : "w-1.5 bg-white/30 hover:bg-white/60",
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 우: 일러스트(밝은 서피스 카드) */}
            <div className="order-1 md:order-2">
                {/* 다크 디바이스 프레임 — 코드 어시스턴트 히어로와 같은 어휘로 배경에 녹아들게.
                    (일러스트는 밝은 서피스 전제라 안쪽에 밝은 '스크린'으로 유지) */}
                <div
                    key={`viz-${cur}`}
                    className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0b1020]/70 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md"
                >
                    {/* 크롬 바 — 맥 도트 + 라이브러리명 + (신규 New / 카테고리) */}
                    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                        <span className="ml-2 rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[12px] text-white/70">
                            {tool.name}
                        </span>
                        {showNew ? (
                            <span className="ml-auto rounded-full bg-[#fcd34d] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0b1220]">
                                New
                            </span>
                        ) : (
                            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#7dd3fc]/30 bg-[#7dd3fc]/10 px-2.5 py-1 text-[11.5px] font-semibold text-[#7dd3fc]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
                                {tool.category}
                            </span>
                        )}
                    </div>
                    {/* 스크린 — 은은한 톤의 '설계 캔버스'(도트 그리드 + 상단 글로우)로 빈 느낌 제거 */}
                    <div className="p-4 md:p-5">
                        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#eef2fb] via-[#e8eef8] to-[#dbe4f2] p-5 ring-1 ring-white/50 md:p-6">
                            {/* 도트 그리드 텍스처 */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle,#bcc7db_1px,transparent_1px)] [background-size:16px_16px]"
                            />
                            {/* 상단 소프트 글로우 — 스크린에 깊이감 */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-2/3 [background:radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.75),transparent_70%)]"
                            />
                            <div className="relative w-full max-w-md">
                                <Visual tool={tool} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    const { locale } = useI18n();
    const results = COPY[locale].googer.map(([title, body]) => ({ title, body }));
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
    const { locale } = useI18n();
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
                    &quot;{COPY[locale].docInstruction}&quot;
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
    const { locale } = useI18n();
    const nodes: [number, number][] = [
        [20, 30],
        [60, 12],
        [60, 48],
        [100, 30],
    ];
    const results: readonly (readonly [string, string])[] = COPY[locale].omnifuse;
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

