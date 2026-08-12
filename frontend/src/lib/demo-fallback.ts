import type { DemoManifest } from "@plateerlab/xgen-gallery";
import type { Locale } from "@/lib/i18n";
import type { Tool, ToolCategory } from "@/lib/tools";

/**
 * 큐레이션 매니페스트가 아직 없는 라이브러리를 위한 자동 생성 데모.
 *
 * 주간 자동 점검이 새 라이브러리를 TOOLS 에 추가하면 /tool/<id> 라우트는 곧바로
 * 생기지만, 예전에는 매니페스트가 없어 "데모 준비중" 안내만 뜨고 카드의 데모 버튼도
 * 켜지지 않았다. 사람이 매니페스트를 손으로 넣기 전까지 비어 있던 구간이다.
 *
 * 그 구간을 없애기 위해 카테고리별 표준 입출력 형태를 tool 메타데이터로 채워
 * 즉시 동작하는 데모를 만든다. 다만 이것은 '이 라이브러리가 실제로 이런 값을
 * 돌려준다'는 주장이 아니다 — 샘플 라벨과 출력 note 로 표준 형태임을 분명히 밝히고,
 * 카드의 "라이브 데모" 배지는 큐레이션 매니페스트가 있을 때만 붙인다
 * (lib/demo-manifests.ts 의 hasCuratedDemo 참고).
 *
 * 큐레이션 매니페스트가 들어오면 이 폴백은 자동으로 밀려난다.
 */

type Copy = {
    /** 데모 설명 = 라이브러리 설명을 그대로 쓴다(이미 영문 원문). */
    sampleLabel: string;
    sampleDescription: string;
    note: (name: string) => string;
    input: string;
    inputPlaceholder: (tagline: string) => string;
    result: string;
    detail: string;
    summary: (name: string, install: string) => string;
};

const COPY: Record<Locale, Copy> = {
    ko: {
        sampleLabel: "표준 응답 형태",
        sampleDescription:
            "이 라이브러리 전용 예시는 아직 준비 중입니다 — 같은 분류 라이브러리의 표준 입출력 형태를 보여줍니다",
        note: (name) =>
            `${name} 전용 큐레이션 예시가 준비되기 전까지 표준 형태를 표시합니다. 실제 응답 값이 아닙니다.`,
        input: "입력",
        inputPlaceholder: (tagline) => `예: ${tagline}`,
        result: "결과",
        detail: "처리 상세",
        summary: (name, install) =>
            `${name} 는 pip 로 바로 설치해 쓸 수 있습니다 — \`${install}\`. 실제 동작은 저장소의 README 예제를 따라가면 가장 빠릅니다.`,
    },
    en: {
        sampleLabel: "Standard response shape",
        sampleDescription:
            "A curated example for this library is still on the way — this shows the standard input and output shape for its category",
        note: (name) =>
            `Showing the standard shape until a curated example for ${name} is ready. These are not real response values.`,
        input: "Input",
        inputPlaceholder: (tagline) => `e.g. ${tagline}`,
        result: "Result",
        detail: "Processing detail",
        summary: (name, install) =>
            `${name} installs straight from pip — \`${install}\`. The quickest way to see it work for real is the README example in its repository.`,
    },
};

/** 카테고리별 '처리 상세' 본문 — 그 분류의 라이브러리가 통상 돌려주는 항목들. */
const DETAIL: Record<ToolCategory, (t: Tool, locale: Locale) => unknown> = {
    ingestion: (t, locale) => ({
        pipeline: ["parse", "normalize", "chunk"],
        detected_format: locale === "ko" ? "입력에서 자동 판별" : "auto-detected from input",
        chunks: 3,
        preserved: ["heading", "table", "code-block"],
        library: t.name,
    }),
    knowledge: (t, locale) => ({
        retrieval: ["semantic", "keyword"],
        top_k: 3,
        scores: [0.82, 0.64, 0.51],
        ranking: locale === "ko" ? "점수 내림차순" : "descending by score",
        library: t.name,
    }),
    agent: (t, locale) => ({
        steps: [
            { step: 1, action: "plan" },
            { step: 2, action: "act" },
            { step: 3, action: "verify" },
        ],
        retries: 0,
        observable: locale === "ko" ? "모든 단계가 로그로 남는다" : "every step is logged",
        library: t.name,
    }),
    utility: (t, locale) => ({
        applied: 1,
        deterministic: true,
        side_effects: locale === "ko" ? "없음" : "none",
        library: t.name,
    }),
};

/**
 * Tool 메타데이터만으로 동작하는 데모 매니페스트를 만든다.
 * 백엔드가 없으므로 apiEndpoint 는 두지 않는다 — 샘플 출력이 그대로 결과가 된다.
 */
export function buildFallbackManifest(tool: Tool, locale: Locale): DemoManifest {
    const t = COPY[locale];
    return {
        projectName: tool.repo,
        title: `${tool.name} Demo`,
        description: tool.description,
        icon: "📦",
        inputs: [
            {
                key: "input",
                type: "textarea",
                label: t.input,
                placeholder: t.inputPlaceholder(tool.tagline),
                required: true,
            },
        ],
        outputs: [
            { key: "summary", type: "text", label: t.result },
            { key: "detail", type: "json", label: t.detail },
        ],
        samples: [
            {
                label: t.sampleLabel,
                description: t.sampleDescription,
                inputs: { input: tool.tagline },
                mockOutput: {
                    summary: t.summary(tool.name, tool.install),
                    detail: {
                        note: t.note(tool.name),
                        ...(DETAIL[tool.category](tool, locale) as Record<string, unknown>),
                    },
                },
            },
        ],
    };
}
