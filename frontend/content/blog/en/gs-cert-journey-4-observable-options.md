---
title: "If changing the setting changes nothing, that is a defect (Part 4)"
titleSeo: "An option you cannot see (Part 4)"
description: "Most of the 36 defects in the third GS certification report were node options. Repairing the broken ones and making the invisible ones observable."
date: "2026-06-09"
cover: /blog/gs-cert-journey-4-observable-options.svg
author: "유지수"
authorGithub: master0419
category: "Tech Note"
tags: ["GS Certification", "Agent nodes", "Observability", "Parameter validation", "XGEN"]
draft: false
---

Most of the 36 defects in the third report, which arrived on 10 June, were options on agent-flow nodes. The summaries were mostly the same sentence: "the X function does not operate correctly." But opening the code and reproducing them one by one, two different families were mixed behind that sentence. Half were genuinely broken. Half were working exactly as specified. And the ones working correctly were the harder homework.

The tester's standard is what I wrote in Part 1. Change the setting, run it, and if there is no observable difference on screen, it is a defect. That standard sent us back through every node option.

## Broken options just needed fixing

'Max Rows' on the DB query node was only applying its value as a SQL LIMIT clause. If the user wrote their own LIMIT in the query, the setting was ignored entirely and over-fetching happened. Rather than manipulate the query, we changed it to always truncate the row count to the configured value just before returning results, so the ceiling holds regardless of what the query says.

'Include summary answer' on the web-search node had the search library putting the summary only into an auxiliary data area, never into the tool output the AI actually reads. Structurally, turning the option on could not change the answer. 'Response wait time' on the API call node kept waiting the full configured time again every time the agent re-called the same tool after a timeout, which to the user looked like loading that never ended. We changed it so a timed-out tool fails immediately on re-call, without an actual request. For this family, once you found the cause the fix was obvious.

## The options that worked were harder

'Show timestamps' on the format output node displays the timestamp of each iteration when there is an iteration record. But the test flow had no node producing iteration records, so with no data to show, turning it on did nothing. There was no defect in the code, but the test verdict was a defect. We chose to change the meaning of the option instead: turned on, it now always shows the output generation time at the top, whether or not iteration records exist.

'Include full output' on the email node had the same shape. In a flow with no internal processing data, sending produced the same result on or off. We changed it so that turning it on prepends an execution-information header carrying the send time and the original output length, making the difference between the two settings visible in any flow. It was not enough for the difference to exist; it had to be observable.

## We wrote down, in words, where an option's effect can be seen

Some options structurally cannot produce a difference in the final answer. 'Maximum results' only limits how many items the search tool collects; it has nothing to do with how many items the AI lists in its answer. The effect of 'include original content' can only be seen in the tool output log. For options like these, instead of changing behaviour we stated in the guidance text and in our reply where the effect can be confirmed — that turning on 'show intermediate steps' on the agent node, for instance, lets you see the difference in the tool output.

Sometimes the option's own description text was the cause of the defect. 'Allow multiple images' controls image passing along the workflow data path, while images attached directly in the chat window take a separate path and are unaffected by it. Without an explanation that the paths differ, a user has no choice but to conclude the option is broken.

## We swept every numeric parameter

We could have fixed only the nodes named in the report and stopped. But when the same kind of finding keeps coming, that is a problem with the population, not the sample. On 11 June we swept the numeric parameters of every node. We put ranges on parameters that had no valid-range constraint, filled in the valid range in the guidance text, and made sure out-of-range input is handled safely rather than erroring.

Along the way we also cleaned up the Korean and English wording of the parameter descriptions. That is when I learned that handling a defect on a single option ends in writing down, in sentences, "why this option exists, what it changes, and where you can see that change." If you cannot write it, the option is not ready to be given to a user.

An option does not exist as code; it exists as a difference the user can observe. The last part extends that standard to documentation and language — why manual defects made up a third of the total, and why we abandoned the PDF manual for a wiki.

---

**Previous →** [Rebuilding error handling so failure says it failed (Part 3)](/en/blog/gs-cert-journey-3-honest-errors)

**Next →** [The manual was part of the product: what three weeks of GS certification left behind (Part 5)](/en/blog/gs-cert-journey-5-manual-is-product)
