import { EmployeeHistoryRecord, EmployeeRecord } from '../types/employee-management';

export interface EmployeeTimelineItem {
  label: string;
  when: string;
  by: string;
  note?: string;
}

export interface EmployeeDetailViewModel {
  employee: EmployeeRecord;
  statusSummary: string;
  timeline: EmployeeTimelineItem[];
}

export function EmployeeManagementDetail(
  employee: EmployeeRecord,
  history: EmployeeHistoryRecord[]
): EmployeeDetailViewModel {
  return {
    employee,
    statusSummary: `${employee.fullName} is currently ${employee.status}.`,
    timeline: history
      .slice()
      .reverse()
      .map((item) => ({
        label: item.changeType,
        when: item.changedAt,
        by: item.changedBy,
        note: item.note,
      })),
  };
}
