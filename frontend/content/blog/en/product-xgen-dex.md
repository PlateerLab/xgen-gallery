---
title: "XGEN DeX — the execution layer that reaches the desktop"
description: "The agent runs on the server; the user works with it from their own desktop. Central control stays where it is, and nobody has to change how they work."
date: "2026-08-07"
cover: /blog/product-xgen-dex.svg
thumb: /blog/product-xgen-dex-thumb.svg
author: "Plateer Labs"
category: "Product news"
tags: ["XGEN DeX", "Desktop Experience", "Agentic AI", "On-premise", "Product"]
draft: false
---

**In one line —** XGEN DeX is a Desktop Experience component that connects agents running on the XGEN Server to the user's desktop, so local environments and applications can be used safely.

Enterprise AI is no longer a chatbot that answers questions. It is moving toward agents that understand the work, connect to the systems already in place, and carry out real tasks on the user's behalf.

But work still starts at the desktop. People sign in to internal systems, open local documents, edit Excel and PowerPoint, and use in-house applications. For AI to actually do that work, it has to reach the desktop.

## Runs on the server, continues on the desktop

XGEN DeX (Desktop Experience) rests on one design premise: **keep the agent on the server, and bring only the connection down to the desktop.**

AI agents run and are managed on the enterprise's own on-premise XGEN Server. The user collaborates with those agents from their desktop environment. The enterprise keeps AI under central control, and nobody changes how they work.

It is the opposite direction from installing AI on each individual PC. Because an agent is not tied to one machine, whichever PC someone signs in from, the same agent picks the work back up.

<figure style="margin:2.5rem 0">
<svg viewBox="0 0 720 300" width="100%" role="img" aria-label="The user's desktop environment connects through the XGEN DeX connector to an XGEN Server agent, which in turn reaches local applications, cloud storage, and enterprise systems" xmlns="http://www.w3.org/2000/svg" style="max-width:680px;display:block;margin:0 auto;font-family:'Pretendard',system-ui,-apple-system,sans-serif">
<defs>
<linearGradient id="dexGEn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7bff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient>
</defs>
<rect x="255" y="16" width="210" height="46" rx="12" fill="#fff" stroke="#d4ddf2" stroke-width="1.5"/>
<text x="360" y="38" text-anchor="middle" font-size="14" font-weight="700" fill="#16203a">Local Environment</text>
<text x="360" y="54" text-anchor="middle" font-size="11.5" fill="#6b7688">The user's desktop</text>
<path d="M360 62 L360 84" stroke="#c2cad8" stroke-width="2"/><path d="M354 78 L360 85 L366 78" fill="none" stroke="#c2cad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="245" y="88" width="230" height="50" rx="13" fill="url(#dexGEn)"/>
<text x="360" y="112" text-anchor="middle" font-size="14.5" font-weight="700" fill="#fff">XGEN DeX Connector</text>
<text x="360" y="128" text-anchor="middle" font-size="11.5" fill="#ffffffcc">desktop ↔ server bridge</text>
<path d="M360 138 L360 160" stroke="#c2cad8" stroke-width="2"/><path d="M354 154 L360 161 L366 154" fill="none" stroke="#c2cad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="245" y="164" width="230" height="50" rx="13" fill="#16203a"/>
<text x="360" y="188" text-anchor="middle" font-size="14.5" font-weight="700" fill="#fff">XGEN Server Agent</text>
<text x="360" y="204" text-anchor="middle" font-size="11.5" fill="#ffffff99">runs and is managed on-premise</text>
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

## What it connects

XGEN DeX splits the desktop's resources into three and wires each to the agent.

**Local environment** — the user's working environment, connected so the agent can understand and act on it.

**Local directory** — local directories linked to XGEN Cloud Storage, so documents and files are used where they already are, with no copying step.

**Local applications** — Excel, PowerPoint, the browser, in-house applications: programs running on the desktop, connected to the agent to support automation.

## What changes in the work

Once the desktop and the server become one AI experience, the gain lands in a different place for each role.

- **Developers** build alongside an AI that understands the whole project
- **Planners** write proposals grounded in internal documents
- **Sales** connects customer material to prepare a tailored proposal
- **Business teams** hand repetitive work to an agent and concentrate on what needs judgement

The common thread is that nobody has to give up the tools they already use.

## Central control stays where it is

Widening the scope to the desktop raises one question first: does control get looser? XGEN DeX leaves the operating principles an enterprise has already set in place.

| Principle | What it means |
|---|---|
| Server-centric agent architecture | Agents run on the XGEN Server and are managed centrally |
| Enterprise security | Existing authentication, permission, and audit policies stay as they are |
| Persistent agent experience | Whichever desktop you sign in from, the same agent continues the work |
| Desktop connectivity | Local files, desktop applications, and enterprise systems become one agent experience |

## Coming soon

XGEN DeX is in the final stage of development at the lab.

We see it as more than a desktop connection tool: an execution layer that joins Enterprise AI and the user's desktop into a single working experience.

Competition in AI is not settled by model performance alone. What comes next is how naturally an enterprise can use AI while keeping the working environment it already has. XGEN DeX is the first Desktop Experience platform we are building toward that.

We will introduce XGEN DeX's release schedule and capabilities here on the blog, step by step. For a product demo or a conversation about adoption, [get in touch](/en/contact) any time.
