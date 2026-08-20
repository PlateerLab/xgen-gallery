---
title: "Why ten CSV classes became four (Part 8)"
cover: "/blog/ontology-journey-8-structured-incremental.svg"
thumb: "/blog/ontology-journey-8-structured-incremental-thumb.svg"
description: "Persisting generation provenance so post-processing cannot rewrite a structured schema, and computing reprocessing scope from the last completed build."
date: "2026-06-24"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Data integrity", "Incremental builds"]
draft: false
---
> **Knowledge graph design · 8/10**

Right after building ten CSV tables there were ten classes. In the post-processed graph there were four. Distinct table classes had been merged onto the same URI because their meanings looked similar. A rule for tidying up similar concepts extracted from documents was rewriting the identifiers of a structured schema.

Document incremental builds showed a similar problem. Adding new documents and running "continue build" still reprocessed every previous chunk. The set of completed chunks did not survive the end of the build, so the next run had no way of knowing what to skip.

The shared cause was that the context the next run needs was not left as persistent data. We started storing whether a class came from a CSV schema or from document extraction, and which chunks were part of the most recent successful build, and computing the next build's protection and processing scope from that.

## A structured class is a schema identifier, not a meaning

The classes a CSV build first produced corresponded one to one with the input tables. But in the post-processed graph, 10 classes had become 4. The `Orders` node carried the labels `ProductVariants` and `VariantSales` alongside, which confirmed that semantic-similarity merging had collapsed distinct tables onto one URI.

`Customer` and `Member`, extracted by a model from documents, may well be the same concept. `Orders`, `ProductVariants`, and `VariantSales`, however similar their names, are distinct table roles. The name of a structured class is not a natural-language concept candidate; it is the schema identifier a foreign key references.

We stopped running concept-duplicate merging on pure structured builds. But hybrid builds, where CSVs and documents arrive together, still need duplicate cleanup for document concepts. Turning post-processing off wholesale does not solve it.

## We stored generation provenance alongside the schema

Classes created from CSVs store `source=csv` and are used as a protected set during duplicate cleanup. A protected class cannot become a deletion target. A concept extracted from a document that points at the same thing as a structured class can be merged toward the structured URI — but the structured URI is never removed in favour of the document concept.

```text
CSV class      → CSV class        never merged
CSV class      → document concept not allowed
document concept → CSV class      allowed where the existing duplicate rule judges them the same concept
document concept → document concept  existing duplicate cleanup applies
```

Provenance is stored in the schema record, not as a temporary pipeline flag. That way the same protection rule applies after a process restart or when the next incremental build begins. We do not infer protection from the wording of a description or the shape of a URI.

## Continue-build uses the chunks of the last completed run

The old continue-build did not wipe the graph, but it still sent document groups back to the model from the beginning. RDF INSERT may be idempotent, but LLM extraction varies between runs, so cost and concept counts can both grow.

We store `built_chunk_ids` on completed jobs and compute the difference against the current chunk set.

```text
Chunks to extract this time
  = chunk IDs in the current collection
  - built_chunk_ids of the last completed build
```

Partial processing lists from failed or cancelled jobs are not used as a baseline. That prevents the next run from skipping chunks whose reflection into the graph was never confirmed. A rebuild resets the baseline and reprocesses every input.

If the baseline list from the last completed job cannot be read, we fall back to processing everything rather than skipping chunks on a guess. When the incremental optimization fails, we chose to fail toward higher cost rather than toward missing data.

Nor do we compare total chunk counts alone. Delete one document and add another and the count is the same while the input set has changed. A count is fine for progress; a change judgement needs the identifier set.

## Document chunks and structured files have different incremental units

For documents, the chunk that goes into the model is an independent unit of extraction. Sending only new chunks does not require reinterpreting the old ones. A row in a CSV, on the other hand, takes its meaning inside the whole column-type picture, the primary-key candidates, and the foreign-key structure of other tables.

Structured files are routed separately before the chunk filter applies, and the whole file is reprocessed. Row-level incrementality would first need stable PKs, deletion tracking, and an FK-update contract. That contract is designed separately in the DB ingestion of Part 10.

Under a condition where 8 of 11 chunks were in the completion baseline and 3 were newly added, a full build used 6 LLM calls and 25,755 tokens. The continue-build called only the new chunks — 2 calls, 7,789 tokens. Those are the results for a specific document and model, not a general savings rate. What we confirmed is that the existing 8 dropped out of the call input, and that the baseline set was updated to 11 on completion.

Generation provenance decides what post-processing may change; the completed-chunk set decides what input has to be reprocessed. For repeated builds to be safe, that basis for judgement has to survive the end of a run.

Document incrementality currently guarantees as far as not re-extracting new chunks. Automatically invalidating triples that modified or deleted chunks previously produced would require computing per-source results and whether other sources still support them. The next part deals first with extraction failures caused by differing context and output limits across models, handled by batch splitting and retry.

---
**Previous →** [Highlighting only the graph nodes the answer mentions](/en/blog/ontology-journey-7-evidence-ux)
**Next →** [Adapting extraction batch size to the model's limits](/en/blog/ontology-journey-9-adaptive-extraction)
