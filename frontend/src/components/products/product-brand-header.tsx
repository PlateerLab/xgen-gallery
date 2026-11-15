"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 제품 마이크로사이트 전용 헤더 — 랩스 GNB 대신 제품 브랜드를 앞에 세운다.
 * (카페24 → 유튜브 쇼핑처럼, 같은 회사 사이트 안에서 하나의 서비스 사이트로 보이게)
 *
 * - 왼쪽: 제품 워드마크 + "by Plateer AI Labs"(랩스 홈으로 돌아가는 길)
 * - 가운데: 섹션 탭(현재 위치 표시)
 * - 오른쪽: Primary CTA 하나 + 보조 링크
 * 히어로 위에서는 투명, 스크롤하면 어두운 반투명 바로 바뀐다.
 * 좁은 화면(<1024px)은 탭을 두 번째 줄 가로 스크롤로 내린다.
 */
export function ProductBrandHeader({
    name,
    labsHref,
    labsLabel,
    sections,
    cta,
    secondary,
}: {
    name: string;
    labsHref: string;
    labsLabel: string;
    sections: { id: string; label: string }[];
    cta: { label: string; href: string };
    secondary: { label: string; href: string };
}) {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    const tabs = (cls?: string) => (
        <div className={cn("flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]", cls)}>
            {sections.map((s) => (
                <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                        "whitespace-nowrap rounded-full px-3 py-1.5 text-[13.5px] transition",
                        active === s.id
                            ? "bg-white/15 font-semibold text-white"
                            : "font-medium text-white/60 hover:bg-white/10 hover:text-white",
                    )}
                >
                    {s.label}
                </a>
            ))}
        </div>
    );

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
                scrolled
                    ? "border-b border-white/10 bg-[#060914]/85 backdrop-blur-md"
                    : "border-b border-transparent bg-transparent",
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-6">
                <div className="flex flex-none items-center gap-3">
                    <a href="#overview" className="flex items-center gap-2" aria-label={`${name} home`}>
                        <span
                            aria-hidden
                            className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(45deg,#00acee,#185aea)] shadow-[0_0_12px_rgba(0,172,238,0.8)]"
                        />
                        <span className="text-[22px] font-black tracking-tight text-white">{name}</span>
                    </a>
                    <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:block" />
                    <Link
                        href={labsHref}
                        className="hidden items-center gap-1 text-[12.5px] font-medium text-white/50 transition hover:text-white sm:inline-flex"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {labsLabel}
                    </Link>
                </div>

                {tabs("hidden flex-1 justify-center lg:flex")}

                <div className="ml-auto flex flex-none items-center gap-2 lg:ml-0">
                    <Link
                        href={secondary.href}
                        className="hidden whitespace-nowrap px-3 py-2 text-[13.5px] font-semibold text-white/75 transition hover:text-white md:inline-block"
                    >
                        {secondary.label}
                    </Link>
                    <Link
                        href={cta.href}
                        className="whitespace-nowrap rounded-full bg-[#2f7bff] px-4 py-2 text-[13.5px] font-bold text-white transition hover:bg-[#2461d8]"
                    >
                        {cta.label}
                    </Link>
                </div>
            </div>
            {/* 좁은 화면 — 탭은 두 번째 줄 가로 스크롤 */}
            <div className={cn("border-t border-white/10 px-4 py-1.5 lg:hidden", !scrolled && "bg-[#060914]/40")}>
                {tabs()}
            </div>
        </header>
    );
}
