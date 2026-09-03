---
title: "If an LLM only predicts the next token, how does it get work done? (Part 1)"
titleSeo: "How next-token prediction becomes useful work"
description: "An LLM predicts the next token rather than looking up an answer. How that objective enables useful work—and why fluent output is not proof."
date: "2026-09-03"
cover: /blog/llm-field-notes-1-next-token.svg
author: "김해수"
authorGithub: "haesookimDev"
category: "Tech Note"
tags: ["LLM", "Next-token prediction", "Transformer", "Generative AI"]
draft: true
summary: "An LLM calculates a distribution for the next token from the tokens already in context, appends one choice, and repeats. Pre-training turns that objective into reusable patterns of language and code, while post-training shapes those patterns into instruction-following behaviour. A plausible continuation is not the same as a true answer, so factual lookup, calculation, and real-world action still need sources, tools, and validation."
faq:
  - q: "Does an LLM retrieve learned sentences like a database?"
    a: "Ordinary LLM inference does not retrieve a sentence from a database. It calculates the next-token distribution from parameters adjusted during training and the current context. Models can sometimes memorise and reproduce training text, which is one reason not to treat them as trustworthy stores of source material."
  - q: "Does setting temperature to zero make an answer factual?"
    a: "No. A low temperature generally makes the model choose high-probability tokens more consistently; it does not check whether those tokens are supported by facts. Consistency and accuracy need separate validation."
  - q: "If the model only predicts the next token, why does the prompt matter?"
    a: "The model conditions the next-token distribution on the context before it. Instructions, examples, reference material, and output format change that context and therefore the distribution. A prompt does not retrain the model; it tells the model which learned pattern to continue in this response."
  - q: "When does an LLM answer need external validation?"
    a: "External validation is needed when an error carries a cost: current facts, calculations, quotations, regulations, or changes to a real system. Depending on the task, that can mean primary sources, a calculator or code execution, tests, permission controls, and execution logs."
---

**An LLM is not a system that stores correct answers and retrieves them on demand. It calculates a distribution for the next token from the tokens already in context, chooses one, and repeats. The striking part is that applying this simple training objective to enough data and model capacity also produces summarisation, translation, and coding behaviour; the caveat is that a contextually plausible answer is not necessarily a true one.**

---

## We looked again at how fluent answers are made

An LLM summarises documents, answers questions, and writes code. These are different tasks, yet a user enters a sentence into the same chat box and receives a result. The more natural that experience becomes, the easier it is to imagine that the model is following a process much like a person doing the work.

The underlying operation is different. A model does not inherently retrieve the meaning of a question as a separate knowledge record or run a fact-checking stage before it writes. It repeats one process: calculating the next token from the context in front of it.

We have repeatedly seen the same confusion while reviewing model output. Natural prose feels like evidence of understanding, and a confident answer can feel well supported. In the other direction, “it only predicts the next token” makes an LLM sound no different from sophisticated autocomplete.

Bridging that gap calls for examining the simplest operation before listing more capabilities. The first question is simple: **how does the objective of next-token prediction turn into behaviour that can perform useful work?**

## Next-token prediction is a loop, not a single choice

A token is the basic unit in which a model processes text. One token does not reliably equal one word. A short word may be one token, an unfamiliar or long expression may be several, and whitespace or punctuation may be grouped differently by different tokenisers.

Given a request such as “summarise these meeting notes in three lines,” the model does not compose the whole answer in one pass. It converts the input to tokens and assigns a score to each of many possible tokens that could follow the current context. It turns those scores into a probability distribution, selects one token, appends it to the context, and calculates again.

```text
input tokens
  → score every next-token candidate
  → probability distribution
  → select one token
  → append it to the context
  → repeat until a stop token
```

In compact notation, the model repeatedly estimates `P(next token | tokens so far)`. This is not the probability that a statement is true. It is **the probability that a token follows from the current context under the patterns learned by the model**.

Temperature and sampling settings change how that choice is made. Lower temperatures concentrate selection on highly scored candidates; higher temperatures give lower-scored candidates more opportunity. These settings affect diversity and repeatability, not factual verification.

## Predicting what comes next required learning more than sentences

“Next-token prediction” sounds like phone autocomplete. The distinction is less about the name of the objective than the scale and conditions under which it is learned. An LLM trains across varied natural language and code, repeatedly adjusting a large set of parameters to reduce prediction error.

Local word frequency is not enough to predict well across long passages. The model benefits from representing subject–verb relationships, terms defined earlier in a document, question-and-answer formats, variables declared earlier in code, and the expected structure of a genre. Repeatedly reducing prediction error produces internal representations that can reuse those relationships.

This is why models can exhibit task behaviour that was not attached to a separately labelled training task. The [GPT-3 paper](https://arxiv.org/abs/2005.14165) evaluated few-shot behaviour across translation, question answering, and other tasks by placing instructions and examples in the input without updating model weights.

That does not mean we fully understand how every capability arises. Which behaviours become reliable at which scale, and how internal representations map to human concepts, remain open research questions. In practice, we find it more useful to measure **which behaviour repeats under which conditions** than to begin by choosing between “the model understands” and “the model does not understand.”

## The Transformer relates distant pieces of one context

The Transformer sits near the beginning of the modern LLM story. Self-attention, introduced in the [2017 Transformer paper](https://papers.nips.cc/paper_files/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html), lets each position calculate how much to draw from other positions in the same context.

Resolving a pronoun near the end of a long document may require information from an earlier paragraph. Checking a function call may require a parameter declared many lines before it. Attention combines those relationships according to the current input rather than a fixed distance rule.

Attention should not be mistaken for search or fact checking. It is **a calculation that combines information already present in the context**, not a mechanism that automatically looks up current material outside it. Recent models may combine attention with other computations, but the model still produces output from its parameters and the context it has been given.

## A pre-trained model is not yet a helpful assistant

A base model can continue text after pre-training, but it is not automatically a safe, useful assistant. Presented with a question, it may continue with another similar question instead of answering, or ignore the requested format.

Post-training commonly adds supervised examples of instruction following and then further shapes behaviour toward responses people prefer. In the [InstructGPT paper](https://arxiv.org/abs/2203.02155), human evaluators on the study's prompt distribution preferred output from a 1.3-billion-parameter InstructGPT model to output from the 175-billion-parameter GPT-3 model. It was an early, concrete demonstration that **what behaviour training rewards matters alongside model size**.

This distinction changes how a model table should be read. Pre-training develops broad patterns across language and code; post-training shapes when and how those patterns are expressed under instructions and safety constraints. That is why a base model and an instruct model built from the same foundation can feel very different in conversation.

## Fluent mistakes come from the same machinery as useful drafts

An LLM's ability to prepare a good draft is not far removed from its ability to invent a plausible-looking citation. Both draw on the capacity to choose tokens that fit the context. The same generative skill can reconstruct a familiar report structure or fill missing information with convincing detail.

Calling this only “the model lying” tends to hide the useful response. The original objective rewards plausible continuation, and the model does not inherently consult a separate database to decide whether a claim is current and true. A task that needs factuality should provide current material, require sources, and verify calculations or actions with external tools.

This is the working distinction we use in practice.

| Task | What an LLM contributes | What still needs checking |
| --- | --- | --- |
| Summarising or rewriting supplied documents | Reads structure and transforms it to a requested form | Omissions, preservation of numbers, output format |
| Researching current facts | Frames questions, expands queries, connects sources | Source, publication date, agreement with the original |
| Calculation and data analysis | Proposes formulas and procedures, explains results | Calculator or code output, scope of input data |
| Writing code | Combines familiar patterns, proposes edits | Compilation, tests, real API and version |
| Acting through tools | Proposes a next action, interprets observations | Permissions, tool results, stopping conditions, execution record |

The starting point is to distinguish tasks whose evidence is already in the input, such as summarisation, from tasks whose evidence sits outside it, such as current research. The same generative mechanism can serve both, but failure has to be detected differently.

## A prompt changes the conditions without retraining the model

A prompt matters because it changes the conditions for the next token. Roles, tasks, examples, reference material, and output schemas narrow the pattern that the model is likely to continue. A good example can outperform a long instruction because it directly places the desired output pattern in context.

A prompt does not alter the model's parameters, however. That is why retrieval can be needed to supply current information, a calculator for exact arithmetic, or a tool for handling a real file. The prompt directs model behaviour; external systems provide facts and execution the model does not contain or cannot guarantee.

Separating those responsibilities also reduces endless prompt editing. We can distinguish a condition we ask the model to follow from one the system must guarantee. “Write three sentences” may be adequately handled as an instruction; “the total must exactly match the ledger” is safer as a programmatic check.

## We read operating conditions before feature names

The same LLM produces different results depending on its context, sampling settings, and post-training. Its useful range also changes when it is connected to search, a calculator, or code-execution tools. The answer visible on screen is therefore better understood as **the joint result of a model, its input, external tools, and validation**, rather than the capability of a model in isolation.

Giving a model more room to reason can help with complex problems, but it consumes more tokens and time. Search can supply current material, but its source selection still needs review. Tools can produce real actions, but they also require permissions, failure handling, and stopping conditions. Each added capability introduces another condition that needs to be checked.

This structure also lets us divide responsibility for an output. The model proposes and transforms, source material supplies grounding, tools execute, and validation checks the result. When those roles are explicit, an error can be traced back to the model, the supplied material, a tool result, or a validation rule instead of being assigned to the system as one opaque whole.

Three points are worth carrying forward from this first part.

1. An LLM's probability is the probability of the next token in context, not the probability that a claim is true.
2. Pre-training develops broad generative capability; post-training shapes how that capability follows instructions.
3. Sources, tools, and validation outside the model are still needed to guarantee facts, calculations, and actions.

The next part will examine the first number most of us see in a model name. We will look at what parameters retain through training, which capabilities and costs change as their count grows, and why model size alone does not determine answer quality.
