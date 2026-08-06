---
title: "Searching configuration candidates with judgement scores (Part 6)"
titleSeo: "Config search by judge score (Part 6)"
description: "Changing one item at a time behind promotion thresholds and execution caps — including an honest look at the limits of the current validation-set separation."
date: "2026-06-04"
cover: /blog/harness-journey-6-self-forging.svg
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Configuration search", "Automated evaluation"]
draft: false
---
> **Agent harness design · 6/10**

Once an independent judge existed, every run began leaving per-criterion scores and rejection reasons behind. That signal can be used just to decide whether to produce one more answer — but when the same kind of failure repeats, it can also be grounds for changing the settings of the next run. Values a person had been adjusting one at a time — the iteration cap, search breadth, judgement threshold — could become a constrained search problem.

When we started `SelfForge` on 17 June, generation, judgement, and retry reasons were already separated, which gave us the base to test a link between a configuration change and a score change.

The simplest implementation runs several configuration combinations and picks the one with the highest score. But if output length and iteration count both changed and the score rose, there is no telling which change did it. There is also a real risk of choosing a configuration that only suits the tasks used in evaluation and the judge's taste. An automatic search is a device for raising performance and, at the same time, a device for finding the gaps in your evaluation faster.

So we put the centre of gravity on **the procedure for promoting or reverting a change**, rather than on the candidate-generation algorithm.

## We changed one item at a time

Hand the whole harness configuration to a model and let it rewrite freely and you get varied candidates. But when the system instruction, iteration cap, judgement threshold, and active strategy all change at once, it is effectively a new harness. The cause of a score change cannot be isolated, and rollback amounts to overwriting the previous settings file wholesale.

`SelfForge` changes only registered configuration items. Numbers, booleans, and enums each have a type and permitted range, and a single `Move` changes exactly one setting. When a candidate is built we compute not only the before and after values but also the `inverse` that would apply exactly the reverse.

```text
Move
  target  : max_iterations
  before  : 4
  after   : 3
  inverse : 3 → 4
```

That constraint shrinks the search space. It can reach an optimum more slowly than moving several values together. In exchange it leaves a single step of causality — "narrowing the search breadth changed the evaluation score like this." Offline search applies a candidate to a copy of the baseline configuration, and if the candidate is rejected that copy is simply not adopted. The `inverse` is a contract for verifying that a change is reversible, and for audit records and runtime recovery — it does not mean a reverse change is re-executed against production settings on rejection.

## We separated the development score from the promotion threshold

Even changing one item at a time, over-optimization remains if candidates are both produced and accepted on the same problem set. The judge may simply prefer phrasings that appear often in the development tasks, while new input gets worse. When the judgement score itself becomes the target, configuration search turns into a Goodhart problem of learning the judge's blind spots.

So we evaluate the baseline configuration first, then check separately whether a one-item candidate improved the development score and whether a separate score did not drop. If an independent auxiliary metric is registered, it is compared too. If any one fails, the candidate copy is not adopted and the current baseline configuration stands.

```text
Baseline evaluation
  → change one item
  → development score improved?
  → separate score held?
  → registered auxiliary metric held?
  → promote or discard the candidate
```

We did not average the three results into one. Letting a large rise in the development score offset a drop elsewhere loses the over-optimization signal. Being able to explain which threshold a rejected candidate failed is what stops the next search repeating the same mistake.

That said, the current implementation cannot be called strict held-out validation. `Objective.evaluate()` returns execution records from the separate problem set, and the reflection that proposes the next candidate reads those records. The convenience API `from_bench()` also sets the development and comparison problem sets identically. Auxiliary metrics only work where a domain has registered them. A development score counts as an improvement if it exceeds `1e-9`, and `epsilon` applies only to the permitted drop in the comparison score. So there is not yet a threshold testing whether an improvement is large enough to exceed the noise in model judgement.

The current thresholds are a defensive line against regression, but they do not guarantee a final test set that candidate generation never saw. Time, tokens, and cost are also not default axes of `Objective` at the moment, so they have to be added as separate auxiliary metrics and execution records.

In practice it is safer to split the problem set into at least three layers: a development set that produces candidates, a validation set that filters promotion, and a final test set opened once after the search ends. The current implementation partly blends the first two roles, so the final test has to be run separately, outside the search tool.

## Reflection proposes candidates but cannot exceed the scope

Scores alone make it hard to decide which setting to change next. The reflection that reads evaluation feedback proposes a reason for the next `Move` based on failure cases. If cases where a tool could not be found keep recurring, for instance, it can propose adjusting the search breadth.

But reflection never writes a setting directly. A proposal has to pass the registered item, its type, and its permitted range, and it has to obey the one-item-at-a-time rule. The judge model's natural-language proposals are separated from actual authority to apply them. However clever candidate generation gets, the promotion gate and the rollback contract do not change.

## The search itself has termination conditions too

"Until a better configuration appears" has no end. A single candidate requires several model calls and judgements, so without a termination condition an improvement feature becomes a cost-runaway path.

`SelfForge` uses `max_steps` for the maximum number of steps and `patience` for stopping after consecutive failures to promote. Reaching either returns the current baseline. Early termination is not a failure; it is the finding that no better candidate was confirmed within the defined scope.

Each search record keeps the step, the change, the inverse, the before and after comparison scores, the promote-or-discard outcome, and any over-optimization signal. That said, the development score, the full set of auxiliary metrics, and time, tokens, and cost are not all preserved in the current record. Tracking the total evaluation budget and already-visited combinations also remains a boundary to shore up before scaling the search.

## We separated next-version search from current-run recovery

Automatic configuration change has two problems on different timescales: finding the default configuration for the next version using a prepared set of tasks, and recovering within the current run when a user's request has failed. Build them as one feature and offline-verified changes get mixed with improvised production changes.

`SelfForge` is the former: an offline search tool that repeatedly runs a prepared problem set and keeps only candidates passing the promotion threshold as the next baseline. `RuntimeConfigMutator` is a runtime mechanism that takes the current run's failure signals and changes a restricted set of settings. That path cannot run a separate problem set, so it has to move within far narrower authority and execution caps.

Runtime changes are split into three modes: `off`, `observe`, and `act`. The default, `off`, changes nothing. `observe` records only what change would have been proposed while leaving the actual settings alone. Only after checking proposal frequency and false positives on production input does `act` apply a permitted change and journal the inverse. We did not open automatic-change authority in production just because offline search results looked good.

The crux of a feature that changes its own configuration was not producing many candidates. Narrowing what may change, setting promotion thresholds and termination conditions, and keeping a final test the search tool never sees came first. The next part looks at something separate from configuration search: how the harness's execution conditions were aligned when actually comparing two models.


---
**Previous →** [Why retry and termination conditions are separate (Part 5)](/en/blog/harness-journey-5-retry-termination)
**Next →** [Controlling execution conditions before comparing models (Part 7)](/en/blog/harness-journey-7-qwen-vs-sonnet)
