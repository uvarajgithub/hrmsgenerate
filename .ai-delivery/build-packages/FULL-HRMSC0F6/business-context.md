# Business Context - Human Resources

Project: hrms (Human Resources)
Scope: Full Application

## Why this module exists
Supports the Record-Lifecycle Workflow business pattern for "Human Resources": Create HumanResources Record is a mandatory lifecycle step - without it the module cannot transition to the next state.

## Real business behavior in scope (not generic CRUD)
- Create HumanResources Record (Human Resources): Owner can perform "Create HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Edit HumanResources Record (Human Resources): Owner can perform "Edit HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Submit HumanResources for Review (Human Resources): Owner can perform "Submit HumanResources for Review" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Review HumanResources Record (Human Resources): Reviewer can perform "Review HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Approve HumanResources Record (Human Resources): Reviewer can perform "Approve HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Reject HumanResources Record (Human Resources): Reviewer can perform "Reject HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Archive HumanResources Record (Human Resources): Admin can perform "Archive HumanResources Record" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Audit Trail Capture (Human Resources): System can perform "Audit Trail Capture" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Notify Stakeholders (Human Resources): System can perform "Notify Stakeholders" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.
- Generate HumanResources Report (Human Resources): Admin can perform "Generate HumanResources Report" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.

## Roles involved
Owner, Reviewer, Admin

## What happens downstream
Once implemented, requirements in this scope feed Development tracking (via `.ai-delivery/build-result.json`), then QA, then Release - see `requirement-scope.json`'s traceability for exact requirement IDs this build must account for.
