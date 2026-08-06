---
title: "Shrinking CSV rows while keeping legitimate classes (Part 5)"
cover: "/blog/ontology-journey-5-csv-cleanup-guards.svg"
description: "Separating fact-table row omission from orphan-class detection and deletion, so optimizing for size does not turn into loss of meaning."
date: "2026-05-30"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Structured data", "Data integrity"]
draft: false
---
> **Knowledge graph design · 5/10**

Converting commerce CSVs straight to RDF left most of the graph occupied by order and sales-history rows. Mapping tables to classes, columns to properties, and foreign keys to relationships was faithful to the original, but traversing to reference entities like product and category meant reading through an enormous fact record along the way.

The opposite problem also appeared. Cleaning up the graph by automatically deleting classes short of instances and relationships removed around 1,500 legitimate classes as well. Post-processing had judged concepts as unnecessary when extraction simply had not yet built enough relationships for them.

Both look like work to shrink a graph, but the criteria differ. Whether to keep structured rows has to be decided by the table's role; whether to delete an orphan class has to be decided by detection confidence and deletion authority. So we separated the modelling of reference data from that of fact records, and separated orphan detection from actual deletion.

## We modelled reference data and fact records differently

Data referenced repeatedly across tables — product, colour, category — is reference data. Keeping each row as an entity lets you follow relationships from product to colour, or from category to product.

Data that accumulates over time — orders, sales history, logs — is a fact record. It matters for aggregation and source lookup, but not every row needs to be a central entity in a long-lived graph. For those tables we kept the class, column, and foreign-key structure, and left the rows to a separate source store.

The judgement gives priority to reference structure over table names. If other tables reference it, it is a candidate for reference data; if it mostly emits references while linking several reference tables, it is a candidate for a fact or junction table. That said, the actual implementation does not rely on foreign-key direction alone — there is also a guard that conservatively keeps tables with few rows. That row-count threshold is not a domain invariant; it is an operational heuristic to lower the cost of misjudgement. Rows are also kept when only a single file arrives and the full reference direction cannot be known.

Applying these rules to the same data reduced entities from 13,798 to 286, leaving reference entities and schema relationships in place of bulk fact-row relationships. The reduction rate was not the important verification. We checked alongside it that the reference entities were still there, that foreign-key relationships connected in the right direction, and that the fact tables' schemas were preserved.

## We separated orphan detection from deletion

A class with no instances, not used as the domain or range of any property, and with no hierarchy can be treated as an orphan candidate. But if relationship extraction is still incomplete, a legitimate concept has exactly the same shape.

When automatic post-processing deletes orphan candidates outright, an omission from an earlier stage gets mistaken for data cleanup. On a real large graph, stopping automatic deletion and keeping only detection surfaced 1,568 candidates — and preserved 1,547 classes compared with the previous result.

We changed the default behaviour from deletion to reporting the candidate count. The current statistics keep only counts such as `orphans_detected`; candidate URIs and the basis for the judgement are not persisted. The safety line the implementation secured extends as far as turning automatic deletion off.

## Safe deletion needs a referential-integrity contract on top

A lower node count does not mean the cleanup is finished. Triples holding the target URI as subject or object, property domains and ranges, and records in the schema store all have to be checked together. If some references survive, the node disappears from the view while a broken relationship remains inside the schema.

The current explicit-deletion path removes outgoing triples where the target URI is the subject, but it does not atomically clean up incoming relationships pointing at that URI as object. So until candidate history, an incoming-reference check, and schema-record cleanup are combined into a single deletion plan, it is safer not to turn automatic deletion on in operation. Keeping the URIs and judgement basis so the next build can compare whether a candidate has disappeared is also follow-up work.

## Heavy post-processing got its execution resources separated from the control API

As duplicate cleanup and quality checks grew, the execution problem left over from Part 3 grew with them. Running document chunk scans, full schema queries, and CSV conversion synchronously inside a background coroutine lets one job occupy the event loop. Even with job state in a separate store, if the progress API does not respond the user cannot confirm cancellation or completion.

We moved the work whose duration scales with input size — Qdrant scans, database queries, CSV conversion, schema storage — onto worker threads. Short state updates that run only a handful of times per build stayed on the event loop. We did not mechanically separate every function; we picked the sections whose occupancy time is proportional to data volume.

Under local conditions scanning 26,934 chunks, we queried progress 50 times over 25.6 seconds and got responses averaging 12 ms with a maximum of 57 ms. Those are the numbers from that machine, not a general performance guarantee. The point of the verification was to confirm that the control API does not stall alongside a heavy build stage.

Making a structured graph small and making automatic deletion safe share the same principle. Do not shrink based on the shape alone — plenty of data, few connections — but change things based on the data's role and on how far the structure has actually been completed.

At this stage we fixed the generation rules for the structured graph, but a limitation remained: the semantic duplicate cleanup at the end of the build could not distinguish structured classes from document concepts. That problem showed up in real repeated builds once distinct table classes had been merged, and Part 8 resolves it by persisting generation provenance.

The graph structure is now ready to be used in retrieval. The next part measures the multi-turn ReAct search from Part 2 against a real question set, works out which questions need a graph and which do not need a loop at all, and then changes the retrieval structure.

---
**Previous →** [A triple count told us nothing about knowledge graph quality](/en/blog/ontology-journey-4-quality-baseline)
**Next →** [The search redesign that started with an A/B measuring an empty graph](/en/blog/ontology-journey-6-search-redesign)
