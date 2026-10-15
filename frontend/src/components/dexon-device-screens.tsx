import type { Locale } from "@/lib/i18n";

/** Existing demo captures presented in device frames; not device-specific screenshots. */
export function DexOnDeviceScreens({ locale }: { locale: Locale }) {
    const en = locale === "en";
    return (
        <figure className="text-center" data-dexon-device-screens>
            <svg viewBox="0 0 640 480" className="block h-auto w-full" role="img" aria-label={en ? "DexOn demo screens in realistic desktop monitor, tablet, and iPhone frames" : "모니터·태블릿·아이폰의 입체적인 기기 프레임에 배치한 DexOn 데모 화면"}>
                <title>{en ? "DexOn across three devices" : "세 기기에서 이어지는 DexOn 업무"}</title>
                <defs>
                    <linearGradient id="dds-metal"><stop stopColor="#949ca7" /><stop offset=".2" stopColor="#eef1f4" /><stop offset=".6" stopColor="#bbc2cb" /><stop offset=".85" stopColor="#f1f3f5" /><stop offset="1" stopColor="#959da7" /></linearGradient>
                    <linearGradient id="dds-stand" x2="0" y2="1"><stop stopColor="#8e98a5" /><stop offset="1" stopColor="#e4e8ed" /></linearGradient>
                    <filter id="dds-shadow" x="-25%" y="-20%" width="150%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#14253b" floodOpacity=".22" /></filter>
                    <clipPath id="dds-tablet"><rect x="30" y="193" width="189" height="233" rx="9" /></clipPath>
                    <clipPath id="dds-phone"><rect x="489" y="197" width="120" height="240" rx="22" /></clipPath>
                </defs>
                {/* Desktop monitor and stand */}
                <g filter="url(#dds-shadow)">
                <path d="M284 273h58l10 55h-78z" fill="url(#dds-stand)" stroke="#a4aebb" />
                <path d="M267 326h92l22 8q3 5-5 6H251q-8-1-5-6z" fill="url(#dds-metal)" stroke="#b7bec8" />
                <rect x="32" y="18" width="544" height="279" rx="13" fill="url(#dds-metal)" stroke="#a6afbb" />
                <path d="M45 20h518q11 0 11 11v239H34V31q0-11 11-11" fill="#20252d" />
                <svg x="43" y="30" width="522" height="238" viewBox="170 112 1580 810" preserveAspectRatio="xMidYMid slice">
                    <image href="/product/dexon-full-coding-video.jpg" width="1920" height="1080" />
                </svg>
                <circle cx="304" cy="25" r="2" fill="#080b10" /><circle cx="304" cy="25" r=".8" fill="#345574" />
                <text x="304" y="286" textAnchor="middle" fontSize="9" fontWeight="600" fill="#515d6d">DexOn Workspace</text>
                </g>
                {/* Tablet: the conversation and work area from the same demo */}
                <g transform="rotate(-5 124 310)" filter="url(#dds-shadow)">
                <rect x="231" y="214" width="3" height="32" rx="1" fill="#9da6b2" />
                <rect x="74" y="178" width="29" height="3" rx="1" fill="#9da6b2" />
                <rect x="18" y="181" width="213" height="259" rx="22" fill="url(#dds-metal)" stroke="#9fa9b6" />
                <rect x="21" y="184" width="207" height="253" rx="20" fill="#22272e" />
                <g clipPath="url(#dds-tablet)">
                <svg x="30" y="193" width="189" height="233" viewBox="1090 112 655 805" preserveAspectRatio="xMidYMid slice">
                    <image href="/product/dexon-vibe-coding-video.jpg" width="1920" height="1080" />
                </svg>
                </g>
                <circle cx="124" cy="188" r="2" fill="#0b111b" />
                <rect x="98" y="420" width="52" height="3" rx="1.5" fill="#252a32" />
                </g>
                {/* Mobile: the conversation panel, framed as a phone */}
                <g transform="rotate(5 549 317)" filter="url(#dds-shadow)">
                <rect x="480" y="232" width="3" height="13" rx="1" fill="#939ba5" />
                <rect x="480" y="255" width="3" height="26" rx="1" fill="#939ba5" />
                <rect x="480" y="287" width="3" height="26" rx="1" fill="#939ba5" />
                <rect x="615" y="258" width="3" height="38" rx="1" fill="#939ba5" />
                <rect x="483" y="189" width="132" height="256" rx="29" fill="url(#dds-metal)" stroke="#929ca8" />
                <rect x="486" y="192" width="126" height="250" rx="26" fill="#191c22" />
                <g clipPath="url(#dds-phone)">
                <rect x="489" y="197" width="120" height="240" fill="#f7f8fa" />
                <svg x="491" y="222" width="116" height="198" viewBox="1355 112 390 810" preserveAspectRatio="xMidYMid slice">
                    <image href="/product/dexon-vibe-coding-video.jpg" width="1920" height="1080" />
                </svg>
                <text x="499" y="212" fontSize="6" fontWeight="700" fill="#222">9:41</text>
                <path d="M588 206v6m3-8v8" stroke="#222" strokeWidth="1.3" /><rect x="596" y="206" width="6" height="4" rx="1" fill="#222" />
                </g>
                <rect x="529" y="202" width="40" height="12" rx="6" fill="#090b10" /><circle cx="562" cy="208" r="2" fill="#243751" />
                <rect x="529" y="429" width="40" height="3" rx="1.5" fill="#252a32" />
                </g>
                <g fontFamily="Pretendard, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="var(--color-ink)">
                    <text x="304" y="362" textAnchor="middle">Desktop</text>
                    <text x="124" y="468" textAnchor="middle">Tablet</text>
                    <text x="549" y="471" textAnchor="middle">iPhone</text>
                </g>
            </svg>
            <figcaption className="mt-4 text-[13.5px] font-semibold text-[var(--color-ink-muted)]">
                {en ? "Start on your desktop. Continue on your tablet or mobile." : "PC에서 시작한 업무를 태블릿·모바일에서 이어갑니다"}
                <span className="mt-2 block text-[11px] font-normal text-[var(--color-ink-subtle)]">{en ? "Illustrative device layout using actual demo captures" : "실제 데모 캡처를 활용한 기기별 화면 구성 예시"}</span>
            </figcaption>
        </figure>
    );
}
