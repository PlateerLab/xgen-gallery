---
title: "Designing tool exposure and output delivery as execution context (Part 9)"
titleSeo: "Tool exposure as context (Part 9)"
description: "Exposing connected tools search-first, and separating what the model is told about an output destination from who owns actually delivering to it."
date: "2026-07-01"
cover: /blog/harness-journey-9-context-design.svg
thumb: /blog/harness-journey-9-context-design-thumb.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Context design", "Tool search"]
draft: false
---
> **Agent harness design · 9/10**

Making a tool usable and putting every tool definition into the prompt are not the same thing. With only a few tools connected on the canvas, handing over the full JSON schema at once is fine. But as connected nodes and the platform catalogue grow, the tool descriptions get longer than the user's request, and definitions that will never be used occupy most of the context.

On 29 June we started moving from unfolding every connected tool up front to a search-first approach. On 30 June we wired BM25 search over names and descriptions using term frequency and rarity, a `ToolSearch` that loads the detailed definition of a selected tool, and a lazy-exposure path for connected resources, into both the SDK and product execution. In early July we constrained searchable platform sources per run, and separated execution ownership of output nodes from what the model is shown.

This did not arrive as a finished design in one go. It was a sequence of decisions about when, and to whom, to entrust a tool's existence, its detailed schema, its execution authority, and its output side effects.

## We separated a connected tool's existence from its detailed schema

Hide every tool and the model cannot choose the action it needs. Unfold every schema and the context balloons. So instead of one flag for "is the tool visible," we split the information level.

The handful of built-in tools always needed in the current run provide name, description, and input schema from the start. Tools the user connected on the canvas matter because the user chose them, so their name and a short description come first. When the model decides it actually needs one, `ToolSearch` promotes the detailed input schema into the current run's tools. For the platform's large catalogue, candidates are found in a search index and only the selected definition is loaded.

```text
Know it exists
  → find candidates by name and description
  → promote the schema you need
  → check permission and input
  → call the actual tool
```

This does not hide tools. It provides a summary list of names and descriptions of the tools available right now, and unfolds the detailed definition needed for a call when it is used. Tokens the model reads go down while the user's connection intent is preserved.

Search did not start as a name-contains check. Tool names and descriptions are normalized and candidates ranked with BM25, to find tools close to a natural-language request. A search result does not confer execution authority, so even after selection there are separate steps for loading the detailed definition and a policy check just before the call.

## We treated platform search scope and user connections as different sources

Once a search path existed, we needed to constrain which sources may be explored. A per-run `source_allowlist` decides which tool sources can be searched automatically in the platform catalogue. On 2 July we narrowed the default path toward connected sources so unnecessary platform tools stop appearing among the candidates.

The meaning of an empty allowlist matters here. `source_allowlist=[]` means no source in the platform catalogue is permitted — not that the user has connected no tools on the current canvas. The two have different deciders.

- Platform catalogue: resources the system offers as search candidates
- Connected tools: resources the user explicitly included in this run

The product bridge passes connected tools as per-run `extra_tool_sources`, gathered separately from the platform allowlist. Connected tools provide name and description first under a `connected` origin, with detailed definitions promoted through `ToolSearch`. A platform tool that is neither connected nor on the allowlist does not appear in search results.

In the first application, the allowlist filter sat too early in the gathering stage and a regression excluded connected sources along with the rest. The list and short descriptions were visible while the actual search and call path had no tools. On 6 July we fixed the gathering order so explicitly connected sources stay independent of the platform catalogue filter.

That is why we separated origins instead of special-casing tool names one by one. "The user connected it" and "the whole platform may be searched" are different permissions. Merge them into one list and you either open the search scope too far in order to show a tool, or lose the connected tools while trying to constrain search.

## Output nodes looked different as execution tools and as model context

Around the same time as tool exposure, we sorted out output nodes' responsibilities. Show an email or message node to the model as an ordinary tool and the model decides whether to call `send_email`. Skip the call and delivery is missed; have the canvas executor re-run downstream nodes and the same result can be sent twice.

First we gathered terminal execution into a meta-tool inside the harness. Once the final result is settled, one execution owner processes the terminal chain following on from the harness result, in order. Those nodes are excluded from the ordinary canvas path so they are not executed twice within one execution path. This is not durable exactly-once delivery in a distributed sense; it is a contract that two execution paths inside a process do not co-own the same side effect.

But executing something as a tool internally does not require showing it to the model as a callable tool. What the model sees became a `ResourceInfo` named `output_channel`. The model knows whether the result is an email or a message and what format is expected, and composes the final answer accordingly. Whether and when it is actually sent is the harness's decision.

```text
What the model sees:   output_channel name, purpose, expected format
What the harness owns: settling the final result, terminal execution, duplicate prevention
```

Saying only "we did not make the output destination a tool" loses that middle design. What actually happened was gathering execution responsibility into an internal meta-tool, then exposing to the model resource information rather than a callable tool. The internal execution model and the model's context did not have to be the same representation.

Channel metadata carries only the values needed to compose an answer. Parameter names matching common secret patterns are excluded. That filter does not automatically know every product's sensitive fields, so connecting a new channel needs product policy and regression tests alongside.

## We verified name exposure, schema exposure, and execution authority separately

A visible tool name does not mean it can already be called. A connected tool first announces its existence by name and description. If the model selects it, `ToolSearch` loads the schema. Just before the actual call, input types, the current user's permissions, and execution policy are checked again.

Verification did not end at one list screen either. We checked as one path that a connected tool enters the short list, that the model searches the exact name, that its schema joins the next call context, and that the execution request reaches the original tool source. With an empty allowlist, connected tools had to remain while non-permitted platform tools stayed out.

For output channels we did not just check that they appear in the resource list. We checked that the settled final answer reaches the connected terminal, that it is not processed twice within one execution path, that the ordinary canvas path and the harness path respect the same execution ownership, and that secrets are excluded from the metadata.

Context is not a document for the model to read at length; it is the interface between the model and the execution environment. Tools announce existence first and unfold schemas when needed, and permission is judged again just before execution. An output channel tells the model the destination while the harness keeps the delivery responsibility. The next part covers, when feeding lessons back into this execution path, how we made the latest feedback and the latest candidate actually carry through to the next action.


---
**Previous →** [Scoping and prioritizing memory between runs (Part 8)](/en/blog/harness-journey-8-memory-loop)
**Next →** [Keeping lessons fresh when you feed them into the next run (Part 10)](/en/blog/harness-journey-10-feedback-freshness)
