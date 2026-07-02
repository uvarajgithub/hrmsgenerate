# Build Spec - BUILD-001 (Pilot Build)

Project: hrms
Scope: Leave Management
Branch: ai/build-001-leave-management
Target Agent: Codex

## What to build
Business workflow drives this build. UI contract and supporting UI requirements exist to expose and validate that workflow.

### Business Workflow Requirements
- REQ-LEAVE-01: Apply (Leave Management) - Requester can perform "Apply" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-02: Validate Balance/Eligibility (Leave Management) - System can perform "Validate Balance/Eligibility" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-03: Submit (Leave Management) - Requester can perform "Submit" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-04: Manager Review (Leave Management) - Approver can perform "Manager Review" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-05: Approve (Leave Management) - Approver can perform "Approve" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-06: Reject (Leave Management) - Approver can perform "Reject" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-07: Cancel (Leave Management) - Requester can perform "Cancel" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-08: Notify Requester (Leave Management) - System can perform "Notify Requester" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-09: Sync Downstream Impact (Leave Management) - System can perform "Sync Downstream Impact" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-10: Generate Report (Leave Management) - Admin can perform "Generate Report" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.

- REQ-0677: Leave Management Overview - Function: Open Leave Management
- REQ-0678: Leave Management Overview - Function: Start Apply Leave
- REQ-0679: Leave Management Overview - Function: Enter details
- REQ-0680: Leave Management Overview - Function: Submit
- REQ-0681: Leave Management Overview - Function: Create Leave Management
- REQ-0682: Leave Management Overview - Function: Update Leave Management
- REQ-0683: Leave Management Overview - Function: Submit Leave Management for review
- REQ-0684: Leave Management Overview - Function: Approve or reject Leave Management
- REQ-0685: Leave Management Overview - Function: Export Leave Management evidence
- REQ-0686: Leave Management Overview - Function: Search and filter Leave Management
- REQ-0719: Leave Management List - Function: Open Leave Management
- REQ-0720: Leave Management List - Function: Start Apply Leave
- REQ-0721: Leave Management List - Function: Enter details
- REQ-0722: Leave Management List - Function: Submit
- REQ-0723: Leave Management List - Function: Create Leave Management
- REQ-0724: Leave Management List - Function: Update Leave Management
- REQ-0725: Leave Management List - Function: Submit Leave Management for review
- REQ-0726: Leave Management List - Function: Approve or reject Leave Management
- REQ-0727: Leave Management List - Function: Export Leave Management evidence
- REQ-0728: Leave Management List - Function: Search and filter Leave Management
- REQ-0761: Leave Management Details - Function: Open Leave Management
- REQ-0762: Leave Management Details - Function: Start Apply Leave
- REQ-0763: Leave Management Details - Function: Enter details
- REQ-0764: Leave Management Details - Function: Submit
- REQ-0765: Leave Management Details - Function: Create Leave Management
- REQ-0766: Leave Management Details - Function: Update Leave Management
- REQ-0767: Leave Management Details - Function: Submit Leave Management for review
- REQ-0768: Leave Management Details - Function: Approve or reject Leave Management
- REQ-0769: Leave Management Details - Function: Export Leave Management evidence
- REQ-0770: Leave Management Details - Function: Search and filter Leave Management
- REQ-0803: Leave Management Create/Edit - Function: Open Leave Management
- REQ-0804: Leave Management Create/Edit - Function: Start Apply Leave
- REQ-0805: Leave Management Create/Edit - Function: Enter details
- REQ-0806: Leave Management Create/Edit - Function: Submit
- REQ-0807: Leave Management Create/Edit - Function: Create Leave Management
- REQ-0808: Leave Management Create/Edit - Function: Update Leave Management
- REQ-0809: Leave Management Create/Edit - Function: Submit Leave Management for review
- REQ-0810: Leave Management Create/Edit - Function: Approve or reject Leave Management
- REQ-0811: Leave Management Create/Edit - Function: Export Leave Management evidence
- REQ-0812: Leave Management Create/Edit - Function: Search and filter Leave Management
- REQ-0845: Leave Management Workflow - Function: Open Leave Management
- REQ-0846: Leave Management Workflow - Function: Start Apply Leave
- REQ-0847: Leave Management Workflow - Function: Enter details
- REQ-0848: Leave Management Workflow - Function: Submit
- REQ-0849: Leave Management Workflow - Function: Create Leave Management
- REQ-0850: Leave Management Workflow - Function: Update Leave Management
- REQ-0851: Leave Management Workflow - Function: Submit Leave Management for review
- REQ-0852: Leave Management Workflow - Function: Approve or reject Leave Management
- REQ-0853: Leave Management Workflow - Function: Export Leave Management evidence
- REQ-0854: Leave Management Workflow - Function: Search and filter Leave Management
- REQ-0887: Leave Management Reports - Function: Open Leave Management
- REQ-0888: Leave Management Reports - Function: Start Apply Leave
- REQ-0889: Leave Management Reports - Function: Enter details
- REQ-0890: Leave Management Reports - Function: Submit
- REQ-0891: Leave Management Reports - Function: Create Leave Management
- REQ-0892: Leave Management Reports - Function: Update Leave Management
- REQ-0893: Leave Management Reports - Function: Submit Leave Management for review
- REQ-0894: Leave Management Reports - Function: Approve or reject Leave Management
- REQ-0895: Leave Management Reports - Function: Export Leave Management evidence
- REQ-0896: Leave Management Reports - Function: Search and filter Leave Management
- REQ-0929: Leave Management Settings - Function: Open Leave Management
- REQ-0930: Leave Management Settings - Function: Start Apply Leave
- REQ-0931: Leave Management Settings - Function: Enter details
- REQ-0932: Leave Management Settings - Function: Submit
- REQ-0933: Leave Management Settings - Function: Create Leave Management
- REQ-0934: Leave Management Settings - Function: Update Leave Management
- REQ-0935: Leave Management Settings - Function: Submit Leave Management for review
- REQ-0936: Leave Management Settings - Function: Approve or reject Leave Management
- REQ-0937: Leave Management Settings - Function: Export Leave Management evidence
- REQ-0938: Leave Management Settings - Function: Search and filter Leave Management

### UI Contract Requirements
- Leave Management Overview: 31 requirement(s)
- Leave Management List: 31 requirement(s)
- Leave Management Details: 31 requirement(s)
- Leave Management Create/Edit: 31 requirement(s)
- Leave Management Workflow: 31 requirement(s)
- Leave Management Reports: 31 requirement(s)
- Leave Management Settings: 16 requirement(s)

### Supporting UI Requirements
Fields, filters, tables, states, validations, and permissions are defined in requirement-scope.json and ui-contract.json.

...and 218 more scoped requirements (see requirement-scope.json).

## Domain-aware requirements (local Domain Intelligence Engine only (pattern matched: Request-Approval Workflow))
Pattern matched: Request-Approval Workflow - real Leave Management business behavior, not generic CRUD.
- REQ-LEAVE-01: Apply (Leave Management) - Requester can perform "Apply" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-02: Validate Balance/Eligibility (Leave Management) - System can perform "Validate Balance/Eligibility" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-03: Submit (Leave Management) - Requester can perform "Submit" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-04: Manager Review (Leave Management) - Approver can perform "Manager Review" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-05: Approve (Leave Management) - Approver can perform "Approve" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-06: Reject (Leave Management) - Approver can perform "Reject" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-07: Cancel (Leave Management) - Requester can perform "Cancel" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-08: Notify Requester (Leave Management) - System can perform "Notify Requester" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-09: Sync Downstream Impact (Leave Management) - System can perform "Sync Downstream Impact" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.
- REQ-LEAVE-10: Generate Report (Leave Management) - Admin can perform "Generate Report" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.

## Reuse existing project
This project already exists. Do not rebuild the shell.
- Reuse existing routing (src/routes)
- Reuse shared components (src/shared/ui)
- Reuse existing layouts and page shell
- Reuse the existing design system / theme tokens
- Reuse the existing API client (src/api)
- Reuse existing authentication
Only add files for the scope listed above.
