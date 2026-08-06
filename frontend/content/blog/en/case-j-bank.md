---
title: "Bank J — a finance-specific AI chatbot that shows its sources"
description: "Bank J wanted more than an FAQ bot: an AI tied into internal systems that cites the basis for every answer. A PoC building RAG and a specialized sLLM reached a high accuracy rate and proved the bank could build finance-specific AI on its own terms."
date: "2026-06-03"
author: "Plateer Labs"
category: "Case Study"
tags: ["Finance", "RAG", "sLLM", "AI chatbot", "Case Study"]
cover: "/blog/case-j-bank.svg"
draft: false
---

**Bank J**, a regional financial institution, ran a PoC building an AI chatbot with **RAG and a bank-specific sLLM**, reached a high accuracy rate, and demonstrated it has the capability to build finance-specific AI. The point was never a plausible answer — it was **an answer that can show its basis**.

## In finance, the barrier for a chatbot was trust

The problems Bank J faced will be familiar to anyone in banking.

- There was **no AI service** wired into internal systems
- The customer-facing chatbot stayed at **the level of a simple FAQ**, reflecting neither real services nor operational information
- What was needed went past conversation: **an LLM-based AI agent with security built in**

In finance, a wrong answer is not a simple error — it is a trust problem. So the first principle we set was an AI that **says it does not know when it does not, and shows its basis when it does**.

## Finance-specific AI, built on data sovereignty

**Live financial data** — embedded in the banking system inside the enterprise ERP, so it works from live financial data rather than a static FAQ.

**RAG and a specialized sLLM** — retrieval-augmented generation over Bank J's own data, together with a specialized sLLM, raised answer accuracy. It also reads financial visuals such as tables and charts, which makes it well suited to data analysis.

**Sources on every answer** — each answer carries the source it rests on, which raises confidence in the response and keeps compliance intact. Even for regulation-sensitive questions — limits by collateral type, for instance — it shows which material the answer came from.

**Multi-agent orchestration** — customer response, internal lookup, and risk management are split across several agents and automated. All of it runs on a **custom on-premise MLOps environment**, inside the internal network, so data never leaves.

## What the PoC proved

- RAG, cited sources, and multimodal support raised **answer quality**
- Building inside the internal network strengthened **security and compliance**
- ERP and banking integration **simplified the work process**
- The customer-facing chatbot automated repetitive work and made **real-time response** possible

Above all, the PoC showed quantitatively that finance-specific AI can be built **without giving up data sovereignty**. Evidence-based answers and closed-network operation are design principles we have held to consistently in our [Enterprise AI architecture](/en/architecture).

## If you are weighing AI in a regulated industry

In an industry where trust and security come first — finance, the public sector — an AI that cites its sources is the starting point. The approach is in [Applied AI · certification and quality](/en/solutions), and related cases are below.

- Actionable AI handling public procurement → [Public agency K's SRM AI chatbot](/en/blog/case-k-corp)
- RAG over multimodal data → [Company S](/en/blog/case-s-corp)

If you want to test it against your own regulations and data, get in touch through [PoC and technical consultation](/en/contact).
