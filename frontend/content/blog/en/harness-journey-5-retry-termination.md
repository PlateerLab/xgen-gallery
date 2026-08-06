---
title: "Why retry and termination conditions are separate (Part 5)"
titleSeo: "Retry vs termination (Part 5)"
description: "Separating the meanings of transport recovery, progress through a tool, and quality rewriting, and making a terminal tool end exactly the current round."
date: "2026-05-26"
cover: /blog/harness-journey-5-retry-termination.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Retry", "Execution control"]
draft: false
---
> **Agent harness design · 5/10**

The early engine had retries too. On a transient provider error it resent the same request, and when quality judgement fell short it attached feedback and produced a new answer. Policy checks sat before and after the model call, just before tool execution, and at round boundaries. Each mechanism worked in isolation, but combined with real tool execution the meanings of termination started to overlap.

While verifying the canvas harness from 8 to 10 June, we saw runs continuing after a terminal tool had been called. And in the other direction, there was a risk of judging the current round finished on the basis of a terminal-tool record left from an earlier round. When "the tool call succeeded," "the answer passed quality," and "the task is complete" are folded into one success value, none of them can be expressed accurately.

To fix it we split the reason for calling again from the place that owns termination. The criteria were simple: **what stays the same and what changes in the next call, and is there an event in this round that proves completion.**

## A provider error does not advance execution state

If a rate limit or transient overload meant no model response arrived, there is neither an answer candidate nor a tool request. Resending here is not new work; it is recovering the same logical call.

So recoverable errors are handled inside the model provider layer. The request and conversation state are left untouched, a backoff appropriate to the error type is applied, and the call is repeated. When the configured attempts are exhausted, the call failure is returned to the higher execution loop. We do not fabricate an empty response and pass it downstream as a normal result.

The only value that increments here is provider call attempts. The agent's overall round count and quality-rewrite count have not moved. `RetryEvent` records the error type, attempt number, and wait time — so that in the total latency, model inference and transport-recovery waiting can be told apart.

## A model call after a tool is progress, not a retry

If the model requested a search tool, the call itself succeeded. There is simply no final answer yet; the work advanced toward acquiring a new observation. The harness checks policy before tool execution, adds the result to the messages and execution state, and calls the model again.

That transition is `continue`, not `retry`. Using a tool three times does not consume three quality retries. What increases instead is the execution loop's overall round count and the token and cost budget. A run that keeps calling tools and never ends is stopped by `max_iterations` and the execution budget.

Without that distinction, lowering the quality cap also cuts off legitimate tool exploration midway. Raise the cap and provider recovery, tool progress, and answer rewriting all share one counter, making cost hard to predict. Even where the same name `max_retries` appears in settings, which layer reads it and which events it counts have to differ.

## A terminal tool ends the run only when called in the current round

Some tools are not intermediate actions taken to obtain a result; they are the submission itself. Sending a message, or a final save — once the call succeeds there is no reason to carry that task further. Registering those as terminal tools lets the run transition to complete without the model producing a separate closing sentence.

Early on, a method of searching the whole conversation history for a terminal tool name was mixed in. That goes wrong in two directions. If the tool executed but the decision stage does not see the current call, an unnecessary extra model call happens. Conversely, a terminal record left from an earlier round can end a round that is still in progress.

We narrowed the scope of the termination judgement to the current round. We check together whether the most recent model response is a tool request made in this round, whether that tool is registered as terminal, and whether execution succeeded. Only when all three hold does it transition to complete. The conversation record remains as evidence, but it does not stand in for current state.

```text
No tool request in the current response → ordinary answer judgement
An intermediate tool in the current response → add the result and continue
A terminal tool in the current response → confirm success, then complete
```

That rule stopped the problem of unnecessary model calls following a terminal tool. Duplicate ownership of side effects, including downstream canvas output nodes, was not settled at this point; Part 9 deals with it separately.

## Falling short on quality is not recovering the same request

An answer built from tool results can be a technically valid response. But if a separate judge ruled it below the bar, resending as is has no reason to produce anything different. The deficient items have to go into the next input and a new answer has to be produced.

So a quality retry is owned by the judgement and decision stages, not the provider layer. Per-criterion scores and shortfall reasons are passed as correction feedback and the rewrite count increases. When the cap is reached, no further candidates are produced — but that is not recorded as a quality pass. The final result carries the last judgement and whether retries were exhausted.

A tool-progress round with no finished text does not get the same quality judgement as an ordinary answer. Ruling "insufficient answer" merely because a tool was requested turns legitimate exploration into a rewrite failure. The early judge hardening focused on distinguishing, at the execution stage, responses a judgement can apply to from responses still progressing through tools.

A finer freshness problem — candidates and scores surviving across rounds — was found later, but at this point separating the kinds of iteration and the current round's termination event came first. That freshness work returns in the last part.

## Termination checks ran in the layer that owns them

The order within a round is model call, response policy check, tool policy and execution, quality judgement, round-boundary decision. Order matters because each check protects something different. Input may have been permitted while sensitive information appears in the model response; a safe response may still need separate approval for tool execution.

Caps are also checked in the layer where the iteration began. Provider call attempts are bounded by the model call layer, quality rewrites by the judgement path, and overall progress including tools by the execution loop. Policy or cost limits produce a termination reason at their own inspection point and block the model or tool call that would follow.

Tests checked the order of events rather than the final string. After a transient error, is exactly one logical response produced? Does a tool round leave the quality-retry count untouched? When a terminal tool executes in the current round, does the run end with no further model call — and does a past terminal record alone *not* end it? We also checked that no calls continue after a blocking policy.

A call count is only an outcome. Distinguishing whether each call recovered the same request, advanced the work with a new observation, or produced a new candidate from judgement feedback is what makes execution time and cost explainable. Once that boundary existed, we could try using judgement scores as a signal that changes the settings of the next run, rather than as a plain log. The next part covers how that configuration search was safely constrained.


---
**Previous →** [Why generation and judgement became separate execution stages (Part 4)](/en/blog/harness-journey-4-canvas-node-judge)
**Next →** [Searching configuration candidates with judgement scores (Part 6)](/en/blog/harness-journey-6-self-forging)
