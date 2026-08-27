---
title: "The job reported success and the graph was empty (Part 9)"
titleSeo: "Making silent failures audible"
cover: "/blog/ontology-journey-9-adaptive-extraction.svg"
thumb: "/blog/ontology-journey-9-adaptive-extraction-thumb.svg"
description: "Switching to a small local model left batches unfinished, and jobs recorded as successful left an empty graph. Truncation arrived as empty results."
date: "2026-06-30"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "LLM extraction", "Failure recovery"]
draft: false
---

**Switching the ontology extraction model to a small local one left a single batch of the same document running for nearly fifteen minutes. The more awkward case sat next to it: the job finished successfully and the graph was empty. Truncated JSON and timeouts were arriving in the same shape as an empty extraction result. This is about making failure look like failure, and letting the processing unit be decided at run time.**

---

## Failures arrived in the same shape as empty results

Before the model change, a fixed 10,000-character input was working fine.

Switching to a small local model produced two things: batches that would not finish for nearly fifteen minutes, and jobs that finished successfully with an empty graph.

The first is visible. The second is not.

The cause was the shape failures arrived in. Hit the output token limit and the JSON truncates mid-stream, so parsing fails. That parse failure was **being handled as the same value as an empty extraction result.** Timeouts too.

```text
normal    no entities found in the document  → empty result
abnormal  JSON truncated                     → parse failure → empty result
abnormal  no response                        → timeout → empty result
```

Three cases arriving as one value left the upper stage unable to tell them apart. It recorded "nothing to extract in this document" and moved on as a success.

The fixed 10,000-character input was pressing on both the small model's context and its output limit, and that pressure surfaced as a silent failure.

When writing a function that returns an absent state, **representing "not there" and "could not fetch" as the same value** loses that distinction permanently. To the caller both are an empty list.

## Lowering the constants made another model split unnecessarily

The immediate response was lowering batch size and output tokens. It passed.

Run it on another model and it split unnecessarily fine. Models with headroom were being called at a size fitted to a small model, and call counts grew.

The next attempt was a per-model-name table of constants. This model gets this size, that one gets that.

That broke too. **A model's capability and its current serving configuration are different things.** The same model brought up with a smaller context makes the table wrong. A table is accurate only on the day it is written.

So we abandoned memorising numbers. The extractor **reads the current model's input and output budgets at run time** and computes batch size.

For OpenAI-compatible servers we probe the model listing metadata for context-length values. Key names and locations differ per server, so we check nested metadata too. Where runtime probing is impossible, as with cloud APIs, we use operational settings, and only when neither exists do we fall back to a verified default.

We do not assume "this model is 128K" from a provider name.

The moment you write a value that varies by environment into code as a constant, that value stops following the environment. **If it can be asked at run time, asking** is cheaper than maintaining a table.

## Looking only at context means truncating at the output

Computing budgets taught us one more thing.

Ontology extraction produces larger output than ordinary summarisation. Many entities and relations in the input make the JSON array grow fast.

Look only at the context window and batch large and **the input fits while the output truncates.** The silent failure above was exactly that path.

So the character budget takes the smaller of two values.

```text
batch character budget
  = min(
      input budget: context window minus system prompt and output headroom,
      extraction-volume budget the maximum output tokens can carry
    )
```

This is not an exact token count. It is a conservative estimate using a characters-per-token ratio and a structured-output inflation factor tunable through operational settings. Change model or language and actual usage has to be re-measured and the coefficients adjusted.

Sizing batches from the input limit alone is a common default. For work whose artifact can exceed its input, that default does not hold.

## Truncating the front makes the trailing rows vanish silently

Even with a reduced batch budget a single chunk can exceed it. HTML tables and OCR output produce very long chunks.

The existing path sent only the front of the string. That makes **the trailing rows disappear with no indication.** Another failure recorded as success.

Large chunks are now split preferring table row boundaries, falling back to a character window. Split pieces keep the original chunk identifier.

**The model call unit shrinks; where the result traces back to does not.** The provenance link built in Part 1 must not break here.

The path that sliced input at fixed lengths was removed. Batch assembly composes input within budget, so the extraction function does not re-cut what it is handed. The point was keeping the responsibility for cutting in one place.

## Only the failed batch splits in half and retries

Once failures were distinguishable, recovery could be defined.

The JSON call now returns timeout, output truncation, and parse failure separately. A batch that hit a problem splits in half and retries. Healthy batches are not rolled back.

```text
batch run
  ├─ success ───────────→ merge results
  └─ timeout / truncated
       ├─ left half ────→ rerun
       └─ right half ───→ rerun
```

Retries are managed with an explicit stack rather than recursion. Calling the same function recursively while holding a concurrency slot means **it can end up waiting on a slot behind itself.** One job acquires a slot once and processes the split batches in order internally before merging.

On merge, classes and properties are deduplicated by identifier while instances, relations, and values are appended with provenance intact.

## We did not eliminate every silent failure

Honestly, here is what remains.

If the smallest indivisible unit fails, the current result ends as absent, and **the upper aggregation can skip that exception or empty result.**

The split and merge logic exists, but there is still no contract promoting per-batch failure counts and identifiers into a job error to prevent partial loss. So what we fixed here is **most of the silent failures, not all of them.**

We made failure audible on the most common paths; the innermost path remains.

Verification scope needs stating separately too. Splitting and merging, truncation signals, input and output budget calculation, and concurrency slot release were confirmed with unit tests loading the real classes. We also checked that the existing call site keeps the same behaviour without the new optional arguments.

However, we could not reach the target local model server at the time, so **actual model metadata probing and a full live build were not confirmed.** The verified scope is the calculation and recovery logic; processing-time improvements on a specific local model have to be measured separately once the server is available.

## A system that fails quietly looks like it has a high success rate

This part started looking like a performance problem: the small model is slow.

What we actually fixed was how failure arrives. Truncated responses and timeouts came down as the same value as empty results, so the system looked like it was running fine and only the graph was empty.

**A system that fails quietly has a high success rate on the dashboard**, because failed runs are counted on the success side. The same class of problem as Part 3's completion state and Part 5's automatic deletion.

On the document side, absorbing model differences was the point. Structured data allows a different approach. The database already provides types, primary keys, and foreign keys, so there is no reason to use a model to interpret a row.

The last part covers turning query results directly into a graph, and redeciding what an entity's identity should be.

---

**Previous →** [Document dedup was merging structured tables (Part 8)](/en/blog/ontology-journey-8-structured-incremental)

**Next →** [URIs built from names merged two people into one (Part 10)](/en/blog/ontology-journey-10-rdb-ingest)
