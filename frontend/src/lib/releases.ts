export type ReleaseCategory = "new" | "improved" | "fixed";

export type ReleaseProduct = "xgen" | "library";

export interface ReleaseItem {
    category: ReleaseCategory;
    title: string;
    detail?: string;
    modules?: string[];
}

export interface Release {
    version: string;
    date: string;
    product: ReleaseProduct;
    tagline: string;
    summary: string;
    highlights?: string[];
    items: ReleaseItem[];
}

export const RELEASES: Release[] = [
    {
        version: "v2.5.0",
        date: "2026-08-13",
        product: "xgen",
        tagline: "API Data Sources, Upload Versioning & Multi-Model GPU Serving",
        summary:
            "외부 API를 지식 컬렉션에 붙여 정한 주기마다 스스로 색인하고, 같은 이름으로 다시 올린 파일은 지워지지 않고 버전으로 쌓입니다. 모델 서빙은 GPU 한 장에 여러 모델을 올리고 그 상태를 실시간으로 지켜봅니다.",
        highlights: [
            "API 데이터 소스 — 컬렉션 자동 색인",
            "업로드 버전 관리 · 충돌 확인",
            "한 GPU 다중 모델 · 서빙 관측",
            "임베딩 초과 시 청크 자동 조정",
        ],
        items: [
            {
                category: "new",
                title: "API 데이터 소스 — 컬렉션 자동 색인",
                detail: "도구로 등록해 둔 외부 API를 고르고 연결 테스트로 응답을 확인한 뒤 가져올 주기를 정하면 끝입니다. 주기는 수동 실행부터 5분·30분·1시간·6시간·24시간까지 고를 수 있고, 가져온 응답은 마크다운 문서로 바뀌어 문서 업로드와 똑같은 보안·인덱싱 과정을 거칩니다. 매번 전부 다시 넣지 않고 새로 생긴 것만 더합니다. JSON뿐 아니라 XML 응답도 변환해 받고, 반복 매개변수가 있는 API는 값 목록을 넣어 여러 번 호출합니다.",
                modules: ["xgen-documents", "xgen-core", "xgen-frontend"],
            },
            {
                category: "new",
                title: "업로드 버전 관리 · 충돌 확인",
                detail: "같은 이름의 파일을 다시 올릴 때 덮어쓰기·건너뛰기·이름 바꾸기 중에서 고릅니다. 덮어써도 이전 파일이 사라지지 않고 버전으로 쌓이며, 파일마다 [버전 기록]에서 원본 해시(SHA-256)와 함께 지난 버전을 확인합니다. 폴더째 올릴 때도 안에 든 파일 하나하나의 충돌을 먼저 보여주고, 파일별로 고르거나 한 번에 적용합니다. 판정은 서버가 합니다.",
                modules: ["xgen-documents", "xgen-core", "xgen-frontend"],
            },
            {
                category: "new",
                title: "API 인증 프로필",
                detail: "인증이 필요한 외부 API는 인증 프로필을 따로 두어 토큰이 컬렉션 설정과 섞이지 않게 했습니다. form-urlencoded 방식 요청도 함께 지원합니다.",
                modules: ["xgen-core", "xgen-documents"],
            },
            {
                category: "improved",
                title: "한 GPU에 여러 모델 — 메모리 여유 기반 적재",
                detail: "GPU 메모리 여유를 기준으로 적재를 허가하도록 바꿔, GPU 한 장에 음성 인식 모델과 LLM을 함께 올릴 수 있습니다.",
                modules: ["xgen-model", "xgen-infra"],
            },
            {
                category: "improved",
                title: "모델 서빙 관측 · 실시간 상태",
                detail: "vLLM 엔진 지표를 Prometheus로 내보내 대시보드와 알림에 연결했습니다. 어떤 모델이 요청을 얼마나 받고 대기열이 어디서 밀리는지 운영 화면에서 바로 보이고, 관리자 상태 화면은 새로고침 버튼 없이 SSE로 갱신됩니다.",
                modules: ["xgen-model", "xgen-infra", "xgen-frontend"],
            },
            {
                category: "improved",
                title: "임베딩 입력 초과 시 청크 자동 조정",
                detail: "임베딩 입력 한도를 넘긴 문서는 청크 크기를 자동으로 줄여 다시 시도합니다. 실패한 문서를 사람이 찾아 다시 올리던 일이 줄었습니다. 재시도 진행 상황은 SSE로 전달됩니다.",
                modules: ["xgen-documents", "xgen-frontend"],
            },
            {
                category: "improved",
                title: "llama.cpp 빌드 장비 비종속화",
                detail: "빌드가 특정 장비에 묶이지 않도록 고치고 Blackwell(sm_120) 세대를 추가했습니다.",
                modules: ["xgen-infra"],
            },
            {
                category: "improved",
                title: "Redis 접속 일원화 · 설정 캐시 전파",
                detail: "흩어져 있던 Redis 접속을 xgen_sdk.redis로 모으고 복사본을 지웠습니다. 사용자 preferences는 저장 즉시 다른 서비스의 캐시를 깨우도록 바꿔, TTL을 기다리지 않고 반영됩니다.",
                modules: ["xgen-core", "xgen-documents", "xgen-workflow"],
            },
            {
                category: "fixed",
                title: "게이트웨이 라우팅 누락으로 502",
                detail: "실제로 있는 모듈 다섯 종이 화이트리스트에 없어 Unknown service 502를 내던 경로를 바로잡고, 설정이 어긋나는 것을 막는 가드를 넣었습니다.",
                modules: ["xgen-backend-gateway"],
            },
            {
                category: "fixed",
                title: "파일명의 # · ? 를 주소 구분자로 되살리던 프록시",
                detail: "프록시가 파일명에 들어 있는 # 과 ? 를 URL 구분자로 해석해 파일을 찾지 못하던 문제를 고쳤습니다.",
                modules: ["xgen-backend-gateway"],
            },
            {
                category: "fixed",
                title: "업로드 전체가 중단되던 오류",
                detail: "모든 업로드를 죽이던 UnboundLocalError를 긴급 수정하고, 저장보다 늦게 내려지던 판정 순서를 바로잡았습니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "fixed",
                title: "노트북 세션 원격 접속 403",
                detail: "Jupyter 원격 접속이 websocket 단계에서 403으로 막히던 문제를 allow_remote_access·allow_origin 설정으로 해결했습니다.",
                modules: ["xgen-workbench"],
            },
            {
                category: "fixed",
                title: "체험존을 새로 만들면 대화를 시작할 수 없던 문제",
                detail: "신규 체험존에서 채팅 시작 목록이 비어 대화를 시작할 수 없던 문제를 고쳤습니다. 게이트웨이 라우팅 누락과 벡터 저장소 자원 설정도 함께 정리했습니다.",
                modules: ["xgen-infra"],
            },
            {
                category: "fixed",
                title: "채팅 첨부 이력 복원",
                detail: "대화에 올린 첨부가 이력에서 복원되지 않던 문제를 고쳤습니다.",
                modules: ["xgen-core"],
            },
            {
                category: "fixed",
                title: "DB 결과 처리 · 조회 문법 허용 범위",
                detail: "결과 가공 SQL 모드에서 Decimal 컬럼 바인딩이 실패하던 문제를 고쳤습니다. 관리자 SQL 콘솔은 조회 문법을 전부 허용하고 삭제·권한 구문만 막도록 정리했으며, 상세 오류를 화면에 전달합니다.",
                modules: ["xgen-workflow", "xgen-core"],
            },
        ],
    },
    {
        version: "v2.4.0",
        date: "2026-07-27",
        product: "xgen",
        tagline: "Voice I/O, Agent-level Masking & Data Access Audit",
        summary:
            "음성으로 주고받는 대화(STT·TTS), 에이전트 단위로 켜고 끄는 PII·금칙어 마스킹, 데이터 접근 감사와 관리자 엑셀 내보내기까지 — 쓰는 방식과 통제하는 방식을 함께 넓혔습니다.",
        highlights: [
            "음성 대화 (STT · TTS)",
            "에이전트별 PII · 금칙어 마스킹",
            "데이터 접근 감사 · 엑셀 내보내기",
            "DB → 온톨로지 색인",
        ],
        items: [
            {
                category: "new",
                title: "음성 대화 — STT · TTS",
                detail: "사용자는 마이페이지에서 음성 인식·합성 엔진을 고르고, 관리자는 [오디오] 설정에서 제공자별 카탈로그를 등록한 뒤 연결 테스트와 모델 자동 확인으로 검증합니다. 엔드포인트별 완성형 보이스를 만드는 [TTS 프로파일] 스튜디오와 기본 보이스 4종, 게이트웨이 /api/audio/* 라우팅까지 함께 들어갔습니다.",
                modules: ["xgen-core", "xgen-frontend", "xgen-backend-gateway"],
            },
            {
                category: "new",
                title: "에이전트별 PII · 금칙어 마스킹",
                detail: "통제 정책을 에이전트 단위로 켜고 끌 수 있습니다. 마스킹 범위를 답변 본문에서 도구 실행 결과·RAG 컨텍스트·출처로 표시되는 원본 문서까지 넓혔고, 정책 변경 이력에 무엇이 언제 바뀌었는지와 관여한 인원수가 남습니다.",
                modules: ["xgen-core", "xgen-workflow", "xgen-frontend", "xgen-documents"],
            },
            {
                category: "new",
                title: "데이터 접근 감사 · 관리자 엑셀 내보내기",
                detail: "에이전트가 접근한 DB 컬렉션과 문서명을 감사 로그로 남깁니다. 점검 이력·로그인 로그·채팅 통계·문서 재색인 등 관리자 화면 20여 곳에서 xlsx로 내려받을 수 있고, 실행 통계는 화면에 보이는 전체를 멀티시트로 내보냅니다.",
                modules: ["xgen-core", "xgen-documents", "xgen-frontend"],
            },
            {
                category: "new",
                title: "매뉴얼 인앱 뷰어",
                detail: "제품 매뉴얼을 앱을 벗어나지 않고 [솔루션 가이드]에서 바로 봅니다. 마크다운 원본을 실시간으로 서빙하는 방식이라 문서를 고치면 곧바로 반영됩니다.",
                modules: ["xgen-frontend"],
            },
            {
                category: "new",
                title: "사용자용 다운로드 센터 · 폐쇄망 번들",
                detail: "지원 섹션에 사용자가 직접 쓰는 다운로드 센터를 열고, 접속기 종류와 설치본 원본 형식을 지원합니다. 완전 폐쇄망 빌드를 위해 번들 설치본을 소스 레벨로 포함하고 시딩합니다.",
                modules: ["xgen-frontend", "xgen-core"],
            },
            {
                category: "improved",
                title: "DB → 온톨로지 색인",
                detail: "DB SELECT 결과를 LLM 추출 없이 온톨로지로 색인하는 경로를 다듬었습니다. 행 PK를 RDF URI에 연결하고, 그래프는 staging 기반으로 원자 교체하며, 색인 identity와 lease 스키마를 강제합니다.",
                modules: ["xgen-documents", "xgen-core"],
            },
            {
                category: "improved",
                title: "토큰 한도 정책 배포 범위",
                detail: "토큰 사용량 정책을 개발·검증·운영 등 배포 상태(agent_deploy_scope)별로 따로 집행합니다. 누적 집계도 같은 기준으로 나뉘어, 해당 배포 상태의 실행에만 정책이 걸립니다.",
                modules: ["xgen-core", "xgen-workflow"],
            },
            {
                category: "improved",
                title: "Oracle 연결 SQLAlchemy 통합",
                detail: "Oracle 조회를 SQLAlchemy 엔진으로 일원화하고 TCPS/SSL 연결, 연결 모드별 DSN, db_schema 적용, CLOB 조회 오류를 함께 정리했습니다. 외부 DB 쿼리에는 liveness 보호를 적용했습니다.",
                modules: ["xgen-workflow", "xgen-core"],
            },
            {
                category: "improved",
                title: "컨텍스트 초과 진단",
                detail: "컨텍스트 초과를 일반 오류로 뭉뚱그리지 않고 vLLM 실측 포맷 기준으로 진단해 무엇이 얼마나 넘쳤는지 안내합니다. 파일·컨텍스트 한도 하드코딩을 걷어내고 모델 카탈로그 기반으로 동적화했습니다.",
                modules: ["xgen-workflow"],
            },
            {
                category: "improved",
                title: "채팅 수식 렌더링 · 출처 뷰어",
                detail: "채팅 마크다운에서 KaTeX로 LaTeX 수식을 렌더링합니다. 본문에 중복 표시되던 출처 마커를 정리하고, 엑셀·CSV도 출처 뷰어로 열립니다.",
                modules: ["xgen-frontend"],
            },
            {
                category: "improved",
                title: "실행 통계 · 로그인 관리",
                detail: "에이전트 실행 통계와 장애 로그를 캘린더 범위로 조회하고, 로그인 관리 상단에 누적 로그인 사용자 수를 집계해 보여줍니다.",
                modules: ["xgen-core", "xgen-frontend"],
            },
            {
                category: "fixed",
                title: "모델 서버 자가복구 하드닝",
                detail: "동시성·누수 회수를 포함한 자가복구 경로를 강화하고, GPU별 메모리와 서빙 설정 스냅샷을 재기동 이력에 남깁니다. 재기동 사유를 호출자가 지정해 수동·자동을 구분합니다.",
                modules: ["xgen-model"],
            },
            {
                category: "fixed",
                title: "문서 저장소 암호화 기록 · MinIO 감사",
                detail: "업로드 이력에 실제 암호화 정보를 기록하도록 바로잡고, MinIO 업로드가 실패한 것처럼 잘못 남던 이력을 정리했습니다. 동일 파일 중복 업로드 스킵도 감사 기록으로 남깁니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "fixed",
                title: "공유 컬렉션 피공유자 접근",
                detail: "피공유자가 컬렉션 폴더와 파일 저장소에 접근할 때 소유자 스코프가 어긋나 목록·업로드·일괄삭제가 막히던 문제를 공통 검사로 통일했습니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "fixed",
                title: "Teams 멀티파드 메시지 정합",
                detail: "Redis pub/sub 백플레인을 도입해 여러 파드에 걸친 채팅 메시지 브로드캐스트가 어긋나지 않도록 했습니다.",
                modules: ["xgen-workflow"],
            },
        ],
    },
    {
        version: "v2.3.0",
        date: "2026-06-18",
        product: "xgen",
        tagline: "Canvas Chat, Model Serving & Team Collaboration",
        summary:
            "채팅 대화만으로 워크플로우를 만드는 Canvas Chat, 모델 서빙·MLOps 관리 UI, Teams 협업, 하네스 모듈화까지 — 대화형 빌드 경험과 운영 관리 역량을 대폭 확장했습니다.",
        highlights: [
            "Canvas Chat 대화형 빌더",
            "모델 서빙 · MLOps 관리",
            "Harness 모듈화 + Policy Gate",
            "Teams 협업 · 피드백",
        ],
        items: [
            {
                category: "new",
                title: "Canvas Chat — 대화로 만드는 워크플로우",
                detail: "채팅 대화만으로 워크플로우를 설계·빌드하는 Canvas Chat 모드를 도입했습니다. 빌더 LLM이 컬렉션을 사전에 생성·연결하고, 문서 인덱싱을 빌드와 분리·병렬화하며, 응답을 토큰 단위로 스트리밍합니다.",
                modules: ["xgen-frontend", "xgen-workflow"],
            },
            {
                category: "new",
                title: "모델 서빙 · MLOps 관리 UI",
                detail: "모델 서빙 카탈로그, 모델 카드 상세(아키텍처·파라미터·파일·라이선스), GPU 지정·멀티노드 vLLM selector, 로컬 HF 캐시 모델 표시까지 모델 운영 화면을 신설했습니다.",
                modules: ["xgen-frontend", "xgen-model"],
            },
            {
                category: "new",
                title: "Teams 협업",
                detail: "채팅방 응답 에이전트 표시, 별점·이슈 유형·코멘트 피드백, 파일 첨부 업로드·텍스트 추출, 회의 설정을 추가해 사람과 에이전트의 협업을 강화했습니다.",
                modules: ["xgen-frontend", "xgen-workflow", "xgen-core"],
            },
            {
                category: "new",
                title: "조건 분기 라우터 노드",
                detail: "Gate Classifier와 Distributed Router 기반의 조건 분기 노드를 추가했습니다. 포트 이름을 한글로 현지화하고 정책 게이트(Guard)와 연동됩니다.",
                modules: ["xgen-workflow", "xgen-frontend"],
            },
            {
                category: "new",
                title: "Agent 개발 기획서 · 배포 게이트",
                detail: "사용자 기획서 작성 화면과 관리자 토글, 배포 모달 연동을 추가했습니다. 하네스 publish 이력을 추적하는 테이블(HarnessPublishedWheel)도 함께 도입했습니다.",
                modules: ["xgen-frontend", "xgen-core"],
            },
            {
                category: "new",
                title: "문서 PII 사전 스캔",
                detail: "문서 단위 PII 사전 스캔(pre-scan)과 직접 마스킹, 컬렉션 TTL 관리, 마스킹 미적용 시 확인 절차를 추가했습니다.",
                modules: ["xgen-documents", "xgen-core"],
            },
            {
                category: "improved",
                title: "Harness 모듈화 + Policy Gate",
                detail: "10K LOC 모놀리식 하네스를 4개 서브기능과 harness-store 패키지로 분할하고, 인라인 MCP 마켓·Publish 타깃, Policy Gate(Guard) 연동, HITL 승인, published-wheel 자동 복구를 더했습니다.",
                modules: ["xgen-frontend", "xgen-workflow"],
            },
            {
                category: "improved",
                title: "Ontology 빌드 · 사전 관리",
                detail: "증분 빌드와 빌드 중단(cancel), property domain/range, 다중 트리플 일괄 매핑, 컬렉션 사전(dictionary) 관리·질의 정규화·대량 임포트를 추가했습니다.",
                modules: ["xgen-frontend", "xgen-documents"],
            },
            {
                category: "improved",
                title: "RAG 심층검색 · 정보검색 노드 v2",
                detail: "agentic ReAct 엔진 기반 심층검색 LLM 선택, 정보검색 노드 v2, 기본 검색 모드 always-search, 등록 API와 컬렉션을 함께 묶는 통합 도구 바인딩으로 검색 품질을 높였습니다.",
                modules: ["xgen-workflow", "xgen-documents"],
            },
            {
                category: "improved",
                title: "Admin 권한 · 화면 표준화",
                detail: "ABAC 권한 키 정비(모델 관리 admin.ml 등), 공통 DataTable와 검색 페이지네이션, 모달 버튼·토글 글로벌 표준 정합, DB 연결 관리 + 다단계 파이프라인 에디터를 적용했습니다.",
                modules: ["xgen-frontend", "xgen-core"],
            },
            {
                category: "improved",
                title: "설정 비밀값 마스킹",
                detail: "설정 API·UI 응답에서 API 키 등 비밀값을 재귀적으로 마스킹하고 재저장 가드를 추가해 노출을 차단했습니다.",
                modules: ["xgen-core"],
            },
            {
                category: "improved",
                title: "노드 · 파라미터 한글 레이블",
                detail: "노드명과 파라미터에 한글 의역 레이블(nodeNameKo·name_ko·label_ko)과 기본 로케일 한국어를 적용해 가독성을 높였습니다.",
                modules: ["xgen-frontend", "xgen-workflow"],
            },
            {
                category: "improved",
                title: "게이트웨이 라우팅 정비",
                detail: "`/api/cluster` 요청을 xgen-model로 라우팅하고 Teams 모듈을 워크플로우 서비스로 통합했습니다.",
                modules: ["xgen-backend-gateway", "xgen-model"],
            },
            {
                category: "fixed",
                title: "비보안 컨텍스트 로그인",
                detail: "HTTP(비보안) 환경에서도 로그인되도록 순수 JS SHA-256 폴백을 추가하고 인증 쿠키 이름 불일치를 수정했습니다.",
                modules: ["xgen-frontend"],
            },
            {
                category: "fixed",
                title: "채팅 마크다운 표 렌더링",
                detail: "Qwen·GPT 응답에서 마크다운 표 정렬 구분선(`:---:`, `---:`)이 깨지던 문제와 가독성 이슈를 통합 수정했습니다.",
                modules: ["xgen-frontend"],
            },
            {
                category: "fixed",
                title: "모델 서빙 안정화",
                detail: "vLLM 메트릭 instrumentator 충돌로 발생하던 `/v1/chat/completions` 500 오류, 로컬 경로 모델 메타데이터 조회 오류, 모델 로드 타임아웃을 수정·상향했습니다.",
                modules: ["xgen-model"],
            },
            {
                category: "fixed",
                title: "Ontology 그래프 회귀",
                detail: "관계 추가 후 노드가 사라지는 silent 누락, 그래프 로딩 회귀, 시각화 LIMIT 컷으로 인한 신규 트리플 누락을 바로잡았습니다.",
                modules: ["xgen-frontend", "xgen-documents"],
            },
        ],
    },
    {
        version: "v2.2.0",
        date: "2026-04-21",
        product: "xgen",
        tagline: "Governance, Harness & Ontology v3",
        summary:
            "AI 거버넌스 대시보드, 하네스 오케스트레이터, 온톨로지 v3 — 엔터프라이즈 운영에 필요한 관찰성·컴플라이언스·지식 그래프 기반을 한층 고도화했습니다.",
        highlights: [
            "AI Governance dashboard",
            "Harness orchestrator (workflow → wheel)",
            "Ontology v3 hybrid search",
            "ABAC 권한 체계",
        ],
        items: [
            {
                category: "new",
                title: "AI Governance 대시보드",
                detail: "위험 평가 재수행, 응답 품질 커버리지, 점검 기한 초과 현황, 재평가 미완료율까지 — 거버넌스 운영에 필요한 주요 지표를 한 화면에서 모니터링합니다.",
                modules: ["xgen-core"],
            },
            {
                category: "new",
                title: "Harness 오케스트레이터",
                detail: "워크플로우를 독립 실행 가능한 wheel 패키지로 컴파일합니다. 실행 이력, DAG 엔드포인트, drift-free 연동, 노드 파라미터 자동 상속까지 UX 6트랙으로 정비했습니다.",
                modules: ["xgen-workflow"],
            },
            {
                category: "new",
                title: "Ontology v3 하이브리드 검색",
                detail: "벡터 검색 + Kiwi 형태소 분석 결합. 멀티홉 탐색, CSV 스키마 빌더, FK 자동 감지(카디널리티 필터 포함)를 추가했습니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "new",
                title: "Support Center API",
                detail: "공지/QnA/FAQ/서비스 요청을 팝업·첨부파일·팔로업·통계와 함께 제공합니다.",
                modules: ["xgen-core"],
            },
            {
                category: "new",
                title: "ABAC 권한 체계",
                detail: "역할·권한 기반 접근 제어(`require_perm`)로 전환. 전체 컨트롤러의 권한 처리를 일관된 구조로 정비했습니다.",
                modules: ["xgen-core", "xgen-documents"],
            },
            {
                category: "new",
                title: "배치 LLM 평가",
                detail: "xlsx 업로드 → LLM 평가 → 원본 컬럼 유지한 결과 병합 다운로드. 평가 사유와 멀티 프로바이더 UI까지 지원합니다.",
                modules: ["xgen-frontend", "xgen-workflow"],
            },
            {
                category: "new",
                title: "문서 거버넌스 기능",
                detail: "컬렉션 TTL 관리, PII 자동 마스킹, 업로드 히스토리 추적 API.",
                modules: ["xgen-documents", "xgen-core"],
            },
            {
                category: "improved",
                title: "검색 성능 2~4배 개선",
                detail: "병렬 검색 파이프라인 도입, `limit` → `score_threshold` 전환, 코퍼스 크기 기반 동적 한계값으로 고도화했습니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "improved",
                title: "share_permissions JSONB 전환",
                detail: "VARCHAR → JSONB 마이그레이션. 공유 역할, 기록 가능 스토리지, 폴더 단위 권한 체크까지 유연해졌습니다.",
                modules: ["xgen-core", "xgen-documents"],
            },
            {
                category: "improved",
                title: "SQL 도구 PostgreSQL 완전 전환",
                detail: "SQLite 기반 SQL 실행 도구를 PostgreSQL로 전면 이전했습니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "improved",
                title: "xgen-sdk 1.4.4 통합 로깅",
                detail: "`create_logger`로 서비스 전반 로깅 체계를 통일했습니다.",
                modules: ["xgen-core", "xgen-documents"],
            },
            {
                category: "fixed",
                title: "FK 감지 오탐 방지",
                detail: "수량/가격 같은 숫자 데이터 컬럼에서 발생하던 FK 오탐을 카디널리티 필터로 차단했습니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "fixed",
                title: "인스턴스 동의어 1:1 통합",
                detail: "공백·대소문자·한국어 조사를 정규화해 중복 노드를 제거합니다.",
                modules: ["xgen-documents"],
            },
            {
                category: "fixed",
                title: "문서 폴더 트리 동기화",
                detail: "폴더 삭제 버그, tree view 동기화, 문서 페이지네이션의 루트 포함 필터링 이슈를 일괄 수정했습니다.",
                modules: ["xgen-frontend"],
            },
        ],
    },
    {
        version: "v2.1.0",
        date: "2026-03-22",
        product: "xgen",
        tagline: "Multi-Cloud, HA & Air-gapped Scale",
        summary:
            "고가용성 2노드 프로필, 폐쇄망 K3s HA 이전, vLLM 0.17(Qwen3.5 지원) 등 멀티 클라우드·폐쇄망 운영 역량을 집중적으로 강화했습니다.",
        highlights: [
            "vLLM 0.17 + Qwen3.5",
            "HA 2-node profile",
            "Air-gapped K3s migration",
            "GPU 배포 파이프라인",
        ],
        items: [
            {
                category: "new",
                title: "vLLM 0.17.0 업그레이드",
                detail: "Qwen3.5 모델 지원, extra_args CLI 플래그 전달. `--served-model-name`으로 모델명 기반 추론 호출이 가능해졌습니다.",
                modules: ["xgen-model"],
            },
            {
                category: "new",
                title: "폐쇄망 K3s HA 이전",
                detail: "CNPG · Valkey · Qdrant · MinIO 기반 HA 스택으로 폐쇄망 환경에서 2노드 고가용성을 제공합니다.",
                modules: ["xgen-infra"],
            },
            {
                category: "new",
                title: "2노드 HA 프로필",
                detail: "`--mode ha-2` 단일 플래그로 HA 배포를 즉시 구성합니다.",
                modules: ["xgen-infra"],
            },
            {
                category: "new",
                title: "GPU 배포 지원",
                detail: "Jenkins buildx 마운트와 커스텀/GPU/기본 3단계 배포 전략 분기를 추가했습니다.",
                modules: ["xgen-infra", "xgen-model"],
            },
            {
                category: "new",
                title: "MS 365 멀티유저 인증",
                detail: "MS365 MCP에 Device Code Flow 대응 토큰 캐시 PVC, user_id 기반 멀티유저 지원이 추가되었습니다.",
                modules: ["xgen-mcp-station"],
            },
            {
                category: "new",
                title: "추론 Reverse Proxy",
                detail: "`/api/inference/*` → vLLM / llama-server 경로로 프록시해 모델 서버 교체 시 프런트엔드 변경 없이 스위칭할 수 있습니다.",
                modules: ["xgen-model"],
            },
            {
                category: "improved",
                title: "llama-server 폐쇄망 지원",
                detail: "vLLM 프로세스에 `HF_HUB_OFFLINE=1`, `TRANSFORMERS_OFFLINE=1` 환경변수를 적용했습니다.",
                modules: ["xgen-model"],
            },
            {
                category: "improved",
                title: "대형 모델 지원",
                detail: "xgen-model 메모리·프로브 타임아웃을 조정하여 대형 모델 로딩을 안정화했습니다.",
                modules: ["xgen-model"],
            },
            {
                category: "improved",
                title: "프로덕션 리소스 튜닝",
                detail: "실제 사용량 기반으로 CPU/Memory request를 상향하고 OOMKilled·CPU throttling을 해결했습니다.",
                modules: ["xgen-infra"],
            },
            {
                category: "fixed",
                title: "Ingress YAML 파싱",
                detail: "`hosts` 값의 별칭(`*`) 파싱 오류를 quote 처리로 해결했습니다.",
                modules: ["xgen-infra"],
            },
            {
                category: "fixed",
                title: "ArgoCD 프로젝트 오류",
                detail: "프로젝트명 오류와 `DEPLOY_ENV` 기본값을 개선하고, Root App 파일명을 `ARGOCD_PROJECT` 기반으로 동적 결정하도록 수정했습니다.",
                modules: ["xgen-infra"],
            },
        ],
    },
    {
        version: "v2.0.0",
        date: "2026-02-27",
        product: "xgen",
        tagline: "XGEN 2.0 General Availability",
        summary:
            "XGEN 2.0 정식 출시. 워크플로우·모델·문서·MCP를 통합한 차세대 AI 플랫폼으로 9개 핵심 모듈이 동시 릴리스되었습니다.",
        highlights: [
            "9-module unified release",
            "xgen-model v2 architecture",
            "MinIO model hub",
            "Agent mode + scenario recorder",
        ],
        items: [
            {
                category: "new",
                title: "XGEN 2.0 플랫폼",
                detail: "xgen-workflow · xgen-core · xgen-backend-gateway · xgen-frontend · xgen-model · xgen-mcp-station · xgen-session-station · xgen-documents · xgen-infra 9개 모듈을 v2.0.0 태그로 동시 공개했습니다.",
                modules: ["xgen-core", "xgen-workflow", "xgen-frontend", "xgen-model", "xgen-documents", "xgen-mcp-station", "xgen-session-station", "xgen-backend-gateway", "xgen-infra"],
            },
            {
                category: "new",
                title: "xgen-model v2 아키텍처",
                detail: "MinIO 중앙 모델 허브 + PV 캐시 구조로 모델 배포를 표준화했습니다. `/api/model/loading_status` 호환 엔드포인트까지 제공합니다.",
                modules: ["xgen-model"],
            },
            {
                category: "new",
                title: "Agent 모드",
                detail: "Playwright 기반 Agent가 실사이트에서 12대 개선사항, 6대 정확도 개선, 3-5배 MCP 호출 축소로 Claude Code 수준의 속도·정확도를 달성합니다.",
                modules: ["xgen-frontend", "xgen-app"],
            },
            {
                category: "new",
                title: "시나리오 녹화 + 재생",
                detail: "브라우저 상호작용 녹화, selector 보정, Excel 루프 자동 매핑, 재생 엔진까지 end-to-end 자동화를 지원합니다.",
                modules: ["xgen-frontend", "xgen-app"],
            },
            {
                category: "new",
                title: "Human-in-the-loop UX",
                detail: "일시정지 버튼, 상황별 맥락 표시 배너, MAX_ROUNDS 50 라운드 자동 개입, 엑셀 루프 중단 없는 수동 액션 캡처를 구현했습니다.",
                modules: ["xgen-frontend", "xgen-app"],
            },
            {
                category: "new",
                title: "Local CLI Bridge",
                detail: "Tauri 데스크탑 앱에서 로컬 CLI 명령을 백엔드-프런트엔드 WebSocket 브리지로 실행합니다. SSE pause/resume, CLI exec 블록 UI까지 포함합니다.",
                modules: ["xgen-app"],
            },
            {
                category: "new",
                title: "MCP Station 세션 관리",
                detail: "Redis 기반 세션, 멀티 팟 라우팅, 활동 기반 타임아웃, 프로세스 헬스체크로 대규모 MCP 운영 환경을 지원합니다.",
                modules: ["xgen-mcp-station"],
            },
            {
                category: "new",
                title: "시스템 트레이 + Remote WebView",
                detail: "데스크탑 앱이 트레이로 최소화되며, Remote WebView 아키텍처로 프로토콜 기반 API 경로 자동 감지가 동작합니다.",
                modules: ["xgen-app"],
            },
        ],
    },
];

export const RELEASE_PRODUCT_LABEL: Record<ReleaseProduct, string> = {
    xgen: "XGEN Platform",
    library: "Open Source",
};

export const RELEASE_CATEGORY_LABEL: Record<ReleaseCategory, string> = {
    new: "New",
    improved: "Improved",
    fixed: "Fixed",
};

export const RELEASE_CATEGORY_STYLE: Record<ReleaseCategory, string> = {
    new: "bg-[#111] text-white",
    improved: "bg-[#eef2ff] text-[#3730a3] border border-[#c7d2fe]",
    fixed: "bg-[#f5f5f5] text-[#525252] border border-[#e5e5e5]",
};
