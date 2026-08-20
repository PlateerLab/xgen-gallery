# 블로그 운영 방식 — 기고부터 발행까지

Plateer AI Labs Insight 블로그는 **DB 없이 git 저장소의 마크다운 파일**로 운영됩니다.
글 1개는 `frontend/content/blog/<slug>.md` 파일 1개이고, `main`에 머지되면 자동 배포됩니다.
개발자는 각자 **자기 GitHub 계정**으로 글을 올리고, 편집자가 **리뷰·머지**하면 발행됩니다.

## 한눈에 보는 흐름

```
/admin 로그인(GitHub) → 작성
  → 저장: 본인 fork 브랜치에 PR(In Review)로 보관 — main 직접 수정 안 함
  → 편집자(sooanc) 리뷰 → 머지 → 발행
```

- **초안(`draft: true`)은 운영에 노출되지 않습니다** — 검토 중인 글이 사이트에 새지 않도록 숨깁니다.
- 발행에는 재빌드가 필요합니다(수십 초~1분).

## 왜 브랜치(PR) 방식인가

메인 저장소에 write 권한이 없어도 누구나 안전하게 기고할 수 있도록, **Open Authoring** 방식을 씁니다.
Decap CMS가 기고자의 계정으로 저장소를 fork하고, 그 fork의 브랜치에서 **Pull Request**를 열어줍니다.
따라서 기고자는 `main`을 직접 건드리지 않고, 편집자는 PR 단위로 안전하게 검토·머지합니다.

## 기고자(개발자) 관점

1. **https://labs.plateer.com/admin** 접속 → **Login with GitHub** → 본인 계정으로 로그인
2. **글쓰기** → 제목·설명·카테고리·태그·본문 작성
3. **저장** → 본인 fork 브랜치에 **PR(In Review)** 로 보관됩니다(초안은 fork에 안전하게 남습니다)
4. 편집자 리뷰 후 머지 → 발행

> 글을 쓰기 전에 [블로그 글쓰기 가이드](blog-writing.html)와 [GEO·SEO 가이드](geo-seo.html)를 먼저 읽어주세요. 자세한 기고 방법은 [기여 가이드](contributing.html)에 있습니다.

## 편집자(운영자) 관점

기고글은 **GitHub Pull Requests**에 도착합니다 — **Decap의 Workflow 보드에는 뜨지 않습니다**.
Open Authoring은 기고자의 **fork 브랜치**에서 PR을 열기 때문에, 베이스 저장소의 `cms/*` 브랜치만 추적하는
Decap 편집자 보드에는 나타나지 않습니다. 이는 정상 동작이며, 편집자는 GitHub PR로 검토합니다.

1. **Pull requests** 탭에서 대기 중인 기고글 확인
   → https://github.com/PlateerLab/xgen-gallery/pulls
2. **Files changed**에서 `frontend/content/blog/<slug>.md` 본문·톤·GEO 체크
3. **Merge** → `main` 반영 → CI 재빌드 → 발행

> **중요**: 기고글은 대개 `draft: true`(검토 중) 상태로 들어옵니다.
> 머지만 해서는 운영에 노출되지 않으므로, 실제로 공개하려면 **`draft: false`로 변경**해야 합니다.

## 상태값 요약

| 항목 | 의미 |
|------|------|
| `draft: true` | 검토 중 — 운영 사이트에서 숨김 |
| `draft: false` | 발행 — 머지 후 운영에 노출 |
| In Review(PR) | 기고자 fork에서 열린 검토 대기 PR |
| Merged | `main` 반영 완료 — 재빌드 후 배포 |

## 리뷰 기준

리뷰는 게이트가 아니라 품질 보조입니다. 리뷰어는 [글쓰기 가이드](blog-writing.html)의 B2B 톤과
[GEO·SEO 가이드](geo-seo.html)의 체크리스트를 기준으로 봅니다.
멤버 개인 글은 코퍼릿 톤으로 정규화하지 않고 작성자 목소리를 유지합니다.

## 노출·큐레이션 규칙

발행된 글이 `/blog`에서 어떻게 배치되는지에 대한 운영 규칙입니다. 아래 규칙은 코드로
자동 적용되므로, 편집자는 프론트매터(카테고리·작성자·`featured`)와 슬러그만 맞추면 됩니다.

### 1) 상단 키비주얼(캐러셀) 선정

키비주얼은 **카테고리마다 최신 1편**을 올리되, **Tech Note는 작성자가 서로 다른 최신 2편**을
뽑습니다. 즉 `제품 소식 1 + Case Study 1 + Tech Note 2(다른 작성자)`로 최대 4편이 최신순으로
노출됩니다. 같은 작성자가 Tech Note를 연달아 쓴 경우, 두 번째 자리는 다음으로 최신인
**다른 작성자**의 글로 채워집니다.

- 특정 글을 강제로 올리려면 프론트매터에 **`featured: true`** 를 지정합니다. `featured` 글이
  하나라도 있으면 자동 큐레이션 대신 `featured` 글들이 최신순으로 키비주얼에 노출됩니다(수동 override).
- 구현: [`frontend/src/app/blog/page.tsx`](../frontend/src/app/blog/page.tsx)의 `pickHeroPosts()`.

### 2) 아티클 시리즈 — 말머리와 제목 시퀀스

연재물은 **슬러그 패턴**으로 묶습니다(프론트매터 불필요, 후속편 자동 편입). 시리즈로 묶이면
`/blog`의 "아티클 시리즈" 섹션과 **인기 있는 글** 목록에 자동으로 **말머리 `[라벨]`**(예: `[GS인증]`)이
붙습니다. 시리즈 노출 순서는 `SERIES` 배열 순서를 따릅니다(맨 앞이 먼저 노출).

- **시리즈 등록**: [`frontend/src/lib/series.ts`](../frontend/src/lib/series.ts)의 `SERIES`에
  `{ key, title, label, subtitle, description, cover, match, order }`를 추가합니다.
  `match`는 슬러그 접두사(예: `/^gs-cert-journey-/`), `order`는 편 번호 추출 정규식입니다.
- **시리즈 커버**: `frontend/public/blog/series-<key>.svg` (1200×900 세로형, 다크 배경).
- **제목 끝 시퀀스**: 시리즈 글 제목 끝에는 **`(N편)`** 을 공백 없이 붙입니다
  (예: `…결함의 정의를 다시 배웠습니다(1편)`). 이 표기는 제목 프론트매터에 직접 넣으며,
  피드·인기글·시리즈 목록 어디에서나 함께 노출됩니다.
- 각 편 하단에는 이전/다음 편 링크를 답니다(작성자가 본문에 직접 관리).
