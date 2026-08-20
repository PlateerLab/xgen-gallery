import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { CosmicBackground } from "@/components/cosmic-background";
import { DemoForm } from "@/components/demo-form";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 문의 페이지 — 데모·무료 체험·PoC 상담을 한 양식에서 접수한다.
 * 폼 본체(DemoForm)는 자체 COPY 사전으로 이미 이중언어라 여기서는 주변 카피만 다룬다.
 */
const COPY: Record<
    Locale,
    {
        eyebrow: string;
        title: string;
        lead: React.ReactNode;
        fde: React.ReactNode;
        benefits: string[];
        trialNote: React.ReactNode;
        trialCta: string;
    }
> = {
    ko: {
        eyebrow: "Plateer AI Labs · 데모 · 무료 체험 · 기술 상담",
        title: "데모 · 체험 · 기술 상담",
        lead: (
            <>
                제품 데모, XGEN 15일 무료 체험, PoC 및 기술 상담을 신청할 수
                있습니다. 문의 유형을 선택해 접수해 주시면 담당자가{" "}
                <br className="hidden md:inline" />
                영업일 기준 1~2일 이내에 연락드립니다.
            </>
        ),
        fde: (
            <>
                현장에 배치되는{" "}
                <span className="font-semibold text-white">
                    FDE(Forward Deployed Engineer)
                </span>
                가 요구사항 발굴부터 설계·구현·내재화까지 함께합니다
            </>
        ),
        benefits: [
            "제품 데모 · 15일 무료 체험 · PoC 상담을 한 번에 신청",
            "과제 정의부터 PoC 설계·수행까지 전문가가 1:1로 지원",
            "기술 요건에 맞는 솔루션과 레퍼런스 아키텍처 제안",
        ],
        trialNote: (
            <>
                XGEN 체험은 문의 유형에서{" "}
                <span className="font-semibold text-white">
                    ‘XGEN 15일 무료 체험 신청’
                </span>
                을 선택하세요
            </>
        ),
        trialCta: "체험 안내 자세히 보기",
    },
    en: {
        eyebrow: "Plateer AI Labs · Demo · Free trial · Technical consultation",
        title: "Demo, trial, and technical consultation",
        lead: (
            <>
                Request a product demo, a 15-day XGEN free trial, or a PoC and
                technical consultation. Pick an inquiry type, and we will get back
                to you{" "}
                <br className="hidden md:inline" />
                within one to two business days.
            </>
        ),
        fde: (
            <>
                <span className="font-semibold text-white">
                    Forward Deployed Engineers (FDE)
                </span>{" "}
                work on site with you, from discovery through design,
                implementation, and handover
            </>
        ),
        benefits: [
            "One form for a product demo, the 15-day trial, or a PoC conversation",
            "A specialist works with you directly, from framing the problem to running the PoC",
            "A solution and reference architecture matched to your technical requirements",
        ],
        trialNote: (
            <>
                For the trial, choose{" "}
                <span className="font-semibold text-white">
                    “Request a 15-day XGEN free trial”
                </span>{" "}
                as your inquiry type
            </>
        ),
        trialCta: "More about the trial",
    },
};

export function ContactPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";
    const self = locale === "en" ? "/en/contact" : "/contact";

    return (
        <>
            {/* overlay nav so the background fills behind the GNB, like the main page */}
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: home },
                    { name: "Contact", path: self },
                ])}
            />
            <section className="relative flex min-h-[calc(100dvh+2px)] items-center overflow-hidden border-b border-white/10 text-white">
                {/* 배경 — 우주 컨셉(별·성운·궤도 + 하단 지평). 사이트 공통
                    컨셉 팔레트(CONCEPTS.contact)를 쓰므로 다른 페이지와 같은 계열로 읽힌다. */}
                <CosmicBackground concept="contact" />
                {/* 카피 가독성 스크림 — 좌우 선형 그라데이션은 배경이 균일할 때나
                    괜찮고, 우주 배경 위에서는 은하수 띠와 만나 직선 경계가 드러난다.
                    텍스트 칼럼만 타원으로 감싸 경계 없이 떨어지게 한다. */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 58% 78% at 20% 46%, rgba(5,8,19,0.82) 0%, rgba(5,8,19,0.45) 46%, rgba(5,8,19,0.12) 70%, transparent 85%)",
                    }}
                />
                {/* 상단 여백은 GNB 실측 높이 기준 — 고정 140px이면 모바일에서 프로모
                    배너가 2줄로 접힐 때(헤더 176px) 카피가 GNB 밑에 깔린다. */}
                <div className="relative mx-auto w-full max-w-7xl px-6 pt-[calc(var(--nav-h,84px)+40px)] pb-20 md:pt-[calc(var(--nav-h,84px)+64px)] md:pb-24">
                    <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
                        {/* intro — 좌측 컬럼은 한 가지 폭(max-w-lg)으로 통일한다.
                            제목·불릿은 컬럼 전체(584px)인데 본문만 448px이면 본문만
                            안으로 들어가 보여 왼쪽 정렬 리듬이 깨진다.
                            break-keep은 한글 어절이 중간에서 잘리는 걸 막는다.
                            pt는 우측 폼 카드의 첫 라벨과 시작선을 맞춘 값. */}
                        <div className="break-keep md:pt-12">
                            <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                                {t.eyebrow}
                            </p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                                {t.title}
                            </h1>
                            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                                {t.lead}
                            </p>
                            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
                                {t.fde}
                            </p>

                            <ul className="mt-8 max-w-lg space-y-3">
                                {t.benefits.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-start gap-3 text-[16px] text-white/80"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7bff]" />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* 무료 체험 연계 — 이제 같은 양식의 '무료 체험 신청' 유형으로 접수 */}
                            <div className="mt-6 flex max-w-lg flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
                                <p className="text-[15px] leading-relaxed text-white/75">
                                    {t.trialNote}
                                </p>
                                <Link
                                    href={localeHref(locale, "/xgen-trial")}
                                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#7dd3fc] transition hover:text-white"
                                >
                                    {t.trialCta}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* form — 흰 카드가 다크 배경에 튀지 않도록 반투명 글래스 매트로 감쌈 */}
                        <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-2.5 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.85)] backdrop-blur-sm">
                            <DemoForm />
                        </div>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </>
    );
}
