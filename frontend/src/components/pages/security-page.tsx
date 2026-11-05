import Link from "next/link";
import {
    ShieldCheck,
    ShieldAlert,
    Lock,
    Ban,
    ScanLine,
    ScrollText,
    Gauge,
    Layers,
    Check,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/scene-background";
import { SecurityCardSlider, type SecurityHeroCard } from "@/components/security-hero-slider";
import { JsonLd } from "@/components/json-ld";
import {
    AttackerViewArt,
    LayeredControlArt,
    GuardModelArt,
    DataProtectionArt,
    AuditLogArt,
    RiskGaugeArt,
} from "@/components/security-illustrations";
import { breadcrumbLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * Security & Governance — 공격자 시선 재검증 + 가드레일 3축(가드 모델·PII·금칙어) +
 * 감사 로그 + AI 위험도 등급 + 온프레미스 아키텍처 + FAQ.
 * 한국어(`/security-and-governance`)와 영어(`/en/...`)가 이 컴포넌트를 공유한다.
 */
interface SecCopy {
    ldHeadline: string;
    ldDescription: string;
    heroEyebrow: string;
    heroTitle: React.ReactNode;
    heroLead: string;
    heroCta: string;
    heroCtaSecondary: string;
    heroCardLabel: string;
    heroCards: SecurityHeroCard[];
    verifyTitle: string;
    verifyLead: string;
    verifyMethods: { icon: LucideIcon; en: string; sub: string; desc: string }[];
    verifyResultTitle: string;
    verifyStats: { value: string; label: string }[];
    verifyNote: string;
    layeredTitle: string;
    layeredLead: string;
    controls: { icon: LucideIcon; en: string; sub: string; desc: string }[];
    guardTitle: string;
    guardLead: string;
    categoriesTitle: string;
    categories: string[];
    preciseTitle: string;
    preciseDesc: string;
    failOpenTitle: string;
    failOpenDesc: string;
    dataTitle: string;
    dataLead: string;
    piiPoints: { title: string; desc: string }[];
    detectTitle: string;
    detectDesc: string;
    auditTitle: string;
    auditLead: string;
    logFields: [string, string][];
    riskTitle: string;
    riskLead: string;
    principlesTitle: string;
    principles: [string, string][];
    gradesTitle: string;
    grades: [string, string][];
    onpremTitle: string;
    onpremLead: string;
    onpremHighlights: { icon: LucideIcon; title: string; desc: string }[];
    onpremCta: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    ctaTitle: string;
    ctaLead: string;
    ctaButton: string;
}

const COPY: Record<Locale, SecCopy> = {
    ko: {
        ldHeadline: "XGEN 가드레일 · 통제 정책",
        ldDescription:
            "XGEN Agentic AI Platform의 보안·거버넌스 통제 — 가드 모델, PII 마스킹, 금칙어 필터, 감사 로그, AI 위험도 등급.",
        heroEyebrow: "Applied AI · Security & Governance",
        heroTitle: (
            <>
                공격자의 시선으로 검증하고
                <br />
                선언한 대로 통제합니다
            </>
        ),
        heroLead:
            "AI 에이전트의 권한과 데이터 접근, 승인, 실행 과정을 통제하고 추적합니다. 이 통제가 공격 상황에서도 작동하는지 격리 환경의 침투 테스트로 다시 확인합니다.",
        heroCta: "검증 내용 보기",
        heroCtaSecondary: "통제 체계 보기",
        heroCardLabel: "Security & Governance",
        heroCards: [
            {
                tag: "보안 통제",
                title: "공격자의 시선으로 검증된 Enterprise AI Security",
                desc: "권한 우회, 비로그인 요청, 설정 조회를 공격 방식으로 시도해 통제가 작동하는지 확인합니다.",
                cta: "검증 내용 보기",
                href: "#attacker-view",
            },
            {
                tag: "거버넌스 통제",
                title: "선언한 대로 통제되는 AI Governance",
                desc: "가드 모델·개인정보 마스킹·금칙어 필터와 감사 로그에 더해, AI 위험도를 심사하고 등급에 따른 결재선을 지정해 승인합니다.",
                cta: "통제 체계 보기",
                href: "#layered-control",
            },
        ],
        verifyTitle: "공격자의 시선으로 검증합니다",
        verifyLead:
            "권한 통제는 설정만으로 끝나지 않습니다. XGEN은 다른 사용자의 데이터에 접근할 수 있는지, 로그인 없이 내부 기능에 닿을 수 있는지를 공격자의 방식으로 시도해 확인합니다.",
        verifyMethods: [
            {
                icon: Lock,
                en: "Access Control Test",
                sub: "권한 우회 점검",
                desc: "API 자동 테스트, 설정 스캔, LLM 프로브와 테스트 계정으로 한 계정이 다른 계정의 데이터에 접근할 수 있는지 확인합니다.",
            },
            {
                icon: ScanLine,
                en: "Autonomous Pentest",
                sub: "자율 침투 테스트",
                desc: "AI가 공격 순서를 스스로 계획하는 오픈소스 도구 ARTEX로 인증·인가 경로를 다시 시험합니다.",
            },
            {
                icon: ShieldCheck,
                en: "Isolated Environment",
                sub: "격리 환경 검증",
                desc: "외부와 분리된 환경에 개발 버전을 별도로 구성해 점검하므로, 공용 개발 서버에는 영향을 주지 않습니다.",
            },
        ],
        verifyResultTitle: "재점검 결과",
        verifyStats: [
            { value: "0건", label: "기존 고위험 항목 재발" },
            { value: "96.5%", label: "비로그인 요청 차단율" },
            { value: "0건", label: "민감 정보 노출" },
        ],
        verifyNote:
            "2026년 11월 초 개발 버전을 점검한 결과로, 해당 버전과 점검 범위에 한정됩니다. 비로그인 요청 1,341건 중 1,294건이 차단됐고, 나머지 47건은 공개용 상태 정보와 잘못된 요청·없는 주소에 대한 응답입니다. 남은 개선 과제 3건은 조치 중이며, LLM·RAG 영역의 검증은 이어서 진행합니다.",
        layeredTitle: "3가지 축으로 통제하는 다층 가드레일",
        layeredLead:
            "XGEN의 통제 기능은 외부 가드 모델 기반 유해성 검토, 개인정보 탐지·마스킹, 금칙어 탐지·마스킹의 3가지 축으로 구성됩니다. 각 축은 독립적으로 켜고 끌 수 있으며, 탐지 이벤트는 항상 로그로 남습니다.",
        controls: [
            {
                icon: ShieldAlert,
                en: "Guard Model",
                sub: "가드레일 모델",
                desc: "외부 가드 모델이 사용자 입력을 LLM에 전달하기 전에 유해성을 검토하고, 안전하지 않은 요청은 호출 전에 차단합니다.",
            },
            {
                icon: Lock,
                en: "PII Masking",
                sub: "개인정보 탐지·마스킹",
                desc: "휴대폰번호·주민등록번호·이메일·계좌번호 등 개인정보를 정규식 정책으로 탐지해 LLM 전달·문서 임베딩 전에 마스킹합니다.",
            },
            {
                icon: Ban,
                en: "Forbidden Words",
                sub: "금칙어 탐지·마스킹",
                desc: "조직이 정의한 금칙어를 정규식 정책으로 탐지·마스킹합니다. PII 마스킹 이후에 적용되어 중복 처리를 방지합니다.",
            },
        ],
        guardTitle: "유해한 요청은 LLM에 닿기 전에 차단",
        guardLead:
            "가드 모델은 워크플로우 Agent 노드에서 활성화되며, 사용자 입력을 LLM에 전달하기 전에 검사합니다. 안전하지 않은 요청으로 판단되면 LLM을 호출하지 않고 차단 메시지를 반환합니다.",
        categoriesTitle: "탐지 카테고리",
        categories: [
            "폭력",
            "성적 콘텐츠",
            "불법 행위",
            "개인정보",
            "자해/자살",
            "비윤리 행위",
            "정치적 민감 주제",
            "저작권 위반",
            "Jailbreak",
        ],
        preciseTitle: "정밀 필터링 모드",
        preciseDesc:
            "켜면 판단이 모호한(Controversial) 결과까지 차단 대상으로 봅니다. 끄면 명백히 위험한(Unsafe) 요청만 차단합니다.",
        failOpenTitle: "보안 우선 운영 (fail-open)",
        failOpenDesc:
            "가드 모델 호출이 실패했을 때의 정책을 선택합니다. 보안 우선 환경에서는 통과 옵션을 꺼서, 장애 시에도 차단 정책으로 운영할 수 있습니다.",
        dataTitle: "개인정보와 금칙어를 원문에서 지운다",
        dataLead:
            "PII·금칙어 정책은 정규식 기반으로 동작하며, 정책명·정규식 패턴·활성 여부·마스킹 문자열·정책 버전으로 관리됩니다. 워크플로우 실행 시에는 개인정보 마스킹 후 금칙어 마스킹을 적용해, 먼저 가려진 영역이 다시 처리되지 않도록 합니다.",
        piiPoints: [
            {
                title: "워크플로우 Agent 실행 시",
                desc: "LLM에 전달하기 전 사용자 입력 텍스트에 마스킹을 적용합니다. 내부 프레임(시스템 라벨·JSON 키)이 있는 경우, 사용자 입력 값 부분에만 적용해 구조를 보존합니다.",
            },
            {
                title: "문서 업로드 시",
                desc: "업로드 전 사전검사로 정책과 매칭되는 항목을 보여주고, 선택한 정책만 실제 업로드·임베딩 전에 마스킹합니다.",
            },
            {
                title: "OCR 사용 시",
                desc: "OCR로 추가 추출된 텍스트에도 개인정보 보충 마스킹을 수행합니다.",
            },
        ],
        detectTitle: "사전 탐지 (detect-only)",
        detectDesc:
            "사용자가 텍스트를 전송하기 전에, 서버가 정규식 패턴을 노출하지 않고 개인정보·금칙어 포함 여부만 판별해 경고를 보여줍니다. 실제 마스킹이나 로그 적재 없이 입력 단계에서 위험을 미리 알립니다.",
        auditTitle: "모든 통제 이벤트를 감사 가능하게",
        auditLead:
            "PII·금칙어·가드 모델에 의해 탐지·차단된 이벤트는 통합 정책 이벤트 로그에 기록됩니다. 출처·정책 유형·사용자·워크플로우·컬렉션·기간으로 필터링해 조회할 수 있고, 정책의 생성·수정·삭제도 변경 이력과 버전으로 남습니다.",
        logFields: [
            ["탐지 출처", "워크플로우 Agent · 실행 메타 · Guarder · 문서 업로드 · 문서 OCR 보충"],
            ["정책 유형", "PII · 금칙어 · Guarder"],
            ["매칭 정보", "매칭된 정책 ID·정책명·탐지 건수·샘플 원문 및 마스킹 결과"],
            ["실행 컨텍스트", "워크플로우 ID · 실행 ID · 상호작용 ID · 노드 ID"],
            ["대상 정보", "컬렉션명 · 문서명"],
            ["사용자/세션", "사용자 정보 · 세션 ID · 생성 시각"],
        ],
        riskTitle: "워크플로우의 위험을 등급으로 관리",
        riskLead:
            "AI 위험도 등급 정책은 실시간 마스킹이 아니라, 워크플로우와 AI 서비스의 위험을 평가하기 위한 기준 정책입니다. 네 가지 원칙을 토대로 위험을 4단계로 구분해 통제 수준을 정합니다.",
        principlesTitle: "기본 원칙",
        principles: [
            ["합법성 원칙", "관련 법규 및 규제 준수"],
            ["신뢰성 원칙", "결과의 정확성 및 일관성 확보"],
            ["신의성실 원칙", "공정하고 책임 있는 운영"],
            ["보안성 원칙", "데이터 보호 및 보안 통제"],
        ],
        gradesTitle: "위험도 4등급",
        grades: [
            ["초고위험", "최상위 위험 수준 — 별도 통제 및 승인 절차 필요"],
            ["고위험", "높은 위험 수준 — 강화된 모니터링 대상"],
            ["중위험", "중간 위험 수준 — 일반 통제 적용"],
            ["저위험", "낮은 위험 수준 — 기본 통제 적용"],
        ],
        onpremTitle: "온프레미스·보안 아키텍처 위에서 통제가 완성됩니다",
        onpremLead:
            "지금까지의 통제 정책은 폐쇄망·온프레미스 배포를 전제로 설계되었습니다. 외부 요청은 인증 게이트웨이와 신뢰 경계를 통과한 뒤에만 내부 서비스·AI 모델·데이터에 접근하며, 모든 모델과 데이터는 내부망에서 운영됩니다.",
        onpremHighlights: [
            {
                icon: ShieldCheck,
                title: "신뢰 경계 기반 접근",
                desc: "외부 요청은 인증 게이트웨이에서 JWT를 신뢰 헤더로 변환한 뒤에만 내부 서비스에 도달합니다. 클라이언트가 권한 헤더를 직접 주입할 수 없습니다.",
            },
            {
                icon: Lock,
                title: "내부망·에어갭 운영",
                desc: "LLM 서빙·임베딩·가드 모델부터 벡터 DB·문서 스토리지까지, 모든 AI 모델과 데이터를 내부망 엔드포인트에서 운영합니다.",
            },
            {
                icon: Layers,
                title: "전 계층 정책 일관 적용",
                desc: "가드 모델·개인정보 마스킹·감사 로그·위험도 등급 통제가 특정 계층이 아니라 요청 경로 전체에 일관되게 적용됩니다.",
            },
        ],
        onpremCta: "온프레미스·보안 아키텍처 자세히 보기",
        faqTitle: "자주 묻는 질문",
        faq: [
            {
                q: "XGEN의 가드레일은 어떤 계층으로 구성되나요?",
                a: "외부 가드 모델 기반 유해성 검토, 정규식 기반 PII(개인정보) 탐지·마스킹, 금칙어 탐지·마스킹의 3가지 축으로 구성됩니다. 여기에 전송 전 사전 탐지(detect-only), 통합 감사 로그, AI 위험도 등급 정책이 거버넌스 계층으로 더해집니다.",
            },
            {
                q: "개인정보 마스킹은 어느 시점에 적용되나요?",
                a: "워크플로우 Agent가 LLM을 호출하기 전, 문서를 업로드·임베딩하기 전, 그리고 OCR로 추출한 텍스트에 각각 적용됩니다. 정규식 정책으로 탐지하며, 전체 기능 토글이 켜져 있을 때 실제 마스킹이 수행됩니다.",
            },
            {
                q: "가드 모델에 장애가 생기면 어떻게 되나요?",
                a: "'장애 시 안전 통과(fail-open)' 옵션으로 운영 정책을 선택할 수 있습니다. 보안 우선 환경에서는 이 옵션을 꺼서, 가드 모델 장애 시에도 요청을 차단하는 정책으로 운영할 수 있습니다.",
            },
            {
                q: "통제 이벤트는 감사에 활용할 수 있나요?",
                a: "PII·금칙어·가드 모델에 의해 탐지·차단된 이벤트는 통합 정책 이벤트 로그에 기록되며, 출처·정책 유형·사용자·워크플로우·컬렉션·기간으로 필터링해 조회할 수 있습니다. 정책의 생성·수정·삭제도 변경 이력과 버전으로 남습니다.",
            },
            {
                q: "XGEN의 보안 검증은 어떻게 진행하나요?",
                a: "API 자동 테스트, 설정 스캔, LLM 프로브와 테스트 계정으로 한 계정이 다른 계정의 데이터에 접근할 수 있는지 확인합니다. 이어서 AI가 공격 순서를 스스로 계획하는 오픈소스 도구 ARTEX로 인증·인가 경로를 다시 시험합니다. 점검은 외부와 분리된 격리 환경에 개발 버전을 별도로 구성해 진행합니다.",
            },
            {
                q: "비로그인 요청 차단율 96.5%는 무엇을 뜻하나요?",
                a: "2026년 11월 초 재점검에서 로그인 없이 보낸 요청 1,341건 중 1,294건이 차단된 비율입니다. 나머지 47건은 공개용 상태 정보와 잘못된 요청·없는 주소에 대한 응답입니다.",
            },
            {
                q: "재점검 결과는 어디까지 적용되나요?",
                a: "결과는 점검 시점의 개발 버전과 점검 범위에 한정되며, 실제 운영 환경의 보안 수준은 구성과 운영 정책에 따라 달라질 수 있습니다.",
            },
        ],
        ctaTitle: "검증 가능한 통제 위에서 AI를 운영합니다",
        ctaLead:
            "데이터 주권과 규제 준수가 필요한 금융·공공 환경을 전제로, 온프레미스에서도 동일한 통제 정책을 적용합니다. 도입 검토나 보안 요건 협의가 필요하시면 언제든 문의해 주세요.",
        ctaButton: "보안 요건 · 도입 문의",
    },
    en: {
        ldHeadline: "XGEN guardrails and control policies",
        ldDescription:
            "Security and governance controls in the XGEN Agentic AI Platform — guard models, PII masking, blocklist filters, audit logs, and AI risk grading.",
        heroEyebrow: "Applied AI · Security & Governance",
        heroTitle: (
            <>
                Tested through an attacker&apos;s eyes,
                <br />
                governed the way you declared
            </>
        ),
        heroLead:
            "XGEN controls and traces AI agent permissions, data access, approvals, and execution. We re-check these controls with penetration testing in an isolated environment to see whether they hold under attack.",
        heroCta: "See how we test",
        heroCtaSecondary: "See the control system",
        heroCardLabel: "Security & Governance",
        heroCards: [
            {
                tag: "Security controls",
                title: "Enterprise AI Security, tested through an attacker's eyes",
                desc: "We attempt permission bypass, unauthenticated requests, and configuration reads the way an attacker would, to check that controls hold.",
                cta: "See how we test",
                href: "#attacker-view",
            },
            {
                tag: "Governance controls",
                title: "AI Governance that works the way you declared",
                desc: "On top of guard models, PII masking, blocklist filters, and audit logs, XGEN assesses AI risk and routes approval through an approval line set by risk grade.",
                cta: "See the control system",
                href: "#layered-control",
            },
        ],
        verifyTitle: "Tested through an attacker's eyes",
        verifyLead:
            "Permission controls are not finished once they are configured. XGEN attempts what an attacker would: reaching another user's data, or internal functions without logging in.",
        verifyMethods: [
            {
                icon: Lock,
                en: "Access Control Test",
                sub: "Permission bypass checks",
                desc: "Automated API tests, configuration scans, LLM probes, and test accounts check whether one account can reach another's data.",
            },
            {
                icon: ScanLine,
                en: "Autonomous Pentest",
                sub: "Autonomous penetration testing",
                desc: "ARTEX, an open-source tool in which AI plans its own attack sequence, re-tests authentication and authorization paths.",
            },
            {
                icon: ShieldCheck,
                en: "Isolated Environment",
                sub: "Testing in isolation",
                desc: "A development build runs in a separate environment cut off from external networks, so the shared development server is not affected.",
            },
        ],
        verifyResultTitle: "Re-test results",
        verifyStats: [
            { value: "0", label: "Recurrences of prior high-risk items" },
            { value: "96.5%", label: "Unauthenticated requests blocked" },
            { value: "0", label: "Sensitive data exposures" },
        ],
        verifyNote:
            "Results are from a development build tested in early November 2026 and apply only to that build and test scope. Of 1,341 unauthenticated requests, 1,294 were blocked; the other 47 were public status data or responses to malformed requests and nonexistent addresses. Three remaining improvement items are in progress, and validation of the LLM and RAG areas continues.",
        layeredTitle: "Layered guardrails on three axes",
        layeredLead:
            "XGEN's controls run on three axes: harm review by an external guard model, PII detection and masking, and blocklist detection and masking. Each axis can be switched on or off independently, and detection events are always logged.",
        controls: [
            {
                icon: ShieldAlert,
                en: "Guard Model",
                sub: "Guardrail model",
                desc: "An external guard model reviews user input for harm before it reaches the LLM, and unsafe requests are blocked before any call is made.",
            },
            {
                icon: Lock,
                en: "PII Masking",
                sub: "Personal data detection and masking",
                desc: "Regex policies detect phone numbers, national ID numbers, emails, account numbers, and similar data, masking them before the text reaches the LLM or gets embedded.",
            },
            {
                icon: Ban,
                en: "Forbidden Words",
                sub: "Blocklist detection and masking",
                desc: "Regex policies detect and mask the terms your organization has defined. Applied after PII masking, so nothing already hidden gets processed twice.",
            },
        ],
        guardTitle: "Harmful requests stop before they reach the LLM",
        guardLead:
            "The guard model activates at the workflow agent node and inspects user input before it goes to the LLM. If the request is judged unsafe, the LLM is never called and a block message is returned instead.",
        categoriesTitle: "Detection categories",
        categories: [
            "Violence",
            "Sexual content",
            "Illegal activity",
            "Personal data",
            "Self-harm / suicide",
            "Unethical conduct",
            "Politically sensitive topics",
            "Copyright infringement",
            "Jailbreak",
        ],
        preciseTitle: "Strict filtering mode",
        preciseDesc:
            "Switched on, borderline (controversial) results also count as blockable. Switched off, only clearly unsafe requests are blocked.",
        failOpenTitle: "Security-first operation (fail-open)",
        failOpenDesc:
            "Choose what happens when the guard model call fails. In a security-first environment you turn the pass-through option off, so requests stay blocked even during an outage.",
        dataTitle: "Personal data and blocked terms, removed from the source text",
        dataLead:
            "PII and blocklist policies run on regex and are managed by policy name, pattern, active state, mask string, and version. During workflow execution, PII masking runs first and blocklist masking second, so an area already hidden isn't processed again.",
        piiPoints: [
            {
                title: "During workflow agent execution",
                desc: "Masking is applied to the user's input text before it goes to the LLM. Where an internal frame exists (system labels, JSON keys), it applies only to the user-supplied values, preserving the structure.",
            },
            {
                title: "On document upload",
                desc: "A pre-check shows which items match your policies, and only the policies you select are masked before the actual upload and embedding.",
            },
            {
                title: "When OCR is used",
                desc: "Text pulled out by OCR gets a supplementary pass of personal-data masking as well.",
            },
        ],
        detectTitle: "Pre-detection (detect-only)",
        detectDesc:
            "Before the user sends any text, the server checks whether personal data or blocked terms are present — without exposing the regex patterns — and shows a warning. It flags the risk at the input stage, with no masking and nothing written to the log.",
        auditTitle: "Every control event, auditable",
        auditLead:
            "Events detected or blocked by PII, blocklist, or guard-model policies are written to a unified policy event log. You can filter by source, policy type, user, workflow, collection, and period, and policy creation, edits, and deletions are kept as change history with versions.",
        logFields: [
            ["Detection source", "Workflow agent · execution metadata · Guarder · document upload · OCR supplement"],
            ["Policy type", "PII · blocklist · Guarder"],
            ["Match details", "Matched policy ID and name, detection count, sample source text and masked result"],
            ["Execution context", "Workflow ID · execution ID · interaction ID · node ID"],
            ["Target", "Collection name · document name"],
            ["User / session", "User details · session ID · created at"],
        ],
        riskTitle: "Managing workflow risk by grade",
        riskLead:
            "The AI risk-grading policy is not real-time masking. It is the reference policy for assessing the risk of a workflow or AI service, sorting risk into four levels on four principles and setting the control level accordingly.",
        principlesTitle: "Core principles",
        principles: [
            ["Legality", "Compliance with applicable law and regulation"],
            ["Reliability", "Accuracy and consistency of results"],
            ["Good faith", "Fair and accountable operation"],
            ["Security", "Data protection and security controls"],
        ],
        gradesTitle: "Four risk grades",
        grades: [
            ["Critical", "Highest risk level — requires separate controls and an approval process"],
            ["High", "High risk level — subject to enhanced monitoring"],
            ["Medium", "Moderate risk level — standard controls apply"],
            ["Low", "Low risk level — baseline controls apply"],
        ],
        onpremTitle: "The controls are completed by the on-premise security architecture",
        onpremLead:
            "Every control policy above assumes air-gapped, on-premise deployment. An external request reaches internal services, AI models, and data only after passing the authentication gateway and the trust boundary, and every model and every piece of data runs on the internal network.",
        onpremHighlights: [
            {
                icon: ShieldCheck,
                title: "Trust-boundary access",
                desc: "An external request reaches internal services only after the authentication gateway converts its JWT into trusted headers. Clients cannot inject permission headers themselves.",
            },
            {
                icon: Lock,
                title: "Internal network and air-gap",
                desc: "From LLM serving, embedding, and guard models through to the vector DB and document storage, every AI model and every dataset runs on internal endpoints.",
            },
            {
                icon: Layers,
                title: "Policy applied consistently across layers",
                desc: "Guard models, PII masking, audit logs, and risk grading are not bound to one layer — they apply consistently across the whole request path.",
            },
        ],
        onpremCta: "More on the on-premise security architecture",
        faqTitle: "Frequently asked questions",
        faq: [
            {
                q: "What layers make up XGEN's guardrails?",
                a: "Three axes: harm review by an external guard model, regex-based PII detection and masking, and blocklist detection and masking. On top of those sits a governance layer — pre-send detection (detect-only), a unified audit log, and the AI risk-grading policy.",
            },
            {
                q: "When is PII masking applied?",
                a: "Before a workflow agent calls the LLM, before a document is uploaded and embedded, and again on text extracted by OCR. Detection runs on regex policies, and actual masking happens when the global feature toggle is on.",
            },
            {
                q: "What happens if the guard model fails?",
                a: "A fail-open option lets you choose the operating policy. In a security-first environment you turn it off, so requests are still blocked when the guard model is down.",
            },
            {
                q: "Can control events be used for audit?",
                a: "Events detected or blocked by PII, blocklist, or guard-model policies are written to a unified policy event log and can be filtered by source, policy type, user, workflow, collection, and period. Policy creation, edits, and deletions are also kept as change history with versions.",
            },
            {
                q: "How does XGEN test its security?",
                a: "Automated API tests, configuration scans, LLM probes, and test accounts check whether one account can reach another's data. ARTEX, an open-source tool in which AI plans its own attack sequence, then re-tests authentication and authorization paths. Testing runs on a development build in a separate environment cut off from external networks.",
            },
            {
                q: "What does the 96.5% block rate mean?",
                a: "In the early November 2026 re-test, 1,294 of 1,341 requests sent without logging in were blocked. The other 47 were public status data or responses to malformed requests and nonexistent addresses.",
            },
            {
                q: "How far do the re-test results apply?",
                a: "Results apply only to the development build and test scope at that time; the security of a production environment can vary with its configuration and operating policies.",
            },
        ],
        ctaTitle: "Run AI on controls you can verify",
        ctaLead:
            "Designed for finance and public-sector environments where data sovereignty and regulatory compliance are the starting point — the same control policies apply on-premise. Get in touch whenever you want to review adoption or work through security requirements.",
        ctaButton: "Talk about security requirements",
    },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
            {children}
        </p>
    );
}

export function SecurityPageContent({ locale }: { locale: Locale }) {
    const t = COPY[locale];
    const home = locale === "en" ? "/en" : "/";

    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        headline: t.ldHeadline,
                        description: t.ldDescription,
                        about: "Enterprise AI Security & Governance",
                        inLanguage: locale,
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: t.faq.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                        })),
                    },
                    breadcrumbLd([
                        { name: "Home", path: home },
                        { name: "Applied AI", path: localeHref(locale, "/solutions") },
                        {
                            name: "Security & Governance",
                            path: localeHref(locale, "/security-and-governance"),
                        },
                    ]),
                ]}
            />

            {/* Hero */}
            <section className="relative flex min-h-[520px] items-center overflow-hidden border-b border-white/10 py-28 text-white">
                <SceneBackground concept="solutions" />
                <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <p className="text-[16px] font-semibold tracking-tight text-[#5eead4]">
                            {t.heroEyebrow}
                        </p>
                        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                            {t.heroTitle}
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                            {t.heroLead}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#attacker-view"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                {t.heroCta}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </a>
                            <a
                                href="#layered-control"
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[15px] font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                {t.heroCtaSecondary}
                            </a>
                        </div>
                    </div>
                    <SecurityCardSlider label={t.heroCardLabel} cards={t.heroCards} locale={locale} />
                </div>
            </section>

            <main>
                {/* 다층 통제 체계 */}
                <section
                    id="layered-control"
                    className="scroll-mt-20 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr]">
                            <div>
                                <Eyebrow>Layered Control</Eyebrow>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                                    {t.layeredTitle}
                                </h2>
                                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.layeredLead}
                                </p>
                            </div>
                            <LayeredControlArt className="hidden lg:block" />
                        </div>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {t.controls.map((c) => (
                                <div
                                    key={c.en}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <c.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {c.en}
                                            </h3>
                                            <p className="text-[13.5px] font-semibold text-[#2461d8]">
                                                {c.sub}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 가드레일 모델 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr]">
                            <div>
                                <Eyebrow>Guard Model</Eyebrow>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                                    {t.guardTitle}
                                </h2>
                                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.guardLead}
                                </p>
                            </div>
                            <GuardModelArt className="hidden lg:block" />
                        </div>

                        <div className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.categoriesTitle}
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {t.categories.map((c) => (
                                        <span
                                            key={c}
                                            className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-[14px] font-medium text-[var(--color-ink-muted)]"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                    <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {t.preciseTitle}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {t.preciseDesc}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                    <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {t.failOpenTitle}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {t.failOpenDesc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PII + 금칙어 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr]">
                            <div>
                                <Eyebrow>Data Protection</Eyebrow>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                                    {t.dataTitle}
                                </h2>
                                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.dataLead}
                                </p>
                            </div>
                            <DataProtectionArt className="hidden lg:block" />
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.piiPoints.map((p) => (
                                <div
                                    key={p.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <Layers className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6 sm:flex-row sm:items-start">
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                <ScanLine className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.detectTitle}
                                </h3>
                                <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.detectDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 감사 로그 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr]">
                            <div>
                                <Eyebrow>Audit &amp; Compliance</Eyebrow>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                                    {t.auditTitle}
                                </h2>
                                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.auditLead}
                                </p>
                            </div>
                            <AuditLogArt className="hidden lg:block" />
                        </div>
                        <div className="mt-8 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
                            {t.logFields.map(([k, v]) => (
                                <div
                                    key={k}
                                    className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
                                >
                                    <div className="flex w-40 shrink-0 items-center gap-2">
                                        <ScrollText className="h-4 w-4 text-[#2f7bff]" />
                                        <span className="text-[15px] font-bold text-[var(--color-ink)]">
                                            {k}
                                        </span>
                                    </div>
                                    <p className="text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {v}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI 위험도 등급 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr]">
                            <div>
                                <Eyebrow>AI Risk Governance</Eyebrow>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                                    {t.riskTitle}
                                </h2>
                                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.riskLead}
                                </p>
                            </div>
                            <RiskGaugeArt className="hidden lg:block" />
                        </div>
                        <div className="mt-8 grid gap-4 lg:grid-cols-2">
                            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-[#2f7bff]" />
                                    <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {t.principlesTitle}
                                    </h3>
                                </div>
                                <ul className="mt-4 space-y-3">
                                    {t.principles.map(([k, v]) => (
                                        <li key={k} className="flex items-start gap-2">
                                            <Check className="mt-0.5 h-4 w-4 flex-none text-[#0f9d6f]" />
                                            <span className="text-[14.5px] leading-snug text-[var(--color-ink-muted)]">
                                                <strong className="font-semibold text-[var(--color-ink)]">
                                                    {k}
                                                </strong>{" "}
                                                — {v}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
                                <div className="flex items-center gap-2">
                                    <Gauge className="h-5 w-5 text-[#2f7bff]" />
                                    <h3 className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {t.gradesTitle}
                                    </h3>
                                </div>
                                <ul className="mt-4 space-y-3">
                                    {t.grades.map(([k, v]) => (
                                        <li key={k} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#2f7bff]" />
                                            <span className="text-[14.5px] leading-snug text-[var(--color-ink-muted)]">
                                                <strong className="font-semibold text-[var(--color-ink)]">
                                                    {k}
                                                </strong>{" "}
                                                — {v}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 온프레미스·보안 아키텍처 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <Eyebrow>On-Premise Architecture</Eyebrow>
                        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.onpremTitle}
                        </h2>
                        <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            {t.onpremLead}
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {t.onpremHighlights.map((h) => (
                                <div
                                    key={h.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <h.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {h.title}
                                    </h3>
                                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {h.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Link
                            href={localeHref(locale, "/architecture") + "#security"}
                            className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            {t.onpremCta}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* 공격자 시선 검증 */}
                <section
                    id="attacker-view"
                    className="scroll-mt-20 border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr]">
                            <div>
                                <Eyebrow>Attacker&apos;s View</Eyebrow>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                                    {t.verifyTitle}
                                </h2>
                                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                    {t.verifyLead}
                                </p>
                            </div>
                            <AttackerViewArt className="hidden lg:block" />
                        </div>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {t.verifyMethods.map((c) => (
                                <div
                                    key={c.en}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                            <c.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                                {c.en}
                                            </h3>
                                            <p className="text-[13.5px] font-semibold text-[#2461d8]">
                                                {c.sub}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10">
                            <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.verifyResultTitle}
                            </h3>
                            <dl className="mt-4 grid gap-6 border-y border-[var(--color-line)] py-6 md:grid-cols-3">
                                {t.verifyStats.map((v) => (
                                    <div key={v.label}>
                                        <dd className="text-4xl font-bold tracking-tight text-[var(--color-ink)]">
                                            {v.value}
                                        </dd>
                                        <dt className="mt-1 text-[15px] text-[var(--color-ink-muted)]">
                                            {v.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                            <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.verifyNote}
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-4xl px-6 py-24">
                        <Eyebrow>FAQ</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            {t.faqTitle}
                        </h2>
                        <div className="mt-8 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
                            {t.faq.map((f) => (
                                <div key={f.q} className="px-6 py-5">
                                    <h3 className="text-[16.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {f.q}
                                    </h3>
                                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <p className="font-mono text-[12px] uppercase tracking-widest text-white/45">
                            Trusted Enterprise AI
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-[40px]">
                            {t.ctaTitle}
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70">
                            {t.ctaLead}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href={
                                    localeHref(locale, "/contact") +
                                    "?from=security-governance"
                                }
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                {t.ctaButton}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
