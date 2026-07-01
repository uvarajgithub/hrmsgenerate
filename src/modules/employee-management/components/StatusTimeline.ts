import { EmployeeHistoryRecord } from '../types/employee-management';

export interface StatusTimelineItem {
  label: string;
  from: string;
  to: string;
  changedBy: string;
  changedAt: string;
}

export function StatusTimeline(history: EmployeeHistoryRecord[]): StatusTimelineItem[] {
  return history.map((entry) => ({
    label: entry.changeType,
    from: entry.fromValue,
    to: entry.toValue,
    changedBy: entry.changedBy,
    changedAt: entry.changedAt,
  }));
}
