---
title: "The ontology build and search improvement journey, Part 3 — What to decide before adoption"
titleSeo: "Ontology limits, measurement, and adoption criteria"
cover: "/blog/ontology-journey-13-adoption-criteria-en.svg"
thumb: "/blog/ontology-journey-13-adoption-criteria-en-thumb.svg"
description: "The current limits and open choices—delete and update, typed values, provenance, namesakes, and evaluation—turned into B2B adoption criteria."
date: "2026-09-29"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Knowledge graph", "PoC", "Evaluation", "Governance"]
draft: true
summary: "An operational ontology requires clarity not only about implemented features but also unsupported scope and unresolved choices. This article covers deletion and updates, typed values and units, edge-level provenance, identity, explainability, and missing evaluation, then reframes decisions about seed schemas, reasoning, real-time scope, and relation extraction as PoC acceptance criteria."
faq:
  - q: "Do document deletion and updates immediately change the graph today?"
    a: "Not yet; they require a full rebuild. Because several chunks can share a node and its edges, removing one source needs rules for what to retain or delete and provenance at the relation level."
  - q: "What evaluation should an ontology PoC create first?"
    a: "Start with a gold set containing representative business questions, expected answers, and required evidence. Then agree on acceptance criteria for retrieval coverage, evidence alignment, latency, and deletion and update behavior by task."
---

> **Editor's note · B2B adoption perspective** — The maturity of a B2B system cannot be judged by feature count alone. Operational risk becomes measurable only when unsupported inputs, traceability after errors, and the decisions owned by the customer and supplier are explicit. This article does not hide the current limits and open decisions; it turns them into material for PoC acceptance criteria and a phased roadmap.

## What we still cannot do

The first two parts described what works. The things that do not work deserve equal weight.

Deletion and updates are not reflected. Deleting or changing a document—or deleting a row in an upstream database—leaves the graph unchanged until a full rebuild. Because nodes can be shared by many chunks, we still need rules for how far node and edge deletion should go when one chunk disappears. There is no repair for an earlier decision either. A fragment once folded or a name once discarded does not return when new evidence arrives, so results depend on document arrival order. We first need a design for retaining the evidence behind a removed name.

Values have no types. Property values are untyped strings, so the graph cannot answer numerical comparisons or range questions. This is one reason numerical questions remain weak. A unit written only in a table note, such as “unit: KRW 100 million,” attaches to values differently in each table and cannot be solved by one simple rule. Provenance reaches the node level. An answer links to an evidence node, the node to source chunks, and chunks to document locations. Each evidence chunk also records whether it came from vector retrieval or graph expansion. A particular relation, however, does not identify its source chunk, so we approximate it with chunks shared by the two endpoint nodes. Adding edge provenance requires both storage migration and extractor-output changes. Entity identity is still a normalized name, so namesakes are not distinguished. Explainability currently means source traceability; sentence-to-chunk alignment, confidence scores, and reasoning paths are not yet present.

There is also no measurement system. All 15 extractor thresholds are empirical, and there is no gold set. We cannot state whether a change improved or degraded quality until a user notices a strange name on screen. Every improvement in this series began that way. The quality score combines classes with instances at 0.4, referential integrity at 0.25, source-grounding rate at 0.2, and structural violations at 0.15, but it was built afterward and does not guide future changes. The first next task is therefore not a feature but a gold set and metric script: five documents, 30 human-selected terms, ten classes, and 20 table facts.

After measurement, the next target is where base-build decisions happen. Today the extractor, loader, and post-processing layers each decide differently whether a string is a name, a class, or the same entity. Fixing one layer can be undone by another, and cleanup has grown to eight passes. Entity decisions use local chunk information even though the necessary evidence is corpus-wide. In small collections, a 100% appearance ratio discarded the key entity connecting documents first; in large ones, one name became a hub with hundreds of parents. We have designed a four-stage flow—read structure, create candidates, make corpus decisions, assign layers—and plan to centralize all discard decisions in the corpus stage, but measurement comes first.

Other follow-up work includes feeding user-confirmed classes and synonyms back into later builds, source chunks on every edge, identity signals beyond names, SHACL reporting for required properties, domain and range, and cardinality, and competency-question coverage used as an evaluation metric rather than build input. Retrieval work includes RRF, reranking, and hierarchy expansion, but tuning those parameters comes after the gold set.

There is also a lesson in how we worked. We repeatedly shipped one fix per symptom. We fixed only two of four paths leaking retrieval headers and found the other two after deployment. We fixed the repeated empty build before discovering the 500-document limit above it. Since then, the default has been to scan the whole codebase for defects of the same class and group the fixes before deployment.

## What we have not decided

Between what works and what does not are choices we have not made. They are not merely technical problems: each choice changes the product, so they are listed separately.

| Decision fork | Options | What changes |
|---|---|---|
| Establish a domain schema first? | Ground to a seed schema / bottom-up derivation plus normalization / use a seed as reference only | Customer onboarding, relation quality, maintenance owner |
| Scope of the ontology's source of truth | Structure only / include values and types / limit it to chunk annotations | Numerical questions, storage migration, retrieval channels |
| Introduce reasoning | None / SHACL validation only / RDFS or OWL materialization / rule engine | Explainability form, store choice, performance |
| Real-time scope for transactional data | Knowledge documents only / structured watermark increments / streaming | Data boundary and infrastructure |
| Relation extraction time | Build time / query time / hybrid | Build cost, response time, incremental design |
| Explainability target | Chunk provenance / triple provenance / sentence citation / reasoning justification | Storage model, prompts, interface |

Our current positions are bottom-up derivation, structure only, no reasoning, structured watermark increments, build-time extraction, and chunk provenance. Every choice is the simplest option. We chose simplicity not because it is necessarily correct, but because we have not yet seen evidence that the more complex side is required. Seeing that evidence requires the measurement system described above.

The first row is especially open. Users can edit schema today, but those edits do not feed into the next build, and we lack a gold set for judging whether a seed schema improves results. Standard ontologies such as FIBO also require direct Korean labels, making adoption costly. How much schema a customer should establish first, and where automatic derivation should begin, remains unresolved.

## Between what we decided and what remains open

Our decisions reduce to three subtractions. Removing the LLM from the base build made a graph appear from document upload alone and made the same documents produce the same graph. Removing the repeated search loop brought exploration down to hundreds of milliseconds and let agents consume evidence without synthesis. Removing Fuseki from the canonical path stopped the store from blocking builds.

Each subtraction revealed that something we had trusted behaved differently under measurement. The build was not simply slow; it was reading only 500 documents. The standard recipe was not safe; it discarded the characters distinguishing opposite meanings in our documents. Incremental processing was not incremental; it rescanned everything. In all three cases, the system reported success. We discovered the problem only by opening the output itself.

The most valuable part of this architecture is therefore not what we removed, but what became measurable afterward. Without an LLM, equal inputs produce comparable outputs. Without the loop, retrieval time separates from generation time. With storage moved, build time can be measured stage by stage. Every open question comes next: whether a seed schema is necessary, whether values belong in the graph, and whether relation extraction can move to query time all require measurement, and measurement requires a gold set.

There are two ideas enterprise teams can take away. First, if ontology construction must run automatically, that requirement largely determines where to use an LLM and where not to. Second, whether it is a widely used recipe or your own system's success report, do not trust it until you open the result on your own data. Every problem we found lived behind a successful status.

---

## If you are considering B2B adoption

Before starting a PoC, agree in writing on a gold set of representative questions and answers, deletion and update policy, entity identity rules, required provenance granularity, acceptable error rates, and response time. Not every issue needs to be solved at once, but unsupported scope and the criteria for moving to the next stage must be explicit.

The core message of this trilogy is less about graph technology than about **turning choices into measurable operating criteria**. When customers and suppliers jointly define base-build guarantees, retrieval channels by question type, the canonical store and refresh ownership, unsupported scope, and evaluation metrics, an ontology can move beyond a demo into an operational foundation that improves over time.

---

**Previous →** [The ontology build and search improvement journey, Part 2 — Eight search turns became one fusion](/en/blog/ontology-journey-12-search-fusion-operations)

**Start of series →** [The questions were deciding the scope of the answers (Part 1)](/en/blog/ontology-journey-1-cq-to-document)

**See the whole series →** [The Ontology Diary](/en/blog/series/ontology)
