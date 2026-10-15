import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function OperationsScreens({ locale }: { locale: Locale }) {
    const en = locale === "en";
    return (
        <figure data-operations-screens>
            <div className="relative w-[94%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg">
                <p className="bg-[var(--color-surface-alt)] px-4 py-3 text-[13.5px] font-bold text-[var(--color-ink)]">
                    {en ? "01 · Operations dashboard" : "01 · 운영 대시보드"}
                </p>
                <Image src="/product/operations-dashboard.png" alt={en ? "XGEN dashboard with execution metrics, token usage and Agent execution trends" : "XGEN 운영 대시보드 — 실행 현황, 토큰 사용량, Agent 실행 추이"} width={2628} height={1168} sizes="(max-width: 1024px) 94vw, 530px" className="block h-auto w-full" />
                <div className="h-8" aria-hidden="true" />
            </div>
            <div className="relative z-10 -mt-6 ml-auto w-[80%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-xl">
                <p className="bg-[var(--color-surface-alt)] px-4 py-3 text-[13.5px] font-bold text-[var(--color-ink)]">
                    {en ? "02 · System monitoring" : "02 · 시스템 모니터링"}
                </p>
                <Image src="/product/operations-monitoring.png" alt={en ? "XGEN system monitoring showing CPU, memory and disk utilization" : "XGEN 시스템 모니터링 — CPU·메모리·디스크 사용률"} width={1968} height={416} sizes="(max-width: 1024px) 80vw, 450px" className="block h-auto w-full" />
            </div>
            <figcaption className="mt-4 text-center text-[11px] text-[var(--color-ink-muted)]">
                {en ? "Actual development-site captures · Values shown at capture time" : "개발 사이트 실제 화면 · 수치는 캡처 시점 기준"}
            </figcaption>
        </figure>
    );
}
