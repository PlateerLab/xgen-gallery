---
title: "Replacing password hashing with argon2id on a live system (Part 2)"
description: "A GS certification security defect meant replacing unsalted SHA-256 password storage with argon2id across the board. Here is the design that moved existing users over without a single interruption to login."
date: "2026-05-20"
cover: /blog/gs-cert-journey-2-password-argon2id.svg
author: "유지수"
authorGithub: master0419
category: "Tech Note"
tags: ["GS Certification", "Security", "argon2id", "Password hashing", "HSTS", "Login lockout"]
draft: false
---

On 12 June we replaced password storage with argon2id on a system that was under active testing. What the third defect report pointed out was exactly right: passwords were stored as a single unsalted SHA-256, which meant a rainbow table could recover the plaintext. Testers were logging in with accounts during that period, so login could not stop even once — and how to migrate existing users' hashes ended up being most of the actual design work.

Of the 80 defects across the whole GS certification, five were security. The smallest group, but the change that reached the lowest layer of the application.

## The missing-salt finding was correct

An unsalted one-way hash has two problems. Two users with the same password end up with the same hash value, and comparing against a precomputed hash dictionary — a rainbow table — recovers the plaintext. It was not that SHA-256 is a weak algorithm; the structure of using a fast general-purpose hash without a salt was the problem.

We chose argon2id as the replacement, keeping the argon2-cffi defaults as our parameters (m=65536, t=3, p=4, 16-byte salt, 32-byte hash). The output is stored as a single PHC string of the form `$argon2id$v=19$...`, and the fact that this string carries its own salt and parameters mattered in operation. There is no need for a separate salt column; parameters can be raised later with old and new rows coexisting in one column; and the gateway, written in Rust, can verify against the same string.

## We layered argon2id on top of the frontend's SHA-256

XGEN's frontend already hashed the plaintext with SHA-256 before sending it. We kept that. What the server receives is always a 64-character hex string, and the server layers a per-user salt and argon2id on top of it before storing. The server never sees plaintext, at any point.

That decision meant not a single line of client code changed, and we only had to document the contract clearly: the input to the hash function is not "plaintext" but "the SHA-256 the frontend sent." It did introduce something to be careful about. Feeding a value that is already argon2id-stored back through the hash function produces a double hash and breaks that login permanently. So the user-edit API branches on whether a new password was actually supplied — hash only then, otherwise keep the existing hash untouched.

## Existing users were upgraded at the moment of a successful login

Rows from before the migration still held an unsalted 64-character SHA-256 hex. We built a dual path: if the stored value matches the 64-character hex pattern, treat it as legacy; if it is a PHC string, verify with argon2id. The moment a legacy user logs in successfully, we build a fresh argon2id hash from the value just used to verify, and upgrade them on the spot.

At the same time we prepared a bulk migration script and converted the entire existing user base. Relying on login-time upgrade alone would leave rarely used accounts on legacy hashes indefinitely. After the conversion, users sharing a password no longer shared a hash value, and the tester's recheck confirmed that plaintext could no longer be traced.

## Five wrong attempts and the account locks for 30 minutes

Another defect in the same report was that no number of failed logins ever locked an account. We added a failure counter column (failed_login_count) and a lockout expiry (locked_until), and settled on a 30-minute lock after five consecutive failures. While locked, even the correct password is refused; after 30 minutes it clears automatically, or an administrator can clear it immediately.

Two things got attention in the implementation. The lockout expiry comparison runs on the database's NOW() rather than in the application, so the judgement does not wobble if the server and DB time zones drift apart. And an administrator's unlock resets the counter *and* writes an unlock event to the login log table, so there is an audit trail of who cleared it and when. On 16 June we added a column auto-creation migration as a safety net, so it also works in deployment environments that lack the new columns.

## Even a single header was a defect

The remaining security defects lived outside the application. The finding that HTTPS was served without an HSTS (Strict-Transport-Security) response header was addressed by applying all three options — max-age, includeSubDomains, preload — across both frontend and backend middleware. The testing body also mentioned that a missing preload option is a common defect point. The finding on the OpenSSH remote code execution vulnerability (regreSSHion) was handled by blocking SSH access to the server, and guest signup, which had no password-confirmation field, was brought in line with regular signup.

Five security defects were not five lines of code; they cut through the storage model, the authentication flow, and the infrastructure configuration respectively. And, interestingly, all five asked not whether a function "works" but *what it stores and what it refuses*. The next part goes the other way, to the most common pattern of all: making screens honest where failure had been looking like success.

---

**Previous →** [80 defect reports in GS certification taught me what a defect actually is (Part 1)](/en/blog/gs-cert-journey-1-defect-definition)

**Next →** [Rebuilding error handling so failure says it failed (Part 3)](/en/blog/gs-cert-journey-3-honest-errors)
