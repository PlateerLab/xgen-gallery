---
title: "Triple counts told us nothing about graph quality (Part 4)"
titleSeo: "Graph quality in five boundaries"
cover: "/blog/ontology-journey-4-quality-baseline.svg"
thumb: "/blog/ontology-journey-4-quality-baseline-thumb.svg"
description: "The same pipeline produced 250,000 triples on one input and 1,000 on another. Both had problems, running in opposite directions."
date: "2026-05-21"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Quality evaluation", "Observability"]
draft: false
---

**Having made builds finish reliably, we tried to measure whether they were good graphs. The number in hand was the triple count. Commerce CSV produced over 250,000; a document collection produced fewer than 1,000. Both had problems, and the problems ran in opposite directions. This is about confirming it cannot be one number and splitting quality into five boundaries.**

---

## The same pipeline produced 250,000 and 1,000

In a fresh environment we built inputs of different character.

The commerce CSV graph produced over 250,000 triples, most of them fact-table rows and repeating relations.

The document graph expressed its core policies and related source in fewer than 1,000 triples.

This was not a comparison of which dataset is better. It was a **counterexample showing that when data shape differs, triple count cannot serve as a shared quality score.**

A completed build state was not a quality guarantee either. Classes can sit flat with no relations, provenance can break, and the structure an answer needs can exist in the graph while retrieval fails to fetch it.

Look only at accuracy and you blend three things: was the knowledge missing, did retrieval fail, or did the answer drop evidence it had.

**Knowing not how much graph was produced but at which boundary quality changed** is what lets you fix post-processing and retrieval.

## The same wrong answer had three places to fix

We split one question passing through the system into three stages.

```text
build      are the concepts and relations the answer needs stored
retrieval  did we fetch the structure and source that match the question
answer     did the fetched evidence meet the required format and scope
```

Say "list all products" comes back wrong. You check in order.

First, does the build result contain the full product set. If it does, check the retrieval record for whether the graph lookup actually fired and the full candidate list reached the synthesiser. If that is fine too, check whether the answer model truncated the list against its output budget.

**One wrong answer, three places to fix.** Look only at accuracy and you cannot tell them apart, and without telling them apart you cannot plan the next piece of work.

What to look at differed per stage too. In build we look at structure rather than class and instance counts: no relations pointing at nonexistent identifiers, valid property domains and ranges, concepts and relations leading to source provenance.

In answer we separate correctness, completeness, and grounding. If "list all matching products" gets some right, the items are correct but the answer is not complete. Citation markers that cannot be re-fetched by source identifier are not really connected grounding.

The reason people want to collapse quality metrics into one is usually that it reports well. If that one number does not say where to look when it drops, it serves reporting and not improvement.

## We were treating a setting being on as evidence the graph was used

Measuring the retrieval stage, one thing caught.

We were classifying a run as graph retrieval whenever the graph option was enabled.

**A setting is intent, not evidence.** Data must exist in the target graph, the query must actually have run, and the result must have reached the synthesis input, for it to be a run that used the graph.

Any of those three can break, and the answer still comes out, because vector search produces one instead. What that looks like in practice surfaces bluntly in Part 6.

So when starting the June comparison we first defined what counts as the same run.

```text
the record unit of one run
  target collection · graph identifier · prepared indexes
  tools called · retrieval result counts · timeout status
  evidence items passed to synthesis
```

Time budgets for retrieval and synthesis, and the number and length of evidence items passed, went into the comparison conditions too. If one retriever uses more time and context, differences beyond retrieval structure leak into the score.

Instrumentation that records a feature being enabled as usage is common. Unless the design accounts for enabled, used, and reflected-in-the-result being three distinct events, that data will later decide nothing.

## The same symptom, "too many nodes", was two opposite problems

Looking only at an existing graph, you cannot tell whether the current structure is the original intent or accumulated residue. So we rebuilt document, financial, and structured commerce collections and applied the same structural audit.

The document type produced many classes with almost no hierarchy: a flat structure. The structured type did the opposite, faithfully moving every row and foreign key until entities and relations grew excessive.

```text
document    many classes, no relations      → relation and provenance completeness missing
structured  every row and relation moved    → no criterion for what to keep as an entity
```

By triple count both look rich. **The prescriptions needed were opposite.**

That comparison stopped us treating "too many nodes" as one problem. The document graph needed work filling in relations and provenance; the structured graph needed modelling that decides which rows survive as entities.

Before prescribing the same treatment to two systems with similar-looking symptoms, it is safer to see at which boundary the symptom was produced.

## We narrowed what "provenance connected" claims, too

We redrew the boundary on the provenance metric as well.

Source chunks connect at the level of classes, instances, and the subject nodes of relations. You can return to related source, but **it does not directly prove the grounding of any single relation triple.**

We had written down that limit in Part 1 when building the model, and had to confirm it again while turning it into a metric. A number called provenance connection rate must not read as if it guarantees relation-level grounding.

Relation-level grounding needs a separate provenance model. Writing the guaranteed scope next to the metric name is the better option.

## A good metric points at what to fix next

The criterion this part settled reduces to one line: a metric must not stop at describing state but must indicate where to fix.

```text
the relation the answer needs wasn't stored     → change extraction and modelling
the relation exists but isn't in retrieval      → change indexing and query planning
evidence was sufficient but the list truncated  → change synthesis input and output budget
```

By that criterion the mass of nodes in structured data was a modelling problem, not a retrieval-tuning one. Rather than replicating every fact row into the graph, keep the schema and reference entities, and constrain automatic cleanup by input source.

The next part applies that conclusion to structured data. And in the work of shrinking the graph we caused an accident in the other direction: cleaning up, we deleted healthy classes en masse.

---

**Previous →** [We had put a multi-hour build in a cache (Part 3)](/en/blog/ontology-journey-3-build-service)

**Next →** [Cleaning up the graph deleted 1,500 healthy classes (Part 5)](/en/blog/ontology-journey-5-csv-cleanup-guards)
