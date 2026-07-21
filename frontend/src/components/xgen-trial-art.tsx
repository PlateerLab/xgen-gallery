/**
 * XGEN 무료 체험 페이지용 인라인 SVG 일러스트.
 * 사진/실제 스크린샷 없이도 "노코드 에이전트 빌더"의 제품 감각을 전달하는 목업과
 * 연동→설계→운영 3단계 플로우 아이콘을 브랜드 블루로 그린다.
 */

/** 히어로 제품 목업 — 노코드 Agent Builder 캔버스(다크 히어로 위에 뜨는 라이트 윈도우). */
export function AgentBuilderMockup({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 460 340"
            fill="none"
            role="img"
            aria-label="XGEN 노코드 Agent Builder 화면 예시"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="tb-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00acee" />
                    <stop offset="1" stopColor="#185aea" />
                </linearGradient>
                <filter id="tb-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#04122e" floodOpacity="0.45" />
                </filter>
            </defs>

            {/* 윈도우 */}
            <g filter="url(#tb-shadow)">
                <rect x="18" y="20" width="424" height="300" rx="16" fill="#ffffff" />
                {/* 타이틀바 */}
                <path d="M18 36 a16 16 0 0 1 16 -16 h392 a16 16 0 0 1 16 16 v14 H18 Z" fill="#f2f6fd" />
                <circle cx="40" cy="35" r="4" fill="#d6def0" />
                <circle cx="54" cy="35" r="4" fill="#d6def0" />
                <circle cx="68" cy="35" r="4" fill="#d6def0" />
                <rect x="150" y="29" width="160" height="12" rx="6" fill="#e3ebf8" />
            </g>

            {/* 좌측 팔레트 */}
            <rect x="30" y="62" width="70" height="246" rx="10" fill="#f6f9fe" />
            {[76, 104, 132, 160].map((y) => (
                <g key={y}>
                    <rect x="40" y={y} width="50" height="18" rx="6" fill="#ffffff" stroke="#e2e9f7" />
                    <circle cx="50" cy={y + 9} r="3.5" fill="#9db8f2" />
                    <rect x="58" y={y + 6} width="26" height="6" rx="3" fill="#dbe4f5" />
                </g>
            ))}

            {/* 캔버스 노드 + 연결선 */}
            <g stroke="#bcd0f5" strokeWidth="2" strokeLinecap="round">
                <path d="M170 110 H210" />
                <path d="M296 110 H336" />
                <path d="M253 138 V186 H210" />
                <path d="M296 200 H336" />
            </g>

            {/* 데이터 노드 */}
            <g>
                <rect x="120" y="90" width="52" height="40" rx="10" fill="#ffffff" stroke="#cdd9f7" strokeWidth="1.5" />
                <rect x="132" y="102" width="20" height="4" rx="2" fill="#9db8f2" />
                <rect x="132" y="111" width="28" height="4" rx="2" fill="#dbe4f5" />
                <rect x="132" y="119" width="16" height="4" rx="2" fill="#dbe4f5" />
                <text x="146" y="146" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a6478">데이터</text>
            </g>

            {/* 에이전트(중앙, 그라디언트) */}
            <g>
                <rect x="210" y="86" width="86" height="48" rx="12" fill="url(#tb-grad)" />
                <path d="M241 98 l12 6 v12 l-12 6 -12 -6 v-12 Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                <path d="M253 104 v12 M253 110 l12 -6 M253 110 l-12 -6" stroke="#fff" strokeWidth="1.6" opacity="0.85" strokeLinecap="round" />
                <text x="253" y="150" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#2f3aa0">에이전트</text>
            </g>

            {/* 도구 노드 */}
            <g>
                <rect x="336" y="90" width="52" height="40" rx="10" fill="#ffffff" stroke="#cdd9f7" strokeWidth="1.5" />
                <circle cx="362" cy="110" r="10" fill="none" stroke="#7c9cf0" strokeWidth="2" />
                <path d="M362 104 v12 M356 110 h12" stroke="#7c9cf0" strokeWidth="2" strokeLinecap="round" />
                <text x="362" y="146" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a6478">도구·MCP</text>
            </g>

            {/* 지식(RAG) 노드 */}
            <g>
                <rect x="120" y="166" width="90" height="40" rx="10" fill="#ffffff" stroke="#cdd9f7" strokeWidth="1.5" />
                <path d="M136 176 h18 v20 h-18 z M136 186 h18" stroke="#9db8f2" strokeWidth="1.6" fill="none" />
                <text x="176" y="191" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a6478">지식(RAG)</text>
            </g>

            {/* 실행/응답 노드 */}
            <g>
                <rect x="336" y="180" width="52" height="40" rx="10" fill="#eafaf1" stroke="#b6e6cd" strokeWidth="1.5" />
                <path d="M356 200 l5 5 8 -9" stroke="#16a34a" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="362" y="236" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f9d6f">실행</text>
            </g>

            {/* 하단 프리뷰(채팅) 바 */}
            <rect x="120" y="256" width="268" height="46" rx="10" fill="#f6f9fe" stroke="#e6ecf7" />
            <rect x="132" y="266" width="150" height="8" rx="4" fill="#dbe4f5" />
            <rect x="132" y="282" width="96" height="8" rx="4" fill="#eef3fb" />
            <rect x="336" y="268" width="40" height="22" rx="8" fill="url(#tb-grad)" />
        </svg>
    );
}
