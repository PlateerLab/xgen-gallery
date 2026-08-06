/**
 * Code Assistant 히어로 키비주얼 — IDE 코드 에디터 목업(순수 HTML/CSS).
 * 사내 코드 맥락에서 AI가 코드 수준으로 제안하는 모습을 표현. 외부 이미지/폰트 없이
 * 자체 완결(CSP-safe). 특정 고객 사례와 무관한 제품 일반 비주얼.
 */
import type { Locale } from "@/lib/i18n";

/** 목업 안의 주석·AI 제안 문구 — 코드 키워드는 언어와 무관하게 그대로 둔다. */
const T: Record<Locale, { comment: string; suggestBadge: string; suggestComment: string; chat: string }> = {
    ko: {
        comment: "// 사내 결제 서비스 — XGEN이 리포지토리 맥락으로 이해",
        suggestBadge: "AI 제안 · Tab",
        suggestComment: "// 이상거래 점검 후 승인 처리",
        chat: "이 결제 로직에 사내 규정 기반 이상거래 점검을 추가해줘",
    },
    en: {
        comment: "// Internal payment service — XGEN reads it in repository context",
        suggestBadge: "AI suggestion · Tab",
        suggestComment: "// Run the fraud check, then approve",
        chat: "Add a fraud check based on our internal policy to this payment logic",
    },
};

export function CodeAssistantHeroArt({ locale = "ko" }: { locale?: Locale }) {
    const t = T[locale];
    return (
        <div className="w-full lg:translate-x-2">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0b1020] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.75)]">
                {/* 타이틀 바 */}
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    <span className="ml-2 rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[12px] text-white/70">
                        orderService.ts
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#7dd3fc]/30 bg-[#7dd3fc]/10 px-2.5 py-1 text-[11.5px] font-semibold text-[#7dd3fc]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
                        XGEN Code Assistant
                    </span>
                </div>

                {/* 코드 영역 */}
                <div className="flex font-mono text-[12.5px] leading-[1.75]">
                    <div className="select-none border-r border-white/5 px-3 py-4 text-right text-white/25">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                    <div className="overflow-x-auto px-4 py-4">
                        <div className="text-white/40">
                            <span className="text-[#7d8590]">
                                {t.comment}
                            </span>
                        </div>
                        <div>
                            <span className="text-[#ff7b9c]">export async function</span>{" "}
                            <span className="text-[#7dd3fc]">placeOrder</span>
                            <span className="text-white/70">(order</span>
                            <span className="text-[#ff7b9c]">:</span>{" "}
                            <span className="text-[#f0b866]">Order</span>
                            <span className="text-white/70">) {"{"}</span>
                        </div>
                        <div className="pl-5">
                            <span className="text-[#ff7b9c]">const</span>{" "}
                            <span className="text-white/85">items</span>{" "}
                            <span className="text-[#ff7b9c]">=</span>{" "}
                            <span className="text-[#ff7b9c]">await</span>{" "}
                            <span className="text-[#7dd3fc]">cart</span>
                            <span className="text-white/70">.load(order.id)</span>
                        </div>

                        {/* AI 제안 라인(고스트) */}
                        <div className="my-1 rounded-md border border-[#7dd3fc]/25 bg-[#7dd3fc]/[0.07] pl-5 pr-2 py-1">
                            <span className="text-[#28c840]">+ </span>
                            <span className="text-[#ff7b9c]">const</span>{" "}
                            <span className="text-white/85">risk</span>{" "}
                            <span className="text-[#ff7b9c]">=</span>{" "}
                            <span className="text-[#ff7b9c]">await</span>{" "}
                            <span className="text-[#7dd3fc]">xgen</span>
                            <span className="text-white/70">.assessFraud(order)</span>
                            <span className="ml-2 rounded bg-[#7dd3fc]/15 px-1.5 py-0.5 text-[10.5px] font-semibold text-[#7dd3fc]">
                                {t.suggestBadge}
                            </span>
                        </div>

                        <div className="pl-5 text-white/40">
                            <span className="text-[#7d8590]">
                                {t.suggestComment}
                            </span>
                        </div>
                        <div className="pl-5">
                            <span className="text-[#ff7b9c]">return</span>{" "}
                            <span className="text-[#7dd3fc]">payment</span>
                            <span className="text-white/70">.approve(items, risk)</span>
                        </div>
                        <div className="text-white/70">{"}"}</div>
                    </div>
                </div>

                {/* 하단 채팅 바 */}
                <div className="flex items-center gap-2 border-t border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="flex-1 truncate rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[12.5px] text-white/55">
                        {t.chat}
                    </div>
                    <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[linear-gradient(45deg,#00acee,#185aea)] text-white">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2 11 13" />
                            <path d="M22 2 15 22l-4-9-9-4Z" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
