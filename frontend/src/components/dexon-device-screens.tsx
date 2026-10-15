import type { Locale } from "@/lib/i18n";

/** Existing demo captures presented in device frames; not device-specific screenshots. */
export function DexOnDeviceScreens({ locale }: { locale: Locale }) {
    const en = locale === "en";
    return (
        <figure className="text-center" data-dexon-device-screens>
            <svg viewBox="0 0 640 450" className="block h-auto w-full" role="img" aria-label={en ? "DexOn demo screens arranged in desktop, tablet, and mobile frames" : "데스크톱·태블릿·모바일 프레임에 배치한 DexOn 데모 화면"}>
                <title>{en ? "DexOn across three devices" : "세 기기에서 이어지는 DexOn 업무"}</title>
                {/* Desktop monitor and stand */}
                <path d="M284 273h58l10 48h-78z" fill="var(--color-surface-alt)" stroke="var(--color-line)" strokeWidth="3" />
                <rect x="248" y="318" width="130" height="9" rx="4" fill="var(--color-line)" />
                <rect x="32" y="18" width="544" height="273" rx="17" fill="white" stroke="var(--color-line)" strokeWidth="3" />
                <svg x="43" y="30" width="522" height="238" viewBox="170 112 1580 810" preserveAspectRatio="xMidYMid slice">
                    <image href="/product/dexon-full-coding-video.jpg" width="1920" height="1080" />
                </svg>
                <text x="304" y="284" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-ink-muted)">DexOn Workspace</text>
                {/* Tablet: the conversation and work area from the same demo */}
                <rect x="18" y="185" width="213" height="229" rx="19" fill="white" stroke="var(--color-line)" strokeWidth="3" />
                <svg x="29" y="204" width="191" height="191" viewBox="940 112 805 805" preserveAspectRatio="xMidYMid slice">
                    <image href="/product/dexon-vibe-coding-video.jpg" width="1920" height="1080" />
                </svg>
                <circle cx="124" cy="195" r="2" fill="var(--color-ink-subtle)" />
                <rect x="98" y="403" width="52" height="3" rx="1.5" fill="var(--color-line)" />
                {/* Mobile: the conversation panel, framed as a phone */}
                <rect x="483" y="189" width="132" height="238" rx="23" fill="white" stroke="var(--color-line)" strokeWidth="3" />
                <svg x="493" y="211" width="112" height="193" viewBox="1355 112 390 810" preserveAspectRatio="xMidYMid slice">
                    <image href="/product/dexon-vibe-coding-video.jpg" width="1920" height="1080" />
                </svg>
                <rect x="532" y="199" width="34" height="4" rx="2" fill="var(--color-line)" />
                <rect x="529" y="415" width="40" height="3" rx="1.5" fill="var(--color-line)" />
                <g fontFamily="Pretendard, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="var(--color-ink)">
                    <text x="304" y="348" textAnchor="middle">Desktop</text>
                    <text x="124" y="438" textAnchor="middle">Tablet</text>
                    <text x="549" y="448" textAnchor="middle">Mobile</text>
                </g>
            </svg>
            <figcaption className="mt-4 text-[13.5px] font-semibold text-[var(--color-ink-muted)]">
                {en ? "Start on your desktop. Continue on your tablet or mobile." : "PC에서 시작한 업무를 태블릿·모바일에서 이어갑니다"}
                <span className="mt-2 block text-[11px] font-normal text-[var(--color-ink-subtle)]">{en ? "Illustrative device layout using actual demo captures" : "실제 데모 캡처를 활용한 기기별 화면 구성 예시"}</span>
            </figcaption>
        </figure>
    );
}
