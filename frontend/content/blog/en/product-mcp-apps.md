---
title: "MCP Apps — build once, run anywhere"
description: "Past wrapping an engine, XGEN's SDK compiles workflows and policies into code and exports them as a standalone MCP server."
date: "2026-06-21"
cover: /blog/product-mcp-apps.svg
author: "Plateer Labs"
category: "Product news"
tags: ["MCP Apps", "Portability", "Product"]
draft: false
---

**In one line —** most platforms stop at *wrapping* the engine. XGEN puts the engine itself *inside* the code.

## What is different

- **The wrapper approach** — keep the engine running underneath and wrap its surface in MCP → an MCP server tied to the platform
- **The compiler approach (XGEN)** — use the SDK to compile workflows and policies into standard process code → a standalone MCP server package (Node · Python)

## Why it matters

Nothing is tied to a particular platform. The package sits on standard ecosystems (PyPI, npm), so it can be edited, run, and connected anywhere. An agent you built once carries over unchanged when the environment changes. There is more in [Technology](/en/technology#mcp-apps).
