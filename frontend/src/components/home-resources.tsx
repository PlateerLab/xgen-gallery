import Link from "next/link";
import { BookOpen, FileText, ArrowRight } from "lucide-react";

/**
 * 메인 — Resources 미리보기.
 * Documentation·Release Notes는 '기술 자산'이라 아이콘 카드로,
 * Research Team은 기술 자산이 아니라 '사람'이므로 일러스트 배너 카드로 차별화한다.
 */
const ASSETS: {
    icon: typeof BookOpen;
    title: string;
    body: string;
    href: string;
}[] = [
    {
        icon: BookOpen,
        title: "Documentation",
        body: "XGEN 사용자 매뉴얼 — 플랫폼·라이브러리 가이드와 레퍼런스",
        href: "/documentation",
    },
    {
        icon: FileText,
        title: "Release Notes",
        body: "XGEN 플랫폼의 새 기능, 개선사항, 버그 수정 이력",
        href: "/releases",
    },
];

export function HomeResources() {
    return (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    / Resources
                </p>
                <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                    Plateer Labs가 제공하는{" "}
                    <span className="bg-gradient-to-r from-[#00acee] to-[#185aea] bg-clip-text text-transparent">
                        기술 자산
                    </span>
                </h2>
                <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    Enterprise AI를 위한 기술 문서와 릴리즈 노트를 한곳에서
                    확인하세요
                </p>

                <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {/* 기술 자산 — 아이콘 카드 */}
                    {ASSETS.map((it) => (
                        <Link
                            key={it.title}
                            href={it.href}
                            className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-ink)]"
                        >
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <it.icon className="h-5 w-5" />
                            </span>
                            <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {it.title}
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                {it.body}
                            </p>
                            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-medium text-[var(--color-ink)] transition group-hover:gap-2">
                                바로가기
                                <ArrowRight className="h-3 w-3" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
