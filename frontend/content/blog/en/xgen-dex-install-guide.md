---
title: "XGEN DeX from install to first task — six steps"
titleSeo: "XGEN DeX install and usage guide"
description: "Install DeX, ask XGeny in plain language to build an agent, connect that agent to your PC, and hand it real work. Six steps, with real screens."
date: "2026-08-28"
cover: /blog/xgen-dex-install-guide.svg
thumb: /blog/xgen-dex-install-guide-thumb.svg
author: "Plateer AI Labs"
category: "제품 소식"
tags: ["XGEN DeX", "XGeny", "Desktop Experience", "Agentic AI", "Install guide"]
unlisted: true
faq:
  - q: "Where do I build the agent?"
    a: "In XGEN. DeX is the side that runs an agent; the agent itself is built on the XGEN canvas. You can wire nodes by hand, but describing the job to XGeny in plain language gets you a workflow with the nodes and connections already in place."
  - q: "Does the installer need admin rights?"
    a: "Not if you set the install scope to the current user. That is also the easier option for internal rollout."
  - q: "Can the agent do anything it wants with my files?"
    a: "No. It uses only what you open in DeX settings. PC Control scopes access with a default working folder and allowed folders, and commands like delete, power, or privilege escalation can be blocked by their first word. A connected agent can also be paused when you are not using it."
  - q: "Where does the agent's output go?"
    a: "Into the local folder synced with your cloud store. Who did what and when is recorded in Activity with a timestamp and an actor."
  - q: "SmartScreen warns me — is that a problem?"
    a: "It appears because a code-signing certificate is not yet registered; it is not a problem with the installer itself. Click More info, check the publisher and filename, then continue."
---

> This is the hands-on companion to [XGEN DeX — connecting enterprise AI agents to the real desktop](/en/blog/xgen-connector-preview). That post covered why the desktop needs connecting; this one connects it.

Anyone who has put AI to work tends to stop at the same place. The answer comes out fine — but turning that answer into an actual file, in an actual folder, is still done by a person.

XGEN DeX closes that last stretch. It is the desktop endpoint that lets an agent on the server use the files and tools on your machine.

The installer is on GitHub, about 280MB. Screens are from Windows.

**→ [PlateerLab/xgen-connector](https://github.com/PlateerLab/xgen-connector)**

## 1. Install

Run the `XGEN-Connector-Setup` file you downloaded and Windows Defender SmartScreen blocks it as unrecognized. This appears because a code-signing certificate is not yet registered — it is not a problem with the installer itself. Click More info to reveal the publisher and filename along with a Run button.

![The blue Microsoft Defender SmartScreen dialog saying it prevented an unrecognized app from starting](/connector/03-smartscreen-block.webp)

*Expect support questions about this screen during internal rollout — mention it up front*

For install scope, pick all users or the current user only. The current user needs no admin rights, which makes it the easier option for internal rollout too.

![Choosing between all users and current user only for the install scope](/connector/04-scope.webp)

*Install scope*

The install folder defaults to a path under your user account's AppData and needs roughly 970MB free.

![The install folder path and the required disk space of 971.6MB](/connector/06-install-path.webp)

*Install location*

The next screen names the data folder. Under it, the agent's working folder and local runtime components are created — `workspace` handles work sync, `cloud` is storage, and `local-runtime` holds the runtime and CLIs the agent uses when it executes on this machine.

Copying the local runtime and its Python packages takes a while. When the progress bar completes, click Finish and launch DeX.

![Setup complete, with a Run XGen-Dex checkbox and a Finish button](/connector/08-complete.webp)

*Installation complete*

## 2. Connect to the server

On first launch DeX asks for the XGEN server (gateway) address. Enter the XGEN instance your organization runs.

Turn on Allow private certificates if your environment uses an internal CA, and Use SSO login if you sign in through single sign-on.

![The server connection screen with an address field and checkboxes for private certificates and SSO login](/connector/09-server.webp)

*Point DeX at your XGEN server*

## 3. Build an agent with XGeny

DeX is the side that **runs** an agent; the agent itself is built in XGEN. You can wire nodes by hand on the canvas, but asking XGeny in plain language is faster.

![The XGEN canvas with an XGeny agent node placed and its provider and model settings open](/connector/17-xgeny-node.webp)

*The XGeny node on the canvas*

Describe what you want — for example, "build me an agent that writes blog articles for the Plateer Labs site" — and XGeny assembles a workflow with the nodes and connections it needs, then drops it on the canvas.

![The XGEN chat asking XGeny to build an agent that writes blog articles](/connector/18-xgeny-prompt.webp)

*Describe the agent you want*

You get a workflow wiring input, conversation memory, web search, the agent, and output. Run it as-is, add nodes or change settings to refine it, then give it a name and save.

![A canvas with user input, multi-turn memory, web search, the XGeny agent, and output nodes wired together](/connector/19-xgeny-flow.webp)

*The workflow XGeny built*

## 4. Connect it to your PC and create a working folder

For an agent running on the XGEN server to read and write files on this machine, that agent and this computer have to be connected to each other. Do it in XGEN under Knowledge → File Cloud → Connections.

With DeX running, this computer appears automatically under Connected PCs. Pick the agent you built with + Connect agent, and the agent on the XGEN server is joined to your desktop.

![The connect agent dialog with the site operations agent selected](/connector/21-connect-agent.webp)

*Pick the agent to connect*

![Connected PC and connected agent both showing a connected status](/connector/22-connected.webp)

*PC and agent both connected*

> A connected agent can read and write your entire cloud. Connect only the agents a task needs, and pause the connection when you are not using it.

Creating a store under Library makes a cloud folder, and a folder of the same name syncs under the default working folder on your PC. That folder is where the agent and you hand files back and forth.

![The library showing one store card marked as syncing](/connector/24-folder-list.webp)

*A cloud folder that syncs with your PC*

Activity keeps a record of who did what and when — below is the `mkdir` entry for creating the folder.

![The activity list showing an mkdir operation with actor and timestamp](/connector/25-activity.webp)

*Human and agent operations stack in the same list*

## 5. Open execution permissions

What the agent may do on this machine is decided in DeX under Settings. Open only what the work needs.

PC Control covers shell and file access. Scope it with the default working folder and allowed folders, and block commands like delete, power, or privilege escalation by their first word.

![The PC Control tab with a local tool access switch, working folder, allowed folders, and blocked commands](/connector/11-pc-control.webp)

*PC Control — shell and file scope*

MCP runs MCP servers on your PC so the agent in the selected session can use those tools. Storage mounts the cloud as a drive and syncs a connected agent's workspace to a real folder.

![The MCP tab with a local MCP switch and the registered MCP server list](/connector/12-mcp.webp)

*MCP — tools served from your PC*

## 6. Hand it work

The agent you built now appears in the DeX agent list on the left. Pick it and the conversation starts.

One more thing first. Turn on the avatar under Avatar settings and the agent shows up as **a character floating on your screen**. Upload a photo (png/jpg) or a Live2D/Spine model, scale it with the wheel, and drag it where you want it.

![The avatar settings screen with the feature on and the selected avatar floating on the desktop](/connector/15-avatar-overlay.webp)

*Turn the avatar on and the agent lives on your desktop*

Minimize the window and the avatar stays. You do not have to find and open the app each time — you hand it work the way you would ask a colleague at the next desk. That is the figure on the right of the conversation screen below.

Hand it outcomes, not commands. Below, it was asked to find and summarize the most-read press coverage of on-premise B2B agent platforms from the past month.

The agent restates what it is about to do, then runs its WebSearch tool. **Which tool it is using, and how far along, shows inline** — so you can follow the work while it happens.

![A DeX conversation where the agent was asked to research press coverage and is running its WebSearch tool four times](/connector/28-agent-task.webp)

*Hand it work and it picks the tools it needs*

What it produces lands in the folder you synced in step 4. The agent's folder appears in the explorer on the left, and the same content syncs to a local path.

![The explorer showing XgenCloud and the site operations agent folder, with the Storage tab listing that agent's local sync path](/connector/27-synced-folder.webp)

*The agent's folder appears in the explorer and syncs to a local path*

At this point the agent you built in XGEN is wired into your desktop environment, ready to do real work with local files and applications.

## What you learn running it

**Split agents by task.** Do not hand everything to one general-purpose agent. Different work uses different data, tools, and permissions — putting site operations and document cleanup on the same agent opens permissions neither task needs.

**Disconnect when you are not using it.** A connected agent reads and writes your whole cloud. Pause it under File Cloud → Connections and the connection stays configured while access stops.

**Continue from the result.** What the agent produces becomes the start of the next task. It stays in the synced folder, so you can keep the thread going — "summarize what you just made for an executive audience."

## Read next

- [XGEN DeX — connecting enterprise AI agents to the real desktop](/en/blog/xgen-connector-preview) — why DeX exists
- [XGEN DeX — the execution layer that reaches the desktop](/en/blog/product-xgen-dex) — the first in the series: central control stays put, and nobody changes how they work
