---
title: "AI agents in retail: from reading documents to carrying out the work"
description: "A discussion with H, a retail and media company, on adopting AI agents — connecting document OCR to usable business data, why product-code generation is a reasoning problem, when fine-tuning is not required, and how to carry a PoC into production."
date: "2026-06-23"
cover: /blog/retail-agent-document-to-execution.svg
thumb: /blog/retail-agent-document-to-execution-thumb.svg
author: "Plateer AI Labs"
category: "Industry Note"
kicker: "How AI agents apply on the retail floor"
tags: ["Agentic AI", "Enterprise AI", "OCR", "Document automation", "AI governance", "PoC"]
gated: true
draft: false
---

Retail companies still run a great deal of work that a person has to check and key in by hand.

Verifying the business registration certificate and bank passbook copy a merchant submits and registering them in the system, or reading product information and generating a product code that fits internal rules, are typical examples.

Plateer AI Labs recently discussed AI agent adoption and PoC options with **Company H**, a retail and media business.

The tasks Company H put forward were broadly two.

Having AI read merchant-submitted documents and turn them into data, and analysing product information to generate the right product and campaign codes.

The discussion went past "can AI do this task?" into model selection, OCR, security, infrastructure, agent operations, and life after the PoC — the questions any company actually adopting AI agents has to answer.

---

## 1. The goal of document OCR is not reading — it is turning documents into business data

The first PoC candidate was processing the documents merchants submit.

AI reads documents such as business registration certificates, bank passbook copies, and corporate seal certificates, extracts the information needed, and loads it into the database.

It is easy to think of this as an OCR project.

From the operator's point of view, though, OCR is only one step in the whole task.

**Document intake → reading → extracting the needed fields → structuring the data → validation → loading to the database**

Only when all of that connects does the actual workload go down.

Reading the characters on a business registration certificate correctly does not finish the job. You have to tell which value is the registration number, which is the trade name, which is the representative's name, and convert them into the data structure the company uses.

Where necessary, comparing and cross-checking information that appears across several documents becomes another step.

So when evaluating document AI for an enterprise, the question is not only "what is the OCR accuracy?" but also **"how reliably can what it read be turned into real business data?"**

---

## 2. Product-code generation is closer to a reasoning problem than an OCR problem

The second task was generating product and campaign codes.

A company's product code is often not a simple serial number — it reflects the characteristics of the product and the company's internal classification scheme.

So for AI to analyse product information and generate a code, it needs two capabilities.

First, it has to **classify** the product according to the existing scheme.

Second, where explicit information is not enough to decide, it has to **reason** from the product's attributes and context.

That is,

**Product information → interpretation → classification against the scheme → inferring the missing attributes → code generation**

This kind of work only means something when generative AI is combined with the company's existing business rules.

The point is to design the AI to judge within the classification scheme and operating rules the company has defined, rather than inventing codes on its own.

Seen this way, product-code generation is less a plain generative-AI feature and more **an agent problem that joins business rules to AI reasoning**.

---

## 3. Enterprise AI does not necessarily require fine-tuning

The discussion also covered model fine-tuning and building a domain-specific sLLM.

When applying AI to internal work, the first question is usually "don't we need our own model trained on our data?"

In a real environment, though, you have to account for the GPU and memory needed for training, dataset construction, a training and evaluation environment, and continuous model management.

In a constrained infrastructure environment in particular, using a proven open-source model and combining the company's data and business rules at the agent layer can be more practical than training a model directly.

In this discussion too, given the limited resources available, the direction proposed was to look first at using open-source models rather than separate fine-tuning.

What matters is not "do we own our own model" but **"how accurately can it carry out our work"**.

In enterprise AI, how the model, data, business rules, and systems are combined often matters more than owning the model itself.

---

## 4. Is one agent enough, or do you need a platform?

A question that comes up often at the PoC stage:

> "Can't we just build the one agent we need and use it?"

Looking at a single task, developing a standalone agent can seem simpler.

Once agents are applied to real work and the count starts to grow, the situation changes.

You have to manage who can create agents, which models and data they can reach, which version is running in production, who approved the deployment, and whether anything went wrong during execution.

Knowledge and tools built inside one agent may also need to be used by another.

So the role of a platform is not simply to provide a screen for building agents.

**Agent creation → sharing knowledge and tools → permissions → validation → deployment → monitoring → governance**

Its role is to connect all of that into one system.

That is why the need for a platform grows at the point where agents spread across the company, rather than when there are one or two.

---

## 5. Security is decided at the architecture stage, not after AI is adopted

For AI that handles internal documents, security is a substantial part of the discussion.

When processing business documents such as registration paperwork, it has to be clear which data goes to which model.

If public models are used, you need a network policy governing access from internal systems to external models, and control over which users and agents may use them.

For sensitive work, conversely, a private internal model can be considered.

On top of that sit platform-level controls: personal-data detection and protection, guardrails, user permissions, and resource control.

In the end, enterprise AI security is not a matter of choosing **public LLM or private LLM**.

**Data → Model → Agent → User → System**

It is an architecture problem: controlling what information moves across that whole flow, and who is allowed to execute what.

---

## 6. Can business teams build agents themselves?

Company H also asked whether non-developers could build agents directly.

As enterprise AI spreads, having the development organisation build every agent runs into a limit.

The people who understand the work best are the ones doing it.

In a financial-sector project Plateer is running, designated owners in each department are trained to compose the agents their teams need.

That does not mean handing unlimited agent-development rights to every employee.

The practical approach looks like

**Provide the platform → designate owners → train → business teams build agents → validate and approve → deploy**

The point is to carry the business team's domain expertise and the IT and governance organisation's controls together.

---

## 7. A good PoC should not be thrown away in the main project

Another part this discussion treated as important was what happens after the PoC.

If the agent built for a PoC has to be developed again for the main project, much of the asset and know-how created during validation disappears.

So it is worth considering the transition to production from the earliest PoC stage.

Here too, we looked at carrying the agent developed in the PoC onto the platform when XGEN is adopted later, and continuing to use it.

That makes the purpose of a PoC different from a technical demo.

**PoC → validation → refinement → onto the platform → operations → rollout**

What matters in a PoC is less an impressive demo than the question **"can we take this result into the real operating environment?"**

---

## Four things this discussion left us with

Four points stood out as particularly important for AI agent adoption in retail.

**① Look at the end-to-end task, not just OCR.**
Reading the document matters less than connecting the extracted information through structuring and validation into the existing system — that is where the work actually gets automated.

**② Not every company needs its own model.**
Depending on infrastructure and operating conditions, using a proven model and combining the company's data, rules, and tools with the agent can be the more practical choice.

**③ As the number of agents grows, you need a platform.**
Scaling across the company means handling permissions, sharing, deployment, monitoring, and governance — not only agent creation.

**④ Plan for the move to production from the PoC stage.**
Rather than ending a PoC as a one-off demo, design the structure from the start so the validated agent and task design carry into the main project.

---

## Field Report

The questions from this discussion all pointed in one direction.

Companies have started asking **"how do we put this into our work?"** rather than "what can AI do?"

OCR that reads documents, AI that classifies products, LLMs that infer from information — each technology matters.

But in real operations these do not work apart from one another.

Read the document, extract what is needed, judge against the company's rules, reflect the result in the existing system, and manage every step of that under permissions and governance — only then is one piece of work complete.

So the next competitive edge in enterprise AI may lie less in picking one better model than in

**building a structure where AI can judge and act safely inside the company's real business processes**.
