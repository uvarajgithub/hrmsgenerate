# Thinking - BUILD-001

Before writing code, reason about why Leave Management needs to exist and how it actually works for hrms, not just what CRUD screens to draw.

## Domain reasoning
This module matched the **Request-Approval Workflow** business pattern - meaning it isn't a flat record store, it's a real workflow with state transitions, role-based authorization, and business rules that can reject a request, not just save it.

## What "done" looks like for this scope
- REQ-0673: Leave Management Overview - Feature: Open Leave Management Overview - because Feature requirement "Open Leave Management Overview" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0674: Leave Management Overview - Feature: Review Leave Management workspace context - because Feature requirement "Review Leave Management workspace context" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0675: Leave Management Overview - Feature: Manage apply leave journey - because Feature requirement "Manage apply leave journey" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0676: Leave Management Overview - Feature: Track Leave Management status, owner, priority, and recent activity - because Feature requirement "Track Leave Management status, owner, priority, and recent activity" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0677: Leave Management Overview - Function: Open Leave Management - because Function requirement "Open Leave Management" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0678: Leave Management Overview - Function: Start Apply Leave - because Function requirement "Start Apply Leave" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0679: Leave Management Overview - Function: Enter details - because Function requirement "Enter details" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0680: Leave Management Overview - Function: Submit - because Function requirement "Submit" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0681: Leave Management Overview - Function: Create Leave Management - because Function requirement "Create Leave Management" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0682: Leave Management Overview - Function: Update Leave Management - because Function requirement "Update Leave Management" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0683: Leave Management Overview - Function: Submit Leave Management for review - because Function requirement "Submit Leave Management for review" is visible or functionally represented under Leave Management / Leave Management Overview.
- REQ-0684: Leave Management Overview - Function: Approve or reject Leave Management - because Function requirement "Approve or reject Leave Management" is visible or functionally represented under Leave Management / Leave Management Overview.

## Questions to resolve before implementing, not after
- Which of the validations in `validation-rules.json` are enforced client-side vs server-side?
- Which requirement IDs in `requirement-scope.json` share state (e.g. approving one record affects a balance on another)?
- Does anything in `api-spec.json` assume an entity in `database-spec.json` that doesn't exist yet elsewhere in the codebase?

Do not start writing files until these are answered from the specs in this package - guessing here is exactly what produces generic CRUD instead of working software.
