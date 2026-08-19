---
title: "XGEN을 위한 Jaeger 도입기: Envoy 사이드카부터 OTel Auto Instrumentation까지"
description: "XGEN 서비스 이전과 함께 Jaeger Tracing을 도입하며, Envoy 사이드카의 한계를 넘고 OpenTelemetry Auto Instrumentation으로 분산 추적을 구성한 과정을 정리합니다."
date: "2026-08-18"
author: "전인수"
authorGithub: "mumberrymountain"
category: "Tech Note"
tags: ["Jaeger", "OpenTelemetry", "Envoy", "Observability", "Kubernetes", "XGEN"]
draft: false
---

L홈쇼핑 프로젝트에서 신규 서버로 XGEN 서비스를 이전하며 새로운 솔루션을 도입해봤습니다. 바로 Jaeger Tracing입니다.

일반적으로 관측 가능성에서 원격 측정 신호의 세 가지 유형으로 Metric, Log, Trace가 꼽히는데, 이중에서도 Trace는 개중에서는 비교적 근래 추가된 원격 측정 신호 유형입니다. Metric이 '지금 시스템이 어떤 상태인지'를 보여주고, Log가 '어떤 일이 일어났는지'를 보여준다면, Trace는 '그 일이 어떤 경로로, 어디서 지연되며 일어났는지'를 보여줍니다.

예를 들어 MSA 아키텍쳐 상에서 /example이라는 api가 있고, 이 api가 A -> B -> C 서비스를 관통한다고 가정해보겠습니다. Trace를 관측하면, /example API에 병목이나 에러가 발생하더라도 A, B, C 중 어느 지점이 원인인지 훨씬 명확하게 판정할 수 있습니다.

처음 도입하는 만큼 실무적으로 모범적인 형태와는 다소 괴리가 있을 수 있을 수 있지만, 병목 지점 분석에 Trace를 실제로 활용해보고, 향후 신규 프로젝트에서 더 실무적으로 사용할 수 있는 아키텍처로 발전시키는 걸 목표로 Jaeger를 도입했습니다.

## Envoy 사이드카 기반 분산 추적의 한계

일단은 XGEN 서비스 파드에 이미 Envoy 사이드카가 주입되어 있는 만큼 Envoy의 Span만으로 분산 추적을 구현하고자 했습니다. 이를 위해 Jaeger에 Zipkin receiver를 연결하고, mesh tracing provider를 zipkin으로 설정했습니다. 하지만 익히 알려져 있다시피 문제가 많은 방법이었습니다.

```text
Service & Operation

istio-ingressgateway.istio-system
└─ xgen-backend-gateway.xgen.svc.cluster.local:8000/api/*          200
   └─ xgen-backend-gateway.xgen
      └─ xgen-backend-gateway.xgen.svc.cluster.local:8000/api/*    200 POST
         └─ xgen-backend-gateway.xgen
            └─ xgen-workflow.xgen.svc.cluster.local:8000/*         200 POST  22.0ms
               └─ xgen-workflow.xgen
                  └─ xgen-workflow.xgen.svc.cluster.local:8000/*   200 POST  20.8ms
```

일단 **가독성**이 문제였습니다. Envoy는 어플리케이션 레벨에서 계측을 진행하지 않고, 프록시 레벨에서 스팬 단위를 생성합니다. 따라서 Operation명이 `/api/*`와 같은 수준에 머무를 뿐 애플리케이션 레벨의 구체적인 Span이 드러나지 않았습니다. 결과적으로 "어떠한 API가 실제로 무엇을 했는지"를 파악하기 용이하지 않았습니다.

더 큰 문제는 **Trace Context가 전파되지 않는다는 데** 있었습니다. Envoy는 자신이 처리한 요청 구간에 대해서만 Span을 생성할 뿐, 해당 Trace Context를 애플리케이션 코드로 전달해주지는 않습니다. 따라서 요청이 A → B → C를 거치더라도 서비스 경계마다 Trace가 끊겨, 분산 추적의 연속성이 보장되지 않는 문제가 있었습니다. A → B 와 B → C가 별개로 기록되는 식으로.

## Trace Context 전파 방안

### 코드에 직접 삽입하기

Trace Context 전파 문제에 관한 해결방안으로 여러가지를 생각해볼 수 있습니다. 예전에 수강했던 강의에서 코드 레벨에서 헤더를 전파하는 로직을 직접 삽입해 이 문제를 해결했다는 사례를 들은 적이 있습니다. 하지만 이 방식은 운영 중인 모든 서비스에 헤더 전파 로직을 일일이 추가해야 하는 데다, 개발자가 아닌 입장에서 기존 코드에 손을 대는 데 따르는 오버헤드와 사이드 이펙트에 대한 우려가 있어 좋은 방법은 아니라고 판단했습니다.

### Beyla eBPF로 무계측 수집하기

eBPF는 Zero Code 계측 방법론 중에서도 최근 가장 주목받는 방식으로, 애플리케이션 프로세스 내부에 개입해 바이트코드를 조작하는 Auto-instrumentation Agent와 달리 커널 레벨에서 트래픽을 관찰해 Span을 생성한다는 차이가 있습니다. 검토 결과 Beyla는 인커밍 요청의 traceparent 헤더를 읽고 아웃바운드 요청에 주입하는 BEYLA_BPF_TRACK_REQUEST_HEADERS 옵션을 제공하고 있어, Trace Context 전파 문제에 대한 직접적인 대안이 될 수 있었습니다.

```bash
Found incompatible Linux kernel, disabling trace information parsing
```

하지만 예상치 못한 문제에 부딪혔는데, 서버에서 사용 중인 RHEL의 4.18 커널이 이 기능과 제대로 호환되지 않는 것이었습니다. 결과적으로 이 방식 역시 사용할 수 없었습니다.

### OpenTelemetry Auto Instrumentation 적용하기

결과적으로 OpenTelemetry가 지원하는 Zero Code Instrumentation 방식 중, 애플리케이션 프로세스 내부에 개입해 바이트코드를 조작하는 Auto Instrumentation을 채택했습니다. Helm으로 OTel Operator를 설치하고, XGEN 네임스페이스에 `instrumentation.opentelemetry.io/inject-python=true` 어노테이션을 추가하면 Operator가 이를 감지해 Python 애플리케이션 파드에 계측 코드를 자동으로 주입해줍니다.

```text
Service & Operation

istio-ingressgateway.istio-system
└─ egress GET
   └─ xgen-backend-gateway
      └─ ingress 200 GET
         └─ xgen-backend-gateway
            └─ egress xgen-core:8000 200 GET
               └─ xgen-core
                  └─ ingress 200 GET
                     └─ xgen-core
                        └─ GET /api/admin/agent-token/usage 200 GET
                           ├─ xgen-core  SELECT  postgresql
                           ├─ xgen-core  SELECT  postgresql
                           └─ ...
```

이 방식은 애플리케이션 프로세스 내부에서 직접 계측이 이루어지는 만큼, FastAPI 라우트나 DB 쿼리 같은 구체적인 애플리케이션 레벨 Span이 생성되어 가독성 문제를 해결할 수 있었고, OTel SDK가 표준 방식으로 Trace Context를 요청 간에 자동으로 전파해주기 때문에 Envoy 사이드카에서 겪었던 서비스 경계 간 Trace 단절 문제도 함께 해소할 수 있었습니다.
