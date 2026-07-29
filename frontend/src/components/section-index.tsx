"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * 페이지 스티키 인덱스(목차) — 히어로 아래에 붙어 스크롤 내내 상단(GNB 84px 밑)에 고정된다.
 * 인덱스가 콘텐츠와 같이 흘러가 버리면 긴 원페이지에서 섹션 이동 수단이 사라지므로,
 * 섹션이 2개 이상인 페이지에는 항상 이 인덱스를 둔다.
 *
 * 스크롤 위치(IntersectionObserver)로 현재 보고 있는 섹션을 추적해 활성 링크의
 * 컬러를 바꾼다. 링크 클릭 시 해당 섹션으로 이동 → 그 섹션이 활성화되어 강조된다.
 *
 * 주의: 이 인덱스를 쓰는 페이지의 섹션은 `scroll-mt-[140px]`(GNB 84 + 인덱스 ≈ 56)을
 * 줘야 앵커 점프 시 제목이 인덱스 바 뒤로 숨지 않는다.
 */
export function SectionIndex({
    sections,
}: {
    sections: { id: string; label: string }[];
}) {
    const [active, setActive] = useState(sections[0]?.id ?? "");

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
            // 상단 스티키(nav+index ≈ 140px) 아래로 들어온 섹션을 활성으로 판정.
            { rootMargin: "-150px 0px -55% 0px", threshold: 0 },
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    return (
        <nav
            // GNB 실측 높이(--nav-h, site-nav가 세팅) 바로 아래에 고정 — 프로모 배너가
            // 열려 있으면 헤더가 84px보다 커지므로 하드코딩하면 GNB 뒤로 숨는다.
            style={{ top: "var(--nav-h, 84px)" }}
            className="sticky z-30 border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-7xl justify-center gap-1 overflow-x-auto px-6 py-3">
                {sections.map((s) => (
                    <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={() => setActive(s.id)}
                        aria-current={active === s.id ? "true" : undefined}
                        className={cn(
                            "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] font-semibold transition",
                            active === s.id
                                ? "bg-[#2f7bff]/12 text-[#2461d8]"
                                : "font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-ink)]",
                        )}
                    >
                        {s.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
