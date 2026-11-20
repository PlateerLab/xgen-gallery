"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Flame, Sparkles } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { DEMO_CTA } from "@/lib/nav";

/**
 * 전 페이지 우측 하단 플로팅 — '상담 신청하기' 알약(클릭 시 /contact 직행) + 맨 위로 버튼.
 * 배너(카드)는 두지 않고 버튼만 노출한다. /contact·/admin 에서만 숨긴다.
 * /newsletter 에서는 '뉴스레터 구독하기' 알약을 같은 줄에 함께 둔다(PC만).
 */
export function StickyCta() {
    const pathname = usePathname();
    const { locale } = useI18n();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // 문의 페이지 자신(/contact)과 관리자(/admin)만 빼고 모든 페이지에 노출한다.
    // 제품 마이크로사이트 시안(/products/*)은 자체 하단 CTA를 쓴다.
    const hidden =
        /^(\/en)?\/contact\/?$/.test(pathname) ||
        pathname.startsWith("/admin") ||
        /^(\/en)?\/products\/[^/]+\/?$/.test(pathname);
    if (!mounted || hidden) return null;

    const en = locale === "en";
    const pillLabel = en ? "Request a consultation" : "상담 신청하기";
    const onNewsletter = /^(\/en)?\/newsletter(\/|$)/.test(pathname);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
            <button
                type="button"
                aria-label={en ? "Back to top" : "맨 위로"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink-muted)] shadow-[0_8px_24px_-10px_rgba(20,40,80,0.4)] transition hover:text-[var(--color-ink)]"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
            {onNewsletter && (
                <Link
                    href="/contact?type=newsletter"
                    className="hidden items-center gap-2 rounded-full border border-[#c7d9ff] bg-white px-5 py-3 text-[15px] font-bold text-[#2461d8] shadow-[0_8px_24px_-8px_rgba(20,40,80,0.4)] transition hover:border-[#2f7bff] sm:inline-flex"
                >
                    <Flame className="h-4 w-4 text-[#ff7a3d]" />
                    {en ? "Subscribe" : "뉴스레터 구독하기"}
                </Link>
            )}
            <Link
                href={DEMO_CTA.href}
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-5 py-3 text-[15px] font-bold text-white shadow-[0_10px_28px_-8px_rgba(47,123,255,0.6)] transition hover:brightness-110"
            >
                <Sparkles className="h-4 w-4" />
                {pillLabel}
            </Link>
        </div>
    );
}
