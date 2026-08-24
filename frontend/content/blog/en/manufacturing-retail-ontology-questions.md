---
title: "Turning scattered enterprise data into knowledge an AI can actually use"
titleSeo: "Connecting enterprise data into AI knowledge"
description: "Questions from a manufacturing and retail company evaluating an ontology-based AI platform — extracting a graph from documents, connecting the RDB, where public LLMs draw the data boundary, how often knowledge needs refreshing, and where to start."
date: "2026-02-18"
cover: /blog/manufacturing-retail-ontology-questions.svg
thumb: /blog/manufacturing-retail-ontology-questions-thumb.svg
author: "Plateer AI Labs"
category: "Industry Note"
kicker: "From an ontology-based AI platform evaluation in manufacturing and retail"
tags: ["Enterprise AI", "Ontology", "Knowledge graph", "RDB", "Manufacturing & retail", "Agentic AI"]
gated: true
draft: false
faq:
  - q: "If we feed in our documents, does the ontology build itself?"
    a: "XGEN analyzes documents and data so an LLM can infer the key entities and relationships and assemble a knowledge graph. You are not limited to accepting what is generated — users can review and edit nodes and relationships directly, and a domain glossary can be applied to keep terminology consistent."
  - q: "Can data already sitting in an RDB be connected to the knowledge graph?"
    a: "Yes. XGEN can analyze database schemas and data characteristics to infer the semantic relationships between tables and data, then connect them to the ontology. That said, for long-running systems, converting all source data directly is not always the best move — building on reasonably curated data such as a DW or data mart is often more efficient."
  - q: "If we use a public LLM, does our enterprise data leave with it?"
    a: "When XGEN calls an external LLM, it can be designed to pass only the context needed to answer the question rather than the entire database or knowledge base. Where using external models is restricted outright, running an open-source LLM on internal infrastructure is a viable private option."
  - q: "Our data keeps changing — do we have to rebuild the knowledge graph every time?"
    a: "No. XGEN continues to improve reindexing and synchronization for keeping knowledge current, and not every dataset needs to be reflected in real time. Separate the areas that genuinely require real-time freshness from those where periodic refreshes suffice, and define the level of freshness the AI task actually needs."
  - q: "Where does the time actually go in an ontology project?"
    a: "More than the platform itself, the scope is driven by deciding which data to use, connecting existing data and systems, and curating it to the level required. Rather than completing an enterprise-wide ontology up front, start with a business area where the value is clear and expand step by step."
  - q: "Once the ontology exists, what changes for the agent?"
    a: "Where conventional RAG excels at finding relevant documents and answering from them, an agent working on an ontology gains a foundation for using the relationships and context between pieces of information. If customer, product, purchase, and service are connected, the agent can navigate those relationships instead of looking each one up in isolation."
---

Customer data lives in the CRM, sales data in the commerce system, and production and logistics data in their own operational systems. Add service history and product documentation on top, and a company ends up holding a great deal of information that is managed under different structures and different standards.

People come to understand how all of it connects through experience on the job.

But what about AI?

**"What did this customer buy, which services did they use, and what did they do afterward?"**

Answering that may take more than searching across several databases. It calls for **a structure in which the AI can understand what customers, products, sales, and services actually mean to one another**.

Plateer AI Labs discussed the feasibility of applying an **ontology-based AI service platform** with a company in manufacturing and retail.

The questions that came up on site were less about the technology itself and more about how to apply it in practice.

> **Can we build a knowledge graph from our existing documents alone?**
> **Can data accumulated in the RDB be connected to an ontology as well?**
> **If our data is complex and uncurated, where do we even start?**
> **If we use a public LLM, does our internal data go out with it?**
> **How should constantly changing data be reflected in the knowledge graph?**

This Field Report walks through those questions and how XGEN connects enterprise data into knowledge an AI can work with.

---

## If we feed in our documents, does the ontology build itself?

This is one of the first questions to come up when a company starts evaluating ontologies.

If people have to analyze every document by hand to define entities and relationships, the build takes considerable time.

XGEN analyzes documents and data so that **an LLM can infer the key entities and relationships and assemble a knowledge graph**.

You are not limited to using what is generated as-is — users can review and edit nodes and relationships directly where needed.

Management practices such as a **domain glossary**, which keeps the terms and expressions a company uses consistent, can be applied alongside it.

There is an important premise, though.

The point of an ontology is not the feature of having an AI draw the picture for you.

The point is **turning the concepts and relationships scattered through a company's data and documents into a knowledge structure the AI can use**.

---

## Can data in the RDB be connected to a knowledge graph?

A large share of a company's core data lives not in documents but in relational databases.

Customers, products, orders, sales, and services are the typical examples.

XGEN can analyze database schemas and data characteristics to **infer the semantic relationships between tables and data and connect them to the ontology**.

Real enterprise data, however, is not always neatly organized.

The longer a system has been in operation, the more likely it is that table structures are complex, or that data with the same meaning is managed under different standards.

In that kind of environment, converting all of the source data directly into an ontology is not always the best move.

Depending on the situation, building the knowledge structure on reasonably curated data — a DW or a data mart — can be more efficient.

In the end, an ontology build hinges on deciding **not only "can the AI connect this automatically?" but also "which data are we connecting it from?"**

---

## If we use a public LLM, does the enterprise data go out with it?

This question never fails to come up when connecting enterprise data to AI.

When XGEN calls an external LLM, it can be designed so that **only the context needed to answer the question is passed**, rather than the entire database or the whole knowledge base.

But data security policy differs from company to company.

Where the use of external models is restricted outright, a private environment — an open-source LLM stood up on the company's own infrastructure — is worth considering.

So when connecting an ontology to an LLM, the design has to cover more than model performance:

**which data, to which model, and within what boundary**

has to be designed alongside it.

This is why data and models are hard to think about separately in an enterprise AI platform.

---

## The data keeps changing — does the knowledge graph have to be rebuilt every time?

Once you account for real operations, this matters.

A company's customer, sales, service, and logistics data changes continuously.

So rather than treating a knowledge graph as a fixed artifact once it is built, you also have to consider **how the knowledge will be kept current as the source data changes**.

XGEN continues to advance its capabilities for keeping knowledge fresh, including reindexing and synchronization as data changes.

That said, not every dataset has to be reflected in real time.

Depending on the nature of the work and how the data will be used, you can separate the areas that need real-time freshness from those where a periodic refresh is enough.

For data used in analysis or strategy work, for instance, aligning with the existing refresh cycle of the DW can be a practical choice.

What matters is **not the technically fastest synchronization, but defining the level of freshness that the AI task in question actually needs**.

---

## Where does the time go in an ontology project?

Installing a platform and connecting a company's knowledge are two different problems.

In real projects, the scope is shaped less by the platform itself than by **defining which data will be used, connecting existing data and systems, and curating it to the level required**.

Trying to connect data across several business areas at once drives up project complexity quickly.

So instead of aiming to complete an enterprise-wide ontology from the outset, it is worth considering **starting in a business area where the value is clear and expanding knowledge and agents step by step**.

Build the relationship between data and knowledge in that first area, apply a real agent to it, then extend the validated structure to other areas of the business.

The goal is not to build an ontology for its own sake — what matters is **expanding while confirming that the connected knowledge is actually being used in real AI work**.

---

## Once the ontology exists, what changes for the agent?

This is where it all comes together.

Companies do not build ontologies to admire a handsome knowledge graph.

Where conventional RAG excels at finding relevant documents and answering from them, an agent working on an ontology gains **a foundation for using the relationships and context between pieces of information**.

If customer, product, purchase, and service are connected to one another, the agent does not have to look each one up in isolation — it can navigate those relationships to find what it needs.

That becomes a foundation to extend into personalization, analysis, work assistance, and other AI initiatives down the line.

Which is why XGEN treats the ontology not as a standalone data project, but as one part of an AI structure that runs

**Data → Knowledge → Agent → Business**

---

## Field Report

What stood out most from this engagement was that **there were far more questions about "how do we actually turn our data into an ontology?" than about "can an ontology be built?"**

The reality inside a company is not documents alone.

There is an RDB, there is a DW, there is legacy data accumulated over years, and new data is being generated at this very moment.

An enterprise ontology is therefore hard to complete by adopting a single technology.

> **Which data will be connected,**
> **which relationships will be defined,**
> **how often it will be refreshed,**
> **and which agent will use that knowledge.**

These questions have to be worked through together.

XGEN is developing its ontology capabilities toward connecting a company's scattered documents and data into knowledge, and building an environment where agents can understand and act on the company's context on top of it.

If your company has accumulated plenty of data but the AI still cannot understand the **relationships between it**, it may be time to look at where an ontology fits.
