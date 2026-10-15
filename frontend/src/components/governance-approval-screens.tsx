import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function GovernanceApprovalScreens({ locale }: { locale: Locale }) {
    const en = locale === "en";
    return (
        <figure data-governance-approval-screens>
            <div className="relative w-[94%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg">
                <p className="bg-[var(--color-surface-alt)] px-4 py-3 text-[13.5px] font-bold text-[var(--color-ink)]">
                    {en ? "01 · Approval routing" : "01 · 결재선 지정"}
                </p>
                <Image src="/product/governance-approval-line.png" alt={en ? "Approval order and governance approver selection; personal names masked" : "결재 차례와 거버넌스 담당자 선택 화면 — 결재자 실명 비식별 처리"} width={1852} height={560} sizes="(max-width: 1024px) 94vw, 530px" className="block h-auto w-full" />
                <div className="h-8" aria-hidden="true" />
            </div>
            <div className="relative z-10 -mt-6 ml-auto w-[80%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-xl">
                <p className="bg-[var(--color-surface-alt)] px-4 py-3 text-[13.5px] font-bold text-[var(--color-ink)]">
                    {en ? "02 · AI risk grades" : "02 · AI 위험도 등급"}
                </p>
                <Image src="/product/governance-risk-grades.png" alt={en ? "AI risk grade configuration: critical, high, medium and low, with management policies" : "AI 위험도 등급 설정 — 초고위험·고위험·중위험·저위험과 등급별 관리 방침"} width={2000} height={832} sizes="(max-width: 1024px) 80vw, 450px" className="block h-auto w-full" />
            </div>
            <figcaption className="mt-4 text-center text-[11px] text-[var(--color-ink-muted)]">
                {en ? "Actual development-site captures · Personal names masked" : "개발 사이트 실제 화면 · 결재자 실명 비식별 처리"}
            </figcaption>
        </figure>
    );
}
