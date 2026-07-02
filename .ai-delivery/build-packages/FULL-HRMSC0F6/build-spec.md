# Build Spec - FULL-HRMSC0F6

Project: hrms
Scope: Full Application
Branch: ai/full-application-hrms
Target Agent: Codex

## What to build
Business workflow drives this build. UI contract and supporting UI requirements exist to expose and validate that workflow.

### Business Workflow Requirements
- REQ-HUMANRESOURCES-01: Create HumanResources Record (Human Resources) - Owner can perform "Create HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-02: Edit HumanResources Record (Human Resources) - Owner can perform "Edit HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-03: Submit HumanResources for Review (Human Resources) - Owner can perform "Submit HumanResources for Review" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-04: Review HumanResources Record (Human Resources) - Reviewer can perform "Review HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-05: Approve HumanResources Record (Human Resources) - Reviewer can perform "Approve HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-06: Reject HumanResources Record (Human Resources) - Reviewer can perform "Reject HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-07: Archive HumanResources Record (Human Resources) - Admin can perform "Archive HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-08: Audit Trail Capture (Human Resources) - System can perform "Audit Trail Capture" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-09: Notify Stakeholders (Human Resources) - System can perform "Notify Stakeholders" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-10: Generate HumanResources Report (Human Resources) - Admin can perform "Generate HumanResources Report" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.



### UI Contract Requirements


### Supporting UI Requirements
Fields, filters, tables, states, validations, and permissions are defined in requirement-scope.json and ui-contract.json.


## Domain-aware requirements (local Domain Intelligence Engine only (pattern matched: Record-Lifecycle Workflow))
Pattern matched: Record-Lifecycle Workflow - real Human Resources business behavior, not generic CRUD.
- REQ-HUMANRESOURCES-01: Create HumanResources Record (Human Resources) - Owner can perform "Create HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-02: Edit HumanResources Record (Human Resources) - Owner can perform "Edit HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-03: Submit HumanResources for Review (Human Resources) - Owner can perform "Submit HumanResources for Review" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-04: Review HumanResources Record (Human Resources) - Reviewer can perform "Review HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-05: Approve HumanResources Record (Human Resources) - Reviewer can perform "Approve HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-06: Reject HumanResources Record (Human Resources) - Reviewer can perform "Reject HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-07: Archive HumanResources Record (Human Resources) - Admin can perform "Archive HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-08: Audit Trail Capture (Human Resources) - System can perform "Audit Trail Capture" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-09: Notify Stakeholders (Human Resources) - System can perform "Notify Stakeholders" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- REQ-HUMANRESOURCES-10: Generate HumanResources Report (Human Resources) - Admin can perform "Generate HumanResources Report" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.

## Reuse existing project
This project already exists. Do not rebuild the shell.
- Reuse existing routing (src/routes)
- Reuse shared components (src/shared/ui)
- Reuse existing layouts and page shell
- Reuse the existing design system / theme tokens
- Reuse the existing API client (src/api)
- Reuse existing authentication
Only add files for the scope listed above.
