---
title: "Exporting a fixed execution contract as a single MCP tool (Part 3)"
titleSeo: "One agent run as an MCP tool (Part 3)"
description: "The harness has a fixed control skeleton, unlike a canvas graph. How we compiled it into one tool contract that can be installed and called from outside."
date: "2026-05-08"
cover: /blog/harness-journey-3-compile-wheel-mcp.svg
thumb: /blog/harness-journey-3-compile-wheel-mcp-thumb.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Compilation", "Standalone execution"]
draft: false
---
> **Agent harness design · 3/10**

Once the boundary between product and engine was drawn, the harness no longer had to be a feature that runs only inside the XGEN Agentic AI Platform. To use the same QA run from a local AI client or an automation tool, the answer was not to reimplement the whole canvas but to export it as a single tool that can be installed and called. So we started treating compilation and MCP (Model Context Protocol) publication as the same problem.

The first compiler, built on 20 April, packaged the workflow and its execution settings into a `pip install`-able Python wheel. On 29 April we shifted toward an npm package centred on `spec.json` and removed the wheel generation path; in mid-May a Python compiler came back, using the same execution specification. HTTP, RAG, and MCP tools, sub-workflows, and eventually the canvas graph all came into standalone scope after that.

The problem to solve in that round trip was not a package format. The crux was **what has to be fixed in order to publish a complex agent run as one stable tool contract**.

## We published the fixed harness execution flow as a single MCP tool

An ordinary canvas workflow is, at save time, a directed acyclic graph (DAG) of nodes and edges. But the graph shape differs per workflow, and the executor has to compute execution order from the edges each time. Add routers, loops, and sub-workflows and it also has to know branch semantics, node implementations, and port mapping. That is why wrapping a whole canvas graph as an MCP tool would mean moving the product executor and node registry into the external environment too.

The harness fixed the other side. Input normalization, conversation history, prompt, tool exposure, policy, context, tool execution, judgement, and result assembly follow the same state machine on every run. What varies is the strategy used at each stage, the tools, the judgement criteria, and the iteration cap. "Static pipeline" here does not mean the answer or the tool order is decided in advance — it means **the execution control skeleton and the per-stage input/output conventions are fixed**.

The compiler exploits that difference. Freeze the harness settings, tool definitions, dependencies, and external input names into a `WorkflowSnapshot`, and an external runtime never has to reinterpret an arbitrary canvas graph. The generated MCP server exposes exactly one interface:

```text
run_workflow(input)
  → execute the fixed harness state machine
  → return final_output
```

MCP is not what makes the harness static. The compiler fixes the execution contract first; MCP is the interface exposing that run to external clients. Canvas graphs were supported later too, by freezing a separate graph specification and interpreter alongside — but that needed more information than publishing a fixed harness execution flow.

## The first wheel moved the code, but not the execution environment

The first compiler turned the canvas graph and harness settings into a `WorkflowSnapshot` and generated a wheel containing it. Because we verified installation and import in a separate environment, it was a step beyond copying code. But calling a real tool immediately surfaced assumptions that only held inside the product.

In a product process, the settings service fills in the model and iteration count, the tool registry maps a name to an execution function, and the database carries the session. Even with node IDs preserved in the snapshot, the standalone executor has no class to load for that node and no call path. The package installed, but it was hard to call it the same run.

Go the other way and put the product package and settings service into the wheel and execution gets easy — at the cost of the standalone artifact becoming a shrunken clone of the product. The dependency cut in the previous part gets reconnected inside the deployment file.

So we changed the goal of compilation. Not to package the current code as it is, but to produce a specification from which another runtime can reconstruct the same execution decisions.

## The move to npm made us look at the specification before the package

At the end of April we removed the Python wheel path and chose to run from a `spec.json` inside an npm package. Focusing on generating Python code made the contract hard to read from another runtime, and hard to inspect for what had actually been preserved in the package.

`spec.json` carries not just the graph but the stages and strategies, quality thresholds, iteration caps, input and output schemas, and the engine compatibility range required. The goal was for different executors to read that specification with the same meaning. Exporting a whole workflow as a stdio MCP server makes it look like a single tool from outside, so the input and output schemas become a public API too.

But a specification alone did not solve everything. Reusing the providers and tool adapters already in place in the Python environment was hard, and we still needed a layer guaranteeing that a tool named in `spec.json` is actually callable. The Node package clarified the portable representation but did not replace the Python execution path.

So in mid-May we revived the Python compiler. Not a return to the beginning — we applied the execution specification learned from the npm shift to the Python artifact as well. Two packaging formats, one set of semantics to freeze.

## PyPI and stdio were not alternatives to each other

The compile screen shows wheel, PyPI, npm, stdio MCP, and remote MCP together. Read all of those as "distribution methods" and it is hard to explain why several paths are needed. They actually answer different questions.

| Category | Options | What it decides |
|---|---|---|
| Artifact format | Python wheel, npm tarball | Which runtime installs and executes the package |
| Delivery path | Direct wheel download, PyPI publication, npm registry / tarball | Where the artifact is fetched from and versioned |
| Execution entry point | Python API, CLI, MCP server | Who calls the installed workflow, and in what form |
| MCP transport | Standard I/O (stdio), Streamable HTTP | How a running MCP server and client exchange messages |

PyPI is a repository for distributing Python packages and pinning versions. stdio is a transport where an installed process exchanges MCP messages over standard input and output. So you can `pip install` a workflow published to PyPI and then run that package's MCP entry point over stdio.

```text
Publish the workflow package to PyPI
  → pip install
  → python -m <workflow>.mcp
  → MCP over stdio with a local client
```

That is why both are supported. Without PyPI you hand wheel files to each user and manage dependencies and versions separately. Without stdio it is hard for Claude Desktop or a local development tool to run an installed package as a child process without a separate server. One solves **the distribution problem before installation**, the other **the communication problem after it**.

The name PyPI also appears in two roles. `xgen-harness` is the engine package providing the state machine and tool executor. A compiled workflow package carries the frozen settings and tool definitions and depends precisely on the engine version that produced it. Installing the engine alone does not give you Company L's QA tool; installing the workflow package resolves the engine version it needs alongside.

Direct wheel download and PyPI publication produce the same artifact meaning. When files have to be controlled directly — for verification, or for import into an air-gapped network — you hand over a wheel; when many users need to install the same name and version, you use PyPI. A version published to PyPI cannot be overwritten under the same number, so a modified execution contract ships as a new version, and after installation the actual wheel's snapshot and engine pin should be re-checked.

## Standard I/O and remote HTTP differ in where execution happens

With stdio, the client starts the MCP server process itself. No separate port is opened and environment variables can be given to the local process, which keeps things simple for personal development tools and single-user runs. In exchange, a process is created per client, and lifetime and updates are each installation's responsibility.

On the remote Streamable HTTP path, XGEN or an MCP Station runs the package and several clients call it by URL. Publishing a new version centrally and managing authentication and execution records is easier, but server lifecycle, networking, and OAuth become operational responsibilities. Web-based automation tools that cannot start a local process needed this path.

Clients with native remote MCP support can register an HTTP URL. For local clients that only accept stdio configuration, we put an `npx` launcher in place to relay stdio requests to remote HTTP MCP. From outside they all look like one MCP tool, but the actual execution location and authentication responsibility differ.

```text
Local:   client ──stdio──> installed Python / Node workflow process
Remote:  client ──HTTP───> XGEN gateway ──> centrally executed workflow
Relayed: client ──stdio──> npx launcher ──HTTP──> XGEN gateway
```

The Python API and CLI are not separate engines either. The Python API is for embedding a workflow inside another application process, the CLI for one-off runs from a shell or a batch job, MCP for external clients that need a tool-calling convention. As long as all three entry points read the same `build_pipeline()` and snapshot, the call surfaces differ while the execution semantics hold.

## We separated values that change execution decisions from environment values

Two criteria decided what to freeze: whether changing the value changes how the agent decides, and whether it is safe to copy into another environment.

Stage composition, quality criteria, iteration and termination conditions, and tool input schemas change the result, so they stay in the artifact. API keys, access tokens, and per-environment addresses must not be copied, so they are declared as external inputs. A `${VAR}` reference in settings has only its variable name collected at compile time; the actual value is read at execution time.

```text
Frozen:   stages, transitions, judgement criteria, tool specifications, I/O schemas
Injected: credentials, per-environment addresses, the session at run time
```

Freeze too little and the same artifact becomes a different agent in every environment. Freeze too much and secrets leak, or a production address ends up baked into a development package. The compiler became less a file generator and more a tool for checking that boundary.

## We turned tool descriptions into callable sources

Showing the model a tool name and a JSON schema is not enough for standalone execution. Even when the model produces the right arguments, the artifact does not know where to send the request. From mid-May we closed that gap by normalizing tools into `call_kind` and `call_spec`.

An HTTP tool needs a method, a URL template, and header and body mapping. A RAG tool needs the search service connection and a result format; an MCP tool needs how the server is launched or relayed. We put those definitions into `FrozenToolSource` so that even without a product registry, name lookup carries through to an actual call.

We did not freeze callability alone. HTTP tools are blocked from reaching local and metadata addresses, and errors are kept clear of credentials. Safety boundaries the product used to guarantee had to be part of the standalone execution contract too.

The Python and Node artifacts do not share code. Instead they take the same snapshot and tool definitions as input, and the same name carries the same call semantics. One side puts it in generated modules and a wheel, the other in `spec.json` and an execution wrapper, but stage selection and the standard shape of a tool result have to match. Supporting two runtimes also created ongoing cost: snapshot-equivalence regression tests and engine version pinning to maintain.

## Sub-workflows and canvas graphs were the last boundary

Once a single tool was frozen, what remained was calling a workflow itself as a tool. When a parent agent selects a child agent, the child's settings and tools have to be frozen too. Leave only the name and the standalone environment goes looking for the product registry again.

At the end of May we recursively collected the selected tools and sub-pipelines into the artifact. Because a sub-workflow can call another workflow, depth limits and cycle checks were needed. The Node executor was aligned to the same sub-pipeline semantics.

The canvas graph was harder. Instead of importing the product's node classes, we converted nodes, edges, and port mapping into an executable graph specification for a standalone interpreter to read. Only at that point could a single tool, a sub-pipeline, and a canvas workflow all run within the same artifact model.

## We verified the boundary in a clean environment

Verification had to happen outside the product process. Running the compile function inside the product lets the settings service and tool registry accidentally fill in information that is missing.

First we saved a snapshot and read it back to confirm stages, settings, and external input declarations survive. Then we installed the generated wheel and npm tarball into an empty environment and started the CLI and the MCP server. We did not stop at listing tools; we actually called representative HTTP, RAG, and MCP tools and a sub-workflow. Between canvas execution and standalone execution, we compared the tools used, the judgement criteria applied, and the termination reason rather than the final sentence.

The compiler built a wheel, switched to npm, and came back to Python. That was not circling the same spot. The first wheel showed the limits of moving code, the npm specification made us see execution semantics separately, and the returning Python compiler carried that contract through to actual tool calls. The next part looks at why, inside an execution frozen this way, we kept the role that produces an answer separate from the role that accepts it.


---
**Previous →** [Why we separated the engine core from the product integration layer (Part 2)](/en/blog/harness-journey-2-engine-separation)
**Next →** [Why generation and judgement became separate execution stages (Part 4)](/en/blog/harness-journey-4-canvas-node-judge)
