# Implementation Plan - FULL-HRMSC0F6

1. Read folder-structure.md and place new files under src/modules/human-resources/ only.
2. Read architecture.md, api-spec.json, database-spec.json before writing any code.
3. Read selected-template.json and design-system.json - all UI must use template-derived components, not generic admin UI.
4. Implement business-requirements.json first, then ui-contract.json, then automation-contract.json.
5. Use requirement-scope.json for full traceability and supporting UI details.
6. Run validation commands (see validation-rules.json) before marking complete.
7. Write .ai-delivery/build-result.json with files changed, requirements covered, and test results.
8. Include every completed Requirement ID in requirementsCovered so the platform can turn those board cards to DEV_COMPLETED.
9. If the built application can be viewed locally, start or verify the local app and include its actual URL in build-result.json as localPreviewUrl.
10. Generate QA-consumable evidence for QA Test Mind: .ai-delivery/requirement-evidence.json, .ai-delivery/build-summary.md, test-results/, coverage/, and playwright-report/ when available.
11. Commit on ai/full-application-hrms, push, open a PR titled "FULL-HRMSC0F6: Full Application".
