---
title: "Highlighting only the graph nodes the answer mentions (Part 7)"
titleSeo: "Highlight only what was cited (Part 7)"
cover: "/blog/ontology-journey-7-evidence-ux.svg"
thumb: "/blog/ontology-journey-7-evidence-ux-thumb.svg"
description: "Removing keyword partial matches and neighbour inflation, so only candidate labels that appear in the answer text are highlighted in the 2D and 3D views."
date: "2026-06-16"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Evidence tracing", "Graph visualization"]
draft: false
---
> **Knowledge graph design · 7/10**

After raising retrieval quality, verifying answers on screen showed far more nodes highlighted in red than there was actual evidence for. Keyword-matched candidates and their surrounding nodes were all painted the same colour, so there was no telling an entity used in the answer from one the search had merely passed through.

As the graph grew, the 3D view became another bottleneck. It was useful for looking around the whole structure, but reading the evidence for a particular answer and selecting nodes in a dense graph was slow and unstable. Not every graph view needs to serve the same purpose.

We removed the fallback in the search response that treated keyword partial matches and whole neighbourhoods as evidence. Instead, among the retrieval candidates' labels, only those that actually appear in the final answer string are returned as `evidence_nodes`, and the view highlights only that list. The 2D view became the place to check nodes related to the answer; the 3D view became the place to explore overall structure and clusters.

## We separated all candidates from the labels the answer mentions

The retriever gathers candidate node labels from graph triples and class results, then puts into `evidence_nodes` only those whose name is contained in the normalized final answer. The frontend highlights only that label list. Retrieval candidates and intermediate paths can remain as debugging or exploration information, but they are not mixed into the evidence colour.

```text
Retrieval candidates and exploration path
        ↓ evidence selection
Candidates whose name appears in the final answer
        ↓
evidence_nodes
        ↓
Graph highlighting
```

This contract is based on label strings, not stable node IDs or relationship-level provenance. If several nodes share a label they may be highlighted together, and the mere fact that a name appears in the answer does not prove that node was actually the basis for the reasoning. What we verified is that the highlighting scope is smaller than with the keyword fallback. Precise citation linking needs stable URIs and a `citation → triple → sourceChunk` mapping on top.

## We split the purposes of the 2D and 3D views

The 3D graph is good for looking around the whole structure and unfolding a dense relationship network. Depth and rotation let you explore a large graph, and moving physics calculation to a Web Worker keeps load off the main view.

Reading the evidence for a final answer has different requirements. What matters is comparing node names and relationship labels quickly, and not losing the handful of nodes tied to a citation. We added a 2D view with less perspective and overlap, and used it for checking evidence.

The two views draw the same graph in different ways.

- 3D: exploring overall structure, expanding neighbourhoods, spatially separating a large graph
- 2D: checking answer evidence, comparing relationship labels, holding a fixed selection scope

Neither is treated as the default correct one; the user switches to whichever fits the task at hand. The `evidence_nodes` label list is shared as the same state across both views. That keeps the highlighting aligned between them, but it does not solve the same-label node problem described above.

## We verified the contract end to end, from retrieval result to screen behaviour

Verification did not stop at whether the backend field exists. We checked that keyword candidates absent from the answer are no longer highlighted, that returned labels render the same way in 2D and 3D, and that no stale highlighting survives on an empty graph or an answer with no evidence.

We did not call this change "accurate evidence tracing." It is a UI improvement that reduces excessive candidate highlighting, and the data contract that would prove the actual reasoning basis is still outstanding. Raising explainability on screen requires preserving, by identifier, which relationships and which source passages supported the answer — not just deciding what to paint less of.

After cleaning up the evidence view, the next work was integrity across repeated builds: persisting generation provenance so structured classes do not get merged in post-processing, and storing completion criteria so documents do not re-extract chunks that were already processed.

---
**Previous →** [The search redesign that started with an A/B measuring an empty graph](/en/blog/ontology-journey-6-search-redesign)
**Next →** [Why ten CSV classes became four](/en/blog/ontology-journey-8-structured-incremental)
