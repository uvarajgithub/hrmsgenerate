# AI Software Delivery OS - Build Execution Prompt

Implement the attached Build Package.

## Build Context

Project: HRMS
Build ID: BUILD-002 (Pilot Build)
Scope: Employee Management
Target Agent: Codex
Branch: ai/build-002-employee-management
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerate
Build Package Path: .ai-delivery/build-packages/BUILD-002

## Build Objective

Implement **only** the requirements included in this Build Package.
Never work outside the assigned scope.

---

## Workspace Setup

If the repository is not present locally, clone it first:

```bash
git clone https://github.com/uvarajgithub/hrmsgenerate
```

Then checkout or create the required branch:

```bash
git checkout ai/build-002-employee-management || git checkout -b ai/build-002-employee-management
```

Install dependencies if they are missing:

```bash
npm install
```

Environment rules:
- Do not invent production secrets.
- If required environment variables are missing, create or update `.env.example` with the required keys.
- Use local/mock configuration when real services are unavailable.
- Document any missing external service, credential, database, or API dependency in `.ai-delivery/build-result.json` under `manualActions` and `warnings`.

---

## Read in this exact order

1. README.md
2. software-delivery-contract.md - understand the BUILD-006 contract architecture
3. workflow-contract.json - master business workflow contract
4. requirement-contracts/*.json - single source of truth per requirement
5. automation-assets.json - generated automation assets, not a QA afterthought
6. thinking.md - reason about the domain before writing code
7. business-context.md - why this module exists, not just what it does
8. architecture.md
9. folder-structure.md
10. api-spec.json
11. database-spec.json
12. page-blueprints.json
13. component-map.json
14. selected-template.json
15. design-system.json
16. business-requirements.json / ui-contract.json / automation-contract.json - compatibility only
17. requirement-scope.json / traceability-map.json - compatibility only
18. build-contract.json
19. validation-rules.json

These files are the source of truth.

---

## Implementation Rules

Follow **build-contract.json** exactly.

Respect:
- Allowed paths
- Forbidden paths
- Requirement IDs
- Module boundaries
- Architecture rules
- API ownership
- Database ownership

Do NOT:
- Modify unrelated modules.
- Create generic placeholder pages.
- Replace the existing application shell.
- Invent folder structures.
- Modify shared components unless explicitly allowed.
- Change API contracts.
- Change database ownership.

If implementation requires violating any rule: STOP. Report it as a Change Request.

---

## Implementation

Implement: UI, Components, Business logic, API integration, Validation, Workflow,
State management, Error handling, Loading states, Empty states, Permission checks,
Audit behaviour.

Implement in this order:
1. Workflow from workflow-contract.json
2. Requirement contracts from requirement-contracts/*.json
3. API/database/page blueprint details
4. Automation assets from automation-assets.json
5. Compatibility files only when older tooling needs them

Implement every assigned Requirement ID (see requirement-scope.json - 10 requirements in scope: 10 platform/UI/application requirements + 10 business workflow requirements).

---

## Quality

Run every command defined in validation-rules.json. If available:
- npm run lint
- npm run typecheck
- npm run test
- npm run build

Fix implementation errors introduced by this build.

---

## Status Rules

Use `Completed` only when every scoped Requirement ID is implemented, validated, and included in `requirementsCovered`.

Use `Partial` when some scoped Requirement IDs are implemented but any requirement remains incomplete, untested, or not evidenced.

Use `Blocked` only when implementation cannot continue because of missing contract data, missing dependency access, unavailable credentials, repository problems, or a required Change Request.

Never put a Requirement ID in `requirementsCovered` unless the code, test/evidence, and validation for that requirement are actually present.

---

## Git Workflow

The Build Package itself should already be saved at `.ai-delivery/build-packages/BUILD-002`. Do not
move or rewrite that package unless you are updating delivery evidence.

1. Work only on branch `ai/build-002-employee-management`.
2. Commit all changes.
3. Use commit message: `BUILD-002: Employee Management implementation`
4. Push the branch and create or update a Pull Request.

Never commit directly to main.

---

## Build Result

Create `.ai-delivery/build-result.json`:

```json
{
  "buildId": "BUILD-002",
  "project": "HRMS",
  "scope": "Employee Management",
  "status": "Completed | Partial | Blocked",
  "requirementsCovered": [],
  "requirementsRemaining": [],
  "filesChanged": [],
  "testsExecuted": [],
  "validationResult": {},
  "localPreviewUrl": "",
  "localPreviewCommand": "",
  "localPreviewStatus": "Running | Not Available | Not Started",
  "knownGaps": [],
  "warnings": [],
  "manualActions": [],
  "nextBuildSlice": "",
  "pullRequest": "",
  "branch": "ai/build-002-employee-management",
  "commitSha": ""
}
```

The platform watches this file. Every Requirement ID listed in
`requirementsCovered` is automatically moved to DEV_COMPLETED on the Build,
Development, and Requirements boards. Put only genuinely implemented
requirements there; put unfinished IDs in `requirementsRemaining`.

If the application can be viewed locally, start or verify the dev server and set
`localPreviewStatus` to `Running`, `localPreviewCommand` to the command used,
and `localPreviewUrl` to the real URL, for example `http://localhost:5173/`.

---

## Requirement Traceability

Generate `.ai-delivery/requirement-evidence.json` mapping every Requirement ID to:
Files, Components, APIs, Database entities, Tests, status, evidence, and gaps.

Use this schema for each requirement:

```json
{
  "REQ-ID": {
    "status": "implemented | tested | failed | blocked",
    "files": [],
    "components": [],
    "apis": [],
    "databaseEntities": [],
    "tests": [],
    "evidence": "",
    "gaps": []
  }
}
```

Example: REQ-101 -> LeaveForm.tsx, LeaveService.ts, POST /leave, Leave table, LeaveForm.spec.ts

---

## QA Test Mind Handoff

The generated application is the test producer. QA Test Mind / AI Delivery Studio is the independent validator.

Produce QA-consumable evidence:
- `.ai-delivery/build-result.json`
- `.ai-delivery/requirement-evidence.json`
- `.ai-delivery/build-summary.md`
- `test-results/` when generated
- `coverage/` when generated
- `playwright-report/` when generated

Do not mark QA as approved from inside the generated app. Only provide evidence. QA Test Mind consumes the evidence, verifies coverage, creates defects if needed, and decides release readiness.

---

## Build Summary

Generate `.ai-delivery/build-summary.md` with: scope completed, requirements implemented,
files created, files modified, tests executed, known issues, risks, recommended next Build ID.

---

## Final Output

Return: Build Status, Requirements Completed, Files Changed, Tests Executed, Validation
Result, Local Preview URL (if the built app can be viewed locally), Pull Request URL
(if available), Remaining Work, Next Recommended Build Slice.

Only implement the assigned scope. Never continue into another module automatically.
