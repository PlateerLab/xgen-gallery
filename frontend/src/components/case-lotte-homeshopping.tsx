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
    lead: string[];
    takeawaysTitle: string;
    takeaways: [string, string][];
    statsTitle: string;
    stats: [string, string, string][];
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
    s7ApproachTitle: string;
    s7Approach: string;
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
    logoSrc: string;
    logoAlt: string;
    heroAlt: string;
    heroCredit: string;
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
    title: "롯데홈쇼핑, 챗봇에서 시작해 부서별 업무를 수행하는 AI Agent로",
    lead: [
        "시작은 하나의 챗봇이었습니다. 이제 롯데홈쇼핑 AX팀은 XGEN을 활용해 새로운 업무에 필요한 AI Agent를 직접 만들고, 현업에 적용하는 단계로 나아가고 있습니다.",
        "보안이 중요한 사내 데이터는 내부 GPU 환경에서 운영하는 AI 모델로 처리하고, 복잡한 추론이 필요한 업무에는 클라우드 AI 모델을 활용합니다.",
        "위해상품 판매차단과 차세대 시스템 업무 안내에서 시작한 AI Agent의 활용 범위는 재경 업무와 방송 품질·심의 영역으로 점차 확대되고 있습니다.",
    ],
    takeawaysTitle: "핵심 요약",
    takeaways: [
        [
            "필요한 업무는 바로 만들어 씁니다",
            "위해상품 판매차단, 차세대 시스템 매뉴얼 안내, 상품백과 챗봇, 엑셀 생성기. 이 모든 업무는 별도의 코딩 없이 워크플로우로 구성하고, AI Agent로 만들어 현업에 배포했습니다.",
        ],
        [
            "데이터가 머물 곳에 맞춰 모델을 고릅니다",
            "밖으로 나갈 수 없는 데이터는 사내 GPU의 오픈 모델이, 깊은 추론은 Claude 같은 클라우드 모델이 처리합니다. 두 모델을 한 플랫폼 안에서 함께 씁니다.",
        ],
        [
            "한 부서에서 다음 부서로 넓혀 갑니다",
            "부서마다 요구를 듣고 그에 맞는 Agent를 만드는 방식을 MD, 방송편성, CS, 재경으로 넓혀 가고 있습니다.",
        ],
    ],
    statsTitle: "숫자로 보는 롯데홈쇼핑의 AX 전환",
    stats: [
        ["약 20분", "위해상품 1건 처리", "도입 전, 아이몰에서 위해상품 1건을 수작업으로 판매차단하는 데 소요된 시간"],
        ["500쪽+", "차세대 시스템 매뉴얼", "담당자가 직접 검색하고 확인해야 했던 방대한 업무 매뉴얼"],
        ["900명", "AI 업무 안내 대상", "A1+ 업무 안내 Agent를 활용하는 임직원 및 협력사 대상 규모"],
        ["4개 부서", "AI Agent 확산 영역", "위해상품·시스템 안내에서 재경 및 방송 품질·심의 업무로 확대"],
    ],
    s1Kicker: "출발점",
    s1Title: "챗봇에서 시작된 AI 활용, 업무 실행으로 요구가 확대되다",
    s1Body: [
        "롯데홈쇼핑의 생성형 AI 도입은 외산 솔루션 기반의 챗봇에서 시작됐습니다. 활용 부서가 늘어나면서 AI에 대한 기대도 달라졌습니다. 단순히 질문에 답하는 것을 넘어, 실제 업무를 수행할 수 있는 AI가 필요해진 것입니다.",
        "아이몰에서 위해상품을 검색하고 결과를 엑셀로 정리하거나, 방대한 사내 시스템 매뉴얼에서 필요한 정보를 찾아 해당 업무 화면까지 안내하는 등 요구사항은 점차 구체화됐습니다.",
        "이처럼 업무별 요구가 다양해지면서, 기존 챗봇 중심의 활용 방식에서 벗어나 각 업무에 맞는 AI Agent를 만들고 운영할 수 있는 플랫폼의 필요성이 커졌습니다.",
    ],
    q1: "처음에는 외국계 시스템 챗봇으로 시작했습니다. 여기에 요건이 하나씩 늘면서 워크플로우 단위로 만들고 운영(AIOps)할 수 있는 기반이 필요해졌습니다.",
    reqTitle: "새로운 AI 플랫폼에 요구한 세 가지 조건",
    reqs: [
        ["모델", "Claude 같은 클라우드 모델과 Gemma·Qwen 같은 온프레미스 모델을 한 플랫폼에서 함께 쓰고 싶었습니다."],
        ["데이터 경계", "밖으로 나가면 안 되는 데이터는 사내 GPU에서 처리하고, 어려운 추론만 클라우드로 보내야 했습니다."],
        ["운영", "현업의 요구가 바뀌면 사용자가 직접 손볼 수 있어야 했습니다."],
    ],
    s1Close:
        "결국 필요한 것은 업무마다 Agent를 만들고, 내놓은 뒤에도 계속 다듬어 가며 운영할 수 있는 기반이었습니다.",
    s2Kicker: "선택의 이유",
    s2Title: "롯데홈쇼핑이 XGEN을 선택한 세 가지 이유",
    s2Lead: "롯데홈쇼핑은 여러 AI 플랫폼을 검토하며 자사의 업무 환경과 요구사항에 적합한 솔루션을 비교했습니다. 그 과정에서 XGEN을 선택하게 된 핵심 요인은 세 가지였습니다.",
    s2Points: [
        "구축 기간이 짧았습니다.",
        "구조가 비교적 가벼웠습니다.",
        "사용자가 직접 바꿀 수 있는 범위가 넓었습니다.",
    ],
    s2Close: "플래티어가 플랫폼을 직접 만들어 온 기술력도 선택에 힘을 보탰다고 고객은 말합니다.",
    s3Kicker: "핵심 결정",
    s3Title: "데이터는 안전하게, AI 모델은 업무에 맞게",
    s3Lead: "롯데홈쇼핑은 데이터의 보안 수준과 업무 특성에 따라 사내 AI 모델과 클라우드 AI 모델을 선택적으로 활용합니다. XGEN은 하나의 워크플로우 안에서도 작업 단계별로 적합한 모델을 연결할 수 있도록 지원합니다.",
    s3Cards: [
        {
            icon: "cpu",
            title: "사내 GPU 기반 AI 모델",
            desc: "외부 반출이 제한된 데이터를 처리하는 업무에는 사내 GPU 환경에서 운영하는 오픈 모델을 활용합니다. 기업 내부 인프라에서 데이터를 처리하며 보안 요구사항에 대응합니다.",
        },
        {
            icon: "cloud",
            title: "클라우드 AI 모델",
            desc: "복잡한 분석과 추론이 필요한 업무에는 Claude 등 클라우드 AI 모델을 활용합니다. 업무의 목적과 난이도에 따라 적합한 모델을 선택할 수 있습니다.",
        },
    ],
    s3Body: [
        "XGEN은 롯데홈쇼핑의 쿠버네티스 환경에서 운영되며, 배포 이미지는 사내 레지스트리를 통해 관리합니다. 2026년 3월에는 XGEN agentflow의 통합 서비스 구조로 전환해 운영 대상을 단순화했습니다.",
        "또한 API와 MCP를 통해 사내 시스템과 AI Agent를 연결하고, 한 번 구성한 도구를 다른 업무에서도 재사용할 수 있도록 했습니다.",
        "이러한 환경을 바탕으로 롯데홈쇼핑 AX팀은 별도의 코딩 없이 업무별 워크플로우를 구성하고, 필요한 AI Agent를 직접 만들어 배포하고 있습니다.",
    ],
    q2: "필요한 업무를 코드 없이 워크플로우로 구성해 바로 배포할 수 있습니다. 차세대 시스템 매뉴얼, 상품백과 챗봇, 엑셀 생성기도 모두 이 방식으로 만들었습니다.",
    s4Kicker: "달라진 일상",
    s4Title: "같은 일, 달라진 방식",
    s4Lead: "고객이 직접 꼽은 업무별 변화입니다. 아직 연동을 이어 가고 있는 업무도 있습니다.",
    beforeLabel: "예전",
    afterLabel: "지금",
    tasks: [
        {
            no: "01",
            title: "위해상품 판매차단",
            before: "유통물류진흥원의 위해상품 목록을 담당자가 아이몰에서 한 건씩 손으로 대조했습니다. 한 건에 20분 남짓 걸리던 일입니다.",
            after: "이제 Agent가 아이몰을 검색하고, 대조 결과를 엑셀로 건넵니다.",
            status: "운영 중",
        },
        {
            no: "02",
            title: "차세대 시스템 매뉴얼",
            before: "500쪽이 넘는 매뉴얼에서 필요한 대목을 직접 찾아 읽어야 했습니다.",
            after: "「차세대 A1+ 도우미」에게 물으면 어느 화면으로 가야 하는지까지 차근차근 짚어 줍니다.",
            status: "임직원·협력사 900명에게 먼저 공개",
        },
        {
            no: "03",
            title: "방송 품질·심의",
            after: "실시간 방송 심의를 돕는 Agent와 방송 품질 점검 결과를 등록하는 Agent가 현장에서 쓰이고 있습니다.",
            status: "운영 중",
        },
        {
            no: "04",
            title: "택시비 영수증 전표 처리",
            before: "영수증 내용을 손으로 옮겨 적고, 카드 내역과 하나하나 맞춰 봤습니다.",
            after: "사진 한 장을 올리면 판독부터 법인카드 매칭, 품의 작성까지 이어집니다. 재경팀은 마지막 검증에만 집중합니다.",
            status: "연동 진행 중",
        },
    ],
    flowTitle: "택시비 전표는 이렇게 흘러갑니다",
    flowNote: "마지막 판단은 사람이 합니다. Agent가 쓴 품의는 재경팀 검증을 거친 뒤에야 처리됩니다.",
    flow: [
        { who: "직원", step: "영수증 사진 업로드" },
        { who: "Agent", step: "영수증 판독" },
        { who: "Agent", step: "법인카드 내역 매칭" },
        { who: "Agent", step: "품의 작성" },
        { who: "재경팀", step: "최종 검증", human: true },
    ],
    humanLabel: "사람 확인",
    s5Kicker: "안전장치",
    s5Title: "현업이 매일 쓰는 도구인 만큼, 업무마다 기준을 달리했습니다",
    s5Lead: "질문이 들어올 때와 답이 나갈 때, 양쪽에 기준을 세웠습니다.",
    s5Items: [
        [
            "입력 검사",
            "채팅과 첨부 문서, 이미지는 유해 콘텐츠 검사와 개인정보 탐지를 차례로 거칩니다. 개인정보가 보이면 요청을 잠시 멈추고 계속할지 묻습니다. 계속하기로 하면 그 부분을 가린 채로 보냅니다. 이미지는 글자를 뽑아낸 뒤 같은 검사를 거칩니다.",
        ],
        [
            "답변 기준",
            "임직원·협력사 업무 문의 Agent는 품질 질문에는 지식베이스에서 확인되는 내용만 답하고, 근거가 없으면 답하지 않습니다. SCM·MD·CS 질문에는 추론을 허용하되, 추론한 대목에는 [추론]이라고 표시합니다.",
        ],
        [
            "단계적 배포",
            "개인정보 보호 같은 기능은 일부 사용자에게 먼저 열어 본 뒤 범위를 넓혔습니다.",
        ],
    ],
    s6Kicker: "함께 해결한 기술 과제",
    s6Title: "기존 GPU 환경에서 더 큰 AI 모델까지, 함께 구현한 기술적 확장",
    s6Body: [
        "롯데홈쇼핑은 기존 사내 GPU 환경에서 Dense 모델을 운영하며 AI 활용 범위를 넓혀왔습니다. 이후 더 큰 규모의 MoE 모델까지 활용할 수 있는 가능성을 확인하면서, 기존 인프라에서 모델 운영 환경을 확장하는 과제에 착수했습니다.",
        "이 과정에 플래티어 FDE와 AI 연구소가 함께 참여했습니다. 모델 배포부터 실행 환경 구성, 세부 설정 조정까지 기술적 과제를 단계적으로 해결했으며, 현재는 확장된 모델을 안정적으로 서빙하고 있습니다.",
        "이를 통해 롯데홈쇼핑은 기존 GPU 인프라의 활용 범위를 넓히고, 업무 특성에 따라 선택할 수 있는 사내 AI 모델의 폭을 확대했습니다.",
    ],
    s6ListTitle: "운영하며 함께 풀어 낸 일",
    s6List: [
        "Gemma 4가 배포 직후 응답하지 않던 문제는 모델 체크포인트, vLLM, transformers가 서로 다른 버전 규칙을 따르면서 생겼습니다. 버전을 맞춰 고정하자 정상으로 돌아왔습니다.",
        "노드를 다시 띄울 때 외부 이미지 저장소에 닿지 못해 배포가 멈춘 일도 있었습니다. 같은 사설망 환경에서 그대로 재현해 보고, 필요한 이미지 목록과 사내 레지스트리 운영 방안으로 정리했습니다.",
    ],
    q3: "기반 모델부터 XGEN 워크플로우, LLM이 내놓는 결과까지 현재는 만족스러운 수준으로 내부 시스템을 운영하고 있습니다.",
    s7Kicker: "남은 과제",
    s7Title: "고객이 들려준 아쉬움, 그리고 플래티어의 답",
    s7Body: "아쉬운 점도 솔직하게 들었습니다. XGEN이 사내에 열어 주는 API 엔드포인트는 OpenAI 호환 v1/chat/completions 방식입니다. 그래서 이 API로 XGEN을 부르는 도구에서는 MCP나 도구 호출을 마음껏 쓰기 어렵습니다. 고객이 바란 것은 아래 세 가지였고, XGEN의 Agent 실행 환경인 Geny에서 풀어 갈 수 있습니다.",
    s7NeedsTitle: "고객의 바람과 Geny의 방법",
    s7NeedLabel: "고객의 바람",
    s7AnswerLabel: "Geny에서는",
    s7Needs: [
        {
            need: "내 PC에 있는 PPT MCP를 따로 붙여 쓰고 싶다",
            answer: "DexOn과 함께 쓰면 Geny Agent가 허용된 범위 안에서 사용자 PC의 MCP·파일·앱을 도구로 씁니다. PPT MCP를 서버로 옮기지 않아도, 그 PC에서 그대로 돌아갑니다.",
        },
        {
            need: "외부 자원을, 넣으면 결과가 나오는 방식으로 쉽게 쓰고 싶다",
            answer: "연결한 Tool은 입력과 출력이 정해진 단위로 등록됩니다. 필요한 Tool이 없으면 Agent가 직접 코드를 짜고 테스트해 Workspace에 저장해 두고, 다음 업무에서 다시 꺼내 씁니다.",
        },
        {
            need: "로컬이나 다른 시스템에 있는 내 도구를 워크플로우에 그냥 붙이고 싶다",
            answer: "Geny는 연결된 Tool을 한꺼번에 불러오지 않고, 지금 업무에 필요한 것만 찾아 씁니다. 로컬 도구는 DexOn으로, 다른 시스템의 도구는 API·MCP로 잇습니다. 실행은 XGEN의 권한·거버넌스가 허용하는 범위 안에서만 이뤄집니다.",
        },
    ],
    s7ApproachTitle: "현장의 목소리가 다음 개선이 됩니다",
    s7Approach: "플래티어는 현장에서 들은 아쉬움을 XGEN의 개선 과제로 받아 솔루션을 고치고, 그 결과를 다시 고객 환경에 적용합니다. 이번 세 가지 바람에도 먼저 Geny라는 길을 제안했습니다. 어디까지, 어떤 순서로 적용할지는 고객과 함께 정해 빠르게 반영해 가고 있습니다.",
    s7Note: "참고로 OpenAI 호환 API 엔드포인트 자체의 도구 호출 제약은 그대로 남아 있습니다. 위 방법은 Geny Agent 안에서 도구를 쓰는 경로입니다. 롯데홈쇼핑 환경에 Geny와 DexOn을 어디까지, 언제 적용할지는 XGEN 버전과 구성에 맞춰 협의해 정합니다.",
    s7Link: "Geny 자세히 보기",
    s8Kicker: "다음 이야기",
    s8Title: "한 부서에서 다음 부서로, Agent가 일하는 자리를 넓힙니다",
    s8Body: [
        "롯데홈쇼핑은 부서마다 요구를 듣고 그에 맞는 Agent를 만드는 방식을 MD, 방송편성, CS, 재경으로 넓혀 가고 있습니다. 현업이 필요한 순간에 바로 꺼내 쓸 수 있도록 Agent 환경도 함께 다듬고 있습니다.",
    ],
    s8ListTitle: "현업과 함께 다듬고 있는 과제",
    s8List: [
        "입점 문의 Agent",
        "방송 CG 기획안 생성",
        "전시 영역 자동 세팅",
        "페르소나 봇",
    ],
    s8Note: "아직 검토와 현업 테스트 단계에 있는 과제라, 범위와 일정은 달라질 수 있습니다.",
    q4: "최종 목표는 중요한 의사결정만 사람이 하고, 나머지는 AI가 최대한 자율적으로 처리하는 것입니다.",
    speaker: "오주영 과장",
    speakerOrg: "롯데홈쇼핑 AX팀",
    sourceTitle: "이 사례의 출처",
    sources: [
        "롯데홈쇼핑 AX팀 서면 인터뷰 — 인용은 원문 그대로 옮겼습니다.",
        "플래티어 프로젝트 기록 — 통제 정책, 운영 구성, 모델 서빙 기록",
        "수치와 일정은 2026년 11월 기준이며, 운영 상황에 따라 바뀔 수 있습니다.",
    ],
    metaTitle: "고객 정보",
    logoSrc: "/customers/lotte-homeshopping/logo-ko.png",
    logoAlt: "롯데홈쇼핑 로고",
    heroAlt: "서울 영등포구 양평동의 롯데홈쇼핑 사옥",
    heroCredit: "사진·로고: 롯데홈쇼핑 공식 홈페이지",
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
        "롯데홈쇼핑 로고와 사옥 사진 사용 승인 — 승인되지 않으면 공개본에서 뺍니다",
        "고객사 실명과 응답자 실명·직함 공개 여부",
        "인용문 4개의 원문 사용 여부",
        "수치와 일정: 건당 약 20분, 500쪽+, 900명, 4개 부서, 10/14 오픈, 11/24 오픈 목표",
        "Moni의 역할: 인터뷰에서는 「방송 품질 점검 결과 등록」, 프로젝트 기록에서는 「임직원·협력사 업무 문의」로 적혀 있어 어느 쪽이 맞는지",
        "모델명과 사내 GPU 구성 공개 범위",
        "「남은 과제」 문단과 Geny 보완 설명을 공개본에 둘지, 고객 요구 3가지의 표현이 맞는지",
        "「현업과 함께 다듬고 있는 과제」 4개를 공개해도 되는지",
    ],
};

const EN: Copy = {
    breadcrumbAria: "Breadcrumb",
    breadcrumbCases: "Customer cases",
    breadcrumbIndustry: "Commerce",
    badgeCustomer: "Commerce · Lotte Homeshopping",
    badgeStatus: "In operation · Rolling out",
    title: "Lotte Homeshopping: from a chatbot to AI agents that carry out work in each department",
    lead: [
        "It started with a single chatbot. Now Lotte Homeshopping's AX team is moving into a stage where it builds the AI agents new work calls for in XGEN and puts them to use in the business.",
        "Sensitive internal data is handled by AI models running on in-house GPUs, while work that calls for complex reasoning uses cloud AI models.",
        "What began with blocking sales of hazardous products and guiding staff through the next-generation system is gradually expanding into finance and broadcast quality and review.",
    ],
    takeawaysTitle: "Key takeaways",
    takeaways: [
        [
            "If the team needs it, they build it",
            "Hazardous-product sales blocking, help with the next-generation system manual, a product-encyclopedia chatbot and an Excel generator: all of it was set up as workflows without separate coding, turned into AI agents and deployed to the business.",
        ],
        [
            "The data decides the model",
            "Data that can't leave the company is handled by open models on in-house GPUs. Harder reasoning goes to cloud models such as Claude. Both run side by side on one platform.",
        ],
        [
            "One department, then the next",
            "A way of listening to each department and building agents around its needs is now extending to merchandising, broadcast scheduling, customer service and finance.",
        ],
    ],
    statsTitle: "LOTTE Homeshopping's AX shift, in numbers",
    stats: [
        ["~20 min", "Handling one hazardous product", "Before adoption, the time it took to block one hazardous product from sale on the online mall by hand"],
        ["500+ pages", "Next-generation system manual", "The extensive work manual staff had to search and check themselves"],
        ["900", "People supported by AI work guidance", "Employees and partners covered by the A1+ work guidance agent"],
        ["4 departments", "Where AI agents are spreading", "From hazardous-product and system guidance to finance and broadcast quality and review work"],
    ],
    s1Kicker: "Where it began",
    s1Title: "From a chatbot to AI that gets work done",
    s1Body: [
        "Lotte Homeshopping's generative-AI adoption began with a chatbot built on a foreign vendor's solution. As more departments used it, their expectations changed. Answering questions was no longer enough. They needed AI that could carry out real work.",
        "The requests became more specific: search the online mall for hazardous products and organize the results in Excel, or find what staff need in the extensive internal system manual and guide them to the right work screen.",
        "As needs multiplied across teams, it became clear they had to move beyond a chatbot-centered approach to a platform where they could build and run an AI agent for each job.",
    ],
    q1: "We started with a chatbot from a foreign vendor's system. As requirements were added one at a time, we needed a foundation where we could build and operate (AIOps) at the level of workflows.",
    reqTitle: "Three requirements for a new AI platform",
    reqs: [
        ["Models", "Cloud models such as Claude and on-premise models such as Gemma and Qwen, used together on one platform."],
        ["Data boundary", "Data that must stay inside processed on in-house GPUs, with only the hard reasoning sent to the cloud."],
        ["Operations", "Room for business users to adjust things themselves when needs change."],
    ],
    s1Close:
        "In the end, they needed a foundation for building an agent for each task and continuing to refine and run it long after launch.",
    s2Kicker: "Why XGEN",
    s2Title: "Three reasons Lotte Homeshopping chose XGEN",
    s2Lead: "Lotte Homeshopping reviewed several AI platforms and compared which one fit its own work environment and requirements. Three factors ultimately led it to choose XGEN.",
    s2Points: [
        "It could be built in less time.",
        "Its structure was relatively light.",
        "Users had more room to change things themselves.",
    ],
    s2Close: "The customer says the fact that Plateer built the platform in-house also counted in its favor.",
    s3Kicker: "The key decision",
    s3Title: "Data kept secure, AI models matched to the work",
    s3Lead: "Lotte Homeshopping chooses between in-house and cloud AI models based on how sensitive the data is and what the work requires. XGEN lets each step within a single workflow connect to the model that suits it.",
    s3Cards: [
        {
            icon: "cpu",
            title: "AI models on in-house GPUs",
            desc: "Work that handles data restricted from leaving the company uses open models running on in-house GPUs. Data is processed within the company's own infrastructure to meet its security requirements.",
        },
        {
            icon: "cloud",
            title: "Cloud AI models",
            desc: "Work that calls for complex analysis and reasoning uses cloud AI models such as Claude. The right model can be chosen according to the purpose and difficulty of the task.",
        },
    ],
    s3Body: [
        "XGEN runs in Lotte Homeshopping's Kubernetes environment, with deployment images managed through an internal registry. In March 2026 it moved to the consolidated service structure of XGEN agentflow, simplifying what needs to be operated.",
        "AI agents are connected to internal systems through APIs and MCP, and a tool configured once can be reused for other tasks.",
        "On this foundation, Lotte Homeshopping's AX team builds workflows for each task without separate coding, and creates and deploys the AI agents it needs on its own.",
    ],
    q2: "We can build the work we need as workflows, without code, and deploy them right away. The next-generation system manual, the product-encyclopedia chatbot and the Excel generator were all built this way.",
    s4Kicker: "What changed",
    s4Title: "Same work, a different way of doing it",
    s4Lead: "Changes the customer pointed to, task by task. Some integrations are still under way.",
    beforeLabel: "Before",
    afterLabel: "Now",
    tasks: [
        {
            no: "01",
            title: "Blocking sales of hazardous products",
            before: "Staff checked the Korea distribution agency's hazardous-product list against the online mall by hand, one item at a time. Each one took about 20 minutes.",
            after: "Now an agent searches the online mall and hands over the results in Excel.",
            status: "In operation",
        },
        {
            no: "02",
            title: "Next-generation system manual",
            before: "Staff had to hunt for the right passage in a manual of more than 500 pages.",
            after: "Ask the \"A1+ assistant\" and it walks you through step by step, right down to which screen to open.",
            status: "Early access for 900 employees and partners",
        },
        {
            no: "03",
            title: "Broadcast quality and review",
            after: "An agent that supports real-time broadcast review and an agent that records broadcast quality-check results are in use on the floor.",
            status: "In operation",
        },
        {
            no: "04",
            title: "Taxi receipt expense processing",
            before: "Receipt details were typed in by hand and matched line by line against card statements.",
            after: "Upload one photo and it moves through reading, corporate-card matching and drafting the approval request. The finance team can focus on the final check.",
            status: "Integration in progress",
        },
    ],
    flowTitle: "How a taxi expense moves through",
    flowNote: "A person makes the final call. Approval requests drafted by the agent are processed only after the finance team verifies them.",
    flow: [
        { who: "Employee", step: "Upload receipt photo" },
        { who: "Agent", step: "Read the receipt" },
        { who: "Agent", step: "Match corporate-card record" },
        { who: "Agent", step: "Draft approval request" },
        { who: "Finance team", step: "Final verification", human: true },
    ],
    humanLabel: "Human check",
    s5Kicker: "Safeguards",
    s5Title: "A tool people use every day, so each kind of work gets its own rules",
    s5Lead: "Rules apply both when a question comes in and when an answer goes out.",
    s5Items: [
        [
            "Input checks",
            "Chat text, attached documents and images go through a harmful-content check and then personal-data detection. If personal data turns up, the request pauses and asks whether to continue. If the user continues, that part is masked before sending. Images get the same checks after their text is extracted.",
        ],
        [
            "Answer rules",
            "The work-inquiry agent for employees and partners answers quality questions only with what the knowledge base confirms, and stays silent when there are no grounds. For SCM, MD and CS questions it may reason, but labels any inferred part with [Inference].",
        ],
        [
            "Staged rollout",
            "Features such as personal-data protection were opened to a small group of users first, then widened.",
        ],
    ],
    s6Kicker: "Technical challenges solved together",
    s6Title: "From existing GPUs to larger AI models: a technical expansion built together",
    s6Body: [
        "Lotte Homeshopping had been widening its use of AI by running dense models on its existing in-house GPUs. Once it saw that larger MoE models were within reach, it set out to expand the model-serving environment on the same infrastructure.",
        "Plateer's FDE and AI research team took part in this work. From model deployment to runtime setup and detailed configuration, the technical challenges were solved step by step, and the expanded model is now being served stably.",
        "As a result, Lotte Homeshopping has extended what its existing GPU infrastructure can do and widened the range of in-house AI models it can choose from for each kind of work.",
    ],
    s6ListTitle: "Worked out together along the way",
    s6List: [
        "When Gemma 4 wouldn't respond right after deployment, the cause was the model checkpoint, vLLM and transformers following different version conventions. Aligning and pinning the versions brought it back.",
        "At one point a deployment stalled because nodes couldn't reach an external image registry on restart. The team reproduced it in the same private-network setup and turned it into a list of required images and a plan for running an internal registry.",
    ],
    q3: "From the base models to XGEN workflows and the results the LLM produces, we are currently running our internal systems at a satisfactory level.",
    s7Kicker: "Still to solve",
    s7Title: "What the customer wished were better, and how Plateer is answering",
    s7Body: "We heard the frustrations too, and plainly. The API endpoint XGEN exposes internally follows the OpenAI-compatible v1/chat/completions format, so tools that call XGEN through it can't use MCP or tool calling as freely as the team would like. The customer asked for the three things below, and Geny, XGEN's agent runtime, offers a way to get there.",
    s7NeedsTitle: "What the customer wanted, and how Geny handles it",
    s7NeedLabel: "What they wanted",
    s7AnswerLabel: "With Geny",
    s7Needs: [
        {
            need: "To plug in a PowerPoint MCP server that runs on their own PC",
            answer: "Used with DexOn, a Geny agent can use MCP servers, files and apps on the user's PC as tools, within the allowed scope. The PowerPoint MCP doesn't have to move to the server; it keeps running on that PC.",
        },
        {
            need: "To use external resources easily: put something in, get a result out",
            answer: "Connected tools are registered as units with defined inputs and outputs. If the right tool doesn't exist yet, the agent writes and tests the code itself, saves it to its Workspace, and reaches for it again next time.",
        },
        {
            need: "To simply attach their own tools, local or in other systems, to a workflow",
            answer: "Instead of loading every connected tool at once, Geny finds just the ones the current task needs. Local tools connect through DexOn, and tools in other systems connect through APIs or MCP. Nothing runs outside what XGEN's permissions and governance allow.",
        },
    ],
    s7ApproachTitle: "What we hear in the field becomes the next improvement",
    s7Approach: "Plateer takes the frustrations we hear in the field as XGEN improvement items, improves the solution, and brings the result back into the customer's environment. For these three needs, we started by proposing the Geny path. How far to take it, and in what order, we're deciding together with the customer and moving quickly.",
    s7Note: "For clarity: the tool-calling limit of the OpenAI-compatible API endpoint itself remains. The approach above is how tools are used inside a Geny agent. How far and when Geny and DexOn are applied in Lotte Homeshopping's environment will be agreed based on the XGEN version and configuration.",
    s7Link: "Learn more about Geny",
    s8Kicker: "What's next",
    s8Title: "One department, then the next: more places for agents to work",
    s8Body: [
        "Lotte Homeshopping is extending its way of listening to each department and building agents around its needs, to merchandising, broadcast scheduling, customer service and finance. The agent environment is being refined too, so business teams can reach for it the moment they need it.",
    ],
    s8ListTitle: "Being refined with the business teams",
    s8List: [
        "Vendor-onboarding inquiry agent",
        "Broadcast CG planning drafts",
        "Automatic setup of display areas",
        "Persona bot",
    ],
    s8Note: "These are still in review and user testing, so scope and timing may change.",
    q4: "The end goal is for people to make only the important decisions, and for AI to handle the rest as autonomously as possible.",
    speaker: "Juyoung Oh",
    speakerOrg: "AX Team, Lotte Homeshopping",
    sourceTitle: "Sources for this case",
    sources: [
        "Written interview with the Lotte Homeshopping AX team — quotes are translated from the original.",
        "Plateer project records — control policies, operating setup, and model-serving records",
        "Figures and dates are as of November 2026 and may change with operations.",
    ],
    metaTitle: "Customer profile",
    logoSrc: "/customers/lotte-homeshopping/logo-en.png",
    logoAlt: "Lotte Homeshopping logo",
    heroAlt: "Lotte Homeshopping headquarters in Yangpyeong-dong, Yeongdeungpo-gu, Seoul",
    heroCredit: "Photo and logo: Lotte Homeshopping official website",
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
        "Approval to use the Lotte Homeshopping logo and headquarters photo — removed from the published version if not approved",
        "Use of the customer name and the respondent's name and title",
        "Use of the four quotes as written",
        "Figures and dates: ~20 min per item, 500+ pages, 900 people, 4 departments, 10/14 launch, 11/24 target",
        "Moni's role: the interview says recording broadcast quality-check results, project records say work inquiries for employees and partners",
        "How much of the model names and in-house GPU setup may be published",
        "Whether the open-issue paragraph and the Geny follow-up stay in the public version, and whether the three customer needs are worded correctly",
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={t.logoSrc}
                        alt={t.logoAlt}
                        width={locale === "en" ? 187 : 355}
                        height={locale === "en" ? 69 : 74}
                        className="mt-7 h-9 w-auto md:h-10"
                    />
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
                    <div className="mt-5 max-w-3xl space-y-3 text-[17.5px] leading-relaxed text-[var(--color-ink-muted)] md:text-[19px]">
                        {t.lead.map((para) => (
                            <p key={para}>{para}</p>
                        ))}
                    </div>
                </div>
            </header>

            {/* 고객사 사진 — 롯데홈쇼핑 공식 홈페이지 공개 이미지 */}
            <figure className="mx-auto max-w-6xl px-6 pt-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/customers/lotte-homeshopping/building.webp"
                    alt={t.heroAlt}
                    width={1920}
                    height={596}
                    className="h-[180px] w-full border border-[var(--color-line)] object-cover sm:h-[240px] lg:h-auto"
                />
                <figcaption className="mt-2 text-[12.5px] text-[var(--color-ink-subtle)]">{t.heroCredit}</figcaption>
            </figure>

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
                        <dl className="mt-3 grid grid-cols-1 border-l border-t border-[var(--color-line)] sm:grid-cols-2">
                            {t.stats.map(([v, label, desc]) => (
                                <div key={v} className="flex flex-col border-b border-r border-[var(--color-line)] bg-white p-5">
                                    <dd className="order-1 text-[24px] font-bold tracking-tight text-[#2461d8]">{v}</dd>
                                    <dt className="order-2 mt-2 text-[15px] font-bold text-[var(--color-ink)]">{label}</dt>
                                    <dd className="order-3 mt-1 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">{desc}</dd>
                                </div>
                            ))}
                        </dl>
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
                                <div className="mt-4 border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-5 py-4">
                                    <p className="text-[14px] font-bold text-[var(--color-ink)]">{t.s7ApproachTitle}</p>
                                    <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink-muted)]">{t.s7Approach}</p>
                                </div>
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
