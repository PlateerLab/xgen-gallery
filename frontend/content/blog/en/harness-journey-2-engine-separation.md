---
title: "We split the repos but not the dependencies (Part 2)"
titleSeo: "Splitting repos is not splitting deps"
cover: "/blog/harness-journey-2-engine-separation.svg"
thumb: "/blog/harness-journey-2-engine-separation-thumb.svg"
description: "The engine had its own module, and running it still needed the product's config object, DB session, and canvas classes. Closing a real boundary."
date: "2026-04-29"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Architecture", "Dependency design"]
draft: false
---

**Once the engine was pulled into its own repository, we considered the separation done. Then we put it in an environment with no product package and it failed at import. Dependencies are decided not by which folder code sits in but by what it has to know in order to run. We learned that while chasing leaks, three days after declaring independence.**

---

## Moving the folder did not move the dependencies

In Part 1 we chose a standalone state machine over wedging judgment into the product executor, in order to shrink the blast radius of changes. When we connected the Python executor to the workflows of the XGEN Agentic AI Platform (XGEN), the same coupling came back wearing a different face.

The engine code was clearly in a separate module. Yet running it required first loading the product's config object, database session, and canvas node classes.

Inside the product this coupling is actually convenient. Read the model name straight from the config service, find tools in the node registry, emit logs in the product's event format.

Put the same engine in an environment without the product and it stopped before execution even began. Change the canvas schema and the general-purpose state machine had to change with it.

**Splitting the repository and splitting the dependency were different things.** We had moved files around and were calling it a boundary.

So we wrote the criterion down in one sentence. The product may know the harness; the harness's execution logic must not know the product.

If you are planning a refactor that splits modules, it helps to fix the done condition first. "Files moved" is not observable. "Import passes with no product package installed" is.

## Passing product objects as arguments only made the coupling less visible

The first attempt stripped global imports and passed product objects into engine functions as arguments. The import list got clean.

The engine still knew that object's fields and lifecycle. Testing meant constructing an enormous fake product object, and one changed field in a product model broke the engine.

Turning a global import into an argument had not removed the coupling; it had **made the coupling harder to see**. A compile-time dependency had simply relocated to runtime.

What the core actually needed was not the product object but a handful of behaviours. That is the boundary we cut first, in April.

```text
DatabaseService → read and write the persistent data a run needs
ConfigService   → provide product settings as execution settings
MCPService      → look up registered MCP connections
DocumentService → provide documents and retrieval resources
ToolSource      → find tools and call them with defined inputs
```

Whether the implementation is a product database or an in-memory store, a canvas node or an external MCP server, is not the core's decision. Only after establishing this boundary could we run the full set of state transitions with fake models and tools, with no product environment at all.

As model providers, sessions, and execution events grew, the contracts grew with them. We did not draw them all up front; we added one at a time on the same principle whenever a capability was added.

The value of small interfaces was not test convenience. It was that **the minimum contract the product must supply became a visible list**. When the engine starts asking for a new product field, that shows up as an interface change, and product internals can no longer drift quietly into the core.

## Trying to strip policy out of the core, we stripped out half of it

Splitting interfaces did not finish the boundary. Values like a specific model name, an org-only tool, a search alias, or a default collection keep product policy alive in the core in another shape.

What we got wrong at first was the split itself: "all policy goes to the product." Pushing it out that way meant the product now had to know *when* policy applies, which put the state machine's internal ordering back in the product's head.

The boundary was not the presence of policy but its two halves.

```text
core owns      when to look    before input / after model response / before tool call / at turn boundary
product owns   what to look at what to block · which tools to expose · what the limits are
```

Check points are part of the state machine; check contents belong to the product. Split that way, a new product requirement changes the integration layer's conversion and policy implementation rather than adding a branch to the state machine.

Extensibility went the same way. When providers and tool types are few, a branch in the core is fastest, but as per-product branches accumulate the core release becomes the bottleneck for every integration change. So providers, tool sources, policy checks, evaluation strategies, and session stores became registration points.

Building a registration point turned out to be bigger than deleting a branch. What happens when two implementations claim the same name; whether a plugin that fails to load should abort the run or just disable that capability; how far the input schema and error format are public contract. **An extension point replaces branches with new rules about discovery, selection, and failure.**

## Code that knows the canvas needed somewhere to go, not deleting

The heaviest product dependencies lived on the canvas execution path. Nodes and ports, user permissions, streaming events all matter in XGEN but are not concepts of a general-purpose engine.

This was not code that could be deleted. Somebody has to turn canvas nodes into harness settings, connected nodes into a tool list, engine events into the product's streaming response.

At the end of April we gathered that responsibility into a separate layer, `harness_bridge`. Roughly two thousand lines of XGEN-specific code moved from the engine into the integration layer.

```text
canvas · product API → harness_bridge → harness public contract → state machine
```

One rule held throughout: the bridge is not a back door into the state machine's internal fields. Every product value enters through published settings and interfaces. That is what lets a run started from the canvas and a standalone run use the same stages and transitions.

Approaching a boundary as "let's delete this code" usually stalls, because that code does real work. **Separating what to delete from what to relocate** is what lets the discussion move.

## Three days after declaring independence, we were patching leaks

On 24 April we deleted the XGEN-specific adapter from the engine. The commit message said "engine independence complete". As of that day the core held no import pointing at the product.

Two days later, over the next three days, we fixed a run of problems where product values were not reaching the engine. One symptom: tools attached on the canvas, and an empty tool list at execution time. The engine concluded there were no tools and took that path perfectly correctly.

Imports disappearing did not make values flow. Creating the boundary had introduced a conversion layer between product and engine, and values were quietly falling out of that conversion. More than twenty related patches shipped in that window alone.

So what we completed on 24 April was not independence but **the compile-time condition for independence**. Actual independence was something we had to confirm afterwards by observing runs.

```text
what can be declared   the core holds no product import   → statically checkable
what must be confirmed product values actually reach it   → only visible by running it
```

This distinction goes missing in the room where dependency removal gets reported as done. A clean import graph and intact functionality are two different observations. The first takes a day; the second shows up the following week.

## So verification moved to three separate places

After the leaks we split verification across three boundaries.

Core tests start in an environment with no product package and no database. Tool turns, quality retries, and termination conditions must work with fake models and tools and an in-memory store. If even one product import is needed here, the boundary is not yet closed.

Bridge tests look the other way: do canvas values convert into harness settings, do connected nodes become standard tool calls, do engine events land in the streaming response. Every one of those leaks happened in this stretch.

The standalone package had to pass import and execution separately in a clean install environment with no product dependencies.

## Three deployment paths were not duplication but three responsibilities

Two months later we moved the execution code into `xgen-sdk`. XGEN services already depended on that deployment unit, so shipping one SDK package could deliver the harness execution API and the XGEN-side implementations together.

At that point we wanted to retire the standalone `xgen-harness` package. The same engine in two places is twice the maintenance.

We could not. There were consumers using the engine outside the product, and there were already compiled artifacts pinned to a specific engine version. Those artifacts know nothing about the SDK.

```text
xgen-harness      execution outside the product · version compatibility for existing artifacts
xgen_sdk.harness  the deployment unit XGEN services consume
harness_bridge    XGEN-only conversion for canvas · permissions · streaming
```

`harness_bridge` was absorbed into neither. Put XGEN-only conversions into the SDK engine and the dependency we cut earlier comes straight back.

Three paths are not the result of building the same thing three times but of **deployment responsibility splitting three ways**. An attempt to merge them is a decision to abandon one set of consumers.

## The boundary was not drawn but observed

What we set out to do here was divide the code well. What we actually did was decide what to look at before we could say it was divided.

Moving folders was not enough. Turning global imports into arguments was not enough. Deleting the adapter was not enough. Every time we thought we had separated it, and every time the coupling survived through another route.

**A boundary does not come into being by declaration; it comes into being when you build a check that fails once the boundary breaks.** Core tests in an environment without the product package, value-passing tests at the conversion layer, and import tests in a clean install are those checks.

That covers the boundary inside a running process. The next part is about pushing that boundary outside the process: what execution contract has to travel inside an artifact installed elsewhere so that whoever receives it can run it without knowing XGEN.

---

**Previous →** [Retry counts told us nothing about the run (Part 1)](/en/blog/harness-journey-1-rust-to-python)

**Next →** [It installed, but we couldn't call it the same run (Part 3)](/en/blog/harness-journey-3-compile-wheel-mcp)
