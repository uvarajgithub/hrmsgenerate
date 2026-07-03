# Thinking - BUILD-001

Before writing code, reason about why Employee Management needs to exist and how it actually works for hrms, not just what CRUD screens to draw.

## Domain reasoning
This module matched the **Entity-Record Management** business pattern - meaning it isn't a flat record store, it's a real workflow with state transitions, role-based authorization, and business rules that can reject a request, not just save it.

## What "done" looks like for this scope
- REQ-EMPLOYEE-01: Create Employee Profile (Employee Management) - because HR Staff / Record Owner can perform "Create Employee Profile" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-02: Verify & Validate Employee Details (Employee Management) - because HR Staff / Record Owner can perform "Verify & Validate Employee Details" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-03: Submit for Manager Approval (Employee Management) - because HR Staff / Record Owner can perform "Submit for Manager Approval" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-04: Manager Reviews Employee Record (Employee Management) - because Manager / Supervisor can perform "Manager Reviews Employee Record" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-05: Approve Employee Record (Employee Management) - because Manager / Supervisor can perform "Approve Employee Record" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-06: Activate Employee (Employee Management) - because Admin can perform "Activate Employee" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-07: Update Employee Information (Employee Management) - because HR Staff / Record Owner can perform "Update Employee Information" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-08: Deactivate / Offboard Employee (Employee Management) - because Admin can perform "Deactivate / Offboard Employee" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-09: Audit Log Capture (Employee Management) - because System can perform "Audit Log Capture" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-10: Generate Employee Reports (Employee Management) - because Admin can perform "Generate Employee Reports" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.

## Questions to resolve before implementing, not after
- Which of the validations in `validation-rules.json` are enforced client-side vs server-side?
- Which requirement IDs in `requirement-scope.json` share state (e.g. approving one record affects a balance on another)?
- Does anything in `api-spec.json` assume an entity in `database-spec.json` that doesn't exist yet elsewhere in the codebase?

Do not start writing files until these are answered from the specs in this package - guessing here is exactly what produces generic CRUD instead of working software.
