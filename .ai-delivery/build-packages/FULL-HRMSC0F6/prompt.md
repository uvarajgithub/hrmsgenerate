# AI Software Delivery OS - Build Execution Prompt

Implement the attached Build Package.

## Build Context

Project: hrms
Build ID: FULL-HRMSC0F6
Scope: Full Application
Target Agent: Codex
Branch: ai/full-application-hrms
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerate
Build Package Path: .ai-delivery/build-packages/FULL-HRMSC0F6

## Build Objective

Implement **only** the requirements included in this Build Package.
Never work outside the assigned scope.

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

Implement every assigned Requirement ID (see requirement-scope.json - 222 requirements in scope).

---

## Quality

Run every command defined in validation-rules.json. If available:
- npm run lint
- npm run typecheck
- npm run test
- npm run build

Fix implementation errors introduced by this build.

---

## Git Workflow

The Build Package itself should already be saved at `.ai-delivery/build-packages/FULL-HRMSC0F6`. Do not
move or rewrite that package unless you are updating delivery evidence.

1. Work only on branch `ai/full-application-hrms`.
2. Commit all changes.
3. Use commit message: `FULL-HRMSC0F6: Full Application implementation`
4. Push the branch and create or update a Pull Request.

Never commit directly to main.

---

## Build Result

Create `.ai-delivery/build-result.json`:

```json
{
  "buildId": "FULL-HRMSC0F6",
  "project": "hrms",
  "scope": "Full Application",
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
  "branch": "ai/full-application-hrms",
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
Files, Components, APIs, Database entities, Tests.

Example: REQ-101 -> LeaveForm.tsx, LeaveService.ts, POST /leave, Leave table, LeaveForm.spec.ts

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
