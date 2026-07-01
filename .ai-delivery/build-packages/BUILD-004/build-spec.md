# Build Spec - BUILD-004 (Pilot Build)

Project: HRMS
Scope: Leave Management
Branch: ai/build-004-leave-management
Target Agent: Claude Code

## What to build
- REQ-0673: Leave Management Overview - Feature: Open Leave Management Overview
- REQ-0674: Leave Management Overview - Feature: Review Leave Management workspace context
- REQ-0675: Leave Management Overview - Feature: Manage apply leave journey
- REQ-0676: Leave Management Overview - Feature: Track Leave Management status, owner, priority, and recent activity
- REQ-0677: Leave Management Overview - Function: Open Leave Management
- REQ-0678: Leave Management Overview - Function: Start Apply Leave
- REQ-0679: Leave Management Overview - Function: Enter details
- REQ-0680: Leave Management Overview - Function: Submit
- REQ-0681: Leave Management Overview - Function: Create Leave Management
- REQ-0682: Leave Management Overview - Function: Update Leave Management
- REQ-0683: Leave Management Overview - Function: Submit Leave Management for review
- REQ-0684: Leave Management Overview - Function: Approve or reject Leave Management
- REQ-0685: Leave Management Overview - Function: Export Leave Management evidence
- REQ-0686: Leave Management Overview - Function: Search and filter Leave Management
- REQ-0687: Leave Management Overview - Field: Leave Management name / ID
- REQ-0688: Leave Management Overview - Field: Leave Management status
- REQ-0689: Leave Management Overview - Field: Leave Management owner
- REQ-0690: Leave Management Overview - Field: Leave Management priority
- REQ-0691: Leave Management Overview - Field: Leave Management created date
- REQ-0692: Leave Management Overview - Field: Leave Management updated date
- REQ-0693: Leave Management Overview - Field: Leave Management notes and attachments
- REQ-0694: Leave Management Overview - Field: Leave Management audit reference
- REQ-0695: Leave Management Overview - UI Element: Leave Management list table
- REQ-0696: Leave Management Overview - UI Element: Leave Management detail panel
- REQ-0697: Leave Management Overview - UI Element: Leave Management activity history
- REQ-0698: Leave Management Overview - UI Element: Leave Management evidence section
- REQ-0699: Leave Management Overview - UI Element: Leave Management status filter
- REQ-0700: Leave Management Overview - UI Element: Leave Management owner filter
- REQ-0701: Leave Management Overview - Validation: Apply Leave required fields are validated
- REQ-0702: Leave Management Overview - Validation: Apply Leave business rules are enforced for Leave Management
- REQ-0703: Leave Management Overview - Validation: Apply Leave status is updated and audited
- REQ-0704: Leave Management Overview - State: Leave Management loading state
- REQ-0705: Leave Management Overview - State: Leave Management empty state
- REQ-0706: Leave Management Overview - State: Leave Management validation error state
- REQ-0707: Leave Management Overview - State: Leave Management permission denied state
- REQ-0708: Leave Management Overview - State: Leave Management approved state
- REQ-0709: Leave Management Overview - State: Leave Management blocked state
- REQ-0710: Leave Management Overview - Role Access: Admin can manage all Leave Management records
- REQ-0711: Leave Management Overview - Role Access: Manager can approve Leave Management workflow decisions
- REQ-0712: Leave Management Overview - Role Access: Assigned user can update own Leave Management records
- REQ-0713: Leave Management Overview - Role Access: Viewer can read approved Leave Management records only
- REQ-0714: Leave Management Overview - API/Data: Read Leave Management records API/data source
- REQ-0715: Leave Management List - Feature: Open Leave Management List
- REQ-0757: Leave Management Details - Feature: Open Leave Management Details
- REQ-0799: Leave Management Create/Edit - Feature: Open Leave Management Create/Edit
- REQ-0841: Leave Management Workflow - Feature: Open Leave Management Workflow
- REQ-0883: Leave Management Reports - Feature: Open Leave Management Reports
- REQ-0925: Leave Management Settings - Feature: Open Leave Management Settings


## Reuse existing project
This project already exists. Do not rebuild the shell.
- Reuse existing routing (src/routes)
- Reuse shared components (src/shared/ui)
- Reuse existing layouts and page shell
- Reuse the existing design system / theme tokens
- Reuse the existing API client (src/api)
- Reuse existing authentication
Only add files for the scope listed above.
