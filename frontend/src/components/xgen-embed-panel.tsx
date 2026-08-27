import { ArrowUpRight } from "lucide-react";

/**
 * 체험 페이지 오른쪽에 XGEN 로그인 화면을 보여주고, 그 위에 데모 환경으로
 * 나가는 CTA 를 올린다.
 *
 * iframe 이 아니라 이미지인 이유: stg-xgen.x2bee.com 은 `frame-ancestors 'self'`
 * 와 `X-Frame-Options: SAMEORIGIN` 을 내려준다. 로그인 경로도 마찬가지라
 * labs.plateer.com 에서 프레임으로 열면 브라우저가 렌더를 거부하고 빈
 * 사각형만 남는다. 우리 쪽 코드로 넘길 수 있는 제약이 아니다.
 *
 * 이미지는 실제 로그인 화면을 그대로 찍은 것이라, 클릭해서 넘어갔을 때 보게
 * 될 화면과 어긋나지 않는다. XGEN 로그인 UI 가 바뀌면 다시 찍어야 한다:
 *   npx playwright screenshot --viewport-size=1920,1400 <URL> out.png
 */
export const XGEN_APP_URL =
    "https://stg-xgen.x2bee.com/login?redirect=https%3A%2F%2Fstg-xgen.x2bee.com%2Fdashboard";

/** 캡처한 로그인 화면 — 1600x1280 (5:4) */
const SHOT = "/xgen-login.webp";

interface Copy {
    overlayTitle: string;
    overlayLead: string;
    overlayCta: string;
    /** 페이지의 pcNote 를 그대로 받는다 — 같은 문장을 두 군데 두지 않는다 */
    pcOnly: string;
}

export function XgenEmbedPanel({
    copy,
    className,
}: {
    copy: Copy;
    className?: string;
}) {
    return (
        <div className={className}>
            {/* 브라우저 크롬 — 이게 우리 화면이 아니라 XGEN 이라는 걸 알려준다 */}
            <div className="flex items-center gap-3 rounded-t-2xl border border-b-0 border-[var(--color-line)] bg-[var(--color-surface-alt)] px-4 py-2.5">
                <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 font-mono text-[12px] text-[var(--color-ink-subtle)]">
                    stg-xgen.x2bee.com
                </span>
            </div>

            {/*
              화면 전체가 링크다 — 이미지 위 아무 데나 눌러도 데모로 나간다.
              가운데 버튼만 누르게 두면 로그인 폼을 진짜로 눌러보려는 사람이 생긴다.
            */}
            <a
                href={XGEN_APP_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-b-2xl border border-[var(--color-line)] bg-white"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={SHOT}
                    alt=""
                    width={1600}
                    height={1280}
                    loading="lazy"
                    className="block aspect-[5/4] w-full object-cover object-top"
                />

                {/*
                  문구가 앉을 자리를 아래에서부터 흰색으로 덮는다. 짙은 색을
                  씌우면 원본의 밝은 라벤더가 죽어 칙칙해진다.
                */}
                <span className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.35)_46%,rgba(255,255,255,0.95)_66%,rgba(255,255,255,1)_100%)]" />

                <span className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-7 text-center sm:px-8 sm:pb-10">
                    <span className="text-[15.5px] font-bold tracking-tight text-[var(--color-ink)] sm:text-[18px]">
                        {copy.overlayTitle}
                    </span>
                    <span className="mt-1.5 hidden max-w-sm text-[13px] leading-relaxed text-[var(--color-ink-muted)] sm:mt-2 sm:block sm:text-[14.5px]">
                        {copy.overlayLead}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)]/15 bg-white/70 px-5 py-2.5 text-[13.5px] font-semibold text-[var(--color-ink)] backdrop-blur-sm transition group-hover:gap-3 group-hover:border-[#2461d8]/40 group-hover:text-[#2461d8] sm:mt-6 sm:px-6 sm:py-3 sm:text-[14.5px]">
                        {copy.overlayCta}
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </span>
            </a>

            <p className="mt-3 text-[13px] text-[var(--color-ink-subtle)]">
                {copy.pcOnly}
            </p>
        </div>
    );
}
