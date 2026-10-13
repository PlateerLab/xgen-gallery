"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "@/components/brand-mark";
import { HACKATHON_THEME, HACKATHON_CRITERIA, HACKATHON_JUDGING_STAGES, HACKATHON_ACCESS, HACKATHON_PREPARATION } from "@/lib/hackathon";
import { EVENT_STATUS_META, getEventDateLabel, type LabEvent, type EventStatus } from "@/lib/events";
import styles from "./hackathon-page.module.css";

type Track = "all" | "work" | "next";

// Event proposal content; these examples are not submitted projects.
const CHALLENGES: {
    id: string; track: Exclude<Track, "all">; area: string; title: string;
    problem: string; outcome: string; evidence: string;
}[] = [
    {
        id: "01", track: "work", area: "기획 · 프로젝트 관리", title: "주간 보고, 모으는 시간부터 줄이기",
        problem: "팀별 진행 현황과 회의 메모를 매번 모으고 정리하는 일이 반복된다.",
        outcome: "샘플 업무 기록을 읽어 진행 현황·막힌 일·다음 할 일을 보여주는 보고 앱.",
        evidence: "같은 자료로 수작업과 앱의 소요 시간, 누락 항목을 비교한다.",
    },
    {
        id: "02", track: "work", area: "영업 · 제안", title: "제안요청서의 빈틈을 찾는 앱",
        problem: "긴 제안요청서에서 필수 요건을 놓치거나 제안서와 대조하는 데 시간이 든다.",
        outcome: "샘플 RFP와 제안서를 비교해 요건별 충족 여부와 근거 페이지를 표시하는 앱.",
        evidence: "처음 보지 않은 문서에서도 누락 요건을 찾고 근거를 확인할 수 있는지 본다.",
    },
    {
        id: "03", track: "work", area: "경영지원 · 운영", title: "두 엑셀 사이, 다른 숫자를 찾기",
        problem: "서로 다른 정산·집계 파일을 대조하고 차이의 원인을 찾는 일이 번거롭다.",
        outcome: "샘플 파일 두 개를 넣으면 차이 목록과 확인할 항목을 내려받는 대조 앱.",
        evidence: "합계와 차이를 직접 계산한 결과에 맞춰 확인하고 반복 작업 시간을 비교한다.",
    },
    {
        id: "04", track: "work", area: "개발 · 품질", title: "릴리스 전에 빠진 검증 찾기",
        problem: "요구사항·변경 내역·테스트 결과가 흩어져 있어 검증 누락을 찾기 어렵다.",
        outcome: "샘플 요구사항과 테스트 기록을 연결해 미검증 항목을 보여주는 릴리스 점검 앱.",
        evidence: "별도의 변경 사례를 넣어 누락 탐지와 연결된 근거의 정확성을 확인한다.",
    },
    {
        id: "05", track: "next", area: "커머스 · 서비스 기획", title: "상품을 올리기 전, 한 번 더 확인",
        problem: "상품 정보의 누락·충돌을 발견하려면 여러 항목을 하나씩 검토해야 한다.",
        outcome: "샘플 상품 목록을 점검하고 수정 제안과 미리보기를 보여주는 판매자용 앱.",
        evidence: "판매자 역할의 동료가 직접 써보고 문제 발견과 수정 흐름이 도움이 되는지 확인한다.",
    },
    {
        id: "06", track: "next", area: "고객 경험 · 운영", title: "문의에서 서비스 개선점을 찾기",
        problem: "반복되는 문의가 쌓여도 어떤 문제부터 해결할지 판단하기 어렵다.",
        outcome: "가상 문의를 유형별로 묶고 근거와 함께 개선 후보를 보여주는 서비스 운영 앱.",
        evidence: "새 문의를 넣어 분류의 일관성을 확인하고 운영자 역할의 동료에게 피드백을 받는다.",
    },
];

const STEPS = [
    { n: "01", label: "Discover", title: "플래티어에 필요한 변화 찾기", text: "누구의 어떤 문제를 해결하고, 플래티어에 어떤 변화를 만들지 한 문장으로 정리합니다. 업무를 아는 동료와 함께 시작하세요." },
    { n: "02", label: "Onboard", title: "XGEN · DexOn 익히기", text: "행사 XGEN 계정·접속 주소·프로젝트 권한을 확인하고 DexOn을 설치해 연결합니다. 샘플 자료로 작은 앱 하나를 만들어보는 온보딩을 제안합니다." },
    { n: "03", label: "Build", title: "작동하는 앱 만들기", text: "대화로 만들고, 직접 실행하고, 다시 고칩니다. 핵심 사용자 흐름 하나를 완성하는 Build Day를 제안합니다." },
    { n: "04", label: "Share", title: "동료 앞에서 시연하기", text: "앱을 직접 열어 문제·동작·변화를 보여줍니다. 행사 후에는 현업 사용 팀과 짧은 파일럿을 이어갑니다." },
];

const TOTAL_SCORE = HACKATHON_CRITERIA.reduce((total, item) => total + item.score, 0);

const FAQ = [
    { q: "개발자가 아니어도 참여할 수 있나요?", a: "전사 직원이 참여하는 방향으로 기획하고 있습니다. 업무를 아는 사람이 문제를 정의하고 XGEN·DexOn과 함께 구현하는 방식입니다. 사전 온보딩과 연구소 멘토 지원을 제안하며, 지원 범위는 운영안 확정 후 안내합니다." },
    { q: "XGEN 계정이 있어야 하나요?", a: `네. DexOn은 XGEN 서버에 연결해 사용하는 클라이언트이므로, 행사 XGEN에 로그인할 수 있는 계정이 필요합니다. ${HACKATHON_ACCESS.accountNotice} ${HACKATHON_ACCESS.serverNotice}` },
    { q: "DexOn 설치만 하면 바로 시작할 수 있나요?", a: "설치 후 행사 XGEN 서버 주소를 지정하고 계정으로 로그인해야 합니다. 사용할 프로젝트·Agent 권한과 PC 연결을 확인한 다음, 샘플 자료로 첫 실행을 해보세요. 계정과 접속 준비가 필요한 참가자는 행사 계정 안내를 먼저 확인해 주세요." },
    { q: "설치 방법과 파일은 어디서 확인하나요?", a: "참가 준비 안내의 ‘설치 가이드 보기’와 ‘설치 파일 보기’에서 확인할 수 있습니다. 설치 파일은 GitHub Releases에 공개돼 있고, 기존 화면 가이드는 Windows 기준입니다. 행사에서 사용할 버전과 접속 환경은 참가 안내에서 확정합니다." },
    { q: "반드시 예시 과제로 만들어야 하나요?", a: "아니요. 아래 과제는 출발점을 돕는 예시입니다. 업무 개선 또는 새로운 서비스라는 두 트랙 안에서 직접 문제를 제안하는 방식을 권장합니다." },
    { q: "무엇을 제출하나요?", a: "실행 가능한 앱 또는 사내에서 접근 가능한 데모, 문제와 대상 사용자, XGEN·DexOn 활용 방식, 검증 결과를 제출하는 안입니다. PPT는 보조 자료로 쓰고 실제 앱 시연을 중심으로 진행하는 방향을 제안합니다." },
    { q: "심사는 어떻게 진행되나요?", a: `제출작을 검토한 뒤 Demo Day에서 실제 앱 시연과 질의응답을 심사위원이 평가하는 안입니다. ${HACKATHON_CRITERIA.map((criterion) => `${criterion.label} ${criterion.score}점`).join(", ")}으로 총 ${TOTAL_SCORE}점입니다. 임직원 투표로 정하는 인기상은 별도 운영을 제안합니다. 최종 심사 방식은 확정 후 안내합니다.` },
    { q: "심사위원은 정해졌나요?", a: "심사위원은 아직 미정입니다. 확정되는 대로 이 페이지에서 안내합니다. 참가자는 제시된 평가 항목과 배점을 참고해 준비해 주세요." },
    { q: "일정, 팀 구성, 상금은 정해졌나요?", a: "아직 확정되지 않았습니다. 현재 해커톤을 준비하고 있으며, 개최일, 장소, 개인·팀 참여 방식, 업무시간 운영, 심사 방식과 시상 규모는 운영안 확정 후 안내합니다. 참가 신청은 아직 받지 않습니다." },
    { q: "회사 자료로 만든 앱을 공개하나요?", a: "행사 소개와 공개 가능한 결과 소개는 Labs에, 사내 자료와 실제 앱은 사내 환경에 두는 운영 방식을 제안합니다. 예시 과제는 샘플·가상 자료를 기준으로 하며, 외부 공개 범위는 제출 전에 정합니다." },
];

export function HackathonPageContent({ event, status }: { event: LabEvent; status: EventStatus }) {
    const [track, setTrack] = useState<Track>("all");
    const visible = CHALLENGES.filter((c) => track === "all" || c.track === track);
    const ended = status === "ended";
    const notice = ended
        ? "종료된 행사입니다. 행사 안내와 평가 기준을 확인할 수 있습니다."
        : status === "preparing"
            ? "전사 해커톤을 준비하고 있습니다. 일정·참가 규정·시상은 확정 후 안내합니다."
            : `${getEventDateLabel(event)} · ${event.venue ?? "장소 추후 안내"}`;

    return (
        <>
            <header className={styles.eventHeader}>
                <div className={styles.eventHeaderInner}>
                    <Link href="/" className={styles.eventBrand} aria-label="Plateer AI Labs 홈"><BrandMark className={styles.eventLogo} /><span>AI LABS</span></Link>
                    <span className={styles.eventHeaderName}>{event.name} {event.year}</span>
                    <Link href="/events" className={styles.eventBack}>이벤트 목록</Link>
                </div>
            </header>
            <main className={styles.page}>
                <div className={styles.draft}>
                    <span>{EVENT_STATUS_META[status].label}</span>
                    <p>{notice}</p>
                </div>

                <section className={styles.hero} aria-labelledby="hackathon-title">
                    <div className={styles.heroTop}>
                        <p>{event.name.toUpperCase()} {event.year}</p>
                        <span>WITH XGEN + DexOn</span>
                    </div>
                    <div className={styles.heroBody}>
                        <div className={styles.heroCopy}>
                            <p className={styles.kicker}>플래티어 전사 AI 해커톤</p>
                            <h1 id="hackathon-title">{HACKATHON_THEME.lead}<br /><em>{HACKATHON_THEME.focus}</em></h1>
                            <p className={styles.heroDescription}>일하는 방식을 개선하고, 새로운 서비스의 가능성을 열어보세요.<br className={styles.desktopBreak} /> XGEN과 DexOn으로 플래티어에 필요한 변화를 직접 만듭니다.</p>
                            <div className={styles.heroActions}>
                                <a href="#challenges" className={styles.primary}>도전 과제 살펴보기</a>
                                <a href="#preparation" className={styles.secondary}>참가 준비 안내</a>
                            </div>
                            <p className={styles.heroNote}>개발 · 기획 · 영업 · 마케팅 · 경영지원. 업무를 아는 모두가 빌더.</p>
                        </div>
                        <div className={styles.buildVisual} aria-label="업무 아이디어가 XGEN과 DexOn을 통해 실행 가능한 앱이 되는 과정" role="img">
                            <div className={styles.visualGrid} />
                            <div className={styles.visualHeader}>FROM IDEA TO APP</div>
                            <div className={styles.ideaCard}><small>INPUT / YOUR WORK</small><strong>“이 일, 매번<br />반복하고 있어요.”</strong><span>문서 · 데이터 · 업무 경험</span></div>
                            <div className={styles.connector}><span />BUILD WITH XGEN + DexOn<span /></div>
                            <div className={styles.appCard}>
                                <div className={styles.appTop}><span>MY FIRST APP</span><span>BUILD</span></div>
                                <strong>아이디어가<br /><em>작동하는 순간.</em></strong>
                                <div className={styles.appLines}><i /><i /><i /></div>
                                <div className={styles.appBottom}><span>만들고. 실행하고. 개선하고.</span><b>APP</b></div>
                            </div>
                            <div className={styles.visualFoot}>YOUR KNOWLEDGE. OUR NEXT POSSIBILITY.</div>
                        </div>
                    </div>
                    <div className={styles.heroFooter}><span>문제에서 시작해서</span><span>대화로 만들고</span><span>실행으로 보여주세요</span></div>
                </section>

                <nav className={styles.sectionNav} aria-label="해커톤 페이지 탐색">
                    <a href="#tracks">두 가지 도전</a><a href="#challenges">과제 아이디어</a><a href="#preparation">참가 준비</a><a href="#process">진행 방식</a><a href="#judges">심사위원</a><a href="#criteria">심사 기준</a><a href="#faq">FAQ</a>
                </nav>

                <section id="tracks" className={styles.section} aria-labelledby="tracks-title">
                    <div className={styles.sectionHeading}><p className={styles.kicker}>01 / THE CHALLENGE</p><h2 id="tracks-title">더 나은 일하는 방식,<br />플래티어의 새로운 가능성.</h2><p>작은 불편 하나를 해결해도 좋습니다.<br />플래티어의 경험에서 새로운 서비스를 찾아도 좋습니다.</p></div>
                    <div className={styles.trackGrid}>
                        <article className={styles.workTrack}><p className={styles.trackLabel}>TRACK 01 / WORK BETTER</p><h3>우리의 일을<br />더 잘하게.</h3><p>반복되는 업무를 줄이고,<br />판단에 필요한 정보를 연결하는 앱.</p><div className={styles.trackTags}><span>반복 작업</span><span>문서 · 데이터</span><span>협업</span></div><a href="#challenges" onClick={() => setTrack("work")}>업무 개선 아이디어 보기</a></article>
                        <article className={styles.nextTrack}><p className={styles.trackLabel}>TRACK 02 / BUILD NEXT</p><h3>우리의 경험을<br />새로운 가치로.</h3><p>커머스·서비스·운영 현장의 경험을<br />새로운 사용자 경험으로 만드는 앱.</p><div className={styles.trackTags}><span>커머스</span><span>고객 경험</span><span>서비스 발굴</span></div><a href="#challenges" onClick={() => setTrack("next")}>새 서비스 아이디어 보기</a></article>
                    </div>
                </section>

                <section id="challenges" className={`${styles.section} ${styles.challenges}`} aria-labelledby="challenges-title">
                    <div className={styles.sectionHeading}><p className={styles.kicker}>02 / START SOMEWHERE</p><h2 id="challenges-title">어떤 일을 바꿔볼까요?</h2><p>정답이 정해진 과제가 아닙니다. 아래 예시에서 시작하거나, 직접 문제를 제안하세요.</p></div>
                    <div className={styles.filters} role="group" aria-label="과제 트랙 필터">
                        {([{ key: "all", label: "전체 아이디어" }, { key: "work", label: "업무 개선" }, { key: "next", label: "새 서비스" }] as const).map((f) => <button type="button" key={f.key} aria-pressed={track === f.key} onClick={() => setTrack(f.key)}>{f.label}</button>)}
                    </div>
                    <p className={styles.resultCount} aria-live="polite">과제 예시 {visible.length}개 · 실제 참가작이 아닙니다</p>
                    <div className={styles.challengeGrid}>
                        {visible.map((c) => <article className={styles.challengeCard} key={c.id}><div className={styles.challengeMeta}><span>{c.area}</span><span>IDEA {c.id}</span></div><h3>{c.title}</h3><p>{c.problem}</p><div className={styles.outcome}><small>만들어볼 것</small><p>{c.outcome}</p></div><details><summary>어떻게 검증할까요?</summary><p>{c.evidence}</p></details></article>)}
                    </div>
                </section>

                <section id="preparation" className={`${styles.section} ${styles.preparation}`} aria-labelledby="preparation-title">
                    <div className={styles.sectionHeading}>
                        <p className={styles.kicker}>03 / GET READY</p>
                        <h2 id="preparation-title">DexOn 설치와 XGEN 계정,<br />함께 준비해 주세요.</h2>
                        <p>DexOn은 XGEN 서버에 연결해 사용하는 클라이언트입니다.<br />행사 XGEN 접속 주소, 로그인할 계정, 프로젝트·Agent 권한이 필요합니다.</p>
                    </div>
                    <div className={styles.preparationGrid}>
                        {HACKATHON_PREPARATION.map((item, index) => <article key={item.title}><span className={styles.preparationNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p><p className={styles.preparationStatus}>{item.status}</p></article>)}
                    </div>
                    <div className={styles.preparationLinks}>
                        <Link href={HACKATHON_ACCESS.installGuideHref} target="_blank" rel="noopener noreferrer">설치 가이드 보기<span>새 탭</span></Link>
                        <a href={HACKATHON_ACCESS.downloadsHref} target="_blank" rel="noopener noreferrer">설치 파일 보기<span>GitHub Releases · 새 탭</span></a>
                        <Link href={HACKATHON_ACCESS.productHref} target="_blank" rel="noopener noreferrer">DexOn 기능 소개<span>새 탭</span></Link>
                    </div>
                    <p className={styles.preparationNote}>행사에서 사용할 계정, 접속 환경, 설치 버전은 운영안 확정 후 안내합니다.</p>
                </section>

                <section className={styles.manifesto} aria-labelledby="manifesto-title"><div><p className={styles.kicker}>BUILT BY YOU. POWERED BY XGEN.</p><h2 id="manifesto-title">가장 좋은 출발점은<br /><em>당신이 아는 업무.</em></h2><p>문제를 설명하고, 앱을 만들고, 직접 실행해보세요.<br />XGEN과 DexOn으로 아이디어를 눈앞의 결과로 바꿉니다.</p><Link href="/proof-in-action">XGEN이 실제로 일하는 모습 보기</Link></div><div className={styles.manifestoWords} aria-hidden="true"><span>THINK.</span><span>BUILD.</span><span>USE.</span></div></section>

                <section id="process" className={styles.section} aria-labelledby="process-title"><div className={styles.sectionHeading}><p className={styles.kicker}>04 / HOW WE BUILD</p><h2 id="process-title">배우고, 만들고, 함께 씁니다.</h2><p>사전 온보딩 → Build Day → Demo Day → 현업 파일럿으로 이어지는 운영안입니다.<br />개최 일정과 업무시간 내 운영 방식은 확정 후 안내합니다.</p></div><div className={styles.steps}>{STEPS.map((s) => <article key={s.n}><div className={styles.stepNumber}>{s.n}</div><p className={styles.stepLabel}>{s.label}</p><h3>{s.title}</h3><p>{s.text}</p></article>)}</div><div className={styles.deliverable}><strong>결과물은 작동하는 앱.</strong><p>앱·데모 링크 + 문제와 대상 사용자 + XGEN·DexOn 활용 방식 + 검증 결과.<br />동료가 직접 사용해볼 수 있는 핵심 흐름 하나를 보여주세요.</p></div></section>

                <section id="judges" className={`${styles.section} ${styles.judges}`} aria-labelledby="judges-title">
                    <div className={styles.privatePanel}>
                        <div className={styles.judgePhoto}>
                            <Image src="/hackathon/judge-private-editorial.png" alt="심사위원 미정 상태를 표현하는 가상 인물의 뒷모습" width={1122} height={1402} sizes="(max-width: 540px) 100vw, 360px" />
                        </div>
                        <div className={styles.privateInfo}>
                            <p className={styles.kicker}>05 / JUDGES</p>
                            <h2 id="judges-title">심사위원<br /><span>미정</span></h2>
                            <p>심사위원은 아직 정해지지 않았습니다.<br />확정되는 대로 이 페이지에서 안내합니다.</p>
                            <div className={styles.privateRule}><span>공개 평가 기준</span><strong>{HACKATHON_CRITERIA.length}개 항목 · {TOTAL_SCORE}점</strong></div>
                            <a href="#criteria">평가 기준 확인하기</a>
                        </div>
                    </div>
                </section>

                <section id="criteria" className={`${styles.section} ${styles.criteria}`} aria-labelledby="criteria-title">
                    <div className={styles.sectionHeading}>
                        <p className={styles.kicker}>06 / JUDGING · 심사 안내</p>
                        <h2 id="criteria-title">플래티어에 어떤 변화를<br />만들 수 있는지 봅니다.</h2>
                        <p>플래티어에 줄 변화와 실제 구현 결과를 평가하는 심사안입니다.<br />최종 심사 방식과 배점은 운영안 확정 후 안내합니다.</p>
                    </div>
                    <div className={styles.judgingStages}>
                        {HACKATHON_JUDGING_STAGES.map((stage, index) => (
                            <article key={stage.title}>
                                <p className={styles.stageLabel}>STEP {String(index + 1).padStart(2, "0")}</p>
                                <h3>{stage.title}</h3>
                                <strong>{stage.method}</strong>
                                <p>{stage.description}</p>
                            </article>
                        ))}
                    </div>
                    <div className={styles.rubricHeader}><h3>Demo Day 평가 기준</h3><span>총 {TOTAL_SCORE}점 · 제안</span></div>
                    <div className={styles.rubricList}>
                        {HACKATHON_CRITERIA.map((criterion, index) => (
                            <article className={styles.rubricRow} key={criterion.label}>
                                <div className={styles.rubricName}><span>{String(index + 1).padStart(2, "0")}</span><h4>{criterion.label}</h4></div>
                                <div className={styles.rubricDetail}><h5>{criterion.question}</h5><p>{criterion.description}</p><p className={styles.rubricEvidence}><span>확인할 근거</span>{criterion.evidence}</p></div>
                                <p className={styles.score}>{criterion.score}<small>점</small></p>
                            </article>
                        ))}
                    </div>
                    <p className={styles.criteriaNote}>업무 개선은 같은 입력의 전후 차이를, 새 서비스는 예상 사용자의 피드백을 제시하세요. 처음 보지 않은 입력에서도 결과가 재현되는지 함께 확인합니다.</p>
                </section>

                <section id="faq" className={styles.section} aria-labelledby="faq-title"><div className={styles.faqLayout}><div className={styles.sectionHeading}><p className={styles.kicker}>07 / FAQ</p><h2 id="faq-title">시작하기 전에.</h2><p>운영안이 확정되면<br />이 페이지에서 안내합니다.</p></div><div className={styles.faqList}>{FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></div></section>

                <section className={styles.closing}><p className={styles.kicker}>YOUR WORK. YOUR BUILD.</p><h2>플래티어의 다음 변화,<br />우리가 만듭니다.</h2>{ended ? <Link href="/events" className={styles.primary}>다른 이벤트 보기</Link> : <a href="#challenges" className={styles.primary}>내가 만들 변화 찾아보기</a>}<p>{ended ? "종료된 행사입니다. 새로운 이벤트는 이벤트 목록에서 확인하세요." : status === "preparing" ? "행사 준비 중 · 참가 신청은 운영안 확정 후 열립니다." : `${getEventDateLabel(event)} · ${EVENT_STATUS_META[status].label}`}</p></section>
            </main>
            <footer className={styles.eventFooter}><p>© {event.year} Plateer AI Labs</p><Link href="/events">전체 이벤트 보기</Link><Link href="/">Labs 홈</Link></footer>
        </>
    );
}
