# Build Package - BUILD-001

Project: hrms
Scope: Employee Management (Pilot Build)
Branch: ai/build-001-employee-management
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerate
Target Agent: Codex

This folder is a versioned, agent-agnostic Build Package - hand `prompt.md` to
any coding agent (Claude Code, Codex, Cursor, ...) along with these files and
it has everything it needs without the platform regenerating anything.

## Contents
- `prompt.md` - the execution prompt. Start here.
- `thinking.md` - domain reasoning to do before writing code
- `business-context.md` - why this module exists, not just what it does
- `architecture.md`, `folder-structure.md`, `api-spec.json`, `database-spec.json` - system context
- `full-application-design.json`, `qa-design-coverage.md` - complete design context for QA verification
- `selected-template.json`, `design-system.json`, `page-blueprints.json`, `component-map.json` - UI contract
- `requirement-scope.json` - the exact requirement IDs in scope, deduplicated
- `build-contract.json` - allowed/forbidden paths, requirement IDs
- `validation-rules.json` - commands that must pass before this build is complete

## Expected output (written by the agent, not included here)
- `.ai-delivery/build-result.json`
- `.ai-delivery/requirement-evidence.json`
- `.ai-delivery/build-summary.md`
