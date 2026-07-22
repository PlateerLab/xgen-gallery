import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { SiteNav } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { DemoForm } from "@/components/demo-form";

export const metadata = pageMetadata({
    title: "데모 · 체험 · 기술 상담",
    description:
        "XGEN 제품 데모 요청, 15일 무료 체험 신청, PoC·기술 상담을 한 곳에서 접수합니다. 문의 유형을 선택해 남겨주시면 담당자가 영업일 기준 1–2일 내에 연락드립니다.",
    path: "/contact",
});

const BENEFITS = [
    "제품 데모 · 15일 무료 체험 · PoC 상담을 한 번에 신청",
    "과제 정의부터 PoC 설계·수행까지 전문가가 1:1로 지원",
    "기술 요건에 맞는 솔루션과 레퍼런스 아키텍처 제안",
];

export default function ContactPage() {
    return (
        <>
            {/* overlay nav so the background fills behind the GNB, like the main page */}
            <SiteNav overlay />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: "/" },
                    { name: "Contact", path: "/contact" },
                ])}
            />
            <section className="relative flex min-h-[calc(100dvh+2px)] items-center overflow-hidden border-b border-white/10 text-white">
                {/* 배경 이미지 — 메인과 동일한 풀블리드 구성 */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/hero-bg.png"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050813]/80 via-[#050813]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050813]/55 to-transparent" />
                </div>
                <div className="relative mx-auto w-full max-w-6xl px-6 pt-[140px] pb-20 md:pt-[160px] md:pb-24">
                    <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
                        {/* intro */}
                        <div className="md:pt-6">
                            <p className="text-[16px] font-semibold tracking-tight text-[#7dd3fc]">
                                Plateer Labs · 데모 · 무료 체험 · 기술 상담
                            </p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                                데모 · 체험 · 기술 상담
                            </h1>
                            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
                                제품 데모, XGEN 15일 무료 체험, PoC 및 기술 상담을 신청할 수
                                있습니다.
                                <br />
                                문의 유형을 선택해 접수해 주시면 담당자가 영업일 기준 1~2일
                                이내에 연락드립니다.
                            </p>
                            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                                현장에 배치되는{" "}
                                <span className="font-semibold text-white">
                                    FDE(Forward Deployed Engineer)
                                </span>
                                가 요구사항 발굴부터 설계·구현·내재화까지 함께합니다
                            </p>

                            <ul className="mt-8 space-y-3">
                                {BENEFITS.map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-start gap-3 text-[16px] text-white/80"
                                    >
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f7bff]" />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-8 text-[15px] leading-relaxed text-white/70">
                                양식 대신 바로 메일로도 문의하실 수 있습니다{" "}
                                <a
                                    href="mailto:xgen@plateer.com?subject=PoC%C2%B7%EA%B8%B0%EC%88%A0%20%EC%83%81%EB%8B%B4%20%EB%AC%B8%EC%9D%98"
                                    className="font-semibold text-[#7dd3fc] underline-offset-2 hover:underline"
                                >
                                    xgen@plateer.com
                                </a>
                            </p>

                            {/* 무료 체험 연계 — 이제 같은 양식의 '무료 체험 신청' 유형으로 접수 */}
                            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
                                <p className="text-[15px] leading-relaxed text-white/75">
                                    XGEN 15일 무료 체험은 문의 유형에서{" "}
                                    <span className="font-semibold text-white">
                                        ‘XGEN 15일 무료 체험 신청’
                                    </span>
                                    을 선택해 접수됩니다
                                </p>
                                <Link
                                    href="/xgen-trial"
                                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#7dd3fc] transition hover:text-white"
                                >
                                    체험 안내 자세히 보기
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* form */}
                        <div>
                            <DemoForm />
                        </div>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </>
    );
}
