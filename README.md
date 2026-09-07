# xgen-gallery

PlateerLab 오픈소스 라이브러리 18종을 브라우저에서 직접 체험할 수 있는 playground입니다. Next.js 기반 갤러리 프론트엔드와 FastAPI 백엔드, 그리고 synaptic-memory MCP 서버가 Docker Compose로 묶여 있습니다.

## 포함된 도구

목록의 단일 출처는 `frontend/src/lib/tools.ts` 의 `TOOLS` 이고, 사이트에 노출되는 개수 문구는
전부 `TOOLS.length` 에서 파생된다. 항목을 늘렸다면 아래 표와 위 문장의 숫자도 함께 맞춘다
(자세한 절차는 `docs/LIBRARY-GALLERY.md`).

| 도구 | 카테고리 | 설명 |
|---|---|---|
| Contextifier | ingestion | 80+ 포맷의 문서를 AI 친화 텍스트로 변환 |
| Doc2Chunk | ingestion | RAG용 컨텍스트 인식 청킹 |
| f2a | ingestion | 파일 하나로 통계 + HTML 리포트 생성 |
| Document Adapter | ingestion | LLM이 DOCX·PPTX·HWPX를 직접 열고 고쳐 다시 쓰는 편집 어댑터 |
| Edit2Docs | ingestion | 한 줄 의도로 진짜 편집 가능한 DOCX·XLSX·PPTX 생성 |
| Knowtology | knowledge | TreeRAG 기반 계층형 지식 맵 |
| **Synaptic Memory** | knowledge | 자동 온톨로지 + 헤비안 학습 + 4단계 기억 통합 지식 그래프 |
| OmniFuse | knowledge | 벡터와 그래프를 한 번에 융합하는 backend-agnostic GraphRAG |
| XGen Agent Memory | knowledge | 시맨틱·BM25·타입 엣지 그래프 탐색을 SQLite 한 파일로 융합 |
| **XGen Ontology** | knowledge | 문서·표를 정제된 지식 그래프로 만들고 one-shot GraphRAG로 검색 |
| Googer | agent | 타입 안전 구글 검색 (web/images/news/videos) |
| Toolint | agent | 에이전트 툴 패키지 전용 AST 정적 분석기 |
| XGEN Harness | agent | 검증·재시도·종료를 모델 바깥에서 소유하는 10단계 실행 하네스 |
| playwLeft | agent | 에이전트용 고성능 브라우저 자동화 |
| XGen Agent Runtime | agent | 21단계 매니페스트 구동 에이전트 파이프라인 |
| AN-Web | agent | 웹을 픽셀이 아니라 실행 가능한 상태 기계로 다루는 헤드리스 엔진 |
| XGen SDK | utility | DB 풀링·설정·스토리지·ABAC 인가·쿼터를 묶은 백엔드 툴킷 |
| **XGen Gallery** | utility | GitHub 조직을 검색·필터 가능한 저장소 갤러리로 만드는 React 컴포넌트 |

## 아키텍처

```
browser  ──►  frontend (Next.js, :3100)
                  │
                  ▼
             backend (FastAPI, :8800)
                  │
        ┌─────────┼──────────────┐
        ▼         ▼              ▼
  demo routers   MCP bridge   OpenAI-compatible LLM
  (직접 호출)   (synaptic-    (Qwen3.5 / GPT / 등)
                memory 등)         +
                              embeddings endpoint
                              (Qwen3-Embedding / text-embedding-3-small)
```

- **frontend**: Next.js App Router. `/tool/[id]`는 일반 툴 데모, `/tool/synaptic-memory`는 그래프 뷰어 + RAG 전용 UI.
- **backend**: FastAPI. `/api/demo/*`는 라이브러리 직접 호출, `/api/mcp/*`는 synaptic-memory 같은 MCP 서버 subprocess bridge, `/api/demo/synaptic-memory/ask`는 knowledge_search → LLM 체인의 고수준 RAG 엔드포인트.
- **LLM/Embedding**: OpenAI 호환 엔드포인트라면 무엇이든 연결 가능 (OpenAI API, vLLM, TGI, 로컬 서버 등). 환경변수로 스위칭.

## 빠른 시작 (Docker Compose)

```bash
git clone https://github.com/PlateerLab/xgen-gallery.git
cd xgen-gallery
cp .env.example .env   # 값 채우기
docker compose up -d --build
```

- Frontend: http://localhost:3100
- Backend:  http://localhost:8800/docs (Swagger UI)
- Health:   http://localhost:8800/health

## 환경 변수 (`.env`)

```env
# ── LLM (OpenAI 호환 chat/completions) ──────────────
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
LLM_API_KEY=sk-...                 # vLLM 등 무인증 엔드포인트면 비워 두기

# ── Synaptic Memory 임베딩 (OpenAI 호환 /embeddings) ─
SYNAPTIC_EMBED_URL=https://api.openai.com/v1
SYNAPTIC_EMBED_MODEL=text-embedding-3-small

# ── 레거시 경로 호환 ────────────────────────────────
OPENAI_API_KEY=                    # /openai-proxy/v1/* 경로가 사용
```

### vLLM 로컬 엔드포인트 연결 예시

사내에서 vLLM으로 Qwen 계열을 서빙하는 경우:

```env
LLM_BASE_URL=http://your-vllm-host:8024/v1
LLM_MODEL=Qwen3.5-27b
LLM_API_KEY=

SYNAPTIC_EMBED_URL=http://your-vllm-host:8081/v1
SYNAPTIC_EMBED_MODEL=Qwen/Qwen3-Embedding-8B
```

> `SYNAPTIC_EMBED_URL`은 **base URL**만 넣습니다. synaptic-memory 내부에서 `/embeddings`를 자동으로 붙입니다.

## Synaptic Memory 데모 흐름

1. **문서 업로드** → `knowledge_add_document` MCP 호출 → 청크 + 임베딩 저장
2. **그래프 자동 구축** → 노드/엣지 뷰 실시간 시각화
3. **질문** → `/api/demo/synaptic-memory/ask`
   - FTS + 임베딩 하이브리드로 retrieval
   - 컨텍스트를 프롬프트에 주입, LLM이 출처 `[n]` 인용과 함께 응답

## 개발 (로컬)

Docker 없이 각 레이어를 직접 실행하고 싶을 때:

```bash
# backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# frontend (다른 터미널)
cd frontend
npm install
NEXT_PUBLIC_GALLERY_API_URL=http://localhost:8000 npm run dev
```

## 디렉터리 구조

```
xgen-gallery/
├── frontend/          # Next.js 15 App Router
│   └── src/
│       ├── app/       # 라우트 (/, /tool/[id], /tool/synaptic-memory)
│       ├── components/
│       └── lib/
├── backend/           # FastAPI + MCP bridge
│   ├── main.py
│   ├── mcp_bridge.py
│   ├── mcp_servers.py
│   └── routers/       # 라이브러리별 demo 라우터
├── docker-compose.yml
└── .env
```

## 라이선스
MIT © PlateerLab
