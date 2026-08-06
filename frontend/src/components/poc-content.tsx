"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

/**
 * PoC 실증 사례 — 고객 현장의 문제에서 출발해 XGEN 기술로 검증한 4가지 해결.
 * PPT 장표를 그대로 옮기지 않고, 각 사례를 웹 에디토리얼(카피 + 사례별 SVG 일러스트 +
 * 인용 + 성과)로 재구성한다. 일러스트는 인라인 SVG라 해상도 독립이고, 본문은 실제 텍스트라
 * GEO·SEO 크롤링·인용이 가능하다.
 */
interface Case {
    id: string;
    category: string;
    solution: string;
    headline: string;
    body: string;
    quote: string;
    company: string;
    outcomes: string[];
}

/**
 * 영문 사례 문구 — 고객사는 한국어와 동일하게 익명(M사 → Company M)으로 유지한다.
 * 한국어 원문은 CASES 에 그대로 두고, 영문만 여기에 모은다.
 */
const CASES_EN: Record<
    string,
    {
        category: string;
        headline: string;
        body: string;
        quote: string;
        company: string;
        outcomes: string[];
    }
> = {
    ontology: {
        category: "Knowledge reasoning",
        headline: "Answers that thinned out as documents piled up, reconnected by relationship",
        body: "One customer held survey, performance, evaluation, and audience-response data — and still felt that important information was missing from the AI's answers. The data sat in separate places, so cause and relationship could not be explained. XGEN's ontology goes past similarity-based top-K lookup to traverse meaning and relationships, answering not just what exists but why it is so and what it connects to.",
        quote: "The answer isn't wrong, but it feels like something important is missing",
        company: "Company M",
        outcomes: ["Relationship-based fact search", "Cause and context reasoning"],
    },
    mcp: {
        category: "Agent portability",
        headline: "Build the agent once, run it inside the internal network",
        body: "Reusing an agent built on the external network with n8n, Dify, XGEN, or Claude meant rebuilding it for a different platform inside — operating experience was lost and cost was paid twice. MCP App wraps an agent as a standard package that ports between environments, so support, review, and reporting agents run inside the internal network as they are.",
        quote: "We want to reuse the agents we built outside on our internal network",
        company: "Company J",
        outcomes: ["Build once, run anywhere", "Agent reuse across environments"],
    },
    pathfinder: {
        category: "No-code integration",
        headline: "From login to tool registration, without a developer",
        body: "API documentation alone made integrations hard to implement, and the screens were not free to arrange, so even a small idea kept needing development capacity. Ideas stayed in the planner's head. PathFinder connects login, API wiring, tool registration, and testing without a line of code, so the business side turns its own ideas into working tools.",
        quote: "In the end we couldn't move forward without a developer",
        company: "Company I",
        outcomes: ["No-code integration", "Business-led tool building"],
    },
    floui: {
        category: "Question-to-UI",
        headline: "Ask the question, and the analysis screen appears",
        body: "Looking at order, return, and purchasing data from several angles meant requesting a report or commissioning a separate analysis every time — and in a meeting or a planning session there was no way to test a hypothesis on the spot. FloUI turns the question itself into the analysis screen (question-to-UI), so several angles can be explored and checked immediately.",
        quote: "Every time, we have to request a report or commission a separate analysis",
        company: "Company L",
        outcomes: ["Free analysis from several angles", "Hypotheses tested on the spot"],
    },
    "mcp-tool": {
        category: "Review-workflow automation",
        headline: "Product review that cross-checks many documents, handled by one MCP Tool",
        body: "Putting a fashion product on air and on sale meant a person manually cross-checking the product specification, test report, care label, import declaration, OEM contract, and more to judge whether it complied. We turned that review workflow into an MCP Tool: extracting functional claims, checking them against the test report, cross-verifying care label and country of origin, and issuing a combined QA verdict — cleared for sale, needs correction, or not broadcastable — wired straight back into the system.",
        quote: "Before a product goes on air, someone has to check by hand that the documents agree with each other",
        company: "Company L",
        outcomes: ["Automated document cross-verification", "Automatic sale-compliance verdict"],
    },
};

/** 일러스트 안의 라벨·대체텍스트. SVG 안 텍스트도 언어 신호라 함께 번역한다. */
const ART: Record<Locale, Record<string, string>> = {
    ko: {
        ontAlt: "흩어진 데이터가 관계 그래프로 연결되는 모습",
        ontApart: "각자 따로",
        ontHub: "관계",
        ontCaption: "의미·관계 탐색",
        mcpAlt: "외부망 Agent가 MCP 패키지로 내부망에 이식되는 모습",
        mcpOuter: "외부망",
        mcpInner: "내부망",
        mcpCaption: "한 번 만들어 그대로 재사용",
        pfAlt: "로그인부터 도구 등록, 테스트까지 코드 없는 플로우",
        pfLogin: "로그인",
        pfApi: "API 연결",
        pfTool: "도구 등록",
        pfTest: "테스트",
        mtAlt: "여러 제출 문서를 교차 검증해 MCP Tool로 전환하고 판매 적합성을 판정하는 모습",
        mtDocs: "제출 문서",
        mtQa: "QA 교차 검증",
        mtOk: "판매 가능",
        mtFix: "수정 필요",
        mtNo: "방송 불가",
        floAlt: "질문이 분석 대시보드로 변환되는 모습",
        floCaption: "질문이 곧 분석 화면으로",
    },
    en: {
        ontAlt: "Scattered data being connected into a relationship graph",
        ontApart: "Kept apart",
        ontHub: "Relations",
        ontCaption: "Traversing meaning and relations",
        mcpAlt: "An external-network agent ported into the internal network as an MCP package",
        mcpOuter: "External",
        mcpInner: "Internal",
        mcpCaption: "Build once, reuse as is",
        pfAlt: "A no-code flow from login through tool registration and testing",
        pfLogin: "Sign in",
        pfApi: "Connect API",
        pfTool: "Register tool",
        pfTest: "Test",
        mtAlt: "Submitted documents cross-verified, turned into an MCP Tool, and judged for sale compliance",
        mtDocs: "Submitted docs",
        mtQa: "QA cross-check",
        mtOk: "Cleared",
        mtFix: "Needs fix",
        mtNo: "Not for air",
        floAlt: "A question turning into an analysis dashboard",
        floCaption: "The question becomes the screen",
    },
};

/** 화면 공통 문구. */
const COPY: Record<Locale, { intro: string }> = {
    ko: {
        intro:
            "엔터프라이즈 AI는 데모에서 끝나지 않습니다. Plateer Labs는 고객 현장의 실제 문제에서 출발해, 함께 연구한 기술로 검증 가능한 해결을 만듭니다",
    },
    en: {
        intro:
            "Enterprise AI does not end at the demo. Plateer Labs starts from a real problem on the customer's floor and builds a solution that can be verified, using technology researched together",
    },
};

const CASES: Case[] = [
    {
        id: "ontology",
        category: "지식 추론",
        solution: "Ontology",
        headline: "문서가 쌓일수록 떨어지는 답변을, 관계로 다시 잇다",
        body: "한 고객사는 설문·공연·평가·반응 데이터를 모두 보유했지만, 정작 AI 답변에서 중요한 정보가 빠진다고 느꼈습니다. 데이터가 서로 따로 존재해 원인과 관계를 설명할 수 없었기 때문입니다. XGEN의 Ontology는 유사도 기반 Top-K 조회를 넘어 의미와 관계를 탐색해, ‘무엇이 있는가’가 아니라 ‘왜 그런가, 무엇과 연결되는가’까지 설명합니다.",
        quote: "틀린 답변은 아니지만 중요한 정보가 빠지는 느낌이에요",
        company: "M사",
        outcomes: ["관계 기반 Fact Search", "원인·맥락 추론"],
    },
    {
        id: "mcp",
        category: "에이전트 이식",
        solution: "MCP App",
        headline: "한 번 만든 Agent를, 내부망에서 그대로",
        body: "외부망에서 n8n·Dify·XGEN·Claude로 만든 Agent를 내부망에서 재사용하려 하면 플랫폼이 달라 다시 개발해야 했고, 운영 경험은 단절되고 비용은 중복됐습니다. MCP App은 Agent를 표준 패키지로 감싸 환경 사이를 이식해, 상담·심사·보고서 Agent를 내부망에서 그대로 재사용합니다.",
        quote: "외부망에서 개발한 Agent를 내부망에서 재활용하고 싶어요",
        company: "J사",
        outcomes: ["Build Once · Run Anywhere", "환경 간 Agent 재사용"],
    },
    {
        id: "pathfinder",
        category: "No-Code 통합",
        solution: "PathFinder",
        headline: "개발자 없이, 로그인부터 도구 등록까지",
        body: "API 문서만으로는 연동 구현이 어렵고 화면 구성도 자유롭지 않아, 작은 기획에도 개발 리소스가 계속 필요했습니다. 결국 기획자의 아이디어는 머릿속에만 머물렀습니다. PathFinder는 로그인부터 API 연결, 도구 등록, 테스트까지 코드 한 줄 없이 잇고, 현업이 직접 아이디어를 실행 도구로 만듭니다.",
        quote: "결국 개발자 없이는 앞으로 나아갈 수 없었습니다",
        company: "I사",
        outcomes: ["No-Code Integration", "현업 주도 도구화"],
    },
    {
        id: "floui",
        category: "Question-to-UI",
        solution: "FloUI",
        headline: "질문하면, 곧바로 분석 화면이 된다",
        body: "주문·반품·발주 데이터를 여러 관점에서 보려 할 때마다 보고서를 요청하거나 별도 분석을 의뢰해야 했고, 회의나 기획 자리에서 스스로 가설을 검증할 수 없었습니다. FloUI는 질문을 곧 분석 화면으로 바꿔(Question-to-UI), 여러 관점의 탐색과 즉시 검증을 가능하게 합니다.",
        quote: "매번 보고서를 요청하거나 별도 분석을 의뢰해야 합니다",
        company: "L사",
        outcomes: ["여러 관점 자유 분석", "가설 즉시 검증"],
    },
    {
        id: "mcp-tool",
        category: "심사 워크플로우 자동화",
        solution: "MCP Tool",
        headline: "여러 문서를 대조하는 상품 심사를, MCP Tool 하나로",
        body: "패션 상품을 방송·판매하려면 상품기술서·시험성적서·케어라벨·수입신고필증·OEM 계약서 등 여러 문서를 사람이 일일이 대조해 적합 여부를 판단해야 했습니다. 우리는 이 심사 워크플로우를 MCP Tool로 전환해, 기능성 표기 추출부터 시험성적서 근거 확인, 케어라벨·원산지 교차 검증, 통합 QA 판정까지 자동화하고, 판매 가능·수정 필요·방송 불가를 판정해 시스템에 바로 연동합니다.",
        quote: "상품을 방송에 올리기 전에 문서가 서로 맞는지 사람이 일일이 대조해야 합니다",
        company: "L사",
        outcomes: ["문서 교차 검증 자동화", "판매 적합성 자동 판정"],
    },
];

/* ── 사례별 인라인 SVG 일러스트 ─────────────────────────────── */
function CaseArt({ id, locale }: { id: string; locale: Locale }) {
    const a = ART[locale];
    const wrap =
        "aspect-[4/3] w-full rounded-2xl border border-[var(--color-line)] bg-gradient-to-br from-[#f5f8ff] to-[#eef2fb]";

    if (id === "ontology") {
        return (
            <svg viewBox="0 0 440 330" className={wrap} role="img" aria-label={a.ontAlt}>
                <defs>
                    <linearGradient id="ont-hub" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2f7bff" />
                        <stop offset="1" stopColor="#7c5cff" />
                    </linearGradient>
                </defs>
                {/* 분리된(왼쪽) 데이터 — 점선 원, 연결 없음 */}
                {[
                    [70, 80],
                    [60, 175],
                    [95, 260],
                ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="16" fill="#ffffff" stroke="#c4ccdb" strokeWidth="1.5" strokeDasharray="3 3" />
                ))}
                <text x="78" y="305" textAnchor="middle" fontSize="12" fill="#8b93a4">{a.ontApart}</text>

                {/* 연결된(오른쪽) 관계 그래프 */}
                <g stroke="#9bb8f0" strokeWidth="2">
                    <line x1="300" y1="120" x2="230" y2="70" />
                    <line x1="300" y1="120" x2="380" y2="80" />
                    <line x1="300" y1="120" x2="360" y2="200" />
                    <line x1="300" y1="120" x2="230" y2="220" />
                    <line x1="230" y1="220" x2="360" y2="200" />
                </g>
                {[
                    [230, 70],
                    [380, 80],
                    [360, 200],
                    [230, 220],
                ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="13" fill="#ffffff" stroke="#2f7bff" strokeWidth="2" />
                ))}
                <circle cx="300" cy="120" r="24" fill="url(#ont-hub)" />
                <text x="300" y="125" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{a.ontHub}</text>
                <text x="300" y="305" textAnchor="middle" fontSize="12" fill="#5a6478">{a.ontCaption}</text>
            </svg>
        );
    }

    if (id === "mcp") {
        const panel = (x: number, label: string) => (
            <g>
                <rect x={x} y="70" width="120" height="180" rx="14" fill="#ffffff" stroke="#d4ddf2" strokeWidth="1.5" />
                <text x={x + 60} y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2f3aa0">{label}</text>
                {[120, 165, 210].map((cy, i) => (
                    <g key={i}>
                        <rect x={x + 22} y={cy - 14} width="76" height="28" rx="8" fill="#f3f7ff" stroke="#cfe0ff" />
                        <circle cx={x + 38} cy={cy} r="6" fill="#2f7bff" />
                        <rect x={x + 50} y={cy - 4} width="40" height="8" rx="4" fill="#bcd0f5" />
                    </g>
                ))}
            </g>
        );
        return (
            <svg viewBox="0 0 440 330" className={wrap} role="img" aria-label={a.mcpAlt}>
                <defs>
                    <linearGradient id="mcp-box" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2f7bff" />
                        <stop offset="1" stopColor="#7c5cff" />
                    </linearGradient>
                </defs>
                {panel(20, a.mcpOuter)}
                {panel(300, a.mcpInner)}
                {/* 이동 화살표 */}
                <line x1="148" y1="160" x2="292" y2="160" stroke="#9bb8f0" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M286 153 l10 7 -10 7" fill="none" stroke="#2f7bff" strokeWidth="2.5" />
                {/* MCP 패키지 */}
                <g>
                    <rect x="186" y="128" width="68" height="64" rx="14" fill="url(#mcp-box)" />
                    <path d="M220 138 l24 12 v20 l-24 12 -24-12 v-20 z" fill="none" stroke="#fff" strokeWidth="2" />
                    <line x1="220" y1="138" x2="220" y2="194" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
                </g>
                <text x="220" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2f3aa0">MCP App</text>
                <text x="220" y="234" textAnchor="middle" fontSize="11" fill="#5a6478">{a.mcpCaption}</text>
            </svg>
        );
    }

    if (id === "pathfinder") {
        const steps = [a.pfLogin, a.pfApi, a.pfTool, a.pfTest];
        return (
            <svg viewBox="0 0 440 330" className={wrap} role="img" aria-label={a.pfAlt}>
                <defs>
                    <linearGradient id="pf-step" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2f7bff" />
                        <stop offset="1" stopColor="#7c5cff" />
                    </linearGradient>
                </defs>
                {steps.map((s, i) => {
                    const y = 48 + i * 64;
                    return (
                        <g key={s}>
                            {i < 3 && <line x1="80" y1={y + 24} x2="80" y2={y + 40} stroke="#9bb8f0" strokeWidth="2" />}
                            <circle cx="80" cy={y} r="20" fill="url(#pf-step)" />
                            <text x="80" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">{i + 1}</text>
                            <rect x="124" y={y - 19} width="240" height="38" rx="10" fill="#ffffff" stroke="#d4ddf2" strokeWidth="1.5" />
                            <text x="146" y={y + 5} fontSize="14" fontWeight="600" fill="#1f2733">{s}</text>
                        </g>
                    );
                })}
                {/* No-Code 배지 */}
                <g>
                    <rect x="268" y="288" width="96" height="30" rx="15" fill="#eafaf1" stroke="#b6e6cd" />
                    <text x="316" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f9d6f">No&nbsp;Code</text>
                </g>
            </svg>
        );
    }

    if (id === "mcp-tool") {
        return (
            <svg viewBox="0 0 440 330" className={wrap} role="img" aria-label={a.mtAlt}>
                <defs>
                    <linearGradient id="mt-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2f7bff" />
                        <stop offset="1" stopColor="#7c5cff" />
                    </linearGradient>
                </defs>
                {/* 제출 문서 더미 */}
                {[0, 1, 2].map((d) => (
                    <rect
                        key={d}
                        x={40 + d * 8}
                        y={104 - d * 8}
                        width="60"
                        height="76"
                        rx="8"
                        fill="#ffffff"
                        stroke="#d4ddf2"
                        strokeWidth="1.5"
                    />
                ))}
                <g transform="translate(56 88)">
                    <rect width="60" height="76" rx="8" fill="#ffffff" stroke="#2f7bff" strokeWidth="1.5" />
                    <rect x="12" y="16" width="36" height="5" rx="2.5" fill="#bcd0f5" />
                    <rect x="12" y="30" width="36" height="5" rx="2.5" fill="#dbe3f3" />
                    <rect x="12" y="44" width="24" height="5" rx="2.5" fill="#dbe3f3" />
                </g>
                <text x="86" y="192" textAnchor="middle" fontSize="12" fill="#5a6478">{a.mtDocs}</text>

                {/* arrow */}
                <line x1="150" y1="126" x2="186" y2="126" stroke="#9bb8f0" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M180 119 l10 7 -10 7" fill="none" stroke="#2f7bff" strokeWidth="2.5" />

                {/* QA 교차 검증 — shield */}
                <path d="M232 88 l34 12 v26 c0 22 -16 34 -34 42 c-18 -8 -34 -20 -34 -42 v-26 z" fill="url(#mt-grad)" />
                <path d="M218 126 l9 9 18 -18" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <text x="232" y="192" textAnchor="middle" fontSize="12" fill="#5a6478">{a.mtQa}</text>

                {/* arrow */}
                <line x1="286" y1="126" x2="322" y2="126" stroke="#9bb8f0" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M316 119 l10 7 -10 7" fill="none" stroke="#2f7bff" strokeWidth="2.5" />

                {/* MCP Tool cube */}
                <rect x="338" y="96" width="64" height="60" rx="14" fill="url(#mt-grad)" />
                <path d="M370 105 l22 11 v18 l-22 11 -22 -11 v-18 z" fill="none" stroke="#fff" strokeWidth="2" />
                <text x="370" y="192" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2f3aa0">MCP Tool</text>

                {/* 판정 결과 칩 */}
                <g fontSize="12" fontWeight="600">
                    <g transform="translate(34 240)">
                        <rect width="118" height="34" rx="17" fill="#eafaf1" stroke="#b6e6cd" />
                        <circle cx="22" cy="17" r="8" fill="#16a34a" />
                        <path d="M18 17 l3 3 6 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="38" y="21" fill="#0f9d6f">{a.mtOk}</text>
                    </g>
                    <g transform="translate(162 240)">
                        <rect width="114" height="34" rx="17" fill="#fff7e6" stroke="#f3dca0" />
                        <circle cx="22" cy="17" r="8" fill="#f59e0b" />
                        <text x="22" y="22" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">!</text>
                        <text x="38" y="21" fill="#b9810f">{a.mtFix}</text>
                    </g>
                    <g transform="translate(286 240)">
                        <rect width="114" height="34" rx="17" fill="#fdf0f1" stroke="#f3c2c8" />
                        <circle cx="22" cy="17" r="8" fill="#e11d48" />
                        <path d="M18 13 l8 8 M26 13 l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                        <text x="38" y="21" fill="#d61f47">{a.mtNo}</text>
                    </g>
                </g>
            </svg>
        );
    }

    // floui — question → dashboard
    return (
        <svg viewBox="0 0 440 330" className={wrap} role="img" aria-label={a.floAlt}>
            <defs>
                <linearGradient id="flo-q" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2f7bff" />
                    <stop offset="1" stopColor="#7c5cff" />
                </linearGradient>
            </defs>
            {/* 질문 버블 */}
            <g>
                <rect x="26" y="120" width="96" height="64" rx="16" fill="url(#flo-q)" />
                <path d="M52 184 l0 18 18 -14 z" fill="#7c5cff" />
                <text x="74" y="160" textAnchor="middle" fontSize="30" fontWeight="800" fill="#fff">?</text>
            </g>
            <line x1="130" y1="152" x2="172" y2="152" stroke="#9bb8f0" strokeWidth="2" strokeDasharray="5 5" />
            <path d="M166 145 l10 7 -10 7" fill="none" stroke="#2f7bff" strokeWidth="2.5" />
            {/* 대시보드 윈도우 */}
            <g>
                <rect x="186" y="64" width="228" height="200" rx="14" fill="#ffffff" stroke="#d4ddf2" strokeWidth="1.5" />
                <rect x="186" y="64" width="228" height="30" rx="14" fill="#f3f7ff" />
                <circle cx="204" cy="79" r="4" fill="#cfd7e6" />
                <circle cx="218" cy="79" r="4" fill="#cfd7e6" />
                <circle cx="232" cy="79" r="4" fill="#cfd7e6" />
                {/* 막대 차트 */}
                <g fill="#2f7bff">
                    <rect x="206" y="180" width="20" height="48" rx="3" />
                    <rect x="236" y="156" width="20" height="72" rx="3" opacity="0.85" />
                    <rect x="266" y="196" width="20" height="32" rx="3" opacity="0.7" />
                </g>
                {/* 도넛 */}
                <circle cx="350" cy="160" r="34" fill="none" stroke="#e2e8f4" strokeWidth="14" />
                <circle cx="350" cy="160" r="34" fill="none" stroke="#7c5cff" strokeWidth="14" strokeDasharray="120 214" strokeLinecap="round" transform="rotate(-90 350 160)" />
            </g>
            <text x="300" y="296" textAnchor="middle" fontSize="12" fill="#5a6478">{a.floCaption}</text>
        </svg>
    );
}

function useScrollSpy(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);
    return active;
}

export function PocContent({ locale = "ko" }: { locale?: Locale }) {
    const active = useScrollSpy(CASES.map((c) => c.id));
    const t = COPY[locale];
    const en = locale === "en";
    // 영문일 때는 CASES_EN 의 문구로 갈아끼운다(카테고리·헤드라인·본문·인용·성과).
    const cases = en
        ? CASES.map((c) => ({ ...c, ...CASES_EN[c.id] }))
        : CASES;

    return (
        <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0">
                {/* 도입 — 웹 톤의 한 문단 */}
                <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
                    {t.intro}
                </p>

                <div className="mt-4">
                    {cases.map((c, i) => (
                        <article
                            key={c.id}
                            id={c.id}
                            className="scroll-mt-28 border-t border-[var(--color-line)] py-12 first:border-t-0 md:py-20"
                        >
                            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                                {/* 일러스트 — 짝수 사례는 반대쪽으로 교차 배치 */}
                                <div className={cn(i % 2 === 1 && "md:order-2")}>
                                    <CaseArt id={c.id} locale={locale} />
                                </div>

                                {/* 카피 */}
                                <div>
                                    <div className="flex items-center gap-2 text-[15px] font-semibold">
                                        <span className="text-[var(--color-ink-subtle)]">
                                            {c.category}
                                        </span>
                                        <span className="text-[var(--color-line-strong)]">
                                            ·
                                        </span>
                                        <span className="bg-gradient-to-r from-[#2f7bff] to-[#7c5cff] bg-clip-text text-transparent">
                                            {c.solution}
                                        </span>
                                    </div>

                                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[26px] md:leading-snug">
                                        {c.headline}
                                    </h2>

                                    <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.body}
                                    </p>

                                    <figure className="mt-5 border-l-2 border-[#2f7bff]/40 pl-4">
                                        <blockquote className="text-[17px] font-medium italic leading-relaxed text-[var(--color-ink)]">
                                            “{c.quote}”
                                        </blockquote>
                                        <figcaption className="mt-1 text-[15px] text-[var(--color-ink-subtle)]">
                                            — {c.company}
                                        </figcaption>
                                    </figure>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {c.outcomes.map((o) => (
                                            <span
                                                key={o}
                                                className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-[14.5px] font-semibold text-[var(--color-ink-muted)]"
                                            >
                                                {o}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* sticky scroll-spy index (right) */}
            <aside className="hidden lg:block">
                <nav className="sticky top-28 border-l border-[var(--color-line)]">
                    {cases.map((c) => (
                        <a
                            key={c.id}
                            href={`#${c.id}`}
                            className={cn(
                                "-ml-px block border-l-2 py-2.5 pl-4 transition",
                                active === c.id
                                    ? "border-[#2f7bff]"
                                    : "border-transparent hover:border-[var(--color-line-strong)]",
                            )}
                        >
                            <span
                                className={cn(
                                    "block text-[15px] font-bold leading-snug transition",
                                    active === c.id
                                        ? "text-[var(--color-ink)]"
                                        : "text-[var(--color-ink-muted)]",
                                )}
                            >
                                {c.category}
                            </span>
                            <span
                                className={cn(
                                    "mt-0.5 block text-[13px] leading-snug",
                                    active === c.id
                                        ? "text-[#2f7bff]"
                                        : "text-[var(--color-ink-subtle)]",
                                )}
                            >
                                {c.solution}
                            </span>
                        </a>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
