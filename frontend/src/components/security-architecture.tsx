import { ShieldCheck } from "lucide-react";

/**
 * 온프레미스·보안 아키텍처 — 신뢰 경계 기반 제로트러스트 계층도 + Defense in Depth.
 * 아키텍처 페이지의 다른 다이어그램(ArchitectureDiagram)과 동일한 라이트 룩앤필
 * (흰 카드 · 연블루 밴드 · 잉크 텍스트 · 블루 계열 액센트)을 따른다. 외부 이미지 없음.
 */

// 쿨톤 단일 계열(slate→indigo→blue→cyan) — 외부(중립) → 내부(채도↑)로 신뢰 수준을 표현.
type Tone = "slate" | "indigo" | "blue" | "cyan";
const TONE: Record<Tone, { bar: string; text: string; bg: string; bd: string }> = {
    slate: { bar: "#94a3b8", text: "#475569", bg: "#f1f5f9", bd: "#cbd5e1" },
    indigo: { bar: "#6366f1", text: "#4f46e5", bg: "#eef2ff", bd: "#c7d2fe" },
    blue: { bar: "#2f7bff", text: "#2461d8", bg: "#eaf0ff", bd: "#bcd0f5" },
    cyan: { bar: "#0891b2", text: "#0e7490", bg: "#ecfeff", bd: "#a5f3fc" },
};

const ZONES: {
    tone: Tone;
    tag: string;
    suffix: string;
    title: string;
    sub: string;
    cards: { t: string; s: string }[];
    flow: string | null;
    boundaryBefore?: boolean;
}[] = [
    {
        tone: "slate",
        tag: "UNTRUSTED",
        suffix: "",
        title: "사용자 영역",
        sub: "조직 내부망 또는 VPN 경유 접속",
        cards: [
            { t: "웹 브라우저", s: "JWT 쿠키 · xgen_access_token" },
            { t: "임베드 챗봇", s: "chatbot-embed.js · 배포 Agent" },
        ],
        flow: "HTTPS",
    },
    {
        tone: "indigo",
        tag: "DMZ",
        suffix: "표현 계층",
        title: "프론트엔드",
        sub: "UI 렌더 · API 리라이트",
        cards: [
            { t: "Next.js Frontend", s: "apps/web" },
            { t: "클라이언트 AuthGuard", s: "라우트 가드 · 1차 UI 게이팅" },
            { t: "API 라우트 / Rewrite", s: "게이트웨이로 전달" },
        ],
        flow: "JWT",
    },
    {
        tone: "indigo",
        tag: "GATEWAY",
        suffix: "경계",
        title: "인증 게이트웨이",
        sub: "JWT → 신뢰 헤더 변환",
        boundaryBefore: true,
        cards: [
            { t: "Rust Gateway", s: "" },
            { t: "JWT 파싱·검증", s: "쿠키 → 사용자 컨텍스트" },
            { t: "x-user-* 헤더 주입", s: "id · roles · permissions · superuser" },
            { t: "스푸핑 차단", s: "클라이언트가 헤더 직접 주입 불가" },
        ],
        flow: "x-user-* 헤더",
    },
    {
        tone: "blue",
        tag: "INTERNAL",
        suffix: "내부 신뢰",
        title: "애플리케이션 서비스",
        sub: "권한 집행 · 접근 제어",
        cards: [
            { t: "xgen-core", s: "ABAC 접근 제어" },
            { t: "xgen-workflow", s: "실행 · 접근제어 5단계" },
            { t: "이중 승인 게이트", s: "배포 + 거버넌스 승인 필수" },
            { t: "MCP Station", s: "샌드박스 격리 실행" },
        ],
        flow: "내부망 호출",
    },
    {
        tone: "blue",
        tag: "AIR-GAPPED",
        suffix: "내부망 · GPU",
        title: "AI 모델 영역",
        sub: "전부 내부 엔드포인트",
        cards: [
            { t: "LLM 서빙", s: "vLLM · SGLang · llama.cpp (사내 GPU)" },
            { t: "임베딩 · 리랭커", s: "Sentence Transformers · vLLM" },
            { t: "Guard 모델", s: "오픈 가드 모델 · fail-closed" },
        ],
        flow: "저장 · 조회",
    },
    {
        tone: "cyan",
        tag: "RESTRICTED",
        suffix: "데이터 영역",
        title: "데이터 저장소",
        sub: "내부망 · 접근 제한",
        cards: [
            { t: "Qdrant", s: "벡터 DB" },
            { t: "애플리케이션 DB", s: "사용자·정책·메타" },
            { t: "MinIO", s: "문서 객체 스토리지" },
            { t: "감사 로그 저장소", s: "보존 정책 적용" },
        ],
        flow: null,
    },
];

const LEGEND: { c: string; label: string }[] = [
    { c: "#94a3b8", label: "신뢰 없음 (외부)" },
    { c: "#6366f1", label: "경계 · DMZ" },
    { c: "#2f7bff", label: "내부 신뢰 영역" },
    { c: "#0891b2", label: "제한 데이터 영역" },
];

const DEFENSE: { title: string; items: string[] }[] = [
    { title: "인증 (AuthN)", items: ["JWT 쿠키 인증", "초기 SuperUser 부트스트랩 (1회)"] },
    { title: "인가 (AuthZ)", items: ["RBAC 역할", "ABAC 3레이어 권한 (등급·역할·권한)", "워크플로 접근제어 5단계"] },
    { title: "데이터 보호", items: ["PII 마스킹", "가드레일 (실패 시 차단)", "금칙어 · 위험 등급"] },
    { title: "거버넌스", items: ["배포·거버넌스 이중 승인", "정기 점검 (D-5 스케줄)", "위험도 평가"] },
    { title: "감사·추적", items: ["감사 로그 · 데이터 감사 로그", "서비스 변경 이력 · 운영 이력"] },
    { title: "격리·경계", items: ["MCP 샌드박스 실행", "모델·Guard 내부망 전용", "온프레미스 / 에어갭 대응"] },
];

export function SecurityArchitecture() {
    return (
        <div>
            {/* 범례 */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {LEGEND.map((l) => (
                    <span
                        key={l.label}
                        className="inline-flex items-center gap-2 text-[13px] text-[var(--color-ink-muted)]"
                    >
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.c }} />
                        {l.label}
                    </span>
                ))}
            </div>

            {/* 계층도 */}
            <div className="mt-6 space-y-0">
                {ZONES.map((z, i) => {
                    const tn = TONE[z.tone];
                    return (
                        <div key={z.title}>
                            {z.boundaryBefore && (
                                <div className="my-4 flex items-start gap-3 rounded-2xl border border-dashed border-[#bcd0f5] bg-[#eef4ff] px-5 py-4">
                                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-[#2f7bff]" />
                                    <div>
                                        <p className="text-[15px] font-bold text-[var(--color-ink)]">
                                            인증 신뢰 경계 (Trust Boundary)
                                        </p>
                                        <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            이 지점 위쪽은 스푸핑 가능한 외부 · 아래쪽은 신뢰 영역 — 게이트웨이만 이 선을 넘길 수 있음
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="relative overflow-hidden rounded-xl border border-[#d4ddf2] bg-[#f5f8ff] p-4 pl-5">
                                <span
                                    className="absolute inset-y-3 left-0 w-1 rounded-full"
                                    style={{ backgroundColor: tn.bar }}
                                />
                                <div className="grid gap-x-6 gap-y-4 lg:grid-cols-[184px_1fr] lg:items-center">
                                    <div>
                                        <span
                                            className="inline-flex items-center rounded-md border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide"
                                            style={{ color: tn.text, backgroundColor: tn.bg, borderColor: tn.bd }}
                                        >
                                            {z.tag}
                                        </span>
                                        {z.suffix && (
                                            <span className="ml-2 text-[12.5px] tracking-wide text-[var(--color-ink-subtle)]">
                                                {z.suffix}
                                            </span>
                                        )}
                                        <h4 className="mt-2 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {z.title}
                                        </h4>
                                        <p className="mt-0.5 text-[12.5px] text-[var(--color-ink-subtle)]">{z.sub}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {z.cards.map((c) => (
                                            <div
                                                key={c.t}
                                                className="w-full rounded-lg border border-[#dbe2f4] bg-white px-3.5 py-2.5 sm:w-[164px]"
                                            >
                                                <p className="text-[13px] font-bold leading-tight text-[var(--color-ink)]">
                                                    {c.t}
                                                </p>
                                                {c.s && (
                                                    <p className="mt-1 text-[11px] leading-snug text-[var(--color-ink-subtle)]">
                                                        {c.s}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {z.flow && (
                                <div className="py-2.5 text-center text-[12px] tracking-widest text-[var(--color-ink-subtle)]">
                                    {z.flow} ↓
                                </div>
                            )}
                            {i === ZONES.length - 1 ? null : z.flow ? null : <div className="h-4" />}
                        </div>
                    );
                })}
            </div>

            {/* Defense in Depth */}
            <div className="mt-10 rounded-2xl border border-[#d4ddf2] bg-[#f5f8ff] p-6 md:p-8">
                <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-widest text-[#2461d8]">
                    <span className="h-px w-6 bg-[#2461d8]/50" />
                    전 계층 적용 · Defense in Depth
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    아래 통제는 특정 계층이 아니라 요청 경로 전체에 걸쳐 작동합니다.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {DEFENSE.map((d) => (
                        <div key={d.title} className="rounded-xl border border-[#dbe2f4] bg-white p-5">
                            <h4 className="flex items-center gap-2 text-[16px] font-bold text-[var(--color-ink)]">
                                <span className="h-2 w-2 rotate-45 rounded-[2px] bg-[#2f7bff]" />
                                {d.title}
                            </h4>
                            <ul className="mt-3 space-y-1.5">
                                {d.items.map((it) => (
                                    <li
                                        key={it}
                                        className="flex gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                    >
                                        <span className="text-[var(--color-ink-subtle)]">·</span>
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
