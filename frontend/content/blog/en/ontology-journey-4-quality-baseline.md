---
title: "A triple count told us nothing about knowledge graph quality (Part 4)"
cover: "/blog/ontology-journey-4-quality-baseline.svg"
description: "Separating volume, structural integrity, provenance, retrieval, and answers, to measure at which boundary graph quality actually changes."
date: "2026-05-21"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Quality evaluation", "Observability"]
draft: false
---
> **Knowledge graph design · 4/10**

Building different inputs in the new environment made it obvious that a triple count explains almost nothing about quality. A commerce CSV graph produced more than 250,000 triples, but most of them were rows and repeated relationships from a fact table. A document graph, meanwhile, expressed the core policies and their source material in fewer than a thousand triples. This was not a figure ranking the two datasets against each other; it was a counterexample showing that when the shape of the data differs, a triple count cannot serve as a common quality score.

A completed build state was not a quality guarantee either. Classes can be left flat with no relationships, provenance can be broken, and even when the graph has the structure an answer needs, retrieval may not fetch it. Looking only at an accuracy figure blends together whether the knowledge was missing, whether retrieval failed, or whether the evidence was found and then dropped from the answer.

To fix post-processing and retrieval, we needed to know not how much graph we had produced but at which boundary quality changed. So we started measuring volume, structural integrity, provenance, retrieval, and answers separately.

## Build, retrieval, and answer produce different failures

One question passing through the system can be seen in three stages.

```text
Build:     were the concepts and relationships the answer needs stored?
Retrieval: did we fetch the structure and source that fit the question?
Answer:    did the fetched evidence satisfy the requested form and scope?
```

At the build stage we look at structure rather than counts of classes and instances. Is there a relationship pointing at a URI that does not exist? Are property domains and ranges valid? Do concepts and relationships lead back to a source?

At the retrieval stage we look at which tools were actually called. A setting saying graph search is enabled is not enough. There has to be data in the target graph, the query has to have executed, and the results have to reach the final synthesis input before it counts as a run that used graph search.

At the answer stage we separate accuracy, completeness, and groundedness. For "tell me every product that applies," answering some products correctly gives accurate items but not a complete answer. And even with a citation marker, if it cannot be looked up again by source identifier, the evidence is not really connected.

Say the question "tell me all the products" comes back wrong. We check in order. First, is the full product set in the build result? If it is, does the retrieval record show the graph lookup actually being called and all candidates reaching the synthesizer? If everything is fine up to there, we finally check whether the answer model truncated the list because of an output budget. The same wrong answer splits into three different places to fix.

We also delimited the scope of the provenance metric. `sourceChunk` currently attaches at the level of classes, instances, and the subject node of a relationship, so you can get back to the relevant source — but it does not directly prove the basis for any one relationship triple. Relationship-level grounding needs a separate provenance model.

## We rebuilt the same inputs into fresh graphs

Looking only at an existing graph makes it hard to tell whether the current structure is the original intent or an accumulated result. We rebuilt collections of different character — document-style, finance-style, and structured commerce — and applied the same structural audit to each.

Document data produced a flat structure: many classes with almost no hierarchy between them. Structured data went the other way, faithfully carrying over every row and foreign-key relationship until entities and relationships grew excessive. By triple count both graphs looked rich, but the problems pointed in opposite directions.

That comparison stopped us from treating "there are a lot of nodes" as one problem. The document graph needed completeness of relationships and provenance; the structured graph needed a modelling standard for which rows should remain graph entities at all.

## We fixed the execution contract before starting the next comparison

Based on the failures this structural audit surfaced, we defined what counts as the same run before starting the June A/B. Storing only the question and the final answer makes it impossible to tell whether graph search actually ran or whether the answer came from a vector fallback.

We took the target collection and graph identifier, the prepared indexes, the tools called, the number of retrieval results, timeout state, and the evidence items passed to synthesis as one run's record. A setting saying the graph option is on was not accepted as evidence of actual graph use.

Time budgets for retrieval and synthesis, and the number and length of evidence items passed forward, were part of the comparison conditions too. If one retriever gets more time and more context, variables other than the retrieval structure leak into the score gap. The results of applying this contract to a real question set are in Part 6.

## A quality metric should point at the next fix

A good metric does not stop at describing the state; it tells you where to fix.

- If the needed relationship was never stored, change extraction and modelling.
- If the relationship exists but is not in the retrieval results, change indexing and the query plan.
- If the evidence was sufficient but the list was truncated, change the synthesis input and the output budget.

By that standard, the mass of nodes in structured data was a modelling problem, not a retrieval-tuning problem. Rather than replicating whole fact-table rows into the graph, we needed to keep the schema and the reference entities — and to constrain automatic cleanup by input provenance.

The next part applies this quality standard to structured data: which tables stay as entities and which keep only their structure, and the conditions that stop automatic merging and orphan deletion from erasing legitimate structure.

---
**Previous →** [Treating an ontology build that takes hours as a job](/en/blog/ontology-journey-3-build-service)
**Next →** [Shrinking CSV rows while keeping legitimate classes](/en/blog/ontology-journey-5-csv-cleanup-guards)
