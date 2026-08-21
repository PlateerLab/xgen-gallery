---
title: "What hospitals actually ask when they evaluate an AI platform"
description: "Questions from a hospital evaluating an AI platform — controlling sensitive data, querying the database in natural language, documents full of tables and charts, using the model the hospital picked, and letting business staff build agents."
date: "2026-07-15"
cover: /blog/hospital-ai-platform-questions.svg
thumb: /blog/hospital-ai-platform-questions-thumb.svg
author: "Plateer AI Labs"
category: "Industry Note"
kicker: "From a healthcare AI platform evaluation"
tags: ["Enterprise AI", "Agentic AI", "Healthcare", "Data security", "RAG", "AI governance"]
gated: true
draft: false
---

What kinds of questions come up once a hospital starts evaluating an AI platform?

A healthcare organisation holds data across clinical work and research as well as administration and corporate support. There are many kinds of documents, and the existing systems and databases are connected in complicated ways. Because personal and sensitive data is involved, deciding how far AI may be used calls for more caution than in most industries.

Plateer AI Labs recently **discussed the scope and delivery approach for XGEN with a partner evaluating an AI platform for a healthcare organisation**.

Setting the customer's specific business aside, the questions raised on the day show fairly clearly what a healthcare organisation weighs when it looks at an AI platform.

> **Can internal data be connected to AI safely?**
> **Should an agent be allowed to query the production database?**
> **Can it understand the tables and charts inside medical documents?**
> **Can we use the AI model the hospital has chosen?**
> **Can business staff build agents themselves?**
> **How will this be managed as agents and models multiply?**

How does XGEN answer these?

---

## How far can an agent handling sensitive data be controlled?

For an AI platform in a healthcare setting, security is a matter of the whole structure rather than an individual feature.

XGEN is built so that control policies can be applied to AI inputs and outputs through **PII protection** that detects and masks personal data, and a separate **guardrail model**.

Access to features is separated by user and role, and the models and resources an agent may use are likewise controlled by permission.

Alongside external commercial models, a private model deployed inside the customer's own environment can be connected.

In the end, a healthcare organisation needs to manage at the platform level **which users are allowed which data and models, and to what extent** — not simply whether AI can be used.

---

## Query the database in natural language, without handing AI every permission

One capability that drew a lot of interest was **text-to-SQL**.

Letting a user ask in natural language while AI finds and analyses the data can widen how a hospital uses its data considerably.

In XGEN, database connectivity can be configured as an agent tool, and where needed **MCP can connect external systems or data resources**.

What matters is separating connection from permission.

Even when an agent uses a database, query policy and access method can be controlled so it only operates within the permitted scope.

That is, **making data usable by AI and handing AI free rein over the database are designed differently.**

---

## For medical documents, OCR alone is not enough

The documents AI has to work with in a hospital do not contain text alone.

Tables, images, and charts sit together in a single document.

XGEN's document processing does not rely on plain OCR — depending on the document, it can use **parsing and vision language models (VLM)**.

It analyses the structure of text and tables, and uses a vision model for the visual information that ordinary character recognition cannot interpret.

In a real enterprise RAG setting in particular, **how accurately the source document is converted into structure and meaning** affects retrieval and answer quality as much as the LLM's own capability.

So XGEN treats document parsing not as simple preprocessing but as an area that determines the quality of the knowledge being built.

---

## Can the hospital use the model it chose?

Yes.

XGEN does not design agents around one particular LLM.

An **LLM model catalogue** lets several models be registered, and the model to use can be configured per agent or per user role. Embedding models can be added as needed.

Different work calls for different AI capability.

Since document retrieval and summarisation, data analysis, and complex reasoning need not share one model, the structure lets you choose per task, weighing capability, cost, and the security environment.

When a new model is adopted later or an existing one replaced, not tying the whole agent estate to a single model is the structure XGEN aims for.

---

## How do a hospital's existing systems become an agent's tools?

For an AI agent to carry out real work, it has to connect to the existing systems.

In XGEN, existing APIs and databases can be configured as **tools an agent can use**.

An external API can be registered for the agent to call, and MCP-based connections are supported. Where a company's existing data process or a specialised system has to be reached, the necessary part can be extended as a custom node.

The purpose of this structure is not to replace existing systems with an AI platform.

It is **to keep the systems and data currently in operation while connecting the functions an agent needs**.

In an environment like a hospital, running several systems built up over many years, that kind of integration matters especially.

---

## Can ordinary staff build agents?

XGEN does not limit agent building to professional developers.

On real deployments, designated owners in each department are trained to compose the agents their teams need.

That does not mean every user gets the same features and permissions.

Access can be separated by role — general user, agent developer, administrator — so that operational functions meant for administrators are not exposed to general users.

Business teams know their own work best.

So **combining their domain expertise with the platform's building environment, while keeping permissions and deployment inside the company's management structure**, is how XGEN is meant to be used.

---

## Operating agents matters as much as building them

While there are only a few agents, managing them individually is possible.

Once several organisations are building agents and connecting a range of models and data, the operating environment gets complicated.

XGEN is extending beyond agent building toward managing **models and resources, user permissions, the deployment process, and AI governance** on one platform.

LLMOps is part of that operating framework too.

By providing an environment where the usage and operating state of models and agents can be managed, the goal is to run AI as a shared IT resource for the company rather than as individual projects.

---

## A healthcare AI platform was never about picking one feature

Look through the questions raised on the day and a common thread appears.

They did not stop at confirming individual features — whether a chatbot could be built, whether RAG was supported.

**Data protection → document understanding → model selection → system integration → agent building → permissions and deployment → operations and governance**

They connected into one continuous flow.

If the AI work a hospital needs keeps growing, then rather than building a separate AI system each time, it needs a foundation where new models, data, tools, and agents can keep being added while staying under one common policy.

That is also why XGEN is designed as an **enterprise AI platform** rather than an individual AI agent.

---

## Field Report

What stood out on this occasion was how concrete the healthcare organisation's questions were.

> **"Can you connect our database?"**
> **"How is sensitive data controlled?"**
> **"Does it read the charts inside a document?"**
> **"Can we use the model we chose?"**
> **"Can business staff build agents too?"**

These are the questions that surface naturally once you move toward applying AI in a real enterprise environment.

And the same question can have a different answer at each organisation.

The data held, the existing systems, the AI infrastructure, the security policy, and the work to be supported all differ.

In that setting, XGEN aims to provide **a foundation that connects models, data, agents, and tools, with the security, permissions, and governance a company needs applied on top**.

If you are evaluating an AI platform for a healthcare organisation, a good starting point may be to look first at **how far your current data and systems should connect to AI** — before deciding which features to use.
