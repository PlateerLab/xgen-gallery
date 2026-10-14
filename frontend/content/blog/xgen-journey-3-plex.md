---
title: "Plex — 업무와 사람에 맞춰 진화하다(3편)"
description: "Editable XGEN의 맞춤화 구조와 연결의 확장, 변화 속에서도 지켜야 할 경계를 이야기합니다."
date: "2026-10-15"
author: "정우문"
authorGithub: "woomun-jung"
category: "Tech Note"
kicker: "XGEN의 여정 · 3/4"
tags: ["XGEN", "Geny", "Orka", "Plex", "플랫폼 로드맵"]
cover: "/blog/xgen-journey-3-plex.svg"
thumb: "/blog/xgen-journey-3-plex-thumb.svg"
draft: false
---

Editable XGEN의 맞춤화 구조와 연결의 확장, 변화 속에서도 지켜야 할 경계를 이야기합니다.

> **읽기 전에** — Geny는 현재 버전입니다. Orka와 Plex는 가칭이며, 이 글에 소개하는 기능과 일정은 개발 목표입니다. ‘자기 개선’은 AI가 임의로 시스템을 바꾼다는 뜻이 아니라, 변경안을 검증하고 승인한 뒤 반영하는 구조를 뜻합니다.

**XGEN의 핵심 엔진** — Xgen·Agentflow·Geny·Orka·Plex는 XGEN에서 각 프로젝트 버전의 중심이 되는 핵심 엔진을 부르는 이름입니다. 전체 흐름은 **Xgen → Agentflow → Geny → Orka → Plex**입니다. 각 버전은 이전 버전의 기반을 유지하면서 새로운 엔진과 기능을 더해 확장하는 관계입니다.

<nav aria-label="시리즈 안내" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>모든 일이 XGEN에서 시작되는 회사를 꿈꾸며</strong><ol><li><a href="/blog/xgen-journey-1-geny">Geny — 에이전트가 일할 환경을 만들다</a></li><li><a href="/blog/xgen-journey-2-orca">Orka — 고객의 일을 명세로 이해하다</a></li><li><a aria-current="page" href="/blog/xgen-journey-3-plex">Plex — 업무와 사람에 맞춰 진화하다</a></li><li><a href="/blog/xgen-journey-4-evolution">자기 개선 — 실행이 쌓여 플랫폼이 되다</a></li></ol></nav>

<nav aria-label="글 목차" style="border:1px solid #d9dce1;padding:20px;margin:28px 0"><strong>이 글의 목차</strong><ul><li><a href="#plex">1. Plex — 업무마다, 사람마다 모습이 다른 XGEN (2027년 7월 말 목표)</a></li><li><a href="#plex-customization">1.1 Editable XGEN의 완성 — XGEN의 유전자 편집 가위</a></li><li><a href="#plex-connections">1.2 연결의 확장</a></li><li><a href="#plex-boundaries">1.3 경계를 보는 두 개의 눈</a></li></ul></nav>

<h2 id="plex" style="scroll-margin-top:140px">1. Plex — 업무마다, 사람마다 모습이 다른 XGEN (2027년 7월 말 목표)</h2>

> **여기서 Plex란?** XGEN의 핵심 엔진으로 개발 중인 가칭입니다. Geny의 실행 기반과 앞 단계의 업무 명세를 활용해 ‘이 업무와 이 사용자에게 어떤 환경이 필요한가’를 반영하도록 계획하고 있습니다. 맞춤화의 대상은 화면·데이터·도구·기억이며, 공통 보안과 통제는 유지합니다.

Orka가 "고객의 일을 이해하는 플랫폼"이라면, **Plex** 는 "고객의 일에 맞춰 모습을 바꾸는 플랫폼"입니다. 목표 시점은 **2027년 7월 말**입니다.

<h3 id="plex-customization" style="scroll-margin-top:140px">1.1 Editable XGEN의 완성 — XGEN의 유전자 편집 가위</h3>

완전한 AI Native 회사에서는 모든 업무가 XGEN을 통해 이루어집니다. 그러려면 XGEN이 하나의 모습일 수 없습니다. 영업팀의 XGEN과 개발팀의 XGEN은 달라야 하고, 같은 팀 안에서도 사람마다 달라야 합니다. 저희는 이것을 **궁극의 Editable XGEN** 이라고 부릅니다.

Editable XGEN을 설명할 때 저희가 즐겨 쓰는 비유는 **크리스퍼(CRISPR) 유전자 편집 가위**입니다. 크리스퍼는 가이드 RNA가 긴 유전체 속에서 고칠 위치를 정확히 찾아내고, Cas9 단백질이 그 자리만 잘라내면, 세포가 스스로 그 부위를 복구하며 새 서열을 받아들이는 기술입니다. 생명체를 처음부터 다시 만드는 것이 아니라, **필요한 곳만 정확히 고쳐 다른 형질을 갖게 하는 것**이 핵심입니다.

Editable XGEN도 같습니다. XGEN을 회사마다, 업무마다, 사람마다 새로 만들지 않습니다. 모두가 같은 '유전체', 즉 XGEN Core를 물려받고, 그 위에서 **바꿔야 할 지점만 찾아 정확히 편집**합니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>크리스퍼 유전자 편집 가위</th><th>Editable XGEN</th><th>하는 일</th></tr></thead><tbody><tr><td>유전체(DNA)</td><td>XGEN Core (SDK)</td><td>하네스 · 통제 · 기록 · 보안 등 모든 인스턴스가 물려받는 공통 설계도</td></tr><tr><td>가이드 RNA</td><td>업무 명세 · 메시지 기록</td><td>어디를 고쳐야 하는지 찾는다 (도메인 명세, 지식 허브, 실행 기록)</td></tr><tr><td>Cas9 (가위)</td><td>도구 생성 · 화면 편집</td><td>찾은 지점의 화면 · 규칙 · 도구만 정확히 잘라 바꾼다</td></tr><tr><td>세포의 복구와 수용</td><td>검증 · 승격 · 롤백</td><td>바뀐 부분이 시험을 통과하면 확정 버전이 되고, 실패하면 이전 상태로 되돌린다</td></tr><tr><td>오프타깃(off-target) 방지</td><td>도메인 격리 · 권한 관문</td><td>편집이 다른 업무 · 다른 회사 · 다른 사람에게 번지지 않게 막는다</td></tr><tr><td>편집하지 않는 영역</td><td>통제 · 감사 · 보안</td><td>어떤 인스턴스도 고칠 수 없는 안전장치</td></tr><tr><td>달라진 형질</td><td>업무 · 사람마다 다른 XGEN</td><td>같은 유전체에서 서로 다른 모습이 나타난다</td></tr></tbody></table></div>

크리스퍼에서 가장 경계하는 것이 엉뚱한 곳을 자르는 오프타깃 문제이듯, Editable XGEN에서도 가장 중요한 것은 **편집의 정확성과 경계**입니다. 그래서 편집할 수 있는 것(화면 · 데이터 · 도구 · 기억)과 편집할 수 없는 것(통제 · 기록 · 보안)을 처음부터 나누어 두었습니다. 그리고 모든 편집은 검증을 거쳐야만 자리 잡습니다.

![그림 3. Plex — 같은 코어, 다른 업무](/blog/geny-to-lucy-evolving-platform-3.svg)

그림 3. Plex — 같은 코어, 다른 업무

구조는 상속의 원리를 따릅니다.

<pre style="white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;max-width:100%;min-width:0;box-sizing:border-box"><code style="white-space:inherit;overflow-wrap:inherit;font-size:12px">
XGEN Core (SDK) ─ 상속: 통제 · 기록 · 보안 · 하네스는 어디서나 동일
└── 도메인 인스턴스(도메인 XGEN)           예) 커머스 / 금융 / 제조 · 물류 / 공공
    └── 프로젝트 인스턴스(프로젝트 XGEN)   예) ○○몰 리뉴얼, △△ 데이터 분석
        └── 업무 인스턴스(업무 XGEN)       예) 인사 증명서, 주간 보고, 고객 응대
            └── 개인 인스턴스(개인 XGEN) ─ 변화: 화면 · 데이터 · 도구 · 기억이 사람마다 달라짐
</code></pre>

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>무엇이</th><th>코어에서 상속 (바뀌지 않음)</th><th>인스턴스가 소유 (바뀜)</th></tr></thead><tbody><tr><td>보안 · 통제</td><td>권한 관문, R0~R2 등급, 감사 기록</td><td>—</td></tr><tr><td>실행 엔진</td><td>Harness, Agent Loop</td><td>쓰는 모델, 작업 순서</td></tr><tr><td>화면</td><td>공통 컴포넌트</td><td>배치 · 카드 · 강조 · 시작 지시</td></tr><tr><td>데이터 · 지식</td><td>저장 · 검색 방식</td><td>도메인 규칙, 프로젝트 문서, 개인 기억</td></tr><tr><td>도구</td><td>Tool Control Plane</td><td>업무별로 생성 · 승격된 skill · MCP</td></tr></tbody></table></div>

개념 검증 트랙의 'xgen-mutation-platform'은 이 구조의 초석을 시험하고 있습니다. SDK가 대화 · 도구 · 모델 선택 · PC 연결 · 결과물을 제공하고, 업무 화면의 모습과 데이터는 인스턴스가 소유합니다. 지금은 사용자가 고른 대로 모습이 바뀌는 단계입니다. Plex에서는 이것이 업무 기록을 바탕으로 스스로 바뀌는 단계까지 나아가는 것이 목표입니다. 그 전제가 되는 원칙은 하나입니다. **기업과 조직 안에서 기록되는 메시지는 하나도 놓치지 않는다.**

<h3 id="plex-connections" style="scroll-margin-top:140px">1.2 연결의 확장</h3>

Plex의 방향성 문서에는 기업의 경계를 넘어서는 구상도 담겨 있습니다. 기업과 기업이 제휴하고 정산하고 물건을 주고받는 일, 사람과 사람이 서로 필요한 재화나 용역을 나누는 일, 동의한 사람끼리만 연결되는 닫힌 커뮤니티, 그리고 학습 · 창작 · 콘텐츠처럼 기존 매체와 유통 과정이 맡아 온 일을 도구로 다루는 공간까지 포함됩니다.

솔직히 말씀드리면, 이 영역의 상당 부분은 플래티어가 지금 직접 사업으로 하고 있지 않은 분야입니다. 결제와 정산, 물류, 생활 서비스, 교육과 콘텐츠에는 이미 그 분야를 오래 지켜 온 전문 기업들과 정교한 제도가 있습니다. 그래서 저희는 이 구상을 **"플래티어가 모든 것을 직접 하겠다"는 계획이 아니라, "XGEN이 그런 연결을 담을 수 있는 그릇이 되려면 무엇이 필요한가"라는 연구 질문**으로 다루고 있습니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>탐색 영역</th><th>저희가 던지는 질문</th><th>접근 방식</th></tr></thead><tbody><tr><td>기업 간 협업</td><td>제휴 · 정산 · 유통 과정을 하나의 도구로 이을 수 있을까?</td><td>해당 분야 파트너와의 연동을 전제로 한 실험</td></tr><tr><td>사람 간 연결</td><td>노출하고 싶은 것만 노출하고, 모두가 동의할 때만 넓어지는 연결이 가능할까?</td><td>온톨로지 기반 연결 모델 연구</td></tr><tr><td>거래와 신뢰</td><td>보증 · 환불 · 책임 같은 신뢰의 문제는 누가 어떻게 맡아야 할까?</td><td>제도와 전문 기관의 역할을 존중하는 범위에서 검토</td></tr><tr><td>창작 · 학습 공간</td><td>AI 시대에 배우고 만드는 방식은 어떻게 달라질까?</td><td>문서 생산성처럼 가까운 영역부터</td></tr></tbody></table></div>

Geny 로드맵에도 가치 평가 · 견적, 주문 · 정산, 수요와 공급의 연결 같은 과제가 시험 범위로 포함되어 있습니다. 다만 이들은 실제 서비스를 출시하기 위한 것이 아니라, **XGEN의 도구 · 기억 · 통제 구조가 거래처럼 책임이 무거운 업무까지 감당할 수 있는지 확인하는 기술 검증**의 성격입니다. 실제 화폐와 연결되는 범위나 사업화 여부는 계약과 법적 검토, 그리고 무엇보다 함께할 파트너와의 합의를 거쳐 신중하게 결정하겠습니다.

<h3 id="plex-boundaries" style="scroll-margin-top:140px">1.3 경계를 보는 두 개의 눈</h3>

Plex에 대한 이야기를 노자 『도덕경』 제1장의 한 구절로 마무리하려 합니다.

> **故常無欲，以觀其妙，常有欲，以觀其徼**  
> 고상무욕, 이관기묘, 상유욕, 이관기요
>
> 그러므로 항상 욕심을 비우면 그 신비로움을 볼 수 있고, 항상 욕심을 가지면 그 경계를 볼 수 있다.
>
> — 노자, 『도덕경』 제1장

이 구절은 이렇게 풀이할 수 있습니다. 집착이 없는 마음으로는 사물의 깊은 본질과 신비한 작용을 관조할 수 있습니다. 반면 목적의식이 있는 마음으로는 사물의 경계와 구체적인 현상, 즉 실용적인 측면을 파악할 수 있습니다. 노자의 사상은 언제나 '변화'하는 세계에 주목하고 경계가 가진 가능성을 강조합니다. 그래서 격변하는 시대일수록 깊은 통찰을 줍니다.

전통적인 "시스템"은 경계를 명확히 긋는 일이었습니다. 이 도메인과 저 도메인, 이 업무와 저 업무, 이 역할과 저 역할 사이에 선을 긋고, 그 선 안에서 규칙을 정했습니다. 다음 세대는 다릅니다. **경계를 관찰하고, 허물고, 다시 세우는 시대**가 될 것입니다.

Plex는 이 두 개의 눈을 함께 가지려 합니다.

<div style="max-width:100%;overflow-x:auto" tabindex="0" role="region" aria-label="가로로 스크롤할 수 있는 표"><table><thead><tr><th>두 개의 눈</th><th>보는 것</th><th>Plex에서</th></tr></thead><tbody><tr><td>상유욕(常有欲) · 목적을 가진 눈</td><td>경계와 구체적인 현상(徼)</td><td>업무 명세, 권한과 통제 등급, 편집할 수 없는 영역을 분명히 하고 편집이 다른 곳으로 번지지 않게 막는다</td></tr><tr><td>상무욕(常無欲) · 비운 눈</td><td>본질과 작용(妙)</td><td>기록된 메시지와 실행 이력을 선입견 없이 관찰해, 미리 정한 틀 밖에 있는 일의 흐름과 새로운 연결을 발견한다</td></tr></tbody></table></div>

목적을 가진 눈만으로는 이미 그어진 선 안에 머물게 되고, 비운 눈만으로는 일을 맡길 수 없습니다. 경계를 분명히 보는 눈이 있어야 안전하게 허물 수 있고, 본질을 보는 눈이 있어야 올바른 곳에 다시 세울 수 있습니다.

산업(도메인)과 업무와 역할의 경계가 흐려지는 시대입니다. XGEN은 그 변화를 거대한 개편으로 한 번에 따라가기보다, **조직과 개인에게서 매일 일어나는 미시적인 변화에 발맞추고자 합니다.** 경계를 관찰하고, 필요한 곳은 허물고, 다시 세우는 일. 그것이 Plex가 지향하는 Editable XGEN의 마지막 모습입니다.


---

마지막 편에서는 실행의 경험이 자기 개선으로 이어지는 과정과 사업 모델의 변화를 살펴봅니다.

[← 이전 편: Orka — 고객의 일을 명세로 이해하다](/blog/xgen-journey-2-orca)

[다음 편: 자기 개선 — 실행이 쌓여 플랫폼이 되다 →](/blog/xgen-journey-4-evolution)

