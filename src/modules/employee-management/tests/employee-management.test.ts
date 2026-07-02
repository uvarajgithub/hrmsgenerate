import {
  activateEmployee,
  approveEmployeeRecord,
  captureAuditLog,
  createEmployeeProfile,
  deactivateEmployee,
  employeeManagementService,
  generateEmployeeReports,
  getEmployeeById,
  listEmployees,
  managerReviewsEmployeeRecord,
  submitForManagerApproval,
  updateEmployeeInformation,
  verifyEmployeeDetails,
} from '../services/employee-management.service';

function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function expectThrows(fn: () => unknown, message: string): void {
  let threw = false;

  try {
    fn();
  } catch {
    threw = true;
  }

  assert(threw, message);
}

function runTests(): void {
  employeeManagementService.reset();

  const initialCount = listEmployees().length;
  assert(initialCount >= 2, 'seed data should be present');

  const activeManager = listEmployees({ status: 'ACTIVE' })[0];
  assert(Boolean(activeManager), 'active manager seed should exist');

  const validDraft = {
    employeeCode: 'EMP-2001',
    firstName: 'Meera',
    lastName: 'Iyer',
    department: 'Finance',
    designation: 'Analyst',
    joiningDate: '2025-01-15',
    employmentType: 'Full-time',
    email: 'meera.iyer@hrms.local',
    managerId: activeManager.id,
  };

  expectThrows(
    () =>
      createEmployeeProfile(
        {
          ...validDraft,
          employeeCode: 'EMP-9001',
          email: 'invalid-email',
        },
        'HR_STAFF'
      ),
    'invalid email should be rejected during create'
  );

  expectThrows(
    () =>
      createEmployeeProfile(
        {
          ...validDraft,
          employeeCode: 'EMP-9002',
          joiningDate: '2999-12-31',
        },
        'HR_STAFF'
      ),
    'future joining date should be rejected during create'
  );

  expectThrows(
    () =>
      createEmployeeProfile(
        {
          ...validDraft,
          employeeCode: 'EMP-9003',
          managerId: 'EMP-DOES-NOT-EXIST',
        },
        'HR_STAFF'
      ),
    'unknown manager should be rejected during create'
  );

  expectThrows(
    () => createEmployeeProfile({ ...validDraft, employeeCode: 'EMP-9004' }, 'MANAGER'),
    'create should reject unauthorized role'
  );

  const created = createEmployeeProfile(validDraft, 'HR_STAFF');
  assert(created.employee.status === 'DRAFT', 'created employee should start as draft');

  expectThrows(
    () => verifyEmployeeDetails(created.employee.id, 'MANAGER'),
    'verify should reject unauthorized role'
  );

  const verified = verifyEmployeeDetails(created.employee.id, 'HR_STAFF');
  assert(verified.employee.status === 'VERIFIED', 'verification should move employee to verified');

  expectThrows(
    () => submitForManagerApproval(created.employee.id, 'MANAGER'),
    'submit should reject unauthorized role'
  );

  const submitted = submitForManagerApproval(created.employee.id, 'HR_STAFF');
  assert(submitted.employee.status === 'PENDING_APPROVAL', 'submit should move employee to pending approval');

  expectThrows(
    () => managerReviewsEmployeeRecord(created.employee.id, 'ADMIN'),
    'review should reject unauthorized role'
  );

  const reviewed = managerReviewsEmployeeRecord(created.employee.id, 'MANAGER');
  assert(reviewed.employee.status === 'UNDER_REVIEW', 'review should move employee to under review');

  expectThrows(
    () => approveEmployeeRecord(created.employee.id, 'HR_STAFF'),
    'approve should reject unauthorized role'
  );

  const approved = approveEmployeeRecord(created.employee.id, 'MANAGER');
  assert(approved.employee.status === 'APPROVED', 'approve should move employee to approved');

  expectThrows(
    () => activateEmployee(created.employee.id, 'HR_STAFF'),
    'activate should reject unauthorized role'
  );

  const activated = activateEmployee(created.employee.id, 'ADMIN');
  assert(activated.employee.status === 'ACTIVE', 'activate should move employee to active');

  expectThrows(
    () => updateEmployeeInformation(created.employee.id, { phone: '+91-8888888888' }, 'MANAGER'),
    'update should reject unauthorized role'
  );

  const updated = updateEmployeeInformation(
    created.employee.id,
    { phone: '+91-9999999999' },
    'HR_STAFF'
  );
  assert(updated.employee.phone === '+91-9999999999', 'update should persist changes');

  expectThrows(
    () => deactivateEmployee(created.employee.id, 'HR_STAFF'),
    'deactivate should reject unauthorized role'
  );

  const deactivated = deactivateEmployee(created.employee.id, 'ADMIN');
  assert(deactivated.employee.status === 'INACTIVE', 'deactivate should move employee to inactive');

  const auditTrail = captureAuditLog(created.employee.id);
  assert(auditTrail.length >= 7, 'audit trail should contain lifecycle events');

  expectThrows(
    () => generateEmployeeReports('HR_STAFF'),
    'report generation should reject unauthorized role'
  );

  const report = generateEmployeeReports();
  assert(report.totalEmployees >= initialCount + 1, 'report should include the new employee');
  assert(report.byStatus.length > 0, 'report should summarize statuses');
  assert(report.byDepartment.length > 0, 'report should summarize departments');

  const fetched = getEmployeeById(created.employee.id);
  assert(Boolean(fetched), 'employee should be retrievable after workflow transitions');
}

runTests();
