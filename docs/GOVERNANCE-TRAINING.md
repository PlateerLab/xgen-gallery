# AI 거버넌스 교육 운영

## 경로와 관리자 권한

- `/admin` 사이드바: 거버넌스 퀴즈 관리, 거버넌스 결과 통계
- `/admin/governance`: 구성원 선택, 개인 링크 발급·재발급·회수, 응답 상세
- `/admin/governance#statistics`: 참여율, 제출자 평균, 점수 분포, 문항별 정답률, 개인별 결과 및 CSV
- `/training/governance#<개인 토큰>`: 교육 자료, 개인 퀴즈, 임시 저장, 제출·해설

관리자는 기존 GitHub OAuth 앱으로 별도 교육 세션을 생성한다. GitHub 저장소 `PlateerLab/xgen-gallery` 쓰기 권한을 백엔드에서 매 요청 확인한다. 공개 저장소 열람 권한이나 블로그 Open Authoring 로그인만으로 결과를 열람할 수 없다. `GOVERNANCE_ADMIN_REPO`로 대상 저장소를 바꿀 수 있다.

OAuth state는 HttpOnly 쿠키와 상수 시간 비교로 검증한다. 관리자 토큰은 자바스크립트에서 읽을 수 없는 Secure/HttpOnly/SameSite=Lax 쿠키로 8시간 유지한다. 관리자 API는 동일 출처 요청만 변경을 허용한다. 로그아웃은 해당 세션 쿠키를 삭제한다.

## 배정과 응시

`frontend/src/lib/lab-members.ts`의 구성원 명단을 재사용한다. 관리자가 선택한 사람에게 공통 12문항을 배정하되 문항·보기 순서를 개인별로 섞고 문제은행 스냅샷과 순서를 DB에 고정한다. 같은 교육 버전과 구성원의 중복 배정은 생성하지 않는다.

개인 링크는 별도 로그인 없는 **링크 소지자 방식**이다. 전달받은 사람이 실제 본인인지 인증하는 기능은 아니므로 해당 구성원에게만 전달한다. 32바이트 난수 토큰은 fragment에 두어 URL 접근 로그·Referer에서 제외하고 API Authorization 헤더로만 전송한다. DB에는 토큰 해시만 저장한다. 발급 화면에서 링크를 복사하거나 CSV를 저장한다. 분실한 원본 링크는 재조회할 수 없으며 재발급한다. 링크 재발급 시 기존 링크는 폐기되고 기존 응답·제출 결과는 그대로 유지된다.

최초 발급 유효기간은 기본 30일, 화면에서 1–90일로 정한다. 재발급은 30일이다. 회수하면 즉시 응시·자료 접근을 차단한다. 만료된 링크도 동일하게 차단한다. 링크 만료는 응답 기록 삭제를 뜻하지 않는다.

수동 임시 저장으로 같은 링크에서 이어서 푼다. 저장하지 않은 변경은 페이지 이탈 시 브라우저에서 확인한다. 최종 제출은 12문항 전부에 유효한 답을 선택해야 가능하다. 서버에서 채점하며 최초 제출은 변경할 수 없다. 중복·동시 제출과 늦게 도착한 임시 저장은 최초 제출 결과를 반환한다. 합격선이나 합격·불합격 판정은 임의로 설정하지 않는다.

## 자료와 출제 근거

- `/data/governance-content/questions.json`: 12문항, 정답, 해설, PPTX 슬라이드 번호
- `/data/governance-content/governance-training.mp4`: 제공된 14분 21초 무음 영상
- `/data/governance-content/governance-training.pptx`: 제공된 슬라이드 23장

영상의 23개 슬라이드 구간을 표본 프레임으로 확인했다. 영상에는 오디오 스트림이 없고 제공 PPTX의 내용을 화면으로 전개한다. 교육 자료와 정답지는 공개 Git 저장소나 public 디렉토리에 두지 않으며 유효한 개인 토큰을 확인한 후 내려준다. 제출 전 API 응답에는 정답·해설·출제 근거를 싣지 않는다.

문항 내용이나 채점 기준을 변경할 때는 문제은행 `version`을 올린다. 기존 배정에는 저장된 스냅샷으로 채점하며 현재 관리자 화면은 현재 문제은행 버전의 회차를 표시한다. 이전 회차 기록은 DB에 유지된다.

## 통계 기준

- 완료율: 제출한 사람 / 해당 회차에 배정된 사람. 만료·회수된 배정도 분모에 포함.
- 평균: 제출자의 점수만 포함. 점수는 정답 수 / 문항 수 × 100, 소수점 한 자리.
- 문항 정답률: 해당 문항의 정답 응답 / 제출 응답. 미응시·임시 저장 제외.
- 링크 회수 후에도 이미 제출한 기록은 집계에 포함. 링크 상태와 완료 인원은 별개의 지표.
- 응답이 없으면 평균·정답률은 `집계 없음`, 인원은 0.
- 화면 시각은 Asia/Seoul, DB는 UTC.

## 저장과 배포

기존 FastAPI 백엔드와 `/gallery-api` 구조를 재사용하되 새 화면은 Next 서버의 `/api/governance/*`에서 중계한다. 백엔드 직접 접근에도 관리자 GitHub 권한 또는 개인 토큰을 검사한다.

운영 `docker-compose.yml`은 `GOVERNANCE_DB=/data/governance.db`로 기존 `views_data` 영구 볼륨에 저장한다. 컨테이너 재배포로 기록이 사라지지 않는다. SQLite 트랜잭션과 unique 제약으로 중복 배정·채점을 막는다. 기본 로컬 경로는 `/tmp/governance.db`이므로 로컬 기록도 보존하려면 `GOVERNANCE_DB`를 별도 경로로 설정한다.

기존 `GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`을 그대로 사용하며 새 시크릿은 필요 없다. 운영 origin은 기본 `https://labs.plateer.com`이다. 다른 도메인에서 운영한다면 `OAUTH_REDIRECT_ORIGIN`과 GitHub OAuth 앱의 callback 설정을 함께 맞춘다.

SQLite 백업은 실행 중 DB 파일 복사 대신 Python sqlite3의 `Connection.backup()`을 사용한다. 백업 파일에는 교육 개인정보가 포함되므로 운영 권한 범위에서 관리한다. 데이터 보유·삭제 기한은 조직 교육 기록 정책에 따라 정해야 하며 임의 자동 삭제는 추가하지 않았다.

## 검증

```bash
PYTHONPATH=backend python3 -m pytest backend/tests/test_governance.py -q
cd frontend
npm run build
```

백엔드 테스트는 임시 DB를 사용한다. 관리자 권한, 정답 비노출, 중복 배정·동시 제출, 임시 저장, 회수·만료·재발급, 자료 접근과 통계를 검증한다. 프론트엔드는 데스크톱 및 900/620/390px에서 발급→임시 저장→재접속→최종 제출→통계 경로를 검증했다. 프로젝트 전체 타입 검사에는 기존 `newsletter.ts` 타입 오류가 있으며, 거버넌스 관련 파일은 별도 범위 타입 검사로 검증한다.

## 교육 자료 등록 API

관리자 세션에서 `PUT /api/governance/admin/content/questions`로 문제은행 JSON을 등록하고, `PUT /api/governance/admin/content/video`와 `/slides`로 MP4/PPTX 원본 바이트를 등록한다(자료별 최대 12MB). 백엔드에 직접 요청할 때는 관리자 GitHub 토큰을 Authorization 헤더에 전달한다. 운영 자료 디렉토리는 DB와 같은 영구 볼륨의 `governance-content/`이며 `GOVERNANCE_CONTENT_DIR`로 바꿀 수 있다. 이미 배정한 버전의 문항을 변경하려면 새 버전을 지정해야 한다. 백업 시 DB와 자료 디렉토리를 함께 보존한다.
