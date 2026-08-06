---
title: "Why multi-turn GraphRAG was needed, and where it fell short (Part 2)"
titleSeo: "Multi-turn GraphRAG limits (Part 2)"
cover: "/blog/ontology-journey-2-react-graph.svg"
description: "For questions a single lookup cannot answer, graph traversal, source search, and structured queries are tied into one constrained tool loop."
date: "2026-05-03"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "GraphRAG", "ReAct"]
draft: false
---
> **Knowledge graph design · 2/10**

Even after we had a document-first graph, search results were not much different from plain vector search. Finding the source closest to the question and looking up the surrounding triples once was not enough to use relationships scattered across several documents, or connections that no question had asked about directly. We built the graph not to find one more similar sentence, but to follow the relationships and paths vector search misses.

A question like "what is the shipping fee threshold?" is answered in one sentence, and one lookup is enough. But "tell me who approves exceptions to this policy and which document that rests on" means finding the policy, following the exception relationship, confirming the approving party, and then reading the relevant source.

Adding a dedicated query per question type makes the branching and the prompt rules grow with every new combination. In April we introduced a ReAct structure — the model iterating over thought, action, and observation — so it could choose its next action among graph, source, and structured-query tools. Multi-turn was not the goal in itself; it was a way to find out whether the system could locate the relationships it needed before producing an answer.

## We treated search as a tool-selection problem, not an answer-generation one

A turn in multi-turn search has three parts.

```text
Thought: what information am I missing right now
Action:  which of the permitted tools do I call
Result:  the structured evidence the tool returned
```

The tools were divided so their roles do not overlap.

- Graph search, for triples of classes and instances
- Relationship traversal, following forward and reverse neighbours
- Chunk lookup, pulling the source through `sourceChunk`
- Auxiliary keyword search within the source
- Read-only SQL, handling aggregation and joins over tabular data

The model never touches the store directly. It moves only within the permitted tools and their argument schemas. Even the SQL allows only `SELECT` and `WITH`, and the schema is supplied before execution. That is what makes it possible to gain multi-turn flexibility while keeping the execution scope controlled.

When the turn limit is reached, the answer is synthesized from whatever evidence has been gathered. A termination condition is part of the execution contract, so the loop cannot run forever just because it has not found an answer.

## We did not carry every turn forward intact

Multi-turn widens the search scope but grows context fast. Feed every chunk and relationship from one turn back into the next and the model ends up reading more repetition of its own prior output than new evidence.

We kept the most recent three turns and summarized earlier ones around the tools that were called. But tool results were also truncated at 500 characters, and when synthesis was forced after hitting the turn limit, only the most recent messages were used. The source list survived in the response data, but the full evidence was not preserved in the synthesis context.

That truncation reduced context, but it also became the reason the tail ends of tables and long source passages were lost. Remembering which tools have already been tried and preserving the evidence needed for final synthesis turned out to be different problems. It was also the central limitation that made us revisit the multi-turn structure in later evaluation.

## We turned the exploration path into response data

Internal multi-turn logs alone make it hard for a user to see where an answer came from. We collected the nodes and edges visited in each tool call separately and included them in the response. That data is not debugging information; it is part of the search result.

The frontend highlighted this path in a 3D graph. Physics calculation for large graphs was moved into a Web Worker, and the tick transmission interval and link distance were tuned to node count.

At the time, the visited nodes in the response were labels or local names rather than stable URIs, and the view highlighted by `node.label`. The path was observable, but it was not an end-to-end identifier contract capable of distinguishing nodes that share a label. That limitation shows up again in the evidence highlighting of Part 7.

## Multi-turn raised exploration ability and variance together

For questions that require following relationships across several hops, multi-turn was useful. Even when the first lookup produced no answer, combining neighbour traversal and source lookup could build the evidence up. And the exploration path was visible on screen.

On the other side, the number of calls varied by question, and stacking the same evidence across several turns sometimes ran the source count up excessively. A single-fact question that used several turns mixed numbers and sentences irrelevant to the answer into the synthesis context. In operation, the long tail of latency became a bigger problem than the average response time.

At the time, widening the exploration scope was the priority, which is why we chose this structure. Measuring execution paths per question afterwards showed that not every question needs a loop. The reasoning behind changing the search structure, and the results, continue in Part 6 alongside the evaluation work.

First there was an operational problem to solve, ahead of search: the build itself had become a long-running job. The next part ties progress state, cancellation, input screening, and structured-versus-unstructured routing into a single build execution contract.

---
**Previous →** [Why we took the questions out of the ontology build](/en/blog/ontology-journey-1-cq-to-document)
**Next →** [Treating an ontology build that takes hours as a job](/en/blog/ontology-journey-3-build-service)
