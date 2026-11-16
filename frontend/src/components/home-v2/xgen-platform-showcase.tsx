import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/locale-path";
import { Rise } from "@/components/home-v2/journey-motion";

/**
 * 「XGEN 플랫폼을 직접 경험해 보세요」 — 실제 XGEN 화면(Canvas 에이전트플로우)을 크게 보여 주고,
 * 그 위에 실제 화면에서 옮긴 카드(인기 Agent 템플릿 · 시스템 개요 · 관리 메뉴)를 겹쳐 띄운다.
 * 카드 수치는 시험 환경 화면을 옮긴 예시이며, 하단에 그렇게 밝힌다.
 * 바로 아래 「숫자로 증명하는 XGEN」(#222)과 이어지도록 아래쪽을 같은 색으로 끝낸다.
 */
const T = {
    ko: {
        lead: "XGEN 플랫폼을 직접 경험해 보세요.",
        title: "AI Agent의 제작·연결·운영을 하나의 플랫폼에서",
        trial: "체험 신청하기",
        contact: "문의하기",
        imgAlt: "XGEN Canvas에서 사용자 질문 입력, 멀티턴 DB, 정보 검색 노드를 에이전트에 연결한 에이전트플로우 편집 화면",
        templates: "인기 Agent 템플릿",
        run: "실행",
        tpl: ["스키마 출력 템플릿", "문서참조 템플릿", "기본 메모리 에이전트 템플릿"],
        system: "시스템 개요",
        low: "낮음",
        res: [
            { k: "CPU", v: "4.4%", w: 5 },
            { k: "메모리", v: "41.9%", w: 42 },
            { k: "디스크", v: "58.4%", w: 58 },
        ],
        admin: "관리 설정",
        menu: ["사용자 / 접근제어", "Agent 운영", "AI 거버넌스", "MCP 관리"],
        note: "XGEN 화면을 옮긴 예시이며, 표시된 값은 시험 환경 기준입니다. 메뉴와 기능 범위는 버전과 구성에 따라 다릅니다.",
    },
    en: {
        lead: "Experience the XGEN platform yourself.",
        title: "Build, connect and run AI agents on one platform",
        trial: "Request a trial",
        contact: "Contact us",
        imgAlt: "XGEN Canvas editing an agent flow that connects a user input, a multi-turn DB and a retrieval node to an agent",
        templates: "Popular agent templates",
        run: "Run",
        tpl: ["Schema output template", "Document reference template", "Basic memory agent template"],
        system: "System overview",
        low: "Low",
        res: [
            { k: "CPU", v: "4.4%", w: 5 },
            { k: "Memory", v: "41.9%", w: 42 },
            { k: "Disk", v: "58.4%", w: 58 },
        ],
        admin: "Admin settings",
        menu: ["Users / access control", "Agent operations", "AI governance", "MCP management"],
        note: "Screens adapted from XGEN; values shown are from a test environment. Menus and features vary by version and configuration.",
    },
} as const;

const CARD = "rounded-[16px] bg-white text-[#111827] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5";

export function XgenPlatformShowcase({ locale = "ko" }: { locale?: Locale }) {
    const t = locale === "en" ? T.en : T.ko;
    const h = (p: string) => localeHref(locale, p);
    return (
        <section
            data-nav-theme="dark"
            aria-labelledby="xgen-showcase-title"
            className="overflow-hidden bg-[linear-gradient(180deg,#2b2e38_0%,#25272f_55%,#222222_100%)] pt-20 pb-16 text-white md:pt-28 md:pb-24"
        >
            <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
                <Rise className="text-center">
                    <p className="text-[22px] font-medium leading-[1.35] tracking-tight text-white/85 md:text-[36px]">{t.lead}</p>
                    <h2 id="xgen-showcase-title" className="mt-2 text-[24px] font-bold leading-[1.3] tracking-tight [word-break:keep-all] md:text-[40px]">
                        {t.title}
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Link
                            href={h("/xgen-trial")}
                            className="inline-flex h-12 items-center rounded-full border-2 border-[#6d7cff] px-7 text-[15px] font-semibold text-white transition hover:bg-[#6d7cff]/15 md:h-14 md:px-9 md:text-[16px]"
                        >
                            {t.trial}
                        </Link>
                        <Link
                            href={h("/contact")}
                            className="inline-flex h-12 items-center rounded-full border border-white/70 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10 md:h-14 md:px-9 md:text-[16px]"
                        >
                            {t.contact}
                        </Link>
                    </div>
                </Rise>

                <Rise delay={150} className="relative mx-auto mt-14 max-w-[1120px] md:mt-20">
                    {/* 실제 XGEN 화면 */}
                    <div className="overflow-hidden rounded-[14px] bg-white ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
                        <img
                            src="/intro/xgen-canvas-showcase.webp"
                            alt={t.imgAlt}
                            width={1600}
                            height={900}
                            loading="lazy"
                            className="block h-auto w-full"
                        />
                    </div>

                    {/* 겹쳐 띄우는 카드 — 넓은 화면에서만 */}
                    <div className={`${CARD} absolute -left-10 bottom-[8%] hidden w-[300px] p-5 lg:block`} aria-hidden="true">
                        <p className="text-[15px] font-bold">{t.system}</p>
                        <ul className="mt-4 space-y-3">
                            {t.res.map((r) => (
                                <li key={r.k}>
                                    <div className="flex items-center justify-between text-[13px]">
                                        <span className="text-[#4b5563]">{r.k}</span>
                                        <span className="flex items-center gap-2">
                                            <span className="rounded-full bg-[#16a34a]/10 px-2 py-0.5 text-[11px] font-semibold text-[#15803d]">{t.low}</span>
                                            <span className="font-bold tabular-nums">{r.v}</span>
                                        </span>
                                    </div>
                                    <div className="mt-1.5 h-1.5 rounded-full bg-[#eef0f3]">
                                        <div className="h-1.5 rounded-full bg-[#22c55e]" style={{ width: `${r.w}%` }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${CARD} absolute -right-10 top-[16%] hidden w-[330px] p-5 lg:block`} aria-hidden="true">
                        <p className="text-[15px] font-bold">{t.templates}</p>
                        <ul className="mt-4 space-y-2.5">
                            {t.tpl.map((name) => (
                                <li key={name} className="flex items-center justify-between gap-3 rounded-[10px] border border-[#e5e7eb] px-3 py-2.5">
                                    <span className="truncate text-[13px] font-semibold">{name}</span>
                                    <span className="shrink-0 rounded-[6px] border border-[#526be8] px-2 py-0.5 text-[11.5px] font-semibold text-[#526be8]">
                                        {t.run}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${CARD} absolute right-[14%] -bottom-8 hidden w-[260px] p-5 xl:block`} aria-hidden="true">
                        <p className="text-[15px] font-bold">{t.admin}</p>
                        <ul className="mt-3 divide-y divide-[#f0f1f4] text-[13px] text-[#374151]">
                            {t.menu.map((m) => (
                                <li key={m} className="flex items-center justify-between py-2">
                                    <span>{m}</span>
                                    <span className="text-[#9ca3af]">›</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Rise>

                <p className="mx-auto mt-14 max-w-[1120px] text-center text-[12.5px] leading-[1.6] text-white/45 [word-break:keep-all] md:mt-16">
                    {t.note}
                </p>
            </div>
        </section>
    );
}
