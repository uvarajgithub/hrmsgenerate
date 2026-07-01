import {
  EmployeeListFilters,
  EmployeeRecord,
  EmployeeWorkspaceState,
} from '../types/employee-management';

export interface EmployeeWorkspaceController {
  state: EmployeeWorkspaceState;
  setLoading(next: boolean): void;
  setSubmitting(next: boolean): void;
  setError(message?: string): void;
  setSelectedEmployeeId(id?: string): void;
  setFilters(filters: EmployeeListFilters): void;
  reset(): void;
}

function createInitialState(): EmployeeWorkspaceState {
  return {
    loading: false,
    submitting: false,
    filters: {},
  };
}

export function createEmployeeWorkspaceController(): EmployeeWorkspaceController {
  const controller: EmployeeWorkspaceController = {
    state: createInitialState(),
    setLoading(next: boolean) {
      controller.state = { ...controller.state, loading: next };
    },
    setSubmitting(next: boolean) {
      controller.state = { ...controller.state, submitting: next };
    },
    setError(message?: string) {
      controller.state = { ...controller.state, error: message };
    },
    setSelectedEmployeeId(id?: string) {
      controller.state = { ...controller.state, selectedEmployeeId: id };
    },
    setFilters(filters: EmployeeListFilters) {
      controller.state = { ...controller.state, filters: { ...filters } };
    },
    reset() {
      controller.state = createInitialState();
    },
  };

  return controller;
}

export function deriveEmployeeWorkspaceState(
  employees: EmployeeRecord[],
  selectedEmployeeId?: string
): EmployeeWorkspaceState & { isEmpty: boolean } {
  return {
    loading: false,
    submitting: false,
    selectedEmployeeId,
    filters: {},
    isEmpty: employees.length === 0,
  };
}
