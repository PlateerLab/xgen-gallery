---
title: "Treating an ontology build that takes hours as a job (Part 3)"
cover: "/blog/ontology-journey-3-build-service.svg"
description: "Separating progress state from the graph, and making input screening and structured-versus-unstructured paths explicit, turns a long build controllable."
date: "2026-05-12"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Build pipeline", "Asynchronous processing"]
draft: false
---
> **Knowledge graph design · 3/10**

When there were few documents, an ontology build fit inside a single API request. Read the input, call the model, store the graph, done. Once the input grew to tens of thousands of chunks plus CSVs, a build ran from minutes to hours — and so did the number of requests asking which stage it had reached.

This post follows one mixed collection through registration, classification, processing, loading, and completion, and explains why we separated execution state from knowledge results.

In the original approach, job state lived in process memory, so another API instance querying it could not find the job, and a restart erased the history. Reconstructing progress from processing markers in the graph put bulk writes and state queries in contention over the same store. And filtering input by English whitespace ratio meant Korean sentences, tables, and number-heavy documents were being discarded before extraction.

As builds got longer, what we needed was not just faster model calls. We needed a durable job record owning state, cancellation, and restart, and a build service that splits structured and unstructured paths according to the input's actual shape. The graph owns the final state of knowledge; the job store owns the current state of execution.

## We made PostgreSQL the system of record for job state

Job state started in API process memory. Once several instances were splitting requests, the instance that created a job and the instance queried for its state differed, and 404s followed. Replicating state into Redis, the shared cache, solved cross-instance sharing, but build history also lived in PostgreSQL, the operational database, so we would have had to decide again which was authoritative. And how to restore cancellation and resume information after a cache expiry or a Redis restart was still open.

A build job is not a cache to reuse briefly; it is an operational record you consult after completion to find the cause and the restart point. So we persisted `ontology_build_jobs` in PostgreSQL and removed the Redis job cache. Updating state, a monotonically increasing counter, and the cancellation request in one record means other instances — and the system after a restart — read the same values.

We did not merge PostgreSQL and Fuseki, the RDF graph store, into one. Both store data for the long term, but the query shapes differ. Progress reads and updates a single row by job ID, frequently; the graph traverses classes and relationships with SPARQL. Putting job state in PostgreSQL and knowledge results in Fuseki is not a setup for running two storage technologies — it separates two different access patterns and lifecycles.

## Progress is recorded, not recounted from the graph

The job record stores total input count, processed input count, current stage, cancellation request, and completion state. The worker increments the processed count monotonically as it finishes each chunk group, and the view reads that value. A progress query costs the same regardless of how many triples are in the graph.

State transitions are constrained to `pending → running → completed | failed | cancelled`. The job record is restored after a restart, but that does not mean an interrupted worker automatically resumes. A resume policy and idempotency at the actual processing unit need their own contract.

```text
Build job store               Graph store
-------------------          ------------------
Total / processed chunks      Classes, instances
Current stage                 Relationships, properties
Cancel / fail / complete      Source provenance
```

The cancellation request is also left in the job record. The worker checks it at a group boundary and stops safely. Terminating at a boundary where you can establish exactly how far the work got is better for restart and recovery than killing the process mid-upload to the graph.

At this stage the responsibilities of execution state and result store were separated, but that did not guarantee the state API always responds quickly. Synchronous document scans and database queries inside the background job still occupied the event loop. Separating the job model and separating execution resources are different problems, and the latter comes back once the scope of automatic post-processing grows.

## Input screening looks at extractability, not language

In a long build, filtering out useless input before the model call matters. But simple rules based on string length and whitespace ratio easily misjudge Korean sentences, number-heavy tables, and documents with code mixed in as non-natural-language.

We changed the input gate's question from "is this natural English prose?" to "is there symbol and meaning here worth extracting?" If CJK characters are present it passes, and base64 is judged by whether it actually decodes rather than by how the characters look. Only extremely low-diversity input — no alphanumerics at all, or the same character repeating — is excluded.

The gate does not make a final judgement on document quality. It removes only input that is obviously not worth a model call. Ambiguous input goes downstream, and whether extraction came back empty is recorded as a separate state. Discarding a valid document early costs more than one unnecessary call.

## Tables and documents take different paths within the same collection

Branching per collection — send everything down the CSV path if more than half the files are tabular, otherwise send everything down the document path — cannot handle mixed input. We split tables and documents per file and built a hybrid path that merges them into the same graph.

Documents stream through as chunk groups while the model extracts concepts and relationships. Tables are converted deterministically from their schema and row structure. CSV instances are not put through morpheme-based duplicate merging: merging identifiers built from primary and foreign keys by semantic similarity can make distinct rows disappear.

Large RDF (triple data expressed as subject, predicate, object) is not sent in one go; it is split into batches and uploaded in parallel. On an isolated local Fuseki we loaded 60,007 and 120,007 triples in splits and confirmed the re-query counts from the store matched.

## We separated completion state from quality verification

That the model returned JSON does not describe the whole build. We split input screening, extraction, structural validation, schema storage, RDF upload, and provenance into per-stage observables. You have to know which stage stopped to decide the scope of a retry.

That said, the current completion logic can leave a warning and still transition to `completed` when RDF triples exist but the PostgreSQL schema is empty, and storing `built_chunk_ids` is best-effort. So `completed` is an execution state meaning the worker finished — not a quality certification that every schema and provenance check passed. It has to be read together with the warnings and the quality report.

With this structure a build became a controllable job even when it takes a long time. But finishing reliably and producing a good graph are different problems. The next part covers dividing graph structure, provenance, and question answering into distinct quality boundaries, instead of judging by triple count or completion state.

---
**Previous →** [Why multi-turn GraphRAG was needed, and where it fell short](/en/blog/ontology-journey-2-react-graph)
**Next →** [A triple count told us nothing about knowledge graph quality](/en/blog/ontology-journey-4-quality-baseline)
