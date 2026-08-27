---
title: "We had put a multi-hour build in a cache (Part 3)"
titleSeo: "Execution state is not cacheable"
cover: "/blog/ontology-journey-3-build-service.svg"
thumb: "/blog/ontology-journey-3-build-service-thumb.svg"
description: "As builds stretched into hours we replicated job state into a shared cache. When it expired we could not recover cancellation and resume state."
date: "2026-05-12"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Build pipeline", "Async jobs"]
draft: false
---

**With few documents an ontology build finished in one API request. As input grew to tens of thousands of chunks and CSVs, builds took hours and asking another instance for progress found no job. We replicated state into a shared cache, and when the cache expired we could not recover cancellation and resume information. This is about finding out that a build job was an operational record, not a cache entry.**

---

## A build that finished in one request became a multi-hour job

With few documents the build was simple. Read the input, call the model, store the graph.

As input grew to tens of thousands of chunks and CSVs, builds ran from minutes to hours. And requests asking "how far along is it" grew with them.

We could not answer. Job state lived in the API process memory. With several instances splitting requests, if the instance that created the job differed from the one queried, it was not found. Restarts erased the history.

We also tried reconstructing progress from processing markers in the graph. Then bulk writes and status queries competed for the same store.

**The graph is where the final state of knowledge lives, and we were trying to read the current state of execution out of it.**

## Replicating into a cache meant deciding which copy was authoritative

It was a sharing problem across instances, so a shared cache looked right. We replicated job state into Redis.

Cross-instance sharing was solved. Something else came out.

Build history also lived in the job database, PostgreSQL, so **we now had to decide which was authoritative.** And there was no answer for recovering cancellation and resume information after a cache expiry or a Redis restart.

Here it became clear what we had been treating a build job as. A cache holds **values that are nice to reuse briefly and can be rebuilt if lost.**

A build job is not that. Even after completion you need it to determine the failure cause and the restart point. Lose it and it cannot be rebuilt.

So we persisted the job record into PostgreSQL and removed the Redis job cache. Update state, a monotonic counter, and cancellation requests in one record and any instance, and any restart, reads the same values.

We did not merge PostgreSQL and the RDF graph store. Both persist data; the access shapes differ.

```text
job state        read and update one row often by job id   → PostgreSQL
knowledge result traverse classes and relations via SPARQL → Fuseki
```

Not a scheme for using two storage technologies but a split of two different access patterns and lifecycles.

Deciding where state lives, looking only at "many places must read it" makes a cache the answer. The question before that is **whether this value can be rebuilt once lost.** If it cannot, it cannot live in a cache.

## Progress is recorded rather than recounted from the graph

The job record holds total input count, processed count, current stage, cancellation request, and completion state. The worker increments the processed count on finishing a chunk group and the screen reads that value.

Progress queries finish at constant cost regardless of the graph's triple count.

```text
build job store          graph store
-----------------        ----------------
total/processed chunks   classes · instances
current stage            relations · properties
cancel/fail/complete     source provenance
```

State transitions are constrained too: pending to running, running to completed, failed, or cancelled.

One thing here is easy to misread, so it is worth stating. The job record surviving a restart **does not mean a stopped worker automatically resumes.** Resume policy and idempotency of the actual processing unit need a separate contract.

Cancellation requests also live in the job record. Workers check at group boundaries and stop. Ending at a boundary where you can pin down what completed is better for restarting than killing a process mid-upload.

At this stage execution state and result storage had separate responsibilities, but that did not guarantee status queries respond quickly. Synchronous document scans and database lookups inside background jobs occupying the event loop remained. **Splitting the job model and splitting execution resources were different problems**, and the latter came back in Part 5 once automatic post-processing grew.

## Korean documents were being discarded before extraction

In a long build, filtering useless input before calling the model matters. So we had an input gate.

It looked at string length and whitespace ratio. Rules built around English text.

Korean sentences, tables, and documents dense with numbers and code were being classified as non-natural-language there. **Documents that needed processing were discarded before ever meeting the model.**

The question we had asked when building the gate was "is this fluent English". What we should have asked was "is there anything here with symbols and meaning to extract".

Changing the question changed the method. Pass anything containing CJK characters; judge base64 by whether it actually decodes rather than by how it looks. Exclude only extreme cases with no alphanumerics at all or a single repeated character.

We rewrote the gate's role too. It does not make a final quality judgment on a document; it **removes only input that is clearly not worth a model call.** Ambiguous input goes downstream, and whether the extraction came back empty is recorded as a separate state.

Because discarding a valid document early costs more than one unnecessary call.

Designing a filter, people look at pass and block rates first. Deciding beforehand **which side is more expensive to get wrong** shortens the threshold argument considerably.

## Tables and documents had to take different paths inside one collection

The initial branch was per collection. If more than half the files were tables, take the CSV path; otherwise the document path.

Real collections are mixed. The path chosen by majority vote did not suit the rest of the files.

We split tables and documents per file and merged them into the same graph. Documents stream in chunk groups while the model extracts concepts and relations. Tables convert schema and row structure deterministically.

Morphology-based duplicate merging is not applied to CSV instances. Merging identifiers built from primary and foreign keys by semantic similarity **makes distinct rows disappear.**

Large RDF is not transmitted at once but split into batches and uploaded in parallel. In an isolated local environment we loaded 60,007 and 120,007 triples in batches and confirmed the re-queried counts matched.

## "Completed" did not mean verification had passed

The model returning JSON does not describe the whole build. We split input gating, extraction, structure validation, schema storage, RDF upload, and provenance into per-stage observation targets. Knowing where it stopped is what sets the retry scope.

The meaning of the completed state needs stating precisely here.

The current completion logic can transition to completed with a warning even when RDF triples exist and the PostgreSQL schema is empty. Storing the processed-chunk list is also best-effort.

So **completed is an execution state saying the worker finished, not a quality certification that all schema and provenance checks passed.** Warnings and the quality report must be read alongside.

Put several meanings into one status value and each reader interprets it differently. The screen paints it green, downstream work decides it may proceed, and the operator considers it checked. That value keeps getting used as long as any one of those is right.

## Finishing reliably and building a good graph were different things

After this part's work a build could be queried, cancelled, and located even when it ran for hours.

Looking back, all three were the same mistake. We read execution state out of the graph, put an operational record in a cache, and packed both execution state and quality certification into the single word "completed".

**Each time we were putting things with different lifetimes in the same place.**

And finishing reliably is not the same as building a good graph. Nobody was yet measuring whether a completed build produced anything usable. The next part covers what to look at instead of triple counts and completion states.

---

**Previous →** [What we truncated to save context was the evidence (Part 2)](/en/blog/ontology-journey-2-react-graph)

**Next →** [Triple counts told us nothing about graph quality (Part 4)](/en/blog/ontology-journey-4-quality-baseline)
