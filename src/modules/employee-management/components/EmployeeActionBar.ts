import { EmployeeAction, EmployeeRole, EmployeeStatus } from '../types/employee-management';
import { availableActions } from '../services/employee-management.service';

export interface EmployeeActionBarModel {
  primaryAction?: EmployeeAction;
  enabledActions: EmployeeAction[];
  disabledReason: string;
}

export function EmployeeActionBar(role: EmployeeRole, status: EmployeeStatus): EmployeeActionBarModel {
  const enabledActions = availableActions(role, status);
  return {
    primaryAction: enabledActions[0],
    enabledActions,
    disabledReason: enabledActions.length === 0 ? 'No actions available for the current role and record status.' : '',
  };
}
