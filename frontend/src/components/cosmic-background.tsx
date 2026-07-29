import { getConcept, type ConceptId } from "@/lib/backgrounds";
import { cn } from "@/lib/cn";

/**
 * 우주 컨셉 풀블리드 배경 — 컨택트 히어로용.
 *
 * SceneBackground와 같은 문법(컨셉 base + 글로우 2개 + 24px 도트 그리드)을 그대로
 * 이어받아 사이트 룩앤필을 유지하되, 그 위에 별·성운·궤도·스캔빔을 얹어 우주의
 * 신비로운 결을 준다. 색은 전부 CONCEPTS에서 오므로 팔레트가 사이트와 어긋나지 않는다.
 *
 * `relative overflow-hidden` 부모 안에 두고, 콘텐츠는 `relative` 형제로 올린다.
 */

/**
 * 별 좌표는 매 렌더 동일해야 한다 — Math.random()을 쓰면 서버와 클라이언트가
 * 다른 값을 뱉어 hydration 불일치가 난다. 고정 시드 PRNG(mulberry32)로 모듈
 * 로드 시점에 한 번만 생성한다.
 */
function mulberry32(seed: number) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

interface Star {
    top: number;
    left: number;
    size: number;
    min: number;
    max: number;
    dur: number;
    delay: number;
}

function makeStars(count: number, seed: number): Star[] {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, () => {
        const bright = rnd();
        return {
            top: +(rnd() * 100).toFixed(3),
            left: +(rnd() * 100).toFixed(3),
            // 대부분 먼 별(작고 흐림), 소수만 가까운 별 — 깊이감이 생긴다
            size: +(bright > 0.94 ? 2.4 : bright > 0.75 ? 1.6 : 1).toFixed(2),
            min: +(0.2 + rnd() * 0.28).toFixed(3),
            max: +(0.72 + rnd() * 0.28).toFixed(3),
            dur: +(3 + rnd() * 6).toFixed(2),
            delay: +(rnd() * 8).toFixed(2),
        };
    });
}

const STARS = makeStars(220, 20260729);

/**
 * 은하수 띠의 기울기. 띠 자체(rotate)와 그 위 성단이 같은 값을 써야 별이 띠를
 * 따라 흐른다 — 어긋나면 "가로로 뿌린 별 위에 사선 띠를 얹은" 어색함이 남는다.
 */
const BAND_DEG = -13;
/** 화면 가로 100%를 지날 때 세로로 내려가는 양(%). tan(13°)≈0.231, 가로:세로≈1.6 */
const BAND_SLOPE = 37;
/**
 * 띠 중심이 지나는 세로 위치(%).
 * 40%(화면 중앙)에 두면 좌측 가독성 스크림이 가장 진한 지점과 정확히 겹쳐 띠가
 * 지워진다. 카피 위쪽 하늘로 올려 스크림을 피하면서 좌우로 길게 보이게 한다.
 */
const BAND_Y = 25;

/**
 * 은하수를 따라 밀집한 성단 — 띠의 기울기를 그대로 계산해 배치하고 폭 방향으로만
 * 흩뿌린다. 별을 가로로 뿌린 뒤 사선 띠를 얹으면 둘이 어긋나 어색해진다.
 */
const CLUSTER = makeStars(80, 8801).map((s) => {
    const jitter = (s.top / 100 - 0.5) * 13;
    return {
        ...s,
        top: +(BAND_Y - ((s.left - 50) * BAND_SLOPE) / 100 + jitter).toFixed(3),
    };
});

/** 지평선이 놓이는 높이(아래에서 %). 낮을수록 하늘이 넓어진다 */
const HORIZON_Y = 9;
/** 지평선을 위에서 잰 값 — 빛줄기 길이 계산용 */
const HORIZON_Y_FROM_TOP = 100 - HORIZON_Y;
/**
 * 북극성 위치. 무리 바로 위가 아니라 왼쪽 위에 떨어뜨려 둔다 — 수직으로 정렬하면
 * 구도가 뻣뻣하고, 비껴 있어야 "사람들이 저쪽의 별을 올려다본다"로 읽힌다.
 * 고개를 왼쪽 위로 젖힌 실루엣(tilt 음수)의 시선 방향과도 맞는다.
 */
const POLARIS_X = 12;
const POLARIS_Y = 14;
/**
 * 별과 무리를 잇는 선이 수직에서 벗어난 각도(도). 화면비에 따라 실제 각도는
 * 조금씩 달라지지만, 빛줄기는 크게 번지므로 이 근사로 충분하다.
 * atan(가로차 × 화면폭 / 세로차 × 화면높이) ≈ 32°
 */
const GUIDE_TILT = 32;

/** 사람 무리가 서 있는 가로 중심(왼쪽에서 %) */
const GUIDE_X = 43;
/** 우측 문의 폼이 덮는 구간(%) — 여기에 사람을 두면 카드에 가려 안 보인다 */
const FORM_ZONE: [number, number] = [51, 90];
/** 지평 실루엣(타원 호) 크기 — 폭 190%, 높이 54%, 꼭대기가 HORIZON_Y */
const RIDGE_RX = 95;
const RIDGE_RY = 27;

/**
 * 가로 위치 x(%)에서 지평선의 높이(아래에서 %).
 * 지평선은 직선이 아니라 완만한 호라서, 모두를 같은 높이에 두면 가장자리
 * 사람들이 허공에 뜬다. 호의 방정식으로 발밑을 x마다 구한다.
 */
function ridgeY(x: number): number {
    const t = Math.min(1, Math.abs(x - 50) / RIDGE_RX);
    return HORIZON_Y - RIDGE_RY + RIDGE_RY * Math.sqrt(1 - t * t);
}

interface Blob {
    x: number;
    y: number;
    w: number;
    h: number;
    a: number;
    blur: number;
}

/**
 * 은하수를 이루는 덩어리들.
 *
 * 사각형 div + 선형 그라데이션으로 띠를 그리면 블러를 아무리 줘도 직선 경계가
 * 남아 "칠한 자국"처럼 보인다. 사방으로 투명해지는 타원 radial 덩어리를 축을
 * 따라 크기·농도·위치를 달리해 겹치면 경계가 생기지 않고, 겹침의 불규칙함이
 * 그대로 성운의 농담이 된다.
 */
function makeBlobs(
    count: number,
    seed: number,
    cfg: { w: [number, number]; h: [number, number]; a: [number, number]; blur: [number, number]; spread: number },
): Blob[] {
    const rnd = mulberry32(seed);
    const span = (r: [number, number]) => r[0] + rnd() * (r[1] - r[0]);
    return Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        return {
            x: +(-8 + t * 116 + (rnd() - 0.5) * 9).toFixed(2),
            y: +((rnd() - 0.5) * cfg.spread).toFixed(2),
            w: Math.round(span(cfg.w)),
            h: Math.round(span(cfg.h)),
            a: +span(cfg.a).toFixed(3),
            blur: Math.round(span(cfg.blur)),
        };
    });
}

/** 밝은 성간 덩어리 — 겹쳐서 띠의 몸통을 만든다 */
const BAND_GLOW = makeBlobs(9, 4242, {
    w: [260, 560],
    h: [90, 190],
    a: [0.05, 0.16],
    blur: [34, 74],
    spread: 6,
});
/** 암흑대(성간 먼지) — 밝은 덩어리를 불규칙하게 끊어 균일함을 깬다 */
const BAND_DUST = makeBlobs(5, 909, {
    w: [190, 420],
    h: [28, 58],
    a: [0.22, 0.5],
    blur: [26, 52],
    spread: 3.4,
});

/**
 * 지평선에 세울 인물 실루엣.
 *
 * 라이선스 보유 소재(cm08559453_l)를 인물 단위로 잘라 흰 배경을 알파로 뺀
 * PNG 24장. `r`은 가로/세로 비율 — 높이만 정하면 폭이 따라오도록 갖고 있다.
 * (직접 그린 SVG 실루엣으로는 이 수준의 자연스러운 자세가 안 나온다)
 */
/** [파일, 가로/세로 비율] — 높이만 정하면 폭이 따라온다 */
const SILHOUETTES: Array<[string, number]> = [
    ["p01", 0.396], ["p02", 0.248], ["p03", 0.232], ["p04", 0.354],
    ["p05", 0.251], ["p06", 0.367], ["p07", 0.316], ["p08", 0.316],
    ["p09", 0.214], ["p10", 0.36], ["p11", 0.365], ["p12", 0.413],
    ["p13", 0.271], ["p14", 0.351], ["p15", 0.328], ["p16", 0.335],
    ["p17", 0.287], ["p18", 0.263], ["p19", 0.243], ["p20", 0.332],
    ["p21", 0.341], ["p22", 0.328], ["p23", 0.307], ["p24", 0.41],
];

/**
 * 지평선에 선 사람들. 소재를 골고루 쓰되 같은 인물이 나란히 붙지 않게 하고,
 * 무리 중심(GUIDE_X)에 가까울수록 크고 진하게 둔다 — 대기원근이자 시선의
 * 집중점이다. 좌우 반전으로 같은 소재의 반복감을 줄인다.
 */
const FIGURES = (() => {
    const rnd = mulberry32(90210);
    const [zoneFrom, zoneTo, count] = [16, FORM_ZONE[0] - 2, 17];
    const order = SILHOUETTES.map((_, i) => i);
    // 배열을 섞어 순서대로 쓰면 같은 인물이 규칙적으로 반복되지 않는다
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return Array.from({ length: count }, (_, i) => {
        const span = zoneTo - zoneFrom;
        const raw =
            zoneFrom + (i / (count - 1)) * span + (rnd() - 0.5) * (span / count) * 0.85;
        const x = +raw.toFixed(2);
        const near = Math.max(0, 1 - Math.abs(x - GUIDE_X) / 42);
        const h = Math.round(30 + near * 34 + rnd() * 20);
        const [file, ratio] = SILHOUETTES[order[i % order.length]];
        return {
            x,
            h,
            file,
            ratio,
            flip: rnd() > 0.5,
            // 멀수록(작을수록) 옅게 — 대기에 잠긴 느낌
            opacity: +Math.min(1, 0.62 + (h / 84) * 0.38).toFixed(2),
        };
    });
})();

export function CosmicBackground({
    concept = "contact",
    className,
}: {
    concept?: ConceptId;
    className?: string;
}) {
    const c = getConcept(concept);
    return (
        <div
            aria-hidden
            className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden",
                className,
            )}
            style={{ backgroundColor: c.base }}
        >
            {/* 심우주 — 위로 갈수록 더 어둡게 깔아 깊이를 만든다 */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, #01020a 0%, transparent 45%, rgba(2,4,14,0.75) 100%)",
                }}
            />

            {/* 성운 1 — SceneBackground의 상단 글로우와 같은 자리·같은 색 */}
            <div
                className="cosmic-nebula absolute left-1/2 top-[-30%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full blur-2xl"
                style={{
                    background: `radial-gradient(ellipse at center, ${c.glow1}, transparent 60%)`,
                    ["--tw-drift-dur" as string]: "34s",
                }}
            />
            {/* 성운 2 — 하단 우측 글로우 */}
            <div
                className="cosmic-nebula absolute bottom-[-25%] right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${c.glow2}, transparent 65%)`,
                    ["--tw-drift-dur" as string]: "28s",
                    ["--tw-drift-delay" as string]: "-9s",
                }}
            />
            {/* 성운 3 — 좌하단에 청록 기운을 살짝. 단조로운 블루를 깬다 */}
            <div
                className="cosmic-nebula absolute bottom-[-15%] left-[-12%] h-[460px] w-[620px] rounded-full blur-3xl"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(56,189,248,0.16), transparent 68%)",
                    ["--tw-drift-dur" as string]: "40s",
                    ["--tw-drift-delay" as string]: "-16s",
                }}
            />

            {/* 은하수 — 균일한 넓은 띠 하나로 그리면 물감 자국처럼 보인다. 실제 은하수는
                넓고 흐린 헤일로 위에 좁고 밝은 코어가 얹히고, 그 코어를 암흑대(성간 먼지)가
                끊는다. 세 겹으로 나눠 그 구조를 만든다. */}
            <div
                className="absolute inset-0"
                style={{ transform: `rotate(${BAND_DEG}deg)` }}
            >
                {/* 밝은 덩어리 — 겹치면서 띠의 몸통이 된다 */}
                {BAND_GLOW.map((b, i) => (
                    <div
                        key={`g${i}`}
                        className="absolute -translate-x-1/2 rounded-[50%]"
                        style={{
                            left: `${b.x}%`,
                            top: `calc(${BAND_Y}% + ${b.y}% - ${b.h / 2}px)`,
                            width: `${b.w}px`,
                            height: `${b.h}px`,
                            filter: `blur(${b.blur}px)`,
                            background: `radial-gradient(ellipse at center, rgba(210,219,255,${b.a}) 0%, rgba(180,195,245,${(b.a * 0.42).toFixed(3)}) 42%, transparent 72%)`,
                        }}
                    />
                ))}
                {/* 암흑대 — 밝은 덩어리를 불규칙하게 끊는다 */}
                {BAND_DUST.map((b, i) => (
                    <div
                        key={`d${i}`}
                        className="absolute -translate-x-1/2 rounded-[50%]"
                        style={{
                            left: `${b.x}%`,
                            top: `calc(${BAND_Y}% + ${b.y}% - ${b.h / 2}px)`,
                            width: `${b.w}px`,
                            height: `${b.h}px`,
                            filter: `blur(${b.blur}px)`,
                            background: `radial-gradient(ellipse at center, rgba(3,5,14,${b.a}) 0%, transparent 70%)`,
                        }}
                    />
                ))}
            </div>

            {/* 별 — 먼 별(전면 산포) + 은하수 띠를 따라 밀집한 성단.
                아래로 갈수록 사라지게 마스크를 건다: 별이 바닥까지 흩어져 있으면
                화면이 떠 있는 느낌이 들고, 위에 모여야 하늘–지면 관계가 생긴다. */}
            {[
                { list: STARS, cls: "" },
                { list: CLUSTER, cls: "opacity-80" },
            ].map(({ list, cls }, gi) => (
                <div
                    key={gi}
                    className={cn("absolute inset-0", cls)}
                    style={{
                        maskImage:
                            "linear-gradient(to bottom, black 56%, rgba(0,0,0,0.35) 78%, transparent 90%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, black 56%, rgba(0,0,0,0.35) 78%, transparent 90%)",
                    }}
                >
                    {list.map((s, i) => (
                        <span
                            key={i}
                            className="cosmic-star absolute rounded-full bg-white"
                            style={{
                                top: `${s.top}%`,
                                left: `${s.left}%`,
                                width: `${s.size}px`,
                                height: `${s.size}px`,
                                boxShadow:
                                    s.size > 2
                                        ? "0 0 6px 1px rgba(199,210,254,0.9)"
                                        : undefined,
                                ["--tw-star-min" as string]: `${s.min}`,
                                ["--tw-star-max" as string]: `${s.max}`,
                                ["--tw-star-dur" as string]: `${s.dur}s`,
                                ["--tw-star-delay" as string]: `-${s.delay}s`,
                            }}
                        />
                    ))}
                </div>
            ))}

            {/* 궤도 — 사이버틱한 기하. 아주 느리게 돌아 정지 화면처럼 보이지 않게 한다 */}
            <svg
                className="absolute right-[-14%] top-1/2 h-[820px] w-[820px] -translate-y-1/2 opacity-[0.34]"
                viewBox="0 0 400 400"
                fill="none"
            >
                <defs>
                    <linearGradient id="cosmicOrbit" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
                        <stop offset="55%" stopColor="#2f7bff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* 기울기·크기·속도·방향이 제각각인 궤도들. 같은 간격의 동심원을
                    그리면 과녁처럼 보이므로, 납작한 타원을 여러 각도로 겹친다. */}
                {[
                    { rx: 168, ry: 168, rot: 0, dur: 120, rev: false, sw: 0.7, dot: 2.2 },
                    { rx: 124, ry: 52, rot: -24, dur: 86, rev: true, sw: 0.7, dot: 1.8 },
                    { rx: 186, ry: 74, rot: 16, dur: 150, rev: false, sw: 0.6, dot: 1.6 },
                    { rx: 96, ry: 96, rot: 0, dur: 74, rev: true, sw: 0.55, dot: 1.5 },
                    { rx: 148, ry: 108, rot: -52, dur: 168, rev: false, sw: 0.5, dot: 1.4 },
                    { rx: 62, ry: 26, rot: 34, dur: 58, rev: true, sw: 0.5, dot: 1.3 },
                ].map((o, i) => (
                    <g
                        key={i}
                        className="cosmic-orbit"
                        style={{
                            ["--tw-orbit-dur" as string]: `${o.dur}s`,
                            ...(o.rev ? { animationDirection: "reverse" } : {}),
                        }}
                    >
                        <g transform={`rotate(${o.rot} 200 200)`}>
                            <ellipse
                                cx="200"
                                cy="200"
                                rx={o.rx}
                                ry={o.ry}
                                stroke="url(#cosmicOrbit)"
                                strokeWidth={o.sw}
                            />
                            {/* 궤도를 도는 점 — 회전이 눈에 보이게 하는 유일한 단서 */}
                            <circle
                                cx={200 + o.rx}
                                cy="200"
                                r={o.dot}
                                fill="#7dd3fc"
                                opacity="0.85"
                            />
                        </g>
                    </g>
                ))}
                {/* 최외곽 점선 — 궤도계의 경계 */}
                <ellipse
                    cx="200"
                    cy="200"
                    rx="196"
                    ry="196"
                    stroke="rgba(125,211,252,0.16)"
                    strokeWidth="0.5"
                    strokeDasharray="2 9"
                />
                <ellipse
                    cx="200"
                    cy="200"
                    rx="212"
                    ry="140"
                    stroke="rgba(125,211,252,0.1)"
                    strokeWidth="0.5"
                    strokeDasharray="1 12"
                    transform="rotate(-38 200 200)"
                />
            </svg>

            {/* 도트 그리드 — SceneBackground와 동일 모티프(24px, 상단 마스크).
                사이트 전체와 같은 계열로 읽히게 하는 핵심 신호라 그대로 유지한다. */}
            <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    maskImage:
                        "linear-gradient(to bottom, black 55%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
            />

            {/* ── 북극성과 그를 올려다보는 사람 ────────────────────────────
                길을 찾을 때 사람은 북극성을 본다. XGEN이 그 자리에 있다는 뜻.
                별 → 빛줄기 → 실루엣이 하나의 세로 축 위에 놓이도록 GUIDE_X를 공유한다. */}

            {/* 빛줄기 — 별에서 무리 쪽으로 비스듬히 내려오는 옅은 빛.
                별을 축(transform-origin 상단)으로 기울여 둘을 잇는다. 사각 경계가
                남지 않도록 박스가 아니라 세로로 긴 타원 radial로 그린다. */}
            <div
                className="cosmic-guide absolute rounded-[50%]"
                style={{
                    left: `${POLARIS_X}%`,
                    top: `${POLARIS_Y}%`,
                    width: "300px",
                    height: `${HORIZON_Y_FROM_TOP - POLARIS_Y + 8}%`,
                    transformOrigin: "50% 0",
                    transform: `translateX(-50%) rotate(-${GUIDE_TILT}deg)`,
                    filter: "blur(46px)",
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(125,211,252,0.17) 0%, rgba(125,211,252,0.06) 40%, transparent 74%)",
                }}
            />

            {/* 북극성 — 화면에서 가장 밝은 점.
                헤일로·광선·코어를 각각 다른 주기로 움직여 "반짝임"을 만든다. */}
            <div
                className="absolute"
                style={{ left: `${POLARIS_X}%`, top: `${POLARIS_Y}%` }}
            >
                {/* 헤일로 — 느리게 부풀었다 줄어든다 */}
                <div
                    className="cosmic-polaris-halo absolute left-0 top-0 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(191,219,254,0.32) 0%, rgba(125,211,252,0.11) 32%, transparent 68%)",
                    }}
                />
                <div
                    className="absolute left-0 top-0 h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(186,230,253,0.36) 36%, transparent 70%)",
                    }}
                />
                {/* 광선 — 아주 느리게 회전하는 축 위에서 길이가 숨 쉰다.
                    양끝이 투명한 그라데이션이라 잘린 선처럼 보이지 않는다. */}
                <div className="cosmic-polaris-spin absolute left-0 top-0">
                    <div className="cosmic-polaris-flare absolute left-0 top-0">
                        {[
                            { w: 168, h: 1.6, rot: 0, a: 0.8 },
                            { w: 122, h: 1.6, rot: 90, a: 0.72 },
                            { w: 74, h: 1.2, rot: 45, a: 0.4 },
                            { w: 74, h: 1.2, rot: -45, a: 0.4 },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="absolute left-0 top-0"
                                style={{
                                    width: `${s.w}px`,
                                    height: `${s.h}px`,
                                    transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
                                    background: `linear-gradient(90deg, transparent, rgba(219,234,254,${s.a}) 50%, transparent)`,
                                }}
                            />
                        ))}
                    </div>
                </div>
                {/* 코어 — 가장 빠르고 미세하게 흔들린다 */}
                <div
                    className="cosmic-polaris-core absolute left-0 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    style={{ boxShadow: "0 0 12px 3px rgba(191,219,254,0.95)" }}
                />
            </div>

            {/* ── 하단 안정감 ──────────────────────────────────────────────
                그리는 순서가 곧 광학 관계다: 지평 아래 광(빛의 근원) → 지평 실루엣
                (가림) → 바닥 그리드 → 사람 실루엣 → 하단 암부. 광원 박스의 바닥을
                모두 지평선에 맞춰 "위로만" 번지게 해야 박스 아랫변이 직선으로
                잘려 사각형 자국이 남지 않는다. */}

            {/* 수평선 광 — 박스 바닥 = 지평선. 위로만 번지고 아래는 실루엣이 덮는다 */}
            <div
                className="absolute inset-x-0 h-[300px]"
                style={{
                    bottom: `${HORIZON_Y}%`,
                    background:
                        "radial-gradient(ellipse 62% 100% at 50% 100%, rgba(47,123,255,0.40) 0%, rgba(47,123,255,0.10) 46%, transparent 74%)",
                }}
            />
            <div
                className="absolute inset-x-0 h-[170px]"
                style={{
                    bottom: `${HORIZON_Y}%`,
                    background:
                        "radial-gradient(ellipse 36% 100% at 50% 100%, rgba(125,211,252,0.44) 0%, transparent 68%)",
                }}
            />
            <div
                className="absolute inset-x-0 h-[90px]"
                style={{
                    bottom: `${HORIZON_Y}%`,
                    background:
                        "radial-gradient(ellipse 22% 100% at 50% 100%, rgba(186,230,253,0.38) 0%, transparent 70%)",
                }}
            />

            {/* 지평 실루엣 — 화면 밖으로 나가는 완만한 호. 아래를 눌러 앉힌다.
                위 광선을 가려 "빛이 지평 뒤에서 올라오는" 관계를 만든다. */}
            <div
                className="absolute left-1/2 h-[54%] w-[190%] -translate-x-1/2 rounded-[50%]"
                style={{
                    // 호의 꼭대기(= 지평선)가 정확히 HORIZON_Y에 오도록: bottom + height
                    bottom: `${HORIZON_Y - 54}%`,
                    background:
                        "linear-gradient(180deg, #070c20 0%, #03060f 55%, #01030a 100%)",
                    boxShadow:
                        // 림라이트: 능선을 따라 도는 밝은 실선 + 위로 번지는 광
                        "0 -1px 0 0 rgba(186,230,253,0.85), 0 -2px 5px 0 rgba(125,211,252,0.55), 0 -26px 70px -6px rgba(47,123,255,0.55)",
                }}
            />

            {/* 바닥 그리드 — 실루엣 "위"에 얹어 지면 위 격자로 읽히게 한다.
                원근으로 눕혀 능선 쪽에서 소실되고, 가장자리는 마스크로 접는다. */}
            <div
                className="absolute inset-x-0 bottom-0 opacity-[0.26]"
                style={{
                    height: `${HORIZON_Y}%`,
                    perspective: "150px",
                    perspectiveOrigin: "50% 0%",
                    maskImage:
                        "radial-gradient(ellipse 60% 130% at 50% 100%, black 22%, transparent 78%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 60% 130% at 50% 100%, black 22%, transparent 78%)",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        transform: "rotateX(78deg)",
                        transformOrigin: "50% 0%",
                        backgroundImage:
                            "linear-gradient(rgba(125,211,252,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.4) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />
            </div>


            {/* 사람들 — 지평선에 서서 같은 북극성을 올려다본다. 지평 실루엣·바닥
                그리드 "뒤"에 그리면 능선에 가려지므로 반드시 그 다음에 온다. */}
            {FIGURES.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={i}
                    src={`/silhouettes/${f.file}.png`}
                    alt=""
                    className="absolute"
                    style={{
                        left: `${f.x}%`,
                        // PNG는 발끝까지 트림돼 있어 아래 끝이 곧 발바닥이다
                        bottom: `${ridgeY(f.x).toFixed(2)}%`,
                        height: `${f.h}px`,
                        width: `${Math.round(f.h * f.ratio)}px`,
                        opacity: f.opacity,
                        transform: `translateX(-50%)${f.flip ? " scaleX(-1)" : ""}`,
                    }}
                />
            ))}

            {/* 하단 암부 — 맨 아래만 눌러 무게를 준다 */}
            <div
                className="absolute inset-x-0 bottom-0 h-[7%]"
                style={{
                    background:
                        "linear-gradient(180deg, transparent, rgba(1,3,10,0.5) 60%, rgba(1,3,10,0.85) 100%)",
                }}
            />

            {/* 비네트 — 가장자리를 눌러 시선을 가운데로 모은다.
                중심을 위로 올려 하단 지평 광은 건드리지 않는다. */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 82% 62% at 50% 36%, transparent 45%, rgba(2,4,14,0.5) 100%)",
                }}
            />
        </div>
    );
}
