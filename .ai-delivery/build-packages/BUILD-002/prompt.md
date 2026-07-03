# AI Software Delivery OS - Build Execution Prompt

Implement the attached Build Package.

## Build Context

Project: hrms
Build ID: BUILD-002 (Pilot Build)
Scope: Employee Management
Target Agent: Codex
Branch: ai/build-002-employee-management
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerate

## Build Objective

Implement **only** the requirements included in this Build Package.
Never work outside the assigned scope.

---

## Read in this exact order

1. README.md
2. thinking.md - reason about the domain before reading anything else
3. business-context.md - why this module exists, not just what it does
4. architecture.md
5. folder-structure.md
6. selected-template.json
7. design-system.json
8. api-spec.json
9. database-spec.json
10. full-application-design.json
11. qa-design-coverage.md
12. page-blueprints.json
13. component-map.json
14. requirement-scope.json
15. build-contract.json
16. validation-rules.json

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

Implement every assigned Requirement ID (see requirement-scope.json - 10 requirements in scope).

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
  "project": "hrms",
  "scope": "Employee Management",
  "status": "Completed | Partial | Blocked",
  "requirementsCovered": [],
  "requirementsRemaining": [],
  "filesChanged": [],
  "testsExecuted": [],
  "validationResult": {},
  "knownGaps": [],
  "warnings": [],
  "manualActions": [],
  "nextBuildSlice": "",
  "pullRequest": "",
  "branch": "ai/build-002-employee-management",
  "commitSha": ""
}
```

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
Result, Pull Request URL (if available), Remaining Work, Next Recommended Build Slice.

Only implement the assigned scope. Never continue into another module automatically.
