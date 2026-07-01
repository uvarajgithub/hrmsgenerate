import { EmployeeListFilters, EmployeeRole } from '../types/employee-management';
import { EmployeeManagementList } from '../components/EmployeeManagementList';
import { EmployeeManagementDetail } from '../components/EmployeeManagementDetail';
import { EmployeeManagementForm } from '../components/EmployeeManagementForm';
import { EmployeeActionBar } from '../components/EmployeeActionBar';
import { StatusTimeline } from '../components/StatusTimeline';
import {
  captureAuditLog,
  getEmployeeById,
  listEmployees,
  generateEmployeeReports,
} from '../services/employee-management.service';
import { EMPLOYEE_BLUEPRINT, EmployeeWorkspaceState } from '../types/employee-management';

export interface EmployeeWorkspaceViewModel {
  blueprint: typeof EMPLOYEE_BLUEPRINT;
  list: ReturnType<typeof EmployeeManagementList>;
  detail?: ReturnType<typeof EmployeeManagementDetail>;
  actionBar?: ReturnType<typeof EmployeeActionBar>;
  timeline?: ReturnType<typeof StatusTimeline>;
  formPreview: ReturnType<typeof EmployeeManagementForm>;
  reports: ReturnType<typeof generateEmployeeReports>;
  state: EmployeeWorkspaceState;
}

export function buildEmployeeWorkspace(
  role: EmployeeRole,
  filters: EmployeeListFilters = {},
  selectedEmployeeId?: string
): EmployeeWorkspaceViewModel {
  const employees = listEmployees(filters);
  const selectedEmployee = selectedEmployeeId ? getEmployeeById(selectedEmployeeId) : undefined;
  const history = selectedEmployee ? captureAuditLog(selectedEmployee.id) : [];

  return {
    blueprint: EMPLOYEE_BLUEPRINT,
    list: EmployeeManagementList(employees, role, filters),
    detail: selectedEmployee ? EmployeeManagementDetail(selectedEmployee, history) : undefined,
    actionBar: selectedEmployee ? EmployeeActionBar(role, selectedEmployee.status) : undefined,
    timeline: selectedEmployee ? StatusTimeline(history) : undefined,
    formPreview: EmployeeManagementForm(selectedEmployee ?? {}),
    reports: generateEmployeeReports(),
    state: {
      loading: false,
      submitting: false,
      selectedEmployeeId,
      filters,
    },
  };
}

export function getWorkspaceEmptyStateMessage(): string {
  return EMPLOYEE_BLUEPRINT.emptyState;
}

export function getWorkspaceLoadingStateMessage(): string {
  return EMPLOYEE_BLUEPRINT.loadingState;
}

export function getWorkspaceErrorStateMessage(): string {
  return EMPLOYEE_BLUEPRINT.errorState;
}
