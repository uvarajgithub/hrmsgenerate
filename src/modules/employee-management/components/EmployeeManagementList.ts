import {
  EmployeeListFilters,
  EmployeeRecord,
  EmployeeRole,
  EmployeeStatus,
  EmployeeAction,
} from '../types/employee-management';
import { availableActions } from '../services/employee-management.service';

export interface EmployeeListRow {
  id: string;
  employeeCode: string;
  fullName: string;
  department: string;
  designation?: string;
  managerName?: string;
  joiningDate: string;
  employmentType: string;
  email: string;
  status: EmployeeStatus;
  actions: EmployeeAction[];
}

export interface EmployeeListViewModel {
  filters: EmployeeListFilters;
  rows: EmployeeListRow[];
  emptyMessage: string;
  loadingMessage: string;
}

export function EmployeeManagementList(
  employees: EmployeeRecord[],
  role: EmployeeRole,
  filters: EmployeeListFilters = {}
): EmployeeListViewModel {
  return {
    filters,
    rows: employees.map((employee) => ({
      id: employee.id,
      employeeCode: employee.employeeCode,
      fullName: employee.fullName,
      department: employee.department,
      designation: employee.designation,
      managerName: employee.managerName,
      joiningDate: employee.joiningDate,
      employmentType: employee.employmentType,
      email: employee.email,
      status: employee.status,
      actions: availableActions(role, employee.status),
    })),
    emptyMessage: 'No Employee records yet - show a "Create Employee" call to action.',
    loadingMessage: 'Skeleton rows while Employee list is fetched.',
  };
}
