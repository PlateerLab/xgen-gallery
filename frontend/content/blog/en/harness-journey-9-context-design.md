---
title: "The tools were listed but couldn't be called (Part 9)"
titleSeo: "Visible is not callable"
cover: "/blog/harness-journey-9-context-design.svg"
thumb: "/blog/harness-journey-9-context-design-thumb.svg"
description: "An allowlist meant to narrow search scope also dropped the tools the user had connected by hand. Name, schema, and permission at three moments."
date: "2026-07-01"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Context design", "Tool discovery"]
draft: false
---

**As connected tools grew, tool descriptions got longer than user requests. We switched to search and put an allowlist on the discovery scope, and the tools a user had connected on the canvas fell out with it. The names were visible in the list and absent from the actual call path. This is about why "visible" and "callable" are different problems.**

---

## Making a tool usable and unfolding all of it were different things

With a handful of connected tools, putting every JSON schema into the prompt is fine. That is how we started.

As connected nodes and the platform catalogue grew, tool descriptions became longer than user requests. Definitions that would never be used took up most of the context.

The question itself, "should we show the tools", was wrong. It admits only two answers: show everything or hide it.

What actually needed splitting was **the level of information**.

```text
know it exists
  → find candidates by name and description
  → promote the schema you need
  → check permission and input
  → call the actual tool
```

A small set of built-in tools always needed in the current run gets name, description, and input schema from the start. Tools the user connected on the canvas matter by the fact of selection, so their name and short description come first. If the model decides it needs one, a search tool promotes the detailed schema into the current run's tools. The platform's large catalogue finds candidates in an index and loads only the chosen definition.

This is not hiding tools. It is **giving the list as it is and unfolding only the detail at the point of use**. It reduces the tokens the model reads while preserving the user's intent in connecting them.

We did not build search as a substring check on names either. Tool names and descriptions are normalised and candidates ranked by term frequency and rarity to find tools close to a natural-language request.

When context growth gets reported, people usually look first at what to remove. Before that, look at **how many layers the information you are treating as one block really has**. Once the layers separate, you can defer instead of delete.

## Narrowing search scope made the connected tools disappear

Once a search path existed we needed to limit which sources may be explored. Each run got an allowlist of tool sources searchable in the platform catalogue.

In early July we narrowed the default path to connected sources, to keep irrelevant platform tools out of the candidate pool.

A regression came out of it. The allowlist filter sat early in the collection stage, and **connected sources were excluded along with everything else.**

The symptom was awkward. The short list and descriptions on screen still showed the tools. Search by that name returned nothing and the call failed.

The cause was that we had put two different things in one list.

```text
platform catalogue   resources the system proposes as search candidates   → limited by allowlist
connected tools      resources the user explicitly included this run      → not subject to that limit
```

**"The user connected this" and "you may explore the whole platform" are different permissions.** Merge them into one list and you either open search too wide in order to show a tool, or lose connected tools while trying to restrict search. We did the latter.

The meaning of an empty allowlist became clear here too. An empty allowlist means no platform catalogue source is permitted, not that the user connected no tools. **The selecting party is different.**

In early July we fixed the collection order so explicitly connected sources survive independently of the platform catalogue filter. That is why we separated by source instead of special-casing tool names one by one.

Designing permission lists, holding different sources in one list makes this regression recur. If there are two paths in, there have to be two rules out.

## Showing output nodes as tools let the model decide delivery

Output node responsibility got settled around the same time.

Show an email or message node to the model as an ordinary tool and the model decides whether to send. If it does not call, delivery is skipped; if the canvas executor reruns downstream nodes, the same result goes out twice.

**Two execution paths were jointly owning the side effect of delivery.**

First we gathered terminal execution into a meta tool inside the harness. After the final result is settled, one execution owner processes the terminal chain following the harness result in order. The ordinary canvas path excludes those nodes so they are not run twice within one execution path.

We did not call this exactly-once delivery in the distributed-systems sense. It is a contract that two execution paths inside a process do not jointly own the same side effect.

But running it internally as a tool did not require showing it to the model as a callable tool.

What the model gets became an output channel resource description. The model knows whether the result goes to email or a message and what format is expected, and composes the final answer. Whether and when it is actually sent is the harness's decision.

```text
what the model sees   the output channel's name · purpose · expected format
what the harness owns final result settlement · terminal execution · duplicate prevention
```

What we confirmed here is that **the internal execution model and the model's context do not have to be the same representation.** Our starting assumption was that something which is a tool inside the system must be a tool to the model, and dropping that assumption resolved it.

Channel metadata carries only values needed to compose an answer. Values whose parameter names match common secret patterns are excluded. That filter does not know every product's sensitive fields automatically, so connecting a new channel needs product policy and regression tests alongside.

## Being visible did not mean being callable

We hardened what the regression taught into a rule. Exposing a tool is not one event but three moments.

```text
name exposure     give the existence and short description of connected tools
schema exposure   promote the detailed definition once the model selects it
execution permit  recheck input types, user permission, and policy just before the call
```

Bundle the three and you get one of the two earlier failures. Open it all and context grows while permissions widen; close it all and even connected tools become unusable.

Verification did not stop at one list screen either. We confirmed **as one continuous path** that a connected tool enters the short list, that the model searches the exact name, that its schema joins the next call context, and that the execution request reaches the original tool source.

The empty-allowlist condition became a regression test: connected tools survive and disallowed platform tools do not slip in.

Output channels were not verified merely by appearing in a resource list. We checked that the settled final answer reaches the connected terminal, that it is not processed twice within one execution path, that the ordinary canvas path and the harness path respect the same execution ownership, and that secrets stay out of metadata.

End verification at "the feature appears on screen" and you miss this part's regression. Count how many steps sit between appearing in a list and actually being usable; that is how many verification points you need.

## Context was an interface, not a document to be read

The problems in this part look unrelated on the surface. Tool descriptions were too long, an allowlist erased connected tools, and ownership of output node execution overlapped.

They all came from one place: we were treating context as **a document the model reads**. If it is a document, put in everything needed, one list suffices, and a tool inside the system is a tool to the model.

If context is an **interface** between the model and the execution environment, it changes. An interface carries what is exposed when and where permission is rechecked.

Tools announce existence first, unfold schemas when needed, and have permission judged again just before execution. Output channels tell the destination while the harness keeps delivery responsibility.

The last part puts lessons back into this execution path. Doing so, storage and recall both worked and results still circled in place, because the score was attached to the wrong candidate.

---

**Previous →** [Letting the nearest memory always win was wrong (Part 8)](/en/blog/harness-journey-8-memory-loop)

**Next →** [We burned every retry re-grading the same answer (Part 10)](/en/blog/harness-journey-10-feedback-freshness)
