---
title: "The search redesign that started with an A/B measuring an empty graph (Part 6)"
titleSeo: "An A/B on an empty graph (Part 6)"
cover: "/blog/ontology-journey-6-search-redesign.svg"
description: "Verify first that the graph was actually called, then replace the ReAct loop with parallel retrieval and a single synthesis, by contribution per question type."
date: "2026-06-08"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "GraphRAG", "Retrieval evaluation"]
draft: false
---
> **Knowledge graph design · 6/10**

The goal of ReAct search was never to call tools many times. It was to find broader evidence than vector search for relationship, list, and aggregation questions — without making simple factual questions slow. On the real operational path, several turns were running even for a single fact, and the accumulated source material was sometimes clouding the answer.

The initial A/B results said multi-turn search was both slower and less accurate. Before reverting the structure on that basis, we checked the execution records, and found the evaluation had been querying a graph with no data in it and effectively answering with vector search alone. We could not decide a retrieval structure on a miswired evaluation.

We re-measured using only runs where the graph was actually called, then compared contribution by question type. The result: keep the advantage of relationship traversal while cutting model turns, by gathering candidates from vector, graph, class, and structured-data paths in parallel and synthesizing exactly once.

## We checked the actual call, not the option

In the first comparison, multi-turn search came out slower and less accurate than the existing search. But following the execution records showed the evaluation harness was using the display name as the graph identifier. The request queried a graph that existed but was empty, and the answer was produced from vector search alone.

We discarded that result. Rather than the presence of `graph=true` in the settings, a run counted as graph search only if all of the following held:

- Is the evaluated collection actually linked to the real graph IRI?
- Do triples exist in the graph?
- Was the graph tool called?
- Were the returned relationships included in the synthesis input?

We also moved label search from a full string scan to a Lucene-backed `jena-text` index. The figures below come from an isolated environment where that index and a dataset assembler were prepared separately. Without the same configuration in a deployment environment, the `text:query` path does not reproduce. Having the graph feature turned on and having an operable retrieval path are not the same statement.

## The graph's contribution differed by question type

With the graph genuinely connected, we compared a fixed set of 100 questions. Every comparison used the same questions, answer model, vector evidence, time budget, and judgement criteria, varying only whether graph evidence was used. Correctness is a 0–1 score computed on the same judgement criteria. On the data at the time, the new retrieval configuration scored 0.465 and the existing configuration 0.230, with 34 and 13 fully correct answers respectively. These are the results under those evaluation conditions, not a general product performance guarantee.

The more important result was the isolated A/B by type. With the same vector evidence and answer model, we turned graph evidence off and on.

| Question type | Vector only | Vector + graph | Reading |
|---|---:|---:|---|
| Aggregation / list-everything | 0.033 | 0.683 | Needs the full entity set of a class |
| Relational lookup | 0.292 | 0.521 | Relationship traversal constraining subject and predicate together works |
| Single fact | ~0.46 | ~0.47 | Semantically close source search is enough |

The graph did not replace vector search on every question. It made a difference on questions where the answer *is* the connective structure or the set itself. On single-fact questions, adding graph traversal gained almost nothing.

## We gathered four kinds of evidence in parallel, instead of classifying the question

Putting a separate LLM classifier in front of the question makes misclassification a new failure point. Instead we run cost-bounded retrieval paths in parallel, and any path with no structural signal returns an empty result.

```text
Vector source search ───────────┐
Label / neighbour connectivity ─┤
Full class-set lookup ──────────┼─→ evidence ordering ─→ one answer synthesis
Precise subject/predicate query ┘
```

The class lookup runs only when a term in the question resolves to an actual class label. The relationship lookup constrains subject candidates and predicate together when a relational term in the question matches a predicate label in the graph. No word list is hardcoded into the prompt; the current graph's classes and predicates are the gate.

Retrieval results are synthesized once. Rather than leaving a loop to repeatedly judge "is the evidence sufficient?", each retriever deterministically performs the operation it owns and the synthesizer produces an answer from the evidence gathered. The full class list is placed at the front of the synthesis input with its own output budget, so a request for "all of them" does not get truncated during summarization.

## A good query plan decided accuracy and speed together

The first implementation of the precise relationship lookup swept every predicate — accurate, but slow on every question. We changed the order to bind the entity first with `text:query`, then examine only the matched predicates around it. Not assembling URI strings by hand also meant identifiers containing parentheses and spaces were handled safely.

In this structure the relational score rose from 0.292 to 0.521 while single-fact question speed held. The final single-synthesis configuration handled every question in one turn; in that evaluation the median was about 2.4 seconds and 95% of requests finished within 4.1 seconds.

The measurements do not mean multi-turn ReAct was a bad idea. It was necessary to rapidly expand the tools and exploration paths of relationship search. But once the index, class sets, and precise relationship queries were in place, there was less need for the model to rediscover the tool order on every question. So on the verified functional path we removed the ReAct loop and kept parallel retrieval with single synthesis. The results at this point are feature-branch and isolated-environment verification, and do not mean a production deployment was completed.

With the retrieval structure settled on single synthesis, the next work was distinguishing on screen only the nodes mentioned in the answer, rather than every keyword candidate. The next part covers how that highlighting scope shrank, and what limitation label-based linking still carries.

---
**Previous →** [Shrinking CSV rows while keeping legitimate classes](/en/blog/ontology-journey-5-csv-cleanup-guards)
**Next →** [Highlighting only the graph nodes the answer mentions](/en/blog/ontology-journey-7-evidence-ux)
