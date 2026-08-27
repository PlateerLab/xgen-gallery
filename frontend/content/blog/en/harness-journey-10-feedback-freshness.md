---
title: "We burned every retry re-grading the same answer (Part 10)"
titleSeo: "One score, one candidate, one turn"
cover: "/blog/harness-journey-10-feedback-freshness.svg"
thumb: "/blog/harness-journey-10-feedback-freshness-thumb.svg"
description: "Quality retries were exhausting the ceiling. The model was progressing through tool calls while the judge re-graded the previous failed answer."
date: "2026-07-10"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "State freshness", "Feedback loop"]
draft: false
---

**With memory stored and quality retries wired, it was the agent's turn to learn from failure. Running it for real, the logs showed "lesson carried" and "retry" while results circled in place. The lessons held the failed answer instead of the reason for failure, and the judge was re-grading an answer it had already rejected. The problem was not storage but the subject and timing of state.**

---

## Lessons carried the failed answer and left out the reason

In early July we refined judgment scores into gradual values between 0 and 1 and wired a path for reading failure lessons back in the next run. The same criterion could now be seen as a distribution rather than a binary, and one run's failure started entering the next run's context.

Running real scenarios back to back, the lessons had no effect.

Lesson generation was summarising the user question and the failed answer. What was attempted survives; why it was rejected does not.

Say a criterion required three recent news items with sources. Summarise only the failed answer and pass it along, and the next run produces the same shape of answer again. The lesson was not an error log but **a copy of the error**.

The judge was already producing per-criterion shortfall reasons. We simply were not using them.

```text
before: user question + failed answer       → lesson
after:  user question + judgment feedback   → lesson
```

The failed answer stayed only as a fallback input when feedback is absent.

**"What did it answer" is already in the execution record. What the next run needs is "which criterion did it miss".**

Recall order got fixed too. Rely on whatever order the store returns and the more items accumulate, the lower the chance a recent lesson is chosen. We sort newest-first by creation time and identifier and put a fixed count into context. Factoring in question similarity is future work; at minimum we stopped reading arbitrary lessons from an undefined ordering.

We confirmed this path with consecutive runs on a locally isolated stack. The first run stored the shortfall reason as a lesson; the next run excluded other refined memories so only that lesson's effect remained. The next run's first answer passed the same criterion. That checked the actual generated result, not a storage success.

## The loop looked stuck and the judge was grading the past

Even after fixing the lesson path, quality retries kept exhausting the ceiling.

At first we assumed the loop had stalled somewhere. Following the execution record, the model was not stalled. After a retry it was calling tools and progressing.

The problem was the judge **mistaking a non-terminal turn for a terminal one**.

If a model response has tool calls and no text, the earlier implementation did not update the last assistant text. The previous failed answer was still in state, so the judge re-graded a past candidate on a turn with no new answer.

The score survived into the next turn as well. The decision stage could read the old score before the new work state.

```text
turn N     produce candidate → rejected (score 0.5)
turn N+1   only tool calls → no text
           but turn N's answer is still in state
           → re-grade the same answer → 0.5 again → retries exhausted
```

**No score was pinned to a particular candidate.** In Part 4 we made judgment results the input to the next transition and never defined the validity period of that input.

We changed both lifetimes explicitly. When a model call ends, the last assistant text is always refreshed to this response; if there is no text, it is empty. And immediately after consuming a quality retry, the previous score is cleared. Before a new candidate exists and is judged, there is no valid score.

With that rule a score belongs to exactly one candidate and one turn. On a turn calling tools there is no text to evaluate, so results are added and the run continues; judgment happens again only when a new answer exists.

The retry ceiling changed meaning too. Not how many times the same answer was re-graded but **how many chances to build a new candidate were used**.

Verification checked that after a first candidate misses, tool calls lead to genuinely different new candidates. When the candidate changes, answer length and judgment input change with it, and if the last candidate passes it should end after one retry. Confirming only final success hides how many times a past candidate was re-judged, so we checked the candidate-to-turn binding as well.

Designs that hold state for a long time are generally convenient. The price of that convenience arrives in this shape: the value survives and only the information about when it was true disappears.

## A sentence meant to save tool calls was blocking the correction

Even if judgment feedback says "find more grounding", nothing changes if search is closed on the retry turn.

Two things were blocking it.

First, a setting that prioritises tool discovery on the first turn conflicted with a heuristic that only registers the search tool for catalogues above a certain size. Turn the setting on explicitly and small workflows still had no search tool. We made the explicit setting take precedence over the heuristic and wired it so product nodes can toggle it, passing a disable only when explicitly turned off so an empty value is not read as false.

The second stung more. The correction feedback contained a generic line saying not to investigate again.

That sentence was added to reduce unnecessary tool repetition. It was **preventing answers rejected for insufficient grounding from searching again.**

A sentence added to economise was blocking the very purpose of this loop. We removed it and let tool use be decided again within the current judgment feedback and execution limits.

Forcing search is not the goal. It means that when the judge flags insufficient grounding, **the action of searching must remain available**.

Building a feedback loop, it is easy to verify only that the signal is delivered. Whether the action the signal calls for is possible at that moment has to be checked separately. Feedback, context, and the action path must all be open for the loop to become an actual correction.

## Every feature worked and we could not see whether the order held in one run

What held us longest through these fixes was not the individual bugs but how we had to find them.

How many memories were read, whether the previous lesson entered state, whether tool search happened, what score judged it and how many retries ran, all scattered through long string logs.

Each feature worked and **whether the order held within a single run** was invisible. That is why the two problems above went undiscovered so long. Storage succeeded, retries happened, and the logs looked normal.

In mid-July we preserved structured fields on execution events through the streaming path and built a UI that summarises the flow in one line above the screen.

```text
Memory → State → ToolSearch → Judge → Loop
```

Where new events exist the structured values take precedence, with a compatibility path for the existing string logs. In local runs we confirmed that scoped memory recall, prior lesson injection, tool search, quality pass, and retry count appear in order in a single run summary.

This summary is not a screen for laying out state neatly. It is **an observation surface for finding which step in the feedback path is broken**.

Scope of rollout differs. Judgment-feedback priority, latest-lesson selection, candidate and score reset, and search setting reinforcement were applied and tested on the engine and product execution paths in the SDK and feature branch at the time. The structured run summary UI completed behaviour and screen verification on a local stack and is not yet included in product deployment scope.

## Across ten parts we met the same problem at different layers

Closing the series, the ten parts look like different subjects and kept returning to the same place.

```text
1   "retry 3" called three different runs by the same name
2   we called splitting a repository splitting a dependency
3   we called something installed the same run
4   the model that wrote the answer was also grading it
5   we read conversation history as current state
6   we called a regression guard a held-out validation set
7   we called a run combining model and settings a model comparison
8   we let the nearest memory beat a platform constraint
9   we treated visible in a list as callable
10  we read a previous turn's score as this candidate's score
```

Every time we were calling something by a stronger name than it deserved. Because of that name we did not verify what needed verifying, and the problem sat quietly until the name turned out to be wrong.

**The capability repeatedly required in building an agent execution environment was not adding features but pulling apart things that were being called by the same name.** Once pulled apart, the following decisions mostly came on their own: what to pass along, who owns it, what to record, what to test.

The same held for harness state. Storing a lot was easier than **keeping whose state, at which moment, intact all the way through**, and the second was what actually had value.

---

**Previous →** [The tools were listed but couldn't be called (Part 9)](/en/blog/harness-journey-9-context-design)

**Start of series →** [Retry counts told us nothing about the run (Part 1)](/en/blog/harness-journey-1-rust-to-python)
