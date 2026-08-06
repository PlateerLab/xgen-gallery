---
title: "Why generation and judgement became separate execution stages (Part 4)"
description: "Rebuilding Company L's QA on the harness: separating generation logic from business judgement, and feeding per-criterion feedback back into the next run."
date: "2026-05-17"
cover: /blog/harness-journey-4-canvas-node-judge.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Quality judgement", "Reflexion"]
draft: false
---
> **Agent harness design · 4/10**

Having made a compiled workflow callable from outside, we looked again at Company L's product-review QA as a real application. The existing QA was split into several sub-flows reviewing product information and supporting documents, with values passed between stages through a shared store. The core judgement method, the prohibited conditions, and the result format all sat together inside long system prompts, stage by stage.

We rebuilt that on the harness not to reduce the node count. When the same model reads the material, produces a result, and then immediately judges whether its own result followed the business rules, the generation method and the pass criteria end up in one context. Mandatory judgement items come to depend on a sentence saying "check yourself again." And it is hard to trace which rule caused a re-run.

So we left the domain extraction method and the OCR and file tools on the generation path, and moved the judgement criteria that must be met, along with the output schema, into the harness's judgement stage and policy checks. We did not throw away the existing QA knowledge and build a new agent; we **separated the responsibility of doing the work from the responsibility of accepting the result**.

Design started on 29 May and was applied to the canvas `agents/harness` node execution path in early June. There is no separate generation node and judgement node on screen — inside one harness node, generation and judgement are split into distinct states. The generation stage produces an answer candidate; the judgement stage returns whether to accept it, plus correction information. Then we connected multi-criterion evaluation and Reflexion retry, which feeds judgement feedback back into the next generation input.

The point was not "telling the model to think once more." Generation and judgement had to use different states, and the state machine had to be able to turn a judgement result into a next action.

## We separated the judge's input from the generation conversation

Showing the generative model its whole conversation and asking "check whether this is well written" is simple to implement. But tool calls, intermediate reasoning, and previous candidates end up in one context. It is unclear which candidate a judgement applies to, and changing the judge model means knowing the generation conversation format too.

An independent judge narrows its input. It receives the user's current request, the answer candidate being evaluated this time, and the evaluation criteria. Where needed, the tool results used as evidence are passed in a separate field, but the generation stage's full internal state is not handed over.

Output is structured rather than free-form critique. It returns a score and reason per criterion, an overall score, short feedback, and a `pass` or `retry` decision. The state machine reads that to decide whether to complete or to return to generation carrying the feedback.

```text
Generator → answer candidate
              ↓
     Independent judge → per-criterion scores and feedback
              ↓
       State machine → complete or retry
```

In this structure a judgement result is not a grade sheet. It is the input to the next transition. Instead of a vague "write it better," the generative model receives which criterion it failed and why, and produces a new candidate.

## We did not flatten several criteria into one score

What counts as a good answer differs by task. A summarization agent and a code-generation agent have no reason to weigh relevance, completeness, format compliance, and groundedness equally. With a single score you cannot tell why it was low, and it is vague what the next candidate should fix.

So each criterion has a name, a description, a weight, and a required flag. Continuous scores are used to compare degrees of improvement, while required criteria mark conditions that other strengths cannot offset in the LLM score calculation. If a mandatory field is missing, a fluent sentence does not get it through. That said, a required criterion is still a model judgement, so it does not substitute for security or deterministic format guarantees.

On the canvas, judgement criteria are configured as node settings; in a standalone artifact, the same criteria are part of the compile specification. If criteria created on the product screen disappear in standalone execution, it cannot be called the same agent. The judge model, criteria version, and pass threshold are recorded with the run too, so we can tell when the meaning of a score changed.

## We put quality and policy behind different thresholds

Once there is a judge, it is tempting to make everything an evaluation item, including personal data and cost limits. But an LLM judgement is useful for comparing degree; it does not guarantee a constraint that must be met. When a judge's response wavers, the security policy must not waver with it.

Items about **how well something was satisfied** — relevance, completeness, groundedness, clarity — belong to the quality judge. Conditions where **a violation means the run cannot proceed** — personal data, prohibited tools, user approval, token and cost limits — belong to the policy gate. Conditions that code can settle definitively, such as whether a JSON field exists, are rule-based checks.

If policy blocks, execution stops however high the quality score is. Conversely, passing policy does not mean the answer is good. That distinction leaves "safe but insufficient" and "good content but not executable" as different states with different termination reasons.

## We separated the judge model without hiding its cost

Reusing the generative model as the judge is easy to wire and cheaper. But it can be lenient toward its own preferred phrasing, and it may share the generation process's blind spots in evaluation. A separate provider or a stronger model raises independence at the cost of latency and spend.

The harness did not fix one approach as correct. Determinable items are checked by a rule-based `EvaluationStrategy`, and natural-language quality can be wired to a separate `judge_provider` and `judge_model`. Where cost matters the main model can be reused, but the settings and logs record that the result is not an independent evaluation.

Change the judge model and the same 0.8 is no longer the same scale. So when comparing generative models we hold the judge fixed, and when changing the judge we re-check that the ordering of existing reference answers holds. What mattered was not the score number but whether a good answer is consistently rated above an obviously deficient one.

## Reflexion was input to the next round, not a critique

Produce a judgement result and leave it in the log and nothing about the run changes. The Reflexion path turns per-criterion shortfalls into short correction instructions and returns them to the generation stage. It does not replace the original user request; it is added as what to fix in this candidate.

A retry is not transport recovery re-calling the same answer. It is a new generation round carrying judgement feedback. So we recorded quality-retry counts separately from rounds that progressed using tools. And we kept the roles intact: the judge does not produce answers, and the generator does not decide its own pass.

The engine's default judgement path does not invent a score when it cannot call the judge provider or cannot parse the response — it returns a `bypassed` state and a reason. A product where quality verification is mandatory can block that state by policy. That said, some existing QA adapters retained a path where a judgement exception falls through to a default pass, for compatibility. So `bypassed` cannot be said to guarantee failure automatically in every product integration; the product bridge's failure policy has to be checked alongside.

## We confirmed the same judgement on canvas and standalone

Verification did not check for an identical decimal score on a given answer, because LLM judgement varies. Instead we checked that an answer sufficiently meeting the criteria scores above one clearly violating them, that an answer breaking a required condition does not pass, and that the next candidate after rejection feedback actually changes the deficient item.

We also ran the same criteria on a canvas node and a standalone artifact and checked that result structures and transitions match. When a strategy cannot be found or a criterion definition is missing, it must not quietly fall back to a default judgement. Going through that verification made judgement criteria part of the execution contract rather than a screen setting.

Splitting generation and judgement does not make answers automatically perfect. What changed is that we can explain which candidate was rejected on which criterion, and how that feedback entered the next generation. Afterwards a freshness problem — "exactly which candidate does this score belong to?" — surfaced as a separate task, covered in Part 10. The next part first distinguishes tool progress, transport recovery, and quality retry, and looks at where to end a run.


---
**Previous →** [Exporting a fixed execution contract as a single MCP tool (Part 3)](/en/blog/harness-journey-3-compile-wheel-mcp)
**Next →** [Why retry and termination conditions are separate (Part 5)](/en/blog/harness-journey-5-retry-termination)
