import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PRODUCT_INDEX } from "@/lib/product-profiles";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** /products — 제품 허브. 마이크로사이트가 있는 제품과 준비 중인 제품을 함께 보여 준다. */
export function ProductsIndex({ locale }: { locale: Locale }) {
    const en = locale === "en";
    return (
        <>
            <SiteNav overlay />
            <section className="kv-hero relative flex items-center overflow-hidden bg-[#060914] text-white">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(47,123,255,0.25),transparent_70%)]"
                />
                <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-36 md:pt-44">
                    <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#7dd3fc]">Products</p>
                    <h1 className="mt-4 max-w-3xl text-[34px] font-extrabold leading-[1.15] tracking-tight md:text-[54px]">
                        {en ? "Products from Plateer AI Labs" : "Plateer AI Labs의 제품"}
                    </h1>
                    <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/65 md:text-[18px]">
                        {en
                            ? "Research turned into products that run on enterprise data and infrastructure."
                            : "연구소의 기술을 기업 데이터와 인프라 위에서 쓰는 제품으로 만듭니다."}
                    </p>
                </div>
            </section>
            <main className="bg-[var(--color-surface-alt)]">
                <div className="mx-auto grid max-w-7xl gap-5 px-6 py-20 md:grid-cols-2">
                    {PRODUCT_INDEX.map((p) => (
                        <Link
                            key={p.id}
                            href={localeHref(locale, p.href)}
                            className={cn(
                                "group flex flex-col rounded-2xl border p-8 transition",
                                p.status === "live"
                                    ? "border-[#1b2440] bg-[#0b1224] text-white hover:border-[#2f7bff]/60"
                                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-ink)]",
                            )}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span
                                    className={cn(
                                        "font-mono text-[12px] font-semibold",
                                        p.status === "live" ? "text-[#7dd3fc]" : "text-[#2f7bff]",
                                    )}
                                >
                                    {en ? p.category.en : p.category.ko}
                                </span>
                                <span
                                    className={cn(
                                        "rounded-full border px-2.5 py-0.5 text-[12px]",
                                        p.status === "live"
                                            ? "border-white/20 text-white/70"
                                            : "border-[var(--color-line)] text-[var(--color-ink-muted)]",
                                    )}
                                >
                                    {en ? p.statusLabel.en : p.statusLabel.ko}
                                </span>
                            </div>
                            <h2 className="mt-5 text-[34px] font-extrabold tracking-tight">{p.name}</h2>
                            <p
                                className={cn(
                                    "mt-3 text-[15px] leading-relaxed",
                                    p.status === "live" ? "text-white/65" : "text-[var(--color-ink-muted)]",
                                )}
                            >
                                {en ? p.desc.en : p.desc.ko}
                            </p>
                            <span className="mt-auto inline-flex items-center gap-1 pt-8 text-[14px] font-semibold">
                                {p.status === "live"
                                    ? en ? "View product" : "제품 보기"
                                    : en ? "View library" : "라이브러리 보기"}
                                <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
