---
title: "Scoping and prioritizing memory between runs (Part 8)"
titleSeo: "Memory scope between runs (Part 8)"
description: "Separating one run's working notes from the lessons worth keeping, and handling conflicts across session, workflow, user, and platform scopes."
date: "2026-06-22"
cover: /blog/harness-journey-8-memory-loop.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Memory", "State management"]
draft: false
---
> **Agent harness design · 8/10**

Even with the model and execution settings controlled, the next run still started from nothing. User preferences confirmed in one session, cautions about using a tool, corrections that came up repeatedly in judgement — none of it carried into another conversation or workflow. Re-inserting the whole conversation every time raises cost, and stale judgements collide with the current request inside one context.

That problem is why we first looked into agent memory on 12 June. At the time we surveyed working notes, long-term memory, compaction, and recall, but did not attach storage and lookup to the product execution path.

Implementation began at the end of June. A storage structure that lets execution state be read back came first, and on 29 June we connected the engine's store and recall points to the product store. Over the next two days we split memory into four scopes — `session`, `workflow`, `user`, `platform` — and attached lookup, expiry, and deletion paths.

Through all of this we did not define memory as "a feature that keeps a lot of past conversation." It was about keeping only the small state worth changing the next judgement, while deciding alongside it **how long, for whom, and at what priority it applies**.

## We separated one run's working notes from the next run's memory

Marking an important paragraph while reading a long document, or picking which of several tool results to revisit, also looks like memory. But there is no guarantee that search result is still valid for a different request next week. Observations needed to finish the current task and lessons worth keeping beyond the run have different lifetimes.

`RecallSet` is a working note used only within one run. It gathers items the model has tagged with meanings like `keep`, `check`, or `discard`, reduces duplicates by content fingerprint, and prioritizes within a count cap. Rather than unfolding every body of text from the start, it shows a list and identifiers and lets only the needed items be reread. When the run ends, the set goes with it.

Between-run memory uses a separate `MemoryStore`. When quality judgement rejects an answer, what is kept as a lesson candidate is the concrete validation feedback, not a generic error string. After a run completes normally, an auxiliary model reads the user input and final output and extracts candidates for the next run. The full conversation log is not stored as is — but neither is it a structure where each candidate passes its own quality judgement before being stored.

```text
Observations in the current run → RecallSet → discarded when the run ends
Judgement feedback / completion result → memory candidate extraction → MemoryStore → selective recall in the next run
```

That boundary separates transient search results from between-run memory. But candidate extraction and approval to store must not be treated as the same thing. For high-blast-radius items such as a `platform` constraint, where a wrong entry does real damage, it is safer to require separate approval or a deterministic check path rather than promoting on automatic extraction alone.

## Storage and recall sit on opposite sides of the run boundary

Even having decided what to store, if it is unclear when the model reads it, the effect varies run to run. Injecting new memory mid-answer lets unverified content circulate as fact within the same run.

Writing happens after the judgement result is settled. On a retry, lesson candidates are extracted from the validation feedback; on completion, items from the user input and final result that look valid for future runs are collected. Reading happens when a new run's input is being prepared: memory within the permitted scope is selected and inserted before the first model call.

Putting the run boundary between storage and recall also made test conditions clear. No long-term memory may exist before judgement, and the selected memory must already be present in the next run's first call. We did not check only whether the storage API succeeded — we checked whether it reached the actual next judgement.

We also separated the roles of execution-state storage and long-term memory. The former preserves the state and lesson flow needed to re-explain a run. `MemoryStore` looks up and manages items to keep long-term, fitted to the product's user and workflow scopes. The two are not treated as the same table; the product bridge connects execution state to the product lifecycle.

## The same memory applied at different scopes

The generic engine does not know the product's user and workflow model. The product bridge connects memory to four scopes.

- `session`: a temporary choice agreed in this conversation
- `workflow`: output conventions and lessons a particular flow has to keep repeating
- `user`: personal preferences such as language and phrasing
- `platform`: policies and organization-level constraints the whole service must keep

Scope is not a tag for search filters. It decides who can read an item, when it expires, and how far cleanup has to reach when the original object is deleted. Session memory must not cross into another session, and once a workflow is deleted, memory at that scope must no longer be retrievable. The broader the scope the greater the blast radius and authority, so platform memory is not created lightly from automatic extraction.

When the same `memory_key` exists at several scopes, we did not simply pick the most recent. The kind of content and its scope had to be read together.

## Constraints and preferences took priority in opposite directions

When platform policy and a session request conflict, unconditionally preferring the more specific session would let a user override policy. Conversely, always following platform scope first strips meaning from per-workflow formats and user preferences.

So memory stores a kind — `constraint`, `preference`, `lesson`, `fact`, `decision` — alongside its scope. For constraints, the broader scope wins: a platform constraint is not released by a user or session choice. For preferences and lessons, the narrower scope closest to the current work wins, because session and workflow requirements are more specific than a general user preference.

If a user generally prefers detailed answers but the workflow requires a three-line summary, this task applies the workflow preference. A platform constraint against printing personal data comes ahead of both. Rather than putting every conflicting sentence into the prompt and leaving the model to resolve it, the recall stage decides what applies first.

## We capped what gets read this time, not how much is stored

Even with scope and priority set, long-term memory that keeps growing grows the context again. Inserting everything that looks relevant is not much different from appending the whole conversation.

The recall path caps per-item length and item count first, then applies a total budget at the end. After resolving `memory_key` conflicts, it selects items close to the current scope with high priority. When passing them to the model it marks the source and applicable scope, so a user preference can be told from a platform constraint. Memory that is not selected is not deleted; it is simply out of this context.

If content exceeds the budget, the omitted amount is recorded. The current implementation can cut a string at the total character cap, which may break the meaning of the last item. Filling whole items in priority order and excluding an item entirely when it does not fit is the next improvement point.

Write and read permissions are checked separately. Candidates matching common secret keywords and prompt-injection patterns are rejected, but there is no guarantee of automatically catching values arriving without labels, or newly added sensitive fields. Per-product policy and regression tests have to sit alongside.

## We designed the creation path and the deletion path together

Memory has to move with the lifecycle of what it belongs to. We implemented hooks that clean up workflow-scope memory and execution state when a workflow is deleted, and session scope when a session ends. Expired items are excluded from recall results even while they remain in the store. That deletion wiring was within a feature branch and local verification at the time, and should not be read as fully reflected in production.

The deletion wiring is best-effort and does not block the underlying workflow deletion or session end. That has the advantage of not failing a user's actual work because of a transient fault in the memory store. In exchange, a cleanup failure leaves only a warning and items can persist, so operations need a re-cleanup path and visibility into what remains.

What we verified at this point, in the engine and the feature path, was per-scope storage and recall, conflict resolution, expiry exclusion, and deletion hooks. Decay that automatically lowers confidence in older memory, and periodic merging of similar memories, are not yet part of the always-on execution path. That a related function exists, that it is wired to the product lifecycle, and that it is deployed to production are three different facts.

The quality of memory is not decided by how much you store. It comes from separating the current run's observations from the next run's lessons, resolving conflicts by scope and kind, and controlling how much gets read and how it gets deleted. The next part turns from memory that persists over time back to the current run, and looks at how much of the connected tools and output destinations to show the model.


---
**Previous →** [Controlling execution conditions before comparing models (Part 7)](/en/blog/harness-journey-7-qwen-vs-sonnet)
**Next →** [Designing tool exposure and output delivery as execution context (Part 9)](/en/blog/harness-journey-9-context-design)
