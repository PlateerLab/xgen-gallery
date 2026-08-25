/**
 * 걸어온 길 — 왼쪽(과거)에서 오른쪽(현재)으로 완만하게 굽이치며 올라가는 곡선 위에
 * 이정표를 놓는다. 직선으로 두면 눈금자처럼 읽히는데, 연혁은 균일한 간격의 계측이
 * 아니라 굴곡을 지나 여기까지 온 경로다. 그래서 곡선을 쓴다.
 *
 * 애니메이션은 두지 않는다 — 스크롤해 내려온 사람이 기다리지 않고 바로 전체를
 * 훑을 수 있어야 한다. 그래서 클라이언트 훅이 필요 없고 서버 컴포넌트로 둔다.
 *
 * 가로 스크롤도 두지 않는다. 곡선과 좌표를 모두 비율로 잡아 컨테이너 폭에 맞춰
 * 늘어나고, 라벨 폭만 화면에 따라 줄여 서로 겹치지 않게 한다.
 */

/** 좌표계. 실제 렌더 크기와 무관하게 이 안에서 위치를 계산한다. */
const VB = { w: 1200, h: 400 };
/** 길이 지나는 세로 대역 — 위아래로 라벨이 번갈아 붙을 자리를 남긴다. */
const BAND = { base: 230, rise: 70, wave: 22 };

/** i 번째 이정표가 놓이는 좌표. 전체적으로 오른쪽으로 갈수록 올라간다(y 감소). */
function pointAt(i: number, n: number) {
    const t = n === 1 ? 0 : i / (n - 1);
    return {
        x: 60 + t * (VB.w - 120),
        y: BAND.base - t * BAND.rise - BAND.wave * Math.sin(2 * Math.PI * t),
    };
}

/**
 * 점들을 지나는 매끄러운 곡선. Catmull-Rom 스플라인을 3차 베지어로 옮긴다 —
 * 점을 정확히 통과하면서 이음매에서 꺾이지 않는다.
 */
function curveThrough(pts: { x: number; y: number }[]) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? p2;
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
}

export function MilestoneRoadmap({
    items,
}: {
    /** 과거 → 현재 순으로 넘긴다(로드맵은 왼쪽이 과거다). */
    items: { when: string; what: string }[];
}) {
    const n = items.length;
    const pts = items.map((_, i) => pointAt(i, n));
    const d = curveThrough(pts);
    const last = n - 1;

    return (
        <div className="mt-4">
            <div className="relative h-[300px] sm:h-[360px] md:h-[400px]">
                <svg
                    aria-hidden
                    className="absolute inset-0 h-full w-full"
                    viewBox={`0 0 ${VB.w} ${VB.h}`}
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#bcd0f5" />
                            <stop offset="1" stopColor="#2461d8" />
                        </linearGradient>
                    </defs>
                    <path
                        d={d}
                        stroke="url(#roadGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                <ol className="absolute inset-0">
                    {items.map((m, i) => {
                        const p = pts[i];
                        const above = i % 2 === 1;
                        return (
                            <li
                                key={m.when}
                                className="absolute"
                                style={{
                                    left: `${(p.x / VB.w) * 100}%`,
                                    top: `${(p.y / VB.h) * 100}%`,
                                }}
                            >
                                <span
                                    aria-hidden
                                    className={`roadmap-dot${i === last ? " roadmap-dot-now" : ""}`}
                                />
                                <div
                                    className="absolute left-1/2 w-[clamp(78px,12.5vw,158px)] -translate-x-1/2 text-center"
                                    style={above ? { bottom: 22 } : { top: 22 }}
                                >
                                    <span
                                        className={`font-mono text-[11px] font-bold sm:text-[13px] ${
                                            i === last
                                                ? "text-[#1f4fa8]"
                                                : "text-[#2461d8]"
                                        }`}
                                    >
                                        {m.when}
                                    </span>
                                    <p className="mt-1 text-[11px] leading-snug text-[var(--color-ink-muted)] sm:mt-1.5 sm:text-[13px] sm:leading-relaxed">
                                        {m.what}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}
