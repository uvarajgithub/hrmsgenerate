# Software Delivery Contract - BUILD-002

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
BUILD-002/
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
  "id": "REQ-EMPLOYEE-01",
  "title": "Create Employee Profile (Employee Management)",
  "module": "Employee Management",
  "page": "Employee Workspace",
  "category": "Workflow",
  "workflowId": "Entity-Record Management",
  "priority": "HIGH",
  "acceptanceCriteria": [
    "HR Staff / Record Owner can perform \"Create Employee Profile\" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail."
  ],
  "businessRules": [
    "employeeCode must be unique",
    "email must be valid and unique",
    "joiningDate must not be in the future",
    "managerId must reference an active Employee record",
    "required fields (name, department, email) must be present before activation"
  ],
  "source": "domain-intelligence",
  "workflow": {
    "name": "Entity-Record Management",
    "step": "Create Employee Profile",
    "role": "HR Staff / Record Owner",
    "stateTransition": "Entity-Record Management -> Employee Management -> Create Employee Profile"
  },
  "business": {
    "reason": "Supports the Entity-Record Management business pattern for \"Employee Management\": Create Employee Profile is a mandatory lifecycle step - without it the module cannot transition to the next state.",
    "workflowStep": "Create Employee Profile",
    "role": "HR Staff / Record Owner",
    "businessRules": [
      "employeeCode must be unique",
      "email must be valid and unique",
      "joiningDate must not be in the future",
      "managerId must reference an active Employee record",
      "required fields (name, department, email) must be present before activation"
    ],
    "validations": [
      "employeeCode must be unique",
      "email must be valid and unique",
      "joiningDate must not be in the future",
      "managerId must reference an active Employee record",
      "required fields (name, department, email) must be present before activation"
    ],
    "stateTransition": "Entity-Record Management -> Employee Management -> Create Employee Profile",
    "acceptanceCriteria": "HR Staff / Record Owner can perform \"Create Employee Profile\" only when business rules and validations for Employee are satisfied; result is reflected in status and audit trail.",
    "edgeCases": [
      "Create Employee Profile attempted with missing/invalid required fields",
      "Create Employee Profile attempted by a role without permission",
      "Create Employee Profile attempted on a record in an incompatible status"
    ],
    "priority": "HIGH",
    "complexity": "LOW"
  },
  "ui": {
    "page": "Employee Workspace",
    "drawer": "Employee Management detail drawer",
    "form": "Create Employee Profile form/actions",
    "fields": [
      "employeeCode",
      "employeeId",
      "firstName",
      "lastName",
      "fullName",
      "department",
      "designation",
      "jobTitle",
      "managerId",
      "managerName",
      "joiningDate",
      "employmentType",
      "email",
      "phone",
      "address",
      "documentIds",
      "profilePhoto",
      "status",
      "createdAt",
      "updatedAt"
    ],
    "buttons": [
      "Create Employee Profile",
      "Verify & Validate Employee Details",
      "Submit for Manager Approval",
      "Manager Reviews Employee Record",
      "Approve Employee Record",
      "Activate Employee",
      "Update Employee Information",
      "Deactivate / Offboard Employee",
      "Audit Log Capture",
      "Generate Employee Reports"
    ],
    "filters": [
      "Status",
      "Date Range",
      "Assigned Role",
      "Search by ID/Name"
    ],
    "table": "Employee List (sortable, filterable by status/role)",
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
      "Employee ManagementWorkspace",
      "Employee ManagementDetailDrawer",
      "Employee ManagementActionBar"
    ],
    "layout": [
      "Header/Filters",
      "Employee List/Table",
      "Employee Detail Drawer",
      "Action Bar",
      "Status Timeline"
    ],
    "template": "Modern HRMS Enterprise"
  },
  "automation": {
    "positiveTests": [
      "Create Employee Profile succeeds end-to-end with valid data and an authorized role; status/audit trail updates correctly."
    ],
    "negativeTests": [
      "Create Employee Profile is rejected when required fields are missing or invalid, with a clear error message."
    ],
    "validationTests": [
      "Each business validation listed for Employee Management is independently exercised against Create Employee Profile."
    ],
    "permissionTests": [
      "Create Employee Profile is rejected for any role not listed in this step's authorized roles."
    ],
    "workflowTests": [
      "Full lifecycle test: create -> Create Employee Profile -> downstream state is consistent with the Entity-Record Management pattern."
    ],
    "apiTests": [
      "POST /employees"
    ],
    "regressionTests": [
      "High - core lifecycle step, breaking this blocks the whole module"
    ],
    "performanceTests": [
      "Create Employee Profile completes within accepted UX/API thresholds."
    ],
    "securityTests": [
      "Verify role-based access for HR Staff / Record Owner."
    ],
    "evidenceRequired": [
      "test result",
      "screenshot or trace",
      "requirement evidence entry"
    ],
    "coverageRules": [
      "REQ-EMPLOYEE-01 must map to at least one test and one implementation file."
    ]
  },
  "release": {
    "impact": "High release impact; blocks release if incomplete.",
    "risk": "LOW",
    "rollbackStrategy": "Disable or roll back Employee Management Create Employee Profile changes while preserving audit data.",
    "dependencies": [
      "Employee",
      "EmployeeDocument",
      "EmployeeHistory"
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
    "businessWorkflow": "Entity-Record Management",
    "workflowStep": "Create Employee Profile",
    "uiComponents": [
      "Employee ManagementWorkspace",
      "Employee ManagementDetailDrawer",
      "Employee ManagementActionBar"
    ],
    "files": [],
    "apis": [
      "POST /employees"
    ],
    "database": [
      "Employee",
      "EmployeeDocument",
      "EmployeeHistory"
    ],
    "automationTests": [
      "Positive: Create Employee Profile succeeds with valid data and authorized role",
      "Negative: Create Employee Profile rejected with invalid data",
      "Access: Create Employee Profile rejected for unauthorized role"
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
  "workflow": "Entity-Record Management",
  "firstStep": {
    "order": 1,
    "requirementId": "REQ-EMPLOYEE-01",
    "step": "Create Employee Profile",
    "role": "HR Staff / Record Owner",
    "stateTransition": "Start -> Create Employee Profile",
    "permissions": [
      "HR Staff / Record Owner can execute Create Employee Profile"
    ],
    "validations": [
      "employeeCode must be unique",
      "email must be valid and unique",
      "joiningDate must not be in the future",
      "managerId must reference an active Employee record",
      "required fields (name, department, email) must be present before activation"
    ],
    "apis": [
      "POST /employees"
    ],
    "databaseEntities": [
      "Employee",
      "EmployeeDocument",
      "EmployeeHistory"
    ],
    "automationCandidates": [
      "Positive: Create Employee Profile succeeds with valid data and authorized role",
      "Negative: Create Employee Profile rejected with invalid data",
      "Access: Create Employee Profile rejected for unauthorized role"
    ],
    "evidence": [
      "Evidence for REQ-EMPLOYEE-01 must map workflow, UI, API/data, tests, and release impact."
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
