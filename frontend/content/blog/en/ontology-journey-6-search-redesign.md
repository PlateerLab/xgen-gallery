---
title: "The A/B calling it slow and wrong was measuring an empty graph (Part 6)"
titleSeo: "Re-measure before reverting"
cover: "/blog/ontology-journey-6-search-redesign.svg"
thumb: "/blog/ontology-journey-6-search-redesign-thumb.svg"
description: "An A/B said multi-turn search was slower and less accurate. The evaluation was querying an empty graph and answering from vector search alone."
date: "2026-06-08"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "GraphRAG", "Retrieval evaluation"]
draft: false
---

**We measured the multi-turn search from Part 2 against real questions and it was slower and less accurate than the existing search. Just before reverting the structure we opened the execution record and found the evaluation querying an empty graph and effectively answering from vector search alone. This is about what the numbers said once the graph was properly connected, and how those numbers changed the retrieval structure.**

---

## We opened the execution record just before reverting

The goal of multi-turn search was never to call tools repeatedly. It was to find broader evidence than vector search on relation, list, and aggregation questions without making simple factual questions slow.

The first A/B was unambiguous. Multi-turn was slower and less accurate.

With numbers that clear, reverting was the move. Before that we followed the execution record.

The evaluation harness was using a display name as the graph identifier. Requests went out normally, queried a graph that **existed but was empty**, and the answers were produced by vector search alone.

```text
what the evaluation measured  a run that failed graph lookup and answered from vector search
what the evaluation called it "graph retrieval"
```

**We had not measured the difference between two configurations. We had measured the cost of bolting a graph round trip onto the same vector search.** Slower was expected; equal accuracy was expected too.

We discarded that result. In Part 4 we had decided not to treat an enabled option as evidence of use, and the evaluation harness was still doing exactly that.

So we pinned four conditions for counting a run as graph retrieval.

```text
is the evaluated collection linked to a real graph identifier
does the graph contain triples
was the graph tool called
did the returned relations make it into the synthesis input
```

When a measurement comes back opposite to expectation, it is worth suspecting the instrumentation before reverting the structure. Especially when **the result raises one hand very cleanly**. A miswired experiment usually gives a very crisp answer.

Label search also moved from a full string scan to index-backed lookup. The figures below come from an isolated environment with that index and dataset configuration prepared separately; without the same setup in a deployment environment they do not reproduce. **Having the graph feature switched on and having an operable retrieval path are not the same thing.**

## Re-measured, the graph's contribution differed by question type

With the graph actually connected we compared a fixed set of 100 questions. Same questions, answer model, vector evidence, time budget, and judgment criteria, varying only whether graph evidence was used.

The new configuration scored 0.465 and the existing one 0.230, with 34 and 13 fully correct answers respectively. That is the result under those evaluation conditions, not a general product performance guarantee.

More important was the split by type.

| Question type | Vector only | Vector + graph | Reading |
|---|---:|---:|---|
| Aggregation / list all | 0.033 | 0.683 | needs the full entity set of a class |
| Relational lookup | 0.292 | 0.521 | traversal constraining subject and predicate together works |
| Single fact | ~0.46 | ~0.47 | semantically close source retrieval suffices |

The graph did not replace vector search on every question. **It made a difference only where the answer is the connection structure or the set itself.**

On single-fact questions adding graph traversal produced essentially no gain. In Part 2 we wrote that spending several turns on single-fact questions was the problem; here it was confirmed in numbers.

Looking only at the overall average, this ends at "adding the graph took 0.230 to 0.465". That sentence is true and says nothing about what to do next. Only after splitting by type did **where a loop is unnecessary** become visible.

## Instead of classifying questions we ran four paths together

If different question types need different things, classifying questions first seems right.

Put an LLM classifier in front and misclassification becomes a new failure point. Classify an aggregation question as single-fact and it never sees the graph at all.

So we chose not to classify. Cost-bounded retrieval paths run in parallel, and paths with no structural signal return empty.

```text
vector source search ────────────┐
label · neighbour connectivity ──┤
class full-set lookup ───────────┼─→ evidence ranking ─→ one synthesis pass
precise subject·predicate lookup ┘
```

Class lookup runs only when a question term resolves to an actual class label. Relation lookup constrains subject candidates and predicate together when a question's relation term matches a predicate label in the graph.

We did not hardcode a word list into the prompt. **The graph's current classes and predicates act as the gate.** Change the graph and the gate changes with it.

Synthesis happens once. Rather than letting a loop repeatedly judge "is this evidence enough", each retriever performs its assigned operation deterministically and the synthesiser composes from what was gathered.

The full class list goes at the front of the synthesis input with its own output budget reserved, so a request for "all of them" is not truncated during summarisation. That is also a response to Part 2, where truncation erased evidence.

When branching seems necessary, putting a classifier in front is natural. If misclassification is expensive, running several cheap paths and using only the ones with signal can be better.

## An accurate query was not the same as a slow query

The first implementation of precise relation lookup scanned all predicates. It was accurate, and slow on every question.

It looked like a trade-off between accuracy and speed. It was an ordering problem in the query plan.

We bound the entity first via the index, then checked only matched predicates in its vicinity. Not composing identifier strings directly means identifiers with parentheses and spaces are handled safely.

The relational score went from 0.292 to 0.521 while single-fact speed held. The final configuration handled every question in one turn, with a median of about 2.4 seconds and 95% of requests finishing within 4.1 seconds in that evaluation.

**Accuracy and speed improving together usually means the earlier implementation was not a trade-off.** Before giving up one of them, look at the ordering of the plan.

## Multi-turn was not wrong; its job was finished

What we did with the measurement was remove the Part 2 structure. On the verified feature path we dropped the multi-turn loop and kept parallel retrieval with single synthesis.

That does not make multi-turn a wrong idea.

It was necessary to expand the tools and exploration paths of relation retrieval quickly. Which tools were needed and in what order they produce answers is what the model told us by exploring on every question.

Once the index, class sets, and precise relation queries existed, **there was less reason for the model to rediscover tool ordering each time.** What had to be discovered was already in the code.

So multi-turn was not the final structure but the instrument for finding it. Build the exploratory structure first, harden what it teaches into a deterministic path. Looking back, that order could not have been reversed.

The results at this point are feature-branch and isolated-environment verification and do not indicate production deployment.

After settling the retrieval structure, the screen remained. A highlight feature meant to show where the answer came from, and the next part is about that highlight painting far more nodes than there was actual evidence for.

---

**Previous →** [Cleaning up the graph deleted 1,500 healthy classes (Part 5)](/en/blog/ontology-journey-5-csv-cleanup-guards)

**Next →** [Most of the nodes we painted red were not evidence (Part 7)](/en/blog/ontology-journey-7-evidence-ux)
