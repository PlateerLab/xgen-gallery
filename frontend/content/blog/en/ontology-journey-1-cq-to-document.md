---
title: "The questions were deciding the scope of the answers (Part 1)"
titleSeo: "Taking questions out of the build"
cover: "/blog/ontology-journey-1-cq-to-document.svg"
thumb: "/blog/ontology-journey-1-cq-to-document-thumb.svg"
description: "With only shipping and returns questions, the exception approval process in the source never entered the graph. Moving questions to evaluation."
date: "2026-04-24"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Knowledge graph", "Data modelling"]
draft: false
---

**The early ontology build took competency questions as required input, things like "what are the free shipping conditions". You fix the questions first, then find the concepts and relations needed to answer them. As documents grew, that question list was deciding not just the evaluation criteria but what would be discovered at all. Auto-generating the questions changed nothing. This is about finding two roles bundled inside one input, and pulling one of them out.**

---

## While the questions were good, the results looked good too

An ontology is a knowledge structure expressing the classes, properties, and relations of business concepts together with actual instances.

The early build took competency questions as required input. Decide the questions to answer first, then find the concepts and relations that answer them in the source.

While the question list covered the business scope well, results matched the goal. You get a graph that answers what you asked.

It started slipping as documents grew. With only shipping and returns questions, the seller liability, refund responsibility, and exception approval process written in the same source never entered the graph.

**The question list was deciding not just the evaluation criteria but the scope of discovery.**

## Auto-generating the questions left the bottleneck in the same place

Our first move was to stop making humans write the questions. Read the documents, generate questions automatically, and the list gets broader.

It did get broader. The limit stayed.

**What the question generation stage misses cannot be recovered downstream.** Whoever writes the questions, as long as that list is the pipeline's first gate, a concept that fails the gate never reappears.

What we had automated was the labour of writing questions; the bottleneck was in the structure where questions decide the scope of discovery.

At that point we looked again at questions as an input. Question-driven builds had two roles bundled together.

```text
role 1   decide what knowledge to look for   → you cannot find what you don't yet know
role 2   check whether the built graph is useful → questions are good at this
```

Leave the first role to questions and you cannot discover the unknown. The second role suits them well: you can check whether the concepts and relations a question needs exist in the graph, and whether retrieval actually used that structure.

At the end of March we rebuilt the pipeline and swapped the responsibilities. Build input moved to the source documents; questions stayed on the evaluation side.

That split kept the problems the graph must answer while no longer limiting the knowledge that enters it to a pre-written list.

Before automating something, there is a question worth asking. Is what you are automating the bottleneck, or the labour sitting in front of it? The two are usually adjacent, and without separating them you reduce only the labour and meet the same wall again.

## We had split the stages, and later stages could not see earlier mistakes

Taking questions out of the build surfaced something else.

Extraction at the time ran concept extraction, named entity recognition, relation extraction, and data property extraction as separate stages. Splitting stages seemed to make each easier to improve.

In practice a later stage could not reference a concept an earlier stage had missed. Something dropped in concept extraction cannot be connected in relation extraction. Reading the same sentence several times was expensive too.

**The same structure as the question gate existed between the stages.** What the front misses, the back cannot recover.

So we merged extraction responsibility to produce these results together while reading one document chunk.

```text
document chunk
  ├─ classes and hierarchy
  ├─ instances
  ├─ relations between instances
  └─ data properties
```

In this structure a relation's subject and object concepts can be reconciled within one response. The graph builder converts the extraction into RDF, the triple format of subject, predicate, and object, and the same concept from different chunks is merged in post-processing.

Slicing a pipeline finely is not always good. If information can fall out at a boundary you created, that boundary is not a unit of improvement but a point of loss.

## We attached provenance and still could not say which chunk supports which relation

Going document-first adds a responsibility. Every fact in the graph has to lead back to the source it came from.

We connected source chunks to classes and instances. The retriever can pull the related source chunk back using the node's source identifier.

```text
graph concept · relation subject
        ↓ sourceChunk
source chunk
        ↓
answer and citation
```

When merging duplicate concepts we merge the source lists too. Collapse the identifiers and keep only the first-processed chunk's provenance and the retrieval result is still right while the range of source you can check has shrunk.

Here we had to re-examine what we had been calling evidence tracing.

The chunk a relation was extracted from is connected to **the subject node of that relation, not to the relation triple itself.** So what this model supports is returning to the source where a node appeared, and **it cannot tell which chunk directly supports which predicate.**

Relation-level grounding requires a separate provenance model such as RDF-star, reification, or named graphs. This limit reappears in the same shape in Part 7 when we cover on-screen evidence highlighting.

Between "we attached provenance" and "we can trace evidence" there is often a gap like this. Writing down in one sentence what you can return from and to makes the gap visible.

## We stopped reading build success and answer success as one number

The new pipeline separated question correctness from build completion state.

Input, extraction, schema, RDF, and provenance became per-stage observation targets, and question correctness is evaluated separately against the same graph. A completed state does not mean every provenance and quality check passed, so warnings and the quality report have to be read alongside.

The split sharpened failure causes too.

```text
the relation the answer needs isn't in the graph   → build problem
the relation is there but wasn't retrieved         → retrieval problem
evidence was retrieved and dropped from the answer → synthesis problem
```

You no longer have to blend three layers into one accuracy figure. If a number does not contain where to look when it drops, you cannot plan the next piece of work from it.

## We did not remove questions; we split the two jobs questions were doing

Summarising this part as "we removed competency questions" is only half right.

The questions are still there. Their seat changed. What was an input to the build became the criterion for evaluation.

**What changed was not whether questions exist but what we let them decide.** The source decides what to look for; questions decide whether it is useful.

Stated without overreach, what this change confirmed is that concepts outside the question list can now be candidates for extraction. Whether that actually produces better answers needed separate evaluation, and that evaluation became the subject of Part 4.

One limit remains. A single lookup across the graph and the source does not let you follow relations several steps out. The next part covers widening a one-shot retrieval into multi-turn search where the model picks tools as it explores, and what that cost us.

---

**Next →** [What we truncated to save context was the evidence (Part 2)](/en/blog/ontology-journey-2-react-graph)
