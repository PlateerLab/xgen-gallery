import Link from "next/link";
import { ArrowRight, ArrowUpRight, Terminal, Play } from "lucide-react";
import { TOOLS, type ToolCategory } from "@/lib/tools";
import { SITE } from "@/lib/site";

/**
 * 홈 오픈소스 신뢰 섹션 — 연구소가 "연구를 오픈소스로 증명한다"는 서사의 핵심 자산.
 * 11개 프로덕션급 파이썬 라이브러리를 카테고리·설치 명령과 함께 앞세운다.
 * (지표는 실측만: 라이브러리 수·카테고리·MIT·pip·브라우저 실행 — 스타/설치수 등 미검증 수치 금지)
 */

const CAT_LABEL: Record<ToolCategory, string> = {
    ingestion: "Ingestion",
    knowledge: "Knowledge",
    agent: "Agent",
    utility: "Utility",
};
const CAT_STYLE: Record<ToolCategory, string> = {
    ingestion: "bg-[#eaf1ff] text-[#2461d8]",
    knowledge: "bg-[#efeaff] text-[#6d4bd8]",
    agent: "bg-[#e7f7f0] text-[#1f9d6b]",
    utility: "bg-[var(--color-surface-alt)] text-[var(--color-ink-muted)]",
};

const CAT_ORDER: ToolCategory[] = ["ingestion", "knowledge", "agent", "utility"];

// 홈에는 전체를 나열하지 않고 카테고리별 대표 라이브러리 3종만 앞세운다(전체는 갤러리에서).
const FEATURED_IDS = ["contextifier", "synaptic-memory", "xgen-harness"];

export function HomeOpenSource() {
    const catCount = CAT_ORDER.map((c) => ({
        c,
        n: TOOLS.filter((t) => t.category === c).length,
    })).filter((x) => x.n > 0);
    const featured = FEATURED_IDS.flatMap((id) =>
        TOOLS.filter((t) => t.id === id),
    );

    const stats: { k: string; v: string }[] = [
        { k: "오픈소스 라이브러리", v: `${TOOLS.length}종` },
        { k: "카테고리", v: `${catCount.length}개 영역` },
        { k: "라이선스", v: "MIT" },
        { k: "설치", v: "pip" },
    ];

    return (
        <section
            id="open-source"
            className="scroll-mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
        >
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Open Source
                        </p>
                        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
                            연구를 오픈소스로 증명합니다
                        </h2>
                        <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            Plateer Labs는 XGEN을 떠받치는 기술을 프로덕션급 파이썬
                            라이브러리로 공개합니다. 모두 MIT 라이선스로 자유롭게 쓰고,
                            <code className="mx-1 rounded bg-[var(--color-surface-alt)] px-1.5 py-0.5 font-mono text-[13px] text-[var(--color-ink)]">
                                pip
                            </code>
                            로 설치하며, 브라우저 갤러리에서 바로 실행해볼 수 있습니다.
                        </p>
                    </div>
                    <Link
                        href={SITE.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-none items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        GitHub에서 보기
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* 실측 신뢰 지표 — 미검증 수치(스타/설치수) 없이 사실만 */}
                <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {stats.map((s) => (
                        <div
                            key={s.k}
                            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-4"
                        >
                            <dt className="text-[13px] font-medium text-[var(--color-ink-subtle)]">
                                {s.k}
                            </dt>
                            <dd className="mt-1 text-[22px] font-bold tracking-tight text-[var(--color-ink)]">
                                {s.v}
                            </dd>
                        </div>
                    ))}
                </dl>

                {/* 카테고리 분포 — 전체를 나열하지 않고 영역별 개수로 폭을 전달 */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    {catCount.map((x) => (
                        <span
                            key={x.c}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold ${CAT_STYLE[x.c]}`}
                        >
                            {CAT_LABEL[x.c]}
                            <span className="opacity-70">{x.n}</span>
                        </span>
                    ))}
                </div>

                {/* 대표 라이브러리 3종 — 전체는 갤러리에서. 각 카드는 상세(/tool/<id>)로 */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((t) => (
                        <Link
                            key={t.id}
                            href={`/tool/${t.id}`}
                            className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                    {t.name}
                                </h3>
                                <span
                                    className={`inline-flex flex-none items-center rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${CAT_STYLE[t.category]}`}
                                >
                                    {CAT_LABEL[t.category]}
                                </span>
                            </div>
                            <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.tagline}
                            </p>
                            <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-line)] pt-3">
                                <Terminal className="h-3.5 w-3.5 flex-none text-[var(--color-ink-subtle)]" />
                                <code className="truncate font-mono text-[12.5px] text-[var(--color-ink-muted)]">
                                    {t.install}
                                </code>
                                {t.hasDemo && (
                                    <span className="ml-auto inline-flex flex-none items-center gap-1 rounded-full bg-[#e7f7f0] px-2 py-0.5 text-[11px] font-semibold text-[#1f9d6b]">
                                        <Play className="h-2.5 w-2.5" />
                                        Live
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8">
                    <Link
                        href="/library-gallery"
                        className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                    >
                        {TOOLS.length}개 라이브러리 전체 보기 · 갤러리에서 바로 실행
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
