import {
  EmployeeAction,
  EmployeeFormInput,
  EmployeeHistoryRecord,
  EmployeeListFilters,
  EmployeeRecord,
  EmployeeReportResult,
  EmployeeRole,
  EmployeeStatus,
  EMPLOYEE_ACTION_PERMISSIONS,
} from '../types/employee-management';
import {
  buildFullName,
  normalizeEmail,
  normalizeText,
  validateActivationPreconditions,
  validateEmployeeInput,
} from '../validators/employee-management.validators';

export interface EmployeeActionResult {
  employee: EmployeeRecord;
  history: EmployeeHistoryRecord;
  warnings: string[];
}

function nowIso(): string {
  return new Date().toISOString();
}

function makeId(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(4, '0')}`;
}

function cloneEmployee(employee: EmployeeRecord): EmployeeRecord {
  return {
    ...employee,
    documentIds: [...(employee.documentIds ?? [])],
  };
}

function cloneHistory(history: EmployeeHistoryRecord): EmployeeHistoryRecord {
  return { ...history };
}

function statusLabel(status: EmployeeStatus): string {
  return status.replace(/_/g, ' ');
}

export class EmployeeManagementService {
  private employees: EmployeeRecord[] = [];

  private histories: EmployeeHistoryRecord[] = [];

  private employeeSeq = 1000;

  private historySeq = 5000;

  constructor() {
    this.seed();
  }

  private seed(): void {
    const manager = this.createSeedEmployee({
      employeeCode: 'EMP-1001',
      firstName: 'Asha',
      lastName: 'Patel',
      department: 'HR',
      designation: 'HR Manager',
      jobTitle: 'People Operations Lead',
      joiningDate: '2024-04-01',
      employmentType: 'Full-time',
      email: 'asha.patel@hrms.local',
      phone: '+91-9000000001',
      status: 'ACTIVE',
    });

    this.createSeedEmployee({
      employeeCode: 'EMP-1002',
      firstName: 'Rahul',
      lastName: 'Sharma',
      department: 'Engineering',
      designation: 'Software Engineer',
      jobTitle: 'Platform Engineer',
      managerId: manager.id,
      managerName: manager.fullName,
      joiningDate: '2024-06-01',
      employmentType: 'Full-time',
      email: 'rahul.sharma@hrms.local',
      phone: '+91-9000000002',
      status: 'VERIFIED',
    });

    this.createSeedEmployee({
      employeeCode: 'EMP-1003',
      firstName: 'Farah',
      lastName: 'Khan',
      department: 'Finance',
      designation: 'Accounts Executive',
      jobTitle: 'Accounts Executive',
      managerId: manager.id,
      managerName: manager.fullName,
      joiningDate: '2025-01-06',
      employmentType: 'Full-time',
      email: 'farah.khan@hrms.local',
      phone: '+91-9000000003',
      status: 'PENDING_APPROVAL',
    });

    this.createSeedEmployee({
      employeeCode: 'EMP-1004',
      firstName: 'Karthik',
      lastName: 'Menon',
      department: 'Sales',
      designation: 'Regional Sales Lead',
      jobTitle: 'Sales Lead',
      managerId: manager.id,
      managerName: manager.fullName,
      joiningDate: '2024-11-18',
      employmentType: 'Full-time',
      email: 'karthik.menon@hrms.local',
      phone: '+91-9000000004',
      status: 'APPROVED',
    });

    this.createSeedEmployee({
      employeeCode: 'EMP-1005',
      firstName: 'Leena',
      lastName: 'D Souza',
      department: 'Operations',
      designation: 'Operations Coordinator',
      jobTitle: 'Operations Coordinator',
      managerId: manager.id,
      managerName: manager.fullName,
      joiningDate: '2023-09-12',
      employmentType: 'Contract',
      email: 'leena.dsouza@hrms.local',
      phone: '+91-9000000005',
      status: 'INACTIVE',
    });
  }

  private createSeedEmployee(
    input: EmployeeFormInput & { status: EmployeeStatus }
  ): EmployeeRecord {
    const id = makeId('EMP', ++this.employeeSeq);
    const record: EmployeeRecord = {
      id,
      employeeCode: input.employeeCode,
      firstName: normalizeText(input.firstName),
      lastName: normalizeText(input.lastName),
      fullName: buildFullName(input),
      department: normalizeText(input.department),
      designation: input.designation?.trim(),
      jobTitle: input.jobTitle?.trim(),
      managerId: input.managerId,
      managerName: input.managerName?.trim(),
      joiningDate: input.joiningDate,
      employmentType: normalizeText(input.employmentType),
      email: normalizeEmail(input.email),
      phone: input.phone?.trim(),
      address: input.address?.trim(),
      documentIds: [...(input.documentIds ?? [])],
      profilePhoto: input.profilePhoto?.trim(),
      status: input.status,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    this.employees.push(record);
    this.captureHistory(record.id, 'CREATE', '', record.status, 'SYSTEM', 'Seeded employee record.');
    return record;
  }

  private ensurePermission(action: EmployeeAction, role: EmployeeRole, status: EmployeeStatus): void {
    const permission = EMPLOYEE_ACTION_PERMISSIONS.find((item) => item.action === action);
    if (!permission) {
      throw new Error(`Unknown action: ${action}`);
    }

    if (!permission.roles.includes(role)) {
      throw new Error(`${action} is not permitted for role ${role}.`);
    }

    if (!permission.allowedStatuses.includes(status)) {
      throw new Error(`${action} is not permitted while employee is ${status}.`);
    }
  }

  private getEmployeeIndex(id: string): number {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index < 0) {
      throw new Error(`Employee ${id} not found.`);
    }
    return index;
  }

  private captureHistory(
    employeeId: string,
    changeType: EmployeeAction,
    fromValue: string,
    toValue: string,
    changedBy: EmployeeRole,
    note?: string
  ): EmployeeHistoryRecord {
    const record: EmployeeHistoryRecord = {
      id: makeId('HIS', ++this.historySeq),
      employeeId,
      changeType,
      fromValue,
      toValue,
      changedBy,
      changedAt: nowIso(),
      note,
    };

    this.histories.push(record);
    return record;
  }

  listEmployees(filters: EmployeeListFilters = {}): EmployeeRecord[] {
    return this.employees
      .filter((employee) => {
        if (filters.department && employee.department !== filters.department) {
          return false;
        }

        if (filters.status && employee.status !== filters.status) {
          return false;
        }

        if (filters.managerId && employee.managerId !== filters.managerId) {
          return false;
        }

        if (filters.search) {
          const query = normalizeText(filters.search).toLowerCase();
          const haystack = [
            employee.employeeCode,
            employee.fullName,
            employee.firstName,
            employee.lastName,
            employee.department,
            employee.designation ?? '',
            employee.jobTitle ?? '',
          ]
            .join(' ')
            .toLowerCase();
          return haystack.includes(query);
        }

        return true;
      })
      .map(cloneEmployee);
  }

  getEmployeeById(id: string): EmployeeRecord | undefined {
    const employee = this.employees.find((item) => item.id === id);
    return employee ? cloneEmployee(employee) : undefined;
  }

  getEmployeeHistory(id: string): EmployeeHistoryRecord[] {
    return this.histories.filter((history) => history.employeeId === id).map(cloneHistory);
  }

  createEmployeeProfile(
    input: EmployeeFormInput,
    actor: EmployeeRole
  ): EmployeeActionResult {
    const issues = validateEmployeeInput(input, this.employees);
    if (issues.length > 0) {
      throw new Error(issues.map((issue) => issue.message).join(' '));
    }

    this.ensurePermission('CREATE', actor, 'DRAFT');

    const id = makeId('EMP', ++this.employeeSeq);
    const employee: EmployeeRecord = {
      id,
      employeeCode: normalizeText(input.employeeCode),
      firstName: normalizeText(input.firstName),
      lastName: normalizeText(input.lastName),
      fullName: buildFullName(input),
      department: normalizeText(input.department),
      designation: input.designation?.trim(),
      jobTitle: input.jobTitle?.trim(),
      managerId: input.managerId?.trim(),
      managerName: input.managerName?.trim(),
      joiningDate: input.joiningDate,
      employmentType: normalizeText(input.employmentType),
      email: normalizeEmail(input.email),
      phone: input.phone?.trim(),
      address: input.address?.trim(),
      documentIds: [...(input.documentIds ?? [])],
      profilePhoto: input.profilePhoto?.trim(),
      status: 'DRAFT',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    this.employees.push(employee);
    const history = this.captureHistory(employee.id, 'CREATE', '', employee.status, actor, 'Created employee profile.');
    return { employee: cloneEmployee(employee), history, warnings: [] };
  }

  verifyEmployeeDetails(id: string, actor: EmployeeRole): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('VERIFY', actor, current.status);

    const issues = validateEmployeeInput(current, this.employees.filter((employee) => employee.id !== id));
    if (issues.length > 0) {
      throw new Error(issues.map((issue) => issue.message).join(' '));
    }

    const updated = {
      ...current,
      status: 'VERIFIED' as const,
      updatedAt: nowIso(),
    };
    this.employees[index] = updated;
    const history = this.captureHistory(id, 'VERIFY', current.status, updated.status, actor, 'Verified employee details.');
    return { employee: cloneEmployee(updated), history, warnings: [] };
  }

  submitForManagerApproval(id: string, actor: EmployeeRole): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('SUBMIT', actor, current.status);

    const updated = {
      ...current,
      status: 'PENDING_APPROVAL' as const,
      updatedAt: nowIso(),
    };
    this.employees[index] = updated;
    const history = this.captureHistory(id, 'SUBMIT', current.status, updated.status, actor, 'Submitted for manager approval.');
    return { employee: cloneEmployee(updated), history, warnings: [] };
  }

  managerReviewsEmployeeRecord(id: string, actor: EmployeeRole, note = 'Manager review completed.'): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('REVIEW', actor, current.status);

    const updated = {
      ...current,
      status: 'UNDER_REVIEW' as const,
      updatedAt: nowIso(),
    };
    this.employees[index] = updated;
    const history = this.captureHistory(id, 'REVIEW', current.status, updated.status, actor, note);
    return { employee: cloneEmployee(updated), history, warnings: [] };
  }

  approveEmployeeRecord(id: string, actor: EmployeeRole): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('APPROVE', actor, current.status);

    const updated = {
      ...current,
      status: 'APPROVED' as const,
      updatedAt: nowIso(),
    };
    this.employees[index] = updated;
    const history = this.captureHistory(id, 'APPROVE', current.status, updated.status, actor, 'Approved employee record.');
    return { employee: cloneEmployee(updated), history, warnings: [] };
  }

  activateEmployee(id: string, actor: EmployeeRole): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('ACTIVATE', actor, current.status);

    const issues = validateActivationPreconditions(current);
    if (issues.length > 0) {
      throw new Error(issues.map((issue) => issue.message).join(' '));
    }

    const updated = {
      ...current,
      status: 'ACTIVE' as const,
      updatedAt: nowIso(),
    };
    this.employees[index] = updated;
    const history = this.captureHistory(id, 'ACTIVATE', current.status, updated.status, actor, 'Activated employee.');
    return { employee: cloneEmployee(updated), history, warnings: [] };
  }

  updateEmployeeInformation(
    id: string,
    patch: Partial<EmployeeFormInput>,
    actor: EmployeeRole
  ): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('UPDATE', actor, current.status);

    const candidate: EmployeeRecord = {
      ...current,
      ...patch,
      employeeCode: patch.employeeCode !== undefined ? normalizeText(patch.employeeCode) : current.employeeCode,
      firstName: patch.firstName !== undefined ? normalizeText(patch.firstName) : current.firstName,
      lastName: patch.lastName !== undefined ? normalizeText(patch.lastName) : current.lastName,
      fullName:
        patch.firstName !== undefined || patch.lastName !== undefined
          ? buildFullName({
              firstName: patch.firstName ?? current.firstName,
              lastName: patch.lastName ?? current.lastName,
            })
          : current.fullName,
      department: patch.department !== undefined ? normalizeText(patch.department) : current.department,
      designation: patch.designation !== undefined ? patch.designation?.trim() : current.designation,
      jobTitle: patch.jobTitle !== undefined ? patch.jobTitle?.trim() : current.jobTitle,
      managerId: patch.managerId !== undefined ? patch.managerId?.trim() : current.managerId,
      managerName: patch.managerName !== undefined ? patch.managerName?.trim() : current.managerName,
      joiningDate: patch.joiningDate ?? current.joiningDate,
      employmentType: patch.employmentType !== undefined ? normalizeText(patch.employmentType) : current.employmentType,
      email: patch.email !== undefined ? normalizeEmail(patch.email) : current.email,
      phone: patch.phone !== undefined ? patch.phone?.trim() : current.phone,
      address: patch.address !== undefined ? patch.address?.trim() : current.address,
      documentIds: patch.documentIds !== undefined ? [...patch.documentIds] : current.documentIds,
      profilePhoto: patch.profilePhoto !== undefined ? patch.profilePhoto?.trim() : current.profilePhoto,
      updatedAt: nowIso(),
    };

    const duplicateIssues = validateEmployeeInput(
      candidate,
      this.employees.filter((employee) => employee.id !== id)
    );
    if (duplicateIssues.length > 0) {
      throw new Error(duplicateIssues.map((issue) => issue.message).join(' '));
    }

    this.employees[index] = candidate;
    const history = this.captureHistory(id, 'UPDATE', current.status, candidate.status, actor, 'Updated employee information.');
    return { employee: cloneEmployee(candidate), history, warnings: [] };
  }

  deactivateEmployee(id: string, actor: EmployeeRole, note = 'Employee offboarded.'): EmployeeActionResult {
    const index = this.getEmployeeIndex(id);
    const current = this.employees[index];
    this.ensurePermission('DEACTIVATE', actor, current.status);

    const updated = {
      ...current,
      status: 'INACTIVE' as const,
      updatedAt: nowIso(),
    };
    this.employees[index] = updated;
    const history = this.captureHistory(id, 'DEACTIVATE', current.status, updated.status, actor, note);
    return { employee: cloneEmployee(updated), history, warnings: [] };
  }

  captureAuditLog(id: string): EmployeeHistoryRecord[] {
    return this.getEmployeeHistory(id);
  }

  generateEmployeeReports(actor: EmployeeRole = 'ADMIN'): EmployeeReportResult {
    this.ensurePermission('REPORT', actor, 'DRAFT');

    const byStatusMap = new Map<EmployeeStatus, number>();
    const byDepartmentMap = new Map<string, number>();

    for (const employee of this.employees) {
      byStatusMap.set(employee.status, (byStatusMap.get(employee.status) ?? 0) + 1);
      byDepartmentMap.set(employee.department, (byDepartmentMap.get(employee.department) ?? 0) + 1);
    }

    return {
      generatedAt: nowIso(),
      totalEmployees: this.employees.length,
      byStatus: Array.from(byStatusMap.entries()).map(([label, count]) => ({ label: statusLabel(label), count })),
      byDepartment: Array.from(byDepartmentMap.entries()).map(([label, count]) => ({ label, count })),
      activeManagers: this.employees.filter(
        (employee) =>
          employee.status === 'ACTIVE' &&
          ((employee.jobTitle ?? '').toLowerCase().includes('manager') ||
            (employee.designation ?? '').toLowerCase().includes('manager'))
      ).length,
    };
  }

  snapshot(): { employees: EmployeeRecord[]; histories: EmployeeHistoryRecord[] } {
    return {
      employees: this.employees.map(cloneEmployee),
      histories: this.histories.map(cloneHistory),
    };
  }

  reset(seed = true): void {
    this.employees = [];
    this.histories = [];
    this.employeeSeq = 1000;
    this.historySeq = 5000;
    if (seed) {
      this.seed();
    }
  }
}

export const employeeManagementService = new EmployeeManagementService();

export function listEmployees(filters?: EmployeeListFilters): EmployeeRecord[] {
  return employeeManagementService.listEmployees(filters);
}

export function getEmployeeById(id: string): EmployeeRecord | undefined {
  return employeeManagementService.getEmployeeById(id);
}

export function getEmployeeHistory(id: string): EmployeeHistoryRecord[] {
  return employeeManagementService.getEmployeeHistory(id);
}

export function createEmployeeProfile(input: EmployeeFormInput, actor: EmployeeRole): EmployeeActionResult {
  return employeeManagementService.createEmployeeProfile(input, actor);
}

export function verifyEmployeeDetails(id: string, actor: EmployeeRole): EmployeeActionResult {
  return employeeManagementService.verifyEmployeeDetails(id, actor);
}

export function submitForManagerApproval(id: string, actor: EmployeeRole): EmployeeActionResult {
  return employeeManagementService.submitForManagerApproval(id, actor);
}

export function managerReviewsEmployeeRecord(
  id: string,
  actor: EmployeeRole,
  note?: string
): EmployeeActionResult {
  return employeeManagementService.managerReviewsEmployeeRecord(id, actor, note);
}

export function approveEmployeeRecord(id: string, actor: EmployeeRole): EmployeeActionResult {
  return employeeManagementService.approveEmployeeRecord(id, actor);
}

export function activateEmployee(id: string, actor: EmployeeRole): EmployeeActionResult {
  return employeeManagementService.activateEmployee(id, actor);
}

export function updateEmployeeInformation(
  id: string,
  patch: Partial<EmployeeFormInput>,
  actor: EmployeeRole
): EmployeeActionResult {
  return employeeManagementService.updateEmployeeInformation(id, patch, actor);
}

export function deactivateEmployee(id: string, actor: EmployeeRole, note?: string): EmployeeActionResult {
  return employeeManagementService.deactivateEmployee(id, actor, note);
}

export function captureAuditLog(id: string): EmployeeHistoryRecord[] {
  return employeeManagementService.captureAuditLog(id);
}

export function generateEmployeeReports(actor?: EmployeeRole): EmployeeReportResult {
  return employeeManagementService.generateEmployeeReports(actor);
}

export function canPerformAction(action: EmployeeAction, role: EmployeeRole, status: EmployeeStatus): boolean {
  const permission = EMPLOYEE_ACTION_PERMISSIONS.find((item) => item.action === action);
  return Boolean(permission && permission.roles.includes(role) && permission.allowedStatuses.includes(status));
}

export function availableActions(role: EmployeeRole, status: EmployeeStatus): EmployeeAction[] {
  return EMPLOYEE_ACTION_PERMISSIONS.filter(
    (permission) => permission.roles.includes(role) && permission.allowedStatuses.includes(status)
  ).map((permission) => permission.action);
}
