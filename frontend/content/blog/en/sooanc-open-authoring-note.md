---
title: "Setting up a blog authoring workflow developers will actually use"
titleSeo: "A blog workflow developers will use"
description: "Letting developers publish from their own GitHub account without opening the main repository — lowering the cost of participation with Open Authoring."
date: "2026-07-14"
cover: /blog/sooanc-open-authoring-note.svg
thumb: /blog/sooanc-open-authoring-note-thumb.svg
author: "sooanc"
authorGithub: "sooanc"
category: "Tech Note"
tags: ["Blog", "Authoring", "Open Authoring"]
draft: false
---

## Running a blog and building the structure a blog runs on are different things

Run a corporate engineering blog long enough and you meet the same problem.

Developers want to write, but the maintainer cannot hand out repository access lightly. And the alternative — the maintainer taking drafts and committing on their behalf — does not last. As posts accumulate the maintainer becomes the bottleneck, and it gets steadily harder for developers to publish.

In the end the question was not "who writes" but "how easy is it to contribute."

## Keep the permissions, lower only the cost of participation

What we chose this time is Decap CMS's Open Authoring.

Open Authoring grants no additional access to the main repository. An author logs in with their own GitHub account, writes in their personal fork, and the system automatically opens a pull request against the original repository.

The maintainer reviews and merges the PR, exactly as before.

<figure style="margin:2.5rem 0">
<svg viewBox="0 0 380 560" width="100%" role="img" aria-label="Open Authoring flow: author → GitHub login → fork repository → write the post → pull request created → maintainer review and merge" xmlns="http://www.w3.org/2000/svg" style="max-width:360px;display:block;margin:0 auto;font-family:'Pretendard','Geist',system-ui,-apple-system,sans-serif">
<defs>
<linearGradient id="oaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7bff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient>
</defs>
<g fill="none" stroke="#c2cad8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M184 97 L190 103 L196 97"/><path d="M184 189 L190 195 L196 189"/><path d="M184 281 L190 287 L196 281"/><path d="M184 373 L190 379 L196 373"/><path d="M184 465 L190 471 L196 465"/>
</g>
<circle cx="190" cy="34" r="18" fill="url(#oaG)"/>
<circle cx="190" cy="31" r="3.2" fill="#fff"/><path d="M183.8 41 a6.2 6.2 0 0 0 12.4 0" fill="#fff"/>
<text x="190" y="70" text-anchor="middle" font-size="15.5" font-weight="700" fill="#16203a">Author</text>
<text x="190" y="86" text-anchor="middle" font-size="12" fill="#6b7688">Contributor</text>
<circle cx="190" cy="126" r="18" fill="#fff" stroke="#2f7bff" stroke-width="2"/>
<g fill="none" stroke="#2461d8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M192 120 h5 v12 h-5"/><path d="M183 126 h7"/><path d="M188 123 l3 3 l-3 3"/></g>
<text x="190" y="162" text-anchor="middle" font-size="15.5" font-weight="700" fill="#16203a">GitHub login</text>
<circle cx="190" cy="218" r="18" fill="#fff" stroke="#2f7bff" stroke-width="2"/>
<g fill="#2461d8" stroke="#2461d8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="190" cy="212" r="1.9" stroke="none"/><circle cx="184" cy="224" r="1.9" stroke="none"/><circle cx="196" cy="224" r="1.9" stroke="none"/><path d="M190 212 L184 224" fill="none"/><path d="M190 212 L196 224" fill="none"/></g>
<text x="190" y="254" text-anchor="middle" font-size="15.5" font-weight="700" fill="#16203a">Fork repository</text>
<text x="190" y="270" text-anchor="middle" font-size="12" fill="#6b7688">Personal fork</text>
<circle cx="190" cy="310" r="18" fill="#fff" stroke="#2f7bff" stroke-width="2"/>
<g stroke="#2461d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M186 316 l8 -8" fill="none"/><path d="M191 305 l4 4" fill="none"/><path d="M184 318 l1.6 -4 l2.6 2.6 z" fill="#2461d8" stroke="none"/></g>
<text x="190" y="346" text-anchor="middle" font-size="15.5" font-weight="700" fill="#16203a">Write the post</text>
<circle cx="190" cy="402" r="18" fill="#fff" stroke="#2f7bff" stroke-width="2"/>
<g fill="none" stroke="#2461d8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M184 396 h12"/><path d="M190 411 V401"/><path d="M186 405 L190 401 L194 405"/></g>
<text x="190" y="438" text-anchor="middle" font-size="15.5" font-weight="700" fill="#16203a">Pull request opened</text>
<text x="190" y="454" text-anchor="middle" font-size="12" fill="#6b7688">Created automatically upstream</text>
<circle cx="190" cy="494" r="18" fill="url(#oaG)"/>
<path d="M184 494 L188.5 499 L196 488" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<text x="190" y="530" text-anchor="middle" font-size="15.5" font-weight="700" fill="#16203a">Maintainer</text>
<text x="190" y="546" text-anchor="middle" font-size="12" fill="#6b7688">Review &amp; merge</text>
</svg>
</figure>

The way we operate stays the same, while contributors can publish without a separate access request.

Technically it is a simple feature. From an operations point of view it is a structure that secures permission management and content productivity at the same time.

---

## Leaving the author as a person, not a system

For an engineering blog, trust matters more than information.

Even with the same content, knowing who wrote it carries the context and the expertise along with it.

So every post also carries `authorGithub`.

Where that value exists, the view automatically links the GitHub profile and avatar, and search engines and AI services receive it as Person metadata.

That makes a post not just a Markdown document but a knowledge asset managed together with its author.

---

## More important than the technology is the operating structure

The purpose of this work was not to adopt a CMS.

The real purpose was to build a structure where content accumulates naturally without the maintainer having to step in.

An individual writes, the team reviews, deployment is automated, and the system manages the author's record.

The maintainer stops being the person who registers content on someone's behalf, and can focus on raising quality together.

---

## What is left in the end is culture

Technology only lowers the barrier to participation.

A blog where posts keep accumulating is not made by a system alone.

A culture has to settle in alongside it — collecting ideas so good ones do not disappear, treating review as a process of raising quality together rather than an approval gate, and letting authors leave a record under their own name.

Applying Open Authoring was less a case of bolting on a new feature than the first step in designing an operating structure where a corporate engineering blog accumulates individual records as organizational knowledge.
