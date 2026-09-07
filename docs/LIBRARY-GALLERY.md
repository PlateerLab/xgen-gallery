# 라이브러리 갤러리 — 신규 라이브러리가 들어올 때

주간 자동 점검이 PlateerLab 오픈소스 저장소를 훑어 새 라이브러리를 발견하면
`frontend/src/lib/tools.ts` 의 `TOOLS` 배열 끝에 항목을 추가한다. 이 문서는 그 앞뒤로
**무엇을 라이브러리로 볼지**, 무엇이 자동으로 따라오고, 무엇이 사람 손을 기다리는지를 정리한다.

## 무엇이 「라이브러리」인가

조직 저장소를 그냥 훑으면 제품·서비스·실험이 함께 걸린다. 갤러리에 들어가는 것은
**설치해서 코드에 끌어다 쓰는 배포 패키지**뿐이다. 저장소 설명이 아니라 아래 둘로 가른다.

1. 저장소 루트에 패키징 선언이 있는가 — `pyproject.toml`, `package.json` 등
2. 공개 레지스트리에서 판이 실제로 조회되는가 — PyPI · npm

둘 다 아니면 제품이다. `docker compose up` 으로 뜨는 다중 서비스 스택, 프런트엔드가 딸린
런타임 플랫폼, 제품 CLI는 사이트의 제품·블로그 쪽에 실리지 갤러리에 실리지 않는다.
npm 패키지가 `UNLICENSED` 이거나 저장소·홈페이지 링크가 비어 있으면 다른 패키지의 빌드
산출물이니 거른다.

찾는 자리는 조직 저장소 목록 하나가 아니다. 실제로 조직 밖 개인 계정에 있던 라이브러리가 있었다.

```bash
# 1) 조직 저장소
curl -s "https://api.github.com/orgs/PlateerLab/repos?per_page=100&sort=created&direction=desc"
# 2) PyPI 전체 색인에서 계열 이름 훑기 — 조직 밖 저장소는 여기서만 걸린다
curl -s https://pypi.org/simple/ | grep -oiE '>(xgen[a-z0-9_.-]*)<'
# 3) npm 스코프 — 검색 API는 유사 이름도 섞으므로 응답에서 스코프를 다시 엄격히 거른다
curl -s "https://registry.npmjs.org/-/v1/search?text=%40plateer-xgen&size=250" |
  node -e 'let s=""; process.stdin.on("data",d=>s+=d).on("end",()=>{for(const x of JSON.parse(s).objects||[])if(x.package.name.startsWith("@plateer-xgen/"))console.log(x.package.name)})'
```

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

## 저장소가 조직 밖에 있으면 — `repoUrl`

`repo` 만 적으면 주소는 `https://github.com/PlateerLab/<repo>` 로 조립된다. 조직 밖에 있는
라이브러리는 `repoUrl` 에 전체 주소를 적어야 카드·데모 페이지·구조화 데이터의 링크가 404 로
죽지 않는다. 주소를 만드는 자리는 모두 `lib/tools.ts` 의 `repoUrlFor()` 를 거치므로 그 한 곳만 보면 된다.

죽은 링크는 화면상 멀쩡해 보이니 추가한 뒤 실제로 눌러 확인한다.

```bash
# 빌드한 서버를 띄워 둔 상태에서 — 갤러리에 실제로 찍힌 주소를 그대로 두들긴다
curl -s http://127.0.0.1:3000/library-gallery |
  grep -oE 'https://github\.com/[A-Za-z0-9_-]+/[A-Za-z0-9_.-]+' | sort -u |
  while read -r u; do printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' "$u")" "$u"; done
```

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
   `mockOutput` 안의 문자열까지 전부 번역 대상이다(깊이 순회, 키는 제외).
   **같은 키를 두 번 넣으면 타입 오류**가 나니 넣기 전에 사전에 이미 있는지 본다.
3. 출력에 식별자(RDF IRI, 코드 심볼 등)를 쓸 때는 영문으로 잡는다. 한글 식별자는
   사전으로 번역할 대상이 아니어서 영문 페이지에 그대로 샌다.

### 데모 소재를 고르는 기준

- 백엔드가 없으므로 **결정적으로 재현되는 지점**을 고른다. DB·네트워크·모델 호출에
  결과가 좌우되면 샘플로 만들 수 없다.
- 그 라이브러리의 **특징이 드러나는 경계**를 보여준다. 잘 도는 예시 하나보다,
  갈리는 지점 두셋이 낫다(예: 와일드카드 허용 · 권한 없음 · superuser 우회).
- 샘플은 2~3개. 각 샘플의 `inputs` 와 `mockOutput` 은 반드시 서로 말이 맞아야 한다 —
  데모 실행기는 지금 고른 샘플의 `mockOutput` 을 그대로 보여준다.

### 저장소를 개명하면 데모가 조용히 사라진다

매니페스트 키는 저장소 이름 그대로다. 저장소를 개명하면 npm 레지스트리에 등록된 키와
`tool.repo` 가 어긋나 **큐레이션 데모가 말없이 자동 폴백으로 떨어진다**. 화면은 멀쩡해
보이므로 `npm run demo:coverage` 로만 잡힌다(실제로 `Contextifier` → `xgen-contextifier`
개명 때 이렇게 사라져 있었다).

매니페스트를 이 저장소로 옮겨 적지 말고, 레지스트리 항목을 새 이름으로 다시 건다.

```ts
const contextifier = getDemoManifest("Contextifier");
export const LOCAL_DEMO_MANIFESTS: Record<string, DemoManifest> = {
    ...(contextifier ? { "xgen-contextifier": contextifier } : {}),
    // …
};
```

## 배지 규칙

카드의 **라이브 데모** 배지와 홈의 **Live** 배지는 전용 매니페스트가 있을 때만 붙는다
(`hasCuratedDemo`). 폴백 데모는 버튼만 생기고 배지는 붙지 않는다 — 표준 형태일 뿐인
화면을 큐레이션된 데모처럼 보이게 하지 않기 위해서다.

## 관련 파일

| 파일 | 역할 |
|---|---|
| `frontend/src/lib/tools.ts` | 라이브러리 목록(주간 자동 점검이 여기에 추가) + `repoUrlFor` |
| `frontend/src/lib/demo-manifests.ts` | 전용 매니페스트 + `demoManifestFor` · `hasCuratedDemo` |
| `frontend/src/lib/demo-fallback.ts` | 자동 폴백 데모 생성 |
| `frontend/src/lib/demo-i18n.ts` | 매니페스트 문구 영문화 사전 |
| `frontend/src/components/live-preview.tsx` | 갤러리 키비주얼(`Visual` 의 `switch`, 없으면 `DefaultViz`) |
| `frontend/src/components/tool-demo-client.tsx` | 데모 실행기 |
| `frontend/scripts/demo-coverage.mjs` | 폴백으로 나가는 라이브러리 점검 |

## 개수 문구 — `TOOLS.length` 단일 출처

사이트에 노출되는 "오픈소스 라이브러리 N종" 류의 숫자는 **전부 `TOOLS.length` 에서
파생**시킨다. 숫자를 문자열로 박아 두면 `TOOLS` 에 항목이 늘어난 뒤에도 옛 숫자가
남아 그 페이지만 뒤처진다(실제로 제품 페이지 통계 밴드가 `11` 로, `README.md` 가 `8` 로 굳어 있었다).

`TOOLS` 에 항목을 추가·삭제한 뒤에는 아래로 잔여 하드코딩을 확인한다. **`frontend/src` 만 보지 말 것** —
굳은 숫자는 문서와 블로그 본문에도 남는다.

```bash
grep -rnE "라이브러리 [0-9]+|[0-9]+종|[0-9]+ (open-source )?librar" \
  README.md docs frontend/src frontend/content
```

숫자가 걸리면 그 자리를 `TOOLS.length`(문자열 자리면 `String(TOOLS.length)`)로 바꾼다.
국문·영문 카피가 분리된 페이지는 **양쪽 다** 고쳐야 한다 — 영문 카피 파일이 따로
있으면 국문만 고치고 지나치기 쉽다. 마크다운처럼 파생시킬 수 없는 자리는 손으로 고치되,
그 표 옆에 단일 출처가 어디인지 적어 둔다.

### 개수를 노출하는 자리

| 파일 | 자리 |
|---|---|
| `frontend/src/components/hero.tsx` | 홈 히어로 배지·설명 |
| `frontend/src/components/home-open-source.tsx` | 홈 오픈소스 섹션 통계·CTA |
| `frontend/src/components/tool-grid.tsx` | 갤러리 섹션 제목 |
| `frontend/src/lib/nav.ts` | GNB 카테고리별 개수(`toolCountFor`) |
| `frontend/src/components/pages/documentation-page.tsx` | 문서 페이지 라이브러리 카운트 |
| `frontend/src/components/pages/about-page.tsx` | 회사 소개 통계 — 국문·영문 |
| `frontend/src/components/pages/product-page.tsx` | 제품 페이지 통계 밴드(`STATS`) — 국문 |
| `frontend/src/components/pages/product-copy-en.ts` | 제품 페이지 통계 밴드(`stats`) — 영문 |
| `README.md` | 소개 문장과 도구 표 — 파생 불가, 손으로 맞춘다 |

## 마치기 전 점검

라이브러리를 추가·수정했으면 아래를 전부 통과시킨다. 하나씩이 아니라 **전 라이브러리**를 돌린다 —
공용 코드를 건드리면 새로 넣은 것 말고 다른 데가 깨진다.

```bash
cd frontend
npx tsc --noEmit          # 변경 전과 오류 수가 같아야 한다(기존 오류가 있는 저장소다)
npm run build
npm run demo:coverage     # 큐레이션 N / 전체 N — 폴백으로 나가는 라이브러리 없음
```

빌드한 서버를 띄워 놓고 확인할 것.

| 항목 | 기준 |
|---|---|
| 데모 페이지 | `/tool/<id>` · `/en/tool/<id>` 전부 200 |
| 영문 페이지 한글 잔여 | 전부 0건(언어 토글 문구 `한국어` 는 예외) |
| 저장소 링크 | 카드에 찍힌 주소 전부 GitHub 200 |
| 개수 문구 | 홈·갤러리·제품·문서·소개, 국문·영문 모두 새 숫자 |
