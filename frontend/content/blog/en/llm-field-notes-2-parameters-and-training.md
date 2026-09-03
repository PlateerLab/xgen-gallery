---
title: "What changes when an LLM has more parameters? (Part 2)"
titleSeo: "What more LLM parameters actually change"
description: "Parameters are trained numbers, not stored facts. Model size only makes sense alongside data, compute, post-training, and inference cost."
date: "2026-09-03"
cover: /blog/llm-field-notes-2-parameters-and-training-en.svg
author: "김해수"
authorGithub: "haesookimDev"
category: "Tech Note"
tags: ["LLM", "Parameters", "Pre-training", "Scaling laws"]
draft: true
summary: "An LLM's parameters are not a list with one slot for every fact. They are trained numbers used throughout the calculation that turns input into a next-token distribution. More parameters provide room to represent more complex patterns, but that capacity becomes useful only with sufficient data, compute, and post-training. In deployment, weight memory is only the beginning: context and concurrent requests also contribute to cost."
faq:
  - q: "Does one parameter store one piece of knowledge?"
    a: "No. A fact or concept is represented through interactions among many parameters, while one parameter participates in many different inputs. Parameter count cannot be read as the number of stored knowledge items."
  - q: "Is a model with more parameters always more accurate?"
    a: "Scale tends to help within the same family when data and compute are sufficient, but it is not a universal ordering. Training data, training duration, post-training, the evaluation task, and inference settings can let a smaller model perform better on a particular job."
  - q: "How much memory does a seven-billion-parameter model need?"
    a: "Weights alone take about 14GB at FP16 because each parameter uses two bytes. Four-bit weights are about 3.5GB in theory, but real inference also needs quantisation metadata, a KV cache, runtime buffers, and framework overhead."
  - q: "Does quantisation reduce the number of parameters?"
    a: "Usually the number of parameters stays the same while each value is represented with fewer bits. This reduces storage and memory bandwidth but introduces rounding error, so quality and throughput need to be measured again on the target work."
---

**Parameter count is not the number of facts an LLM knows. Parameters are numerical values used while turning input tokens into a next-token distribution, and training adjusts those values to reduce prediction error. More parameters create room for more complex patterns, but that room does not become answer quality unless data, training compute, and post-training support it.**

---

## A 7B model does not contain seven billion knowledge records

The `B` in model labels such as `7B` and `70B` stands for billion. A 7B model has roughly seven billion numerical values adjusted through training. It is the most visible number in many model comparisons, even though what it counts is often left vague.

One parameter does not contain one capital city, legal clause, or programming rule. A concept is represented through interactions across parameters and layers, while the same parameter participates in calculations for many sentences and tasks. This is also different from storing a training sentence at an address and retrieving it later.

In a simplified view, each parameter helps determine how strongly one signal should be amplified, reduced, or mixed with another. Dozens of layers repeat these calculations before producing scores for the next token. **Parameter count is closer to the number of adjustable degrees of freedom than the number of stored answers.**

## Training nudges the numbers after every prediction error

Expanding one small pre-training step makes the process easier to see. The model receives part of a text and calculates a distribution for the next token. A loss measures how little probability it assigned to the actual next token, backpropagation finds the direction in which each parameter would reduce that loss, and an optimiser makes a small update.

```text
part of a training passage
  → calculate the next-token distribution
  → compare with the actual token and measure loss
  → calculate parameter gradients
  → update values slightly
  → repeat with other passages
```

One update does not complete a grammar rule or fact. Similar relationships recur in different contexts, and many small adjustments accumulate into reusable patterns. The next-token behaviour from Part 1 is the result of that repetition.

The frequency and composition of the data enter the parameters too. Repeated inaccurate explanations can become learned patterns, while a rare language or specialist field may be represented less strongly. Parameters retain relationships found in data; they are not a store that independently repairs the balance and accuracy missing from that data.

## A larger model has a wider space for representation

More parameters give a model room to distinguish and combine more patterns. That can help it represent subtle language relationships, multi-stage code structures, and different task formats in one model. It is why scale tends to help when comparable data and training conditions can be maintained.

The study on [scaling laws for neural language models](https://arxiv.org/abs/2001.08361) reported that, within its experiments, language-model loss improved along approximately power-law curves as model size, dataset size, and training compute increased. Its observation was that improvement followed partially predictable trends rather than being entirely irregular.

Capacity and well-trained capacity are different things. A large model trained too little on the same data can leave much of its capacity underused. If the data contains duplication and error, a larger model can also learn those patterns in greater detail.

Parameter count is therefore better read as **one condition on the capacity available to training**, not a completed capability score. Engine displacement alone does not tell us journey time and safety; model size alone does not describe the whole run either.

## Under the same compute budget, a smaller model has won

The limit of increasing model size becomes clearer under a fixed training-compute budget. The budget has to be divided between more parameters and reading more training tokens.

The [Chinchilla study](https://arxiv.org/abs/2203.15556) trained a 70-billion-parameter model on four times more data than an existing 280-billion-parameter model under the same training-compute budget. The 70B model outperformed the 280B model across the evaluations reported in that study. This does not mean smaller is inherently better; it shows that **large capacity is not fully used when model size and training data are out of balance**.

That result changes the order in which a model listing is read. Parameter count is followed by training-token count, data composition, and how far training progressed. Where those details are not public, they remain conditions that cannot be compared.

Data volume is not sufficient on its own. A collection containing the same document many times differs from a diverse collection of checked material even at the same token count. Cleaning, language balance, and the proportions of code and mathematics affect which tasks a model handles well.

## Post-training changes how capacity is used

A pre-trained model can continue many kinds of text, but does not reliably follow user intent. Supervised fine-tuning on instructions and example answers, followed by preference optimisation or reinforcement learning, can shape that behaviour further.

Post-training can noticeably change quality without adding many parameters. Format following, handling of unknown questions, safety behaviour, and tool-call syntax can all change here. It is also why multiple instruct variants can be built from a base model of the same size.

Post-training does not fill in every item of knowledge missing from pre-training. It is closer to redirecting behaviour through a limited set of examples. Specialist knowledge or current facts may call for further training, retrieval, or reference material, depending on how often the information changes and how precisely it must be cited.

## Storage begins with parameter count but does not end there

Weight memory is usually the first deployment calculation. Seven billion parameters stored at 16 bits take two bytes each, or roughly 14GB for weights alone. Representing each at four bits brings the theoretical weight size to about 3.5GB.

Real memory requirements are higher. Quantisation scales and other metadata, intermediate values, and runtime buffers take space, as does the KV cache that holds keys and values for a long context. Context length and concurrent requests change memory consumption even when the weights do not.

Quantisation represents the same parameters with fewer bits to reduce storage and memory bandwidth. The accompanying precision loss can appear differently across tasks. Summarisation may show little change while numerical reasoning or code generation accumulates error, so file size and task quality need separate measurements.

## We read four numbers alongside model size

Parameter count is useful information. It becomes more explanatory when placed next to the other conditions.

| Item | What it indicates | What it does not establish |
| --- | --- | --- |
| Parameter count | Representational capacity and weight scale | Data quality or instruction following |
| Training tokens and data mix | Scope and amount of material seen | Accuracy and currency of each source |
| Training compute | How fully capacity and data were trained | Service latency and concurrency |
| Post-training and evaluation | Behaviour on particular tasks and criteria | Results when transferred to another workflow |

Deployment then adds numerical precision, context length, concurrency, and hardware. “How many B?” is a first question, not the final answer.

The next part will separate patterns retained in parameters from information supplied in the current conversation. We will look at what a larger context window makes possible, why it is not the same as memory, and where retrieval-augmented generation fits.
