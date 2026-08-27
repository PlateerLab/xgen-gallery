---
title: "URIs built from names merged two people into one (Part 10)"
titleSeo: "Identity, not the display label"
cover: "/blog/ontology-journey-10-rdb-ingest.svg"
thumb: "/blog/ontology-journey-10-rdb-ingest-thumb.svg"
description: "We used the database's types and keys directly. Identifiers made from display names merge namesakes and split renamed rows."
date: "2026-07-06"
author: "김진수"
authorGithub: "jinsoo96"
category: "Tech Note"
tags: ["Ontology", "RDB", "Incremental indexing"]
draft: false
---

**Turning database query results into an ontology meant exporting to CSV and running the file build path again, and column types and key information weakened along the way. Once we decided to read directly, the first thing we hit was not extraction but identity. An identifier built from a person's name merges namesakes and turns a renamed person into someone else.**

---

## We were discarding what we already had and re-inferring it

Database connection registration and read-only queries already existed.

Turning those results into an ontology meant exporting to CSV and running the file build path again.

Things were lost on that path. Column types, primary keys, and foreign key information weaken. CSV is all strings, so types have to be re-inferred and key columns re-determined. Every change in production data meant managing another file snapshot.

**We were discarding what the database already told us exactly, and then re-inferring it.**

With types and keys available there is no reason to call a model per row. So the focus of the integration moved from running queries to **row identity and snapshot replacement**.

Connecting two systems, matching one side's output format to the other's input format is fastest. What falls out of that conversion surfaces later. Usually **what falls out is structural information**, and restoring it downstream costs more than the conversion saved.

## A readable identifier merged two different rows into one node

Turning a row into a node needs an identifier. Using a person's name or a product name reads well on screen.

Two things break.

Two rows sharing a name merge into one node. And when a name changes, the same row becomes a new node.

```text
name as identity   two namesakes → one node        same person renamed → two nodes
PK as identity     two namesakes → two nodes       same person renamed → one node
```

**In a database, a row's identity is the primary key, not the display label.** A label is a human-readable description of that row, and it can change.

So a row identifier is built deterministically from connection, table, primary key column, and the original primary key value. The label is stored as a separate property.

```text
identity = connection + table + pk_column + pk_value
label    = the display column the user picked
```

A product row with primary key 42 keeps the same identifier when its name changes. Read it again in an incremental query and the identifier holds while the values it owns and its outgoing relations are replaced. If primary key 42 later disappears from a full snapshot, that source's row and the relations pointing at it are removed together.

**Labels, incremental updates, and deletion use different rules while identity stays single.** That is why we used the primary key.

Null and duplicate primary keys are rejected before load. Empty strings and whitespace are distinguished as original values, and a foreign key skips relation creation only when null.

Foreign keys become relations only when they reference an explicit primary key column rather than a target table's display name. If the referenced target does not exist yet a placeholder node may be created, but without the source marking a real row carries, so a later snapshot replacement does not mistake it for a row that never existed.

Choosing identifiers, readability is an easy criterion. The only question an identifier must answer is **"are this and that the same thing".** The human reading problem belongs to the label.

## We did not build the preview as a convenience feature

The user picks a registered connection and a read-only query, then confirms column types, sample rows, and primary key candidates in a preview.

We did not treat that screen as a convenience check. **The primary key, label column, foreign keys, and incremental key chosen there become the load contract.**

Only read constructs are allowed, and row counts and execution time are limited by operational settings. Rather than string-substituting incremental conditions into the query, the original is wrapped as a subquery. Values are bound, and only identifiers confirmed in the preview are permitted as column names.

Rows are not interpreted by a model. Python values and database types map to XML Schema types, and primary and foreign keys build instances and relations. A small number of model calls may remain for schema label translation and summaries, but **the call count scales with class and property counts, not row counts.**

## Writing pages directly left a half-changed graph on failure

A full query result is read in several pages.

Writing each page into the production graph as it arrives is the natural approach. Fail on the last page and **you are left with a graph mixing new and old data**, with no way to tell where the boundary is.

So every page loads first into a per-source temporary graph. Before loading, null and duplicate primary keys across the whole result are aggregated in the database.

When every page finishes, one graph update statement handles four things.

```text
1  remove the rows and relations this source created previously
2  insert the temporary graph's new snapshot into the production graph
3  record a completion marker
4  clean up the temporary graph
```

Outgoing relations from rows whose values changed are replaced, and rows that disappeared from the query, along with relations pointing at them, are removed. **Relations from other sources toward rows still present in the new snapshot, and entities owned by other sources, are preserved.**

An empty query result is treated as a successful new snapshot, so the previous source data is deleted properly. Distinguishing "no result" from "failed" is the same distinction we made fixing silent failures in Part 9.

If the same commit request arrives again due to a lost response, the completion marker decides whether the work is already done. Direct modification of the production graph is confined to that final replacement window.

## The scope we could call atomic was narrower than we thought

Having built this, we thought we could say the load was atomic.

The boundary needed redrawing.

The atomically protected scope reaches **the target graph inside the graph store**. The subsequent step that finalises PostgreSQL schema metadata is a different transactional domain.

If several workers run the finalisation stage concurrently, duplicate metadata rows remain possible. So **we cannot call the whole load a single atomic transaction.**

When talking about transaction boundaries you have to say which store you mean. The moment two stores are involved the guarantee that word carries changes, while the sentence uses the same word.

## A watermark-only cursor leaks rows at page boundaries

We did not keep only one of full and incremental execution.

A full run rebuilds the current query result as the baseline snapshot, so it can clean up rows deleted at the source and stale relations. The cost of reading everything and building a temporary graph grows with the data.

An incremental run reads only rows added or changed after the last cursor. But if the database provides no deletion history, **rows that disappeared and therefore do not appear in the result are unknowable.** So the incremental path replaces only the entities read this time and does not delete rows it did not see.

Frequent low-cost updates use incremental; reconciling deletions and accumulated drift runs a full snapshot. We kept both paths.

The incremental cursor had a trap too. Using the modification timestamp alone means **rows sharing that timestamp across a page boundary can be lost.** Fetch only rows greater than the last timestamp read and the remainder straddling that instant disappears.

We store the incremental position as a tuple of watermark and primary key.

```sql
WHERE (watermark, pk) > (:last_watermark, :last_pk)
ORDER BY watermark, pk
```

Per-database syntax differences are handled by adapters while the meaning stays the same. The next page carries both values from the last row.

Job ownership has an expiry. Workers claim pending jobs with a conditional update, extend the expiry periodically, and update state and cursor only when the ownership token matches. Expired jobs can be recovered by another worker, and a late-returning previous worker is blocked by its expired token and cannot overwrite a completed state.

A sort key that is not unique leaks or duplicates data at page boundaries. Binding one unique value into the sort key when adding pagination heads off this whole class of bug.

## Verification looked at the meaning of the replacement, not row counts

In an isolated real graph store we confirmed full replacement, value changes, removal of deleted rows, preservation of incoming relations from other sources, retry of an identical commit request, incremental replacement, upgrade of the previous provenance format, and empty snapshots. Frontend builds and per-service verification also passed.

This change completed integration verification in an isolated environment and is **not yet deployed to production.**

The remaining boundaries are worth writing down. We do not bind the several pages of a full query into one long-running transaction snapshot on the source database. If the source changes mid-run we detect row count changes but **cannot fully detect value replacements that preserve the row count.** Production needs a consistent read view, a quiet window, or a snapshot query provided by the database.

Some adapters were verified against official syntax and mock execution rather than a real server, and a full end-to-end pass across the service combination has not yet been run.

## Across ten parts something was always quietly disappearing

Closing the series, the ten problems sat at different layers and kept the same shape.

```text
1   concepts outside the question list never entered the graph
2   reducing context kept the answer's evidence from reaching synthesis
3   Korean documents were filtered as non-natural-language before extraction
4   healthy classes whose relations weren't built yet were auto-deleted
5   different tables were merged as similar concepts
6   truncated responses were recorded as success as empty results
7   rows sharing a timestamp were lost at a page boundary
```

Every time something vanished, and every time the system reported normal. How we found what vanished was mostly the same too: not from a number but from **opening the artifact itself.** Counting classes, opening the graph view, following the execution record.

**The hard part of building a knowledge graph was not deciding what to put in but noticing what had quietly dropped out.**

And one thing remains undone.

In Part 1 we took questions out of the build input and left them on the evaluation side. But **computing what percentage of a domain's competency questions can be answered is neither implemented nor verified.** It means defining the concepts, relations, and operations each question needs and automatically reconciling them against build results.

Keeping questions from limiting the build's scope of discovery while making sure they come back as the final evaluation criterion. That is the other half of what we half-did in Part 1, and the next task this series leaves behind.

---

**Previous →** [The job reported success and the graph was empty (Part 9)](/en/blog/ontology-journey-9-adaptive-extraction)

**Start of series →** [The questions were deciding the scope of the answers (Part 1)](/en/blog/ontology-journey-1-cq-to-document)
