---
title: "What we truncated to save context was the evidence (Part 2)"
titleSeo: "The cost of widening exploration"
cover: "/blog/ontology-journey-2-react-graph.svg"
thumb: "/blog/ontology-journey-2-react-graph-thumb.svg"
description: "We added multi-turn search to follow relations. Context grew, so we cut tool results to 500 characters, and long sources never reached synthesis."
date: "2026-05-03"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "GraphRAG", "ReAct"]
draft: false
---

**After building a document-centred graph we looked at retrieval results and they were much like plain vector search. We added multi-turn exploration so relations could be followed several steps, and when context grew we truncated tool results to 500 characters. That truncation was keeping the tails of tables and long sources from ever reaching synthesis. This is about what widening exploration cost us.**

---

## We built a graph and retrieval looked like vector search

In Part 1 we changed the pipeline so documents decide the scope of discovery. More concepts and relations entered the graph than before.

Opening the retrieval results, they were much like the existing vector search.

The reason was on the retrieval side. It found source close to the question and did one lookup of neighbouring triples. That leaves relations scattered across documents, and connections not directly named in the question, unused.

**We had not built a graph in order to find one more similar sentence.** It was to follow the relations and paths vector search misses, and the retrieval structure could only walk one step of that path.

The number of steps needed varied by question.

```text
"what is the shipping fee threshold"
  → the answer sits in one sentence. one lookup is enough

"who approves exceptions to this policy, and on what document"
  → find the policy → follow the exception relation → confirm the approver → read the source
```

You could write a dedicated query per question type. As combinations grow, so do the branches and prompt rules.

So in April we added a structure where the model repeats thought, action, and observation, choosing its next action among graph, source, and structured query tools. Multi-turn was not the goal in itself. It was to see whether the system could find the relations it needs before composing an answer.

## We treated retrieval as tool selection rather than answer generation

A turn has three parts.

```text
Thought  what information am I missing
Action   which of the permitted tools do I call
Result   the structured evidence the tool returned
```

Tools were divided so their roles do not overlap: graph search over class and instance triples, relation traversal following forward and reverse neighbours, source chunk lookup by provenance, keyword search within source text, and read-only SQL for aggregation and joins over tabular data.

The model does not touch the stores directly. It moves only within the permitted tools and argument schemas. SQL allows only read constructs and receives the schema before execution.

On reaching the turn ceiling it synthesises an answer from the evidence collected so far. We put a termination condition into the execution contract so a loop does not run forever because it has not found the answer.

When designing exploration permission for a model, what you actually decide is not how much freedom to give but **what unit it acts in**. Fix the unit of action as a tool and you get the flexibility while keeping the execution scope controlled.

## What we truncated to save context happened to be the evidence

Multi-turn widens retrieval scope and grows context fast. Put every chunk and relation from one turn back into the next and the model reads more repetition of its own prior output than new evidence.

So we kept the last three turns, summarised earlier turns around the tools called, and cut tool results to 500 characters.

Context shrank. And the tails of tables and long sources disappeared.

When the turn ceiling forced synthesis, only the most recent messages were used. The provenance list in the response still carried the names, while **the content of that evidence was absent from the synthesis context.**

```text
exploration   call tools repeatedly and gather evidence
              ↓ 500-character truncation + keep last 3 turns
synthesis     compose an answer from only part of what was gathered
              the provenance list still shows all of it
```

What surfaced here is that we had been treating two things as one.

**Letting the model remember which tools it already tried, and preserving intact the evidence synthesis needs, were different problems.** The first can be summarised. Summarise the second and the answer changes. Applying the same truncation rule to both was the mistake.

That limit became the core reason we later revisited the whole retrieval structure.

When deciding what to cut in a context-reduction effort, look separately at whether the content feeds the next decision or the final artifact. If their lifetimes differ, so should how they are kept.

## We made the exploration path response data rather than a log

Internal multi-turn logs alone do not let a user see where an answer came from.

We gathered the nodes and edges visited on each tool call and included them in the response. That data is not debugging information but part of the retrieval result.

The frontend highlighted that path in a 3D graph. Physics for large graphs moved to a separate worker, with update cadence and link distance adjusted by node count.

There was a boundary here too. The visited nodes in the response at the time were labels or local names rather than stable URIs, and the view highlighted by label.

We could observe the path, but **it was not an identifier contract that distinguishes nodes sharing a label.** The same kind of gap as provenance attaching to the subject node rather than the relation in Part 1, and it reappears exactly in Part 7's evidence highlighting.

## Multi-turn widened exploration and widened variance with it

For questions requiring several steps of relation traversal, multi-turn helped. Even without an answer on the first lookup, neighbour traversal and source lookup could fill in evidence, and the exploration path was visible on screen.

The price came in three forms.

Call counts varied by question. Accumulating the same evidence across several turns sometimes inflated the number of sources. And single-fact questions whose answer sits in one sentence also spent multiple turns, mixing unrelated numbers and sentences into the synthesis context.

What hurt more in operations than average latency was **long-tail latency**. Most are fast and a few are very slow, and users remember the few.

At the time widening exploration was the priority, so we took this structure. Only after actually measuring per-question execution paths did we confirm that **not every question needs a loop**. That measurement and its results continue in Part 6.

## A design that widens needs a condition that narrows

The choice in this part was turning retrieval from a single lookup into a tool-selection problem. That choice still holds.

What we left out was the condition for narrowing after widening. We did not decide when a loop is warranted, what may be summarised versus kept verbatim, or what identifies a node.

**Adding exploration capability is generally visible; the variance that capability creates only becomes visible in production.**

And a problem sitting in front of retrieval grew first. Building the graph itself became a multi-hour job, and we could no longer answer the question of how far along it was. The next part covers turning that long build into a controllable job.

---

**Previous →** [The questions were deciding the scope of the answers (Part 1)](/en/blog/ontology-journey-1-cq-to-document)

**Next →** [We had put a multi-hour build in a cache (Part 3)](/en/blog/ontology-journey-3-build-service)
