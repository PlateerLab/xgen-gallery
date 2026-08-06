import Link from "next/link";
import { BadgeCheck, Check, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const T: Record<
    Locale,
    {
        badgeDone: string;
        gsTitle: string;
        gsSub: string;
        gsAlt: string;
        gsBody: string;
        gsChips: string[];
        journeyTitle: string;
        badgeInProgress: string;
        amSub: string;
        amBody: string;
        amFacts: string[];
    }
> = {
    ko: {
        badgeDone: "획득 완료",
        gsTitle: "GS인증 1등급",
        gsSub: "Good Software Certification · 최고 등급",
        gsAlt: "GS(Good Software) 인증 1등급 마크",
        gsBody: "XGEN이 국가 공인 소프트웨어 품질인증 GS(Good Software) 1등급을 획득했습니다. 제3자 시험기관(TTA)이 기능성·신뢰성·사용성 등 품질 전반을 시험해 최고 등급으로 검증했습니다.",
        gsChips: ["국가 공인 인증", "제3자 시험 · TTA", "최고 등급 · 1등급"],
        journeyTitle: "인증 여정 기록",
        badgeInProgress: "인증 시험 진행 중",
        amSub: "AI 신뢰성 인증 · 한국인공지능산업협회(AIIA)",
        amBody: "XGEN은 AI의 신뢰성·투명성·강건성을 제3자가 검증하는 AI 신뢰성 인증 AI-MASTER 시험을 받고 있습니다.",
        amFacts: [
            "국제표준(EU Trustworthy AI · ISO/IEC) 기반 AI 신뢰성 평가",
            "AI 거버넌스 문서 심사 + 기능 시험(63개 정량 항목) 병행",
            "2026년 6월 착수 · 정상 수행 시 약 13주 평가",
        ],
    },
    en: {
        badgeDone: "Awarded",
        gsTitle: "GS certification, Grade 1",
        gsSub: "Good Software Certification · highest grade",
        gsAlt: "Grade 1 GS (Good Software) certification mark",
        gsBody: "XGEN has been awarded Grade 1 in GS (Good Software), Korea's national software quality certification. TTA, an accredited third-party laboratory, tested functionality, reliability, usability, and overall quality, and verified it at the highest grade.",
        gsChips: ["National certification", "Third-party testing · TTA", "Highest grade · Grade 1"],
        journeyTitle: "The certification journey",
        badgeInProgress: "Certification in progress",
        amSub: "AI reliability certification · Korea AI Industry Association (AIIA)",
        amBody: "XGEN is undergoing AI-MASTER, an AI reliability certification in which a third party verifies the reliability, transparency, and robustness of the AI.",
        amFacts: [
            "AI reliability assessed against international standards (EU Trustworthy AI, ISO/IEC)",
            "AI governance documentation review alongside functional testing (63 quantitative criteria)",
            "Started June 2026 · roughly a 13-week assessment when it runs to plan",
        ],
    },
};

/**
 * 인증·품질 — 획득한 GS인증(주역)과 진행 중 AI-MASTER(조역)를 비대칭 2카드로.
 * 제품 신뢰의 근거라 Product 페이지(/product#certification)에 렌더한다.
 * 표시 정보는 대외 공개 가능한 사실만(발급기관·심사 방식·상태); 사내 정보 제외.
 */
export function CertificationQuality({
    locale = "ko",
}: {
    locale?: Locale;
}) {
    const t = T[locale];
    // GS인증 여정 기록(태그: GS인증)을 최신순 최대 3개 — 투명성의 신뢰 근거.
    const gsPosts = getAllPosts()
        .filter((p) => p.tags.includes("GS인증"))
        .slice(0, 3);

    const gsChips = t.gsChips;
    const aiMasterFacts = t.amFacts;

    return (
        <div className="grid gap-5 lg:grid-cols-5 lg:items-stretch">
            {/* GS인증 1등급 — 획득 완료 (주역, 3/5) */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-[#cfe0ff] bg-[linear-gradient(135deg,#f4f8ff_0%,#ffffff_60%)] p-7 sm:p-8 lg:col-span-3">
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f6ee] px-3 py-1 text-[12.5px] font-bold text-[#1b8a4b]">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            {t.badgeDone}
                        </span>
                        <h3 className="mt-3.5 text-[26px] font-bold leading-tight tracking-tight text-[var(--color-ink)]">
                            {t.gsTitle}
                        </h3>
                        <p className="mt-1 text-[14px] font-semibold text-[var(--color-ink-subtle)]">
                            {t.gsSub}
                        </p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/gs-seal.png"
                        alt={t.gsAlt}
                        className="h-28 w-auto flex-none drop-shadow-[0_10px_24px_rgba(20,60,120,0.18)]"
                    />
                </div>

                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.gsBody}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {gsChips.map((c) => (
                        <span
                            key={c}
                            className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[12.5px] font-semibold text-[var(--color-ink-muted)]"
                        >
                            {c}
                        </span>
                    ))}
                </div>

                {gsPosts.length > 0 && (
                    <div className="mt-auto border-t border-[#dfeaff] pt-5">
                        <p className="text-[12.5px] font-bold uppercase tracking-wider text-[var(--color-ink-subtle)]">
                            {t.journeyTitle}
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                            {gsPosts.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        href={localeHref(locale, `/blog/${p.slug}`)}
                                        className="group flex items-center gap-2 text-[14px] leading-snug text-[var(--color-ink-muted)] transition hover:text-[#2461d8]"
                                    >
                                        <ArrowRight className="h-3.5 w-3.5 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#2461d8]" />
                                        <span className="truncate">{p.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* AI-MASTER — 진행 중 (조역, 2/5) */}
            <div className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 lg:col-span-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eef4ff] px-3 py-1 text-[12.5px] font-bold text-[#2461d8]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2f7bff]" />
                    {t.badgeInProgress}
                </span>
                <h3 className="mt-3.5 text-[23px] font-bold leading-tight tracking-tight text-[var(--color-ink)]">
                    AI-MASTER
                </h3>
                <p className="mt-1 text-[14px] font-semibold text-[var(--color-ink-subtle)]">
                    {t.amSub}
                </p>

                <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    {t.amBody}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[var(--color-line)] pt-4">
                    {aiMasterFacts.map((f) => (
                        <li
                            key={f}
                            className="flex items-start gap-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]"
                        >
                            <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
