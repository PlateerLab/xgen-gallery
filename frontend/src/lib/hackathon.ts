export const HACKATHON_THEME = {
    lead: "플래티어에",
    focus: "변화를 줄 수 있는 AI",
} as const;

export const HACKATHON_TITLE = `${HACKATHON_THEME.lead} ${HACKATHON_THEME.focus}`;

export const HACKATHON_ACCESS = {
    accountNotice: "행사용 계정 발급 또는 기존 계정 이용 방식은 추후 안내합니다.",
    serverNotice: "행사 XGEN 접속 주소와 프로젝트·Agent 권한은 참가 안내에서 공지합니다.",
    installGuideHref: "/blog/xgen-dex-install-guide",
    downloadsHref: "https://github.com/PlateerLab/xgen-connector/releases/latest",
    productHref: "/xgen-dex",
} as const;

export const HACKATHON_PREPARATION = [
    {
        title: "XGEN 계정 확인",
        description: "행사에서 사용할 XGEN에 로그인할 수 있는 계정이 필요합니다. 접속할 서버에서 유효한 계정과 필요한 권한을 먼저 확인하세요.",
        status: HACKATHON_ACCESS.accountNotice,
    },
    {
        title: "행사 XGEN 접속 확인",
        description: "안내받은 XGEN 주소에 접속해 사용할 프로젝트와 Agent를 확인합니다. DexOn에서도 같은 서버 주소를 사용합니다.",
        status: HACKATHON_ACCESS.serverNotice,
    },
    {
        title: "DexOn 설치 · 연결",
        description: "PC 운영체제에 맞는 설치 파일을 받아 설치한 뒤, 행사 XGEN 서버에 연결하고 계정으로 로그인합니다. 기존 설치 가이드는 Windows 기준입니다.",
        status: "설치 가이드와 설치 파일은 공개돼 있습니다. 행사에 사용할 버전은 참가 안내에서 확정합니다.",
    },
] as const;

export const HACKATHON_CRITERIA = [
    {
        score: 25,
        label: "문제 정의 · 변화 가치",
        question: "플래티어의 누구에게, 어떤 변화가 필요한가요?",
        description: "해결할 문제가 구체적인지, 업무 개선이나 새로운 서비스가 플래티어에 어떤 가치를 만드는지 평가합니다.",
        evidence: "대상 사용자 · 기존 업무 흐름 · 해결하려는 문제",
    },
    {
        score: 30,
        label: "구현 · 동작 완성도",
        question: "핵심 기능이 실제로 작동하나요?",
        description: "앱의 핵심 사용자 흐름이 끝까지 실행되는지, 결과가 맞는지, 실패했을 때 어떻게 대응하는지 평가합니다.",
        evidence: "실제 앱 시연 · 실행 결과 · 정상 및 실패 사례",
    },
    {
        score: 20,
        label: "AI 활용 적절성",
        question: "XGEN · DexOn을 문제 해결에 어떻게 활용했나요?",
        description: "AI와 도구를 선택한 이유, 구현 과정에서의 활용 방식, 확인한 한계와 개선 제안을 평가합니다.",
        evidence: "XGEN · DexOn 활용 과정 · 검증한 한계 · 개선 제안",
    },
    {
        score: 15,
        label: "실현 · 확장 가능성",
        question: "행사가 끝나도 실제 업무나 서비스에 적용할 수 있나요?",
        description: "예상 사용자의 피드백, 다른 입력에서도 재현되는 결과, 도입에 필요한 비용과 운영 조건을 평가합니다.",
        evidence: "동료 피드백 · 별도 입력 검증 · 적용 조건",
    },
    {
        score: 10,
        label: "시연 · 전달력",
        question: "만든 것과 그 효과를 명확히 설명할 수 있나요?",
        description: "문제에서 결과까지의 설명이 명확한지, 시연과 질의응답에서 성과와 한계를 근거로 전달하는지 평가합니다.",
        evidence: "문제 → 시연 → 변화 · 질의응답 · 다음 개선 계획",
    },
] as const;

export const HACKATHON_JUDGING_STAGES = [
    {
        title: "제출작 검토",
        method: "필수 항목 · 실행 확인",
        description: "문제와 대상 사용자, 앱·데모 링크, AI 활용 방식, 검증 결과를 확인합니다.",
    },
    {
        title: "Demo Day 심사",
        method: "심사위원 평가 100%",
        description: "실제 앱 시연과 질의응답을 바탕으로 아래 100점 기준에 따라 평가합니다.",
    },
    {
        title: "동료 투표",
        method: "인기상 별도 선정 · 제안",
        description: "임직원이 앱을 체험하고 투표하는 인기상을 제안합니다. 본상 심사와 별도로 운영하는 안입니다.",
    },
] as const;
