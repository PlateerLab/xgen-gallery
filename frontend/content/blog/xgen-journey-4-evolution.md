---
title: "자기 개선 — 실행이 쌓여 플랫폼이 되다(4편)"
description: "실행 기록이 검증과 재사용으로 이어지는 자기 개선 루프, 구독 모델과 플래티어의 역할을 정리합니다."
date: "2026-10-15"
author: "정우문"
authorGithub: "woomun-jung"
category: "Tech Note"
kicker: "XGEN의 여정 · 4/4"
tags: ["XGEN", "Geny", "Orka", "Plex", "플랫폼 로드맵"]
cover: "/blog/xgen-journey-4-evolution.svg"
thumb: "/blog/xgen-journey-4-evolution-thumb.svg"
draft: false
---

실행 기록이 검증과 재사용으로 이어지는 자기 개선 루프, 구독 모델과 플래티어의 역할을 정리합니다.

> **읽기 전에** — Geny는 현재 단계입니다. Orka와 Plex는 가칭이며, 이 글에 소개하는 기능과 일정은 개발 목표입니다. ‘자기 개선’은 AI가 임의로 시스템을 바꾼다는 뜻이 아니라, 변경안을 검증하고 승인한 뒤 반영하는 구조를 뜻합니다.

**XGEN의 핵심 엔진** — Xgen·Agentflow·Geny·Orka·Plex는 XGEN에서 각 프로젝트 단계의 중심이 되는 핵심 엔진을 부르는 이름입니다. 전체 흐름은 **Xgen → Agentflow → Geny → Orka → Plex**입니다. 각 단계는 이전 단계의 기반을 유지하면서 새로운 엔진과 기능을 더해 확장하는 관계입니다.

<nav aria-label="시리즈 안내" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>모든 일이 XGEN에서 시작되는 회사를 꿈꾸며</strong><ol><li><a href="/blog/xgen-journey-1-geny">Geny — 에이전트가 일할 환경을 만들다</a></li><li><a href="/blog/xgen-journey-2-orca">Orka — 고객의 일을 명세로 이해하다</a></li><li><a href="/blog/xgen-journey-3-plex">Plex — 업무와 사람에 맞춰 진화하다</a></li><li><a aria-current="page" href="/blog/xgen-journey-4-evolution">자기 개선 — 실행이 쌓여 플랫폼이 되다</a></li></ol></nav>

<nav aria-label="글 목차" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>이 글의 목차</strong><ul><li><a href="#improvement">1. 최종 목표 — 스스로 개선되는 플랫폼</a></li><li><a href="#business">2. 무엇이 바뀌는가 — 라이선스, 그리고 플래티어의 역할</a></li><li><a href="#conclusion">맺으며</a></li></ul></nav>

<h2 id="improvement" style="scroll-margin-top:140px">1. 최종 목표 — 스스로 개선되는 플랫폼</h2>

Orka와 Plex를 관통하는 하나의 그림은 **자기 개선 루프**입니다.

![그림 4. 스스로 개선되는 플랫폼](/blog/geny-to-lucy-evolving-platform-4.svg)

그림 4. 스스로 개선되는 플랫폼

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>단계</th><th>하는 일</th><th>받쳐 주는 XGEN 구성 요소</th></tr></thead><tbody><tr><td>기록</td><td>대화 · 도구 호출 · 결과를 빠짐없이 남김</td><td>지식(메시지) 허브, 실행 기록</td></tr><tr><td>탐색</td><td>새 요청에 대해 방법을 찾음</td><td>Geny, Tool Control Plane</td></tr><tr><td>검증</td><td>사람 확인, 평가 질문, 계약 · 권한 시험</td><td>승인 체계, 생성물 검증</td></tr><tr><td>정형화</td><td>검증된 절차를 확정 버전으로 잠금</td><td>확정 버전, 반복 실행</td></tr><tr><td>자산화</td><td>소유 · 버전 · 등급과 함께 등록</td><td>AI 자산 대장</td></tr><tr><td>재사용 · 관측</td><td>다른 팀 · 사람이 재사용하고 성과를 측정</td><td>공통 추적 ID, 성과 지표</td></tr><tr><td>개선</td><td>쓰인 기억은 강화, 실패한 변경은 이전 버전으로</td><td>Xgen-Memory, 롤백</td></tr></tbody></table></div>

이 루프가 도는 **단위**는 점점 작아집니다. 처음에는 도메인 단위로, 다음에는 프로젝트와 업무 단위로, 궁극적으로는 **개인 단위로** 플랫폼이 스스로 개선됩니다.

```
개선 단위의 이동
도메인    "커머스 업계의 일하는 방식"을 배운다          ← Orka
 └ 프로젝트 "이 프로젝트의 규칙과 맥락"을 배운다        ← Orka
    └ 업무   "이 업무를 가장 잘하는 절차"를 배운다      ← Plex
       └ 개인 "이 사람이 일하는 방식"을 배운다          ← Plex 이후
```

---

<h2 id="business" style="scroll-margin-top:140px">2. 무엇이 바뀌는가 — 라이선스, 그리고 플래티어의 역할</h2>

플랫폼이 스스로 개선된다면, 소프트웨어를 사고파는 방식도 달라져야 합니다.

![그림 5. 로드맵과 역할 변화](/blog/geny-to-lucy-evolving-platform-5.svg)

그림 5. 로드맵과 역할 변화

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>구분</th><th>지금 · Geny</th><th>Orka</th><th>Plex 이후</th></tr></thead><tbody><tr><td>고객이 받는 것</td><td>구축된 시스템</td><td>고객의 규칙을 이해하는 도메인 플랫폼</td><td>스스로 진화하는 인스턴스</td></tr><tr><td>라이선스</td><td>구축 + 라이선스</td><td>구독형 전환 시작</td><td>구독 중심</td></tr><tr><td>변경 요청</td><td>개발 프로젝트</td><td>명세 수정 → 도구 생성 · 검증</td><td>사용 기록에 따른 자기 개선</td></tr><tr><td>플래티어의 역할</td><td>구축 · 커스터마이징</td><td>도메인 온보딩 · 명세화 지원</td><td>새 시스템 연결 · 추가 구현, 복구 지원</td></tr></tbody></table></div>

라이선스는 **구독(Subscription)** 구조로 바뀌어 갈 예정입니다. 한 번 구축하고 끝나는 시스템이 아니라 매일 조금씩 나아지는 플랫폼이라면, 그 가치에 맞는 계약 방식도 '소유'보다는 '사용'에 가깝다고 보기 때문입니다.

플래티어의 역할도 함께 달라집니다. 고객의 요구사항 하나하나를 직접 개발하던 역할에서, 플랫폼이 스스로 할 수 없는 일, 즉 **새로운 시스템을 연결하는 추가 구현**과 **문제가 생겼을 때 안전하게 되돌리는 복구 지원**에 집중하는 역할로 옮겨 가려 합니다. 수많은 기업 시스템을 구축하고 운영하며 쌓은 경험은 사라지지 않습니다. 오히려 그 경험이 도메인 명세와 검증 기준, 복구 절차라는 형태로 플랫폼 안에 담기게 됩니다.

구축 회사가 구축을 줄이는 방향을 이야기하는 것이 어색하게 들릴 수도 있습니다. 하지만 저희는 고객이 원하는 것이 '시스템 그 자체'가 아니라 '일이 잘 되는 상태'라고 믿습니다. 그 상태를 가장 오래, 가장 안전하게 유지해 주는 파트너가 되는 것. 그것이 XGEN을 통해 플래티어가 가려는 방향입니다.

---

<h2 id="conclusion" style="scroll-margin-top:140px">맺으며</h2>

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>시점</th><th>단계</th><th>한 줄 요약</th></tr></thead><tbody><tr><td>2026년 10월</td><td>Geny</td><td>흐름이 아니라 환경을 — Agentflow · Geny · DexOn</td></tr><tr><td>2027년 1월 말 (목표)</td><td>Orka</td><td>고객의 일을 명세로 이해하고, 업무를 도구로 만드는 도메인 플랫폼</td></tr><tr><td>2027년 7월 말 (목표)</td><td>Plex</td><td>업무마다, 사람마다 모습이 다른 Editable XGEN</td></tr><tr><td>그 이후</td><td>—</td><td>개인 단위까지 스스로 개선되는 플랫폼, 파트너와 함께 넓히는 연결</td></tr></tbody></table></div>

1년이라는 시간은 짧고, 목표는 큽니다. 모든 계획이 적힌 날짜에 적힌 모습대로 도착하지는 않을 것입니다. 그래서 저희는 Geny에서 정한 원칙을 Orka와 Plex에도 그대로 가져가려 합니다. **측정한 뒤에 약속하고, 검증한 것만 확정하며, 실패하면 이전 버전으로 돌아간다.**

모든 일이 XGEN에서 시작되고, 시작된 일이 다시 XGEN을 더 낫게 만드는 회사. 그 첫 번째 사례가 저희 자신이 되도록 오늘도 실험실의 불을 켜 둡니다.

---



[← 이전 편: Plex — 업무와 사람에 맞춰 진화하다](/blog/xgen-journey-3-plex)



