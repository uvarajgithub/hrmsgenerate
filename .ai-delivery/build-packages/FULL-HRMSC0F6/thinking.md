# Thinking - FULL-HRMSC0F6

Before writing code, reason about why Human Resources needs to exist and how it actually works for hrms, not just what CRUD screens to draw.

## Domain reasoning
This module matched the **Record-Lifecycle Workflow** business pattern - meaning it isn't a flat record store, it's a real workflow with state transitions, role-based authorization, and business rules that can reject a request, not just save it.

## What "done" looks like for this scope


## Questions to resolve before implementing, not after
- Which of the validations in `validation-rules.json` are enforced client-side vs server-side?
- Which requirement IDs in `requirement-scope.json` share state (e.g. approving one record affects a balance on another)?
- Does anything in `api-spec.json` assume an entity in `database-spec.json` that doesn't exist yet elsewhere in the codebase?

Do not start writing files until these are answered from the specs in this package - guessing here is exactly what produces generic CRUD instead of working software.
