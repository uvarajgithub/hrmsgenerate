import {
  activateEmployee,
  approveEmployeeRecord,
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

function runTests(): void {
  employeeManagementService.reset();

  const initialCount = listEmployees().length;
  assert(initialCount >= 2, 'seed data should be present');

  const created = createEmployeeProfile(
    {
      employeeCode: 'EMP-2001',
      firstName: 'Meera',
      lastName: 'Iyer',
      department: 'Finance',
      designation: 'Analyst',
      joiningDate: '2025-01-15',
      employmentType: 'Full-time',
      email: 'meera.iyer@hrms.local',
      managerId: listEmployees({ status: 'ACTIVE' })[0].id,
    },
    'HR_STAFF'
  );

  assert(created.employee.status === 'DRAFT', 'created employee should start as draft');

  const verified = verifyEmployeeDetails(created.employee.id, 'HR_STAFF');
  assert(verified.employee.status === 'VERIFIED', 'verification should move employee to verified');

  const submitted = submitForManagerApproval(created.employee.id, 'HR_STAFF');
  assert(submitted.employee.status === 'PENDING_APPROVAL', 'submit should move employee to pending approval');

  const reviewed = managerReviewsEmployeeRecord(created.employee.id, 'MANAGER');
  assert(reviewed.employee.status === 'UNDER_REVIEW', 'review should move employee to under review');

  const approved = approveEmployeeRecord(created.employee.id, 'MANAGER');
  assert(approved.employee.status === 'APPROVED', 'approve should move employee to approved');

  const activated = activateEmployee(created.employee.id, 'ADMIN');
  assert(activated.employee.status === 'ACTIVE', 'activate should move employee to active');

  const updated = updateEmployeeInformation(
    created.employee.id,
    { phone: '+91-9999999999' },
    'HR_STAFF'
  );
  assert(updated.employee.phone === '+91-9999999999', 'update should persist changes');

  const deactivated = deactivateEmployee(created.employee.id, 'ADMIN');
  assert(deactivated.employee.status === 'INACTIVE', 'deactivate should move employee to inactive');

  const report = generateEmployeeReports();
  assert(report.totalEmployees >= initialCount + 1, 'report should include the new employee');

  const fetched = getEmployeeById(created.employee.id);
  assert(Boolean(fetched), 'employee should be retrievable after workflow transitions');
}

runTests();
