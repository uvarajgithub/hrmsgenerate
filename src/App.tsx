import { FormEvent, useMemo, useState } from 'react';
import {
  EmployeeAction,
  EmployeeFormInput,
  EmployeeRecord,
  EmployeeRole,
  EmployeeStatus,
  activateEmployee,
  approveEmployeeRecord,
  buildEmployeeWorkspace,
  createEmployeeProfile,
  deactivateEmployee,
  managerReviewsEmployeeRecord,
  submitForManagerApproval,
  updateEmployeeInformation,
  verifyEmployeeDetails,
} from './modules/employee-management';

const roles: EmployeeRole[] = ['HR_STAFF', 'MANAGER', 'ADMIN'];
const statuses: Array<EmployeeStatus | 'ALL'> = [
  'ALL',
  'DRAFT',
  'VERIFIED',
  'PENDING_APPROVAL',
  'UNDER_REVIEW',
  'APPROVED',
  'ACTIVE',
  'INACTIVE',
];

const actionLabels: Record<EmployeeAction, string> = {
  CREATE: 'Save employee draft',
  VERIFY: 'Verify HR details',
  SUBMIT: 'Send to manager',
  REVIEW: 'Record manager review',
  APPROVE: 'Approve employment record',
  ACTIVATE: 'Activate employee',
  UPDATE: 'Update HR record',
  DEACTIVATE: 'Start offboarding',
  AUDIT: 'View audit trail',
  REPORT: 'Generate headcount report',
};

const statusLabels: Record<EmployeeStatus, string> = {
  DRAFT: 'Draft profile',
  VERIFIED: 'HR verified',
  PENDING_APPROVAL: 'With manager',
  UNDER_REVIEW: 'Manager reviewing',
  APPROVED: 'Approved',
  ACTIVE: 'Active employee',
  INACTIVE: 'Offboarded',
};

const roleLabels: Record<EmployeeRole, string> = {
  HR_STAFF: 'HR operations',
  MANAGER: 'Manager',
  ADMIN: 'HR admin',
  SYSTEM: 'System',
};

const emptyForm: EmployeeFormInput = {
  employeeCode: '',
  firstName: '',
  lastName: '',
  department: '',
  designation: '',
  jobTitle: '',
  managerId: '',
  managerName: '',
  joiningDate: '',
  employmentType: 'Full-time',
  email: '',
  phone: '',
  address: '',
  documentIds: [],
  profilePhoto: '',
};

function isEmployeeStatus(value: string): value is EmployeeStatus {
  return Object.prototype.hasOwnProperty.call(statusLabels, value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function onboardingChecklist(employee?: EmployeeRecord) {
  if (!employee) {
    return [];
  }

  return [
    {
      label: 'Employee code',
      done: Boolean(employee.employeeCode),
      detail: employee.employeeCode || 'Required before save',
    },
    {
      label: 'Work email',
      done: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email),
      detail: employee.email || 'Required before verification',
    },
    {
      label: 'Reporting manager',
      done: Boolean(employee.managerId && employee.managerName),
      detail: employee.managerName || 'Assign an active manager',
    },
    {
      label: 'Joining date',
      done: Boolean(employee.joiningDate) && new Date(employee.joiningDate) <= new Date(),
      detail: employee.joiningDate ? formatDate(employee.joiningDate) : 'Cannot be future dated',
    },
    {
      label: 'Department and role',
      done: Boolean(employee.department && (employee.designation || employee.jobTitle)),
      detail: `${employee.department || 'Department'} / ${employee.designation || employee.jobTitle || 'Role'}`,
    },
  ];
}

export function App() {
  const [role, setRole] = useState<EmployeeRole>('HR_STAFF');
  const [status, setStatus] = useState<EmployeeStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();
  const [form, setForm] = useState<EmployeeFormInput>({
    ...emptyForm,
    employeeCode: 'EMP-2005',
    firstName: 'Nisha',
    lastName: 'Rao',
    department: 'Finance',
    designation: 'Payroll Analyst',
    jobTitle: 'Payroll Analyst',
    joiningDate: '2025-02-10',
    employmentType: 'Full-time',
    email: 'nisha.rao@hrms.local',
  });
  const [notice, setNotice] = useState('Ready for HR operations.');
  const [refreshKey, setRefreshKey] = useState(0);

  const filters = useMemo(
    () => ({
      status: status === 'ALL' ? undefined : status,
      search: search.trim() || undefined,
    }),
    [status, search]
  );

  const workspace = useMemo(() => buildEmployeeWorkspace(role, filters, selectedEmployeeId), [
    role,
    filters,
    selectedEmployeeId,
    refreshKey,
  ]);

  const selectedEmployee = workspace.detail?.employee ?? workspace.list.rows[0];
  const selectedWorkspace = useMemo(() => {
    if (!selectedEmployee) {
      return workspace;
    }

    return buildEmployeeWorkspace(role, filters, selectedEmployee.id);
  }, [filters, role, selectedEmployee, workspace, refreshKey]);

  const employee = selectedWorkspace.detail?.employee;
  const checklist = onboardingChecklist(employee);
  const pendingManager = workspace.list.rows.filter((row) => row.status === 'PENDING_APPROVAL').length;
  const pendingActivation = workspace.list.rows.filter((row) => row.status === 'APPROVED').length;
  const activeEmployees = workspace.list.rows.filter((row) => row.status === 'ACTIVE').length;

  function applyAction(action: EmployeeAction) {
    if (!employee) {
      return;
    }

    try {
      if (action === 'VERIFY') {
        verifyEmployeeDetails(employee.id, role);
      } else if (action === 'SUBMIT') {
        submitForManagerApproval(employee.id, role);
      } else if (action === 'REVIEW') {
        managerReviewsEmployeeRecord(employee.id, role, 'Manager confirmed reporting line, role fit, and joining readiness.');
      } else if (action === 'APPROVE') {
        approveEmployeeRecord(employee.id, role);
      } else if (action === 'ACTIVATE') {
        activateEmployee(employee.id, role);
      } else if (action === 'UPDATE') {
        updateEmployeeInformation(employee.id, { phone: employee.phone || '+91-9000000099' }, role);
      } else if (action === 'DEACTIVATE') {
        deactivateEmployee(employee.id, role, 'Offboarding initiated from HR admin workspace.');
      }

      setNotice(`${actionLabels[action]} completed for ${employee.fullName}.`);
      setRefreshKey((value) => value + 1);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Action could not be completed.');
    }
  }

  function submitNewEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const result = createEmployeeProfile(form, role);
      setSelectedEmployeeId(result.employee.id);
      setNotice(`Draft employee profile created for ${result.employee.fullName}.`);
      setRefreshKey((value) => value + 1);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Employee profile could not be created.');
    }
  }

  return (
    <main className="hrms-shell">
      <aside className="hrms-nav" aria-label="HRMS navigation">
        <div className="brand-lockup">
          <strong>HRMS</strong>
          <span>People Operations</span>
        </div>
        <nav>
          <a className="active" href="#employees">Employees</a>
          <a href="#onboarding">Onboarding</a>
          <a href="#approvals">Approvals</a>
          <a href="#reports">Reports</a>
        </nav>
      </aside>

      <section className="employee-workspace" id="employees">
        <header className="workspace-header">
          <div>
            <span className="eyebrow">Employee Management</span>
            <h1>Employee operations workspace</h1>
            <p>Maintain employee master data, manager approvals, activation, offboarding, and audit evidence from one HR desk.</p>
          </div>
          <div className="role-switcher" aria-label="Acting role">
            {roles.map((item) => (
              <button
                className={role === item ? 'selected' : ''}
                key={item}
                onClick={() => setRole(item)}
                type="button"
              >
                {roleLabels[item]}
              </button>
            ))}
          </div>
        </header>

        <section className="metrics-grid" aria-label="Employee management summary">
          <div>
            <span>Headcount</span>
            <strong>{workspace.reports.totalEmployees}</strong>
            <small>{activeEmployees} active records</small>
          </div>
          <div>
            <span>Manager queue</span>
            <strong>{pendingManager}</strong>
            <small>awaiting review</small>
          </div>
          <div>
            <span>Activation queue</span>
            <strong>{pendingActivation}</strong>
            <small>approved employees</small>
          </div>
          <div>
            <span>Departments</span>
            <strong>{workspace.reports.byDepartment.length}</strong>
            <small>covered in reports</small>
          </div>
        </section>

        <section className="operation-bar" aria-label="Employee filters">
          <label>
            Employee status
            <select
              value={status}
              onChange={(event) => setStatus(isEmployeeStatus(event.target.value) ? event.target.value : 'ALL')}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === 'ALL' ? 'All employee records' : statusLabels[item]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Search employee
            <input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="EMP code, name, department, role"
              value={search}
            />
          </label>
          <p aria-live="polite">{notice}</p>
        </section>

        <section className="workspace-grid">
          <div className="roster-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Employee Roster</span>
                <h2>Master records</h2>
              </div>
              <button type="button" onClick={() => setStatus('DRAFT')}>New hire queue</button>
            </div>

            <div className="employee-table" role="table" aria-label="Employee roster">
              <div className="employee-row table-head" role="row">
                <span>Employee</span>
                <span>Role and manager</span>
                <span>Joining</span>
                <span>Status</span>
              </div>
              {workspace.list.rows.map((row) => (
                <button
                  className={`employee-row ${employee?.id === row.id ? 'active' : ''}`}
                  key={row.id}
                  onClick={() => setSelectedEmployeeId(row.id)}
                  role="row"
                  type="button"
                >
                  <span>
                    <strong>{row.fullName}</strong>
                    <small>{row.employeeCode} / {row.email}</small>
                  </span>
                  <span>
                    {row.designation ?? 'Employee'}
                    <small>{row.managerName ? `Manager: ${row.managerName}` : row.department}</small>
                  </span>
                  <span>
                    {formatDate(row.joiningDate)}
                    <small>{row.employmentType}</small>
                  </span>
                  <span>
                    <mark data-status={row.status}>{statusLabels[row.status]}</mark>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="employee-detail" id="onboarding">
            {employee ? (
              <>
                <div className="employee-identity">
                  <span>{employee.fullName.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                  <div>
                    <h2>{employee.fullName}</h2>
                    <p>{employee.designation ?? employee.jobTitle ?? 'Employee'} / {employee.department}</p>
                  </div>
                </div>

                <div className="record-fields">
                  <span>Employee code<strong>{employee.employeeCode}</strong></span>
                  <span>Work email<strong>{employee.email}</strong></span>
                  <span>Manager<strong>{employee.managerName ?? 'Not assigned'}</strong></span>
                  <span>Phone<strong>{employee.phone ?? 'Pending'}</strong></span>
                </div>

                <section className="checklist-panel" aria-label="HR validation checklist">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">HR Validation</span>
                      <h3>Readiness checks</h3>
                    </div>
                    <mark data-status={employee.status}>{statusLabels[employee.status]}</mark>
                  </div>
                  {checklist.map((item) => (
                    <div className="check-row" key={item.label}>
                      <span className={item.done ? 'check done' : 'check'}>{item.done ? '✓' : '!'}</span>
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </div>
                  ))}
                </section>

                <section className="action-panel" id="approvals" aria-label="Role based employee actions">
                  <span className="eyebrow">{roleLabels[role]} actions</span>
                  <div>
                    {selectedWorkspace.actionBar?.enabledActions
                      .filter((action) => !['CREATE', 'AUDIT', 'REPORT'].includes(action))
                      .map((action) => (
                        <button key={action} onClick={() => applyAction(action)} type="button">
                          {actionLabels[action]}
                        </button>
                      ))}
                    {!selectedWorkspace.actionBar?.enabledActions.filter((action) => !['CREATE', 'AUDIT', 'REPORT'].includes(action)).length && (
                      <p>No employee action is available for this role and status.</p>
                    )}
                  </div>
                </section>

                <section className="audit-panel" aria-label="Employee audit history">
                  <span className="eyebrow">Audit Evidence</span>
                  <ol>
                    {selectedWorkspace.timeline?.map((item) => (
                      <li key={`${item.label}-${item.changedAt}`}>
                        <strong>{item.label in actionLabels ? actionLabels[item.label as EmployeeAction] : item.label}</strong>
                        <span>{item.to || item.from} / {roleLabels[item.changedBy as EmployeeRole] ?? item.changedBy}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </>
            ) : (
              <p>No employee records match the current filters.</p>
            )}
          </aside>
        </section>

        <section className="lower-grid">
          <form className="hire-form" onSubmit={submitNewEmployee}>
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Create Employee Profile</span>
                <h2>New hire intake</h2>
              </div>
              <button type="submit">Save draft</button>
            </div>
            <div className="form-grid">
              <label>
                Employee code
                <input value={form.employeeCode} onChange={(event) => setForm({ ...form, employeeCode: event.target.value })} />
              </label>
              <label>
                First name
                <input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
              </label>
              <label>
                Last name
                <input value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
              </label>
              <label>
                Department
                <input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} />
              </label>
              <label>
                Designation
                <input value={form.designation} onChange={(event) => setForm({ ...form, designation: event.target.value })} />
              </label>
              <label>
                Joining date
                <input type="date" value={form.joiningDate} onChange={(event) => setForm({ ...form, joiningDate: event.target.value })} />
              </label>
              <label>
                Work email
                <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              </label>
              <label>
                Employment type
                <select value={form.employmentType} onChange={(event) => setForm({ ...form, employmentType: event.target.value })}>
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>
              </label>
            </div>
          </form>

          <section className="report-panel" id="reports" aria-label="Employee reports">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Employee Reports</span>
                <h2>Headcount snapshot</h2>
              </div>
              <button type="button" onClick={() => setNotice('Headcount report generated for HR admin review.')}>
                Generate report
              </button>
            </div>
            <div className="report-grid">
              {workspace.reports.byDepartment.map((item) => (
                <span key={item.label}>
                  {item.label}
                  <strong>{item.count}</strong>
                </span>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
