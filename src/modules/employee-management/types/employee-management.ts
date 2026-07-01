export type EmployeeRole = 'HR_STAFF' | 'MANAGER' | 'ADMIN' | 'SYSTEM';

export type EmployeeStatus =
  | 'DRAFT'
  | 'VERIFIED'
  | 'PENDING_APPROVAL'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'ACTIVE'
  | 'INACTIVE';

export type EmployeeAction =
  | 'CREATE'
  | 'VERIFY'
  | 'SUBMIT'
  | 'REVIEW'
  | 'APPROVE'
  | 'ACTIVATE'
  | 'UPDATE'
  | 'DEACTIVATE'
  | 'AUDIT'
  | 'REPORT';

export interface EmployeeFormInput {
  employeeCode: string;
  firstName: string;
  lastName: string;
  department: string;
  designation?: string;
  jobTitle?: string;
  managerId?: string;
  managerName?: string;
  joiningDate: string;
  employmentType: string;
  email: string;
  phone?: string;
  address?: string;
  documentIds?: string[];
  profilePhoto?: string;
}

export interface EmployeeRecord extends EmployeeFormInput {
  id: string;
  fullName: string;
  status: EmployeeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeHistoryRecord {
  id: string;
  employeeId: string;
  changeType: EmployeeAction;
  fromValue: string;
  toValue: string;
  changedBy: EmployeeRole;
  changedAt: string;
  note?: string;
}

export interface EmployeeValidationIssue {
  field: keyof EmployeeFormInput | 'status' | 'permissions' | 'workflow';
  message: string;
}

export interface EmployeeListFilters {
  department?: string;
  status?: EmployeeStatus;
  managerId?: string;
  search?: string;
}

export interface EmployeeReportRow {
  label: string;
  count: number;
}

export interface EmployeeReportResult {
  generatedAt: string;
  totalEmployees: number;
  byStatus: EmployeeReportRow[];
  byDepartment: EmployeeReportRow[];
  activeManagers: number;
}

export interface EmployeeWorkspaceState {
  loading: boolean;
  submitting: boolean;
  error?: string;
  selectedEmployeeId?: string;
  filters: EmployeeListFilters;
}

export interface EmployeeWorkspaceBlueprint {
  pageName: string;
  templateName: string;
  primaryUsers: string[];
  layoutSections: string[];
  states: string[];
  emptyState: string;
  loadingState: string;
  errorState: string;
  filters: string[];
  actions: EmployeeAction[];
}

export interface EmployeeActionPermission {
  action: EmployeeAction;
  roles: EmployeeRole[];
  allowedStatuses: EmployeeStatus[];
}

export const EMPLOYEE_ACTION_PERMISSIONS: EmployeeActionPermission[] = [
  { action: 'CREATE', roles: ['HR_STAFF'], allowedStatuses: ['DRAFT'] },
  { action: 'VERIFY', roles: ['HR_STAFF'], allowedStatuses: ['DRAFT'] },
  { action: 'SUBMIT', roles: ['HR_STAFF'], allowedStatuses: ['VERIFIED'] },
  { action: 'REVIEW', roles: ['MANAGER'], allowedStatuses: ['PENDING_APPROVAL'] },
  { action: 'APPROVE', roles: ['MANAGER'], allowedStatuses: ['UNDER_REVIEW'] },
  { action: 'ACTIVATE', roles: ['ADMIN'], allowedStatuses: ['APPROVED'] },
  { action: 'UPDATE', roles: ['HR_STAFF'], allowedStatuses: ['DRAFT', 'VERIFIED', 'PENDING_APPROVAL', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE'] },
  { action: 'DEACTIVATE', roles: ['ADMIN'], allowedStatuses: ['ACTIVE'] },
  { action: 'AUDIT', roles: ['SYSTEM', 'HR_STAFF', 'MANAGER', 'ADMIN'], allowedStatuses: ['DRAFT', 'VERIFIED', 'PENDING_APPROVAL', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'INACTIVE'] },
  { action: 'REPORT', roles: ['ADMIN'], allowedStatuses: ['DRAFT', 'VERIFIED', 'PENDING_APPROVAL', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'INACTIVE'] },
];

export const EMPLOYEE_BLUEPRINT: EmployeeWorkspaceBlueprint = {
  pageName: 'Employee Workspace',
  templateName: 'SAP Fiori Inspired HR',
  primaryUsers: ['HR Staff / Record Owner', 'Manager / Supervisor', 'Admin'],
  layoutSections: [
    'Header / Filters',
    'Employee List / Table',
    'Employee Detail Drawer',
    'Action Bar',
    'Status Timeline',
  ],
  states: ['Loading', 'Empty', 'Error', 'Populated', 'Submitting Action'],
  emptyState: 'No Employee records yet - show a "Create Employee" call to action.',
  loadingState: 'Skeleton rows while Employee list is fetched.',
  errorState: 'Inline error banner with retry if Employee list/detail fails to load.',
  filters: ['Status', 'Date Range', 'Assigned Role', 'Search by ID/Name'],
  actions: [
    'CREATE',
    'VERIFY',
    'SUBMIT',
    'REVIEW',
    'APPROVE',
    'ACTIVATE',
    'UPDATE',
    'DEACTIVATE',
    'AUDIT',
    'REPORT',
  ],
};

export const EMPLOYEE_REQUIRED_FIELDS: Array<keyof EmployeeFormInput> = [
  'employeeCode',
  'firstName',
  'lastName',
  'department',
  'joiningDate',
  'employmentType',
  'email',
];

export function isEmployeeStatus(value: string): value is EmployeeStatus {
  return [
    'DRAFT',
    'VERIFIED',
    'PENDING_APPROVAL',
    'UNDER_REVIEW',
    'APPROVED',
    'ACTIVE',
    'INACTIVE',
  ].includes(value);
}

export function isEmployeeRole(value: string): value is EmployeeRole {
  return ['HR_STAFF', 'MANAGER', 'ADMIN', 'SYSTEM'].includes(value);
}
