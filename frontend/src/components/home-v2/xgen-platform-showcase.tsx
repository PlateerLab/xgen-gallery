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
        lead: "Agent 생성부터 업무 실행과 운영까지, XGEN의 실제 환경을 확인해 보세요.",
        title: "AI Agent가 일하는 방식, 직접 경험해 보세요.",
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
        lead: "From creating agents to running and operating real work, see XGEN in an actual environment.",
        title: "See how AI agents work, firsthand.",
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

/** 영상 위에 겹치는 실제 화면 캡처 (토큰 분포 · 결재 · 시스템 개요 · 평가 · 정책).
 * 영상 오른쪽 채팅 창(가로 65% 이후)은 가리지 않도록, 탐색기·선택된 파일 영역(약 15~63%) 안에만 배치한다. */
const OVERLAYS = [
    { src: "/intro/xgen-ov-tokens.webp", w: 397, h: 246, pos: "left-[12%] top-[31%] w-[22%]", show: "lg:block", delay: "0s" },
    { src: "/intro/xgen-ov-system.webp", w: 817, h: 349, pos: "left-[16.5%] top-[57%] w-[30%]", show: "lg:block", delay: "-4.1s" },
    { src: "/intro/xgen-ov-policy.webp", w: 755, h: 243, pos: "left-[20%] bottom-[0%] w-[32%]", show: "xl:block", delay: "-5.4s" },
] as const;

const CARD = "rounded-[16px] bg-white text-[#111827] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5";

export function XgenPlatformShowcase({ locale = "ko" }: { locale?: Locale }) {
    const t = locale === "en" ? T.en : T.ko;
    const h = (p: string) => localeHref(locale, p);
    return (
        <section
            data-nav-theme="dark"
            aria-labelledby="xgen-showcase-title"
            className="overflow-hidden bg-[linear-gradient(180deg,#000000_0%,#16181f_22%,#25272f_60%,#222222_100%)] pt-16 pb-16 text-white md:pt-20 md:pb-24"
        >
            <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
                <Rise className="text-center">
                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#5fd0ff]">Product Tour</p>
                    <h2 id="xgen-showcase-title" className="mt-4 text-[26px] font-bold leading-[1.3] tracking-tight [word-break:keep-all] md:text-[40px]">
                        {t.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-[720px] text-[15.5px] font-normal leading-[1.6] text-white/70 [word-break:keep-all] md:text-[18px]">{t.lead}</p>
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
                        <video
                            src="/intro/xgen-showcase.mp4"
                            poster="/intro/xgen-showcase-poster.jpg"
                            aria-label={t.imgAlt}
                            width={1600}
                            height={868}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="block h-auto w-full"
                        />
                    </div>

                    {/* 영상 위에 겹쳐 띄우는 실제 XGEN 화면 캡처 — 넓은 화면에서만 */}
                    {OVERLAYS.map((o) => (
                        <div key={o.src} className={`absolute hidden ${o.pos} ${o.show}`} aria-hidden="true">
                            <div
                                className={`${CARD} overflow-hidden motion-safe:animate-[polarFloatA_7s_ease-in-out_infinite]`}
                                style={{ animationDelay: o.delay }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={o.src} alt="" width={o.w} height={o.h} loading="lazy" decoding="async" className="block h-auto w-full" />
                            </div>
                        </div>
                    ))}
                </Rise>

                <p className="mx-auto mt-14 max-w-[1120px] text-center text-[12.5px] leading-[1.6] text-white/45 [word-break:keep-all] md:mt-16">
                    {t.note}
                </p>
            </div>
        </section>
    );
}
