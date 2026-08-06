/**
 * Easy Mode 일러스트 — 대화로 에이전트를 만들고, 캔버스에서 노드를 조립해 쉽게 구현.
 * 좌: 대화형 생성(챗) · 우: 노코드 캔버스(드래그&드롭 노드). 순수 SVG(외부 이미지 없음).
 */
import type { Locale } from "@/lib/i18n";

/** 대화 목업·캔버스 라벨 — SVG 안쪽 글자도 페이지 언어를 따라간다. */
const T: Record<
    Locale,
    {
        aria: string;
        chatHeader: string;
        prompt: string;
        userMsg: string;
        replyA: string;
        replyB: string;
        timeChip: string;
        canvas: string;
        knowledge: string;
        tools: string;
        done: string;
    }
> = {
    ko: {
        aria: "이지모드 — 대화로 에이전트를 만들고 캔버스에서 노드를 조립해 쉽게 구현",
        chatHeader: "이지모드 · 대화형",
        prompt: "어떤 에이전트가 필요하세요?",
        userMsg: "배송 안내 챗봇 만들어줘",
        replyA: "지식·프롬프트·도구를",
        replyB: "연결했어요",
        timeChip: "약 90초 완성",
        canvas: "캔버스",
        knowledge: "지식",
        tools: "도구",
        done: "에이전트 완성",
    },
    en: {
        aria: "Easy Mode — build an agent by conversation, then assemble nodes on the canvas",
        chatHeader: "Easy Mode · conversational",
        prompt: "What kind of agent do you need?",
        userMsg: "Build me a delivery-status chatbot",
        replyA: "Knowledge, prompt, and tools",
        replyB: "are connected",
        timeChip: "Done in ~90 seconds",
        canvas: "Canvas",
        knowledge: "Knowledge",
        tools: "Tools",
        done: "Agent ready",
    },
};

export function EasyModeArt({ locale = "ko" }: { locale?: Locale }) {
    const L = T[locale];
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
            <svg
                viewBox="0 0 480 240"
                className="block h-auto w-full"
                role="img"
                aria-label={L.aria}
                fontFamily="Pretendard, system-ui, sans-serif"
            >
                <defs>
                    <linearGradient id="em-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#00acee" />
                        <stop offset="1" stopColor="#185aea" />
                    </linearGradient>
                    <filter id="em-sh" x="-20%" y="-20%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#1e3a68" floodOpacity="0.14" />
                    </filter>
                    <marker id="em-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 1 L9 5 L0 9 z" fill="#2f7bff" />
                    </marker>
                </defs>

                {/* ── 좌: 대화형 생성 패널 ── */}
                <g filter="url(#em-sh)">
                    <rect x="18" y="28" width="200" height="184" rx="12" fill="#ffffff" stroke="#e6ecf5" />
                </g>
                {/* 헤더 */}
                <path d="M18 40 a12 12 0 0 1 12 -12 h176 a12 12 0 0 1 12 12 v10 h-200 z" fill="#f1f5f9" />
                <g transform="translate(32 33)">
                    <rect x="-2" y="-7" width="15" height="15" rx="4" fill="url(#em-blue)" />
                    <path d="M1.5 0.5 l2.5 2.5 l4 -5" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="20" y="4.5" fontSize="10" fontWeight="700" fill="#1f2b45">{L.chatHeader}</text>
                </g>

                {/* 시스템 안내 */}
                <text x="34" y="72" fontSize="9.5" fill="#94a3b8">{L.prompt}</text>

                {/* 사용자 말풍선(우측·블루) */}
                <rect x="78" y="80" width="126" height="26" rx="9" fill="url(#em-blue)" />
                <text x="90" y="97" fontSize="9.5" fill="#ffffff">{L.userMsg}</text>

                {/* 어시스턴트 말풍선(좌측·라이트) */}
                <rect x="32" y="118" width="150" height="44" rx="10" fill="#eef4ff" stroke="#dbe6fb" />
                <text x="44" y="135" fontSize="9.5" fill="#274268">{L.replyA}</text>
                <text x="44" y="150" fontSize="9.5" fill="#274268">
                    {L.replyB}{" "}
                    <tspan fill="#0f9d6f" fontWeight="700">✓</tspan>
                </text>

                {/* 완성 시간 칩 */}
                <rect x="32" y="178" width="86" height="20" rx="10" fill="#eaf0ff" stroke="#d3e0fb" />
                <circle cx="44" cy="188" r="2.5" fill="#2f7bff" />
                <text x="52" y="191.5" fontSize="9" fontWeight="700" fill="#2461d8">{L.timeChip}</text>

                {/* ── 중앙 연결 화살표 ── */}
                <line x1="222" y1="120" x2="256" y2="120" stroke="#2f7bff" strokeWidth="2.2" markerEnd="url(#em-arrow)" />

                {/* ── 우: 노코드 캔버스 패널 ── */}
                <g filter="url(#em-sh)">
                    <rect x="262" y="28" width="200" height="184" rx="12" fill="#f7f9fd" stroke="#e6ecf5" />
                </g>
                {/* 그리드 점 */}
                {[0, 1, 2, 3, 4].map((r) =>
                    [0, 1, 2, 3, 4].map((c) => (
                        <circle key={`${r}-${c}`} cx={286 + c * 40} cy={64 + r * 34} r="1" fill="#d4deee" />
                    )),
                )}
                {/* 캔버스 라벨 */}
                <g transform="translate(278 46)">
                    <rect x="0" y="-8" width="11" height="11" rx="2.5" fill="none" stroke="#2f7bff" strokeWidth="1.3" />
                    <path d="M3 -2.5 h5 M3 0 h5" stroke="#2f7bff" strokeWidth="1.3" strokeLinecap="round" />
                    <text x="17" y="1" fontSize="9.5" fontWeight="700" fill="#4a6aa8">{L.canvas}</text>
                </g>

                {/* 연결선: 지식·도구 → 에이전트 */}
                <path d="M316 100 C 316 128 350 126 358 150" fill="none" stroke="#93b4f0" strokeWidth="2" />
                <path d="M410 100 C 410 128 372 126 366 150" fill="none" stroke="#93b4f0" strokeWidth="2" />

                {/* 노드: 지식 */}
                <g>
                    <rect x="282" y="72" width="70" height="28" rx="8" fill="#ffffff" stroke="#d7e0f0" />
                    <circle cx="296" cy="86" r="4" fill="#e5f7ff" stroke="#8fd6f2" />
                    <text x="306" y="89.5" fontSize="9.5" fontWeight="600" fill="#1f2b45">{L.knowledge}</text>
                </g>
                {/* 노드: 도구(드래그 중) */}
                <g>
                    {/* 고스트(놓을 자리) */}
                    <rect x="378" y="72" width="66" height="28" rx="8" fill="none" stroke="#9cc0f5" strokeWidth="1.4" strokeDasharray="4 4" />
                    <rect x="384" y="78" width="66" height="28" rx="8" fill="#ffffff" stroke="#bcd0f5" />
                    <circle cx="398" cy="92" r="4" fill="#eef2ff" stroke="#a5b4fc" />
                    <text x="408" y="95.5" fontSize="9.5" fontWeight="600" fill="#1f2b45">{L.tools}</text>
                    {/* 커서 */}
                    <path d="M446 96 l14 5 l-6 2 l-2 6 z" fill="#1f2b45" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round" />
                </g>
                {/* 노드: 에이전트(완성·블루) */}
                <rect x="316" y="150" width="92" height="32" rx="9" fill="url(#em-blue)" />
                <path d="M330 166 l3 3 l5 -6" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="343" y="169.5" fontSize="10" fontWeight="700" fill="#ffffff">{L.done}</text>
            </svg>
        </div>
    );
}
