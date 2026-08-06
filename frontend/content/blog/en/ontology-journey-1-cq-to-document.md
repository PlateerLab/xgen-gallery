---
title: "Why we took the questions out of the ontology build (Part 1)"
cover: "/blog/ontology-journey-1-cq-to-document.svg"
description: "Questions stay in evaluation, and the source documents decide what knowledge gets discovered. Redividing responsibility in the build pipeline."
date: "2026-04-24"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Knowledge graph", "Data modelling"]
draft: false
---
> **Knowledge graph design · 1/10**

The early ontology build took competency questions as required input. By ontology here I mean a knowledge structure that expresses both the classes, properties, and relationships of business concepts and the actual instances of them. You decide on a question first — "what are the conditions for free shipping?" — and then look for the concepts and relationships needed to answer it. While the question list covered the business scope well enough, the results looked well aligned with the goal.

As documents piled up, the question list started deciding not just the evaluation criteria but the discovery scope of knowledge itself. With only questions about shipping and returns, seller liability, refund responsibility, and exception approval procedures written in the source could fall out of the graph. Switching to auto-generated questions did not change the limit. Anything missed at the question-generation stage could not be recovered downstream.

At the end of March we rebuilt the build pipeline and moved the responsibility. The source documents decide the discovery scope of classes, instances, relationships, and properties; the questions are used to evaluate whether the finished graph meets the actual requirements. Classes and instances are linked to the source through `sourceChunk`, and the chunk a relationship was extracted from is currently merged into the source list of the subject node. Knowledge not covered by any question is still stored, but with a way back to the relevant source later.

## Questions are requirements; source documents are the boundary of discovery

Question-driven builds mixed two roles together.

- Deciding what knowledge to look for
- Confirming whether the graph that was built is useful

Give questions the first role too and it becomes hard to discover what you do not yet know. For the second role, questions are exactly right — they let you check whether the concepts and relationships a particular question needs are in the graph, and whether search actually used that structure.

We moved the build input to the source documents and left the questions on the evaluation side. That split keeps the problems the graph has to answer while no longer limiting the knowledge that goes into the graph to a question list written in advance.

## We merged staged extraction into a single document interpretation

Once questions were out of the build, the reason to run concept extraction, named-entity recognition, relationship extraction, and data-property extraction as separate steps also shrank. With the stages separated, a later stage could not refer to a concept an earlier stage had missed, and the cost of reading the same sentence several times was high.

We merged the extraction responsibility so that reading one document chunk produces all of this together.

```text
Document chunk
  ├─ Classes and their hierarchy
  ├─ Instances
  ├─ Relationships between instances
  └─ Data properties
```

In this structure, which concept and which entity a relationship connects can be settled inside a single response. The graph builder converts the extraction result into RDF (a graph format expressed as subject, predicate, object), and the same concept arriving from different chunks is merged in post-processing. Questions are no longer required input to this flow.

## We stored provenance as part of the graph

Going document-first adds one more responsibility. It has to be possible to go back from each fact in the graph to the source it came from.

We attached `sourceChunk` to classes and instances. The chunk a relationship was extracted from is currently linked to the subject node of that relationship, not to the relationship triple itself. The retriever can use a node's source identifier to pull the relevant source chunk back. The graph provides the connective structure; the source provides the material for confirming an answer.

```text
Concept / relationship subject in the graph
        ↓ sourceChunk
Source chunk
        ↓
Answer and citation
```

When duplicate concepts are merged, their source lists are merged too. Unifying only the URI and keeping the source from whichever chunk was processed first shrinks the range of source material available for verification, even when the search result is right.

This model can take you back to the source a node appeared in, but it cannot distinguish which chunk directly supports which predicate. Evidence at relationship granularity needs a separate provenance model — RDF-star, reification, or named graphs — that attaches provenance to the triple itself.

## We separated build success from question success

In the new pipeline, question correctness and build completion state are separate. Input, extraction, schema, RDF, and provenance are observable per stage, and question correctness is evaluated separately against the same graph. A `completed` state does not currently mean every provenance and quality check passed, so it has to be read together with the warnings and the quality report.

The separation also sharpens failure diagnosis. If the relationship an answer needs is not in the graph, that is a build problem. If the relationship exists but was not retrieved, that is a search problem. If the evidence was retrieved but dropped from the answer, that is a synthesis problem. Three layers no longer get blended into one accuracy figure.

Document-first building widened the discovery scope. But one lookup across the graph and the source does not let you follow a chain of relationships. The next part covers extending a single-shot search into a multi-turn search that explores while choosing tools.

---
**Next →** [Why multi-turn GraphRAG was needed, and where it fell short](/en/blog/ontology-journey-2-react-graph)
