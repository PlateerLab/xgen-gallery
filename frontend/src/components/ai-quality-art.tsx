/**
 * AI 품질 방침 히어로 키비주얼 — 네이티브 SVG(SMIL).
 *
 * 방침의 핵심 서사를 한 장으로 압축한다: 데이터·모델의 산출물이 그대로 나가지 않고
 * **품질 게이트**(출시 전 시험)를 지나고, 그 위에서 **사람이 최종 결정**하며,
 * 운영 결과가 다시 **개선 루프**로 되돌아온다. h1("우연히 만들어지지 않습니다")이
 * 말하는 "의도된 절차"를 움직임으로 보여주는 게 목적이다.
 *
 * 게이트 왼쪽 타일은 회색(미검증), 오른쪽 타일은 체크가 붙은 청록(검증)으로 나뉘어
 * 흐르므로, 정지 화면으로 캡처해도 전후 상태가 읽힌다.
 * 외부 이미지·라이브러리 없이 CSP-safe SMIL로만 구현(governance-art.tsx와 동일 규칙).
 */
import type { Locale } from "@/lib/i18n";

const GATE_X = 242; // 게이트 바 좌측 x
const TRACK_Y = 150; // 흐름 축

const T: Record<
    Locale,
    { left: string; gate: string; right: string; human: string; loop: string; aria: string }
> = {
    ko: {
        left: "데이터 · 모델 출력",
        gate: "품질 게이트 · 출시 전 시험",
        right: "검증된 릴리즈",
        human: "사람이 최종 결정",
        loop: "지속 개선 · 재학습",
        aria: "AI 산출물이 품질 게이트와 사람의 확인을 거쳐 릴리즈되고, 운영 결과가 다시 개선으로 되돌아오는 품질 흐름도",
    },
    en: {
        left: "Data · model output",
        gate: "Quality gate · pre-release tests",
        right: "Verified release",
        human: "A human decides",
        loop: "Continuous improvement",
        aria: "A quality flow diagram — model output passes a quality gate and a human decision before release, and operational results loop back into improvement",
    },
};

/** 타일 3개를 같은 궤도에 시차를 두고 흘려보낸다(연속된 흐름처럼 보이도록). */
const PHASES = ["0s", "-1.4s", "-2.8s"];
const DUR = "4.2s";

export function AiQualityArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <svg
            viewBox="0 0 520 320"
            className="w-full"
            role="img"
            aria-label={L.aria}
        >
            <defs>
                <linearGradient id="aiq-gate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5eead4" />
                    <stop offset="1" stopColor="#2f7bff" />
                </linearGradient>
                <filter id="aiq-glow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3.2" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 흐름 축 */}
            <line
                x1="22"
                y1={TRACK_Y}
                x2="498"
                y2={TRACK_Y}
                stroke="#7dd3fc"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.3"
            />

            {/* 구간 라벨 */}
            <text x="22" y="112" fontSize="14" fontWeight="600" fill="#9fc7e4">
                {L.left}
            </text>
            <text x="498" y="112" fontSize="14" fontWeight="600" fill="#a7f3e4" textAnchor="end">
                {L.right}
            </text>

            {/* 게이트 앞 — 아직 검증되지 않은 산출물(회색) */}
            {PHASES.map((begin) => (
                <g key={`pre-${begin}`}>
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;196,0"
                        dur={DUR}
                        begin={begin}
                        repeatCount="indefinite"
                    />
                    <g opacity="0">
                        <animate
                            attributeName="opacity"
                            values="0;0.9;0.9;0"
                            keyTimes="0;0.14;0.82;1"
                            dur={DUR}
                            begin={begin}
                            repeatCount="indefinite"
                        />
                        <rect
                            x="24"
                            y={TRACK_Y - 16}
                            width="32"
                            height="32"
                            rx="9"
                            fill="rgba(148,178,204,0.14)"
                            stroke="rgba(159,199,228,0.5)"
                        />
                        <line x1="33" y1={TRACK_Y - 5} x2="47" y2={TRACK_Y - 5} stroke="#9fc7e4" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
                        <line x1="33" y1={TRACK_Y + 1} x2="47" y2={TRACK_Y + 1} stroke="#9fc7e4" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
                        <line x1="33" y1={TRACK_Y + 7} x2="41" y2={TRACK_Y + 7} stroke="#9fc7e4" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
                    </g>
                </g>
            ))}

            {/* 품질 게이트 — 위아래로 훑는 스캔 */}
            <rect x={GATE_X} y="86" width="16" height="128" rx="8" fill="url(#aiq-gate)" opacity="0.28" />
            <rect x={GATE_X} y="86" width="16" height="128" rx="8" fill="none" stroke="#5eead4" strokeWidth="1.2" opacity="0.65" />
            <rect x={GATE_X} y="86" width="16" height="30" rx="8" fill="#5eead4" filter="url(#aiq-glow)" opacity="0.9">
                <animate attributeName="y" values="86;184;86" dur="2.8s" repeatCount="indefinite" />
            </rect>

            {/* 게이트 뒤 — 시험을 통과한 산출물(청록 + 체크) */}
            {PHASES.map((begin) => (
                <g key={`post-${begin}`}>
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;186,0"
                        dur={DUR}
                        begin={begin}
                        repeatCount="indefinite"
                    />
                    <g opacity="0">
                        <animate
                            attributeName="opacity"
                            values="0;1;1;0"
                            keyTimes="0;0.16;0.84;1"
                            dur={DUR}
                            begin={begin}
                            repeatCount="indefinite"
                        />
                        <rect
                            x="276"
                            y={TRACK_Y - 16}
                            width="32"
                            height="32"
                            rx="9"
                            fill="rgba(94,234,212,0.16)"
                            stroke="rgba(94,234,212,0.7)"
                        />
                        <path
                            d={`M285,${TRACK_Y} l5,5.5 l9,-11`}
                            fill="none"
                            stroke="#5eead4"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </g>
            ))}

            {/* 사람의 최종 결정 — 게이트 위에서 내려다보는 통제점 */}
            <line
                x1="250"
                y1="60"
                x2="250"
                y2="86"
                stroke="#5eead4"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                opacity="0.6"
            />
            <circle cx="250" cy="42" r="17" fill="none" stroke="#5eead4" strokeWidth="1.4" opacity="0">
                <animate attributeName="r" values="17;31" dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.55;0" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="42" r="17" fill="rgba(94,234,212,0.14)" stroke="#5eead4" strokeWidth="1.4" />
            <circle cx="250" cy="37" r="4.6" fill="#d8fff6" />
            <path d="M241,52 a9,9 0 0 1 18,0 z" fill="#d8fff6" />
            <text x="276" y="47" fontSize="14" fontWeight="600" fill="#a7f3e4">
                {L.human}
            </text>

            {/* 게이트 라벨 */}
            <text x="250" y="240" fontSize="14" fontWeight="600" fill="#cfe6f5" textAnchor="middle">
                {L.gate}
            </text>

            {/* 지속 개선 — 운영 결과가 다시 앞단으로 */}
            <path
                id="aiq-loop"
                d="M470,186 C505,290 15,290 50,186"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="1.3"
                strokeDasharray="5 7"
                opacity="0.45"
            />
            <circle r="3.4" fill="#7dd3fc" filter="url(#aiq-glow)">
                <animateMotion dur="6s" repeatCount="indefinite" path="M470,186 C505,290 15,290 50,186" />
            </circle>
            <text x="260" y="308" fontSize="14" fontWeight="600" fill="#9fc7e4" textAnchor="middle">
                {L.loop}
            </text>
        </svg>
    );
}
