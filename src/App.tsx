import { useMemo, useState } from 'react';
import {
  EmployeeRole,
  EmployeeStatus,
  buildEmployeeWorkspace,
} from './modules/employee-management';

const roles: EmployeeRole[] = ['HR_STAFF', 'MANAGER', 'ADMIN'];
const statuses: Array<EmployeeStatus | 'ALL'> = ['ALL', 'DRAFT', 'VERIFIED', 'PENDING_APPROVAL', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'INACTIVE'];

function formatAction(action: string): string {
  return action
    .split('_')
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
}

export function App() {
  const [role, setRole] = useState<EmployeeRole>('HR_STAFF');
  const [status, setStatus] = useState<EmployeeStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const workspace = useMemo(
    () =>
      buildEmployeeWorkspace(role, {
        status: status === 'ALL' ? undefined : status,
        search: search.trim() || undefined,
      }),
    [role, status, search]
  );

  const selectedRow = workspace.list.rows[0];
  const selectedWorkspace = useMemo(
    () =>
      selectedRow
        ? buildEmployeeWorkspace(
            role,
            {
              status: status === 'ALL' ? undefined : status,
              search: search.trim() || undefined,
            },
            selectedRow.id
          )
        : workspace,
    [role, search, selectedRow, status, workspace]
  );

  return (
    <main className="app-shell">
      <aside className="side-nav" aria-label="HRMS navigation">
        <div className="brand-mark">HR</div>
        <nav>
          <a className="active" href="#employee-workspace">Employees</a>
          <a href="#reports">Reports</a>
          <a href="#audit">Audit</a>
        </nav>
      </aside>

      <section className="workspace" id="employee-workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">SAP Fiori Inspired HR</p>
            <h1>Employee Workspace</h1>
          </div>
          <div className="summary-strip" aria-label="Employee summary">
            <span>{workspace.reports.totalEmployees} employees</span>
            <span>{workspace.reports.activeManagers} active managers</span>
            <span>{workspace.reports.byStatus.length} lifecycle states</span>
          </div>
        </header>

        <section className="filters" aria-label="Employee filters">
          <label>
            Role
            <select value={role} onChange={(event) => setRole(event.target.value as EmployeeRole)}>
              {roles.map((item) => (
                <option key={item} value={item}>
                  {formatAction(item)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value as EmployeeStatus | 'ALL')}>
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {formatAction(item)}
                </option>
              ))}
            </select>
          </label>
          <label className="search-field">
            Search by ID or name
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="EMP-1001 or Asha" />
          </label>
        </section>

        <section className="content-grid">
          <div className="table-panel">
            <div className="section-heading">
              <h2>Employee List</h2>
              <button type="button">Create Employee</button>
            </div>
            <div className="employee-table" role="table" aria-label="Employee list">
              <div className="table-row table-head" role="row">
                <span>Employee</span>
                <span>Department</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {workspace.list.rows.map((row) => (
                <div className="table-row" role="row" key={row.id}>
                  <span>
                    <strong>{row.fullName}</strong>
                    <small>{row.employeeCode} · {row.email}</small>
                  </span>
                  <span>
                    {row.department}
                    <small>{row.designation ?? 'Employee'}</small>
                  </span>
                  <span>
                    <mark>{formatAction(row.status)}</mark>
                  </span>
                  <span className="action-list">
                    {row.actions.length > 0 ? row.actions.map(formatAction).join(', ') : 'No action'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="detail-panel">
            <div className="section-heading">
              <h2>Detail Drawer</h2>
              <span>{role.replace('_', ' ')}</span>
            </div>
            {selectedWorkspace.detail ? (
              <>
                <h3>{selectedWorkspace.detail.employee.fullName}</h3>
                <p>{selectedWorkspace.detail.statusSummary}</p>
                <div className="action-box">
                  <strong>Available actions</strong>
                  <span>{selectedWorkspace.actionBar?.enabledActions.map(formatAction).join(', ') || 'No actions available'}</span>
                </div>
                <ol className="timeline">
                  {selectedWorkspace.timeline?.map((item) => (
                    <li key={`${item.label}-${item.changedAt}`}>
                      <strong>{formatAction(item.label)}</strong>
                      <span>{item.to || item.from} · {item.changedBy}</span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <p>{workspace.list.emptyMessage}</p>
            )}
          </aside>
        </section>
      </section>
    </main>
  );
}
