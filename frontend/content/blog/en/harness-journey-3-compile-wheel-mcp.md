---
title: "It installed, but we couldn't call it the same run (Part 3)"
titleSeo: "Installed is not the same as running"
cover: "/blog/harness-journey-3-compile-wheel-mcp.svg"
thumb: "/blog/harness-journey-3-compile-wheel-mcp-thumb.svg"
description: "We packaged a workflow as a wheel and installed it elsewhere. Calling a tool exposed every assumption that only held inside the product."
date: "2026-05-08"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "MCP", "Packaging", "Execution contract"]
draft: false
---

**With engine and product separated, the harness looked usable outside the product. We packaged a workflow as a wheel, installed it into an empty environment, and import passed. The moment we called a tool, every assumption that only held inside the product surfaced. Swapping the packaging format from Python to npm and back a month later, we confirmed that what needed to move was not code but execution decisions.**

---

## The first wheel moved the code, not the execution environment

The first compiler, built on 20 April, turned the canvas graph and harness settings into a snapshot and generated a Python wheel containing it.

`pip install` worked in an empty environment and import passed. That was clearly a step beyond copying code around.

Then we called a tool and it stopped.

Inside the product process the config service fills in the model name and iteration count, the tool registry connects names to execution functions, and the database carries the session. The snapshot still held node identifiers, but the standalone executor had neither a class to load that node nor a path to call it.

**The package installed, and we could not call it the same run.**

We considered the other direction too. Put the product package and config service into the wheel and it runs immediately. Then the standalone artifact becomes a miniature copy of the product, and the dependency we cut in Part 2 is restored inside a distribution file.

Only after both options closed did we see we had framed the problem wrong. The goal of compiling was not to package today's code well but **to produce a specification from which another runtime can reconstruct the same execution decisions**.

When moving something to another environment, making "does it install" the done condition usually stalls here. Installation is a question about files; execution is a question about what those files know.

## We didn't know what to freeze because we didn't know what was fixed

To build a specification we first had to know what in the harness does not vary.

An ordinary canvas workflow is, at save time, a directed acyclic graph of nodes and edges. The graph shape differs per workflow, and the executor computes execution order from the edges every time. Add routers, loops, and sub-workflows and it also has to know branch semantics, node implementations, and port mappings.

That is why wrapping a canvas graph directly as a tool means moving the product executor and node registry wholesale to the outside.

The harness is fixed on the other side. Input normalisation, conversation history, prompt, tool exposure, policy, context, tool execution, judgment, and result assembly happen in the same order in every run. What varies is the strategy and tools within each stage, the judgment criteria, and the iteration ceiling.

```text
canvas workflow   graph shape differs each time   → execution order computed each time
harness           stage order is always the same  → only the choices inside stages differ
```

The word "static" needs care here. It does not mean the answer or the tool call order is decided in advance. It means **the skeleton of execution control and the per-stage input/output convention are fixed**. Which tool to call when is still decided by the model during the run.

Because of that difference, freezing harness settings, tool definitions, dependencies, and external input names into a snapshot meant an outside runtime never had to re-interpret an arbitrary graph. The generated MCP server exposes exactly one interface.

```text
run_workflow(input)
  → run the fixed harness state machine
  → return final_output
```

When exposing something complex, the instinct is to reduce features. What is worth looking at first is **what within that complexity is already fixed**. If a fixed part exists, you can make it the contract and expose the rest of the complexity untouched.

## Switching to npm surfaced the spec and left execution behind

On 29 April we removed the Python wheel path and moved to running from a `spec.json` inside an npm package.

Focusing on generating Python code made the contract hard to read from another runtime and hard to inspect for what had been preserved. `spec.json` carries not just the graph but stages and strategies, quality thresholds, iteration ceilings, input and output schemas, and the required engine compatibility range.

That switch achieved its purpose. What had to be frozen became visible by opening one file.

Execution did not follow. We could not reuse the providers and tool adapters already working in Python, and there was no layer guaranteeing that a tool listed in `spec.json` was actually callable.

**The specification showed us what had to move; it did not do the moving.**

So in mid-May we revived the Python compiler. Not a return to the start: we applied the execution specification learned from the npm detour to the Python artifact as well. Two packaging formats, one meaning to freeze.

```text
1st   Python wheel        code moved, execution assumptions stayed
2nd   npm + spec.json     contract surfaced, execution path missing
3rd   Python + same spec  connected the surfaced contract through to real calls
```

Reversing a technology choice reads easily as failure. Whether the place you returned to is the place you left is a separate question. The Python compiler we built in May shared only the artifact format with April's; what it carried was different.

## We thought there were five options; there were four layers

The compile screen shows wheel, PyPI, npm, stdio MCP, and remote MCP together.

At first we put those five in one list and asked "which do we pick". That made it impossible to explain why several needed supporting at once.

They are not alternatives at the same layer. They answer different questions.

| Layer | Options | What it decides |
|---|---|---|
| Artifact format | Python wheel, npm tarball | which runtime installs and runs the package |
| Delivery path | direct wheel transfer, PyPI, npm registry | where the artifact is fetched from and versioned |
| Entry point | Python API, CLI, MCP server | who calls the installed workflow and in what form |
| MCP transport | stdio, Streamable HTTP | how a running server and a client exchange messages |

PyPI is a repository that distributes packages and pins versions; stdio is a transport in which an installed process exchanges messages over standard input and output. Not alternatives but **a distribution problem before install** and **a communication problem after install**.

Which is why they compose.

```text
publish the workflow package to PyPI
  → pip install
  → python -m <workflow>.mcp
  → talk MCP over stdio with the local client
```

Without PyPI you hand wheel files to each user and manage dependencies and versions yourself. Without stdio a local dev tool cannot run an installed package as a child process without a separate server.

Names appearing on one screen often get read as alternatives. When two technologies show up together, the first question is not which is better but **whether they are at the same layer**.

## The same name, PyPI, was pointing at two things

PyPI appears twice in this structure.

`xgen-harness` is the engine package providing the state machine and tool executor. A compiled workflow package carries frozen settings and tool definitions and depends on exactly the engine version that built it.

Installing the engine alone does not give you a particular business tool. Installing the workflow package resolves the engine version it needs alongside it.

Direct wheel transfer and PyPI publication mean the same thing about the artifact. When files must be controlled directly, as in validation or air-gapped delivery, transfer the wheel; when many users need the same name and version, use PyPI. A version published to PyPI cannot be overwritten under the same number, so a modified execution contract ships as a new version.

## Different execution locations meant different people carrying the load

Under stdio the client starts the MCP server process directly. No port to open, environment variables can go to the local process, and it is simple for personal dev tools and single-user runs. In exchange every client spawns a process, and each install environment manages lifetime and updates.

Under remote Streamable HTTP the platform or a central MCP execution service runs the package and many clients call it by URL. Central version rollout, authentication, and execution records are easier, but server lifecycle, networking, and authentication become operational responsibilities. Web-based automation tools that cannot start a local process need this path.

For clients that only accept stdio configuration and do not support remote MCP directly, we put a launcher in front that relays stdio requests to the remote HTTP endpoint.

```text
local:  client ──stdio──> installed Python/Node workflow process
remote: client ──HTTP───> platform gateway ──> central workflow execution
relay:  client ──stdio──> npx launcher ──HTTP──> platform gateway
```

On the surface all three look like one MCP tool. **The actual execution location and authentication responsibility differ in all three.** Two users of the same tool can be carrying quite different operational burdens.

The Python API and CLI are not separate engines either. The Python API embeds a workflow inside another application process; the CLI runs it once from a shell or batch job; MCP serves external clients that need the tool-call convention. All three entry points must read the same pipeline construction and snapshot for execution meaning to survive different call surfaces.

## What to freeze came down to two questions

Two criteria decided what to freeze: does changing this value change the agent's decision-making, and is it safe to copy to another environment.

```text
freeze: stages · transitions · judgment criteria · tool specs · I/O schemas
inject: credentials · per-environment addresses · runtime session
```

`${VAR}` references in settings collect only the variable name at compile time; actual values are read at run time.

Freeze too little and the same artifact becomes a different agent per environment. Freeze too much and secrets leak or production addresses end up baked into a development package.

**The compiler came to resemble a checker for that boundary more than a file generator.**

## Tool descriptions had to be callable sources, not documentation

Even after all that, one stretch of standalone execution still failed.

Show the model a tool name and JSON schema and it produces correct arguments. The artifact did not know where to send the request.

We had been treating the tool definition purely as text the model reads. Inside the product the tool registry filled that gap; outside it, the seat was empty.

From mid-May we normalised tools into a call kind and a call spec. HTTP tools need a method and URL template, header and body mappings. RAG tools need a retrieval service connection and result format; MCP tools need a server launch or relay method. We put these into a frozen tool source so name lookup through to actual invocation works with no product registry.

We did not freeze callability alone. We blocked HTTP tools from reaching local and metadata addresses, and kept credentials out of error messages. **The safety boundary the product used to hold on our behalf had to become part of the contract.**

This is the part most often discovered last in organisations preparing standalone distribution. The capability moved and the protection wrapped around it did not, because protection usually lives in the environment rather than the code.

## Sub-workflows and canvas graphs were the last boundary

After freezing single tools, calling a workflow itself as a tool remained. When a parent agent picks a child agent, the child's settings and tools must be frozen too. Leave only a name and the standalone environment goes looking for the product registry again.

At the end of May we recursively collected selected tools and sub-pipelines into the artifact. Since a sub-workflow can call another, depth limits and cycle checks were needed.

Canvas graphs were harder. Instead of importing the product's node classes we converted nodes, edges, and port mappings into an executable graph specification read by a standalone interpreter. Only at that point did single tools, sub-pipelines, and canvas workflows all run inside the same artifact model.

The Python and Node artifacts do not share code. They take the same snapshot and tool definitions as input, and we matched the call semantics behind identical names. The price of supporting two runtimes is ongoing snapshot-equivalence regression tests and engine version pinning.

## Verification only meant something outside the product

Verify inside the product process and the config service and tool registry fill in the missing information by accident. That is exactly why the first wheel passed.

So we changed the order. First save the snapshot, read it back, and confirm stages, settings, and external input declarations survive. Then install the generated wheel and npm tarball into an empty environment and start the CLI and MCP server.

We did not stop at listing tools. We actually called representative HTTP, RAG, and MCP tools and a sub-workflow. Comparing canvas and standalone execution, we matched the tools used, the judgment criteria applied, and the termination reason rather than the final sentence.

## It looked like a round trip, but it did not return to the same place

Within a month we built a wheel, switched to npm, and came back to Python. The history alone reads as running in place.

What each step taught was different. The first wheel showed that moving code does not move execution. The npm spec made what had to move visible in a single file. The returning Python compiler connected that contract through to real tool calls.

**What we swapped twice was the packaging format; what we built in between was the execution contract.** Packaging ended up as two things and the contract as one.

At this point a workflow becomes a tool callable from outside. But nobody had yet decided whether the answer that tool produces should be accepted. The next part covers why we put the role of producing an answer and the role of accepting it into separate execution stages.

---

**Previous →** [We split the repos but not the dependencies (Part 2)](/en/blog/harness-journey-2-engine-separation)

**Next →** [The model that wrote the answer was also grading it (Part 4)](/en/blog/harness-journey-4-canvas-node-judge)
