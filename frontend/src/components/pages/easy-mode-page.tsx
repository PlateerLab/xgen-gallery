import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { EasyModeArt } from "@/components/easy-mode-art";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

export function EasyModePageContent({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const steps = en ? [
        ["Define the task", "Choose the purpose of your agent and describe the instructions it should follow."],
        ["Connect knowledge and tools", "Combine knowledge, prompts and tools through guided steps and a drag-and-drop builder."],
        ["Test in chat", "Ask real work questions, review the responses and refine the configuration."],
    ] : [
        ["업무 목적을 정합니다", "만들 Agent의 역할과 처리할 업무를 정하고, 따라야 할 지침을 구성합니다."],
        ["지식과 도구를 연결합니다", "단계별 가이드와 드래그&드롭 빌더로 지식·프롬프트·도구를 조합합니다."],
        ["채팅으로 검증합니다", "실제 업무 질문을 입력해 응답을 확인하고, 필요한 지침과 구성을 다듬습니다."],
    ];
    return <>
        <SiteNav />
        <main data-easy-mode-page className="bg-[var(--color-surface)] text-[var(--color-ink)]">
            <section className="bg-[var(--color-surface-alt)] px-6 pb-16 pt-36">
                <div className="mx-auto grid max-w-6xl items-center gap-10 min-[901px]:grid-cols-2">
                    <div>
                        <p className="font-mono text-[13px] text-[var(--color-ink-muted)]">XGEN · EasyMode</p>
                        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl">{en ? "Build business agents without coding" : "코딩 없이 만드는 업무용 Agent"}</h1>
                        <p className="mt-6 text-[17px] leading-8 text-[var(--color-ink-muted)]">{en ? "EasyMode brings knowledge, prompts and tools together in a guided no-code builder. Create an agent, then validate it directly in chat." : "EasyMode는 지식·프롬프트·도구를 조합하는 가이드형 노코드 빌더입니다. 비개발자도 업무용 Agent를 생성·조립하고, 만드는 즉시 채팅으로 검증할 수 있습니다."}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-6 py-3 font-semibold" href={localeHref(locale, "/xgen-trial")}>{en ? "Try XGEN free" : "XGEN 무료 체험"}<ArrowRight className="h-4 w-4" /></Link>
                            <Link className="inline-flex items-center px-4 py-3 text-[var(--color-ink-muted)]" href={localeHref(locale, "/product#build")}>{en ? "Explore core features" : "핵심 기능 보기"}</Link>
                        </div>
                    </div>
                    <div className="min-w-0"><EasyModeArt locale={locale} /></div>
                </div>
            </section>
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="text-2xl font-bold md:text-3xl">{en ? "From configuration to validation, step by step" : "구성부터 검증까지, 단계별로 완성합니다"}</h2>
                <div className="mt-9 grid gap-6 min-[901px]:grid-cols-3">
                    {steps.map(([title, description], index) => <article key={title} className="border border-[var(--color-line)] p-6">
                        <p className="font-mono text-[13px] text-[var(--color-ink-muted)]">0{index + 1}</p>
                        <h3 className="mt-4 text-lg font-bold">{title}</h3>
                        <p className="mt-3 text-[15px] leading-7 text-[var(--color-ink-muted)]">{description}</p>
                    </article>)}
                </div>
                <p className="mt-8 text-[15px] leading-7 text-[var(--color-ink-muted)]">{en ? "Start with knowledge Q&A or guided task support, then adjust the agent's instructions and connected tools to fit your work." : "사내 지식 질의응답이나 업무 안내처럼 목적이 분명한 Agent부터 시작해, 업무에 맞춰 지침과 연결 도구를 조정합니다."}</p>
            </section>
        </main>
        <SiteFooter />
    </>;
}
