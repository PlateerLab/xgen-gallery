---
title: "The 30x gap wasn't the model (Part 7)"
titleSeo: "Control execution before comparing"
cover: "/blog/harness-journey-7-qwen-vs-sonnet.svg"
thumb: "/blog/harness-journey-7-qwen-vs-sonnet-thumb.svg"
description: "Two models on the same workflow gave 2,488 and 84 seconds. Matching iteration ceilings and output limits turned 2,488 into about 100."
date: "2026-06-13"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Benchmark", "LLM"]
draft: false
---

**We cloned the same code generation workflow, wired an internally deployed Qwen3.6-27B to one and Claude Sonnet 4.6 to the other. The first result was 2,488 seconds and 84 seconds. Matching the iteration ceiling and output limit turned 2,488 into roughly 100. The model had not changed. This is about what we were actually measuring, and what was left once the conditions matched.**

---

## The number 30x had several things inside it besides the model

On 24 June we connected two models to the same workflow and started comparing real behaviour.

The first result was Qwen at 2,488 seconds, Sonnet at 84. On the numbers alone it is easy to write down that one is about 30 times slower and move on.

We opened the execution records. The Qwen side was producing long output, passing through quality judgment, and building a new candidate, repeatedly.

Inside those 2,488 seconds was not just single-response latency. Output volume, iteration count, judgment and tool wait time were all in there.

```text
2,488s = model inference time
       + time spent producing longer output
       + quality rewrite turns
       + judge call latency
       + tool latency
```

**It was called a model comparison, and what we were comparing was two runs combining a model with a harness configuration.**

Building a configuration search in Part 6 does not make experimental conditions fair automatically. Automatic search finds the next configuration candidate; a benchmark **explicitly fixes** the conditions of the two runs being compared. Different jobs.

Send both models the same question and the input looks identical. Plenty varies underneath. Default output limits differ per provider. One side may pass through several quality retries. Receiving a tool result as an empty response can trigger repeat calls of the same tool. And if final answer lengths differ, both generation time and judgment time move with them.

## Matching the limits turned 2,488 seconds into 100

To look at the same range we set the iteration ceiling to 1 and the output token limit to 4,096.

Qwen's runtime dropped to about 100 seconds. We had not changed the model, and it became a twenty-fifth of the original.

That does not mean the two models are equally fast. It means **the original 30x cannot be called model inference speed.** A run permitting quality retries and a run generating once were different experiments to begin with.

4,096 tokens is not the right answer either. A task needing long answers may find it short. So rather than picking a correct ceiling, we applied the same ceiling to both models and **recorded whether the ceiling was actually reached.**

This is where model evaluations most often go wrong. Run candidate models under their own defaults and compare times, and that table compares defaults rather than models. Defaults differ by provider, and usually by more than the models do.

## We could not tell a run that finished quickly from one that stopped short

Even after matching limits, comparing on total time alone blocked again.

Some runs finished fast, and the number alone could not say whether that was efficiency or hitting a ceiling partway.

So we split total time. How many model calls, quality retries, and tool calls each happened, together with input and output tokens. Termination reason was separated into normal completion, iteration ceiling, and output ceiling.

Part 5's split of call counts into three kinds got used here. Without it this comparison would have stopped at a total-time table.

**Fast is neither good news nor bad news on its own.** You need why it ended to know which direction to move.

## After matching conditions the gap was not 30x but 2x

With the controlled configuration we reran six practical analysis and strategy tasks that use no tools: remote work, B2B SaaS entry strategy, data project failure, app marketing, smart factory roadmap, and churn improvement. Different in character from code generation.

The judge model on both paths was fixed to Claude Sonnet 4.6.

```text
judgment score   both models 0.92–1.00      per-task difference 0.01–0.05
runtime          Qwen  73–92s               Sonnet  38–52s
```

Quality score differences were small across this task set. The runtime difference recurred, and within the same configuration and six tasks Qwen generally took about twice as long.

It did not shrink from 30x to 2x. **30x was a number measuring something else, and 2x is the first number we measured after matching conditions.**

Nor did we conclude from a single average. Tool loops can lengthen on particular tasks, and provider load and network conditions vary. You need per-task distribution and maxima, plus medians and spread across repeated runs, to tell whether a few slow cases pulled the average or the difference is persistent.

## The model looked like it was floundering, and it was a tool result contract

There is a reason we attached no tools to those six tasks. Mixing tool conditions into one experiment adds call selection and external response time on top of model generation time.

Tool-using comparisons were separated. What we needed to confirm there was whether both models receive the same tool contract.

Along the way we saw this case. A tool finished without raising, returned an empty string, and the harness recorded it as success. The model, without the information it needed, called the same tool again.

The log shows the model repeating a call. **It looks like the model is floundering; the cause was in the tool result contract.**

Runs like that mixed into a benchmark get recorded as a difference in model judgment. So the comparison tools split their results.

```text
success (usable result)          ↔  normal response with no result
transient error (retryable)      ↔  permanent error (fix the input)
```

The observation handed to the model and the state recorded by the harness have to mean the same thing, or each model's different error-handling style leaks into the benchmark.

Tool exposure was matched too. If one side sees the full tool schema up front and the other has to search, the model-call conditions already differ. We fixed the connected tools, exposure method, and search results, and confirmed both paths run through to actual invocation the same way.

Odd behaviour appearing in a model evaluation is worth suspecting on the tool and contract side first. Models often act reasonably given the observations they receive, and our code produced those observations.

## We wrote down the range we could speak in, and stopped there

Written plainly, what this experiment confirmed is this.

Under a fixed harness configuration, across six practical tasks using no tools, the two models' judgment scores were similar and a runtime difference recurred.

We did not go further. The judge shares a model family with one side of the comparison, and there are six tasks. There is no basis for extending this to a general model ranking.

When writing up a comparison, **recording the conditions under which the sentence holds alongside the conclusion** at least slows the table down from travelling on its own.

## The benchmark was a test of the harness, not the model

Before the experiment we fixed a configuration snapshot; during it we recorded per-stage time, iteration reasons, tokens, and tool results; afterwards we evaluated with the same judge.

What came out of that was not only model differences. Excessive quality retries, misclassified tool results, and needlessly large output limits surfaced too.

All of them were ours.

**Putting two models side by side surfaced first what the harness could not explain.** If you cannot decompose slowness into model inference, provider wait, tool use, and quality rewriting, you cannot read model differences either. That is why the benchmark was never about producing two model names and a time table.

As the experiment wound down the next problem appeared. Fixing one run's configuration well and deciding what to hand to the next run are separate matters. To avoid repeating the same failures and the same corrections from scratch, you have to leave behind not the whole conversation but a small state worth reusing, in the right scope. The next part covers separating in-run working notes from between-run memory.

---

**Previous →** [We thought we had held out a validation set (Part 6)](/en/blog/harness-journey-6-self-forging)

**Next →** [Letting the nearest memory always win was wrong (Part 8)](/en/blog/harness-journey-8-memory-loop)
