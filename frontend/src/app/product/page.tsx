import Link from "next/link";
import Image from "next/image";
import {
    Workflow,
    Database,
    Cable,
    Rocket,
    LayoutDashboard,
    Lock,
    Server,
    ShieldCheck,
    BadgeCheck,
    Building2,
    FileText,
    ChevronRight,
    ArrowRight,
    Download,
    Sparkles,
    Compass,
    type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { ProductHero } from "@/components/product-hero";
import { PostDeploymentSupport } from "@/components/post-deployment-support";
import { PathFinderArt } from "@/components/pathfinder-art";
import { EasyModeArt } from "@/components/easy-mode-art";
import { SiteFooter } from "@/components/site-footer";
import { CertificationQuality } from "@/components/certification-quality";
import { SectionIndex } from "@/components/section-index";
import { LayerStackArt } from "@/components/layer-stack-art";
import { GovernanceArt } from "@/components/governance-art";
import { PillarArt, type PillarVariant } from "@/components/pillar-arts";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { SITE, absoluteUrl } from "@/lib/site";
import { getAllCases, PRODUCTS, INDUSTRIES } from "@/lib/customers";

export const metadata = pageMetadata({
    title: "XGEN — Enterprise Agentic AI Platform",
    description:
        "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·통제하는 온프레미스 Enterprise AI 플랫폼입니다. 에이전트플로우 캔버스·지식(RAG)·도구(MCP)·거버넌스로 코딩 없이 에이전트를 만들고 안전하게 운영합니다.",
    path: "/product",
});

/** 히어로 직후 트러스트 바 — 인증·운영·도입 실적(대외 공개 사실만). */
const TRUST: { icon: LucideIcon; label: string; sub: string }[] = [
    { icon: BadgeCheck, label: "GS인증 1등급", sub: "국가 공인 품질인증 · TTA" },
    { icon: ShieldCheck, label: "AI-MASTER", sub: "AI 신뢰성 인증 진행 중" },
    { icon: Server, label: "온프레미스 · 망분리", sub: "Air-gap 배포 지원" },
    { icon: Building2, label: "제주은행 등 도입", sub: "금융 · 공공 · 커머스" },
];

/** 문제 제기 — 도입이 현장에서 멈추는 이유(브로셔 오프너). */
const CHALLENGES: { q: string; desc: string; img: string; imgAlt: string }[] = [
    {
        q: "AI를 도입했지만, 파일럿에서 멈췄나요?",
        desc: "기술 검증에서 끝나고 실제 업무에 배포되지 못하는 AI 프로젝트가 많습니다.",
        img: "/product/challenge-1-pilot.svg",
        imgAlt: "검증·파일럿에서 멈추고 운영까지 배포되지 못하는 흐름 일러스트",
    },
    {
        q: "데이터와 시스템이 흩어져 있나요?",
        desc: "문서·지식·레거시가 분산돼 있어 AI가 조직의 맥락을 이해하지 못합니다.",
        img: "/product/challenge-2-silo.svg",
        imgAlt: "문서·데이터베이스·폴더가 연결되지 않고 흩어진 데이터 사일로 일러스트",
    },
    {
        q: "보안·규제 때문에 클라우드 AI를 못 쓰나요?",
        desc: "데이터 주권·감사·승인 요건 때문에 외부 AI를 도입하기 어렵습니다.",
        img: "/product/challenge-3-security.svg",
        imgAlt: "보안 방패가 데이터를 지키고 외부 클라우드 AI로의 전송이 차단된 일러스트",
    },
];

/** 숫자로 보는 XGEN — 실측 사실만(미검증 수치 금지). */
const STATS: { n: string; label: string; sub: string }[] = [
    { n: "100%", label: "온프레미스 운영", sub: "망분리·데이터 주권" },
    { n: "80+", label: "내장 도구·플러그인", sub: "커스텀 확장 가능" },
    { n: "1등급", label: "GS 국가 공인 인증", sub: "제3자 시험 검증" },
    { n: "11", label: "오픈소스 라이브러리", sub: "MIT · pip 설치" },
];

/** 브로셔 하이라이트 — 대형 스크린샷 + 카피 좌우 교차. */
/** 제품 페이지 섹션 목차 — 히어로 하단 스티키 인덱스 탭(SectionIndex 공용). */
const PRODUCT_SECTIONS = [
    { id: "platform", label: "제품 개요" },
    { id: "value", label: "도입 효과" },
    { id: "features", label: "핵심 기능" },
    { id: "core-tech", label: "핵심 기술" },
    { id: "roles", label: "역할별 경험" },
    { id: "on-premise", label: "온프레미스" },
    { id: "deployment", label: "도입·구축" },
    { id: "governance", label: "거버넌스" },
    { id: "certification", label: "인증·품질" },
    { id: "cases", label: "고객사례" },
    { id: "faq", label: "FAQ" },
];

/** 제품 개요 4축 — 파일럿을 넘어 실제 업무에 배포되는 기업용 AI의 근거. */
// XGEN 4대 핵심 가치 — 엔터프라이즈 AI의 한계를 넘는 네 축(최신 제품 덱 기준).
const PILLARS: { variant: PillarVariant; en: string; ko: string; desc: string }[] = [
    {
        variant: "orchestration",
        en: "Agentic AI",
        ko: "지능형 오케스트레이션",
        desc: "멀티에이전트 워크플로우와 태스크 라우팅을 통한 능동적 업무 자동화",
    },
    {
        variant: "reliability",
        en: "Zero Hallucination",
        ko: "무결점 신뢰성",
        desc: "하이브리드 RAG와 5단계 정밀 검색으로 환각을 최소화한 근거 기반(Grounded) 답변",
    },
    {
        variant: "routing",
        en: "Multi-LLM Routing",
        ko: "완벽한 유연성",
        desc: "GPT · Claude · Private LLM 등 벤더 종속 없이 업무 요건에 맞춘 동적 모델 선택",
    },
    {
        variant: "uptime",
        en: "Zero-Downtime",
        ko: "무중단 안정성",
        desc: "k3s 고가용성 아키텍처와 GitOps 기반 배포로 엔터프라이즈급 운영 환경 보장",
    },
];

/** 도입 효과 — XGEN 도입으로 달성하는 5대 혁신 효과(최신 제품 덱 기준). */
const EFFECTS: { en: string; ko: string; desc: string }[] = [
    {
        en: "Efficiency",
        ko: "업무 효율 향상",
        desc: "RAG 기반의 빠르고 정확한 정보 검색으로 사내 반복 업무 처리시간을 획기적으로 단축",
    },
    {
        en: "Risk Management",
        ko: "리스크 최소화",
        desc: "모델·데이터·보안에 이르는 5대 리스크를 사전 통제해 안전한 AI 환경 구축",
    },
    {
        en: "Trust",
        ko: "신뢰성 확보",
        desc: "환각 최소화와 투명한 근거 제시로 사내 AI 사용자의 높은 신뢰도 제고",
    },
    {
        en: "Flexibility",
        ko: "확장 유연성",
        desc: "Model Router 기반 멀티 LLM 운용으로 벤더 종속 없이 최적의 비용·성능 구조 확보",
    },
    {
        en: "Compliance",
        ko: "글로벌 규제 준수",
        desc: "AI-Master 인증기준과 데이터 보안 법규에 부합하는 투명한 거버넌스 실현",
    },
];

/** XGEN 특장점 — 비개발자·현업도 직접 만드는 접근성(이지모드·패스파인더). */
const DIFFERENTIATORS: {
    icon: LucideIcon;
    en: string;
    ko: string;
    tagline: string;
    desc: string;
    items: string[];
}[] = [
    {
        icon: Sparkles,
        en: "Easy Mode",
        ko: "이지모드",
        tagline: "코딩 없이, 약 90초면 에이전트가 완성됩니다",
        desc: "드래그&드롭 가이드형 빌더로 비개발자도 지식·프롬프트·도구를 조합해 에이전트를 생성·조립합니다. 만드는 즉시 채팅으로 바로 검증합니다.",
        items: [
            "드래그&드롭 노코드 빌드",
            "단계별 가이드형 구성",
            "약 90초 만에 생성·조립",
        ],
    },
    {
        icon: Compass,
        en: "PathFinder",
        ko: "패스파인더",
        tagline: "기존 시스템을 AI가 사용하는 Tool로 연결합니다",
        desc: "패스파인더는 웹 시스템과 API를 AI 에이전트가 사용할 수 있는 Agent Tool로 연결하는 기술입니다. 로그인부터 연결, 테스트, 등록까지 전 과정을 코드 없이 자동화하여, 기존 시스템을 빠르게 AI 업무 환경으로 확장합니다.",
        items: [
            "브라우저 자동화 기반 연결",
            "로그인·API·도구 등록·테스트 무코드",
            "현업이 직접 실행 도구화",
        ],
    },
];

/** 핵심 기능 6종 — 만들기 → 배포 → 통제로 이어지는 하나의 파이프라인. */
const FEATURES: {
    icon: LucideIcon;
    tag: string;
    ko: string;
    desc: string;
    items: string[];
}[] = [
    {
        icon: Workflow,
        tag: "Agentflow · Canvas",
        ko: "에이전트플로우 설계",
        desc: "캔버스에서 노드를 드래그&드롭으로 연결해 AI 업무 흐름을 시각적으로 설계합니다. 코딩 없이 LLM 호출·도구 실행·분기를 조합합니다.",
        items: ["노드 기반 시각 편집", "다중 Agent 협업 구성", "버전 관리 · 실행 로그"],
    },
    {
        icon: Database,
        tag: "Knowledge · RAG",
        ko: "지식 관리와 검색",
        desc: "문서를 컬렉션에 올리면 청크·임베딩을 거쳐 벡터 검색이 가능해집니다. 리랭커와 온톨로지로 정확도를 높이고, 응답에 출처(인용)를 함께 제시합니다.",
        items: ["컬렉션 · 파일 저장소 · DB 연동", "벡터 DB · 리랭커 · 온톨로지", "인용 기반 응답 생성"],
    },
    {
        icon: Cable,
        tag: "Tools · MCP",
        ko: "도구 연동과 확장",
        desc: "외부 API·함수를 Agent가 호출하는 도구로 등록하고, MCP 표준으로 모델과 외부 도구를 연결합니다. 인증 프로필로 키·토큰을 안전하게 관리합니다.",
        items: ["API 도구 등록 · 호출", "MCP 표준 연동", "인증 프로필 중앙 관리"],
    },
    {
        icon: Rocket,
        tag: "Deploy · Operate",
        ko: "배포와 운영",
        desc: "설계한 에이전트플로우를 사용자·외부 시스템이 호출할 수 있도록 배포합니다. 임베드 코드로 외부 웹에 삽입하고, 스케줄로 자동 실행합니다.",
        items: ["배포 · 임베드 · 공유", "스케줄 자동 실행 (Cron)", "버전 · 배포 상태 관리"],
    },
    {
        icon: ShieldCheck,
        tag: "AI Governance",
        ko: "AI 거버넌스",
        desc: "PII 마스킹, 위험 등급, 통제 정책으로 AI 사용을 관리합니다. 배포·거버넌스 이중 승인과 정기 점검, 감사 로그로 통제 요건을 충족합니다.",
        items: ["PII 마스킹 · 위험 등급", "이중 승인 · 정기 점검", "변경 이력 · 감사 로그"],
    },
    {
        icon: LayoutDashboard,
        tag: "Dashboard",
        ko: "대시보드 · 모니터링",
        desc: "역할별로 구성된 위젯으로 현황과 통계를 한눈에 봅니다. 실행 이력, 토큰 사용량, 시스템 상태를 관리자 관점에서 모니터링합니다.",
        items: ["역할별 위젯 대시보드", "실행 이력 · 토큰 사용량", "시스템 상태 모니터링"],
    },
];

/** 실제 제품 화면 — 핵심 기능 하단 쇼케이스(구 xgen.im 제품 UI). */
const SCREENS: { img: string; alt: string; caption: string; w: number; h: number }[] = [
    {
        img: "/product/agent-builder-canvas.png",
        alt: "XGEN 에이전트플로우 캔버스 — 사용자 질문 입력 → Agent(LLM) → AI 답변 출력, 지식 컬렉션 기반 검색 노드를 연결한 시각 워크플로우",
        caption: "에이전트플로우 캔버스",
        w: 1600,
        h: 900,
    },
    {
        img: "/product/screen-canvas.png",
        alt: "XGEN 워크플로우 캔버스 — 노드를 드래그&드롭으로 추가·연결해 에이전트 업무 흐름을 시각적으로 설계하는 화면",
        caption: "워크플로우 노드 편집",
        w: 1904,
        h: 894,
    },
    {
        img: "/product/screen-ontology.png",
        alt: "XGEN 온톨로지 — 기업 지식을 그래프로 구조화해 개념·관계를 연결한 지식 그래프 화면",
        caption: "온톨로지 지식 그래프",
        w: 1898,
        h: 905,
    },
    {
        img: "/product/screen-api-tool.png",
        alt: "XGEN API 도구 생성 — 외부 API·함수를 Agent가 호출하는 도구로 등록·연동하는 화면",
        caption: "API 도구 연동",
        w: 1913,
        h: 902,
    },
    {
        img: "/product/screen-approval.png",
        alt: "XGEN 배포 승인 결재 — 시스템 관리자와 거버넌스 담당자의 이중 승인으로 서비스 배포를 통제하는 화면",
        caption: "배포 승인 결재",
        w: 1904,
        h: 892,
    },
    {
        img: "/product/manage-intro.png",
        alt: "XGEN 통합 관리 센터 — 사용자 권한·Agent 운영·AI 거버넌스·시스템·데이터를 통합 관리하는 관리 설정 화면",
        caption: "통합 관리 센터",
        w: 1600,
        h: 900,
    },
    {
        img: "/product/modelops-catalog.png",
        alt: "XGEN LLM 모델 카탈로그 — OpenAI·Anthropic·Google 등 멀티 프로바이더 모델을 활성화하고 사용 현황을 관리하는 화면",
        caption: "LLM 모델 카탈로그",
        w: 1600,
        h: 900,
    },
    {
        img: "/product/screen-risk.png",
        alt: "XGEN AI 위험도 등급 평가 — 요청·응답의 위험도를 등급으로 분류·통제하는 AI 거버넌스 화면",
        caption: "AI 위험도 평가",
        w: 1902,
        h: 899,
    },
    {
        img: "/product/screen-teams.png",
        alt: "XGEN 팀 협업 — 팀 단위로 에이전트를 테스트하고 공유하는 협업 화면",
        caption: "팀 협업 · 에이전트 테스트",
        w: 1898,
        h: 892,
    },
];

/** 핵심 기능 6종과 짝지을 대표 제품 화면(FEATURES 순서 정렬 — 에디토리얼 페어링). */
const FEATURE_SCREENS = [
    SCREENS[0], // 에이전트플로우 설계 → 캔버스
    SCREENS[2], // 지식 관리와 검색 → 온톨로지
    SCREENS[3], // 도구 연동과 확장 → API 도구
    SCREENS[4], // 배포와 운영 → 배포 승인
    SCREENS[7], // AI 거버넌스 → AI 위험도
    SCREENS[5], // 대시보드·모니터링 → 통합 관리 센터
];
/** 에디토리얼 로우에 쓰이지 않은 나머지 화면 — 하단 보조 스트립. */
const EXTRA_SCREENS = [SCREENS[1], SCREENS[6], SCREENS[8]]; // 노드 편집·모델 카탈로그·팀 협업

/** 온프레미스 보안 3원칙 — 유출 차단·접근 세분화·제로 트레이닝. (구 xgen.im On-premise) */
const ONPREM: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: Lock,
        title: "외부 유출 원천 차단",
        desc: "온프레미스 구축으로 데이터가 외부로 유출되지 않고 안전하게 활용됩니다.",
    },
    {
        icon: Server,
        title: "망분리 · 폐쇄망 지원",
        desc: "인터넷과 분리된 망분리·에어갭(Air-gap) 환경에서도 배포·운영되며, 금융·공공의 폐쇄망 요건을 충족합니다.",
    },
    {
        icon: ShieldCheck,
        title: "제로 트레이닝 보장",
        desc: "고객사 데이터가 외부 모델의 학습 데이터로 활용되는 것을 기술적으로 방지합니다.",
    },
];

/** 도입·구축 — 반입에서 운영까지의 온프레미스 딜리버리 단계. */
const DEPLOY_STEPS: { no: string; title: string; desc: string }[] = [
    {
        no: "01",
        title: "반입",
        desc: "폐쇄망 반입 절차를 거쳐 고객 인프라(온프레미스·Air-gap)에 설치합니다.",
    },
    {
        no: "02",
        title: "실증 (PoC)",
        desc: "실제 데이터로 빠르게 검증하고 도메인 요건과 심사 룰을 확정합니다.",
    },
    {
        no: "03",
        title: "구축",
        desc: "도메인 도구·지식·에이전트를 조직 업무에 맞춰 구성하고 연계합니다.",
    },
    {
        no: "04",
        title: "운영",
        desc: "GitOps 파이프라인으로 통제된 배포·모니터링·개선을 지속합니다.",
    },
];
const DEPLOY_CHIPS = ["온프레미스", "망분리 · Air-gap", "GPU 서빙", "k3s HA", "Istio", "Blue-Green · Canary", "ArgoCD · GitOps"];

/** 개발자·도입 담당자용 리소스 스트립. */
const RESOURCES: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
    { icon: FileText, title: "Documentation", desc: "설치·구성·API 문서와 가이드", href: "/documentation" },
    { icon: Rocket, title: "Release Notes", desc: "버전별 신규 기능·변경 이력", href: "/releases" },
    { icon: Download, title: "XGEN 소개서", desc: "제품 개요·아키텍처 자료", href: "/resources" },
];

/** FAQ — GEO용 FAQPage JSON-LD와 화면 공용. */
const FAQ: { q: string; a: string }[] = [
    {
        q: "XGEN은 무엇인가요?",
        a: "XGEN은 기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·운영·통제하는 온프레미스 Enterprise AI 플랫폼(에이전트 개발 도구)입니다. 완성된 서비스를 납품하는 것이 아니라, XGEN 위에서 조직 업무에 맞는 에이전트를 만들어 운영합니다. Plateer Labs AI 연구소가 직접 설계·개발했습니다.",
    },
    {
        q: "어떤 LLM·파운데이션 모델을 사용할 수 있나요?",
        a: "특정 모델에 종속되지 않습니다. Qwen 등 오픈웨이트 모델과 자체 sLLM(Polar) 중에서 목적·비용·정확도에 맞춰 선택하고, 기업이 보유한 GPU·인프라 위에서 서빙합니다. 통합 관리 센터에서 LLM·벡터 DB 등 시스템 구성을 상세히 설정합니다.",
    },
    {
        q: "이미지·표·차트 같은 비텍스트 문서도 처리하나요?",
        a: "단순 텍스트 추출(OCR)을 넘어 VLM(Vision-Language Model) 기반으로 이미지·표·차트·그래프의 문맥까지 판독합니다. OCR은 VLM에 포함되는 기능이며, 필요 시 오픈웨이트 VLM 모델을 직접 서빙해 차트·그래프를 텍스트로 전환하고 벡터화해 답변에 활용합니다. 커머스·금융 현장에서 적용하고 있습니다.",
    },
    {
        q: "정제되지 않은 우리 데이터로도 지식 그래프(온톨로지)가 되나요?",
        a: "네. 데이터가 정돈돼 있지 않아도 수개월치를 축적해 온톨로지를 구성하면 같은 대상의 여러 표현(예: 미국·USA·미합중국)이 하나로 연결됩니다. 데이터가 풍부할수록 고도화하며 품질이 올라가고, 도메인 용어 매핑과 심사 룰 설계는 함께 진행합니다. 커머스·금융권 프로젝트에 지식 그래프를 도입한 경험이 있습니다.",
    },
    {
        q: "RAG·지식 그래프의 답변 품질은 어떻게 확보하나요?",
        a: "RAGAS 기반으로 전처리부터 답변 검증까지 품질을 점수화해 여러 영역에서 평가합니다. 또한 문서 형태에 따라 전처리 전략을 자동으로 선택합니다 — LLM이 문서 유형을 판단해 OCR·VLM 적용 여부와 청킹·오버랩 파라미터를 조정하는 적응형 파이프라인을 제공합니다.",
    },
    {
        q: "기존 레거시 시스템과 어떻게 연계하나요?",
        a: "별도 화면을 새로 만들지 않아도 됩니다. LLM·RAG 연동을 노드로 구성해 스니펫 코드로 제공하므로, 기존 시스템에 버튼 하나를 추가해 호출하는 방식이 가능합니다. XGEN은 전체가 플러그인 구조로, 80여 종의 기본 도구와 빠르게 만드는 커스텀 도구를 조합해 연계·커스터마이징 공수를 최소화합니다.",
    },
    {
        q: "에이전트가 잘못된 결과를 내면 어떻게 대응하나요?",
        a: "생성 단계에서 위험도 평가와 관리자 승인으로 1차 필터링하고, 운영 중 이상이 감지되면 어드민의 킬 스위치로 서비스를 즉시 중단할 수 있습니다. 정확도가 결정적으로 중요한 영역에는 휴먼인더루프를 적용해, AI가 업무를 완전히 대체하기보다 전처리·후처리로 활용도를 높이고 사람이 결과를 확인한 뒤 다음 단계로 진행하도록 설계합니다.",
    },
    {
        q: "데이터 보안은 어떻게 보장되나요?",
        a: "온프레미스로 구축돼 데이터가 외부로 나가지 않으며, 인터넷과 분리된 망분리·에어갭 환경까지 지원합니다. 역할·속성 기반 접근 제어(RBAC·ABAC)와 제로 트레이닝 보장으로 고객사 데이터가 외부 모델 학습에 쓰이지 않도록 기술적으로 차단합니다.",
    },
    {
        q: "코딩 없이 에이전트를 만들 수 있나요?",
        a: "네. Agentflow의 드래그 기반 Visual Canvas로 코딩 없이 워크플로우를 설계하고, 실시간 채팅으로 검증한 뒤 API·워크플로우로 배포할 수 있습니다.",
    },
    {
        q: "오픈소스 라이선스는 조달·법무 관점에서 안전한가요?",
        a: "XGEN을 구성하는 오픈소스는 MIT·Apache 2.0·BSD 계열로, 소스코드 공개 의무가 있는 GPL 계열을 사용하지 않아 상용·내부 배포 시 소스코드 공개 의무가 없습니다. 라이선스 유형별 의무사항(저작권 고지·NOTICE 등)을 점검해 제공하며, 필요 시 구성 요소별 라이선스 명세를 함께 정리해 드립니다.",
    },
];

/** Enterprise Trust — AI 거버넌스 통제 요건(3-레이어 권한·이중 승인·PII·감사). */
const GOV: { title: string; desc: string }[] = [
    {
        title: "3-레이어 권한",
        desc: "등급(Standard/SuperUser) · 역할(Role) · 권한(ABAC 키)의 독립 레이어로 화면·버튼 단위까지 접근을 게이팅합니다.",
    },
    {
        title: "이중 승인 배포",
        desc: "서비스화에는 시스템 관리자의 배포 승인과 거버넌스 담당자의 승인, 두 단계 통과가 필수입니다.",
    },
    {
        title: "PII 마스킹 · 위험 등급",
        desc: "개인식별정보를 자동 마스킹하고, 요청·응답의 위험도를 등급으로 분류·통제합니다.",
    },
    {
        title: "감사 로그 · 정기 점검",
        desc: "사용자 활동과 시스템 이벤트를 보존하고, 배포된 Agent를 주기적으로 점검합니다.",
    },
    {
        title: "비인가 접근 방지",
        desc: "MFA(OTP) · 접속 IP 허용목록 · 세션 타임아웃을 함께 적용해 허가된 사용자만 접근하도록 다층 통제합니다.",
    },
    {
        title: "개발부터 내재화된 보안",
        desc: "OWASP ZAP을 개발·CI/CD 파이프라인에 내장해 배포 전 취약점을 자동 점검하는 Shift-Left 보안을 적용합니다.",
    },
];

/** 역할별 경험 — 같은 URL이라도 역할·권한에 따라 다른 화면. */
const ROLES: { en: string; ko: string; desc: string }[] = [
    {
        en: "Standard User",
        ko: "일반 사용자",
        desc: "Agent로 업무를 처리하고, 공지·FAQ·1:1 문의로 지원받습니다.",
    },
    {
        en: "Agent Developer",
        ko: "Agent 개발자",
        desc: "캔버스에서 Agent를 설계하고, 도구·지식을 연동해 배포를 요청합니다.",
    },
    {
        en: "System Admin",
        ko: "시스템 관리자",
        desc: "사용자·권한·LLM·시스템을 운영하고 배포를 승인합니다.",
    },
    {
        en: "Governance Officer",
        ko: "거버넌스 담당자",
        desc: "통제 정책과 위험을 관리하고, 서비스화의 최종 승인·감사를 담당합니다.",
    },
];

/** 5계층 코어 엔진 — 인프라부터 에이전트까지 통합된 XGEN 아키텍처(위→아래 스택). */
const TECH_LAYERS: {
    no: string;
    en: string;
    title: string;
    desc: string;
    chips: string[];
}[] = [
    {
        no: "LAYER 01",
        en: "Agent Orchestration",
        title: "에이전트 오케스트레이션",
        desc: "멀티에이전트 워크플로우와 태스크 라우팅, 프롬프트 관리로 업무를 능동적으로 실행합니다. Planner가 업무를 분해해 담당 Agent를 호출하고 Reviewer가 결과를 검증하는 흐름을 MCP 표준 도구 연동·스트리밍으로 실시간 처리합니다.",
        chips: ["Multi-Agent", "Task Routing", "A2A", "MCP", "Tool / Function", "Prompt Engine"],
    },
    {
        no: "LAYER 02",
        en: "RAG Hybrid Search",
        title: "RAG 하이브리드 검색",
        desc: "Dense·Sparse(SPLADE) 하이브리드 검색에 Reranker·Late Chunking·Vision을 더해 문맥을 보존하고, 출처가 분명한 근거 기반(Grounded) 응답을 만듭니다.",
        chips: ["Dense + Sparse(SPLADE)", "Reranker", "Late Chunking", "Vision", "Ontology Graph", "OCR"],
    },
    {
        no: "LAYER 03",
        en: "Model Router",
        title: "Model Router · 멀티 LLM",
        desc: "업무 유형·비용·성능·보안 기준으로 최적 LLM을 자동 선택합니다. 상용·사내 모델을 하나의 인터페이스로 다루고, 프로바이더를 교체해도 에이전트 설계는 그대로 유지됩니다.",
        chips: ["Model Router", "GPT", "Claude", "Gemini", "HCX", "Solar", "Private LLM"],
    },
    {
        no: "LAYER 04",
        en: "Data Layer",
        title: "데이터 레이어",
        desc: "벡터·객체·관계형·캐시를 아우르는 엔터프라이즈 데이터 스택으로 검색 인덱스·상태·산출물을 안정적으로 저장합니다.",
        chips: ["Qdrant(Vector DB)", "MinIO(Object Storage)", "CNPG(PostgreSQL)", "Valkey(Cache)"],
    },
    {
        no: "LAYER 05",
        en: "Infra Layer",
        title: "인프라 레이어",
        desc: "k3s 고가용성 쿠버네티스와 ArgoCD GitOps로 자동 복구·무중단 배포를 보장하는 온프레미스·GPU 서빙 기반입니다.",
        chips: ["k3s HA", "ArgoCD GitOps", "Istio", "On-prem", "GPU Serving", "Auto-Healing"],
    },
];

export default function ProductPage() {
    // 최근 XGEN 고객사례 3건 — /customers 허브와 연계(신뢰 정책: customer 필드가 익명/실명 관리).
    const recentCases = getAllCases()
        .filter((c) => c.products.includes("xgen"))
        .slice(0, 3);
    return (
        <>
            <SiteNav overlay />
            <JsonLd
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "@id": absoluteUrl("/product#software"),
                        name: "XGEN",
                        applicationCategory: "BusinessApplication",
                        applicationSubCategory: "Enterprise Agentic AI Platform",
                        operatingSystem: "On-premise",
                        description:
                            "기업이 원하는 LLM과 인프라 위에서 Agentic AI 서비스를 설계·배포·통제하는 온프레미스 Enterprise AI 플랫폼. 에이전트플로우 캔버스·지식(RAG)·도구(MCP)·배포·거버넌스·대시보드로 구성된다.",
                        url: absoluteUrl("/product"),
                        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
                        featureList: [
                            "Agentflow · Canvas — 노드 기반 에이전트플로우 시각 설계",
                            "Knowledge · RAG — 벡터 검색·리랭커·온톨로지·인용 응답",
                            "Tools · MCP — API 도구 등록·MCP 표준 연동",
                            "Deploy · Operate — 배포·임베드·스케줄 자동 실행",
                            "AI Governance — PII 마스킹·이중 승인·감사 로그",
                            "Dashboard — 역할별 위젯·실행 이력·시스템 모니터링",
                        ],
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: FAQ.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                        })),
                    },
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Product", path: "/product" },
                    ]),
                ]}
            />

            {/* Hero — 2슬라이드 키비주얼(소개영상 + Model-Agnostic 로고) */}
            <ProductHero />

            {/* 트러스트 바 — 인증·운영·도입 실적으로 즉시 신뢰 형성 */}
            <section className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-6 sm:justify-between">
                    {TRUST.map((t) => (
                        <div key={t.label} className="flex items-center gap-2.5">
                            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                <t.icon className="h-[18px] w-[18px]" />
                            </span>
                            <div className="leading-tight">
                                <p className="text-[14.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                    {t.label}
                                </p>
                                <p className="text-[12.5px] text-[var(--color-ink-subtle)]">
                                    {t.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <SectionIndex sections={PRODUCT_SECTIONS} />

            <main>
                {/* 문제 제기 — 브로셔 오프너 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            The Challenge
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold leading-[1.2] tracking-tight text-[var(--color-ink)] md:text-[40px]">
                            Enterprise AI, 왜 현장에서 멈출까요
                        </h2>
                        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
                            {CHALLENGES.map((c, i) => (
                                <div key={c.q}>
                                    <span className="block font-mono text-[15px] font-bold text-[#2f7bff]">
                                        0{i + 1}
                                    </span>
                                    <h3 className="mt-3 text-[21px] font-bold leading-snug tracking-tight text-[var(--color-ink)]">
                                        {c.q}
                                    </h3>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.desc}
                                    </p>
                                    {/* 맥락 일러스트 — 텍스트 아래 */}
                                    <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[#f4f8ff]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={c.img}
                                            alt={c.imgAlt}
                                            className="block h-auto w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 숫자로 보는 XGEN — 실측 사실 밴드(다크로 강조) */}
                <section className="relative overflow-hidden border-y border-white/10 bg-[#070b1c] text-white">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(47,123,255,0.16),transparent_65%)]"
                    />
                    {/* 헤드라인 포커스 스포트라이트 — 방사형 밝은 그라데이션 */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-[64px] h-[280px] w-[640px] max-w-[92vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(125,211,252,0.3),rgba(47,123,255,0.14)_45%,transparent_75%)] blur-[46px]"
                    />
                    <div className="relative mx-auto max-w-7xl px-6 py-16">
                        <p className="text-center font-mono text-[12px] uppercase tracking-[0.2em] text-white/55">
                            XGEN · Agentic AI Platform
                        </p>
                        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight md:text-[40px]">
                            XGEN은{" "}
                            <span className="bg-gradient-to-r from-[#00acee] to-[#7dd3fc] bg-clip-text text-transparent">
                                다릅니다
                            </span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-white/60">
                            파일럿에서 멈추지 않고, 온프레미스에서 실제 운영으로 검증된 숫자로
                            증명합니다.
                        </p>
                        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                        {STATS.map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="bg-gradient-to-br from-[#00acee] to-[#7dd3fc] bg-clip-text text-[44px] font-extrabold leading-none tracking-tight text-transparent md:text-[52px]">
                                    {s.n}
                                </p>
                                <p className="mt-3 text-[15px] font-bold tracking-tight text-white">
                                    {s.label}
                                </p>
                                <p className="mt-1 text-[13px] text-white/50">
                                    {s.sub}
                                </p>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>

                {/* 제품 개요 — 파일럿을 넘어 실제 배포되는 기업용 AI (4축) */}
                <section
                    id="platform"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            4 Core Values
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            엔터프라이즈 AI 운영을 위한 핵심 가치
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            AI를 만드는 것에서 끝나지 않습니다. 연결하고, 운영하고,
                            통제하며, 지속적으로 확장하는 것까지. XGEN은 엔터프라이즈
                            AI에 필요한 전 과정을 하나의 플랫폼으로 제공합니다.
                        </p>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {PILLARS.map((p) => (
                                <div
                                    key={p.en}
                                    className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="border-b border-[#1f57c4] bg-[linear-gradient(160deg,#4f8bf0_0%,#2f6fe0_55%,#1f57c4_100%)] px-5 pt-4">
                                        <PillarArt variant={p.variant} />
                                    </div>
                                    <div className="flex flex-1 flex-col items-center px-4 py-6 text-center">
                                        <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {p.ko}
                                        </h3>
                                        <p className="mt-0.5 text-[14.5px] font-bold tracking-tight text-[var(--color-ink)]">
                                            ({p.en})
                                        </p>
                                        <p className="mt-3 text-[12px] leading-[1.6] text-[var(--color-ink-muted)]">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 특장점 — 누구나 만드는 에이전트(이지모드·패스파인더) */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Build for Everyone
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            현업이 직접 만드는 Enterprise AI
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            개발 지식 없이도 현업이 직접 에이전트를 설계하고 기존 시스템과
                            연결할 수 있습니다. 복잡한 개발 과정을 줄여 아이디어를 곧바로
                            업무에 활용 가능한 AI로 구현합니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-2 md:items-stretch">
                            {DIFFERENTIATORS.map((d) => (
                                <div
                                    key={d.en}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    {d.en === "PathFinder" && (
                                        <div className="mb-6">
                                            <PathFinderArt />
                                        </div>
                                    )}
                                    {d.en === "Easy Mode" && (
                                        <div className="mb-6">
                                            <EasyModeArt />
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                                <d.icon className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <p className="font-mono text-[11px] uppercase tracking-widest text-[#4a6aa8]">
                                                    {d.en}
                                                </p>
                                                <h3 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                                    {d.ko}
                                                </h3>
                                            </div>
                                        </div>
                                        {/* 자세히 보기 — PathFinder만 상세 페이지 연결(그 외 카드는 미노출) */}
                                        {d.en === "PathFinder" && (
                                            <Link
                                                href="/pathfinder"
                                                className="group/link inline-flex flex-none items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                                            >
                                                자세히 보기
                                                <ArrowRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5" />
                                            </Link>
                                        )}
                                    </div>
                                    <p className="mt-5 text-[16px] font-semibold leading-snug text-[var(--color-ink)]">
                                        {d.tagline}
                                    </p>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {d.desc}
                                    </p>
                                    <ul className="mt-5 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4">
                                        {d.items.map((it) => (
                                            <li
                                                key={it}
                                                className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]"
                                            >
                                                <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2f7bff]" />
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 도입 효과 — 의사결정자 관점 before → after (검증된 서사 기반) */}
                <section
                    id="value"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Business Value
                        </p>
                        <h2 className="mx-auto mt-3 max-w-4xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            AI는 구축이 아니라, 기업 운영의 새로운 표준입니다
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            기업은 더 이상 AI 모델을 도입하는 것에 머물지 않습니다. 기존
                            시스템과 AI를 안전하게 연결하고, 보안과 거버넌스를 기반으로 실제
                            업무에 적용할 수 있는{" "}
                            <span className="font-semibold text-[var(--color-ink)]">
                                운영 플랫폼
                            </span>
                            을 선택합니다. XGEN은 AI를 도입하는 플랫폼이 아니라, 기업의
                            AI 운영을 지속적으로 확장하는 Enterprise AI 플랫폼입니다.
                        </p>

                        {/* 5대 혁신 효과 — 경쟁·가치 우위 관점의 전략 성과(최신 제품 덱) */}
                        <div className="mt-14">
                            <h3 className="mx-auto text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)] md:text-[26px]">
                                XGEN 도입을 통해 달성하는 5대 혁신 효과
                            </h3>
                            <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                기능 우위를 넘어, 도입 즉시 조직의 경쟁력이 되는 다섯 가지
                                성과 — 효율·리스크·신뢰·유연성·규제 대응을 하나의 플랫폼에서
                                확보합니다.
                            </p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {EFFECTS.map((e, i) => (
                                    <div
                                        key={e.en}
                                        className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                    >
                                        <span className="h-1.5 w-12 rounded-full bg-[linear-gradient(90deg,#00acee,#185aea)]" />
                                        <div className="mt-4 flex items-baseline gap-2">
                                            <span className="font-mono text-[13px] font-extrabold text-[#2461d8]">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wide text-[#4a6aa8]">
                                                {e.en}
                                            </span>
                                        </div>
                                        <h4 className="mt-1.5 text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                                            {e.ko}
                                        </h4>
                                        <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            {e.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 기존 방식 대비 전환 — 운영 모델 관점(성과의 근거) */}
                        <h3 className="mx-auto mt-16 text-center text-[22px] font-bold tracking-tight text-[var(--color-ink)] md:text-[26px]">
                            기존 방식 대비, 무엇이 달라지는가
                        </h3>
                        <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            같은 AI라도 운영 방식이 다릅니다. 구축형 SI와 PoC에 머무는
                            접근을 넘어,<br />
                            XGEN은 완성형 플랫폼에서 현업이 직접 운영하는 구조로
                            전환합니다.
                        </p>
                        <div className="mx-auto mt-8 max-w-4xl divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                            {[
                                {
                                    title: "구축형 SI가 아닌 운영형 플랫폼",
                                    before: "프로젝트마다 새롭게 개발하여 구축 기간과 유지보수 비용이 지속 증가",
                                    after: "완성형 플랫폼 기반으로 Agent·RAG·Workflow를 조합해 서비스를 구성",
                                    effect: "구축 기간 단축 — 수개월의 구축을 수주 내 운영 수준으로",
                                },
                                {
                                    title: "PoC를 넘어 실제 업무 운영",
                                    before: "기술 검증은 성공하지만 현업 업무에는 적용되지 못하는 AI",
                                    after: "권한·보안·감사체계를 포함한 운영 환경에서 바로 활용 가능한 Enterprise AI 서비스",
                                    effect: "PoC를 넘어 운영 환경에서 즉시 활용",
                                },
                                {
                                    title: "현업이 직접 만드는 AI",
                                    before: "개발조직 일정에 따라 AI 서비스 출시 지연",
                                    after: "노코드 Canvas와 Pathfinder로 현업이 직접 Agent를 만들고 즉시 업무에 적용",
                                    effect: "개발 대기 없이 업무 부서가 직접 개선",
                                },
                                {
                                    title: "개발부터 운영까지 하나의 플랫폼",
                                    before: "개발·배포·모니터링·품질관리가 분리되어 운영 복잡도 증가",
                                    after: "설계·지식관리·배포·평가·운영을 단일 플랫폼에서 통합 관리",
                                    effect: "운영 도구를 하나의 플랫폼으로 통합",
                                },
                            ].map((o, i) => (
                                <div
                                    key={o.title}
                                    className="grid gap-5 py-10 md:grid-cols-[128px_1fr] md:gap-10 lg:grid-cols-[168px_1fr]"
                                >
                                    <span className="bg-gradient-to-br from-[#00acee] to-[#185aea] bg-clip-text font-mono text-[48px] font-extrabold leading-none text-transparent md:text-[64px]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h4 className="text-[21px] font-bold tracking-tight text-[var(--color-ink)] md:text-[25px]">
                                            {o.title}
                                        </h4>
                                        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                                            <div className="rounded-xl bg-[var(--color-surface-alt)] px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-[11.5px] font-bold text-[var(--color-ink-subtle)] ring-1 ring-[var(--color-line)]">
                                                    기존
                                                </span>
                                                <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                                    {o.before}
                                                </p>
                                            </div>
                                            <ArrowRight className="mx-auto hidden h-5 w-5 flex-none text-[#2f7bff] sm:block" />
                                            <div className="rounded-xl border border-[#bcd0f5] bg-[#eef4ff] px-4 py-3">
                                                <span className="inline-flex items-center rounded-full bg-[#2f7bff] px-2.5 py-0.5 text-[11.5px] font-bold text-white">
                                                    XGEN
                                                </span>
                                                <p className="mt-1 text-[14px] font-medium leading-relaxed text-[var(--color-ink)]">
                                                    {o.after}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2.5 rounded-r-xl border-l-[3px] border-[#1f9d6b] bg-[#e7f7f0]/60 px-4 py-2.5">
                                            <span className="inline-flex flex-none items-center rounded-full bg-[#1f9d6b] px-2 py-0.5 text-[11px] font-bold text-white">
                                                성과
                                            </span>
                                            <span className="text-[14.5px] font-semibold leading-relaxed text-[var(--color-ink)]">
                                                {o.effect}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Features
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            설계부터 운영까지, 하나의 흐름으로 연결됩니다
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            각 기능은 개별 도구가 아니라 하나의 운영 파이프라인으로
                            이어집니다. 에이전트를 만들고, 배포하고, 운영하고, 개선하는
                            전 과정이 하나의 플랫폼 안에서 연결됩니다.
                        </p>

                        {/* 에디토리얼 — 핵심 기능 6종을 대표 화면과 좌우 교차로 스프레드 */}
                        <div className="mt-16 space-y-20 md:space-y-24">
                            {FEATURES.map((f, i) => {
                                const sc = FEATURE_SCREENS[i];
                                const flip = i % 2 === 1;
                                return (
                                    <div
                                        key={f.tag}
                                        className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                                    >
                                        {/* 텍스트 */}
                                        <div className={flip ? "lg:order-2" : ""}>
                                            <div className="flex items-baseline gap-3">
                                                <span className="bg-gradient-to-br from-[#00acee] to-[#185aea] bg-clip-text font-mono text-[34px] font-extrabold leading-none text-transparent">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-[#4a6aa8]">
                                                    <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2f7bff]/10 text-[#2f7bff]">
                                                        <f.icon className="h-4 w-4" />
                                                    </span>
                                                    {f.tag}
                                                </div>
                                            </div>
                                            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[30px] md:leading-[1.2]">
                                                {f.ko}
                                            </h3>
                                            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {f.desc}
                                            </p>
                                            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                                                {f.items.map((it) => (
                                                    <li
                                                        key={it}
                                                        className="flex items-start gap-2 text-[14px] leading-relaxed text-[var(--color-ink)]"
                                                    >
                                                        <ArrowRight className="mt-0.5 h-4 w-4 flex-none text-[#2f7bff]" />
                                                        {it}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* 대표 제품 화면 */}
                                        <div className={flip ? "lg:order-1" : ""}>
                                            <figure className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] shadow-[0_30px_70px_-30px_rgba(20,40,80,0.4)]">
                                                <Image
                                                    src={sc.img}
                                                    alt={sc.alt}
                                                    width={sc.w}
                                                    height={sc.h}
                                                    sizes="(max-width: 1024px) 100vw, 560px"
                                                    className="h-auto w-full"
                                                />
                                                <figcaption className="border-t border-[var(--color-line)] bg-white px-5 py-3 text-[13.5px] font-semibold text-[var(--color-ink-muted)]">
                                                    {sc.caption}
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 더 많은 화면 — 보조 스트립 */}
                        <div className="mt-20 border-t border-[var(--color-line)] pt-12">
                            <p className="text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
                                더 많은 제품 화면
                            </p>
                            <div className="mt-5 grid gap-5 sm:grid-cols-3">
                                {EXTRA_SCREENS.map((s) => (
                                    <figure
                                        key={s.img}
                                        className="flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] shadow-[0_20px_48px_-24px_rgba(20,40,80,0.35)]"
                                    >
                                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-alt)]">
                                            <Image
                                                src={s.img}
                                                alt={s.alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 360px"
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <figcaption className="border-t border-[var(--color-line)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-ink-muted)]">
                                            {s.caption}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 핵심 기술 — 검증된 오픈 기술 위, 벤더 종속 없이 (4계층) */}
                <section
                    id="core-tech"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Core Technology · 6 Layers
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            엔터프라이즈 AI를 위한 6계층 코어 아키텍처
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            인프라부터 AI 에이전트까지, 기업의 AI 운영에 필요한 핵심 기술을
                            하나의 플랫폼으로 통합합니다.
                        </p>
                        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 특정 AI 모델이나 클라우드에 종속되지 않습니다. 표준
                            프로토콜 기반의 6계층 아키텍처를 통해 온프레미스 GPU, 상용 AI
                            API, 사내 시스템을 일관된 방식으로 연결하고 운영할 수 있습니다.
                        </p>
                        {/* 5계층 코어 엔진 — 아이소메트릭 분해 스택 도해(네이티브 SVG) */}
                        <div className="mt-8 overflow-x-auto">
                            <div className="mx-auto min-w-[760px] max-w-5xl">
                                <LayerStackArt />
                            </div>
                        </div>

                        {/* 4계층 기술 스택의 참조 아키텍처로 연결 */}
                        <Link
                            href="/architecture#platform"
                            className="group ml-auto mt-8 flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            XGEN 플랫폼 아키텍처 자세히 보기
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* Roles — 역할별 경험 (제품 사용 관점: 신뢰 블록 앞에 배치) */}
                <section
                    id="roles"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Roles
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            하나의 플랫폼, 역할에 맞는 경험
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            하나의 플랫폼에서도 역할과 권한에 따라 최적화된 업무 환경이
                            구성됩니다. 각 사용자는 자신의 업무에 필요한 기능과 정보만
                            제공받아 더욱 효율적으로 AI를 활용할 수 있습니다.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {ROLES.map((r) => (
                                <div
                                    key={r.en}
                                    className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#2461d8]">
                                        {r.en}
                                    </p>
                                    <h3 className="mt-3 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {r.ko}
                                    </h3>
                                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {r.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* On-Premise */}
                <section
                    id="on-premise"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            On-Premise
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            데이터는 기업 안에, 안심하고 활용
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 온프레미스로 구축돼 데이터가 외부로 나가지 않으며,
                            고객사 데이터가 외부 모델 학습에 쓰이지 않도록 기술적으로 차단합니다.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {ONPREM.map((o) => (
                                <div
                                    key={o.title}
                                    className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6"
                                >
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <o.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 text-[17px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {o.title}
                                    </h3>
                                    <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {o.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* 심화 — 보안·거버넌스 전용 페이지로 연결(이중화 해소) */}
                        <Link
                            href="/security-and-governance"
                            className="group ml-auto mt-8 flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            보안·거버넌스 아키텍처 자세히 보기
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </section>

                {/* 도입·구축 — 반입에서 운영까지(온프레미스 딜리버리) */}
                <section
                    id="deployment"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Deployment
                        </p>
                        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            반입부터 운영까지, 검증된 구축 프로세스
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            폐쇄망 반입부터 실증, 구축, 운영까지 온프레미스 환경에 맞춰
                            단계적으로 지원합니다. 반입 절차가 완료되면 신속하게 실증을
                            시작하여 운영 전 검증과 빠른 성과 확보를 지원합니다.
                        </p>
                        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
                            {DEPLOY_STEPS.map((s) => (
                                <div key={s.no} className="bg-white p-7">
                                    <span className="font-mono text-[13px] font-bold tracking-widest text-[#2f7bff]">
                                        {s.no}
                                    </span>
                                    <h3 className="mt-4 text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {s.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                            {DEPLOY_CHIPS.map((c) => (
                                <span
                                    key={c}
                                    className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 font-mono text-[12.5px] font-semibold text-[var(--color-ink-muted)]"
                                >
                                    {c}
                                </span>
                            ))}
                        </div>
                        <Link
                            href="/architecture#cicd"
                            className="group ml-auto mt-8 flex w-fit items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                        >
                            GitOps 배포 파이프라인 자세히 보기
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>

                        {/* 도입 이후 지원 — 교육·운영/기술지원 연계 */}
                        <div className="mt-12 border-t border-[var(--color-line)] pt-10">
                            <h3 className="text-[20px] font-bold tracking-tight text-[var(--color-ink)]">
                                도입 이후에도 함께합니다
                            </h3>
                            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                구축으로 끝나지 않습니다. 조직 내재화를 위한 교육과 안정적
                                운영을 위한 기술지원까지 이어집니다.
                            </p>
                            <div className="mt-6">
                                <PostDeploymentSupport />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Governance — Enterprise Trust (다크 밴드: 신뢰의 포컬 포인트) */}
                <section
                    id="governance"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-white/10 bg-[#0a1220] text-white"
                >
                    {/* 글로우 클리핑(overflow-hidden)은 반드시 이 안쪽 래퍼에 둔다 —
                        앵커 대상인 <section>에 직접 주면 그 섹션 자체가 스크롤 컨테이너가
                        되어 브라우저가 scroll-margin-top을 무시하고 섹션을 뷰포트 최상단
                        (= 고정 헤더 뒤)에 붙인다. 그러면 인덱스에서 '거버넌스'를 눌렀을 때
                        제목이 헤더에 가린다. */}
                    <div className="relative overflow-hidden">
                        {/* 배경 글로우 — 다크 밴드에 깊이감 */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-40 -top-48 h-[540px] w-[540px] rounded-full bg-[#2f7bff]/15 blur-[130px]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -bottom-48 left-[20%] h-[420px] w-[420px] rounded-full bg-[#00acee]/10 blur-[130px]"
                        />
                        <div className="relative mx-auto max-w-7xl px-6 py-24">
                            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                                <div className="flex h-full flex-col">
                                    <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[#7dd3fc]">
                                        Enterprise Trust
                                    </p>
                                    <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight md:text-[34px] md:leading-[1.15]">
                                        신뢰할 수 없는 AI는
                                        <br />
                                        기업에서 운영될 수 없습니다
                                    </h2>
                                    <p className="mx-auto mt-5 max-w-md text-center text-[16px] leading-relaxed text-white/65">
                                        XGEN은 누가, 무엇을, 언제 수행했는지 모든
                                        활동을 추적하고, 위험한 변경은 배포 전에
                                        검증하며, 승인된 에이전트만 운영 환경에
                                        배포되도록 설계되었습니다. 규제 산업과
                                        온프레미스 환경에서도 신뢰할 수 있는
                                        거버넌스를 제공합니다.
                                    </p>
                                    <Link
                                        href="/security-and-governance"
                                        className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#7dd3fc] transition hover:text-white"
                                    >
                                        보안·거버넌스 아키텍처 자세히 보기
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </Link>
                                    {/* 보안 통제 개념도(동심 방어 링 + 좌우 통제 칩) — 하단 정렬로
                                        오른쪽 카드 박스 높이에 맞춰 아래를 채운다. */}
                                    <div className="mt-auto hidden pt-10 lg:block">
                                        <GovernanceArt />
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {GOV.map((g) => (
                                        <div
                                            key={g.title}
                                            className="rounded-2xl border border-white/10 bg-[linear-gradient(155deg,rgba(47,123,255,0.16)_0%,rgba(125,211,252,0.05)_45%,rgba(255,255,255,0.02)_100%)] p-6 backdrop-blur-sm transition hover:border-[#7dd3fc]/50 hover:bg-[linear-gradient(155deg,rgba(47,123,255,0.22)_0%,rgba(125,211,252,0.07)_45%,rgba(255,255,255,0.03)_100%)]"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="h-2 w-2 rotate-45 rounded-[2px] bg-[#7dd3fc]" />
                                                <h3 className="text-[15.5px] font-bold tracking-tight text-white">
                                                    {g.title}
                                                </h3>
                                            </div>
                                            <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">
                                                {g.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications & Quality — 국가 공인 품질/신뢰성 인증(구 /solutions#certification 이전) */}
                <section
                    id="certification"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Certifications & Quality
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            국가 공인 품질·신뢰성 인증
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            XGEN은 GS인증 1등급을 획득했고, AI 신뢰성 인증(AI-MASTER)
                            시험을 받고 있습니다. 제3자 시험기관이 제품의 품질과 신뢰성을
                            검증합니다.
                        </p>
                        <div className="mt-10">
                            <CertificationQuality />
                        </div>
                        {/* 보안·규제·조달 요건 상담 — 의사결정자 전환 경로 */}
                        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                보안·규제·조달 요건을 검토 중이신가요? 요건에 맞춰
                                아키텍처와 통제 방안을 함께 정리해 드립니다.
                            </p>
                            <Link
                                href="/contact?type=poc&from=product"
                                className="group inline-flex flex-none items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                보안·요건 상담
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 고객사례 — 최근 3건 + /customers 연계 */}
                <section
                    id="cases"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <p className="text-center font-mono text-[12px] uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Customer Cases
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            고객 현장에서 검증됩니다
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
                            금융·커머스·공공·IT 현장에 XGEN을 실제로 구축하고
                            운영한 고객사례입니다.
                        </p>
                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {recentCases.map((c) => (
                                <Link
                                    key={c.slug}
                                    href={`/customers/case/${c.slug}`}
                                    className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <div className="flex items-center gap-2 text-[12.5px]">
                                        <span className="rounded-full bg-[#2f7bff]/10 px-2.5 py-0.5 font-semibold text-[#2461d8]">
                                            {PRODUCTS[c.products[0]].name}
                                        </span>
                                        <span className="text-[var(--color-ink-subtle)]">
                                            {INDUSTRIES[c.industry].ko}
                                        </span>
                                        <time
                                            dateTime={c.published}
                                            className="ml-auto text-[var(--color-ink-subtle)]"
                                        >
                                            {c.published.slice(0, 7).replace("-", ".")}
                                        </time>
                                    </div>
                                    <h3 className="mt-3 line-clamp-2 text-[17px] font-bold leading-snug tracking-tight text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                        {c.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 flex-1 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {c.summary}
                                    </p>
                                    <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-[13.5px] font-semibold text-[var(--color-ink)]">
                                        {c.customer}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Link
                                href="/customers?product=xgen"
                                className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                            >
                                XGEN 고객사례 전체 보기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 개발자·도입 리소스 — 문서·릴리스·소개서 */}
                <section className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            Resources
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-[28px]">
                            개발자·도입 담당자를 위한 자료
                        </h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {RESOURCES.map((r) => (
                                <Link
                                    key={r.title}
                                    href={r.href}
                                    className="group flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:border-[#bcd0f5] hover:shadow-[0_14px_36px_-18px_rgba(20,40,80,0.22)]"
                                >
                                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#2f7bff]/10 text-[#2f7bff]">
                                        <r.icon className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-[16px] font-bold tracking-tight text-[var(--color-ink)] transition group-hover:text-[#2461d8]">
                                            {r.title}
                                        </span>
                                        <span className="mt-0.5 block text-[13.5px] text-[var(--color-ink-muted)]">
                                            {r.desc}
                                        </span>
                                    </span>
                                    <ArrowRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-hover:translate-x-0.5 group-hover:text-[#2461d8]" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section
                    id="faq"
                    className="scroll-mt-[calc(var(--nav-h,84px)+58px)] border-t border-[var(--color-line)] bg-[var(--color-surface)]"
                >
                    <div className="mx-auto max-w-4xl px-6 py-24">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-[var(--color-ink-subtle)]">
                            FAQ
                        </p>
                        <h2 className="mx-auto mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-4xl">
                            자주 묻는 질문
                        </h2>
                        <div className="mt-8 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
                            {FAQ.map((f) => (
                                <details key={f.q} className="group px-6 py-5">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-semibold text-[var(--color-ink)]">
                                        {f.q}
                                        <ChevronRight className="h-4 w-4 flex-none text-[var(--color-ink-subtle)] transition group-open:rotate-90" />
                                    </summary>
                                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-[var(--color-line)] bg-[#070b1c] text-white">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <p className="font-mono text-[12px] text-center uppercase tracking-widest text-white/45">
                            Get Started
                        </p>
                        <h2 className="mx-auto mt-4 text-center text-3xl font-bold tracking-tight md:text-[40px]">
                            업무에 바로 투입되는 기업용 AI를 확인해 보세요
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-center text-[16px] leading-relaxed text-white/70">
                            조직의 보안·권한·감사 요건을 만족하는 Agentic AI 플랫폼.
                            데모에서 설계·배포·통제의 전체 흐름을 직접 보여드립니다.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/contact?from=product"
                                className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#00acee_20%,#185aea_80%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(47,123,255,0.5)] transition hover:brightness-110"
                            >
                                데모 요청하기
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/resources"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/50 hover:text-white"
                            >
                                <Download className="h-4 w-4" />
                                XGEN 소개서 다운로드
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
