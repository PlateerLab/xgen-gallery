import Link from "next/link";
import { ArrowLeft, ArrowRight, Cloud, Cpu, Quote, UserCheck } from "lucide-react";
import { localeHref } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

/**
 * 롯데홈쇼핑 XGEN 고객사례 — **고객 검토본**(2026-11-21).
 *
 * 구성은 Cohere 고객사례(cohere.com/customer-stories/ada) 순서를 따른다.
 *   핵심 요약 3줄 → 처음 문제(고객 인용) → 요구사항 3가지 → 선정 과정 →
 *   핵심 결정 → 바뀐 업무(예전/지금) → 함께 푼 문제 → 남은 과제 → 다음 계획
 * 오른쪽(모바일은 위) 정보 상자에 업종·제품·구성·적용 업무를 모은다.
 *
 * 출처
 *  - 롯데홈쇼핑 AX팀 서면 인터뷰(2026-11-12 회신) — 인용은 원문 그대로.
 *  - 플래티어 위키(EC솔루션연구소 · 롯데홈쇼핑_AX프로젝트 2차) — 통제 정책,
 *    운영 구성, 모델 서빙 기록에서 공개해도 되는 수준의 사실만 옮겼다.
 *
 * 넣지 않은 것: 비교 대상 경쟁사명, 수행 인력·고객 담당자 실명(인터뷰 응답자 제외),
 * 서버·접속 정보, 계약·일정 내부 사항, 도입 후 절감 수치(측정 전).
 *
 * 공개 전 고객 확인이 필요하다 — `preview` 를 켜면 확인 요청 항목이 함께 보인다.
 * 확인이 끝나면 lib/customers.ts 에 사례를 등록하고 case-detail-page 의
 * CUSTOM_BODIES 에 이 컴포넌트를 연결한다(제주은행과 같은 절차).
 */

type Task = {
    no: string;
    title: string;
    before?: string;
    after: string;
    status: string;
};

type Copy = {
    breadcrumbAria: string;
    breadcrumbCases: string;
    breadcrumbIndustry: string;
    badgeCustomer: string;
    badgeStatus: string;
    title: string;
    lead: string;
    dateLabel: string;
    readTime: string;
    takeawaysTitle: string;
    takeaways: [string, string][];
    statsTitle: string;
    stats: [string, string][];
    statsNote: string;
    s1Kicker: string;
    s1Title: string;
    s1Body: string[];
    q1: string;
    reqTitle: string;
    reqs: [string, string][];
    s1Close: string;
    s2Kicker: string;
    s2Title: string;
    s2Lead: string;
    s2Points: string[];
    s2Close: string;
    s3Kicker: string;
    s3Title: string;
    s3Lead: string;
    s3Cards: { icon: "cpu" | "cloud"; title: string; desc: string }[];
    s3Body: string[];
    q2: string;
    s4Kicker: string;
    s4Title: string;
    s4Lead: string;
    beforeLabel: string;
    afterLabel: string;
    tasks: Task[];
    flowTitle: string;
    flowNote: string;
    flow: { who: string; step: string; human?: boolean }[];
    humanLabel: string;
    s5Kicker: string;
    s5Title: string;
    s5Lead: string;
    s5Items: [string, string][];
    s6Kicker: string;
    s6Title: string;
    s6Body: string[];
    s6ListTitle: string;
    s6List: string[];
    q3: string;
    s7Kicker: string;
    s7Title: string;
    s7Body: string;
    s7NeedsTitle: string;
    s7Needs: { need: string; answer: string }[];
    s7NeedLabel: string;
    s7AnswerLabel: string;
    s7Note: string;
    s7Link: string;
    s8Kicker: string;
    s8Title: string;
    s8Body: string[];
    s8ListTitle: string;
    s8List: string[];
    s8Note: string;
    q4: string;
    speaker: string;
    speakerOrg: string;
    sourceTitle: string;
    sources: string[];
    meta: [string, string][];
    metaTitle: string;
    allCases: string;
    contact: string;
    previewBand: string;
    reviewTitle: string;
    reviewItems: string[];
};

const KO: Copy = {
    breadcrumbAria: "브레드크럼",
    breadcrumbCases: "고객사례",
    breadcrumbIndustry: "커머스",
    badgeCustomer: "커머스 · 롯데홈쇼핑",
    badgeStatus: "운영·확산 중",
    title: "롯데홈쇼핑, 챗봇 하나에서 부서별 AI Agent 운영으로",
    lead: "롯데홈쇼핑 AX팀은 XGEN에서 업무 Agent를 코드 없이 워크플로우로 조립해 배포합니다. 외부로 나가면 안 되는 데이터는 사내 GPU의 모델이, 고난도 추론은 클라우드 모델이 처리하도록 한 플랫폼에서 나눠 씁니다. 위해상품 판매차단과 차세대 시스템 안내에서 시작해 재경과 방송 품질·심의 업무로 넓히고 있습니다.",
    dateLabel: "2026.11.21 정리",
    readTime: "약 6분",
    takeawaysTitle: "핵심 요약",
    takeaways: [
        [
            "코드 없이 조립해 바로 배포",
            "위해상품 판매차단, 차세대 시스템(A1+) 매뉴얼 안내, 상품백과 챗봇, 엑셀 생성기를 모두 워크플로우로 만들어 배포했습니다.",
        ],
        [
            "데이터 경계에 따라 모델을 나눠 씀",
            "외부 반출이 안 되는 데이터는 사내 GPU의 오픈 모델(Gemma·Qwen 계열)이, 고난도 추론은 클라우드 모델(Claude 등)이 처리합니다.",
        ],
        [
            "부서별 확산",
            "부서 요구를 분석해 맞춤 Agent를 만드는 구조(AX Foundry)를 MD, 방송편성, CS, 재경으로 넓히고 있습니다.",
        ],
    ],
    statsTitle: "숫자로 본 적용 범위",
    stats: [
        ["약 20분", "도입 전, 위해상품 1건을 아이몰에서 수기로 대조하던 시간"],
        ["500쪽+", "직접 찾아 읽어야 했던 차세대 시스템 매뉴얼 분량"],
        ["900명", "A1+ 도우미 선오픈 대상(임직원·협력사)"],
        ["4개 부서", "AX Foundry 확산 대상(MD·방송편성·CS·재경)"],
    ],
    statsNote:
        "고객이 제공한 도입 전 업무 조건과 적용 범위입니다(2026년 11월 기준). 도입 후 줄어든 시간은 아직 측정해 공개하지 않았습니다.",
    s1Kicker: "처음 문제",
    s1Title: "챗봇 하나로는 늘어나는 요건을 감당하기 어려웠습니다",
    s1Body: [
        "롯데홈쇼핑의 생성형 AI 도입은 외국계 시스템의 챗봇에서 시작했습니다. 쓰는 부서가 늘면서 요건도 하나씩 늘었습니다. 질문에 답하는 데서 그치지 않고, 아이몰을 검색해 결과를 엑셀로 내거나 사내 시스템의 화면 경로를 안내하는 일까지 필요해졌습니다.",
    ],
    q1: "처음에는 외국계 시스템 챗봇으로 시작했습니다. 여기에 요건이 하나씩 늘면서 워크플로우 단위로 만들고 운영(LLMOps)할 수 있는 기반이 필요해졌습니다.",
    reqTitle: "새 기반이 갖춰야 할 세 가지",
    reqs: [
        ["모델", "클라우드 모델(Claude 등)과 온프레미스 모델(Gemma, Qwen 등)을 한 플랫폼에서 함께 쓸 것"],
        ["데이터 경계", "외부로 나가면 안 되는 데이터는 사내 GPU에서 처리하고, 고난도 추론만 클라우드에서 처리할 것"],
        ["운영", "현업 요구가 바뀔 때 사용자가 직접 바꿀 수 있는 범위가 넓을 것"],
    ],
    s1Close:
        "필요한 것은 업무 단위로 Agent를 만들고, 배포한 뒤에도 계속 고치며 운영할 수 있는 기반이었습니다.",
    s2Kicker: "선정 과정",
    s2Title: "기존 선택지와 나란히 놓고 비교했습니다",
    s2Lead: "롯데홈쇼핑은 선정 당시 기존에 검토하던 다른 플랫폼과 XGEN을 비교했습니다. 고객이 꼽은 차이는 세 가지입니다.",
    s2Points: [
        "구축 기간이 짧았습니다.",
        "시스템 구조가 비교적 가벼웠습니다.",
        "사용자가 직접 바꿀 수 있는 범위가 넓었습니다.",
    ],
    s2Close: "고객은 플래티어가 플랫폼을 자체 개발한 기술력도 선정에 작용했다고 봅니다.",
    s3Kicker: "핵심 결정",
    s3Title: "데이터가 어디까지 나갈 수 있는지로 모델을 나눴습니다",
    s3Lead: "한 워크플로우 안에서도 단계마다 다른 모델을 고를 수 있다는 점이 이번 구성의 중심입니다.",
    s3Cards: [
        {
            icon: "cpu",
            title: "사내 GPU · 오픈 모델",
            desc: "외부 반출이 안 되는 데이터를 다루는 단계입니다. Gemma 4 31B, Qwen 3.8 27B 같은 Dense 모델을 사내 GPU에 올려 씁니다.",
        },
        {
            icon: "cloud",
            title: "클라우드 모델",
            desc: "고난도 추론이 필요한 단계입니다. Claude 등 클라우드 모델을 같은 워크플로우 안에서 호출합니다.",
        },
    ],
    s3Body: [
        "XGEN은 롯데홈쇼핑 인프라 안의 쿠버네티스(K3s) 클러스터에서 운영되고, 배포 이미지는 사내 레지스트리로 관리합니다. 2026년 3월에는 XGEN 2.0의 통합 서비스 구조로 옮겨 운영할 서비스 수를 줄였습니다.",
        "도구(API, MCP)를 연결하는 방식이 하나로 정해져 있어, 내부 시스템 연동을 반복해서 쓸 수 있는 패턴으로 정리할 수 있었습니다.",
    ],
    q2: "필요한 업무를 코드 없이 워크플로우로 조립해서 바로 배포할 수 있습니다. 차세대 시스템 매뉴얼, 상품백과 챗봇, 엑셀 생성기도 모두 이 방식으로 만들었습니다.",
    s4Kicker: "바뀐 업무",
    s4Title: "예전에는 이렇게 했고, 지금은 이렇게 합니다",
    s4Lead: "고객이 직접 꼽은 업무별 변화입니다. 일부는 아직 연동을 진행하고 있습니다.",
    beforeLabel: "예전",
    afterLabel: "지금",
    tasks: [
        {
            no: "01",
            title: "위해상품 판매차단",
            before: "유통물류진흥원의 위해상품 목록을 담당자가 아이몰에서 수기로 대조했고, 건당 약 20분이 걸렸습니다.",
            after: "Agent가 아이몰을 검색해 대조 결과를 엑셀로 제공합니다.",
            status: "2026.10.14 운영 오픈",
        },
        {
            no: "02",
            title: "차세대 시스템(A1+) 매뉴얼",
            before: "500페이지가 넘는 매뉴얼을 직접 찾아 읽어야 했습니다.",
            after: "「차세대 A1+ 도우미」가 화면 경로까지 단계별로 안내합니다.",
            status: "임직원·협력사 900명 대상 선오픈",
        },
        {
            no: "03",
            title: "택시비 영수증 전표 처리",
            before: "영수증 내용을 사람이 입력하고 카드 내역과 대조했습니다.",
            after: "사진을 올리면 판독, 법인카드 매칭, 품의 작성까지 이어지고 재경팀은 최종 검증만 합니다.",
            status: "연동 진행 중 · 2026.11.24 오픈 목표",
        },
        {
            no: "04",
            title: "방송 품질·심의",
            after: "시미시미(실시간 방송 심의)와 Moni(방송 품질 점검 결과 등록)가 운영되고 있습니다.",
            status: "운영 중",
        },
    ],
    flowTitle: "택시비 전표 처리 흐름",
    flowNote: "마지막 단계는 사람이 확인합니다. Agent가 만든 품의는 재경팀 검증을 거쳐야 처리됩니다.",
    flow: [
        { who: "직원", step: "영수증 사진 업로드" },
        { who: "Agent", step: "영수증 판독" },
        { who: "Agent", step: "법인카드 내역 매칭" },
        { who: "Agent", step: "품의 작성" },
        { who: "재경팀", step: "최종 검증", human: true },
    ],
    humanLabel: "사람 확인",
    s5Kicker: "안전장치",
    s5Title: "업무 성격에 따라 답하는 방식과 통제를 달리했습니다",
    s5Lead: "현업이 직접 쓰는 만큼, 입력과 답변 양쪽에 기준을 두었습니다.",
    s5Items: [
        [
            "입력 검사",
            "채팅·첨부 문서·이미지는 유해 콘텐츠 검사와 개인정보 탐지(정규식과 개체명 인식)를 차례로 거칩니다. 개인정보가 탐지되면 요청을 멈추고 진행 여부를 묻고, 진행하면 가린(마스킹) 내용으로 보냅니다. 이미지는 글자를 추출(OCR)해 같은 검사를 합니다.",
        ],
        [
            "답변 기준",
            "임직원·협력사 업무 문의 Agent는 품질(QA) 질문에 지식베이스에서 확인된 내용만 답하고, 근거가 없으면 답하지 않습니다. SCM·MD·CS 질문은 추론을 허용하되 추론한 부분에 [추론]을 표시합니다.",
        ],
        [
            "단계적 배포",
            "개인정보 보호 같은 기능은 일부 사용자에게 먼저 배포한 뒤 범위를 넓혔습니다.",
        ],
    ],
    s6Kicker: "함께 푼 문제",
    s6Title: "FDE·연구소 참여자와 사내 GPU 모델 서빙을 넓혔습니다",
    s6Body: [
        "Gemma 4 31B, Qwen 3.8 27B 같은 Dense 모델을 사내 GPU에서 쓰던 중, 더 큰 MoE 모델인 Qwen3.8-Flash-Next 125B A6B도 올릴 수 있다는 가능성을 확인했습니다. 이후 플래티어 FDE·연구소 참여자와 함께 모델을 올리고 세부 설정을 조정해 안정적으로 서빙하고 있습니다.",
    ],
    s6ListTitle: "운영하면서 함께 정리한 것",
    s6List: [
        "Gemma 4가 배포 직후 서빙되지 않던 문제는 모델 체크포인트·vLLM·transformers가 서로 다른 버전 규칙을 따른 데서 생겼습니다. 버전을 맞춰 고정해 정상화했습니다(2026년 8월).",
        "노드를 다시 시작할 때 외부 이미지 저장소에 닿지 못해 배포가 멈춘 일은 같은 사설망 환경에서 재현해, 필요한 이미지 목록과 사내 레지스트리 운영 방안으로 정리했습니다.",
    ],
    q3: "기반 모델부터 XGEN 워크플로우, LLM이 내놓는 결과까지 현재는 만족스러운 수준으로 내부 시스템을 운영하고 있습니다.",
    s7Kicker: "남은 과제",
    s7Title: "고객이 꼽은 개선점",
    s7Body: "XGEN이 내부에 열어 주는 API 엔드포인트는 OpenAI 호환 v1/chat/completions 방식입니다. 그래서 이 API로 XGEN을 부르는 도구에서는 MCP나 도구 호출을 자유롭게 쓰는 데 제약이 있습니다. 고객이 원한 것은 아래 세 가지였고, 이 요구는 XGEN의 Agent 실행 환경인 Geny에서 다룰 수 있습니다.",
    s7NeedsTitle: "고객 요구와 Geny에서의 방법",
    s7NeedLabel: "고객 요구",
    s7AnswerLabel: "Geny에서의 방법",
    s7Needs: [
        {
            need: "사용자 PC에 있는 PPT MCP를 따로 붙여 쓰고 싶다",
            answer: "Geny Agent는 DexOn과 함께 쓰면 허용된 범위에서 사용자 PC의 MCP·파일·애플리케이션을 도구로 씁니다. 로컬 PPT MCP를 서버로 옮기지 않고 그 PC에서 실행합니다.",
        },
        {
            need: "외부 자원을 입력값을 넣으면 출력값이 나오는 방식으로 쉽게 쓰고 싶다",
            answer: "연결한 Tool은 입력과 출력이 정해진 단위로 등록됩니다. 필요한 Tool이 없으면 Agent가 코드를 작성하고 테스트해 Workspace에 저장하고(Tool Creation), 다음 업무에서 다시 씁니다.",
        },
        {
            need: "워크플로우에 내 도구(로컬 또는 다른 시스템의 도구)를 그냥 붙이고 싶다",
            answer: "Geny는 연결된 Tool을 한꺼번에 읽지 않고 현재 업무에 필요한 Tool을 찾아 씁니다(Tool Search). 로컬 도구는 DexOn으로, 다른 시스템의 도구는 API·MCP로 연결합니다. 실행은 XGEN의 권한·거버넌스 범위 안에서만 허용됩니다.",
        },
    ],
    s7Note: "OpenAI 호환 API 엔드포인트 자체의 도구 호출 제약은 그대로이며, 위 방법은 Geny Agent 안에서 도구를 쓰는 경로입니다. 롯데홈쇼핑 환경에 Geny와 DexOn을 적용하는 범위와 일정은 XGEN 버전과 구성에 따라 협의해 정합니다.",
    s7Link: "Geny 자세히 보기",
    s8Kicker: "다음 계획",
    s8Title: "부서별 맞춤 Agent를 만드는 구조로 넓힙니다",
    s8Body: [
        "롯데홈쇼핑은 부서별 요구를 분석해 맞춤형 Agent를 만드는 구조(AX Foundry)를 MD, 방송편성, CS, 재경으로 넓히고 있습니다. 사용자가 필요한 업무에 바로 적용할 수 있도록 Agent 환경도 정비하고 있습니다.",
    ],
    s8ListTitle: "현업과 함께 다듬고 있는 과제",
    s8List: [
        "입점 문의 Agent",
        "방송 CG 기획안 생성",
        "전시 영역 자동 세팅",
        "페르소나 봇",
    ],
    s8Note: "검토와 현업 테스트 단계의 과제로, 범위와 일정은 바뀔 수 있습니다.",
    q4: "최종 목표는 중요한 의사결정만 사람이 하고, 나머지는 AI가 최대한 자율적으로 처리하는 것입니다.",
    speaker: "오주영 과장",
    speakerOrg: "롯데홈쇼핑 AX팀",
    sourceTitle: "이 사례의 출처",
    sources: [
        "롯데홈쇼핑 AX팀 서면 인터뷰(2026.11.12) — 인용은 원문 그대로 옮겼습니다.",
        "플래티어 프로젝트 기록 — 통제 정책, 운영 구성, 모델 서빙 기록",
        "수치와 일정은 2026년 11월 기준이며, 운영 상황에 따라 바뀔 수 있습니다.",
    ],
    metaTitle: "고객 정보",
    meta: [
        ["고객", "롯데홈쇼핑"],
        ["업종", "커머스 · TV홈쇼핑"],
        ["제품", "XGEN"],
        ["구성", "고객사 인프라 내 운영 · 사내 GPU 모델과 클라우드 모델 병행"],
        ["적용 업무", "상품 안전, 시스템 안내, 재경, 방송 품질·심의"],
        ["상태", "운영 중 · 부서별 확산 중"],
    ],
    allCases: "전체 고객사례",
    contact: "도입 문의",
    previewBand:
        "고객 검토본 · 검색 색인 제외 — 롯데홈쇼핑 확인을 거쳐 정식 공개합니다.",
    reviewTitle: "확인 요청 항목",
    reviewItems: [
        "고객사 실명(롯데홈쇼핑)과 응답자 실명·직함(오주영 과장, AX팀) 공개 여부",
        "인용문 4개(처음 문제, 코드 없는 조립, 운영 만족도, 최종 목표)의 원문 사용 여부",
        "수치와 일정: 건당 약 20분, 500쪽+, 900명, 4개 부서, 10/14 오픈, 11/24 오픈 목표",
        "Moni의 역할: 인터뷰에서는 「방송 품질 점검 결과 등록」, 프로젝트 기록에서는 「임직원·협력사 업무 문의」로 적혀 있어 어느 쪽이 맞는지",
        "모델명(Gemma 4 31B, Qwen 3.8 27B, Qwen3.8-Flash-Next 125B A6B, Claude)과 사내 GPU 구성 공개 범위",
        "「남은 과제」 문단(API 엔드포인트 제약)과 Geny 보완 설명을 공개본에 둘지, 고객 요구 3가지의 표현이 맞는지",
        "「현업과 함께 다듬고 있는 과제」 4개를 공개해도 되는지",
    ],
};

const EN: Copy = {
    breadcrumbAria: "Breadcrumb",
    breadcrumbCases: "Customer cases",
    breadcrumbIndustry: "Commerce",
    badgeCustomer: "Commerce · Lotte Homeshopping",
    badgeStatus: "In operation · Rolling out",
    title: "Lotte Homeshopping: from a single chatbot to department-level AI agents",
    lead: "Lotte Homeshopping's AX team assembles work agents as workflows in XGEN, without code, and deploys them. Data that must not leave the company is handled by models on in-house GPUs; harder reasoning goes to cloud models — both on one platform. The work began with blocking sales of hazardous products and guiding staff through a next-generation system, and is now extending into finance and broadcast quality and review.",
    dateLabel: "Compiled 2026.11.21",
    readTime: "About 6 min",
    takeawaysTitle: "Key takeaways",
    takeaways: [
        [
            "Assembled without code, deployed directly",
            "Hazardous-product sales blocking, guidance for the next-generation A1+ system manual, a product-encyclopedia chatbot and an Excel generator were all built and deployed as workflows.",
        ],
        [
            "Models split along the data boundary",
            "Data that cannot leave the company is handled by open models on in-house GPUs (Gemma and Qwen families); harder reasoning is handled by cloud models such as Claude.",
        ],
        [
            "Rolling out by department",
            "A structure that analyzes each department's needs and builds agents for them (AX Foundry) is being extended to merchandising, broadcast scheduling, customer service and finance.",
        ],
    ],
    statsTitle: "The scope, in numbers",
    stats: [
        ["~20 min", "Time it took, before adoption, to check one hazardous product by hand on the online mall"],
        ["500+ pages", "Length of the next-generation system manual staff had to search themselves"],
        ["900", "People in the A1+ assistant's early release (employees and partners)"],
        ["4 departments", "Targets for the AX Foundry rollout (MD, scheduling, CS, finance)"],
    ],
    statsNote:
        "These are the pre-adoption working conditions and scope provided by the customer (as of November 2026). Time saved after adoption has not yet been measured and published.",
    s1Kicker: "The initial challenge",
    s1Title: "One chatbot could not keep up with growing requirements",
    s1Body: [
        "Lotte Homeshopping's generative-AI adoption began with a chatbot from a foreign vendor's system. As more departments used it, requirements grew one by one. Beyond answering questions, the work came to include searching the online mall and returning results in Excel, and walking staff through screen paths in internal systems.",
    ],
    q1: "We started with a chatbot from a foreign vendor's system. As requirements were added one at a time, we needed a foundation where we could build and operate (LLMOps) at the level of workflows.",
    reqTitle: "Three requirements for the new foundation",
    reqs: [
        ["Models", "Use cloud models (such as Claude) and on-premise models (such as Gemma and Qwen) together on one platform"],
        ["Data boundary", "Process data that must not leave the company on in-house GPUs, and send only hard reasoning to the cloud"],
        ["Operations", "Give users wide room to change things themselves as business needs shift"],
    ],
    s1Close:
        "What was needed was a foundation for building agents task by task and continuing to refine and operate them after deployment.",
    s2Kicker: "Selection",
    s2Title: "Compared side by side with the existing options",
    s2Lead: "At the time of selection, Lotte Homeshopping compared XGEN with other platforms it had been considering. The customer points to three differences.",
    s2Points: [
        "The build period was short.",
        "The system structure was relatively light.",
        "Users had wide room to change things themselves.",
    ],
    s2Close: "The customer also sees Plateer's in-house development of the platform as a factor in the decision.",
    s3Kicker: "The key decision",
    s3Title: "Models were split by how far the data is allowed to travel",
    s3Lead: "At the center of the setup is the ability to choose a different model for each step, even within one workflow.",
    s3Cards: [
        {
            icon: "cpu",
            title: "In-house GPUs · open models",
            desc: "Steps that handle data which cannot leave the company. Dense models such as Gemma 4 31B and Qwen 3.8 27B run on in-house GPUs.",
        },
        {
            icon: "cloud",
            title: "Cloud models",
            desc: "Steps that need harder reasoning. Cloud models such as Claude are called within the same workflow.",
        },
    ],
    s3Body: [
        "XGEN runs on a Kubernetes (K3s) cluster inside Lotte Homeshopping's infrastructure, with deployment images managed in an internal registry. In March 2026 the deployment moved to the consolidated service structure of XGEN 2.0, reducing the number of services to operate.",
        "Because there is one consistent way to connect tools (APIs and MCP), internal-system integrations could be organized into reusable patterns.",
    ],
    q2: "We can assemble the work we need as workflows, without code, and deploy them right away. The next-generation system manual, the product-encyclopedia chatbot and the Excel generator were all built this way.",
    s4Kicker: "What changed",
    s4Title: "How it was done before, and how it is done now",
    s4Lead: "Changes the customer pointed to, task by task. Some integrations are still in progress.",
    beforeLabel: "Before",
    afterLabel: "Now",
    tasks: [
        {
            no: "01",
            title: "Blocking sales of hazardous products",
            before: "Staff checked the Korea distribution agency's hazardous-product list against the online mall by hand, taking about 20 minutes per item.",
            after: "An agent searches the online mall and delivers the check results in Excel.",
            status: "In operation since 2026.10.14",
        },
        {
            no: "02",
            title: "Next-generation system (A1+) manual",
            before: "Staff had to search through a manual of more than 500 pages themselves.",
            after: "The \"A1+ assistant\" guides users step by step, down to the screen path.",
            status: "Early release to 900 employees and partners",
        },
        {
            no: "03",
            title: "Taxi receipt expense processing",
            before: "Receipt details were keyed in by hand and matched against card statements.",
            after: "Uploading a photo leads through reading, corporate-card matching and drafting the approval request; the finance team only does the final check.",
            status: "Integration in progress · target launch 2026.11.24",
        },
        {
            no: "04",
            title: "Broadcast quality and review",
            after: "Simisimi (real-time broadcast review) and Moni (recording broadcast quality-check results) are in operation.",
            status: "In operation",
        },
    ],
    flowTitle: "Taxi expense processing flow",
    flowNote: "A person checks the last step. Approval requests drafted by the agent are processed only after the finance team verifies them.",
    flow: [
        { who: "Employee", step: "Upload receipt photo" },
        { who: "Agent", step: "Read the receipt" },
        { who: "Agent", step: "Match corporate-card record" },
        { who: "Agent", step: "Draft approval request" },
        { who: "Finance team", step: "Final verification", human: true },
    ],
    humanLabel: "Human check",
    s5Kicker: "Safeguards",
    s5Title: "Answer rules and controls differ by the nature of the work",
    s5Lead: "Because business staff use it directly, rules were set on both the input and the answer side.",
    s5Items: [
        [
            "Input checks",
            "Chat text, attached documents and images pass a harmful-content check and then personal-data detection (regular expressions plus named-entity recognition). If personal data is found, the request pauses and the user is asked whether to proceed; if they do, the masked content is sent. Images go through the same checks after text is extracted by OCR.",
        ],
        [
            "Answer rules",
            "The work-inquiry agent for employees and partners answers quality (QA) questions only from what the knowledge base confirms, and does not answer without grounds. For SCM, MD and CS questions it may reason, but marks inferred parts with [Inference].",
        ],
        [
            "Staged rollout",
            "Features such as personal-data protection were released to a subset of users first, then widened.",
        ],
    ],
    s6Kicker: "Solving problems together",
    s6Title: "Expanding in-house GPU model serving with Plateer's FDE and research staff",
    s6Body: [
        "While running dense models such as Gemma 4 31B and Qwen 3.8 27B on in-house GPUs, the team saw that a larger MoE model, Qwen3.8-Flash-Next 125B A6B, could also be hosted. Working with Plateer's FDE and research participants, they deployed it and tuned the detailed settings, and it is now served stably.",
    ],
    s6ListTitle: "Worked out together during operation",
    s6List: [
        "Gemma 4 failing to serve right after deployment came from the model checkpoint, vLLM and transformers following different version conventions. Aligning and pinning the versions resolved it (August 2026).",
        "A deployment that stalled because nodes could not reach an external image registry on restart was reproduced in the same private-network setup, and organized into a required-image list and an internal-registry operating plan.",
    ],
    q3: "From the base models to XGEN workflows and the results the LLM produces, we are currently running our internal systems at a satisfactory level.",
    s7Kicker: "Open issue",
    s7Title: "An improvement the customer pointed out",
    s7Body: "The API endpoint XGEN exposes internally follows the OpenAI-compatible v1/chat/completions format. As a result, tools that call XGEN through this API are limited in how freely they can use MCP or tool calling. The customer asked for the three things below, and Geny, XGEN's agent runtime, can address them.",
    s7NeedsTitle: "What the customer asked for, and how Geny handles it",
    s7NeedLabel: "Customer need",
    s7AnswerLabel: "How Geny handles it",
    s7Needs: [
        {
            need: "Attach a PowerPoint MCP server that runs on the user's own PC",
            answer: "Used with DexOn, a Geny agent can use MCP servers, files and applications on the user's PC as tools, within the allowed scope. The local PowerPoint MCP runs on that PC instead of being moved to the server.",
        },
        {
            need: "Use external resources easily, as input in and output out",
            answer: "Connected tools are registered as units with defined inputs and outputs. When a needed tool does not exist, the agent writes and tests the code, saves it to its Workspace (Tool Creation), and reuses it in later work.",
        },
        {
            need: "Simply plug my own tools, local or in other systems, into a workflow",
            answer: "Geny finds the tools the current task needs instead of loading every connected tool at once (Tool Search). Local tools connect through DexOn, and tools in other systems connect through APIs or MCP. Execution is allowed only within XGEN's permission and governance scope.",
        },
    ],
    s7Note: "The tool-calling limit of the OpenAI-compatible API endpoint itself remains; the approach above is how tools are used inside a Geny agent. The scope and timing of applying Geny and DexOn to Lotte Homeshopping's environment will be agreed based on the XGEN version and configuration.",
    s7Link: "Learn more about Geny",
    s8Kicker: "What's next",
    s8Title: "Extending a structure for department-specific agents",
    s8Body: [
        "Lotte Homeshopping is extending a structure that analyzes each department's needs and builds tailored agents (AX Foundry) to merchandising, broadcast scheduling, customer service and finance. It is also refining the agent environment so users can apply it directly to the work they need.",
    ],
    s8ListTitle: "Being refined with the business teams",
    s8List: [
        "Vendor-onboarding inquiry agent",
        "Broadcast CG planning drafts",
        "Automatic setup of display areas",
        "Persona bot",
    ],
    s8Note: "These are in review and user-testing stages; scope and timing may change.",
    q4: "The end goal is for people to make only the important decisions, and for AI to handle the rest as autonomously as possible.",
    speaker: "Juyoung Oh",
    speakerOrg: "AX Team, Lotte Homeshopping",
    sourceTitle: "Sources for this case",
    sources: [
        "Written interview with the Lotte Homeshopping AX team (2026.11.12) — quotes are translated from the original.",
        "Plateer project records — control policies, operating setup, and model-serving records",
        "Figures and dates are as of November 2026 and may change with operations.",
    ],
    metaTitle: "Customer profile",
    meta: [
        ["Customer", "Lotte Homeshopping"],
        ["Industry", "Commerce · TV home shopping"],
        ["Product", "XGEN"],
        ["Setup", "Runs inside the customer's infrastructure · in-house GPU models alongside cloud models"],
        ["Applied to", "Product safety, system guidance, finance, broadcast quality and review"],
        ["Status", "In operation · rolling out by department"],
    ],
    allCases: "All customer cases",
    contact: "Get in touch",
    previewBand:
        "Customer review draft · excluded from search — to be published after Lotte Homeshopping's confirmation.",
    reviewTitle: "Items to confirm",
    reviewItems: [
        "Use of the customer name (Lotte Homeshopping) and the respondent's name and title",
        "Use of the four quotes as written",
        "Figures and dates: ~20 min per item, 500+ pages, 900 people, 4 departments, 10/14 launch, 11/24 target",
        "Moni's role: the interview says recording broadcast quality-check results, project records say work inquiries for employees and partners",
        "How much of the model names and in-house GPU setup may be published",
        "Whether the open-issue paragraph (API endpoint limits) and the Geny follow-up stay in the public version, and whether the three customer needs are worded correctly",
        "Whether the four tasks being refined may be published",
    ],
};

const H2 = "text-[22px] font-bold leading-snug tracking-tight text-[var(--color-ink)] md:text-[25px]";
const KICKER = "text-[12px] font-bold uppercase tracking-[0.14em] text-[#2461d8]";
const P = "text-[16.5px] leading-[1.8] text-[var(--color-ink-muted)]";

function PullQuote({ text, who, org }: { text: string; who: string; org: string }) {
    return (
        <figure className="my-8 border-l-4 border-[#2f7bff] bg-[var(--color-surface-alt)] px-6 py-5">
            <Quote aria-hidden className="h-5 w-5 rotate-180 text-[#2461d8]/30" />
            <blockquote className="mt-2 text-[18px] font-medium leading-relaxed text-[var(--color-ink)] md:text-[19px]">
                {text}
            </blockquote>
            <figcaption className="mt-3 text-[14px] text-[var(--color-ink-subtle)]">
                {who} · {org}
            </figcaption>
        </figure>
    );
}

function Section({
    kicker,
    title,
    children,
}: {
    kicker: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="border-t border-[var(--color-line)] pt-10">
            <p className={KICKER}>{kicker}</p>
            <h2 className={`mt-2 ${H2}`}>{title}</h2>
            <div className="mt-5 space-y-5">{children}</div>
        </section>
    );
}

export function LotteHomeshoppingCaseBody({
    locale = "ko",
    preview = false,
}: {
    locale?: Locale;
    preview?: boolean;
}) {
    const t = locale === "en" ? EN : KO;

    return (
        <main className="pb-20">
            {preview && (
                <div className="border-b border-[#f3d9a4] bg-[#fff8e8]">
                    <p className="mx-auto max-w-6xl px-6 py-2.5 text-[13.5px] font-semibold text-[#8a5a00]">
                        {t.previewBand}
                    </p>
                </div>
            )}

            {/* 머리말 — 밝은 바탕, 왼쪽 정렬 */}
            <header className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                <div className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:pt-12">
                    <nav
                        aria-label={t.breadcrumbAria}
                        className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--color-ink-subtle)]"
                    >
                        <Link href={localeHref(locale, "/customers")} className="hover:text-[#2461d8]">
                            {t.breadcrumbCases}
                        </Link>
                        <span>/</span>
                        <Link href={localeHref(locale, "/customers/commerce")} className="hover:text-[#2461d8]">
                            {t.breadcrumbIndustry}
                        </Link>
                    </nav>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-[#2f7bff]/30 bg-[#2f7bff]/[0.07] px-3 py-1 text-[12.5px] font-bold text-[#2461d8]">
                            XGEN
                        </span>
                        <span className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[12.5px] font-semibold text-[var(--color-ink-muted)]">
                            {t.badgeCustomer}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfe5cf] bg-[#ecf8f1] px-3 py-1 text-[12.5px] font-bold text-[#1f7a46]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1f9d57]" />
                            {t.badgeStatus}
                        </span>
                    </div>
                    <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-subtle)]">
                        Customer Story
                    </p>
                    <h1 className="mt-2 max-w-4xl text-[30px] font-bold leading-[1.2] tracking-tight text-[var(--color-ink)] md:text-[42px]">
                        {t.title}
                    </h1>
                    <p className="mt-5 max-w-3xl text-[17.5px] leading-relaxed text-[var(--color-ink-muted)] md:text-[19px]">
                        {t.lead}
                    </p>
                    <p className="mt-5 text-[13.5px] text-[var(--color-ink-subtle)]">
                        <time dateTime="2026-11-21">{t.dateLabel}</time> · {t.readTime}
                    </p>
                </div>
            </header>

            <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
                {/* 고객 정보 — 데스크톱은 오른쪽 고정, 모바일은 본문 위 */}
                <aside className="lg:order-2">
                    <div className="lg:sticky lg:top-24">
                        <div className="border border-[var(--color-line)] bg-white">
                            <p className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-3 text-[13px] font-bold text-[var(--color-ink)]">
                                {t.metaTitle}
                            </p>
                            <dl className="divide-y divide-[var(--color-line)]">
                                {t.meta.map(([k, v]) => (
                                    <div key={k} className="px-5 py-3">
                                        <dt className="text-[12px] font-semibold text-[var(--color-ink-subtle)]">{k}</dt>
                                        <dd className="mt-0.5 text-[14px] leading-relaxed text-[var(--color-ink)]">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <Link
                            href={`${localeHref(locale, "/contact")}?from=customers-case`}
                            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2461d8] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#1b4fb0]"
                        >
                            {t.contact}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </aside>

                <article className="min-w-0 lg:order-1">
                    {/* 핵심 요약 */}
                    <section className="border border-[var(--color-line)] bg-white p-6 md:p-7">
                        <h2 className="text-[15px] font-bold text-[var(--color-ink)]">{t.takeawaysTitle}</h2>
                        <ol className="mt-4 space-y-4">
                            {t.takeaways.map(([head, body], i) => (
                                <li key={head} className="flex gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#2461d8] font-mono text-[12.5px] font-bold text-white">
                                        {i + 1}
                                    </span>
                                    <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                        <b className="font-semibold text-[var(--color-ink)]">{head}:</b> {body}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* 숫자 */}
                    <section className="mt-8">
                        <h2 className="text-[15px] font-bold text-[var(--color-ink)]">{t.statsTitle}</h2>
                        <dl className="mt-3 grid grid-cols-2 border-l border-t border-[var(--color-line)] md:grid-cols-4">
                            {t.stats.map(([v, label]) => (
                                <div key={v} className="border-b border-r border-[var(--color-line)] bg-white p-4">
                                    <dd className="text-[24px] font-bold tracking-tight text-[#2461d8]">{v}</dd>
                                    <dt className="mt-1 text-[13px] leading-snug text-[var(--color-ink-muted)]">{label}</dt>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--color-ink-subtle)]">{t.statsNote}</p>
                    </section>

                    <div className="mt-12 space-y-12">
                        {/* 1. 처음 문제 */}
                        <Section kicker={t.s1Kicker} title={t.s1Title}>
                            {t.s1Body.map((p) => (
                                <p key={p} className={P}>{p}</p>
                            ))}
                            <PullQuote text={t.q1} who={t.speaker} org={t.speakerOrg} />
                            <h3 className="text-[16.5px] font-bold text-[var(--color-ink)]">{t.reqTitle}</h3>
                            <ol className="border-t border-[var(--color-line)]">
                                {t.reqs.map(([k, v], i) => (
                                    <li key={k} className="flex gap-4 border-b border-[var(--color-line)] py-3.5">
                                        <span className="w-6 flex-none font-mono text-[14px] font-bold text-[#2461d8]">
                                            {i + 1}
                                        </span>
                                        <p className="text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            <b className="font-semibold text-[var(--color-ink)]">{k}</b> — {v}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                            <p className={P}>{t.s1Close}</p>
                        </Section>

                        {/* 2. 선정 */}
                        <Section kicker={t.s2Kicker} title={t.s2Title}>
                            <p className={P}>{t.s2Lead}</p>
                            <ul className="space-y-2 pl-1">
                                {t.s2Points.map((p) => (
                                    <li key={p} className="flex gap-2.5 text-[16px] leading-relaxed text-[var(--color-ink)]">
                                        <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                            <p className={P}>{t.s2Close}</p>
                        </Section>

                        {/* 3. 핵심 결정 */}
                        <Section kicker={t.s3Kicker} title={t.s3Title}>
                            <p className={P}>{t.s3Lead}</p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {t.s3Cards.map((c) => {
                                    const Icon = c.icon === "cpu" ? Cpu : Cloud;
                                    return (
                                        <div key={c.title} className="border border-[var(--color-line)] bg-white p-5">
                                            <Icon className="h-5 w-5 text-[#2461d8]" />
                                            <p className="mt-3 text-[15.5px] font-bold text-[var(--color-ink)]">{c.title}</p>
                                            <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                                {c.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            {t.s3Body.map((p) => (
                                <p key={p} className={P}>{p}</p>
                            ))}
                            <PullQuote text={t.q2} who={t.speaker} org={t.speakerOrg} />
                        </Section>

                        {/* 4. 바뀐 업무 */}
                        <Section kicker={t.s4Kicker} title={t.s4Title}>
                            <p className={P}>{t.s4Lead}</p>
                            <div className="space-y-4">
                                {t.tasks.map((task) => (
                                    <div key={task.no} className="border border-[var(--color-line)] bg-white">
                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-3">
                                            <span className="font-mono text-[13px] font-bold text-[#2461d8]">{task.no}</span>
                                            <p className="text-[16px] font-bold text-[var(--color-ink)]">{task.title}</p>
                                            <span className="text-[13px] font-semibold text-[var(--color-ink-subtle)] sm:ml-auto">
                                                {task.status}
                                            </span>
                                        </div>
                                        <dl className="grid gap-0 sm:grid-cols-2">
                                            {task.before && (
                                                <div className="border-b border-[var(--color-line)] px-5 py-4 sm:border-b-0 sm:border-r">
                                                    <dt className="text-[12.5px] font-bold text-[var(--color-ink-subtle)]">{t.beforeLabel}</dt>
                                                    <dd className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{task.before}</dd>
                                                </div>
                                            )}
                                            <div className={`px-5 py-4 ${task.before ? "" : "sm:col-span-2"}`}>
                                                <dt className="text-[12.5px] font-bold text-[#2461d8]">{t.afterLabel}</dt>
                                                <dd className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-ink)]">{task.after}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                ))}
                            </div>

                            {/* 업무 흐름 — 사람 확인 단계를 글자로도 표시 */}
                            <div className="border border-[var(--color-line)] bg-white p-5">
                                <p className="text-[15px] font-bold text-[var(--color-ink)]">{t.flowTitle}</p>
                                <ol className="mt-4 grid gap-2 sm:grid-cols-5">
                                    {t.flow.map((f, i) => (
                                        <li
                                            key={f.step}
                                            className={`border px-3 py-3 ${f.human ? "border-[#2461d8] bg-[#eef4ff]" : "border-[var(--color-line)] bg-[var(--color-surface-alt)]"}`}
                                        >
                                            <p className="font-mono text-[12px] font-bold text-[var(--color-ink-subtle)]">
                                                {i + 1} · {f.who}
                                            </p>
                                            <p className="mt-1 text-[14px] font-semibold leading-snug text-[var(--color-ink)]">{f.step}</p>
                                            {f.human && (
                                                <p className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-bold text-[#2461d8]">
                                                    <UserCheck className="h-3.5 w-3.5" />
                                                    {t.humanLabel}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">{t.flowNote}</p>
                            </div>
                        </Section>

                        {/* 5. 안전장치 */}
                        <Section kicker={t.s5Kicker} title={t.s5Title}>
                            <p className={P}>{t.s5Lead}</p>
                            <dl className="border-t border-[var(--color-line)]">
                                {t.s5Items.map(([k, v]) => (
                                    <div key={k} className="grid gap-1 border-b border-[var(--color-line)] py-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-5">
                                        <dt className="text-[15px] font-bold text-[var(--color-ink)]">{k}</dt>
                                        <dd className="text-[15px] leading-relaxed text-[var(--color-ink-muted)]">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Section>

                        {/* 6. 함께 푼 문제 */}
                        <Section kicker={t.s6Kicker} title={t.s6Title}>
                            {t.s6Body.map((p) => (
                                <p key={p} className={P}>{p}</p>
                            ))}
                            <div className="border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-5">
                                <p className="text-[15px] font-bold text-[var(--color-ink)]">{t.s6ListTitle}</p>
                                <ul className="mt-3 space-y-2.5">
                                    {t.s6List.map((li) => (
                                        <li key={li} className="flex gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                            <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[#2f7bff]" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <PullQuote text={t.q3} who={t.speaker} org={t.speakerOrg} />
                        </Section>

                        {/* 7. 남은 과제 */}
                        <Section kicker={t.s7Kicker} title={t.s7Title}>
                            <p className={P}>{t.s7Body}</p>
                            <div>
                                <p className="text-[15px] font-bold text-[var(--color-ink)]">{t.s7NeedsTitle}</p>
                                <ol className="mt-3 border-t border-[var(--color-line)]">
                                    {t.s7Needs.map((n, i) => (
                                        <li key={n.need} className="grid gap-2 border-b border-[var(--color-line)] py-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-6">
                                            <div>
                                                <p className="text-[12.5px] font-semibold text-[var(--color-ink-subtle)]">
                                                    {String(i + 1).padStart(2, "0")} · {t.s7NeedLabel}
                                                </p>
                                                <p className="mt-1 text-[14.5px] font-semibold leading-relaxed text-[var(--color-ink)]">{n.need}</p>
                                            </div>
                                            <div>
                                                <p className="text-[12.5px] font-semibold text-[#2461d8]">{t.s7AnswerLabel}</p>
                                                <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">{n.answer}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-ink-subtle)]">{t.s7Note}</p>
                                <Link
                                    href={localeHref(locale, "/blog/product-xgeny")}
                                    className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2461d8] hover:underline"
                                >
                                    {t.s7Link}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </Section>

                        {/* 8. 다음 계획 */}
                        <Section kicker={t.s8Kicker} title={t.s8Title}>
                            {t.s8Body.map((p) => (
                                <p key={p} className={P}>{p}</p>
                            ))}
                            <div>
                                <p className="text-[15px] font-bold text-[var(--color-ink)]">{t.s8ListTitle}</p>
                                <ul className="mt-3 flex flex-wrap gap-2">
                                    {t.s8List.map((li) => (
                                        <li key={li} className="border border-[var(--color-line)] bg-white px-3 py-1.5 text-[14px] font-semibold text-[var(--color-ink-muted)]">
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-2.5 text-[13px] text-[var(--color-ink-subtle)]">{t.s8Note}</p>
                            </div>
                            <PullQuote text={t.q4} who={t.speaker} org={t.speakerOrg} />
                        </Section>

                        {/* 출처 */}
                        <section className="border-t border-[var(--color-line)] pt-8">
                            <h2 className="text-[15px] font-bold text-[var(--color-ink)]">{t.sourceTitle}</h2>
                            <ul className="mt-3 space-y-1.5">
                                {t.sources.map((s) => (
                                    <li key={s} className="text-[13.5px] leading-relaxed text-[var(--color-ink-subtle)]">
                                        · {s}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {preview && (
                            <section className="border border-[#f3d9a4] bg-[#fff8e8] p-5">
                                <h2 className="text-[15px] font-bold text-[#8a5a00]">{t.reviewTitle}</h2>
                                <ol className="mt-3 space-y-2">
                                    {t.reviewItems.map((r, i) => (
                                        <li key={r} className="flex gap-2.5 text-[14px] leading-relaxed text-[#6b4700]">
                                            <span className="w-5 flex-none font-mono font-bold">{i + 1}</span>
                                            {r}
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-6">
                            <Link
                                href={localeHref(locale, "/customers")}
                                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-ink-muted)] transition hover:text-[#2461d8]"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                {t.allCases}
                            </Link>
                            <Link
                                href={`${localeHref(locale, "/contact")}?from=customers-case`}
                                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2461d8] transition hover:text-[#1b4fb0]"
                            >
                                {t.contact}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
