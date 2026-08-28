---
title: "XGEN DeX — bringing enterprise AI agents into the actual desktop"
titleSeo: "XGEN DeX — agents in the real desktop"
description: "The environment AI thinks in and the environment people work in are separate. A desktop interface that lets an agent built in XGEN handle files and applications on your own machine and produce real deliverables."
date: "2026-08-26"
cover: /blog/xgen-connector-preview.svg
thumb: /blog/xgen-connector-preview-thumb.svg
author: "Plateer AI Labs"
category: "제품 소식"
tags: ["XGEN DeX", "Desktop Experience", "Agentic AI", "AI governance", "Product"]
unlisted: true
faq:
  - q: "Is XGEN DeX a desktop chat app for XGEN?"
    a: "No. Its purpose differs from an app that simply lets you use XGEN chat on a PC. DeX is a desktop interface that lets agents built in XGEN use the files, applications, and browser on your machine to produce real deliverables."
  - q: "How does this relate to the earlier XGEN DeX piece?"
    a: "That piece set out the direction — extending enterprise AI down to the desktop. This one covers the installable touchpoint that implements it, linking agent resources on the server with the local execution environment."
  - q: "Does this hand my whole PC over to the AI?"
    a: "No. What DeX aims at is connecting an enterprise-managed agent to a permitted working environment and toolset. Which data an agent can reach and which tools it can run stay under XGEN's agent management and governance."
  - q: "Which work should we start with?"
    a: "Work where a person repeatedly moves between several programs and files. If someone opens, copies, searches, and moves files between programs many times a day, that work is worth trying first."
  - q: "Does it replace Excel or PowerPoint?"
    a: "No. Companies already have systems and SaaS that work well. DeX does not replace them — it lets an agent use those existing tools more easily."
---

Suppose you ask a generative AI to "analyze this Excel file and write it up as a report."

The AI can propose an excellent approach and a solid outline.

But in real work, everything after that is still yours to do.

Find and upload the file, download the result, open Excel or PowerPoint to revise it, search the browser for anything missing, and save the finished file to a working folder.

The reason is simple: **the environment the AI thinks in and the environment people work in are separate.**

XGEN DeX is being built to close that gap.

> This is a follow-up to [XGEN DeX — the execution layer that reaches the desktop](/en/blog/product-xgen-dex). Where that piece covered why enterprise AI has to reach the desktop at all, this one covers the installable touchpoint that actually reaches it.

---

## What is XGEN DeX?

XGEN DeX is a **desktop interface that connects the AI agents created and managed in XGEN with the working environment on a user's own PC.**

If XGEN is where you build and manage agents for work, DeX is what lets those agents carry that work out on the user's machine.

Its purpose differs from a desktop app that simply makes XGEN chat available on a PC.

Through DeX, an agent can use local files and applications within a permitted scope, use the browser, and run the tools and skills it needs to produce an actual result.

Put simply:

**XGEN is where agents are built and managed.**

**XGEN DeX is where those agents connect to the user's environment so the work can actually happen.**

The product is named **XGEN DeX** (Desktop Experience), and what it does is act as the connector between agents on the server and the local working environment. That is why `xgen-connector` still appears in the installer and repository names.

---

## Why is DeX needed?

Enterprise work does not end inside a single chat window.

People move across many environments to get something done.

**File → Excel → browser → internal system → PowerPoint → working folder**

For AI to take over real work, it has to reach into those environments.

So the way of working that DeX aims at goes a step beyond

**question → answer**

to

**request → choose the tools → execute → produce the deliverable**

Rather than stopping at "analyze last month's data," you can ask:

> "Check last month's results file, analyze the significant changes, and produce a result file."

That is, you ask for **a unit of work that ends in a deliverable.**

---

## How do you use it?

DeX aims to be simpler to use than most AI tools for work, not more complex.

The overall flow is six steps.

| Step | What happens |
| --- | --- |
| 1 | Install DeX |
| 2 | Connect to XGEN |
| 3 | Pick the agent for the task |
| 4 | Connect the execution permissions it needs |
| 5 | Ask in plain language |
| 6 | Check the result and keep going |

The install screens and the detail of each step live in the hands-on companion.

**→ [XGEN DeX from install to first task — six steps](/en/blog/xgen-dex-install-guide)**

Here we will look only at why each step is designed the way it is.

### Why you pick an agent

Not everything is handed to one general-purpose AI.

Different work in a company uses different data, tools, and permissions. So you configure agents in XGEN for each purpose, and in DeX you select the one you need.

A support agent, a data analysis agent, a document agent, a development agent, a team-specific agent — chosen from one DeX.

### Why execution permissions are connected separately

For an agent to work on your actual machine it needs an execution environment. Depending on the task that may be **local file and storage, browser, PowerShell, MCP, skill, or application.**

The important part is that this is a deliberate step rather than something opened automatically. This is where an agent on the web becomes an agent that can execute in a real working environment, so what gets opened has to be stated explicitly.

### Why Workspace matters

What an agent produces becomes the start of the next task.

> "From that result, pull out only the items that changed most against the previous month."

XGEN treats an agent not as a single LLM call but as a unit of work combining **LLM + memory + workspace + tools + execution environment.** Carrying a file and its working context into the next request is what makes continuous work possible, and that is what Workspace is for.

---

## Which work should you start with?

DeX does not need to be applied everywhere.

The most effective starting point is **work where a person repeatedly moves between several programs and files.**

| Existing work | With DeX |
| --- | --- |
| Cleaning up Excel data | Check the file → analyze → produce a result file |
| Recurring reporting | Gather sources → analyze → produce the report |
| Post-meeting follow-up | Organize notes → produce minutes → list follow-ups |
| Document review | Read several files → compare → write up the differences |
| Web research | Search → check sources → write up the findings |
| Repetitive file handling | Scan a folder → act per file → save to a target location |
| Development work | Repetitive tasks using the local environment and tools |
| Internal agents | Pick the agent for the job → run it in the local environment |

A simple test helps when choosing what to try first.

> **"To do this work, does someone open, copy, search, and move files between programs several times a day?"**

If so, it is worth trying DeX there.

---

## It is not trying to replace your existing systems

One principle matters here.

DeX is not rebuilding Excel, PowerPoint, the browser, or SharePoint.

Companies already have systems, SaaS, and applications that work well.

DeX's role is not to replace them but **to let an agent use those existing tools more easily.**

It is less about adding one more tool and more about **adding execution ability to the environment that already exists.**

---

## Server and local resources, together

For enterprise agents, running everything on the server is not always the efficient choice.

Work that touches files or applications on a PC naturally belongs in a local execution environment.

Shared company data, centrally managed AI models, and agent assets, on the other hand, belong on the server.

DeX is built around that split: **it connects agent resources on the server with the user's local execution environment.**

That way a company can manage agents and key assets centrally while connecting the execution that genuinely has to happen locally.

---

## The agent lives on your desktop

Work tools need a window opened before you can use them. Find the app, launch it, open a chat, and only then say what you want. Those few steps are what send people back to "I'll just do it myself."

DeX can put the agent on screen as **a floating avatar**. Upload a photo or a Live2D/Spine model to give it a look, set its size and position, and it stays there even when you minimize the window.

![The avatar settings screen with the feature on and the selected avatar floating on the desktop](/connector/15-avatar-overlay.webp)

*Turn the avatar on and the agent lives on your desktop*

This is not decoration. It makes the agent **something beside you rather than something you go and open**. It is also the simplest way to show, on screen, that an agent managed on the server has actually taken up residence in the user's working environment.

---

## An enterprise connector needs control alongside it

Once AI can reach a PC and enterprise data, one thing has to be considered with it.

**Security and governance.**

Who can use which agent, which data an agent can reach, which tools it can run, whether its actions are recorded, and how an attempt to reach sensitive information is detected and controlled.

In finance, the public sector, and large enterprises especially, that control matters as much as the convenience.

So the direction DeX takes is not

**"hand my PC to the AI."**

It is closer to

**"connect an enterprise-managed agent to a permitted working environment and toolset."**

That is why DeX has to grow together with XGEN's agent management and AI governance.

---

## From asking AI questions to handing it work

Enterprise generative AI has mostly been used as people asking and AI answering.

Agentic AI needs one more step.

The AI does not stop at generating an answer — **it has to use the tools it needs and produce an actual result.**

DeX closes that last gap between XGEN's agents and the real working environment.

**Build an agent in XGEN
→ connect enterprise data and systems
→ provide the tools and skills it needs
→ execute it in the real working environment through DeX.**

Enterprise AI moves from

**Ask → Answer**

to

**Request → Understand → Execute → Deliver**

What DeX sets out to build is not another AI chat program.

> **The execution touchpoint that lets an enterprise's own AI agents work alongside employees in their real environment.**

That is why XGEN DeX exists.

---

## Read next

- [XGEN DeX — the execution layer that reaches the desktop](/en/blog/product-xgen-dex) — the first in the series: central control stays put, and nobody changes how they work
- [XGEN DeX from install to first task](/en/blog/xgen-dex-install-guide) — install, build, connect, and hand it work
