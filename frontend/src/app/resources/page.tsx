import {
    FileText,
    Check,
    ShieldCheck,
    Layers,
    Building2,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { JsonLd } from "@/components/json-ld";
import { BrochureForm } from "@/components/brochure-form";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
    title: "Resources — 자료실",
    description:
        "XGEN 소개서를 비롯한 Plateer Labs 자료실. XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·도입 방식을 담은 소개서를 신청 후 받아보실 수 있습니다.",
    path: "/resources",
});

/** 소개서에 담긴 내용 — 신청 전 미리보기(리드 전환용). */
const BROCHURE_CONTENTS: { icon: typeof Layers; title: string; desc: string }[] = [
    {
        icon: Layers,
        title: "플랫폼 개요",
        desc: "학습·생성·배포·모니터링을 아우르는 XGEN All-in-one 플랫폼 구성",
    },
    {
        icon: FileText,
        title: "핵심 기능",
        desc: "Agent Builder·ModelOps·통합 관리 센터의 주요 기능과 활용 방식",
    },
    {
        icon: ShieldCheck,
        title: "보안·거버넌스",
        desc: "온프레미스 구축, RBAC 접근 제어, 제로 트레이닝 데이터 보호",
    },
    {
        icon: Building2,
        title: "도입·적용 사례",
        desc: "산업별 Agentic AI 적용 방향과 도입 절차",
    },
];

export default function ResourcesPage() {
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "DigitalDocument",
                        "@id": absoluteUrl("/resources#xgen-brochure"),
                        name: "XGEN 소개서",
                        description:
                            "XGEN Enterprise Agentic AI 플랫폼의 핵심 기능·아키텍처·보안·도입 방식을 담은 제품 소개서.",
                        inLanguage: "ko",
                        encodingFormat: "application/pdf",
                        url: absoluteUrl("/resources"),
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        isAccessibleForFree: true,
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Resources", path: "/resources" },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[440px] items-center overflow-hidden border-b border-white/10 py-24 text-white">
                <SceneBackground concept="products" />
                <div className="relative mx-auto w-full max-w-6xl px-6 pt-16">
                    <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                        Resources · 자료실
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        Enterprise AI를 이해하는 기술 자료
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                        XGEN Enterprise Agentic AI 플랫폼의 핵심 기능, 아키텍처, 구축
                        방식, 도입 사례를 담은 자료를 제공합니다. 간단한 정보를 입력하면
                        바로 다운로드할 수 있습니다.
                    </p>
                </div>
            </section>

            <main>
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-6 py-24">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Download
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            XGEN 소개서
                        </h2>
                        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN이 무엇을 하고 어떻게 도입되는지 한눈에 정리한 제품
                            소개서입니다. 아래에서 신청하시면 PDF로 바로 받아보실 수 있습니다.
                        </p>

                        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                            {/* 좌: 소개서 미리보기 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                    <span className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-[#2f7bff] to-[#7c5cff] text-white shadow-[0_12px_30px_-10px_rgba(47,123,255,0.6)]">
                                        <FileText className="h-8 w-8" />
                                    </span>
                                    <div>
                                        <p className="text-[13px] font-semibold text-[#2461d8]">
                                            PDF · 제품 소개서
                                        </p>
                                        <h3 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                            XGEN Enterprise Agentic AI Platform
                                        </h3>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
                                    <p className="text-[14px] font-bold uppercase tracking-wide text-[var(--color-ink-subtle)]">
                                        소개서에 담긴 내용
                                    </p>
                                    <ul className="mt-4 space-y-4">
                                        {BROCHURE_CONTENTS.map((b) => (
                                            <li key={b.title} className="flex items-start gap-3">
                                                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                    <b.icon className="h-5 w-5" />
                                                </span>
                                                <div>
                                                    <p className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                                        {b.title}
                                                    </p>
                                                    <p className="mt-0.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                        {b.desc}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-5 flex items-center gap-2 border-t border-[var(--color-line)] pt-4 text-[13.5px] text-[var(--color-ink-subtle)]">
                                        <Check className="h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                        신청 즉시 PDF 다운로드
                                    </div>
                                </div>
                            </div>

                            {/* 우: 리드 폼(게이팅) */}
                            <BrochureForm />
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
