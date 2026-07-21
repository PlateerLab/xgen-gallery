import Link from "next/link";
import {
    ShieldCheck,
    Scale,
    ScrollText,
    Activity,
    Brain,
    Check,
    ArrowRight,
} from "lucide-react";
import { getAllPosts } from "@/lib/blog";

/**
 * 인증·품질 — XGEN의 국가 공인 품질/신뢰성 인증(GS인증 1등급, AI-MASTER).
 * 제품 신뢰의 근거라 Product 페이지(/product#certification)에 렌더한다.
 * (구 /solutions#certification 에서 이전 — Product 메뉴가 다른 그룹으로 점프하던 문제 해소)
 */
export function CertificationQuality() {
    // GS인증 태그가 붙은 인사이트 블로그 글(여정 시리즈 + 관련 글)을 최신순으로
    // 최대 3개만 노출 — 나머지는 하단 "전체 보기"로 연결.
    const gsPosts = getAllPosts()
        .filter((p) => p.tags.includes("GS인증"))
        .slice(0, 3);
    // AI-MASTER 인증 — 고객 눈높이 요약. 시험 계정·내부 파일·계약 로지스틱스 등
    // 사내 정보는 제외하고, 대외 공개 가능한 인증 성격·심사 방식·진행 상태만 담는다.
    const AI_MASTER_INFO: {
        icon: typeof ShieldCheck;
        title: string;
        body: string;
    }[] = [
        {
            icon: Scale,
            title: "국제표준 기반 AI 신뢰성 인증",
            body: "AI-MASTER는 한국인공지능산업협회(AIIA)가 주관하는 민간 AI 신뢰성 인증으로, EU Trustworthy AI 원칙과 ISO/IEC 국제표준을 기준으로 AI의 신뢰성·윤리성·강건성을 평가합니다",
        },
        {
            icon: ScrollText,
            title: "문서 심사 · 기능 시험 병행",
            body: "AI 거버넌스 체계를 담은 관리·개발 문서를 심사하고, 실제 동작을 확인하는 기능 시험을 함께 진행합니다. 63개 정량 항목으로 신뢰성 전반을 점검합니다",
        },
        {
            icon: Activity,
            title: "현재 진행 상황",
            body: "2026년 6월 인증 시험에 착수해 문서 심사와 기능 시험을 진행하고 있습니다. 정상 수행 시 약 13주에 걸친 평가를 거칩니다",
        },
    ];
    return (
        <div className="space-y-10">
            {/* 인덱스 (목차) — 두 인증을 색으로 구분해 바로 이동 */}
            <nav aria-label="인증·품질 목차" className="grid gap-3 sm:grid-cols-2">
                <a
                    href="#cert-ai-master"
                    className="group flex items-center gap-3 overflow-hidden rounded-xl border border-y-[#bfe9e0] border-r-[#bfe9e0] border-l-4 border-l-[#0f9d8f] bg-gradient-to-br from-[#f2fbf9] to-white px-5 py-4 transition hover:shadow-md"
                >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#0f9d8f] font-mono text-[15px] font-bold text-white shadow-sm">
                        01
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-bold text-[var(--color-ink)]">
                            AI-MASTER
                        </span>
                        <span className="mt-0.5 block text-[13px] text-[#0b7d72]">
                            AI 신뢰성 인증 · 진행 중
                        </span>
                    </span>
                    <ArrowRight className="h-4 w-4 flex-none text-[#0f9d8f] transition group-hover:translate-x-0.5" />
                </a>
                <a
                    href="#cert-gs"
                    className="group flex items-center gap-3 overflow-hidden rounded-xl border border-y-[#bae6fd] border-r-[#bae6fd] border-l-4 border-l-[#0284c7] bg-gradient-to-br from-[#eff8ff] to-white px-5 py-4 transition hover:shadow-md"
                >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#0284c7] font-mono text-[15px] font-bold text-white shadow-sm">
                        02
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-bold text-[var(--color-ink)]">
                            GS인증 · Good Software
                        </span>
                        <span className="mt-0.5 block text-[13px] text-[#0369a1]">
                            SW 품질인증 · 1등급 획득
                        </span>
                    </span>
                    <ArrowRight className="h-4 w-4 flex-none text-[#0284c7] transition group-hover:translate-x-0.5" />
                </a>
            </nav>

            {/* 01 — AI-MASTER (AI 신뢰성 인증) — 틸 패널 */}
            <section id="cert-ai-master" className="scroll-mt-24">
                <div className="overflow-hidden rounded-2xl border border-[#bfe9e0] bg-white shadow-[0_1px_2px_rgba(15,157,143,0.06)]">
                    <div className="flex flex-wrap items-center gap-4 border-b border-[#bfe9e0] bg-gradient-to-r from-[#eefaf7] to-white px-6 py-5">
                        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#0f9d8f] font-mono text-[18px] font-bold text-white shadow-sm">
                            01
                        </span>
                        <div className="min-w-0">
                            <p className="text-[13px] font-bold tracking-tight text-[#0b7d72]">
                                AI 신뢰성 인증
                            </p>
                            <h3 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                AI-MASTER
                            </h3>
                        </div>
                        <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0f9d8f]" />
                            인증 시험 진행 중
                        </span>
                    </div>

                    <div className="space-y-6 p-6 sm:p-7">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-xl border border-[#bfe9e0] bg-[#effbf8] text-center">
                                <Brain className="h-6 w-6 text-[#0f9d8f]" />
                                <span className="mt-1 text-[13px] font-bold text-[var(--color-ink)]">
                                    AI-MASTER
                                </span>
                            </div>
                            <p className="max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                XGEN Agentic AI Platform은 국제표준 기반 AI 신뢰성 인증인
                                AI-MASTER 시험을 받고 있습니다. 문서 심사와 기능 시험을
                                병행해 AI의 신뢰성·투명성·강건성을 제3자 시험기관이
                                검증합니다
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
                            {AI_MASTER_INFO.map((c) => (
                                <div
                                    key={c.title}
                                    className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f9d8f]/10 text-[#0f9d8f]">
                                            <c.icon className="h-5 w-5" />
                                        </span>
                                        <h4 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {c.title}
                                        </h4>
                                    </div>
                                    <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 02 — GS인증 (Good Software) — 골드 패널 */}
            <section id="cert-gs" className="scroll-mt-24">
                <div className="overflow-hidden rounded-2xl border border-[#bae6fd] bg-white shadow-[0_1px_2px_rgba(2,132,199,0.06)]">
                    <div className="flex flex-wrap items-center gap-4 border-b border-[#bae6fd] bg-gradient-to-r from-[#eff8ff] to-white px-6 py-5">
                        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#0284c7] font-mono text-[18px] font-bold text-white shadow-sm">
                            02
                        </span>
                        <div className="min-w-0">
                            <p className="text-[13px] font-bold tracking-tight text-[#0369a1]">
                                SW 품질인증
                            </p>
                            <h3 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                GS인증 · Good Software
                            </h3>
                        </div>
                        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#cce6d7] bg-[#ecf8f1] px-3 py-1 text-[13px] font-semibold text-[#1f9d57]">
                            <Check className="h-3.5 w-3.5" />
                            GS 1등급 획득
                        </span>
                    </div>

                    <div className="space-y-6 p-6 sm:p-7">
                        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                            <p className="max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                XGEN이 GS(Good Software) 인증 1등급(최고 등급)을
                                획득했습니다 — 국가 공인 제3자 시험으로 품질을
                                입증했습니다
                            </p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/gs-seal.png"
                                alt="GS(Good Software) 인증 1등급 마크"
                                className="mx-auto w-44 sm:mx-0"
                            />
                        </div>

                        {gsPosts.length > 0 && (
                            <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
                                <h4 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                    GS 인증 관련 아티클
                                </h4>
                                <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    GS 인증 준비부터 시험·심사까지의 과정을 인사이트 블로그에 기록했습니다
                                </p>
                                <ul className="mt-4 divide-y divide-[var(--color-line)]">
                                    {gsPosts.map((p) => (
                                        <li key={p.slug}>
                                            <Link
                                                href={`/blog/${p.slug}`}
                                                className="group flex items-center justify-between gap-4 py-3"
                                            >
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-subtle)]">
                                                        <span className="rounded-full bg-[#0284c7]/12 px-2 py-0.5 font-semibold text-[#0369a1]">
                                                            {p.category}
                                                        </span>
                                                        <time dateTime={p.date}>
                                                            {p.date.replaceAll("-", ".")}
                                                        </time>
                                                    </div>
                                                    <p className="mt-1 truncate text-[15.5px] font-semibold text-[var(--color-ink)] transition group-hover:text-[#0369a1]">
                                                        {p.title}
                                                    </p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#0369a1]" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/blog"
                                    className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0369a1] transition hover:text-[#075985]"
                                >
                                    인사이트 블로그 전체 보기
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
