---
title: "The submit tool fired and the run kept going (Part 5)"
titleSeo: "Where a run actually ends"
cover: "/blog/harness-journey-5-retry-termination.svg"
thumb: "/blog/harness-journey-5-retry-termination-thumb.svg"
description: "A terminal tool succeeded and execution continued; a record from a previous turn could end the current one early. Where a run actually ends."
date: "2026-05-26"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Retry", "Execution control"]
draft: false
---

**While verifying the canvas harness we watched a run call its final submit tool and carry on. The opposite risk sat right next to it: if a previous turn had submitted, that record could end the turn currently in progress. This is about where we had been reading "it finished" from, and why a single retry ceiling could not stop anything.**

---

## We were reading "it finished" out of the conversation history

The early engine already had retries and termination. Provider errors resent the same request; quality misses attached feedback and produced a new answer. Policy checks sat before and after model calls, just before tool execution, and at turn boundaries.

Looked at individually, every mechanism worked.

Verifying the canvas harness over three days starting 8 June, we saw where they overlap. A tool whose very invocation means submission, like sending a message, fired and execution continued.

The cause was how termination was judged. We were searching the entire conversation history for the name of a terminal tool.

That method is wrong in both directions.

```text
the tool ran but the decision stage did not see the current call
  → a model call gets appended to a run that should have ended

a terminal record from a past turn is still in the history
  → the turn currently in progress is judged complete
```

**Conversation history tells you what happened; it does not tell you what state you are in now.** We were reading history as state.

So we narrowed the scope of the termination judgment to the current turn. Is the latest model response a tool request made in this turn, is that tool registered as terminal, did execution succeed. Only when all three hold do we move to complete.

```text
no tool request in the current response   → treat as a normal answer and judge it
an intermediate tool in this response     → add the result and continue
a terminal tool in this response          → confirm success and finish
```

History remains as evidence; it does not stand in for current state.

Treating logs and state as the same thing shrinks the code at first. The problem is that logs accumulate across turns. Search for a condition in an accumulated record and you lose the information about when it happened.

## Lowering the retry ceiling cut off healthy tool exploration

While cleaning up termination we looked at iteration too. At the time there was effectively one ceiling.

Costs grew, so we lowered it. Runs that had been producing good answers started getting cut off mid-flight.

What got cut was not quality rewriting but tool exploration. A run gathering material with three searches hit the ceiling and stopped.

**One ceiling was counting three different things.**

```text
provider call attempts   no response, resend the same request      → state does not advance
tool progress turns      new observation, the work moves forward   → state advances
quality rewrites         rejection reason in, new candidate out    → produces a different answer
```

The three consume different things, need blocking for different reasons, and belong at different places. Bundle them and a cost adjustment breaks a capability while a capability adjustment loosens cost.

So each ceiling moved to the layer where its iteration begins. Provider call attempts are limited by the model-call layer, quality rewrites by the judgment path, and total progress including tools by the execution loop and budget.

Setting names can stay similar. What matters is **which layer reads that value and which event it counts**.

## Resending after a provider error was not progress

When rate limiting or a transient overload means no model response arrives, there is no answer candidate and no tool request. Resending is not new work; it is recovering the same logical call.

So recoverable errors are handled inside the provider layer. The request and conversation state stay as they were, a wait matched to the error type is applied, and the call is repeated.

The only value that increments here is the provider call attempt. The agent's total turn count and quality rewrite count do not move.

When the allotted attempts are exhausted, the call failure is raised to the outer loop. **We do not fabricate an empty response and pass it on as a normal result.** This is the same rule as Part 4's refusal to disguise a skipped judgment as a score.

Retry events record the error type, attempt number, and wait duration. That is what lets us separate, in total latency, the time the model spent thinking from the time spent waiting on transport recovery.

Without that distinction, a report that the agent feels slow leaves you nowhere to look. Whether to change the model, cut tools, or check the network is all inside the same number.

## Putting quality judgment on tool-request responses rejected healthy exploration

Once quality judgment existed, the natural instinct was to judge every model response.

A response that requests a tool has no finished text. The judge looked at it and concluded the answer was insufficient.

Runs that were healthily gathering material **began being recorded as rewrite failures.**

So what we had built was not quality judgment but a check for whether text exists. We were holding the same ruler against judgeable responses and in-progress responses without distinguishing them.

The fix went into the execution stage rather than the judgment logic. We determine first whether the response is judgeable, and turns that are progressing via tools do not get the same judgment as a normal answer.

Quality retries are owned by the judgment and decision stages, not the provider layer. Per-criterion scores and shortfall reasons go back as correction feedback and the rewrite count increments. On reaching the ceiling no further candidates are produced, but **that is not recorded as a quality pass.** The final result carries the last judgment and whether retries were exhausted.

When adding an evaluation mechanism, it is safer to decide up front what it returns for inputs that are not evaluation targets. Such inputs generally exist, and without a default they come out as low scores.

## There was a reason the order of checks could not be rearranged

A turn runs in this order: model call, response policy check, tool policy and execution, quality judgment, turn-boundary decision.

The order is not a matter of taste, because each check protects something different. Input may have been allowed and the model response can still contain sensitive data. A response can be safe while the tool it requests needs separate approval.

Hitting a policy or cost limit produces a termination reason at that check point and blocks any following model or tool call.

## Tests looked at the order of events, not counts

Verification ignored final strings. We checked that events happened in the right order.

Does a transient error produce exactly one logical response afterwards; does a tool turn leave the quality retry count untouched; does a terminal tool executed in the current turn end the run with no extra model call; does a terminal record from the past alone fail to end it. We also confirmed that a blocking policy is not followed by further calls.

Even after all that, something remained. Once the canvas output nodes chained after a terminal tool are included, ownership of the side effect still overlapped. Part 9 handles that separately. A finer freshness problem, where candidates and scores survive across turns, surfaced later and went to Part 10.

## Call counts were an outcome, not a cause

Reduced to one line, what we did here was pull apart things that were being counted by the same number.

Provider recovery does not advance state, tool progress does, and quality rewriting produces a different answer. Termination differs too between completing, aborting, and exhausting a limit.

**Call counts are what those distinctions leave behind, and on their own they explain neither runtime nor cost.** In the same place where "retry 3" explained nothing in Part 1, this time sat termination and ceilings.

Once the boundaries existed, there was finally somewhere to use judgment scores. Until then scores only separated pass from reject; now we could compare which settings produce better scores. The next part covers searching configuration candidates with those scores while keeping the search itself from running away.

---

**Previous →** [The model that wrote the answer was also grading it (Part 4)](/en/blog/harness-journey-4-canvas-node-judge)

**Next →** [We thought we had held out a validation set (Part 6)](/en/blog/harness-journey-6-self-forging)
