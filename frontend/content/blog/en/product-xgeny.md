---
title: "XGeny — from an AI that answers to an AI agent that works"
description: "The XGEN agent takes another step forward. XGeny is a new agent runtime with memory and a workspace of its own, able to find the tools it needs — and build them when they do not exist — to carry work forward."
date: "2026-08-19"
cover: /blog/product-xgeny.svg
author: "Plateer Labs"
category: "Product news"
tags: ["XGeny", "Agentic AI", "Progressive Disclosure", "Tool Search", "Workspace", "Product"]
draft: false
faq:
  - q: "Is XGeny a separate product from XGEN?"
    a: "No. XGeny is a new agent runtime used inside XGEN. You still build agents on the XGEN Canvas the way you always have; what is extended is the execution structure and the capabilities that come as standard."
  - q: "What is the biggest difference from the existing XGEN agent?"
    a: "Memory, Workspace, Tool Search & Creation, and Schedule are provided as the default runtime. The significant change is that the agent finds the tools it needs and, where necessary, builds them itself."
  - q: "Does this mean existing agents can no longer be used?"
    a: "No. XGeny does not replace the way you build agents today. It is an additional runtime for cases in XGEN that call for more autonomous execution."
  - q: "Is the avatar required?"
    a: "No. The avatar is optional. What matters in XGeny is not the avatar but the runtime that lets work continue on top of memory and a workspace."
  - q: "How do XGEN DeX and XGeny differ?"
    a: "XGeny covers how an agent works and the runtime it works in; XGEN DeX connects the agent to the user's local working environment. Used together, they extend the agent's reach as far as the local machine."
---

**The XGEN agent takes another step forward. XGeny is a new agent runtime with memory and a workspace of its own, able to find the tools it needs — and build them when they do not exist — to carry work forward.**

---

## For an AI agent to go beyond answering and actually do the work

The range of what enterprises ask of AI is widening quickly.

Where early generative AI concentrated on understanding a question and producing a fitting answer, enterprises now expect AI to draw on internal knowledge and systems to **carry out work across several steps and produce the deliverable at the end**.

Real work, though, does not finish in a single question and answer.

It has to remember what was done before, find the material it needs, and choose the right tool for the task. Sometimes a new tool is required, and the files and results produced along the way have to be kept so the next piece of work can use them again.

XGEN is preparing a new agent runtime, **XGeny**, for exactly this shift.

> **XGeny aims beyond an agent that answers questions — toward an agent that keeps working in a space of its own, drawing on the resources and tools it needs.**

The way you build an agent on the XGEN Canvas stays as it is, while **Memory, Workspace, Tool Discovery & Creation, and Schedule** come as the default runtime.

---

## What changes?

Existing agents were built around carrying out given work with predefined knowledge and tools.

If a new task called for a tool that was not there, a developer had to connect an API or compose a new tool and attach it to the agent.

XGeny changes that structure.

| Existing XGEN agent | XGeny (Agent) |
|---|---|
| Capabilities configured up front | Starts with a default runtime |
| Works from the tools it was given | Searches for the tools it needs |
| A missing tool means a developer adds it | Builds and tests the tool itself |
| Session-bound work | Results and assets accumulate in the workspace |
| Memory configured separately when needed | Memory provided as standard |
| Execution driven by requests | Schedule-based execution supported |

The core change is not that a few capabilities were added.

It is the move **from "people prepare everything the agent needs to work in" to "the agent extends the environment it needs as it works."**

---

## 1. Memory that carries the context of the work

Enterprise work does not start from scratch every time.

What was requested before, the criteria a deliverable was built to, what was checked along the way — all of it is important context for the next piece of work.

For that continuity, XGeny **includes memory in the default runtime**.

Without wiring up a separate memory node each time, it accumulates what matters from conversation and from the work itself, and is designed to find and use the relevant memory in later work.

The goal is to develop the agent beyond a one-off question-and-answer tool into **a continuing support environment that carries the context of the work**.

---

## 2. A workspace of its own for each agent

One of the most important changes in XGeny is that **the agent has its own workspace**.

The workspace is an independent space in which the agent does its work.

Documents the agent produced, material it organised along the way, tools it newly built — these assets are kept in the workspace and are available again in later work.

Suppose you ask an agent for market research and a report.

The agent can gather the material, analyse it, and produce the report. The work does not end there: the material and the deliverable stay in the workspace, ready for follow-up analysis or an update to the report.

In other words, a structure that ended at

**request → execution → result returned**

extends into

**request → execution → result produced → assets accumulated → reused in the next piece of work**.

---

## 3. It finds the tools it needs

The tools available to an agent in an enterprise can only grow.

ERP, CRM, groupware, databases, search, email, document authoring — the more systems are connected, the more the tools available to an agent grow, from dozens to hundreds or thousands.

Handing the agent every tool's details at all times is not efficient.

For this, XGeny applies **Tool Search & Discovery**.

Rather than presenting every tool up front, the agent searches for and selects the tools the current task calls for.

For example, given a request like

> "Analyse last month's sales performance and put together a report."

the agent finds the data-query tool and the document-authoring tool it needs as the work proceeds.

The aim is a structure where, however many tools become connectable, the agent stays focused on the resources the work at hand actually needs.

---

## 4. If the tool does not exist, it can build one

XGeny goes a step further.

Where a task needs a tool that does not already exist, **the agent can build and test that tool itself**.

Given a request like

> "Build me a tool that queries this data and summarises it daily."

XGeny produces the code it needs, checks the result of running it, and composes it into a usable tool.

The tool it builds is kept in the workspace and is available again in later work.

In an enterprise setting, of course, what matters is less that an agent can run anything at will and more that **the scope of what it may create and execute is controlled**.

So this autonomy is being developed to work within what the enterprise permits, combined with XGEN's existing permission, security, and governance framework.

---

## 5. Progressive disclosure — taking out only what is needed

One principle runs through the whole of XGeny's design.

**Not all information is given to the agent up front.**

The approach is described as **progressive disclosure**.

Having a thousand tools does not mean handing over the details of a thousand tools at once; the agent searches for the tool it needs and uses that.

Files, likewise, are not handed over in full — the agent takes in the structure and goes to the part it needs.

Memory is designed the same way: rather than always drawing on everything accumulated, the agent finds what the current work requires.

> **Not making it remember everything, but making it good at finding what it needs.**

The more data and systems an agent connects to in an enterprise setting, the more this approach matters.

XGeny aims at a structure where, even as the resources available to the agent grow, it can efficiently find the information and tools it needs and carry the work forward.

---

## 6. Schedule — doing the work at a set time

Enterprise work is full of things that have to be done repeatedly.

Checking data every morning, collating performance figures every week, producing a report on a set cycle — these are typical.

For work like this, XGeny **provides scheduling as standard**.

Rather than repeating the same request to the agent every time, you can set it up to carry out the work at a defined point.

For example, uses like these become possible:

- A morning check and summary of key management indicators
- Weekly collation of sales performance and a report
- Regular data checks with the results written up
- Recurring collection and analysis of material

It is the basis for an agent to grow **from a tool waiting on requests into an actor that keeps carrying out defined work**.

---

## Meet XGEN DeX, and the agent's working space reaches the PC

Where XGeny extends **what an agent can do**, [XGEN DeX](/en/blog/product-xgen-dex) extends **how far the working environment reaches**.

XGEN DeX safely connects an XGEN agent to the local resources on a user's PC.

With both in place, the agent can draw not only on the data and systems in the server environment but, within what is permitted, on the user's local working environment as well.

If a user asks

> "Tidy this material into a document and save it to the work folder on my PC."

then **XGeny** understands the task and carries it out with the tools it needs, while **XGEN DeX** connects the server-side agent to the user's local environment.

Put simply, the difference in role is this:

**XGeny = how the agent works**

**XGEN DeX = how far the agent can work**

---

## Starting from the XGEN Canvas stays the same

Using XGeny does not mean learning an entirely new way to build agents.

Creating an agent and designing the work on the XGEN Canvas stays as it is.

What changes is how the agent carries out that work behind the scenes.

Keeping the strengths of the existing XGEN agent, it **brings Memory, Workspace, Tool Search, Tool Creation, and Schedule together as the default runtime**, extending it into an agent capable of more autonomous, more continuous work.

That is also why it carries a name of its own.

Not because a few capabilities were added, but because **the execution structure itself was designed anew** so that agent capabilities can be extended more freely from here.

---

## The change XGeny is aiming at

XGeny's goal is not only to attach more capabilities to an agent.

It is to change how enterprises hand work to agents in the first place.

**AI that answers**

↓

**An agent that uses the tools it was given**

↓

**An agent with working context and a workspace of its own**

↓

**An agent that finds and builds the tools it needs**

↓

**An agent that keeps carrying out the work**

With XGeny, Plateer Labs is extending the XGEN agent **from "AI that answers questions" to "AI you can hand real work to."**

XGeny has completed its main implementation and is now in stabilisation, with tool creation, memory, and other core capabilities under verification.

Through XGEN Preview we will introduce XGeny's real usage scenarios and key capabilities step by step, ahead of general availability.
