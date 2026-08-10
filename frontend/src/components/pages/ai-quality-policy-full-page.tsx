import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { PreviewBand, PREVIEW_BAND_H } from "@/components/preview-band";
import { breadcrumbLd } from "@/lib/structured-data";
import { localePath } from "@/lib/locale-path";
import { POLICY_DOC } from "@/components/pages/ai-quality-policy-page";

/**
 * AI 품질 방침 — 전문(17개 장).
 *
 * **AI-MASTER NEW1 증빙을 담당하는 페이지다.** 심사는 "방침이 문서로 관리·최신화되고
 * 외부에서 확인 가능한가"를 보므로 문서번호·버전·개정일·개정 이력을 제거하면 안 된다.
 *
 * 한국어만 둔다 — 국내 인증 증빙용 법적 문서라 번역본과 정본이 어긋나면
 * 책임 분계 조항에서 문제가 된다(영문 개요에서 이 페이지로 연결한다).
 *
 * 원문: 사내 AI품질방침_본문.md — 내용은 그대로 두고 사이트 룩앤필로 재구성했다.
 */

/* ── 표시 컴포넌트 ────────────────────────────────────────────── */

function PartHead({ children }: { children: React.ReactNode }) {
    return (
        <p className="mt-20 border-t border-[var(--color-line)] pt-10 font-mono text-[13px] font-bold uppercase tracking-widest text-[#2461d8] first:mt-0 first:border-t-0 first:pt-0">
            {children}
        </p>
    );
}

function Ch({
    n,
    title,
    id,
    children,
}: {
    n: number;
    title: string;
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="mt-10 scroll-mt-24">
            <h2 className="flex items-baseline gap-3 text-[21px] font-bold tracking-tight text-[var(--color-ink)] md:text-[24px]">
                <span className="font-mono text-[15px] font-bold text-[#2461d8]">
                    {String(n).padStart(2, "0")}
                </span>
                {title}
            </h2>
            <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                {children}
            </div>
        </section>
    );
}

function H3({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="pt-2 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
            {children}
        </h3>
    );
}

/** 문서 톤에 맞춘 표 — 가로 스크롤로 모바일에서도 열이 뭉개지지 않게 한다. */
function Table({
    head,
    rows,
    align,
}: {
    head: string[];
    rows: React.ReactNode[][];
    align?: ("left" | "center")[];
}) {
    return (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-line)]">
            <table className="w-full min-w-[520px] border-collapse text-[14.5px]">
                <thead>
                    <tr className="bg-[var(--color-surface-alt)]">
                        {head.map((h, i) => (
                            <th
                                key={h}
                                className={`border-b border-[var(--color-line)] px-4 py-3 font-bold text-[var(--color-ink)] ${
                                    align?.[i] === "center" ? "text-center" : "text-left"
                                }`}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="align-top">
                            {r.map((c, j) => (
                                <td
                                    key={j}
                                    className={`border-b border-[var(--color-line)] px-4 py-3 leading-relaxed ${
                                        align?.[j] === "center" ? "text-center" : ""
                                    }`}
                                >
                                    {c}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Note({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="rounded-xl border-l-4 border-l-[#2f7bff] bg-[var(--color-surface-alt)] px-5 py-4 text-[15px] leading-relaxed text-[var(--color-ink)]">
            {children}
        </blockquote>
    );
}

function Ol({ items }: { items: React.ReactNode[] }) {
    return (
        <ol className="ml-1 space-y-2.5">
            {items.map((x, i) => (
                <li key={i} className="flex gap-3">
                    <span className="font-mono text-[13px] font-bold text-[#2461d8]">
                        {i + 1}
                    </span>
                    <span>{x}</span>
                </li>
            ))}
        </ol>
    );
}

const B = ({ children }: { children: React.ReactNode }) => (
    <b className="font-bold text-[var(--color-ink)]">{children}</b>
);

const MAIL = "xgen@plateer.com";

export function AiQualityPolicyFullPageContent({
    overviewHref,
}: {
    /** 개요 페이지 주소 — 검토 단계에서는 히든 경로를 넘긴다. */
    overviewHref: string;
}) {
    return (
        <>
            {/* 승인 대기 검토본 표시 — 정식 공개 시 이 두 줄을 주석 처리하고
                <SiteNav /> 로 되돌린다(개요 페이지와 같은 규칙). */}
            <PreviewBand />
            <SiteNav offsetTop={PREVIEW_BAND_H} />
            <JsonLd
                data={breadcrumbLd([
                    { name: "Home", path: localePath("ko", "/") },
                    { name: "AI 품질 방침", path: localePath("ko", "/ai-quality-policy") },
                    {
                        name: "전문",
                        path: localePath("ko", "/ai-quality-policy/full"),
                    },
                ])}
            />

            <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                <div className="mx-auto max-w-4xl px-6 pb-12 pt-10">
                    <Link
                        href={overviewHref}
                        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink-muted)] transition hover:text-[#2461d8]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        AI 품질 방침 개요
                    </Link>
                    <h1 className="mt-6 text-[30px] font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-[40px]">
                        AI 품질 방침
                        <span className="ml-2.5 align-middle font-mono text-[16px] font-normal text-[var(--color-ink-subtle)]">
                            AI Quality Policy
                        </span>
                    </h1>
                    <p className="mt-3 text-[16px] font-semibold text-[var(--color-ink-muted)]">
                        플래티어 AI연구소 (Plateer AI Lab)
                    </p>

                    <div className="mt-8">
                        <Table
                            head={["항목", "내용"]}
                            rows={[
                                ["문서번호", <B key="n">{POLICY_DOC.no}</B>],
                                ["문서등급", "방침 (Policy) — 최상위 문서"],
                                ["제정일", "2026-08-07"],
                                ["최종 개정일", POLICY_DOC.revised],
                                ["버전", <B key="v">{POLICY_DOC.version}</B>],
                                ["시행일", "2026-08-07"],
                                ["승인", "플래티어 AI연구소 소장 남덕현"],
                                [
                                    "공개 구분",
                                    <B key="p">대외 공개 (플래티어 AI연구소 홈페이지 상시 게시)</B>,
                                ],
                                ["차기 정기 검토 예정", `${POLICY_DOC.nextReview} (연 1회 이상)`],
                            ]}
                        />
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-4xl px-6 py-16">
                {/* ══════ 공통 — 방침의 기초 ══════ */}
                <PartHead>공통 — 방침의 기초</PartHead>

                <Ch n={1} title="목적" id="purpose">
                    <p>
                        플래티어 AI연구소(이하 &ldquo;연구소&rdquo;)는{" "}
                        <B>AI를 직접 개발하고, 업무에 사용하며, 고객사에 공급하는 조직</B>
                        입니다. 우리가 만들고 쓰는 AI가 신뢰받고 책임 있게 활용되도록 하기 위하여
                        본 <B>AI 품질 방침</B>을 수립하고 대외에 공표합니다.
                    </p>
                    <p>
                        본 방침은{" "}
                        <B>AI 품질 매뉴얼, 운영 절차서, 개발 지침서, 양식 및 기록</B>으로 이어지는
                        품질 관리 체계를 통해 구체화되며, 제품 기획부터 개발, 검증, 운영에 이르는
                        전 과정의 기준으로 적용됩니다.
                    </p>
                </Ch>

                <Ch n={2} title="연구소의 지위와 방침의 구성" id="position">
                    <p>
                        연구소는 AI에 대하여 세 가지 지위를 동시에 가집니다. 지위마다 지켜야 할
                        것이 다르므로, 본 방침은 이를 분리하여 규정합니다.
                    </p>
                    <Table
                        head={["지위", "의미", "규정 위치"]}
                        rows={[
                            [<B key="a">AI 개발자</B>, "AI 플랫폼과 솔루션을 직접 개발·검증한다", <B key="b">제1부</B>],
                            [<B key="c">AI 이용자</B>, "개발·업무 과정에서 AI 도구를 직접 사용한다", <span key="d"><B>제1부</B> (7장)</span>],
                            [<B key="e">AI 공급자</B>, "고객사가 AI를 운영할 수 있도록 제품과 통제 수단을 공급한다", <B key="f">제2부</B>],
                        ]}
                    />
                    <ul className="ml-1 space-y-2">
                        <li>
                            · <B>제1부 (4~11장)</B> — 연구소가 스스로에게 적용하고 지키는 기준
                        </li>
                        <li>
                            · <B>제2부 (12~14장)</B> — 도입 고객사에 안내하는 책임 분계와 이행 가이드
                        </li>
                    </ul>
                    <Note>
                        연구소는 고객에게 제공하는 품질 기준을{" "}
                        <B>먼저 내부 개발과 운영에 동일하게 적용</B>합니다. 스스로 검증한 원칙과
                        운영 경험을 바탕으로, 고객이 신뢰하고 활용할 수 있는 AI 품질 체계를
                        제공합니다.
                    </Note>
                </Ch>

                <Ch n={3} title="적용 범위" id="scope">
                    <Table
                        head={["구분", "범위"]}
                        rows={[
                            ["대상 조직", "플래티어 AI연구소 및 AI 제품의 기획·개발·검증·공급·기술지원에 관여하는 모든 조직"],
                            ["대상 제품·서비스", <span key="p">엔터프라이즈 AI 플랫폼 <B>XGEN</B> 및 연구소가 개발·공급하는 모든 AI 기반 제품·솔루션</span>],
                            [<B key="u">대상 사내 AI 이용</B>, <B key="v">개발·기획·운영 업무에 사용하는 코드 어시스턴트, 사내 AI 챗봇, XGEN 기반 에이전트 등</B>],
                            ["AI 생명주기", "요구사항 정의 → 데이터 수집·준비 → 모델 개발·학습 → 검증·평가 → 배포(릴리즈) → 운영·모니터링 → 개선·재학습 → 폐기(지원 종료)"],
                            ["데이터 생명주기", "데이터 동기·개념화 → 명세 → 계획 → 획득 → 전처리 → 증강 → 사용 → 폐기"],
                            ["대상 인원", "임직원 전원, 협력사·외부 공급자 및 외부 AI 모델·서비스 제공자"],
                        ]}
                    />
                </Ch>

                {/* ══════ 제1부 ══════ */}
                <PartHead>제1부 — 연구소에 적용되는 기준</PartHead>

                <Ch n={4} title="AI 품질 방침 선언" id="declaration">
                    <Note>
                        연구소는 다음 일곱 가지를 AI 품질의 기본 약속으로 삼습니다. 이는 우리가{" "}
                        <B>만드는 AI와 쓰는 AI 모두</B>에 적용됩니다.
                    </Note>
                    <Ol
                        items={[
                            <span key="1"><B>사람이 최종 결정권을 갖습니다.</B> 자동화된 처리는 언제든 사람이 거부·변경·중단시킬 수 있어야 하며, 그 수단을 제품에 기본 기능으로 내장합니다.</span>,
                            <span key="2"><B>검증되지 않은 품질은 출시하지 않습니다.</B> 정의된 품질 기준과 릴리즈 시험을 통과한 산출물만 배포합니다.</span>,
                            <span key="3"><B>데이터의 품질이 곧 AI의 품질임을 인식합니다.</B> 우리가 쓰는 데이터는 출처를 확인하고, 고객사의 데이터는 고객사가 통제할 수 있게 합니다.</span>,
                            <span key="4"><B>설명할 수 있는 AI를 지향합니다.</B> 결과의 근거와 처리 경로를 추적할 수 있게 하고, AI가 생성한 내용은 이용자가 알 수 있게 표시합니다.</span>,
                            <span key="5"><B>특정 개인이나 집단을 부당하게 차별하지 않습니다.</B> 편향을 사전에 식별하고 완화하며, 고객사가 자신의 편향을 점검할 수 있는 수단을 제공합니다.</span>,
                            <span key="6"><B>책임 소재를 분명히 합니다.</B> 공급자와 운영자의 책임 경계를 공개하고, 그 경계 안에서 우리의 책임을 회피하지 않습니다.</span>,
                            <span key="7"><B>멈추지 않고 개선합니다.</B> 이해관계자의 의견과 사고·이슈를 반영하여 방침과 제품을 지속적으로 갱신합니다.</span>,
                        ]}
                    />
                </Ch>

                <Ch n={5} title="신뢰할 수 있는 AI 7대 원칙과 이행 약속" id="principles">
                    <Table
                        head={["#", "원칙", "연구소가 지키는 것 (개발자·이용자)", "제품이 제공하는 것 (공급자)"]}
                        rows={[
                            ["1", <span key="a"><B>인간의 주체성과 감독</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Human Agency &amp; Oversight</span></span>, "AI 산출물을 사람이 검토·승인한 뒤에만 반영합니다.", "자동화 처리의 거부·변경·중단, 이의 제기, 통제권 이관 기능"],
                            ["2", <span key="b"><B>기술적 견고성과 안전성</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Technical Robustness &amp; Safety</span></span>, "릴리즈 전 비정상 입력·데이터 오염에 대한 강건성 시험을 수행합니다.", <span key="b2">남용·오용·불법 사용에 대응하는 <B>가드레일 기본 제공</B></span>],
                            ["3", <span key="c"><B>프라이버시와 데이터 거버넌스</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Privacy &amp; Data Governance</span></span>, "기밀·개인정보는 내부 격리 환경의 승인된 AI 도구에서만 처리합니다.", "역할 기반 접근통제, 민감정보 통제, 계보 추적, 확인 가능한 파기"],
                            ["4", <span key="d"><B>투명성</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Transparency</span></span>, "AI로 생성한 산출물은 그 사실과 이력을 기록합니다.", <span key="d2">AI 생성물 표기, 제품의 목적·능력·<B>한계</B> 및 연계 외부 모델 정보 공개</span>],
                            ["5", <span key="e"><B>다양성·비차별·공정성</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Diversity, Non-discrimination &amp; Fairness</span></span>, "제품 검증 단계에서 편향 가능성을 평가합니다.", "운영 중 편향을 점검할 수 있는 로그와 지표"],
                            ["6", <span key="f"><B>사회적·환경적 웰빙</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Societal &amp; Environmental Well-being</span></span>, "개발·도입의 사회적 영향을 사전 평가하고 컴퓨팅 자원 소모를 줄입니다.", "자원 사용 현황의 가시화"],
                            ["7", <span key="g"><B>책임성</B><br /><span className="text-[13px] text-[var(--color-ink-subtle)]">Accountability</span></span>, "역할별 책임·권한을 정의하고 내부감사로 독립 점검합니다.", <span key="g2"><B>책임 분계 공개(12장)</B> 및 감사 가능한 기록</span>],
                        ]}
                    />
                </Ch>

                <Ch n={6} title="AI 품질 요소 및 기준" id="quality-elements">
                    <H3>6.1 제품 품질 요소</H3>
                    <p>
                        국제표준(ISO/IEC 25010·25059 등)의 소프트웨어 품질 특성에 AI 고유 특성과{" "}
                        <B>플랫폼 제품 고유 특성</B>을 더하여 정의합니다.
                    </p>
                    <Table
                        head={["구분", "품질 요소", "관리 관점"]}
                        rows={[
                            ["공통", "기능적합성", "정의된 요구사항의 완전한 구현 및 정확한 동작"],
                            ["공통", "성능효율성", "응답 시간, 자원 사용량, 동시 처리량"],
                            ["공통", "신뢰성", "가용성, 장애 허용성, 복구 가능성"],
                            ["공통", "보안성", "기밀성·무결성·인증·접근통제·감사 로그"],
                            ["공통", "사용성", "학습 용이성, 접근성, 오류 방지"],
                            ["공통", "유지보수성·이식성", "모듈성, 변경 용이성, 설치 환경 이식성"],
                            ["AI 고유", "정확성", "정의된 성능 목표 대비 달성도"],
                            ["AI 고유", "강건성", "비정상·오염 입력에서의 성능 유지"],
                            ["AI 고유", "공정성", "집단 간 성능 편차 및 편향 수준"],
                            ["AI 고유", "설명가능성", "결과 근거의 제시 및 처리 경로 추적 가능성"],
                            ["AI 고유", "사실성", "환각(hallucination) 발생 억제 수준"],
                            ["플랫폼 고유", <B key="a">통제가능성</B>, "고객사가 AI의 행동 범위를 정의·제한할 수 있는 정도"],
                            ["플랫폼 고유", <B key="b">관찰가능성</B>, "운영 중 무슨 일이 일어났는지 사후 확인 가능한 정도"],
                            ["플랫폼 고유", <B key="c">연계 안전성</B>, "외부 모델·도구·데이터 연동 시 위험이 통제되는 정도"],
                        ]}
                    />

                    <H3>6.2 인력 역량 요소</H3>
                    <p>
                        AI 개발·운영·검증 및 데이터 관리에 참여하는 인원에 대해 역할별 필요 역량을
                        정의하고, <B>자격 확인 → 교육·훈련 → 역량 평가 → 재교육</B>의 주기를
                        운영합니다. AI 정책·윤리 교육은 대상 인원 전원이{" "}
                        <B>연 1회 이상 필수</B> 이수합니다.
                    </p>

                    <H3>6.3 데이터 품질 방침 (연구소가 직접 관리하는 데이터)</H3>
                    <Ol
                        items={[
                            <span key="1"><B>적법성</B> — 데이터는 적법한 절차와 권원에 따라 획득하며, 획득 조직이 해당 데이터와 그 품질에 대한 책임을 집니다.</span>,
                            <span key="2"><B>추적성</B> — 출처, 가공 이력, 사용 목적을 메타데이터로 기록하여 계보(lineage)를 확보합니다.</span>,
                            <span key="3"><B>적정성</B> — 형식·완전성·정확성·최신성·일관성·대표성의 품질 지표를 선정·측정하고 주기적으로 갱신합니다.</span>,
                            <span key="4"><B>비편향성</B> — 편향 가능성을 식별하는 절차를 운영하고, 확인된 편향은 완화 조치 후 재평가합니다.</span>,
                            <span key="5"><B>반환·파기</B> — 고객사로부터 기술지원·검증 목적으로 제공받은 데이터는 목적 달성 즉시 <B>확인 가능한 방식으로 반환 또는 파기</B>하고, 그 기록을 보관합니다.</span>,
                        ]}
                    />
                </Ch>

                <Ch n={7} title="사내 AI 이용 기준" id="internal-use">
                    <p>
                        연구소는 AI를 만드는 조직인 동시에 <B>AI를 업무에 사용하는 조직</B>입니다.
                        코드 어시스턴트, 사내 AI 챗봇, XGEN 기반 에이전트 등 연구소가
                        개발·운영하는 AI 도구의 사용에 다음 기준을 적용합니다.
                    </p>
                    <Table
                        head={["#", "기준", "내용"]}
                        rows={[
                            ["1", <B key="a">승인된 도구만 사용</B>, <span key="a2">업무에 사용하는 AI 도구는 사전 검토·승인을 거쳐 <B>사내 AI 도구 대장</B>에 등재된 것으로 한정합니다. 신규 도구는 보안·라이선스·데이터 처리 방식을 검토한 뒤 도입합니다.</span>],
                            ["2", <B key="b">기밀·개인정보 입력 금지</B>, <span key="b2">고객사 데이터, 개인정보, 미공개 소스코드 및 사내 기밀은 <B>내부 격리 환경에서 운영되는 승인된 AI 도구에서만 처리합니다.</B> 승인되지 않은 외부 AI 서비스에는 입력하지 않습니다.</span>],
                            ["3", <B key="c">검증 책임은 사용자에게</B>, <span key="c2">AI가 생성한 코드·문서·분석 결과는 <B>사용자가 검증한 뒤에만</B> 산출물로 반영합니다. 검증하지 않은 AI 산출물의 직접 반영을 금지합니다.</span>],
                            ["4", <B key="d">생성 이력 관리</B>, "AI를 활용해 작성한 주요 산출물은 그 사실과 사용 도구를 기록하여 추적 가능하게 합니다."],
                            ["5", <B key="e">이용 현황 점검</B>, "AI 도구의 이용 현황과 이상 사용 여부를 정기적으로 점검하고, 결과를 거버넌스 기구에 보고합니다."],
                            ["6", <B key="f">정기 교육</B>, <span key="f2">전 임직원은 AI 활용 및 AI 윤리 교육을 <B>연 1회 이상 필수</B> 이수합니다.</span>],
                        ]}
                    />
                    <Note>
                        연구소는 AI를 직접 개발하고 운영하는 과정에서 얻은 경험과 개선 사항을{" "}
                        <B>제품에 지속적으로 반영</B>합니다. 실제 운영 환경에서 검증한 경험을
                        바탕으로, 고객이 신뢰할 수 있는 Enterprise AI 플랫폼을 만들어갑니다.
                    </Note>
                </Ch>

                <Ch n={8} title="AI 품질 목표" id="objectives">
                    <p>
                        연구소는 매년 AI 연구·개발 및 운영에 대한 정량·정성 목표를 수립하고, 추진
                        실적과 목표 달성 여부를 정기적으로 점검합니다. 본 목표는{" "}
                        <B>연 1회 AI 거버넌스 위원회의 심의를 거쳐 수립</B>하며, 달성 실적은{" "}
                        <B>분기 1회 거버넌스 정례 보고(10장)</B>를 통해 위원회에 보고·검토합니다.
                        위원회의 검토 및 개선 의견은 차년도 목표와 운영 계획에 반영합니다.
                    </p>
                    <H3>8.1 정량 목표 (2026년도)</H3>
                    <Table
                        head={["영역", "KPI", "목표"]}
                        rows={[
                            ["정책관리", "AI 정책 제·개정 건수", "연 2회 이상"],
                            ["정책관리", "정책 준수율", "95% 이상"],
                            ["개발관리", "AI 프로젝트 개발 표준 적용률", "100%"],
                            ["개발관리", "개발 산출물 표준 준수율", "95% 이상"],
                            ["위험관리", "리스크 평가(Risk Assessment) 수행률", "100%"],
                            ["위험관리", "High Risk 개선 완료율", "95% 이상"],
                            ["데이터관리", "데이터 품질 점수", "90점 이상"],
                            ["데이터관리", "데이터 계보(Lineage) 확보율", "100%"],
                            ["모델관리", "모델 검증 완료율", "100%"],
                            ["모델관리", "재학습 주기 준수율", "95% 이상"],
                            [<B key="a">사내 AI 이용</B>, <B key="a2">승인 도구 사용률</B>, <B key="a3">100%</B>],
                            [<B key="b">사내 AI 이용</B>, <B key="b2">AI 산출물 검증 누락 건수</B>, <B key="b3">0건</B>],
                            ["규제대응", "내부감사 적합률", "95% 이상"],
                            ["규제대응", "인증 유지율", "100%"],
                            ["교육", "AI 교육 이수율", "95% 이상"],
                            ["교육", "AI 윤리 교육 이수율", "100%"],
                            ["운영", "중대 결함 시정 소요시간", "목표시간 이내"],
                            ["운영", "중대 인시던트 발생 건수", "연 1건 이하"],
                        ]}
                    />
                    <H3>8.2 정성 목표 (2026년도)</H3>
                    <Table
                        head={["영역", "목표"]}
                        rows={[
                            ["정책", "현업이 쉽게 이해하고 활용할 수 있는 정책 제공"],
                            ["개발", "개발자 만족도 향상"],
                            ["위험", "AI 위험을 사전에 발견하는 조직 문화 정착"],
                            ["데이터", "데이터 활용 신뢰성 확보"],
                            ["모델", "설명 가능한 AI 확보"],
                            ["규제", "감사 대응 역량 향상"],
                            ["교육", "AI 활용 문화 확산"],
                            ["운영", "고객사와 최종 사용자의 신뢰 확보"],
                        ]}
                    />
                </Ch>

                <Ch n={9} title="거버넌스 및 책임 체계" id="governance">
                    <Table
                        head={["역할", "책임과 권한"]}
                        rows={[
                            [<B key="a">AI 최고책임자 (CAIO)</B>, <span key="a2">AI 전략·정책의 최종 승인, AI 리스크 허용 기준 결정, <B>12장 책임 분계 범위 내에서 제품 결함으로 발생한 피해에 대한 최종 책임</B></span>],
                            [<B key="b">AI 거버넌스 위원회</B>, <span key="b2">AI 정책·원칙의 적정성 정기 평가, 고영향 AI 해당 여부 심의, 리스크 대응 방안 및 잔여 리스크 수용 여부 결정, 신규 AI 기능 도입·릴리즈·지원종료 승인, <B>사내 AI 도구 도입 승인</B></span>],
                            [<B key="c">AI 품질책임자</B>, "품질 기준 수립, 릴리즈 품질 보증 활동 수행 및 분기 품질 보고"],
                            [<B key="d">데이터 책임자 (CDO)</B>, "데이터 품질 정책 수립, 개발·검증용 데이터의 획득·처리·파기 관리 및 개인정보 보호 총괄"],
                            [<B key="e">AI 사고 대응 조직</B>, "AI 사고·취약점의 접수·분석·조치, 영향받는 고객사 통지 및 재발 방지 대책 수립"],
                            [<B key="f">내부감사 조직</B>, <span key="f2">개발·운영 조직과 <B>분리된 독립 조직</B>으로서 방침 이행 여부를 감사하고 시정조치를 요구</span>],
                        ]}
                    />
                    <Note>
                        역할별 책임자 명단은 사내 게시판 및 사내 위키를 통해 내부 이해관계자에게
                        상시 게시합니다.
                    </Note>
                </Ch>

                <Ch n={10} title="이행·점검·개선 체계" id="implementation">
                    <Table
                        head={["활동", "주기", "산출물"]}
                        rows={[
                            ["AI 품질 관리 활동 모니터링", "상시", "모니터링 점검 결과서, 이상징후 보고서"],
                            ["거버넌스 정례 보고", "분기 1회 및 중대 이벤트 발생 시 수시", "회의록, AI 품질보증활동 보고서, 이슈관리대장"],
                            ["릴리즈 품질 검증", "릴리즈 시마다", "시험 계획서, 시험 결과서, 릴리즈 승인 기록"],
                            [<B key="a">사내 AI 이용 현황 점검</B>, <B key="a2">분기 1회</B>, <B key="a3">AI 도구 대장, 이용 현황 점검 결과서</B>],
                            ["리스크 재평가", "반기 1회 및 중대 이벤트 발생 시", "리스크 평가서, 리스크 조치 결과서"],
                            ["영향 평가 (기본권·데이터)", "신규 AI 기능 개발 착수 전 및 중대 변경 시", "영향성 평가 보고서"],
                            ["내부감사", "연 1회 이상", "내부감사 결과 보고서, 시정조치 계획 및 효과성 평가서"],
                            ["경영검토 (Management Review)", "연 1회 이상", "경영검토 결과 보고서"],
                            ["방침·정책 적정성 평가", "연 1회 이상", "정책 적정성 평가 이행 기록서"],
                        ]}
                    />
                    <p>
                        AI 사고 또는 제품 취약점이 확인된 경우, 정해진 기준에 따라{" "}
                        <B>접수 → 원인 분석 → 조치 → 영향받는 고객사 통지 → 재발 방지 대책 수립</B>의
                        절차를 이행합니다. 이를 통해 제품의 안정성과 신뢰성을 지속적으로 강화합니다.
                    </p>
                </Ch>

                <Ch n={11} title="이해관계자 소통 및 피드백" id="stakeholders">
                    <p>
                        연구소는{" "}
                        <B>
                            도입 고객사, 고객사의 최종 사용자, 협력사·외부 모델 공급자, 규제기관,
                            임직원
                        </B>
                        을 AI 품질 방침의 주요 이해관계자로 정의하고, 다음 창구를 통해 의견을
                        수렴하여 방침과 제품에 반영합니다.
                    </p>
                    <Table
                        head={["구분", "창구"]}
                        rows={[
                            ["AI 품질·윤리 관련 문의", MAIL],
                            [
                                "제품 기능·결과에 대한 의견 및 이의 제기",
                                <span key="c">
                                    제품 내 피드백 기능 및 고객지원 채널 (
                                    <Link href="/contact" className="font-semibold text-[#2461d8] underline underline-offset-4">
                                        labs.plateer.com/contact
                                    </Link>
                                    )
                                </span>,
                            ],
                            ["AI 사고·오작동 신고", MAIL],
                            ["제품 보안 취약점 신고", MAIL],
                        ]}
                    />
                    <p>
                        접수된 의견은 정해진 수용 기준과 보고 단계에 따라 검토되며, 처리 결과는
                        요청자에게 회신합니다.
                    </p>
                </Ch>

                {/* ══════ 제2부 ══════ */}
                <PartHead>제2부 — 도입 고객사를 위한 가이드</PartHead>

                <Ch n={12} title="책임 분계 — 공급자와 도입 고객사" id="responsibility">
                    <p>
                        연구소의 제품은{" "}
                        <B>고객사 인프라에 설치되어 고객사가 직접 운영</B>하는 형태로 공급됩니다.
                        책임 소재를 명확히 하기 위하여 다음과 같이 역할을 정의하고 공개합니다.
                    </p>
                    <Table
                        head={["영역", "플래티어 AI연구소 (공급자)", "도입 고객사 (운영 주체)"]}
                        align={["left", "center", "center"]}
                        rows={[
                            ["플랫폼의 기능적합성·성능·신뢰성·보안성", <B key="a">책임</B>, "—"],
                            ["내장 통제 수단(가드레일, 권한 통제, 감사 로그, 거버넌스 기능)의 제공 및 정상 동작", <B key="b">책임</B>, "—"],
                            ["취약점 대응, 결함 시정, 버전 관리 및 기술 지원", <B key="c">책임</B>, "—"],
                            ["안전한 구성·운영을 위한 문서·교육·기준 제공", <B key="d">책임</B>, "수령·숙지"],
                            ["플랫폼 위에서 구성한 에이전트·워크플로우의 목적 적합성과 결과", "수단·자문 제공", <B key="e">책임</B>],
                            ["투입·연계하는 데이터의 적법성과 품질", "관리 기능 제공", <B key="f">책임</B>],
                            ["개인정보의 수집·이용·보관·파기 (개인정보처리자 지위)", "보호 기능 제공", <B key="g">책임</B>],
                            ["연계하는 외부 LLM·MCP 등 서비스의 선택과 사용", "검증 기준·연동 수단 제공", <B key="h">책임</B>],
                            ["운영 중 결과 검토 및 최종 의사결정", "통제 수단 제공", <B key="i">책임</B>],
                        ]}
                    />
                    <Note>
                        <B>연구소의 약속</B> — 연구소는 고객이 책임 있는 AI를 운영할 수 있도록
                        필요한 <B>플랫폼 기능, 통제 체계, 운영 기준, 관련 문서를 함께 제공</B>합니다.
                        공급자로서의 책임과 고객의 운영 책임을 명확히 구분하고, 안정적이고 신뢰할 수
                        있는 Enterprise AI 운영 환경을 함께 만들어갑니다.
                    </Note>
                </Ch>

                <Ch n={13} title="고객사에 제공하는 통제 수단" id="controls">
                    <p>
                        12장에서 고객사 책임으로 정의된 각 항목에 대해, 연구소는 다음의 제품 기능과
                        자료를 제공합니다.
                    </p>
                    <Table
                        head={["고객사가 이행해야 할 것", "연구소가 제공하는 수단"]}
                        rows={[
                            ["사람의 감독과 최종 결정", "승인·중단 지점 설정, 실행 이력 조회"],
                            ["AI 행동 범위 제한", "가드레일 정책 설정, 통제 정책 관리"],
                            ["접근 권한 통제", "사용자·조직 관리, 역할 기반 권한"],
                            ["운영 상황 관찰과 사후 추적", "실행 로그, 정책 로그, 감사 기록, 거버넌스 현황"],
                            ["데이터 관리와 파기", "지식·데이터 관리, 보유 및 파기 기능"],
                            ["편향·품질 점검", "평가 기능 및 로그 기반 지표"],
                            ["외부 모델·도구 연계 통제", "모델 공급자 관리, MCP 관리"],
                            ["안전한 도입·운영", "제품설명서, 사용자·관리자 매뉴얼, 도입 교육"],
                        ]}
                    />
                    <Note>
                        제공 수단의 구체적 명칭과 범위는 제품 버전에 따라 다를 수 있으며, 최신
                        내용은 제품설명서 및 매뉴얼을 따릅니다.
                    </Note>
                </Ch>

                <Ch n={14} title="고객사 권고 이행 사항" id="customer-guide">
                    <p>
                        연구소는 도입 고객사가 다음 사항을 이행할 것을 권고하며, 필요한 기준과
                        자료를 함께 제공합니다.
                    </p>
                    <Ol
                        items={[
                            <span key="1"><B>도입 전 영향 평가</B> — AI 도입이 개인·집단·사회에 미치는 영향을 사전 평가하고, 「AI 기본법」상 <B>고영향 AI 해당 여부</B>를 판단하십시오.</span>,
                            <span key="2"><B>목적과 허용 범위 정의</B> — 에이전트·워크플로우별로 목적, 허용 행위, 금지 행위를 문서로 정의하고 가드레일에 반영하십시오.</span>,
                            <span key="3"><B>데이터 적법성 확인</B> — 투입하는 데이터의 수집 근거와 이용 범위를 확인하고, 접근 권한은 최소한으로 부여하십시오.</span>,
                            <span key="4"><B>사람 개입 지점 지정</B> — 중요한 판단에는 사람의 검토·승인 지점을 반드시 두고, 자동화 중단 시의 대응 절차를 정하십시오.</span>,
                            <span key="5"><B>기록 보존과 정기 점검</B> — 실행·정책·감사 로그의 보존 기간을 정하고, 이상 여부를 정기적으로 점검하십시오.</span>,
                            <span key="6"><B>최종 사용자 고지</B> — AI가 개입한 결과임을 최종 사용자가 알 수 있도록 표시하고, 이의 제기 창구를 안내하십시오.</span>,
                            <span key="7"><B>사고 발생 시 통지</B> — 제품 결함이 의심되는 사고가 발생한 경우 <B>{MAIL}</B> 으로 통지해 주십시오. 원인 분석과 조치 결과를 회신합니다.</span>,
                        ]}
                    />
                    <Note>
                        <B>개인정보 관련 문의 안내</B>
                        <br />
                        연구소의 AI 제품은 고객사 인프라에 설치되어 운영되므로, 해당 서비스의{" "}
                        <B>개인정보처리자는 도입 고객사</B>입니다. 특정 서비스에서 처리되는
                        개인정보에 관한 열람·정정·삭제 등의 요구는{" "}
                        <B>해당 서비스를 운영하는 고객사의 개인정보 처리방침</B>에 따라 주시기
                        바랍니다.
                        <br />
                        제품이 제공하는 개인정보 보호 기능 자체에 관한 문의는 11장의 창구로 접수해
                        주시면 안내해 드립니다.
                    </Note>
                </Ch>

                {/* ══════ 공통 — 방침의 관리 ══════ */}
                <PartHead>공통 — 방침의 관리</PartHead>

                <Ch n={15} title="방침의 관리·최신화 및 공개" id="maintenance">
                    <Ol
                        items={[
                            <span key="1">
                                본 방침은 <B>연 1회 이상 정기 검토</B>하며, 다음의 경우 수시로
                                개정합니다.
                                <ul className="mt-2 ml-1 space-y-1.5 text-[15px]">
                                    <li>· 관련 법령·규제(AI 기본법 등) 또는 국제표준의 제·개정</li>
                                    <li>· 중대한 AI 사고·취약점 또는 내부감사·경영검토 결과 개선 필요 사항 도출</li>
                                    <li>· 사업 범위, 제품 구성 또는 책임 분계 기준의 중대한 변경</li>
                                    <li>· <B>사내 AI 이용 환경의 중대한 변경</B></li>
                                </ul>
                            </span>,
                            "개정안은 AI 거버넌스 위원회의 심의와 연구소장의 승인을 거쳐 확정합니다.",
                            <span key="3">확정된 방침은 <B>본 홈페이지에 상시 공개</B>하며, 개정 시 개정 이력과 함께 즉시 갱신하여 외부 이해관계자가 최신본을 확인할 수 있도록 합니다.</span>,
                            "내부 이해관계자에게는 사내 위키·게시판 게시 및 연 1회 이상의 필수 교육을 통해 방침을 지속적으로 상기시킵니다.",
                        ]}
                    />
                </Ch>

                <Ch n={16} title="문서 체계" id="doc-system">
                    <p>
                        본 방침은 연구소 AI 품질 문서 체계의 최상위 문서이며, 하위 문서로
                        구체화됩니다.
                    </p>
                    <Table
                        head={["등급", "코드 체계", "문서 예시"]}
                        rows={[
                            ["방침 (Policy)", <code key="a" className="font-mono text-[13.5px]">PLT-AI-POL-nnn</code>, <B key="a2">AI 품질 방침 (본 문서, PLT-AI-POL-001)</B>],
                            ["매뉴얼 (Manual)", <code key="b" className="font-mono text-[13.5px]">PLT-AI-MAN-nnn</code>, "AI 품질 매뉴얼"],
                            ["절차서 (Procedure)", <code key="c" className="font-mono text-[13.5px]">PLT-AI-PRC-nnn</code>, "거버넌스 운영, 리스크 관리, 자원(인원) 관리, 데이터 관리, 시정조치, 모니터링, 문서 관리 절차서"],
                            ["지침서 (Guideline)", <code key="d" className="font-mono text-[13.5px]">PLT-AI-GDL-nnn</code>, <span key="d2">개발 지침서, <B>사내 AI 이용 지침서</B></span>],
                            ["양식·기록 (Form/Record)", <code key="e" className="font-mono text-[13.5px]">PLT-AI-FRM-nnn</code>, <span key="e2">각종 계획서·점검표·보고서, <B>사내 AI 도구 대장</B></span>],
                            ["제품 문서 (Product)", <code key="f" className="font-mono text-[13.5px]">XGEN-nnn</code>, "제품설명서, 서비스운영정책서, 사용자피드백관리절차서, 이해관계자정의서 등"],
                        ]}
                    />
                </Ch>

                <Ch n={17} title="개정 이력" id="revisions">
                    <Table
                        head={["버전", "개정일", "개정 내용", "승인"]}
                        rows={[
                            [
                                <B key="v">v1.0</B>,
                                "2026-08-07",
                                "제정 — AI 품질 방침 최초 수립 및 대외 공개",
                                "플래티어 AI연구소 소장",
                            ],
                        ]}
                    />
                </Ch>

                <div className="mt-16 border-t border-[var(--color-line)] pt-8">
                    <p className="text-[15px] font-bold text-[var(--color-ink)]">
                        플래티어 AI연구소 (Plateer AI Lab)
                    </p>
                    <p className="mt-1.5 text-[14px] text-[var(--color-ink-subtle)]">
                        AI 품질·윤리 문의 및 AI 사고 신고 ·{" "}
                        <a
                            href={`mailto:${MAIL}`}
                            className="font-semibold text-[#2461d8] underline underline-offset-4"
                        >
                            {MAIL}
                        </a>
                    </p>
                    <Link
                        href={overviewHref}
                        className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        AI 품질 방침 개요로
                    </Link>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
