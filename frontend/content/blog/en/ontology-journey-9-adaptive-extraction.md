---
title: "Adapting extraction batch size to the model's limits (Part 9)"
titleSeo: "Batches that fit the model (Part 9)"
cover: "/blog/ontology-journey-9-adaptive-extraction.svg"
thumb: "/blog/ontology-journey-9-adaptive-extraction-thumb.svg"
description: "Computing the context and output budgets together, then splitting and reprocessing only the batches that timed out or came back as truncated JSON."
date: "2026-06-30"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "LLM extraction", "Failure recovery"]
draft: false
---
> **Knowledge graph design · 9/10**

Switching the ontology extraction model to a small local model produced batches from the same document that would not finish for nearly 15 minutes, and jobs that ended successfully while the graph came back empty. A fixed 10,000-character input was pressing on the small model's context and output limits at once, and truncated JSON and timeouts were being handled as if they were empty extraction results.

Lowering batch size and output tokens got things through for the moment, but split other models unnecessarily fine. A table of constants keyed by model name went out of date as soon as the context size in the actual serving configuration changed. And reprocessing a whole failed group from scratch was expensive.

We changed the extractor to read the current model's input and output budgets, compute batch size from them, and split and retry only the batches that timed out or came back truncated. Instead of memorizing numbers per model, the capacity at execution time and the failure signals decide the processing unit.

## We use the smaller of the input budget and the output budget

Ontology extraction produces larger output than ordinary summarization. When the input has many entities and relationships, the JSON array grows quickly. Batching input large based on the context window alone can get you truncated at the output token limit.

The character budget is the smaller of the two values.

```text
Batch character budget
  = min(
      input budget: the context window minus the system prompt and output headroom,
      extraction-volume budget affordable within the max output tokens
    )
```

This is not an exact token count from a tokenizer. It is a conservative estimate, tuned through operational settings for the tokens-per-character ratio and the inflation rate of structured output. When the model or the language changes, actual usage has to be re-measured and the coefficients adjusted.

For OpenAI-compatible servers we probe the metadata at `/models` and `/v1/models` for values such as `max_model_len`, `context_length`, and `n_ctx`. Key locations and names vary by server, so nested metadata is checked too. Where runtime lookup is impossible, as with cloud APIs, the operational setting is used, and only when neither exists do we fall back to a verified default.

We do not assume "this model is 128K" from a provider name. What a model is capable of and how it is currently being served can differ.

## Large chunks are split without losing their provenance

Even with a reduced batch budget, a single chunk can exceed it. HTML tables and OCR output in particular produce very long chunks. Sending only the front of the string quietly drops the rows at the back.

Large chunks are split on table row boundaries where possible, and by character window where there are no row boundaries. The split pieces keep the original `chunk_id`. The model call unit gets smaller, but the source a result maps back to does not change.

We removed the path that truncated input with a fixed-length slice. Batch assembly composes input within the estimated budget above, so the extraction function does not arbitrarily re-cut what it is handed.

## We turned timeouts and truncation into retry signals

The old JSON call had no explicit timeout. A single slow batch could hold up completion of the whole group. And even when a provider returned `finish_reason=length` or `max_tokens`, it could end up handled as an empty result after a parse failure.

We made the JSON call return timeout, output truncation, and parse failure as distinct outcomes. A batch that hit a problem is split in half and retried. Healthy batches are not rolled back.

```text
Batch execution
  ├─ success ──────────────→ merge results
  └─ timeout / truncated
       ├─ left half ───────→ re-run
       └─ right half ──────→ re-run
```

Retries are managed with an explicit stack. Recursively calling the same function while holding a slot in the semaphore that caps concurrent calls means the call can end up waiting on a new slot for itself. One job acquires a slot once, processes the split batches in order internally, and merges the results.

When merging, classes and properties are deduplicated by identifier, while instances, relationships, and values are appended with their provenance preserved. That said, if the smallest indivisible unit fails, the current result ends as `None`, and the aggregation above it can skip over an exception or an empty result. The split-and-merge logic exists, but a contract that promotes per-batch failure counts and IDs into a job error, to prevent partial loss, is still outstanding.

## We distinguished logic verification from live verification

Splitting, merging, truncation signals, input and output budget calculation, and semaphore termination were confirmed with unit tests loading the real classes. We also checked that the existing JSON call site keeps the same behaviour without the new optional arguments.

However, we could not reach the target local model server at the time, so real model metadata lookup and a full live build were not confirmed. The verified scope is therefore the calculation and recovery logic; any processing-time improvement on a particular local model has to be measured separately once the server is available.

For documents, absorbing model differences was the crux. Structured data allows a different approach. The database already provides types, primary keys, and foreign keys, so there is no reason to use an LLM to interpret rows. The last part covers building a graph directly from SELECT results, and handling full replacement and incremental updates safely.

---
**Previous →** [Why ten CSV classes became four](/en/blog/ontology-journey-8-structured-incremental)
**Next →** [Safely replacing a graph with the results of a SELECT](/en/blog/ontology-journey-10-rdb-ingest)
