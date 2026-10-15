---
title: "Geny — 에이전트가 일할 환경을 만들다(1편)"
description: "시스템이 도구가 되는 변화와 Geny의 실행 기반, 제품과 실험실의 관계를 살펴봅니다."
date: "2026-10-15"
author: "정우문"
authorGithub: "woomun-jung"
category: "Tech Note"
kicker: "XGEN의 여정 · 1/4"
tags: ["XGEN", "Geny", "Orka", "Plex", "플랫폼 로드맵"]
cover: "/blog/xgen-journey-1-geny.svg"
thumb: "/blog/xgen-journey-1-geny-thumb.svg"
draft: false
---

시스템이 도구가 되는 변화와 Geny의 실행 기반, 제품과 실험실의 관계를 살펴봅니다.

> **읽기 전에** — Geny는 현재 단계입니다. Orka와 Plex는 가칭이며, 이 글에 소개하는 기능과 일정은 개발 목표입니다. ‘자기 개선’은 AI가 임의로 시스템을 바꾼다는 뜻이 아니라, 변경안을 검증하고 승인한 뒤 반영하는 구조를 뜻합니다.

**XGEN의 핵심 엔진** — Xgen·Agentflow·Geny·Orka·Plex는 XGEN에서 각 프로젝트 단계의 중심이 되는 핵심 엔진을 부르는 이름입니다. 전체 흐름은 **Xgen → Agentflow → Geny → Orka → Plex**입니다. 각 단계는 이전 단계의 기반을 유지하면서 새로운 엔진과 기능을 더해 확장하는 관계입니다.

<nav aria-label="시리즈 안내" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>모든 일이 XGEN에서 시작되는 회사를 꿈꾸며</strong><ol><li><a aria-current="page" href="/blog/xgen-journey-1-geny">Geny — 에이전트가 일할 환경을 만들다</a></li><li><a href="/blog/xgen-journey-2-orca">Orka — 고객의 일을 명세로 이해하다</a></li><li><a href="/blog/xgen-journey-3-plex">Plex — 업무와 사람에 맞춰 진화하다</a></li><li><a href="/blog/xgen-journey-4-evolution">자기 개선 — 실행이 쌓여 플랫폼이 되다</a></li></ol></nav>

<nav aria-label="글 목차" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>이 글의 목차</strong><ul><li><a href="#intro">들어가며 — 시스템이 목적이던 시대에서, 시스템이 도구가 되는 시대로</a></li><li><a href="#geny">1. 지금의 XGEN — Geny를 중심으로 확장된 실행 환경</a></li><li><a href="#development">2. 실험실과 제품 — XGEN은 어떻게 만들어지는가</a></li></ul></nav>

<h2 id="intro" style="scroll-margin-top:140px">들어가며 — 시스템이 목적이던 시대에서, 시스템이 도구가 되는 시대로</h2>

최근 Geny가 릴리스되면서 회사 안에서 작은 "혼란"이 있었습니다. 그리고 그 혼란을 계기로 여러 자리에서 다양한 논의가 오갔습니다.

혼란은 눈에 보이는 것에서 시작되었습니다. 새로 추가된 하위 컴포넌트들, 바뀐 단계 체계와 낯선 이름들이 그것입니다. Agentflow, Geny, DexOn, Omnifuse라는 이름이 한꺼번에 등장하자 자연스럽게 질문이 따라왔습니다.

- 이것들은 서로 다른 제품인가, 하나의 제품인가?
- 왜 단계마다 이름이 붙는가?
- 지금까지 써 오던 Agentflow는 이제 어떻게 되는가?

질문은 거기서 그치지 않았습니다. 크게는 'XGEN이라는 솔루션이 어디로 가고 있는가'라는 방향성에 대한 물음으로 넓어졌습니다. 작게는 '이 기능은 왜 이렇게 만들어졌는가', '사용자 화면은 왜 이런 모습이 되었는가'처럼 XGEN에 담긴 기능과 인터페이스가 지금의 모습에 이른 과정과 이유를 묻는 이야기로 이어졌습니다.

돌이켜 보면 자연스러운 일입니다. XGEN의 개발 주기는 점점 빨라지고 있습니다. 몇 달 단위로 쌓이던 변화가 이제는 몇 주, 때로는 며칠 단위로 들어옵니다. 그 변화 속에서 개별 기능의 '무엇'은 빠르게 공유되었지만, 그 기능들을 하나로 꿰는 '왜'는 충분히 이야기되지 못했습니다. 혼란은 바로 그 빈자리에서 생겨났습니다.

그래서 이 글을 쓰게 되었습니다. 여러 자리에서 나온 논의를 한곳에 정리하는 것이 첫 번째 목적입니다. 그리고 앞으로 더 빨라질 XGEN의 개발 주기를 긴 안목에서 한 번 짚어 두는 것이 두 번째 목적입니다. 오늘의 기능 하나하나가 어디에서 와서 어디로 가는지 보이면, 빠른 변화 속에서도 방향을 읽을 수 있을 것이라고 믿습니다.

그 이야기는 XGEN 자체가 아니라, XGEN이 놓여 있는 시대의 흐름에서 시작하는 것이 좋겠습니다.

지난 수십 년 동안 기업의 IT는 **시스템을 만드는 일**이었습니다. 인사 시스템, 주문 시스템, 정산 시스템, 고객 관리 시스템. 업무마다 화면을 설계하고 데이터베이스를 정의하고, 사람은 그 시스템의 규칙에 맞춰 일했습니다. 시스템을 갖추는 것 자체가 목적이었고, 그래서 시스템은 도메인의 경계를 따라 하나씩 따로 지어졌습니다.

생성형 AI 에이전트는 이 전제를 조용히 뒤집고 있습니다. 이제 사람은 시스템의 메뉴를 찾아다니지 않고 **원하는 결과를 말합니다.** 그러면 에이전트가 필요한 시스템을 찾아 조회하고, 다른 시스템의 데이터와 엮고, 문서로 만들고, 승인을 받아 처리합니다. 사람의 의도와 일의 결과 사이에서 에이전트가 시스템들을 '부리는' 구조입니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>구분</th><th>시스템이 목적이던 시대</th><th>에이전트가 일하는 시대</th></tr></thead><tbody><tr><td>일의 시작점</td><td>시스템의 메뉴와 화면</td><td>사람의 의도와 요청</td></tr><tr><td>레거시 시스템</td><td>구축하고 소유해야 할 <strong>목적</strong></td><td>에이전트가 호출하는 <strong>수단(Tool)</strong></td></tr><tr><td>도메인 경계</td><td>시스템마다 닫혀 있음</td><td>에이전트가 경계를 넘나들며 연결</td></tr><tr><td>변경 방식</td><td>요구사항 분석 → 개발 프로젝트</td><td>명세 수정 → 도구 생성 · 검증</td></tr><tr><td>쌓이는 것</td><td>산출물 문서</td><td>실행 기록, 기억, 재사용 가능한 도구</td></tr></tbody></table></div>

이 변화에서 기존 시스템이 사라지는 것은 아닙니다. 오랜 시간 검증된 레거시는 여전히 가장 정확한 데이터와 규칙을 갖고 있습니다. 달라지는 것은 그 **위치**입니다. 레거시는 사람이 직접 마주하는 '목적지'에서, 에이전트가 필요할 때 꺼내 쓰는 '도구'로 자리를 옮기고 있습니다. API 하나, MCP 서버 하나가 곧 하나의 능력이 되고, 에이전트는 도메인을 가리지 않고 그 능력들을 조합합니다.

그래서 지금 기업에 필요한 것은 또 하나의 시스템이 아니라 **에이전트 생태계**입니다. 에이전트가 일할 작업 공간, 꺼내 쓸 도구, 기억해야 할 맥락, 넘지 말아야 할 경계, 그리고 그 모든 행동의 기록. 도메인마다 따로 지어진 시스템들을 하나의 일하는 환경으로 엮어 내는 기반입니다.

연구소가 그간 기업의 시스템에 AI를 연계하며 마주한 장면도 같은 방향을 가리켰습니다. 같은 "인사" 업무라도 회사마다 규칙이 달라, AI를 붙일 때마다 그 회사의 맥락을 처음부터 다시 가르쳐야 했습니다. 한 번 연결한 AI 기능은 그 시스템, 그 시점의 규칙에 묶여 있어서 규칙이 바뀌거나 옆 도메인으로 넓히려 하면 다시 만들어야 했습니다. 시스템마다 따로 붙인 AI는 서로의 맥락을 알지 못했습니다. **연결은 끝나는 순간부터 낡기 시작했고, 이것이 정적인 흐름(Workflow)의 한계였습니다.**

Geny는 이 질문에서 출발했습니다. "시스템마다 AI를 따로 붙이는 대신, 이미 있는 시스템을 도구로 삼아 고객의 일을 배우고 스스로 고쳐 나가는 플랫폼을 만들 수는 없을까?" 이 글은 그 질문에 대한 저희의 현재 답과, 앞으로 1년의 여정을 정리한 것입니다.

---

<h2 id="geny" style="scroll-margin-top:140px">1. 지금의 XGEN — Geny를 중심으로 확장된 실행 환경</h2>

> **여기서 Geny란?** XGEN에서 에이전트 실행을 담당하는 핵심 엔진의 이름입니다. 이 절의 핵심은 ‘어떤 일을 맡길 것인가’보다, 에이전트가 계획·실행·검증을 수행할 기반과 통제를 어떻게 제공하는가에 있습니다.

2026년 10월, XGEN은 Agentflow 중심의 실행 구조에서 Geny를 더하며 큰 변화를 겪었습니다. Geny는 별도의 제품이 아니라, XGEN을 구성하며 에이전트 실행을 담당하는 핵심 엔진이자 컴포넌트입니다. 이 글에서는 XGEN의 핵심 엔진 이름을 중심으로 각 엔진의 역할과 확장 방향을 설명합니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>단계</th><th>표기</th><th>대표 하위 컴포넌트</th><th>상태</th><th>컴포넌트의 역할</th></tr></thead><tbody><tr><td>2.0</td><td><strong>Agentflow</strong></td><td>Agentflow</td><td>운영 중</td><td>흐름을 그려 에이전트를 만드는 Low-code 엔진</td></tr><tr><td>3.0</td><td><strong>Geny</strong></td><td>Geny</td><td>2026년 10월~</td><td>Agent가 일할 환경을 제공하는 실행 엔진(하네스)</td></tr><tr><td>—</td><td><strong>Orka</strong></td><td>Orka (가칭)</td><td>2027년 1월 말 목표</td><td>고객의 일을 명세로 이해하고 업무를 도구로 만드는 도메인 플랫폼 계층</td></tr><tr><td>—</td><td><strong>Plex</strong></td><td>Plex (가칭)</td><td>2027년 7월 말 목표</td><td>업무 · 사람마다 모습이 달라지는 Editable XGEN</td></tr></tbody></table></div>

새 단계로 나아가도 이전 단계의 대표 컴포넌트는 사라지지 않습니다. Geny 안에서 Agentflow는 Low-code 경로로 계속 쓰이고, Orka는 Geny 엔진 위에 올라갑니다. 단계가 높아질수록 대표 컴포넌트가 하나씩 **쌓이는** 구조입니다.

단계별 구성을 비교하면 다음과 같습니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>핵심엔진</th><th>아키텍처</th><th>애플리케이션/컴포넌트</th><th>핵심 구성요소</th></tr></thead><tbody><tr><td>Agentflow</td><td>단일 SPA + MSA</td><td>XGEN (단일 제품)</td><td>프런트엔드, Agentflow 엔진, 모델 관리, MCP Station, 매뉴얼 생성, 팀 채팅</td></tr><tr><td><strong>Geny</strong></td><td>멀티 애플리케이션 + MSA</td><td><strong>Agentflow · Geny · DexOn</strong></td><td>+ Agent 서버 런타임(Geny), 온톨로지 엔진(Omnifuse), 모델 하네스(CLI), 멀티 OS 데스크톱(DexOn)</td></tr></tbody></table></div>

![그림 1. Geny 현재 시스템 구조](/blog/geny-to-lucy-evolving-platform-1.svg)

그림 1. Geny 현재 시스템 구조

Geny의 구조를 한 문장으로 요약하면 이렇습니다.

> **흐름을 그리는 대신, Agent가 일할 '환경'을 설계한다.**

예전에는 업무 흐름을 노드와 화살표로 미리 그렸습니다. 기준이 바뀌면 흐름부터 다시 고쳐야 했습니다. 실행 엔진 **Geny**는 목표와 자료, 조건만 받으면 스스로 계획을 세우고 도구를 고르고 결과를 확인합니다. 틀리면 원인을 찾아 다시 계획합니다. 물론 정해진 절차가 필요한 업무를 위해 **Agentflow(Workflow Canvas)** 는 그대로 남아 있고, 둘은 같은 도구와 지식을 공유합니다.

이런 방식의 실행 환경을 업계에서는 **하네스(Harness)** 라고 부릅니다. 모델을 감싸 도구 · 기억 · 권한 · 실행 환경을 제공하고, 모델이 바뀌어도 절차와 통제는 그대로 유지하는 계층입니다. XGEN의 하네스는 네 가지 요소로 이루어져 있습니다.

<pre style="white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;max-width:100%;min-width:0;box-sizing:border-box"><code style="white-space:inherit;overflow-wrap:inherit;font-size:12px">
Geny Harness
├── A. Workspace ─────────── 작업 공간: 파일 · 저장소 · 산출물 (PC가 아니라 계정에 연결)
├── B. Capability ────────── 능력: Tool Registry · ToolSearch · MCP · Skills
├── C. Controlled Execution ─ 통제된 실행: Sandbox · Permission · Hook · 사람 확인(HITL)
└── D. Persistent State ──── 지속 상태: Memory · Task Registry · Checkpoint

Agent Loop : Observe → Plan → Act → Verify → Recover
원칙       : 자율성은 Agent에게, 실행 경계와 운영 책임은 Runtime에
</code></pre>

Geny를 구성하는 주요 기술은 다음과 같습니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>구성 요소</th><th>역할</th><th>특징</th></tr></thead><tbody><tr><td><strong>Geny</strong> (xgen-agent-runtime)</td><td>Agent 실행 엔진</td><td>21단계 파이프라인, 다중 LLM 프로바이더, MCP 네이티브</td></tr><tr><td><strong>Xgen-Memory</strong></td><td>기억 계층</td><td>Capture → Layer → Consolidate → Recall → Learn, 쓰인 기억은 강화되고 무시된 기억은 약화</td></tr><tr><td><strong>Tool Control Plane</strong></td><td>도구 통제</td><td>도메인 → 매니페스트 → 도구 → 스키마 순으로 필요한 만큼만 노출</td></tr><tr><td><strong>Omnifuse</strong></td><td>근거 검색</td><td>Vector · Keyword · Graph 세 신호 융합, LLM 없이 문서를 지식 그래프로 정규화</td></tr><tr><td><strong>Model Switch</strong></td><td>모델 독립</td><td>로컬 오픈 웨이트와 승인된 외부 모델을 같은 인터페이스로</td></tr><tr><td><strong>DexOn</strong> (xgen-dex-core)</td><td>사람과 만나는 접점</td><td>데스크톱 앱 · CLI · VS Code 확장이 같은 서버, 같은 Agent에 연결</td></tr><tr><td><strong>CLI</strong> (xgen-cli)</td><td>로컬 하네스</td><td>로컬 우선 범용 Agent CLI, 작업 그래프와 재개 · 복구</td></tr></tbody></table></div>

특히 기업 환경에서 중요하게 여긴 것은 **통제가 기본값**이라는 점입니다. 모든 행동은 권한 확인 → 등급 판정 → 사람 확인 → 실행 기록이라는 관문을 지납니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>등급</th><th>기준</th><th>실행 방식</th><th>예</th></tr></thead><tbody><tr><td>R0</td><td>결과를 바꾸지 않는 조회 · 초안</td><td>자동 실행</td><td>데이터 조회, 리포트 초안</td></tr><tr><td>R1</td><td>사내에서 되돌릴 수 있는 기록</td><td>승인 카드(이번만 / 항상)</td><td>분석 결과 저장, 대시보드 게시</td></tr><tr><td>R2</td><td>되돌릴 수 없는 실행</td><td>결재 후 사람이 실행</td><td>데이터 변경, 고객 안내 발송</td></tr></tbody></table></div>

그리고 Agent가 찾아낸 방법은 사람이 검증한 뒤 **확정 버전**으로 잠급니다. 같은 업무는 이후 검증된 절차대로 실행되어 결과가 일관되고, 반복 업무에서는 AI 호출과 GPU 사용이 줄어듭니다. "탐색은 Geny가, 확정은 사람이, 반복은 정해진 방식으로." 이것이 Geny가 일하는 방식입니다.

---

<h2 id="development" style="scroll-margin-top:140px">2. 실험실과 제품 — XGEN은 어떻게 만들어지는가</h2>

XGEN의 개발은 두 개의 트랙으로 움직입니다.

<pre style="white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;max-width:100%;min-width:0;box-sizing:border-box"><code style="white-space:inherit;overflow-wrap:inherit;font-size:12px">
플래티어 XGEN 개발 트랙
├── 제품 트랙 ─ 고객에게 전달되는 XGEN
│   ├── 업무 흐름과 에이전트 실행
│   ├── 도구·지식 연결과 사용자 작업 환경
│   └── 검증된 기능의 안정적인 제공
│
└── 개념 검증(PoC) 트랙 ─ 아이디어의 가능성을 확인하는 실험
    ├── 에이전트 협업과 업무 맞춤화
    ├── 실행 경험의 축적과 재사용
    └── 새로운 작업 환경과 모델 활용 검증
</code></pre>

개념 검증 트랙의 프로젝트는 완성된 제품이 아닙니다. 연구소 구성원이 매일 실제로 쓰면서 "이게 정말 일을 바꾸는가"를 확인하는 실험입니다. 살아남은 개념만 제품 트랙으로 옮겨집니다. 다음 절에 나오는 Orka의 상당 부분, 예를 들어 Editable XGEN이나 지식 허브, 인프라의 도구화가 이 실험실에서 먼저 시작되었습니다.


---

다음 편에서는 이 실행 기반 위에서 고객의 일을 명세로 이해하는 Orka를 살펴봅니다.



[다음 편: Orka — 고객의 일을 명세로 이해하다 →](/blog/xgen-journey-2-orca)

