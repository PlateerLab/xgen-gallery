---
title: "Orka — 고객의 일을 명세로 이해하다(2편)"
description: "회사별 업무 규칙을 명세로 만들고 도구 생성과 검증으로 연결하는 과정을 재직증명서 사례와 함께 살펴봅니다."
date: "2026-10-15"
author: "정우문"
authorGithub: "woomun-jung"
category: "Tech Note"
kicker: "XGEN의 여정 · 2/4"
tags: ["XGEN", "Geny", "Orka", "Plex", "플랫폼 로드맵"]
cover: "/blog/xgen-journey-2-orca.svg"
thumb: "/blog/xgen-journey-2-orca-thumb.svg"
draft: false
---

회사별 업무 규칙을 명세로 만들고 도구 생성과 검증으로 연결하는 과정을 재직증명서 사례와 함께 살펴봅니다.

> **읽기 전에** — Geny는 현재 버전입니다. Orka와 Plex는 가칭이며, 이 글에 소개하는 기능과 일정은 개발 목표입니다. ‘자기 개선’은 AI가 임의로 시스템을 바꾼다는 뜻이 아니라, 변경안을 검증하고 승인한 뒤 반영하는 구조를 뜻합니다.

**XGEN의 핵심 엔진** — Xgen·Agentflow·Geny·Orka·Plex는 XGEN에서 각 프로젝트 버전의 중심이 되는 핵심 엔진을 부르는 이름입니다. 전체 흐름은 **Xgen → Agentflow → Geny → Orka → Plex**입니다. 각 버전은 이전 버전의 기반을 유지하면서 새로운 엔진과 기능을 더해 확장하는 관계입니다.

<nav aria-label="시리즈 안내" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>모든 일이 XGEN에서 시작되는 회사를 꿈꾸며</strong><ol><li><a href="/blog/xgen-journey-1-geny">Geny — 에이전트가 일할 환경을 만들다</a></li><li><a aria-current="page" href="/blog/xgen-journey-2-orca">Orka — 고객의 일을 명세로 이해하다</a></li><li><a href="/blog/xgen-journey-3-plex">Plex — 업무와 사람에 맞춰 진화하다</a></li><li><a href="/blog/xgen-journey-4-evolution">자기 개선 — 실행이 쌓여 플랫폼이 되다</a></li></ol></nav>

<nav aria-label="글 목차" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>이 글의 목차</strong><ul><li><a href="#orca">1. Orka — 고객의 일을 '명세'로 이해하는 플랫폼 (2027년 1월 말 목표)</a></li><li><a href="#orca-features">1.1 무엇이 새로 생기는가</a></li><li><a href="#orca-experience">1.2 사용자 경험의 변화</a></li><li><a href="#orca-validation">1.3 첫 번째 실증 — 재직증명서</a></li></ul></nav>

<h2 id="orca" style="scroll-margin-top:140px">1. Orka — 고객의 일을 '명세'로 이해하는 플랫폼 (2027년 1월 말 목표)</h2>

> **여기서 Orka란?** XGEN의 핵심 엔진으로 개발 중인 가칭입니다. Geny의 실행 기반 위에서 ‘이 회사의 업무를 어떤 규칙과 승인 절차로 처리할 것인가’를 정의하는 도메인 플랫폼 역할을 맡도록 계획하고 있습니다. 여러 시스템을 연결하는 것뿐 아니라, 연결한 도구를 회사의 업무 규칙에 맞게 사용하는 것이 핵심입니다.

Geny 로드맵에 담긴 과제들이 차례로 완성되면, 그 묶음을 **Orka** 로 패키징할 계획입니다. 목표 시점은 **2027년 1월 말**입니다.

Orka의 핵심은 Geny의 엔진 위에 **'도메인 플랫폼' 계층**을 올리는 것입니다.

![그림 2. Orka 확장 구조](/blog/geny-to-lucy-evolving-platform-2.svg)

그림 2. Orka 확장 구조

<h3 id="orca-features" style="scroll-margin-top:140px">1.1 무엇이 새로 생기는가</h3>

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>영역</th><th>핵심 과제</th><th>고객이 얻는 것</th></tr></thead><tbody><tr><td><strong>도메인 플랫폼 명세</strong></td><td>회사 · 도메인 · 소유자 · 업무 규칙 · 데이터 · 도구 · 권한 · 인프라를 버전 있는 'Domain Platform Manifest' 로 표현</td><td>회사별 규칙을 표준 명세로 관리, 온보딩 기간 단축</td></tr><tr><td><strong>신원 · 위임 · 격리</strong></td><td>요청자 · 담당팀 · 도구 실행 주체 구분, 회사 간 데이터 · 도구 · 기억 접근 차단</td><td>보안에 민감한 고객도 안심하고 쓰는 멀티테넌트</td></tr><tr><td><strong>연결 카탈로그</strong></td><td>API · DB · 브라우저 · PC · 포털 연결의 소유자 · 범위 · 만료를 등록, 비밀값은 프롬프트에 넣지 않음</td><td>연결 자산의 가시성과 비밀정보 보호</td></tr><tr><td><strong>업무 명세 변환</strong></td><td>자연어 요청에서 입출력 · 처리 규칙 · 승인 · 예외 · 완료 조건을 도출</td><td>같은 "인사"라도 회사별로 다른 명세가 생성</td></tr><tr><td><strong>업무 전달</strong></td><td>개인 요청을 담당 도메인 · 담당자에게 작업 ID로 전달, 수락 · 보류 · 반려 · 재할당</td><td>요청이 사람을 찾아가는 구조</td></tr><tr><td><strong>도구 생성과 검증</strong></td><td>기존 도구 재사용 판단 → skill · MCP 생성 → 계약 · 권한 · 의존성 시험 → 승격 · 롤백</td><td>개발자 개입 없이 업무가 도구가 됨</td></tr><tr><td><strong>동적 PaaS · 자기 적응</strong></td><td>명세로부터 실행 환경 · 저장소 · 네트워크 생성, 부족한 런타임 · DB · API를 감지해 자동 확보</td><td>운영 부담과 자원 낭비 최소화</td></tr><tr><td><strong>온프레미스 · 관측</strong></td><td>폐쇄망 오프라인 번들, 공통 추적 ID로 성공률 · 지연 · 비용 · 재사용률 측정</td><td>금융 · 공공 환경 배포, 예산 통제</td></tr></tbody></table></div>

<h3 id="orca-experience" style="scroll-margin-top:140px">1.2 사용자 경험의 변화</h3>

Orka의 방향성 문서에는 기술 과제와 함께 사용자 경험에 대한 네 가지 약속이 담겨 있습니다.

<pre style="white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;max-width:100%;min-width:0;box-sizing:border-box"><code style="white-space:inherit;overflow-wrap:inherit;font-size:12px">
Orka가 지향하는 사용자 경험
├── 1. 업무에 맞는 사용 환경
│   └── 회사와 사용자의 업무 특성에 맞춘 경험
├── 2. 끊김 없는 업무 연결
│   └── 다양한 기기에서 이어지는 작업 흐름
├── 3. 운영 부담 완화
│   └── 사용자가 업무에 집중할 수 있는 실행 환경
└── 4. 지식의 축적과 활용
    └── 개인정보를 보호하며 업무 경험을 조직의 지식으로 연결
</code></pre>

이 중 **지식(메시지) 허브**는 특별히 강조하고 싶습니다. 지금 기업 안에서 가장 빠르게 쌓이는 지식은 문서가 아니라 사람과 AI가 주고받은 대화입니다. 누군가 이미 풀어 본 문제를 다른 누군가가 처음부터 다시 묻습니다. Orka는 이 대화의 실타래를 개인의 프라이버시를 지키는 방식으로 정리해 조직의 지식으로 돌려놓으려 합니다. 이렇게 모든 업무의 출발점이 XGEN이 될 때, 비로소 **AI Native** 라는 말이 구호가 아니라 운영 방식이 됩니다.

<h3 id="orca-validation" style="scroll-margin-top:140px">1.3 첫 번째 실증 — 재직증명서</h3>

Orka의 모든 과제는 하나의 작고 구체적인 업무로 끝까지 연결해 검증할 예정입니다.

<pre style="white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;max-width:100%;min-width:0;box-sizing:border-box"><code style="white-space:inherit;overflow-wrap:inherit;font-size:12px">
"재직증명서 한 부 필요해요"
 └─▶ 업무 명세 변환 (입출력 · 승인 · 완료 조건)
      └─▶ 인사 도메인 · 담당자에게 작업 전달
           └─▶ 기존 도구 탐색 → 없으면 MCP 생성 · 검증 · 배포
                └─▶ 실제 인사 원장 조회 → 승인 · 발급
                     └─▶ 감사 기록
                          └─▶ 다음 요청부터는 검증된 기능을 재사용
</code></pre>

작아 보이지만 이 흐름이 끝까지 이어진다는 것은, 요청 하나가 **명세 → 도구 → 검증 → 자산**으로 이어지는 순환이 실제로 돈다는 뜻입니다. 그다음부터는 같은 순환을 다른 업무에 적용하는 일이 됩니다.


---

다음 편에서는 업무와 사람에 맞춰 모습을 바꾸는 Plex로 이야기를 이어갑니다.

[← 이전 편: Geny — 에이전트가 일할 환경을 만들다](/blog/xgen-journey-1-geny)

[다음 편: Plex — 업무와 사람에 맞춰 진화하다 →](/blog/xgen-journey-3-plex)

