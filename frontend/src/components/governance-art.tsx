/**
 * 거버넌스(Enterprise Trust) 다크 밴드용 보안 통제 일러스트 — 네이티브 SVG.
 * 중앙 실드·락을 동심 방어 링이 감싸고(스캔·펄스 애니메이션), 코어를 중심으로
 * 통제 항목 칩을 좌우 2개씩 대칭으로 배치해 점선으로 연결한다. 가로형(약 2.2:1)
 * 구성이라 오른쪽 통제 카드 그리드와 세로 높이가 균형을 이룬다.
 * 외부 이미지/라이브러리 없이 CSP-safe SMIL로 구현.
 */
const cx = 280;
const cy = 130;

// 코어를 기준으로 좌/우 각각 위·아래 2개씩 대칭 배치.
const LEFT = [
    { y: 42, label: "인증 · MFA / OTP" },
    { y: 188, label: "가드레일 · PII 마스킹" },
];
const RIGHT = [
    { y: 42, label: "권한 · ABAC 3-레이어" },
    { y: 188, label: "감사 로그 · 100% 추적" },
];

export function GovernanceArt() {
    return (
        <svg
            viewBox="0 0 560 250"
            className="w-full"
            role="img"
            aria-label="중앙 보안 코어를 동심 방어 계층과 좌우 통제 항목이 감싸는 XGEN 거버넌스 개념도"
        >
            <defs>
                <radialGradient id="gov-core" cx="0.4" cy="0.32" r="0.9">
                    <stop offset="0" stopColor="#4a9bff" />
                    <stop offset="0.6" stopColor="#2f6fe0" />
                    <stop offset="1" stopColor="#1b3f9e" />
                </radialGradient>
                <filter id="gov-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="3.4" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 동심 방어 링 */}
            <g fill="none">
                <circle cx={cx} cy={cy} r="112" stroke="#2f7bff" strokeWidth="1" strokeDasharray="5 7" opacity="0.28" />
                <circle cx={cx} cy={cy} r="86" stroke="#3f7fe6" strokeWidth="1.2" opacity="0.4" />
                <circle cx={cx} cy={cy} r="60" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.5" />
            </g>

            {/* 펄스 링 — 바깥으로 퍼지며 소멸 */}
            <circle cx={cx} cy={cy} r="60" fill="none" stroke="#7dd3fc" strokeWidth="1.5" opacity="0">
                <animate attributeName="r" dur="3.4s" repeatCount="indefinite" values="60;112" />
                <animate attributeName="opacity" dur="3.4s" repeatCount="indefinite" values="0.55;0" />
            </circle>

            {/* 스캔 도트 — 링을 도는 감시 */}
            <g>
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="7s" repeatCount="indefinite" />
                <circle cx={cx + 86} cy={cy} r="3.6" fill="#7dd3fc" filter="url(#gov-glow)" />
            </g>

            {/* 좌측 통제 칩 — 코어 왼쪽에서 점선 연결(칩 오른쪽 = 텍스트 우측 정렬) */}
            {LEFT.map((c) => (
                <g key={c.label}>
                    <line x1={cx - 44} y1={cy} x2="168" y2={c.y + 15} stroke="#7dd3fc" strokeWidth="1" strokeDasharray="3 4" opacity="0.32" />
                    <rect x="0" y={c.y} width="168" height="30" rx="8" fill="rgba(125,211,252,0.08)" stroke="rgba(125,211,252,0.32)" />
                    <circle cx="152" cy={c.y + 15} r="3.2" fill="#7dd3fc" />
                    <text x="142" y={c.y + 19.5} fontSize="12.5" fontWeight="600" fill="#d4e9f7" textAnchor="end">
                        {c.label}
                    </text>
                </g>
            ))}

            {/* 우측 통제 칩 — 코어 오른쪽에서 점선 연결 */}
            {RIGHT.map((c) => (
                <g key={c.label}>
                    <line x1={cx + 44} y1={cy} x2="392" y2={c.y + 15} stroke="#7dd3fc" strokeWidth="1" strokeDasharray="3 4" opacity="0.32" />
                    <rect x="392" y={c.y} width="168" height="30" rx="8" fill="rgba(125,211,252,0.08)" stroke="rgba(125,211,252,0.32)" />
                    <circle cx="408" cy={c.y + 15} r="3.2" fill="#7dd3fc" />
                    <text x="422" y={c.y + 19.5} fontSize="12.5" fontWeight="600" fill="#d4e9f7">
                        {c.label}
                    </text>
                </g>
            ))}

            {/* 중앙 실드 + 락 */}
            <path
                d={`M${cx - 40},${cy - 46} L${cx + 40},${cy - 46} L${cx + 40},${cy + 4} C${cx + 40},${cy + 34} ${cx + 18},${cy + 50} ${cx},${cy + 56} C${cx - 18},${cy + 50} ${cx - 40},${cy + 34} ${cx - 40},${cy + 4} Z`}
                fill="url(#gov-core)"
                stroke="#8cc4ff"
                strokeWidth="1.5"
                filter="url(#gov-glow)"
            />
            {/* 락 */}
            <path
                d={`M${cx - 9},${cy - 4} v-7 a9,9 0 0 1 18,0 v7`}
                fill="none"
                stroke="#eaf4ff"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
            <rect x={cx - 15} y={cy - 4} width="30" height="24" rx="4" fill="#eaf4ff" />
            <circle cx={cx} cy={cy + 7} r="3" fill="#2f6fe0" />
            <rect x={cx - 1.3} y={cy + 8} width="2.6" height="7" rx="1.3" fill="#2f6fe0" />
        </svg>
    );
}
