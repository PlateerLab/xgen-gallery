---
title: "XGEN DeX — Enterprise AI를 데스크톱까지 잇는 실행 계층"
description: "AI Agent는 서버에서 실행되고, 사용자는 자기 데스크톱에서 그 Agent와 일합니다. 중앙 통제는 그대로 두고 업무 방식만 바꾸지 않는 연결 방식을 소개합니다."
date: "2026-08-07"
cover: /blog/product-xgen-dex.svg
author: "Plateer Labs"
category: "제품 소식"
tags: ["XGEN DeX", "Desktop Experience", "Agentic AI", "온프레미스", "제품"]
draft: true
---

**한 줄 요약 —** XGEN DeX는 데스크톱에서 AI를 실행하는 제품이 아닙니다. 온프레미스 XGEN Server에서 돌아가는 Agent와 사용자의 데스크톱을 안전하게 잇는 커넥터입니다.

Enterprise AI는 더 이상 질문에 답하는 챗봇이 아닙니다. 업무를 이해하고, 기존 시스템에 연결되고, 사용자를 대신해 실제 작업을 수행하는 Agent로 옮겨가고 있습니다.

그런데 업무의 출발점은 여전히 데스크톱입니다. 사내 시스템에 로그인하고, 로컬 문서를 열고, Excel과 PowerPoint를 고치고, 기업 전용 애플리케이션을 씁니다. AI가 그 업무를 실제로 수행하려면 결국 이 데스크톱과 이어져야 합니다.

## 서버에서 실행되고, 데스크톱에서 이어진다

XGEN DeX(Desktop Experience)의 설계 전제는 하나입니다. **Agent는 서버에 두고, 연결만 데스크톱으로 내린다.**

AI Agent는 기업의 온프레미스 XGEN Server에서 실행되고 관리됩니다. 사용자는 자기 데스크톱 환경에서 그 Agent와 협업합니다. 기업은 AI를 중앙에서 통제하고, 사용자는 쓰던 방식을 바꾸지 않습니다.

개인 PC마다 AI를 설치하는 방식과는 반대 방향입니다. Agent가 특정 PC에 묶이지 않기 때문에, 사용자가 어느 PC에서 접속하든 같은 Agent가 하던 일을 이어받습니다.

<figure style="margin:2.5rem 0">
<svg viewBox="0 0 720 300" width="100%" role="img" aria-label="사용자 데스크톱 환경이 XGEN DeX 커넥터를 통해 XGEN Server Agent로 연결되고, Agent는 다시 로컬 앱·클라우드 스토리지·사내 시스템으로 이어지는 구조" xmlns="http://www.w3.org/2000/svg" style="max-width:680px;display:block;margin:0 auto;font-family:'Pretendard',system-ui,-apple-system,sans-serif">
<defs>
<linearGradient id="dexG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7bff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient>
</defs>
<rect x="255" y="16" width="210" height="46" rx="12" fill="#fff" stroke="#d4ddf2" stroke-width="1.5"/>
<text x="360" y="38" text-anchor="middle" font-size="14" font-weight="700" fill="#16203a">Local Environment</text>
<text x="360" y="54" text-anchor="middle" font-size="11.5" fill="#6b7688">사용자 데스크톱</text>
<path d="M360 62 L360 84" stroke="#c2cad8" stroke-width="2"/><path d="M354 78 L360 85 L366 78" fill="none" stroke="#c2cad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="245" y="88" width="230" height="50" rx="13" fill="url(#dexG)"/>
<text x="360" y="112" text-anchor="middle" font-size="14.5" font-weight="700" fill="#fff">XGEN DeX Connector</text>
<text x="360" y="128" text-anchor="middle" font-size="11.5" fill="#ffffffcc">데스크톱 ↔ 서버 브리지</text>
<path d="M360 138 L360 160" stroke="#c2cad8" stroke-width="2"/><path d="M354 154 L360 161 L366 154" fill="none" stroke="#c2cad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="245" y="164" width="230" height="50" rx="13" fill="#16203a"/>
<text x="360" y="188" text-anchor="middle" font-size="14.5" font-weight="700" fill="#fff">XGEN Server Agent</text>
<text x="360" y="204" text-anchor="middle" font-size="11.5" fill="#ffffff99">온프레미스에서 실행·관리</text>
<path d="M360 214 L360 232 M140 232 L580 232 M140 232 L140 250 M360 232 L360 250 M580 232 L580 250" stroke="#c2cad8" stroke-width="2" fill="none"/>
<path d="M134 244 L140 251 L146 244 M354 244 L360 251 L366 244 M574 244 L580 251 L586 244" fill="none" stroke="#c2cad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="60" y="254" width="160" height="38" rx="10" fill="#f3f7ff" stroke="#cfe0ff"/>
<text x="140" y="278" text-anchor="middle" font-size="12.5" font-weight="600" fill="#2461d8">Local Applications</text>
<rect x="280" y="254" width="160" height="38" rx="10" fill="#f3f7ff" stroke="#cfe0ff"/>
<text x="360" y="278" text-anchor="middle" font-size="12.5" font-weight="600" fill="#2461d8">Cloud Storage</text>
<rect x="500" y="254" width="160" height="38" rx="10" fill="#f3f7ff" stroke="#cfe0ff"/>
<text x="580" y="278" text-anchor="middle" font-size="12.5" font-weight="600" fill="#2461d8">Enterprise Systems</text>
</svg>
</figure>

## 데스크톱의 무엇을 잇는가

XGEN DeX는 데스크톱의 자원을 세 갈래로 나눠 Agent에 연결합니다.

**Local Environment** — 사용자의 작업 환경을 Agent가 이해하고 활용하도록 잇습니다.

**Local Directory** — 로컬 디렉터리와 XGEN Cloud Storage를 연결해, 문서와 파일을 옮겨 붙이는 과정 없이 그대로 씁니다.

**Local Applications** — Excel, PowerPoint, 브라우저, 기업 전용 애플리케이션처럼 데스크톱에서 실행되는 프로그램을 Agent와 연결해 업무 자동화를 지원합니다.

## 업무가 어떻게 달라지나

데스크톱과 서버가 하나의 AI 경험으로 이어지면, 직군마다 다른 지점에서 이득이 생깁니다.

- **개발자**는 프로젝트 전체를 이해하는 AI와 함께 개발합니다
- **기획자**는 사내 문서를 근거로 제안서를 씁니다
- **영업**은 고객 자료를 연결해 맞춤 제안을 준비합니다
- **현업**은 반복 업무를 Agent에게 넘기고 판단이 필요한 일에 집중합니다

공통점은 하나입니다. 쓰던 도구를 버리지 않아도 된다는 것.

## 중앙 통제는 그대로

데스크톱까지 범위를 넓히면 통제가 느슨해지는 것 아니냐는 질문이 먼저 나옵니다. XGEN DeX는 기업이 이미 세워둔 운영 원칙을 그대로 둡니다.

| 원칙 | 내용 |
|---|---|
| Server-Centric Agent Architecture | Agent는 XGEN Server에서 실행되고 중앙에서 관리됩니다 |
| Enterprise Security | 기존 인증·권한·감사 정책을 그대로 유지합니다 |
| Persistent Agent Experience | 접속하는 데스크톱이 달라져도 같은 Agent가 업무를 이어갑니다 |
| Desktop Connectivity | 로컬 파일·데스크톱 애플리케이션·사내 시스템을 하나의 Agent 경험으로 잇습니다 |

## 곧 공개합니다

XGEN DeX는 현재 연구소에서 개발 마무리 단계에 있습니다.

단순한 데스크톱 연결 도구가 아니라, Enterprise AI와 사용자의 데스크톱을 하나의 업무 경험으로 잇는 실행 계층(Execution Layer)으로 보고 있습니다.

AI의 경쟁은 모델 성능만으로 결정되지 않습니다. 기업이 기존 업무 환경을 유지하면서 AI를 얼마나 자연스럽게 쓸 수 있는가가 다음 경쟁력이라고 봅니다. XGEN DeX는 그 경험을 완성하기 위한 첫 번째 Desktop Experience 플랫폼입니다.

XGEN DeX의 공개 일정과 상세 기능은 블로그를 통해 순차적으로 소개할 예정입니다. 제품 데모나 도입 상담을 원하시면 언제든 [문의해 주세요](/contact).
