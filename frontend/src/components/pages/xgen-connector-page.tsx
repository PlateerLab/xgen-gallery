import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ShieldAlert, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * XGEN Connector 설치·활용 가이드.
 *
 * 블로그 글(/blog/xgen-connector-preview)에서 분리한 페이지다 — 설치 화면 일곱 장과
 * 여섯 단계를 본문에 그대로 담으면 글이 읽히지 않는다. 글은 "왜 필요한가"를,
 * 이 페이지는 "어떻게 쓰는가"를 맡는다.
 *
 * 설치 화면은 Windows 기준이다. 화면이 바뀌면 public/connector 의 이미지를 교체한다.
 */

const REPO = "https://github.com/PlateerLab/xgen-connector";

interface Shot {
    src: string;
    alt: string;
    caption: string;
}

interface Step {
    n: string;
    title: string;
    body: string[];
    shots?: Shot[];
    /** 주의를 요하는 화면 — 배경을 달리해 눈에 띄게 둔다 */
    warn?: string;
}

interface Copy {
    eyebrow: string;
    title: string;
    lead: string;
    backToPost: string;
    downloadTitle: string;
    downloadDesc: string;
    downloadCta: string;
    stepsTitle: string;
    steps: Step[];
    tipsTitle: string;
    tips: { q: string; a: string }[];
    nextTitle: string;
    nextDesc: string;
    nextCta: string;
}

const COPY: Record<Locale, Copy> = {
    ko: {
        eyebrow: "Guide · XGEN Connector",
        title: "XGEN Connector 설치·활용 가이드",
        lead: "XGEN에서 만든 Agent를 내 PC 업무환경에 연결하는 과정을 화면과 함께 안내합니다. 설치부터 첫 업무 지시까지 여섯 단계입니다.",
        backToPost: "Connector가 왜 필요한지 먼저 읽기",
        downloadTitle: "내려받기",
        downloadDesc:
            "설치 파일은 GitHub 저장소에서 받습니다. Windows 설치 파일 기준으로 안내하며, 용량은 약 280MB입니다.",
        downloadCta: "PlateerLab/xgen-connector",
        stepsTitle: "설치와 첫 실행",
        steps: [
            {
                n: "1",
                title: "설치 파일 실행",
                body: [
                    "내려받은 XGEN-Connector-Setup 파일을 실행합니다. 파일명 끝의 숫자가 버전입니다.",
                ],
                shots: [
                    {
                        src: "/connector/01-download.webp",
                        alt: "탐색기에서 XGEN-Connector-Setup 실행 파일을 선택한 화면",
                        caption: "내려받은 설치 파일",
                    },
                ],
            },
            {
                n: "2",
                title: "SmartScreen 경고 통과",
                body: [
                    "Windows Defender SmartScreen이 「인식할 수 없는 앱」이라며 실행을 막습니다. 코드 서명 인증서가 아직 등록되지 않아 나타나는 화면으로, 설치 파일 자체의 문제는 아닙니다.",
                    "「추가 정보」를 누르면 게시자와 파일명이 표시되고 「실행」 버튼이 나타납니다. 파일명이 내려받은 것과 같은지 확인한 뒤 진행합니다.",
                ],
                warn: "사내 배포 시에는 이 화면 때문에 문의가 들어옵니다. 배포 안내에 이 단계를 미리 적어두는 편이 좋습니다.",
                shots: [
                    {
                        src: "/connector/02-smartscreen.webp",
                        alt: "SmartScreen 이 인식할 수 없는 앱의 시작을 차단했다는 파란 대화상자",
                        caption: "처음 뜨는 차단 화면",
                    },
                    {
                        src: "/connector/03-smartscreen-more.webp",
                        alt: "추가 정보를 눌러 앱 이름과 게시자가 표시되고 실행 버튼이 나타난 화면",
                        caption: "「추가 정보」를 누르면 실행 버튼이 나온다",
                    },
                ],
            },
            {
                n: "3",
                title: "설치 범위 선택",
                body: [
                    "모든 사용자와 현재 사용자 중에서 고릅니다. 개인 PC라면 현재 사용자로 두면 됩니다. 관리자 권한이 필요 없어 사내 배포에서도 이 방식이 무난합니다.",
                ],
                shots: [
                    {
                        src: "/connector/04-scope.webp",
                        alt: "모든 사용자와 현재 사용자 전용 중에서 설치 범위를 고르는 화면",
                        caption: "설치 옵션 선택",
                    },
                ],
            },
            {
                n: "4",
                title: "설치 위치 확인",
                body: [
                    "프로그램이 설치될 폴더입니다. 기본값은 사용자 계정 아래의 AppData 경로이며, 약 970MB의 여유 공간이 필요합니다.",
                ],
                shots: [
                    {
                        src: "/connector/05-path.webp",
                        alt: "설치 폴더 경로와 필요한 디스크 공간이 표시된 화면",
                        caption: "설치 위치 선택",
                    },
                ],
            },
            {
                n: "5",
                title: "데이터 폴더와 실행 구성요소",
                body: [
                    "여기가 이 설치에서 가장 중요한 화면입니다. 지정한 폴더 아래에 Agent의 작업 폴더와 로컬 실행 구성요소가 만들어집니다.",
                    "workspace는 작업 동기화, cloud는 스토리지, local-runtime은 Agent가 이 PC에서 실행될 때 쓰는 런타임과 CLI입니다.",
                    "체크 항목 세 가지는 첫 실행 시 자동으로 설치되며, 나중에 「설정 → 일반」에서 바꿀 수 있습니다.",
                ],
                shots: [
                    {
                        src: "/connector/06-data-folder.webp",
                        alt: "데이터 폴더 경로와 에이전트 로컬 실행 런타임, Codex CLI, Claude Code CLI 체크박스가 있는 화면",
                        caption: "데이터 폴더와 로컬 실행 구성요소",
                    },
                ],
            },
            {
                n: "6",
                title: "설치 완료",
                body: [
                    "로컬 런타임과 파이썬 패키지가 복사되면서 시간이 걸립니다. 완료되면 Connector를 실행해 XGEN에 로그인합니다.",
                ],
                shots: [
                    {
                        src: "/connector/07-installing.webp",
                        alt: "로컬 런타임의 파이썬 패키지를 복사하며 진행 중인 설치 화면",
                        caption: "설치 진행",
                    },
                ],
            },
        ],
        tipsTitle: "설치 후 첫 업무까지",
        tips: [
            {
                q: "XGEN에 연결하기",
                a: "Connector에서 기업의 XGEN 환경에 로그인합니다. 로그인하면 내가 만들었거나 공유받은 Agent를 Connector에서 불러올 수 있습니다.",
            },
            {
                q: "Agent 고르기",
                a: "수행하려는 업무에 맞는 Agent를 고릅니다. 업무마다 쓰는 데이터와 도구, 권한이 달라 하나의 범용 AI에 모두 맡기지 않습니다.",
            },
            {
                q: "실행 권한 연결하기",
                a: "Agent가 PC에서 작업하려면 실행 환경을 연결해야 합니다. Local File / Storage, Browser, PowerShell, MCP, Skill, Application 중 업무에 필요한 것만 엽니다.",
            },
            {
                q: "자연어로 지시하기",
                a: "복잡한 명령어 대신 직원에게 업무를 맡기듯 요청합니다. 예를 들어 「이 Excel 파일의 데이터를 분석해서 결과를 새로운 파일로 만들어줘」처럼 결과물 단위로 말합니다.",
            },
            {
                q: "이어서 작업하기",
                a: "Agent가 만든 결과물은 다음 업무의 시작점이 됩니다. 「방금 만든 결과를 경영진이 보기 쉽게 요약해줘」처럼 맥락을 이어갈 수 있습니다.",
            },
        ],
        nextTitle: "도입을 검토하고 계신가요",
        nextDesc:
            "업무 환경과 보안 정책에 맞는 Agent 구성과 실행 범위를 함께 설계해 드립니다.",
        nextCta: "도입·PoC 상담",
    },
    en: {
        eyebrow: "Guide · XGEN Connector",
        title: "Installing and using XGEN Connector",
        lead: "A walkthrough, with screens, of connecting an agent built in XGEN to your own desktop. Six steps from install to the first request.",
        backToPost: "Read why Connector exists first",
        downloadTitle: "Download",
        downloadDesc:
            "The installer is on GitHub. These steps follow the Windows installer, which is roughly 280MB.",
        downloadCta: "PlateerLab/xgen-connector",
        stepsTitle: "Install and first run",
        steps: [
            {
                n: "1",
                title: "Run the installer",
                body: [
                    "Run the XGEN-Connector-Setup file you downloaded. The number at the end of the filename is the version.",
                ],
                shots: [
                    {
                        src: "/connector/01-download.webp",
                        alt: "File Explorer with the XGEN-Connector-Setup executable selected",
                        caption: "The downloaded installer",
                    },
                ],
            },
            {
                n: "2",
                title: "Get past the SmartScreen warning",
                body: [
                    "Windows Defender SmartScreen blocks the app as unrecognized. This appears because a code-signing certificate is not yet registered — it is not a problem with the installer itself.",
                    "Click More info to reveal the publisher and filename along with a Run button. Check that the filename matches what you downloaded, then continue.",
                ],
                warn: "Expect support questions about this screen during internal rollout. Mention it in the rollout notice up front.",
                shots: [
                    {
                        src: "/connector/02-smartscreen.webp",
                        alt: "The blue SmartScreen dialog saying it prevented an unrecognized app from starting",
                        caption: "The first block screen",
                    },
                    {
                        src: "/connector/03-smartscreen-more.webp",
                        alt: "After clicking More info, the app name and publisher appear with a Run button",
                        caption: "More info reveals the Run button",
                    },
                ],
            },
            {
                n: "3",
                title: "Choose the install scope",
                body: [
                    "Pick all users or the current user only. On a personal machine the current user is fine, and it needs no admin rights, which also makes it the easier option for internal rollout.",
                ],
                shots: [
                    {
                        src: "/connector/04-scope.webp",
                        alt: "The dialog for choosing between all users and the current user",
                        caption: "Install scope",
                    },
                ],
            },
            {
                n: "4",
                title: "Confirm the install location",
                body: [
                    "This is where the program itself goes. The default is under your user account's AppData path, and it needs about 970MB free.",
                ],
                shots: [
                    {
                        src: "/connector/05-path.webp",
                        alt: "The install folder path and required disk space",
                        caption: "Install location",
                    },
                ],
            },
            {
                n: "5",
                title: "Data folder and runtime components",
                body: [
                    "This is the screen that matters most. Under the folder you choose, the agent's working folders and the local execution components are created.",
                    "workspace holds synced work, cloud is storage, and local-runtime is the runtime and CLI the agent uses when it runs on this machine.",
                    "The three checked components install on first run and can be changed later under Settings → General.",
                ],
                shots: [
                    {
                        src: "/connector/06-data-folder.webp",
                        alt: "The data folder path with checkboxes for the agent local runtime, Codex CLI, and Claude Code CLI",
                        caption: "Data folder and runtime components",
                    },
                ],
            },
            {
                n: "6",
                title: "Finish",
                body: [
                    "Copying the local runtime and its Python packages takes a while. When it finishes, launch Connector and sign in to XGEN.",
                ],
                shots: [
                    {
                        src: "/connector/07-installing.webp",
                        alt: "Installation in progress, copying Python packages into the local runtime",
                        caption: "Installation in progress",
                    },
                ],
            },
        ],
        tipsTitle: "From install to first task",
        tips: [
            {
                q: "Connect to XGEN",
                a: "Sign in to your organization's XGEN environment from Connector. Once signed in, the agents you built or were given access to appear in Connector.",
            },
            {
                q: "Pick an agent",
                a: "Choose the agent that fits the task. Different work uses different data, tools, and permissions, so nothing is handed to a single general-purpose AI.",
            },
            {
                q: "Connect execution permissions",
                a: "For the agent to work on your machine it needs an execution environment. Open only what the task needs from Local File / Storage, Browser, PowerShell, MCP, Skill, and Application.",
            },
            {
                q: "Ask in plain language",
                a: "Instead of commands, ask the way you would ask a colleague — for example, \"analyze the data in this Excel file and produce the result as a new file.\"",
            },
            {
                q: "Keep going from the result",
                a: "What the agent produces becomes the start of the next task: \"summarize what you just made for an executive audience.\"",
            },
        ],
        nextTitle: "Evaluating this for your team?",
        nextDesc:
            "We will design the agent setup and execution scope around your work environment and security policy.",
        nextCta: "Talk to us",
    },
};

export function XgenConnectorPageContent({ locale }: { locale: Locale }) {
    /*
     * 운영에서는 가린다 — 블로그 글의 draft 와 같은 규칙이다. 로컬 개발 서버에서는
     * 그대로 열려 검토할 수 있고, 배포본에서는 주소를 알아도 404 다.
     * 공개할 때 이 블록과 md 의 draft, sitemap 항목을 함께 되돌린다.
     */
    if (process.env.NODE_ENV === "production") notFound();

    const t = COPY[locale];
    const href = (path: string) => localeHref(locale, path);

    return (
        <>
            <SiteNav />
            <JsonLd
                data={[
                    breadcrumbLd([
                        { name: "Home", path: locale === "en" ? "/en" : "/" },
                        {
                            name: "XGEN Connector",
                            path:
                                locale === "en"
                                    ? "/en/xgen-connector"
                                    : "/xgen-connector",
                        },
                    ]),
                ]}
            />

            <main>
                {/* 머리말 */}
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-20">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            {t.eyebrow}
                        </p>
                        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[42px]">
                            {t.title}
                        </h1>
                        <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.lead}
                        </p>
                        <Link
                            href={href("/blog/xgen-connector-preview")}
                            className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:gap-2.5"
                        >
                            {t.backToPost}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* 내려받기 */}
                <section className="border-b border-[var(--color-line)]">
                    <div className="mx-auto max-w-4xl px-6 py-12">
                        <div className="flex flex-col gap-5 rounded-2xl border border-[var(--color-line)] bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="flex items-center gap-2 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                    <Download className="h-5 w-5 text-[#2f7bff]" />
                                    {t.downloadTitle}
                                </h2>
                                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.downloadDesc}
                                </p>
                            </div>
                            <a
                                href={REPO}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-none items-center gap-1.5 rounded-full bg-[#2f7bff] px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-[#2461d8]"
                            >
                                {t.downloadCta}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 설치 단계 */}
                <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.stepsTitle}
                        </h2>

                        <ol className="mt-10 space-y-12">
                            {t.steps.map((s) => (
                                <li key={s.n} className="flex gap-5">
                                    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#2f7bff] font-mono text-[15px] font-bold text-white">
                                        {s.n}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {s.title}
                                        </h3>
                                        {s.body.map((p) => (
                                            <p
                                                key={p}
                                                className="mt-3 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                            >
                                                {p}
                                            </p>
                                        ))}

                                        {s.warn && (
                                            <p className="mt-4 flex gap-2.5 rounded-xl border border-[#f0d9a8] bg-[#fdf8ec] p-4 text-[14.5px] leading-relaxed text-[#7a5c1e]">
                                                <ShieldAlert className="h-5 w-5 flex-none text-[#c98a12]" />
                                                {s.warn}
                                            </p>
                                        )}

                                        {s.shots && (
                                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                                {s.shots.map((sh) => (
                                                    <figure key={sh.src}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={sh.src}
                                                            alt={sh.alt}
                                                            loading="lazy"
                                                            className="w-full rounded-xl border border-[var(--color-line)] bg-white"
                                                        />
                                                        <figcaption className="mt-2 text-[13px] text-[var(--color-ink-subtle)]">
                                                            {sh.caption}
                                                        </figcaption>
                                                    </figure>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* 설치 후 */}
                <section className="border-b border-[var(--color-line)]">
                    <div className="mx-auto max-w-4xl px-6 py-20">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.tipsTitle}
                        </h2>
                        <dl className="mt-8 divide-y divide-[var(--color-line)]">
                            {t.tips.map((tip) => (
                                <div
                                    key={tip.q}
                                    className="flex flex-col gap-2 py-5 md:flex-row md:gap-8"
                                >
                                    <dt className="w-56 flex-none text-[16px] font-bold text-[var(--color-ink)]">
                                        {tip.q}
                                    </dt>
                                    <dd className="text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {tip.a}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl">
                            {t.nextTitle}
                        </h2>
                        <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.nextDesc}
                        </p>
                        <Link
                            href={href("/contact")}
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2f7bff] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#2461d8]"
                        >
                            {t.nextCta}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
