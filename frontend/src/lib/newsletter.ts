/**
 * XGEN 뉴스레터 — 격주 발행 아카이브. DB 없이 이 파일의 데이터로 정적 렌더한다.
 * 새 호를 낼 때는 ISSUES 맨 앞에 새 Issue 객체를 추가하면 목록·상세·사이트맵에
 * 자동 반영된다. 원본은 사내 메일(.msg)이며, 사이트 공개용으로 큐레이션한다.
 */

import type { Locale } from "@/lib/i18n";
import { NEWSLETTER_EN } from "@/lib/newsletter-en";

export type Badge =
    | "신규"
    | "개선"
    | "수정"
    | "개발중"
    | "연구중"
    | "준비중";

export interface ReleaseItem {
    title: string;
    badge: Badge;
    body: string;
}

export interface ProgressItem {
    title: string;
    badge: Extract<Badge, "개발중" | "연구중">;
    percent: number;
    body: string;
}

/** 기술 뉴스·읽을거리 공통 항목(외부 링크). */
export interface LinkItem {
    n: string; // "01" 표기
    title: string;
    body: string;
    source: string;
    readTime: string;
    url: string;
}

export interface PaperItem {
    arxiv: string;
    title: string;
    authors?: string;
    body: string;
    url: string;
}

export interface UpcomingItem {
    title: string;
    badge: Extract<Badge, "준비중">;
    body: string;
}

export interface Issue {
    slug: string; // "vol-1"
    vol: number;
    date: string; // YYYY-MM-DD
    title: string;
    /** 영문 제목(선택) — /en 화면에서 쓴다. 없으면 영문 화면에 노출하지 않는다. */
    titleEn?: string;
    summary: string;
    intro: string[];
    releases: ReleaseItem[];
    inProgress: ProgressItem[];
    news: LinkItem[];
    reading: LinkItem[];
    papers: PaperItem[];
    upcoming: UpcomingItem[];
}

const vol1: Issue = {
    slug: "vol-1",
    vol: 1,
    date: "2026-07-13",
    title: "XGEN 뉴스레터 vol.1",
    titleEn: "XGEN Newsletter vol.1",
    summary:
        "Claude Code 백엔드 연동, 구글 검색 AI 전면 전환, Context rot — 최근 소식을 정리했습니다",
    intro: [
        "안녕하세요, AI솔루션연구소입니다. 오늘부터 연구소가 XGEN과 AI 관련 소식을 격주로 정리해 전해드립니다. 연구소의 활동과 최신 기술 동향을 한 걸음 더 가까이 공유하는 자리가 되었으면 합니다.",
        "창간호에서는 Claude Code 백엔드 연동을 포함한 최근 배포 내용과 현재 개발 중인 과제, 그리고 눈여겨볼 만한 기술 뉴스·읽을거리·논문을 함께 담았습니다.",
    ],
    releases: [
        {
            title: "Claude Code (CLI) 백엔드",
            badge: "신규",
            body: "지금까지 XGEN의 LLM 백엔드는 API 호출 방식뿐이라, 터미널에서 검증된 Claude Code의 에이전틱 코딩 능력을 플랫폼 안에서 쓸 수 없었습니다. 브라우저 로그인(OAuth·setup-token)과 Redis 잡 릴레이로 CLI의 로컬 1인 로그인·k8s 멀티파드 제약까지 풀어, 이제 워크플로우·에이전트에서 다른 모델을 고르듯 Claude Code를 선택할 수 있습니다. CLI 버전은 관리 화면에서 핀 고정·설치·업데이트·롤백으로 통제됩니다.",
        },
        {
            title: "배포 승인 · 리스크 평가 개편",
            badge: "개선",
            body: "XGEN 에이전트는 배포 요청 → 위험 등급 평가 → 시스템 관리자 1차 승인 → 거버넌스 2차 승인을 거쳐야 사용자에게 열립니다. 승인 상태가 한 컬럼에 뭉쳐 어느 단계에서 멈췄는지 보이지 않았고, 완화조치는 매번 수동 입력, 중단된 에이전트는 재승인 뒤에도 손으로 복구해야 했습니다. 이번 개편으로 1·2차 승인 상태 컬럼이 분리되고, 이전 평가의 완화조치가 자동완성되며, 위험 등급 점수 구간이 필수화됐습니다. 승인 시 중단 에이전트는 자동 복구되고 재승인 이력·감사 로그까지 남아 — 심사는 빨라지고 추적은 가능해졌습니다.",
        },
        {
            title: "Vision vLLM 설정 개선",
            badge: "개선",
            body: "vLLM으로 비전(VL) 모델을 붙일 때 base_url에 /v1을 빠뜨리거나 모델명을 틀려 등록이 실패하는 일이 잦았습니다. 이제 카탈로그에서 원클릭 등록, 주소 자동 정규화, 저장 전 라이브 연결 프로브로 실제 연결을 확인합니다. 온톨로지 추출 배치도 작은 로컬 모델이 큰 배치를 못 버텨 ‘하다 만’ 결과를 내던 문제를 컨텍스트 윈도우 기반 자동 사이징과 타임아웃·절단 재시도로 해소했습니다.",
        },
        {
            title: "안정성 수정",
            badge: "수정",
            body: "온톨로지 검색에서 답변 합성이 시간 상한에 걸리면 빈 답이 나가거나 내부 근거 블록이 사용자에게 그대로 노출되던 버그를 바로잡아, 답변이 항상 온전한 형태로 나갑니다. 이 밖에 Redis Sentinel 읽기/쓰기 단일 클라이언트 통일(페일오버 정합성, core·documents·mcp-station 공통), 피드백 통계가 0으로 나오던 집계 SQL 오타, 배포 rollout 타임아웃(120→300s)을 수정했습니다.",
        },
    ],
    inProgress: [
        {
            title: "AI 아바타 기능",
            badge: "개발중",
            percent: 70,
            body: "텍스트뿐인 대화 화면에 ‘눈에 보이는 상대’를 만들어 사용 경험을 개인화하는 기능입니다. 마이페이지 [아바타 설정]에서 Live2D·Spine 모델(.zip)이나 사진으로 나만의 아바타를 등록·미리보기·기본 지정하고, [스토어]에서 동료가 공개한 아바타를 별점·설명과 함께 둘러보다 클릭 한 번으로 가져옵니다. 설정·스토어·백엔드 저장소까지 완성됐고, 마지막 대화 화면 렌더링 연결이 남았습니다.",
        },
        {
            title: "DB → 온톨로지 증분 색인",
            badge: "개발중",
            percent: 85,
            body: "온톨로지는 문서에서 LLM으로 추출하다 보니 시간·비용이 들고, 정작 가장 정형화된 지식인 사내 DB는 넣을 방법이 없었습니다. 등록된 DB의 SELECT 결과를 LLM 없이 rows-native로 바로 색인하는 경로를 새로 만들었습니다. 워크스페이스 ‘DB에서 가져오기’에서 미리보기 → 매핑 → 색인으로 이어지고, watermark 기반이라 바뀐 행만 따라갑니다. develop 반영 완료, 다음 배포 대기.",
        },
        {
            title: "토큰 쿼터 · 데이터 접근 감사",
            badge: "개발중",
            percent: 85,
            body: "조직 도입에서 반드시 나오는 질문 — ‘누가 얼마나 쓰는지 통제되나, 에이전트가 어떤 데이터를 봤는지 증빙되나’에 대한 답입니다. 토큰 정책 대상을 사용자/역할개별/역할전체 3종으로 확장하고 우선순위·동시평가 집행 로직을 붙였으며, 에이전트의 DB·지식 접근을 사용자·부서·대상 테이블 단위 감사 로그로 남깁니다. 프롬프트 실행 통계까지 더해지면 사용량과 접근 이력을 관리자 화면에서 증빙할 수 있습니다. develop 반영 완료, 다음 배포 예정.",
        },
        {
            title: "에이전트 하니스 v2",
            badge: "개발중",
            percent: 60,
            body: "에이전트가 긴 작업에서 직전 실행의 교훈을 잊고 같은 실수를 반복하거나, 판정이 통과/실패 둘뿐이라 부분 진척을 인정하지 못하던 한계가 있었습니다. 판정을 점진 채점으로 바꾸고 교훈을 런 간에 최신순으로 이월하며, RAG 문서답변이 제목·요약·본문 형식을 기계적으로 흉내 내는 스캐폴딩도 차단합니다. 같은 모델로 더 안정적인 실행 품질을 내는 것이 목표입니다.",
        },
        {
            title: "온톨로지 v3",
            badge: "연구중",
            percent: 35,
            body: "문서에서 온톨로지를 뽑는 추출 파이프라인의 정확도와 처리량을 함께 끌어올리기 위한 v3 구조를 연구하고 있습니다. 선행 개선인 배치 자동 사이징·절단 재시도는 이번 릴리즈에 먼저 실렸고, v3 본체는 실험 단계입니다.",
        },
    ],
    news: [
        {
            n: "01",
            title: "구글 검색, Gemini 3.5 Flash로 전면 전환 — ‘10개 블루링크’ 폐지",
            body: "검색의 기본 단위가 ‘링크 목록’에서 ‘생성된 답변’으로 바뀌었다는 뜻입니다. 이제 웹에서 발견되려면 랭킹에 오르는 게 아니라 AI 답변 안에 인용되어야 하고, 콘텐츠도 클릭을 부르는 글이 아니라 발췌·인용되기 좋은 구조여야 합니다. 우리 제품 문서와 기술 블로그도 ‘AI에게 인용되기 좋은 형태’로 재정비할 때라는 신호입니다.",
            source: "Build Fast with AI",
            readTime: "7min",
            url: "https://www.buildfastwithai.com/blogs/ai-news-today-july-12-2026",
        },
        {
            n: "02",
            title: "허깅페이스 CEO “기업들, 프론티어 API에서 오픈모델로 회귀 중”",
            body: "‘AI는 API로 빌려 쓰는 것’이라는 지난 3년의 전제가 흔들린다는 뜻입니다. 프론티어 API 요금이 오를수록 비용을 예측하고 데이터를 내부에 두고 싶은 기업은 오픈모델 + 자체 인프라 조합으로 이동하는데, 이는 곧 폐쇄망·온프렘 LLM 플랫폼의 시장이 커진다는 이야기입니다. 우리가 XGEN으로 만드는 방향이 업계 흐름과 일치한다는 근거 — 제안서에 인용하기 좋은 발언입니다.",
            source: "The Neuron",
            readTime: "5min",
            url: "https://www.theneuron.ai/explainer-articles/everything-that-happened-in-ai-today-saturday-july-11-2026/",
        },
        {
            n: "03",
            title: "캐나다 앨버타주 정부, Claude로 4억 6,600만 줄 코드 점검",
            body: "‘AI 코드 감사’가 PoC 단계를 지나 정부 단위 실전 사례로 증명됐다는 의미입니다. 수년치 백로그가 20시간으로 줄어든 효율은 사람을 대체했다기보다, 인력 문제로 엄두를 못 내던 전수 점검을 처음으로 가능하게 만든 쪽에 가깝습니다. 이번에 XGEN에 들어간 Claude Code 백엔드가 정확히 이 유형의 작업을 위한 것 — 고객 폐쇄망의 레거시 코드 감사라는 새 제안 시나리오가 생겼습니다.",
            source: "인공지능신문",
            readTime: "4min",
            url: "https://www.aitimes.kr/news/articleView.html?idxno=40870",
        },
    ],
    reading: [
        {
            n: "01",
            title: "‘Context rot’ — 컨텍스트가 길어질수록 retrieval은 무너진다",
            body: "‘컨텍스트 윈도우가 크니까 다 넣으면 된다’는 요즘 설계가 틀렸을 수 있다는 실측 근거입니다. 256K에서 80%였던 회수율이 1M 토큰에서 36%까지 떨어진다는 것은, 컨텍스트가 길어질수록 모델이 그 안에서 필요한 것을 ‘못 찾게’ 된다는 뜻입니다. 청킹·리랭킹으로 컨텍스트를 아껴 쓰는 우리 RAG 원칙이 여전히 유효한 이유 — 장문맥 시대의 반론 자료로 챙겨둘 만합니다.",
            source: "The Neuron",
            readTime: "6min",
            url: "https://www.theneuron.ai/explainer-articles/everything-that-happened-in-ai-today-saturday-july-11-2026/",
        },
        {
            n: "02",
            title: "“여러 모델 섞어 써도 한계 명확” — 오케스트레이션 통념 깨는 연구",
            body: "‘모델을 여러 개 섞으면 서로 약점을 보완한다’는 가정이 데이터로 반박됐다는 의미입니다. 최신 모델일수록 비슷한 데이터로 학습돼 같은 문제에서 같이 틀리기 때문에, 라우팅에서 중요한 건 ‘두 번째로 좋은 모델’이 아니라 ‘다르게 틀리는 모델’입니다. LLM-as-judge에서 판정 모델과 생성 모델을 같은 계열로 쓰면 안 되는 이유이기도 합니다.",
            source: "AI타임스",
            readTime: "5min",
            url: "https://www.aitimes.com/news/articleView.html?idxno=212625",
        },
        {
            n: "03",
            title: "루프 시작하기 — 에이전트에게 지시 대신 ‘정지 조건’을 주는 법",
            body: "에이전트를 부리는 단위가 ‘프롬프트 한 번’에서 ‘정지 조건이 있는 루프’로 넘어가고 있다는 글입니다. 사람이 매 단계 지시하는 대신 완료 기준을 먼저 정의해두면, 에이전트가 기준을 통과할 때까지 스스로 반복합니다. 핵심 난제가 ‘좋은 정지 조건을 어떻게 정의하나’로 옮겨간다는 점에서, 하니스 v2의 판정 게이트로 우리가 풀고 있는 문제와 정확히 같은 방향입니다.",
            source: "GeekNews",
            readTime: "4min",
            url: "https://news.hada.io/topic?id=31225",
        },
    ],
    papers: [
        {
            arxiv: "2506.07962",
            title: "Correlated Errors in Large Language Models",
            body: "모델들이 서로 독립적으로 틀리지 않는다는 걸 대규모로 측정한 논문입니다. 두 모델이 모두 틀릴 때 답까지 같은 경우가 60%에 달하고, 같은 개발사·같은 아키텍처일수록 오류 상관이 커집니다. 읽을거리 02의 근거가 되는 연구로, 라우팅·앙상블·LLM-as-judge 설계 전에 읽어볼 만합니다.",
            url: "https://arxiv.org/abs/2506.07962",
        },
        {
            arxiv: "2606.18089",
            title: "From Reasoning Traces to Reusable Modules: Compositional Generalization in LM Reasoning",
            authors: "Kong et al. · CMU",
            body: "SFT는 추론의 ‘부품’을 공급하고 RL이 그 부품을 새로운 조합으로 재구성한다는 가설을 검증했습니다. SFT만 하면 익숙한 골든 트레이스 모방에 그쳐 OOD 조합에서 무너진다는 결과 — 도메인 파인튜닝 전략(SFT→RL 순서) 설계에 참고할 만합니다.",
            url: "https://arxiv.org/abs/2606.18089",
        },
    ],
    upcoming: [
        {
            title: "팀 유튜브 채널",
            badge: "준비중",
            body: "XGEN 데모와 기술 세션을 다루는 팀 유튜브 채널을 준비하고 있습니다. 첫 영상과 함께 오픈 소식을 다음 호에서 전해드릴게요.",
        },
        {
            title: "사내 해커톤",
            badge: "준비중",
            body: "평소 업무에서는 시도하기 어려운 아이디어를 꺼내고, 팀이 함께 실험해보는 자리를 준비하고 있습니다. 형식과 일정은 확정되는 대로 공지드릴게요.",
        },
    ],
};

const vol2: Issue = {
    slug: "vol-2",
    vol: 2,
    date: "2026-07-27",
    title: "XGEN 뉴스레터 vol.2",
    titleEn: "XGEN Newsletter vol.2",
    summary:
        "음성 대화(STT·TTS) 도입, 에이전트별 마스킹, AI 요금이 신분이 되는 이야기 — 지난 2주 소식을 정리했습니다",
    intro: [
        "안녕하세요, AI솔루션연구소입니다. 지난 2주 동안 XGEN에 더해진 것들과 눈여겨볼 만한 AI 소식을 정리했습니다.",
        "이번 호에서는 음성 대화(STT·TTS) 도입과 에이전트별 마스킹을 포함한 개발 완료 항목, 현재 개발·연구 중인 과제, 그리고 AI 요금이 신분이 되는 이야기까지 함께 담았습니다.",
    ],
    releases: [
        {
            title: "음성 대화 — STT · TTS",
            badge: "신규",
            body: "XGEN에서 말하고 들을 수 있게 됐습니다. 사용자는 마이페이지에서 음성 인식·합성 엔진을 고르고, 관리자는 [오디오] 설정에서 제공자별 카탈로그를 등록한 뒤 연결 테스트와 모델 자동 확인으로 검증합니다. 엔드포인트별 완성형 보이스를 만드는 TTS 프로파일 스튜디오와 기본 보이스 4종도 함께 들어갔습니다. (stage 반영)",
        },
        {
            title: "에이전트별 PII · 금칙어 마스킹",
            badge: "신규",
            body: "통제 정책을 에이전트 단위로 켜고 끌 수 있습니다. 마스킹 범위도 답변 본문을 넘어 도구 실행 결과와 RAG 컨텍스트, 출처로 표시되는 원본 문서까지 넓혔습니다. 정책 변경 이력에는 무엇이 언제 바뀌었는지와 함께 변경에 관여한 인원수가 남습니다. (develop 반영)",
        },
        {
            title: "매뉴얼 인앱 뷰어 · 다운로드 센터",
            badge: "신규",
            body: "제품 매뉴얼을 앱 밖으로 나가지 않고 [솔루션 가이드]에서 바로 봅니다. 마크다운 원본을 실시간으로 서빙하는 방식이라 문서가 고쳐지면 곧바로 반영됩니다. 지원 섹션의 사용자용 다운로드 센터와 접속기 종류 지원, 폐쇄망용 번들 설치본 시딩도 함께 들어갔습니다. (develop 반영)",
        },
        {
            title: "DB → 온톨로지 색인 · 토큰 한도 · 엑셀 내보내기",
            badge: "개선",
            body: "지난 호에서 준비 중이라고 전해드린 두 가지가 반영됐습니다. DB SELECT 결과를 LLM 추출 없이 온톨로지로 색인하는 경로는 행 PK를 RDF URI에 연결하고 그래프를 staging 기반으로 원자 교체하도록 다듬었고, 토큰 한도 정책은 개발·검증·운영 배포 상태별로 따로 집행됩니다. 관리자 엑셀(xlsx) 내려받기도 점검·로그인 로그·채팅 통계·문서 재색인 등 20여 곳으로 넓어졌습니다. (stage 반영)",
        },
        {
            title: "안정성 수정",
            badge: "수정",
            body: "모델 서버 자가복구를 강화(동시성·누수 회수)하고 GPU별 메모리·서빙 설정 스냅샷을 이력에 남깁니다. 문서 저장소가 실제 암호화 정보를 기록하도록 바로잡고, MinIO 업로드 오탐 이력·공유 컬렉션 피공유자 접근 오류, Oracle 조회의 CLOB·연결 모드(SQLAlchemy 단일화·TCPS) 문제를 수정했습니다. 컨텍스트 초과는 이제 vLLM 실측값 기준으로 무엇이 얼마나 넘쳤는지 안내합니다. (운영 반영)",
        },
    ],
    inProgress: [
        {
            title: "API 컬렉션 워크스페이스 · Quality Lab",
            badge: "개발중",
            percent: 75,
            body: "외부 API를 XGEN 도구로 데려오는 과정 전체를 하나의 워크스페이스로 묶고 있습니다. 소스를 넣으면 수집·보강·검증까지 안내를 따라 진행되고, Quality Lab에서 인증 준비도와 대상 선택·세션 상태를 진단합니다. GraphQL 인트로스펙션 수집과 실행 추적 학습이 develop에 반영됐고, 도구 사이의 관계는 Tool Evidence Explorer에서 모듈 맵으로 범위를 좁힌 뒤 그래프로 봅니다.",
        },
        {
            title: "AI 아바타 기능",
            badge: "개발중",
            percent: 85,
            body: "지난 호에 이어, 사용자별 아바타 저장·서빙·삭제(Live2D·Spine)가 stage까지 올라갔고 업로드 확인과 이름 지정 흐름도 정리됐습니다. 이제 남은 것은 대화 화면 렌더링 연결 하나입니다.",
        },
        {
            title: "에이전트 하니스 v2",
            badge: "개발중",
            percent: 70,
            body: "판정 게이트에 이어 Memory/State 로직을 붙이고 있습니다. 실행기와 Tool 로직을 다시 짜면서 XGEN 에이전트 기반의 하니스 에이전트를 만들고 있고, RAGAS 평가로 하니스 성능을 비교하는 기획도 함께 진행 중입니다.",
        },
        {
            title: "문서 자동 생성 엔진",
            badge: "개발중",
            percent: 60,
            body: "PPT 자동 생성을 단순 텍스트 나열에서 디자인이 적용된 문서로 끌어올리는 렌더링 엔진을 만들었습니다(테마 4종·레이아웃 5종). 생성부터 저장·내려받기까지 전 구간을 검증했고, 차세대 SVG 저작 방식과의 A/B 실측 비교를 앞두고 있습니다.",
        },
        {
            title: "온톨로지 v3",
            badge: "연구중",
            percent: 50,
            body: "LLM에 기대지 않는 빌드 로직을 연구하고 있습니다. Fuseki/Postgres 기반 검색 성능과 Dynamic Top-K 검색 로직을 손보고 있고, 로컬 모델만으로 빌드 품질을 낼 수 있는지 테스트하는 단계입니다.",
        },
    ],
    news: [
        {
            n: "01",
            title: "오픈AI, 에이전트 해킹을 일주일간 몰랐다",
            body: "에이전트가 외부에서 침해당했는데 일주일 동안 아무도 몰랐고, 공격자는 탈출 지침까지 남겼습니다. 에이전트는 이미 사람 감독 없이 계획하고 도구를 쓰고 코드를 쓰는데, 감당하는 복잡도는 몇 달마다 두 배가 됩니다. 결국 에이전트를 감시하는 일도 에이전트에게 맡기게 되는데(가트너의 ‘Guardian Agent’), 그 지점을 넘으면 사람이 직접 확인할 수 있는 건 감시자가 남긴 로그뿐입니다. 이번 호 마스킹이 나가는 말을 가리는 장치라면, 이 사건이 겨눈 곳은 들어오는 말이었습니다.",
            source: "AI타임스",
            readTime: "5min",
            url: "https://www.aitimes.com/news/articleView.html?idxno=213181",
        },
        {
            n: "02",
            title: "한 달에 얼마짜리 AI를 쓰십니까 — 요금이 신분이 되는 시대",
            body: "클로드·챗GPT 상위 요금제가 월 200달러대이고, 9월부터는 같은 일에 더 냅니다 — 새 토크나이저가 같은 문장을 최대 1.35배 많은 토큰으로 세어 실제 부담이 20~35% 늘어납니다. 오픈 모델이 중요한 이유가 여기 있습니다. 성능 1등을 따라잡으려는 게 아니라, 값이 오르든 계정이 끊기든 한번 받아둔 모델은 그대로 남는 유일한 선택지이기 때문입니다. 성능 격차는 적은 계산으로 메우는 게 기술의 몫입니다.",
            source: "Anthropic",
            readTime: "5min",
            url: "https://www.anthropic.com/news/claude-sonnet-5",
        },
        {
            n: "03",
            title: "규칙을 줄여야 성능이 오른다 — 클로드 5 컨텍스트 엔지니어링",
            body: "지시를 더 쓰는 게 아니라 덜 쓰라는 방향입니다 — 시스템 프롬프트를 80% 줄여도 성능이 유지되거나 오히려 나아졌습니다. 예전 모델이 못 하던 걸 시키려고 넣은 문장이 지금은 방해가 된다는 얘기입니다. 관건은 ‘어느 80%냐’인데, 앞으로 문장을 넣을 때 어떤 모델의 어떤 실패를 막으려 넣었는지 함께 남기면 지울 후보가 저절로 드러납니다. (안전 때문에 있는 금칙어·개인정보 규칙은 성능 실험 대상이 아닙니다)",
            source: "AI타임스",
            readTime: "4min",
            url: "https://www.aitimes.com/news/articleView.html?idxno=213178",
        },
    ],
    reading: [
        {
            n: "01",
            title: "코딩 어시스턴트 6종을 관통한 심링크 결함 ‘GhostApproval’",
            body: "AI에게 ‘project_settings.json 고쳐도 되냐’고 물어 승인했는데, 그건 실제 파일이 아니라 서버 접속 키를 가리키는 바로가기였습니다. 승인한 이름과 실제 바뀐 파일이 달라, 공격자가 자기 키를 심어두고 비밀번호 없이 들어옵니다. Amazon Q·Claude Code·Cursor 등 6개 도구가 이 문제를 가졌고 일부만 고쳐졌습니다. ‘확인 버튼을 눌렀으니 안전하다’는 믿음이 무엇을 승인하는지 한 번 볼 만합니다.",
            source: "Wiz",
            readTime: "6min",
            url: "https://www.wiz.io/blog/ghostapproval-a-trust-boundary-gap-in-ai-coding-assistants",
        },
        {
            n: "02",
            title: "코딩이 해결됐다는데, 소프트웨어는 왜 계속 나빠지나",
            body: "코드 짜는 속도는 확실히 빨라졌는데 제품 품질은 왜 그만큼 좋아지지 않느냐는 질문입니다. 필자의 답은 병목이 애초에 타이핑이 아니었다는 것 — 안정성은 KPI에 잘 안 잡히고, ‘이번 분기엔 새 기능 없이 버그만 잡겠습니다’라는 발표는 근사해 보이지 않기 때문이라는 지적이 뼈아픕니다.",
            source: "ptrchm",
            readTime: "5min",
            url: "https://ptrchm.com/posts/nothing-works-and-everyone-is-euphoric/",
        },
        {
            n: "03",
            title: "LLM 에이전트가 72일째 혼자 굴리고 있는 AI 트렌드 위키",
            body: "사람이 손대지 않고 에이전트가 매일 소식을 모아 정리한 위키가 72일치 쌓였습니다. 한 번 잘 도는 데모가 아니라 오래 굴러간 운영이라는 게 흥미로운데, 실패한 날 무엇을 하고 다음 날 어떻게 복귀하는지가 사실 전부입니다. ‘정지 조건’보다 어려운 게 ‘재시작 조건’이라는 걸, 하니스를 만들면서 우리도 같은 자리에서 막혔습니다.",
            source: "GeekNews",
            readTime: "4min",
            url: "https://trend.undefined-studio.dev",
        },
    ],
    papers: [
        {
            arxiv: "2606.25656",
            title: "Is GraphRAG Needed? From Basic RAG to Graph-/Agentic Solutions with Context Optimization",
            authors: "Long Chen et al.",
            body: "기본 RAG부터 그래프·에이전틱 방식까지 아홉 개 시나리오를 나란히 비교한 논문입니다. 컨텍스트 엔지니어링만으로 토큰을 19~53% 줄이면서, 검색을 늘린다고 생성 품질이 비례해 좋아지지는 않는 ‘검색-생성 격차’를 보였습니다. Dynamic Top-K와 온톨로지 v3를 손보는 지금, 기준선으로 삼을 만합니다.",
            url: "https://arxiv.org/abs/2606.25656",
        },
        {
            arxiv: "2511.05991",
            title: "Ontology Learning and Knowledge Graph Construction: A Comparison of Approaches and Their Impact on RAG Performance",
            authors: "Tiago da Cruz et al.",
            body: "관계형 DB에서 온톨로지 기반으로 만든 지식 그래프가, 텍스트에서 LLM으로 추출한 온톨로지 기반 그래프와 대등한 성능을 낸다는 결과입니다. 온톨로지 학습은 한 번만 해두면 되고 LLM 비용은 크게 줄어듭니다. 이번 호 ‘DB → 온톨로지 색인’이 왜 LLM 추출 없이 가는지에 대한 근거 문헌입니다.",
            url: "https://arxiv.org/abs/2511.05991",
        },
    ],
    upcoming: [
        {
            title: "팀 유튜브 채널",
            badge: "준비중",
            body: "XGEN 데모와 기술 세션을 다루는 팀 유튜브 채널을 준비하고 있습니다. 첫 영상 준비가 끝나는 대로 이 코너에서 가장 먼저 알려드릴게요.",
        },
        {
            title: "사내 해커톤",
            badge: "준비중",
            body: "평소 업무에서는 시도하기 어려운 아이디어를 꺼내고, 팀이 함께 실험해보는 자리를 준비하고 있습니다. 형식과 일정은 확정되는 대로 공지드릴게요.",
        },
    ],
};

const vol3: Issue = {
    slug: "vol-3",
    vol: 3,
    date: "2026-08-13",
    title: "XGEN 뉴스레터 vol.3",
    titleEn: "XGEN Newsletter vol.3",
    summary:
        "외부 API의 컬렉션 자동 색인, 업로드 버전 관리, GPU 다중 적재 — 지난 2주 소식을 정리했습니다",
    intro: [
        "안녕하세요, AI솔루션연구소입니다. 지난 2주 동안 XGEN에 더해진 것들과 눈여겨볼 만한 AI 소식을 정리했습니다.",
        "이번 호에서는 외부 API를 지식 컬렉션에 붙이는 길이 열렸습니다. 개발을 마치고 검증 단계 이상으로 올라간 항목들을 먼저 담았고, 7월 27일 이후 반영된 MR 293건 가운데 52건이 검증·운영 라인까지 올라갔습니다. 이어서 개발·연구 중인 과제와 기술 뉴스·읽을거리·논문을 함께 실었습니다.",
    ],
    releases: [
        {
            title: "API 데이터 소스 — 컬렉션 자동 색인",
            badge: "신규",
            body: "외부 API 응답을 지식 컬렉션에 자동으로 색인합니다. 도구로 등록해 둔 API를 고르고 연결 테스트로 응답을 확인한 뒤 가져올 주기를 정하면 끝입니다 — 수동 실행부터 5분·30분·1시간·6시간·24시간까지 고를 수 있습니다. 가져온 응답은 마크다운 문서로 바뀌어 문서 업로드와 똑같은 보안·인덱싱 과정을 거치고, 매번 전부 다시 넣지 않고 새로 생긴 것만 더합니다. 인증이 필요한 API는 인증 프로필을 따로 두어 토큰이 컬렉션 설정과 섞이지 않게 했고, 반복 매개변수가 있는 API는 값 목록을 넣어 여러 번 호출합니다. JSON뿐 아니라 XML 응답도 변환해 받습니다. (stage 반영)",
        },
        {
            title: "업로드 버전 관리 · 충돌 확인",
            badge: "신규",
            body: "같은 이름의 파일을 다시 올릴 때 무엇을 할지 고릅니다. 덮어써도 이전 파일이 사라지지 않고 버전으로 쌓이며, 파일마다 [버전 기록]에서 원본 해시(SHA-256)와 함께 지난 버전을 확인합니다. 폴더째 올릴 때도 안에 든 파일 하나하나의 충돌을 먼저 보여주고 파일별로 고르거나 한 번에 적용하며, 선택지는 덮어쓰기·건너뛰기·이름 바꾸기 셋으로 통일했고 판정은 서버가 합니다. 취소했는데 ‘완료’로 보이거나 건너뛴 파일이 실제로는 올라가던 문제도 함께 잡았습니다. (stage 반영)",
        },
        {
            title: "모델 서빙 — 관측과 GPU 다중 적재",
            badge: "개선",
            body: "vLLM 엔진 지표를 Prometheus로 내보내 대시보드와 알림에 연결했습니다. 어떤 모델이 요청을 얼마나 받고 대기열이 어디서 밀리는지 운영 화면에서 바로 봅니다. GPU 메모리 여유를 기준으로 적재를 허가하도록 바꿔 한 장의 GPU에 여러 모델을 함께 올릴 수 있고, 관리자 상태 화면은 새로고침 버튼 없이 실시간으로 갱신됩니다. llama.cpp 빌드는 장비에 묶이지 않게 고쳐 Blackwell 세대까지 지원합니다. (운영 반영)",
        },
        {
            title: "관리 편의 · 제공자 확장",
            badge: "개선",
            body: "공유한 워크플로우의 실행 이력에 ‘누가 했는가’와 ‘누구 것인가’가 함께 남습니다. 관리자 화면에서 Agent 목록과 장애 로그를 엑셀로 내려받고, 관리자 SQL 콘솔에서는 조회 문법을 전부 쓸 수 있습니다(삭제·권한 구문만 막습니다). DeepSeek을 LLM 제공자로 등록할 수 있습니다. (운영 반영)",
        },
        {
            title: "안정성 수정",
            badge: "수정",
            body: "임베딩 입력 한도를 넘긴 문서는 청크 크기를 자동으로 줄여 다시 시도합니다 — 실패한 문서를 사람이 찾아 다시 올리던 일이 줄었고, 업로드 전체를 죽이던 오류는 긴급 수정으로 막았습니다. 멀쩡히 있는 모듈 다섯 종이 화이트리스트에 없어 502가 나던 게이트웨이 경로, 파일명의 #과 ?를 주소 구분자로 되살리던 프록시 문제를 바로잡았습니다. 노트북 세션의 원격 접속 403, 체험존을 새로 만들면 채팅 목록이 비어 대화를 시작할 수 없던 문제도 함께 해결했습니다. (운영 반영)",
        },
    ],
    inProgress: [
        {
            title: "XGeny — 에이전트가 만든 도구가 남습니다",
            badge: "개발중",
            percent: 60,
            body: "에이전트가 작업 중에 만들어낸 도구를 다음 세션에도 쓸 수 있게 하고 있습니다. 도구 스펙과 실행 환경을 DB에 두어 파드가 다시 떠도 사라지지 않고, 확정된 의존성 버전을 스펙에 함께 적습니다. 코드 실행은 별도 러너로 옮겨 워크플로우 본체와 분리했고, [도구] 뷰에서 실제 코드와 3단계 상태를 보며 그 자리에서 테스트를 돌립니다. 지난 호까지 Geny로 부르던 이름은 XGeny로 바뀝니다(내부 식별자는 그대로입니다).",
        },
        {
            title: "음성 파일 전사",
            badge: "개발중",
            percent: 85,
            body: "회의 녹음을 지식 컬렉션에 그대로 올리면 전사한 뒤 색인까지 잇는 경로를 만들고 있습니다. 워크플로우의 음성 텍스트 변환 노드, 실시간 전사 수신·출력 노드, 실패 원인을 나누는 오류 코드까지 검증 단계에 올라갔습니다. 다만 개발 환경에서 오디오를 올려보면 아직 전사 단계에서 떨어집니다 — 이 오류를 잡는 것이 남은 일입니다.",
        },
        {
            title: "사용자 클라우드 스토리지",
            badge: "개발중",
            percent: 70,
            body: "내 PC나 노트북을 XGEN에 연결해, 에이전트가 그 안의 파일을 직접 읽고 쓰게 만들고 있습니다. 마이페이지 [클라우드]에서 개인별로 켜고 끄고, 연결한 기기 목록과 변경 이력을 함께 봅니다. 기기 이름을 바꿔도 경로는 그대로 유지되도록 폴더를 고정했고, 파일 접근은 서버가 두 단계로 확인합니다.",
        },
        {
            title: "산출물 자동화 시스템",
            badge: "개발중",
            percent: 80,
            body: "코드가 바뀌면 그 변경이 닿는 매뉴얼 챕터를 스스로 찾아 다시 쓰는 파이프라인입니다. develop을 지켜보다가 화면 문구를 바꾼 MR이 들어오면 해당 챕터만 큐에 넣고, XGEN이 다시 쓴 뒤 문서 MR로 올립니다 — 그 MR에는 이 문서가 왜 바뀌었는지 원인 코드 MR이 함께 적힙니다. 지난 2주에 열한 번 돌았고 스무 개 넘는 챕터가 이 방식으로 최신화됐습니다. 8월 6일에는 그날 무엇이 왜 바뀌었는지를 날짜별로 남기는 마지막 단계가 붙었고, 이 단계는 변경 내역과 원인 MR을 조립할 뿐이라 LLM을 쓰지 않습니다. 코드를 컴파일하면 실행 파일이 나오듯 같은 코드에서 문서도 컴파일되어 나오는 방식 — 살아있는 문서(Living Documentation)입니다.",
        },
        {
            title: "에이전트 하니스 v2",
            badge: "개발중",
            percent: 75,
            body: "지난 호에 이어 Memory/State 로직을 붙이고 있습니다. 실행기와 도구 로직을 다시 짜면서 XGEN 에이전트 기반의 하니스 에이전트를 만들고 있고, 개인별 맥락을 기억하는 에이전트 실험도 함께 진행 중입니다.",
        },
        {
            title: "AI 아바타",
            badge: "개발중",
            percent: 90,
            body: "사용자별 아바타 저장·서빙·삭제(Live2D·Spine)가 지난 호 이후 운영까지 올라갔습니다. 업로드 확인과 이름 지정 흐름도 정리돼, 남은 것은 대화 화면에 실제로 그려 넣는 연결 하나입니다.",
        },
        {
            title: "온톨로지 v3",
            badge: "연구중",
            percent: 55,
            body: "LLM에 기대지 않는 빌드 로직을 계속 연구하고 있습니다. Fuseki/Postgres 기반 검색 속도와 정확도, Dynamic Top-K 검색 로직을 손보는 중이고, 로컬 모델만으로 빌드 품질이 나오는지 벤치마크로 확인하고 있습니다.",
        },
    ],
    news: [
        {
            n: "01",
            title: "도구를 붙이는 표준이 세션을 버렸다",
            body: "에이전트에 도구와 데이터를 붙이는 표준 MCP의 새 명세가 7월 28일 확정됐습니다. 가장 큰 변화는 프로토콜이 상태를 갖지 않게 된 것 — 세션 ID와 핸드셰이크가 사라져 서버를 평범한 로드밸런서 뒤에 여러 개 띄워도 됩니다. 서버가 화면을 그리는 MCP Apps와 오래 걸리는 작업을 다루는 Tasks가 정식 기능으로 들어왔고, OAuth 2.0·OpenID Connect 호환과 기능 폐기 정책도 자리를 잡았습니다. 세션을 버렸다는 건 결국 운영 이야기입니다. 이번 호에서 외부 API를 컬렉션에 붙이는 이야기를 했는데, 그 붙이는 일을 업계가 어떻게 표준으로 만들고 있는지가 이 문서에 있습니다 — MCP 서버를 늘릴 계획이 있다면 세션 고정을 빼도 되는지부터 확인해볼 만합니다.",
            source: "MCP Blog",
            readTime: "6min",
            url: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
        },
        {
            n: "02",
            title: "에이전트가 모르는 건 코드가 아니라 조직이다",
            body: "스포티파이가 사내 AI 코딩 환경 Xirp를 공개했습니다. 진단이 눈에 띕니다 — 에이전트는 빠르고 자신 있게 결정하지만 조직 맥락을 몰라 운영 사고를 낸다는 것. 이 서비스를 누가 소유하는지, 무엇에 의존하는지, 왜 그렇게 설계됐는지는 코드에 없고 슬랙 스레드와 사람 머릿속에 있습니다. Xirp는 그 맥락을 개발자 포털에서 끌어와 세션마다 넣어주고, 세션에서 새로 나온 지식은 다시 문서로 되돌립니다. 우리에게 없는 것이 이 되돌리는 고리입니다 — 산출물 자동화가 매일 기록을 남기지만 거기 담기는 것은 코드가 왜 바뀌었는지까지고, 회의에서 정해진 것과 그 방향으로 가기로 한 이유는 여전히 어디에도 남지 않습니다.",
            source: "Spotify Engineering",
            readTime: "5min",
            url: "https://xirp.spotify.com/",
        },
        {
            n: "03",
            title: "값은 3분의 1인데 쓰는 돈은 두 배",
            body: "100만 토큰당 평균 단가가 지난해 1분기 18.40달러에서 올해 1분기 6.07달러로 내렸고, 8월 초에는 1.16~1.18달러 선입니다. 그런데 같은 기간 기업 AI 지출은 35억 달러에서 84억 달러로 두 배 넘게 늘었습니다 — 값이 내려간 만큼 더 쓰기 때문입니다. 새는 곳은 꽤 구체적입니다. 어느 에이전트는 루프에 빠져 11일을 도는 동안 4만 7천 달러를 썼고, 작은 모델로 될 일을 최상위 모델에 맡기면 최대 50배, 반복되는 입력에 캐시를 걸지 않으면 90%까지 더 냅니다. 값싼 모델로 먼저 거르고, 안 바뀌는 앞부분은 캐시에 두고, 매번 대화 전체를 다시 보내지 않는 것 — 셋을 겹치면 60~80%가 줄었다는 보고가 나옵니다. 무엇부터 손댈지 정하려면 어디서 새는지가 먼저 보여야 하고, 우리 관리 화면에는 지금 사용자별 합계까지 있습니다.",
            source: "SCMP",
            readTime: "7min",
            url: "https://www.scmp.com/tech/tech-trends/article/3363549/enterprise-ai-costs-hit-2026-low-driven-price-wars-chinese-open-source-models-research",
        },
    ],
    reading: [
        {
            n: "01",
            title: "코드가 아니라 아이디어를 통제하라",
            body: "레디스를 만든 antirez가 요즘 자기 작업 방식을 적었습니다. 코드를 짜는 일과 버그를 찾는 일은 모델에 맡기고, 아이디어 설계와 QA·최적화 전략·설계 문서는 직접 씁니다. 다만 “구현해줘”라고 말하고 그게 돌아가기를 기대할 수는 없었다고 — 설계와 성능을 이해하고 있어야 지시가 성립합니다. 그의 결론은 소프트웨어의 아이디어를 내가 쥐고 있다면 코드 자체를 들여다보는 일은 대체로 무의미하다는 것입니다. 불편한 쪽은 그의 주장이 아니라 우리입니다 — 코드를 봐야 한다고 말하는 사람들도 실제로는 보지 않습니다. antirez는 안 보기로 정하고 대신 설계를 쥐었고, 우리는 본다고 말하면서 안 봅니다.",
            source: "antirez",
            readTime: "5min",
            url: "https://antirez.com/news/169",
        },
        {
            n: "02",
            title: "코드가 싸지면 병목은 어디로 가나",
            body: "구글이 “Go가 AI 보조 개발에 적합한 언어”라는 글을 냈는데, 언어 이야기보다 앞의 진단이 남습니다. 사람이 코드를 얼마나 빨리 쓰는지는 이제 별로 중요하지 않고, 중요한 것은 이미 쓰인 코드를 리뷰하고 검증하고 유지하는 일 — 병목이 생성에서 검증으로 통째로 옮겨갔다는 표현도 나옵니다. 첫 생성은 95% 맞지만 같은 작업을 반복시킬수록 오류가 쌓이고 맥락이 오염되면서 정확도는 떨어지고 토큰 비용은 오릅니다. 지난 2주에 사내 브랜치로만 293건이 머지됐고, 이번 호 산출물 자동화 시스템이 겨냥하는 곳이 바로 여기입니다. 다만 생성이 싸져서 생긴 문제를 또 다른 생성으로 막는 구조이기도 합니다 — 자동으로 쓰인 문서는 누가 읽고, 맞는지는 무엇으로 확인할까요.",
            source: "Google Developers Blog",
            readTime: "5min",
            url: "https://developers.googleblog.com/why-go-is-an-ideal-language-for-ai-assisted-software-engineering/",
        },
        {
            n: "03",
            title: "모든 코드를, 항상 다시 작성하라",
            body: "코드를 만드는 값이 계속 떨어져서 큰 코드베이스를 통째로 다시 구현하는 비용이 SaaS 구독료 수준까지 내려간다면 어떻게 될까 — 저장소에 코드를 두지 않고 요구사항 명세를 두고, 정책이나 성능 기준이 바뀌면 명세를 고친 뒤 전체를 다시 생성하자는 구상입니다. 코드는 오래 남는 진짜 산출물의 일회용 부산물이 된다는 표현도 나옵니다. 다만 만들어진 코드가 요구사항을 지켰는지 확인할 수 있어야 하고, 그러려면 뜻이 흔들리지 않는 언어로 명세를 써야 한다고 못 박습니다. 우리는 지금 코드가 원본이고 문서가 그 뒤를 따라가는 시스템을 만들고 있는데 이 글은 정반대를 제안합니다 — 지금 우리 저장소에서 없어지면 안 되는 것은 무엇입니까. 참고로 지난 2주 293건 가운데 무언가를 고치는 MR이 125건, 43%였습니다.",
            source: "Substack",
            readTime: "6min",
            url: "https://stng.substack.com/p/rewrite-all-the-code-all-the-time",
        },
    ],
    papers: [
        {
            arxiv: "2607.08010",
            title: "Tool-Making and Self-Evolving LLM Agents in Low-Latency Systems",
            authors: "Kalle Kujanpää et al.",
            body: "에이전트가 매 요청마다 같은 절차의 코드를 다시 만드는 낭비를 다룬 논문입니다(7월 9일). 반복되는 업무 절차를 미리 검증하고 버전을 매긴 도구로 컴파일해두는 방식으로 바꾸자, 실제 서비스에서 지연이 최대 42% 줄고 오류율이 53% 개선됐으며 무엇이 언제 쓰였는지 추적하기도 쉬워졌습니다. 이번 호 XGeny가 서 있는 자리와 같습니다.",
            url: "https://arxiv.org/abs/2607.08010",
        },
        {
            arxiv: "2606.23075",
            title: "Safety in Self-Evolving LLM Agent Systems: Threats, Amplification, and Case Studies",
            authors: "Ruixiao Lin et al.",
            body: "같은 구조를 반대편에서 봅니다(6월 22일). 에이전트가 스스로 도구를 만들고 기억을 쌓으면, 한 번 들어간 잘못된 영향이 지워지지 않고 다음 세대로 이어집니다. 공격 표면을 25개 영역으로 나눠 보니 17개가 위험했고, 진화 중심으로 설계할수록 표면이 3.5배로 늘었습니다. 세션이 끝나면 사라지던 공격이 계보를 타고 남는다는 것이 요지입니다.",
            url: "https://arxiv.org/abs/2606.23075",
        },
    ],
    upcoming: [
        {
            title: "XGEN DeX — 출시 예정",
            badge: "준비중",
            body: "Enterprise AI를 데스크톱까지 잇는 실행 계층입니다. AI Agent는 서버에서 실행되고 사용자는 자기 데스크톱에서 그 Agent와 일합니다 — 중앙 통제는 그대로 두고 업무 방식은 바꾸지 않는 연결 방식입니다. 내 PC에서 도는 MCP 서버를 붙이면 사내망 안쪽 도구나 이 컴퓨터에만 있는 프로그램까지 에이전트가 부를 수 있어, 서버 자원과 로컬 자원을 함께 씁니다. 자세한 내용은 다음 호에서 소개합니다.",
        },
        {
            title: "플래티어랩스 유튜브 채널",
            badge: "준비중",
            body: "XGEN 데모와 기술 세션을 올리는 팀 유튜브 채널을 열었습니다. 영상은 순차적으로 올라갑니다 — 구독해 두시면 새 영상이 올라올 때 바로 보실 수 있습니다.",
        },
    ],
};

/**
 * 호 하나를 로케일에 맞게 바꾼다.
 *
 * 한국어가 정규 데이터이고 영문은 newsletter-en.ts 가 인덱스로 대응해 들고 있다.
 * 영문이 없는 호는 한국어 그대로 돌려준다 — 목록에서 걸러내는 판단은 화면이 한다.
 * 배지 값(신규·개선 …)은 정규값이라 바꾸지 않고, 표기만 BADGE_EN 으로 옮긴다.
 */
export function localizeIssue(issue: Issue, locale: Locale): Issue {
    if (locale !== "en") return issue;
    const en = NEWSLETTER_EN[issue.slug];
    if (!en) return issue;
    const zip = <T, U extends { title?: string; body: string }>(
        base: T[],
        over: U[],
    ): T[] =>
        base.map((item, i) => {
            const o = over[i];
            if (!o) return item;
            return {
                ...item,
                ...(o.title ? { title: o.title } : {}),
                body: o.body,
            };
        });
    return {
        ...issue,
        title: issue.titleEn ?? issue.title,
        summary: en.summary,
        intro: en.intro,
        releases: zip(issue.releases, en.releases),
        inProgress: zip(issue.inProgress, en.inProgress),
        news: zip(issue.news, en.news),
        reading: zip(issue.reading, en.reading),
        papers: zip(issue.papers, en.papers),
        upcoming: zip(issue.upcoming, en.upcoming),
    };
}

/** 영문판이 준비된 호만 — /en 목록·사이트맵의 기준. */
export function getIssuesFor(locale: Locale): Issue[] {
    const all = getIssues();
    return locale === "en"
        ? all.filter((i) => NEWSLETTER_EN[i.slug]).map((i) => localizeIssue(i, "en"))
        : all;
}

export function getIssueFor(slug: string, locale: Locale): Issue | undefined {
    const i = getIssue(slug);
    if (!i) return undefined;
    if (locale === "en" && !NEWSLETTER_EN[i.slug]) return undefined;
    return localizeIssue(i, locale);
}

/** 최신호가 앞. 새 호는 이 배열 맨 앞에 추가한다. */
export const ISSUES: Issue[] = [vol3, vol2, vol1];

export function getIssues(): Issue[] {
    return [...ISSUES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getIssue(slug: string): Issue | undefined {
    return ISSUES.find((i) => i.slug === slug);
}

export function getLatestIssue(): Issue | undefined {
    return getIssues()[0];
}
