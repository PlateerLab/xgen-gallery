---
title: "Cleaning up the graph deleted 1,500 healthy classes (Part 5)"
titleSeo: "Detection is not deletion"
cover: "/blog/ontology-journey-5-csv-cleanup-guards.svg"
thumb: "/blog/ontology-journey-5-csv-cleanup-guards-thumb.svg"
description: "Auto-deleting classes short on instances and relations removed about 1,500 healthy ones. Post-processing judged what extraction had not yet built."
date: "2026-05-30"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "Structured data", "Data integrity"]
draft: false
---

**The structured graph had grown too large, so we set out to shrink it. Classes with no instances and no relations looked useless, so we let them be deleted automatically. About 1,500 of the things that disappeared were healthy classes. Post-processing had judged concepts whose relations extraction had not yet built as unnecessary concepts. This is about separating what to shrink from who may delete.**

---

## A faithful conversion buried the graph under fact records

We converted commerce CSV straight into RDF. Tables to classes, columns to properties, foreign keys to relations.

The result was faithful to the original. And order and sales history rows took up most of the graph.

Exploring reference entities like products and categories meant reading a mountain of fact records alongside. The conversion was accurate and unusable.

By the criterion from Part 4 this was a modelling problem, not a retrieval-tuning one. **We had moved everything without deciding what belongs in the graph as an entity.**

## We looked at reference direction instead of table names

Shrinking needed a criterion. Table names were the first idea, but names differ by domain.

We looked at reference structure.

```text
reference data  what other tables point at             products · colours · categories
                → keep each row as an entity. relations must be traversable

fact records    connect references, mostly emit refs   orders · sales history · logs
                → keep classes, columns, foreign keys; rows stay in the source store
```

We did not judge on foreign key direction alone. A guard keeps small tables conservatively, and when only a single file arrives and the full reference direction is unknown, rows are kept.

That row-count criterion is not a domain invariant but **an operational heuristic to reduce the cost of misjudgment**. Written down as a principle you can no longer explain why that number, so we made its character explicit.

Applying the rule to the same data took entities from 13,798 to 286.

The important verification was not the reduction rate. We confirmed that reference entities survived, that foreign key relations connect in the right direction, and that fact table schemas were preserved. **The criterion is not how much was removed but whether what should remain remained.**

## We read the shape "has no relations" as meaning "unnecessary"

While shrinking the structured side we did the opposite on the document side. To clean up the graph we let classes short on instances and relations be deleted automatically.

The condition looked reasonable. No instances, not used as a property domain or range, no hierarchy. Such a class seemed to have no reason to be in the graph.

About 1,500 healthy classes disappeared.

When relation extraction is still incomplete, **healthy concepts have exactly the same shape.** Not yet connected and never going to be connected cannot be told apart from the graph's shape alone.

So what we had built was not orphan class detection. It was **a feature for deleting from the graph the work an earlier stage had not yet done.** Post-processing was converting extraction's misses into data cleanup.

We turned off automatic deletion and kept detection. On the same large graph 1,568 candidates were detected, and 1,547 more classes survived than in the previous result.

```text
auto-delete on    remove candidates immediately   ~1,500 healthy classes lost with them
auto-delete off   report 1,568 candidates only    1,547 classes preserved
```

The default behaviour changed from deletion to reporting candidate counts.

When building a feature at the back of a pipeline that tidies up the front's output, it is worth checking whether you are assuming the front is finished. While the front is incomplete, that feature is not cleanup but concealment.

## Not deleting is as far as the safety line goes

Stated without overreach, here is what we secured.

Current statistics keep only the detected candidate count; **candidate identifiers and the reasoning behind them are not persisted.** That means there is still no way to compare whether those candidates disappeared in the next build.

The explicit deletion path has a boundary too. It removes outgoing triples where the target identifier is the subject, but **does not atomically clean up incoming relations pointing at that identifier.**

With partial references left behind, the node vanishes from the screen while a dangling relation survives in the schema. That is why a lower node count does not mean cleanup finished.

Safe deletion needs a referential integrity contract that bundles triples with the target as subject and as object, property domains and ranges, and schema store records into one deletion plan. Until that exists it is safer not to turn on automatic deletion in production.

**What the implementation secured is turning automatic deletion off.** The rest remains follow-up work.

## As cleanup got heavier, the progress API stalled with it

As duplicate cleanup and quality checks grew, the execution problem left over from Part 3 grew too.

Running document chunk scans, whole-schema lookups, and CSV conversion synchronously inside a background coroutine lets one job occupy the event loop. Even with job state moved to a separate store in Part 3, **if the progress API does not respond, the user cannot confirm cancellation or completion.**

Part 3's warning that splitting the job model and splitting execution resources are different problems became real here.

We moved the vector store scan, database lookups, CSV conversion, and schema storage, all of which grow with input size, onto worker threads. Short state updates that run a handful of times per build stayed on the event loop.

We did not move every function mechanically, only **the stretches whose occupancy scales with data volume**.

Under a local condition scanning 26,934 chunks, we queried progress 50 times over 25.6 seconds and got 12ms average, 57ms maximum. That is a result on that machine, not a general performance guarantee. What we were confirming was not speed itself but that the control API does not stall while a heavy build stage is running.

## We shrank by role rather than by shape

Both pieces of work here look like shrinking a graph. The judgment criteria were opposite.

Whether to keep structured rows is decided by **the table's role**. Whether to delete an orphan class is decided by **detection confidence and deletion authority**.

Treat them by the same criterion and you have an accident. We did exactly that with the second, deleting healthy concepts on the grounds that they had little data and no connections.

**Shrink by shape and you delete what is unfinished along with what is unneeded.** You have to look at the data's role and at how complete the information used to judge it actually is.

We fixed the generation rules for the structured graph, and something remains. The semantic duplicate cleanup at the end of a build cannot tell structured classes from document concepts. That problem was only confirmed after repeated builds merged classes from different tables, and Part 8 covers it.

The graph structure was now ready for retrieval. The next part measures the multi-turn search from Part 2 against a real question set. What that measurement found first was not retrieval performance but that one side of the comparison had an empty graph.

---

**Previous →** [Triple counts told us nothing about graph quality (Part 4)](/en/blog/ontology-journey-4-quality-baseline)

**Next →** [The A/B calling it slow and wrong was measuring an empty graph (Part 6)](/en/blog/ontology-journey-6-search-redesign)
