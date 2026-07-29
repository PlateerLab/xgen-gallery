# XGEN QA 러너 (경로 A — CI 파이프라인형)

정적 콘솔이 직접 XGEN을 조종할 수 없으므로(브라우저 크로스오리진 제약), 실제 검증은
브라우저 밖에서 도는 **러너(Playwright)**가 수행한다. 이 폴더가 그 러너 + CI 설정이다.

## 흐름
```
CI(스케줄/수동) → qa-runner.mjs 가 실제 XGEN 로그인·메뉴 검증
   → frontend/public/qa-console/{results.json, shots/*.png} 생성·커밋
   → go244 배포 갱신 → 콘솔(labs.plateer.com/qa-console/index.html)이 최신 실결과 표시
```

## 실행 방법
- **자동(스케줄)**: 매일 06:00 KST — `.github/workflows/qa-smoke.yml`
- **수동(온디맨드)**: GitHub → Actions → **QA Smoke** → **Run workflow** (env 선택) ← "버튼 누르면 실행"
- **로컬**: `cd qa && npm i && npx playwright install chromium`
  그다음 `QA_ENV=dev QA_EMAIL=... QA_PASS=... node qa-runner.mjs`

## 사전 준비 (1회)
리포 **Settings → Secrets and variables → Actions** 에 등록:
- `QA_EMAIL` = 시스템 관리자 계정 (예: x2bee_ds@plateer.com)
- `QA_PASS` = 해당 비밀번호

## 안전 규칙
- 현재 케이스는 **읽기 스모크(조회)** 뿐 — 비파괴.
- 쓰기(생성/저장/삭제)로 확장할 땐 **stg·전용 테스트 계정·격리 데이터**에서만. 운영(prod)은 읽기 스모크만.
- 자격증명은 코드에 두지 말 것 — 반드시 Secret 사용.

## 케이스 확장
`qa-runner.mjs` 의 `CASES` 배열에 `[id, persona, scope, category, menu]` 를 추가.
콘솔은 `results.json` 을 그대로 렌더하므로 필터·매트릭스·캡처에 자동 반영된다.

## 내부망 전용 XGEN인 경우
GitHub 호스팅 러너가 dev/stg에 접근 못 하면 → `qa/.gitlab-ci.yml` 로 내부 GitLab
(gitlab.x2bee.com) 러너에서 실행하거나, GitHub self-hosted 러너를 내부망에 둔다.

## 다음 단계 (완전 온디맨드)
콘솔 [실행] 버튼 → CI 트리거까지 자동화하려면: 갤러리(Next.js)에 API 라우트를 추가해
GitHub `workflow_dispatch`(또는 GitLab trigger)를 서버측에서 호출(토큰 보관). 브라우저에서
직접 호출은 CORS/토큰 노출 때문에 지양.
