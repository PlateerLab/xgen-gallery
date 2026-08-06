---
title: "GS 인증으로 검증된 XGEN, Enterprise AI 핵심 기능"
titleEn: "Inside GS-certified XGEN: the capabilities that matter for Enterprise AI"
description: "TTA GS 인증 시험을 통해 검증된 XGEN Agentic AI Platform의 핵심 기능을 소개합니다. AI Agent 개발, 시스템 연동, GraphRAG 기반 지식 관리, AI 거버넌스 등 주요 기능이 국제표준 품질 시험을 통과했습니다."
descriptionEn: "XGEN earned Grade 1 GS certification, Korea's highest national software quality grade. Here is what the platform actually does — the node canvas, the headless engine, knowledge and tools, and the governance layer around them."
date: "2026-08-05"
cover: /blog/product-xgen-v1.svg
author: "Plateer Labs"
category: "제품 소식"
tags: ["XGEN", "Agentic AI", "GS인증", "GraphRAG", "AI 거버넌스", "Enterprise AI"]
draft: false
---

**XGEN Agentic AI Platform**은 AI Agent 개발부터 시스템 연동, GraphRAG 기반 지식 관리, AI 거버넌스까지 Enterprise AI 플랫폼의 핵심 기능을 갖춘 제품이며, 공인시험기관 TTA의 GS 인증 시험에서 국제표준(ISO/IEC 25023, ISO/IEC 25051) 기준의 품질 시험을 통과했습니다.

[지난 글](/blog/gs-certification-grade1)에서는 XGEN Agentic AI Platform이 GS(Good Software) 인증 1등급을 획득하기까지의 과정과, [시험 과정에서 발견된 개선 사항을 어떻게 해결했는지](/blog/series/gs-cert) 소개했습니다.

이번에는 조금 다른 이야기를 해보려 합니다.

GS 인증은 단순히 제품을 설치해 보는 절차가 아닙니다. 공인시험기관인 한국정보통신기술협회(TTA)가 국제표준(ISO/IEC 25023, ISO/IEC 25051)에 따라 제품의 기능과 품질을 직접 검증하는 과정입니다.

그렇다면 TTA는 XGEN의 어떤 기능을 실제로 확인했을까요?

이번 글에서는 시험을 통해 검증된 기능을 중심으로 XGEN Agentic AI Platform의 핵심 기능을 소개합니다.

---

## AI Agent를 직접 설계하고 운영하는 플랫폼

기업의 AI는 더 이상 단순한 챗봇이 아닙니다.

업무를 이해하고, 여러 시스템과 연결되며, 반복 업무를 자동화하는 **AI Agent**가 새로운 업무 방식으로 자리 잡고 있습니다.

XGEN은 이러한 AI Agent를 개발자뿐 아니라 현업 사용자도 직접 설계하고 운영할 수 있도록 지원합니다.

TTA 시험에서는 **42종의 핵심 Agent Node**가 정상적으로 동작하는 것을 확인했습니다.

주요 기능은 다음과 같습니다.

* Agent Workflow 설계
* MCP 및 Agent 연동
* API·문서 처리 노드
* 조건 분기 및 반복 실행
* Prompt Template 관리
* Agent Template 관리
* 테스트 및 배포

반복적으로 사용하는 Agent는 템플릿으로 저장하여 조직 전체에서 재사용할 수 있으며, AI 서비스의 확산과 표준화를 지원합니다.

---

## 기존 업무 시스템과 연결되는 Enterprise AI

기업의 AI가 실제 업무를 수행하려면 ERP, 그룹웨어, 데이터베이스 등 기존 시스템과의 연동이 필수입니다.

XGEN은 다양한 시스템을 연결하고 안정적으로 운영할 수 있도록 다음 기능을 제공합니다.

* REST API 등록 및 관리
* JSON 기반 API 정의
* API Library 관리
* Database 연결 관리
* 인증 정보 관리
* 연결 테스트

특히 연결 정보를 등록하기 전에 테스트를 수행할 수 있어 운영 과정에서 발생할 수 있는 연동 오류를 사전에 확인할 수 있습니다.

---

## 기업 문서를 AI 지식으로 활용하는 Knowledge Platform

생성형 AI의 답변 품질은 기업 내부의 지식을 얼마나 정확하게 활용하는지에 따라 달라집니다.

XGEN은 다양한 문서를 지식 컬렉션으로 관리하고 RAG 기반 AI 서비스를 구축할 수 있도록 지원합니다.

지원 문서 형식은 다음과 같습니다.

* PDF
* Word
* Excel
* PowerPoint
* TXT
* HWP / HWPX

문서 업로드뿐 아니라 청크 설정과 변경 이력까지 함께 관리하여 운영 과정의 추적성과 관리 효율성을 높였습니다.

---

## GraphRAG 기반의 고도화된 지식 검색

기업 업무에서는 단순한 키워드 검색만으로 충분하지 않은 경우가 많습니다.

XGEN은 Knowledge Graph와 [GraphRAG](/blog/series/ontology)를 활용하여 문서 간의 관계와 의미를 함께 분석합니다.

시험에서는 다음 기능이 정상적으로 동작하는 것을 확인했습니다.

* Ontology Build
* Knowledge Graph 생성
* GraphRAG 질의응답
* 그래프 조회
* 답변 생성 과정 확인

이를 통해 보다 정확한 지식 검색과 답변의 근거를 확인할 수 있는 환경을 제공합니다.

---

## Enterprise AI 운영을 위한 거버넌스

AI 플랫폼은 구축보다 운영이 중요합니다.

XGEN은 기업 환경에서 필요한 운영과 관리 기능을 함께 제공합니다.

주요 기능은 다음과 같습니다.

* 사용자 및 권한 관리
* 메뉴 접근 권한 관리
* LLM 관리
* Embedding Model 관리
* Reranker 관리
* Vector Database 관리
* Agent 사전 검증
* 시스템 로그 관리
* 서버 자원 모니터링
* 사용자 피드백 관리

또한 상용 LLM뿐 아니라 온프레미스 환경의 sLLM까지 유연하게 적용할 수 있도록 모델을 독립적으로 관리합니다.

---

## GS 인증에서 검증된 소프트웨어 품질

TTA는 XGEN을 국제표준에 따라 다음 9개 품질 특성으로 시험했습니다.

* 기능적합성
* 성능효율성
* 호환성
* 사용성
* 신뢰성
* 보안성
* 유지보수성
* 이식성
* 일반 요구사항

시험 과정에서 확인된 개선 사항은 모두 수정과 회귀시험을 거쳤으며, 최종적으로 **결함 0건** 상태를 확인했습니다.

이는 XGEN이 기업 환경에서 요구되는 소프트웨어 품질 기준을 충족했음을 의미합니다.

> ※ GS 인증의 보안성 평가는 소프트웨어 품질 관점의 시험이며, 정보보호 인증이나 소스코드 보안 진단을 대체하는 것은 아닙니다.

---

## Enterprise AI를 위한 검증된 플랫폼

생성형 AI를 기업 업무에 적용할 때 중요한 것은 최신 AI 모델을 선택하는 것만이 아닙니다.

AI를 안전하게 운영하고, 기존 시스템과 연결하며, 조직 전체에서 지속적으로 활용할 수 있는 플랫폼이 필요합니다.

이번 GS 인증은 XGEN이 이러한 Enterprise AI 플랫폼으로서 요구되는 기능과 품질을 객관적으로 검증받았다는 의미를 갖습니다.

지금 이 순간에도 플래티어 랩스는 80개가 넘는 Agent Node 개발부터 시스템 연동, 지식 관리, AI 거버넌스까지 [Enterprise AI 구축과 운영](/product)에 필요한 기능을 지속적으로 고도화하고 있습니다
