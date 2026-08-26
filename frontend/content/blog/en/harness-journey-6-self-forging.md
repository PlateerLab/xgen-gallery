---
title: "We thought we had held out a validation set (Part 6)"
titleSeo: "A regression guard is not held-out"
cover: "/blog/harness-journey-6-self-forging.svg"
thumb: "/blog/harness-journey-6-self-forging-thumb.svg"
description: "Building an automatic config search, we added promotion thresholds and a validation set. The component proposing candidates was reading that record."
date: "2026-06-04"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Configuration search", "Automated evaluation"]
draft: false
---

**Once the judge left a score on every run, we wanted to use those scores to change configuration automatically. Change one item at a time, add promotion thresholds, hold out a validation set. Later, rereading the implementation, we found the component proposing the next candidate was reading that validation record. This is about what an automatic search can and cannot be trusted with.**

---

## A device that raises scores is also a device that finds the gaps in your evaluation

Once the independent judge existed, every run left per-criterion scores and rejection reasons. There was no reason to use that signal only to decide whether to try once more. When the same kind of failure repeats, it is grounds to change the next run's configuration.

We had been changing iteration ceilings, search breadth, and judgment thresholds by hand. In mid-June we decided to turn that into a bounded search problem.

The simplest implementation runs several configuration combinations and picks the highest score. That is how we started writing it.

Two things caught almost immediately. If output length and iteration count change together and the score rises, you cannot tell which change did it. And the configuration that wins may only suit the evaluation tasks and the judge's tastes.

**An automatic search raises performance and, at the same time, finds the gaps in your evaluation far faster.** A human changes settings a few times a day; automate it and that rate changes.

So we put the centre of gravity on **the procedure for promoting or reverting a change** rather than the candidate-generation algorithm. Preventing bad candidates from being adopted came before producing many good ones.

Attaching automation, people usually look at generative capability first. The dangerous side is the gate that accepts the results. Without a gate, better generation just means faster wrong adoptions.

## Letting it rewrite the whole config made rollback a file overwrite

The first implementation handed the whole harness configuration to a model to rewrite freely. Plenty of candidates came out.

The problem showed up at rollback. If the system instruction, iteration ceiling, judgment threshold, and active strategies all change at once, it is effectively a new harness. You cannot isolate why the score moved, and rollback comes down to overwriting the previous config file.

So we narrowed what could change to registered items. Numbers, booleans, and enums each get a type and an allowed range, and one change touches exactly one setting.

When building a candidate we compute not only the before and after values but **the inverse that applies exactly the reverse**.

```text
Move
  target  : max_iterations
  before  : 4
  after   : 3
  inverse : 3 → 4
```

The constraint shrinks the search space. It reaches a good combination more slowly than moving several values together.

In exchange one step of causality survives: "we narrowed search breadth and the score moved like this." Offline search applies a candidate to a copy of the baseline configuration, and a rejected candidate means that copy is not adopted.

We were also explicit about what the inverse is for. It is a contract for verifying that a change is reversible, and for audit records and runtime recovery, **not a promise to re-apply a reverse change to production settings every time a candidate is rejected.**

Leaving rollback for later when designing automatic changes generally ends in snapshot restore. Then even after reverting, nothing is left explaining what went wrong and why.

## The moment a score becomes the target it stops being a metric

Even changing one item at a time, overfitting survives if you both generate and accept candidates on the same problem set. The judge may simply prefer phrasing common in the development tasks, and new inputs get worse.

If the judgment score itself becomes the target, the search learns the judge's blind spots. A metric stops being a metric the moment it becomes a target.

So promotion thresholds split three ways.

```text
evaluate baseline
  → change one item
  → development score improved?
  → separate score held?
  → registered auxiliary metric held?
  → promote or discard the candidate
```

We did not average the three into one. Letting a large development-score gain offset a decline elsewhere makes the overfitting signal disappear inside that average.

When a candidate is rejected, you have to be able to say which threshold it failed, or the next search repeats the same mistake.

## We believed we had held out a validation set, and the proposer was reading it

At this point we thought we had held-out validation. There is a development score and a separate comparison score, and promotion requires both.

Rereading the implementation said otherwise.

The comparison problem set's execution record was returned, and the reflection stage that proposes the next candidate **was reading that record.** If the side generating candidates can see the validation results, that validation is not held out.

The convenience API for attaching a benchmark made it plainer: the development set and the comparison set were configured as the same set.

The thresholds themselves were loose too. A development score counted as an improvement if it exceeded a very small epsilon, and the tolerance for decline applied only to the comparison score. Model judgment has noise, and **there was no test for whether an improvement exceeded that noise.** Auxiliary metrics only work when a domain registers them.

So what we had built was not held-out validation but a **regression guard**. Useful for filtering candidates that clearly make things worse; no guarantee about performance on problems the search has not seen.

Fixing the name changed how we used it. In practice it is safer to split problem sets into at least three layers.

```text
development   used to generate candidates       the search sees it
validation    filters promotion                 the search must not see it
final         opened once after the search ends run it outside the search
```

The current implementation blends the first two roles, so the final test has to run outside the search. Time, tokens, and cost are also not primary axes of the objective function today and have to be attached as auxiliary metrics and execution records.

If your organisation has adopted automatic evaluation, the same check is worth running once. Not whether the validation set is physically separate, but **whether the path that generates candidates is seeing those results in any form**. A team where humans read the validation score daily to pick the next experiment is in the same state.

## Reflection got to propose but never to apply

Scores alone make it hard to decide which setting to change next. So a reflection stage reads evaluation feedback and proposes a reason for the next change. If tool-not-found cases repeat, it can propose adjusting search breadth.

That stage cannot write settings directly. A proposal must pass the registered items, types, and allowed ranges, and honour the one-item-at-a-time rule.

Natural-language proposal and actual apply permission are separated. **No matter how clever candidate generation gets, the promotion gate and rollback contract do not change.**

## Without a termination condition, an improvement feature is a cost runaway

"Until a better configuration appears" has no end. Each candidate demands several model calls and judgments, so without a termination condition the improvement feature becomes a cost runaway path.

We added a maximum step count and a patience counter that stops after consecutive failures to promote. Hitting either returns the current baseline.

Early termination is not failure. It is the result that no better candidate was confirmed within the defined range.

The search record keeps the step, the change, the inverse, the before and after comparison scores, whether it was promoted, and overfitting signals. Development scores and the full set of auxiliary metrics, along with time, tokens, and cost, are not all preserved today. Tracking a total evaluation budget and already-visited combinations is also work to do before scaling the search up.

## Good offline results did not buy production permission

Automatic configuration change has two problems on different time axes. Finding the next version's default configuration from a prepared task set, and recovering within the current run when a user request fails.

Make them one feature and offline-validated changes mix with improvised production changes.

The search is the former: an offline device that runs problem sets repeatedly and keeps only threshold-passing candidates as the next baseline. The runtime mutation device is the latter, and since it cannot run a problem set it must move within far narrower permissions and limits.

So runtime change split into three modes.

```text
off      the default. changes nothing
observe  records what change it would have proposed, leaves settings alone
act      applies allowed changes and journals the inverse
```

`observe` exists so we can see proposal frequency and false positives on production input first. Good offline results did not immediately open production auto-change permission.

## In a self-modifying feature, what we actually designed was the stopping

Reduced to one line, this part built a device that changes its own settings. The time actually went into the opposite side.

Narrowing what can change, limiting it to one item at a time, precomputing the inverse, keeping three separate thresholds, adding termination conditions to the search, and defaulting production application to off.

And after all that, what we were calling held-out was really a regression guard. **The risk in automation is not that automation misbehaves but that it builds, alongside itself, a validation that looks like it is working.**

That covers moving settings automatically. The next part is about a human comparison. Putting two models side by side, the 30x gap that first appeared turned out not to be the models.

---

**Previous →** [The submit tool fired and the run kept going (Part 5)](/en/blog/harness-journey-5-retry-termination)

**Next →** [The 30x gap wasn't the model (Part 7)](/en/blog/harness-journey-7-qwen-vs-sonnet)
