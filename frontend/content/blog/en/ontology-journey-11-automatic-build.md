---
title: "The ontology build and search improvement journey, Part 1 — Why we removed the LLM from the automatic build"
titleSeo: "A deterministic ontology build without an LLM"
cover: "/blog/ontology-journey-11-automatic-build-en.svg"
thumb: "/blog/ontology-journey-11-automatic-build-en-thumb.svg"
description: "How we separated the LLM from the automatic ontology build and found silent document loss, damaged Korean meaning, and false paths created by value nodes."
date: "2026-09-15"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Knowledge graph", "Automation", "Data quality", "XGEN"]
draft: false
summary: "An ontology build that runs on every upload has to guarantee not only accuracy but predictable cost, reproducibility, and visibility into missing work. This article explains why we separated deterministic extraction from optional LLM relation building, how an SDK default silently excluded documents, and where standard similarity methods and value nodes produced errors in Korean business data."
faq:
  - q: "Why did you remove the LLM from the base ontology build?"
    a: "A process that runs on every upload needs manageable cost and latency and reproducible results. The base build uses table structure, morphology, and Hearst patterns deterministically; LLM relation building runs only for collections where a user enables it."
  - q: "Does a successful build mean every document was processed?"
    a: "No. A query limit or pagination error can leave the job successful after processing only part of a collection. Input and processed document and chunk counts must be reconciled, with separate warnings and metrics for limits and omissions."
---

**This is how the XGEN ontology works today. Upload documents and it builds a graph of classes, entities, and properties without calling an LLM once. Relation building adds LLM-extracted relations only for collections where a user enables it. Search fuses vector and graph evidence in one pass and calls the LLM once for synthesis, while PostgreSQL is the graph's system of record. We did not draw this shape from the start. We arrived at it by removing the LLM from the base build, the repeated exploration loop from search, and Fuseki from the canonical store. Each subtraction showed that something we had trusted behaved differently when measured. This series records both the decisions we made and the ones still open.**

---

> **Editor's note · B2B adoption perspective** — The first challenge in an enterprise ontology is not choosing the most sophisticated model. It is repeating the same process at predictable cost and quality every time documents arrive. Formats, languages, business terms, and volume keep changing in customer environments. This article shows how the operational requirement of an automatic build shaped the design, and why a PoC should measure processing coverage, reproducibility, and failure visibility alongside average accuracy.

## Requiring ontology construction on every upload determined the design

Our first pipeline was top-down. We extracted concepts from competency questions, created an OWL schema first, and then extracted entities against it. It was close to the standard approach described in ontology textbooks. The problem was that every customer had a different level of data definition, and we could not assume a domain expert would write competency questions or a schema first. We also tried having an LLM generate the questions, but the question stage remained and prevented full automation. We changed direction to a bottom-up approach in which documents alone produce a graph.

We also considered ontology-guided extraction against predefined classes and relations. The current version does not place a domain seed ontology such as FIBO or schema.org in the extraction stage. Feedback and post-processing described later use the word “ontology,” but they organize a schema the system derived itself rather than follow an external ontology. We therefore do not describe the current approach as ontology-guided.

The bottom-up choice added one condition: ontology construction had to run automatically on every document upload. If users had to press a button, most collections would remain without a graph. Calling an LLM on every upload, however, was too expensive. A document can contain dozens of chunks, and we have seen collections with more than a thousand documents. This condition determined almost every later choice. We had to separate what had to be cheap from what could be expensive, and remove the LLM from the former.

## We brought LLM calls in the base build down to zero

We split the build into two paths. The base build extracts entities from document structure and never calls an LLM. For tables and row dumps, it reads rows as entities and headers and captions as types and properties. In prose, Korean Hearst patterns such as “C such as A and B” establish hierarchies, while the head of a compound noun supplies a parent concept. The head of “internal audit regulation,” for example, is “regulation.” Morphological rules determine name boundaries. This stage runs automatically after upload and finishes within 30 seconds for a two-document collection. Structured data follows a separate path. CSV files and external database query results map tables to classes, columns to properties, and foreign keys to relations deterministically, without an LLM.

Relation building is an optional stage on top. Only when a user enables it for a collection do we call an LLM once per group of 300 chunks to extract subject-predicate-object relations among entities already found. It also works retrospectively on documents already present when the option is enabled. At first, every group extracted relations independently. In measurements, 22 actual relations produced 16 to 19 predicate names: variants equivalent to “belongs to,” “belongs to regulation,” and “is part of” split into separate predicates. We now feed the entity list and predicates already used into the next group. The prompt encourages reuse but does not enforce a closed set, because a closed set leaves no room for a new kind of relation. This has the same intent as schema feedback in EDC-family research.

```text
[Document upload]  [Chunk & embed]     [Base build]              [Relation build]
PDF · HWP · DOCX → chunks + vectors → deterministic, LLM 0 → LLM only when enabled
External DB SELECT                     table · morphology       relations among entities
                                              ↓                         ↓
                                      PostgreSQL graph (canonical)
                                      nodes · edges · node→source chunk
```

The base build follows another rule. Decisions use only morphological tags, appearances in the source, and corpus statistics. We keep no domain word list or example strings in code. Such lists would be impossible to maintain for every customer, and they also remove ordinary-looking words that are important in a particular domain. A word meaning “limit” might look like a general term but be central in finance. Even for common-word filtering we use frequency ranks in the morphological dictionary instead of a word list. Until we learned that out-of-dictionary terms receive a very small rank, this method also mistook domain terms such as “photoresist” and “stepper” for common words.

Once the LLM was gone, we needed another way to tell whether results had improved or deteriorated. Measurement showed that the real problems were not where we removed the LLM, but somewhere else entirely.

## The build was reading only 500 documents

It started with the question, “Why is this build so slow?” In a collection of 1,186 documents, nearly all 102 build records were identical: 164 seconds, 10,056 chunks, and 54,809 triples. The same build repeated forever at 11.6-minute intervals.

The cause was an SDK query function whose default limit was 500. None of the four paths used by the build raised the limit. There were 1,186 documents and 29,506 chunks, but the build saw 10,056 chunks—the first 500 documents. Two consequences followed. Another 686 documents, or 66% of the chunks, never entered the ontology. Vector search found them because it queried the vector store directly, while the graph did not, so evidence depended on which document in the same collection contained it. The backfill sweep also never stopped. It rebuilt whenever the processed chunk count was below the collection total, and that gap could never close while the build saw only 500 documents.

The defect survived because it was quiet. Every build reported success and produced a quality score. The fix therefore did more than specify a higher limit: it emits a warning whenever a limit is reached. Silent truncation gives an operator no clue why documents are missing. A regression test also checks the source to ensure build paths do not call the SDK directly, because fixing only one path lets the bug return through another.

Other defects found around the same time had the same character. Prose was mistaken for a table, turning all 32 entities in one document into fragments such as “application,” “define,” and `document_type`, because table detection relied on equal word counts per line. Morphological concatenation split compound names at the wrong boundary, changing both entities and their relations. Search-oriented headers attached to chunks during upload leaked into relation extraction and answer-generation prompts and took 31% of a 400-character chunk.

## A standard recipe merged opposite meanings

For name merging, we first looked at common practice. Recent incremental knowledge-graph implementations narrow candidates with character 3-grams and MinHash instead of scanning the graph, then treat a Jaccard similarity of 0.9 or higher as the same entity. It looked safe to adopt a widely used recipe.

We ran it on our labels first. Across two real collections with 2,880 and 2,906 labels, it found 12 new pairs beyond those already merged by our morphological name key. Three pairs had opposite meanings. “Improvement potential 低” and “Improvement potential 高” became identical at similarity 1.00. “Before admission processing” and “After admission processing,” and “Beginner I” and “Beginner II,” also merged.

The cause was clear. The 3-gram normalization discarded characters outside letters, digits, and Hangul. Characters that may be disposable in English names were the only distinction in Korean business documents: Chinese characters and Roman numerals. Our morphological key retained Chinese characters as nouns, keeping 低 and 高 apart. On this data, the existing method was safer than the standard recipe. We also tested an entropy gate for fuzzy merging, but in Korean it acted mostly as a proxy for length and could not distinguish plain headers from real classes. One useful change remained: quote variants had split one name into three nodes, so we now remove symbols only at the edges of a key. Symbols inside, such as ℃ or %, remain because they carry meaning.

## Turning values into nodes created false paths

We decided where property values should live at the same time. At first, making values into nodes seemed natural: in a graph, represent everything as nodes and edges. But unrelated entities sharing a value such as “2024” or “Seoul” became two-hop neighbors through that value node. A branch located in Seoul could become connected to an event held in Seoul. Property values therefore stay as value lists on an entity rather than separate nodes.

For the same reason, fact tables with more than 200 rows contribute only their schema. Turning every row into an entity forces retrieval to read a huge fact record just to find a reference entity, while SQL is more accurate for numbers anyway. We do not run a reasoner either. RDFS or OWL inference and SHACL validation would bind storage to a particular graph database. Decisions finish in Python at build time, while storage remains ordinary node and edge tables. Materializing one level of inherited properties and computing quality metrics are the limits of build-time reasoning today.

---

## If you are considering B2B adoption

At this stage, the first agreement should be **what the base pipeline guarantees, not which model to use**. Check whether input and processed document counts can be reconciled, reruns produce consistent results, opposite business terms and numbers and units survive, and a usable base result remains when LLM enrichment fails.

Operational metrics should include total processing coverage, warnings for omissions and limits, differences across reruns, and regression tests for critical business terms—not just average accuracy. A stable graph does not automatically produce good retrieval. Part 2 looks at where graph exploration and vector search belong and how they connect to latency, storage, and refresh operations.

---

**Next →** [The ontology build and search improvement journey, Part 2 — Eight search turns became one fusion](/en/blog/ontology-journey-12-search-fusion-operations)

**See the whole series →** [The Ontology Diary](/en/blog/series/ontology)
