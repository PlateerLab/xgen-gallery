---
title: "Why we split the validation loop into execution states (Part 1)"
titleSeo: "The validation loop as states (Part 1)"
description: Designing generation, validation, tool execution, and retry as explicit states and transitions instead of hiding them inside one loop.
date: "2026-04-20"
cover: /blog/harness-journey-1-rust-to-python.svg
thumb: /blog/harness-journey-1-rust-to-python-thumb.svg
author: 김진수
authorGithub: jinsoo96
category: Tech Note
tags:
  - Harness
  - Agent execution
  - State machine
draft: false
---
The harness did not start as an effort to put more features into the agent. When the workflow auto-generation model produced a node that did not exist or a port that could not be connected, prompting alone was not enough to stop the same error recurring. On 5 April we wrote seven rules that check generated output against the node registry, and fed failure reasons back into the next generation for up to three corrections. The model still generates; the code decides whether it passes.

A similar problem showed up in the product-review agent QA at Company L. Replaying the execution records of a four-stage product-review agent QA against 65 judgement rules could find that a result was wrong, but applying the same rules consistently during a live run was hard. We considered inserting judgement middleware into the existing executor, but the product's node-execution code and the domain rules were coupled in one layer, and the change surface was too large. We needed a separate execution layer that owns validation and retry outside the generative model.

Looking only at the happy path, a separate executor can seem excessive — if the generated output passes validation, you are done. But when validation fails, or the model asks for a tool instead of an answer, or an execution limit is reached, the same "run once more" means different things. Keep adding the values to carry into the next round, and the termination conditions, as edges and conditionals in a workflow, and it gets hard to explain which event moved the current run.

So when we built the standalone executor on 10 April, the first thing we settled was not how to call the model but **the states and transitions**. The first implementation was in Rust, rewritten in Python on 14 April. By the end of the month it had settled into a ten-stage execution flow from input through result assembly. The language changed; the starting point — that the executor, not the model, decides validation and termination — did not.

## The same iteration served different purposes on the next round

Continuing after calling a tool and regenerating an answer after failing validation are not the same iteration. A tool round adds the observation to the existing conversation and carries the work on. A quality retry hands back the reason a finished candidate was rejected and produces a new one. Termination is different again: an answer can be complete, or the run can be stopped by policy or an execution limit.

Express that as a plain `true` and `false` and one counter ends up carrying several responsibilities. A run that used a tool three times and a run that failed quality validation three times both come out as "3 retries." The call count is the same, but the reason the cost was spent and the input to the next round are completely different.

The harness split the next action into three meanings.

```text
continue → add the new observation and carry on with the current work
retry    → produce a new answer candidate, reflecting the validation feedback
complete → fix the completion or abort reason and assemble the result
```

With that distinction you can also decide what each transition consumes and what it must leave behind. `continue` needs the tool call and the observation; `retry` needs the rejected candidate and the validation feedback; `complete` needs the final output *and* a termination reason. "Why did it move to which state?" replaced "how many rounds did it run?" as the basis for the execution record.

## Collecting state in one place made each stage's responsibility visible

Splitting the transitions is not enough if messages, tool results, validation scores, and cost are scattered across local variables in several functions — you cannot reconstruct a run. So we gathered the values needed during execution into `PipelineState`. Conversation history, available tools, pending calls, answer candidates, validation results, iteration count, tokens, and cost all move together under one execution ID.

Shared state is convenient, but leaving any stage free to change any field soon makes it no better than a global variable. We narrowed the inputs and outputs each stage owns. The model call records the response but does not decide termination. The tool stage adds observations but does not change the quality judgement. The decision stage looks at the current candidate, tool state, policy results, and execution limits together, and picks the next transition.

On that basis, a run divides into three sections: preparation, iteration, and assembly.

```text
Input preparation
  → [context assembly → model call → policy check → tool execution → next-action decision]
  → Result assembly
```

Normalizing user input and preparing the tool list only needs to happen once. Model call, policy check, tool execution, and next-action decision repeat as many times as needed. When the run ends, output, usage, and termination reason are assembled once. Compared with putting everything inside the loop, what repeats and what happens once became clear.

## The ten stages were not a feature list, they were change boundaries

When we built the initial executor, the number of stages did not matter in itself. Dividing up the responsibilities gave concrete boundaries — overall orchestration, input, history, prompt, tools, policy, context, execution, decision, and finalization — and by the end of April it had settled into a ten-stage pipeline.

The order of the stages is an execution contract; how each stage does its work is a swappable strategy. The context stage can be exchanged for a simple truncation or a summarization strategy, for instance, without that implementation directly changing the decision stage's state. Change the quality judgement method and the tool-execution stage's call specification stays as it is.

Even with many stages, this structure shrinks the change surface. Connecting a new provider swaps only the model-call strategy, without rewriting the whole loop. Spending the context budget differently does not require touching the state transitions themselves. Stage entry and exit, tool calls, validation, and retries are all emitted as events, so an execution order can be redrawn afterwards.

## Moving from Rust to Python, the contract stayed

We chose Rust for the first implementation because it is good for pinning down the state and types of an execution core. But most of the actual agent execution time went into waiting on models and external tools, while the code for swapping providers, strategies, and evaluation methods grew fast. The bottleneck was the time to wire up and verify a change, not the computation speed of a state transition.

So on 14 April we rebuilt the same state machine in Python. Rather than redesigning from scratch, we kept the stage IDs, state fields, event format, and tool interface. That let us compare whether the same situation still produced the same transition after the language change. The move to Python was a choice for implementation speed, but it was possible because the execution semantics had been fixed as a contract outside the language first.

## We verified the execution path, not the final answer

An LLM's last sentence can differ on every run. A test that matches strings exactly cannot verify a state machine. Instead we checked whether a tool request adds the observation and continues, whether a validation failure goes down a new generation path carrying the feedback, and whether a policy block terminates without further calls.

The result does not carry the answer alone. It links which stages were passed through, what was observed, why the run continued or stopped, and which execution the tokens and cost belong to. If the wording of the answer differs but the meaning of the execution is the same, the same contract was kept.

The state machine was not a device for making a simple validation loop complicated. It was a device for surfacing, in code, the differences that generation, tool use, judgement, and termination already had. The next part looks at how we divided the dependency direction so this executor works without knowing a particular product's database or canvas objects.

- - -

**Next →** [Why we separated the engine core from the product integration layer (Part 2)](/en/blog/harness-journey-2-engine-separation)
