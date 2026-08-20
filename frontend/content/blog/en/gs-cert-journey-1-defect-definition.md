---
title: "80 defect reports in GS certification taught me what a defect actually is (Part 1)"
titleSeo: "What 80 defects taught me (Part 1)"
description: "Three weeks of GS certification testing produced 80 defects, but fewer than half were code bugs. The rest were behaviours a user could not confirm."
date: "2026-05-08"
cover: /blog/gs-cert-journey-1-defect-definition.svg
thumb: /blog/gs-cert-journey-1-defect-definition-thumb.svg
author: "유지수"
authorGithub: master0419
category: "Tech Note"
tags: ["GS Certification", "Quality", "XGEN", "Software testing", "Defect reports"]
draft: false
---

The first defect report arrived on 27 May. It listed 20 defects from GS certification testing of XGEN, our AI agent platform. A second report on 2 June added 24 more, a third on 10 June added 36, and within two weeks we had 80 defects in hand. The fix work ran a further week beyond that — about three weeks in total. But when I went through all 80 against the code, fewer than half were cases where the code actually misbehaved. The rest were items where "the code does what it was meant to, but the user has no way of confirming that."

This series is a record of how we read those 80 defects over those three weeks, and what code we changed. Part 1 is about the defect report itself, as a document.

## Fewer than half of the 80 were code bugs

The testing body (TTA) classifies every defect by quality characteristic. Counted that way, the 80 broke down as 41 functional suitability, 30 usability, 5 security, and 4 general requirements. On the numbers, functional defects look like half — but inside those 41, "the function is broken" and "the function works but does not look like it works" were mixed together.

Take the "maximum results" option on the web-search node. It limits how many items the search tool collects. Drop the value to 1, and the AI can still produce an answer covering several items, from that one collected result plus its own knowledge. The option worked exactly as specified, but to someone looking only at the answer, nothing had changed. The report recorded it as "the function does not operate correctly," and rather than argue the judgement, we decided to accept it. If there is no way on screen to confirm what an option did, then for the user that option may as well not exist.

## Testers do not look at code, they look at the screen

An obvious fact, but living it is different. A tester changes a setting, runs it, and observes the difference on screen. If no difference is observable, that is a defect. Explaining that the difference is in the internal logs, or that it is reflected in the tool output, does not change the judgement.

Once we accepted that standard, the fix direction became clear. Where an option was genuinely broken, fix it. Where it worked but was invisible, change the output so the difference shows. Where it still would not surface on screen, add guidance text saying where the effect can be confirmed. Part 4 covers that work in detail.

## Intended behaviour was still a defect without an explanation

A shared agent flow can only be deployed by whoever created it. An active schedule cannot be deleted, to prevent accidental removal. Both were policies we intended — and both were filed as defects, because pressing the button did nothing.

The testing body's reply was short: "If this is intended, show a message and document it in the manual." The existence of a policy and the communication of that policy to a user are two separate things. We changed it so that a user without deploy permission gets a warning when they press the button, and attempting to delete an active schedule now comes with an explanation of why. Eliminating clicks that are silently ignored turned out to be one of the recurring fix patterns of this certification.

## The test environment was part of the product too

The first two items in the third report were severity H. An answer to a question the user had never typed appeared in the chat, and unrecognizable strings were mixed into responses. The cause was not the code; it was the environment. Two sites sharing a database, Redis, and MinIO were colliding during migration.

There were more defects in the same vein. The document-search node failed because of a version mismatch between deployed pods, and user deletion failed because the test account could not be given superuser rights — a permission-design problem. The testing treated deployment configuration, account permissions, and infrastructure as one product alongside the application code. That view later led us to separate out-of-scope features by account permission, which Part 5 covers.

## A defect report is not a list of bugs

When three weeks had passed and all 80 items were closed as fixed, I read the defect reports again from the start. Outnumbering the failure reports were reports saying "the user cannot understand this behaviour." Success messages and error logs appearing on the same screen. Every failure reported in the same sentence. Options that produced the same result whether they were on or off.

A defect report is not a list of bugs. It is a list of the points where a user failed to understand the product. The next part covers the security defects — only five of the 80, the smallest group, but the ones that needed the deepest change — and in particular the process of replacing password hashing with argon2id on a system that was already running.

---

**Next →** [Replacing password hashing with argon2id on a live system (Part 2)](/en/blog/gs-cert-journey-2-password-argon2id)
