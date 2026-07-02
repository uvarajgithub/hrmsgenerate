# Software Delivery Contract - FULL-HRMSC0F6

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
FULL-HRMSC0F6/
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
  "id": "REQ-HUMANRESOURCES-01",
  "title": "Create HumanResources Record (Human Resources)",
  "module": "Human Resources",
  "page": "HumanResources Workspace",
  "category": "Workflow",
  "workflowId": "Record-Lifecycle Workflow",
  "priority": "HIGH",
  "acceptanceCriteria": [
    "Owner can perform \"Create HumanResources Record\" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail."
  ],
  "businessRules": [
    "required fields must be present before submission",
    "status transitions must follow Draft -> Submitted -> Approved/Rejected -> Archived",
    "only the owner or an admin may edit a record while in Draft",
    "a rejected record requires a reason before the owner can resubmit"
  ],
  "source": "domain-intelligence",
  "workflow": {
    "name": "Record-Lifecycle Workflow",
    "step": "Create HumanResources Record",
    "role": "Owner",
    "stateTransition": "Record-Lifecycle Workflow -> Human Resources -> Create HumanResources Record"
  },
  "business": {
    "reason": "Supports the Record-Lifecycle Workflow business pattern for \"Human Resources\": Create HumanResources Record is a mandatory lifecycle step - without it the module cannot transition to the next state.",
    "workflowStep": "Create HumanResources Record",
    "role": "Owner",
    "businessRules": [
      "required fields must be present before submission",
      "status transitions must follow Draft -> Submitted -> Approved/Rejected -> Archived",
      "only the owner or an admin may edit a record while in Draft",
      "a rejected record requires a reason before the owner can resubmit"
    ],
    "validations": [
      "required fields must be present before submission",
      "status transitions must follow Draft -> Submitted -> Approved/Rejected -> Archived",
      "only the owner or an admin may edit a record while in Draft",
      "a rejected record requires a reason before the owner can resubmit"
    ],
    "stateTransition": "Record-Lifecycle Workflow -> Human Resources -> Create HumanResources Record",
    "acceptanceCriteria": "Owner can perform \"Create HumanResources Record\" only when business rules and validations for HumanResources are satisfied; result is reflected in status and audit trail.",
    "edgeCases": [
      "Create HumanResources Record attempted with missing/invalid required fields",
      "Create HumanResources Record attempted by a role without permission",
      "Create HumanResources Record attempted on a record in an incompatible status"
    ],
    "priority": "HIGH",
    "complexity": "LOW"
  },
  "ui": {
    "page": "HumanResources Workspace",
    "drawer": "Human Resources detail drawer",
    "form": "Create HumanResources Record form/actions",
    "fields": [
      "HumanResourcesId",
      "ownerId",
      "title",
      "description",
      "category",
      "status",
      "reviewedBy",
      "reviewComment",
      "tags",
      "attachments",
      "createdAt",
      "updatedAt"
    ],
    "buttons": [
      "Create HumanResources Record",
      "Edit HumanResources Record",
      "Submit HumanResources for Review",
      "Review HumanResources Record",
      "Approve HumanResources Record",
      "Reject HumanResources Record",
      "Archive HumanResources Record",
      "Audit Trail Capture",
      "Notify Stakeholders",
      "Generate HumanResources Report"
    ],
    "filters": [
      "Status",
      "Date Range",
      "Assigned Role",
      "Search by ID/Name"
    ],
    "table": "HumanResources List (sortable, filterable by status/role)",
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
      "Human ResourcesWorkspace",
      "Human ResourcesDetailDrawer",
      "Human ResourcesActionBar"
    ],
    "layout": [
      "Header/Filters",
      "HumanResources List/Table",
      "HumanResources Detail Drawer",
      "Action Bar",
      "Status Timeline"
    ],
    "template": "Not selected"
  },
  "automation": {
    "positiveTests": [
      "Create HumanResources Record succeeds end-to-end with valid data and an authorized role; status/audit trail updates correctly."
    ],
    "negativeTests": [
      "Create HumanResources Record is rejected when required fields are missing or invalid, with a clear error message."
    ],
    "validationTests": [
      "Each business validation listed for Human Resources is independently exercised against Create HumanResources Record."
    ],
    "permissionTests": [
      "Create HumanResources Record is rejected for any role not listed in this step's authorized roles."
    ],
    "workflowTests": [
      "Full lifecycle test: create -> Create HumanResources Record -> downstream state is consistent with the Record-Lifecycle Workflow pattern."
    ],
    "apiTests": [
      "POST /human-resourcess"
    ],
    "regressionTests": [
      "High - core lifecycle step, breaking this blocks the whole module"
    ],
    "performanceTests": [
      "Create HumanResources Record completes within accepted UX/API thresholds."
    ],
    "securityTests": [
      "Verify role-based access for Owner."
    ],
    "evidenceRequired": [
      "test result",
      "screenshot or trace",
      "requirement evidence entry"
    ],
    "coverageRules": [
      "REQ-HUMANRESOURCES-01 must map to at least one test and one implementation file."
    ]
  },
  "release": {
    "impact": "High release impact; blocks release if incomplete.",
    "risk": "LOW",
    "rollbackStrategy": "Disable or roll back Human Resources Create HumanResources Record changes while preserving audit data.",
    "dependencies": [
      "HumanResources",
      "HumanResourcesAuditLog"
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
    "businessWorkflow": "Record-Lifecycle Workflow",
    "workflowStep": "Create HumanResources Record",
    "uiComponents": [
      "Human ResourcesWorkspace",
      "Human ResourcesDetailDrawer",
      "Human ResourcesActionBar"
    ],
    "files": [],
    "apis": [
      "POST /human-resourcess"
    ],
    "database": [
      "HumanResources",
      "HumanResourcesAuditLog"
    ],
    "automationTests": [
      "Positive: Create HumanResources Record succeeds with valid data and authorized role",
      "Negative: Create HumanResources Record rejected with invalid data",
      "Access: Create HumanResources Record rejected for unauthorized role"
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
  "workflow": "Record-Lifecycle Workflow",
  "firstStep": {
    "order": 1,
    "requirementId": "REQ-HUMANRESOURCES-01",
    "step": "Create HumanResources Record",
    "role": "Owner",
    "stateTransition": "Start -> Create HumanResources Record",
    "permissions": [
      "Owner can execute Create HumanResources Record"
    ],
    "validations": [
      "required fields must be present before submission",
      "status transitions must follow Draft -> Submitted -> Approved/Rejected -> Archived",
      "only the owner or an admin may edit a record while in Draft",
      "a rejected record requires a reason before the owner can resubmit"
    ],
    "apis": [
      "POST /human-resourcess"
    ],
    "databaseEntities": [
      "HumanResources",
      "HumanResourcesAuditLog"
    ],
    "automationCandidates": [
      "Positive: Create HumanResources Record succeeds with valid data and authorized role",
      "Negative: Create HumanResources Record rejected with invalid data",
      "Access: Create HumanResources Record rejected for unauthorized role"
    ],
    "evidence": [
      "Evidence for REQ-HUMANRESOURCES-01 must map workflow, UI, API/data, tests, and release impact."
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
