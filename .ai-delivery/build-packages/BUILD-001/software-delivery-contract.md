# Software Delivery Contract - BUILD-001

## Architecture Diagram

```text
workflow-contract.json
  -> requirement-contracts/<REQ>.json
      -> api-spec.json
      -> database-spec.json
      -> page-blueprints.json
      -> automation-assets.json
      -> .ai-delivery/build-result.json
      -> .ai-delivery/requirement-evidence.json
      -> QA result
      -> Release decision
```

## New Folder Structure

```text
BUILD-001/
  workflow-contract.json
  requirement-contracts/
    <REQ-ID>.json
  automation-assets.json
  business-requirements.json     # compatibility artifact
  ui-contract.json               # compatibility artifact
  automation-contract.json       # compatibility artifact
  requirement-scope.json         # compatibility artifact
  traceability-map.json          # compatibility artifact
```

## Requirement Contract Example

```json
{
  "id": "REQ-LEAVE-01",
  "title": "Apply (Leave Management)",
  "module": "Leave Management",
  "page": "Leave Workspace",
  "category": "Workflow",
  "workflowId": "Request-Approval Workflow",
  "priority": "HIGH",
  "acceptanceCriteria": [
    "Requester can perform \"Apply\" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail."
  ],
  "businessRules": [
    "fromDate must be before or equal to toDate",
    "requested amount must not exceed remaining balance/eligibility",
    "overlapping leave requests for the same requester are not allowed",
    "leave type must be active/configured",
    "attachment required when leave type requires supporting evidence",
    "weekend/holiday exclusion rule applies when calculating requested days/units",
    "approver cannot approve their own request",
    "requests cannot be submitted past the configured cutoff window"
  ],
  "source": "domain-intelligence",
  "workflow": {
    "name": "Request-Approval Workflow",
    "step": "Apply",
    "role": "Requester",
    "stateTransition": "Request-Approval Workflow -> Leave Management -> Apply"
  },
  "business": {
    "reason": "Supports the Request-Approval Workflow business pattern for \"Leave Management\": Apply is a mandatory lifecycle step - without it the module cannot transition to the next state.",
    "workflowStep": "Apply",
    "role": "Requester",
    "businessRules": [
      "fromDate must be before or equal to toDate",
      "requested amount must not exceed remaining balance/eligibility",
      "overlapping leave requests for the same requester are not allowed",
      "leave type must be active/configured",
      "attachment required when leave type requires supporting evidence",
      "weekend/holiday exclusion rule applies when calculating requested days/units",
      "approver cannot approve their own request",
      "requests cannot be submitted past the configured cutoff window"
    ],
    "validations": [
      "fromDate must be before or equal to toDate",
      "requested amount must not exceed remaining balance/eligibility",
      "overlapping leave requests for the same requester are not allowed",
      "leave type must be active/configured",
      "attachment required when leave type requires supporting evidence",
      "weekend/holiday exclusion rule applies when calculating requested days/units",
      "approver cannot approve their own request",
      "requests cannot be submitted past the configured cutoff window"
    ],
    "stateTransition": "Request-Approval Workflow -> Leave Management -> Apply",
    "acceptanceCriteria": "Requester can perform \"Apply\" only when business rules and validations for Leave are satisfied; result is reflected in status and audit trail.",
    "edgeCases": [
      "Apply attempted with missing/invalid required fields",
      "Apply attempted by a role without permission",
      "Apply attempted on a record in an incompatible status"
    ],
    "priority": "HIGH",
    "complexity": "LOW"
  },
  "ui": {
    "page": "Leave Workspace",
    "drawer": "Leave Management detail drawer",
    "form": "Apply form/actions",
    "fields": [
      "LeaveRequestId",
      "requesterId",
      "requesterName",
      "department",
      "approverId",
      "leaveType",
      "balanceRemaining",
      "fromDate",
      "toDate",
      "halfDay",
      "numberOfDays/Units",
      "reason",
      "attachment",
      "status",
      "approvalLevel",
      "approvedBy",
      "rejectedBy",
      "rejectionReason",
      "downstreamImpact",
      "createdAt",
      "updatedAt"
    ],
    "buttons": [
      "Apply",
      "Validate Balance/Eligibility",
      "Submit",
      "Manager Review",
      "Approve",
      "Reject",
      "Cancel",
      "Notify Requester",
      "Sync Downstream Impact",
      "Generate Report"
    ],
    "filters": [
      "Status",
      "Date Range",
      "Assigned Role",
      "Search by ID/Name"
    ],
    "table": "Leave List (sortable, filterable by status/role)",
    "states": [
      "Loading",
      "Empty",
      "Error",
      "Populated",
      "Submitting Action"
    ],
    "navigation": [
      "Entry from module sidebar",
      "Detail drawer opens from list row click",
      "Back to list from detail view"
    ],
    "components": [
      "Leave ManagementWorkspace",
      "Leave ManagementDetailDrawer",
      "Leave ManagementActionBar"
    ],
    "layout": [
      "Header/Filters",
      "Leave List/Table",
      "Leave Detail Drawer",
      "Action Bar",
      "Status Timeline"
    ],
    "template": "Modern HRMS Enterprise"
  },
  "automation": {
    "positiveTests": [
      "Apply succeeds end-to-end with valid data and an authorized role; status/audit trail updates correctly."
    ],
    "negativeTests": [
      "Apply is rejected when required fields are missing or invalid, with a clear error message."
    ],
    "validationTests": [
      "Each business validation listed for Leave Management is independently exercised against Apply."
    ],
    "permissionTests": [
      "Apply is rejected for any role not listed in this step's authorized roles."
    ],
    "workflowTests": [
      "Full lifecycle test: create -> Apply -> downstream state is consistent with the Request-Approval Workflow pattern."
    ],
    "apiTests": [
      "POST /leave-requests"
    ],
    "regressionTests": [
      "High - core lifecycle step, breaking this blocks the whole module"
    ],
    "performanceTests": [
      "Apply completes within accepted UX/API thresholds."
    ],
    "securityTests": [
      "Verify role-based access for Requester."
    ],
    "evidenceRequired": [
      "test result",
      "screenshot or trace",
      "requirement evidence entry"
    ],
    "coverageRules": [
      "REQ-LEAVE-01 must map to at least one test and one implementation file."
    ]
  },
  "release": {
    "impact": "High release impact; blocks release if incomplete.",
    "risk": "LOW",
    "rollbackStrategy": "Disable or roll back Leave Management Apply changes while preserving audit data.",
    "dependencies": [
      "LeaveRequest",
      "LeaveType",
      "LeaveBalance",
      "LeaveApproval",
      "LeavePolicy",
      "LeaveAuditLog"
    ],
    "blockingRules": [
      "Missing evidence blocks release"
    ],
    "qualityGateRules": [
      "All validation commands pass",
      "Requirement evidence exists",
      "No critical defects open"
    ],
    "releaseEvidence": [
      "build-result.json",
      "requirement-evidence.json",
      "qa-result.json"
    ]
  },
  "traceability": {
    "businessWorkflow": "Request-Approval Workflow",
    "workflowStep": "Apply",
    "uiComponents": [
      "Leave ManagementWorkspace",
      "Leave ManagementDetailDrawer",
      "Leave ManagementActionBar"
    ],
    "files": [],
    "apis": [
      "POST /leave-requests"
    ],
    "database": [
      "LeaveRequest",
      "LeaveType",
      "LeaveBalance",
      "LeaveApproval",
      "LeavePolicy",
      "LeaveAuditLog"
    ],
    "automationTests": [
      "Positive: Apply succeeds with valid data and authorized role",
      "Negative: Apply rejected with invalid data",
      "Access: Apply rejected for unauthorized role"
    ],
    "qaResults": [],
    "release": []
  },
  "evidence": {
    "requiredFiles": [
      ".ai-delivery/build-result.json",
      ".ai-delivery/requirement-evidence.json"
    ],
    "requiredFields": [
      "files",
      "components",
      "apis",
      "databaseEntities",
      "tests",
      "status"
    ],
    "status": "Pending until coding agent writes evidence."
  }
}
```

## Workflow Contract Example

```json
{
  "workflow": "Request-Approval Workflow",
  "firstStep": {
    "order": 1,
    "requirementId": "REQ-LEAVE-01",
    "step": "Apply",
    "role": "Requester",
    "stateTransition": "Start -> Apply",
    "permissions": [
      "Requester can execute Apply"
    ],
    "validations": [
      "fromDate must be before or equal to toDate",
      "requested amount must not exceed remaining balance/eligibility",
      "overlapping leave requests for the same requester are not allowed",
      "leave type must be active/configured",
      "attachment required when leave type requires supporting evidence",
      "weekend/holiday exclusion rule applies when calculating requested days/units",
      "approver cannot approve their own request",
      "requests cannot be submitted past the configured cutoff window"
    ],
    "apis": [
      "POST /leave-requests"
    ],
    "databaseEntities": [
      "LeaveRequest",
      "LeaveType",
      "LeaveBalance",
      "LeaveApproval",
      "LeavePolicy",
      "LeaveAuditLog"
    ],
    "automationCandidates": [
      "Positive: Apply succeeds with valid data and authorized role",
      "Negative: Apply rejected with invalid data",
      "Access: Apply rejected for unauthorized role"
    ],
    "evidence": [
      "Evidence for REQ-LEAVE-01 must map workflow, UI, API/data, tests, and release impact."
    ],
    "releaseImpact": "Blocks release if incomplete."
  },
  "evidenceRules": [
    "Every workflow step must have requirement evidence.",
    "Every workflow step must have at least one positive and one negative/permission test unless explicitly marked not automatable.",
    "Release cannot approve a workflow with missing HIGH priority requirement evidence."
  ]
}
```

## Migration Plan

1. BUILD-006 reads workflow-contract.json first.
2. Requirement contracts become the implementation and QA source of truth.
3. Existing business-requirements.json, ui-contract.json, automation-contract.json, requirement-scope.json, and traceability-map.json remain available as compatibility artifacts.
4. QA consumes automation-assets.json and requirement-contracts instead of recreating scenarios.
5. Release consumes requirement-contract release/evidence sections once build and QA evidence are written.

## Known Compatibility Risks

- Older agents may keep reading compatibility files first unless prompt.md is followed exactly.
- Existing saved BUILD-005 packages do not gain requirement-contracts until regenerated.
- Local Delivery Agent must support nested package paths for requirement-contracts, which this platform now writes.
