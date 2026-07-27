import Link from "next/link";
import { ArrowRight, GraduationCap, LifeBuoy } from "lucide-react";

/**
 * 도입 이후 지원 안내 — 제품 페이지 하단에서 교육 지원·운영/기술지원으로 연계.
 * 제품 딜리버리가 구축에서 끝나지 않고 내재화·운영까지 이어짐을 짧게 안내한다.
 */
const ITEMS = [
    {
        icon: GraduationCap,
        title: "교육 지원",
        desc: "역할·프로젝트 단계별 맞춤 교육으로 조직에 빠르게 내재화합니다.",
        href: "/enablement",
    },
    {
        icon: LifeBuoy,
        title: "운영·기술지원",
        desc: "유지보수·장애 대응·모니터링으로 구축 이후 운영을 책임집니다.",
        href: "/support",
    },
];

export function PostDeploymentSupport() {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {ITEMS.map((it) => (
                <Link
                    key={it.href}
                    href={it.href}
                    className="group flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center transition hover:border-[#2f7bff]/40 hover:shadow-[0_12px_30px_-16px_rgba(20,40,80,0.35)]"
                >
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                        <it.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                        <h3 className="flex items-center justify-center gap-1.5 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                            {it.title}
                            <ArrowRight className="h-4 w-4 text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#2f7bff]" />
                        </h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                            {it.desc}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
