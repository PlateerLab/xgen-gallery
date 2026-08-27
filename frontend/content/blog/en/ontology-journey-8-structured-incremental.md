---
title: "Document dedup was merging structured tables (Part 8)"
titleSeo: "Persisting generation source"
cover: "/blog/ontology-journey-8-structured-incremental.svg"
thumb: "/blog/ontology-journey-8-structured-incremental-thumb.svg"
description: "We built ten CSV tables and the post-processed graph held four classes. A rule for tidying document concepts had merged schema identifiers."
date: "2026-06-24"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Data integrity", "Incremental build"]
draft: false
---

**Right after building ten CSV tables there were ten classes. The post-processed graph held four. A rule tidying similar concepts from documents had merged schema identifiers from different tables into the same thing. This is about confirming that a class name means different things depending on its source, and leaving that source behind as data.**

---

## Ten classes right after the build were four after post-processing

The classes a CSV build first creates map one to one with input tables. Ten tables, ten classes.

Opening the post-processed graph, there were four.

One node carried labels from several tables. An order-related node had product variant and variant sales labels attached, and semantic similarity merging had clearly folded different tables into one identifier.

The merge rule itself was necessary. `Customer` and `Member` produced by a model from documents may be the same concept, and without tidying that duplication the graph holds one thing under several names.

The problem was that the rule also applied to structured classes.

**A structured class name is not a natural-language concept candidate but the schema identifier a foreign key points at.** Orders, product variants, and variant sales are different table roles however similar the names, and merging them collapses the reference structure.

```text
class from documents   Customer / Member   → may be the same concept. merging is fine
class from CSV         Orders / Variants   → schema identifiers. merging breaks references
```

Two kinds of class sitting in the same seat demanded different rules.

## Turning post-processing off did not solve it

The fastest response was to skip concept duplicate merging in pure structured builds. We did that.

Hybrid builds, where CSV and documents arrive together, remained. There, document concept deduplication is still needed. **Turning off all post-processing abandons one requirement** rather than satisfying both.

What was needed was not a switch but a distinction. Post-processing had to know which classes it may touch and which it may not.

That information was not in the graph. Whether a class came from a CSV schema or a document extraction was a fact known only during the build, and it disappeared when the build ended.

**The context the second run needed was vanishing along with the first.**

## We stored generation source in the schema, not as a pipeline flag

We stored a source on classes created from CSV and used it as a protection set for deduplication. A protected class cannot be a deletion target identifier.

Merge direction opened only one way.

```text
CSV class      → CSV class        never merged
CSV class      → document concept not permitted
document concept → CSV class      permitted when existing dedup rules judge them the same
document concept → document concept  existing dedup applies
```

If a concept extracted from a document points at the same thing as a structured class, it can be merged into the structured identifier. The reverse, erasing a structured identifier in favour of a document concept, is not allowed. The side that anchors references has to survive.

Source is stored **in the schema record**, not as a temporary pipeline flag, because the same protection rule must apply after a process restart or on the next incremental build.

We do not infer protection from description format or identifier naming. Judge by naming convention and protection disappears the day a name changes.

When merging data from several sources into one store, whether to keep source information is usually deferred; at merge time it looks unnecessary. **It becomes necessary the moment the rules for processing that data have to differ by source**, and by then the source is unknown.

## "Continue build" was not continuing but starting over

The same kind of problem appeared on the document side.

After adding a new document, running continue-build reprocessed every earlier chunk.

It did not erase the graph. It did send document groups back to the model from scratch. RDF insertion is idempotent, but **LLM extraction can differ run to run**, so cost and concept counts grow together.

The cause was the same as above. The set of completed chunks did not survive the build, so the next run could not know what to skip.

We stored the processed chunk list on completed jobs and computed the difference against the current chunk set.

```text
chunks to extract this time
  = current collection's chunk identifiers
  - the most recent completed build's processed list
```

Partial lists from failed or cancelled jobs are not used as a baseline, because the next run must not skip chunks whose reflection in the graph was never confirmed. A rebuild resets the baseline and reprocesses everything.

If the most recent completed job's list cannot be read we **fall back to full processing** rather than skipping anything by guess. When incremental optimisation fails, we chose to fail toward cost rather than toward data loss.

We do not compare chunk counts either. Delete one document and add another and the count matches while the input set differs. **Counts are usable for progress; change detection needs identifier sets.**

Under a condition where 8 of 11 chunks were in the completed baseline and 3 were new, the full build used 6 LLM calls and 25,755 tokens while the continue build called twice on the new chunks for 7,789 tokens. That is a result for particular documents and a particular model, not a general saving rate. What we confirmed is that the existing 8 dropped out of the call input and the baseline set updated to 11 on completion.

## Document chunks and structured files had different incremental units

Incremental processing could not apply identically to documents and CSV.

For documents the chunk entering the model is an independent unit of extraction. Sending only new chunks does not require reinterpreting existing ones.

A CSV row is different. Its meaning is fixed within the full column types, primary key candidates, and other tables' foreign key structure. **Detach one row and you cannot say what it is.**

So structured files bypass the chunk filter and reprocess the whole file.

Row-level incremental processing would first need stable primary keys, deletion tracking, and a foreign key update contract. That contract is designed separately in Part 10's database indexing.

Attaching incremental processing, the unit usually gets set to a file or a record. The question actually worth asking is **whether that unit can be independently reinterpreted.** If not, it is not an incremental unit.

## This run had to leave behind what the next run needs to know

The two problems here look different. One merged classes wrongly; the other redid the same work.

The cause was the same. **The judgment basis the next run needs vanished when this run ended.**

Generation source decides what post-processing may change; the completed chunk set decides what input must be reprocessed. Both were facts known during the run, and the next run lost them because they were not stored.

Building a pipeline that runs repeatedly, whether a single run finishes cleanly and whether the second run knows about the first turned out to be different problems.

What document incremental processing guarantees today is not re-extracting new chunks. Automatically invalidating triples built earlier from modified or deleted chunks requires further computation of per-source results and support from other sources.

The next part covers the problem sitting in front of this one: extraction failures caused by differing context and output limits across models, failing so quietly that they were recorded as successes.

---

**Previous →** [Most of the nodes we painted red were not evidence (Part 7)](/en/blog/ontology-journey-7-evidence-ux)

**Next →** [The job reported success and the graph was empty (Part 9)](/en/blog/ontology-journey-9-adaptive-extraction)
