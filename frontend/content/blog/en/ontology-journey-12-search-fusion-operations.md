---
title: "The ontology build and search improvement journey, Part 2 — Eight search turns became one fusion"
titleSeo: "Graph and vector retrieval in one fusion"
cover: "/blog/ontology-journey-12-search-fusion-operations-en.svg"
thumb: "/blog/ontology-journey-12-search-fusion-operations-en-thumb.svg"
description: "How we replaced repeated LLM exploration with one graph-vector fusion and made the canonical store and incremental refresh operational."
date: "2026-09-22"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "GraphRAG", "Hybrid retrieval", "Incremental indexing", "XGEN"]
draft: true
summary: "Graph and vector retrieval are not competing approaches; they serve different questions. This article covers the move from an eight-turn LLM tool loop to one fusion of class enumeration, one-hop relations, entity expansion, and vector retrieval; why PostgreSQL became the graph's system of record; and how supposedly incremental processing was still scanning the full collection."
faq:
  - q: "When is graph retrieval better than vector retrieval?"
    a: "It is stronger for aggregation, enumeration, and relationship questions: how many, what are all of them, and what connects to what. Vector retrieval remains strong for similar descriptions and context, so a production service should fuse the two channels."
  - q: "Why is PostgreSQL the ontology's canonical store?"
    a: "It fits the product's authentication, backup, migration, and multi-tenant operations and keeps graph structure and source-chunk links in one operating model. RDF and Fuseki can remain export formats or optional mirrors."
---

> **Editor's note · B2B adoption perspective** — An ontology working technically and working reliably in a customer's process are different achievements. Customers care less about graph complexity than getting the expected answer repeatedly within a defined time, knowing where the evidence lives, and knowing when new documents become searchable. This article separates graph and vector roles by question type and connects them to response SLAs, the canonical store, and refresh cadence.

## We replaced an eight-turn loop with one fusion

The previous search used an LLM to choose among vector, SPARQL, neighbor, path, and aggregation tools in a loop of up to eight turns. It helped with questions that required following several relations, but calling an LLM every turn was slow. The LLM also kept taking graph tools and missed the source chunks entirely, creating recurring recall failures. Broader exploration came with greater variance.

We started by defining exactly where a graph is better than vectors. Embedding retrieval is continuous similarity; a graph query is set operation. Questions asking how many, all items, or connections receive more complete evidence from a graph, while simple fact lookup is roughly equal. We made class enumeration, one-hop relations, and entity expansion separate channels and fused them as peers with the vector channel.

```text
Vector seeds ∥ label linking → one-hop relations ∥ full class set ∥ entity expansion → PPR rerank
                                           ↓
                               MMR evidence selection → one LLM synthesis
```

Exploration does not use an LLM. Query terms are linked to node labels with morphology and Korean 2-grams. If a linked node is a class, the system enumerates all instances up to 150. It expands one hop from entities appearing in retrieved chunks and adds up to 12 chunks containing those entities. Nodes appearing in fewer chunks are treated as more discriminative and seed personalized PageRank, an idea inspired by HippoRAG. PPR changes ranking rather than expanding the candidate pool, and is mixed with the vector score at 15 to 85. Top-k adapts to the score distribution, while MMR prevents near-duplicate chunks from crowding out rare but decisive exceptions or warnings. Exploration needs to finish in hundreds of milliseconds so agent workflows can request evidence without LLM synthesis.

Synthesis calls the LLM once with explicit rules: cite graph relations for relationships, membership, and hierarchy; cite source text for numbers, proper names, and table values; invent nothing outside the evidence. Only nodes that actually appear in the answer are marked as evidence, avoiding highlights broader than the answer. Retrieval lives in a separate library, validated on other corpora before the product consumes it.

| Measurement | Condition | Result |
|---|---|---|
| 15 relational questions | 2,185 relations after relation build, against vector-only | cov@3 0.57→0.63, complete top-1 33%→40%, answer directly in relation block 93% (vector-only 0%) |
| 15 relational questions, regenerated | Graph from new extractor | answer coverage 0.67 vs 0.60, answer directly in relation block 80% (vector-only 0%) |
| 40 fact lookup questions | Same collection | roughly equal, 2% difference |
| 20 QA questions in another collection | Base build only, without relation build | answer directly in relation block 20%, cov@3 0.92, equal to vector-only |
| Retrieval time | 420-chunk collection, graph plus vector | median 0.43 seconds (0.21–1.27) |

The next-to-last row matters. In a collection with only the base build and no relation building, adding graph retrieval was no better than vectors alone. A graph does not help merely because entities exist; it helps when relationships exist among them. Retrieval itself is fast. Nearly all user-perceived delay comes from answer generation. The 40 fact questions being equal is as important as the relational results. Graph retrieval does not replace vectors; it handles questions vectors are not built to answer. Only after measuring that boundary could we say where the loop was unnecessary. Numerical comparison remains weak, for reasons connected to value storage discussed in Part 3.

## The ontology was both data and an index

The graph was originally stored as RDF in Fuseki. We assumed an ontology store should be canonical because this was an ontology. In operation, queries blocked during builds and progress tracking was unstable, contributing to build delay. The ontology store was slowing ontology construction.

We moved the canonical graph to three PostgreSQL tables: nodes, edges, and node-to-source-chunk links. Nodes are classes, entities, or properties. Edges represent membership, hierarchy, entity relations, or class-level declarations. Every entity and class points to a source chunk or database row identifier. Fuseki is now an optional write mirror, off by default, and OWL output contains class and property definitions only. We do not use a property-graph database such as Neo4j.

Moving storage also clarified what the ontology means. The ontology is the source of truth for structure; chunks and SQL are the source of truth for content. Nodes and edges directly answer what belongs to what, what connects, what is above and below, and how many items a type contains. For numbers, conditions, and prose, the ontology points to the original chunk or structured table. It is data by storage form and metadata by its role in retrieval. Entities and relations are independent data rather than tags attached to chunks so the same entity scattered across documents can be gathered once and used to retrieve its relations and evidence. Source links on nodes provide both provenance and the starting point for entity expansion.

![The XGEN knowledge-management graph viewer. Circle size represents instance count by class. The collection contains 43,878 triples, 802 classes, and 15,287 relations; the viewer draws a structure-first sample and distinguishes class, instance, property nodes and relation types.](/blog/ontology-decisions-viewer.png)

*The clustered overview in the graph viewer. It shows instance counts for each class and draws a structural sample instead of every node. One label that could identify the collection has been hidden.*

The interface had to change with storage. The graph view had shown the first 500 nodes in insertion order—0.95% of a 50,000-node collection, specifically the earliest nodes. We changed it to retain high-degree nodes and always include evidence nodes regardless of the cap. Evidence highlights disappeared in large collections because the evidence was usually off-screen. Later, in a 22,001-node collection, we reduced rendered nodes from 7,469 to 2,899 and CPU use from 25% to 10%.

The product now exposes domain name, automatic relation expansion for new documents, build and rebuild, remaining chunks, model selection for relation building, database ingestion, cancellation, progress stages, and concept, relation, triple, and token counts. The viewer defaults to 2D with optional 3D, legends for node and edge types, merged-name indicators, node search, statistics, quality badges, and change history. Node cards show parent and child hierarchy, predicates by direction, type, and provenance, values, source previews, document navigation, and relation and node editing. Search streams answers, counts relations and chunks, summarizes paths, highlights evidence nodes, and moves the camera. Workflow retrieval nodes automatically enter ontology mode for collections with a graph and can control evidence count, chunk length, folder scope, and whether synthesis is included.

Editing stops there. Class and property definition editing, node merge, and label edit are not supported, and rebuilds erase manual edits. The build does not yet read a user-confirmed schema back as feedback; that connects to the open decisions in Part 3.

## Our incremental build was still reading everything

Only extraction was incremental. Seven cleanup stages at the end rescanned the whole collection on every build. In a collection with 150,000 labels, recomputing normalized name keys took 42 seconds and recomputing morphological boundaries for hierarchy inference took 103 seconds every time—even when there were zero new chunks.

The root cause was that we persisted none of the evidence for “same entity” or “parent and child.” We recomputed morphology and normalized keys and discarded them, so adding one document restarted everything. We stored the result on each node: a name-key column and index, populated once when a node first arrives. Same-entity grouping moved from a full Python grouping pass to an indexed group query with zero morphological analyses. Hierarchy candidates narrowed to new names and old names that could connect to them. Selecting old names from 150,000 rows costs 0.06 seconds.

One detail appeared during equivalence testing. We built ten old names, added six new ones, and compared edges from a full inference with incremental inference. Four edges matched, and all four pointed in the reverse direction: an old name became a child of a new name. Looking only at new names would miss all four. Incremental processing must inspect not just new data but old data whose result can change because of the new data.

The build now works as follows. As soon as embedding finishes after upload, the base build processes only new chunks. A ten-minute sweep recovers missed collections. It reads the difference from the last completed job and ends immediately when there are no new chunks. A full rebuild of a 28,083-node collection takes 253 seconds for the base build and 273 seconds for relations; two documents finish within 30 seconds. External databases read rows after a watermark, loading 200 rows in ten seconds. Stable primary-key identifiers make the job idempotent even if the watermark is reset and all rows are read again.

| Trigger | Condition | Target |
|---|---|---|
| Upload hook | Immediately after document embedding | Base build for new chunks only |
| Relation chain | After the hook when automatic relation expansion is enabled | Chunks without extracted relations |
| Periodic sweep | Every ten minutes after a 90-second startup delay when built chunks are below collection chunks | Up to 20 collections sequentially |
| Setting change | When relation building is enabled | Existing documents retrospectively |
| Manual action | Build, rebuild, or relation-expansion button | Rebuild deletes everything first |
| External DB job | Based on watermark column | New rows only, idempotent |

We therefore assume acceptable freshness is measured in minutes. A person uploads a document and searches afterward, so we did not think second-level reflection was necessary. We have not yet validated that assumption with customers. For structured data, some review or approval status changes daily, while orders and inventory can change every minute or second. We are not yet convinced the latter belongs in an ontology at all. In indexing cost, this design resembles Lazy GraphRAG: it creates no LLM summary at indexing time, and computes relation lookup, full enumeration, and reranking at query time. The remaining question is whether build-time LLM relation extraction can also move to query time.

## What we use today

| Area | Technology | Role |
|---|---|---|
| Storage | PostgreSQL, JSONB properties, trigram and name indexes | Canonical graph, label and value matching |
| Vector | Qdrant | Chunk embedding retrieval and chunks mentioning an entity |
| Korean | Kiwi morphology | Entity boundaries, name index, query terms, common-word decision, Hearst patterns |
| Deterministic extraction | Table grid parser, Hearst patterns, compound-noun heads | Base build |
| LLM | OpenAI, Anthropic, Google, vLLM, structured output | Relation extraction, synonym merge, English URI translation, one retrieval synthesis |
| Retrieval | omnifuse, our PyPI library | One-shot fusion, adaptive top-k, MMR, relation ranking |
| Graph algorithms | Personalized PageRank, Louvain | Chunk reranking and viewer clustering |
| RDF | rdflib, Jena Fuseki as optional mirror | OWL TBox generation and optional SPARQL |
| Interface | Next.js, Canvas 2D, Three.js, d3-force | Graph viewer, node cards, search panel |

Public methods we drew on include HippoRAG's entity expansion, PPR, and node specificity; LightRAG's delta indexing; EDC schema feedback; Graphiti candidate indexing; Hearst patterns; and MMR.

---

## If you are considering B2B adoption

Separate representative questions into **relationship and list, similar-document, and exact number or condition** categories, then assign responsibility to graph, vector, or SQL channels. Measure quality, latency, and model-call cost for each category. One aggregate accuracy number cannot explain why a particular business question fails.

The operational agreement should also specify the canonical store and write authority, service behavior during rebuild, refresh cadence, and acceptable staleness. Even a stable architecture leaves real data problems such as deletion, namesakes, and provenance. Part 3 turns those unresolved items into an adoption checklist and acceptance criteria.

---

**Previous →** [The ontology build and search improvement journey, Part 1 — Why we removed the LLM from the automatic build](/en/blog/ontology-journey-11-automatic-build)

**Next →** [The ontology build and search improvement journey, Part 3 — What to decide before adoption](/en/blog/ontology-journey-13-adoption-criteria)

**See the whole series →** [The Ontology Diary](/en/blog/series/ontology)
