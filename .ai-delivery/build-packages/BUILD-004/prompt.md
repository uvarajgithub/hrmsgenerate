# AI Software Delivery OS - Build Execution Prompt

Implement the attached Build Package.

## Build Context

Project: HRMS
Build ID: BUILD-004 (Pilot Build)
Scope: Leave Management
Target Agent: Claude Code
Branch: ai/build-004-leave-management
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerator

## Build Objective

Implement **only** the requirements included in this Build Package.
Never work outside the assigned scope.

---

## Read in this exact order

1. README.md
2. architecture.md
3. folder-structure.md
4. selected-template.json
5. design-system.json
6. api-spec.json
7. database-spec.json
8. page-blueprints.json
9. component-map.json
10. requirement-scope.json
11. build-contract.json
12. validation-rules.json

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

Implement every assigned Requirement ID (see requirement-scope.json - 48 requirements in scope).

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

1. Work only on branch `ai/build-004-leave-management`.
2. Commit all changes.
3. Use commit message: `BUILD-004: Leave Management implementation`
4. Push the branch and create or update a Pull Request.

Never commit directly to main.

---

## Build Result

Create `.ai-delivery/build-result.json`:

```json
{
  "buildId": "BUILD-004",
  "project": "HRMS",
  "scope": "Leave Management",
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
  "branch": "ai/build-004-leave-management",
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
