---
title: "Does longer reasoning make an answer better? (Part 4)"
titleSeo: "When longer LLM reasoning actually helps"
description: "Reasoning helps decompose problems; it is not proof. Separating hallucination types and task-specific checks makes model results explainable."
date: "2026-09-24"
cover: /blog/llm-field-notes-4-reasoning-hallucination-evaluation-en.svg
thumb: /blog/llm-field-notes-4-reasoning-hallucination-evaluation-en-thumb.svg
author: "김해수"
authorGithub: "haesookimDev"
category: "Tech Note"
tags: ["LLM", "Reasoning", "Hallucination", "Evaluation"]
draft: true
summary: "Generating intermediate reasoning gives a model room to break a problem into stages, but a longer explanation does not guarantee factual conclusions or a faithful account of how the answer arose. Hallucination includes not only invented facts but contradiction of supplied material, incorrect calculation, false citation, and claims that an unexecuted action succeeded. Evaluation is more useful when it records task-specific success, evidence agreement, format, cost, and failure reasons rather than one aggregate score."
faq:
  - q: "Does a longer chain of thought always improve accuracy?"
    a: "No. It can help with multi-stage arithmetic and compositional problems, but it can also elaborate a wrong premise or missing knowledge. Accuracy, token use, and latency need to be compared for the actual task."
  - q: "Does displayed reasoning reveal the model's actual internal decision process?"
    a: "That cannot be assumed. Displayed reasoning is also generated text, and research has found cases where it did not faithfully report factors that influenced the answer. A natural explanation and an independently verified conclusion remain separate."
  - q: "Can models be compared with one hallucination rate?"
    a: "Not reliably without a shared definition, task, and evidence condition. Factual error, evidence mismatch, calculation error, and false tool status should be separated and the evaluation setup disclosed."
  - q: "What is the right way to evaluate an LLM answer?"
    a: "Use exact match or code tests for closed tasks, claim-to-source checks for grounded answers, and an explicit rubric plus human review for open writing. Operational evaluation should also record latency, tokens, failure rate, and retries."
---

**Generating a longer line of reasoning gives a model more computational steps; it does not verify the answer. Intermediate stages can help decompose a complex problem, but a wrong premise or missing knowledge can also be continued into a longer response. What matters more than reasoning length is whether the conclusion has an independent criterion for checking it.**

---

> **Editor's note — what this means for enterprise buyers** — The first question after adoption is always "so how accurate is it?" This part explains why no single number answers that, and how to set acceptance criteria per task. Useful when you are defining PoC exit criteria or an operational SLA.

## A short wrong answer and a long wrong answer are both wrong

Asked to answer a difficult problem immediately, a model may skip intermediate calculation. Asked to work step by step, it may introduce equations, check conditions, and revise a result. That visible difference is an intuitive entry point to reasoning.

The difficulty is that confidence tends to grow with the explanation. Numbered steps, natural transitions, and a firm conclusion resemble a careful review record. If the first premise is wrong, however, every later sentence can follow grammatically and still produce a wrong result.

When reviewing output, we therefore separate role before length. Intermediate generation can explore candidates and decompose a problem. Answer judgment belongs to evidence independent of that generation: a calculator, source passage, test, or business rule.

## Intermediate tokens provide working space for decomposition

A next-token model can struggle to jump to a distant conclusion in one step. Writing variables and partial results lets later tokens use those intermediate values as context. The effect resembles using paper for a calculation rather than doing every step mentally.

The [Chain-of-Thought paper](https://arxiv.org/abs/2201.11903) reported improvements on arithmetic, commonsense, and symbolic reasoning tasks when sufficiently large models were prompted with examples that included reasoning steps. It was evidence for particular model scales and tasks, not a claim that every model and problem always improves.

Tasks that benefit tend to share a structure. They can be divided into stages, an earlier result becomes input to a later one, and intermediate mistakes have an opportunity to be revised. Planning, multi-step calculation, and comparison across several conditions fit this pattern.

Simple classification and short extraction may not need long reasoning. If the required fact is absent from the model and its context, thinking longer creates no new evidence. It can consume more tokens and latency while repeating an incorrect assumption.

## An explained reason may not be the reason that drove the answer

It is tempting to read displayed reasoning as a transparent log of the model's internal decision. That reasoning is itself generated text. Producing a natural explanation and faithfully reporting the factor that caused a prediction are different capabilities.

A study of [faithfulness in chain-of-thought explanations](https://arxiv.org/abs/2305.04388) inserted biasing signals such as multiple-choice option order. Models were influenced by the signal while often failing to mention it in the explanation, and in some conditions generated plausible rationales for an already biased answer.

Reasoning text can be a debugging clue and a useful explanation, but it is not a complete audit log. Inputs, tool calls, actual observations, and final results still need separate records. Verifiable external events are more direct operational evidence than attempting to expose every internal token.

## Hallucination is wider than inventing one fact

Hallucination is often illustrated by an invented person or paper. Smaller failure categories are more useful when deciding what to fix.

| Failure type | Example | How to check it |
| --- | --- | --- |
| External factual error | Invented rule or date | Compare with a primary source |
| Input grounding error | Conclusion absent from the supplied document | Link each claim to evidence |
| Logic or calculation error | Correct-looking steps, wrong total | Calculator or code execution |
| Citation error | Real document that does not support the claim | Inspect the cited passage |
| Execution-state error | Reports a tool completed when it was not called | Tool-event and result logs |

Different failures point to different components. Missing external facts call for retrieval; disagreement with present evidence calls for grounding checks. Calculation is usually better checked by executable output than by requesting a more eloquent explanation.

The [TruthfulQA study](https://arxiv.org/abs/2109.07958) evaluated models available at the time on 817 questions built around common human misconceptions. The best model in that experiment was truthful on 58% of questions, compared with 94% for humans. Those figures do not describe every model today, but the experiment illustrates how a misconception repeated in human text can also become a likely continuation.

## One score averages different failures together

Aggregate scores are convenient when narrowing a long list of models. Choosing a model for a particular workflow requires opening that score and examining its components.

The [HELM study](https://arxiv.org/abs/2211.09110) evaluated models across multiple scenarios and metrics including accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency. Its aim was to expose trade-offs that disappear when evaluation is reduced to one measure.

Operational tasks have different definitions of correctness too.

| Task | Primary evaluation | Supporting evaluation |
| --- | --- | --- |
| Information extraction | Field-level exact match and omission rate | Schema validity and latency |
| Numerical calculation | Comparison with executed ground truth | Units and intermediate procedure |
| Code generation | Tests and build success | Scope of change and runtime |
| Grounded question answering | Claim-source agreement and correctness | Citation completeness and freshness |
| Report drafting | Fact preservation and required sections | Prose quality and editing time |
| Agent execution | Goal state reached without side effects | Calls, cost, and stopping reason |

Open-ended work such as writing needs a rubric. “Good writing” becomes fact preservation, audience fit, prohibited wording, structure, and editing time. A model can act as a judge, but its score depends on judge choice and prompt, so programmatic checks and sampled human review remain useful.

## Shared conditions come before a shared question

Sending the same sentence to two models does not complete a fair comparison. Different reference context, output limits, sampling, reasoning depth, tools, or retries all enter quality and total time.

An evaluation record should include the input version, model and settings, actual output tokens, tool calls, and stopping reason. Distributions and failure cases matter more than one best run. Two systems with the same mean can need different controls if one occasionally fails much more severely.

This sequence has worked well for us.

1. Define success and failure from real work.
2. Fix the input, tools, and execution limits.
3. Build rules and tests for what can be checked automatically.
4. Sample open-ended quality with an explicit rubric.
5. Record failure reasons, cost, and latency distributions alongside scores.

This separates tasks that benefit from longer reasoning from those better served by a short answer. Abstaining when information is missing can be defined as a policy-compliant success rather than an automatic failure. Evaluation becomes a way to set the boundary of a role, not merely rank models.

The next part will separate an LLM that generates an answer from an agent that acts in an environment. We will examine what turns a tool-call proposal into execution and why repetition, permissions, and stopping conditions sit outside the model.

---

## If you are evaluating adoption

Here is "how accurate is it?" translated into contractual and operational terms.

First, **set acceptance criteria per task.** For summarisation the criterion is fidelity to the source; for fact lookup it is agreement with the cited source; for calculation it is reconciliation against a computed result. Collapsing these into one accuracy figure leaves none of them managed.

Second, **define abstention as success.** A model that stops rather than inventing an answer when evidence is thin is behaving to policy, not failing. Without that definition, teams drift toward the setting that always answers, and the bill arrives later.

Third, **treat the evaluation set as an asset.** The items and grading criteria you collect from real work get reused every time you change models. Building it early makes every later swap decision faster.

---

**See the whole series →** [LLM Inside](/en/blog/series/llm-field-notes)
