# Build Spec - BUILD-002 (Pilot Build)

Project: HRMS
Scope: Employee Management
Branch: ai/build-002-employee-management
Target Agent: Codex

## What to build
Business workflow drives this build. UI contract and supporting UI requirements exist to expose and validate that workflow.

### Business Workflow Requirements
- REQ-EMPLOYEE-01: Create Employee Profile (Employee Management) - HR Staff / Record Owner can perform "Create Employee Profile" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-02: Verify & Validate Employee Details (Employee Management) - HR Staff / Record Owner can perform "Verify & Validate Employee Details" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-03: Submit for Manager Approval (Employee Management) - HR Staff / Record Owner can perform "Submit for Manager Approval" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-04: Manager Reviews Employee Record (Employee Management) - Manager / Supervisor can perform "Manager Reviews Employee Record" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-05: Approve Employee Record (Employee Management) - Manager / Supervisor can perform "Approve Employee Record" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-06: Activate Employee (Employee Management) - Admin can perform "Activate Employee" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-07: Update Employee Information (Employee Management) - HR Staff / Record Owner can perform "Update Employee Information" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-08: Deactivate / Offboard Employee (Employee Management) - Admin can perform "Deactivate / Offboard Employee" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-09: Audit Log Capture (Employee Management) - System can perform "Audit Log Capture" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-10: Generate Employee Reports (Employee Management) - Admin can perform "Generate Employee Reports" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.



### UI Contract Requirements


### Supporting UI Requirements
Fields, filters, tables, states, validations, and permissions are defined in requirement-scope.json and ui-contract.json.


## Domain-aware requirements (local Domain Intelligence Engine only (pattern matched: Entity-Record Management))
Pattern matched: Entity-Record Management - real Employee Management business behavior, not generic CRUD.
- REQ-EMPLOYEE-01: Create Employee Profile (Employee Management) - HR Staff / Record Owner can perform "Create Employee Profile" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-02: Verify & Validate Employee Details (Employee Management) - HR Staff / Record Owner can perform "Verify & Validate Employee Details" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-03: Submit for Manager Approval (Employee Management) - HR Staff / Record Owner can perform "Submit for Manager Approval" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-04: Manager Reviews Employee Record (Employee Management) - Manager / Supervisor can perform "Manager Reviews Employee Record" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-05: Approve Employee Record (Employee Management) - Manager / Supervisor can perform "Approve Employee Record" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-06: Activate Employee (Employee Management) - Admin can perform "Activate Employee" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-07: Update Employee Information (Employee Management) - HR Staff / Record Owner can perform "Update Employee Information" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-08: Deactivate / Offboard Employee (Employee Management) - Admin can perform "Deactivate / Offboard Employee" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-09: Audit Log Capture (Employee Management) - System can perform "Audit Log Capture" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.
- REQ-EMPLOYEE-10: Generate Employee Reports (Employee Management) - Admin can perform "Generate Employee Reports" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.

## Reuse existing project
This project already exists. Do not rebuild the shell.
- Reuse existing routing (src/routes)
- Reuse shared components (src/shared/ui)
- Reuse existing layouts and page shell
- Reuse the existing design system / theme tokens
- Reuse the existing API client (src/api)
- Reuse existing authentication
Only add files for the scope listed above.
