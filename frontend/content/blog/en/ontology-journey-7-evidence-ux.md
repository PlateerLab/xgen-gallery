---
title: "Most of the nodes we painted red were not evidence (Part 7)"
titleSeo: "What the highlight proves"
cover: "/blog/ontology-journey-7-evidence-ux.svg"
thumb: "/blog/ontology-journey-7-evidence-ux-thumb.svg"
description: "With retrieval quality raised, verifying on screen showed far more nodes highlighted than there was evidence for. What the highlight really proves."
date: "2026-06-16"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Evidence tracing", "Graph visualization"]
draft: false
---

**After rebuilding retrieval we opened the graph to verify answers on screen. Far more nodes were painted red than there was actual evidence for. We narrowed the highlight to labels that genuinely appear in the answer, and in the process had to rename the feature. It was not evidence tracing. It was string matching.**

---

## We opened the graph to verify an answer and it was red everywhere

Having settled the retrieval structure in Part 6, we opened the graph view to check on screen whether answers were right.

Far more nodes were highlighted than there was actual evidence for.

Keyword-matched candidates and their surrounding nodes were all painted the same colour. **There was no telling an entity used in the answer from one retrieval had merely passed through.**

Highlighting exists to give information, and in this state the screen could not narrow the grounding of an answer. It made everything look relevant, blurring the judgment of the person trying to check.

The cause was in the retrieval response. A fallback path treating keyword partial matches and whole neighbourhoods as evidence had survived. It was designed to show evidence generously, and generosity had become meaninglessness.

## We kept only candidates whose name appears in the answer

Narrowing the highlight needed a criterion.

The retriever gathers candidate node labels from graph triples and class results, then returns as evidence nodes **only those whose name is contained in the normalised final answer**. The frontend highlights only that list.

```text
retrieval candidates and traversal path
        ↓ does the name appear in the answer string
candidates mentioned in the final answer
        ↓
evidence node list
        ↓
graph highlight
```

Retrieval candidates and intermediate paths can remain as debugging or exploration information, but they are not mixed into the evidence colour.

With the highlight narrowed the screen became usable for actually verifying an answer.

Showing more looks safer when deciding what to display, since the user can pick from it. In practice it **hands the selection responsibility to the user at the screen**, and if we already held the information needed to select, we should not hand it over.

## What we built was string matching, not evidence tracing

Here we had to rename the feature.

This contract is based on **label strings**, not stable node identifiers or relation-level provenance. Two things follow.

If several nodes share a label they are all highlighted together. The screen cannot say which one the answer used.

And, more importantly: **the fact that a name appears in the answer cannot prove that node was actual reasoning evidence.** Whether the model composed its answer from that node, or the same name happened to land in an answer produced by another path, this contract cannot distinguish.

```text
what we confirmed   the highlight is narrower than the keyword fallback
what we did not do  prove that a highlighted node was evidence for the answer
```

So we did not call this change accurate evidence tracing. It is a UI improvement that reduced excessive candidate highlighting, and there is still no data contract proving actual reasoning evidence.

Part 1 recorded that provenance attaches to the subject node rather than the relation triple; Part 2 recorded that visited nodes are labels rather than stable identifiers. **This is the third appearance of the same gap.** Raising explainability on screen requires not only painting less but preserving, by identifier, which relations and source supported the answer.

Accurate citation linking needs stable URIs and a mapping from citation to triple to source chunk.

Writing down the scope a feature name promises, alongside the name, reduces the chance that unverified trust accumulates because of that name later. That goes double for features about explainability. **A wrong evidence indicator is worse than none.**

## The same graph, and two views were doing different jobs

As the graph grew the 3D view became another bottleneck.

It was useful for looking around the overall structure. Reading the evidence for a particular answer and selecting nodes in a dense graph was slow and unstable.

At first we treated this as a 3D problem to improve. Raise performance, improve selection accuracy.

That the two tasks want opposite things became visible later.

```text
3D   overall structure · neighbour expansion · spatial separation of large graphs
     → depth and rotation help

2D   evidence checking · relation label comparison · fixed selection scope
     → perspective and overlap get in the way
```

**Not every graph view has to serve the same purpose.** 3D's depth is needed for exploration and gets in the way of evidence checking.

So we added a 2D view for evidence checking and left 3D for structure and cluster exploration. Physics moved to a separate worker to reduce load on the main view.

Neither is set as the default answer; the user switches to match the task at hand. The evidence node list is shared as the same state across views.

That does not resolve the shared-label problem above. It only means the two views' highlights can be kept consistent.

When one screen is reported as not working well, the instinct is to improve that screen. The prior question is **how many jobs that screen is currently doing at once.** If it is more than one, separation may be the answer rather than improvement.

## Verification went past field existence to screen behaviour

We did not end verification at whether a backend field exists.

We confirmed that keyword candidates absent from the answer are no longer highlighted, that returned labels display the same way in 2D and 3D, and that a previous highlight does not linger on an empty graph or an answer with no evidence.

The last condition actually caught something. If a previous question's highlight remains, the user reads it as evidence for the new answer. The path that clears state mattered as much as the path that shows it.

## Deciding to paint less is as far as this part got

Written precisely, what we did here is narrow the highlight, split the roles of the views, and correct the feature's name to match its actual behaviour.

**We did not raise explainability; we reduced wrong explanation.** They are different. The second is a precondition of the first and does not substitute for it.

After tidying the evidence view, the next work was integrity across repeated builds: keeping structured classes from being merged in post-processing by recording their generation source, and storing completion criteria so documents do not re-extract chunks already processed.

---

**Previous →** [The A/B calling it slow and wrong was measuring an empty graph (Part 6)](/en/blog/ontology-journey-6-search-redesign)

**Next →** [Document dedup was merging structured tables (Part 8)](/en/blog/ontology-journey-8-structured-incremental)
