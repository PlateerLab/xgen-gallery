"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Sparkles } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { DEMO_CTA } from "@/lib/nav";

/**
 * 전 페이지 우측 하단 플로팅 — '상담 신청하기' 알약(클릭 시 /contact 직행) + 맨 위로 버튼.
 * 배너(카드)는 두지 않고 버튼만 노출한다.
 * (/contact·/admin, 그리고 구독 위젯을 쓰는 /blog·/newsletter 에서는 숨김)
 */
export function StickyCta() {
    const pathname = usePathname();
    const { locale } = useI18n();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const hidden =
        pathname === "/contact" ||
        pathname.startsWith("/admin") ||
        pathname === "/blog" ||
        pathname.startsWith("/blog/") ||
        pathname.startsWith("/newsletter");
    if (!mounted || hidden) return null;

    const en = locale === "en";
    const pillLabel = en ? "Request a consultation" : "상담 신청하기";

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
