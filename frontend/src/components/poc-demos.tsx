"use client";

import { useState } from "react";
import { PlayCircle, Clapperboard, CalendarDays } from "lucide-react";

/**
 * 실증 데모(Proof in Action) — XGEN 기능이 실제로 동작하는 모습을 영상으로 보여준다.
 * 성능을 주장하는 대신 증명한다는 연구소 톤의 연장. 독립 페이지(/proof-in-action)의
 * 본문으로 사용된다(페이지 히어로가 제목·소개를 담당하므로 여기선 그리드만 렌더).
 *
 * ▶ 영상 추가/교체는 아래 DEMOS의 `id`(유튜브 11자리 videoId)만 채우면 된다.
 *   `uploadDate`(YYYY-MM-DD)는 있으면 VideoObject JSON-LD에 포함(GEO·SEO), 없으면 생략.
 * ▶ 임베드는 youtube-nocookie + 썸네일 파사드(클릭 시 로드)로, 페이지 진입만으로
 *   유튜브 스크립트가 로드되지 않게 한다.
 */
export type Chapter = {
    time: string; // 표시용 타임스탬프 "MM:SS"
    sec: number; // 시작 초 — 클릭 시 해당 지점부터 재생
    label: string; // 챕터 제목
    desc?: string; // 챕터 설명(있으면 제목 아래 본문으로 노출)
};

export type Demo = {
    id: string; // 유튜브 videoId
    title: string;
    desc: string;
    uploadDate?: string; // YYYY-MM-DD
    featured?: boolean; // 대표 영상 — 키 비주얼(ProofHero)로 노출
    chapters?: Chapter[]; // 챕터(타임스탬프) — 클릭하면 해당 지점부터 재생
};

export const DEMOS: Demo[] = [
    {
        id: "4RiH3ThyIg0",
        // 제목·설명은 유튜브 원본과 동일하게 유지한다.
        title: "XGEN 플랫폼 실증 데모 — 문서 업로드부터 AI 에이전트·품질검증까지 (5분)",
        desc: "XGEN 온톨로지 엔진으로 정책문서 11종을 지식그래프로 만들고, 시맨틱 검색·전표 심사 에이전트·노코드 챗봇·LLM Judge 품질평가까지 한 번에 시연합니다. 코딩 없이 90초 만에 에이전트를 생성하고 조립합니다",
        uploadDate: "2026-07-13",
        featured: true,
        chapters: [
            {
                time: "00:00",
                sec: 0,
                label: "지식그래프 구축",
                desc: "AI 지식 저장소에 로그인한 뒤 x2bee_서비스정책 컬렉션을 생성하고 정책 문서 11종을 업로드합니다. 온톨로지를 자동 생성하여 지식그래프를 구축하고, 총 19,471개의 트리플과 209개의 클래스가 생성되는 과정을 확인합니다.",
            },
            {
                time: "01:01",
                sec: 61,
                label: "시맨틱 검색",
                desc: "자연어 질문을 입력하면 지식그래프를 기반으로 의미를 이해하여 검색을 수행합니다. 약 200개의 근거 트리플을 바탕으로 출처가 포함된 구조화된 답변을 생성합니다.",
            },
            {
                time: "01:17",
                sec: 77,
                label: "전표 심사 AI Agent",
                desc: "증빙 문서 컬렉션을 생성하고 색인한 뒤, 캔버스에서 전표 심사 AI Agent를 조립합니다. 이미지 형태의 증빙 문서를 OCR로 분석하여 필요한 정보를 자동 추출하고, 결재 공문번호 등 핵심 항목을 검증하는 과정을 시연합니다.",
            },
            {
                time: "02:47",
                sec: 167,
                label: "대화형 AI 챗봇",
                desc: "캔버스에서 노드를 조립해 지식그래프와 연결된 AI 챗봇을 생성합니다. 코딩 없이 약 90초 만에 챗봇을 구성하고, 정책 문서를 근거로 답변하는 과정을 확인할 수 있습니다.",
            },
            {
                time: "03:34",
                sec: 214,
                label: "AI 품질 평가 (LLM Judge)",
                desc: "테스트셋을 업로드한 후 여러 Agent를 일괄 실행하고, LLM Judge가 문항별로 자동 채점합니다. 92~100점의 평가 결과와 함께 AI 품질을 정량적으로 검증하는 과정을 소개합니다.",
            },
            {
                time: "04:07",
                sec: 247,
                label: "XGEN Pathfinder",
                desc: "레거시 시스템에 로그인한 후 브라우저 플러그인을 통해 API를 자동 수집합니다. 자연어 한 줄만 입력하면 적절한 도구를 자동 선택하고 실제 API를 호출하여 업무를 수행하는 과정을 시연합니다.",
            },
        ],
    },
    {
        // 제목은 유튜브 원본과 동일하게 유지한다.
        id: "BuGB7F89cTc",
        title: "XGEN Agent 작업실 전체 기능 시연 | 에이전트 제작부터 RAG·도구연동·품질평가·협업까지",
        desc: "XGEN Agent 작업실에서 에이전트 제작부터 RAG·도구 연동·품질 평가·협업까지 전체 기능을 실제 화면으로 시연합니다.",
    },
    {
        id: "4T7tT2nTXfw",
        title: "XGEN PathFinder BUILD",
        desc: "PathFinder는 기존 웹 시스템을 AI가 이해하고 사용할 수 있는 Agent Tool로 연결하는 브라우저 자동화 기술입니다.",
        uploadDate: "2026-07-03",
    },
    {
        id: "StxOW5PbC8w",
        title: "XGEN FloUI experience",
        desc: "FLOUI(Flow UI)는 사용자의 질문과 업무 흐름에 따라 화면이 스스로 구성되는 AI 기반 Adaptive UI 기술입니다.",
        uploadDate: "2026-07-02",
    },
];

/** 키 비주얼(ProofHero)에 쓰는 대표 영상. featured 플래그가 붙은 첫 항목. */
export const FEATURED_DEMO: Demo | null =
    DEMOS.find((d) => d.featured) ?? null;

export function YouTubeFacade({
    demo,
    loaded,
    start,
    onPlay,
    fill,
}: {
    demo: Demo;
    loaded: boolean;
    start: number;
    onPlay: (sec: number) => void;
    fill?: boolean; // true면 카드 높이를 채우도록 썸네일을 늘린다(우측 스택 정렬용)
}) {
    // fill 모드: aspect-video 대신 부모 높이를 채워 캡션 아래 여백을 없앤다.
    const mediaClass = fill
        ? "h-full min-h-[240px] w-full flex-1"
        : "aspect-video w-full";

    if (!demo.id) {
        return (
            <div
                className={`flex ${mediaClass} flex-col items-center justify-center gap-2 bg-[var(--color-surface-alt)] text-[var(--color-ink-subtle)]`}
            >
                <Clapperboard className="h-7 w-7" />
                <span className="text-[13px] font-semibold">영상 준비중</span>
            </div>
        );
    }

    if (loaded) {
        return (
            <iframe
                className={mediaClass}
                src={`https://www.youtube-nocookie.com/embed/${demo.id}?autoplay=1&rel=0${
                    start ? `&start=${start}` : ""
                }`}
                title={demo.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }

    return (
        <button
            type="button"
            onClick={() => onPlay(0)}
            aria-label={`${demo.title} 영상 재생`}
            className={`group relative flex ${mediaClass} items-center justify-center overflow-hidden bg-black`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`https://i.ytimg.com/vi/${demo.id}/${
                    demo.featured ? "maxresdefault" : "hqdefault"
                }.jpg`}
                alt={`${demo.title} 썸네일`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover brightness-[1.22] saturate-[1.05] transition group-hover:scale-[1.02]"
            />
            {/* 어두운 썸네일을 밝게 — CTA 배너 데모 카드와 동일한 보정 */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-white/5 to-white/15" />
            <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#070b1c] shadow-lg transition group-hover:scale-105">
                <PlayCircle className="h-9 w-9" />
            </span>
        </button>
    );
}

/** 챕터(타임스탬프) 목록 — 클릭하면 해당 지점부터 재생. 대표/일반 카드 공용.
 *  columns=true면 넓은 대표 카드에서 2단 그리드로 배치한다. */
function ChapterList({
    chapters,
    onSeek,
    columns,
}: {
    chapters: Chapter[];
    onSeek: (sec: number) => void;
    columns?: boolean;
}) {
    return (
        <ul
            className={`mt-5 border-t border-[var(--color-line)] pt-4${
                columns ? " grid gap-x-6 gap-y-1 md:grid-cols-2" : ""
            }`}
        >
            {chapters.map((c) => (
                <li key={c.time}>
                    <button
                        type="button"
                        onClick={() => onSeek(c.sec)}
                        className="group flex w-full flex-col gap-1.5 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-[var(--color-surface-alt)]"
                    >
                        <span className="flex items-baseline gap-2.5">
                            <span className="shrink-0 font-mono text-[13px] font-semibold tabular-nums text-[var(--color-accent)] group-hover:underline">
                                {c.time}
                            </span>
                            <span className="text-[14.5px] font-semibold leading-snug text-[var(--color-ink)]">
                                {c.label}
                            </span>
                        </span>
                        {c.desc && (
                            <span className="text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {c.desc}
                            </span>
                        )}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function DemoCard({ demo }: { demo: Demo }) {
    // 재생 상태를 카드 단위로 올려, 챕터 클릭 시 해당 지점부터 재생되게 한다.
    const [player, setPlayer] = useState({ loaded: false, start: 0 });
    const play = (sec: number) => setPlayer({ loaded: true, start: sec });

    return (
        <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
            <YouTubeFacade
                demo={demo}
                loaded={player.loaded}
                start={player.start}
                onPlay={play}
                fill
            />
            <figcaption className="p-5">
                <h2 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                    {demo.title}
                </h2>
                {demo.uploadDate && (
                    <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[var(--color-ink-subtle)]">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <time dateTime={demo.uploadDate}>
                            {demo.uploadDate.replaceAll("-", ".")} 업로드
                        </time>
                    </p>
                )}
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                    {demo.desc}
                </p>
                {demo.chapters && demo.chapters.length > 0 && (
                    <ChapterList chapters={demo.chapters} onSeek={play} />
                )}
            </figcaption>
        </figure>
    );
}

export function PocDemos() {
    const jsonLd = DEMOS.filter((d) => d.id).map((d) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: d.title,
        description: d.desc,
        // uploadDate는 있을 때만 포함(정확한 값이 없으면 생략 — 부정확한 날짜보다 안전)
        ...(d.uploadDate ? { uploadDate: d.uploadDate } : {}),
        thumbnailUrl: [`https://i.ytimg.com/vi/${d.id}/hqdefault.jpg`],
        embedUrl: `https://www.youtube-nocookie.com/embed/${d.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${d.id}`,
        publisher: { "@type": "Organization", name: "Plateer Labs" },
    }));

    // 대표 영상은 페이지 상단 키 비주얼(ProofHero)로 노출하므로, 여기선 나머지만.
    const rest = DEMOS.filter((d) => !d.featured);

    return (
        <div>
            {rest.length > 0 && (
                <>
                    <div className="mb-8">
                        <p className="font-mono text-[13px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            / More demos
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                            더 많은 실증 영상
                        </h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {rest.map((d) => (
                            <DemoCard key={d.title} demo={d} />
                        ))}
                    </div>
                </>
            )}

            {jsonLd.length > 0 && (
                <script
                    type="application/ld+json"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
        </div>
    );
}
