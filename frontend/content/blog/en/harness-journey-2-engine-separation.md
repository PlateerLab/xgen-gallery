---
title: "Why we separated the engine core from the product integration layer (Part 2)"
titleSeo: "Engine core vs product layer (Part 2)"
description: "How the generic execution order and XGEN's data, permission, and canvas translation were divided across ServiceProvider, a registry, and a product bridge."
date: "2026-04-29"
cover: /blog/harness-journey-2-engine-separation.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Architecture", "Dependency design"]
draft: false
---
> **Agent harness design · 2/10**

We built a standalone state machine instead of putting judgement logic straight into the existing executor in order to shrink the product's change surface. But connecting the Python executor to the product workflows of the XGEN Agentic AI Platform brought the same coupling back in a different shape. The engine code lived in its own module, yet running it meant importing the product's configuration object, database session, and canvas node classes first. Splitting the repository had not split the dependency.

Inside the product that coupling is convenient. Read the model name straight from the settings service, find tools in the node registry, emit logs in the product's event format. But put the same engine into a standalone test and it fails at import, because the product package is not there. And when the canvas schema changed, the generic state machine had to change with it.

The work from mid to late April was not moving code to a different folder; it was correcting that dependency direction. The standard was one line: **the product may know about the harness, but the harness's execution principles must not know about the product.**

## We took the behaviours we needed, not the product objects

At first we passed product objects into engine functions as arguments. Global imports went down, but the engine still knew those objects' fields and lifecycle. Testing meant constructing an enormous fake product object, and changing one field on a product model broke the engine.

The first boundary we cut in April was access to XGEN services. Under `ServiceProvider` we exposed database, configuration, MCP, and document services as small individual contracts, and took tool lookup and execution through a separate `ToolSource`. What the core required was not a whole product object but these behaviours:

```text
DatabaseService → read and write the persistent data a run needs
ConfigService   → supply product settings as execution settings
MCPService      → look up registered MCP connections
DocumentService → provide documents and retrieval resources
ToolSource      → find a tool and call it with a defined input
```

Later, as model providers, sessions and memory, and execution events expanded, contracts such as `LLMProvider`, `SessionStore`, and `EventEmitter` were added. Rather than projecting the later interfaces back onto the April design all at once, we cut the product-service boundary first and extended contracts on the same principle each time execution capability grew.

Whether the actual implementation is the product database or an in-memory store, a canvas node or an external MCP server, is not the core's decision. With the boundary drawn this way, the full set of state transitions could run with nothing but a fake model and fake tools, no product environment required.

Small interfaces did not just make testing easier. They exposed the minimum contract the product has to provide. When the engine starts asking for a new product field it shows up as an interface change, and a product's internal object can no longer slip quietly into the core.

## We pulled execution order apart from product policy

Splitting interfaces does not finish the boundary. Put specific model names, organization-specific tools, Korean search aliases, or default collections into the core, and product policy is still there in another form.

What the core needs to know is **when** to apply a policy. Whether to inspect input before a run, check after a model response, block just before a tool call, or verify cost and iteration count at a round boundary — those are part of the state machine. What gets blocked, which tools are exposed, and what the default limits are is the product's decision.

Apply that distinction and the engine's stages stay stable. The product attaches its policies at published settings and inspection points, and the core runs without knowing whether those values came from a database or from the canvas. When a new product requirement arrives, you change the bridge's translation and the policy implementation instead of adding a conditional inside the state machine.

## Extension went in through registration points, not conditionals

While there are few providers and tool kinds, a branch like `if provider == ...` in the core is quicker. But as per-product branches multiply, the core release becomes the bottleneck for every integration change. Remove an extension package and its conditionals stay behind, and product dependencies you never chose ride along in the install.

So providers, tool sources, policy checks, evaluation strategies, and session stores are registered in a registry. Implementations supplied by separate packages are discoverable through Python `entry_points`. The core does not know a product name; it checks only the registered name and the input contract.

Nor did we leave registration to connect itself by magic. If two implementations share a name, something has to decide which wins; if a plugin fails to load, something has to decide whether the run aborts or the feature is disabled. Input schemas and error formats become public contracts too. Creating an extension point was not only about removing conditionals — it was about setting the rules for discovery, selection, and failure.

## The canvas's meaning was translated in a bridge

The heaviest product dependencies were on the canvas execution path. Nodes and ports, user permissions, streaming events — all important in XGEN, none of them concepts in a generic engine. Keep that code inside the engine and every canvas change means redeploying the standalone executor too.

At the end of April we gathered that responsibility into `harness_bridge`. The bridge turns canvas nodes and ports into ordinary harness settings, composes connected nodes as a `ToolSource`, and wires user and workflow permissions into execution policy. Converting engine events into the product's streaming responses is this layer's job as well.

```text
Canvas / product API → harness_bridge → harness public contract → state machine
```

The important point is that the bridge is not a back door for editing the state machine's internal fields directly. Every product value has to go in through published settings and interfaces. That is what lets a run launched from the canvas and a standalone run use the same stages and transitions.

## We verified the same boundary in different environments

Core tests started in an environment with no product package and no database. Tool rounds, quality retries, and termination conditions had to work with nothing but a fake model, fake tools, and an in-memory store. If even one product import is needed here, the boundary is not yet closed.

Bridge tests then checked that canvas values convert into harness settings, that connected nodes lead to standard tool calls, and that engine events end up in the streaming response. The standalone package passed its own import and execution tests in a clean install environment with no product dependencies. Core, product translation, and standalone packaging were each verified at their own boundary.

## The standalone engine, the SDK, and the product bridge had different deployment targets

The key point at this stage was dividing the responsibilities of the standalone engine and the product integration layer. Two months later we moved the execution code into `xgen_sdk.harness` inside `xgen-sdk`, to align with the deployment unit XGEN services already depend on. A product service can now pick up one SDK package and get both the harness execution API and the XGEN storage implementations.

That did not mean immediately dropping the standalone `xgen-harness` package. There were consumers using only the engine outside the product, and compiled artifacts already pinned to a particular engine version. The standalone package owns the product-independent execution contract and the compatibility path for existing consumers; the SDK-absorbed copy owns XGEN's deployment unit and integration API. That is why we then needed a rule for landing engine changes in the SDK first and porting them to the standalone repository within a compatibility range.

`harness_bridge` was not absorbed into either package. Putting translations that only mean something in XGEN — canvas ports, user permissions, product streaming — into the SDK engine would recreate the dependency we had just cut. The three paths are not duplicate marketing of the same engine; they carry different deployment responsibilities.

```text
standalone xgen-harness → execution outside the product, compatibility for existing compiled artifacts
xgen_sdk.harness        → the engine deployment unit XGEN services consume
harness_bridge          → XGEN-specific translation of canvas, permissions, and streaming
```

June's SDK relocation was a separate change that moved the deployment location while keeping April's interfaces intact.

Separating the engine was not a matter of creating one more repository. A boundary exists only when the state machine can run outside the product and the product can translate its own data and permissions without modifying the core. The next part looks at not keeping that boundary only in a running process, but at what execution contract to leave inside an artifact installed in another environment.


---
**Previous →** [Why we split the validation loop into execution states (Part 1)](/en/blog/harness-journey-1-rust-to-python)
**Next →** [Exporting a fixed execution contract as a single MCP tool (Part 3)](/en/blog/harness-journey-3-compile-wheel-mcp)
