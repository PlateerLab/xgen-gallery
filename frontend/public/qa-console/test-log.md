# XGEN 기능 QA 테스트 로그 (stg 소스 카탈로그)

- 생성 기준: results ranAt `2026-07-29T08:26:26.989Z` · 소스 `permission-taxonomy.ts (stage)`
- **전체 단위기능 255** · 실행 32 (PASS 28/FAIL 3/WARN 1) · 미실행 223 · 실행 커버리지 13%
- 스코프: 공통 7 · MAIN 119 · ADMIN 129

| 케이스ID | 스코프 | 대분류 | 메뉴 | 액션 | 상태 | 목적 |
|---|---|---|---|---|---|---|
| TC-CMN-001 | 공통 | Agent 채팅 | 채팅 시작 | 조회 | PASS | Agent 채팅 · 채팅 시작 — 조회·목록 렌더 정상 확인 |
| TC-CMN-002 | 공통 | Agent 채팅 | 현재 채팅 | 조회 | 미실행 | Agent 채팅 · 현재 채팅 — 조회·목록 렌더 정상 확인 |
| TC-CMN-003 | 공통 | Agent 채팅 | 채팅 이력 | 조회 | PASS | Agent 채팅 · 채팅 이력 — 조회·목록 렌더 정상 확인 |
| TC-CMN-004 | 공통 | Agent 채팅 | 에이전트 실행 | 실행 | PASS | Agent 채팅 · 에이전트 실행 — 작업/에이전트 실행 정상 동작 확인 |
| TC-CMN-005 | 공통 | Agent 채팅 | 메시지 | 전송 | 미실행 | Agent 채팅 · 메시지 — 메시지 전송→응답 수신 정상 동작 확인 |
| TC-CMN-006 | 공통 | Teams | Teams | 조회 | PASS | Teams · Teams — 조회·목록 렌더 정상 확인 |
| TC-CMN-007 | 공통 | Canvas | Canvas | 조회 | 미실행 | Canvas · Canvas — 조회·목록 렌더 정상 확인 |
| TC-MAIN-001 | MAIN | 분석 / 기획 | 업무기획 | 조회 | 미실행 | 분석 / 기획 · 업무기획 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-002 | MAIN | 분석 / 기획 | 사용자 설정 | 조회 | 미실행 | 분석 / 기획 · 사용자 설정 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-003 | MAIN | Agent 제작 | Agent 설계 | 조회 | 미실행 | Agent 제작 · Agent 설계 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-004 | MAIN | Agent 제작 | Agent 설계 | 생성 | 미실행 | Agent 제작 · Agent 설계 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-005 | MAIN | Agent 제작 | Agent 설계 | 수정 | 미실행 | Agent 제작 · Agent 설계 — 기존 항목 수정·반영 확인 |
| TC-MAIN-006 | MAIN | Agent 제작 | Agent 설계 | 삭제 | 미실행 | Agent 제작 · Agent 설계 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-007 | MAIN | Agent 제작 | Agent 설계 | 저장 | 미실행 | Agent 제작 · Agent 설계 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-008 | MAIN | Agent 제작 | Agent 설계 | 캔버스 | PASS | Agent 제작 · Agent 설계 — 캔버스 노드 추가·연결 상호작용 확인 |
| TC-MAIN-009 | MAIN | Agent 제작 | Agent 목록 | 조회 | PASS | Agent 제작 · Agent 목록 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-010 | MAIN | Agent 제작 | Agent 목록 | 생성 | PASS | Agent 제작 · Agent 목록 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-011 | MAIN | Agent 제작 | Agent 목록 | 수정 | PASS | Agent 제작 · Agent 목록 — 기존 항목 수정·반영 확인 |
| TC-MAIN-012 | MAIN | Agent 제작 | Agent 목록 | 삭제 | PASS | Agent 제작 · Agent 목록 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-013 | MAIN | Agent 제작 | Agent 목록 | 저장 | 미실행 | Agent 제작 · Agent 목록 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-014 | MAIN | Agent 제작 | Agent 목록 | 일괄 | FAIL | Agent 제작 · Agent 목록 — 다건 일괄 작업 정상 동작 확인 |
| TC-MAIN-015 | MAIN | Agent 제작 | Agent 목록 | 실행 | PASS | Agent 제작 · Agent 목록 — 작업/에이전트 실행 정상 동작 확인 |
| TC-MAIN-016 | MAIN | Agent 제작 | Agent 목록 | 배포·승인 | 미실행 | Agent 제작 · Agent 목록 — 배포 요청·이중 승인 흐름 확인 |
| TC-MAIN-017 | MAIN | Agent 제작 | Agent 목록 | 공유 | 미실행 | Agent 제작 · Agent 목록 — 공유·권한 부여 정상 동작 확인 |
| TC-MAIN-018 | MAIN | Agent 제작 | Agent 목록 | 복제 | PASS | Agent 제작 · Agent 목록 —  |
| TC-MAIN-019 | MAIN | Agent 제작 | Agent 운영 설정 | 조회 | 미실행 | Agent 제작 · Agent 운영 설정 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-020 | MAIN | Agent 제작 | Agent 운영 설정 | 생성 | 미실행 | Agent 제작 · Agent 운영 설정 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-021 | MAIN | Agent 제작 | Agent 운영 설정 | 수정 | 미실행 | Agent 제작 · Agent 운영 설정 — 기존 항목 수정·반영 확인 |
| TC-MAIN-022 | MAIN | Agent 제작 | Agent 운영 설정 | 삭제 | 미실행 | Agent 제작 · Agent 운영 설정 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-023 | MAIN | Agent 제작 | Agent 운영 설정 | 저장 | 미실행 | Agent 제작 · Agent 운영 설정 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-024 | MAIN | Agent 제작 | Agent 운영 설정 | 배포·승인 | 미실행 | Agent 제작 · Agent 운영 설정 — 배포 요청·이중 승인 흐름 확인 |
| TC-MAIN-025 | MAIN | Agent 제작 | Agent 품질 평가 | 조회 | PASS | Agent 제작 · Agent 품질 평가 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-026 | MAIN | Agent 제작 | Agent 품질 평가 | 생성 | 미실행 | Agent 제작 · Agent 품질 평가 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-027 | MAIN | Agent 제작 | Agent 품질 평가 | 수정 | 미실행 | Agent 제작 · Agent 품질 평가 — 기존 항목 수정·반영 확인 |
| TC-MAIN-028 | MAIN | Agent 제작 | Agent 품질 평가 | 삭제 | 미실행 | Agent 제작 · Agent 품질 평가 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-029 | MAIN | Agent 제작 | Agent 품질 평가 | 저장 | 미실행 | Agent 제작 · Agent 품질 평가 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-030 | MAIN | Agent 제작 | Agent 프롬프트 | 조회 | PASS | Agent 제작 · Agent 프롬프트 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-031 | MAIN | Agent 제작 | Agent 프롬프트 | 생성 | 미실행 | Agent 제작 · Agent 프롬프트 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-032 | MAIN | Agent 제작 | Agent 프롬프트 | 수정 | 미실행 | Agent 제작 · Agent 프롬프트 — 기존 항목 수정·반영 확인 |
| TC-MAIN-033 | MAIN | Agent 제작 | Agent 프롬프트 | 삭제 | 미실행 | Agent 제작 · Agent 프롬프트 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-034 | MAIN | Agent 제작 | Agent 프롬프트 | 저장 | 미실행 | Agent 제작 · Agent 프롬프트 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-035 | MAIN | 도구 연동 | API 도구 | 조회 | PASS | 도구 연동 · API 도구 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-036 | MAIN | 도구 연동 | API 도구 | 생성 | FAIL | 도구 연동 · API 도구 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-037 | MAIN | 도구 연동 | API 도구 | 수정 | 미실행 | 도구 연동 · API 도구 — 기존 항목 수정·반영 확인 |
| TC-MAIN-038 | MAIN | 도구 연동 | API 도구 | 삭제 | 미실행 | 도구 연동 · API 도구 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-039 | MAIN | 도구 연동 | API 도구 | 저장 | 미실행 | 도구 연동 · API 도구 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-040 | MAIN | 도구 연동 | API 도구 | 연결·테스트 | 미실행 | 도구 연동 · API 도구 — 외부 연동 연결 테스트 정상 동작 확인 |
| TC-MAIN-041 | MAIN | 도구 연동 | 인증 프로필 | 조회 | PASS | 도구 연동 · 인증 프로필 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-042 | MAIN | 도구 연동 | 인증 프로필 | 생성 | 미실행 | 도구 연동 · 인증 프로필 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-043 | MAIN | 도구 연동 | 인증 프로필 | 수정 | 미실행 | 도구 연동 · 인증 프로필 — 기존 항목 수정·반영 확인 |
| TC-MAIN-044 | MAIN | 도구 연동 | 인증 프로필 | 삭제 | 미실행 | 도구 연동 · 인증 프로필 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-045 | MAIN | 도구 연동 | 인증 프로필 | 저장 | 미실행 | 도구 연동 · 인증 프로필 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-046 | MAIN | 도구 연동 | 인증 프로필 | 연결·테스트 | 미실행 | 도구 연동 · 인증 프로필 — 외부 연동 연결 테스트 정상 동작 확인 |
| TC-MAIN-047 | MAIN | 지식관리 | 지식 컬렉션 | 조회 | PASS | 지식관리 · 지식 컬렉션 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-048 | MAIN | 지식관리 | 지식 컬렉션 | 생성 | 미실행 | 지식관리 · 지식 컬렉션 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-049 | MAIN | 지식관리 | 지식 컬렉션 | 수정 | 미실행 | 지식관리 · 지식 컬렉션 — 기존 항목 수정·반영 확인 |
| TC-MAIN-050 | MAIN | 지식관리 | 지식 컬렉션 | 삭제 | 미실행 | 지식관리 · 지식 컬렉션 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-051 | MAIN | 지식관리 | 지식 컬렉션 | 저장 | 미실행 | 지식관리 · 지식 컬렉션 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-052 | MAIN | 지식관리 | 지식 컬렉션 | 업로드/다운로드 | PASS | 지식관리 · 지식 컬렉션 — 파일 업로드/다운로드 정상 동작 확인 |
| TC-MAIN-053 | MAIN | 지식관리 | DB 연동 | 조회 | 미실행 | 지식관리 · DB 연동 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-054 | MAIN | 지식관리 | DB 연동 | 생성 | 미실행 | 지식관리 · DB 연동 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-055 | MAIN | 지식관리 | DB 연동 | 수정 | 미실행 | 지식관리 · DB 연동 — 기존 항목 수정·반영 확인 |
| TC-MAIN-056 | MAIN | 지식관리 | DB 연동 | 삭제 | 미실행 | 지식관리 · DB 연동 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-057 | MAIN | 지식관리 | DB 연동 | 저장 | 미실행 | 지식관리 · DB 연동 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-058 | MAIN | 지식관리 | DB 연동 | 연결·테스트 | 미실행 | 지식관리 · DB 연동 — 외부 연동 연결 테스트 정상 동작 확인 |
| TC-MAIN-059 | MAIN | 지식관리 | 파일 저장소 | 조회 | PASS | 지식관리 · 파일 저장소 — 조회·목록 렌더 정상 확인 |
| TC-MAIN-060 | MAIN | 지식관리 | 파일 저장소 | 생성 | 미실행 | 지식관리 · 파일 저장소 — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-061 | MAIN | 지식관리 | 파일 저장소 | 수정 | 미실행 | 지식관리 · 파일 저장소 — 기존 항목 수정·반영 확인 |
| TC-MAIN-062 | MAIN | 지식관리 | 파일 저장소 | 삭제 | 미실행 | 지식관리 · 파일 저장소 — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-063 | MAIN | 지식관리 | 파일 저장소 | 저장 | 미실행 | 지식관리 · 파일 저장소 — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-064 | MAIN | 지식관리 | 파일 저장소 | 업로드/다운로드 | 미실행 | 지식관리 · 파일 저장소 — 파일 업로드/다운로드 정상 동작 확인 |
| TC-MAIN-065 | MAIN | Model Studio | Workbench | 조회 | 미실행 | Model Studio · Workbench — 조회·목록 렌더 정상 확인 |
| TC-MAIN-066 | MAIN | Model Studio | Workbench | 생성 | 미실행 | Model Studio · Workbench — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-067 | MAIN | Model Studio | Workbench | 수정 | 미실행 | Model Studio · Workbench — 기존 항목 수정·반영 확인 |
| TC-MAIN-068 | MAIN | Model Studio | Workbench | 삭제 | 미실행 | Model Studio · Workbench — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-069 | MAIN | Model Studio | Workbench | 저장 | 미실행 | Model Studio · Workbench — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-070 | MAIN | Model Studio | Datasets | 조회 | 미실행 | Model Studio · Datasets — 조회·목록 렌더 정상 확인 |
| TC-MAIN-071 | MAIN | Model Studio | Datasets | 생성 | 미실행 | Model Studio · Datasets — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-072 | MAIN | Model Studio | Datasets | 수정 | 미실행 | Model Studio · Datasets — 기존 항목 수정·반영 확인 |
| TC-MAIN-073 | MAIN | Model Studio | Datasets | 삭제 | 미실행 | Model Studio · Datasets — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-074 | MAIN | Model Studio | Datasets | 저장 | 미실행 | Model Studio · Datasets — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-075 | MAIN | Model Studio | Experiments | 조회 | 미실행 | Model Studio · Experiments — 조회·목록 렌더 정상 확인 |
| TC-MAIN-076 | MAIN | Model Studio | Experiments | 생성 | 미실행 | Model Studio · Experiments — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-077 | MAIN | Model Studio | Experiments | 수정 | 미실행 | Model Studio · Experiments — 기존 항목 수정·반영 확인 |
| TC-MAIN-078 | MAIN | Model Studio | Experiments | 삭제 | 미실행 | Model Studio · Experiments — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-079 | MAIN | Model Studio | Experiments | 저장 | 미실행 | Model Studio · Experiments — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-080 | MAIN | Model Studio | Fine-tuning | 조회 | 미실행 | Model Studio · Fine-tuning — 조회·목록 렌더 정상 확인 |
| TC-MAIN-081 | MAIN | Model Studio | Fine-tuning | 생성 | 미실행 | Model Studio · Fine-tuning — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-082 | MAIN | Model Studio | Fine-tuning | 수정 | 미실행 | Model Studio · Fine-tuning — 기존 항목 수정·반영 확인 |
| TC-MAIN-083 | MAIN | Model Studio | Fine-tuning | 삭제 | 미실행 | Model Studio · Fine-tuning — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-084 | MAIN | Model Studio | Fine-tuning | 저장 | 미실행 | Model Studio · Fine-tuning — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-085 | MAIN | Model Studio | Training Jobs | 조회 | 미실행 | Model Studio · Training Jobs — 조회·목록 렌더 정상 확인 |
| TC-MAIN-086 | MAIN | Model Studio | Training Jobs | 생성 | 미실행 | Model Studio · Training Jobs — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-087 | MAIN | Model Studio | Training Jobs | 수정 | 미실행 | Model Studio · Training Jobs — 기존 항목 수정·반영 확인 |
| TC-MAIN-088 | MAIN | Model Studio | Training Jobs | 삭제 | 미실행 | Model Studio · Training Jobs — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-089 | MAIN | Model Studio | Training Jobs | 저장 | 미실행 | Model Studio · Training Jobs — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-090 | MAIN | Model Studio | Models | 조회 | 미실행 | Model Studio · Models — 조회·목록 렌더 정상 확인 |
| TC-MAIN-091 | MAIN | Model Studio | Models | 생성 | 미실행 | Model Studio · Models — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-092 | MAIN | Model Studio | Models | 수정 | 미실행 | Model Studio · Models — 기존 항목 수정·반영 확인 |
| TC-MAIN-093 | MAIN | Model Studio | Models | 삭제 | 미실행 | Model Studio · Models — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-094 | MAIN | Model Studio | Models | 저장 | 미실행 | Model Studio · Models — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-095 | MAIN | Model Studio | Serving | 조회 | 미실행 | Model Studio · Serving — 조회·목록 렌더 정상 확인 |
| TC-MAIN-096 | MAIN | Model Studio | Serving | 생성 | 미실행 | Model Studio · Serving — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-097 | MAIN | Model Studio | Serving | 수정 | 미실행 | Model Studio · Serving — 기존 항목 수정·반영 확인 |
| TC-MAIN-098 | MAIN | Model Studio | Serving | 삭제 | 미실행 | Model Studio · Serving — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-099 | MAIN | Model Studio | Serving | 저장 | 미실행 | Model Studio · Serving — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-100 | MAIN | Model Studio | LLM Eval | 조회 | 미실행 | Model Studio · LLM Eval — 조회·목록 렌더 정상 확인 |
| TC-MAIN-101 | MAIN | Model Studio | LLM Eval | 생성 | 미실행 | Model Studio · LLM Eval — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-102 | MAIN | Model Studio | LLM Eval | 수정 | 미실행 | Model Studio · LLM Eval — 기존 항목 수정·반영 확인 |
| TC-MAIN-103 | MAIN | Model Studio | LLM Eval | 삭제 | 미실행 | Model Studio · LLM Eval — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-104 | MAIN | Model Studio | LLM Eval | 저장 | 미실행 | Model Studio · LLM Eval — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-105 | MAIN | Model Studio | Agent Trace | 조회 | 미실행 | Model Studio · Agent Trace — 조회·목록 렌더 정상 확인 |
| TC-MAIN-106 | MAIN | Model Studio | Agent Trace | 생성 | 미실행 | Model Studio · Agent Trace — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-107 | MAIN | Model Studio | Agent Trace | 수정 | 미실행 | Model Studio · Agent Trace — 기존 항목 수정·반영 확인 |
| TC-MAIN-108 | MAIN | Model Studio | Agent Trace | 삭제 | 미실행 | Model Studio · Agent Trace — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-109 | MAIN | Model Studio | Agent Trace | 저장 | 미실행 | Model Studio · Agent Trace — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-110 | MAIN | Model Studio | Monitoring | 조회 | 미실행 | Model Studio · Monitoring — 조회·목록 렌더 정상 확인 |
| TC-MAIN-111 | MAIN | Model Studio | Monitoring | 생성 | 미실행 | Model Studio · Monitoring — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-112 | MAIN | Model Studio | Monitoring | 수정 | 미실행 | Model Studio · Monitoring — 기존 항목 수정·반영 확인 |
| TC-MAIN-113 | MAIN | Model Studio | Monitoring | 삭제 | 미실행 | Model Studio · Monitoring — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-114 | MAIN | Model Studio | Monitoring | 저장 | 미실행 | Model Studio · Monitoring — 변경사항 서버 저장 반영 확인 |
| TC-MAIN-115 | MAIN | Model Studio | Prompt Studio | 조회 | 미실행 | Model Studio · Prompt Studio — 조회·목록 렌더 정상 확인 |
| TC-MAIN-116 | MAIN | Model Studio | Prompt Studio | 생성 | 미실행 | Model Studio · Prompt Studio — 신규 생성 흐름 정상 동작 확인 |
| TC-MAIN-117 | MAIN | Model Studio | Prompt Studio | 수정 | 미실행 | Model Studio · Prompt Studio — 기존 항목 수정·반영 확인 |
| TC-MAIN-118 | MAIN | Model Studio | Prompt Studio | 삭제 | 미실행 | Model Studio · Prompt Studio — 삭제 동작·복구불가 처리 확인 |
| TC-MAIN-119 | MAIN | Model Studio | Prompt Studio | 저장 | 미실행 | Model Studio · Prompt Studio — 변경사항 서버 저장 반영 확인 |
| TC-ADM-001 | ADMIN | 사용자 / 접근제어 | 사용자 관리 | 조회 | PASS | 사용자 / 접근제어 · 사용자 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-002 | ADMIN | 사용자 / 접근제어 | 사용자 관리 | 수정 | 미실행 | 사용자 / 접근제어 · 사용자 관리 — 기존 항목 수정·반영 확인 |
| TC-ADM-003 | ADMIN | 사용자 / 접근제어 | 사용자 관리 | 삭제 | 미실행 | 사용자 / 접근제어 · 사용자 관리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-004 | ADMIN | 사용자 / 접근제어 | 사용자 관리 | 일괄 | 미실행 | 사용자 / 접근제어 · 사용자 관리 — 다건 일괄 작업 정상 동작 확인 |
| TC-ADM-005 | ADMIN | 사용자 / 접근제어 | 역할/권한 관리 | 조회 | PASS | 사용자 / 접근제어 · 역할/권한 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-006 | ADMIN | 사용자 / 접근제어 | 역할/권한 관리 | 생성 | 미실행 | 사용자 / 접근제어 · 역할/권한 관리 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-007 | ADMIN | 사용자 / 접근제어 | 역할/권한 관리 | 수정 | 미실행 | 사용자 / 접근제어 · 역할/권한 관리 — 기존 항목 수정·반영 확인 |
| TC-ADM-008 | ADMIN | 사용자 / 접근제어 | 역할/권한 관리 | 삭제 | 미실행 | 사용자 / 접근제어 · 역할/권한 관리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-009 | ADMIN | 사용자 / 접근제어 | 역할/권한 관리 | 저장 | 미실행 | 사용자 / 접근제어 · 역할/권한 관리 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-010 | ADMIN | Agent 운영 | Agent 관리 | 조회 | PASS | Agent 운영 · Agent 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-011 | ADMIN | Agent 운영 | Agent 관리 | 생성 | 미실행 | Agent 운영 · Agent 관리 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-012 | ADMIN | Agent 운영 | Agent 관리 | 수정 | 미실행 | Agent 운영 · Agent 관리 — 기존 항목 수정·반영 확인 |
| TC-ADM-013 | ADMIN | Agent 운영 | Agent 관리 | 삭제 | 미실행 | Agent 운영 · Agent 관리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-014 | ADMIN | Agent 운영 | Agent 관리 | 저장 | 미실행 | Agent 운영 · Agent 관리 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-015 | ADMIN | Agent 운영 | 채팅 모니터링 | 조회 | FAIL | Agent 운영 · 채팅 모니터링 — 조회·목록 렌더 정상 확인 |
| TC-ADM-016 | ADMIN | Agent 운영 | 사용자 토큰 | 조회 | 미실행 | Agent 운영 · 사용자 토큰 — 조회·목록 렌더 정상 확인 |
| TC-ADM-017 | ADMIN | Agent 운영 | 사용자 토큰 | 생성 | 미실행 | Agent 운영 · 사용자 토큰 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-018 | ADMIN | Agent 운영 | 사용자 토큰 | 수정 | 미실행 | Agent 운영 · 사용자 토큰 — 기존 항목 수정·반영 확인 |
| TC-ADM-019 | ADMIN | Agent 운영 | 사용자 토큰 | 삭제 | 미실행 | Agent 운영 · 사용자 토큰 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-020 | ADMIN | Agent 운영 | 사용자 토큰 | 저장 | 미실행 | Agent 운영 · 사용자 토큰 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-021 | ADMIN | Agent 운영 | 노드 관리 | 조회 | 미실행 | Agent 운영 · 노드 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-022 | ADMIN | Agent 운영 | 프롬프트 템플릿 | 조회 | 미실행 | Agent 운영 · 프롬프트 템플릿 — 조회·목록 렌더 정상 확인 |
| TC-ADM-023 | ADMIN | Agent 운영 | 프롬프트 템플릿 | 생성 | 미실행 | Agent 운영 · 프롬프트 템플릿 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-024 | ADMIN | Agent 운영 | 프롬프트 템플릿 | 수정 | 미실행 | Agent 운영 · 프롬프트 템플릿 — 기존 항목 수정·반영 확인 |
| TC-ADM-025 | ADMIN | Agent 운영 | 프롬프트 템플릿 | 삭제 | 미실행 | Agent 운영 · 프롬프트 템플릿 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-026 | ADMIN | Agent 운영 | 프롬프트 템플릿 | 저장 | 미실행 | Agent 운영 · 프롬프트 템플릿 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-027 | ADMIN | Agent 운영 | 사용자 피드백 | 조회 | PASS | Agent 운영 · 사용자 피드백 — 조회·목록 렌더 정상 확인 |
| TC-ADM-028 | ADMIN | Agent 운영 | 응답 품질 평가 | 조회 | 미실행 | Agent 운영 · 응답 품질 평가 — 조회·목록 렌더 정상 확인 |
| TC-ADM-029 | ADMIN | Agent 운영 | 응답 품질 평가 | 생성 | 미실행 | Agent 운영 · 응답 품질 평가 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-030 | ADMIN | Agent 운영 | 응답 품질 평가 | 수정 | 미실행 | Agent 운영 · 응답 품질 평가 — 기존 항목 수정·반영 확인 |
| TC-ADM-031 | ADMIN | Agent 운영 | 응답 품질 평가 | 삭제 | 미실행 | Agent 운영 · 응답 품질 평가 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-032 | ADMIN | Agent 운영 | 응답 품질 평가 | 저장 | 미실행 | Agent 운영 · 응답 품질 평가 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-033 | ADMIN | Agent 운영 | Agent 리텐션 분석 | 조회 | 미실행 | Agent 운영 · Agent 리텐션 분석 — 조회·목록 렌더 정상 확인 |
| TC-ADM-034 | ADMIN | Agent 운영 | Agent 리텐션 분석 | 생성 | 미실행 | Agent 운영 · Agent 리텐션 분석 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-035 | ADMIN | Agent 운영 | Agent 리텐션 분석 | 수정 | 미실행 | Agent 운영 · Agent 리텐션 분석 — 기존 항목 수정·반영 확인 |
| TC-ADM-036 | ADMIN | Agent 운영 | Agent 리텐션 분석 | 삭제 | 미실행 | Agent 운영 · Agent 리텐션 분석 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-037 | ADMIN | Agent 운영 | Agent 리텐션 분석 | 저장 | 미실행 | Agent 운영 · Agent 리텐션 분석 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-038 | ADMIN | Agent 운영 | Agent 기획 | 조회 | 미실행 | Agent 운영 · Agent 기획 — 조회·목록 렌더 정상 확인 |
| TC-ADM-039 | ADMIN | Agent 운영 | Agent 기획 | 생성 | 미실행 | Agent 운영 · Agent 기획 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-040 | ADMIN | Agent 운영 | Agent 기획 | 수정 | 미실행 | Agent 운영 · Agent 기획 — 기존 항목 수정·반영 확인 |
| TC-ADM-041 | ADMIN | Agent 운영 | Agent 기획 | 삭제 | 미실행 | Agent 운영 · Agent 기획 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-042 | ADMIN | Agent 운영 | Agent 기획 | 저장 | 미실행 | Agent 운영 · Agent 기획 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-043 | ADMIN | 환경 설정 | 전체 설정 | 조회 | WARN | 환경 설정 · 전체 설정 — 조회·목록 렌더 정상 확인 |
| TC-ADM-044 | ADMIN | 환경 설정 | 전체 설정 | 수정 | 미실행 | 환경 설정 · 전체 설정 — 기존 항목 수정·반영 확인 |
| TC-ADM-045 | ADMIN | 환경 설정 | LLM 모델 카탈로그 | 조회 | 미실행 | 환경 설정 · LLM 모델 카탈로그 — 조회·목록 렌더 정상 확인 |
| TC-ADM-046 | ADMIN | 환경 설정 | LLM 모델 카탈로그 | 생성 | 미실행 | 환경 설정 · LLM 모델 카탈로그 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-047 | ADMIN | 환경 설정 | LLM 모델 카탈로그 | 수정 | 미실행 | 환경 설정 · LLM 모델 카탈로그 — 기존 항목 수정·반영 확인 |
| TC-ADM-048 | ADMIN | 환경 설정 | LLM 모델 카탈로그 | 삭제 | 미실행 | 환경 설정 · LLM 모델 카탈로그 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-049 | ADMIN | 환경 설정 | LLM 모델 카탈로그 | 저장 | 미실행 | 환경 설정 · LLM 모델 카탈로그 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-050 | ADMIN | 시스템 상태 | 시스템 모니터링 | 조회 | PASS | 시스템 상태 · 시스템 모니터링 — 조회·목록 렌더 정상 확인 |
| TC-ADM-051 | ADMIN | 시스템 상태 | 시스템 조회 | 조회 | 미실행 | 시스템 상태 · 시스템 조회 — 조회·목록 렌더 정상 확인 |
| TC-ADM-052 | ADMIN | 시스템 상태 | 로그 조회 | 조회 | 미실행 | 시스템 상태 · 로그 조회 — 조회·목록 렌더 정상 확인 |
| TC-ADM-053 | ADMIN | 데이터 관리 | 데이터베이스 | 조회 | PASS | 데이터 관리 · 데이터베이스 — 조회·목록 렌더 정상 확인 |
| TC-ADM-054 | ADMIN | 데이터 관리 | 데이터베이스 | 생성 | 미실행 | 데이터 관리 · 데이터베이스 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-055 | ADMIN | 데이터 관리 | 데이터베이스 | 수정 | 미실행 | 데이터 관리 · 데이터베이스 — 기존 항목 수정·반영 확인 |
| TC-ADM-056 | ADMIN | 데이터 관리 | 데이터베이스 | 삭제 | 미실행 | 데이터 관리 · 데이터베이스 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-057 | ADMIN | 데이터 관리 | 데이터베이스 | 저장 | 미실행 | 데이터 관리 · 데이터베이스 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-058 | ADMIN | 데이터 관리 | 데이터베이스 | 연결·테스트 | 미실행 | 데이터 관리 · 데이터베이스 — 외부 연동 연결 테스트 정상 동작 확인 |
| TC-ADM-059 | ADMIN | 데이터 관리 | 데이터소스 연결 | 조회 | 미실행 | 데이터 관리 · 데이터소스 연결 — 조회·목록 렌더 정상 확인 |
| TC-ADM-060 | ADMIN | 데이터 관리 | 데이터소스 연결 | 생성 | 미실행 | 데이터 관리 · 데이터소스 연결 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-061 | ADMIN | 데이터 관리 | 데이터소스 연결 | 수정 | 미실행 | 데이터 관리 · 데이터소스 연결 — 기존 항목 수정·반영 확인 |
| TC-ADM-062 | ADMIN | 데이터 관리 | 데이터소스 연결 | 삭제 | 미실행 | 데이터 관리 · 데이터소스 연결 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-063 | ADMIN | 데이터 관리 | 데이터소스 연결 | 저장 | 미실행 | 데이터 관리 · 데이터소스 연결 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-064 | ADMIN | 데이터 관리 | 데이터소스 연결 | 연결·테스트 | 미실행 | 데이터 관리 · 데이터소스 연결 — 외부 연동 연결 테스트 정상 동작 확인 |
| TC-ADM-065 | ADMIN | 데이터 관리 | 스케줄 쿼리 | 조회 | 미실행 | 데이터 관리 · 스케줄 쿼리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-066 | ADMIN | 데이터 관리 | 스케줄 쿼리 | 생성 | 미실행 | 데이터 관리 · 스케줄 쿼리 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-067 | ADMIN | 데이터 관리 | 스케줄 쿼리 | 수정 | 미실행 | 데이터 관리 · 스케줄 쿼리 — 기존 항목 수정·반영 확인 |
| TC-ADM-068 | ADMIN | 데이터 관리 | 스케줄 쿼리 | 삭제 | 미실행 | 데이터 관리 · 스케줄 쿼리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-069 | ADMIN | 데이터 관리 | 스케줄 쿼리 | 저장 | 미실행 | 데이터 관리 · 스케줄 쿼리 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-070 | ADMIN | 데이터 관리 | 스케줄 쿼리 | 실행 | 미실행 | 데이터 관리 · 스케줄 쿼리 — 작업/에이전트 실행 정상 동작 확인 |
| TC-ADM-071 | ADMIN | 데이터 관리 | 배치 작업 | 조회 | 미실행 | 데이터 관리 · 배치 작업 — 조회·목록 렌더 정상 확인 |
| TC-ADM-072 | ADMIN | 데이터 관리 | 배치 작업 | 생성 | 미실행 | 데이터 관리 · 배치 작업 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-073 | ADMIN | 데이터 관리 | 배치 작업 | 수정 | 미실행 | 데이터 관리 · 배치 작업 — 기존 항목 수정·반영 확인 |
| TC-ADM-074 | ADMIN | 데이터 관리 | 배치 작업 | 삭제 | 미실행 | 데이터 관리 · 배치 작업 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-075 | ADMIN | 데이터 관리 | 배치 작업 | 저장 | 미실행 | 데이터 관리 · 배치 작업 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-076 | ADMIN | 데이터 관리 | 배치 작업 | 실행 | 미실행 | 데이터 관리 · 배치 작업 — 작업/에이전트 실행 정상 동작 확인 |
| TC-ADM-077 | ADMIN | 데이터 관리 | 데이터 감사 로그 | 조회 | 미실행 | 데이터 관리 · 데이터 감사 로그 — 조회·목록 렌더 정상 확인 |
| TC-ADM-078 | ADMIN | 데이터 관리 | 데이터 감사 로그 | 내보내기 | 미실행 | 데이터 관리 · 데이터 감사 로그 — 데이터 내보내기 정상 동작 확인 |
| TC-ADM-079 | ADMIN | MCP 관리 | MCP 라이브러리 | 조회 | PASS | MCP 관리 · MCP 라이브러리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-080 | ADMIN | MCP 관리 | MCP 운영 | 조회 | 미실행 | MCP 관리 · MCP 운영 — 조회·목록 렌더 정상 확인 |
| TC-ADM-081 | ADMIN | MCP 관리 | MCP 운영 | 생성 | 미실행 | MCP 관리 · MCP 운영 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-082 | ADMIN | MCP 관리 | MCP 운영 | 수정 | 미실행 | MCP 관리 · MCP 운영 — 기존 항목 수정·반영 확인 |
| TC-ADM-083 | ADMIN | MCP 관리 | MCP 운영 | 삭제 | 미실행 | MCP 관리 · MCP 운영 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-084 | ADMIN | MCP 관리 | MCP 운영 | 저장 | 미실행 | MCP 관리 · MCP 운영 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-085 | ADMIN | MLOps | ML 모델 관리 | 조회 | 미실행 | MLOps · ML 모델 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-086 | ADMIN | MLOps | 컴퓨팅 풀 관리 | 조회 | 미실행 | MLOps · 컴퓨팅 풀 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-087 | ADMIN | AI 거버넌스 | AI 위험도 평가 | 조회 | PASS | AI 거버넌스 · AI 위험도 평가 — 조회·목록 렌더 정상 확인 |
| TC-ADM-088 | ADMIN | AI 거버넌스 | AI 위험도 평가 | 생성 | 미실행 | AI 거버넌스 · AI 위험도 평가 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-089 | ADMIN | AI 거버넌스 | AI 위험도 평가 | 수정 | 미실행 | AI 거버넌스 · AI 위험도 평가 — 기존 항목 수정·반영 확인 |
| TC-ADM-090 | ADMIN | AI 거버넌스 | AI 위험도 평가 | 삭제 | 미실행 | AI 거버넌스 · AI 위험도 평가 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-091 | ADMIN | AI 거버넌스 | AI 위험도 평가 | 저장 | 미실행 | AI 거버넌스 · AI 위험도 평가 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-092 | ADMIN | AI 거버넌스 | 점검 이력 관리 | 조회 | 미실행 | AI 거버넌스 · 점검 이력 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-093 | ADMIN | AI 거버넌스 | 점검 이력 관리 | 생성 | 미실행 | AI 거버넌스 · 점검 이력 관리 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-094 | ADMIN | AI 거버넌스 | 점검 이력 관리 | 수정 | 미실행 | AI 거버넌스 · 점검 이력 관리 — 기존 항목 수정·반영 확인 |
| TC-ADM-095 | ADMIN | AI 거버넌스 | 점검 이력 관리 | 삭제 | 미실행 | AI 거버넌스 · 점검 이력 관리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-096 | ADMIN | AI 거버넌스 | 점검 이력 관리 | 저장 | 미실행 | AI 거버넌스 · 점검 이력 관리 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-097 | ADMIN | AI 거버넌스 | 통제 정책 관리 | 조회 | PASS | AI 거버넌스 · 통제 정책 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-098 | ADMIN | AI 거버넌스 | 통제 정책 관리 | 생성 | 미실행 | AI 거버넌스 · 통제 정책 관리 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-099 | ADMIN | AI 거버넌스 | 통제 정책 관리 | 수정 | 미실행 | AI 거버넌스 · 통제 정책 관리 — 기존 항목 수정·반영 확인 |
| TC-ADM-100 | ADMIN | AI 거버넌스 | 통제 정책 관리 | 삭제 | 미실행 | AI 거버넌스 · 통제 정책 관리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-101 | ADMIN | AI 거버넌스 | 통제 정책 관리 | 저장 | 미실행 | AI 거버넌스 · 통제 정책 관리 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-102 | ADMIN | AI 거버넌스 | 통제 정책 관리 | 전환 | 미실행 | AI 거버넌스 · 통제 정책 관리 — 활성/비활성 토글 즉시 반영 확인 |
| TC-ADM-103 | ADMIN | AI 거버넌스 | 서비스 변경 이력 | 생성 | 미실행 | AI 거버넌스 · 서비스 변경 이력 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-104 | ADMIN | AI 거버넌스 | 서비스 변경 이력 | 수정 | 미실행 | AI 거버넌스 · 서비스 변경 이력 — 기존 항목 수정·반영 확인 |
| TC-ADM-105 | ADMIN | AI 거버넌스 | 서비스 변경 이력 | 삭제 | 미실행 | AI 거버넌스 · 서비스 변경 이력 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-106 | ADMIN | AI 거버넌스 | 서비스 변경 이력 | 저장 | 미실행 | AI 거버넌스 · 서비스 변경 이력 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-107 | ADMIN | AI 거버넌스 | 서비스 변경 이력 | 검토 | 미실행 | AI 거버넌스 · 서비스 변경 이력 — 검토 흐름 확인 |
| TC-ADM-108 | ADMIN | AI 거버넌스 | 서비스 변경 이력 | 감사 | 미실행 | AI 거버넌스 · 서비스 변경 이력 — 감사 이력 확인 |
| TC-ADM-109 | ADMIN | 서비스 운영 | 공지 게시판 | 조회 | PASS | 서비스 운영 · 공지 게시판 — 조회·목록 렌더 정상 확인 |
| TC-ADM-110 | ADMIN | 서비스 운영 | 공지 게시판 | 생성 | 미실행 | 서비스 운영 · 공지 게시판 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-111 | ADMIN | 서비스 운영 | 공지 게시판 | 수정 | 미실행 | 서비스 운영 · 공지 게시판 — 기존 항목 수정·반영 확인 |
| TC-ADM-112 | ADMIN | 서비스 운영 | 공지 게시판 | 삭제 | 미실행 | 서비스 운영 · 공지 게시판 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-113 | ADMIN | 서비스 운영 | 공지 게시판 | 저장 | 미실행 | 서비스 운영 · 공지 게시판 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-114 | ADMIN | 서비스 운영 | 자주 묻는 질문 | 조회 | 미실행 | 서비스 운영 · 자주 묻는 질문 — 조회·목록 렌더 정상 확인 |
| TC-ADM-115 | ADMIN | 서비스 운영 | 자주 묻는 질문 | 생성 | 미실행 | 서비스 운영 · 자주 묻는 질문 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-116 | ADMIN | 서비스 운영 | 자주 묻는 질문 | 수정 | 미실행 | 서비스 운영 · 자주 묻는 질문 — 기존 항목 수정·반영 확인 |
| TC-ADM-117 | ADMIN | 서비스 운영 | 자주 묻는 질문 | 삭제 | 미실행 | 서비스 운영 · 자주 묻는 질문 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-118 | ADMIN | 서비스 운영 | 자주 묻는 질문 | 저장 | 미실행 | 서비스 운영 · 자주 묻는 질문 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-119 | ADMIN | 서비스 운영 | 1:1 관리자 문의 | 조회 | 미실행 | 서비스 운영 · 1:1 관리자 문의 — 조회·목록 렌더 정상 확인 |
| TC-ADM-120 | ADMIN | 서비스 운영 | 1:1 관리자 문의 | 생성 | 미실행 | 서비스 운영 · 1:1 관리자 문의 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-121 | ADMIN | 서비스 운영 | 1:1 관리자 문의 | 수정 | 미실행 | 서비스 운영 · 1:1 관리자 문의 — 기존 항목 수정·반영 확인 |
| TC-ADM-122 | ADMIN | 서비스 운영 | 1:1 관리자 문의 | 삭제 | 미실행 | 서비스 운영 · 1:1 관리자 문의 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-123 | ADMIN | 서비스 운영 | 1:1 관리자 문의 | 저장 | 미실행 | 서비스 운영 · 1:1 관리자 문의 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-124 | ADMIN | 지식 운영 | 컬렉션 관리 | 조회 | 미실행 | 지식 운영 · 컬렉션 관리 — 조회·목록 렌더 정상 확인 |
| TC-ADM-125 | ADMIN | 지식 운영 | 컬렉션 관리 | 생성 | 미실행 | 지식 운영 · 컬렉션 관리 — 신규 생성 흐름 정상 동작 확인 |
| TC-ADM-126 | ADMIN | 지식 운영 | 컬렉션 관리 | 수정 | 미실행 | 지식 운영 · 컬렉션 관리 — 기존 항목 수정·반영 확인 |
| TC-ADM-127 | ADMIN | 지식 운영 | 컬렉션 관리 | 삭제 | 미실행 | 지식 운영 · 컬렉션 관리 — 삭제 동작·복구불가 처리 확인 |
| TC-ADM-128 | ADMIN | 지식 운영 | 컬렉션 관리 | 저장 | 미실행 | 지식 운영 · 컬렉션 관리 — 변경사항 서버 저장 반영 확인 |
| TC-ADM-129 | ADMIN | 지식 운영 | 컬렉션 관리 | 업로드/다운로드 | 미실행 | 지식 운영 · 컬렉션 관리 — 파일 업로드/다운로드 정상 동작 확인 |