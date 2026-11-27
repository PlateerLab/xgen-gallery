"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
    ArrowRight,
    ArrowDown,
    Check,
    ChevronRight,
    Play,
    RefreshCw,
    Search,
    Sparkles,
    FileText,
    RotateCcw,
    ShieldCheck,
    MessageSquareText,
    Activity,
    ArrowLeftRight,
    TrendingUp,
    ScrollText,
} from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { SectionHead, SECTION_PAD, SECTION_BODY_GAP } from "@/components/product-xgen/section-head";

/**
 * /product/xgen 1depth 개요 — 「XGEN 소개서(2026.11.25)」 내용을
 * 비아이매트릭스 TRINITY 랜딩의 흐름으로 다시 배치한 섹션 묶음.
 *
 *   TRINITY                         → XGEN (소개서 쪽수)
 *   문제 제기                        → The Challenge  (p.9  문제점·원인)
 *   Paradigm Shift BEFORE/AFTER     → Paradigm Shift (p.8  생성형 AI vs AI 에이전트)
 *   어두운 전환 선언                  → AX Evolution Model (p.10 4단계)
 *   제품 흐름 5단계 + 실제 화면        → Platform (p.11, p.13~17 STAGE 01~04 + Foundation)
 *   Why 3가지                        → Why XGEN (p.24·25·32)
 *   Extended Value                  → 자기개선 루프 (p.17·23)
 *   Scenarios 업종 탭                → 고객사례 (p.26~29)
 *   (소개서 고유)                     → 도입 방식·다음 단계 (p.31·37·39)
 *   Product Overview 영상            → 소개 영상
 *
 * 원칙
 * - 소개서에 있는 사실만 옮기고, 단정적인 표현은 조건·범위를 붙여 완화한다.
 * - 고객사명은 사이트에 공개된 사례만 실명(제주은행). 나머지는 업종으로 표기한다.
 * - 고객 제안서 전용 장(코레일·KT 연동)과 시장 전망 수치는 싣지 않는다.
 * - 각 섹션 끝에 2depth(/product/xgen/<view>)·3depth(상세 페이지) 링크를 둔다.
 */

type Txt = { ko: string; en: string };
const T = (en: boolean, x: Txt) => (en ? x.en : x.ko);

/* ---------------- 공통: 이어서 보기 링크 ---------------- */

type DeepLink = { label: Txt; href: string };

function NextLinks({ locale, links, dark = false, center = false }: { locale: Locale; links: DeepLink[]; dark?: boolean; center?: boolean }) {
    const en = locale === "en";
    return (
        <div className={cn("mt-10 flex flex-wrap items-center gap-2", center && "justify-center")}>
            <span className={cn("mr-1 text-[13px] font-semibold", dark ? "text-white/55" : "text-[var(--color-ink-subtle)]")}>
                {en ? "Learn more" : "자세히 보기"}
            </span>
            {links.map((l) => (
                <Link
                    key={l.href}
                    href={localeHref(locale, l.href)}
                    className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold transition",
                        dark
                            ? "border-white/20 text-white/85 hover:border-white/60 hover:text-white"
                            : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[#2f7bff] hover:text-[#2461d8]",
                    )}
                >
                    {T(en, l.label)}
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
            ))}
        </div>
    );
}

const L = {
    features: { label: { ko: "기능·활용", en: "Features & use" }, href: "/product/xgen/features" },
    security: { label: { ko: "보안·거버넌스", en: "Security & governance" }, href: "/product/xgen/security" },
    technology: { label: { ko: "기술·아키텍처", en: "Technology" }, href: "/product/xgen/technology" },
    adoption: { label: { ko: "도입·지원", en: "Adoption & support" }, href: "/product/xgen/adoption" },
} satisfies Record<string, DeepLink>;

/* ======================================================================
 * 1. The Challenge — 소개서 p.9
 * ==================================================================== */

const CHALLENGE = {
    ko: {
        title: (
            <>
                AI Agent를 도입한 기업은
                <br className="hidden md:block" /> 왜 같은 문제를 다시 마주할까요?
            </>
        ),
        lead: "도입 직후에는 잘 돌아가던 AI도, 데이터와 도구와 모델이 바뀌면 다시 멈춥니다.",
        voicesLabel: "이런 이야기, 낯설지 않으시죠?",
        voices: [
            { who: "현업 담당자", face: "/product/challenge/business.jpg", q: "사내 규정이 바뀌었는데, AI는 아직도 지난 기준으로 답해요.", tag: "바뀐 데이터를 따라가지 못하는 AI" },
            { who: "IT·보안 담당자", face: "/product/challenge/security.jpg", q: "외부 모델은 쓰지 말라는데, 사내 모델로 옮기려니 처음부터 다시 만들어야 해요.", tag: "모델을 바꾸면 처음부터 다시 만드는 Agent" },
            { who: "AX 추진 담당자", face: "/product/challenge/ax-lead.jpg", q: "사내 시스템 하나가 바뀌었을 뿐인데, Agent를 새로 만들어야 했어요.", tag: "연결된 시스템이 바뀌면 멈추는 Agent" },
        ],
        conclusionA: "겉으로는 서로 다른 문제처럼 보이지만, 공통된 원인은",
        conclusionB: "변화에 대응하지 못하는 플랫폼",
        conclusionC: "입니다.",
    },
    en: {
        title: (
            <>
                Why do companies that adopted AI agents
                <br className="hidden md:block" /> keep running into the same problems?
            </>
        ),
        lead: "AI that worked right after launch stalls again once the data, tools and models change.",
        voicesLabel: "Does any of this sound familiar?",
        voices: [
            { who: "Business user", face: "/product/challenge/business.jpg", q: "Our internal policy changed, but the AI still answers by the old rules.", tag: "AI that falls behind when data changes" },
            { who: "IT & security", face: "/product/challenge/security.jpg", q: "We're told not to use external models, but moving to an in-house model means rebuilding from scratch.", tag: "Agents that must be rebuilt when the model changes" },
            { who: "AX lead", face: "/product/challenge/ax-lead.jpg", q: "Only one internal system changed, yet we had to rebuild the agent.", tag: "Agents that stop when connected systems change" },
        ],
        conclusionA: "They look like separate problems, but they share one cause:",
        conclusionB: "a platform that cannot keep up with change",
        conclusionC: ".",
    },
};

/**
 * 말풍선 인물 사진 출처 — Unsplash License(무료·상업 이용 가능). 얼굴 중심 240×240 크롭, public/product/challenge.
 * business  https://unsplash.com/photos/P002vaEJlvk
 * security  https://unsplash.com/photos/KYlqBrKQ-i4
 * ax-lead   https://unsplash.com/photos/pAtA8xe_iVM
 */
export function XgenChallenge({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const c = CHALLENGE[en ? "en" : "ko"];
    return (
        <section className="border-t border-[#d4d4d8] bg-[#e7e7ea]">
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow="The Challenge" title={c.title} lead={c.lead} />

                {/* ① 현장의 말 — 문제점 3개를 담당자의 목소리로 */}
                <p className={`${SECTION_BODY_GAP} text-center text-[15px] font-bold tracking-tight text-[var(--color-ink)]`}>{c.voicesLabel}</p>
                <ol className="mt-6 grid gap-5 lg:grid-cols-3">
                    {c.voices.map((v) => (
                        <li key={v.tag} className="flex flex-col">
                            <div className="relative flex-1 rounded-2xl border border-[var(--color-line)] bg-white px-6 pb-6 pt-5">
                                {/* 직무를 떠올리게 하는 인물 사진 — 실제 고객이 아닌 Unsplash 이미지(출처는 아래 주석) */}
                                <div className="flex items-center justify-center gap-3">
                                    <Image
                                        src={v.face}
                                        alt=""
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 flex-none rounded-full border border-[var(--color-line)] object-cover"
                                    />
                                    <span className="text-[12.5px] font-semibold text-[var(--color-ink-muted)]">{v.who}</span>
                                </div>
                                {/* 한국어는 쉼표 뒤에서 줄을 나눠 말의 호흡대로 읽히게 한다. 영문은 쉼표 앞이 길어 한 단어가 홀로 남으므로 균형 줄바꿈만 쓴다. */}
                                <p className="mt-3 text-center text-[17px] font-bold leading-[1.55] tracking-tight text-[var(--color-ink)] [text-wrap:balance] [word-break:keep-all]">
                                    “{(en ? [v.q] : v.q.split(/(?<=,)\s*/)).map((part, i) => (
                                        <Fragment key={i}>
                                            {i > 0 && <br />}
                                            {part}
                                        </Fragment>
                                    ))}”
                                </p>
                                {/* 말풍선 꼬리 */}
                                <span
                                    aria-hidden
                                    className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-[var(--color-line)] bg-white"
                                />
                            </div>
                            <p className="mt-4 flex items-start justify-center gap-1.5 text-center text-[13.5px] font-semibold text-[#b4232a] [word-break:keep-all]">
                                <ArrowDown className="mt-[3px] h-3.5 w-3.5 flex-none" aria-hidden />
                                {v.tag}
                            </p>
                        </li>
                    ))}
                </ol>

                <p className="mx-auto mt-16 max-w-3xl text-center text-[19px] font-bold leading-[1.5] tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[24px]">
                    {c.conclusionA}<br className="hidden md:block" /> <span className="text-[#2461d8]">{c.conclusionB}</span>
                    {c.conclusionC}
                </p>
            </div>
        </section>
    );
}

/* ======================================================================
 * 2. Paradigm Shift — 소개서 p.8 (생성형 AI vs AI 에이전트)
 * ==================================================================== */

const PARADIGM = {
    ko: {
        title: "답하는 AI에서, 일을 끝내는 AI로",
        lead: "기업이 AI에 기대하는 것이 ‘답변’에서 ‘업무의 완료’로 옮겨 가고 있습니다.",
        before: {
            tag: "BEFORE",
            name: "답변 중심의 생성형 AI",
            windows: ["chat · 새 대화", "drive · 계약서/협력사_2026.pdf", "mail · 법무팀 검토 요청"],
            q: "협력사 계약서에서 위험한 조항 좀 찾아줘",
            a: "일반적으로 위험한 조항은 손해배상, 해지 조건, 책임 제한 등입니다. 원문을 붙여 주시면…",
            after: "파일 찾기·붙여넣기·정리는 다시 사람이",
            points: ["입력에 따라 한 번씩 작업", "최종 결과물 생성에 집중", "사람의 지속적인 개입과 추가 질문이 필요"],
        },
        afterP: {
            tag: "AFTER",
            name: "업무 완료 중심의 AI Agent",
            goal: "협력사 계약서 위험 조항을 검토해 줘",
            badge: "AI AGENT",
            summaryK: "검토 결과",
            summary: "위험 조항 3건 확인 · 손해배상 한도 미설정, 일방 해지 조건",
            nextK: "다음 단계",
            next: "담당자 확인 후 협력사에 회신",
            stepsT: "실행 단계",
            steps: ["사규·계약 규정 검색", "계약서 문서 분석", "검토 리포트 작성"],
            tableT: "위험 조항 리포트",
            cols: ["조항", "위험도"],
            rows: [
                { k: "손해배상 한도", v: 86, lv: "높음" },
                { k: "해지 조건", v: 72, lv: "높음" },
                { k: "자동 갱신", v: 41, lv: "중간" },
            ],
            approvalT: "승인 대기",
            approval: ["리포트 초안 · 자동 실행", "협력사 회신 · 승인 후 실행"],
            points: ["목표를 세부 작업으로 나눠 스스로 처리", "실행 결과를 바탕으로 개선 루프 적용", "판단과 실행은 AI가, 위험한 작업은 승인 후 실행"],
        },
    },
    en: {
        title: "From AI that answers to AI that gets work done",
        lead: "What companies expect from AI is shifting from an answer to a finished task.",
        before: {
            tag: "BEFORE",
            name: "Answer-centric generative AI",
            windows: ["chat · new conversation", "drive · contracts/supplier_2026.pdf", "mail · legal review request"],
            q: "Find the risky clauses in this supplier contract",
            a: "Risky clauses usually involve damages, termination terms and limits of liability. If you paste the text…",
            after: "Finding, pasting and organizing is back on a person",
            points: ["One-off tasks driven by each input", "Focused on producing a final output", "Needs people to keep stepping in and asking again"],
        },
        afterP: {
            tag: "AFTER",
            name: "Task-completion AI agent",
            goal: "Review the risky clauses in the supplier contract",
            badge: "AI AGENT",
            summaryK: "Findings",
            summary: "3 risky clauses · no cap on damages, one-sided termination",
            nextK: "Next step",
            next: "Reply to the supplier after the owner confirms",
            stepsT: "Steps run",
            steps: ["Search internal rules", "Analyze the contract", "Write the review report"],
            tableT: "Clause risk report",
            cols: ["Clause", "Risk"],
            rows: [
                { k: "Damages cap", v: 86, lv: "High" },
                { k: "Termination", v: 72, lv: "High" },
                { k: "Auto-renewal", v: 41, lv: "Medium" },
            ],
            approvalT: "Awaiting approval",
            approval: ["Report draft · runs automatically", "Supplier reply · runs after approval"],
            points: ["Breaks a goal into sub-tasks and works through them", "Applies an improvement loop based on run results", "AI decides and acts; risky actions run after approval"],
        },
    },
};

/** 참고 이미지 ① — 겹친 창 목업의 작은 창 틀 */
function MiniWindow({ label, className, children }: { label: string; className?: string; children?: ReactNode }) {
    return (
        <div className={cn("overflow-hidden rounded-xl border border-[#dfe5ee] bg-white shadow-[0_18px_40px_-24px_rgba(20,40,80,0.35)]", className)}>
            <div className="flex items-center gap-2 border-b border-[#eef1f6] px-3 py-2">
                <span aria-hidden className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#ff6159]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c941]" />
                </span>
                <span className="truncate font-mono text-[11px] text-[#9aa4b5]">{label}</span>
            </div>
            {children}
        </div>
    );
}

function ParadigmColHead({ tag, name, after = false }: { tag: string; name: string; after?: boolean }) {
    return (
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--color-line)] pb-4">
            <span
                className={cn(
                    "rounded-full px-3.5 py-1 font-mono text-[13px] font-bold tracking-widest",
                    after ? "bg-[#e6efff] text-[#2461d8]" : "bg-[#eef1f5] text-[#8a94a6]",
                )}
            >
                {tag}
            </span>
            <span className={cn("text-[19px] font-bold tracking-tight md:text-[21px]", after ? "text-[#2461d8]" : "text-[var(--color-ink-muted)]")}>{name}</span>
        </div>
    );
}

export function XgenParadigm({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const p = PARADIGM[en ? "en" : "ko"];
    const b = p.before;
    const a = p.afterP;
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow="Paradigm Shift" title={p.title} lead={p.lead} />
                <div className={`${SECTION_BODY_GAP} grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-8`}>
                    {/* BEFORE — 따로 노는 창 여러 개를 사람이 오가며 처리 */}
                    <div className="min-w-0">
                        <ParadigmColHead tag={b.tag} name={b.name} />
                        <div aria-hidden className="relative mt-8 pb-2 pr-2 pt-[84px]">
                            <MiniWindow label={b.windows[2]} className="absolute left-0 top-0 h-[220px] w-[74%]">
                                <div className="flex gap-3 p-3">
                                    <div className="w-[22%] space-y-2 pt-1">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div key={i} className={cn("h-2 rounded", i === 1 ? "bg-[#c9d9f7]" : "bg-[#eef1f5]")} />
                                        ))}
                                    </div>
                                    <div className="flex-1 space-y-2 pt-1">
                                        <div className="h-2 w-2/3 rounded bg-[#eef1f5]" />
                                        <div className="h-2 w-1/2 rounded bg-[#eef1f5]" />
                                        <div className="h-2 w-3/4 rounded bg-[#eef1f5]" />
                                    </div>
                                </div>
                            </MiniWindow>
                            <MiniWindow label={b.windows[1]} className="absolute left-[10%] top-[42px] h-[220px] w-[74%]">
                                <div className="flex gap-3 p-4">
                                    <FileText className="h-8 w-8 flex-none text-[#c3cad6]" />
                                    <div className="flex-1 space-y-2 pt-1">
                                        <div className="h-2 w-full rounded bg-[#eef1f5]" />
                                        <div className="h-2 w-5/6 rounded bg-[#eef1f5]" />
                                        <div className="h-2 w-2/3 rounded bg-[#eef1f5]" />
                                    </div>
                                </div>
                            </MiniWindow>
                            <MiniWindow label={b.windows[0]} className="relative ml-[20%]">
                                <div className="flex flex-col gap-2.5 bg-[#fafbfc] p-4">
                                    <p className="self-end rounded-2xl rounded-br-md bg-[#e9edf3] px-3.5 py-2 text-[13px] text-[var(--color-ink)]">{b.q}</p>
                                    <p className="max-w-[92%] rounded-2xl rounded-bl-md border border-[#e3e8ef] bg-white px-3.5 py-2 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">{b.a}</p>
                                    <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-center text-[12px] font-semibold text-[#b4232a]">
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        {b.after}
                                    </p>
                                </div>
                            </MiniWindow>
                        </div>
                        <ul className="mt-8 flex flex-col gap-2.5">
                            {b.points.map((x) => (
                                <li key={x} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                                    <span aria-hidden className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[#b3bccb]" />
                                    {x}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 가운데 원형 화살표 */}
                    <div aria-hidden className="flex items-center justify-center">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#dfe5ee] bg-white text-[var(--color-ink)] shadow-[0_10px_30px_-12px_rgba(20,40,80,0.3)]">
                            <ArrowRight className="hidden h-5 w-5 lg:block" />
                            <ArrowDown className="h-5 w-5 lg:hidden" />
                        </span>
                    </div>

                    {/* AFTER — 목표 한 줄로 시작해 결과·다음 단계까지 한 화면에 */}
                    <div className="min-w-0">
                        <ParadigmColHead tag={a.tag} name={a.name} after />
                        <div aria-hidden className="mt-8 overflow-hidden rounded-2xl border border-[#cddcf7] bg-white shadow-[0_30px_70px_-36px_rgba(36,97,216,0.55)]">
                            <div className="flex items-center gap-3 border-b border-[#e3ebf9] bg-[#f7faff] px-5 py-3.5">
                                <Search className="h-4 w-4 flex-none text-[#2f7bff]" />
                                <span className="truncate text-[14.5px] font-semibold text-[var(--color-ink)]">{a.goal}</span>
                            </div>
                            <div className="p-4 sm:p-5">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cddcf7] bg-[#eef4ff] px-3 py-1 font-mono text-[11.5px] font-bold tracking-widest text-[#2461d8]">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    {a.badge}
                                </span>
                                <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink)] [word-break:keep-all]">
                                    <b>{a.summaryK}:</b> {a.summary}
                                </p>
                                <p className="text-[14px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                                    <b className="text-[var(--color-ink)]">{a.nextK}:</b> {a.next}
                                </p>
                                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1.25fr]">
                                    <div className="rounded-xl border border-[#e6ebf3] p-3.5">
                                        <p className="text-[12.5px] font-bold text-[var(--color-ink)]">{a.stepsT}</p>
                                        <ol className="relative mt-3 flex flex-col gap-3">
                                            <span className="absolute bottom-2 left-[9px] top-2 w-px bg-[#cddcf7]" />
                                            {a.steps.map((st) => (
                                                <li key={st} className="relative flex items-center gap-2.5 text-[12.5px] text-[var(--color-ink-muted)]">
                                                    <span className="inline-flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full bg-[#2f7bff] text-white">
                                                        <Check className="h-3 w-3" />
                                                    </span>
                                                    {st}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                    <div className="rounded-xl border border-[#e6ebf3] p-3.5">
                                        <p className="text-[12.5px] font-bold text-[var(--color-ink)]">{a.tableT}</p>
                                        <div className="mt-2 flex justify-between text-[11px] text-[var(--color-ink-subtle)]">
                                            <span>{a.cols[0]}</span>
                                            <span>{a.cols[1]}</span>
                                        </div>
                                        <ul className="mt-1.5 flex flex-col gap-2">
                                            {a.rows.map((r) => (
                                                <li key={r.k} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[12px]">
                                                    <span className="truncate text-[var(--color-ink)]">{r.k}</span>
                                                    <span className={cn("font-bold", r.v > 60 ? "text-[#d03a3a]" : "text-[#c27a00]")}>{r.lv}</span>
                                                    <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-[#eef1f6]">
                                                        <span className={cn("block h-full rounded-full", r.v > 60 ? "bg-[#2f7bff]" : "bg-[#9cbcf5]")} style={{ width: `${r.v}%` }} />
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-3 rounded-xl border border-[#e6ebf3] p-3.5">
                                    <p className="text-[12.5px] font-bold text-[var(--color-ink)]">{a.approvalT}</p>
                                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                                        {a.approval.map((x, i) => (
                                            <li key={x} className="flex items-center gap-2 text-[12.5px] text-[var(--color-ink-muted)]">
                                                {i === 0 ? (
                                                    <span className="inline-flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full bg-[#e6f6ee] text-[#0f7a4a]">
                                                        <Check className="h-3 w-3" />
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full bg-[#fff3df] text-[#b06a00]">
                                                        <ShieldCheck className="h-3 w-3" />
                                                    </span>
                                                )}
                                                {x}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ul className="mt-8 flex flex-col gap-2.5">
                            {a.points.map((x) => (
                                <li key={x} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink)] [word-break:keep-all]">
                                    <Check className="mt-1 h-4 w-4 flex-none text-[#2f7bff]" aria-hidden />
                                    {x}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ======================================================================
 * 3. AX Evolution Model — 소개서 p.10 (어두운 전환 섹션)
 * ==================================================================== */

const EVOLUTION = {
    ko: {
        title: (
            <>
                결국, AX의 핵심은 ‘도입’이 아니라
                <br className="hidden md:block" /> <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">‘변화 대응’</span>입니다
            </>
        ),
        lead: "기업의 경쟁력은 AI를 얼마나 잘 도입했는지보다, 도입한 AI를 업무 변화에 맞춰 얼마나 잘 발전시키는지에 달려 있습니다.",
        stages: [
            { en: "Assist", ko: "이해", items: ["문서를 이해한다", "지식을 검색한다", "질문에 답한다"], tech: "RAG · Knowledge · Search" },
            { en: "Augment", ko: "실행", items: ["Tool을 연결한다", "Workflow를 실행한다", "업무를 대신 수행한다"], tech: "Workflow · MCP · API" },
            { en: "Autonomous", ko: "협업", items: ["여러 Agent가 역할을 나눈다", "업무를 자동 분배한다", "결과를 통합한다"], tech: "Planning · Routing · Multi-Agent" },
            { en: "Self-Evolving", ko: "진화", items: ["도구·모델을 찾고 만든다", "스스로 환경을 고친다", "지속적으로 성능을 개선한다"], tech: "Geny · Model Router · Evaluation" },
        ],
        foot: "XGEN은 네 단계를 하나의 플랫폼에서 이어 갈 수 있도록 설계했습니다.",
    },
    en: {
        title: (
            <>
                In the end, AX is not about adoption —
                <br className="hidden md:block" /> it is about <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">adapting to change</span>
            </>
        ),
        lead: "Competitiveness depends less on how well a company adopted AI and more on how well it develops that AI as the work changes.",
        stages: [
            { en: "Assist", ko: "Understand", items: ["Understands documents", "Searches knowledge", "Answers questions"], tech: "RAG · Knowledge · Search" },
            { en: "Augment", ko: "Execute", items: ["Connects tools", "Runs workflows", "Performs tasks on your behalf"], tech: "Workflow · MCP · API" },
            { en: "Autonomous", ko: "Collaborate", items: ["Agents split roles", "Distributes work automatically", "Combines the results"], tech: "Planning · Routing · Multi-Agent" },
            { en: "Self-Evolving", ko: "Evolve", items: ["Finds and builds tools and models", "Adjusts its own setup", "Keeps improving performance"], tech: "Geny · Model Router · Evaluation" },
        ],
        foot: "XGEN is designed so the four stages continue on one platform.",
    },
};

/* 카드 엠블럼 — 단계마다 의미를 담은 선 도형을 번호 오른쪽에 작은 상징으로 둔다(글자와 겹치지 않음).
   01 이해: 문서 줄과 점 격자 / 02 실행: 도구를 잇는 회로선 / 03 협업: 여러 노드가 이어진 네트워크 /
   04 진화: 바깥으로 넓어지는 궤도와 상승 화살표. 단계가 오를수록 도형이 복잡해진다. */
function EvoPattern({ i }: { i: number }) {
    // 밝은 그레이 카드 위 — 진한 블루 선, 점 속은 카드 바탕색
    const stroke = "#2563eb";
    const dot = "#eef1f6";
    const common = { fill: "none", stroke, strokeWidth: 1.5, vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    return (
        <svg
            aria-hidden
            viewBox="0 0 180 180"
            className="pointer-events-none h-[72px] w-[72px] flex-none opacity-70"
        >
            {i === 0 && (
                <g {...common}>
                    {Array.from({ length: 6 }).map((_, r) =>
                        Array.from({ length: 6 }).map((__, c) => <circle key={`${r}-${c}`} cx={30 + c * 26} cy={14 + r * 26} r={1.6} fill={stroke} stroke="none" />),
                    )}
                    <rect x="82" y="30" width="62" height="80" rx="3" />
                    <path d="M94 50h38M94 62h38M94 74h26M94 86h32" />
                    <circle cx="138" cy="104" r="14" />
                    <path d="M148 114l12 12" strokeWidth={2} />
                </g>
            )}
            {i === 1 && (
                <g {...common}>
                    <path d="M20 40h50v40h44V40h56M20 120h34V80M114 80v60h46M70 80v70" />
                    {[
                        [70, 40], [70, 80], [114, 40], [114, 80], [54, 80], [114, 140], [70, 150], [160, 40],
                    ].map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} fill={dot} />
                    ))}
                    <rect x="128" y="94" width="34" height="24" rx="4" />
                    <path d="M138 106l5 5 9-10" />
                </g>
            )}
            {i === 2 && (
                <g {...common}>
                    {(() => {
                        const n = [
                            [120, 40], [160, 70], [84, 78], [140, 116], [60, 30], [100, 140], [164, 150], [40, 100],
                        ];
                        const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 4], [2, 4], [3, 5], [3, 6], [2, 7], [5, 7], [1, 6]];
                        return (
                            <>
                                {edges.map(([a, b]) => (
                                    <line key={`${a}-${b}`} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} />
                                ))}
                                {n.map(([x, y], k) => (
                                    <circle key={k} cx={x} cy={y} r={k < 4 ? 7 : 4.5} fill={dot} />
                                ))}
                            </>
                        );
                    })()}
                </g>
            )}
            {i === 3 && (
                <g {...common}>
                    {[22, 44, 66, 88, 110, 132].map((r) => (
                        <circle key={r} cx="150" cy="30" r={r} strokeDasharray={r % 44 === 0 ? "3 5" : undefined} />
                    ))}
                    <path d="M54 130c26-4 46-24 56-54" strokeWidth={2} />
                    <path d="M100 78l10-6 4 12" strokeWidth={2} />
                    <circle cx="150" cy="30" r="6" fill={stroke} stroke="none" />
                </g>
            )}
        </svg>
    );
}

export function XgenEvolutionModel({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const e = EVOLUTION[en ? "en" : "ko"];
    /* 카드 순차 등장(반복) — 목록이 화면에 보이는 동안 01→04 순서로 한 장씩 나타나고,
       04까지 모이면 잠시 멈췄다가 모두 사라진 뒤 01부터 다시 시작한다. 화면을 벗어나면 멈추고 처음으로 돌아간다.
       동작 줄이기 설정이면 움직임 없이 네 장 모두 보인다. */
    const listRef = useRef<HTMLOListElement>(null);
    const [count, setCount] = useState(0);
    const [inView, setInView] = useState(false);
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            setReduced(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                const on = entries.some((x) => x.isIntersecting);
                setInView(on);
                if (!on) setCount(0);
            },
            { threshold: 0.25 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        if (reduced || !inView) return;
        const total = e.stages.length;
        // 0장: 사라짐(전환 700ms)이 끝난 뒤 01 등장 / 한 장씩 간격 / 다 모이면 잠시 유지
        const wait = count === 0 ? 900 : count < total ? 520 : 2600;
        const t = window.setTimeout(() => setCount(count < total ? count + 1 : 0), wait);
        return () => window.clearTimeout(t);
    }, [count, inView, reduced, e.stages.length]);
    return (
        <section className="relative overflow-hidden border-y border-white/10 bg-[#060914] text-white">
            {/* 배경 — 미드나잇 새틴(Adobe Stock 693108773, 무료 라이선스)을 미드나잇 네이비 그림자 + 실버 블루 광택으로 톤을 맞춘 파일.
                결이 곱고 광택이 은은해 카드의 실버 그레이와 같은 재질감으로 이어진다. 천천히 흐르고 살짝 기운다(동작 줄이기 땐 정지).
                위아래만 살짝 어둡게 눌러 제목·카드 읽힘을 확보하고, 위쪽엔 차가운 실버 빛을 얹는다. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <img
                    src="/product/why/evolution-graphite.jpg"
                    alt=""
                    className="evo-silk absolute inset-[-8%] h-[116%] w-[116%] max-w-none object-cover object-center"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,20,0.45)_0%,rgba(6,9,20,0.04)_36%,rgba(6,9,20,0.1)_72%,rgba(6,9,20,0.65)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(190,206,235,0.14),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_92%,rgba(120,150,210,0.10),transparent_70%)]" />
            </div>
            <div className={`relative mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow="AX Evolution Model" title={e.title} lead={e.lead} dark />
                {/* 계단형 — 1024px 이상은 카드 높이를 같게 두고 오른쪽으로 갈수록 한 칸씩 올려 배치한다(빈 하단 없음).
                    뒤의 상승선이 네 카드를 잇는다. 그 아래는 한 열 */}
                <div className={`relative ${SECTION_BODY_GAP}`}>
                <svg aria-hidden viewBox="0 0 100 20" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-[6%] top-[38%] hidden h-[34%] w-[88%] lg:block">
                    <defs>
                        <linearGradient id="evoRise" x1="0" x2="1">
                            <stop offset="0" stopColor="#c9d5ec" stopOpacity="0.15" />
                            <stop offset="1" stopColor="#c9d5ec" stopOpacity="0.65" />
                        </linearGradient>
                    </defs>
                    <path d="M0 20 C 30 18, 60 10, 100 0" fill="none" stroke="url(#evoRise)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="4 6" />
                </svg>
                <ol ref={listRef} className="relative grid gap-4 lg:grid-cols-4 lg:items-start">
                    {e.stages.map((s, i) => (
                        <li
                            key={s.en}
                            className={cn(
                                "group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none lg:min-h-[300px]",
                                reduced || i < count ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                                i === 3
                                    ? "border-white bg-[linear-gradient(160deg,#ffffff_0%,#f2f5fa_100%)] shadow-[0_0_0_1px_rgba(47,123,255,0.55),0_28px_70px_-24px_rgba(47,123,255,0.55)]"
                                    : "border-white/70 bg-[linear-gradient(160deg,#f5f7fb_0%,#e4e9f1_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_60px_-28px_rgba(0,0,0,0.9)]",
                                ["lg:mt-[96px]", "lg:mt-[64px]", "lg:mt-[32px]", "lg:mt-0"][i],
                            )}
                        >
                            {/* 위쪽 가는 빛 선 — 단계가 오를수록 진해진다 */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#7dd3fc] via-[#2f7bff] to-[#4f46e5]"
                                style={{ opacity: 0.3 + i * 0.23 }}
                            />
                            <div className="relative flex items-start justify-between gap-3">
                                <span className="bg-gradient-to-br from-[#2f7bff] via-[#2563eb] to-[#4f46e5] bg-clip-text text-[40px] font-semibold leading-none tracking-tight text-transparent">
                                    0{i + 1}
                                </span>
                                <EvoPattern i={i} />
                            </div>
                            <h3 className="relative mt-2 text-[22px] font-bold tracking-tight text-[#0b1430]">
                                {s.en} <span className="text-[15px] font-semibold text-[#2563eb]">· {s.ko}</span>
                            </h3>
                            <ul className="relative mt-4 flex flex-col gap-2">
                                {s.items.map((x) => (
                                    <li key={x} className="flex items-start gap-2 text-[14px] leading-relaxed text-[#2b3445]">
                                        <Check className="mt-1 h-3.5 w-3.5 flex-none text-[#2563eb]" aria-hidden />
                                        {x}
                                    </li>
                                ))}
                            </ul>
                            <p className="relative mt-auto border-t border-[#0b1430]/[0.12] pt-4 text-[12px] font-medium tracking-wide text-[#5b6577]">{s.tech}</p>
                        </li>
                    ))}
                </ol>
                </div>
                <p className="mt-10 text-center text-[15px] text-white/65">{e.foot}</p>
                <NextLinks locale={locale} links={[L.features]} dark center />
            </div>
        </section>
    );
}

/* ======================================================================
 * 4. Platform — 소개서 p.11 + STAGE 01~04 (p.13~16) + Foundation (p.17)
 * ==================================================================== */

type Stage = {
    key: string;
    en: string;
    module: string;
    title: Txt;
    gist: Txt; // 카드 왼쪽에 보이는 한 줄 요약(why·what·tech는 데이터로만 보관)
    why: Txt;
    what: Txt;
    tech: string[];
    result: { ko: string[]; en: string[] };
    screen: { type: "img"; src: string; w: number; h: number; alt: Txt; url: string } | { type: "builder" } | { type: "orchestration" } | { type: "evolve" } | { type: "governance" };
    links: DeepLink[];
};

const STAGES: Stage[] = [
    {
        key: "knowledge",
        en: "Knowledge",
        module: "XGEN · Knowledge Hub",
        title: { ko: "변화하는 데이터를 AI 자산으로 연결합니다", en: "Turns changing data into AI-ready assets" },
        gist: { ko: "문서·DB·이미지·도면을 AI가 활용하는 지식으로 구조화합니다.", en: "Structures documents, databases, images and drawings into knowledge AI can use." },
        why: { ko: "기업의 데이터는 계속 늘어나고 형식도 다양해집니다.", en: "Enterprise data keeps growing and comes in many formats." },
        what: {
            ko: "문서·DB·이미지·도면 등 다양한 데이터를 연결하고, AI가 이해할 수 있는 지식(Knowledge)으로 구조화합니다.",
            en: "Connects documents, databases, images and drawings, and structures them into knowledge that AI can use.",
        },
        tech: ["Omnifuse", "Ontology RAG", "Multi-modal Parsing", "OCR", "Chunking", "Vector DB", "RAGOps"],
        result: {
            ko: ["출처를 근거로 한 답변", "최신 데이터 기준의 답변", "AI가 활용할 수 있는 데이터 자산"],
            en: ["Answers grounded in cited sources", "Answers based on current data", "Data assets AI can put to work"],
        },
        screen: { type: "img", src: "/product/xgen-platform-ontology.png", w: 1194, h: 754, url: "XGEN · Knowledge · Ontology", alt: { ko: "XGEN 온톨로지 지식 그래프 화면", en: "XGEN ontology knowledge graph screen" } },
        links: [L.features, { label: { ko: "Technology", en: "Technology" }, href: "/technology" }],
    },
    {
        key: "agent",
        en: "Agent",
        module: "XGEN · Agent Builder",
        title: { ko: "업무를 수행하는 AI Agent를 빠르게 만듭니다", en: "Builds task-performing AI agents quickly" },
        gist: { ko: "말로 설명하는 바이브 코딩(풀코딩)과 캔버스 Workflow, 두 방식으로 만들고 API로 사내 시스템에 연결합니다.", en: "Build by describing it (vibe coding, full code) or on the workflow canvas, then connect to internal systems via API." },
        why: { ko: "기업마다 업무와 사용하는 도구는 계속 바뀌고 늘어납니다.", en: "Every company’s work and tools keep changing and expanding." },
        what: {
            ko: "Workflow·MCP 템플릿과 대화형 설계로 Agent를 만들고, 만든 Agent는 API로 배포해 사내 시스템과 연결합니다.",
            en: "Create agents from workflow and MCP templates or by conversation, then deploy them via API and connect them to internal systems.",
        },
        tech: ["EasyMode", "Workflow Builder", "MCP", "Tool Calling", "Harness Runtime"],
        result: {
            ko: ["바이브 코딩(풀코딩)·Workflow 두 방식 지원", "지식·도구 연결", "API 배포·사내 시스템 연동"],
            en: ["Both vibe coding (full code) and workflow building", "Knowledge and tool connection", "API deployment and system integration"],
        },
        screen: { type: "builder" },
        links: [
            L.features,
            { label: { ko: "EasyMode", en: "EasyMode" }, href: "/easy-mode" },
            { label: { ko: "Vibe Coding", en: "Vibe Coding" }, href: "/vibe-coding" },
        ],
    },
    {
        key: "orchestration",
        en: "Orchestration",
        module: "XGEN · Multi-Agent Orchestration",
        title: { ko: "여러 AI Agent를 하나의 업무로 연결합니다", en: "Connects multiple agents into one piece of work" },
        gist: { ko: "역할별 Agent를 MCP·A2A로 이어 하나의 Workflow로 수행합니다.", en: "Links role-based agents through MCP and A2A and runs them as one workflow." },
        why: { ko: "복잡한 업무는 Agent 하나만으로 처리하기 어렵습니다.", en: "Complex work is hard for a single agent to handle." },
        what: {
            ko: "여러 Agent를 역할별로 나누고, MCP·A2A로 사내 시스템과 다른 Agent를 연결해 하나의 Workflow로 수행합니다.",
            en: "Splits work across role-based agents and links them to systems and each other through MCP and A2A, running it as one workflow.",
        },
        tech: ["Multi-Agent", "Planner", "A2A", "Dynamic Routing", "MCP Compiler", "Workflow Orchestration"],
        result: {
            ko: ["Agent 간 협업", "처음부터 끝까지 이어지는 업무 자동화", "여러 단계가 얽힌 업무 처리"],
            en: ["Agent-to-agent collaboration", "End-to-end work automation", "Handling multi-step work"],
        },
        screen: { type: "orchestration" },
        links: [L.technology, { label: { ko: "Architecture", en: "Architecture" }, href: "/architecture" }],
    },
    {
        key: "self-evolving",
        en: "Self-Evolving",
        module: "XGEN · Geny",
        title: { ko: "Agent가 스스로 구성을 고치며 진화합니다", en: "Agents improve by adjusting their own setup" },
        gist: { ko: "필요한 도구와 구성을 스스로 바꾸고, 검증을 거친 뒤 반영합니다.", en: "Adjusts its own tools and setup; changes apply only after verification." },
        why: { ko: "업무가 바뀔 때마다 사람이 Agent를 다시 설계하기는 어렵습니다.", en: "Redesigning an agent by hand every time the work changes is hard." },
        what: {
            ko: "목표에 필요한 노드·도구·모델을 스스로 찾고, 없으면 만들어 구성을 바꿉니다. 바뀐 구성은 검증을 거친 뒤 반영됩니다.",
            en: "Finds the nodes, tools and models a goal needs — building them if missing — and changes the setup. Changes apply only after verification.",
        },
        tech: ["Feedback Loop", "Self-Evolving Workflow", "Tool Creation", "Memory"],
        result: {
            ko: ["쓸수록 업무에 맞춰 개선되는 Agent", "재설계 부담 감소", "검증 후 반영되는 통제된 개선"],
            en: ["Agents that improve with use", "Less redesign work", "Controlled changes, applied after verification"],
        },
        screen: { type: "evolve" },
        links: [L.technology, { label: { ko: "Technology", en: "Technology" }, href: "/technology" }],
    },
    {
        key: "governance",
        en: "Governance",
        module: "XGEN · Enterprise Governance",
        title: { ko: "모든 단계는 기업의 통제 아래에서 실행됩니다", en: "Every stage runs under enterprise control" },
        gist: { ko: "권한·승인·감사 로그 등 통제 기능을 플랫폼 기본 기능으로 제공합니다.", en: "Permissions, approvals, audit logs and other controls are built into the platform." },
        why: {
            ko: "AI가 실제 업무를 실행할수록 권한·승인·기록 체계가 함께 필요합니다.",
            en: "The more real work AI performs, the more it needs permissions, approvals and records.",
        },
        what: {
            ko: "권한 통제·가드레일·위험도 심사·민감정보 차단·결재선·실행 추적·실행 격리·감사 로그를 플랫폼 기본 기능으로 제공합니다.",
            en: "Provides permission control, guardrails, risk review, sensitive-data blocking, approval routes, execution tracing, isolation and audit logs as platform features.",
        },
        tech: ["RBAC · ABAC", "Guardrail", "PII Masking", "Approval Line", "Audit Log", "Kill Switch", "On-Premise · Air-gap"],
        result: {
            ko: ["기업 보안·통제 체계 유지", "위험 등급에 따른 실행 통제", "GS인증 1등급 (국가공인 SW 품질인증)"],
            en: ["Existing security controls stay in place", "Execution control by risk grade", "GS Certification Grade 1 (national SW quality)"],
        },
        screen: { type: "governance" },
        links: [
            L.security,
            { label: { ko: "보안·거버넌스 상세", en: "Security & Governance" }, href: "/security-and-governance" },
            { label: { ko: "AI 품질 방침", en: "AI quality policy" }, href: "/ai-quality-policy" },
        ],
    },
];

/** 단계 화면 본문 — PC(lg)에서는 틀 높이를 단계마다 같게 고정하고 내용을 그 안 가운데에 둔다. */
const MOCK_BODY = "bg-[#f7f9fc] p-5 sm:p-7 lg:p-5 xl:px-6 xl:py-3 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center lg:overflow-hidden";

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
    return (
        <figure className="flex flex-col lg:h-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-32px_rgba(20,40,80,0.35)]">
            <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] px-4 py-2.5 lg:py-2">
                <span aria-hidden className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d5dbe5]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d5dbe5]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d5dbe5]" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-md border border-[var(--color-line)] bg-white px-3 py-1 text-[12px] text-[var(--color-ink-subtle)]">{url}</span>
            </div>
            {children}
        </figure>
    );
}

/** STAGE 02 — 같은 Agent Builder 안에서 두 가지 만드는 방식을 반반으로 보여 준다.
 *  왼쪽: 말로 설명하는 바이브 코딩(DexOn 시연 화면에서 작업 패널만 잘라 씀)
 *  오른쪽: 실제 Agentflow 캔버스 화면(hero-workflow.png)에서 노드 4개
 *  (질문 입력·정보 검색 → Agent Xgen → 답변 출력)를 하나씩 잘라 엇갈리게 흩어 놓고
 *  곡선 연결선으로 다시 이은 이미지(.local-tmp/wf_natural.py로 생성) */
function BuilderSplitMock({ en }: { en: boolean }) {
    const halves = [
        {
            tag: "A",
            name: "Vibe Coding",
            sub: en ? "(Full code)" : "(풀코딩)",
            desc: en ? "Describe it in words" : "말로 설명해 만들기",
            prompt: en ? "“Build a live order-monitoring dashboard.”" : "“실시간 주문 관제 대시보드 만들어 줘”",
            src: "/product/agent-builder-vibe.png",
            w: 390,
            h: 510,
            alt: en ? "Agent building an app from a spoken request" : "말로 한 요청을 받아 Agent가 앱을 만드는 화면",
        },
        {
            tag: "B",
            name: "Workflow",
            sub: null,
            desc: en ? "Design on the canvas" : "캔버스에서 노드로 설계하기",
            prompt: null,
            src: "/product/agent-builder-workflow.png",
            w: 880,
            h: 756,
            alt: en ? "Workflow canvas: question input and retrieval nodes connect to Agent Xgen, which connects to the answer output" : "Workflow 캔버스: 질문 입력·정보 검색 노드가 Agent Xgen으로, Agent Xgen이 답변 출력으로 곡선으로 이어진 화면",
        },
    ];
    return (
        <BrowserFrame url="XGEN · Agent Builder">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:min-h-0 lg:flex-1">
                {halves.map((h, i) => (
                    <div key={h.tag} className={`flex min-w-0 flex-col ${i === 1 ? "border-t border-[var(--color-line)] sm:border-l sm:border-t-0" : ""}`}>
                        <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-white px-4 py-2.5">
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2461d8] text-[11px] font-bold text-white">{h.tag}</span>
                            <span className="shrink-0 text-[13.5px] font-bold text-[var(--color-ink)]">{h.name}{h.sub ? <span className="ml-1 font-semibold text-[#2461d8]">{h.sub}</span> : null}</span>
                            <span className="truncate text-[12.5px] text-[var(--color-ink-subtle)]">· {h.desc}</span>
                        </div>
                        <div className={`flex aspect-[16/10] flex-col overflow-hidden sm:aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1 ${h.prompt ? "bg-[var(--color-surface-alt)]" : "bg-[#f8f9fa]"}`}>
                            {h.prompt ? (
                                <div className="flex justify-end bg-white px-3 py-2.5">
                                    <span className="max-w-[92%] rounded-xl rounded-tr-sm bg-[#2461d8] px-3 py-2 text-[12.5px] font-medium leading-snug text-white">{h.prompt}</span>
                                </div>
                            ) : null}
                            <div className="relative min-h-0 flex-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={h.src}
                                    width={h.w}
                                    height={h.h}
                                    alt={h.alt}
                                    loading="lazy"
                                    className={`absolute inset-0 h-full w-full ${h.prompt ? "object-cover object-left-top" : "object-contain object-center"}`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <figcaption className="border-t border-[var(--color-line)] px-5 py-3 lg:py-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                {en ? "Both methods are supported. Screens vary by version and configuration." : "두 방식 모두 지원합니다. 화면은 버전과 구성에 따라 다를 수 있습니다."}
            </figcaption>
        </BrowserFrame>
    );
}

/** STAGE 03 — 소개서 p.22 멀티 에이전트 예시를 HTML 도식으로. */
function OrchestrationMock({ en }: { en: boolean }) {
    const agents = en
        ? [
              { n: "Sales analysis agent", d: "Recent sales · traffic and conversion", sys: "Orders / sales DB" },
              { n: "Review analysis agent", d: "Review summary · complaint keywords", sys: "Analytics system" },
              { n: "Inventory / price agent", d: "Competitor prices · stock status", sys: "Competitor price API" },
          ]
        : [
              { n: "매출 분석 Agent", d: "최근 판매 · 유입/전환율 변화", sys: "주문/매출 DB" },
              { n: "고객 리뷰 분석 Agent", d: "리뷰 통합 · 불만 키워드", sys: "데이터 분석 시스템" },
              { n: "재고/가격 Agent", d: "경쟁사 가격 · 재고 상태", sys: "경쟁사 가격 API" },
          ];
    return (
        <BrowserFrame url="XGEN · Multi-Agent Orchestration">
            <div aria-hidden className={MOCK_BODY}>
                <p className="ml-auto w-fit max-w-full rounded-2xl rounded-br-md bg-[#2f7bff] px-4 py-2.5 lg:py-2 text-[13.5px] text-white">
                    {en ? "Find out why this week’s top product sales dropped" : "이번 주 매출이 급감한 상품의 원인을 분석해줘"}
                </p>
                <div className="mx-auto mt-5 w-fit rounded-xl border border-[#9cbcf5] lg:mt-2.5 bg-white px-5 py-2.5 lg:py-2 text-center">
                    <p className="font-mono text-[11px] font-bold tracking-widest text-[#2461d8]">ORCHESTRATOR</p>
                    <p className="text-[13px] font-semibold text-[var(--color-ink)]">{en ? "Plans and routes the work" : "업무 계획 · 분배"}</p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:mt-3 lg:gap-2.5">
                    {agents.map((a) => (
                        <div key={a.n} className="rounded-xl border border-[var(--color-line)] bg-white p-3.5 lg:p-2.5">
                            <p className="text-[13px] font-bold text-[var(--color-ink)]">{a.n}</p>
                            <p className="mt-1 lg:mt-0.5 text-[12px] leading-snug text-[var(--color-ink-muted)]">{a.d}</p>
                            <p className="mt-2.5 lg:mt-2 border-t border-[var(--color-line)] pt-2 lg:pt-1.5 font-mono text-[11px] text-[#2461d8]">MCP → {a.sys}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-3 lg:mt-2 text-center font-mono text-[11px] text-[var(--color-ink-subtle)]">A2A · {en ? "agents share results" : "Agent 간 결과 공유"}</p>
                <div className="mt-3 lg:mt-2 rounded-xl border border-[#d7e4fb] bg-white p-4 text-[13px] lg:px-4 lg:py-2 leading-relaxed lg:leading-snug text-[var(--color-ink)]">
                    {en
                        ? "Weaker price competitiveness against rivals and more negative reviews about delivery delays look like the main causes."
                        : "경쟁사 대비 가격 경쟁력이 약해졌고, 배송 지연 관련 부정 리뷰가 늘어난 것이 주된 원인으로 파악됩니다."}
                </div>
            </div>
            <figcaption className="border-t border-[var(--color-line)] px-5 py-3 lg:py-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                {en ? "Example scenario. Agents and connected systems depend on configuration." : "예시 시나리오입니다. Agent와 연결 시스템은 구성에 따라 다릅니다."}
            </figcaption>
        </BrowserFrame>
    );
}

/** STAGE 04 — 소개서 p.16 Geny 자기진화 예시를 HTML 도식으로. */
function EvolveMock({ en }: { en: boolean }) {
    const changes = en
        ? [
              { s: "+", t: "Attach a knowledge-search node" },
              { s: "+", t: "Turn on source citations" },
              { s: "↻", t: "Adjust creativity 0.7 → 0.3" },
          ]
        : [
              { s: "+", t: "지식 검색 노드 부착" },
              { s: "+", t: "근거 표기 옵션 선택" },
              { s: "↻", t: "창의성 0.7 → 0.3 조정" },
          ];
    return (
        <BrowserFrame url="XGEN · Agent · Geny">
            <div aria-hidden className={MOCK_BODY}>
                <p className="ml-auto w-fit max-w-full rounded-2xl rounded-br-md bg-[#2f7bff] px-4 py-2.5 lg:py-2 text-[13.5px] text-white">
                    {en ? "From now on, also check internal policy and answer with sources" : "앞으로는 사내 규정까지 찾아서 근거와 함께 답변해줘"}
                </p>
                <div className="mt-5 rounded-xl border border-[var(--color-line)] bg-white p-5 lg:mt-3 lg:p-4">
                    <p className="flex items-center gap-2 text-[13px] font-bold text-[var(--color-ink)]">
                        <RefreshCw className="h-4 w-4 text-[#2f7bff]" />
                        {en ? "Workflow change log" : "워크플로 자동 변경 내역"}
                    </p>
                    <ul className="mt-3 flex flex-col gap-2 lg:mt-2.5 lg:gap-1.5">
                        {changes.map((c) => (
                            <li key={c.t} className="flex items-center gap-3 rounded-lg border border-[var(--color-line)] px-3 py-2 lg:py-1.5 text-[13px] text-[var(--color-ink-muted)]">
                                <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-[#eef4ff] font-mono text-[12px] font-bold text-[#2461d8]">{c.s}</span>
                                {c.t}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 lg:mt-3 flex items-center gap-2 text-[13px] font-semibold text-[#0f7a4a]">
                        <Check className="h-4 w-4" />
                        {en ? "Verified — applies from the next turn" : "검증 완료 · 다음 턴부터 반영"}
                    </p>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <p className="rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[12.5px] text-[var(--color-ink-muted)]">
                        {en ? "Agent memory · keeps work context" : "에이전트 기억 · 업무 맥락 유지"}
                    </p>
                    <p className="rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[12.5px] text-[var(--color-ink-muted)]">
                        {en ? "Searches only the tools needed · builds one if missing" : "필요한 Tool만 탐색 · 없으면 생성"}
                    </p>
                </div>
            </div>
            <figcaption className="border-t border-[var(--color-line)] px-5 py-3 lg:py-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                {en ? "Scope depends on version and configuration." : "적용 범위는 버전과 구성에 따라 다릅니다."}
            </figcaption>
        </BrowserFrame>
    );
}

/** STAGE F — Agent에 위험 등급을 부여하면 등급별 통제가 붙는 화면을 HTML 도식으로.
 *  색만으로 구분하지 않도록 등급마다 번호(1~4)와 이름을 함께 쓴다. */
function GovernanceMock({ en }: { en: boolean }) {
    const grades = [
        { n: 1, ko: "저위험", en: "Low", code: "low", c: "#16A34A", bg: "#eefaf2", pol: { ko: "통제 완화", en: "Relaxed controls" } },
        { n: 2, ko: "중위험", en: "Medium", code: "medium", c: "#D97706", bg: "#fff7e8", pol: { ko: "기본 통제 적용", en: "Standard controls" } },
        { n: 3, ko: "고위험", en: "High", code: "high", c: "#EA580C", bg: "#fff1e8", pol: { ko: "추가 통제·관리 강화", en: "Added controls" } },
        { n: 4, ko: "초고위험", en: "Critical", code: "critical", c: "#DC2626", bg: "#fdeeee", pol: { ko: "출시 재검토", en: "Launch review" } },
    ];
    const sel = 2; // 예시: 고위험 선택
    const g = grades[sel];
    const controls = en
        ? [
              { t: "Approval route before execution", v: "Required" },
              { t: "Sensitive data (PII) masking", v: "On" },
              { t: "External transfer of results", v: "Blocked" },
              { t: "Execution trace · audit log", v: "Recorded" },
          ]
        : [
              { t: "실행 전 결재선 승인", v: "필수" },
              { t: "민감정보(PII) 마스킹", v: "적용" },
              { t: "결과 외부 전송", v: "차단" },
              { t: "실행 추적 · 감사 로그", v: "기록" },
          ];
    return (
        <BrowserFrame url="XGEN · AI Governance · Agent risk grade">
            <div aria-hidden className={MOCK_BODY}>
                {/* 대상 Agent */}
                <div className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 lg:py-2.5">
                    <span className="inline-flex h-9 w-9 lg:h-8 lg:w-8 flex-none items-center justify-center rounded-lg bg-[#eef4ff] text-[#2461d8]">
                        <FileText className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-bold leading-snug text-[var(--color-ink)] [word-break:keep-all]">{en ? "Contract Review Agent" : "계약서 검토 Agent"}</p>
                        <p className="truncate text-[11.5px] text-[var(--color-ink-subtle)]">{en ? "Agent settings › Risk grade" : "Agent 설정 › 위험도 등급"}</p>
                    </div>
                    <span className="flex-none rounded-full border px-2.5 py-0.5 text-[11.5px] font-bold" style={{ borderColor: g.c, color: g.c }}>
                        {g.n} · {en ? g.en : g.ko}
                    </span>
                </div>

                {/* 등급 선택 */}
                <p className="mt-5 lg:mt-3 text-[12.5px] font-bold text-[var(--color-ink)]">{en ? "Assign a risk grade" : "위험 등급 부여"}</p>
                <div className="mt-2 lg:mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {grades.map((x, i) => {
                        const on = i === sel;
                        return (
                            <div
                                key={x.code}
                                className={cn("relative rounded-xl border bg-white px-3 py-2.5 lg:py-2", on ? "" : "border-[var(--color-line)]")}
                                style={on ? { borderColor: x.c, background: x.bg } : undefined}
                            >
                                <div className="flex items-center gap-1.5">
                                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full font-mono text-[11px] font-bold text-white" style={{ background: x.c }}>
                                        {x.n}
                                    </span>
                                    <span className="truncate text-[13px] font-bold" style={{ color: on ? x.c : "var(--color-ink)" }}>
                                        {en ? x.en : x.ko}
                                    </span>
                                    {on ? <Check className="ml-auto h-4 w-4 flex-none" style={{ color: x.c }} /> : null}
                                </div>
                                <p className="mt-1 lg:mt-0.5 truncate text-[11.5px] text-[var(--color-ink-muted)]">{T(en, x.pol)}</p>
                            </div>
                        );
                    })}
                </div>

                {/* 등급에 따라 붙는 통제 */}
                <div className="mt-4 rounded-xl border bg-white p-4 lg:mt-3 lg:p-3" style={{ borderColor: g.c }}>
                    <p className="flex items-center gap-2 text-[13px] font-bold text-[var(--color-ink)]">
                        <ShieldCheck className="h-4 w-4" style={{ color: g.c }} />
                        {en ? `Controls applied at grade ${g.n} · ${g.en}` : `${g.n}등급 · ${g.ko}에 적용되는 통제`}
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:mt-2 lg:gap-1.5">
                        {controls.map((c) => (
                            <li key={c.t} className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-[var(--color-line)] px-3 py-2 lg:py-1.5 text-[12.5px] text-[var(--color-ink-muted)]">
                                <span className="min-w-0 truncate">{c.t}</span>
                                <span className="flex-none rounded-md bg-[#eef4ff] px-2 py-0.5 text-[11.5px] font-bold text-[#2461d8]">{c.v}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4 lg:mt-3 flex flex-wrap items-center justify-end gap-2">
                    <span className="mr-auto text-[11.5px] text-[var(--color-ink-subtle)]">{en ? "Grade changes go through the governance approver." : "등급 변경은 거버넌스 담당자 승인 후 반영"}</span>
                    <span className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[var(--color-ink-muted)]">{en ? "Cancel" : "취소"}</span>
                    <span className="rounded-lg bg-[#2f7bff] px-3 py-1.5 text-[12.5px] font-semibold text-white">{en ? "Request approval" : "승인 요청"}</span>
                </div>
            </div>
            <figcaption className="border-t border-[var(--color-line)] px-5 py-3 lg:py-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                {en ? "Grades and controls are configured per organization." : "등급과 통제 항목은 기관별 설정에 따라 다릅니다."}
            </figcaption>
        </BrowserFrame>
    );
}

export function XgenPlatformStages({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const [cur, setCur] = useState(0);
    const s = STAGES[cur];

    /* 자동 롤링 — 단계마다 STAGE_MS 동안 보여 주고 다음 단계로 넘어간다(F 다음은 01).
     * 멈춤: 마우스를 올렸을 때·키보드 포커스가 안에 있을 때·섹션이 화면 밖일 때·탭이 숨겨졌을 때.
     * 「동작 줄이기」 사용자는 자동으로 넘기지 않는다. 탭을 직접 누르면 그 단계부터 다시 센다. */
    const STAGE_MS = 5000;
    const sectionRef = useRef<HTMLElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [inView, setInView] = useState(false);
    const [docVisible, setDocVisible] = useState(true);
    const [reduced, setReduced] = useState(false);
    const [round, setRound] = useState(0); // 멈췄다 다시 돌 때 진행 막대를 처음부터 그리기 위한 키
    const rolling = inView && docVisible && !hovered && !focused && !reduced;

    useEffect(() => {
        setReduced(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
        const onVis = () => setDocVisible(document.visibilityState === "visible");
        onVis();
        document.addEventListener("visibilitychange", onVis);
        const el = sectionRef.current;
        let io: IntersectionObserver | undefined;
        if (el && "IntersectionObserver" in window) {
            io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
            io.observe(el);
        } else {
            setInView(true);
        }
        return () => {
            document.removeEventListener("visibilitychange", onVis);
            io?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!rolling) return;
        setRound((r) => r + 1);
        const t = window.setTimeout(() => setCur((c) => (c + 1) % STAGES.length), STAGE_MS);
        return () => window.clearTimeout(t);
    }, [rolling, cur]);

    /* 좁은 화면에서 활성 단계 버튼이 가로 스크롤 밖에 있으면 보이게 옮긴다(세로 스크롤은 건드리지 않음). */
    useEffect(() => {
        const box = tabsRef.current;
        const btn = box?.querySelector<HTMLElement>(`#xgen-stage-tab-${STAGES[cur].key}`);
        if (!box || !btn || box.scrollWidth <= box.clientWidth) return;
        const left = btn.offsetLeft - (box.clientWidth - btn.offsetWidth) / 2;
        box.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
    }, [cur, reduced]);

    return (
        <section
            ref={sectionRef}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
            }}
            id="platform"
            className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[#d4d4d8] bg-[#e7e7ea]">
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead
                    eyebrow="XGEN Platform"
                    title={en ? "XGEN, the agentic AI platform that keeps evolving" : "지속적으로 진화하는 Agentic AI 플랫폼, XGEN"}
                    lead={
                        en
                            ? "On an open architecture, XGEN covers enterprise data management, agent development, integrated operation and ongoing improvement in a single platform."
                            : "XGEN은 개방형 아키텍처를 기반으로 기업 데이터 관리부터 AI Agent 개발·통합 운영, 지속적인 고도화까지 하나의 플랫폼에서 지원합니다."
                    }
                />

                {/* 단계 선택 — 번호 노드를 선으로 잇는다. 좁은 화면은 가로 스크롤(줄바꿈 금지). */}
                <div ref={tabsRef} className="-mx-6 mt-12 overflow-x-auto px-6 lg:mt-8">
                    <div role="tablist" aria-label={en ? "XGEN platform stages" : "XGEN 플랫폼 단계"} className="relative mx-auto flex w-max min-w-full justify-between gap-2 lg:w-full">
                        <span aria-hidden className="pointer-events-none absolute left-[10%] right-[10%] top-[22px] h-px lg:top-[18px] bg-[#c9d9f7]" />
                        {STAGES.map((x, i) => {
                            const active = i === cur;
                            return (
                                <button
                                    key={x.key}
                                    type="button"
                                    role="tab"
                                    id={`xgen-stage-tab-${x.key}`}
                                    aria-selected={active}
                                    aria-controls="xgen-stage-panel"
                                    onClick={() => setCur(i)}
                                    className="group relative flex w-[132px] flex-none flex-col items-center gap-2 text-center lg:w-auto lg:flex-1 lg:gap-1.5"
                                >
                                    <span
                                        className={cn(
                                            "relative z-10 inline-flex h-11 w-11 lg:h-9 lg:w-9 items-center justify-center rounded-full border font-mono text-[13px] font-bold transition",
                                            active
                                                ? "border-[#2f7bff] bg-[#2f7bff] text-white shadow-[0_0_0_6px_rgba(47,123,255,0.14)]"
                                                : "border-[#bcd0f5] bg-white text-[#2f7bff] group-hover:border-[#2f7bff]",
                                        )}
                                    >
                                        {i === 4 ? "F" : `0${i + 1}`}
                                    </span>
                                    <span className={cn("whitespace-nowrap text-[14.5px] font-bold tracking-tight", active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]")}>
                                        {x.en}
                                    </span>
                                    {/* 자동 롤링 진행 막대 — 활성 단계 아래에서 다음 단계까지 남은 시간을 보여 준다 */}
                                    <span aria-hidden className="relative h-[2px] w-12 overflow-hidden rounded-full bg-transparent">
                                        {active && rolling && (
                                            <span
                                                key={`${cur}-${round}`}
                                                className="absolute inset-y-0 left-0 bg-[#2f7bff]"
                                                style={{ animation: `whyProgress ${STAGE_MS}ms linear forwards` }}
                                            />
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 단계 패널 — 왼쪽 요약·결과, 오른쪽 실제 화면/도식. PC(lg)에서는 오른쪽 화면 높이를 고정(lg 500px, xl 이상은 화면 폭 절반·448px)해 단계마다 카드 크기가 같고, 제목~카드가 고정 메뉴·하위 탭 아래 한 화면(1920×1080 브라우저 기준)에 들어오게 간격을 줄였다. */}
                <div
                    id="xgen-stage-panel"
                    role="tabpanel"
                    aria-labelledby={`xgen-stage-tab-${s.key}`}
                    className="mt-10 grid gap-8 rounded-2xl border border-[var(--color-line)] bg-white p-6 lg:mt-5 lg:grid-cols-[5fr_7fr] lg:gap-10 lg:px-10 lg:py-6 xl:grid-cols-[1fr_1fr] xl:gap-12"
                >
                    <div className="min-w-0">
                        <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#2461d8]">
                            {cur === 4 ? "Foundation" : `Stage 0${cur + 1}`} · {s.module}
                        </p>
                        <h3 className="mt-2 text-[24px] font-bold leading-snug tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[28px]">{T(en, s.title)}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">{T(en, s.gist)}</p>
                        <ul className="mt-6 flex flex-col gap-2 border-t border-[var(--color-line)] pt-5">
                            {(en ? s.result.en : s.result.ko).map((r) => (
                                <li key={r} className="flex items-start gap-2 text-[14.5px] font-semibold text-[var(--color-ink)] [word-break:keep-all]">
                                    <Check className="mt-1 h-4 w-4 flex-none text-[#2f7bff]" aria-hidden />
                                    {r}
                                </li>
                            ))}
                        </ul>
                        {/* 링크 — 첫 번째만 버튼, 나머지(3depth)는 가벼운 글자 링크 */}
                        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                            {s.links.map((l, i) =>
                                i === 0 ? (
                                    <Link
                                        key={l.href}
                                        href={localeHref(locale, l.href)}
                                        className="inline-flex items-center gap-1 rounded-full bg-[#2f7bff] px-3.5 py-1.5 text-[13.5px] font-semibold text-white transition hover:bg-[#2461d8]"
                                    >
                                        {T(en, l.label)}
                                        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                                    </Link>
                                ) : (
                                    <Link
                                        key={l.href}
                                        href={localeHref(locale, l.href)}
                                        className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-[var(--color-ink-muted)] transition hover:text-[#2461d8]"
                                    >
                                        {T(en, l.label)}
                                        <ChevronRight className="h-3 w-3" aria-hidden />
                                    </Link>
                                ),
                            )}
                        </div>
                    </div>
                    <div className="min-w-0 lg:h-[500px] lg:self-center xl:h-[448px]">
                        {s.screen.type === "img" ? (
                            <BrowserFrame url={s.screen.url}>
                                {/* 이미지는 온톨로지 그래프 영역만 잘라(좌측 메뉴·우측 검색 패널 제외, 1194×754) PC에서는 틀을 꽉 채우도록 object-cover */}
                                <div className="lg:relative lg:min-h-0 lg:flex-1 lg:bg-[#f7f9fc]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={s.screen.src} width={s.screen.w} height={s.screen.h} alt={T(en, s.screen.alt)} loading="lazy" className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-center" />
                                </div>
                                <figcaption className="border-t border-[var(--color-line)] px-5 py-3 lg:py-2 text-[12.5px] text-[var(--color-ink-subtle)]">
                                    {en ? "Screens vary by version and configuration." : "화면은 버전과 구성에 따라 다를 수 있습니다."}
                                </figcaption>
                            </BrowserFrame>
                        ) : s.screen.type === "builder" ? (
                            <BuilderSplitMock en={en} />
                        ) : s.screen.type === "orchestration" ? (
                            <OrchestrationMock en={en} />
                        ) : s.screen.type === "governance" ? (
                            <GovernanceMock en={en} />
                        ) : (
                            <EvolveMock en={en} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ======================================================================
 * 5. Why XGEN — 소개서 p.24·25·32
 * ==================================================================== */

const WHY = {
    ko: {
        title: (
            <>
                기업의 기준으로 통제하고,
                <br className="hidden md:block" /> 현업의 경험으로 진화하는 AI
            </>
        ),
        loopLead: (
            <>
                XGEN은 기업의 보안과 거버넌스 체계 안에서 AI Agent가 실제 업무를 수행하도록 지원합니다. 사용자의 피드백과 업무 수행 경험을 지속적인 개선에 반영해
                <br className="hidden md:block" /> 기업의 업무 환경에 더욱 적합한 AI로 발전합니다.
            </>
        ),
        lead: "XGEN은 범용 워크플로우 자동화 도구나 LLM 앱 빌더와 출발점이 다릅니다. 목적은 엔터프라이즈 AI Agent의 설계와 운영입니다.",
        reasons: [
            {
                t: "엔터프라이즈 AI Agent의 설계·운영을 위한 플랫폼",
                b: [
                    "지식·Agent 개발·멀티 에이전트 협업·운영·거버넌스를 하나의 플랫폼에서 다룹니다.",
                    "MCP·API로 사내 시스템과 연결하고, A2A로 여러 Agent가 역할을 나눠 협업합니다.",
                    "현업은 자연어와 노코드로, 개발자는 도구·지식 연결로, 관리자는 권한·승인으로 각자 역할에 맞게 씁니다.",
                ],
                link: L.features,
            },
            {
                t: "기업의 통제 아래에서 실행되는 AI",
                b: [
                    "조회·초안은 자동 실행, 되돌릴 수 있는 작업은 승인 후 실행, 되돌릴 수 없는 작업은 결재 후 사람이 직접 실행합니다.",
                    "온프레미스·망분리·Air-gap 구성을 지원하며, 고객 데이터를 모델 학습에 쓰지 않습니다(제로 트레이닝).",
                    "GS인증 1등급을 받은 플랫폼입니다.",
                ],
                link: L.security,
            },
            {
                t: "모델과 도구가 바뀌어도 유지되는 운영 구조",
                b: [
                    "모델 호출을 Model Gateway 단일 경로로 통일해, 모델을 바꿔도 실행 절차와 통제는 그대로 유지합니다.",
                    "Agent·프롬프트·도구·데이터 소스를 구성 정보로 분리해, 구성 범위 안에서는 코드 수정 없이 새 Agent와 데이터 소스를 추가합니다.",
                    "Public LLM과 Private LLM을 업무 민감도에 따라 나눠 쓸 수 있습니다.",
                ],
                link: L.technology,
            },
        ],
    },
    en: {
        title: (
            <>
                Governed by enterprise standards,
                <br className="hidden md:block" /> evolving with real work experience
            </>
        ),
        loopLead: (
            <>
                XGEN helps AI agents carry out real work within the enterprise&apos;s security and governance framework. User feedback and work experience feed into ongoing improvement,
                <br className="hidden md:block" /> so the AI becomes a better fit for the enterprise&apos;s work environment over time.
            </>
        ),
        lead: "XGEN starts from a different place than general workflow automation tools or LLM app builders: its purpose is designing and running enterprise AI agents.",
        reasons: [
            {
                t: "A platform built to design and run enterprise AI agents",
                b: [
                    "Knowledge, agent development, multi-agent collaboration, operations and governance on one platform.",
                    "Connects to internal systems via MCP and APIs; agents split roles and collaborate via A2A.",
                    "Business users work in natural language and no-code, developers connect tools and knowledge, admins manage permissions and approvals.",
                ],
                link: L.features,
            },
            {
                t: "AI that runs under enterprise control",
                b: [
                    "Lookups and drafts run automatically, reversible actions run after approval, and irreversible actions are carried out by a person after sign-off.",
                    "Supports on-premise, segregated-network and air-gapped setups; customer data is not used for model training (zero training).",
                    "The platform holds GS Certification Grade 1.",
                ],
                link: L.security,
            },
            {
                t: "An operating structure that holds when models and tools change",
                b: [
                    "All model calls go through a single Model Gateway path, so procedures and controls stay the same when you switch models.",
                    "Agents, prompts, tools and data sources are kept as configuration, so new agents and sources can be added without code changes within the configurable scope.",
                    "Public and private LLMs can be used side by side by data sensitivity.",
                ],
                link: L.technology,
            },
        ],
    },
};

export function XgenWhyReasons({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const w = WHY[en ? "en" : "ko"];
    return (
        <section id="why" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow="Why XGEN" title={w.title} lead={w.lead} />
                <ol className={`${SECTION_BODY_GAP} grid gap-4 lg:grid-cols-3`}>
                    {w.reasons.map((r, i) => (
                        <li key={r.t} className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7">
                            <span className="font-mono text-[28px] font-extrabold leading-none text-[#2f7bff]">0{i + 1}</span>
                            <h3 className="mt-4 text-[19px] font-bold leading-snug tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{r.t}</h3>
                            <ul className="mt-5 flex flex-col gap-3 border-t border-[var(--color-line)] pt-5">
                                {r.b.map((x) => (
                                    <li key={x} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                                        <span aria-hidden className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                        {x}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={localeHref(locale, r.link.href)}
                                className="group mt-auto inline-flex items-center gap-1 pt-6 text-[14px] font-semibold text-[#2461d8] hover:text-[#1b4fb0]"
                            >
                                {T(en, r.link.label)} {en ? "page" : "자세히 보기"}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/* ======================================================================
 * 6. Extended Value — 자기개선 루프 (소개서 p.12·17·23)
 * ==================================================================== */

const LOOP = {
    ko: {
        title: (
            <>
                쓸수록, 우리 업무에 맞게
                <br className="hidden md:block" /> 진화합니다
            </>
        ),
        lead: "XGEN의 개선은 개발사의 업데이트에서 끝나지 않습니다. 현업이 결과를 검토하며 남긴 피드백과 실행 기록이 회고를 거쳐 작업지침·도구 구성의 개선으로 이어집니다.",
        inLabel: "입력",
        inTitle: "현업 피드백과 실행 기록",
        inShort: ["피드백", "결과 검토", "실행 기록", "품질 평가", "변화 감지"],
        loopTitle: "XGEN 자기개선 루프",
        outTitle: "업무에 맞춰 개선되는 Agent",
        inputs: ["현업의 결과 검토와 피드백", "단계별 실행 기록과 품질 평가 결과", "데이터·도구·모델의 변화"],
        loop: [
            { n: "01", t: "실행", d: "Agent가 업무를 수행" },
            { n: "02", t: "기록", d: "노드·모델·도구 호출을 추적" },
            { n: "03", t: "회고", d: "평가 결과와 피드백을 분석" },
            { n: "04", t: "개선", d: "작업지침·도구 구성 개선안 작성" },
        ],
        loopCaption: "개선안은 검증과 승인을 거친 뒤에만 반영됩니다",
        outLabel: "결과",
        outputs: ["업무 변화에 맞춰 개선되는 Agent", "승인된 변경만 반영, 필요 시 복원·킬 스위치", "개선 이력이 감사 로그로 남음"],
        govLabel: "모든 개선은 거버넌스 안에서",
        gov: ["권한 통제", "가드레일", "위험도 심사", "민감정보 차단", "결재선", "실행 추적", "실행 격리", "감사 로그"],
        note: "※ 반영 방식과 승인 절차는 고객사 정책과 구성에 따라 정합니다.",
    },
    en: {
        title: (
            <>
                The more you use it,
                <br className="hidden md:block" /> the better it fits your work
            </>
        ),
        lead: "Improvement in XGEN does not stop at vendor updates. Feedback left by business users as they review results, together with run records, goes through review and turns into better instructions and tool setups.",
        inLabel: "Inputs",
        inTitle: "Business feedback and run records",
        inShort: ["Feedback", "Review", "Run log", "Quality", "Changes"],
        loopTitle: "XGEN self-improvement loop",
        outTitle: "Agents that fit your work better",
        inputs: ["Business users’ result reviews and feedback", "Step-by-step run records and quality scores", "Changes in data, tools and models"],
        loop: [
            { n: "01", t: "Run", d: "The agent performs the work" },
            { n: "02", t: "Record", d: "Traces node, model and tool calls" },
            { n: "03", t: "Review", d: "Analyzes scores and feedback" },
            { n: "04", t: "Improve", d: "Drafts better instructions and tool setups" },
        ],
        loopCaption: "Changes apply only after verification and approval",
        outLabel: "Outcomes",
        outputs: ["Agents that keep pace with changing work", "Only approved changes apply; rollback and kill switch when needed", "Every change stays in the audit log"],
        govLabel: "Every improvement stays within governance",
        gov: ["Permission control", "Guardrails", "Risk review", "Sensitive-data blocking", "Approval routes", "Execution tracing", "Execution isolation", "Audit logs"],
        note: "※ How changes apply and who approves them follow each customer’s policy and configuration.",
    },
};

/** 참고 이미지 ② — 원과 원 사이 점선 화살표. 1024px 이상 가로, 그 아래는 세로. */
function DashedArrow() {
    return (
        <div aria-hidden className="flex items-center justify-center text-[#2f7bff] lg:h-[240px]">
            <svg viewBox="0 0 80 12" className="hidden h-3 w-20 lg:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="6" x2="70" y2="6" strokeDasharray="6 6" />
                <polyline points="66,1 74,6 66,11" />
            </svg>
            <svg viewBox="0 0 12 56" className="h-14 w-3 lg:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="2" x2="6" y2="46" strokeDasharray="6 6" />
                <polyline points="1,42 6,50 11,42" />
            </svg>
        </div>
    );
}

/**
 * asWhy — Why XGEN 섹션 자리에 쓸 때: 머리(eyebrow「Why XGEN」·제목)는 WHY 것을 유지하고,
 * 본문은 Extended Value(자기개선 루프) 콘텐츠로 채운다. 앵커 id도 #why를 유지한다.
 */
export function XgenEvolutionLoop({ locale, asWhy = false }: { locale: Locale; asWhy?: boolean }) {
    const en = locale === "en";
    const c = LOOP[en ? "en" : "ko"];
    const w = WHY[en ? "en" : "ko"];
    return (
        <section
            id={asWhy ? "why" : "evolve"}
            className={`scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] ${asWhy ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-alt)]"}`}
        >
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow={asWhy ? "Why XGEN" : "Extended Value"} title={asWhy ? w.title : c.title} lead={asWhy ? w.loopLead : c.lead} />
                {/* 참고 이미지 ② — 흩어진 입력(원) → 중심 원(루프) → 결과 타일(원). 1024px 미만은 위아래로 쌓는다. */}
                <div className={`${SECTION_BODY_GAP} rounded-3xl border border-[#e3e9f3] bg-white px-6 py-10 shadow-[0_30px_80px_-50px_rgba(20,40,80,0.45)] lg:px-12 lg:py-14`}>
                    <div className="grid items-start gap-6 lg:grid-cols-[1fr_96px_1fr_96px_1fr] lg:gap-2">
                        {/* 입력 */}
                        <div className="flex flex-col items-center text-center">
                            <div aria-hidden className="relative h-[240px] w-[240px] rounded-full bg-[#f3f6fb]">
                                {[
                                    { I: MessageSquareText, x: "28%", y: "22%" },
                                    { I: ScrollText, x: "72%", y: "22%" },
                                    { I: Activity, x: "18%", y: "56%" },
                                    { I: TrendingUp, x: "82%", y: "56%" },
                                    { I: ArrowLeftRight, x: "50%", y: "80%" },
                                ].map(({ I, x, y }, i) => (
                                    <span key={i} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: x, top: y }}>
                                        <I className="h-6 w-6 text-[#2f7bff]" strokeWidth={1.8} />
                                        <span className="whitespace-nowrap text-[12px] font-semibold text-[var(--color-ink-muted)]">{c.inShort[i]}</span>
                                    </span>
                                ))}
                                <span className="absolute left-1/2 top-[40%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#b9cdf3]" />
                                <span className="absolute left-[36%] top-[66%] h-1.5 w-1.5 rounded-full bg-[#b9cdf3]" />
                                <span className="absolute right-[36%] top-[66%] h-1.5 w-1.5 rounded-full bg-[#b9cdf3]" />
                            </div>
                            <p className="mt-7 font-mono text-[11.5px] font-bold uppercase tracking-widest text-[var(--color-ink-subtle)]">{c.inLabel}</p>
                            <h3 className="mt-1.5 text-[19px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{c.inTitle}</h3>
                            <ul className="mt-3 flex flex-col gap-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                                {c.inputs.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>

                        <DashedArrow />

                        {/* 루프 — 빛나는 중심 원 */}
                        <div className="flex flex-col items-center text-center">
                            <div aria-hidden className="relative flex h-[240px] w-[240px] items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.16)_0%,rgba(47,123,255,0.06)_55%,transparent_72%)]" />
                                <span className="absolute inset-[34px] rounded-full bg-[#dfeaff]" />
                                <span className="relative flex h-[148px] w-[148px] flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#6aa8ff_0%,#2f7bff_45%,#1b4fc4_100%)] text-white shadow-[0_20px_50px_-12px_rgba(36,97,216,0.7)]">
                                    <span className="text-[24px] font-extrabold tracking-tight">XGEN</span>
                                    <RefreshCw className="mt-1 h-4 w-4 text-white/80" />
                                </span>
                            </div>
                            <p className="mt-7 font-mono text-[11.5px] font-bold uppercase tracking-widest text-[#2461d8]">Self-Improvement Loop</p>
                            <h3 className="mt-1.5 text-[19px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{c.loopTitle}</h3>
                            <ol className="mt-4 flex w-full max-w-[340px] flex-col gap-1.5 text-left">
                                {c.loop.map((s) => (
                                    <li key={s.n} className="flex items-baseline gap-2.5 text-[13.5px] [word-break:keep-all]">
                                        <span className="font-mono text-[12px] font-bold text-[#2f7bff]">{s.n}</span>
                                        <b className="flex-none text-[var(--color-ink)]">{s.t}</b>
                                        <span className="text-[var(--color-ink-muted)]">{s.d}</span>
                                    </li>
                                ))}
                            </ol>
                            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#eef4ff] px-3.5 py-1.5 text-[12.5px] font-semibold text-[#2461d8] [word-break:keep-all]">
                                <ShieldCheck className="h-3.5 w-3.5 flex-none" aria-hidden />
                                {c.loopCaption}
                            </p>
                        </div>

                        <DashedArrow />

                        {/* 결과 — 원 안의 2×2 타일 */}
                        <div className="flex flex-col items-center text-center">
                            <div aria-hidden className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-[#f3f6fb]">
                                <div className="grid grid-cols-2 gap-2.5">
                                    <span className="flex h-[74px] w-[74px] items-center justify-center rounded-xl bg-white shadow-[0_8px_20px_-12px_rgba(20,40,80,0.35)]">
                                        <svg viewBox="0 0 48 28" className="h-7 w-11" fill="none" stroke="#2f7bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="2,24 14,14 24,18 34,8 46,4" />
                                        </svg>
                                    </span>
                                    <span className="flex h-[74px] w-[74px] items-center justify-center rounded-xl bg-white shadow-[0_8px_20px_-12px_rgba(20,40,80,0.35)]">
                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#2f7bff] text-[#2f7bff]">
                                            <Check className="h-4 w-4" strokeWidth={3} />
                                        </span>
                                    </span>
                                    <span className="flex h-[74px] w-[74px] flex-col justify-center gap-1.5 rounded-xl bg-white px-4 shadow-[0_8px_20px_-12px_rgba(20,40,80,0.35)]">
                                        <span className="h-1.5 w-full rounded-full bg-[#9cbcf5]" />
                                        <span className="h-1.5 w-4/5 rounded-full bg-[#9cbcf5]" />
                                        <span className="h-1.5 w-3/5 rounded-full bg-[#2f7bff]" />
                                    </span>
                                    <span className="flex h-[74px] w-[74px] items-center justify-center rounded-xl bg-white shadow-[0_8px_20px_-12px_rgba(20,40,80,0.35)]">
                                        <RotateCcw className="h-7 w-7 text-[#2f7bff]" strokeWidth={2.2} />
                                    </span>
                                </div>
                            </div>
                            <p className="mt-7 font-mono text-[11.5px] font-bold uppercase tracking-widest text-[var(--color-ink-subtle)]">{c.outLabel}</p>
                            <h3 className="mt-1.5 text-[19px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{c.outTitle}</h3>
                            <ul className="mt-3 flex flex-col gap-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">
                                {c.outputs.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <span className="mr-1 text-[13px] font-semibold text-[var(--color-ink-muted)]">{c.govLabel}</span>
                    {c.gov.map((g) => (
                        <span key={g} className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[12.5px] text-[var(--color-ink-muted)]">
                            {g}
                        </span>
                    ))}
                </div>
                <p className="mt-5 text-center text-[12.5px] text-[var(--color-ink-subtle)]">{c.note}</p>
                <NextLinks locale={locale} links={[L.technology, L.security]} center />
            </div>
        </section>
    );
}

/* ======================================================================
 * 7. Scenarios — 고객사례 업종 탭 (소개서 p.26~29)
 * ==================================================================== */

type Scenario = {
    key: string;
    tab: Txt;
    customer: Txt;
    title: Txt;
    /** 패널 왼쪽에 크게 놓는 한 줄 효과 — 검증된 범위만. */
    effect: Txt;
    /** 핵심 적용 3가지 — 짧은 명사구. */
    points: { ko: string[]; en: string[] };
    chipsLabel?: Txt;
    agents: { ko: string[]; en: string[] };
    href?: string;
};

const SCENARIOS: Scenario[] = [
    {
        key: "retail",
        tab: { ko: "유통 · 통신판매", en: "Retail · TV home shopping" },
        customer: { ko: "국내 홈쇼핑사", en: "A Korean TV home shopping company" },
        title: { ko: "인사이트에서 운영 자동화까지, MD 업무의 진화", en: "From insight to operations automation: MD work, evolved" },
        effect: { ko: "MD·방송 운영의 반복 업무를 자동화해 운영 효율 개선", en: "Repetitive MD and broadcast work automated for better operating efficiency" },
        points: {
            ko: ["트렌드·경쟁사 인사이트 리포트 자동 생성", "방송 상품설명·CG 기획안 초안 자동 작성", "배너·상품 조합 기반 전시·편성 자동 구성"],
            en: ["Trend and competitor insight reports, generated", "On-air product copy and graphics plans, drafted", "Display areas and schedules, composed automatically"],
        },
        agents: {
            ko: ["방송 심의 Agent", "상품 등록 자동화 Agent", "상품 심의 Agent"],
            en: ["Broadcast review agent", "Product registration agent", "Product review agent"],
        },
    },
    {
        key: "bank",
        tab: { ko: "금융 · 은행", en: "Finance · Banking" },
        customer: { ko: "제주은행", en: "Jeju Bank" },
        title: { ko: "업무 지원에서 자율 대응까지, 금융 AI Agent의 진화", en: "From work support to autonomous response: financial AI agents, evolved" },
        effect: { ko: "준법·감사·소비자보호 업무에 GenAI 플랫폼 적용", en: "A GenAI platform applied to compliance, audit and consumer protection" },
        points: {
            ko: ["사규·업무 매뉴얼 RAG 검색", "상시 감시·KYC·내부통제 점검 Agent", "ERP 뱅킹 연동 고객 응대 챗봇"],
            en: ["RAG search over internal rules and manuals", "Agents for monitoring, KYC and internal-control checks", "Customer chatbot linked to ERP banking"],
        },
        agents: {
            ko: ["내규 안내 Agent", "소비자보호 민원 처리 Agent", "준법감시 Agent"],
            en: ["Internal-rules agent", "Consumer complaint agent", "Compliance monitoring agent"],
        },
        href: "/customers/case/jeju-bank-genai-platform",
    },
    {
        key: "capital",
        tab: { ko: "금융 · 캐피탈", en: "Finance · Capital" },
        customer: { ko: "I 금융사", en: "Financial company I" },
        title: { ko: "수작업 검토에서 자동 심사까지, 여신 AI Agent의 진화", en: "From manual review to automated screening: lending AI agents, evolved" },
        effect: { ko: "여신심사 자동화와 권한 통제·감사 로그로 내부통제 기준에 대응", en: "Automated credit review with permission control and audit logs for internal-control standards" },
        points: {
            ko: ["신청서·재무자료·심사기준을 연결한 자동 검토", "RBAC 권한 통제와 감사 로그", "고객센터·여신 프로세스 연계"],
            en: ["Automated review linking applications, financials and criteria", "RBAC permission control and audit logs", "Links to the contact center and lending workflow"],
        },
        agents: {
            ko: ["대고객 Q&A Agent (대출상품)", "내규 안내 Agent", "연체 관리 Agent"],
            en: ["Customer Q&A agent (loan products)", "Internal-rules agent", "Collections agent"],
        },
        href: "/customers/case/financial-ai-platform-in-progress",
    },
    {
        key: "code",
        tab: { ko: "제조·방산 · 코드 어시스턴트", en: "Manufacturing · Code Assistant" },
        customer: { ko: "국내 반도체 제조 대기업 · 방산·시스템 기업", en: "A large semiconductor manufacturer · A defense and systems company" },
        title: { ko: "보안 때문에 못 쓰던 코드 어시스턴트를, 사내망 안에서", en: "The coding assistant security ruled out, now inside the internal network" },
        effect: { ko: "외부 연결 없이 사내망·폐쇄망 안에서 코드 지원 제공", en: "Code support delivered inside internal and air-gapped networks, with no external connection" },
        points: {
            ko: ["사내 Local LLM 연동", "XGEN 기반 폐쇄망 온프레미스 구축", "한글 답변 품질 개선과 전사 확산"],
            en: ["Connected to an internal local LLM", "XGEN-based on-premise build in an air-gapped network", "Better Korean answers and company-wide rollout"],
        },
        chipsLabel: { ko: "주요 기능", en: "Key features" },
        agents: {
            ko: ["저장소 기반 응답", "DB 스키마 인지", "코드 리뷰·개선 제안"],
            en: ["Repository-grounded answers", "Schema awareness", "Code review and fixes"],
        },
        href: "/code-assistant",
    },
];

export function XgenScenarios({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const [cur, setCur] = useState(0);
    const s = SCENARIOS[cur];
    return (
        <section id="cases" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead
                    eyebrow="Customer References"
                    title={en ? "XGEN in finance, retail and development" : "금융·유통·개발 현장에 구축한 XGEN"}
                    lead={
                        en
                            ? "Agents for work that needs evidence and control — internal rules, reviews, customer service and code."
                            : "사내 규정·심의·상담·코드처럼 근거와 통제가 필요한 업무에 Agent를 구축했습니다."
                    }
                />
                {/* 업종 탭 — 좁은 화면은 가로 스크롤 */}
                <div className={`${SECTION_BODY_GAP} -mx-6 overflow-x-auto px-6`}>
                    <div role="tablist" aria-label={en ? "Customer references" : "고객 레퍼런스"} className="mx-auto flex w-max gap-2">
                        {SCENARIOS.map((x, i) => (
                            <button
                                key={x.key}
                                type="button"
                                role="tab"
                                id={`xgen-case-tab-${x.key}`}
                                aria-selected={i === cur}
                                aria-controls="xgen-case-panel"
                                onClick={() => setCur(i)}
                                className={cn(
                                    "whitespace-nowrap rounded-full border px-5 py-2.5 text-[14px] font-semibold transition",
                                    i === cur
                                        ? "border-[#2f7bff] bg-[#2f7bff] text-white"
                                        : "border-[var(--color-line)] bg-white text-[var(--color-ink-muted)] hover:border-[#2f7bff] hover:text-[#2461d8]",
                                )}
                            >
                                {T(en, x.tab)}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    id="xgen-case-panel"
                    role="tabpanel"
                    aria-labelledby={`xgen-case-tab-${s.key}`}
                    className="mt-8 rounded-2xl border border-[var(--color-line)] bg-white p-6 lg:p-10"
                >
                    {/* 1024px 이상: 왼쪽 고객·효과 / 오른쪽 핵심 3가지. 그 아래는 위아래 */}
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                        <div>
                            <p className="text-[13px] font-semibold text-[#2461d8] [word-break:keep-all]">{T(en, s.customer)}</p>
                            <h3 className="mt-1.5 text-[20px] font-bold leading-snug tracking-tight text-[var(--color-ink)] [word-break:keep-all] md:text-[24px]">{T(en, s.title)}</h3>
                            <p className="mt-6 border-l-[3px] border-[#2f7bff] pl-4 text-[17px] font-semibold leading-relaxed text-[#1b4fb0] [word-break:keep-all] md:text-[19px]">
                                {T(en, s.effect)}
                            </p>
                        </div>
                        <ol className="flex flex-col divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] self-start">
                            {(en ? s.points.en : s.points.ko).map((p, i) => (
                                <li key={p} className="flex items-baseline gap-4 py-4">
                                    <span className="font-mono text-[13px] font-bold text-[#2f7bff]">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-[15px] font-semibold leading-relaxed text-[var(--color-ink)] [word-break:keep-all]">{p}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-wrap gap-1.5">
                            <span className="mr-1 self-center text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                {s.chipsLabel ? T(en, s.chipsLabel) : en ? "Agents built" : "구축 Agent"}
                            </span>
                            {(en ? s.agents.en : s.agents.ko).map((a) => (
                                <span key={a} className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-2.5 py-1 text-[12.5px] text-[var(--color-ink-muted)]">
                                    {a}
                                </span>
                            ))}
                        </div>
                        {s.href && (
                            <Link
                                href={localeHref(locale, s.href)}
                                className="group inline-flex flex-none items-center gap-1 text-[14px] font-semibold text-[#2461d8] hover:text-[#1b4fb0]"
                            >
                                {s.key === "code" ? (en ? "About Code Assistant" : "코드 어시스턴트 자세히 보기") : en ? "Read the case" : "사례 자세히 보기"}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex lg:justify-end">
                    <Link
                        href={localeHref(locale, "/customers") + "?product=xgen"}
                        className="group inline-flex flex-none items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] hover:text-[#1b4fb0]"
                    >
                        {en ? "All XGEN customer cases" : "XGEN 고객사례 전체 보기"}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ======================================================================
 * 8. 도입 방식·다음 단계 — 소개서 p.31·37·39 (핵심 위주 압축판)
 *    원칙 3개(한 줄 설명) → 5단계 타임라인 → 표준 일정 한 줄
 * ==================================================================== */

const ADOPT = {
    ko: {
        title: "XGEN 도입은 이렇게 진행합니다",
        lead: "검증된 플랫폼 코어 위에 고객 업무만 얹어, 현업이 쓰는 결과를 먼저 만듭니다.",
        principles: [
            { k: "MVP FIRST", t: "검증된 코어 위에서 빠르게", d: "기본 기능은 그대로 쓰고, 고객 업무 화면과 시스템 연계만 개발합니다." },
            { k: "TRUST", t: "기존 문서·권한 그대로", d: "원천 권한을 검색·답변까지 이어받고, 답변마다 출처를 표시합니다." },
            { k: "FDE · 자립 운영", t: "함께 만들고, 스스로 운영", d: "FDE가 Sprint 단위로 현업과 검증하고, 교육·소스·운영 문서를 인계합니다." },
        ],
        stepsLabel: "도입 단계",
        steps: [
            { t: "초도 미팅", d: "과제·보안 요건 공유" },
            { t: "맞춤 데모", d: "고객 업무로 시연" },
            { t: "사전 진단", d: "샘플 문서로 정확도 확인" },
            { t: "MVP 범위 확정", d: "검수 기준·일정 합의" },
            { t: "착수", d: "FDE 투입·Sprint 시작" },
        ],
        scheduleLabel: "표준 일정 예시",
        schedule: [
            { w: "8주 차", t: "MVP 오픈" },
            { w: "16주 차", t: "운영 이관" },
        ],
        scheduleNote: "범위·데이터 준비·승인 절차(API 권한, LLM 사용 승인 등)에 따라 달라집니다.",
    },
    en: {
        title: "How XGEN adoption works",
        lead: "We put only your business logic on a proven platform core, so business users get working results first.",
        principles: [
            { k: "MVP FIRST", t: "Fast, on a proven core", d: "Standard features stay as they are; we build only your business screens and integrations." },
            { k: "TRUST", t: "Your documents and permissions", d: "Source permissions carry through search and answers, and every answer shows its source." },
            { k: "FDE · SELF-RUN", t: "Build together, then run it yourself", d: "FDEs validate with users sprint by sprint, then hand over training, source and runbooks." },
        ],
        stepsLabel: "Adoption steps",
        steps: [
            { t: "Kickoff", d: "Share tasks and security needs" },
            { t: "Tailored demo", d: "Demo on your scenario" },
            { t: "Pre-assessment", d: "Check accuracy on samples" },
            { t: "Fix MVP scope", d: "Agree criteria and schedule" },
            { t: "Start", d: "FDEs join, sprints begin" },
        ],
        scheduleLabel: "Standard schedule example",
        schedule: [
            { w: "Week 8", t: "MVP opens" },
            { w: "Week 16", t: "Handover" },
        ],
        scheduleNote: "Depends on scope, data readiness and approvals (API access, LLM usage approval and more).",
    },
};

export function XgenAdoptionPath({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const a = ADOPT[en ? "en" : "ko"];
    return (
        <section id="adopt" className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className={`mx-auto max-w-7xl px-6 ${SECTION_PAD}`}>
                <SectionHead eyebrow="How to Start" title={a.title} lead={a.lead} />

                {/* 원칙 3개 — 한 줄 설명만 */}
                <ol className={`${SECTION_BODY_GAP} grid gap-4 lg:grid-cols-3`}>
                    {a.principles.map((p, i) => (
                        <li key={p.k} className="rounded-2xl border border-[var(--color-line)] bg-white px-6 py-5">
                            <p className="font-mono text-[12px] font-bold tracking-widest text-[#2461d8]">
                                0{i + 1} · {p.k}
                            </p>
                            <h3 className="mt-2 text-[18px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{p.t}</h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">{p.d}</p>
                        </li>
                    ))}
                </ol>

                {/* 5단계 타임라인 + 표준 일정 */}
                <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-white px-6 py-6 md:px-8">
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-widest text-[var(--color-ink-subtle)]">{a.stepsLabel}</p>
                    <ol className="relative mt-5 grid gap-4 lg:grid-cols-5 lg:gap-3">
                        <span aria-hidden className="pointer-events-none absolute left-[5%] right-[5%] top-[15px] hidden h-px bg-[#c9d6ee] lg:block" />
                        {a.steps.map((s, i) => (
                            <li key={s.t} className="relative flex items-start gap-3 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                                <span className="relative z-10 inline-flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-[#2461d8] font-mono text-[12px] font-bold text-white ring-4 ring-white">
                                    {i + 1}
                                </span>
                                <div className="lg:mt-3">
                                    <p className="text-[15px] font-bold tracking-tight text-[var(--color-ink)] [word-break:keep-all]">{s.t}</p>
                                    <p className="mt-0.5 text-[13px] leading-snug text-[var(--color-ink-muted)] [word-break:keep-all]">{s.d}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--color-line)] pt-5">
                        <span className="basis-full text-[12.5px] font-semibold text-[var(--color-ink-subtle)] sm:basis-auto">{a.scheduleLabel}</span>
                        {a.schedule.map((x, i) => (
                            <span key={x.w} className="inline-flex items-center gap-2 text-[14.5px] text-[var(--color-ink)]">
                                {i > 0 && <ArrowRight className="h-4 w-4 text-[var(--color-ink-subtle)]" aria-hidden />}
                                <b className="font-bold text-[#2461d8]">{x.w}</b>
                                {x.t}
                            </span>
                        ))}
                        <span className="basis-full text-[12.5px] leading-relaxed text-[var(--color-ink-muted)] [word-break:keep-all]">※ {a.scheduleNote}</span>
                    </div>
                </div>

                <NextLinks
                    locale={locale}
                    links={[
                        L.adoption,
                        { label: { ko: "XGEN 소개서", en: "XGEN brochure" }, href: "/xgen-brief-k7m4" },
                        { label: { ko: "15일 무료 체험", en: "15-day free trial" }, href: "/xgen-trial" },
                    ]}
                />
            </div>
        </section>
    );
}

/* ======================================================================
 * 9. Product Overview — 소개 영상 (클릭 시에만 YouTube 로드)
 * ==================================================================== */

const VIDEO_ID = "x0Uch1b0kNk";

export function XgenOverviewVideo({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const [play, setPlay] = useState(false);
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className={`mx-auto max-w-5xl px-6 ${SECTION_PAD}`}>
                <SectionHead
                    eyebrow="Product Overview"
                    title={en ? "See XGEN in one video" : "영상으로 보는 XGEN"}
                    lead={
                        en
                            ? "A tour of the XGEN platform, from the node canvas to the headless engine that runs agents."
                            : "노드 캔버스부터 Agent를 실행하는 헤드리스 엔진까지, XGEN 플랫폼 전반을 소개합니다."
                    }
                />
                <div className={`${SECTION_BODY_GAP} relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-line)] bg-black`}>
                    {play ? (
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                            title={en ? "XGEN overview video" : "XGEN 소개 영상"}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setPlay(true)}
                            className="group absolute inset-0 h-full w-full"
                            aria-label={en ? "Play the XGEN overview video" : "XGEN 소개 영상 재생"}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" />
                            <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#2461d8] shadow-lg transition group-hover:scale-105">
                                <Play className="ml-1 h-7 w-7" fill="currentColor" />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
