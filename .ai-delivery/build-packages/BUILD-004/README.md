# Build Package - BUILD-004

Project: HRMS
Scope: Leave Management (Pilot Build)
Branch: ai/build-004-leave-management
Repository: GitHub - https://github.com/uvarajgithub/hrmsgenerator
Target Agent: Claude Code

This folder is a versioned, agent-agnostic Build Package - hand `prompt.md` to
any coding agent (Claude Code, Codex, Cursor, ...) along with these files and
it has everything it needs without the platform regenerating anything.

## Contents
- `prompt.md` - the execution prompt. Start here.
- `architecture.md`, `folder-structure.md`, `api-spec.json`, `database-spec.json` - system context
- `selected-template.json`, `design-system.json`, `page-blueprints.json`, `component-map.json` - UI contract
- `requirement-scope.json` - the exact requirement IDs in scope, deduplicated
- `build-contract.json` - allowed/forbidden paths, requirement IDs
- `validation-rules.json` - commands that must pass before this build is complete

## Expected output (written by the agent, not included here)
- `.ai-delivery/build-result.json`
- `.ai-delivery/requirement-evidence.json`
- `.ai-delivery/build-summary.md`
