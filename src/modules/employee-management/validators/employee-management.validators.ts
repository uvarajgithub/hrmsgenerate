import {
  EmployeeFormInput,
  EmployeeRecord,
  EmployeeValidationIssue,
  EMPLOYEE_REQUIRED_FIELDS,
} from '../types/employee-management';

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function buildFullName(input: Pick<EmployeeFormInput, 'firstName' | 'lastName'>): string {
  return `${normalizeText(input.firstName)} ${normalizeText(input.lastName)}`.trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isFutureDate(isoDate: string, reference = new Date()): boolean {
  const candidate = new Date(isoDate);
  if (Number.isNaN(candidate.getTime())) {
    return true;
  }

  const today = new Date(reference);
  today.setHours(0, 0, 0, 0);
  candidate.setHours(0, 0, 0, 0);
  return candidate.getTime() > today.getTime();
}

export function validateEmployeeInput(
  input: Partial<EmployeeFormInput>,
  existingEmployees: EmployeeRecord[],
  options: { includeStatusRules?: boolean } = {}
): EmployeeValidationIssue[] {
  const issues: EmployeeValidationIssue[] = [];

  for (const field of EMPLOYEE_REQUIRED_FIELDS) {
    if (!String(input[field] ?? '').trim()) {
      issues.push({ field, message: `${field} is required.` });
    }
  }

  if (input.employeeCode && existingEmployees.some((employee) => employee.employeeCode === input.employeeCode?.trim())) {
    issues.push({ field: 'employeeCode', message: 'employeeCode must be unique.' });
  }

  if (input.email) {
    if (!isValidEmail(input.email)) {
      issues.push({ field: 'email', message: 'email must be valid.' });
    }

    const normalized = normalizeEmail(input.email);
    const duplicate = existingEmployees.some((employee) => normalizeEmail(employee.email) === normalized);
    if (duplicate) {
      issues.push({ field: 'email', message: 'email must be unique.' });
    }
  }

  if (input.joiningDate && isFutureDate(input.joiningDate)) {
    issues.push({ field: 'joiningDate', message: 'joiningDate must not be in the future.' });
  }

  if (input.managerId) {
    const manager = existingEmployees.find((employee) => employee.id === input.managerId);
    if (!manager) {
      issues.push({ field: 'managerId', message: 'managerId must reference an existing Employee record.' });
    } else if (manager.status !== 'ACTIVE') {
      issues.push({ field: 'managerId', message: 'managerId must reference an active Employee record.' });
    }
  }

  if (options.includeStatusRules && input.firstName && input.department && input.email) {
    // no-op: status rules are enforced at activation time in the workflow service.
  }

  return issues;
}

export function validateActivationPreconditions(employee: EmployeeRecord): EmployeeValidationIssue[] {
  const issues: EmployeeValidationIssue[] = [];

  if (!normalizeText(employee.firstName) || !normalizeText(employee.lastName)) {
    issues.push({ field: 'firstName', message: 'Name is required before activation.' });
  }
  if (!normalizeText(employee.department)) {
    issues.push({ field: 'department', message: 'department is required before activation.' });
  }
  if (!normalizeEmail(employee.email)) {
    issues.push({ field: 'email', message: 'email is required before activation.' });
  }

  return issues;
}

export function validateWorkflowStatus(
  currentStatus: EmployeeRecord['status'],
  allowedStatuses: EmployeeRecord['status'][]
): EmployeeValidationIssue[] {
  if (!allowedStatuses.includes(currentStatus)) {
    return [{ field: 'status', message: `Action is not allowed when employee status is ${currentStatus}.` }];
  }

  return [];
}
