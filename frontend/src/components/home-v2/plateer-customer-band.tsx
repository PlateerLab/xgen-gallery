import type { Locale } from "@/lib/i18n";

/**
 * 플래티어 고객사 로고 띠 — 기존 제품 사이트(www.xgen.im) 메인의
 * 「1,086개사가 플래티어와 함께합니다」 섹션을 옮겨 온 것이다.
 * 로고 원본은 xgen.im 에 게시된 흰색(어두운 배경용) 160×60 이미지라 배경을 어둡게 둔다.
 * 숫자는 xgen.im 게시 기준 — 바뀌면 CUSTOMER_TOTAL 만 고친다.
 */
const CUSTOMER_TOTAL = "1,086";
const LOGOS = Array.from({ length: 11 }, (_, i) => `/customers/plateer/logo-${String(i + 1).padStart(2, "0")}.webp`);

export function PlateerCustomerBand({ locale = "ko" }: { locale?: Locale }) {
    const en = locale === "en";
    const title = en
        ? `${CUSTOMER_TOTAL} companies work with Plateer`
        : `${CUSTOMER_TOTAL}개사가 플래티어와 함께합니다`;
    return (
        <section className="overflow-hidden bg-[#222222] py-12 md:py-14" aria-labelledby="plateer-customers-title">
            <h2
                id="plateer-customers-title"
                className="px-6 text-center text-[20px] font-semibold tracking-tight text-white md:text-[26px]"
            >
                {title}
            </h2>
            <div
                className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
                role="list"
                aria-label={en ? "Plateer customer logos" : "플래티어 고객사 로고"}
            >
                <div className="marquee-track flex w-max items-center gap-12 pr-12">
                    {[...LOGOS, ...LOGOS].map((src, i) => (
                        <span key={i} role="listitem" className="flex shrink-0 items-center" aria-hidden={i >= LOGOS.length}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={i < LOGOS.length ? (en ? `Customer logo ${i + 1}` : `고객사 로고 ${i + 1}`) : ""}
                                width={160}
                                height={60}
                                loading="lazy"
                                className="h-12 w-auto opacity-85 md:h-[60px]"
                            />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
