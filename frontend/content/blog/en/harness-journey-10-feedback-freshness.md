---
title: "Keeping lessons fresh when you feed them into the next run (Part 10)"
titleSeo: "Keeping lessons fresh (Part 10)"
description: "Making validation feedback, answer candidates, judgement scores, and tool discovery carry into the next action without mixing state from different rounds."
date: "2026-07-10"
cover: /blog/harness-journey-10-feedback-freshness.svg
thumb: /blog/harness-journey-10-feedback-freshness-thumb.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "State freshness", "Feedback loop"]
draft: false
---
> **Agent harness design · 10/10**

Storing memory and wiring quality retries does not make an agent learn. What is stored has to be selected in the next run, that content has to contain the real cause of the failure, and during a retry only the new candidate and the new score may move the next decision. Miss any one of those and the log shows "lesson carried forward" and "retry" while the result circles the same spot.

In early July we refined judgement scores into gradual values between 0 and 1 and connected a path for reading failure lessons back in the next run. On the same criteria, how well an answer satisfied them could now be seen as a distribution rather than cut to 0 or 1, and a failure in one run began entering the next run's context.

Running real scenarios back to back revealed the next problem. Lessons were being stored, but they carried the failed answer itself rather than the reason for failure, and among long-accumulated items there was no rule for which lesson to read. During a retry, the previous answer and score survived while the model was still looking for a tool, so the same candidate got judged again. What the feedback loop needed was not whether things were stored but **whether the subject and the moment of the state hold all the way through**.

## We kept the judgement reason as the lesson, not the failed answer

Early lesson generation summarized the user's question and the failed answer. What was attempted survives; why it was rejected can be lost. If the criterion broken was "three recent news items with sources are required" and only the failed answer is summarized, the next run is likely to produce an answer in the same shape.

The judge was already producing per-criterion shortfall reasons as `validation_feedback`. We changed retry lessons to prefer that value, leaving the failed answer as an auxiliary input only when feedback is absent.

```text
Before: user question + failed answer → lesson
After:  user question + judgement feedback → lesson
```

What mattered was not the volume of stored information but a correction signal capable of changing the next action. "What did it answer?" is already in the execution record; what the next run needs is "which criterion did it fail?"

We fixed the recall order alongside. Relying on whatever order the store returns makes it less and less likely that a recent lesson is selected as items pile up. We sorted by creation time and identifier, newest first, and put only a fixed number into the context. Longer term this should also consider question similarity, but at least it no longer reads an arbitrary lesson from an undefined ordering.

We confirmed this path with consecutive runs on an isolated local stack. The first run stored a shortfall reason as a lesson; the next run excluded other refined memory so only that lesson's effect remained. The next run's first answer passed the same judgement criterion, which let us confirm the change reached actual generation, not just a successful write.

## We limited the lifetime of answer candidates and judgement scores to one round

Even after fixing the lesson path, quality retries sometimes exhausted the cap and ended. Following the execution record showed the model was progressing after the retry by calling tools. The problem was not a stalled loop but a judge mistaking a non-terminal round for a terminal one.

When a model response contained only tool calls and no text, the previous implementation did not update `last_assistant_text`. With the previous failed answer still in state, the judge re-scored a past candidate in a round that had no new answer. `validation_score` also survived into the next round, so the decision stage could read the old score ahead of the new work state.

We changed both lifetimes explicitly.

1. At the end of a model call, always update `last_assistant_text` from this response. If there is no text, it is empty.
2. Immediately after consuming a quality retry, clear the previous `validation_score`. Until a new candidate is produced and judged, there is no valid score.

With that rule, one score belongs to one candidate in one round. A round in the middle of tool calls has no text to evaluate, so it adds the tool result and continues, and judgement happens again only when a new answer exists. The retry cap becomes the number of chances actually used to produce a new candidate, not the number of times the same answer was re-scored.

Verification checked that after a first candidate falls short, a genuinely different new candidate is produced by way of a tool call. When the candidate changes, the answer length and the judgement input change too, and if the last candidate passes it should terminate after one retry. Confirming only the final success would hide how many times a past candidate was re-judged along the way, so we checked the candidate-to-round linkage as well.

## We let tools be found again after a retry

Judgement feedback saying "find more evidence" changes nothing if tool search is closed during the retry round. `discovery_first` was the setting that prioritizes tool search on the first round, but it conflicted with a heuristic that registers the search tool only above a certain catalogue size. Turning the setting on explicitly could still leave a small workflow with no search tool.

We made an explicit setting take precedence over the heuristic. With `discovery_first` on, the search tool is registered regardless of catalogue size, and the setting was wired so it can be toggled from the product node too. To stop an empty value being read as an unintended `false`, the disabled setting is passed only when it was explicitly turned off.

We also removed the generic "do not investigate again" line from the Reflexion feedback. A sentence meant to reduce unnecessary tool repetition was preventing re-search even for answers rejected for lacking evidence. Whether to use a tool is decided again within the current judgement feedback and the execution limits.

The goal is not to force search. It is that when the judge points out missing evidence, searching remains a possible action. An answer that needs no tools can be generated directly; where search is needed, `ToolSearch` promotes the definition and the tool is called. Feedback, context, and the action path all have to be open for the loop to produce actual correction.

## A structured run summary let us check the whole path at once

Previously each feature had to be checked separately in the logs. How many memories were read, whether prior lessons entered the state, whether a tool search happened, what score was judged and how many retries occurred — all scattered across long strings. Each feature could work while it stayed hard to see whether their order within one run was right.

On 13 July we preserved the structured fields of execution events along the streaming path, and built a UI summarizing the flow in one line above the view.

```text
Memory → State → ToolSearch → Judge → Loop
```

Where a new event exists the structured value is preferred, with a compatibility path so existing string logs still read. In local runs we confirmed that scoped memory recall, prior lesson injection, tool search, quality pass, and retry count follow in order within a single run summary. This summary is not a tidy listing of state; it is an observation view for finding which stage in the feedback path broke.

There is a difference in how far things landed. Preferring judgement feedback, selecting the latest lesson, clearing the candidate and score, and reinforcing the search setting were applied and tested in the engine and product execution paths on the SDK and a feature branch at the time. The structured run summary UI, by contrast, has completed behaviour and view verification on a local stack and is not yet in the product deployment scope.

A lesson being visible in the next run does not complete learning. The latest failure reason has to be selected, a new round has to treat only the new candidate and the new score as valid, and the tool path for acting on the feedback has to stay open. In the end, that whole flow has to be observable within one run. For harness state, what mattered was not storing a lot but **holding on, all the way through, to whose state it is and from what moment**.


---
**Previous →** [Designing tool exposure and output delivery as execution context (Part 9)](/en/blog/harness-journey-9-context-design)
**Start of the series →** [Why we split the validation loop into execution states (Part 1)](/en/blog/harness-journey-1-rust-to-python)
