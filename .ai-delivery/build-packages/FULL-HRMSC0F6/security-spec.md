Project: hrms
Generated: 2026-07-02T17:01:42.467Z

# Security Specification

## Authentication
Users must authenticate before accessing protected pages.

## Authorization
Actions are restricted by role and permission.

## Roles
Supported roles: Employee, Manager, HR Admin, Payroll Officer, Recruiter, System Admin, HR Staff / Record Owner, Manager / Supervisor, Admin, Requester, Approver, Customer, Fulfillment Staff, Owner, Reviewer.

## Permissions
Create, read, update, delete, approve and export permissions are explicit.

## Data Protection
Sensitive data must be masked in logs and exports.

## Audit
Critical workflow actions must create audit records.

## Compliance
Human Resources compliance checks must be reviewed before release.