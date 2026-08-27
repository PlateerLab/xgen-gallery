---
title: "Retry counts told us nothing about the run (Part 1)"
titleSeo: "Why retry counts explained nothing"
cover: "/blog/harness-journey-1-rust-to-python.svg"
thumb: "/blog/harness-journey-1-rust-to-python-thumb.svg"
description: "A run that called tools three times and one that failed quality checks three times both logged 'retry 3'. Splitting one loop into explicit states."
date: "2026-04-20"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Harness", "Agent execution", "State machine"]
draft: false
---

**When the agent kept repeating the same errors, the first thing we fixed was the prompt. It kept coming back in a slightly different shape, and when we opened the execution records we found three entirely different kinds of run recorded as the same single line: "retry 3". This is about what we had been counting wrong, and why that discovery turned into building a new executor.**

---

## Fixing the prompt only changed the shape of the error

It started with workflow generation. A user describes what they want in a sentence and the model builds a canvas workflow.

The model often invented nodes that did not exist. Sometimes it wired together ports that could not connect.

Our first response was to fix the instructions. We put the list of available nodes into the prompt, explained the port rules in prose, and enumerated what not to do.

The same errors kept returning. Fix the node names and the ports would be wrong; explain the ports and a nonexistent parameter would show up.

What we ended up re-examining was not the quality of the instructions but **who was deciding whether output passed**. Writing rules into a prompt is asking the model. Requests are mostly honoured, not always, and when they were not, nothing noticed.

So on 5 April we built seven checks that compare generated output against the node registry. Code verifies that the node exists, that port types match, that required parameters are filled. On failure the reason rides along with the next generation request, up to three attempts.

The model still generates. **The model no longer decides whether the result passes.**

Any organisation attaching generative features to real work meets this distinction again somewhere. What you can manage with instructions is the model's tendency; what you must guarantee has to live outside them. Keep both in the same place and you can no longer tell a guarantee from a request.

## We wedged judgment in as middleware and rolled it back within the week

A similar problem showed up in a multi-stage business review workflow. Replaying the record against the rules after a run finished could tell us the result was wrong. The problem was during the run. There was no place to apply those rules consistently while it was in progress.

The obvious fix was to wedge judgment middleware into the existing workflow executor. Hook the execution path, block anything that fails the rules. We added runtime judgment middleware that way on 8 April.

That same week we reverted all of it. Around 900 lines across five files, including the judge, the registry, and the trace adapter, disappeared at once.

We did not revert because the middleware failed to work. Making it work meant the product's node execution code and the business rules had to sit in the same layer, and then changing one rule meant touching node execution. The reverse held too: fixing one node shook the rules.

What we learned there was that we needed **not validation code but an execution layer that owned validation**. The validation logic already existed. What was missing was where it lived, and who decided what happens next when it fails.

```text
wedged in       product executor ─┬─ node execution code
                                  └─ business rules      same layer → changes shake each other

separated       product executor ── node execution code
                execution layer ── owns validation, retry, termination
```

Sometimes the problem is not the feature but the ownership. Where you put the same code determines the cost of every change after it.

## "Retry 3" was calling three different runs by the same name

Having decided on a separate execution layer, the first thing we fixed was not how to call the model but the states and transitions. What pushed us there was the execution record.

The record at the time held a retry count. One number seemed like enough. Know how many extra loops it took and you know the cost.

Opening the records said otherwise.

```text
Run A   called tools three times, completed the answer     → recorded: retry 3
Run B   produced three answers, all below quality bar      → recorded: retry 3
Run C   provider errors, resent the same request 3 times   → recorded: retry 3
```

Only the call count is the same across the three. The reason cost was spent differs, what needs to be passed to the next turn differs, and what a human should do about it differs.

A is healthy. Work progressed by using tools. B is a quality problem: the same request must not be resent, and a rejection reason has to ride along. C never advanced state at all; resending the identical request is exactly right.

**One counter was carrying three responsibilities, and so it explained nothing.**

Which means what we were counting was not retries. It was just an iteration count. We believed we were counting retries because the field was named retry.

So we split the next action into three meanings.

```text
continue → add the new observation and carry on with the current task
retry    → apply validation feedback and produce a new answer candidate
complete → fix the completion or abort reason and assemble the result
```

Once the names were separate, what each transition consumes and must leave behind followed. `continue` needs the tool call and its observation. `retry` needs the rejected candidate and the validation feedback. `complete` needs not only the final output but the reason it ended.

The unit of the execution record changed too. Not "how many times did it loop" but **"why did it move to which state"**.

If agent costs are coming in higher than expected, there is something worth checking first: whether the numbers you keep are cramming different reasons into one column. A total call count explains the invoice but not what to fix.

## With no tools at all, two stages called each other and never stopped

Having split the transitions, we assumed termination would follow naturally. The answer arrives and it ends; the limit is hit and it stops.

On 11 April we found that in a run with an empty tool list, the model-call stage and the tool-execution stage called each other without stopping.

```text
model call ──"I'll use a tool"──> tool exec ──"no such tool"──> model call ──> …
```

Each stage did its job correctly. The model requested a tool; the tool stage honestly reported that the requested tool did not exist. Neither was a bug.

What was missing was **anyone whose job was to judge this situation as terminal**. Treat termination as a side effect of each stage and you get combinations where every stage behaves correctly and the run still never ends.

After that incident we moved termination to a dedicated decision stage. It looks at the current answer candidate, tool state, policy result, and execution limits in one place and picks the next transition. The model-call stage records the response but does not decide termination. The tool stage adds observations but does not change quality judgment.

When you build a looping system, termination conditions look trivial as long as you only look at the happy path. What actually bites is the combination in which every component behaves correctly. That combination will not surface as a bug in any single component.

## We hardened it in Rust, and what we were waiting on was the model

The first standalone executor, built on 10 April, was Rust. It is an execution core, so a language whose compiler holds state and types seemed right. Fourteen thousand lines went in.

Four days later we deleted all of it and rewrote it in Python.

Not because performance fell short. When we measured execution time, most of it was spent waiting on model responses and external tools. The time spent computing state transitions rounded away next to that.

What grew fast was the other code: swapping providers, changing strategies, attaching evaluation methods. The real bottleneck was not the speed of state transitions but **the time to wire up a change and confirm it**.

```text
the bottleneck we assumed   state transition compute   → measured: negligible in total runtime
the actual bottleneck       wiring and verifying change → this grew every day
```

So it is less that Rust was the wrong choice, and more that the thing we were hardening was never the risky part. We were building a wall where there was nothing to defend.

Reviewing a technology choice usually starts with "which is faster". The question that comes first is **where the time is actually going right now**. When those two answers differ, optimisation leaves only cost behind.

## We tore out the language and the design stayed

There is a reason a full rewrite was possible in four days: we did not redesign from scratch.

Stage identifiers, state fields, event formats, and the tool interface were kept as they were. After the language change we could compare, side by side, whether the same situation still picked the same transition.

What that confirmed is that the asset we had built in Rust was not Rust code. The asset was having pinned the meaning of execution as a contract outside the language, and because that contract existed the implementation was disposable.

For the same reason the number of stages never mattered in itself. Dividing responsibilities produced boundaries for orchestration, input, history, prompt, tools, policy, context, execution, decision, and finalisation, and by the end of April it settled at ten.

```text
prepare input
  → [build context → call model → check policy → run tools → decide next action]
  → assemble result
```

What happens once and what repeats as needed came apart. The order of stages is fixed as an execution contract; how each stage does its work is swappable. Changing the context stage from truncation to summarisation does not touch the decision stage's state. Adding a provider does not mean rewriting the loop.

**A structure that looks like it has many stages actually narrowed the blast radius of each change.**

## The last sentence differed every time, so answers were not a test

Once it was built, how to test it remained. We started by comparing output strings against expected values.

The same input did not produce the same answer. A model's closing sentence shifts a little every time.

A different string did not mean the run was wrong. We had picked the wrong thing to verify. What we were trying to guarantee was not the wording of the answer but **whether the run chose the path the situation called for**.

So we checked paths instead of answers. Does a tool request lead to adding the observation and continuing? Does a validation failure lead to a new generation carrying feedback? Does a policy block end the run with no further calls?

Results kept more than the answer, too. Which stages it passed through, what it observed, why it continued or stopped, which run the tokens and cost belong to. If the wording differs but the meaning of the execution is the same, the same contract was honoured.

When verifying a system whose output changes every time, string comparison is usually a dead end. Write down what you are trying to guarantee and the thing to verify is often already inside that sentence.

## What we built was not a complicated loop but a set of names

Looking back, this work did not add many features.

Using a tool and rewriting an answer were always different things. Resending after a provider error was always different too. Termination was always split between completing and aborting.

Things that were already different were simply being called by the same name in code. That is why the execution record explained nothing, why we could not find where termination leaked, why we could not judge what to optimise.

The state machine was not a device for making a simple validation loop complicated. It was **a device for naming differences that were already there**. Once names existed, the decisions that followed came on their own: what each transition passes along, who owns termination, what to record, what to test.

It took twenty days from the first commit until the ten-stage structure settled. Most of those twenty days were not spent adding features but working out what was different from what.

That executor could still only live inside the product, though. The states and transitions were general-purpose, but data access and canvas object conversion were tangled into the same code. The next part covers separating the direction of that dependency so the executor works without knowing any particular product's database or screen structure.

---

**Next →** [We split the repos but not the dependencies (Part 2)](/en/blog/harness-journey-2-engine-separation)
