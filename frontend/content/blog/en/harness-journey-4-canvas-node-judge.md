---
title: "The model that wrote the answer was also grading it (Part 4)"
titleSeo: "Separating answering from accepting"
cover: "/blog/harness-journey-4-canvas-node-judge.svg"
thumb: "/blog/harness-journey-4-canvas-node-judge-thumb.svg"
description: "When one model writes an answer and then judges it, generation method and pass criteria share a context. Splitting doing the work from accepting it."
date: "2026-05-17"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Quality judgment", "Reflexion"]
draft: false
---

**The agent kept dropping rules, so we appended "check your work again" to the end of the prompt. The check mostly passed, and rules were still dropped. The model that wrote the answer was also grading it. This is about splitting the responsibility for doing the work from the responsibility for accepting the result, and about what is still not guaranteed after the split.**

---

## We were leaving mandatory items to a sentence saying "check again"

After making compiled workflows callable from outside, we looked again at the multi-stage business review flow already in use.

It was divided into several sub-stages, and each stage's judgment method, prohibitions, and output format all sat inside one long system prompt.

The same model reads the material, produces a result, and immediately judges whether that result followed the rules. The implementation is simple.

The problem was that both jobs live in one context. **Generation method and pass criteria compete inside the same text.** Even items that must never be dropped hang on a single instruction to check your own work.

When something was dropped we could not tell which rule caused the rerun either. The model said "checked" and moved on.

What we re-examined here was not prompt structure but **who decides acceptance**. The same problem from Part 1, where we stopped letting the model decide whether output passed, had returned one layer up at business rules.

So in late May we started the design and in early June applied it to the canvas harness node's execution path. Business data extraction and document tools stayed on the generation path; the judgment criteria that must hold and the output schema moved to a judgment stage and policy checks.

We did not put two nodes on the screen. Inside one harness node, generation and judgment became **separate states**.

## Showing the judge the whole conversation made it impossible to tell what was graded

The first judgment path passed the entire generation conversation to the judge. More context seemed like better judgment.

Inside it were tool calls, intermediate reasoning, and previously rejected candidates all mixed together. Getting a judgment back did not tell us **which candidate the score belonged to**.

Trying to swap the judge model made it worse. A new judge had to understand the format of the generation conversation. Swapping the judge became a change to the generation stage.

So we narrowed the input. Only the user's current request, the candidate being evaluated, and the criteria. If tool results used as grounding are needed they go in a separate field, but the generation stage's internal state does not travel wholesale.

Output got a shape too, instead of free-form critique: per-criterion score and reason, an overall score, short feedback, and a pass-or-retry decision.

```text
generator → answer candidate
             ↓
        independent judge → per-criterion scores · feedback
             ↓
        state machine → complete or retry
```

Narrowing the input turned the judgment result from a report card into **the input to the next transition**. Instead of "write it better", the generator receives which criterion it missed and why, and builds a new candidate.

Giving an evaluator lots of context looks generous, but the wider the context the blurrier the question of what exactly is being evaluated. If you cannot write down the object of evaluation in one sentence, that score cannot be interpreted later.

## One score did not tell the next candidate what to fix

The early judge returned a single overall score. Above the threshold, pass; below, retry.

With retry enabled, the next candidate did not improve. The number 0.62 says nothing about what was lacking, and the generator receiving that number back could not tell what to change.

**"The score is low" and "here is what to fix" were different pieces of information.**

So each criterion got a name, a description, a weight, and a required flag. Partly because good answers differ by task: a summarisation agent and a code generation agent have no reason to weigh relevance, completeness, format compliance, and grounding the same way.

Criteria created on the canvas were also included in the compiled specification for standalone artifacts. Criteria defined on a product screen that vanish in standalone execution mean it cannot be called the same agent. Judge model, criteria version, and pass threshold went into the execution record so we could tell when the meaning of a score changed.

## We thought marking a criterion required guaranteed it, and it was still a model judgment

Adding a required flag felt like creating items that could not be dropped. If a mandatory field is missing, no amount of fluent prose gets it through.

The entity making that required determination was still the model.

A required criterion is only a rule that other strengths cannot offset it; **judging whether that criterion was met remains a judgment that can wobble**. Naming it required did not create a guarantee.

So we split thresholds into two kinds.

```text
quality judge   how well was it met       relevance · completeness · grounding · clarity
                → LLM judgment. used to compare degree

policy gate     violating it blocks the run  personal data · forbidden tools · approval · cost limits
                → decided in code. does not wobble when the judge's response does
```

Conditions decidable in code, like whether a JSON field exists, moved to rule-based checks.

If policy blocks, execution stops no matter how high the quality score. Conversely, passing policy does not mean the answer is good. That distinction leaves "safe but insufficient" and "good content but unrunnable" as different states with different termination reasons.

This boundary collapses most often in organisations adopting LLM judges. Once the judge starts working well, you want to put personal data and cost limits in there too. **Your security policy must not wobble on the day the judge's responses do.** What must hold and what would be nice to have need different machinery.

## Separating the judge model raised independence and cost together

Reusing the generation model as the judge is easy to wire and cheap. It can also be generous toward its own preferred phrasing and shares the weaknesses it had while generating.

Attaching a separate provider or stronger model raises independence and raises latency and cost.

We did not fix either as the answer. Decidable items are checked by rule-based strategies; natural-language quality can be routed to a separate judge provider and model.

When cost pushes toward reusing the main model, **we record in settings and logs that the result is not an independent evaluation.** The same score has to remain interpretable later in terms of how it was produced.

Change the judge model and the same 0.8 is no longer the same scale. So when comparing generation models we fix the judge, and when changing judges we re-check that the ordering of existing reference answers holds.

More than the absolute score, **whether good answers consistently rank above clearly deficient ones** turned out to be the criterion that was actually useful.

## Writing a critique and changing the next turn were different jobs

Produce a judgment and leave it in the log and nothing about execution changes. Early on that is what happened. Judgment records accumulated and results stayed the same.

The correction path turns per-criterion shortfalls into short instructions and sends them back to the generation stage. It does not replace the original user request; it attaches what to fix in this candidate.

Part 1's distinction was needed again here. This retry is not a transport recovery resending the same request but **a new generation turn carrying judgment feedback**. So quality retry counts and turns that progressed via tools are recorded separately.

Roles held too. The judge does not write answers, and the generator does not decide its own pass.

## We did not quietly pass runs where judgment failed

Sometimes the judge provider cannot be reached or the response cannot be parsed.

Fabricating a score there keeps execution moving, but that score means nothing. Looking at the record later, it is indistinguishable from a real judgment.

So the engine produces no score in that case and returns a state saying judgment was skipped, with a reason. A product that requires quality validation can block that state by policy.

There is a boundary here. The engine returning that state and the product integration layer actually blocking on it are different things. Failure policy can differ per integration layer, so **we did not claim the whole integration is safe based on the engine state alone, and each integration's policy had to be checked separately.**

Designs that pass by default on failure are usually quiet. As quiet as they are, they go undiscovered for a long time.

## Verification looked at ordering, not scores

We did not check whether a given answer produces exactly the same decimal score. LLM judgment varies.

We looked at three things instead: does an answer that satisfies the criteria score above one that clearly violates them, does an answer breaking a required condition fail to pass, and does the next candidate after rejection feedback actually change the item it was faulted on.

We also ran the same criteria on a canvas node and a standalone artifact and confirmed the result structure and transitions matched. When a strategy is missing or a criterion definition is absent, it must not silently fall back to default judgment.

Through that verification the judgment criteria became **part of the execution contract** rather than a screen setting.

## Splitting them did not make the answers better

Did answers noticeably improve after separating generation and judgment? No.

What changed is elsewhere. We can now say which candidate was rejected on which criterion, and how that feedback entered the next generation. For answers that passed, we can say what we looked at in order to pass them.

So what we gained was not quality but **a language for talking about quality**. Raising quality only became possible once that language existed.

And the split created a new problem. Which candidate exactly a score belongs to, and whether a previous turn's judgment lingers across turn boundaries. That freshness problem is covered in Part 10.

The next part looks at the problem sitting in front of it: distinguishing progressing via tools, resending after a transport error, and rewriting after a quality miss, and deciding where a run ends.

---

**Previous →** [It installed, but we couldn't call it the same run (Part 3)](/en/blog/harness-journey-3-compile-wheel-mcp)

**Next →** [The submit tool fired and the run kept going (Part 5)](/en/blog/harness-journey-5-retry-termination)
