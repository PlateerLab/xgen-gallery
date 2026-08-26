---
title: "Letting the nearest memory always win was wrong (Part 8)"
titleSeo: "Constraints and preferences differ"
cover: "/blog/harness-journey-8-memory-loop.svg"
thumb: "/blog/harness-journey-8-memory-loop-thumb.svg"
description: "A session request is more specific than a platform policy, so it seemed it should win. Left that way, a user could override policy."
date: "2026-06-22"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Memory", "State management"]
draft: false
---

**Attaching memory to the agent, the first rule we settled on was "the more specific wins". What was just agreed in this conversation is more specific than a general user preference, so follow that. We found out later that under this rule a user can also override platform policy. The work was not deciding how much to store but deciding what beats what.**

---

## We started memory as a feature for keeping past conversations

Even with the model and execution settings controlled, the next run still started from nothing. A user preference confirmed in one session, a caution about a tool, a correction the judge kept repeating, none of it carried to another conversation or workflow.

The simplest fix is to put the whole conversation back into the next run.

Two things caught. Cost growing was expected; what we did not expect was **old judgments colliding with the current request** in one context. A sentence from last week saying "keep it short this time" was still alive in this request.

So we changed the definition. Memory is not a feature for keeping lots of past conversation. It is keeping a small state worth changing the next decision, while also deciding **how long, for whom, and at what priority it applies**.

In late June we built the storage structure first and connected the engine's write and recall points to the product store. Then we split memory into four scopes and attached lookup, expiry, and deletion paths.

## Notes needed now and knowledge still valid later had different lifetimes

Marking an important paragraph while reading a long document, or picking which of several tool results to revisit, also looks like memory.

But there is no guarantee that a search result is still valid for a different request next week. Observations needed to finish the current task and lessons worth carrying past the run have different lifetimes.

Working notes used only within one run got their own place. The model tags items as keep, check, or discard; content fingerprints reduce duplicates; priority is decided within a count ceiling. Rather than unfolding all bodies up front, it shows a list and identifiers and re-reads only what is needed. **When the run ends, that set disappears.**

Between-run memory uses a separate store. If quality judgment rejected an answer, the concrete validation feedback rather than a generic error string becomes a lesson candidate. After a normal completion, a helper model reads the input and final output and extracts candidates for the next run.

```text
observations of the current run   → working notes → discarded at run end
judgment feedback · completion    → candidate extraction → long-term store → selective recall next run
```

One thing needs care here. **Extracting a candidate and approving a write are not the same act.** Items with wide blast radius are safer promoted through separate approval or a deterministic check rather than automatic extraction alone.

## Injecting new memory mid-answer lets unvalidated content circulate

Deciding what to store is not enough if when it is read stays vague; the effect then varies run to run.

Early on we considered injecting new memory immediately during a run. That lets **unvalidated content circulate as fact** inside the same run: a summary the model just produced becomes evidence for that run.

So writes and recalls sit on opposite sides of the run boundary.

Writing happens after the judgment result is settled. On retry we extract lesson candidates from the validation feedback; on completion we tidy items from the input and final result that still look valid next time. Reading happens while preparing the next run's input.

The boundary made test conditions clear too. No long-term memory may exist before judgment, and the next run's first call must already contain the selected memories. We checked **not whether the store API succeeded but whether it reached the next decision.**

After attaching a feature it is easy to see "stored" in the log and call it done. Storage is an intermediate event; the thing to confirm is whether that storage changed the next action.

## Scope was not a search filter but a lifecycle

The general-purpose engine does not know the product's user and workflow model. So the integration layer connected memory to four scopes.

```text
session    a temporary choice agreed in this conversation
workflow   output conventions and lessons a specific flow must repeat
user       personal preferences like language and phrasing
platform   policies and org-level limits the whole service must honour
```

At first we treated these as tags for search filtering. Filter by scope on lookup and you are done.

But scope was deciding who may read, when it expires, and how far cleanup must reach when the original object is deleted. Session memory must not cross into another session; delete a workflow and memory in that scope must stop being retrievable.

**Scope was not a tag but that memory's lifecycle.** Wider scope means more blast radius and more permission, so platform memory is not created lightly from automatic extraction alone.

Deferring the permission model usually comes back at exactly this spot. The moment you decide where data lives you are already deciding who can read it.

## Letting the nearest memory win meant users could override policy

When the same key exists in several scopes, something has to pick.

The first rule was simple: the scope nearest the current work wins. Session is more specific than workflow, workflow more specific than user preference.

Apply that literally and when platform policy conflicts with a session request, session wins. **A user could lift an organisational policy with something said mid-conversation.**

Conversely, always following the wider scope strips workflow-specific formats and personal preferences of meaning entirely.

Neither direction resolved it, because priority is not determined by scope alone. So we stored a **kind** alongside scope.

```text
constraint    wider scope wins   platform constraints are not lifted by a session choice
preference    narrower wins      the requirement nearest this work is more specific
lesson        narrower wins
fact/decision consider source and time together
```

If a user generally prefers detailed answers but the workflow demands a three-line summary, this task follows the workflow. A platform constraint against emitting personal data still precedes both.

We do not put every conflicting sentence into the prompt and leave the model to resolve it. **The recall stage decides what applies first.**

The same distinction from Part 4, keeping quality judgment and the policy gate on different thresholds, reappeared here. What must hold and what would be nice to accommodate do not sort by the same rule.

## We capped what gets read this time, not what gets stored

Even with scope and priority settled, long-term memory that keeps growing inflates context again. Including everything that looks relevant is not far from appending the whole conversation.

The recall path caps per-item length and item count first, then applies a total budget last. After resolving same-key conflicts it picks items near the current scope with high priority. When handing them to the model it labels source and scope so user preference and platform constraint stay distinguishable.

Memories not selected are not deleted; they simply sit out this context.

One thing here still needs fixing. The current implementation can cut a string at the total character ceiling, which can break the meaning of the last item. Filling whole items by priority and excluding what does not fit outright is the next improvement.

Write permission and read permission are checked separately. Candidates matching common secret keywords and prompt-injection patterns are rejected, but values arriving without labels, or newly added sensitive fields, are not caught automatically. Product-specific policy and regression tests have to sit alongside.

## Attaching deletion hooks did not guarantee cleanup

Memory has to move with the lifecycle of its original. We attached hooks so that deleting a workflow cleans that scope's memory and execution state, and ending a session cleans session scope. Expired items may remain in the store but are excluded from recall results.

The deletion link is best-effort and does not block the workflow deletion or session end itself. That has the advantage that a brief store outage does not fail the user's actual work.

There is a price. **A cleanup failure remains only as a warning and items can survive.** In production you have to watch the re-cleanup path and the residue scope alongside.

That deletion link was also within a feature branch and local verification scope at the time, and should not be read as reflected across production. Automatic decay for old memories and periodic merging of similar ones are not yet on the always-on execution path.

**A function existing, being wired to the product lifecycle, and being deployed to production are three different facts.** Memory features blur those three especially easily, because a state where writes work and deletes do not goes unnoticed for a long time.

## Memory quality was not what we kept but what beats what

The time in this part did not go into deciding what to store.

It went into separating current-run observations from next-run lessons, accepting that scope is a lifecycle, discovering that constraints and preferences resolve in opposite directions, and controlling how much gets read and how it gets deleted.

**Attaching memory was not choosing a store but writing a conflict-resolution rule.** Storage takes a day; what beats what, if left undecided, is decided differently on every run.

The next part turns from the time axis back to the current run. It is about how far to expose connected tools and output destinations to the model, and there too, "visible" and "callable" turned out not to be the same word.

---

**Previous →** [The 30x gap wasn't the model (Part 7)](/en/blog/harness-journey-7-qwen-vs-sonnet)

**Next →** [The tools were listed but couldn't be called (Part 9)](/en/blog/harness-journey-9-context-design)
