# Build Package - BUILD-001

Project: hrms
Scope: Leave Management (Pilot Build)
Branch: ai/build-001-leave-management
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerate
Package Path: .ai-delivery/build-packages/BUILD-001
Target Agent: Codex

This folder is a versioned, agent-agnostic Build Package - hand `prompt.md` to
any coding agent (Claude Code, Codex, Cursor, ...) along with these files and
it has everything it needs without the platform regenerating anything.

When this package is saved from the Build UI, the Local Delivery Agent writes it
to `.ai-delivery/build-packages/BUILD-001` and automatically commits/pushes that package when the
workspace has a clean Git index and an `origin` remote. If repository evidence
is missing, finish Environment Setup before handing the package to a coding
agent.

## Contents
- `prompt.md` - the execution prompt. Start here.
- `software-delivery-contract.md` - architecture, folder structure, examples, migration plan, and compatibility risks
- `workflow-contract.json` - master business workflow contract
- `requirement-contracts/*.json` - single source of truth per requirement
- `thinking.md` - domain reasoning to do before writing code
- `business-context.md` - why this module exists, not just what it does
- `architecture.md`, `folder-structure.md`, `api-spec.json`, `database-spec.json` - system context
- `automation-assets.json` - Playwright/API/page-object/fixture/mock/seed/Postman/test-data metadata
- `business-requirements.json`, `ui-contract.json`, `automation-contract.json` - compatibility artifacts
- `selected-template.json`, `design-system.json`, `page-blueprints.json`, `component-map.json` - UI contract
- `requirement-scope.json` - compatibility scope artifact; requirement contracts own detailed traceability
- `build-contract.json` - allowed/forbidden paths, requirement IDs
- `validation-rules.json` - commands that must pass before this build is complete

## Expected output (written by the agent, not included here)
- `.ai-delivery/build-result.json`
- `.ai-delivery/requirement-evidence.json`
- `.ai-delivery/build-summary.md`
