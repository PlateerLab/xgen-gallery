/**
 * LLM 로고 마퀴 — 메인 히어로(동영상) 바로 아래에 두는 로고 슬라이드 스트립.
 * XGEN이 특정 모델·벤더에 종속되지 않음(Model-Agnostic)을 로고로 보여준다.
 * 끊김 없는 루프를 위해 목록 2회 렌더, 전역 `.marquee-track` 애니메이션 재사용.
 *
 * 라이트 섹션이라 컬러 로고를 기본 그레이스케일로 통일하고 hover 시 원색으로(logo cloud).
 * section에 overflow-hidden을 주어 w-max 트랙이 가로 스크롤을 만들지 않게 한다.
 * 로고는 self-host한 공식 브랜드 SVG(/public/models/*). 교체 시 파일만 바꾸면 된다.
 */
const LOGOS: { name: string; src: string }[] = [
    { name: "OpenAI", src: "/models/openai.svg" },
    { name: "Claude", src: "/models/anthropic.svg" },
    { name: "Gemini", src: "/models/googlegemini.svg" },
    { name: "Llama", src: "/models/meta.svg" },
    { name: "Mistral", src: "/models/mistralai.svg" },
    { name: "DeepSeek", src: "/models/deepseek.svg" },
    { name: "Qwen", src: "/models/qwen.svg" },
    { name: "Hugging Face", src: "/models/huggingface.svg" },
    { name: "Ollama", src: "/models/ollama.svg" },
];

export function LLMMarquee() {
    return (
        <section className="overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="mx-auto max-w-6xl px-6 py-9">
                <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
                    <div className="marquee-track flex w-max items-center gap-12 pr-12 md:gap-16 md:pr-16">
                        {[...LOGOS, ...LOGOS].map((l, i) => (
                            <span
                                key={i}
                                className="flex shrink-0 items-center gap-2.5 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={l.src}
                                    alt={l.name}
                                    loading="lazy"
                                    className="h-7 w-auto md:h-8"
                                />
                                <span className="text-[19px] font-semibold tracking-tight text-[var(--color-ink-muted)] md:text-[21px]">
                                    {l.name}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
