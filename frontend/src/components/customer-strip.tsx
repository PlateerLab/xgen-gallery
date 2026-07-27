/**
 * 고객사 로고 마퀴 — 메인 히어로 아래 라이트 섹션(구 LLMMarquee 자리).
 * 공식 로고 파일이 있으면 이미지로, 없으면 회사명 워드마크(텍스트)로 표기한다.
 * 로고 추가: /public/customers 에 파일을 두고 아래 항목의 src 를 채우면 자동 반영.
 * (실존 상표 로고는 공식 파일만 사용 — 임의 재현 금지)
 */
// h: 로고별 높이 오버라이드(여백·비율 차이 보정). 기본은 h-8 md:h-9.
const CUSTOMERS: { name: string; src?: string; h?: string }[] = [
    { name: "아이스크림", src: "/customers/icecream.png", h: "h-11 md:h-12" },
    { name: "AWW", src: "/customers/aww.png", h: "h-12 md:h-14" },
    { name: "제주은행", src: "/customers/jeju-bank.png" },
    { name: "IM캐피탈", src: "/customers/im-capital.png", h: "h-11 md:h-12" },
    { name: "롯데홈쇼핑", src: "/customers/lotte-homeshopping.png" },
    { name: "한화시스템", src: "/customers/hanwha-systems.png" },
    { name: "교직원공제조합", src: "/customers/ktcu.png" },
    { name: "SK하이닉스", src: "/customers/sk-hynix.png" },
];

export function CustomerStrip() {
    return (
        <section className="overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="mx-auto max-w-7xl px-6 py-9">
                <p className="mb-6 text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                    Trusted by Industry Leaders
                </p>
                <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
                    <div className="marquee-track flex w-max items-center gap-12 pr-12 md:gap-16 md:pr-16">
                        {[...CUSTOMERS, ...CUSTOMERS].map((c, i) => (
                            <span
                                key={i}
                                className="flex shrink-0 items-center gap-2.5 opacity-75 transition duration-300 hover:opacity-100"
                            >
                                {c.src ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={c.src}
                                        alt={c.name}
                                        loading="lazy"
                                        className={`w-auto grayscale transition duration-300 hover:grayscale-0 ${c.h ?? "h-8 md:h-9"}`}
                                    />
                                ) : (
                                    <>
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#2f7bff]/60" />
                                        <span className="whitespace-nowrap text-[19px] font-bold tracking-tight text-[var(--color-ink-muted)] md:text-[22px]">
                                            {c.name}
                                        </span>
                                    </>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
