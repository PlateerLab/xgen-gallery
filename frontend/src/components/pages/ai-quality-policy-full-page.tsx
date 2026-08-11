import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { localePath } from "@/lib/locale-path";
import { POLICY_DOC } from "@/components/pages/ai-quality-policy-page";

/**
 * AI 품질 방침 — 전문.
 *
 * **AI-MASTER NEW1 증빙을 담당하는 페이지다.** 심사는 "방침이 문서로 관리·최신화되고
 * 외부에서 확인 가능한가"를 보므로 문서번호·버전·개정일·개정 이력을 제거하면 안 된다.
 *
 * 구성은 독자를 둘로 나눈다.
 *  - 01~10 + Our Commitment — 도입을 검토하는 B2B 고객이 읽는 서술. 신뢰성·안정성·보안·
 *    통제 가능성을 앞세우고, 원칙 -> 제품에서의 통제 -> 사고 대응 -> 공급자 책임 순으로 간다.
 *  - 부속 A1~A8 — 심사·보안검토·조달 담당이 확인하는 관리 체계 상세. 적용 범위, 거버넌스,
 *    역할과 책임, 리스크, 품질 목표, 법규가 여기 있다. **이 부속을 지우면 GOV-3(정량·정성
 *    목표), GOV-7·10·11(책임 체계), PRO-1·2(법규), PRO-28(소통 창구) 증빙이 함께 깨진다.**
 *
 * 한국어만 둔다 — 국내 인증 증빙용 법적 문서라 번역본과 정본이 어긋나면
 * 역할과 책임 조항에서 문제가 된다(영문 개요에서 이 페이지로 연결한다).
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
    lead,
    id,
    children,
}: {
    /** 01~10 은 숫자, 부속은 "A1" 같은 코드 */
    n: number | string;
    title: string;
    /** 장 제목 아래 한 줄 요약 — 서술 장에서만 쓴다. */
    lead?: string;
    id?: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="mt-14 scroll-mt-24 first:mt-10">
            <p className="font-mono text-[15px] font-bold text-[#2461d8]">
                {typeof n === "number" ? String(n).padStart(2, "0") : n}
            </p>
            <h2 className="mt-2 text-[21px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[26px]">
                {title}
            </h2>
            {lead ? (
                <p className="mt-3 text-[17px] font-semibold leading-relaxed text-[var(--color-ink)] md:text-[18px]">
                    {lead}
                </p>
            ) : null}
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

/** 품질 원칙 6종 — 이름과 한 문단 설명을 카드로 늘어놓는다. */
function PrincipleGrid({ items }: { items: [string, string][] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {items.map(([name, body]) => (
                <div
                    key={name}
                    className="rounded-2xl border border-[var(--color-line)] bg-white p-5"
                >
                    <p className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                        {name}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                        {body}
                    </p>
                </div>
            ))}
        </div>
    );
}

const B = ({ children }: { children: React.ReactNode }) => (
    <b className="font-bold text-[var(--color-ink)]">{children}</b>
);

const MAIL = "xgen@plateer.com";

const PRINCIPLES: [string, string][] = [
    ["신뢰성", "AI 기능과 서비스가 정의된 목적과 기준에 따라 일관되게 동작하도록 개발하고 검증합니다."],
    ["안정성", "예상하지 못한 입력이나 장애, 시스템 변화에도 서비스의 안정성을 유지할 수 있도록 지속적으로 점검하고 개선합니다."],
    ["안전성", "AI가 허용된 범위 안에서 동작하도록 위험 요소를 사전에 식별하고 필요한 보호 장치를 적용합니다."],
    ["보안 및 개인정보 보호", "기업의 데이터와 개인정보가 AI 처리 과정에서 안전하게 보호될 수 있도록 접근 권한과 데이터 보호 정책을 적용합니다."],
    ["통제 가능성", "AI가 어떤 데이터와 도구를 사용하고 무엇을 실행했는지 확인할 수 있도록 관리하고, 필요한 경우 사람이 개입하고 통제할 수 있도록 합니다."],
    ["책임성", "AI의 개발과 운영 과정에서 플랫폼 공급자와 도입 고객사의 역할과 책임을 명확하게 정의합니다."],
];

export function AiQualityPolicyFullPageContent({
    overviewHref,
}: {
    /** 개요 페이지 주소 */
    overviewHref: string;
}) {
    return (
        <>
            <SiteNav />
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

                    <p className="mt-8 max-w-3xl text-[19px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[22px]">
                        신뢰할 수 있는 Enterprise AI는 명확한 기준에서 시작됩니다.
                    </p>
                    <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                        플래티어 AI연구소는 설계부터 개발·검증·운영까지 AI의 신뢰성과 안정성을
                        관리하고, 기업이 AI를 직접 통제할 수 있는 환경을 제공합니다.
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
                                ["검토", "플래티어 AI연구소 총괄책임자 남덕현"],
                                ["승인", "AI 거버넌스 위원회 — 승인 대기"],
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
                <section className="space-y-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                    <h2 className="text-[22px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[26px]">
                        신뢰할 수 있는 Enterprise AI는 명확한 기준에서 시작됩니다
                    </h2>
                    <p>
                        플래티어 AI연구소는 AI의 성능뿐 아니라{" "}
                        <B>신뢰성, 안정성, 보안, 통제 가능성</B>을 Enterprise AI의 핵심 품질로
                        봅니다.
                    </p>
                    <p>
                        AI가 기업의 데이터와 시스템에 연결되고 실제 업무를 수행할수록 높은 성능만
                        으로는 충분하지 않습니다. 어떤 데이터와 시스템에 접근하는지, 어떤 결과와
                        실행을 만들어냈는지 확인할 수 있어야 하며, 예상하지 못한 문제가 발생했을 때
                        이를 통제하고 대응할 수 있어야 합니다.
                    </p>
                    <p>
                        플래티어 AI연구소는 이러한 원칙을 XGEN의 설계와 개발, 검증, 배포, 운영 전
                        과정에 적용합니다.
                    </p>
                </section>

                <Ch
                    n={1}
                    title="AI 품질 원칙"
                    lead="성능을 넘어 신뢰할 수 있는 AI를 만듭니다"
                    id="principles"
                >
                    <p>
                        Enterprise AI는 정확하게 동작하는 것뿐만 아니라 기업이{" "}
                        <B>안심하고 지속적으로 운영할 수 있어야 합니다.</B> 플래티어 AI연구소는
                        다음 원칙을 기반으로 AI 품질을 관리합니다.
                    </p>
                    <PrincipleGrid items={PRINCIPLES} />
                </Ch>

                <Ch
                    n={2}
                    title="개발부터 운영까지 이어지는 AI 품질관리"
                    lead="AI 품질은 출시 이후가 아니라 설계 단계부터 관리합니다"
                    id="lifecycle"
                >
                    <p>
                        플래티어 AI연구소는 AI 품질을 개발 완료 후 확인하는 별도의 활동으로 보지
                        않습니다.
                    </p>
                    <p className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-4 text-center text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                        설계 → 개발 → 검증 → 배포 → 운영 → 개선
                    </p>
                    <p>전체 과정에 품질관리 기준을 적용합니다.</p>
                    <p>
                        AI 기능을 설계할 때 예상되는 위험을 확인하고, 개발 단계에서는 보안과 권한,
                        데이터 보호 및 AI 통제 기준을 적용합니다. 배포 전에는 정의된 품질 기준에
                        따라 기능과 성능을 검증하며, 운영 과정에서 발견된 문제와 개선사항은 다시
                        제품 개발에 반영합니다.
                    </p>
                    <p>
                        이를 통해 AI 품질관리가 일회성 검증에 그치지 않고 제품의 지속적인 개선으로
                        이어지도록 합니다.
                    </p>
                </Ch>

                <Ch
                    n={3}
                    title="검증 가능한 AI"
                    lead="AI의 품질과 변경 과정을 확인할 수 있도록 관리합니다"
                    id="verifiable"
                >
                    <p>
                        Enterprise AI는 결과뿐 아니라{" "}
                        <B>어떻게 개발되고 변경되었는지 확인할 수 있어야 합니다.</B>
                    </p>
                    <p>
                        플래티어 AI연구소는 AI 모델, 프롬프트, 지식 데이터, Agent 및 주요 정책의
                        변경 사항을 관리하고 필요한 개발·검증 기록을 유지합니다.
                    </p>
                    <p>
                        AI 기능의 변경이 품질과 안전성에 미치는 영향을 검토하고, 주요 변경 사항은
                        테스트와 검증을 거쳐 제품에 반영합니다.
                    </p>
                    <p>
                        이를 통해 문제가 발생했을 때 원인을 확인하고 필요한 조치를 수행할 수 있는
                        관리체계를 운영합니다.
                    </p>
                </Ch>

                <Ch
                    n={4}
                    title="사람이 통제할 수 있는 AI"
                    lead="AI가 스스로 모든 것을 결정하도록 하지 않습니다"
                    id="human-control"
                >
                    <p>
                        Enterprise AI에서 중요한 것은 AI의 자율성을 높이는 것만이 아니라{" "}
                        <B>기업이 AI의 행동을 관리하고 통제할 수 있도록 하는 것</B>입니다.
                    </p>
                    <p>
                        XGEN은 사용자와 Agent의 권한을 구분하고, 접근 가능한 데이터와 실행 가능한
                        도구의 범위를 관리할 수 있도록 설계합니다.
                    </p>
                    <p>
                        중요한 업무와 의사결정에서는 필요한 경우 사람이 검토하고 승인할 수 있도록
                        하며, AI의 주요 활동을 확인할 수 있는 관리 기능을 제공합니다.
                    </p>
                    <Note>
                        AI의 자동화 수준이 높아지더라도{" "}
                        <B>최종적인 통제 권한은 기업이 유지할 수 있도록 하는 것</B>이 XGEN의 기본
                        원칙입니다.
                    </Note>
                </Ch>

                <Ch
                    n={5}
                    title="기업 데이터를 보호하는 AI"
                    lead="기업의 데이터는 기업의 통제 범위 안에서 관리되어야 합니다"
                    id="data-protection"
                >
                    <p>Enterprise AI에서는 모델의 성능만큼 데이터 보호가 중요합니다.</p>
                    <p>
                        XGEN은 기업의 보안 정책과 IT 환경을 고려하여 구축할 수 있으며, 사용자 권한과
                        데이터 접근 범위를 기반으로 AI의 정보 접근을 관리합니다.
                    </p>
                    <p>
                        개인정보와 민감정보에 대한 보호 정책을 적용하고 AI가 허용되지 않은 데이터에
                        접근하거나 이를 부적절하게 사용하는 위험을 줄이기 위한 관리·통제 기능을
                        제공합니다.
                    </p>
                    <p>
                        특히 보안과 데이터 주권이 중요한 기업에서는{" "}
                        <B>기업이 관리하는 인프라 안에서 AI를 운영할 수 있는 환경</B>을 제공합니다.
                    </p>
                </Ch>

                <Ch
                    n={6}
                    title="AI 위험을 사전에 관리합니다"
                    lead="문제가 발생한 이후의 대응보다 사전 예방을 우선합니다"
                    id="risk"
                >
                    <p>
                        AI는 잘못된 정보 생성, 개인정보 노출, 부적절한 콘텐츠 생성, 권한을 벗어난
                        실행 등 기존 소프트웨어와 다른 유형의 위험을 가질 수 있습니다.
                    </p>
                    <p>
                        플래티어 AI연구소는 AI 기능의 특성과 활용 목적에 따라 발생 가능한 위험을
                        식별하고 필요한 관리 기준과 보호 장치를 적용합니다.
                    </p>
                    <p>
                        개발과 검증 과정에서 발견된 위험은 개선 과제로 관리하며, 운영 과정에서
                        확인된 문제 역시 제품과 정책 개선에 반영합니다.
                    </p>
                    <p>
                        이를 통해{" "}
                        <B>AI 위험을 발견하고 대응하는 것에서 나아가, 가능한 위험을 사전에 줄이는 것</B>
                        을 목표로 합니다.
                    </p>
                </Ch>

                <Ch
                    n={7}
                    title="문제가 발생하면 원인을 확인하고 개선합니다"
                    lead="AI 품질관리는 문제를 숨기지 않고 개선하는 과정입니다"
                    id="incident"
                >
                    <p>
                        AI 서비스에서 오류나 취약점, 예상하지 못한 동작이 확인된 경우 정해진 절차에
                        따라 문제를 분석하고 필요한 조치를 수행합니다.
                    </p>
                    <p>
                        영향 범위를 확인하고 필요한 경우 관련 고객에게 정보를 제공하며, 동일한
                        문제가 반복되지 않도록 제품과 개발·운영 기준을 개선합니다.
                    </p>
                    <p>
                        운영 과정에서 얻은 경험은 다시 제품 개발에 반영하여 XGEN의 신뢰성과
                        안정성을 지속적으로 높여갑니다.
                    </p>
                </Ch>

                <Ch
                    n={8}
                    title="역할과 책임을 명확하게 합니다"
                    lead="Enterprise AI의 안정적인 운영은 공급자와 고객의 역할이 명확할 때 가능합니다"
                    id="responsibility"
                >
                    <p>
                        플래티어 AI연구소는 XGEN 플랫폼의 품질과 안정성, 제품에 포함된 AI 관리·통제
                        기능, 제품 결함과 취약점 대응, 버전 관리 및 기술지원에 대한 책임을
                        수행합니다.
                    </p>
                    <p>
                        도입 고객사는 XGEN을 기반으로 구성한 AI Agent와 Workflow의 업무 적합성,
                        연계 데이터의 적법성과 품질, 외부 AI 모델 및 서비스의 선택, AI 결과에 대한
                        업무적 검토와 최종 의사결정을 담당합니다.
                    </p>
                    <p>플래티어 AI연구소는 이러한 역할을 구분하는 데 그치지 않습니다.</p>
                    <p>
                        고객사가 AI를 안정적으로 운영하고 각자의 관리 책임을 수행할 수 있도록{" "}
                        <B>권한 관리, AI 정책, 가드레일, 감사 및 운영 관리 기능과 관련 가이드</B>를
                        제공합니다.
                    </p>
                    <Note>
                        <B>
                            고객이 AI를 책임 있게 운영할 수 있도록 필요한 관리·통제 환경을 함께
                            제공하는 것까지 플랫폼 공급자의 역할로 봅니다.
                        </B>
                        <br />
                        역할별 책임 범위와 연구소가 제공하는 통제 수단은{" "}
                        <a
                            href="#annex-responsibility"
                            className="font-semibold text-[#2461d8] underline underline-offset-4"
                        >
                            부속 A3
                        </a>
                        에 표로 정리되어 있습니다.
                    </Note>
                </Ch>

                <Ch
                    n={9}
                    title="우리가 먼저 적용하고 검증합니다"
                    lead="고객에게 제시하는 기준을 연구소 내부에 먼저 적용합니다"
                    id="self-applied"
                >
                    <p>
                        플래티어 AI연구소는 고객에게 제시하는 AI 품질과 운영 기준을 연구소의 AI
                        개발과 활용 과정에도 적용합니다.
                    </p>
                    <p>
                        연구소 내부에서 AI를 개발하고 사용하면서 발견한 문제와 개선사항을 제품에
                        반영하고, 실제 운영 경험을 기반으로 관리 기준을 지속적으로 개선합니다.
                    </p>
                    <p>이를 통해 정책과 실제 제품 운영이 분리되지 않도록 합니다.</p>
                    <p>
                        연구소 내부의 AI 이용 기준은 별도의{" "}
                        <B>「사내 AI 이용 지침서」</B>에 정하며, 승인된 도구의 사용, 기밀·개인정보
                        취급, AI 산출물의 검증 책임, 생성 이력 관리를 규정합니다. 이용 현황은{" "}
                        <B>반기 1회 점검</B>하여 AI 거버넌스 위원회에 보고합니다.
                    </p>
                    <Note>
                        <B>우리가 직접 적용하고 검증한 기준을 제품과 함께 고객에게 제공합니다.</B>
                    </Note>
                </Ch>

                <Ch
                    n={10}
                    title="지속적으로 검증하고 개선합니다"
                    lead="AI 품질은 한 번의 인증이나 검증으로 완성되지 않습니다"
                    id="continuous"
                >
                    <p>AI 모델과 기술, 기업의 활용 환경과 관련 규제는 계속 변화합니다.</p>
                    <p>
                        플래티어 AI연구소는 AI 품질관리 기준과 개발·운영 절차를 지속적으로 점검하고
                        개선합니다.
                    </p>
                    <p>
                        제품 운영 과정에서 발견된 문제, 고객의 요구사항, 기술 변화와 관련 기준을
                        검토하여 필요한 사항을 제품과 품질관리 체계에 반영합니다.
                    </p>
                    <p>인증은 이러한 활동의 결과를 확인하는 하나의 과정입니다.</p>
                    <Note>
                        <B>
                            플래티어 AI연구소가 추구하는 목표는 인증 획득 자체가 아니라, 기업이
                            지속적으로 신뢰하고 운영할 수 있는 Enterprise AI를 만드는 것입니다.
                        </B>
                    </Note>
                </Ch>

                <section id="commitment" className="mt-20 scroll-mt-24 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-8">
                    <p className="font-mono text-[13px] font-bold uppercase tracking-widest text-[#2461d8]">
                        Our Commitment
                    </p>
                    <h2 className="mt-3 text-[21px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[26px]">
                        Enterprise AI의 신뢰는 제품과 운영체계가 함께 만들어갑니다
                    </h2>
                    <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                        <p>
                            플래티어 AI연구소는 AI의 가능성을 기업의 실제 업무로 연결하는 과정에서{" "}
                            <B>신뢰성과 안정성을 가장 중요한 기준 중 하나로 두고 있습니다.</B>
                        </p>
                        <p>
                            제품을 개발하는 것에서 끝나지 않고 기업이 AI를 안전하게 도입하고,
                            관리하고, 지속적으로 운영할 수 있도록 필요한 기술과 관리체계를 함께
                            발전시켜 나가겠습니다.
                        </p>
                        <p className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                            신뢰할 수 있는 AI를 만들고, 기업이 통제할 수 있는 AI를 제공합니다.
                        </p>
                    </div>
                </section>

                {/* ══════ 부속 — 관리 체계 상세 ══════ */}
                <PartHead>부속 — 품질 관리 체계</PartHead>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                    앞의 01~10은 연구소가 지키는 원칙과 그 이행 방식을 서술한 것입니다. 이 부속은
                    그 원칙이 <B>실제로 어떤 범위에, 어떤 조직과 절차로 적용되는지</B>를 정리한
                    것으로, 도입 검토·보안 심사·조달 요건 확인을 위해 상세 내용이 필요한 경우
                    참고하십시오.
                </p>

                <Ch n="A1" title="적용 범위" id="annex-scope">
                    <Table
                        head={["구분", "범위"]}
                        rows={[
                            ["대상 조직", "플래티어 AI연구소 및 AI 제품의 기획·개발·검증·공급·기술지원에 관여하는 모든 조직"],
                            ["대상 제품·서비스", <span key="p">엔터프라이즈 AI 플랫폼 <B>XGEN</B> 및 연구소가 개발·공급하는 모든 AI 기반 제품·솔루션</span>],
                            ["대상 사내 AI 이용", "개발·기획·운영 업무에 사용하는 코드 어시스턴트, 사내 AI 챗봇, XGEN 기반 에이전트 등 연구소가 개발·운영하는 AI 도구"],
                            ["AI 생명주기", "요구사항 정의 → 데이터 수집·준비 → 모델 개발·학습 → 검증·평가 → 배포(릴리즈) → 운영·모니터링 → 개선·재학습 → 폐기(지원 종료)"],
                            ["데이터 생명주기", "데이터 동기·개념화 → 명세 → 계획 → 획득 → 전처리 → 증강 → 사용 → 폐기"],
                            ["대상 인원", "임직원 전원, 협력사·외부 공급자 및 외부 AI 모델·서비스 제공자"],
                        ]}
                    />
                </Ch>

                <Ch n="A2" title="거버넌스 및 책임 체계" id="annex-governance">
                    <Table
                        head={["역할", "책임과 권한", "사내 대응 조직"]}
                        rows={[
                            [<B key="a">AI 최고책임자 (CAIO)</B>, <span key="a2">AI 전략·정책의 최종 승인, AI 리스크 허용 기준 결정, AI 품질조직 구성 및 유지관리, 품질활동·점검 결과 승인, <B>A3 역할과 책임 범위 내에서 제품 결함으로 발생한 피해에 대한 최종 책임</B></span>, "총괄책임자"],
                            [<B key="b">AI 거버넌스 위원회</B>, "AI 정책·윤리기준 심의 및 적정성 정기 평가, 고영향 AI 해당 여부 심의, 고위험 변경사항 승인·기각, 리스크 대응 방안 및 잔여 리스크 수용 여부 결정, 신규 모델·외부 AI 서비스 도입 및 지원종료 승인, 사내 AI 도구 도입 승인", "AI 거버넌스 협의체"],
                            [<B key="c">AI 품질책임자</B>, "품질계획 수립 및 품질지표 관리, 프로세스·산출물 검토 주관, 개발자의 검증·시험 결과를 확인하여 정기 릴리즈를 승인, 월간 품질 활동 보고", "AI 품질전담조직"],
                            [<B key="d">데이터 책임자 (CDO)</B>, "데이터 품질 정책 수립, 데이터 수집·품질·비식별화 관리, 데이터 리스크 식별, 개발·검증용 데이터의 획득·처리·파기 및 개인정보 보호 총괄", "데이터 관리 총괄"],
                            [<B key="e">AI 개발 책임자</B>, "개발 조직의 역할 분배, 과제 계획 수립·수행, 요구사항 구현·검토·시험 및 시정조치, 진행사항 정기 보고", "AI R&D 조직"],
                            [<B key="f">모델 검증 담당</B>, "모델·프롬프트의 품질·안전성 검증, 레드팀 테스트 수행", "AI R&D 조직 지정"],
                            [<B key="g">AI 사고 대응 조직</B>, "AI 사고·취약점의 접수·분석·조치, 영향받는 고객사 통지 및 재발 방지 대책 수립", "별도 지정"],
                            [<B key="h">내부감사 조직</B>, <span key="h2">방침 이행 여부를 감사하고 시정조치를 요구. <B>감사 수행자는 자신이 수행·관리한 업무를 감사하지 않는다</B>는 독립성 요건을 충족하도록 지정</span>, "별도 지정"],
                        ]}
                    />
                    <p>
                        역할은 겸직할 수 있으나{" "}
                        <B>내부감사 수행자는 AI 최고책임자·AI 품질책임자·데이터 책임자를 겸하지 않습니다.</B>{" "}
                        역할별 책임자 명단은 사내 게시판 및 사내 위키를 통해 내부 이해관계자에게
                        상시 게시합니다.
                    </p>
                    <H3>역량 관리</H3>
                    <p>
                        AI 개발·운영·검증 및 데이터 관리 참여 인원에 대해 역할별 필요 역량을
                        정의하고 <B>자격 확인 → 교육·훈련 → 역량 평가 → 재교육</B> 주기를
                        운영합니다. AI 정책·윤리 교육은 대상 인원 전원이 <B>연 1회 이상 필수</B>{" "}
                        이수합니다.
                    </p>
                    <p>
                        AI 거버넌스 위원회 구성원 및 AI 최종 책임 주체는 AI 특유의 위험(환각, 편향,
                        프롬프트 인젝션, 데이터 유출, 외부 도구 연계 오남용 등)에 대한 교육을{" "}
                        <B>연 1회 이상 필수</B>로 이수합니다.
                    </p>
                </Ch>

                <Ch n="A3" title="공급자와 도입 고객사의 역할과 책임" id="annex-responsibility">
                    <p>
                        연구소의 제품은{" "}
                        <B>고객사 인프라에 설치되어 고객사가 직접 운영</B>하는 형태로 공급됩니다.
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
                    <H3>연구소가 함께 제공하는 통제 수단</H3>
                    <Table
                        head={["고객사가 이행해야 할 것", "연구소가 제공하는 수단"]}
                        rows={[
                            ["사람의 감독과 최종 결정", "승인·중단 지점 설정, 실행 이력 조회, 긴급 차단"],
                            ["AI 행동 범위 제한", "가드레일 정책 설정, 통제 정책 관리, 콘텐츠 필터링"],
                            ["접근 권한 통제", "사용자·조직 관리, 역할 기반 권한(RBAC/ABAC)"],
                            ["운영 상황 관찰과 사후 추적", "실행 로그, 정책 로그, 감사 기록, 거버넌스 현황"],
                            ["데이터 관리와 파기", "지식·데이터 관리, 보유 및 파기 기능, 비식별화"],
                            ["편향·품질 점검", "평가 기능 및 로그 기반 지표"],
                            ["외부 모델·도구 연계 통제", "모델 공급자 관리, MCP 관리"],
                            ["안전한 도입·운영", "제품설명서, 사용자·관리자 매뉴얼, 도입 교육"],
                        ]}
                    />
                    <Note>
                        <B>개인정보 관련 문의 안내</B>
                        <br />
                        연구소의 제품은 고객사 인프라에 설치되어 운영되므로 해당 서비스의{" "}
                        <B>개인정보처리자는 도입 고객사</B>입니다. 특정 서비스에서 처리되는
                        개인정보에 관한 열람·정정·삭제 등의 요구는 해당 서비스를 운영하는 고객사의
                        개인정보 처리방침에 따라 주시기 바랍니다. 제품이 제공하는 개인정보 보호 기능
                        자체에 관한 문의는 A7의 창구로 접수해 주십시오.
                    </Note>
                </Ch>

                <Ch n="A4" title="AI 리스크 범주 및 모니터링" id="annex-risk">
                    <Table
                        head={["리스크 범주", "주요 리스크 항목"]}
                        rows={[
                            [<B key="r1">모델 리스크</B>, "환각(Hallucination), 편향(Bias), 성능 저하, 모델 드리프트"],
                            [<B key="r2">데이터 리스크</B>, "개인정보·민감정보 유출, 데이터 품질 저하, 저작권 침해"],
                            [<B key="r3">보안 리스크</B>, "프롬프트 인젝션, 탈옥(Jailbreak), 무단 접근, 모델 탈취, 공급망 위협"],
                            [<B key="r4">운영 리스크</B>, "서비스 장애, 응답 지연, 인프라 장애"],
                            [<B key="r5">법규준수 리스크</B>, "개인정보보호법·AI 기본법 등 관련 법규 위반"],
                            [<B key="r6">인력 리스크</B>, "필요 역량 미확보, 역할·책임 공백, 정책·윤리 인식 부족"],
                        ]}
                    />
                    <p>
                        리스크는 발생 확률과 영향도를 평가하여 등급을 산정하며, 중점관리 대상으로
                        선정된 리스크는 해소될 때까지 추적 관리합니다. 허용·비허용 기준과 등급별
                        대응 원칙은 AI 거버넌스 위원회의 승인을 거쳐 정합니다.
                    </p>
                    <p>
                        배포된 AI 시스템은{" "}
                        <B>성능·품질 / 데이터·모델 / 이상탐지·알림 / 지속적 개선</B> 네 축으로 상시
                        모니터링하며, 이상징후 확인 시 원인 분석과 재발 방지 대책을 수립하고 필요 시{" "}
                        <B>긴급 차단(Kill Switch)</B>으로 즉시 서비스를 차단할 수 있습니다.
                    </p>
                </Ch>

                <Ch n="A5" title="이행·점검 활동" id="annex-operations">
                    <Table
                        head={["활동", "주기", "산출물", "시행 시점"]}
                        rows={[
                            ["AI 품질 관리 활동 모니터링", "상시", "모니터링 관리 대장·이슈관리대장, 이상징후 보고서", "운영 중"],
                            [<span key="mq">월간 품질 활동 보고<br /><span className="text-[13px] text-[var(--color-ink-subtle)]">AI 품질책임자 → AI 최고책임자</span></span>, "월 1회", "AI 품질보증활동보고서", "운영 중"],
                            ["릴리즈 품질 검증", "릴리즈 시마다", "릴리즈 시험 결과서, 승인 기록, 릴리즈 노트", "운영 중"],
                            ["AI 거버넌스 위원회 정기 회의", "분기 1회 이상", "안건 제안서, 회의록, 회의 결과 보고서", "2026년 하반기"],
                            ["사내 AI 이용 현황 점검", "반기 1회", "AI 도구 대장", "2026년 하반기"],
                            ["리스크 재평가", "반기 1회 및 중대 이벤트 발생 시", "리스크 평가서, 리스크 조치 결과서", "2026년 하반기"],
                            ["영향 평가 (기본권·데이터)", "신규 에이전트·모델 도입 또는 처리 데이터 범위 변경 시, 착수 전", "영향성 평가 보고서", "2026년 하반기"],
                            ["내부감사", "연 1회 이상", "내부감사 절차 이행 보고서, 시정조치 계획 및 효과성 평가서", "2026년 하반기"],
                            [<span key="mr">경영검토 및<br />방침·정책 적정성 평가</span>, <span key="mr2">연 1회 이상<br />(통합 개최)</span>, "경영 검토 결과 보고서, 정책 적정성 평가 이행 기록서", "2026년 하반기"],
                        ]}
                    />
                    <Note>
                        &ldquo;2026년 하반기&rdquo;로 표시된 활동은 관련 절차와 운영체계가 확정되는
                        시점부터 <B>단계적으로 시행</B>합니다. 시행 결과는 지속적인 품질 개선에
                        활용합니다.
                    </Note>
                    <H3>AI 거버넌스 위원회 정기 회의 안건</H3>
                    <p>
                        거버넌스 및 전략 / 리스크 관리 / 모델 및 시스템 / 데이터 품질 / 공급망 및
                        보안 / 사고 및 운영 / 성과 및 개선 / 교육 및 조직역량
                    </p>
                    <H3>AI 사고 대응</H3>
                    <p>
                        사고 또는 취약점 확인 시{" "}
                        <B>접수 → 원인 분석 → 조치 → 영향받는 고객사 통지 → 재발 방지 대책 수립</B>{" "}
                        절차를 이행하며, 처리 결과와 재발 방지 대책은 AI 거버넌스 위원회 정기
                        회의에서 검토·승인됩니다.
                    </p>
                </Ch>

                <Ch n="A6" title="AI 품질 목표" id="annex-objectives">
                    <p>
                        연구소는 매년 조직 목표와 제품 품질 목표를 수립하고 달성 여부를 거버넌스
                        기구에 정기 보고합니다. 목표는 연 1회 AI 거버넌스 위원회의 심의를 거쳐
                        수립합니다.
                    </p>
                    <H3>조직 정량 목표 (2026년도)</H3>
                    <Table
                        head={["영역", "KPI", "목표", "측정 개시"]}
                        rows={[
                            ["정책관리", "AI 정책 제·개정 건수", "연 2회 이상", "운영 중"],
                            ["개발관리", "AI 프로젝트 표준 적용률", "100%", "2026년 하반기"],
                            ["개발관리", "개발 산출물 표준 준수율", "95% 이상", "2026년 하반기"],
                            ["위험관리", "리스크 평가 수행률", "100%", "운영 중"],
                            ["위험관리", "고위험 리스크 개선 완료율", "95% 이상", "2026년 하반기"],
                            ["데이터관리", "데이터 계보(Lineage) 확보율", "100%", "2026년 하반기"],
                            ["모델관리", "모델 검증 완료율", "100%", "운영 중"],
                            ["모델관리", "재학습 주기 준수율", "95% 이상", "자체 학습 모델 운용 시"],
                            ["규제대응", "내부감사 적합률", "95% 이상", "운영 중"],
                            ["규제대응", "보유 인증 등급 유지 (GS인증 1등급)", "유지", "운영 중"],
                            ["교육", "AI 교육 이수율", "95% 이상", "운영 중"],
                            ["교육", "AI 윤리 교육 이수율", "100%", "운영 중"],
                            ["운영", "사고 등급별 복구 목표시간 준수율", "95% 이상", "운영 중"],
                            ["운영", "중대(P1) 인시던트 발생 건수", "연 1건 이하", "운영 중"],
                        ]}
                    />
                    <Note>
                        &ldquo;2026년 하반기&rdquo;로 표시된 지표는 관련 기준과 운영체계가 확정되는
                        시점부터 <B>단계적으로 측정·관리</B>합니다. 측정 결과는 지속적인 품질
                        개선에 활용합니다.
                    </Note>
                    <H3>제품 품질 목표 (2026년도)</H3>
                    <Table
                        head={["구분", "품질 지표", "목표 수준", "검증 방법"]}
                        rows={[
                            ["모델 품질", "응답 정확도 / 근거성(Groundedness)", "내부 품질 기준에 따름", "테스트셋 기반 정량 평가"],
                            ["모델 품질", "환각(Hallucination) 발생률", "내부 품질 기준에 따름", "RAG 근거 대조 평가"],
                            ["보안", <B key="s0">프롬프트 인젝션 레드팀 테스트 수행률</B>, <B key="s1">100%</B>, "릴리즈 전 레드팀 테스트"],
                            ["프라이버시", "개인정보·민감정보 마스킹 적용률", <B key="s2">100%</B>, "데이터 파이프라인 점검"],
                            ["성능", "응답 지연시간(Latency)", "서비스별 내부 기준 이내", "부하 테스트"],
                            ["운영", "서비스 가용성(Availability)", "내부 품질 기준에 따름", "모니터링 대시보드"],
                            ["투명성", "감사 로그(Audit Log) 기록율", <B key="s3">100%</B>, "로그 감사"],
                        ]}
                    />
                    <Note>
                        프롬프트 인젝션에 대한 완전한 방어는 현재 기술 수준에서 보장할 수 없습니다.
                        연구소는 방어 성공률을 공약하는 대신{" "}
                        <B>모든 릴리즈에 대해 레드팀 테스트를 빠짐없이 수행할 것</B>을 약속하며,
                        탐지된 취약점은 사고 대응 절차에 따라 조치합니다.
                    </Note>
                    <H3>정성 목표 (2026년도)</H3>
                    <p>
                        현업이 쉽게 이해하고 활용할 수 있는 정책 제공 / 개발자 만족도 향상 / AI
                        위험을 사전에 발견하는 조직 문화 정착 / 데이터 활용 신뢰성 확보 / 설명
                        가능한 AI 확보 / 감사 대응 역량 향상 / AI 활용 문화 확산 / 고객사와 최종
                        사용자의 신뢰 확보
                    </p>
                </Ch>

                <Ch n="A7" title="관련 법규 및 이해관계자 소통" id="annex-compliance">
                    <Table
                        head={["구분", "명칭", "관련 내용"]}
                        rows={[
                            ["국내 법규", <B key="l1">AI 기본법</B>, "고영향 AI 해당 여부 판단, 사업자 책무, 투명성 확보 의무"],
                            ["국내 법규", "개인정보 보호법", "개인정보·민감정보의 수집·이용·파기 기준 준수"],
                            ["국내 법규", "지능정보화 기본법", "지능정보서비스 제공자로서의 책무 준수"],
                            ["국내 법규", "정보통신망법", "정보통신서비스 제공 관련 보안·이용자 보호 기준"],
                            ["국내 법규", "저작권법", "학습데이터 및 생성물의 저작권 이슈 검토"],
                            ["인증 기준", "AI-Master 인증기준", "AI 품질 문서체계 및 평가항목 충족"],
                            ["국제 표준", "ISO/IEC 25010·25059, ISO/IEC 42001", "소프트웨어·AI 품질 특성 및 AI 경영시스템"],
                        ]}
                    />
                    <p>
                        관련 법규 현황은 <B>연 1회 이상 재검토</B>하며, 제·개정이 있는 경우 본 방침
                        및 하위 문서를 개정합니다.
                    </p>
                    <H3>이해관계자 소통 창구</H3>
                    <p>
                        연구소는 도입 고객사, 고객사의 최종 사용자, 협력사·외부 모델 공급자,
                        규제기관, 임직원을 주요 이해관계자로 정의합니다.
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

                <Ch n="A8" title="방침의 관리·최신화 및 문서 체계" id="annex-maintenance">
                    <Ol
                        items={[
                            <span key="1">
                                본 방침은 <B>연 1회 이상 정기 검토</B>하며, 다음의 경우 수시로
                                개정합니다.
                                <ul className="mt-2 ml-1 space-y-1.5 text-[15px]">
                                    <li>· 관련 법령·규제(AI 기본법 등) 또는 국제표준의 제·개정</li>
                                    <li>· 중대한 AI 사고·취약점 또는 내부감사·경영검토 결과 개선 필요 사항 도출</li>
                                    <li>· 사업 범위, 제품 구성 또는 역할과 책임 기준의 중대한 변경</li>
                                    <li>· 사내 AI 이용 환경의 중대한 변경</li>
                                    <li>· 01장 품질 원칙의 이행 점검 결과 보완이 필요한 경우</li>
                                </ul>
                            </span>,
                            "개정안은 AI 거버넌스 위원회의 심의와 AI 최고책임자의 승인을 거쳐 확정합니다.",
                            <span key="3">확정된 방침은 <B>본 홈페이지에 상시 공개</B>하며, 개정 시 개정 이력과 함께 즉시 갱신하여 외부 이해관계자가 최신본을 확인할 수 있도록 합니다.</span>,
                            <span key="4">내부 이해관계자에게는 사내 위키·게시판 게시 및 <B>연 1회 이상의 필수 교육</B>을 통해 방침과 AI 개발·활용 원칙을 지속적으로 상기시킵니다. 교육 이행 내역은 기록으로 보관합니다.</span>,
                        ]}
                    />
                    <H3>문서 체계</H3>
                    <Table
                        head={["등급", "코드 체계", "문서 예시"]}
                        rows={[
                            ["방침 (Policy)", <code key="a" className="font-mono text-[13.5px]">PLT-AI-POL-nnn</code>, <B key="a2">AI 품질 방침 (본 문서, PLT-AI-POL-001)</B>],
                            ["방침 부속서 (Annex)", <code key="a3" className="font-mono text-[13.5px]">PLT-AI-POL-nnn-X</code>, "품질 목표 세부 기준 (PLT-AI-POL-001-A, 내부 문서)"],
                            ["매뉴얼 (Manual)", <code key="b" className="font-mono text-[13.5px]">PLT-AI-MAN-nnn</code>, "AI 품질 매뉴얼"],
                            ["절차서 (Procedure)", <code key="c" className="font-mono text-[13.5px]">PLT-AI-PRC-nnn</code>, "문서 관리, 거버넌스 운영, 리스크 관리, 영향성 평가, 데이터 관리, 자원(인원) 관리, 모니터링, 시정조치, 공급 관리 절차서"],
                            ["지침서 (Guideline)", <code key="d" className="font-mono text-[13.5px]">PLT-AI-GDL-nnn</code>, "개발 지침서, 사내 AI 이용 지침서"],
                            ["양식·기록 (Form/Record)", <code key="e" className="font-mono text-[13.5px]">PLT-AI-FRM-nnn</code>, "각종 계획서·점검표·보고서, 사내 AI 도구 대장"],
                            ["제품 문서 (Product)", <code key="f" className="font-mono text-[13.5px]">XGEN-nnn</code>, "제품설명서, 서비스운영정책서, 사용자피드백관리절차서, 이해관계자정의서 등"],
                        ]}
                    />
                </Ch>

                <Ch n="A9" title="개정 이력" id="annex-revisions">
                    <Table
                        head={["버전", "개정일", "개정 내용", "검토"]}
                        rows={[
                            [
                                <B key="v1">v1.0</B>,
                                "2026-08-07",
                                "제정 — AI 품질 방침 최초 수립 및 대외 공개",
                                "플래티어 AI연구소 총괄책임자",
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
