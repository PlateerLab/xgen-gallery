import {
    GitBranch,
    Hammer,
    Package,
    RefreshCw,
    Server,
    GitMerge,
    ShieldCheck,
    Lock,
    Activity,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * XGEN GitOps CI/CD 파이프라인 (공개-안전 버전).
 * 사내 문서에서 배포 흐름 개념만 추려 재구성 — 레지스트리/서버 호스트·포트,
 * 내부 GitLab·ECR 주소, 자격증명, 고객사 프로젝트명은 포함하지 않는다.
 */

/** 파이프라인 단계 이름(Source·CI Build…)은 고유 표기라 두 언어 공통, 설명만 번역. */
const STAGE_ICONS: LucideIcon[] = [GitBranch, Hammer, Package, RefreshCw, Server];
const STAGE_NAMES = ["Source", "CI Build", "Registry", "GitOps Sync", "Cluster"];
const PRINCIPLE_ICONS: LucideIcon[] = [GitMerge, ShieldCheck, Lock, Activity];

const T: Record<Locale, { stages: string[]; principles: [string, string][] }> = {
    ko: {
        stages: [
            "브랜치 · MR",
            "BuildKit 멀티스테이지 이미지",
            "컨테이너 이미지 저장",
            "ArgoCD 수동 sync",
            "k3s · 앱/인프라 네임스페이스",
        ],
        principles: [
            ["GitOps · 선언형", "Git이 단일 진실 공급원 — 매니페스트로 클러스터 상태를 정의하고 동기화"],
            ["통제된 릴리스", "브랜치 + MR 필수(main 직접 push 금지) · 수동 sync로 배포 시점 통제"],
            ["온프레미스 · 폐쇄망", "이미지 export/import로 에어갭 이전 · 사이트별 환경 분리(dev/stg/prd)"],
            ["관측성", "Prometheus · Grafana로 배포 후 상태 · 로그 · 트레이스 모니터링"],
        ],
    },
    en: {
        stages: [
            "Branch and merge request",
            "BuildKit multi-stage image",
            "Container image storage",
            "Manual ArgoCD sync",
            "k3s · app and infra namespaces",
        ],
        principles: [
            ["GitOps and declarative", "Git is the single source of truth — manifests define the cluster state and sync it"],
            ["Controlled releases", "Branch plus merge request required (no direct push to main), with manual sync controlling when a deploy lands"],
            ["On-premise and air-gapped", "Image export/import moves builds across the air gap, with per-site environment separation (dev/stg/prd)"],
            ["Observability", "Prometheus and Grafana monitor state, logs, and traces after deployment"],
        ],
    },
};

export function XgenCicd({ locale = "ko" }: { locale?: Locale }) {
    const t = T[locale];
    const STAGES = STAGE_NAMES.map((name, i) => ({
        icon: STAGE_ICONS[i],
        t: name,
        s: t.stages[i],
    }));
    const PRINCIPLES = t.principles.map(([title, desc], i) => ({
        icon: PRINCIPLE_ICONS[i],
        t: title,
        s: desc,
    }));
    return (
        <div>
            {/* 파이프라인 흐름 */}
            <div className="overflow-x-auto">
                <div className="flex min-w-[820px] items-stretch gap-2">
                    {STAGES.map((st, i) => (
                        <div key={st.t} className="flex flex-1 items-stretch gap-2">
                            <div className="flex flex-1 flex-col rounded-xl border border-[#d4ddf2] bg-[#f5f8ff] p-4">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#2f7bff]">
                                    <st.icon className="h-5 w-5" />
                                </span>
                                <div className="mt-3 text-[14.5px] font-bold text-[var(--color-ink)]">
                                    {st.t}
                                </div>
                                <div className="mt-1 text-[12.5px] leading-snug text-[var(--color-ink-muted)]">
                                    {st.s}
                                </div>
                            </div>
                            {i < STAGES.length - 1 && (
                                <div className="flex items-center">
                                    <ChevronRight className="h-5 w-5 text-[#9fb0dc]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 원칙 카드 */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PRINCIPLES.map((p) => (
                    <div
                        key={p.t}
                        className="rounded-xl border border-[var(--color-line)] bg-white p-5"
                    >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                            <p.icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-3 text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                            {p.t}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                            {p.s}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
