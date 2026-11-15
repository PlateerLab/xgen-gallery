"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 제품 마이크로사이트 하단 고정 CTA — 히어로를 지나면 화면 아래 가운데에 뜨고,
 * 푸터가 보이기 시작하면 내려간다. (사이트 공통 플로팅 버튼은 이 페이지에서 숨김)
 */
export function ProductStickyCta({ name, label, href }: { name: string; label: string; href: string }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const footer = document.querySelector("footer");
            const pastHero = window.scrollY > window.innerHeight * 1.6;
            const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
            setShow(pastHero && !nearFooter);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div
            aria-hidden={!show}
            className={cn(
                "pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 transition-all duration-300",
                show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
        >
            <Link
                href={href}
                tabIndex={show ? 0 : -1}
                className={cn(
                    "flex w-full max-w-[420px] items-center justify-between gap-3 rounded-full border border-white/10 bg-[#0b1224]/95 py-2 pl-5 pr-2 text-white shadow-[0_18px_40px_-12px_rgba(6,9,20,0.6)] backdrop-blur-md",
                    show && "pointer-events-auto",
                )}
            >
                <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-[linear-gradient(45deg,#00acee,#185aea)]" />
                    <span className="truncate text-[14px] font-extrabold">{name}</span>
                </span>
                <span className="inline-flex flex-none items-center gap-1.5 rounded-full bg-[#2f7bff] px-4 py-2 text-[13.5px] font-bold">
                    {label} <ArrowRight className="h-4 w-4" />
                </span>
            </Link>
        </div>
    );
}
