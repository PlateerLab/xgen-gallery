---
title: "Controlling execution conditions before comparing models (Part 7)"
titleSeo: "Control the run, then compare (Part 7)"
description: "Comparing Qwen3.6-27B and Claude Sonnet 4.6 meant first separating iteration count, output length, the judge, and tool conditions."
date: "2026-06-13"
cover: /blog/harness-journey-7-qwen-vs-sonnet.svg
thumb: /blog/harness-journey-7-qwen-vs-sonnet-thumb.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Benchmarking", "LLM"]
draft: false
---
> **Agent harness design · 7/10**

On 24 June we cloned the same code-generation workflow, wired an internally deployed Qwen3.6-27B to one copy and Claude Sonnet 4.6 to the other, and started comparing what actually happened. The first result: Qwen 2,488 seconds, Sonnet 84 seconds. On the numbers alone it is easy to conclude one model is about 30 times slower.

But open the execution records and what was measured differed. The Qwen side produced long output, then went through quality judgement and generated new candidates, repeatedly. Those 2,488 seconds contained not just single-response speed but output volume, iteration count, and judgement and tool waiting time. It was called a model comparison, but what was actually compared was **two runs, each combining a model with a harness configuration**.

Having built a configuration search tool in the previous part does not make experimental conditions automatically fair. Automatic search finds the next configuration candidate; a benchmark is the work of explicitly fixing the conditions of two runs being compared. Using the state, judgement, and termination records already in place, we went back to checking whether the two models had really done the same work.

## Changing only the model name did not change only one variable

Send both models the same question and the input looks identical. But default output caps can differ by provider, and only one model may go through several quality retries. Receiving a tool result as an empty response can lead to calling the same tool repeatedly. When final answer lengths differ, so does judgement time, not just generation time.

Put only total execution time and final score in a table and you cannot explain why the numbers differ — whether the slow model actually took longer to reason, produced a longer answer, or the harness ran it one more time.

For the comparison runs we decided to change only the main generation model. Tasks, input data, system instructions, and connected tools stayed the same, and we aligned maximum iterations, quality-retry counts, output token caps, and termination conditions. Evaluation criteria and the judge model were fixed too. Change the generation model and the judge model together and you cannot separate a difference in generative ability from a difference in scoring temperament.

These conditions were recorded as a snapshot before the run. Results recorded not just the model name but the task, the settings, and the judge version. Even for a workflow with the same name, runs whose settings had changed were not pooled as the same experiment.

## Aligning iteration and output caps made the 30× disappear

To look at the first run within the same bounds, we set `max_iterations=1` and `max_tokens=4096`. Qwen's execution time dropped to about 100 seconds — roughly one twenty-fifth of 2,488, with no change of model.

That does not mean Qwen and Sonnet are equally fast. It means the original 30× cannot be called model inference speed. A run allowing quality retries and a run generating once are different experiments. For a task needing a long answer, 4,096 tokens may not be enough. Rather than picking a particular cap as correct, we applied the same cap to both models and recorded whether the cap was actually hit.

From then on we stopped reading total time as one number. We looked at how many model calls, quality retries, and tool calls occurred, alongside input and output tokens. We also separated whether the termination reason was normal completion or an iteration or output cap — to distinguish a shorter run that was genuinely more efficient from one that simply generated less and stopped early.

## We looked at the differences that survived alignment

With the controlled settings we re-ran six practical analysis and strategy tasks that use no tools: remote work, B2B SaaS market entry, data-project failure, app marketing, a smart-factory roadmap, churn improvement — all quite different from code generation. The judge model on both paths was fixed to Claude Sonnet 4.6. Judgement scores for both generative models fell in the 0.92–1.00 range, with per-task differences of about 0.01–0.05. Across this task set, quality scores did not differ much.

Execution time differences, on the other hand, appeared repeatedly. Qwen took 73–92 seconds per task, Sonnet 38–52. A completely different magnitude from the original 30×, but within the same settings and these six tasks Qwen generally took about twice as long.

Only now could we state the numbers within bounds. Not "Qwen is always slower than Sonnet," but "with the harness configuration fixed and six tool-free practical tasks, judgement scores were similar and an execution-time difference was observed repeatedly." Because the judge belongs to the same model family as one of the subjects, and because the task count is small, this cannot be extended into a general model ranking.

Nor did we conclude from a single average. A tool loop can lengthen on particular tasks, and provider load and network conditions vary. Per-task distributions and maxima, plus medians and variance across repeated runs, are what tell you whether a few slow cases pulled the average up or the difference is persistent.

## Tool conditions became a separate comparison item

The six tasks above had no tools connected, so we could see the model and the basic execution path. Mixing tool conditions into the same experiment adds call selection and external response time on top of model generation time. Comparisons involving tools were split into their own runs, where we checked that both models receive the same tool contract.

If a tool result arrives with a different meaning, the conditions are not controlled. If a tool finishes without an exception but returns an empty string and the harness records that as success, the model can call the same tool again without having obtained what it needed. The log looks like a model floundering, while the cause is in the tool result contract.

The comparison tools distinguished success-with-usable-result from the normal response of no-result, and separated errors recoverable shortly from permanent errors requiring corrected input. The observation passed to the model and the state the harness records have to carry the same meaning, or per-model error-handling styles leak into the benchmark.

Tool selection has to match too. If one run sees the full tool schema from the start while the other has to go through search, the model call conditions differ. We fixed the connected tools, how they are exposed, and the search results, and checked that the path holds all the way to the actual call.

## A model comparison was also a verification of the harness

Before the experiment we fixed a settings snapshot; during it we recorded per-stage timing, iteration reasons, tokens, and tool results; afterwards we evaluated per-task results with the same judge. Going through that process surfaced not only the difference between the two models but also excessive quality retries, misclassified tool results, and output caps larger than needed.

A benchmark was not the work of producing two model names and a timing table. It was the work of checking how far the harness can explain a difference in execution. Only when you can split "slow" into model inference, provider waiting, tool use, and quality rewriting can you read a model difference at all.

As the experiment wound down, what to carry into the *next* run became as important as one run's settings. Not repeating the same failures and corrections from scratch every time means storing not the whole conversation but a small state worth reusing, at an appropriate scope. The next part covers separating in-run working notes from between-run memory, and designing four scopes for it.


---
**Previous →** [Searching configuration candidates with judgement scores (Part 6)](/en/blog/harness-journey-6-self-forging)
**Next →** [Scoping and prioritizing memory between runs (Part 8)](/en/blog/harness-journey-8-memory-loop)
