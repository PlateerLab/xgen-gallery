# 라이브러리 갤러리 — 신규 라이브러리가 들어올 때

주간 자동 점검이 PlateerLab 오픈소스 저장소를 훑어 새 라이브러리를 발견하면
`frontend/src/lib/tools.ts` 의 `TOOLS` 배열 끝에 항목을 추가한다. 이 문서는 그 뒤에
무엇이 자동으로 따라오고 무엇이 사람 손을 기다리는지를 정리한다.

## 항목만 추가하면 자동으로 생기는 것

`TOOLS` 에 항목이 있으면 아래는 별도 작업 없이 만들어진다.

- `/tool/<id>` · `/en/tool/<id>` 데모 페이지 — 라우트가 `TOOLS` 에서 정적 생성된다
- 라이브러리 카드의 **데모 열기** 버튼 — 더 이상 `hasDemo` 플래그를 보지 않는다
- 동작하는 데모 — 전용 매니페스트가 없으면 `lib/demo-fallback.ts` 가 카테고리별
  표준 입출력 형태로 하나 만들어 준다(국문·영문 모두)
- 갤러리 키비주얼 첫 슬라이드 — 배열 끝(또는 `addedAt` 최신)이 자동으로 올라간다

즉 **새 라이브러리가 데모 없이 나가는 구간은 없다.** 예전에는 매니페스트를 손으로
넣기 전까지 "데모 준비중" 안내만 떴고 카드 버튼도 꺼져 있었다.

`hasDemo` 필드는 `@deprecated` 다. 남아 있어도 무해하지만 아무 것도 좌우하지 않는다.

## 사람이 채워야 하는 것 — 전용 데모

자동 폴백은 "이 분류의 라이브러리는 통상 이런 모양으로 응답한다"까지만 보여준다.
그 라이브러리의 실제 쓰임새를 보여주려면 전용 매니페스트를 쓴다.

대기열은 이 명령으로 확인한다.

```bash
cd frontend && npm run demo:coverage
```

전용 데모로 올리는 순서는 아래와 같다.

1. `src/lib/demo-manifests.ts` 에 매니페스트를 추가하고 `LOCAL_DEMO_MANIFESTS` 에
   **저장소 이름 그대로**(`tool.repo`) 등록한다. 키가 틀리면 폴백이 계속 뜬다.
2. 한국어 문구를 썼다면 `src/lib/demo-i18n.ts` 의 `DICT` 에 영문을 함께 넣는다.
   `mockOutput` 안의 문자열까지 전부 번역 대상이다(깊이 순회).
3. 확인: `npx tsc --noEmit`, `/tool/<id>` 와 `/en/tool/<id>` 200,
   영문 페이지에 한글 잔여 0건(언어 토글 문구는 예외).

### 데모 소재를 고르는 기준

- 백엔드가 없으므로 **결정적으로 재현되는 지점**을 고른다. DB·네트워크·모델 호출에
  결과가 좌우되면 샘플로 만들 수 없다.
- 그 라이브러리의 **특징이 드러나는 경계**를 보여준다. 잘 도는 예시 하나보다,
  갈리는 지점 두셋이 낫다(예: 와일드카드 허용 · 권한 없음 · superuser 우회).
- 샘플은 2~3개. 각 샘플의 `inputs` 와 `mockOutput` 은 반드시 서로 말이 맞아야 한다 —
  데모 실행기는 지금 고른 샘플의 `mockOutput` 을 그대로 보여준다.

## 배지 규칙

카드의 **라이브 데모** 배지와 홈의 **Live** 배지는 전용 매니페스트가 있을 때만 붙는다
(`hasCuratedDemo`). 폴백 데모는 버튼만 생기고 배지는 붙지 않는다 — 표준 형태일 뿐인
화면을 큐레이션된 데모처럼 보이게 하지 않기 위해서다.

## 관련 파일

| 파일 | 역할 |
|---|---|
| `frontend/src/lib/tools.ts` | 라이브러리 목록(주간 자동 점검이 여기에 추가) |
| `frontend/src/lib/demo-manifests.ts` | 전용 매니페스트 + `demoManifestFor` · `hasCuratedDemo` |
| `frontend/src/lib/demo-fallback.ts` | 자동 폴백 데모 생성 |
| `frontend/src/lib/demo-i18n.ts` | 매니페스트 문구 영문화 사전 |
| `frontend/src/components/tool-demo-client.tsx` | 데모 실행기 |
| `frontend/scripts/demo-coverage.mjs` | 폴백으로 나가는 라이브러리 점검 |

## 개수 문구 — `TOOLS.length` 단일 출처

사이트에 노출되는 "오픈소스 라이브러리 N종" 류의 숫자는 **전부 `TOOLS.length` 에서
파생**시킨다. 숫자를 문자열로 박아 두면 `TOOLS` 에 항목이 늘어난 뒤에도 옛 숫자가
남아 제품 페이지만 뒤처진다(실제로 제품 페이지 통계 밴드가 `11` 로 굳어 있었다).

`TOOLS` 에 항목을 추가·삭제한 뒤에는 아래로 잔여 하드코딩을 확인한다.

```bash
cd frontend && grep -rnE "라이브러리 [0-9]+|[0-9]+종|[0-9]+ (open-source )?librar" src
```

숫자가 걸리면 그 자리를 `TOOLS.length`(문자열 자리면 `String(TOOLS.length)`)로 바꾼다.
국문·영문 카피가 분리된 페이지는 **양쪽 다** 고쳐야 한다 — 영문 카피 파일이 따로
있으면 국문만 고치고 지나치기 쉽다.

### 개수를 노출하는 자리

| 파일 | 자리 |
|---|---|
| `frontend/src/components/hero.tsx` | 홈 히어로 배지·설명 |
| `frontend/src/components/home-open-source.tsx` | 홈 오픈소스 섹션 통계·CTA |
| `frontend/src/components/tool-grid.tsx` | 갤러리 섹션 제목 |
| `frontend/src/components/pages/documentation-page.tsx` | 문서 페이지 라이브러리 카운트 |
| `frontend/src/components/pages/product-page.tsx` | 제품 페이지 통계 밴드(`STATS`) — 국문 |
| `frontend/src/components/pages/product-copy-en.ts` | 제품 페이지 통계 밴드(`stats`) — 영문 |
