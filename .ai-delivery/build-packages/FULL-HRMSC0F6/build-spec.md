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

- REQ-0075: Employee Management Overview - Function: Open Employee Management
- REQ-0076: Employee Management Overview - Function: Start Employee Onboarding
- REQ-0077: Employee Management Overview - Function: Enter details
- REQ-0078: Employee Management Overview - Function: Submit
- REQ-0079: Employee Management Overview - Function: Create Employee Management
- REQ-0080: Employee Management Overview - Function: Update Employee Management
- REQ-0081: Employee Management Overview - Function: Submit Employee Management for review
- REQ-0082: Employee Management Overview - Function: Approve or reject Employee Management
- REQ-0083: Employee Management Overview - Function: Export Employee Management evidence
- REQ-0084: Employee Management Overview - Function: Search and filter Employee Management
- REQ-0411: Attendance Management Overview - Function: Open Attendance Management
- REQ-0412: Attendance Management Overview - Function: Start Mark Attendance
- REQ-0415: Attendance Management Overview - Function: Create Attendance Management
- REQ-0416: Attendance Management Overview - Function: Update Attendance Management
- REQ-0417: Attendance Management Overview - Function: Submit Attendance Management for review
- REQ-0418: Attendance Management Overview - Function: Approve or reject Attendance Management
- REQ-0419: Attendance Management Overview - Function: Export Attendance Management evidence
- REQ-0420: Attendance Management Overview - Function: Search and filter Attendance Management
- REQ-0747: Leave Management Overview - Function: Open Leave Management
- REQ-0748: Leave Management Overview - Function: Start Apply Leave
- REQ-0751: Leave Management Overview - Function: Create Leave Management
- REQ-0752: Leave Management Overview - Function: Update Leave Management
- REQ-0753: Leave Management Overview - Function: Submit Leave Management for review
- REQ-0754: Leave Management Overview - Function: Approve or reject Leave Management
- REQ-0755: Leave Management Overview - Function: Export Leave Management evidence
- REQ-0756: Leave Management Overview - Function: Search and filter Leave Management

### UI Contract Requirements
- Employee Management Overview: 31 requirement(s)
- Employee Management List: 1 requirement(s)
- Employee Management Details: 1 requirement(s)
- Employee Management Create/Edit: 1 requirement(s)
- Employee Management Workflow: 1 requirement(s)
- Employee Management Reports: 1 requirement(s)
- Employee Management Settings: 1 requirement(s)
- Employee Onboarding: 1 requirement(s)
- Attendance Management Overview: 31 requirement(s)
- Attendance Management List: 1 requirement(s)
- Attendance Management Details: 1 requirement(s)
- Attendance Management Create/Edit: 1 requirement(s)
- Attendance Management Workflow: 1 requirement(s)
- Attendance Management Reports: 1 requirement(s)
- Attendance Management Settings: 1 requirement(s)
- Mark Attendance: 1 requirement(s)
- Leave Management Overview: 31 requirement(s)
- Leave Management List: 1 requirement(s)
- Leave Management Details: 1 requirement(s)
- Leave Management Create/Edit: 1 requirement(s)
- Leave Management Workflow: 1 requirement(s)
- Leave Management Reports: 1 requirement(s)
- Leave Management Settings: 1 requirement(s)

### Supporting UI Requirements
Fields, filters, tables, states, validations, and permissions are defined in requirement-scope.json and ui-contract.json.

...and 152 more deduplicated requirements (see requirement-scope.json).

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
