---
title: "Safely replacing a graph with the results of a SELECT (Part 10)"
titleSeo: "A SELECT into a graph, safely (Part 10)"
cover: "/blog/ontology-journey-10-rdb-ingest.svg"
thumb: "/blog/ontology-journey-10-rdb-ingest-thumb.svg"
description: "Using the database's types and primary keys as graph identity, and protecting full and incremental ingestion with RDF staging swaps and a composite cursor."
date: "2026-07-06"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "RDB", "Incremental ingestion"]
draft: false
---
> **Knowledge graph design · 10/10**

Registering database connections and running read-only SELECTs already existed. But turning a query result into an ontology meant exporting to CSV and going back through the file build path. Along the way, column types and primary- and foreign-key information got weaker, and every change in the operational data meant managing a new file snapshot.

If you use the types and keys the database already provides, there is no reason to run LLM extraction per row. What you do need is an ingestion contract that connects the same row back to its existing node exactly, and that does not leave the existing graph half-replaced when the source changes mid-read or a page fails.

So we moved the focus of DB integration from SQL execution to row identity and RDF snapshot replacement. URIs are determined by primary key, incremental range is fixed by a composite cursor pairing the primary key with a watermark (a modification timestamp or monotonically increasing column), and the existing RDF snapshot is replaced only after the staging graph is complete.

## We separated labels from identity

Putting a person's name or a product name in the URI makes the view easy to read. But two rows sharing a name collapse into one node, and when a name changes the same row becomes a new node. In a database, a row's identity is its primary key, not its display label.

A DB row URI is derived deterministically from connection, table, PK column, and the original PK value. The label is stored as a separate property.

```text
identity = connection + table + pk_column + pk_value
label    = the display column the user chose
```

The URI holds even when the label of the same PK changes, and two people with the same name get different URIs. `NULL` PKs and duplicate PKs are rejected before ingestion. Empty strings and whitespace are distinguished as original values, and an FK skips relationship creation only when it is `NULL`.

Take a product row with PK 42: it keeps the same URI even when its name changes. Reading that row again in an incremental query keeps the URI and replaces the values and outgoing relationships the row owns. If PK 42 later disappears from a full snapshot, the row from that source and the relationships pointing at it are removed together. Labels, incremental updates, and deletion follow different rules, but identity holds on the PK alone.

An FK is turned into a relationship only when it references an explicitly declared PK column, not the display name of the target table. If the reference target does not exist yet a placeholder node can be created, but it is not given a `sourceId` the way a real DB row is — otherwise a later snapshot swap would mistake it for a row that never existed.

## Preview is not a convenience, it is a schema contract

The user picks a registered DB connection and a read-only SELECT, and the preview shows column types, sample rows, and PK candidates. This is where the PK, label column, foreign keys, and incremental key are decided.

Only SELECT is allowed, and row counts and execution time are capped by operational settings. Incremental conditions are not injected by string substitution into the query; the original query is wrapped as a subquery. Values are bound, and only identifiers confirmed in the preview are permitted as column names.

Rows are not interpreted by a model. Python values and DB types are mapped to XML Schema (XSD) types, and instances and relationships are built from PKs and FKs. A small number of model calls may remain for label translation and summaries in the ontology schema (OWL), but the call count scales with the number of classes and properties, not with the number of rows.

## The RDF target graph is completed in a staging graph, then swapped

Writing the pages of a full SELECT straight into the production graph means new and old data get mixed together if the last page fails. Instead, every page is loaded into a per-source staging graph first.

Before loading, PK `NULL`s and duplicates across the full result are aggregated in the database. Each page accumulates in the staging graph, and when every page is done, a single SPARQL Update — the graph update language — performs the following:

1. Remove the rows and relationships this source previously created.
2. Insert the new snapshot from the staging graph into the production graph.
3. Write a completion marker.
4. Clean up the staging graph.

Existing outgoing relationships from rows whose values changed are replaced, and rows that disappeared from the SELECT — along with relationships pointing at them — are removed. Relationships from other sources toward rows that remain in the new snapshot, and entities owned by other sources, are preserved. An empty SELECT result is also a successful new snapshot, so the previous source data is deleted correctly.

If the same swap-confirmation request arrives again because a response was lost, the completion marker tells us whether the work is already done. Time spent modifying the production graph directly is limited to that final atomic swap.

What is atomically protected here is the RDF target graph inside Fuseki. The later step that finalizes PostgreSQL schema metadata is a different transactional domain. If several document workers run the finalizer at once, duplicate metadata rows remain possible, so we cannot call the whole ingest a single atomic transaction.

## Incremental runs use a `(watermark, PK)` composite cursor

We did not keep only one of the full and incremental paths. A full run rebuilds the current SELECT result as the baseline snapshot, so it can also clean up rows deleted at the source and stale relationships. The cost is that the larger the data, the more expensive it is to read everything and build a staging graph each time.

An incremental run reads only rows added or changed since the last cursor, lowering the everyday cost of keeping up to date. But if the database offers no deletion history or change log, deleted rows simply do not appear in the query result and cannot be known. So the incremental path replaces only the entities read in this run and does not delete rows it did not see. We kept both paths: incremental for cheap, frequent updates, and a full snapshot when deletions and accumulated drift need to be reconciled.

Using the modification timestamp alone as the cursor can drop rows when several share a timestamp value and fall across a page boundary. The incremental position is stored as a tuple of watermark and PK.

```sql
WHERE (watermark, pk) > (:last_watermark, :last_pk)
ORDER BY watermark, pk
```

Syntax differences between databases are handled by adapters, but the meaning is the same. The next page carries over both values from the last row. Only DB entities that actually arrived in this incremental run are replaced, and rows absent from a full snapshot are not deleted on a guess.

Job ownership carries an expiry. A worker takes a `pending` job with a conditional UPDATE, extends the expiry periodically, and updates state and cursor only when the ownership token matches. An expired job can be recovered by another worker, and a previous worker returning late is blocked by its expired token, so it cannot overwrite a completed state.

## Verification checked replacement semantics, not row counts

On an isolated real Fuseki graph we confirmed full replacement, value changes, deleted-row removal, preservation of relationships arriving from other sources, retry of an identical swap request, incremental replacement, upgrading the previous `sourceChunk` format, and empty snapshots. The frontend build and per-service static and unit verification also passed. This change has completed integration verification in an isolated environment and is not yet deployed to production.

Boundaries remain. The pages of a full SELECT are not bound into a single long-running transaction snapshot on the source database. If the source changes mid-run, a change in row count is detected, but a value replacement that keeps the same row count cannot be fully caught. In operation this needs a consistent read view, a window when changes are paused, or a snapshot SELECT provided by the database. Some DB adapters were verified only against official syntax and mock execution rather than a real server, and an end-to-end run passing through the whole service combination in one go has not yet been performed.

What this series implemented and verified extends as far as building graphs from documents, tables, and databases, tracing retrieval paths and evidence, and comparing retrieval configurations on a fixed question set. **CQ coverage — computing what percentage of a domain's full competency-question set can be answered — has not yet been implemented or verified.** Defining the concepts, relationships, and operations each question needs and checking them automatically against build results remains the next task.

Keeping questions from limiting the build's discovery scope while still bringing them back as the final evaluation criterion. That is the next step in a design that started with a document-first graph and ran through to an operable knowledge graph.

---
**Previous →** [Adapting extraction batch size to the model's limits](/en/blog/ontology-journey-9-adaptive-extraction)
**Start of the series →** [Why we took the questions out of the ontology build](/en/blog/ontology-journey-1-cq-to-document)
